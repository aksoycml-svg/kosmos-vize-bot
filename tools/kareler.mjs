#!/usr/bin/env node
// Toplu still render: tek paket (bundle) + tek tarayıcı. `npx remotion still` her kare için yeniden paketler → yavaş.
// Kullanım: node tools/kareler.mjs <liste.json>
//   liste.json: [{ "props": {...Bolum props...} | "propsDosya": "x.json", "kare": 24, "cikti": "a.png", "olcek": 1, "id": "Bolum" }, ...]
//   props.elOlcum: true → <cikti>.el.json (el/kol ölçümü). Ortam: KARE_GL (varsayılan "angle"), KARE_BUNDLE (hazır paket klasörü; verilirse yeniden paketlenmez).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";

const kok = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const liste = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const gl = process.env.KARE_GL ?? "angle";
const chrome = [process.env.CHROME, ...(fs.existsSync("/opt/pw-browsers") ? fs.readdirSync("/opt/pw-browsers") : []).filter((d) => d.startsWith("chromium_headless_shell")).map((d) => `/opt/pw-browsers/${d}/chrome-headless-shell-linux64/chrome-headless-shell`)].find((c) => c && fs.existsSync(c));
const serveUrl = process.env.KARE_BUNDLE ?? (await bundle({ entryPoint: path.join(kok, "src/index.ts"), rspack: true, publicDir: path.join(kok, "public") }));
const tarayici = await openBrowser("chrome", { browserExecutable: chrome ?? null, chromiumOptions: { gl } });
const secim = new Map();
for (const k of liste) {
  const props = k.props ?? JSON.parse(fs.readFileSync(k.propsDosya, "utf8"));
  const anahtar = `${k.id ?? "Bolum"}|${JSON.stringify(props).length}|${k.propsDosya ?? ""}|${JSON.stringify(props).slice(0, 200)}`;
  if (!secim.has(anahtar)) secim.set(anahtar, await selectComposition({ serveUrl, id: k.id ?? "Bolum", inputProps: props, puppeteerInstance: tarayici, chromiumOptions: { gl } }));
  fs.mkdirSync(path.dirname(k.cikti), { recursive: true });
  const t0 = Date.now(), olc = [];
  // inputProps.elOlcum = true → şablonlar el/kol ölçümünü (bilek°, dirsek°, E px) tarayıcı günlüğüne yazar; <cikti>.el.json'a toplanır
  await renderStill({ composition: secim.get(anahtar), serveUrl, frame: k.kare, output: k.cikti, inputProps: props, scale: k.olcek ?? 1, puppeteerInstance: tarayici, chromiumOptions: { gl }, overwrite: true,
    onBrowserLog: (l) => { const t = l.text ?? ""; const i = t.indexOf("ELOLCUM "); if (i >= 0) { try { olc.push(JSON.parse(t.slice(i + 8))); } catch { /* yok say */ } } } });
  if (props.elOlcum) { const tek = [...new Map(olc.map((o) => [o.ad, o])).values()]; fs.writeFileSync(k.cikti.replace(/\.png$/, ".el.json"), JSON.stringify(tek, null, 1)); }
  console.log(`${k.cikti} (kare ${k.kare}, ${((Date.now() - t0) / 1000).toFixed(1)} sn)`);
}
await tarayici.close({ silent: true });
