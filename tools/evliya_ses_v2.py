"""Evliya anlatım v2 (varyant A/B) + Lagâri bağırma adayları. Anahtar: elevenlabs_api_key (yazdırılmaz).
Kullanım: python3 -I tools/evliya_ses_v2.py anlatim P01,P05,P10,P14   |   python3 -I tools/evliya_ses_v2.py bagir
A = multilingual_v2 + previous/next_text + ifadeli ayar. B = eleven_v3 + duygu etiketleri (v3 previous/next_text desteklemez).
"""
import base64, json, os, re, subprocess, sys, urllib.request, urllib.error
KEY = os.environ["elevenlabs_api_key"]; API = "https://api.elevenlabs.io/v1"
ROOT = "public/evliya"; SES = f"{ROOT}/ses"
ANL = {"tr": "jZQNewKOZcubZDDwBxdL", "en": "nPczCjzI2devNBz1zQrb"}
AYAR_ESKI = {"stability": 0.45, "similarity_boost": 0.8, "style": 0.35, "use_speaker_boost": True}
AYAR_A = {"stability": 0.30, "similarity_boost": 0.8, "style": 0.6, "use_speaker_boost": True}
AYAR_B = {"speed": 1.1, "stability": 0.0, "similarity_boost": 0.8, "style": 0.5, "use_speaker_boost": True}  # v3: 0.0 Creative (etiketler en iyi burada)
TTS_EN = {"Lagâri": "Lagari", "Çelebi": "Chelebi", "400": "four hundred"}
# Duygu etiketleri (yalnız B). Cümle sırasıyla.
ETIKET = {
 "tr": {"P01": "[curious] İstanbul'da bir adam fişeğe binip göğe çıkmış. [mysterious] Bir başkası da Boğaz'ı uçarak geçmiş.",
        "P05": "[excited] Fitil yanıyor ve fişek onu göğe fırlatıyor!",
        "P10": "[curious] Onu kim izliyor? [knowing] Yine padişah. Yine aynı köşkten.",
        "P14": "[thoughtful] Yani kanıt yok. [warm] Ama dört yüz yıldır anlatıyoruz."},
 "en": {"P01": "[curious] A man rode a rocket into the sky over Istanbul. [mysterious] Another glided across the Bosphorus.",
        "P05": "[excited] The fuse burns, and the rocket hurls him skyward!",
        "P10": "[curious] Who's watching? [knowing] The sultan again. From the very same pavilion.",
        "P14": "[thoughtful] So, no proof. [warm] Yet we've told it for 400 years."}}

def post(path, body):
    r = urllib.request.Request(API + path, data=json.dumps(body).encode(), headers={"xi-api-key": KEY, "Content-Type": "application/json"})
    try:
        return json.loads(urllib.request.urlopen(r).read())
    except urllib.error.HTTPError as e:
        print("HATA", e.code, e.read()[:300]); raise

def kelimeler(ch, st, en):
    # [etiket] aralığını at
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

def uret(vid, text, model, ayar, mp3, js, lang, extra=None, meta=None):
    body = {"text": text, "model_id": model, "voice_settings": ayar, **(extra or {})}
    if model != "eleven_v3" or True: body["language_code"] = lang
    d = post(f"/text-to-speech/{vid}/with-timestamps?output_format=mp3_44100_128", body)
    open(mp3, "wb").write(base64.b64decode(d["audio_base64"]))
    a = d["alignment"]
    w = kelimeler(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"])
    json.dump({"text": text, "words": w, "dur": round(sure(mp3), 3), "voice": vid, "model": model, "ayar": ayar, **(meta or {})},
              open(js, "w"), ensure_ascii=False, indent=1)

def kenar(mp3):
    r = subprocess.run(["python3", "-I", "tools/ses_kenar.py", "kontrol", mp3], capture_output=True, text=True).stdout
    if "KESIK" in r: return "KESIK"
    if "CIT" in r:
        r2 = subprocess.run(["python3", "-I", "tools/ses_kenar.py", "duzelt", mp3], capture_output=True, text=True).stdout
        return "duzeltildi" if "duzeltildi" in r2 else "CIT"
    return "temiz"

mod = sys.argv[1]
if mod == "anlatim":
    ids = sys.argv[2].split(",")
    plan = json.load(open(f"{SES}/plan-sureleri.json"))
    eski = {l: {k: json.load(open(f"{SES}/{l}/{k}.json")) for k in plan} for l in ("tr", "en")}
    keys = list(plan)
    rapor = {}
    for lang in (sys.argv[4].split(",") if len(sys.argv) > 4 else ("tr", "en")):
        for pid in ids:
            i = keys.index(pid)
            onc = eski[lang][keys[i-1]]["text"] if i > 0 else None
            sonr = eski[lang][keys[i+1]]["text"] if i+1 < len(keys) else None
            cs = lambda t: t  # ekran metni; EN TTS dönüşümü aşağıda
            for var in (sys.argv[3].split(",") if len(sys.argv) > 3 else ("A", "B")):
                os.makedirs(f"{ROOT}/ses-v2/{lang}/{var}", exist_ok=True)
                mp3 = f"{ROOT}/ses-v2/{lang}/{var}/{pid}.mp3"; js = mp3[:-4] + ".json"
                limit = plan[pid] - 0.25
                metin = eski[lang][pid]["text"]
                def tts(t):
                    if lang == "en":
                        for a, b in TTS_EN.items(): t = t.replace(a, b)
                    return t
                best = None
                for take in range(1, 4):
                    if var == "A":
                        ex = {}
                        if onc: ex["previous_text"] = tts(onc)
                        if sonr: ex["next_text"] = tts(sonr)
                        uret(ANL[lang], tts(metin), "eleven_multilingual_v2", AYAR_A, mp3, js, lang, ex, {"varyant": "A"})
                    else:
                        uret(ANL[lang], tts(ETIKET[lang][pid]), "eleven_v3", AYAR_B, mp3, js, lang, None, {"varyant": "B"})
                    k = kenar(mp3); d = sure(mp3)
                    ok = k in ("temiz", "duzeltildi") and d <= limit
                    print(lang, pid, var, "cekim", take, k, f"{d:.2f}s limit {limit:.2f}", "OK" if ok else "RED")
                    if ok: best = take; break
                    os.replace(mp3, mp3 + f".c{take}"); os.replace(js, js + f".c{take}")
                if best is None:  # üçü de geçmedi: sığan/temiz olanı en iyi sırayla geri al
                    cand = []
                    for t in range(1, 4):
                        m = mp3 + f".c{t}"
                        if os.path.exists(m): cand.append((sure(m), t))
                    # en kısa çekimi geri koy ve raporla
                    d, t = min(cand)
                    os.replace(mp3 + f".c{t}", mp3); os.replace(js + f".c{t}", js)
                    rapor[(lang, pid, var)] = f"SIGMADI/KENAR ({sure(mp3):.2f}s, limit {limit:.2f}, {kenar(mp3)})"
                for t in range(1, 4):
                    for f in (mp3 + f".c{t}", js + f".c{t}"):
                        if os.path.exists(f): os.remove(f)
                # zaman farkı
                n = json.load(open(js))["words"]; o = eski[lang][pid]["words"]
                if len(n) == len(o):
                    ds = max(abs(a["s"]-b["s"]) for a, b in zip(n, o)); de = max(abs(a["e"]-b["e"]) for a, b in zip(n, o))
                    print("  zaman farki maks baslangic %.2f bitis %.2f" % (ds, de), "DIKKAT" if max(ds, de) > .15 else "")
                else: print("  kelime sayisi farkli", len(n), len(o))
    print("RAPOR", rapor)

if mod == "bagir":
    D = f"{ROOT}/ses-aday/bagir"
    VOICES = [("fatih", "7VqWGAWwo2HMrylfKrcm", 3), ("ali", "xROJDAAwVXltxzeQxuFL", 2), ("cavit", "lxZLq5dcyw12UangGJgN", 2)]
    T = {"tr": ["[shouting] Padişahım, İsa peygamberle konuşmaya gidiyorum! [laughs]",
                "[excited] [shouting] PADİŞAHIM! İsa peygamberle konuşmaya GİDİYORUM! [laughs]",
                "[shouting] Padişahım! İsa peygamberle konuşmaya gidiyorum!! [laughing]"],
         "en": ["[shouting] Sultan! Off to talk with Jesus! [laughs]",
                "[excited] [shouting] SULTAN! Off to talk with JESUS! [laughs]",
                "[shouting] Sultan!! Off to talk with Jesus!! [laughing]"]}
    for lang in ("tr", "en"):
        for ad, vid, n in VOICES:
            for c in range(1, n + 1):
                mp3 = f"{D}/{ad}-{lang}-cekim{c}.mp3"; js = mp3[:-4] + ".json"
                if len(sys.argv) > 2 and f"{lang}-{ad}-{c}" not in sys.argv[2].split(","): continue
                best = None
                for t in range(3):
                    uret(vid, T[lang][c-1], "eleven_v3", {"stability": 0.0, "similarity_boost": 0.8, "style": 0.6, "use_speaker_boost": True}, mp3, js, lang, None, {"etiket": T[lang][c-1]})
                    k = kenar(mp3); d = sure(mp3)
                    print(lang, ad, c, "deneme", t+1, k, f"{d:.2f}s", "UZUN" if d > 4.5 else "")
                    if k in ("temiz", "duzeltildi") and d <= 4.5: break
                    if k != "KESIK" and (best is None or d < best[0]): best = (d, t); os.replace(mp3, mp3 + ".best"); os.replace(js, js + ".best")
                else:
                    if best: os.replace(mp3 + ".best", mp3); os.replace(js + ".best", js)
                for f in (mp3 + ".best", js + ".best"):
                    if os.path.exists(f): os.remove(f)
