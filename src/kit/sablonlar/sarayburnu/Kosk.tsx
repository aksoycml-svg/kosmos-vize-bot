// ===== SARAYBURNU `kosk` görünümü — P02 (gece) / P10 (gün), AYNI dekor ve kadraj (mekanlar.md §1.3, K3) =====
// Kamera denizde, ≈235°'ye bakar; göz deniz seviyesinden 1.5 m (ufuk y 1372, kara ufku kapatır). Köşk cephesi 85 px/m, cumba 92 px/m.
// Dekor px doğrudan mekanlar §1.3 katman tablosundan (köşk gövdesi x 160–1100, eksen 630; cumba/kemerler/çeşme ekseni 560 — tablo bu
// asimetriyi veriyor, olduğu gibi uygulandı). Kontrplonje: örtü yüzeyi GÖRÜNMEZ, yalnız saçak altı; 4 küt baca saçağın arkasından çıkar.
// §1.1a yasak benzerlikler: kubbe/minare yok (örtü görünmez, bacalar küt + düz başlık, hiçbiri gövdenin %20'sinden fazla yükselmez),
// mazgal yok, sivri tepe yok. Kitabe/çini/kafes/cam/arma yok (nötr).
// Işık: gece anahtar = cumba orta (padişah) penceresi içten (hale YOK, yalnız pencere altına 2 basamaklı havuz §1.2a); şenlik ikincil
// (gök α .12 + cephe α .10, 6 kare, gölge vermez). Gün: önden güneş (gölge vektörü (−0.97, −0.15)), kemer içi + saçak altı taramalı koyu.
// Sol uç (P02): uzak kıyıda (30 px/m) küçük grup + demet + meşale = P03 kurulumu; meşale kendi küçük havuzunu ve su kolonunu düşürür.
import React from "react";
import { interpolate } from "remotion";
import { Golge, Isik } from "../../../doku/Isik";
import type { KilitNokta } from "../../../doku/GuvenliAlan";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { kemerEgri } from "../../../doku/Kemer";
import { RenkKaydi, Tarama, taramaAcisi } from "../../../doku/Tarama";
import { DOKU_SEED, ink, karistir, P, poly, rnd, tonla } from "../../../doku/sabitler";
import { Kukla } from "../../../rig/Kukla";
import { kuklaIsigi } from "../../../rig/RigIsik";
import { AYAK_TABAN, elDunya, govdeDunya, kolIK } from "../../../rig/kinematik";
import { SenlikFisegi, senlikCizgileri, SenlikTanim } from "../../../components/GravurEfekt";
import { demetOturak, demetOturakKenar, demetTutamak, FisekDemet, KanatCiz, kanatGeo, Mesale, mesaleAlev } from "../../props/evliya";
import { PadisahSiluet, PADISAH_BUST_M } from "../../props/padisah";
import { karakterBul } from "../../karakterler";
import { karakterPoz } from "../../jestler";
import type { Plan, Prop } from "../../tipler";
import { cl, deger, ekranNokta, GIRIS, kameraHesapla, katDonusum } from "../../zaman";
import { param } from "../../ortak";
import { BOY_OLCEK, REF_PXM, RIG_BIRIM_M } from "./geo";
import { YansimaKolonu } from "./KiyiDekor";
import { OTURAN } from "./Kiyi";

const S = DOKU_SEED.sarayburnu + 600;
type Saat = "gece" | "gun";
// mekanlar §1.3 katman tablosu (dekor px)
export const KG = {
  su: 1500, rihtimUst: 1415, rihtimSerit: 1408, altyapiUst: 990, kornis: 565, sacakAlt: 585, sacakX: [109, 1151] as [number, number],
  govdeX: [160, 1100] as [number, number],
  bacaOn: [[211, 279], [981, 1049]] as [number, number][], bacaArka: [[281, 343], [917, 979]] as [number, number][], bacaTepeOn: 429, bacaTepeArka: 445, baslik: [102, 13] as [number, number],
  kemer: [[268, 506], [614, 852]] as [number, number][], kemerUc: 1075, uzengi: 1223,
  cesme: { x: [526, 594] as [number, number], uc: 1244, alt: 1372, yalak: [1372, 1385] as [number, number] },
  anaPen: [[200, 285], [975, 1060]] as [number, number][], anaPenY: [760, 896] as [number, number],
  cumba: { x: [320, 800] as [number, number], ust: 650, soffit: 620, sacakDis: 612, alt: 990, sacakX: [210, 910] as [number, number], pen: [[368, 453], [518, 603], [668, 753]] as [number, number][], penY: [700, 819] as [number, number], pxm: 92 },
  pxm: 85, solKiyi: { x: [-200, 160] as [number, number], surUst: 1180, rihtimUst: 1387, su: 1417, pxm: 30 },
};
const RENK = {
  gece: { gok: ["#12141c", "#1c2232", "#2c3246"], agac: ["#181c26", "#1e2230"], sur: "#2e2e34", surKoyu: "#24242a", cephe: "#4e4a46", cepheGolge: "#3c3936", sira: "#3a3734", kemerIc: "#1e1c22", sacak: "#2a2830", soffit: "#2a2830", pencere: "#2a2830", cumba: "#3a2a1e", cumbaKoyu: "#2a1e16", cumbaDikme: "#46342a", baca: "#46423e", rihtim: "#55545a", rihtimOn: "#45444a", deniz: "#161c26", dalga: "#2c3444", isik: "#f2c070", isikKenar: "#ffd890", yalak: "#5a5650", solSur: "#2e2e34", solRihtim: "#45444a" },
  gun: { gok: ["#a9b6bf", "#cfcfc4", "#e6dcc0"], agac: ["#6e7468", "#7e8478"], sur: "#8e8472", surKoyu: "#6a6252", cephe: "#b4a88e", cepheGolge: "#7e7462", sira: "#9a8e76", kemerIc: "#3a3430", sacak: "#3a2a1e", soffit: "#7e7462", pencere: "#3a3430", cumba: "#6a4a30", cumbaKoyu: "#3a2a1e", cumbaDikme: "#7a5a3e", baca: "#a89c84", rihtim: "#a09682", rihtimOn: "#8e8472", deniz: "#5e7378", dalga: "#7c9090", isik: "#3a3430", isikKenar: "#3a3430", yalak: "#c0b49a", solSur: "#8e8472", solRihtim: "#a09682" },
} as const;

const kemerYol = (x0: number, x1: number, uc: number, uzengi: number, taban: number, n = 20): P[] => {
  const W = x1 - x0, H = taban - uc, e = kemerEgri("osmanli", W, H, uzengi - uc);
  const pts: P[] = [[x0, taban]];
  for (let i = 0; i <= n; i++) { const u = i / n; pts.push([x0 + u * W, taban - e(u)]); }
  pts.push([x1, taban]);
  return pts;
};

type SolGrupParam = { x?: [number, number]; ayak_y?: number };
type PadisahParam = { renk?: string; kenar_isik?: string; bas_aci?: number | { kare: number[]; deger: number[] } };
type KoskKonumParam = { pencere_x?: [number, number]; pencere_y?: [number, number] };

// ---------------- dekor (gece/gün ortak geometri) ----------------
const KoskDekor: React.FC<{ saat: Saat; p: number; isik: Isik; padisah: React.ReactNode; pencereIsik: boolean; senlikArka: React.ReactNode; parlama: number; grup: React.ReactNode }> = ({ saat, p, isik, padisah, pencereIsik, senlikArka, parlama, grup }) => {
  const R = RENK[saat], gun = saat === "gun";
  // önden güneşte ışığın ekran yönü dejenere (taramaAcisi ≈ dik çizgi → kemerde parmaklık/kafes okunur, §0.5 yasak): sahne θ = 60°
  const aci = isik.tip === "yonlu" && Math.abs(isik.yon[1]) < 0.3 && Math.abs(isik.yon[0]) > 0.8 ? 60 : taramaAcisi(isik);
  const K = 4; // orta sınıf kontur (dekor px)
  const kn = (c: string, w = K) => ({ stroke: ink(c), strokeWidth: w, strokeLinejoin: "round" as const });
  // ağaç kütlesi: yuvarlak tepeler, 2 ton (servi/bina yok) — saçak üstü bacalar arası + sol uç sur arkası
  const agac = (x0: number, x1: number, y0: number, y1: number, key: string) => {
    const n = Math.max(3, Math.round((x1 - x0) / 70));
    const kume = Array.from({ length: n }).map((_, i) => {
      const cx = x0 + ((i + 0.5) * (x1 - x0)) / n + (rnd(S, `${key}x${i}`) - 0.5) * 30, r = 34 + rnd(S, `${key}r${i}`) * 30;
      const tepe = y0 + rnd(S, `${key}y${i}`) * (y1 - y0) * 0.45;
      return { cx, r, tepe };
    });
    return <g key={key}>
      {/* gövde kütleleri: her ağaç 3 yuvarlak (tepe + iki yan), tabanı aşağıda gizli; ışık yanı tek açık ton */}
      {kume.map((q, i) => <g key={i}>
        <ellipse cx={q.cx} cy={q.tepe + q.r * 1.9} rx={q.r * 1.15} ry={q.r * 1.3} fill={R.agac[0]} />
        <ellipse cx={q.cx - q.r * 0.55} cy={q.tepe + q.r * 1.15} rx={q.r * 0.75} ry={q.r * 0.7} fill={R.agac[0]} />
        <ellipse cx={q.cx + q.r * 0.35} cy={q.tepe + q.r * 0.75} rx={q.r * 0.8} ry={q.r * 0.75} fill={R.agac[0]} />
        <ellipse cx={q.cx + q.r * 0.5} cy={q.tepe + q.r * 0.7} rx={q.r * 0.45} ry={q.r * 0.42} fill={R.agac[1]} />
      </g>)}
      <rect x={x0 - 40} y={y1} width={x1 - x0 + 80} height={260} fill={R.agac[0]} />
    </g>;
  };
  // gök: 3 düz basamak (gradyan yok)
  const gok = <g>
    <rect x={-800} y={-1200} width={2700} height={1380} fill={R.gok[0]} />
    <rect x={-800} y={180} width={2700} height={290} fill={R.gok[1]} />
    <rect x={-800} y={470} width={2700} height={760} fill={R.gok[2]} />
  </g>;
  // kesme taş sıra çizgileri (orta sınıf: yalnız ana sıralar, 0.5 m); gece α düşük (düz iki ton), gün belirgin
  const sira = (x0: number, x1: number, y0: number, y1: number, adim: number, key: string) => {
    const out: React.ReactNode[] = [];
    for (let y = y1 - adim, i = 0; y > y0 + 4; y -= adim, i++) out.push(<line key={`${key}${i}`} x1={x0} y1={y} x2={x1} y2={y} stroke={R.sira} strokeWidth={2} strokeOpacity={gun ? 0.75 : 0.55} />);
    return out;
  };
  const kemerler = KG.kemer.map(([a, b]) => kemerYol(a, b, KG.kemerUc, KG.uzengi, KG.rihtimUst));
  const kemerAlin = KG.kemer.map(([a, b]) => kemerYol(a - 21, b + 21, KG.kemerUc - 21, KG.uzengi, KG.uzengi + 0.1));
  const cesme = kemerYol(KG.cesme.x[0], KG.cesme.x[1], KG.cesme.uc, KG.cesme.uc + 0.62 * (KG.cesme.x[1] - KG.cesme.x[0]) * 0.68, KG.cesme.alt, 14);
  const C = KG.cumba;
  const baca = (xr: [number, number], tepe: number, arka: boolean, key: string) => {
    const [bw, bh] = arka ? [KG.baslik[0] * 0.9, KG.baslik[1] * 0.9] : KG.baslik, cx = (xr[0] + xr[1]) / 2, w = xr[1] - xr[0];
    const c = arka ? karistir(R.baca, R.kemerIc, 0.22) : R.baca;
    const govde: P[] = [[xr[0], tepe + bh], [xr[1], tepe + bh], [xr[1], KG.kornis + 4], [xr[0], KG.kornis + 4]];
    const golgeYuz: P[] = [[xr[0], tepe + bh], [xr[0] + w * 0.3, tepe + bh], [xr[0] + w * 0.3, KG.kornis + 4], [xr[0], KG.kornis + 4]];
    return <g key={key}>
      <polygon points={poly(govde)} fill={c} {...kn(c, 3)} />
      {/* gölge yüzü solda (gün: II; gece: ton) */}
      <polygon points={poly(golgeYuz)} fill={tonla(c, -0.18)} />
      {gun && <Tarama sekil={golgeYuz} basamak="II" aci={aci} renk={ink(c)} derinlik="orta" seed={S + w + tepe} />}
      <line x1={xr[0]} y1={(tepe + bh + KG.kornis) / 2} x2={xr[1]} y2={(tepe + bh + KG.kornis) / 2} stroke={ink(c)} strokeWidth={2} strokeOpacity={0.7} />
      {/* düz taş başlık plakası (piramit/külah/bilezik YOK) + gövdeye düşen 4 px gölge bandı */}
      <rect x={xr[0]} y={tepe + bh} width={w} height={4} fill={tonla(c, -0.3)} />
      <rect x={cx - bw / 2} y={tepe} width={bw} height={bh} fill={c} {...kn(c, 3)} />
    </g>;
  };
  return (
    <g>
      {gok}
      {/* şenlik (köşk ve ağaçların ARKASINDA; düşen çizgiler saçak/ağaç arkasına iner) + gök parlaması */}
      {senlikArka}
      {parlama > 0 && <rect x={-800} y={-1200} width={2700} height={2430} fill="#e8d6a0" opacity={0.12 * parlama} />}
      <KonturTitreme derinlik="orta" seed={S}>
        {agac(-300, 330, 420, 560, "a1")}{agac(900, 1450, 430, 560, "a2")}{agac(-300, 175, 860, 1010, "a3")}
        {/* sol uç: uzak kıyı (30 px/m) — sur + rıhtım ön yüzü; grup rıhtımda */}
        <polygon points={poly([[-260, KG.solKiyi.surUst + 6], [KG.solKiyi.x[1], KG.solKiyi.surUst - 4], [KG.solKiyi.x[1], KG.solKiyi.rihtimUst], [-260, KG.solKiyi.rihtimUst]])} fill={R.solSur} {...kn(R.solSur, 2.5)} />
        {[1220, 1262, 1304, 1346].map((y, i) => <line key={i} x1={-260} y1={y + 2} x2={KG.solKiyi.x[1]} y2={y} stroke={ink(R.solSur)} strokeWidth={1.6} strokeOpacity={0.45} />)}
        <rect x={-260} y={KG.solKiyi.rihtimUst} width={KG.solKiyi.x[1] + 260} height={KG.solKiyi.su - KG.solKiyi.rihtimUst} fill={R.solRihtim} {...kn(R.solRihtim, 2)} />
        <rect x={-260} y={KG.solKiyi.rihtimUst - 4} width={KG.solKiyi.x[1] + 260} height={5} fill={tonla(R.solRihtim, 0.15)} />
        {grup}
        {/* sağ: sur köşk düzleminde devam eder (altyapı üst hizası, 990), suya iner */}
        <polygon points={poly([[KG.govdeX[1], KG.altyapiUst], [1500, KG.altyapiUst + 20], [1500, KG.su + 4], [KG.govdeX[1], KG.su + 4]])} fill={R.sur} {...kn(R.sur, 3)} />
        {sira(KG.govdeX[1], 1500, KG.altyapiUst, KG.su, 48, "ss")}
        {/* bacalar (arka çift önce): saçağın arkasından çıkar */}
        {KG.bacaArka.map((xr, i) => baca(xr, KG.bacaTepeArka, true, `ba${i}`))}
        {KG.bacaOn.map((xr, i) => baca(xr, KG.bacaTepeOn, false, `bo${i}`))}
        {/* gövde: ana kat + altyapı (kesme taş, düz) */}
        <rect x={KG.govdeX[0]} y={KG.kornis} width={KG.govdeX[1] - KG.govdeX[0]} height={KG.rihtimUst - KG.kornis} fill={R.cephe} {...kn(R.cephe)} />
        {sira(KG.govdeX[0], KG.govdeX[1], KG.kornis, KG.altyapiUst, 42.5, "s1")}
        {sira(KG.govdeX[0], KG.govdeX[1], KG.altyapiUst, KG.rihtimUst, 42.5, "s2")}
        {/* altyapı üst hizası: kat silmesi (tek koyu çizgi + ışık yanı açık) */}
        <rect x={KG.govdeX[0] - 6} y={KG.altyapiUst - 6} width={KG.govdeX[1] - KG.govdeX[0] + 12} height={12} fill={tonla(R.cephe, gun ? 0.06 : 0.04)} {...kn(R.cephe, 3)} />
        {/* gün: ana saçak gölge bandı ana katın üstüne (0.6 m taşma × tan15 ≈ 14 px) */}
        {gun && <rect x={KG.govdeX[0]} y={KG.sacakAlt} width={KG.govdeX[1] - KG.govdeX[0]} height={14} fill={R.cepheGolge} opacity={0.75} />}
        {/* ana kat pencereleri (cumba dışında kalan; içi koyu, söve 0.1 m) */}
        {KG.anaPen.map(([a, b], i) => <g key={`ap${i}`}>
          <rect x={a - 8} y={KG.anaPenY[0] - 8} width={b - a + 16} height={KG.anaPenY[1] - KG.anaPenY[0] + 16} fill={tonla(R.cephe, 0.05)} {...kn(R.cephe, 2.5)} />
          <rect x={a} y={KG.anaPenY[0]} width={b - a} height={KG.anaPenY[1] - KG.anaPenY[0]} fill={R.pencere} />
          {gun && <Tarama sekil={[[a, KG.anaPenY[0]], [b, KG.anaPenY[0]], [b, KG.anaPenY[0] + 26], [a, KG.anaPenY[0] + 26]]} basamak="II" aci={aci} renk={ink(R.pencere)} derinlik="orta" seed={S + 70 + i} />}
        </g>)}
        {/* çifte kemer (osmanli, iki merkezli basık-sivri) + kemer alnı çizgisi + çeşme nişi + yalak */}
        {kemerAlin.map((pts, i) => <polyline key={`al${i}`} points={poly(pts.slice(1, -1))} fill="none" stroke={ink(R.cephe)} strokeWidth={2.5} strokeOpacity={0.6} />)}
        {kemerler.map((pts, i) => <g key={`k${i}`}>
          <polygon points={poly(pts)} fill={R.kemerIc} {...kn(R.cephe)} />
          {gun && <Tarama sekil={pts} basamak="III" aci={aci} renk={ink(R.kemerIc)} derinlik="orta" seed={S + 10 + i} />}
          {/* kemer ağzında su: rıhtım hizasında koyu, içte kesik dalga (köşk suya basar) */}
          <line x1={pts[0][0] + 12} y1={KG.rihtimUst - 18} x2={pts[pts.length - 1][0] - 12} y2={KG.rihtimUst - 18} stroke={gun ? "#4e5e62" : "#2c3444"} strokeWidth={3} strokeDasharray="22 12" />
        </g>)}
        <polygon points={poly(cesme)} fill={R.kemerIc} {...kn(R.cephe, 3)} />
        {gun && <Tarama sekil={cesme} basamak="IV" aci={aci} renk={ink(R.kemerIc)} derinlik="orta" seed={S + 14} />}
        <rect x={KG.cesme.x[0] - 10} y={KG.cesme.yalak[0]} width={KG.cesme.x[1] - KG.cesme.x[0] + 20} height={KG.cesme.yalak[1] - KG.cesme.yalak[0]} fill={R.yalak} {...kn(R.yalak, 2.5)} />
        {/* ana saçak: boydan boya koyu bant (imza 2), saçak altı görünür (soffit, gün II tarama) */}
        <rect x={KG.sacakX[0]} y={KG.kornis - 9} width={KG.sacakX[1] - KG.sacakX[0]} height={9} fill={R.sacak} {...kn(R.sacak, 3)} />
        <polygon points={poly([[KG.sacakX[0], KG.kornis], [KG.sacakX[1], KG.kornis], [KG.govdeX[1], KG.sacakAlt], [KG.govdeX[0], KG.sacakAlt]])} fill={R.soffit} {...kn(R.soffit, 3)} />
        {gun && <Tarama sekil={[[KG.sacakX[0], KG.kornis], [KG.sacakX[1], KG.kornis], [KG.govdeX[1], KG.sacakAlt], [KG.govdeX[0], KG.sacakAlt]]} basamak="II" aci={aci} renk={ink(R.soffit)} derinlik="orta" seed={S + 20} />}
        {/* ---- cumba (92 px/m, ahşap) ---- */}
        <rect x={C.x[0]} y={C.ust} width={C.x[1] - C.x[0]} height={C.alt - C.ust} fill={R.cumba} {...kn(R.cumba)} />
        {gun && <rect x={C.x[0]} y={C.ust} width={C.x[1] - C.x[0]} height={37} fill={R.cumbaKoyu} opacity={0.7} />}
        {/* pencere ışığı (gece): denizlik altından basık yarım elips havuz, 2 düz basamak (hale yok) */}
        {pencereIsik && (() => { const [a, b] = C.pen[1], w = b - a, cx = (a + b) / 2; return <g>
          <path d={`M ${cx - 1.92 * w} ${C.penY[1]} A ${1.92 * w} ${60 * 1.6} 0 0 0 ${cx + 1.92 * w} ${C.penY[1]} Z`} fill={R.isik} opacity={0.08} />
          <path d={`M ${cx - 1.2 * w} ${C.penY[1]} A ${1.2 * w} 60 0 0 0 ${cx + 1.2 * w} ${C.penY[1]} Z`} fill={R.isik} opacity={0.2} />
        </g>; })()}
        {/* cumba pencereleri: yan ikisi koyu, orta = padişah penceresi (gece içten ışıklı) */}
        {C.pen.map(([a, b], i) => <g key={`cp${i}`}>
          {i === 1 && pencereIsik
            ? <><rect x={a} y={C.penY[0]} width={b - a} height={C.penY[1] - C.penY[0]} fill={R.isikKenar} /><rect x={a + 0.15 * (b - a)} y={C.penY[0] + 0.15 * (b - a)} width={0.7 * (b - a)} height={C.penY[1] - C.penY[0] - 0.3 * (b - a)} fill={R.isik} /></>
            : <rect x={a} y={C.penY[0]} width={b - a} height={C.penY[1] - C.penY[0]} fill={R.pencere} />}
          {i === 1 && padisah}
          {/* söve (0.1 m) + denizlik; gün: söve üst/sol gölge II */}
          <rect x={a - 9} y={C.penY[0] - 9} width={b - a + 18} height={C.penY[1] - C.penY[0] + 18} fill="none" stroke={R.cumbaDikme} strokeWidth={9} />
          <rect x={a - 9} y={C.penY[0] - 9} width={b - a + 18} height={C.penY[1] - C.penY[0] + 18} fill="none" {...kn(R.cumbaDikme, 2.5)} />
          <rect x={a - 14} y={C.penY[1] + 2} width={b - a + 28} height={9} fill={R.cumbaDikme} {...kn(R.cumbaDikme, 2.5)} />
        </g>)}
        {/* tahta kaplama: dikey tahtalar (0.18 m ≈ 17 px), pencere dışında; yakın planda (P10 cs 2.4) doku okunur */}
        {Array.from({ length: 28 }).map((_, i) => { const x = C.x[0] + 17 * (i + 1); if (x >= C.x[1] - 4) return null; const icinde = C.pen.some(([a, b]) => x > a - 10 && x < b + 10); return <line key={`th${i}`} x1={x} y1={icinde ? C.penY[1] + 11 : C.ust + 2} x2={x} y2={C.alt - 26} stroke={ink(R.cumba)} strokeWidth={1.4} strokeOpacity={0.35} />; })}
        {C.pen.map(([a, b], i) => [a, b].map((x0, j) => Array.from({ length: 2 }).map((_, m) => { const x = j ? b + 9 + 17 * (m + 1) : a - 9 - 17 * (m + 1); return <line key={`tp${i}${j}${m}`} x1={x} y1={C.ust + 2} x2={x} y2={C.penY[1] + 11} stroke={ink(R.cumba)} strokeWidth={1.4} strokeOpacity={0.35} />; })))}
        {/* dikmeler (pencere araları, 2 tahta) + alt taşıyıcı kiriş (tek kalın, süssüz) */}
        {[C.x[0] + 6, 486, 636, C.x[1] - 6].map((x, i) => <line key={`dk${i}`} x1={x} y1={C.ust + 8} x2={x} y2={C.alt - 24} stroke={ink(R.cumba)} strokeWidth={3} strokeOpacity={0.7} />)}
        <rect x={C.x[0] - 10} y={C.alt - 24} width={C.x[1] - C.x[0] + 20} height={24} fill={R.cumbaKoyu} {...kn(R.cumbaKoyu, 3)} />
        {/* cumba saçağı: dış kenar + görünen saçak altı (soffit, gün II) */}
        <polygon points={poly([[C.sacakX[0], C.soffit], [C.sacakX[1], C.soffit], [C.x[1], C.ust], [C.x[0], C.ust]])} fill={R.soffit} {...kn(R.soffit, 3)} />
        {gun && <Tarama sekil={[[C.sacakX[0], C.soffit], [C.sacakX[1], C.soffit], [C.x[1], C.ust], [C.x[0], C.ust]]} basamak="II" aci={aci} renk={ink(R.soffit)} derinlik="orta" seed={S + 21} />}
        <rect x={C.sacakX[0]} y={C.sacakDis} width={C.sacakX[1] - C.sacakX[0]} height={C.soffit - C.sacakDis} fill={R.sacak} {...kn(R.sacak, 3)} />
        {/* köşk önü rıhtım: üst ince şerit (kamera 0.5 m yukarıda) + ön yüz tek taş sırası */}
        <rect x={KG.govdeX[0]} y={KG.rihtimSerit} width={KG.govdeX[1] - KG.govdeX[0]} height={KG.rihtimUst - KG.rihtimSerit} fill={tonla(R.rihtim, 0.12)} />
        <rect x={KG.govdeX[0]} y={KG.rihtimUst} width={KG.govdeX[1] - KG.govdeX[0]} height={KG.su - KG.rihtimUst} fill={R.rihtimOn} {...kn(R.rihtimOn, 3)} />
        <line x1={KG.govdeX[0]} y1={1457} x2={KG.govdeX[1]} y2={1457} stroke={ink(R.rihtimOn)} strokeWidth={2} strokeOpacity={0.6} />
        {Array.from({ length: 12 }).map((_, i) => { const x = KG.govdeX[0] + 40 + i * 77 + (i % 2) * 30; return x < KG.govdeX[1] - 10 ? <line key={`rd${i}`} x1={x} y1={i % 2 ? KG.rihtimUst : 1457} x2={x} y2={i % 2 ? 1457 : KG.su} stroke={ink(R.rihtimOn)} strokeWidth={2} strokeOpacity={0.55} /> : null; })}
      </KonturTitreme>
      {/* şenlik anında cephe 6 kare α .10 parlar (gölge vermez) */}
      {parlama > 0 && <rect x={KG.sacakX[0]} y={KG.bacaTepeOn} width={KG.sacakX[1] - KG.sacakX[0]} height={KG.su - KG.bacaTepeOn} fill="#e8d6a0" opacity={0.1 * parlama} style={{ mixBlendMode: "screen" }} />}
      {void p}
    </g>
  );
};

// deniz (alt üçte bir): düz taban + dalga çizgileri (aralık 12 → 44 px), gün: köşkün ters yansıması (düz kütle, 3 yatay kesik)
const KoskDeniz: React.FC<{ saat: Saat; p: number }> = ({ saat, p }) => {
  const R = RENK[saat];
  const cizgi: React.ReactNode[] = [];
  let y = KG.solKiyi.su + 6, i = 0;
  while (y < 2300 && i < 120) {
    const t = Math.min(1, (y - 1417) / 600), ara = 12 + 32 * t;
    const n = 6 + Math.round(rnd(S, `n${i}`) * 4);
    for (let j = 0; j < n; j++) { const x0 = -300 + rnd(S, `x${i}${j}`) * 1700 + Math.sin(p * 0.02 + i) * 3, L = (24 + rnd(S, `l${i}${j}`) * 46) * (0.6 + 0.8 * t); cizgi.push(<line key={`${i}-${j}`} x1={x0} y1={y} x2={x0 + L} y2={y} stroke={R.dalga} strokeWidth={2 + 1.5 * t} strokeLinecap="round" />); }
    y += ara; i++;
  }
  // gün yansıması (mekanlar §1.3a, K3 V8): YALNIZ koyu kütleler (kemer ağızları, çeşme nişi, cumba gövdesi + kirişi, saçak bantları) ters
  // ve 0.6 boyda; açık taş cephe yansımaz (su tonu kalır). 7 yatay dilim (22→40 px, aralarında 4–8 px su), dilim başına ±6–14 px kayma
  // (seed 135, işaret dilim dilim değişir), düz yatay kesik. α: dilim 1–5 .58, 6 .30, 7 .15 (iki düz basamak, gradyan yok); sonra yalnız su.
  const yans = saat === "gun" ? (() => {
    const C = KG.cumba;
    const ayna = `translate(0,${KG.su}) scale(1,-0.6) translate(0,${-KG.su})`;
    const kutle = <g transform={ayna}>
      {KG.kemer.map(([a, b], k) => <polygon key={`k${k}`} points={poly(kemerYol(a, b, KG.kemerUc, KG.uzengi, KG.rihtimUst))} fill="#3e4446" />)}
      <polygon points={poly(kemerYol(KG.cesme.x[0], KG.cesme.x[1], KG.cesme.uc, KG.cesme.uc + 0.62 * (KG.cesme.x[1] - KG.cesme.x[0]) * 0.68, KG.cesme.alt, 14))} fill="#3e4446" />
      <rect x={C.x[0] - 10} y={C.ust} width={C.x[1] - C.x[0] + 20} height={C.alt - C.ust} fill="#4e4438" />
      <rect x={C.sacakX[0]} y={C.sacakDis} width={C.sacakX[1] - C.sacakX[0]} height={C.ust - C.sacakDis} fill="#4a4440" />
      <rect x={KG.sacakX[0]} y={KG.kornis - 9} width={KG.sacakX[1] - KG.sacakX[0]} height={KG.sacakAlt - KG.kornis + 9} fill="#4a4440" />
    </g>;
    const boy = [22, 26, 30, 33, 36, 38, 40], ara = [5, 4, 6, 5, 7, 8], alfa = [0.58, 0.58, 0.56, 0.58, 0.56, 0.3, 0.15];
    let y0 = KG.su + 2;
    return <g>{boy.map((h, i) => {
      const ya = y0; y0 += h + (ara[i] ?? 0);
      const dx = (i % 2 ? 1 : -1) * (6 + rnd(135, `yd${i}`) * 8);
      const id = `kyd${i}`;
      return <g key={i}>
        <defs><clipPath id={id}><rect x={-800} y={ya} width={2700} height={h} /></clipPath></defs>
        <g clipPath={`url(#${id})`} opacity={alfa[i]}><g transform={`translate(${dx},0)`}>{kutle}</g></g>
      </g>;
    })}</g>;
  })() : null;
  return <g>
    <rect x={-800} y={KG.solKiyi.su} width={2700} height={1200} fill={R.deniz} />
    {yans}
    {cizgi}
  </g>;
};

export const KoskSahne: React.FC<{ plan: Plan; p: number; kilit: KilitNokta[] }> = ({ plan, p, kilit }) => {
  const saat = (param<string>(plan, "saat", "gece") === "gun" ? "gun" : "gece") as Saat;
  const gece = saat === "gece";
  const k = kameraHesapla(plan.kamera, p);
  const pencereIsik = param<boolean>(plan, "pencere_isigi", gece);
  const kk = param<KoskKonumParam>(plan, "kosk_konum", {});
  const pen = { x: kk.pencere_x ?? KG.cumba.pen[1], y: kk.pencere_y ?? KG.cumba.penY };
  if (Math.abs(pen.x[0] - KG.cumba.pen[1][0]) > 2 || Math.abs(pen.y[1] - KG.cumba.penY[1]) > 2) console.warn(`[kosk] ${plan.id}: kosk_konum.pencere mekanlar §1.3 tablosundan farklı (${pen.x}/${pen.y})`);

  // ---- tek ışık ----
  const isik: Isik = gece
    ? { tip: "nokta", ad: "cumba orta penceresi (içten)", zemin: [(pen.x[0] + pen.x[1]) / 2, KG.rihtimUst], yukseklik: KG.rihtimUst - pen.y[1], renk: "#f2c070" }
    : { tip: "yonlu", ad: "güneş (ENE, kameranın arkasında 10° sağ)", yon: [-0.97, -0.15], renk: "#f6e8c0" };

  // ---- padişah (R10) ----
  const pc = (plan.karakterler ?? []).find((c) => c.kim === "padisah");
  const pp = param<PadisahParam>(plan, "padisah", {});
  const basAci = (() => {
    const b = pp.bas_aci;
    if (typeof b === "number") return b;
    if (b && Array.isArray(b.kare) && b.kare.length > 1 && b.kare[1] > b.kare[0]) return interpolate(p, b.kare, b.deger, { ...cl, easing: GIRIS });
    const j = (pc?.jestler ?? []).find((q) => q.ad === "bak");
    return j && j.bit > j.bas ? interpolate(p, [j.bas, j.bit], [0, Math.abs(Number(j.ops?.x ?? 1))], { ...cl, easing: GIRIS }) : 0;
  })();
  const padX = typeof pc?.x === "number" ? pc.x : (pen.x[0] + pen.x[1]) / 2, padY = typeof pc?.y === "number" ? pc.y : pen.y[1];
  const padisah = pc ? <PadisahSiluet x={padX} y={padY} pxm={KG.cumba.pxm} basAci={basAci} renk={pp.renk ?? (gece ? "#1e1c22" : "#2a2622")} kenar={pp.kenar_isik ?? (gece ? "#f2c070" : "#f0d79a")} gece={gece} klip={[pen.x[0], pen.y[0], pen.x[1] - pen.x[0], pen.y[1] - pen.y[0]]} kenarPx={(gece ? 2.4 : 4.5) / k.cs} /> : null;
  if (pc) {
    kilit.push({ ad: "padisah yüz", p: ekranNokta(k, [padX, padY - 0.76 * KG.cumba.pxm]), tur: "yuz" });
    kilit.push({ ad: "padişah büst üstü", p: ekranNokta(k, [padX, padY - PADISAH_BUST_M * KG.cumba.pxm]), tur: "kurulum" });
  }
  kilit.push({ ad: "köşk penceresi", p: ekranNokta(k, [(pen.x[0] + pen.x[1]) / 2, pen.y[1]]), tur: "kurulum" });

  // ---- şenlik (E2) ----
  const senlik = param<(SenlikTanim & { katman?: string })[]>(plan, "senlik", []);
  const senlikEl = senlik.map((s, i) => <SenlikFisegi key={i} s={{ ...s, cikis_y: s.cikis_y ?? KG.kornis + 40 }} p={p} seed={S + 900 + i * 17} kalin={3} />);
  const parlama = Math.max(0, ...senlik.map((s) => (p >= s.patlama && p < s.patlama + 6 ? (p < s.patlama + 3 ? 1 : 0.5) : 0)));
  senlik.forEach((s, i) => { const c = senlikCizgileri(s, p, S + 900 + i * 17); if (c.cizgiler.length) kilit.push({ ad: `şenlik ${i + 1}`, p: ekranNokta(k, [s.x, s.y]), tur: "kurulum" }); });

  // ---- sol grup (P02, uzak kıyı 30 px/m): karakterler (padişah hariç) + demet + meşale ----
  const grupKar = (plan.karakterler ?? []).filter((c) => c.kim !== "padisah");
  const props = plan.props ?? [];
  const demetPr = props.find((q) => q.tur === "fisek-demet") as (Prop & { olcek?: number }) | undefined;
  const mesalePr = props.find((q) => q.tur === "mesale");
  const sg = param<SolGrupParam>(plan, "sol_grup", {});
  const grupPxm = REF_PXM * (typeof demetPr?.olcek === "number" ? demetPr.olcek : 0.075);
  const demetD = demetPr ? { x: deger(demetPr.x, demetPr.kare, p, 125), y: deger(demetPr.y, demetPr.kare, p, sg.ayak_y ?? KG.solKiyi.rihtimUst), pxm: grupPxm, aci: 0, titreme: 0, bos: 0, p } : null;
  const grupOrta = grupKar.length ? grupKar.reduce((a, c) => a + deger(c.x, c.kare, p, 125), 0) / grupKar.length : 125;
  type GK = { el: React.ReactNode; x: number; derinlik: number; mesale?: { tutamak: P; yon: P } };
  let mesaleIsik: Isik | null = null;
  const gk: GK[] = grupKar.map((c, i) => {
    const kayit = karakterBul(c.kim);
    const x = deger(c.x, c.kare, p, 125), y = deger(c.y, c.kare, p, KG.solKiyi.rihtimUst);
    const pxm = REF_PXM * deger(c.olcek, c.kare, p, 0.075);
    const s = (pxm / RIG_BIRIM_M) * (BOY_OLCEK[c.kim] ?? 1);
    const d = karakterPoz({ ...c, z: 0, u: 0, kare: undefined, jestler: [] }, p, { yer: () => ({ x, y, s }), faz: () => 0 });
    d.palet = { ...kayit.palet, ...(c.palet ?? {}) };
    const pz = d.pz;
    const kompars = c.kim.startsWith("yardimci");
    if (kompars) { pz.arka = true; pz.facing = (c.yon ?? (x <= grupOrta ? 1 : -1)) as 1 | -1; }
    const ik = (on: boolean, hedef: P) => { const r = kolIK(pz, hedef, on); if (on) { pz.shF = r.sh; pz.elF = r.el; } else { pz.shB = r.sh; pz.elB = r.el; } };
    // oturan + aynı yerde demet → demetin oturağına bağlı (tutun: ön el sicim bağında, arka el oturak kenarında; ayaklar dayamada)
    const bagli = c.poz === "oturan" && demetD && Math.abs(demetD.x - x) < 0.5 * pxm;
    if (bagli) {
      Object.assign(pz, OTURAN);
      const [ox, oy] = demetOturak(demetD!);
      pz.x = ox - 0.06 * pxm - 2 * s; pz.y = oy - (-226 + (pz.bodyY ?? 0) + 22) * s; pz.lean = 16;
      ik(true, demetTutamak(demetD!)); ik(false, demetOturakKenar(demetD!));
    } else { pz.x = x; pz.y = y + AYAK_TABAN * s; }
    pz.scale = s;
    let mes: GK["mesale"];
    if (kompars && mesalePr && i === grupKar.findIndex((q) => q.kim === "yardimci-1")) {
      // meşale yardımcı 1'in elinde: taşıma pozu (el önde-aşağıda, sopa dik + 20° ileri); json meşale başı erişilebilirse o yöne
      const omuz = govdeDunya(pz, [40, -380]), f = pz.facing ?? 1;
      const egim = (20 * Math.PI) / 180;
      ik(true, [omuz[0] + f * 0.3 * pxm, omuz[1] + 0.3 * pxm]);
      mes = { tutamak: elDunya(pz, true), yon: [f * Math.sin(egim), -Math.cos(egim)] };
    } else if (kompars) { ik(true, govdeDunya(pz, [52, -262])); ik(false, govdeDunya(pz, [46, -256])); }
    // katlı kanat (Lagâri, sırtta; tasarim §3.2 P01 A–P05)
    let arka: React.ReactNode;
    if (c.kim === "lagari") {
      const g = kanatGeo(0, pz.lean ?? 0, RIG_BIRIM_M, -400, bagli ? -214 : -122, -56);
      arka = <><KanatCiz pts={g.uzak} katli={1} isik={0.3} olcekEkran={s * k.cs} uzak kat={g.katli} /><KanatCiz pts={g.yakin} katli={1} isik={0.3} olcekEkran={s * k.cs} kat={g.katli} /></>;
    }
    const ayak: P = [x, y];
    kilit.push({ ad: `${c.kim} ayak`, p: ekranNokta(k, bagli ? [demetD!.x, demetD!.y] : ayak), tur: "ayak" });
    return { el: { pz, palet: d.palet, arka, ayak, s } as unknown as React.ReactNode, x, derinlik: y + (bagli ? 0.01 : 0) + i * 0.001, mesale: mes };
  });
  const mesaleci = gk.find((g) => g.mesale);
  if (mesaleci?.mesale) {
    const a = mesaleAlev(mesaleci.mesale.tutamak, mesaleci.mesale.yon, grupPxm);
    mesaleIsik = { tip: "nokta", ad: "meşale (uzak grup)", zemin: [a[0], KG.solKiyi.rihtimUst], yukseklik: Math.max(10, KG.solKiyi.rihtimUst - a[1]), renk: "#f0a848" };
  }
  const grupIsik: Isik = mesaleIsik ?? { tip: "nokta", ad: "varsayılan", zemin: [110, KG.solKiyi.rihtimUst], yukseklik: 40, renk: "#f0a848" };
  const grup = grupKar.length || demetD ? (
    <g>
      {mesaleIsik && mesaleIsik.tip === "nokta" && <g style={{ mixBlendMode: "screen" }}>
        {/* meşale halesi (mekanlar §1.3: r 60) — 2 düz basamak + rıhtıma küçük havuz */}
        <circle cx={mesaleIsik.zemin[0]} cy={mesaleIsik.zemin[1] - mesaleIsik.yukseklik} r={60} fill="#f0a848" opacity={0.1} />
        <circle cx={mesaleIsik.zemin[0]} cy={mesaleIsik.zemin[1] - mesaleIsik.yukseklik} r={34} fill="#f0a848" opacity={0.14} />
        <ellipse cx={mesaleIsik.zemin[0] + 14} cy={KG.solKiyi.rihtimUst + 1} rx={58} ry={9} fill="#f0a848" opacity={0.3} />
      </g>}
      {demetD && <FisekDemet d={demetD} isikX={grupIsik.tip === "nokta" ? grupIsik.zemin[0] : 0} seed={S + 9} />}
      {[...gk].sort((a, b) => a.derinlik - b.derinlik).map((g, i) => {
        const e = g.el as unknown as { pz: import("../../../rig/Kukla").Poz; palet: import("../../../rig/Kukla").Palet; arka: React.ReactNode; ayak: P; s: number };
        const ki = kuklaIsigi(grupIsik, e.ayak, 600 * e.s, { murekkep: "#1c2030", kamera: k.cs, seed: S + 300 + i * 11 });
        return <g key={i}>
          <Golge isik={grupIsik} ayak={e.ayak} h={600 * e.s * 0.9} genislik={100 * e.s} alfa={0.45} stil="gravur" seed={S + 40 + i} />
          <Kukla p={e.palet} pz={e.pz} golgesiz isik={ki} arka={e.arka} />
          {g.mesale && <Mesale tutamak={g.mesale.tutamak} yon={g.mesale.yon} pxm={grupPxm} p={p} seed={S + 77} ten={e.palet.skin} tenKoyu={e.palet.skinDark} />}
        </g>;
      })}
    </g>
  ) : null;
  if (demetD) kilit.push({ ad: "demet (uzak grup)", p: ekranNokta(k, [demetD.x, demetD.y]), tur: "kurulum" });

  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        <g transform={katDonusum(k, 1)}>
          <KoskDeniz saat={saat} p={p} />
          {/* yansıma kolonları: pencere (gece), meşale (uzak grup), şenlik (patlama x'inde, sönerken daralır) */}
          {gece && pencereIsik && <YansimaKolonu x={(pen.x[0] + pen.x[1]) / 2} y0={KG.su + 4} y1={1960} renk="#f2c070" alfa={0.5} gen={40} seed={S + 3} p={p} />}
          {mesaleIsik && mesaleIsik.tip === "nokta" && <YansimaKolonu x={mesaleIsik.zemin[0] + 6} y0={KG.solKiyi.su + 3} y1={1640} renk="#e0a050" alfa={0.45} gen={22} seed={S + 5} p={p} />}
          {senlik.map((s, i) => { const T = s.dusme_kare ?? 70, tau = p - s.patlama + 2; if (tau < 0 || tau > T) return null; const w = 1 - tau / T; return <YansimaKolonu key={`sy${i}`} x={s.x} y0={KG.su + 6} y1={1500 + 420 * w} renk="#e8d6a6" alfa={0.5 * w + 0.1} gen={20 + 60 * w} seed={S + 7 + i} p={p} />; })}
          <KoskDekor saat={saat} p={p} isik={isik} padisah={padisah} pencereIsik={gece && pencereIsik} senlikArka={<g>{senlikEl}</g>} parlama={parlama} grup={grup} />
        </g>
      </RenkKaydi>
    </svg>
  );
};
