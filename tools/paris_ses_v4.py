"""Paris Kusatmasi v4 tek cekim seslendirme (TR Alex, EN Brian). Anahtar: elevenlabs_api_key (yazdirilmaz).
  python3 -I tools/paris_ses_v4.py aday tr|en SEED...   -> ADAY/{lang}/s{seed}/_tam.mp3/.json (tek cekim, eleven_v3)
  python3 -I tools/paris_ses_v4.py analiz tr|en          -> adaylar: son kenar, sure, nefes sayisi
  python3 -I tools/paris_ses_v4.py kes tr|en SEED        -> nefes temizligi + 12 plana kesim -> public/paris/ses/{lang}/Pxx.mp3/.json
  python3 -I tools/paris_ses_v4.py plan | olc | dinlet
Ayar: eleven_v3, stability .75, style .4, similarity .85, speed 1.1, sabit seed; etiket yalniz P01 [curious], P04 [tense], P10 [somber], P12 [warm].
"""
import base64, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np, subprocess
import paris_ses as P

ADAY = "/tmp/claude-0/-home-user-kosmos-vize-bot/130fb946-df07-5b55-8f99-3d7d0397d614/scratchpad/aday"
SR = 44100; IDS = P.IDS
V4 = {
 "tr": ["İki milyon insan dünyadan koptu. Onlara haberi… bir kuşun kuyruğu getirdi.",
        "Prusya orduları Paris'i çevirdi, telgrafı kesti.",
        "Çare gökyüzüydü: balonlar mektup taşıdı.",
        "Balon rüzgârla gider, dönemez. Cevap nasıl gelecek?",
        "Güvercin kümesine döner. Onu balonla uzağa götürdüler.",
        "Ama kuş mektup taşıyamaz. Dagron sayfaları küçücük filme sığdırdı.",
        "Hükümet Tours'taydı. Dagron balonla gitti, mektupları küçülttü.",
        "Film, güvercinin kuyruk tüyüne bağlandı.",
        "Kümese konunca film perdede büyütüldü. Memurlar kopyaladı.",
        "Çoğu kuş dönmedi. Yine de on binlerce mesaj ulaştı.",
        "Gizli mesajlı balon, Tours yerine Norveç'e indi. Yolcular sağ kurtuldu, ama mesaj Paris'in elinden çıkmıştı.",
        "Balonu rüzgâr yönetti. Haberi, eve dönmeyi bilen güvercin getirdi."],
 "en": ["Two million people were cut off. The news… came on a bird's tail.",
        "Prussian armies ringed Paris and cut the telegraph.",
        "Only the sky was left. Balloons carried mail.",
        "Balloons can't turn back. How would replies arrive?",
        "Pigeons fly home. Balloons carried them far away.",
        "Birds can't carry letters. Dagron shrank pages onto tiny film.",
        "The government sat in Tours. Dagron flew there, shrinking letters.",
        "They tied the film to a pigeon's tail.",
        "In Paris, a screen enlarged the film. Clerks copied it.",
        "Most birds never returned. Still, tens of thousands of messages arrived.",
        "A secret message bound for Tours landed in Norway. The men lived, but it was out of Paris's hands.",
        "Wind steered the balloon. Pigeons flew home with the news."]}
ETIKET = {0: "[curious] ", 3: "[tense] ", 9: "[somber] ", 11: "[warm] "}
AYAR = {"stability": 0.75, "similarity_boost": 0.85, "style": 0.4, "use_speaker_boost": True, "speed": 1.1}

def metin(lang): return " ".join(ETIKET.get(i, "") + t for i, t in enumerate(V4[lang]))
def sayilar(lang): return [len(t.split()) for t in V4[lang]]

def aday(lang, seed):
    d_ = f"{ADAY}/{lang}/s{seed}"; os.makedirs(d_, exist_ok=True); VID, ad = P.VOICE[lang]
    d = P.post(f"/text-to-speech/{VID}/with-timestamps?output_format=mp3_44100_128",
               {"text": metin(lang), "model_id": "eleven_v3", "voice_settings": AYAR, "language_code": lang, "seed": seed})
    open(f"{d_}/_tam.mp3", "wb").write(base64.b64decode(d["audio_base64"])); a = d["alignment"]
    w = P.kelimeler(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"])
    json.dump({"text": metin(lang), "words": w, "seed": seed, "ayar": AYAR, "voice": VID}, open(f"{d_}/_tam.json", "w"), ensure_ascii=False, indent=1)
    print(lang, seed, "kelime", len(w), "beklenen", sum(sayilar(lang)), f"{P.sure(d_ + '/_tam.mp3'):.2f}s")

def yukle(lang, seed):
    d_ = f"{ADAY}/{lang}/s{seed}"; x = P.pcm(f"{d_}/_tam.mp3"); j = json.load(open(f"{d_}/_tam.json"))
    # -18 LUFS'e dogrusal olcek (nefes esigi tutarli olsun)
    g = 10 ** ((-18 - P.lufs(f"{d_}/_tam.mp3")) / 20)
    return x * g, j["words"]

def db(v): return 20 * np.log10(max(v, 1e-9))

def nefesler(x, w):
    """Kelime arasi bosluklarda (ve bas/son) nefes adaylari: 10 ms kare RMS > -35 dBFS, 150-600 ms, hisirti (yuksek duzluk / yuksek ZCR).
    donus: [(t0, t1, rms_db, merkez_hz, duzluk)]"""
    n = 441; k = len(x) // n; fr = x[:k * n].reshape(k, n)
    rms = np.sqrt((fr ** 2).mean(1)); rdb = 20 * np.log10(rms + 1e-9)
    S = np.abs(np.fft.rfft(fr * np.hanning(n), axis=1)) + 1e-9; fq = np.fft.rfftfreq(n, 1 / SR)
    cen = (S * fq).sum(1) / S.sum(1); flat = np.exp(np.log(S[:, 1:]).mean(1)) / S[:, 1:].mean(1)
    # kelime ici kareleri maskele: alignment +-20 ms marj (alignment kaymasina karsi dar tutuldu)
    kel = np.zeros(k, bool)
    for u in w: kel[int(max(0, u["s"] + 0.02) / 0.01):int((u["e"] - 0.02) / 0.01) + 1] = True
    cand = (rdb > -35) & (~kel)
    out, i = [], 0
    while i < k:
        if cand[i]:
            j = i
            while j < k and cand[j]: j += 1
            sure_ = (j - i) * 0.01
            if 0.15 <= sure_ <= 0.6:
                out.append((i * 0.01, j * 0.01, float(rdb[i:j].mean()), float(cen[i:j].mean()), float(flat[i:j].mean())))
            i = j
        else: i += 1
    return out

def analiz(lang):
    for sd in sorted(os.listdir(f"{ADAY}/{lang}")):
        seed = sd[1:]; x, w = yukle(lang, seed); f = f"{ADAY}/{lang}/{sd}/_tam.mp3"
        n5 = int(0.005 * SR); son = db(np.abs(x[-n5:]).max()); ds = len(x) / SR
        k = P.subprocess.run(["python3", "-I", "tools/ses_kenar.py", "kontrol", f], capture_output=True, text=True).stdout.strip().splitlines()[-1]
        gaps = [w[i + 1]["s"] - w[i]["e"] for i in range(len(w) - 1)]
        nf = nefesler(x, w)
        kons = sum(u["e"] - u["s"] for u in w)
        print(f"{lang} {sd}: {ds:.2f}s kelime {len(w)} son {son:.1f} dB, son kelime bitisi {w[-1]['e']:.2f} / dosya {ds:.2f}, nefes adayi {len(nf)}, kenar: {k}")
        print("   nefesler:", [(round(a, 2), round(b - a, 2), round(c), round(d), round(e, 2)) for a, b, c, d, e in nf])

def kare_ozellik(x):
    n = 441; k = len(x) // n; fr = x[:k * n].reshape(k, n)
    r = 20 * np.log10(np.sqrt((fr ** 2).mean(1)) + 1e-9)
    S = np.abs(np.fft.rfft(fr * np.hanning(n), axis=1)) + 1e-9; fq = np.fft.rfftfreq(n, 1 / SR)
    cen = (S * fq).sum(1) / S.sum(1); flat = np.exp(np.log(S[:, 1:]).mean(1)) / S[:, 1:].mean(1)
    hf = (S[:, fq > 4000] ** 2).sum(1) / (S ** 2).sum(1)
    return r, cen, flat, hf

def nefes_bul(x):
    """Sinyal tabanli (alignment'a guvenmez). x: -18 LUFS esitlenmis. Nefes = konusma olmayan (r < -33 dB, konusma kenarindan >= 60 ms uzak),
    r > -62 dB, hisirti dokulu (duzluk >= .02, merkez >= 3 kHz; dusuk merkezli = sesli kuyruk, nefes degil), >= 90 ms ve <= 600 ms. Donus: [(t0, t1, ort_db, merkez, hf)]"""
    r, cen, flat, hf = kare_ozellik(x); k = len(r)
    ses = r >= -33; yak = np.convolve(ses.astype(float), np.ones(13), "same") > 0
    aday = (~yak) & (r > -62) & (r < -33) & (flat >= 0.02) & (cen >= 3000)
    # 2 karelik bosluklari kapat
    for i in range(1, k - 1):
        if not aday[i] and aday[i - 1] and aday[min(k - 1, i + 1)] and not yak[i]: aday[i] = True
    out, i = [], 0
    while i < k:
        if aday[i]:
            j = i
            while j < k and aday[j]: j += 1
            if 0.09 <= (j - i) * 0.01 <= 0.6:
                a, b = i, j  # nefes rampasini kenarlara dogru genislet (-78 dB'ye kadar, hisirti merkezli, konusma atagina -40 dB'de dur)
                while a > 0 and i - a < 20 and -78 < r[a - 1] < -33 and cen[a - 1] >= 3000: a -= 1
                while b < k and b - j < 12 and -78 < r[b] < -40 and cen[b] >= 3000: b += 1
                out.append((a * 0.01, b * 0.01, float(r[i:j].mean()), float(cen[i:j].mean()), float(hf[i:j].mean())))
            i = j
        else: i += 1
    return out

def temizle(x, br, att_db=-35.0, fade=0.02):
    """Nefes segmentlerini att_db kadar kisar (kisa fade ile)."""
    y = x.copy(); nf = int(fade * SR)
    for t0, t1, *_ in br:
        a, b = max(0, int(t0 * SR) - nf), min(len(y), int(t1 * SR) + nf); g = np.full(b - a, 10 ** (att_db / 20))
        g[:nf] = np.linspace(1, g[0], nf); g[-nf:] = np.linspace(g[-1], 1, nf)
        y[a:b] *= g
    return y

def nefes_raporu(lang, seed):
    x, w = yukle(lang, seed); br = nefes_bul(x)
    for t0, t1, d, c, h in br: print(f"  {lang} s{seed} t={t0:6.2f}-{t1:6.2f} ({(t1 - t0) * 1000:3.0f} ms) {d:5.1f} dB merkez {c:5.0f} Hz hf {h:.2f}")
    print(f"{lang} s{seed}: {len(br)} nefes"); return br

ROOT = "public/paris/ses"; HEAD = 0.10; TAIL = 0.20

def sessiz_kesim(r, a, b):
    """[a,b] sn penceresinde en uzun sessiz (r < -55 dB) kosunun ortasi; yoksa en dusuk enerjili kare."""
    ia, ib = max(0, int(a / 0.01)), min(len(r), int(b / 0.01))
    q = r[ia:ib] < -55; best, i = (0, ia), 0
    while i < len(q):
        if q[i]:
            j = i
            while j < len(q) and q[j]: j += 1
            if j - i > best[0]: best = (j - i, ia + i)
            i = j
        else: i += 1
    if best[0]: return (best[1] + best[0] / 2) * 0.01, best[0] * 0.01
    return (ia + int(np.argmin(r[ia:ib]))) * 0.01, 0.0

def kes(lang, seed):
    import shutil
    x, w = yukle(lang, seed); g = 10 ** ((-18 - P.lufs(f"{ADAY}/{lang}/s{seed}/_tam.mp3")) / 20)
    br = nefes_bul(x); y = temizle(x, br); r, *_ = kare_ozellik(y); sn = sayilar(lang)
    print(f"{lang} s{seed}: {len(br)} nefes temizlendi (-35 dB, 20 ms fade):")
    for t0, t1, d, c, h in br: print(f"   t={t0:6.2f}-{t1:6.2f} {(t1 - t0) * 1000:3.0f} ms {d:5.1f} dB -> {d - 35:5.1f} dB, merkez {c:.0f} Hz")
    b = []; i0 = 0
    for n in sn: b.append((i0, i0 + n - 1)); i0 += n
    cuts = [0.0]; 
    for k in range(11):
        c_, sil = sessiz_kesim(r, w[b[k][1]]["e"] - 0.25, w[b[k + 1][0]]["s"] + 0.25); cuts.append(c_)
        print(f"   sinir P{k + 1:02d}|P{k + 2:02d}: kesim {c_:6.2f} sn, sessiz kosu {sil * 1000:.0f} ms, seviye {r[int(c_ / 0.01)]:.0f} dB")
    cuts.append(len(y) / SR); out = f"{ROOT}/{lang}"; os.makedirs(out, exist_ok=True); n5 = int(0.005 * SR); rows = []
    for k, pid in enumerate(IDS):
        ia, ib = int(cuts[k] / 0.01), int(cuts[k + 1] / 0.01); act = np.where(r[ia:ib] > -50)[0]
        on, off = (ia + act[0]) * 0.01, (ia + act[-1] + 1) * 0.01
        t0 = max(cuts[k], on - HEAD); t1 = min(cuts[k + 1], off + TAIL)
        seg = (y[int(t0 * SR):int(t1 * SR)] / g).copy(); seg[:n5] *= np.linspace(0, 1, n5); seg[-n5:] *= np.linspace(1, 0, n5)
        mp3 = f"{out}/{pid}.mp3"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-b:a", "128k", mp3], input=seg.astype(np.float32).tobytes(), check=True)
        ww = []
        for u in w[b[k][0]:b[k][1] + 1]:  # alignment kelime basini sessizlige dogru erken verir: sinyalin (r > -45 dB) ilk/son karesine yapistir
            a_, b_ = max(0, int(u["s"] / 0.01)), int(u["e"] / 0.01) + 1; ac = np.where(r[a_:b_] > -45)[0]
            if len(ac): su, eu = (a_ + ac[0]) * 0.01, (a_ + ac[-1] + 1) * 0.01
            else:  # alignment kelimeyi nefes/sessizlige koymus: ileride ilk konusma karesini ara
                ac = np.where(r[b_:b_ + 30] > -45)[0]
                su, eu = ((b_ + ac[0]) * 0.01, (b_ + ac[0]) * 0.01 + min(0.15, u["e"] - u["s"])) if len(ac) else (u["s"], u["e"])
            ww.append(dict(t=u["t"], s=round(su - t0, 3), e=round(eu - t0, 3)))
        km = P.kenar(mp3); nf, hs = P.olc(mp3); du = P.sure(mp3)
        pf = P.pcm(mp3); gg = 10 ** ((-18 - P.lufs(mp3)) / 20); pad = (pf[:int(0.08 * SR)] * gg); padnf = 10 * np.log10(max((pad ** 2).mean(), 1e-12))
        json.dump({"id": pid, "lang": lang, "text": V4[lang][k], "words": ww, "dur": round(du, 3), "voice": P.VOICE[lang][0], "model": "eleven_v3", "ayar": AYAR,
                   "seed": int(seed), "tek_cekim": True, "v4": True, "kenar": km, "nf_dbfs": round(nf, 1), "hisirti_6k_dbfs": round(hs, 1), "pad_nf_dbfs": round(padnf, 1), "kelime_zamani": "sinyale yapisik",
                   "nefes_temizlendi": [round(a, 2) for a, bb, *_ in br if t0 <= a < t1]}, open(f"{out}/{pid}.json", "w"), ensure_ascii=False, indent=1)
        rows.append((pid, du, km, nf, hs)); print(f"{lang} {pid} {du:5.2f}s kenar {km} nf {nf:.1f} pad-nf {padnf:.1f} hisirti6k {hs:.1f} ilk {ww[0]['s']:.2f} son {ww[-1]['e']:.2f}")
    print(lang, "klip toplami", f"{sum(r_[1] for r_ in rows):.2f}s")

def plan():
    out, rows = {}, []
    for pid in IDS:
        tr = P.sure(f"{ROOT}/tr/{pid}.mp3"); en = P.sure(f"{ROOT}/en/{pid}.mp3"); out[pid] = round(max(tr, en) + 0.4, 2); rows.append((pid, tr, en, out[pid]))
    json.dump(out, open(f"{ROOT}/plan-sureleri.json", "w"), indent=1)
    print("| Plan | TR sn | EN sn | Plan (max+0.4) |\n|---|---|---|---|")
    for pid, tr, en, p_ in rows: print(f"| {pid} | {tr:.2f} | {en:.2f} | {p_:.2f} |")
    print(f"| Toplam | {sum(r_[1] for r_ in rows):.2f} | {sum(r_[2] for r_ in rows):.2f} | {sum(out.values()):.2f} |")

def dinlet(lang):
    pl = json.load(open(f"{ROOT}/plan-sureleri.json")); L = int(round(sum(pl.values()) * SR)); v = np.zeros((L + SR, 2)); t0 = 0.0
    for pid in IDS:
        f = f"{ROOT}/{lang}/{pid}.mp3"
        raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f, "-af", P.ln(f, -18, -3), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
        xx = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float); n = min(len(xx), int(pl[pid] * SR)); s_ = int(t0 * SR); v[s_:s_ + n] += xx[:n]; t0 += pl[pid]
    v = v[:L]; tmp = f"{ADAY}/_{lang}.wav"; os.makedirs("public/paris/dinlet", exist_ok=True)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", tmp], input=v.astype(np.float32).tobytes(), check=True)
    out = f"public/paris/dinlet/v4-{lang}.mp3"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp, "-af", P.ln(tmp, -18, -1.5), "-ar", str(SR), "-b:a", "192k", out], check=True)
    pp = subprocess.run(["ffmpeg", "-hide_banner", "-i", out, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr; sm = pp[pp.rindex("Summary"):]
    import re
    print(lang, out, re.search(r"I:\s+(-?[\d.]+) LUFS", sm).group(1), "LUFS, TP", re.search(r"Peak:\s+(-?[\d.]+) dBFS", sm).group(1), f"{P.sure(out):.2f}s")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", out, "-filter_complex", "showwavespic=s=1800x300:colors=#2a7fff", "-frames:v", "1", f"public/paris/dinlet/dalga-v4-{lang}.png"], check=True)

if __name__ == "__main__":
    c = sys.argv[1]
    if c == "aday":
        for s in sys.argv[3:]: aday(sys.argv[2], int(s))
    elif c == "analiz": analiz(sys.argv[2])
    elif c == "kes": kes(sys.argv[2], sys.argv[3])
    elif c == "plan": plan()
    elif c == "dinlet": dinlet(sys.argv[2])
    elif c == "nefes": nefes_raporu(sys.argv[2], sys.argv[3])
