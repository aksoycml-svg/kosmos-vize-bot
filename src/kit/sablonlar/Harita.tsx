// ===== HARITA şablonu (blanc/Harita.tsx'in parametrik hâli) =====
// Parşömen üzerinde Fransa (Natural Earth sadeleştirilmiş), dönem rotası, isteğe bağlı üç vuruş:
//  posta {bas, bit}: posta arabası rota boyunca; sayaç "N. GÜN" + gün/ay diski (SVG ikon; font dışı glif YOK)
//  telgraf {bas, bit, kule}: hat boyunca ışık sinyali, kule ikonları sırayla yanar; sayaç "N SAAT" + T ikonu
//  K4 (v4 P03) harita_cift_sayac: posta ve telgraf İKİ AYRI sayaç kutusu (üstte telgraf "N SAAT", altta posta "N. GÜN"); her kutu
//  kendi vuruşunun bas karesinde sağ kenardan kayarak girer ve plan sonuna kadar son değerinde kalır (karşılaştırma okunur).
//  Vuruşlar art arda ya da üst üste koşabilir; sıra anlatımla aynı verilir (ör. önce telgraf, sonra posta).
//  posta.gun / telgraf.saat vuruş içinde de verilebilir (plan düzeyi `gun`/`saat` yerine).
//  muhur {kare, metin}: kırmızı mühür iner (ölçek 2.4 → 1, temas = kare) — kırmızı yalnız burada
// Gece karartma katmanı YOK (kural): posta gününü sayaçtaki gün/ay diski anlatır.
import React from "react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import geo from "../../bolumler/blanc/fransa.json";
import { mono, serif } from "../../theme";
import { cl, GIRIS, kameraHesapla, KameraDurum } from "../zaman";
import type { Plan } from "../tipler";
import { param, Sablon, SablonProps } from "../ortak";
import { ParisCevreSahne } from "./harita/ParisCevre";
import { BalonIkon, Golgeli, ToursIkon, YiginIkon } from "./harita/ikonlar";
import { PK } from "./harita/parisCevre";

const K = 70, X0 = -5.4, Y0 = 51.3, YS = 1.45, OX = 70, OY = 400;
const pj = (lon: number, lat: number): [number, number] => [OX + (lon - X0) * K, OY + (Y0 - lat) * K * YS];
const polys: string[] = [];
type Geo = { type: string; geometry?: { type: string; coordinates: number[][][] | number[][][][] }; features?: Geo[] };
const g0 = geo as unknown as Geo;
for (const f of g0.type === "Feature" ? [g0] : g0.features ?? []) {
  const g = f.geometry!;
  const rings = (g.type === "Polygon" ? [(g.coordinates as number[][][])[0]] : (g.coordinates as number[][][][]).map((q) => q[0])) as number[][][];
  for (const r of rings) polys.push("M" + r.map(([lo, la]) => pj(lo, la).map((v) => v.toFixed(1)).join(",")).join("L") + "Z");
}
const FR = polys.join(" ");

export const ROTALAR: Record<string, [string, number, number, boolean][]> = {
  "paris-bordeaux": [
    ["PARIS", 2.35, 48.86, true], ["Chartres", 1.49, 48.44, false], ["Châteaudun", 1.33, 48.07, false], ["Vendôme", 1.07, 47.79, false],
    ["TOURS", 0.69, 47.39, true], ["Châtellerault", 0.55, 46.82, false], ["Poitiers", 0.34, 46.58, false], ["Angoulême", 0.16, 45.65, false],
    ["Barbezieux", -0.15, 45.47, false], ["BORDEAUX", -0.58, 44.84, true],
  ],
};
type RotaNokta = [string, number, number, boolean];
const rotaYol = (ad: string, ozel?: RotaNokta[]) => {
  const R = ozel?.length ? ozel : ROTALAR[ad] ?? ROTALAR["paris-bordeaux"];
  const PTS = R.map(([, lo, la]) => pj(lo, la));
  const SEG = PTS.slice(1).map((q, i) => Math.hypot(q[0] - PTS[i][0], q[1] - PTS[i][1]));
  const TOT = SEG.reduce((a, b) => a + b, 0);
  const at = (q: number): [number, number] => {
    let d = q * TOT;
    for (let i = 0; i < SEG.length; i++) { if (d <= SEG[i]) { const t = d / SEG[i]; return [PTS[i][0] + (PTS[i + 1][0] - PTS[i][0]) * t, PTS[i][1] + (PTS[i + 1][1] - PTS[i][1]) * t]; } d -= SEG[i]; }
    return PTS[PTS.length - 1];
  };
  // KT-3: her noktanın rota üzerindeki oranı (şehir etiketi çizgi oraya varınca belirir)
  const ORAN = PTS.map((_, i) => SEG.slice(0, i).reduce((a, b) => a + b, 0) / Math.max(1e-6, TOT));
  return { R, at, ORAN, YOL: "M" + PTS.map((q) => q.join(",")).join(" L") };
};

// ===== KT-3 rota çizimi + kamera takibi + iğne (teknik fikir: claude-animation-skills map-route, MIT © 2026 Artem Novitckii) =====
// rota_noktalar: [[ad, lon, lat, buyuk], ...] (ROTALAR yerine) · rota_ciz {bas, bit}: mürekkep çizgi kendini çizer (inout), uçta divit
// noktası; şehir adı çizgi oraya varınca belirir · kamera_takip {kare:[a,b], cs, ekran:[x,y], gecis 20}: kamera rota ucunu ekranda
// sabit noktada tutar (plan kamerasından GIRIS ile bağlanır, b'den sonra uç durur, kamera da) · igne {kare, dusme 14}: pirinç başlı
// harita iğnesi rota sonuna yerçekimiyle düşer, kare = batma TEMASI (temaslar'a "igne-tak"), bir küçük sekme, temas gölgesi.
// KE-PK-H4 (Paris tur-17): rota_ciz.q0 = başlangıç oranı (sayı ya da "ORAN[i]": f0'da ilk i segment çizili gelir).
// gizli_segment {bas, bit} + rota_segment_stil: ilk "noktali" segment kendi zaman aralığında çizilir (önceki segmentler rota_ciz.bas → gizli.bas).
type RotaCiz = { bas: number; bit: number; q0?: number | string };
type Takip = { kare: [number, number]; cs: number; ekran?: [number, number]; gecis?: number };
type Igne = { kare: number; dusme?: number; renk?: "pirinc" | "murekkep" }; // renk "murekkep" (Paris): baş #1c1915, hilal #6d6a63 — varsayılan pirinç (Blanc)
const rotaPlan = (plan: Plan) => rotaYol(param<string>(plan, "rota", "paris-bordeaux"), param<RotaNokta[] | undefined>(plan, "rota_noktalar", undefined));
const q0Coz = (v: number | string | undefined, ORAN: number[]) => {
  if (typeof v === "number") return v;
  const m = typeof v === "string" ? /ORAN\[(\d+)\]/.exec(v) : null;
  return m ? ORAN[Math.min(ORAN.length - 1, +m[1])] : 0;
};
const segStil = (plan: Plan) => param<("dolu" | "noktali")[] | null>(plan, "rota_segment_stil", null);
const rotaIlerleme = (plan: Plan, p: number) => {
  const rc = param<RotaCiz | null>(plan, "rota_ciz", null);
  if (!rc) return 1;
  const e = { ...cl, easing: Easing.inOut(Easing.cubic) };
  if (rc.q0 === undefined && !param(plan, "gizli_segment", null)) return interpolate(p, [rc.bas, rc.bit], [0, 1], e);
  const { ORAN } = rotaPlan(plan), q0 = q0Coz(rc.q0, ORAN);
  const gs = param<{ bas: number; bit: number } | null>(plan, "gizli_segment", null), j = (segStil(plan) ?? []).indexOf("noktali");
  if (gs && j > 0) return p < gs.bas ? interpolate(p, [rc.bas, gs.bas], [q0, ORAN[j]], e) : interpolate(p, [gs.bas, gs.bit], [ORAN[j], 1], e);
  return interpolate(p, [rc.bas, rc.bit], [q0, 1], e);
};
export const haritaKamera = (plan: Plan, p: number): KameraDurum => {
  const k0 = kameraHesapla(plan.kamera, p);
  const tk = param<Takip | null>(plan, "kamera_takip", null);
  if (!tk) return k0;
  const { at } = rotaPlan(plan);
  const uc = at(rotaIlerleme(plan, Math.min(p, tk.kare[1])));
  const E = tk.ekran ?? [540, 900];
  const kt = { cs: tk.cs, cx: E[0] - 540 - (uc[0] - 540) * tk.cs, cy: E[1] - 960 - (uc[1] - 960) * tk.cs };
  const w = GIRIS(interpolate(p, [tk.kare[0], tk.kare[0] + (tk.gecis ?? 20)], [0, 1], cl));
  return { cs: k0.cs + (kt.cs - k0.cs) * w, cx: k0.cx + (kt.cx - k0.cx) * w, cy: k0.cy + (kt.cy - k0.cy) * w };
};
// iğnenin dekor noktası (rota sonu) — kart (yazı katmanı) buna bağlanır
export const igneNokta = (plan: Plan): [number, number] | null => {
  if (!param<Igne | null>(plan, "igne", null)) return null;
  const { R } = rotaPlan(plan);
  const s = R[R.length - 1];
  return pj(s[1], s[2]);
};
const IgneCiz: React.FC<{ x: number; y: number; ig: Igne; p: number }> = ({ x, y, ig, p }) => {
  const n = ig.dusme ?? 14, t = p - ig.kare;
  if (t < -n) return null;
  // düşüş: yerçekimi (in quad) 140 px yükseklikten; temas sonrası 8 karelik tek sekme (8 px)
  const h = t < 0 ? 140 * Easing.in(Easing.quad)(-t / n) : t < 8 ? 8 * Math.sin((Math.PI * t) / 8) : 0;
  const ezil = t >= 0 && t < 4 ? 1 - 0.12 * Math.sin((Math.PI * t) / 4) : 1;
  const gol = interpolate(h, [0, 140], [1, 0.35], cl);
  return (
    <g>
      {/* temas gölgesi: harita ışığı sol-üstten (parşömen dokusuyla aynı) → gölge sağ-alta */}
      <ellipse cx={x + 6 + h * 0.25} cy={y + 3 + h * 0.12} rx={14 * gol + 4} ry={5 * gol + 2} fill={INK} opacity={0.35 * gol} />
      <g transform={`translate(${x},${y - h}) scale(${1 / Math.sqrt(ezil)},${ezil})`}>
        <line x1={0} y1={0} x2={0} y2={-46} stroke="#3a3128" strokeWidth={4} strokeLinecap="round" />
        <circle cx={0} cy={-52} r={17} fill={ig.renk === "murekkep" ? PK.murekkep : "#b8862b"} stroke={INK} strokeWidth={4} />
        <circle cx={-5} cy={-57} r={5} fill={ig.renk === "murekkep" ? PK.hilal : "#e7c98a"} />
      </g>
    </g>
  );
};

const INK = "#2b1d10";
// ikonlar (font dışı glif yerine SVG): güneş, ay, Chappe T
const Gunes: React.FC = () => <g><circle r={13} fill="#e7c37a" />{Array.from({ length: 8 }).map((_, i) => { const a = (i * Math.PI) / 4; return <line key={i} x1={Math.cos(a) * 17} y1={Math.sin(a) * 17} x2={Math.cos(a) * 24} y2={Math.sin(a) * 24} stroke="#e7c37a" strokeWidth={3.5} strokeLinecap="round" />; })}</g>;
// K4: hilal (eski iç yay yarıçapı kirişten küçüktü → SVG onu büyütüp sıfır alan çiziyordu; ay görünmüyordu)
const Ay: React.FC = () => <path d="M 6 -18 A 18 18 0 1 0 6 18 A 22 22 0 0 1 6 -18 Z" fill="#cfd6e6" />;
const TIkon: React.FC<{ renk: string }> = ({ renk }) => <g stroke={renk} strokeLinecap="round"><line x1={0} y1={22} x2={0} y2={-14} strokeWidth={4} /><line x1={-20} y1={-14} x2={20} y2={-14} strokeWidth={6} /><line x1={-20} y1={-14} x2={-20} y2={-2} strokeWidth={4} /><line x1={20} y1={-14} x2={20} y2={-26} strokeWidth={4} /></g>;

const KuleIkon: React.FC<{ x: number; y: number; on: number }> = ({ x, y, on }) => (
  <g transform={`translate(${x},${y})`}>
    <circle r={34} fill={`rgba(255,179,87,${0.55 * on})`} style={{ filter: "blur(8px)" }} />
    <rect x={-8} y={-6} width={16} height={14} fill="#3a2a1a" />
    <rect x={-1.5} y={-34} width={3} height={30} fill="#2a1d12" />
    <rect x={-15} y={-37} width={30} height={4} fill="#2a1d12" />
    <rect x={-16} y={-37} width={3} height={12} fill="#2a1d12" />
    <rect x={13} y={-45} width={3} height={12} fill="#2a1d12" />
  </g>
);

type Vurus = { bas: number; bit: number; kule?: number; gun?: number; saat?: number };
const SayacKutu: React.FC<{ y: number; giris: number; ikon: React.ReactNode; metin: string; sag?: number }> = ({ y, giris, ikon, metin, sag = 80 }) => (
  <div style={{ position: "absolute", right: sag, top: y, transform: `translateX(${(1 - giris) * 700}px)`, display: "flex", alignItems: "center", gap: 18, fontFamily: mono, fontSize: 44, letterSpacing: 4, padding: "12px 26px", color: "#f1e4c4", background: "rgba(30,18,8,0.88)", border: "2px solid #b8862b" }}>
    <svg width={52} height={52} viewBox="-26 -26 52 52">{ikon}</svg>{metin}
  </div>
);
// ===== KE-PK-H4 Fransa görünümü ekleri (mekanlar §5H.5-H…L; yalnız parametre verilince — Blanc/Evliya değişmez) =====
// paris_halka_kucuk {yaricap_px, cizgi_px, cubuk{adet, boyut_px}} · tours_ikon {bina_ekran_px, yigin_ekran_px, ciz{bas,bit}} ·
// prusya_bolgesi {renk, poligon [[lon,lat]...]} · balon_ikon_inis {bas, bit, ikon_px} · sepet_yatik_ikon {bas, bit, devrilme_derece} ·
// harita_gorunum "fransa": kara taraması 2.5 px α .22 aralık 9 (360'ta görünür); paris_halka_kucuk / tours_ikon verilmezse kalıcı durum
// olarak hazır çizilir (§5H.5-H: "P06/P08'in ilk karesinden itibaren oturmuş"). Ölçüler "ekran px" → dekor = ekran ÷ takip cs.
const ekranCs = (plan: Plan) => param<Takip | null>(plan, "kamera_takip", null)?.cs ?? kameraHesapla(plan.kamera, 0).cs;
type KucukHalka = { yaricap_px?: number; cizgi_px?: number; cubuk?: { adet?: number; boyut_px?: [number, number] } };
type ToursIk = { bina_ekran_px?: [number, number]; yigin_ekran_px?: number; ciz?: { bas: number; bit: number } };
const fransaMi = (plan: Plan) => param<string>(plan, "harita_gorunum", "") === "fransa";
const kucukHalka = (plan: Plan): KucukHalka | null => param<KucukHalka | false | null>(plan, "paris_halka_kucuk", null) || (fransaMi(plan) ? {} : null);
const toursIk = (plan: Plan): ToursIk | null => param<ToursIk | false | null>(plan, "tours_ikon", null) || (fransaMi(plan) ? {} : null);
const tikBandi = (P: [number, number][], ara = 8, boy = 10): string => {
  const cx = P.reduce((a, q) => a + q[0], 0) / P.length, cy = P.reduce((a, q) => a + q[1], 0) / P.length;
  let d = "";
  P.forEach((a, i) => {
    const b = P[(i + 1) % P.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]), tx = (b[0] - a[0]) / L, ty = (b[1] - a[1]) / L;
    let nx = -ty, ny = tx;
    if ((cx - (a[0] + b[0]) / 2) * nx + (cy - (a[1] + b[1]) / 2) * ny < 0) { nx = -nx; ny = -ny; }
    for (let s = ara / 2; s < L - 2; s += ara) { const x = a[0] + tx * s, y = a[1] + ty * s; d += `M${x.toFixed(1)},${y.toFixed(1)}l${(nx * boy).toFixed(1)},${(ny * boy).toFixed(1)}`; }
  });
  return d;
};
const FransaEkleri: React.FC<{ plan: Plan; p: number; kat: "alt" | "ust"; kilit: SablonProps["kilit"]; ekran: (q: [number, number]) => [number, number] }> = ({ plan, p, kat, kilit, ekran }) => {
  const { R, at, ORAN } = rotaPlan(plan), cs = ekranCs(plan), qr = rotaIlerleme(plan, p);
  const pr = param<{ renk?: string; poligon: [number, number][] } | null>(plan, "prusya_bolgesi", null);
  if (kat === "alt") {
    if (!pr) return null;
    const P = pr.poligon.map(([lo, la]) => pj(lo, la));
    return <g>
      <path d={"M" + P.map((q) => q.join(",")).join("L") + "Z"} fill={pr.renk ?? PK.prusya} stroke={PK.halka} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={tikBandi(P)} stroke={PK.halka} strokeWidth={2.5} strokeLinecap="round" />
    </g>;
  }
  const kh = kucukHalka(plan), ti = toursIk(plan);
  const bi = param<{ bas: number; bit: number; ikon_px?: number } | null>(plan, "balon_ikon_inis", null);
  const sy = param<{ bas: number; bit: number; devrilme_derece?: number } | null>(plan, "sepet_yatik_ikon", null);
  const paris = R.find((r) => r[0] === "PARIS"), tours = R.find((r) => r[0] === "TOURS");
  const out: React.ReactNode[] = [];
  if (kh && paris) {
    const [x, y] = pj(paris[1], paris[2]), r = kh.yaricap_px ?? 40, n = kh.cubuk?.adet ?? 10, [bw, bh] = kh.cubuk?.boyut_px ?? [12, 6];
    out.push(<g key="kh">
      <circle cx={x} cy={y} r={r} fill="none" stroke={PK.halka} strokeWidth={(kh.cizgi_px ?? 5) + 6} opacity={0.15} />
      <circle cx={x} cy={y} r={r} fill="none" stroke={PK.halka} strokeWidth={kh.cizgi_px ?? 5} />
      {Array.from({ length: n }).map((_, i) => { const a = (i / n) * 360 + 18 * ((i * 7) % 3 - 1) * 0.3; return <g key={i} transform={`translate(${x},${y}) rotate(${a}) translate(${r},0) rotate(90)`}>
        <rect x={-bw / 2 + 2} y={-bh / 2 + 2} width={bw} height={bh} fill={PK.kontur} opacity={0.22} />
        <rect x={-bw / 2} y={-bh / 2} width={bw} height={bh} fill={PK.isaret} stroke={PK.halka} strokeWidth={1.5} />
      </g>; })}
    </g>);
  }
  if (ti && tours) {
    const [x, y] = pj(tours[1], tours[2]), s = 1 / cs;
    const c = ti.ciz ? interpolate(p, [ti.ciz.bas, ti.ciz.bit], [0, 1], { ...cl, easing: Easing.inOut(Easing.quad) }) : 1;
    const ys = ((ti.yigin_ekran_px ?? 36) / 84) * s, bx = x - 70 * s;
    const yr = interpolate(c, [0.5, 1], [0, 1], cl);
    out.push(<g key="ti">
      <g transform={`translate(${bx},${y}) scale(${s})`}><Golgeli>{(g) => <ToursIkon golge={g} ciz={c} />}</Golgeli></g>
      {yr > 0 && <g transform={`translate(${x - 122 * s},${y - 16 * s})`}><g transform={`scale(1,${yr})`}><Golgeli dx={5 * s} dy={6 * s}>{(g) => <YiginIkon golge={g} olcek={ys} />}</Golgeli></g></g>}
    </g>);
  }
  if (bi) {
    const s = (bi.ikon_px ?? 56) / 56 / cs;
    const j = (segStil(plan) ?? []).indexOf("noktali"), qIn = j > 0 ? ORAN[j] : 1;
    const ucQ = at(Math.min(qr, qIn)), indi = p >= bi.bit;
    const al = interpolate(p, [bi.bas, bi.bit], [0, 1], { ...cl, easing: Easing.inOut(Easing.quad) });
    const gof = 18 - 14 * al, yuk = 6 * (1 - al);
    const ez = p >= bi.bit && p < bi.bit + 3 ? 1 - 0.14 * Math.sin((Math.PI * (p - bi.bit)) / 3) : 1;
    const dv = sy ? sy.devrilme_derece ?? 60 : 0, t0 = Math.max(bi.bit, sy?.bas ?? bi.bit);
    const devril = sy ? interpolate(p, [t0, t0 + 5, t0 + 7, Math.min(sy.bit - 6, t0 + 8)], [0, dv * 1.1, dv * 0.97, dv], { ...cl, easing: Easing.out(Easing.quad) }) : 0;
    const sonme = sy ? interpolate(p, [sy.bas + 4, sy.bit], [0, 1], { ...cl, easing: Easing.out(Easing.cubic) }) : 0;
    out.push(<g key="bi" transform={`translate(${ucQ[0]},${ucQ[1] - yuk * s}) scale(${s})`}>
      <Golgeli dx={gof * 0.8} dy={gof}>{(g) => <BalonIkon golge={g} ezil={ez} devril={devril} sonme={sonme} />}</Golgeli>
    </g>);
    if (indi || p >= bi.bas) kilit.push({ ad: "iniş", p: ekran(at(qIn)), tur: "temas" });
  }
  return <>{out}</>;
};

// ===== §5H.7 şehir adı etiketleri YAZI KATMANINDA (svg_etiket: false) =====
// Etiket, şehre bağlanan rota parçalarının ortalama yönünün TERSİNE, noktadan (halka varsa halkadan) 20 px uzağa; rota/ikon kutusuna
// binerse sıradaki yöne (alt, üst, sağ, sol) geçer; güvenli alana kenetlenir. Playfair 900, 40 px × cs. Dönüş: EKRAN px (sahne dönüşümü öncesi).
export type HaritaAdi = { metin: string; merkez: [number, number]; px: number; t: number };
export const haritaAdlari = (plan: Plan, p: number): HaritaAdi[] => {
  if (plan.sablon !== "HARITA" || param<boolean>(plan, "svg_etiket", true) || param<string>(plan, "harita_gorunum", "") === "paris-cevre") return [];
  const { R, at, ORAN } = rotaPlan(plan), k = haritaKamera(plan, p), rc = param<RotaCiz | null>(plan, "rota_ciz", null), qr = rotaIlerleme(plan, p);
  const E = (q: [number, number]): [number, number] => [540 + k.cx + (q[0] - 540) * k.cs, 960 + k.cy + (q[1] - 960) * k.cs];
  const px = 40 * k.cs, h = px * 0.95, cs0 = ekranCs(plan);
  const rota = Array.from({ length: 81 }, (_, i) => E(at(i / 80)));
  const kh = kucukHalka(plan), ti = toursIk(plan);
  const engel: [number, number, number, number][] = [];
  const tours = R.find((r) => r[0] === "TOURS");
  const paris = R.find((r) => r[0] === "PARIS");
  if (kh && paris) { const [x, y] = E(pj(paris[1], paris[2])), r = ((kh.yaricap_px ?? 40) + 6) * k.cs; engel.push([x - r, y - r, x + r, y + r]); }
  if (ti && tours) { const [x, y] = E(pj(tours[1], tours[2])), f = k.cs / cs0; engel.push([x - 150 * f, y - 44 * f, x - 38 * f, y + 4 * f]); }
  return R.flatMap(([n, lo, la, big], i) => {
    if (!big || !n) return [];
    const t = i === 0 || !rc ? GIRIS(interpolate(p, [0, 14], [0, 1], cl)) : GIRIS(interpolate(qr, [ORAN[i] - 0.1, ORAN[i]], [0, 1], cl));
    if (t <= 0) return [];
    const P = E(pj(lo, la)), w = n.length * 0.74 * px;
    const rr = (n === "PARIS" && kh ? ((kh.yaricap_px ?? 40) + 6) * k.cs : 11 * k.cs) + 20;
    const kom = [R[i - 1], R[i + 1]].filter(Boolean).map((q) => E(pj(q![1], q![2])));
    let ox = 0, oy = 0;
    kom.forEach((q) => { const L = Math.hypot(q[0] - P[0], q[1] - P[1]) || 1; ox -= (q[0] - P[0]) / L; oy -= (q[1] - P[1]) / L; });
    const ilk = Math.abs(ox) > Math.abs(oy) ? (ox < 0 ? "sol" : "sag") : oy < 0 ? "ust" : "alt";
    const yer = (y: string): [number, number] => y === "ust" ? [P[0], P[1] - rr - h / 2] : y === "alt" ? [P[0], P[1] + rr + h / 2] : y === "sol" ? [P[0] - rr - w / 2, P[1] - 0.35 * h] : [P[0] + rr + w / 2, P[1]];
    const carp = (c: [number, number]) => { const b = [c[0] - w / 2 - 6, c[1] - h / 2 - 6, c[0] + w / 2 + 6, c[1] + h / 2 + 6];
      return rota.some((q) => q[0] > b[0] && q[0] < b[2] && q[1] > b[1] && q[1] < b[3]) || engel.some((e) => e[0] < b[2] && e[2] > b[0] && e[1] < b[3] && e[3] > b[1]); };
    const sira = [ilk, ...["alt", "ust", "sag", "sol"].filter((y) => y !== ilk)];
    const kenet = (c: [number, number]): [number, number] => [Math.max(80 + w / 2, Math.min(1000 - w / 2, c[0])), Math.max(240 + h / 2, Math.min(1490 - h / 2, c[1]))];
    const c = kenet(yer(sira.find((y) => !carp(kenet(yer(y)))) ?? "ust")); // kenetlenmiş hâli de çarpmamalı (kenar → halkaya binme)
    return [{ metin: n, merkez: c, px, t }];
  });
};

const Sahne: React.FC<SablonProps> = (props) => {
  if (param<string>(props.plan, "harita_gorunum", "") === "paris-cevre") return <ParisCevreKap {...props} />;
  return <FransaSahne {...props} />;
};
const ParisCevreKap: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const k = haritaKamera(plan, p);
  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a120b", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${k.cx}px,${k.cy}px) scale(${k.cs})` }}>
        <ParisCevreSahne plan={plan} p={p} kilit={kilit} k={k} />
      </div>
    </div>
  );
};
const FransaSahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const { R, at, ORAN, YOL } = rotaPlan(plan);
  const rc = param<RotaCiz | null>(plan, "rota_ciz", null), qr = rotaIlerleme(plan, p);
  const ig = param<Igne | null>(plan, "igne", null), igN = igneNokta(plan);
  const posta = param<Vurus | null>(plan, "posta", null);
  const tel = param<Vurus | null>(plan, "telgraf", null);
  const muhur = param<{ kare: number; metin: string } | null>(plan, "muhur", null);
  const gunSayisi = posta?.gun ?? param<number>(plan, "gun", 3), saatSayisi = tel?.saat ?? param<number>(plan, "saat", 4);
  const etiket = param<{ saat?: string; gun?: string }>(plan, "sayac_etiket", {});
  const sayacSag = param<number>(plan, "sayac_sag", 80); // sayaç kutusu sağ kenar boşluğu (px, varsayılan 80)
  const etSaat = (n: number) => (etiket.saat ?? "{n} SAAT").replace("{n}", String(n));
  const etGun = (n: number) => (etiket.gun ?? "{n}. GÜN").replace("{n}", String(n));
  const k = haritaKamera(plan, p);
  const stil = segStil(plan), svgEt = param<boolean>(plan, "svg_etiket", true);
  const ekr = (q: [number, number]): [number, number] => [540 + k.cx + (q[0] - 540) * k.cs, 960 + k.cy + (q[1] - 960) * k.cs];
  const qp = posta ? interpolate(p, [posta.bas, posta.bit], [0, 1], { ...cl, easing: Easing.inOut(Easing.sin) }) : 0;
  const qt = tel ? interpolate(p, [tel.bas, tel.bit], [0, 1], { ...cl, easing: Easing.in(Easing.quad) }) : 0;
  const [ax, ay] = at(qp);
  const telAktif = !!tel && p >= tel.bas;
  const cycle = qp * gunSayisi;
  const gece = Math.sin(cycle * Math.PI * 2 - Math.PI / 2) > 0.3;
  const gun = Math.min(gunSayisi, Math.floor(cycle) + 1);
  const saat = Math.max(1, Math.round(qt * saatSayisi));
  const ms = muhur ? interpolate(p, [muhur.kare - 12, muhur.kare], [2.4, 1], { ...cl, easing: Easing.in(Easing.cubic) }) : 0;
  const muhurVar = !!muhur && p >= muhur.kare - 12;
  const bob = Math.sin(p * 0.6) * 3;
  if (posta) kilit.push({ ad: "araba", p: [540 + k.cx + (ax - 540) * k.cs, 960 + k.cy + (ay - 960) * k.cs], tur: "dokunus" });
  if (muhur) kilit.push({ ad: "mühür", p: [540, 880], tur: "temas" });
  if (ig && igN) kilit.push({ ad: "iğne", p: [540 + k.cx + (igN[0] - 540) * k.cs, 960 + k.cy + (igN[1] - 960) * k.cs], tur: "temas" });
  if (rc) { const u = at(qr); kilit.push({ ad: "rota ucu", p: [540 + k.cx + (u[0] - 540) * k.cs, 960 + k.cy + (u[1] - 960) * k.cs], tur: "dokunus" }); }
  // sayaç kutuları alt bantta: altyazı (KT-1) bu kilit yüzünden üst banda çıkar
  if (posta || tel) kilit.push({ ad: "sayaç kutusu", p: [800, posta && tel ? 1400 : 1350], tur: "kurulum" });
  const nKule = tel?.kule ?? 13;
  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a120b", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${k.cx}px,${k.cy}px) scale(${k.cs})` }}>
        {/* harita_gorunum "fransa" (Paris): parşömen lekesi C* tavanı (§5H.3) → doygunluk .62; Blanc/Evliya varsayılanı değişmez */}
        <Img src={staticFile("blanc/img/parsomen.jpg")} style={{ position: "absolute", left: -200, top: -300, width: 1480, height: 2520, objectFit: "cover", filter: fransaMi(plan) ? "saturate(0.62)" : undefined }} />
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          {/* tarama: Blanc varsayılanı 0.8 px α .2 (aralık 7); harita_gorunum "fransa" → 2.5 px α .22 aralık 9 (360'ta ≥ 0.8 px) */}
          <defs>{fransaMi(plan)
            ? <pattern id="hrTarama" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="9" stroke={INK} strokeWidth="2.5" opacity="0.22" /></pattern>
            : <pattern id="hrTarama" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeWidth="0.8" opacity="0.2" /></pattern>}</defs>
          <path d={FR} fill={INK} stroke={INK} strokeWidth={7} strokeLinejoin="round" opacity={0.85} />
          <path d={FR} fill="#d9c49a" />
          <path d={FR} fill="url(#hrTarama)" />
          <FransaEkleri plan={plan} p={p} kat="alt" kilit={kilit} ekran={ekr} />
          {!rc && <path d={YOL} fill="none" stroke={INK} strokeWidth={4} strokeDasharray="2 10" strokeLinecap="round" opacity={0.7} />}
          {/* KT-3: mürekkep rota kendini çizer (iki geçiş: yumuşak alt iz + net kontur), uçta divit damlası */}
          {rc && qr > 0 && stil && stil.map((st, i) => {
            // segment başına stil: dolu (kit rota dili) | noktali (gizli segment: ø 4 nokta, aralık 12, #1c1915; uç ilerler, noktalar arkasından basılır)
            const a = ORAN[i], b = ORAN[i + 1] ?? 1, u = interpolate(qr, [a, b], [0, 1], cl);
            if (u <= 0 || b <= a) return null;
            const P0 = pj(R[i][1], R[i][2]), P1 = pj(R[i + 1][1], R[i + 1][2]), E: [number, number] = [P0[0] + (P1[0] - P0[0]) * u, P0[1] + (P1[1] - P0[1]) * u];
            const d = `M${P0.join(",")} L${E.join(",")}`;
            return st === "noktali"
              ? <g key={i}><path d={d} fill="none" stroke={PK.murekkep} strokeWidth={4} strokeDasharray="0 12" strokeLinecap="round" />{u < 1 && <circle cx={E[0]} cy={E[1]} r={4} fill={PK.murekkep} />}</g>
              : <g key={i}><path d={d} fill="none" stroke={INK} strokeWidth={11} strokeLinecap="round" opacity={0.18} /><path d={d} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />{u < 1 && <circle cx={E[0]} cy={E[1]} r={7} fill={INK} />}</g>;
          })}
          {rc && qr > 0 && !stil && <>
            <path d={YOL} fill="none" stroke={INK} strokeWidth={11} pathLength={1} strokeDasharray={`${qr} 2`} strokeLinecap="round" strokeLinejoin="round" opacity={0.18} />
            <path d={YOL} fill="none" stroke={INK} strokeWidth={5} pathLength={1} strokeDasharray={`${qr} 2`} strokeLinecap="round" strokeLinejoin="round" />
            {qr < 1 && (() => { const [ux, uy] = at(qr); return <circle cx={ux} cy={uy} r={7} fill={INK} />; })()}
          </>}
          {posta && <path d={YOL} fill="none" stroke="#7a5a2a" strokeWidth={5} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - qp} strokeLinecap="round" />}
          {telAktif && <path d={YOL} fill="none" stroke="#c98a2a" strokeWidth={6} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - qt} strokeLinecap="round" />}
          {R.map(([n, lo, la, big], i) => { const [x, y] = pj(lo, la);
            // KT-3: rota çizilirken şehir, çizgi varınca mürekkeple belirir (ölçek .6 → 1, GIRIS)
            if (rc) { if (!n) return null; const g = i === 0 ? 1 : GIRIS(interpolate(qr, [ORAN[i] - 0.1, ORAN[i]], [0, 1], cl)); if (g <= 0) return null;
              return <g key={n} transform={`translate(${x},${y}) scale(${0.6 + 0.4 * g}) translate(${-x},${-y})`} opacity={g}>{big ? <><circle cx={x} cy={y} r={11} fill={INK} />{svgEt && <text x={x + 20} y={y + 12} fontFamily={serif} fontWeight={900} fontSize={40} fill={INK}>{n}</text>}</> : <circle cx={x} cy={y} r={5} fill={INK} />}</g>; }
            return big ? <g key={n}><circle cx={x} cy={y} r={11} fill={INK} stroke={INK} strokeWidth={3} />{svgEt && <text x={x + 20} y={y + 12} fontFamily={serif} fontWeight={900} fontSize={40} fill={INK}>{n}</text>}</g> : <circle key={n} cx={x} cy={y} r={4} fill={INK} />; })}
          <FransaEkleri plan={plan} p={p} kat="ust" kilit={kilit} ekran={ekr} />
          {telAktif && Array.from({ length: nKule }).map((_, i) => { const q = i / (nKule - 1); const [x, y] = at(q); return <KuleIkon key={i} x={x - 28} y={y} on={interpolate(qt, [q - 0.02, q + 0.02], [0, 1], cl)} />; })}
          {posta && qp > 0 && qp < 1 && Array.from({ length: 8 }).map((_, i) => { const [dx, dy] = at(Math.max(0, qp - 0.004 * (i + 1))); return <circle key={i} cx={dx + 40} cy={dy + 10} r={6 + i * 2.4} fill="#c9b48a" opacity={0.4 * (1 - i / 8)} />; })}
          {/* mühür: harita yüzeyine iner (540, 880); temas karesinde ölçek 1 */}
          {muhurVar && <g transform={`translate(540,880) scale(${ms}) rotate(-10)`}>
            <rect x={-300} y={-58} width={600} height={116} fill="rgba(233,223,201,0.55)" stroke="#b3261e" strokeWidth={10} />
            <text x={0} y={24} textAnchor="middle" fontFamily={mono} fontSize={64} letterSpacing={6} fill="#b3261e">{muhur!.metin}</text>
          </g>}
          {ig && igN && <IgneCiz x={igN[0]} y={igN[1]} ig={ig} p={p} />}
        </svg>
        {posta && <Img src={staticFile("blanc/img/araba.png")} style={{ position: "absolute", left: ax - 100, top: ay - 82 + bob, width: 200 }} />}
      </div>
      {/* K4 çift sayaç: telgraf üstte, posta altta (ikisi birden varsa); tek vuruşta tek kutu eski yerinde */}
      {tel && p >= tel.bas && <SayacKutu y={posta ? 1290 : 1320} giris={interpolate(p, [tel.bas, tel.bas + 12], [0, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) })} ikon={<TIkon renk="#f1e4c4" />} metin={etSaat(saat)} sag={sayacSag} />}
      {posta && p >= posta.bas && <SayacKutu y={tel ? 1400 : 1320} giris={interpolate(p, [posta.bas, posta.bas + 12], [0, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) })} ikon={gece ? <Ay /> : <Gunes />} metin={etGun(gun)} sag={sayacSag} />}
    </div>
  );
};

export const HARITA: Sablon = { Sahne, arsiv: () => "kagit" };
