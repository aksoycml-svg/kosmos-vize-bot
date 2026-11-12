// ===== KE-PK-S2 MONTMARTRE (Paris kuşatması 1870; mekanlar.md §2v2 + §2v2-H · tasarım §14, §5) =====
// Tek dünya (montmartreDunya), dört görünüm: `meydan` (P03, Montmartre, gunMontmartre) · `yukleme` (P06b) · `gok` (P07 A) · `sepet` (P07 B)
// `arka`: "montmartre" (vars.) | "hale" (Gare d'Orléans halesi, haleSabah; yukleme'de makas/cam/duvar/kolon, gok'ta ray demeti).
// Kamera: dekor = cs 1 ekranı, plan kamerası (cs/cx/cy) 2B zoom (katDonusum). Her nesne dünyadan pr() ile; gölgeler golgeCokgen (tek vektör).
// Darbe (P07 f108): şablon kendi çizer (KE-PK-E1, gravür dili: delik + yırtık + kısa krem parlama + gri-kül duman; çizgi roman patlaması YOK).
// Görüntüde dil metni yok. Kırmızı yok; imza kehribarı yok (kılıf bu şablonda yok; sahne C* ≤ 28).
import React, { useId } from "react";
import { Easing, interpolate } from "remotion";
import { RenkKaydi } from "../../../doku/Tarama";
import type { P, Plan } from "../../tipler";
import { cl, ekranNokta, GIRIS, INOUT, kameraHesapla, katDonusum } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";
import { Balon, BalonAltan, balonAltDugum, BalonDurum, BogazHalka, onYuzNokta, Sandik, sandikKulp, SepetArka, sepetKose, SepetOn, SepetPoz, Torba } from "../../props/paris/Balon";
import { ayaktaEklem, Eklem, EklemDunya, eklemIzdus, FigurSiluet, Kiyafet } from "../../props/paris/SabahFigur";
import { HavadanParis } from "./havadanParis";
import { agacGolge, CiplakAgac, GokBasamak, HaleArka, HavadanSehir, MeydanZemin, SarkikZarf, UfukBandi, YanEv, YAN_EV } from "./montmartreDekor";
import { golgeCokgen, golgeNokta, IsikAd, Kam, KAMERA, kutu, lerp, lp2, PAL, pr, pts, pxm, rng, sat, V3, yolAcik, yumusak, zeminCokgen } from "./montmartreDunya";

type Ar = { bas: number; bit: number; temas?: number; birakma?: number; ayak_temas?: number };
const ar = (v: unknown, d: Ar): Ar => (v && typeof v === "object" && typeof (v as Ar).bas === "number" ? (v as Ar) : d);
const obj = (plan: Plan, ad: string) => ((plan.parametreler?.[ad] ?? {}) as Record<string, unknown>);
const t01 = (p: number, a: number, b: number, e: (t: number) => number = INOUT) => interpolate(p, [a, b], [0, 1], { ...cl, easing: e });
const SIL = { renk: PAL.siluet, kenar: { renk: PAL.kenar, dx: -2.5, dy: -1.5 } };
const golgeFig = (k: Kam, isik: IsikAd, X: number, Z: number, H: number, w = 0.42): V3[] => [[X - w / 2, 0, Z], [X + w / 2, 0, Z], [X - w * 0.35, H * 0.55, Z], [X + w * 0.35, H * 0.55, Z], [X - 0.1, H, Z], [X + 0.1, H, Z]];
const Golgeler: React.FC<{ liste: (P[] | null)[]; renk?: string }> = ({ liste, renk = PAL.golge }) => <g fill={renk}>{liste.map((g, i) => g && g.length > 2 && <polygon key={i} points={pts(g)} />)}</g>;

// ---- halat: iki uç arasında sarkık eğri (dünya), zemine gömülmez ----
const halatNokta = (A: V3, B: V3, sarkma: number, n = 16): V3[] => Array.from({ length: n + 1 }, (_, i) => { const t = i / n; return [lerp(A[0], B[0], t), Math.max(0.015, lerp(A[1], B[1], t) - sarkma * 4 * t * (1 - t)), lerp(A[2], B[2], t)] as V3; });
const HalatCiz: React.FC<{ k: Kam; n: V3[]; w?: number; isik?: boolean }> = ({ k, n, w, isik = true }) => {
  const e = n.map((q) => pr(k, ...q)), ww = w ?? Math.max(2, 0.03 * pxm(k, n[0][2]));
  return <g><polyline points={pts(e)} fill="none" stroke={PAL.halatGolge} strokeWidth={ww + 1.5} strokeLinejoin="round" /><polyline points={pts(e)} fill="none" stroke={PAL.halat} strokeWidth={ww} strokeLinejoin="round" />{isik && <polyline points={pts(e.map((q) => [q[0] - ww * 0.3, q[1] - ww * 0.3] as P))} fill="none" stroke={PAL.kenar} strokeWidth={1} />}</g>;
};
/** kalın boru (hortum): dünya noktaları, ø 0.12 m — konturlu, sol-üst kenar ışığı */
const Hortum: React.FC<{ k: Kam; n: V3[] }> = ({ k, n }) => {
  const seg = n.slice(1).map((q, i) => ({ a: pr(k, ...n[i]), b: pr(k, ...q), w: 0.12 * pxm(k, (n[i][2] + q[2]) / 2) }));
  return (
    <g strokeLinecap="round">
      {seg.map((s, i) => <line key={`k${i}`} x1={s.a[0]} y1={s.a[1]} x2={s.b[0]} y2={s.b[1]} stroke="#2e2a40" strokeWidth={s.w + 4} />)}
      {seg.map((s, i) => <line key={`d${i}`} x1={s.a[0]} y1={s.a[1]} x2={s.b[0]} y2={s.b[1]} stroke={PAL.hortum} strokeWidth={s.w} />)}
      {seg.map((s, i) => <line key={`l${i}`} x1={s.a[0] - s.w * 0.25} y1={s.a[1] - s.w * 0.3} x2={s.b[0] - s.w * 0.25} y2={s.b[1] - s.w * 0.3} stroke={PAL.kenar} strokeWidth={Math.max(1, s.w * 0.12)} opacity={0.8} />)}
    </g>
  );
};
const bezier3 = (a: V3, b: V3, c: V3, d: V3, n = 18): V3[] => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [0, 1, 2].map((j) => u * u * u * a[j] + 3 * u * u * t * b[j] + 3 * u * t * t * c[j] + t * t * t * d[j]) as V3; });
/** iki kemik IK (ekran): omuz → el, kol boyları px; dirsek `yon` (+1 / −1) tarafına */
const ik2 = (o: P, e: P, l1: number, l2: number, yon: number): P => {
  const dx = e[0] - o[0], dy = e[1] - o[1], d = Math.min(l1 + l2 - 0.5, Math.hypot(dx, dy) || 1);
  const a = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)))), b = Math.atan2(dy, dx) + yon * a;
  return [o[0] + Math.cos(b) * l1, o[1] + Math.sin(b) * l1];
};

// =============================================================== BALON (dünya → ekran) ===============================================================
type BalonDunya = { s: number; dh: number; X: number; Z: number; coker?: BalonDurum["coker"] };
const balonGeo = (k: Kam, b: BalonDunya) => {
  const c3 = Math.cbrt(Math.max(1e-4, b.s)), r = 3.3 * c3, tepe = 1.0 + 9.0 * c3, merkez = tepe - r;
  const bogaz = 1.2 + 1.7 * Math.min(1, b.s), halka = Math.max(0.97, bogaz - 0.3);
  const ppm = pxm(k, b.Z);
  const c = pr(k, b.X, merkez + b.dh, b.Z);
  const egim = (Math.atan2(merkez + b.dh - k.e, b.Z - k.Z) * 180) / Math.PI;
  return { c, R: r * ppm, ppm, merkez: merkez + b.dh, bogaz: bogaz + b.dh, halka: halka + b.dh, boyunUst: pr(k, b.X, bogaz + b.dh + 0.45, b.Z)[1], boyunAlt: pr(k, b.X, bogaz + b.dh, b.Z)[1], halkaY: pr(k, b.X, halka + b.dh, b.Z)[1], egim };
};
const BalonDunyaCiz: React.FC<{ k: Kam; b: BalonDunya; gevsek: number; yansima: boolean; kontur?: number; ek?: Partial<BalonDurum> }> = ({ k, b, gevsek, yansima, kontur, ek }) => {
  const g = balonGeo(k, b);
  const kiv = b.s < 0.5 ? 9 : Math.round(18 * (1 - b.s));
  const d: BalonDurum = { c: g.c, R: g.R, boyunUst: g.boyunUst, boyunAlt: g.boyunAlt, boyunW: 0.25 * g.ppm, dolu: yumusak(0.45, 1, b.s), kivrim: kiv, gevsek, egim: Math.max(4, g.egim), halka: { y: g.halkaY, w: 0.45 * g.ppm }, yansima, kontur, coker: b.coker, ...ek };
  return <g><Balon b={d} /><BogazHalka x={g.c[0]} boyunUst={g.boyunAlt - 0.3 * g.ppm} boyunAlt={g.boyunAlt} boyunW={0.2 * g.ppm} halkaY={g.halkaY} halkaW={0.45 * g.ppm} egim={Math.max(6, g.egim)} kontur={Math.max(2, (kontur ?? 3.5) * 0.8)} /></g>;
};
/** halkadan rim köşelerine 5 askı halatı (4 köşe + ön orta); gevşekken kavisli */
const AskiHalatlari: React.FC<{ k: Kam; s: SepetPoz; halkaH: number; X: number; Z: number; gevsek: number; on?: boolean }> = ({ k, s, halkaH, X, Z, gevsek, on }) => {
  const { ust } = sepetKose(s), ppm = pxm(k, Z);
  const hedef: V3[] = [...ust, [(ust[0][0] + ust[1][0]) / 2, ust[0][1], (ust[0][2] + ust[1][2]) / 2]];
  const secili = on === undefined ? hedef : hedef.filter((q) => (q[2] < s.Z) === on);
  return <g>{secili.map((q, i) => {
    const a = Math.atan2(q[2] - Z, q[0] - X), h: V3 = [X + Math.cos(a) * 0.45, halkaH, Z + Math.sin(a) * 0.45];
    const n = halatNokta(h, q, -gevsek * 0.0, 10).map((v, j) => { const t = j / 10, sx = gevsek * 0.22 * Math.sin(Math.PI * t) * (i % 2 ? 1 : -1); return [v[0] + sx, v[1], v[2]] as V3; });
    return <HalatCiz key={i} k={k} n={n} w={Math.max(1.5, 0.025 * ppm)} />;
  })}</g>;
};

// =============================================================== MEYDAN (P03) ===============================================================
type Kisi = { X: number; Z: number; H: number; kiyafet: Kiyafet; egim: number; bas: number; seed: number };
// mekanlar §2v2.3 / §2v2.11 (seed 161): 3 + 3; boylar hiçbir ikisi ±3 cm içinde değil (R3 1.58 → 1.55: kazıkçı/kadın çakışması)
const KALABALIK: Kisi[] = [
  { X: -5.1, Z: 5.1, H: 1.8, kiyafet: "palto", egim: 2, bas: 12, seed: 1 },
  { X: -4.3, Z: 3.9, H: 1.6, kiyafet: "sal", egim: 0, bas: 17, seed: 2 },
  { X: -3.4, Z: 6.2, H: 1.15, kiyafet: "cocuk", egim: -9, bas: 20, seed: 3 },
  { X: 3.2, Z: 3.2, H: 1.72, kiyafet: "duz", egim: -1, bas: -10, seed: 4 },
  { X: 4.0, Z: 4.4, H: 1.84, kiyafet: "pelerin", egim: 0, bas: -14, seed: 5 },
  { X: 4.3, Z: 2.8, H: 1.55, kiyafet: "etek", egim: 2, bas: -8, seed: 6 }, // X 4.8 → 4.3: ayak IG sağ düğme sütununda kalıyordu (x 958)
];
const KAZIK: V3 = [2.9, 0, -1.2], KAZIKCI = { X: 3.12, Z: -1.5, H: 1.77 }; // X 3.35 → 3.12: ayak x 929 → 902 (IG sağ sütun dışı)

const Meydan: React.FC<{ plan: Plan; p: number; kilit: SablonProps["kilit"]; k2: { cs: number; cx: number; cy: number }; uid: string }> = ({ plan, p, kilit, k2, uid }) => {
  const k = KAMERA.meydan, isik: IsikAd = "gunMontmartre";
  const bp = obj(plan, "balon");
  const sis = ar(bp.sisme, { bas: 6, bit: 104 }), otur = ar(bp.oturma, { bas: 104, bit: 116 }), coz = ar(bp.halat_cozulur, { bas: 108, bit: 116 }), yuk = ar(bp.yukselis, { bas: 116, bit: 156 });
  const ger = (Array.isArray(bp.ag_halat_gerilme) ? bp.ag_halat_gerilme : [40, 66, 88]) as number[];
  const kzTemas = Number((obj(plan, "kazikci").temas as number | undefined) ?? 112);
  // şişme: s doğrusal (gaz hacmi), son 10 karede ease-out (mekanlar §2v2.4)
  const u = sat((p - sis.bas) / (sis.bit - sis.bas)), uk = 1 - 10 / (sis.bit - sis.bas);
  const s = u < uk ? u : uk + (1 - uk) * Easing.out(Easing.quad)((u - uk) / (1 - uk));
  const gevsek = 1 - ger.reduce((a, f) => a + t01(p, f - 4, f + 4) / ger.length, 0);
  // oturma: küre oturur, sallanıp durur (sönümlü)
  const ot = p > otur.bas ? 0.16 * Math.sin(((p - otur.bas) / 12) * Math.PI * 2) * Math.exp(-(p - otur.bas) / 9) * (p < otur.bit + 20 ? 1 : 0) : 0;
  // yükseliş: ease-in, 40 karede 21.5 m (zaman sıkıştırması ≈ ×6; sepet + sarkan bağlama halatının ucu f156'da kadraj üstünden çıkar)
  const dh = 21.5 * Math.pow(t01(p, yuk.bas, yuk.bit, (x) => x), 2);
  const sp: SepetPoz = { X: 0, h: dh, Z: 0 };
  const g = balonGeo(k, { s: Math.max(s, 1e-3), dh: dh + ot, X: 0, Z: 0 });
  // ---- hortum (dünya): sol dış → kangal → BL köşesi → boğaz; f98–106 üst ucu boğazdan çıkar, yere iner (temas f106) ----
  const hAy = t01(p, 98, 106, (x) => x * x);
  const ust0: V3 = [0, Math.max(1.4, g.bogaz - 0.05 - (dh + ot)), 0];
  const yer: V3 = [-1.15, 0.06, 0.75];
  const uc: V3 = hAy <= 0 ? [0, ust0[1] + dh + ot, 0] : [lerp(-0.25, yer[0], hAy), lerp(1.3, yer[1], hAy), lerp(0.05, yer[2], hAy)];
  const kangal: V3[] = Array.from({ length: 15 }, (_, i) => { const a = (i / 14) * Math.PI * 2 - 0.4; return [-1.6 + 0.42 * Math.cos(a), 0.06, -6.4 + 0.42 * Math.sin(a)] as V3; });
  const zeminHortum: V3[] = [[-3.4, 0.06, -9.3], [-2.6, 0.06, -8.0], [-2.0, 0.06, -6.9], ...kangal, [-1.4, 0.06, -5.0], [-1.1, 0.06, -3.0], [-0.98, 0.06, -1.0], [-0.92, 0.06, 0.3]];
  const yukselen = hAy < 1 ? bezier3([-0.92, 0.06, 0.3], [-1.05, 1.3, 0.35], [lerp(-0.45, -1.1, hAy), lerp(ust0[1] - 0.6, 0.6, hAy), 0.15], uc) : bezier3([-0.92, 0.06, 0.3], [-0.97, 0.06, 0.45], [-1.06, 0.06, 0.6], yer, 6);
  // ---- bağlama halatı: FR alt köşe → kazık başı; f108–116 kazıkçı ilmeği kaldırır (temas f112), sonra serbest uç sepetle ----
  const { alt } = sepetKose(sp);
  const FR: V3 = alt[1], kazikBas: V3 = [KAZIK[0], 0.9, KAZIK[2]];
  const elKazik: V3 = p < kzTemas ? kazikBas : p < coz.bit ? [KAZIK[0] + 0.05, 0.9 + 0.5 * t01(p, kzTemas, coz.bit), KAZIK[2] - 0.05] : [KAZIK[0] + 0.05, 1.4, KAZIK[2] - 0.05];
  const ipUc: V3 = p < coz.bas ? kazikBas : p < coz.bit ? elKazik : (() => { const t = t01(p, coz.bit, coz.bit + 30); return [lerp(elKazik[0], FR[0] + 0.4, t), Math.max(0.02, FR[1] - 2.7, lerp(1.4, 0.02, t01(p, coz.bit, coz.bit + 8, Easing.in(Easing.quad)))), lerp(elKazik[2], FR[2] - 0.3, t)] as V3; })();
  const ipL = 3.0, ipD = Math.hypot(ipUc[0] - FR[0], ipUc[1] - FR[1], ipUc[2] - FR[2]);
  const ipNok = halatNokta(FR, ipUc, Math.max(0.05, (ipL - ipD) * 0.6), 18);
  // ---- kazıkçı pozu (eğilir → ilmek → doğrulur, başı balona) ----
  const kzP = pr(k, KAZIKCI.X, 0, KAZIKCI.Z), kzM = pxm(k, KAZIKCI.Z);
  const egil = t01(p, 92, coz.bas, INOUT) * (1 - t01(p, coz.bit + 2, coz.bit + 18, INOUT));
  const kz = ayaktaEklem(kzP, kzM, KAZIKCI.H, { egim: -22 * egil, kolAci: [10, 6] });
  const elE = pr(k, ...(p >= 92 && p < coz.bit + 4 ? (p < coz.bas ? lerp3([KAZIKCI.X - 0.25, 0.85, KAZIKCI.Z], kazikBas, t01(p, 92, coz.bas)) : elKazik) : [KAZIKCI.X - 0.28, 0.9, KAZIKCI.Z] as V3));
  kz.el[0] = elE; kz.dirsek[0] = ik2(kz.omuz[0], elE, 0.32 * kzM, 0.3 * kzM, -1);
  const balonBak = t01(p, 60, 156);
  // ---- gölgeler (tek vektör: (X + 3.325h, Z − 3.325h)) ----
  const sk = kutu(0, 0, 1.2, 1.2, dh, dh + 0.95, 25);
  const golgeler: (P[] | null)[] = [
    ...agacGolge(k, isik, -7.0, 7.6, 159),
    ...KALABALIK.map((q) => golgeCokgen(k, isik, golgeFig(k, isik, q.X, q.Z, q.H))),
    golgeCokgen(k, isik, golgeFig(k, isik, KAZIKCI.X, KAZIKCI.Z, KAZIKCI.H * (1 - 0.15 * egil))),
    golgeCokgen(k, isik, kutu(KAZIK[0], KAZIK[2], 0.12, 0.12, 0, 0.9)),
    golgeCokgen(k, isik, sk),
    ...[[-1.0, -7.9], [-0.6, -7.6]].map(([X, Z]) => golgeCokgen(k, isik, [...kutu(X, Z, 0.4, 0.3, 0, 0.05), ...kutu(X, Z, 0.16, 0.1, 0.55, 0.62)])),
    golgeCokgen(k, isik, kutu(YAN_EV.X0 + 5.5, YAN_EV.Z0 + 4, 11, 8, 0, 8)),
  ];
  // askı halatlarının çizgi gölgeleri (rim köşesi → halka)
  const halatGolge = sepetKose(sp).ust.map((q) => { const a = golgeNokta(isik, q), b = golgeNokta(isik, [q[0] * 0.4, g.halka, q[2] * 0.4]); const z = zeminCokgen(k, [a, b, [b[0] + 0.03, b[1]], [a[0] + 0.03, a[1]]]); return z; });
  // ---- yığın (P02 krem kâğıt eşleşmesi): sepetin arkasında Z 0.5–3; şişmede kumaş kubbeye çekilir (fade yok) ----
  const yW = 3.0 * (1 - yumusak(0, 0.42, s));
  const yigin = yW > 0.05 ? (() => {
    const r = rng(157), ust: V3[] = [], n = 14;
    for (let i = 0; i <= n; i++) { const t = i / n, X = -yW + 2 * yW * t; ust.push([X, (0.12 + 0.34 * Math.sin(Math.PI * t) + 0.08 * Math.sin(t * 17 + r())) * (0.5 + 0.5 * yW / 3), 1.4 + 0.5 * Math.sin(t * 5)]); }
    const on: P[] = ust.map((q) => pr(k, ...q)), taban: P[] = [pr(k, yW, 0, 1.2), pr(k, -yW, 0, 1.2)];
    const kiv = ust.slice(1, -1).filter((_, i) => i % 2 === 0).map((q, i) => { const a = pr(k, ...q), b = pr(k, q[0] + 0.15, 0.02, 1.0); return <line key={i} x1={a[0]} y1={a[1] + 3} x2={b[0]} y2={b[1]} stroke={PAL.konturGolge} strokeWidth={2.5} />; });
    return <g><polygon points={pts([...on, ...taban])} fill={PAL.balonGolge} stroke={PAL.konturGolge} strokeWidth={3} strokeLinejoin="round" /><polygon points={pts([...on.slice(0, 8), [on[7][0], on[7][1] + 10], [on[0][0], on[0][1] + 12]])} fill={PAL.balonIsik} />{kiv}</g>;
  })() : null;
  const kenarY = 1344;
  // ---- kilit noktaları (ekran) ----
  const E = (q: P) => ekranNokta(k2, q);
  if (p < yuk.bas + 4) kilit.push({ ad: "sepet tabanı (FL)", p: E(pr(k, ...alt[0])), tur: "temas" });
  // tilt (yükseliş) başlayınca zemin kadrajın alt bandına iner: ayak/temas kilitleri yalnız kendi anlarında (tilt öncesi) denetlenir
  if (p >= coz.bas - 6 && p <= coz.bit + 4) kilit.push({ ad: "kazık başı (çözülme f112)", p: E(pr(k, ...kazikBas)), tur: "temas" });
  if (p < yuk.bas + 4) { kilit.push({ ad: "kazıkçı ayak", p: E(kzP), tur: "ayak" }); KALABALIK.forEach((q, i) => kilit.push({ ad: `kalabalık ayak ${i + 1}`, p: E(pr(k, q.X, 0, q.Z)), tur: "ayak" })); }
  if (s > 0.02) kilit.push({ ad: "küre tepe (şişme)", p: E([g.c[0], g.c[1] - g.R]), tur: "dokunus" });
  if (p >= 104 && p < yuk.bas + 4) kilit.push({ ad: "hortum yer teması", p: E(pr(k, ...yer)), tur: "temas" });
  const kisiCiz = (q: Kisi, i: number) => {
    const ppm = pxm(k, q.Z), e = ayaktaEklem(pr(k, q.X, 0, q.Z), ppm, q.H, { egim: q.egim, basKaldir: 6 * balonBak, kolAci: q.kiyafet === "cocuk" ? [10, 30] : [6 + (i % 3) * 3, 5 + (i % 2) * 6] });
    if (q.kiyafet === "cocuk") { e.el[1] = lp2(e.el[1], [e.el[1][0] - 0.12 * ppm, e.el[1][1] - 0.15 * ppm], 1); }
    return <FigurSiluet key={`k${i}`} e={e} pxm={ppm * (q.H / 1.74)} kiyafet={q.kiyafet} renk={q.seed % 2 ? "#47425c" : "#433e58"} kenar={SIL.kenar} basEgim={q.bas * balonBak} temas={[true, true]} />;
  };
  const kisiler = [...KALABALIK].sort((a, b) => b.Z - a.Z);
  return (
    <g>
      <GokBasamak ufuk={k.U} seed={158} />
      <UfukBandi seed={158} y0={1282} y1={kenarY} t={p} />
      <MeydanZemin k={k} seed={157} Zuzak={45.6} X={[-40, 40]} izler={[[-0.75, -10.5, -2.8, 45.6], [0.05, -10.5, 0, 45.6], [0.75, -10.5, 3.2, 45.6]]} />
      <polygon points={pts(zeminCokgen(k, [[-60, 30], [60, 30], [60, 45.6], [-60, 45.6]]))} fill="#cdc6d0" opacity={0.12} />
      <polyline points={pts(Array.from({ length: 28 }, (_, i) => [i * 42 - 10, kenarY + (i % 3 === 1 ? 1.5 : 0)] as P))} fill="none" stroke={PAL.kirik} strokeWidth={2} strokeDasharray="34 6 12 4" />
      <Golgeler liste={[...golgeler, ...halatGolge]} />
      <YanEv k={k} seed={162} />
      <CiplakAgac k={k} X={-7.0} Z={7.6} seed={159} />
      {kisiler.filter((q) => q.Z > 1.5).map((q) => kisiCiz(q, KALABALIK.indexOf(q)))}
      {yigin}
      {s > 0.004 && <BalonDunyaCiz k={k} b={{ s, dh: dh + ot, X: 0, Z: 0 }} gevsek={gevsek} yansima={dh < 1} />}
      {s > 0.004 && <AskiHalatlari k={k} s={sp} halkaH={g.halka} X={0} Z={0} gevsek={1 - yumusak(0.6, 0.85, s)} on={false} />}
      <Hortum k={k} n={[...zeminHortum, ...yukselen.slice(1)]} />
      {p >= 98 && p < 124 && (() => { const t = (p - 98) / 26, c = pr(k, 0, g.bogaz - 0.1, 0); return <g fill={PAL.puf}>{[0, 1, 2].map((i) => { const r0 = (6 + i * 4) * Math.sin(Math.PI * Math.min(1, t * (1.2 - i * 0.15))); return r0 > 0.5 ? <circle key={i} cx={c[0] + 14 * t + i * 9} cy={c[1] - 20 * t - i * 7} r={r0} /> : null; })}</g>; })()}
      <SepetArka k={k} s={sp} isikYuz={PAL.hasirIsik} />
      {[[-0.2, 0.1], [0.22, 0.28]].map(([X, Z], i) => { const tp = pr(k, X, dh + 1.14 + i * 0.03, Z); return <Torba key={`pc${i}`} p={tp} pxm={pxm(k, Z)} tip="cuval" ip={false} />; })}
      <SepetOn k={k} s={sp} isikYuz={PAL.hasirIsik} kamis={0.1} kontur={4} />
      <AskiHalatlari k={k} s={sp} halkaH={g.halka} X={0} Z={0} gevsek={1 - yumusak(0.6, 0.85, s)} on={true} />
      {/* kazık (ø 0.12, h 0.9): ışık sol, gölge sağ */}
      {(() => { const a = pr(k, KAZIK[0] - 0.06, 0, KAZIK[2]), b = pr(k, KAZIK[0] + 0.06, 0.9, KAZIK[2]); const w = b[0] - a[0]; return <g><rect x={a[0]} y={b[1]} width={w} height={a[1] - b[1]} fill={PAL.sandikOn} stroke={PAL.sandikDerin} strokeWidth={2.5} /><rect x={a[0] + 1.5} y={b[1]} width={w * 0.4} height={a[1] - b[1]} fill={PAL.sandikIsik} /><ellipse cx={(a[0] + b[0]) / 2} cy={b[1]} rx={w / 2} ry={w * 0.18} fill={PAL.sandikIsik} stroke={PAL.sandikDerin} strokeWidth={2} /></g>; })()}
      <HalatCiz k={k} n={ipNok} />
      {p < coz.bas && (() => { const c = pr(k, ...kazikBas), w = 0.09 * pxm(k, KAZIK[2]); return <ellipse cx={c[0]} cy={c[1] + 4} rx={w} ry={w * 0.35} fill="none" stroke={PAL.halat} strokeWidth={3} />; })()}
      <FigurSiluet e={kz} pxm={kzM * (KAZIKCI.H / 1.74)} kiyafet="isci" baslik="bere" renk="#423d57" kenar={SIL.kenar} basEgim={-8 * t01(p, coz.bit, 150)} temas={[true, true]} />
      {/* ön plan: yerde iki posta çuvalı (kontur 6 px) */}
      {[[-1.0, -7.9], [-0.6, -7.6]].map(([X, Z], i) => <Torba key={`oc${i}`} p={pr(k, X, 0.66, Z)} pxm={pxm(k, Z)} tip="cuval" ip={false} kontur={6} aci={i ? 4 : -3} />)}
    </g>
  );
};
const lerp3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

// =============================================================== YÜKLEME (P06b) — hale ===============================================================
const TORBA_X = [425, 564, 696, 813];
// B2 (eleştiri #5): torbalar kopya değil — boy ±12 %, açı ±8°, varyant (gövde/büzgü/bağ) torba başına sabit
const TORBA_OLCEK = [1.0, 0.9, 1.1, 0.94], TORBA_ACI = [-5, 3, -2, 7]; // mekanlar §2v2.6 (yukleme ekranı) → ön yüz u'su (bisection, bir kez)
const torbaU = (() => { const k = KAMERA.yukleme, s: SepetPoz = { X: 0, h: 0, Z: 0 }; return TORBA_X.map((x) => { let lo = 0, hi = 1; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (pr(k, ...onYuzNokta(s, m))[0] < x) lo = m; else hi = m; } return (lo + hi) / 2; }); })();
const TorbaSirasi: React.FC<{ k: Kam; s: SepetPoz; gizli?: boolean[]; ozel?: Record<number, { dX: number; dh: number; dZ: number; aci: number; acik?: number }>; ipYok?: boolean }> = ({ k, s, gizli = [], ozel = {}, ipYok }) => {
  const n = torbaU.map((u) => onYuzNokta(s, u));
  const ipNok = [onYuzNokta(s, 0.03), ...n, onYuzNokta(s, 0.97)];
  return (
    <g>
      {!ipYok && <polyline points={pts(ipNok.map((q) => pr(k, ...q)))} fill="none" stroke={PAL.torbaIp} strokeWidth={Math.max(2, 0.02 * pxm(k, s.Z - 0.6))} />}
      {n.map((q, i) => {
        if (gizli[i]) return null;
        const o = ozel[i];
        const v: V3 = o ? [q[0] + o.dX, q[1] + o.dh, q[2] + o.dZ] : q;
        return <Torba key={i} p={pr(k, ...v)} pxm={pxm(k, v[2])} tip="kum" aci={TORBA_ACI[i] + (o?.aci ?? 0)} acik={o?.acik ?? 0} varyant={i} olcek={TORBA_OLCEK[i]} />;
      })}
    </g>
  );
};
// Dagron (F2) biniş anahtarları (dünya; sırtı kameraya). f226 sağ ayak BL rim köşesinde (temas).
// B2: biniş noktası arka rimde, BL köşesinden %25 içeride (Dagron sepetin ARKASINDAN biner → gövdesi kadraj içinde; eski: BL köşe, gövde sol 80 px payında kesikti)
const BL_RIM: V3 = [-0.53, 0.95, 0.42];
const DG_KAY: V3 = [0.27, 0, 0.13];
const kay = (q: Poz): Poz => { const f = (v: V3): V3 => [v[0] + DG_KAY[0], v[1], v[2] + DG_KAY[2]]; const f2 = (a: [V3, V3]): [V3, V3] => [f(a[0]), f(a[1])]; return { bas: f(q.bas), boyun: f(q.boyun), omuz: f2(q.omuz), kalca: f2(q.kalca), dirsek: f2(q.dirsek), el: f2(q.el), diz: f2(q.diz), ayak: f2(q.ayak) }; };
type Poz = EklemDunya;
const dagronPoz = (f: number, A: Ar): Poz => {
  const k0: Poz = { bas: [-0.80, 1.6, 0.62], boyun: [-0.80, 1.47, 0.62], omuz: [[-1.00, 1.4, 0.64], [-0.60, 1.4, 0.6]], kalca: [[-0.88, 0.88, 0.62], [-0.72, 0.88, 0.6]], dirsek: [[-1.05, 1.12, 0.6], [-0.58, 1.15, 0.5]], el: [[-1.02, 0.88, 0.58], [-0.60, 0.99, 0.32]], diz: [[-0.88, 0.46, 0.6], [-0.72, 0.46, 0.58]], ayak: [[-0.88, 0, 0.62], [-0.72, 0, 0.6]] };
  const k1: Poz = { bas: [-0.88, 1.88, 0.55], boyun: [-0.87, 1.75, 0.55], omuz: [[-1.05, 1.67, 0.56], [-0.67, 1.69, 0.5]], kalca: [[-0.92, 1.14, 0.52], [-0.76, 1.16, 0.48]], dirsek: [[-0.95, 1.95, 0.45], [-0.60, 1.4, 0.4]], el: [[-0.72, 2.3, 0.32], [-0.64, 1.05, 0.25]], diz: [[-0.96, 0.55, 0.58], [-0.78, 1.32, 0.38]], ayak: [[-0.88, 0, 0.62], [BL_RIM[0] + 0.02, BL_RIM[1] + 0.02, BL_RIM[2]]] }; // k0 X +0.2 (Dagron ayağı yan 80 px payına giriyordu)
  const k2: Poz = { bas: [-0.72, 2.12, 0.4], boyun: [-0.72, 1.99, 0.4], omuz: [[-0.9, 1.92, 0.42], [-0.52, 1.93, 0.36]], kalca: [[-0.8, 1.42, 0.38], [-0.64, 1.42, 0.34]], dirsek: [[-0.78, 2.15, 0.3], [-0.45, 1.6, 0.25]], el: [[-0.6, 2.45, 0.2], [-0.5, 1.05, 0.1]], diz: [[-0.95, 1.2, 0.45], [-0.7, 1.12, 0.3]], ayak: [[-0.98, 0.98, 0.32], [-0.62, 0.72, 0.3]] };
  const k3: Poz = { bas: [-0.38, 1.85, 0.42], boyun: [-0.38, 1.72, 0.42], omuz: [[-0.58, 1.65, 0.44], [-0.18, 1.65, 0.4]], kalca: [[-0.46, 1.12, 0.42], [-0.3, 1.12, 0.4]], dirsek: [[-0.66, 1.4, 0.3], [-0.1, 1.38, 0.3]], el: [[-0.62, 1.05, 0.12], [0.02, 1.08, 0.12]], diz: [[-0.46, 0.66, 0.4], [-0.3, 0.66, 0.38]], ayak: [[-0.46, 0.25, 0.44], [-0.3, 0.25, 0.4]] };
  const k1r = kay(k1); k1r.ayak[1] = [BL_RIM[0] + 0.02, BL_RIM[1] + 0.02, BL_RIM[2]];
  const keys = [A.bas, A.ayak_temas ?? 226, Math.round(((A.ayak_temas ?? 226) + A.bit) / 2), A.bit], P = [kay(k0), k1r, kay(k2), k3];
  let i = 0; while (i < 2 && f > keys[i + 1]) i++;
  const t = t01(f, keys[i], keys[i + 1], INOUT);
  const L = (a: V3, b: V3): V3 => lerp3(a, b, t);
  const L2 = (a: [V3, V3], b: [V3, V3]): [V3, V3] => [L(a[0], b[0]), L(a[1], b[1])];
  const a = P[i], b = P[i + 1];
  const o: Poz = { bas: L(a.bas, b.bas), boyun: L(a.boyun, b.boyun), omuz: L2(a.omuz, b.omuz), kalca: L2(a.kalca, b.kalca), dirsek: L2(a.dirsek, b.dirsek), el: L2(a.el, b.el), diz: L2(a.diz, b.diz), ayak: L2(a.ayak, b.ayak) };
  // adım yayı: sağ ayak yerden rime giderken yukarı kavis (rim içinden geçmez)
  if (i === 0) o.ayak[1][1] += 0.25 * Math.sin(Math.PI * t);
  if (i === 1) o.ayak[0][1] += 0.35 * Math.sin(Math.PI * t);
  return o;
};
const yukleyiciPoz = (X: number, Z: number, H: number, el: [V3, V3] | null): Poz => {
  const s = H / 1.74, y = (h: number) => h * s;
  const omuz: [V3, V3] = [[X - 0.21, y(1.42), Z], [X + 0.21, y(1.42), Z]];
  const elS: [V3, V3] = el ?? [[X - 0.24, y(0.85), Z - 0.05], [X + 0.24, y(0.85), Z - 0.05]];
  const dirsek: [V3, V3] = [0, 1].map((i) => { const o = omuz[i], e = elS[i]; const yuk = e[1] > o[1] - 0.2; return [lerp(o[0], e[0], 0.5) + (yuk ? (i ? 0.12 : -0.12) : (i ? 0.03 : -0.03)), lerp(o[1], e[1], 0.5) - (yuk ? 0.05 : 0), lerp(o[2], e[2], 0.5) + 0.03] as V3; }) as [V3, V3];
  return { bas: [X, y(1.62), Z], boyun: [X, y(1.5), Z], omuz, kalca: [[X - 0.09, y(0.9), Z], [X + 0.09, y(0.9), Z]], dirsek, el: elS, diz: [[X - 0.1, y(0.48), Z], [X + 0.1, y(0.48), Z]], ayak: [[X - 0.1, 0, Z], [X + 0.1, 0, Z]] };
};

const Yukleme: React.FC<{ plan: Plan; p: number; kilit: SablonProps["kilit"]; k2: { cs: number; cx: number; cy: number }; uid: string }> = ({ plan, p, kilit, k2, uid }) => {
  const k = KAMERA.yukleme, isik: IsikAd = "haleSabah";
  const arka = param<string>(plan, "arka", "hale");
  const si = ar(obj(plan, "sandik").inis, { bas: 170, bit: 190, temas: 190 }), sc = ar(plan.parametreler?.sepet_coker, { bas: 190, bit: 210 });
  const db = ar(plan.parametreler?.dagron_biner, { bas: 212, bit: 248, ayak_temas: 226 }), hg = ar(plan.parametreler?.halat_gerilir, { bas: 248, bit: 268, temas: 262 });
  const sp: SepetPoz = { X: 0, h: 0, Z: 0 };
  // sandık: üst y 355 (havada, yükleyicilerin kollarında) → kargo üstüne oturur (inout, sonunda tok)
  const SY = { X: 0.05, Z: 0.02, yaw: 25 }, hSon = 0.64, hBas = 1.72;
  const sh = lerp(hBas, hSon, t01(p, si.bas, si.bit, Easing.bezier(0.45, 0, 0.75, 1)));
  const cokme = (1 - 0.5 * t01(p, sc.bas + 6, sc.bit)) * t01(p, sc.bas - 1, sc.bas + 3, GIRIS); // hasır bir parmak çöker, yarısı geri gelir
  const sallan = p > sc.bas && p < sc.bit + 10 ? 5 * Math.sin(((p - sc.bas) / 9) * Math.PI * 2) * Math.exp(-(p - sc.bas) / 8) : 0;
  // yükleyiciler: kollar kulplarda (f ≤ temas + 6), sonra bırakır
  const [kulpL, kulpR] = sandikKulp(SY.X, sh, SY.Z, SY.yaw);
  const birak = t01(p, si.bit + 2, si.bit + 12);
  // B2: eller sandığın ALT kenarında (başüstü taşıma, dirsek 70–100° dışa-aşağı; eski kulp tutuşu kol boyunu aşıyordu → "Z" kollar)
  const altK = (q: V3, dX: number): V3 => [q[0] + dX, sh + 0.03, q[2]];
  const y1 = yukleyiciPoz(-0.45, 1.05, 1.75, birak < 1 ? [lerp3(altK(kulpL, 0.04), [-0.7, 0.86, 1.05], birak), lerp3([-0.12, sh + 0.02, SY.Z + 0.12], [-0.2, 0.86, 1.05], birak)] : null);
  const y2 = yukleyiciPoz(0.4, 1.1, 1.68, birak < 1 ? [lerp3([0.24, sh + 0.02, SY.Z + 0.1], [0.18, 0.84, 1.1], birak), lerp3(altK(kulpR, -0.04), [0.62, 0.84, 1.1], birak)] : null);
  const dg = dagronPoz(p, db);
  const dIc = p > (db.ayak_temas ?? 226) + 6;
  // bağlama halatı: FR alt köşe → kadraj sağ-altı; gevşek (yerde kıvrık) → gergin (yerden kalkar, f262)
  const ger = t01(p, hg.bas, hg.temas ?? 262, Easing.in(Easing.quad));
  const FRa: V3 = sepetKose(sp).alt[1], cap: V3 = [1.75, 0.02, -3.15];
  const bagNok: V3[] = Array.from({ length: 21 }, (_, i) => { const t = i / 20, d = lerp3(FRa, cap, t); const kiv = (1 - ger) * 0.18 * Math.sin(t * Math.PI * 3) * (1 - t * 0.3); return [d[0] + kiv, 0.015 + ger * 0.05 * Math.sin(Math.PI * t) + (p > (hg.temas ?? 262) ? 0.01 * Math.sin(((p - (hg.temas ?? 262)) / 3) * Math.PI) * Math.exp(-(p - (hg.temas ?? 262)) / 6) : 0), d[2]] as V3; });
  // ---- gölgeler (haleSabah: (X + 1.988h, Z − 4.264h)) ----
  const golgeler: (P[] | null)[] = [
    golgeCokgen(k, isik, kutu(0, 0, 1.2, 1.2, 0, 0.95, 25)),
    golgeCokgen(k, isik, kutu(SY.X, SY.Z, 0.7, 0.45, Math.max(0.95, sh), sh + 0.45, SY.yaw)),
    golgeCokgen(k, isik, golgeFig(k, isik, -0.45, 1.05, 1.75, 0.5)), golgeCokgen(k, isik, golgeFig(k, isik, 0.4, 1.1, 1.68, 0.5)),
    golgeCokgen(k, isik, [...dg.ayak, ...dg.kalca, ...dg.omuz, dg.bas]),
    golgeCokgen(k, isik, kutu(-0.3, -2.0, 0.42, 0.3, 0, 0.5)),
    // Daguerre: sepet + 3 siluet + sandık yığını (Z ≈ 36)
    golgeCokgen(k, isik, kutu(8.4, 36.7, 1.2, 1.2, 0, 0.95, 20)),
    ...[[7.6, 37.6, 1.7], [9.25, 37.3, 1.58], [8.9, 38.2, 1.12]].map(([X, Z, H]) => golgeCokgen(k, isik, golgeFig(k, isik, X, Z, H))),
    golgeCokgen(k, isik, kutu(10.3, 35, 0.7, 0.5, 0, 0.9, 6)),
  ];
  const bagGolge = bagNok.map((q) => golgeNokta(isik, q));
  // Daguerre balonunun sağ duvardaki gölgesi (küre silueti −L boyunca X = 12.2 düzlemine) — ışık bandının içinde
  // küre silueti (ışığa dik çember) −L boyunca X = 12.2 düzlemine
  const dgKure: P[] = (() => {
    const L: V3 = [-0.413, 0.208, 0.887], up: V3 = [0, 1, 0];
    const cr = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const nm = (a: V3): V3 => { const l = Math.hypot(...a); return [a[0] / l, a[1] / l, a[2] / l]; };
    const u = nm(cr(L, up)), v = nm(cr(u, L));
    return Array.from({ length: 28 }, (_, i) => {
      const a = (i / 28) * Math.PI * 2, c: V3 = [0, 1, 2].map((j) => [8.4, 6.7, 36.7][j] + 3.3 * (u[j] * Math.cos(a) + v[j] * Math.sin(a))) as V3;
      const s = (12.2 - c[0]) / -L[0];
      return pr(k, 12.2, c[1] - L[1] * s, c[2] - L[2] * s);
    });
  })();
  const zemin = (
    <g>
      <MeydanZemin k={k} seed={157} Zuzak={80} X={[-39, 12.2]} malzeme="hale" />
      <Golgeler liste={golgeler} />
      <polyline points={pts(zeminCokgen(k, bagGolge.map((q) => q as [number, number])))} fill="none" stroke={PAL.golge} strokeWidth={4} opacity={ger > 0.05 ? 1 : 0} />
    </g>
  );
  const duvarGolge = <polygon points={pts(dgKure)} fill={PAL.kolonGolge} />;
  // ---- Daguerre (Z 36.7): balon + asma halatı + sepet + 3 siluet + sandık yığını ----
  const dk = KAMERA.yukleme, dgS: SepetPoz = { X: 8.4, h: 0, Z: 36.7, yaw: 20 }; // H2.0: X 9.4 → 8.4 (zarf sağ duvara giriyordu)
  const dgG = balonGeo(dk, { s: 1, dh: 0, X: 8.4, Z: 36.7 });
  const daguerre = (
    <g>
      <HalatCiz k={dk} n={[[8.4, 10, 36.7], [8.4, 23.3, 40]]} w={2} />
      <BalonDunyaCiz k={dk} b={{ s: 1, dh: 0, X: 8.4, Z: 36.7 }} gevsek={0} yansima={false} kontur={2.5} />
      <AskiHalatlari k={dk} s={dgS} halkaH={dgG.halka} X={8.4} Z={36.7} gevsek={0} />
      {[[9.25, 37.3, 1.58, "duz"], [8.9, 38.2, 1.12, "cocuk"]].map(([X, Z, H, ky], i) => { const ppm = pxm(dk, Z as number); return <FigurSiluet key={`dg${i}`} baslik={i ? "kasket" : "silindir"} e={ayaktaEklem(pr(dk, X as number, 0, Z as number), ppm, H as number, { egim: i ? -6 : 3 })} pxm={ppm * ((H as number) / 1.74)} kiyafet={ky as Kiyafet} renk={PAL.siluet} kenar={{ renk: PAL.kenar, dx: -1.5, dy: -1 }} />; })}
      <SepetArka k={dk} s={dgS} isikYuz={PAL.hasirIsikHale} />
      <SepetOn k={dk} s={dgS} isikYuz={PAL.hasirIsikHale} kamis={0.2} kontur={2.5} />
      {(() => { const ppm = pxm(dk, 37.6); return <FigurSiluet baslik="melon" e={ayaktaEklem(pr(dk, 7.6, 0, 37.6), ppm, 1.7, { egim: 2 })} pxm={ppm * (1.7 / 1.74)} kiyafet="palto" renk="#433e58" kenar={{ renk: PAL.kenar, dx: -1.5, dy: -1 }} />; })()}
      <Sandik k={dk} X={10.3} h={0} Z={35} yaw={6} kontur={2} /><Sandik k={dk} X={10.4} h={0.45} Z={35.1} yaw={-4} kontur={2} />
    </g>
  );
  const halkaY = pr(k, 0, 2.6, 0)[1];
  // ---- kilit ----
  const E = (q: P) => ekranNokta(k2, q);
  kilit.push({ ad: "sepet tabanı FL", p: E(pr(k, ...sepetKose(sp).alt[0])), tur: "temas" });
  kilit.push({ ad: "sandık oturma (f190)", p: E(pr(k, SY.X, hSon + 0.45, SY.Z - 0.2)), tur: "dokunus" });
  if (p >= db.bas && p <= (db.ayak_temas ?? 226) + 8) kilit.push({ ad: "biniş teması BL rim (f226)", p: E(pr(k, ...BL_RIM)), tur: "temas" });
  if (!dIc) kilit.push({ ad: "Dagron ayak", p: E(pr(k, ...dg.ayak[0])), tur: "ayak" });
  if (p >= hg.bas) kilit.push({ ad: "halat gerilme (f262)", p: E(pr(k, ...bagNok[0])), tur: "temas" });
  const gok = <GokBasamak ufuk={k.U} seed={158} />;
  // Niépce zarfı (H2.5): halka (h 2.6) → ağın h 4.5 paralel düğümlerine askı halatları; boğaz (h 2.9–3.4) kumaş tüpü zarfın önünde
  const szp = (plan.parametreler?.ikinci_balon as Record<string, unknown> | undefined)?.sarkik_zarf as { X?: number; Z?: number; seed?: number } | undefined;
  const sz = { X: szp?.X ?? -22, Z: szp?.Z ?? 65, seed: szp?.seed ?? 183 };
  const halkaGrup = (() => {
    const w = 0.45 * pxm(k, 0), c = pr(k, 0, 2.9, 0), bu = pr(k, 0, 3.4, 0);
    const dug = balonAltDugum(k, [0, 6.7, 0], 3.3, 4.5);
    return <g>
      {dug.map((q, i) => { const a = Math.atan2(q[2], q[0]), h = pr(k, Math.cos(a) * 0.45, 2.6, Math.sin(a) * 0.45), b = pr(k, ...q); return <g key={i}><line x1={h[0]} y1={h[1]} x2={b[0]} y2={b[1]} stroke={PAL.halatGolge} strokeWidth={4} /><line x1={h[0]} y1={h[1]} x2={b[0]} y2={b[1]} stroke={PAL.halat} strokeWidth={2.5} /><line x1={h[0] - 1} y1={h[1]} x2={b[0] - 1} y2={b[1]} stroke={PAL.kenar} strokeWidth={1} /></g>; })}
      {(() => { // boğaz (appendix): kumaş tüp, aşağı hafif daralır, ağzı toplanmış (düz kesik kutu değil); sol kenar ışık, 3 kıvrım
        const W = 0.25 * pxm(k, 0), y0 = bu[1], y1 = c[1], x = c[0];
        const d = `M${x - W} ${y0}C${x - W * 0.98} ${y0 + (y1 - y0) * 0.5} ${x - W * 0.8} ${y1 - 30} ${x - W * 0.74} ${y1 - 6}Q${x - W * 0.4} ${y1 + 10} ${x - W * 0.05} ${y1 + 2}Q${x + W * 0.35} ${y1 + 12} ${x + W * 0.76} ${y1 - 8}C${x + W * 0.8} ${y1 - 30} ${x + W} ${y0 + (y1 - y0) * 0.5} ${x + W} ${y0}Z`;
        return <g>
          <path d={d} fill={PAL.balonGolge} stroke={PAL.konturGolge} strokeWidth={3.5} strokeLinejoin="round" />
          <path d={`M${x - W * 0.93} ${y0}C${x - W * 0.9} ${y0 + (y1 - y0) * 0.5} ${x - W * 0.75} ${y1 - 30} ${x - W * 0.68} ${y1 - 6}`} fill="none" stroke={PAL.terminator} strokeWidth={8} />
          {[-0.45, 0.05, 0.5].map((u, i) => <path key={i} d={`M${x + u * W * 1.1} ${y0}Q${x + u * W * 0.95 + (i - 1) * 6} ${(y0 + y1) / 2} ${x + u * W * 0.75} ${y1 - 4}`} fill="none" stroke={PAL.balonTarama} strokeWidth={2.5} strokeLinecap="round" />)}
          <path d={`M${x - W * 0.74} ${y1 - 6}Q${x - W * 0.4} ${y1 + 10} ${x - W * 0.05} ${y1 + 2}Q${x + W * 0.35} ${y1 + 12} ${x + W * 0.76} ${y1 - 8}`} fill="none" stroke={PAL.konturGolge} strokeWidth={5} strokeLinecap="round" />
          <ellipse cx={x} cy={halkaY} rx={w} ry={Math.max(2, w * Math.sin((28 * Math.PI) / 180))} fill="none" stroke={PAL.halka} strokeWidth={7.5} />
          <path d={`M${x - w} ${halkaY}A${w} ${w * Math.sin((28 * Math.PI) / 180)} 0 0 0 ${x - w * 0.2} ${halkaY + w * Math.sin((28 * Math.PI) / 180) * 0.98}`} fill="none" stroke={PAL.kenar} strokeWidth={1.5} />
        </g>;
      })()}
    </g>;
  })();
  const dagronCiz = <FigurSiluet e={eklemIzdus(k, dg)} pxm={pxm(k, dg.kalca[0][2])} kiyafet="dagron" renk={PAL.dagronGolge} kenar={{ renk: PAL.kenar, dx: -3, dy: -2 }} eller manset={PAL.sepya} ten="#a8846e" temas={[dg.ayak[0][1] < 0.03, dg.ayak[1][1] < 0.03]} onBacak={dg.ayak[1][1] > 0.25 && !dIc ? 1 : undefined} />;
  return (
    <g>
      {arka === "hale" ? <HaleArka k={k} seed={181} t={p} gok={gok} uid={uid} zemin={zemin} duvarGolge={duvarGolge} /> : <g>{gok}{zemin}</g>}
      {daguerre}
      <SarkikZarf k={k} X={sz.X} Z={sz.Z} seed={sz.seed} />
      <BalonAltan k={k} c={[0, 6.7, 0]} r={3.3} />
      {halkaGrup}
      <FigurSiluet e={eklemIzdus(k, y1)} pxm={pxm(k, 1.05)} kiyafet="isci" renk="#433e58" kenar={SIL.kenar} />
      <FigurSiluet e={eklemIzdus(k, y2)} pxm={pxm(k, 1.1) * (1.68 / 1.74)} kiyafet="duz" baslik="bere" renk="#47425c" kenar={SIL.kenar} />
      <SepetArka k={k} s={sp} isikYuz={PAL.hasirIsikHale} dx={sallan} />
      {!dIc && dagronCiz}
      <g transform={`translate(${sallan} 0)`}><Sandik k={k} X={SY.X} h={sh} Z={SY.Z} yaw={SY.yaw} kontur={5} /></g>
      {dIc && dagronCiz}
      <SepetOn k={k} s={sp} isikYuz={PAL.hasirIsikHale} cokme={cokme} kamis={0.05} kontur={6} dx={sallan} torbalar={<TorbaSirasi k={k} s={sp} />} />
      <g transform={`translate(${sallan * 0.6} 0)`}><AskiHalatlari k={k} s={sp} halkaH={2.6} X={0} Z={0} gevsek={0} /></g>
      <HalatCiz k={k} n={bagNok} />
      {/* ön plan posta çuvalı (Z −2.0, sol kenarda kesik) */}
      <Torba p={pr(k, -0.3, 0.5, -2.0)} pxm={pxm(k, -2.0)} tip="cuval" ip={false} kontur={6} aci={-4} />
    </g>
  );
};

// =============================================================== GÖK (P07 A) ===============================================================
const SerbestKam = (X: number, e: number, Z: number): Kam => ({ F: 1500, X, e, Z: -Z, U: 900 });
const Gok: React.FC<{ plan: Plan; p: number; kilit: SablonProps["kilit"]; k2: { cs: number; cx: number; cy: number }; uid: string }> = ({ plan, p, kilit, k2, uid }) => {
  const arka = param<string>(plan, "arka", "hale");
  const kh = obj(plan, "gok_kamera_H"), Hk = (kh.kare as number[]) ?? [0, 158], Hm = (kh.m as number[]) ?? [60, 140];
  const H = interpolate(p, Hk, Hm, { ...cl, easing: INOUT });
  // G2 (B2): yön 310° (KB, geride kalan Paris), ışık havaGeri; geri sürüklenme (rüzgâr GD) [0, 60] m
  const geri = param<string>(plan, "isik", "haleSabah") === "havaGeri" || Number(plan.parametreler?.yon) === 310;
  const gs = (plan.parametreler?.geri_surukleme_m as number[] | undefined) ?? [0, 60];
  const drift = geri ? interpolate(p, Hk, gs, { ...cl, easing: INOUT }) : 0;
  const anitO = Number((obj(plan, "anitlar").olcek as number | undefined) ?? 1.8);
  const balonIsik = geri ? { isik: [-0.55, -0.83] as P, isikOfs: 0.55 } : {};
  const dc = ar(plan.parametreler?.duman_cizgisi, { bas: 84, bit: 108 }), kc = ar(plan.parametreler?.kure_coker, { bas: 108, bit: 150 }), sd = ar(plan.parametreler?.sepet_duser, { bas: 120, bit: 152 });
  const ib = obj(plan, "iki_balon"), dy = ar((ib.diger as Record<string, unknown> | undefined)?.yukselis, { bas: 0, bit: 106 });
  const darbe = plan.darbe?.[0];
  const fD = darbe?.kare ?? 108;
  void sd; // sepet_duser (f120–152): alçalış hız eğrisiyle (vmax) sd.bit'te alt kenardan çıkacak biçimde ayarlı
  // Niépce (sol): Z 22, merkez (300, 650 → 630); Daguerre (sağ): Z 34, merkez (790, 620 → 560 f106)
  const nK = SerbestKam(3.52, 3.03 - (20 / 68.18) * t01(p, 0, 158), 22);
  const dE0 = 0.35, dE1 = 6.7 - 340 / 44.1;
  const vmax = 38; // px/kare (hız eğrisi: 20 karede vmax'a çıkar, sonra sabit)
  const dus = p <= fD ? 0 : p <= fD + 20 ? (vmax * (p - fD) ** 2) / 40 : vmax * (10 + (p - fD - 20));
  const dK = SerbestKam(-5.67, lerp(dE0, dE1, t01(p, dy.bas, dy.bit)) + dus / 44.1, 34);
  const cokT = t01(p, kc.bas, kc.bit, Easing.out(Easing.quad));
  const delik: P = darbe ? [(darbe.x ?? 712) - 790, (darbe.y ?? 687) - 560] : [-70, 115];
  const dR = 1 - 0.18 * cokT;
  const dgG = balonGeo(dK, { s: 1, dh: 0, X: 0, Z: 0 });
  // duman çizgisi (f84–108): şehrin dışı (sağ ufuk buğusu) → isabet; sonra uçtan başlayarak parçalanır, kısalır (fade yok)
  const kaynak: P = geri ? [1150, 700] : [1150, 935], hedef: P = [dgG.c[0] + delik[0], dgG.c[1] + delik[1]];
  const ilerle = t01(p, dc.bas, dc.bit, (x) => x);
  // atış izi (B2, eleştiri #4): KOPUK pufçuk dizisi, kaynakta kalın → uca doğru incelir; balona DEĞMEDEN biter (t ≤ 0.84, ≈ 60 px önce).
  // Hortum/halat okuması olmasın: sabit kalınlıkta sürekli çizgi YOK. f84–108 uç ilerler; isabetten sonra kaynak ucundan başlayarak
  // pufçuklar yükselir, küçülür ve dağılır (fade yok, f108–150).
  const dumanCiz = p >= dc.bas && p < fD + 42 ? (() => {
    const r = rng(5), TMAX = 0.84, hd: P = [hedef[0], hedef[1]];
    const yolN = (t: number): P => { const q = lp2(kaynak, hd, t); return [q[0], q[1] - 30 * Math.sin(Math.PI * t) + 4 * Math.sin(t * 23)]; };
    const uc = TMAX * ilerle, dag = p < fD ? 0 : (p - fD) / 42;
    // 6 kopuk parça: her biri düzensiz kenarlı, uca doğru incelen şerit; aralarda boşluk; dağılırken kaynaktan başlayıp yükselir/kısalır
    const kesim = [0, 0.15, 0.31, 0.45, 0.58, 0.7, 0.8].map((v, i) => (i ? v + (r() - 0.5) * 0.03 : v));
    const parca: React.ReactNode[] = [];
    for (let i = 0; i < kesim.length - 1; i++) {
      const t0 = kesim[i] * (TMAX / 0.8), t1 = Math.min(kesim[i + 1] * (TMAX / 0.8) - 0.025, uc); if (t1 <= t0 + 0.01) continue;
      const kay = dag > 0 ? dag * 1.3 - (1 - t0 / TMAX) * 0.5 : -1; if (kay > 0.9) continue; // kaynak ucu önce dağılır
      const kis = Math.max(0, kay) * (t1 - t0) * 0.8, a0 = t0 + kis / 2, a1 = t1 - kis / 2; if (a1 <= a0 + 0.008) continue;
      const n = 8, ust: P[] = [], alt: P[] = [];
      for (let k = 0; k <= n; k++) {
        const t = lerp(a0, a1, k / n), q = yolN(t), q2 = yolN(Math.min(1, t + 0.01)), dx = q2[0] - q[0], dy = q2[1] - q[1], L = Math.hypot(dx, dy) || 1;
        const w = lerp(13, 3, t / TMAX) * (0.75 + 0.5 * r()) * Math.sin(Math.PI * (0.15 + 0.85 * (k / n))) * (1 - 0.5 * Math.max(0, dag));
        const yuk = dag * (14 + 24 * (1 - t / TMAX));
        ust.push([q[0] - (dy / L) * w, q[1] + (dx / L) * w - yuk]); alt.push([q[0] + (dy / L) * w * 0.8, q[1] - (dx / L) * w * 0.8 - yuk]);
      }
      parca.push(<polygon key={i} points={pts([...ust, ...alt.reverse()])} fill={PAL.kulIsik} stroke={PAL.kulGolge} strokeWidth={1.5} strokeLinejoin="round" />);
      if (t1 - t0 > 0.05) { const m = yolN((a0 + a1) / 2); parca.push(<path key={`g${i}`} d={`M${(m[0] + 10).toFixed(1)} ${(m[1] + 3 - dag * 20).toFixed(1)}Q${m[0].toFixed(1)} ${(m[1] + 5 - dag * 20).toFixed(1)} ${(m[0] - 12).toFixed(1)} ${(m[1] + 2 - dag * 20).toFixed(1)}`} fill="none" stroke={PAL.kulGolge} strokeWidth={1.5} />); }
    }
    return <g>{parca}</g>;
  })() : null;
  // parlama (B2): kısa kâğıt-krem yırtık diller (2–3), konturlu disk YOK; f108–114 delikten çıkar, küçülüp deliğe çekilir
  const pT = p - fD;
  const parlama = pT >= 0 && pT <= 6 ? (() => {
    const r = rng(darbe?.seed ?? 5), buyu = pT <= 2 ? GIRIS(pT / 2) : 1 - Easing.in(Easing.quad)((pT - 2) / 4);
    if (buyu < 0.05) return null;
    const c: P = [hedef[0], hedef[1] - dus];
    const diller = [-2.3, -1.2, 0.2].map((a0, i) => {
      const a = a0 + (r() - 0.5) * 0.3, L0 = (34 + r() * 22) * buyu, w = (9 + r() * 4) * buyu;
      const b: P = [c[0] + Math.cos(a) * 8, c[1] + Math.sin(a) * 8], nx = -Math.sin(a), ny = Math.cos(a);
      const u: P = [b[0] + Math.cos(a) * L0, b[1] + Math.sin(a) * L0];
      const dis = Array.from({ length: 5 }, (_, k) => { const t = (k + 1) / 6, ww = w * (1 - t) * (k % 2 ? 0.55 : 1); return [b[0] + (u[0] - b[0]) * t + nx * ww, b[1] + (u[1] - b[1]) * t + ny * ww] as P; });
      const ic = Array.from({ length: 5 }, (_, k) => { const t = (5 - k) / 6, ww = w * (1 - t) * (k % 2 ? 1 : 0.6); return [b[0] + (u[0] - b[0]) * t - nx * ww, b[1] + (u[1] - b[1]) * t - ny * ww] as P; });
      return <polygon key={i} points={pts([[b[0] + nx * w, b[1] + ny * w], ...dis, u, ...ic, [b[0] - nx * w, b[1] - ny * w]])} fill={i === 1 ? PAL.parlama : PAL.vernik} />;
    });
    return <g>{diller}</g>;
  })() : null;
  // gri-kül duman kümeleri (f112–158): tırtıklı, rüzgârla sağa, büyür, sonra ayrılıp küçülür (fade yok)
  const kul = pT >= 4 && pT < 50 ? (() => {
    const r = rng(17);
    return <g>{[0, 1, 2, 3].map((i) => {
      const t = (pT - 4 - i * 3) / 44; if (t <= 0 || t >= 1) return null;
      const buy = Math.sin(Math.PI * Math.pow(t, 0.7)), rr = (18 + 10 * i) * buy;
      if (rr < 1.5) return null;
      const c: P = [hedef[0] + 30 * i - 10 + 140 * t, hedef[1] - 30 - 18 * i - 160 * t - dus * 0.0 + 60 * t * t];
      const kenar: P[] = Array.from({ length: 14 }, (_, j) => { const a = (j / 14) * Math.PI * 2, q = rr * (j % 2 ? 0.86 : 1.06 + 0.08 * r()); return [c[0] + Math.cos(a) * q * 1.2, c[1] + Math.sin(a) * q]; });
      return <g key={i}><polygon points={pts(kenar)} fill={PAL.kulIsik} stroke={PAL.kulGolge} strokeWidth={2} strokeLinejoin="round" /><path d={`M${c[0] - rr * 0.6} ${c[1] + rr * 0.3}Q${c[0]} ${c[1] + rr * 0.7} ${c[0] + rr * 0.7} ${c[1] + rr * 0.25}`} fill="none" stroke={PAL.kulGolge} strokeWidth={3} /><path d={`M${c[0] - rr * 1.1} ${c[1]}A${rr} ${rr} 0 0 1 ${c[0] - rr * 0.2} ${c[1] - rr * 0.95}`} fill="none" stroke={PAL.kenar} strokeWidth={2} /></g>;
    })}</g>;
  })() : null;
  const puf = pT >= 2 && pT < 26 ? (() => { const t = (pT - 2) / 24, c: P = [hedef[0] - 20, hedef[1] - dus + 10]; return <g fill={PAL.puf}>{[0, 1].map((i) => { const rr = (10 + i * 6) * Math.sin(Math.PI * t); return rr > 1 ? <circle key={i} cx={c[0] - 20 * t - i * 12} cy={c[1] - 26 * t - i * 8} r={rr} /> : null; })}</g>; })() : null;
  // şehirden iki ince baca dumanı (D 500 / 800)
  const dgGor = p < fD + 52;
  const E = (q: P) => ekranNokta(k2, q);
  if (pT >= -2 && pT < 30) kilit.push({ ad: "darbe (isabet)", p: E([hedef[0], hedef[1] - dus]), tur: "dokunus" });
  kilit.push({ ad: "Niépce sepeti", p: E(pr(nK, 0, 0, 0)), tur: "kurulum" });
  const nS: SepetPoz = { X: 0, h: 0, Z: 0 }, dS: SepetPoz = { X: 0, h: 0, Z: 0, yaw: 20 };
  const nG = balonGeo(nK, { s: 1, dh: 0, X: 0, Z: 0 });
  return (
    <g>
      {geri ? <HavadanParis H={H} drift={drift} U={900} seed={173} isik="havaGeri" anitOlcek={anitO} uid={uid} /> : <><GokBasamak ufuk={900} seed={158} /><HavadanSehir H={H} U={900} seed={173} isik="haleSabah" raylar={arka === "hale"} uid={uid} /></>}
      {dumanCiz}
      {dgGor && (
        <g>
          <AskiHalatlari k={dK} s={dS} halkaH={dgG.halka} X={0} Z={0} gevsek={cokT * 0.6} />
          <SepetArka k={dK} s={dS} isikYuz={PAL.hasirIsikHale} />
          <SepetOn k={dK} s={dS} isikYuz={PAL.hasirIsikHale} kamis={0.2} kontur={2.5} />
          <BalonDunyaCiz k={dK} b={{ s: 1, dh: 0, X: 0, Z: 0, coker: p >= fD ? { t: cokT, delik: [delik[0] * dR, delik[1] * dR], seed: 41 } : undefined }} gevsek={cokT} yansima={false} kontur={3} ek={p >= fD ? { R: dgG.R * dR, dolu: 1 - 0.65 * cokT, kivrim: 7 * cokT, ...balonIsik } : balonIsik} />
        </g>
      )}
      {puf}{parlama}{kul}
      <AskiHalatlari k={nK} s={nS} halkaH={nG.halka} X={0} Z={0} gevsek={0} />
      <SepetArka k={nK} s={nS} isikYuz={PAL.hasirIsikHale} />
      <SepetOn k={nK} s={nS} isikYuz={PAL.hasirIsikHale} kamis={0.15} kontur={3} torbalar={<TorbaSirasi k={nK} s={nS} />} />
      <BalonDunyaCiz k={nK} b={{ s: 1, dh: 0, X: 0, Z: 0 }} gevsek={0} yansima={false} kontur={3.5} ek={balonIsik} />
    </g>
  );
};

// =============================================================== SEPET (P07 B) ===============================================================
const Sepet: React.FC<{ plan: Plan; p: number; kilit: SablonProps["kilit"]; k2: { cs: number; cx: number; cy: number }; uid: string }> = ({ plan, p, kilit, k2, uid }) => {
  const k = KAMERA.sepet;
  const arka = param<string>(plan, "arka", "hale");
  const t1 = ar(plan.parametreler?.torba_1, { bas: 186, bit: 232, birakma: 196 }), t2 = ar(plan.parametreler?.torba_2, { bas: 204, bit: 252, birakma: 214 });
  const ss = ar(plan.parametreler?.sepet_sicrama, { bas: 232, bit: 252 }), hgv = ar(plan.parametreler?.halat_gevse, { bas: 236, bit: 256 });
  const kh = obj(plan, "sepet_kamera_H"), Hk = (kh.kare as number[]) ?? [250, 320], Hm = (kh.m as number[]) ?? [150, 300];
  const H = interpolate(p, Hk, Hm, { ...cl, easing: INOUT });
  // sıçrama: kamera sepeti 4 kare gecikmeyle izler → sepet ekranda −36 px, yaylı geri (dekor = ekran / cs)
  const sicra = p < ss.bas ? 0 : p < ss.bas + 4 ? -36 * GIRIS((p - ss.bas) / 4) : -36 * Math.cos(((p - ss.bas - 4) / 16) * Math.PI * 1.5) * Math.exp(-(p - ss.bas - 4) / 6);
  const sy = sicra / k2.cs;
  // sepet_x (B2 netleştirme): sepet + Dagron + torbalar + halatların DEKOR px yatay kayması (cs 1 ekranı; dünyada ≈ yanal kayma, arka plan kaymaz)
  const sx = Number(plan.parametreler?.sepet_x ?? 0);
  // yükseliş (B2, eleştiri bulgu 4): balast atıldıktan sonra sepet kadrajda yukarı kayar (kamera geride kalır) + şehir alçalır (H 150→300).
  // yukselis.bas–bit içinde inout; kayma dekor px (≥ 80 ekran px ölçütü)
  const yu = ar(plan.parametreler?.yukselis, { bas: 250, bit: 320 }), yukPx = Number((obj(plan, "yukselis").kadraj_px as number | undefined) ?? -90);
  const yk = yukPx * t01(p, yu.bas, yu.bit, INOUT) / k2.cs;
  const gevsek = p < hgv.bas ? 0 : Math.sin(Math.PI * t01(p, hgv.bas, hgv.bit, (x) => x)) * 1;
  const sp: SepetPoz = { X: 0, h: 0, Z: 0 };
  // torba düşüşü (dünya, yerçekimi; v0 0.5 m/s aşağı), 1 tur döner; kum izi 20 kare
  const dus = (rel: number) => { const t = Math.max(0, (p - rel) / 60); return { dh: -(0.5 * t + 4.905 * t * t), aci: (200 * t) / 0.6, t }; };
  const tor = (i: number, A: Ar) => { const b = A.birakma ?? A.bas + 10; if (p < b) return null; const d = dus(b); return { dX: 0.02 * d.t, dh: d.dh, dZ: -0.04 * d.t, aci: d.aci, acik: 1 }; };
  const o3 = tor(3, t1), o2 = tor(2, t2);
  const ozel: Record<number, { dX: number; dh: number; dZ: number; aci: number; acik?: number }> = {};
  if (o3) ozel[3] = o3; if (o2) ozel[2] = o2;
  const gizli = [false, false, !!o2 && o2.dh < -3.2, !!o3 && o3.dh < -3.2];
  const kumIz = [[3, t1], [2, t2]].map(([i, A]) => {
    const b = (A as Ar).birakma ?? 0; if (p < b || p > b + 40) return null;
    const ag = onYuzNokta(sp, torbaU[i as number]);
    const noktalar: P[] = [];
    for (let j = 0; j < 18; j++) { const tau = b + j * 1.1; if (tau > p || tau > b + 20) break; const dt = (p - tau) / 60, dd = dus(b); void dd; const t0 = (tau - b) / 60; const h0 = ag[1] - (0.5 * t0 + 4.905 * t0 * t0) + 0.04, v0 = 0.5 + 9.81 * t0; const h = h0 - 0.6 * v0 * dt - 0.5 * 4.905 * dt * dt; noktalar.push(pr(k, ag[0] + 0.01, h, ag[2] - 0.04)); }
    return <g key={`kz${i}`}>{noktalar.map((q, j) => <g key={j}><circle cx={q[0]} cy={q[1] + sy} r={3.2} fill={PAL.kumIz} /><circle cx={q[0] + 2.5} cy={q[1] + sy + 0.5} r={1.2} fill={PAL.golge} /></g>)}</g>;
  });
  // Dagron (kontrajur, kameraya dönük, sepetin içinde sağ-önde, rimden eğilmiş): baş sola döner (f164–184), sağ kol torba 4 → torba 3 → rim
  const dn = (h: number) => h;
  const basDon = t01(p, 164, 184);
  const t4 = onYuzNokta(sp, torbaU[3]), t3 = onYuzNokta(sp, torbaU[2]);
  const elHedef: V3 = p < (t1.bas) ? [0.62, 0.99, -0.5] : p < (t1.birakma ?? 196) + 2 ? lerp3([0.62, 0.99, -0.5], [t4[0] - 0.01, t4[1] + 0.02, t4[2] - 0.02], t01(p, t1.bas, (t1.birakma ?? 196) - 2)) : p < (t2.birakma ?? 214) + 2 ? lerp3([t4[0], t4[1] + 0.08, t4[2]], [t3[0] - 0.01, t3[1] + 0.02, t3[2] - 0.02], t01(p, (t1.birakma ?? 196) + 3, (t2.birakma ?? 214) - 2)) : lerp3([t3[0], t3[1] + 0.06, t3[2]], [0.62, 0.99, -0.5], t01(p, (t2.birakma ?? 214) + 4, (t2.birakma ?? 214) + 22));
  const D: EklemDunya = {
    bas: [0.48 - 0.04 * basDon, dn(1.3), 0.0], boyun: [0.48, 1.18, 0.02],
    omuz: [[0.27, 1.12, 0.06], [0.69, 1.12, 0.0]], kalca: [[0.38, 0.82, 0.32], [0.58, 0.82, 0.3]],
    dirsek: [[0.15, 0.98, -0.25], [0.8, 1.02, -0.35]], el: [[0.12, 0.99, -0.62], elHedef],
    diz: [[0.38, 0.45, 0.2], [0.58, 0.45, 0.18]], ayak: [[0.38, 0.05, 0.42], [0.58, 0.05, 0.4]],
  };
  const dE = eklemIzdus(k, D);
  dE.dirsek[1] = ik2(dE.omuz[1], dE.el[1], 0.3 * pxm(k, -0.2), 0.3 * pxm(k, -0.3), 1);
  const E = (q: P) => ekranNokta(k2, q);
  if (p < (t2.birakma ?? 214) + 4) kilit.push({ ad: "torba ağzı (el)", p: E([dE.el[1][0] + sx, dE.el[1][1] + sy]), tur: "dokunus" });
  // 4. torbanın sağ kenarı (dokunuş nesnesi; IG sağ sütun dışında kalmalı)
  if (p <= (t1.birakma ?? 196) + 6) { const q = onYuzNokta(sp, torbaU[3]); const c0 = pr(k, ...q); kilit.push({ ad: "torba 4 sağ kenar", p: E([c0[0] + 0.15 * pxm(k, q[2]) * TORBA_OLCEK[3] + sx, c0[1] + 0.3 * pxm(k, q[2]) + sy]), tur: "dokunus" }); }
  const ust = sepetKose(sp).ust;
  const halatlar = <g>{ust.map((q, i) => { const a = pr(k, ...q), b = pr(k, q[0] * 0.3, 2.7, q[2] * 0.3); const m: P = [(a[0] + b[0]) / 2 + gevsek * 30 * (i % 2 ? 1 : -1), (a[1] + b[1]) / 2]; return <path key={i} d={`M${a[0]} ${a[1] + sy}Q${m[0]} ${m[1] + sy} ${b[0]} ${b[1] + sy}`} fill="none" stroke={PAL.halat} strokeWidth={5} />; })}</g>;
  return (
    <g>
      {arka === "hale" ? <HavadanParis H={H} zeminUstu={0} U={k.U} seed={177} isik="haleSabah" imza={false} gokIsima uid={uid} /> : <><GokBasamak ufuk={k.U} seed={158} /><HavadanSehir H={H} U={k.U} seed={173} isik="haleSabah" raylar={false} uid={uid} /></>}
      <g transform={`translate(${sx} ${yk})`}>
      <g transform={`translate(0 ${sy})`}>
        <SepetArka k={k} s={sp} isikYuz={PAL.hasirIsikHale} />
        <Sandik k={k} X={0.05} h={0.6} Z={0.02} yaw={25} kontur={5} />
        <FigurSiluet e={dE} pxm={pxm(k, 0.1)} kiyafet="dagron" renk={PAL.dagronGolge} kenar={{ renk: PAL.kenar, dx: -3, dy: -2 }} eller manset={PAL.sepya} ten="#8f7064" basEgim={-12 * basDon} kolGizle={[false, true]} />
        <SepetOn k={k} s={sp} isikYuz={PAL.hasirIsikHale} kamis={0.05} kontur={6} torbalar={<TorbaSirasi k={k} s={sp} gizli={[false, false, true, true]} />} />
      </g>
      {/* düşen torbalar sepetle birlikte sıçramaz / yükselmez (bırakıldı): yükseliş kaymasını geri al */}
      <g transform={`translate(0 ${-yk})`}><TorbaSirasi k={k} s={sp} gizli={[true, true, !o2 || gizli[2], !o3 || gizli[3]]} ozel={ozel} ipYok />{kumIz}</g>
      {[2, 3].map((i) => (i === 2 ? !o2 : !o3) && <g key={`as${i}`} transform={`translate(0 ${sy})`}><TorbaSirasiTek k={k} s={sp} i={i} /></g>)}
      <g transform={`translate(0 ${sy})`}>
        {/* uzanan kol sepet duvarının ÖNÜNDE (dışarıda) */}
        <FigurKol e={dE} pxm={pxm(k, -0.3)} />
        {halatlar}
      </g>
      </g>
    </g>
  );
};
const TorbaSirasiTek: React.FC<{ k: Kam; s: SepetPoz; i: number }> = ({ k, s, i }) => { const q = onYuzNokta(s, torbaU[i]); return <Torba p={pr(k, ...q)} pxm={pxm(k, q[2])} tip="kum" aci={TORBA_ACI[i]} varyant={i} olcek={TORBA_OLCEK[i]} />; };
/** yalnız sağ kol (omuz → dirsek → el + manşet + el): kontrajur, rim ön kenarının önünde */
const FigurKol: React.FC<{ e: Eklem; pxm: number }> = ({ e, pxm: m }) => {
  const o = e.omuz[1], d = e.dirsek[1], h = e.el[1];
  const kol = (a: P, b: P, wa: number, wb: number) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L; return pts([[a[0] + nx * wa / 2, a[1] + ny * wa / 2], [b[0] + nx * wb / 2, b[1] + ny * wb / 2], [b[0] - nx * wb / 2, b[1] - ny * wb / 2], [a[0] - nx * wa / 2, a[1] - ny * wa / 2]]); };
  const a = (Math.atan2(h[1] - d[1], h[0] - d[0]) * 180) / Math.PI;
  const sekil = <><polygon points={kol(lp2(o, d, 0.55), d, 0.1 * m, 0.095 * m)} /><circle cx={d[0]} cy={d[1]} r={0.048 * m} /><polygon points={kol(d, h, 0.095 * m, 0.08 * m)} /></>;
  return (
    <g>
      <g fill="#2a2638" stroke="#2a2638" strokeWidth={5} strokeLinejoin="round">{sekil}</g>
      <g fill={PAL.kenar} transform="translate(-3 -2)">{sekil}</g>
      <g fill={PAL.dagronGolge}>{sekil}</g>
      <g transform={`translate(${h[0]} ${h[1]}) rotate(${a - 90}) scale(${m * 0.8})`}>
        <rect x={-0.05} y={-0.06} width={0.1} height={0.05} rx={0.01} fill={PAL.sepya} />
        <path d="M-0.042 -0.012 C-0.05 0.05 -0.035 0.1 0 0.105 C0.035 0.1 0.05 0.05 0.042 -0.012 Z M0.04 0.0 C0.07 0.02 0.075 0.045 0.06 0.06 L0.035 0.04 Z" fill="#8f7064" stroke="#4a3a40" strokeWidth={0.006} />
      </g>
    </g>
  );
};

// =============================================================== ŞABLON ===============================================================
const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const uid = "mm" + useId().replace(/:/g, "");
  const gorunum = param<string>(plan, "gorunum", "meydan");
  const k = kameraHesapla(plan.kamera, p);
  // darbe sarsıntısı (tasarım §5: kamera ≤ 3 px, 12 kare; tepki, patlama sarsıntısı değil)
  const d = plan.darbe?.[0];
  const sar = d && p >= d.kare && p < d.kare + 12 ? 3 * (1 - (p - d.kare) / 12) : 0;
  const sx = sar * Math.sin((p - (d?.kare ?? 0)) * 2.1), sy = sar * 0.7 * Math.cos((p - (d?.kare ?? 0)) * 2.7);
  const V = gorunum === "yukleme" ? Yukleme : gorunum === "gok" ? Gok : gorunum === "sepet" ? Sepet : Meydan;
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        <g transform={`translate(${sx} ${sy}) ${katDonusum(k)}`}>
          <V plan={plan} p={p} kilit={kilit} k2={k} uid={uid} />
        </g>
      </RenkKaydi>
    </svg>
  );
};
const arsiv = () => "litografi" as const;
/** darbeKendi: P07 darbesi şablonda (KE-PK-E1); Bolum'un genel çizgi roman darbesi ve sarsıntısı bu şablonda çizilmez */
export const MONTMARTRE: Sablon & { darbeKendi: true } = { Sahne, arsiv, darbeKendi: true };
export type { Kisi };
void yolAcik;
