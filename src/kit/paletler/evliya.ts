// ===== Evliya Uçuşları paletleri (tasarim.md v1.2 §3) — İstanbul 1630'lar =====
// Kostüm: Kukla `kostum: "osmanli"` (ana kadro: entari + önü açık kaftan + kuşak + sarık) / `"osmanli-kisa"` (kompars: diz boyu entari + şalvar + takke).
// Frak alanları (vest/cravat/shirt) Osmanlı gövdesinde çizilmez; tip gereği entari tonuyla doldurulur.
// İmza (fişek demeti #c4a874) tonu hiçbir kostümde yok (tasarim §2.4: ΔE76 ≥ 15).
import type { Palet } from "../../rig/Kukla";

const frakYok = (entari: string) => ({ vest: entari, vestDark: entari, vestDesen: entari, cravat: entari, shirt: entari });

// KE-K1 Lagâri: çivit kaftan, soluk çivit-gri entari, krem sarık (yatay sargı), belirgin bıyık, olgun çene
export const LAGARI: Palet = {
  kostum: "osmanli",
  coat: "#34405e", coatDark: "#222a40", coatLight: "#4c5a7c", entari: "#7c8494", kusak: "#4a3426", ...frakYok("#7c8494"),
  pants: "#3e3a38", shoe: "#2e241c", glove: "#c08468", skin: "#c08468", skinDark: "#8e5a46", hair: "#3a2416",
  // v1.3: sarık soğuk kırık beyaz (b* ≤ 5; amber ışıkta imza bandına kaymasın), sargı yönü sol-alt → sağ-üst; ten pembe-kızıl (a* ≥ 15)
  sapka: "sarik", sarikYon: 1, hat: "#dcdcd2", hatBand: "#a8aaa2", sarikIc: "#4a3e34",
  sideburn: 0.8, browHeavy: 1.1, biyik: "duz", biyikOlcek: 1.2, sakal: false, burun: 1.05,
  yuz: { genislik: 0.94, uzunluk: 1.08, burunTip: "duz", kasAci: -3, sac: "sarikalti", zayif: 0.4, yasCizgi: 0.25, cene: "olgun" },
};

// KE-K2 Hezarfen (tasarim §3.3): zeytin kaftan, deve tüyü entari, basık soğuk gri sarık (ters sargı), kısa sakal, Lagâri'den esmer
export const HEZARFEN: Palet = {
  kostum: "osmanli",
  coat: "#55603f", coatDark: "#3a4228", coatLight: "#6e7a54", entari: "#7a6a50", kusak: "#3e3a30", ...frakYok("#7a6a50"),
  pants: "#3e3a38", shoe: "#2e241c", glove: "#a87256", skin: "#a87256", skinDark: "#7a4c36", hair: "#2a2018",
  sapka: "sarik-basik", sarikYon: -1, hat: "#cfd0c8", hatBand: "#9a9c94", sarikIc: "#4a3e34",
  sideburn: 0.9, browHeavy: 1.3, biyik: "duz", sakal: true, burun: 1.05,
  yuz: { genislik: 0.98, uzunluk: 1.12, burunTip: "sivri", kasAci: 5, sac: "sarikalti", yasCizgi: 0.3, cene: "olgun" },
};

// KE-K4 yardımcılar (v1.3 §3.6): yüzsüz kompars, ARKA 3/4 kameraya (Kiyi şablonu `arka`), yakasız çapraz kavuşan diz altı entari + sarılı kuşak
// + bol şalvar (paça büzgülü) + takke. Takkesiz baş = tek parça kısa saç kütlesi. İki yardımcı ayrışır (ton, ölçek 1.0 / 0.90, duruş).
const yardimci = (entari: string, salvar: string, takke: string, kusak: string, ten: string): Palet => ({
  kostum: "osmanli-kisa",
  coat: entari, coatDark: shadeKoyu(entari), coatLight: entari, entari, kusak, ...frakYok(entari),
  pants: salvar, shoe: "#2e241c", glove: ten, skin: ten, skinDark: shadeKoyu(ten), hair: "#2a2018",
  sapka: "takke", hat: takke, hatBand: shadeKoyu(takke),
  sideburn: 0.4, browHeavy: 1, biyik: "yok", sakal: false, yuzsuz: true,
  yuz: { sac: "kisa" },
});
function shadeKoyu(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return "#" + [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v * 0.68).toString(16).padStart(2, "0")).join("");
}
export const YARDIMCI_1 = yardimci("#6a5a48", "#4a4038", "#5b4a3a", "#3a3026", "#9c6a50");
export const YARDIMCI_2 = yardimci("#4e5658", "#3a3a38", "#3e3a34", "#5a4a36", "#8e6048");
