#!/usr/bin/env bash
# Blanc Kardeşler — tam render (TR/EN). Blanc'ta yazı görüntüye gömülü (mod=tam, yazı katmanı yok):
# her dil için tek görüntü+yazı render'ı (sessiz H.264), ses ayrı WAV (miks json'dan Bolum), birleştirme + loudnorm (iki geçiş).
# Kaynak: evliya_render.sh (yollar, bundle, --gl=angle), v4.1 kayıtları (katki-raporu: TR bolum.json+miks.json, EN bolum-en.json+miks-en.json).
# Kullanım: tools/blanc_render.sh [tr en]   (varsayılan: tr en). Birleştirme: tools/blanc_mux.sh (TPV ortam değişkeni: TR −2.0, EN −1.7 kullanıldı).
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

  log "$d birleştirme + loudnorm (tools/blanc_mux.sh; TPV varsayılan −2.0)"
  tools/blanc_mux.sh "$d" >>"$LOG" 2>&1
done

rm -rf "$IS_D/bundle"
log "bitti (toplam $(( $(date +%s)-t0 )) sn)"
