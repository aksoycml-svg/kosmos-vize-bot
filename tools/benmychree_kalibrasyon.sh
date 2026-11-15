#!/bin/bash
# Ben-my-Chree kalibrasyon turu (K1 P01 k124 · K2 P07b yerel 214 · K3 P05 k150 · K4 P04 dolly zoom şeridi)
# Her kare: tam boy + 360x640 + güvenli alan bindirmeli. Şeritler: K4 yerel 0/62/125/187/250 + her 4 karede 8'lik (parıltı çevresi),
# K2 kapı itilişi her 4 karede 8'lik. Renk ölçümü: sıcak ≥ %14, p95 L* ≥ 75, kor kutuları dışında C* ≤ 28 / L* ≤ 88.
# Kullanım: bash tools/benmychree_kalibrasyon.sh [cikti]   (varsayılan bolumler/ben-my-chree/kalibrasyon/tur-1)
set -euo pipefail
KOK="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$KOK/bolumler/ben-my-chree/kalibrasyon/tur-1}"
mkdir -p "$OUT/serit"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
python3 -I -c "import json,sys; b=json.load(open(sys.argv[1])); json.dump({'bolum': b}, open(sys.argv[2],'w'), ensure_ascii=False); json.dump({'bolum': b, 'guvenli': True}, open(sys.argv[3],'w'), ensure_ascii=False)" \
  "$KOK/bolumler/ben-my-chree/kalibrasyon.json" "$TMP/props.json" "$TMP/props_g.json"
CH=()
for c in "${CHROME:-}" /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell; do [ -n "$c" ] && [ -x "$c" ] && { CH=(--browser-executable="$c"); break; }; done
still() { (cd "$KOK" && npx remotion still Bolum "${CH[@]}" --props="$1" --frame="$2" --gl=angle "$3" >/dev/null 2>&1) || { echo "HATA: kare $2"; exit 1; }; }
# plan başları (kalibrasyon.json sırası): P01 0 · P04 190 · P05 487 · P07b 726 (P07b yerel 150 = 726)
declare -A KARE=([K1_P01_k124]=124 [K2_P07b_y214]=790 [K3_P05_k150]=637 [K4_P04_y200]=390)
for ad in "${!KARE[@]}"; do
  still "$TMP/props.json" "${KARE[$ad]}" "$OUT/$ad.png"
  still "$TMP/props_g.json" "${KARE[$ad]}" "$OUT/${ad}_guvenli.png"
  python3 -I -c "from PIL import Image; import sys; Image.open(sys.argv[1]).resize((360,640), Image.LANCZOS).save(sys.argv[2])" "$OUT/$ad.png" "$OUT/${ad}_360.png"
done
serit() { local ad=$1; shift; local L=(); local F=("$@"); for f in "${F[@]}"; do still "$TMP/props.json" "$f" "$TMP/${ad}_$f.png"; L+=("$TMP/${ad}_$f.png"); done
  python3 -I -c "
from PIL import Image, ImageDraw; import sys
fs=sys.argv[2:]; W,H=(270,480) if len(fs)<=8 else (180,320)
out=Image.new('RGB',(W*len(fs),H+28),(20,18,26)); d=ImageDraw.Draw(out)
for i,f in enumerate(fs):
  out.paste(Image.open(f).resize((W,H), Image.LANCZOS),(i*W,28)); d.text((i*W+8,6),f.split('_')[-1].replace('.png',''),fill=(230,220,200))
out.save(sys.argv[1])" "$OUT/serit/$ad.png" "${L[@]}"; }
# K4 dolly zoom: yerel 0, 62, 125, 187, 250 (mutlak 190+)
serit K4_P04_dollyzoom_y0-62-125-187-250 190 252 315 377 440
# K4 her 4 karede 8'lik (yerel 180–208: parıltı çıkışı + çekirdek)
serit K4_P04_parilti_y180-208 370 374 378 382 386 390 394 398
# K2 kapı itilişi her 4 karede 8'lik (yerel 206–234)
serit K2_P07b_kapi_y206-234 782 786 790 794 798 802 806 810
# K1 çizgi (kanca) her 4 karede 8'lik (kare 0–28) — ilk kare okunurluğu
serit K1_P01_cizgi_k0-28 0 4 8 12 16 20 24 28
# ölçüm (kor kutuları --kirmizi ile ölçüm dışı: K2 alev, K4 parıltı)
O="$KOK/tools/kalibrasyon_olcum.py"
python3 -I "$O" "$OUT/K1_P01_k124.png" --json "$OUT/olcum_K1.json"
python3 -I "$O" "$OUT/K2_P07b_y214.png" --kirmizi 700,0,1080,1250 --json "$OUT/olcum_K2.json"
python3 -I "$O" "$OUT/K3_P05_k150.png" --json "$OUT/olcum_K3.json"
python3 -I "$O" "$OUT/K4_P04_y200.png" --kirmizi 420,930,700,1060 --json "$OUT/olcum_K4.json"
# kor tekilliği: kor kutusu içi en doygun/en parlak, dışı C* ≤ 28 ve L* ≤ 88
python3 -I "$KOK/tools/benmychree_kor.py" "$OUT"
echo "tamam → $OUT"
