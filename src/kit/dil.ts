// ===== İki dil: yazı katmanı metin çözümü (KE-Y1, Evliya K9) =====
// Kabul edilen şemalar (geri uyumlu):
//  - kalıcı:  metin: {tr, en}, vurgu: {tr, en}  (ekran_yazisi / replik / etiket / harita_etiketleri)
//  - Evliya:  metin = bölümün ana dili (bolum.dil ?? "tr"), `en` (ekran yazısı: string; replik: {metin,bas,bit,kelimeKare}), `vurgu_en`, `kim_en`;
//             harita_etiketleri {tr, en}
// İstenen dilin metni yoksa HATA (sessizce ana dile düşmez — kitte/json'da tek dilli metin kalmasın).
import type { BolumJson, EkranYazisi, Plan, Replik } from "./tipler";

export type Dil = "tr" | "en";
export type DilMetin = string | { tr?: string; en?: string };
export type DilListe = string[] | { tr?: string[]; en?: string[] };

export const anaDil = (b: BolumJson): Dil => (b.dil ?? "tr") as Dil;

export const dilSec = (v: DilMetin | undefined, ek: string | undefined, dil: Dil, ana: Dil, yer: string): string => {
  if (v && typeof v === "object") { const s = v[dil]; if (s == null) throw new Error(`[Bolum] ${yer}: '${dil}' metni yok`); return s; }
  if (dil === ana && v != null) return v;
  if (ek != null) return ek;
  throw new Error(`[Bolum] ${yer}: '${dil}' metni yok (ana dil ${ana}; 'en'/'${dil}' alanı ya da metin:{tr,en} gerekli)`);
};
const listeSec = (v: DilListe | undefined, ek: string[] | undefined, dil: Dil, ana: Dil): string[] | undefined => {
  if (v && !Array.isArray(v)) return v[dil];
  if (dil === ana) return v;
  return ek ?? v; // vurgu yoksa yazı vurgusuz da geçerli (sayılar iki dilde aynı olabilir)
};
export const buyukHarf = (s: string, dil: Dil) => s.toLocaleUpperCase(dil === "tr" ? "tr" : "en");

type Ham = Record<string, unknown>;
export type CozEkran = { bant: "ust" | "alt"; metin: string; vurgu?: string[]; tur?: "iddia" | "formul" | "sayac"; bas: number; bit: number; kutu?: { x?: [number, number] }; zemin?: "koyu";
  sayac?: { hedef: number; baslangic: number; bas: number; sure: number; ondalik: number; vurgu: boolean; donus?: { kare: number; metin: string } } };
export type CozReplik = { kim?: string; metin: string; bant: "ust" | "alt"; bas: number; bit: number; vurgu?: string[]; kelimeKare?: number[] };
export type CozHarita = { metin: string; nokta: [number, number]; kutu: [number, number]; bas: number; bit: number };

export const ekranCoz = (plan: Plan, dil: Dil, ana: Dil): CozEkran[] => (plan.ekran_yazisi ?? []).map((y: EkranYazisi, i) => {
  const h = y as unknown as Ham;
  return { bant: y.bant, tur: y.tur, bas: y.bas ?? 0, bit: y.bit ?? plan.sure_kare, kutu: h.kutu as CozEkran["kutu"], zemin: h.zemin === "koyu" ? "koyu" : undefined,
    metin: dilSec(y.metin as DilMetin, h[dil] as string | undefined, dil, ana, `${plan.id} ekran_yazisi[${i}]`),
    vurgu: listeSec(y.vurgu as DilListe | undefined, h[`vurgu_${dil}`] as string[] | undefined, dil, ana),
    // KT-4 sayaç: dönüş metni de dil başına (metin {tr,en} ya da ana dil + en)
    sayac: y.tur === "sayac" && y.sayac ? { hedef: y.sayac.hedef, baslangic: y.sayac.baslangic ?? 0, bas: y.sayac.bas ?? 0, sure: y.sayac.sure ?? 60, ondalik: y.sayac.ondalik ?? 0, vurgu: !!y.sayac.vurgu,
      donus: y.sayac.donus ? { kare: y.sayac.donus.kare, metin: dilSec(y.sayac.donus.metin as DilMetin, y.sayac.donus.en, dil, ana, `${plan.id} ekran_yazisi[${i}].sayac.donus`) } : undefined } : undefined };
});
// KT-4 sayı biçimi dil başına: tr 2.000.000 · en 2,000,000
export const sayiBicim = (n: number, dil: Dil, ondalik = 0) => n.toLocaleString(dil === "tr" ? "tr-TR" : "en-US", { minimumFractionDigits: ondalik, maximumFractionDigits: ondalik });

export const replikCoz = (plan: Plan, dil: Dil, ana: Dil): CozReplik[] => (plan.replik ?? []).map((r: Replik, i) => {
  const h = r as unknown as Ham, yer = `${plan.id} replik[${i}]`;
  const kim = r.kim == null ? undefined : dilSec(r.kim as DilMetin, h[`kim_${dil}`] as string | undefined, dil, ana, `${yer}.kim`);
  const ek = h[dil] as (Partial<CozReplik> & { metin: string }) | string | undefined;
  // dile özel zamanlama: en {metin, bas, bit, kelimeKare} (dilin kendi kelime json'undan)
  if (dil !== ana && ek && typeof ek === "object" && !(r.metin && typeof r.metin === "object"))
    return { kim, bant: r.bant, metin: ek.metin, bas: ek.bas ?? r.bas, bit: ek.bit ?? r.bit, kelimeKare: ek.kelimeKare, vurgu: listeSec(undefined, h[`vurgu_${dil}`] as string[] | undefined, dil, ana) };
  return { kim, bant: r.bant, bas: r.bas, bit: r.bit, kelimeKare: dil === ana ? r.kelimeKare : undefined,
    metin: dilSec(r.metin as DilMetin, typeof ek === "string" ? ek : undefined, dil, ana, yer),
    vurgu: listeSec(r.vurgu as DilListe | undefined, h[`vurgu_${dil}`] as string[] | undefined, dil, ana) };
});

// harita_etiketleri: {ad, tr, en | metin{tr,en}, x, y (işaret noktası, dekor px), kutu?: [x, y] (fiş merkezi, dekor px; yoksa nokta), bas, bit}
export const haritaCoz = (plan: Plan, dil: Dil, ana: Dil): CozHarita[] => (((plan as unknown as Ham).harita_etiketleri ?? []) as Ham[]).map((h, i) => {
  const m = (h.metin as DilMetin | undefined) ?? { tr: h.tr as string | undefined, en: h.en as string | undefined };
  const nokta: [number, number] = [Number(h.x), Number(h.y)];
  return { metin: buyukHarf(dilSec(m, undefined, dil, ana, `${plan.id} harita_etiketleri[${i}]`), dil), nokta,
    kutu: (h.kutu as [number, number] | undefined) ?? nokta, bas: Number(h.bas ?? 0), bit: Number(h.bit ?? plan.sure_kare) };
});

// karakter isim etiketi: etiket {ad, alt} — ad/alt string (ana dil) | {tr,en}; ya da ad_en/alt_en
export const etiketCoz = (e: { ad: DilMetin; alt?: DilMetin } & Ham, dil: Dil, ana: Dil, yer: string) => ({
  ad: dilSec(e.ad, e[`ad_${dil}`] as string | undefined, dil, ana, `${yer}.ad`),
  alt: e.alt == null ? undefined : dilSec(e.alt, e[`alt_${dil}`] as string | undefined, dil, ana, `${yer}.alt`),
});

// KT-3 harita bilgi kartı: {metin{tr,en} | tr/en, alt?, bas, bit, yon}
export type CozKart = { metin: string; alt?: string; bas: number; bit: number; yon: "ust" | "alt" | "sol" | "sag" };
export const kartCoz = (plan: Plan, dil: Dil, ana: Dil): CozKart[] => (plan.harita_kart ?? []).map((k, i) => {
  const m = (k.metin as DilMetin | undefined) ?? { tr: k.tr, en: k.en };
  const yer = `${plan.id} harita_kart[${i}]`;
  return { metin: dilSec(m, undefined, dil, ana, yer), alt: k.alt == null ? undefined : dilSec(k.alt as DilMetin, k.alt_en, dil, ana, `${yer}.alt`),
    bas: k.bas ?? 0, bit: k.bit ?? plan.sure_kare, yon: k.yon ?? "ust" };
});
