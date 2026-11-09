"""Evliya miksi: bolum.json + foley.json -> stem'ler + final (TR/EN).
Kullanım: python3 -I tools/evliya_miks.py [tr|en ...]
Çıktı: public/evliya/miks/<dil>/{anlatim,foley,muzik,ortam}.wav (44.1k stereo, 0 dB ref = anlatım -18 LUFS),
       public/evliya/miks/<dil>.wav (toplam, -14 LUFS / -1.5 dBTP). Seviyeler: CLAUDE.md "Ses".
Anlatım -18 LUFS (replik klibi aynı dosyada, ayrı -19 yok: bkz. katki-raporu), foley: tepe -3 dBFS'e eşitlenir + temas dB,
ambiyans: -18 LUFS'e eşitlenir + dB, müzik: anlatımın -8 dB altında, konuşma varken -18 dB altına ducking."""
import json, subprocess, sys, os, re
import numpy as np
SR, FPS = 44100, 60
B = "bolumler/evliya-ucuslari"; PUB = "public/"
OUT = PUB + "evliya/miks/"
MUZIK = PUB + "evliya/muzik/evliya-hicaz-62.9.mp3"


def oku(f):
    b = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64)


def lufs(x):
    p = subprocess.run(["ffmpeg", "-hide_banner", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-af", "ebur128", "-f", "null", "-"],
                       input=x.astype(np.float32).tobytes(), capture_output=True).stderr.decode()
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", p)[-1])


def g(db): return 10 ** (db / 20)


def yaz(f, x):
    os.makedirs(os.path.dirname(f), exist_ok=True)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "pcm_s24le", f], input=x.astype(np.float32).tobytes(), check=True)


def koy(buf, x, t):
    i = max(0, int(round(t * SR))); n = min(len(x), len(buf) - i)
    if n > 0: buf[i:i + n] += x[:n]


def kenar(x, ms=6):
    n = int(ms / 1000 * SR); x = x.copy(); n = min(n, len(x) // 2)
    r = np.linspace(0, 1, n)[:, None]; x[:n] *= r; x[-n:] *= r[::-1]; return x


def env(x, ata, sal):
    """anlatım etkinlik zarfı (0..1), ata/salım sn"""
    e = np.abs(x).max(axis=1); h = int(.02 * SR)
    e = np.sqrt(np.convolve(e ** 2, np.ones(h) / h, "same"))
    a = (e > g(-45)).astype(float)
    ka, ks = np.exp(-1 / (ata * SR)), np.exp(-1 / (sal * SR))
    out = np.zeros_like(a); v = 0
    # vektörsüz döngü yerine blok (1 ms) örnekleme
    st = int(.001 * SR); ab = a[::st]; ob = np.zeros_like(ab)
    ka, ks = np.exp(-1 / (ata * 1000)), np.exp(-1 / (sal * 1000))
    for i, s in enumerate(ab):
        v = (ka if s > v else ks) * v + (1 - (ka if s > v else ks)) * s; ob[i] = v
    return np.interp(np.arange(len(x)), np.arange(len(ob)) * st, ob)


def lp(x, fc):
    b = subprocess.run(["ffmpeg", "-loglevel", "error", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-af", f"lowpass=f={fc}:p=2", "-f", "f32le", "-"],
                       input=x.astype(np.float32).tobytes(), capture_output=True, check=True).stdout
    return np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64)


# plan başlangıçları
bolum = json.load(open(f"{B}/bolum.json")); FOL = json.load(open(f"{B}/foley.json"))
bas, t0 = {}, 0
for p in bolum["planlar"]: bas[p["id"]] = t0; t0 += p["sure_kare"]
TOP = t0 / FPS; N = int(round((TOP + 0.5) * SR))
tp = lambda pid, k: (bas[pid] + k) / FPS

# ambiyans: (plan, ad, kare_bas, kare_bit|None, db, lp_fc)
AMB = [("P01", "deniz-ortam", 0, None, -22), ("P02", "deniz-ortam", 0, None, -22), ("P03", "mesale-ortam", 0, None, -22),
       ("P04", "deniz-ortam", 0, None, -24), ("P05", "deniz-ortam", 0, None, -24), ("P06", "ruzgar-dusme", 50, 100, -14),
       ("P06", "yuzme-su", 222, 288, -16), ("P07", "su-damla", 0, 190, -18), ("P08", "ruzgar-kule", 0, None, -20),
       ("P08", "ruzgar-dusme", 52, 148, -14), ("P09", "ruzgar-bogaz", 0, 260, -16), ("P10", "marti-ortam", 0, None, -22),
       ("P11", "deniz-ortam", 0, None, -22), ("P12", "sehir-ortam", 0, 30, -12), ("P12", "sehir-ortam", 30, None, -22, 1200),
       ("P13", "kagit-ortam", 0, None, -22), ("P14", "kagit-ortam", 0, None, -22)]
# özel kare vurguları (ortam seviyesi): P01 p176 kule rüzgârı
EK = [("P01", "kule-vurgu", 176, -14)]
# müzik zarfı: (zaman sn, dB ek) kontrol noktaları; müzikal cümle - ani düşüş yok
def muzik_ek():
    pts = [(0, 0)]
    f = lambda pid, k: tp(pid, k)
    pts += [(f("P01", 150), 0), (f("P01", 176), 1.5), (f("P01", 230), 0),     # kesmede tek vurgu
            (f("P05", 56), 0), (f("P05", 112), 3.5), (f("P05", 150), 0),     # crescendo -> kalkış
            (f("P06", 0), -3), (f("P06", 90), -3), (f("P06", 215), 0),       # itki söner, yüzerken sade
            (f("P07", 68), 1.5), (f("P07", 200), 0),                         # ödülde açılır
            (f("P08", 148), -3), (f("P08", 200), 1.5), (f("P09", 20), 0),   # çarpmada alçalır, bakışta yükselir
            (f("P09", 120), 2), (f("P09", 238), 0),                          # süzülüş / iniş çözülür
            (f("P11", 100), 0), (f("P11", 104), 3), (f("P11", 150), 0),     # omuz vurgusu
            (f("P12", 26), 0), (f("P12", 34), -4), (f("P12", 120), -3),     # tok'ta dinamik düşüş
            (f("P13", 140), -3), (f("P13", 240), -5),                        # defterler boş
            (f("P14", 90), -1), (TOP, 0)]
    return np.array(pts)


def musikal_zarf(n):
    p = muzik_ek(); t = np.arange(n) / SR
    # kontrol noktaları arası kosinüs yumuşatma (hızlı basamak yok)
    s = np.interp(t, p[:, 0], p[:, 1]); h = int(.25 * SR)
    return g(np.convolve(s, np.ones(h) / h, "same"))


for dil in (sys.argv[1:] or ["tr", "en"]):
    # --- anlatım
    ses = np.zeros((N, 2)); key = "ses" if dil == "tr" else "ses_en"
    for p in bolum["planlar"]:
        for s in p[key]:
            x = oku(PUB + s["dosya"]); x = x * g(-18 - lufs(x)) * g(s.get("db", 0))
            koy(ses, kenar(x), tp(p["id"], s["kare"]))
    # klip başına -18 LUFS eşitlenmiş; toplam anlatım ölç
    # --- foley
    fol = np.zeros((N, 2)); cache = {}
    for p in bolum["planlar"]:
        for t in p["temaslar"]:
            a = t["ses"]
            if a == "ortam-kisma": continue  # ortam katmanında (alçak geçirgen)
            if a not in cache:
                x = oku(PUB + FOL[a]["dosya"]); cache[a] = x / max(np.abs(x).max(), 1e-6) * g(-3)
            x = cache[a] * g(t["db"])
            koy(fol, kenar(x, 3), tp(p["id"], t["kare"]) - FOL[a]["tepe_ms"] / 1000)
    # --- ortam
    amb = np.zeros((N, 2)); ac = {}
    for r in AMB:
        pid, ad, kb, kt, db = r[:5]; fc = r[5] if len(r) > 5 else None
        if ad not in ac:
            x = oku(PUB + FOL[ad]["dosya"]); ac[ad] = x * g(-18 - lufs(x))
        x = ac[ad]; pl = next(q for q in bolum["planlar"] if q["id"] == pid)
        kt = pl["sure_kare"] if kt is None else kt
        n = int((kt - kb) / FPS * SR) + int(.4 * SR)   # +0.4 sn çapraz sönüm kuyruğu
        x = np.resize(x, (n, 2)) if n > len(x) else x[:n]
        if fc: x = lp(x, fc)
        x = x * g(db); f = int(.4 * SR)
        x[:f] *= np.linspace(0, 1, f)[:, None]; x[-f:] *= np.linspace(1, 0, f)[:, None]
        koy(amb, x, tp(pid, kb) - (.2 if kb else 0))
    for pid, ad, k, db in EK:
        x = oku(PUB + FOL[ad]["dosya"]); x = x / np.abs(x).max() * g(-3 + db); koy(amb, kenar(x, 20), tp(pid, k) - FOL[ad]["tepe_ms"] / 1000)
    # --- müzik: anlatımın -8 dB altı (sessiz an), konuşmada -18 dB; zarf anlatımdan
    m = oku(MUZIK); m = np.resize(m, (N, 2)) if len(m) < N else m[:N]
    m = m[:N]; m = np.vstack([m, np.zeros((N - len(m), 2))]) if len(m) < N else m
    m = m * g(-18 - lufs(m))                    # önce anlatımla aynı LUFS
    e = env(ses, .12, .6)                       # konuşma etkinliği
    duck = g(-8) * (1 - e) + g(-18) * e         # -8 -> -18 dB
    m = m * (duck * musikal_zarf(N))[:, None]
    for nm, x in (("anlatim", ses), ("foley", fol), ("muzik", m), ("ortam", amb)): yaz(f"{OUT}{dil}/{nm}.wav", x)
    top = ses + fol + m + amb
    # --- final: loudnorm iki geçiş (-14 LUFS, -1.5 dBTP)
    ham = f"{OUT}{dil}/_toplam.wav"; yaz(ham, top)
    a = "loudnorm=I=-14:TP=-2.0:LRA=11"
    ol = subprocess.run(["ffmpeg", "-hide_banner", "-i", ham, "-af", a + ":print_format=json", "-f", "null", "-"], capture_output=True).stderr.decode()
    j = json.loads(ol[ol.rindex("{"):])
    af = (f"loudnorm=I=-14:TP=-2.0:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}"
          f":measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,alimiter=limit=0.84:level=false")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", ham, "-af", af, "-ar", "48000", "-c:a", "pcm_s24le", f"{OUT}{dil}.wav"], check=True)
    os.remove(ham)
    ol = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{OUT}{dil}.wav", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True).stderr.decode()
    print(dil, "I:", re.findall(r"I:\s+(-?[\d.]+) LUFS", ol)[-1], "TP:", re.findall(r"Peak:\s+(-?[\d.]+) dBFS", ol)[-1], "sure", round(TOP, 2))
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{OUT}{dil}.wav", "-filter_complex", "showwavespic=s=1600x300:colors=0x3a7bd5", "-frames:v", "1", f"{OUT}{dil}-dalga.png"])
