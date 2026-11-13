// ===== KE-PK-S4 LANTERN-ODA v2 (Paris kuşatması 1870; mekanlar.md §4v2 + §4 v1 geometrisi · tasarım §4.9, §4.10, §3.3) =====
// Tek dünya (metre; X sağa, h yukarı, Z kameradan ileri; arka duvar Z 2.95), iki pinhole kamera:
//   `oda`  — göz 1.6 m, F 2600 (tele), ufuk y 1204: perde x 12–1068 / y 412–1468, mercek noktası (150, 1529), memurlar Z 2.15–2.30.
//   `kapi` — kamera (X 1.00, h 1.25, Z 1.15), F 2000, ufuk y 960: perde sağ kenarı şeridi, söve, sıcak gün koridoru, okuyan + bekleyenler.
// TEK ANAHTAR IŞIK lantern: huzme = mercek noktası ile o anki yansıma dikdörtgeninin zarfı; gravür dili (4 sınır ışını 3 px, iç ışınlar 2.5°, dolgu α .10,
// toz). Fade YOK: huzme lamba yanınca uzayarak belirir, dikdörtgen geometrik büyür, bulanıklık = 3 kopya ±14 px birleşir. İkincil: perde (soğuk kenar
// ışığı), kapı (sıcak gün, yalnız kapı çevresi). Görüntüde harf yok; kırmızı yok, sarı metal/pirinç yok, kılıf yok.
import React, { useId } from "react";
import { interpolate } from "remotion";
import { RenkKaydi, Desen } from "../../../doku/Tarama";
import { dortgen, P, rnd } from "../../../doku/sabitler";
import type { Plan } from "../../tipler";
import { cl, CIKIS, ekranNokta, GIRIS, INOUT, kameraHesapla, katDonusum } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";
import { satirYollari } from "../../props/paris/Sayfa";
import { SiluetFigur } from "../../props/paris/SiluetFigur";
import { ayaktaEklem, FigurSiluet } from "../../props/paris/SabahFigur";
import { KolEl } from "../../../rig/KolEl";
import { elGeometri, ElDurum, ParisEl } from "../../props/paris/ParisEl";
import { pchip } from "../galata/GalataTepe";
import { Kam, pr } from "./montmartreDunya";

type Ar = { bas: number; bit: number; temas?: number; kare?: number };
const ar = (v: unknown, d: Ar): Ar => (v && typeof v === "object" && typeof (v as Ar).bas === "number" ? (v as Ar) : d);
const obj = (plan: Plan, ad: string) => ((plan.parametreler?.[ad] ?? {}) as Record<string, unknown>);
const t01 = (p: number, a: number, b: number, e: (t: number) => number = INOUT) => interpolate(p, [a, b], [0, 1], { ...cl, easing: e });
const pt = (a: P[]) => a.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
const lp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const S = 167; // DOKU_SEED.lanternOda

export const KAM_ODA: Kam = { F: 2600, X: 0, e: 1.6, Z: 0, U: 1204 };
export const KAM_KAPI: Kam = { F: 2000, X: 1.0, e: 1.25, Z: 1.15, U: 960 };
const DUVAR_Z = 2.95;
const PERDE = { X0: -0.6, X1: 0.6, h0: 1.3, h1: 2.5, merkezH: 1.9 };
const MERCEK: [number, number, number] = [-0.3, 1.35, 2.0];
const LP = {
  enKoyu: "#1e1d2c", duvar: "#2e2c40", halka: "#4a4762", perde: "#d9d9cf", huzme: "#e4ecd8", satir: "#6d675a",
  lantern: "#2f3238", lanternKenar: "#4a4d52", sehpa: "#4a3f33", memur: "#3a3550", ic: "#2a2838", kenarSoguk: "#d9d9cf",
  sove: "#2a2838", soveIc: "#c9a998", koridor: "#e8cdb6", sicakKenar: "#f0c4a8", palto: "#2a2838", kagit: "#d6d2c6", kagitSatir: "#6d675a",
  zarf: "#d6d2c6", zarfCizgi: "#8a8576", zarfGolge: "#a9a49a", lambri: "#3e3446", cam: "#8a8494",
};

// ---- perdedeki sayfa: aynı P05 sayfası (satırlar dil-nötr), bulanık → net 3 kopya ----
const PerdeSayfa: React.FC<{ r: [number, number, number, number]; bulanik: number; klip?: string; cizgi: number }> = ({ r, bulanik, klip, cizgi }) => {
  const [x0, y0, x1, y1] = r;
  // sayfa oranı (0.21 × 0.27) karede ortalı; çevresi film tabanı ışığı (aynı perde tonu)
  const h = y1 - y0, w = h * (0.21 / 0.27), cx = (x0 + x1) / 2;
  const m = dortgen([cx - w / 2, y0 + h * 0.04], [cx + w / 2, y0 + h * 0.04], [cx + w / 2, y1 - h * 0.04], [cx - w / 2, y1 - h * 0.04]);
  const yollar = satirYollari(m, S + 40, 14);
  const ofs = 14 * bulanik * ((x1 - x0) / 1056 + 0.6);
  const kopya = bulanik > 0.02 ? [-ofs, 0, ofs] : [0];
  return (
    <g clipPath={klip} stroke={LP.satir} strokeWidth={cizgi} strokeLinecap="round" fill="none">
      {kopya.map((d, i) => <g key={i} transform={`translate(${d} ${d * 0.35})`} opacity={kopya.length > 1 ? 0.33 + 0.67 * (1 - bulanik) * (i === 1 ? 1 : 0) : 1}>{yollar.map((y, j) => <path key={j} d={y} />)}</g>)}
    </g>
  );
};

// ---- memur (sırttan, oturan; baş-omuz) — gravür figür dili: kontur + iç çizgi + soğuk kenar ışığı + 78° tarama ----
type Memur = { X: number; Z: number; basH: number; egim: number; kalk: number; ritim: number };
const MemurSirt: React.FC<{ k: Kam; m: Memur; uid: string; isik: number }> = ({ k, m, uid, isik }) => {
  const pxm = k.F / (m.Z - k.Z);
  const bas = pr(k, m.X, m.basH, m.Z), omuzH = m.basH - 0.24 + 0.02 * m.egim, oy = pr(k, m.X, omuzH, m.Z)[1] + m.ritim * 6;
  const ow = 0.22 * pxm, rx = 0.085 * pxm, ry = 0.108 * pxm;
  const bx = bas[0], by = bas[1] + m.egim * 0.03 * pxm + m.ritim * 3;
  const boyunY = by + ry * 0.75;
  const govde = `M${bx - 0.06 * pxm} ${boyunY} C${bx - 0.1 * pxm} ${oy - 8} ${bx - ow * 0.75} ${oy - 10} ${bx - ow} ${oy + 0.06 * pxm} L${bx - ow * 1.06} ${oy + 1.2 * pxm} L${bx + ow * 1.06} ${oy + 1.2 * pxm} L${bx + ow} ${oy + 0.06 * pxm} C${bx + ow * 0.75} ${oy - 10} ${bx + 0.1 * pxm} ${oy - 8} ${bx + 0.06 * pxm} ${boyunY} Z`;
  const kw = Math.max(2, Math.min(4, pxm / 400));
  return (
    <g>
      <defs><clipPath id={`${uid}g`}><path d={govde} /></clipPath><Desen id={`${uid}t`} aci={78} aralik={6} kalin={2} renk={LP.ic} alfa={0.8} seed={S + 3} /></defs>
      <path d={govde} fill={LP.memur} stroke={LP.ic} strokeWidth={kw * 2} />
      <g clipPath={`url(#${uid}g)`}>
        <rect x={bx - ow * 1.2} y={oy + 0.28 * pxm} width={ow * 2.4} height={pxm} fill={`url(#${uid}t)`} />
        {/* yaka + sırt dikişi (iç çizgi) */}
        <path d={`M${bx - 0.09 * pxm} ${boyunY + 6} Q${bx} ${boyunY + 0.06 * pxm} ${bx + 0.09 * pxm} ${boyunY + 6}`} stroke={LP.ic} strokeWidth={kw} fill="none" />
        <line x1={bx} y1={boyunY + 0.06 * pxm} x2={bx} y2={oy + pxm} stroke={LP.ic} strokeWidth={kw} />
      </g>
      {/* baş: ense + saç kütlesi (sırttan); kulaklar */}
      <ellipse cx={bx} cy={by} rx={rx} ry={ry} fill="#4a4358" stroke={LP.ic} strokeWidth={kw * 2} />
      <path d={`M${bx - rx} ${by + ry * 0.1} C${bx - rx} ${by - ry * 1.1} ${bx + rx} ${by - ry * 1.1} ${bx + rx} ${by + ry * 0.1} C${bx + rx * 0.6} ${by + ry * 0.55} ${bx - rx * 0.6} ${by + ry * 0.55} ${bx - rx} ${by + ry * 0.1} Z`} fill={LP.ic} />
      {[-1, 1].map((s) => <ellipse key={s} cx={bx + s * rx * 0.98} cy={by + ry * 0.05} rx={rx * 0.16} ry={ry * 0.26} fill="#4a4358" stroke={LP.ic} strokeWidth={kw} />)}
      {/* perdeden gelen soğuk kenar ışığı: baş ve omuz üst kenarı */}
      {isik > 0 && <g stroke={LP.kenarSoguk} strokeWidth={2.5} fill="none" opacity={0.45 * isik} strokeLinecap="round">
        <path d={`M${bx - rx * 0.85} ${by - ry * 0.5} Q${bx} ${by - ry * 1.08} ${bx + rx * 0.85} ${by - ry * 0.5}`} />
        <path d={`M${bx - ow * 0.98} ${oy + 0.05 * pxm} C${bx - ow * 0.75} ${oy - 8} ${bx - 0.1 * pxm} ${oy - 6} ${bx - 0.07 * pxm} ${boyunY + 4}`} />
        <path d={`M${bx + ow * 0.98} ${oy + 0.05 * pxm} C${bx + ow * 0.75} ${oy - 8} ${bx + 0.1 * pxm} ${oy - 6} ${bx + 0.07 * pxm} ${boyunY + 4}`} />
      </g>}
    </g>
  );
};

// ================================================================== ODA görünümü ==================================================================
const OdaSahne: React.FC<{ plan: Plan; p: number; uid: string; kilit: SablonProps["kilit"] }> = ({ plan, p, uid, kilit }) => {
  const k = kameraHesapla(plan.kamera, p);
  const hz = obj(plan, "huzme") as { lamba_acilir?: Ar };
  const la = ar(hz.lamba_acilir, { bas: 62, bit: 80, temas: 68 }), cam = ar(plan.parametreler?.cam_levha, { bas: 80, bit: 90, temas: 84 });
  const bo = ar(plan.parametreler?.buyume_odak, { bas: 112, bit: 204 });
  const mm = obj(plan, "memurlar") as { durur?: Ar; yazar?: Ar; memur3_kalkis?: Ar };
  const du = ar(mm.durur, { bas: 100, bit: 206 }), ya = ar(mm.yazar, { bas: 206, bit: 248 }), mk = ar(mm.memur3_kalkis, { bas: 250, bit: 266 });
  const yan = la.temas ?? 68;
  const lamba = p >= yan ? 1 : 0; // ışık olayı: lamba yanar (nesne değil)
  const uzan = t01(p, yan, la.bit, GIRIS); // huzme kaynaktan perdeye uzar
  // yansıma dikdörtgeni: küçük kare (154 px) → perde (1056 px); bulanık → net
  const kucuk = 154 / 2, buyuk = 528;
  const yari = kucuk + (buyuk - kucuk) * t01(p, bo.bas, bo.bit, INOUT);
  const C: P = pr(KAM_ODA, 0, PERDE.merkezH, DUVAR_Z);
  const R: [number, number, number, number] = [C[0] - yari, C[1] - yari, C[0] + yari, C[1] + yari];
  const bulanik = p < bo.bas ? 1 : 1 - t01(p, bo.bas + 20, bo.bit, INOUT);
  const icerik = p >= (cam.temas ?? 84);
  const kaynak = pr(KAM_ODA, ...MERCEK);
  const koseler: P[] = [[R[0], R[1]], [R[2], R[1]], [R[2], R[3]], [R[0], R[3]]];
  const uc = (q: P): P => lp(kaynak, q, uzan);
  const acilar = koseler.map((q) => Math.atan2(q[1] - kaynak[1], q[0] - kaynak[0]));
  const aMin = Math.min(...acilar), aMax = Math.max(...acilar);
  // iç ışınlar: kaynaktan 2.5° aralıkla, dikdörtgenin kenarına kadar
  const icIsin: P[] = [];
  for (let a = aMin + (2.5 * Math.PI) / 180; a < aMax - 0.01; a += (2.5 * Math.PI) / 180) {
    const d: P = [Math.cos(a), Math.sin(a)];
    // dikdörtgen kenarıyla kesişim (sol ya da alt kenar — kaynak sol-altta)
    const tx = (R[0] - kaynak[0]) / d[0], ty = (R[3] - kaynak[1]) / d[1];
    const tt = Math.max(tx > 0 ? tx : 0, ty > 0 ? ty : 0);
    icIsin.push([kaynak[0] + d[0] * tt, kaynak[1] + d[1] * tt]);
  }
  const zarfPts = [kaynak, ...koseler.filter((_, i) => i !== 1).map(uc)];
  // memurlar (C turu: omuz 0.42 m > X aralığı 0.28 → derinlik kaydırıldı; rapor tablosu)
  const MEM: { X: number; Z: number; faz: number }[] = [{ X: -0.33, Z: 2.15, faz: 0 }, { X: 0.07, Z: 2.3, faz: 5 }, { X: 0.45, Z: 2.15, faz: 9 }];
  const bakis = t01(p, du.bas, du.bas + 14) * (1 - t01(p, ya.bas, ya.bas + 10));
  const memurlar: Memur[] = MEM.map((m, i) => {
    const yaz = p >= ya.bas && p < ya.bit + 10 ? Math.max(0, Math.sin(((p - ya.bas + m.faz) / 11) * Math.PI)) * (1 - t01(p, ya.bit, ya.bit + 10)) : 0;
    let X = m.X, basH = 1.15 + 0.1 * bakis, kalk = 0;
    if (i === 2 && p >= mk.bas - 4) {
      kalk = t01(p, mk.bas - 4, mk.bas + 8, INOUT);
      basH += (1.69 - 1.15) * kalk;
      X = m.X + 0.32 * t01(p, mk.bas + 2, mk.bit, (t) => t * t);
    }
    return { X, Z: m.Z, basH: basH + (kalk > 0 ? 0.012 * Math.sin(((p - mk.bas) / 8) * Math.PI) * kalk : 0), egim: 1 - bakis, kalk, ritim: yaz };
  });
  // lantern gövdesi (arkadan; mercek gizli): x −215…288, y 1321–1908; baca x 0–60, y 1120–1321
  const toz = Array.from({ length: 7 }, (_, i) => { const t = 0.55 + rnd(S + 9, `t${i}`) * 0.4, kose = koseler[3 - (i % 2)], q = lp(kaynak, [kose[0] + (rnd(S + 9, `x${i}`) - 0.3) * 200, kose[1]], t); return [q[0] + 10 * Math.sin(p / 40 + i), q[1] - ((p * 0.3 + i * 37) % 40)] as P; });
  // cam levha: parisGri el soldan getirir, yuvaya indirir (f84), bırakır
  const yuva = pr(KAM_ODA, -0.27, 1.53, 1.75), levhaPx = 0.08 * (KAM_ODA.F / 1.75);
  const levhaY = yuva[1] - levhaPx - 60 * (1 - t01(p, cam.bas - 8, cam.temas ?? 84, INOUT)) + (p >= (cam.temas ?? 84) ? levhaPx * 0.8 : levhaPx * 0.8 * t01(p, cam.bas - 2, cam.temas ?? 84));
  const camEl: ElDurum | null = p >= cam.bas - 16 && p <= cam.bit + 12 ? (() => {
    const tut: P = [yuva[0], levhaY + 6];
    const giris = t01(p, cam.bas - 16, cam.bas - 6, GIRIS), cik = t01(p, (cam.temas ?? 84) + 2, cam.bit + 12, CIKIS);
    const uc: P = [tut[0] - 420 * (1 - giris) - 460 * cik, tut[1] + 120 * (1 - giris) + 200 * cik];
    return { uc, aci: -12, kolAci: -24, pxm: KAM_ODA.F / 1.7, poz: "kistir" };
  })() : null;
  if (p >= bo.bit) kilit.push({ ad: "perde", p: ekranNokta(k, C), tur: "dokunus" });
  return (
    <g transform={katDonusum(k)}>
      <defs>
        <clipPath id={`${uid}r`}><rect x={R[0]} y={R[1]} width={R[2] - R[0]} height={R[3] - R[1]} rx={10} /></clipPath>
        <clipPath id={`${uid}lv`}><rect x={-400} y={-400} width={1900} height={yuva[1] + 400} /></clipPath>
        <Desen id={`${uid}lt`} aci={100} aralik={7} kalin={2} renk="#1a1a24" alfa={0.85} seed={S + 5} />
      </defs>
      <rect x={-400} y={-400} width={1900} height={2800} fill={lamba ? LP.duvar : LP.enKoyu} />
      {/* perde çevresi yansıma halkası (2. ton, net kenar) + yansıma dikdörtgeni */}
      {lamba > 0 && uzan >= 1 && <rect x={R[0] - 120 * (yari / buyuk) - 14} y={R[1] - 120 * (yari / buyuk) - 14} width={R[2] - R[0] + 2 * (120 * (yari / buyuk) + 14)} height={R[3] - R[1] + 2 * (120 * (yari / buyuk) + 14)} rx={24} fill={LP.halka} />}
      {lamba > 0 && uzan >= 1 && <rect x={R[0]} y={R[1]} width={R[2] - R[0]} height={R[3] - R[1]} rx={10} fill={LP.perde} />}
      {lamba > 0 && uzan >= 1 && icerik && <PerdeSayfa r={R} bulanik={bulanik} klip={`url(#${uid}r)`} cizgi={Math.max(2, 5 * (yari / buyuk))} />}
      {lamba > 0 && uzan >= 1 && <path d={`M${R[0] + 30} ${R[1] + 40} q 60 -20 120 6`} stroke="#c9c9bf" strokeWidth={0} fill="none" />}
      {/* huzme: zarf dolgusu α .10 + iç ışınlar 2 px α .20 + 4 sınır ışını 3 px α .55 + toz */}
      {lamba > 0 && <g>
        <polygon points={pt(zarfPts)} fill={LP.huzme} fillOpacity={0.12} />
        <g stroke={LP.huzme} strokeWidth={2.5} strokeOpacity={0.3} strokeLinecap="round">{icIsin.map((q, i) => { const e = uc(q); return <line key={i} x1={kaynak[0]} y1={kaynak[1]} x2={e[0]} y2={e[1]} />; })}</g>
        <g stroke={LP.huzme} strokeWidth={4} strokeOpacity={0.6} strokeLinecap="round">{koseler.map((q, i) => { const e = uc(q); return <line key={i} x1={kaynak[0]} y1={kaynak[1]} x2={e[0]} y2={e[1]} />; })}</g>
        {uzan >= 1 && toz.map((q, i) => <circle key={i} cx={q[0]} cy={q[1]} r={2 + (i % 3)} fill={LP.huzme} opacity={0.55} />)}
      </g>}
      {/* memurlar (huzmenin altında; perdeye gölge düşmez) — memur-3 sağ kenardan çıkar */}
      {memurlar.map((m, i) => <MemurSirt key={i} k={KAM_ODA} m={m} uid={`${uid}m${i}`} isik={lamba && uzan >= 1 ? Math.min(1, (yari - kucuk) / 120 + 0.4) : 0} />)}
      {/* cam levha (yuvaya iner) + lantern gövdesi */}
      {p >= cam.bas - 16 && <g clipPath={p >= (cam.temas ?? 84) - 6 ? `url(#${uid}lv)` : undefined}>
        <rect x={yuva[0] - levhaPx / 2} y={levhaY} width={levhaPx} height={levhaPx} fill={LP.cam} stroke={LP.sehpa} strokeWidth={10} />
        <line x1={yuva[0] - levhaPx / 2 + 8} y1={levhaY + 8} x2={yuva[0] + levhaPx / 2 - 8} y2={levhaY + 8} stroke={LP.huzme} strokeWidth={2} opacity={0.5} />
      </g>}
      <g>
        <rect x={0} y={1120} width={60} height={210} fill={LP.lantern} stroke={LP.lanternKenar} strokeWidth={4} />
        <rect x={-14} y={1112} width={88} height={20} fill={LP.lanternKenar} stroke="#1a1a24" strokeWidth={3} />
        <path d="M-215 1321 L288 1321 L288 1908 L-215 1908 Z" fill={LP.lantern} stroke={LP.lanternKenar} strokeWidth={6} />
        <path d="M228 1330 L288 1321 L288 1908 L228 1908 Z" fill={`url(#${uid}lt)`} />
        <line x1={yuva[0] - levhaPx / 2 - 6} y1={1321} x2={yuva[0] + levhaPx / 2 + 6} y2={1321} stroke="#1a1a24" strokeWidth={8} />
        {[1500, 1540].map((y, i) => <line key={i} x1={-120} y1={y} x2={190} y2={y} stroke={lamba ? LP.huzme : "#1a1a24"} strokeWidth={3} opacity={lamba ? 0.6 : 1} />)}
        <line x1={-215} y1={1321} x2={288} y2={1321} stroke={LP.kenarSoguk} strokeWidth={2.5} opacity={lamba ? 0.35 : 0} />
        <rect x={-260} y={1900} width={600} height={40} fill={LP.sehpa} stroke="#1a1a24" strokeWidth={4} />
      </g>
      {camEl && <g><ParisEl d={camEl} tip="parisGri" /><g opacity={0.55}><ParisEl d={camEl} tip="parisGri" golge={LP.enKoyu} /></g></g>}
    </g>
  );
};

// ================================================================== KAPI görünümü ==================================================================
const KapiSahne: React.FC<{ plan: Plan; p: number; uid: string; kilit: SablonProps["kilit"] }> = ({ plan, p, uid, kilit }) => {
  const k = kameraHesapla(plan.kamera, p);
  const K = KAM_KAPI, W = (X: number, h: number, Z = DUVAR_Z) => pr(K, X, h, Z);
  const zv = ar(plan.parametreler?.zarf_verilir, { bas: 272, bit: 272, kare: 272 });
  const tVer = (zv.kare ?? zv.temas ?? 272);
  const za = ar(plan.parametreler?.zarf_acilir, { bas: 276, bit: 296, temas: 290 }), ok = ar(plan.parametreler?.okuma, { bas: 296, bit: 386 }), kp = ar(plan.parametreler?.kapanis, { bas: 386, bit: 398 });
  const me = obj(plan, "memur_eli") as { giris?: Ar; cikis?: Ar };
  const mg = ar(me.giris, { bas: 266, bit: 272 }), mc = ar(me.cikis, { bas: 272, bit: 284 });
  const tAc = za.temas ?? 290;
  // perde şeridi (X ≤ 0.60) + yansıma halkası; satırlar devam eder
  const perde = [W(PERDE.X0, PERDE.h1), W(PERDE.X1, PERDE.h1), W(PERDE.X1, PERDE.h0), W(PERDE.X0, PERDE.h0)];
  const halka = [W(PERDE.X0, PERDE.h1 + 0.15), W(PERDE.X1 + 0.15, PERDE.h1 + 0.15), W(PERDE.X1 + 0.15, PERDE.h0 - 0.15), W(PERDE.X0, PERDE.h0 - 0.15)];
  const pm = dortgen(perde[0], perde[1], perde[2], perde[3]);
  const sx = (perde[1][0] - perde[0][0]), sh = perde[3][1] - perde[0][1];
  const pRect = dortgen([perde[0][0] + sx * 0.5 - sh * 0.39, perde[0][1] + sh * 0.04], [perde[0][0] + sx * 0.5 + sh * 0.39, perde[0][1] + sh * 0.04], [perde[0][0] + sx * 0.5 + sh * 0.39, perde[3][1] - sh * 0.04], [perde[0][0] + sx * 0.5 - sh * 0.39, perde[3][1] - sh * 0.04]);
  void pm;
  const acik = [W(0.9, 2.6), W(2.4, 2.6), W(2.4, -0.2), W(0.9, -0.2)];
  const sove = [W(0.8, 2.3), W(0.9, 2.3), W(0.9, -0.2), W(0.8, -0.2)];
  const yanak = [W(0.9, 2.2), W(0.9, 2.2, DUVAR_Z + 0.15), W(0.9, -0.2, DUVAR_Z + 0.15), W(0.9, -0.2)];
  const lambri = [W(0.6, 0.9), W(0.8, 0.9), W(0.8, -0.3), W(0.6, -0.3)];
  // okuyan: gövde (1.15, 0, 2.75), 1.62 m, sola (perdeye) dönük; baş öne-sola eğik
  const okZ = 2.75, okPx = K.F / (okZ - K.Z), ayak = pr(K, 1.15, 0, okZ);
  const okuma = p >= ok.bas && p < ok.bit ? Math.sin(((p - ok.bas) / (ok.bit - ok.bas)) * Math.PI * 2) : 0;
  const e = ayaktaEklem(ayak, okPx, 1.62, { egim: -3, basKaldir: 0 });
  const basEg = -12 + 3 * okuma;
  // kâğıt: merkez (298, 933), 275 × 363 (dünya (0.82, 1.27, 2.64)); zarf (açılmadan önce) aynı derinlikte
  const kap = t01(p, kp.bas, kp.bit, INOUT);
  const kx = 298 + 5 * okuma, ky = 933 + 20 * kap;
  const KAG = { w: 275, h: 363 };
  const zarfW = 270, zarfH = 205;
  const zarfC: P = p < tVer ? (() => { const t = t01(p, mg.bas, mg.bit, GIRIS); return [-260 + (kx + 5 - -260) * t, 1050 + 0 * t] as P; })() : [kx + 5, 1050 + 20 * kap];
  const flap = t01(p, za.bas + 2, tAc, INOUT); // 0 kapalı → 1 açık (yukarı döner)
  const cekT = t01(p, tAc, tAc + 6, INOUT); // sayfa zarftan yukarı çıkar
  const kagUst = (zarfC[1] - zarfH / 2) + 20 + ((ky - KAG.h / 2) - (zarfC[1] - zarfH / 2) - 20) * cekT;
  const kagAlt = Math.min(ky + KAG.h / 2, zarfC[1] + zarfH / 2 - 30);
  const kagVar = p >= tAc;
  // eller: okuyan sol (zarfı alır, sol kenar), sağ (kapak ucu kistirSiki → sayfa üstü → sağ kenar); memur eli soldan
  const okSolUc: P = p < tVer - 8 ? [kx - 130, 1500] : p < tVer ? lp([kx - 130, 1500], [zarfC[0] - zarfW / 2 + 6, zarfC[1] + 40], t01(p, tVer - 8, tVer, GIRIS)) : [zarfC[0] - zarfW / 2 + 6, zarfC[1] + 40 - (kagVar ? 40 * cekT : 0)];
  const flapUc: P = [zarfC[0], zarfC[1] - zarfH / 2 + (zarfH * 0.42) * (1 - 2 * flap)];
  const okSagUc: P = (() => {
    const yer0: P = [kx + 220, 1560];
    if (p < za.bas) return yer0;
    if (p < za.bas + 6) return lp(yer0, flapUc, t01(p, za.bas, za.bas + 6, GIRIS));
    if (p < tAc) return flapUc;
    if (p < tAc + 6) return [zarfC[0] + 10, kagUst + 8];
    const kenar: P = [kx + KAG.w / 2 - 4, ky + 40 + 20 * kap];
    return lp([zarfC[0] + 10, kagUst + 8], kenar, t01(p, tAc + 6, tAc + 16, INOUT));
  })();
  const elPx = K.F / (2.62 - K.Z);
  const okuyanEl = (uc: P, aci: number, poz: ElDurum["poz"], omuz: P) => {
    // kol: omuzdan bileğe IK (dirsek dışa-aşağı), KolEl'in kol yönü dirsek→bilek ile hizalı
    let kolAci = aci + 40;
    let g = elGeometri({ uc, aci, kolAci, pxm: elPx, poz });
    for (let i = 0; i < 3; i++) {
      const L1 = 0.3 * okPx, L2 = 0.27 * okPx, dx = g.bilek[0] - omuz[0], dy = g.bilek[1] - omuz[1], d = Math.min(L1 + L2 - 1, Math.hypot(dx, dy));
      const a = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d)))), b = Math.atan2(dy, dx);
      const c1: P = [omuz[0] + Math.cos(b + a) * L1, omuz[1] + Math.sin(b + a) * L1], c2: P = [omuz[0] + Math.cos(b - a) * L1, omuz[1] + Math.sin(b - a) * L1];
      const dirsek = c1[1] > c2[1] ? c1 : c2;
      kolAci = (Math.atan2(g.bilek[1] - dirsek[1], g.bilek[0] - dirsek[0]) * 180) / Math.PI;
      g = elGeometri({ uc, aci, kolAci, pxm: elPx, poz });
      if (i === 2) return { g, dirsek, omuz, aci, poz };
    }
    return null;
  };
  const omuzSol = e.omuz[0], omuzSag = e.omuz[1];
  const solK = okuyanEl(okSolUc, -64, "kistirSiki", omuzSol)!, sagK = okuyanEl(okSagUc, p < tAc ? -110 : -118, "kistirSiki", omuzSag)!;
  const memurEl: ElDurum | null = p >= mg.bas && p <= mc.bit ? { uc: p < tVer ? [zarfC[0] - zarfW / 2 + 18, zarfC[1] - 40] : lp([zarfC[0] - zarfW / 2 + 18, zarfC[1] - 40], [-420, 1060], t01(p, mc.bas, mc.bit, CIKIS)), aci: -8, kolAci: -2, pxm: K.F / (2.45 - K.Z), poz: "kistir" } : null;
  // zarf çizimi (pul/mühür/yazı yok): gövde, kapak üçgeni, adres bloğu = 3 kısa çizgi
  const zx0 = zarfC[0] - zarfW / 2, zy0 = zarfC[1] - zarfH / 2;
  const zarfCiz = (
    <g>
      <rect x={zx0} y={zy0} width={zarfW} height={zarfH} fill={LP.zarf} stroke={LP.ic} strokeWidth={3} />
      <polyline points={pt([[zx0, zy0 + zarfH], [zarfC[0], zy0 + zarfH * 0.5], [zx0 + zarfW, zy0 + zarfH]])} stroke={LP.zarfCizgi} strokeWidth={2.5} fill="none" />
      {flap < 0.5 && [0, 1, 2].map((i) => <line key={i} x1={zarfC[0] - 50} y1={zy0 + zarfH * 0.62 + i * 16} x2={zarfC[0] + 40 - i * 18} y2={zy0 + zarfH * 0.62 + i * 16} stroke={LP.zarfCizgi} strokeWidth={3} strokeLinecap="round" />)}
      <polygon points={pt([[zx0, zy0], [zx0 + zarfW, zy0], flapUc])} fill={flap > 0.5 ? LP.zarfGolge : LP.zarf} stroke={LP.ic} strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
  const kagM = dortgen([kx - KAG.w / 2, kagUst], [kx + KAG.w / 2, kagUst], [kx + KAG.w / 2, kagAlt], [kx - KAG.w / 2, kagAlt]);
  const kagitCiz = kagVar ? (
    <g>
      <polygon points={pt([kagM(0, 0), kagM(1, 0), kagM(1, 1), kagM(0, 1)])} fill={LP.kagit} stroke={LP.ic} strokeWidth={3} />
      <line x1={kagM(0, 0.5)[0]} y1={kagM(0, 0.5)[1]} x2={kagM(1, 0.5)[0]} y2={kagM(1, 0.5)[1]} stroke="#b7b2a6" strokeWidth={2} />
      <g stroke={LP.kagitSatir} strokeWidth={3} strokeLinecap="round" fill="none">{satirYollari(kagM, S + 40, 13).map((d, i) => <path key={i} d={d} />)}</g>
      <line x1={kagM(1, 0)[0] - 1} y1={kagM(1, 0)[1]} x2={kagM(1, 1)[0] - 1} y2={kagM(1, 1)[1]} stroke={LP.sicakKenar} strokeWidth={3} />
    </g>
  ) : null;
  const elCiz = (q: NonNullable<ReturnType<typeof okuyanEl>>, tutulan?: React.ReactNode) => (
    <KolEl giris={q.omuz} dirsek={q.dirsek} bilek={q.g.bilek} gen={[0.12 * okPx, 0.105 * okPx, 0.07 * okPx]} tip="parisGri" elAci={q.aci} olcek={q.g.olcek} poz={q.poz}
      tutulan={tutulan ? <g transform={`translate(${-q.g.pinch[0]} ${-q.g.pinch[1]})`}>{tutulan}</g> : undefined}
      isik={{ yon: [0.8, -0.4], renk: LP.sicakKenar, aci: 78, sertlik: 0.8, murekkep: "#2f2d46" }} />
  );
  const bekle = [{ X: 1.55, Z: 3.45, kod: "yetiskin-a" as const }, { X: 1.66, Z: 3.75, kod: "yetiskin-a" as const }];
  kilit.push({ ad: "kâğıt", p: ekranNokta(k, [kx, ky]), tur: "dokunus" });
  kilit.push({ ad: "okuyan el", p: ekranNokta(k, okSolUc), tur: "dokunus" });
  return (
    <g transform={katDonusum(k)}>
      <defs>
        <clipPath id={`${uid}ac`}><polygon points={pt(acik)} /></clipPath>
        <clipPath id={`${uid}pe`}><polygon points={pt(perde)} /></clipPath>
        <Desen id={`${uid}st`} aci={90} aralik={7} kalin={2} renk={LP.soveIc} alfa={0.9} seed={S + 11} />
      </defs>
      <rect x={-400} y={-400} width={1900} height={2800} fill={LP.duvar} />
      <polygon points={pt(halka)} fill={LP.halka} />
      <polygon points={pt(perde)} fill={LP.perde} />
      <g clipPath={`url(#${uid}pe)`} stroke={LP.satir} strokeWidth={5} strokeLinecap="round" fill="none">{satirYollari(pRect, S + 40, 14).map((d, i) => <path key={i} d={d} />)}</g>
      <polygon points={pt(lambri)} fill={LP.lambri} />
      <line x1={lambri[0][0]} y1={lambri[0][1]} x2={lambri[1][0]} y2={lambri[1][1]} stroke={LP.halka} strokeWidth={5} />
      {/* koridor: sıcak gün, düz; söve gölgesi 30 px düşey tarama; bekleyenler kapı ağzında */}
      <polygon points={pt(acik)} fill={LP.koridor} />
      <g clipPath={`url(#${uid}ac)`}>
        {bekle.map((b, i) => <SiluetFigur key={i} kod={b.kod} ayak={pr(K, b.X, 0, b.Z)} pxm={K.F / (b.Z - K.Z)} renk={i ? "#4a4560" : LP.memur} kenar={{ renk: LP.sicakKenar, dx: 3, dy: -2 }} yon={-1} />)}
        <rect x={acik[0][0]} y={-400} width={30} height={2800} fill={`url(#${uid}st)`} />
      </g>
      <polygon points={pt(yanak)} fill={LP.soveIc} />
      <polygon points={pt(sove)} fill={LP.sove} stroke="#1a1a24" strokeWidth={3} />
      {/* okuyan: gravür figür (kontrajur), kollar KolEl ile */}
      <FigurSiluet e={e} pxm={okPx} kiyafet="palto" renk={LP.palto} kenar={{ renk: LP.sicakKenar, dx: 3, dy: -2 }} baslik="yok" basEgim={basEg} kolGizle={[true, true]} tarama="sag" />
      {(() => {
        const r = (basEg * Math.PI) / 180, N = e.boyun, b0 = e.bas, B: P = [N[0] + (b0[0] - N[0]) * Math.cos(r) - (b0[1] - N[1]) * Math.sin(r), N[1] + (b0[0] - N[0]) * Math.sin(r) + (b0[1] - N[1]) * Math.cos(r)];
        const rx = 0.085 * okPx, ry = 0.108 * okPx;
        return <g transform={`rotate(${basEg} ${B[0]} ${B[1]})`}>
          <path d={`M${B[0] - rx * 0.2} ${B[1] - ry * 1.0} C${B[0] + rx * 0.9} ${B[1] - ry * 1.05} ${B[0] + rx * 1.12} ${B[1] - ry * 0.1} ${B[0] + rx * 0.85} ${B[1] + ry * 0.55} C${B[0] + rx * 0.5} ${B[1] + ry * 0.2} ${B[0] + rx * 0.1} ${B[1] - ry * 0.4} ${B[0] - rx * 0.2} ${B[1] - ry * 1.0} Z`} fill="#1c1b28" />
          <ellipse cx={B[0] + rx * 0.32} cy={B[1] + ry * 0.05} rx={rx * 0.17} ry={ry * 0.26} fill="#3a3550" stroke="#1c1b28" strokeWidth={3} />
          <path d={`M${B[0] - rx * 0.55} ${B[1] - ry * 0.85} C${B[0] - rx * 1.05} ${B[1] - ry * 0.4} ${B[0] - rx * 1.08} ${B[1] + ry * 0.2} ${B[0] - rx * 0.86} ${B[1] + ry * 0.62}`} stroke={LP.kenarSoguk} strokeOpacity={0.5} strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d={`M${B[0] - rx * 0.3} ${B[1] - ry * 1.02} C${B[0] + rx * 0.3} ${B[1] - ry * 1.12} ${B[0] + rx * 0.9} ${B[1] - ry * 0.9} ${B[0] + rx * 1.02} ${B[1] - ry * 0.3}`} stroke={LP.sicakKenar} strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>;
      })()}
      {elCiz(solK)}
      {zarfCiz}
      {kagitCiz}
      {elCiz(sagK)}
      {memurEl && <ParisEl d={memurEl} tip="parisGri" isik={{ yon: [-0.8, -0.4], renk: LP.kenarSoguk, aci: 78, sertlik: 0.7, murekkep: "#2f2d46" }} tutulan={undefined} />}
    </g>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const uid = "lo" + useId().replace(/:/g, "");
  const gor = param<string>(plan, "gorunum", "oda");
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>{gor === "kapi" ? <KapiSahne plan={plan} p={p} uid={uid} kilit={kilit} /> : <OdaSahne plan={plan} p={p} uid={uid} kilit={kilit} />}</RenkKaydi>
    </svg>
  );
};
void pchip;
export const LANTERN_ODA: Sablon = { Sahne, arsiv: () => "geceLapis" };
