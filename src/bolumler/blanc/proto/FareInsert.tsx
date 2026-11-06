import React from "react";
import { Easing, interpolate, random } from "remotion";

// Yakın plan (insert): kamera kaldırım hizasında. Fare devlere bakar, Louis bastonu yanına vurur, fare kaçar.
// t: insert içindeki saniye (0 = kesme anı). TAP: bastonun yere değdiği an.
export const INSERT_SURE = 2.45;
export const INSERT_TAP = 1.5;
const IZ: [number, number] = [400, 1446]; // lağım ızgarası (fare buradan çıkar ve buraya kaçar)
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const HOR = 860;

const Tas: React.FC = () => {
  const els: React.ReactNode[] = [];
  let k = 0;
  for (let y = 1920; y > HOR + 4; k++) {
    const h = Math.max(4, (y - HOR) * 0.1);
    const y2 = y - h;
    const w = h * 2.4;
    for (let x = -w + ((k % 2) * w) / 2; x < 1080 + w; x += w) {
      const r = random(`it${k}-${Math.round(x)}`);
      const c = Math.round(42 + r * 26);
      els.push(<rect key={`${k}-${x}`} x={x + w * 0.05} y={y2 + h * 0.06} width={w * 0.9} height={h * 0.86} rx={h * 0.35} fill={`rgb(${c},${c + 4},${c + 18})`} />);
      if (r > 0.55) els.push(<ellipse key={`h${k}-${x}`} cx={x + w * 0.45} cy={y2 + h * 0.3} rx={w * 0.28} ry={h * 0.12} fill="#c9d6ff" opacity={0.18} />);
    }
    y = y2;
  }
  return <g>{els}</g>;
};

const Fare: React.FC<{ t: number; frame: number }> = ({ t, frame }) => {
  const cik = interpolate(t, [0.15, 0.7], [0, 1], { ...cl, easing: Easing.out(Easing.cubic) }); // ızgaradan çıkar
  const yuru = interpolate(t, [0.7, 1.0], [0, 1], { ...cl, easing: Easing.inOut(Easing.quad) });
  const bak = interpolate(t, [0.95, 1.3], [0, 1], { ...cl, easing: Easing.out(Easing.cubic) }); // başını kaldırıp devlere bakar
  const irk = interpolate(t, [INSERT_TAP, INSERT_TAP + 0.06, INSERT_TAP + 0.16], [0, 1, 0.4], cl); // irkilme zıplaması
  // kaçış: deliğin üstüne gel → burnu aşağı çevir → kafa üstü dal (tamamen) 
  const git = interpolate(t, [INSERT_TAP + 0.14, INSERT_TAP + 0.3], [0, 1], { ...cl, easing: Easing.inOut(Easing.quad) });
  const egil = interpolate(t, [INSERT_TAP + 0.26, INSERT_TAP + 0.38], [0, 1], { ...cl, easing: Easing.inOut(Easing.quad) });
  const bat = interpolate(t, [INSERT_TAP + 0.32, INSERT_TAP + 0.6], [0, 1], { ...cl, easing: Easing.in(Easing.quad) });
  const kac = git;
  const don = interpolate(t, [INSERT_TAP + 0.06, INSERT_TAP + 0.16], [1, -1], cl); // sola döner
  const kokla = t < INSERT_TAP ? Math.sin(frame * 2.2) : 0;
  const x = IZ[0] + yuru * 70 - git * 70, y = IZ[1] + 240 * (1 - cik) - 44 - irk * 90 + egil * 30 + bat * 520;
  const sq = 1 + irk * 0.18; // esneme
  const ayak = kac > 0 || (yuru > 0 && yuru < 1) ? Math.sin(frame * 4) : 0;
  const S = 6;
  return (
    <g transform={`translate(${x},${y}) rotate(${-72 * egil}) scale(${S * don},${S / sq})`}>
      {/* temas gölgesi */}
      <ellipse cx={0} cy={3} rx={38} ry={5} fill="#000" opacity={0.55 - irk * 0.3} />
      {/* kuyruk */}
      <path d={`M -28 -6 Q -62 ${-2 + Math.sin(frame * 0.25) * 4} -92 ${8 + Math.sin(frame * 0.3 + 1) * 6}`} stroke="#b08a86" strokeWidth={3.2} fill="none" strokeLinecap="round" />
      <path d={`M -28 -6 Q -62 ${-2 + Math.sin(frame * 0.25) * 4} -92 ${8 + Math.sin(frame * 0.3 + 1) * 6}`} stroke="#6a4a4a" strokeWidth={1} fill="none" opacity={0.6} />
      {/* gövde: kürk */}
      <path d="M -32 -2 Q -36 -26 -8 -30 Q 18 -32 30 -16 Q 34 -4 26 0 Z" fill="#4a3b3a" />
      <path d="M -32 -2 Q -34 -18 -16 -24 Q 4 -28 22 -20 Q 6 -22 -12 -16 Q -26 -10 -26 -2 Z" fill="#6b5856" opacity={0.7} />
      <path d="M -26 -26 Q 0 -34 24 -22" stroke="#c8d6ff" strokeWidth={1.4} opacity={0.5} fill="none" />
      {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M ${-24 + i * 6} -24 l 2 -4`} stroke="#2e2424" strokeWidth={0.8} opacity={0.6} />)}
      {/* bacaklar */}
      {[[-20, 0], [-8, 1], [14, 0], [22, 1]].map(([fx, ph], i) => <ellipse key={i} cx={fx + (ph ? ayak : -ayak) * 4} cy={-1} rx={4} ry={2.4} fill="#c9a19c" />)}
      {/* baş */}
      <g transform={`translate(26,-16) rotate(${-bak * 28 + kokla * 3})`}>
        <path d="M -6 -10 Q 10 -12 24 -2 Q 26 2 22 4 Q 8 8 -6 8 Z" fill="#4a3b3a" />
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

export const FareInsert: React.FC<{ t: number }> = ({ t }) => {
  const frame = t * 30;
  // baston iner: üstten girer, TAP'te yere değer, sonra hafif geri kalkar
  const cane = interpolate(t, [0.55, INSERT_TAP, INSERT_TAP + 0.35], [-700, 0, -60], { ...cl, easing: Easing.in(Easing.quad) });
  const vurus = t >= INSERT_TAP && t < INSERT_TAP + 0.25 ? 1 - (t - INSERT_TAP) / 0.25 : 0;
  const shake = vurus * Math.sin(frame * 9) * 10;
  // kamera: yavaş itme
  const s = interpolate(t, [0, INSERT_SURE], [1.0, 1.06]);
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <linearGradient id="insGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a0e22" /><stop offset="1" stopColor="#2a3358" /></linearGradient>
        <radialGradient id="bokeh"><stop offset="0" stopColor="#ffb357" stopOpacity="0.9" /><stop offset="0.6" stopColor="#ffb357" stopOpacity="0.35" /><stop offset="1" stopColor="#ffb357" stopOpacity="0" /></radialGradient>
        <radialGradient id="bokehM"><stop offset="0" stopColor="#bcd0ff" stopOpacity="0.7" /><stop offset="1" stopColor="#bcd0ff" stopOpacity="0" /></radialGradient>
      </defs>
      <g transform={`translate(${540 + shake},${960}) scale(${s}) translate(-540,-960)`}>
        <rect x={-100} y={-100} width={1300} height={HOR + 120} fill="url(#insGok)" />
        {/* flu sokak: cephe siluetleri + bokeh */}
        <g style={{ filter: "blur(14px)" }}>
          <polygon points="-100,0 360,520 360,880 -100,880" fill="#3a3f55" />
          <polygon points="1180,0 720,520 720,880 1180,880" fill="#2f3348" />
          <rect x={360} y={560} width={360} height={320} fill="#1e2440" />
        </g>
        {[[250, 640, 70], [180, 380, 50], [860, 600, 80], [520, 520, 46], [940, 330, 40], [640, 760, 34]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r * (1 + Math.sin(frame * 0.3 + i) * 0.03)} fill="url(#bokeh)" />
        ))}
        <circle cx={560} cy={260} r={90} fill="url(#bokehM)" />
        <rect x={-100} y={HOR - 2} width={1300} height={1300} fill="#12151f" />
        <Tas />
        {/* ıslak taşta sıcak yansımalar */}
        {[[250, 1100], [860, 1080]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={50} ry={200} fill="#ffb357" opacity={0.16} style={{ filter: "blur(16px)" }} />)}
        {/* Louis'nin ayakkabısı + paçası (sağda, sabit duruyor) */}
        <g transform="translate(860,1250)">
          <ellipse cx={20} cy={14} rx={230} ry={26} fill="#000" opacity={0.5} />
          <path d="M -120 -980 L 90 -980 L 120 -60 L -110 -60 Z" fill="#3a3a40" />
          <path d="M -120 -980 L -40 -980 L -60 -60 L -110 -60 Z" fill="#000" opacity={0.25} />
          <path d="M 80 -980 L 120 -60" stroke="#c4d6ff" strokeWidth={4} opacity={0.35} />
          <path d="M -150 -70 Q -190 -10 -150 12 L 200 12 Q 250 4 230 -40 Q 180 -90 40 -84 L -110 -84 Z" fill="#0d0c0e" />
          <path d="M -60 -74 Q 80 -80 200 -40" stroke="#8a8ea0" strokeWidth={6} opacity={0.5} fill="none" />
        </g>
        {/* baston */}
        <g transform={`translate(700,${1330 + cane})`}>
          <rect x={-14} y={-1400} width={28} height={1390} rx={10} fill="#3b2412" />
          <rect x={-4} y={-1400} width={6} height={1380} fill="#7a5030" opacity={0.6} />
          <rect x={-16} y={-46} width={32} height={46} fill="#d4ad52" />
        </g>
        {/* vuruş: toz ve kıvılcım */}
        {vurus > 0 && Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI + Math.PI; const d = (1 - vurus) * 120 * (0.6 + random(`dz${i}`) * 0.6);
          return <circle key={i} cx={700 + Math.cos(a) * d} cy={1330 + Math.sin(a) * d * 0.5} r={6 + (1 - vurus) * 10} fill="#9a9aaa" opacity={vurus * 0.5} />;
        })}
        {vurus > 0.6 && <circle cx={700} cy={1328} r={30} fill="#fff4d0" opacity={(vurus - 0.6) * 2} />}
        {/* lağım ızgarası: delik + demir çubuklar (fare üstünde durur) */}
        <g transform={`translate(${IZ[0]},${IZ[1]})`}>
          <ellipse cx={0} cy={0} rx={150} ry={26} fill="#05060a" />
          <path d="M -160 -4 L 160 -4 L 170 24 L -170 24 Z" fill="none" stroke="#2a2c34" strokeWidth={8} />
          {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={-140 + i * 35} y1={-4} x2={-146 + i * 36.5} y2={24} stroke="#3a3c46" strokeWidth={7} />)}
          <path d="M -160 -4 L 160 -4" stroke="#9fb3ea" strokeWidth={2} opacity={0.5} />
        </g>
        <defs><clipPath id="izgaraUstu"><rect x={-200} y={-200} width={1500} height={IZ[1] + 4 + 200} /></clipPath></defs>
        <g clipPath="url(#izgaraUstu)"><Fare t={t} frame={frame} /></g>
        {/* kapanış: kuyruk ucu ızgaradan içeri kayar */}
        {(() => {
          const k = interpolate(t, [INSERT_TAP + 0.58, INSERT_TAP + 0.8], [1, 0], { ...cl, easing: Easing.in(Easing.quad) });
          if (t < INSERT_TAP + 0.58 || k <= 0) return null;
          const L = 200 * k;
          return <path d={`M ${IZ[0] + 10} ${IZ[1] + 2} Q ${IZ[0] + 10 + L * 0.3} ${IZ[1] - 60 * k} ${IZ[0] + 10 + L * 0.5} ${IZ[1] - L * 0.6}`} stroke="#b08a86" strokeWidth={14} fill="none" strokeLinecap="round" />;
        })()}
        {/* alan derinliği: ön plan bulanıklığı */}
        <rect x={-100} y={1700} width={1300} height={300} fill="#05060c" opacity={0.35} style={{ filter: "blur(30px)" }} />
      </g>
    </svg>
  );
};
