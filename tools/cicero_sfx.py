"""Cicero foley + ortam: ElevenLabs sound-generation (var olani atlar), 4 dosya proje arsivinden kopya, kenar kontrol/duzelt, tepe olcumu, foley.json.
Kullanim: python3 -I tools/cicero_sfx.py [ad ...]   (anahtar: elevenlabs_api_key; KREDI HARCAR ~20/sn)
Cikti: public/cicero/foley/*.mp3, bolumler/cicero/foley.json (temas sesleri), bolumler/cicero/ortam.json (ortam yataklari, temasla calmaz).
tepe_ms = temas karesine oturan an: varsayilan ilk net baslangic (tepe-20 dB), tepe=='max' ise en yuksek an (kapi/cekmece kapanisi: govde vurusu)."""
import json, os, shutil, subprocess, sys, urllib.request
import numpy as np
OUT = "public/cicero/foley"; FJ = "bolumler/cicero/foley.json"; OJ = "bolumler/cicero/ortam.json"
# ad: (prompt, sure, onerilen_db, tepe_modu)
S = "single, dry, no music"
F = {
 "cic_banknot_kavra": ("fingers pinching and pulling one crisp banknote, short dry paper snap, close, " + S, 0.6, -9, "ilk"),
 "cic_kagit_cep": ("a folded banknote slid into a wool jacket inner pocket, soft cloth rustle, quiet, " + S, 0.8, -10, "ilk"),
 "cic_kutu_kapak": ("the lid of a small leather box closing with a soft dull thump, " + S, 0.6, -8, "max"),
 "cic_kutu_kapak_ac": ("the lid of a small leather box with a brass lock opening, short soft creak and click, " + S, 0.7, -8, "ilk"),
 "cic_kutu_kapak_tok": ("the lid of a small leather box snapping shut firmly with a dull thud, " + S, 0.6, -7, "max"),
 "cic_anahtar_kilit_giris": ("a small brass key sliding into a lock keyhole, tiny metallic scrape, quiet, " + S, 0.5, -10, "ilk"),
 "cic_kutu_kilit_tik": ("a small brass key turning in a box lock with one crisp metallic click, close, " + S, 0.5, -7, "ilk"),
 "cic_anahtar_komodin_cin": ("a small brass key set down on a felt-covered wooden surface, tiny soft metal clink, very quiet, " + S, 0.5, -12, "ilk"),
 "cic_anahtar_al": ("a small brass key picked up from a wooden table, tiny light metal scrape, quiet, " + S, 0.5, -11, "ilk"),
 "cic_banyo_kapi_kapanis": ("a wooden interior door closing gently and latching with a soft click, old house, " + S, 0.9, -8, "max"),
 "cic_banyo_kapi_ac": ("a wooden interior door opening with a soft latch click and a faint hinge creak, old house, " + S, 0.9, -9, "ilk"),
 "cic_adim_hafif": ("one soft footstep of a man in leather shoes on a carpeted wooden floor, light, " + S, 0.5, -12, "ilk"),
 "cic_mum_bas_yumusak": ("a metal key pressed softly into a soft block of beeswax, dull soft press, quiet, " + S, 0.7, -9, "ilk"),
 "cic_belge_yay_hisirti": ("a stack of papers being spread out on a bedspread, soft paper shuffle and rustle, " + S, 1.0, -10, "ilk"),
 "cic_lamba_boyun_gicir": ("a bedside lamp bendable metal neck being turned, short faint metal creak, quiet, " + S, 0.6, -12, "ilk"),
 "cic_deklansor_tik": ("an old compact film camera mechanical shutter click, small crisp mechanical snap, quiet, " + S, 0.5, -9, "ilk"),
 "cic_su_kesilir": ("a bathroom tap turned off, running water stops with a last few drips, muffled behind a closed door, " + S, 1.0, -12, 600),
 "cic_terlik_adim": ("one soft slipper footstep on a tiled floor, muffled behind a closed door, quiet, " + S, 0.5, -12, "ilk"),
 "cic_su_tekrar": ("a bathroom tap turned on, water starts running into a sink, muffled behind a closed door, " + S, 1.2, -13, "ilk"),
 "cic_belge_kutu_hisirti": ("papers being gathered and slid into a small leather box, soft paper rustle, " + S, 0.9, -10, "ilk"),
 "cic_cep_kumas": ("a small hard object slid into a wool jacket pocket, soft cloth rustle, quiet, " + S, 0.5, -11, "ilk"),
 "cic_kutu_tutus": ("a hand taking a small metal film canister from another hand, tiny metallic tap and fingers, quiet, " + S, 0.5, -10, "ilk"),
 "cic_zarf_tutus": ("a thick kraft paper envelope being taken from a hand, soft paper rustle, " + S, 0.6, -10, "ilk"),
 "cic_zarf_kucak": ("a thick envelope dropped softly onto a lap of wool trousers, muffled soft thud, " + S, 0.5, -11, "ilk"),
 "cic_dosya_kayma": ("a file folder pushed across a polished wooden desk, soft dry paper slide, " + S, 0.8, -9, "ilk"),
 "cic_dosya_at_hisirti": ("a thin file folder tossed onto a pile of papers inside a drawer, soft paper flop, " + S, 0.7, -10, "ilk"),
 "cic_cekmece_tok": ("a wooden desk drawer shoved closed with a dull wooden thud, " + S, 0.6, -6, "max"),
 "cic_zarf_ac": ("a thick kraft envelope flap torn open, short dry paper rip, " + S, 0.6, -9, "ilk"),
 "cic_banknot_dokul": ("a bundle of banknotes spilling and fluttering onto a wooden table, soft paper flutter, " + S, 1.2, -9, "ilk"),
 "cic_banknot_say": ("fingers quickly riffling through and counting a stack of banknotes, rapid soft paper riffle, " + S, 1.5, -10, "ilk"),
 "cic_carpi_firca": ("a wet brush stroke on paper, soft quick brush swipe, very quiet, " + S, 0.5, -12, "ilk"),
 "cic_fincan_tin": ("a small enamel tea cup lifted from a metal tray, tiny single tink of enamel on metal, " + S, 0.5, -8, "ilk"),
 "cic_sandalye_it": ("a wooden office chair pushed back on a wooden floor, short scrape, distant, " + S, 0.7, -14, "ilk"),
 "cic_bina_kapi": ("a heavy wooden building door closing behind a person on a street, thump, " + S, 0.8, -10, "max"),
 "cic_adim_kaldirim": ("one quick footstep of a woman's leather shoe on a stone pavement outdoors, crisp, " + S, 0.5, -11, "ilk"),
 "cic_araba_kapi_tok": ("a 1940s car door closing with a metallic thunk, outdoors, " + S, 0.7, -9, "max"),
 "cic_araba_gider": ("an old 1940s car engine accelerating away along a street and fading into the distance, no tire screech, no music", 3.0, -14, "ilk"),
 "cic_cekmece_kucuk": ("a small bedside table drawer closing softly with a soft wooden knock, " + S, 0.6, -9, "max"),
 "cic_lamba_dugme_tik": ("a bakelite rotary lamp switch clicking, one crisp small mechanical click, close, " + S, 0.5, -7, "ilk"),
 "cic_banknot_al": ("a single banknote picked up from a pile of banknotes on a table, soft paper slide, " + S, 0.6, -10, "ilk"),
 "cic_banknot_kayma": ("a single banknote slipping slowly out of fingers and sliding away, soft paper whisper, " + S, 0.9, -10, "ilk"),
}
# proje arsivinden yeniden kullanim (kredi tasarrufu): ad: (kaynak, onerilen_db, tepe_modu)
R = {
 "cic_dosya_masa_tok": ("public/blanc/sfx-v3/dosya-tok.mp3", -8, "ilk"),
 "cic_cizgi_kalem_hafif": ("public/blanc/sfx-v3/kalem-cizirti.mp3", -14, "ilk"),
 "cic_cekmece_kayma": ("public/paris/sfx/pk-cekmece.mp3", -9, "ilk"),
 "cic_belge_karistir": ("public/blanc/sfx-v3/kagit-hisirti.mp3", -11, "ilk"),
}
# ortam yataklari (foley.json'da DEGIL)
O = {
 "cic_ortam_daktilo": ("a typewriter being typed in a distant upstairs office, muffled steady clacking, quiet room tone, no bell, no voices, no music", 4.0),
 "cic_ortam_su": ("water running faintly in a bathroom behind a closed door, steady muffled stream, no voices, no music", 3.0),
 "cic_ortam_araba_uzak": ("a distant car engine idling on a quiet city street, faint low outdoor ambience, no voices, no music", 3.0),
 "cic_ortam_berlin": ("quiet office room tone with a faint electric desk lamp hum and almost silence, no voices, no music", 3.0),
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
        kay = f"{'yeniden-kullanim ' + R[ad][0] if ad in R else 'elevenlabs-sfx (cicero_sfx.py, tek cekim, ses_kenar duzelt)'}; tepe_ms = {'en yuksek' if v[3] == 'max' else (f'elle {v[3]} ms (su durma ani, olcumle)' if isinstance(v[3], int) else 'ilk net baslangic (-20 dB esigi)')}"
        fj[ad] = {"dosya": f"cicero/foley/{ad}.mp3", "tepe_ms": t, "sure_ms": sure, "tepe_dbfs": pk, "en_yuksek_ms": en, "kaynak": kay, "onerilen_db": v[2]}
    json.dump(fj, open(FJ, "w"), ensure_ascii=False, indent=1)
    eski = json.load(open(OJ)) if os.path.exists(OJ) else {}   # elle yazilan "kullanim" ve _not korunur
    oj = {"_not": eski.get("_not", "Ortam yatakları (foley.json'da DEĞİL: temasla çalmaz)."), "yataklar": {}}
    for ad, (t, d) in O.items():
        f = f"{OUT}/{ad}.mp3"; _, _, sure, pk = olc(f, "ilk"); oj["yataklar"][ad] = {"dosya": f"cicero/foley/{ad}.mp3", "sure_ms": sure, "tepe_dbfs": pk}
        if "kullanim" in eski.get("yataklar", {}).get(ad, {}): oj["yataklar"][ad]["kullanim"] = eski["yataklar"][ad]["kullanim"]
    json.dump(oj, open(OJ, "w"), ensure_ascii=False, indent=1)
    print(len(fj), "foley,", len(oj["yataklar"]), "ortam yazildi")
