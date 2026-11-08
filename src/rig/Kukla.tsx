import React from "react";
import { Bolge, KuklaIsik, RigCtx, useInk, useRig, YuzTonu } from "./RigIsik";

// ===== Vektör kukla düzeneği (rig) v2 =====
// Karakter sağa bakan 3/4 pozda çizilir; facing=-1 ile aynalanır.
// Açılar derece; 0 = uzuv aşağı sarkar. Negatif açı = ileri (bakış yönüne).

export type Agiz = "dinlen" | "gulumse" | "sirit" | "A" | "E" | "O" | "M" | "S" | "esneme" | "fisilti" | "uykulu";

export type Poz = {
  x: number; y: number; scale?: number; facing?: 1 | -1;
  bodyY?: number; lean?: number; breathe?: number; sway?: number;
  thighF: number; kneeF: number; footF?: number; thighB: number; kneeB: number; footB?: number;
  shF: number; elF: number; shB: number; elB: number;
  tails?: number;
  headTilt?: number; headY?: number; lookX?: number; lookY?: number;
  blinkF?: number; blinkB?: number;
  browF?: number; browB?: number;
  agiz?: Agiz;
  hat?: { x: number; y: number; r: number } | null;
  cane?: number | null;
  caneArka?: number | null; // baston arka (dış) elde
  yakin?: boolean;          // yakın plan yüz detayı (göz kapağı kıvrımı, kapak gölgesi, dolgulu kaş, dudak)
  bicak?: number | null;    // K4 (v4 P09): ön elde çakı — ağız aşağı; değer = gövde yerel çerçevesinde ağız açısı (0 = dik aşağı). Parmaklar sapı kavrar
  onKolYok?: boolean;
  yalnizOnKol?: boolean;    // K4: YALNIZ ön kol (+ elindeki nesne) çizilir — masanın önüne ikinci geçiş (masa üstüne uzanan arkadaki karakter)       // ön kol çizilmez (yakın planda yerine KolEl overlay'i gelir, ör. P02 yazan el)
  elSapkaOnde?: boolean;    // tutulan şapkada ön el şapka kenarının ÖNÜNDE yeniden çizilir (isik verilince her zaman; Proto geri uyum için kapalı)
  // K3: yatık poz (yatakta sırtüstü; baş solda yastıkta, gövde yorgan altında). (x, y) = şilte üstü, gövde ortası. Şapka çizilmez.
  yatik?: boolean; yorgan?: string; sarkma?: number; yatikKol?: boolean;
  yorganKalinlik?: number; // K4 (v4 P10): yorgan kabartısının yüksekliği (1 = varsayılan; 0.4–1). Yakın planda yorgan alt bandı kaplamasın
  // K3: hasta yüz (0–1: solgun ten, göz altı morluğu, yarı kapalı göz, yanak kızarıklığı yok) + ter damlaları
  hasta?: number; ter?: boolean;
};

// K3 yüz varyantı (karakter kaydı `src/kit/karakterler.ts` YUZLER). Hepsi isteğe bağlı; boş = François/Louis görünümü (değişmez).
export type YuzTip = {
  genislik?: number; uzunluk?: number;           // yüz oranı (1 = varsayılan; memur .86 × 1.12 uzun-zayıf, telgrafçı 1.14 × .93 yuvarlak)
  burunTip?: "duz" | "sivri" | "yuvarlak";
  kasAci?: number;                               // derece; + iç uç aşağı (sert), − iç uç yukarı (endişeli). Kalınlık = palet.browHeavy
  sac?: "bukle" | "seyrek" | "duz" | "sarikalti"; // seyrek = açık alın, yanlarda ince tutam; duz = yağlı yana taranmış; sarikalti (Evliya R4) = yalnız ense + favori
  cene?: "olgun";                                // Evliya: köşeli çene konturu + çene altı gölge çizgisi ("genç/yeniçeri" okunmasın)
  yasCizgi?: number;                             // 0–1 alın + burun-dudak + kaz ayağı çizgisi
  zayif?: number;                                // 0–1 yanak çukuru
};

export type Palet = {
  coat: string; coatDark: string; coatLight: string; vest: string; vestDark: string; vestDesen: string; cravat: string; shirt: string;
  pants: string; shoe: string; glove: string; skin: string; skinDark: string; hair: string; hat: string; hatBand: string;
  sideburn: number; browHeavy: number;
  // isteğe bağlı varyantlar (kompars ayrışması; varsayılan = mevcut görünüm)
  biyik?: "kivrik" | "duz" | "ince" | "yok"; sakal?: boolean; sapka?: "silindir" | "genis" | "kasket" | "yok" | "sarik" | "sarik-basik" | "takke"; burun?: number;
  // Evliya (R1–R4): kostum "osmanli" = bileğe entari + önü açık kaftan (coat) + kuşak, yen ağzı açılır; "osmanli-kisa" = diz boyu entari (coat) + şalvar (pants) + kuşak.
  // Verilmezse "frak" (1830 Avrupa) — Blanc görünümü birebir.
  kostum?: "frak" | "osmanli" | "osmanli-kisa"; entari?: string; kusak?: string;
  sarikCizgi?: "yatay" | "capraz"; // sarık sargı çizgisi yönü (Lagâri yatay, Hezarfen çapraz)
  biyikOlcek?: number;             // bıyık genişlik/kalınlık çarpanı (Lagâri 1.2: uçlar ağız köşesinin dışına taşar)
  yuz?: YuzTip; // K3
  yuzsuz?: boolean; // kompars (A5r): yüz ayrıntısı (göz, kaş, ağız, bıyık, yanak) çizilmez — baş/saç/şapka/kostüm biçimi + ışık kalır
};

// v2.3 (tasarim.md 0.6): rig varsayılan eldiveni krem/gri OLAMAZ — François taba deri #8a6a48, Louis çıplak el (glove = skin).
// "Eldiven beyazı" yalnız kahraman eldiven + Louis'nin cep eldiveni (overlay) + P19.
export const FRANCOIS: Palet = {
  coat: "#24407a", coatDark: "#15264a", coatLight: "#3c5ea3", vest: "#6e5a3a", vestDark: "#4e3f28", vestDesen: "#c9a24a", cravat: "#f1e8d2", shirt: "#f6f1e4",
  pants: "#3a3530", shoe: "#0f0d0c", glove: "#8a6a48", skin: "#e4b28e", skinDark: "#b98063", hair: "#3a2416", hat: "#141317", hatBand: "#2e2c36",
  sideburn: 1, browHeavy: 1,
};
export const LOUIS: Palet = {
  coat: "#74222f", coatDark: "#47131c", coatLight: "#9a3646", vest: "#85878e", vestDark: "#5f6168", vestDesen: "#a9abb2", cravat: "#16141a", shirt: "#f2ede1",
  pants: "#46464c", shoe: "#0f0d0c", glove: "#e0ae8a", skin: "#e0ae8a", skinDark: "#b27b5f", hair: "#35210f", hat: "#74757c", hatBand: "#2a2a2e",
  sideburn: 1.35, browHeavy: 1.2,
};

const RIM = "#c4d6ff";
const SW = 2;

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt))));
  return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
}
const inkTemel = (c: string) => shade(c, -0.55);
const osm = (p: Palet) => p.kostum === "osmanli" || p.kostum === "osmanli-kisa";
// kontur: bileşenler içinde useInk(inkTemel) — isik.murekkep varsa sahne mürekkebine karışır

// ---- Bacak: uyluk + baldır + ayak (topuk-parmak yuvarlanması) ----
const UYLUK = "M -21 -8 Q -22 50 -15 108 L 15 108 Q 20 50 20 -8 Z", BALDIR = "M -15 -4 L 15 -4 Q 14 50 12 100 L -12 100 Q -14 50 -15 -4 Z";
const Bacak: React.FC<{ x: number; thigh: number; knee: number; foot: number; p: Palet; arka?: boolean; a0?: number }> = ({ x, thigh, knee, foot, p, arka, a0 = 0 }) => {
  const c = arka ? shade(p.pants, -0.3) : p.pants;
  const { I } = useRig(); const ink = useInk(inkTemel);
  return (
    <g transform={`translate(${x},-226) rotate(${thigh})`}>
      <path d={UYLUK} fill={c} stroke={ink(c)} strokeWidth={SW} strokeLinejoin="round" />
      {!I && <path d="M -21 -8 Q -22 50 -15 108 L -6 108 Q -12 50 -10 -8 Z" fill="#000" opacity={0.22} />}
      {!I && !arka && <path d="M 18 0 Q 19 50 14 104" stroke={RIM} strokeWidth={2} opacity={0.35} fill="none" />}
      <Bolge d={UYLUK} k={[-22, 20, -8, 108]} a={a0 + thigh} renk={c} kenar={!arka} />
      <g transform={`translate(0,104) rotate(${knee})`}>
        <path d={BALDIR} fill={c} stroke={ink(c)} strokeWidth={SW} strokeLinejoin="round" />
        {!I && <path d="M -15 -4 Q -14 50 -12 100 L -4 100 Q -6 50 -6 -4 Z" fill="#000" opacity={0.22} />}
        <Bolge d={BALDIR} k={[-15, 15, -4, 100]} a={a0 + thigh + knee} renk={c} kenar={!arka} />
        <path d="M -6 2 Q 0 8 8 4" stroke={ink(c)} strokeWidth={1.5} fill="none" opacity={0.7} />
        {/* paça + ayak bağı */}
        <path d="M -13 92 L 13 92 L 14 102 L -14 102 Z" fill={shade(c, -0.15)} />
        <g transform={`translate(0,99) rotate(${-(thigh + knee) + foot},0,0)`}>
          <path d="M -15 -2 Q -18 12 -10 15 L 36 15 Q 45 13 41 3 Q 33 -6 10 -5 Z" fill={p.shoe} stroke={osm(p) ? ink(p.shoe) : "#000"} strokeWidth={SW} />
          <path d="M 12 -2 Q 28 -2 38 5" stroke={I ? I.renk : "#8a8ea0"} strokeWidth={2.2} fill="none" opacity={I ? 0.4 : 0.55} />
          {!osm(p) && <rect x={-12} y={12} width={12} height={4} fill="#000" />}
        </g>
      </g>
    </g>
  );
};

// ---- Kol: üst kol + ön kol + eldivenli el ----
// K4 çakı: ahşap sap (el içinde) + çelik ağız (≈11 cm, yerel ~36 birim), ağız ucu y = +BICAK_UC; kavrayan parmaklar sapın önünde
export const BICAK_UC = 50;
const Bicak: React.FC<{ aci: number; p: Palet }> = ({ aci, p }) => (
  <g transform={`rotate(${aci})`}>
    <path d="M -4.5 -16 Q 0 -19 4.5 -16 L 4 12 L -4 12 Z" fill="#4a3220" stroke="#1c120a" strokeWidth={1.6} />
    <rect x={-4.8} y={10} width={9.6} height={4} fill="#b8a070" stroke="#4a3a1c" strokeWidth={1} />
    <path d="M -3.6 14 L 3.6 14 L 2.6 40 L 0 50 L -2.4 40 Z" fill="#b9bec4" stroke="#3a3e44" strokeWidth={1.5} strokeLinejoin="round" />
    <path d="M 1.6 16 L 1.2 40" stroke="#eef1f3" strokeWidth={1.2} opacity={0.8} />
    {/* kavrayan dört parmak: sapın önünde boğum sırası (ten) */}
    <path d="M -9 -10 Q -11 -2 -8 6 L 8 6 Q 10 -2 8 -10 Z" fill={p.glove} stroke={p.glove === p.skin ? p.skinDark : "#3a2a1c"} strokeWidth={1.4} />
    <path d="M -8 -4 L 8 -4 M -8 1 L 8 1" stroke={p.glove === p.skin ? p.skinDark : "#3a2a1c"} strokeWidth={1} opacity={0.7} />
  </g>
);
const Baston: React.FC<{ aci: number }> = ({ aci }) => (
  <g transform={`rotate(${aci})`}>
    <rect x={-4} y={-6} width={8} height={250} rx={3} fill="#3b2412" stroke="#160c06" strokeWidth={1.6} />
    <rect x={-1} y={0} width={2} height={240} fill="#7a5030" opacity={0.6} />
    <circle cx={0} cy={-9} r={10} fill="#d4ad52" stroke="#5a4018" strokeWidth={1.6} />
    <circle cx={-3} cy={-12} r={3} fill="#fff4c0" opacity={0.7} />
    <rect x={-4.5} y={238} width={9} height={14} fill="#d4ad52" />
  </g>
);

const UST_KOL = "M -17 -10 Q 0 -20 17 -10 Q 17 40 14 92 L -14 92 Q -17 40 -17 -10 Z", ON_KOL = "M -14 -2 L 14 -2 Q 13 40 12 76 L -12 76 Q -13 40 -14 -2 Z";
const Kol: React.FC<{ x: number; sh: number; el: number; p: Palet; arka?: boolean; a0?: number; sadeceEl?: boolean; children?: React.ReactNode }> = ({ x, sh, el, p, arka, a0 = 0, sadeceEl, children }) => {
  const c = arka ? p.coatDark : p.coat;
  const { I } = useRig(); const ink = useInk(inkTemel);
  const el_ = (
    <g transform="translate(0,90)">
      {/* el + başparmak: eldivenliyse sırt dikişi, çıplaksa (glove = skin) boğum çizgisi + parmak ayrımı */}
      <path d="M -12 -9 Q -15 9 -5 17 Q 9 21 14 8 Q 16 -5 10 -9 Z" fill={p.glove} stroke={p.glove === p.skin ? p.skinDark : ink(p.glove)} strokeWidth={SW} />
      <path d="M 10 -6 Q 20 -2 16 8" fill={p.glove} stroke={p.glove === p.skin ? p.skinDark : ink(p.glove)} strokeWidth={SW} />
      {p.glove === p.skin
        ? <path d="M -9 9 Q -3 13 4 12 M -6 14 L -5 18 M 0 15 L 1 19 M 6 13 L 8 17" stroke={p.skinDark} strokeWidth={1.2} fill="none" opacity={0.8} />
        : <path d="M -6 2 L 6 2 M -6 8 L 6 8" stroke={ink(p.glove)} strokeWidth={1} opacity={0.5} />}
      {/* el: tarama yok, yumuşak ton (ışık yanı kenar) */}
      <YuzTonu d="M -12 -9 Q -15 9 -5 17 Q 9 21 14 8 Q 16 -5 10 -9 Z" x0={-15} x1={16} a={a0 + sh + el} renk={p.glove === p.skin ? p.skinDark : shade(p.glove, -0.35)} azami={0.45} />
      {children}
    </g>
  );
  if (sadeceEl) return <g transform={`translate(${x},-380) rotate(${sh})`}><g transform={`translate(0,88) rotate(${el})`}>{el_}</g></g>;
  return (
    <g transform={`translate(${x},-380) rotate(${sh})`}>
      <path d={UST_KOL} fill={c} stroke={ink(c)} strokeWidth={SW} strokeLinejoin="round" />
      {!I && <path d="M -17 -10 Q -17 40 -14 92 L -5 92 Q -8 40 -6 -14 Z" fill="#000" opacity={0.25} />}
      {!I && !arka && <path d="M 15 -6 Q 16 40 13 88" stroke={RIM} strokeWidth={2.2} opacity={0.45} fill="none" />}
      <Bolge d={UST_KOL} k={[-17, 17, -20, 92]} a={a0 + sh} renk={c} kenar={!arka} />
      <g transform={`translate(0,88) rotate(${el})`}>
        <path d="M -8 -6 Q 0 2 8 -6" stroke={ink(c)} strokeWidth={1.6} fill="none" />
        <path d={ON_KOL} fill={c} stroke={ink(c)} strokeWidth={SW} strokeLinejoin="round" />
        {!I && <path d="M -14 -2 Q -13 40 -12 76 L -4 76 Q -5 40 -5 -2 Z" fill="#000" opacity={0.25} />}
        <Bolge d={ON_KOL} k={[-14, 14, -2, 78]} a={a0 + sh + el} renk={c} kenar={!arka} />
        {osm(p)
          // Evliya R1: yen ağzı bilekte ≈1.25× açılır (gömlek manşeti yok)
          ? <path d="M -13 60 L 13 60 L 17 82 Q 0 86 -17 82 Z" fill={shade(c, 0.08)} stroke={ink(c)} strokeWidth={1.6} strokeLinejoin="round" />
          : <>
            <path d="M -13 66 L 13 66 L 13 78 L -13 78 Z" fill={shade(c, 0.12)} />
            {/* gömlek manşeti: gölgede (shirt −%20) — bilekte "eldiven beyazı" bandına girmez (tasarim 0.6: el çevresinde beyaz yalnız imza nesnesi) */}
            <rect x={-12} y={77} width={24} height={6} fill={shade(p.shirt, -0.2)} />
          </>}
        {el_}
      </g>
    </g>
  );
};

export const AGIZLAR: Agiz[] = ["dinlen", "gulumse", "sirit", "A", "E", "O", "M", "S", "esneme", "fisilti", "uykulu"];
const AGIZ: Record<Agiz, React.ReactNode> = {
  dinlen: <path d="M 8 40 Q 19 42 30 39" stroke="#5a2a22" strokeWidth={2.6} fill="none" strokeLinecap="round" />,
  gulumse: <path d="M 6 38 Q 19 47 32 37" stroke="#5a2a22" strokeWidth={3} fill="none" strokeLinecap="round" />,
  sirit: <g><path d="M 8 41 Q 22 44 35 32" stroke="#5a2a22" strokeWidth={3.2} fill="none" strokeLinecap="round" /><path d="M 33 33 Q 37 31 37 35" stroke="#5a2a22" strokeWidth={2} fill="none" /></g>,
  A: <g><path d="M 8 37 Q 19 35 31 37 Q 28 55 19 56 Q 10 55 8 37 Z" fill="#4a1a17" stroke="#3a1410" strokeWidth={2} /><rect x={11} y={37} width={17} height={4} fill="#f3eee6" /><path d="M 12 50 Q 19 53 26 50" fill="#c25a50" /></g>,
  E: <g><path d="M 7 38 Q 19 36 32 38 Q 28 48 19 49 Q 10 48 7 38 Z" fill="#4a1a17" stroke="#3a1410" strokeWidth={2} /><rect x={10} y={38} width={19} height={4} fill="#f3eee6" /></g>,
  O: <g><ellipse cx={20} cy={44} rx={7.5} ry={9.5} fill="#4a1a17" stroke="#3a1410" strokeWidth={2} /></g>,
  M: <path d="M 9 40 Q 19 39 30 40" stroke="#5a2a22" strokeWidth={3.6} strokeLinecap="round" fill="none" />,
  S: <g><path d="M 8 39 Q 19 37 31 39 Q 27 45 19 46 Q 11 45 8 39 Z" fill="#4a1a17" stroke="#3a1410" strokeWidth={2} /><rect x={10} y={39} width={19} height={3.5} fill="#f3eee6" /></g>,
  // K2 (D5): kocaman esneme — çene düşer (yüz konturunun altına; çene uzantısı başta ten rengiyle çizilir), dikey oval ağız, üst diş sırası, dil
  // K3: fısıltı — küçük aralık dudak (dişsiz)
  fisilti: <g><path d="M 12 39.5 Q 19 38 27 39.5 Q 24 44.5 19 44.5 Q 14 44.5 12 39.5 Z" fill="#4a1a17" stroke="#3a1410" strokeWidth={1.6} /></g>,
  // K4 (v4 P08): uykulu/sıkılmış esneme — orta açık YUVARLAK ağız (gerilmiş değil), diş yok, dil ucu; çene hafif düşer
  uykulu: <g><path d="M 20 37 C 30 37 33 48 31 55 C 29 62 24 64 20 64 C 16 64 11 62 9 55 C 7 48 10 37 20 37 Z" fill="#3a1210" stroke="#2a0e0c" strokeWidth={2.2} /><path d="M 13 58 Q 20 54 27 58 Q 24 63 20 63 Q 16 63 13 58 Z" fill="#a8504a" /><path d="M 12 40 Q 20 36 28 40" stroke="#b8705e" strokeWidth={2} fill="none" opacity={0.6} /></g>,
  esneme: <g><path d="M 4 36 Q 20 31 36 36 Q 38 62 21 72 Q 4 64 4 36 Z" fill="#3a1210" stroke="#2a0e0c" strokeWidth={2.2} /><path d="M 8 37 Q 20 34 32 37 L 31 41 Q 20 39 9 41 Z" fill="#f3eee6" /><path d="M 10 64 Q 21 56 32 63 Q 26 71 21 71 Q 14 70 10 64 Z" fill="#b8544a" /></g>,
};

// Evliya R3: sarık (yuvarlak sargı; alın çizgisinden yukarıyı ve kulak üstünü örter) · sarık-basik (Hezarfen: basık, dar, çapraz sargı) · takke (sargısız keçe).
// Yerel orijin = şapka tabanı (Kafa: yüz tepesinin 8 birim altı); +y aşağı. Sarık tabanı alnın ortasına (+18) iner.
export const sarikYol = (basik: boolean) => {
  const h = basik ? 62 : 70, gx = basik ? 0.9 : 1;
  const X = (x: number) => (x * gx).toFixed(1);
  // basık küre (eni boyundan büyük), yuvarlak tepe — aşçı külahı/silindir okunmasın
  return { d: `M ${X(-54)} 8 C ${X(-70)} ${-h * 0.42} ${X(-44)} ${-h * 1.02} ${X(4)} ${-h} C ${X(52)} ${-h * 1.0} ${X(74)} ${-h * 0.46} ${X(60)} 12 Q ${X(4)} 20 ${X(-54)} 8 Z`, h, gx };
};
export const TAKKE_YOL = "M -47 8 Q -52 -28 -4 -40 Q 44 -42 51 4 Q 46 12 2 13 Q -40 14 -47 8 Z";
const Sapka: React.FC<{ p: Palet; tall?: number; a?: number }> = ({ p, tall = 1, a = 0 }) => {
  const { I } = useRig(); const ink = useInk(inkTemel);
  if (p.sapka === "yok") return null;
  if (p.sapka === "sarik" || p.sapka === "sarik-basik") {
    const { d, h, gx } = sarikYol(p.sapka === "sarik-basik");
    const capraz = (p.sarikCizgi ?? (p.sapka === "sarik-basik" ? "capraz" : "yatay")) === "capraz";
    const cizgi = capraz
      ? [0, 1, 2].map((i) => `M ${(-44 + i * 26) * gx} ${12 - i * 4} Q ${(-20 + i * 30) * gx} ${-h * 0.45} ${(6 + i * 26) * gx} ${-h * 0.95 + i * 10}`)
      : [0.18, 0.46, 0.72].map((t) => { const y = 10 - t * (h + 4); const w = Math.sqrt(Math.max(0.05, 1 - Math.pow(t * 1.05, 2.4))); return `M ${-60 * w * gx} ${y} Q ${4 * gx} ${y + 12 * w} ${66 * w * gx} ${y - 2}`; });
    return (
      <g>
        <path d={d} fill={p.hat} stroke={ink(p.hat)} strokeWidth={SW} strokeLinejoin="round" />
        {cizgi.map((c, i) => <path key={i} d={c} stroke={p.hatBand} strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.9} />)}
        <Bolge d={d} k={[-60 * gx, 64 * gx, -h - 14, 24]} a={a} renk={p.hat} tarama={false} />
      </g>
    );
  }
  if (p.sapka === "takke") {
    return (
      <g>
        <path d={TAKKE_YOL} fill={p.hat} stroke={ink(p.hat)} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M -30 -26 Q 2 -38 38 -24" stroke={p.hatBand} strokeWidth={2} fill="none" opacity={0.8} />
        <Bolge d={TAKKE_YOL} k={[-52, 51, -42, 14]} a={a} renk={p.hat} tarama={false} />
      </g>
    );
  }
  if (p.sapka === "kasket") {
    // K3: kumaş kasket (casquette, 1830'lar işçi/görevli): yumuşak tepe + kısa siperlik (bakış yönünde)
    const kd = "M -40 2 Q -44 -26 -8 -34 Q 30 -38 46 -14 Q 48 -4 44 2 Z";
    return (
      <g>
        <path d={kd} fill={p.hat} stroke={ink(p.hat)} strokeWidth={SW} />
        <path d="M -30 -14 Q 4 -30 38 -16" stroke={shade(p.hat, -0.3)} strokeWidth={1.6} fill="none" opacity={0.7} />
        <Bolge d={kd} k={[-44, 48, -38, 2]} a={a} renk={p.hat} />
        <path d="M 30 -2 Q 54 -6 72 4 Q 58 10 34 6 Z" fill={shade(p.hat, -0.25)} stroke={ink(p.hat)} strokeWidth={SW} />
        <path d="M -40 -2 L 44 -2 L 44 3 L -40 3 Z" fill={p.hatBand} />
      </g>
    );
  }
  if (p.sapka === "genis") {
    // alçak tepeli, geniş kenarlı şapka (tüccar/kompars)
    return (
      <g>
        <path d="M -30 0 Q -32 -22 -26 -40 Q 4 -48 36 -40 Q 40 -22 36 0 Z" fill={p.hat} stroke={ink(p.hat)} strokeWidth={SW} />
        <path d="M -30 -4 L -30 -14 Q 4 -18 36 -14 L 36 -4 Z" fill={p.hatBand} />
        <Bolge d="M -30 0 Q -32 -22 -26 -40 Q 4 -48 36 -40 Q 40 -22 36 0 Z" k={[-32, 40, -48, 0]} a={a} renk={p.hat} />
        <path d="M -74 4 Q -76 -8 -60 -6 Q 4 4 68 -6 Q 82 -8 80 4 Q 4 22 -74 4 Z" fill={p.hat} stroke={ink(p.hat)} strokeWidth={SW} />
        {!I && <path d="M 30 -38 Q 34 -20 31 -6" stroke={RIM} strokeWidth={2} opacity={0.45} fill="none" />}
      </g>
    );
  }
  const h = 80 * tall;
  return (
    <g>
      <path d={`M -34 0 Q -37 ${-h * 0.5} -31 ${-h} Q 4 ${-h - 10} 41 ${-h} Q 45 ${-h * 0.5} 38 0 Z`} fill={p.hat} stroke={ink(p.hat)} strokeWidth={SW} />
      <path d={`M -31 ${-h} Q 4 ${-h - 10} 41 ${-h} Q 4 ${-h + 6} -31 ${-h} Z`} fill={shade(p.hat, I ? 0.12 : 0.25)} />
      <path d="M -34 -3 L -34 -17 Q 2 -21 38 -17 L 38 -3 Z" fill={p.hatBand} />
      {!I && <path d={`M -22 ${-h + 6} Q -26 ${-h * 0.5} -22 -22`} stroke="#ffffff" strokeWidth={5} opacity={0.14} fill="none" strokeLinecap="round" />}
      {!I && <path d={`M 32 ${-h + 4} Q 35 ${-h * 0.5} 31 -20`} stroke={RIM} strokeWidth={2.4} opacity={0.5} fill="none" />}
      <Bolge d={`M -34 0 Q -37 ${-h * 0.5} -31 ${-h} Q 4 ${-h - 10} 41 ${-h} Q 45 ${-h * 0.5} 38 0 Z`} k={[-37, 45, -h - 10, 0]} a={a} renk={p.hat} />
      {/* kıvrık kenar */}
      <path d="M -56 2 Q -58 -8 -46 -6 Q 2 6 50 -6 Q 62 -8 60 2 Q 2 18 -56 2 Z" fill={p.hat} stroke={ink(p.hat)} strokeWidth={SW} />
      <path d="M -50 0 Q 2 12 54 0" stroke={I ? I.renk : RIM} strokeWidth={1.6} opacity={I ? 0.3 : 0.35} fill="none" />
    </g>
  );
};

export const KuklaSapka = Sapka;

// K3 burun tipleri (duz = mevcut)
const BURUN = { duz: "M 33 -3 Q 38 8 47 19 Q 48 26 39 26 Q 33 26 30 22", sivri: "M 33 -3 Q 40 9 54 21 Q 52 26 40 26 Q 33 26 30 22", yuvarlak: "M 33 -3 Q 36 7 43 15 Q 52 22 42 28 Q 33 28 30 22" } as const;
const YUZ = "M -36 -18 Q -38 -52 2 -54 Q 40 -54 45 -18 Q 48 4 43 22 Q 37 44 20 53 Q 2 60 -13 52 Q -32 40 -36 -18 Z";
const KULAK = "M -33 -6 Q -47 -10 -45 6 Q -43 21 -30 17 Z";
const Kafa: React.FC<{ pz: Poz; p: Palet; louis?: boolean }> = ({ pz, p, louis }) => {
  const { I } = useRig();
  const aKafa = (pz.lean ?? 0) + (pz.headTilt ?? 0);
  const lx = (pz.lookX ?? 0) * 3.2, ly = (pz.lookY ?? 0) * 2.4;
  const bF = (pz.browF ?? 0) * 6, bB = (pz.browB ?? 0) * 6;
  const sk = p.skin, skd = p.skinDark;
  const Y_ = p.yuz ?? {};
  const gx = Y_.genislik ?? 1, gy = Y_.uzunluk ?? 1, ka = Y_.kasAci ?? 0, sac = Y_.sac ?? "bukle";
  const h = pz.hasta ?? 0;
  const eye = (cx: number, cy: number, rx: number, ry: number, blink0: number) => {
    const blink = Math.max(blink0, 0.45 * h);
    const lid = cy - ry + 1 + (2 * ry + 1) * blink;
    return (
      <g>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#f6efe3" />
        <circle cx={cx + 1.5 + lx} cy={cy + 0.6 + ly} r={ry * 0.8} fill="#4a2e18" />
        <circle cx={cx + 1.5 + lx} cy={cy + 0.6 + ly} r={ry * 0.42} fill="#0e0806" />
        <circle cx={cx + 3 + lx} cy={cy - 1.4 + ly} r={1.3} fill="#fff" />
        <path d={`M ${cx - rx - 1.5} ${cy - ry - 3} L ${cx + rx + 1.5} ${cy - ry - 3} L ${cx + rx + 1.5} ${lid} Q ${cx} ${lid + 2.5} ${cx - rx - 1.5} ${lid} Z`} fill={sk} />
        <path d={`M ${cx - rx - 1.5} ${lid} Q ${cx} ${lid + 2.5} ${cx + rx + 1.5} ${lid}`} stroke="#3a2016" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        <path d={`M ${cx - rx} ${cy - ry - 4} Q ${cx} ${cy - ry - 7} ${cx + rx} ${cy - ry - 4}`} stroke={skd} strokeWidth={1.4} fill="none" opacity={0.7} />
        <path d={`M ${cx - rx * 0.8} ${cy + ry + 3} Q ${cx} ${cy + ry + 5} ${cx + rx * 0.8} ${cy + ry + 2}`} stroke={skd} strokeWidth={1.2} fill="none" opacity={0.5} />
        {pz.yakin && <>
          {/* üst kapağın gözbebeğine düşen gölgesi + kapak kıvrımı + alt kapak hacmi + kirpik ucu */}
          <path d={`M ${cx - rx} ${Math.min(lid, cy) + 0.5} Q ${cx} ${Math.min(lid, cy) + 3.2} ${cx + rx} ${Math.min(lid, cy) + 0.5} L ${cx + rx} ${Math.min(lid, cy) - 1} Q ${cx} ${Math.min(lid, cy) + 1} ${cx - rx} ${Math.min(lid, cy) - 1} Z`} fill={skd} opacity={0.45} />
          <path d={`M ${cx - rx - 1} ${cy - ry - 5.5 + blink * ry} Q ${cx + 1} ${cy - ry - 9 + blink * ry} ${cx + rx + 1.5} ${cy - ry - 5 + blink * ry}`} stroke={skd} strokeWidth={1.1} fill="none" opacity={0.8} />
          <path d={`M ${cx + rx + 1.5} ${lid} l 2.6 -1.6`} stroke="#3a2016" strokeWidth={1.6} strokeLinecap="round" />
          <path d={`M ${cx - rx * 0.6} ${cy + ry + 1.5} Q ${cx} ${cy + ry + 3} ${cx + rx * 0.7} ${cy + ry + 1.2}`} stroke="#fff3e6" strokeWidth={0.9} fill="none" opacity={0.5} />
        </>}
        {h > 0 && <path d={`M ${cx - rx - 1} ${cy + ry + 1} Q ${cx} ${cy + ry + 8} ${cx + rx + 2} ${cy + ry} Q ${cx} ${cy + ry + 4} ${cx - rx - 1} ${cy + ry + 1} Z`} fill="#6e5468" opacity={0.42 * h} />}
      </g>
    );
  };
  const olc = gx !== 1 || gy !== 1 ? `scale(${gx},${gy})` : undefined;
  return (
    <g transform={`translate(8,${-450 + (pz.headY ?? 0)}) rotate(${pz.headTilt ?? 0},0,40)`}>
      <g transform={olc}>
      <path d="M -11 32 L 15 32 L 17 64 L -9 64 Z" fill={skd} />
      {/* arka saç kütlesi (seyrek saçta yalnız ense) */}
      {sac === "seyrek" || sac === "sarikalti"
        ? <path d="M -42 6 Q -52 -24 -38 -40 Q -40 -14 -32 14 Z" fill={p.hair} />
        : <path d="M -42 6 Q -56 -40 -14 -58 Q 28 -68 46 -34 Q 52 -14 44 -6 Q 32 -44 0 -42 Q -30 -36 -32 14 Z" fill={p.hair} />}
      {/* yüz */}
      <path d={YUZ} fill={sk} stroke={skd} strokeWidth={SW} />
      <path d="M -36 -18 Q -38 22 -13 52 Q -26 30 -24 -4 Q -24 -32 -8 -48 Q -34 -44 -36 -18 Z" fill={skd} opacity={I ? 0.18 : 0.42} />
      {!p.yuzsuz && <>
      {/* elmacık + yanak sıcaklığı */}
      <path d="M 4 12 Q 18 18 34 12" stroke={skd} strokeWidth={1.6} fill="none" opacity={0.55} />
      <ellipse cx={-8} cy={18} rx={13} ry={8} fill="#d0745e" opacity={0.18 * (1 - h)} />
      <ellipse cx={34} cy={16} rx={8} ry={6} fill="#d0745e" opacity={0.16 * (1 - h)} />
      {(Y_.zayif ?? 0) > 0 && <><path d="M 28 6 Q 22 22 32 36 Q 18 24 20 8 Z" fill={skd} opacity={0.3 * Y_.zayif!} /><path d="M 30 4 Q 24 20 33 35" stroke={skd} strokeWidth={1.4} fill="none" opacity={0.55 * Y_.zayif!} /></>}
      {(Y_.yasCizgi ?? 0) > 0 && <g stroke={skd} fill="none" strokeLinecap="round" opacity={0.75 * Y_.yasCizgi!} strokeWidth={1.4}>
        <path d="M -12 -34 Q 8 -38 30 -33" /><path d="M -6 -40 Q 10 -43 26 -39" />
        <path d="M 37 24 Q 31 31 33 39" /><path d="M 32 -10 l 6 -2 M 32 -6 l 6 1" />
      </g>}
      </>}
      {/* kulak */}
      <path d={KULAK} fill={sk} stroke={skd} strokeWidth={SW} />
      <path d="M -38 -2 Q -42 6 -36 12" stroke={skd} strokeWidth={1.4} fill="none" />
      {/* rig ışığı: yüzde TARAMA YOK — yumuşak ton düşümü (arkadan ışıkta yarı gölge, okunur) + ışık yanında sıcak kenar */}
      <YuzTonu d={[YUZ, KULAK]} x0={-46} x1={48} a={aKafa} renk={skd} azami={0.7} />
      {/* favori */}
      <path d={`M -32 -30 Q -39 ${2 + 14 * p.sideburn} -25 ${19 + 21 * p.sideburn} Q -18 ${10 + 16 * p.sideburn} -20 -32 Z`} fill={p.hair} />
      {/* saç: bukleli tutam + teller */}
      {sac === "bukle" && <>
      <path d="M -37 -26 Q -44 -56 -14 -62 Q 10 -72 32 -58 Q 47 -48 44 -28 Q 34 -46 16 -44 Q 2 -38 -6 -48 Q -20 -40 -37 -26 Z" fill={p.hair} />
      {[[-26, -52, 10], [-6, -60, 11], [14, -60, 10], [32, -50, 9], [40, -36, 7]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={p.hair} />)}
      {[[-30, -44, -12, -58], [-10, -48, 8, -62], [10, -48, 28, -56]].map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} Q ${(a + c) / 2} ${d - 4} ${c} ${d}`} stroke={shade(p.hair, 0.35)} strokeWidth={1.6} fill="none" opacity={0.6} />)}
      <path d="M -24 -60 Q -4 -70 20 -64" stroke={I ? I.renk : RIM} strokeWidth={2.4} opacity={I ? 0.4 : 0.55} fill="none" />
      </>}
      {sac === "seyrek" && <>
        {/* açık alın: kulak üstünde ince tutam + tepede birkaç tel */}
        <path d="M -38 -18 Q -42 -40 -28 -50 Q -30 -36 -30 -16 Z" fill={p.hair} />
        {[[-24, -48, 0, -56], [-14, -50, 12, -55], [-4, -52, 22, -52]].map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} Q ${(a + c) / 2} ${d - 5} ${c} ${d}`} stroke={p.hair} strokeWidth={2} fill="none" opacity={0.8} />)}
        <path d="M -16 -53 Q 4 -58 24 -54" stroke={I ? I.renk : RIM} strokeWidth={2} opacity={I ? 0.35 : 0.45} fill="none" />
      </>}
      {sac === "duz" && <>
        {/* yağlı, yana taranmış: düz kep + ayrım çizgisi + tarak izleri */}
        <path d="M -38 -24 Q -46 -60 -10 -64 Q 28 -68 44 -46 Q 47 -36 44 -28 Q 32 -48 10 -50 Q -14 -48 -26 -36 Q -32 -30 -38 -24 Z" fill={p.hair} />
        <path d="M -20 -58 Q -6 -52 6 -50" stroke={shade(p.hair, -0.4)} strokeWidth={1.6} fill="none" />
        {[0, 1, 2].map((i) => <path key={i} d={`M ${2 + i * 10} ${-60 + i * 2} Q ${18 + i * 8} ${-60 + i * 3} ${32 + i * 4} ${-48 + i * 4}`} stroke={shade(p.hair, 0.4)} strokeWidth={1.2} fill="none" opacity={0.55} />)}
        <path d="M -24 -62 Q -4 -68 22 -64" stroke={I ? I.renk : RIM} strokeWidth={2.2} opacity={I ? 0.4 : 0.55} fill="none" />
      </>}
      {!p.yuzsuz && <>
      {/* gözler */}
      {eye(-4, -8, 6.5, 5.5, pz.blinkB ?? 0)}
      {eye(22, -8, 8.5, 6.5, pz.blinkF ?? 0)}
      {/* kaşlar */}
      <g transform={ka ? `rotate(${ka},-5,-22)` : undefined}>{!pz.yakin && <path d={`M -14 ${-20 - bB} Q -5 ${-26 - bB * 1.2} 4 ${-20 - bB * 0.6}`} stroke={p.hair} strokeWidth={4.6 * p.browHeavy} fill="none" strokeLinecap="round" />}</g>
      <g transform={ka ? `rotate(${-ka},23,-24)` : undefined}>{!pz.yakin && <path d={`M 11 ${-21 - bF * 0.6} Q 23 ${-29 - bF * 1.2} 35 ${-22 - bF}`} stroke={p.hair} strokeWidth={5.6 * p.browHeavy} fill="none" strokeLinecap="round" />}</g>
      {pz.yakin && <>
        {/* dolgulu, uca doğru incelen kaşlar (yakın plan) */}
        <g transform={ka ? `rotate(${ka},-5,-22)` : undefined}><path d={`M -15 ${-19 - bB} Q -6 ${-28 - bB * 1.2} 5 ${-21 - bB * 0.6} Q -4 ${-23 - bB * 1.1} -15 ${-17 - bB} Z`} fill={p.hair} stroke={p.hair} strokeWidth={1.4 * p.browHeavy} strokeLinejoin="round" /></g>
        <g transform={ka ? `rotate(${-ka},23,-24)` : undefined}><path d={`M 10 ${-19 - bF * 0.6} Q 22 ${-32 - bF * 1.2} 36 ${-23 - bF} Q 23 ${-26 - bF * 1.1} 11 ${-15 - bF * 0.6} Z`} fill={p.hair} stroke={p.hair} strokeWidth={1.8 * p.browHeavy} strokeLinejoin="round" />
        {[0, 1, 2].map((i) => <path key={i} d={`M ${14 + i * 7} ${-21 - bF * (0.7 + i * 0.15)} l 5 -3`} stroke={shade(p.hair, 0.35)} strokeWidth={0.9} opacity={0.6} />)}</g>
        {/* gülümseme çizgisi + çene/şakak hacmi */}
        <path d="M 38 22 Q 44 34 38 46" stroke={skd} strokeWidth={1.4} fill="none" opacity={0.5} />
        <path d="M -20 -40 Q -10 -46 2 -44" stroke={skd} strokeWidth={1} fill="none" opacity={0.35} />
      </>}
      </>}
      {/* burun */}
      <g transform={`translate(33,-3) scale(${p.burun ?? 1}) translate(-33,3)`}><path d={BURUN[Y_.burunTip ?? "duz"]} fill={sk} stroke={p.yuzsuz && osm(p) ? sk : skd} strokeWidth={SW} strokeLinejoin="round" />
        <YuzTonu d={BURUN[Y_.burunTip ?? "duz"] + " Z"} x0={-46} x1={48} a={aKafa} renk={skd} azami={0.7} isikRenk={false} /></g>
      {!p.yuzsuz && <>
      <path d="M 33 23 Q 36 21 39 23" stroke="#7a4030" strokeWidth={1.8} fill="none" />
      {!I && <path d="M 40 6 Q 44 13 45 18" stroke="#fff3e6" strokeWidth={1.8} opacity={0.5} fill="none" />}
      {/* ağız */}
      {pz.agiz === "uykulu" && <path d="M -6 47 Q 2 64 21 69 Q 37 64 41 41 L 36 41 Q 30 56 20 54 Q 4 55 -6 47 Z" fill={sk} stroke={skd} strokeWidth={SW} />}
      {pz.agiz === "esneme" && <path d="M -10 48 Q 0 76 22 82 Q 40 76 44 40 L 38 40 Q 30 60 20 56 Q 2 58 -10 48 Z" fill={sk} stroke={skd} strokeWidth={SW} />}
      <g transform="translate(2,0)">{AGIZ[pz.agiz ?? "dinlen"]}</g>
      {pz.yakin && (pz.agiz === "gulumse" || pz.agiz === "sirit" || pz.agiz === "dinlen" || pz.agiz === "M") && <g transform="translate(2,0)">
        {/* alt dudak hacmi + ağız köşesi (yakın plan) */}
        <path d={pz.agiz === "sirit" ? "M 12 45 Q 22 48 32 38" : "M 10 44 Q 19 49 29 43"} stroke="#b8705e" strokeWidth={3.4} fill="none" opacity={0.55} strokeLinecap="round" />
        <path d={pz.agiz === "sirit" ? "M 35 32 q 3 -2 4 2" : "M 31 38 q 3 0 3 3"} stroke={skd} strokeWidth={1.3} fill="none" />
      </g>}
      {/* bıyık: uçları kıvrık */}
      {p.biyik === "ince" && <path d="M 5 32 Q 14 28.5 22 30.5 Q 32 28.5 41 32 Q 32 31.5 22 33 Q 13 31.5 5 32 Z" fill={p.hair} stroke={p.hair} strokeWidth={0.8} />}
      {(p.biyik ?? (louis ? "duz" : "kivrik")) !== "yok" && p.biyik !== "ince" && <g transform={p.biyikOlcek ? `translate(22,31) scale(${p.biyikOlcek},${1 + (p.biyikOlcek - 1) * 1.5}) translate(-22,-31)` : undefined}>
        <path d={(p.biyik ?? (louis ? "duz" : "kivrik")) === "duz" ? "M 0 32 Q 10 27 22 30 Q 34 27 45 32 Q 38 38 22 35 Q 8 38 0 32 Z" : "M -6 34 Q 4 24 22 29 Q 40 24 50 34 Q 56 40 50 40 Q 54 34 46 34 Q 34 32 22 35 Q 6 33 -4 40 Q -12 38 -6 34 Z"} fill={p.hair} />
        <path d="M 6 30 Q 22 26 40 30" stroke={shade(p.hair, 0.4)} strokeWidth={1.4} fill="none" opacity={0.6} />
      </g>}
      </>}
      {p.sakal && <path d="M -30 10 Q -26 44 -10 56 Q 8 66 24 60 Q 40 52 44 30 Q 36 50 20 52 Q 4 54 -8 44 Q -20 30 -30 10 Z" fill={p.hair} opacity={0.95} />}
      {/* çene */}
      {!p.yuzsuz && <>
      {pz.agiz !== "esneme" && pz.agiz !== "uykulu" && <path d="M 2 54 Q 20 52 36 42" stroke={skd} strokeWidth={1.8} fill="none" opacity={0.6} />}
      {Y_.cene === "olgun" && <><path d="M -24 40 Q -16 54 -2 58 L 22 57 Q 36 52 42 36" stroke={skd} strokeWidth={2.2} fill="none" strokeLinejoin="round" opacity={0.8} /><path d="M -4 62 Q 10 65 24 61" stroke={skd} strokeWidth={1.8} fill="none" opacity={0.6} /></>}
      </>}
      {!I && <path d="M 43 -14 Q 47 4 43 22" stroke={RIM} strokeWidth={2} opacity={0.3} fill="none" />}
      {pz.ter && !p.yuzsuz && [[-16, -40, 1], [24, -44, 0.85], [41, -28, 1.1], [-28, -12, 0.8]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${r})`}>
          <path d="M 0 -6 Q 4.5 1 3.4 4 Q 0 7.5 -3.4 4 Q -4.5 1 0 -6 Z" fill="#e6eef0" stroke={skd} strokeWidth={0.9} opacity={0.9} />
          <circle cx={-1} cy={2} r={1} fill="#ffffff" opacity={0.8} />
        </g>))}
      </g>
      {!pz.yatik && (pz.hat === null || pz.hat === undefined) ? <g transform={`translate(4,${-46 * gy}) scale(${gx},1) rotate(-4)`}><Sapka p={p} tall={louis ? 1.15 : 1} a={aKafa - 4} /></g> : null}
    </g>
  );
};

// golgesiz: yerleşik siyah elips yerine sahne kendi TemasGolgesi'ni çizer (doku sistemi, ışık yönüne göre)
// isik (A5r): sahnenin Isik tanımından türetilen kukla ışığı (RigIsik.kuklaIsigi) — gölge yanı net kenarlı ton + tek yön tarama,
// ışık yanında sıcak kenar, yüzde yumuşak ton, kontur sahne mürekkebine. Verilmezse eski görünüm (geri uyum).
// arka / on (Evliya R7): gövde çerçevesinde (lean dahil, yerel birim) gövdenin ARKASINA / ön kolun ÖNÜNE çizilen ekler (kanat: uzak kanat arkada, yakın kanat ön kolun üstünde)
// arkaUst: arka kolun üstüne, bacak/gövdenin altına (uzak kanat arka eli örter) — yalnız Osmanlı gövdesinde
export const Kukla: React.FC<{ pz: Poz; p: Palet; louis?: boolean; golgesiz?: boolean; isik?: KuklaIsik; arka?: React.ReactNode; arkaUst?: React.ReactNode; on?: React.ReactNode }> = ({ pz, p, louis, golgesiz, isik, arka, arkaUst, on }) => {
  const s = pz.scale ?? 1;
  const f = pz.facing ?? 1;
  return (
    <RigCtx.Provider value={{ I: isik ?? null, f: f < 0 ? -1 : 1, s }}>
      <KuklaGovde pz={pz} p={p} louis={louis} golgesiz={golgesiz} arka={arka} arkaUst={arkaUst} on={on} />
    </RigCtx.Provider>
  );
};

// K3 hasta: ten solar (gri-yeşile kayan açık ton), çıplak el aynı tonla
const karis2 = (a: string, b: string, t: number) => {
  const x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16);
  const c = [16, 8, 0].map((sh) => Math.round(((x >> sh) & 255) * (1 - t) + ((y >> sh) & 255) * t));
  return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
};
export const solgun = (p: Palet, h: number): Palet => {
  if (!h) return p;
  const skin = karis2(p.skin, "#e0dccb", 0.5 * h), skinDark = karis2(p.skinDark, "#9c9086", 0.45 * h);
  return { ...p, skin, skinDark, glove: p.glove === p.skin ? skin : p.glove };
};

// K3 yatık poz: yerel birimde baş merkezi (yastıkta) ve yüz merkezi
const YATIK_BAS: [number, number] = [-250, -80];
export const yatikAci = (pz: Poz) => -90 + (pz.headTilt ?? 0);
export const yuzYerel = (pz: Poz): [number, number] => {
  if (!pz.yatik) return [20, -450];
  const a = (yatikAci(pz) * Math.PI) / 180, dx = 12, dy = 0;
  return [YATIK_BAS[0] + dx * Math.cos(a) - dy * Math.sin(a), YATIK_BAS[1] + dx * Math.sin(a) + dy * Math.cos(a)];
};

const KETEN = "#d6ccb2";
const YatikGovde: React.FC<{ pz: Poz; p: Palet; louis?: boolean }> = ({ pz, p, louis }) => {
  const { I } = useRig(); const ink = useInk(inkTemel);
  const yor = pz.yorgan ?? "#5d6b7a";
  const br = (pz.breathe ?? 0) * 3; // göğüs nefesle iner-kalkar
  const BAS = 0.78 * Math.max(0.3, Math.min(1, pz.yorganKalinlik ?? 1)); // gövde kabartısı basıklığı (sırtüstü yatan beden yüzden yüksek görünmez)
  const sk = (pz.sarkma ?? 90) / BAS;
  const tepe = `M -232 -30 Q -214 ${-80 - br} -150 ${-90 - br} Q -50 ${-98 - br * 0.6} 40 -94 Q 110 -98 170 -78 Q 236 -70 278 -80 Q 314 -86 324 -52 Q 332 -22 336 0`;
  const yorgan = `${tepe} L 336 ${sk} Q 60 ${sk + 14} -232 ${sk} Z`;
  const kol = pz.yatikKol ?? true;
  return (
    <g>
      {/* yastık (keten): baş içine gömülür */}
      <path d="M -352 4 Q -362 -40 -330 -62 Q -250 -76 -172 -60 Q -150 -34 -160 4 Q -256 14 -352 4 Z" fill={KETEN} stroke={ink(KETEN)} strokeWidth={SW} />
      <path d="M -330 -40 Q -300 -30 -282 -46 M -196 -48 Q -186 -30 -176 -34" stroke={ink(KETEN)} strokeWidth={1.4} fill="none" opacity={0.5} />
      <Bolge d="M -352 4 Q -362 -40 -330 -62 Q -250 -76 -172 -60 Q -150 -34 -160 4 Z" k={[-362, -150, -76, 14]} a={0} renk={KETEN} />
      <ellipse cx={-256} cy={8} rx={100} ry={6} fill="#000" opacity={0.28} />
      {/* gecelik yakası (gömlek) — boyun buraya bağlanır */}
      <path d="M -232 -26 Q -232 -64 -200 -78 L -150 -88 L -150 4 L -236 4 Z" fill={p.shirt} stroke={ink(p.shirt)} strokeWidth={1.6} />
      <path d="M -214 -70 L -196 -54 L -186 -76" stroke={ink(p.shirt)} strokeWidth={1.4} fill="none" opacity={0.7} />
      {/* baş: rig kafası −90° (sırtüstü, yüz tavana; headTilt kameraya çevirir), şapka yok */}
      <g transform={`translate(${YATIK_BAS[0]},${YATIK_BAS[1]}) rotate(${yatikAci(pz)}) translate(-8,450)`}>
        <Kafa pz={{ ...pz, headTilt: 0, headY: 0 }} p={p} louis={louis} />
      </g>
      <g transform={`scale(1,${BAS})`}>
      {/* yorgan: gövde kabartısı (göğüs–kalça–diz–ayak) + şiltenin önüne sarkan kenar */}
      <path d={yorgan} fill={yor} stroke={ink(yor)} strokeWidth={SW} strokeLinejoin="round" />
      <path d={`M -232 0 Q 60 8 336 0 L 336 ${sk} Q 60 ${sk + 14} -232 ${sk} Z`} fill={shade(yor, -0.18)} />
      <path d={`M -232 ${sk - 8} Q 60 ${sk + 6} 336 ${sk - 8}`} stroke={shade(yor, 0.2)} strokeWidth={2} fill="none" opacity={0.6} strokeDasharray="10 7" />
      {[[-60, -84, -40, -10], [60, -86, 80, -8], [190, -70, 206, -6]].map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} Q ${a - 6} ${(b + d) / 2} ${c} ${d}`} stroke={shade(yor, -0.35)} strokeWidth={1.6} fill="none" opacity={0.6} />)}
      <Bolge d={yorgan} k={[-232, 336, -100, sk]} a={0} renk={yor} />
      {/* çarşaf kıvrımı (göğüste yorganın üstüne dönen keten şerit) */}
      <path d={`M -168 ${-88 - br} Q -150 ${-94 - br} -128 ${-92 - br} L -126 10 L -166 10 Z`} fill={KETEN} stroke={ink(KETEN)} strokeWidth={1.6} />
      {/* kol yorganın üstünde: gecelik kolu + çıplak el */}
      {kol && <g>
        <path d={`M -190 ${-74 - br} Q -130 ${-104 - br} -64 ${-102 - br * 0.6} L -62 ${-80 - br * 0.6} Q -128 ${-80 - br} -180 ${-56 - br} Z`} fill={p.shirt} stroke={ink(p.shirt)} strokeWidth={1.6} />
        <path d={`M -64 ${-104 - br * 0.6} Q -38 ${-108 - br * 0.5} -26 ${-96 - br * 0.5} Q -28 ${-82 - br * 0.5} -62 ${-80 - br * 0.6} Z`} fill={p.skin} stroke={p.skinDark} strokeWidth={SW} />
        <path d={`M -48 ${-84 - br * 0.5} l 3 5 M -40 ${-86 - br * 0.5} l 3 5 M -32 ${-90 - br * 0.5} l 4 4`} stroke={p.skinDark} strokeWidth={1.3} />
      </g>}
      </g>
      {/* temas gölgesi: yorgan kenarı şilteye */}
      <ellipse cx={52} cy={sk * BAS + 6} rx={292} ry={7} fill="#000" opacity={0.3} />
      {!I && <path d={tepe} transform={`scale(1,${BAS})`} stroke={RIM} strokeWidth={2} opacity={0.25} fill="none" />}
    </g>
  );
};

const GOVDE = "M -56 -378 Q 0 -404 60 -378 Q 62 -328 50 -290 L 42 -226 L -34 -226 L -47 -290 Q -60 -330 -56 -378 Z";

// ===== Evliya R1/R2: Osmanlı gövdesi (entari + önü açık kaftan + kuşak) =====
// Etek iki bacağın uyluk/baldır açısını izler (yürüme + oturma): bel → uyluk önü → diz → baldırda etek ucu; arkada kalça altından sarkar.
// Kumaş boyu sabit (osmanli 190: bileğin ≈20 birim üstü; kisa 128: dizin hemen altı). Oturunca kumaş uyluğun üstünden geçer,
// ucu baldır ortasına iner, arkada oturak kenarından 20–30 birim aşağı dalgalı düşer (katı kalıp değil, yumuşak eğri).
type V2 = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const dondur = (a: number, v: V2): V2 => [v[0] * Math.cos(rad(a)) - v[1] * Math.sin(rad(a)), v[0] * Math.sin(rad(a)) + v[1] * Math.cos(rad(a))];
const top = (a: V2, b: V2, k = 1): V2 => [a[0] + b[0] * k, a[1] + b[1] * k];
// Catmull-Rom → kübik Bézier (kapalı): yumuşak kumaş kenarı
export const yumusakYol = (pts: V2[], kapali = true) => {
  const n = pts.length, P = (i: number) => pts[kapali ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < (kapali ? n : n - 1); i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const c1: V2 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2: V2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return kapali ? d + " Z" : d;
};
const bacakFK = (x: number, thigh: number, knee: number) => {
  const kalca: V2 = [x, -226];
  const diz = top(kalca, dondur(thigh, [0, 104]));
  return { kalca, diz, baldir: dondur(thigh + knee, [0, 1]), nU: dondur(thigh, [1, 0]), nB: dondur(thigh + knee, [1, 0]) };
};
export const etekYol = (pz: Poz, kisa: boolean) => {
  const F = bacakFK(14, pz.thighF, pz.kneeF), B = bacakFK(-10, pz.thighB, pz.kneeB);
  const otur = Math.min(1, Math.abs(Math.sin(rad((pz.thighF + pz.thighB) / 2)))); // 0 ayakta … 1 uyluk yatay
  const L = kisa ? 128 : 190;
  const boy = (b: typeof F) => Math.max(kisa ? 4 : 10, L - Math.hypot(b.diz[0] - b.kalca[0], b.diz[1] + 240) - 34 * otur);
  const uF = top(F.diz, F.baldir, Math.min(99, boy(F))), uB = top(B.diz, B.baldir, Math.min(99, boy(B)));
  const genis = kisa ? 16 : 20;
  const bel: V2[] = [[-50, -244], [46, -244]];
  const onKenar: V2[] = [top(top(F.kalca, F.nU, 24), dondur(pz.thighF, [0, 46])), top(F.diz, F.nU, 22), top(uF, F.nB, genis)];
  const arkaKenar: V2[] = [top(uB, B.nB, -genis), top(B.diz, B.nU, -22), top(B.kalca, B.nU, -26), [-52, -226 + 22 + 26 * otur]];
  return { d: yumusakYol([...bel, ...onKenar, ...arkaKenar]), onKenar, uF, nF: F.nB, nUF: F.nU, otur };
};
const OsmanliEtek: React.FC<{ pz: Poz; p: Palet }> = ({ pz, p }) => {
  const ink = useInk(inkTemel);
  const kisa = p.kostum === "osmanli-kisa";
  const { d, onKenar, nF, nUF } = etekYol(pz, kisa);
  const c = p.coat;
  // entari şeridi (yalnız uzun kostüm): kaftanın açık önünden görünen 40–60 px'lik şerit, ön kenarı izler
  const ent = p.entari ?? shade(c, 0.3);
  const ic: V2[] = [[22, -244], top(onKenar[0], nUF, -26), top(onKenar[1], nUF, -24), top(onKenar[2], nF, -26)];
  const serit = yumusakYol([[46, -244], ...onKenar, ...ic.reverse()]);
  return (
    <g>
      <path d={d} fill={c} stroke={ink(c)} strokeWidth={SW} strokeLinejoin="round" />
      {!kisa && <path d={serit} fill={ent} stroke={ink(c)} strokeWidth={1.6} strokeLinejoin="round" />}
      {/* tek kumaş kıvrımı (yumuşak, katı kalıp değil) */}
      <path d={yumusakYol([[-20, -230], top(onKenar[1], nUF, -60), top(onKenar[2], nF, -54)], false)} stroke={ink(c)} strokeWidth={1.4} fill="none" opacity={0.55} />
      <Bolge d={d} k={[-60, 160, -244, 0]} a={pz.lean ?? 0} renk={c} />
    </g>
  );
};
const OsmanliGovde: React.FC<{ pz: Poz; p: Palet }> = ({ pz, p }) => {
  const { I } = useRig(); const ink = useInk(inkTemel);
  const c = p.coat, kisa = p.kostum === "osmanli-kisa";
  const ent = p.entari ?? shade(c, 0.3), kus = p.kusak ?? shade(c, -0.4);
  const KUSAK = "M -50 -270 Q 2 -280 56 -270 L 50 -228 Q 2 -236 -40 -228 Z";
  return (
    <g>
      <path d={GOVDE} fill={c} stroke={ink(c)} strokeWidth={SW} strokeLinejoin="round" />
      {kisa
        ? <path d="M 12 -398 L 22 -270" stroke={ink(c)} strokeWidth={1.6} opacity={0.7} />
        : <>
          {/* entari önden şerit + kaftanın açık ön kenarları */}
          <path d="M -4 -398 L 30 -398 L 40 -268 L 12 -268 Z" fill={ent} stroke={ink(c)} strokeWidth={1.6} strokeLinejoin="round" />
          <path d="M -4 -398 L 12 -268 M 30 -398 L 40 -268" stroke={p.coatDark} strokeWidth={3} opacity={0.8} />
        </>}
      {/* yuvarlak yaka (kolalı yaka/kravat yok) */}
      <path d="M -10 -401 Q 12 -386 34 -401" stroke={ink(c)} strokeWidth={2} fill="none" />
      <Bolge d={GOVDE} k={[-60, 62, -404, -226]} a={pz.lean ?? 0} renk={c} />
      {/* kuşak: 34 birim, 2 sargı çizgisi */}
      <path d={KUSAK} fill={kus} stroke={ink(kus)} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M -46 -256 Q 2 -264 54 -256 M -44 -242 Q 2 -250 52 -242" stroke={shade(kus, 0.25)} strokeWidth={1.6} fill="none" opacity={0.7} />
      <Bolge d={KUSAK} k={[-50, 56, -280, -228]} a={pz.lean ?? 0} renk={kus} tarama={false} />
      <path d="M -56 -378 Q 0 -404 60 -378" stroke={I ? I.renk : shade(c, 0.3)} strokeWidth={3} fill="none" opacity={0.35} />
    </g>
  );
};
const KuklaGovde: React.FC<{ pz: Poz; p: Palet; louis?: boolean; golgesiz?: boolean; arka?: React.ReactNode; arkaUst?: React.ReactNode; on?: React.ReactNode }> = ({ pz, p, louis, golgesiz, arka, arkaUst, on }) => {
  const { I } = useRig(); const ink = useInk(inkTemel);
  const s = pz.scale ?? 1;
  const f = pz.facing ?? 1;
  if (pz.hasta) p = solgun(p, pz.hasta);
  if (pz.yatik) return <g transform={`translate(${pz.x},${pz.y}) scale(${s * f},${s})`}><YatikGovde pz={pz} p={p} louis={louis} /></g>;
  const br = 1 + (pz.breathe ?? 0) * 0.012;
  const c = p.coat;
  const lean = pz.lean ?? 0;
  const gov = `translate(0,${pz.bodyY ?? 0}) rotate(${lean},0,-226)`;
  // tutulan şapka (pz.hat): el şapka kenarının ÖNÜNDE — şapkadan sonra ön el yeniden çizilir (P04 p150)
  const onKol = (sadeceEl?: boolean) => <Kol x={40 + (pz.sway ?? 0) * 3} sh={pz.shF} el={pz.elF} p={p} a0={lean} sadeceEl={sadeceEl}>
    {!sadeceEl && pz.cane !== null && pz.cane !== undefined && <Baston aci={pz.cane} />}
    {!sadeceEl && pz.bicak !== null && pz.bicak !== undefined && <Bicak aci={pz.bicak - pz.shF - pz.elF} p={p} />}
  </Kol>;
  if (pz.yalnizOnKol) return <g transform={`translate(${pz.x},${pz.y}) scale(${s * f},${s})`}><g transform={gov}>{onKol()}</g></g>;
  if (osm(p)) return (
    <g transform={`translate(${pz.x},${pz.y}) scale(${s * f},${s})`}>
      <g transform={gov}>
        {arka}
        <Kol x={-30 - (pz.sway ?? 0) * 3} sh={pz.shB} el={pz.elB} p={p} arka a0={lean} />
        {arkaUst}
        <Bacak x={-10} thigh={pz.thighB} knee={pz.kneeB} foot={pz.footB ?? 0} p={p} arka a0={lean} />
        <Bacak x={14} thigh={pz.thighF} knee={pz.kneeF} foot={pz.footF ?? 0} p={p} a0={lean} />
        <OsmanliEtek pz={pz} p={p} />
        <g transform={`translate(${(pz.sway ?? 0) * 2},-226) scale(1,${br}) translate(0,226)`}>
          <OsmanliGovde pz={pz} p={p} />
          <Kafa pz={pz} p={p} louis={louis} />
        </g>
        {!pz.onKolYok && onKol()}
        {on}
      </g>
    </g>
  );
  return (
    <g transform={`translate(${pz.x},${pz.y}) scale(${s * f},${s})`}>
      {!golgesiz && <ellipse cx={6} cy={8} rx={96} ry={15} fill="#000" opacity={0.4} />}
      <g transform={gov}>
        <Kol x={-30 - (pz.sway ?? 0) * 3} sh={pz.shB} el={pz.elB} p={p} arka a0={lean}>
          {pz.caneArka !== null && pz.caneArka !== undefined && <g><Baston aci={pz.caneArka} />{/* kavrayan parmaklar bastonun önünde */}<path d="M -11 -4 Q 0 -10 12 -4 M -12 3 Q 0 -3 13 3 M -11 10 Q 0 4 12 10" stroke={p.glove === p.skin ? p.skinDark : ink(p.glove)} strokeWidth={1.6} fill="none" /></g>}
        </Kol>
        <Bacak x={-10} thigh={pz.thighB} knee={pz.kneeB} foot={pz.footB ?? 0} p={p} arka a0={lean} />
        {/* frak etekleri */}
        <g transform={`translate(-6,-236) rotate(${pz.tails ?? 0})`}>
          <path d="M -38 0 Q -48 74 -42 134 Q -30 132 -16 124 L -6 0 Z" fill={p.coatDark} stroke={ink(c)} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M -8 0 L -16 128 Q -2 138 10 134 Q 16 70 14 0 Z" fill={c} stroke={ink(c)} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M -8 10 L -14 120" stroke={ink(c)} strokeWidth={1.4} opacity={0.6} />
          <Bolge d="M -38 0 Q -48 74 -42 134 Q -30 132 -16 124 L -16 128 Q -2 138 10 134 Q 16 70 14 0 Z" k={[-48, 16, 0, 138]} a={lean + (pz.tails ?? 0)} renk={c} />
        </g>
        <Bacak x={14} thigh={pz.thighF} knee={pz.kneeF} foot={pz.footF ?? 0} p={p} a0={lean} />
        {/* gövde */}
        <g transform={`translate(${(pz.sway ?? 0) * 2},-226) scale(1,${br}) translate(0,226)`}>
          <path d={GOVDE} fill={c} stroke={ink(c)} strokeWidth={SW} strokeLinejoin="round" />
          {!I && <path d="M -56 -378 Q -60 -330 -47 -290 L -34 -226 L -16 -226 L -26 -300 Q -36 -342 -30 -390 Z" fill="#000" opacity={0.3} />}
          {!I && <path d="M 36 -380 Q 50 -330 40 -260" stroke={p.coatLight} strokeWidth={8} opacity={0.35} fill="none" strokeLinecap="round" />}
          {/* yelek: desenli */}
          <path d="M -8 -382 L 28 -382 L 36 -228 L -2 -228 Z" fill={p.vest} stroke={ink(p.vest)} strokeWidth={SW} />
          {Array.from({ length: 7 }).map((_, i) => Array.from({ length: 3 }).map((__, j) => <circle key={`${i}-${j}`} cx={2 + j * 11 + i * 0.6} cy={-370 + i * 20} r={1.6} fill={p.vestDesen} opacity={0.55} />))}
          <path d="M 12 -382 L 36 -228 L 24 -228 Z" fill="#000" opacity={I ? 0.15 : 0.25} />
          {[-340, -310, -280, -250].map((yy) => <circle key={yy} cx={14 + (yy + 380) * 0.03} cy={yy} r={3} fill="#d4ad52" stroke="#6a5020" strokeWidth={1} />)}
          {!louis && <path d="M 18 -300 Q 30 -284 38 -294" stroke="#e0bb55" strokeWidth={2.4} fill="none" />}
          {/* frak önü: çift sıra düğme */}
          {[-350, -322, -294].map((yy) => [-24, 48].map((xx) => <circle key={`${xx}${yy}`} cx={xx} cy={yy} r={3.4} fill={shade(c, 0.35)} stroke={ink(c)} strokeWidth={1} />))}
          {/* gömlek, kolalı yaka uçları (1830'lar) */}
          <path d="M -4 -398 L 28 -398 L 20 -364 L 4 -364 Z" fill={p.shirt} stroke={ink(p.shirt)} strokeWidth={1.6} />
          <path d="M -6 -400 L -10 -430 L 6 -404 Z" fill={p.shirt} stroke={ink(p.shirt)} strokeWidth={1.6} />
          <path d="M 26 -400 L 36 -428 L 32 -398 Z" fill={p.shirt} stroke={ink(p.shirt)} strokeWidth={1.6} />
          {/* kravat: dolanmış */}
          <path d="M -6 -400 Q 12 -388 30 -400 L 26 -374 Q 12 -360 0 -374 Z" fill={p.cravat} stroke={ink(p.cravat)} strokeWidth={1.8} />
          <path d="M 4 -384 Q 12 -378 22 -384" stroke={ink(p.cravat)} strokeWidth={1.2} opacity={0.5} fill="none" />
          {/* yakalar (revers) + dik frak yakası */}
          <path d="M -40 -394 Q -20 -410 0 -404 L -6 -390 Q -22 -396 -34 -384 Z" fill={p.coatDark} />
          <path d="M -14 -388 L 0 -330 L -24 -298 L -32 -378 Z" fill={p.coatDark} stroke={ink(c)} strokeWidth={1.8} strokeLinejoin="round" />
          <path d="M 32 -388 L 24 -330 L 46 -304 L 52 -378 Z" fill={p.coatDark} stroke={ink(c)} strokeWidth={1.8} strokeLinejoin="round" />
          <path d="M 32 -388 L 24 -330" stroke={p.coatLight} strokeWidth={2} opacity={I ? 0.35 : 0.6} />
          {/* rig ışığı: gövde (frak + yelek + yaka) gölge yanı tek blok — kumaş her yanda taranmaz */}
          <Bolge d={GOVDE} k={[-60, 62, -404, -226]} a={lean} renk={c} />
          {/* omuz dikişi + kenar ışığı */}
          <path d="M -56 -378 Q 0 -404 60 -378" stroke={I ? I.renk : RIM} strokeWidth={3} fill="none" opacity={I ? 0.35 : 0.6} />
          <path d="M -44 -360 Q -36 -368 -30 -386" stroke={ink(c)} strokeWidth={1.4} fill="none" opacity={0.6} />
          <Kafa pz={pz} p={p} louis={louis} />
        </g>
        {!pz.onKolYok && onKol()}
      </g>
      {pz.hat ? <g transform={`translate(${pz.hat.x},${pz.hat.y}) rotate(${pz.hat.r})`}><Sapka p={p} tall={louis ? 1.15 : 1} a={pz.hat.r} /></g> : null}
      {pz.hat && !pz.onKolYok && (I || pz.elSapkaOnde) ? <g transform={gov}>{onKol(true)}</g> : null}
    </g>
  );
};

// ---- Akıcı yürüme döngüsü ----
// faz (radyan); amt 0..1 (kalkış/duruş yumuşatma)
export const yuru = (phi: number, amt = 1) => {
  const leg = (ph: number) => {
    const thigh = -26 * Math.sin(ph);
    const swing = Math.max(0, Math.cos(ph));
    const knee = 5 + 48 * Math.pow(swing, 1.6);
    // topuk vuruşu (ayak ucu yukarı) → itme (ayak ucu aşağı)
    const foot = 14 * Math.max(0, Math.sin(ph + 0.5)) * (1 - swing) - 22 * Math.max(0, -Math.sin(ph - 0.4)) * (1 - swing * 0.5);
    return { thigh: thigh * amt, knee: knee * amt, foot: foot * amt };
  };
  const F = leg(phi), B = leg(phi + Math.PI);
  return {
    thighF: F.thigh, kneeF: F.knee, footF: F.foot, thighB: B.thigh, kneeB: B.knee, footB: B.foot,
    // kollar bacakların tersine, dirsek gecikmeli
    shF: 20 * Math.sin(phi) * amt, elF: (-12 - 12 * Math.max(0, -Math.sin(phi - 0.5))) * amt,
    shB: -20 * Math.sin(phi) * amt, elB: (-12 - 12 * Math.max(0, Math.sin(phi - 0.5))) * amt,
    bodyY: 8 * (1 - Math.cos(2 * phi)) / 2 * amt,
    headY: 3 * Math.sin(2 * phi - 0.8) * amt, // baş gecikmeli iner-kalkar
    sway: Math.sin(phi) * amt, // kalça-omuz salınımı
    tails: 8 * Math.sin(phi - 1.1) * amt + 4 * amt, // yaylanan etek
    lean: 3.5 * amt,
  };
};

export const visem = (ch: string): Agiz => {
  const c = ch.toLowerCase();
  if ("a".includes(c)) return "A";
  if ("eiı".includes(c)) return "E";
  if ("oöuü".includes(c)) return "O";
  if ("mbp".includes(c)) return "M";
  if ("szşçcj".includes(c)) return "S";
  return "E";
};
