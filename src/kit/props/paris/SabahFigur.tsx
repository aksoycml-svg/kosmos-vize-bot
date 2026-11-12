// ===== KE-PK-F1/F2 eklemli SİLUET figür (tasarım §3.1, §3.2, §14.2; mekanlar §2v2.11) =====
// Tek ton düz dolgu, yüz yok (baş düz oval), şapka/üniforma/arma yok. Ayrışma: kıyafet silueti + boy + duruş + baş eğimi.
// Eklemler EKRAN noktası (dünyadan izdüşürülmüş ya da ayaktaEklem ile kurulmuş) → uzuv koni + gövde/etek çokgeni.
// Kenar ışığı: aynı biçimin ışığa doğru (sol-üst) kaydırılmış düz kopyası (konturun içine yapışık okunur, V3 dersi).
// Dagron (F2): iki ton gövde + sepya manşet + ten el (sırt ya da kontrajur; yüz çizilmez).
import React, { useId } from "react";
import type { P } from "../../tipler";
import { Kam, pr, V3 } from "../../sablonlar/paris/montmartreDunya";

export type Kiyafet = "palto" | "sal" | "cocuk" | "duz" | "pelerin" | "etek" | "dagron" | "isci";
export type Eklem = { bas: P; boyun: P; omuz: [P, P]; kalca: [P, P]; dirsek: [P, P]; el: [P, P]; diz: [P, P]; ayak: [P, P] };
export type EklemDunya = { bas: V3; boyun: V3; omuz: [V3, V3]; kalca: [V3, V3]; dirsek: [V3, V3]; el: [V3, V3]; diz: [V3, V3]; ayak: [V3, V3] };
export const eklemIzdus = (k: Kam, J: EklemDunya): Eklem => {
  const p = (v: V3) => pr(k, ...v), ik = (a: [V3, V3]): [P, P] => [p(a[0]), p(a[1])];
  return { bas: p(J.bas), boyun: p(J.boyun), omuz: ik(J.omuz), kalca: ik(J.kalca), dirsek: ik(J.dirsek), el: ik(J.el), diz: ik(J.diz), ayak: ik(J.ayak) };
};
const KIYAFET: Record<Kiyafet, { etek: number; etekT: number; omuz: number; bacak: boolean; pelerin?: boolean; sal?: boolean }> = {
  palto: { etek: 0.5, etekT: 0.72, omuz: 1.0, bacak: true },
  duz: { etek: 0.42, etekT: 0.55, omuz: 0.95, bacak: true },
  sal: { etek: 0.62, etekT: 1.0, omuz: 0.9, bacak: false, sal: true },
  etek: { etek: 0.66, etekT: 1.0, omuz: 0.85, bacak: false },
  cocuk: { etek: 0.34, etekT: 0.12, omuz: 0.85, bacak: true },
  pelerin: { etek: 0.62, etekT: 0.6, omuz: 1.25, bacak: true, pelerin: true },
  dagron: { etek: 0.46, etekT: 0.5, omuz: 1.0, bacak: true },
  isci: { etek: 0.36, etekT: 0.15, omuz: 1.0, bacak: true },
};
const orta = (a: P, b: P, t = 0.5): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

export const FigurSiluet: React.FC<{
  e: Eklem; pxm: number; kiyafet: Kiyafet; renk: string; kenar?: { renk: string; dx: number; dy: number };
  isikRenk?: string; // Dagron: ışık yanı ikinci ton (sol yarı)
  manset?: string; ten?: string; eller?: boolean; basEgim?: number; temas?: [boolean, boolean]; temasRenk?: string; klip?: string; kolGizle?: [boolean, boolean];
}> = ({ e, pxm, kiyafet, renk, kenar, isikRenk, manset, ten, eller, basEgim = 0, temas, temasRenk = "#2a2638", klip, kolGizle = [false, false] }) => {
  const id = "fg" + useId().replace(/:/g, "");
  const K = KIYAFET[kiyafet];
  const m = (v: number) => v * pxm;
  const kalcaM = orta(e.kalca[0], e.kalca[1]), dizM = orta(e.diz[0], e.diz[1]), ayakM = orta(e.ayak[0], e.ayak[1]);
  const etekY = K.etekT <= 0.5 ? orta(kalcaM, dizM, K.etekT * 2) : orta(dizM, ayakM, (K.etekT - 0.5) * 2);
  // gövde çerçevesi: boyun → etek ortası (d aşağı), n yanal
  const N = e.boyun;
  const dx = etekY[0] - N[0], dy = etekY[1] - N[1], Lp = Math.hypot(dx, dy) || 1;
  const d: P = [dx / Lp, dy / Lp], n: P = [-d[1], d[0]];
  const Lm = Lp / pxm; // boyun → etek (m)
  const F = (a: number, b: number): string => { const x = N[0] + d[0] * m(a) + n[0] * m(b), y = N[1] + d[1] * m(a) + n[1] * m(b); return `${x.toFixed(1)} ${y.toFixed(1)}`; };
  const ow = 0.2 * K.omuz, bel = 0.15 * Math.min(1.1, K.omuz), kal = Math.max(0.17, Math.min(K.etek / 2, 0.2)), et = K.etek / 2;
  const kalA = Math.min(Lm * 0.62, 0.6), belA = kalA * 0.72;
  const yan = (s: number) => `L${F(0.02, s * 0.07)}Q${F(0.0, s * (ow - 0.03))} ${F(0.07, s * ow)}C${F(0.22, s * (ow + 0.015))} ${F(belA - 0.08, s * bel)} ${F(belA, s * bel)}C${F(kalA, s * kal)} ${F(Lm - 0.12, s * et)} ${F(Lm, s * et)}`;
  const govdeYol = `M${F(-0.02, 0)}${yan(-1)}Q${F(Lm + 0.03, 0)} ${F(Lm, et)}` + (() => { // sağ taraf ters sırada
    return `C${F(Lm - 0.12, et)} ${F(kalA, kal)} ${F(belA, bel)}C${F(belA - 0.08, bel)} ${F(0.22, ow + 0.015)} ${F(0.07, ow)}Q${F(0.0, ow - 0.03)} ${F(0.02, 0.07)}Z`;
  })();
  const pelerinYol = K.pelerin ? `M${F(0.0, -0.08)}L${F(0.06, -ow - 0.02)}C${F(0.3, -ow - 0.08)} ${F(0.5, -0.36)} ${F(0.62, -0.38)}Q${F(0.68, 0)} ${F(0.62, 0.38)}C${F(0.5, 0.36)} ${F(0.3, ow + 0.08)} ${F(0.06, ow + 0.02)}L${F(0.0, 0.08)}Z` : "";
  const salYol = K.sal ? `M${F(0.03, -ow - 0.02)}Q${F(0.32, 0)} ${F(0.03, ow + 0.02)}L${F(0.0, 0.06)}L${F(0.0, -0.06)}Z` : "";
  const cizgi = (pt: P[], w: number, c: string, key: string) => <path key={key} d={`M${pt.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join("L")}`} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
  const sekil = (c: string) => (
    <g fill={c}>
      {K.bacak ? [0, 1].map((i) => <g key={`b${i}`}>{cizgi([e.kalca[i], e.diz[i]], m(0.14), c, "u")}{cizgi([e.diz[i], e.ayak[i]], m(0.105), c, "a")}<ellipse cx={e.ayak[i][0]} cy={e.ayak[i][1] - m(0.035)} rx={m(0.065)} ry={m(0.042)} /></g>)
        : [0, 1].map((i) => <ellipse key={`b${i}`} cx={e.ayak[i][0]} cy={e.ayak[i][1] - m(0.03)} rx={m(0.06)} ry={m(0.038)} />)}
      <path d={govdeYol} />
      {[0, 1].map((i) => kolGizle[i] ? null : <g key={`k${i}`}>{cizgi([orta(e.omuz[i], e.dirsek[i], Math.min(0.35, m(0.07) / Math.max(1, Math.hypot(e.dirsek[i][0] - e.omuz[i][0], e.dirsek[i][1] - e.omuz[i][1])))), e.dirsek[i]], m(0.12), c, "u")}{cizgi([e.dirsek[i], e.el[i]], m(0.1), c, "a")}{!eller && <ellipse cx={e.el[i][0]} cy={e.el[i][1]} rx={m(0.042)} ry={m(0.05)} />}</g>)}
      {pelerinYol && <path d={pelerinYol} />}{salYol && <path d={salYol} />}
      <g transform={`rotate(${basEgim} ${N[0]} ${N[1]})`}>{cizgi([N, orta(N, e.bas, 0.6)], m(0.09), c, "n")}<ellipse cx={e.bas[0]} cy={e.bas[1]} rx={m(kiyafet === "cocuk" ? 0.082 : 0.085)} ry={m(kiyafet === "cocuk" ? 0.098 : 0.108)} transform={`rotate(${(Math.atan2(d[0], d[1]) * -180) / Math.PI} ${e.bas[0]} ${e.bas[1]})`} /></g>
    </g>
  );
  const elCiz = eller ? [0, 1].map((i) => {
    if (kolGizle[i]) return null;
    const dd = e.dirsek[i], h = e.el[i], a = (Math.atan2(h[1] - dd[1], h[0] - dd[0]) * 180) / Math.PI;
    return (
      <g key={`e${i}`} transform={`translate(${h[0]} ${h[1]}) rotate(${a - 90}) scale(${pxm})`}>
        <rect x={-0.052} y={-0.065} width={0.104} height={0.055} rx={0.012} fill={manset ?? renk} />
        <path d="M-0.04 -0.015 C-0.048 0.045 -0.032 0.095 0 0.1 C0.032 0.095 0.046 0.045 0.04 -0.015 Z M0.036 0.0 C0.064 0.02 0.068 0.045 0.054 0.058 L0.032 0.04 Z" fill={ten ?? renk} />
      </g>
    );
  }) : null;
  return (
    <g clipPath={klip}>
      {temas && [0, 1].map((i) => temas[i] && <ellipse key={`t${i}`} cx={e.ayak[i][0] + m(0.03)} cy={e.ayak[i][1]} rx={m(0.12)} ry={m(0.032)} fill={temasRenk} opacity={0.7} />)}
      {isikRenk && <defs><mask id={`${id}c`} maskUnits="userSpaceOnUse" x={-3000} y={-3000} width={8000} height={8000}>{sekil("#fff")}</mask></defs>}
      {kenar && <g transform={`translate(${kenar.dx} ${kenar.dy})`}>{sekil(kenar.renk)}</g>}
      {sekil(renk)}
      {isikRenk && <g mask={`url(#${id}c)`}><rect x={N[0] - m(1.2)} y={N[1] - m(0.6)} width={m(1.2) - m(0.02)} height={m(3)} fill={isikRenk} transform={`rotate(${(Math.atan2(d[0], d[1]) * -180) / Math.PI} ${N[0]} ${N[1]})`} /></g>}
      {elCiz}
    </g>
  );
};

/** ayakta duran (kameraya dönük ya da sırtı dönük — siluette aynı) figürün eklemleri; ayak = iki ayağın ortası (ekran), pxm ekran px/m */
export const ayaktaEklem = (ayak: P, pxm: number, H: number, o: { egim?: number; ayakAra?: number; omuz?: number; kolAci?: [number, number]; basKaldir?: number; agirlik?: number } = {}): Eklem => {
  const s = H / 1.74, m = (v: number) => v * pxm * s;
  const eg = ((o.egim ?? 0) * Math.PI) / 180;
  const up = (y: number, x = 0): P => [ayak[0] + m(x) + Math.sin(eg) * m(y), ayak[1] - Math.cos(eg) * m(y)];
  const aa = (o.ayakAra ?? 0.11) / 2, om = (o.omuz ?? 0.17), ag = o.agirlik ?? 0;
  const bk = o.basKaldir ?? 0; // baş geriye (yukarı bakış): siluette baş hafif yukarı/geriye kayar
  const ka = o.kolAci ?? [4, 4];
  const omuz: [P, P] = [up(1.4, -om), up(1.4, om)];
  const kol = (i: 0 | 1): [P, P] => { const a = ((ka[i] * (i ? 1 : -1)) * Math.PI) / 180, o0 = omuz[i]; const d: P = [o0[0] + Math.sin(a) * m(0.3), o0[1] + Math.cos(a) * m(0.3)]; return [d, [d[0] + Math.sin(a * 0.7) * m(0.27), d[1] + Math.cos(a * 0.7) * m(0.27)]]; };
  const [d0, e0] = kol(0), [d1, e1] = kol(1);
  return {
    ayak: [[ayak[0] - m(aa) + m(ag * 0.02), ayak[1]], [ayak[0] + m(aa), ayak[1]]],
    diz: [up(0.48, -aa * 0.9 + ag * 0.03), up(0.48, aa * 0.9)],
    kalca: [up(0.9, -0.09), up(0.9, 0.09)],
    omuz, dirsek: [d0, d1], el: [e0, e1],
    boyun: up(1.5), bas: up(1.62 + bk * 0.012, bk * 0.004),
  };
};
