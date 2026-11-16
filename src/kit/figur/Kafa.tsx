// ===== Figür kiti 2: KAFA (Loomis kurgusu, yaw/pitch/roll; Leningrad figür kararı 2026-11-16; yalnız EKLEME) =====
// Kurgu (baş birimi H = tepe → çene; köken = kafatası küresinin merkezi, x = ekran sağı (kişinin solu), y aşağı, z kameraya):
//   - kafatası: yanlardan basık elipsoid (Loomis küresi + kesik yan diskler; kulak yan diskin ortasında),
//   - yüz halkası: alın → şakak → kaş çıkıntısı → göz çukuru girintisi → elmacık → yanak → çene açısı → çene. ¾ dönüşte uzak yanağın
//     siluet girintileri bu halkadan kendiliğinden çıkar,
//   - çizgiler: kaş hattı y .05, göz .13, burun tabanı .345, ağız .445, çene .645. Kulak kaş–burun tabanı arasında, memesi y .345;
//     çene açısı (gonion) y .45 → kulak memesinin ALTINDA (CLAUDE "Çene–boyun bağlantısı").
// Her yüz öğesi bu 3B noktalardan döndürülüp izdüşürülür: göz/kaş/burun/ağız/kulak konumu kurgudan türer, elle konmaz.
// Yüz hacmi TON ALANIYLA (iç çizgi yok; CLAUDE "Yüzde iç çizgi"): gölge sınırı yüzü dikey ikiye bölen bıçak değil, ışık vektörüne dik
// büyük dairenin izdüşümü (elips) → hacmi izler. Göz çukuru, burun yan düzlemi, burun altı, alt dudak altı, yanak çukuru yumuşak ton.
// İzinli tek çizgiler: kirpik hattı, ağız yarığı, uzak burun kenarı (kısa, ten gölgesi rengi, yarı saydam).
import React, { useId } from "react";
import { karistir, rnd } from "../../doku/sabitler";
import { MurekkepCizgi, murekkepRenk } from "../cizim/MurekkepCizgi";
import { daireD, egriD, elipsNokta, f1, Siluet, yolD, zarf } from "./geo";
import type { P2 } from "./iskelet";

export type V3 = [number, number, number];
export type KafaDonus = { yaw: number; pitch: number; roll: number };
export type KafaIfade = {
  /** kaş iç ucu kalkması −1..1 (+ endişe/üzüntü, − çatık) */ kas?: number;
  /** göz açıklığı 0..1 (0.65 doğal; üst kapak irisin üstünü ~%20 örter) */ goz?: number;
  /** ağız açıklığı 0..1 */ agiz?: number;
  /** ağız köşesi −1..1 */ gulus?: number;
  /** bakış (−1..1, −1..1): göz içinde iris kayması */ bakis?: P2;
  /** yaş/açlık 0..1: yanak çukuru, göz torbası, alın ton bantları */ yas?: number;
  /** sakal izi 0..1 */ sakal?: number;
  /** zayıflık/açlık 0..1: yanak ve çene açısı içe, elmacık çıkık, yanak çukuru ve şakak çukuru koyu (ton alanı; iç çizgi yok) */ zayif?: number;
  /** saç dağınıklığı 0..1: düzensiz tutam siluet + saç yönünde tel çizgileri + gerileyen alın çizgisi (kask okunmasın) */ sacDagin?: number;
  /** şakaklarda kır saç rengi (verilirse) */ sacKir?: string;
};
export type KafaPalet = {
  ten: string; tenGolge: string; tenDerin: string; kenar: string; yansima?: string;
  sac: string; sacIsik: string; kas: string; gozAk: string; iris: string; bebek: string; dudak: string; kontur?: string;
};
export const KAFA_PALET_ORNEK: KafaPalet = {
  ten: "#d9b49a", tenGolge: "#9c7466", tenDerin: "#5e3f3e", kenar: "#f3d2a6", yansima: "#c98f7c",
  sac: "#3b302f", sacIsik: "#6d5a52", kas: "#3a2c2a", gozAk: "#e6dccb", iris: "#5b6470", bebek: "#1d1719", dudak: "#a86a62",
};

// ---------------- 3B kurgu noktaları (sağ yarı, x > 0; sol = ayna) ----------------
const KAFATASI = { c: [0, -0.03, -0.06] as V3, r: [0.315, 0.36, 0.37] as V3 };
// üst yüz halkası (alın → yanak; ¾'te uzak kaş çıkıntısı / göz çukuru girintisi buradan) + alt yüz ÇENE ZARFI (dışbükey: çene açısında
// çentik olmaz; ramus arkası kulak memesi altından çene açısına iner)
const HALKA_SAG: V3[] = [
  [0.0, -0.22, 0.31], [0.16, -0.19, 0.27], [0.28, -0.08, 0.17], [0.3, 0.02, 0.13],
  [0.285, 0.05, 0.215], // kaş dışı (çıkıntı)
  [0.272, 0.13, 0.18], // göz çukuru dışı (girinti)
  [0.295, 0.2, 0.135], // elmacık
  [0.28, 0.33, 0.13], // yanak
];
const CENE_SAG: V3[] = [[0.28, 0.33, 0.13], [0.29, 0.29, -0.05], [0.282, 0.45, -0.02] /* gonion */, [0.215, 0.56, 0.1], [0.1, 0.623, 0.2], [0.0, 0.645, 0.235], [0.0, 0.44, 0.3]];
const ayna = (v: V3): V3 => [-v[0], v[1], v[2]];
const HALKA: V3[] = [...HALKA_SAG, [0, 0.42, 0.3], ...HALKA_SAG.slice(1).reverse().map(ayna)];
const CENE: V3[] = [...CENE_SAG, ...CENE_SAG.map(ayna)];
const KULAK_SAG: V3[] = [[0.29, 0.04, -0.02], [0.315, 0.005, -0.07], [0.345, 0.025, -0.13], [0.355, 0.12, -0.165], [0.343, 0.225, -0.145], [0.322, 0.3, -0.1], [0.305, 0.345, -0.062], [0.288, 0.33, -0.03], [0.285, 0.22, 0.0], [0.288, 0.12, 0.0]];
/** boyun tepe halkası (baş siluetinin İÇİNDE: çene altı, çene açısı arkası, mastoid, ense) — boyun bunun zarfıyla bağlanır → delik yok */
export const BOYUN_UST: V3[] = [[0, 0.52, 0.09], [0.15, 0.47, 0.0], [0.2, 0.37, -0.15], [0.13, 0.32, -0.24], [0, 0.3, -0.27], [-0.13, 0.32, -0.24], [-0.2, 0.37, -0.15], [-0.15, 0.47, 0.0]];
/** atlas (kafatası eklemi): iskeletin baş eklemi buraya oturur */
export const ATLAS_YEREL: V3 = [0, 0.3, -0.06];
const SAC_CIZGI_SAG: V3[] = [[0, -0.245, 0.3], [0.12, -0.225, 0.27], [0.22, -0.155, 0.215], [0.28, -0.075, 0.16], [0.3, 0.02, 0.11], [0.305, 0.15, 0.065], [0.312, 0.06, 0.02], [0.33, -0.02, -0.08], [0.322, 0.09, -0.2], [0.27, 0.27, -0.25], [0.14, 0.36, -0.3], [0, 0.375, -0.32]];
const SAC_CIZGI: V3[] = [...SAC_CIZGI_SAG, ...SAC_CIZGI_SAG.slice(1, -1).reverse().map(ayna)];

// ---------------- dönüş ----------------
export const dondur = (v: V3, d: KafaDonus): V3 => {
  const p = (d.pitch * Math.PI) / 180, y = (d.yaw * Math.PI) / 180, r = (d.roll * Math.PI) / 180;
  let [x, yy, z] = v;
  [yy, z] = [yy * Math.cos(p) + z * Math.sin(p), -yy * Math.sin(p) + z * Math.cos(p)]; // pitch (+ aşağı bakar)
  [x, z] = [x * Math.cos(y) + z * Math.sin(y), -x * Math.sin(y) + z * Math.cos(y)]; // yaw (+ yüz ekran sağına)
  [x, yy] = [x * Math.cos(r) - yy * Math.sin(r), x * Math.sin(r) + yy * Math.cos(r)]; // roll (+ saat yönü)
  return [x, yy, z];
};
const birim = (v: V3): V3 => { const l = Math.hypot(...v) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };

export type KafaGeo = ReturnType<typeof kafaGeo>;
/** Kafa geometrisi (ekran): merkez = kafatası küresi merkezi (px), H = baş boyu (px). */
export function kafaGeo(merkez: P2, H: number, d: KafaDonus, zayif = 0) {
  const don = (v: V3) => dondur(v, d);
  // zayıflık: yanak (halka 7) ve alt çene (çene zarfı 1–3) içe; elmacık (halka 6) yerinde → çıkık okunur
  const zx = (v: V3, k: number): V3 => [v[0] * (1 - k * zayif), v[1], v[2]];
  const HALKA_Z: V3[] = zayif ? [...HALKA_SAG.map((v, i) => (i === 7 ? zx(v, 0.12) : v)), [0, 0.42, 0.3], ...HALKA_SAG.slice(1).reverse().map((v, j) => ayna(HALKA_SAG.length - 1 - j === 7 ? zx(v, 0.12) : v))] : HALKA;
  // + alt yüz uzar (çene 0.04 H aşağı): uzun, çökük yüz
  const CENE_Z: V3[] = zayif ? (() => { const r = CENE_SAG.map((v, i) => { const w = i <= 3 ? zx(v, [0.12, 0.1, 0.09, 0.12][i]) : v; return [w[0], w[1] + (w[1] > 0.5 ? 0.04 * zayif : 0), w[2]] as V3; }); return [...r, ...r.map(ayna)]; })() : CENE;
  const pr = (v: V3): P2 => { const q = don(v); return [merkez[0] + q[0] * H, merkez[1] + q[1] * H]; };
  /** normalin kameraya bakışı (−1..1) */
  const bakar = (n: V3) => don(birim(n))[2];
  // kafatası elipsoidi: yüzey örnekleri → zarf (ortografik izdüşümün tam silueti)
  const kafatasi: P2[] = [];
  for (let i = 0; i < 18; i++) for (let j = 1; j < 12; j++) {
    const th = (i / 18) * Math.PI * 2, ph = (j / 12) * Math.PI;
    kafatasi.push(pr([KAFATASI.c[0] + Math.sin(ph) * Math.cos(th) * KAFATASI.r[0], KAFATASI.c[1] - Math.cos(ph) * KAFATASI.r[1], KAFATASI.c[2] + Math.sin(ph) * Math.sin(th) * KAFATASI.r[2]]));
  }
  kafatasi.push(pr([KAFATASI.c[0], KAFATASI.c[1] - KAFATASI.r[1], KAFATASI.c[2]]), pr([KAFATASI.c[0], KAFATASI.c[1] + KAFATASI.r[1], KAFATASI.c[2]]));
  const kafatasiZarf = zarf(kafatasi);
  const halka = HALKA_Z.map(pr);
  const ceneZarf = zarf(CENE_Z.map(pr));
  const bz = 1 + 0.12 * zayif; // zayıf yüzde burun belirgin (uzun, ince sırt)
  const burun3: V3[] = ([[0.03, 0.08, 0.285], [-0.03, 0.08, 0.285], [0, 0.2, 0.34], [0, 0.3, 0.4], [0.02, 0.33, 0.37], [-0.02, 0.33, 0.37], [0, 0.345, 0.345], [0.062, 0.315, 0.295], [-0.062, 0.315, 0.295]] as V3[]).map((v) => [v[0], 0.08 + (v[1] - 0.08) * bz, 0.285 + (v[2] - 0.285) * bz] as V3);
  const burunZarf = zarf(burun3.map(pr));
  const boyunUst = BOYUN_UST.map(pr);
  const parcalar = [egriD(kafatasiZarf), egriD(halka), egriD(ceneZarf), egriD(burunZarf)];
  return { don, pr, bakar, kafatasiZarf, halka, ceneZarf, burunZarf, boyunUst, parcalar, merkez, H, d };
}

/** Atlas (iskelet baş eklemi, ekran) → kafatası merkezi */
export const kafaMerkezi = (atlas: P2, H: number, d: KafaDonus): P2 => { const q = dondur(ATLAS_YEREL, d); return [atlas[0] - q[0] * H, atlas[1] - q[1] * H]; };

// quadratic: a → b, m'den geçen (t = .5)
const qD = (a: P2, m: P2, b: P2) => { const c: P2 = [2 * m[0] - (a[0] + b[0]) / 2, 2 * m[1] - (a[1] + b[1]) / 2]; return { c, d: `Q${f1(c[0])},${f1(c[1])} ${f1(b[0])},${f1(b[1])}` }; };
const qOrnek = (a: P2, m: P2, b: P2, n = 10): P2[] => { const { c } = qD(a, m, b); return Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]] as P2; }); };

export type KafaProps = {
  /** kafatası merkezi (px) — ya da atlas verilir */
  merkez?: P2; atlas?: P2;
  H: number; donus: KafaDonus; ifade?: KafaIfade; P?: KafaPalet;
  /** ışığın EKRANDA gittiği yön (kit sözleşmesi; sol-üstten gelen ışık → [0.75, 0.66]) */
  isik?: P2;
  /** ışığın kameraya doğru bileşeni (0 = tam yandan, 1 = önden) */
  isikOn?: number;
  seed?: number;
  /** boyun yolu: verilirse baş konturu boyun üstünde soluk (çene altı çizgi değil ton) */
  boyunD?: string;
  /** kenar ışığını sahnenin ışık çokgeniyle kırp (IsikClip id) */
  isikClipId?: string;
  ayrinti?: "yakin" | "orta" | "uzak";
};

export const Kafa: React.FC<KafaProps> = ({ merkez: m0, atlas, H, donus, ifade = {}, P = KAFA_PALET_ORNEK, isik = [0.75, 0.66], isikOn = 0.55, seed = 31, boyunD, isikClipId, ayrinti }) => {
  const uid = "kf" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const merkez = m0 ?? kafaMerkezi(atlas ?? [0, 0], H, donus);
  const zayif = ifade.zayif ?? 0, dagin = ifade.sacDagin ?? 0;
  const g = kafaGeo(merkez, H, donus, zayif);
  const { pr, bakar, don } = g;
  const k = H / 500;
  const ay = ayrinti ?? (H >= 260 ? "yakin" : H >= 90 ? "orta" : "uzak");
  const il = Math.hypot(isik[0], isik[1]) || 1, lx = isik[0] / il, ly = isik[1] / il;
  const L3 = birim([-lx, -ly, isikOn * 1.6]); // ışığa doğru (3B, kafa çerçevesi değil ekran çerçevesi)
  const aydin = (n: V3) => { const q = don(birim(n)); return q[0] * L3[0] + q[1] * L3[1] + q[2] * L3[2]; };
  const kontur = P.kontur ?? murekkepRenk(P.ten, 0.72);
  const golgeS = karistir(P.tenGolge, "#5f6382", 0.3); // yanak çukuru: soğuk gölge (allık gibi okunmasın)
  const goz = ifade.goz ?? 0.65, kas = ifade.kas ?? 0, agiz = ifade.agiz ?? 0, gulus = ifade.gulus ?? 0, bakis = ifade.bakis ?? [0, 0], yas = ifade.yas ?? 0, sakal = ifade.sakal ?? 0;
  const KA = { isik: [lx, ly] as P2, kalinlik: [1.1 * k, 4.2 * k] as [number, number], kayip: 0.55, seed };
  const blur = (s: number) => `url(#${uid}b${s})`;
  // ---------------- gölge maskesi: ışık vektörüne dik büyük dairenin izdüşümü (elips) + ışık tarafı yarı düzlemi = aydınlık ----------------
  const c0 = pr([0, 0.12, 0.05]);
  const Rg = 0.52 * H, Lz = Math.max(0.15, Math.min(1, L3[2]));
  const yonDeg = (Math.atan2(ly, lx) * 180) / Math.PI;
  const aydinlik = `M${f1(c0[0] - lx * 3 * H - ly * 3 * H)},${f1(c0[1] - ly * 3 * H + lx * 3 * H)} L${f1(c0[0] - lx * 3 * H + ly * 3 * H)},${f1(c0[1] - ly * 3 * H - lx * 3 * H)} L${f1(c0[0] + ly * 3 * H)},${f1(c0[1] - lx * 3 * H)} L${f1(c0[0] - ly * 3 * H)},${f1(c0[1] + lx * 3 * H)}Z`;
  const terminator = yolD(elipsNokta([c0[0] + lx * 0.04 * H, c0[1] + ly * 0.04 * H], Rg * Lz, Rg * 1.1, yonDeg, 40));
  // ---------------- kulaklar ----------------
  const kulaklar = ([1, -1] as const).map((s) => {
    const q = KULAK_SAG.map((v) => pr([v[0] * s, v[1], v[2]]));
    const nz = bakar([s, 0, -0.25]);
    return { s, q, nz, ic: pr([s * 0.33, 0.17, -0.08]) };
  });
  const Kulak = ({ q, ic, s }: { q: P2[]; ic: P2; s: number }) => (
    <g>
      <Siluet d={[egriD(q)]} dolgu={P.ten} kontur={kontur} ayar={{ ...KA, kalinlik: [0.9 * k, 3 * k], seed: seed + 5 + s }} />
      {ay !== "uzak" && <ellipse cx={ic[0]} cy={ic[1]} rx={0.022 * H} ry={0.05 * H} fill={P.tenGolge} opacity={0.75} filter={blur(2)} />}
      {ay === "yakin" && <MurekkepCizgi q={[q[2], q[3], q[4], q[5]].map((p) => [p[0] + (ic[0] - p[0]) * 0.3, p[1] + (ic[1] - p[1]) * 0.3] as P2)} egri renk={P.tenGolge} kalinlik={2.2 * k} seed={seed + 9} />}
    </g>
  );
  // gerileyen saç çizgisi (yaş): şakaklarda (x ≈ ±0.2) geri ve yukarı çekilir, ortada hafif sivri (dul tepesi)
  const sacCizgi: V3[] = SAC_CIZGI.map((v) => { const ax = Math.abs(v[0]); if (v[2] < 0.05 || ax > 0.31) return v; const w = Math.exp(-(((ax - 0.21) / 0.06) ** 2)) * dagin * 0.3; return [v[0] * (1 - 0.05 * w), v[1] - 0.05 * w, v[2] - 0.04 * w]; });
  // ---------------- saç: kafatası × 1.06 zarfı (seed'li tutam) ∩ görünür saç çizgisinin üstü ----------------
  const sacZarf = (() => {
    const pts: P2[] = [];
    for (let i = 0; i < 22; i++) for (let j = 1; j < 10; j++) {
      const th = (i / 22) * Math.PI * 2, ph = (j / 10) * Math.PI * 0.62;
      const hac = 1 + 0.05 * dagin * (1 - ph / Math.PI); // dağınık saçta tepe hacmi
      pts.push(pr([KAFATASI.c[0] + Math.sin(ph) * Math.cos(th) * KAFATASI.r[0] * 1.045 * hac, KAFATASI.c[1] - Math.cos(ph) * KAFATASI.r[1] * 1.04 * hac + (ph > 1.3 ? 0.06 : 0), KAFATASI.c[2] + Math.sin(ph) * Math.sin(th) * KAFATASI.r[2] * 1.045 * hac]));
    }
    const z = zarf([...pts, ...sacCizgi.map(pr)]);
    const cx = z.reduce((a, p) => a + p[0], 0) / z.length, cy = z.reduce((a, p) => a + p[1], 0) / z.length;
    // tutam: zarf kenarında seed'li düzensiz şişkinlik (±0.02 H), 8–12 tutam
    const out: P2[] = [];
    z.forEach((p, i) => {
      const b = z[(i + 1) % z.length];
      out.push(p);
      const m: P2 = [(p[0] + b[0]) / 2, (p[1] + b[1]) / 2], dx = m[0] - cx, dy = m[1] - cy, l = Math.hypot(dx, dy) || 1;
      const a = (rnd(seed, `tt${i}`) - 0.3) * (0.04 + 0.035 * dagin) * H;
      out.push([m[0] + (dx / l) * a, m[1] + (dy / l) * a]);
    });
    return out;
  })();
  const sacBolge = (() => {
    const q = sacCizgi.map((v) => ({ p: pr(v), g: bakar([v[0] - KAFATASI.c[0], v[1] - KAFATASI.c[1], v[2] - KAFATASI.c[2]]) > -0.05 }));
    const n = q.length; let bas = q.findIndex((x) => !x.g);
    if (bas < 0) bas = 0;
    let en: P2[] = [], cur: P2[] = [];
    for (let i = 1; i <= n; i++) { const x = q[(bas + i) % n]; if (x.g) cur.push(x.p); else { if (cur.length > en.length) en = cur; cur = []; } }
    if (cur.length > en.length) en = cur;
    if (en.length < 2) return "";
    const yuk = don([0, -1, 0]), uy: P2 = [yuk[0], yuk[1]], ul = Math.hypot(...uy) || 1;
    const dis = (p: P2): P2 => { const dx = p[0] - g.merkez[0], dy = p[1] - g.merkez[1], l = Math.hypot(dx, dy) || 1; return [p[0] + (dx / l) * 1.2 * H, p[1] + (dy / l) * 1.2 * H]; };
    const a = dis(en[0]), b = dis(en[en.length - 1]), up = (p: P2): P2 => [p[0] + (uy[0] / ul) * 2.5 * H, p[1] + (uy[1] / ul) * 2.5 * H];
    return yolD([up(a), a, ...en, b, up(b)]);
  })();
  // ---------------- yüz öğeleri ----------------
  const gozler = ([1, -1] as const).map((s) => {
    const c: V3 = [s * 0.12, 0.13, 0.255];
    const v = bakar([s * 0.45, 0, 1]);
    const ic = pr([s * 0.062, 0.137, 0.262]), dis = pr([s * 0.18, 0.124, 0.222]);
    const ust = pr([s * 0.118, 0.13 - 0.034 * goz, 0.272]), alt = pr([s * 0.118, 0.148, 0.264]);
    const iris = pr([c[0] + bakis[0] * 0.028, c[1] + 0.004 + bakis[1] * 0.012, c[2] + 0.02]);
    return { s, v, ic, dis, ust, alt, iris, kirisim: pr([s * 0.118, 0.13 - 0.034 * goz - 0.024, 0.27]), torba: pr([s * 0.12, 0.178, 0.25]), cukur: pr([s * 0.12, 0.12, 0.24]) };
  });
  const kaslar = ([1, -1] as const).map((s) => ({ s, v: bakar([s * 0.5, -0.2, 1]), q: ([[s * 0.045, 0.045 - kas * 0.032, 0.31], [s * 0.12, 0.02 - kas * 0.012, 0.305], [s * 0.21, 0.042 + kas * 0.006, 0.255]] as V3[]).map(pr) }));
  const agizK = ([1, -1] as const).map((s) => pr([s * 0.085, 0.445 - gulus * 0.02, 0.27]));
  const agizHat: P2[] = [agizK[1], pr([-0.035, 0.447, 0.322]), pr([0, 0.449 + agiz * 0.01, 0.333]), pr([0.035, 0.447, 0.322]), agizK[0]];
  const ustDudak: P2[] = [agizK[1], pr([-0.03, 0.418, 0.333]), pr([0, 0.425, 0.338]), pr([0.03, 0.418, 0.333]), agizK[0]];
  const altDudak: P2[] = [agizK[0], pr([0.045, 0.478 + agiz * 0.04, 0.312]), pr([0, 0.486 + agiz * 0.045, 0.322]), pr([-0.045, 0.478 + agiz * 0.04, 0.312]), agizK[1]];
  const burunYan = ([1, -1] as const).map((s) => ({ s, a: aydin([s * 0.85, 0.1, 0.45]), q: ([[s * 0.012, 0.19, 0.33], [s * 0.014, 0.24, 0.348], [0, 0.3, 0.397], [s * 0.035, 0.333, 0.342], [s * 0.06, 0.31, 0.29], [s * 0.042, 0.21, 0.295]] as V3[]).map(pr) }));
  const uzakS = donus.yaw >= 0 ? 1 : -1; // uzak yan (x işareti): yüz sağa dönükse sağ yan uzak
  // sakal izi: alt yüzde seed'li noktalar (görünür olanlar)
  const sakalN: { p: P2; r: number }[] = [];
  if (sakal > 0 && ay === "yakin") for (let i = 0; i < 70; i++) {
    const x = (rnd(seed, `sx${i}`) - 0.5) * 0.46, y = 0.4 + rnd(seed, `sy${i}`) * 0.24;
    if (Math.abs(x) < 0.1 && y < 0.47 && y > 0.4) continue; // ağız
    if (y < 0.43 && Math.abs(x) > 0.1) continue;
    const zz = 0.3 - 1.1 * x * x - Math.max(0, y - 0.55) * 0.6;
    if (bakar([x * 2, 0.2, 1]) < 0.15) continue;
    sakalN.push({ p: pr([x, y, zz]), r: (0.9 + rnd(seed, `sr${i}`) * 0.8) * k });
  }
  const yuzD = g.parcalar;
  return (
    <g>
      <defs>
        {[1, 2, 3, 5, 12].map((s) => <filter key={s} id={`${uid}b${s}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={s * k} /></filter>)}
        <clipPath id={`${uid}yuz`}>{yuzD.map((x, i) => <path key={i} d={x} />)}</clipPath>
        <mask id={`${uid}golge`} maskUnits="userSpaceOnUse" x={merkez[0] - 3 * H} y={merkez[1] - 3 * H} width={6 * H} height={6 * H}>
          <rect x={merkez[0] - 3 * H} y={merkez[1] - 3 * H} width={6 * H} height={6 * H} fill="#fff" />
          <g filter={blur(2)}><path d={aydinlik} fill="#000" /><path d={terminator} fill="#000" /></g>
        </mask>
        {boyunD && <mask id={`${uid}km`} maskUnits="userSpaceOnUse" x={merkez[0] - 3 * H} y={merkez[1] - 3 * H} width={6 * H} height={6 * H}>
          <rect x={merkez[0] - 3 * H} y={merkez[1] - 3 * H} width={6 * H} height={6 * H} fill="#fff" />
          <path d={boyunD} fill="#262626" />
        </mask>}
        {sacBolge && <clipPath id={`${uid}sac`}><path d={sacBolge} /></clipPath>}
      </defs>
      {/* arkadaki (uzak) kulak: siluetin arkasında, yalnız kenarı görünür */}
      {kulaklar.filter((q) => q.nz <= 0.05 && q.nz > -0.75).map((q) => <Kulak key={q.s} {...q} />)}
      {/* baş silueti: kafatası + yüz halkası + burun (dikişsiz birleşim) */}
      <Siluet d={yuzD} dolgu={P.ten} kontur={kontur} ayar={KA} konturMaske={boyunD ? `${uid}km` : undefined} />
      <g clipPath={`url(#${uid}yuz)`}>
        {/* ışığa dönük yanak sıcaklığı (yansıma) */}
        {P.yansima && ay !== "uzak" && (() => { const c = pr([-uzakS * 0.2, 0.3, 0.2]); return <ellipse cx={c[0]} cy={c[1]} rx={0.09 * H} ry={0.06 * H} fill={P.yansima} opacity={0.12} filter={blur(5)} />; })()}
        {/* gölge yanı: terminatör elipsi (hacmi izler) */}
        <g mask={`url(#${uid}golge)`}>{yuzD.map((x, i) => <path key={i} d={x} fill={P.tenGolge} opacity={0.82} />)}</g>
        {ay !== "uzak" && <g>
          {/* göz çukurları (kaş çıkıntısının altı) */}
          {gozler.map((e) => <ellipse key={e.s} cx={e.cukur[0]} cy={e.cukur[1]} rx={0.075 * H * Math.max(0.35, e.v)} ry={0.05 * H} fill={P.tenGolge} opacity={Math.min(0.92, 0.5 + 0.2 * (aydin([e.s * 0.3, 0.2, 1]) < 0.3 ? 1 : 0) + 0.25 * zayif)} filter={blur(3)} />)}
          {/* burun yan düzlemi: ışığa bakmayan yan */}
          {burunYan.filter((b) => b.a < 0.25).map((b) => <path key={b.s} d={egriD(b.q)} fill={P.tenGolge} opacity={0.38} filter={blur(2)} />)}
          {/* burun altı düşen gölge, alt dudak altı, çene altı */}
          {(() => { const c = pr([0.0, 0.37, 0.33]); return <ellipse cx={c[0] + lx * 0.012 * H} cy={c[1] + ly * 0.01 * H} rx={0.05 * H} ry={0.016 * H} fill={P.tenDerin} opacity={0.45} filter={blur(2)} />; })()}
          {(() => { const c = pr([0.0, 0.508, 0.3]); return <ellipse cx={c[0]} cy={c[1]} rx={0.045 * H} ry={0.014 * H} fill={P.tenGolge} opacity={0.6} filter={blur(2)} />; })()}
          {/* burun–dudak oluğu ve yanak çukuru (yaş/açlık): ton alanı, çizgi değil */}
          {([1, -1] as const).map((s) => { const a = pr([s * 0.075, 0.33, 0.29]), b = pr([s * 0.1, 0.43, 0.26]); const gl = aydin([s, 0, 0.6]) < 0.2; return <path key={s} d={yolD(elipsNokta([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], 0.012 * H, Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.55, (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI - 90, 16))} fill={P.tenGolge} opacity={Math.min(0.85, (gl ? 0.45 : 0.3) * (0.5 + yas * 0.6) + 0.15 * zayif)} filter={blur(2)} />; })}
          {([1, -1] as const).map((s) => { const c = pr([s * 0.225, 0.37, 0.12]); const gl = aydin([s, 0, 0.5]) < 0.25; return bakar([s, 0, 0.6]) > -0.2 ? <ellipse key={s} cx={c[0]} cy={c[1]} rx={(0.04 - 0.01 * zayif) * H} ry={(0.07 + 0.03 * zayif) * H} fill={zayif ? P.tenGolge : golgeS} opacity={((gl ? 0.26 : 0.06) + 0.18 * yas) * (1 - 0.35 * zayif) + 0.12 * zayif} filter={blur(zayif ? 12 : 5)} /> : null; })}
          {/* zayıflık: elmacık altı çukur (ışık tarafında da) + şakak çukuru + elmacık sırtı ışığı */}
          {zayif > 0 && ([1, -1] as const).map((s) => { const c = pr([s * 0.2, 0.3, 0.2]), t = pr([s * 0.27, -0.02, 0.15]), e = pr([s * 0.24, 0.2, 0.2]); const v = bakar([s, 0, 0.7]); return v > -0.1 ? <g key={`z${s}`}>
            <ellipse cx={c[0]} cy={c[1]} rx={0.05 * H} ry={0.03 * H} fill={P.tenGolge} opacity={0.2 * zayif} filter={blur(12)} />
            <ellipse cx={t[0]} cy={t[1]} rx={0.03 * H} ry={0.06 * H} fill={P.tenGolge} opacity={0.35 * zayif} filter={blur(12)} />
            {aydin([s, 0.1, 0.7]) > 0.2 && <ellipse cx={e[0]} cy={e[1]} rx={0.04 * H} ry={0.014 * H} fill={P.kenar} opacity={0.35 * zayif} filter={blur(2)} />}
          </g> : null; })}
          {yas > 0 && [0, 1, 2].map((i) => { const a = pr([-0.11 + i * 0.01, -0.13 + i * 0.04, 0.31]), b = pr([0.11 - i * 0.015, -0.13 + i * 0.04, 0.31]); return <path key={i} d={yolD(qOrnek(a, pr([0, -0.142 + i * 0.04 - (i === 2 ? kas * 0.01 : 0), 0.322]), b, 8), false)} stroke={P.tenGolge} strokeWidth={0.012 * H} strokeLinecap="round" fill="none" opacity={0.42 * yas} filter={blur(1)} />; })}
          {yas > 0 && gozler.filter((e) => e.v > 0.2).map((e) => <ellipse key={e.s} cx={e.torba[0]} cy={e.torba[1]} rx={0.045 * H * e.v} ry={0.014 * H} fill={P.tenGolge} opacity={0.55 * yas} filter={blur(2)} />)}
          {/* burun ucu ışığı */}
          {(() => { const c = pr([-uzakS * 0.012, 0.29, 0.4]); return <ellipse cx={c[0] - lx * 0.01 * H} cy={c[1] - ly * 0.01 * H} rx={0.016 * H} ry={0.012 * H} fill={P.kenar} opacity={0.5} filter={blur(1)} />; })()}
        </g>}
        {/* sakal izi */}
        {sakalN.map((n, i) => <circle key={i} cx={n.p[0]} cy={n.p[1]} r={n.r} fill={P.sac} opacity={0.32 * sakal} />)}
      </g>
      {/* ---- dudaklar ---- */}
      {ay !== "uzak" && <g>
        <path d={egriD([...ustDudak, ...agizHat.slice(1, -1).reverse()])} fill={karistir(P.dudak, P.tenGolge, 0.35)} opacity={0.75} />
        <path d={egriD([...altDudak, ...agizHat.slice(1, -1)])} fill={P.dudak} opacity={0.45} />
        {agiz > 0.05 && <path d={egriD([...agizHat, ...agizHat.slice(1, -1).reverse().map((p) => [p[0], p[1] + agiz * 0.035 * H] as P2)])} fill={P.tenDerin} />}
        <MurekkepCizgi q={agizHat} egri renk={karistir(P.tenDerin, P.dudak, 0.25)} kalinlik={4.4 * k} ucBas={10 * k} ucSon={10 * k} seed={seed + 3} />
      </g>}
      {/* ---- burun: uzak kenar (tek kısa çizgi, ten gölgesi rengi) + burun delikleri ---- */}
      {ay !== "uzak" && Math.abs(donus.yaw) > 12 && (() => {
        const q = ([[uzakS * 0.012, 0.18, 0.34], [uzakS * 0.004, 0.29, 0.4], [uzakS * 0.03, 0.335, 0.365], [uzakS * 0.055, 0.325, 0.31]] as V3[]).map(pr);
        return <MurekkepCizgi q={q} egri renk={P.tenDerin} alfa={0.55} kalinlik={3 * k} seed={seed + 4} />;
      })()}
      {ay !== "uzak" && ([1, -1] as const).map((s) => { const c = pr([s * 0.03, 0.337, 0.325]), v = bakar([s * 0.3, 1, 0.6]); return v > 0.1 ? <ellipse key={s} cx={c[0]} cy={c[1]} rx={0.016 * H} ry={0.0075 * H} fill={P.tenDerin} opacity={0.75} transform={`rotate(${donus.roll} ${c[0]} ${c[1]})`} /> : null; })}
      {/* ---- gözler ---- */}
      {gozler.filter((e) => e.v > 0.12).map((e) => {
        const id = `${uid}g${e.s > 0 ? "s" : "z"}`;
        const ust = qD(e.ic, e.ust, e.dis), alt = qD(e.dis, e.alt, e.ic);
        const badem = `M${f1(e.ic[0])},${f1(e.ic[1])} ${ust.d} ${alt.d}Z`;
        const rI = 0.026 * H;
        if (ay === "uzak") return <circle key={e.s} cx={e.iris[0]} cy={e.iris[1]} r={Math.max(1.2, rI * 0.6)} fill={P.tenDerin} />;
        return (
          <g key={e.s}>
            <defs><clipPath id={id}><path d={badem} /></clipPath></defs>
            {/* kapak kıvrımı (ton bandı, çizgi değil) */}
            {ay === "yakin" && <path d={yolD(qOrnek(e.ic, e.kirisim, e.dis, 10), false)} stroke={P.tenGolge} strokeWidth={0.011 * H} fill="none" strokeLinecap="round" opacity={0.45} filter={blur(1)} />}
            <path d={badem} fill={P.gozAk} />
            <g clipPath={`url(#${id})`}>
              <ellipse cx={e.iris[0]} cy={e.iris[1]} rx={rI * Math.max(0.45, e.v)} ry={rI} fill={P.iris} />
              <ellipse cx={e.iris[0]} cy={e.iris[1]} rx={rI * 0.45 * Math.max(0.45, e.v)} ry={rI * 0.45} fill={P.bebek} />
              {/* üst kapağın göz küresine düşen gölgesi */}
              <path d={yolD(qOrnek(e.ic, e.ust, e.dis, 10), false)} stroke={P.tenDerin} strokeWidth={0.026 * H} fill="none" opacity={0.35} />
              <circle cx={e.iris[0] - lx * rI * 0.4} cy={e.iris[1] - ly * rI * 0.45} r={rI * 0.2} fill="#f4ecdf" opacity={0.9} />
            </g>
            {/* kirpik hattı (izinli çizgi): dış uca doğru kalınlaşır */}
            <MurekkepCizgi q={qOrnek(e.ic, e.ust, e.dis, 10)} renk={P.tenDerin} kalinlik={(ay === "yakin" ? 5.5 : 4) * k} basinc={(t) => 0.35 + 0.65 * t} ucBas={6 * k} ucSon={4 * k} seed={seed + 11 + e.s} />
            {/* alt kapak: kısa, soluk */}
            {ay === "yakin" && <path d={yolD(qOrnek(e.dis, e.alt, e.ic, 8).slice(2, 7), false)} stroke={P.tenGolge} strokeWidth={1.8 * k} fill="none" strokeLinecap="round" opacity={0.6} />}
          </g>
        );
      })}
      {/* ---- kaşlar ---- */}
      {ay !== "uzak" && kaslar.filter((b) => b.v > 0.05).map((b) => <MurekkepCizgi key={b.s} q={b.q} egri renk={P.kas} kalinlik={(0.03 + 0.012 * yas) * H} basinc={(t) => 0.95 - 0.55 * t} ucBas={4 * k} ucSon={0.05 * H} seed={seed + 20 + b.s} />)}
      {/* kenar ışığı: ışık tarafında ince sıcak hilal (saçtan önce: saç örter) (sahne çokgeniyle kırpılabilir) */}
      <g clipPath={isikClipId ? `url(#${isikClipId})` : undefined}>
        <KenarHilal d={yuzD} renk={P.kenar} dx={lx * 0.014 * H} dy={ly * 0.014 * H} alfa={0.75} />
      </g>
      {/* ---- saç ---- */}
      {sacBolge && <g clipPath={`url(#${uid}sac)`}>
        <Siluet d={[egriD(sacZarf)]} dolgu={P.sac} kontur={murekkepRenk(P.sac, 0.6)} ayar={{ ...KA, kalinlik: [1.2 * k, 4 * k], seed: seed + 40 }} />
        {/* saç ışığı: ışık yanında 3 eşit olmayan, sivrilen tutam şeridi */}
        {ay !== "uzak" && [0, 1].map((i) => {
          const a = 0.14 + i * 0.07 + rnd(seed, `sa${i}`) * 0.03, x0 = -uzakS * (0.08 + i * 0.07);
          const q = ([[x0, -0.36 + i * 0.02, -0.02], [x0 * 1.2, -0.3 + i * 0.02, 0.14 + a * 0.2], [x0 * 1.35, -0.2 + i * 0.03, 0.24]] as V3[]).map(pr);
          return <MurekkepCizgi key={i} q={q} egri renk={P.sacIsik} alfa={0.45} kalinlik={(6 - i * 1.5) * k} seed={seed + 50 + i} />;
        })}
        <g mask={`url(#${uid}golge)`}><path d={egriD(sacZarf)} fill={murekkepRenk(P.sac, 0.35)} opacity={0.55} /></g>
        {/* dağınık saç: alından geriye taranmış tel demetleri (saç yönünde, sivrilen) + şakakta kır saç */}
        {dagin > 0 && ay !== "uzak" && Array.from({ length: 11 }, (_, i) => {
          const x0 = -0.26 + (i / 10) * 0.52 + (rnd(seed, `sx${i}`) - 0.5) * 0.04, uz = 0.16 + rnd(seed, `sl${i}`) * 0.1;
          const q = ([[x0, -0.2 + Math.abs(x0) * 0.4, 0.24], [x0 * 1.08, -0.3 + Math.abs(x0) * 0.2, 0.1], [x0 * 1.12 + (rnd(seed, `sk${i}`) - 0.5) * 0.04, -0.34 - uz * 0.3, -0.06 - uz]] as V3[]).map(pr);
          return <MurekkepCizgi key={`t${i}`} q={q} egri renk={i % 3 === 0 ? P.sacIsik : murekkepRenk(P.sac, 0.5)} alfa={0.55 * dagin} kalinlik={(i % 3 === 0 ? 3.4 : 2.6) * k} seed={seed + 60 + i} />;
        })}
        {ifade.sacKir && ([1, -1] as const).map((s) => { const c = pr([s * 0.29, -0.02, 0.06]); return <ellipse key={`k${s}`} cx={c[0]} cy={c[1]} rx={0.05 * H} ry={0.09 * H} fill={ifade.sacKir} opacity={0.7} filter={blur(3)} />; })}
      </g>}
      {/* öndeki (yakın) kulak saçın üstünde */}
      {kulaklar.filter((q) => q.nz > 0.05).map((q) => <Kulak key={q.s} {...q} />)}
    </g>
  );
};

/** silüetin ışık tarafındaki ince hilal: şekil − (ışık yönüne kaydırılmış şekil) */
export const KenarHilal: React.FC<{ d: string[]; renk: string; dx: number; dy: number; alfa?: number }> = ({ d, renk, dx, dy, alfa = 1 }) => {
  const id = "kh" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return <g>
    <defs><mask id={id} maskUnits="userSpaceOnUse" x={-4000} y={-4000} width={9000} height={9000}>
      {d.map((x, i) => <path key={`w${i}`} d={x} fill="#fff" />)}
      <g transform={`translate(${dx} ${dy})`}>{d.map((x, i) => <path key={`b${i}`} d={x} fill="#000" />)}</g>
    </mask></defs>
    <g mask={`url(#${id})`} opacity={alfa}>{d.map((x, i) => <path key={i} d={x} fill={renk} />)}</g>
  </g>;
};
export { daireD };
