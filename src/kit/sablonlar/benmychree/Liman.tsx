// ===== LIMAN şablonu (Ben-my-Chree; mekanlar.md §1, sahne-plani §4 P01/P07c, §12) =====
// Meis limanı, Ocak 1917. 2.5D: her katman kendi z'sinde plaka (kamera25d), su satırları gerçek dünya izdüşümü.
// KURULU görünüm: kiyidan-ada (P01 kalibrasyon). Diğerleri (ada-rihtim, karsi-kiyi, rihtim-yan, hangar-yakin, enkaz) KURULMADI → açık hata.
// Parametreler: gorunum, gemi_durum, gun_yuksekligi (22), cizgi_mevzi {bas, bit, ilk (0.1)}, kamera25 (Kamera25; görünüm kaydını ezer), seed.
import React from "react";
import { interpolate } from "remotion";
import type { Plan } from "../../tipler";
import { param, Sablon, SablonProps } from "../../ortak";
import { cl } from "../../zaman";
import { izd, Kam25, kamera25, Kamera25, plaka } from "../../kamera25d";
import { RenkKaydi } from "../../../doku/Tarama";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { Alev, BP, BulutSerit, Duman, gokSutun, Gok5, Katman, kirik, P2, pts, rr, Tara, Isleme } from "./bmcOrtak";
import { GemiDurum, GemiProfil, GemiYansima } from "./Gemi";
import { karisim as mix } from "./renk";
import { LimanYeniSahne } from "./LimanYeni";
import { LimanBolumSahne } from "./LimanBolum";

type Gorunum = "kiyidan-ada" | "ada-rihtim" | "karsi-kiyi" | "rihtim-yan" | "hangar-yakin" | "enkaz" | "gemi-orta" | "saygi" | "kiyidan-olay" | "gemi-sahne" | "batarya-genis" | "durbun-insert";
const KURULU: Gorunum[] = ["kiyidan-ada", "karsi-kiyi", "gemi-orta", "saygi", "kiyidan-olay", "gemi-sahne", "batarya-genis", "durbun-insert"];
const BOLUM_G: Gorunum[] = ["kiyidan-olay", "gemi-sahne", "batarya-genis", "durbun-insert"]; // tur-5: karsi-kiyi (P04), gemi-orta (P07a/b), saygi (P10a) → LimanYeni.tsx

// görünüm kaydı: referans (dekor) kamera = sahne planı ekran konumlarının ölçüldüğü kamera (P01 kapak karesi)
// P01: göz deniz +50 m, b 190°, 375 mm (F 11 250), tilt −1.03° → göz hizası y 758, su hattı (Z 2000) y ≈ 1040.
export const LIMAN_KAYIT: Record<"kiyidan-ada", { ref: Kamera25; b: number }> = {
  "kiyidan-ada": { b: 190, ref: { kare: [0], konum_yol: [[-0.15, 50, 3]], yon_yol: [[0, -1.027]], lens_mm: [375], odak_z: [2000], diyafram: 36 } },
};
const GEMI_Z = 2000, GEMI_X0 = 190; // baş ekran x (ref)

// ---------- uzak dekor (ref px) ----------
// sırt profili: seed'li tepe kümeleri (Gauss tümsekleri) + küçük pürüz; dünyaya (plaka px) bağlı
export const sirtNokta = (x0: number, x1: number, taban: number, tepeler: [number, number, number][], seed: string, puruz = 3): P2[] => {
  const A: P2[] = [];
  for (let x = x0; x <= x1; x += 6) {
    let y = taban; for (const [c, h, w] of tepeler) y -= h * Math.exp(-(((x - c) / w) ** 2));
    y += Math.sin(x * 0.09 + rr(`${seed}p`) * 6) * puruz * 0.6 + (rr(`${seed}${Math.round(x / 18)}`) - 0.5) * puruz;
    A.push([x, y]);
  }
  return A;
};
export const Sirt: React.FC<{ A: P2[]; alt: number; renk: string; golge?: string; bant?: number }> = ({ A, alt, renk, golge, bant = 3 }) => (
  <g>
    <path d={`M${A[0][0]},${alt} L${pts(A)} L${A[A.length - 1][0]},${alt} Z`} fill={renk} />
    {/* güneş sağda: sağa bakan (inen) yamaçlarda sıcak bant, sola bakan yamaçlarda koyu yüz */}
    {golge && <path d={`M${A[0][0]},${alt} L${pts(A.map((q) => [q[0] + 14, q[1] + 22] as P2))} L${A[A.length - 1][0]},${alt} Z`} fill={golge} opacity={0.28} />}
    {bant > 0 && A.slice(1).map((q, i) => (q[1] > A[i][1] + 0.3 ? <line key={i} x1={A[i][0]} y1={A[i][1] + bant / 2} x2={q[0]} y2={q[1] + bant / 2} stroke={BP.sirtBant} strokeWidth={bant} strokeLinecap="round" /> : null))}
  </g>
);
// Meis evleri: bitişik, farklı yükseklik/genişlik/renk; kontrajur → cephe gölgede (buğulu), sağ yan duvar ışık şeridi, çatı ışıkta
export const Evler: React.FC<{ x0: number; x1: number; taban: (x: number) => number; hMin: number; hMax: number; seed: string; bugu: number; bosluk?: number }> = ({ x0, x1, taban, hMin, hMax, seed, bugu, bosluk = 0.12 }) => {
  const ev: React.ReactNode[] = []; let x = x0, i = 0, oncekiH = 0;
  while (x < x1) {
    const w = 26 + rr(`${seed}w${i}`) * 30; let h = hMin + rr(`${seed}h${i}`) * (hMax - hMin);
    if (rr(`${seed}b${i}`) < bosluk) { // boşluk: maki/kaya (ızgara kırılır)
      const tb = taban(x + w / 2);
      ev.push(<g key={i}><ellipse cx={x + w / 2} cy={tb - 6} rx={w * 0.55} ry={9} fill={mix(BP.maki, BP.bugu, bugu)} /><ellipse cx={x + w / 2 + 6} cy={tb - 10} rx={w * 0.3} ry={7} fill={mix(BP.makiGolge, BP.bugu, bugu)} /></g>);
      x += w * 0.8; i++; oncekiH = 0; continue;
    }
    if (Math.abs(h - oncekiH) < 7) h += h > (hMin + hMax) / 2 ? -9 : 9; // komşu farkı zorlanır (≥ 0.6 kat)
    oncekiH = h;
    const ton = BP.ev[(i * 3 + Math.floor(rr(`${seed}c${i}`) * 2)) % 5];
    const cephe = mix(mix(ton, BP.evGolge, 0.42), BP.bugu, bugu), yan = mix(mix(ton, BP.kenar, 0.5), BP.bugu, bugu * 0.5);
    const duz = rr(`${seed}d${i}`) < 0.4, sagir = rr(`${seed}s${i}`) < 0.2, isikli = rr(`${seed}i${i}`) < 0.6;
    const tb = taban(x + w / 2), y = tb - h, yw = Math.min(9, 3 + w * 0.12);
    const cati = mix(mix(BP.cati, BP.kenar, 0.25), BP.bugu, bugu * 0.8);
    ev.push(<g key={i}>
      <rect x={x} y={y} width={w + 0.5} height={h + 12} fill={cephe} />
      {isikli && <path d={`M${x + w},${y} L${x + w + yw},${y - 2} L${x + w + yw},${tb + 10} L${x + w},${tb + 12} Z`} fill={yan} />}
      {duz ? <><rect x={x - 1} y={y - 4} width={w + 2} height={4} fill={cephe} /><line x1={x - 1} x2={x + w + 1} y1={y - 4} y2={y - 4} stroke={yan} strokeWidth={1.6} /></>
        : <path d={`M${x - 2},${y} L${x + w * 0.35},${y - 6} L${x + w + yw * 0.6},${y - 7} L${x + w + yw + 1},${y - 1} Z`} fill={cati} />}
      <rect x={x} y={y} width={w} height={3} fill={mix(BP.evGolge, BP.bugu, bugu * 0.6)} />
      {!sagir && Array.from({ length: Math.max(1, Math.floor(h / 15)) }).map((_, f) => Array.from({ length: w > 40 ? 3 : 2 }).map((__, a) => {
        const n = w > 40 ? 3 : 2, px = x + (w / n) * (a + 0.5) - 2, py = y + 6 + f * 15, acik = rr(`${seed}k${i}${f}${a}`) < 0.4;
        return <g key={`${f}${a}`}><rect x={px} y={py} width={4} height={7} fill={mix("#4c4868", BP.bugu, bugu * 0.55)} />
          {acik && <><rect x={px - 2.5} y={py} width={2} height={7} fill={mix(BP.kepenk, BP.bugu, bugu)} /><rect x={px + 4.5} y={py} width={2} height={7} fill={mix(BP.kepenk, BP.bugu, bugu)} /></>}</g>;
      }))}
    </g>);
    x += w; i++;
  }
  return <g>{ev}</g>;
};
// Kale (14. yy Şövalyeler): kayalık burun + iki kütleli dikdörtgen sur + tek kare kule; mazgal dişi; kemer yok. Işık sağdan (batı yüzleri)
export const Kale: React.FC = () => {
  const tas = mix(BP.tasGolge, "#d0b392", 0.22), tasK = mix(BP.tasGolge, "#d0b392", 0.12), isik = "#d0b392";
  const burun: P2[] = [[20, 1004], ...kirik([30, 960], [90, 880], 4, 7, "bu1"), ...kirik([90, 880], [300, 858], 6, 6, "bu2"), ...kirik([300, 858], [440, 872], 3, 5, "bu3"), [500, 930], [540, 1004]];
  const sur1 = "M96,872 L96,772 L318,766 L318,866 Z", sur2 = "M318,866 L318,800 L418,804 L418,874 Z", kule = "M176,770 L176,682 L246,682 L246,768 Z";
  const dis = (x0: number, x1: number, y: number, n: number, c: string) => Array.from({ length: n }).map((_, i) => <rect key={`${x0}${i}`} x={x0 + i * ((x1 - x0) / n)} y={y - 11} width={(x1 - x0) / n / 2} height={11} fill={c} stroke={BP.kontur} strokeWidth={1.4} />);
  return (
    <g>
      <path d={`M${pts(burun)} Z`} fill={mix(BP.tasGolge, BP.toprak, 0.3)} stroke={BP.kontur} strokeWidth={1.6} />
      <path d={`M${pts([[300, 858], [440, 872], [500, 930], [540, 1004], [470, 1004], [430, 930], [380, 878]])} Z`} fill={mix(isik, BP.toprak, 0.25)} />
      <path d={`M${pts(kirik([90, 882], [300, 860], 6, 5, "bu2"))}`} stroke={BP.kenar} strokeWidth={2.5} fill="none" />
      <Tara d={`M${pts(burun)} Z`} aci={105} aralik={9} kalin={2} renk={BP.tasDerin} alfa={0.4} kutu={[20, 860, 540, 1004]} />
      {[[140, 900, 990], [230, 890, 1000], [330, 900, 980]].map(([x, a, b], i) => <path key={i} d={`M${x},${a} L${x - 8},${b}`} stroke={BP.tasDerin} strokeWidth={3} opacity={0.6} />)}
      <path d={sur1} fill={tas} stroke={BP.kontur} strokeWidth={2} />{dis(96, 318, 770, 9, tas)}
      <path d={sur2} fill={tasK} stroke={BP.kontur} strokeWidth={2} />{dis(318, 418, 802, 4, tasK)}
      <path d="M318,766 L328,770 L328,800 L318,800 Z" fill={isik} />
      <path d="M418,804 L430,808 L430,876 L418,874 Z" fill={isik} />
      {Array.from({ length: 10 }).map((_, i) => i % 2 ? null : <line key={i} x1={98} x2={316} y1={782 + i * 9} y2={752 + i * 9} stroke={BP.tasDerin} strokeWidth={2} opacity={0.32} />)}
      <Tara d="M96,836 L318,830 L318,866 L96,872 Z" aci={105} aralik={9} kalin={2} renk={BP.tasDerin} alfa={0.5} kutu={[96, 830, 318, 872]} />
      <path d={kule} fill={mix(BP.tasGolge, "#d0b392", 0.28)} stroke={BP.kontur} strokeWidth={2} />{dis(176, 246, 682, 3, mix(BP.tasGolge, "#d0b392", 0.28))}
      <path d="M246,682 L256,686 L256,768 L246,768 Z" fill={isik} />
      <line x1={176} x2={256} y1={671} y2={671} stroke={BP.kenar} strokeWidth={2} />
      <rect x={204} y={672} width={5} height={15} fill={BP.tasDerin} /><rect x={150} y={780} width={4} height={12} fill={BP.tasDerin} /><rect x={262} y={790} width={4} height={12} fill={BP.tasDerin} /><rect x={360} y={810} width={4} height={11} fill={BP.tasDerin} />
      <line x1={238} y1={636} x2={238} y2={672} stroke={BP.direk} strokeWidth={2} />
    </g>
  );
};
export const Bayrak: React.FC<{ t: number }> = ({ t }) => {
  // tricolore, rüzgâr +0.57 → sağa dalgalanır (meltem): üç şerit, küçük (≤ 40×27)
  const w = (u: number) => Math.sin(t * 5.2 - u * 4) * 2.2 * u + 32;
  const ser = (a: number, b: number, c: string) => <path key={c} d={`M${239 + a * 38},${607 + w(a)} L${239 + b * 38},${607 + w(b)} L${239 + b * 38},${629 + w(b)} L${239 + a * 38},${629 + w(a)} Z`} fill={c} />;
  return <g>{ser(0, 0.34, BP.bayrak[0])}{ser(0.33, 0.67, BP.bayrak[1])}{ser(0.66, 1, BP.bayrak[2])}</g>;
};

// ---------- su: dünya satırları (Δz ≈ satır aralığı ≥ 3.5 px), vuruşlar dünya x'ine bağlı ----------
type Vurus = { x0: number; x1: number; z: number; tur: "isik" | "golge" | "taban"; faz: number; f: number };
const suSatirlari = (ref: Kam25, zMin: number, zMax: number, seed: string): Vurus[] => {
  const out: Vurus[] = []; let z = zMax, i = 0;
  while (z > zMin && i < 400) {
    const q = izd(ref, [0, 0, z])!, s = q.s, L = Math.max(6, Math.min(60, 2.2 * s)) / s;
    const xs = -600 / s - 100, xe = 600 / s + 100; let x = xs + rr(`${seed}o${i}`) * L * 2;
    while (x < xe) {
      const kx = Math.round(x * 10), sx = 540 + x * s, r0 = rr(`${seed}t${i}_${kx}`);
      const oran = sx < 360 ? 0.06 : sx < 720 ? 0.22 : 0.55, isik = r0 < oran;
      const len = L * (isik ? 0.8 + 1.6 * rr(`${seed}l${i}_${kx}`) : 0.4 + 1.3 * rr(`${seed}l${i}_${kx}`));
      out.push({ x0: x, x1: x + len, z, tur: isik ? "isik" : r0 < oran + 0.22 + 0.3 * Math.max(0, Math.min(1, (900 - z) / 400)) ? "golge" : "taban", faz: rr(`${seed}f${i}_${kx}`) * 6.28, f: 0.4 + 0.5 * rr(`${seed}h${i}_${kx}`) });
      x += len + L * (0.6 + 2.2 * rr(`${seed}g${i}_${kx}`));
    }
    const dy = Math.max(5, Math.min(13, s * 1.2));         // ekran satır aralığı (≥ 3.5 px; seyrek = ızgara okunmaz)
    z = (50 * ref.F) / ((50 * ref.F) / z + dy);            // ufuk–ölçek: y − y_g = e·F/Z
    i++;
  }
  return out;
};
const SU_ON = new Map<string, Vurus[]>();
const SuOn: React.FC<{ ref: Kam25; k: Kam25; t: number; seed: number; yolRenk: string }> = ({ ref, k, t, seed, yolRenk }) => {
  const key = `${seed}`; if (!SU_ON.has(key)) SU_ON.set(key, suSatirlari(ref, 470, 2000, `su${seed}`));
  const V = SU_ON.get(key)!;
  return (
    <g strokeLinecap="round">
      {V.map((v, i) => {
        const a = izd(k, [v.x0, 0, v.z]), b = izd(k, [v.x1, 0, v.z]); if (!a || !b || b.x < -20 || a.x > 1100) return null;
        const w = Math.max(2, Math.min(3.2, a.s * 0.4));
        if (v.tur === "taban") return null;
        if (v.tur === "golge") return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={BP.suGolge} strokeWidth={w} />;
        const yan = 0.5 + 0.5 * Math.sin(t * v.f * 2 * Math.PI + v.faz) > 0.28; // ışıltı: vuruş başına sabit faz
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={yan ? yolRenk : mix(yolRenk, BP.su, 0.55)} strokeWidth={w} />;
      })}
    </g>
  );
};

// ---------- ön plan kaya (sol) + sağ alt sekisi; oyuk = mevzi (P04/P10a ile aynı kaya) ----------
// Kireçtaşı blok: ışıkta üst düzlem (güneş yüksek, sağ-ön) + kameraya bakan gölge ön yüz (karren olukları); oyuk üst düzlemde koyu ağız.
// tur-4 (eleştiri 3, mekanlar §1.4 katman 12): küçük, koyu, net kaya; üst kenar y 1170 → 1320 kırık; x ≤ 600; oyuk x 120–420 y 1260–1400
const UST: P2[] = [[-40, 1176], [40, 1166], [110, 1186], [190, 1172], [260, 1196], [330, 1206], [400, 1232], [450, 1226], [520, 1270], [580, 1300], [600, 1322]];
const OYUK: P2[] = [[120, 1300], [170, 1270], [250, 1262], [330, 1268], [400, 1290], [420, 1330], [392, 1372], [320, 1398], [220, 1400], [150, 1384], [118, 1346]];
export const OYUK_MERKEZ: P2 = [270, 1330];
const OnKaya: React.FC<{ t: number }> = ({ t }) => {
  const fas: [P2[], string][] = [
    [[[-40, 1176], [40, 1166], [110, 1186], [80, 1290], [-40, 1300]], "#7a6e90"],
    [[[110, 1186], [190, 1172], [260, 1196], [230, 1250], [120, 1262], [80, 1290]], "#857a9a"],
    [[[260, 1196], [330, 1206], [400, 1232], [450, 1226], [430, 1280], [330, 1266], [230, 1250]], "#7d7294"],
    [[[450, 1226], [520, 1270], [580, 1300], [600, 1322], [610, 1460], [500, 1420], [430, 1280]], "#5a5276"],
    [[[-40, 1300], [80, 1290], [118, 1346], [150, 1384], [60, 1520], [-40, 1560]], "#5e5578"],
    [[[392, 1372], [430, 1280], [500, 1420], [610, 1460], [596, 1640], [450, 1600]], "#4e4670"],
    [[[-40, 1560], [60, 1520], [150, 1384], [220, 1400], [320, 1398], [392, 1372], [450, 1600], [596, 1640], [620, 1940], [-40, 1940]], "#463f64"],
  ];
  return (
    <g strokeLinejoin="miter">
      {fas.map(([q, c], i) => <path key={i} d={`M${pts(q)} Z`} fill={c} stroke="#3e302b" strokeWidth={2} />)}
      {/* üst yüzler ışıkta (güneş sağ-üst-ön): kenar ışığı + sıcak taş şeridi */}
      <path d={`M${pts(UST)}`} stroke={BP.kenar} strokeWidth={5} fill="none" />
      <path d={`M${pts([[110, 1186], [190, 1172], [260, 1196], [250, 1210], [190, 1188], [120, 1200]])} Z`} fill={BP.tasIsik} />
      <path d={`M${pts([[400, 1232], [450, 1226], [520, 1270], [500, 1278], [450, 1240]])} Z`} fill={BP.tasIsik} />
      <path d="M600,1322 L610,1460 L596,1640" stroke={BP.kenar} strokeWidth={4} fill="none" />
      {/* karren: net dikey erime olukları (koyu kenar + ışık kenarı) */}
      {[[40, 1310, 150], [200, 1430, 120], [330, 1420, 170], [480, 1440, 140], [90, 1560, 110], [380, 1600, 130]].map(([x, a2, L], i) => <g key={`kr${i}`}><path d={`M${x - 8},${a2} Q${x - 12},${a2 + L * 0.5} ${x + 2},${a2 + L} Q${x + 2},${a2 + L * 0.5} ${x + 9},${a2} Z`} fill="#2e2a44" /><path d={`M${x + 9},${a2} Q${x + 4},${a2 + L * 0.5} ${x + 3},${a2 + L}`} stroke={BP.kenar} strokeWidth={2.5} fill="none" /></g>)}
      <path d={`M${pts([[200, 1520], [250, 1508], [290, 1530], [240, 1548]])} Z`} fill={BP.toprak} />
      {/* oyuk: en koyu leke, kırık kenarlı; üst dudak altı tarama (yerel), alt dudak ışıkta */}
      <path d={`M${pts(OYUK)} Z`} fill="#221e34" stroke="#3e302b" strokeWidth={3} />
      <Tara d={`M${pts(OYUK)} Z`} aci={105} aralik={7.5} kalin={2.4} renk="#120f1c" alfa={0.7} kutu={[118, 1262, 422, 1320]} />
      <path d={`M${pts([[150, 1384], [220, 1400], [320, 1398], [392, 1372], [400, 1386], [320, 1414], [220, 1416], [150, 1398]])} Z`} fill={BP.tasIsik} />
      <path d={`M${pts([[170, 1270], [250, 1262], [330, 1268], [400, 1290]])}`} stroke={BP.kenar} strokeWidth={3} fill="none" />
      {/* ot sapları (meltem sağa) */}
      {Array.from({ length: 7 }).map((_, i) => { const bx = 20 + i * 82 + rr(`ots${i}`) * 26; const by = UST.reduce((m, q) => (Math.abs(q[0] - bx) < Math.abs(m[0] - bx) ? q : m), UST[0])[1] + 4;
        return <g key={i}>{[0, 1, 2, 3].map((j) => { const L = 34 + rr(`otl${i}${j}`) * 46, a2 = -0.4 + j * 0.24 + Math.sin(t * 1.3 + i) * 0.05 + 0.22;
          return <path key={j} d={`M${bx + j * 3},${by} Q${bx + j * 3 + a2 * L * 0.3},${by - L * 0.6} ${bx + j * 3 + a2 * L},${by - L}`} stroke={j % 2 ? BP.ot : "#6e7458"} strokeWidth={3} fill="none" strokeLinecap="round" />; })}</g>; })}
    </g>
  );
};
const SagSeki: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <path d={`M${pts([[740, 2000], [770, 1840], [860, 1770], [990, 1742], [1140, 1736], [1140, 2000]])} Z`} fill={BP.tasGolge} />
    <path d="M770,1840 L860,1770 L990,1742 L1140,1736" stroke={BP.kenar} strokeWidth={4} fill="none" />
    {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={850 + i * 52 + rr(`mk${i}`) * 20} cy={1745 - rr(`mky${i}`) * 40} rx={50} ry={38} fill={i % 2 ? "#5a6048" : "#4c5240"} stroke="#3e302b" strokeWidth={2} />)}
    <path d="M800,1730 A60,44 0 0 1 900,1690 A56,42 0 0 1 1000,1680 A60,40 0 0 1 1120,1690" stroke={BP.kenar} strokeWidth={3} fill="none" opacity={0.8 + 0 * t} />
  </g>
);


// ---------- tur-13: kıyı ön planı (on_plan "kiyi"; P01/P09) — kaya Anadolu kıyısına bağlı, kara alt kenar boyunca kesintisiz ----------
// Kıyı çizgisi kayanın sağ dibinden sağ-alta çapraz iner; su yalnız kıyı çizgisi ile gemi arasında. Güneş sağ-üst-ön → gölgeler sola.
const KIYI_S: P2[] = [[560, 1338], ...kirik([600, 1352], [760, 1418], 4, 6, "ks1").slice(1), ...kirik([760, 1418], [930, 1494], 4, 7, "ks2").slice(1), ...kirik([930, 1494], [1140, 1586], 5, 7, "ks3").slice(1), ...kirik([1140, 1586], [1900, 1930], 6, 9, "ks4").slice(1)];
const kiyiY = (x: number) => { for (let i = 1; i < KIYI_S.length; i++) if (x <= KIYI_S[i][0]) { const a = KIYI_S[i - 1], b = KIYI_S[i]; return a[1] + ((x - a[0]) / (b[0] - a[0] || 1)) * (b[1] - a[1]); } return KIYI_S[KIYI_S.length - 1][1]; };
const ON_KENAR: P2[] = [[-700, 1720], ...kirik([-700, 1720], [300, 1676], 5, 10, "ok1").slice(1), ...kirik([300, 1676], [620, 1640], 5, 10, "ok2").slice(1)];
const Tas: React.FC<{ x: number; y: number; r: number; seed: string }> = ({ x, y, r, seed }) => {
  const e = 0.45 + 0.2 * rr(`${seed}e`);
  return <g>
    <ellipse cx={x - r * 0.35} cy={y + r * e * 0.45} rx={r * 1.15} ry={r * e * 0.5} fill="#3a3046" opacity={0.55} />
    <ellipse cx={x} cy={y} rx={r} ry={r * e} fill={mix(BP.tasOrta, BP.tasGolge, 0.25 + 0.4 * rr(`${seed}c`))} />
    <path d={`M${x - r * 0.3},${y - r * e * 0.85} Q${x + r * 0.7},${y - r * e * 0.9} ${x + r * 0.92},${y - r * e * 0.1}`} stroke={BP.tasIsik} strokeWidth={Math.max(1.5, r * 0.22)} fill="none" strokeLinecap="round" />
  </g>;
};
const Maki: React.FC<{ x: number; y: number; r: number; seed: string }> = ({ x, y, r, seed }) => (
  <g>
    <ellipse cx={x - r * 0.5} cy={y + r * 0.1} rx={r * 1.5} ry={r * 0.32} fill="#3a3046" opacity={0.5} />
    {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={x + (i - 2) * r * 0.42 + rr(`${seed}x${i}`) * r * 0.2} cy={y - r * (0.35 + 0.4 * rr(`${seed}y${i}`))} rx={r * 0.5} ry={r * 0.4} fill={i % 2 ? "#5a6048" : "#4c5240"} stroke="#3e302b" strokeWidth={2} />)}
    <path d={`M${x - r * 0.6},${y - r * 0.95} A${r * 0.55},${r * 0.4} 0 0 1 ${x + r * 0.4},${y - r * 1.05} A${r * 0.5},${r * 0.38} 0 0 1 ${x + r * 1.1},${y - r * 0.6}`} stroke={BP.kenar} strokeWidth={3} fill="none" opacity={0.8} />
  </g>
);
const KiyiOn: React.FC<{ t: number }> = ({ t }) => {
  const fas: [P2[], string][] = [
    [[[-700, 1190], [-300, 1170], [40, 1166], [110, 1186], [80, 1290], [-700, 1300]], "#7a6e90"],
    [[[110, 1186], [190, 1172], [260, 1196], [230, 1250], [120, 1262], [80, 1290]], "#857a9a"],
    [[[260, 1196], [330, 1206], [400, 1232], [450, 1226], [430, 1280], [330, 1266], [230, 1250]], "#7d7294"],
    [[[450, 1226], [520, 1270], [580, 1300], [600, 1322], [610, 1460], [500, 1420], [430, 1280]], "#5a5276"],
    [[[-700, 1300], [80, 1290], [118, 1346], [150, 1384], [60, 1520], [-700, 1560]], "#5e5578"],
    [[[392, 1372], [430, 1280], [500, 1420], [610, 1460], [620, 1660], [450, 1640]], "#4e4670"],
    [[[-700, 1560], [60, 1520], [150, 1384], [220, 1400], [320, 1398], [392, 1372], [450, 1640], [620, 1660], [620, 1760], [-700, 1760]], "#463f64"],
  ];
  const S = KIYI_S, Sw = S.map((q) => [q[0], q[1] + 16 + (q[0] - 560) * 0.03] as P2);
  const zem = `M${pts(S)} L1900,2900 L-700,2900 L-700,1600 L560,1600 Z`;
  // çakıl: kıyıdan kameraya büyür (derinlik); seed sabit
  const cakil = Array.from({ length: 90 }).map((_, i) => { const x = 600 + rr(`kc${i}`) * 1100, d = rr(`kcd${i}`) ** 1.4, y0 = kiyiY(x) + 30; const y = y0 + d * (2300 - y0); return { x, y, r: 3 + d * 16 + rr(`kcr${i}`) * 3, k: `kc${i}` }; }).filter((c) => c.y < 2300 && c.y > kiyiY(c.x) + 26).sort((a, b) => a.y - b.y);
  const ruz = 0.57;
  return (
    <g strokeLinejoin="miter">
      {/* kara zemini (çakıllı kıyı): kıyı çizgisinden alt kenara kesintisiz */}
      <defs><linearGradient id="kiyiZem" x1="0" y1="1340" x2="0" y2="1960" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#9c8478" /><stop offset="0.5" stopColor="#b2947c" /><stop offset="1" stopColor="#9a7c6a" /></linearGradient></defs>
      <path d={zem} fill="url(#kiyiZem)" stroke="#3e302b" strokeWidth={2} />
      <Tara d={zem} aci={160} aralik={11} kalin={2} renk={BP.tasDerin} alfa={0.18} kutu={[560, 1340, 1900, 2900]} />
      {/* ıslak taş şeridi + köpük (dalga kıyıya vurur, geri çekilir) */}
      <path d={`M${pts(S)} L${pts(Sw.slice().reverse())} Z`} fill="#5c5068" />
      <polyline points={pts(Sw)} fill="none" stroke={mix("#5c5068", BP.tasIsik, 0.35)} strokeWidth={2.5} />
      {(() => { const g = 0.5 + 0.5 * Math.sin(t * 1.6); return <g>
        <polyline points={pts(S.map((q) => [q[0], q[1] - 2 + g * 3] as P2))} fill="none" stroke={BP.kopuk} strokeWidth={5} strokeLinecap="round" />
        <polyline points={pts(S.map((q, i) => [q[0] + 8, q[1] - 12 - g * 4 - rr(`kf${i}`) * 4] as P2))} fill="none" stroke={BP.kopuk} strokeWidth={2.5} strokeDasharray="34 18" opacity={0.75} />
      </g>; })()}
      {cakil.map((c) => <Tas key={c.k} x={c.x} y={c.y} r={c.r} seed={c.k} />)}
      {/* kıyı kayaları (karada, ıslak şeridin üstünde) */}
      {[[700, 1412, 22], [880, 1488, 30], [1050, 1556, 26]].map(([x, y, r], i) => <Tas key={`kk${i}`} x={x} y={y} r={r} seed={`kk${i}`} />)}
      {/* kaya (kıyıya bağlı burun): yüzler; tabanı zemine oturur */}
      {fas.map(([q, c], i) => <path key={i} d={`M${pts(q)} Z`} fill={c} stroke="#3e302b" strokeWidth={2} />)}
      <path d={`M${pts(UST)}`} stroke={BP.kenar} strokeWidth={5} fill="none" />
      <path d={`M${pts([[110, 1186], [190, 1172], [260, 1196], [250, 1210], [190, 1188], [120, 1200]])} Z`} fill={BP.tasIsik} />
      <path d={`M${pts([[400, 1232], [450, 1226], [520, 1270], [500, 1278], [450, 1240]])} Z`} fill={BP.tasIsik} />
      <path d="M600,1322 L610,1460 L620,1660" stroke={BP.kenar} strokeWidth={4} fill="none" />
      {/* kayanın kıyı gölgesi: sağ dibinde zemine düşen koyu temas şeridi */}
      <path d={`M${pts([[612, 1360], [640, 1380], [660, 1520], [650, 1680], [620, 1700], [618, 1460]])} Z`} fill="#3a3046" opacity={0.55} />
      {/* çatlaklar (dikey karren çubukları yerine): ince kırık çizgi + gölge yüzde gravür taraması */}
      {[[[60, 1330], [90, 1400], [70, 1470]], [[210, 1440], [240, 1500], [222, 1560], [250, 1610]], [[350, 1430], [330, 1500], [362, 1570]], [[500, 1450], [520, 1520], [505, 1600]]].map((q, i) => <polyline key={`ct${i}`} points={pts(q as P2[])} fill="none" stroke="#2a2440" strokeWidth={3} strokeLinecap="round" />)}
      <Tara d={`M${pts(fas[6][0])} Z`} aci={110} aralik={10} kalin={2} renk="#2a2440" alfa={0.32} kutu={[-700, 1372, 620, 1760]} />
      <path d={`M${pts([[200, 1520], [250, 1508], [290, 1530], [240, 1548]])} Z`} fill={BP.toprak} />
      {/* oyuk (mevzi) — K1 ile aynı */}
      <path d={`M${pts(OYUK)} Z`} fill="#221e34" stroke="#3e302b" strokeWidth={3} />
      <Tara d={`M${pts(OYUK)} Z`} aci={105} aralik={7.5} kalin={2.4} renk="#120f1c" alfa={0.7} kutu={[118, 1262, 422, 1320]} />
      <path d={`M${pts([[150, 1384], [220, 1400], [320, 1398], [392, 1372], [400, 1386], [320, 1414], [220, 1416], [150, 1398]])} Z`} fill={BP.tasIsik} />
      <path d={`M${pts([[170, 1270], [250, 1262], [330, 1268], [400, 1290]])}`} stroke={BP.kenar} strokeWidth={3} fill="none" />
      {Array.from({ length: 7 }).map((_, i) => { const bx = 20 + i * 82 + rr(`ots${i}`) * 26; const by = UST.reduce((m, q) => (Math.abs(q[0] - bx) < Math.abs(m[0] - bx) ? q : m), UST[0])[1] + 4;
        return <g key={`o${i}`}>{[0, 1, 2, 3].map((j) => { const L = 34 + rr(`otl${i}${j}`) * 46, a2 = -0.4 + j * 0.24 + Math.sin(t * 1.3 + i) * 0.05 + 0.22;
          return <path key={j} d={`M${bx + j * 3},${by} Q${bx + j * 3 + a2 * L * 0.3},${by - L * 0.6} ${bx + j * 3 + a2 * L},${by - L}`} stroke={j % 2 ? BP.ot : "#6e7458"} strokeWidth={3} fill="none" strokeLinecap="round" />; })}</g>; })}
      {/* ön zemin: kayanın önünde alt kenar boyunca kara (ışıkta toprak + maki + ot) */}
      <path d={`M${pts(ON_KENAR)} L700,1700 L1140,1760 L1900,1900 L1900,2900 L-700,2900 Z`} fill="#a08470" stroke="#3e302b" strokeWidth={2} />
      <polyline points={pts(ON_KENAR)} fill="none" stroke="#3a3046" strokeWidth={7} opacity={0.55} />
      <polyline points={pts(ON_KENAR.map((q) => [q[0], q[1] + 6] as P2))} fill="none" stroke={BP.kenar} strokeWidth={3} opacity={0.85} />
      <Tara d={`M${pts(ON_KENAR)} L700,1700 L1140,1760 L1900,1900 L1900,2900 L-700,2900 Z`} aci={165} aralik={12} kalin={2} renk={BP.tasDerin} alfa={0.2} kutu={[-700, 1640, 1900, 2900]} />
      {[[80, 1800, 18], [330, 1760, 14], [520, 1850, 22], [760, 1790, 16], [960, 1880, 24]].map(([x, y, r], i) => <Tas key={`ot${i}`} x={x} y={y} r={r} seed={`ont${i}`} />)}
      <Maki x={180} y={1730} r={58} seed="mk1" /><Maki x={-300} y={1780} r={64} seed="mk4" /><Maki x={1400} y={1900} r={66} seed="mk5" /><Maki x={600} y={2120} r={80} seed="mk6" /><Maki x={880} y={1760} r={70} seed="mk2" /><Maki x={1080} y={1660} r={52} seed="mk3" />
      {[[30, 1712], [420, 1700], [640, 1712], [720, 1820], [1000, 1700]].map(([x, y], i) => <g key={`ott${i}`}>{[0, 1, 2, 3, 4].map((j) => { const L = 40 + rr(`otz${i}${j}`) * 40, a2 = (j - 2) * 0.12 + ruz * 0.35 + Math.sin(t * 1.4 + j + i) * 0.05;
        return <path key={j} d={`M${x + j * 4},${y} Q${x + j * 4 + a2 * L * 0.3},${y - L * 0.6} ${x + j * 4 + a2 * L},${y - L}`} stroke={j % 3 ? BP.ot : mix(BP.ot, BP.kenar, 0.4)} strokeWidth={3.5} fill="none" strokeLinecap="round" />; })}</g>)}
    </g>
  );
};

// ---------- KAPAK: kiyidan-ada ----------
// tur-7 (bölüm): isteğe bağlı ek katmanlar (LimanYeni "kiyidan-olay": P06/P07c/P09). ek verilmezse çıktı K1 ile piksel-aynı (P01 kilit).
export type KiyidanEk = { gemi?: React.ReactNode; gemiYerine?: React.ReactNode; kaya?: React.ReactNode; on?: React.ReactNode };
export type KiyidanCtx = { k: Kam25; ref: Kam25; t: number; wl: number; pxm: number; p: number };
export const KiyidanAda: React.FC<{ plan: Plan; p: number; kilit: SablonProps["kilit"]; ek?: (c: KiyidanCtx) => KiyidanEk }> = ({ plan, p, kilit, ek }) => {
  const kayit = LIMAN_KAYIT["kiyidan-ada"], ref = kamera25(undefined, 0, kayit.ref);
  const k = kamera25(param<Partial<Kamera25>>(plan, "kamera25", {}), p, kayit.ref);
  const t = p / 60, durum = param<GemiDurum>(plan, "gemi_durum", "demirli"), h = param<number>(plan, "gun_yuksekligi", 22);
  const gok = gokSutun(h), seed = param<number>(plan, "seed", 181);
  const pxm = ref.F / GEMI_Z, wl = izd(ref, [0, 0, GEMI_Z])!.y;
  const cz = param<{ bas: number; bit: number; ilk?: number } | null>(plan, "cizgi_mevzi", null);
  const onPlan = param<"kaya" | "kiyi">(plan, "on_plan", "kaya"); // tur-13: "kiyi" = kıyıya bağlı kara ön planı (varsayılan K1 kayası)
  // mürekkep çizgi: oyuktan (kaya plakası, z 9) gemi gövdesine (gemi plakası) — iki uç da kendi plakasıyla hareket eder
  const kayaZ = 9, A = plaka(ref, k, kayaZ).T(OYUK_MERKEZ), Bq = plaka(ref, k, GEMI_Z).T([560, wl - 16]);
  const cT = cz ? interpolate(p, [cz.bas, cz.bit], [cz.ilk ?? 0.1, 1], { ...cl }) : 0;
  kilit.push({ ad: "oyuk (mevzi)", p: A, tur: "kurulum" }, { ad: "çizgi gemi ucu", p: Bq, tur: "kurulum" });
  const E: KiyidanEk = ek ? ek({ k, ref, t, wl, pxm, p }) : {};
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <RenkKaydi><Isleme aci={105}>
        {/* 0–1 gök + bulut (sonsuz: kamera ötelemesinden etkilenmez) */}
        <Katman r={ref} k={k} z={1e7}><Gok5 sinir={[200, 330, 440, 525]} renk={gok} seed={seed} />
          {[[330, "#ecc9b4", 0.35], [220, "#efd2b8", 0.5], [130, "#f3d9b6", 0.75]].map(([r, c, a], i) => <circle key={`hl${i}`} cx={1190} cy={600} r={r as number} fill={c as string} opacity={a as number} />)}
          <BulutSerit x0={-60} x1={560} y={350} h={34} seed="b1" /><BulutSerit x0={640} x1={1000} y={392} h={18} seed="b3" />
          <BulutSerit x0={380} x1={1140} y={492} h={30} seed="b2" kayma={(t / 3) * 20} /><BulutSerit x0={-80} x1={300} y={590} h={16} seed="b4" renk="#ead2c6" /></Katman>
        {/* 2–5 sırtlar + buğu (atmosfer yumuşaklığı ek σ; optik DOF ayrıca) */}
        <Katman r={ref} k={k} z={4000} ek={1.4}><Sirt A={sirtNokta(500, 1140, 660, [[700, 50, 90], [860, 66, 110], [1040, 44, 80]], "s4", 2)} alt={1000} renk={mix(BP.sirt[0], BP.bugu, 0.3)} /></Katman>
        <Katman r={ref} k={k} z={3000} ek={1.0}><Sirt A={sirtNokta(-60, 1140, 720, [[120, 40, 140], [420, 78, 170], [690, 92, 150], [960, 70, 130]], "s3", 3)} alt={1000} renk={BP.sirt[1]} golge={BP.sirt[2]} />
          <rect x={-300} y={698} width={1700} height={30} fill={BP.bugu} opacity={0.42} /><rect x={-300} y={728} width={1700} height={20} fill={BP.bugu} opacity={0.22} /></Katman>
        <Katman r={ref} k={k} z={2600} ek={0.6}><Sirt A={sirtNokta(-60, 1140, 880, [[520, 110, 210], [800, 150, 200], [1060, 128, 160]], "s2", 4)} alt={1000} renk={BP.sirt[2]} golge={BP.sirt[3]} bant={2.5} />
          {Array.from({ length: 70 }).map((_, i) => { const x = 330 + rr(`mkd${i}`) * 780, y = 790 + rr(`mky${i}`) * 90; return y > 880 - 150 * Math.exp(-(((x - 800) / 200) ** 2)) - 110 * Math.exp(-(((x - 520) / 210) ** 2)) + 8 ? <ellipse key={i} cx={x} cy={y} rx={5 + rr(`mkr${i}`) * 5} ry={4} fill={BP.sirt[3]} /> : null; })}</Katman>
        {/* 6 kasaba üst sıraları (amfi), 7 kale, 8 rıhtım + ön sıra */}
        <Katman r={ref} k={k} z={2450} ek={0.6}>
          <Evler x0={520} x1={1100} taban={(x) => 852 - 40 * Math.exp(-(((x - 820) / 160) ** 2))} hMin={20} hMax={34} seed="ev4" bugu={0.42} bosluk={0.3} />
          <Evler x0={420} x1={1100} taban={(x) => 888 - 28 * Math.exp(-(((x - 800) / 180) ** 2))} hMin={22} hMax={38} seed="ev3" bugu={0.36} bosluk={0.2} />
          <Evler x0={300} x1={1100} taban={(x) => 924 - 14 * Math.exp(-(((x - 760) / 200) ** 2))} hMin={24} hMax={42} seed="ev2" bugu={0.3} />
          <Evler x0={240} x1={1100} taban={() => 958} hMin={26} hMax={46} seed="ev1" bugu={0.24} bosluk={0.06} /></Katman>
        <Katman r={ref} k={k} z={2200}><KonturTitreme derinlik="uzak" seed={seed + 1}><Kale /></KonturTitreme><Bayrak t={t} /></Katman>
        <Katman r={ref} k={k} z={2350}>
          <Evler x0={-10} x1={60} taban={() => 994} hMin={30} hMax={44} seed="evr" bugu={0.18} bosluk={0} />
          <Evler x0={850} x1={1100} taban={() => 994} hMin={30} hMax={46} seed="evs" bugu={0.18} bosluk={0} />
          <rect x={-20} y={990} width={1120} height={10} fill={BP.tasGolge} /><line x1={-20} x2={1100} y1={990} y2={990} stroke={BP.tasIsik} strokeWidth={2.5} />
          {/* liman suyu (gemi arkası) + ev yansıması */}
          <rect x={-20} y={1000} width={1120} height={60} fill={BP.su} />
          {Array.from({ length: 70 }).map((_, i) => { const x = rr(`ls${i}`) * 1100, y = 1004 + rr(`lsy${i}`) * 40; return <line key={i} x1={x} x2={x + 10} y1={y} y2={y} stroke={x > 700 ? BP.suYol : BP.suGolge} strokeWidth={2} />; })}
        </Katman>
        {/* 10 gemi + yansıma */}
        <Katman r={ref} k={k} z={GEMI_Z}>
          {E.gemiYerine ?? <><g transform={`translate(${GEMI_X0} ${wl + 2})`}><GemiYansima pxm={pxm} seed={seed} /></g>
          <g transform={`translate(${GEMI_X0} ${wl})`}><KonturTitreme derinlik="uzak" seed={seed + 2} olcek={0.8}><GemiProfil pxm={pxm} durum={durum} seed={seed} /></KonturTitreme></g></>}
          {(durum === "vurulmus" || durum === "yanan") && <g><Duman taban={[GEMI_X0 + 95 * pxm, wl - 12 * pxm]} t={t} hiz={durum === "yanan" ? 70 : 40} genis0={durum === "yanan" ? 30 : 7} genis1={durum === "yanan" ? 150 : 40} ruz={0.57} seed="lmd" boy={900} />
            {durum === "yanan" && <Alev taban={[GEMI_X0 + 95 * pxm, wl - 11.4 * pxm]} gen={80} boy={95} t={t} ruz={0.57} seed="lma" kontur={1.5} />}</g>}
          {E.gemi}
        </Katman>
        {/* 11 ön su: taban (deniz düzlemi, ekranda izdüşümle) + dünya satırları */}
        {(() => { const y0 = izd(k, [0, 0, GEMI_Z])!.y; return <rect x={-10} y={y0 - 2} width={1100} height={1940 - y0} fill={mix(BP.su, BP.bugu, 0.1)} />; })()}
        <SuOn ref={ref} k={k} t={t} seed={seed} yolRenk={h >= 18 ? BP.suYol : h >= 12 ? "#eac3a2" : "#e4b496"} />
        {/* 12–13 ön plan kaya + ot (z 9 / sağ seki z 8) */}
        {onPlan === "kiyi" ? <Katman r={ref} k={k} z={kayaZ}><KiyiOn t={t} />{E.kaya}</Katman> : <>
        <Katman r={ref} k={k} z={kayaZ}><OnKaya t={t} />{E.kaya}</Katman>
        <Katman r={ref} k={k} z={8}><SagSeki t={t} /></Katman></>}
        {/* 14 mürekkep çizgi (P01 kanca; P10b haritada karşılık) */}
        {cz && <g>
          {/* mürekkep çizgi: karanlık oyuktan gemi gövdesine (mekanlar §1.1); P10b harita rotasında karşılık */}
          <path d={`M${A[0]},${A[1]} Q${(A[0] + Bq[0]) / 2},${(A[1] + Bq[1]) / 2 + 22} ${Bq[0]},${Bq[1]}`} stroke={BP.murekkep} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={`${(Math.hypot(Bq[0] - A[0], Bq[1] - A[1]) + 30) * cT} 4000`} />
          {cT >= 0.999 && <circle cx={Bq[0]} cy={Bq[1] + 2} r={9} fill={BP.murekkep} />}
        </g>}
        {E.on}
        {/* 15 atmosfer: tuz zerresi (ışık tarafında, yavaş sağa) */}
        {Array.from({ length: 40 }).map((_, i) => { const x = 420 + ((rr(`tz${i}`) * 700 + t * (6 + rr(`tzv${i}`) * 8)) % 700), y = 560 + rr(`tzy${i}`) * 900 + Math.sin(t + i) * 4; return <circle key={i} cx={x} cy={y} r={1.2 + rr(`tzr${i}`) * 1.2} fill="#efe0cc" opacity={0.35} />; })}
      </Isleme></RenkKaydi>
    </svg>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const g = param<Gorunum>(plan, "gorunum", "kiyidan-ada");
  if (!KURULU.includes(g)) throw new Error(`[LIMAN] görünüm "${g}" kurulmadı (kurulu: ${KURULU.join(", ")}) — kalibrasyon turu 1`);
  if (BOLUM_G.includes(g)) return <LimanBolumSahne g={g} plan={plan} p={p} kilit={kilit} />;
  if (g !== "kiyidan-ada") return <LimanYeniSahne g={g} plan={plan} p={p} kilit={kilit} />;
  return <KiyidanAda plan={plan} p={p} kilit={kilit} />;
};
export const LIMAN: Sablon = { Sahne, arsiv: () => "litografi" };
