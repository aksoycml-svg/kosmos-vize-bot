#!/usr/bin/env bash
# Blanc birleştirme (tek dil): out/blanc/_is/video-<d>.mp4 (görüntü: yuv420p tv aralığı, libx264 crf16 yeniden kodlama) + out/blanc/_is/ses-<d>.wav → out/blanc/blanc-<d>.mp4
# Ses: loudnorm 2 geçiş, lineer (I −14, TP −2.0 hedefi; AAC sonrası TP ≤ −1.5 için pay). AAC 320k 48 kHz. Kullanım: tools/blanc_mux.sh tr|en
set -euo pipefail
cd "$(dirname "$0")/.."
d=$1; V=out/blanc/_is/video-$d.mp4; W=out/blanc/_is/ses-$d.wav; O=out/blanc/blanc-$d.mp4; TPV=${TPV:--2.0}
J=$(ffmpeg -hide_banner -i "$W" -af loudnorm=I=-14:TP=$TPV:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
read -r MI MTP MLRA MTH OFF <<<"$(python3 -I -c "import json,sys;j=json.loads(sys.argv[1]);print(j['input_i'],j['input_tp'],j['input_lra'],j['input_thresh'],j['target_offset'])" "$J")"
echo "ölçüm I=$MI TP=$MTP LRA=$MLRA"
ffmpeg -loglevel error -y -i "$V" -i "$W" -map 0:v -map 1:a \
  -c:v libx264 -preset medium -crf 16 -profile:v high -vf "scale=out_range=tv:out_color_matrix=bt709,format=yuv420p" \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
  -af "loudnorm=I=-14:TP=$TPV:LRA=11:measured_I=$MI:measured_TP=$MTP:measured_LRA=$MLRA:measured_thresh=$MTH:offset=$OFF:linear=true,aresample=48000:resampler=soxr" \
  -c:a aac -b:a 320k -ar 48000 -movflags +faststart "$O"
echo "çıktı: $O · kare $(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nk=1:nw=1 "$O" | tr -dc 0-9) · I/TP: $(ffmpeg -hide_banner -i "$O" -vn -af ebur128=peak=true -f null - 2>&1 | awk '/Integrated loudness/{f=1} f&&/I:/{i=$2} f&&/Peak:/{pk=$2} END{print i, pk}')"
