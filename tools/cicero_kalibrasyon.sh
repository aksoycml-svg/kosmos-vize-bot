#!/bin/bash
# Çiçero kalibrasyon kareleri (K-A, K-B, K-C) + 360x640 + güvenli alan bindirmesi + hareket şeritleri + renk ölçümü.
# Kullanım: bash tools/cicero_kalibrasyon.sh [cikti_klasoru]   (varsayılan bolumler/cicero/kalibrasyon)
# Not: Bolum kompozisyonu json'u require.context ile yalnız bolumler/**/bolum*.json'dan yükler; kalibrasyon.json bu yüzden
#      satır içi `bolum` prop'u olarak verilir (geçici props dosyası).
set -euo pipefail
KOK="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$KOK/bolumler/cicero/kalibrasyon}"
mkdir -p "$OUT/serit"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
python3 -I -c "import json,sys; b=json.load(open(sys.argv[1])); json.dump({'bolum': b}, open(sys.argv[2],'w'), ensure_ascii=False); json.dump({'bolum': b, 'guvenli': True}, open(sys.argv[3],'w'), ensure_ascii=False)" \
  "$KOK/bolumler/cicero/kalibrasyon.json" "$TMP/props.json" "$TMP/props_g.json"
CH=()
for c in "${CHROME:-}" /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell; do [ -n "$c" ] && [ -x "$c" ] && { CH=(--browser-executable="$c"); break; }; done
still() { (cd "$KOK" && npx remotion still Bolum "${CH[@]}" --props="$1" --frame="$2" --gl=angle "$3" >/dev/null 2>&1) || { echo "HATA: kare $2"; exit 1; }; }
# plan başları (kalibrasyon.json sırası): P01 0 · P04 438 · P07 820
declare -A KARE=([KC_P01_p024]=24 [KA_P04_p170]=608 [KA_P04_p270]=708 [KB_P07_p300]=1120)
for ad in "${!KARE[@]}"; do
  still "$TMP/props.json" "${KARE[$ad]}" "$OUT/$ad.png"
  still "$TMP/props_g.json" "${KARE[$ad]}" "$OUT/${ad}_guvenli.png"
  python3 -I -c "from PIL import Image; import sys; Image.open(sys.argv[1]).resize((360,640), Image.LANCZOS).save(sys.argv[2])" "$OUT/$ad.png" "$OUT/${ad}_360.png"
done
# hareket şeritleri: 4 karede bir, 8 kare (P04 ayak gölgesi p224–252, P07 çarpı p236–264)
serit() { local ad=$1 bas=$2; local L=(); for i in 0 1 2 3 4 5 6 7; do f=$((bas + i * 4)); still "$TMP/props.json" "$f" "$TMP/${ad}_$i.png"; L+=("$TMP/${ad}_$i.png"); done
  python3 -I -c "
from PIL import Image, ImageDraw; import sys
fs=sys.argv[3:]; bas=int(sys.argv[2]); W,H=270,480
out=Image.new('RGB',(W*len(fs),H+28),(20,18,26)); d=ImageDraw.Draw(out)
for i,f in enumerate(fs):
  out.paste(Image.open(f).resize((W,H), Image.LANCZOS),(i*W,28)); d.text((i*W+8,6),f'mutlak {bas+i*4}',fill=(230,220,200))
out.save(sys.argv[1])" "$OUT/serit/$ad.png" "$bas" "${L[@]}"; }
serit P04_ayak_golgesi_p224-252 662
serit P07_carpi_p236-264 1056
# ölçüm
O="$KOK/tools/kalibrasyon_olcum.py"
python3 -I "$O" "$OUT/KA_P04_p270.png" --json "$OUT/olcum_KA_p270.json"
python3 -I "$O" "$OUT/KA_P04_p170.png" --json "$OUT/olcum_KA_p170.json"
python3 -I "$O" "$OUT/KB_P07_p300.png" --imza 0,300,1080,1920 --kirmizi 660,880,960,1160 --json "$OUT/olcum_KB_p300.json"
python3 -I "$O" "$OUT/KC_P01_p024.png" --imza 380,700,800,1060 --json "$OUT/olcum_KC_p024.json"
echo "tamam → $OUT"
