#!/usr/bin/env node
// Kontrol kareleri listesi (K3; CLAUDE.md bolum.json kuralı 3). Kullanım:
//   node tools/kontrol_kareleri.mjs bolumler/<slug>/bolum.json [cikti.json] [--komut]
// Plan başına ilk / kontrol (plan.kontrol_kare — otomatik seçim YOK) / son kare: plan içi + bölüm mutlak kare + saniye.
// --komut: her kare için `npx remotion still Bolum ...` satırı yazar (guvenli bindirmeli). kontrol_kare yoksa çıkış kodu 1.
import fs from "node:fs";
import path from "node:path";

const arg = process.argv.slice(2);
const KOMUT = arg.includes("--komut");
const [dosya, cikti] = arg.filter((a) => !a.startsWith("--"));
if (!dosya) { console.error("kullanım: node tools/kontrol_kareleri.mjs <bolum.json> [cikti.json] [--komut]"); process.exit(2); }
const B = JSON.parse(fs.readFileSync(dosya, "utf8"));
const fps = B.fps ?? 60;
// Bolum bileşeni yolu bolumler/ altından göreli bekler
const yol = path.relative(path.resolve("bolumler"), path.resolve(dosya)).split(path.sep).join("/");

let toplam = 0, eksik = 0;
const planlar = [];
for (const p of B.planlar ?? []) {
  const sure = p.sure_kare;
  const k = p.kontrol_kare;
  if (!Number.isInteger(k) || k < 0 || k >= sure) { eksik++; console.error(`HATA ${p.id}: kontrol_kare ${k ?? "yok"} (plan içinde olmalı [0, ${sure}))`); }
  const ic = { ilk: 0, kontrol: Number.isInteger(k) ? k : null, son: sure - 1 };
  const mutlak = Object.fromEntries(Object.entries(ic).map(([a, v]) => [a, v === null ? null : toplam + v]));
  planlar.push({ id: p.id, sablon: p.sablon, bas: toplam, sure, ic, mutlak, sn: Object.fromEntries(Object.entries(mutlak).map(([a, v]) => [a, v === null ? null : +(v / fps).toFixed(3)])) });
  toplam += sure;
}
const out = { yol, fps, toplamKare: toplam, planlar };
if (cikti) fs.writeFileSync(cikti, JSON.stringify(out, null, 2));
else if (!KOMUT) console.log(JSON.stringify(out, null, 2));
if (KOMUT) for (const p of planlar) for (const [a, v] of Object.entries(p.mutlak)) if (v !== null)
  console.log(`npx remotion still Bolum kareler/${p.id}-${a}.png --frame=${v} --props='${JSON.stringify({ yol, guvenli: true })}'`);
process.exit(eksik ? 1 : 0);
