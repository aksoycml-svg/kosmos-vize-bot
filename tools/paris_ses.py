"""Paris Kusatmasi anlatim (TR Alex + EN Brian), eleven_v3, duygu etiketli. Anahtar: elevenlabs_api_key (yazdirilmaz).
Kullanim: python3 -I tools/paris_ses.py uret tr|en|hepsi [P01,P02,...]  -> public/paris/ses/{tr,en}/Pxx.mp3/.json
         python3 -I tools/paris_ses.py olc        -> noise floor / 6 kHz hisirti tablosu (-18 LUFS esitlenmis)
         python3 -I tools/paris_ses.py plan       -> public/paris/ses/plan-sureleri.json (max(TR,EN)+0.4) + fark tablosu
         python3 -I tools/paris_ses.py dinlet     -> public/paris/dinlet/anlatim-{tr,en}.mp3 (muziksiz, -18 LUFS) + dalga formu png
Ayar: stability .5, style .5, similarity .8, speed 1.1, [mysterious] yok. Klip basina en fazla 3 cekim:
KESIK / CIT-duzeltilemez / noise floor > -80 dBFS reddedilir; hepsi reddedilirse gecerli kenarli en temiz cekim secilir.
"""
import base64, json, os, re, subprocess, sys, urllib.request, urllib.error
import numpy as np
ROOT = "public/paris/ses"; API = "https://api.elevenlabs.io/v1"
VOICE = {"tr": ("KediIz7pebzt5TaDHiiZ", "Alex - Deep, Clear and Fluent"), "en": ("nPczCjzI2devNBz1zQrb", "Brian")}
AYAR = {"stability": 0.5, "similarity_boost": 0.8, "style": 0.5, "use_speaker_boost": True, "speed": 1.1}
NF_LIMIT = -80.0
ET = {
 "tr": {
  "P01": "[curious] Kuşatılmış Paris'e haberi güvercinler getirdi. [intrigued] Onları dışarı balon çıkarmıştı.",
  "P02": "[tense] Prusya orduları Paris'i çevirdi, telgrafı kesti. [somber] İki milyon kadar insan şehre kapandı.",
  "P03": "[hopeful] Çare gökyüzüydü: balonlar mektupları dışarı taşıdı.",
  "P04": "[tense] Ama balon rüzgârla gider, dönemez. [curious] Cevap Paris'e nasıl girecek?",
  "P05": "[excited] Güvercin kümesine döner. [knowing] Onu balonla çıkarıp uzakta bıraktılar.",
  "P06": "[tense] Ama kuş mektup taşıyamaz. [excited] Fotoğrafçı Dagron sayfaları parmak boyunda filme sığdırmayı buldu.",
  "P07": "[curious] Hükümet Tours'taydı. [determined] Dagron aletleriyle balonla oraya gitti, mektupları küçülttü.",
  "P08": "[knowing] Film, güvercinin kuyruk tüyüne bağlanıp salındı.",
  "P09": "[excited] Kuş kümesine konunca film perdede büyütüldü. [determined] Memurlar kopyalayıp dağıttı.",
  "P10": "[somber] Kuşların çoğu dönemedi. [warm] Yine de on binlerce mesaj ulaştı.",
  "P11": "[tense] Tours'a giden gizli mesajlı balon Norveç'in dağlarına indi. [thoughtful] Yolcular sağ kurtuldu, ama mesaj Paris'in elinden çıkmıştı.",
  "P12": "[thoughtful] İnsan balon yaptı, rüzgâr yönetti. [warm] Haberi eve dönmeyi bilen güvercin getirdi."},
 "en": {
  "P01": "[curious] Pigeons brought news to besieged Paris. [intrigued] Balloons took them out.",
  "P02": "[tense] Prussia ringed Paris and cut the telegraph. [somber] Two million people were trapped.",
  "P03": "[hopeful] Only the sky was left. [excited] Balloons carried mail out.",
  "P04": "[tense] But balloons can't turn back. [curious] How would replies get in?",
  "P05": "[excited] Pigeons fly home from anywhere. [knowing] So balloons carried them out.",
  "P06": "[tense] Birds can't carry letters. [excited] Photographer Dagron's trick: pages shrunk onto finger-sized film.",
  "P07": "[curious] The government sat in Tours. [determined] Dagron flew there to shrink letters.",
  "P08": "[knowing] They tied the film to a pigeon's tail.",
  "P09": "[excited] In Paris, a screen enlarged the film. [determined] Clerks copied it.",
  "P10": "[somber] Most birds never returned. [warm] Still, tens of thousands of messages arrived.",
  "P11": "[tense] A secret message for Tours landed in Norway. [thoughtful] The men lived, but it was out of Paris's hands.",
  "P12": "[thoughtful] Man built balloons; wind steered them. [warm] Pigeons flew home with the news."}}
IDS = [f"P{i:02d}" for i in range(1, 13)]

def post(path, body):
    key = os.environ["elevenlabs_api_key"]
    r = urllib.request.Request(API + path, data=json.dumps(body).encode(), headers={"xi-api-key": key, "Content-Type": "application/json"})
    try: return json.loads(urllib.request.urlopen(r).read())
    except urllib.error.HTTPError as e: print("HATA", e.code, e.read()[:300]); raise

def kelimeler(ch, st, en):
    out, w, depth = [], None, 0
    for c, s, e in zip(ch, st, en):
        if c == "[": depth += 1; continue
        if c == "]": depth -= 1; continue
        if depth: continue
        if c.isspace():
            if w: out.append(w); w = None
            continue
        if w is None: w = {"t": c, "s": round(s, 3), "e": round(e, 3)}
        else: w["t"] += c; w["e"] = round(e, 3)
    if w: out.append(w)
    return out

def sure(p): return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p]))

def pcm(f, filt=None):
    cmd = ["ffmpeg", "-loglevel", "error", "-i", f] + (["-af", filt] if filt else []) + ["-f", "f32le", "-ac", "1", "-ar", "44100", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).astype(float)

def lufs(f):
    p = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", p)[-1])

def olc(f):
    """(noise floor dBFS, 6 kHz ustu hisirti dBFS), -18 LUFS'e dogrusal esitlenmis; en sessiz %10 kare (20 ms) gucu ortalamasi."""
    g = 10 ** ((-18 - lufs(f)) / 20); n = 882
    def taban(x):
        x = x * g; k = len(x) // n; return (x[:k * n].reshape(k, n) ** 2).mean(1)
    e = taban(pcm(f)); idx = np.argsort(e)[:max(1, len(e) // 10)]
    h = taban(pcm(f, "highpass=f=6000,highpass=f=6000"))
    d = lambda v: 10 * np.log10(max(v, 1e-12))
    return d(e[idx].mean()), d(h[idx].mean())

def kenar(mp3):
    r = subprocess.run(["python3", "-I", "tools/ses_kenar.py", "kontrol", mp3], capture_output=True, text=True).stdout
    if "KESIK" in r: return "KESIK"
    if "CIT" in r:
        r2 = subprocess.run(["python3", "-I", "tools/ses_kenar.py", "duzelt", mp3], capture_output=True, text=True).stdout
        return "duzeltildi" if "duzeltildi" in r2 else "CIT"
    return "temiz"

def uret(lang, pid, OUT=None, ayar=None, text=None, tum=False, eski=None):
    """tum=True: 3 cekimin hepsi uretilir, en temizi secilir. eski: mevcut klip adayi (nf, hisirti, kenar_ok) ile yarisir."""
    OUT = OUT or f"{ROOT}/{lang}"; VID, ad = VOICE[lang]; text = text or ET[lang][pid]; ayar = ayar or AYAR; os.makedirs(OUT, exist_ok=True)
    mp3 = f"{OUT}/{pid}.mp3"; js = mp3[:-4] + ".json"; adaylar = []
    for take in range(1, 4):
        d = post(f"/text-to-speech/{VID}/with-timestamps?output_format=mp3_44100_128",
                 {"text": text, "model_id": "eleven_v3", "voice_settings": ayar, "language_code": lang})
        t = f"{OUT}/{pid}.c{take}.mp3"; tj = t[:-4] + ".json"
        open(t, "wb").write(base64.b64decode(d["audio_base64"])); a = d["alignment"]
        w = kelimeler(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"])
        json.dump({"id": pid, "lang": lang, "text": text, "words": w, "dur": round(sure(t), 3), "voice": VID, "model": "eleven_v3",
                   "ayar": ayar, "ses": ad}, open(tj, "w"), ensure_ascii=False, indent=1)
        k = kenar(t); nf, hs = olc(t); kok = k in ("temiz", "duzeltildi"); ok = kok and nf <= NF_LIMIT
        print(lang, pid, "cekim", take, k, f"{sure(t):.2f}s nf {nf:.1f} hisirti {hs:.1f}", "OK" if ok else "RED", flush=True)
        adaylar.append((ok, kok, nf, take, k, hs))
        if ok and not tum: break
    if eski:
        adaylar.append((eski[0] <= NF_LIMIT and eski[2], eski[2], eski[0], 0, "eski", eski[1]))
    ok_l = [a for a in adaylar if a[0]]
    sec = ok_l[0] if ok_l else min([a for a in adaylar if a[1]] or adaylar, key=lambda a: a[2])
    take = sec[3]
    if take == 0:
        print(lang, pid, "ESKI klip korundu (yeni cekimler daha kotu)"); [os.remove(f"{OUT}/{pid}.c{t}.{e}") for t in range(1, 4) for e in ("mp3", "json") if os.path.exists(f"{OUT}/{pid}.c{t}.{e}")]; return
    os.replace(f"{OUT}/{pid}.c{take}.mp3", mp3); os.replace(f"{OUT}/{pid}.c{take}.json", js)
    for t in range(1, 4):
        for f in (f"{OUT}/{pid}.c{t}.mp3", f"{OUT}/{pid}.c{t}.json"):
            if os.path.exists(f): os.remove(f)
    j = json.load(open(js)); j["dur"] = round(sure(mp3), 3); j["cekim"] = take; j["cekim_sayisi"] = len(adaylar); j["kenar"] = sec[4]
    j["nf_dbfs"] = round(sec[2], 1); j["hisirti_6k_dbfs"] = round(sec[5], 1); j["nf_gecti"] = bool(sec[0])
    json.dump(j, open(js, "w"), ensure_ascii=False, indent=1)
    print(lang, pid, "SECILEN cekim", take, "nf_gecti" if sec[0] else "NF_GECMEDI", flush=True)

def plan():
    out, rows = {}, []
    for pid in IDS:
        tr = sure(f"{ROOT}/tr/{pid}.mp3"); en = sure(f"{ROOT}/en/{pid}.mp3")
        out[pid] = round(max(tr, en) + 0.4, 2); rows.append((pid, tr, en, out[pid]))
    json.dump(out, open(f"{ROOT}/plan-sureleri.json", "w"), indent=1)
    est = {"P01": 4.5, "P02": 5.9, "P03": 4.0, "P04": 4.5, "P05": 4.4, "P06": 5.9, "P07": 4.8, "P08": 3.5, "P09": 4.5, "P10": 4.8, "P11": 7.9, "P12": 5.3}
    print("| Plan | TR sn | EN sn | Plan (max+0.4) | Senaryo tahmini | Fark |\n|---|---|---|---|---|---|")
    for pid, tr, en, p in rows: print(f"| {pid} | {tr:.2f} | {en:.2f} | {p:.2f} | {est[pid]:.1f} | {p - est[pid]:+.2f} |")
    print(f"| Toplam | {sum(r[1] for r in rows):.2f} | {sum(r[2] for r in rows):.2f} | {sum(out.values()):.2f} | 60.0 | {sum(out.values()) - 60:+.2f} |")

def ln(f, I, tp):
    p = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", f"loudnorm=I={I}:TP={tp}:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
    m = json.loads(p[p.rindex("{"):])
    return f"loudnorm=I={I}:TP={tp}:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"

def dinlet(lang):
    SR = 44100; os.makedirs("public/paris/dinlet", exist_ok=True)
    pl = json.load(open(f"{ROOT}/plan-sureleri.json")); L = int(round(sum(pl.values()) * SR)); v = np.zeros((L + SR, 2)); t0 = 0.0
    for pid in IDS:
        f = f"{ROOT}/{lang}/{pid}.mp3"
        raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f, "-af", ln(f, -18, -3), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
        x = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float); n = min(len(x), int(pl[pid] * SR))
        s = int(t0 * SR); v[s:s + n] += x[:n]; t0 += pl[pid]
    v = v[:L]; tmp = f"public/paris/dinlet/_{lang}.wav"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", tmp], input=v.astype(np.float32).tobytes(), check=True)
    out = f"public/paris/dinlet/anlatim-{lang}.mp3"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp, "-af", ln(tmp, -18, -1.5), "-ar", str(SR), "-b:a", "192k", out], check=True)
    p = subprocess.run(["ffmpeg", "-hide_banner", "-i", out, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    s = p[p.rindex("Summary"):]
    print(lang, out, re.search(r"I:\s+(-?[\d.]+) LUFS", s).group(1), "LUFS, TP", re.search(r"Peak:\s+(-?[\d.]+) dBFS", s).group(1), f"{sure(out):.2f}s")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", out, "-filter_complex", "showwavespic=s=1800x300:colors=#2a7fff", "-frames:v", "1", f"public/paris/dinlet/dalga-{lang}.png"], check=True)
    os.remove(tmp)

# ---- TEK CEKIM DENEMESI (public/paris/ses/tek/) ----
TEK_AYAR = {"stability": 0.75, "similarity_boost": 0.85, "style": 0.4, "use_speaker_boost": True, "speed": 1.1}
TEK_ETIKET = {"tr": {"P01": "[curious] ", "P04": "[tense] ", "P10": "[somber] ", "P12": "[warm] "},
              "en": {"P01": "[curious] ", "P04": "[tense] ", "P10": "[somber] ", "P12": "[warm] "}}
def duz(t): return re.sub(r"\[[a-z ]+\]\s*", "", t).strip()

def tek(lang, seed=20251101):
    OUT = f"{ROOT}/tek/{lang}"; os.makedirs(OUT, exist_ok=True); VID, ad = VOICE[lang]
    metin = " ".join(TEK_ETIKET[lang].get(p, "") + duz(ET[lang][p]) for p in IDS)
    sayilar = [len(duz(ET[lang][p]).split()) for p in IDS]
    ayar = dict(TEK_AYAR)
    body = {"text": metin, "model_id": "eleven_v3", "voice_settings": ayar, "language_code": lang, "seed": seed}
    try: d = post(f"/text-to-speech/{VID}/with-timestamps?output_format=mp3_44100_128", body)
    except Exception:
        print("stability 0.75 reddedildi -> 0.5/1.0 denenecek"); raise
    full = f"{OUT}/_tam.mp3"; open(full, "wb").write(base64.b64decode(d["audio_base64"])); a = d["alignment"]
    w = kelimeler(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"])
    assert len(w) == sum(sayilar), (len(w), sum(sayilar))
    json.dump({"text": metin, "words": w, "seed": seed, "ayar": ayar}, open(f"{OUT}/_tam.json", "w"), ensure_ascii=False, indent=1)
    x = pcm(full); SR = 44100; i = 0; bounds = []
    for k, n in enumerate(sayilar):
        bounds.append((i, i + n - 1)); i += n
    cuts = [0.0]
    for k in range(len(IDS) - 1):
        cuts.append((w[bounds[k][1]]["e"] + w[bounds[k + 1][0]]["s"]) / 2)
    cuts.append(len(x) / SR)
    for k, pid in enumerate(IDS):
        t0, t1 = cuts[k], cuts[k + 1]; seg = x[int(t0 * SR):int(t1 * SR)].copy(); n5 = int(0.005 * SR)
        seg[:n5] *= np.linspace(0, 1, n5); seg[-n5:] *= np.linspace(1, 0, n5)
        mp3 = f"{OUT}/{pid}.mp3"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-b:a", "128k", mp3], input=seg.astype(np.float32).tobytes(), check=True)
        ww = [dict(t=u["t"], s=round(u["s"] - t0, 3), e=round(u["e"] - t0, 3)) for u in w[bounds[k][0]:bounds[k][1] + 1]]
        json.dump({"id": pid, "lang": lang, "text": ET[lang][pid], "words": ww, "dur": round(sure(mp3), 3), "voice": VID, "model": "eleven_v3", "ayar": ayar, "seed": seed, "tek_cekim": True},
                  open(f"{OUT}/{pid}.json", "w"), ensure_ascii=False, indent=1)
        k_ = kenar(mp3); nf, hs = olc(mp3); print(lang, pid, k_, f"{sure(mp3):.2f}s nf {nf:.1f} hisirti {hs:.1f}")
    print(lang, "tam", f"{sure(full):.2f}s")

def konusma(lang, root):
    """(toplam konusma sn = kelime ilk bas..son son toplami, plan sure toplami)"""
    ks = 0; ps = 0
    for p in IDS:
        j = json.load(open(f"{root}/{lang}/{p}.json")); ww = j["words"]; ks += ww[-1]["e"] - ww[0]["s"]; ps += sure(f"{root}/{lang}/{p}.mp3")
    return ks, ps

def tini(f):
    """(spektral merkez Hz, RMS dBFS) yalniz konusma karelerinde (en yuksek enerjili %60 kare), 25 ms."""
    x = pcm(f); n = 1102; k = len(x) // n; fr = x[:k * n].reshape(k, n) * np.hanning(n)
    e = (fr ** 2).mean(1); m = e > np.quantile(e, 0.4)
    S = np.abs(np.fft.rfft(fr[m], axis=1)); fq = np.fft.rfftfreq(n, 1 / 44100)
    c = ((S * fq).sum(1) / (S.sum(1) + 1e-9)).mean()
    return c, 10 * np.log10(e[m].mean() + 1e-12)

def tablo():
    for lg in ("tr", "en"):
        print(f"\n## {lg}\n| Plan | eski merkez Hz | tek merkez Hz | eski RMS dB | tek RMS dB |\n|---|---|---|---|---|")
        E, T = [], []
        for p in IDS:
            e = tini(f"{ROOT}/{lg}/{p}.mp3"); t = tini(f"{ROOT}/tek/{lg}/{p}.mp3"); E.append(e); T.append(t)
            print(f"| {p} | {e[0]:.0f} | {t[0]:.0f} | {e[1]:.1f} | {t[1]:.1f} |")
        E = np.array(E); T = np.array(T)
        print(f"| **std** | {E[:,0].std():.0f} | {T[:,0].std():.0f} | {E[:,1].std():.2f} | {T[:,1].std():.2f} |")
        print(f"| ort | {E[:,0].mean():.0f} | {T[:,0].mean():.0f} | {E[:,1].mean():.1f} | {T[:,1].mean():.1f} |")
        print("konusma sn (eski, tek):", [round(v, 1) for v in konusma(lg, ROOT)], [round(v, 1) for v in konusma(lg, ROOT + "/tek")])

def tek_dinlet():
    SR = 44100; os.makedirs("public/paris/dinlet", exist_ok=True)
    def ld(f):
        raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f, "-af", ln(f, -18, -3), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
        return np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)
    def yaz(parcalar, out):
        tmp = out[:-4] + ".wav"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", tmp], input=np.concatenate(parcalar).astype(np.float32).tobytes(), check=True)
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp, "-af", ln(tmp, -18, -1.5), "-ar", str(SR), "-b:a", "192k", out], check=True)
        os.remove(tmp); print(out, f"{sure(out):.1f}s")
    for lg in ("tr", "en"):
        yaz([ld(f"{ROOT}/tek/{lg}/{p}.mp3") for p in IDS], f"public/paris/dinlet/tek-cekim-{lg}.mp3")
    sil = lambda t: np.zeros((int(t * SR), 2)); pr = []
    for p in ("P02", "P06", "P11"): pr += [ld(f"{ROOT}/tr/{p}.mp3"), sil(0.7)]
    pr.append(sil(0.8))
    for p in ("P02", "P06", "P11"): pr += [ld(f"{ROOT}/tek/tr/{p}.mp3"), sil(0.7)]
    yaz(pr, "public/paris/dinlet/karsilastir-renk-tr.mp3")

if __name__ == "__main__":
    c = sys.argv[1]
    if c == "uret":
        langs = ["tr", "en"] if sys.argv[2] == "hepsi" else [sys.argv[2]]
        ids = sys.argv[3].split(",") if len(sys.argv) > 3 else IDS
        for lg in langs:
            os.makedirs(f"{ROOT}/{lg}", exist_ok=True)
            for pid in ids: uret(lg, pid)
    elif c == "tekrar":
        TR3 = "[hopeful] Çare gökyüzüydü. Balonlar mektupları dışarı taşıdı."
        for lg, pid, tx in (("tr", "P03", TR3), ("tr", "P06", None), ("tr", "P08", None), ("en", "P08", None)):
            j = json.load(open(f"{ROOT}/{lg}/{pid}.json")); ok = j["kenar"] in ("temiz", "duzeltildi")
            eski = (j["nf_dbfs"], j["hisirti_6k_dbfs"], ok and pid != "P03" or (ok and tx is None))
            if tx: ET[lg][pid] = tx
            uret(lg, pid, tum=True, eski=(j["nf_dbfs"], j["hisirti_6k_dbfs"], ok), text=tx)
    elif c == "hiz12":
        a = dict(AYAR, speed=1.2)
        for lg in ("tr", "en"):
            for pid in ("P01", "P06", "P11"): uret(lg, pid, OUT=f"{ROOT}/hiz12/{lg}", ayar=a)
    elif c == "karsilastir":
        SR = 44100
        for lg in ("tr", "en"):
            parts = []
            def ld(f):
                raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f, "-af", ln(f, -18, -3), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
                return np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)
            sil = lambda t: np.zeros((int(t * SR), 2))
            for pid in ("P01", "P06", "P11"):
                parts += [ld(f"{ROOT}/{lg}/{pid}.mp3"), sil(0.6), ld(f"{ROOT}/hiz12/{lg}/{pid}.mp3"), sil(1.0)]
            tmp = f"public/paris/dinlet/_k{lg}.wav"
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", tmp], input=np.concatenate(parts).astype(np.float32).tobytes(), check=True)
            out = f"public/paris/dinlet/hiz-karsilastirma-{lg}.mp3"
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp, "-af", ln(tmp, -18, -1.5), "-ar", str(SR), "-b:a", "192k", out], check=True)
            os.remove(tmp); print(out, f"{sure(out):.1f}s")
    elif c == "olc":
        for lg in ("tr", "en"):
            for pid in IDS:
                f = f"{ROOT}/{lg}/{pid}.mp3"; nf, hs = olc(f); print(f"{lg} {pid} nf {nf:.1f} dBFS hisirti6k {hs:.1f} dBFS {sure(f):.2f}s")
    elif c == "tek":
        for lg in sys.argv[2].split(","): tek(lg, int(sys.argv[3]) if len(sys.argv) > 3 else 20251101)
    elif c == "tablo": tablo()
    elif c == "tek_dinlet": tek_dinlet()
    elif c == "plan": plan()
    elif c == "dinlet":
        for lg in ("tr", "en"): dinlet(lg)
