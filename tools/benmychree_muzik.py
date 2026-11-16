"""Ben-my-Chree muzigi: iki Incompetech parcasi (Kevin MacLeod, CC BY 4.0) -> 61.1 sn (3666 kare @60) bolum kesimi.
Kullanim: python3 -I tools/benmychree_muzik.py     (render yok; yalniz ses dosyasi uretir)
Cikti: public/benmychree/muzik/bmc-muzik-61.mp3 (+ olcum ozeti stdout)

TEMA A  "SCP-x6x (Hopes)"  piyano + viyolonsel, ~66 bpm, re minor  (kaynak: muzik/kaynak/incompetech-scp-x6x-hopes.mp3)
TEMA B  "Lost Time"        viyola/viyolonsel/kontrbas, ~55 bpm, sol minor, akor dongusu Gm-Bb-C-D (kaynak: ...lost-time.mp3)
Yapi (mutlak sn = kare/60):  A 0-22.2 (merak/guven/saskinlik) -> B 21.7-57.05 (gerilim/kayip/saygi) -> A' 56.35-61.1 (tema donusu, bookend)
Olculen kaynak akor sinirlari (Lost Time, bas notasi, tools/ analiz): Bb 5.19 · C 9.49 · D 13.94 · G 18.19 · Bb 22.64 · C 27.29 · G 31.64 · Bb 40.29 · C 44.89 · D 49.59
Gorsel capalar -> muzik capalari:
  21.35 KOR parilti (P04)            -> 21.95 Bb akoru girer (A->B capraz sonum 21.7-22.2, A'nin F/Bb bolgesinden)
  26.25 C · 30.70 D (gerilim kuruluyor, +2 dB crescendo 26-34.9)  -> 34.95 Gm VARIS (isabet 34.85 = "isabet" kelimesi 34.83)
  34.95-48.2 Gm uc olcu (G1 + G2; G2 %7.7 yavaslatilir ki Bb tam 'Kimse' (48.2) ile gelsin)
  48.20 Bb (P08 "Kimse olmedi": minor icinde bagislayici acilma) · 52.80 C (P10a saygi; kesme 52.87'den 0.07 sn once)
  56.35-57.05 B -> A' capraz sonum; A' = Hopes'un KENDI bitisi (Bb-F-Dm): son nota 60.35, anlatim 59.97'de biter
"""
import subprocess, numpy as np
SR = 44100
OUT = "public/benmychree/muzik/bmc-muzik-61.mp3"
SRC_A = "bolumler/ben-my-chree/muzik/kaynak/incompetech-scp-x6x-hopes.mp3"
SRC_B = "bolumler/ben-my-chree/muzik/kaynak/incompetech-lost-time.mp3"
DUR = 3666 / 60


def pcm(f, tempo=None, ss=None, t=None, comp=False):
    cmd = ["ffmpeg", "-loglevel", "error"]
    if ss is not None: cmd += ["-ss", f"{ss}"]
    if t is not None: cmd += ["-t", f"{t}"]
    cmd += ["-i", f]
    af = []
    if tempo: af.append(f"rubberband=tempo={tempo:.5f}:pitch=1:transients=smooth")
    if comp: af.append("acompressor=threshold=0.04:ratio=3.5:attack=12:release=300:knee=4:makeup=1.5")  # piyano tepelerini yaylilarla ayni kusaga indirir
    if af: cmd += ["-af", ",".join(af)]
    cmd += ["-f", "f32le", "-ac", "2", "-ar", str(SR), "-"]
    b = subprocess.run(cmd, capture_output=True, check=True).stdout
    return np.frombuffer(b, np.float32).reshape(-1, 2).astype(np.float64)


def db(g): return 10 ** (g / 20)


def put(buf, x, t0, fin=None, fout=None, gain=0.0):
    """x'i buf'a t0 (sn) noktasindan ekler; fin/fout = (bas_sn, bit_sn) mutlak sinirli cos^2 gecis."""
    n = len(x); i0 = int(round(t0 * SR)); e = np.ones(n)
    tt = t0 + np.arange(n) / SR
    if fin: e *= np.sin(np.clip((tt - fin[0]) / (fin[1] - fin[0]), 0, 1) * np.pi / 2) ** 2
    if fout: e *= np.cos(np.clip((tt - fout[0]) / (fout[1] - fout[0]), 0, 1) * np.pi / 2) ** 2
    seg = x * (e * db(gain))[:, None]
    j1 = min(len(buf), i0 + n); buf[i0:j1] += seg[: j1 - i0]


def main():
    buf = np.zeros((int(DUR * SR), 2))
    # ---- TEMA A (Hopes) 0-22.2: kaynak 0.0 -> aynen
    A = pcm(SRC_A, ss=0, t=22.7, comp=True)
    put(buf, A, 0.0, fin=(0.0, 0.25), fout=(21.7, 22.2), gain=GA)
    # ---- TEMA B (Lost Time)
    # B1: kaynak 4.94-22.69 (Bb C D G) -> cikis = kaynak + 16.76 ; G varisi 18.19 -> 34.95
    B1 = pcm(SRC_B, ss=4.94, t=22.69 - 4.94)
    t_b1 = 4.94 + 16.76
    put(buf, B1, t_b1, fin=(21.7, 22.2), fout=(39.05, 39.45), gain=GB)
    # crescendo / birakma zarfi (B uzerinde): 26.0-34.9 +2 dB, 34.95-37.0 -> 0 dB (Gm varisinin agirligi)
    # G2: kaynak 31.80-40.29 (Gm, iki olcu), %7.7 yavaslatilir: cikis 39.05 -> 48.2
    G2 = pcm(SRC_B, ss=31.80, t=40.29 - 31.80, tempo=(40.29 - 31.80) / (48.20 - 39.05))
    put(buf, G2, 39.05, fin=(39.05, 39.45), fout=(48.05, 48.25), gain=GB)
    # B3: kaynak 40.29 -> cikis = kaynak + 7.91 ; Bb 48.2, C 52.80
    B3 = pcm(SRC_B, ss=40.29 - 0.10, t=49.40 - 40.29 + 0.10)
    put(buf, B3, 40.19 + 7.91, fin=(48.05, 48.25), fout=(56.45, 57.05), gain=GB3)
    # ---- TEMA A' (Hopes'un bitisi: Bb-F-Dm): kaynak 193.6-198.4 -> cikis = kaynak - 137.25
    Ap = pcm(SRC_A, ss=193.6, t=198.4 - 193.6, comp=True)
    put(buf, Ap, 193.6 - 137.25, fin=(56.45, 57.05), fout=(60.45, 61.1), gain=GA2)
    # ---- B uzerinde dinamik sekil (crescendo ve birakma) -- B bolgesi 21.7-57.05
    i = np.arange(len(buf)) / SR
    env = np.zeros_like(i)
    env += np.where((i >= 26.0) & (i < 34.95), 2.0 * (i - 26.0) / 8.95, 0.0)
    env += np.where((i >= 34.95) & (i < 37.0), 2.0 * np.cos((i - 34.95) / 2.05 * np.pi / 2) ** 2, 0.0)
    env += 3.5 * np.exp(-0.5 * ((i - 43.4) / 0.7) ** 2)   # kaynakta dogal nefes (43.0-43.9 sn, -6 dB) plan siniri P07c->P08a'ya denk gelmesin: yumusak telafi
    seg = (i >= 21.7) & (i < 57.05)
    buf[seg] *= db(env[seg])[:, None]
    # A bolgesi icin ayri gain zaten put'ta; A' icin de.
    pk = float(np.abs(buf).max())
    if pk > 0.89: buf *= 0.89 / pk
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "libmp3lame", "-b:a", "192k", OUT],
                   input=buf.astype(np.float32).tobytes(), check=True)
    print("sure sn", len(buf) / SR, "zirve", pk)


# bolum ici seviye dengesi (olcumle ayarlandi, bkz. cue-sheet.md): A ve A' (piyano) daha sessiz kaynak, B (yaylilar) daha dolgun
GA = 4.0; GB = -2.0; GA2 = 5.0; GB3 = -3.5
if __name__ == "__main__":
    main()
