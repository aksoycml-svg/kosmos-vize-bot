"""Evliya TR anlatim v3: Alex (KediIz7pebzt5TaDHiiZ) + eleven_v3 etiketli metin (B). Anahtar: elevenlabs_api_key (yazdirilmaz).
Kullanim: python3 -I tools/evliya_ses_v3.py uret [P01,P02,...]   -> public/evliya/ses-v3/tr/Pxx.mp3/.json
         python3 -I tools/evliya_ses_v3.py olc                      -> noise floor / 6 kHz hisirti tablosu (-18 LUFS esitlenmis)
P04 (Lagari Fatih cekim 3) ve P12 (padisah Nihat) tam replik planlaridir (anlatim kismi yok): mevcut B klipleri kopyalanir.
Ayar: stability .5, style .5, similarity .8, speed 1.1. Klip basina en fazla 3 cekim: KESIK/CIT-duzeltilemez/noise floor > -80 dBFS reddedilir.
"""
import base64, json, os, re, shutil, subprocess, sys, urllib.request, urllib.error
import numpy as np
KEY = os.environ["elevenlabs_api_key"]; API = "https://api.elevenlabs.io/v1"
ROOT = "public/evliya"; OUT = f"{ROOT}/ses-v3/tr"; VID = "KediIz7pebzt5TaDHiiZ"
AYAR = {"stability": 0.5, "similarity_boost": 0.8, "style": 0.5, "use_speaker_boost": True, "speed": 1.1}
NF_LIMIT = -80.0
ET = {
 "P01": "[curious] İstanbul'da bir adam fişeğe binip göğe çıkmış. [intrigued] Bir başkası da Boğaz'ı uçarak geçmiş.",
 "P02": "[storytelling] İlki, padişahın kızının doğum şenliğinde. [curious] Padişahı kim şaşırtacak?",
 "P03": "[playful] Lagâri Hasan Çelebi fişeğe biniyor [excited] ve padişaha sesleniyor.",
 "P05": "[excited] Fitil yanıyor ve fişek onu göğe fırlatıyor!",
 "P06": "[tense] Barut bitince kanatlarını açıyor. [awe] Süzülüp köşkün önünde denize iniyor.",
 "P07": "[knowing] Karşılığında bir kese para ve her gün maaş alıyor.",
 "P08": "[curious] Peki öteki adam? [intrigued] Hezarfen, Galata Kulesi'nin tepesinde.",
 "P09": "[determined] Lodos esince atlıyor [awe] ve Boğaz'ı süzülerek geçip Üsküdar'a iniyor.",
 "P10": "[curious] Onu kim izliyor? [knowing] Yine padişah. Yine aynı köşkten.",
 "P11": "[warm] Ona bir kese altın veriyor. [ominous] Ama sonra sürgüne yolluyor.",
 "P13": "[curious] Peki bunları nereden biliyoruz? [thoughtful] Yalnızca Evliya Çelebi'nin kitabından.",
 "P14": "[thoughtful] Yani kanıt yok. [warm] Ama dört yüz yıldır anlatıyoruz."}

def post(path, body):
    r = urllib.request.Request(API + path, data=json.dumps(body).encode(), headers={"xi-api-key": KEY, "Content-Type": "application/json"})
    try: return json.loads(urllib.request.urlopen(r).read())
    except urllib.error.HTTPError as e: print("HATA", e.code, e.read()[:300]); raise

def kelimeler(ch, st, en):
    out, w, depth = [], None, 0
    for c, s, e in zip(ch, st, en):
        if c == "[": depth += 1; continue
        if c == "]": depth -= 1; continue
        if depth: continue
        if c.isspace():
            if w: out.append(w); w = None
            continue
        if w is None: w = {"t": c, "s": round(s, 3), "e": round(e, 3)}
        else: w["t"] += c; w["e"] = round(e, 3)
    if w: out.append(w)
    return out

def sure(p): return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p]))

def pcm(f, filt=None):
    cmd = ["ffmpeg", "-loglevel", "error", "-i", f] + (["-af", filt] if filt else []) + ["-f", "f32le", "-ac", "1", "-ar", "44100", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).astype(float)

def lufs(f):
    p = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", p)[-1])

def olc(f):
    """(noise floor dBFS, 6 kHz ustu hisirti dBFS) -18 LUFS'e dogrusal esitlenmis; en sessiz %10 kare (20 ms) gucunun ortalamasi."""
    g = 10 ** ((-18 - lufs(f)) / 20)
    n = 882
    def taban(x):
        x = x * g; k = len(x) // n; e = (x[:k * n].reshape(k, n) ** 2).mean(1)
        return e
    e = taban(pcm(f)); idx = np.argsort(e)[:max(1, len(e) // 10)]
    h = taban(pcm(f, "highpass=f=6000,highpass=f=6000"))
    d = lambda v: 10 * np.log10(max(v, 1e-12))
    return d(e[idx].mean()), d(h[idx].mean())

def kenar(mp3):
    r = subprocess.run(["python3", "-I", "tools/ses_kenar.py", "kontrol", mp3], capture_output=True, text=True).stdout
    if "KESIK" in r: return "KESIK"
    if "CIT" in r:
        r2 = subprocess.run(["python3", "-I", "tools/ses_kenar.py", "duzelt", mp3], capture_output=True, text=True).stdout
        return "duzeltildi" if "duzeltildi" in r2 else "CIT"
    return "temiz"

def uret(pid):
    if os.environ.get("ET_P05") and pid == "P05": ET["P05"] = os.environ["ET_P05"]
    mp3 = f"{OUT}/{pid}.mp3"; js = mp3[:-4] + ".json"; adaylar = []; NT = int(os.environ.get("CEKIM", "3"))
    for take in range(1, NT + 1):
        body = {"text": ET[pid], "model_id": "eleven_v3", "voice_settings": AYAR, "language_code": "tr"}
        d = post(f"/text-to-speech/{VID}/with-timestamps?output_format=mp3_44100_128", body)
        t = f"{OUT}/{pid}.c{take}.mp3"; tj = t[:-4] + ".json"
        open(t, "wb").write(base64.b64decode(d["audio_base64"])); a = d["alignment"]
        w = kelimeler(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"])
        json.dump({"id": pid, "lang": "tr", "text": ET[pid], "words": w, "dur": round(sure(t), 3), "voice": VID, "model": "eleven_v3",
                   "ayar": AYAR, "varyant": "B", "ses": "Alex - Deep, Clear and Fluent"}, open(tj, "w"), ensure_ascii=False, indent=1)
        k = kenar(t); nf, hs = olc(t); ok = k in ("temiz", "duzeltildi") and nf <= NF_LIMIT
        print(pid, "cekim", take, k, f"{sure(t):.2f}s nf {nf:.1f} hisirti {hs:.1f}", "OK" if ok else "RED", flush=True)
        adaylar.append((ok, k in ("temiz", "duzeltildi"), nf, take, k, hs))
        if ok: break
    ok_l = [a for a in adaylar if a[0]]
    if ok_l: sec = ok_l[0]
    else:
        gecerli = [a for a in adaylar if a[1]] or adaylar
        sec = min(gecerli, key=lambda a: a[2])
    take = sec[3]
    os.replace(f"{OUT}/{pid}.c{take}.mp3", mp3); os.replace(f"{OUT}/{pid}.c{take}.json", js)
    for t in range(1, NT + 1):
        for f in (f"{OUT}/{pid}.c{t}.mp3", f"{OUT}/{pid}.c{t}.json"):
            if os.path.exists(f): os.remove(f)
    j = json.load(open(js)); j["cekim"] = take; j["kenar"] = sec[4]; j["nf_dbfs"] = round(sec[2], 1); j["hisirti_6k_dbfs"] = round(sec[5], 1)
    json.dump(j, open(js, "w"), ensure_ascii=False, indent=1)
    return sec

if sys.argv[1] == "uret":
    os.makedirs(OUT, exist_ok=True)
    ids = sys.argv[2].split(",") if len(sys.argv) > 2 else list(ET)
    for pid in ids: uret(pid)
if sys.argv[1] == "olc":
    for i in range(1, 15):
        f = f"{OUT}/P{i:02d}.mp3"; nf, hs = olc(f); print(f"P{i:02d} nf {nf:.1f} dBFS hisirti6k {hs:.1f} dBFS {sure(f):.2f}s")
