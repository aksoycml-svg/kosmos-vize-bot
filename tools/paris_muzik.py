"""Paris müziği: Incompetech 'Gymnopedie No. 1' (Kevin MacLeod, CC BY 4.0) -> 58.22 sn bölüm kesimi.
Kullanım: python3 -I tools/paris_muzik.py   (kaynak: muzik/kaynak/gymnopedie-no1-kevin-macleod.mp3; çıktı: public/paris/muzik/paris-gymnopedie-58.mp3)
Izgara: 77 bpm 3/4 -> ölçü 2.344 sn, ölçü başı ≈ k*2.344 (otokorelasyonla ölçüldü). Çift ölçü = aynı akor (G/D dönüşümü), kesimler çift ölçüde.
Yapı (çıkış ölçüsü <- kaynak ölçüsü): 0-19 <- 0-19 düz; 20-23 <- 4-7 (tema ilk cümlesi P10'da DÖNÜŞ, P02'de duyulan cümle); 24-> <- 24 (P11 kapanış, P01 girişine akar).
Çapraz sönüm 0.4 sn eşit güç; giriş 0.3 sn, çıkış 0.6 sn fade."""
import subprocess, numpy as np
SR = 44100; L = 2.344; TOP = 3493 / 60
def oku(f):
    b = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64)
x = oku("muzik/kaynak/gymnopedie-no1-kevin-macleod.mp3")
seg = lambda b0, n: x[int(round(b0 * L * SR)):int(round((b0 + n) * L * SR))]
XF = int(0.4 * SR)
at = lambda b: int(round(b * L * SR))
P = [(0, 20), (4, 4), (24, 3)]            # (kaynak ölçüsü, ölçü sayısı)
out = x[at(0):at(20) + XF // 2]           # 20 ölçü + 0.2 sn kuyruk
for b0, n in P[1:]:
    ek = x[at(b0) - XF // 2:at(b0 + n) + XF // 2]   # ölçü başından 0.2 sn önce başla
    j = len(out) - XF // 2                 # birleşim = önceki parçanın ölçü sonu
    r = np.linspace(0, np.pi / 2, XF)[:, None]
    out = np.vstack([out[:j - XF // 2], out[j - XF // 2:j + XF // 2] * np.cos(r) + ek[:XF] * np.sin(r), ek[XF:]])
n = int(round(TOP * SR)); out = out[:n]
fi, fo = int(.3 * SR), int(.6 * SR)
out[:fi] *= np.linspace(0, 1, fi)[:, None]; out[-fo:] *= np.linspace(1, 0, fo)[:, None]
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "libmp3lame", "-b:a", "192k", "public/paris/muzik/paris-gymnopedie-58.mp3"], input=out.astype(np.float32).tobytes(), check=True)
print("sure sn", len(out) / SR, "birleşim ölçüleri 20 (46.88 sn) ve 24 (56.26 sn)")
