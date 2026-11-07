import React, { createContext, useContext, useId } from "react";
import type { Isik } from "../doku/Isik";
import { Desen, TARAMA_ARALIK, TARAMA_KALINLIK, taramaAcisi } from "../doku/Tarama";
import { karistir, P } from "../doku/sabitler";

// ===== RİG IŞIĞI (A5r · elestiri-D bölüm 4 adım 3c; "iki yolun ortak borcu") =====
// Kukla ve KolEl sahnenin TEK Isik tanımından ışık alır: gölge yanı, tarama yönü, kenar ışığı rengi aynı kaynaktan türer.
// Kurallar:
//  - Kumaş: ışığa bakmayan yanda NET kenarlı ton bloğu + ışık yönüne dik TEK yönlü tarama (sahnenin θ'sı: taramaAcisi(isik)).
//    Terminatör uzuv eksenine paralel düz bir çizgi (silindir gölgesi); gölge payı ≤ %62 → kumaş hiçbir yerde "her yanda" taranmaz.
//  - Işık tarafında ince SICAK kenar ışığı (ışık rengi), soğuk RIM yerine.
//  - Yüz ve el: tarama YOK; yüzde yumuşak ton düşümü (skinDark'a degrade), arkadan ışıkta bile okunur (en çok %55).
//  - Kontur: rig'in kendi ink'i sahne mürekkebine karıştırılır (aynı çizgi ailesi).
// `isik` verilmezse rig eski davranışını birebir korur (Proto, hibrit test).

export type KuklaIsik = {
  v: [number, number, number]; // ışığa doğru birim vektör (x sağ, y yukarı, z kameraya doğru) — ekran düzleminde
  renk: string;                // kenar ışığı (ışık rengi)
  aci: number;                 // sahnenin tek tarama yönü θ (derece, ekran)
  murekkep?: string;           // sahne mürekkep tonu (kontur ailesi)
  sertlik: number;             // 0..1 (öğle güneşi 1, réverbère 0.8): ton bloğu + tarama yoğunluğu
  kamera: number;              // kamera ölçeği (tarama ekranda sabit aralıkta kalsın)
  seed: number;
};

const norm3 = (a: [number, number, number]): [number, number, number] => { const L = Math.hypot(...a) || 1; return [a[0] / L, a[1] / L, a[2] / L]; };

// Sahne Isik'ından kukla ışığı. ayak: figürün zemin noktası (sahne koordinatı), boyPx: figür boyu (sahne px, şapkasız ≈ 600·ölçek).
// yonlu: yon = h yüksekliğindeki noktanın zemin izdüşümü kayması / h → ışığa doğru (−gx, 1, −k·gy); gy > 0 (gölge kameraya doğru) = arkadan ışık.
//        k = 3: zemin kısalması (alçak kamera) — ekran gy'si derinliğin ≈ 1/3'ü.
// nokta: kaynak (zemin.x, zemin.y − yukseklik); figür merkezi göğüs hizası; z = kaynağın zemin izdüşümü figürden önde mi (y büyük = yakın).
export const kuklaIsigi = (isik: Isik, ayak: P, boyPx: number, ek: { murekkep?: string; kamera?: number; sertlik?: number; seed?: number } = {}): KuklaIsik => {
  let v: [number, number, number];
  if (isik.tip === "yonlu") v = norm3([-isik.yon[0], 1, -3 * isik.yon[1]]);
  else {
    const kx = isik.zemin[0], ky = isik.zemin[1] - isik.yukseklik;
    const mx = ayak[0], my = ayak[1] - boyPx * 0.55;
    v = norm3([kx - mx, my - ky, (isik.zemin[1] - ayak[1]) * 3]);
  }
  return { v, renk: isik.renk, aci: taramaAcisi(isik), murekkep: ek.murekkep, sertlik: ek.sertlik ?? (isik.tip === "yonlu" ? 1 : 0.8), kamera: ek.kamera ?? 1, seed: ek.seed ?? 1 };
};

// ---- Kukla içi bağlam ----
export type RigBaglam = { I: KuklaIsik | null; f: 1 | -1; s: number };
export const RigCtx = createContext<RigBaglam>({ I: null, f: 1, s: 1 });
export const useRig = () => useContext(RigCtx);

// Gölge yanı: uzvun yerel çerçevesi (Kukla yerel, aynalı) a derece döndürülmüş. Dönüş: yan (gölgenin yerel x işareti), oran (genişlik payı).
export const golgeYani = (I: KuklaIsik, f: 1 | -1, a: number) => {
  const Lx = I.v[0] * f, Ly = -I.v[1]; // ekran (y aşağı), aynalı yerel
  const r = (a * Math.PI) / 180;
  const lat = Lx * Math.cos(r) + Ly * Math.sin(r); // uzuv çerçevesinde yanal bileşen
  const zc = I.v[2];
  const h = Math.hypot(lat, zc);
  let oran = h < 1e-3 ? 0.5 : (1 - zc / h) / 2;     // silindir terminatörü: önden 0, yandan .5, arkadan 1
  oran *= 1 - 0.35 * Math.max(0, I.v[1]) ** 2;       // tepeden ışık: ön yüz gök ışığı alır (gölge daralır)
  oran = Math.max(0.12, Math.min(0.62, oran));
  return { yan: (lat >= 0 ? -1 : 1) as 1 | -1, oran };
};

// Ekran ölçüsüne göre tarama basamağı (TARAMA_ARALIK/KALINLIK, telefon ölçüsü)
const derinlikBul = (boyEkran: number) => (boyEkran >= 900 ? "yakin" : boyEkran >= 380 ? "orta" : "uzak") as "yakin" | "orta" | "uzak";

// Mürekkep: rig ink'i sahne mürekkebine karışır
export const useInk = (temel: (c: string) => string) => {
  const { I } = useRig();
  return (c: string) => (I?.murekkep ? karistir(temel(c), I.murekkep, 0.5) : temel(c));
};

// ---- Bölge: bir uzvun gölge yanı (ton bloğu + tarama) + ışık yanı kenar ışığı ----
// d: uzvun yerel yolu (kırpma), k: yerel kutu [x0, x1, y0, y1], a: uzvun toplam yerel dönüşü (lean + omuz + dirsek…)
export const Bolge: React.FC<{ d: string; k: [number, number, number, number]; a: number; renk: string; tarama?: boolean; kenar?: boolean; ton?: number }> = ({ d, k, a, renk, tarama = true, kenar = true, ton = 1 }) => {
  const { I, f, s } = useRig();
  const id = "rb" + useId().replace(/:/g, "");
  if (!I) return null;
  const { yan, oran } = golgeYani(I, f, a);
  const [x0, x1, y0, y1] = k, w = x1 - x0;
  const gx = yan < 0 ? [x0 - 6, x0 + oran * w] : [x1 - oran * w, x1 + 6];
  const ix = yan < 0 ? [x1 - 0.2 * w, x1 + 6] : [x0 - 6, x0 + 0.2 * w];
  const olc = Math.max(0.05, s * I.kamera); // yerel birim → ekran px
  const der = derinlikBul(620 * olc);
  const aralik = TARAMA_ARALIK[der] / olc, kalin = TARAMA_KALINLIK[der] / olc;
  const phi = f === 1 ? I.aci - a : -I.aci - a; // ekranda θ kalsın (ayna + dönüş telafisi)
  const mk = I.murekkep ? karistir(renk, I.murekkep, 0.72) : karistir(renk, "#14110d", 0.6);
  const rimW = Math.max(1.1, Math.min(3.2, 620 * olc * 0.0045)) / olc; // ekranda 1.1–3.2 px (küçük figürde ince)
  return (
    <g>
      <defs>
        <clipPath id={`${id}c`}><path d={d} /></clipPath>
        <clipPath id={`${id}i`}><rect x={ix[0]} y={y0 - 20} width={ix[1] - ix[0]} height={y1 - y0 + 40} /></clipPath>
        {tarama && <Desen id={`${id}p`} aci={phi} aralik={aralik} kalin={kalin} renk={mk} alfa={0.6 * I.sertlik} seed={I.seed} />}
      </defs>
      <g clipPath={`url(#${id}c)`}>
        <rect x={gx[0]} y={y0 - 20} width={gx[1] - gx[0]} height={y1 - y0 + 40} fill={mk} fillOpacity={0.2 * I.sertlik * ton} />
        {tarama && <rect x={gx[0]} y={y0 - 20} width={gx[1] - gx[0]} height={y1 - y0 + 40} fill={`url(#${id}p)`} />}
        {kenar && <g clipPath={`url(#${id}i)`}><path d={d} fill="none" stroke={I.renk} strokeWidth={rimW * 2} strokeOpacity={0.7} strokeLinejoin="round" /></g>}
      </g>
    </g>
  );
};

// ---- Yüz (ve el) tonu: TARAMA YOK, yumuşak ton düşümü. Yerel x aralığı [x0, x1] boyunca skinDark'a degrade. ----
export const YuzTonu: React.FC<{ d: string | string[]; x0: number; x1: number; a: number; renk: string; isikRenk?: boolean; azami?: number }> = ({ d, x0, x1, a, renk, isikRenk = true, azami = 0.55 }) => {
  const { I, f, s } = useRig();
  const id = "ry" + useId().replace(/:/g, "");
  if (!I) return null;
  const { yan, oran } = golgeYani(I, f, a);
  const yollar = Array.isArray(d) ? d : [d];
  // gölge yanından terminatöre: tam ton → 0 (yumuşak, ~%30 genişlik geçiş)
  const t = Math.max(0.15, Math.min(0.85, oran));
  const [ga, gb] = yan < 0 ? [x0, x1] : [x1, x0];
  const A = azami * (0.6 + 0.4 * I.sertlik);
  renk = I.murekkep ? karistir(renk, I.murekkep, 0.18) : renk; // ton düşümü sahne mürekkebine doğru (gece mavisi / gündüz sepya)
  const olc = Math.max(0.05, s * I.kamera);
  return (
    <g>
      <defs>
        <linearGradient id={`${id}g`} gradientUnits="userSpaceOnUse" x1={ga} y1={0} x2={gb} y2={0}>
          <stop offset={0} stopColor={renk} stopOpacity={A} />
          <stop offset={Math.max(0, t - 0.2)} stopColor={renk} stopOpacity={A * 0.85} />
          <stop offset={Math.min(1, t + 0.12)} stopColor={renk} stopOpacity={0} />
          <stop offset={1} stopColor={renk} stopOpacity={0} />
        </linearGradient>
        <clipPath id={`${id}i`}><rect x={yan < 0 ? x1 - 0.22 * (x1 - x0) : x0 - 10} y={-4000} width={0.22 * (x1 - x0) + 10} height={8000} /></clipPath>
      </defs>
      {yollar.map((q, i) => <path key={i} d={q} fill={`url(#${id}g)`} />)}
      {isikRenk && <g clipPath={`url(#${id}i)`}>{yollar.slice(0, 1).map((q, i) => <path key={i} d={q} fill="none" stroke={I.renk} strokeWidth={3 / olc} strokeOpacity={0.55} />)}</g>}
    </g>
  );
};

// ---- KolEl için (ekran 2B): ışığa doğru yön + tarama açısı. ayna: KolEl aynalı bir grupta çiziliyorsa (scale(-1,1)). ----
// yonlu: ışığa doğru = −yon (ekran düzlemindeki ışın yönünün tersi); nokta: ref → kaynak. Insert/yakın planda kol ekran düzleminde
// yattığı için 2B yön yeterli.
export type KolIsik = { yon: P; aci: number; renk: string; murekkep?: string; sertlik: number };
export const kolIsigi = (isik: Isik, ref: P, ek: { murekkep?: string; sertlik?: number; ayna?: boolean } = {}): KolIsik => {
  const ham: P = isik.tip === "yonlu" ? [-isik.yon[0], -isik.yon[1]] : [isik.zemin[0] - ref[0], isik.zemin[1] - isik.yukseklik - ref[1]];
  const L = Math.hypot(ham[0], ham[1]) || 1;
  const ay = ek.ayna ? -1 : 1;
  const aci = taramaAcisi(isik);
  return { yon: [(ham[0] / L) * ay, ham[1] / L], aci: ek.ayna ? 180 - aci : aci, renk: isik.renk, murekkep: ek.murekkep, sertlik: ek.sertlik ?? (isik.tip === "yonlu" ? 1 : 0.8) };
};
