"""Yarasa bombası final miksi: bolum.json + foley.json + ortam.json + müzik -> stem'ler + final (TR/EN, -14 LUFS / TP<=-1.5).
Kullanım: python3 -I tools/yarasa_miks.py [tr|en ...]
Çıktı: public/yarasa/miks/{tr,en}.wav, stem/{anlatim_tr,anlatim_en,foley,muzik,ortam}.wav (float32, kazançsız; final = toplam + G dB (stdout "G") + limiter),
       <dil>-dalga.png, stdout: LUFS/TP, plan başına LUFS, müzik/foley/ortam seviye denetimi. paris_miks.py'den uyarlandı. Kural: bolumler/yarasa-bombasi/miks.md"""
import json, subprocess, sys, os, re
import numpy as np
SR, FPS = 48000, 60
B = "bolumler/yarasa-bombasi"; PUB = "public/"; OUT = PUB + "yarasa/miks/"
MUZIK = PUB + "yarasa/muzik/yarasa-raindrop-63.mp3"
GB, DUCK_DB = -7.0, -6.0         # müzik taban kazancı, konuşmada ek duck (dosya yerel ≈ -27 LUFS -> aralar ≈ -34, konuşma ≈ -40 LUFS; anlatım -18)
CAP_ARA, CAP_KON = -35.5, -43.0  # mutlak tavanlar (LUFS momentary): anlatıma göre -16 / -22
FOLEY_KAZANC_DB = -3.0   # ducking sonrası global: foley tepeleri anlatım tepesinin medyan ≈ -7 dB altında (-5/-9 kuralı; Paris tur-18 ile aynı)
ORT_DB = {"oda-tonu": -27, "ruzgar-col": -25, "tank-inleme": -26}   # anlatıma göre (ortam yatakları -18 LUFS'e eşitlenip bu kadar altına)
ORT_PLAN = {"oda-tonu": ["P01","P02","P03","P04","P05","P06","P07"], "ruzgar-col": ["P08","P09","P12"], "tank-inleme": ["P09"]}
def run(cmd, inp=None): return subprocess.run(cmd, input=inp, capture_output=True, check=True)
def oku(f):
    b = run(["ffmpeg","-loglevel","error","-i",f,"-f","f32le","-ac","2","-ar",str(SR),"-"]).stdout
    return np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64)
def eb(x, extra=""):
    return run(["ffmpeg","-hide_banner","-nostats","-f","f32le","-ar",str(SR),"-ac","2","-i","-","-af","ebur128=peak=true"+extra,"-f","null","-"], x.astype(np.float32).tobytes()).stderr.decode()
def lufs(x): return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", eb(x))[-1])
def tpk(x): return float(re.findall(r"Peak:\s+(-?[\d.]+) dBFS", eb(x))[-1])
def mseries(x):
    p = run(["ffmpeg","-hide_banner","-nostats","-f","f32le","-ar",str(SR),"-ac","2","-i","-","-af","ebur128","-f","null","-"], x.astype(np.float32).tobytes()).stderr.decode()
    r = re.findall(r"t:\s*([\d.]+)\s.*?M:\s*(-?[\d.]+|-inf)", p)
    t = np.array([float(a) for a, _ in r]); m = np.array([-120.0 if b == "-inf" else float(b) for _, b in r]); return t, np.maximum(m, -120)
g = lambda db: 10 ** (np.asarray(db) / 20)
def yaz(f, x, codec="pcm_s24le"):
    os.makedirs(os.path.dirname(f), exist_ok=True)
    run(["ffmpeg","-loglevel","error","-y","-f","f32le","-ar",str(SR),"-ac","2","-i","-","-c:a",codec,f], x.astype(np.float32).tobytes())
def koy(buf, x, t):
    i = int(round(t * SR))
    if i < 0: x = x[-i:]; i = 0
    n = min(len(x), len(buf) - i)
    if n > 0: buf[i:i + n] += x[:n]
def kenar(x, ms=6):
    n = min(int(ms / 1000 * SR), len(x) // 2); x = x.copy(); r = np.linspace(0, 1, n)[:, None]; x[:n] *= r; x[-n:] *= r[::-1]; return x
def env(x, ata, sal):
    e = np.abs(x).max(axis=1); h = int(.02 * SR)
    e = np.sqrt(np.convolve(e ** 2, np.ones(h) / h, "same")); a = (e > g(-45)).astype(float)
    st = int(.001 * SR); ab = a[::st]; ob = np.zeros_like(ab); v = 0
    ka, ks = np.exp(-1 / (ata * 1000)), np.exp(-1 / (sal * 1000))
    for i, s in enumerate(ab):
        k = ka if s > v else ks; v = k * v + (1 - k) * s; ob[i] = v
    return np.interp(np.arange(len(x)), np.arange(len(ob)) * st, ob)
def lp(x, fc):
    b = run(["ffmpeg","-loglevel","error","-f","f32le","-ar",str(SR),"-ac","2","-i","-","-af",f"lowpass=f={fc}:p=2","-f","f32le","-"], x.astype(np.float32).tobytes()).stdout
    return np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64)
def sm(v, s):
    h = int(s * SR); c = np.cumsum(np.concatenate([[0], np.pad(v, (h//2, h - h//2), mode="edge")])); return ((c[h:] - c[:-h]) / h)[:len(v)]
def runmin(v, s):
    h = int(s * SR) // 4 * 4; w = v[::240]; k = max(1, int(s*SR/240))
    from numpy.lib.stride_tricks import sliding_window_view
    mn = sliding_window_view(np.pad(w, (k//2, k//2), mode="edge"), k).min(axis=1)[:len(w)]
    return np.interp(np.arange(len(v)), np.arange(len(w))*240, mn)
bolum = json.load(open(f"{B}/bolum.json")); FOL = json.load(open(f"{B}/foley.json"))
bas, t0 = {}, 0
for p in bolum["planlar"]: bas[p["id"]] = t0; t0 += p["sure_kare"]
TOP = t0 / FPS; N = int(round(TOP * SR)); tp = lambda pid, k: (bas[pid] + k) / FPS
sure = {p["id"]: p["sure_kare"] for p in bolum["planlar"]}
dils = sys.argv[1:] or ["tr", "en"]
cache = {}; fol_raw = None
def foley():
    fol = np.zeros((N, 2)); c = {}
    for p in bolum["planlar"]:
        for t in p["temaslar"]:
            a = t["ses"]; d = FOL[a]
            if a not in c: x = oku(PUB + d["dosya"]); c[a] = x / max(np.abs(x).max(), 1e-6) * g(-3)
            koy(fol, kenar(c[a] * g(t["db"]), 3), tp(p["id"], t["kare"]) - d["tepe_ms"] / 1000)
    return fol
def ortam():
    amb = np.zeros((N, 2))
    for ad, planlar in ORT_PLAN.items():
        x = oku(PUB + f"yarasa/foley/{ad}.mp3"); x = x * g(-18 - lufs(x))
        for pid in planlar:
            n = int(sure[pid] / FPS * SR) + int(.4 * SR); y = np.resize(x, (n, 2)) if n > len(x) else x[:n]
            if ad == "ruzgar-col": y = lp(y, 1500)
            y = y * g(ORT_DB[ad]); f = int(.4 * SR); y[:f] *= np.linspace(0, 1, f)[:, None]; y[-f:] *= np.linspace(1, 0, f)[:, None]
            koy(amb, y, tp(pid, 0) - .2)
    return amb
def anlat(dil):
    key = "ses" if dil == "tr" else "ses_en"; ses = np.zeros((N, 2))
    for p in bolum["planlar"]:
        for s in p[key]:
            x = oku(PUB + s["dosya"]); x = x * g(-18 - lufs(x)); koy(ses, kenar(x), tp(p["id"], s["kare"]))
    return ses
def duck_foley(fol, ses):
    hb = int(.05 * SR); nb = len(ses) // hb
    rms = lambda x, w: np.sqrt(np.convolve((x[:nb * hb].mean(1).reshape(nb, hb) ** 2).mean(1), np.ones(w) / w, "same"))
    ra, rf = rms(ses, 4), rms(fol, 1)
    k = np.where(ra > .02, np.clip(ra * g(-4) / (rf + 1e-9), g(-8), 1), 1.0)
    k = np.minimum(np.minimum(k, np.roll(k, 1)), np.roll(k, -1)); k = np.convolve(k, np.ones(3) / 3, "same")
    return fol * np.interp(np.arange(len(fol)), (np.arange(nb) + .5) * hb, k)[:, None] * g(FOLEY_KAZANC_DB)
def muzik(ses):
    m = oku(MUZIK)[:N]; m = np.vstack([m, np.zeros((N - len(m), 2))]) if len(m) < N else m
    t, M = mseries(m); Lm = np.interp(np.arange(N) / SR, t - .2, M)   # momentary pencere ortasına hizala
    e = env(ses, .12, .6)
    gdb = np.minimum(GB + DUCK_DB * e, (CAP_ARA * (1 - e) + CAP_KON * e) - Lm)
    gdb = sm(runmin(gdb, .5), .3)
    gdb = np.minimum(gdb, (CAP_ARA * (1 - e) + CAP_KON * e) - Lm + 0.0) if False else gdb
    m = m * g(gdb)[:, None]
    f = int(.3 * SR); m[:f] *= np.linspace(0, 1, f)[:, None]; nf = int(1.2 * SR); m[-nf:] *= np.linspace(1, 0, nf)[:, None]
    return m
def sev(m, ses, ad):   # konuşma/ara müzik seviyesi: momentary(m) - (-18)
    t, Mm = mseries(m); e = np.interp(t, np.arange(N)/SR, env(ses, .12, .6)) if False else None
    ea = env(ses, .12, .6)[(t*SR).astype(int).clip(0, N-1)]
    return Mm, ea, t
if __name__ == "__main__":
    fol = duck_foley(foley(), anlat(dils[0])); amb = ortam(); nf = int(.6 * SR)
    for x in (amb, fol): x[-nf:] *= np.linspace(1, 0, nf)[:, None]
    for dil in dils:
        ses = anlat(dil); fol_d = duck_foley(foley(), ses); mu = muzik(ses)
        top = ses + fol_d + mu + amb
        I0 = lufs(top); G = -14 - I0
        stems = {f"anlatim_{dil}": ses, "foley": fol_d, "muzik": mu, "ortam": amb}
        # master: sabit kazanç + limiter; stem'lere aynı kazanç
        def lim_(G):
            lim = run(["ffmpeg","-loglevel","error","-f","f32le","-ar",str(SR),"-ac","2","-i","-","-af","alimiter=limit=0.76:level=false:attack=3:release=60","-f","f32le","-"], (top * g(G)).astype(np.float32).tobytes()).stdout
            return np.frombuffer(lim, np.float32).reshape(-1, 2).astype(np.float64)
        for _ in range(4):
            fin = lim_(G); d = -14 - lufs(fin)
            if abs(d) < 0.05: break
            G += d
        yaz(f"{OUT}{dil}.wav", fin)
        for nm, x in stems.items(): yaz(f"{OUT}stem/{nm}.wav", x, "pcm_f32le")
        s = eb(fin); print(dil, "I:", re.findall(r"I:\s+(-?[\d.]+) LUFS", s)[-1], "TP:", re.findall(r"Peak:\s+(-?[\d.]+) dBFS", s)[-1], "LRA:", re.findall(r"LRA:\s+(-?[\d.]+) LU", s)[-1], "sure", round(TOP, 3), "G", round(float(G), 2))
        run(["ffmpeg","-loglevel","error","-y","-i",f"{OUT}{dil}.wav","-filter_complex","showwavespic=s=1800x300:colors=0x3a7bd5","-frames:v","1",f"{OUT}{dil}-dalga.png"])
        L = {}
        for p in bolum["planlar"]:
            a0 = int(bas[p["id"]] / FPS * SR); a1 = int((bas[p["id"]] + sure[p["id"]]) / FPS * SR); L[p["id"]] = lufs(fin[a0:a1])
        med = float(np.median(list(L.values())))
        print(dil, "plan LUFS:", " ".join(f"{k}:{v:.1f}{'*' if abs(v-med)>3 else ''}" for k, v in L.items()), f"| medyan {med:.1f}")
        # seviye denetimi (anlatıma göre, final kazancı dahil): müzik momentary - anlatım ref(-18+G)
        ref = -18 + G; Mm, ea, t = sev(mu * g(G), ses, dil)
        kon = ea > .9; ara = ea < .1
        print(dil, f"müzik konuşmada max M {Mm[kon].max()-ref:+.1f} dB (hedef ≤ -22) | aralarda max {Mm[ara].max()-ref:+.1f} dB (≤ -16)")
        for p in bolum["planlar"]:
            i = (t >= bas[p["id"]]/FPS) & (t < (bas[p["id"]]+sure[p["id"]])/FPS)
            kk, aa = i & kon, i & ara
            print(f"  {p['id']} kon {Mm[kk].max()-ref if kk.any() else float('nan'):+.1f} ara {Mm[aa].max()-ref if aa.any() else float('nan'):+.1f}", end=";")
        print()
