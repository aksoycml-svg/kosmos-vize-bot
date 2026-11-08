"""Evliya bölümü: TR + EN anlatım (with-timestamps) ve onaylı replik dosyalarını hizalar.
Kullanım: python3 -I tools/evliya_ses.py <planlar.json> <cikis_dizini>
Anahtar: elevenlabs_api_key ortam değişkeni. Var olan dosyayı yeniden üretmez.
"""
import base64, json, os, re, shutil, subprocess, sys, urllib.request, uuid

PLAN, OUT = sys.argv[1], sys.argv[2]
KEY = os.environ["elevenlabs_api_key"]
API = "https://api.elevenlabs.io/v1"
ANLATICI = {"tr": "jZQNewKOZcubZDDwBxdL", "en": "nPczCjzI2devNBz1zQrb"}  # Umut Canbay / Brian
AYAR = {"stability": 0.45, "similarity_boost": 0.8, "style": 0.35, "use_speaker_boost": True}
# Onaylı replik adayları (kullanıcı seçimi 2026-11-08)
REPLIK = {
    "P04": ("lagari-4-fatih", "7VqWGAWwo2HMrylfKrcm", "eleven_v3"),
    "P12": ("padisah-2-nihat", "MuOq11XzQTthwLhmGZ2V", "eleven_multilingual_v2"),
}
ADAY = "public/evliya/ses-aday"
# Dil bazında farklı kaynak dosya: ilk TR kayıt sonda kesikti (cıt) -> yeniden üretilen temiz çekim
KAYNAK = {("P04", "tr"): "lagari-4-fatih-tr-cekim1"}
# Yalnız TTS'e giden yazım (ekran metni değişmez)
TTS_EN = {"Lagâri": "Lagari", "Çelebi": "Chelebi", "400": "four hundred"}


def temiz(s):
    s = re.sub(r'^[A-ZÂÇĞİÖŞÜ]{2,}(\s*\([^)]*\))?\s*:', "", s.strip())  # "LAGÂRI (dramatization):" önekini at
    return s.strip().strip('"').strip()


def kelimeler(chars, st, en):
    out, w = [], None
    for c, s, e in zip(chars, st, en):
        if c.isspace():
            if w: out.append(w); w = None
            continue
        if w is None: w = {"t": c, "s": s, "e": e}
        else: w["t"] += c; w["e"] = e
    if w: out.append(w)
    return out


def post(url, body, headers):
    req = urllib.request.Request(url, data=body, headers={"xi-api-key": KEY, **headers})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


def sure(p):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p]))


def hizala(mp3, text):
    b = uuid.uuid4().hex
    data = (f"--{b}\r\nContent-Disposition: form-data; name=\"text\"\r\n\r\n{text}\r\n"
            f"--{b}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"a.mp3\"\r\nContent-Type: audio/mpeg\r\n\r\n").encode()
    data += open(mp3, "rb").read() + f"\r\n--{b}--\r\n".encode()
    d = post(f"{API}/forced-alignment", data, {"Content-Type": f"multipart/form-data; boundary={b}"})
    return [{"t": w["text"].strip(), "s": w["start"], "e": w["end"]} for w in d["words"] if w["text"].strip()]


plan = json.load(open(PLAN))
rapor = []
for lang in ("tr", "en"):
    os.makedirs(f"{OUT}/{lang}", exist_ok=True)
    for pid, p in plan.items():
        mp3, js = f"{OUT}/{lang}/{pid}.mp3", f"{OUT}/{lang}/{pid}.json"
        metin = temiz(p[lang])
        if not os.path.exists(js):
            if pid in REPLIK:
                ad, vid, model = REPLIK[pid]
                src = f"{ADAY}/{KAYNAK.get((pid, lang), f'{ad}-{lang}')}.mp3"
                shutil.copy(src, mp3)
                try:
                    words = hizala(mp3, metin)
                except Exception as e:
                    print(pid, lang, "hizalama yok:", e); words = []
                meta = {"voice": vid, "model": model, "kaynak": src}
            else:
                tts = metin
                if lang == "en":
                    for a, b in TTS_EN.items(): tts = tts.replace(a, b)
                body = json.dumps({"text": tts, "model_id": "eleven_multilingual_v2", "language_code": lang,
                                   "voice_settings": AYAR}).encode()
                d = post(f"{API}/text-to-speech/{ANLATICI[lang]}/with-timestamps?output_format=mp3_44100_128",
                         body, {"Content-Type": "application/json"})
                open(mp3, "wb").write(base64.b64decode(d["audio_base64"]))
                a = d["alignment"]
                words = kelimeler(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"])
                meta = {"voice": ANLATICI[lang], "model": "eleven_multilingual_v2", "tts_text": tts, "ayar": AYAR}
            json.dump({"id": pid, "lang": lang, "text": metin, "dur": round(sure(mp3), 3), "words": words, **meta},
                      open(js, "w"), ensure_ascii=False, indent=1)
        j = json.load(open(js))
        rapor.append((pid, lang, j["dur"], p["sure"]))
        print(pid, lang, f"{j['dur']:.2f}s / plan {p['sure']}")

print("\nPlan | TR | EN | uzun | plan | fark")
for pid, p in plan.items():
    tr = next(r[2] for r in rapor if r[0] == pid and r[1] == "tr")
    en = next(r[2] for r in rapor if r[0] == pid and r[1] == "en")
    m = max(tr, en)
    print(f"{pid} | {tr:.2f} | {en:.2f} | {m:.2f} | {p['sure']} | {m - p['sure']:+.2f}")
