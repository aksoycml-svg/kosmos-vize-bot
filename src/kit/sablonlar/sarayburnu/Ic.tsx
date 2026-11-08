// ===== SARAYBURNU `ic` görünümü — P12 köşk içi, gündüz (mekanlar.md §1.6 + R2, tasarim.md v1.5 §1.3 / §3.5 / §4.10 / E5; K4) =====
// Kamera pencere duvarına dik bakar; pencere duvarında 324 px/m, padişah (duvardan 0.4 m önde) 340 px/m. Dekor px doğrudan kart tablosundan:
// pencere açıklığı (görünen sol kanat) x 560–738, y 560–981, pervaz 26 px, denizlik 981–1000; orta kayıt 738; ikinci kanat (kapalı, gölgede)
// 752–916 kadraj kenarında; kapı x 60–352, y 602–1250 (lento düz, açık, ardı koyu #2a2420); zemin y ≥ 1250 (duvar dibi).
// Duvar sade kireç sıva, gölgede düz #3a3430. Kalem işi / çini / kafes / revzen / cam / arma / minder / halı YOK (nötr, tasarım §1.3).
// TEK IŞIK: güneş pencereden (yön (−0.83, +0.56), ENE sabah). Görünür her ışık bu tanımdan türetilir:
//   • yarık: etkin açıklık = 0.55 m · sin θ (R2; düzlem içi açıklık KULLANILMAZ) → yarık x [738 − w, 738], w = 178·sin θ
//   • havadaki sütun: yarığın ışık yönünde süpürülmüş paralelkenarı — YALNIZ iki ince kenar çizgisi (α .2) + toz zerreleri; dolgu α .05
//   • yüzeydeki şerit: padişah siluetinin ışığa bakan kenarından w genişliğinde, sütunun içinde kalan kısmı (S ∖ kaydır(S, −w) ∩ sütun)
//     → yüz/kaftan konturunda ten (#dca08a) / kaftan ışıklı bandı; θ 12°'de bandın üst kenarı x≈457'de göz hizasında (geometriden)
//   • kanadın serbest kenar kalınlığı (ışığa döndükçe aydınlanır), yarığın denizliği
// Kanat (KE-P9): sol pervazda menteşeli, odaya açılan ahşap kanat; perspektif (kamera merkezi (540,760), mesafe 6 m). Kapanış fiziği: el kanadın
// serbest kenarını iter (80°→64°), bırakır, kanat savrulup 12°'de mandala (orta kayıttaki demir tutucu) çarpar = "tok" (pencere-tok), 2 kare
// sekme, mandal oturur = "tık" (mandal-tik). Temas kareleri json temaslarından okunur; kanat çizimi aynı kareleri kullanır.
import React from "react";
import { interpolate } from "remotion";
import type { KilitNokta } from "../../../doku/GuvenliAlan";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { RenkKaydi, Tarama } from "../../../doku/Tarama";
import { DOKU_SEED, dortgen, ink, karistir, lerp, P, parca, poly, rnd, tonla } from "../../../doku/sabitler";
import { FIGUR_GOLGE, FIGUR_ISIK, FigurKol, figurGeo, kolIK2, PadisahFigur, basNoktalar, FIGUR_BUST_Y } from "../../props/padisah";
import { ElPoz, elGeometri, elNokta } from "../../props/evliyaEl";
import type { Plan, Prop } from "../../tipler";
import { cl, CIKIS, ekranNokta, GIRIS, INOUT, kameraHesapla, katDonusum } from "../../zaman";
import { param } from "../../ortak";

const S = DOKU_SEED.sarayburnu + 900;
export const IC = {
  pxm: 324, figPxm: 340,
  pen: { x: [560, 738] as [number, number], y: [560, 981] as [number, number] }, kayit: [738, 752] as [number, number], kanat2: [752, 916] as [number, number],
  pervaz: 26, denizlik: [981, 1000] as [number, number],
  kapi: { x: [60, 352] as [number, number], y: [602, 1250] as [number, number], pervaz: 39 },
  zemin: 1250, isik: [-0.83, 0.56] as P, merkez: [540, 760] as P, mesafe: 6 * 324,
};
const RENK = {
  duvar: "#3a3430", duvarIsik: "#cbbfa4", ahsap: "#6a4a30", ahsapGolge: "#3a2a1e", pervaz: "#4a3828", disari: "#ece2c4", ufuk: "#d2d4c6",
  kapiIc: "#2a2420", zemin: "#2e2824", denizlik: "#4e443a", demir: "#2e2a26", serit: "#f6e4b0",
};
// perspektif: duvar düzleminden odaya z px (324 px/m) çıkan nokta
const proj = (x: number, y: number, z: number): P => { const f = IC.mesafe / (IC.mesafe - z); return [IC.merkez[0] + (x - IC.merkez[0]) * f, IC.merkez[1] + (y - IC.merkez[1]) * f]; };
const KANAT_L = IC.pen.x[1] - IC.pen.x[0]; // 178 px = 0.55 m
const kanatNokta = (th: number, u: number, y: number, n = 0): P => { const r = (th * Math.PI) / 180; return proj(IC.pen.x[0] + KANAT_L * u * Math.cos(r) + n * Math.sin(r), y, KANAT_L * u * Math.sin(r) - n * Math.cos(r)); };

type PadisahIcParam = { yuz_on_kontur_x?: number; goz_y?: number; ayak_y?: number };

export const IcSahne: React.FC<{ plan: Plan; p: number; kilit: KilitNokta[] }> = ({ plan, p, kilit }) => {
  const k = kameraHesapla(plan.kamera, p);
  const uid = "ic" + React.useId().replace(/:/g, "");
  const pc = (plan.karakterler ?? []).find((c) => c.kim === "padisah");
  const pp = param<PadisahIcParam>(plan, "padisah", {});
  const jest = (ad: string) => (pc?.jestler ?? []).find((j) => j.ad === ad);
  const kanatPr = (plan.props ?? []).find((q) => q.tur === "pencere-kanat") as (Prop & { aci?: number[] }) | undefined;
  const temas = (ses: string) => (plan.temaslar ?? []).find((t) => t.ses === ses)?.kare;

  // ---- kanat açısı (fizik: it → bırak → savrul → mandala çarp → sek → otur) ----
  const acilar = kanatPr?.aci ?? [80, 80, 12];
  const th0 = acilar[0], thSon = acilar[acilar.length - 1];
  const jk = jest("pencere-kapat");
  const tb = jk?.bas ?? kanatPr?.kare?.[1] ?? 4;
  const tTok = temas("pencere-tok") ?? kanatPr?.kare?.[kanatPr.kare.length - 1] ?? 30;
  const tTik = temas("mandal-tik") ?? tTok + 4;
  const tTut = tb + 6, tBirak = tb + 14, thBirak = th0 - 16; // el kanada değer, 16° iter, bırakır
  const th = p < tTut ? th0
    : p < tBirak ? interpolate(p, [tTut, tBirak], [th0, thBirak], { ...cl, easing: (u) => u * u * (3 - 2 * u) })
      : p < tTok ? interpolate(p, [tBirak, tTok], [thBirak, thSon], { ...cl, easing: (u) => 0.55 * u + 0.45 * u * u }) // savrulma (hafif ivmeli)
        : p < tTik ? thSon + 2.5 * Math.sin((Math.PI * (p - tTok)) / (tTik - tTok)) // sekme
          : thSon;
  const w = KANAT_L * Math.sin((th * Math.PI) / 180); // etkin yarık (R2)
  const yarik: [number, number] = [IC.pen.x[1] - w, IC.pen.x[1]];

  // ---- padişah ----
  const fP = IC.figPxm;
  const ayakY = pp.ayak_y ?? (typeof pc?.y === "number" ? pc.y : 1267);
  const gozY = pp.goz_y ?? 740;
  // göz 1.55 m (json: ayak 1267, göz 740 → 527 px / 340); burun ucu json yuz_on_kontur_x'e oturtulur (eksen buradan)
  const burunOfs = Math.max(...basNoktalar(1).map((q) => q[0])) + 0.03;
  const eksenX = (pp.yuz_on_kontur_x ?? 457) - burunOfs * fP;
  const gozYuk = (ayakY - gozY) / fP; void gozYuk; void FIGUR_BUST_Y;
  const jd = jest("don"), ji = jest("isaret");
  const f = jd ? interpolate(p, [jd.bas, jd.bit], [1, Number(jd.ops?.yon_son ?? -1)], { ...cl, easing: INOUT }) : 1;
  // öne eğilme: kanada uzanırken (tTut→tBirak) 0→12°, bırakınca geri
  const egim = interpolate(p, [tb, tTut, tBirak, tTik], [0, 8, 12, 0], { ...cl, easing: INOUT });
  const g = figurGeo(eksenX, ayakY, fP, { f, egim });

  // ---- kol (tek görünen kol): dinlen → kanada uzan → kenarı it → bırak → dinlen · işaret ----
  const L1 = 0.3 * fP, L2 = 0.28 * fP, elBoy = 0.19 * fP;
  const omuz = g.omuz;
  const dinlen: P = [omuz[0] + g.yon * 0.05 * fP, omuz[1] + 0.55 * fP];
  const kenar = (t: number) => kanatNokta(t, 1, 770);
  const kolHedef = (): { bilek: P; aci: number; poz: ElPoz } => {
    // itme eli: avuç kanadın iç yüzüne, serbest kenarın hemen gerisinde (göğüs altı hizası y 860); parmaklar YUKARI (selam/uzanma
    // pozu okunmasın), dirsek bükük. Bilek = avuç noktası − el yerel avuç vektörü.
    const ITME_ACI = -62;
    const tutK = (t: number) => { const e = kanatNokta(t, 0.93, 860); const olc = elBoy / 140; const av = elGeometri("bas").avucNoktasi; const v = elNokta([0, 0], ITME_ACI, olc, av); return { bilek: [e[0] - v[0], e[1] - v[1]] as P, aci: ITME_ACI }; };
    const dAci = g.yon > 0 ? 82 : 98;
    if (jk && p >= tb && p < tTik) {
      if (p < tTut) { const u = GIRIS(interpolate(p, [tb, tTut], [0, 1], cl)); const h = tutK(th0); return { bilek: [lerp(dinlen[0], h.bilek[0], u), lerp(dinlen[1], h.bilek[1], u)], aci: lerp(dAci, h.aci, u), poz: "bas" }; }
      if (p < tBirak) { const h = tutK(th); return { ...h, poz: "bas" }; }
      const u = interpolate(p, [tBirak, tTik], [0, 1], { ...cl, easing: INOUT }); const h = tutK(thBirak);
      return { bilek: [lerp(h.bilek[0], dinlen[0], u), lerp(h.bilek[1], dinlen[1], u)], aci: lerp(h.aci, dAci, u), poz: u < 0.3 ? "bas" : "gevse" };
    }
    if (ji && p >= ji.bas) {
      // kapıyı gösterir: dirsek hafif bükük, el göğüs önünde kapıya doğru (işaret parmağı açık); kadraj kenarına (yan güvenli alan) taşmaz
      const hedef: P = [omuz[0] + g.yon * 0.2 * fP, omuz[1] + 0.27 * fP];
      const u = GIRIS(interpolate(p, [ji.bas, ji.bit], [0, 1], cl));
      return { bilek: [lerp(dinlen[0], hedef[0], u), lerp(dinlen[1], hedef[1], u)], aci: lerp(dAci, g.yon > 0 ? 18 : 162, u), poz: u < 0.35 ? "gevse" : "isaret" };
    }
    return { bilek: dinlen, aci: dAci, poz: "gevse" };
  };
  const kh = kolHedef();
  const ik = kolIK2(omuz, kh.bilek, L1, L2, g.yon > 0 ? 1 : -1);
  const kol: FigurKol = { omuz, dirsek: ik.dirsek, bilek: ik.bilek, elAci: kh.aci, poz: kh.poz };

  // ---- ışık sütunu (2B paralelkenar) ----
  const Ld = 2400, d = IC.isik;
  const A: P = [yarik[0], IC.pen.y[0]], B: P = [yarik[1], IC.pen.y[0]], C: P = [yarik[1], IC.pen.y[1]], Dd: P = [yarik[0], IC.pen.y[1]];
  const ot = (q: P): P => [q[0] + d[0] * Ld, q[1] + d[1] * Ld];
  const sutun = [B, A, ot(A), ot(Dd), ot(C), C];
  const solSinir = Math.min(g.yuzOn[0], ...g.gov.map((q) => q[0])) - 4; // sütun padişahta kesilir (arkası onun gölgesi)
  const wFig = w * (fP / IC.pxm);

  // ---- kilit noktaları ----
  kilit.push({ ad: "padisah yüz", p: ekranNokta(k, g.goz), tur: "yuz" });
  kilit.push({ ad: "padisah ayak", p: ekranNokta(k, [eksenX, ayakY]), tur: "ayak" });
  kilit.push({ ad: "kanat kenarı", p: ekranNokta(k, kenar(th)), tur: p >= tTok - 1 && p <= tTik + 1 ? "temas" : "kurulum" });
  kilit.push({ ad: "kapı pervazı", p: ekranNokta(k, [IC.kapi.x[1], 900]), tur: "kurulum" });
  if (ji && p >= ji.bas) kilit.push({ ad: "el (kapıyı gösterir)", p: ekranNokta(k, kol.bilek), tur: "dokunus" });

  // ---- dekor ----
  const K = 5;
  const kn = (c: string, wd = K) => ({ stroke: ink(c), strokeWidth: wd, strokeLinejoin: "round" as const });
  const kanatKose = { h0: kanatNokta(th, 0, IC.pen.y[0]), h1: kanatNokta(th, 0, IC.pen.y[1]), s0: kanatNokta(th, 1, IC.pen.y[0]), s1: kanatNokta(th, 1, IC.pen.y[1]) };
  const kanatM = dortgen(kanatKose.h0, kanatKose.s0, kanatKose.s1, kanatKose.h1);
  // serbest kenar kalınlığı (3 cm = 10 px): ışığa döndükçe aydınlanır (yüz normali (cos θ, 0, sin θ) · ışığa doğru)
  const r = (th * Math.PI) / 180;
  const kenarIsik = Math.max(0, Math.min(1, (Math.cos(r) * 0.83 - Math.sin(r) * 0.45) / 0.83));
  const kalin = [kanatNokta(th, 1, IC.pen.y[0]), kanatNokta(th, 1, IC.pen.y[1]), kanatNokta(th, 1, IC.pen.y[1], 10), kanatNokta(th, 1, IC.pen.y[0], 10)];
  const panel = (m: typeof kanatM, key: string) => [[0.16, 0.84, 0.05, 0.33], [0.16, 0.84, 0.36, 0.64], [0.16, 0.84, 0.67, 0.95]].map(([u1, u2, v1, v2], i) => <polygon key={`${key}${i}`} points={poly(parca(m, u1, u2, v1, v2))} fill={tonla(RENK.ahsapGolge, -0.12)} stroke={ink(RENK.ahsapGolge)} strokeWidth={2.5} strokeOpacity={0.8} />);
  const kanat2M = dortgen([IC.kanat2[0], IC.pen.y[0]], [IC.kanat2[1], IC.pen.y[0]], [IC.kanat2[1], IC.pen.y[1]], [IC.kanat2[0], IC.pen.y[1]]);
  // mandal (orta kayıtta demir tutucu): kanat 12°'de değer; tTok→tTik arası dili düşer (0 → 22°)
  const mandalDus = interpolate(p, [tTok, tTik], [0, 1], { ...cl, easing: CIKIS });
  const mK: P = proj(IC.kayit[0] + 4, 770, 0), mUc: P = proj(IC.kayit[0] - 6, 770 - 14 * (1 - mandalDus) + 3 * mandalDus, KANAT_L * Math.sin((thSon * Math.PI) / 180));
  // toz zerreleri: sütunun içinde, padişahın önünde (yavaş süzülür)
  const toz = Array.from({ length: 7 }).map((_, i) => {
    const u = rnd(S, `tu${i}`), v = rnd(S, `tv${i}`);
    const t0 = 60 + u * 230; // yarıktan uzaklık (ışık yönünde)
    const q0: P = [lerp(A[0], B[0], 0.5) + d[0] * t0, lerp(IC.pen.y[0] + 70, IC.pen.y[1] - 20, v) + d[1] * t0];
    const q: P = [q0[0] + 6 * Math.sin(p * 0.03 + i * 1.7), q0[1] - 0.12 * p + 8 * Math.cos(p * 0.025 + i)];
    return q;
  }).filter((q) => q[0] > solSinir + 6);

  // şerit maskesi: siluet (beyaz) eksi ışığa uzak kopya (siyah); sütun kırpar. Işık sağdan → kaydırma −wFig.
  const beyaz = `${uid}w`, siyah = `${uid}b`;
  // kol ışığa doğru uzanıyorsa (yüz pencereye dönük) çıkarma kopyasına girmez: kolun satırındaki yüz/kaftan kendi kenarından aydınlanır
  // (aksi halde kol yüzde yatay koyu bant = "sakal" bırakıyordu; tasarım §3.5 sakal sorusu açılmaz). Işıktan dönükken kol kopyada kalır.
  const kolCikar = g.yon < 0;
  const figurSiluet = (fill: string, tr?: string) => <g transform={tr} filter={`url(#${fill === "w" ? beyaz : siyah})`}><PadisahFigur g={g} kol={fill === "w" || kolCikar ? kol : null} ton={FIGUR_GOLGE} /></g>;

  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        <g transform={katDonusum(k, 1)}>
          <defs>
            <filter id={beyaz} filterUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}><feFlood floodColor="#ffffff" /><feComposite in2="SourceAlpha" operator="in" /></filter>
            <filter id={siyah} filterUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}><feFlood floodColor="#000000" /><feComposite in2="SourceAlpha" operator="in" /></filter>
            <mask id={`${uid}m`} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}>
              {figurSiluet("w")}
              {figurSiluet("b", `translate(${-wFig},0)`)}
            </mask>
            <clipPath id={`${uid}s`}><polygon points={poly(sutun)} /></clipPath>
            <clipPath id={`${uid}h`}><rect x={solSinir} y={-2000} width={6000} height={6000} /></clipPath>
            <clipPath id={`${uid}a`}><rect x={IC.pen.x[0]} y={IC.pen.y[0]} width={IC.pen.x[1] - IC.pen.x[0]} height={IC.pen.y[1] - IC.pen.y[0]} /></clipPath>
          </defs>
          {/* duvar (gölgede düz ton) + zemin */}
          <rect x={-1200} y={-1200} width={3600} height={IC.zemin + 1200} fill={RENK.duvar} />
          <rect x={-1200} y={IC.zemin} width={3600} height={1600} fill={RENK.zemin} />
          <KonturTitreme derinlik="yakin" seed={S}>
            {/* duvar dibi: ahşap süpürgelik (tek koyu bant) */}
            <rect x={-1200} y={IC.zemin - 22} width={3600} height={22} fill={tonla(RENK.duvar, -0.2)} {...kn(RENK.duvar, 3)} />
            {/* ---- kapı (açık, ardı koyu): pervaz + lento düz; kapı ağzında III + ton ---- */}
            {(() => { const [x0, x1] = IC.kapi.x, [y0, y1] = IC.kapi.y, pv = IC.kapi.pervaz; return <g>
              <rect x={x0 - pv} y={y0 - pv} width={x1 - x0 + 2 * pv} height={y1 - y0 + pv} fill={RENK.pervaz} {...kn(RENK.pervaz)} />
              <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={RENK.kapiIc} {...kn(RENK.kapiIc, 3)} />
              <Tarama sekil={[[x0, y0], [x1, y0], [x1, y0 + 70], [x0, y0 + 70]]} basamak="III" aci={60} renk={ink(RENK.kapiIc)} derinlik="yakin" seed={S + 3} />
              <Tarama sekil={[[x1 - 60, y0], [x1, y0], [x1, y1], [x1 - 60, y1]]} basamak="III" aci={60} renk={ink(RENK.kapiIc)} derinlik="yakin" seed={S + 4} />
              {/* pervazın gölge tarafı (ışıktan uzak sol kenar): II */}
              <Tarama sekil={[[x0 - pv, y0 - pv], [x0, y0], [x0, y1], [x0 - pv, y1]]} basamak="II" aci={60} renk={ink(RENK.pervaz)} derinlik="yakin" seed={S + 5} />
              <line x1={x1 + pv} y1={y0 - pv} x2={x1 + pv} y2={y1} stroke={tonla(RENK.pervaz, 0.25)} strokeWidth={3} />
            </g>; })()}
            {/* ---- pencere: pervaz (iki kanadın çevresi) + açıklık (dışarısı aşırı pozlanmış) + orta kayıt + kapalı ikinci kanat ---- */}
            <rect x={IC.pen.x[0] - IC.pervaz} y={IC.pen.y[0] - IC.pervaz} width={IC.kanat2[1] - IC.pen.x[0] + 2 * IC.pervaz} height={IC.pen.y[1] - IC.pen.y[0] + IC.pervaz} fill={RENK.pervaz} {...kn(RENK.pervaz)} />
            <rect x={IC.pen.x[0]} y={IC.pen.y[0]} width={IC.pen.x[1] - IC.pen.x[0]} height={IC.pen.y[1] - IC.pen.y[0]} fill={RENK.disari} />
            <rect x={IC.pen.x[0]} y={872} width={IC.pen.x[1] - IC.pen.x[0]} height={IC.pen.y[1] - 872} fill={RENK.ufuk} clipPath={`url(#${uid}a)`} />
            <polygon points={poly(parca(kanat2M, 0, 1, 0, 1))} fill={RENK.ahsapGolge} {...kn(RENK.ahsapGolge, 3)} />
            {panel(kanat2M, "k2")}
            <rect x={IC.kayit[0]} y={IC.pen.y[0]} width={IC.kayit[1] - IC.kayit[0]} height={IC.pen.y[1] - IC.pen.y[0]} fill={RENK.pervaz} {...kn(RENK.pervaz, 3)} />
            <Tarama sekil={[[IC.pen.x[0] - IC.pervaz, IC.pen.y[0] - IC.pervaz], [IC.pen.x[0], IC.pen.y[0] - IC.pervaz], [IC.pen.x[0], IC.pen.y[1]], [IC.pen.x[0] - IC.pervaz, IC.pen.y[1]]]} basamak="II" aci={60} renk={ink(RENK.pervaz)} derinlik="yakin" seed={S + 6} />
            {/* denizlik (çıkıntı) + yarığın düştüğü üst yüz ışıklı */}
            <rect x={IC.pen.x[0] - 40} y={IC.denizlik[0]} width={IC.kanat2[1] - IC.pen.x[0] + 80} height={IC.denizlik[1] - IC.denizlik[0]} fill={RENK.denizlik} {...kn(RENK.denizlik, 3)} />
            <rect x={yarik[0]} y={IC.denizlik[0]} width={w} height={7} fill={RENK.duvarIsik} />
            {/* menteşeler (nötr, koyu küçük) */}
            {[0.12, 0.88].map((v, i) => { const y = lerp(IC.pen.y[0], IC.pen.y[1], v); return <rect key={`mt${i}`} x={IC.pen.x[0] - 5} y={y - 12} width={10} height={24} fill={RENK.demir} />; })}
            {/* mandal / tutucu (orta kayıtta) */}
            <line x1={mK[0]} y1={mK[1]} x2={mUc[0]} y2={mUc[1]} stroke={RENK.demir} strokeWidth={6} strokeLinecap="round" />
            <circle cx={mK[0]} cy={mK[1]} r={5} fill={RENK.demir} />
          </KonturTitreme>
          {/* ---- havadaki ışık sütunu: iki ince kenar çizgisi + çok hafif dolgu (≤ .06) — padişahta kesilir ---- */}
          <g clipPath={`url(#${uid}h)`}>
            <polygon points={poly(sutun)} fill={RENK.serit} opacity={0.05} />
            {[[A, ot(A)], [C, ot(C)]].map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={RENK.serit} strokeWidth={1.5 / k.cs} strokeOpacity={0.2} />)}
          </g>
          {/* ---- kanat (odaya açık sol kanat; iç yüzü gölgede) ---- */}
          <polygon points={poly([kanatKose.h0, kanatKose.s0, kanatKose.s1, kanatKose.h1])} fill={RENK.ahsapGolge} {...kn(RENK.ahsapGolge, 3)} />
          {panel(kanatM, "k1")}
          <polygon points={poly(kalin)} fill={karistir(RENK.ahsapGolge, "#e8c890", 0.15 + 0.7 * kenarIsik)} {...kn(RENK.ahsap, 2)} />
          {/* serbest kenar kalınlığı ışığa döndükçe aydınlanır: gerçek izdüşüm ≈2 px → telefonda okunsun diye 6 px (abartı, raporlu) */}
          {kenarIsik > 0.2 && <line x1={kanatKose.s0[0] - 3} y1={kanatKose.s0[1]} x2={kanatKose.s1[0] - 3} y2={kanatKose.s1[1]} stroke={karistir(RENK.ahsap, "#f0d8a0", kenarIsik)} strokeWidth={6} />}
          {/* ayak teması: koyu temas gölgesi (ışık zemine bu kamerada düşmez → yalnız temas) */}
          <ellipse cx={eksenX + g.yon * 0.04 * fP} cy={ayakY + 2} rx={0.34 * fP} ry={0.05 * fP} fill="#14110d" opacity={0.45} />
          {/* ---- padişah: gölge tonu + şerit (ışık tonu, maskeli) ---- */}
          <PadisahFigur g={g} kol={kol} ton={FIGUR_GOLGE} />
          <g clipPath={`url(#${uid}s)`}>
            <g mask={`url(#${uid}m)`}><PadisahFigur g={g} kol={kol} ton={FIGUR_ISIK} sargi /></g>
          </g>
          {/* toz zerreleri (yalnız sütunda) */}
          <g clipPath={`url(#${uid}s)`}>{toz.map((q, i) => <circle key={i} cx={q[0]} cy={q[1]} r={2.6} fill={RENK.serit} opacity={0.55} />)}</g>
        </g>
      </RenkKaydi>
    </svg>
  );
};
