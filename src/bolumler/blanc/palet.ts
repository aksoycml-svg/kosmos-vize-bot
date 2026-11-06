// Blanc Kardeşler karakter paletleri (tasarim.md 6). Çıplak el gereken karakterlerde glove = skin
// (rig her ele eldiven çizer; tasarımcının yakaladığı sorun — eldiven yalnız hikâye eldiveninde).
import type { Palet } from "../../rig/Kukla";
import { LOUIS, FRANCOIS } from "../../rig/Kukla";

const bare = (p: Palet): Palet => ({ ...p, glove: p.skin });
export const FRANCOIS_ELSIZ = bare(FRANCOIS);
export const LOUIS_ELSIZ = bare(LOUIS);

export const MEMUR: Palet = { coat: "#6b6a66", coatDark: "#46453f", coatLight: "#8a8983", vest: "#5a5347", vestDark: "#3d382f", vestDesen: "#5a5347", cravat: "#b9b29d", shirt: "#d8d0bb", pants: "#4b4741", shoe: "#1a1512", glove: "#d9b190", skin: "#d9b190", skinDark: "#a9806a", hair: "#5e5144", hat: "#2c2a26", hatBand: "#1c1b18", sideburn: 0.6, browHeavy: 0.8 };
export const TELGRAFCI: Palet = { coat: "#4f5a3e", coatDark: "#323a28", coatLight: "#6c7956", vest: "#7a6a48", vestDark: "#54482f", vestDesen: "#7a6a48", cravat: "#c79a3a", shirt: "#d8cfb8", pants: "#3e3a34", shoe: "#17120e", glove: "#dcae8b", skin: "#dcae8b", skinDark: "#ad7b60", hair: "#4a3626", hat: "#4a3b2c", hatBand: "#2c241c", sideburn: 0.9, browHeavy: 1.3 };
export const KATIP: Palet = { coat: "#2d2b28", coatDark: "#1a1917", coatLight: "#4a4742", vest: "#8a8a80", vestDark: "#5f5f58", vestDesen: "#8a8a80", cravat: "#d8d0bb", shirt: "#e8e2d0", pants: "#3a3a3e", shoe: "#0f0d0c", glove: "#d8ae8b", skin: "#d8ae8b", skinDark: "#a97d62", hair: "#4a4a4a", hat: "#141317", hatBand: "#2a2a2e", sideburn: 0.8, browHeavy: 0.9 };
export const TUCCAR: Palet = { coat: "#6a5338", coatDark: "#443523", coatLight: "#8a7050", vest: "#8a8a80", vestDark: "#5f5f58", vestDesen: "#8a8a80", cravat: "#d8d0bb", shirt: "#e8e2d0", pants: "#3a3530", shoe: "#0f0d0c", glove: "#d8ae8b", skin: "#d8ae8b", skinDark: "#a97d62", hair: "#2f2418", hat: "#2a2622", hatBand: "#1c1a18", sideburn: 1, browHeavy: 1 };
// Memurun eli (P01, P10): gri ceket kolu, yama, çıplak el
export const MEMUR_EL = { kol: "#6b6a66", kolKoyu: "#46453f", kolIsik: "#8a8983", yama: "#5a5953", manset: "#d8d0bb", ten: "#d9b190", tenKoyu: "#a9806a" };
