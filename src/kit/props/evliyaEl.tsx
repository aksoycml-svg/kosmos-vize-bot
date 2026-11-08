// ===== Evliya insert elleri + kese + sikke (tasarim.md v1.4 §3.7, §4.3; KE-K5, KE-P3) — SARAYBURNU `insert` çizer =====
// OsmanliKol: omuz(giriş) → dirsek → bilek koni kol + yen ağzı (tip başına) + el (yan görünüş, poz başına parmak bükümü).
// El yerel çerçevesi: bilek (0,0), el +x yönünde, ölçek `olc` (ekran px / yerel birim); el boyu (bilek → orta parmak ucu) ≈ 140 birim.
// Avuç yönü: avucYukari (+1 avuç ekranda yukarı / −1 aşağı). Tutulan nesne: kese avuçta (avucNoktasi), kıstırmada parmak arasında (kistirNoktasi).
// Fade yok; ışık tek kaynaktan (KolIsik.yon): gölge yanı net kenarlı koyu ton bandı (düz 2 ton, tasarım §3.0).
import React from "react";
import { ink, karistir, P, poly, rnd, tonla } from "../../doku/sabitler";
import type { KolIsik } from "../../rig/RigIsik";

export type OsmanliElTip = "entari-yen" | "lagari" | "hezarfen" | "muhafiz" | "padisah" | "padisah-isik";
export type ElPoz = "ac" | "kapa" | "gevse" | "kistir" | "omuz" | "bas" | "isaret";
type ElPalet = { yen: string; yenGolge: string; serit?: string; ten: string; tenGolge: string; acilim: number; kalinKenar?: boolean; elOlcek: number };
// tasarim §3.7 (v1.3 ten tonları): veren el → Lagâri → Hezarfen → muhafız (açıktan koyuya)
export const EL_PALET: Record<OsmanliElTip, ElPalet> = {
  "entari-yen": { yen: "#4b4250", yenGolge: "#2e2834", ten: "#c48c72", tenGolge: "#94604a", acilim: 1.6, elOlcek: 1 },
  lagari: { yen: "#34405e", yenGolge: "#222a40", serit: "#7c8494", ten: "#c08468", tenGolge: "#8e5a46", acilim: 1.1, elOlcek: 1 },
  hezarfen: { yen: "#55603f", yenGolge: "#3a4228", serit: "#7a6a50", ten: "#a87256", tenGolge: "#7a4c36", acilim: 1.1, elOlcek: 1 },
  muhafiz: { yen: "#3e3a34", yenGolge: "#2a2722", ten: "#94644a", tenGolge: "#6a4432", acilim: 1.05, kalinKenar: true, elOlcek: 1.1 },
  // P12 padişah (tasarim §3.5): geniş yen kaftanla aynı #36302c; çıplak el #b88470 — köşk içinde gölgede (oda gölgesine %45 karışık),
  // ışık şeridinde "padisah-isik" (el #dca08a, yen = kaftan + #f6e4b0 α .45)
  padisah: { yen: "#36302c", yenGolge: "#2a2522", ten: "#7a5848", tenGolge: "#5a4036", acilim: 1.5, elOlcek: 1 },
  "padisah-isik": { yen: "#8c8167", yenGolge: "#8c8167", ten: "#dca08a", tenGolge: "#b07a66", acilim: 1.5, elOlcek: 1 },
};
// ıslak (P07 Lagâri, tasarim §3.2): kumaş %25 koyu (çivit #232c42), ten %8 koyu + parlama
export const islakEl = (p: ElPalet, w: number): ElPalet => w <= 0 ? p : { ...p, yen: karistir(p.yen, "#232c42", w), yenGolge: karistir(p.yenGolge, "#161c2c", w), serit: p.serit ? karistir(p.serit, "#59606e", w) : p.serit, ten: karistir(p.ten, tonla(p.ten, -0.08), w), tenGolge: karistir(p.tenGolge, tonla(p.tenGolge, -0.08), w) };

const R = (a: number) => (a * Math.PI) / 180;
const rot = (q: P, a: number): P => { const c = Math.cos(R(a)), s = Math.sin(R(a)); return [q[0] * c - q[1] * s, q[0] * s + q[1] * c]; };
const ofs = (a: P, b: P, w: number): [P, P] => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; const nx = -dy / L, ny = dx / L; return [[a[0] + nx * w, a[1] + ny * w], [a[0] - nx * w, a[1] - ny * w]]; };
// b noktasında (a→b doğrultusuna dik) kesit
const ofsB = (a: P, b: P, w: number): [P, P] => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; const nx = -dy / L, ny = dx / L; return [[b[0] + nx * w, b[1] + ny * w], [b[0] - nx * w, b[1] - ny * w]]; };

// ---- el geometrisi (yerel) ----
// Avuç tarafı = −y·avucYukari. Parmak bükümü avuç tarafına. curl: 0 düz … 1 yumruk.
const POZ: Record<ElPoz, { curl: number[]; bas: number; avuc: 1 | -1; yay: number }> = {
  ac: { curl: [0.12, 0.14, 0.16, 0.18], bas: 0.25, avuc: 1, yay: 2 },      // avuç yukarı, parmaklar hafif kıvrık (kese yatağı)
  kapa: { curl: [0.85, 0.9, 0.92, 0.95], bas: 0.7, avuc: 1, yay: 0 },      // keseyi saran
  gevse: { curl: [0.02, 0.04, 0.06, 0.1], bas: 0.1, avuc: 1, yay: 6 },     // parmaklar açılır (bilek 12° düşer: şablon)
  kistir: { curl: [0.62, 0.5, 0.55, 0.6], bas: 0.9, avuc: -1, yay: 0 },    // başparmak + işaret parmağı ucu buluşur (veren el, avuç aşağı)
  omuz: { curl: [0.4, 0.45, 0.48, 0.5], bas: 0.3, avuc: -1, yay: 3 },      // omza basan: parmaklar kumaşın üstünden aşağı kıvrılır
  bas: { curl: [0.05, 0.06, 0.08, 0.1], bas: 0.15, avuc: -1, yay: 8 },     // basamağa basan ıslak el: avuç aşağı, parmaklar açık
  isaret: { curl: [0.04, 0.9, 0.95, 0.95], bas: 0.6, avuc: -1, yay: 0 },   // P12: işaret parmağı açık, diğerleri kıvrık (kapıyı gösterir)
};
const PARMAK_BOY = [[30, 22, 16], [32, 23, 17], [30, 21, 15], [24, 17, 12]]; // işaret, orta, yüzük, serçe
const parmakYol = (kok: P, boy: number[], curl: number, avuc: number, yay: number, i: number): P[] => {
  let a = (i - 1.5) * yay * -avuc, q: P = kok; const pts: P[] = [q];
  const dirsekler = [32, 48, 42];
  for (let j = 0; j < 3; j++) { a += -avuc * dirsekler[j] * curl * (j === 0 ? 0.8 : 1.15); const v = rot([boy[j], 0], a); q = [q[0] + v[0], q[1] + v[1]]; pts.push(q); }
  return pts;
};
export const elGeometri = (poz: ElPoz) => {
  const P0 = POZ[poz], av = P0.avuc;
  // avuç (metakarp) bloğu: bilekten x 84'e, kalınlık 26; avuç yüzü −y·av
  const kok = [0, 1, 2, 3].map((i): P => [80 + (i === 0 ? 2 : i === 3 ? -6 : 0), (-8 + i * 5.5) * av]);
  const parmaklar = kok.map((k, i) => parmakYol(k, PARMAK_BOY[i], P0.curl[i], av, P0.yay, i));
  // başparmak: avuç yüzü kenarından (x 26) öne-avuca doğru; kıstırmada uç işaret parmağı ucuyla buluşur
  const bsKok: P = [24, -12 * av];
  const bsUc: P = poz === "kistir" ? parmaklar[0][3] : poz === "kapa" ? [64, -44 * av] : poz === "isaret" ? [60, -30 * av] : poz === "bas" || poz === "omuz" ? [58, -6 * av] : [70, -26 * av];
  const bsOrta: P = [(bsKok[0] + bsUc[0]) / 2 + 4, (bsKok[1] + bsUc[1]) / 2 - 6 * av];
  return { parmaklar, bas: [bsKok, bsOrta, bsUc] as P[], av, avucNoktasi: [62, -16 * av] as P, kistirNoktasi: (poz === "kistir" ? [parmaklar[0][3][0] + 2, parmaklar[0][3][1] + 2 * -av] : [118, 0]) as P };
};
export const EL_BOY = 140;

export type OsmanliKolProps = {
  omuz: P; dirsek: P; bilek: P; gen: [number, number]; // omuz / bilek kol genişliği (px)
  tip: OsmanliElTip; elAci: number; olc: number; poz: ElPoz; islak?: number; isik?: KolIsik; seed?: number;
  avucNesne?: React.ReactNode; // avuçta tutulan (kapa'da parmaklar önünde kalır)
  omuzKoyu?: boolean;          // omuz ucunu kadraj dışına uzat (giriş kenarı)
  kenarIsik?: { renk: string; px: number; yon: P }; // K3 V10 (yon: ekranda ışığa doğru birim yön): ışığa bakan kol kenarında ince kenar ışığı (tek kaynak: isik.yon), kolun içinde kalır
};
// El dünya noktası: yerel → ekran
export const elNokta = (bilek: P, aci: number, olc: number, q: P): P => { const v = rot([q[0] * olc, q[1] * olc], aci); return [bilek[0] + v[0], bilek[1] + v[1]]; };

export const OsmanliKol: React.FC<OsmanliKolProps> = ({ omuz, dirsek, bilek, gen, tip, elAci, olc, poz, islak = 0, isik, avucNesne, kenarIsik }) => {
  const K = islakEl(EL_PALET[tip], islak);
  const g = elGeometri(poz);
  const E = (q: P) => elNokta(bilek, elAci, olc * K.elOlcek, q);
  const sw = Math.max(1.6, 2.2 * olc);
  // ---- kol konisi + yen ağzı ----
  const w0 = gen[0] / 2, w2 = gen[1] / 2, w1 = (w0 + w2) / 2 * 1.04;
  const [a1, a2] = ofs(omuz, dirsek, w0), [b1, b2] = ofsB(omuz, dirsek, w1), [c1, c2] = ofs(dirsek, bilek, w1);
  const yenAgzi = K.acilim * w2;
  const [d1, d2] = ofsB(dirsek, bilek, w2);
  const ileri = (t: number): P => { const L = Math.hypot(bilek[0] - dirsek[0], bilek[1] - dirsek[1]) || 1; return [bilek[0] + ((bilek[0] - dirsek[0]) / L) * t, bilek[1] + ((bilek[1] - dirsek[1]) / L) * t]; };
  const yenUc = ileri(0.06 * EL_BOY * olc);
  const [e1, e2] = ofsB(dirsek, yenUc, yenAgzi);
  // d1/d2: bilekteki kol kesiti; e1/e2: yen ağzı (açılan)
  const dirsekKavis = (u: P, v: P): P => [(u[0] + v[0]) / 2 + (u[0] + v[0] - 2 * dirsek[0]) * 0.25, (u[1] + v[1]) / 2 + (u[1] + v[1] - 2 * dirsek[1]) * 0.25];
  const kc1 = dirsekKavis(b1, c1);
  const kolYol = `M ${a1[0]} ${a1[1]} L ${b1[0]} ${b1[1]} Q ${kc1[0]} ${kc1[1]} ${c1[0]} ${c1[1]} L ${d1[0]} ${d1[1]} L ${e1[0]} ${e1[1]} Q ${yenUc[0]} ${yenUc[1]} ${e2[0]} ${e2[1]} L ${d2[0]} ${d2[1]} L ${c2[0]} ${c2[1]} Q ${dirsek[0]} ${dirsek[1]} ${b2[0]} ${b2[1]} L ${a2[0]} ${a2[1]} Z`;
  // gölge yanı: ışık yönüne göre kolun karşı kenarı (net terminatör, genişliğin %38'i)
  const n1: P = (() => { const dx = dirsek[0] - omuz[0], dy = dirsek[1] - omuz[1], L = Math.hypot(dx, dy) || 1; return [-dy / L, dx / L]; })();
  const isikUst = isik ? n1[0] * isik.yon[0] + n1[1] * isik.yon[1] > 0 : true;
  const gk = isikUst ? [a2, b2, c2, d2, e2] : [a1, b1, c1, d1, e1], ik = isikUst ? [a1, b1, c1, d1, e1] : [a2, b2, c2, d2, e2];
  const bant = [...gk, ...gk.map((q, i) => [q[0] + (ik[i][0] - q[0]) * 0.38, q[1] + (ik[i][1] - q[1]) * 0.38] as P).reverse()];
  const uid = "ok" + React.useId().replace(/:/g, "");
  // ---- el parçaları ----
  const parmakCiz = (pts: P[], w: number, k: string) => {
    const e = pts.map(E);
    return <g key={k}>
      <polyline points={poly(e)} stroke={ink(K.ten)} strokeWidth={(w + 3) * olc} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={poly(e)} stroke={K.ten} strokeWidth={w * olc} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.slice(1, -1).map((q, i) => { const a = E([q[0] - 1, q[1] - w * 0.3]), b = E([q[0] + 1, q[1] + w * 0.3]); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={K.tenGolge} strokeWidth={1.1 * olc} opacity={0.7} />; })}
    </g>;
  };
  const av = g.av;
  const avuc: P[] = [[0, -13 * av], [30, -16 * av], [74, -13 * av], [86, -6 * av], [86, 10 * av], [70, 15 * av], [30, 15 * av], [0, 12 * av]];
  // arka (uzak) parmaklar önce, ön (yakın) sonra: avuç yukarıyken serçe kameraya uzak
  const sira = av > 0 ? [3, 2, 1, 0] : [0, 1, 2, 3];
  const genis = [12.5, 13, 12, 10.5];
  const kapaOnde = poz === "kapa";
  const parmakAlt = sira.filter((i) => !(kapaOnde && i <= 1));
  const parmakUst = kapaOnde ? [1, 0] : [];
  return (
    <g>
      <defs><clipPath id={`${uid}c`}><path d={kolYol} /></clipPath></defs>
      {/* kol + yen */}
      <path d={kolYol} fill={K.yen} stroke={ink(K.yen)} strokeWidth={sw} strokeLinejoin="round" />
      <g clipPath={`url(#${uid}c)`}><polygon points={poly(bant)} fill={K.yenGolge} opacity={0.85} />
        {kenarIsik && <polyline points={poly(((c1[0] - c2[0]) * kenarIsik.yon[0] + (c1[1] - c2[1]) * kenarIsik.yon[1] > 0 ? [c1, d1] : [c2, d2]))} fill="none" stroke={kenarIsik.renk} strokeWidth={kenarIsik.px * 2} strokeLinejoin="round" opacity={0.9} />}</g>
      {/* dirsek iç kıvrımı: 2 kumaş kırışığı */}
      {[0, 1].map((i) => { const c = [dirsek[0] + (kc1[0] - dirsek[0]) * (0.3 + 0.25 * i), dirsek[1] + (kc1[1] - dirsek[1]) * (0.3 + 0.25 * i)]; const L = w1 * 0.5; const a = Math.atan2(bilek[1] - dirsek[1], bilek[0] - dirsek[0]) + 0.5; return <path key={i} d={`M ${c[0]} ${c[1]} q ${Math.cos(a) * L * 0.5} ${Math.sin(a) * L * 0.5 - 4} ${Math.cos(a) * L} ${Math.sin(a) * L}`} stroke={K.yenGolge} strokeWidth={Math.max(2, 2.4 * olc)} fill="none" strokeLinecap="round" />; })}
      {/* yen ağzı: iç (koyu) + kenar; entari şeridi (Lagâri/Hezarfen) bilekte; muhafız kalın yün kenarı */}
      {(() => { const ic1 = ofsB(dirsek, yenUc, yenAgzi * 0.82); return <path d={`M ${ic1[0][0]} ${ic1[0][1]} Q ${yenUc[0]} ${yenUc[1]} ${ic1[1][0]} ${ic1[1][1]} Q ${bilek[0]} ${bilek[1]} ${ic1[0][0]} ${ic1[0][1]} Z`} fill={tonla(K.yenGolge, -0.25)} />; })()}
      {K.serit && (() => { const s0 = ileri(-0.02 * EL_BOY * olc), s1 = ileri(0.05 * EL_BOY * olc); const [p1, p2] = ofs(s0, s1, w2 * 0.78), [q1, q2] = ofsB(s0, s1, w2 * 0.74); return <polygon points={poly([p1, q1, q2, p2])} fill={K.serit} stroke={ink(K.serit)} strokeWidth={1.2 * olc} />; })()}
      {K.kalinKenar && <path d={`M ${e1[0]} ${e1[1]} Q ${yenUc[0]} ${yenUc[1]} ${e2[0]} ${e2[1]}`} stroke={tonla(K.yen, 0.18)} strokeWidth={Math.max(4, 7 * olc)} fill="none" strokeLinecap="round" />}
      {/* el: arka parmaklar → avuç → başparmak → (kapa: ön parmaklar nesnenin önünde) */}
      {parmakAlt.map((i) => parmakCiz(g.parmaklar[i], genis[i], `p${i}`))}
      <polygon points={poly(avuc.map(E))} fill={K.ten} stroke={ink(K.ten)} strokeWidth={1.6 * olc} strokeLinejoin="round" />
      {/* metakarp çizgileri + avuç gölgesi (avuç tarafı yarısı tenGolge) */}
      <polygon points={poly([[6, 2 * av], [80, 2 * av], [86, 10 * av], [70, 15 * av], [30, 15 * av], [0, 12 * av]].map((q) => E(q as P)))} fill={K.tenGolge} opacity={0.35} />
      {[0, 1, 2].map((i) => { const a = E([34, (-4 + i * 5) * av]), b = E([76, (-6 + i * 6) * av]); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={K.tenGolge} strokeWidth={1.1 * olc} opacity={0.45} />; })}
      {avucNesne}
      {parmakCiz(g.bas, 13, "bs")}
      {parmakUst.map((i) => parmakCiz(g.parmaklar[i], genis[i], `u${i}`))}
      {/* ıslak: 2 parlama noktası (ışık yanı) */}
      {islak > 0.3 && [[40, -10 * av], [100, -6 * av]].map((q, i) => { const c = E(q as P); return <ellipse key={i} cx={c[0]} cy={c[1]} rx={4 * olc} ry={2 * olc} fill="#e6eef0" opacity={0.6 * islak} />; })}
    </g>
  );
};

// ---------------- KE-P3 KESE (kumaş torba, tasarim §4.3) ----------------
// Yerel orijin = TABAN (temas noktası, avuçta / yerde). H = boy (px). Armut: alt geniş, büzgü ağzı 3–4 kıvrım + 2 sarkan bağ ucu,
// 3 kıvrım çizgisi büzgüden aşağı. Ağızda 2 sikke kenarı (içerik göstergesi; gümüş / altın). Süs, mühür, yazı YOK.
export const KESE_RENK = { bez: "#625646", golge: "#3e352a", bag: "#8a7a5c" };
export const SIKKE_RENK = { gumus: { yuz: "#a9aaa4", isik: "#d8d8d0", sicak: "#c8b89a" }, altin: { yuz: "#c9a24a", isik: "#f0d890", sicak: "#c9a24a" } };
export const keseBoyun = (H: number): P => [0, -0.8 * H];
export const Kese: React.FC<{ x: number; y: number; H: number; aci?: number; icerik: "gumus" | "altin"; ezik?: number; isikYon?: P; gece?: boolean; ag?: number; seed?: number }> = ({ x, y, H, aci = 0, icerik, ezik = 0, isikYon = [1, -0.4], gece, ag = 0, seed = 5 }) => {
  const W = 0.74 * H * (1 + 0.18 * ezik), Hh = H * (1 - 0.16 * ezik);
  const gov = `M ${-0.17 * W} ${-0.78 * Hh} C ${-0.42 * W} ${-0.62 * Hh} ${-0.56 * W} ${-0.32 * Hh} ${-0.5 * W} ${-0.12 * Hh} C ${-0.44 * W} ${0.02 * Hh} ${-0.2 * W} ${0.02 * Hh} 0 ${0.01 * Hh} C ${0.2 * W} ${0.02 * Hh} ${0.46 * W} ${0.02 * Hh} ${0.5 * W} ${-0.14 * Hh} C ${0.55 * W} ${-0.36 * Hh} ${0.4 * W} ${-0.64 * Hh} ${0.17 * W} ${-0.78 * Hh} Z`;
  const isikSol = isikYon[0] < 0; // ışık soldan
  const s = SIKKE_RENK[icerik];
  const sikkeR = 0.11 * H;
  const kontur = Math.max(1.8, H * 0.018);
  const golgeYan = isikSol ? `M ${0.12 * W} ${-0.76 * Hh} C ${0.36 * W} ${-0.6 * Hh} ${0.52 * W} ${-0.34 * Hh} ${0.5 * W} ${-0.14 * Hh} C ${0.46 * W} ${0.02 * Hh} ${0.2 * W} ${0.02 * Hh} ${0.08 * W} ${0.01 * Hh} C ${0.26 * W} ${-0.2 * Hh} ${0.28 * W} ${-0.55 * Hh} ${0.12 * W} ${-0.76 * Hh} Z`
    : `M ${-0.12 * W} ${-0.76 * Hh} C ${-0.36 * W} ${-0.6 * Hh} ${-0.52 * W} ${-0.34 * Hh} ${-0.5 * W} ${-0.14 * Hh} C ${-0.46 * W} ${0.02 * Hh} ${-0.2 * W} ${0.02 * Hh} ${-0.08 * W} ${0.01 * Hh} C ${-0.26 * W} ${-0.2 * Hh} ${-0.28 * W} ${-0.55 * Hh} ${-0.12 * W} ${-0.76 * Hh} Z`;
  return (
    <g transform={`translate(${x},${y}) rotate(${aci})`}>
      {/* ağızdaki sikke kenarları (büzgünün arkasında, üstten görünür) */}
      {[-1, 1].map((k) => <ellipse key={k} cx={k * 0.07 * W} cy={-0.9 * Hh - (k > 0 ? 0.02 * Hh : 0)} rx={sikkeR} ry={sikkeR * 0.4} fill={gece && icerik === "gumus" ? s.sicak : s.yuz} stroke={ink(s.yuz)} strokeWidth={kontur * 0.7} />)}
      {ag > 0 && <ellipse cx={0.1 * W} cy={-0.88 * Hh} rx={sikkeR * 1.1} ry={sikkeR * 0.5} fill={s.isik} opacity={0.7 * ag} />}
      <path d={gov} fill={KESE_RENK.bez} stroke={ink(KESE_RENK.bez)} strokeWidth={kontur} strokeLinejoin="round" />
      <path d={golgeYan} fill={KESE_RENK.golge} opacity={0.8} />
      {/* 3 kıvrım çizgisi büzgüden aşağı */}
      {[-0.22, 0.02, 0.24].map((k, i) => <path key={i} d={`M ${k * 0.5 * W} ${-0.74 * Hh} Q ${k * W * 0.9 + (rnd(seed, i) - 0.5) * 0.06 * W} ${-0.45 * Hh} ${k * W * 0.7} ${-0.2 * Hh}`} stroke={KESE_RENK.golge} strokeWidth={kontur * 0.8} fill="none" strokeLinecap="round" opacity={0.85} />)}
      {/* büzgü: 4 kumaş kıvrımı (ağız fırfırı) */}
      <path d={`M ${-0.2 * W} ${-0.78 * Hh} Q ${-0.24 * W} ${-0.98 * Hh} ${-0.1 * W} ${-0.92 * Hh} Q ${-0.04 * W} ${-1.02 * Hh} ${0.04 * W} ${-0.93 * Hh} Q ${0.12 * W} ${-1.0 * Hh} ${0.16 * W} ${-0.9 * Hh} Q ${0.26 * W} ${-0.96 * Hh} ${0.2 * W} ${-0.78 * Hh} Z`} fill={tonla(KESE_RENK.bez, 0.06)} stroke={ink(KESE_RENK.bez)} strokeWidth={kontur * 0.9} strokeLinejoin="round" />
      {/* bağ: boğazda 2 tur + 2 sarkan uç */}
      <path d={`M ${-0.19 * W} ${-0.79 * Hh} Q 0 ${-0.74 * Hh} ${0.19 * W} ${-0.79 * Hh}`} stroke={KESE_RENK.bag} strokeWidth={kontur * 1.6} fill="none" strokeLinecap="round" />
      <path d={`M ${0.05 * W} ${-0.77 * Hh} q ${0.12 * W} ${0.1 * Hh} ${0.1 * W} ${0.24 * Hh} M ${0.08 * W} ${-0.77 * Hh} q ${0.2 * W} ${0.06 * Hh} ${0.24 * W} ${0.18 * Hh}`} stroke={KESE_RENK.bag} strokeWidth={kontur * 1.1} fill="none" strokeLinecap="round" />
      {/* dokuma tanesi (çok seyrek, α .15) */}
      {Array.from({ length: 9 }).map((_, i) => <circle key={`t${i}`} cx={(rnd(seed, `x${i}`) - 0.5) * 0.7 * W} cy={-(0.12 + rnd(seed, `y${i}`) * 0.55) * Hh} r={Math.max(0.8, H * 0.006)} fill="#8a7a5c" opacity={0.15} />)}
    </g>
  );
};

// ---------------- KE-P3 SİKKE (altın, düşen; tasarim §4.3) ----------------
// Daire, kalınlık = çap × 0.12 (kenar görünür). Yüz dil-nötr: dış halka + iç halka + 3 kısa kıvrık soyut çizgi (harf/rakam/tuğra YOK).
// donus: dikey eksen etrafında dönüş fazı (rad); yatis 0 (dik, kenarı üstünde) → 1 (yere yatmış, perspektif elips). x,y = zemin teması.
export const Sikke: React.FC<{ x: number; y: number; r: number; faz: number; yatis: number; icerik?: "altin" | "gumus"; parlak?: boolean; perspektif?: number }> = ({ x, y, r, faz, yatis, icerik = "altin", parlak, perspektif = 0.42 }) => {
  const s = SIKKE_RENK[icerik];
  const kos = Math.abs(Math.cos(faz));
  const rx = r * (yatis + (1 - yatis) * (0.16 + 0.84 * kos));
  const ry = r * (1 - yatis * (1 - perspektif));
  const cy = y - ry;                      // alt kenar zeminde
  const kal = Math.max(1.5, r * 0.24 * (1 - yatis) * (1 - kos) + r * 0.12 * yatis);
  const kontur = Math.max(1.2, r * 0.06);
  // v1.5 (K3 V5): parlama SERT KENARLI iki ton — gövde s.yuz + üst-sol hilal s.isik; kenar yumuşatması kapalı (crispEdges): altın ile parlama
  // arasında karışım pikseli oluşmaz. Parlama dış konturdan gövde tonunda ≥3 px boşlukla ayrılır (kontur koyu kalır, kontur↔parlama
  // karışımı — RenkKaydi/arşiv katmanı kenarı yumuşatır — imza bandına düşmez); iç süs halkaları parlama altında kalır (K4 ölçümü).
  const uid = "sk" + React.useId().replace(/:/g, "");
  return (
    <g shapeRendering={parlak ? "crispEdges" : undefined}>
      {/* kenar (kalınlık): yatıkken altta, dikken yanda */}
      <ellipse cx={x + (1 - yatis) * kal * 0.5} cy={cy + yatis * kal * 0.5} rx={rx} ry={ry} fill={tonla(s.yuz, -0.35)} stroke={ink(s.yuz)} strokeWidth={kontur} />
      <ellipse cx={x} cy={cy} rx={rx} ry={ry} fill={s.yuz} stroke={ink(s.yuz)} strokeWidth={kontur} />
      {rx > r * 0.35 && <>
        <ellipse cx={x} cy={cy} rx={rx * 0.82} ry={ry * 0.82} fill="none" stroke={tonla(s.yuz, -0.25)} strokeWidth={kontur * 0.8} />
        <ellipse cx={x} cy={cy} rx={rx * 0.5} ry={ry * 0.5} fill="none" stroke={tonla(s.yuz, -0.2)} strokeWidth={kontur * 0.6} />
        {[-0.3, 0, 0.3].map((k, i) => <path key={i} d={`M ${x + k * rx - rx * 0.12} ${cy + (i - 1) * ry * 0.1} q ${rx * 0.1} ${-ry * 0.16} ${rx * 0.22} 0`} stroke={tonla(s.yuz, -0.3)} strokeWidth={kontur * 0.7} fill="none" strokeLinecap="round" />)}
      </>}
      {parlak && <>
        <defs><mask id={uid} maskUnits="userSpaceOnUse" x={x - rx - 4} y={cy - ry - 4} width={2 * rx + 8} height={2 * ry + 8}>
          <ellipse cx={x} cy={cy} rx={Math.max(0.5, rx - kontur * 2.5 - 3)} ry={Math.max(0.5, ry - kontur * 2.5 - 3)} fill="#ffffff" />
          <ellipse cx={x + rx * 0.38} cy={cy + ry * 0.38} rx={rx} ry={ry} fill="#000000" />
        </mask></defs>
        <ellipse cx={x} cy={cy} rx={rx} ry={ry} fill={s.isik} mask={`url(#${uid})`} />
      </>}
    </g>
  );
};
