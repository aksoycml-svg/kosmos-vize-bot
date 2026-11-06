// İç mekân perspektif sözleşmesi (tasarim.md 0.5) — Sokak.tsx zemin(z,u) ile aynı formül.
// z: derinlik (1 = kameraya en yakın zemin çizgisi … ZMAX uzak), u: 0 sol duvar … 1 sağ duvar.
import { lerp, P } from "./sabitler";

export const ZMAX = 7;
export const sz = (z: number) => (1 - 1 / z) / (1 - 1 / ZMAX);

export type OdaParam = { yNear: number; sNear: number; yFar: number; sFar: number; xNear: [number, number]; xFar: [number, number] };

export const oda = (o: OdaParam) => {
  const t = (z: number) => sz(z);
  const olcek = (z: number) => lerp(o.sNear, o.sFar, t(z));
  const zeminY = (z: number) => lerp(o.yNear, o.yFar, t(z));
  const xSol = (z: number) => lerp(o.xNear[0], o.xFar[0], t(z));
  const xSag = (z: number) => lerp(o.xNear[1], o.xFar[1], t(z));
  // zemin noktası: ayak ve baston ucu buraya basar
  const zemin = (z: number, u: number): P => [lerp(xSol(z), xSag(z), u), zeminY(z)];
  // yükseklik H (ölçek 1'de px) — dikey yüzeyler
  const nokta = (z: number, u: number, H: number): P => { const [x, y] = zemin(z, u); return [x, y - H * olcek(z)]; };
  const solDuvar = (z: number, H: number): P => nokta(z, 0, H);
  const sagDuvar = (z: number, H: number): P => nokta(z, 1, H);
  return { olcek, zeminY, xSol, xSag, zemin, nokta, solDuvar, sagDuvar };
};
export type Oda = ReturnType<typeof oda>;

export const ODALAR = {
  // borsa: xFar 160–920 → 230–850 (motion kalibrasyonu: yan duvarlar açılır, sol duvardaki kemerli pencereler ve huzmeler okunur)
  borsa: { yNear: 1700, sNear: 1.15, yFar: 980, sFar: 0.5, xNear: [-100, 1180], xFar: [230, 850] } as OdaParam,
  tours: { yNear: 1760, sNear: 1.05, yFar: 1400, sFar: 0.8, xNear: [-60, 1140], xFar: [110, 970] } as OdaParam,
  catiKati: { yNear: 1740, sNear: 1.05, yFar: 1250, sFar: 0.6, xNear: [-60, 1140], xFar: [120, 960] } as OdaParam,
  yatak: { yNear: 1760, sNear: 1.1, yFar: 1380, sFar: 0.85, xNear: [-60, 1140], xFar: [100, 980] } as OdaParam,
  mahkeme: { yNear: 1800, sNear: 1.1, yFar: 1220, sFar: 0.45, xNear: [-100, 1180], xFar: [170, 910] } as OdaParam,
  parisAvlu: { yNear: 1780, sNear: 1.05, yFar: 1150, sFar: 0.55, xNear: [-80, 1160], xFar: [150, 930] } as OdaParam,
  catiBdx: { yNear: 1760, sNear: 1.2, yFar: 1300, sFar: 0.95, xNear: [-80, 1160], xFar: [200, 880] } as OdaParam,
};
