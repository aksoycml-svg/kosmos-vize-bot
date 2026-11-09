"""Evliya v3 onizleme (goruntusuz): planlar art arda (plan-sureleri.json), klip plan basinda.
Kullanim: python3 -I tools/evliya_onizleme_v3.py tr|en
Klipler loudnorm (linear, 2 gecis): anlatim -18, replik (P04,P12) -19 LUFS. Muzik: dongulu (3 sn crossfade), sabit: anlatim -22 dB altinda
(muzik -40 LUFS), sonda 2 sn fade. Final loudnorm -14 LUFS, TP <= -1.5 dBTP (mp3 sonrasi olculur)."""
import json, re, subprocess, sys
import numpy as np
SR = 44100; D = "public/evliya/"; V3 = D + "ses-v3/"; OUTD = D + "ses-aday/dinlet/"
lang = sys.argv[1]; MUZIK = D + "muzik/evliya-hicaz-62.9.mp3"
plan = json.load(open(V3 + "plan-sureleri.json")); TOP = sum(plan.values())

def oku(f, af=None):
    cmd = ["ffmpeg", "-loglevel", "error", "-i", f] + (["-af", af] if af else []) + ["-f", "f32le", "-ac", "2", "-ar", str(SR), "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).astype(np.float64)

def ln(f, I, tp, af_in=""):
    """loudnorm iki gecis, linear"""
    pre = (af_in + ",") if af_in else ""
    p = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", f"{pre}loudnorm=I={I}:TP={tp}:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
    m = json.loads(re.search(r"\{[^{}]*\}", p[p.rfind("Parsed_loudnorm"):] if False else p[p.rindex("{"):]).group(0))
    return f"{pre}loudnorm=I={I}:TP={tp}:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"

def lufs_x(x):
    p = subprocess.run(["ffmpeg", "-hide_banner", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-af", "ebur128=peak=true", "-f", "null", "-"], input=x.astype(np.float32).tobytes(), capture_output=True).stderr.decode()
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", p)[-1])

N = int(round((TOP + 0.3) * SR)); voice = np.zeros((N, 2)); t0 = 0
for i in range(1, 15):
    pid = f"P{i:02d}"; f = f"{V3}{lang}/{pid}.mp3"
    target = -19 if pid in ("P04", "P12") else -18
    x = oku(f, ln(f, target, -3))
    n = min(len(x), int(plan[pid] * SR)); voice[int(t0 * SR):int(t0 * SR) + n] += x[:n]; t0 += plan[pid]
L = int(round(TOP * SR)); voice = voice[:L]

# muzik: 2x dongu, 3 sn crossfade
tmp = D + "ses-aday/dinlet/_dongu.wav"
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", MUZIK, "-i", MUZIK, "-filter_complex", "acrossfade=d=3:c1=tri:c2=tri", tmp], check=True)
m = oku(tmp)[:L]; assert len(m) >= L
sm = 10 ** ((-40 - lufs_x(m)) / 20); m = m * sm
nf = int(2 * SR); m[-nf:] *= np.linspace(1, 0, nf)[:, None]

def final(x, ad):
    raw = D + "ses-aday/dinlet/_ham.wav"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", raw], input=x.astype(np.float32).tobytes(), check=True)
    tp = -1.8
    for _ in range(4):
        af = ln(raw, -14, tp)
        out = OUTD + ad
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", raw, "-af", af, "-ar", str(SR), "-b:a", "192k", out], check=True)
        p = subprocess.run(["ffmpeg", "-hide_banner", "-i", out, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
        s = p[p.rindex("Summary"):]
        I = float(re.search(r"I:\s+(-?[\d.]+) LUFS", s).group(1)); P = float(re.search(r"Peak:\s+(-?[\d.]+) dBFS", s).group(1))
        print(ad, f"{I} LUFS, TP {P} dBTP")
        if P <= -1.5: break
        tp -= 0.3
    return out

final(voice + m, f"onizleme-C-{lang}.mp3")
if lang == "tr": final(voice, "onizleme-C-tr-muziksiz.mp3")
import os; os.remove(tmp); os.remove(D + "ses-aday/dinlet/_ham.wav")
