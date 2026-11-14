"""Paris miksi (taslak): bolum.json + foley.json + ortam.json + müzik -> stem'ler + final (TR/EN, -14 LUFS / -1.5 dBTP).
Kullanım: python3 -I tools/paris_miks.py [tr|en ...]
Çıktı: public/paris/miks/<dil>/{anlatim,foley,muzik,ortam}.wav, public/paris/miks/<dil>.wav (+ -dalga.png), plan başına LUFS tablosu (stdout).
Kural: bolumler/paris-kusatmasi/miks.md. evliya_miks.py'den türetildi (anlatım -18 LUFS = 0 dB ref)."""
import json, subprocess, sys, os, re
import numpy as np
SR, FPS = 44100, 60
B = "bolumler/paris-kusatmasi"; PUB = "public/"; OUT = PUB + "paris/miks/"
MUZIK = PUB + "paris/muzik/paris-chopin-op9no2-58.mp3"
# bolum.json'da olmayan temaslar (yönetmen ekleyene dek): (plan, kare, ad, dosya, tepe_ms, db)   TOPLU-DUZELTME #21
EK_TEMAS = [("P06", 218, "pk-halat-kavra", "paris/sfx/pk-halat-kavra.mp3", 37, -16)]
DB_ON = {"pk-odak-disli": -18}   # görünmeyen kaynak -> ortam seviyesi (bolum.json -10 yazıyor)
def oku(f):
    b = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64)
def lufs(x):
    p = subprocess.run(["ffmpeg", "-hide_banner", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-af", "ebur128", "-f", "null", "-"], input=x.astype(np.float32).tobytes(), capture_output=True).stderr.decode()
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", p)[-1])
def mom98(x):
    p = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-af", "ebur128", "-f", "null", "-"], input=x.astype(np.float32).tobytes(), capture_output=True).stderr.decode()
    M = np.array([float(v) for v in re.findall(r"M:\s*(-?[\d.]+)\s+S:", p)]); return float(np.percentile(M[M > -60], 99.5))
g = lambda db: 10 ** (db / 20)
def yaz(f, x):
    os.makedirs(os.path.dirname(f), exist_ok=True)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "pcm_s24le", f], input=x.astype(np.float32).tobytes(), check=True)
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
    b = subprocess.run(["ffmpeg", "-loglevel", "error", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-af", f"lowpass=f={fc}:p=2", "-f", "f32le", "-"], input=x.astype(np.float32).tobytes(), capture_output=True, check=True).stdout
    return np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64)
bolum = json.load(open(f"{B}/bolum.json")); FOL = json.load(open(f"{B}/foley.json")); ORT = json.load(open(f"{B}/ortam.json"))
bas, t0 = {}, 0
for p in bolum["planlar"]: bas[p["id"]] = t0; t0 += p["sure_kare"]
TOP = t0 / FPS; N = int(round(TOP * SR)); tp = lambda pid, k: (bas[pid] + k) / FPS
sure = {p["id"]: p["sure_kare"] for p in bolum["planlar"]}
def muzik_ek():  # (sn, dB) kontrol noktaları; tavan -16 ayrıca uygulanır
    f = tp
    return np.array([(0, 0), (f("P07", 100), 0), (f("P07", 108), -3), (f("P07", 190), -3), (f("P07", 200), 0),
                     (f("P07", 214), 1.5), (f("P07", 280), 0), (f("P10", 48), 0), (f("P10", 96), 1.5), (f("P10", 230), 2), (f("P10", 300), 0),
                     (f("P11", 60), -1.5), (f("P11", 135), -3.5), (f("P11", 170), 0), (TOP, 0)])
def zarf(n):
    p = muzik_ek(); s = np.interp(np.arange(n) / SR, p[:, 0], p[:, 1]); h = int(.25 * SR)
    return g(np.convolve(s, np.ones(h) / h, "same"))
rapor = {}
for dil in (sys.argv[1:] or ["tr", "en"]):
    key = "ses" if dil == "tr" else "ses_en"
    ses = np.zeros((N, 2)); anl_plan = {}
    for p in bolum["planlar"]:
        for s in p[key]:
            x = oku(PUB + s["dosya"]); x = x * g(-18 - lufs(x)); koy(ses, kenar(x), tp(p["id"], s["kare"]))
    # foley
    fol = np.zeros((N, 2)); cache = {}
    olaylar = [(p["id"], t["kare"], t["ses"], t["db"]) for p in bolum["planlar"] for t in p["temaslar"]]
    for pid, k, a, db in olaylar + [(e[0], e[1], e[2], e[5]) for e in EK_TEMAS]:
        if a in DB_ON: db = DB_ON[a]
        d = FOL[a] if a in FOL else {"dosya": next(e[3] for e in EK_TEMAS if e[2] == a), "tepe_ms": next(e[4] for e in EK_TEMAS if e[2] == a)}
        if a not in cache: x = oku(PUB + d["dosya"]); cache[a] = x / max(np.abs(x).max(), 1e-6) * g(-3)
        koy(fol, kenar(cache[a] * g(db), 3), tp(pid, k) - d["tepe_ms"] / 1000)
    hb = int(.05 * SR); nb = len(ses) // hb
    rms = lambda x, w: np.sqrt(np.convolve((x[:nb * hb].mean(1).reshape(nb, hb) ** 2).mean(1), np.ones(w) / w, "same"))
    ra, rf = rms(ses, 4), rms(fol, 1)
    k = np.where(ra > .02, np.clip(ra * g(-4) / (rf + 1e-9), g(-8), 1), 1.0)
    k = np.minimum(np.minimum(k, np.roll(k, 1)), np.roll(k, -1)); k = np.convolve(k, np.ones(3) / 3, "same")
    fol *= np.interp(np.arange(len(fol)), (np.arange(nb) + .5) * hb, k)[:, None]
    # ortam
    amb = np.zeros((N, 2))
    for ad, o in ORT.items():
        if not isinstance(o, dict): continue
        x = oku(PUB + o["dosya"]); x = x * g(-18 - lufs(x))
        for pid in o["planlar"]:
            n = int(sure[pid] / FPS * SR) + int(.4 * SR); y = np.resize(x, (n, 2)) if n > len(x) else x[:n]
            if o.get("lp_hz"): y = lp(y, o["lp_hz"])
            elif ad.startswith("ruzgar"): y = lp(y, 1500)
            y = y * g(o["db"]); f = int(.4 * SR); y[:f] *= np.linspace(0, 1, f)[:, None]; y[-f:] *= np.linspace(1, 0, f)[:, None]
            koy(amb, y, tp(pid, 0) - .2)
    # müzik: konuşmada -22, aralarda <= -16
    m = oku(MUZIK); m = m[:N]; m = np.vstack([m, np.zeros((N - len(m), 2))]) if len(m) < N else m
    m = m * g(-18 - mom98(m)); e = env(ses, .12, .6)   # müzik zirvesi (momentary %98) = -18 LUFS ref; böylece -22/-16 kuralı tepelere de uyar
    duck = -16 * (1 - e) + -22 * e; z = 20 * np.log10(zarf(N)); z = np.where(z > 0, z * (1 - .5 * e), z)
    m = m * g(np.minimum(duck + z, -16))[:, None]
    nf = int(.6 * SR)
    for x in (amb, fol): x[-nf:] *= np.linspace(1, 0, nf)[:, None]
    for nm, x in (("anlatim", ses), ("foley", fol), ("muzik", m), ("ortam", amb)): yaz(f"{OUT}{dil}/{nm}.wav", x)
    top = ses + fol + m + amb; ham = f"{OUT}{dil}/_toplam.wav"; yaz(ham, top)
    a = "loudnorm=I=-14:TP=-2.0:LRA=11"
    ol = subprocess.run(["ffmpeg", "-hide_banner", "-i", ham, "-af", a + ":print_format=json", "-f", "null", "-"], capture_output=True).stderr.decode()
    j = json.loads(ol[ol.rindex("{"):])
    af = (f"loudnorm=I=-14:TP=-2.0:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,alimiter=limit=0.84:level=false")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", ham, "-af", af, "-ar", "48000", "-c:a", "pcm_s24le", f"{OUT}{dil}.wav"], check=True); os.remove(ham)
    ol = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{OUT}{dil}.wav", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True).stderr.decode()
    print(dil, "I:", re.findall(r"I:\s+(-?[\d.]+) LUFS", ol)[-1], "TP:", re.findall(r"Peak:\s+(-?[\d.]+) dBFS", ol)[-1], "sure", round(TOP, 2))
    fin = oku(f"{OUT}{dil}.wav") if False else None
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{OUT}{dil}.wav", "-filter_complex", "showwavespic=s=1800x300:colors=0x3a7bd5", "-frames:v", "1", f"{OUT}{dil}-dalga.png"])
    # plan başına LUFS (48k final okunur)
    SRF = 48000
    b = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f"{OUT}{dil}.wav", "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True).stdout
    fx = np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64); L = {}
    for p in bolum["planlar"]:
        a0 = int(bas[p["id"]] / FPS * SR); a1 = int((bas[p["id"]] + sure[p["id"]]) / FPS * SR); L[p["id"]] = lufs(fx[a0:a1])
    med = float(np.median(list(L.values())))
    print(dil, "plan LUFS:", " ".join(f"{k}:{v:.1f}{'*' if abs(v - med) > 3 else ''}" for k, v in L.items()), f"| medyan {med:.1f} (* = ±3 LU dışı)")
