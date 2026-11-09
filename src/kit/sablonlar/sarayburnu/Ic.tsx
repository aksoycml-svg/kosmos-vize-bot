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
  zemin: 1250, isik: [-0.86, 0.51] as P, merkez: [540, 760] as P, mesafe: 6 * 324,
  // K5 (U1): yarık = iç açıklık 154 px · sin θ (yönetmen §5.0e; θ 4° → 10.7 px → figürde ×340/324 → cs 2.6'da ≈29 px ≤ 30).
  // Işık yönü (−0.83, 0.56) → (−0.86, 0.51): sütunun üst kenarı göz–burun kökü hattında (x≈455) kaş hizasına (y≈730) iner; eski yönde göz altından geçiyordu.
  yarikIc: 154, lento: 49, esik: [1238, 1254] as [number, number],
};
const RENK = {
  duvar: "#3a3430", duvarIsik: "#cbbfa4", ahsap: "#6a4a30", ahsapGolge: "#3a2a1e", pervaz: "#4a3828", disari: "#ece2c4", ufuk: "#d2d4c6",
  kapiIc: "#2a2420", zemin: "#2e2824", denizlik: "#4e443a", demir: "#2e2a26", serit: "#f6e4b0",
  hali: "#5a4a3e", dipGolge: "#221e1a", esik: "#6a6258", denizlikGolge: "#2a2420", yarikDis: "#f6ecd0", golge: "#2a2420",
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
  // K6 (A5): elin kanada değdiği kare json temaslarından ("el-ahsap"; ses aynı listeden) — kanat bu karede kımıldamaya başlar
  const tTut = temas("el-ahsap") ?? tb + 6, tBirak = tTut + 6, thBirak = th0 - 16; // el kanada değer, 16° iter, bırakır
  const th = p < tTut ? th0
    : p < tBirak ? interpolate(p, [tTut, tBirak], [th0, thBirak], { ...cl, easing: (u) => u * u * (3 - 2 * u) })
      : p < tTok ? interpolate(p, [tBirak, tTok], [thBirak, thSon], { ...cl, easing: (u) => 0.55 * u + 0.45 * u * u }) // savrulma (hafif ivmeli)
        : p < tTik ? thSon + 2.5 * Math.sin((Math.PI * (p - tTok)) / (tTik - tTok)) // sekme
          : thSon;
  const w = IC.yarikIc * Math.sin((th * Math.PI) / 180); // etkin yarık (R2; iç açıklık 154 px, yönetmen §5.0e)
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
  // çizilen kanadın serbest kenarı: izdüşüm ya da yarığın sol sınırı (738 − 154·sin θ), hangisi soldaysa (U4); u: menteşe → serbest kenar
  const kanatCizNokta = (t: number, u: number, y: number): P => { const h = kanatNokta(t, 0, y), q = kanatNokta(t, 1, y), sx = Math.min(q[0], IC.pen.x[1] - IC.yarikIc * Math.sin((t * Math.PI) / 180)); return [lerp(h[0], sx, u), lerp(h[1], q[1], u)]; };
  const kolHedef = (): { bilek: P; aci: number; poz: ElPoz } => {
    // itme eli: avuç kanadın iç yüzüne, serbest kenarın hemen gerisinde (göğüs altı hizası y 860); parmaklar YUKARI (selam/uzanma
    // pozu okunmasın), dirsek bükük. Bilek = avuç noktası − el yerel avuç vektörü.
    const ITME_ACI = -62;
    // K6 (A5): avuç, ÇİZİLEN kanadın (serbest kenarı yarığa kırpılmış) yüzeyine konur — elle kanat arasında boşluk kalmaz
    const tutK = (t: number) => { const e = kanatCizNokta(t, 0.93, 860); const olc = elBoy / 140; const av = elGeometri("bas").avucNoktasi; const v = elNokta([0, 0], ITME_ACI, olc, av); return { bilek: [e[0] - v[0], e[1] - v[1]] as P, aci: ITME_ACI }; };
    const dAci = g.yon > 0 ? 82 : 98;
    if (jk && p >= tb && p < tTik) {
      if (p < tTut) { const u = GIRIS(interpolate(p, [tb, tTut], [0, 1], cl)); const h = tutK(th0); return { bilek: [lerp(dinlen[0], h.bilek[0], u), lerp(dinlen[1], h.bilek[1], u)], aci: lerp(dAci, h.aci, u), poz: "bas" }; }
      if (p < tBirak) { const h = tutK(th); return { ...h, poz: "bas" }; }
      const u = interpolate(p, [tBirak, tTik], [0, 1], { ...cl, easing: INOUT }); const h = tutK(thBirak);
      return { bilek: [lerp(h.bilek[0], dinlen[0], u), lerp(h.bilek[1], dinlen[1], u)], aci: lerp(h.aci, dAci, u), poz: u < 0.3 ? "bas" : "gevse" };
    }
    if (ji && p >= ji.bas) {
      // K4 U5 "dışarı": kol öne uzanır (dirsek neredeyse açık), avuç AŞAĞI (aynaY), işaret parmağı uzun ve kapıya doğru (hafif aşağı),
      // diğer parmaklar kapalı. Bilek omuzdan 0.30 m öne / 0.13 m aşağı: cs 1.6 / cx 60'ta parmak ucu ekran x ≳ 100, bilek ≈ 190 (el ≥ 120; yan bant 80 dışı)
      const hedef: P = [omuz[0] + g.yon * 0.3 * fP, omuz[1] + 0.13 * fP];
      const u = GIRIS(interpolate(p, [ji.bas, ji.bit], [0, 1], cl));
      return { bilek: [lerp(dinlen[0], hedef[0], u), lerp(dinlen[1], hedef[1], u)], aci: lerp(dAci, g.yon > 0 ? 12 : 168, u), poz: u < 0.3 ? "gevse" : "isaret" };
    }
    return { bilek: dinlen, aci: dAci, poz: "gevse" };
  };
  const kh = kolHedef();
  const ik = kolIK2(omuz, kh.bilek, L1, L2, g.yon > 0 ? 1 : -1);
  const kol: FigurKol = { omuz, dirsek: ik.dirsek, bilek: ik.bilek, elAci: kh.aci, poz: kh.poz, aynaY: g.yon < 0 };

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
  // K5 (U4): kanadın ekrandaki serbest kenarı yarığın sol sınırını geçmez (perspektif küçük açıda kenarı orta kayda yapıştırıyordu → yarık
  // görünmüyordu). Serbest kenar x = min(izdüşüm, 738 − w): yarık her karede ışık çizgisi olarak okunur.
  const kanatS = (y: number, n = 0): P => { const q = kanatNokta(th, 1, y, n); return [Math.min(q[0], yarik[0] - (n ? 0 : 0)), q[1]]; };
  const kanatKose = { h0: kanatNokta(th, 0, IC.pen.y[0]), h1: kanatNokta(th, 0, IC.pen.y[1]), s0: kanatS(IC.pen.y[0]), s1: kanatS(IC.pen.y[1]) };
  const kanatM = dortgen(kanatKose.h0, kanatKose.s0, kanatKose.s1, kanatKose.h1);
  // serbest kenar kalınlığı (3 cm = 10 px): ışığa döndükçe aydınlanır (yüz normali (cos θ, 0, sin θ) · ışığa doğru)
  const r = (th * Math.PI) / 180;
  const kenarIsik = Math.max(0, Math.min(1, (Math.cos(r) * 0.83 - Math.sin(r) * 0.45) / 0.83));
  const kalin = [kanatKose.s0, kanatKose.s1, [kanatKose.s1[0] - 10 * Math.cos(r), kanatKose.s1[1]] as P, [kanatKose.s0[0] - 10 * Math.cos(r), kanatKose.s0[1]] as P];
  // K5 (U4, mekanlar §1.6b): kanat bölüntüsü ÜSTTE KARE panel (0.42 × 0.42 m) + ALTTA tek alçak panel (0.42 × 0.62 m), kayıt 0.06 m — kapı (uzun dikdörtgen) ile karışmaz
  const panel = (m: typeof kanatM, key: string) => [[0.12, 0.88, 0.045, 0.368], [0.12, 0.88, 0.414, 0.89]].map(([u1, u2, v1, v2], i) => <polygon key={`${key}${i}`} points={poly(parca(m, u1, u2, v1, v2))} fill={tonla(RENK.ahsapGolge, -0.12)} stroke={ink(RENK.ahsapGolge)} strokeWidth={2.5} strokeOpacity={0.8} />);
  const kanat2M = dortgen([IC.kanat2[0], IC.pen.y[0]], [IC.kanat2[1], IC.pen.y[0]], [IC.kanat2[1], IC.pen.y[1]], [IC.kanat2[0], IC.pen.y[1]]);
  // mandal (orta kayıtta demir tutucu): tTok→tTik arası dili düşer
  const mandalDus = interpolate(p, [tTok, tTik], [0, 1], { ...cl, easing: CIKIS });
  const mK: P = proj(IC.kayit[0] + 4, 770, 0), mUc: P = [yarik[0] - 2, 770 - 14 * (1 - mandalDus) + 3 * mandalDus];
  // toz zerreleri: sütunun içinde, yarığın hemen önünde (yavaş süzülür)
  const toz = Array.from({ length: 7 }).map((_, i) => {
    const u = rnd(S, `tu${i}`), v = rnd(S, `tv${i}`);
    const t0 = 25 + u * 110; // yarıktan uzaklık (ışık yönünde) — K8 (K7 küçük not): zerreler yarığın önündeki huzmede toplanır; kapı yüzeyine düşen zerre çivi/leke okunuyordu
    const q0: P = [lerp(A[0], B[0], 0.5) + d[0] * t0, lerp(IC.pen.y[0] + 70, IC.pen.y[1] - 20, v) + d[1] * t0];
    const q: P = [q0[0] + 6 * Math.sin(p * 0.03 + i * 1.7), q0[1] - 0.12 * p + 8 * Math.cos(p * 0.025 + i)];
    return q;
  }).filter((q) => q[0] > solSinir + 6);

  // ---- ışık şeridi (tek kaynak: sütun) ----
  // f > 0 (yüz pencereye dönük): yüzde ŞERİT = göz–burun kökü arasında dikey bant (genişlik = yarık izdüşümü wFig), üstte kaş, altta burun ucu
  // (dar yarıkta burun alt yüzü gölgeler; geniş yarıkta bant tüm başı kaplar); kaftanda bant ön kenardan wFig, iç kenarı kumaş kıvrımını izler (U6).
  // f < 0 (dönmüş): eski kontur bandı (siluet ∖ kaydır(siluet, −wFig)).
  const yuzW = Math.max(0, Math.min(1, f * 3)); // önden profile geçiş ağırlığı
  const dar = Math.max(0, Math.min(1, (40 - wFig) / 25));
  // bant göz üstünde başlar (göz merkezinin 0.005 m gerisi) ve burun köküne doğru wFig genişler: göz kapağı çizgisi ışıkta kalır
  const bxL = lerp(g.burunKoku[0] - wFig, g.goz[0] - 0.005 * fP * g.yon, dar), bxR = bxL + wFig;
  const byT = lerp(-2000, g.kasY + 0.002 * fP, dar), byB = lerp(4000, g.burunUcuY, dar);
  // kaftan bandı: ön kontur x(y) (gövde çokgeninin baktığı yöndeki uç) − w(y) · (1 + kıvrım)
  const onKontur = (y: number) => { let best = -Infinity; const q = g.gov; for (let i = 0; i < q.length; i++) { const a = q[i], b = q[(i + 1) % q.length]; if ((a[1] - y) * (b[1] - y) <= 0 && a[1] !== b[1]) { const x = a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]); best = Math.max(best, x); } } return best; };
  const kY0 = Math.min(...g.gov.map((q) => q[1])), kY1 = Math.max(...g.gov.map((q) => q[1]));
  const kaftanBant: P[] = (() => {
    const sag: P[] = [], sol: P[] = [];
    for (let i = 0; i <= 28; i++) {
      const y = lerp(kY0 - 4, kY1 + 4, i / 28), x = onKontur(Math.min(kY1 - 1, Math.max(kY0 + 1, y)));
      if (!isFinite(x)) continue;
      const u = (y - kY0) / fP; // metre (yukarıdan)
      // kıvrım: göğüste dar, belde (kuşak) içe, etekte iki kumaş dalgası; genlik bandın %40'ı, en az 3 px
      // K6 (A4, tek ışık): bant genişliği = yüzdeki çizginin genişliği (wFig, aynı yarık, aynı mesafe); kıvrım yalnız iç kenarda ±%15
      // (dar yarıkta); geniş yarıkta bant gövdenin tamamını kaplar (kuşak hizasında koyu "kama" açılmaz)
      const kivrim = dar * 0.15 * Math.sin(u * 7.5 + 0.6);
      const wb = Math.max(3, wFig * (1 + kivrim));
      sag.push([x + 6, y]); sol.push([x - wb, y]);
    }
    return [...sag, ...sol.reverse()];
  })();
  // ışık lekesi (U6, mekanlar §1.6a): sütunun padişahın ARKASINDA kalan kısmı yüzeye (kapı pervazı / zemin / duvar; kapı boşluğu ve pencere
  // hariç) düşer; içinde padişahın kesik gölgesi (siluet ışık yönünde ötelenmiş). Elle konmaz: sütun ∩ yüzey ∖ gölge.
  // K6 (A4): gölge ötelemesi = padişahın duvara uzaklığı (0.4 m · 340 px/m) × ışığın duvar düzlemindeki ilerleme oranı (huzme duvara ≈30°
  // yatık → 1/tan 30° ≈ 1.73) ≈ 235 px. Leke = sütun ∩ duvar/pervaz ∖ ötelenmiş siluet: padişahın arkasında, kapı pervazı (352–391) ile
  // sırtı arasındaki duvarda eğik ışık şeridi; içine profilin kesik gölgesi düşer (boy planda kadrajda).
  const golgeD = 0.4 * IC.figPxm * 1.73; const golgeTr = `translate(${d[0] * golgeD},${d[1] * golgeD})`;

  // şerit maskesi: siluet (beyaz) eksi ışığa uzak kopya (siyah); sütun kırpar. Işık sağdan → kaydırma −wFig.
  const beyaz = `${uid}w`, siyah = `${uid}b`;
  const kolCikar = g.yon < 0;
  const figurSiluet = (fill: string, tr?: string) => <g transform={tr} filter={`url(#${fill === "w" ? beyaz : siyah})`}><PadisahFigur g={g} kol={fill === "w" || kolCikar ? kol : null} ton={FIGUR_GOLGE} /></g>;
  const [kx0, kx1] = IC.kapi.x, [ky0, ky1] = IC.kapi.y, pv = IC.kapi.pervaz;

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
              {/* yüz pencereye dönükken baş + sarık + kaftan ayrı bantlarla aydınlanır (aşağıda) → kontur bandından çıkar */}
              {yuzW > 0 && <g fill="#000000" opacity={yuzW}>{[g.bas, g.sar, g.kav, g.gov, g.boyun, g.yakaKenar, g.sac].map((q, i) => <polygon key={i} points={poly(q)} />)}</g>}
            </mask>
            <mask id={`${uid}l`} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}>
              <rect x={-2000} y={-2000} width={6000} height={6000} fill="#ffffff" />
              <rect x={kx0} y={ky0} width={kx1 - kx0} height={ky1 - ky0} fill="#000000" />
              <rect x={IC.pen.x[0] - IC.pervaz} y={IC.pen.y[0] - IC.pervaz} width={2000} height={IC.denizlik[1] + 40 - IC.pen.y[0]} fill="#000000" />
              <g transform={golgeTr}>{figurSiluet("b")}</g>
            </mask>
            <clipPath id={`${uid}s`}><polygon points={poly(sutun)} /></clipPath>
            <clipPath id={`${uid}h`}><rect x={solSinir} y={-2000} width={6000} height={6000} /></clipPath>
            <clipPath id={`${uid}g`}><rect x={-2000} y={-2000} width={2000 + solSinir} height={6000} /></clipPath>
            <clipPath id={`${uid}a`}><rect x={IC.pen.x[0]} y={IC.pen.y[0]} width={IC.pen.x[1] - IC.pen.x[0]} height={IC.pen.y[1] - IC.pen.y[0]} /></clipPath>
            {/* yüz çizgisi: göz–burun kökü arasında dikey, kaştan burun ucu hizasına (tasarım v1.6 U1) */}
            <clipPath id={`${uid}yb`}><polygon points={poly([[bxL, byT], [bxR, byT], [bxR, byB], [bxL, byB]])} /></clipPath>
            <clipPath id={`${uid}bs`}>{[g.bas, g.sar, g.kav].map((q, i) => <polygon key={i} points={poly(q)} />)}</clipPath>
            <clipPath id={`${uid}kb`}><polygon points={poly(kaftanBant)} /></clipPath>
            <clipPath id={`${uid}gv`}><polygon points={poly(g.gov)} /></clipPath>
            {/* K6 (A5): kol ışık bandı = kol ∖ ötele(kol, −wFig) (alfa maskeleri; filtre yok) — geniş yarıkta tüm kol, dar yarıkta ön kenar çizgisi */}
            <mask id={`${uid}ka1`} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000} style={{ maskType: "alpha" }}><PadisahFigur g={g} kol={kol} ton={FIGUR_GOLGE} yalnizKol /></mask>
            <mask id={`${uid}ka2`} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000} style={{ maskType: "alpha" }}><g transform={`translate(${-wFig},0)`}><PadisahFigur g={g} kol={kol} ton={FIGUR_GOLGE} yalnizKol /></g></mask>
            <mask id={`${uid}kb2`} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}>
              <rect x={-2000} y={-2000} width={6000} height={6000} fill="#ffffff" mask={`url(#${uid}ka1)`} />
              <rect x={-2000} y={-2000} width={6000} height={6000} fill="#000000" mask={`url(#${uid}ka2)`} />
            </mask>
          </defs>
          {/* duvar (gölgede düz ton) + zemin: düz tek ton döşeme, duvar dibi temas gölgesi bandı, desensiz halı (R3 §1.6a) */}
          <rect x={-1200} y={-1200} width={3600} height={IC.zemin + 1200} fill={RENK.duvar} />
          <rect x={-1200} y={IC.zemin} width={3600} height={1600} fill={RENK.zemin} />
          <rect x={-1200} y={IC.zemin + 12} width={3600} height={1600} fill={RENK.hali} />
          <rect x={-1200} y={IC.zemin} width={3600} height={12} fill={RENK.dipGolge} />
          <KonturTitreme derinlik="yakin" seed={S}>
            {/* ---- kapı (açık, ardı koyu): kalın pervaz 0.10 m + düz lento 0.15 m + taş eşik (zemine basar); kapı ağzında III + ton ---- */}
            <g>
              <rect x={kx0 - pv} y={ky0 - IC.lento} width={kx1 - kx0 + 2 * pv} height={ky1 - ky0 + IC.lento} fill={RENK.pervaz} {...kn(RENK.pervaz)} />
              <line x1={kx0 - pv} y1={ky0} x2={kx1 + pv} y2={ky0} stroke={ink(RENK.pervaz)} strokeWidth={3} />
              <rect x={kx0} y={ky0} width={kx1 - kx0} height={ky1 - ky0} fill={RENK.kapiIc} {...kn(RENK.kapiIc, 3)} />
              <Tarama sekil={[[kx0, ky0], [kx1, ky0], [kx1, ky0 + 70], [kx0, ky0 + 70]]} basamak="III" aci={60} renk={ink(RENK.kapiIc)} derinlik="yakin" seed={S + 3} />
              <Tarama sekil={[[kx1 - 60, ky0], [kx1, ky0], [kx1, ky1], [kx1 - 60, ky1]]} basamak="III" aci={60} renk={ink(RENK.kapiIc)} derinlik="yakin" seed={S + 4} />
              <Tarama sekil={[[kx0 - pv, ky0 - IC.lento], [kx0, ky0 - IC.lento], [kx0, ky1], [kx0 - pv, ky1]]} basamak="II" aci={60} renk={ink(RENK.pervaz)} derinlik="yakin" seed={S + 5} />
              <line x1={kx1 + pv} y1={ky0 - IC.lento} x2={kx1 + pv} y2={ky1} stroke={tonla(RENK.pervaz, 0.25)} strokeWidth={3} />
              <rect x={kx0 - pv - 6} y={IC.esik[0]} width={kx1 - kx0 + 2 * pv + 12} height={IC.esik[1] - IC.esik[0]} fill={RENK.esik} {...kn(RENK.esik, 3)} />
            </g>
            {/* ---- pencere: pervaz + açıklık (dışarısı aşırı pozlanmış) + kapalı ikinci kanat (kenarı orta kayıtta, her karede) ---- */}
            <rect x={IC.pen.x[0] - IC.pervaz} y={IC.pen.y[0] - IC.pervaz} width={IC.kanat2[1] - IC.pen.x[0] + 2 * IC.pervaz} height={IC.pen.y[1] - IC.pen.y[0] + IC.pervaz} fill={RENK.pervaz} {...kn(RENK.pervaz)} />
            <rect x={IC.pen.x[0]} y={IC.pen.y[0]} width={IC.pen.x[1] - IC.pen.x[0]} height={IC.pen.y[1] - IC.pen.y[0]} fill={RENK.disari} />
            <rect x={IC.pen.x[0]} y={872} width={IC.pen.x[1] - IC.pen.x[0]} height={IC.pen.y[1] - 872} fill={RENK.ufuk} clipPath={`url(#${uid}a)`} />
            {/* yarık: aşırı pozlanmış dış ışık çizgisi (pencerenin kimliği; mekanlar §1.6b) */}
            <rect x={yarik[0]} y={IC.pen.y[0]} width={w} height={IC.pen.y[1] - IC.pen.y[0]} fill={RENK.yarikDis} />
            <polygon points={poly(parca(kanat2M, 0, 1, 0, 1))} fill={RENK.ahsapGolge} {...kn(RENK.ahsapGolge, 3)} />
            {panel(kanat2M, "k2")}
            {/* ikinci kanadın kenarı (kapalı, gölgede) x 738–752 */}
            <rect x={IC.kayit[0]} y={IC.pen.y[0]} width={IC.kayit[1] - IC.kayit[0]} height={IC.pen.y[1] - IC.pen.y[0]} fill={RENK.ahsapGolge} {...kn(RENK.ahsapGolge, 2.5)} />
            <line x1={IC.kayit[1]} y1={IC.pen.y[0]} x2={IC.kayit[1]} y2={IC.pen.y[1]} stroke={ink(RENK.ahsapGolge)} strokeWidth={3} />
            <Tarama sekil={[[IC.pen.x[0] - IC.pervaz, IC.pen.y[0] - IC.pervaz], [IC.pen.x[0], IC.pen.y[0] - IC.pervaz], [IC.pen.x[0], IC.pen.y[1]], [IC.pen.x[0] - IC.pervaz, IC.pen.y[1]]]} basamak="II" aci={60} renk={ink(RENK.pervaz)} derinlik="yakin" seed={S + 6} />
            {/* denizlik: 0.12 m kalın çıkıntı (20 px öne taşar), üst yüz bir ton açık + yarığın düştüğü yerde ışıklı; altında 16 px koyu gölge bandı */}
            <rect x={IC.pen.x[0] - IC.pervaz - 20} y={IC.denizlik[1] + 20} width={IC.kanat2[1] - IC.pen.x[0] + 2 * IC.pervaz + 40} height={16} fill={RENK.denizlikGolge} />
            <rect x={IC.pen.x[0] - IC.pervaz - 20} y={IC.denizlik[0]} width={IC.kanat2[1] - IC.pen.x[0] + 2 * IC.pervaz + 40} height={IC.denizlik[1] + 20 - IC.denizlik[0]} fill={RENK.denizlik} {...kn(RENK.denizlik, 3)} />
            <rect x={IC.pen.x[0] - IC.pervaz - 20} y={IC.denizlik[0]} width={IC.kanat2[1] - IC.pen.x[0] + 2 * IC.pervaz + 40} height={9} fill={tonla(RENK.denizlik, 0.22)} />
            <rect x={yarik[0]} y={IC.denizlik[0]} width={w} height={9} fill={RENK.duvarIsik} />
            {/* menteşeler (nötr, koyu küçük) */}
            {[0.12, 0.88].map((v, i) => { const y = lerp(IC.pen.y[0], IC.pen.y[1], v); return <rect key={`mt${i}`} x={IC.pen.x[0] - 5} y={y - 12} width={10} height={24} fill={RENK.demir} />; })}
          </KonturTitreme>
          {/* ---- ışık lekesi (U6): sütunun padişahın arkasına geçen kısmı yüzeylere düşer, içinde onun kesik gölgesi ---- */}
          <g clipPath={`url(#${uid}s)`}><g clipPath={`url(#${uid}g)`}><g mask={`url(#${uid}l)`}>
            <rect x={-2000} y={-2000} width={6000} height={6000} fill={RENK.duvarIsik} opacity={0.5} />
          </g></g></g>
          {/* ---- havadaki ışık sütunu: iki ince kenar çizgisi + çok hafif dolgu (≤ .06) — padişahta kesilir ---- */}
          <g clipPath={`url(#${uid}h)`}>
            <polygon points={poly(sutun)} fill={RENK.serit} opacity={0.05} />
            {[[A, ot(A)], [C, ot(C)]].map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={RENK.serit} strokeWidth={1.5 / k.cs} strokeOpacity={0.2} />)}
          </g>
          {/* ---- kanat (odaya açık sol kanat; iç yüzü gölgede) ---- */}
          <polygon points={poly([kanatKose.h0, kanatKose.s0, kanatKose.s1, kanatKose.h1])} fill={RENK.ahsapGolge} {...kn(RENK.ahsapGolge, 3)} />
          {panel(kanatM, "k1")}
          <polygon points={poly(kalin)} fill={karistir(RENK.ahsapGolge, "#e8c890", 0.15 + 0.7 * kenarIsik)} {...kn(RENK.ahsap, 2)} />
          {kenarIsik > 0.2 && <line x1={kanatKose.s0[0] - 3} y1={kanatKose.s0[1]} x2={kanatKose.s1[0] - 3} y2={kanatKose.s1[1]} stroke={karistir(RENK.ahsap, "#f0d8a0", kenarIsik)} strokeWidth={6} />}
          {/* mandal / tutucu (orta kayıtta; kanat kenarına oturur) */}
          <line x1={mK[0]} y1={mK[1]} x2={mUc[0]} y2={mUc[1]} stroke={RENK.demir} strokeWidth={6} strokeLinecap="round" />
          <circle cx={mK[0]} cy={mK[1]} r={5} fill={RENK.demir} />
          {/* ayak teması: halı üstünde basık koyu temas gölgesi α .35 (huzme zemine düşmez → yön gölgesi yok) */}
          <ellipse cx={eksenX + g.yon * 0.04 * fP} cy={ayakY + 2} rx={0.34 * fP} ry={0.045 * fP} fill={RENK.dipGolge} opacity={0.35 / 0.45 * 0.45 + 0.1} />
          {/* toz zerreleri (yalnız sütunda; K8: yarık önünde toplanır + parıldar/hale → çivi/leke değil toz okunur) — K7: figürün ARKASINDA (figür örter); yüze düşen zerre "ben" gibi okunuyordu (K6 küçük not) */}
          <g clipPath={`url(#${uid}s)`}>{toz.map((q, i) => { const pr = 0.5 + 0.5 * Math.sin(p * 0.21 + i * 2.3); return <g key={i}><circle cx={q[0]} cy={q[1]} r={7} fill={RENK.serit} opacity={0.12 + 0.12 * pr} /><circle cx={q[0]} cy={q[1]} r={2.2 + 1.2 * pr} fill={RENK.serit} opacity={0.5 + 0.4 * pr} /></g>; })}</g>
          {/* ---- padişah: gölge tonu + şerit (ışık tonu) ---- */}
          <PadisahFigur g={g} kol={kol} ton={FIGUR_GOLGE} />
          <g clipPath={`url(#${uid}s)`}>
            <g mask={`url(#${uid}m)`}><PadisahFigur g={g} kol={kol} ton={FIGUR_ISIK} sargi /></g>
            {yuzW > 0 && <g opacity={yuzW}>
              {/* yüz: göz–burun kökü dikey ışık çizgisi */}
              <g clipPath={`url(#${uid}yb)`}><g clipPath={`url(#${uid}bs)`}><PadisahFigur g={g} kol={null} ton={FIGUR_ISIK} sargi /></g></g>
              {/* kaftan: ön kenar bandı, iç kenarı kumaş kıvrımını izler */}
              <g clipPath={`url(#${uid}kb)`}><g clipPath={`url(#${uid}gv)`}><PadisahFigur g={g} kol={null} ton={FIGUR_ISIK} /></g></g>
            </g>}
          </g>
          {/* K6 (A5): kol gövdenin ÖNÜNDE — gövde ışık katmanları kolu örtmesin: kol gölge tonunda yeniden, sonra kendi ışık bandı (yen + el ışıkta) */}
          <PadisahFigur g={g} kol={kol} ton={FIGUR_GOLGE} yalnizKol />
          <g clipPath={`url(#${uid}s)`}><g mask={`url(#${uid}kb2)`}><PadisahFigur g={g} kol={kol} ton={FIGUR_ISIK} yalnizKol /></g></g>
        </g>
      </RenkKaydi>
    </svg>
  );
};
