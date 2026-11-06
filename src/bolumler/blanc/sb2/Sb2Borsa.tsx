import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Kukla, FRANCOIS, LOUIS, Poz } from "../../../rig/Kukla";
import { AYAK_TABAN, dunyaya, elDunya, kolIK } from "../../../rig/kinematik";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { TasDuvar } from "../../../doku/TasDuvar";
import { AhsapYuzey } from "../../../doku/AhsapYuzey";
import { Huzme, TemasGolgesi } from "../../../doku/IsikKatmani";
import { Siluet } from "../../../doku/Siluet";
import { oda, ODALAR } from "../../../doku/perspektif";
import { BL, DOKU_SEED, P, dortgen, ink, karistir, lerp, poly, rnd, tonla } from "../../../doku/sabitler";
import { FormulYazisi, IsimEtiketi } from "../../../components/EkranYazisi";
import { serif } from "../../../theme";
import { KATIP, TUCCAR } from "../palet";

// ===== SB2-BORSA · P02 · BORSA (Bordeaux, öğle) — plan karesi p = mutlak − 156; stil karesi p 120 = mutlak 276 =====
// Geniş → orta yavaş dolly-in cs 1.00→1.18, cy 0→−60 (bitişte tahta başlığı "PARIS" (540,430): P03 MATCH).
// Güneş sol-üstte üç kemerli pencereden, huzmeler sağ-aşağı ~30°; gölgeler sağa, kısa, bal rengi (asla gri/siyah).
// Belirli bina kopyalanmaz (1830'lar iç düzeni bulunamadı [D]); tebeşirli tahta DRAMATİZASYON [S]. Kâğıt para yok.
export const SB2_BORSA_SURE = 204;
export const P02_TEMAS = { tebesirCizirti: [30, 88], tebesirKirilir: 90, sekme1: 102, sekme2: 114, yarimTebesir: 176 } as const;

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const S = DOKU_SEED.borsa;
const O = oda(ODALAR.borsa);
const DUVAR_H = 2600; // birim (ölçek 1)
const TAHTA = { x: 340, y: 520, w: 400, h: 228 }; // dünya koordinatı; başlık y≈562 → dolly sonunda ekran y 430
const ESTRAD = { z1: 5.0, z2: 7, u1: 0.3, u2: 0.7, H: 128, basamak: 64 };

// karakteri zemine bastır
const yer = (z: number, u: number, ek = 0) => { const [x, y] = O.zemin(z, u); const s = O.olcek(z); return { x, y: y + AYAK_TABAN * s - ek * s, s, zx: x, zy: y - ek * s }; };
const dur = (x: number, y: number, s: number, f: 1 | -1, ek: Partial<Poz> = {}): Poz => ({
  x, y, scale: s, facing: f, thighF: -3, kneeF: 3, thighB: 4, kneeB: 2, shF: 4, elF: -10, shB: 6, elB: -12, tails: 1, breathe: 0, blinkF: 0, blinkB: 0, hat: null, cane: null, ...ek,
});

// ----- kalabalık: 12 siluet, tahtaya dönmüş ve donmuş (p 96–126 dönüş, 126–168 donma) -----
const KALABALIK: [number, number][] = [[1.3, -0.02], [1.38, 1.0], [2.0, 0.1], [2.1, 0.88], [2.7, 0.76], [2.9, 0.2], [3.3, 0.42], [3.5, 0.9], [4.0, 0.14], [4.3, 0.68], [4.9, 0.1], [5.2, 0.86], [5.8, 0.2], [6.2, 0.8]];
const kalabalikRenk = (z: number) => z < 1.6 ? "#4a3c30" : z < 2.6 ? "#5a4a3c" : z < 4 ? "#7a6a58" : "#9a8a74";

export const Sb2Borsa: React.FC = () => {
  const p = useCurrentFrame();
  const ease = Easing.inOut(Easing.cubic);
  const cs = interpolate(p, [0, 204], [1.0, 1.18], { ...cl, easing: ease });
  const cy = interpolate(p, [0, 204], [0, -60], { ...cl, easing: ease });
  const kat = (k: number) => `translate(540,${960 + cy * k}) scale(${1 + (cs - 1) * k}) translate(-540,-960)`;
  const ekran = (q: P): P => [540 + (q[0] - 540) * cs, 960 + cy + (q[1] - 960) * cs];
  const don = interpolate(p, [96, 126], [0, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // ----- ana karakterler -----
  // motion kalibrasyonu: sahne planındaki z 2.2/2.3 telefonda yüzleri ~50 px bırakıyordu → z 1.75/1.85 (yüz ≈ 75 px, ayaklar alt güvenli sınırda)
  const tY = yer(1.65, 0.22), fY = yer(1.65, 0.4), lY = yer(1.75, 0.66);
  const tuccar = dur(tY.x, tY.y, tY.s * 0.92, 1, { lookX: 0.6, lookY: -0.6 * don, headTilt: -6 * don, agiz: don > 0.5 ? "O" : "gulumse", browF: 0.8 * don, browB: 0.8 * don, shF: 10, elF: -20 });
  const tOmuz = dunyaya(tuccar, [50, -352]); // tüccarın François'ya bakan üst kolunun dış yüzü (omuz başı)
  const fr0 = dur(fY.x, fY.y, fY.s, -1, { lean: 2, lookX: 0.8, lookY: 0.1, headTilt: 4, agiz: "gulumse", browF: 0.5, browB: 0.4, shB: 10, elB: -24 });
  const fIK = kolIK(fr0, [tOmuz[0], tOmuz[1] + 4], true, [0, -8]);
  const francois: Poz = { ...fr0, shF: fIK.sh, elF: fIK.el };
  // Louis: pupitr önünde, başı defterde, kaz tüyüyle yazar (kafası kalkmaz)
  const PUP = { z: 1.6, u: 0.6, yuz: 300 }; // pupitr: üst yüzey bel hizası (birim)
  const pY = yer(PUP.z, PUP.u);
  const defterUc: P = [pY.zx + 4 * pY.s, pY.zy - (PUP.yuz + 6) * pY.s];
  const lo0 = dur(lY.x, lY.y, lY.s, -1, { lean: 7, headTilt: 16, lookX: 0.5, lookY: 1, browF: -0.5, browB: -0.5, agiz: "dinlen", blinkF: 0.45, blinkB: 0.45 });
  const lIK = kolIK(lo0, defterUc, true, [6, 10]);
  const lIKb = kolIK(lo0, [defterUc[0] + 40 * lY.s, defterUc[1] + 4 * lY.s], false);
  const louis: Poz = { ...lo0, shF: lIK.sh, elF: lIK.el, shB: lIKb.sh, elB: lIKb.el };
  const kalemEl = elDunya(louis, true, [6, 10]);

  // ----- ışık: üç kemerli pencere sol duvarda; huzme sağ-aşağı -----
  const PENC = [1.9, 2.9, 4.1];
  const solDuvarM = (u: number, v: number): P => { const t = u; const x = lerp(-100, 230, t), yf = lerp(1700, 980, t), s = lerp(1.15, 0.5, t); return [x, yf - (1 - v) * DUVAR_H * s]; };
  const szOf = (z: number) => (1 - 1 / z) / (1 - 1 / 7);
  const pencereKose = (z: number) => { const a = szOf(z - 0.32), b = szOf(z + 0.32); return { a, b, alt: 1 - 520 / DUVAR_H, ust: 1 - 1500 / DUVAR_H }; };
  const sunIsik: P = [-600, 1300]; // güneşin zemin izdüşümü (sol): gölgeler sağa

  return (
    <AbsoluteFill style={{ backgroundColor: "#3a2c1c" }}>
      <ArsivKatmani mod="gunduz">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <defs>
              <linearGradient id="b2tavan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5a4428" stopOpacity={0.55} /><stop offset="1" stopColor="#5a4428" stopOpacity={0} /></linearGradient>
              <linearGradient id="b2pen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff6dc" /><stop offset="1" stopColor="#fff1c8" /></linearGradient>
              <linearGradient id="b2on" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a2a1a" stopOpacity={0} /><stop offset="1" stopColor="#3a2a1a" stopOpacity={0.55} /></linearGradient>
              <filter id="b2bulanik" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={14} /></filter>
              <filter id="b2toz" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={10} /></filter>
              <filter id="b2tebesir"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={1} seed={S} /><feDisplacementMap in="SourceGraphic" scale={2.5} xChannelSelector="R" yChannelSelector="G" /></filter>
            </defs>
            <g transform={kat(1)}>
              <KonturTitreme derinlik="orta" seed={S}>
                {/* ===== arka duvar (TAS-BDX iç cephe, iyonik pilastrlar) ===== */}
                <TasDuvar m={(u, v) => [230 + u * 620, -400 + v * 1380]} boyut={[1240, 2760]} tip="bdx" seed={S} derinlik="orta" yogunluk={0.75} taban="#d8c49a" />
                {[[246, 296], [790, 836]].map(([a, b], i) => (
                  <g key={i}>
                    <rect x={a} y={-400} width={b - a} height={1380} fill="#efe2bd" />
                    <rect x={b - (b - a) * 0.28} y={-400} width={(b - a) * 0.28} height={1380} fill="#a58f68" opacity={0.45} />
                    {/* iyonik başlık (volütlü) */}
                    <rect x={a - 8} y={130} width={b - a + 16} height={14} fill="#e8d8ae" stroke={ink("#e8d8ae")} strokeWidth={1.5} />
                    <rect x={a - 6} y={940} width={b - a + 12} height={40} fill="#cdb98e" />
                    {/* dipte ayak izi kiri */}
                    <rect x={a} y={900} width={b - a} height={40} fill="#6a5434" opacity={0.18} />
                  </g>
                ))}
                {/* saçak silmesi (arka duvar üstü) */}
                <rect x={230} y={88} width={620} height={30} fill="#e8d8ae" /><rect x={230} y={118} width={620} height={8} fill="#a58f68" opacity={0.6} />
                {/* ===== sol duvar + üç kemerli pencere ===== */}
                <TasDuvar m={solDuvarM} boyut={[2000, DUVAR_H]} tip="bdx" seed={S + 1} derinlik="yakin" yogunluk={0.75} taban="#c9b385" />
                {PENC.map((z, i) => {
                  const k = pencereKose(z);
                  const A = solDuvarM(k.a, k.ust), B = solDuvarM(k.b, k.ust), C = solDuvarM(k.b, k.alt), D = solDuvarM(k.a, k.alt);
                  const tepe = solDuvarM((k.a + k.b) / 2, k.ust - 0.06);
                  const sove = (o: number) => [lerp(A[0], B[0], -o), lerp(A[1], B[1], -o)];
                  void sove;
                  return (
                    <g key={i}>
                      <path d={`M ${D[0] - 10} ${D[1] + 14} L ${A[0] - 10} ${A[1]} Q ${tepe[0] - 8} ${tepe[1] - 30} ${B[0] + 8} ${B[1]} L ${C[0] + 8} ${C[1] + 10} Z`} fill="#efe2bd" />
                      <path d={`M ${D[0]} ${D[1]} L ${A[0]} ${A[1]} Q ${tepe[0]} ${tepe[1] - 20} ${B[0]} ${B[1]} L ${C[0]} ${C[1]} Z`} fill="url(#b2pen)" />
                      {/* kayıtlar (ceviz) */}
                      <polyline points={poly([[(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 - 20], [(D[0] + C[0]) / 2, (D[1] + C[1]) / 2]])} stroke="#5b3d25" strokeWidth={5} fill="none" />
                      {[0.3, 0.6].map((t) => <polyline key={t} points={poly([[lerp(A[0], D[0], t), lerp(A[1], D[1], t)], [lerp(B[0], C[0], t), lerp(B[1], C[1], t)]])} stroke="#5b3d25" strokeWidth={4} fill="none" />)}
                    </g>
                  );
                })}
                {/* sağ duvar (gölgede, bal rengi) */}
                <TasDuvar m={(u, v) => { const x = lerp(1180, 850, u), yf = lerp(1700, 980, u), s = lerp(1.15, 0.5, u); return [x, yf - (1 - v) * DUVAR_H * s]; }} boyut={[2000, DUVAR_H]} tip="bdx" seed={S + 2} derinlik="yakin" yogunluk={0.75} taban="#b39e72" />
                {/* ===== zemin: taş dama 60 cm, tahta önü aşınmış yol ===== */}
                <Dama />
                {/* ===== rüzgâr kadranı: sağ duvarda, perspektifle daralmış (1750 kadranının yankısı; harf yok, düşük kontrast) ===== */}
                <g transform="translate(905,560) scale(0.42,1)">
                  <circle r={68} fill="#e9dfc9" stroke="#8f774f" strokeWidth={6} />
                  {[0, 90, 180, 270].map((a) => <line key={a} x1={0} y1={-58} x2={0} y2={-44} transform={`rotate(${a})`} stroke="#8f774f" strokeWidth={4} />)}
                  <g transform="rotate(-38)"><path d="M 0 -52 L 7 0 L 0 18 L -7 0 Z" fill={BL.brass} stroke={BL.brassDark} strokeWidth={1.5} /></g>
                  <circle r={5} fill={BL.brassDark} />
                </g>
                {/* ===== fiyat tahtası (kara tahta, palimpsest) ===== */}
                <Tahta p={p} />
                {/* ===== estrad (2 basamak, ahşap, aşınmış basamak kenarı) ===== */}
                <Estrad />
              </KonturTitreme>

              {/* ===== huzmeler (pencerelerden sağ-aşağı) + zemin ışık lekeleri ===== */}
              {PENC.map((z, i) => {
                const k = pencereKose(z);
                const A = solDuvarM(k.a, k.ust), B = solDuvarM(k.b, k.ust);
                const fA = O.zemin(z - 0.25, 0.62), fB = O.zemin(z + 0.45, 0.92);
                return (
                  <g key={i}>
                    <polygon points={poly([O.zemin(z - 0.25, 0.5), O.zemin(z + 0.45, 0.7), fB, fA])} fill="#ffd98f" opacity={0.2} style={{ mixBlendMode: "screen" }} filter="url(#b2bulanik)" />
                    <Huzme kose={[A, B, fB, fA]} renk="#ffd98f" alfa={0.16} toz={i === 1 ? { sayi: 30, seed: S + i } : undefined} />
                  </g>
                );
              })}

              {/* ===== kalabalık (uzaktan yakına) ===== */}
              {KALABALIK.map(([z, u], i) => ({ z, u, i })).sort((a, b) => b.z - a.z).map(({ z, u, i }) => {
                const g = yer(z, u);
                const f: 1 | -1 = u < 0.5 ? 1 : -1;
                const tur = interpolate(don, [0, 1], [0, 1]);
                const pz = dur(g.x, g.y, g.s * (0.94 + rnd(S, `k${i}`) * 0.12), f, { lookY: -0.8 * tur, headTilt: -8 * tur, shF: 6 + rnd(S, `a${i}`) * 14, elF: -14 - rnd(S, `b${i}`) * 30, lean: -2 * tur });
                return (
                  <g key={i}>
                    <TemasGolgesi x={g.zx} y={g.zy} genislik={120 * g.s} boy={620 * g.s} isik={sunIsik} alfa={0.32} renk="#5a4428" />
                    <Siluet renk={kalabalikRenk(z)}><Kukla p={i % 2 ? TUCCAR : KATIP} pz={pz} golgesiz /></Siluet>
                  </g>
                );
              })}
              {/* katip: estradda, tahtaya yazarken tebeşir kırıldı (p 90); yarım tebeşirle donmuş */}
              <Katip p={p} />

              {/* ===== ana karakterler ===== */}
              <TemasGolgesi x={tY.zx} y={tY.zy} genislik={110 * tY.s} boy={600 * tY.s} isik={sunIsik} alfa={0.35} renk="#5a4428" />
              <Kukla p={TUCCAR} pz={tuccar} golgesiz />
              <TemasGolgesi x={fY.zx} y={fY.zy} genislik={110 * fY.s} boy={620 * fY.s} isik={sunIsik} alfa={0.35} renk="#5a4428" />
              <Kukla p={FRANCOIS} pz={francois} golgesiz />
              <TemasGolgesi x={lY.zx} y={lY.zy} genislik={110 * lY.s} boy={635 * lY.s} isik={sunIsik} alfa={0.35} renk="#5a4428" />
              <Kukla louis p={LOUIS} pz={louis} golgesiz />
              <CepEldiven pz={louis} />
              <Pupitr x={pY.zx} y={pY.zy} s={pY.s} yuz={PUP.yuz} />
              {/* kaz tüyü elde (eli takip eder), ucu defterde */}
              <g transform={`translate(${kalemEl[0]},${kalemEl[1]}) rotate(-28)`}>
                <path d="M 0 0 L 2 -70 Q 14 -60 10 -20 Z" fill="#e8e0cc" stroke={ink("#e8e0cc")} strokeWidth={1.4} />
                <line x1={0} y1={0} x2={3} y2={-74} stroke="#b9ae92" strokeWidth={1.4} />
              </g>

              {/* ön plan: sol altta bulanık sütun gövdesi, altta bulanık şapka siluetleri (ayrıntısız) */}
              <g filter="url(#b2bulanik)">
                <rect x={-200} y={-200} width={150} height={2300} fill="#8a744e" />
                <rect x={-70} y={-200} width={30} height={2300} fill="#6a5838" />
                {/* ön plan: kameraya yakın, bulanık iki silindir şapkalı omuz (ayrıntısız) */}
                <ellipse cx={330} cy={1930} rx={240} ry={190} fill="#3a2c1e" />
                <ellipse cx={330} cy={1700} rx={70} ry={86} fill="#3a2c1e" />
                <rect x={240} y={1470} width={180} height={150} rx={12} fill="#2a2018" />
                <rect x={196} y={1606} width={268} height={24} rx={12} fill="#2a2018" />
                <ellipse cx={900} cy={1960} rx={250} ry={180} fill="#3a2c1e" />
                <ellipse cx={900} cy={1760} rx={66} ry={80} fill="#3a2c1e" />
                <rect x={820} y={1550} width={160} height={130} rx={12} fill="#2a2018" />
                <rect x={780} y={1668} width={240} height={22} rx={11} fill="#2a2018" />
              </g>
              <rect x={-200} y={1320} width={1480} height={800} fill="url(#b2on)" />
              <rect x={-200} y={-300} width={1480} height={520} fill="url(#b2tavan)" />
            </g>
          </svg>
        </AbsoluteFill>
      </ArsivKatmani>
      <FormulYazisi metin="Oyun: Paris'teki tahvil fiyatı" kagitSerit />
      {/* isim etiketleri (yalnız P02): tahtayı örtmemek için başın yanına */}
      {(() => {
        // etiket şapka tepesinin üstünde, tahtanın altında: yüzleri ve tahtayı örtmez
        const fSapka = ekran(dunyaya(francois, [12, -592]));
        const lSapka = ekran(dunyaya(louis, [12, -604]));
        const tahtaAlt = ekran([0, TAHTA.y + TAHTA.h + 24])[1];
        const ey = (h: P) => Math.max(tahtaAlt + 6, h[1] - 150);
        return <>
          <IsimEtiketi ad="François" sekme="#3c5ea3" x={80} y={ey(fSapka)} hedef={[fSapka[0], fSapka[1] - 4]} />
          <IsimEtiketi ad="Louis" sekme="#9a3646" x={1000} y={ey(lSapka)} hedef={[lSapka[0], lSapka[1] - 4]} hiza="sag" />
        </>;
      })()}
    </AbsoluteFill>
  );
};

// ---------- taş dama zemin ----------
const Dama: React.FC = () => {
  const els: React.ReactNode[] = [];
  const zs: number[] = []; for (let z = 1; z < 7.01; z += 0.3) zs.push(z);
  const N = 12;
  for (let r = 0; r < zs.length - 1; r++) for (let c = 0; c < N; c++) {
    const a = O.zemin(zs[r], c / N), b = O.zemin(zs[r], (c + 1) / N), cc = O.zemin(zs[r + 1], (c + 1) / N), d = O.zemin(zs[r + 1], c / N);
    const koyu = (r + c) % 2 === 1;
    let renk = koyu ? "#97875f" : "#c4b590";
    renk = tonla(renk, (rnd(S, `d${r}-${c}`) - 0.5) * 0.08);
    const yol = c >= 4 && c <= 7 && zs[r] > 2.6; // tahta önüne giden aşınmış yol (açık)
    if (yol) renk = karistir(renk, "#efe2bd", 0.15);
    els.push(<polygon key={`${r}-${c}`} points={poly([a, b, cc, d])} fill={renk} stroke="#6a5a40" strokeWidth={1} strokeOpacity={0.5} />);
  }
  return <g><polygon points={poly([[-100, 1700], [230, 980], [850, 980], [1180, 1700], [1180, 2200], [-100, 2200]])} fill="#a8987a" />{els}</g>;
};

// ---------- kara tahta: başlık "PARIS · RENTE 3%" (dramatizasyon, fiyat iddiası yok), silinmiş eski rakam gölgeleri ----------
const Tahta: React.FC<{ p: number }> = ({ p }) => {
  const { x, y, w, h } = TAHTA;
  const kirik = p >= 90;
  const toz = interpolate(p, [90, 100, 168], [0, 1, 0.5], cl);
  const satirlar = [0, 1, 2, 3];
  return (
    <g>
      <rect x={x - 14} y={y - 14} width={w + 28} height={h + 28} fill="#5b3d25" stroke={ink("#5b3d25")} strokeWidth={2} />
      <rect x={x} y={y} width={w} height={h} fill={BL.tahta} />
      {/* palimpsest: silinmiş eski rakamlar */}
      {Array.from({ length: 9 }).map((_, i) => <text key={i} x={x + 30 + rnd(S, `px${i}`) * (w - 80)} y={y + 90 + rnd(S, `py${i}`) * (h - 100)} fontFamily={serif} fontWeight={900} fontSize={36} fill="#f3eddc" opacity={0.06}>{["7", "8", "½", "¾", "6", "9", "4", "¼", "5"][i]}</text>)}
      <g filter="url(#b2tebesir)">
        <text x={x + w / 2} y={y + 56} textAnchor="middle" fontFamily={serif} fontWeight={900} fontSize={40} letterSpacing={1} fill={BL.tebesir}>PARIS · RENTE 3%</text>
        <line x1={x + 40} y1={y + 72} x2={x + w - 40} y2={y + 72} stroke={BL.tebesir} strokeWidth={2.5} opacity={0.8} />
        {/* yazı satırları: okunmaz tebeşir karalaması (gerçek fiyat yazılmaz) */}
        {satirlar.map((r) => {
          const yy = y + 106 + r * 34, son = r === 3;
          const uz = son ? 0.55 : 0.75 + rnd(S, `s${r}`) * 0.15;
          const pts: P[] = [];
          for (let k = 0; k <= 40; k++) { const t = (k / 40) * uz; pts.push([x + 50 + t * (w - 100), yy + Math.sin(k * 1.9 + r) * 7 * (k % 3 === 0 ? 1 : 0.4)]); }
          return <polyline key={r} points={poly(pts)} stroke={BL.tebesir} strokeWidth={3} fill="none" opacity={0.85} strokeLinejoin="round" />;
        })}
      </g>
      {/* alt kenarda tebeşir tozu bandı + tebeşir yuvası */}
      <rect x={x} y={y + h - 20} width={w} height={20} fill={BL.tebesir} opacity={0.12} />
      <rect x={x - 14} y={y + h + 14} width={w + 28} height={10} fill="#7a5230" />
      {/* kırılma anı: asılı tebeşir tozu (sağ-alt çeyrek, son satırın ucunda) */}
      {kirik && <g opacity={toz}>
        <ellipse cx={x + 50 + 0.55 * (w - 100) + 10} cy={y + 208} rx={34} ry={22} fill={BL.tebesir} opacity={0.35} filter="url(#b2toz)" />
        {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={x + 50 + 0.55 * (w - 100) + 10 + (rnd(S, `tx${i}`) - 0.5) * 70} cy={y + 208 + (rnd(S, `ty${i}`) - 0.3) * 50 + (p - 90) * 0.15} r={1 + rnd(S, `tr${i}`) * 2} fill={BL.tebesir} opacity={0.7} />)}
      </g>}
    </g>
  );
};

// ---------- estrad: tahta önünde iki basamaklı ahşap platform ----------
const Estrad: React.FC = () => {
  const E = ESTRAD;
  const n = (z: number, u: number, H: number) => O.nokta(z, u, H);
  const basZ = E.z1 + 0.35;
  // ön basamak: yüz + üst
  const b1Yuz = [n(E.z1, E.u1, 0), n(E.z1, E.u2, 0), n(E.z1, E.u2, E.basamak), n(E.z1, E.u1, E.basamak)];
  const b1Ust = dortgen(n(basZ, E.u1, E.basamak), n(basZ, E.u2, E.basamak), n(E.z1, E.u2, E.basamak), n(E.z1, E.u1, E.basamak));
  const b2Yuz = [n(basZ, E.u1, E.basamak), n(basZ, E.u2, E.basamak), n(basZ, E.u2, E.H), n(basZ, E.u1, E.H)];
  const b2Ust = dortgen(n(E.z2, E.u1 + 0.02, E.H), n(E.z2, E.u2 - 0.02, E.H), n(basZ, E.u2, E.H), n(basZ, E.u1, E.H));
  const yan = (z1: number, z2: number, H: number, u: number) => [n(z1, u, 0), n(z2, u, 0), n(z2, u, H), n(z1, u, H)];
  return (
    <g>
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
  // kırılmadan sonra yarım tebeşir elde kalır; parça düşüp iki sekmeyle zemine (p 114) oturur
  const parca = O.zemin(4.75, 0.47);
  return (
    <g>
      <TemasGolgesi x={g.zx} y={g.zy} genislik={110 * g.s} alfa={0.35} renk="#4a3820" />
      <Siluet renk="#4a3c2e"><Kukla p={KATIP} pz={pz} golgesiz /></Siluet>
      {/* siyah kol koruyucusu */}
      {p >= 114 && <g><ellipse cx={parca[0] + 5} cy={parca[1] + 2} rx={9} ry={2.5} fill="#5a4428" opacity={0.4} /><rect x={parca[0] - 6} y={parca[1] - 4} width={12} height={5} rx={2} fill={BL.tebesir} transform={`rotate(14 ${parca[0]} ${parca[1]})`} /></g>}
    </g>
  );
};

const CepEldiven: React.FC<{ pz: Poz }> = ({ pz }) => (
  <g transform={`translate(${pz.x},${pz.y}) scale(${(pz.scale ?? 1) * (pz.facing ?? 1)},${pz.scale ?? 1}) translate(0,${pz.bodyY ?? 0}) rotate(${pz.lean ?? 0},0,-226)`}>
    <path d="M 26 -322 L 50 -330 L 52 -318 L 30 -312 Z" fill={BL.gloveHero} stroke="#8a7f68" strokeWidth={1.4} transform="rotate(-12 40 -322)" />
  </g>
);

// Pupitr (ayakta yazı masası): eğik üst yüzey bel hizasında, ince ayaklar (ayaklar görünür kalır), üstünde açık ciltli defter
const Pupitr: React.FC<{ x: number; y: number; s: number; yuz: number }> = ({ x, y, s, yuz }) => {
  const k = (dx: number, dy: number): P => [x + dx * s, y - dy * s];
  return (
    <g>
      <ellipse cx={x + 20 * s} cy={y} rx={70 * s} ry={10 * s} fill="#5a4428" opacity={0.3} />
      {[-48, 48].map((dx) => <rect key={dx} x={k(dx, 0)[0] - 4 * s} y={k(0, yuz - 20)[1]} width={8 * s} height={(yuz - 20) * s} fill="#4a3220" stroke={ink("#4a3220")} strokeWidth={1.2} />)}
      <rect x={k(-48, 0)[0]} y={k(0, 90)[1]} width={96 * s} height={6 * s} fill="#4a3220" />
      {/* eğik üst (ceviz) */}
      <polygon points={poly([k(-66, yuz - 22), k(66, yuz - 22), k(60, yuz + 14), k(-60, yuz + 14)])} fill="#5b3d25" stroke={ink("#5b3d25")} strokeWidth={1.6} />
      {/* açık ciltli defter */}
      <polygon points={poly([k(-54, yuz - 16), k(0, yuz - 12), k(0, yuz + 12), k(-50, yuz + 9)])} fill="#efe6d0" stroke="#5a3a22" strokeWidth={1.4} />
      <polygon points={poly([k(0, yuz - 12), k(54, yuz - 16), k(50, yuz + 9), k(0, yuz + 12)])} fill="#e9dfc9" stroke="#5a3a22" strokeWidth={1.4} />
      {[-6, 0, 6].map((d) => <line key={d} x1={k(8, yuz + d)[0]} y1={k(8, yuz + d)[1]} x2={k(44, yuz + d - 2)[0]} y2={k(44, yuz + d - 2)[1]} stroke="#2b1d10" strokeWidth={1} opacity={0.6} />)}
    </g>
  );
};
