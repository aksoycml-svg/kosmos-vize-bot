// ===== Props kaydı =====
// tur → bileşen. Yerel orijin = nesnenin masa/zemin temas merkezi; ölçek 1 = MASA-INSERT yakın ölçüsü (el boyu ≈ 266 px).
// Hikâye nesneleri 360 px'te okunmalı: kâğıt + ip (paket), beş parmak (eldiven), topuk + konç (çorap), kapak + sırt (dosya).
// İMZA NESNESİ: eldiven beyazı (GLOVE.hero) YALNIZ eldivende — diğer prop'lar bu bandın altında kalır (L* < 90).
import React from "react";
import { ink, P, poly } from "../../doku/sabitler";
import { PaketKagidi } from "../../bolumler/blanc/props/PaketKagidi";
import { Eldiven } from "../../bolumler/blanc/props/Eldiven";
import type { Prop, PropTur } from "../tipler";
import { deger } from "../zaman";
import { Guve } from "./EldivenGiyme";

export type PropCiz = { durum: Record<string, number | string | boolean>; seed: number; golge?: boolean; golgeRenk?: string; fl?: number };
const sayi = (d: PropCiz["durum"], k: string, v = 0) => (typeof d[k] === "number" ? (d[k] as number) : v);
const G = (o: PropCiz, c: string) => (o.golge ? o.golgeRenk ?? "#14110d" : c);

// Çorap (1830'lar yün çorap: konç + topuk + burun; kırmızımsı değil — koyu kahve-gri yün, ok ↓ kırmızısıyla karışmaz)
const Corap: React.FC<PropCiz> = (o) => {
  const sark = sayi(o.durum, "sarkma", 0); // 0 masada yatık, 1 elden sarkan (uzar)
  const c = G(o, "#6a5a4c"), k = G(o, "#4e4236");
  const L = 260 + 70 * sark;
  const st = o.golge ? {} : { stroke: ink("#6a5a4c"), strokeWidth: 3, strokeLinejoin: "round" as const };
  return (
    <g>
      <path d={`M -42 0 L 42 0 L 38 ${L * 0.72} Q 40 ${L * 0.86} 70 ${L * 0.9} Q 112 ${L * 0.96} 104 ${L} Q 60 ${L + 12} 8 ${L * 0.98} Q -40 ${L * 0.92} -40 ${L * 0.7} Z`} fill={c} {...st} />
      {!o.golge && <>
        <rect x={-44} y={-6} width={88} height={30} rx={6} fill={k} stroke={ink("#4e4236")} strokeWidth={2} />
        {[40, 80, 120, 160].map((y) => <path key={y} d={`M -38 ${y} Q 0 ${y + 6} 38 ${y}`} stroke={k} strokeWidth={2} fill="none" opacity={0.6} />)}
        <path d={`M 30 ${L * 0.8} Q 70 ${L * 0.86} 96 ${L * 0.95}`} stroke={k} strokeWidth={3} fill="none" />
      </>}
    </g>
  );
};

// Dosya (ciltli dava dosyası): kapak 0 açık (sola yatık) → 1 kapalı. Kapalı kare "TOK".
const Dosya: React.FC<PropCiz> = (o) => {
  const kapak = sayi(o.durum, "kapak", 1);
  const W = 300, H = 380;
  const kc = G(o, "#5a4632"), kag = G(o, "#d8ccb0");
  const st = (c: string) => (o.golge ? {} : { stroke: ink(c), strokeWidth: 3 });
  // kapak menteşesi sol kenar; açıkken sola masaya yatık. Serbest kenar x = −W/2 + W·cos(π(1−kapak)); ortada kalkar (y kayması)
  const fx = -W / 2 + W * Math.cos(Math.PI * (1 - kapak)), kalk = Math.sin(Math.PI * kapak) * 40;
  return (
    <g>
      <rect x={-W / 2} y={-H / 2} width={W} height={H} fill={kc} {...st("#5a4632")} />
      <rect x={-W / 2 + 10} y={-H / 2 + 8} width={W - 20} height={H - 16} fill={kag} {...st("#d8ccb0")} />
      {!o.golge && [0.18, 0.28, 0.38, 0.48, 0.58, 0.68].map((t) => <line key={t} x1={-W / 2 + 34} y1={-H / 2 + H * t} x2={W / 2 - 40 - (t * 97 % 40)} y2={-H / 2 + H * t} stroke="#6a5e48" strokeWidth={3} opacity={0.6} />)}
      <polygon points={poly([[-W / 2, -H / 2], [fx, -H / 2 - kalk], [fx, H / 2 - kalk * 0.6], [-W / 2, H / 2]] as P[])} fill={kc} {...st("#5a4632")} />
      {!o.golge && kapak > 0.9 && <rect x={-W / 2 + 60} y={-40} width={W - 120} height={70} fill="#c9bb98" stroke={ink("#c9bb98")} strokeWidth={2} />}
    </g>
  );
};

// Kanun kitabı (açık): sayfa 0..1 çevrilen yaprağın ilerlemesi (her çevirişte 0→1, sonra 0'a dönüp sonraki yaprak).
// K4 (v4 P11) bos: sabit ya da ANAHTARLI (boolean dizisi, basamaklı) — sağ sayfa boş mu. Son çevirişin başında true yapılır
// (yaprak sağ sayfayı örterken değişir → görünür sıçrama yok).
// K4 guve: sayı ANAHTARLI; < 0 → güve YOK (çizilmez). 0 = boş sayfada kanat kapalı (yaprağın ALTINDA: çevrilen yaprak üstünden
// kalkınca görünür), .1'den sonra kanat çırparak uçar (yaprağın ÜSTÜNDE), 1'de kadraj üstünden çıkmış. Tek kitap nesnesi yeter.
const Kitap: React.FC<PropCiz> = (o) => {
  const t = sayi(o.durum, "sayfa", 0);
  const bos = o.durum.bos !== false && o.durum.bos !== 0;
  const W = 250, H = 360;
  const kag = G(o, "#e2d6b8"), cil = G(o, "#4a2e22");
  const st = (c: string) => (o.golge ? {} : { stroke: ink(c), strokeWidth: 2.5 });
  const sx = W * Math.cos(t * Math.PI); // çevrilen sayfanın genişliği (sağdan sola)
  const satir = (x0: number, n: number) => !o.golge && Array.from({ length: n }).map((_, i) => <line key={i} x1={x0 + 26} y1={-H / 2 + 40 + i * 22} x2={x0 + W - 30} y2={-H / 2 + 40 + i * 22} stroke="#6a5e48" strokeWidth={2.4} opacity={0.55} />);
  const g = typeof o.durum.guve === "number" ? (o.durum.guve as number) : -1;
  const guve = !o.golge && g >= 0 ? <Guve g={g} x0={W * 0.5} y0={10} golge={o.golge} /> : null;
  return (
    <g>
      <rect x={-W - 14} y={-H / 2 - 12} width={2 * W + 28} height={H + 24} rx={8} fill={cil} {...st("#4a2e22")} />
      <rect x={-W} y={-H / 2} width={W} height={H} fill={kag} {...st("#e2d6b8")} />
      <rect x={0} y={-H / 2} width={W} height={H} fill={kag} {...st("#e2d6b8")} />
      {satir(-W, 14)}
      {!bos && satir(0, 14)}
      {!o.golge && <line x1={0} y1={-H / 2} x2={0} y2={H / 2} stroke="#8a7a5a" strokeWidth={3} />}
      {g < 0.1 && guve}
      {t > 0 && t < 1 && <polygon points={poly([[0, -H / 2], [sx, -H / 2 - 18 * Math.sin(t * Math.PI)], [sx, H / 2 - 10 * Math.sin(t * Math.PI)], [0, H / 2]])} fill={G(o, t < 0.5 ? "#ece2c8" : "#d8ccae")} {...st("#e2d6b8")} />}
      {g >= 0.1 && guve}
    </g>
  );
};

// Altın kesesi (deri, ağzı büzgülü)
const Kese: React.FC<PropCiz> = (o) => {
  const c = G(o, "#7a5a36");
  return (
    <g>
      <path d="M -70 0 Q -84 -60 -40 -86 L -22 -110 Q 0 -120 22 -110 L 40 -86 Q 84 -60 70 0 Q 0 14 -70 0 Z" fill={c} stroke={o.golge ? undefined : ink("#7a5a36")} strokeWidth={3} />
      {!o.golge && <><path d="M -30 -98 Q 0 -88 30 -98" stroke="#3a2a18" strokeWidth={4} fill="none" /><path d="M -50 -40 Q -30 -60 -10 -50" stroke="#a07a4c" strokeWidth={3} fill="none" opacity={0.7} /><circle cx={44} cy={-6} r={10} fill="#c9a24a" stroke="#7a5a1f" strokeWidth={2} /></>}
    </g>
  );
};

// Hokka + kaz tüyü
const Hokka: React.FC<PropCiz> = (o) => (
  <g>
    <path d="M -28 0 L -28 -30 Q 0 -40 28 -30 L 28 0 Q 0 10 -28 0 Z" fill={G(o, "#2a2a30")} />
    {!o.golge && <><ellipse cx={0} cy={-30} rx={28} ry={8} fill="#141418" /><path d="M 6 -30 L 60 -136 Q 72 -140 66 -124 Z" fill="#cfc6b0" stroke={ink("#cfc6b0")} strokeWidth={1.4} /></>}
  </g>
);

// Mum (pirinç şamdan) — alev `fl` ile titrer; ışık kaynağı şablonda aynı noktadan tanımlanır
export const MUM_ALEV_Y = -150;
const Mum: React.FC<PropCiz> = (o) => {
  const fl = o.fl ?? 1;
  return (
    <g>
      <ellipse cx={0} cy={0} rx={46} ry={12} fill={G(o, "#9a7a3a")} />
      <rect x={-8} y={-30} width={16} height={30} fill={G(o, "#b08a40")} />
      <rect x={-14} y={-120} width={28} height={92} fill={G(o, "#d6ccb0")} />
      {!o.golge && <><path d="M 0 -120 L 0 -128" stroke="#1c1915" strokeWidth={2} /><ellipse cx={0} cy={-142} rx={7 * fl} ry={16 * fl} fill="#ffcf70" /><ellipse cx={0} cy={-138} rx={3} ry={7} fill="#fff4d0" /></>}
    </g>
  );
};

// Tours feneri (teneke + cam, mekanlar.md P01). Orijin = taban; alev yerel y −133.
export const FENER_ALEV_Y = -133;
const Fener: React.FC<PropCiz> = (o) => {
  const fl = o.fl ?? 1, tin = "#5a5a60";
  if (o.golge) return <rect x={-66} y={-300} width={132} height={300} fill={o.golgeRenk ?? "#14110d"} />;
  return (
    <g>
      <rect x={-66} y={-44} width={132} height={44} fill="#4e4e54" stroke={ink(tin)} strokeWidth={2.5} />
      <rect x={-58} y={-240} width={116} height={196} fill="#ffd98f" opacity={0.85} />
      <rect x={-10} y={-116} width={20} height={72} fill="#efe6cf" />
      <ellipse cx={0} cy={-133} rx={8 * fl} ry={17 * fl} fill="#fff4d0" />
      {[-58, -19, 19, 58].map((dx) => <rect key={dx} x={dx - 4} y={-242} width={8} height={200} fill={tin} stroke={ink(tin)} strokeWidth={1.5} />)}
      <rect x={-66} y={-252} width={132} height={14} fill={tin} stroke={ink(tin)} strokeWidth={2} />
      <polygon points={poly([[-62, -252], [62, -252], [20, -304], [-20, -304]])} fill="#4e4e54" stroke={ink(tin)} strokeWidth={2} />
      <path d="M -18 -316 Q 0 -356 18 -316" stroke="#3a3a40" strokeWidth={6} fill="none" />
    </g>
  );
};

// K4: kapanırken masa gölgesi açık kâğıdın altından kapalı paketin ölçüsüne daralır (kapalı pakette taşan koyu kutu kalmaz)
const paketGolge = (o: PropCiz) => { const k = Math.min(1, sayi(o.durum, "kapan", 0)); const w = 140 - 26 * k, h = 170 - 24 * k; return <rect x={-w} y={-h} width={2 * w} height={2 * h} fill={o.golgeRenk} opacity={0.5} />; };
const Paket: React.FC<PropCiz> = (o) => o.golge ? paketGolge(o) : <PaketKagidi x={0} y={0} acik={sayi(o.durum, "acik", 1)} ipCozuk={o.durum.ipCozuk !== false} kabarti={sayi(o.durum, "kabarti", 0)} etiket={o.durum.etiket !== false} seed={o.seed} />;
const EldivenP: React.FC<PropCiz> = (o) => <Eldiven elBoyu={sayi(o.durum, "elBoyu", 266)} golge={o.golge} golgeRenk={o.golgeRenk} />;

// Evliya prop'ları (fisek-demet, mesale, baslik, kanat) ışık/karakter bağlamı ister: yalnız SARAYBURNU şablonu çizer (props/evliya). Başka şablonda açık hata.
const YalnizSarayburnu = (tur: string): React.FC<PropCiz> => () => { throw new Error(`[kit] prop "${tur}" yalnız SARAYBURNU şablonunda çizilir`); };
export const PROPLAR: Record<PropTur, React.FC<PropCiz>> = { paket: Paket, eldiven: EldivenP, corap: Corap, dosya: Dosya, kitap: Kitap, kese: Kese, hokka: Hokka, mum: Mum, fener: Fener,
  "fisek-demet": YalnizSarayburnu("fisek-demet"), mesale: YalnizSarayburnu("mesale"), baslik: YalnizSarayburnu("baslik"), kanat: YalnizSarayburnu("kanat"), sikke: YalnizSarayburnu("sikke"), "pencere-kanat": YalnizSarayburnu("pencere-kanat") };

// Prop'un p anındaki durum değerleri (dizi → kare ile anahtarlanır)
export const propDurum = (pr: Prop, p: number): PropCiz["durum"] => {
  const d: PropCiz["durum"] = {};
  for (const [k, v] of Object.entries(pr.durum ?? {})) d[k] = typeof v === "number" || Array.isArray(v) ? deger(v as number | number[], pr.kare, p) : v;
  return d;
};
