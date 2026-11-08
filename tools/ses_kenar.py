"""Ses klibi kenar kontrolü ve düzeltmesi (cıt/tık önleme).
Kullanım:
  python3 -I tools/ses_kenar.py kontrol <mp3...>   # baş/son 5 ms tepe; > -40 dBFS = CIT
  python3 -I tools/ses_kenar.py duzelt  <mp3...>   # 8 ms fade-in, 30 ms fade-out (öne 40 ms sessizlik; .json kelime zamanları kaydırılır)
Kesik biten (son 5 ms > -20 dBFS) klip düzeltilmez: kelime yarıda kalmıştır, yeniden üretilmeli.
"""
import json, os, subprocess, sys
import numpy as np

SR = 44100
PAD_MS = 40  # mp3 kodlayıcının ilk karede bıraktığı tık için öne sessizlik


def pcm(f):
    b = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f, "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"],
                       capture_output=True, check=True).stdout
    return np.frombuffer(b, np.int16).astype(float) / 32768


def db(v):
    return 20 * np.log10(max(v, 1e-6))


def kenar(f):
    x = pcm(f); n = int(0.005 * SR)
    return db(np.abs(x[:n]).max()), db(np.abs(x[-n:]).max()), len(x) / SR


mod, dosyalar = sys.argv[1], sys.argv[2:]
hata = 0
for f in dosyalar:
    bas, son, d = kenar(f)
    durum = "KESIK" if son > -20 else ("CIT" if max(bas, son) > -40 else "temiz")
    if mod == "duzelt" and durum == "CIT":
        tmp = f + ".tmp.mp3"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f, "-af",
                        f"afade=t=in:d=0.008,afade=t=out:st={d - 0.03:.3f}:d=0.03,adelay={PAD_MS}:all=1,apad=pad_dur=0.05",
                        "-b:a", "128k", tmp], check=True)
        os.replace(tmp, f)
        js = f[:-4] + ".json"  # kelime zamanlaması varsa öne eklenen sessizlik kadar kaydır
        if os.path.exists(js):
            j = json.load(open(js))
            for w in j.get("words", []):
                w["s"] = round(w["s"] + PAD_MS / 1000, 3); w["e"] = round(w["e"] + PAD_MS / 1000, 3)
            j["dur"] = round(len(pcm(f)) / SR, 3); j["on_bosluk_ms"] = j.get("on_bosluk_ms", 0) + PAD_MS
            json.dump(j, open(js, "w"), ensure_ascii=False, indent=1)
        bas, son, d = kenar(f)
        durum = "duzeltildi" if max(bas, son) <= -40 else "CIT"
    hata += durum in ("KESIK", "CIT")
    print(f"{f}: bas {bas:.1f} dB, son {son:.1f} dB, {d:.2f} sn -> {durum}")
sys.exit(1 if hata else 0)
