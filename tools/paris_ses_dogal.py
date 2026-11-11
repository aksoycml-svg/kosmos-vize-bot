"""Paris Kusatmasi dogallik denemesi (yalniz TR; P01+P07+P10). Anahtar: elevenlabs_api_key (yazdirilmaz).
  python3 -I tools/paris_ses_dogal.py uret      -> ham kayitlar (scratchpad) + public/paris/ses/dogal/{ad}/P01,P07,P10.mp3
  python3 -I tools/paris_ses_dogal.py analiz    -> kenar, noise floor, perde ve duraklama dagilimi
  python3 -I tools/paris_ses_dogal.py dinlet    -> public/paris/dinlet/dogal-karsilastir-tr.mp3 + .txt + dalga png
A: v3 etiketsiz/buyuksuz, tek cekim | B: multilingual_v2 tek cekim | C: v2 plan plan + previous/next_text | D: B ayari, baska ses (Doga).
"""
import base64, json, os, re, sys, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
import paris_ses as P, paris_ses_v4 as V4, paris_ses_v5 as V5

SR = 44100; OUT = "public/paris/ses/dogal"; IDS = ["P01", "P07", "P10"]
HAM = "/tmp/claude-0/-home-user-kosmos-vize-bot/130fb946-df07-5b55-8f99-3d7d0397d614/scratchpad/dogal"
ALEX = P.VOICE["tr"][0]; DOGA = "ctoYieZ4J7WwcdhujpMq"; OZAN = "5nr6ATQepuidiLb6OT3B"
# sade metin: etiket yok, buyuk harf yok. "…" yalniz kancada (P01), yalniz A'da.
PL = {"P01": "Bir fotoğrafçı, Paris'e yazılan mektupları kuşun kuyruğuna sığdırdı. Önce şehirden çıkmalıydı.",
      "P07": "O sabah kalkan başka bir balon vuruldu. Dagron'unki kum torbalarını atıp yükseldi.",
      "P10": "Film duvara yansıdı. Parmak boyundaki sayfa yeniden büyüdü. Paris mektuplarını okudu."}
PL_A = dict(PL); PL_A["P01"] = "Bir fotoğrafçı, Paris'e yazılan mektupları kuşun kuyruğuna sığdırdı… Önce şehirden çıkmalıydı."
def tr_lower(s): return s.replace("İ", "i").replace("I", "ı").lower()
def baglam(k):
    """v5 tum metni (etiket silinmis, BUYUK HARF kelimeler kucuk). Plan k (0-10) oncesi / sonrasi."""
    def t(s):
        s = re.sub(r"\[[^\]]*\]\s*", "", s)
        return " ".join((w if not (len(re.sub(r"\W", "", w)) > 1 and w.upper() == w) else (tr_lower(w).capitalize() if w.startswith("TOURS") else tr_lower(w))) for w in s.split())
    pl = [t(s) for s in V5.V5["tr"]]
    return " ".join(pl[:k]), " ".join(pl[k + 1:])
V5IDX = {"P01": 0, "P07": 6, "P10": 9}
AY_V3 = {"stability": 0.5, "similarity_boost": 0.85, "style": 0.3, "use_speaker_boost": True, "speed": 1.0}
AY_B = {"stability": 0.45, "similarity_boost": 0.8, "style": 0.2, "use_speaker_boost": True, "speed": 1.0}
AY_C = {"stability": 0.5, "similarity_boost": 0.8, "style": 0.2, "use_speaker_boost": True, "speed": 1.0}
# ad -> (aciklama, ses, model, ayar, mod, seed)
ADAYLAR = {"A_s7": ("A v3 etiketsiz", ALEX, "eleven_v3", AY_V3, "tek", 7), "A_s11": ("A v3 etiketsiz", ALEX, "eleven_v3", AY_V3, "tek", 11),
           "B_s7": ("B v2 tek cekim", ALEX, "eleven_multilingual_v2", AY_B, "tek", 7), "B_s11": ("B v2 tek cekim", ALEX, "eleven_multilingual_v2", AY_B, "tek", 11),
           "C_s7": ("C v2 plan plan+baglam", ALEX, "eleven_multilingual_v2", AY_C, "plan", 7),
           "D_s7": ("D v2 Doga tek cekim", DOGA, "eleven_multilingual_v2", AY_B, "tek", 7), "D_s11": ("D v2 Doga tek cekim", DOGA, "eleven_multilingual_v2", AY_B, "tek", 11)}

def tts(vid, model, ayar, text, seed, **extra):
    body = {"text": text, "model_id": model, "voice_settings": ayar, "seed": seed, **extra}
    if model == "eleven_v3": body["language_code"] = "tr"
    d = P.post(f"/text-to-speech/{vid}/with-timestamps?output_format=mp3_44100_128", body)
    a = d["alignment"]; return base64.b64decode(d["audio_base64"]), P.kelimeler(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"])

def kaydet(seg, mp3):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-b:a", "128k", mp3], input=seg.astype(np.float32).tobytes(), check=True)

def isle(ad, mp3_tam, words, sayi):
    """-18 LUFS'e esitle, nefes temizle, 3 plana kes (sessiz_yakin), baş 0.10 / son 0.20 payi, 5 ms fade; klipleri OUT/ad/ altina yaz."""
    x = P.pcm(mp3_tam); g = 10 ** ((-18 - P.lufs(mp3_tam)) / 20); x = x * g
    br = V4.nefes_bul(x); y = V4.temizle(x, br); r, *_ = V4.kare_ozellik(y)
    b = []; i0 = 0
    for n in sayi: b.append((i0, i0 + n - 1)); i0 += n
    if len(words) != sum(sayi): print("  UYARI kelime sayisi", len(words), "beklenen", sum(sayi))
    cuts = [0.0]
    for k in range(len(sayi) - 1):
        c_, sil, ks = V5.sessiz_yakin(r, words[b[k][1]]["e"], words[b[k + 1][0]]["s"]); cuts.append(c_)
        print(f"  sinir {k + 1}|{k + 2}: kesim {c_:.2f}, sessiz {sil * 1000:.0f} ms, kayma {ks:+.2f}")
    cuts.append(len(y) / SR); os.makedirs(f"{OUT}/{ad}", exist_ok=True)
    for k, pid in enumerate(IDS): klip(y, r, cuts[k], cuts[k + 1], g, f"{OUT}/{ad}/{pid}.mp3")
    return len(br)

def klip(y, r, c0, c1, g, mp3):
    n5 = int(0.005 * SR); ia, ib = int(c0 / 0.01), int(c1 / 0.01); act = np.where(r[ia:ib] > -50)[0]
    on, off = (ia + act[0]) * 0.01, (ia + act[-1] + 1) * 0.01; t0 = max(c0, on - V5.HEAD); t1 = min(c1, off + V5.TAIL)
    seg = (y[int(t0 * SR):int(t1 * SR)] / g).copy(); seg[:n5] *= np.linspace(0, 1, n5); seg[-n5:] *= np.linspace(1, 0, n5); kaydet(seg, mp3)

def uret():
    for ad, (ac, vid, model, ayar, mod, seed) in ADAYLAR.items():
        d_ = f"{HAM}/{ad}"; os.makedirs(d_, exist_ok=True); pl = PL_A if ac.startswith("A ") else PL
        if mod == "tek":
            text = " ".join(pl[p] for p in IDS); mp3b, w = tts(vid, model, ayar, text, seed)
            open(f"{d_}/_tam.mp3", "wb").write(mp3b); json.dump({"text": text, "words": w}, open(f"{d_}/_tam.json", "w"), ensure_ascii=False)
            nb = isle(ad, f"{d_}/_tam.mp3", w, [len(pl[p].split()) for p in IDS]); print(ad, ac, f"{P.sure(d_ + '/_tam.mp3'):.2f}s nefes {nb}", flush=True)
        else:  # plan plan, v5 tum metni baglam
            os.makedirs(f"{OUT}/{ad}", exist_ok=True)
            for pid in IDS:
                pre, nxt = baglam(V5IDX[pid]); mp3b, w = tts(vid, model, ayar, pl[pid], seed, previous_text=pre, next_text=nxt)
                f = f"{d_}/{pid}_ham.mp3"; open(f, "wb").write(mp3b); x = P.pcm(f); g = 10 ** ((-18 - P.lufs(f)) / 20); x = x * g
                br = V4.nefes_bul(x); y = V4.temizle(x, br); r, *_ = V4.kare_ozellik(y); klip(y, r, 0.0, len(y) / SR, g, f"{OUT}/{ad}/{pid}.mp3")
                print(ad, pid, f"{P.sure(f):.2f}s nefes {len(br)}", flush=True)

def sessiz_dagilim(x):
    """x: -18 LUFS, konusma kenarina kirpilmis. Ic duraklamalar (>=100 ms, r < -45 dB). Donus: sureler, orta noktalar."""
    r, *_ = V4.kare_ozellik(x); act = np.where(r > -45)[0]; a, b = act[0], act[-1]; q = r[a:b + 1] < -45; out = []; i = 0
    while i < len(q):
        if q[i]:
            j = i
            while j < len(q) and q[j]: j += 1
            if (j - i) >= 10: out.append(((j - i) * 0.01, (a + (i + j) / 2) * 0.01))
            i = j
        else: i += 1
    return out, (b - a + 1) * 0.01

def analiz():
    kume = {"v5": f"public/paris/ses/tr", **{ad: f"{OUT}/{ad}" for ad in ADAYLAR}}; sat = []
    for ad, kok in kume.items():
        fs = [f"{kok}/{p}.mp3" for p in IDS]; kenar = [subprocess.run(["python3", "-I", "tools/ses_kenar.py", "kontrol", f], capture_output=True, text=True).stdout.strip().split("-> ")[-1] for f in fs]
        nf = [P.olc(f) for f in fs]; xs = []; dur = []; pa = []; act = 0.0; nw = 0
        for f, p in zip(fs, IDS):
            x = P.pcm(f); x = x * 10 ** ((-18 - P.lufs(f)) / 20); xs.append(x); dur.append(len(x) / SR)
            d, a = sessiz_dagilim(x); pa += [(s, t + sum(dur[:-1])) for s, t in d]; act += a; nw += len((PL[p]).split())
        s = np.concatenate([V5.f0_serisi(x) for x in xs]); st = 12 * np.log2(s[:, 1] / np.median(s[:, 1]))
        dsemi = np.abs(np.diff(st)); dsemi = dsemi[dsemi < 6]  # ardisik sesli kareler (10 ms) arasi atlamalar; oktav hatalari at
        du = np.array([a for a, _ in pa]); mid = np.array([m for _, m in pa]); ar = np.diff(mid)
        sat.append((ad, kenar, nf, dict(sure=sum(dur), kelime_sn=nw / act, perde_std=st.std(), perde_p10_90=np.percentile(st, 90) - np.percentile(st, 10), perde_adim=dsemi.mean(),
                    dur_n=len(du), dur_med=np.median(du) if len(du) else 0, dur_p90=np.percentile(du, 90) if len(du) else 0, dur_cv=du.std() / du.mean() if len(du) else 0,
                    ara_cv=ar.std() / ar.mean() if len(ar) > 2 else 0, dur_ps=len(du) / act)))
    print("| aday | sure | kel/sn | perde std | p10-90 | adim | dur n | med | p90 | dur CV | ara CV | dur/sn | nf (en kotu) | 6k | kenar |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|")
    for ad, k, nf, m in sat:
        print(f"| {ad} | {m['sure']:.1f} | {m['kelime_sn']:.2f} | {m['perde_std']:.2f} | {m['perde_p10_90']:.1f} | {m['perde_adim']:.2f} | {m['dur_n']} | {m['dur_med']:.2f} | {m['dur_p90']:.2f} | {m['dur_cv']:.2f} | {m['ara_cv']:.2f} | {m['dur_ps']:.2f} | {max(n for n, _ in nf):.1f} | {max(h for _, h in nf):.1f} | {'/'.join(k)} |")

def dinlet():
    SR_ = SR; sira = [("v5 (mevcut Alex v3 etiketli)", "public/paris/ses/tr")] + [(ADAYLAR[ad][0] + " " + ad, f"{OUT}/{ad}") for ad in ADAYLAR]
    parca = []; lst = []; t = 0.0; gap = np.zeros(int(1.5 * SR_))
    for ad, kok in sira:
        fs = [f"{kok}/{p}.mp3" for p in IDS]; xs = [P.pcm(f) for f in fs]; g_ = np.concatenate(xs); tmp = f"{HAM}/_g.wav"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR_), "-ac", "1", "-i", "-", tmp], input=g_.astype(np.float32).tobytes(), check=True)
        k = 10 ** ((-18 - P.lufs(tmp)) / 20); g_ = g_ * k; lst.append(f"{t:6.1f} s  {ad}  ({len(g_) / SR_:.1f} s)"); parca += [g_, gap]; t += len(g_) / SR_ + 1.5
    v = np.concatenate(parca[:-1]); wav = f"{HAM}/_dogal.wav"; os.makedirs("public/paris/dinlet", exist_ok=True)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR_), "-ac", "1", "-i", "-", wav], input=v.astype(np.float32).tobytes(), check=True)
    out = "public/paris/dinlet/dogal-karsilastir-tr.mp3"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-af", P.ln(wav, -18, -1.5), "-ar", str(SR_), "-b:a", "192k", out], check=True)
    open("public/paris/dinlet/dogal-karsilastir-tr.txt", "w").write("Sira (her grup: P01 + P07 + P10 art arda; gruplar arasi 1.5 sn, sira sesi yok)\n" + "\n".join(f"{i + 1}. {l}" for i, l in enumerate(lst)) + "\n")
    pp = subprocess.run(["ffmpeg", "-hide_banner", "-i", out, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr; sm = pp[pp.rindex("Summary"):]
    print(out, re.search(r"I:\s+(-?[\d.]+) LUFS", sm).group(1), "LUFS, TP", re.search(r"Peak:\s+(-?[\d.]+) dBFS", sm).group(1), f"{P.sure(out):.1f}s"); print("\n".join(lst))
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", out, "-filter_complex", "showwavespic=s=2400x300:colors=#2a7fff", "-frames:v", "1", "public/paris/dinlet/dalga-dogal-karsilastir-tr.png"], check=True)

if __name__ == "__main__": {"uret": uret, "analiz": analiz, "dinlet": dinlet}[sys.argv[1]]()
