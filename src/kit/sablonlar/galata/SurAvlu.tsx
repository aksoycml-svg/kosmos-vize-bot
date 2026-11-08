// ===== SurAvlu (K7; mekanlar.md R5 §2.4b + §8): kale/kule dibi — tek sur kolu (iç yüz) + kesme taş döşeli avlu, tek nokta perspektif =====
// Dekor px. Kule düzlemi (z = 0) ölçeği pxm; göz zeminden göz_m, kuleden kamera_uzaklik_m (D). VP = (vp.x, zemin_y − göz_m·pxm).
//   • Her yatay kenar VP doğrusu: x(y) = vp.x + (x₀ − vp.x)(y − vp.y)/(y₀ − vp.y)   [(x₀, y₀) kule düzlemindeki nokta]
//   • Zemin sırası z (m, kuleden): y(z) = vp.y + (zemin_y − vp.y)·D/(D − z)
// Dip tek çizimdir (p148 kamerası); vinç 2B kaydırma olduğundan perspektif kare kare değişmez (fiziksel tutarlı: duvar üstü görünmez).
// Mazgal, kapı, ok yarığı, kaide çıkıntısı YOK (kaynaksız, §2.4b). Tarama yok (geniş gölge yüzü düz ton, §0.5). Güneş gölgesi yok (kule gölgesi).
import React from "react";
import { ink, P, poly, rnd } from "../../../doku/sabitler";

export type SurAvluProps = {
  vp: P; pxm: number; zemin_y: number; kamera_uzaklik_m: number;
  sur: { kose_x: number; yukseklik_m: number; sira_m: number; blok_m: [number, number]; taraf: "sol"; sol_x: number; harpusta_m?: number };
  doseme: { en_m: number; derinlik_m: number; sira1_x0: number; sasirt: boolean; sag_x: number; sira_n?: number };
  seed: [number, number]; // [avlu, sur]
  ustKirp?: number;       // bu y'nin üstü çizilmez (yakın kameralı planlarda VP doğrusunun uzantısı görünmesin)
  kirikLevha?: [P, P];
};
export const SUR_R = {
  yuz: "#7b7163", derz: "#57503f", koyu: "#6f6555", harpustaAlt: "#4a4237",
  levha: "#62594a", levhaDerz: "#4a4237", dip: "#3e372e",
};

export const SurAvlu: React.FC<SurAvluProps> = ({ vp, pxm, zemin_y, kamera_uzaklik_m: D, sur, doseme, seed, ustKirp = -Infinity, kirikLevha }) => {
  const R = SUR_R;
  const [sA, sS] = seed;
  const h0 = zemin_y - vp[1];
  const yZ = (z: number) => vp[1] + (h0 * D) / (D - z);
  const xVP = (x0: number, y0: number, y: number) => vp[0] + ((x0 - vp[0]) * (y - vp[1])) / (y0 - vp[1]);
  const yVP = (x0: number, y0: number, x: number) => vp[1] + ((y0 - vp[1]) * (x - vp[0])) / (x0 - vp[0]);
  const K = sur.kose_x, XL = sur.sol_x, XR = doseme.sag_x;
  const tep = zemin_y - sur.yukseklik_m * pxm, hAlt = zemin_y - (sur.yukseklik_m - (sur.harpusta_m ?? 0.25)) * pxm;
  const dipL = yVP(K, zemin_y, XL);
  // sur yüzündeki derinlik (z) → x (dip çizgisi üstünde): x = vp.x + (K − vp.x)·D/(D − z)
  const xDer = (z: number) => vp[0] + ((K - vp[0]) * D) / (D - z);
  const zMax = D - ((K - vp[0]) * D) / (XL - vp[0]);
  const out: React.ReactNode[] = [];
  const kirpId = `sa${sA}${sS}`;

  // ---- 5 avlu döşemesi (zemin: kule dibi ↔ sur dip doğrusu ↔ kadraj altı) ----
  const yAlt = yZ(Math.min(D - 0.35, 3.2));
  const zemin: P[] = [[K, zemin_y], [XR, zemin_y], [XR, yAlt + 2000], [XL - 200, yAlt + 2000], [XL - 200, yVP(K, zemin_y, XL - 200)]];
  out.push(<polygon key="av" points={poly(zemin)} fill={R.levha} />);
  // enine derzler (sıra derinliği doseme.derinlik_m)
  const sN = doseme.sira_n ?? 8;
  const ys = Array.from({ length: sN + 1 }).map((_, i) => yZ(i * doseme.derinlik_m));
  const solX = (y: number) => xVP(K, zemin_y, y); // sur dip doğrusu
  ys.slice(1).forEach((y, i) => out.push(<line key={`e${i}`} x1={solX(y)} y1={y} x2={XR} y2={y} stroke={R.levhaDerz} strokeWidth={3} />));
  // boyuna derzler: sıra r (1 = kuleye bitişik), taban x₀ = sira1_x0 + en·k + yarım·((r+1) mod 2); sıra 1 sabit, diğerleri ±12 px titreşim
  const en = doseme.en_m * pxm;
  for (let r = 1; r <= sN; r++) {
    const y0 = ys[r - 1], y1 = ys[r];
    for (let k = -4; k <= 6; k++) {
      const x0 = doseme.sira1_x0 + en * k + (doseme.sasirt ? (en / 2) * ((r + 1) % 2) : 0) + (r === 1 ? 0 : (rnd(sA, `j${r}-${k}`) - 0.5) * 24);
      const a: P = [xVP(x0, zemin_y, y0), y0], b: P = [xVP(x0, zemin_y, y1), y1];
      if (Math.max(a[0], b[0]) > XR + 40) continue;
      if (b[0] < solX(y1) && a[0] < solX(y0)) continue;
      out.push(<line key={`b${r}-${k}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={R.levhaDerz} strokeWidth={3} />);
    }
  }
  if (kirikLevha) out.push(<line key="kl" x1={kirikLevha[0][0]} y1={kirikLevha[0][1]} x2={kirikLevha[1][0]} y2={kirikLevha[1][1]} stroke={R.levhaDerz} strokeWidth={2} strokeOpacity={0.7} />);
  // 2 kule duvar dibi çizgisi (ölçek öğesi 1)
  out.push(<line key="dd" x1={K} y1={zemin_y} x2={XR + 40} y2={zemin_y} stroke={R.dip} strokeWidth={4} />);

  // ---- 4 köşe gölgesi (sur–kule iç köşesi: kule yüzünde 10 px düşey bant, düz ton) ----
  out.push(<rect key="kg" x={K} y={tep} width={10} height={zemin_y - tep} fill={R.derz} opacity={0.6} />);

  // ---- 3 sur iç yüzü ----
  const yuz: P[] = [[K, tep], [K, zemin_y], [XL, dipL], [XL, yVP(K, tep, XL)]];
  out.push(<polygon key="sy" points={poly(yuz)} fill={R.yuz} />);
  // 3a taş sıraları (sira_m, köşede) — her sıra VP doğrusu; bloklar sıra başına şaşırtmalı, her 7. blok koyu
  const sira = sur.sira_m * pxm;
  const nS = Math.ceil((zemin_y - hAlt) / sira);
  let blok = 0;
  for (let r = 0; r < nS; r++) {
    const ya = zemin_y - r * sira, yb = Math.max(hAlt, ya - sira);
    // bloklar: derinlik z ekseninde blok_m aralığında
    let z = -rnd(sS, `o${r}`) * sur.blok_m[0];
    while (z < zMax) {
      const bz = sur.blok_m[0] + rnd(sS, `b${r}-${blok}`) * (sur.blok_m[1] - sur.blok_m[0]);
      const z0 = Math.max(0, z), z1 = Math.min(zMax, z + bz);
      blok++;
      if (z1 > z0 && blok % 7 === 0) {
        const xa = xDer(z0), xb = xDer(z1);
        out.push(<polygon key={`kb${r}-${blok}`} points={poly([[xa, yVP(K, ya, xa)], [xb, yVP(K, ya, xb)], [xb, yVP(K, yb, xb)], [xa, yVP(K, yb, xa)]])} fill={R.koyu} />);
      }
      z += bz;
      if (z > 0.02 && z < zMax - 0.02) { const x = xDer(z); out.push(<line key={`sd${r}-${blok}`} x1={x} y1={yVP(K, ya, x)} x2={x} y2={yVP(K, yb, x)} stroke={R.derz} strokeWidth={2.5} />); }
    }
    if (r > 0) out.push(<line key={`sh${r}`} x1={K} y1={ya} x2={XL} y2={yVP(K, ya, XL)} stroke={R.derz} strokeWidth={2.5} />);
  }
  // 3b harpuşta: alın bandı + alt kenarında 3 px gölge çizgisi; üst yüz çizilmez (göz hizasının üstünde)
  out.push(<polygon key="hp" points={poly([[K, tep], [K, hAlt], [XL, yVP(K, hAlt, XL)], [XL, yVP(K, tep, XL)]])} fill={R.koyu} stroke={ink(R.koyu)} strokeWidth={3} strokeLinejoin="round" />);
  out.push(<line key="ha" x1={K} y1={hAlt + 2} x2={XL} y2={yVP(K, hAlt + 2, XL)} stroke={R.harpustaAlt} strokeWidth={3} />);
  // sur köşe (kule birleşimi) düşey kontur + sur dip çizgisi
  out.push(<line key="kk" x1={K} y1={tep} x2={K} y2={zemin_y} stroke={ink(R.yuz)} strokeWidth={4} />);
  out.push(<line key="sdp" x1={K} y1={zemin_y} x2={XL} y2={dipL} stroke={R.dip} strokeWidth={4} />);

  return <g>
    <defs><clipPath id={kirpId}><rect x={-4000} y={ustKirp} width={9000} height={20000} /></clipPath></defs>
    <g clipPath={`url(#${kirpId})`}>{out}</g>
  </g>;
};
