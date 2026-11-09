#!/usr/bin/env bash
# Evliya uçuşları — tam render (iki dil, görüntü bir kez). CLAUDE.md "İki dil baştan birlikte".
#
# Akış:
#   1) bundle (bir kez; webpack paralel çakışmasın diye parçalar aynı bundle'dan, SIRAYLA)
#   2) GÖRÜNTÜ (mod "gorsel", yazısız) parça parça --frames → ProRes 422 (intra: kare-kesin) → concat (-c copy)
#   3) YAZI katmanı TR ve EN (mod "yazi", şeffaf) → ProRes 4444 + alfa (yuva444p10le)
#   4) ffmpeg: görüntü + dilin yazısı (overlay) + public/evliya/miks/<dil>.wav → out/evliya/evliya-<dil>.mp4
#      (H.264 high, yuv420p, bt709, 60 fps; AAC 320k 48 kHz; çıktı loudness ölçülür: hedef −14 ±0.3 LUFS, TP ≤ −1.5)
#
# Kullanım:
#   tools/evliya_render.sh                    # tam bölüm (bolum.json toplamı; 77 sn sürümde 4624 kare) → out/evliya/evliya-{tr,en}.mp4
#   tools/evliya_render.sh --aralik 880-999   # deneme: yalnız bu kare aralığı (dahil) → out/evliya/deneme/
#   seçenekler: --parca N (görüntü parça boyu, varsayılan 600) · --diller "tr en" · --is "4" (concurrency, varsayılan nproc)
#               --tut (ara dosyaları silme) · --yazi-png (yazı katmanını ayrıca PNG dizi olarak da yaz: <is>/yazi_<dil>_png/)
# Ön koşul: public/evliya/miks/{tr,en}.wav güncel (python3 -I tools/evliya_miks.py). Render ÖNCE doğrulayıcı: node tools/bolum_dogrula.mjs.
# GL: --gl=angle ZORUNLU (swangle P04'te figürü çizmiyor, K8 bulgusu).
set -euo pipefail
cd "$(dirname "$0")/.."

YOL="evliya-ucuslari/bolum.json"
BR="${REMOTION_BROWSER:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}"
FPS=60; PARCA=600; DILLER="tr en"; ARALIK=""; TUT=0; YPNG=0; IS="$(nproc)"
while [ $# -gt 0 ]; do
  case "$1" in
    --aralik) ARALIK="$2"; shift 2;;
    --parca) PARCA="$2"; shift 2;;
    --diller) DILLER="$2"; shift 2;;
    --is) IS="$2"; shift 2;;
    --tut) TUT=1; shift;;
    --yazi-png) YPNG=1; shift;;
    *) echo "bilinmeyen seçenek: $1" >&2; exit 2;;
  esac
done

TOPLAM=$(python3 -I -c "import json;print(sum(p['sure_kare'] for p in json.load(open('bolumler/$YOL'))['planlar']))")
if [ -n "$ARALIK" ]; then BAS=${ARALIK%-*}; BIT=${ARALIK#*-}; OUT=out/evliya/deneme; else BAS=0; BIT=$((TOPLAM-1)); OUT=out/evliya; fi
[ "$BIT" -lt "$TOPLAM" ] && [ "$BAS" -le "$BIT" ] || { echo "aralık $BAS-$BIT geçersiz (toplam $TOPLAM)" >&2; exit 2; }
N=$((BIT-BAS+1))
IS_D="$OUT/_is"; mkdir -p "$IS_D" "$OUT"
LOG="$OUT/render.log"; : > "$LOG"
t0=$(date +%s)
kare_say() { ffprobe -v error -count_packets -select_streams v:0 -show_entries stream=nb_read_packets -of default=nk=1:nw=1 "$1" | head -1 | tr -dc 0-9; }
log() { echo "[$(date +%H:%M:%S) +$(( $(date +%s)-t0 ))s] $*" | tee -a "$LOG"; }
RFLAGS=(--gl=angle --browser-executable="$BR" --concurrency="$IS" --muted --log=error)

for d in $DILLER; do [ -f "public/evliya/miks/$d.wav" ] || { echo "eksik: public/evliya/miks/$d.wav" >&2; exit 1; }; done
log "doğrulayıcı"; node tools/bolum_dogrula.mjs "bolumler/$YOL" | tail -1 | tee -a "$LOG"

log "bundle"
npx remotion bundle src/index.ts --out-dir="$IS_D/bundle" --log=error >>"$LOG" 2>&1
B="$IS_D/bundle"

# ---- 2) görüntü: parçalar sırayla ----
if [ "${YALNIZ_YAZI:-0}" = 1 ] && [ -s "$IS_D/gorsel.mov" ]; then
  log "YALNIZ_YAZI=1: görüntü yeniden render edilmiyor, mevcut gorsel.mov kullanılıyor"
else
: > "$IS_D/gorsel.txt"
p=$BAS; i=0
while [ $p -le $BIT ]; do
  q=$(( p+PARCA-1 )); [ $q -gt $BIT ] && q=$BIT
  f=$(printf "$IS_D/gorsel_%03d.mov" $i)
  if [ -s "$f" ] && [ "$(kare_say "$f")" = "$((q-p+1))" ]; then
    log "görüntü parça $i ($p-$q) zaten var, atlanıyor"
  else
    log "görüntü parça $i: kare $p-$q"
    npx remotion render "$B" Bolum "$f" --props="{\"yol\":\"$YOL\",\"mod\":\"gorsel\"}" --frames=$p-$q \
      --codec=prores --prores-profile=standard "${RFLAGS[@]}" >>"$LOG" 2>&1
  fi
  echo "file '$(basename "$f")'" >> "$IS_D/gorsel.txt"
  p=$(( q+1 )); i=$(( i+1 ))
done
log "görüntü birleştirme (concat, -c copy; ProRes intra → kare-kesin)"
ffmpeg -loglevel error -y -f concat -safe 0 -i "$IS_D/gorsel.txt" -c copy "$IS_D/gorsel.mov"
fi
NG=$(kare_say "$IS_D/gorsel.mov")
[ "$NG" = "$N" ] || { log "HATA: görüntü $NG kare, beklenen $N"; exit 1; }

# ---- 3) yazı katmanları (şeffaf ProRes 4444) ----
for d in $DILLER; do
  log "yazı katmanı $d"
  npx remotion render "$B" Bolum "$IS_D/yazi_$d.mov" --props="{\"yol\":\"$YOL\",\"mod\":\"yazi\",\"dil\":\"$d\"}" --frames=$BAS-$BIT \
    --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png "${RFLAGS[@]}" >>"$LOG" 2>&1
  NY=$(kare_say "$IS_D/yazi_$d.mov")
  [ "$NY" = "$N" ] || { log "HATA: yazı $d $NY kare, beklenen $N"; exit 1; }
  if [ $YPNG = 1 ]; then mkdir -p "$IS_D/yazi_${d}_png"; ffmpeg -loglevel error -y -i "$IS_D/yazi_$d.mov" -start_number $BAS "$IS_D/yazi_${d}_png/%05d.png"; fi
done

# ---- 4) birleştirme + ses ----
SS=$(python3 -I -c "print($BAS/$FPS)"); DUR=$(python3 -I -c "print($N/$FPS)")
for d in $DILLER; do
  o="$OUT/evliya-$d.mp4"
  log "son: $o"
  ffmpeg -loglevel error -y -i "$IS_D/gorsel.mov" -i "$IS_D/yazi_$d.mov" -ss "$SS" -t "$DUR" -i "public/evliya/miks/$d.wav" \
    -filter_complex "[0:v][1:v]overlay=format=auto:shortest=1,format=yuv420p[v];[2:a]aresample=48000:resampler=soxr,apad[a]" \
    -map "[v]" -map "[a]" -t "$DUR" -r $FPS \
    -c:v libx264 -preset slow -crf 16 -profile:v high -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
    -c:a aac -b:a 320k -ar 48000 -movflags +faststart "$o"
  NO=$(kare_say "$o")
  L=$(ffmpeg -hide_banner -i "$o" -vn -af ebur128=peak=true -f null - 2>&1 | awk '/Integrated loudness/{f=1} f&&/I:/{i=$2} f&&/Peak:/{pk=$2} END{print i, pk}')
  log "  $d: $NO kare ($N bekleniyor) · loudness I/TP: $L (hedef −14 ±0.3 / ≤ −1.5; kısa aralıkta I anlamlı değildir)"
done

[ $TUT = 1 ] || rm -rf "$IS_D"/gorsel_*.mov "$IS_D/bundle"
log "bitti (toplam $(( $(date +%s)-t0 )) sn)"
