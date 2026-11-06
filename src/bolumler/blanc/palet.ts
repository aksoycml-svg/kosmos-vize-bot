// Blanc Kardeşler karakter paletleri (tasarim.md 6, v2.3 eldiven sürekliliği).
// İMZA NESNESİ: "eldiven beyazı" (L* ≥ 90, C* < 12) YALNIZ A) kahraman eldiven, B) Louis'nin cep eldiveni, C) Louis P19'da giydiği.
// Rig varsayılanı (Kukla.tsx): François taba deri, Louis çıplak el — krem/gri eldiven YOK.
import type { Palet } from "../../rig/Kukla";
import { LOUIS, FRANCOIS } from "../../rig/Kukla";

// ---- ELDİVEN (tasarim.md 0.6) ----
export const GLOVE = {
  hero: "#f4efe2",       // Lab ≈ L94.5 a-0.6 b6.9 — A, B, C (tek nesne, tek renk)
  heroGolge: "#d9d2c0",  // kıvrım/avuç gölgesi (L≈84.5)
  cepAgzi: "#b5ad98",    // cep ağzı gölgesi (B)
  dikis: "#b9ad92",
  // François: taba deri (beyazla karışmaz). ΔE76 hero'ya ≈ 51; ışık altında ΔE2000 ≥ 20, L* ≤ 70
  taba: "#8a6a48",
  tabaGolge: "#5e4630",
  tabaIsik: "#a88660",
  kompars: "#3a3530",    // L* ≈ 22 (gerekirse; varsayılan çıplak el)
} as const;
// Ölçü: eldivenin el kısmı = çıplak el boyu × 1.05 (P01: el ≈ 266 px ⇒ ≈ 280 px, avuç ≈ el × 0.48). Sabit px değil.
export const ELDIVEN_OLCEK = 1.05;
export const ELDIVEN_BANDI = { LMin: 90, CMax: 12 }; // sb2_kontrol: bu bantta ölçülen nesne yalnız A/B/C olmalı

const bare = (p: Palet): Palet => ({ ...p, glove: p.skin });
export const FRANCOIS_TABA: Palet = { ...FRANCOIS, glove: GLOVE.taba };   // P02, P04 (rig varsayılanı ile aynı; açık ad)
export const FRANCOIS_ELSIZ = bare(FRANCOIS);                              // mahkeme P18–P19
export const LOUIS_ELSIZ = bare(LOUIS);                                    // P02–P18 TAMAMI
export const LOUIS_ELDIVENLI: Palet = { ...LOUIS, glove: GLOVE.hero };     // yalnız P19 (giyme sonrası)
// Louis cep eldiveni (B): overlay `EldivenKose` (props/EldivenKose.tsx), rig yerel ≈ (34, −326); ekran: yakın ≈ 50×30, orta ≥ 30×18, geniş (boy < 400 px) çizilmez.
export const CEP_ELDIVEN = { renk: GLOVE.hero, golge: GLOVE.heroGolge, agiz: GLOVE.cepAgzi, aci: -12, yakinPx: [50, 30], ortaPx: [30, 18], genisBoyPx: 400 } as const;

export const MEMUR: Palet = { coat: "#6b6a66", coatDark: "#46453f", coatLight: "#8a8983", vest: "#5a5347", vestDark: "#3d382f", vestDesen: "#5a5347", cravat: "#b9b29d", shirt: "#d8d0bb", pants: "#4b4741", shoe: "#1a1512", glove: "#d9b190", skin: "#d9b190", skinDark: "#a9806a", hair: "#5e5144", hat: "#2c2a26", hatBand: "#1c1b18", sideburn: 0.6, browHeavy: 0.8 };
export const TELGRAFCI: Palet = { coat: "#4f5a3e", coatDark: "#323a28", coatLight: "#6c7956", vest: "#7a6a48", vestDark: "#54482f", vestDesen: "#7a6a48", cravat: "#c79a3a", shirt: "#d8cfb8", pants: "#3e3a34", shoe: "#17120e", glove: "#dcae8b", skin: "#dcae8b", skinDark: "#ad7b60", hair: "#4a3626", hat: "#4a3b2c", hatBand: "#2c241c", sideburn: 0.9, browHeavy: 1.3 };
export const KATIP: Palet = { coat: "#2d2b28", coatDark: "#1a1917", coatLight: "#4a4742", vest: "#8a8a80", vestDark: "#5f5f58", vestDesen: "#8a8a80", cravat: "#d8d0bb", shirt: "#e8e2d0", pants: "#3a3a3e", shoe: "#0f0d0c", glove: "#d8ae8b", skin: "#d8ae8b", skinDark: "#a97d62", hair: "#4a4a4a", hat: "#141317", hatBand: "#2a2a2e", sideburn: 0.8, browHeavy: 0.9 };
// P02 katip (sahne-plani v2.6 BC2): koyu siluet DEĞİL — gömlek kollu (açık manşet #d9ccae), açık kum yelek; kol/el L* ≥ tahta L* + 35.
// Manşet eldiven beyazı bandının altında (L* ≈ 82). Siyah redingot yerine çalışma kıyafeti: onay bekliyor (tasarım 2.7 siyah redingot diyor).
export const KATIP_ACIK: Palet = { ...KATIP, coat: "#d9ccae", coatDark: "#b3a585", coatLight: "#ebe1c6", vest: "#b49a6c", vestDark: "#8a744e", vestDesen: "#b49a6c", shirt: "#e2dbc8", biyik: "yok" };
export const TUCCAR: Palet = { coat: "#6a5338", coatDark: "#443523", coatLight: "#8a7050", vest: "#8a8a80", vestDark: "#5f5f58", vestDesen: "#8a8a80", cravat: "#d8d0bb", shirt: "#e8e2d0", pants: "#3a3530", shoe: "#0f0d0c", glove: "#d8ae8b", skin: "#d8ae8b", skinDark: "#a97d62", hair: "#2f2418", hat: "#2a2622", hatBand: "#1c1a18", sideburn: 1, browHeavy: 1 };
// Memurun eli (P01, P10): gri ceket kolu, yama, çıplak el
export const MEMUR_EL = { kol: "#6b6a66", kolKoyu: "#46453f", kolIsik: "#8a8983", yama: "#5a5953", manset: "#d8d0bb", ten: "#d9b190", tenKoyu: "#a9806a" };
