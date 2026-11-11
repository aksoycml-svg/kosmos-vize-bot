"""Paris Kusatmasi v5 tek cekim seslendirme (TR Alex, EN Brian), 11 plan, her cumleye duygu etiketi + vurgu. Anahtar: elevenlabs_api_key (yazdirilmaz).
  python3 -I tools/paris_ses_v5.py aday tr|en SEED... [--stab 0.75]  -> ADAY5/{lang}/s{seed}[_st75]/_tam.mp3/.json
  python3 -I tools/paris_ses_v5.py analiz tr|en [v4]      -> adaylar: kenar, sure, nefes, perde/RMS cesitliligi (v4 = eski tek cekim)
  python3 -I tools/paris_ses_v5.py kes tr|en ADAYADI [CIKIS_KOK]  -> nefes temizligi + 11 plana kesim (varsayilan public/paris/ses/{lang})
  python3 -I tools/paris_ses_v5.py plan | dinlet tr|en | karsilastir
Ayar: eleven_v3, stability .5 (Natural), style .5, similarity .85, speed 1.1, sabit seed; her cumlede inline etiket + BUYUK HARF vurgu kelimesi.
"""
import base64, json, os, re, sys, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
import paris_ses as P
import paris_ses_v4 as V4

ADAY = "/tmp/claude-0/-home-user-kosmos-vize-bot/130fb946-df07-5b55-8f99-3d7d0397d614/scratchpad/aday5"
SR = 44100; IDS = [f"P{i:02d}" for i in range(1, 12)]; ROOT = "public/paris/ses"; HEAD = 0.10; TAIL = 0.20
# Plan basina metin. Etiket = senaryo §3 duygusu; BUYUK HARF = vurgu kelimesi; "…" = duraklama.
V5 = {
 "tr": ["[curious] Bir fotoğrafçı, Paris'e yazılan mektupları kuşun KUYRUĞUNA sığdırdı. [tense] Önce şehirden ÇIKMALIYDI.",
        "[cold] Prusya Paris'i çevirdi, telgrafı KESTİ. [somber] İKİ MİLYON… insan dünyadan koptu.",
        "[worried] Mektuplar balonla çıkıyordu, ama balon DÖNMEZDİ. [anxious] CEVAP nasıl gelecek?",
        "[warm] Güvercin nerede olsa KÜMESİNE döner. [matter-of-fact] Onu balonla UZAĞA götürdüler.",
        "[disappointed] Ama kuş YÜK taşıyamaz. [excited] René Dagron'un fikri vardı: sayfayı PARMAK BOYUNA küçültmek.",
        "[serious] Bu iş DIŞARIDA, hükümetin olduğu Tours'ta yapılmalıydı. [low] Tek yol… BALONDU.",
        "[shocked] O sabah kalkan başka bir balon VURULDU. [relieved] Dagron'unki kum torbalarını atıp YÜKSELDİ.",
        "[tired] Prusya bölgesine indi, kaçıp TOURS'A vardı.",
        "[calm] Mektupları filme çekip kuşların KUYRUĞUNA bağladı.",
        "[whispering] Film duvara YANSIDI. [amazed] Parmak boyundaki sayfa yeniden BÜYÜDÜ. [warm] Paris mektuplarını… OKUDU.",
        "[sad] ÇOĞU kuş dönemedi. [warm] Ama dönenlerin KUYRUĞUNDA, bir şehrin mektupları vardı."],
 "en": ["[curious] One photographer squeezed Paris's mail onto a pigeon's TAIL. [tense] He had to ESCAPE first.",
        "[cold] Prussian armies ringed Paris and CUT the telegraph. [somber] TWO MILLION… people were cut off.",
        "[worried] Balloons took mail out, but COULDN'T return. [anxious] How would REPLIES come?",
        "[warm] Pigeons fly HOME from anywhere. [matter-of-fact] Balloons carried them AWAY.",
        "[disappointed] Birds can't carry MUCH. [excited] Dagron had an idea: shrink pages to FINGER SIZE.",
        "[serious] It had to happen in TOURS, with the government. [low] So… a BALLOON.",
        "[shocked] That morning another balloon was SHOT down. [relieved] Dagron's dumped sand and CLIMBED.",
        "[tired] He landed in Prussian territory and escaped to TOURS.",
        "[calm] He filmed the letters, tied them to pigeons' TAILS.",
        "[whispering] The film was PROJECTED. [amazed] The tiny page GREW, [warm] and Paris READ its mail.",
        "[sad] MOST birds never returned. [warm] Those that did carried a city's LETTERS."]}
def ayar(stab=0.5): return {"stability": stab, "similarity_boost": 0.85, "style": 0.5, "use_speaker_boost": True, "speed": 1.1}
def metin(lang): return " ".join(V5[lang])
def temiz_plan(lang, k): return re.sub(r"\s+", " ", re.sub(r"\[[^\]]*\]", "", V5[lang][k])).strip()
def sayilar(lang): return [len(temiz_plan(lang, k).split()) for k in range(11)]

def aday(lang, seed, stab=0.5):
    ad = f"s{seed}" + ("" if stab == 0.5 else f"_st{int(stab * 100)}"); d_ = f"{ADAY}/{lang}/{ad}"; os.makedirs(d_, exist_ok=True); VID, _ = P.VOICE[lang]
    d = P.post(f"/text-to-speech/{VID}/with-timestamps?output_format=mp3_44100_128",
               {"text": metin(lang), "model_id": "eleven_v3", "voice_settings": ayar(stab), "language_code": lang, "seed": seed})
    open(f"{d_}/_tam.mp3", "wb").write(base64.b64decode(d["audio_base64"])); a = d["alignment"]
    w = P.kelimeler(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"])
    json.dump({"text": metin(lang), "words": w, "seed": seed, "ayar": ayar(stab), "voice": VID}, open(f"{d_}/_tam.json", "w"), ensure_ascii=False, indent=1)
    print(lang, ad, "kelime", len(w), "beklenen", sum(sayilar(lang)), f"{P.sure(d_ + '/_tam.mp3'):.2f}s", flush=True)

def yukle(lang, ad, kok=None):
    f = f"{kok or ADAY}/{lang}/{ad}/_tam.mp3"; x = P.pcm(f); j = json.load(open(f"{kok or ADAY}/{lang}/{ad}/_tam.json"))
    g = 10 ** ((-18 - P.lufs(f)) / 20); return x * g, j["words"], g

def f0_serisi(x):
    """40 ms kare, 10 ms adim, otokorelasyon; sesli kare = guc yeterli ve tepe > .5. Donus: (t, f0 Hz, rms dB) sesli kareler."""
    n = int(0.04 * SR); h = int(0.01 * SR); lo, hi = int(SR / 300), int(SR / 70); out = []
    for i in range(0, len(x) - n, h):
        fr = x[i:i + n]; r = 20 * np.log10(np.sqrt((fr ** 2).mean()) + 1e-9)
        if r < -40: continue
        fr = fr - fr.mean(); ac = np.correlate(fr, fr, "full")[n - 1:]
        if ac[0] <= 0: continue
        ac = ac / ac[0]; k = lo + int(np.argmax(ac[lo:hi]))
        if ac[k] > 0.5: out.append((i / SR, SR / k, r))
    return np.array(out)

def cesit(x, w, lang):
    """Canlilik: perde std (yariton, plan ici ortalama + genel), RMS std (konusma kareleri, dB), plan ortalamasi RMS std."""
    s = f0_serisi(x); sn = sayilar(lang); b = []; i0 = 0
    for n in sn: b.append((w[i0]["s"] if i0 < len(w) else 1e9, w[min(i0 + n, len(w)) - 1]["e"])); i0 += n
    st = 12 * np.log2(s[:, 1] / np.median(s[:, 1])); ic, pm_r, pm_f = [], [], []
    for a, c in b:
        m = (s[:, 0] >= a) & (s[:, 0] <= c)
        if m.sum() > 10: ic.append(st[m].std()); pm_r.append(s[m, 2].mean()); pm_f.append(st[m].mean())
    return dict(f0_genel=float(st.std()), f0_plan_ici=float(np.mean(ic)), f0_planlar_arasi=float(np.std(pm_f)), rms_kare_std=float(s[:, 2].std()),
                rms_planlar_arasi=float(np.std(pm_r)), f0_medyan=float(np.median(s[:, 1])), sesli_oran=float(len(s) / (len(x) / SR / 0.01)))

def analiz(lang, v4=False):
    if v4:  # v4 tek cekim (V4 metni ve sayilari)
        ad = "s20251101" if lang == "tr" else "s23"; x, w, g = yukle(lang, ad, V4.ADAY); sn = V4.sayilar(lang); b = []; i0 = 0
        for n in sn: b.append((w[i0]["s"], w[i0 + n - 1]["e"])); i0 += n
        s = f0_serisi(x); st = 12 * np.log2(s[:, 1] / np.median(s[:, 1])); ic, pr, pf = [], [], []
        for a, c in b:
            m = (s[:, 0] >= a) & (s[:, 0] <= c)
            if m.sum() > 10: ic.append(st[m].std()); pr.append(s[m, 2].mean()); pf.append(st[m].mean())
        c_ = dict(f0_genel=float(st.std()), f0_plan_ici=float(np.mean(ic)), f0_planlar_arasi=float(np.std(pf)), rms_kare_std=float(s[:, 2].std()), rms_planlar_arasi=float(np.std(pr)))
        print(f"v4 {lang} {ad}:", {k: round(v, 2) for k, v in c_.items()}); return c_
    res = {}
    for ad in sorted(os.listdir(f"{ADAY}/{lang}")):
        f = f"{ADAY}/{lang}/{ad}/_tam.mp3"; x, w, g = yukle(lang, ad); n5 = int(0.005 * SR); son = V4.db(np.abs(x[-n5:]).max())
        k = subprocess.run(["python3", "-I", "tools/ses_kenar.py", "kontrol", f], capture_output=True, text=True).stdout.strip().splitlines()[-1]
        nf = len(V4.nefes_bul(x)); c_ = cesit(x, w, lang); nfl, hs = P.olc(f)
        print(f"{lang} {ad}: {len(x) / SR:.2f}s kelime {len(w)}/{sum(sayilar(lang))} son {son:.0f} dB nefes {nf} nf {nfl:.1f} 6k {hs:.1f} kenar: {k}")
        print("   ", {a: round(b_, 2) for a, b_ in c_.items()}); res[ad] = (k, c_)
    return res

def kes(lang, ad, kok=None):
    x, w, g = yukle(lang, ad); br = V4.nefes_bul(x); y = V4.temizle(x, br); r, *_ = V4.kare_ozellik(y); sn = sayilar(lang)
    assert len(w) == sum(sn), (len(w), sum(sn))
    print(f"{lang} {ad}: {len(br)} nefes temizlendi:")
    for t0, t1, d, c, h in br: print(f"   t={t0:6.2f}-{t1:6.2f} {(t1 - t0) * 1000:3.0f} ms {d:5.1f} dB, merkez {c:.0f} Hz")
    b = []; i0 = 0
    for n in sn: b.append((i0, i0 + n - 1)); i0 += n
    cuts = [0.0]
    for k in range(10):
        c_, sil = V4.sessiz_kesim(r, w[b[k][1]]["e"] - 0.25, w[b[k + 1][0]]["s"] + 0.25); cuts.append(c_)
        print(f"   sinir P{k + 1:02d}|P{k + 2:02d}: kesim {c_:6.2f} sn, sessiz kosu {sil * 1000:.0f} ms, seviye {r[int(c_ / 0.01)]:.0f} dB")
    cuts.append(len(y) / SR); out = f"{kok or ROOT}/{lang}"; os.makedirs(out, exist_ok=True); n5 = int(0.005 * SR); rows = []
    stab = json.load(open(f"{ADAY}/{lang}/{ad}/_tam.json"))["ayar"]
    for k, pid in enumerate(IDS):
        ia, ib = int(cuts[k] / 0.01), int(cuts[k + 1] / 0.01); act = np.where(r[ia:ib] > -50)[0]
        on, off = (ia + act[0]) * 0.01, (ia + act[-1] + 1) * 0.01
        t0 = max(cuts[k], on - HEAD); t1 = min(cuts[k + 1], off + TAIL)
        seg = (y[int(t0 * SR):int(t1 * SR)] / g).copy(); seg[:n5] *= np.linspace(0, 1, n5); seg[-n5:] *= np.linspace(1, 0, n5)
        mp3 = f"{out}/{pid}.mp3"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-b:a", "128k", mp3], input=seg.astype(np.float32).tobytes(), check=True)
        ww = []
        for u in w[b[k][0]:b[k][1] + 1]:
            a_, b_ = max(0, int(u["s"] / 0.01)), int(u["e"] / 0.01) + 1; ac = np.where(r[a_:b_] > -45)[0]
            if len(ac): su, eu = (a_ + ac[0]) * 0.01, (a_ + ac[-1] + 1) * 0.01
            else:
                ac = np.where(r[b_:b_ + 30] > -45)[0]
                su, eu = ((b_ + ac[0]) * 0.01, (b_ + ac[0]) * 0.01 + min(0.15, u["e"] - u["s"])) if len(ac) else (u["s"], u["e"])
            ww.append(dict(t=u["t"], s=round(su - t0, 3), e=round(eu - t0, 3)))
        km = P.kenar(mp3); nf, hs = P.olc(mp3); du = P.sure(mp3)
        pf = P.pcm(mp3); gg = 10 ** ((-18 - P.lufs(mp3)) / 20); pad = pf[:int(0.08 * SR)] * gg; padnf = 10 * np.log10(max((pad ** 2).mean(), 1e-12))
        json.dump({"id": pid, "lang": lang, "text": temiz_plan(lang, k), "text_etiketli": V5[lang][k], "words": ww, "dur": round(du, 3), "voice": P.VOICE[lang][0], "model": "eleven_v3",
                   "ayar": stab, "aday": ad, "tek_cekim": True, "v5": True, "kenar": km, "nf_dbfs": round(nf, 1), "hisirti_6k_dbfs": round(hs, 1), "pad_nf_dbfs": round(padnf, 1),
                   "kelime_zamani": "sinyale yapisik", "nefes_temizlendi": [round(a, 2) for a, bb, *_ in br if t0 <= a < t1]}, open(f"{out}/{pid}.json", "w"), ensure_ascii=False, indent=1)
        rows.append((pid, du, km, nf, hs)); print(f"{lang} {pid} {du:5.2f}s kenar {km} nf {nf:.1f} pad-nf {padnf:.1f} 6k {hs:.1f} ilk {ww[0]['s']:.2f} son {ww[-1]['e']:.2f}")
    print(lang, "klip toplami", f"{sum(r_[1] for r_ in rows):.2f}s")

def plan():
    out, rows = {}, []
    for pid in IDS:
        tr = P.sure(f"{ROOT}/tr/{pid}.mp3"); en = P.sure(f"{ROOT}/en/{pid}.mp3"); out[pid] = round(max(tr, en) + 0.4, 2); rows.append((pid, tr, en, out[pid]))
    json.dump(out, open(f"{ROOT}/plan-sureleri.json", "w"), indent=1)
    print("| Plan | TR sn | EN sn | Plan (max+0.4) |\n|---|---|---|---|")
    for pid, tr, en, p_ in rows: print(f"| {pid} | {tr:.2f} | {en:.2f} | {p_:.2f} |")
    print(f"| Toplam | {sum(r_[1] for r_ in rows):.2f} | {sum(r_[2] for r_ in rows):.2f} | {sum(out.values()):.2f} |")

def birlestir(kok, lang, ids, pl, out, ad):
    v = np.zeros((int(round(sum(pl[p] for p in ids) * SR)) + SR, 2)); t0 = 0.0
    for pid in ids:
        f = f"{kok}/{lang}/{pid}.mp3"
        raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f, "-af", P.ln(f, -18, -3), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
        xx = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float); n = min(len(xx), int(pl[pid] * SR)); s_ = int(t0 * SR); v[s_:s_ + n] += xx[:n]; t0 += pl[pid]
    v = v[:int(round(t0 * SR))]; tmp = f"{ADAY}/_{ad}.wav"; os.makedirs("public/paris/dinlet", exist_ok=True)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", tmp], input=v.astype(np.float32).tobytes(), check=True)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp, "-af", P.ln(tmp, -18, -1.5), "-ar", str(SR), "-b:a", "192k", out], check=True)
    pp = subprocess.run(["ffmpeg", "-hide_banner", "-i", out, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr; sm = pp[pp.rindex("Summary"):]
    print(out, re.search(r"I:\s+(-?[\d.]+) LUFS", sm).group(1), "LUFS, TP", re.search(r"Peak:\s+(-?[\d.]+) dBFS", sm).group(1), f"{P.sure(out):.2f}s")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", out, "-filter_complex", "showwavespic=s=1800x300:colors=#2a7fff", "-frames:v", "1", f"public/paris/dinlet/dalga-{ad}.png"], check=True)

def dinlet(lang):
    pl = json.load(open(f"{ROOT}/plan-sureleri.json")); birlestir(ROOT, lang, IDS, pl, f"public/paris/dinlet/v5-{lang}.mp3", f"v5-{lang}")

def karsilastir():
    """P01, P07, P10, P11: stab 0.5 (TR v5) -> 0.75 (ayni seed). Klip sirasi: 4x(0.5) sonra 4x(0.75); aralarda 0.8 sn bosluk yok, plan suresi kadar."""
    ids = ["P01", "P07", "P10", "P11"]; pl = json.load(open(f"{ROOT}/plan-sureleri.json")); kok = "public/paris/ses/_stab75"
    a = {f"A_{p}": pl[p] for p in ids}; b = {f"B_{p}": pl[p] for p in ids}
    tmp = f"{ADAY}/kars"; os.makedirs(f"{tmp}/tr", exist_ok=True)
    for p in ids:
        for pre, src in (("A", f"{ROOT}/tr/{p}.mp3"), ("B", f"{kok}/tr/{p}.mp3")): subprocess.run(["cp", src, f"{tmp}/tr/{pre}_{p}.mp3"], check=True)
    birlestir(tmp, "tr", list(a) + list(b), {**a, **b}, "public/paris/dinlet/v5-tr-karsilastir.mp3", "v5-tr-karsilastir")

if __name__ == "__main__":
    c = sys.argv[1]
    if c == "aday":
        stab = float(sys.argv[sys.argv.index("--stab") + 1]) if "--stab" in sys.argv else 0.5
        for s in [a for a in sys.argv[3:] if a.isdigit()]: aday(sys.argv[2], int(s), stab)
    elif c == "analiz": analiz(sys.argv[2], len(sys.argv) > 3 and sys.argv[3] == "v4")
    elif c == "kes": kes(sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else None)
    elif c == "plan": plan()
    elif c == "dinlet": dinlet(sys.argv[2])
    elif c == "karsilastir": karsilastir()
