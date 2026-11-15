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
python3 -I "$O" "$OUT/K2_P07b_y214.png" --kirmizi 300,0,720,1500 --json "$OUT/olcum_K2.json"
python3 -I "$O" "$OUT/K3_P05_k150.png" --json "$OUT/olcum_K3.json"
python3 -I "$O" "$OUT/K4_P04_y200.png" --kirmizi 420,930,700,1060 --json "$OUT/olcum_K4.json"
# kor tekilliği: kor kutusu içi en doygun/en parlak, dışı C* ≤ 28 ve L* ≤ 88
python3 -I "$KOK/tools/benmychree_kor.py" "$OUT"
# 2× kırpımlar: yüzler ve omuzlar (tur-2 isteği; kare koordinatları ref kamerada)
python3 -I - "$OUT" <<'PY'
import sys; from PIL import Image
d = sys.argv[1]
K = {"K3_P05_k150.png": {"yuz_tegmen": (600, 380, 1020, 900), "yuz_E1": (60, 520, 300, 720), "yuz_E3": (370, 520, 600, 720), "omuz_tegmen": (380, 820, 900, 1300), "omuz_E1": (60, 640, 380, 960)},
     "K2_P07b_y214.png": {"yuz_T3": (700, 720, 940, 920), "omuz_T3": (720, 820, 1000, 1120)}}
for f, kk in K.items():
    im = Image.open(f"{d}/{f}")
    for ad, (x0, y0, x1, y1) in kk.items():
        im.crop((x0, y0, x1, y1)).resize(((x1 - x0) * 2, (y1 - y0) * 2), Image.LANCZOS).save(f"{d}/kirpim2x_{ad}.png")
PY
# Paris karşılaştırma sayfası: her K karesi + Paris genel sayfasından 3 kare (aynı 360x640)
python3 -I - "$OUT" "$KOK/bolumler/paris-kusatmasi/kalibrasyon/tam-render-3/genel-tr.jpg" <<'PY'
import sys; from PIL import Image, ImageDraw
d, g = sys.argv[1], Image.open(sys.argv[2]).convert("RGB"); W, H = g.size; tw, th = W / 8, H / 4
par = [g.crop((int(c * tw), int(r * th), int((c + 1) * tw), int((r + 1) * th))).resize((360, 640)) for r, c in [(0, 1), (0, 7), (3, 1)]]
ks = ["K1_P01_k124", "K2_P07b_y214", "K3_P05_k150", "K4_P04_y200"]
o = Image.new("RGB", (4 * 360 + 30, 4 * 640 + 30), (20, 18, 26)); dr = ImageDraw.Draw(o)
for i, k in enumerate(ks):
    o.paste(Image.open(f"{d}/{k}.png").resize((360, 640)), (0, 30 + i * 640))
    for j, p in enumerate(par): o.paste(p, (390 + j * 360, 30 + i * 640))
    dr.text((8, 32 + i * 640), k, fill=(240, 230, 200))
dr.text((8, 8), "sol: Ben-my-Chree tur · sag: Paris genel-tr (cati, balon, guvercin)", fill=(240, 230, 200))
o.save(f"{d}/karsilastirma.png")
PY
echo "tamam → $OUT"
