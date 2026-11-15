// ===== ÇÖL-ÜS şablonu (yarasa-bombasi; mekanlar.md §1, tasarim.md §1.3–1.4, §6) =====
// Carlsbad AAF yardımcı sahası, 15 Mayıs 1943, geç ikindi. TEK dünya modeli (colusDunya.ts), görünüm = kamera kaydı:
//   genis (P08, P10 son, P01b yangin-kenar) · tank-alti (P09, P10 baş) · yanik (P12 B). dolly {hedef, kare[], k[]}: kamera konumu
//   görünümden hedefe doğrusal (2B zoom değil); plan.kamera cs/cx/cy bunun ÜSTÜNE 2B kırpma (Bolum ortak kamerası).
// Tek ışık: güneş az 288°/9° (sol-alçak) → yüz tonu, gölge, kenar ışığı. Alev = ikinci ışık (yalnız alev varken).
// Görüntüde yazı yok. İmza amber yalnız kapsül/köz/kıvılcım/alev çekirdeği. Seed'ler dünyaya bağlı (kamera/kare değil).
// Parametreler (KATALOG.md "ÇÖL-ÜS"): gorunum, saat "ikindi", dolly, suru (SuruAyar dekor px), suru_golgesi, tunek_dalgasi,
// tunek_stil, kapsul_nabiz, kivilcim_dizisi, alev[], yanik, duman, cizimden/cizime (P12 baskı geçişi), vinyet, on_plan.
import React from "react";
import { interpolate, random } from "remotion";
import type { P, Plan } from "../../tipler";
import { cl, CIKIS, GIRIS, INOUT, kameraHesapla, katDonusum } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";
import { Yarasa, YR } from "../../props/yarasa/Yarasa";
import { karistir } from "../../../doku/sabitler";
import { Suru, SuruAyar } from "../../props/yarasa/Suru";
import {
  B1, D, GOLGE_MAKS, Gorunum, gorunur, isik, kamKaris, kutu, mertekS, N, projeksiyon, Proj, S, TANK, tankKesis, tankNokta, tankNormal, temelKam, TUNEKLER, V3, W, Yuz, zeminGolge, KAMERALAR,
} from "./colusDunya";

export const CP = {
  gok: ["#f0cfab", "#e3b8a4", "#b99fb4", "#8a86b0", "#5b6a9a"], sirt: "#9a8aa6", sirtUzak: "#b49bb0",
  toprak: "#d9b595", toprakOrta: "#b98f76", toprakGolge: "#6f6486", toprakDerin: "#463f5c",
  cali: "#8b7d6d", caliIsik: "#a8957f", caliGolge: "#4e4658", kaplama: "#cfa98a", kaplamaGolge: "#6c5f7a",
  catiKenar: "#e0b093", cati: "#5a5066", sacakAlti: "#2f2c45", tank: "#9aa0ad", tankKenar: "#e3b9a0", tankGolge: "#5c5f78",
  ahsap: "#6b5a52", ahsapGolge: "#3e3650", kenar: "#f0c0a0", duman: "#6a5f78", dumanGolge: "#3e3b5c", yanik: "#2f2a2e", kor: "#8a3a22",
  kontur: "#2b2f45", cam: "#3c3650", camYansima: "#8a86b0", alevDis: "#D8501F", alevOrta: "#F29A2E", alevCekirdek: "#FFE3A0", alevKontur: "#4f2a2a", alevIsik: "#ecbe9c",
  kagit: "#e6d8b9", murekkep: "#2b2f45", kirmizi: "#b3261e",
};
export const COLUS_SEED = 211; // DOKU_SEED.colUs (alt seed: 215 çalı, 216 yanık, 217 alev)
const r = (k: string | number) => random(`colus:${k}`);
const pts = (a: (P | null)[]) => a.filter(Boolean).map((q) => `${q![0].toFixed(1)},${q![1].toFixed(1)}`).join(" ");
const hull = (A: P[]): P[] => {
  const p = [...A].sort((a, b) => a[0] - b[0] || a[1] - b[1]); if (p.length < 3) return p;
  const cr = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: P[] = [], up: P[] = [];
  for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (const q of [...p].reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  return [...lo.slice(0, -1), ...up.slice(0, -1)];
};


// ---------- kamera ----------
const kamera = (plan: Plan, p: number) => {
  const g = param<Gorunum>(plan, "gorunum", "genis");
  const dl = param<{ hedef: Gorunum; kare: number[]; k: number[] } | null>(plan, "dolly", null);
  // kamera3b: görünüm kaydını plan içinde ince ayar (yönetmen; KATALOG sınırı ±10° az, ±1 m konum)
  let kam = { ...temelKam(g), ...param<Partial<ReturnType<typeof temelKam>>>(plan, "kamera3b", {}) };
  if (dl) kam = kamKaris(kam, temelKam(dl.hedef), interpolate(p, dl.kare, dl.k, { ...cl, easing: INOUT }));
  return { g, pr: projeksiyon(kam) };
};

// ---------- gök + sırt + uzak katman ----------
const GOK_YANIK: [number, string][] = [[0, CP.gok[3]], [300, CP.gok[2]], [520, CP.gok[1]]];
const Gok: React.FC<{ pr: Proj; g: Gorunum }> = ({ pr, g }) => {
  const U = pr.kam.U, f = pr.kam.F / 1400;
  const sinir: [number, string][] = g === "yanik" ? GOK_YANIK
    : [[-2000, CP.gok[4]], [U - 900 * f, CP.gok[3]], [U - 620 * f, CP.gok[2]], [U - 330 * f, CP.gok[1]], [U - 120 * f, CP.gok[0]]];
  const sun = pr.yon(288, 9);
  const dist = Math.max(0, -sun[0]);
  return (
    <g>
      {sinir.map(([y, c], i) => <rect key={i} x={-1200} y={y} width={3480} height={(sinir[i + 1]?.[0] ?? U + 40) - y + 1} fill={c} />)}
      {/* litografi geçişi: sınırın üstünde alt tonda 3 ince çizgi + nokta */}
      {g !== "yanik" && sinir.slice(1).map(([y], i) => <g key={i}>
        {Array.from({ length: 70 }).map((_, j) => <circle key={`n${j}`} cx={-200 + r(`gn${i}${j}`) * 1480} cy={y - 8 - r(`gy${i}${j}`) * 26} r={1.1} fill={sinir[i + 1][1]} opacity={0.6} />)}</g>)}
      {/* güneş parıltısı: disk çizilmez; 4 düz halka (litografi basamağı, yumuşak gradyan yok) */}
      {g !== "yanik" && <><clipPath id="cuParilti"><rect x={-1200} y={U - 330 * f} width={3480} height={400} /></clipPath>
        <g style={{ mixBlendMode: "screen" }} clipPath="url(#cuParilti)">{[520, 300, 140].map((dr, i) => <circle key={i} cx={sun[0]} cy={sun[1]} r={dist + dr} fill="#f6dcb8" opacity={0.14} />)}</g></>}
    </g>
  );
};
// Uzak sırt: dünyaya bağlı yükseklik açısı (az) → görünüm değişse de aynı yerde
const sirtYuk = (az: number) => (az < 292 || az > 338 ? 0 : 0.033 * Math.min(1, (az - 292) / 6) * (1 - 0.6 * Math.max(0, (az - 300) / 38)) + 0.004 * Math.sin(az * 1.7));
const Sirt: React.FC<{ pr: Proj }> = ({ pr }) => {
  const k = pr.kam, A: P[] = [];
  for (let x = -400; x <= 1480; x += 12) { const az = k.az + (Math.atan((x - 540) / k.F) * 180) / Math.PI; const e = sirtYuk(az); A.push([x, k.U - k.F * e]); }
  const uzak = A.map(([x, y]) => [x, k.U - (k.U - y) * 0.6 - 6] as P);
  return (
    <g>
      <polygon points={pts([[-400, k.U + 2], ...uzak, [1480, k.U + 2]])} fill={CP.sirtUzak} />
      <polygon points={pts([[-400, k.U + 2], ...A, [1480, k.U + 2]])} fill={CP.sirt} />
      <rect x={-400} y={k.U - 14} width={1880} height={16} fill="#e3b8a4" opacity={0.3} />
    </g>
  );
};
// basit yapı: kutu + beşik/tek eğim alın üçgeni (uzak/orta; yalnız siluet + ritim)
const Bina: React.FC<{ pr: Proj; s: number; t: number; L: number; Dr: number; H: number; mahya: number; tek?: boolean; renk: string; golge: string; cita?: boolean }> = ({ pr, s, t, L, Dr, H, mahya, tek, renk, golge, cita }) => {
  const Y = kutu(s + L / 2, s - L / 2, t - Dr, t, 0, H).slice(0, 4).filter((y) => gorunur(y, pr.kam));
  return (
    <g>
      {Y.map((y, i) => {
        const P4 = y.k.map(pr.P); if (P4.some((q) => !q)) return null;
        const yan = Math.abs(y.n[0] * D[0] + y.n[2] * D[1]) > 0.5; // alın yüzü
        const tepe: V3 | null = yan ? (tek ? null : W(y.k[0][0] * D[0] + y.k[0][2] * D[1], t - Dr / 2, mahya)) : null;
        const c = isik(y.n) > 0.05 ? renk : golge;
        return <g key={i}>
          <polygon points={pts(P4)} fill={c} stroke={CP.kontur} strokeWidth={2} strokeOpacity={0.5} />
          {tepe && <polygon points={pts([P4[3], pr.P(tepe), P4[2]])} fill={c} stroke={CP.kontur} strokeWidth={2} strokeOpacity={0.5} />}
          {tek && yan && <polygon points={pts([P4[3], P4[2], [P4[2]![0], P4[2]![1] - (P4[1]![1] - P4[2]![1]) * 0.22]])} fill={c} />}
          {cita && !yan && Array.from({ length: Math.floor(L / 0.9) }).map((_, j) => { const a = pr.P(W(s + L / 2 - j * 0.9, t, 0)), b = pr.P(W(s + L / 2 - j * 0.9, t, H)); return a && b ? <line key={j} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={golge} strokeWidth={1.5} opacity={0.7} /> : null; })}
        </g>;
      })}
    </g>
  );
};
const stDen = (X: number, Z: number): [number, number] => [X * D[0] + Z * D[1], X * N[0] + Z * N[1]];

// ---------- zemin ----------
const CALILAR = (() => {
  const o: { v: V3; h: number; k: number }[] = [];
  for (let i = 0; i < 260 && o.length < 46; i++) {
    const X = -48 + r(`cx${i}`) * 80, Z = -24 + r(`cz${i}`) * 90, [s, t] = stDen(X, Z);
    if (s < 4.9 + 6 && s > -4.2 - 6 && t < 6 && t > -12.1) continue;
    if (o.some((q) => Math.hypot(q.v[0] - X, q.v[2] - Z) < 4)) continue;
    o.push({ v: [X, 0, Z], h: 0.8 + r(`ch${i}`) * 1.0, k: i });
  }
  return o;
})();
const CAKIL = Array.from({ length: 520 }).map((_, i) => ({ X: -14 + r(`kx${i}`) * 34, Z: -24 + r(`kz${i}`) * 26, s: r(`ks${i}`) }));
const Cali: React.FC<{ pr: Proj; v: V3; h: number; k: number; golge?: boolean }> = ({ pr, v, h, k, golge }) => {
  const b = pr.P(v); if (!b) return null;
  const px = pr.pxm(v), H = h * px;
  if (golge) { const g = zeminGolge([v[0], h * 0.6, v[2]]), w = h * 0.3; return <polygon points={zeminCokgen(pr, [[v[0] - w * N[0], 0, v[2] - w * N[1]], [v[0] + w * N[0], 0, v[2] + w * N[1]], g])} fill={CP.toprakGolge} opacity={0.85} />; }
  if (H < 6) return <ellipse cx={b[0]} cy={b[1] - H * 0.4} rx={H * 0.7} ry={H * 0.45} fill={CP.cali} />;
  // kreozot benzeri: 3–4 taban gövdesi, her biri 2 dala ayrılır; dal boyunca tırtıklı küçük yaprak kümeleri (lob/kaya yok)
  const sw = Math.max(1, Math.min(3.5, H / 55)), nt = 3 + Math.floor(r(`cn${k}`) * 2);
  const yildiz = (c: P, rr: number, key: string) => { const A: P[] = []; for (let i = 0; i < 14; i++) { const a = (i / 14) * 2 * Math.PI, q = rr * (i % 2 ? 0.55 : 1) * (0.8 + 0.4 * r(`${key}${i}`)); A.push([c[0] + Math.cos(a) * q, c[1] + Math.sin(a) * q]); } return pts(A); };
  const dallar: { a: P; b: P }[] = [], kume: { c: P; rr: number; ton: string; key: string }[] = [];
  for (let t = 0; t < nt; t++) {
    const bx = b[0] + (t - (nt - 1) / 2) * H * 0.12 + (r(`bx${k}${t}`) - 0.5) * H * 0.06, a0 = ((t - (nt - 1) / 2) * 22 + (r(`ba${k}${t}`) - 0.5) * 12) * (Math.PI / 180);
    const L = H * (0.5 + 0.25 * r(`bl${k}${t}`)), orta: P = [bx + Math.sin(a0) * L * 0.5, b[1] - Math.cos(a0) * L * 0.5];
    dallar.push({ a: [bx, b[1]], b: orta });
    for (const da of [-0.35, 0.3]) { const a1 = a0 + da + (r(`d${k}${t}${da}`) - 0.5) * 0.3, L2 = L * (0.55 + 0.25 * r(`l${k}${t}${da}`)), uc: P = [orta[0] + Math.sin(a1) * L2, orta[1] - Math.cos(a1) * L2];
      dallar.push({ a: orta, b: uc });
      for (let q = 0; q < 4; q++) { const f = 0.35 + 0.22 * q, c: P = [orta[0] + (uc[0] - orta[0]) * f + (r(`kx${k}${t}${da}${q}`) - 0.5) * H * 0.08, orta[1] + (uc[1] - orta[1]) * f];
        const sag = c[0] > b[0] + H * 0.08 && c[1] > b[1] - H * 0.75; kume.push({ c, rr: H * (0.045 + 0.035 * r(`kr${k}${t}${da}${q}`)), ton: sag ? CP.caliGolge : c[0] < b[0] ? CP.caliIsik : CP.cali, key: `k${k}${t}${da}${q}` }); } }
  }
  return (
    <g>
      {dallar.map((d, i) => <line key={i} x1={d.a[0]} y1={d.a[1]} x2={d.b[0]} y2={d.b[1]} stroke={CP.caliGolge} strokeWidth={sw} strokeLinecap="round" />)}
      {kume.map((q) => <polygon key={q.key} points={yildiz(q.c, q.rr, q.key)} fill={q.ton} />)}
      {H > 80 && kume.filter((q) => q.ton === CP.caliGolge).slice(0, 5).map((q, i) => <line key={`h${i}`} x1={q.c[0] - q.rr * 0.3} y1={q.c[1] + q.rr} x2={q.c[0] + q.rr * 0.3 * 0.32} y2={q.c[1] - q.rr} stroke={CP.toprakDerin} strokeWidth={2.5} opacity={0.6} />)}
    </g>
  );
};
// lastik izi: genis kamerasının sabitlerinden dünyaya çizilir (kamera değişince dünyada kalır)
const IZ = (() => { const k = KAMERALAR.genis, a = ((k.az + 5) * Math.PI) / 180, f: [number, number] = [Math.sin(a), Math.cos(a)], rr: [number, number] = [Math.cos(a), -Math.sin(a)];
  return [-0.8, 0.8].map((o) => [3, 34].map((L) => [k.C[0] + f[0] * L + rr[0] * (o - 1.6), 0, k.C[1] + f[1] * L + rr[1] * (o - 1.6)] as V3)); })();

// yer çizgisi kameranın 1.5 m önünde kırpılır (yakın uçta kalınlık patlamasın)
const izKirp = (pr: Proj, L: V3[]): V3[] | null => { const za = pr.z(L[0]) - 1.5, zb = pr.z(L[1]) - 1.5; if (za < 0 && zb < 0) return null; if (za >= 0 && zb >= 0) return L;
  const t = za / (za - zb), m: V3 = [L[0][0] + (L[1][0] - L[0][0]) * t, 0, L[0][2] + (L[1][2] - L[0][2]) * t]; return za < 0 ? [m, L[1]] : [L[0], m]; };
const Zemin: React.FC<{ pr: Proj; yanik: number }> = ({ pr, yanik }) => {
  const U = pr.kam.U;
  const yamalar = Array.from({ length: 14 }).map((_, i) => { const X = -30 + r(`yx${i}`) * 50, Z = -14 + r(`yz${i}`) * 60, rx = 3 + r(`yr${i}`) * 7;
    return Array.from({ length: 16 }).map((_, j) => pr.P([X + Math.cos((j / 16) * 6.283) * rx, 0, Z + Math.sin((j / 16) * 6.283) * rx * 0.5])); });
  return (
    <g>
      <rect x={-1200} y={U} width={3480} height={3000} fill={CP.toprak} />
      {/* hava perspektifi: ufka yakın uzak zemin pusla açılır (gravür basamağı: 2 düz bant) */}
      <rect x={-1200} y={U} width={3480} height={80 * (pr.kam.F / 1400)} fill="#e2bf9e" />
      <rect x={-1200} y={U} width={3480} height={32 * (pr.kam.F / 1400)} fill="#ebcba9" />
      {yamalar.map((q, i) => (q.every(Boolean) ? <polygon key={i} points={pts(q)} fill={CP.toprakOrta} opacity={0.55} /> : null))}
      {IZ.map((L0, i) => { const L = izKirp(pr, L0); if (!L) return null; const a = pr.P(L[0]), b = pr.P(L[1]); return a && b ? <g key={i}><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={CP.toprakOrta} strokeWidth={Math.max(2, Math.min(40, 0.12 * pr.pxm(L[0])))} opacity={0.3} /><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={CP.toprakGolge} strokeWidth={2} strokeDasharray="2 9" opacity={0.4} /></g> : null; })}
      {CAKIL.map((c, i) => { const v: V3 = [c.X, 0, c.Z], q = pr.P(v); if (!q || q[1] < U + 4) return null; const px = pr.pxm(v); if (px < 60) return null;
        return <circle key={i} cx={q[0]} cy={q[1]} r={Math.min(5, 1 + c.s * 2 + px / 260)} fill={CP.toprakGolge} opacity={0.5} />; })}
      {yanik > 0 && <ellipse cx={540} cy={U + 480} rx={900} ry={260} fill={CP.dumanGolge} opacity={0.12 * yanik} />}
    </g>
  );
};

// ---------- B1 (tanklı ana yapı) ----------
const sMin = B1.sSag - 0.45, sMax = B1.sSol + 0.45; // saçak alın taşması
const yanikMaske = (s: number, oran: number) => oran > 0 && Math.abs(s) < 2.5 + 0.5 * Math.sin(s * 2.3 + 1);
const B1Ciz: React.FC<{ pr: Proj; kat: "duvar" | "sacak"; yanik: number; alevIsik: number }> = ({ pr, kat, yanik }) => {
  const k = pr.kam;
  if (kat === "duvar") {
    const facade: V3[] = [W(B1.sSol, 0, B1.doseme), W(B1.sSag, 0, B1.doseme), W(B1.sSag, 0, B1.duvar), W(B1.sSol, 0, B1.duvar)];
    const bosluk: V3[] = [W(B1.sSol, 0, 0), W(B1.sSag, 0, 0), W(B1.sSag, 0, B1.doseme), W(B1.sSol, 0, B1.doseme)];
    const gableGor = (k.C[0] * D[0] + k.C[1] * D[1]) < B1.sSag;
    const gable: V3[] = [W(B1.sSag, 0, 0), W(B1.sSag, -B1.derin, 0), W(B1.sSag, -B1.derin, B1.duvar), W(B1.sSag, -B1.derin / 2, B1.mahya), W(B1.sSag, 0, B1.duvar)];
    const bant: V3[] = [W(B1.sSol, 0, B1.duvar - B1.bant), W(B1.sSag, 0, B1.duvar - B1.bant), W(B1.sSag, 0, B1.duvar), W(B1.sSol, 0, B1.duvar)];
    const hs: number[] = []; for (let h = B1.doseme + 0.15; h < B1.duvar; h += 0.15) hs.push(h);
    const pen = B1.pencere, PW = [W(pen.s0, 0, pen.h0), W(pen.s1, 0, pen.h0), W(pen.s1, 0, pen.h1), W(pen.s0, 0, pen.h1)].map(pr.P);
    const kurum = yanik > 0 ? Array.from({ length: 3 }).map((_, j) => { const A: (P | null)[] = []; for (let s = 2.9; s >= -2.9; s -= 0.25) A.push(pr.P(W(s, 0.01, B1.duvar - (0.2 + 0.2 * j) * yanik - 0.12 * r(`ku${j}${Math.round(s * 4)}`)))); for (let s = -2.9; s <= 2.9; s += 0.5) A.push(pr.P(W(s, 0.01, B1.duvar))); return A; }) : [];
    return (
      <g>
        {gableGor && <polygon points={pts(gable.map(pr.P))} fill={CP.kaplamaGolge} stroke={CP.kontur} strokeWidth={3} strokeLinejoin="round" />}
        <polygon points={pts(bosluk.map(pr.P))} fill={CP.sacakAlti} />
        <polygon points={pts(facade.map(pr.P))} fill={CP.kaplama} stroke={CP.kontur} strokeWidth={4} strokeLinejoin="round" />
        {hs.map((h, i) => { const a = pr.P(W(B1.sSol, 0, h)), b = pr.P(W(B1.sSag, 0, h)); return a && b ? <g key={i}><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={CP.kaplamaGolge} strokeWidth={2.5} opacity={0.7} /><line x1={a[0]} y1={a[1] + 2} x2={b[0]} y2={b[1] + 2} stroke={CP.kenar} strokeWidth={1} opacity={0.4} /></g> : null; })}
        {hs.map((h, i) => { const s = B1.sSol - 0.6 - ((i * 1.37 + r(`ek${i}`) * 2.4) % 8.4); const a = pr.P(W(s, 0, h)), b = pr.P(W(s, 0, h + 0.15)); return a && b ? <line key={`e${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={CP.kaplamaGolge} strokeWidth={1.5} opacity={0.6} /> : null; })}
        {PW.every(Boolean) && <g>
          <polygon points={pts(PW)} fill={yanik > 0 ? CP.yanik : CP.cam} stroke={CP.kontur} strokeWidth={4} />
          {yanik > 0 && <polygon points={pts([PW[3], [PW[3]![0] + (PW[2]![0] - PW[3]![0]) * 0.4, PW[3]![1] + (PW[2]![1] - PW[3]![1]) * 0.4], [PW[3]![0] + (PW[0]![0] - PW[3]![0]) * 0.55 + 6, PW[3]![1] + (PW[0]![1] - PW[3]![1]) * 0.55]])} fill="#1c1820" />}
          <line x1={(PW[0]![0] + PW[3]![0]) / 2} y1={(PW[0]![1] + PW[3]![1]) / 2} x2={(PW[1]![0] + PW[2]![0]) / 2} y2={(PW[1]![1] + PW[2]![1]) / 2} stroke={CP.kaplama} strokeWidth={4} />
          <line x1={(PW[0]![0] + PW[1]![0]) / 2} y1={(PW[0]![1] + PW[1]![1]) / 2} x2={(PW[3]![0] + PW[2]![0]) / 2} y2={(PW[3]![1] + PW[2]![1]) / 2} stroke={CP.kaplama} strokeWidth={4} />
          <polygon points={pts([PW[0], [PW[0]![0] + (PW[1]![0] - PW[0]![0]) * 0.35, PW[0]![1]], PW[3]])} fill={CP.camYansima} opacity={0.3} />
        </g>}
        {/* saçak gölge bandı (0.54 m) — ton + 72° tarama */}
        <polygon points={pts(bant.map(pr.P))} fill={CP.kaplamaGolge} opacity={0.85} />
        <polygon points={pts(bant.map(pr.P))} fill="url(#cuTarama)" />
        {kurum.map((A, j) => ({ A, j })).reverse().map(({ A, j }) => <polygon key={j} points={pts(A)} fill={[CP.yanik, CP.caliGolge, CP.cati][j]} opacity={0.9} />)}
      </g>
    );
  }
  // saçak: saçak altı (yatay h 3.0) + mertek uçları + alın tahtası + alın (gable) kenarı
  const alt: V3[] = [W(sMax, 0, B1.alinAlt), W(sMin, 0, B1.alinAlt), W(sMin, B1.sacak, B1.alinAlt), W(sMax, B1.sacak, B1.alinAlt)];
  const alin = kutu(sMax, sMin, B1.sacak, B1.sacak + 0.04, B1.alinAlt, B1.alinUst);
  const mert = mertekS().map((s) => ({ s, Y: kutu(s + 0.025, s - 0.025, 0, B1.sacak, B1.alinAlt - B1.mertekH, B1.alinAlt).filter((y) => gorunur(y, k) && y.n[1] <= 0) }));
  const yanikRenk = (s: number, c: string) => (yanikMaske(s, yanik) ? CP.yanik : c);
  const gable = [W(sMin, B1.sacak, B1.alinUst), W(sMin, -B1.derin / 2, B1.mahya + 0.15), W(sMin, -B1.derin - B1.sacak, B1.alinUst)].map(pr.P);
  const altGor = k.goz < B1.alinAlt;
  return (
    <g>
      {altGor && <polygon points={pts(alt.map(pr.P))} fill={CP.sacakAlti} />}
      {altGor && <polygon points={pts(alt.map(pr.P))} fill="url(#cuTarama)" opacity={0.6} />}
      {mert.map(({ s, Y }) => Y.map((y, i) => { const q = y.k.map(pr.P); if (q.some((x) => !x)) return null;
        const c = y.n[1] < 0 ? CP.ahsap : isik(y.n) > 0 ? CP.catiKenar : CP.ahsapGolge;
        return <polygon key={`${s}${i}`} points={pts(q)} fill={yanikRenk(s, c)} stroke={CP.kontur} strokeWidth={2} strokeLinejoin="round" />; }))}
      {alin.filter((y) => gorunur(y, k)).map((y, i) => { const q = y.k.map(pr.P); if (q.some((x) => !x)) return null;
        return <polygon key={i} points={pts(q)} fill={y.n[1] !== 0 ? CP.ahsapGolge : isik(y.n) > 0.1 ? CP.catiKenar : CP.ahsap} stroke={CP.kontur} strokeWidth={4} strokeLinejoin="round" />; })}
      {yanik > 0 && (() => { const A: (P | null)[] = [], B: (P | null)[] = [];
        for (let s = 2.9; s >= -2.9; s -= 0.2) { A.push(pr.P(W(s, B1.sacak + 0.05, B1.alinUst + 0.02))); B.unshift(pr.P(W(s, B1.sacak + 0.05, B1.alinAlt - 0.02))); }
        const kop = [-1.9, 0.25, 1.6].map((s0, i) => [W(s0, B1.sacak + 0.06, B1.alinUst + 0.03), W(s0 + 0.32 + 0.1 * i, B1.sacak + 0.06, B1.alinUst + 0.03), W(s0 + 0.22, B1.sacak + 0.06, B1.alinAlt + 0.02 + 0.05 * i), W(s0 + 0.05, B1.sacak + 0.06, B1.alinAlt + 0.06)].map(pr.P));
        return <g><polygon points={pts([...A, ...B])} fill={CP.yanik} />{kop.map((q, i) => q.every(Boolean) ? <polygon key={`kp${i}`} points={pts(q)} fill={CP.gok[1]} /> : null)}
          {Array.from({ length: 26 }).map((_, i) => { const s = 2.7 - i * 0.21, a = pr.P(W(s, B1.sacak + 0.05, B1.alinUst - 0.02)), b = pr.P(W(s + 0.04, B1.sacak + 0.05, B1.alinAlt + 0.03)); return a && b ? <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={CP.caliGolge} strokeWidth={1.5} /> : null; })}</g>; })()}
      {/* rulo kaplama dudağı + alın (gable) kenarı: çatı yüzeyi görünmez (göz < saçak) */}
      {(() => { const a = pr.P(W(sMax, B1.sacak + 0.04, B1.alinUst + 0.03)), b = pr.P(W(sMin, B1.sacak + 0.04, B1.alinUst + 0.03)); return a && b ? <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={CP.kenar} strokeWidth={3} strokeLinecap="round" /> : null; })()}
      {gable.every(Boolean) && <polyline points={pts(gable)} fill="none" stroke={CP.cati} strokeWidth={Math.max(4, 0.15 * pr.pxm(W(sMin, 0, 3)))} strokeLinejoin="round" />}
    </g>
  );
};

// ---------- tank ----------
const TankCiz: React.FC<{ pr: Proj; kurum: number; clipId?: string }> = ({ pr, kurum, clipId }) => {
  const k = pr.kam, L2 = TANK.L / 2, adim = pr.pxm(W(0, TANK.t, TANK.h)) > 200 ? 7.5 : 15;
  const cam: V3 = [k.C[0], k.goz, k.C[1]];
  const bakar = (v: V3, n: V3) => (cam[0] - v[0]) * n[0] + (cam[1] - v[1]) * n[1] + (cam[2] - v[2]) * n[2] > 0;
  const seritler: { q: (P | null)[]; c: string; z: number }[] = [];
  for (let f = 0; f < 360; f += adim) {
    const n = tankNormal(f + adim / 2), m = tankNokta(0, f + adim / 2);
    if (!bakar(m, n)) continue;
    const L = isik(n), ust = f > 20 && f < 160;
    let c = L > 0.45 ? CP.tankKenar : L > 0.1 ? CP.tank : CP.tankGolge;
    if (kurum > 0) c = karistir(c, ust ? CP.yanik : "#3e3b5c", (ust ? 0.75 : 0.45) * kurum);
    seritler.push({ q: [tankNokta(L2, f), tankNokta(-L2, f), tankNokta(-L2, f + adim + 0.5), tankNokta(L2, f + adim + 0.5)].map(pr.P), c, z: pr.z(m) });
  }
  seritler.sort((a, b) => b.z - a.z);
  const kapak = (s: number) => { const n: V3 = [D[0] * Math.sign(s), 0, D[1] * Math.sign(s)]; const v = W(s, TANK.t, TANK.h); if (!bakar(v, n)) return null;
    const q = Array.from({ length: 24 }).map((_, i) => pr.P(tankNokta(s, i * 15))), q2 = Array.from({ length: 24 }).map((_, i) => pr.P(W(s, TANK.t + TANK.r * 0.86 * Math.cos((i * 15 * Math.PI) / 180), TANK.h + TANK.r * 0.86 * Math.sin((i * 15 * Math.PI) / 180))));
    const c0 = isik(n) > 0.3 ? CP.tankKenar : isik(n) > 0 ? CP.tank : CP.tankGolge, c = kurum > 0 ? karistir(c0, "#3e3b5c", 0.5 * kurum) : c0;
    return <g><polygon points={pts(q)} fill={c} stroke={CP.kontur} strokeWidth={4} />
      {isik(n) < 0.3 && <polygon points={pts(q)} fill="url(#cuTarama)" opacity={0.35} />}
      <polygon points={pts(q2)} fill="none" stroke={CP.kontur} strokeWidth={2.5} opacity={0.6} />
      {q2.map((x, i) => (i % 2 === 0 && x ? <circle key={i} cx={x[0]} cy={x[1]} r={Math.max(1.5, 0.012 * pr.pxm(W(s, TANK.t, TANK.h)))} fill={CP.kontur} opacity={0.6} /> : null))}</g>; };
  const govde = hull([...Array.from({ length: 24 }).flatMap((_, i) => [pr.P(tankNokta(L2, i * 15)), pr.P(tankNokta(-L2, i * 15))]).filter(Boolean) as P[]]);
  const dikis = (s: number) => { const A: P[] = []; for (let f = 0; f <= 360; f += 10) { if (!bakar(tankNokta(s, f), tankNormal(f))) continue; const q = pr.P(tankNokta(s, f)); if (q) A.push(q); } return A.length > 1 ? <polyline points={pts(A)} fill="none" stroke={CP.tankGolge} strokeWidth={2} opacity={0.8} /> : null; };
  const kapakUst = pr.P(W(0.6, TANK.t, TANK.h + TANK.r)), boru = [pr.P(W(-0.9, TANK.t, TANK.h + TANK.r)), pr.P(W(-0.9, TANK.t, TANK.h + TANK.r + 0.6))];
  return (
    <g>
      {clipId && <defs><clipPath id={clipId}><polygon points={pts(govde)} /></clipPath></defs>}
      {kapak(L2)}{kapak(-L2)}
      {seritler.map((s, i) => <polygon key={i} points={pts(s.q)} fill={s.c} stroke={s.c} strokeWidth={1} />)}
      {dikis(TANK.L / 6)}{dikis(-TANK.L / 6)}
      {[-150, -120, -90, -60, -30].map((f) => { if (!bakar(tankNokta(0, f), tankNormal(f))) return null; const a = pr.P(tankNokta(L2 * 0.98, f)), b = pr.P(tankNokta(-L2 * 0.98, f)); return a && b ? <line key={`b${f}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={CP.kontur} strokeWidth={f === -90 ? 3 : 1.8} opacity={0.45} /> : null; })}
      {kurum > 0 && (() => { const A: P[] = []; for (let x = 1.8; x >= -1.8; x -= 0.3) { const q = pr.P(tankNokta(x, 150)); if (q) A.push(q); } for (let x = -1.8; x <= 1.8; x += 0.3) { const q = pr.P(tankNokta(x, 40 + 22 * random(`tk${x.toFixed(1)}`))); if (q) A.push(q); }
        return A.length > 3 ? <polygon points={pts(A)} fill={CP.yanik} opacity={0.75 * kurum} /> : null; })()}
      {Array.from({ length: 4 }).map((_, i) => { const s = 0.9 - i * 0.45, a = pr.P(tankNokta(s, 70)), b = pr.P(tankNokta(s - 0.05, 20)); return a && b ? <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#8b90a0" strokeWidth={2.5} opacity={0.25} /> : null; })}
      {/* terminatör taraması (alt yüz, ≤ 0.25 çap) */}
      {(() => { const A: P[] = []; for (let f = -100; f <= -60; f += 8) { if (!bakar(tankNokta(0, f), tankNormal(f))) continue; const q = pr.P(tankNokta(L2 * 0.9, f)), q2 = pr.P(tankNokta(-L2 * 0.9, f)); if (q && q2) A.push(q, q2); }
        return A.length > 2 ? <polygon points={pts(hull(A))} fill="url(#cuTarama)" opacity={0.7} /> : null; })()}
      <polygon points={pts(govde)} fill="none" stroke={CP.kontur} strokeWidth={4} strokeLinejoin="round" />
      {(() => { const A: P[] = []; for (let f = 60; f <= 140; f += 10) { if (!bakar(tankNokta(L2, f), tankNormal(f))) continue; const q = pr.P(tankNokta(L2, f)); if (q) A.push(q); } return A.length > 1 ? <polyline points={pts(A)} fill="none" stroke={CP.kenar} strokeWidth={3} /> : null; })()}
      {k.goz > TANK.h + TANK.r && kapakUst && <ellipse cx={kapakUst[0]} cy={kapakUst[1] - 4} rx={Math.max(4, 0.12 * pr.pxm(W(0.6, TANK.t, 2.15)))} ry={Math.max(2, 0.05 * pr.pxm(W(0.6, TANK.t, 2.15)))} fill={CP.tankGolge} stroke={CP.kontur} strokeWidth={2} />}
      {k.goz > TANK.h && boru[0] && boru[1] && <line x1={boru[0][0]} y1={boru[0][1]} x2={boru[1][0]} y2={boru[1][1]} stroke={CP.tankGolge} strokeWidth={Math.max(2, 0.05 * pr.pxm(W(-0.9, TANK.t, 2.2)))} strokeLinecap="round" />}
    </g>
  );
};
// semer + ayaklar (tank gövdesinden SONRA; üst yüz çizilmez — tankın altında kalır)
const SemerCiz: React.FC<{ pr: Proj }> = ({ pr }) => {
  const k = pr.kam;
  const parca: { Y: Yuz[]; z: number }[] = [];
  for (const s of TANK.semer) {
    parca.push({ Y: kutu(s + 0.075, s - 0.075, TANK.t - 0.85, TANK.t + 0.85, TANK.semerH[0], TANK.semerH[1]).filter((y) => y.n[1] <= 0), z: pr.z(W(s, TANK.t, 0.47)) });
    for (const o of [-TANK.ayakT, TANK.ayakT]) parca.push({ Y: kutu(s + 0.06, s - 0.06, TANK.t + o - 0.06, TANK.t + o + 0.06, 0, TANK.semerH[0]), z: pr.z(W(s, TANK.t + o, 0.2)) });
  }
  parca.sort((a, b) => b.z - a.z);
  return <g>{parca.map((pa, i) => pa.Y.filter((y) => gorunur(y, k)).map((y, j) => { const q = y.k.map(pr.P); if (q.some((x) => !x)) return null;
    return <polygon key={`${i}${j}`} points={pts(q)} fill={y.n[1] < 0 ? CP.ahsapGolge : isik(y.n) > 0.1 ? CP.ahsap : CP.ahsapGolge} stroke={CP.kontur} strokeWidth={3} strokeLinejoin="round" />; }))}</g>;
};
// gölgeler: zemin (≤ 5h) — duvar düzlemini (t 0) aşan kısım duvara tırmanır
const golgeNoktalari = (A: V3[]) => {
  const zem: V3[] = [], duv: V3[] = [];
  for (const v of A) {
    const g = zeminGolge(v), t = g[0] * N[0] + g[2] * N[1], t0 = v[0] * N[0] + v[2] * N[1];
    if (t >= 0 || t0 < 0) { zem.push(g); continue; }
    const q = t0 / (t0 - t), w: V3 = [v[0] + (g[0] - v[0]) * q, v[1] * (1 - q), v[2] + (g[2] - v[2]) * q];
    zem.push([w[0], 0, w[2]]); duv.push(w, [w[0], 0, w[2]]);
  }
  return { zem, duv };
};
// dünya zemin çokgeni (h 0): XZ'de dışbükey zarf → kameranın yakın düzleminde kırp (z ≥ 0.3) → izdüşüm (kamera dibinde bozulmaz)
export const zeminCokgen = (pr: Proj, A: V3[]): string => {
  const Z = hull(A.map((v) => [v[0], v[2]] as P)); if (Z.length < 3) return "";
  const zz = (q: P) => pr.z([q[0], 0, q[1]]) - 0.3, out: P[] = [];
  Z.forEach((a, i) => { const b = Z[(i + 1) % Z.length], da = zz(a), db = zz(b); if (da >= 0) out.push(a); if ((da >= 0) !== (db >= 0)) { const t = da / (da - db); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); } });
  return out.length > 2 ? pts(out.map((q) => pr.P([q[0], 0, q[1]]))) : "";
};
const Golgeler: React.FC<{ pr: Proj; kat: "zemin" | "duvar" }> = ({ pr, kat }) => {
  const tankA: V3[] = []; for (let f = 0; f < 360; f += 30) tankA.push(tankNokta(TANK.L / 2, f), tankNokta(-TANK.L / 2, f));
  const tabanT: V3[] = [W(1.9, TANK.t - 0.8, 0), W(-1.9, TANK.t - 0.8, 0), W(1.9, TANK.t + 0.8, 0), W(-1.9, TANK.t + 0.8, 0)];
  const g = golgeNoktalari(tankA);
  const b1 = golgeNoktalari([W(B1.sSag, 0, B1.alinUst), W(B1.sSag, -B1.derin, B1.alinUst), W(B1.sSag, -B1.derin / 2, B1.mahya), W(B1.sSol, -B1.derin, B1.alinUst)]);
  const poly = (A: V3[]) => { const q = A.map(pr.P).filter(Boolean) as P[]; return q.length > 2 ? pts(hull(q)) : ""; };
  if (kat === "zemin") return (
    <g>
      <polygon points={zeminCokgen(pr, [...b1.zem, W(B1.sSag, 0, 0), W(B1.sSag, -B1.derin, 0), W(B1.sSol, -B1.derin, 0)])} fill={CP.toprakGolge} />
      <polygon points={zeminCokgen(pr, [...g.zem, ...tabanT])} fill={CP.toprakGolge} />
      {TANK.semer.flatMap((s) => [-TANK.ayakT, TANK.ayakT].map((o) => { const a = W(s, TANK.t + o, 0), b = zeminGolge(W(s, TANK.t + o, 0.4)); const A = pr.P(a), B = pr.P(b); return A && B ? <line key={`${s}${o}`} x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={CP.toprakDerin} strokeWidth={Math.max(3, 0.12 * pr.pxm(a))} strokeLinecap="round" /> : null; }))}
      {/* temas gölgesi: ayak tabanları */}
      {TANK.semer.flatMap((s) => [-TANK.ayakT, TANK.ayakT].map((o) => { const A = pr.P(W(s, TANK.t + o, 0)); return A ? <ellipse key={`t${s}${o}`} cx={A[0]} cy={A[1]} rx={Math.max(3, 0.12 * pr.pxm(W(s, TANK.t + o, 0)))} ry={Math.max(1.5, 0.04 * pr.pxm(W(s, TANK.t + o, 0)))} fill={CP.toprakDerin} /> : null; }))}
    </g>
  );
  return g.duv.length > 2 ? <polygon points={poly(g.duv)} fill={CP.kaplamaGolge} opacity={0.9} /> : null;
};

// ---------- tünek dalgası + köz nabzı ----------
type TunekP = { bas: number; bit: number; adet: number; seed?: number };
type Nabiz = { bas: number; periyot?: [number, number]; bit?: number };
const nabizDeger = (nb: Nabiz | null, p: number, faz: number) => {
  if (!nb || p < nb.bas) return 0;
  const [T0, T1] = nb.periyot ?? [96, 68], L = Math.max(1, (nb.bit ?? nb.bas + 360) - nb.bas), x = Math.min(p - nb.bas, L);
  const ph = Math.abs(T1 - T0) < 1e-3 ? x / T0 : (L / (T1 - T0)) * Math.log((T0 + (T1 - T0) * (x / L)) / T0) + Math.max(0, p - nb.bas - L) / T1;
  return 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(2 * Math.PI * (ph + faz) - Math.PI / 2));
};
export const tunekListesi = (pr: Proj, adet: number) => TUNEKLER
  .map((t) => ({ ...t, e: pr.P(t.v) }))
  .filter((t) => { // tank gövdesinin arkasında kalan tünek seçilmez (önde olan arkadakini örter)
    const c: V3 = [pr.kam.C[0], pr.kam.goz, pr.kam.C[1]], L: V3 = [t.v[0] - c[0], t.v[1] - c[1], t.v[2] - c[2]], s = tankKesis(c, L);
    return s === null || s > 0.97; })
  .filter((t) => t.e && t.e[0] > -60 && t.e[0] < 1140 && t.e[1] > -60 && t.e[1] < 1980)
  .sort((a, b) => pr.z(a.v) - pr.z(b.v)) // yakın önce; ekranda üst üste binen (aralık < 0.55 gövde boyu) elenir
  .reduce((acc, t) => { const u = 0.11 * 1.25 * pr.pxm(t.v); if (!acc.some((q) => Math.abs(q.e![0] - t.e![0]) < 0.55 * u * 1.6 && Math.abs(q.e![1] - t.e![1]) < 1.6 * u)) acc.push(t); return acc; }, [] as (Tunek0 & { e: P | null })[])
  .sort((a, b) => a.e![0] - b.e![0]).slice(0, adet);
type Tunek0 = (typeof TUNEKLER)[number];
const Tunemis: React.FC<{ pr: Proj; plan: Plan; p: number; alev: boolean }> = ({ pr, plan, p, alev }) => {
  const td = param<TunekP | null>(plan, "tunek_dalgasi", null); if (!td) return null;
  const nb = param<Nabiz | null>(plan, "kapsul_nabiz", null), kv = param<{ kare: number; tunek: number }[]>(plan, "kivilcim_dizisi", []);
  const stil = alev ? "gomulu" : param<"gercek" | "gomulu">(plan, "tunek_stil", "gercek");
  const L = tunekListesi(pr, td.adet), sd = td.seed ?? 5;
  return <g>{L.map((t, i) => {
    const a = td.bas + (td.bit - td.bas) * (L.length > 1 ? i / (L.length - 1) : 0) + (random(`tk${sd}${i}`) - 0.5) * 16;
    const e = t.e!, u = 0.11 * 1.25 * pr.pxm(t.v), uc = 46;
    const kivi = kv.find((q) => q.tunek === i && p >= q.kare);
    const kapsul = kivi ? "kivilcim" : nb && p >= nb.bas ? "koz" : "kapsul";
    const nab = nabizDeger(nb, p, random(`nf${sd}${i}`));
    if (p < a - uc) return null;
    if (p < a) { // uçarak gelir: soldan-alttan, kanat çırpar
      const q = (p - (a - uc)) / uc, e0: P = [e[0] - 420 - 160 * random(`tx${i}`), e[1] + 260 + 120 * random(`ty${i}`)];
      const qq = GIRIS(q), x = e0[0] + (e[0] - e0[0]) * qq, y = e0[1] + (e[1] - e0[1]) * qq - Math.sin(Math.PI * q) * 90;
      return <Yarasa key={i} z={{ x, y: y + 0.52 * u, u, faz: (p / 10) % 1, kanat: 0.05, aci: -20 + 30 * q, stil, kenar: true, kapsul }} />;
    }
    const d = p - a, don = interpolate(d, [0, 10], [0, 180], { ...cl, easing: GIRIS }), kat = interpolate(d, [0, 16], [0.1, random(`kk${sd}${i}`) < 0.6 ? 0.68 : 0.92], { ...cl, easing: GIRIS });
    const sallan = Math.sin(d / 9) * 6 * Math.exp(-d / 30);
    return <Yarasa key={i} z={{ x: e[0], y: e[1], capa: "ayak", u, aci: 180 + sallan - (180 - don), kanat: kat, faz: 0.25, nefes: 0.5 + 0.5 * Math.sin(p / 9 + i), stil, kenar: stil === "gercek", kapsul, nabiz: nab }} />;
  })}</g>;
};
const Kivilcimlar: React.FC<{ pr: Proj; plan: Plan; p: number }> = ({ pr, plan, p }) => {
  const kv = param<{ kare: number; tunek: number; siddet?: number }[]>(plan, "kivilcim_dizisi", []), td = param<TunekP | null>(plan, "tunek_dalgasi", null);
  if (!kv.length || !td) return null;
  const L = tunekListesi(pr, td.adet), cs = kameraHesapla(plan.kamera, p).cs;
  return <g>{kv.map((q, i) => { const t = L[q.tunek]; if (!t || p < q.kare) return null;
    const u = 0.11 * 1.25 * pr.pxm(t.v), e: P = [t.e![0], t.e![1] + 0.75 * u]; // kapsül başı (asılı: baş aşağı)
    const d = p - q.kare, sn = interpolate(d, [0, 10], [1, 0.5], cl), R = 60 / cs;
    return <g key={i}>
      <circle cx={e[0]} cy={e[1] - 0.25 * u} r={R} fill={YR.amber} opacity={0.28 * sn} />
      <line x1={e[0]} y1={e[1]} x2={e[0] - 3 / cs} y2={e[1] - 14 / cs} stroke={YR.koz} strokeWidth={3 / cs} strokeLinecap="round" />
      <circle cx={e[0]} cy={e[1]} r={4.5 / cs} fill={YR.hilal} />
    </g>; })}</g>;
};

// ---------- alev + duman ----------
type AlevP = { bas: number; s0: number; hiz?: number; boy?: number; smin?: number; smax?: number };
const alevler = (plan: Plan) => param<AlevP[]>(plan, "alev", []);
const Alev: React.FC<{ pr: Proj; plan: Plan; p: number; kat: "isik" | "alev" }> = ({ pr, plan, p, kat }) => {
  const A = alevler(plan).filter((a) => p >= a.bas); if (!A.length) return null;
  const dil: { b: P; h: number; s: number; k: string }[] = [];
  A.forEach((a, ai) => {
    const t = (p - a.bas) / 60, yay = Math.min(1, t * (a.hiz ?? 1.2)), lo = Math.max(a.smin ?? -3.8, a.s0 - yay * 4), hi = Math.min(a.smax ?? 4.5, a.s0 + yay * 4);
    for (let s = Math.ceil(lo / 0.32) * 0.32; s <= hi; s += 0.32) {
      const v = W(s, B1.sacak + 0.05, B1.alinUst), b = pr.P(v); if (!b) continue;
      const kenar = Math.min(1, (Math.min(s - lo, hi - s) + 0.2) / 0.8), buy = GIRIS(Math.min(1, (p - a.bas) / 30));
      const tit = 0.86 + 0.14 * Math.sin(p * (0.35 + 0.1 * random(`af${ai}${s.toFixed(2)}`)) + 6 * random(`ap${s.toFixed(2)}`));
      dil.push({ b, h: (a.boy ?? 1.6) * pr.pxm(v) * kenar * buy * tit * (0.7 + 0.5 * random(`ah${s.toFixed(2)}`)), s, k: `${ai}${s.toFixed(2)}` });
    }
  });
  if (kat === "isik") {
    const m = dil.reduce((q, d) => [q[0] + d.b[0] / dil.length, q[1] + d.b[1] / dil.length], [0, 0]), H = Math.max(...dil.map((d) => d.h), 1);
    return <g style={{ mixBlendMode: "screen" }} clipPath="url(#cuAlevKlip)"><circle cx={m[0]} cy={m[1]} r={H + 30} fill={CP.alevOrta} opacity={0.2} /></g>;
  }
  const yaprak = (b: P, h: number, w: number, egim: number) => `M${b[0] - w},${b[1]} C${b[0] - w},${b[1] - h * 0.5} ${b[0] + egim * 0.5},${b[1] - h * 0.7} ${b[0] + egim},${b[1] - h} C${b[0] + w * 0.6},${b[1] - h * 0.55} ${b[0] + w},${b[1] - h * 0.3} ${b[0] + w},${b[1]} Z`;
  return <g>{dil.map((d) => { const w = d.h * 0.32, eg = d.h * 0.28;
    return <g key={d.k}><path d={yaprak(d.b, d.h, w, eg)} fill={CP.alevDis} stroke={CP.alevKontur} strokeWidth={3} strokeLinejoin="round" />
      <path d={yaprak(d.b, d.h * 0.7, w * 0.62, eg * 0.7)} fill={CP.alevOrta} /><path d={yaprak(d.b, d.h * 0.4, w * 0.32, eg * 0.4)} fill={CP.alevCekirdek} /></g>; })}</g>;
};
type DumanP = { bas: number; kaynak?: number[]; ince?: boolean };
const Duman: React.FC<{ pr: Proj; plan: Plan; p: number }> = ({ pr, plan, p }) => {
  const dm = param<DumanP | null>(plan, "duman", null) ?? (alevler(plan).length ? { bas: alevler(plan)[0].bas + 6 } : null);
  if (!dm || p < dm.bas) return null;
  const kay = dm.kaynak ?? [0.6, -0.8, 1.8], ince = !!dm.ince, out: React.ReactNode[] = [];
  const kenar: React.ReactNode[] = [], govde: React.ReactNode[] = [], ic: React.ReactNode[] = [];
  kay.forEach((s, ki) => {
    const b = pr.P(W(s, B1.sacak, B1.alinUst + 0.1)); if (!b) return;
    const ks = 0.75 + 0.6 * random(`dk${ki}`), drift = (ince ? 0.3 : 1.1) + 0.5 * random(`dd${ki}`);
    const px = pr.pxm(W(s, B1.sacak, 3)), ar = ince ? 7 : 5, omur = ince ? 240 : 420;
    for (let j = Math.max(0, Math.floor((p - dm.bas - omur) / ar)); j * ar <= p - dm.bas; j++) {
      const yas = p - dm.bas - j * ar + (random(`dj${ki}${j}`) - 0.5) * ar * 0.9; if (yas < 0) continue;
      const R = ks * (ince ? 0.07 : 0.3) * px * (1 + Math.min(yas, 160) / (ince ? 180 : 50)) * (0.6 + 0.8 * random(`dr${ki}${j}`));
      const x = b[0] + yas * drift + (random(`dx${ki}${j}`) - 0.5) * R * 0.9, y = b[1] - yas * (ince ? 2.4 : 3.4) * (0.9 + 0.2 * random(`dv${ki}`));
      if (y + R < -900) continue; // kadraj üstünden çıkar (fade yok)
      const k2 = `${ki}-${j}`, ua = random(`du${ki}${j}`) * 6.283;
      kenar.push(<circle key={k2} cx={x - R * 0.16} cy={y - R * 0.05} r={R} fill="#e3b8a4" />);
      govde.push(<g key={k2}><circle cx={x} cy={y} r={R} fill={CP.duman} /><circle cx={x + Math.cos(ua) * R} cy={y + Math.sin(ua) * R} r={R * 0.35} fill={CP.duman} /></g>);
      if (random(`dg${ki}${j}`) < 0.1) ic.push(<circle key={k2} cx={x + R * 0.35} cy={y + R * 0.2} r={R * 0.45} fill={CP.dumanGolge} opacity={0.7} />);
      if (!ince && yas < 40) ic.push(<circle key={`a${k2}`} cx={x} cy={y + R * 0.45} r={R * 0.55} fill="#c08a6c" opacity={0.6} />);
    }
  });
  out.push(<g key="k">{kenar}</g>, <g key="g">{govde}</g>, <g key="i">{ic}</g>);
  return <g>{out}</g>;
};

// ---------- sürü gölgesi (D4): alçak akış + güneş izdüşümü (tanka ya da zemine) ----------
type AkisP = { bas: number; bit: number; n?: number; h?: [number, number]; seed?: number };
const akisBireyleri = (a: AkisP, p: number) => {
  const n = a.n ?? 70, [h0, h1] = a.h ?? [2, 5], sd = a.seed ?? 9;
  const yan: V3 = W(0, TANK.t, 0); // tank merkezi
  const o: { v: V3; faz: number }[] = [];
  for (let i = 0; i < n; i++) {
    const h = h0 + (h1 - h0) * random(`ah${sd}${i}`), mesafe = h / Math.tan((9 * Math.PI) / 180) * (5 / 6.3) * (0.9 + 0.2 * random(`am${sd}${i}`));
    const merkez: V3 = [yan[0] + S[0] * mesafe, h, yan[2] + S[2] * mesafe];
    const q = interpolate(p, [a.bas + 26 * random(`ag${sd}${i}`), a.bit - 26 * (1 - random(`ag${sd}${i}`))], [-1, 1], cl);
    const yanal = q * 14 + (random(`ay${sd}${i}`) - 0.5) * 3.2;
    const v: V3 = [merkez[0] + yanal * D[0] * -1 + (random(`ax${sd}${i}`) - 0.5) * 1.6, h + (random(`az${sd}${i}`) - 0.5) * 0.6, merkez[2] - yanal * D[1] * -1];
    if (p < a.bas || p > a.bit) continue;
    o.push({ v, faz: (p / 20 + random(`af${sd}${i}`)) % 1 });
  }
  return o;
};
const SuruGolgesi: React.FC<{ pr: Proj; plan: Plan; p: number; kat: "zemin" | "tank" | "yarasa"; clipId: string }> = ({ pr, plan, p, kat, clipId }) => {
  const a = param<AkisP | null>(plan, "suru_golgesi", null); if (!a) return null;
  const B = akisBireyleri(a, p), Ld: V3 = [-S[0], -S[1], -S[2]];
  if (kat === "yarasa") return <g>{B.map((b, i) => { const e = pr.P(b.v); return e ? <Yarasa key={i} z={{ x: e[0], y: e[1], u: 0.11 * pr.pxm(b.v), faz: b.faz, kanat: 0.08, stil: "siluet" }} /> : null; })}</g>;
  const lek = B.map((b, i) => {
    const st = tankKesis(b.v, Ld), tank = st !== null;
    if ((kat === "tank") !== tank) return null;
    const hit: V3 = tank ? [b.v[0] + Ld[0] * st!, b.v[1] + Ld[1] * st!, b.v[2] + Ld[2] * st!] : zeminGolge(b.v);
    const e = pr.P(hit); if (!e) return null; const R = 0.22 * pr.pxm(hit);
    const e2 = tank ? null : pr.P([hit[0] - S[0], 0, hit[2] - S[2]]), ang = e2 ? (Math.atan2(e2[1] - e[1], e2[0] - e[0]) * 180) / Math.PI : -8;
    return <ellipse key={i} cx={e[0]} cy={e[1]} rx={R * (tank ? 1.4 : 2.6)} ry={R * (tank ? 0.7 : 0.55)} transform={`rotate(${ang} ${e[0]} ${e[1]})`} fill={CP.toprakDerin} opacity={0.4} />;
  });
  return <g clipPath={kat === "tank" ? `url(#${clipId})` : undefined}>{lek}</g>;
};

// ---------- ön plan çalısı Ç0 (P08; genis kamerasından dünyaya sabit) ----------
const C0: V3 = (() => { const k = KAMERALAR.genis, a = (k.az * Math.PI) / 180, xc = ((130 - 540) * 4) / 1400; return [k.C[0] + Math.sin(a) * 4 + Math.cos(a) * xc, 0, k.C[1] + Math.cos(a) * 4 - Math.sin(a) * xc]; })();

// ---------- P12 baskı geçişi (çizim ↔ gerçek) ----------
// çizim hatları yanik görünümünde (ekran = dekor, cs 1) — defter alt sayfası aynı hatları ölçekli kopyalar (MASA-YB)
export const cizimHatlari = () => {
  const pr = projeksiyon(KAMERALAR.yanik), s0 = 6.2, s1 = -4.6;
  const hat = (t: number, h: number): [P, P] => [pr.P(W(s0, t, h))!, pr.P(W(s1, t, h))!];
  const H1 = hat(B1.sacak + 0.04, B1.alinUst), H2 = hat(B1.sacak + 0.04, B1.alinAlt), H3 = hat(0, B1.duvar), H4 = hat(0, B1.duvar - B1.bant);
  const M = mertekS().map((s) => [pr.P(W(s, 0, B1.alinAlt - B1.mertekH / 2))!, pr.P(W(s, B1.sacak, B1.alinAlt - B1.mertekH / 2))!] as [P, P]);
  return { H1, H2, H3, H4, M };
};
type Baski = { bas: number; bit: number };
const baskiDurum = (plan: Plan, p: number) => {
  const a = param<Baski | null>(plan, "cizimden", null), b = param<Baski | null>(plan, "cizime", null);
  // 0 = kâğıt, 1 = gerçek. cizimden: 10 kare kırmızı→kömür, sonra 4 katman × 4 kare. cizime: ters sıra.
  if (a && p < a.bit) { const t = p - a.bas; return { ilerle: Math.max(0, t - 10) / 4, kirmizi: interpolate(t, [0, 10], [0, 1], cl), aktif: true }; }
  if (b && p >= b.bas) { const t = b.bit - p; return { ilerle: Math.max(0, t) / 4.5, kirmizi: 1, aktif: true }; }
  return { ilerle: 99, kirmizi: 1, aktif: false };
};
const yirtik = (x: number, k: string) => { const A: P[] = [[-1300, -900]]; for (let y = -900; y <= 2900; y += 60) A.push([x + (random(`yr${k}${y}`) - 0.5) * 34, y]); A.push([-1300, 2900]); return pts(A); };

// alev ikinci ışığının düşebileceği yüzeyler (mekanlar §1.6): cephe, saçak altı, alın tahtası, tank, zemin — gök yok
const alevYuzey = (pr: Proj) => {
  const Q = (A: V3[]) => <polygon points={pts(A.map(pr.P))} />;
  const tank = hull(Array.from({ length: 24 }).flatMap((_, i) => [pr.P(tankNokta(TANK.L / 2, i * 15)), pr.P(tankNokta(-TANK.L / 2, i * 15))]).filter(Boolean) as P[]);
  return <>{Q([W(sMax, 0, 0), W(sMin, 0, 0), W(sMin, 0, B1.duvar), W(sMax, 0, B1.duvar)])}{Q([W(sMax, 0, B1.alinAlt), W(sMin, 0, B1.alinAlt), W(sMin, B1.sacak + 0.05, B1.alinAlt), W(sMax, B1.sacak + 0.05, B1.alinAlt)])}
    {Q([W(sMax, B1.sacak, B1.alinAlt), W(sMin, B1.sacak, B1.alinAlt), W(sMin, B1.sacak, B1.alinUst + 0.04), W(sMax, B1.sacak, B1.alinUst + 0.04)])}<polygon points={pts(tank)} /><polygon points={zeminCokgen(pr, [W(sMax + 1, 0, 0), W(sMin - 2, 0, 0), W(sMin - 2, 5, 0), W(sMax + 1, 5, 0)])} /></>;
};

// ---------- sahne ----------
const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const { g, pr } = kamera(plan, p), k = kameraHesapla(plan.kamera, p);
  const yanik = param<{ oran?: number } | null>(plan, "yanik", null)?.oran ?? (g === "yanik" ? 1 : 0);
  const alevVar = alevler(plan).some((a) => p >= a.bas);
  const suru = param<SuruAyar | null>(plan, "suru", null);
  const vin = param<{ kare: number[]; deger: number[] } | null>(plan, "vinyet", null);
  const vinD = vin ? interpolate(p, vin.kare, vin.deger, cl) : 0;
  const bs = baskiDurum(plan, p);
  const katKlip = (i: number) => (bs.aktif && bs.ilerle - i < 1 ? `url(#cuBaski${i})` : undefined);
  const katGor = (i: number) => !bs.aktif || bs.ilerle - i > 0;
  const tankZ = pr.z(W(0, TANK.t, 0));
  const calis = CALILAR.map((c) => ({ ...c, z: pr.z(c.v) })).filter((c) => c.z > 0.5);
  if (td(plan)) tunekListesi(pr, td(plan)!.adet).forEach((t, i) => kilit.push({ ad: `tünek ${i}`, p: [540 + k.cx + (t.e![0] - 540) * k.cs, 960 + k.cy + (t.e![1] - 960) * k.cs], tur: "temas" }));
  const H = cizimHatlari();
  const T1 = [H.H2[0], H.H2[1], H.H3[1], H.H3[0]], T2 = [H.H3[0], H.H3[1], H.H4[1], H.H4[0]];
  const kx = interpolate(bs.kirmizi, [0, 1], [-200, 1280]);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <pattern id="cuTarama" patternUnits="userSpaceOnUse" width={7} height={7} patternTransform="rotate(72)"><line x1={0} y1={3.5} x2={7} y2={3.5} stroke="#4a4160" strokeWidth={2.5} opacity={0.75} /></pattern>
        <pattern id="cuTaramaK" patternUnits="userSpaceOnUse" width={13.3} height={13.3} patternTransform="rotate(72)"><line x1={0} y1={6.65} x2={13.3} y2={6.65} stroke={CP.yanik} strokeWidth={4.75} /></pattern>
        <pattern id="cuTaramaR" patternUnits="userSpaceOnUse" width={13.3} height={13.3} patternTransform="rotate(72)"><line x1={0} y1={6.65} x2={13.3} y2={6.65} stroke={CP.kirmizi} strokeWidth={4.75} /></pattern>
        {[0, 1, 2, 3].map((i) => <clipPath key={i} id={`cuBaski${i}`}><polygon points={yirtik(-80 + 1240 * Math.min(1, Math.max(0, bs.ilerle - i)), `${i}`)} /></clipPath>)}
        <clipPath id="cuAlevKlip">{alevVar && alevYuzey(pr)}</clipPath>
        <radialGradient id="cuVin" cx="50%" cy="52%" r="75%"><stop offset="55%" stopColor="#2f2c45" stopOpacity={0} /><stop offset="100%" stopColor="#2f2c45" stopOpacity={1} /></radialGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={1920} fill={CP.kagit} />
      <g transform={katDonusum(k)}>
        {katGor(0) && <g clipPath={katKlip(0)}><Gok pr={pr} g={g} /><Sirt pr={pr} />
          <Bina pr={pr} s={stDen(-48, 60)[0]} t={stDen(-48, 60)[1]} L={4.9} Dr={3.7} H={2.8} mahya={3.1} tek renk="#b49bb0" golge="#9a8aa6" />
          <Bina pr={pr} s={stDen(-30, 22)[0]} t={stDen(-30, 22)[1]} L={18} Dr={9.1} H={3.6} mahya={5.0} renk="#a8939f" golge="#7d7090" cita />
          {[0, 1, 2].map((i) => <Bina key={i} pr={pr} s={stDen(-60 - 70 * i, 140 + 40 * i)[0]} t={stDen(-60 - 70 * i, 140 + 40 * i)[1]} L={20 + 14 * r(`ul${i}`)} Dr={8} H={2.6 + 1.6 * r(`uh${i}`)} mahya={4.2} renk="#b49bb0" golge="#a594ac" />)}
          {suru && <Suru A={suru} p={p} />}
        </g>}
        {katGor(2) && <g clipPath={katKlip(2)}><Zemin pr={pr} yanik={yanik} />
          {calis.map((c) => <Cali key={`g${c.k}`} pr={pr} v={c.v} h={c.h} k={c.k} golge />)}
          <Golgeler pr={pr} kat="zemin" />
          <SuruGolgesi pr={pr} plan={plan} p={p} kat="zemin" clipId="cuTankKlip" />
          {calis.filter((c) => c.z > tankZ).map((c) => <Cali key={c.k} pr={pr} v={c.v} h={c.h} k={c.k} />)}
        </g>}
        {katGor(1) && <g clipPath={katKlip(1)}><B1Ciz pr={pr} kat="duvar" yanik={yanik} alevIsik={0} /><Golgeler pr={pr} kat="duvar" /></g>}
        {katGor(3) && <g clipPath={katKlip(3)}><B1Ciz pr={pr} kat="sacak" yanik={yanik} alevIsik={0} /></g>}
        {katGor(2) && <g clipPath={katKlip(2)}>
          <TankCiz pr={pr} kurum={yanik} clipId="cuTankKlip" />
          <SuruGolgesi pr={pr} plan={plan} p={p} kat="tank" clipId="cuTankKlip" />
          <SemerCiz pr={pr} />
          {calis.filter((c) => c.z <= tankZ).map((c) => <Cali key={c.k} pr={pr} v={c.v} h={c.h} k={c.k} />)}
        </g>}
        <Tunemis pr={pr} plan={plan} p={p} alev={alevVar} />
        <Kivilcimlar pr={pr} plan={plan} p={p} />
        <Alev pr={pr} plan={plan} p={p} kat="isik" />
        <Alev pr={pr} plan={plan} p={p} kat="alev" />
        {(alevVar || param(plan, "duman", null)) && katGor(0) && <g clipPath={katKlip(0)}><Duman pr={pr} plan={plan} p={p} /></g>}
        <SuruGolgesi pr={pr} plan={plan} p={p} kat="yarasa" clipId="cuTankKlip" />
        {param<boolean>(plan, "on_plan", g === "genis") && <g><Cali pr={pr} v={C0} h={1.3} k={999} golge /><Cali pr={pr} v={C0} h={1.3} k={999} /></g>}
        {/* P12 baskı: çizim hatları (mürekkep) — gerçek katmanlar soldan sağa basılırken üstte kalır, bitince kalkar */}
        {bs.aktif && bs.ilerle < 4 && <g>
          {/* tarama: kx'in solu kömür, sağı kırmızı (P03'ten gelen) — kenar net, fade yok */}
          <clipPath id="cuKomur"><rect x={-1300} y={-900} width={kx + 1300} height={3800} /></clipPath>
          <clipPath id="cuKirmizi"><rect x={kx} y={-900} width={2600} height={3800} /></clipPath>
          {[T1, T2].map((T, i) => <g key={i}><polygon points={pts(T)} fill="url(#cuTaramaK)" clipPath="url(#cuKomur)" /><polygon points={pts(T)} fill="url(#cuTaramaR)" clipPath="url(#cuKirmizi)" /></g>)}
          {[H.H1, H.H2, H.H3].map((h, i) => <line key={i} x1={h[0][0]} y1={h[0][1]} x2={h[1][0]} y2={h[1][1]} stroke={CP.murekkep} strokeWidth={3.5 * 1.9} strokeLinecap="round" />)}
          {H.M.map((m, i) => <line key={`m${i}`} x1={m[0][0]} y1={m[0][1]} x2={m[1][0]} y2={m[1][1]} stroke={CP.murekkep} strokeWidth={3.5 * 1.9} strokeLinecap="round" />)}
        </g>}
      </g>
      {vinD > 0 && <rect x={0} y={0} width={1080} height={1920} fill="url(#cuVin)" opacity={vinD} />}
    </svg>
  );
};
const td = (plan: Plan) => param<TunekP | null>(plan, "tunek_dalgasi", null);
void CIKIS; void GOLGE_MAKS;

export const COL_US: Sablon = { Sahne, arsiv: () => "litografi", darbeKendi: false };
