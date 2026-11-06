import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Kukla, FRANCOIS, LOUIS, Palet, Poz } from "../../../rig/Kukla";
import { AYAK_TABAN, dunyaya, elDunya, kolIK } from "../../../rig/kinematik";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { TasDuvar } from "../../../doku/TasDuvar";
import { AhsapYuzey } from "../../../doku/AhsapYuzey";
import { Siluet } from "../../../doku/Siluet";
import { AciklikIsigi, Golge, Isik } from "../../../doku/Isik";
import { KemerliPencere, Kornis, Pilastr } from "../../../doku/Mimari";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import { oda, ODALAR, sz } from "../../../doku/perspektif";
import { BL, DOKU_SEED, Esleme, P, dikdortgen, dortgen, ink, karistir, lerp, poly, rnd, tonla } from "../../../doku/sabitler";
import { FormulYazisi, IsimEtiketi } from "../../../components/EkranYazisi";
import { serif } from "../../../theme";
import { KATIP, TUCCAR } from "../palet";

// ===== SB2-BORSA · P02 · BORSA (Bordeaux, öğle) — plan karesi p = mutlak − 156; stil karesi p 120 = mutlak 276 =====
// A2: geniş-kısa neoklasik salon (pilastr + korniş, sol duvarda üç KEMERLİ pencere, sağda kemerli giriş + sarkık
// tricolore, estrad + merdiveni, ön sağda ahşap korkuluk, sol önde sütun gövdesi). Işık TEK güneşten: pencere
// yamaları zeminde, huzmeler, tüm temas gölgeleri sağa (izdusum). Tüccar ayrı yüz/şapka/kostüm; kalabalık iki tonlu
// siluet + sıcak kenar ışığı. Ön plan "kafa lekeleri" kaldırıldı (ufuk–ölçek kuralı).
// Dolly cs 1.00→1.18, cy 0→−60; tahta başlığı dünya y≈562 → dolly sonunda ekran y≈430 (P03 MATCH).
export const SB2_BORSA_SURE = 204;
export const P02_TEMAS = { tebesirCizirti: [30, 88], tebesirKirilir: 90, sekme1: 102, sekme2: 114, yarimTebesir: 176 } as const;

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const S = DOKU_SEED.borsa;
const O = oda(ODALAR.borsa);
const DUVAR_H = 2600;
const ARKA = { x0: 190, x1: 890, y: 1030 };
const TAHTA = { x: 340, y: 520, w: 400, h: 200 };
const ESTRAD = { z1: 5.0, z2: 7, u1: 0.3, u2: 0.7, H: 128, basamak: 64 };
// TEK güneş: sol duvardaki kemerli pencerelerden; h px yükseklikteki noktanın gölgesi (+0.3h, +0.05h) → sağa, kısa
const GUNES: Isik = { tip: "yonlu", ad: "güneş (sol pencereler)", yon: [0.3, 0.05], renk: "#ffd98f" };
const BAL = "#6a5030"; // gölgeler bal rengi (asla gri/siyah)

const yer = (z: number, u: number, ek = 0) => { const [x, y] = O.zemin(z, u); const s = O.olcek(z); return { x, y: y + AYAK_TABAN * s - ek * s, s, zx: x, zy: y - ek * s }; };
const dur = (x: number, y: number, s: number, f: 1 | -1, ek: Partial<Poz> = {}): Poz => ({
  x, y, scale: s, facing: f, thighF: -3, kneeF: 3, thighB: 4, kneeB: 2, shF: 4, elF: -10, shB: 6, elB: -12, tails: 1, breathe: 0, blinkF: 0, blinkB: 0, hat: null, cane: null, ...ek,
});
// sol duvar eşlemesi: t = sz(z) derinlik, v = 0 üst … 1 zemin
const solDuvar = (t: number, v: number): P => { const x = lerp(-100, ARKA.x0, t), yf = lerp(1700, ARKA.y, t), s = lerp(1.15, 0.6, t); return [x, yf - (1 - v) * DUVAR_H * s]; };
const sagDuvar = (t: number, v: number): P => { const x = lerp(1180, ARKA.x1, t), yf = lerp(1700, ARKA.y, t), s = lerp(1.15, 0.6, t); return [x, yf - (1 - v) * DUVAR_H * s]; };
// duvarda (z1..z2, H1..H2) parçası için yerel eşleme
const duvarParca = (duvar: typeof solDuvar, z1: number, z2: number, Hust: number, Halt: number): Esleme => (u, v) => duvar(lerp(sz(z1), sz(z2), u), 1 - lerp(Hust, Halt, v) / DUVAR_H);

// kompars: ana kadronun yüzünü kopyalamaz
const TUCCAR_V: Palet = { ...TUCCAR, hair: "#9a958a", sideburn: 1.8, biyik: "yok", sakal: true, sapka: "genis", burun: 1.2, hat: "#4a3a26", hatBand: "#2a2016", coat: "#7a5a2e", coatDark: "#54401f", coatLight: "#9a7844", vest: "#a58a4a", vestDark: "#7a6430" };
const KOMPARS: Palet[] = [
  { ...KATIP, sapka: "silindir", biyik: "yok" }, { ...TUCCAR, sapka: "genis", biyik: "duz" }, { ...KATIP, sapka: "genis", sakal: true, biyik: "yok" }, { ...TUCCAR, sapka: "silindir", burun: 1.15 },
];
const KALABALIK: [number, number][] = [[2.05, 0.06], [2.2, 0.92], [2.75, 0.8], [2.9, 0.12], [3.3, 0.38], [3.5, 0.9], [4.0, 0.16], [4.2, 0.62], [4.8, 0.08], [5.0, 0.88], [5.7, 0.22], [6.1, 0.8]];
const kalabalikTon = (z: number): [string, string] => z < 2.6 ? ["#4a3a2a", "#7a6448"] : z < 4 ? ["#6a5844", "#9a8668"] : ["#8a7860", "#b4a286"];

export const Sb2Borsa: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  const ease = Easing.inOut(Easing.cubic);
  const cs = interpolate(p, [0, 204], [1.0, 1.18], { ...cl, easing: ease });
  const cy = interpolate(p, [0, 204], [0, -60], { ...cl, easing: ease });
  const kat = `translate(540,${960 + cy}) scale(${cs}) translate(-540,-960)`;
  const ekran = (q: P): P => [540 + (q[0] - 540) * cs, 960 + cy + (q[1] - 960) * cs];
  const don = interpolate(p, [96, 126], [0, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // ----- ana karakterler (z 1.6/1.7: yüzler telefonda okunur, ayaklar alt 420'nin üstünde) -----
  const tY = yer(1.6, 0.2), fY = yer(1.6, 0.4), lY = yer(1.7, 0.66);
  const tuccar = dur(tY.x, tY.y, tY.s * 0.95, 1, { lookX: 0.6, lookY: -0.6 * don, headTilt: -6 * don, agiz: don > 0.5 ? "O" : "gulumse", browF: 0.8 * don, browB: 0.8 * don, shF: 10, elF: -20 });
  const tOmuz = dunyaya(tuccar, [50, -352]);
  const fr0 = dur(fY.x, fY.y, fY.s, -1, { lean: 2, lookX: 0.8, lookY: 0.1, headTilt: 4, agiz: "gulumse", browF: 0.5, browB: 0.4, shB: 10, elB: -24 });
  const fIK = kolIK(fr0, [tOmuz[0], tOmuz[1] + 4], true, [0, -8]);
  const francois: Poz = { ...fr0, shF: fIK.sh, elF: fIK.el };
  const PUP = { z: 1.55, u: 0.6, yuz: 300 };
  const pY = yer(PUP.z, PUP.u);
  const defterUc: P = [pY.zx + 4 * pY.s, pY.zy - (PUP.yuz + 6) * pY.s];
  const lo0 = dur(lY.x, lY.y, lY.s, -1, { lean: 7, headTilt: 16, lookX: 0.5, lookY: 1, browF: -0.5, browB: -0.5, agiz: "dinlen", blinkF: 0.45, blinkB: 0.45 });
  const lIK = kolIK(lo0, defterUc, true, [6, 10]);
  const lIKb = kolIK(lo0, [defterUc[0] + 40 * lY.s, defterUc[1] + 4 * lY.s], false);
  const louis: Poz = { ...lo0, shF: lIK.sh, elF: lIK.el, shB: lIKb.sh, elB: lIKb.el };
  const kalemEl = elDunya(louis, true, [6, 10]);

  const PENC = [1.85, 2.75, 3.9];
  const PEN_H = [1150, 380]; // kemer tepesi/denizlik yüksekliği (birim): kemerler kadrajda okunur
  const pencereM = (z: number) => duvarParca(solDuvar, z - 0.3, z + 0.3, PEN_H[0], PEN_H[1]);
  const pencereKose = (z: number) => [[z - 0.3, PEN_H[0]], [z + 0.3, PEN_H[0]], [z + 0.3, PEN_H[1]], [z - 0.3, PEN_H[1]]].map(([zz, H]) => ({ p: solDuvar(sz(zz), 1 - H / DUVAR_H), ayak: O.zemin(zz, 0), h: H * O.olcek(zz) }));
  const kisi = (y: ReturnType<typeof yer>, boy = 620) => ({ ayak: [y.zx, y.zy] as P, h: boy * y.s });

  const fSapka = ekran(dunyaya(francois, [12, -592]));
  const lSapka = ekran(dunyaya(louis, [12, -604]));
  const etiketY = (h: P) => h[1] - 30 - 104;
  const kilit: KilitNokta[] = [
    { ad: "François ayak", p: ekran([fY.zx, fY.zy]), tur: "ayak" }, { ad: "Louis ayak", p: ekran([lY.zx, lY.zy]), tur: "ayak" }, { ad: "tüccar ayak", p: ekran([tY.zx, tY.zy]), tur: "ayak" },
    { ad: "tebeşir/tahta", p: ekran([TAHTA.x + TAHTA.w * 0.62, TAHTA.y + 170]), tur: "dokunus" }, { ad: "PARIS başlığı", p: ekran([540, 562]), tur: "kurulum" },
    { ad: "Louis defter", p: ekran(defterUc), tur: "kurulum" }, { ad: "tebeşir parçası", p: ekran(O.zemin(4.75, 0.47)), tur: "temas" },
    { ad: "François etiketi", p: [fSapka[0], etiketY(fSapka) + 52], tur: "yazi" }, { ad: "Louis etiketi", p: [Math.min(1000 - 175, lSapka[0]), etiketY(lSapka) + 52], tur: "yazi" },
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: "#3a2c1c" }}>
      <ArsivKatmani mod="gunduz">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <defs>
              <linearGradient id="b2pen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fffaf0" /><stop offset="1" stopColor="#fff1c8" /></linearGradient>
              <linearGradient id="b2on" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a2a1a" stopOpacity={0} /><stop offset="1" stopColor="#3a2a1a" stopOpacity={0.5} /></linearGradient>
              <filter id="b2bulanik" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={12} /></filter>
              <filter id="b2toz" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={10} /></filter>
              <filter id="b2tebesir"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={1} seed={S} /><feDisplacementMap in="SourceGraphic" scale={2.5} xChannelSelector="R" yChannelSelector="G" /></filter>
              <filter id="b2rakam"><feTurbulence type="fractalNoise" baseFrequency="0.18" numOctaves={2} seed={S + 3} /><feDisplacementMap in="SourceGraphic" scale={13} xChannelSelector="R" yChannelSelector="G" /></filter>
            </defs>
            <g transform={kat}>
              <KonturTitreme derinlik="orta" seed={S}>
                {/* ===== arka duvar: TAS-BDX bal tonu ===== */}
                <TasDuvar m={(u, v) => [ARKA.x0 + u * (ARKA.x1 - ARKA.x0), -400 + v * (ARKA.y + 400)]} boyut={[1170, 2400]} tip="bdx" seed={S} derinlik="orta" yogunluk={0.75} taban="#d9c290" />
                {/* saçak korniş (üst) + tahta üstü küçük korniş */}
                <Kornis m={dikdortgen(ARKA.x0, 70, ARKA.x1 - ARKA.x0, 60)} renk="#ecdcb2" />
                <Kornis m={dikdortgen(TAHTA.x - 40, TAHTA.y - 62, TAHTA.w + 80, 30)} renk="#ecdcb2" />
                {/* iyonik pilastrlar tahtanın iki yanında */}
                <Pilastr m={dikdortgen(258, 130, 56, ARKA.y - 130)} renk="#efe2bd" isik="sag" />
                <Pilastr m={dikdortgen(766, 130, 56, ARKA.y - 130)} renk="#efe2bd" isik="sag" />
                {/* ===== sol duvar + üç kemerli pencere (perspektifte daralır) ===== */}
                <TasDuvar m={(u, v) => solDuvar(u, v)} boyut={[2000, DUVAR_H]} tip="bdx" seed={S + 1} derinlik="yakin" yogunluk={0.75} taban="#ccb684" />
                {PENC.map((z, i) => <KemerliPencere key={i} m={pencereM(z)} cam="url(#b2pen)" tas="#efe2bd" kayit="#5b3d25" kemerOran={0.22} kalin={0.8} />)}
                {/* pencereler arası pilastrlar (sol duvarda) */}
                {[2.3, 3.3].map((z, i) => <Pilastr key={i} m={duvarParca(solDuvar, z - 0.06, z + 0.06, 1500, 0)} renk="#e8d9b0" isik="sag" yiv={2} />)}
                {/* ===== sağ duvar (gölgede) + kemerli giriş + sarkık tricolore ===== */}
                <TasDuvar m={(u, v) => sagDuvar(u, v)} boyut={[2000, DUVAR_H]} tip="bdx" seed={S + 2} derinlik="yakin" yogunluk={0.75} taban="#b49d6e" />
                <KemerliPencere m={duvarParca(sagDuvar, 2.4, 3.6, 1150, 0)} cam="#f4e2b4" tas="#d8c49a" kemerOran={0.25} kapi />
                <Tricolore duvar={sagDuvar(sz(2.2), 1 - 1000 / DUVAR_H)} />
                {/* ===== zemin: taş dama ===== */}
                <Dama />
                <Tahta p={p} />
                <Estrad />
              </KonturTitreme>

              {/* ===== TEK güneş: pencere yamaları zeminde + huzmeler ===== */}
              {PENC.map((z, i) => <AciklikIsigi key={i} isik={GUNES} kose={pencereKose(z)} kayit={[2, 3]} alfa={0.13} yamaAlfa={0.42} toz={i === 1 ? { sayi: 30, seed: S + i } : undefined} />)}

              {/* ===== kalabalık (uzaktan yakına): iki tonlu siluet + sıcak kenar (ışık solda) ===== */}
              {KALABALIK.map(([z, u], i) => ({ z, u, i })).sort((a, b) => b.z - a.z).map(({ z, u, i }) => {
                const g = yer(z, u);
                const f: 1 | -1 = u < 0.5 ? 1 : -1;
                const sc = g.s * (0.92 + rnd(S, `k${i}`) * 0.14);
                const pz = dur(g.x, g.y, sc, f, { lookY: -0.8 * don, headTilt: -10 * don, shF: 6 + rnd(S, `a${i}`) * 14, elF: -14 - rnd(S, `b${i}`) * 30, lean: -2 * don, thighF: -6 + rnd(S, `t${i}`) * 8 });
                const [koyu, acik] = kalabalikTon(z);
                return (
                  <g key={i}>
                    <Golge isik={GUNES} ayak={[g.zx, g.zy]} h={620 * sc} genislik={100 * sc} alfa={0.32} renk={BAL} />
                    <Siluet renk={koyu} acik={acik} kenar={{ renk: "#f2d49a", dx: -3 * sc }} kutu={[g.x - 120 * sc, g.y - 640 * sc, 240 * sc, 650 * sc]}><Kukla p={KOMPARS[i % KOMPARS.length]} pz={pz} golgesiz /></Siluet>
                  </g>
                );
              })}
              <Katip p={p} />

              {/* ===== ana karakterler (gölgeler aynı güneşten) ===== */}
              <Golge isik={GUNES} {...kisi(tY)} genislik={100 * tY.s} alfa={0.38} renk={BAL} />
              <g transform={`translate(${tY.x},${tY.y}) scale(1.12,1) translate(${-tY.x},${-tY.y})`}><Kukla p={TUCCAR_V} pz={tuccar} golgesiz /></g>
              <Golge isik={GUNES} {...kisi(fY)} genislik={100 * fY.s} alfa={0.38} renk={BAL} />
              <Kukla p={FRANCOIS} pz={francois} golgesiz />
              <Golge isik={GUNES} {...kisi(lY, 635)} genislik={100 * lY.s} alfa={0.38} renk={BAL} />
              <Kukla louis p={LOUIS} pz={louis} golgesiz />
              <CepEldiven pz={louis} />
              <Golge isik={GUNES} ayak={[pY.zx, pY.zy]} h={PUP.yuz * pY.s} genislik={110 * pY.s} alfa={0.3} renk={BAL} cekirdek={false} />
              <Pupitr x={pY.zx} y={pY.zy} s={pY.s} yuz={PUP.yuz} />
              <g transform={`translate(${kalemEl[0]},${kalemEl[1]}) rotate(-28)`}>
                <path d="M 0 0 L 2 -70 Q 14 -60 10 -20 Z" fill="#e8e0cc" stroke={ink("#e8e0cc")} strokeWidth={1.4} />
              </g>

              {/* ===== ön plan derinlik öğesi: sol önde bulanık sütun gövdesi (korkuluk bu kadrajda tek dikme gibi okunduğu için kaldırıldı) ===== */}
              <g filter="url(#b2bulanik)">
                <rect x={-150} y={-300} width={210} height={2400} fill="#c4ad7c" />
                <rect x={20} y={-300} width={40} height={2400} fill="#8a744e" />
                {[-110, -60, -10].map((x) => <rect key={x} x={x} y={-300} width={6} height={2400} fill="#9a845a" />)}
              </g>
              <rect x={-200} y={1480} width={1480} height={700} fill="url(#b2on)" />
            </g>
          </svg>
        </AbsoluteFill>
      </ArsivKatmani>
      <FormulYazisi metin="Oyun: Paris'teki tahvil fiyatı" kagitSerit />
      {/* isim etiketleri: kendi karakterinin şapkasının üstünde, bağlantı çizgisi 30 px, yüzü/başka karakteri örtmez */}
      <IsimEtiketi ad="François" sekme="#3c5ea3" x={Math.max(80, fSapka[0] - 175)} y={etiketY(fSapka)} hedef={[fSapka[0], fSapka[1] - 4]} />
      <IsimEtiketi ad="Louis" sekme="#9a3646" x={1000} y={etiketY(lSapka)} hedef={[lSapka[0], lSapka[1] - 4]} hiza="sag" />
      {guvenli && <GuvenliAlan noktalar={kilit} aktifBant="ust" baslik={`SB2-BORSA p${p}`} />}
    </AbsoluteFill>
  );
};

// sağ duvardan çıkan eğik gönder + sarkık tricolore (1830'dan beri). Gönder kenarı (mavi) gönder BOYUNCA bağlı;
// bayrak sarktığı için şeritler göndere PARALEL: mavi gönderde, beyaz ortada, kırmızı altta. Doygunluk ~%70 (göz çalmaz).
const Tricolore: React.FC<{ duvar: P }> = ({ duvar }) => {
  const [x, y] = duvar;
  const uc: P = [x - 150, y + 54];
  const band = (o0: number, o1: number, c: string) => {
    const sark = (t: number, o: number): P => [lerp(x - 6, uc[0] + 6, t) + o * 0.12, lerp(y + 4, uc[1] + 4, t) + o * (0.9 + 0.25 * Math.sin(t * Math.PI))];
    const ust = Array.from({ length: 9 }).map((_, i) => sark(i / 8, o0)), alt = Array.from({ length: 9 }).map((_, i) => sark((8 - i) / 8, o1));
    return <polygon key={c} points={poly([...ust, ...alt])} fill={c} stroke={ink(c)} strokeWidth={1} />;
  };
  return (
    <g>
      {band(0, 46, "#4a5a8a")}{band(46, 92, "#e6dfcf")}{band(92, 138, "#a24a4a")}
      <line x1={x} y1={y} x2={uc[0] - 8} y2={uc[1] + 3} stroke="#3b2412" strokeWidth={5} />
      <circle cx={uc[0] - 8} cy={uc[1] + 3} r={5} fill={BL.brass} />
    </g>
  );
};

const Dama: React.FC = () => {
  const els: React.ReactNode[] = [];
  const zs: number[] = []; for (let z = 1; z < 7.01; z += 0.3) zs.push(z);
  const N = 12;
  for (let r = 0; r < zs.length - 1; r++) for (let c = 0; c < N; c++) {
    const a = O.zemin(zs[r], c / N), b = O.zemin(zs[r], (c + 1) / N), cc = O.zemin(zs[r + 1], (c + 1) / N), d = O.zemin(zs[r + 1], c / N);
    let renk = (r + c) % 2 === 1 ? "#97875f" : "#c4b590";
    renk = tonla(renk, (rnd(S, `d${r}-${c}`) - 0.5) * 0.08);
    if (c >= 4 && c <= 7 && zs[r] > 2.6) renk = karistir(renk, "#efe2bd", 0.15);
    els.push(<polygon key={`${r}-${c}`} points={poly([a, b, cc, d])} fill={renk} stroke="#6a5a40" strokeWidth={1} strokeOpacity={0.5} />);
  }
  return <g><polygon points={poly([[-100, 1700], [ARKA.x0, ARKA.y], [ARKA.x1, ARKA.y], [1180, 1700], [1180, 2200], [-100, 2200]])} fill="#a8987a" />{els}</g>;
};

// kara tahta: başlık "PARIS · RENTE 3%" (dramatizasyon), rakam BİÇİMLİ ama okunmayan tebeşir grupları (fiyat iddiası yok)
const Tahta: React.FC<{ p: number }> = ({ p }) => {
  const { x, y, w, h } = TAHTA;
  const kirik = p >= 90;
  const toz = interpolate(p, [90, 100, 168], [0, 1, 0.5], cl);
  const grup = (r: number, c: number) => { const n = 3 + Math.floor(rnd(S, `n${r}${c}`) * 2); return Array.from({ length: n }).map((_, i) => "0123456789"[Math.floor(rnd(S, `g${r}${c}${i}`) * 10)]).join(""); };
  return (
    <g>
      <rect x={x - 14} y={y - 14} width={w + 28} height={h + 28} fill="#5b3d25" stroke={ink("#5b3d25")} strokeWidth={2} />
      <rect x={x} y={y} width={w} height={h} fill={BL.tahta} />
      {Array.from({ length: 9 }).map((_, i) => <text key={i} x={x + 30 + rnd(S, `px${i}`) * (w - 80)} y={y + 80 + rnd(S, `py${i}`) * (h - 90)} fontFamily={serif} fontWeight={900} fontSize={34} fill="#f3eddc" opacity={0.08}>{["7", "8", "½", "¾", "6", "9", "4", "¼", "5"][i]}</text>)}
      <g filter="url(#b2tebesir)">
        <text x={x + w / 2} y={y + 50} textAnchor="middle" fontFamily={serif} fontWeight={900} fontSize={38} letterSpacing={1} fill={BL.tebesir}>PARIS · RENTE 3%</text>
        <line x1={x + 40} y1={y + 64} x2={x + w - 40} y2={y + 64} stroke={BL.tebesir} strokeWidth={2.5} opacity={0.8} />
      </g>
      {/* satırlar: tarih sütunu (kısa çizgi) + rakam grupları; güçlü bozulmayla okunmaz */}
      <g filter="url(#b2rakam)">
        {[0, 1, 2, 3].map((r) => {
          const yy = y + 100 + r * 30, son = r === 3;
          return (
            <g key={r}>
              <line x1={x + 34} y1={yy - 8} x2={x + 70} y2={yy - 8} stroke={BL.tebesir} strokeWidth={3} opacity={0.8} />
              <text x={x + 96} y={yy} fontFamily={serif} fontWeight={900} fontSize={26} fill={BL.tebesir} opacity={0.85}>{grup(r, 0)}</text>
              <text x={x + 178} y={yy} fontFamily={serif} fontWeight={900} fontSize={26} fill={BL.tebesir} opacity={0.85}>{`${grup(r, 1)},${grup(r, 2).slice(0, 2)}`}</text>
              {!son && <text x={x + 300} y={yy} fontFamily={serif} fontWeight={900} fontSize={26} fill={BL.tebesir} opacity={0.85}>{grup(r, 3)}</text>}
            </g>
          );
        })}
      </g>
      <rect x={x} y={y + h - 16} width={w} height={16} fill={BL.tebesir} opacity={0.12} />
      <rect x={x - 14} y={y + h + 14} width={w + 28} height={10} fill="#7a5230" />
      {kirik && <g opacity={toz}>
        <ellipse cx={x + 300} cy={y + 186} rx={34} ry={20} fill={BL.tebesir} opacity={0.35} filter="url(#b2toz)" />
        {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={x + 300 + (rnd(S, `tx${i}`) - 0.5) * 70} cy={y + 186 + (rnd(S, `ty${i}`) - 0.3) * 44 + (p - 90) * 0.15} r={1 + rnd(S, `tr${i}`) * 2} fill={BL.tebesir} opacity={0.7} />)}
      </g>}
    </g>
  );
};

// estrad: 2 basamak + sol-arkada küçük merdiven (katip çıkışı) + basamak kenarı aşınmış
const Estrad: React.FC = () => {
  const E = ESTRAD;
  const n = (z: number, u: number, H: number) => O.nokta(z, u, H);
  const basZ = E.z1 + 0.35;
  const b1Yuz = [n(E.z1, E.u1, 0), n(E.z1, E.u2, 0), n(E.z1, E.u2, E.basamak), n(E.z1, E.u1, E.basamak)];
  const b1Ust = dortgen(n(basZ, E.u1, E.basamak), n(basZ, E.u2, E.basamak), n(E.z1, E.u2, E.basamak), n(E.z1, E.u1, E.basamak));
  const b2Yuz = [n(basZ, E.u1, E.basamak), n(basZ, E.u2, E.basamak), n(basZ, E.u2, E.H), n(basZ, E.u1, E.H)];
  const b2Ust = dortgen(n(E.z2, E.u1 + 0.02, E.H), n(E.z2, E.u2 - 0.02, E.H), n(basZ, E.u2, E.H), n(basZ, E.u1, E.H));
  const yan = (z1: number, z2: number, H: number, u: number) => [n(z1, u, 0), n(z2, u, 0), n(z2, u, H), n(z1, u, H)];
  // sol-arka merdiven: estradın sol yanına iki basamak
  const m1 = [n(6.0, E.u1 - 0.08, 0), n(6.0, E.u1, 0), n(6.0, E.u1, E.basamak), n(6.0, E.u1 - 0.08, E.basamak)];
  const m1u = [n(6.6, E.u1 - 0.08, E.basamak), n(6.6, E.u1, E.basamak), n(6.0, E.u1, E.basamak), n(6.0, E.u1 - 0.08, E.basamak)];
  return (
    <g>
      <polygon points={poly(m1u)} fill="#8a6038" stroke={ink("#7a5230")} strokeWidth={1.5} />
      <polygon points={poly(m1)} fill="#6e4a2a" stroke={ink("#7a5230")} strokeWidth={1.5} />
      <polygon points={poly(yan(E.z1, E.z2, E.basamak, E.u2))} fill="#5b3d25" />
      <polygon points={poly(yan(basZ, E.z2, E.H, E.u2))} fill="#5b3d25" />
      <polygon points={poly(b1Yuz)} fill="#7a5230" stroke={ink("#7a5230")} strokeWidth={2} />
      <AhsapYuzey m={b1Ust} boyut={[600, 80]} tur="mese" seed={S + 4} derinlik="orta" asinma={["alt"]} />
      <polygon points={poly(b2Yuz)} fill="#6e4a2a" stroke={ink("#7a5230")} strokeWidth={2} />
      <AhsapYuzey m={b2Ust} boyut={[600, 300]} tur="mese" seed={S + 5} derinlik="orta" tahta={3} asinma={["alt"]} />
    </g>
  );
};

const Katip: React.FC<{ p: number }> = ({ p }) => {
  const g = yer(5.6, 0.5, ESTRAD.H);
  const pz = dur(g.x - 18 * g.s, g.y, g.s, 1, { shF: -150, elF: -20, shB: 10, elB: -30, lookY: -0.4, headTilt: -6, lean: -2 });
  const parca = O.zemin(4.75, 0.47);
  return (
    <g>
      <Golge isik={GUNES} ayak={[g.zx, g.zy]} h={620 * g.s} genislik={100 * g.s} alfa={0.3} renk={BAL} />
      <Siluet renk="#3a2e22" acik="#6a5640" kenar={{ renk: "#f2d49a", dx: -2 }} kutu={[g.x - 120 * g.s, g.y - 640 * g.s, 240 * g.s, 650 * g.s]}><Kukla p={KATIP} pz={pz} golgesiz /></Siluet>
      {p >= 114 && <g><ellipse cx={parca[0] + 5} cy={parca[1] + 2} rx={9} ry={2.5} fill={BAL} opacity={0.4} /><rect x={parca[0] - 6} y={parca[1] - 4} width={12} height={5} rx={2} fill={BL.tebesir} transform={`rotate(14 ${parca[0]} ${parca[1]})`} /></g>}
    </g>
  );
};

const CepEldiven: React.FC<{ pz: Poz }> = ({ pz }) => (
  <g transform={`translate(${pz.x},${pz.y}) scale(${(pz.scale ?? 1) * (pz.facing ?? 1)},${pz.scale ?? 1}) translate(0,${pz.bodyY ?? 0}) rotate(${pz.lean ?? 0},0,-226)`}>
    <path d="M 26 -322 L 50 -330 L 52 -318 L 30 -312 Z" fill={BL.gloveHero} stroke="#8a7f68" strokeWidth={1.4} transform="rotate(-12 40 -322)" />
  </g>
);

const Pupitr: React.FC<{ x: number; y: number; s: number; yuz: number }> = ({ x, y, s, yuz }) => {
  const k = (dx: number, dy: number): P => [x + dx * s, y - dy * s];
  return (
    <g>
      {[-48, 48].map((dx) => <rect key={dx} x={k(dx, 0)[0] - 4 * s} y={k(0, yuz - 20)[1]} width={8 * s} height={(yuz - 20) * s} fill="#4a3220" stroke={ink("#4a3220")} strokeWidth={1.2} />)}
      <rect x={k(-48, 0)[0]} y={k(0, 90)[1]} width={96 * s} height={6 * s} fill="#4a3220" />
      <polygon points={poly([k(-66, yuz - 22), k(66, yuz - 22), k(60, yuz + 14), k(-60, yuz + 14)])} fill="#5b3d25" stroke={ink("#5b3d25")} strokeWidth={1.6} />
      <polygon points={poly([k(-54, yuz - 16), k(0, yuz - 12), k(0, yuz + 12), k(-50, yuz + 9)])} fill="#efe6d0" stroke="#5a3a22" strokeWidth={1.4} />
      <polygon points={poly([k(0, yuz - 12), k(54, yuz - 16), k(50, yuz + 9), k(0, yuz + 12)])} fill="#e9dfc9" stroke="#5a3a22" strokeWidth={1.4} />
      {[-6, 0, 6].map((d) => <line key={d} x1={k(8, yuz + d)[0]} y1={k(8, yuz + d)[1]} x2={k(44, yuz + d - 2)[0]} y2={k(44, yuz + d - 2)[1]} stroke="#2b1d10" strokeWidth={1} opacity={0.6} />)}
    </g>
  );
};
