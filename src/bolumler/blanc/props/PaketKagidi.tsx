import React, { useId } from "react";
import { P, ink, lerp, poly, rnd } from "../../../doku/sabitler";
import { ToursEtiketi } from "./ToursEtiketi";

// ===== PaketKagidi (tasarim.md 3.1) — P01, P09, P10, P23 ortak =====
// 1834 paketi: eldivene doğrudan sarılan YUMUŞAK kahverengi paket kâğıdı + kenevir ip. Kutu / koli / mukavva YOK, yan duvar YOK.
// Tek parça kâğıt (~30×36 cm) zarf gibi katlanır: yan kenarlar ortaya, alt-üst kıvrım üst üste; ip boyuna + enine bir kez çaprazlanır, fiyonk.
// acik: 0 KAPALI · ~0.5 YARI AÇIK (P01 f0–54: üst kanat geri kalkık, yanlar gevşek, ip çözük) · 1 AÇIK (dört kanat masaya yatık,
// uçları hafif kalkık; ortada eldiven boyu sığ kırışık yatak; fiyonk izi + çapraz ip izleri; ip açık paketin ÜSTÜNDEN GEÇMEZ).
// kabarti: KAPALI üstünde eldivenin beş parmağı (P23). Işık geç gün (sağ-üst) ⇒ kat ışığı sağ/üst, gölge sol-aşağı.
// Yerel birim: px @ olcek 1, orijin = kâğıt merkezi, masa düzleminde (tepe-önden: y ekseni ~%82 kısalmış).
export const PAKET_RENK = { kagit: "#b08a5a", isik: "#c49f6c", golge: "#8a6a40", katIsik: "#d9bf94", katGolge: "#6e5230", kenar: "#9a7a4c", ip: "#d8c9a0", ipKontur: "#8a7a52" };
const R = PAKET_RENK;
const B = { x: 120, y: 150 }; // eldiven yatağı yarı ölçüsü (taban)

export const PaketKagidi: React.FC<{
  x: number; y: number; olcek?: number; aci?: number; acik: number; ipCozuk?: boolean; kabarti?: number; etiket?: boolean; seed?: number;
  etiketYeri?: P; // açık hâlde etiketin masadaki yeri (yerel)
  katman?: "alt" | "ust"; // ust: yarı açıkta eldivenin ÜSTÜNE kapanan gevşek yan kanatlar (eldivenden sonra çizilir)
}> = ({ x, y, olcek = 1, aci = 0, acik, ipCozuk = true, kabarti = 0, etiket = true, seed = 23, etiketYeri = [250, 300], katman = "alt" }) => {
  const id = "pk" + useId().replace(/:/g, "");
  const tir = (a: P, b: P, n: number, k: string, gen = 5): P[] => Array.from({ length: n + 1 }).map((_, i) => [lerp(a[0], b[0], i / n) + (rnd(seed, `${k}x${i}`) - 0.5) * gen, lerp(a[1], b[1], i / n) + (rnd(seed, `${k}y${i}`) - 0.5) * gen] as P);
  const kat = (a: P, b: P, k: string) => <g key={k}><polyline points={poly([a, b])} stroke={R.katIsik} strokeWidth={3.2} fill="none" /><polyline points={poly([[a[0] - 2, a[1] + 3], [b[0] - 2, b[1] + 3]])} stroke={R.katGolge} strokeWidth={2.2} fill="none" opacity={0.85} /></g>;
  const lif = <filter id={`${id}l`} x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.22" numOctaves={2} seed={seed} /><feColorMatrix type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.14  -1.6 0 0 0 0.95" /></filter>;

  // --- KAPALI / KABARTILI ---
  if (acik < 0.25) {
    const w = 132, h = 168;
    const govde: P[] = [[-w + 6, -h], [w - 6, -h], [w, -h + 8], [w, h - 8], [w - 6, h], [-w + 6, h], [-w, h - 8], [-w, -h + 8]];
    return (
      <g transform={`translate(${x},${y}) rotate(${aci}) scale(${olcek})`}>
        <defs>{lif}<clipPath id={`${id}c`}><polygon points={poly(govde)} /></clipPath></defs>
        <polygon points={poly(govde.map(([a, b]) => [a - 10, b + 14] as P))} fill="#14110d" opacity={0.28} />
        <polygon points={poly(govde)} fill={R.kagit} stroke={ink(R.kagit)} strokeWidth={2.4} strokeLinejoin="round" />
        <g clipPath={`url(#${id}c)`}>
          <rect x={-w} y={-h} width={2 * w} height={2 * h} filter={`url(#${id}l)`} opacity={0.45} />
          {/* zarf katları: yan kanatlar ortada, alt-üst bindirme */}
          <polygon points={poly([[-w, -h], [-12, -h + 30], [-12, h - 30], [-w, h]])} fill={R.golge} opacity={0.35} />
          <polygon points={poly([[w, -h], [14, -h + 34], [14, h - 34], [w, h]])} fill={R.isik} opacity={0.4} />
          <ellipse cx={4} cy={-6} rx={w * 0.7} ry={h * 0.62} fill={R.isik} opacity={0.18} />
          {kabarti > 0 && [[-46, 30], [-18, 44], [10, 46], [36, 40], [-62, -10]].map(([px, py], i) => <g key={i} opacity={kabarti}><path d={`M ${px} ${py - 62} Q ${px + 6} ${py - 20} ${px + 2} ${py}`} stroke={R.katIsik} strokeWidth={6} fill="none" strokeLinecap="round" /><path d={`M ${px - 6} ${py - 60} Q ${px} ${py - 20} ${px - 4} ${py}`} stroke={R.katGolge} strokeWidth={4} fill="none" strokeLinecap="round" /></g>)}
        </g>
        {kat([-w + 8, 40], [w - 8, 36], "k1")}
        {/* ip çaprazı + fiyonk */}
        {!ipCozuk && <g>
          <path d={`M -2 ${-h - 4} L 2 ${h + 4}`} stroke={R.ip} strokeWidth={6} />
          <path d={`M ${-w - 4} 4 L ${w + 4} -2`} stroke={R.ip} strokeWidth={6} />
          <path d="M 0 0 q -26 -22 -36 -2 q 10 16 36 2 q 26 -22 36 -2 q -10 16 -36 2" fill={R.ip} stroke={R.ipKontur} strokeWidth={1.6} />
          <path d="M -2 4 q -10 30 -24 44 M 2 4 q 12 26 30 34" stroke={R.ip} strokeWidth={5} fill="none" strokeLinecap="round" />
          {etiket && <ToursEtiketi x={30} y={48} olcek={0.34} aci={18} />}
        </g>}
      </g>
    );
  }

  // --- YARI AÇIK / AÇIK: tek parça kâğıt yaprağı, dört kanat (kat çizgileri = ışık + gölge çifti), yan duvar yok ---
  const a = Math.min(1, Math.max(0, (acik - 0.25) / 0.75)); // 0 yarı açık … 1 açık
  const ustKalk = 1 - a;   // üst kanat geri kalkık → masaya yatar
  const yanKalk = 1 - a;
  const D = { u: 128, a: 136, y: 116 }; // kanat derinlikleri (üst, alt, yan)
  // kanat uçları kalkıkken kısalır ve aydınlanır (ışığa döner)
  const ustUc = -B.y - D.u * (1 - 0.55 * ustKalk);
  if (katman === "ust") {
    // yarı açık: ALT kanat geri katlanmış hâlde eldivenin parmaklarının üstünde (eldiven kâğıttan yarı çıkmış); uç kalkık, ışıklı
    const k = yanKalk;
    if (k < 0.04) return null;
    const h = 170 * k;
    const kanat: P[] = [[-B.x - 6, B.y + 4], [B.x + 6, B.y + 2], [B.x - 4, B.y - h + 10], [-B.x + 8, B.y - h]];
    return (
      <g transform={`translate(${x},${y}) rotate(${aci}) scale(${olcek})`}>
        <polygon points={poly(kanat.map(([p, r]) => [p - 6, r + 9] as P))} fill="#14110d" opacity={0.22 * k} />
        <polygon points={poly(kanat)} fill={R.isik} stroke={ink(R.kagit)} strokeWidth={2} strokeLinejoin="round" />
        <path d={`M ${-B.x + 8} ${B.y - h} Q 0 ${B.y - h - 12} ${B.x - 4} ${B.y - h + 10}`} stroke={R.katIsik} strokeWidth={4} fill="none" />
        {[0.3, 0.6].map((t) => <line key={t} x1={-B.x + 20} y1={B.y - h * t} x2={B.x - 20} y2={B.y - h * t + 4} stroke={R.katGolge} strokeWidth={1.4} opacity={0.4} />)}
      </g>
    );
  }
  // TEK PARÇA kâğıt: dış kenar (yumuşak, hafif tırtıklı) — köşeler kâğıtla dolu (zarf katı köşeleri), yan duvar YOK
  const kose = (sx: number, sy: number): P => [sx * (B.x + D.y * (sx > 0 ? 1 : 1) * (1 - 0.35 * yanKalk)), sy > 0 ? B.y + D.a : ustUc];
  const dis: P[] = [
    ...tir([-B.x - 30, ustUc + 6], [B.x + 26, ustUc - 4], 8, "u"),
    ...tir(kose(1, -1), kose(1, 1), 8, "r"),
    ...tir([B.x + 34, B.y + D.a], [-B.x - 34, B.y + D.a + 6], 8, "a"),
    ...tir(kose(-1, 1), kose(-1, -1), 8, "l"),
  ];
  const tum = dis;
  return (
    <g transform={`translate(${x},${y}) rotate(${aci}) scale(${olcek})`}>
      <defs>{lif}<clipPath id={`${id}c`}><polygon points={poly(tum)} /></clipPath>
        <radialGradient id={`${id}y`} cx="0.5" cy="0.45" r="0.6"><stop offset="0.55" stopColor={R.golge} stopOpacity={0} /><stop offset="1" stopColor={R.golge} stopOpacity={0.35} /></radialGradient>
      </defs>
      {/* kâğıdın masaya temas gölgesi (sol-aşağı, ince — kâğıt yassı) */}
      <polygon points={poly(tum.map(([p, q]) => [p - 6, q + 8] as P))} fill="#14110d" opacity={0.18 + 0.1 * ustKalk} />
      <polygon points={poly(tum)} fill={R.kagit} stroke={ink(R.kagit)} strokeWidth={2.2} strokeLinejoin="round" />
      <g clipPath={`url(#${id}c)`}>
        <rect x={-300} y={-320} width={600} height={640} filter={`url(#${id}l)`} opacity={0.5} />
        {/* eldiven yatağı: tabanda hafif çukur (degrade), eldiven biçimli sığ kırışıklar — kutu değil */}
        <rect x={-B.x} y={-B.y} width={2 * B.x} height={2 * B.y} fill={`url(#${id}y)`} opacity={0.6} />
      </g>
      <path d="M -54 -118 Q -66 -40 -60 30 Q -58 90 -40 128 M 50 -118 Q 62 -40 58 30 Q 56 90 40 128" stroke={R.golge} strokeWidth={3.5} fill="none" opacity={0.6} />
      <path d="M -40 40 Q -30 100 -24 128 M -6 50 Q 0 100 2 132 M 22 46 Q 28 100 30 128" stroke={R.katGolge} strokeWidth={2} fill="none" opacity={0.45} />
      <path d="M -50 -112 Q 0 -124 46 -112" stroke={R.katIsik} strokeWidth={3} fill="none" />
      {/* fiyonk izi + çapraz ip izleri (ezik, silik) */}
      <path d={`M 0 ${ustUc + 20} L 0 ${B.y + D.a - 14} M ${-B.x - D.y + 20} 4 L ${B.x + D.y - 20} -2`} stroke={R.katGolge} strokeWidth={2.2} strokeDasharray="10 6" opacity={0.35} fill="none" />
      <path d="M 4 2 q -22 -18 -30 0 q 8 12 30 0 q 22 -18 30 0 q -8 12 -30 0" stroke={R.katGolge} strokeWidth={2} fill="none" opacity={0.45} />
      {/* kat çizgileri: tabanın dört kenarı + köşelerde zarf katının çaprazları (ışık + gölge çifti) */}
      {kat([-B.x, -B.y], [B.x, -B.y], "k1")}{kat([B.x, -B.y], [B.x, B.y], "k2")}{kat([-B.x, B.y], [B.x, B.y], "k3")}{kat([-B.x, -B.y], [-B.x, B.y], "k4")}
      {/* açılmış ambalajın kat izi: taban kenarları kâğıt kenarına kadar uzanır (çapraz köşe katı YOK → tepsi/kutu okunmaz) */}
      {[[[-B.x, ustUc + 8], [-B.x, -B.y]], [[B.x, ustUc + 4], [B.x, -B.y]], [[-B.x, B.y], [-B.x, B.y + D.a - 4]], [[B.x, B.y], [B.x, B.y + D.a - 4]],
        [[kose(-1, -1)[0] + 6, -B.y], [-B.x, -B.y]], [[B.x, -B.y], [kose(1, -1)[0] - 6, -B.y]], [[kose(-1, 1)[0] + 6, B.y], [-B.x, B.y]], [[B.x, B.y], [kose(1, 1)[0] - 6, B.y]]].map(([p0, p1], i) =>
        <g key={`e${i}`} opacity={0.65}>{kat(p0 as P, p1 as P, `ek${i}`)}</g>)}
      {/* buruşukluk: kanatlarda kısa kırışıklar (yumuşak kâğıt) */}
      {Array.from({ length: 14 }).map((_, i) => { const px = (rnd(seed, `wx${i}`) - 0.5) * 2 * (B.x + D.y * 0.8), py = (rnd(seed, `wy${i}`) - 0.5) * 2 * (B.y + D.a * 0.8); if (Math.abs(px) < B.x && Math.abs(py) < B.y) return null; const L = 18 + rnd(seed, `wl${i}`) * 30, an = rnd(seed, `wa${i}`) * 3.14; return <g key={`w${i}`}><line x1={px} y1={py} x2={px + Math.cos(an) * L} y2={py + Math.sin(an) * L} stroke={R.katGolge} strokeWidth={1.6} opacity={0.4} /><line x1={px + 2} y1={py - 2} x2={px + 2 + Math.cos(an) * L} y2={py - 2 + Math.sin(an) * L} stroke={R.katIsik} strokeWidth={1.4} opacity={0.5} /></g>; })}
      {/* köşe kulağı: sağ-alt köşe hafif kalkık */}
      <polygon points={poly([kose(1, 1), [kose(1, 1)[0] - 34, kose(1, 1)[1] - 4], [kose(1, 1)[0] - 6, kose(1, 1)[1] - 30]])} fill={R.katIsik} stroke={ink(R.kagit)} strokeWidth={1.4} />
      {/* kanat uçları hafif kalkık: dış kenarda ışık şeridi (sağ/üst) ve kenar (sol/alt) */}
      <polyline points={poly(dis.slice(0, 18))} stroke={R.katIsik} strokeWidth={4} fill="none" opacity={0.8} strokeLinecap="round" />
      <polyline points={poly(dis.slice(18))} stroke={R.kenar} strokeWidth={4} fill="none" opacity={0.7} strokeLinecap="round" />
      {/* yarı açık: üst kanat geri kalkık — kat çizgisinden kalkan ışıklı yüz + altına düşen gölge */}
      {ustKalk > 0.05 && <g>
        <polygon points={poly([[-B.x - 22, -B.y + 2], [B.x + 22, -B.y - 2], [B.x + 30, -B.y - 70 * ustKalk], [-B.x - 26, -B.y - 66 * ustKalk]])} fill="#14110d" opacity={0.18 * ustKalk} />
        <polygon points={poly([[-B.x - 20, -B.y - 4], [B.x + 20, -B.y - 8], [B.x + 34, -B.y - 96 * ustKalk], [-B.x - 30, -B.y - 92 * ustKalk]])} fill={R.isik} stroke={ink(R.kagit)} strokeWidth={2} strokeLinejoin="round" />
        <polyline points={poly([[-B.x - 30, -B.y - 92 * ustKalk], [B.x + 34, -B.y - 96 * ustKalk]])} stroke={R.katIsik} strokeWidth={4} />
      </g>}
      {/* çözülmüş ip: iki uç MASADA gevşek kıvrık (kâğıdın kenarından çıkar, açık paketin üstünden geçmez) */}
      {ipCozuk && <g>
        <path d={`M ${-B.x - D.y + 10} 40 Q ${-B.x - D.y - 50} 70 ${-B.x - D.y - 30} 130 Q ${-B.x - D.y - 10} 180 ${-B.x - D.y - 70} 210`} stroke={R.ip} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d={`M ${30} ${B.y + D.a - 4} Q 70 ${B.y + D.a + 50} 140 ${B.y + D.a + 40} Q 200 ${B.y + D.a + 30} ${etiketYeri[0] - 8} ${etiketYeri[1] + 4}`} stroke={R.ip} strokeWidth={5} fill="none" strokeLinecap="round" />
        {[0, 1].map((i) => <path key={i} d={i ? `M ${30} ${B.y + D.a - 4} Q 70 ${B.y + D.a + 50} 140 ${B.y + D.a + 40} Q 200 ${B.y + D.a + 30} ${etiketYeri[0] - 8} ${etiketYeri[1] + 4}` : `M ${-B.x - D.y + 10} 40 Q ${-B.x - D.y - 50} 70 ${-B.x - D.y - 30} 130 Q ${-B.x - D.y - 10} 180 ${-B.x - D.y - 70} 210`} stroke={R.ipKontur} strokeWidth={1.6} strokeDasharray="3 8" fill="none" />)}
        {etiket && <ToursEtiketi x={etiketYeri[0]} y={etiketYeri[1]} olcek={0.4} aci={-6} />}
      </g>}
    </g>
  );
};
