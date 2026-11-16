// ===== Figür kiti 4: POZDAN — dış eklem JSON'u (MediaPipe; tools/poz_cikar.py) → iskelet Poz'u (Leningrad figür kararı 2026-11-16) =====
// Sözleşme (poz_cikar.py çıktısı):
//   { kaynak, w, h,
//     pose: { <mediapipe adı>: [x_px, y_px, z, gorunurluk] },      // nose, left_shoulder, …, left_heel, left_foot_index
//     el_sol?: [[x,y,z] × 21], el_sag?: [...],                      // MediaPipe Hands: 0 bilek, 5/9/13/17 boğumlar, 4/8/12/16/20 uçlar
//     yuz?: { yaw, pitch, roll, noktalar: { burun, cene, sol_goz, sag_goz, agiz_sol, agiz_sag, sol_kulak, sag_kulak: [x,y] } } }
//   "left" = kişinin solu (MediaPipe). İşaretler poz_cikar.py ile aynı: yuz.yaw + = burun görüntüde sağa (kişi kendi soluna döner);
//   pitch + = YUKARI bakar; roll + = baş kişinin kendi sağ omzuna yatar (görüntüde saat yönünün tersi). Kafa.tsx'e çevrilirken
//   pitch ve roll işareti ters çevrilir (Kafa: pitch + aşağı, roll + saat yönü).
// İlke: kaynaktan YALNIZ AÇILAR alınır; kemik boyları iskelet ORAN tablosundan (kaynaktaki çarpık oran/merceğin kısaltması kopyalanmaz).
// Görünürlüğü düşük eklem: komşu eklem görünürse IK hedefi olur (ör. dirsek yok + bilek var → bilek hedefli FABRIK); ikisi de yoksa
// varsayılan sarkık poz. Rapor hangi eklemin tamamlandığını söyler.
import { ElPozAdi, KolPoz, BacakPoz, ORAN, P2, Poz, sar, Taraf, aciV, uzak } from "./iskelet";

export type PozJson = {
  kaynak?: string; w: number; h: number;
  pose: Record<string, [number, number, number, number] | number[]>;
  el_sol?: number[][]; el_sag?: number[][];
  yuz?: { yaw?: number | null; pitch?: number | null; roll?: number | null; noktalar?: Record<string, number[]> };
};
export type PozdanAyar = {
  /** hedef pelvis (ekran px); verilmezse kaynak koordinatı × ölçek */
  kok?: P2;
  /** hedef px / baş birimi; verilmezse kaynaktan ölçülen */
  B?: number;
  zemin?: number;
  /** görünürlük eşiği (varsayılan 0.5) */
  esik?: number;
  /** kaynağı yatay aynala */
  ayna?: boolean;
};
export type PozdanSonuc = { poz: Poz; rapor: { Bkaynak: number; yon: 1 | -1; yaw: number; tamamlanan: string[]; uyari: string[] } };

const kis = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const orta = (a: P2, b: P2): P2 => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

export function pozdan(j: PozJson, ayar: PozdanAyar = {}): PozdanSonuc {
  const esik = ayar.esik ?? 0.5, tamamlanan: string[] = [], uyari: string[] = [];
  const ax = (x: number) => (ayar.ayna ? j.w - x : x);
  // aynada sol/sağ adları da yer değiştirir (kişinin solu görüntüde öbür yana geçer)
  const ad = (n: string) => (ayar.ayna ? n.replace(/^left_/, "TMP_").replace(/^right_/, "left_").replace(/^TMP_/, "right_") : n);
  const p = (n: string): P2 | null => { const v = j.pose[ad(n)]; return v && (v[3] ?? 1) >= esik ? [ax(v[0]), v[1]] : null; };
  const zz = (n: string) => j.pose[ad(n)]?.[2] ?? 0;
  const ls = p("left_shoulder"), rs = p("right_shoulder"), lh = p("left_hip"), rh = p("right_hip");
  if (!ls && !rs) throw new Error("pozdan: iki omuz da görünmüyor — poz çıkarılamaz");
  const omuzO = ls && rs ? orta(ls, rs) : (ls ?? rs)!;
  // ---- ölçek (B): segment / oran tahminleri; kısalma yalnız kısaltır → yüksek tahmine yakın, aykırıyı at ----
  const tah: number[] = [];
  const seg = (a: string, b: string, L: number) => { const A = p(a), Bq = p(b); if (A && Bq) tah.push(uzak(A, Bq) / L); };
  for (const s of ["left", "right"]) { seg(`${s}_shoulder`, `${s}_elbow`, ORAN.ustKol); seg(`${s}_elbow`, `${s}_wrist`, ORAN.onKol); seg(`${s}_hip`, `${s}_knee`, ORAN.uyluk); seg(`${s}_knee`, `${s}_ankle`, ORAN.baldir); }
  const kalcaO0 = lh && rh ? orta(lh, rh) : lh ?? rh;
  if (kalcaO0) tah.push(uzak(omuzO, kalcaO0) / (ORAN.omurgaAlt + ORAN.omurgaOrta + ORAN.omurgaUst - ORAN.omuzAlcak));
  tah.sort((a, b) => b - a);
  const Bk = tah.length === 0 ? 100 : tah.length === 1 || tah[0] <= 1.25 * tah[1] ? tah[0] : tah[1];
  const kalcaO: P2 = kalcaO0 ?? [omuzO[0], omuzO[1] + 2.1 * Bk];
  if (!kalcaO0) tamamlanan.push("kalça (omuzdan 2.1 B aşağı)");
  // ---- yön ve gövde dönüşü ----
  const burun = p("nose");
  let yon: 1 | -1 = 1;
  const yy = j.yuz?.yaw;
  if (yy != null && Math.abs(yy) > 8) yon = (ayar.ayna ? -yy : yy) > 0 ? 1 : -1;
  else if (burun && Math.abs(burun[0] - omuzO[0]) > 0.08 * Bk) yon = burun[0] > omuzO[0] ? 1 : -1;
  else if (ls && rs) yon = zz("right_shoulder") < zz("left_shoulder") ? 1 : -1; // yakın omuz (küçük z) → o yana dönük
  const omurgaA = aciV(kalcaO, omuzO);
  const rx = Math.cos(((omurgaA + 90) * Math.PI) / 180), ry = Math.sin(((omurgaA + 90) * Math.PI) / 180);
  let yaw = 60;
  if (ls && rs) {
    const gen = Math.abs((ls[0] - rs[0]) * rx + (ls[1] - rs[1]) * ry);
    yaw = (Math.acos(kis(gen / (2 * ORAN.omuzYari * Bk), 0, 1)) * 180) / Math.PI;
    if ((ls[0] - rs[0]) * rx + (ls[1] - rs[1]) * ry < -0.15 * Bk) uyari.push("sırt görünümü olabilir (sol omuz ekranın solunda) — desteklenmez, önden varsayıldı");
  } else { tamamlanan.push("gövde dönüşü (tek omuz → profil 60°)"); }
  const egim = sar((omurgaA + 90) * yon);
  // ---- boyun / baş ----
  const lk = p("left_ear"), rk = p("right_ear");
  const kulakO = lk && rk ? orta(lk, rk) : lk ?? rk;
  const boyunEgim = kulakO ? kis(sar((aciV(omuzO, kulakO) - omurgaA) * yon), -30, 60) : 10;
  // iskeletKur boyun/gövde eğimini başa kendisi ekler (pitch += eğim·cos·.5, roll += yon·eğim·sin·.45) → burada çıkarılır
  const one = egim + boyunEgim, yR = (yaw * Math.PI) / 180;
  const bas = {
    yaw: (j.yuz?.yaw != null ? (ayar.ayna ? -j.yuz.yaw : j.yuz.yaw) : yon * yaw) - yon * yaw,
    pitch: j.yuz?.pitch != null ? -j.yuz.pitch - one * Math.cos(yR) * 0.5 : 0,
    roll: j.yuz?.roll != null ? -(ayar.ayna ? -j.yuz.roll : j.yuz.roll) - yon * one * Math.sin(yR) * 0.45 : 0,
  };
  // ---- hedef uzay eşlemesi ----
  const B = ayar.B ?? Bk, k = B / Bk;
  const pelvisK = kalcaO;
  const kok: P2 = ayar.kok ?? [pelvisK[0] * k, pelvisK[1] * k];
  const esle = (q: P2): P2 => [kok[0] + (q[0] - pelvisK[0]) * k, kok[1] + (q[1] - pelvisK[1]) * k];
  // ---- kollar ----
  const asagi = omurgaA + 180;
  const elPoz = (h?: number[][]): { el?: ElPozAdi; elA?: number } => {
    if (!h || h.length < 13) return {};
    const P = (i: number): P2 => [ax(h[i][0]), h[i][1]];
    const kivrim = uzak(P(0), P(12)) / (uzak(P(0), P(9)) + uzak(P(9), P(12)) || 1);
    return { el: kivrim > 0.9 ? "sarkik" : kivrim > 0.75 ? "dayali" : kivrim > 0.58 ? "tutus" : "avuc", elA: aciV(P(0), P(9)) };
  };
  const kol = (t: Taraf): KolPoz => {
    const s = t === "sol" ? "left" : "right";
    const O = p(`${s}_shoulder`) ?? omuzO, D = p(`${s}_elbow`), W = p(`${s}_wrist`);
    const ep = elPoz(t === "sol" ? j.el_sol : j.el_sag);
    const isr = p(`${s}_index`);
    const elA = ep.elA ?? (W && isr ? aciV(W, isr) : undefined);
    if (D && W) {
      const uA = aciV(O, D), oA = aciV(D, W);
      let dirsek = sar((uA - oA) * yon);
      if (dirsek < 0) { uyari.push(`${t} dirsek ters (${dirsek.toFixed(0)}°) → 0'a kıstırıldı`); dirsek = 0; }
      return { ust: sar((asagi - uA) * yon), dirsek, bilek: elA !== undefined ? kis(sar((oA - elA) * yon), -70, 80) : 0, el: ep.el };
    }
    if (W) { tamamlanan.push(`${t} dirsek (bilek hedefli IK)`); return { hedef: esle(W), hedefNokta: "bilek", el: ep.el }; }
    if (D) { tamamlanan.push(`${t} bilek (varsayılan 15° bükük)`); return { ust: sar((asagi - aciV(O, D)) * yon), dirsek: 15, el: ep.el }; }
    tamamlanan.push(`${t} kol (varsayılan sarkık)`); return { ust: 4, dirsek: 14 };
  };
  // ---- bacaklar ----
  const bacak = (t: Taraf): BacakPoz => {
    const s = t === "sol" ? "left" : "right";
    const K = p(`${s}_hip`) ?? kalcaO, D = p(`${s}_knee`), A = p(`${s}_ankle`), T = p(`${s}_heel`), U = p(`${s}_foot_index`);
    const ayak = (bA: number) => (T && U ? kis(sar((aciV(T, U) - bA) * yon + 90), -25, 80) : 0);
    if (D && A) {
      const uA = aciV(K, D), bA = aciV(D, A);
      let diz = sar((bA - uA) * yon);
      if (diz < 0) { uyari.push(`${t} diz ters (${diz.toFixed(0)}°) → 0'a kıstırıldı`); diz = 0; }
      return { kalca: sar((90 - uA) * yon), diz, ayak: ayak(bA) };
    }
    if (A) { tamamlanan.push(`${t} diz (ayak bileği hedefli IK)`); return { hedef: esle(A) }; }
    if (D) { tamamlanan.push(`${t} ayak bileği (varsayılan)`); return { kalca: sar((90 - aciV(K, D)) * yon), diz: 5 }; }
    tamamlanan.push(`${t} bacak (varsayılan ayakta)`); return { kalca: 0, diz: 4 };
  };
  const poz: Poz = {
    kok, B, yon, yaw, egim, boyunEgim, bas,
    kol: { sol: kol("sol"), sag: kol("sag") }, bacak: { sol: bacak("sol"), sag: bacak("sag") }, zemin: ayar.zemin, hedefGoreli: true,
  };
  return { poz, rapor: { Bkaynak: Bk, yon, yaw, tamamlanan, uyari } };
}
