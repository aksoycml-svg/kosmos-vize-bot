"""Cicero muzigi: Incompetech "Measured Paces" (Kevin MacLeod, CC BY 4.0) -> 64.83 sn (3890 kare @60) bolum kesimi.
Kullanim: python3 -I tools/cicero_muzik.py
Kaynak: muzik/kaynak/incompetech-measured-paces.mp3 (72.93 sn, sha256 47573a2b...); cikti: public/cicero/muzik/cicero-measured-paces-65.mp3
Olculen yapi (kaynak sn): vurus 0.855 sn (~70 bpm, 4/4 olcu 3.42 sn), ilk nota 0.82, tek dinamik yay: 0-32 sessiz (RMS -33), 32-36 yukselis,
36-60 dolgun (RMS -28, tepe -7 dBFS), son nota 63.0 ve 64'ten sonra uzun yanki (duyulmaz).
Duzenleme (tek parca, tema yok; yalniz kesinti-siz kayit):
  1) tempo 0.9916 (rubberband, perde ayni): vurus 43.60 (k=50) -> 43.97 = P07 carpi (kare 2638); son nota 63.00 -> 63.54.
  2) 0-34 sn arasi +3 dB (34-36 sn rampa): sessiz yarim konusma altinda kaybolmasin; yay korunur (+5 dB fark kalir).
  3) giris 0.3 sn, cikis 63.6-64.83 (1.23 sn): son nota yankisiyla soner; dongude P01'in 0.83 sn'deki ilk notasina akar.
"""
import subprocess, numpy as np
SR = 44100; SRC = "muzik/kaynak/incompetech-measured-paces.mp3"; OUT = "public/cicero/muzik/cicero-measured-paces-65.mp3"
DUR = 3890 / 60; K = 43.97 / 43.60
b = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", SRC, "-af", f"rubberband=tempo={1 / K:.5f}:pitch=1:transients=smooth", "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
x = np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64)
n = int(round(DUR * SR)); x = x[:n]
t = np.arange(len(x)) / SR
g = np.where(t < 34, 3.0, np.where(t < 36, 3.0 * (1 - (t - 34) / 2), 0.0))
x *= (10 ** (g / 20))[:, None]
fi = int(.3 * SR); x[:fi] *= np.linspace(0, 1, fi)[:, None]
a = int(63.6 * SR); fo = len(x) - a; x[a:] *= (np.cos(np.linspace(0, np.pi / 2, fo)) ** 2)[:, None]
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "libmp3lame", "-b:a", "192k", OUT], input=x.astype(np.float32).tobytes(), check=True)
print("sure sn", len(x) / SR, "zirve", float(np.abs(x).max()))
