// ===== Karakter kaydı: kim → rig paleti =====
// Ana kadro yüzlü; kompars için `palet.yuzsuz: true` (CLAUDE.md: kompars ana kadrodan ayrışır).
// Yeni bölümün karakteri: önce burada bir palet (kurulum ekibi); günlük bölüm yalnız `kim` + `palet` override kullanır.
import type { Palet } from "../rig/Kukla";
import SN from "./sinirlar.json";
import { FRANCOIS_TABA, LOUIS_ELSIZ, LOUIS_ELDIVENLI, MEMUR, TELGRAFCI, KATIP, TUCCAR, KATIP_ACIK } from "../bolumler/blanc/palet";
import { HEZARFEN, LAGARI, YARDIMCI_1, YARDIMCI_2 } from "./paletler/evliya";

export type KarakterKayit = { palet: Palet; louis?: boolean; ad: string; yuzVaryant: string };

// K3 yüz varyantları (kim → varyant eşlemesi tek kaynak: sinirlar.json `yuzVaryant`; doğrulayıcı aynı tabloyu okur).
// francois/louis boş = mevcut yüz (değişmez). Kompars ana kadronun yüzünü kopyalamaz (CLAUDE.md).
export const YUZLER: Record<string, Partial<Palet>> = {
  francois: {},
  louis: {},
  // memur: zayıf, uzun yüz, sakalsız, seyrek saç, endişeli ince kaş, şapkasız
  memur: { yuz: { genislik: 0.86, uzunluk: 1.12, sac: "seyrek", kasAci: -7, yasCizgi: 0.55, zayif: 0.8 }, biyik: "yok", sakal: false, sapka: "yok", sideburn: 0.25, browHeavy: 0.65, burun: 1.08 },
  // telgrafçı: yuvarlak yüz, gür favori, kalın düz kaş, yuvarlak burun, kasket
  telgrafci: { yuz: { genislik: 1.14, uzunluk: 0.93, burunTip: "yuvarlak", sac: "bukle" }, biyik: "yok", sapka: "kasket", sideburn: 2.0, browHeavy: 1.45 },
  // katip/suç ortağı: sivri burun, ince bıyık, yağlı yana taranmış saç, kemerli kaş; gözlük yok
  katip: { yuz: { genislik: 0.95, uzunluk: 1.04, burunTip: "sivri", sac: "duz", kasAci: 6 }, biyik: "ince", burun: 1.1, sideburn: 0.45, browHeavy: 0.75 },
  mudur: { yuz: { genislik: 1.05, yasCizgi: 0.8, burunTip: "yuvarlak" } },
  tuccar: { yuz: { genislik: 1.1, uzunluk: 0.97, yasCizgi: 0.3 }, sakal: true },
  yargic: { yuz: { uzunluk: 1.08, sac: "seyrek", yasCizgi: 1, kasAci: 4 }, biyik: "yok", hair: "#8a8478" },
  // Evliya (KE-K1): yüz paletin içinde (LAGARI.yuz); varyant boş = kayıttaki yüz
  lagari: {},
  hezarfen: {},
};
const VARYANT = (SN as { yuzVaryant: Record<string, string> }).yuzVaryant;
const yuzlu = (kim: string, p: Palet): Palet => ({ ...p, ...(YUZLER[VARYANT[kim]] ?? {}) });

// müdür: koyu yeşil-gri redingot, kır favori — memur ve katipten ayrışır
const MUDUR: Palet = { ...KATIP, coat: "#3c4438", coatDark: "#262c24", coatLight: "#56604f", vest: "#6a5a3a", vestDark: "#4a3f28", vestDesen: "#6a5a3a", hair: "#8a8478", sideburn: 1.6, browHeavy: 1.3, biyik: "duz", burun: 1.15 };

const HAM: Record<string, Omit<KarakterKayit, "yuzVaryant">> = {
  francois: { palet: FRANCOIS_TABA, ad: "FRANÇOIS" },
  louis: { palet: LOUIS_ELSIZ, louis: true, ad: "LOUIS" },
  "louis-eldivenli": { palet: LOUIS_ELDIVENLI, louis: true, ad: "LOUIS" },
  memur: { palet: MEMUR, ad: "MEMUR" },
  mudur: { palet: MUDUR, ad: "MÜDÜR" },
  telgrafci: { palet: TELGRAFCI, ad: "TELGRAFÇI" },
  katip: { palet: KATIP, ad: "KATİP" },
  tuccar: { palet: TUCCAR, ad: "TÜCCAR" },
  yargic: { palet: { ...KATIP_ACIK, coat: "#2d2b28", coatDark: "#1a1917", coatLight: "#4a4742" }, ad: "YARGIÇ" },
  // Evliya Uçuşları (İstanbul 1630'lar). ad = kayıt kimliği (ekranda yazı yok; replik plakası dil katmanından gelir)
  lagari: { palet: LAGARI, ad: "lagari" },
  hezarfen: { palet: HEZARFEN, ad: "hezarfen" },
  "yardimci-1": { palet: YARDIMCI_1, ad: "yardimci-1" },
  "yardimci-2": { palet: YARDIMCI_2, ad: "yardimci-2" },
};
export const KARAKTERLER: Record<string, KarakterKayit> = Object.fromEntries(
  Object.entries(HAM).map(([kim, k]) => [kim, { ...k, palet: yuzlu(kim, k.palet), yuzVaryant: VARYANT[kim] ?? kim }]),
);

export const karakterBul = (kim: string): KarakterKayit => {
  const k = KARAKTERLER[kim];
  if (!k) throw new Error(`[kit] bilinmeyen karakter: ${kim} (karakterler.ts)`);
  return k;
};
