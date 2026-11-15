// ===== Çiçero / 1940'lar prop seti (tasarim.md §3, §6) — ekran 2B çizimleri (şablon konum + ölçeği verir) =====
// Banknot = İMZA nesnesi: sahnenin en parlak kâğıdı (ışık #f6f1e4 L*95 / gölge #d4cfdc L*84). Tek yüz siyah mürekkep: çift çerçeve,
// 4 köşe dönel rozet, sol yarıda BOŞ oval, orta-sağda 3 dalgalı satır (harf/rakam YOK), sağ altta tek imza eğrisi. Arka yüz boş.
// Çarpı = bölümdeki TEK kırmızı (#b3261e), iki fırça vuruşu, çizim ilerlemesi (0→1 birinci vuruş, 1→2 ikinci).
// Hepsi yerel orijin = nesne merkezi; `W` ekran px (uzun kenar). Kontur kalınlıkları EKRAN px (360 px sayfada okunur: ≥ 6 px → 2 px).
import React from "react";
import { P, poly, rnd } from "../../../doku/sabitler";
import { CIC } from "../../paletler/cicero";

const karis = (a: string, b: string, t: number) => {
  const x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16);
  return "#" + [16, 8, 0].map((s) => Math.round(((x >> s) & 255) * (1 - t) + ((y >> s) & 255) * t).toString(16).padStart(2, "0")).join("");
};

// ---- BANKNOT ----
// W: uzun kenar ekran px (gerçek 211 × 134 mm, oran 1.57) · yuz "on" | "arka" · golge 0 (ışıkta) … 1 (gölgede) · kivrik: sağ-alt köşe kıvrımı 0..1
// sonuk: P10 p0–24 gece (#b8bccc) · golgeKay: düşen gölge [dx, dy] (ekran px; 0 → yok)
// sizinti 0..1: arka yüzden ön yüz baskısının ince kâğıttan tersten (aynalı) belli belirsiz görünmesi — "para" okutur, mektup değil.
//   0.12 ≈ masada/elde; ışığa tutulunca (P10) 0.3–0.4. Kâğıt L* değişmez (yalnız ince gri çizgiler).
export const Banknot: React.FC<{ W: number; yuz?: "on" | "arka"; golge?: number; kivrik?: number; sonuk?: number; golgeKay?: P; golgeRenk?: string; seed?: number; sizinti?: number }> = ({ W, yuz = "on", golge = 0, kivrik = 0.25, sonuk = 0, golgeKay, golgeRenk = "#2a2230", seed = 401, sizinti = 0 }) => {
  const H = W / 1.575, w = W / 2, h = H / 2;
  const kag = karis(karis(CIC.banknot, CIC.banknotGolge, golge), "#b8bccc", sonuk);
  const mur = karis(CIC.banknotMurekkep, "#3a3a48", sonuk * 0.5);
  const k = Math.max(0.6, W / 300); // çizgi ölçeği (W 300 px → 1)
  const kv = kivrik * H * 0.22;
  // kâğıt dış yolu: köşeler hafif yumuşak, sağ-alt köşe kıvrık (katı levha değil)
  const dis = `M ${-w} ${-h} L ${w} ${-h} L ${w} ${h - kv} Q ${w - kv * 0.2} ${h - kv * 0.2} ${w - kv} ${h} L ${-w} ${h} Z`;
  const rozet = (cx: number, cy: number, r: number, i: number) => (
    <g key={`r${i}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={mur} strokeWidth={2.6 * k} />
      <circle cx={cx} cy={cy} r={r * 0.62} fill="none" stroke={mur} strokeWidth={2.0 * k} />
      {Array.from({ length: 8 }).map((_, j) => { const a = (j / 8) * Math.PI * 2 + rnd(seed, `ra${i}`) * 0.2; return <ellipse key={j} cx={cx + Math.cos(a) * r * 0.42} cy={cy + Math.sin(a) * r * 0.42} rx={r * 0.34} ry={r * 0.14} transform={`rotate(${(a * 180) / Math.PI} ${cx + Math.cos(a) * r * 0.42} ${cy + Math.sin(a) * r * 0.42})`} fill="none" stroke={mur} strokeWidth={1.6 * k} />; })}
    </g>
  );
  const dalga = (y: number, x0: number, x1: number, i: number) => {
    const pts: P[] = []; const n = 24, A = H * 0.022, f = 5 + rnd(seed, `df${i}`) * 2;
    for (let s = 0; s <= n; s++) { const x = x0 + ((x1 - x0) * s) / n; pts.push([x, y + Math.sin((s / n) * Math.PI * f + i) * A]); }
    return <polyline key={`d${i}`} points={poly(pts)} fill="none" stroke={mur} strokeWidth={2.6 * k} strokeLinecap="round" />;
  };
  const r0 = H * 0.13, m = H * 0.07;
  return (
    <g>
      {golgeKay && <path d={dis} transform={`translate(${golgeKay[0]} ${golgeKay[1]})`} fill={golgeRenk} opacity={0.55} />}
      <path d={dis} fill={kag} stroke={karis(kag, "#5a5660", 0.45)} strokeWidth={1.6 * k} strokeLinejoin="round" />
      {kv > 0.5 && <path d={`M ${w} ${h - kv} Q ${w - kv * 0.55} ${h - kv * 0.55} ${w - kv} ${h} Z`} fill={karis(kag, "#8a8698", 0.35)} />}
      {(yuz === "on" || sizinti > 0) && <g transform={yuz === "on" ? undefined : "scale(-1 1)"} opacity={yuz === "on" ? 1 : Math.min(0.45, sizinti)} style={yuz === "on" ? undefined : { filter: "blur(0.6px)" }}>
        <rect x={-w + m} y={-h + m} width={W - 2 * m} height={H - 2 * m} fill="none" stroke={mur} strokeWidth={4.2 * k} />
        <rect x={-w + m * 1.7} y={-h + m * 1.7} width={W - 3.4 * m} height={H - 3.4 * m} fill="none" stroke={mur} strokeWidth={2.2 * k} />
        {[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy], i) => rozet(sx * (w - m - r0 * 1.15), sy * (h - m - r0 * 1.15), r0, i))}
        {/* sol yarıda BOŞ oval (portre yok) */}
        <ellipse cx={-w * 0.42} cy={0} rx={H * 0.2} ry={H * 0.26} fill="none" stroke={mur} strokeWidth={3 * k} />
        <ellipse cx={-w * 0.42} cy={0} rx={H * 0.165} ry={H * 0.225} fill="none" stroke={mur} strokeWidth={1.6 * k} />
        {[-0.2, 0.02, 0.24].map((t, i) => dalga(H * t - H * 0.04, -w * 0.08, w * 0.6, i))}
        {/* imza eğrisi */}
        <path d={`M ${w * 0.18} ${h * 0.62} q ${W * 0.05} ${-H * 0.12} ${W * 0.08} ${-H * 0.02} t ${W * 0.08} ${-H * 0.01} q ${W * 0.04} ${-H * 0.06} ${W * 0.09} ${H * 0.02}`} fill="none" stroke={mur} strokeWidth={2.6 * k} strokeLinecap="round" />
      </g>}
    </g>
  );
};

// ---- ÇARPI (tek kırmızı): iki fırça vuruşu. ilerleme 0..2 (0–1 birinci vuruş sol-üst → sağ-alt, 1–2 ikinci sağ-üst → sol-alt). L: kol boyu px ----
export const Carpi: React.FC<{ L: number; ilerleme: number; seed?: number }> = ({ L, ilerleme, seed = 409 }) => {
  const vurus = (a: P, b: P, t: number, i: number) => {
    if (t <= 0) return null;
    const n = 18, pts: P[] = [], sol: P[] = [], sag: P[] = [];
    const dx = b[0] - a[0], dy = b[1] - a[1], Ln = Math.hypot(dx, dy), nx = -dy / Ln, ny = dx / Ln;
    for (let s = 0; s <= n; s++) {
      const u = (s / n) * t, wob = (rnd(seed, `w${i}${s}`) - 0.5) * L * 0.012;
      const p: P = [a[0] + dx * u + nx * wob, a[1] + dy * u + ny * wob];
      // fırça: başta basınçla geniş, sonda incelir (kuru fırça ucu)
      const g = L * 0.105 * (0.55 + 0.45 * Math.sin(Math.min(1, u * 1.6) * Math.PI * 0.5)) * (1 - 0.55 * Math.max(0, u - 0.7) / 0.3);
      pts.push(p); sol.push([p[0] + nx * g / 2, p[1] + ny * g / 2]); sag.push([p[0] - nx * g / 2, p[1] - ny * g / 2]);
    }
    return <polygon key={i} points={poly([...sol, ...sag.reverse()])} fill={CIC.carpi} />;
  };
  const r = L / 2;
  return <g>{vurus([-r, -r * 0.92], [r, r * 0.95], Math.min(1, ilerleme), 0)}{vurus([r * 0.9, -r], [-r * 0.95, r * 0.9], Math.max(0, Math.min(1, ilerleme - 1)), 1)}</g>;
};

// ---- ZARF (kraft, kalın, yazısız): W ekran px, acik 0 kapalı … 1 kapak açık (üçgen kapak yukarı yatar) ----
export const Zarf: React.FC<{ W: number; acik?: number; golge?: number; golgeKay?: P }> = ({ W, acik = 0, golge = 0, golgeKay }) => {
  const H = W * 0.66, w = W / 2, h = H / 2;
  const c = karis(CIC.zarf, CIC.zarfGolge, golge), ink = karis(c, "#2a2028", 0.6);
  const kapY = h * 0.15 - acik * H * 0.95; // kapak ucu (kapalı: aşağı, açık: yukarı)
  return (
    <g>
      {golgeKay && <rect x={-w + golgeKay[0]} y={-h + golgeKay[1]} width={W} height={H} rx={W * 0.02} fill="#2a2230" opacity={0.5} />}
      <rect x={-w} y={-h} width={W} height={H} rx={W * 0.02} fill={c} stroke={ink} strokeWidth={4} />
      {/* kabarık içerik: alt kenarda iki yumuşak şişkinlik çizgisi */}
      <path d={`M ${-w * 0.9} ${h * 0.55} Q 0 ${h * 0.75} ${w * 0.9} ${h * 0.55}`} stroke={karis(c, "#2a2028", 0.35)} strokeWidth={3} fill="none" />
      <polygon points={poly([[-w, -h], [w, -h], [0, kapY]])} fill={karis(c, acik > 0.5 ? "#e0c8a8" : "#2a2028", 0.12)} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
};

// ---- BELGE (dikey A4, sarımsı-gri, dalgalı 11–13 satır, harf yok): W ekran px (kısa kenar) ----
export const Belge: React.FC<{ W: number; isik?: number; seed?: number }> = ({ W, isik = 1, seed = 411 }) => {
  const H = W * 1.414, w = W / 2, h = H / 2;
  const c = karis(CIC.belgeGolge, CIC.belgeIsik, isik), ink = karis(c, "#3a3646", 0.55);
  const n = 11 + Math.floor(rnd(seed, "n") * 3);
  return (
    <g>
      <path d={`M ${-w} ${-h} L ${w} ${-h} L ${w} ${h} L ${-w + W * 0.04} ${h} Q ${-w} ${h - W * 0.03} ${-w} ${h - W * 0.06} Z`} fill={c} stroke={ink} strokeWidth={Math.max(1.5, W * 0.025)} strokeLinejoin="round" />
      {Array.from({ length: n }).map((_, i) => { const y = -h + H * 0.12 + (i * H * 0.78) / n; const x1 = w * (0.78 - (i === n - 1 ? 0.5 : rnd(seed, `l${i}`) * 0.25)); return <path key={i} d={`M ${-w * 0.78} ${y} q ${W * 0.2} ${-W * 0.02} ${W * 0.4} 0 t ${x1 + w * 0.78 - W * 0.4} 0`} stroke={karis(c, "#4a4656", 0.5)} strokeWidth={Math.max(1.2, W * 0.03)} fill="none" strokeLinecap="round" />; })}
    </g>
  );
};

// ---- FOTOĞRAF MAKİNESİ (35 mm, model nötr): W gövde genişliği ekran px. Yatay gövde + ön ortada mercek tüpü + üstte 2 küçük kadran ----
export const Makine: React.FC<{ W: number; isikYon?: P }> = ({ W, isikYon = [-1, -0.3] }) => {
  const H = W * 0.54, w = W / 2, h = H / 2, gov = "#2a2830", krom = CIC.krom;
  const kx = isikYon[0] < 0 ? -1 : 1;
  return (
    <g>
      <rect x={-w} y={-h * 0.55} width={W} height={H * 0.36} rx={H * 0.08} fill={krom} stroke="#1c1a22" strokeWidth={Math.max(1.5, W * 0.03)} />
      <rect x={-w} y={-h * 0.25} width={W} height={H * 0.75} rx={H * 0.1} fill={gov} stroke="#14121a" strokeWidth={Math.max(1.5, W * 0.03)} />
      <circle cx={-w * 0.55} cy={-h * 0.7} r={H * 0.12} fill={krom} stroke="#1c1a22" strokeWidth={Math.max(1, W * 0.02)} />
      <circle cx={w * 0.55} cy={-h * 0.7} r={H * 0.12} fill={krom} stroke="#1c1a22" strokeWidth={Math.max(1, W * 0.02)} />
      <circle cx={0} cy={h * 0.2} r={H * 0.36} fill="#3a3842" stroke="#14121a" strokeWidth={Math.max(1.5, W * 0.03)} />
      <circle cx={0} cy={h * 0.2} r={H * 0.2} fill="#1c1a22" />
      <circle cx={kx * H * 0.09} cy={h * 0.2 - H * 0.08} r={H * 0.05} fill={CIC.metalNokta} />
    </g>
  );
};

// ---- ANAHTAR (kutu anahtarı: halkalı sap + çubuk + 2 net diş), koyu çelik + ışık kenarı. L uzunluk ekran px ----
// cevir 0..1: kilitte çeyrek tur (halka dik eksen etrafında döner → genişliği cos ile daralır)
export const Anahtar: React.FC<{ L: number; isik?: number; cevir?: number }> = ({ L, isik = 1, cevir = 0 }) => {
  const r = L * 0.16, t = L * 0.07, c = CIC.kolMetal, sy = Math.max(0.12, Math.abs(Math.cos((cevir * Math.PI) / 2)));
  return (
    <g transform={`scale(1 ${sy})`}>
      <circle cx={-L / 2 + r} cy={0} r={r} fill="none" stroke={c} strokeWidth={t * 1.1} />
      <rect x={-L / 2 + 2 * r} y={-t / 2} width={L - 2 * r} height={t} fill={c} />
      <rect x={L / 2 - L * 0.2} y={t / 2} width={L * 0.07} height={L * 0.12} fill={c} />
      <rect x={L / 2 - L * 0.08} y={t / 2} width={L * 0.07} height={L * 0.09} fill={c} />
      <path d={`M ${-L / 2 + 2 * r} ${-t / 2} L ${L / 2} ${-t / 2}`} stroke={CIC.metalNokta} strokeWidth={Math.max(1.5, t * 0.3)} opacity={0.75 * isik} />
    </g>
  );
};

// ---- BALMUMU (avuç içi yumuşak yassı oval, bal-ten; silindir/mum çubuğu DEĞİL) ----
// iz 0..1: anahtar izi kabartması belirir (basış anı = 1'e geçiş); cizim 0..1: iz üstünde ince anahtar çizimi kendini çizer
// (yarım bırakmak için cizim'i 0.55'te durdur — "saklanan şey"). W uzun eksen px.
export const Balmumu: React.FC<{ W: number; iz?: number; cizim?: number }> = ({ W, iz = 0, cizim = 0 }) => {
  const H = W * 0.72, c = "#c2a67e", g = "#7a6a60";
  const L = W * 0.62, r = L * 0.16, t = L * 0.08;
  // anahtar silüeti yolu (iz + çizim aynı yol): halka + çubuk + 2 diş
  const yol = `M ${-L / 2} 0 a ${r} ${r} 0 1 1 ${2 * r} 0 a ${r} ${r} 0 1 1 ${-2 * r} 0 M ${-L / 2 + 2 * r} ${-t / 2} L ${L / 2} ${-t / 2} L ${L / 2} ${t / 2 + L * 0.12} L ${L / 2 - L * 0.07} ${t / 2 + L * 0.12} L ${L / 2 - L * 0.07} ${t / 2} L ${L / 2 - L * 0.13} ${t / 2} L ${L / 2 - L * 0.13} ${t / 2 + L * 0.09} L ${L / 2 - L * 0.2} ${t / 2 + L * 0.09} L ${L / 2 - L * 0.2} ${t / 2} L ${-L / 2 + 2 * r} ${t / 2}`;
  const uzun = L * 3.2;
  return (
    <g>
      <ellipse cx={8} cy={10} rx={W / 2} ry={H / 2} fill="#2a2230" opacity={0.45} />
      <path d={`M ${-W / 2} 0 Q ${-W / 2} ${-H / 2} ${-W * 0.1} ${-H * 0.52} Q ${W / 2} ${-H * 0.5} ${W / 2} ${-H * 0.05} Q ${W * 0.48} ${H / 2} 0 ${H * 0.5} Q ${-W * 0.5} ${H * 0.48} ${-W / 2} 0 Z`} fill={c} stroke={karis(c, "#2a2028", 0.55)} strokeWidth={Math.max(2, W * 0.012)} />
      <path d={`M ${-W * 0.35} ${-H * 0.32} Q 0 ${-H * 0.44} ${W * 0.32} ${-H * 0.3}`} stroke="#dcc49c" strokeWidth={Math.max(2, W * 0.012)} fill="none" opacity={0.7} />
      {iz > 0 && <g opacity={Math.min(1, iz)}>
        <path d={yol} transform="translate(3 3)" fill="none" stroke="#e2cca4" strokeWidth={t * 0.9} strokeLinejoin="round" />
        <path d={yol} fill={g} fillRule="evenodd" opacity={0.75} />
      </g>}
      {cizim > 0 && <path d={yol} fill="none" stroke="#2a2430" strokeWidth={Math.max(2.4, W * 0.01)} strokeDasharray={`${uzun * cizim} ${uzun}`} strokeLinecap="round" />}
    </g>
  );
};

// ---- FİLM KUTUSU (35 mm kartuş: kısa koyu silindir + kapak halkası + yazısız etiket bandı). H boy px ----
export const FilmKutusu: React.FC<{ H: number }> = ({ H }) => {
  const W = H * 0.62;
  return (
    <g>
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={W * 0.12} fill="#2a2830" stroke="#14121a" strokeWidth={Math.max(1.5, H * 0.03)} />
      <rect x={-W / 2 - 2} y={-H / 2 - H * 0.08} width={W + 4} height={H * 0.14} rx={3} fill="#3a3842" stroke="#14121a" strokeWidth={1.5} />
      <rect x={-W / 2} y={-H * 0.1} width={W} height={H * 0.32} fill="#8a8470" />
      <line x1={-W * 0.32} y1={-H / 2 + 3} x2={-W * 0.32} y2={H / 2 - 3} stroke="#6a6870" strokeWidth={Math.max(1.5, H * 0.03)} opacity={0.6} />
    </g>
  );
};

// ---- KARTON DOSYA (Berlin; üstten, kapak kapalı; ince sırt bandı; yazısız) W uzun kenar px ----
export const Dosya40: React.FC<{ W: number; golge?: number }> = ({ W, golge = 0 }) => {
  const H = W * 0.72, c = karis(CIC.dosya, "#6e6052", golge), ink = karis(c, "#2a2028", 0.55);
  return (
    <g>
      <rect x={-W / 2 + 4} y={-H / 2 + 4} width={W - 4} height={H - 4} fill={karis(CIC.belgeIsik, "#8b88a0", golge)} stroke={ink} strokeWidth={2} />
      <rect x={-W / 2} y={-H / 2} width={W - 8} height={H - 8} fill={c} stroke={ink} strokeWidth={Math.max(2, W * 0.012)} />
      <rect x={-W / 2} y={-H / 2} width={W * 0.06} height={H - 8} fill={karis(c, "#2a2028", 0.25)} />
      <line x1={-W * 0.25} y1={0} x2={W * 0.3} y2={0} stroke={ink} strokeWidth={Math.max(1.5, W * 0.008)} opacity={0.35} />
    </g>
  );
};

// ---- FİNCAN + TABAK (koyu mavi emaye, kulplu) ve TEPSİ (koyu metal yuvarlak) — yandan; W fincan çapı px ----
export const Fincan: React.FC<{ W: number }> = ({ W }) => (
  <g>
    <ellipse cx={0} cy={0} rx={W * 0.8} ry={W * 0.14} fill="#3f4d6b" stroke="#1c2230" strokeWidth={2} />
    <path d={`M ${-W / 2} ${-W * 0.62} L ${W / 2} ${-W * 0.62} Q ${W * 0.46} ${-W * 0.05} 0 ${-W * 0.02} Q ${-W * 0.46} ${-W * 0.05} ${-W / 2} ${-W * 0.62} Z`} fill="#3f4d6b" stroke="#1c2230" strokeWidth={2} />
    <ellipse cx={0} cy={-W * 0.62} rx={W / 2} ry={W * 0.1} fill="#2e3850" stroke="#1c2230" strokeWidth={1.5} />
    <path d={`M ${W * 0.48} ${-W * 0.5} q ${W * 0.28} ${W * 0.06} ${W * 0.02} ${W * 0.32}`} stroke="#3f4d6b" strokeWidth={Math.max(3, W * 0.09)} fill="none" />
    <path d={`M ${-W * 0.3} ${-W * 0.5} L ${-W * 0.28} ${-W * 0.15}`} stroke="#8a9ab8" strokeWidth={Math.max(1.5, W * 0.05)} opacity={0.6} />
  </g>
);
export const Tepsi: React.FC<{ W: number }> = ({ W }) => (
  <g>
    <ellipse cx={0} cy={0} rx={W / 2} ry={W * 0.09} fill="#4a4a52" stroke="#1c1a22" strokeWidth={2.5} />
    <ellipse cx={0} cy={-W * 0.012} rx={W * 0.44} ry={W * 0.07} fill="#3a3a42" />
    <line x1={-W * 0.3} y1={-W * 0.05} x2={W * 0.1} y2={-W * 0.06} stroke={CIC.metalNokta} strokeWidth={2} opacity={0.5} />
  </g>
);
