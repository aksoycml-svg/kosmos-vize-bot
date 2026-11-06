import React from "react";

// ===== Vektör kukla düzeneği (rig) =====
// Karakter sağa bakan 3/4 pozda çizilir; facing=-1 ile aynalanır.
// Açılar derece; 0 = uzuv aşağı sarkar. Negatif açı = ileri (bakış yönüne).

export type Agiz = "dinlen" | "gulumse" | "sirit" | "A" | "E" | "O" | "M" | "S";

export type Poz = {
  x: number; y: number; scale?: number; facing?: 1 | -1;
  bodyY?: number; lean?: number; breathe?: number;
  thighF: number; kneeF: number; thighB: number; kneeB: number;
  shF: number; elF: number; shB: number; elB: number;
  tails?: number;
  headTilt?: number; lookX?: number; lookY?: number;
  blinkF?: number; blinkB?: number; // 0 açık, 1 kapalı (F = yakın göz)
  browF?: number; browB?: number; // -1 çatık ... 1 kalkık
  agiz?: Agiz;
  hat?: { x: number; y: number; r: number } | null; // null = başta
  cane?: number | null; // baston açısı (el etrafında), null = yok
};

export type Palet = {
  coat: string; coatDark: string; vest: string; vestDark: string; cravat: string; shirt: string;
  pants: string; shoe: string; skin: string; skinDark: string; hair: string; hat: string; hatBand: string;
  sideburn: number; browHeavy: number;
};

export const FRANCOIS: Palet = {
  coat: "#1f3566", coatDark: "#14223f", vest: "#5b5f6e", vestDark: "#3f4250", cravat: "#efe6cf", shirt: "#f4efe2",
  pants: "#2a2622", shoe: "#0f0d0c", skin: "#e2b08c", skinDark: "#b98063", hair: "#3a2416", hat: "#121114", hatBand: "#2b2a33",
  sideburn: 1, browHeavy: 1,
};
export const LOUIS: Palet = {
  coat: "#6b1f2c", coatDark: "#45121b", vest: "#8a8c92", vestDark: "#64666c", cravat: "#141216", shirt: "#f1ece0",
  pants: "#3a3a3e", shoe: "#0f0d0c", skin: "#dfac88", skinDark: "#b27b5f", hair: "#35210f", hat: "#6f7076", hatBand: "#2a2a2e",
  sideburn: 1.35, browHeavy: 1.2,
};

const OUT = "#2a1c18";
const SW = 2.2;
const RIM = "#bcd2ff";

// Uzuv: kalça/omuzdan iki parçalı
const Bacak: React.FC<{ x: number; thigh: number; knee: number; p: Palet; dark?: boolean }> = ({ x, thigh, knee, p, dark }) => (
  <g transform={`translate(${x},-232) rotate(${thigh})`}>
    <path d="M -19 -6 L 19 -6 L 14 112 L -14 112 Z" fill={dark ? shade(p.pants, -0.25) : p.pants} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
    <g transform={`translate(0,108) rotate(${knee})`}>
      <path d="M -14 0 L 14 0 L 11 104 L -11 104 Z" fill={dark ? shade(p.pants, -0.25) : p.pants} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
      <g transform={`translate(0,102) rotate(${-(thigh + knee) * 0.85})`}>
        <path d="M -14 -4 Q -16 12 -8 14 L 34 14 Q 42 12 38 2 Q 30 -6 10 -6 Z" fill={p.shoe} stroke={OUT} strokeWidth={SW} />
        <path d="M 14 -2 Q 26 -2 34 4" stroke="#5b5b66" strokeWidth={2} fill="none" opacity={0.6} />
      </g>
    </g>
  </g>
);

const Kol: React.FC<{ x: number; sh: number; el: number; p: Palet; dark?: boolean; children?: React.ReactNode }> = ({ x, sh, el, p, dark, children }) => (
  <g transform={`translate(${x},-382) rotate(${sh})`}>
    <path d="M -15 -8 Q 0 -16 15 -8 L 13 92 L -13 92 Z" fill={dark ? p.coatDark : p.coat} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
    <g transform={`translate(0,88) rotate(${el})`}>
      <path d="M -13 0 L 13 0 L 12 78 L -12 78 Z" fill={dark ? p.coatDark : p.coat} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
      <rect x={-13} y={70} width={26} height={9} fill={p.shirt} stroke={OUT} strokeWidth={2} />
      <g transform="translate(0,90)">
        <path d="M -11 -10 Q -14 8 -4 16 Q 8 20 13 8 Q 15 -6 10 -10 Z" fill={p.skin} stroke={OUT} strokeWidth={SW} />
        {children}
      </g>
    </g>
  </g>
);

// Ağız şekilleri (dudak senkronu)
const AGIZ: Record<Agiz, React.ReactNode> = {
  // y ≈ 36-52, bıyığın altında
  dinlen: <path d="M 6 36 Q 18 38 30 35" stroke={OUT} strokeWidth={3} fill="none" strokeLinecap="round" />,
  gulumse: <path d="M 4 33 Q 18 44 32 32" stroke={OUT} strokeWidth={3.4} fill="none" strokeLinecap="round" />,
  sirit: <path d="M 6 37 Q 20 41 34 29" stroke={OUT} strokeWidth={3.6} fill="none" strokeLinecap="round" />,
  A: <g><path d="M 6 33 Q 18 31 31 33 Q 28 52 18 53 Q 8 52 6 33 Z" fill="#4a1a17" stroke={OUT} strokeWidth={2.6} /><path d="M 10 46 Q 18 50 26 46" fill="#c25a50" /></g>,
  E: <g><path d="M 5 34 Q 18 32 32 34 Q 28 44 18 45 Q 8 44 5 34 Z" fill="#4a1a17" stroke={OUT} strokeWidth={2.6} /><rect x={9} y={34} width={18} height={4} fill="#f3eee6" /></g>,
  O: <ellipse cx={19} cy={40} rx={8} ry={10} fill="#4a1a17" stroke={OUT} strokeWidth={2.6} />,
  M: <path d="M 7 36 L 31 36" stroke={OUT} strokeWidth={4} strokeLinecap="round" />,
  S: <g><path d="M 6 35 Q 18 33 31 35 Q 27 41 18 42 Q 9 41 6 35 Z" fill="#4a1a17" stroke={OUT} strokeWidth={2.4} /><rect x={9} y={35} width={19} height={3.5} fill="#f3eee6" /></g>,
};

const Sapka: React.FC<{ p: Palet; tall?: number }> = ({ p, tall = 1 }) => (
  <g>
    <path d={`M -36 0 L -32 ${-78 * tall} Q 4 ${-86 * tall} 40 ${-78 * tall} L 36 0 Z`} fill={p.hat} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
    <path d={`M -34 -4 L -33 -18 L 37 -18 L 36 -4 Z`} fill={p.hatBand} />
    <ellipse cx={2} cy={0} rx={56} ry={10} fill={p.hat} stroke={OUT} strokeWidth={SW} />
    <path d={`M -26 ${-70 * tall} Q -22 ${-40 * tall} -24 -24`} stroke="#ffffff" strokeWidth={4} opacity={0.12} fill="none" />
  </g>
);

const Kafa: React.FC<{ pz: Poz; p: Palet; louis?: boolean }> = ({ pz, p, louis }) => {
  const lx = (pz.lookX ?? 0) * 3.5, ly = (pz.lookY ?? 0) * 2.5;
  const bF = (pz.browF ?? 0) * 6, bB = (pz.browB ?? 0) * 6;
  const eye = (cx: number, cy: number, rx: number, ry: number, blink: number) => (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#f7f1e6" />
      <circle cx={cx + 1.5 + lx} cy={cy + 0.5 + ly} r={ry * 0.78} fill="#3b2414" />
      <circle cx={cx + 1.5 + lx} cy={cy + 0.5 + ly} r={ry * 0.42} fill="#0e0806" />
      <circle cx={cx + 3 + lx} cy={cy - 1.5 + ly} r={1.3} fill="#fff" />
      {/* üst göz kapağı */}
      <path d={`M ${cx - rx - 1} ${cy - ry - 2} L ${cx + rx + 1} ${cy - ry - 2} L ${cx + rx + 1} ${cy - ry + 1 + (2 * ry + 2) * blink} Q ${cx} ${cy - ry + 3 + (2 * ry + 4) * blink} ${cx - rx - 1} ${cy - ry + 1 + (2 * ry + 2) * blink} Z`} fill={p.skin} />
      <path d={`M ${cx - rx - 1} ${cy - ry + 1 + (2 * ry + 2) * blink} Q ${cx} ${cy - ry + 3 + (2 * ry + 4) * blink} ${cx + rx + 1} ${cy - ry + 1 + (2 * ry + 2) * blink}`} stroke={OUT} strokeWidth={2.4} fill="none" strokeLinecap="round" />
    </g>
  );
  return (
    <g transform={`translate(8,-452) rotate(${pz.headTilt ?? 0},0,30)`}>
      <path d="M -10 30 L 14 30 L 16 62 L -8 62 Z" fill={p.skinDark} />
      {/* arka saç */}
      <path d="M -42 4 Q -54 -40 -14 -56 Q 26 -66 44 -34 Q 50 -14 42 -8 Q 30 -44 0 -42 Q -30 -36 -32 12 Z" fill={p.hair} />
      {/* yüz: 3/4 çene hattı */}
      <path d="M -36 -18 Q -38 -50 2 -52 Q 40 -52 44 -18 Q 47 6 42 22 Q 36 44 18 52 Q 0 58 -14 50 Q -32 38 -36 -18 Z" fill={p.skin} stroke={p.skinDark} strokeWidth={SW} />
      {/* gölge yanağı (arka taraf) */}
      <path d="M -36 -18 Q -38 20 -14 50 Q -26 30 -24 -6 Q -24 -30 -10 -46 Q -34 -42 -36 -18 Z" fill={p.skinDark} opacity={0.45} />
      {/* kulak */}
      <path d="M -33 -6 Q -46 -10 -44 6 Q -42 20 -30 16 Z" fill={p.skin} stroke={p.skinDark} strokeWidth={SW} />
      {/* favori */}
      <path d={`M -32 -28 Q -38 ${2 + 14 * p.sideburn} -24 ${18 + 20 * p.sideburn} Q -18 ${10 + 16 * p.sideburn} -20 -30 Z`} fill={p.hair} />
      {/* saç üstü bukleler */}
      <path d="M -36 -26 Q -42 -54 -14 -60 Q 10 -70 30 -56 Q 44 -48 42 -30 Q 32 -46 14 -46 Q 2 -40 -8 -48 Q -20 -40 -36 -26 Z" fill={p.hair} />
      {[[-26, -50, 10], [-6, -58, 11], [14, -58, 10], [32, -48, 9]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={p.hair} />)}
      <path d="M -20 -54 Q -6 -64 10 -60" stroke="#ffffff" strokeWidth={2} opacity={0.18} fill="none" />
      {/* gözler */}
      {eye(-4, -8, 6.5, 5.5, pz.blinkB ?? 0)}
      {eye(22, -8, 8.5, 6.5, pz.blinkF ?? 0)}
      {/* kaşlar */}
      <path d={`M -13 ${-19 - bB} Q -4 ${-25 - bB * 1.2} 4 ${-19 - bB * 0.6}`} stroke={p.hair} strokeWidth={4.5 * p.browHeavy} fill="none" strokeLinecap="round" />
      <path d={`M 12 ${-20 - bF * 0.6} Q 23 ${-28 - bF * 1.2} 34 ${-21 - bF}`} stroke={p.hair} strokeWidth={5.5 * p.browHeavy} fill="none" strokeLinecap="round" />
      {/* burun: güçlü, kemerli */}
      <path d="M 33 -2 Q 38 8 46 18 Q 47 25 38 25 Q 32 25 30 21" fill={p.skin} stroke={p.skinDark} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M 31 22 Q 30 12 32 2" stroke={p.skinDark} strokeWidth={1.6} fill="none" opacity={0.5} />
      {/* ağız (bıyığın altında) */}
      <g transform="translate(2,4)">{AGIZ[pz.agiz ?? "dinlen"]}</g>
      {/* bıyık */}
      <path d={louis ? "M 0 30 Q 10 25 22 28 Q 34 25 44 30 Q 38 36 22 33 Q 8 36 0 30 Z" : "M -6 32 Q 4 22 22 27 Q 40 22 50 32 Q 54 38 46 36 Q 34 31 22 33 Q 6 31 -4 38 Q -10 36 -6 32 Z"} fill={p.hair} />
      {/* çene yumuşak gölgesi */}
      <path d="M 0 52 Q 18 50 34 40" stroke={p.skinDark} strokeWidth={2} fill="none" opacity={0.6} />
      {/* kenar ışığı (ay) */}
      <path d="M -36 -18 Q -38 -50 2 -52" stroke={RIM} strokeWidth={2.4} fill="none" opacity={0.75} />
      {pz.hat === null || pz.hat === undefined ? <g transform="translate(4,-44) rotate(-4)"><Sapka p={p} tall={louis ? 1.15 : 1} /></g> : null}
    </g>
  );
};

export const Kukla: React.FC<{ pz: Poz; p: Palet; louis?: boolean }> = ({ pz, p, louis }) => {
  const s = pz.scale ?? 1;
  const f = pz.facing ?? 1;
  const br = 1 + (pz.breathe ?? 0) * 0.012;
  return (
    <g transform={`translate(${pz.x},${pz.y}) scale(${s * f},${s})`}>
      {/* yer gölgesi */}
      <ellipse cx={4} cy={6} rx={92} ry={14} fill="#000" opacity={0.35} />
      <g transform={`translate(0,${pz.bodyY ?? 0}) rotate(${pz.lean ?? 0},0,-232)`}>
        {/* arka kol + arka bacak */}
        <Kol x={-30} sh={pz.shB} el={pz.elB} p={p} dark />
        <Bacak x={-10} thigh={pz.thighB} knee={pz.kneeB} p={p} dark />
        {/* frak etekleri (arkada) */}
        <g transform={`translate(-6,-240) rotate(${pz.tails ?? 0})`}>
          <path d="M -36 0 Q -44 70 -40 128 L -14 120 L -6 0 Z" fill={p.coatDark} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M -8 0 L -16 124 L 8 132 Q 14 70 12 0 Z" fill={p.coat} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
        </g>
        <Bacak x={14} thigh={pz.thighF} knee={pz.kneeF} p={p} />
        {/* gövde */}
        <g transform={`translate(0,-232) scale(1,${br}) translate(0,232)`}>
          <path d="M -54 -380 Q 0 -404 58 -380 Q 60 -330 48 -290 L 40 -230 L -34 -230 L -46 -292 Q -58 -330 -54 -380 Z" fill={p.coat} stroke={p.coatDark} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M -54 -380 Q -58 -330 -46 -292 L -34 -230 L -18 -230 L -26 -300 Q -36 -340 -30 -390 Z" fill={p.coatDark} opacity={0.75} />
          <path d="M -54 -380 Q 0 -404 58 -380" stroke={RIM} strokeWidth={2.6} fill="none" opacity={0.7} />
          {/* yelek */}
          <path d="M -8 -384 L 26 -384 L 34 -232 L -2 -232 Z" fill={p.vest} stroke={OUT} strokeWidth={2.4} />
          <path d="M 10 -384 L 34 -232 L 22 -232 Z" fill={p.vestDark} opacity={0.6} />
          {[-336, -304, -272].map((yy) => <circle key={yy} cx={14} cy={yy} r={3.2} fill="#c9a24a" stroke={OUT} strokeWidth={1.2} />)}
          {!louis && <path d="M 16 -300 Q 28 -288 36 -296" stroke="#d6b04a" strokeWidth={2.4} fill="none" />}
          {/* gömlek + kravat */}
          <path d="M -4 -400 L 26 -400 L 18 -366 L 4 -366 Z" fill={p.shirt} stroke={OUT} strokeWidth={2.2} />
          <path d="M -2 -398 Q 12 -388 26 -398 L 22 -372 Q 12 -360 2 -372 Z" fill={p.cravat} stroke={OUT} strokeWidth={2.2} />
          {/* yakalar (revers) */}
          <path d="M -12 -390 L 2 -330 L -22 -300 L -30 -380 Z" fill={p.coatDark} stroke={OUT} strokeWidth={2.2} strokeLinejoin="round" />
          <path d="M 30 -390 L 22 -330 L 44 -306 L 50 -380 Z" fill={p.coatDark} stroke={OUT} strokeWidth={2.2} strokeLinejoin="round" />
          {/* bel */}
          <path d="M -36 -236 L 40 -236" stroke={OUT} strokeWidth={2} opacity={0.5} />
          <Kafa pz={pz} p={p} louis={louis} />
        </g>
        {/* ön kol (+ baston) */}
        <Kol x={38} sh={pz.shF} el={pz.elF} p={p}>
          {pz.cane !== null && pz.cane !== undefined && (
            <g transform={`rotate(${pz.cane})`}>
              <rect x={-4} y={-6} width={8} height={250} rx={3} fill="#3b2412" stroke={OUT} strokeWidth={2} />
              <circle cx={0} cy={-8} r={10} fill="#c9a24a" stroke={OUT} strokeWidth={2} />
              <rect x={-4.5} y={238} width={9} height={14} fill="#c9a24a" />
            </g>
          )}
        </Kol>
      </g>
      {/* şapka elde/havada */}
      {pz.hat ? <g transform={`translate(${pz.hat.x},${pz.hat.y}) rotate(${pz.hat.r})`}><Sapka p={p} tall={louis ? 1.15 : 1} /></g> : null}
    </g>
  );
};

// ---- yardımcılar ----
function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.max(0, Math.min(255, Math.round(v * (1 + amt)))));
  return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
}

// Yürüme döngüsü: faz (radyan) → bacak/kol açıları
export const yuru = (phi: number, amt = 1) => {
  const leg = (ph: number) => ({ thigh: -27 * Math.sin(ph) * amt, knee: (6 + 46 * Math.pow(Math.max(0, Math.cos(ph)), 2)) * amt });
  const F = leg(phi), B = leg(phi + Math.PI);
  return {
    thighF: F.thigh, kneeF: F.knee, thighB: B.thigh, kneeB: B.knee,
    shF: 20 * Math.sin(phi) * amt, elF: (-14 - 10 * Math.max(0, -Math.sin(phi))) * amt,
    shB: -20 * Math.sin(phi) * amt, elB: (-14 - 10 * Math.max(0, Math.sin(phi))) * amt,
    bodyY: 7 * (1 - Math.cos(2 * phi)) / 2 * amt,
    tails: 7 * Math.sin(phi - 0.7) * amt,
    lean: 3 * amt,
  };
};

// Dudak senkronu: karakter → ağız şekli
export const visem = (ch: string): Agiz => {
  const c = ch.toLowerCase();
  if ("a".includes(c)) return "A";
  if ("eiı".includes(c)) return "E";
  if ("oöuü".includes(c)) return "O";
  if ("mbp".includes(c)) return "M";
  if ("szşçcj".includes(c)) return "S";
  return "E";
};
