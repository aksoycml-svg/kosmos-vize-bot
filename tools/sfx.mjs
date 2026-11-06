import { writeFileSync, existsSync } from "node:fs";
const list = JSON.parse(process.argv[2]);
for (const [name, text, dur] of list) {
  const out = `public/blanc/sfx/${name}.mp3`; if (existsSync(out)) continue;
  const r = await fetch("https://api.elevenlabs.io/v1/sound-generation", { method: "POST", headers: { "xi-api-key": process.env.elevenlabs_api_key, "Content-Type": "application/json" }, body: JSON.stringify({ text, duration_seconds: dur, prompt_influence: 0.5 }) });
  if (!r.ok) { console.log(name, r.status, (await r.text()).slice(0, 200)); continue; }
  writeFileSync(out, Buffer.from(await r.arrayBuffer())); console.log(name, "ok");
}
