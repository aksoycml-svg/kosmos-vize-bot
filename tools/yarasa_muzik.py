"""Yarasa bombasi muzigi: Chopin Prelude Op.28 no.15 "Raindrop" (Musopen, CC0) -> 62.68 sn (plan-sureleri.json toplami + P09/P12 +1.5 tutma).
Kullanim: python3 -I tools/yarasa_muzik.py
Kaynak : muzik/kaynak/chopin-prelude-op28-no15-musopen.mp3 (295.27 sn, md5 0baba37b...); cikti: public/yarasa/muzik/yarasa-raindrop-63.mp3
Yapi (olculen, kaynak sn): A bolumu 0-58 (sakin, G# pedal ostinato), fermata 58-66, B bolumu (do# minor, ayni G# pedal) 66-132:
  sakin 100-113.3, KLIMAKS 113.5-131.8 (ff), 132+ cozulme; koda 283-292 (son akor Reb majör ~289.6 + uzun yanki).
Duzenleme: tempo 1.0 (rubato kayit, uzatma yok); 4 kesim, hepsi G# pedal uzerinde ve kaynak onset'ine oturtulmus, 0.8 sn esit-guc capraz;
  J1 33.4 (A -> B sakin, iki taraf da -30 dB dip), J2 yok (P08-P09 kaynakta sureklilik: klimaks 46.13'te = P10 basi),
  J3 49.87 (P10 -> klimaksin B-major sonu), J4 56.23 (cozulme -> koda). Yavas kazanc zarfi (+-7 dB, 2 sn) yatagi dengeler.
"""
import json, subprocess, numpy as np
SR = 44100
SRC = "muzik/kaynak/chopin-prelude-op28-no15-musopen.mp3"
OUT = "public/yarasa/muzik/yarasa-raindrop-63.mp3"
P = json.load(open("public/yarasa/ses/plan-sureleri.json"))
dur = [P[k] + (1.5 if k in ("P09", "P12") else 0) for k in sorted(P)]
starts = np.concatenate([[0], np.cumsum(dur)]); DUR = starts[-1]
S = {f"P{i+1:02d}": starts[i] for i in range(12)}
b = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", SRC, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
x = np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64)
m = x.mean(1)
# onset (spektral akis) tepeleri
H, N = 256, 1024
win = np.hanning(N)
fr = np.array([np.abs(np.fft.rfft(m[i:i + N] * win)) for i in range(0, len(m) - N, H)])
fl = np.maximum(0, np.diff(np.log1p(fr * 20), axis=0)).sum(1); ft = np.arange(len(fl)) * H / SR
pk = np.array([ft[i] for i in range(2, len(fl) - 2) if fl[i] > fl.mean() * 1.5 and fl[i] == fl[i - 2:i + 3].max()])
def snap(t, w=0.35):
    c = pk[np.abs(pk - t) < w]
    return float(c[np.argmin(np.abs(c - t))]) if len(c) else t
def onset_up(a, b2):  # klimaks baslangici: en buyuk ani artis
    i0, i1 = int(a * SR / H), int(b2 * SR / H)
    return float(ft[i0 + np.argmax(fl[i0:i1])])
XF = 0.8
# kaynak -> cikis eslemesi: (src_start, out_start)
sA0 = 0.70                       # ilk Ab notasi 0.99 -> cikis 0.29
j1 = S["P08"]                    # 33.38
sA_j1 = snap(sA0 + j1 + 0.2)     # A'dan cikis (kaynak ~34.3, dip)
clim = onset_up(112.5, 114.8)    # klimaks girisi (kaynak)
out_clim = S["P10"]              # 46.13: klimaks P10 basinda
sB0 = clim - out_clim            # B segmentinin cikis 0 'a karsilik kaynak zamani
j1o = sA_j1 - sA0                # A -> B cikis zamani (xfade merkezi)
sB_j1 = sB0 + j1o
j3 = S["P11"]; sB_j3 = sB0 + j3                    # klimaksin ilk kismi biter
sC_j3 = snap(129.0)                                # klimaksin B-major sonu
j4 = S["P12"]; sC_j4 = sC_j3 + (j4 - j3)           # cozulme biter
sD_j4 = snap(285.8)                                # koda; son akor ~289.6
n = int(round(DUR * SR)); y = np.zeros((n, 2))
def grab(s0, o0, o1):  # cikis [o0,o1) icin kaynak s0'dan
    a = int(round((s0 + 0) * SR)); L = int(round((o1 - o0) * SR))
    return x[a:a + L]
def put(seg_src_start, o0, o1, fade_in=0.0, fade_out=0.0):
    seg = grab(seg_src_start, o0, o1).copy(); L = len(seg)
    if fade_in > 0:
        k = int(fade_in * SR); seg[:k] *= (np.sin(np.linspace(0, np.pi / 2, k)) ** 1)[:, None]
    if fade_out > 0:
        k = int(fade_out * SR); seg[-k:] *= np.cos(np.linspace(0, np.pi / 2, k))[:, None]
    a = int(round(o0 * SR)); y[a:a + L] += seg[:min(L, n - a)]
h = XF / 2
# parca 1: A  [0, j1o+h]; 2: B [j1o-h, j3+h]; 3: C [j3-h, j4+h]; 4: D [j4-h, DUR]
put(sA0, 0, j1o + h, 0.3, XF)
put(sB0 + (j1o - h), j1o - h, j3 + h, XF, XF)
put(sC_j3 - h, j3 - h, j4 + h, XF, XF)
put(sD_j4 - h, j4 - h, DUR, XF, 0)
# capraz sonumde fade-in/out dik acili sin/cos -> esit guc
# kazanc zarfi (hedef RMS dB, 2 sn)
pts = [(0, -27), (S["P08"], -27), (S["P08"] + 1, -29), (S["P09"] + 4.5, -29), (S["P10"] - 1.0, -26), (S["P10"] + 0.2, -21), (S["P10"] + 3.0, -21),
       (S["P11"] + 1.5, -24), (S["P11"] + 3.0, -29), (S["P12"], -30), (DUR, -30)]
w = SR  # 1 sn RMS
mono = y.mean(1)
rms = np.sqrt(np.convolve(mono ** 2, np.ones(2 * w) / (2 * w), "same") + 1e-12)
rdb = 20 * np.log10(rms)
tt = np.arange(n) / SR
tg = np.interp(tt, [p[0] for p in pts], [p[1] for p in pts])
g = np.clip(tg - rdb, -7, 7)
k = 2 * SR; g = np.convolve(np.pad(g, k // 2, mode="edge"), np.ones(k) / k, "valid")[:n]
# son akorun yankisi dogal kalsin (son 4 sn kazanc sabit)
g[int((DUR - 4) * SR):] = g[int((DUR - 4) * SR)]
y *= (10 ** (g / 20))[:, None]
a = int((DUR - 1.4) * SR); y[a:] *= (np.cos(np.linspace(0, np.pi / 2, n - a)) ** 2)[:, None]
pkv = np.abs(y).max()
if pkv > 0.7: y *= 0.7 / pkv
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "libmp3lame", "-b:a", "192k", OUT], input=y.astype(np.float32).tobytes(), check=True)
print(json.dumps({"sure": n / SR, "zirve_dBFS": 20 * np.log10(np.abs(y).max()), "A_cikis_kaynak": sA_j1, "J1_cikis": j1o, "B_kaynak@J1": sB0 + j1o,
                  "klimaks_kaynak": clim, "J3_kaynak_B": sB_j3, "J3_kaynak_C": sC_j3, "J4_kaynak_C": sC_j4, "J4_kaynak_D": sD_j4}, indent=1))
