// ===== PARIS-CATI dekor modülleri (mekanlar.md §1.2–§1.8, §9) — Haussmann SONRASI Paris çatısı, 1870 =====
// Kemer yok (düz lento), panjur/fener/yarı ahşap yok, korniş kesintisiz, anıt: yalnız Panthéon kubbesi (kullanıcı kararı tur-3), uzak tek siluet.
// Baca külahı: soluk kirli pişmiş toprak (kullanıcı kararı tur-3), kahverengiye çekik, düşük doygunluk; imza kehribarından ΔE76 ≥ 40.
// Çizim ekran uzayında: katman eşleyicisi T (dolly benzerlik dönüşümü) ya da dünya → ekran (her köşe kendi d'siyle). Kontur/tarama ekran px.
import React from "react";
import { Tarama } from "../../../doku/Tarama";
import { ink, karistir, rnd } from "../../../doku/sabitler";
import type { P } from "../../tipler";
import type { KameraDurum } from "../../zaman";
import { Dolly, dunyaEkran, enYakinZ, Katman } from "./dolly";

export type Saat = "alacakaranlik" | "gun";
export type CatiPalet = {
  gok: [string, string, string]; gokSinir: [number, number]; ufukEgim: number;
  uzakTepe: string; uzakCati: string; ortaCati: string; yakinCati: string; kubbe: string; kubbeG: string;
  tas: string; tasG: string; tarama: string; brisis: string; brisisG: string;
  cinko: string; cinkoG: string; kenet: string; kenetIsik: string; kenetIsikA: number;
  baca: string; bacaG: string; bacaBaslik: string; kulah: string; kulahG: string;
  pencere: string; pencereKaranlik: string; kasa: string; ahsap: string; ahsapG: string; kumesCati: string; aciklik: string;
  siluet: string; siluetKenar: string; kenar: string | null; isikliOran: number;
  isik: [number, number, number]; // TEK IŞIK: dünya yön vektörü (X sağ, h yukarı, Z kameradan ileri), yüzeyin ışığa bakan yanı buradan
};
// Işık vektörleri (mekanlar §0.6; kamera 200°): alacakaranlık parıltısı 243° → 43° sağda, önde, ufukta;
// gün güneşi 135°, 12° → 65° solda, önde. İkisi de kameranın ÖNÜNDE: kameraya bakan ön yüzler (normal −Z) gölgede.
export const ISIK_YON: Record<Saat, [number, number, number]> = {
  alacakaranlik: [0.68, 0.04, 0.73],
  gun: [-0.886, 0.208, 0.413],
};
/** n (dünya normali) ışığa bakıyor mu */
export const isikliYuz = (C: CatiPalet, n: [number, number, number]) => n[0] * C.isik[0] + n[1] * C.isik[1] + n[2] * C.isik[2] > 0;
/** silindir/düşey kenar: ekranda ışıklı yan sağda mı */
export const isikSagMi = (C: CatiPalet) => C.isik[0] > 0;
export const CATI_PALET: Record<Saat, CatiPalet> = {
  alacakaranlik: {
    gok: ["#232840", "#4a4663", "#a58e98"], gokSinir: [330, 600], ufukEgim: 14, // basamak toplam 21 px yükselir (A: 90 px "saçak" okunuyordu)
    uzakTepe: "#6e6680", uzakCati: "#5a5670", ortaCati: "#4a4c5e", yakinCati: "#434558", kubbe: "#7a7088", kubbeG: "#655d76",
    tas: "#a49fa8", tasG: "#6d697d", tarama: "#4a4758", brisis: "#5f6578", brisisG: "#454a5c",
    cinko: "#565a6e", cinkoG: "#3f4356", kenet: "#33374a", kenetIsik: "#c9b3b8", kenetIsikA: 0.45,
    baca: "#a49fa8", bacaG: "#6d697d", bacaBaslik: "#3f4254", kulah: "#6b5856", kulahG: "#4f4347",
    pencere: "#e6d8bd", pencereKaranlik: "#2e2c3e", kasa: "#3a3a4c", ahsap: "#6b6570", ahsapG: "#4b4754", kumesCati: "#454a5c", aciklik: "#1d1b26",
    siluet: "#262434", siluetKenar: "#c9b3b8", kenar: "#c9b3b8", isikliOran: 0.6, isik: ISIK_YON.alacakaranlik,
  },
  gun: {
    gok: ["#8d9aa6", "#aab4bc", "#d4d2c8"], gokSinir: [300, 640], ufukEgim: 0,
    uzakTepe: "#9ea4ac", uzakCati: "#9ea4ac", ortaCati: "#8a919b", yakinCati: "#7f8690", kubbe: "#b4b6b6", kubbeG: "#9a9ea3",
    tas: "#d8cdb4", tasG: "#a89d86", tarama: "#7c7260", brisis: "#737b8a", brisisG: "#59606e",
    cinko: "#8e949c", cinkoG: "#6a707a", kenet: "#565c66", kenetIsik: "#c8ccd0", kenetIsikA: 0.5,
    baca: "#c8bfa9", bacaG: "#968c78", bacaBaslik: "#5f6168", kulah: "#8e7366", kulahG: "#6b5751",
    pencere: "#6f7f8c", pencereKaranlik: "#6f7f8c", kasa: "#3a3a4c", ahsap: "#7a7468", ahsapG: "#4f4a42", kumesCati: "#59606e", aciklik: "#2a2722",
    siluet: "#3a3632", siluetKenar: "#efe6cc", kenar: null, isikliOran: 0, isik: ISIK_YON.gun,
  },
};
const pl = (pts: P[]) => pts.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
const R4 = (T: (q: P) => P, x: number, y: number, w: number, h: number): P[] => [T([x, y]), T([x + w, y]), T([x + w, y + h]), T([x, y + h])];

// ---- 0 Gök: 3 düz basamak (gradyan yok), ufuk basamağı sağa doğru yükselir (parıltı batıda, sağ-önde) ----
export const Gok: React.FC<{ P: CatiPalet; k: KameraDurum }> = ({ P: C, k }) => {
  const [a, b] = C.gokSinir, e = C.ufukEgim;
  const X0 = -2000, X1 = 3000;
  return (
    <g transform={`translate(${k.cx} ${k.cy})`}>
      <rect x={X0} y={-3000} width={X1 - X0} height={6000} fill={C.gok[0]} />
      <polygon points={pl([[X0, a], [X1, a], [X1, 4000], [X0, 4000]])} fill={C.gok[1]} />
      <polygon points={pl([[X0, b + e * 0.5], [-100, b + e * 0.5], [1180, b - e], [X1, b - e], [X1, 4000], [X0, 4000]])} fill={C.gok[2]} />
    </g>
  );
};

// ---- 1 Uzak tepe (GB sırtları, nötr tek siluet) ----
export const UzakTepe: React.FC<{ P: CatiPalet; L: Katman; ufuk: number }> = ({ P: C, L, ufuk }) => {
  const pts: P[] = [[-1600, ufuk + 6]];
  for (let x = -1600; x <= 2800; x += 40) pts.push([x, ufuk - 6 - 30 * (0.5 + 0.5 * Math.sin(x / 260 + 0.6)) * (0.6 + 0.4 * Math.sin(x / 610))]);
  pts.push([2800, ufuk + 6]);
  return <polygon points={pl(pts.map(L.T))} fill={C.uzakTepe} />;
};

// ---- Panthéon (kullanıcı kararı tur-3): uzak tek siluet, taş, nötr; kaide gövdesi uzak çatıların arkasında kalır ----
// Ölçü (≈1.5 km, 0.88 px/m stilize): gövde 100 px · kolonlu tambur 40 · attik · kubbe · fener. Haç/yaldız yok.
export const Pantheon: React.FC<{ P: CatiPalet; L: Katman; x: number; taban: number }> = ({ P: C, L, x, taban }) => {
  const T = L.T, sx = (v: number) => x + v;
  const govde = R4(T, sx(-50), taban - 30, 100, 40);
  const portik: P[] = [T([sx(-30), taban - 30]), T([sx(0), taban - 40]), T([sx(30), taban - 30])];
  const tambur = R4(T, sx(-21), taban - 52, 42, 22);
  const attik = R4(T, sx(-18), taban - 57, 36, 5);
  const kubbe = `M ${T([sx(-17), taban - 57]).join(" ")} Q ${T([sx(-16), taban - 75]).join(" ")} ${T([sx(0), taban - 75]).join(" ")} Q ${T([sx(16), taban - 75]).join(" ")} ${T([sx(17), taban - 57]).join(" ")} Z`;
  const fener = R4(T, sx(-2.6), taban - 82, 5.2, 8);
  const kol = [-15, -9, -3, 3, 9, 15].map((v) => [T([sx(v), taban - 50]), T([sx(v), taban - 33])] as [P, P]);
  return (
    <g>
      <polygon points={pl(govde)} fill={C.kubbe} />
      <polygon points={pl(portik)} fill={C.kubbe} />
      <polygon points={pl(tambur)} fill={C.kubbe} />
      {kol.map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.kubbeG} strokeWidth={Math.max(1.6, 1.6 * L.s)} />)}
      <polygon points={pl(attik)} fill={C.kubbeG} />
      <path d={kubbe} fill={C.kubbe} />
      {/* kubbe gölge yanı: ışığın (C.isik) ters yarısı bir ton koyu, net sınır */}
      {(() => { const g = isikSagMi(C) ? -1 : 1; return <path d={`M ${T([sx(17 * g), taban - 57]).join(" ")} Q ${T([sx(16 * g), taban - 75]).join(" ")} ${T([sx(0), taban - 75]).join(" ")} L ${T([sx(3 * g), taban - 57]).join(" ")} Z`} fill={C.kubbeG} />; })()}
      <polygon points={pl(fener)} fill={C.kubbe} />
    </g>
  );
};

// ---- 2–4 Çatı denizi: teras çizgisi + baca tarağı (düz ton; yakın satırda külahlar ayrı, sağ kenar ışığı) ----
export const CatiDenizi: React.FC<{ L: Katman; teras: number; tarak: [number, number]; aralik: [number, number]; renk: string; seed: number; kulahli?: boolean; kenar?: string | null; dolguAlt?: number }> = ({ L, teras, tarak, aralik, renk, seed, kulahli, kenar, dolguAlt = 1200 }) => {
  const T = L.T, parcalar: React.ReactNode[] = [];
  const poly: P[] = [[-1800, dolguAlt], [-1800, teras]];
  let x = -1800, i = 0;
  while (x < 3000 && i < 200) {
    const g = 14 + rnd(seed, `g${i}`) * 14, h = tarak[0] + rnd(seed, `h${i}`) * (tarak[1] - tarak[0]);
    const x0 = x + rnd(seed, `o${i}`) * 30;
    // hafif teras basamağı (bitişik bina farkı, ≤ 3 px)
    const ty = teras - Math.round(rnd(seed, `t${i}`) * 3);
    poly.push([x0 - 30, ty], [x0, ty], [x0, ty - h], [x0 + g, ty - h], [x0 + g, ty]);
    if (kulahli) for (let j = 0; j < 3 + Math.floor(rnd(seed, `n${i}`) * 4); j++) parcalar.push(<rect key={`${i}-${j}`} x={T([x0 + 2 + j * 4.2, 0])[0]} y={T([0, ty - h - 4])[1]} width={2.6 * L.s} height={4 * L.s} fill={renk} />);
    if (kenar) parcalar.push(<line key={`k${i}`} x1={T([x0 + g, 0])[0]} y1={T([0, ty - h])[1]} x2={T([x0 + g, 0])[0]} y2={T([0, ty])[1]} stroke={kenar} strokeWidth={2} opacity={0.7} />);
    x = x0 + g + aralik[0] + rnd(seed, `a${i}`) * (aralik[1] - aralik[0]);
    i++;
  }
  poly.push([3000, teras], [3000, dolguAlt]);
  return <g><polygon points={pl(poly.map(T))} fill={renk} />{parcalar}</g>;
};

// ---- Baca külahı (mitron): silindir + üst elips; pişmiş toprak. Işık/gölge yanı TEK ışık vektöründen (C.isik), her külahta aynı ----
const Kulah: React.FC<{ x: number; y: number; w: number; h: number; C: CatiPalet }> = ({ x, y, w, h, C }) => {
  const sag = isikSagMi(C), kw = Math.max(1, Math.min(2.5, w * 0.08));
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={C.kulah} />
      <rect x={sag ? x : x + w * 0.55} y={y} width={w * 0.45} height={h} fill={C.kulahG} />
      <ellipse cx={x + w / 2} cy={y} rx={w / 2} ry={Math.max(1, w * 0.18)} fill={karistir(C.kulah, "#1d1b26", 0.55)} />
      <path d={`M ${x} ${y} L ${x} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y}`} fill="none" stroke={ink(C.kulah)} strokeWidth={kw} />
      {/* kenar ışığı (alacakaranlık): ışık yanındaki dış kenar */}
      {C.kenar && w > 3 && <line x1={sag ? x + w - kw : x + kw} y1={y + Math.max(1, w * 0.12)} x2={sag ? x + w - kw : x + kw} y2={y + h} stroke={C.kenar} strokeWidth={Math.max(1.5, Math.min(3, w * 0.07))} opacity={0.85} />}
    </g>
  );
};

// ---- 5 Karşı Haussmann sırası (d 8.7): teras şeridi, brisis + lucarne sırası, korniş + gölge bandı, 5. kat pencere üstleri, baca kümeleri ----
export type Bina = { x0: number; x1: number; aks: number; ofset: number };
export type SiraSatir = { kulahUst: number; bacaUst: number; teras: number; lucarneUst: number; lucarneEsik: number; kornis: number; pencereUst: number; alt: number };
export const KARSI_SATIR: SiraSatir = { kulahUst: 678, bacaUst: 698, teras: 759, lucarneUst: 831, lucarneEsik: 902, kornis: 933, pencereUst: 974, alt: 1020 };
export const KARSI_BINALAR: Bina[] = [
  { x0: -640, x1: 250, aks: 153, ofset: 220 },
  { x0: 250, x1: 1050, aks: 163, ofset: 760 },
  { x0: 1050, x1: 1720, aks: 148, ofset: 1124 },
  { x0: 1720, x1: 2400, aks: 158, ofset: 1800 },
];
export const lucarneAkslari = (b: Bina) => { const a: number[] = []; let x = b.ofset; while (x - b.aks > b.x0 + 40) x -= b.aks; for (; x < b.x1 - 40; x += b.aks) a.push(x); return a; };

export const KarsiSira: React.FC<{ C: CatiPalet; L: Katman; seed: number; saat: Saat; isikliZorunlu: number[]; taramaAci: number; ekBaca?: number[]; cocuk?: React.ReactNode }> = ({ C, L, seed, saat, isikliZorunlu, taramaAci, ekBaca = [], cocuk }) => {
  const T = L.T, s = L.s, S = KARSI_SATIR, pxm = 51 * s;
  const lw = 0.9 * pxm, lh = S.lucarneEsik - S.lucarneUst;
  const govde: React.ReactNode[] = [], on: React.ReactNode[] = [];
  const kw = Math.max(1.5, Math.min(4, 1.6 * s));
  KARSI_BINALAR.forEach((b, bi) => {
    // teras şeridi + brisis + cephe
    govde.push(<polygon key={`t${bi}`} points={pl(R4(T, b.x0, S.teras - 9, b.x1 - b.x0, 9))} fill={C.cinko} />);
    govde.push(<polygon key={`b${bi}`} points={pl(R4(T, b.x0, S.teras, b.x1 - b.x0, S.kornis - S.teras))} fill={C.brisis} />);
    // arduvaz (mekanlar §1.7): ince sıra çizgisi her 13 px (dekor), tahta kaplama gibi kalın değil; 360 px'te doku, çizgi değil
    const arduvazRenk = karistir(C.brisis, C.brisisG, 0.75);
    for (let y = S.teras + 13; y < S.kornis - 12; y += 13) govde.push(<line key={`a${bi}-${y}`} x1={T([b.x0, y])[0]} y1={T([0, y])[1]} x2={T([b.x1, y])[0]} y2={T([0, y])[1]} stroke={arduvazRenk} strokeWidth={Math.max(1, 0.9 * s)} opacity={0.8} />);
    // kırık çizgisi (brisis ↔ teras): yuvarlak çinko kenar, ışık alır
    govde.push(<polygon key={`kr${bi}`} points={pl(R4(T, b.x0, S.teras - 1, b.x1 - b.x0, 4))} fill={karistir(C.cinko, C.kenar ?? "#e8e6e0", 0.35)} />);
    // dere (chéneau): brisis dibinde, korniş üstünde çinko şerit
    govde.push(<polygon key={`ch${bi}`} points={pl(R4(T, b.x0, S.kornis - 12, b.x1 - b.x0, 6))} fill={karistir(C.cinko, C.kenar ?? "#e8e6e0", 0.15)} />);
    // lucarne'lar
    lucarneAkslari(b).forEach((ax, li) => {
      const isikli = saat === "alacakaranlik" && (isikliZorunlu.some((q) => Math.abs(q - ax) < 2) || rnd(seed, `l${bi}-${li}`) < C.isikliOran);
      const x = ax - lw / 2 / s, w = lw / s;
      // lucarne (mekanlar §1.2/§1.4): taş çerçeve + iki yanak (jouée, brisis eğimi yüzünden üstte geniş) + kendi beşik çatısı.
      // Işık yanı C.isik'ten: ışığa bakan yanak/çatı yarısı açık, öteki koyu (gün: II tarama).
      const sagIsik = isikSagMi(C), cer = 5, ust = S.lucarneUst, esik = S.lucarneEsik;
      const yanakIsik = karistir(C.brisis, C.kenar ?? "#e8e6e0", 0.3), yanakGolge = karistir(C.brisisG, "#1d1b26", 0.15);
      const yanakSol: P[] = [T([x - cer - 9, ust]), T([x - cer, ust]), T([x - cer, esik]), T([x - cer - 2, esik])];
      const yanakSag: P[] = [T([x + w + cer, ust]), T([x + w + cer + 9, ust]), T([x + w + cer + 2, esik]), T([x + w + cer, esik])];
      const [yI, yG] = sagIsik ? [yanakSag, yanakSol] : [yanakSol, yanakSag];
      govde.push(<polygon key={`yi${bi}-${li}`} points={pl(yI)} fill={yanakIsik} stroke={ink(C.brisis)} strokeWidth={kw * 0.7} />);
      govde.push(<polygon key={`yg${bi}-${li}`} points={pl(yG)} fill={yanakGolge} stroke={ink(C.brisis)} strokeWidth={kw * 0.7} />);
      if (saat === "gun") govde.push(<Tarama key={`lt${bi}-${li}`} sekil={yG} basamak="II" aci={taramaAci} renk={C.tarama} derinlik="orta" seed={seed + li} />);
      // taş çerçeve (ön yüz) + eşik
      govde.push(<polygon key={`ly${bi}-${li}`} points={pl(R4(T, x - cer, ust, w + 2 * cer, esik - ust))} fill={C.tas} stroke={ink(C.tas)} strokeWidth={kw} />);
      govde.push(<polygon key={`le${bi}-${li}`} points={pl(R4(T, x - cer - 3, esik - 1, w + 2 * cer + 6, 4))} fill={C.tas} stroke={ink(C.tas)} strokeWidth={kw * 0.7} />);
      // beşik çatı: iki yarı (ışık/gölge), saçak çerçeveden 4 px taşar, mahya 20 px
      const sacL: P = T([x - cer - 13, ust + 1]), sacR: P = T([x + w + cer + 13, ust + 1]), mahya: P = T([ax, ust - 20]), orta: P = T([ax, ust + 1]);
      const yarim = (sagYari: boolean) => (sagYari ? [orta, mahya, sacR] : [sacL, mahya, orta]);
      govde.push(<polygon key={`rc${bi}-${li}`} points={pl(yarim(sagIsik))} fill={karistir(C.brisis, C.kenar ?? "#e8e6e0", 0.18)} />);
      govde.push(<polygon key={`rg${bi}-${li}`} points={pl(yarim(!sagIsik))} fill={karistir(C.brisisG, "#1d1b26", 0.3)} />);
      govde.push(<polygon key={`ro${bi}-${li}`} points={pl([sacL, mahya, sacR])} fill="none" stroke={ink(C.brisis)} strokeWidth={kw} strokeLinejoin="round" />);
      if (C.kenar) govde.push(<line key={`rk${bi}-${li}`} x1={mahya[0]} y1={mahya[1]} x2={(sagIsik ? sacR : sacL)[0]} y2={(sagIsik ? sacR : sacL)[1]} stroke={C.kenar} strokeWidth={2} />);
      // saçak altı gölgesi (çatının çerçeveye düşen gölgesi, net kenar)
      govde.push(<polygon key={`rs${bi}-${li}`} points={pl(R4(T, x - cer, ust + 1, w + 2 * cer, 4))} fill={C.tasG} />);
      govde.push(<polygon key={`lp${bi}-${li}`} points={pl(R4(T, x, S.lucarneUst + 5, w, lh - 7))} fill={isikli ? C.pencere : C.pencereKaranlik} />);
      if (isikli) on.push(<ellipse key={`h${bi}-${li}`} cx={T([ax, 0])[0]} cy={T([0, S.lucarneEsik + 0.18 * lh * 0.6])[1]} rx={0.7 * lw} ry={0.18 * lh * s} fill={C.pencere} opacity={0.18} />);
      on.push(<g key={`lk${bi}-${li}`}><line x1={T([ax, 0])[0]} y1={T([0, S.lucarneUst + 5])[1]} x2={T([ax, 0])[0]} y2={T([0, S.lucarneEsik - 2])[1]} stroke={C.kasa} strokeWidth={Math.max(1.6, 1.4 * s)} /><line x1={T([x, 0])[0]} y1={T([0, S.lucarneUst + 26])[1]} x2={T([x + w, 0])[0]} y2={T([0, S.lucarneUst + 26])[1]} stroke={C.kasa} strokeWidth={Math.max(1.6, 1.4 * s)} /></g>);
      // 5. kat penceresi (yalnız üstü görünür)
      govde.push(<polygon key={`w${bi}-${li}`} points={pl(R4(T, ax - 28, S.pencereUst, 56, S.alt - S.pencereUst))} fill={isikli && rnd(seed, `w${bi}-${li}`) < 0.5 ? C.pencere : C.pencereKaranlik} stroke={C.kasa} strokeWidth={kw} />);
    });
    // korniş (mekanlar §1.2: 0.6 m taşma, 0.5 m boy): ışık alan üst profil + koyu profil çizgisi + altında 26 px GÖLGE BANDI
    // (alacakaranlık: taşın gölgesinden belirgin koyu; gün: tasG + II tarama). Bant brisisten ayrışmalı (A: aynı tondaydı).
    const band = R4(T, b.x0, S.kornis + 4, b.x1 - b.x0, 26);
    govde.push(<polygon key={`kb${bi}`} points={pl(band)} fill={saat === "gun" ? C.tasG : karistir(C.tasG, "#1d1b26", 0.35)} />);
    if (saat === "gun") govde.push(<Tarama key={`kt${bi}`} sekil={band} basamak="II" aci={taramaAci} renk={C.tarama} derinlik="orta" seed={seed + 50 + bi} />);
    govde.push(<polygon key={`kl${bi}`} points={pl(R4(T, b.x0, S.kornis - 6, b.x1 - b.x0, 10))} fill={C.tas} stroke={ink(C.tas)} strokeWidth={kw * 0.8} />);
    govde.push(<line key={`kp${bi}`} x1={T([b.x0, 0])[0]} y1={T([0, S.kornis + 4])[1]} x2={T([b.x1, 0])[0]} y2={T([0, S.kornis + 4])[1]} stroke={ink(C.tas)} strokeWidth={Math.max(2, 1.6 * s)} />);
    if (C.kenar) govde.push(<line key={`kk${bi}`} x1={T([b.x0, 0])[0]} y1={T([0, S.kornis - 5])[1]} x2={T([b.x1, 0])[0]} y2={T([0, S.kornis - 5])[1]} stroke={C.kenar} strokeWidth={2} opacity={0.8} />);
  });
  // baca kümeleri: bitişik bina duvarları üstünde (+ ek)
  const bacalar = [...KARSI_BINALAR.map((b) => b.x0), KARSI_BINALAR[KARSI_BINALAR.length - 1].x1, ...ekBaca];
  bacalar.forEach((bx, i) => {
    const w = 41, x = bx - w / 2;
    // ön yüz (normal −Z) ve ışık yanındaki yan yüz (normal ±X) — renk C.isik'ten (tek ışık)
    const sag = isikSagMi(C), yanW = w * 0.24;
    govde.push(<polygon key={`bg${i}`} points={pl(R4(T, x, S.bacaUst, w, S.teras - S.bacaUst + 2))} fill={isikliYuz(C, [0, 0, -1]) ? C.baca : C.bacaG} stroke={ink(C.baca)} strokeWidth={kw} />);
    govde.push(<polygon key={`bs${i}`} points={pl(R4(T, sag ? x + w - yanW : x, S.bacaUst, yanW, S.teras - S.bacaUst))} fill={isikliYuz(C, [sag ? 1 : -1, 0, 0]) ? C.baca : C.bacaG} />);
    if (C.kenar) govde.push(<line key={`bk${i}`} x1={T([sag ? x + w : x, 0])[0]} y1={T([0, S.bacaUst])[1]} x2={T([sag ? x + w : x, 0])[0]} y2={T([0, S.teras])[1]} stroke={C.kenar} strokeWidth={2} />);
    govde.push(<polygon key={`bb${i}`} points={pl(R4(T, x - 2, S.bacaUst - 4, w + 4, 5))} fill={C.bacaBaslik} />);
    const n = 6 + Math.floor(rnd(seed, `bn${i}`) * 4), kw2 = (w - 4) / n;
    for (let j = 0; j < n; j++) {
      const kx = x + 2 + j * kw2, kh = 16 + rnd(seed, `kh${i}-${j}`) * 6;
      govde.push(<Kulah key={`ku${i}-${j}`} x={T([kx, 0])[0]} y={T([0, S.bacaUst - 4 - kh])[1]} w={kw2 * 0.82 * s} h={kh * s} C={C} />);
    }
  });
  return <g>{govde}{on}{cocuk}</g>;
};

// ---- Dünya modelli baca kümesi (kendi binamız / ön plan): ön yüz + kameraya bakan yan yüz + başlık + külahlar ----
export type BacaDunya = { X0: number; X1: number; Z: number; derin: number; hAlt: number; hGovde: number; baslik: number; kulahSayi: number; kulahCap: number; kulahBoy: number };
export const BacaKumesiDunya: React.FC<{ D: Dolly; k: KameraDurum; b: BacaDunya; C: CatiPalet; seed: number }> = ({ D, k, b, C, seed }) => {
  const E = (X: number, h: number, Z: number) => dunyaEkran(D, k, X, h, Z);
  const on = [E(b.X0, b.hGovde, b.Z), E(b.X1, b.hGovde, b.Z), E(b.X1, b.hAlt, b.Z), E(b.X0, b.hAlt, b.Z)];
  if (on.some((q) => !q)) return null;
  const O = on as P[];
  const yanX = 0 > b.X1 ? b.X1 : 0 < b.X0 ? b.X0 : null; // kameranın gördüğü yan yüz
  const yan = yanX !== null ? [E(yanX, b.hGovde, b.Z), E(yanX, b.hGovde, b.Z + b.derin), E(yanX, b.hAlt, b.Z + b.derin), E(yanX, b.hAlt, b.Z)] as P[] : null;
  const pxm = Math.abs(O[1][0] - O[0][0]) / (b.X1 - b.X0);
  const bas = [E(b.X0 - 0.04, b.hGovde + b.baslik, b.Z - 0.04), E(b.X1 + 0.04, b.hGovde + b.baslik, b.Z - 0.04), E(b.X1 + 0.04, b.hGovde, b.Z - 0.04), E(b.X0 - 0.04, b.hGovde, b.Z - 0.04)] as P[];
  const kw = Math.max(2, Math.min(6, pxm * 0.012));
  const kulahlar: React.ReactNode[] = [];
  for (let j = 0; j < b.kulahSayi; j++) {
    const X = b.X0 + ((j + 0.5) * (b.X1 - b.X0)) / b.kulahSayi - b.kulahCap / 2;
    const ust = E(X, b.hGovde + b.baslik + b.kulahBoy * (0.92 + 0.16 * rnd(seed, `k${j}`)), b.Z + 0.1);
    const alt = E(X, b.hGovde + b.baslik, b.Z + 0.1);
    if (!ust || !alt) continue;
    kulahlar.push(<Kulah key={j} x={ust[0]} y={ust[1]} w={b.kulahCap * pxm} h={alt[1] - ust[1]} C={C} />);
  }
  // yüz renkleri tek ışık vektöründen: ön yüz normali −Z, görünen yan yüz normali ±X
  const yanNormal: [number, number, number] = [yanX === b.X1 ? 1 : -1, 0, 0];
  const onIsikli = isikliYuz(C, [0, 0, -1]), yanIsikli = yan ? isikliYuz(C, yanNormal) : false;
  // kenar ışığı: silüetin ışık yanındaki düşey kenarı (yan yüz o taraftaysa onun dış kenarı)
  const sag = isikSagMi(C);
  const kenarCizgi: [P, P] = yan && (yanX === b.X1) === sag ? [yan[1], yan[2]] : sag ? [O[1], O[2]] : [O[0], O[3]];
  // terasa basan küme (hAlt 0): tabanda koyu temas bandı (zemin teması)
  const temas = b.hAlt >= 0 ? [E(b.X0 - 0.03, 0, b.Z - 0.02), E(b.X1 + 0.03, 0, b.Z - 0.02), E(b.X1 + 0.03, 0, b.Z + b.derin), E(b.X0 - 0.03, 0, b.Z + b.derin)] : null;
  return (
    <g>
      {temas && temas.every((q) => q) && <polygon points={pl(temas as P[])} fill="#14120f" opacity={0.5} />}
      {yan && <polygon points={pl(yan)} fill={yanIsikli ? C.baca : C.bacaG} stroke={ink(C.bacaG)} strokeWidth={kw} />}
      <polygon points={pl(O)} fill={onIsikli ? C.baca : C.bacaG} stroke={ink(C.baca)} strokeWidth={kw} />
      {C.kenar && <line x1={kenarCizgi[0][0]} y1={kenarCizgi[0][1]} x2={kenarCizgi[1][0]} y2={kenarCizgi[1][1]} stroke={C.kenar} strokeWidth={2.5} />}
      <polygon points={pl(bas)} fill={C.bacaBaslik} stroke={ink(C.bacaBaslik)} strokeWidth={kw} />
      {kulahlar}
    </g>
  );
};

// ---- 9 Çinko teras (ön zemin): dünya çokgeni, kenetler VP'ye yakınsar (ışık kenarı + gölge kenarı çifti), uzak kenarda kırık çizgi ----
export const CinkoTeras: React.FC<{ D: Dolly; k: KameraDurum; C: CatiPalet; Zuzak: number; isikSag: boolean; golgeler?: React.ReactNode }> = ({ D, k, C, Zuzak, isikSag, golgeler }) => {
  const Zn = Math.max(enYakinZ(D, k), 0.45);
  const E = (X: number, Z: number) => dunyaEkran(D, k, X, 0, Z) as P;
  const zemin = [E(-30, Zuzak), E(30, Zuzak), E(30, Zn), E(-30, Zn)];
  const kenetler: React.ReactNode[] = [];
  for (let i = -30; i <= 30; i++) {
    const X = 0.13 + i * 0.6;
    const g = [E(X - 0.018, Zuzak), E(X + 0.018, Zuzak), E(X + 0.018, Zn), E(X - 0.018, Zn)];
    const ix = isikSag ? X + 0.018 : X - 0.03;
    const s = [E(ix, Zuzak), E(ix + 0.012, Zuzak), E(ix + 0.012, Zn), E(ix, Zn)];
    kenetler.push(<g key={i}><polygon points={pl(g)} fill={C.kenet} /><polygon points={pl(s)} fill={C.kenetIsik} opacity={C.kenetIsikA} /></g>);
  }
  // enine kenet (panel uçları, ~2.1 m arayla) + panel başına ±3% ton (düz, bant yok)
  const paneller: React.ReactNode[] = [];
  for (let i = -30; i < 30; i++) {
    if (rnd(151, `p${i}`) < 0.5) continue;
    const X = 0.13 + i * 0.6, ac = rnd(151, `q${i}`) > 0.5;
    paneller.push(<polygon key={`p${i}`} points={pl([E(X, Zuzak), E(X + 0.6, Zuzak), E(X + 0.6, Zn), E(X, Zn)])} fill={ac ? "#e8e6e0" : "#14120f"} opacity={0.035} />);
  }
  for (let Z = Zuzak - 0.4; Z > Zn; Z -= 2.1) {
    const a = E(-30, Z), b = E(30, Z), c = E(30, Z - 0.03), d2 = E(-30, Z - 0.03);
    kenetler.push(<polygon key={`e${Z.toFixed(2)}`} points={pl([a, b, c, d2])} fill={C.kenet} opacity={0.75} />);
  }
  const ky = E(0, Zuzak)[1];
  return (
    <g>
      <polygon points={pl(zemin)} fill={C.cinko} />
      {paneller}
      {kenetler}
      {golgeler}
      {/* kendi kırık çizgimiz: düz çinko kenar, 6 px açık + 4 px koyu */}
      <rect x={-3000} y={ky - 6} width={7000} height={6} fill={C.kenar ? karistir(C.cinko, C.kenar, 0.45) : karistir(C.cinko, "#e8e6e0", 0.3)} />
      <rect x={-3000} y={ky} width={7000} height={4} fill={C.cinkoG} />
    </g>
  );
};

// ---- 8 KÜMES (tasarim §4.4, mekanlar §1.4 #8): kümes ön yüzü d=1 düzleminde (kart). Dekor px (cs 1) ----
export const KUMES = { x0: 142, x1: 673, taban: 1181, onSacak: 783, arkaSacak: 722, tahta: 53, inisUst: 972, inisOn: 992, inisX: [286, 612] as [number, number], aciklik: [330, 430, 530], aciklikY: [896, 966] as [number, number], aw: 53, kapak: [590, 846, 64, 104] as [number, number, number, number] };
export const Kumes: React.FC<{ C: CatiPalet; L: Katman; seed: number; taramaAci: number; saat: Saat; damar: boolean }> = ({ C, L, seed, taramaAci, saat, damar }) => {
  const T = L.T, s = L.s, K = KUMES;
  const kw = Math.max(2.5, Math.min(6, 1.2 * s + 1.5)), ince = Math.max(1.6, Math.min(4, 0.6 * s + 1));
  const golgeRenk = ink(C.ahsap);
  // çatı şeridi (göz ön saçağın 0.1 m üstünde: ince yüzey görünür; arka saçak Z 3.8 → dar)
  const arkaX = (x: number) => 540 + ((x - 540) * 3) / 3.8;
  const cati: P[] = [T([arkaX(K.x0 - 10), K.arkaSacak]), T([arkaX(K.x1 + 10), K.arkaSacak]), T([K.x1 + 12, K.onSacak]), T([K.x0 - 12, K.onSacak])];
  const sacakAlin = R4(T, K.x0 - 12, K.onSacak, K.x1 - K.x0 + 24, 12);
  const yuz = R4(T, K.x0, K.onSacak + 12, K.x1 - K.x0, K.taban - K.onSacak - 12);
  const sacakAlti = R4(T, K.x0, K.onSacak + 12, K.x1 - K.x0, 22);
  const tahtalar: React.ReactNode[] = [];
  for (let x = K.x0, i = 0; x < K.x1; x += K.tahta, i++) {
    const w = Math.min(K.tahta, K.x1 - x);
    const ton = karistir(C.ahsap, rnd(seed, `t${i}`) > 0.5 ? "#e9e4da" : "#1d1b26", 0.04 + rnd(seed, `u${i}`) * 0.05);
    tahtalar.push(<polygon key={`t${i}`} points={pl(R4(T, x, K.onSacak + 12, w, K.taban - K.onSacak - 12))} fill={ton} />);
    if (i > 0) tahtalar.push(<line key={`d${i}`} x1={T([x, 0])[0]} y1={T([0, K.onSacak + 12])[1]} x2={T([x, 0])[0]} y2={T([0, K.taban])[1]} stroke={golgeRenk} strokeWidth={ince} />);
    if (damar) for (let j = 0; j < 2; j++) {
      const dx = x + w * (0.3 + 0.4 * rnd(seed, `dx${i}-${j}`)), y0 = K.onSacak + 40 + rnd(seed, `dy${i}-${j}`) * 200;
      tahtalar.push(<path key={`g${i}-${j}`} d={`M ${T([dx, y0]).join(" ")} Q ${T([dx + 3, y0 + 60]).join(" ")} ${T([dx - 1, y0 + 140]).join(" ")}`} stroke={golgeRenk} strokeWidth={2} opacity={0.25} fill="none" />);
    }
  }
  const aciklik = K.aciklik.map((ax, i) => {
    const r = R4(T, ax - K.aw / 2, K.aciklikY[0], K.aw, K.aciklikY[1] - K.aciklikY[0]);
    return <g key={`a${i}`}><polygon points={pl(r)} fill={C.aciklik} stroke={golgeRenk} strokeWidth={kw} /><Tarama sekil={r} basamak="IV" aci={taramaAci} renk="#0f0e14" derinlik={s > 4 ? "yakin" : "orta"} seed={seed + 20 + i} /></g>;
  });
  const inisUst: P[] = [T([K.inisX[0], K.inisUst]), T([K.inisX[1], K.inisUst]), T([K.inisX[1] + 6, K.inisOn]), T([K.inisX[0] - 6, K.inisOn])];
  const inisOn = R4(T, K.inisX[0] - 6, K.inisOn, K.inisX[1] - K.inisX[0] + 12, 10);
  const inisAlt: P[] = [T([K.inisX[0] - 6, K.inisOn + 10]), T([K.inisX[1] + 6, K.inisOn + 10]), T([K.inisX[1], K.inisOn + 26]), T([K.inisX[0], K.inisOn + 26])];
  const [kx, ky, kwid, kh] = K.kapak;
  return (
    <g>
      <polygon points={pl(cati)} fill={C.kumesCati} stroke={ink(C.kumesCati)} strokeWidth={kw} />
      {C.kenar && <line x1={cati[0][0]} y1={cati[0][1]} x2={cati[1][0]} y2={cati[1][1]} stroke={C.kenar} strokeWidth={2.5} />}
      <polygon points={pl(yuz)} fill={C.ahsap} />
      {tahtalar}
      {/* saçak altı: III (gün tarama, alacakaranlık koyu ton) */}
      <polygon points={pl(sacakAlti)} fill={C.ahsapG} />
      {saat === "gun" && <Tarama sekil={sacakAlti} basamak="III" aci={taramaAci} renk={golgeRenk} derinlik={s > 4 ? "yakin" : "orta"} seed={seed + 3} />}
      <polygon points={pl(sacakAlin)} fill={C.kumesCati} stroke={ink(C.kumesCati)} strokeWidth={kw} />
      {aciklik}
      {/* el kapağı (ön yüz sağında; tahta + iki çelik menteşe + mandal) */}
      <polygon points={pl(R4(T, kx, ky, kwid, kh))} fill={karistir(C.ahsap, "#1d1b26", 0.08)} stroke={golgeRenk} strokeWidth={kw} />
      {[ky + 14, ky + kh - 22].map((y, i) => <polygon key={i} points={pl(R4(T, kx - 4, y, 20, 8))} fill="#3a3d42" />)}
      <polygon points={pl(R4(T, kx + kwid - 12, ky + kh / 2 - 4, 8, 10))} fill="#3a3d42" />
      {/* iniş tahtası: üst yüz + ön kenar (aşınma bandı) + alt yüz gölgesi */}
      <polygon points={pl(inisAlt)} fill={C.ahsapG} />
      {saat === "gun" && <Tarama sekil={inisAlt} basamak="III" aci={taramaAci} renk={golgeRenk} derinlik={s > 4 ? "yakin" : "orta"} seed={seed + 5} />}
      <polygon points={pl(inisUst)} fill={karistir(C.ahsap, "#e9e4da", 0.12)} stroke={golgeRenk} strokeWidth={kw} />
      <polygon points={pl(inisOn)} fill={C.ahsapG} stroke={golgeRenk} strokeWidth={kw} />
      <line x1={inisOn[0][0]} y1={inisOn[0][1] + 2} x2={inisOn[1][0]} y2={inisOn[1][1] + 2} stroke={karistir(C.ahsap, "#e9e4da", 0.3)} strokeWidth={Math.max(2, 0.6 * s)} />
      <polygon points={pl(yuz)} fill="none" stroke={golgeRenk} strokeWidth={kw} />
      {/* temas koyuluğu (zemin teması) */}
      <polygon points={pl(R4(T, K.x0 - 6, K.taban - 4, K.x1 - K.x0 + 12, 10))} fill="#14120f" opacity={0.55} />
    </g>
  );
};

// ---- 9b YEM/SU TEKNESİ (teras ön planı, kümesin önünde; A turu eleştirisi: P01 kapanış alt bandı ölü alan) ----
// ONAY BEKLİYOR (mekân sorumlusu §1.4'e işler): ahşap tekne, ortadan bölmeli — sol göz yem (donuk tane), sağ göz su (gök yansıması).
// Dünya modelli kutu (X yanal, h, Z derinlik m). Yüz tonları kümesle aynı sözleşme: ön yüz C.ahsap (kümes ön yüzü gibi), üst kenar
// gök ışığı, yan yüz C.isik'ten. Sarı metal yok, tane rengi imza kehribarından uzak (L* ≈ 55, b* ≈ 12).
export type TekneDunya = { X0: number; X1: number; Z0: number; derin: number; h: number; kalin: number };
export const YEM_TEKNESI: TekneDunya = { X0: -0.1, X1: 0.5, Z0: 1.75, derin: 0.24, h: 0.15, kalin: 0.025 };
export const YemTeknesi: React.FC<{ D: Dolly; k: KameraDurum; t: TekneDunya; C: CatiPalet; seed: number; uid: string }> = ({ D, k, t, C, seed, uid }) => {
  const E = (X: number, h: number, Z: number) => dunyaEkran(D, k, X, h, Z);
  const Z1 = t.Z0 + t.derin, c = t.kalin;
  const kose = [E(t.X0, 0, t.Z0), E(t.X1, 0, t.Z0), E(t.X1, t.h, Z1), E(t.X0, t.h, Z1)];
  if (kose.some((q) => !q)) return null; // kamera tekneyi geçmiş (dolly başı): kadraj dışında, çizilmez
  const e = (X: number, h: number, Z: number) => E(X, h, Z) as P;
  const pxm = Math.abs(e(t.X1, 0, t.Z0)[0] - e(t.X0, 0, t.Z0)[0]) / (t.X1 - t.X0);
  const kw = Math.max(2, Math.min(5, pxm * 0.005));
  const golgeRenk = ink(C.ahsap);
  const on = [e(t.X0, t.h, t.Z0), e(t.X1, t.h, t.Z0), e(t.X1, 0, t.Z0), e(t.X0, 0, t.Z0)];
  const yanX = 0 > t.X1 ? t.X1 : 0 < t.X0 ? t.X0 : null;
  const yan = yanX !== null ? [e(yanX, t.h, t.Z0), e(yanX, t.h, Z1), e(yanX, 0, Z1), e(yanX, 0, t.Z0)] : null;
  const yanIsikli = yanX !== null && isikliYuz(C, [yanX === t.X1 ? 1 : -1, 0, 0]);
  const ust = [e(t.X0, t.h, t.Z0), e(t.X1, t.h, t.Z0), e(t.X1, t.h, Z1), e(t.X0, t.h, Z1)];
  const ic = (X0: number, X1: number, h: number) => [e(X0, h, t.Z0 + c), e(X1, h, t.Z0 + c), e(X1, h, Z1 - c), e(X0, h, Z1 - c)];
  const Xm = (t.X0 + t.X1) / 2;
  const delikSol = ic(t.X0 + c, Xm - c / 2, t.h), delikSag = ic(Xm + c / 2, t.X1 - c, t.h);
  const yemY = ic(t.X0 + c, Xm - c / 2, t.h * 0.62), suY = ic(Xm + c / 2, t.X1 - c, t.h * 0.55);
  // taneler: seed sabit, yem yüzeyinde (bilineer)
  const bil = (q: P[], u: number, v: number): P => { const a = [q[0][0] + (q[1][0] - q[0][0]) * u, q[0][1] + (q[1][1] - q[0][1]) * u], b = [q[3][0] + (q[2][0] - q[3][0]) * u, q[3][1] + (q[2][1] - q[3][1]) * u]; return [a[0] + (b[0] - a[0]) * v, a[1] + (b[1] - a[1]) * v]; };
  const taneler = Array.from({ length: 34 }, (_, i) => ({ p: bil(yemY, 0.05 + 0.9 * rnd(seed, `tx${i}`), 0.1 + 0.85 * rnd(seed, `ty${i}`)), a: rnd(seed, `ta${i}`) > 0.5 }));
  const r = Math.max(1.2, pxm * 0.006);
  const sagIsik = isikSagMi(C);
  return (
    <g>
      {/* temas koyuluğu (zemin teması) */}
      <polygon points={pl([e(t.X0 - 0.02, 0, t.Z0 - 0.015), e(t.X1 + 0.02, 0, t.Z0 - 0.015), e(t.X1 + 0.02, 0, Z1), e(t.X0 - 0.02, 0, Z1)])} fill="#14120f" opacity={0.5} />
      {yan && <polygon points={pl(yan)} fill={yanIsikli ? karistir(C.ahsap, C.kenar ?? "#e9e4da", 0.2) : C.ahsapG} stroke={golgeRenk} strokeWidth={kw} strokeLinejoin="round" />}
      <polygon points={pl(ust)} fill={karistir(C.ahsap, "#e9e4da", 0.12)} stroke={golgeRenk} strokeWidth={kw} strokeLinejoin="round" />
      <defs>
        <clipPath id={`${uid}yem`}><polygon points={pl(delikSol)} /></clipPath>
        <clipPath id={`${uid}su`}><polygon points={pl(delikSag)} /></clipPath>
      </defs>
      {/* iç: arka iç duvar koyu, yem ve su yüzeyi deliğe kırpılır (ön iç duvar yüzeyi örter) */}
      <polygon points={pl(delikSol)} fill={C.ahsapG} />
      <polygon points={pl(delikSag)} fill={C.ahsapG} />
      <g clipPath={`url(#${uid}yem)`}>
        <polygon points={pl(yemY)} fill="#6f6758" />
        {taneler.map((q, i) => <ellipse key={i} cx={q.p[0]} cy={q.p[1]} rx={r * 1.4} ry={r} fill={q.a ? "#8a7f6a" : "#a39a85"} />)}
        <polygon points={pl([delikSol[0], delikSol[1], yemY[1], yemY[0]])} fill="#14120f" opacity={0.25} />
      </g>
      <g clipPath={`url(#${uid}su)`}>
        <polygon points={pl(suY)} fill={karistir(C.gok[1], C.ahsapG, 0.35)} />
        {/* gök yansıması: tek ince şerit, ışık yanında */}
        {(() => { const a = bil(suY, sagIsik ? 0.55 : 0.1, 0.35), b2 = bil(suY, sagIsik ? 0.9 : 0.45, 0.35); return <line x1={a[0]} y1={a[1]} x2={b2[0]} y2={b2[1]} stroke={karistir(C.gok[2], "#e9e4da", 0.2)} strokeWidth={Math.max(2, pxm * 0.008)} strokeLinecap="round" opacity={0.7} />; })()}
        <polygon points={pl([delikSag[0], delikSag[1], suY[1], suY[0]])} fill="#14120f" opacity={0.25} />
      </g>
      <polygon points={pl(delikSol)} fill="none" stroke={golgeRenk} strokeWidth={kw * 0.8} />
      <polygon points={pl(delikSag)} fill="none" stroke={golgeRenk} strokeWidth={kw * 0.8} />
      {/* ön yüz: iki tahta (yatay ek), kümes ön yüzüyle aynı ton */}
      <polygon points={pl(on)} fill={C.ahsap} stroke={golgeRenk} strokeWidth={kw} strokeLinejoin="round" />
      {(() => { const a = e(t.X0, t.h * 0.5, t.Z0), b2 = e(t.X1, t.h * 0.5, t.Z0); return <line x1={a[0]} y1={a[1]} x2={b2[0]} y2={b2[1]} stroke={golgeRenk} strokeWidth={kw * 0.7} />; })()}
      {[0.08, 0.92].map((u) => { const a = e(t.X0 + (t.X1 - t.X0) * u, t.h * 0.78, t.Z0), b2 = e(t.X0 + (t.X1 - t.X0) * u, t.h * 0.22, t.Z0); return <line key={u} x1={a[0]} y1={a[1]} x2={b2[0]} y2={b2[1]} stroke="#3a3d42" strokeWidth={kw * 1.2} strokeLinecap="round" />; })}
      {C.kenar && (() => { const a = sagIsik ? e(t.X1, t.h, t.Z0) : e(t.X0, t.h, t.Z0), b2 = sagIsik ? e(t.X1, t.h, Z1) : e(t.X0, t.h, Z1); return <line x1={a[0]} y1={a[1]} x2={b2[0]} y2={b2[1]} stroke={C.kenar} strokeWidth={2.5} />; })()}
    </g>
  );
};
