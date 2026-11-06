// Gemini görsel üretimi: node tools/gorsel.mjs <prompt.txt> <cikti.png> [ref1.png ref2.png ...] [--ar 9:16] [--model gemini-3-pro-image]
// Anahtar ortam değişkeninden okunur (GEMINI_API_KEY ya da Value); asla yazdırılmaz.
import { readFileSync, writeFileSync } from "node:fs";
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); if (i < 0) return d; const v = args[i + 1]; args.splice(i, 2); return v; };
const ar = opt("--ar", "9:16");
const model = opt("--model", "gemini-3-pro-image");
const size = opt("--size", null);
const [promptFile, out, ...refs] = args;
const key = process.env.GEMINI_API_KEY || process.env.Value;
if (!key) { console.error("Anahtar bulunamadı"); process.exit(1); }
const parts = [{ text: readFileSync(promptFile, "utf8") }];
for (const r of refs) parts.push({ inline_data: { mime_type: r.endsWith(".jpg") ? "image/jpeg" : "image/png", data: readFileSync(r).toString("base64") } });
const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
  method: "POST",
  headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
  body: JSON.stringify({ contents: [{ parts }], generationConfig: { responseModalities: ["IMAGE", "TEXT"], imageConfig: size ? { aspectRatio: ar, imageSize: size } : { aspectRatio: ar } } }),
});
const d = await res.json();
if (!res.ok) { console.error("HTTP", res.status, d.error?.status, (d.error?.message || "").slice(0, 300)); process.exit(1); }
let n = 0;
for (const p of d.candidates?.[0]?.content?.parts || []) {
  const img = p.inline_data || p.inlineData;
  if (img) { writeFileSync(n ? out.replace(/\.png$/, `-${n}.png`) : out, Buffer.from(img.data, "base64")); n++; }
  else if (p.text) console.log("model notu:", p.text.slice(0, 200));
}
console.log(n ? `kaydedildi: ${out} (${n})` : "görsel dönmedi: " + JSON.stringify(d).slice(0, 300));
