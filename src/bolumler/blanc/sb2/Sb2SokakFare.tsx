import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import { DOKU_SEED, P, rnd } from "../../../doku/sabitler";

// ===== SB2-SOKAK-FARE · P04 INSERT (plan karesi p78–144; kompozisyon kare numarası = P04 plan karesi) =====
// sahne-plani v2.6 P04: kaldırım hizası, statik; ızgara sol-orta (300,1130), ufuk y 700; fare ≥ 230 px (%12).
// Louis'nin paçası + çizmesi sağdan girer (x ≈ 800–900, temas p98); baston üstten iner, ucu farenin önünde taşa "TAK" p108.
// Fare: p87 pençesi ızgara demirine → çıkar → Louis'ye ≈ 200 px yürür → TAK → irkilir (p110) → döner → ızgaraya koşar → dalış p128 →
// kuyruk ucu ızgara demirine "tink" p138 → p138–144 boş ızgara (kapanış). Hiçbir şey fade ile kaybolmaz; fare deliğe fiziksel girer.
// Işık: aynı réverbère (kadrajın sol-üst-arkasında, sıcak amber) + ay kenar ışığı (soğuk). Gölgeler sağ-öne, kısa.
// Onay bekliyor: rig kanonunda Louis'nin pantolonu gri (#46464c); planın "bordo paça"sı frak eteğinin alt ucu olarak üstte görünür.
export const P04_FARE_TEMAS = { pence: 87, cizme: 98, tak: 108, irkilme: 110, dalis: 128, tink: 138 } as const;
export const P04_FARE_KONTROL = [78, 87, 108, 138, 143];

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const S = DOKU_SEED.sokakBdx + 500;
const UFUK = 700;
const IZ: P = [300, 1130]; // ızgara merkezi (ekran)
const IZ_R: [number, number] = [150, 30];
const ADIM = 200; // farenin Louis'ye yürüdüğü yol
const BASTON_UC: P = [652, 1172];
const CIZME: P = [870, 1236]; // çizme topuğu temas noktası (p98)

// perspektif kaldırım taşları (ufuk 700'e doğru küçülen sıralar), seed sabit
const Kaldirim: React.FC = () => {
  const els: React.ReactNode[] = [];
  let y = 1920, k = 0;
  while (y > UFUK + 6 && k < 80) {
    const h = Math.max(3, (y - UFUK) * 0.085), y2 = y - h, w = h * 2.3;
    for (let x = -w + ((k % 2) * w) / 2; x < 1080 + w; x += w) {
      const r = rnd(S, `t${k}-${Math.round(x)}`), c = Math.round(50 + r * 18);
      els.push(<rect key={`${k}-${Math.round(x)}`} x={x + w * 0.05} y={y2 + h * 0.07} width={w * 0.9} height={h * 0.84} rx={h * 0.3} fill={`rgb(${c},${c + 4},${c + 16})`} />);
      if (r > 0.62) els.push(<ellipse key={`h${k}-${Math.round(x)}`} cx={x + w * 0.42} cy={y2 + h * 0.28} rx={w * 0.26} ry={h * 0.1} fill="#c9d6ff" opacity={0.16} />);
    }
    y = y2; k++;
  }
  return <g>{els}</g>;
};

// fare (yan görünüş), yerel: ayak çizgisi y 0, burun +x. Gövde (burun–sağrı) ≈ 82 birim × ölçek 3 ≈ 246 px.
const Fare: React.FC<{ faz: number; bak: number; sq: number; kokla: number }> = ({ faz, bak, sq, kokla }) => {
  const ay = (i: number) => Math.sin(faz + i * Math.PI) * 4;
  return (
    <g transform={`scale(1,${1 / sq})`}>
      <path d={`M -30 -8 Q -60 ${-4 + Math.sin(faz * 0.5) * 4} -96 ${6 + Math.sin(faz * 0.5 + 1) * 5}`} stroke="#b08a86" strokeWidth={3.4} fill="none" strokeLinecap="round" />
      <path d="M -32 -2 Q -36 -28 -8 -31 Q 20 -33 32 -17 Q 36 -4 28 0 Z" fill="#4a3b3a" stroke="#1e1716" strokeWidth={1.4} />
      <path d="M -32 -2 Q -34 -18 -16 -24 Q 4 -28 22 -20 Q 6 -22 -12 -16 Q -26 -10 -26 -2 Z" fill="#6b5856" opacity={0.7} />
      <path d="M -26 -27 Q 0 -35 24 -23" stroke="#c8d6ff" strokeWidth={1.4} opacity={0.55} fill="none" />
      {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M ${-24 + i * 6} -25 l 2 -4`} stroke="#2e2424" strokeWidth={0.8} opacity={0.6} />)}
      {[[-20, 0], [-8, 1], [14, 0], [22, 1]].map(([fx, ph], i) => <ellipse key={i} cx={fx + ay(ph)} cy={-1} rx={4.4} ry={2.4} fill="#c9a19c" stroke="#5a3a38" strokeWidth={0.6} />)}
      <g transform={`translate(27,-17) rotate(${-bak * 28 + kokla * 3})`}>
        <path d="M -6 -10 Q 10 -12 24 -2 Q 26 2 22 4 Q 8 8 -6 8 Z" fill="#4a3b3a" stroke="#1e1716" strokeWidth={1.2} />
        <ellipse cx={-2} cy={-12} rx={7} ry={8} fill="#5a4846" />
        <ellipse cx={-1} cy={-12} rx={4} ry={5} fill="#d79a9a" />
        <circle cx={10} cy={-4} r={3} fill="#0a0608" />
        <circle cx={11} cy={-5} r={1.1} fill="#fff" />
        <circle cx={24} cy={1} r={2.6} fill="#e3a0a0" />
        {[-3, 0, 3].map((d) => <path key={d} d={`M 22 ${1 + d * 0.3} L ${36 + kokla * 2} ${-2 + d * 1.5}`} stroke="#d8d0cc" strokeWidth={0.6} opacity={0.8} />)}
      </g>
    </g>
  );
};

export const FareInsertSb2: React.FC<{ p: number; guvenli?: boolean }> = ({ p, guvenli }) => {
  const e = Easing.bezier(0.16, 1, 0.3, 1);
  // ---- fare ----
  const cik = interpolate(p, [83, 96], [0, 1], { ...cl, easing: Easing.out(Easing.cubic) }); // p87: baş + ön pençeler ızgara demirinde
  const yuru = interpolate(p, [96, 104], [0, 1], { ...cl, easing: Easing.inOut(Easing.quad) });
  const bak = interpolate(p, [104, 107], [0, 1], { ...cl, easing: e }) * (p < 110 ? 1 : 0);
  const irk = interpolate(p, [110, 113, 117], [0, 1, 0], cl);
  const don = interpolate(p, [111, 114], [1, -1], cl);
  const kos = interpolate(p, [114, 128], [0, 1], { ...cl, easing: Easing.in(Easing.quad) });
  const dal = interpolate(p, [126, 134], [0, 1], { ...cl, easing: Easing.in(Easing.quad) });
  const x = IZ[0] + ADIM * yuru - (ADIM - 6) * kos;
  const y = IZ[1] - 2 + 150 * (1 - cik) - 44 * irk + 170 * dal;
  const aci = -30 * (1 - cik) * (cik > 0 ? 1 : 0) + 72 * dal; // çıkarken burun yukarı, dalarken burun aşağı
  const faz = (yuru > 0 && yuru < 1) || (kos > 0 && kos < 1) ? p * 1.6 : 0;
  const sq = 1 + irk * 0.18;
  const fareVar = p >= 83 && dal < 1;
  // ---- Louis çizmesi (sağdan adım, topuk p98'de taşa) ----
  const adim = interpolate(p, [80, 98], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const cX = CIZME[0] + 300 * (1 - adim), cY = CIZME[1] - 70 * Math.sin(adim * Math.PI) * (adim < 1 ? 1 : 0);
  // ---- baston (üstten, ekseni boyunca iner; uç p108'de taşa, hafif sekip yerleşir) ----
  const bInis = interpolate(p, [100, 108, 111, 114], [-760, 0, -14, 0], { ...cl, easing: Easing.in(Easing.quad) });
  const bYon: P = [0.2, -0.98]; // uçtan sapa (sağ-yukarı)
  const uc: P = [BASTON_UC[0] - bYon[0] * bInis, BASTON_UC[1] - bYon[1] * bInis];
  const vurus = p >= 108 && p < 122 ? 1 - (p - 108) / 14 : 0;
  // ---- kuyruk ucu: dalıştan sonra ızgara demirinde son kez görünür, p138'de içeri kayar ("tink") ----
  const kuyruk = interpolate(p, [132, 138], [1, 0], { ...cl, easing: Easing.in(Easing.quad) });
  const kilit: KilitNokta[] = [
    { ad: "ızgara", p: IZ, tur: "kurulum" },
    ...(p >= 87 && p < 96 ? [{ ad: "pençe → ızgara demiri", p: [IZ[0] + 30, IZ[1] - 6] as P, tur: "temas" as const }] : []),
    { ad: "çizme topuğu", p: [cX - 60, CIZME[1]], tur: "temas" },
    { ad: "baston ucu (TAK)", p: uc, tur: "dokunus" },
    ...(fareVar ? [{ ad: "fare", p: [x, y] as P, tur: "dokunus" as const }] : []),
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0e1a" }}>
      <ArsivKatmani mod="gece">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <defs>
              <linearGradient id="fiGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f1530" /><stop offset="1" stopColor="#2a3352" /></linearGradient>
              <radialGradient id="fiBokeh"><stop offset="0" stopColor="#ffb357" stopOpacity="0.9" /><stop offset="0.6" stopColor="#ffb357" stopOpacity="0.32" /><stop offset="1" stopColor="#ffb357" stopOpacity="0" /></radialGradient>
              <radialGradient id="fiHavuz"><stop offset="0" stopColor="#ffb357" stopOpacity="0.22" /><stop offset="1" stopColor="#ffb357" stopOpacity="0" /></radialGradient>
              <clipPath id="fiDelik">
                {/* fare: ızgara deliğinin ALTINDA kalan kısmı görünmez (deliğe fiziksel girer/çıkar) */}
                <rect x={-200} y={-200} width={1500} height={IZ[1] + 200 + 3} />
              </clipPath>
            </defs>
            {/* gök + flu sokak (alan derinliği): cephe kütleleri, yanık pencereler, réverbère bokeh (sol-üst) */}
            <rect x={0} y={0} width={1080} height={UFUK + 20} fill="url(#fiGok)" />
            <g style={{ filter: "blur(16px)" }}>
              <polygon points="-60,40 380,470 380,720 -60,720" fill="#3a3f55" />
              <polygon points="1140,60 700,480 700,720 1140,720" fill="#2f3348" />
              <rect x={380} y={500} width={320} height={220} fill="#1e2440" />
              {[[120, 420], [250, 520], [860, 450], [960, 360]].map(([wx, wy], i) => <rect key={i} x={wx} y={wy} width={40} height={60} fill="#ffb357" opacity={0.35} />)}
            </g>
            {[[230, 300, 90], [520, 560, 40], [880, 520, 60], [640, 420, 30]].map(([bx, by, r], i) => <circle key={i} cx={bx} cy={by} r={r} fill="url(#fiBokeh)" />)}
            <rect x={0} y={UFUK} width={1080} height={1220} fill="#2a2e3a" />
            <Kaldirim />
            {/* réverbère'in kaldırımdaki sıcak havuzu + ıslak dikey yansıma (kaynak sol-üst-arka) */}
            <ellipse cx={330} cy={980} rx={420} ry={150} fill="url(#fiHavuz)" />
            <ellipse cx={240} cy={1010} rx={26} ry={180} fill="#ffb357" opacity={0.14} style={{ filter: "blur(10px)" }} />
            {/* ızgara: koyu delik + demir çubuklar + çerçeve; ay kenar ışığı üst dudakta */}
            <g transform={`translate(${IZ[0]},${IZ[1]})`}>
              <ellipse cx={0} cy={0} rx={IZ_R[0]} ry={IZ_R[1]} fill="#05060a" />
              <ellipse cx={0} cy={0} rx={IZ_R[0] + 10} ry={IZ_R[1] + 5} fill="none" stroke="#3a3c46" strokeWidth={9} />
              {Array.from({ length: 9 }).map((_, i) => { const bx = -IZ_R[0] + 16 + i * 33.5; const h = IZ_R[1] * Math.sqrt(Math.max(0, 1 - (bx / IZ_R[0]) ** 2)); return <line key={i} x1={bx} y1={-h} x2={bx} y2={h} stroke="#4a4c58" strokeWidth={8} strokeLinecap="round" />; })}
              <path d={`M ${-IZ_R[0] - 8} -4 A ${IZ_R[0] + 8} ${IZ_R[1] + 4} 0 0 1 ${IZ_R[0] + 8} -4`} stroke="#9fb3ea" strokeWidth={2.2} opacity={0.6} fill="none" />
            </g>
            {/* Louis: frak eteğinin bordo alt ucu + gri pantolon paçası + çizme (sağdan girer, topuk p98) */}
            <g>
              <ellipse cx={cX - 20} cy={CIZME[1] + 6} rx={150 * (0.6 + 0.4 * adim)} ry={18} fill="#05060a" opacity={0.55 * adim} />
              <path d={`M ${cX - 110} ${cY - 1500} L ${cX + 120} ${cY - 1500} L ${cX + 110} ${cY - 74} L ${cX - 90} ${cY - 74} Z`} fill="#46464c" stroke="#1c1c22" strokeWidth={3} />
              <path d={`M ${cX - 110} ${cY - 1500} L ${cX - 40} ${cY - 1500} L ${cX - 60} ${cY - 74} L ${cX - 90} ${cY - 74} Z`} fill="#000" opacity={0.25} />
              <path d={`M ${cX + 104} ${cY - 1400} L ${cX + 110} ${cY - 74}`} stroke="#c4d6ff" strokeWidth={4} opacity={0.3} />
              <path d={`M ${cX - 130} ${cY - 1500} L ${cX + 150} ${cY - 1500} L ${cX + 140} ${cY - 1110} Q ${cX} ${cY - 1080} ${cX - 120} ${cY - 1130} Z`} fill="#74222f" stroke="#2a0c12" strokeWidth={3} />
              <path d={`M ${cX - 160} ${cY - 70} Q ${cX - 200} ${cY - 6} ${cX - 160} ${cY + 12} L ${cX + 190} ${cY + 12} Q ${cX + 240} ${cY + 4} ${cX + 220} ${cY - 40} Q ${cX + 170} ${cY - 90} ${cX + 30} ${cY - 84} L ${cX - 110} ${cY - 84} Z`} fill="#0f0d0c" stroke="#000" strokeWidth={3} />
              <path d={`M ${cX - 60} ${cY - 74} Q ${cX + 80} ${cY - 80} ${cX + 190} ${cY - 40}`} stroke="#8a8ea0" strokeWidth={5} opacity={0.45} fill="none" />
            </g>
            {/* fare (deliğin altında kalan kısmı kırpılır) */}
            {fareVar && <g clipPath="url(#fiDelik)">
              <ellipse cx={x + 12} cy={IZ[1] + 10} rx={110 * (1 - dal)} ry={12} fill="#05060a" opacity={(0.5 - irk * 0.3) * cik} />
              <g transform={`translate(${x},${y}) rotate(${aci * don}) scale(${3.4 * don},3.4)`}><Fare faz={faz} bak={bak} sq={sq} kokla={p < 108 && yuru >= 1 ? Math.sin(p * 1.1) : 0} /></g>
            </g>}
            {/* kuyruk ucu: ızgara demirine sürtünüp içeri kayar */}
            {p >= 128 && kuyruk > 0 && <path d={`M ${IZ[0] + 8} ${IZ[1] + 2} Q ${IZ[0] + 8 + 70 * kuyruk} ${IZ[1] - 40 * kuyruk} ${IZ[0] + 8 + 110 * kuyruk} ${IZ[1] - 70 * kuyruk}`} stroke="#b08a86" strokeWidth={10} fill="none" strokeLinecap="round" />}
            {/* baston: koyu ahşap, pirinç uç; ucun temas gölgesi */}
            {bInis > -700 && <g>
              {bInis > -40 && <ellipse cx={BASTON_UC[0] + 10} cy={BASTON_UC[1] + 4} rx={30} ry={6} fill="#05060a" opacity={0.6 * (1 + bInis / 40)} />}
              <g transform={`translate(${uc[0]},${uc[1]}) rotate(${(Math.atan2(bYon[1], bYon[0]) * 180) / Math.PI})`}>
                <rect x={0} y={-14} width={1500} height={28} rx={10} fill="#3b2412" stroke="#160c06" strokeWidth={2} />
                <rect x={10} y={-6} width={1480} height={6} fill="#7a5030" opacity={0.6} />
                <rect x={0} y={-16} width={48} height={32} rx={4} fill="#d4ad52" stroke="#5a4018" strokeWidth={2} />
              </g>
            </g>}
            {/* TAK: taş tozu + kıvılcımsız kısa parlama (temas karesi p108) */}
            {vurus > 0 && Array.from({ length: 12 }).map((_, i) => { const a = Math.PI + (i / 11) * Math.PI, d = (1 - vurus) * 110 * (0.6 + rnd(S, `d${i}`) * 0.6); return <circle key={i} cx={BASTON_UC[0] + Math.cos(a) * d} cy={BASTON_UC[1] + Math.sin(a) * d * 0.4} r={5 + (1 - vurus) * 8} fill="#9a9aaa" opacity={vurus * 0.5} />; })}
            {vurus > 0.75 && <circle cx={BASTON_UC[0]} cy={BASTON_UC[1] - 2} r={26} fill="#fff4d0" opacity={(vurus - 0.75) * 2.4} />}
            {/* ön plan: alan derinliği (yakın taşlar flu, karartma değil — yalnız alt 220 px bulanık kopya tonu) */}
            <rect x={0} y={1720} width={1080} height={200} fill="#1a1d28" opacity={0.35} style={{ filter: "blur(24px)" }} />
          </svg>
        </AbsoluteFill>
      </ArsivKatmani>
      {guvenli && <GuvenliAlan noktalar={kilit} aktifBant={null} baslik={`SB2-SOKAK-FARE p${p}`} />}
    </AbsoluteFill>
  );
};

export const Sb2SokakFare: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  return <FareInsertSb2 p={Math.max(78, Math.min(143, p))} guvenli={guvenli} />;
};
