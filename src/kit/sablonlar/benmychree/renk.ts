// hex renk karışımı (sRGB doğrusal değil; litografi basamakları için yeterli)
const h2 = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
export const karisim = (a: string, b: string, t: number) => {
  const A = h2(a), B = h2(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * Math.max(0, Math.min(1, t))).toString(16).padStart(2, "0")).join("");
};
