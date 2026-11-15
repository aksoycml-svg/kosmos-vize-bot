// ===== MASA-INSERT 1940'lar masaları: `masa: "komodin" | "berlin" | "bazna"` (mekanlar.md §3; Çiçero kiti) =====
// Dekor = cs 1 ekranı (px), kamera 2B zoom (kameraHesapla). Tek kaynak:
//   komodin (aci tepe-onden, 1600 px/m): başucu lambası sol-üstte; duvarda net kenarlı V, komodin üstünde dairesel havuz; gölgeler sağ-öne.
//   berlin  (aci tepe-egik): metal kubbe lamba sağ-üst; SERT kenarlı tek basamak havuz (daha az doygun); gölgeler sol-aşağı. Oda #2e3048.
//   bazna   (aci tepe, 1500 px/m): başucu lambası tepeden (sol-üst köşede iç ağız hilali), havuz elips (−45°), gölgeler sağ-aşağı.
// lamba {yanik: Sayi 0..1 (huzme/havuz kaynaktan RADYAL uzar/çekilir, fade yok), x, y, kare}.
// props (plan.props, tur → props/cicero/Esyalar40): banknot {durum: yuz on|arka, golge, kivrik} · carpi {durum: ilerleme 0..2} · zarf {durum: acik} ·
//   belge · makine · anahtar. x/y dekor px (prop merkezi), aci derece, olcek = uzun kenar px çarpanı (varsayılan gerçek ölçü × masa px/m).
// el40: GravurEl tek parça el + konik ceket kolu (kol = giysi dolgusu, dirsek yuvarlak, ecru manşet). {tip bazna|berlin|elci, kare, omuz[], bilek[], aci[],
//   poz gevsek|kistir|tutus|cimdik, E (el boyu px), bukum (dirsek yönü ±1), tut?: prop id (bas–bit arası prop eli izler)}.
import React from "react";
import { Desen, RenkKaydi, Tarama } from "../../../doku/Tarama";
import { P, poly, rnd } from "../../../doku/sabitler";
import { GravurEl, GRAVUR_POZ, konikKol } from "../../props/paris/GravurEl";
import type { Prop, Sayi } from "../../tipler";
import { param, SablonProps } from "../../ortak";
import { propDurum } from "../../props";
import { deger, ekranNokta, kameraHesapla } from "../../zaman";
import { CIC, EL_BAZNA, EL_BERLIN } from "../../paletler/cicero";
import { bilekSinirla, dirsekAcisi, elOlcumYaz, El40Poz } from "../../props/cicero/El40";
import { Anahtar, Balmumu, Banknot, Belge, Carpi, Dosya40, FilmKutusu, Makine, Zarf } from "../../props/cicero/Esyalar40";

export type MasaAd = "komodin" | "berlin" | "bazna";
export const MASA40: MasaAd[] = ["komodin", "berlin", "bazna"];
const PXM: Record<MasaAd, number> = { komodin: 1600, berlin: 1100, bazna: 1500 };
const SEED: Record<MasaAd, number> = { komodin: 197, berlin: 199, bazna: 211 };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const elipsY = (cx: number, cy: number, rx: number, ry: number, rot = 0, n = 48): P[] => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, r = (rot * Math.PI) / 180; const x = Math.cos(a) * rx, y = Math.sin(a) * ry; return [cx + x * Math.cos(r) - y * Math.sin(r), cy + x * Math.sin(r) + y * Math.cos(r)]; });

type El40 = { tip: "bazna" | "berlin" | "elci"; kare: number[]; omuz: P[]; bilek: P[]; aci: number[]; poz?: El40Poz | El40Poz[]; E?: number; bukum?: 1 | -1; ayna?: boolean; tut?: { prop: string; bas: number; bit: number; dx?: number; dy?: number } };
const KOL_RENK: Record<El40["tip"], [string, string]> = { bazna: ["#3b3a4e", "#1e1c2a"], berlin: ["#4f4c58", "#26242e"], elci: ["#4f4a62", "#26242e"] };
const anah = (arr: P[], kare: number[], p: number): P => [deger(arr.map((q) => q[0]), kare, p), deger(arr.map((q) => q[1]), kare, p)];

/** Konik ceket kolu + manşet + GravurEl (katman "arka" … tutulan … "on"). Ekran 2B; isik = ışığa doğru birim vektör. */
// tur-4 el-kol (mekanlar §2.10): E = 0.18 m × masa px/m (json E yalnız ±%10 içinde geçerli) · el açısı ön kolun ±30°'si içine
// kırpılır (bilek kırılmaz) · poz anahtarlı olabilir (kare dizisiyle adım adım: ör. ["kistir", "dayali"] — bırakınca el masaya dayanır).
const elE = (e: El40, pxm: number) => { const n = 0.18 * pxm; return Math.max(0.9 * n, Math.min(1.1 * n, e.E ?? n)); };
const elPoz = (e: El40, p: number): El40Poz => { if (!Array.isArray(e.poz)) return e.poz ?? "dayali"; let v = e.poz[0]; e.kare.forEach((q, j) => { if (p >= q && e.poz![j]) v = (e.poz as El40Poz[])[j]; }); return v; };
const el40Geo = (e: El40, p: number, pxm: number) => {
  const omuz = anah(e.omuz, e.kare, p), bilek = anah(e.bilek, e.kare, p), E = elE(e, pxm), L = Math.hypot(bilek[0] - omuz[0], bilek[1] - omuz[1]) || 1;
  const nx = -(bilek[1] - omuz[1]) / L, ny = (bilek[0] - omuz[0]) / L, bk = (e.bukum ?? 1) * Math.min(0.18 * L, 0.5 * E);
  const dirsek: P = [lerp(omuz[0], bilek[0], 0.52) + nx * bk, lerp(omuz[1], bilek[1], 0.52) + ny * bk];
  const kolAci = (Math.atan2(bilek[1] - dirsek[1], bilek[0] - dirsek[0]) * 180) / Math.PI;
  return { omuz, bilek, E, dirsek, kolAci, aci: bilekSinirla(kolAci, deger(e.aci, e.kare, p)) };
};
export const El40Ciz: React.FC<{ e: El40; p: number; pxm: number; isik: P; taramaAci: number; tutulan?: React.ReactNode; golge?: { renk: string; kay: P } }> = ({ e, p, pxm, isik, taramaAci, tutulan, golge }) => {
  const { omuz, bilek, E, dirsek, kolAci, aci } = el40Geo(e, p, pxm);
  const kol = konikKol(omuz, dirsek, bilek, [0.78 * E, 0.66 * E, 0.46 * E]);
  const pal = e.tip === "berlin" ? EL_BERLIN : EL_BAZNA;
  const pz = elPoz(e, p), poz = GRAVUR_POZ[pz === "gevsek" ? "dayali" : pz];
  if (!golge) elOlcumYaz(`el40 ${e.tip}`, { bilek: +Math.abs(aci - kolAci).toFixed(1), dirsek: +dirsekAcisi(omuz, dirsek, bilek).toFixed(1), E: +E.toFixed(1), poz: pz, x: Math.round(bilek[0]), y: Math.round(bilek[1]) });
  const elB = kol.ileri(-0.02 * E);
  if (golge) return <g transform={`translate(${golge.kay[0]} ${golge.kay[1]})`} fill={golge.renk}><path d={kol.d} /><GravurEl bilek={elB} aci={aci} E={E} poz={poz} ayna={e.ayna} isik={isik} taramaAci={taramaAci} golge={golge.renk} golgeKay={[0, 0]} /></g>;
  const [kr, kk] = KOL_RENK[e.tip];
  const mA = kol.ileri(-0.22 * E), mB = kol.ileri(0), n2 = kol.n2, w = 0.25 * E;
  const q = (o: P, k2: number): P => [o[0] + n2[0] * k2, o[1] + n2[1] * k2];
  return (
    <g>
      <path d={kol.d} fill={kr} stroke={kk} strokeWidth={4} strokeLinejoin="round" />
      <path d={kol.kenar} fill="none" stroke={pal.kenar} strokeWidth={3} opacity={0.5} transform={`translate(${isik[0] * 3} ${isik[1] * 3})`} />
      <polygon points={poly([q(mA, w * 1.04), q(mB, w), q(mB, -w), q(mA, -w * 1.04)])} fill={pal.manset} stroke={pal.mansetGolge} strokeWidth={3} />
      <GravurEl bilek={elB} aci={aci} E={E} poz={poz} ayna={e.ayna} palet={pal} isik={isik} taramaAci={taramaAci} katman="arka" />
      {tutulan}
      <GravurEl bilek={elB} aci={aci} E={E} poz={poz} ayna={e.ayna} palet={pal} isik={isik} taramaAci={taramaAci} katman="on" onMaske />
    </g>
  );
};
export const el40Uc = (e: El40, p: number, pxm: number): P => { const g = el40Geo(e, p, pxm), a = (g.aci * Math.PI) / 180; return [g.bilek[0] + Math.cos(a) * 0.62 * g.E, g.bilek[1] + Math.sin(a) * 0.62 * g.E]; };

// prop çizimi (masa düzleminde; tepe-önden y kısalır)
const PropCiz40: React.FC<{ pr: Prop; p: number; pxm: number; kisalma: number; golgeKay: P; havuzIci: (q: P) => number; sonuk: number; konum?: P }> = ({ pr, p, pxm, kisalma, golgeKay, havuzIci, sonuk, konum }) => {
  const d = propDurum(pr, p);
  const x = konum ? konum[0] : deger(pr.x, pr.kare, p), y = konum ? konum[1] : deger(pr.y, pr.kare, p), a = deger(pr.aci ?? 0, pr.kare, p), o = pr.olcek ?? 1;
  const isik = havuzIci([x, y]);
  const tr = `translate(${x} ${y}) scale(1 ${kisalma}) rotate(${a})`;
  const n = (k: string, v: number) => (typeof d[k] === "number" ? (d[k] as number) : v);
  switch (pr.tur) {
    // kaldir 0..1: banknot ışığa doğru kalkar (kameraya yaklaşır → büyür, gölgesi uzaklaşır)
    case "banknot": return <g transform={`${tr} scale(${1 + 0.3 * n("kaldir", 0)})`}><Banknot W={0.211 * pxm * o} sizinti={n("sizinti", 0)} yuz={(d.yuz as "on" | "arka") ?? "on"} golge={n("golge", isik >= 0.75 ? 0 : 1 - isik)} kivrik={n("kivrik", 0.25)} sonuk={sonuk} golgeKay={[golgeKay[0], golgeKay[1] / kisalma]} seed={401} /></g>;
    case "carpi": return <g transform={tr}><Carpi L={(o * pxm * 0.09)} ilerleme={n("ilerleme", 2)} /></g>;
    case "zarf": return <g transform={tr}><Zarf W={0.24 * pxm * o} acik={n("acik", 0)} golge={n("golge", (1 - isik) * 0.8)} golgeKay={golgeKay} /></g>;
    case "belge": return <g transform={tr}><Belge W={0.21 * pxm * o} isik={isik} /></g>;
    case "makine": return <g transform={tr}><Makine W={0.13 * pxm * o} /></g>;
    case "anahtar": return <g transform={tr}><Anahtar L={0.07 * 1.8 * pxm * o} isik={isik} cevir={n("cevir", 0)} /></g>;
    case "balmumu": return <g transform={tr}><Balmumu W={0.06 * 1.5 * pxm * o} iz={n("iz", 0)} cizim={n("cizim", 0)} /></g>;
    case "filmKutusu": return <g transform={tr}><FilmKutusu H={0.055 * 1.5 * pxm * o} /></g>;
    case "dosya40": return <g transform={tr}><Dosya40 W={0.32 * pxm * o} golge={n("golge", 1 - isik)} /></g>;
    default: return null;
  }
};

export const MasaCiceroSahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const masa = param<MasaAd>(plan, "masa", "bazna");
  const pxm = param<number>(plan, "pxm", PXM[masa]);
  const S = SEED[masa];
  const k = kameraHesapla(plan.kamera, p);
  const kam = `translate(${540 + k.cx},${960 + k.cy}) scale(${k.cs}) translate(-540,-960)`;
  const LP = param<{ yanik?: Sayi; x?: number; y?: number; kare?: number[] }>(plan, "lamba", {});
  const yanik = deger(LP.yanik ?? 1, LP.kare, p);
  const sonuk = 1 - Math.min(1, yanik * 1.5);
  const kisalma = masa === "komodin" ? 0.86 : masa === "berlin" ? 0.72 : 1;
  // ---- ışık geometrisi (tek kaynak) ----
  const L = masa === "komodin" ? { kaide: [LP.x ?? 200, LP.y ?? 880] as P, agiz: [250, 560] as P } // v3: abajur aşağı → yakında bütün lamba (kaide + eklemli boyun + koni) kadrajda
    : masa === "berlin" ? { kaide: [LP.x ?? 900, LP.y ?? 600] as P, agiz: [840, 470] as P }
    : { kaide: [LP.x ?? 60, LP.y ?? 260] as P, agiz: [(LP.x ?? 60) + 190, (LP.y ?? 260) + 170] as P };
  const havuz = masa === "komodin" ? { c: L.kaide, rx: 280, ry: 280 * kisalma, rot: 0 }
    : masa === "berlin" ? { c: [540, 780] as P, rx: 380, ry: 260, rot: 0 }
    : { c: [540, 980] as P, rx: 560, ry: 650, rot: -45 };
  const golgeKay: P = masa === "berlin" ? [-10, 12] : [10, 10];
  const havuzIci = (q: P) => {
    const r = (-havuz.rot * Math.PI) / 180, dx = q[0] - havuz.c[0], dy = q[1] - havuz.c[1];
    const x = dx * Math.cos(r) - dy * Math.sin(r), y = dx * Math.sin(r) + dy * Math.cos(r);
    const t = (x / (havuz.rx * yanik + 1e-3)) ** 2 + (y / (havuz.ry * yanik + 1e-3)) ** 2;
    return t < 0.45 ? 1 : t < 1 ? 0.75 : t < 1.4 ? 0.35 : 0.1;
  };
  const isikVek: P = (() => { const v: P = [L.agiz[0] - 540, L.agiz[1] - 960]; const n = Math.hypot(v[0], v[1]) || 1; return [v[0] / n, v[1] / n]; })();
  const TH = (Math.atan2(-isikVek[1], -isikVek[0]) * 180) / Math.PI + 90;
  const props = plan.props ?? [];
  const eller = param<El40[]>(plan, "el40", []);
  // tutulan prop: el uç noktasını izler
  const tutulan = new Map<string, El40>();
  for (const e of eller) if (e.tut && p >= e.tut.bas && p < e.tut.bit) tutulan.set(e.tut.prop, e);
  const serbest = props.filter((pr) => !pr.id || !tutulan.has(pr.id));
  for (const pr of serbest) kilit.push({ ad: pr.id ?? pr.tur, p: ekranNokta(k, [deger(pr.x, pr.kare, p), deger(pr.y, pr.kare, p)]), tur: "kurulum" });
  for (const e of eller) kilit.push({ ad: `el ${e.tip}`, p: ekranNokta(k, el40Uc(e, p, pxm)), tur: "dokunus" });
  const propC = (pr: Prop, konum?: P) => <PropCiz40 key={pr.id ?? `${pr.tur}${deger(pr.x, pr.kare, 0)}`} pr={pr} p={p} pxm={pxm} kisalma={kisalma} golgeKay={golgeKay} havuzIci={havuzIci} sonuk={sonuk} konum={konum} />;
  // havuz bantları: kaynaktan radyal uzar (yanik ölçekler)
  const havuzBant = (renkler: [string, string, string], sert = false) => {
    const { c, rx, ry, rot } = havuz, y = Math.max(0, yanik);
    if (y <= 0.01) return null;
    return <g>
      {!sert && <polygon points={poly(elipsY(c[0], c[1], rx * 1.22 * y, ry * 1.2 * y, rot))} fill={renkler[2]} />}
      <polygon points={poly(elipsY(c[0], c[1], rx * y, ry * y, rot))} fill={renkler[1]} />
      {!sert && <polygon points={poly(elipsY(c[0] - 30, c[1] - 40, rx * 0.5 * y, ry * 0.5 * y, rot))} fill={renkler[0]} />}
    </g>;
  };
  // ---- masa yüzeyleri ----
  let zemin: React.ReactNode = null, ust: React.ReactNode = null, cekIc: React.ReactNode = null, cekOn: React.ReactNode = null;
  // berlin orta çekmecesi: acik 0..1 (öne/aşağı 170 px kayar), kose 0..1 (kapalıyken ağızda sıkışan dosya köşesi). durum.cekmecede = 1 olan prop çekmece içinde (kırpılı, çekmeceyle kayar)
  const CK = param<{ acik?: Sayi; kose?: Sayi; kare?: number[] } | null>(plan, "cekmece", null);
  const cekKay = CK ? 170 * deger(CK.acik ?? 0, CK.kare, p) : 0, cekKose = CK ? deger(CK.kose ?? 0, CK.kare, p) : 0;
  const icinde = (pr: Prop) => masa === "berlin" && (propDurum(pr, p).cekmecede as number) > 0.5;
  if (masa === "bazna") {
    const gen = [0.17, 0.22, 0.19, 0.24].map((m) => m * pxm);
    let x = -80; const derz: number[] = []; for (const g of gen) { x += g; derz.push(x); }
    zemin = <g>
      <rect x={-400} y={-400} width={1900} height={2800} fill={sonuk > 0.5 ? CIC.masaSonuk : "#3e3440"} />
      {havuzBant([CIC.masaCekirdek, CIC.masaIsik, CIC.masaGolge])}
      {/* damar: dikey, seed'li, tahta başına 3–5 çizgi (kâğıt üstünde ince) */}
      {[-80, ...derz.slice(0, -1)].map((x0, i) => Array.from({ length: 4 }).map((_, j) => { const xx = x0 + (gen[i] * (j + 0.6 + rnd(S, `d${i}${j}`) * 0.5)) / 4.5; return <path key={`${i}${j}`} d={`M ${xx} -400 Q ${xx + 8 * (rnd(S, `q${i}${j}`) - 0.5)} 900 ${xx + 6 * (rnd(S, `r${i}${j}`) - 0.5)} 2400`} stroke="#2e2630" strokeWidth={2} opacity={0.22} fill="none" />; }))}
      {derz.slice(0, -1).map((xx, i) => <line key={i} x1={xx} y1={-400} x2={xx + 3} y2={2400} stroke="#221c28" strokeWidth={3} opacity={0.75} />)}
    </g>;
    // lamba tepeden: kaide (yarı kesik) + boyun + abajur dış halkası + iç ağız hilali
    const { kaide, agiz } = L;
    // tepeden eğik koni abajur: kaide → boyun → küçük üst ağız (koyu halka) → koni yüzeyi → geniş alt ağız masaya dönük;
    // iç yüz sıcak yalnız uzak yarıda görünür (ay/hilal okunmasın: koni gövdesi + boyun + kaide birlikte)
    const dv: P = (() => { const v: P = [agiz[0] - kaide[0], agiz[1] - kaide[1]]; const n = Math.hypot(v[0], v[1]) || 1; return [v[0] / n, v[1] / n]; })();
    const nv: P = [-dv[1], dv[0]], R1 = 0.12 * pxm, R0 = 0.045 * pxm;
    const T: P = [agiz[0] - dv[0] * 0.13 * pxm, agiz[1] - dv[1] * 0.13 * pxm], Mg: P = [agiz[0] + dv[0] * 0.03 * pxm, agiz[1] + dv[1] * 0.03 * pxm];
    const rot = (Math.atan2(dv[1], dv[0]) * 180) / Math.PI;
    const govde: P[] = [[T[0] + nv[0] * R0, T[1] + nv[1] * R0], [Mg[0] + nv[0] * R1, Mg[1] + nv[1] * R1], [Mg[0] - nv[0] * R1, Mg[1] - nv[1] * R1], [T[0] - nv[0] * R0, T[1] - nv[1] * R0]];
    ust = <g>
      <ellipse cx={kaide[0]} cy={kaide[1]} rx={0.075 * pxm} ry={0.075 * pxm} fill={CIC.kaide} stroke={CIC.murekkep} strokeWidth={3} />
      <line x1={kaide[0]} y1={kaide[1]} x2={T[0]} y2={T[1]} stroke={CIC.kaide} strokeWidth={12} strokeLinecap="round" />
      <line x1={kaide[0]} y1={kaide[1]} x2={T[0]} y2={T[1]} stroke={CIC.metalNokta} strokeWidth={2.5} opacity={0.5} transform="translate(-4 -3)" />
      <ellipse cx={Mg[0]} cy={Mg[1]} rx={0.06 * pxm} ry={R1} transform={`rotate(${rot} ${Mg[0]} ${Mg[1]})`} fill={yanik > 0.05 ? CIC.abajurIc : "#4a4048"} stroke={CIC.murekkep} strokeWidth={4} />
      <polygon points={poly(govde)} fill={CIC.abajurDis} stroke={CIC.murekkep} strokeWidth={4} strokeLinejoin="round" />
      <Tarama sekil={[govde[0], govde[1], Mg, T]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="insert" seed={S + 4} />
      <ellipse cx={T[0]} cy={T[1]} rx={0.02 * pxm} ry={R0} transform={`rotate(${rot} ${T[0]} ${T[1]})`} fill="#26282e" stroke={CIC.murekkep} strokeWidth={3} />
    </g>;
    // lamba ağzı yalnız ışık kaynağı ipucu (köşede yarı kesik; hikâye nesnesi değil) → kilit noktası değil
  } else if (masa === "komodin") {
    const vT: P = [230, 400];
    const V = (da: number, off = 0): P[] => { const tl = Math.tan(((-26 - da) * Math.PI) / 180), tr = Math.tan(((26 + da) * Math.PI) / 180), y0 = 360 + off * 0.5, yt = -400; return [[vT[0] + (y0 - yt) * tl - off, yt], [vT[0] - off - 10, y0 - 20], [vT[0], y0 + 6], [vT[0] + off + 10, y0 - 20], [vT[0] + (y0 - yt) * tr + off, yt]]; };
    zemin = <g>
      <rect x={-400} y={-400} width={1900} height={1220} fill={CIC.duvarGece} />
      {yanik > 0 && <g><polygon points={poly(V(7, 36))} fill={CIC.lambaYayilma} /><polygon points={poly(V(0))} fill={CIC.vDis} /><polygon points={poly(V(-7))} fill={CIC.vUst} /></g>}
      {/* aşağı koni duvarı yalar (lamba duvardan ≈ 0.15 m): abajur ağzından komodin üstüne genişleyen Λ, ağza yakın en parlak; kaynaktan radyal uzar */}
      {yanik > 0 && (() => { const ax = L.agiz[0], ay = L.agiz[1] + 10, yb = 800, Lm = (yb - ay) * yanik; const Lm2 = (da: number, off = 0): P[] => { const t = Math.tan(((40 + da) * Math.PI) / 180); return [[ax - 60 - off, ay - off * 0.3], [ax + 60 + off, ay - off * 0.3], [ax + 60 + off + Lm * t, ay + Lm], [ax - 60 - off - Lm * t, ay + Lm]]; };
        return <g><polygon points={poly(Lm2(8, 30))} fill={CIC.lambaYayilma} /><polygon points={poly(Lm2(2, 6))} fill={CIC.vDis} /><polygon points={poly(Lm2(-4))} fill={CIC.vUst} />
          <polygon points={poly(Lm2(-4)).split(" ").map((q, i) => { const [x, y] = q.split(",").map(Number); return i < 2 ? `${x},${y}` : `${ax + (x - ax) * 0.5},${ay + (y - ay) * 0.5}`; }).join(" ")} fill={CIC.vCekirdek} /></g>; })()}
      <rect x={-400} y={790} width={1900} height={30} fill="#2a2434" />
      {/* komodin üstü (ceviz, yatay damar) */}
      <rect x={-400} y={820} width={1900} height={680} fill={CIC.cevizGolge} />
      {havuzBant(["#a07f6c", CIC.cevizIsik, "#4e3c40"])}
      {Array.from({ length: 9 }).map((_, i) => { const y = 860 + i * 72 + rnd(S, i) * 20; return <path key={i} d={`M -400 ${y} Q 540 ${y + 10 * (rnd(S, `a${i}`) - 0.5)} 1500 ${y + 6}`} stroke="#2a2230" strokeWidth={2} opacity={0.25} fill="none" />; })}
      <line x1={-400} y1={1496} x2={1500} y2={1496} stroke={CIC.vDis} strokeWidth={3} opacity={0.5} />
      {/* ön yüz: çekmece pervazı + çekmece + koyu metal düğme */}
      <rect x={-400} y={1500} width={1900} height={900} fill={CIC.cevizGolge} />
      <Tarama sekil={[[-400, 1500], [1500, 1500], [1500, 1560], [-400, 1560]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="insert" seed={S + 2} />
      <rect x={60} y={1580} width={960} height={250} fill="#4a3a3c" stroke={CIC.murekkep} strokeWidth={4} />
      <circle cx={540} cy={1700} r={16} fill={CIC.kolMetal} stroke={CIC.murekkep} strokeWidth={3} />
    </g>;
    const { kaide, agiz } = L;
    const KT = param<{ x0?: number; y0?: number; x1?: number; y1?: number; on?: number; kapak?: Sayi; kare?: number[] } | null>(plan, "kutu", null);
    const kutuCiz = KT && (() => {
      const x0 = KT.x0 ?? 300, y0 = KT.y0 ?? 930, x1 = KT.x1 ?? 910, y1 = KT.y1 ?? 1240, on = KT.on ?? 90;
      const t = deger(KT.kapak ?? 0, KT.kare, p), th = (t * 100 * Math.PI) / 180, ky = y0 + (y1 - y0) * Math.cos(th);
      const kilitY = y1 + on * 0.5, kx = (x0 + x1) / 2;
      kilit.push({ ad: "kilit ağzı", p: ekranNokta(k, [kx, kilitY]), tur: "dokunus" });
      return <g>
        <rect x={x0 + 16} y={y0 + 20} width={x1 - x0} height={y1 - y0 + on} fill="#1e1a24" opacity={0.6} />
        {/* iç (kapak açıkken): koyu deri astar + sarımsı-gri belge destesi */}
        <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="#2a2228" stroke={CIC.murekkep} strokeWidth={4} />
        <rect x={x0 + 30} y={y0 + 26} width={x1 - x0 - 60} height={y1 - y0 - 50} fill={CIC.belgeIsik} opacity={0.85} />
        {[0.3, 0.45, 0.6, 0.75].map((v) => <line key={v} x1={x0 + 60} y1={y0 + (y1 - y0) * v} x2={x1 - 90} y2={y0 + (y1 - y0) * v} stroke="#8b8270" strokeWidth={4} opacity={0.6} />)}
        {/* kapak: arka kenardan menteşeli; açılınca yükselip duvara yaslanır (iç yüzü görünür) */}
        <polygon points={poly([[x0 - 6, y0], [x1 + 6, y0], [x1 + 6, ky], [x0 - 6, ky]])} fill={th > Math.PI / 2 ? "#3a2c30" : CIC.deri} stroke={CIC.murekkep} strokeWidth={4} />
        {th < Math.PI / 2 && [0.12, 0.88].map((u) => <rect key={u} x={x0 + (x1 - x0) * u - 22} y={y0 + (ky - y0) * 0.45} width={44} height={(ky - y0) * 0.1} fill={CIC.kilit} opacity={0.8} />)}
        {/* ön yüz + çelik kilit plakası + anahtar deliği (≥ 24 px) */}
        <rect x={x0 - 6} y={y1} width={x1 - x0 + 12} height={on} fill={CIC.deri} stroke={CIC.murekkep} strokeWidth={4} />
        <Tarama sekil={[[x0 - 6, y1 + on * 0.55], [x1 + 6, y1 + on * 0.55], [x1 + 6, y1 + on], [x0 - 6, y1 + on]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="insert" seed={S + 7} />
        <rect x={kx - 46} y={kilitY - 34} width={92} height={68} rx={8} fill={CIC.kilit} stroke={CIC.murekkep} strokeWidth={3} />
        <path d={`M ${kx} ${kilitY - 18} a 9 9 0 1 1 0.1 0 L ${kx + 6} ${kilitY + 16} L ${kx - 6} ${kilitY + 16} Z`} fill="#14121a" />
      </g>;
    })();
    zemin = <>{zemin}<g>
      {/* v3 tek parça okunur lamba: ağır kubbe kaide (gölgesi sağ-önde) · iki parçalı eklemli boyun (mafsal) · koni abajur gövdesi (tepe halkası) */}
      <ellipse cx={kaide[0] + 26} cy={kaide[1] + 8} rx={140} ry={36} fill="#1e1a24" opacity={0.7} />
      <path d={`M ${kaide[0] - 120} ${kaide[1]} Q ${kaide[0] - 118} ${kaide[1] - 78} ${kaide[0]} ${kaide[1] - 86} Q ${kaide[0] + 118} ${kaide[1] - 78} ${kaide[0] + 120} ${kaide[1]} Q ${kaide[0]} ${kaide[1] + 30} ${kaide[0] - 120} ${kaide[1]} Z`} fill={CIC.kaide} stroke={CIC.murekkep} strokeWidth={4} />
      <path d={`M ${kaide[0] - 70} ${kaide[1] - 52} Q ${kaide[0] - 20} ${kaide[1] - 80} ${kaide[0] + 40} ${kaide[1] - 74}`} stroke={CIC.metalNokta} strokeWidth={5} fill="none" opacity={0.7} />
      <Tarama sekil={[[kaide[0] + 40, kaide[1] - 70], [kaide[0] + 120, kaide[1] - 10], [kaide[0] + 110, kaide[1] + 10], [kaide[0] + 30, kaide[1] + 6]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="insert" seed={S + 5} />
      {(() => { const mf: P = [kaide[0] - 60, agiz[1] + 190]; return <g>
        <polyline points={poly([[kaide[0], kaide[1] - 84], mf, [agiz[0] - 20, agiz[1] - 120]])} stroke={CIC.kaide} strokeWidth={22} fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={poly([[kaide[0] - 6, kaide[1] - 84], [mf[0] - 6, mf[1]], [agiz[0] - 26, agiz[1] - 120]])} stroke={CIC.metalNokta} strokeWidth={4} fill="none" opacity={0.6} />
        <circle cx={mf[0]} cy={mf[1]} r={22} fill={CIC.kaide} stroke={CIC.murekkep} strokeWidth={4} /><circle cx={mf[0]} cy={mf[1]} r={7} fill={CIC.metalNokta} />
      </g>; })()}
      <polygon points={poly([[agiz[0] - 60, agiz[1] - 160], [agiz[0] + 60, agiz[1] - 160], [agiz[0] + 190, agiz[1]], [agiz[0] - 190, agiz[1]]])} fill={CIC.abajurDis} stroke={CIC.murekkep} strokeWidth={5} strokeLinejoin="round" />
      <ellipse cx={agiz[0]} cy={agiz[1] - 160} rx={60} ry={14} fill="#2e3632" stroke={CIC.murekkep} strokeWidth={4} />
      <Tarama sekil={[[agiz[0] + 10, agiz[1] - 160], [agiz[0] + 60, agiz[1] - 160], [agiz[0] + 190, agiz[1]], [agiz[0] + 40, agiz[1]]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="insert" seed={S + 3} />
      <ellipse cx={agiz[0]} cy={agiz[1]} rx={190} ry={34} fill={yanik > 0.05 ? CIC.abajurIc : "#4a4048"} stroke={CIC.murekkep} strokeWidth={3} />
    </g>{kutuCiz}</>;
  } else {
    // berlin: lambri duvar şeridi, maun masa, zeytin sümen, kubbe lamba; sert havuz
    zemin = <g>
      <rect x={-400} y={-400} width={1900} height={2800} fill={CIC.berlinOda} />
      <rect x={-400} y={-400} width={1900} height={920} fill={CIC.lambri} />
      {[210, 590, 900].map((x0, i) => { const x = x0 + (rnd(S, i) - 0.5) * 60; return <g key={i}><rect x={x} y={-400} width={10} height={920} fill="#3a3a54" /><Tarama sekil={[[x + 10, -400], [x + 24, -400], [x + 24, 520], [x + 10, 520]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="insert" seed={S + i} /></g>; })}
      <rect x={-400} y={520} width={1900} height={570} fill={CIC.maun} />
      <rect x={160} y={600} width={760} height={440} fill={CIC.sumen} stroke={CIC.murekkep} strokeWidth={3} />
      {havuzBant([CIC.berlinCekirdek, CIC.berlinCekirdek, CIC.berlinOrta], true)}
      {/* harita (Normandiya halkası, etiketsiz) */}
      <g transform="rotate(-3 540 730)">
        <rect x={250} y={560} width={580} height={340} fill={CIC.harita} stroke={CIC.murekkep} strokeWidth={3} />
        {/* Manş kıyısı: batıda Cotentin yarımadası kuzeye çıkıntı, doğuda Seine ağzına inen kıyı (etiketsiz) */}
        <path d="M 250 560 L 830 560 L 830 672 L 770 684 Q 730 676 700 700 Q 650 712 600 702 L 540 708 Q 500 712 478 690 L 474 628 Q 470 604 446 600 Q 418 602 410 628 L 404 690 Q 380 704 340 696 Q 300 690 250 706 Z" fill={CIC.deniz} stroke="#6a7a88" strokeWidth={3} />
        <path d="M 700 700 Q 720 730 760 740" stroke="#6a7a88" strokeWidth={4} fill="none" />
        {/* karşı kıyı (İngiltere güney kıyısı): üstte kara şeridi → kâğıtta iki kara arasında Manş okunur */}
        <path d="M 250 560 L 830 560 L 830 590 Q 760 604 700 596 Q 620 612 560 600 Q 470 614 400 598 Q 330 606 250 596 Z" fill={CIC.kara} stroke="#6a7a88" strokeWidth={3} />
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${300 + i * 110} ${640 + (i % 2) * 14} q 14 -6 28 0 t 28 0`} stroke="#7a8c98" strokeWidth={2.5} fill="none" />)}
        <circle cx={540} cy={740} r={78} fill="none" stroke={CIC.halka} strokeWidth={10} />
      </g>
      <rect x={-400} y={1090} width={1900} height={12} fill="#8a7468" />
      {/* masa önü (ağır yazı masası): iki ayak dolabı çekmeceli + kapalı ön panel — koyu diz boşluğu yok (ölü alan) */}
      <rect x={-400} y={1102} width={1900} height={1400} fill="#4a3a36" />
      {[[-380, 250], [830, 1460]].map(([x0, x1], i) => <g key={i}>{[0, 1, 2].map((j) => <g key={j}><rect x={x0 + 20} y={1290 + j * 210} width={x1 - x0 - 40} height={180} fill="#54423c" stroke={CIC.murekkep} strokeWidth={3} /><rect x={(x0 + x1) / 2 - 30} y={1370 + j * 210} width={60} height={16} rx={6} fill={CIC.kaide} /></g>)}</g>)}
      <rect x={260} y={1270} width={560} height={1300} fill="#3e302c" stroke={CIC.murekkep} strokeWidth={3} />
      {[0, 1].map((j) => <rect key={j} x={300} y={1310 + j * 300} width={480} height={260} fill="none" stroke="#2e2420" strokeWidth={4} />)}
      <Tarama sekil={[[260, 1270], [820, 1270], [820, 1300], [260, 1300]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="insert" seed={S + 14} />
    </g>;
    // çekmece içi (üstten görünür, kayma kadar): koyu ahşap + okunmamış karton yığını
    cekIc = cekKay > 1 && <g>
      <rect x={310} y={1092} width={460} height={cekKay + 10} fill="#2e2620" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={330 + i * 6} y={1100 + i * 4} width={410 - i * 10} height={Math.max(0, cekKay - 18)} fill={i % 2 ? "#a8956f" : CIC.dosya} stroke="#5a4a3a" strokeWidth={2} />)}
    </g>;
    cekOn = <g>
      <rect x={300} y={1100 + cekKay} width={480} height={160} fill={CIC.maun} stroke={CIC.murekkep} strokeWidth={4} />
      <Tarama sekil={[[300, 1100 + cekKay], [780, 1100 + cekKay], [780, 1116 + cekKay], [300, 1116 + cekKay]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="insert" seed={S + 12} />
      <rect x={510} y={1170 + cekKay} width={60} height={18} rx={6} fill={CIC.kaide} stroke={CIC.murekkep} strokeWidth={2} />
      <circle cx={522} cy={1176 + cekKay} r={3} fill={CIC.metalNokta} />
      {cekKose > 0.01 && <polygon points={poly([[640, 1100], [800, 1100], [780 - 30 * (1 - cekKose), 1100 - 84 * cekKose]])} fill={CIC.belgeIsik} stroke={CIC.murekkep} strokeWidth={2.5} />}
    </g>;
    kilit.push({ ad: "çekmece", p: ekranNokta(k, [540, 1180 + cekKay]), tur: "dokunus" });
    ust = <g>
      <ellipse cx={L.kaide[0]} cy={L.kaide[1]} rx={70} ry={22} fill={CIC.kaide} stroke={CIC.murekkep} strokeWidth={3} />
      <line x1={L.kaide[0]} y1={L.kaide[1]} x2={L.agiz[0] + 20} y2={L.agiz[1] - 40} stroke={CIC.kaide} strokeWidth={10} />
      <path d={`M ${L.agiz[0] - 75} ${L.agiz[1]} Q ${L.agiz[0]} ${L.agiz[1] - 120} ${L.agiz[0] + 75} ${L.agiz[1]} Z`} fill={CIC.kaide} stroke={CIC.murekkep} strokeWidth={4} />
      <ellipse cx={L.agiz[0]} cy={L.agiz[1]} rx={75} ry={16} fill={yanik > 0.05 ? CIC.berlinCekirdek : "#4a4048"} />
    </g>;
  }
  // gölgeler (masa düzlemi; aynı kaynak → aynı kayma), multiply
  const golgeler = <g style={{ mixBlendMode: "multiply" }} opacity={0.55}>
    {eller.map((e, i) => <El40Ciz key={i} e={e} p={p} pxm={pxm} isik={isikVek} taramaAci={TH} golge={{ renk: "#2a2230", kay: [golgeKay[0] * 3, golgeKay[1] * 3] }} />)}
  </g>;
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs><clipPath id="mcCek"><rect x={310} y={1092} width={460} height={cekKay + 10} /></clipPath><Desen id="mcTar" aci={TH} aralik={7} kalin={2.4} renk={CIC.tarama} alfa={0.6} seed={S + 9} /></defs>
      <rect x={0} y={0} width={1080} height={1920} fill="#1e1c28" />
      <RenkKaydi>
        <g transform={kam}>
          {zemin}
          {cekIc}
          {cekKay > 1 && <g clipPath="url(#mcCek)"><g transform={`translate(0 ${cekKay})`}>{serbest.filter(icinde).map((pr) => propC(pr))}</g></g>}
          {cekOn}
          {golgeler}
          {serbest.filter((pr) => pr.tur !== "carpi" && !icinde(pr)).map((pr) => propC(pr))}
          {/* çarpı hedef banknotun kâğıdına kırpılır (boya kâğıt dışına taşmaz; eleştiri #8) */}
          {serbest.filter((pr) => pr.tur === "carpi").map((pr, i) => {
            const cx = deger(pr.x, pr.kare, p), cy = deger(pr.y, pr.kare, p);
            const W = 0.211 * pxm, H = W / 1.575;
            const hedef = serbest.filter((q) => q.tur === "banknot").map((q) => ({ x: deger(q.x, q.kare, p), y: deger(q.y, q.kare, p), a: deger(q.aci ?? 0, q.kare, p), o: q.olcek ?? 1 }))
              .find((q) => { const r = (-q.a * Math.PI) / 180, dx = cx - q.x, dy = cy - q.y; return Math.abs(dx * Math.cos(r) - dy * Math.sin(r)) < (W * q.o) / 2 && Math.abs(dx * Math.sin(r) + dy * Math.cos(r)) < (H * q.o) / 2; });
            if (!hedef) return propC(pr);
            const id = `mcCarpi${i}`;
            return <g key={id}><defs><clipPath id={id}><rect x={-(W * hedef.o) / 2 + 3} y={-(H * hedef.o) / 2 + 3} width={W * hedef.o - 6} height={H * hedef.o - 6} transform={`translate(${hedef.x} ${hedef.y}) scale(1 ${kisalma}) rotate(${hedef.a})`} /></clipPath></defs><g clipPath={`url(#${id})`}>{propC(pr)}</g></g>;
          })}
          {ust}
          {eller.map((e, i) => {
            const pr = e.tut ? props.find((q) => q.id === e.tut!.prop) : undefined;
            const t = pr && tutulan.get(pr.id!) === e ? propC(pr, ((): P => { const u = el40Uc(e, p, pxm); return [u[0] + (e.tut!.dx ?? 0), u[1] + (e.tut!.dy ?? 0)]; })()) : undefined;
            return <El40Ciz key={i} e={e} p={p} pxm={pxm} isik={isikVek} taramaAci={TH} tutulan={t} />;
          })}
        </g>
      </RenkKaydi>
    </svg>
  );
};
export const masaCiceroArsiv = () => "litografi" as const; // üç masa da gece lambası (gündüz masası yok)
