// ===== Paris / Dagron eli — tek gravür dili (tasarım §15.1, tur-15) =====
// Çizgi film eli (sabit kalın kontur, tırnak lekesi, boğum tiresi, eşit genişlikte parmak) yerine:
//  - değişken kontur: yük (gölge) tarafı clamp(0.010·E, 3.5, 6) px, ışık tarafı ×0.36, uçlar ×0.25 — "iki çokgenli dolu kontur":
//    parça önce kontur renginde ışığın TERSİNE kaydırılmış kopya + ince stroke, üstüne dolgu.
//  - ten iki düz ton (ışık / gölge), gölge yüzünde tek açılı paralel tarama (sahne θ), ışık yüzünde içe yapışık kenar ışığı;
//  - parmaklar uca doğru incelir (0.115 E → 0.080 E), uç yarım yuvarlak; tırnak yalnız kök yayı; boğum çizgisi yok;
//  - avuç sırtında tek tendon çizgisi (α .6).
// Yerel çerçeve: bilek merkezi (0,0), +x parmaklara, başparmak −y tarafında, birim = E (el boyu, bilek → orta parmak ucu).
// Ekrana: bilek + açı + `ayna` (true → başparmak +y tarafına; sol/sağ anatomi tablosu §15.1.4 çağıranın sorumluluğunda).
// Katman ayrımı: `katman: "arka"` avuç + 4 parmak, `"on"` yalnız başparmak (kâğıt/nesne araya girer), `"hepsi"` ikisi.
import React, { useId } from "react";
import type { P } from "../../tipler";

export type ParmakPoz = { a: number; b: number; k?: number; gizli?: boolean }; // a yayılma°, b PIP bükülmesi° (+ avuç yönü), k kısalma
export type GravurPoz = { parmak: [ParmakPoz, ParmakPoz, ParmakPoz, ParmakPoz]; bas: { a: number; b: number; k?: number } };
export const GRAVUR_POZ: Record<"olcu" | "tutus" | "gevsek" | "kistir" | "cimdik", GravurPoz> = {
  // P05 ölçü (§15.1.5): avuç masaya yatık, dört parmak düz yan yana; işaret–orta 6°, diğerleri 0–3°; başparmak 50° açık, yatık
  olcu: { parmak: [{ a: -1, b: 4 }, { a: 0, b: 5 }, { a: 1, b: 6 }, { a: 2, b: 8, k: 0.97 }], bas: { a: -46, b: 8, k: 0.86 } },
  // P10 okuyan tutuşu: parmaklar kâğıdın arkasına kıvrık (kısalmış), başparmak kâğıdın ön yüzünde düz
  tutus: { parmak: [{ a: -8, b: 22, k: 0.92 }, { a: -2, b: 26, k: 0.9 }, { a: 4, b: 30, k: 0.86 }, { a: 10, b: 34, k: 0.82 }], bas: { a: -34, b: 4 } },
  // boştaki el: gevşek yarı açık, bükülme serçeye doğru 15 → 25°, başparmak işaret yanında (yumruk ve kavrama yok)
  gevsek: { parmak: [{ a: -4, b: 15, k: 0.95 }, { a: 0, b: 18, k: 0.93 }, { a: 4, b: 22, k: 0.9 }, { a: 8, b: 25, k: 0.88 }], bas: { a: -22, b: 8 } },
  // memur eli: zarfın kenarını başparmakla (üst) işaret/orta (alt) arasında kıstırır
  kistir: { parmak: [{ a: 0, b: 30, k: 0.88 }, { a: 6, b: 62, k: 0.66 }, { a: 10, b: 74, k: 0.58 }, { a: 14, b: 80, k: 0.52 }], bas: { a: -16, b: 4, k: 0.95 } },
  // zarf kapağı / sayfa ucu: başparmak ve işaret uçları buluşur, diğerleri gevşek kıvrık
  cimdik: { parmak: [{ a: -12, b: 34, k: 0.86 }, { a: 4, b: 70, k: 0.62 }, { a: 10, b: 80, k: 0.55 }, { a: 16, b: 85, k: 0.5 }], bas: { a: -10, b: 6, k: 0.92 } },
};
export type GravurPalet = { isik: string; golge: string; konturYuk: string; konturIsik: string; kenar: string; tarama: string; manset: string; mansetGolge: string };
export const GRAVUR_PALET: Record<"paris" | "dagron", GravurPalet> = {
  paris: { isik: "#d6b49c", golge: "#8f7360", konturYuk: "#5a4438", konturIsik: "#a8836c", kenar: "#f0c4a8", tarama: "#6a4f40", manset: "#5d5f63", mansetGolge: "#3e3f44" },
  dagron: { isik: "#c9a58a", golge: "#8e6a52", konturYuk: "#5a4132", konturIsik: "#a07f66", kenar: "#e6c9b4", tarama: "#6a4f40", manset: "#4a3a2c", mansetGolge: "#2e2318" },
};

const LEN = [0.42, 0.46, 0.43, 0.33]; // işaret, orta, yüzük, serçe (kökten uca, E)
const KOK: P[] = [[0.53, -0.152], [0.56, -0.05], [0.548, 0.054], [0.505, 0.15]];
const GEN0 = [0.115, 0.118, 0.11, 0.098], GEN1 = [0.08, 0.082, 0.078, 0.07];

/** konik parça: polyline + genişlikler → kapalı çokgen (uç yarım yuvarlak) */
const konik = (q: P[], w: number[], uc = true): P[] => {
  const n = q.length, sol: P[] = [], sag: P[] = [];
  for (let i = 0; i < n; i++) {
    const a = q[Math.max(0, i - 1)], b = q[Math.min(n - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    sol.push([q[i][0] + (nx * w[i]) / 2, q[i][1] + (ny * w[i]) / 2]); sag.push([q[i][0] - (nx * w[i]) / 2, q[i][1] - (ny * w[i]) / 2]);
  }
  const out: P[] = [...sol];
  if (uc) {
    const e = q[n - 1], p0 = q[n - 2], d = Math.atan2(e[1] - p0[1], e[0] - p0[0]), r = w[n - 1] / 2;
    for (let k = 1; k < 8; k++) { const t = d + Math.PI / 2 - (k * Math.PI) / 8; out.push([e[0] + Math.cos(t) * r, e[1] + Math.sin(t) * r]); }
  }
  return [...out, ...sag.reverse()];
};
/** Catmull-Rom kapalı yumuşak yol */
const yumusak = (q: P[]) => {
  const n = q.length, f = (v: number) => v.toFixed(1);
  let d = `M${f(q[0][0])} ${f(q[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = q[(i - 1 + n) % n], p1 = q[i], p2 = q[(i + 1) % n], p3 = q[(i + 2) % n];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + "Z";
};
const duz = (q: P[]) => `M${q.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("L")}Z`;

export type GravurElGeo = { parca: { ad: string; d: string; on: boolean }[]; uc: P[]; basUc: P; kok: P[]; tendon: [P, P]; mat: (q: P) => P };
/** yerel → ekran ve parça yolları */
export const gravurElGeo = (bilek: P, aci: number, E: number, poz: GravurPoz, ayna = false): GravurElGeo => {
  const r = (aci * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r), sy = ayna ? -1 : 1;
  const mat = (q: P): P => [bilek[0] + (q[0] * c - q[1] * sy * s) * E, bilek[1] + (q[0] * s + q[1] * sy * c) * E];
  const parca: { ad: string; d: string; on: boolean }[] = [];
  const uc: P[] = [];
  // parmaklar (arkadan öne: serçe → işaret; avuç sırtı görünür, kıvrık kısım kısalır)
  const parmakPts = [0, 1, 2, 3].map((i) => {
    const pz = poz.parmak[i], L = LEN[i] * (pz.k ?? 1), a0 = (pz.a * Math.PI) / 180, b = (pz.b * Math.PI) / 180;
    const k0 = KOK[i], p1: P = [k0[0] + Math.cos(a0) * L * 0.5, k0[1] + Math.sin(a0) * L * 0.5];
    // PIP/DIP bükülmesi: ekranda kısalma (cos) + hafif yön değişimi; silüet boğumda kırılır (parça birleşiminde)
    const a1 = a0 + b * 0.35, s2 = L * 0.28 * Math.cos(b * 0.6), p2: P = [p1[0] + Math.cos(a1) * s2, p1[1] + Math.sin(a1) * s2];
    const a2 = a1 + b * 0.35, s3 = L * 0.22 * Math.cos(b * 0.9), p3: P = [p2[0] + Math.cos(a2) * s3, p2[1] + Math.sin(a2) * s3];
    return { pts: [k0, p1, p2, p3] as P[], w: [GEN0[i], (GEN0[i] + GEN1[i]) / 2 + 0.006, GEN1[i] + 0.006, GEN1[i]], gizli: pz.gizli };
  });
  [3, 2, 1, 0].forEach((i) => { const f = parmakPts[i]; uc[i] = mat(f.pts[3]); if (!f.gizli) parca.push({ ad: `p${i}`, d: duz(konik(f.pts.map(mat), f.w.map((x) => x * E))), on: false }); });
  // avuç (sırt): bilek eni 0.30, kök eni 0.42, tenar kabarıklığı başparmak tarafında, ulna kabarması bilekte
  const avuc: P[] = [[-0.02, -0.15], [0.14, -0.19], [0.3, -0.215], [0.46, -0.205], [0.55, -0.16], [0.585, -0.05], [0.57, 0.06], [0.53, 0.16], [0.4, 0.2], [0.22, 0.185], [0.06, 0.168], [0.0, 0.155]];
  parca.push({ ad: "avuc", d: yumusak(avuc.map(mat)), on: false });
  // başparmak: bilekten 0.30 E ilerde tenardan çıkar, serbest kısım 0.30 E, en 0.135 → 0.095
  const ba = (poz.bas.a * Math.PI) / 180, bb = (poz.bas.b * Math.PI) / 180, bk = poz.bas.k ?? 1;
  const t0: P = [0.2, -0.13], t1: P = [t0[0] + Math.cos(ba) * 0.2 * bk, t0[1] + Math.sin(ba) * 0.2 * bk];
  const t2: P = [t1[0] + Math.cos(ba + bb) * 0.16 * bk, t1[1] + Math.sin(ba + bb) * 0.16 * bk], t3: P = [t2[0] + Math.cos(ba + bb * 1.6) * 0.13 * bk, t2[1] + Math.sin(ba + bb * 1.6) * 0.13 * bk];
  parca.push({ ad: "bas", d: duz(konik([t0, t1, t2, t3].map(mat), [0.145 * E, 0.125 * E, 0.105 * E, 0.09 * E])), on: true });
  return { parca, uc, basUc: mat(t3), kok: KOK.map(mat), tendon: [mat([0.14, -0.03]), mat([0.49, -0.07])], mat };
};

export const GravurEl: React.FC<{
  bilek: P; aci: number; E: number; poz: GravurPoz; ayna?: boolean; palet?: GravurPalet;
  isik: P; /** ekranda ışığa doğru birim vektör */ taramaAci: number; katman?: "arka" | "on" | "hepsi"; golge?: string; golgeKay?: P;
}> = ({ bilek, aci, E, poz, ayna, palet = GRAVUR_PALET.paris, isik, taramaAci, katman = "hepsi", golge, golgeKay }) => {
  const uid = "ge" + useId().replace(/:/g, "");
  const g = gravurElGeo(bilek, aci, E, poz, ayna);
  const yuk = Math.max(3.5, Math.min(6, 0.01 * E)), ince = Math.max(1.0, 0.36 * yuk);
  const L = Math.hypot(isik[0], isik[1]) || 1, lx = isik[0] / L, ly = isik[1] / L;
  const golgeBant = Math.min(12, Math.max(5, 0.045 * E)), kenar = E >= 400 ? 2.5 : 2;
  const aralik = E >= 400 ? 7 : 6, kalin = E >= 400 ? 2.5 : 2;
  const sec = g.parca.filter((p) => katman === "hepsi" || (katman === "on") === p.on);
  if (golge) {
    const [gx, gy] = golgeKay ?? [-lx * 20, -ly * 20];
    return <g transform={`translate(${gx} ${gy})`} fill={golge}>{sec.map((p) => <path key={p.ad} d={p.d} />)}</g>;
  }
  return (
    <g>
      <defs>
        <pattern id={`${uid}t`} patternUnits="userSpaceOnUse" width={aralik} height={aralik * 8} patternTransform={`rotate(${taramaAci})`}>
          <line x1={aralik / 2} y1={-2} x2={aralik / 2} y2={aralik * 8 + 2} stroke={palet.tarama} strokeWidth={kalin} />
        </pattern>
      </defs>
      {sec.map((p) => {
        const id = `${uid}${p.ad}`;
        return (
          <g key={p.ad}>
            <defs>
              <clipPath id={`${id}c`}><path d={p.d} /></clipPath>
              {/* gölge bandı = parça − (ışığa kaydırılmış parça); kenar ışığı = parça − (gölgeye kaydırılmış parça) */}
              <mask id={`${id}g`} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}><path d={p.d} fill="#fff" /><path d={p.d} fill="#000" transform={`translate(${lx * golgeBant} ${ly * golgeBant})`} /></mask>
              <mask id={`${id}k`} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}><path d={p.d} fill="#fff" /><path d={p.d} fill="#000" transform={`translate(${-lx * kenar} ${-ly * kenar})`} /></mask>
            </defs>
            {/* değişken kontur: gölge yönüne kaydırılmış kontur kopyası (yük) + ince çevre çizgisi (ışık) */}
            <path d={p.d} fill={palet.konturYuk} transform={`translate(${-lx * (yuk - ince)} ${-ly * (yuk - ince)})`} stroke={palet.konturYuk} strokeWidth={ince * 2} strokeLinejoin="round" />
            <path d={p.d} fill={palet.isik} stroke={palet.konturIsik} strokeWidth={ince * 2} strokeLinejoin="round" />
            <g mask={`url(#${id}g)`}>
              <path d={p.d} fill={palet.golge} />
              <g clipPath={`url(#${id}c)`}><path d={p.d} fill={`url(#${uid}t)`} transform={`translate(${-lx * 3} ${-ly * 3})`} /></g>
            </g>
            <g mask={`url(#${id}k)`}><path d={p.d} fill={palet.kenar} /></g>
            <path d={p.d} fill="none" stroke={palet.konturIsik} strokeWidth={ince} strokeLinejoin="round" />
          </g>
        );
      })}
      {/* avuç sırtı: tek tendon çizgisi (işaret–yüzük kemiği arası) */}
      {katman !== "on" && <line x1={g.tendon[0][0]} y1={g.tendon[0][1]} x2={g.tendon[1][0]} y2={g.tendon[1][1]} stroke={palet.konturIsik} strokeWidth={1.2} strokeOpacity={0.6} strokeLinecap="round" />}
    </g>
  );
};

/** kol konisi (tek giysi; §15.2.4): omuz → dirsek → bilek, dirsek dışı yuvarlak; genişlikler tam (px). Manşet bandı + gömlek manşeti. */
export const konikKol = (omuz: P, dirsek: P, bilek: P, w: [number, number, number]) => {
  const d1 = Math.atan2(dirsek[1] - omuz[1], dirsek[0] - omuz[0]), d2 = Math.atan2(bilek[1] - dirsek[1], bilek[0] - dirsek[0]);
  const n = (a: number, s: number): P => [Math.cos(a + (s * Math.PI) / 2), Math.sin(a + (s * Math.PI) / 2)];
  const kay = (q: P, v: P, k: number): P => [q[0] + v[0] * k, q[1] + v[1] * k];
  const n1a = n(d1, 1), n1b = n(d1, -1), n2a = n(d2, 1), n2b = n(d2, -1);
  // bükülme yönü: dirseğin dış tarafı
  const cr = Math.sin(d2 - d1); // >0: saat yönü (ekranda) dönüş
  const dis = cr > 0 ? -1 : 1;
  const A = [kay(omuz, n1a, w[0] / 2), kay(dirsek, n1a, w[1] / 2), kay(dirsek, n2a, w[1] / 2), kay(bilek, n2a, w[2] / 2)];
  const B = [kay(omuz, n1b, w[0] / 2), kay(dirsek, n1b, w[1] / 2), kay(dirsek, n2b, w[1] / 2), kay(bilek, n2b, w[2] / 2)];
  const f = (q: P) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  // dış kenar: dirsekte yay (r ≈ 0.55 w1, kumaş birikimi 1.1×); iç kenar: kıvrım noktasında birleşir
  const disK = dis > 0 ? A : B, icK = dis > 0 ? B : A;
  const ic: P = [(icK[1][0] + icK[2][0]) / 2, (icK[1][1] + icK[2][1]) / 2];
  const ort: P = [(disK[1][0] + disK[2][0]) / 2, (disK[1][1] + disK[2][1]) / 2], v: P = [ort[0] - dirsek[0], ort[1] - dirsek[1]], vl = Math.hypot(v[0], v[1]) || 1;
  const tepe: P = [dirsek[0] + (v[0] / vl) * w[1] * 0.58, dirsek[1] + (v[1] / vl) * w[1] * 0.58];
  const d = `M${f(disK[0])}L${f(disK[1])}Q${f(tepe)} ${f(disK[2])}L${f(disK[3])}L${f(icK[3])}L${f(ic)}L${f(icK[0])}Z`;
  // omuz başı konturu çizilmeyen açık kenar yolu (kol gövdeye karışır)
  const kenar = `M${f(icK[0])}L${f(ic)}L${f(icK[3])}L${f(disK[3])}L${f(disK[2])}Q${f(tepe)} ${f(disK[1])}L${f(disK[0])}`;
  return { d, kenar, dis, ic, ileri: (t: number): P => [bilek[0] + Math.cos(d2) * t, bilek[1] + Math.sin(d2) * t], d2, n2: n2a };
};

/** Eski ElDurum sözleşmesiyle (uç noktası + el açısı + kol açısı + px/m) gravür eli: P05/P09/P04b masa ve kafes elleri.
 *  Poz eşlemesi: kistir/kistirSiki → cimdik (uç = başparmak–işaret buluşması), isaret → gevsek (C2: havada tek parmak YOK),
 *  gevsek → gevsek (uç = orta parmak ucu). Tutulan nesne mutlak koordinatta, avuç/parmaklar ile başparmak ARASINDA çizilir. */
export type ElDurumG = { uc: P; aci: number; kolAci: number; pxm: number; poz: "kistir" | "kistirSiki" | "gevsek" | "isaret"; bukum?: number; dirsekM?: number };
export const GravurElDurum: React.FC<{ d: ElDurumG; tur: "dagron" | "paris"; isik: P; taramaAci: number; tutulan?: React.ReactNode; golge?: string; ayna?: boolean }> = ({ d, tur, isik, taramaAci, tutulan, golge, ayna }) => {
  const E = 0.19 * d.pxm, poz = d.poz === "kistir" || d.poz === "kistirSiki" ? GRAVUR_POZ.cimdik : GRAVUR_POZ.gevsek;
  const g0 = gravurElGeo([0, 0], d.aci, E, poz, ayna);
  const ref: P = d.poz === "gevsek" ? g0.uc[1] : d.poz === "isaret" ? g0.uc[0] : [(g0.basUc[0] + g0.uc[0][0]) / 2, (g0.basUc[1] + g0.uc[0][1]) / 2];
  const bilek: P = [d.uc[0] - ref[0], d.uc[1] - ref[1]];
  const r = (d.kolAci * Math.PI) / 180, yon: P = [Math.cos(r), Math.sin(r)];
  const dirsek: P = [bilek[0] - (d.dirsekM ?? 0.26) * d.pxm * yon[0], bilek[1] - (d.dirsekM ?? 0.26) * d.pxm * yon[1]];
  const r2 = r + ((d.bukum ?? 18) * Math.PI) / 180;
  const omuz: P = [dirsek[0] - 0.3 * d.pxm * Math.cos(r2), dirsek[1] - 0.3 * d.pxm * Math.sin(r2)];
  const kol = konikKol(omuz, dirsek, [bilek[0] - yon[0] * 0.02 * E, bilek[1] - yon[1] * 0.02 * E], [0.15 * d.pxm, 0.11 * d.pxm, 0.068 * d.pxm]);
  const pal = GRAVUR_PALET[tur], kolRenk = tur === "dagron" ? "#5a5068" : "#34363d", kolKontur = tur === "dagron" ? "#2e2318" : "#1b1d24";
  if (golge) return <g fill={golge}><path d={kol.d} /><GravurEl bilek={bilek} aci={d.aci} E={E} poz={poz} ayna={ayna} isik={isik} taramaAci={taramaAci} golge={golge} golgeKay={[0, 0]} /></g>;
  const mA = kol.ileri(-0.2 * E), mB = kol.ileri(0), nn = kol.n2, w = 0.034 * d.pxm + 2;
  const q = (o: P, k2: number): P => [o[0] + nn[0] * k2, o[1] + nn[1] * k2];
  return (
    <g>
      <path d={kol.d} fill={kolRenk} stroke={kolKontur} strokeWidth={3} strokeLinejoin="round" />
      <polygon points={[q(mA, w * 1.05), q(mB, w), q(mB, -w), q(mA, -w * 1.05)].map((v) => v.join(",")).join(" ")} fill={pal.manset} stroke={pal.mansetGolge} strokeWidth={2.5} />
      <GravurEl bilek={bilek} aci={d.aci} E={E} poz={poz} ayna={ayna} palet={pal} isik={isik} taramaAci={taramaAci} katman="arka" />
      {tutulan}
      <GravurEl bilek={bilek} aci={d.aci} E={E} poz={poz} ayna={ayna} palet={pal} isik={isik} taramaAci={taramaAci} katman="on" />
    </g>
  );
};
