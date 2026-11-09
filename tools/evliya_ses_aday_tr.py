"""TR anlatıcı aday taraması (ham ses, ses ayırma yok). Anahtar: elevenlabs_api_key (yazdırılmaz).
Kullanım: python3 -I tools/evliya_ses_aday_tr.py uret   -> public/evliya/ses-aday/tr-aday/<ad>-{v3-P01,v3-P08,v2-P01}.mp3
Kütüphane sesi hesaba eklenemez (anahtarda voices_write yok) ama TTS doğrudan voice_id ile çalışır.
"""
import json, os, subprocess, sys, urllib.request, urllib.error
KEY = os.environ["elevenlabs_api_key"]; API = "https://api.elevenlabs.io/v1"; D = "public/evliya/ses-aday/tr-aday"
ADAY = [("cavitpancar", "Y2T2O1csKPgWgyuKcU0a"), ("ozankaraca", "5nr6ATQepuidiLb6OT3B"), ("adamsakin", "RXCCWbOxP7Hisa63Xsv5"),
        ("yusufsuratli", "tOqnHSMt5y3uRBgH7e8J"), ("dogaaudiobook", "ctoYieZ4J7WwcdhujpMq"), ("seyfullah", "mF7tIc9VLrznhGooGjaT"),
        ("alexderin", "KediIz7pebzt5TaDHiiZ"), ("tarkan", "5WzTv66bK7WWszHUzwZ5"), ("blancvwm", "vwmWyMlmlJtiiXeCVRKn"),
        ("umut", "jZQNewKOZcubZDDwBxdL")]
V3 = {"P01": "[curious] İstanbul'da bir adam fişeğe binip göğe çıkmış. [mysterious] Bir başkası da Boğaz'ı uçarak geçmiş.",
      "P08": "[curious] Peki öteki adam? [intrigued] Hezarfen, Galata Kulesi'nin tepesinde."}
V2 = {"P01": "İstanbul'da bir adam fişeğe binip göğe çıkmış. Bir başkası da Boğaz'ı uçarak geçmiş."}
S3 = {"stability": 0.5, "similarity_boost": 0.8, "style": 0.5, "use_speaker_boost": True, "speed": 1.1}
S2 = {"stability": 0.35, "similarity_boost": 0.8, "style": 0.5, "use_speaker_boost": True}

def tts(vid, text, model, ayar, out):
    b = {"text": text, "model_id": model, "voice_settings": ayar, "language_code": "tr"}
    r = urllib.request.Request(f"{API}/text-to-speech/{vid}?output_format=mp3_44100_128", data=json.dumps(b).encode(),
                               headers={"xi-api-key": KEY, "Content-Type": "application/json"})
    open(out, "wb").write(urllib.request.urlopen(r).read())

def kenar(f):
    r = subprocess.run(["python3", "-I", "tools/ses_kenar.py", "kontrol", f], capture_output=True, text=True).stdout
    if "KESIK" in r: return "KESIK"
    if "CIT" in r:
        subprocess.run(["python3", "-I", "tools/ses_kenar.py", "duzelt", f], capture_output=True, text=True)
        return "duzeltildi"
    return "temiz"

if sys.argv[1] == "uret":
    for ad, vid in ADAY:
        isler = [(f"{ad}-v3-P01", V3["P01"], "eleven_v3", S3), (f"{ad}-v3-P08", V3["P08"], "eleven_v3", S3),
                 (f"{ad}-v2-P01", V2["P01"], "eleven_multilingual_v2", S2)]
        for ka, tx, m, s in isler:
            f = f"{D}/{ka}.mp3"
            if os.path.exists(f): continue
            for t in range(1, 4):
                try: tts(vid, tx, m, s, f)
                except urllib.error.HTTPError as e: print(ka, "HATA", e.code, e.read()[:150]); break
                k = kenar(f); print(ka, "cekim", t, k)
                if k != "KESIK": break
