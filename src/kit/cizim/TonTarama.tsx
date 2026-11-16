// ===== Kalıcı çizim aracı 2: TON TARAMASI (Leningrad tur-3g kit kararı; yalnız EKLEME) =====
// Neden: hedef gravürde gölge binlerce ince çizgiyle kurulur; bizde birkaç düz dolgu vardı. Bu bileşen bir şekli (clip) ışık yönü ve
// ton (0–1) ile tarar: gölge tarafında çizgiler sıklaşır ve kalınlaşır, ışığa doğru incelip kaybolur (her çizgi MurekkepCizgi ucu).
// Yöntem (gravür eşikleme): her çizginin sabit bir eşiği vardır (8'li sıra: 0, .5, .25, .75 …). Noktadaki ton eşiği geçince çizgi
// görünür; ton arttıkça daha çok çizgi devreye girer (yoğunluk) ve her çizgi kalınlaşır (değer). Ton düşerken çizgi incelip biter.
// Modlar: "duz" (paralel), "egri" (verilen eksen eğrisinin paralel kopyaları: kumaş kıvrımı, silindir kesiti, küre yayı),
//         "isinsal" (bir merkezden ışınsal: perspektif kaçış noktasına giden cephe taraması).
// Çapraz tarama (CLAUDE "Gravür telefonda okunur"): YALNIZ şeklin kutusu ≤ CAPRAZ_MAKS (120 px) ise ve yalnız ton > ~.75 yerlerde.
// Geniş alanda istenirse yok sayılır (kafes / tel örgü yasak). Varsayılan aralık 6.5 px / çizgi 2.0 px → 360 px'te ~0.65 px.
// Mevcut `src/doku/Tarama.tsx` DEĞİŞMEDİ (eski bölümler piksel-aynı); yalnız sabitleri okunur.
import React, { useId } from "react";
import { rnd } from "../../doku/sabitler";
import { CAPRAZ_ACI, CAPRAZ_MAKS } from "../../doku/Tarama";
import { murekkepYol, P2, yenidenOrnekle, yolNoktalari } from "./MurekkepCizgi";

export type TonAyar = {
  /** ışığın EKRANDA gittiği yön (gölge bu yönün ucunda) */
  isik: P2;
  /** en koyu yerin tonu 0..1 */
  ton: number;
  renk: string;
  seed: number;
  /** çizgi aralığı (px) ve en kalın çizgi (px) */
  aralik?: number; kalinlik?: number;
  /** "duz" çizgi açısı (derece); varsayılan ışık ışınlarına dik */
  aci?: number;
  mod?: "duz" | "egri" | "isinsal";
  /** egri: çizgiler bu eğrinin paralel kopyaları */
  eksen?: P2[];
  /** egri: kopyaların öteleme yönü (varsayılan eksen kirişine dik) */
  kayma?: P2;
  /** isinsal: ışınların merkezi */
  merkez?: P2;
  /** ışık ekseni boyunca (şeklin kutusunda −1 ışık ucu … +1 gölge ucu) tonun 0'dan tama çıktığı aralık */
  gecis?: [number, number];
  /** özel ton alanı (0..1); verilirse ton·gecis yerine kullanılır (ton ile çarpılır) */
  tonFn?: (p: P2) => number;
  /** çapraz tarama iste (yalnız küçük şekilde uygulanır) */
  capraz?: boolean;
  /** şeklin altına mürekkep renginde ton bloğu (α = tonBlok·ton) */
  tonBlok?: number;
  alfa?: number;
  /** kutu ezmesi [x0, y0, x1, y1] */
  kutu?: [number, number, number, number];
  /** çalışma sınırı (varsayılan 1080×1920 kare + 40 px pay): şeklin kutusu bununla kesilir (perspektifte ekran dışına uzanan çokgenler) */
  sinir?: [number, number, number, number];
  titreme?: number;
  /** çizginin eşik üstü ton aralığı (yumuşaklık): küçük = sert uç */
  yumusak?: number;
};

const SIRA = [0, 0.5, 0.25, 0.75, 0.125, 0.625, 0.375, 0.875];
/** parça listesi: her parça kendi alt yollarıyla çift-tek kuralı; parçaların BİRLEŞİMİ (çok parçalı siluet) */
const icinde = (p: P2, parcalar: P2[][][]) => parcalar.some((poli) => {
  let ic = false;
  for (const q of poli) for (let i = 0, j = q.length - 1; i < q.length; j = i++) {
    if ((q[i][1] > p[1]) !== (q[j][1] > p[1]) && p[0] < ((q[j][0] - q[i][0]) * (p[1] - q[i][1])) / (q[j][1] - q[i][1]) + q[i][0]) ic = !ic;
  }
  return ic;
});
const kutuBul = (poli: P2[][]): [number, number, number, number] => {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const q of poli) for (const p of q) { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); }
  return [x0, y0, x1, y1];
};

/** tarama çizgilerinin dolgu yolu (tek path d). Bileşen dışında da kullanılabilir (ör. bir maskeyle). */
export const tonTaramaYol = (d: string | string[], a: TonAyar): string => {
  const parcalar = (Array.isArray(d) ? d : [d]).map((x) => yolNoktalari(x, 6)).filter((q) => q.length);
  if (!parcalar.length) return "";
  const K0 = a.kutu ?? kutuBul(parcalar.flat()), SN = a.sinir ?? [-40, -40, 1120, 1960];
  const K: [number, number, number, number] = [Math.max(K0[0], SN[0]), Math.max(K0[1], SN[1]), Math.min(K0[2], SN[2]), Math.min(K0[3], SN[3])];
  if (!(K[2] > K[0] && K[3] > K[1])) return "";
  const [x0, y0, x1, y1] = K, W = x1 - x0, H = y1 - y0, c: P2 = [(x0 + x1) / 2, (y0 + y1) / 2];
  const ll = Math.hypot(a.isik[0], a.isik[1]) || 1, lx = a.isik[0] / ll, ly = a.isik[1] / ll;
  const yari = 0.5 * (Math.abs(W * lx) + Math.abs(H * ly)) || 1;
  const [g0, g1] = a.gecis ?? [-0.15, 0.85];
  const ss = (x: number) => { const t = Math.max(0, Math.min(1, (x - g0) / (g1 - g0))); return t * t * (3 - 2 * t); };
  const ton = (p: P2) => a.ton * (a.tonFn ? a.tonFn(p) : ss(((p[0] - c[0]) * lx + (p[1] - c[1]) * ly) / yari));
  const ar = a.aralik ?? 6.5, kal = a.kalinlik ?? 2.0, yum = a.yumusak ?? 0.2, ADIM = 4;
  const aci0 = a.aci ?? (Math.atan2(ly, lx) * 180) / Math.PI + 90;

  // çizgi aileleri (nokta dizileri)
  const aile = (aci: number, sd: number): P2[][] => {
    const out: P2[][] = [];
    if ((a.mod ?? "duz") === "duz") {
      const r = (aci * Math.PI) / 180, ux = Math.cos(r), uy = Math.sin(r), nx = -uy, ny = ux;
      const kose: P2[] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
      const pn = kose.map((k) => (k[0] - c[0]) * nx + (k[1] - c[1]) * ny), pu = kose.map((k) => (k[0] - c[0]) * ux + (k[1] - c[1]) * uy);
      const nMin = Math.min(...pn), nMax = Math.max(...pn), uMin = Math.min(...pu) - 4, uMax = Math.max(...pu) + 4;
      let i = 0;
      for (let o = nMin + ar * 0.5; o <= nMax; o += ar * (0.9 + 0.2 * rnd(sd, `a${i}`)), i++) {
        const q: P2[] = [];
        for (let u = uMin; u <= uMax; u += ADIM) q.push([c[0] + nx * o + ux * u, c[1] + ny * o + uy * u]);
        out.push(q);
      }
    } else if (a.mod === "egri") {
      // kopyalar normal yönünde ÖTELENİR (normal ofset büyük kavislerde ters döner → sahte çapraz); uçlar teğetle uzatılır
      const e0 = a.eksen ?? [[x0, c[1]], [x1, c[1]]];
      const t0 = [e0[0][0] - e0[1][0], e0[0][1] - e0[1][1]], t1 = [e0[e0.length - 1][0] - e0[e0.length - 2][0], e0[e0.length - 1][1] - e0[e0.length - 2][1]];
      const l0 = Math.hypot(t0[0], t0[1]) || 1, l1 = Math.hypot(t1[0], t1[1]) || 1, uz = Math.max(W, H);
      const e = yenidenOrnekle([[e0[0][0] + (t0[0] / l0) * uz, e0[0][1] + (t0[1] / l0) * uz], ...e0, [e0[e0.length - 1][0] + (t1[0] / l1) * uz, e0[e0.length - 1][1] + (t1[1] / l1) * uz]], ADIM, true);
      const ux = e0[e0.length - 1][0] - e0[0][0], uy = e0[e0.length - 1][1] - e0[0][1], ul = Math.hypot(ux, uy) || 1;
      const kx = a.kayma ? a.kayma[0] : -uy / ul, ky = a.kayma ? a.kayma[1] : ux / ul, kl = Math.hypot(kx, ky) || 1;
      const ek: P2 = [e0[Math.floor(e0.length / 2)][0], e0[Math.floor(e0.length / 2)][1]];
      const pk = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map((k) => ((k[0] - ek[0]) * kx + (k[1] - ek[1]) * ky) / kl);
      const oMin = Math.min(...pk) - ar * 2, oMax = Math.max(...pk) + ar * 2;
      let i = 0;
      for (let o = oMin; o <= oMax; o += ar * (0.9 + 0.2 * rnd(sd, `a${i}`)), i++) out.push(e.map((p) => [p[0] + (kx / kl) * o, p[1] + (ky / kl) * o] as P2));
    } else {
      const m = a.merkez ?? [c[0], y0 - 1000];
      const kose: P2[] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
      const acilar = kose.map((k) => Math.atan2(k[1] - m[1], k[0] - m[0]));
      // açı sarması: merkez kutunun solundaysa sorun yok; genel durumda en küçük aralığı al
      let aMin = Math.min(...acilar), aMax = Math.max(...acilar);
      if (aMax - aMin > Math.PI) { const s = acilar.map((v) => (v < 0 ? v + 2 * Math.PI : v)); aMin = Math.min(...s); aMax = Math.max(...s); }
      const rr = kose.map((k) => Math.hypot(k[0] - m[0], k[1] - m[1]));
      const rIc = Math.max(0, Math.min(...rr) - Math.max(W, H)), rDis = Math.max(...rr);
      const dc = Math.hypot(c[0] - m[0], c[1] - m[1]) || 1, adimA = ar / dc;
      let i = 0;
      for (let t = aMin; t <= aMax; t += adimA * (0.9 + 0.2 * rnd(sd, `a${i}`)), i++) {
        const q: P2[] = []; for (let r = rIc; r <= rDis; r += ADIM) q.push([m[0] + Math.cos(t) * r, m[1] + Math.sin(t) * r]);
        out.push(q);
      }
    }
    return out;
  };

  const yollar: string[] = [];
  const isle = (cizgiler: P2[][], esikTaban: number, esikAralik: number, kalCarp: number, sd: number) => {
    cizgiler.forEach((q, i) => {
      const th = esikTaban + esikAralik * SIRA[i % 8] + (rnd(sd, `t${i}`) - 0.5) * 0.05;
      // içeride mi (1 örnek genişletilmiş) + ton
      const ic = q.map((p) => p[0] >= x0 - 2 && p[0] <= x1 + 2 && p[1] >= y0 - 2 && p[1] <= y1 + 2 && icinde(p, parcalar));
      const icG = ic.map((v, j) => v || ic[j - 1] || ic[j + 1]);
      let seg: P2[] = [], bas: number[] = [];
      const bitir = () => {
        if (seg.length >= 3) {
          const tepe = Math.max(...bas);
          yollar.push(murekkepYol(seg, { kalinlik: kal * kalCarp * (0.6 + 0.4 * tepe), basinc: bas.map((b) => b / Math.max(0.05, tepe)), seed: sd + i, titreme: a.titreme ?? 0.3, kalinlikOyna: 0.1, ucBas: 6, ucSon: 6, incelme: 0.85 }));
        }
        seg = []; bas = [];
      };
      q.forEach((p, j) => {
        const v = icG[j] ? (ton(p) - th) / yum : -1;
        if (v > 0) { seg.push(p); bas.push(Math.min(1, v)); } else bitir();
      });
      bitir();
    });
  };
  isle(aile(aci0, a.seed), 0.06, 0.82, 1, a.seed);
  if (a.capraz && W <= CAPRAZ_MAKS && H <= CAPRAZ_MAKS && (a.mod ?? "duz") === "duz") isle(aile(aci0 + CAPRAZ_ACI, a.seed + 7), 0.72, 0.22, 0.85, a.seed + 7);
  return yollar.join(" ");
};

/** d: tek şekil ya da parça listesi (birleşim; clip her parçayı ayrı path olarak alır → yönelimden bağımsız birleşim) */
export const TonTarama: React.FC<TonAyar & { d: string | string[] }> = ({ d, ...a }) => {
  const id = "tt" + useId().replace(/:/g, "");
  // saf (seed'li) hesap: kareye bağlı değil, kaynamaz
  const yol = tonTaramaYol(d, a);
  return (
    <g>
      <defs><clipPath id={id}>{(Array.isArray(d) ? d : [d]).map((x, i) => <path key={i} d={x} />)}</clipPath></defs>
      <g clipPath={`url(#${id})`}>
        {a.tonBlok ? <rect x={-2000} y={-2000} width={6000} height={6000} fill={a.renk} opacity={a.tonBlok * a.ton} /> : null}
        <path d={yol} fill={a.renk} opacity={a.alfa ?? 0.9} />
      </g>
    </g>
  );
};
