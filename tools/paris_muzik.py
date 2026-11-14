"""Paris müziği: Chopin Nocturne Op. 9 no. 2 (Musopen, CC0) -> 58.22 sn bölüm kesimi.
Kullanım: python3 -I tools/paris_muzik.py
Kaynak: muzik/kaynak/chopin-nocturne-op9-no2-musopen.mp3 (md5 0cff0b54…); çıktı: public/paris/muzik/paris-chopin-op9no2-58.mp3
Kayıt rubato olduğundan sabit ızgara yok; kesimler Eb/Bb tonik-dominant yerlerinden, çapraz sönümle (eşit güç).
Parçalar (çıkış sn <- kaynak sn):
  S1  0.0 -> 41.9  <- kaynak 0.0-39.4, %6.4 yavaşlatılmış (rubberband, perde korunur): kaynakta 35.5'te başlayan açılış
                       (melodi yükselişi) "yükseldi" 37.77'ye oturur; 8.15 (kaynak 8.15 G/Do-minör dönüşü) = tel kopması 8.67.
  S2  41.72 -> 53.65 <- kaynak 0.0-11.9 (ilk cümle; DÖNÜŞ/bookend): çıkış = kaynak + 41.72, kaynak 10.0 (tepe) = "okudu" 51.72;
                       sonu Bb/F (Mi-bemol'ün dominantı) -> S3'ün Eb'sine çözülür.
  S3  53.65 -> 58.22 <- kaynak 53.8-58.4 (koda: Eb tonik, sonu F/Bb dominant = döngüde P01'in Bb/Eb açılışına akar).
Giriş 0.3 sn, çıkış 0.6 sn fade."""
import subprocess, numpy as np
SR = 44100; TOP = 3493 / 60; K = 1.064
SRC = "muzik/kaynak/chopin-nocturne-op9-no2-musopen.mp3"
def oku(af=None, ss=None, t=None):
    c = ["ffmpeg", "-loglevel", "error"] + (["-ss", str(ss)] if ss is not None else []) + (["-t", str(t)] if t else []) + ["-i", SRC]
    if af: c += ["-af", af]
    b = subprocess.run(c + ["-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64)
XF = int(0.5 * SR)
N = int(round(TOP * SR)) + SR
out = np.zeros((N, 2))
s1 = oku(f"rubberband=tempo={1 / K:.5f}:pitch=1:transients=smooth", 0, 39.4)       # kaynak 0-39.4 -> 0-41.9
n1 = len(s1); out[:n1] += s1
# S1 41.5-42.0 arası söner, S2 41.72'de (kaynak 0.0) girer
s2 = oku(None, 0, 11.9)                                                               # kaynak 0-11.9 -> 41.72-53.62
r = np.linspace(0, np.pi / 2, XF)[:, None]
out[int(41.5 * SR):int(41.5 * SR) + XF] *= np.cos(r); out[int(41.5 * SR) + XF:] = 0
s2 = s2.copy(); s2[:int(.4 * SR)] *= np.linspace(0, 1, int(.4 * SR))[:, None]
j = int(41.72 * SR); m = min(len(s2), len(out) - j); out[j:j + m] += s2[:m]
# S2 -> S3 çözülme (53.4-53.9 çapraz)
s3 = oku(None, 53.8, 4.9)                                                              # kaynak 53.8-58.7 -> 53.65-58.55
t3 = 53.65
r = np.linspace(0, np.pi / 2, XF)[:, None]
a = int((t3 - .1) * SR); out[a:a + XF] *= np.cos(r); out[a + XF:] = 0
s3 = s3.copy() * 10 ** (-3.5 / 20); s3[:XF] *= np.sin(r)   # koda sakin: -3.5 dB (EN 54.4-55.0 aralık tavanı için)
j = int((t3 - .1) * SR); m = min(len(s3), len(out) - j); out[j:j + m] += s3[:m]
out = out[:int(round(TOP * SR))]
fi, fo = int(.3 * SR), int(.6 * SR)
out[:fi] *= np.linspace(0, 1, fi)[:, None]; out[-fo:] *= np.linspace(1, 0, fo)[:, None]
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "libmp3lame", "-b:a", "192k", "public/paris/muzik/paris-chopin-op9no2-58.mp3"], input=out.astype(np.float32).tobytes(), check=True)
print("sure sn", len(out) / SR, "zirve", np.abs(out).max())
