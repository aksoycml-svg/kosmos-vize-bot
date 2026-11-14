#!/usr/bin/env bash
# Blanc Kardeşler — tam render (TR/EN). Blanc'ta yazı görüntüye gömülü (mod=tam, yazı katmanı yok):
# her dil için tek görüntü+yazı render'ı (sessiz H.264), ses ayrı WAV (miks json'dan Bolum), birleştirme + loudnorm (iki geçiş).
# Kaynak: evliya_render.sh (yollar, bundle, --gl=angle), v4.1 kayıtları (katki-raporu: TR bolum.json+miks.json, EN bolum-en.json+miks-en.json).
# Kullanım: tools/blanc_render.sh [tr en]   (varsayılan: tr en)
set -euo pipefail
cd "$(dirname "$0")/.."
BR="${REMOTION_BROWSER:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}"
OUT=out/blanc; IS_D="$OUT/_is"; mkdir -p "$IS_D"
LOG="$OUT/render.log"; touch "$LOG"
DILLER="${*:-tr en}"
t0=$(date +%s)
log() { echo "[$(date +%H:%M:%S) +$(( $(date +%s)-t0 ))s] $*" | tee -a "$LOG"; }
RFLAGS=(--gl=angle --browser-executable="$BR" --concurrency=4 --log=error)

log "doğrulayıcı"
node tools/bolum_dogrula.mjs bolumler/blanc-kardesler/bolum.json | tail -1 | tee -a "$LOG"
node tools/bolum_dogrula.mjs bolumler/blanc-kardesler/bolum-en.json | tail -1 | tee -a "$LOG"

log "bundle"
npx remotion bundle src/index.ts --out-dir="$IS_D/bundle" --log=error >>"$LOG" 2>&1
B="$IS_D/bundle"

for d in $DILLER; do
  case $d in
    tr) YOL="blanc-kardesler/bolum.json"; MIKS="blanc-kardesler/miks.json"; BJ="bolumler/blanc-kardesler/bolum.json";;
    en) YOL="blanc-kardesler/bolum-en.json"; MIKS="blanc-kardesler/miks-en.json"; BJ="bolumler/blanc-kardesler/bolum-en.json";;
    *) echo "bilinmeyen dil: $d" >&2; exit 2;;
  esac
  N=$(python3 -I -c "import json;print(sum(p['sure_kare'] for p in json.load(open('$BJ'))['planlar']))")
  PROPS="{\"yol\":\"$YOL\",\"miks\":\"$MIKS\",\"guvenli\":false}"
  V="$IS_D/video-$d.mp4"; W="$IS_D/ses-$d.wav"; O="$OUT/blanc-$d.mp4"

  NV=$( [ -s "$V" ] && ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nk=1:nw=1 "$V" | tr -dc 0-9 || true)
  if [ "$NV" = "$N" ]; then log "$d görüntü zaten tam ($N kare), atlanıyor"; else
  log "$d görüntü+yazı (sessiz, $N kare)"
  npx remotion render "$B" Bolum "$V" --props="$PROPS" --frames=0-$((N-1)) --codec=h264 --crf=16 --muted "${RFLAGS[@]}" >>"$LOG" 2>&1
  NV=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nk=1:nw=1 "$V" | tr -dc 0-9)
  [ "$NV" = "$N" ] || { log "HATA: $d görüntü $NV kare, beklenen $N"; exit 1; }
  fi

  if [ -s "$W" ] && python3 -I -c "import sys,wave;w=wave.open(sys.argv[1]);sys.exit(0 if abs(w.getnframes()/w.getframerate()-$N/60)<0.1 else 1)" "$W" 2>/dev/null; then log "$d ses zaten tam, atlanıyor"; else
  log "$d ses (miks, WAV)"
  npx remotion render "$B" Bolum "$W" --props="$PROPS" --frames=0-$((N-1)) --codec=wav "${RFLAGS[@]}" >>"$LOG" 2>&1
  fi

  log "$d loudnorm ölçüm (1. geçiş)"
  J=$(ffmpeg -hide_banner -i "$W" -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
  read -r MI MTP MLRA MTH OFF <<<"$(python3 -I -c "import json,sys;j=json.loads(sys.argv[1]);print(j['input_i'],j['input_tp'],j['input_lra'],j['input_thresh'],j['target_offset'])" "$J")"
  log "  ölçüm I=$MI TP=$MTP LRA=$MLRA"
  log "$d birleştirme (görüntü copy + ses AAC 320k 48k, loudnorm 2. geçiş)"
  ffmpeg -loglevel error -y -i "$V" -i "$W" -map 0:v -map 1:a \
    -c:v copy -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1 \
    -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$MI:measured_TP=$MTP:measured_LRA=$MLRA:measured_thresh=$MTH:offset=$OFF:linear=true,aresample=48000:resampler=soxr" \
    -c:a aac -b:a 320k -ar 48000 -t "$(python3 -I -c "print($N/60)")" -movflags +faststart "$O"
  NO=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nk=1:nw=1 "$O" | tr -dc 0-9)
  L=$(ffmpeg -hide_banner -i "$O" -vn -af ebur128=peak=true -f null - 2>&1 | awk '/Integrated loudness/{f=1} f&&/I:/{i=$2} f&&/Peak:/{pk=$2} END{print i, pk}')
  log "  $d: $O · kare $NO (beklenen $N) · I/TP: $L"
done

rm -rf "$IS_D/bundle"
log "bitti (toplam $(( $(date +%s)-t0 )) sn)"
