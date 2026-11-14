"""Yarasa bombasi foley (cicero_sfx.py uyarlamasi) + ortam: ElevenLabs sound-generation (var olani atlar), 4 dosya proje arsivinden kopya, kenar kontrol/duzelt, tepe olcumu, foley.json.
Kullanim: python3 -I tools/yarasa_sfx.py [ad ...]   (anahtar: elevenlabs_api_key; KREDI HARCAR ~20/sn)
Cikti: public/yarasa/foley/*.mp3, bolumler/yarasa-bombasi/foley.json (temas sesleri), bolumler/yarasa-bombasi/ortam.json (ortam yataklari, temasla calmaz).
tepe_ms = temas karesine oturan an: varsayilan ilk net baslangic (tepe-20 dB), tepe=='max' ise en yuksek an (kapi/cekmece kapanisi: govde vurusu)."""
import json, os, shutil, subprocess, sys, urllib.request
import numpy as np
OUT = "public/yarasa/foley"; FJ = "bolumler/yarasa-bombasi/foley.json"; OJ = "bolumler/yarasa-bombasi/ortam.json"
# ad: (prompt, sure, onerilen_db, tepe_modu)
S = "single, dry, no music"
F = {
 'kalem-kagit': ('a fountain pen nib drawing a short line on rough paper, soft dry scratch, close, single, dry, no music', 0.6, -10, 'ilk'),
 'kalem-tik': ('a pen tip tapping once on a paper notebook on a wooden desk, tiny dry tick, single, dry, no music', 0.5, -9, 'ilk'),
 'kagit-tok': ('a paper envelope set down flat on a paper map on a desk, soft dull paper tap, single, dry, no music', 0.5, -9, 'ilk'),
 'not-birak': ('a small folded paper note dropped onto a wooden desk, very soft paper flop, single, dry, no music', 0.5, -9, 'ilk'),
 'kagit-hisirti': ('a sheet of paper sliding across a desk, short soft rustle, single, dry, no music', 0.7, -12, 'ilk'),
 'damla-yapistir': ('a tiny drop of glue pressed with tweezers, faint wet tick, very quiet, single, dry, no music', 0.5, -9, 'ilk'),
 'pens-tik': ('small steel tweezers closing with a tiny metallic tick, close, quiet, single, dry, no music', 0.5, -9, 'ilk'),
 'kap-oturma': ('a tiny light cellulose capsule pressed into place, small soft click, quiet, single, dry, no music', 0.5, -6, 'ilk'),
 'tepsi-dizilim': ('round sheet metal trays stacked one onto another inside a metal tube, light rolling metallic clicks, single, dry, no music', 1.2, -12, 'ilk'),
 'kovan-ac': ('a sheet metal canister side panel unlatching and swinging open on a hinge, short metallic creak, single, dry, no music', 0.8, -9, 'ilk'),
 'kanat-uzak': ('a flock of small bats flying overhead at a distance, soft fluttering wings, single, dry, no music', 1.5, -12, 'ilk'),
 'kanat-titrek': ('a single small bat twitching its leathery wing, tiny soft flutter, very quiet, close, single, dry, no music', 0.5, -10, 'ilk'),
 'tutun-uzak': ('a few small bats landing and clinging to wooden eaves, tiny soft scratches, quiet, single, dry, no music', 0.6, -9, 'ilk'),
 'kivilcim-cirt': ('a small chemical incendiary pellet sparking, short sharp fizz and crackle, single, dry, no music', 0.5, -7, 'ilk'),
 'ates-tutus': ('a small fire catching on dry wooden boards, a soft whump and growing crackle, no explosion, single, dry, no music', 1.2, -7, 'ilk'),
 'ates-yatak': ('steady crackling fire burning dry timber buildings outdoors, continuous, single, dry, no music', 6.0, -12, 'ilk'),
 'igne-tak': ('a map pin pushed into a paper map on cork, tiny dry tick, single, dry, no music', 0.5, -9, 'ilk'),
 'muhur-tok': ('a rubber stamp pressed firmly onto a paper document on a wooden desk, one dull thud, single, dry, no music', 0.6, -5, 'max'),
 'kagit-cevir': ('a single notebook page being turned, soft paper flip, single, dry, no music', 0.7, -9, 'ilk'),
}
R = {
}
O = {
 'ruzgar-col': ('light dry desert wind over open flat land in the late afternoon, gentle, no birds, continuous, no music', 8.0),
 'oda-tonu': ('quiet room tone of a small 1940s office at evening, very faint, no music', 8.0),
 'tank-inleme': ('a large steel fuel tank faintly creaking and ticking as it cools in the wind, sparse, quiet, no music', 6.0),
}
def pcm(f):
    b = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f, "-f", "f32le", "-ac", "1", "-ar", "44100", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(b, np.float32)
def olc(f, mod):
    x = np.abs(pcm(f)); w = 88; n = len(x) // w
    e = x[:n * w].reshape(n, w).max(1); pk = e.max()
    ilk = int(np.argmax(e > pk * 10 ** (-20 / 20))); mx = int(e.argmax())
    t = mod if isinstance(mod, int) else (mx * 2 if mod == "max" else ilk * 2)
    return t, mx * 2, int(round(len(x) / 44.1)), round(float(20 * np.log10(pk + 1e-9)), 1)
def uret(ad, t, d, key):
    f = f"{OUT}/{ad}.mp3"
    if os.path.exists(f): return
    r = urllib.request.Request("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128",
        json.dumps({"text": t, "duration_seconds": d, "prompt_influence": 0.5}).encode(), {"xi-api-key": key, "Content-Type": "application/json"})
    open(f, "wb").write(urllib.request.urlopen(r, timeout=90).read())
def esitle(f, ortam):
    """Seviye eslitme (onerilen_db anlamli olsun): foley tepe -3 dBFS; ortam -18 LUFS (tepe <= -1.5). Zaten esitse dokunmaz."""
    x = pcm(f); pk = float(np.abs(x).max())
    if ortam:
        r = subprocess.run(["ffmpeg", "-nostats", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
        i = float(r.split("Integrated loudness:")[1].split("I:")[1].split("LUFS")[0]); g = -18 - i
        g = min(g, -1.5 - 20 * np.log10(pk + 1e-9)); hedef_ok = abs(g) < 0.5
    else:
        g = -3 - 20 * np.log10(pk + 1e-9); hedef_ok = abs(g) < 0.5
    if hedef_ok: return round(g, 1)
    tmp = f + ".tmp.mp3"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f, "-af", f"volume={g:.2f}dB,alimiter=limit=0.89:level=disabled", "-b:a", "128k", tmp], check=True)
    os.replace(tmp, f); return round(g, 1)
if __name__ == "__main__":
    key = os.environ["elevenlabs_api_key"]; os.makedirs(OUT, exist_ok=True)
    sec = sys.argv[1:]; kredi_sn = 0.0
    for ad, (t, d, _, _) in F.items():
        if (not sec or ad in sec) and not os.path.exists(f"{OUT}/{ad}.mp3"): uret(ad, t, d, key); kredi_sn += d
    for ad, (t, d) in O.items():
        if (not sec or ad in sec) and not os.path.exists(f"{OUT}/{ad}.mp3"): uret(ad, t, d, key); kredi_sn += d
    for ad, (k, _, _) in R.items():
        if not os.path.exists(f"{OUT}/{ad}.mp3"): shutil.copy(k, f"{OUT}/{ad}.mp3")
    print("uretilen sure sn (~20 kredi/sn):", kredi_sn)
    subprocess.run(["python3", "-I", "tools/ses_kenar.py", "duzelt"] + [f"{OUT}/{a}.mp3" for a in list(F) + list(R) + list(O)])
    kazanc = {a: esitle(f"{OUT}/{a}.mp3", a in O) for a in list(F) + list(R) + list(O)}
    print("esitleme kazanci dB (min/maks):", min(kazanc.values()), max(kazanc.values()))
    subprocess.run(["python3", "-I", "tools/ses_kenar.py", "duzelt"] + [f"{OUT}/{a}.mp3" for a in list(F) + list(R) + list(O)], stdout=subprocess.DEVNULL)  # kazanc sonrasi kenar
    fj = {}
    for ad, v in list(F.items()) + [(a, (None, None, v[1], v[2])) for a, v in R.items()]:
        f = f"{OUT}/{ad}.mp3"; t, en, sure, pk = olc(f, v[3])
        kay = f"{'yeniden-kullanim ' + R[ad][0] if ad in R else 'elevenlabs-sfx (yarasa_sfx.py, tek cekim, ses_kenar duzelt)'}; tepe_ms = {'en yuksek' if v[3] == 'max' else (f'elle {v[3]} ms (su durma ani, olcumle)' if isinstance(v[3], int) else 'ilk net baslangic (-20 dB esigi)')}"
        fj[ad] = {"dosya": f"yarasa/foley/{ad}.mp3", "tepe_ms": t, "sure_ms": sure, "tepe_dbfs": pk, "en_yuksek_ms": en, "kaynak": kay, "onerilen_db": v[2]}
    json.dump(fj, open(FJ, "w"), ensure_ascii=False, indent=1)
    eski = json.load(open(OJ)) if os.path.exists(OJ) else {}   # elle yazilan "kullanim" ve _not korunur
    oj = {"_not": eski.get("_not", "Ortam yatakları (foley.json'da DEĞİL: temasla çalmaz)."), "yataklar": {}}
    for ad, (t, d) in O.items():
        f = f"{OUT}/{ad}.mp3"; _, _, sure, pk = olc(f, "ilk"); oj["yataklar"][ad] = {"dosya": f"yarasa/foley/{ad}.mp3", "sure_ms": sure, "tepe_dbfs": pk}
        if "kullanim" in eski.get("yataklar", {}).get(ad, {}): oj["yataklar"][ad]["kullanim"] = eski["yataklar"][ad]["kullanim"]
    json.dump(oj, open(OJ, "w"), ensure_ascii=False, indent=1)
    print(len(fj), "foley,", len(oj["yataklar"]), "ortam yazildi")
