"""Ben-my-Chree miksi (cicero_miks.py'den türetildi; yollar + ortam lp_hz None): bolum.json + foley.json + ortam.json + müzik -> stem'ler + final (TR/EN, -14 LUFS / -1.5 dBTP).
Kullanım: python3 -I tools/benmychree_miks.py [tr|en ...]
Çıktı: public/benmychree/miks/<dil>/{anlatim,foley,muzik,ortam}.wav, public/benmychree/miks/<dil>.wav (+ -dalga.png), plan başına LUFS tablosu (stdout).
Kural: bolumler/ben-my-chree/miks.json + CLAUDE.md Ses. paris_miks.py'den türetildi (anlatım -18 LUFS = 0 dB ref)."""
import json, subprocess, sys, os, re
import numpy as np
SR, FPS = 44100, 60
B = "bolumler/ben-my-chree"; PUB = "public/"; OUT = PUB + "benmychree/miks/"
MUZIK = PUB + "benmychree/muzik/bmc-muzik-61.mp3"
# bolum.json'da olmayan temaslar (yönetmen ekleyene dek): (plan, kare, ad, dosya, tepe_ms, db)   TOPLU-DUZELTME #21
EK_TEMAS = []
FOLEY_KAZANC_DB = 0.0   # foley dosyaları tepe -3 dBFS'e eşitli; seviye onerilen_db/temas.db ile (-6..-14)
DB_ON = {}
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
bolum = json.load(open(f"{B}/bolum.json")); FOL = json.load(open(f"{B}/foley.json")); ORT = json.load(open(f"{B}/ortam.json"))["yataklar"]; MK = json.load(open(f"{B}/miks.json"))
bas, t0 = {}, 0
for p in bolum["planlar"]: bas[p["id"]] = t0; t0 += p["sure_kare"]
TOP = t0 / FPS; N = int(round(TOP * SR)); tp = lambda pid, k: (bas[pid] + k) / FPS
sure = {p["id"]: p["sure_kare"] for p in bolum["planlar"]}
MDB, DDB = MK["muzik"]["db"], MK["muzik"]["duck"]["anlatim_db"]; FVAR = MK["foley_varsayilan_db"]
rapor = {}
for dil in (sys.argv[1:] or ["tr", "en"]):
    key = "ses" if dil == "tr" else "ses_en"
    ses = np.zeros((N, 2))
    for p in bolum["planlar"]:
        for s in p[key]:
            x = oku(PUB + s["dosya"]); x = x * g(-18 - lufs(x)); koy(ses, kenar(x), tp(p["id"], s["kare"]))
    fol = np.zeros((N, 2)); cache = {}; nt = 0
    for p in bolum["planlar"]:
        for t in p["temaslar"]:
            a = t["ses"]; d = FOL[a]; db = t.get("db", d.get("onerilen_db", FVAR)); nt += 1
            if a not in cache: x = oku(PUB + d["dosya"]); cache[a] = x / max(np.abs(x).max(), 1e-6) * g(-3)
            koy(fol, kenar(cache[a] * g(db), 3), tp(p["id"], t["kare"]) - d["tepe_ms"] / 1000)
    hb = int(.05 * SR); nb = len(ses) // hb
    rms = lambda x, w: np.sqrt(np.convolve((x[:nb * hb].mean(1).reshape(nb, hb) ** 2).mean(1), np.ones(w) / w, "same"))
    ra, rf = rms(ses, 4), rms(fol, 1)
    k = np.where(ra > .02, np.clip(ra * g(-4) / (rf + 1e-9), g(-8), 1), 1.0)
    k = np.minimum(np.minimum(k, np.roll(k, 1)), np.roll(k, -1)); k = np.convolve(k, np.ones(3) / 3, "same")
    fol *= np.interp(np.arange(len(fol)), (np.arange(nb) + .5) * hb, k)[:, None]
    fol *= g(FOLEY_KAZANC_DB)
    amb = np.zeros((N, 2))
    for ad, o in ORT.items():
        x = oku(PUB + o["dosya"]); x = x * g(-18 - lufs(x))
        for u in o["kullanim"]:
            n = int((u["kare_bit"] - u["kare_bas"]) / FPS * SR) + int(.4 * SR); y = np.resize(x, (n, 2)) if n > len(x) else x[:n]
            y = (lp(y, u["lp_hz"]) if u.get("lp_hz") else y) * g(u["db"]); f = int(.4 * SR); y[:f] *= np.linspace(0, 1, f)[:, None]; y[-f:] *= np.linspace(1, 0, f)[:, None]
            koy(amb, y, u["kare_bas"] / FPS - .2)
    # müzik (miks.json): aralarda db, konuşmada duck (mutlak, dosya seviyesine göre); atak/bırakma
    m = oku(MUZIK)[:N]; m = np.vstack([m, np.zeros((N - len(m), 2))]) if len(m) < N else m
    e = env(ses, MK["muzik"]["duck"]["atak_kare"] / FPS, MK["muzik"]["duck"]["birakma_kare"] / FPS)
    X = mom98(m); m = m * g(-19.5 - X)   # müzik momentary %99.5 tepesi = anlatım referansı (0 dB); sonra aralık -16, konuşma -22 (tepelere de uyar)
    m = m * g(-16 * (1 - e) + -22 * e)[:, None]; print("müzik dosyası momentary p99.5:", round(X, 2), "LUFS -> kit eşdeğeri db", round(-35.5 - X, 1), "duck", round(-41.5 - X, 1))
    nf = int(.6 * SR)
    for x in (amb, fol): x[-nf:] *= np.linspace(1, 0, nf)[:, None]
    for nm, x in (("anlatim", ses), ("foley", fol), ("muzik", m), ("ortam", amb)): yaz(f"{OUT}{dil}/{nm}.wav", x)
    # seviye doğrulama: konuşmada müzik - anlatım, aralıkta müzik momentary - anlatım (-18 ref)
    hs = int(.4 * SR); nbk = len(ses) // hs
    sp = np.array([np.abs(ses[i*hs:(i+1)*hs]).max() > g(-40) for i in range(nbk)])
    def band(x, mask):
        v = [lufs(x[i*hs:(i+1)*hs]) for i in range(nbk) if mask[i] and np.abs(x[i*hs:(i+1)*hs]).max() > 1e-4]; return v
    vs = band(m, sp); vg = band(m, ~sp)
    print(dil, f"müzik konuşmada: medyan {np.median(vs)-(-18):.1f} dB (anlatım -18 ref), en yüksek {max(vs)+18:.1f}; aralarda en yüksek {(max(vg) if vg else -99)+18:.1f} dB; temas {nt}")
    top = ses + fol + m + amb; ham = f"{OUT}{dil}/_toplam.wav"; yaz(ham, top)
    a = "loudnorm=I=-14:TP=-2.0:LRA=11"
    ol = subprocess.run(["ffmpeg", "-hide_banner", "-i", ham, "-af", a + ":print_format=json", "-f", "null", "-"], capture_output=True).stderr.decode()
    j = json.loads(ol[ol.rindex("{"):])
    af = (f"loudnorm=I=-14:TP=-2.0:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,alimiter=limit=0.84:level=false")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", ham, "-af", af, "-ar", "48000", "-c:a", "pcm_s24le", f"{OUT}{dil}.wav"], check=True); os.remove(ham)
    ol = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{OUT}{dil}.wav", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True).stderr.decode()
    print(dil, "I:", re.findall(r"I:\s+(-?[\d.]+) LUFS", ol)[-1], "TP:", re.findall(r"Peak:\s+(-?[\d.]+) dBFS", ol)[-1], "sure", round(TOP, 2))
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{OUT}{dil}.wav", "-filter_complex", "showwavespic=s=1800x300:colors=0x3a7bd5", "-frames:v", "1", f"{OUT}{dil}-dalga.png"])
    # plan başına LUFS (48k final okunur)
    SRF = 48000
    b = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f"{OUT}{dil}.wav", "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True).stdout
    fx = np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64); L = {}
    for p in bolum["planlar"]:
        a0 = int(bas[p["id"]] / FPS * SR); a1 = int((bas[p["id"]] + sure[p["id"]]) / FPS * SR); L[p["id"]] = lufs(fx[a0:a1])
    med = float(np.median(list(L.values())))
    print(dil, "plan LUFS:", " ".join(f"{k}:{v:.1f}{'*' if abs(v - med) > 3 else ''}" for k, v in L.items()), f"| medyan {med:.1f} (* = ±3 LU dışı)")
