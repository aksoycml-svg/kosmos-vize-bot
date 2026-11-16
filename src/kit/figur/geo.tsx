// Figür kiti ortak geometri: dışbükey zarf, yol üretimi, tek siluet (dikişsiz birleşim + ışığa göre mürekkep kontur).
// Mürekkep kontur `src/kit/cizim/MurekkepCizgi.konturYol`'dan (yeniden yazılmadı); `BirlesikM`'den farkı: kontur katmanı maskelenebilir
// (ör. bacağın kalça bölgesinde kontur yok → kasıkta dikiş çizgisi çıkmaz) ve dolgu parça başına renk alabilir.
import React from "react";
import { konturYol, KonturAyar } from "../cizim/MurekkepCizgi";
import type { P2 } from "./iskelet";

export const f1 = (v: number) => v.toFixed(1);
export const yolD = (q: P2[], kapali = true) => (q.length ? `M${q.map((p) => `${f1(p[0])},${f1(p[1])}`).join("L")}${kapali ? "Z" : ""}` : "");
/** Catmull-Rom kapalı/açık yumuşak yol */
export const egriD = (a: P2[], kapali = true) => {
  const n = a.length; if (n < 3) return yolD(a, kapali);
  const g = (i: number) => a[kapali ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${f1(a[0][0])},${f1(a[0][1])}`;
  for (let i = 0; i < (kapali ? n : n - 1); i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)},${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)},${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])},${f1(p2[1])}`;
  }
  return kapali ? d + "Z" : d;
};
export const daireD = (c: P2, r: number) => `M${f1(c[0] - r)},${f1(c[1])} a${f1(r)},${f1(r)} 0 1 0 ${f1(2 * r)},0 a${f1(r)},${f1(r)} 0 1 0 ${f1(-2 * r)},0Z`;
export const elipsNokta = (c: P2, rx: number, ry: number, don = 0, n = 28): P2[] => {
  const r = (don * Math.PI) / 180, cs = Math.cos(r), sn = Math.sin(r);
  return Array.from({ length: n }, (_, i) => { const t = (i / n) * Math.PI * 2, x = Math.cos(t) * rx, y = Math.sin(t) * ry; return [c[0] + x * cs - y * sn, c[1] + x * sn + y * cs] as P2; });
};

/** dışbükey zarf (monotone chain), saat yönünün tersi (ekranda) */
export function zarf(noktalar: P2[]): P2[] {
  const p = [...noktalar].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (p.length < 3) return p;
  const cr = (o: P2, a: P2, b: P2) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const alt: P2[] = [], ust: P2[] = [];
  for (const q of p) { while (alt.length >= 2 && cr(alt[alt.length - 2], alt[alt.length - 1], q) <= 0) alt.pop(); alt.push(q); }
  for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (ust.length >= 2 && cr(ust[ust.length - 2], ust[ust.length - 1], q) <= 0) ust.pop(); ust.push(q); }
  return alt.slice(0, -1).concat(ust.slice(0, -1));
}

/** nokta çokgen içinde mi (çift-tek) */
export const icindeMi = (p: P2, q: P2[]) => {
  let ic = false;
  for (let i = 0, j = q.length - 1; i < q.length; j = i++) {
    if ((q[i][1] > p[1]) !== (q[j][1] > p[1]) && p[0] < ((q[j][0] - q[i][0]) * (p[1] - q[i][1])) / (q[j][1] - q[i][1]) + q[i][0]) ic = !ic;
  }
  return ic;
};

/**
 * Uzuv şeridi: a → b ekseni boyunca yarıçap profili r(t) (t 0..1) ve isteğe bağlı yanal şişkinlik (+ = eksenin sol normali yönüne).
 * Uçlar yuvarlak değil (eklem dairesi ayrı parça); kapalı çokgen noktaları döner.
 */
export function uzuv(a: P2, b: P2, r: (t: number) => number, sis?: (t: number) => number, n = 14): P2[] {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  const sol: P2[] = [], sag: P2[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, c: P2 = [a[0] + dx * t, a[1] + dy * t], w = r(t), s = sis?.(t) ?? 0;
    sol.push([c[0] + nx * (w + Math.max(0, s)), c[1] + ny * (w + Math.max(0, s))]);
    sag.push([c[0] - nx * (w + Math.max(0, -s)), c[1] - ny * (w + Math.max(0, -s))]);
  }
  return [...sol, ...sag.reverse()];
}

/** düzgün geçişli yarıçap profili: [t, r] düğümleri arasında smoothstep */
export const profil = (dugum: [number, number][]) => (t: number) => {
  for (let i = 0; i < dugum.length - 1; i++) {
    const [t0, r0] = dugum[i], [t1, r1] = dugum[i + 1];
    if (t <= t1) { const u = Math.max(0, Math.min(1, (t - t0) / (t1 - t0 || 1))); return r0 + (r1 - r0) * u * u * (3 - 2 * u); }
  }
  return dugum[dugum.length - 1][1];
};

/**
 * Tek siluet: önce bütün parçaların mürekkep şeridi (konum "alt", dolgunun altında → yalnız dış yarısı görünür), sonra dolgular.
 * Parçalar arası iç kenarda çizgi çıkmaz. konturMaske: şerit katmanına uygulanacak <mask> id'si (kontursuz bölge).
 */
export const Siluet: React.FC<{ d: string[]; dolgu: string | string[]; kontur: string; ayar: KonturAyar; konturMaske?: string; konturAlfa?: number }> = ({ d, dolgu, kontur, ayar, konturMaske, konturAlfa = 1 }) => (
  <g>
    <g mask={konturMaske ? `url(#${konturMaske})` : undefined} opacity={konturAlfa}>
      <path d={d.map((x, i) => konturYol(x, { ...ayar, konum: "alt", seed: (ayar.seed ?? 7) + i * 31 })).join(" ")} fill={kontur} />
    </g>
    {d.map((x, i) => <path key={i} d={x} fill={Array.isArray(dolgu) ? dolgu[i] ?? dolgu[0] : dolgu} />)}
  </g>
);
