// ===== KE-PK-S2 MONTMARTRE — HAVADAN PARİS v2 (mekanlar §2v2-G2; tasarım §14.2) =====
// P07 A (`gok`, yön 310° KB, ışık havaGeri: güneş kameranın arkasında): ray yelpazesi → hale cam çatısı → Seine + Pont d'Austerlitz
// → Île Saint-Louis → Notre-Dame (flèche'li, 1859 sonrası) + Panthéon (haçlı) ×1.8 (veduta, tur-12 onayı) → mansard/baca çatı denizi.
// Çatı denizi "satır" dili (G2.4): her sıra = ön cephe şeridi + mansard brisis/terrasson (ya da eğik çatı) + parsel sınırında baca kümesi.
// P07 B (`sepet`, GGD, kontrajur haleSabah): yalnız çatı denizi (imza yok), cepheler gölgede.
// Dünya: X sağ, h yukarı, D ileri (m), kamera (0, Hc, −drift). ekran = (540 + X·F/D', U + (Hc − h)·F/D'), D' = D + drift.
// Seed sabit (173 çatı, 182 ray, 184 ağaç), kaynamaz. Kırmızı yok. Yeni hex yok (G2.6). Gölge yüzünde 78° tarama yalnız D < 700.
import React from "react";
import type { P } from "../../tipler";
import { karis, GokBasamak } from "./montmartreDekor";
import { ISIK_YON, IsikAd, lerp, PAL, pts, rng } from "./montmartreDunya";

const F = 1500;
/** güneşe sırt gök (G2.5 = tasarım §14.2 P10a satırı; yeni hex yok) */
const GOK_SIRT = ["#6f86ad", "#8fa3c0", "#a9b7cc", "#c9c8d2", "#dcd0d0"];
type Cam = { Hc: number; drift: number; U: number };
const prj = (c: Cam, X: number, h: number, D: number): P => { const d = Math.max(0.5, D + c.drift); return [540 + (X * F) / d, c.U + ((c.Hc - h) * F) / d]; };
const bugu = (renk: string, D: number) => { const a = Math.min(0.62, Math.max(0, (D - 250) / 2300)); return a <= 0.01 ? renk : karis(renk, "#dccfcf", a); };
const P2 = (q: P) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`;

// ---------------------------------------------------------------- coğrafya (G2.2; [G] ±100 m) ----------------------------------------------------------------
const SEINE_ORTA: [number, number][] = [[-50, 170], [684, 170], [1000, 190], [1500, 227], [2000, 265], [2600, 199], [3400, 110], [6500, 20]];
const seineOrta = (D: number) => { for (let i = 1; i < SEINE_ORTA.length; i++) { const [d0, x0] = SEINE_ORTA[i - 1], [d1, x1] = SEINE_ORTA[i]; if (D <= d1) return lerp(x0, x1, (D - d0) / (d1 - d0)); } return 20; };
const SEINE_EN = 150;
const seineSol = (D: number) => (D <= 684 ? 95 : seineOrta(D) - SEINE_EN / 2);
const seineSag = (D: number) => seineOrta(D) + SEINE_EN / 2 + (D <= 684 ? 0 : 0);
// hale (G2.2): ağız ekseni (27.9, 330) → baş (61.8, 635); en 51.2, saçak 23, mahya 35
const HALE_A: [number, number] = [27.9, 330], HALE_B: [number, number] = [61.8, 635];
const HALE_EKS = (() => { const dx = HALE_B[0] - HALE_A[0], dz = HALE_B[1] - HALE_A[1], L = Math.hypot(dx, dz); return { a: [dx / L, dz / L] as [number, number], n: [dz / L, -dx / L] as [number, number], L }; })();
const halePt = (s: number, t: number): [number, number] => [HALE_A[0] + HALE_EKS.a[0] * s + HALE_EKS.n[0] * t, HALE_A[1] + HALE_EKS.a[1] * s + HALE_EKS.n[1] * t];
// bulvar yarığı (Bd de l'Hôpital yönü): (40, 638) → batı-kuzey; en 40 m
const BUL_A: [number, number] = [40, 638], BUL_Y: [number, number] = (() => { const v = [-230, -109], L = Math.hypot(v[0], v[1]); return [v[0] / L, v[1] / L] as [number, number]; })();
const bulvarUzak = (X: number, D: number) => { const dx = X - BUL_A[0], dz = D - BUL_A[1], s = dx * BUL_Y[0] + dz * BUL_Y[1]; return { s, t: Math.abs(-dx * BUL_Y[1] + dz * BUL_Y[0]) }; };
const JARDIN = { X0: -420, X1: -20, D0: 700, D1: 1200 };

/** bina konamaz yer (G2.2): ray sahası + hangarlar, hale, Seine + rıhtım, Jardin, bulvar */
const bos = (X: number, D: number, imza: boolean): boolean => {
  if (!imza) return false;
  if (D < 345 && X > -125 && X < 115) return true; // ray sahası + hangarlar
  if (D < 700 && X > 55) return true; // rıhtım + Seine (yakın)
  if (X > seineSol(D) - 6 && X < seineSag(D) + 6) return true;
  { const dx = X - HALE_A[0], dz = D - HALE_A[1], s = dx * HALE_EKS.a[0] + dz * HALE_EKS.a[1], t = dx * HALE_EKS.n[0] + dz * HALE_EKS.n[1]; if (s > -15 && s < HALE_EKS.L + 8 && Math.abs(t) < 34) return true; }
  if (X > JARDIN.X0 && X < JARDIN.X1 && D > JARDIN.D0 && D < JARDIN.D1) return true;
  { const b = bulvarUzak(X, D); if (b.s > -10 && b.t < 22) return true; }
  return false;
};

// ---------------------------------------------------------------- çatı denizi modeli (satır) ----------------------------------------------------------------
type Bina = { ton: number; X0: number; X1: number; D: number; h: number; derin: number; cati: "mansard" | "egik"; baca: boolean; kulah: number; sokakSol: boolean; sokakSag: boolean };
const modelCache = new Map<string, Bina[]>();
const satirModel = (seed: number, imza: boolean, Dmin: number): Bina[] => {
  const key = `${seed}-${imza}-${Dmin}`, c = modelCache.get(key); if (c) return c;
  const r = rng(seed), out: Bina[] = [];
  const ln = (a: number, b: number) => Math.exp(Math.log(a) + r() * (Math.log(b) - Math.log(a)));
  // global sokak X'leri (bakış eksenine koşut, VP'ye yakınsar): 80–150 m aralık, sokak eni 10–16 m
  const sokak: [number, number][] = []; for (let x = -4200; x < 4200; x += ln(80, 150)) sokak.push([x, 10 + r() * 6]);
  const sokakta = (X: number) => sokak.find(([x, w]) => Math.abs(X - x) < w / 2);
  let D = Dmin, onceAra = -1, tekrar = 0;
  while (D < 6200) {
    const uzak = D > 1500;
    let ara = uzak ? ln(140, 260) : ln(50, 110);
    if (Math.abs(ara - onceAra) < 8) { tekrar++; if (tekrar >= 2) { ara *= 1.35; tekrar = 0; } } else tekrar = 0;
    onceAra = ara;
    const Xm = (760 * (D + 80)) / F + 60;
    let X = -Xm, kat = 5 + Math.floor(r() * 3);
    while (X < Xm) {
      const w = uzak ? ln(30, 70) : 8 + r() * 12;
      const X1 = X + w, mx = (X + X1) / 2;
      const s0 = sokakta(X), s1 = sokakta(X1), sm = sokakta(mx);
      if (sm || bos(mx, D + 4, imza) || bos(X, D, imza) || bos(X1, D, imza)) { X = X1; continue; }
      let yeni = 5 + Math.floor(r() * 3); if (yeni === kat) yeni = yeni >= 7 ? 5 : yeni + 1; kat = yeni;
      const eski = r() < 0.15, kose = r() < 0.05;
      const h = eski ? 7 + r() * 3 : kat * 3.1 + 1.2 + (kose ? 3 : 0);
      out.push({ ton: Math.floor(r() * 3), X0: s0 ? s0[0] + s0[1] / 2 : X, X1: s1 ? s1[0] - s1[1] / 2 : X1, D: D + (r() - 0.5) * 3, h, derin: 11 + r() * 4, cati: !eski && r() < 0.6 ? "mansard" : "egik", baca: r() < 0.85, kulah: 3 + Math.floor(r() * 6), sokakSol: !!s0, sokakSag: !!s1 });
      X = X1;
    }
    D += ara;
  }
  out.sort((a, b) => b.D - a.D);
  modelCache.set(key, out);
  return out;
};

// ---------------------------------------------------------------- anıtlar (G2.3, ×1.8, taban noktası etrafında) ----------------------------------------------------------------
const NotreDame: React.FC<{ c: Cam; X: number; D: number; o: number }> = ({ c, X, D, o }) => {
  const b = prj(c, X, 0, D), s = (F / (D + c.drift)) * o; // px / gerçek m (×o)
  const x = (m: number) => b[0] + m * s, y = (m: number) => b[1] - m * s;
  const kontur = { stroke: "#8d85a6", strokeWidth: 1.5, strokeLinejoin: "round" as const };
  const govde = "#b0a6c0", isik = "#d8b8a4", golge = "#9a92ae", cati = "#8d85a6";
  return (
    <g>
      {/* iki kare kule (arkada, yan yana, düz tepe 69 m) */}
      {[-1, 1].map((k) => <g key={k}><rect x={x(k * 13 - 7.5)} y={y(69)} width={15 * s} height={69 * s} fill={k < 0 ? govde : golge} {...kontur} /><rect x={x(k * 13 - 7.5)} y={y(69)} width={15 * s} height={2.2 * s} fill={cati} /><rect x={x(k * 13 - 3)} y={y(60)} width={2 * s} height={9 * s} fill={cati} /><rect x={x(k * 13 + 1)} y={y(60)} width={2 * s} height={9 * s} fill={cati} /></g>)}
      {/* yan nefler (h 20) + nef (çatı sırtı 43 m) */}
      <rect x={x(-20)} y={y(22)} width={40 * s} height={22 * s} fill={govde} {...kontur} />
      <rect x={x(5)} y={y(22)} width={15 * s} height={22 * s} fill={golge} />
      <polygon points={pts([[x(-7.5), y(33)], [x(0), y(43)], [x(7.5), y(33)], [x(7.5), y(22)], [x(-7.5), y(22)]])} fill={cati} {...kontur} />
      {/* uçan payanda tikleri */}
      {[-1, 1].map((k) => [0, 1, 2].map((i) => <line key={`${k}${i}`} x1={x(k * (19 - i * 1.5))} y1={y(22 + i * 0.5)} x2={x(k * 8)} y2={y(31 - i * 1.5)} stroke={cati} strokeWidth={Math.max(1, 1.2 * s)} />))}
      {/* flèche (96 m, 1859) */}
      <polygon points={pts([[x(-2.2), y(43)], [x(0), y(96)], [x(2.2), y(43)]])} fill={cati} {...kontur} />
      {/* apsis: yarım daire, ışıkta (kameraya bakar), konik çatı */}
      <path d={`M${x(-11)} ${y(0)}L${x(-11)} ${y(18)}A${11 * s} ${4 * s} 0 0 1 ${x(11)} ${y(18)}L${x(11)} ${y(0)}Z`} fill={isik} {...kontur} />
      <polygon points={pts([[x(-11), y(18)], [x(0), y(30)], [x(11), y(18)]])} fill={cati} {...kontur} />
      <polygon points={pts([[x(-11), y(18)], [x(0), y(30)], [x(-2), y(18)]])} fill={govde} />
    </g>
  );
};
const Pantheon: React.FC<{ c: Cam; X: number; D: number; o: number }> = ({ c, X, D, o }) => {
  const b = prj(c, X, 0, D), s = (F / (D + c.drift)) * o;
  const x = (m: number) => b[0] + m * s, y = (m: number) => b[1] - m * s;
  const kontur = { stroke: "#8d85a6", strokeWidth: 1.5, strokeLinejoin: "round" as const };
  const R = 16.5; // kubbe yarıçapı (×1.8 → en ≈ 46 px @ D 1892)
  return (
    <g>
      <rect x={x(-40)} y={y(30)} width={80 * s} height={30 * s} fill="#b0a6c0" {...kontur} />
      <rect x={x(15)} y={y(30)} width={25 * s} height={30 * s} fill="#9a92ae" />
      <rect x={x(-21)} y={y(38)} width={42 * s} height={8 * s} fill="#b0a6c0" {...kontur} />
      {/* sütunlu kasnak */}
      <rect x={x(-R - 1.5)} y={y(56)} width={(2 * R + 3) * s} height={18 * s} fill="#d8b8a4" {...kontur} />
      {Array.from({ length: 9 }, (_, i) => <line key={i} x1={x(-R + (i * 2 * R) / 8)} y1={y(55)} x2={x(-R + (i * 2 * R) / 8)} y2={y(39)} stroke="#9a92ae" strokeWidth={Math.max(1, 1.1 * s)} />)}
      <rect x={x(-R - 2.5)} y={y(57.5)} width={(2 * R + 5) * s} height={2 * s} fill="#8d85a6" />
      {/* kubbe: sol yarı ışık, sağ yarı gölge */}
      <path d={`M${x(-R)} ${y(57)}A${R * s} ${R * 1.05 * s} 0 0 1 ${x(R)} ${y(57)}Z`} fill="#9a92ae" {...kontur} />
      <path d={`M${x(-R)} ${y(57)}A${R * s} ${R * 1.05 * s} 0 0 1 ${x(0)} ${y(57 + R * 1.05)}L${x(0)} ${y(57)}Z`} fill="#d8b8a4" />
      <path d={`M${x(-R)} ${y(57)}A${R * s} ${R * 1.05 * s} 0 0 1 ${x(R)} ${y(57)}`} fill="none" stroke="#8d85a6" strokeWidth={1.5} />
      {/* fener + küçük haç (1851–71, E3.4) */}
      <rect x={x(-2.6)} y={y(80)} width={5.2 * s} height={7 * s} fill="#b0a6c0" {...kontur} />
      <path d={`M${x(-3)} ${y(80)}Q${x(0)} ${y(83)} ${x(3)} ${y(80)}`} fill="#8d85a6" />
      <line x1={x(0)} y1={y(80.5)} x2={x(0)} y2={y(87)} stroke="#8d85a6" strokeWidth={1.5} />
      <line x1={x(-1.4)} y1={y(85.2)} x2={x(1.4)} y2={y(85.2)} stroke="#8d85a6" strokeWidth={1.5} />
    </g>
  );
};

// ---------------------------------------------------------------- ana bileşen ----------------------------------------------------------------
export const HavadanParis: React.FC<{ H: number; zeminUstu?: number; drift?: number; U: number; seed: number; isik: IsikAd; imza?: boolean; anitOlcek?: number; uid: string; gokIsima?: boolean }> = ({ H, zeminUstu = 20, drift = 0, U, seed, isik, imza = true, anitOlcek = 1.8, uid, gokIsima = false }) => {
  const c: Cam = { Hc: H + zeminUstu, drift, U };
  const p = (X: number, h: number, D: number) => prj(c, X, h, D);
  const L = ISIK_YON[isik]; // ışığa doğru (X, h, D)
  const isikta = (nx: number, nD: number) => nx * L[0] + nD * L[2] > 0.02;
  const Dalt = (c.Hc * F) / (1990 - U) - drift; // alt kenarın zemin D'si
  const D0 = Math.max(imza ? 105 : 40, Dalt * 0.9);
  const tar = `${uid}hp-t`;
  const zemin: React.ReactNode[] = [], dik: { D: number; el: React.ReactNode }[] = [];
  // ---- zemin: kentin taban tonu (gölgedeki sokak) + uzak buğu bandı ----
  const ufkY = p(0, 0, 9000)[1];
  zemin.push(<rect key="z0" x={-400} y={ufkY - 6} width={1900} height={2400} fill="#9a92ae" />);
  zemin.push(<rect key="z1" x={-400} y={ufkY - 6} width={1900} height={p(0, 0, 2400)[1] - ufkY + 6} fill="#dccfcf" opacity={0.85} />);
  if (imza) {
    // ---- ray sahası (G9) + ray yelpazesi ağza (seed 182) ----
    const Db = Math.max(D0, 30);
    zemin.push(<polygon key="saha" points={pts([p(-130, 0, Db), p(130, 0, Db), p(118, 0, 345), p(55, 0, 345), p(0, 0, 345), p(-125, 0, 345)])} fill={PAL.toprak} />);
    const hat = 20, rr = rng(182);
    const raylar: string[] = [], balast: React.ReactNode[] = [];
    for (let i = 0; i < hat; i++) {
      const xb = -70 + i * 8 + (rr() - 0.5) * 1.5, j = Math.round((i * 8) / (hat - 1)), xm = 10 + j * 4.5;
      const a = p(xb, 0, 110), b = p(xm, 0, 330);
      balast.push(<polygon key={`bl${i}`} points={pts([p(xb - 1.6, 0, 110), p(xb + 1.6, 0, 110), p(xm + 1.4, 0, 330), p(xm - 1.4, 0, 330)])} fill="#d3bba6" />);
      // D < 250 çift ray (1.435 m), ötesi tek çizgi
      const m = (t: number, o: number) => p(lerp(xb, xm, t) + o, 0, lerp(110, 330, t));
      const tk = (250 - 110) / 220;
      raylar.push(`M${P2(m(0, -0.72))}L${P2(m(tk, -0.72))}M${P2(m(0, 0.72))}L${P2(m(tk, 0.72))}`);
      raylar.push(`M${P2(m(tk, 0))}L${P2(b)}`);
      void a;
    }
    zemin.push(<g key="ray">{balast}<path d={raylar.join("")} fill="none" stroke="#6a6280" strokeWidth={2.5} /></g>);
    // ---- rıhtım (Quai d'Austerlitz) yolu + Seine (G5/G3) ----
    zemin.push(<polygon key="rihtim" points={pts([p(58, 0, Db), p(95, 0, Db), p(95, 0, 700), p(58, 0, 700)])} fill="#d3bba6" />);
    const Ds: number[] = []; for (let D = Db; D < 6400; D *= 1.04) Ds.push(D);
    const sol = Ds.map((D) => p(seineSol(D), 0, D)), sag = Ds.map((D) => p(seineSag(D), 0, D));
    zemin.push(<polygon key="seine" points={pts([...sol, ...sag.reverse()])} fill="#cdc6d0" />);
    zemin.push(<polygon key="seineU" points={pts([...Ds.filter((D) => D > 1200).map((D) => p(seineSol(D), 0, D)), ...Ds.filter((D) => D > 1200).map((D) => p(seineSag(D), 0, D)).reverse()])} fill="#dccfcf" />);
    // su çizgileri: yatay, kesik (30–90 px), D < 700'de 2 px / 7 px aralık → uzakta 1.5 px / 4 px; kıyıya yakın sık
    { const r2 = rng(185), su: string[] = [], su2: string[] = []; let D = Db + 3;
      while (D < 2600) { const y = p(0, 0, D)[1], xl = p(seineSol(D), 0, D)[0], xr = p(seineSag(D), 0, D)[0]; const n = Math.max(1, Math.round((xr - xl) / 120));
        for (let k = 0; k < n; k++) { const L0 = 30 + r2() * 60, kiyi = r2() < 0.5 ? xl + r2() * 60 : xl + r2() * (xr - xl); const x0 = Math.max(xl + 3, kiyi), x1 = Math.min(xr - 3, x0 + L0 * Math.min(1, 900 / D)); if (x1 > x0 + 4) (D < 700 ? su : su2).push(`M${x0.toFixed(1)} ${y.toFixed(1)}L${x1.toFixed(1)} ${y.toFixed(1)}`); }
        const ar = D < 700 ? 7 : 4; if (y - ar - U < 2) break; D = (c.Hc * F) / (y - ar - U) - drift; }
      zemin.push(<path key="su" d={su.join("")} fill="none" stroke="#9a92ae" strokeWidth={2} />, <path key="su2" d={su2.join("")} fill="none" stroke="#9a92ae" strokeWidth={1.5} />); }
    // rıhtım duvarı (sol kıyı)
    zemin.push(<path key="kiyi" d={`M${Ds.filter((D) => D < 2600).map((D) => P2(p(seineSol(D), 0, D))).join("L")}`} fill="none" stroke="#7a7394" strokeWidth={2.5} />);
    zemin.push(<path key="kiyiU" d={`M${Ds.filter((D) => D < 1500).map((D) => P2(p(seineSol(D) - 1.5, 0, D))).join("L")}`} fill="none" stroke="#e0c8b2" strokeWidth={1.5} />);
    // ---- bulvar yarığı (ağaçlı, adsız) + Jardin des Plantes zemini ----
    const bA = (s0: number, t0: number): P => p(BUL_A[0] + BUL_Y[0] * s0 - BUL_Y[1] * t0, 0, BUL_A[1] + BUL_Y[1] * s0 + BUL_Y[0] * t0);
    zemin.push(<polygon key="bul" points={pts([bA(-8, -20), bA(2400, -20), bA(2400, 20), bA(-8, 20)])} fill="#d3bba6" />);
    zemin.push(<polygon key="jar" points={pts([p(JARDIN.X0, 0, JARDIN.D0), p(JARDIN.X1, 0, JARDIN.D0), p(JARDIN.X1, 0, JARDIN.D1), p(JARDIN.X0, 0, JARDIN.D1)])} fill="#b0a6c0" />);
    // ---- ağaçlar (kış, çıplak): bulvar iki sırası, rıhtım tek sıra, Jardin kütlesi — küçük dallı fırça lekesi ----
    const agac = (X: number, D: number, key: string) => { const q = p(X, 0, D), s = F / (D + drift), hgt = 10 * s, w = 4 * s; if (hgt < 3) return null; return { D, el: <g key={key}><ellipse cx={q[0]} cy={q[1] - hgt * 0.62} rx={w * 1.05} ry={hgt * 0.36} fill="#9a92ae" opacity={0.9} /><path d={`M${q[0]} ${q[1]}L${q[0]} ${q[1] - hgt * 0.45}M${q[0]} ${q[1] - hgt * 0.35}L${q[0] - w * 0.8} ${q[1] - hgt * 0.85}M${q[0]} ${q[1] - hgt * 0.45}L${q[0] + w * 0.7} ${q[1] - hgt * 0.95}M${q[0]} ${q[1] - hgt * 0.5}L${q[0] + w * 0.1} ${q[1] - hgt}`} stroke="#6a6280" strokeWidth={Math.max(1, 0.35 * s)} fill="none" /></g> }; };
    const ra = rng(184);
    for (let s0 = 0; s0 < 2400; s0 += 9 + ra() * 3) { if (ra() < 0.1) continue; for (const t0 of [-15, 15]) { const X = BUL_A[0] + BUL_Y[0] * s0 - BUL_Y[1] * t0, D = BUL_A[1] + BUL_Y[1] * s0 + BUL_Y[0] * t0; if (D > D0) { const a = agac(X, D, `ba${s0.toFixed(0)}${t0}`); if (a) dik.push(a); } } }
    for (let D = Db; D < 690; D += 9 + ra() * 3) { if (ra() < 0.1) continue; const a = agac(78, D, `ra${D.toFixed(0)}`); if (a) dik.push(a); }
    for (let i = 0; i < 260; i++) { const X = lerp(JARDIN.X0 + 10, JARDIN.X1 - 10, ra()), D = lerp(JARDIN.D0 + 10, JARDIN.D1 - 10, ra()); const a = agac(X, D, `ja${i}`); if (a) dik.push(a); }
    // ---- Pont d'Austerlitz (D 684; taş, 5 basık kemer) ----
    { const D = 684, xl = 95, xr = 245, dek = 10;
      const kemer: string[] = []; const ayak = 4, aç = (xr - xl - ayak * 6) / 5;
      for (let i = 0; i < 5; i++) { const a0 = xl + ayak + i * (aç + ayak), a1 = a0 + aç, A = p(a0, 0, D), B = p(a1, 0, D), Ab = p(a0, 4, D), Bb = p(a1, 4, D), T = p((a0 + a1) / 2, 7.2, D); kemer.push(`M${P2(A)}L${P2(Ab)}Q${P2([T[0], 2 * T[1] - (Ab[1] + Bb[1]) / 2])} ${P2(Bb)}L${P2(B)}Z`); }
      const yuz = [p(xl - 3, 0, D), p(xr + 3, 0, D), p(xr + 3, dek, D), p(xl - 3, dek, D)];
      const ust = [p(xl - 3, dek, D), p(xr + 3, dek, D), p(xr + 3, dek, D + 18), p(xl - 3, dek, D + 18)];
      dik.push({ D, el: <g key="kopru"><polygon points={pts(ust)} fill="#a89fbe" /><polygon points={pts(yuz)} fill="#e0c8b2" stroke="#7a7394" strokeWidth={2.5} strokeLinejoin="round" /><path d={kemer.join("")} fill="#7a7394" /><line x1={yuz[3][0]} y1={yuz[3][1] + 1} x2={yuz[2][0]} y2={yuz[2][1] + 1} stroke="#f0c4a8" strokeWidth={1} /></g> }); }
    // ---- Île Saint-Louis (D 1650–2050) ----
    { const ada: P[] = [], adaU: P[] = [], Dl = [1650, 1720, 1820, 1940, 2050];
      const yari = (D: number) => 26 * Math.sin(Math.PI * Math.min(1, Math.max(0, (D - 1650) / 400)) ** 0.6) + 2;
      for (const D of Dl) { ada.push(p(seineOrta(D) - yari(D), 0, D)); adaU.push(p(seineOrta(D) - yari(D), 16, D)); }
      const sagK = Dl.map((D) => p(seineOrta(D) + yari(D), 16, D)).reverse();
      dik.push({ D: 1650, el: <g key="ada"><polygon points={pts([...adaU, ...sagK])} fill={bugu("#9a92ae", 1800)} /><line x1={p(seineOrta(1660) - 20, 16, 1660)[0]} y1={p(0, 16, 1660)[1]} x2={p(seineOrta(1660) + 20, 16, 1660)[0]} y2={p(0, 16, 1660)[1]} stroke={bugu("#d8b8a4", 1800)} strokeWidth={2} /><polygon points={pts([p(seineOrta(1655) - 22, 0, 1655), p(seineOrta(1655) + 22, 0, 1655), p(seineOrta(1655) + 22, 16, 1655), p(seineOrta(1655) - 22, 16, 1655)])} fill={bugu("#d8b8a4", 1700)} /></g> }); }
    // ---- anıtlar ----
    dik.push({ D: 2182, el: <g key="nd"><NotreDame c={c} X={172} D={2182} o={anitOlcek} /></g> });
    dik.push({ D: 1892, el: <g key="pa"><Pantheon c={c} X={-572} D={1892} o={anitOlcek} /></g> });
    // ---- HALE üstten (G7): sağ yan duvar, iki çatı eğimi + cam şerit, alın camı + 4 kayıt, ağız ----
    { const sac = 23, mah = 35, yw = 25.6;
      const q = (s0: number, t0: number, h: number) => { const [X, D] = halePt(s0, t0); return p(X, h, D); };
      const Lh = HALE_EKS.L;
      const sagDuvar = [q(0, yw, 0), q(Lh, yw, 0), q(Lh, yw, sac), q(0, yw, sac)];
      const solEgim = (u0: number, u1: number) => [q(0, -yw + yw * u0, sac + (mah - sac) * u0), q(Lh, -yw + yw * u0, sac + (mah - sac) * u0), q(Lh, -yw + yw * u1, sac + (mah - sac) * u1), q(0, -yw + yw * u1, sac + (mah - sac) * u1)];
      const sagEgim = (u0: number, u1: number) => [q(0, yw - yw * u0, sac + (mah - sac) * u0), q(Lh, yw - yw * u0, sac + (mah - sac) * u0), q(Lh, yw - yw * u1, sac + (mah - sac) * u1), q(0, yw - yw * u1, sac + (mah - sac) * u1)];
      const alin = [q(0, -yw, sac), q(0, yw, sac), q(0, 0, mah)];
      const agiz = [q(0, -yw, 0), q(0, yw, 0), q(0, yw, sac), q(0, -yw, sac)];
      const kayit = [-0.62, -0.25, 0.18, 0.55].map((t, i) => { const tt = t * yw, top = sac + (mah - sac) * (1 - Math.abs(tt) / yw); const a = q(0, tt, sac), b = q(0, tt, top); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#4a4560" strokeWidth={2.5} />; });
      const camA = (u: number) => u * Lh;
      const camlar = [0, 1].map((k) => { const E = k ? sagEgim : solEgim; const qd = E(0.3, 0.7), son = (u: number) => [qd[0], qd[3]].map((_, j) => j); void son; return <g key={`cm${k}`}><polygon points={pts(qd)} fill="#cdc6d0" stroke="#4a4560" strokeWidth={1.5} />{[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((u, j) => { const a = q(camA(u), (k ? 1 : -1) * yw * 0.7, sac + (mah - sac) * 0.3), b = q(camA(u), (k ? 1 : -1) * yw * 0.3, sac + (mah - sac) * 0.7); return <line key={j} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#7a7394" strokeWidth={1.5} />; })}<polygon points={pts([qd[0], q(camA(0.12), (k ? 1 : -1) * yw * 0.7, sac + (mah - sac) * 0.3), q(camA(0.12), (k ? 1 : -1) * yw * 0.3, sac + (mah - sac) * 0.7), qd[3]])} fill="#dccfcf" /></g>; });
      dik.push({ D: 330, el: <g key="hale" strokeLinejoin="round">
        <polygon points={pts(sagDuvar)} fill="#7a7394" stroke="#4a4560" strokeWidth={2.5} />
        <polygon points={pts(sagDuvar)} fill={`url(#${tar})`} />
        <polygon points={pts(solEgim(0, 1))} fill="#a89fbe" stroke="#4a4560" strokeWidth={2.5} />
        <polygon points={pts(sagEgim(0, 1))} fill="#7a7394" stroke="#4a4560" strokeWidth={2.5} />
        <polygon points={pts(sagEgim(0, 0.3))} fill={`url(#${tar})`} /><polygon points={pts(sagEgim(0.7, 1))} fill={`url(#${tar})`} />
        {camlar}
        <line x1={q(0, 0, mah)[0]} y1={q(0, 0, mah)[1]} x2={q(Lh, 0, mah)[0]} y2={q(Lh, 0, mah)[1]} stroke="#4a4560" strokeWidth={3} />
        <polygon points={pts(agiz)} fill="#5a5278" />
        <polygon points={pts(alin)} fill="#dccfcf" stroke="#4a4560" strokeWidth={4} />{kayit}
        <line x1={agiz[3][0]} y1={agiz[3][1]} x2={agiz[2][0]} y2={agiz[2][1]} stroke="#4a4560" strokeWidth={4} />
        <line x1={alin[0][0]} y1={alin[0][1] - 1.5} x2={alin[2][0]} y2={alin[2][1] - 1.5} stroke="#f0c4a8" strokeWidth={1.5} />
      </g> }); }
    // ---- saha hangarları (beşik çatı, alın kameraya: düz başlıklı büyük kapı; kemer yok) + duran 4 vagon ----
    for (const [xa, xb] of [[-112, -90], [-86, -64]] as [number, number][]) {
      const D1 = 130, D2 = 320, sac = 8, mah = 12, xm = (xa + xb) / 2;
      const alin = [p(xa, 0, D1), p(xb, 0, D1), p(xb, sac, D1), p(xm, mah, D1), p(xa, sac, D1)];
      const solC = [p(xa, sac, D1), p(xm, mah, D1), p(xm, mah, D2), p(xa, sac, D2)], sagC = [p(xm, mah, D1), p(xb, sac, D1), p(xb, sac, D2), p(xm, mah, D2)];
      const sagD = [p(xb, 0, D1), p(xb, 0, D2), p(xb, sac, D2), p(xb, sac, D1)];
      const kapi = [p(xm - 6, 0, D1), p(xm + 6, 0, D1), p(xm + 6, 6, D1), p(xm - 6, 6, D1)];
      dik.push({ D: D1, el: <g key={`hg${xa}`} strokeLinejoin="round"><polygon points={pts(sagD)} fill="#7a7394" stroke="#4a4560" strokeWidth={3} /><polygon points={pts(sagD)} fill={`url(#${tar})`} /><polygon points={pts(solC)} fill="#a89fbe" stroke="#4a4560" strokeWidth={3} /><polygon points={pts(sagC)} fill="#7a7394" stroke="#4a4560" strokeWidth={3} /><polygon points={pts(sagC)} fill={`url(#${tar})`} /><polygon points={pts(alin)} fill="#e0c8b2" stroke="#4a4560" strokeWidth={3} /><polygon points={pts(kapi)} fill="#5a5278" /></g> });
    }
    { const i = 2, xb = -70 + i * 8, j = Math.round((i * 8) / 19), xm = 10 + j * 4.5; const xAt = (D: number) => lerp(xb, xm, (D - 110) / 220);
      for (let v = 0; v < 4; v++) { const Da = 150 + v * 20.5, Db2 = Da + 18; const a = xAt(Da), b = xAt(Db2), w = 1.5, hh = 3.6;
        const on = [p(a - w, 0.6, Da), p(a + w, 0.6, Da), p(a + w, hh, Da), p(a - w, hh, Da)], tavan = [p(a - w, hh, Da), p(a + w, hh, Da), p(b + w, hh, Db2), p(b - w, hh, Db2)], sagY = [p(a + w, 0.6, Da), p(b + w, 0.6, Db2), p(b + w, hh, Db2), p(a + w, hh, Da)];
        dik.push({ D: Da, el: <g key={`vg${v}`} strokeLinejoin="round"><polygon points={pts(sagY)} fill="#7a7394" stroke="#4a4560" strokeWidth={2} /><polygon points={pts(sagY)} fill={`url(#${tar})`} /><polygon points={pts(tavan)} fill="#a89fbe" stroke="#4a4560" strokeWidth={2} /><polygon points={pts(on)} fill="#e0c8b2" stroke="#4a4560" strokeWidth={2} /></g> }); } }
  }
  // ---- çatı denizi (satır) ----
  const binalar = satirModel(seed, imza, D0);
  for (const b of binalar) {
    const D = b.D, Dv = D + drift; if (Dv < 30) continue;
    const xa = p(b.X0, 0, D)[0], xb = p(b.X1, 0, D)[0]; if (xb < -320 || xa > 1400) continue;
    const s = F / Dv, yak = D < 700, orta = D < 1500;
    const kont = D < 400 ? 2.5 : D < 700 ? 1.5 : 0;
    const cepheIsik = isikta(0, -1), yanSolIsik = isikta(-1, 0);
    const cR = bugu(cepheIsik ? ["#e0c8b2", "#d8b8a4", "#e8d0ba"][b.ton] : "#9a92ae", D), golgeR = bugu("#9a92ae", D), mansR = bugu("#a89fbe", D), terR = bugu("#b4abc8", D);
    const yuz = [p(b.X0, 0, D), p(b.X1, 0, D), p(b.X1, b.h, D), p(b.X0, b.h, D)];
    const el: React.ReactNode[] = [];
    // sokak yarığına bakan yan duvar (kameraya dönük taraf): X > 0'da sol yüz (ışık), X < 0'da sağ yüz (gölge + tarama)
    if (orta && b.sokakSag && b.X1 < 0) { const w = [p(b.X1, 0, D), p(b.X1, 0, D + b.derin), p(b.X1, b.h, D + b.derin), p(b.X1, b.h, D)]; el.push(<polygon key="ys" points={pts(w)} fill={golgeR} />); if (yak) el.push(<polygon key="yst" points={pts(w)} fill={`url(#${tar})`} />); }
    if (orta && b.sokakSol && b.X0 > 0) { const w = [p(b.X0, 0, D), p(b.X0, 0, D + b.derin), p(b.X0, b.h, D + b.derin), p(b.X0, b.h, D)]; el.push(<polygon key="yl" points={pts(w)} fill={bugu(yanSolIsik ? "#e0c8b2" : "#9a92ae", D)} />); }
    el.push(<polygon key="c" points={pts(yuz)} fill={cR} stroke={kont ? bugu("#7a7394", D) : "none"} strokeWidth={kont} strokeLinejoin="round" />);
    // pencere tikleri (yakın bant): 1.0 × 2.0 m, 3 m ritim; Haussmann dili: 2. ve son katta sürekli balkon çizgisi + saçak silmesi
    if (yak && s * 1.0 >= 2.5) { const n = Math.floor((b.X1 - b.X0 - 1.5) / 3), katN = Math.floor((b.h - 3) / 3.1), wd: string[] = []; for (let k = 0; k < katN; k++) for (let i = 0; i < n; i++) { const X = b.X0 + 1.5 + i * 3 + 0.4, hh = 1.2 + k * 3.1; const a = p(X, hh + 2, D); wd.push(`M${a[0].toFixed(1)} ${a[1].toFixed(1)}h${(1.0 * s).toFixed(1)}v${(2 * s).toFixed(1)}h${(-1.0 * s).toFixed(1)}Z`); } el.push(<path key="w" d={wd.join("")} fill={bugu("#7a7394", D)} />);
      if (b.h > 12) { const bl = [1.2 + 3.1, 1.2 + (katN - 1) * 3.1].map((hh) => { const a = p(b.X0 + 0.5, hh + 0.05, D), c2 = p(b.X1 - 0.5, hh + 0.05, D); return `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${c2[0].toFixed(1)} ${c2[1].toFixed(1)}`; }); el.push(<path key="bk" d={bl.join("")} stroke={bugu("#5a5278", D)} strokeWidth={Math.max(1.5, 0.5 * s)} />); }
    }
    if (orta) { const a = p(b.X0, b.h, D), c2 = p(b.X1, b.h, D); el.push(<line key="sm" x1={a[0]} y1={a[1] + 0.5} x2={c2[0]} y2={c2[1] + 0.5} stroke={bugu("#f0c4a8", D)} strokeWidth={Math.max(1, Math.min(2, 0.4 * s))} />); }
    // çatı
    if (b.cati === "mansard") {
      const br = [p(b.X0, b.h, D), p(b.X1, b.h, D), p(b.X1, b.h + 4.2, D + 1.5), p(b.X0, b.h + 4.2, D + 1.5)];
      const te = [p(b.X0, b.h + 4.2, D + 1.5), p(b.X1, b.h + 4.2, D + 1.5), p(b.X1, b.h + 4.7, D + b.derin), p(b.X0, b.h + 4.7, D + b.derin)];
      el.push(<polygon key="te" points={pts(te)} fill={terR} />, <polygon key="br" points={pts(br)} fill={mansR} stroke={kont ? bugu("#7a7394", D) : "none"} strokeWidth={kont * 0.6} />);
      if (yak && s * 1.0 >= 2.5) { const n = Math.floor((b.X1 - b.X0 - 1.5) / 3), ld: string[] = []; for (let i = 0; i < n; i++) { const a = p(b.X0 + 1.6 + i * 3, b.h + 3.4, D + 1.0); ld.push(`M${(a[0] - 0.25 * s).toFixed(1)} ${(a[1] - 0.4 * s).toFixed(1)}l${(0.75 * s).toFixed(1)} ${(-0.5 * s).toFixed(1)}l${(0.75 * s).toFixed(1)} ${(0.5 * s).toFixed(1)}v${(1.9 * s).toFixed(1)}h${(-1.5 * s).toFixed(1)}Z`); } el.push(<path key="lu" d={ld.join("")} fill={bugu("#e0c8b2", D)} stroke={bugu("#7a7394", D)} strokeWidth={Math.max(1, 0.35 * s)} />); }
    } else {
      const rid = b.h + (b.derin / 2) * 0.7;
      el.push(<polygon key="eg" points={pts([p(b.X0, b.h, D), p(b.X1, b.h, D), p(b.X1, rid, D + b.derin / 2), p(b.X0, rid, D + b.derin / 2)])} fill={bugu(cepheIsik ? "#b39a9e" : "#7a7394", D)} />);
    }
    // baca kümesi (parsel sınırında, cephe üstünden 2 m; tepede külah tikleri)
    if (b.baca && D < 1500 && s * 0.8 >= 0.7) {
      const X = b.X1 - 0.4, Dd = D + b.derin * 0.45, ht = b.h + (b.cati === "mansard" ? 4.7 : 3.6) + 2.4;
      const a = p(X - 0.5, b.h + 2, Dd), t2 = p(X + 0.5, ht, Dd), w = Math.max(2, t2[0] - a[0]), wl = Math.max(1.5, w * 0.45);
      el.push(<rect key="bc" x={a[0]} y={t2[1]} width={w} height={a[1] - t2[1]} fill={bugu("#8a6458", D)} />, <rect key="bci" x={a[0]} y={t2[1]} width={wl} height={a[1] - t2[1]} fill={bugu(cepheIsik ? "#c99a86" : "#8a6458", D)} />);
      if (D < 900) { const kk: string[] = []; for (let i = 0; i < b.kulah; i++) { const xk = a[0] + ((i + 0.5) / b.kulah) * w; kk.push(`M${xk.toFixed(1)} ${t2[1].toFixed(1)}v${(-Math.max(1.5, 0.7 * s)).toFixed(1)}`); } el.push(<path key="kl" d={kk.join("")} stroke={bugu("#4f4347", D)} strokeWidth={Math.max(1, Math.min(2, 0.3 * s))} />); }
    }
    dik.push({ D, el: <g key={`b${b.X0.toFixed(1)}-${D.toFixed(1)}`}>{el}</g> });
  }
  dik.sort((a, b) => b.D - a.D);
  // uzak ufuk buğusu (D > 3500): düz buğu bant + kesik ton şeritleri (G1)
  const ufuk = (() => { const r = rng(seed + 11), s: React.ReactNode[] = []; for (let i = 0; i < 90; i++) { const D = 2600 + r() * 5000, X = (r() - 0.5) * D * 1.1, q = p(X, 14 + r() * 8, D), w = (25 + r() * 70) * (F / D); s.push(<rect key={i} x={q[0]} y={q[1]} width={w} height={Math.max(1.5, (4 * F) / D)} fill={i % 3 ? "#b0a6c0" : "#d8b8a4"} opacity={0.55} />); } return s; })();
  return (
    <g>
      <defs><pattern id={tar} patternUnits="userSpaceOnUse" width={6} height={6} patternTransform="rotate(-12)"><rect x={0} y={0} width={2} height={6} fill="#5a5278" /></pattern></defs>
      <GokBasamak ufuk={U} seed={158} isima={gokIsima} renkler={isik === "havaGeri" ? GOK_SIRT : undefined} />
      {zemin}
      {ufuk}
      {dik.map((d) => d.el)}
    </g>
  );
};
