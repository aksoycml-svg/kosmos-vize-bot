// Kanal marka görselleri (YouTube): logo, dikey logo, banner, dikey kapak — TR + EN
// Çalıştır: node marka/youtube/uret.mjs   → marka/youtube/{tr,en}/*.png
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KOK = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const F = `file://${KOK}/public/fonts`;

const C = { paper: "#e9dfc9", paperDark: "#d6c7a6", ink: "#1c1915", inkSoft: "#4a4237", red: "#b3261e", gold: "#b8862b" };

const DIL = {
  tr: {
    ust: "SESSİZ", alt: "DOSYA", tam: "Sessiz Dosya",
    slogan: "Tarihin sessiz kalan dosyaları.",
    halka: "SESSİZ DOSYA · YAŞANMIŞ HİKÂYELER · ARŞİV · ",
    etiket: ["YAŞANMIŞ", "AZ BİLİNEN", "KAYNAKLI"],
    no: "DOSYA NO. 001", damga: "ARŞİV", sekme: "DOSYA",
    handle: "@dikeyfab",
  },
  en: {
    on: "THE", ust: "SILENT", alt: "DOSSIER", tam: "The Silent Dossier",
    slogan: "The files history kept quiet.",
    halka: "THE SILENT DOSSIER · TRUE STORIES · ARCHIVE · ",
    etiket: ["TRUE", "LITTLE-KNOWN", "SOURCED"],
    no: "FILE NO. 001", damga: "ARCHIVE", sekme: "DOSSIER",
    handle: "@dikeyfab",
  },
};

const fontCss = `
@font-face{font-family:PF;src:url(${F}/playfair-display-latin-900-normal.woff2);unicode-range:U+0000-00FF,U+0131,U+2000-206F}
@font-face{font-family:PF;src:url(${F}/playfair-display-latin-ext-900-normal.woff2);unicode-range:U+0100-0130,U+0132-02FF}
@font-face{font-family:IN;font-weight:500;src:url(${F}/inter-latin-500-normal.woff2);unicode-range:U+0000-00FF,U+0131,U+2000-206F}
@font-face{font-family:IN;font-weight:500;src:url(${F}/inter-latin-ext-500-normal.woff2);unicode-range:U+0100-0130,U+0132-02FF}
@font-face{font-family:IN;font-weight:800;src:url(${F}/inter-latin-800-normal.woff2);unicode-range:U+0000-00FF,U+0131,U+2000-206F}
@font-face{font-family:IN;font-weight:800;src:url(${F}/inter-latin-ext-800-normal.woff2);unicode-range:U+0100-0130,U+0132-02FF}
@font-face{font-family:MO;src:url(${F}/ibm-plex-mono-latin-500-normal.woff2);unicode-range:U+0000-00FF,U+0131,U+2000-206F}
@font-face{font-family:MO;src:url(${F}/ibm-plex-mono-latin-ext-500-normal.woff2);unicode-range:U+0100-0130,U+0132-02FF}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:transparent}
`;

// Kâğıt dokusu (sabit seed) — SVG filtre
const kagit = (w, h, seed = 7) => `
<svg width="${w}" height="${h}" style="position:absolute;inset:0" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <filter id="lif" x="0" y="0" width="100%" height="100%">
   <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}"/>
   <feColorMatrix values="0 0 0 0 0.11  0 0 0 0 0.09  0 0 0 0 0.07  0 0 0 .10 0"/>
  </filter>
  <filter id="leke" x="0" y="0" width="100%" height="100%">
   <feTurbulence type="fractalNoise" baseFrequency="0.004" numOctaves="3" seed="${seed + 3}"/>
   <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.33  0 0 0 0 0.16  0 0 0 .55 -.18"/>
  </filter>
  <radialGradient id="vin" cx="50%" cy="50%" r="75%">
   <stop offset="55%" stop-color="#5a4426" stop-opacity="0"/>
   <stop offset="100%" stop-color="#5a4426" stop-opacity=".32"/>
  </radialGradient>
 </defs>
 <rect width="100%" height="100%" fill="${C.paper}"/>
 <rect width="100%" height="100%" filter="url(#leke)"/>
 <rect width="100%" height="100%" filter="url(#lif)"/>
 <rect width="100%" height="100%" fill="url(#vin)"/>
</svg>`;

// Mühür (balmumu/ıslak mürekkep damgası) — merkez 0,0, yarıçap r
function muhur(d, r, { renk = C.red, ic = C.paper, seed = 3 } = {}) {
  // pürüzlü kenar: sabit seed'li sinüs toplamı
  const n = 180, pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + 0.018 * Math.sin(a * 7 + seed) + 0.012 * Math.sin(a * 13 + seed * 2) + 0.008 * Math.sin(a * 29 + seed * 5);
    pts.push(`${(Math.cos(a) * r * k).toFixed(1)},${(Math.sin(a) * r * k).toFixed(1)}`);
  }
  const rh = r * 0.80; // halka yazısı yarıçapı
  const yazi = d.halka;
  const id = `h${seed}${Math.round(r)}`;
  return `
  <defs>
   <path id="${id}" d="M ${-rh},0 a ${rh},${rh} 0 1,1 ${2 * rh},0 a ${rh},${rh} 0 1,1 ${-2 * rh},0"/>
   <filter id="pur${id}"><feTurbulence type="fractalNoise" baseFrequency="${(2.2 / r * 30).toFixed(3)}" numOctaves="2" seed="${seed}"/>
    <feDisplacementMap in="SourceGraphic" scale="${(r * 0.012).toFixed(1)}"/></filter>
   <filter id="ask${id}"><feTurbulence type="fractalNoise" baseFrequency="${(1.4 / r * 30).toFixed(3)}" numOctaves="2" seed="${seed + 9}"/>
    <feColorMatrix values="0 0 0 0 .91  0 0 0 0 .87  0 0 0 0 .79  0 0 0 -4 1.75"/>
    <feComposite in2="SourceGraphic" operator="in"/></filter>
  </defs>
  <g filter="url(#pur${id})">
   <polygon points="${pts.join(" ")}" fill="${renk}"/>
   <circle r="${r * 0.93}" fill="none" stroke="${ic}" stroke-width="${r * 0.018}"/>
   <circle r="${r * 0.67}" fill="none" stroke="${ic}" stroke-width="${r * 0.018}"/>
   <circle r="${r * 0.63}" fill="none" stroke="${ic}" stroke-width="${r * 0.006}"/>
   <text font-family="MO" font-size="${r * 0.105}" fill="${ic}" letter-spacing="${r * 0.012}">
    <textPath href="#${id}" startOffset="0" textLength="${(2 * Math.PI * rh * 0.985).toFixed(1)}" lengthAdjust="spacing">${yazi}</textPath>
   </text>
   <text y="${r * 0.20}" text-anchor="middle" font-family="PF" font-size="${r * 0.62}" fill="${ic}" letter-spacing="${-r * 0.02}">SD</text>
   <line x1="${-r * 0.36}" x2="${r * 0.36}" y1="${r * 0.33}" y2="${r * 0.33}" stroke="${ic}" stroke-width="${r * 0.014}"/>
   <text y="${r * 0.47}" text-anchor="middle" font-family="MO" font-size="${r * 0.085}" fill="${ic}" letter-spacing="${r * 0.03}">№ 001</text>
   <path d="M ${-r * 0.5},${-r * 0.42} l ${r * 0.08},${-r * 0.02} M ${r * 0.42},${-r * 0.44} l ${r * 0.08},${r * 0.02}" stroke="${ic}" stroke-width="${r * 0.012}"/>
  </g>
  <g filter="url(#ask${id})"><polygon points="${pts.join(" ")}" fill="${renk}"/></g>`;
}

// Eğik kırmızı lastik damga (kutulu kelime)
const damga = (metin, x, y, boy, aci = -8) => `
<div style="position:absolute;left:${x}px;top:${y}px;transform:rotate(${aci}deg);transform-origin:left top;
 border:${boy * 0.09}px solid ${C.red};padding:${boy * 0.08}px ${boy * 0.3}px;color:${C.red};opacity:.78;
 font:${boy}px/1 MO;letter-spacing:${boy * 0.18}px;border-radius:${boy * 0.08}px;mix-blend-mode:multiply">${metin}</div>`;

// Tarama (hatching) şeridi — gravür imzası
const tarama = (x, y, w, h, aralik = 7, renk = C.inkSoft, op = 0.35) => {
  let s = "";
  for (let i = -h; i < w; i += aralik) s += `<line x1="${i}" y1="${h}" x2="${i + h}" y2="0"/>`;
  return `<svg style="position:absolute;left:${x}px;top:${y}px" width="${w}" height="${h}"><g stroke="${renk}" stroke-width="1.6" opacity="${op}">${s}</g></svg>`;
};

const sayfa = (w, h, ic, seffaf = false) => `<!doctype html><html><head><meta charset="utf-8"><style>${fontCss}
body{width:${w}px;height:${h}px;position:relative;overflow:hidden}</style></head>
<body>${seffaf ? "" : kagit(w, h)}${ic}</body></html>`;

// ---- 1) Ana logo (profil resmi) 800x800 — YouTube daire kırpar
const logo = (d) => sayfa(800, 800, `
<svg width="800" height="800" style="position:absolute;inset:0"><g transform="translate(400 400) rotate(-6)">${muhur(d, 330)}</g></svg>`);

// ---- 2) Dikey dizilimli logo 1200x1500 (kâğıtlı + şeffaf)
const dikeyLogo = (d, seffaf) => sayfa(1200, 1500, `
<svg width="1200" height="620" style="position:absolute;left:0;top:90"><g transform="translate(600 300) rotate(-6)">${muhur(d, 270, { seed: 5 })}</g></svg>
<div style="position:absolute;left:0;right:0;top:${d.on ? 690 : 730}px;text-align:center;color:${C.ink}">
 ${d.on ? `<div style="font:500 52px/1 MO;letter-spacing:22px;color:${C.inkSoft};margin-bottom:18px;padding-left:22px">${d.on}</div>` : ""}
 <div style="font:180px/0.95 PF;letter-spacing:4px">${d.ust}</div>
 <div style="font:180px/0.95 PF;letter-spacing:4px">${d.alt}</div>
 <div style="width:520px;height:5px;background:${C.red};margin:44px auto 34px"></div>
 <div style="font:500 44px/1.2 IN;color:${C.inkSoft}">${d.slogan}</div>
</div>`, seffaf);

// ---- 3) Banner 2560x1440 — güvenli alan 1546x423 merkez (x 507–2053, y 508–931)
const banner = (d) => sayfa(2560, 1440, `
<div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 63px,rgba(74,66,55,.10) 63px 65px)"></div>
<div style="position:absolute;left:0;top:0;bottom:0;width:250px;border-right:3px solid rgba(179,38,30,.35)"></div>
<div style="position:absolute;left:290px;top:120px;font:500 40px/1 MO;letter-spacing:8px;color:${C.inkSoft}">${d.no} · ${d.etiket.join(" · ")}</div>
${tarama(0, 1240, 2560, 200, 9, C.inkSoft, 0.22)}
${damga(d.damga, 2060, 200, 64, 8)}
<svg width="460" height="460" style="position:absolute;left:520px;top:490"><g transform="translate(230 230) rotate(-6)">${muhur(d, 205, { seed: 4 })}</g></svg>
<div style="position:absolute;left:1030px;top:${d.on ? 520 : 560}px;color:${C.ink}">
 ${d.on ? `<div style="font:500 44px/1 MO;letter-spacing:18px;color:${C.inkSoft};margin-bottom:6px">${d.on}</div>` : ""}
 <div style="font:112px/1 PF;letter-spacing:1px;white-space:nowrap">${d.ust} ${d.alt}</div>
 <div style="width:420px;height:6px;background:${C.red};margin:26px 0 22px"></div>
 <div style="font:500 50px/1.1 IN;color:${C.inkSoft};white-space:nowrap">${d.slogan}</div>
</div>`);

// ---- 4) Dikey kapak 1080x1920 (Shorts / Reels kapağı)
const kapak = (d) => sayfa(1080, 1920, `
<div style="position:absolute;left:0;right:0;top:0;height:300px;background:${C.paperDark};opacity:.55"></div>
<div style="position:absolute;left:80px;top:230px;width:330px;height:90px;background:${C.paperDark};border-radius:18px 18px 0 0;
  font:500 38px/90px MO;letter-spacing:10px;text-align:center;color:${C.inkSoft}">${d.sekme}</div>
<div style="position:absolute;left:0;right:0;top:320px;height:3px;background:rgba(74,66,55,.4)"></div>
<div style="position:absolute;left:80px;top:360px;font:500 34px/1 MO;letter-spacing:6px;color:${C.inkSoft}">${d.no}</div>
${damga(d.damga, 660, 380, 52, 7)}
<svg width="1080" height="760" style="position:absolute;left:0;top:450"><g transform="translate(540 380) rotate(-6)">${muhur(d, 320, { seed: 6 })}</g></svg>
<div style="position:absolute;left:0;right:0;top:${d.on ? 1180 : 1220}px;text-align:center;color:${C.ink}">
 ${d.on ? `<div style="font:500 44px/1 MO;letter-spacing:18px;color:${C.inkSoft};margin-bottom:14px;padding-left:18px">${d.on}</div>` : ""}
 <div style="font:150px/0.95 PF;letter-spacing:3px">${d.ust}</div>
 <div style="font:150px/0.95 PF;letter-spacing:3px">${d.alt}</div>
 <div style="width:380px;height:5px;background:${C.red};margin:38px auto 30px"></div>
 <div style="font:500 42px/1.25 IN;color:${C.inkSoft}">${d.slogan}</div>
 <div style="font:500 30px/1 MO;letter-spacing:7px;color:${C.inkSoft};margin-top:34px">${d.etiket.join(" · ")}</div>
</div>
${tarama(0, 1790, 1080, 130, 8, C.inkSoft, 0.2)}`);

const isler = [
  ["logo-800", 800, 800, logo, false],
  ["logo-dikey", 1200, 1500, (d) => dikeyLogo(d, false), false],
  ["logo-dikey-seffaf", 1200, 1500, (d) => dikeyLogo(d, true), true],
  ["banner-2560x1440", 2560, 1440, banner, false],
  ["kapak-dikey-1080x1920", 1080, 1920, kapak, false],
];

const tarayici = await chromium.launch();
for (const [dil, d] of Object.entries(DIL)) {
  const dir = `${KOK}/marka/youtube/${dil}`;
  mkdirSync(dir, { recursive: true });
  for (const [ad, w, h, fn, seffaf] of isler) {
    const p = await tarayici.newPage({ viewport: { width: w, height: h } });
    const tmp = `${dir}/_gecici.html`; writeFileSync(tmp, fn(d)); await p.goto(`file://${tmp}`, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(150);
    await p.screenshot({ path: `${dir}/${ad}.png`, omitBackground: seffaf });
    await p.close(); rmSync(tmp);
    console.log(dil, ad);
  }
}
await tarayici.close();
