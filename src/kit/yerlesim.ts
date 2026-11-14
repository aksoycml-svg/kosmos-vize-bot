// Ekran yazısı satır yerleşimi (saf fonksiyon, React yok — doğrulayıcı/test de kullanabilir). yazi.tsx bileşenleri buradan çağırır.
import { emMono, emPlayfair } from "./fontMetrik";
export { emPlayfair };

// ===== Satır yerleşimi (Paris jüri düzeltme 1): genişlik FONT METRİĞİNDEN ölçülür (fontMetrik.ts), sabit em/harf katsayısı yok =====
// olc: metnin em genişliği. PAY: güvenlik çarpanı. Yazı her zaman ic = kutuW − 52 içinde kalır → x ≤ 1000 (yan güvenli alan).
export type Olc = (s: string) => number;
const AYIRICI = "·";
export const PAY = 1; // ölçüm kerningsiz ilerleme toplamı → BÜYÜK HARF'te zaten hafif fazla; ek pay Blanc/Evliya'yı gereksiz kırıyordu
// Playfair: ölçülen genişlik, ama eski 0.52 em/harf tahmininin altına inmez (küçük harfli metinde eski tahmin zaten güvenli tarafta;
// alt sınır Blanc/Evliya yerleşimlerini korur — yalnız gerçekte TAŞAN metin değişir).
export const olcIddia: Olc = (s) => Math.max(emPlayfair(s), [...s].length * 0.52);
export const olcFormul: Olc = (s) => emMono(s, 0.04);
// ayırıcı satır başına/sonuna düşerse atılır ("· 4 AY KUŞATMA" olmaz)
const kirp = (k: string[]) => { let a = 0, b = k.length; while (a < b && k[a] === AYIRICI) a++; while (b > a && k[b - 1] === AYIRICI) b--; return k.slice(a, b); };
export type Yer = { satirlar: string[][]; px: number };
// n satıra (1–3) tüm kırılımları dener; boyut = min(tavan, genişlik sınırı, yükseklik sınırı). Kırılımların hepsi " · " ayırıcısına
// denk geliyorsa öncelikli (boyutu en iyi kelime kırılımının ≥ %85'i ise) — anlam birimi bölünmez. Eşitlikte karakter dengesi (eski davranış).
const enIyiKirilim = (k: string[], n: number, olc: Olc, ic: number, tavan: number, yukseklik: number): (Yer & { ayir: boolean }) | null => {
  const kesimler: number[][] = [];
  if (n === 1) kesimler.push([]);
  else if (n === 2) for (let i = 1; i < k.length; i++) kesimler.push([i]);
  else for (let i = 1; i < k.length; i++) for (let j = i + 1; j < k.length; j++) kesimler.push([i, j]);
  // eşitlik kırıcı (eski bol() ile aynı): karakter dengesi |toplam − 2·ilk satır|, eşitse ilk aday
  const top = k.join(" ").length;
  const denge = (c: number[]) => (c.length === 1 ? Math.abs(top - 2 * (k.slice(0, c[0]).join(" ").length + 1)) : 0);
  let en: (Yer & { ayir: boolean; m: number; skor: number; d: number }) | null = null;
  for (const c of kesimler) {
    const sinir = [0, ...c, k.length];
    const satirlar = sinir.slice(0, -1).map((a, i) => kirp(k.slice(a, sinir[i + 1])));
    if (satirlar.some((s) => !s.length)) continue;
    const m = Math.max(...satirlar.map((s) => olc(s.join(" "))));
    const px = Math.min(tavan, (ic * PAY) / m, yukseklik / (n * 1.04));
    const ayirN = c.filter((i) => k[i] === AYIRICI || k[i - 1] === AYIRICI).length, ayir = ayirN === c.length;
    const skor = px * (0.85 + 0.15 * (c.length ? ayirN / c.length : 1)); // 3 satırda kırılımlardan biri ayırıcıdaysa kısmi öncelik
    const d = denge(c);
    if (!en || skor > en.skor + 1e-6 || (Math.abs(skor - en.skor) <= 1e-6 && (d < en.d || (n > 2 && d === en.d && m < en.m - 1e-6)))) en = { satirlar, px, ayir, m, skor, d };
  }
  return en;
};
// tek satır tavanda (ya da eski tahminle tek satırsa tavanın ≥ %94'ünde) sığarsa tek satır; sığmazsa 2 satır; 2 satır en küçükten (min) düşükse ve izin varsa 3 satır
export const yerlesim = (metin: string, olc: Olc, kutuW: number, tavan: [number, number, number], o: { maksSatir?: number; min?: number; yukseklik?: number; eskiTek?: boolean } = {}): Yer => {
  const k = metin.split(" ").filter(Boolean);
  const ic = kutuW - 52, maksSatir = o.maksSatir ?? 2, min = o.min ?? 44, yuk = o.yukseklik ?? 2 * 64 * 1.04;
  const tek = enIyiKirilim(k, 1, olc, ic, tavan[0], Infinity)!;
  if (k.length < 2 || olc(metin) * tavan[0] <= ic * PAY) return tek;
  // eski 0.52 tahmini tek satır demişse ve tavanın %94'ü ile sığıyorsa kırma, hafif küçült (Blanc EN P12 "ACQUITTED · 14 Mar 1837": 72 → 70.7;
  // satır düzeni korunur). Eski tahmin iki satır demişse (küçük harfli Blanc/Evliya metinleri) eski iki satırlı düzen kalır.
  if (o.eskiTek && tek.px >= tavan[0] * 0.94) return tek;
  let sec: Yer = enIyiKirilim(k, 2, olc, ic, tavan[1], yuk) ?? tek;
  if (sec.px < min && maksSatir >= 3 && k.length >= 3) { const uc = enIyiKirilim(k, 3, olc, ic, tavan[2], yuk); if (uc && uc.px > sec.px) sec = uc; }
  return { satirlar: sec.satirlar, px: sec.px };
};

// KitEkranYazisi yerleşimi: iddia (Playfair 900) / formül (Plex Mono). kutuW: şerit genişliği (varsayılan 920 → x 80–1000).
export const ekranYerlesim = (metin: string, formul: boolean, kutuW: number): Yer => {
  // Genişlik font metriğinden (Playfair 900 hmtx; Plex Mono 0.6 em + 0.04em aralık). İki satırda boyut ≤ 64 → kutu ≈ 152 px (bant 160).
  // K4: formül tek satır ≤ 64, iki satır ≤ 60. Kırılım " · " ayırıcısından (ayırıcı düşer); formülde ayırıcı yoksa "=" öncesinden.
  const ic = kutuW - 52;
  const formulYer = (): Yer => {
    if (olcFormul(metin) * 64 <= ic * PAY) return { satirlar: [metin.split(" ").filter(Boolean)], px: 64 };
    const parca = metin.includes(" · ") ? metin.split(" · ") : (() => { const i = metin.lastIndexOf(" = "); return i > 0 ? [metin.slice(0, i), metin.slice(i + 1)] : [metin]; })();
    if (parca.length !== 2) return yerlesim(metin, olcFormul, kutuW, [64, 60, 44]);
    return { satirlar: parca.map((q) => q.split(" ").filter(Boolean)), px: Math.min(60, (ic * PAY) / Math.max(...parca.map(olcFormul))) };
  };
  // opsiyonel elle satır sonu ("\n"): verilirse satırlar aynen alınır (EN yetim kırılımı için); yoksa otomatik yerleşim
  const elle = metin.includes("\n") ? metin.split("\n").map((q) => q.split(" ").filter(Boolean)) : null;
  const elleYer = (): Yer => ({ satirlar: elle!, px: Math.min(formul ? 60 : 64, (ic * PAY) / Math.max(...elle!.map((q) => (formul ? olcFormul : olcIddia)(q.join(" "))))) });
  // iddia: tek satır ≤ 72; iki satır ≤ 64, 44 altına düşerse üç satır ≤ 44 (kutu yine bant içinde)
  return elle ? elleYer() : formul ? formulYer() : yerlesim(metin, olcIddia, kutuW, [72, 64, 44], { maksSatir: 3, eskiTek: metin.length * 0.52 * 72 <= ic });
};
