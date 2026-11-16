#!/bin/bash
# Ben-my-Chree kalibrasyon turu 5 (yön değişikliği; sahne-plani §12). Mutlak kareler bölümle aynı (kalibrasyon.json):
#   P04 k1291 (karsi-kiyi dolly zoom, yerel 200) · P07b k2388 (gemi-orta, yerel 214) · P10a k3292 (saygi, yerel 120) · K1 k124 (kilit, piksel-aynı denetimi)
# Her kare: tam boy + 360x640 + güvenli alan bindirmeli. Şeritler: P04 dolly zoom yerel 0/62/125/187/250 + parıltı her 4 kare,
# P07b alev her 4 kare, P10a ilk/kontrol/son. Ölçüm: sıcak/p95/C*/L*/kırmızı + kor tekilliği + kontrast. Karşılaştırma: kare | K1 | Paris.
# Kullanım: bash tools/benmychree_kalibrasyon_t5.sh [cikti]   (varsayılan bolumler/ben-my-chree/kalibrasyon/tur-5)
set -euo pipefail
KOK="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$KOK/bolumler/ben-my-chree/kalibrasyon/tur-5}"
mkdir -p "$OUT/serit"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
python3 -I -c "import json,sys; b=json.load(open(sys.argv[1])); json.dump({'bolum': b}, open(sys.argv[2],'w'), ensure_ascii=False); json.dump({'bolum': b, 'guvenli': True}, open(sys.argv[3],'w'), ensure_ascii=False)" \
  "$KOK/bolumler/ben-my-chree/kalibrasyon.json" "$TMP/props.json" "$TMP/props_g.json"
CH=()
for c in "${CHROME:-}" /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell; do [ -n "$c" ] && [ -x "$c" ] && { CH=(--browser-executable="$c"); break; }; done
still() { (cd "$KOK" && npx remotion still Bolum "${CH[@]}" --props="$1" --frame="$2" --gl=angle "$3" >/dev/null 2>&1) || { echo "HATA: kare $2"; exit 1; }; }
declare -A KARE=([K1_P01_k124]=124 [P04_k1291]=1291 [P07b_k2388]=2388 [P10a_k3292]=3292)
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
serit P04_dollyzoom_y0-62-125-187-250-296 1091 1153 1216 1278 1341 1387
serit P04_parilti_y180-208 1271 1275 1279 1283 1287 1291 1295 1299
serit P04_parilti_cikis_y228-248 1319 1323 1327 1331 1335 1339
serit P07b_alev_y204-232 2378 2382 2386 2390 2394 2398 2402 2406
serit P07b_y150-200-245-269 2324 2374 2419 2443
serit P10a_kilitli_y0-120-233 3172 3292 3405
O="$KOK/tools/kalibrasyon_olcum.py"
python3 -I "$O" "$OUT/K1_P01_k124.png" --json "$OUT/olcum_K1.json"
python3 -I "$O" "$OUT/P04_k1291.png" --kirmizi 560,960,800,1120 --json "$OUT/olcum_P04.json"
python3 -I "$O" "$OUT/P07b_k2388.png" --kirmizi 560,700,1000,1700 --json "$OUT/olcum_P07b.json"
python3 -I "$O" "$OUT/P10a_k3292.png" --kirmizi 300,620,380,680 --json "$OUT/olcum_P10a.json"
python3 -I "$KOK/tools/benmychree_kor.py" "$OUT"
# karşılaştırma: her kare | K1 (tur-4 kilit) | Paris genel-tr'den 2 kare — aynı 360x640; ayrıca hepsi tek sayfada
python3 -I - "$OUT" "$KOK/bolumler/paris-kusatmasi/kalibrasyon/tam-render-3/genel-tr.jpg" "$KOK/bolumler/ben-my-chree/kalibrasyon/tur-4/K1_P01_k124.png" <<'PY'
import sys; from PIL import Image, ImageDraw
d, g, k1 = sys.argv[1], Image.open(sys.argv[2]).convert("RGB"), Image.open(sys.argv[3]).convert("RGB").resize((360, 640))
W, H = g.size; tw, th = W / 8, H / 4
par = [g.crop((int(c * tw), int(r * th), int((c + 1) * tw), int((r + 1) * th))).resize((360, 640)) for r, c in [(0, 1), (3, 1)]]
ks = ["P04_k1291", "P07b_k2388", "P10a_k3292"]
def sayfa(liste, ad):
    o = Image.new("RGB", (4 * 360 + 40, len(liste) * 640 + 30), (20, 18, 26)); dr = ImageDraw.Draw(o)
    for i, k in enumerate(liste):
        y = 30 + i * 640
        o.paste(Image.open(f"{d}/{k}.png").resize((360, 640)), (0, y)); o.paste(k1, (370, y))
        for j, p in enumerate(par): o.paste(p, (740 + j * 360, y))
        dr.text((8, y + 2), k, fill=(240, 230, 200)); dr.text((378, y + 2), "K1 (kilit)", fill=(240, 230, 200))
    dr.text((8, 8), "sol: tur-5 kare · K1 tur-4 (kilit) · Paris genel-tr (cati, guvercin)", fill=(240, 230, 200))
    o.save(f"{d}/{ad}")
for k in ks: sayfa([k], f"karsilastirma_{k.split('_')[0]}.png")
sayfa(ks, "karsilastirma.png")
PY
echo "tamam → $OUT"
