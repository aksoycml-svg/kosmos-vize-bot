// ===== KT-2 Kamera dili: plan içi itme + el titremesi, planlar arası whip, darbe (patlama + sarsıntı) =====
// Teknik fikirler: claude-animation-skills (MIT, © 2026 Artem Novitckii) stick-figure compositor (whip: 6+6 kare kayma + yatay
// hareket bulanıklığı; shake: iki sinüs toplamı, seed'li). Görsel dil bizim: gravür mürekkep konturu, kâğıt tonları, saf beyaz yok.
// Hepsi bolum.json'dan; alan yoksa kimlik dönüşümü (eski bölümler piksel olarak aynı).
import React from "react";
import { interpolate } from "remotion";
import type { BolumJson, Darbe, KameraDil, Plan } from "./tipler";
import { CIKIS, GIRIS, cl, ekranNokta, kameraHesapla } from "./zaman";

export type SahneDonusum = { tx: number; ty: number; s: number; rot: number; bx: number; by: number; ox: number; oy: number };
const KIMLIK: SahneDonusum = { tx: 0, ty: 0, s: 1, rot: 0, bx: 0, by: 0, ox: 540, oy: 960 };

// seed'li yumuşak gürültü (deterministik; aynı kare = aynı değer)
const salin = (p: number, f: number, seed: number) => 0.6 * Math.sin(p * 0.045 * f + seed * 1.7) + 0.4 * Math.sin(p * 0.027 * f + 1.3 + seed * 0.9);

const kameraDilCoz = (plan: Plan, b?: BolumJson): KameraDil | null => {
  if (plan.kamera_dil === false) return null;
  const k = { ...(b?.kamera_dil ?? {}), ...(plan.kamera_dil ?? {}) };
  return Object.keys(k).length ? k : null;
};

const YON: Record<string, [number, number]> = { sol: [-1, 0], sag: [1, 0], yukari: [0, -1], asagi: [0, 1] };
export const WHIP_KAYMA = 520, WHIP_BULANIK = 90;

// whip ilerlemesi: çıkan planın son n karesi (e: 0→1, hızlanır) ve giren planın ilk n karesi (e: 1→0, GIRIS ile yavaşlar)
const whipDurum = (plan: Plan, p: number, onceki?: Plan): { e: number; yon: [number, number] } | null => {
  const g = plan.gecis;
  if (g?.tur === "whip") {
    const n = g.kare ?? 8;
    if (p >= plan.sure_kare - n) return { e: Math.pow(interpolate(p, [plan.sure_kare - n, plan.sure_kare], [0, 1], cl), 3), yon: YON[g.yon ?? "sol"] };
  }
  const o = onceki?.gecis;
  if (o?.tur === "whip") {
    const n = o.kare ?? 8;
    if (p < n) return { e: 1 - GIRIS(interpolate(p, [0, n], [0, 1], cl)), yon: YON[o.yon ?? "sol"].map((v) => -v) as [number, number] };
  }
  return null;
};

// darbe sarsıntısı: sönümlü salınım, ~40 kare
const sarsinti = (darbeler: Darbe[] | undefined, p: number): [number, number, number] => {
  let x = 0, y = 0, r = 0;
  for (const d of darbeler ?? []) {
    const t = p - d.kare;
    if (t < 0 || t > 48) continue;
    const a = 30 * (d.sarsinti ?? d.siddet ?? 0.7) * Math.exp(-t / 8);
    x += a * Math.sin(t * 1.9 + (d.seed ?? 0)); y += 0.7 * a * Math.cos(t * 2.3 + (d.seed ?? 0)); r += 0.04 * a * Math.sin(t * 1.3);
  }
  return [x, y, r];
};

// Plan görüntüsüne uygulanacak toplam dönüşüm (şablon kamerasının üstüne). Kenar açılmasın diye ölçek kaymaya göre büyütülür.
export const sahneDonusum = (plan: Plan, p: number, onceki?: Plan, b?: BolumJson): SahneDonusum => {
  const kd = kameraDilCoz(plan, b);
  const w = whipDurum(plan, p, onceki);
  if (!kd && !w && !plan.darbe?.length) return KIMLIK;
  const d = { ...KIMLIK };
  if (kd) {
    const t = plan.sure_kare > 1 ? p / (plan.sure_kare - 1) : 0;
    d.s *= 1 + (kd.itme ?? 0) * t; // lineer (kamera kayması — kural istisnası)
    if (kd.odak) { d.ox = kd.odak[0]; d.oy = kd.odak[1]; }
    const A = kd.titreme ?? 0, f = kd.hiz ?? 1, sd = kd.seed ?? 7;
    d.tx += A * salin(p, f, sd); d.ty += A * salin(p, f * 0.83, sd + 3.1);
    d.rot += (kd.aci ?? A * 0.03) * salin(p, f * 0.6, sd + 5.3);
    d.s *= 1 + (2.4 * A) / 1080; // titreme kenarı açmasın
  }
  const [sx, sy, sr] = sarsinti(plan.darbe, p);
  d.tx += sx; d.ty += sy; d.rot += sr;
  d.s *= 1 + (2 * Math.hypot(sx, sy)) / 1080;
  if (w) {
    d.tx += w.yon[0] * w.e * WHIP_KAYMA; d.ty += w.yon[1] * w.e * WHIP_KAYMA;
    d.s *= 1 + (2 * w.e * WHIP_KAYMA) / (w.yon[0] ? 1080 : 1920);
    d.bx = Math.abs(w.yon[0]) * w.e * WHIP_BULANIK; d.by = Math.abs(w.yon[1]) * w.e * WHIP_BULANIK;
  }
  return d;
};

export const donusumCss = (d: SahneDonusum) =>
  d === KIMLIK ? undefined : `translate(${d.tx}px,${d.ty}px) rotate(${d.rot}deg) scale(${d.s})`;
export const donusumNokta = (d: SahneDonusum, q: [number, number]): [number, number] => {
  if (d === KIMLIK) return q;
  const a = (d.rot * Math.PI) / 180, x = (q[0] - d.ox) * d.s, y = (q[1] - d.oy) * d.s;
  return [d.ox + d.tx + x * Math.cos(a) - y * Math.sin(a), d.oy + d.ty + x * Math.sin(a) + y * Math.cos(a)];
};

// Sarmalayıcı: dönüşüm + yönlü hareket bulanıklığı (SVG feGaussianBlur stdDeviation "x y", edgeMode duplicate → kenar kararmaz)
export const SahneSarmal: React.FC<{ d: SahneDonusum; id: string; children: React.ReactNode }> = ({ d, id, children }) => {
  const css = donusumCss(d);
  if (!css) return <>{children}</>;
  const bul = d.bx > 0.5 || d.by > 0.5;
  const fid = `whip-${id.replace(/[^\w-]/g, "")}`;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {bul && <svg width={0} height={0} style={{ position: "absolute" }}><filter id={fid} x="0" y="0" width="1" height="1"><feGaussianBlur stdDeviation={`${d.bx} ${d.by}`} edgeMode="duplicate" /></filter></svg>}
      <div style={{ position: "absolute", inset: 0, transformOrigin: `${d.ox}px ${d.oy}px`, transform: css, filter: bul ? `url(#${fid})` : undefined }}>{children}</div>
    </div>
  );
};

// ---- Darbe çizimi (gravür patlama): krem flaş + mürekkep konturlu kırık yıldız + tarama ışınları + kâğıt-gri duman + kıymık ----
const rnd = (seed: number) => { let s = (seed * 9301 + 49297) % 233280 || 1; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };
const INK = "#1f1a14";

const TekDarbe: React.FC<{ d: Darbe; p: number; plan: Plan }> = ({ d, p, plan }) => {
  const t = p - d.kare;
  if (t < 0 || t > 150) return null;
  const k = kameraHesapla(plan.kamera, p);
  const [x, y] = d.ekran ? [d.x, d.y] : ekranNokta(k, [d.x, d.y]);
  const sd = d.seed ?? 11, R = (d.yaricap ?? 150) * (d.ekran ? 1 : k.cs), S = d.siddet ?? 0.8;
  const r = rnd(sd);
  const buyu = GIRIS(interpolate(t, [0, 6], [0.25, 1], cl));
  const ates = 1 - CIKIS(interpolate(t, [4, 16], [0, 1], cl)); // çekirdek 16 karede söner (ışık), duman kalır
  // ateş: düzensiz iki kat kırık kenarlı alev (dış koyu turuncu, iç krem) — simetrik "güneş" okunmasın diye uç boyları ve açıları rastgele
  const kenar = (n: number, rIc: number, rDis: number, sapma: number) => Array.from({ length: n * 2 }, (_, i) => { const a = (i / (n * 2)) * Math.PI * 2 + (r() - 0.5) * 0.35; const q = (i % 2 ? rIc * (0.8 + 0.4 * r()) : rDis * (0.55 + sapma * r())) * R * buyu; return `${(x + Math.cos(a) * q * 1.12).toFixed(1)},${(y + Math.sin(a) * q * 0.9).toFixed(1)}`; }).join(" ");
  const dis = kenar(9, 0.42, 0.7, 0.6), ic = kenar(7, 0.22, 0.4, 0.35);
  const isin = Array.from({ length: 9 }, () => { const a = r() * Math.PI * 2; const r0 = R * (1.0 + 0.4 * GIRIS(interpolate(t, [0, 10], [0, 1], cl))), r1 = r0 + R * (0.12 + r() * 0.35) * ates; return [x + Math.cos(a) * r0, y + Math.sin(a) * r0, x + Math.cos(a) * r1, y + Math.sin(a) * r1]; });
  // duman: 7 top yükselir, genişler, rüzgârla sağa kayar, seyrelip dağılır (fiziksel dağılma; 150 karede biter). Birleşik siluet:
  // önce konturlu toplar, üstüne konturSUZ dolgu → tek bulut kenarı (claude-animation-skills puff tekniği)
  const duman = (d.duman ?? true) ? Array.from({ length: 7 }, () => {
    const a = r() * Math.PI * 2, u = interpolate(t, [3, 150], [0, 1], cl);
    const rr = R * (0.28 + 0.2 * r()) * (0.6 + 1.5 * Math.sqrt(u));
    return { cx: x + Math.cos(a) * R * 0.4 * (0.5 + u) + u * R * 0.9, cy: y + Math.sin(a) * R * 0.3 - u * R * 1.6, r: rr };
  }) : [];
  const dAl = interpolate(t, [3, 10, 90, 150], [0, 0.9, 0.55, 0], cl);
  // kıymık: balistik (yerçekimi), kadraj dışına düşer
  const kiymik = Array.from({ length: 9 }, () => { const a = -Math.PI * (0.1 + 0.8 * r()), v = R * (0.06 + 0.06 * r()); return { x: x + Math.cos(a) * v * t, y: y + Math.sin(a) * v * t + 0.06 * t * t * (R / 150), w: 6 + 8 * r(), rot: t * (8 + r() * 10) }; });
  const flas = (d.flas ?? S) * 0.5 * (1 - CIKIS(interpolate(t, [0, 9], [0, 1], cl)));
  return (
    <>
      {flas > 0.001 && <rect x={0} y={0} width={1080} height={1920} fill={`rgba(250,236,200,${flas})`} />}
      {duman.length > 0 && dAl > 0.001 && <g opacity={dAl}>
        {duman.map((q, i) => <circle key={`dk${i}`} cx={q.cx} cy={q.cy} r={q.r} fill="none" stroke={INK} strokeOpacity={0.6} strokeWidth={6} />)}
        {duman.map((q, i) => <circle key={`dd${i}`} cx={q.cx} cy={q.cy} r={q.r} fill="#a59a86" />)}
        {duman.slice(0, 4).map((q, i) => <path key={`dt${i}`} d={`M${q.cx - q.r * 0.5},${q.cy + q.r * 0.35} q${q.r * 0.5},${q.r * 0.3} ${q.r},0`} fill="none" stroke={INK} strokeOpacity={0.35} strokeWidth={3} strokeLinecap="round" />)}
      </g>}
      {ates > 0.01 && <g opacity={ates}>
        <polygon points={dis} fill="#c8662c" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        <polygon points={ic} fill="#f1d9a0" />
        {isin.map((l, i) => <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={INK} strokeWidth={4} strokeLinecap="round" />)}
      </g>}
      {kiymik.map((q, i) => (q.y < 2000 ? <rect key={`k${i}`} x={q.x - q.w / 2} y={q.y - 3} width={q.w} height={6} fill={INK} transform={`rotate(${q.rot},${q.x},${q.y})`} /> : null))}
    </>
  );
};

export const DarbeKatmani: React.FC<{ plan: Plan; p: number }> = ({ plan, p }) => {
  if (!plan.darbe?.length) return null;
  return <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>{plan.darbe.map((d, i) => <TekDarbe key={i} d={d} p={p} plan={plan} />)}</svg>;
};
