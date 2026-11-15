// ===== Yarasa rig (yarasa-bombasi, tasarim.md §3; TEK RİG, poz parametreleri sürekli) =====
// Yerel birim u = baş+gövde boyu (1.0). Ön (ventral) görünüş, simetrik: gövde ekseni −y (baş) … +y (ayak/kuyruk), kanatlar ±x.
// Pozlar yalnız parametre farkı: kanat 0 açık … 1 katlı · faz çırpma 0…1 (20 karelik döngü çağıranda) · aci 0 baş yukarı / 180 baş aşağı
// (asılı/tünemiş) / 90 yan yatık · nefes 0…1 · kapsul yok|kapsul|koz|kivilcim (+ nabiz 0…1) · stil gercek|siluet|murekkep|gomulu.
// Ayrıntı BOYUTLA söner (LOD; opaklık yok): açıklık ≥ 60 px tam rig · 18–60 sade siluet · 6–18 "M" çizgisi · < 6 nokta.
// Kuş/yaprak ayrımı (tasarım §3.5): taraklı arka kenar (3 yay), dirsekten kırık "M" üst hat, ince çubuk kuyruk, sivri el kanadı.
// Renkler tasarım §3.3 (C* ≤ 28); imza amber YALNIZ kapsülde (§2). Saf siyah/beyaz yok.
import React from "react";
import type { P } from "../../tipler";

export type YarasaStil = "gercek" | "siluet" | "murekkep" | "gomulu" | "dolu"; // dolu = defter sürüsü (kontursuz mürekkep dolgu)
export type KapsulDurum = "yok" | "kapsul" | "koz" | "kivilcim";
export type YarasaPoz = {
  x: number; y: number;      // çapa noktası (dekor/ekran px)
  u: number;                 // px / u (gövde boyu px)
  capa?: "govde" | "ayak";   // ayak: (x,y) = ayakların ortası (tünek teması)
  aci?: number;              // derece (0 baş yukarı, 180 baş aşağı)
  kanat?: number;            // 0 açık … 1 katlı
  faz?: number;              // çırpma fazı 0…1
  nefes?: number;            // 0…1 (göğüs ölçeği ±%2)
  kapsul?: KapsulDurum; nabiz?: number;
  stil?: YarasaStil;
  arkaIsik?: boolean;        // kanat zarı arkadan ışıkta (#74585f)
  kenar?: boolean;           // güneş/lamba kenar ışığı (sol-üst)
  basDon?: number;           // baş dönüşü (derece, yakın plan)
  ciz?: number;              // murekkep: çizim ilerlemesi 0…1 (stroke)
  gogusBos?: boolean;        // murekkep: göğüs boş daire (P02)
  gorus?: "on" | "profil";   // profil: asılı (baş aşağı) yan görünüş — ayaklar (x,y)'de, gövde aşağı sarkar; aci yok sayılır
  yonX?: 1 | -1;             // profil: karın yönü (ekranda sağ +1 / sol −1)
};

export const YR = {
  govde: "#4a3f40", govdeGolge: "#2f2a36", zar: "#3e363b", zarArka: "#74585f", kenar: "#e8b99a", kulakIc: "#6a5258",
  siluet: "#3b3450", kontur: "#241f29", kil: "#d8cdbb", murekkep: "#2b2f45", gomulu: "#2f2c45",
  amber: "#F29A2E", jel: "#B9651C", amberKontur: "#8a4f10", hilal: "#FFE3A0", kapak: "#6b6a72", halka: "#8b90a0", koz: "#FFC76B",
};

const rad = (d: number) => (d * Math.PI) / 180;
const yon = (a: number): P => [Math.cos(rad(a)), Math.sin(rad(a))];
const add = (a: P, b: P, k = 1): P => [a[0] + b[0] * k, a[1] + b[1] * k];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---- kanat geometrisi (s = +1 sağ; sol yansıma) ----
const OMUZ: P = [0.13, -0.2], KALCA: P = [0.15, 0.3], AYAK: P = [0.11, 0.52];
export const kanatNoktalari = (kanat: number, faz: number) => {
  const c = Math.sin(2 * Math.PI * faz), yukari = Math.max(0, Math.cos(2 * Math.PI * faz)); // yukarı vuruşta el kanadı bükülür
  const acik = { hum: -30 + 38 * c, on: 8 + 34 * c, el: 22 + 40 * c + 26 * yukari };
  const katli = { hum: 78, on: -96, el: 92 };
  const k = Math.min(1, Math.max(0, kanat));
  const hum = lerp(acik.hum, katli.hum, k), on = lerp(acik.on, katli.on, k), el = lerp(acik.el, katli.el, k);
  const dirsek = add(OMUZ, yon(hum), 0.22), bilek = add(dirsek, yon(on), 0.33);
  const bukum = lerp(1, 0.55, k); // katlıda parmaklar kısalır (zar toplanır)
  const d3 = add(bilek, yon(el), 1.0 * bukum), d4 = add(bilek, yon(el + 38), 0.7 * bukum), d5 = add(bilek, yon(el + 75), 0.55 * bukum);
  return { omuz: OMUZ, dirsek, bilek, d3, d4, d5, ayak: AYAK, kalca: KALCA };
};
const tarak = (a: P, b: P, w: P, derin = 0.28): string => { // a→b yayı, kontrol noktası bileğe doğru çekilir (yay derinliği ≥ %12 kord)
  const m: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const c: P = [m[0] + (w[0] - m[0]) * derin, m[1] + (w[1] - m[1]) * derin];
  return `Q${c[0].toFixed(3)},${c[1].toFixed(3)} ${b[0].toFixed(3)},${b[1].toFixed(3)}`;
};
const f = (q: P) => `${q[0].toFixed(3)},${q[1].toFixed(3)}`;
const kanatYol = (kanat: number, faz: number) => {
  const K = kanatNoktalari(kanat, faz);
  return `M${f(K.omuz)} L${f(K.dirsek)} L${f(K.bilek)} L${f(K.d3)} ${tarak(K.d3, K.d4, K.bilek)} ${tarak(K.d4, K.d5, K.bilek)} ${tarak(K.d5, K.ayak, K.bilek, 0.22)} L${f(K.kalca)} Z`;
};
const UROP0 = "M0.15,0.3 L0.11,0.52 Q0.07,0.8 0,0.92 Q-0.07,0.8 -0.11,0.52 L-0.15,0.3 Z";
// uropatagium: açıkta uç 0.92; katlıda (kanat → 1) uç karna kıvrılır (0.40), ayak hattı 0.52'yi geçmez → tüneğe batmaz
const urop = (kanat: number) => { const k = Math.min(1, Math.max(0, kanat)); if (k < 0.01) return UROP0; const u = 0.92 - 0.52 * k, c = 0.8 - 0.36 * k;
  return `M0.15,0.3 L0.11,${0.52 - 0.04 * k} Q0.07,${c} 0,${u} Q-0.07,${c} -0.11,${0.52 - 0.04 * k} L-0.15,0.3 Z`; };
const GOVDE = "M0,-0.3 C0.2,-0.3 0.21,0.12 0.17,0.3 C0.12,0.46 -0.12,0.46 -0.17,0.3 C-0.21,0.12 -0.2,-0.3 0,-0.3 Z";
const kulak = (s: number) => `M${0.02 * s},-0.5 C${0.0 * s},-0.66 ${0.1 * s},-0.76 ${0.26 * s},-0.7 C${0.24 * s},-0.6 ${0.2 * s},-0.47 ${0.1 * s},-0.43 Z`; // öne yatık, uçta hafif sivri; önde 0.04 aralık

// Kapsül (tasarım §2): silindir boy 0.55 × çap 0.20 (×1.5 stilize), göğüste gövde eksenine paralel; kapak + halka baş tarafında
export const Kapsul: React.FC<{ durum: KapsulDurum; nabiz?: number; w: number }> = ({ durum, nabiz = 0, w }) => {
  if (durum === "yok") return null;
  // kalibrasyon 2: jel şeridi + parlama hilali + gri kapak "ampul + duy" okutuyordu → düz mat silindir, L 0.30, uç halkası ince
  const L = 0.3, R = 0.065, y0 = -0.12;
  const n = durum === "koz" || durum === "kivilcim" ? Math.max(0, Math.min(1, nabiz)) : 0;
  return (
    <g>
      <rect x={-R} y={y0} width={2 * R} height={L} rx={R} fill={YR.amber} stroke={YR.amberKontur} strokeWidth={1.4 * w} />
      <rect x={-R} y={y0 + L * 0.55} width={R * 0.7} height={L * 0.35} fill={YR.jel} opacity={0.35} />
      <rect x={-R * 1.02} y={y0 + 0.01} width={2 * R * 1.02} height={0.035} fill={n > 0 ? YR.koz : YR.amberKontur} opacity={n > 0 ? 0.5 + 0.5 * n : 0.8} />
      {n > 0 && <circle cx={0} cy={y0 + 0.03} r={0.05 + 0.05 * n} fill={YR.koz} opacity={0.35 * n} />}
      {durum === "kivilcim" && <circle cx={0} cy={y0 - 0.02} r={0.035} fill={YR.hilal} />}
    </g>
  );
};

// ---- PROFİL ASILI (kalibrasyon 3, orkestra yönü): ayak (0,0) tünekte, gövde +y'ye sarkar, baş en altta (sivri kulak + burun).
// Kanat k: 1 katlı (bilek ayak yanında, önkol sırtta, başparmak tüneğe yakın) … 0.4 yarı açık (zar aşağı-dışa sarkar: taraklı kenar + parmak çizgileri).
// Kapsül yan-göğüste, boy ≤ %22 gövde, mat; köz yalnız uçta küçük çekirdek. x ekseni karın yönüne göre (yonX) aynalanır.
const pl = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
export const profilNokta = (kanat: number) => {
  const t = Math.min(1, Math.max(0, (1 - kanat) / 0.6)); // 0 katlı … 1 yarı açık
  const omuz: P = [-0.06, 0.66], bilek = pl([-0.1, 0.1], [-0.42, 0.24], t), d3 = pl([-0.16, 0.86], [-0.86, 1.0], t), d4 = pl([-0.14, 0.82], [-0.62, 1.12], t), d5 = pl([-0.11, 0.78], [-0.34, 1.06], t);
  return { omuz, bilek, d3, d4, d5, govdeYan: [-0.12, 0.78] as P, kapsul: [0.15, 0.5] as P };
};
const profilYollar = (kanat: number) => {
  const K = profilNokta(kanat), F = (q: P) => `${q[0].toFixed(3)},${q[1].toFixed(3)}`;
  const zar = `M${F(K.omuz)} L${F(K.bilek)} L${F(K.d3)} ${tarak(K.d3, K.d4, K.bilek, 0.3)} ${tarak(K.d4, K.d5, K.bilek, 0.3)} ${tarak(K.d5, K.govdeYan, K.bilek, 0.25)} Z`;
  const kemik = `M${F(K.omuz)} L${F(K.bilek)} M${F(K.bilek)} L${F(K.d3)} M${F(K.bilek)} L${F(K.d4)} M${F(K.bilek)} L${F(K.d5)}`;
  const govde = "M0,0.04 C0.16,0.1 0.2,0.4 0.17,0.62 C0.15,0.76 0.1,0.8 0.04,0.8 C-0.08,0.8 -0.14,0.62 -0.13,0.42 C-0.12,0.2 -0.08,0.06 0,0.04 Z";
  const bas = "M0.04,0.74 C0.16,0.74 0.2,0.86 0.24,0.95 L0.15,0.99 C0.1,1.0 0.02,0.98 -0.03,0.92 C-0.08,0.84 -0.04,0.74 0.04,0.74 Z"; // burun +x-aşağı
  const kulak = "M-0.02,0.9 C-0.08,0.98 -0.06,1.1 0.02,1.17 C0.06,1.08 0.07,0.98 0.05,0.92 Z M0.06,0.93 C0.06,1.02 0.1,1.1 0.16,1.14 C0.17,1.06 0.15,0.98 0.12,0.95 Z"; // iki sivri kulak, en altta
  const ayak = "M-0.03,0.0 Q-0.04,0.06 0,0.1 M0.04,0.0 Q0.05,0.06 0.02,0.1";
  return { K, zar, kemik, govde, bas, kulak, ayak };
};
const ProfilAsili: React.FC<{ z: YarasaPoz }> = ({ z }) => {
  const kanat = z.kanat ?? 0.9, Y = profilYollar(kanat), sx = z.yonX ?? 1, w = 1 / z.u, stil = z.stil ?? "gercek";
  const T = `translate(${z.x},${z.y}) scale(${sx * z.u},${z.u})`;
  if (stil === "murekkep") {
    const c = Math.max(0, Math.min(1, z.ciz ?? 1)); if (c <= 0) return null;
    const st = { stroke: YR.murekkep, strokeWidth: 7 * w, strokeLinejoin: "round" as const, strokeLinecap: "round" as const, pathLength: 1, strokeDasharray: `${c} 1.02`, fill: "none" };
    const parca = (q: Record<string, unknown>) => <><path d={Y.zar} {...q} /><path d={Y.govde} {...q} /><path d={Y.bas} {...q} /><path d={Y.kulak} {...q} /></>;
    return <g transform={T}>{parca(st)}<g transform={`translate(0,0) scale(${Math.min(1, c * 2)})`}>{parca({ fill: "#e6d8b9", stroke: "none" })}</g>
      {c >= 1 && <g stroke={YR.murekkep} strokeWidth={2.5 * w} fill="none" strokeLinecap="round"><path d={Y.kemik} /><path d={Y.ayak} strokeWidth={3.5 * w} /><circle cx={0.12} cy={0.85} r={0.018} fill={YR.murekkep} />
        {!z.gogusBos && [0, 1, 2].map((i) => <line key={i} x1={0.05} y1={0.3 + i * 0.1} x2={0.12} y2={0.26 + i * 0.1} />)}</g>}</g>;
  }
  const renk = stil === "gomulu" ? YR.gomulu : null;
  const zar = renk ?? (z.arkaIsik ? YR.zarArka : YR.zar), gov = renk ?? YR.govde;
  const kont = renk ? {} : { stroke: YR.kontur, strokeWidth: 2.5 * w, strokeLinejoin: "round" as const };
  const n = z.kapsul === "koz" || z.kapsul === "kivilcim" ? Math.max(0, Math.min(1, z.nabiz ?? 0)) : 0, K = Y.K;
  return (
    <g transform={T}>
      {!renk && z.kenar && <g fill={YR.kenar} transform={`translate(${-2 * w * sx},${-1.6 * w})`}><path d={Y.zar} /><path d={Y.govde} /><path d={Y.bas} /><path d={Y.kulak} /></g>}
      <path d={Y.zar} fill={zar} {...kont} />
      {!renk && <path d={Y.kemik} fill="none" stroke={YR.govdeGolge} strokeWidth={2 * w} strokeLinecap="round" />}
      <path d={Y.ayak} fill="none" stroke={renk ?? YR.kontur} strokeWidth={3 * w} strokeLinecap="round" />
      <path d={Y.govde} fill={gov} {...kont} />
      {!renk && <path d="M-0.13,0.42 C-0.12,0.2 -0.08,0.06 0,0.04 C-0.04,0.2 -0.06,0.5 -0.03,0.78 C-0.1,0.74 -0.14,0.6 -0.13,0.42 Z" fill={YR.govdeGolge} opacity={0.7} />}
      <path d={Y.kulak} fill={renk ?? YR.govde} {...kont} />
      <path d={Y.bas} fill={gov} {...kont} />
      {!renk && <><circle cx={0.12} cy={0.85} r={0.022} fill="#1c1915" /><circle cx={0.115} cy={0.845} r={Math.max(0.008, 0.8 * w)} fill="#e6d8b9" /><path d="M0.2,0.93 L0.24,0.95" stroke={YR.kontur} strokeWidth={2 * w} /></>}
      {!renk && <path d={`M${K.bilek[0]},${K.bilek[1]} q-0.06,-0.02 -0.07,-0.07`} fill="none" stroke={YR.kontur} strokeWidth={2.4 * w} strokeLinecap="round" />}
      {z.kapsul && z.kapsul !== "yok" && <g>
        <rect x={0.115} y={0.42} width={0.07} height={0.2} rx={0.035} fill={YR.amber} stroke={YR.amberKontur} strokeWidth={1.2 * w} />
        <circle cx={0.15} cy={0.62} r={0.018 + 0.012 * n} fill={n > 0 ? YR.koz : YR.amberKontur} />
        {z.kapsul === "kivilcim" && <circle cx={0.15} cy={0.65} r={0.03} fill={YR.hilal} />}
      </g>}
    </g>
  );
};

export const Yarasa: React.FC<{ z: YarasaPoz }> = ({ z }) => {
  if (z.gorus === "profil") return <ProfilAsili z={z} />;
  const kanat = z.kanat ?? 0, faz = z.faz ?? 0, stil = z.stil ?? "gercek", aci = z.aci ?? 0;
  const acikl = 3.1 * z.u * (1 - 0.55 * kanat); // ekrandaki yaklaşık genişlik (LOD ölçüsü)
  const capaY = z.capa === "ayak" ? -AYAK[1] : 0;
  const T = `translate(${z.x},${z.y}) rotate(${aci}) scale(${z.u}) translate(0,${capaY})`;
  const w = 1 / z.u; // 1 ekran px yerel birimde
  const renk = stil === "siluet" ? YR.siluet : stil === "gomulu" ? YR.gomulu : stil === "murekkep" || stil === "dolu" ? YR.murekkep : YR.govde;
  // --- LOD ---
  if (acikl < 6) return <circle cx={z.x} cy={z.y} r={Math.max(1, acikl / 3)} fill={renk} />;
  if (acikl < 12 && stil !== "murekkep") {
    const K = kanatNoktalari(kanat, faz);
    const d = `M${f([-K.d3[0], K.d3[1]])} L${f([-K.bilek[0], K.bilek[1]])} L${f([-K.dirsek[0], K.dirsek[1]])} L0,0 L${f(K.dirsek)} L${f(K.bilek)} L${f(K.d3)}`;
    return <g transform={T}><path d={d} fill="none" stroke={renk} strokeWidth={Math.max(1.6, acikl / 7) * w} strokeLinejoin="round" strokeLinecap="round" /><ellipse cx={0} cy={0.05} rx={0.2} ry={0.36} fill={renk} /></g>;
  }
  const sade = acikl < 60;
  const kanatD = kanatYol(kanat, faz);
  const nef = 1 + 0.02 * (z.nefes ?? 0);
  const kanatlar = <><path d={kanatD} /><path d={kanatD} transform="scale(-1,1)" />{kanat > 0.5 && <ellipse cx={0} cy={0.02} rx={0.31 * (kanat - 0.5) * 2} ry={0.46} />}</>;
  const UROP = urop(kanat);
  const govde = <><path d={UROP} /><path d={GOVDE} transform={`scale(${nef},1)`} /><circle cx={0} cy={-0.4} r={0.17} /><path d={kulak(1)} /><path d={kulak(-1)} /></>;
  const kuyrukUc = 1.2 - 0.82 * Math.min(1, kanat); // katlıda serbest uç uropatagiuma toplanır (asılıyken tüneğe batmaz)
  const kuyruk = <line x1={0} y1={0.4} x2={0} y2={kuyrukUc} />;

  if (stil === "murekkep") {
    // defter çizimi: yalnız mürekkep hat (3.5 px), ilerleme pathLength ile; dolgu yok (kâğıt)
    const c = Math.max(0, Math.min(1, z.ciz ?? 1));
    if (c <= 0) return null;
    // birleşim konturu: parçalar 2× kalın mürekkeple çizilir, üstüne kâğıt dolgu → yalnız DIŞ kontur kalır (iç parça hatları yok)
    const st = { stroke: YR.murekkep, strokeWidth: 7 * w, strokeLinejoin: "round" as const, strokeLinecap: "round" as const, pathLength: 1, strokeDasharray: `${c} 1.02`, fill: "none" };
    const parca = (q: Record<string, unknown>) => <>
      <path d={kanatD} {...q} /><path d={kanatD} transform="scale(-1,1)" {...q} />{kanat > 0.5 && <ellipse cx={0} cy={0.02} rx={0.31 * (kanat - 0.5) * 2} ry={0.46} {...q} />}
      <path d={urop(kanat)} {...q} /><path d={GOVDE} {...q} /><circle cx={0} cy={-0.4} r={0.17} {...q} /><path d={kulak(1)} {...q} /><path d={kulak(-1)} {...q} /></>;
    return (
      <g transform={T}>
        {parca(st)}
        <line x1={0} y1={0.4} x2={0} y2={1.2 - 0.82 * Math.min(1, kanat)} {...st} strokeWidth={3.5 * w} />
        {/* kâğıt dolgu ilerlemeyle ayak noktasına doğru büzülür (geri çizimde birden kaybolmaz) */}
        <g transform={`translate(0,0.52) scale(${Math.min(1, c * 2)}) translate(0,-0.52)`}>{parca({ fill: "#e6d8b9", stroke: "none" })}</g>
        {c >= 1 && <g stroke={YR.murekkep} strokeWidth={2.5 * w} strokeLinecap="round" fill="none">
          {kanat > 0.5 && <path d="M-0.27,-0.2 Q-0.31,0.1 -0.19,0.46 M0.27,-0.2 Q0.31,0.1 0.19,0.46" />}
          <path d="M0.06,-0.44 Q0.1,-0.6 0.16,-0.56 M-0.06,-0.44 Q-0.1,-0.6 -0.16,-0.56" />
          {!z.gogusBos && [0, 1, 2].map((i) => <line key={i} x1={0.07 + i * 0.03} y1={0.06 + i * 0.09} x2={0.13 + i * 0.03} y2={-0.05 + i * 0.09} />)}
        </g>}
        {c >= 1 && z.gogusBos && <circle cx={0} cy={0.02} r={0.1} fill="#e6d8b9" />}
      </g>
    );
  }

  // ışık ekranda sol-üst (lamba/güneş): yerel −x ekranda sola düşüyorsa 1, değilse (aci ≈ 180) −1 → ayna
  const isikYan = Math.cos((aci * Math.PI) / 180) >= 0 ? 1 : -1;
  const zar = stil === "gercek" ? (z.arkaIsik ? YR.zarArka : YR.zar) : renk;
  const kont = stil === "gercek" && !sade ? { stroke: YR.kontur, strokeWidth: 2.5 * w, strokeLinejoin: "round" as const } : {};
  return (
    <g transform={T}>
      {/* kenar ışığı: siluet sol-üste 2 px kaydırılmış kopya (ışık sol-üst; tek kaynak, çağıran açıyı verir) */}
      {z.kenar && stil !== "gomulu" && <g fill={YR.kenar} transform={`rotate(${-aci}) translate(${-2 * w},${-1.6 * w}) rotate(${aci})`} >{kanatlar}{govde}</g>}
      <g fill={zar} {...kont}>{kanatlar}</g>
      {!sade && stil === "gercek" && kanat < 0.6 && (() => { // parmak kemikleri (yalnız yakın/orta)
        const K = kanatNoktalari(kanat, faz);
        return <g stroke={YR.govdeGolge} strokeWidth={1.5 * w} strokeLinecap="round" fill="none">{[1, -1].map((s) => <g key={s} transform={`scale(${s},1)`}><path d={`M${f(K.bilek)} L${f(K.d4)} M${f(K.bilek)} L${f(K.d5)}`} /></g>)}</g>;
      })()}
      <g stroke={stil === "gercek" ? YR.kontur : renk} strokeWidth={Math.max(0.04, 2.2 * w)} strokeLinecap="round">{kuyruk}</g>
      <g fill={stil === "gercek" ? YR.govde : renk} {...kont}>{govde}</g>
      {!sade && kanat > 0.5 && (() => { const K = kanatNoktalari(kanat, faz); return <g fill="none" stroke={stil === "gercek" ? YR.kontur : renk} strokeWidth={2.4 * w} strokeLinecap="round">{[1, -1].map((s) => <path key={s} d={`M${s * K.bilek[0]},${K.bilek[1]} q${s * 0.07},${-0.02} ${s * 0.08},${-0.08}`} />)}</g>; })()}
      {stil === "gercek" && !sade && kanat > 0.7 && <path d="M-0.3,-0.22 Q-0.35,0.12 -0.2,0.5 M0.3,-0.22 Q0.35,0.12 0.2,0.5" fill="none" stroke={YR.govdeGolge} strokeWidth={3 * w} strokeLinecap="round" />}
      {stil === "gercek" && !sade && kanat > 0.7 && <path d="M-0.3,-0.22 Q-0.35,0.12 -0.2,0.5" transform={`scale(${isikYan},1) translate(${-1.5 * w},0)`} fill="none" stroke={YR.kenar} strokeWidth={1.6 * w} strokeLinecap="round" opacity={0.8} />}
      {stil === "gercek" && <path d={GOVDE} fill={YR.govdeGolge} transform={`translate(${0.07 * isikYan * -1},0) scale(0.62,0.94)`} opacity={0.75} />}
      {stil === "gercek" && !sade && <>
        <path d={kulak(1)} fill={YR.kulakIc} transform="translate(0.03,0.04) scale(0.6)" />
        <path d={kulak(-1)} fill={YR.kulakIc} transform="translate(-0.03,0.04) scale(0.6)" />
        <g stroke={YR.kil} strokeWidth={1.2 * w} strokeLinecap="round">{[-1, 1].map((s) => [0, 1, 2].map((i) => <line key={`${s}${i}`} x1={s * (0.08 + i * 0.02)} y1={0.44} x2={s * (0.07 + i * 0.03)} y2={0.51} />))}</g>
        <g fill="none" stroke={YR.kontur} strokeWidth={2 * w} strokeLinecap="round">{[-1, 1].map((s) => <path key={s} d={`M${s * 0.06},0.47 Q${s * 0.11},0.53 ${s * 0.15},0.49`} />)}</g>
        {(z.basDon ?? 0) !== 0 || z.u > 50 ? <g transform={`rotate(${z.basDon ?? 0} 0 -0.4)`}>
          <ellipse cx={0} cy={-0.33} rx={0.085} ry={0.06} fill={YR.kulakIc} /><path d="M-0.025,-0.355 L0.025,-0.355 L0,-0.325 Z" fill="#1c1915" />
          <circle cx={-0.065} cy={-0.43} r={0.03} fill="#1c1915" /><circle cx={0.065} cy={-0.43} r={0.03} fill="#1c1915" />
          <circle cx={-0.072} cy={-0.44} r={Math.max(0.011, 0.9 * w)} fill="#e6d8b9" /><circle cx={0.058} cy={-0.44} r={Math.max(0.011, 0.9 * w)} fill="#e6d8b9" />
          <path d="M-0.05,-0.31 Q0,-0.28 0.05,-0.31 M-0.04,-0.34 Q0,-0.32 0.04,-0.34 M-0.03,-0.365 Q0,-0.355 0.03,-0.365" stroke={YR.govdeGolge} strokeWidth={1.2 * w} fill="none" />
        </g> : null}
      </>}
      {z.kapsul && z.kapsul !== "yok" && <Kapsul durum={z.kapsul} nabiz={z.nabiz} w={w} />}
    </g>
  );
};
