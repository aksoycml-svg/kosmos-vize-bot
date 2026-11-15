// ===== Çiçero (Ankara 1943–44) — ilk 1940'lar kiti: karakter + sahne paleti (tasarim.md §2, mekanlar.md §0.6) =====
// Hex'ler sahne paletidir (kanal rengi değil). Saf siyah/beyaz yok; banknot dışındaki her şey L* ≤ 88, C* ≤ 28.
import type { Palet } from "../../rig/Kukla";

// Bazna (kahraman, uşak): koyu füme ceket (kalça boyu), düz paça, ecru gömlek (beyaz DEĞİL), dar koyu kravat; şapkasız, kısa koyu saç, bıyıksız.
export const BAZNA: Palet = {
  coat: "#3b3a4e", coatDark: "#262536", coatLight: "#54526a",
  vest: "#3b3a4e", vestDark: "#262536", vestDesen: "#3b3a4e", // takim40'ta yelek çizilmez (alanlar Palet şeması için)
  cravat: "#2c2a38", shirt: "#b8b09c",
  pants: "#34334a", shoe: "#1c1a22", glove: "#c9a58a", skin: "#c9a58a", skinDark: "#8e6a52",
  hair: "#2a2226", hat: "#2a2830", hatBand: "#1c1a22",
  sideburn: 0.15, browHeavy: 0.85, biyik: "yok", sapka: "yok",
  kostum: "takim40", gozAk: "#d6cdc0", // göz akı L* ≈ 83 (banknot tek beyaz)
};
export const BAZNA_YUZ: Partial<Palet> = { yuz: { genislik: 1.0, uzunluk: 1.02, burunTip: "duz", sac: "kisa", kasAci: 0, yasCizgi: 0 }, biyik: "yok", sakal: false, sapka: "yok", burun: 1.04 };

// Sahne paleti (tek yerde; şablonlar buradan okur)
export const CIC = {
  // ELÇİ-ODASI gece
  duvarGece: "#3e4262", duvarKose: "#2e3350", tavanGece: "#3a3d58", lambaYayilma: "#7a6658",
  vCekirdek: "#efd0b6", vUst: "#e4bc98", vDis: "#c8a98e",
  perdeGolge: "#4f4658", perdeIsik: "#8a6f6c", kapiGece: "#4a3f52", kapiGun: "#9a8f9c", kolMetal: "#4a4a52",
  kapiSerit: "#e4bc98", kapiHavuz: "#8c6f66", ayakGolge: "#2a2638", ayYama: "#5d6890",
  gok: "#4d5b84", gokUst: "#3e4a72", hilal: "#8da0c8", sirt: "#2f3550",
  parke: "#5a4a44", parkeCizgi: "#3a3040", hali: "#4a4466", haliIsik: "#8c6f66",
  ortuIsik: "#cdb5a8", ortuGolge: "#5b5575", cevizIsik: "#6b5148", cevizGolge: "#3a3040",
  abajurDis: "#3f4a45", abajurIc: "#e8c9a4", kaide: "#4a4a52", metalNokta: "#c4b5a8",
  kenar: "#f0c4a8", tarama: "#2e3048", taramaGun: "#6a6488", murekkep: "#1e1c2a",
  belgeIsik: "#cfc6ac", belgeGolge: "#8b88a0", deri: "#4a3a3c", kilit: "#6d6a63",
  // gündüz
  duvarGun: "#c0a48c", gunYama: "#e0c8b2", gunKose: "#a39cb6", gokGun: "#a9b7cc", ufukGun: "#f0d0bc", sirtGun: "#c9b8a0",
  // ARABA
  tavanIsik: "#9a8070", tavanGolge: "#4a4560", kesit: "#26283a", krom: "#8e8e96",
  koltuk: "#3a3750", koltukIsik: "#6a5c68", gokTepe: "#6f86ad", gokOrta: "#a9b7cc", ufuk: "#f0d0bc", agac: "#d9b896", agacPus: "#b39a8a",
  cepheIsik: "#e0caaf", cepheGolge: "#8f8aa0", andezit: "#5e5a66", daktiloIc: "#eed2ac", sekreter: "#463f55",
  // MASA bazna
  masaCekirdek: "#a6826c", masaIsik: "#8c6f66", masaGolge: "#5a4a44", masaSonuk: "#2f3450", zarf: "#a88b66", zarfGolge: "#6e5a48",
  // berlin
  lambri: "#4a4a68", maun: "#5a463e", sumen: "#44493f", berlinCekirdek: "#e6cfb2", berlinOrta: "#b89c86", berlinOda: "#2e3048",
  harita: "#d4c6a2", deniz: "#9fb0b8", kara: "#c9bb98", halka: "#3a3e5e", dosya: "#b9a57f",
  // İMZA: banknot (sahnenin en parlak noktası) + tek kırmızı (P07 çarpı)
  banknot: "#f6f1e4", banknotGolge: "#d4cfdc", banknotMurekkep: "#1c1915", carpi: "#b3261e",
  // kompars siluetleri (yüzsüz)
  elci: "#4f4a62", moyzisch: "#3c3a4c", yetkili: "#524a58",
} as const;

// el paletleri (GravurEl §15.1b; tek dış yol)
export const EL_BAZNA = { isik: "#c9a58a", golge: "#8e6a52", konturYuk: "#5a4132", konturIsik: "#a07f66", kenar: "#f0c4a8", tarama: "#6a4f40", manset: "#b8b09c", mansetGolge: "#7e7868" };
export const EL_MOYZISCH = { isik: "#b89a86", golge: "#7a6052", konturYuk: "#3e3030", konturIsik: "#8e7466", kenar: "#f0c4a8", tarama: "#5a4438", manset: "#5a4f48", mansetGolge: "#3a322e" };
export const EL_BERLIN = { isik: "#dcb9a2", golge: "#8f7360", konturYuk: "#5a4438", konturIsik: "#a8836c", kenar: "#f0c4a8", tarama: "#6a4f40", manset: "#bdb5a2", mansetGolge: "#7e786a" };
