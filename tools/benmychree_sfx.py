"""Ben-my-Chree foley + ortam: ElevenLabs sound-generation (var olani atlar; abonelik ici, ek ucret 0), 3 dosya proje arsivinden, kenar kontrol/duzelt,
tepe olcumu, foley.json + ortam.json (bolumler/ben-my-chree/). Cicero betiginin yardimcilarini kullanir.
Kullanim: python3 -I tools/benmychree_sfx.py [ad ...]   (anahtar: elevenlabs_api_key; KREDI HARCAR ~20/sn, toplam ~45 sn)
temas -> ses eslemesi: bolumler/ben-my-chree/temaslar-taslak.json (kare = mutlak; bolum.json temaslar[] yazilinca o esas)."""
import importlib.util, json, os, shutil, subprocess, sys
spec = importlib.util.spec_from_file_location("cs", "tools/cicero_sfx.py"); cs = importlib.util.module_from_spec(spec); spec.loader.exec_module(cs)
OUT = "public/benmychree/foley"; FJ = "bolumler/ben-my-chree/foley.json"; OJ = "bolumler/ben-my-chree/ortam.json"
cs.OUT = OUT
S = "single, dry, no music"
# ad: (prompt, sure, onerilen_db, tepe_modu)
F = {
 "bmc_vinc_halat": ("a ship's derrick winch slowly lowering a heavy load on a thick hemp rope, steady creaking rope and wooden block squeal, distant harbor, no voices, no music", 3.8, -12, "ilk"),
 "bmc_samandira_su": ("two wooden aircraft floats touching calm harbor water, soft low splash and slap, close, " + S, 0.9, -8, "ilk"),
 "bmc_halka_tik": ("a small brass binocular focus ring turned by one thumb, one tiny crisp mechanical click, very close, " + S, 0.5, -9, "ilk"),
 "bmc_top_atis": ("a single field mountain gun firing outdoors on a hillside, one sharp dry boom with a short rocky echo, no explosion, no debris, " + "no music", 1.4, -6, "ilk"),
 "bmc_su_sutunu": ("a distant large artillery shell splashing into the sea far away, a low deep water thump and a long soft collapse of water, far, " + "no music", 1.8, -10, "ilk"),
 "bmc_top_uzak": ("a distant cannon shot heard from far away over water, muffled low thud and faint echo, " + "no music", 1.6, -12, "ilk"),
 "bmc_isabet_tok": ("an artillery shell hitting a steel ship deck, one heavy dull metallic impact with a deep low boom, short rattle after, no music", 1.6, -6, "ilk"),
 "bmc_govde_inleme": ("a large steel ship hull groaning under strain, slow low metal creak and moan, heavy, " + "no music", 2.2, -9, "ilk"),
 "bmc_govde_inleme_uzun": ("a large steel ship hull slowly listing and groaning, long low metal moan and creak with a faint water gurgle, heavy, sad, " + "no music", 3.0, -9, "ilk"),
 "bmc_ates_tutus": ("a large stack of dry timber and fuel catching fire, one soft whump of flame igniting and growing crackle, no explosion, " + "no music", 1.6, -7, "ilk"),
 "bmc_bot_motor": ("a small steam launch boat engine starting, sputter then steady low chug pulling away across harbor water and fading into the distance, " + "no music", 2.8, -10, "ilk"),
 "bmc_kabarcik": ("air bubbles gurgling up around a steel hull in the water, soft wet bubbling, " + S, 1.2, -11, "ilk"),
 "bmc_govde_oturma": ("a heavy steel ship hull settling onto the sandy seabed in shallow water, one dull low thump and soft water rush, " + "no music", 1.2, -9, "ilk"),
 "bmc_harita_cizgi": ("a pen drawing one long steady ink line across old parchment, soft continuous scratch, very quiet, " + S, 1.9, -14, "ilk"),
}
# proje arsivinden yeniden kullanim: ad: (kaynak, onerilen_db, tepe_modu)
R = {
 "bmc_igne_tak": ("public/yarasa/foley/igne-tak.mp3", -9, "ilk"),
 "bmc_halat_gevsek": ("public/paris/sfx/pk-halat-gevse.mp3", -11, "ilk"),
}
# turetilen kisa kopya: ad: (kaynak_ad, sure_sn, onerilen_db) — P10b rota cizgisi 82 kare = 1.37 sn
D = {"bmc_harita_cizgi_kisa": ("bmc_harita_cizgi", 1.4, -14)}
# ortam yataklari (foley.json'da DEGIL)
O = {
 "bmc_ortam_deniz": ("calm Mediterranean sea gently lapping against rocks and a stone quay, light breeze, daytime, loopable, no voices, no birds, no music", 6.0),
 "bmc_ortam_ruzgar": ("dry wind moving through dry grass and low shrubs on a rocky hillside, soft steady, loopable, no voices, no music", 6.0),
 "bmc_ortam_yangin": ("distant large fire crackling and a low soft roar with gentle waves, far away across water, the sound fades out gently at the end, no voices, no music", 6.0),
}
if __name__ == "__main__":
    key = os.environ["elevenlabs_api_key"]; os.makedirs(OUT, exist_ok=True)
    sec = sys.argv[1:]; kredi_sn = 0.0
    for ad, (t, d, _, _) in F.items():
        if (not sec or ad in sec) and not os.path.exists(f"{OUT}/{ad}.mp3"): cs.uret(ad, t, d, key); kredi_sn += d
    for ad, (t, d) in O.items():
        if (not sec or ad in sec) and not os.path.exists(f"{OUT}/{ad}.mp3"): cs.uret(ad, t, d, key); kredi_sn += d
    for ad, (k, _, _) in R.items():
        if not os.path.exists(f"{OUT}/{ad}.mp3"): shutil.copy(k, f"{OUT}/{ad}.mp3")
    for ad, (k, d, _) in D.items():
        if not os.path.exists(f"{OUT}/{ad}.mp3"):
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{OUT}/{k}.mp3", "-t", str(d), "-af", f"afade=t=out:st={d-0.12}:d=0.12", "-b:a", "128k", f"{OUT}/{ad}.mp3"], check=True)
    print("uretilen sure sn (~20 kredi/sn):", kredi_sn)
    tum = [f"{OUT}/{a}.mp3" for a in list(F) + list(R) + list(D) + list(O)]
    subprocess.run(["python3", "-I", "tools/ses_kenar.py", "duzelt"] + tum)
    kazanc = {a: cs.esitle(f"{OUT}/{a}.mp3", a in O) for a in list(F) + list(R) + list(D) + list(O)}
    print("esitleme kazanci dB (min/maks):", min(kazanc.values()), max(kazanc.values()))
    subprocess.run(["python3", "-I", "tools/ses_kenar.py", "duzelt"] + tum, stdout=subprocess.DEVNULL)
    fj = {}
    for ad, v in list(F.items()) + [(a, (None, None, v[1], v[2])) for a, v in R.items()] + [(a, (None, None, v[2], "ilk")) for a, v in D.items()]:
        t, en, sure, pk = cs.olc(f"{OUT}/{ad}.mp3", v[3])
        kay = ("yeniden-kullanim " + R[ad][0] if ad in R else ("turetilen kisa kopya: " + D[ad][0] if ad in D else "elevenlabs-sfx (benmychree_sfx.py, tek cekim, ses_kenar duzelt)")) + "; tepe_ms = ilk net baslangic (-20 dB esigi)"
        fj[ad] = {"dosya": f"benmychree/foley/{ad}.mp3", "tepe_ms": t, "sure_ms": sure, "tepe_dbfs": pk, "en_yuksek_ms": en, "kaynak": kay, "onerilen_db": v[2]}
    json.dump(fj, open(FJ, "w"), ensure_ascii=False, indent=1)
    eski = json.load(open(OJ)) if os.path.exists(OJ) else {}   # elle yazilan "kullanim" ve _not korunur
    oj = {"_not": eski.get("_not", "Ortam yatakları (foley.json'da DEĞİL: temasla çalmaz)."), "yataklar": {}}
    for ad in O:
        _, _, sure, pk = cs.olc(f"{OUT}/{ad}.mp3", "ilk")
        oj["yataklar"][ad] = {"dosya": f"benmychree/foley/{ad}.mp3", "sure_ms": sure, "tepe_dbfs": pk}
        if "kullanim" in eski.get("yataklar", {}).get(ad, {}): oj["yataklar"][ad]["kullanim"] = eski["yataklar"][ad]["kullanim"]
    json.dump(oj, open(OJ, "w"), ensure_ascii=False, indent=1)
    print(len(fj), "foley,", len(oj["yataklar"]), "ortam yazildi")
