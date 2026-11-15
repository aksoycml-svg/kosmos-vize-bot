// ===== ARABA v2 (Çiçero tur-4; mekanlar.md §2-v2) · `gorunum: "el" | "pencere" | "kucak" | "dis"` · `saat: "gece"` =====
// v1 ("ic" yan kesit, gündüz) kullanıcı tur-4'te reddedildi ("Araba planları iyi değil", "El kol doğru değil özürlü gibi") → hata verir.
// Tek dünya, tek ışık: elçilik kapısının sağındaki DUVAR FENERİ (Isik nokta, `#efd0b6`). Huzme yok; havuz, uzak camdan düşen net kenarlı
// sıcak bant, kenar ışıkları ve gölge yönü bu tanımdan. Sedan40 tek model, iki renk (Moyzisch lacivert-siyah `#262836`, kaçış koyu yeşil `#3d4640`).
//   el      (P01a insert, 2650 px/m): direksiyon alt yayı + panel krom kenarı + deri kanepe rulo/dikiş; banknot elden ele (+ derinlik ölçeği).
//   pencere (P01b, kaldırımdan yolcu kapısı; F 1265, göz 1.25, ufuk 578, kapı Z 1.62): yuvarlak köşeli cam + krom çıta + kapı kolu +
//           çamurluk + nervürlü basamak + ıslak parke; içeride Bazna (Kukla takim40, Z 2.07) ve Moyzisch (siluet sapkali, Z 2.72);
//           uzak camdan cephe, daktilo penceresi, kapı ve fener.
//   kucak   (P05, tavandan 70° aşağı, ön = üst): direksiyon tam halka + 3 kol, panel alt kenarı, kanepe ortası, iki kucak; film kutusu ↔ zarf.
//   dis     (P09a, karşı kaldırımdan elçilik; F 1300, göz 1.5, ufuk 1000, cephe Z 9): kapı + saçak + fener + daktilo penceresi, koyu yeşil
//           sedanın arkası (Z 5.1), ıslak yolda fener yansıması; sekreter iner, uzak arka kapıdan biner, araba sağdan çıkar.
// Eller: props/cicero/El40 (bilek ≤ 30°, dirsek 70–160° IK, E = 0.18 m × px/m, poz avuc|dayali|jant|tutus|kistir). Dünya seed'li (kaynamaz).
import React from "react";
import { Easing } from "remotion";
import type { Isik } from "../../../doku/Isik";
import { RenkKaydi, Tarama } from "../../../doku/Tarama";
import { P, poly, rnd } from "../../../doku/sabitler";
import { dirsek40, Kukla } from "../../../rig/Kukla";
import { kuklaIsigi } from "../../../rig/RigIsik";
import { govdeDunya } from "../../../rig/kinematik";
import { karakterPoz } from "../../jestler";
import { param, Sablon, SablonProps } from "../../ortak";
import { deger, ekranNokta, kameraHesapla } from "../../zaman";
import { ARAC, CIC, EL_BAZNA, EL_MOYZISCH } from "../../paletler/cicero";
import { Banknot, FilmKutusu, Zarf } from "../../props/cicero/Esyalar40";
import { SiluetFigur40 } from "../../props/cicero/SiluetFigur40";
import { El40Poz, ElKol40, elKolGeo } from "../../props/cicero/El40";
import { KUKLA_EL40_E } from "../../../rig/Kukla";

const SEED = 191, SEED_C = 193, SEED_Y = 194;
const mur = CIC.murekkep;
type ElA = { kare: number[]; bilek: P[]; hedef?: P[] /* verilirse kavrama noktası buraya oturur (bilek IK ile çözülür) */; omuz?: P[]; dirsek?: P[]; aci?: number[]; poz: El40Poz | El40Poz[]; olcek?: number[]; bukum?: 1 | -1 };
type NesneA = { kare: number[]; x: number[]; y: number[]; aci: number[]; olcek?: number[]; tutan?: (string | null)[]; arkada?: number[] };
const anP = (arr: P[], kare: number[], p: number): P => [deger(arr.map((q) => q[0]), kare, p), deger(arr.map((q) => q[1]), kare, p)];
const adim = <T,>(v: T | T[], kare: number[], p: number): T => { if (!Array.isArray(v)) return v; let r = v[0]; kare.forEach((q, j) => { if (p >= q && j < v.length) r = v[j]; }); return r; };
const kamS = (plan: SablonProps["plan"], p: number) => { const k = kameraHesapla(plan.kamera, p); return { k, kam: `translate(${540 + k.cx},${960 + k.cy}) scale(${k.cs}) translate(-540,-960)` }; };
// sıcak bant: iç mekân grubunun kopyası, bant poligonuna kırpılıp "screen" ile fener rengine açılır (net kenar, blur yok; arka plan etkilenmez)
const SicakFiltre: React.FC<{ id: string; a?: number }> = ({ id, a = 0.3 }) => { const c = [0.93, 0.76, 0.62]; return <filter id={id} x="0" y="0" width="1" height="1" filterUnits="userSpaceOnUse"><feColorMatrix type="matrix" values={`${1 - a * c[0]} 0 0 0 ${a * c[0]} 0 ${1 - a * c[1]} 0 0 ${a * c[1]} 0 0 ${1 - a * c[2]} 0 ${a * c[2]} 0 0 0 1 0`} /></filter>; };
/** duvar feneri: duvar kolu + buzlu küre (ampul görünmez, L* ≤ 88) + 2 net hale basamağı */
const Fener: React.FC<{ c: P; r: number; hale: [number, number]; kol?: 1 | -1 }> = ({ c, r, hale, kol = -1 }) => (
  <g>
    <circle cx={c[0]} cy={c[1]} r={hale[1]} fill={ARAC.haleDis} opacity={0.55} />
    <circle cx={c[0]} cy={c[1]} r={hale[0]} fill={ARAC.haleIc} opacity={0.75} />
    <path d={`M ${c[0] + kol * r * 2.4} ${c[1] - r * 0.2} L ${c[0] + kol * r * 0.9} ${c[1] - r * 0.2}`} stroke="#3a3440" strokeWidth={Math.max(3, r * 0.22)} strokeLinecap="round" />
    <rect x={c[0] + kol * r * 2.6 - r * 0.25} y={c[1] - r * 0.6} width={r * 0.5} height={r * 0.9} fill="#3a3440" />
    <circle cx={c[0]} cy={c[1]} r={r} fill={ARAC.fener} stroke="#a8907e" strokeWidth={Math.max(1.5, r * 0.08)} />
    <path d={`M ${c[0] - r * 0.5} ${c[1] - r * 0.45} q ${r * 0.3} ${-r * 0.25} ${r * 0.7} ${-r * 0.15}`} stroke="#f2dcc6" strokeWidth={Math.max(1.5, r * 0.1)} fill="none" opacity={0.8} />
  </g>
);
const fenerIsik = (zemin: P, yukseklik: number): Isik => ({ tip: "nokta", ad: "elçilik feneri", zemin, yukseklik, renk: ARAC.fener });

// ---------------- el çizimi (ortak): json anahtarlarından ElKol40 ----------------
const elCiz = (ad: string, e: ElA | undefined, p: number, o: { kol?: number; pxm: number; palet: typeof EL_BAZNA; kolRenk: string; gen: [number, number, number]; isik: P; th: number; tutulan?: React.ReactNode; kenar?: number; temas?: P; olcek?: number; ayna?: boolean; taramasiz?: boolean }) => {
  if (!e) return null;
  const s = e.olcek ? deger(e.olcek, e.kare, p) : 1;
  const bilek = e.hedef ? elGeo(e, p, o.pxm, o.kol ?? 1).bilek : anP(e.bilek, e.kare, p), omuz = e.omuz ? anP(e.omuz, e.kare, p) : ([bilek[0] - 300, bilek[1] + 300] as P);
  const E = 0.18 * o.pxm * s;
  return <ElKol40 ad={ad} omuz={omuz} bilek={bilek} dirsek={e.dirsek ? anP(e.dirsek, e.kare, p) : undefined} kolBoy={[0.3 * o.pxm * s * (o.kol ?? 1), 0.27 * o.pxm * s * (o.kol ?? 1)]} bukum={e.bukum ?? 1}
    E={E} elAci={e.aci ? deger(e.aci, e.kare, p) : undefined} poz={adim(e.poz, e.kare, p)} palet={o.palet} kolRenk={o.kolRenk} kolKontur={mur}
    gen={[o.gen[0] * s, o.gen[1] * s, o.gen[2] * s]} isik={o.isik} taramaAci={o.th} tutulan={o.tutulan} olcek={o.olcek} ayna={o.ayna} taramasiz={o.taramasiz}
    kenar={o.kenar ? { renk: CIC.kenar, alfa: o.kenar } : undefined} temasGolge={o.temas ? { renk: "#1c1a28", kay: o.temas, alfa: 0.6 } : undefined} />;
};
const elGeo = (e: ElA, p: number, pxm: number, kolK = 1) => {
  const s = e.olcek ? deger(e.olcek, e.kare, p) : 1, E = 0.18 * pxm * s;
  let bilek = anP(e.bilek, e.kare, p);
  const g = (b: P) => elKolGeo({ omuz: e.omuz ? anP(e.omuz, e.kare, p) : [b[0] - 300, b[1] + 300], bilek: b, E, elAci: e.aci ? deger(e.aci, e.kare, p) : undefined, dirsek: e.dirsek ? anP(e.dirsek, e.kare, p) : undefined, kolBoy: [0.3 * pxm * s * kolK, 0.27 * pxm * s * kolK], bukum: e.bukum ?? 1, gen: [10, 10, 10] });
  if (e.hedef) { const h = anP(e.hedef, e.kare, p); for (let i = 0; i < 6; i++) { const k = g(bilek).kavrama; bilek = [bilek[0] + h[0] - k[0], bilek[1] + h[1] - k[1]]; } }
  return { ...g(bilek), bilek };
};

// =====================================================================================================================
// EL (P01a): insert, devir noktası 0.48 m (2650 px/m). Banknot derinlikle ölçeklenir (olcek: 0.5 = 0.96 m uzakta → P10 son karesiyle eşleşme).
// parametreler: banknot {kare, x, y, aci, olcek, tutan ["moyzisch"|"bazna"|null]} · el {moyzischSol, moyzisch, bazna, baznaSag: ElA}
// =====================================================================================================================
const ElGorunum: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const PXM = 2650, { k, kam } = kamS(plan, p);
  const EL = param<Record<string, ElA>>(plan, "el", {});
  const BN = param<NesneA & { sizinti?: number } | null>(plan, "banknot", null);
  const isik: P = [-0.8, -0.6], TH = 62;
  const bant: P[] = [[-60, 565], [1140, 465], [1140, 1075], [-60, 1235]];
  // banknot (tutan elin kavrama noktasından): tutan el yoksa kendi anahtarı
  let banknot: React.ReactNode = null, tutan: string | null = null;
  if (BN) {
    tutan = adim((BN.tutan ?? [null]) as (string | null)[], BN.kare, p);
    const xy: P = [deger(BN.x, BN.kare, p), deger(BN.y, BN.kare, p)], a = deger(BN.aci, BN.kare, p), o = BN.olcek ? deger(BN.olcek, BN.kare, p) : 1;
    banknot = <g transform={`translate(${xy[0]} ${xy[1]}) rotate(${a})`}><Banknot W={0.211 * PXM * o} yuz="arka" sizinti={BN.sizinti ?? 0.12} kivrik={0.35} golgeKay={[7 * o, 9 * o]} golgeRenk="#2a2440" seed={401} /></g>;
    kilit.push({ ad: "banknot", p: ekranNokta(k, xy), tur: "dokunus" });
  }
  for (const [ad, e] of Object.entries(EL)) kilit.push({ ad: `${ad} eli`, p: ekranNokta(k, anP(e.bilek, e.kare, p)), tur: "dokunus" });
  // deri kanepe sırtı (sol): dikey rulolar, seed'li genişlik
  const rulo: number[] = []; for (let x = -40, i = 0; x < 330 && i < 12; i++) { rulo.push(x); x += 62 + rnd(SEED, `r${i}`) * 18; }
  const oturakY = [1080, 1130, 1195, 1275, 1375, 1500, 1650, 1830].map((y, i) => y + (rnd(SEED + 1, i) - 0.5) * 12);
  const jantM: P = [930, -10], jantR = 380;
  const ark = (a0: number, a1: number, r: number) => { const pts: P[] = []; for (let i = 0; i <= 24; i++) { const t = ((a0 + (a1 - a0) * (i / 24)) * Math.PI) / 180; pts.push([jantM[0] + Math.sin(t) * r, jantM[1] - Math.cos(t) * r]); } return pts; };
  const sahneArka = (lit: boolean) => (
    <g>
      {/* 1 sürücü kapısı içi + cam şeridi (gece) + Moyzisch'in paltosu (uzak taraf) */}
      <rect x={-600} y={-1100} width={2300} height={4000} fill={lit ? "#3e4262" : "#2e3048"} />
      <polygon points={poly([[-600, -1100], [420, -1100], [420, 110], [-600, 150]])} fill="#2f3550" />
      <circle cx={-40} cy={20} r={150} fill={ARAC.haleDis} opacity={0.35} /><circle cx={-40} cy={20} r={80} fill={ARAC.haleIc} opacity={0.5} />
      <line x1={-600} y1={150} x2={420} y2={110} stroke={ARAC.krom} strokeWidth={6} />
      <path d={`M 230 -1100 L 640 -1100 Q 660 200 610 380 Q 560 520 430 560 L 230 560 Z`} fill={lit ? "#55526a" : ARAC.paltoM} stroke={mur} strokeWidth={3} />
      <path d="M 300 -1100 Q 330 120 420 300" stroke="#2c2a3a" strokeWidth={4} fill="none" opacity={0.7} />
      {/* 2 ön panel alt kenarı + krom şerit + yuvarlak düğme */}
      <path d="M 560 -1100 L 1700 -1100 L 1700 150 L 600 150 Q 560 150 560 110 Z" fill={ARAC.panel} stroke={mur} strokeWidth={4} />
      <rect x={570} y={138} width={1130} height={13} fill={ARAC.krom} /><rect x={570} y={138} width={1130} height={3} fill={ARAC.kromParlak} opacity={0.7} />
      <circle cx={900} cy={80} r={20} fill={ARAC.krom} stroke={mur} strokeWidth={3} /><circle cx={894} cy={74} r={5} fill={ARAC.kromParlak} />
      {/* 3 direksiyon alt yayı (jant 28 px) + kolon */}
      <rect x={900} y={-1100} width={64} height={1100} fill="#24222e" /><line x1={930} y1={-10} x2={930 - 300} y2={260} stroke={ARAC.jant} strokeWidth={22} /><line x1={930} y1={-10} x2={1260} y2={240} stroke={ARAC.jant} strokeWidth={22} />
      <polyline points={poly(ark(95, 265, jantR))} fill="none" stroke={mur} strokeWidth={34} strokeLinecap="round" />
      <polyline points={poly(ark(95, 265, jantR))} fill="none" stroke={ARAC.jant} strokeWidth={28} strokeLinecap="round" />
      <polyline points={poly(ark(100, 262, jantR + 13))} fill="none" stroke={CIC.kenar} strokeWidth={3} opacity={0.9} /><polyline points={poly(ark(110, 250, jantR - 13))} fill="none" stroke="#4a4858" strokeWidth={3} />
      <polyline points={poly(ark(178, 205, jantR - 120))} fill="none" stroke="#24222e" strokeWidth={22} opacity={0.0} />
      {/* 4 ön kanepe sırtı (sol): rulolar + dikiş (6/6 kesik) + kanepe sırtının gölge yanağı taraması */}
      <path d={`M -600 2900 L -600 150 L 300 150 Q 330 150 330 190 L 330 1300 Q 300 1340 -600 1340 Z`} fill={lit ? ARAC.deriBant : ARAC.deriGolge} stroke={mur} strokeWidth={4} />
      {rulo.map((x, i) => <g key={i}><rect x={x + 8} y={170} width={30} height={1120} rx={14} fill={lit ? ARAC.deriTepe : "#5e4446"} opacity={0.9} /><line x1={x} y1={170} x2={x} y2={1300} stroke={ARAC.dikis} strokeWidth={3} /><line x1={x + 4} y1={175} x2={x + 4} y2={1295} stroke={lit ? "#a08070" : "#6a5052"} strokeWidth={2} strokeDasharray="6 6" /></g>)}
      {!lit && <Tarama sekil={[[296, 160], [330, 190], [330, 1300], [296, 1320]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="insert" seed={SEED + 5} />}
      {/* 5 oturak (gölgede, taramasız): boyuna rulolar yatay çizgi, sağ altta ön rulo + paspas */}
      <path d="M 330 700 L 1700 700 L 1700 2900 L 330 2900 Z" fill={ARAC.oturakTepe} />
      {oturakY.map((y, i) => <g key={i}><line x1={330} y1={y} x2={1700} y2={y - 30} stroke={ARAC.dikis} strokeWidth={4} /><line x1={330} y1={y + 6} x2={1700} y2={y - 24} stroke="#5a464c" strokeWidth={2} strokeDasharray="6 6" /></g>)}
      <path d="M 820 2900 Q 900 1700 1700 1520 L 1700 2900 Z" fill="#3a2e34" stroke={mur} strokeWidth={4} />
      <path d="M 1000 2900 Q 1060 2000 1700 1800 L 1700 2900 Z" fill={ARAC.paspas} />
    </g>
  );
  const bantPoz = poly(bant);
  // eller + banknot (tutan elin "arka" ile "on" katmanı arasında)
  const ortak = { pxm: PXM, isik, th: TH } as const;
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs><clipPath id="arElBant"><polygon points={bantPoz} /></clipPath><SicakFiltre id="arElSicak" a={0.18} /></defs>
      <rect width={1080} height={1920} fill="#1e1c2c" />
      <RenkKaydi>
        <g transform={kam}>
          {sahneArka(false)}
          <g clipPath="url(#arElBant)">{sahneArka(true)}</g>
          {elCiz("moyzisch sol (jant)", EL.moyzischSol, p, { ...ortak, palet: EL_MOYZISCH, kolRenk: ARAC.paltoM, gen: [150, 130, 105], kenar: 0.6 })}
          {elCiz("moyzisch sağ", EL.moyzisch, p, { ...ortak, palet: EL_MOYZISCH, kolRenk: ARAC.paltoM, gen: [170, 150, 118], kenar: 0.7, tutulan: tutan === "moyzisch" ? banknot : undefined })}
          {tutan === null && banknot}
          {elCiz("bazna sol", EL.bazna, p, { ...ortak, palet: EL_BAZNA, kolRenk: "#3b3a4e", gen: [180, 158, 122], kenar: 0.5, tutulan: tutan === "bazna" ? banknot : undefined })}
          {/* 9 Bazna'nın sağ dizi (ön plan, ışıksız) + dizinde dayalı sağ eli */}
          <path d="M -600 2900 L -600 1560 Q -100 1440 260 1500 Q 420 1540 440 1700 Q 450 1800 430 2900 Z" fill="#262536" stroke={mur} strokeWidth={4} />
          <path d="M 180 1490 Q 360 1520 410 1640" stroke="#3a3850" strokeWidth={5} fill="none" />
          {elCiz("bazna sağ (diz)", EL.baznaSag, p, { ...ortak, palet: { ...EL_BAZNA, isik: EL_BAZNA.golge, golge: "#5e4a40" }, kolRenk: "#2e2d40", gen: [190, 170, 130], temas: [8, 10] })}
        </g>
      </RenkKaydi>
    </svg>
  );
};

// =====================================================================================================================
// PENCERE (P01b): kaldırımdan yolcu kapısı (mekanlar §2.5). x = 540 + X·F/Z, y = 578 + (1.25 − h)·F/Z.
// parametreler: bazna {lean, bas, bakis?} · el {bazna: ElA (ekran px; omuz gövdeden), moyzisch: ElA (jant)} · banknot {kare, x, y, aci, tutan, arkada}
//   · daktilo {yaziyor} · araba {renk: "lacivert"}
// =====================================================================================================================
const PF = 1265, PU = 578, PG = 1.25;
const py = (h: number, Z: number) => PU + ((PG - h) * PF) / Z;
const PencereGorunum: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const { k, kam } = kamS(plan, p);
  const TH = 58, isik: P = [0.9, -0.4];
  const EL = param<Record<string, ElA>>(plan, "el", {});
  const BN = param<NesneA & { sizinti?: number; cep?: number[] } | null>(plan, "banknot", null);
  const BZ = param<{ kare?: number[]; lean?: number[]; bas?: number[] }>(plan, "bazna", {});
  const DK = param<{ yaziyor?: boolean }>(plan, "daktilo", { yaziyor: true });
  const fen: P = [962, 485];
  const isikT = fenerIsik([962, py(0, 10.2)], 2.0 * PF / 10.2);
  // ---- Bazna: Kukla takim40, profil sağa, Z 2.07, baş 215 px (s = 215 / 117 rig birimi) ----
  const s = 215 / 117;
  const bc = (plan.karakterler ?? []).find((c) => c.kim === "bazna");
  const bpx = 300 - 12 * s, bpy = 735 + 393 * s; // çene y 735 (şartname 695 + 40: göğüs/yaka bel çizgisinin üstünde görünsün, cep okunur)
  const bd = bc ? karakterPoz({ ...bc, jestler: [] }, p, { yer: () => ({ x: bpx, y: bpy, s }), faz: () => 0 }) : null;
  if (bd) { Object.assign(bd.pz, { facing: 1, thighF: -88, kneeF: 92, thighB: -84, kneeB: 88, shF: 0, elF: -40, shB: 8, elB: -40, lean: BZ.lean ? deger(BZ.lean, BZ.kare, p) : 4, headTilt: BZ.bas ? deger(BZ.bas, BZ.kare, p) : 2, onKolYok: true }); dirsek40(bd.pz); }
  const omuzB: P | null = bd ? govdeDunya(bd.pz, [40, -372]) : null;
  if (bd) for (const [ad, lp] of [["bazna yüz", [24, -450]], ["bazna baş üstü", [12, -505]]] as [string, P][]) kilit.push({ ad, p: ekranNokta(k, govdeDunya(bd.pz, lp)), tur: "yuz" });
  // ---- banknot: Bazna'nın elinde (kavrama noktası), cebe girerken (arkada 1) ceketin arkasında ----
  const eB = EL.bazna && omuzB ? { ...EL.bazna, omuz: [omuzB] as P[] } : undefined;
  const gB = eB ? elGeo({ ...eB, omuz: eB.kare.map(() => omuzB!) }, p, KUKLA_EL40_E * s / 0.18) : null;
  let banknot: React.ReactNode = null, bnArkada = false, bnTutan: string | null = null;
  if (BN) {
    bnTutan = adim((BN.tutan ?? [null]) as (string | null)[], BN.kare, p);
    const ark = adim((BN.arkada ?? [0]) as number[], BN.kare, p); bnArkada = ark > 0; // 1 = ceketin arkasında (cebe giriyor), 2 = cepte (çizilmez)
    const a = deger(BN.aci, BN.kare, p), o = BN.olcek ? deger(BN.olcek, BN.kare, p) : 1;
    // el banknotu alt ucundan tutar (kâğıt elden yukarı uzanır, avuç/başparmak görünür kalır)
    const bW = 0.211 * (PF / 2.07) * 1.15 * o, ra = (a * Math.PI) / 180;
    const cep = BN.cep ? deger(BN.cep, BN.kare, p) : 0, of = (0.38 - 1.0 * cep) * bW; // cep 0→1: kâğıt elden aşağı, ceketin içine kayar
    const xy: P = bnTutan === "bazna" && gB ? [gB.kavrama[0] + Math.cos(ra) * of, gB.kavrama[1] + Math.sin(ra) * of] : [deger(BN.x, BN.kare, p), deger(BN.y, BN.kare, p)];
    banknot = ark >= 2 ? null : <g transform={`translate(${xy[0]} ${xy[1]}) rotate(${a})`}><Banknot W={0.211 * (PF / 2.07) * 1.15 * o} yuz="arka" sizinti={BN.sizinti ?? 0.12} kivrik={0.3} /></g>;
    kilit.push({ ad: "banknot", p: ekranNokta(k, xy), tur: "dokunus" });
  }
  // ---- gövde geometrisi (Z 1.62 kapı düzlemi; px cs 1, mekanlar §2.5 tablo) ----
  const camD = "M 135 520 Q 135 446 210 446 L 705 446 Q 785 446 785 526 L 785 835 L 159 835 Q 135 835 135 811 Z";
  const ventD = "M 797 452 L 842 452 L 950 835 L 797 835 Z";
  const uzakCam: [number, number] = [511, 653];
  const yanik = (i: number) => rnd(SEED_C, `y${i}`) > 0.72 || i === 1;
  const parke: React.ReactNode[] = [];
  for (let r = 0, y = 1554; y < 1691; r++) { const h = 22 + r * 8, kay = rnd(SEED_Y, `k${r}`) * 60; for (let x = -kay; x < 1080; x += 58 + rnd(SEED_Y, `w${r}${x | 0}`) * 20) parke.push(<rect key={`${r}-${x | 0}`} x={x} y={y} width={54} height={h - 3} rx={5} fill={rnd(SEED_Y, `t${r}${x | 0}`) > 0.7 ? "#3a3c52" : "#32344a"} stroke={ARAC.derz} strokeWidth={2} />); y += h; }
  const ic = (lit: boolean) => (
    <g>
      {/* 4 tavan döşemesi (iç) */}
      <rect x={100} y={430} width={720} height={90} fill={ARAC.tavanIc} />
      {/* 7 ön kanepe sırtı (X −0.45): yakın uç x 265 → uzak 363, rulo üst h 1.12 */}
      <path d="M 120 650 Q 250 628 300 640 L 380 628 L 400 900 L 120 900 Z" fill={lit ? ARAC.deriBant : ARAC.deriGolge} stroke={mur} strokeWidth={3} />
      {[150, 205, 262, 318].map((x, i) => <line key={i} x1={x} y1={645 - i * 3} x2={x - 6} y2={900} stroke={ARAC.dikis} strokeWidth={3} />)}
      {/* 5 panel üstü (havalandırma camında) + direksiyon (dar elips, 30° yatık) */}
      <path d="M 780 724 L 960 712 L 960 835 L 780 835 Z" fill={ARAC.panel} />
      <ellipse cx={770} cy={700} rx={37} ry={106} transform="rotate(-12 770 700)" fill="none" stroke={mur} strokeWidth={16} />
      <ellipse cx={770} cy={700} rx={37} ry={106} transform="rotate(-12 770 700)" fill="none" stroke={ARAC.jant} strokeWidth={11} />
      <path d="M 790 600 Q 812 640 806 700" stroke={CIC.kenar} strokeWidth={2.5} fill="none" />
      <line x1={770} y1={700} x2={840} y2={760} stroke={ARAC.jant} strokeWidth={10} />
      {/* 6 Moyzisch (Z 2.72, siluet sapkali, profil sağa; kontra, kenar ışığı fenerden sağda) */}
      <SiluetFigur40 kod="sapkali" ayak={[655, 1210]} pxm={PF / 2.72} renk={lit ? "#5a5470" : ARAC.paltoM} yon={1} oturan={0.6} profil golge={false} isikX={1} kenar={{ renk: CIC.kenar, dx: 3, dy: -1 }} />
      {elCiz("moyzisch sağ (jant)", EL.moyzisch, p, { pxm: PF / 2.6, palet: EL_MOYZISCH, kolRenk: lit ? "#5a5470" : ARAC.paltoM, gen: [52, 44, 34], isik, th: TH, kenar: 0.8 })}
      {/* 8 Bazna */}
      {bnArkada && banknot}
      {bd && <Kukla pz={bd.pz} p={bd.palet} golgesiz isik={kuklaIsigi(isikT, [bpx, bpy], 506 * s, { murekkep: mur, kamera: k.cs, seed: SEED + 9 })} />}
      {eB && gB && <ElKol40 ad="bazna sağ (yakın)" omuz={omuzB!} bilek={anP(eB.bilek, eB.kare, p)} E={KUKLA_EL40_E * s} elAci={eB.aci ? deger(eB.aci, eB.kare, p) : undefined} kolBoy={[150, 140]} bukum={eB.bukum ?? -1}
        poz={adim(eB.poz, eB.kare, p)} palet={EL_BAZNA} kolRenk={lit ? "#5a5670" : "#3b3a4e"} kolKontur={mur} gen={[62, 54, 44]} isik={isik} taramaAci={TH} olcek={1}
        tutulan={!bnArkada && bnTutan === "bazna" ? banknot : undefined} kenar={{ renk: CIC.kenar, alfa: 0.6 }} />}
      {!bnArkada && bnTutan !== "bazna" && banknot}
    </g>
  );
  const bantPoly: P[] = [[130, 548], [800, 512], [800, 712], [130, 816]];
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <clipPath id="arPenCam"><path d={`${camD} ${ventD}`} /></clipPath>
        <clipPath id="arPenUzak"><rect x={100} y={uzakCam[0]} width={900} height={uzakCam[1] - uzakCam[0]} /><polygon points={poly([[797, 452], [1080, 452], [1080, 760], [950, 835], [842, 452]])} /></clipPath>
        <clipPath id="arPenBant"><polygon points={poly(bantPoly)} /></clipPath>
        <filter id="arPenFlu" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation={3} /></filter>
      </defs>
      <rect width={1080} height={1920} fill="#1c1a28" />
      <RenkKaydi>
        <g transform={kam}>
          {/* ---------- dış dünya (Z 10.2 cephe … karşı kaldırım): yalnız cam açıklıklarından ve A direğinin sağından ---------- */}
          <g>
            <g filter="url(#arPenFlu)">
              <rect x={-300} y={-400} width={1700} height={1140} fill={ARAC.siva} />
              <rect x={-300} y={204} width={1700} height={18} fill={ARAC.silme} />
              {[60, 300, 640, 960].map((x, i) => <rect key={i} x={x} y={-10} width={136} height={170} fill={yanik(i) || i === 2 ? CIC.vUst : CIC.gok} stroke="#4a4458" strokeWidth={5} />)}
              {/* fener havuzu (cepheye, net kenarlı 2 basamak) */}
              <circle cx={fen[0]} cy={fen[1]} r={480} fill={ARAC.cepheHavuz} opacity={0.95} />
              <circle cx={fen[0]} cy={fen[1]} r={340} fill={ARAC.haleDis} opacity={0.95} />
              {/* daktilo penceresi (zemin kat, kapının solunda) + sekreter */}
              <rect x={426} y={380} width={148} height={210} fill="#5a5266" />
              <rect x={432} y={386} width={136} height={198} fill={CIC.daktiloIc} />
              <line x1={500} y1={386} x2={500} y2={584} stroke="#5a5266" strokeWidth={4} />
              <rect x={612} y={400} width={174} height={322} fill={ARAC.kapiAhsap} /><rect x={700} y={400} width={86} height={322} fill={ARAC.kapiIsik} />
              <rect x={575} y={330} width={248} height={14} fill="#8a8494" />
              <Tarama sekil={[[575, 344], [823, 344], [823, 360], [575, 360]]} basamak="III" aci={20} renk={CIC.tarama} derinlik="orta" seed={SEED_C + 2} />
              <rect x={-300} y={640} width={1700} height={100} fill={CIC.andezit} />
              <rect x={-300} y={720} width={1700} height={60} fill={ARAC.yolUzak} />
              <polygon points={poly([[860, 720], [1060, 720], [1120, 780], [820, 780]])} fill={CIC.kapiHavuz} />
            </g>
            <g transform={`translate(0 ${DK.yaziyor ? Math.sin(p * 1.7) * 0.8 : 0})`}><SiluetFigur40 kod="topuzlu" ayak={[478, 584 + 0.95 * 124]} pxm={124} renk={CIC.sekreter} yon={1} oturan={0.45} golge={false} kirp={584} /></g>
            <polygon points={poly([[498, 584], [530, 584], [526, 572], [502, 572]])} fill="#2e2a38" />
            <Fener c={fen} r={19} hale={[60, 110]} kol={1} />
          </g>
          {/* uzak taraf (Z 3.22): uzak kapı içi; uzak cam bandı y 511–653 */}
          <path fillRule="evenodd" d={`M 100 430 H 1000 V 900 H 100 Z M 100 ${uzakCam[0]} H 1000 V ${uzakCam[1]} H 100 Z`} fill="#26283a" clipPath="url(#arPenCam)" />
          <rect x={100} y={uzakCam[0] - 4} width={900} height={8} fill="#2e3046" clipPath="url(#arPenCam)" />
          <Tarama sekil={[[100, uzakCam[1]], [1000, uzakCam[1]], [1000, uzakCam[1] + 14], [100, uzakCam[1] + 14]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="yakin" seed={SEED + 3} />
          {/* ---------- iç (cam açıklığından) + fenerden sıcak bant ---------- */}
          <g clipPath="url(#arPenCam)">
            {ic(false)}
            <g clipPath="url(#arPenBant)">{ic(true)}</g>
            {/* yakın cam: iki çapraz yansıma şeridi (A direğine paralel), yüzlerden ve banknot yolundan uzak */}
            <polygon points={poly([[135, 980], [195, 980], [255, 446], [195, 446]])} fill={ARAC.camYansima} opacity={0.08} />
            <polygon points={poly([[230, 900], [248, 900], [300, 446], [282, 446]])} fill={ARAC.camYansima} opacity={0.08} />
            <polygon points={poly([[735, 835], [785, 835], [785, 446], [770, 446]])} fill={ARAC.camYansima} opacity={0.08} />
          </g>
          {/* ---------- gövde (Z 1.62): çatı silueti, direkler, krom çerçeve, bel çıtası, kapı, kol, çamurluk, basamak ---------- */}
          <path fillRule="evenodd" d={`M -40 300 Q 300 284 700 312 Q 830 330 880 380 L 1000 845 L 1080 862 L 1120 862 L 1120 1300 L -40 1300 Z ${camD} ${ventD}`} fill={ARAC.govde} stroke={mur} strokeWidth={4} />
          <path d={camD} fill="none" stroke={ARAC.krom} strokeWidth={8} /><path d={camD} fill="none" stroke={ARAC.kromParlak} strokeWidth={2} transform="translate(2 -2)" opacity={0.6} />
          <path d={ventD} fill="none" stroke={ARAC.krom} strokeWidth={7} />
          <rect x={785} y={446} width={12} height={389} fill={ARAC.krom} />
          <path d="M -40 300 Q 300 284 700 312 Q 830 330 880 380 L 1000 845" fill="none" stroke={CIC.kenar} strokeWidth={3} />
          <path d="M -40 399 Q 300 386 760 404" fill="none" stroke="#3a3c50" strokeWidth={5} />
          <rect x={70} y={420} width={55} height={430} fill="#1e2030" />
          <rect x={-40} y={860} width={1100} height={45} fill={ARAC.yansima} />
          <rect x={-40} y={835} width={1000} height={16} fill={ARAC.krom} /><rect x={-40} y={835} width={1000} height={4} fill={ARAC.kromParlak} />
          <line x1={128} y1={851} x2={128} y2={1241} stroke={mur} strokeWidth={4} />
          <path d="M 905 851 Q 930 1050 905 1241" stroke={mur} strokeWidth={4} fill="none" />
          {/* kapı kolu (krom, itme düğmeli) */}
          <rect x={160} y={870} width={120} height={22} rx={11} fill={ARAC.krom} stroke={mur} strokeWidth={3} />
          <rect x={166} y={872} width={100} height={6} rx={3} fill={ARAC.kromParlak} />
          <circle cx={292} cy={881} r={9} fill={ARAC.krom} stroke={mur} strokeWidth={2.5} />
          <rect x={-40} y={1241} width={1000} height={21} fill={ARAC.altKivrim} />
          <Tarama sekil={[[-40, 1241], [960, 1241], [960, 1262], [-40, 1262]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="yakin" seed={SEED + 6} />
          {/* 11 kaput + ön çamurluk (kavis) + lastik dilimi */}
          <path d="M 1000 845 L 1120 862 L 1120 1300 L 930 1290 Q 900 1150 915 1050 Q 940 950 1080 880 Z" fill={ARAC.govde} stroke={mur} strokeWidth={4} />
          <path d="M 1080 880 Q 960 960 915 1150 Q 905 1230 930 1290" fill="none" stroke={mur} strokeWidth={5} />
          <path d="M 1080 880 Q 1010 905 975 935" fill="none" stroke={ARAC.cepheHavuz} strokeWidth={6} />
          <Tarama sekil={[[930, 1150], [1080, 1150], [1080, 1290], [930, 1290]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="yakin" seed={SEED + 7} />
          <rect x={1010} y={1330} width={110} height={362} fill={ARAC.lastik} />
          <path d="M 1000 845 L 1120 862" stroke={CIC.kenar} strokeWidth={2.5} />
          {/* 12 basamak (lastik, 4 nervür, krom kenar) */}
          <rect x={-40} y={1288} width={1160} height={101} fill={ARAC.basamak} />
          {[1300, 1318, 1342, 1370].map((y, i) => <line key={i} x1={-40} y1={y + (rnd(SEED + 8, i) - 0.5) * 8} x2={1120} y2={y + (rnd(SEED + 8, i) - 0.5) * 8} stroke={ARAC.nervur} strokeWidth={4} />)}
          <rect x={-40} y={1389} width={1160} height={6} fill={ARAC.krom} />
          <line x1={120} y1={1391} x2={520} y2={1391} stroke={ARAC.kromParlak} strokeWidth={2} />
          <rect x={-40} y={1395} width={1160} height={29} fill="#24222e" />
          {/* 13 gövde altı gölge */}
          <rect x={-40} y={1424} width={1160} height={130} fill="#1c1a28" />
          {/* 14 oluk + parke + birikinti (basamak kenarının kırık yansıması) */}
          {parke}
          <path d="M 220 1600 Q 480 1570 760 1606 Q 700 1660 480 1668 Q 260 1660 220 1600 Z" fill={ARAC.yolAksam} />
          {[[260, 1612, 120], [420, 1622, 90], [560, 1616, 140]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height={5} fill={ARAC.yolUzak} />)}
          {/* 15 bordür (andezit) + 16 ıslak kaldırım */}
          <rect x={-40} y={1691} width={1160} height={69} fill={ARAC.bordur} /><rect x={-40} y={1691} width={1160} height={6} fill={ARAC.bordurUst} />
          {[310, 790].map((x, i) => <line key={i} x1={x + rnd(SEED_C, `b${i}`) * 40} y1={1691} x2={x + rnd(SEED_C, `b${i}`) * 40} y2={1760} stroke={ARAC.derz} strokeWidth={3} />)}
          <rect x={-40} y={1760} width={1160} height={200} fill={ARAC.kaldirim} />
          {[180, 560, 930].map((x, i) => <line key={i} x1={x} y1={1760} x2={x - 30} y2={1960} stroke={ARAC.derz} strokeWidth={4} />)}
          {Array.from({ length: 10 }).map((_, i) => <ellipse key={i} cx={40 + rnd(SEED, `p${i}`) * 1000} cy={1785 + rnd(SEED, `q${i}`) * 120} rx={6 + rnd(SEED, `s${i}`) * 8} ry={2.5} fill={ARAC.parilti} opacity={0.5} />)}
        </g>
      </RenkKaydi>
    </svg>
  );
};

// =====================================================================================================================
// KUCAK (P05) v2.1 (orkestra KC4 notu): tavandan 70° aşağı, ön = üst. Devir düzlemi 2300 px/m. Kadrajda en çok 3 el:
// Moyzisch'in sol eli jantta (tam kadrajda, parmaklar jantın ARKASINDA, başparmak önde) + devri yapan iki el (ya da devirden sonra
// Bazna'nın zarfa bastıran eli ve Moyzisch'in dizine dayanan eli). Kollar alt köşelerdeki omuz bandından kısa ön kol olarak girer
// (ön plan: iki omuz, flu, yüzsüz). El üstünde tarama yok. Fener bandı (net kenar) kucaklara ve zarfa düşer.
// parametreler: el {moyzischSol, moyzisch, bazna} · nesneler [{tur, kare, x, y, aci, olcek, tutan (el adı | "cep" | null), uc? (tutulan
//   ucun nesne-yerel konumu −1…1, adım; −0.8 = sol uç)}]
// =====================================================================================================================
const KucakGorunum: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const PXM = 2300, { k, kam } = kamS(plan, p);
  const EL = param<Record<string, ElA>>(plan, "el", {});
  const NS = param<(NesneA & { tur: "zarf" | "filmKutusu"; uc?: number[] })[]>(plan, "nesneler", []);
  const isik: P = [-0.95, -0.2], TH = 70, KOLK = 0.5; // tepeden: üst kol aşağı iner → ekranda ≈ yarı boy
  const geo: Record<string, ReturnType<typeof elGeo>> = {};
  for (const [ad, e] of Object.entries(EL)) geo[ad] = elGeo(e, p, PXM, KOLK);
  const nesne = (n: NesneA & { tur: "zarf" | "filmKutusu"; uc?: number[] }, i: number) => {
    const tutan = adim((n.tutan ?? [null]) as (string | null)[], n.kare, p);
    if (tutan === "cep") return { tutan, g: null as React.ReactNode };
    const a = deger(n.aci, n.kare, p), o = n.olcek ? deger(n.olcek, n.kare, p) : 1;
    const W = n.tur === "zarf" ? 0.24 * PXM * o : 0.0825 * PXM * 0.92 * o, uc = n.uc ? adim(n.uc, n.kare, p) : 0, ra = (a * Math.PI) / 180;
    // küçük nesne (film kutusu) kavrama noktasında; zarf kendi anahtarında (eller json'da `hedef` ile zarfın uçlarına oturur)
    const xy: P = n.tur === "filmKutusu" && tutan && geo[tutan] ? [geo[tutan].kavrama[0] - Math.cos(ra) * uc * 0.5 * W, geo[tutan].kavrama[1] - Math.sin(ra) * uc * 0.5 * W] : [deger(n.x, n.kare, p), deger(n.y, n.kare, p)];
    kilit.push({ ad: n.tur, p: ekranNokta(k, xy), tur: "dokunus" });
    const g = <g key={`n${i}`} transform={`translate(${xy[0]} ${xy[1]}) rotate(${a})`}>{n.tur === "zarf" ? <Zarf W={W} golge={tutan ? 0 : 0.3} golgeKay={tutan ? [14, 10] : [8, 6]} /> : <FilmKutusu H={W} />}</g>;
    return { tutan, g };
  };
  const ns = NS.map(nesne);
  const tutulan = (ad: string) => { const t = ns.filter((q) => q.tutan === ad).map((q) => q.g); return t.length ? <g>{t}</g> : undefined; };
  const serbest = ns.filter((q) => !q.tutan).map((q) => q.g);
  const rulo: number[] = []; for (let x = 380, i = 0; x < 720 && i < 8; i++) { rulo.push(x); x += 60 + rnd(SEED + 20, i) * 20; }
  const jM: P = [430, 460], jR: [number, number] = [300, 225];
  const elips = (a0: number, a1: number): P[] => Array.from({ length: 13 }, (_, i) => { const t = ((a0 + ((a1 - a0) * i) / 12) * Math.PI) / 180; return [jM[0] + Math.cos(t) * jR[0], jM[1] + Math.sin(t) * jR[1]] as P; });
  // jant kavrama noktası (saat 8 civarı, kadraj içinde): parmaklar jantın arkasında → jant parçası el "arka" ile "ön" (başparmak) arasında
  const jantParca = (a0: number, a1: number) => <g><polyline points={poly(elips(a0, a1))} fill="none" stroke={mur} strokeWidth={32} strokeLinecap="round" /><polyline points={poly(elips(a0, a1))} fill="none" stroke={ARAC.jant} strokeWidth={26} strokeLinecap="round" /></g>;
  const ortak = { pxm: PXM, isik, th: TH, kol: KOLK, taramasiz: true } as const;
  const bant: P[] = [[-200, 860], [1300, 980], [1300, 1420], [-200, 1300]];
  for (const [ad, e] of Object.entries(EL)) kilit.push({ ad: `${ad} eli`, p: ekranNokta(k, anP(e.bilek, e.kare, p)), tur: "dokunus" });
  const zemin = (
    <g>
      <rect x={-300} y={-300} width={1700} height={2600} fill={ARAC.paspas} />
      {/* ön panel alt kenarı + krom şerit + düğme */}
      <rect x={-300} y={-300} width={1700} height={590} fill={ARAC.panel} />
      <rect x={-300} y={278} width={1700} height={12} fill={ARAC.krom} /><rect x={-300} y={278} width={1700} height={3} fill={ARAC.kromParlak} />
      <circle cx={860} cy={210} r={22} fill={ARAC.krom} stroke={mur} strokeWidth={3} />
      {/* kanepe oturağı (orta şerit, dikey rulolar) */}
      <rect x={360} y={290} width={380} height={1800} fill={ARAC.oturakTepe} />
      {rulo.map((x, i) => <g key={i}><line x1={x} y1={290} x2={x + 6} y2={2100} stroke={ARAC.dikis} strokeWidth={4} /><line x1={x + 5} y1={290} x2={x + 11} y2={2100} stroke="#5a464c" strokeWidth={2} strokeDasharray="6 6" /></g>)}
      {/* Moyzisch'in uyluğu (sol) + palto eteği · Bazna'nın uyluğu (sağ) + ceket eteği */}
      <path d="M -300 2100 L -300 640 Q -60 540 200 580 Q 380 610 400 780 L 390 1600 L -300 1700 Z" fill={ARAC.pantolonM} stroke={mur} strokeWidth={4} />
      <path d="M 40 620 Q 180 650 300 780" stroke="#1c1a28" strokeWidth={4} fill="none" opacity={0.6} />
      <path d="M 1400 2100 L 1400 680 Q 1100 570 870 630 Q 690 670 680 830 L 690 1600 L 1400 1700 Z" fill="#262536" stroke={mur} strokeWidth={4} />
      {/* vites kolu (orta, Moyzisch'in boşalan eli için dayanak değil — yalnız ipucu) */}
      <line x1={560} y1={290} x2={540} y2={520} stroke="#3a3848" strokeWidth={10} /><circle cx={540} cy={520} r={16} fill="#2e2c3a" stroke={mur} strokeWidth={3} />
      {/* direksiyon: tam halka, 3 kol, göbek; kolon panele */}
      <rect x={400} y={-300} width={60} height={760} fill="#24222e" />
      <ellipse cx={jM[0]} cy={jM[1]} rx={jR[0]} ry={jR[1]} fill="none" stroke={mur} strokeWidth={32} />
      <ellipse cx={jM[0]} cy={jM[1]} rx={jR[0]} ry={jR[1]} fill="none" stroke={ARAC.jant} strokeWidth={26} />
      <polyline points={poly(elips(-80, 10))} fill="none" stroke={CIC.kenar} strokeWidth={3} />
      {[90, 210, 330].map((a, i) => { const t = (a * Math.PI) / 180; return <line key={i} x1={jM[0]} y1={jM[1]} x2={jM[0] + Math.cos(t) * jR[0] * 0.93} y2={jM[1] + Math.sin(t) * jR[1] * 0.93} stroke={ARAC.jant} strokeWidth={18} />; })}
      <circle cx={jM[0]} cy={jM[1]} r={35} fill={ARAC.jant} stroke={mur} strokeWidth={4} />
      <Tarama sekil={[[jM[0], jM[1] - 35], [jM[0] + 35, jM[1]], [jM[0], jM[1] + 35]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="insert" seed={SEED + 21} />
      {serbest}
    </g>
  );
  // ön plan omuz bandı (flu, yüzsüz): iki adamın omuzları/ceketleri — kolların kökünü örter, alt ölü alanı doldurur
  const omuzBandi = (
    <g filter="url(#arKuFlu)">
      <path d="M -300 2200 L -300 1500 Q -40 1380 220 1440 Q 420 1490 470 1640 L 470 2200 Z" fill="#1e1d2a" />
      <path d="M 1400 2200 L 1400 1500 Q 1140 1390 880 1450 Q 680 1500 640 1650 L 640 2200 Z" fill="#1a1a26" />
      <path d="M -300 1500 Q -40 1380 220 1440 Q 420 1490 470 1640" fill="none" stroke={CIC.kenar} strokeWidth={4} opacity={0.35} />
    </g>
  );
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs><clipPath id="arKuBant"><polygon points={poly(bant)} /></clipPath><SicakFiltre id="arKuSicak" a={0.5} /><filter id="arKuFlu" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={9} /></filter></defs>
      <rect width={1080} height={1920} fill="#1c1a28" />
      <RenkKaydi>
        <g transform={kam}>
          {zemin}
          {/* fenerden net kenarlı sıcak bant: kucaklar + kucaktaki zarf (eller hariç; ten L* ≤ 75) */}
          <g clipPath="url(#arKuBant)"><g filter="url(#arKuSicak)">{zemin}</g></g>
          {elCiz("moyzisch sol (jant)", EL.moyzischSol, p, { ...ortak, palet: EL_MOYZISCH, kolRenk: ARAC.paltoM, gen: [150, 128, 100], kenar: 0.6, tutulan: jantParca(150, 175) })}
          {elCiz("moyzisch sağ", EL.moyzisch, p, { ...ortak, palet: EL_MOYZISCH, kolRenk: ARAC.paltoM, gen: [160, 138, 108], kenar: 0.7, tutulan: tutulan("moyzisch"), temas: [10, 8] })}
          {elCiz("bazna sol", EL.bazna, p, { ...ortak, palet: EL_BAZNA, kolRenk: "#3b3a4e", gen: [170, 146, 112], kenar: 0.5, tutulan: tutulan("bazna"), temas: [10, 8], ayna: true })}
          {omuzBandi}
        </g>
      </RenkKaydi>
    </svg>
  );
};

// =====================================================================================================================
// DIS (P09a): karşı kaldırımdan elçilik (mekanlar §2.9). x = 540 + X·F/Z, y = 1000 + (1.5 − h)·F/Z; F 1300; cephe Z 9.
// parametreler: sekreter {kare, X[], Z[], pencereKalkis, kapidan, biner, adimlar?} · araba {kare, x[] (gövde öteleme px), uzakKapi [0..1], uzakKapiKare[]} · daktilo {yaziyor}
// =====================================================================================================================
const DF = 1300, DU = 1000, DG = 1.5;
const dx = (X: number, Z: number) => 540 + (X * DF) / Z, dy = (h: number, Z: number) => DU + ((DG - h) * DF) / Z;
const DisGorunum: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const { k, kam } = kamS(plan, p);
  const SK = param<{ kare: number[]; X: number[]; Z: number[]; pencereKalkis?: number; kapidan?: number; biner?: number; otur?: number } | null>(plan, "sekreter", null);
  const AR = param<{ kare?: number[]; x?: number[]; uzakKapi?: number[]; uzakKapiKare?: number[] }>(plan, "araba", {});
  const DK = param<{ yaziyor?: boolean }>(plan, "daktilo", { yaziyor: true });
  const BK = param<{ acik?: number[]; kare?: number[] }>(plan, "binaKapi", {});
  const ax = AR.x ? deger(AR.x, AR.kare, p) : 0, uk = AR.uzakKapi ? deger(AR.uzakKapi, AR.uzakKapiKare, p) : 0;
  const bk = BK.acik ? deger(BK.acik, BK.kare, p) : 0;
  const ZC = 9.0, pc = DF / ZC;
  const fen: P = [dx(1.05, 8.75), dy(2.1, 8.75)];
  const masada = !SK || p < (SK.pencereKalkis ?? 1e9);
  const disarda = !!SK && p >= (SK.kapidan ?? 0) && p < (SK.biner ?? 1e9);
  const icerde = !!SK && p >= (SK.biner ?? 1e9);
  const LIN = Easing.linear, sXf = (t: number) => deger(SK!.X, SK!.kare, t, 0, LIN), sZf = (t: number) => deger(SK!.Z, SK!.kare, t, 9, LIN);
  const sX = SK ? sXf(p) : 0, sZ = SK ? sZf(p) : 9;
  // yürüme fazı: katedilen yol / yarım adım (0.35 m), anahtarlar arası doğrusal yol
  let yolM = 0; if (SK) { let x0 = sXf(SK.kapidan ?? 0), z0 = sZf(SK.kapidan ?? 0); for (let t = (SK.kapidan ?? 0) + 1; t <= p; t++) { const x1 = sXf(t), z1 = sZf(t); yolM += Math.hypot(x1 - x0, z1 - z0); x0 = x1; z0 = z1; } }
  const hareket = SK ? Math.hypot(sXf(p + 1) - sX, sZf(p + 1) - sZ) > 0.002 : false;
  const zeminH = (Z: number) => (Z > 8.7 ? 0.3 : Z > 8.4 ? 0.15 : 0); // iki basamak (her adım bir basamağa)
  const sAyak: P = [dx(sX, sZ), dy(zeminH(sZ), sZ)];
  if (SK && disarda) kilit.push({ ad: "sekreter ayak", p: ekranNokta(k, sAyak), tur: "ayak" });
  kilit.push({ ad: "daktilo penceresi", p: ekranNokta(k, [330, 930]), tur: "kurulum" });
  kilit.push({ ad: "fener", p: ekranNokta(k, fen), tur: "kurulum" });
  // araba (koyu yeşil Sedan40, sağa bakar, yakın yüz Z 5.1): arka tampon x 770, arka kapı 922–1080+
  const Za = 5.1, pa = DF / Za, ay = (h: number) => dy(h, Za);
  const kapiCam = `M 935 ${ay(1.42)} L 1100 ${ay(1.42)} L 1100 ${ay(0.92)} L 935 ${ay(0.92)} Q 935 ${ay(1.42)} 960 ${ay(1.42)} Z`;
  const arkaCam = `M 900 ${ay(1.4)} Q 935 ${ay(1.56)} 990 ${ay(1.56)} L 922 ${ay(1.56)} L 922 ${ay(1.1)} L 905 ${ay(1.1)} Z`;
  const icSekreter = icerde && SK && <SiluetFigur40 kod="topuzlu" ayak={[dx(1.95, 6.6) , dy(0, 6.6)]} pxm={DF / 6.6} renk="#2e2a3a" yon={1} oturan={0.4} golge={false} />;
  const araba = (
    <g transform={`translate(${ax} 0)`}>
      <defs><clipPath id="arDisCam"><path d={`${kapiCam} ${arkaCam}`} /></clipPath></defs>
      <ellipse cx={1000} cy={ay(0) + 4} rx={290} ry={14} fill="#14121a" opacity={0.6} />
      {/* camların ardı: uzak taraf + uzak arka kapı (açılır: çerçevesi cam içinden görünür) + oturan sekreter */}
      <g clipPath="url(#arDisCam)">
        <rect x={840} y={ay(1.7)} width={400} height={ay(0.8) - ay(1.7)} fill="#2a2e3e" />
        <rect x={840} y={ay(1.45)} width={400} height={(ay(0.95) - ay(1.45))} fill={CIC.vDis} opacity={0.35} />
        {uk > 0.02 && <polygon points={poly([[dx(1.45, 6.85) + ax * 0, ay(1.45) + 6], [dx(1.45, 6.85) + 140 * uk, ay(1.4) + 4], [dx(1.45, 6.85) + 140 * uk, ay(0.9)], [dx(1.45, 6.85), ay(0.92)]])} fill="#353a36" stroke={mur} strokeWidth={3} />}
        {icSekreter}
      </g>
      {/* gövde: çatı → bagaj eğrisi → arka tampon; arka çamurluk kavsi + lastik; basamak; arka kapı */}
      <path fillRule="evenodd" d={`M 768 ${ay(0.42)} Q 760 ${ay(0.72)} 790 ${ay(0.86)} Q 830 ${ay(1.0)} 870 ${ay(1.22)} Q 920 ${ay(1.55)} 990 ${ay(1.62)} L 1200 ${ay(1.62)} L 1200 ${ay(0.4)} L 790 ${ay(0.4)} Z ${kapiCam} ${arkaCam}`} fill={ARAC.yesil} stroke={mur} strokeWidth={3} />
      <path d={`M 790 ${ay(0.86)} Q 830 ${ay(1.0)} 870 ${ay(1.22)} Q 920 ${ay(1.55)} 990 ${ay(1.62)} L 1200 ${ay(1.62)}`} fill="none" stroke={CIC.kenar} strokeWidth={2.5} />
      <path d={kapiCam} fill="none" stroke={ARAC.krom} strokeWidth={4} /><path d={arkaCam} fill="none" stroke={ARAC.krom} strokeWidth={3} />
      <rect x={780} y={ay(0.92)} width={420} height={6} fill={ARAC.krom} />
      <rect x={780} y={ay(0.88)} width={420} height={ay(0.7) - ay(0.88)} fill={ARAC.yesilYansima} opacity={0.7} />
      <line x1={922} y1={ay(1.45)} x2={922} y2={ay(0.42)} stroke={mur} strokeWidth={3} />
      <rect x={950} y={ay(0.84)} width={44} height={9} rx={4} fill={ARAC.krom} stroke={mur} strokeWidth={1.5} />
      {/* arka çamurluk (ayrık, kavisli) + lastik + altı tarama */}
      <path d={`M 790 ${ay(0.4)} Q 800 ${ay(0.78)} 870 ${ay(0.8)} Q 930 ${ay(0.78)} 940 ${ay(0.4)} Z`} fill="#343c37" stroke={mur} strokeWidth={3} />
      <path d={`M 810 ${ay(0.42)} Q 820 ${ay(0.66)} 868 ${ay(0.68)} Q 915 ${ay(0.66)} 922 ${ay(0.42)}`} fill="#1c1e22" />
      <circle cx={866} cy={ay(0.36)} r={0.36 * pa} fill={ARAC.lastik} /><circle cx={866} cy={ay(0.36)} r={0.15 * pa} fill={ARAC.krom} />
      <Tarama sekil={[[790, ay(0.5)], [940, ay(0.5)], [940, ay(0.4)], [790, ay(0.4)]]} basamak="III" aci={20} renk={CIC.tarama} derinlik="orta" seed={SEED + 30} />
      <rect x={940} y={ay(0.36)} width={260} height={ay(0.21) - ay(0.36)} fill={ARAC.basamak} />
      <rect x={760} y={ay(0.5)} width={30} height={ay(0.3) - ay(0.5)} rx={6} fill={ARAC.krom} stroke={mur} strokeWidth={2} />
      <rect x={776} y={ay(0.62)} width={22} height={14} fill="#26282e" />
    </g>
  );
  // ıslak parke yol (Z 7.0 → yakın bordür)
  const yolS: React.ReactNode[] = [];
  for (let r = 0, y = 1279; y < 1675; r++) { const h = 14 + r * 5, kay = rnd(SEED_Y, `d${r}`) * 50; for (let x = -kay - 200; x < 1300; x += 44 + r * 6 + rnd(SEED_Y, `e${r}${x | 0}`) * 16) yolS.push(<rect key={`${r}-${x | 0}`} x={x} y={y} width={40 + r * 6} height={h - 2} rx={3} fill={rnd(SEED_Y, `f${r}${x | 0}`) > 0.7 ? "#343a56" : ARAC.yolAksam} stroke={ARAC.yolYakin} strokeWidth={1.5} />); y += h; }
  const refl = Array.from({ length: 6 }).map((_, i) => { const y0 = 1430 + i * 36 + rnd(SEED_Y, `r${i}`) * 10; return <rect key={i} x={fen[0] - 12 + (rnd(SEED_Y, `x${i}`) - 0.5) * 10} y={y0} width={24 - i * 1.5} height={18 + rnd(SEED_Y, `h${i}`) * 10} fill={i < 3 ? ARAC.haleIc : CIC.kapiHavuz} opacity={0.85 - i * 0.08} />; });
  const yanik = (i: number, j: number) => (i === 2 || i === 1) && j === 0;
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <rect width={1080} height={1920} fill="#26283a" />
      <RenkKaydi>
        <g transform={kam}>
          {/* 1 cephe (Z 9): sıva, 1. kat silmesi, 1. kat pencereleri, andezit subasman, fener havuzu */}
          <rect x={-300} y={-300} width={1700} height={dy(0, ZC) + 300} fill={ARAC.siva} />
          <circle cx={fen[0]} cy={fen[1]} r={400} fill={ARAC.cepheHavuz} />
          <circle cx={fen[0]} cy={fen[1]} r={235} fill={ARAC.haleDis} />
          <rect x={-300} y={dy(4.1, ZC) - 9} width={1700} height={18} fill={ARAC.silme} stroke={mur} strokeWidth={1.5} />
          {[-1.9, 0.6, 3.1].map((X, i) => [0, 1].map((j) => { const x0 = dx(X - 0.55 + j * 0, ZC) + j * 0; if (j) return null; return <g key={`${i}`}>
            <rect x={x0 - 8} y={dy(6.2, ZC) - 8} width={1.1 * pc + 16} height={(6.2 - 4.5) * pc + 16} fill="#5e5664" />
            <rect x={x0} y={dy(6.2, ZC)} width={1.1 * pc} height={(6.2 - 4.5) * pc} fill={yanik(i, 0) ? CIC.vUst : CIC.gok} />
            <line x1={x0 + 0.55 * pc} y1={dy(6.2, ZC)} x2={x0 + 0.55 * pc} y2={dy(4.5, ZC)} stroke="#4a4458" strokeWidth={4} />
            <rect x={x0 - 10} y={dy(4.5, ZC)} width={1.1 * pc + 20} height={7} fill="#8a8090" />
          </g>; }))}
          <rect x={-300} y={dy(1.0, ZC)} width={1700} height={pc} fill={CIC.andezit} />
          {[0.33, 0.66].map((h) => <line key={h} x1={-300} y1={dy(h, ZC)} x2={1400} y2={dy(h, ZC)} stroke="#4a4652" strokeWidth={2} />)}
          {/* 2 daktilo penceresi (sekreter kalkar → sandalye + daktilo boş) */}
          <rect x={243} y={805} width={175} height={246} fill="#5e5664" />
          <rect x={251} y={813} width={159} height={230} fill={CIC.daktiloIc} />
          <line x1={330} y1={813} x2={330} y2={1043} stroke="#5e5664" strokeWidth={4} />
          {masada ? <g transform={`translate(0 ${DK.yaziyor ? Math.sin(p * 1.7) * 0.6 : 0})`}><SiluetFigur40 kod="topuzlu" ayak={[318, 1043 + 0.95 * pc]} pxm={pc} renk={CIC.sekreter} yon={1} oturan={0.45} golge={false} kirp={1043} /></g>
            : <path d={`M 300 1043 L 300 1000 L 318 996 L 320 1043 Z`} fill="#3a3448" />}
          <polygon points={poly([[340, 1043], [384, 1043], [380, 1026], [344, 1026]])} fill="#2e2a38" />
          <rect x={243} y={1043} width={175} height={8} fill="#8a8090" />
          {/* 3 kapı (açılır) + beton saçak (altı tarama) + iki basamak */}
          <rect x={461} y={dy(2.9, ZC)} width={202} height={dy(0.3, ZC) - dy(2.9, ZC)} fill="#2a2632" />
          <polygon points={poly([[461 + 202 * bk * 0.0, dy(2.9, ZC)], [663 - 150 * bk, dy(2.9, ZC) - 10 * bk], [663 - 150 * bk, dy(0.3, ZC) + 6 * bk], [461, dy(0.3, ZC)]])} fill={ARAC.kapiAhsap} stroke={mur} strokeWidth={3} />
          <circle cx={640 - 150 * bk} cy={dy(1.3, ZC)} r={6} fill={CIC.kolMetal} />
          <rect x={432} y={dy(3.1, ZC) - 7} width={260} height={14} fill="#8a8494" stroke={mur} strokeWidth={2} />
          <Tarama sekil={[[432, dy(3.1, ZC) + 7], [692, dy(3.1, ZC) + 7], [692, dy(3.1, ZC) + 24], [432, dy(3.1, ZC) + 24]]} basamak="III" aci={20} renk={CIC.tarama} derinlik="orta" seed={SEED + 31} />
          <polygon points={poly([[dx(-0.75, 9.0), dy(0.3, 9.0)], [dx(1.05, 9.0), dy(0.3, 9.0)], [dx(1.05, 8.7), dy(0.3, 8.7)], [dx(-0.75, 8.7), dy(0.3, 8.7)]])} fill="#7a7484" />
          <rect x={dx(-0.75, 8.7)} y={dy(0.3, 8.7)} width={dx(1.05, 8.7) - dx(-0.75, 8.7)} height={dy(0.15, 8.7) - dy(0.3, 8.7)} fill="#5e5a66" stroke={mur} strokeWidth={2} />
          <polygon points={poly([[dx(-0.95, 8.7), dy(0.15, 8.7)], [dx(1.25, 8.7), dy(0.15, 8.7)], [dx(1.25, 8.4), dy(0.15, 8.4)], [dx(-0.95, 8.4), dy(0.15, 8.4)]])} fill="#86808e" />
          <rect x={dx(-0.95, 8.4)} y={dy(0.15, 8.4)} width={dx(1.25, 8.4) - dx(-0.95, 8.4)} height={dy(0, 8.4) - dy(0.15, 8.4)} fill="#5e5a66" stroke={mur} strokeWidth={2} />
          {/* 4 fener */}
          <Fener c={fen} r={22} hale={[70, 125]} kol={-1} />
          {/* 5 karşı kaldırım + bordür (fener yamuğu) */}
          <polygon points={poly([[-300, dy(0, 8.4)], [1400, dy(0, 8.4)], [1400, dy(0, 7.0)], [-300, dy(0, 7.0)]])} fill={ARAC.yolUzak} />
          <polygon points={poly([[520, dy(0, 8.4)], [900, dy(0, 8.4)], [930, dy(0, 7.05)], [500, dy(0, 7.05)]])} fill={CIC.kapiHavuz} />
          <rect x={-300} y={dy(0, 7.0) - 2} width={1700} height={8} fill={ARAC.bordur} />
          {/* sekreter (yürür; kapıda basamaklarda, kaldırımda) — arabanın arkasında kalırsa araba örter */}
          {SK && disarda && <g>
            <ellipse cx={sAyak[0]} cy={sAyak[1]} rx={0.22 * DF / sZ} ry={0.035 * DF / sZ} fill="#14120f" opacity={0.6} />
            <SiluetFigur40 isikX={sX < 1.05 ? 1 : -1} kod="topuzlu" ayak={sAyak} pxm={DF / sZ} renk="#2e2a3a" yon={1} adim={hareket ? (yolM / 0.35) * Math.PI : undefined} golge={false} kenar={{ renk: CIC.kenar, dx: sX < 1.05 ? 2 : -2 }} />
          </g>}
          {/* 7 yol (ıslak parke) + fener yansıması (dikey, kırık) + daktilo penceresi yansıması */}
          <rect x={-300} y={1279} width={1700} height={396} fill={ARAC.yolAksam} />
          {yolS}
          {Array.from({ length: 5 }).map((_, i) => <rect key={`dy${i}`} x={262 + (rnd(SEED_Y, `dx${i}`) - 0.5) * 24} y={1335 + i * 38} width={136 - i * 14} height={14} fill={CIC.lambaYayilma} opacity={0.6 - i * 0.08} />)}
          {refl}
          {araba}
          {/* 8 yakın bordür + kaldırım (ön plan) */}
          <rect x={-300} y={1675} width={1700} height={65} fill={ARAC.bordur} /><rect x={-300} y={1675} width={1700} height={6} fill={ARAC.bordurUst} />
          <rect x={-300} y={1740} width={1700} height={300} fill={ARAC.kaldirim} />
          {[90, 470, 860].map((x, i) => <line key={i} x1={x} y1={1740} x2={x - 40} y2={1940} stroke={ARAC.derz} strokeWidth={4} />)}
          {Array.from({ length: 9 }).map((_, i) => <ellipse key={i} cx={30 + rnd(SEED_C, `p${i}`) * 1020} cy={1770 + rnd(SEED_C, `q${i}`) * 120} rx={6 + rnd(SEED_C, `s${i}`) * 8} ry={2.5} fill={ARAC.parilti} opacity={0.5} />)}
        </g>
      </RenkKaydi>
    </svg>
  );
};

const Sahne: React.FC<SablonProps> = (pr) => {
  const g = param<string>(pr.plan, "gorunum", "pencere");
  if (g === "el") return <ElGorunum {...pr} />;
  if (g === "pencere") return <PencereGorunum {...pr} />;
  if (g === "kucak") return <KucakGorunum {...pr} />;
  if (g === "dis") return <DisGorunum {...pr} />;
  throw new Error(`[ARABA] gorunum "${g}" yok (v2: el | pencere | kucak | dis; v1 "ic" tur-4'te kaldırıldı)`);
};
export const ARABA: Sablon = { Sahne, arsiv: () => "litografi" };
