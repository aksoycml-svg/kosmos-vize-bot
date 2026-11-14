// ===== IC-ODA `oda: "elci-yatak"` — 1930'lar sonu diplomatik konut yatak odası (mekanlar.md §1; ilk 1940'lar kiti) =====
// Kutu oda: F 1150, ufuk 760, göz 1.6 m; X = 540 + u·F/z, Y = 760 + (1.6 − h)·F/z. arka (z) 5.0 · yari (u) 2.1 · tavan 3.2 — ODA BAŞINA parametre.
// Arka duvar soldan sağa: tek kişilik yatak · komodin + eklemli abajur lamba + deri kutu · iki kanatlı pencere (düz lento, perdeli) · banyo kapısı.
// Kemer YOK (düz lento). Kiriş/lucarne yok. Tavan + kartonpiyer görünür (göz < tavan).
// isik: "lamba" (gece; TEK kaynak ampul: aşağı koni havuzu + duvarda net kenarlı V + yayılma basamağı; gölgeler/kenar ışığı aynı noktadan)
//       · "gun" (pencereden güneş yaması; lamba sönük) · "sonuk" (ay yaması tek kaynak).
// İkincil kaynak (ayrı tanım): banyo kapısı altı şeridi + kendi zemin havuzu + ayak kamaları (kapi.ayak {gel, dur, git, don}).
// Lamba: lamba {u, z, boyun: Sayi (0 dik → 1 yatağa bükük), yanik: Sayi (0..1 huzme kaynaktan uzar/çekilir), kare}.
// Seed sabit (DOKU_SEED.elciOda 181): parke, perde kıvrımı, örtü kıvrımı dünyaya bağlı — kameraya/kareye bağlı rastgelelik yok.
import React from "react";
import { Isik } from "../../../doku/Isik";
import { RenkKaydi, Tarama } from "../../../doku/Tarama";
import { P, poly, rnd } from "../../../doku/sabitler";
import { elDunya } from "../../../rig/kinematik";
import { karakterPoz, Yerlesim } from "../../jestler";
import { KarakterCiz, karakterKilit, param, Sablon, SablonProps } from "../../ortak";
import { deger, ekranNokta, kameraHesapla } from "../../zaman";
import type { Sayi } from "../../tipler";
import { CIC } from "../../paletler/cicero";
import { Belge, Makine } from "../../props/cicero/Esyalar40";
import { SiluetFigur40, Siluet40Kod } from "../../props/cicero/SiluetFigur40";

const F = 1150, UFUK = 760, GOZ = 1.6, SEED = 181;
const X = (u: number, z: number) => 540 + (u * F) / z;
const Y = (h: number, z: number) => UFUK + ((GOZ - h) * F) / z;
const Q = (u: number, h: number, z: number): P => [X(u, z), Y(h, z)];
export const ELCI_YER: Yerlesim = { yer: (z, u) => ({ x: X(u, z), y: Y(0, z), s: (F * 0.00298) / z }), faz: (dz, du) => Math.hypot(dz, du) * 4.5 };
// yüzsüz siluet karakterleri (Kukla değil): kim → kod + renk
export const SILUET40_KAYIT: Record<string, { kod: Siluet40Kod; renk: string }> = {
  elci: { kod: "yasli", renk: CIC.elci }, moyzisch: { kod: "sapkali", renk: CIC.moyzisch }, yetkili: { kod: "uzun-ince", renk: CIC.yetkili }, sekreter: { kod: "topuzlu", renk: CIC.sekreter },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const elips = (cu: number, cz: number, ru: number, rz: number, h: number, n = 40): P[] => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return Q(cu + Math.cos(a) * ru, h, cz + Math.sin(a) * rz); });
const d = (pts: P[]) => `M ${poly(pts).split(" ").join(" L ")} Z`;

type LambaP = { u?: number; z?: number; boyun?: Sayi; yanik?: Sayi; kare?: number[] };
type KapiP = { ayak?: { gel: number; dur: number; git: number; don: number } | null };
// poz: Kukla poz anahtarları (karakterPoz'un ÜSTÜNE, kare ile) — yon: basamaklı yön (1/−1; dönüş adım ortasında, kukla 3/4 aynalanır)
type PozAnahtar = { kim: string; kare: number[]; yon?: (1 | -1)[] } & Partial<Record<"shF" | "elF" | "shB" | "elB" | "lean" | "headTilt" | "lookX" | "lookY" | "thighF" | "kneeF" | "thighB" | "kneeB", number[]>>;

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const ARKA = param<number>(plan, "arka", 5.0), YARI = param<number>(plan, "yari", 2.1), TAVAN = param<number>(plan, "tavan", 3.2);
  const isikAd = param<"lamba" | "gun" | "sonuk">(plan, "isik", "lamba");
  const gece = isikAd !== "gun";
  const k = kameraHesapla(plan.kamera, p);
  const kam = `translate(${540 + k.cx},${960 + k.cy}) scale(${k.cs}) translate(-540,-960)`;
  // ---- lamba (tek kaynak) ----
  const LP = param<LambaP>(plan, "lamba", {});
  const Lu = LP.u ?? -0.83, Lz = LP.z ?? 4.85;
  const b = deger(LP.boyun ?? 0, LP.kare, p);
  const yanik = isikAd === "lamba" ? deger(LP.yanik ?? 1, LP.kare, p) : 0;
  const BH = 1.0; // ampul yüksekliği
  const A = [-0.55 * b, -1 + 0.55 * b, -0.7 * b]; // aşağı koni ekseni (u, h, z)
  const ampul = Q(Lu, BH, Lz);
  const lambaIsik: Isik = { tip: "nokta", ad: "başucu lambası", zemin: Q(Lu, 0, Lz), yukseklik: Y(0, Lz) - Y(BH, Lz), renk: CIC.kenar };
  const gunIsik: Isik = { tip: "yonlu", ad: "güneş (pencere)", yon: [-0.3, 0.95], renk: "#f0d8c0" };
  const ayIsik: Isik = { tip: "yonlu", ad: "ay (pencere)", yon: [-0.3, 0.6], renk: CIC.hilal };
  const isik = isikAd === "lamba" ? lambaIsik : isikAd === "gun" ? gunIsik : ayIsik;
  const TH = isikAd === "lamba" ? 35 : 72; // tarama açısı (ışık yönüne dik; sahnede tek)
  const tarRenk = gece ? CIC.tarama : CIC.taramaGun;
  // havuz bir yatay düzlemde (h): merkez + yarı eksenler (koni ekseni boyunca)
  const havuz = (h: number) => { const t = (BH - h) / -A[1]; return { cu: Lu + A[0] * t, cz: Lz + A[2] * t, ru: t * lerp(0.84, 0.55, b) * yanik, rz: t * lerp(0.84, 0.7, b) * yanik }; };
  // duvar V'si: tepe ampulün duvardaki izdüşümünde (h 1.05), kenarlar düşeyden aL/aR derece (boyun bükülünce sağa yatar)
  const aL = lerp(-24, -8, b), aR = lerp(24, 34, b);
  const vTepe = Q(Lu, 1.05, ARKA), vUst = Y(TAVAN, ARKA);
  const vBoy = (vTepe[1] - vUst) * yanik;
  // bantlar AÇIYLA iç içe (ofsetle değil: tepe yakınında çekirdek kaybolmasın): da = kenarları içe (−) / dışa (+) döndürme (°), off = dış ofset px
  const vPoly = (da: number, off = 0): P[] => {
    if (yanik <= 0) return [];
    const tL = Math.tan(((aL - da) * Math.PI) / 180), tR = Math.tan(((aR + da) * Math.PI) / 180);
    const y0 = vTepe[1] + off * 0.6, yt = vTepe[1] - vBoy - 260; // tavan çizgisinin üstüne taşar (kırpılır)
    const xl = (y: number) => vTepe[0] + (y0 - y) * tL - off, xr = (y: number) => vTepe[0] + (y0 - y) * tR + off;
    const r = 26 + off * 0.4, yb = y0 - r;
    return [[xl(yt), yt], [xl(yb), yb], [lerp(xl(yb), xr(yb), 0.5), y0 + r * 0.1], [xr(yb), yb], [xr(yt), yt]];
  };
  // tavandaki yay: koni tavan düzlemini keser (merkez eğime göre kayar)
  const tavanYay = (k0: number) => { const t = TAVAN - 1.08, r = (0.045 + t * Math.tan((24 * Math.PI) / 180)) * k0 * yanik; const cu = Lu + t * Math.tan(((aL + aR) / 2) * Math.PI / 180); return elips(cu, Lz, r * 1.05, r, TAVAN, 48); };
  // ---- geometri ----
  const duvarK: P[] = [Q(-YARI, TAVAN, ARKA), Q(YARI, TAVAN, ARKA), Q(YARI, 0, ARKA), Q(-YARI, 0, ARKA)];
  const tavanK: P[] = [Q(-YARI, TAVAN, ARKA), Q(YARI, TAVAN, ARKA), Q(YARI, TAVAN, 1.0), Q(-YARI, TAVAN, 1.0)];
  const zeminK: P[] = [Q(-YARI, 0, ARKA), Q(YARI, 0, ARKA), Q(YARI, 0, 1.0), Q(-YARI, 0, 1.0)];
  const pen = { u0: -0.15, u1: 0.55, h0: 0.85, h1: 2.35 };
  const kapi = { u0: 0.95, u1: 1.75, h: 2.1 };
  const yat = { u0: -2.0, u1: -1.05, zb: ARKA, zf: 3.1, h: 0.55 };
  const kom = { u0: -0.95, u1: -0.3, z0: 4.55, z1: ARKA, h: 0.62 };
  const duvar = isikAd === "gun" ? CIC.duvarGun : CIC.duvarGece, tavan = isikAd === "gun" ? "#b8a090" : CIC.tavanGece;
  const mur = CIC.murekkep;
  // ---- karakterler ----
  const pozA = param<PozAnahtar[]>(plan, "poz", []);
  const makineP = param<{ kim: string; bas: number; bit: number } | null>(plan, "makine", null);
  const kar = (plan.karakterler ?? []).map((c, i) => {
    const sil = SILUET40_KAYIT[c.kim];
    const z = deger(c.z, c.kare, p, 3.8), u = deger(c.u, c.kare, p, 0);
    if (sil) return { c, i, z, u, sil, d: null as null | ReturnType<typeof karakterPoz> };
    const dd = karakterPoz(c, p, ELCI_YER);
    for (const pa of pozA.filter((q) => q.kim === c.kim)) for (const key of ["shF", "elF", "shB", "elB", "lean", "headTilt", "lookX", "lookY", "thighF", "kneeF", "thighB", "kneeB"] as const) { const v = pa[key]; if (v) (dd.pz as Record<string, unknown>)[key] = deger(v, pa.kare, p); }
    for (const pa of pozA.filter((q) => q.kim === c.kim && q.yon)) { let y = pa.yon![0]; pa.kare.forEach((kq, j) => { if (p >= kq) y = pa.yon![j]; }); dd.pz.facing = y; }
    return { c, i, z, u, sil: null, d: dd };
  });
  for (const q of kar) if (q.d) kilit.push(...karakterKilit(q.c.kim, q.d, k)); else kilit.push({ ad: `${q.c.kim} ayak`, p: ekranNokta(k, Q(q.u, 0, q.z)), tur: "ayak" });
  // ---- kapı altı (ikincil kaynak) ----
  const KP = param<KapiP>(plan, "kapi", {});
  const ay = KP.ayak;
  const ayakL = ay ? (p < ay.gel ? 0 : p < ay.dur ? (p - ay.gel) / (ay.dur - ay.gel) : p < ay.git ? 1 : p < ay.don ? 1 - (p - ay.git) / (ay.don - ay.git) : 0) : 0;
  const ayakVar = !!ay && p >= ay.gel && p < ay.don + 2;
  const kc = (kapi.u0 + kapi.u1) / 2;
  if (isikAd === "lamba") kilit.push({ ad: "kapı altı şerit", p: ekranNokta(k, Q(kc, 0, ARKA)), tur: ayakVar ? "dokunus" : "kurulum" });
  kilit.push({ ad: "lamba", p: ekranNokta(k, ampul), tur: "kurulum" });
  // ---- çizim parçaları ----
  const kama = (cu: number): P[] => { const L = 0.5 * ayakL, cuF = kc + (cu - kc) * 1.4; return [Q(cu - 0.05, 0, ARKA), Q(cu + 0.05, 0, ARKA), Q(cuF + 0.08, 0, ARKA - L), Q(cuF - 0.08, 0, ARKA - L)]; };
  const havuzCiz = (h: number, klip: string, renk: [string, string, string]) => {
    if (yanik <= 0) return null;
    const H = havuz(h);
    return <g clipPath={klip}>
      <path d={d(elips(H.cu, H.cz, H.ru * 1.22, H.rz * 1.18, h))} fill={renk[2]} opacity={0.85} />
      <path d={d(elips(H.cu, H.cz, H.ru, H.rz, h))} fill={renk[1]} opacity={0.92} />
      <path d={d(elips(H.cu + 0.05 * b, H.cz, H.ru * 0.45, H.rz * 0.45, h))} fill={renk[0]} opacity={0.92} />
    </g>;
  };
  // parke tahta çizgileri (seed'li genişlik 0.07–0.10 m)
  const parke: number[] = []; for (let u = -YARI, i = 0; u < YARI && i < 80; i++) { u += 0.07 + rnd(SEED + 1, i) * 0.03; parke.push(u); }
  // perde kıvrımları
  const perde = (u0: number, u1: number, s: number) => { const xs: number[] = []; let x = X(u0, 4.96) + 6; let i = 0; while (x < X(u1, 4.96) - 6 && i < 20) { x += 18 + rnd(SEED + s, i) * 16; xs.push(x); i++; } return xs; };
  const yatakUst: P[] = [Q(yat.u0, yat.h, yat.zb), Q(yat.u1, yat.h, yat.zb), Q(yat.u1, yat.h, yat.zf), Q(yat.u0, yat.h, yat.zf)];
  const komUst: P[] = [Q(kom.u0, kom.h, kom.z1), Q(kom.u1, kom.h, kom.z1), Q(kom.u1, kom.h, kom.z0), Q(kom.u0, kom.h, kom.z0)];
  // belgeler (yatakta serili) — param belgeler {u0,u1,z0,z1,n}
  const BG = param<{ u0: number; u1: number; z0: number; z1: number; n: number } | null>(plan, "belgeler", null);
  const KT = param<{ kapak?: Sayi; kare?: number[] } | null>(plan, "kutu", { kapak: 0 });
  const kapak = KT ? deger(KT.kapak ?? 0, KT.kare, p) : 0;
  const lambaH = { kaide: 0.62, mafsal: 0.95 };
  // lamba çizimi (ekran): kaide, boyun, mafsal, koni abajur (ekseni A), iç ağız hilali
  const lambaCiz = () => {
    const s = F / Lz, M = Q(Lu, lambaH.mafsal, Lz), K0 = Q(Lu, lambaH.kaide, Lz);
    const ax = A[0] * s, ay2 = -A[1] * s; const al = Math.hypot(ax, ay2) || 1; const ux = ax / al, uy = ay2 / al; const nx = -uy, ny = ux;
    const agiz: P = [M[0] + ux * 0.1 * s, M[1] + uy * 0.1 * s], tepe: P = [M[0] - ux * 0.06 * s, M[1] - uy * 0.06 * s];
    const wA = 0.12 * s, wT = 0.045 * s;
    const koni: P[] = [[tepe[0] + nx * wT, tepe[1] + ny * wT], [agiz[0] + nx * wA, agiz[1] + ny * wA], [agiz[0] - nx * wA, agiz[1] - ny * wA], [tepe[0] - nx * wT, tepe[1] - ny * wT]];
    const golgeYari: P[] = [koni[0], koni[1], agiz, [M[0], M[1]]];
    const ici = 0.25 + 0.5 * b; // bükükken iç ağız daha çok görünür
    return <g>
      <ellipse cx={K0[0]} cy={K0[1]} rx={0.075 * s} ry={0.022 * s} fill={CIC.kaide} stroke={mur} strokeWidth={2} />
      <path d={`M ${K0[0] - 0.05 * s} ${K0[1]} Q ${K0[0]} ${K0[1] - 0.06 * s} ${K0[0] + 0.05 * s} ${K0[1]} Z`} fill={CIC.kaide} stroke={mur} strokeWidth={2} />
      <line x1={K0[0]} y1={K0[1] - 0.04 * s} x2={M[0]} y2={M[1]} stroke={CIC.kaide} strokeWidth={Math.max(3, 0.014 * s)} strokeLinecap="round" />
      <circle cx={M[0]} cy={M[1]} r={0.014 * s} fill={CIC.kaide} stroke={mur} strokeWidth={1.5} />
      {yanik > 0 && <line x1={K0[0] + 0.004 * s} y1={K0[1] - 0.05 * s} x2={M[0] + 0.004 * s} y2={M[1]} stroke={CIC.metalNokta} strokeWidth={1.6} opacity={0.6} />}
      <polygon points={poly(koni)} fill={CIC.abajurDis} stroke={mur} strokeWidth={2.5} strokeLinejoin="round" />
      <Tarama sekil={golgeYari} basamak="III" aci={TH} renk={tarRenk} derinlik="yakin" seed={SEED + 40} />
      <ellipse cx={agiz[0]} cy={agiz[1]} rx={wA} ry={wA * ici} transform={`rotate(${(Math.atan2(ny, nx) * 180) / Math.PI} ${agiz[0]} ${agiz[1]})`} fill={yanik > 0 ? CIC.abajurIc : "#6a5a50"} stroke={mur} strokeWidth={2} />
      <ellipse cx={tepe[0]} cy={tepe[1]} rx={wT} ry={wT * 0.35} transform={`rotate(${(Math.atan2(ny, nx) * 180) / Math.PI} ${tepe[0]} ${tepe[1]})`} fill={yanik > 0 ? CIC.vUst : "#4a4048"} stroke={mur} strokeWidth={1.5} />
    </g>;
  };
  // kutu (deri, despatch box) komodinde; kapak arka kenardan menteşeli
  const kutuCiz = () => {
    const u0 = -0.72, u1 = -0.34, z0 = 4.6, z1 = 4.88, h0 = kom.h, h1 = kom.h + 0.12;
    const th = kapak * (100 * Math.PI) / 180, kz = z1 - 0.28 * Math.cos(th), kh = h1 + 0.28 * Math.sin(th);
    const on: P[] = [Q(u0, h1, z0), Q(u1, h1, z0), Q(u1, h0, z0), Q(u0, h0, z0)];
    const yan: P[] = [Q(u1, h1, z0), Q(u1, h1, z1), Q(u1, h0, z1), Q(u1, h0, z0)];
    const ust: P[] = [Q(u0, h1, z1), Q(u1, h1, z1), Q(u1, h1, z0), Q(u0, h1, z0)];
    const kap: P[] = [Q(u0, h1, z1), Q(u1, h1, z1), Q(u1, kh, kz), Q(u0, kh, kz)];
    const kk = Q((u0 + u1) / 2, h1 - 0.05, z0);
    return <g>
      <polygon points={poly(on.map(([x, y]) => [x + 9, y + 5] as P))} fill="#1e1c28" opacity={0.6} />
      {kapak > 0.02 && th > Math.PI / 2 && <polygon points={poly(kap)} fill={CIC.deri} stroke={mur} strokeWidth={2} />}
      <polygon points={poly(ust)} fill={kapak > 0.02 ? "#2a2228" : CIC.deri} stroke={mur} strokeWidth={2} />
      {kapak > 0.3 && <polygon points={poly([Q(u0 + 0.03, h1 - 0.02, z1 - 0.03), Q(u1 - 0.03, h1 - 0.02, z1 - 0.03), Q(u1 - 0.03, h1 - 0.02, z0 + 0.03), Q(u0 + 0.03, h1 - 0.02, z0 + 0.03)])} fill={CIC.belgeGolge} opacity={0.75} />}
      <polygon points={poly(yan)} fill="#2e2428" stroke={mur} strokeWidth={2} />
      <polygon points={poly(on)} fill={CIC.deri} stroke={mur} strokeWidth={2.2} />
      <rect x={kk[0] - 7} y={kk[1] - 6} width={14} height={11} fill={CIC.kilit} stroke={mur} strokeWidth={1.2} />
      {kapak > 0.02 && th <= Math.PI / 2 && <polygon points={poly(kap)} fill={CIC.deri} stroke={mur} strokeWidth={2} />}
    </g>;
  };
  // derinlik sıralı nesneler (uzak önce)
  const nesneler: { z: number; el: React.ReactNode }[] = [];
  nesneler.push({ z: 4.8, el: <g key="kom">
    {/* komodin: üst + ön + sağ yan (ışık almayan) */}
    <polygon points={poly(komUst)} fill={CIC.cevizIsik} stroke={mur} strokeWidth={2.5} />
    {havuzCiz(kom.h, "url(#eoKomUst)", ["#a07f6c", "#8a6a5a", "#6b5148"])}
    <polygon points={poly([Q(kom.u1, kom.h, kom.z0), Q(kom.u1, kom.h, kom.z1), Q(kom.u1, 0, kom.z1), Q(kom.u1, 0, kom.z0)])} fill={CIC.cevizGolge} stroke={mur} strokeWidth={2.5} />
    <Tarama sekil={[Q(kom.u1, kom.h, kom.z0), Q(kom.u1, kom.h, kom.z1), Q(kom.u1, 0, kom.z1), Q(kom.u1, 0, kom.z0)]} basamak="III" aci={TH} renk={tarRenk} derinlik="yakin" seed={SEED + 5} />
    <polygon points={poly([Q(kom.u0, kom.h, kom.z0), Q(kom.u1, kom.h, kom.z0), Q(kom.u1, 0, kom.z0), Q(kom.u0, 0, kom.z0)])} fill={yanik > 0 ? "#5a4440" : CIC.cevizGolge} stroke={mur} strokeWidth={2.5} />
    <polygon points={poly([Q(kom.u0 + 0.03, 0.58, kom.z0), Q(kom.u1 - 0.03, 0.58, kom.z0), Q(kom.u1 - 0.03, 0.45, kom.z0), Q(kom.u0 + 0.03, 0.45, kom.z0)])} fill={CIC.cevizIsik} stroke={mur} strokeWidth={2} />
    <circle cx={X((kom.u0 + kom.u1) / 2, kom.z0)} cy={Y(0.515, kom.z0)} r={4} fill={CIC.kolMetal} />
    <polygon points={poly([Q(kom.u0 + 0.03, 0.4, kom.z0), Q(kom.u1 - 0.03, 0.4, kom.z0), Q(kom.u1 - 0.03, 0.08, kom.z0), Q(kom.u0 + 0.03, 0.08, kom.z0)])} fill="#241f2c" />
    <line x1={X(kom.u0 + 0.02, kom.z0)} y1={Y(kom.h - 0.005, kom.z0) + 2} x2={X(kom.u1 - 0.02, kom.z0)} y2={Y(kom.h - 0.005, kom.z0) + 2} stroke={yanik > 0 ? "#c8a98e" : "#5a4a50"} strokeWidth={2} opacity={0.8} />
    {kutuCiz()}
    {lambaCiz()}
  </g> });
  nesneler.push({ z: 4.0, el: <g key="yatak">
    {/* baş tahtası (ceviz, üst köşe yuvarlak) */}
    <path d={`M ${X(yat.u0, 4.97)} ${Y(0, 4.97)} L ${X(yat.u0, 4.97)} ${Y(0.97, 4.97)} Q ${X(yat.u0, 4.97)} ${Y(1.05, 4.97)} ${X(yat.u0 + 0.08, 4.97)} ${Y(1.05, 4.97)} L ${X(yat.u1 - 0.08, 4.97)} ${Y(1.05, 4.97)} Q ${X(yat.u1, 4.97)} ${Y(1.05, 4.97)} ${X(yat.u1, 4.97)} ${Y(0.97, 4.97)} L ${X(yat.u1, 4.97)} ${Y(0, 4.97)} Z`} fill={CIC.cevizGolge} stroke={mur} strokeWidth={2.5} />
    <line x1={X(yat.u0 + 0.1, 4.97)} y1={Y(1.03, 4.97)} x2={X(yat.u1 - 0.1, 4.97)} y2={Y(1.03, 4.97)} stroke={yanik > 0 ? "#a07f6c" : "#4a3e48"} strokeWidth={2} />
    {/* örtü: üst + sağ yan sarkma + ön sarkma (h 0.08'e kadar) */}
    <polygon points={poly([Q(yat.u1, yat.h, yat.zb), Q(yat.u1, yat.h, yat.zf), Q(yat.u1, 0.08, yat.zf), Q(yat.u1, 0.08, yat.zb)])} fill={CIC.ortuGolge} stroke={mur} strokeWidth={2.5} />
    <Tarama sekil={[Q(yat.u1, 0.2, yat.zb), Q(yat.u1, 0.2, yat.zf), Q(yat.u1, 0.08, yat.zf), Q(yat.u1, 0.08, yat.zb)]} basamak="II" aci={TH} renk={tarRenk} derinlik="yakin" seed={SEED + 7} />
    <polygon points={poly(yatakUst)} fill={CIC.ortuGolge} stroke={mur} strokeWidth={2.5} />
    {havuzCiz(yat.h, "url(#eoYatak)", [CIC.vCekirdek, CIC.vDis, CIC.lambaYayilma])}
    {/* yastık */}
    <path d={`M ${X(yat.u0 + 0.08, 4.85)} ${Y(yat.h, 4.85)} Q ${X(yat.u0 + 0.06, 4.6)} ${Y(yat.h + 0.14, 4.7)} ${X(yat.u0 + 0.47, 4.62)} ${Y(yat.h + 0.15, 4.62)} Q ${X(yat.u1 - 0.06, 4.6)} ${Y(yat.h + 0.12, 4.6)} ${X(yat.u1 - 0.08, 4.85)} ${Y(yat.h, 4.85)} Z`} fill={yanik > 0 ? "#b8a498" : CIC.ortuGolge} stroke={mur} strokeWidth={2} />
    {[0, 1, 2].map((i) => { const u = lerp(yat.u0 + 0.15, yat.u1 - 0.15, rnd(SEED + 9, i)); return <path key={i} d={`M ${X(u, 4.3)} ${Y(yat.h, 4.3)} Q ${X(u + 0.05, 3.8)} ${Y(yat.h, 3.8)} ${X(u - 0.03, 3.3)} ${Y(yat.h, 3.3)}`} stroke={mur} strokeWidth={1.6} opacity={0.35} fill="none" />; })}
    <polygon points={poly([Q(yat.u0, yat.h, yat.zf), Q(yat.u1, yat.h, yat.zf), Q(yat.u1, 0.08, yat.zf), Q(yat.u0, 0.08, yat.zf)])} fill={CIC.ortuGolge} stroke={mur} strokeWidth={2.5} />
    {[0.25, 0.5, 0.75].map((t) => <line key={t} x1={X(lerp(yat.u0, yat.u1, t), yat.zf)} y1={Y(0.5, yat.zf)} x2={X(lerp(yat.u0, yat.u1, t) + 0.02, yat.zf)} y2={Y(0.1, yat.zf)} stroke={mur} strokeWidth={1.8} opacity={0.35} />)}
    {[yat.u0 + 0.03, yat.u1 - 0.03].map((u, i) => <rect key={i} x={X(u, yat.zf) - 5} y={Y(0.08, yat.zf)} width={10} height={Y(0, yat.zf) - Y(0.08, yat.zf)} fill={CIC.cevizGolge} />)}
    {/* belgeler (dikey A4, sarımsı-gri): havuz içindekiler ışıkta */}
    {BG && Array.from({ length: BG.n }).map((_, i) => {
      const u = lerp(BG.u0, BG.u1, (i % 2 ? 0.75 : 0.25) + (rnd(SEED + 11, `u${i}`) - 0.5) * 0.3), z = lerp(BG.z0, BG.z1, (Math.floor(i / 2) + 0.5) / Math.ceil(BG.n / 2));
      const H = havuz(yat.h), ic = ((u - H.cu) / H.ru) ** 2 + ((z - H.cz) / H.rz) ** 2 < 1;
      const c = Q(u, yat.h, z), s = F / z;
      return <g key={i} transform={`translate(${c[0]} ${c[1]}) scale(1 ${0.42 + 0.1 * (5 - z)}) rotate(${(rnd(SEED + 11, `a${i}`) - 0.5) * 24})`}><Belge W={0.21 * s} isik={ic ? 1 : 0.15} seed={SEED + i} /></g>;
    })}
  </g> });
  // karakterler
  for (const q of kar) {
    if (q.sil) { const pxm = F / q.z; nesneler.push({ z: q.z, el: <SiluetFigur40 key={`s${q.i}`} kod={q.sil.kod} ayak={Q(q.u, 0, q.z)} pxm={pxm} renk={q.sil.renk} yon={q.c.yon ?? 1} kenar={{ renk: isik.renk, dx: isikAd === "lamba" ? -2 : 2 }} /> }); continue; }
    const dd = q.d!;
    const mk = makineP && makineP.kim === q.c.kim && p >= makineP.bas && p < makineP.bit;
    const elP = mk ? elDunya(dd.pz, true, [0, 10]) : null;
    nesneler.push({ z: q.z, el: <g key={`k${q.i}`}>
      <KarakterCiz d={dd} isik={isik} kamera={k} murekkep={mur} seed={SEED + 300 + q.i * 11} golgeAlfa={0.55} golgeKlip="url(#eoZemin)" />
      {elP && <g transform={`translate(${elP[0]} ${elP[1]})`}><Makine W={0.13 * 1.4 * F / q.z} isikYon={[ampul[0] - elP[0], ampul[1] - elP[1]]} /></g>}
    </g> });
    if (elP) kilit.push({ ad: "makine", p: ekranNokta(k, elP), tur: "dokunus" });
  }
  nesneler.sort((a, b2) => b2.z - a.z);
  const solDuvar: P[] = [Q(-YARI, TAVAN, 1.0), Q(-YARI, TAVAN, ARKA), Q(-YARI, 0, ARKA), Q(-YARI, 0, 1.0)];
  const sagDuvar: P[] = [Q(YARI, TAVAN, 1.0), Q(YARI, TAVAN, ARKA), Q(YARI, 0, ARKA), Q(YARI, 0, 1.0)];
  const penK: P[] = [Q(pen.u0, pen.h1, ARKA), Q(pen.u1, pen.h1, ARKA), Q(pen.u1, pen.h0, ARKA), Q(pen.u0, pen.h0, ARKA)];
  const [pa, pb] = [penK[0], penK[2]];
  const kapiK: P[] = [Q(kapi.u0, kapi.h, ARKA), Q(kapi.u1, kapi.h, ARKA), Q(kapi.u1, 0, ARKA), Q(kapi.u0, 0, ARKA)];
  const kapiHavuz: P[] = [Q(kapi.u0, 0, ARKA), Q(kapi.u1, 0, ARKA), Q(Math.min(YARI, kapi.u1 + 0.55), 0, ARKA - 0.5), Q(kapi.u0 - 0.55, 0, ARKA - 0.5)];
  const ayYama: P[] = [Q(pen.u0, 0, 4.9), Q(pen.u1, 0, 4.9), Q(pen.u1 - 0.4, 0, 3.9), Q(pen.u0 - 0.4, 0, 3.9)];
  const gunYama: P[] = [Q(pen.u0, 0, 4.9), Q(pen.u1, 0, 4.9), Q(pen.u1 - 0.3 * 1.4, 0, 3.5), Q(pen.u0 - 0.3 * 1.4, 0, 3.5)];
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <clipPath id="eoDuvar"><polygon points={poly(duvarK)} /></clipPath>
        <clipPath id="eoTavan"><polygon points={poly(tavanK)} /></clipPath>
        <clipPath id="eoZemin"><polygon points={poly([[-3000, Y(0, ARKA)], [4000, Y(0, ARKA)], [4000, 5000], [-3000, 5000]])} /></clipPath>
        <clipPath id="eoPen"><polygon points={poly(penK)} /></clipPath>
        <clipPath id="eoYatak"><polygon points={poly(yatakUst)} /></clipPath>
        <clipPath id="eoKomUst"><polygon points={poly(komUst)} /></clipPath>
        <clipPath id="eoPerde"><path d={`${d([Q(-0.35, 2.45, 4.96), Q(-0.15, 2.45, 4.96), Q(-0.15, 0.02, 4.96), Q(-0.35, 0.02, 4.96)])} ${d([Q(0.55, 2.45, 4.96), Q(0.75, 2.45, 4.96), Q(0.75, 0.02, 4.96), Q(0.55, 0.02, 4.96)])}`} /></clipPath>
      </defs>
      <rect x={0} y={0} width={1080} height={1920} fill={CIC.duvarKose} />
      <RenkKaydi>
        <g transform={kam}>
          {/* tavan + kartonpiyer */}
          <polygon points={poly(tavanK)} fill={tavan} />
          {yanik > 0 && <g clipPath="url(#eoTavan)"><path d={d(tavanYay(1.3))} fill={CIC.lambaYayilma} /><path d={d(tavanYay(1.08))} fill={CIC.vDis} /><path d={d(tavanYay(1.0))} fill={CIC.vUst} /></g>}
          {/* yan duvarlar */}
          <polygon points={poly(solDuvar)} fill={isikAd === "gun" ? "#a89080" : "#363a5a"} stroke={mur} strokeWidth={3} />
          <polygon points={poly(sagDuvar)} fill={isikAd === "gun" ? "#b09a88" : CIC.duvarKose} stroke={mur} strokeWidth={3} />
          {/* arka duvar + lamba V'si (net kenar, 3 basamak + yayılma) */}
          <polygon points={poly(duvarK)} fill={duvar} />
          {/* kartonpiyer (duvar–tavan), altında ince tarama şeridi */}
          <polygon points={poly([Q(-YARI, TAVAN, ARKA), Q(YARI, TAVAN, ARKA), Q(YARI, TAVAN - 0.15, ARKA), Q(-YARI, TAVAN - 0.15, ARKA)])} fill={isikAd === "gun" ? "#cdb6a0" : "#4a4e70"} stroke={mur} strokeWidth={2} />
          <Tarama sekil={[Q(-YARI, TAVAN - 0.15, ARKA), Q(YARI, TAVAN - 0.15, ARKA), Q(YARI, TAVAN - 0.2, ARKA), Q(-YARI, TAVAN - 0.2, ARKA)]} basamak="II" aci={TH} renk={tarRenk} derinlik="yakin" seed={SEED + 3} />
          {yanik > 0 && <g clipPath="url(#eoDuvar)">
            {/* yayılma (V dışı bant) · dış kenar şeridi · gövde · alt %45 çekirdek — kenarlar net, iç 2 basamak */}
            <polygon points={poly(vPoly(9, 30))} fill={CIC.lambaYayilma} />
            <polygon points={poly(vPoly(3, 6))} fill={CIC.vDis} />
            <polygon points={poly(vPoly(0))} fill={CIC.vUst} />
            <g clipPath="url(#eoVAlt)"><polygon points={poly(vPoly(-2))} fill={CIC.vCekirdek} /></g>
            <defs><clipPath id="eoVAlt"><rect x={-2000} y={vTepe[1] - 0.58 * (vTepe[1] - vUst)} width={5000} height={2000} /></clipPath></defs>
          </g>}
          {/* pencere: dış (gece gök + hilal + sırt / gündüz), cam, iki kanat + kayıt, söve, denizlik */}
          <g clipPath="url(#eoPen)">
            <rect x={pa[0]} y={pa[1]} width={pb[0] - pa[0]} height={pb[1] - pa[1]} fill={gece ? CIC.gok : CIC.gokGun} />
            <rect x={pa[0]} y={pa[1]} width={pb[0] - pa[0]} height={(pb[1] - pa[1]) * 0.42} fill={gece ? CIC.gokUst : "#b8c2d4"} />
            {!gece && <rect x={pa[0]} y={pa[1] + (pb[1] - pa[1]) * 0.6} width={pb[0] - pa[0]} height={(pb[1] - pa[1]) * 0.4} fill={CIC.ufukGun} />}
            {gece && <circle cx={pa[0] + (pb[0] - pa[0]) * 0.74} cy={pa[1] + (pb[1] - pa[1]) * 0.2} r={11} fill={CIC.hilal} />}
            {gece && <circle cx={pa[0] + (pb[0] - pa[0]) * 0.74 + 6} cy={pa[1] + (pb[1] - pa[1]) * 0.2 - 3} r={10} fill={CIC.gokUst} />}
            <path d={`M ${pa[0]} ${pb[1]} L ${pa[0]} ${pb[1] - (pb[1] - pa[1]) * 0.15} Q ${pa[0] + 50} ${pb[1] - (pb[1] - pa[1]) * 0.21} ${pa[0] + 90} ${pb[1] - (pb[1] - pa[1]) * 0.16} Q ${pa[0] + 130} ${pb[1] - (pb[1] - pa[1]) * 0.12} ${pb[0]} ${pb[1] - (pb[1] - pa[1]) * 0.19} L ${pb[0]} ${pb[1]} Z`} fill={gece ? CIC.sirt : CIC.sirtGun} />
            <line x1={pa[0] + 20} y1={pa[1] + 30} x2={pa[0] + 60} y2={pa[1] + 110} stroke="#c8d0e0" strokeWidth={3} opacity={0.12} />
          </g>
          {(() => { const s = F / ARKA, sv = 0.08 * s, mx = (pa[0] + pb[0]) / 2, my = (pa[1] + pb[1]) / 2, kr = "#2e2838"; return <g>
            <path fillRule="evenodd" d={`M ${pa[0] - sv} ${pa[1] - sv} H ${pb[0] + sv} V ${pb[1] + sv * 0.4} H ${pa[0] - sv} Z M ${pa[0]} ${pa[1]} H ${pb[0]} V ${pb[1]} H ${pa[0]} Z`} fill={kr} stroke={mur} strokeWidth={2} />
            <rect x={mx - 4} y={pa[1]} width={8} height={pb[1] - pa[1]} fill={kr} />
            <rect x={pa[0]} y={my - 4} width={pb[0] - pa[0]} height={8} fill={kr} />
            <rect x={pa[0] - sv * 1.3} y={pb[1] + sv * 0.2} width={pb[0] - pa[0] + sv * 2.6} height={sv * 0.6} fill={gece ? "#4a4660" : "#d8c4b0"} stroke={mur} strokeWidth={2} />
          </g>; })()}
          {/* perde kutusu + perdeler (ağır kumaş, dikey kıvrım, dipte tarama öbekleri) */}
          <polygon points={poly([Q(-0.35, 2.6, 4.96), Q(0.75, 2.6, 4.96), Q(0.75, 2.45, 4.96), Q(-0.35, 2.45, 4.96)])} fill="#3a3448" stroke={mur} strokeWidth={2} />
          <g clipPath="url(#eoPerde)">
            <rect x={0} y={0} width={1080} height={1920} fill={gece ? CIC.perdeGolge : "#8a7a80"} />
            {yanik > 0 && <polygon points={poly(vPoly(0))} fill={CIC.perdeIsik} />}
            {[[-0.35, -0.15, 1], [0.55, 0.75, 2]].map(([u0, u1, s]) => perde(u0, u1, s).map((x, i) => <line key={`${s}${i}`} x1={x} y1={Y(2.45, 4.96)} x2={x + 2} y2={Y(0.02, 4.96)} stroke="#2e2838" strokeWidth={2.4} opacity={0.6} />))}
            <Tarama sekil={[Q(-0.35, 0.3, 4.96), Q(0.75, 0.3, 4.96), Q(0.75, 0.02, 4.96), Q(-0.35, 0.02, 4.96)]} basamak="III" aci={90} renk={tarRenk} derinlik="yakin" seed={SEED + 13} />
          </g>
          {/* banyo kapısı: söve (iç yanak taramalı), kanat iki pano, yuvarlak kol */}
          {(() => { const s = F / ARKA, sv = 0.08 * s, [ka, kb] = [kapiK[0], kapiK[2]], kr = isikAd === "gun" ? CIC.kapiGun : CIC.kapiGece; return <g>
            <path fillRule="evenodd" d={`M ${ka[0] - sv} ${ka[1] - sv} H ${kb[0] + sv} V ${kb[1]} H ${ka[0] - sv} Z M ${ka[0]} ${ka[1]} H ${kb[0]} V ${kb[1]} H ${ka[0]} Z`} fill="#3a3448" stroke={mur} strokeWidth={2} />
            <rect x={ka[0]} y={ka[1]} width={kb[0] - ka[0]} height={kb[1] - ka[1]} fill={kr} stroke={mur} strokeWidth={2.5} />
            <Tarama sekil={[[ka[0], ka[1]], [ka[0] + 10, ka[1]], [ka[0] + 10, kb[1]], [ka[0], kb[1]]]} basamak="III" aci={TH} renk={tarRenk} derinlik="yakin" seed={SEED + 15} />
            <rect x={X(kapi.u0 + 0.12, ARKA)} y={Y(1.95, ARKA)} width={X(kapi.u1 - 0.12, ARKA) - X(kapi.u0 + 0.12, ARKA)} height={Y(1.25, ARKA) - Y(1.95, ARKA)} fill="none" stroke="#2e2838" strokeWidth={3} />
            <rect x={X(kapi.u0 + 0.12, ARKA)} y={Y(1.05, ARKA)} width={X(kapi.u1 - 0.12, ARKA) - X(kapi.u0 + 0.12, ARKA)} height={Y(0.15, ARKA) - Y(1.05, ARKA)} fill="none" stroke="#2e2838" strokeWidth={3} />
            <circle cx={X(1.03, ARKA)} cy={Y(1.0, ARKA)} r={6} fill={CIC.kolMetal} stroke={mur} strokeWidth={1.5} />
          </g>; })()}
          {/* süpürgelik */}
          {[[-YARI, kapi.u0 - 0.08], [kapi.u1 + 0.08, YARI]].map(([u0, u1], i) => <polygon key={i} points={poly([Q(u0, 0.12, ARKA), Q(u1, 0.12, ARKA), Q(u1, 0, ARKA), Q(u0, 0, ARKA)])} fill="#2a2434" />)}
          {/* döşeme: şerit parke (kaçış noktasına yakınsar) + halı + ay yaması + kapı havuzu + lamba havuzu */}
          <polygon points={poly(zeminK)} fill={CIC.parke} />
          {parke.map((u, i) => <line key={i} x1={X(u, ARKA)} y1={Y(0, ARKA)} x2={X(u, 1.0)} y2={Y(0, 1.0)} stroke={CIC.parkeCizgi} strokeWidth={2} opacity={0.7} />)}
          {parke.map((u, i) => { const z = 1.3 + rnd(SEED + 2, i) * 3.6; return <line key={`e${i}`} x1={X(u, z)} y1={Y(0, z)} x2={X(parke[i + 1] ?? u + 0.08, z)} y2={Y(0, z)} stroke={CIC.parkeCizgi} strokeWidth={2} opacity={0.6} />; })}
          <polygon points={poly([Q(-0.95, 0, 4.4), Q(1.0, 0, 4.4), Q(1.0, 0, 3.1), Q(-0.95, 0, 3.1)])} fill="#3e3858" />
          <polygon points={poly([Q(-0.83, 0, 4.28), Q(0.88, 0, 4.28), Q(0.88, 0, 3.22), Q(-0.83, 0, 3.22)])} fill={CIC.hali} />
          <polygon points={poly(isikAd === "gun" ? gunYama : ayYama)} fill={isikAd === "gun" ? CIC.gunYama : CIC.ayYama} opacity={isikAd === "gun" ? 0.9 : isikAd === "sonuk" ? 0.45 : 0.3} />
          {/* zemin havuzu yalnız dik boyunda (bükükken koniyi yatak keser) */}
          {b < 0.99 && <g opacity={1 - b}>{havuzCiz(0, "url(#eoZemin)", ["#8c6f66", "#7a6658", "#5e5058"])}</g>}
          {isikAd === "lamba" && <g>
            <polygon points={poly(kapiHavuz)} fill={CIC.kapiHavuz} />
            <rect x={X(kapi.u0, ARKA)} y={Y(0, ARKA) - 4} width={X(kapi.u1, ARKA) - X(kapi.u0, ARKA)} height={8} fill={CIC.kapiSerit} />
            {ayakVar && [kc - 0.12, kc + 0.12].map((cu, i) => <g key={i}>
              <rect x={X(cu - 0.05, ARKA)} y={Y(0, ARKA) - 4} width={X(cu + 0.05, ARKA) - X(cu - 0.05, ARKA)} height={8} fill={CIC.ayakGolge} />
              {ayakL > 0 && <polygon points={poly(kama(cu))} fill={CIC.ayakGolge} />}
            </g>)}
          </g>}
          {nesneler.map((n) => n.el)}
        </g>
      </RenkKaydi>
    </svg>
  );
};

// dokunulmayan yardımcılar dışa: aynı kamera/dünya modeli (yönetmen kontrol karesi hesabı için)
export const elciOdaEkran = (u: number, h: number, z: number) => Q(u, h, z);
// arşiv: gece "litografi" (geceLapis eğrisi + hafif mor kenar; geceLapis vinyeti .58 köşedeki lamba V'sini öldürüyordu: p95 L* 68 → ölçüm)
export const ELCI_ODA: Sablon = { Sahne, arsiv: (plan) => (param<string>(plan, "isik", "lamba") === "gun" ? "gunduzMineral" : "litografi") };
