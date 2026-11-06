// storyboard.json sahne metinlerini ElevenLabs ile seslendirir; mp3 + kelime zamanlaması (json) yazar.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const [dir, outDir, voice = "jZQNewKOZcubZDDwBxdL"] = process.argv.slice(2);
const sb = JSON.parse(readFileSync(`${dir}/storyboard.json`, "utf8"));
const key = process.env.elevenlabs_api_key;
const all = [];
for (const s of sb.sahneler) {
  const mp3 = `${outDir}/${s.id}.mp3`, js = `${outDir}/${s.id}.json`;
  if (!existsSync(js)) {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`, {
      method: "POST", headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ text: s.vo, model_id: "eleven_multilingual_v2", language_code: "tr", voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true } }),
    });
    const d = await r.json();
    if (!r.ok) { console.error(s.id, r.status, JSON.stringify(d).slice(0, 300)); process.exit(1); }
    writeFileSync(mp3, Buffer.from(d.audio_base64, "base64"));
    const a = d.alignment; const words = []; let w = null;
    a.characters.forEach((c, i) => {
      if (/\s/.test(c)) { if (w) { words.push(w); w = null; } return; }
      if (!w) w = { t: c, s: a.character_start_times_seconds[i], e: a.character_end_times_seconds[i] };
      else { w.t += c; w.e = a.character_end_times_seconds[i]; }
    });
    if (w) words.push(w);
    writeFileSync(js, JSON.stringify({ id: s.id, text: s.vo, dur: a.character_end_times_seconds.at(-1), words }));
  }
  const j = JSON.parse(readFileSync(js, "utf8"));
  all.push(j); console.log(s.id, j.dur.toFixed(2) + "s", j.text.length + " kr");
}
console.log("toplam:", all.reduce((a, b) => a + b.dur, 0).toFixed(1), "sn");
