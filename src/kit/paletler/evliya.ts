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
  pants: "#3e3a38", shoe: "#2e241c", glove: "#d9a77f", skin: "#d9a77f", skinDark: "#a8745a", hair: "#3a2416",
  sapka: "sarik", sarikCizgi: "yatay", hat: "#d9cfb6", hatBand: "#a89e86",
  sideburn: 0.8, browHeavy: 1.1, biyik: "duz", biyikOlcek: 1.2, sakal: false, burun: 1.05,
  yuz: { genislik: 0.94, uzunluk: 1.08, burunTip: "duz", kasAci: -3, sac: "sarikalti", zayif: 0.4, yasCizgi: 0.25, cene: "olgun" },
};

// KE-K4 yardımcılar: yüzsüz kompars, diz boyu entari + şalvar + takke (sargısız keçe). Ana kadronun yüzünü kopyalamaz.
const yardimci = (entari: string, takke: string, ten: string): Palet => ({
  kostum: "osmanli-kisa",
  coat: entari, coatDark: shadeKoyu(entari), coatLight: entari, entari, kusak: "#3a3026", ...frakYok(entari),
  pants: "#4a4038", shoe: "#2e241c", glove: ten, skin: ten, skinDark: shadeKoyu(ten), hair: "#2a2018",
  sapka: "takke", hat: takke, hatBand: "#3a2e24",
  sideburn: 0.4, browHeavy: 1, biyik: "yok", sakal: false, yuzsuz: true,
  yuz: { sac: "duz" }, // kısa koyu saç: takke uçunca (P05 EV-D1) kel kubbe değil saçlı baş okunur; takke altında örtülü
});
function shadeKoyu(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return "#" + [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v * 0.68).toString(16).padStart(2, "0")).join("");
}
export const YARDIMCI_1 = yardimci("#6a5a48", "#5b4a3a", "#b88a68");
export const YARDIMCI_2 = yardimci("#5a5448", "#4a3e34", "#a87c5c");
