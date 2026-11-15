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

type Gorunum = "kiyidan-ada" | "ada-rihtim" | "karsi-kiyi" | "rihtim-yan" | "hangar-yakin" | "enkaz";
const KURULU: Gorunum[] = ["kiyidan-ada"];

// görünüm kaydı: referans (dekor) kamera = sahne planı ekran konumlarının ölçüldüğü kamera (P01 kapak karesi)
// P01: göz deniz +50 m, b 190°, 375 mm (F 11 250), tilt −1.03° → göz hizası y 758, su hattı (Z 2000) y ≈ 1040.
export const LIMAN_KAYIT: Record<"kiyidan-ada", { ref: Kamera25; b: number }> = {
  "kiyidan-ada": { b: 190, ref: { kare: [0], konum_yol: [[-0.15, 50, 3]], yon_yol: [[0, -1.027]], lens_mm: [375], odak_z: [2000], diyafram: 36 } },
};
const GEMI_Z = 2000, GEMI_X0 = 190; // baş ekran x (ref)

// ---------- uzak dekor (ref px) ----------
// sırt profili: seed'li tepe kümeleri (Gauss tümsekleri) + küçük pürüz; dünyaya (plaka px) bağlı
const sirtNokta = (x0: number, x1: number, taban: number, tepeler: [number, number, number][], seed: string, puruz = 3): P2[] => {
  const A: P2[] = [];
  for (let x = x0; x <= x1; x += 6) {
    let y = taban; for (const [c, h, w] of tepeler) y -= h * Math.exp(-(((x - c) / w) ** 2));
    y += Math.sin(x * 0.09 + rr(`${seed}p`) * 6) * puruz * 0.6 + (rr(`${seed}${Math.round(x / 18)}`) - 0.5) * puruz;
    A.push([x, y]);
  }
  return A;
};
const Sirt: React.FC<{ A: P2[]; alt: number; renk: string; golge?: string; bant?: number }> = ({ A, alt, renk, golge, bant = 3 }) => (
  <g>
    <path d={`M${A[0][0]},${alt} L${pts(A)} L${A[A.length - 1][0]},${alt} Z`} fill={renk} />
    {/* güneş sağda: sağa bakan (inen) yamaçlarda sıcak bant, sola bakan yamaçlarda koyu yüz */}
    {golge && <path d={`M${A[0][0]},${alt} L${pts(A.map((q) => [q[0] + 14, q[1] + 22] as P2))} L${A[A.length - 1][0]},${alt} Z`} fill={golge} opacity={0.28} />}
    {bant > 0 && A.slice(1).map((q, i) => (q[1] > A[i][1] + 0.3 ? <line key={i} x1={A[i][0]} y1={A[i][1] + bant / 2} x2={q[0]} y2={q[1] + bant / 2} stroke={BP.sirtBant} strokeWidth={bant} strokeLinecap="round" /> : null))}
  </g>
);
// Meis evleri: bitişik, farklı yükseklik/genişlik/renk; kontrajur → cephe gölgede (buğulu), sağ yan duvar ışık şeridi, çatı ışıkta
const Evler: React.FC<{ x0: number; x1: number; taban: (x: number) => number; hMin: number; hMax: number; seed: string; bugu: number; bosluk?: number }> = ({ x0, x1, taban, hMin, hMax, seed, bugu, bosluk = 0.12 }) => {
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
const Kale: React.FC = () => {
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
const Bayrak: React.FC<{ t: number }> = ({ t }) => {
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
      const oran = sx < 360 ? 0.05 : sx < 720 ? 0.17 : 0.42, isik = r0 < oran;
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
const UST: P2[] = [[-60, 1078], ...kirik([-20, 1072], [150, 1080], 4, 7, "ok1"), ...kirik([150, 1080], [360, 1112], 4, 8, "ok2"), ...kirik([360, 1112], [520, 1196], 3, 8, "ok3"), [560, 1262]];
const KAS: P2[] = [[560, 1262], [470, 1300], [330, 1306], [190, 1318], [40, 1312], [-60, 1320]]; // üst düzlem → ön yüz kırığı
const ON_KAYA: P2[] = [...UST, [600, 1380], [628, 1560], [640, 1760], [668, 2000], [-60, 2000]];
export const _OYUK: P2[] = [[30, 1196], [80, 1176], [150, 1168], [230, 1172], [300, 1184], [348, 1206], [330, 1226], [270, 1240], [190, 1252], [110, 1250], [56, 1232]];
export const OYUK_MERKEZ: P2 = [190, 1205];
const OnKaya: React.FC<{ t: number }> = ({ t }) => {
  // ön yüz: açılı kırık fasetler (kütük/varil okunmasın) — her faset farklı gölge değeri
  // yamaç kayası: sağa-aşağı alçalan kireçtaşı tabakaları (her basamağın üst kenarı ışıkta), kütük/varil okunmaz
  const tab = (dy: number, w: number): P2[] => [[-60, 1320 + dy], [150, 1330 + dy * 1.05], [330, 1350 + dy * 1.1], [520, 1420 + dy * 1.15], [700, 1520 + dy * 1.2]].map((q, i) => [q[0] + (rr(`tb${dy}${i}`) - 0.5) * 30, q[1] + (rr(`tby${dy}${i}`) - 0.5) * w] as P2);
  const fas: [P2[], string][] = [0, 110, 230, 360, 500].map((dy, i) => { const u = tab(dy, 20), d = tab(dy + 120, 20); return [[...u, ...d.reverse()], ["#bea08c", "#b0947f", "#a08680", "#94797c", "#856e7a"][i]] as [P2[], string]; });
  return (
    <g strokeLinejoin="round">
      <path d={`M${pts(ON_KAYA)} Z`} fill={BP.tasOrta} />
      <path d={`M${pts([[560, 1262], [600, 1380], [628, 1560], [640, 1760], [668, 2000], [600, 2000], [560, 1700], [520, 1480], [470, 1300]])} Z`} fill={BP.tasGolge} />
      <clipPath id="okKlip"><path d={`M${pts(ON_KAYA)} Z`} /></clipPath>
      <g clipPath="url(#okKlip)">{fas.map(([q, c], i) => <g key={i}><path d={`M${pts(q)} Z`} fill={c} />
        <path d={`M${pts(q.slice(0, 5))}`} stroke={mix(BP.tasOrta, BP.kenar, 0.35)} strokeWidth={5} fill="none" />
        <path d={`M${pts(q.slice(0, 5).map((v) => [v[0], v[1] + 14] as P2))}`} stroke="#4a3a36" strokeWidth={4} fill="none" opacity={0.7} /></g>)}</g>
      {/* üst düzlem (ışık) */}
      <path d={`M${pts([...UST, ...KAS.slice(1)])} Z`} fill={BP.tasOrta} />
      <path d={`M${pts([[300, 1110], [360, 1112], [450, 1150], [520, 1196], [560, 1262], [470, 1298], [400, 1236], [340, 1150]])} Z`} fill={BP.tasIsik} />

      <path d={`M${pts(UST.slice(1))}`} stroke={BP.kenar} strokeWidth={5} fill="none" />

      <path d="M560,1262 L600,1380 L628,1560 L640,1760" stroke={BP.kenar} strokeWidth={4} fill="none" opacity={0.85} />
      {/* karren: üst kenardan inen kısa, sivrilen erime olukları (paralel değil) */}
      {([] as number[][]).map(([x, y, L, e], i) => <g key={i}>
        <path d={`M${x - 7},${y} L${x + e},${y + L} L${x + 7},${y} Z`} fill={BP.tasDerin} />
        <path d={`M${x + 7},${y} L${x + e + 1},${y + L}`} stroke={mix(BP.tasOrta, BP.kenar, 0.3)} strokeWidth={3} />
      </g>)}
      {/* çatlaklar */}
      <path d="M210,1340 L232,1400 L214,1450 M410,1330 L392,1390 L420,1440 L408,1500" stroke="#3a3454" strokeWidth={3} fill="none" />
      <path d={`M${pts([[150, 1480], [214, 1470], [250, 1500], [206, 1520], [160, 1510]])} Z`} fill={BP.toprak} />
      <path d={`M${pts([[404, 1286], [446, 1280], [470, 1296], [430, 1302]])} Z`} fill={BP.toprak} />
      {/* keskin kırık kenarlar + karst gözenekleri (erime çukurcukları) */}
      {Array.from({ length: 70 }).map((_, i) => { const x = rr(`gz${i}`) * 560, y = 1100 + rr(`gzy${i}`) * 760 + x * 0.2, r = 2 + rr(`gzr${i}`) * 4; return <g key={`gz${i}`}><ellipse cx={x} cy={y} rx={r} ry={r * 0.6} fill="#5e4c50" opacity={0.55} /><path d={`M${x - r},${y + r * 0.2} A${r},${r * 0.6} 0 0 0 ${x + r},${y + r * 0.2}`} stroke={BP.kenar} strokeWidth={1.6} fill="none" opacity={0.7} /></g>; })}
      <path d="M200,1340 L240,1420 L215,1480 M380,1400 L355,1470 L392,1540 M100,1560 L140,1640" stroke="#4a3a36" strokeWidth={4} fill="none" />
      {/* ot sapları (geçen yazdan) + genç yeşil tutam; meltem sağa (rüzgâr +0.57) */}
      {Array.from({ length: 9 }).map((_, i) => { const bx = 10 + i * 64 + rr(`ots${i}`) * 26; const by = UST.reduce((m, q) => (Math.abs(q[0] - bx) < Math.abs(m[0] - bx) ? q : m), UST[0])[1] + 4;
        return <g key={i}>{[0, 1, 2, 3, 4].map((j) => { const L = 40 + rr(`otl${i}${j}`) * 70, a = -0.45 + j * 0.24 + Math.sin(t * 1.3 + i) * 0.05 + 0.22;
          return <path key={j} d={`M${bx + j * 3},${by} Q${bx + j * 3 + a * L * 0.3},${by - L * 0.6} ${bx + j * 3 + a * L},${by - L}`} stroke={j % 2 ? BP.ot : BP.maki} strokeWidth={3.5} fill="none" strokeLinecap="round" />; })}
          <path d={`M${bx + 6},${by} q${8},${-40} ${26},${-58}`} stroke={BP.kenar} strokeWidth={2} fill="none" /></g>; })}
    </g>
  );
};
const SagSeki: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <path d={`M${pts([[740, 2000], [770, 1840], [860, 1770], [990, 1742], [1140, 1736], [1140, 2000]])} Z`} fill={BP.tasGolge} />
    <path d="M770,1840 L860,1770 L990,1742 L1140,1736" stroke={BP.kenar} strokeWidth={4} fill="none" />
    {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={850 + i * 52 + rr(`mk${i}`) * 20} cy={1745 - rr(`mky${i}`) * 40} rx={50} ry={38} fill={i % 2 ? BP.maki : BP.makiGolge} />)}
    {[0, 1, 2].map((i) => <path key={`k${i}`} d={`M${840 + i * 70},${1716 - i * 6} a46,34 0 0 1 64,-12`} stroke={BP.kenar} strokeWidth={3} fill="none" />)}
    {Array.from({ length: 6 }).map((_, i) => { const bx = 820 + i * 46, L = 80 + rr(`sso${i}`) * 50, a = 0.3 + Math.sin(t * 1.1 + i) * 0.05; return <path key={`s${i}`} d={`M${bx},1760 Q${bx + a * 30},${1760 - L * 0.6} ${bx + a * L},${1760 - L}`} stroke={BP.ot} strokeWidth={3.5} fill="none" />; })}
  </g>
);

// ---------- KAPAK: kiyidan-ada ----------
const KiyidanAda: React.FC<{ plan: Plan; p: number; kilit: SablonProps["kilit"] }> = ({ plan, p, kilit }) => {
  const kayit = LIMAN_KAYIT["kiyidan-ada"], ref = kamera25(undefined, 0, kayit.ref);
  const k = kamera25(param<Partial<Kamera25>>(plan, "kamera25", {}), p, kayit.ref);
  const t = p / 60, durum = param<GemiDurum>(plan, "gemi_durum", "demirli"), h = param<number>(plan, "gun_yuksekligi", 22);
  const gok = gokSutun(h), seed = param<number>(plan, "seed", 181);
  const pxm = ref.F / GEMI_Z, wl = izd(ref, [0, 0, GEMI_Z])!.y;
  const cz = param<{ bas: number; bit: number; ilk?: number } | null>(plan, "cizgi_mevzi", null);
  // mürekkep çizgi: oyuktan (kaya plakası, z 9) gemi gövdesine (gemi plakası) — iki uç da kendi plakasıyla hareket eder
  const kayaZ = 9, A = plaka(ref, k, kayaZ).T(OYUK_MERKEZ), Bq = plaka(ref, k, GEMI_Z).T([560, wl - 16]);
  const cT = cz ? interpolate(p, [cz.bas, cz.bit], [cz.ilk ?? 0.1, 1], { ...cl }) : 0;
  const KIYI: P2 = plaka(ref, k, kayaZ).T([500, 1230]); // ön kayanın denize bakan kırık kenarı (karşı kıyı)
  kilit.push({ ad: "çizgi kıyı ucu", p: plaka(ref, k, 9).T([500, 1230]), tur: "kurulum" }, { ad: "çizgi gemi ucu", p: Bq, tur: "kurulum" });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <RenkKaydi><Isleme aci={105}>
        {/* 0–1 gök + bulut (sonsuz: kamera ötelemesinden etkilenmez) */}
        <Katman r={ref} k={k} z={1e7}><Gok5 sinir={[200, 330, 440, 525]} renk={gok} seed={seed} />
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
          <g transform={`translate(${GEMI_X0} ${wl + 2})`}><GemiYansima pxm={pxm} seed={seed} /></g>
          <g transform={`translate(${GEMI_X0} ${wl})`}><KonturTitreme derinlik="uzak" seed={seed + 2} olcek={0.8}><GemiProfil pxm={pxm} durum={durum} seed={seed} /></KonturTitreme></g>
          {(durum === "vurulmus" || durum === "yanan") && <g><Duman taban={[GEMI_X0 + 95 * pxm, wl - 12 * pxm]} t={t} hiz={durum === "yanan" ? 70 : 40} genis0={durum === "yanan" ? 30 : 7} genis1={durum === "yanan" ? 150 : 40} ruz={0.57} seed="lmd" boy={900} />
            {durum === "yanan" && <Alev taban={[GEMI_X0 + 95 * pxm, wl - 11.4 * pxm]} gen={80} boy={95} t={t} ruz={0.57} seed="lma" kontur={1.5} />}</g>}
        </Katman>
        {/* 11 ön su: taban (deniz düzlemi, ekranda izdüşümle) + dünya satırları */}
        {(() => { const y0 = izd(k, [0, 0, GEMI_Z])!.y; return <rect x={-10} y={y0 - 2} width={1100} height={1940 - y0} fill={mix(BP.su, BP.bugu, 0.1)} />; })()}
        <SuOn ref={ref} k={k} t={t} seed={seed} yolRenk={h >= 18 ? BP.suYol : h >= 12 ? "#eac3a2" : "#e4b496"} />
        {/* 12–13 ön plan kaya + ot (z 9 / sağ seki z 8) */}
        <Katman r={ref} k={k} z={kayaZ}><OnKaya t={t} /></Katman>
        <Katman r={ref} k={k} z={8}><SagSeki t={t} /></Katman>
        {/* 14 mürekkep çizgi (P01 kanca; P10b haritada karşılık) */}
        {cz && <g>
          <path d={`M${Bq[0]},${Bq[1]} Q${(Bq[0] + KIYI[0]) / 2},${(Bq[1] + KIYI[1]) / 2 + 24} ${KIYI[0]},${KIYI[1]}`} stroke={BP.murekkep} strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray={`${(Math.hypot(KIYI[0] - Bq[0], KIYI[1] - Bq[1]) + 20) * cT} 4000`} />
          <circle cx={Bq[0]} cy={Bq[1]} r={7} fill={BP.murekkep} />
          {cT >= 0.999 && <circle cx={KIYI[0]} cy={KIYI[1]} r={9} fill={BP.murekkep} />}
        </g>}
        {/* 15 atmosfer: tuz zerresi (ışık tarafında, yavaş sağa) */}
        {Array.from({ length: 40 }).map((_, i) => { const x = 420 + ((rr(`tz${i}`) * 700 + t * (6 + rr(`tzv${i}`) * 8)) % 700), y = 560 + rr(`tzy${i}`) * 900 + Math.sin(t + i) * 4; return <circle key={i} cx={x} cy={y} r={1.2 + rr(`tzr${i}`) * 1.2} fill="#efe0cc" opacity={0.35} />; })}
      </Isleme></RenkKaydi>
    </svg>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const g = param<Gorunum>(plan, "gorunum", "kiyidan-ada");
  if (!KURULU.includes(g)) throw new Error(`[LIMAN] görünüm "${g}" kurulmadı (kurulu: ${KURULU.join(", ")}) — kalibrasyon turu 1`);
  return <KiyidanAda plan={plan} p={p} kilit={kilit} />;
};
export const LIMAN: Sablon = { Sahne, arsiv: () => "litografi" };
