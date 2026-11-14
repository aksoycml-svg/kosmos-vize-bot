"""Paris foley: kalan 25 sesi ElevenLabs sound-generation ile üretir (var olanı atlar), tepe/sure ölçer, foley.json'u günceller.
Kullanım: python3 -I tools/paris_sfx.py [ad ...]   (anahtar: elevenlabs_api_key; KREDİ HARCAR — önce kullanıcı onayı)
Süre verilmiş üretim ≈ 20 kredi/sn varsayımı; tahmin: bolumler/paris-kusatmasi/miks.md §Kredi."""
import json, os, sys, subprocess, urllib.request
import numpy as np
OUT = "public/paris/sfx"; FJ = "bolumler/paris-kusatmasi/foley.json"
# ad: (prompt, süre sn)  -- hepsi "no music", kuru, tek olay; savaş gösterisi yok
L = {
 "igne-tak": ("a single sharp push-pin pressed into a cork map board, small crisp tack, dry, close", 0.5),
 "pk-tel-kopma": ("a taut thin telegraph wire snapping with a short metallic ping, then faint vibrating decay, dry", 1.2),
 "pk-gaz-fis": ("soft gas hose hiss filling a large silk balloon, gentle steady airy hiss with fabric stretching, no whoosh, no riser", 2.5),
 "pk-ag-git": ("a rope net tightening over a balloon, one short creak of hemp rope, single", 0.8),
 "pk-kumas-pof": ("a big cloth balloon settling with a soft muffled puff of air and fabric flutter, single", 1.2),
 "pk-halat-coz": ("a thick hemp rope being untied and slipping loose, short rasp, single", 1.0),
 "pk-sepet-konma": ("a wicker basket set down on dirt ground, soft woven creak and light thud, single", 0.8),
 "pk-kapak-mentese": ("a small wooden cage lid opening on a dry hinge, quiet creak, single", 1.0),
 "pk-kagit-fist": ("a sheet of paper sliding quickly into a narrow slot, short dry swish, single", 0.6),
 "pk-cekmece": ("a small wooden drawer sliding open smoothly, soft wood scrape, single", 0.8),
 "pk-sandik-tok": ("a small wooden crate set down into a wicker basket, dull knock and woven creak, single", 0.7),
 "pk-hasir-gicir": ("wicker basket creaking under weight, short woven squeak, single, dry", 1.0),
 "pk-halat-gerilme": ("a thick rope pulled taut, fibres creaking and groaning, slow rise, single", 1.5),
 "pk-uzak-pat": ("one very distant muffled dull thud far away outdoors, single, no echo, faint", 0.8),
 "pk-gaz-bosal": ("a large cloth balloon deflating, soft sighing air leak and fabric collapse, no whoosh, short", 2.0),
 "pk-kum-akis": ("a small canvas sandbag emptying, pouring sand hiss, short, dry", 1.5),
 "pk-sepet-gicir": ("a wicker basket lurching up lighter, quick woven creak and small rope slap, single", 1.0),
 "pk-halat-gevse": ("a rope going slack, soft fibre rustle and tiny sag, single", 1.0),
 "pk-kilif-otur": ("a tiny amber glass tube sliding onto a bird feather quill, faint glassy click, very small, single", 0.5),
 "pk-kanat-salma": ("a pigeon opening its wings and releasing from a hand, one quick feather flap, single", 0.8),
 "pk-kilif-coz": ("a thin thread being untied from a small tube, tiny fibre tick, very quiet, single", 0.6),
 "pk-lamba": ("an old limelight lamp igniting, soft gas catch and low steady burn, quiet room, no whoosh", 1.5),
 "pk-cam-levha": ("a small glass plate slotted into a wooden holder, clean glassy click, single", 0.6),
 "pk-odak-disli": ("a small brass focusing gear turning slowly, soft ratchet ticking, mechanical, quiet, steady", 2.0),
 "pk-kagit-yagmur": ("many thin film strips and paper slips fluttering down onto rooftops, soft light patter, distant, gentle", 3.0),
 "pk-halat-kavra": ("a hand gripping a thick hemp rope, quick fibre squeak and glove-free palm rub, single, dry, soft", 0.6),
}
def olc(f):
    b = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", f, "-f", "f32le", "-ac", "1", "-ar", "44100", "-"], capture_output=True, check=True).stdout
    x = np.abs(np.frombuffer(b, np.float32)); i = int(x.argmax())
    return int(round(i / 44.1)), int(round(len(x) / 44.1)), float(round(20 * np.log10(x.max() + 1e-9), 1))
if __name__ == "__main__":
    KEY = os.environ["elevenlabs_api_key"]; os.makedirs(OUT, exist_ok=True)
    F = json.load(open(FJ))
    for ad in (sys.argv[1:] or L):
        f = f"{OUT}/{ad}.mp3"
        if not os.path.exists(f):
            t, d = L[ad]
            r = urllib.request.Request("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128",
                json.dumps({"text": t, "duration_seconds": d, "prompt_influence": 0.5}).encode(), {"xi-api-key": KEY, "Content-Type": "application/json"})
            open(f, "wb").write(urllib.request.urlopen(r, timeout=60).read())
        if ad in F:
            F[ad]["tepe_ms"], F[ad]["sure_ms"], F[ad]["tepe_dbfs"] = olc(f); F[ad].pop("durum", None); F[ad].pop("tepe_ms_tahmin", None)
    json.dump(F, open(FJ, "w"), ensure_ascii=False, indent=1)
