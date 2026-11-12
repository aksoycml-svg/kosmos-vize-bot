// ===== KE-PK-N3 KUYRUK KILIFI — İMZA (tasarim.md §2; bal kehribarı #F0B43C) =====
// Yerel birim mm, +x kuyruk ucuna doğru (tüy boyunca), y aşağı. Boy 72 × 9.6 mm (gerçek 4.5 × 0.6 cm × 1.6 stilize; bölümde SABİT).
// Yarı saydamlık bir ÇİZİM DİLİDİR (alfa yok, imza rengi zemine göre kaymaz): opak gövde ışık/gölge yarısı (tek net sınır) +
// iç film gölgesi (SAKLANAN ŞEY: kapalıyken bulanık) + ince parlak iç kenar + TEK spekülar hilal (yıldız/hale/kıvılcım YOK).
// Durumlar: parilti (−1…1 hilalin kılıf boyunca konumu; null = sabit yerinde), coz 0…1 (ip sargıları gevşer → ip ucu `ipUc`a gider),
// kapak 0…1 (tıkaç +x ucunda menteşeli açılır, fiziksel olarak yerinde kalır), serit 0…1 (film şeridi açık uçtan 1/3 boy çıkar).
// Çizgi kalınlıkları EKRAN px (vector-effect non-scaling-stroke): çağıran transform ile ölçekler.
import React, { useId } from "react";
import type { P } from "../../tipler";

export const KILIF = { L: 72, R: 4.8, govde: "#F0B43C", golge: "#C98F26", kenar: "#FBE3A0", hilal: "#FFF3CC", film: "#4a3e34", tikac: "#B9801F", ip: "#c9c3b2", ipGolge: "#8d8878", serit: "#2e2621", seritKenar: "#8a8072", seritHale: "#d8cfbe", kontur: "#7a5414" };
// ip düğümü (yerel): sargılar x −20 ve +20; düğüm +20'nin üstünde
export const KILIF_DUGUM: P = [-20, 6]; // gövde tarafındaki sargının altında (el aşağıdan kavrar; tıkaç ucu açık kalır)

const nss = { vectorEffect: "non-scaling-stroke" as const, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const Kilif: React.FC<{ olcek: number; parilti?: number | null; coz?: number; kapak?: number; serit?: number; ipUc?: P; acik?: boolean; kontur?: number }> = ({ olcek, parilti = null, coz = 0, kapak = 0, serit = 0, ipUc, kontur = 2.5 }) => {
  const id = "kf" + useId().replace(/:/g, "");
  const { L, R } = KILIF, h = L / 2;
  const kaps = `M ${-h + R} ${-R} L ${h - R} ${-R} A ${R} ${R} 0 0 1 ${h - R} ${R} L ${-h + R} ${R} A ${R} ${R} 0 0 1 ${-h + R} ${-R} Z`;
  const bulanik = Math.max(0.6, 3.2 / Math.max(0.05, olcek)) * (1 - Math.min(1, serit * 1.5)); // ekranda ≈3 px bulanıklık
  const hx = parilti === null ? -12 : parilti * (h - 10);
  const sw = (w: number) => w; // ekran px
  // ip: iki sargı (x −20, +20) + düğüm ucu. Çözülürken her nokta gevşek ip yoluna (düğümden ipUc'a sarkan eğri) kayar — fade yok.
  const sargi = (x: number): P[] => [[x - 2, -R - 1.2], [x + 2, R + 1.2], [x + 4, R + 1.2], [x, -R - 1.2]];
  const sarili: P[] = [...sargi(20), [0, -R - 1.5], ...sargi(-20), [KILIF_DUGUM[0] - 2, KILIF_DUGUM[1] + 3], [KILIF_DUGUM[0] - 4, KILIF_DUGUM[1] + 8]];
  const uc: P = ipUc ?? [KILIF_DUGUM[0] + 30, KILIF_DUGUM[1] + 40];
  const gevsek: P[] = sarili.map((_, i) => {
    const t = i / (sarili.length - 1); // ip boyunca: 0 serbest uç (sarkar) … 1 tutulan uç (ipUc)
    const sark = Math.sin(Math.PI * t) * 14;
    return [lerp(uc[0] - 6, uc[0], t) + (1 - t) * -4, lerp(uc[1] + 46, uc[1], t) + sark * 0.2] as P;
  });
  const ipYol = sarili.map((q, i) => [lerp(q[0], gevsek[i][0], coz), lerp(q[1], gevsek[i][1], coz)] as P);
  if (ipUc && coz < 1) ipYol[ipYol.length - 1] = [lerp(ipUc[0], ipYol[ipYol.length - 1][0], coz), lerp(ipUc[1], ipYol[ipYol.length - 1][1], coz)]; // tutulan uç gergin
  const d = (pts: P[]) => "M " + pts.map((q) => `${q[0].toFixed(2)} ${q[1].toFixed(2)}`).join(" L ");
  const sx = h - 2, sL = 24 * serit; // şerit açık uçtan çıkar
  const kapakAci = -100 * kapak; // menteşe üst kenarda (+x ucu)
  return (
    <g>
      <defs>
        <clipPath id={`${id}c`}><path d={kaps} /></clipPath>
        <filter id={`${id}b`} x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation={bulanik} /></filter>
      </defs>
      {/* film şeridi (kılıfın dışına çıkan kısım; kapak açıkken) */}
      {serit > 0 && (
        <g>
          {/* gri tüy üstünde seçilsin (A: #5a5048 tüy griyle aynı parlaklıktaydı): açık krem hale + koyu gövde + açık kenar */}
          <rect x={sx - 20} y={-3} width={20 + sL} height={6} fill="none" stroke={KILIF.seritHale} strokeWidth={sw(5)} style={nss} />
          <rect x={sx - 20} y={-3} width={20 + sL} height={6} fill={KILIF.serit} stroke="#1f1a16" strokeWidth={sw(2)} style={nss} />
          <line x1={sx - 20} y1={-1.8} x2={sx + sL} y2={-1.8} stroke={KILIF.seritKenar} strokeWidth={sw(2)} style={nss} />
          {[6, 14, 22].filter((x) => x < sL).map((x) => <line key={x} x1={sx + x} y1={-2.6} x2={sx + x} y2={2.6} stroke={KILIF.seritKenar} strokeWidth={sw(1.5)} style={nss} />)}
        </g>
      )}
      {/* gövde: ışık yarısı + gölge yarısı (tek net sınır) */}
      <path d={kaps} fill={KILIF.govde} />
      <g clipPath={`url(#${id}c)`}>
        <rect x={-h} y={0.9} width={L} height={R} fill={KILIF.golge} />
        {/* iç film gölgesi: SAKLANAN ŞEY (kapalıyken bulanık, okunmaz) */}
        <rect x={-h + 7} y={-1.6} width={L - 16} height={3.6} fill={KILIF.film} opacity={0.6} filter={bulanik > 0.05 ? `url(#${id}b)` : undefined} />
        {/* parlak iç kenar (ışık yönü: üst) */}
        <path d={`M ${-h + R} ${-R + 1.1} L ${h - R} ${-R + 1.1}`} stroke={KILIF.kenar} strokeWidth={sw(2)} fill="none" style={nss} />
        {/* tek spekülar hilal */}
        <path d={`M ${hx - 6} ${-R + 1.6} Q ${hx} ${-R + 3.4} ${hx + 6} ${-R + 1.6} Q ${hx} ${-R + 2.4} ${hx - 6} ${-R + 1.6} Z`} fill={KILIF.hilal} stroke={KILIF.hilal} strokeWidth={sw(1.5)} style={nss} />
      </g>
      <path d={kaps} fill="none" stroke={KILIF.kontur} strokeWidth={sw(kontur)} style={nss} />
      {/* tıkaç ucu (+x), menteşe üst kenarda */}
      <g transform={`rotate(${kapakAci} ${h - 1} ${-R})`}>
        <path d={`M ${h - 6} ${-R} L ${h - R + 0.5} ${-R} A ${R} ${R} 0 0 1 ${h - R + 0.5} ${R} L ${h - 6} ${R} Z`} fill={KILIF.tikac} stroke={KILIF.kontur} strokeWidth={sw(kontur)} style={nss} />
      </g>
      {/* ip: sargılar → gevşek (gölge + ip) */}
      <path d={d(ipYol)} transform="translate(0.5 0.6)" fill="none" stroke={KILIF.ipGolge} strokeWidth={sw(Math.max(2, 1.1 * olcek))} style={nss} />
      <path d={d(ipYol)} fill="none" stroke={KILIF.ip} strokeWidth={sw(Math.max(1.6, 0.8 * olcek))} style={nss} />
    </g>
  );
};
