// ===== Çiçero el–kol kuralları (mekanlar.md §2.10; kullanıcı tur-4: "El kol doğru değil özürlü gibi") =====
// Yalnız cicero yolu kullanır (ARABA v2, MASA-INSERT el40, ELÇİ-ODASI siluetKol, Kukla takim40). Eski bölümler bu dosyayı içe aktarmaz.
// Kurallar: (1) el havada sarkmaz — her el dayalı / tutuyor / iletiyor (poz adı bunu söyler); (2) bilek ön kolun devamı: el ekseni ile
// ön kol ekseni arası ≤ 30° (BILEK_MAKS), sınır kodda kırpılır; (3) el boyu E = 0.18 m × px/m (insert) ya da 0.75 × yüz (Kukla);
// (4) kol omuzdan dirsekle iner, dirsek iç açısı 70–160° (kolIK: mesafe kısa kalırsa kol derinliğe kısalır, açı 70°'de kalır);
// (5) ten L* ≤ 75, C* ≤ 20 (paletler/cicero EL_*).
import React from "react";
import { getInputProps } from "remotion";
import type { P } from "../../tipler";
import { GravurEl, GRAVUR_POZ, GravurPalet, konikKol } from "../paris/GravurEl";

export const BILEK_MAKS = 30;
export const DIRSEK_ARALIK: [number, number] = [70, 160];
export type El40Poz = keyof typeof GRAVUR_POZ;
const R2D = 180 / Math.PI;
const fark = (a: number, b: number) => { let d = (a - b) % 360; if (d > 180) d -= 360; if (d < -180) d += 360; return d; };

/** el açısı ön kol açısının ±maks° içine kırpılır (bilek kırılmaz). */
export const bilekSinirla = (kolAci: number, elAci: number, maks = BILEK_MAKS) => kolAci + Math.max(-maks, Math.min(maks, fark(elAci, kolAci)));

/** İki kemik IK: omuz O, bilek B, kol boyları (px). Dirsek iç açısı [70,160] dışına düşerse kol derinliğe kısalır/uzar (kisalma),
 *  açı sınırda kalır (animasyonda sıçrama yok). yon ±1 = dirseğin hangi yana kırıldığı. */
export const kolIK = (O: P, B: P, Lu: number, Lf: number, yon: 1 | -1 = 1) => {
  const d = Math.max(1, Math.hypot(B[0] - O[0], B[1] - O[1]));
  const dA = (a: number) => Math.sqrt(Lu * Lu + Lf * Lf - 2 * Lu * Lf * Math.cos(a / R2D));
  let k = 1;
  const dMin = dA(DIRSEK_ARALIK[0]), dMax = dA(DIRSEK_ARALIK[1]);
  if (d < dMin) k = d / dMin; else if (d > dMax) k = d / dMax;
  const a = Lu * k, b = Lf * k;
  const cosO = Math.max(-1, Math.min(1, (a * a + d * d - b * b) / (2 * a * d)));
  const th = Math.atan2(B[1] - O[1], B[0] - O[0]) + yon * Math.acos(cosO);
  const dirsek: P = [O[0] + Math.cos(th) * a, O[1] + Math.sin(th) * a];
  return { dirsek, kisalma: k };
};
export const dirsekAcisi = (O: P, D: P, B: P) => { const u = [O[0] - D[0], O[1] - D[1]], v = [B[0] - D[0], B[1] - D[1]]; return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / ((Math.hypot(u[0], u[1]) || 1) * (Math.hypot(v[0], v[1]) || 1))))) * R2D; };

/** Ölçüm satırı: inputProps.elOlcum = true iken tarayıcı günlüğüne yazar (tools/kareler.mjs toplar). */
export const elOlcumYaz = (ad: string, v: Record<string, number | string>) => {
  try { if ((getInputProps() as { elOlcum?: boolean }).elOlcum) console.log(`ELOLCUM ${JSON.stringify({ ad, ...v })}`); } catch { /* render dışı */ }
};

export type ElKol40Props = {
  ad: string; omuz: P; bilek: P; E: number; poz: El40Poz; elAci?: number; /** verilmezse ön kol yönü */ kolBoy?: [number, number]; dirsek?: P;
  bukum?: 1 | -1; palet: GravurPalet; kolRenk: string; kolKontur: string; gen: [number, number, number]; isik: P; taramaAci: number;
  tutulan?: React.ReactNode; ayna?: boolean; olcek?: number; kenar?: { renk: string; alfa: number }; temasGolge?: { renk: string; kay: P; alfa?: number };
  mansetBoy?: number; gizliKol?: boolean;
};
/** Konik ceket kolu (omuz → dirsek → bilek) + manşet + GravurEl (arka … tutulan … ön). Ekran 2B. */
/** geometri (şablon tutulan nesneyi aynı hesaptan yerleştirir): dirsek (IK), kırpılmış el açısı, el bileği, kavrama noktası */
export const elKolGeo = (pr: Pick<ElKol40Props, "omuz" | "bilek" | "E" | "elAci" | "kolBoy" | "dirsek" | "bukum" | "gen">) => {
  const { omuz, bilek, E } = pr;
  const ik = pr.dirsek ? { dirsek: pr.dirsek, kisalma: 1 } : kolIK(omuz, bilek, pr.kolBoy?.[0] ?? 2.4 * E, pr.kolBoy?.[1] ?? 2.1 * E, pr.bukum ?? 1);
  const kol = konikKol(omuz, ik.dirsek, bilek, pr.gen);
  const kolAci = kol.d2 * R2D;
  const aci = bilekSinirla(kolAci, pr.elAci ?? kolAci);
  const elB = kol.ileri(-0.02 * E);
  return { dirsek: ik.dirsek, kol, kolAci, aci, elB, kavrama: elKavrama(elB, aci, E) };
};
export const ElKol40: React.FC<ElKol40Props> = (pr) => {
  const { omuz, bilek, E, palet, isik, taramaAci } = pr;
  const { dirsek: dirsekN, kol, kolAci, aci, elB } = elKolGeo(pr);
  const ik = { dirsek: dirsekN };
  const poz = GRAVUR_POZ[pr.poz];
  elOlcumYaz(pr.ad, { bilek: +Math.abs(fark(aci, kolAci)).toFixed(1), dirsek: +dirsekAcisi(omuz, ik.dirsek, bilek).toFixed(1), E: +E.toFixed(1), poz: pr.poz, x: Math.round(bilek[0]), y: Math.round(bilek[1]) });
  const mA = kol.ileri(-(pr.mansetBoy ?? 0.2) * E), mB = kol.ileri(0), n2 = kol.n2, w = pr.gen[2] * 0.54;
  const q = (o: P, k2: number): P => [o[0] + n2[0] * k2, o[1] + n2[1] * k2];
  const tg = pr.temasGolge;
  return (
    <g>
      {tg && <g transform={`translate(${tg.kay[0]} ${tg.kay[1]})`} opacity={tg.alfa ?? 0.55}><GravurEl bilek={elB} aci={aci} E={E} poz={poz} ayna={pr.ayna} isik={isik} taramaAci={taramaAci} golge={tg.renk} golgeKay={[0, 0]} /></g>}
      {!pr.gizliKol && <path d={kol.d} fill={pr.kolRenk} stroke={pr.kolKontur} strokeWidth={3} strokeLinejoin="round" />}
      {!pr.gizliKol && pr.kenar && <path d={kol.kenar} fill="none" stroke={pr.kenar.renk} strokeWidth={3} opacity={pr.kenar.alfa} transform={`translate(${isik[0] * 3} ${isik[1] * 3})`} />}
      <polygon points={[q(mA, w * 1.04), q(mB, w), q(mB, -w), q(mA, -w * 1.04)].map((v) => `${v[0].toFixed(1)},${v[1].toFixed(1)}`).join(" ")} fill={palet.manset} stroke={palet.mansetGolge} strokeWidth={2.5} />
      <GravurEl bilek={elB} aci={aci} E={E} poz={poz} ayna={pr.ayna} palet={palet} isik={isik} taramaAci={taramaAci} katman="arka" olcek={pr.olcek} />
      {pr.tutulan}
      <GravurEl bilek={elB} aci={aci} E={E} poz={poz} ayna={pr.ayna} palet={palet} isik={isik} taramaAci={taramaAci} katman="on" onMaske olcek={pr.olcek} />
    </g>
  );
};
/** elin kavrama noktası (yerel ≈ 0.55 E ileri) — tutulan nesne burayı izler */
export const elKavrama = (bilek: P, aci: number, E: number, f = 0.55): P => [bilek[0] + Math.cos(aci / R2D) * f * E, bilek[1] + Math.sin(aci / R2D) * f * E];
