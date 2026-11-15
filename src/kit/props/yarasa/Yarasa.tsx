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
const UROP = "M0.15,0.3 L0.11,0.52 Q0.07,0.8 0,0.92 Q-0.07,0.8 -0.11,0.52 L-0.15,0.3 Z";
const GOVDE = "M0,-0.3 C0.2,-0.3 0.21,0.12 0.17,0.3 C0.12,0.46 -0.12,0.46 -0.17,0.3 C-0.21,0.12 -0.2,-0.3 0,-0.3 Z";
const kulak = (s: number) => `M${0.02 * s},-0.5 C${0.03 * s},-0.74 ${0.24 * s},-0.76 ${0.22 * s},-0.5 C${0.2 * s},-0.42 ${0.1 * s},-0.4 ${0.02 * s},-0.5 Z`; // geniş yuvarlak, önde 0.04 aralık

// Kapsül (tasarım §2): silindir boy 0.55 × çap 0.20 (×1.5 stilize), göğüste gövde eksenine paralel; kapak + halka baş tarafında
export const Kapsul: React.FC<{ durum: KapsulDurum; nabiz?: number; w: number }> = ({ durum, nabiz = 0, w }) => {
  if (durum === "yok") return null;
  const L = 0.44, R = 0.08, y0 = -0.2, y1 = y0 + L; // tasarım ×1.5 → ×1.2 (kalibrasyon: ×1.5 kapsül yarasayı "fener" okutuyordu)
  const kenar = 1.6 * w;
  const n = durum === "koz" || durum === "kivilcim" ? Math.max(0, Math.min(1, nabiz)) : 0;
  return (
    <g>
      {n > 0 && <circle cx={0} cy={y0 + 0.05} r={0.1 + 0.07 * n} fill={YR.koz} opacity={0.3 * n} />}
      <rect x={-R} y={y0} width={2 * R} height={L} rx={R} fill={YR.amber} stroke={YR.amberKontur} strokeWidth={kenar} />
      <rect x={-R * 0.45} y={y0 + 0.12} width={R * 0.9} height={L - 0.2} rx={R * 0.45} fill={YR.jel} opacity={0.75} />
      <path d={`M${-R * 0.7},${y0 + 0.16} Q${-R * 0.75},${y0 + 0.3} ${-R * 0.5},${y0 + 0.4}`} stroke={YR.hilal} strokeWidth={0.035} fill="none" strokeLinecap="round" />
      <circle cx={0.04} cy={y1 - 0.12} r={0.022} fill="#cdbf9a" /> {/* yapıştırıcı damlası (soluk, amber değil) */}
      <rect x={-R * 1.02} y={y0 - 0.02} width={2 * R * 1.02} height={0.07} rx={0.02} fill={YR.kapak} stroke={YR.kontur} strokeWidth={kenar * 0.8} />
      <rect x={-R * 1.06} y={y0 + 0.045} width={2 * R * 1.06} height={0.022} fill={n > 0 ? YR.koz : YR.halka} opacity={n > 0 ? 0.55 + 0.45 * n : 1} />
      {durum === "kivilcim" && <circle cx={0} cy={y0 - 0.05} r={0.05} fill={YR.hilal} />}
    </g>
  );
};

export const Yarasa: React.FC<{ z: YarasaPoz }> = ({ z }) => {
  const kanat = z.kanat ?? 0, faz = z.faz ?? 0, stil = z.stil ?? "gercek", aci = z.aci ?? 0;
  const acikl = 3.1 * z.u * (1 - 0.55 * kanat); // ekrandaki yaklaşık genişlik (LOD ölçüsü)
  const capaY = z.capa === "ayak" ? -AYAK[1] : 0;
  const T = `translate(${z.x},${z.y}) rotate(${aci}) scale(${z.u}) translate(0,${capaY})`;
  const w = 1 / z.u; // 1 ekran px yerel birimde
  const renk = stil === "siluet" ? YR.siluet : stil === "gomulu" ? YR.gomulu : stil === "murekkep" || stil === "dolu" ? YR.murekkep : YR.govde;
  // --- LOD ---
  if (acikl < 6) return <circle cx={z.x} cy={z.y} r={Math.max(1, acikl / 3)} fill={renk} />;
  if (acikl < 18 && stil !== "murekkep") {
    const K = kanatNoktalari(kanat, faz);
    const d = `M${f([-K.d3[0], K.d3[1]])} L${f([-K.bilek[0], K.bilek[1]])} L${f([-K.dirsek[0], K.dirsek[1]])} L0,0 L${f(K.dirsek)} L${f(K.bilek)} L${f(K.d3)}`;
    return <g transform={T}><path d={d} fill="none" stroke={renk} strokeWidth={Math.max(1.6, acikl / 7) * w} strokeLinejoin="round" strokeLinecap="round" /><ellipse cx={0} cy={0.05} rx={0.2} ry={0.36} fill={renk} /></g>;
  }
  const sade = acikl < 60;
  const kanatD = kanatYol(kanat, faz);
  const nef = 1 + 0.02 * (z.nefes ?? 0);
  const kanatlar = <><path d={kanatD} /><path d={kanatD} transform="scale(-1,1)" />{kanat > 0.5 && <ellipse cx={0} cy={0.06} rx={0.31 * (kanat - 0.5) * 2} ry={0.52} />}</>;
  const govde = <><path d={UROP} /><path d={GOVDE} transform={`scale(${nef},1)`} /><circle cx={0} cy={-0.4} r={0.17} /><path d={kulak(1)} /><path d={kulak(-1)} /></>;
  const kuyrukUc = 1.2 - 0.62 * Math.min(1, kanat); // katlıda serbest uç uropatagiuma toplanır (asılıyken tüneğe batmaz)
  const kuyruk = <line x1={0} y1={0.4} x2={0} y2={kuyrukUc} />;

  if (stil === "murekkep") {
    // defter çizimi: yalnız mürekkep hat (3.5 px), ilerleme pathLength ile; dolgu yok (kâğıt)
    const c = Math.max(0, Math.min(1, z.ciz ?? 1));
    if (c <= 0) return null;
    // birleşim konturu: parçalar 2× kalın mürekkeple çizilir, üstüne kâğıt dolgu → yalnız DIŞ kontur kalır (iç parça hatları yok)
    const st = { stroke: YR.murekkep, strokeWidth: 7 * w, strokeLinejoin: "round" as const, strokeLinecap: "round" as const, pathLength: 1, strokeDasharray: `${c} 1.02`, fill: "none" };
    const parca = (q: Record<string, unknown>) => <>
      <path d={kanatD} {...q} /><path d={kanatD} transform="scale(-1,1)" {...q} />{kanat > 0.5 && <ellipse cx={0} cy={0.06} rx={0.31 * (kanat - 0.5) * 2} ry={0.52} {...q} />}
      <path d={UROP} {...q} /><path d={GOVDE} {...q} /><circle cx={0} cy={-0.4} r={0.17} {...q} /><path d={kulak(1)} {...q} /><path d={kulak(-1)} {...q} /></>;
    return (
      <g transform={T}>
        {parca(st)}
        <line x1={0} y1={0.4} x2={0} y2={1.2 - 0.62 * Math.min(1, kanat)} {...st} strokeWidth={3.5 * w} />
        {parca({ fill: "#e6d8b9", stroke: "none" })}
        {c >= 1 && <g stroke={YR.murekkep} strokeWidth={2.5 * w} strokeLinecap="round" fill="none">
          {kanat > 0.5 && <path d="M-0.27,-0.2 Q-0.31,0.1 -0.19,0.46 M0.27,-0.2 Q0.31,0.1 0.19,0.46" />}
          <path d="M0.06,-0.44 Q0.1,-0.6 0.16,-0.56 M-0.06,-0.44 Q-0.1,-0.6 -0.16,-0.56" />
          {!z.gogusBos && [0, 1, 2].map((i) => <line key={i} x1={0.07 + i * 0.03} y1={0.06 + i * 0.09} x2={0.13 + i * 0.03} y2={-0.05 + i * 0.09} />)}
        </g>}
        {c >= 1 && z.gogusBos && <circle cx={0} cy={0.02} r={0.1} fill="#e6d8b9" />}
      </g>
    );
  }

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
      {stil === "gercek" && !sade && kanat > 0.7 && <path d="M-0.3,-0.22 Q-0.35,0.12 -0.2,0.5 M0.3,-0.22 Q0.35,0.12 0.2,0.5" fill="none" stroke={YR.govdeGolge} strokeWidth={3 * w} strokeLinecap="round" />}
      {stil === "gercek" && !sade && kanat > 0.7 && <path d="M-0.3,-0.22 Q-0.35,0.12 -0.2,0.5" transform={`translate(${-1.5 * w},0)`} fill="none" stroke={YR.kenar} strokeWidth={1.6 * w} strokeLinecap="round" opacity={0.8} />}
      {stil === "gercek" && <path d={GOVDE} fill={YR.govdeGolge} transform="translate(0.07,0) scale(0.62,0.94)" opacity={0.75} />}
      {stil === "gercek" && !sade && <>
        <path d={kulak(1)} fill={YR.kulakIc} transform="translate(0.03,0.04) scale(0.6)" />
        <path d={kulak(-1)} fill={YR.kulakIc} transform="translate(-0.03,0.04) scale(0.6)" />
        <g stroke={YR.kil} strokeWidth={1.2 * w} strokeLinecap="round">{[-1, 1].map((s) => [0, 1, 2, 3].map((i) => <line key={`${s}${i}`} x1={s * (0.08 + i * 0.015)} y1={0.5} x2={s * (0.06 + i * 0.03)} y2={0.6} />))}</g>
        {(z.basDon ?? 0) !== 0 || z.u > 120 ? <g transform={`rotate(${z.basDon ?? 0} 0 -0.4)`}>
          <circle cx={-0.06} cy={-0.42} r={0.022} fill="#1c1915" /><circle cx={0.06} cy={-0.42} r={0.022} fill="#1c1915" />
          <circle cx={-0.066} cy={-0.428} r={0.007} fill="#e6d8b9" /><circle cx={0.054} cy={-0.428} r={0.007} fill="#e6d8b9" />
          <path d="M-0.05,-0.31 Q0,-0.28 0.05,-0.31 M-0.04,-0.34 Q0,-0.32 0.04,-0.34 M-0.03,-0.365 Q0,-0.355 0.03,-0.365" stroke={YR.govdeGolge} strokeWidth={1.2 * w} fill="none" />
        </g> : null}
      </>}
      {z.kapsul && z.kapsul !== "yok" && <Kapsul durum={z.kapsul} nabiz={z.nabiz} w={w} />}
    </g>
  );
};
