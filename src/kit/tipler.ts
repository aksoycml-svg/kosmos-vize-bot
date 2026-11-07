// ===== bolum.json şeması (SET KİTİ K1) =====
// Bölüm = plan listesi. Her plan bir şablon + parametre + metin + zaman + temas. Yeni kod yazılmaz.
// Kare sayıları 60 fps; plan içi kareler 0'dan başlar (plan karesi p).
import type { Agiz, Palet } from "../rig/Kukla";

export type SablonAdi = "SOKAK" | "IC-ODA" | "MASA-INSERT" | "KULE-DIS" | "HARITA" | "YAKIN-YUZ";
export type Bant = "ust" | "alt";
export type P = [number, number];

// Sayısal değer: sabit ya da anahtar dizisi (aynı nesnenin `kare` dizisiyle eşlenir).
export type Sayi = number | number[];

// Kamera: kare dizisi + cs (ölçek), cx/cy (ekran kayması px). egri: giris (bezier .16,1,.3,1) | inout | lineer (kaymalar)
export type Kamera = { kare: number[]; cs: number[]; cx?: number[]; cy?: number[]; egri?: "giris" | "inout" | "lineer" };

export type JestAdi = "yuru" | "konus" | "isaret" | "sapka-kaldir" | "baston-vur" | "esne" | "it-cek" | "eldiven-giy" | "fisilda" | "yaz" | "bak";
export type JestCagri = { ad: JestAdi; bas: number; bit: number; ops?: Record<string, number | string | boolean | number[]> };

export type Karakter = {
  kim: string;                 // karakterler.ts kaydı (francois, louis, memur, ...)
  z: Sayi; u: Sayi;            // derinlik / yanal; dizi ise `kare` ile anahtarlanır (yürüyüş yolu)
  kare?: number[];
  yon?: 1 | -1;                // 1 = sağa bakar, -1 = sola
  jestler?: JestCagri[];
  yuz?: { ifade?: Agiz; bakis?: P; kas?: number; yakin?: boolean };
  palet?: Partial<Palet>;      // bölüme özel kostüm/ten (ör. solgun memur)
  aksesuar?: ("cep-eldiven" | "baston")[];
  etiket?: { ad: string; alt?: string; bas?: number; bit?: number };
};

export type PropTur = "paket" | "eldiven" | "corap" | "dosya" | "kitap" | "kese" | "hokka" | "mum" | "fener";
export type Prop = {
  tur: PropTur; id?: string;
  x: Sayi; y: Sayi; kare?: number[];           // MASA-INSERT: ekran px (masa düzlemi). IC-ODA: x = u (m), y = z (m)
  olcek?: number; aci?: Sayi;
  durum?: Record<string, Sayi | string | boolean>; // ör. paket {acik: [0.5,1]}, dosya {kapak: [0,1]}, kitap {sayfa: [0,1]}
};

// MASA-INSERT eli: KolEl anahtarları (ekran px)
export type El = {
  tip: "ceket" | "gomlek" | "parisManset" | "gorevli" | "yazici" | "louis";
  giris: P; kare: number[]; bilek: P[]; dirsek: P[]; aci: number[];
  olcek?: number;
  poz?: { kare: number; poz: "kistir" | "gevsek" }[];
  tut?: { prop: string; bas: number; bit: number; tutulAci?: number; birakAci?: number }; // prop.id; bit = bırakma (temas)
};

export type EkranYazisi = { bant: Bant; metin: string; vurgu?: string[]; tur?: "iddia" | "formul"; kagitSerit?: boolean; bas?: number; bit?: number; boyut?: number };
export type Replik = { kim: string; metin: string; bant: Bant; bas: number; bit: number; vurgu?: string[]; kelimeKare?: number[] };
export type Temas = { kare: number; olay: string; ses?: string; db?: number };
// Plan sesi: dosya public/ altından göreli (ör. "blanc/ses-v3/P05.mp3"), kare = plan içi başlangıç, db = kazanç (0 = ref)
export type PlanSes = { dosya: string; kare: number; db?: number };
export type Dokunus = { id: string; ad: string; bas?: number; bit?: number };

export type Plan = {
  id: string;
  sablon: SablonAdi;
  parametreler: Record<string, unknown>;
  sure_kare: number;
  kamera?: Kamera;
  karakterler?: Karakter[];
  props?: Prop[];
  el?: El[];
  ekran_yazisi?: EkranYazisi[];
  replik?: Replik[];
  temaslar?: Temas[];
  ses?: PlanSes[];
  dokunus?: Dokunus | null;
  not?: string;
};

export type BolumJson = {
  slug: string; baslik: string; fps: 60; dil?: "tr" | "en";
  planlar: Plan[];
};
