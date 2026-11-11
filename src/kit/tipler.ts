// ===== bolum.json şeması (SET KİTİ K1) =====
// Bölüm = plan listesi. Her plan bir şablon + parametre + metin + zaman + temas. Yeni kod yazılmaz.
// Kare sayıları 60 fps; plan içi kareler 0'dan başlar (plan karesi p).
import type { Agiz, Palet } from "../rig/Kukla";

export type SablonAdi = "SOKAK" | "IC-ODA" | "MASA-INSERT" | "KULE-DIS" | "HARITA" | "YAKIN-YUZ" | "SARAYBURNU" | "GALATA-TEPE" | "BOGAZ" | "KITAP-INSERT";
export type Bant = "ust" | "alt";
export type P = [number, number];

// Sayısal değer: sabit ya da anahtar dizisi (aynı nesnenin `kare` dizisiyle eşlenir).
export type Sayi = number | number[];

// Kamera: kare dizisi + cs (ölçek), cx/cy (ekran kayması px). egri: giris (bezier .16,1,.3,1) | inout | lineer (kaymalar)
export type Kamera = { kare: number[]; cs: number[]; cx?: number[]; cy?: number[]; egri?: "giris" | "inout" | "lineer";
  // Evliya K5: takip — [kare0, kare1] aralığında kamera cy'si prop'u ekranda sabit y'de tutar (vinç; prop sabit boyut). Şablon uygular.
  takip?: { prop: string; ekran_y: number; kare: [number, number] } };

export type JestAdi = "yuru" | "konus" | "isaret" | "sapka-kaldir" | "baston-vur" | "esne" | "it-cek" | "eldiven-giy" | "fisilda" | "yaz" | "bak"
  | "sicra" | "kanat-ac" | "ucus" | "yuz" | "kanat-birak" // Evliya (SARAYBURNU kıyı)
  | "egil" | "dogrul" // Evliya (SARAYBURNU insert): gövde eğimi (ops.aci) / doğrulma
  | "pencere-kapat" | "don" // Evliya (SARAYBURNU ic, K4)
  | "tas-it" // Evliya (GALATA-TEPE, K5): ön ayak taşı iter (ops.temas = ayağın taşa değdiği kare)
  | "bin" | "tutun"; // Evliya (SARAYBURNU kiyi, K8): demete binme (ops.ayak_temas, ops.oturma) / oturakta sıkı tutunma (ops.temas)
export type JestCagri = { ad: JestAdi; bas: number; bit: number; ops?: Record<string, number | string | boolean | number[]> };

export type Karakter = {
  kim: string;                 // karakterler.ts kaydı (francois, louis, memur, ...)
  z?: Sayi; u?: Sayi;          // derinlik / yanal; dizi ise `kare` ile anahtarlanır (yürüyüş yolu). SARAYBURNU: x/y kullanılır
  x?: Sayi; y?: Sayi;          // SARAYBURNU: dekor px, ayak tabanı noktası (ölçek ufuk–ölçek kuralından; havada `olcek`)
  olcek?: Sayi;                // SARAYBURNU: derinlik çarpanı (1 = rıhtım y 1330, 406 px/m); zemindeki figürde y'den türetilir
  bagli?: { prop: string; dx?: number; dy?: number; bit?: number }; // SARAYBURNU: oturan karakter prop'un oturağına bağlı (ayaklar dayamada); bit = bırakma karesi (sonra x/y/olcek yolu)
  durum?: Record<string, Sayi | boolean[]>;          // SARAYBURNU: islak, kanat (anahtarlı)
  kare?: number[];
  yon?: 1 | -1;                // 1 = sağa bakar, -1 = sola
  jestler?: JestCagri[];
  yuz?: { ifade?: Agiz | "hasta"; bakis?: P; kas?: number; yakin?: boolean; ter?: boolean }; // K3: "hasta" = solgun + göz altı + yarı kapalı göz
  poz?: "ayakta" | "yatik" | "oturan"; // K3: yatik = yatakta sırtüstü (IC-ODA oda=yatak → yatağa oturur; YAKIN-YUZ yatik: true). Evliya: oturan (demet oturağı)
  yuzVaryant?: string;         // K3: kayıttaki yüzü ezer (YUZLER anahtarı); bölümde iki kişi aynı varyantı kullanırsa doğrulayıcı uyarır
  palet?: Partial<Palet>;      // bölüme özel kostüm/ten (ör. solgun memur)
  aksesuar?: ("cep-eldiven" | "baston")[];
  etiket?: { ad: DilMetinT; alt?: DilMetinT; ad_en?: string; alt_en?: string; bas?: number; bit?: number };
};

export type PropTur = "paket" | "eldiven" | "corap" | "dosya" | "kitap" | "kese" | "hokka" | "mum" | "fener"
  | "fisek-demet" | "mesale" | "baslik" | "kanat" // Evliya (SARAYBURNU kıyı)
  | "sikke" // Evliya (SARAYBURNU insert; kese de insert'te Osmanlı kumaş torba çizilir)
  | "pencere-kanat" // Evliya (SARAYBURNU ic, K4: KE-P9)
  | "tas" // Evliya (GALATA-TEPE, K5: KE-P5)
  | "marti" // Evliya (BOGAZ, K8: KE-P6; uzay ekran)
  | "defter" | "kivilcim"; // Evliya (KITAP-INSERT, K8: KE-P8 defter; kıvılcım = çizimdeki fitilde KE-E1)
export type Prop = {
  tur: PropTur; id?: string;
  x?: Sayi; y?: Sayi; kare?: number[];         // MASA-INSERT: ekran px (masa düzlemi). IC-ODA: x = u (m), y = z (m). SARAYBURNU: dekor px (zemin teması)
  bagli?: string;                              // SARAYBURNU: tutan/taşıyan karakter (mesale → el, kanat → sırt)
  olcek?: number; aci?: Sayi;
  durum?: Record<string, Sayi | string | boolean>; // ör. paket {acik: [0.5,1]}, dosya {kapak: [0,1]}, kitap {sayfa: [0,1]}
  // K4 (IC-ODA) el–prop teması: `it` = karakterin ön eli prop'u masada iter (bas–bit eli prop'un arkasında izler; prop yolu x/y anahtarı);
  // `al` = karakter uzanır (kare−uzan … kare), kare'de kavrar (prop ele bağlanır), don karede göğüs hizasına kaldırır ve tutar.
  it?: { kim: string; bas: number; bit: number };
  al?: { kim: string; kare: number; uzan?: number; don?: number };
};

// MASA-INSERT eli: KolEl anahtarları (ekran px)
// SARAYBURNU insert (Evliya K2): tip entari-yen | lagari | hezarfen | muhafiz; rol veren | alan | omuz; poz ac/kapa/gevse (gevsek/kistir eşlenir)
export type El = {
  tip: "ceket" | "gomlek" | "parisManset" | "gorevli" | "yazici" | "louis"; // SARAYBURNU insert: json'da Osmanlı tipleri (şablon OsmanliElTip'e çevirir)
  rol?: "veren" | "alan" | "omuz";
  giris: P; kare: number[]; bilek: P[]; dirsek: P[]; aci: number[];
  olcek?: number;
  poz?: { kare: number; poz: "kistir" | "gevsek" }[]; // SARAYBURNU insert: ac/kapa/gevse de kabul (json)
  tut?: { prop: string; bas: number; bit: number; tutulAci?: number; birakAci?: number }; // prop.id; bit = bırakma (temas)
  takip?: { prop: string; kare: [number, number] }[]; // K4: pencerede kıstırma prop'un tutma noktasını izler (paket kapan/ip)
};

// İki dil (K9): metin/vurgu ya ana dilde (bolum.dil ?? "tr") + `en`/`vurgu_en` alanları, ya da {tr,en} (src/kit/dil.ts)
export type DilMetinT = string | { tr?: string; en?: string };
export type DilListeT = string[] | { tr?: string[]; en?: string[] };
export type EkranYazisi = { bant: Bant; metin: DilMetinT; vurgu?: DilListeT; en?: string; vurgu_en?: string[]; tur?: "iddia" | "formul" | "sayac"; kagitSerit?: boolean; bas?: number; bit?: number; boyut?: number;
  sayac?: SayacAyar }; // KT-4: tur "sayac" → metin içindeki {n} sayılır
// KT-4 sayaç: 0 (ya da baslangic) → hedef; bas/sure ekran yazısının bas'ından göreli kare; donus: kare (göreli) + metin {tr,en} → sayı yuvarlak ifadeye döner
export type SayacAyar = { hedef: number; baslangic?: number; bas?: number; sure?: number; ondalik?: number; vurgu?: boolean;
  donus?: { kare: number; metin: DilMetinT; en?: string } };
// KT-1 kelime kelime altyazı (yazı katmanı, dil başına; ses json kelime zamanlarından). Bölüm düzeyinde açılır, plan düzeyinde ezilir/kapatılır.
export type AltyaziAyar = { acik?: boolean; kucuk?: boolean; noktalamasiz?: boolean; grup?: 1 | 2 | 3; maks_harf?: number; bant?: "oto" | "alt" | "ust"; boyut?: number; vurgu?: DilListeT };
// KT-2 kamera dili (Bolum sarmalayıcısı; şablon kamerasının ÜSTÜNE): itme = plan boyunca lineer ölçek artışı (0.04 = %4), titreme px genlik, hiz çarpan, seed
export type KameraDil = { itme?: number; odak?: P; titreme?: number; hiz?: number; seed?: number; aci?: number };
// KT-2 plan geçişi (çıkan planda): whip — yon = görüntünün kaydığı yön; kare = her iki yandaki yarı uzunluk (8)
export type Gecis = { tur: "whip"; yon?: "sol" | "sag" | "yukari" | "asagi"; kare?: number };
// KT-2 darbe: kare = patlama/temas; x,y dekor px (plan kamerasıyla eşlenir; ekran: true ise ekran px); siddet 0–1; yaricap px; flas 0–1; sarsinti 0–1
export type Darbe = { kare: number; x: number; y: number; ekran?: boolean; siddet?: number; yaricap?: number; flas?: number; sarsinti?: number; duman?: boolean; seed?: number };
// KT-3 harita bilgi kartı (yazı katmanı): iğneye (ya da nokta lon/lat) bağlı kâğıt kart
export type HaritaKart = { metin?: DilMetinT; tr?: string; en?: string; alt?: DilMetinT; alt_en?: string; bas?: number; bit?: number; yon?: "ust" | "alt" | "sol" | "sag" };
export type Replik = { kim: DilMetinT; kim_en?: string; metin: DilMetinT; bant: Bant; bas: number; bit: number; vurgu?: DilListeT; vurgu_en?: string[]; kelimeKare?: number[];
  en?: string | { metin: string; bas?: number; bit?: number; kelimeKare?: number[] } }; // en: dilin kendi zamanlaması
// Harita etiketi (yazı katmanı; dekora bağlı, görüntüyle aynı kamera): x,y = işaret noktası, kutu = fiş merkezi (dekor px)
export type HaritaEtiketi = { ad?: string; tr?: string; en?: string; metin?: DilMetinT; x: number; y: number; kutu?: [number, number]; bas?: number; bit?: number };
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
  ses_en?: PlanSes[]; // KE-Y2: EN anlatım (aynı karelerden)
  harita_etiketleri?: HaritaEtiketi[];
  harita_kart?: HaritaKart[];   // KT-3
  altyazi?: false | AltyaziAyar; // KT-1: false = bu planda kapalı
  kamera_dil?: false | KameraDil; // KT-2: false = bu planda kapalı (bölüm varsayılanını ezer)
  gecis?: Gecis;                 // KT-2: bu planın SONUNDAKİ geçiş (sonraki planın girişini de belirler)
  darbe?: Darbe[];               // KT-2
  dokunus?: Dokunus | null;
  not?: string;
  // Evliya K5: plan içi sert kesme — kare_bas'tan itibaren aynı plan başka şablonla (kendi parametre/kamera/karakter/prop'uyla) devam eder.
  // Kareler plan karesidir (0 = plan başı). Ses/yazı/temaslar planın kendisinde kalır.
  devam_plan?: { kare_bas: number; sablon: SablonAdi; parametreler: Record<string, unknown>; kamera?: Kamera; karakterler?: Karakter[]; props?: Prop[] };
};

export type BolumJson = {
  slug: string; baslik: string; fps: 60; dil?: "tr" | "en";
  altyazi?: AltyaziAyar;   // KT-1 (varsayılan kapalı)
  kamera_dil?: KameraDil;  // KT-2 (varsayılan kapalı)
  gorsel_yazisiz?: boolean; // true: görüntü yazısız render edilir (yazı/etiket dil katmanında, KE-Y)
  planlar: Plan[];
};
