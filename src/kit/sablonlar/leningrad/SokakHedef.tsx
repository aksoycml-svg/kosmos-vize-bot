// ===== SOKAK-LG `p03a` — onaylı hedef görsele göre (hedef/hedef-sokak.png; notlar/tur-3c) =====
// Geniş Petersburg sokağı (cephe-cephe 22 m, u ±11), kamera müzisyenin sağ omzu üstünde (C u 6.2, h 1.65), 35 mm (F 1050),
// pan −16° (sokak ekseni kadrajın sağında kaçar, x ≈ 840), tilt −3.5° (ufuk y ≈ 896). Üstte bantlı gök (korniş hatları arası).
// TEK IŞIK: alçak kış güneşi önde-sağda (yükseklik 6°, yatay yön (0.6, 0.8) → güneşe yön G). Sağ cephe sırası sokağı gölgeler;
//   - sağdaki çapraz sokaktan (sağ cephede boşluk z 6–11) geçen ışınlar karda çapraz pembe şerit çizer ve kameranın yanındaki
//     müzisyenin ellerine düşer: zemin/nokta ışıklı ⇔ z + (0.8/0.6)·(11 − u) ∈ [7, 20];
//   - sol cephelerin üst katları sağ çatıların üstünden ışık alır (h > H_sağ − 3.9);
//   - güneşin kendisi sağ cephelerin ardında: gökte ufuk ışıması (disk kadraj dışında, sağ binanın arkasında).
// Görüntüde yazı/tabela yok. Kırmızı yok. Kızak: boş, üstünde yalnız tahta su kovası (orkestra kararı).
import React from "react";
import { Tarama } from "../../../doku/Tarama";
import { karistir, rnd } from "../../../doku/sabitler";
import { kamera25, Kamera25, V3 } from "../../kamera25d";
import { GravurEl, GRAVUR_POZ, GravurPalet, GravurPoz } from "../../props/paris/GravurEl";
import { param, SablonProps } from "../../ortak";
import { BasProfil, YuzKart } from "../benmychree/Figur";
import { cr, dunya, Dunya, Hilal, Kirp, LgBaski, P2, pS } from "./lgOrtak";

const SD = 1941;
const BOSLUK: [number, number] = [6, 11];
const K_ISIK = 0.8 / 0.6;
const isikli = (u: number, z: number) => { const zp = z + K_ISIK * (11 - u); return zp >= BOSLUK[0] && zp <= BOSLUK[1]; };
export const LH = {
  gok: ["#5a64a0", "#68689a", "#8a76a2", "#ad86a6", "#cd9ca6", "#e6b6aa", "#f2ceb4"] as const,
  cephe: ["#d6b48a", "#d8a8a0", "#b7bea0", "#dcc4a6", "#c9a6ae"] as const,
  golgeKarisim: "#6c6a98", derin: "#4a4874", cam: "#2e2e52", camIsik: "#5a5a86", bant: "#c8bcb4", kaide: "#6a5a70", kaideIsik: "#a08478",
  boru: "#7e8aa8", boruKoyu: "#4e5a78", kar: "#d8d4e2", karGolge: "#9a9cc4", karDerin: "#7476a6", karKenar: "#ecd8d0",
  serit: ["#f2d4c2", "#ecc4b2", "#dca698"] as const, duman: "#c8bcc8", koyu: "#1e1c30", palto: "#26243a", paltoIsik: "#5a4a5a", kayis: "#3a2c2a",
  ekmek: "#5e4636", ekmekKenar: "#a07a5c", ekmekIc: "#4a3628", tahta: "#6b5040", tahtaG: "#3a2c28",
};

type Bina = { s: 1 | -1; z0: number; z1: number; H: number; c: number };
const binalar = (): Bina[] => {
  const out: Bina[] = [];
  for (const s of [-1, 1] as const) {
    let z = -10, i = 0, Hp = 20;
    while (z < 330) {
      const en = 15 + rnd(SD, `e${s}${i}`) * 18;
      let H = 19 + rnd(SD, `h${s}${i}`) * 2; if (Math.abs(H - Hp) < 0.4) H = Hp + 0.4;
      let z0 = z, z1 = z + en;
      if (s > 0 && z1 > BOSLUK[0] && z0 < BOSLUK[1]) { if (z0 < BOSLUK[0]) z1 = BOSLUK[0]; else { z0 = BOSLUK[1]; z1 = z0 + en; } }
      out.push({ s, z0, z1, H, c: Math.floor(rnd(SD, `c${s}${i}`) * 5) });
      z = z1; Hp = H; i++;
    }
  }
  return out;
};
const BINA = binalar();

const Cephe: React.FC<{ W: Dunya; b: Bina }> = ({ W, b }) => {
  const u = b.s * 11, { z0, z1, H } = b;
  const q = (za: number, zb: number, h0: number, h1: number, uu = u): V3[] => [[uu, h0, za], [uu, h0, zb], [uu, h1, zb], [uu, h1, za]];
  const boya = LH.cephe[b.c];
  const golge = karistir(boya, LH.golgeKarisim, 0.4); // gölgede boya kendi tonunu korur, mora kayar
  const isikH = b.s < 0 ? 20.4 - 3.9 : 99; // sol cephe üst katı sağ çatıların üstünden ışık alır
  const sMid = W.S([u, 3, Math.max(4, (z0 + z1) / 2)]);
  const aks = 3.3 + rnd(SD, `a${b.s}${z0}`) * 0.3, n = Math.max(1, Math.floor((z1 - z0 - 1.2) / aks));
  const pen: V3[][] = [];
  const kat = [1.2, 4.6, 8.2, 11.8, 15.4];
  for (let k = 0; k < n; k++) { const zc = z0 + (z1 - z0) / 2 + (k - (n - 1) / 2) * aks; for (const h of kat) pen.push(q(zc - 0.55, zc + 0.55, h + (h < 2 ? 0.6 : 0.9), h + (h < 2 ? 2.6 : 2.9))); }
  return <g strokeLinejoin="round">
    <polygon points={W.poli(q(z0, z1, 0, H))} fill={golge} />
    {isikH < H && <polygon points={W.poli(q(z0, z1, isikH, H))} fill={boya} />}
    {/* granit kaide + rustika zemin kat + kat silmeleri */}
    <polygon points={W.poli(q(z0, z1, 0, 0.8))} fill={LH.kaide} />
    {sMid > 25 && [1.25, 1.7, 2.15, 2.6, 3.05, 3.5, 3.95].map((h) => <polyline key={h} points={pS([W.E([u, h, z0]), W.E([u, h, z1])])} stroke={karistir(golge, LH.derin, 0.45)} strokeWidth={Math.max(1, Math.min(2.4, sMid / 40))} fill="none" />)}
    {[4.5, 8.1, 11.7, 15.3].map((h) => <polygon key={h} points={W.poli(q(z0, z1, h, h + 0.22))} fill={karistir(golge, "#ffffff", 0.12)} />)}
    {/* pencereler: koyu cam, söve, kağıt bant (X), 1. kat sandrik */}
    {pen.map((p, i) => {
      const E = p.map(W.E), w = Math.abs(E[1][0] - E[0][0]); if (!(w > 3)) return null;
      const lit = p[0][1] > isikH;
      const sv: V3[] = [[u, p[0][1] - 0.18, p[0][2] - 0.16], [u, p[1][1] - 0.18, p[1][2] + 0.16], [u, p[2][1] + 0.16, p[2][2] + 0.16], [u, p[3][1] + 0.16, p[3][2] - 0.16]];
      const zc = (p[0][2] + p[1][2]) / 2, ht = p[2][1];
      return <g key={i}>
        <polygon points={W.poli(sv)} fill={karistir(lit ? boya : golge, "#ffffff", 0.18)} />
        <polygon points={pS(E)} fill={LH.cam} />
        {w > 7 && <polyline points={pS([W.E([u, p[0][1], zc]), W.E([u, ht, zc])])} stroke={LH.camIsik} strokeWidth={Math.max(1, w * 0.05)} fill="none" />}
        {w > 9 && <g stroke={LH.bant} strokeWidth={Math.max(1.2, w * 0.06)} opacity={0.85}>
          <line x1={E[0][0]} y1={E[0][1]} x2={E[2][0]} y2={E[2][1]} /><line x1={E[1][0]} y1={E[1][1]} x2={E[3][0]} y2={E[3][1]} /></g>}
        {p[0][1] > 4 && p[0][1] < 6 && w > 6 && <polygon points={W.poli([[u, ht + 0.25, p[0][2] - 0.3], [u, ht + 0.25, p[1][2] + 0.3], [u, ht + 0.55, p[1][2] + 0.3], [u, ht + 0.55, p[0][2] - 0.3]])} fill={karistir(golge, LH.derin, 0.35)} />}
        {/* pervazda kar */}
        {w > 6 && <polygon points={W.poli([[u - b.s * 0.02, p[0][1] - 0.18, p[0][2] - 0.2], [u - b.s * 0.02, p[1][1] - 0.18, p[1][2] + 0.2], [u - b.s * 0.02, p[1][1] - 0.06, p[1][2] + 0.2], [u - b.s * 0.02, p[0][1] - 0.06, p[0][2] - 0.2]])} fill={LH.kar} />}
      </g>;
    })}
    {/* yağmur boruları (bina kenarlarında; dirsekli ağız, buz) */}
    {[z0 + 0.35, z1 - 0.35].map((z, i) => { const a = W.E([u - b.s * 0.15, H, z]), c = W.E([u - b.s * 0.15, 0.6, z]), m = W.E([u - b.s * 0.45, 0.35, z]), w = Math.max(1.5, 0.2 * W.S([u, 1, z]));
      return <g key={`b${i}`}><polyline points={pS([a, c, m])} stroke={LH.boruKoyu} strokeWidth={w * 1.25} fill="none" strokeLinecap="round" /><polyline points={pS([a, c, m])} stroke={LH.boru} strokeWidth={w * 0.6} fill="none" strokeLinecap="round" /></g>; })}
    {/* korniş: alt yüz taraması + üstte kar kenarı */}
    <polygon points={W.poli([[u, H - 0.7, z0], [u, H - 0.7, z1], [u - b.s * 0.6, H - 0.1, z1], [u - b.s * 0.6, H - 0.1, z0]])} fill={LH.derin} />
    <polygon points={W.poli([[u - b.s * 0.6, H - 0.1, z0], [u - b.s * 0.6, H - 0.1, z1], [u - b.s * 0.6, H + 0.25, z1], [u - b.s * 0.6, H + 0.25, z0]])} fill={LH.kar} />
    <polyline points={pS([W.E([u, 0, z0]), W.E([u, H, z0])])} stroke={LH.derin} strokeWidth={Math.max(1.5, sMid / 30)} fill="none" />
  </g>;
};

/** zemin karı: kaldırımlarda yığın sırtı, ortada hafif çiğnenmiş iz; ışık şeridi (tek kaynak) üç basamak */
const Zemin: React.FC<{ W: Dunya }> = ({ W }) => {
  const serit = (pay: number): V3[] => [[11, 0.32, BOSLUK[0] + pay], [11, 0.32, BOSLUK[1] - pay], [-11, 0.32, BOSLUK[1] - pay - K_ISIK * 22], [-11, 0.32, BOSLUK[0] + pay - K_ISIK * 22]];
  const yigin = (s: number): V3[] => { const u0 = s * 8.6, u1 = s * 11; const pts: V3[] = []; for (let z = 2; z <= 320; z *= 1.12) pts.push([u0 + s * (0.3 * Math.sin(z * 0.7)), 0.95 + 0.25 * Math.sin(z * 0.45 + s), z]); return [...pts, [u1, 0.3, 320], [u1, 0.3, 2]]; };
  const iz = Array.from({ length: 34 }, (_, i) => { const z = 3 + i * 1.6 + rnd(303, `z${i}`) * 0.4; return { u: -1.5 + Math.sin(z * 0.08) * 1.2 + (i % 2 ? 0.14 : -0.14), z }; });
  return <g>
    <polygon points={W.poli([[-11, 0.3, 1], [11, 0.3, 1], [11, 0.3, 330], [-11, 0.3, 330]])} fill={LH.karGolge} />
    <Kirp d={`M${W.poli([[-11, 0.3, 1], [11, 0.3, 1], [11, 0.3, 330], [-11, 0.3, 330]]).split(" ").join(" L")}Z`}>
      <polygon points={W.poli(serit(0))} fill={LH.serit[2]} />
      <polygon points={W.poli(serit(1.2))} fill={LH.serit[1]} />
      <polygon points={W.poli(serit(3.2))} fill={LH.serit[0]} />
    </Kirp>
    {/* iz: ayakla açılmış patika (koyu oyuklar, gölge yanağı) */}
    {iz.map((t, i) => { const c = W.E([t.u, 0.3, t.z]), s = W.S([t.u, 0.3, t.z]); const rx = 0.09 * s, ry = Math.max(1, rx * 0.22); return <ellipse key={i} cx={c[0]} cy={c[1]} rx={rx} ry={ry} fill={isikli(t.u, t.z) ? "#c48e8a" : LH.karDerin} />; })}
    {/* yan yığınlar (cephe dibinde) */}
    {[-1, 1].map((s) => <g key={s}><polygon points={W.poli(yigin(s))} fill={LH.kar} /><polyline points={pS(yigin(s).slice(0, -2).map(W.E))} stroke={LH.karKenar} strokeWidth={2.4} fill="none" /></g>)}
  </g>;
};

const Kizak: React.FC<{ W: Dunya }> = ({ W }) => {
  const u = 1.2, z = 9.5, h = 0.3, P = (du: number, dh: number, dz: number) => W.E([u + du, h + dh, z + dz]), s = W.S([u, h, z]), kw = Math.max(2, 0.035 * s);
  return <g strokeLinejoin="round" strokeLinecap="round">
    <polygon points={pS([P(-0.36, 0, -0.6), P(0.4, 0, -0.6), P(0.4, 0, 0.6), P(-0.36, 0, 0.6)])} fill={LH.karDerin} opacity={0.5} />
    {[-0.22, 0.22].map((du, i) => <g key={i}><path d={`M${pS([P(du, 0, 0.5)])} L${pS([P(du, 0, -0.42)])} Q${pS([P(du, 0, -0.62)])} ${pS([P(du, 0.17, -0.56)])}`} stroke={LH.tahtaG} strokeWidth={kw} fill="none" />
      {[-0.28, 0.32].map((dz, j) => <line key={j} x1={P(du, 0, dz)[0]} y1={P(du, 0, dz)[1]} x2={P(du, 0.17, dz)[0]} y2={P(du, 0.17, dz)[1]} stroke={LH.tahtaG} strokeWidth={kw * 0.8} />)}</g>)}
    <polygon points={pS([P(-0.26, 0.17, -0.45), P(0.26, 0.17, -0.45), P(0.26, 0.17, 0.48), P(-0.26, 0.17, 0.48)])} fill={LH.tahta} stroke={LH.tahtaG} strokeWidth={1.8} />
    {(() => { const c = P(0, 0.17, 0.05), r = 0.15 * s, hh = 0.3 * s; return <g>
      <path d={`M${c[0] - r},${c[1]} L${c[0] - r * 0.86},${c[1] - hh} L${c[0] + r * 0.86},${c[1] - hh} L${c[0] + r},${c[1]}Z`} fill={LH.tahta} stroke={LH.tahtaG} strokeWidth={1.8} />
      {[0.18, 0.8].map((t, i) => <line key={i} x1={c[0] - r * (1 - 0.14 * t)} y1={c[1] - hh * t} x2={c[0] + r * (1 - 0.14 * t)} y2={c[1] - hh * t} stroke={LH.tahtaG} strokeWidth={Math.max(1.5, r * 0.14)} />)}
      <ellipse cx={c[0]} cy={c[1] - hh} rx={r * 0.86} ry={r * 0.28} fill={LH.tahtaG} />
      <path d={`M${c[0] - r * 0.86},${c[1] - hh} Q${c[0]},${c[1] - hh - r * 1.3} ${c[0] + r * 0.86},${c[1] - hh}`} stroke={LH.tahtaG} strokeWidth={1.8} fill="none" />
    </g>; })()}
  </g>;
};

const MUZISYEN: YuzKart = { ad: "müzisyen", yas: 42, uzun: 1.06, cene: 0.55, burun: 1.08, dudak: 0.85, elmacik: 0.85, boyun: 1.0, kas: 1.1, kasAci: 3, goz: 0.8, biyik: "yok", sakal: 0.25, yara: false, toz: 0, ter: false, kirisik: 0.45, ten: "#c49c86", tenGolge: "#7a5c6a", sac: "#2a2228", baslik: "yok", kulak: 1 };
const EL_ISIK: GravurPalet = { isik: "#d8ac90", golge: "#a07a76", konturYuk: "#4a3438", konturIsik: "#9a7a70", kenar: "#f2cdb4", tarama: "#5a4040", manset: LH.palto, mansetGolge: LH.koyu };
const TUTUS: GravurPoz = { parmak: [{ a: -4, b: 40, k: 0.86 }, { a: 0, b: 48, k: 0.82 }, { a: 4, b: 56, k: 0.78 }, { a: 8, b: 62, k: 0.74 }], bas: { a: -4, b: 4, k: 1.1 } };

/** ön plan: müzisyen (sağ omuz üstü): profil baş sol kenarda (yarısı kadraj dışı), koyu palto, keman kutusu kayışı; iki el ışık şeridinde */
const Muzisyen: React.FC<{ kilit?: SablonProps["kilit"] }> = ({ kilit }) => {
  const paltoD = "M-40,1180 Q60,1130 170,1200 Q300,1250 420,1360 Q520,1450 560,1560 L760,1520 Q830,1640 840,1960 L-40,1960Z";
  const kolSag = "M560,1560 Q600,1440 650,1360 Q690,1300 720,1290 L790,1330 Q770,1400 760,1520 Q700,1700 640,1960 L520,1960Z";
  const kolSol = "M240,1600 Q330,1520 400,1480 L470,1520 Q420,1600 380,1700 L200,1800Z";
  // dilim biçimi: düz alt, düz yanlar, üstte iki yuvarlak kabuk (125 g kara ekmek); başparmak önde sol alt köşede
  const ekmek: P2[] = [[648, 1300], [640, 1200], [652, 1140], [690, 1112], [728, 1124], [760, 1104], [800, 1118], [818, 1160], [810, 1220], [814, 1296], [730, 1306]];
  if (kilit) { kilit.push({ ad: "yuz", p: [150, 960], tur: "yuz" }); kilit.push({ ad: "ekmek", p: [728, 1210], tur: "kurulum" }); kilit.push({ ad: "avuc", p: [470, 1440], tur: "dokunus" }); }
  return <g strokeLinejoin="round" strokeLinecap="round">
    {/* palto (sırt + omuz), kol dikişi kavisli, yaka; ışık şeridine bakan kenarlarda sıcak kenar */}
    <path d={paltoD} fill={LH.palto} stroke={LH.koyu} strokeWidth={3} />
    <Kirp d={paltoD}><Tarama sekil={[[-40, 1250], [180, 1240], [340, 1420], [430, 1960], [-40, 1960]]} basamak="III" aci={72} renk="#100f1e" aralik={7} kalinlik={2} seed={SD + 5} />
      <path d="M150,1220 Q260,1330 300,1500" stroke={LH.koyu} strokeWidth={3} fill="none" /></Kirp>
    <path d="M-40,1170 Q40,1100 130,1150 L170,1230 Q60,1210 -40,1260Z" fill="#2e2a44" stroke={LH.koyu} strokeWidth={2.6} />
    <Hilal d={paltoD} renk={LH.paltoIsik} dx={-6} dy={5} />
    {/* kayış: omuzdan çapraz, toka */}
    <path d="M60,1190 L130,1205 L40,1960 L-40,1960Z" fill={LH.kayis} stroke="#1c1414" strokeWidth={2.4} />
    <rect x={44} y={1560} width={50} height={60} rx={6} fill="none" stroke="#8a7a6a" strokeWidth={5} transform="rotate(8 69 1590)" />
    {/* profil baş (kulak x 40; burun ~ x 175), ışık önden (güneş sağda) */}
    <BasProfil kart={MUZISYEN} x={40} y={1000} H={330} isik="on" sicak="#e8b498" kenar="#f2cdb4" bakisY={0.5} />
    {/* sol avuç: açık, avuçta kırıntılar, biri düşüyor */}
    <path d={kolSol} fill={LH.palto} stroke={LH.koyu} strokeWidth={3} />
    <g transform="translate(430 1500) scale(1 0.62) translate(-430 -1500)"><GravurEl bilek={[430, 1500]} aci={-22} E={210} poz={GRAVUR_POZ.avuc} palet={EL_ISIK} isik={[0.6, -0.8]} taramaAci={72} /></g>
    {[[488, 1462], [512, 1470], [470, 1474], [530, 1456]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4 + (i % 2)} fill={LH.ekmek} stroke="#2e231e" strokeWidth={1.2} />)}
    {[[548, 1520], [556, 1580]].map(([x, y], i) => <circle key={`d${i}`} cx={x} cy={y} r={3.5} fill={LH.ekmek} />)}
    {/* sağ kol + elde ekmek dilimi (başparmak üstte, parmaklar altta) */}
    <path d={kolSag} fill={LH.palto} stroke={LH.koyu} strokeWidth={3} />
    <Hilal d={kolSag} renk={LH.paltoIsik} dx={-6} dy={5} />
    <GravurEl bilek={[700, 1372]} aci={-72} E={180} poz={TUTUS} palet={EL_ISIK} isik={[0.6, -0.8]} taramaAci={72} katman="arka" />
    <path d={cr(ekmek)} fill={LH.ekmek} stroke="#2a1e18" strokeWidth={2.6} />
    <Kirp d={cr(ekmek)}><path d={cr(ekmek)} fill="none" stroke={LH.ekmekIc} strokeWidth={22} />{Array.from({ length: 16 }, (_, i) => <ellipse key={i} cx={665 + rnd(125, `x${i}`) * 130} cy={1150 + rnd(125, `y${i}`) * 130} rx={2 + rnd(125, `r${i}`) * 3} ry={1.5 + rnd(125, `r${i}`) * 2} fill={LH.ekmekIc} />)}</Kirp>
    <Hilal d={cr(ekmek)} renk={LH.ekmekKenar} dx={-5} dy={5} />
    <GravurEl bilek={[700, 1372]} aci={-72} E={180} poz={TUTUS} palet={EL_ISIK} isik={[0.6, -0.8]} taramaAci={72} katman="on" />
  </g>;
};

export const SOKAK_HEDEF_KAMERA: Kamera25 = { kare: [0, 180], konum_yol: [[6.2, 1.65, 0], [6.2, 1.65, 0.1]], yon_yol: [[-16, -3.5], [-16, -3.5]], lens_mm: [35], egri: "inout", ekipman: "steadicam" };
export const SokakP03a: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const K = kamera25(param<Partial<Kamera25> | undefined>(plan, "kamera", undefined), p, SOKAK_HEDEF_KAMERA);
  const W = dunya(K);
  const ufuk = W.E([6.2 - 1000 * Math.sin(0.28), 1.65, 1000])[1];
  const sol = BINA.filter((b) => b.s < 0), sag = BINA.filter((b) => b.s > 0);
  const vp = W.E([0, 1.65, 3000]);
  return (
    <LgBaski>
      {/* gök: yedi düz basamak (litografi), ufka doğru ısınır; güneş sağ binanın ardında (ışıma, disk yok) */}
      {LH.gok.map((c, i) => <rect key={i} x={-20} y={i === 0 ? -20 : ufuk - 760 + i * 105} width={1120} height={i === 0 ? ufuk - 640 : 108} fill={c} />)}
      <rect x={-20} y={ufuk - 760 + 7 * 105} width={1120} height={400} fill={LH.gok[6]} />
      <circle cx={vp[0] + 150} cy={ufuk - 20} r={150} fill="#f6dcc2" opacity={0.55} />
      {/* uzak duman (baca), sola yatık */}
      {[[-8, 150], [-9, 95], [9, 170]].map(([u, z], i) => { const a = W.E([u, 21, z]); const pts: P2[] = Array.from({ length: 6 }, (_, k) => [a[0] - k * 9 + Math.sin(k * 1.3 + i) * 7, a[1] - k * 22] as P2); return <path key={i} d={cr(pts, false)} stroke={LH.duman} strokeWidth={4 + i} fill="none" opacity={0.65} />; })}
      {/* sokak sonu karşı bina */}
      <polygon points={W.poli([[-11, 0, 330], [11, 0, 330], [11, 18, 330], [-11, 18, 330]])} fill="#a89cb8" />
      {Array.from({ length: 4 }, (_, j) => <polyline key={j} points={pS([W.E([-10, 4 + 3.6 * j, 330]), W.E([10, 4 + 3.6 * j, 330])])} stroke="#8a80a4" strokeWidth={2} strokeDasharray="5 6" fill="none" />)}
      {/* çapraz sokağın karşı duvarı (boşluktan, güneşte) */}
      <polygon points={W.poli([[11, 0, BOSLUK[1]], [40, 0, BOSLUK[1]], [40, 19, BOSLUK[1]], [11, 19, BOSLUK[1]]])} fill={LH.cephe[1]} />
      {[...sol, ...sag].sort((a, b) => b.z1 - a.z1).map((b, i) => <Cephe key={i} W={W} b={b} />)}
      <Zemin W={W} />
      {/* uzakta tek küçük figür (ekran yüksekliğinin < %5'i: siluet, kendi kenar ışığıyla) */}
      {(() => { const a = W.E([-0.8, 0.3, 70]), s = W.S([-0.8, 0.3, 70]), h = 1.7 * s; return <g><ellipse cx={a[0]} cy={a[1]} rx={0.4 * s} ry={0.06 * s} fill={LH.karDerin} />
        <path d={`M${a[0] - 0.22 * s},${a[1]} L${a[0] - 0.24 * s},${a[1] - h * 0.62} Q${a[0]},${a[1] - h * 0.8} ${a[0] + 0.24 * s},${a[1] - h * 0.62} L${a[0] + 0.2 * s},${a[1]}Z`} fill="#3a3456" />
        <circle cx={a[0]} cy={a[1] - h * 0.88} r={0.12 * s} fill="#3a3456" /></g>; })()}
      <Kizak W={W} />
      {/* düşen kar (seed 1203) */}
      {Array.from({ length: 50 }, (_, i) => { const z = 2 + rnd(1203, `z${i}`) * 30, u = -8 + rnd(1203, `u${i}`) * 18, h = ((rnd(1203, `h${i}`) * 9 - (p / 60) * 0.35) % 9 + 9) % 9; const q = W.E([u, h, z]); return q[0] > -5 && q[0] < 1085 ? <circle key={i} cx={q[0]} cy={q[1]} r={Math.max(1.5, Math.min(4, 0.03 * W.S([u, h, z])))} fill="#ece4ea" opacity={0.85} /> : null; })}
      <Muzisyen kilit={kilit} />
    </LgBaski>
  );
};
