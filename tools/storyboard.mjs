// storyboard.json içindeki her sahne için kare üretir (3'er paralel).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFile } from "node:child_process";
const dir = process.argv[2];
const only = process.argv[3] ? process.argv[3].split(",") : null;
const sb = JSON.parse(readFileSync(`${dir}/storyboard.json`, "utf8"));
const refs = [`${dir}/karakter/ref-chappe-silüet.png`, `${dir}/karakter/francois-kart.png`, `${dir}/karakter/louis-kart.png`, `${dir}/karakter/acilis-ikizler.png`];
const run = (s) => new Promise((res) => {
  const pf = `${dir}/storyboard/${s.id}.txt`, out = `${dir}/storyboard/${s.id}.png`;
  if (!only && existsSync(out)) return res(`${s.id} zaten var`);
  writeFileSync(pf, `${sb.stil}\n\nSCENE: ${s.prompt}`);
  execFile("node", ["tools/gorsel.mjs", pf, out, ...refs, "--ar", "9:16"], { timeout: 240000 }, (e, so, se) => res(`${s.id}: ${(so + se).trim().slice(0, 200)}`));
});
const list = sb.sahneler.filter((s) => !only || only.includes(s.id));
for (let i = 0; i < list.length; i += 3) console.log((await Promise.all(list.slice(i, i + 3).map(run))).join("\n"));
