// Ben-my-Chree kapakları (Çiçero yayın kapağı düzeni): 1080x1920, üstte koyu zemin + başlık, tek kırmızı kelime,
// başlık profil ızgarasının 3:4 kırpımı (y 240–1680) içinde. Arka plan yazısız render karesi (P10, kare 3069).
import { createRequire } from "module"; const { chromium } = createRequire(import.meta.url)("playwright");
import fs from "fs"; import path from "path";
const kok = path.resolve(".");
const bg = "file://" + path.join(kok, "bolumler/ben-my-chree/kapak/kaynak-124.png");
const font = "file://" + path.join(kok, "public/fonts/playfair-display-latin-ext-900-normal.woff2");
const font2 = "file://" + path.join(kok, "public/fonts/playfair-display-latin-900-normal.woff2");
const dil = {
  tr: ["UÇAK GEMİSİNİ", "<b>KARADAN</b>", "BATIRDILAR"],
  en: ["THEY SANK", "A CARRIER", "FROM <b>LAND</b>"],
};
const html = (s) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:PF;src:url(${font2}) format("woff2");font-weight:900;unicode-range:U+0000-00FF}
@font-face{font-family:PF;src:url(${font}) format("woff2");font-weight:900}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#1c1626}
.bg{position:absolute;left:0;top:300px;width:1080px;height:1920px;background:url(${bg}) top center/1080px 1920px no-repeat}
.grad{position:absolute;left:0;top:300px;width:1080px;height:260px;background:linear-gradient(#1c1626,rgba(28,22,38,0))}
h1{position:absolute;left:92px;top:262px;margin:0;font:900 96px/1.04 PF;color:#efe4cf;letter-spacing:.5px}
h1 b{color:#c8322b;font-weight:900}
</style></head><body><div class="bg"></div><div class="grad"></div><h1>${s.join("<br>")}</h1></body></html>`;
const b = await chromium.launch({ args: ["--allow-file-access-from-files"] }); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [k, s] of Object.entries(dil)) {
  const hf = path.join(kok, "bolumler/ben-my-chree/kapak/_kapak.html"); fs.writeFileSync(hf, html(s)); await p.goto("file://" + hf, { waitUntil: "load" }); await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => { const e = document.querySelector("h1").getBoundingClientRect(); return [e.top, e.bottom, e.right]; });
  const out = `bolumler/ben-my-chree/yayin/kapak-${k}.jpg`;
  await p.screenshot({ path: out, type: "jpeg", quality: 92 }); console.log(k, "başlık y", r.map(Math.round), "→", out);
}
await b.close();
