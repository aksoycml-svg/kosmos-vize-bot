import React from "react";
import { Kemer, Maskaron } from "./Kemer";
import { Tarama } from "./Tarama";
import { TasDuvar } from "./TasDuvar";
import { Derinlik, Esleme, MIMARI_KONTUR, P, ink, karistir, murekkep, poly, rnd, tonla } from "./sabitler";

// ===== Cephe = AYRI EVLER (mekanlar.md 10.3, 12 #3–#4) =====
// Her ev kendi aks sayısı, kat dizisi, korniş yüksekliği, rengi ile. İskelet tarihe sadık (Bordeaux Gambetta düzeni [D Ek 3]):
// zemin ARCADE (basık kemer, içinde entresol) + kat silmesi + 1. kat (noble: uzun dikdörtgen pencere + demir balkon) +
// (2. kat: kısa dikdörtgen, alçak korkuluk) + profilli korniş + attique (küçük dikdörtgen). Kemer YALNIZ zemin arcade'ında.
// Süsleme imzaya iner: arcade kilit taşında maskaron (yakın evlerde) + 1. kat balkonu. Mesafeye göre ayrıntı.
// Kamera görünürlüğü: çatı yüzeyi yalnız kameraH ≥ korniş yüksekliği ise çizilir; alçak kamerada korniş ve balkon ALT yüzleri.
// Eşleme m(u,v): u 0..1 ev genişliği (soldan sağa ekranda değil, cephe boyunca), v 0 = ev tepesi (attique üstü) .. 1 = zemin.

export type Kat = "zemin" | "noble" | "ust" | "attique";
export type Dukkan = { ad: string; acik?: boolean; kepenk?: boolean };
export type EvTanim = { aks: 2 | 3 | 4; katlar: Kat[]; zengin?: boolean; dukkan?: Dukkan; panjur?: boolean; renk: string; ek?: number };
export const KAT_H: Record<Kat, number> = { zemin: 4.6, noble: 3.9, ust: 3.2, attique: 2.2 };
export const KORNIS_H = 0.5;
export const evYukseklik = (e: EvTanim) => e.katlar.reduce((s, k) => s + KAT_H[k], 0) + KORNIS_H + (e.ek ?? 0);

export type CephePalet = { tasGolge: string; cam: string; camIsik: string; ahsap: string; panjur: string; demir: string; murekkep: string; isik: string };
export const BDX_GECE_PALET: CephePalet = { tasGolge: "#5e5646", cam: "#1b2238", camIsik: "#ffb357", ahsap: "#4a3328", panjur: "#2f4a40", demir: "#1c1915", murekkep: "#1b2236", isik: "#ffb357" };

export const CepheEv: React.FC<{
  m: Esleme; e: EvTanim; seed: number; derinlik: Derinlik; aci: number; palet?: CephePalet;
  kameraH?: number; yakinSusleme?: boolean; dukkanYazi?: (p0: P, p1: P, p3: P, ad: string, renk: string) => React.ReactNode;
}> = ({ m, e, seed, derinlik, aci, palet = BDX_GECE_PALET, kameraH = 0.9, yakinSusleme, dukkanYazi }) => {
  const H = evYukseklik(e);
  const W = e.aks * 3.3;
  const P_ = (x: number, y: number): P => m(x / W, 1 - y / H); // metre → ekran (y yerden)
  const dik = (x0: number, x1: number, y0: number, y1: number): P[] => [P_(x0, y1), P_(x1, y1), P_(x1, y0), P_(x0, y0)];
  const em = (x0: number, y0: number, w: number, h: number): Esleme => (u, v) => P_(x0 + u * w, y0 + (1 - v) * h);
  const r = (k: string) => rnd(seed, k);
  const tas = e.renk, golge = palet.tasGolge, mur = palet.murekkep;
  const uzak = derinlik === "uzak", yakin = derinlik === "yakin";
  const KK = MIMARI_KONTUR[derinlik], mk = murekkep(tas); // A4 G3: iç kontur koyu mürekkep, karakter konturuyla aynı aile
  const els: React.ReactNode[] = [];

  // kat yükseklikleri (alttan)
  let y = 0;
  const kat: Record<string, [number, number]> = {};
  e.katlar.forEach((k) => { if (k === "attique") return; kat[k] = [y, y + KAT_H[k]]; y += KAT_H[k]; });
  const kornis: [number, number] = [y, y + KORNIS_H];
  const att: [number, number] | null = e.katlar.includes("attique") ? [kornis[1], kornis[1] + KAT_H.attique] : null;

  // 1) gövde + (yakında) blok dokusu
  els.push(<polygon key="g" points={poly(dik(0, W, 0, kornis[1]))} fill={tas} />);
  if (!uzak) els.push(<TasDuvar key="td" m={em(0, 0, W, kornis[1])} boyut={[W * 60, kornis[1] * 60]} tip="bdx" taban={tas} seed={seed} derinlik={derinlik} yogunluk={yakin ? 0.6 : 0.4} gozenek={false} blok={[36, 18]} />);
  if (att) els.push(<polygon key="att" points={poly(dik(0.25, W - 0.25, att[0], att[1]))} fill={tonla(tas, -0.05)} stroke={mk} strokeWidth={KK.ic * 0.6} />);
  // 2) köşe taşı şeridi (ev sınırı)
  for (let i = 0; i < 12 && !uzak; i++) {
    const y0 = (kornis[0] * i) / 12, y1 = (kornis[0] * (i + 1)) / 12 - 0.06, w = i % 2 ? 0.35 : 0.55;
    els.push(<polygon key={`q${i}`} points={poly(dik(0, w, y0, y1))} fill={tonla(tas, 0.06)} />);
    els.push(<polygon key={`qr${i}`} points={poly(dik(W - w, W, y0, y1))} fill={tonla(tas, 0.06)} />);
  }
  els.push(<polyline key="sinir" points={poly([P_(0, 0), P_(0, kornis[1])])} stroke={mk} strokeWidth={KK.dis * 0.7} fill="none" />);

  const aksW = W / e.aks;
  // 3) ZEMİN: arcade (basık), içinde entresol penceresi; altında dükkân cephesi ya da kapı
  if (kat.zemin) {
    const [z0] = kat.zemin;
    const ow = aksW * 0.68, oh = 4.0;
    const kapiAks = Math.floor(r("kapi") * e.aks);
    for (let a = 0; a < e.aks; a++) {
      const x0 = a * aksW + (aksW - ow) / 2;
      const dukkanBu = e.dukkan && a !== kapiAks;
      const isikli = dukkanBu && e.dukkan!.acik;
      const ic = (
        <g>
          {/* arcade içi derin gölge (IV) */}
          <polygon points={poly(dik(x0, x0 + ow, z0, z0 + oh))} fill={karistir(golge, mur, 0.35)} />
          {/* entresol (arcade yayı içinde, üstte) */}
          <polygon points={poly(dik(x0 + ow * 0.2, x0 + ow * 0.8, z0 + 3.05, z0 + 3.75))} fill={r(`en${a}`) < 0.25 ? palet.camIsik : palet.cam} opacity={0.95} />
          <polyline points={poly([P_(x0 + ow * 0.5, z0 + 3.05), P_(x0 + ow * 0.5, z0 + 3.75)])} stroke={palet.ahsap} strokeWidth={2} fill="none" />
          {/* dükkân cephesi / kapı */}
          {dukkanBu ? (
            <g>
              <polygon points={poly(dik(x0 + 0.08, x0 + ow - 0.08, z0, z0 + 2.75))} fill={isikli ? palet.camIsik : palet.ahsap} />
              {!isikli && Array.from({ length: 5 }).map((_, i) => <polyline key={i} points={poly([P_(x0 + 0.08 + ((ow - 0.16) * (i + 1)) / 6, z0), P_(x0 + 0.08 + ((ow - 0.16) * (i + 1)) / 6, z0 + 2.75)])} stroke={ink(palet.ahsap)} strokeWidth={1.4} fill="none" />)}
              {isikli && <g>
                {[0.33, 0.66].map((t) => <polyline key={t} points={poly([P_(x0 + ow * t, z0), P_(x0 + ow * t, z0 + 2.75)])} stroke={palet.ahsap} strokeWidth={3} fill="none" />)}
                {/* vitrinde iki oturan müşteri silueti (yüzsüz, statik) */}
                {[0.3, 0.68].map((t, i) => { const c = P_(x0 + ow * t, z0 + 1.1); const s = Math.abs(P_(x0 + 1, z0)[0] - P_(x0, z0)[0]) / 60; return <g key={i} transform={`translate(${c[0]},${c[1]}) scale(${s})`}><ellipse cx={0} cy={-26} rx={8} ry={9} fill="#2a1e18" /><path d="M -14 0 Q -14 -18 0 -18 Q 14 -18 14 0 Z" fill="#2a1e18" /><rect x={-12} y={-42} width={24} height={8} rx={2} fill="#2a1e18" /></g>; })}
              </g>}
              {/* alınlık tabela */}
              <polygon points={poly(dik(x0 + 0.06, x0 + ow - 0.06, z0 + 2.78, z0 + 3.0))} fill={palet.ahsap} stroke={ink(palet.ahsap)} strokeWidth={1} />
            </g>
          ) : a === kapiAks ? (
            <g>
              <polygon points={poly(dik(x0 + ow * 0.18, x0 + ow * 0.82, z0, z0 + 2.7))} fill={karistir(palet.ahsap, mur, 0.3)} stroke={ink(palet.ahsap)} strokeWidth={1.5} />
              {[0.5].map((t) => <polyline key={t} points={poly([P_(x0 + ow * t, z0), P_(x0 + ow * t, z0 + 2.7)])} stroke={ink(palet.ahsap)} strokeWidth={1.4} fill="none" />)}
            </g>
          ) : (
            <g>
              <polygon points={poly(dik(x0 + ow * 0.18, x0 + ow * 0.82, z0 + 0.9, z0 + 2.6))} fill={r(`zp${a}`) < 0.3 ? palet.camIsik : palet.cam} />
              {Array.from({ length: 5 }).map((_, i) => <polyline key={i} points={poly([P_(x0 + ow * (0.22 + i * 0.14), z0 + 0.9), P_(x0 + ow * (0.22 + i * 0.14), z0 + 2.6)])} stroke={palet.demir} strokeWidth={1.6} fill="none" />)}
            </g>
          )}
        </g>
      );
      els.push(
        <g key={`ar${a}`}>
          <Kemer m={em(x0, z0, ow, oh)} W={ow} H={oh} tip="basik" dolgu={karistir(golge, mur, 0.35)} ic={ic} kontur={KK.ic}
            sove={uzak ? null : { gen: 0.22, renk: tonla(tas, 0.05) }} kilit={uzak ? null : { renk: tas, maskaron: !!(yakinSusleme && !uzak) }} />
          {/* arcade iç yan yüzü (derinlik) — tarama IV */}
          {!uzak && <Tarama sekil={dik(x0, x0 + 0.16, z0, z0 + oh - 0.4)} basamak="IV" aci={aci} renk={mur} derinlik={derinlik} seed={seed + a} />}
        </g>,
      );
      if (dukkanBu && dukkanYazi && !uzak) els.push(<g key={`dy${a}`}>{dukkanYazi(P_(x0 + 0.12, z0 + 2.97), P_(x0 + ow - 0.12, z0 + 2.97), P_(x0 + 0.12, z0 + 2.8), e.dukkan!.ad, isikli ? "#ffd27a" : "#e7d6a8")}</g>);
    }
    // kat silmesi
    els.push(<polygon key="silme" points={poly(dik(0, W, z0 + KAT_H.zemin - 0.22, z0 + KAT_H.zemin))} fill={tonla(tas, 0.07)} stroke={mk} strokeWidth={KK.ic} />);
  }

  // 4) NOBLE (1. kat): uzun dikdörtgen pencere (porte-fenêtre) + demir balkon (zengin: konsollu sürekli; diğer: balkonet)
  const pencere = (k: string, y0: number, ww: number, wh: number, korkuluk: "balkon" | "balkonet" | "alcak" | null, panjur: boolean) => {
    const out: React.ReactNode[] = [];
    for (let a = 0; a < e.aks; a++) {
      const x0 = a * aksW + (aksW - ww) / 2;
      const isik = r(`${k}l${a}`) < 0.32;
      out.push(<polygon key={`${k}s${a}`} points={poly(dik(x0 - 0.14, x0 + ww + 0.14, y0 - 0.12, y0 + wh + 0.18))} fill={tonla(tas, 0.06)} stroke={mk} strokeWidth={KK.ic} />);
      out.push(<polygon key={`${k}w${a}`} points={poly(dik(x0, x0 + ww, y0, y0 + wh))} fill={isik ? palet.camIsik : palet.cam} opacity={isik ? 0.92 : 1} />);
      if (!uzak) {
        out.push(<polyline key={`${k}m${a}`} points={poly([P_(x0 + ww / 2, y0), P_(x0 + ww / 2, y0 + wh)])} stroke={palet.ahsap} strokeWidth={2} fill="none" />);
        [0.33, 0.66].forEach((t) => out.push(<polyline key={`${k}h${a}${t}`} points={poly([P_(x0, y0 + wh * t), P_(x0 + ww, y0 + wh * t)])} stroke={palet.ahsap} strokeWidth={1.4} fill="none" />));
        // pencere çevresi (A4 G1): söve iç yüzü (sol) + lento altı gölgesi — ışığın mimariyi anlattığı yer; cam konturu koyu
        out.push(<Tarama key={`${k}t${a}`} sekil={dik(x0, x0 + ww, y0 + wh * 0.84, y0 + wh)} basamak="III" aci={aci} renk={mur} derinlik={derinlik} seed={seed + 30 + a} />);
        out.push(<Tarama key={`${k}r${a}`} sekil={dik(x0, x0 + ww * 0.14, y0, y0 + wh * 0.84)} basamak="III" aci={aci} renk={mur} derinlik={derinlik} seed={seed + 40 + a} />);
        out.push(<polygon key={`${k}c${a}`} points={poly(dik(x0, x0 + ww, y0, y0 + wh))} fill="none" stroke={mk} strokeWidth={KK.ic * 0.8} />);
      }
      if (panjur && !uzak) [[x0 - ww * 0.5, x0 - 0.02], [x0 + ww + 0.02, x0 + ww * 1.5]].forEach(([p0, p1], j) => out.push(<polygon key={`${k}p${a}${j}`} points={poly(dik(p0, p1, y0, y0 + wh))} fill={palet.panjur} stroke={ink(palet.panjur)} strokeWidth={1} />));
      if (korkuluk === "balkonet" && !uzak) {
        out.push(<polyline key={`${k}b${a}`} points={poly([P_(x0 - 0.1, y0 + 1.0), P_(x0 + ww + 0.1, y0 + 1.0)])} stroke={palet.demir} strokeWidth={2.4} fill="none" />);
        for (let i = 0; i <= 6; i++) out.push(<polyline key={`${k}bb${a}${i}`} points={poly([P_(x0 - 0.1 + ((ww + 0.2) * i) / 6, y0), P_(x0 - 0.1 + ((ww + 0.2) * i) / 6, y0 + 1.0)])} stroke={palet.demir} strokeWidth={1.3} fill="none" />);
      }
      if (korkuluk === "alcak" && !uzak) out.push(<polyline key={`${k}a${a}`} points={poly([P_(x0, y0 + 0.5), P_(x0 + ww, y0 + 0.5)])} stroke={palet.demir} strokeWidth={2} fill="none" />);
    }
    return out;
  };
  if (kat.noble) {
    const [n0] = kat.noble;
    els.push(...pencere("n", n0 + 0.3, aksW * 0.4, 2.7, e.zengin ? null : "balkonet", !!e.panjur && r("pj") < 0.5));
    if (e.zengin && !uzak) {
      // taş konsollara oturan sürekli balkon: döşeme + ALT yüzü (alçak kamera) + konsollar + kıvrımlı ferforje
      const by = n0 + 0.25;
      els.push(<polygon key="bal" points={poly(dik(0.3, W - 0.3, by - 0.18, by))} fill={tonla(tas, 0.04)} stroke={mk} strokeWidth={KK.ic} />);
      els.push(<Tarama key="balt" sekil={dik(0.3, W - 0.3, by - 0.32, by - 0.18)} basamak="IV" aci={aci} renk={mur} derinlik={derinlik} seed={seed + 50} />);
      for (let i = 0; i <= e.aks; i++) { const x = 0.4 + ((W - 0.8) * i) / e.aks; els.push(<polygon key={`kon${i}`} points={poly([P_(x - 0.12, by - 0.18), P_(x + 0.12, by - 0.18), P_(x + 0.05, by - 0.75), P_(x - 0.05, by - 0.75)])} fill={tonla(tas, -0.04)} stroke={mk} strokeWidth={KK.ic * 0.8} />); }
      els.push(<polyline key="balu" points={poly([P_(0.3, by + 1.0), P_(W - 0.3, by + 1.0)])} stroke={palet.demir} strokeWidth={2.6} fill="none" />);
      for (let i = 0; i <= e.aks * 6; i++) { const x = 0.3 + ((W - 0.6) * i) / (e.aks * 6); els.push(<path key={`bf${i}`} d={`M ${P_(x, by).join(" ")} Q ${P_(x + 0.12, by + 0.5).join(" ")} ${P_(x, by + 1.0).join(" ")}`} stroke={palet.demir} strokeWidth={1.3} fill="none" />); }
    }
  }
  if (kat.ust) els.push(...pencere("u", kat.ust[0] + 0.4, aksW * 0.38, 1.9, "alcak", !!e.panjur));
  // 5) profilli korniş + ALT yüzü (alçak kamera) — tarama IV
  els.push(<polygon key="k1" points={poly(dik(-0.15, W + 0.15, kornis[0] + 0.18, kornis[1]))} fill={tonla(tas, 0.08)} stroke={mk} strokeWidth={KK.ic} />);
  els.push(<polygon key="k2" points={poly(dik(-0.1, W + 0.1, kornis[0], kornis[0] + 0.18))} fill={golge} />);
  if (!uzak) els.push(<Tarama key="k3" sekil={dik(-0.1, W + 0.1, kornis[0] - 0.25, kornis[0] + 0.18)} basamak="IV" aci={aci} renk={mur} derinlik={derinlik} seed={seed + 60} />);
  // kamera görünürlüğü: çatı yüzeyi yalnız kamera korniş seviyesinde/üstündeyse (bu filmin sokak kamerası 0.9 m: ÇİZİLMEZ)
  if (kameraH >= kornis[1]) els.push(<polygon key="cati" points={poly(dik(-0.15, W + 0.15, kornis[1], kornis[1] + 1.2))} fill="#7a3f2c" />);
  // 6) attique: küçük dikdörtgen pencereler, ince korniş
  if (att) {
    for (let a = 0; a < e.aks; a++) { const ww = aksW * 0.3, x0 = a * aksW + (aksW - ww) / 2; els.push(<polygon key={`at${a}`} points={poly(dik(x0, x0 + ww, att[0] + 0.5, att[0] + 1.5))} fill={r(`al${a}`) < 0.2 ? palet.camIsik : palet.cam} stroke={mk} strokeWidth={KK.ic * 0.8} />); }
    els.push(<polygon key="atk" points={poly(dik(0.15, W - 0.15, att[1] - 0.15, att[1]))} fill={tonla(tas, 0.04)} stroke={mk} strokeWidth={KK.ic * 0.8} />);
  }
  return <g>{els}</g>;
};

// Paris/Tours iskelet notu: aynı modül `CephePalet` + kat dizisiyle; Paris = arcade yok (zemin `duz`), attique yerine mansard bandı;
// Tours = tuffeau, basık pencere. Bu turda yalnız Bordeaux sokağında kullanılıyor (Proto'nun Paris cephesi korunur).
export const _maskaron = Maskaron;
