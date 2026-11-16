#!/bin/bash
# Ben-my-Chree kontrol sayfaları (taslak render sonrası). Girdi: out/benmychree/benmychree-{tr,en}.mp4 (+ _is/gorsel.mov yazısız).
# Çıktı: bolumler/ben-my-chree/kontrol/
#   genel-{tr,en}.jpg       32 kare genel bakış (fps=32/61.1, scale=320, tile 8x4)
#   kontrol-kareleri.jpg    her planın kontrol_kare'si (yazısız, 360x640) + plan adı
#   kontrol-kareleri-tr.jpg aynı kareler yazı katmanlı (TR)
#   serit/<plan>.jpg        hareket planlarında her 4 karede şerit (P02, P04, P05, P06, P07, P08, P09, P10b)
set -euo pipefail
KOK="$(cd "$(dirname "$0")/.." && pwd)"; cd "$KOK"
O=bolumler/ben-my-chree/kontrol; V=out/benmychree; mkdir -p "$O/serit"
for d in tr en; do ffmpeg -loglevel error -y -i "$V/benmychree-$d.mp4" -vf "fps=32/61.1,scale=320:-1,tile=8x4" -frames:v 1 -q:v 3 "$O/genel-$d.jpg"; done
python3 -I - "$V" "$O" <<'PY'
import json, subprocess, sys, os
from PIL import Image, ImageDraw
V, O = sys.argv[1], sys.argv[2]
b = json.load(open("bolumler/ben-my-chree/bolum.json")); t0 = 0; K = []
for p in b["planlar"]:
    K.append((p["id"], t0 + p["kontrol_kare"], p.get("kilit", False))); t0 += p["sure_kare"]
def kare(src, f, out):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", src, "-vf", f"select=eq(n\\,{f})", "-vframes", "1", out], check=True)
for ad, src in (("kontrol-kareleri.jpg", f"{V}/_is/gorsel.mov"), ("kontrol-kareleri-tr.jpg", f"{V}/benmychree-tr.mp4")):
    sh = Image.new("RGB", (5 * 360, 2 * 640 + 60), (20, 18, 26)); dr = ImageDraw.Draw(sh)
    for i, (pid, f, kl) in enumerate(K):
        tmp = f"/tmp/bmc_k_{pid}.png"; kare(src, f, tmp)
        x, y = (i % 5) * 360, 30 + (i // 5) * 670
        sh.paste(Image.open(tmp).resize((360, 640)), (x, y)); dr.text((x + 6, y - 24), f"{pid} k{f}{' KILIT' if kl else ''}", fill=(240, 230, 200)); os.remove(tmp)
    sh.save(f"{O}/{ad}", quality=90)
PY
serit() { local ad=$1 bas=$2 bit=$3; local n=$(( (bit-bas)/4 )); local k=$(( n<16?n:16 )); local adim=$(( (bit-bas)/k ));
  ffmpeg -loglevel error -y -i "$V/_is/gorsel.mov" -vf "select='between(n\,$bas\,$bit)*not(mod(n-$bas\,$adim))',scale=180:-1,tile=${k}x1" -frames:v 1 -q:v 3 "$O/serit/$ad.jpg"; }
serit P02_derrick 190 600; serit P04_dollyzoom 1091 1385; serit P05_truck_insert 1388 1624; serit P06_atis_isabet 1627 2171
serit P07_alev_duman 2174 2604; serit P08_bot_crane 2607 2987; serit P09_batis 2990 3169; serit P10b_harita 3406 3663
echo "tamam → $O"
