"""Evliya foley üretimi (ElevenLabs sound-generation). Var olan dosyayı yeniden üretmez.
Kullanım: python3 -I tools/evliya_sfx.py [ad ...]   (anahtar: elevenlabs_api_key ortam değişkeni)"""
import json, os, sys, urllib.request
OUT = "public/evliya/sfx"
L = {
 "fitil-tiss": ("short burning fuse hiss and sizzle, tiny sparks travelling, dry, close, no music", 2.0),
 "puskurme": ("firework rocket motor igniting, gas sputtering whoosh building up, dry, no music", 2.0),
 "fisek-kalkis": ("large firework rocket launching, roaring fire whoosh rising away, ends fading upward, no music", 4.0),
 "adim-tas": ("single soft footstep of a leather shoe on stone, one step only, dry", 0.6),
 "senlik-patlama": ("distant firework bursts over water, muffled boom and crackle, far away, one burst", 3.0),
 "ayak-tahta": ("one footstep pressing on a wooden plank, creak and knock, single, dry", 0.8),
 "oturma-tahta": ("a man sitting down on a wooden seat, wood creak and cloth rustle, single, dry", 1.2),
 "tutunma-tup": ("hand grabbing a wooden tube firmly, clear knock of palm on wood and leather squeak, single, dry", 0.8),
 "kumas-hisirti": ("quick cloth rustle of a man jumping back, robe flap, short, dry", 0.8),
 "baslik-inis": ("soft thud of a small wooden box landing on stone quay, muted, single", 0.8),
 "kanat-hisirti": ("large fabric and wooden frame wings unfolding with a flap, canvas snap, short", 1.2),
 "birakma-tik": ("small wooden latch release click then light clatter, single, dry", 0.6),
 "su-dump": ("heavy wooden object crashing into sea water, big splash and gurgle, no music", 2.5),
 "buhar": ("hot object hissing in water, steam rising puff, soft, no music", 2.5),
 "su-sap": ("person landing into sea water with a splash, single heavy splash", 1.8),
 "su-yatma": ("large cloth wing falling flat onto sea water, soft wet flop and ripple, single", 1.5),
 "islak-el": ("wet hand slapping onto a stone step, single wet slap, close", 0.6),
 "kese-singir": ("small coin purse dropped into an open palm, gentle clink of gold coins inside, single", 1.2),
 "tas-surtme": ("shoe pushing a loose stone across rough stone ledge, scrape, short", 1.0),
 "tas-kayma": ("small stone sliding off an edge and tipping over, scrape then silence, short", 0.8),
 "uzak-tik": ("a small stone hitting the ground with a clear sharp tick and a puff of dust, single, dry", 1.0),
 "tas-sekme": ("small stone bouncing once on the ground, tiny tick, faint", 0.6),
 "marti-cigligi": ("single seagull cry close, then a short pause, no music", 1.8),
 "inis-toprak": ("man landing on dry packed earth, soft thud and dust puff with cloth flap, single", 1.2),
 "omuz-tok": ("hand grabbing a shoulder of thick cloth kaftan, dull fabric thud, single, dry", 0.7),
 "kese-yere": ("coin purse falling onto stone quay, dull clink of coins, single", 1.0),
 "sikke-donme": ("a single gold coin spinning and rolling on stone, ringing, slowing down", 3.0),
 "sikke-tin": ("single coin settling flat on stone with a final ring, short", 1.0),
 "el-ahsap": ("fingertips touching a wooden window shutter, very soft knock, single", 0.5),
 "pencere-tok": ("wooden window shutter closing with a dull knock, single, dry", 0.8),
 "mandal-tik": ("small metal bolt latch sliding and clicking shut, single, crisp but quiet", 0.6),
 "defter-ac": ("heavy old leather book cover falling open on a table, paper rustle, single", 1.2),
 # ortam
 "deniz-ortam": ("calm sea waves lapping against stone quay at night, gentle, loopable, no music", 12.0),
 "ruzgar-kule": ("wind whistling around a high stone tower, steady, airy, no music", 12.0),
 "ruzgar-dusme": ("rushing air wind of falling or gliding fast, whoosh, steady, no music", 8.0),
 "ruzgar-bogaz": ("steady strong wind over open water with fabric flutter, gliding, no music", 12.0),
 "su-damla": ("slow water drips from stone, soft sea lap, quiet room tone, no music", 12.0),
 "yuzme-su": ("a person swimming slowly in sea, gentle water strokes, no music", 8.0),
 "marti-ortam": ("distant seagulls over a harbor with soft waves, quiet, no music", 12.0),
 "mesale-ortam": ("torch flames crackling softly, wind, quiet, no music", 8.0),
 "kagit-ortam": ("quiet room tone with faint paper rustle, old library, no music", 10.0),
 "sehir-ortam": ("distant night city ambience, faint, far dogs, muffled, no music", 12.0),
 "kule-vurgu": ("deep soft wind gust swell, low whoosh, cinematic transition, no music", 2.0),
}
KEY = os.environ["elevenlabs_api_key"]
os.makedirs(OUT, exist_ok=True)
for ad in (sys.argv[1:] or L):
    f = f"{OUT}/{ad}.mp3"
    if os.path.exists(f): continue
    t, d = L[ad]
    r = urllib.request.Request("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128",
        json.dumps({"text": t, "duration_seconds": d, "prompt_influence": 0.5}).encode(),
        {"xi-api-key": KEY, "Content-Type": "application/json"})
    try:
        open(f, "wb").write(urllib.request.urlopen(r, timeout=120).read()); print(ad, "ok")
    except Exception as e: print(ad, "HATA", e)
