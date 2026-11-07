// ===== D7 — parmak parmak eldiven giyme (MASA-INSERT `eldivenGiy`) =====
// Yakın insert: sol el (Louis, bordo frak kolu + gömlek manşeti) alttan girer, eldiveni (İMZA beyazı GLOVE.hero, tek nesne) sağ el
// (KolEl, kıstırma) bilekten tutar. Parmak kılıfları SIRAYLA dolar (işaret → orta → yüzük → serçe → başparmak): boşken sarkık/kırışık,
// dolunca düz. Sonra sağ el bileği aşağı çeker → manşet gerilir ("gerilme" = TEMAS, ses tam o karede), küçük sekme + yerleşme.
// Yerel birim: eldiven boğum çizgisi y 0, parmaklar −y. olcek 1.3 ⇒ parmak ucu–bilek ≈ 410 px ≥ ekranın %20'si.
import React from "react";
import { Easing, interpolate } from "remotion";
import { ink, P, tonla } from "../../doku/sabitler";
import { GLOVE } from "../../bolumler/blanc/palet";
import { KolEl, KISTIR_YEREL, KOL_PALET } from "../../rig/KolEl";
import { cl } from "../zaman";

export type EldivenGiyParam = { bas: number; bit: number; gerilme?: number; x?: number; y?: number; olcek?: number; aci?: number };
export const eldivenGerilme = (e: EldivenGiyParam) => Math.round(e.gerilme ?? e.bas + (e.bit - e.bas) * 0.86);

// parmak: taban x, uzunluk, genişlik, dolu açı (° dikeyden, + sağa), sarkık açı
const PARMAK = [
  { ad: "isaret", x: 50, len: 120, w: 31, aci: 7, sark: 48 },
  { ad: "orta", x: 16, len: 136, w: 32, aci: 1, sark: -38 },
  { ad: "yuzuk", x: -18, len: 124, w: 30, aci: -5, sark: 44 },
  { ad: "serce", x: -50, len: 96, w: 26, aci: -12, sark: -52 },
];
const BAS_PARMAK = { x: 74, y: 70, len: 96, w: 34, aci: 52, sark: 95 };
const SIRA = [[0.08, 0.28], [0.18, 0.38], [0.28, 0.48], [0.38, 0.56], [0.48, 0.66]]; // işaret, orta, yüzük, serçe, başparmak

const rad = (d: number) => (d * Math.PI) / 180;
// kılıf eğrisi: taban → uç, dolu (f=1) düz; boş (f=0) sarkık eğri, kısa ve ince
const kilif = (bx: number, by: number, len: number, aci: number, sark: number, f: number) => {
  const a = rad(aci + sark * (1 - f) * 0.5), a2 = rad(aci + sark * (1 - f));
  const L = len * (0.82 + 0.24 * f);
  const m: P = [bx + Math.sin(a) * L * 0.5, by - Math.cos(a) * L * 0.5];
  const u: P = [m[0] + Math.sin(a2) * L * 0.5, m[1] - Math.cos(a2) * L * 0.5];
  return { d: `M ${bx} ${by} Q ${m[0]} ${m[1]} ${u[0]} ${u[1]}`, uc: u, m };
};

export const EldivenGiyme: React.FC<{ e: EldivenGiyParam; p: number; golge?: boolean; golgeRenk?: string }> = ({ e, p, golge, golgeRenk = "#14110d" }) => {
  const { bas, bit } = e;
  const t = interpolate(p, [bas, bit], [0, 1], cl);
  const ger = eldivenGerilme(e);
  const W = KOL_PALET.louis;
  const beyaz = golge ? golgeRenk : GLOVE.hero, kivrim = golge ? golgeRenk : GLOVE.heroGolge, dikis = GLOVE.dikis;
  const ten = golge ? golgeRenk : W.ten, tenG = golge ? golgeRenk : W.tenGolge;
  const f = SIRA.map(([a, b]) => interpolate(t, [a, b], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) }));
  const dolu = f.reduce((s, v) => s + v, 0) / f.length;
  // el kayması (alttan eldivene girer) + manşet çekme (gerilme karesinde varış, küçük sekme)
  const kay = interpolate(t, [0, 0.66], [0, 1], { ...cl, easing: Easing.out(Easing.cubic) });
  const cek = interpolate(p, [ger - 14, ger, ger + 3, ger + 7], [0, 1.06, 0.98, 1], { ...cl, easing: Easing.in(Easing.quad) });
  const bogum = 290 * (1 - kay);          // elin boğum çizgisi (eldiven boğumu y 0)
  const bilek = bogum + 170;
  const manset = 170 + 62 * cek;          // eldiven manşet ağzı
  const s = e.olcek ?? 1.3;
  const st = (c: string, w = 3) => (golge ? {} : { stroke: ink(c), strokeWidth: w, strokeLinejoin: "round" as const, strokeLinecap: "round" as const });
  const genis = 0.9 + 0.1 * dolu;
  // sağ el: kıstırma noktası manşet ağzının sağ ucunda (çekerken onunla iner)
  const hedef: P = [92, manset - 14];
  const elAci = 196, eo = 1.9 / s;        // KolEl ölçeği yerel birimde (ekranda MASA-INSERT el ölçüsü 1.9)
  const r = rad(elAci);
  const kb: P = [hedef[0] - (KISTIR_YEREL[0] * Math.cos(r) - KISTIR_YEREL[1] * Math.sin(r)) * eo, hedef[1] - (KISTIR_YEREL[0] * Math.sin(r) + KISTIR_YEREL[1] * Math.cos(r)) * eo];
  return (
    <g transform={`translate(${e.x ?? 540},${e.y ?? 1000}) rotate(${e.aci ?? 0}) scale(${s})`}>
      {/* sol kol: bordo frak kolu alttan (kadraj kenarından) + gömlek manşeti */}
      <path d={`M -96 ${bilek + 40} L 92 ${bilek + 40} L 132 900 L -150 900 Z`} fill={golge ? golgeRenk : W.kol} {...st(W.kol)} />
      {!golge && <path d={`M -60 ${bilek + 120} Q -20 ${bilek + 150} 30 ${bilek + 130}`} stroke={W.kolGolge} strokeWidth={4} fill="none" />}
      <rect x={-90} y={bilek + 8} width={180} height={34} rx={6} fill={golge ? golgeRenk : W.manset} {...st(W.manset, 2.5)} />
      {/* çıplak el (eldiven manşet ağzının altında kalan kısmı görünür) */}
      <defs><clipPath id={`egKlip${golge ? "g" : ""}`}><rect x={-300} y={manset - 2} width={600} height={1200} /></clipPath></defs>
      <g clipPath={`url(#egKlip${golge ? "g" : ""})`}>
        <path d={`M -70 ${bilek + 12} Q -84 ${bogum + 60} -74 ${bogum} L 76 ${bogum} Q 92 ${bogum + 60} 72 ${bilek + 12} Z`} fill={ten} {...st(W.ten, 2.5)} />
        {PARMAK.map((q, i) => <line key={i} x1={q.x} y1={bogum} x2={q.x + Math.sin(rad(q.aci)) * q.len} y2={bogum - Math.cos(rad(q.aci)) * q.len} stroke={ten} strokeWidth={q.w} strokeLinecap="round" />)}
        {!golge && [-40, -6, 28].map((x) => <path key={x} d={`M ${x} ${bilek - 10} L ${x + 8} ${bogum + 30}`} stroke={tenG} strokeWidth={2} opacity={0.5} />)}
      </g>
      {/* ELDİVEN: kılıflar (sarkık → dolu, sırayla), sırt, manşet */}
      {[...PARMAK.map((q, i) => ({ ...q, y: 0, f: f[i] })), { ...BAS_PARMAK, f: f[4] }].map((q, i) => {
        const k = kilif(q.x * genis, q.y, q.len, q.aci, q.sark, q.f);
        const w = q.w * (0.62 + 0.5 * q.f);
        return (
          <g key={`k${i}`}>
            {!golge && <path d={k.d} stroke={ink(GLOVE.hero)} strokeWidth={w + 5} fill="none" strokeLinecap="round" />}
            <path d={k.d} stroke={beyaz} strokeWidth={w} fill="none" strokeLinecap="round" />
            {/* boş kılıf kırışıkları (dolunca kaybolur değil: düzleşir → kısalır) */}
            {!golge && <path d={`M ${k.m[0] - w * 0.3} ${k.m[1] + 6} q ${w * 0.3} ${-6 + 6 * q.f} ${w * 0.6} 0`} stroke={kivrim} strokeWidth={2.4} fill="none" opacity={1 - q.f * 0.7} />}
            {!golge && q.f > 0.9 && <path d={`M ${k.uc[0] - w * 0.18} ${k.uc[1] + w * 0.35} q ${w * 0.18} ${-w * 0.3} ${w * 0.36} 0`} stroke={kivrim} strokeWidth={2} fill="none" />}
          </g>
        );
      })}
      <path d={`M ${-84 * genis} -6 Q 0 -22 ${88 * genis} -6 Q ${98 * genis} 80 ${90} ${manset} L -82 ${manset} Q ${-94 * genis} 80 ${-84 * genis} -6 Z`} fill={beyaz} {...st(GLOVE.hero)} />
      {!golge && <>
        {[-30, 4, 38].map((x, i) => <path key={i} d={`M ${x * genis} 10 L ${x * genis + 4} ${70 + 10 * dolu}`} stroke={dikis} strokeWidth={2.6} strokeDasharray="7 5" />)}
        {/* manşet: çekilmeden önce büzgülü (kıvrım çizgileri), çekilince düz + dikiş */}
        {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M ${-74 + i * 30} ${manset - 30 - 10 * cek} q 6 ${14 - 8 * cek} 2 ${26 + 10 * cek}`} stroke={kivrim} strokeWidth={3} fill="none" opacity={1 - 0.75 * cek} />)}
        <path d={`M -80 ${manset - 8} L 88 ${manset - 8}`} stroke={dikis} strokeWidth={2.4} strokeDasharray="6 5" opacity={0.4 + 0.6 * cek} />
        <path d={`M -82 ${manset} L 90 ${manset}`} stroke={tonla(GLOVE.hero, -0.25)} strokeWidth={3} />
      </>}
      {/* sağ el: sağ kadraj kenarından, manşetin sağ ucunu kıstırır */}
      {!golge && <KolEl giris={[kb[0] + 520, kb[1] + 330]} dirsek={[kb[0] + 250, kb[1] + 150]} bilek={kb} gen={[210 / s, 172 / s, 92 / s]} tip="louis" elAci={elAci} olcek={eo} poz="kistir" />}
    </g>
  );
};

// D8 güve (kanun kitabının boş sayfasından kalkar, kadrajın üstünden çıkar). g 0..1: 0–.1 sayfada (kanat kapalı), sonra uçuş.
export const Guve: React.FC<{ g: number; x0: number; y0: number; golge?: boolean }> = ({ g, x0, y0, golge }) => {
  const u = interpolate(g, [0.1, 1], [0, 1], { ...cl, easing: Easing.in(Easing.quad) });
  // uçuş yolu: kıvrımlı yükseliş (kâğıt dışına, yukarı, kadraj dışı)
  const yol: P[] = [[x0, y0], [x0 - 60, y0 - 260], [x0 + 140, y0 - 520], [x0 - 20, y0 - 860], [x0 + 160, y0 - 1500]];
  const n = yol.length - 1, i = Math.min(n - 1, Math.floor(u * n)), l = u * n - i;
  const sm = l;
  const q: P = [yol[i][0] + (yol[i + 1][0] - yol[i][0]) * sm, yol[i][1] + (yol[i + 1][1] - yol[i][1]) * sm];
  const acik = g < 0.06 ? 0.15 : g < 0.1 ? interpolate(g, [0.06, 0.1], [0.15, 1]) : 1;
  const cirp = g < 0.1 ? 1 : 0.35 + 0.65 * Math.abs(Math.sin(g * 140));
  const yon = Math.atan2(yol[i + 1][1] - yol[i][1], yol[i + 1][0] - yol[i][0]) * 180 / Math.PI + 90;
  const c = golge ? "#14110d" : "#8c826c", c2 = golge ? "#14110d" : "#6a604e";
  const kanat = (s: 1 | -1) => <path d={`M 0 -4 Q ${s * 30 * acik} ${-34 * cirp} ${s * 50 * acik} ${-10 * cirp} Q ${s * 44 * acik} ${14 * cirp} ${s * 6} 16 Z`} fill={c} stroke={golge ? "none" : ink("#8c826c")} strokeWidth={2} />;
  return (
    <g transform={`translate(${q[0]},${q[1]}) rotate(${g < 0.1 ? -20 : yon})`}>
      {kanat(-1)}{kanat(1)}
      {!golge && [-1, 1].map((s) => <path key={s} d={`M ${s * 12 * acik} -2 Q ${s * 26 * acik} ${-14 * cirp} ${s * 36 * acik} ${-8 * cirp}`} stroke={c2} strokeWidth={2} fill="none" />)}
      <ellipse cx={0} cy={4} rx={7} ry={20} fill={c2} />
      {!golge && <path d="M -3 -14 q -8 -12 -14 -14 M 3 -14 q 8 -12 14 -14" stroke={c2} strokeWidth={2} fill="none" />}
    </g>
  );
};
