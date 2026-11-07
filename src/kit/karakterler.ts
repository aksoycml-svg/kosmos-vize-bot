// ===== Karakter kaydı: kim → rig paleti =====
// Ana kadro yüzlü; kompars için `palet.yuzsuz: true` (CLAUDE.md: kompars ana kadrodan ayrışır).
// Yeni bölümün karakteri: önce burada bir palet (kurulum ekibi); günlük bölüm yalnız `kim` + `palet` override kullanır.
import type { Palet } from "../rig/Kukla";
import { FRANCOIS_TABA, LOUIS_ELSIZ, LOUIS_ELDIVENLI, MEMUR, TELGRAFCI, KATIP, TUCCAR, KATIP_ACIK } from "../bolumler/blanc/palet";

export type KarakterKayit = { palet: Palet; louis?: boolean; ad: string };

// müdür: koyu yeşil-gri redingot, kır favori — memur ve katipten ayrışır
const MUDUR: Palet = { ...KATIP, coat: "#3c4438", coatDark: "#262c24", coatLight: "#56604f", vest: "#6a5a3a", vestDark: "#4a3f28", vestDesen: "#6a5a3a", hair: "#8a8478", sideburn: 1.6, browHeavy: 1.3, biyik: "duz", burun: 1.15 };

export const KARAKTERLER: Record<string, KarakterKayit> = {
  francois: { palet: FRANCOIS_TABA, ad: "FRANÇOIS" },
  louis: { palet: LOUIS_ELSIZ, louis: true, ad: "LOUIS" },
  "louis-eldivenli": { palet: LOUIS_ELDIVENLI, louis: true, ad: "LOUIS" },
  memur: { palet: MEMUR, ad: "MEMUR" },
  mudur: { palet: MUDUR, ad: "MÜDÜR" },
  telgrafci: { palet: TELGRAFCI, ad: "TELGRAFÇI" },
  katip: { palet: KATIP, ad: "KATİP" },
  tuccar: { palet: TUCCAR, ad: "TÜCCAR" },
  yargic: { palet: { ...KATIP_ACIK, coat: "#2d2b28", coatDark: "#1a1917", coatLight: "#4a4742" }, ad: "YARGIÇ" },
};

export const karakterBul = (kim: string): KarakterKayit => {
  const k = KARAKTERLER[kim];
  if (!k) throw new Error(`[kit] bilinmeyen karakter: ${kim} (karakterler.ts)`);
  return k;
};
