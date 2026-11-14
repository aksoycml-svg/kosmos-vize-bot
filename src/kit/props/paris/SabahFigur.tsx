// ===== KE-PK-F1/F2 eklemli SİLUET figür (tasarım §3.1, §3.2, §14.2; mekanlar §2v2.11) =====
// B2 gravür figürü: dolgu + dış kontur (#2a2638) + iç çizgi (yaka, palto önü, bluz kuşağı) + gölge yanı 78° tarama (≥ 120 px) + iç kenar ışığı.
// Yüz yok. Dönem başlıkları (silindir, melon, kasket, denizci beresi, fötr, başörtüsü; kepi/ponpon YOK — tur-12). Dirsek IK, dışa-aşağı.
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
/** B2 (tur-12 kullanıcı kararı; mekanlar H2.8): dönem başlıkları — kepi ve ponpon YOK */
export type Baslik = "silindir" | "melon" | "kasket" | "bere" | "fotr" | "basortu" | "yok";
const BASLIK_VARS: Record<Kiyafet, Baslik> = { palto: "silindir", duz: "melon", isci: "kasket", pelerin: "fotr", sal: "basortu", etek: "basortu", cocuk: "kasket", dagron: "silindir" };
// baş yerel metre (orijin baş merkezi, y aşağı, +x figürün sağı); baş ry 0.108
const BASLIK_YOL: Record<Exclude<Baslik, "yok">, string[]> = {
  silindir: ["M-0.152 -0.066 Q-0.15 -0.088 -0.12 -0.084 Q0 -0.097 0.12 -0.084 Q0.15 -0.088 0.152 -0.066 Q0 -0.05 -0.152 -0.066 Z", "M-0.084 -0.08 Q-0.078 -0.16 -0.092 -0.245 Q0 -0.258 0.092 -0.245 Q0.078 -0.16 0.084 -0.08 Z"],
  melon: ["M-0.135 -0.064 Q-0.13 -0.082 -0.1 -0.078 Q0 -0.088 0.1 -0.078 Q0.13 -0.082 0.135 -0.064 Q0 -0.052 -0.135 -0.064 Z", "M-0.086 -0.074 C-0.094 -0.2 0.094 -0.2 0.086 -0.074 Z"],
  kasket: ["M-0.102 -0.055 C-0.13 -0.15 0.05 -0.172 0.142 -0.112 C0.13 -0.08 0.06 -0.068 -0.102 -0.055 Z", "M0.06 -0.072 Q0.15 -0.082 0.172 -0.055 L0.07 -0.052 Z"],
  bere: ["M-0.128 -0.07 C-0.14 -0.122 0.11 -0.15 0.148 -0.098 C0.12 -0.066 -0.06 -0.056 -0.128 -0.07 Z", "M-0.098 -0.062 Q0 -0.07 0.104 -0.066 L0.1 -0.05 Q0 -0.056 -0.094 -0.048 Z"],
  fotr: ["M-0.182 -0.054 Q-0.12 -0.088 0 -0.09 Q0.12 -0.088 0.182 -0.054 Q0.1 -0.064 0 -0.062 Q-0.1 -0.064 -0.182 -0.054 Z", "M-0.082 -0.076 C-0.094 -0.2 -0.01 -0.17 0 -0.19 C0.01 -0.17 0.094 -0.2 0.082 -0.076 Z"],
  basortu: ["M-0.104 0.03 C-0.122 -0.15 0.122 -0.15 0.104 0.03 L0.06 0.1 L0.0 0.16 L-0.06 0.1 Z"],
};
type Cizim = { renk: string; ek: number }; // ek: dış kontur için her şekle eklenen çizgi kalınlığı (px)
/** iki uç arasında konik uzuv (ekran), uçlar yuvarlatılmış */
const uzuv = (a: P, b: P, wa: number, wb: number): string => {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  const q = (p: P, w: number, s: number) => `${(p[0] + nx * w * s / 2).toFixed(1)} ${(p[1] + ny * w * s / 2).toFixed(1)}`;
  return `M${q(a, wa, 1)}L${q(b, wb, 1)}A${(wb / 2).toFixed(1)} ${(wb / 2).toFixed(1)} 0 0 0 ${q(b, wb, -1)}L${q(a, wa, -1)}A${(wa / 2).toFixed(1)} ${(wa / 2).toFixed(1)} 0 0 0 ${q(a, wa, 1)}Z`;
};
/** iki kemik IK (ekran): dirsek iki çözümden gövdeden DIŞA ve AŞAĞI olanı (mekanlar H2.8: hiçbir zaman ters bükülmez) */
const ikDis = (o: P, e: P, l1: number, l2: number, govdeX: number): P => {
  const dx = e[0] - o[0], dy = e[1] - o[1], d = Math.min(l1 + l2 - 0.5, Math.max(Math.abs(l1 - l2) + 0.5, Math.hypot(dx, dy) || 1));
  const a = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)))), b0 = Math.atan2(dy, dx);
  const c = [1, -1].map((y) => [o[0] + Math.cos(b0 + y * a) * l1, o[1] + Math.sin(b0 + y * a) * l1] as P);
  const dis = Math.sign(o[0] - govdeX) || 1, puan = (q: P) => dis * (q[0] - govdeX) + 0.35 * q[1];
  return puan(c[0]) >= puan(c[1]) ? c[0] : c[1];
};

export const FigurSiluet: React.FC<{
  e: Eklem; pxm: number; kiyafet: Kiyafet; renk: string; kenar?: { renk: string; dx: number; dy: number };
  isikRenk?: string; // (eski) Dagron ışık yanı — B turunda kaldırıldı, imza korunur
  manset?: string; ten?: string; eller?: boolean; basEgim?: number; temas?: [boolean, boolean]; temasRenk?: string; klip?: string; kolGizle?: [boolean, boolean];
  baslik?: Baslik; baslikYon?: 1 | -1; ik?: boolean; tarama?: "sag" | "sol" | false; onBacak?: 0 | 1;
}> = ({ onBacak, e: e0, pxm, kiyafet, renk, kenar, manset, ten, eller, basEgim = 0, temas, temasRenk = "#2a2638", klip, kolGizle = [false, false], baslik, baslikYon = 1, ik = true, tarama = "sag" }) => {
  const id = "fg" + useId().replace(/:/g, "");
  const K = KIYAFET[kiyafet];
  const m = (v: number) => v * pxm;
  const boyPx = pxm * 1.74;
  // dirsek: IK (üst kol 0.30, ön kol 0.27 m), dışa-aşağı
  const e: Eklem = ik ? { ...e0, dirsek: [0, 1].map((i) => ikDis(e0.omuz[i], e0.el[i], m(0.3), m(0.27), e0.boyun[0])) as [P, P] } : e0;
  const kalcaM = orta(e.kalca[0], e.kalca[1]), dizM = orta(e.diz[0], e.diz[1]), ayakM = orta(e.ayak[0], e.ayak[1]);
  const etekY = K.etekT <= 0.5 ? orta(kalcaM, dizM, K.etekT * 2) : orta(dizM, ayakM, (K.etekT - 0.5) * 2);
  const N = e.boyun;
  const dx = etekY[0] - N[0], dy = etekY[1] - N[1], Lp = Math.hypot(dx, dy) || 1;
  const d: P = [dx / Lp, dy / Lp], n: P = [-d[1], d[0]];
  const Lm = Lp / pxm;
  const Fp = (a: number, b: number): P => [N[0] + d[0] * m(a) + n[0] * m(b), N[1] + d[1] * m(a) + n[1] * m(b)];
  const F = (a: number, b: number): string => { const q = Fp(a, b); return `${q[0].toFixed(1)} ${q[1].toFixed(1)}`; };
  const ow = 0.19 * K.omuz, bel = 0.15 * Math.min(1.1, K.omuz), kal = Math.max(0.17, Math.min(K.etek / 2, 0.2)), et = K.etek / 2;
  const kalA = Math.min(Lm * 0.62, 0.6), belA = kalA * 0.72;
  // düşük eğimli omuz (vatkasız, ≈ 18°): boyun → omuz ucu düz iner, kas yumrusu yok
  const yanS = (s: number) => `L${F(-0.005, s * 0.055)}Q${F(0.02, s * (ow * 0.6))} ${F(0.055, s * ow)}C${F(0.16, s * (ow + 0.008))} ${F(belA - 0.1, s * bel)} ${F(belA, s * bel)}C${F(kalA, s * kal)} ${F(Lm - 0.12, s * et)} ${F(Lm, s * et)}`;
  const govdeYol = `M${F(-0.02, 0)}${yanS(-1)}Q${F(Lm + 0.03, 0)} ${F(Lm, et)}C${F(Lm - 0.12, et)} ${F(kalA, kal)} ${F(belA, bel)}C${F(belA - 0.1, bel)} ${F(0.16, ow + 0.008)} ${F(0.055, ow)}Q${F(0.02, ow * 0.6)} ${F(-0.005, 0.055)}Z`;
  const pelerinYol = K.pelerin ? `M${F(0.0, -0.08)}L${F(0.05, -ow - 0.02)}C${F(0.3, -ow - 0.08)} ${F(0.5, -0.36)} ${F(0.62, -0.38)}Q${F(0.68, 0)} ${F(0.62, 0.38)}C${F(0.5, 0.36)} ${F(0.3, ow + 0.08)} ${F(0.05, ow + 0.02)}L${F(0.0, 0.08)}Z` : "";
  const salYol = K.sal ? `M${F(0.03, -ow - 0.02)}Q${F(0.32, 0)} ${F(0.03, ow + 0.02)}L${F(0.0, 0.06)}L${F(0.0, -0.06)}Z` : "";
  const bAci = (Math.atan2(d[0], d[1]) * -180) / Math.PI;
  // üst kol gövdenin içinden başlar (omuz ucu 4 cm içeride, 3 cm aşağıda): yuvarlak uç omuz hattını aşmaz → kas yumrusu yok
  const omuzIc = (i: number): P => { const o = e.omuz[i], t = m(0.05) / Math.max(1, Math.abs(o[0] - N[0])); return [o[0] + (N[0] - o[0]) * Math.min(0.35, t) + d[0] * m(0.03), o[1] + (N[1] - o[1]) * Math.min(0.35, t) * 0 + d[1] * m(0.03)]; };
  const bs: Baslik = baslik ?? BASLIK_VARS[kiyafet];
  const sekil = ({ renk: c, ek }: Cizim) => {
    const st = ek > 0 ? { stroke: c, strokeWidth: ek, strokeLinejoin: "round" as const } : {};
    return (
      <g fill={c} {...st}>
        {K.bacak ? [0, 1].map((i) => <g key={`b${i}`}><path d={uzuv(e.kalca[i], e.diz[i], m(0.15), m(0.115))} /><path d={uzuv(e.diz[i], e.ayak[i], m(0.11), m(0.085))} /><ellipse cx={e.ayak[i][0] + m(0.015)} cy={e.ayak[i][1] - m(0.035)} rx={m(0.072)} ry={m(0.04)} /></g>)
          : [0, 1].map((i) => <ellipse key={`b${i}`} cx={e.ayak[i][0]} cy={e.ayak[i][1] - m(0.03)} rx={m(0.065)} ry={m(0.038)} />)}
        <path d={govdeYol} />
        {[0, 1].map((i) => kolGizle[i] ? null : <g key={`k${i}`}><path d={uzuv(omuzIc(i), e.dirsek[i], m(0.118), m(0.11))} /><circle cx={e.dirsek[i][0]} cy={e.dirsek[i][1]} r={m(0.06)} /><path d={uzuv(e.dirsek[i], e.el[i], m(0.108), m(0.085))} />{!eller && <ellipse cx={e.el[i][0]} cy={e.el[i][1]} rx={m(0.042)} ry={m(0.05)} />}</g>)}
        {pelerinYol && <path d={pelerinYol} />}{salYol && <path d={salYol} />}
        <g transform={`rotate(${basEgim} ${N[0]} ${N[1]})`}>
          <path d={uzuv(N, orta(N, e.bas, 0.6), m(0.09), m(0.085))} />
          <ellipse cx={e.bas[0]} cy={e.bas[1]} rx={m(kiyafet === "cocuk" ? 0.082 : 0.085)} ry={m(kiyafet === "cocuk" ? 0.098 : 0.108)} transform={`rotate(${bAci} ${e.bas[0]} ${e.bas[1]})`} />
          {bs !== "yok" && <g transform={`translate(${e.bas[0]} ${e.bas[1]}) rotate(${bAci}) scale(${pxm * baslikYon} ${pxm})`} strokeWidth={ek / pxm}>{BASLIK_YOL[bs].map((yol, j) => <path key={j} d={yol} />)}</g>}
        </g>
      </g>
    );
  };
  // gravür iç çizgileri (1.5–2 px): yaka, palto önü / etek yırtmacı, cep kapağı, bluz kuşağı ve kırmaları, şapka bandı
  const ic = Math.max(1, Math.min(2, boyPx / 90)), cizgiR = "#2a2638";
  const icCizgi: string[] = [];
  const yakaYol = `M${F(-0.012, -0.07)}L${F(0.07, -0.035)}L${F(0.115, 0)}L${F(0.07, 0.035)}L${F(-0.012, 0.07)}`;
  if (boyPx >= 90) {
    if (kiyafet === "palto" || kiyafet === "dagron" || kiyafet === "pelerin") { icCizgi.push(`M${F(0.115, 0.004)}L${F(belA, 0.012)}L${F(Lm - 0.01, 0.015)}`); icCizgi.push(`M${F(kalA - 0.02, -kal + 0.03)}L${F(kalA - 0.02, -kal + 0.12)}M${F(kalA - 0.02, kal - 0.03)}L${F(kalA - 0.02, kal - 0.12)}`); }
    if (kiyafet === "duz") { icCizgi.push(`M${F(0.115, 0.004)}L${F(Lm - 0.01, 0.01)}`); icCizgi.push(`M${F(0.24, -ow * 0.75)}L${F(0.24, -ow * 0.35)}`); }
    if (kiyafet === "isci" || kiyafet === "cocuk") { icCizgi.push(`M${F(belA, -bel)}Q${F(belA + 0.015, 0)} ${F(belA, bel)}`); for (const b of [-0.6, -0.15, 0.3, 0.7]) icCizgi.push(`M${F(belA + 0.03, b * bel)}L${F(Lm - 0.02, b * et * 1.05)}`); for (const b of [-0.5, 0.45]) icCizgi.push(`M${F(0.13, b * ow)}L${F(belA - 0.03, b * bel)}`); }
    if (kiyafet === "sal" || kiyafet === "etek") icCizgi.push(`M${F(0.3, -ow)}Q${F(0.42, 0)} ${F(0.3, ow)}`, `M${F(belA + 0.05, -kal * 0.5)}L${F(Lm - 0.02, -et * 0.55)}M${F(belA + 0.05, kal * 0.45)}L${F(Lm - 0.02, et * 0.5)}`);
  }
  const kw = Math.max(1, Math.min(2.5, boyPx / 60)); // dış kontur (px, her yana)
  const kontur = "#2a2638";
  const tar = tarama && boyPx >= 120;
  const sdx = kenar ? -kenar.dx : 2.5, sdy = kenar ? -kenar.dy : 1.5;
  const elCiz = eller ? [0, 1].map((i) => {
    if (kolGizle[i]) return null;
    const dd = e.dirsek[i], h = e.el[i], a = (Math.atan2(h[1] - dd[1], h[0] - dd[0]) * 180) / Math.PI;
    return (
      <g key={`e${i}`} transform={`translate(${h[0]} ${h[1]}) rotate(${a - 90}) scale(${pxm})`}>
        <rect x={-0.052} y={-0.065} width={0.104} height={0.055} rx={0.012} fill={manset ?? renk} stroke={kontur} strokeWidth={kw / pxm} />
        <path d="M-0.04 -0.015 C-0.048 0.045 -0.032 0.095 0 0.1 C0.032 0.095 0.046 0.045 0.04 -0.015 Z M0.036 0.0 C0.064 0.02 0.068 0.045 0.054 0.058 L0.032 0.04 Z" fill={ten ?? renk} stroke={kontur} strokeWidth={(kw * 0.7) / pxm} />
      </g>
    );
  }) : null;
  return (
    <g clipPath={klip}>
      {temas && [0, 1].map((i) => temas[i] && <ellipse key={`t${i}`} cx={e.ayak[i][0] + m(0.03)} cy={e.ayak[i][1]} rx={m(0.13)} ry={m(0.034)} fill={temasRenk} opacity={0.7} />)}
      <defs>
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" x={-3000} y={-3000} width={8000} height={8000}>{sekil({ renk: "#fff", ek: 0 })}</mask>
        {kenar && <mask id={`${id}k`} maskUnits="userSpaceOnUse" x={-3000} y={-3000} width={8000} height={8000}>{sekil({ renk: "#fff", ek: 0 })}<g transform={`translate(${sdx} ${sdy})`}>{sekil({ renk: "#000", ek: 0 })}</g></mask>}
      </defs>
      {sekil({ renk: kontur, ek: kw * 2 })}
      {sekil({ renk, ek: 0 })}
      {/* yaka: devrik, bir ton açık (boyunda okunur) */}
      {boyPx >= 70 && kiyafet !== "sal" && <path d={`${yakaYol}Z`} fill={karisR(renk, "#9a92ae", 0.28)} stroke={cizgiR} strokeWidth={ic} strokeLinejoin="round" mask={`url(#${id}m)`} />}
      {icCizgi.length > 0 && <path d={icCizgi.join("")} fill="none" stroke={cizgiR} strokeWidth={ic} strokeLinecap="round" mask={`url(#${id}m)`} />}
      {tar && <g mask={`url(#${id}m)`}><g transform={`rotate(${bAci} ${N[0]} ${N[1]})`}>{Array.from({ length: Math.ceil(m(0.3) / 6) }, (_, j) => { const x0 = N[0] + (tarama === "sag" ? 1 : -1) * (m(0.02) + j * 6) - m(0.08); return <line key={j} x1={x0 - m(0.07)} y1={N[1] - m(0.3)} x2={x0 + m(0.4)} y2={N[1] + m(1.9)} stroke="#2f2d46" strokeWidth={2} />; })}</g></g>}
      {kenar && <rect x={-3000} y={-3000} width={8000} height={8000} fill={kenar.renk} mask={`url(#${id}k)`} />}
      {/* öne kalkan bacak (biniş adımı): gövdenin ÖNÜNDE kendi konturuyla — siluette kaybolmasın */}
      {onBacak !== undefined && K.bacak && (() => {
        // T #17 (B3 #2): pantolon paltodan bir ton KOYU; uyluk/baldır iki ton (baldır gölgede) + diz kırığı; bot ayrı koyu biçim (taban + topuk)
        const i = onBacak, uy = uzuv(e.kalca[i], e.diz[i], m(0.15), m(0.12)), al = uzuv(e.diz[i], e.ayak[i], m(0.115), m(0.085));
        const kd = e.diz[i], ay = e.ayak[i], dx = ay[0] - kd[0], dy = ay[1] - kd[1], L = Math.hypot(dx, dy) || 1, u: P = [dx / L, dy / L], n: P = [-u[1], u[0]];
        const yon = n[0] < 0 ? -1 : 1; // burun, baldıra dik ve ekranda sola (duvara) bakar
        const q = (a: number, b: number): P => [ay[0] + u[0] * a + n[0] * b * yon, ay[1] + u[1] * a + n[1] * b * yon];
        const bot = [q(-m(0.06), -m(0.05)), q(-m(0.06), m(0.05)), q(m(0.01), m(0.16)), q(m(0.05), m(0.15)), q(m(0.05), -m(0.06))].map((v) => `${v[0].toFixed(1)},${v[1].toFixed(1)}`).join(" ");
        const pant = karisR(renk, "#2a2638", 0.3), pantG = karisR(renk, "#2a2638", 0.45);
        return <g>
          <g fill={kontur} stroke={kontur} strokeWidth={kw * 2} strokeLinejoin="round"><path d={uy} /><path d={al} /><polygon points={bot} /></g>
          <path d={al} fill={pantG} /><path d={uy} fill={pant} />
          <path d={`M${kd[0] - m(0.06)} ${kd[1] - m(0.03)}Q${kd[0]} ${kd[1] + m(0.045)} ${kd[0] + m(0.06)} ${kd[1] - m(0.03)}`} fill="none" stroke={kontur} strokeWidth={Math.max(2, ic * 1.5)} />
          <polygon points={bot} fill="#2a2430" />
          <line x1={q(m(0.05), -m(0.06))[0]} y1={q(m(0.05), -m(0.06))[1]} x2={q(m(0.05), m(0.15))[0]} y2={q(m(0.05), m(0.15))[1]} stroke="#6a5a52" strokeWidth={Math.max(1.5, ic)} />
        </g>;
      })()}
      {elCiz}
    </g>
  );
};
const karisR = (a: string, b: string, t: number) => { const h = (x: string) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16)); const A = h(a), B = h(b); return `#${A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("")}`; };

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
