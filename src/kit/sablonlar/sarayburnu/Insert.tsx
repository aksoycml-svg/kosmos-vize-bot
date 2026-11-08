// ===== SARAYBURNU `insert` görünümü — P07 (gece) / P11 (gün), AYNI dekor ve kadraj, ışık ayna (mekanlar.md §1.4) =====
// Kamera köşk rıhtımında, 155°'ye bakar; ufuk noktası (560, 180). Deniz solda, köşk altyapı duvarı sağda. cs 1.0 sabit.
// Zemin sıraları mekanlar §1.4 ile birebir: y = 180 + K/d (K = 3793; y 1450'de sıra 150 px, sonra 1300 / 1180 / 1084 / 1007 …).
// KAMERA (mekanlar §1.4): göz 1.0 m; px/m = (y − 180)/1.0 (y 1450'de 1270). json el yolları (bilek/dirsek) bu ölçekle fizikseldir (ön kol
// ≈ 0.27–0.31 m). Bu yükseklikte avuç y≈985 zeminden ≈ 0.4 m'dedir: alıcı çömelmiş/diz çökmüş ve GÖVDESİ KADRAJIN SOLUNDA (basamak
// tarafında); kadrajda yalnız sağ omuz başı + kolu görünür, baş solda kadraj dışında (omuz–boyun ≈ 0.19 m). Veren el sağda, muhafız
// solda kadraj dışında durur. (K2 kararı: json karakter x 360 / y 1450 "ayakta" bu kamerada fiziksel değil — rapor, yönetmen.)
// Konum dili: el.* = ekran px (json bilek/dirsek). Kese/sikke x/y = TEMAS (taban) noktası. Karakter: durum (islak, damla) + egil/dogrul (omuz).
// Alıcı kolu: omuz (soldan, avuç yüksekliğini izler) → 2 kemik IK → json bilek. Veren el sağdan, muhafız eli soldan. Tutulan nesne eli izler: kese veren elde kıstırma noktasında asılı, alıcıda avuç noktasında; bırakma/aktarma temas karesinde.
// Tek ışık: P07 köşk penceresi (nokta, sağ-üst, kadraj dışı) → gölgeler sola, kısa; P11 güneş (yönlü, tam soldan) → gölgeler sağa, uzun.
import React from "react";
import { interpolate } from "remotion";
import { Golge, Isik, izdusum } from "../../../doku/Isik";
import type { KilitNokta } from "../../../doku/GuvenliAlan";
import { RenkKaydi, Tarama, taramaAcisi } from "../../../doku/Tarama";
import { DOKU_SEED, ink, karistir, P, poly, rnd, tonla } from "../../../doku/sabitler";
import { Kukla, Palet, Poz } from "../../../rig/Kukla";
import { kolIsigi, kuklaIsigi } from "../../../rig/RigIsik";
import { AYAK_TABAN, govdeDunya } from "../../../rig/kinematik";
import { karakterBul } from "../../karakterler";
import { karakterPoz } from "../../jestler";
import type { El, Plan, Prop } from "../../tipler";
import { cl, deger, GIRIS, INOUT, kameraHesapla, ekranNokta, katDonusum } from "../../zaman";
import { param } from "../../ortak";
import { propDurum } from "../../props";
import { RIG_BIRIM_M } from "./geo";
import { ElPoz, elGeometri, elNokta, EL_BOY, Kese, OsmanliElTip, OsmanliKol, Sikke } from "../../props/evliyaEl";

const S = DOKU_SEED.sarayburnu + 400;
export const INS = { ufuk: 180, un: [560, 180] as P, K: 3793, h: 1.0, kenarX: -0.259, duvarX: 0.49, basD: [3.5, 4.55] as [number, number], basEn: 0.15 } as const;
const q = (y: number) => Math.max(1, (y - INS.ufuk) / INS.h);           // zemindeki px/m (y = zemin teması)
const yD = (d: number) => INS.ufuk + INS.K / d;                          // derinlik d (m) → zemin y
export const dY = (y: number) => INS.K / Math.max(1, y - INS.ufuk);
const proj = (X: number, H: number, d: number): P => { const k = INS.K / (d * INS.h); return [INS.un[0] + X * k, yD(d) - H * k]; };
// El ölçeği: el boyu (bilek → parmak ucu) 0.19 m, gerçek (insert, y≈1450 ⇒ ≈ 240 px; tasarim §3.7 ≈ 260). Kese = 0.85 × el (tasarim §3.7; ≈ 0.15 m × 1.1 ⇒ ≈ 200 px, json "≈190 px")
const EL_M = 0.19, EL_STIL = 1.0, KESE_EL = 0.85;
const elOlc = (pxm: number) => (EL_M * pxm * EL_STIL) / EL_BOY;

type Saat = "gece" | "gun";
const RENK = {
  gece: { gok: "#1c2232", deniz: "#161c26", dalga: "#2c3444", doseme: "#45444a", derz: "#2a2a30", duvar: "#4e4a46", duvarIsik: "#8a7458", duvarDerz: "#3a3734", kemer: "#2a2830", basUst: "#55545a", basOn: "#2a2a30", islak: "#3a3e48", parla: "#a9bccb", murekkep: "#14141c" },
  gun: { gok: "#cfcfc4", deniz: "#5e7378", dalga: "#7c9090", doseme: "#a09682", derz: "#7a7262", duvar: "#b4a88e", duvarIsik: "#b4a88e", duvarDerz: "#8e8470", kemer: "#3a3430", basUst: "#aaa69a", basOn: "#6a6252", islak: "#7a7468", parla: "#e6eef0", murekkep: "#2a2018" },
} as const;

const n = (v: unknown, d: number) => (typeof v === "number" ? v : d);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lp = (a: P, b: P, t: number): P => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
const anahtar = (dizi: P[], kare: number[], p: number): P => [deger(dizi.map((z) => z[0]), kare, p), deger(dizi.map((z) => z[1]), kare, p)];
// 2 kemik IK (ekran): omuz S, hedef T, kemikler a/b; dirsek "asagi" (y büyük) yönde bükülür. Erişilemezse uzanır (hata döner).
const ik2 = (Sh: P, T: P, a: number, b: number): { dirsek: P; bilek: P; hata: number } => {
  const dx = T[0] - Sh[0], dy = T[1] - Sh[1], L0 = Math.hypot(dx, dy) || 1, L = Math.min(L0, a + b - 0.5), u: P = [dx / L0, dy / L0];
  const al = Math.acos(Math.max(-1, Math.min(1, (a * a + L * L - b * b) / (2 * a * L))));
  const cand = [1, -1].map((sg) => { const c = Math.cos(al * sg), s = Math.sin(al * sg); return [Sh[0] + a * (u[0] * c - u[1] * s), Sh[1] + a * (u[0] * s + u[1] * c)] as P; });
  const dirsek = cand[0][1] >= cand[1][1] ? cand[0] : cand[1];
  return { dirsek, bilek: [Sh[0] + u[0] * L, Sh[1] + u[1] * L], hata: L0 - L };
};
// json el pozu (KolEl adları) → Osmanlı avuç pozu: alıcıda gevsek (önce) = ac, kistir = kapa, gevsek (kistir'den sonra) = gevse
const alanPoz = (el: El | undefined, p: number): ElPoz => {
  const pz = (el?.poz ?? []) as { kare: number; poz: string }[];
  let sonuc: ElPoz = "ac", kapandi = false;
  for (const z of pz) { if (p < z.kare) break; if (z.poz === "kistir" || z.poz === "kapa") { sonuc = "kapa"; kapandi = true; } else if (z.poz === "gevsek" || z.poz === "gevse") sonuc = kapandi ? "gevse" : "ac"; else if (z.poz === "ac") sonuc = "ac"; }
  return sonuc;
};

// ---------------- dekor ----------------
// K2 W3 (basamaklar "blok/bank" okunuyordu): rıhtım yan duvarına bitişik, rıhtım boyunca uzanan, denize (sola) inen 3 basamak.
// Basamak: ayak yüzü (üst) açık, rıhtım boyunca d0→d1; yan rıhtım duvarına bakan rıht yüzleri kameradan görünmez (−X'e bakar),
// kameraya bakan tek yüz = d0'daki BAŞ YÜZÜ (basamaklı profil, koyu + II) → 3 kademe 360 px'te bu profilden okunur.
// En alt kademenin rıhtı su çizgisinde (H −1.0, rıhtım denizden 1.0 m) biter: sol-alt köşede su + ıslak koyu bant + küçük halka.
// Ayak yüzü eni 0.12 m (stilize; gerçek ≈ 0.3 m: 0.3 m'de üç kademe + su bu kamerada kadraja sığmaz), rıht 0.2 m. [mekanlar §1.4 #4'ten sapma: raporda]
export const BAS = { d0: 4.6, d1: 6.4, w: 0.12, r: 0.2, n: 3, su: -1.0 } as const;
// deniz tarafı (rıhtım kenarı H 0 çizgisinin solu): basamak ve ıslak lekeler bununla kırpılır (rıhtım önde örter)
const DENIZ_TARAFI = poly([[-400, INS.ufuk], [INS.un[0], INS.ufuk], [INS.un[0] + INS.kenarX * 2400, INS.ufuk + 2400], [-400, INS.ufuk + 2400]]);
const basamakGeo = () => {
  const ust = [0, 1, 2].map((k) => {
    const X1 = INS.kenarX - BAS.w * k, X0 = X1 - BAS.w, H = -BAS.r * (k + 1);
    return { k, X0, X1, H, poly: [proj(X0, H, BAS.d0), proj(X1, H, BAS.d0), proj(X1, H, BAS.d1), proj(X0, H, BAS.d1)] as P[], burun: [proj(X0, H, BAS.d0), proj(X0, H, BAS.d1)] as P[] };
  });
  // baş yüzü (d0): (kenar, −0.2) → basamaklı profil → (kenar−3w, su) → (kenar, su)
  const prof: [number, number][] = [[INS.kenarX, -BAS.r]];
  ust.forEach((u, i) => { prof.push([u.X0, u.H]); if (i < 2) prof.push([u.X0, ust[i + 1].H]); });
  prof.push([ust[2].X0, BAS.su], [INS.kenarX, BAS.su]);
  const bas = prof.map(([X, H]) => proj(X, H, BAS.d0));
  return { ust, bas };
};
// Islak el teması (P07 p0): orta basamağın burnunu kavrayan avuç noktası (X kenar−0.19, H −0.4, d0+0.08) ve o derinliğin px/m'si
export const basamakTemasNoktasi = () => { const d = BAS.d0 + 0.08; return { p: proj(INS.kenarX - BAS.w - 0.07, -2 * BAS.r, d), pxm: INS.K / (d * INS.h) }; };

const InsertDekor: React.FC<{ saat: Saat; p: number }> = ({ saat, p }) => {
  const C = RENK[saat];
  const kenarX = (y: number) => INS.un[0] + INS.kenarX * q(y), duvarX = (y: number) => INS.un[0] + INS.duvarX * q(y);
  // döşeme sıraları (0.4 m) ve derzler (0.6 m, sıra başına kaydırma) — UN'ye yakınsar
  const siralar: number[] = []; for (let k = -3; k < 60; k++) { const d = 2.987 + 0.4 * k; if (d > 0.5) siralar.push(d); }
  const derzler: React.ReactNode[] = [];
  siralar.forEach((d, i) => {
    const d2 = d + 0.4, y1 = yD(d); if (y1 < INS.ufuk + 6) return;
    const kay = (i % 2) * 0.3 + rnd(S, `r${i}`) * 0.08;
    for (let X = INS.kenarX + kay; X < INS.duvarX; X += 0.6) {
      if (X <= INS.kenarX + 0.02) continue;
      const a = proj(X, 0, d), b = proj(X, 0, d2);
      derzler.push(<line key={`${i}-${X.toFixed(2)}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.derz} strokeWidth={Math.max(1, 0.012 * q(y1))} />);
      if (rnd(S, `k${i}${X.toFixed(2)}`) < 0.14) derzler.push(<path key={`c${i}${X.toFixed(2)}`} d={`M ${a[0]} ${a[1] - 0.004 * q(y1)} l ${0.07 * q(y1)} 0 l ${-0.05 * q(y1)} ${-0.035 * q(y1)} Z`} fill={C.derz} opacity={0.7} />);
    }
  });
  const yataySira = siralar.map((d, i) => { const y = yD(d); if (y < INS.ufuk + 4 || y > 1930) return null; return <line key={`s${i}`} x1={kenarX(y)} y1={y} x2={duvarX(y)} y2={y} stroke={C.derz} strokeWidth={Math.max(1, 0.014 * q(y))} />; });
  // duvar (köşk altyapısı, rıhtımdan 5.0 m): ekranda UN'den çıkan iki doğru arasındaki kama — dip (H 0) ve üst (H 5) çizgileri UN'de buluşur.
  // K2 Z5: eski çokgenin üst kenarı fiziksel değildi, sıra çizgileri göğe taşıyordu → kama + sıra çizgileri H ≤ 5 m.
  const DUVAR_H = 5.0;
  const duvarPoly = poly([INS.un, proj(INS.duvarX, 0, 0.6), [4000, 9000], [4000, -20000], proj(INS.duvarX, DUVAR_H, 0.6)]);
  const duvarSira: React.ReactNode[] = [];
  for (let k = 1; k < 11; k++) { const H = 0.45 * k; if (H >= DUVAR_H) break; const a = proj(INS.duvarX, H, 1.6), b = proj(INS.duvarX, H, 60); duvarSira.push(<line key={`w${k}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.duvarDerz} strokeWidth={2.4} />); }
  // K2 Z7 (uzak derz "çit" okunuyordu): dikey derz yalnız yakında (d < 7.5 m; ekranda aralık ≥ ≈ 30 px). Uzak = yalnız sıra çizgisi (mekanlar §0.2)
  for (let k = 0; k < 11; k++) for (let d = 1.6 + (k % 2) * 0.45; d < 7.5; d += 0.9) { if (0.45 * (k + 1) > DUVAR_H) break; const a = proj(INS.duvarX, 0.45 * k, d), b = proj(INS.duvarX, 0.45 * (k + 1), d); duvarSira.push(<line key={`v${k}-${d.toFixed(2)}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.duvarDerz} strokeWidth={Math.max(1, 0.01 * q(yD(d)))} />); }
  // kemer A2 ağzı (sağ üst): duvar düzleminde d 4.6 → 7.4 m. Üzengi H 2.2 m bu kamerada kadrajın üstünde (y < 0): kemer eğrisi fiziksel olarak
  // görünmez. K2 Z6 ("eğrisiz siyah yarık"): ağzın DERİNLİĞİ okunsun — açıklıktan uzak söve yüzü (d 7.4, duvar kalınlığı 1.0 m, kameraya bakar)
  // orta-koyu tonla görünür, ağız kenarında söve köşe çizgisi (ışık yanı), ağız dibinde gölge tabanı. İç koyu III yalnız derin kısımda.
  const kemerPoly = [proj(INS.duvarX, 0, 4.6), proj(INS.duvarX, 6, 4.6), proj(INS.duvarX, 6, 7.4), proj(INS.duvarX, 0, 7.4)];
  const soveUzak = [proj(INS.duvarX, 0, 7.4), proj(INS.duvarX + 1.0, 0, 7.4), proj(INS.duvarX + 1.0, 6, 7.4), proj(INS.duvarX, 6, 7.4)];
  const kid = "kemer" + React.useId().replace(/:/g, "");
  const bid = "bas" + React.useId().replace(/:/g, "");
  // deniz (sol): kenar çizgisinin solu; dalga çizgileri perspektif aralıkla (su düzlemi H −1.0)
  const dalga: React.ReactNode[] = [];
  for (let i = 0; i < 30; i++) { const d = 2.6 * Math.pow(1.15, i); const y = INS.ufuk + (INS.K / d) * (1 + 1 / INS.h); if (y > 1920 || y < INS.ufuk + 3) continue; const x0 = rnd(S, `dx${i}`) * 260 - 120, L = 30 + 50 * rnd(S, `dl${i}`); const xs = Math.min(kenarX(y) - 20, x0 + L); if (xs <= x0) continue; const ofs = 4 * Math.sin(p * 0.05 + i); dalga.push(<line key={`d${i}`} x1={x0 + ofs} y1={y} x2={xs + ofs} y2={y} stroke={C.dalga} strokeWidth={Math.max(2, Math.min(4, 0.006 * q(y)))} strokeLinecap="round" />); }
  const G = basamakGeo();
  const islakTon = (k: number) => karistir(C.basUst, C.islak, saat === "gece" ? 0.25 + 0.3 * k : 0.15 + 0.25 * k);
  const kenarTasi = poly([[kenarX(1920), 1920], [INS.un[0], INS.ufuk], [INS.un[0] + 6, INS.ufuk], [kenarX(1920) + 0.12 * q(1920), 1920]]);
  const suAlt = G.bas[G.bas.length - 2], suSag = G.bas[G.bas.length - 1];
  return (
    <g>
      <rect x={-100} y={-200} width={1300} height={INS.ufuk + 200} fill={C.gok} />
      <rect x={-100} y={INS.ufuk - 12} width={INS.un[0] + 100} height={12} fill={C.deniz} />
      {/* deniz: kenarın solu */}
      <polygon points={poly([[-100, INS.ufuk], [INS.un[0], INS.ufuk], [kenarX(2100), 2100], [-100, 2100]])} fill={C.deniz} />
      {dalga}
      {/* rıhtım döşemesi */}
      <polygon points={poly([[INS.un[0], INS.ufuk], [kenarX(2100), 2100], [duvarX(2100), 2100]])} fill={C.doseme} />
      {yataySira}{derzler}
      <polygon points={kenarTasi} fill={tonla(C.doseme, 0.1)} opacity={0.6} />
      {/* basamaklar: rıhtım yan duvarına asılı; kamera rıhtımın üstünde olduğu için rıhtım kenarı (H 0) çizgisinin sağı rıhtım tarafından
          ÖRTÜLÜR → basamaklar yalnız deniz tarafında (kenar çizgisinin solunda) görünür. Alt (sol) kademe önce, üst kademe onu burnundan örter */}
      <defs><clipPath id={bid}><polygon points={DENIZ_TARAFI} /></clipPath></defs>
      <g clipPath={`url(#${bid})`}>
      {[...G.ust].reverse().map((u) => (
        <g key={`b${u.k}`}>
          <polygon points={poly(u.poly)} fill={islakTon(u.k)} stroke={ink(C.basUst)} strokeWidth={3} strokeLinejoin="round" />
          {/* burun: ince açık parlama (ıslak taş kenarı) */}
          <line x1={u.burun[0][0]} y1={u.burun[0][1]} x2={u.burun[1][0]} y2={u.burun[1][1]} stroke={saat === "gece" ? C.parla : tonla(C.basUst, 0.22)} strokeWidth={4} strokeOpacity={saat === "gece" ? 0.55 : 0.9} strokeLinecap="round" />
        </g>
      ))}
      <polygon points={poly(G.bas)} fill={C.basOn} stroke={ink(C.basOn)} strokeWidth={3} strokeLinejoin="round" />
      <Tarama sekil={G.bas} basamak="II" aci={45} renk={ink(C.basOn)} derinlik="yakin" seed={S + 2} />
      {/* baş yüzünde kademe burunları (açık kenar) */}
      {G.ust.map((u) => { const a = proj(u.X0, u.H, BAS.d0), b = proj(u.X1, u.H, BAS.d0); return <line key={`bb${u.k}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={saat === "gece" ? C.parla : tonla(C.basUst, 0.22)} strokeWidth={4} strokeOpacity={0.6} strokeLinecap="round" />; })}
      {/* su çizgisi: en alt rıhtın dibinde ıslak koyu bant + kesik dalga + küçük halka (E3) */}
      <polygon points={poly([[suAlt[0], suAlt[1] - 0.12 * INS.K / BAS.d0], [suSag[0], suSag[1] - 0.12 * INS.K / BAS.d0], suSag, suAlt])} fill={karistir(C.basOn, C.deniz, 0.5)} />
      <line x1={-60} y1={suAlt[1] + 2} x2={suSag[0] + 30} y2={suSag[1] + 2} stroke={C.dalga} strokeWidth={4} strokeDasharray="26 14" strokeLinecap="round" />
      <ellipse cx={suAlt[0] - 10} cy={suAlt[1] + 6} rx={70 + 6 * Math.sin(p * 0.08)} ry={14} fill="none" stroke={C.parla} strokeWidth={2.5} strokeOpacity={0.45} />
      </g>
      {/* köşk altyapı duvarı (sağ, perspektif kama) */}
      <polygon points={duvarPoly} fill={C.duvar} />
      {duvarSira}
      <defs><clipPath id={kid}><polygon points={poly(kemerPoly)} /></clipPath></defs>
      <g clipPath={`url(#${kid})`}>
        <polygon points={poly(kemerPoly)} fill={C.kemer} />
        <polygon points={poly(soveUzak)} fill={karistir(C.duvar, C.kemer, saat === "gece" ? 0.45 : 0.4)} />
        {/* uzak sövenin derin iç köşesi (III, küçük) + geçit tabanı gölgesi */}
        <polygon points={poly([soveUzak[0], proj(INS.duvarX + 0.22, 0, 7.4), proj(INS.duvarX + 0.22, 6, 7.4), soveUzak[3]])} fill={tonla(C.kemer, -0.2)} />
        <Tarama sekil={[soveUzak[0], proj(INS.duvarX + 0.22, 0, 7.4), proj(INS.duvarX + 0.22, 6, 7.4), soveUzak[3]]} basamak="III" aci={60} renk={ink(C.kemer)} derinlik="yakin" seed={S + 9} />
        <polygon points={poly([kemerPoly[0], kemerPoly[3], [kemerPoly[0][0], kemerPoly[3][1]]])} fill={tonla(C.kemer, -0.3)} />
      </g>
      {/* ağız kenarı: söve köşesi (ışık yanı açık çizgi) */}
      <line x1={kemerPoly[0][0]} y1={kemerPoly[0][1]} x2={kemerPoly[1][0]} y2={kemerPoly[1][1]} stroke={tonla(C.duvar, 0.18)} strokeWidth={5} />
      <line x1={kemerPoly[3][0]} y1={kemerPoly[3][1]} x2={kemerPoly[2][0]} y2={kemerPoly[2][1]} stroke={ink(C.duvar)} strokeWidth={3} />
      <line x1={proj(INS.duvarX, 0, 0.6)[0]} y1={proj(INS.duvarX, 0, 0.6)[1]} x2={INS.un[0]} y2={INS.ufuk} stroke={ink(C.duvar)} strokeWidth={4} />
    </g>
  );
};

// Gölge izdüşümü (K2 W4): şeklin kendisi ışık tanımından (aynı `yon` / nokta) zemine yansıtılır — elips şablon yok.
// Yükseklik h(y) = A·y + B (ekran px). havada(Hm): kamera 1.0 m, h = Hm/(1−Hm)·(y − ufuk). zeminde(yb): h = yb − y (nesne tabanı yb'de).
// Afin matris (SVG matrix a b c d e f). Nokta ışıkta k = h_ref/(H − h_ref) sabit (bilek/taban noktasında).
const golgeM = (isik: Isik, A: number, B: number, hm: number): number[] => {
  if (isik.tip === "yonlu") { const [u, v] = isik.yon; return [1, 0, u * A, 1 + (1 + v) * A, u * B, (1 + v) * B]; }
  // nokta: k metre cinsinden (kaynak yüksekliği kendi zemin derinliğinin px/m'siyle metreye çevrilir)
  const Hm = isik.yukseklik / q(isik.zemin[1]), k = hm >= Hm * 0.92 ? 11.5 : Math.max(0, hm / (Hm - hm));
  const [zx, zy] = isik.zemin;
  return [1 + k, 0, 0, (1 + k) * (1 + A), -k * zx, (1 + k) * B - k * zy];
};
const uygula = (m: number[], p: P): P => [m[0] * p[0] + m[2] * p[1] + m[4], m[1] * p[0] + m[3] * p[1] + m[5]];
const havada = (Hm: number) => { const c = Hm / (1 - Hm); return { A: c, B: -INS.ufuk * c }; };
// Dik (kese gibi ayakta) nesne: tabanı `taban` (zeminde ya da gölgesinin zemindeki noktası) — gölgesi tabandan ışığın tersine uzar.
// Nokta ışıkta yön, tabandan kaynağın zemin izdüşümüne göre (uzunluk = yükseklik / kaynak yüksekliği); yönlüde güneş yönü.
const dikIsik = (isik: Isik, taban: P): Isik => {
  if (isik.tip === "yonlu") return isik;
  const Hb = (isik.yukseklik / q(isik.zemin[1])) * q(taban[1]);
  return { tip: "yonlu", ad: "dik nesne", renk: isik.renk, yon: [(taban[0] - isik.zemin[0]) / Hb, (taban[1] - isik.zemin[1]) / Hb] };
};
const GolgeIz: React.FC<{ isik: Isik; A: number; B: number; ref: P; hm: number; alfa: number; clip: string; children: React.ReactNode }> = ({ isik, A, B, ref, hm, alfa, clip, children }) => (
  <g clipPath={clip} opacity={alfa}>
    <g transform={`matrix(${golgeM(isik, A, B, hm).join(",")})`} filter="url(#insGolgeDuz)">{children}</g>
  </g>
);

export type InsertParam = { basamak?: { x: [number, number]; y: [number, number] }; islak_izler?: P[] };

export const InsertSahne: React.FC<{ plan: Plan; p: number; kilit: KilitNokta[] }> = ({ plan, p, kilit }) => {
  const saat = (param<string>(plan, "saat", "gece") === "gun" ? "gun" : "gece") as Saat;
  const C = RENK[saat];
  const k = kameraHesapla(plan.kamera, p);
  const isikNokta = param<{ zemin?: P; yukseklik?: number } | null>(plan, "isik_nokta", null);
  // ---- tek ışık ----
  const isik: Isik = saat === "gece"
    ? { tip: "nokta", ad: "köşk penceresi", zemin: (isikNokta?.zemin ?? [1250, 900]) as P, yukseklik: isikNokta?.yukseklik ?? 1100, renk: "#f0a848", havuz: { rx: 560, ry: 250, alfa: 0.25 } }
    : { tip: "yonlu", ad: "güneş (ENE, kadrajda tam sol)", yon: [3.7, -0.15], renk: "#f6e8c0" };
  const isikYon: P = isik.tip === "yonlu" ? [-isik.yon[0], -isik.yon[1]] : [1, -0.6]; // ışığa doğru (ekran)
  const elIsik = (ref: P) => kolIsigi(isik, ref, { murekkep: C.murekkep });

  const c = (plan.karakterler ?? [])[0];
  const eller = plan.el ?? [];
  const rol = (r: string) => eller.find((e) => (e as El & { rol?: string }).rol === r);
  const alanEl = rol("alan"), verenEl = rol("veren"), omuzEl = rol("omuz");
  const kesePr = (plan.props ?? []).find((z) => z.tur === "kese");
  const sikkePr = (plan.props ?? []).find((z) => z.tur === "sikke");
  const ZEMIN = n(param<number>(plan, "zemin_y", 1450), 1450);
  const qE = q(ZEMIN);                       // ellerin derinliği (zemin teması y 1450): 1270 px/m
  const olc = elOlc(qE);
  const elBoy = EL_BOY * olc;                // ≈ 241 px
  const keseH = KESE_EL * elBoy;             // ≈ 205 px (kese ≈ 0.85 × el)
  const islakW = c ? (typeof c.durum?.islak === "boolean" ? (c.durum.islak ? 1 : 0) : deger(c.durum?.islak as number | number[] | undefined, c.kare, p, 0)) : 0;
  const kaftan = c ? karakterBul(c.kim).palet : null;

  // ---- alıcı kolu: omuz soldan (gövde kadraj dışında), avucun yüksekliğini izler (çömelir / doğrulur); egil omzu öne, dogrul yukarı alır ----
  const alanJson: P | null = alanEl ? anahtar(alanEl.bilek, alanEl.kare, p) : null;
  let egil = 0, dogrul = 0;
  for (const j of c?.jestler ?? []) {
    if (j.ad === "egil") egil = Math.max(egil, interpolate(p, [j.bas, j.bit], [0, 1], { ...cl, easing: GIRIS }) * n(j.ops?.aci, 30) / 30);
    if (j.ad === "dogrul") dogrul = interpolate(p, [j.bas, j.bit], [0, 1], { ...cl, easing: GIRIS });
  }
  const omuzF = (h: P): P => [100 + (h[0] - 650) * 0.15 + 30 * egil * (1 - dogrul), 890 + (h[1] - 985) * 0.9 + 20 * egil * (1 - dogrul) - 30 * dogrul];
  const elAciJson = alanEl ? deger(alanEl.aci, alanEl.kare, p) : 0;
  const alanPozNow = alanPoz(alanEl, p);
  const sonPoz = ((alanEl?.poz ?? []) as { kare: number }[]).slice(-1)[0]?.kare ?? 0;
  const gevseDus = alanPozNow === "gevse" ? interpolate(p, [sonPoz, sonPoz + 8], [0, 12], cl) : 0;
  // P07 p0 (K2 W1): ilk anahtar zemine yakınsa (basamak) Lagâri SUDA, kolu kadrajın SOL-ALT kenarından gelir; avuç orta basamağın burnunu
  // kavrar (avuç aşağı, yen ağzı → bilek → avuç aynı doğrultuda, temas p0 = ses). Basamak derinliğinde (d ≈ 4.7 m) el gerçek ölçeğinde.
  // basBit'ten sonra el json yoluna geçer, omuz sudan çömelmiş insert düzenine (kare[1]) yükselir: Lagâri basamaktan çıkar.
  const basamakTemas = !!alanEl && alanEl.bilek[0][1] > ZEMIN - 0.25 * qE;
  const k1 = alanEl ? (alanEl.kare[1] ?? alanEl.kare[0] + 30) : 30;
  const basBit = basamakTemas ? alanEl!.kare[0] + (k1 - alanEl!.kare[0]) * 0.35 : -1;
  const bt = basamakTemasNoktasi();
  const u = basamakTemas ? interpolate(p, [basBit, k1], [0, 1], { ...cl, easing: INOUT }) : 1; // 0 basamakta → 1 insert düzeni
  const alanHedef: P | null = alanJson && basamakTemas && u < 1 ? lp(bt.p, alanJson, u) : alanJson;
  const pxmA = lerp(bt.pxm, qE, u), olcA = elOlc(pxmA);
  const pozAlan: ElPoz = basamakTemas && p < basBit ? "bas" : alanPozNow;
  const BAS_ACI = -25; // basamak burnunu kavrayan el: bilek kırılır, avuç orta basamağın ayak yüzüne yatar (parmaklar rıhtıma doğru, sağ)
  const aciAlan = basamakTemas && u < 1 ? lerp(BAS_ACI, elAciJson, u) : elAciJson + gevseDus;
  let hedefBilek = alanHedef ?? [0, 0];
  if (pozAlan === "bas" && alanHedef) { const av = elGeometri("bas").avucNoktasi; const v = elNokta([0, 0], aciAlan, olcA, av); hedefBilek = [alanHedef[0] - v[0], alanHedef[1] - v[1]]; }
  const suOmuz: P = [bt.p[0] - 0.6 * 0.6 * bt.pxm, bt.p[1] + 0.8 * 0.6 * bt.pxm];
  const omuzA: P | null = alanHedef ? (basamakTemas && u < 1 ? lp(suOmuz, omuzF(alanJson!), u) : omuzF(alanHedef)) : null;
  // dirsek json'dan (yönetmenin kol biçimi; ön kol derinliğe uzandığı için kısalmış görünür), bilek kayması kadar kaydırılır.
  // Kol boyu sınırı: omuz → bilek ≤ 0.6 m (aşılırsa IK ile uzanma; hata uyarılır). Basamak geçişinde (u < 1) her zaman IK (gerçek ölçek).
  const kol = omuzA && alanEl ? (() => {
    if (basamakTemas && u < 1) return ik2(omuzA, hedefBilek, 0.31 * pxmA, 0.29 * pxmA);
    const jd = anahtar(alanEl.dirsek, alanEl.kare, p), kay: P = [hedefBilek[0] - alanHedef![0], hedefBilek[1] - alanHedef![1]];
    const L = Math.hypot(hedefBilek[0] - omuzA[0], hedefBilek[1] - omuzA[1]);
    if (L > 0.62 * qE) return ik2(omuzA, hedefBilek, 0.31 * qE, 0.29 * qE);
    return { dirsek: [jd[0] + kay[0], jd[1] + kay[1]] as P, bilek: hedefBilek, hata: 0 };
  })() : null;
  if (kol && kol.hata > 2 && p % 30 === 0) console.warn(`[insert] ${plan.id} p${p}: alan el hedefe ${Math.round(kol.hata)} px kısa`);
  const avucAlan: P | null = kol ? elNokta(kol.bilek, aciAlan, olcA, elGeometri(pozAlan).avucNoktasi) : null;
  const elAciAlan = elAciJson;
  const alanTip = (alanEl?.tip ?? "lagari") as unknown as OsmanliElTip;

  // ---- veren el (sağdan, gövde kadraj dışında): kese kıstırmada; aktarma karesinde kese tabanı alıcı avucuna oturur ----
  const verenTut = verenEl?.tut;
  const verenCiz = (() => {
    if (!verenEl) return null;
    let bilek = anahtar(verenEl.bilek, verenEl.kare, p);
    let dirsek = anahtar(verenEl.dirsek, verenEl.kare, p);
    const aci = deger(verenEl.aci, verenEl.kare, p);
    const kis = (b: P) => elNokta(b, aci, olc, elGeometri("kistir").kistirNoktasi);
    if (verenTut && avucAlan) {
      const hedefKis: P = [avucAlan[0], avucAlan[1] - 0.8 * keseH];
      const ww = p <= verenTut.bit ? interpolate(p, [Math.min(verenTut.bit - 1, verenTut.bit - 18), verenTut.bit], [0, 1], { ...cl, easing: GIRIS }) : interpolate(p, [verenTut.bit, verenTut.bit + 14], [1, 0], cl);
      const k0 = kis(bilek), dlt: P = [(hedefKis[0] - k0[0]) * ww, (hedefKis[1] - k0[1]) * ww];
      bilek = [bilek[0] + dlt[0], bilek[1] + dlt[1]]; dirsek = [dirsek[0] + dlt[0] * 0.5, dirsek[1] + dlt[1] * 0.5];
    }
    // çıkış: son anahtarda el tümüyle kadraj dışında (parmak ucu x > 1080 + pay) — fade yok, fiziksel çıkış
    const son = verenEl.kare[verenEl.kare.length - 1], ilk = verenEl.kare[0];
    const disari = Math.max(0, 1080 + 30 + elBoy * 0.95 - verenEl.bilek[verenEl.bilek.length - 1][0]);
    const cik = interpolate(p, [verenTut?.bit ?? ilk, son], [0, 1], cl), gir = interpolate(p, [ilk, Math.max(ilk + 1, verenTut?.bas ?? ilk + 1)], [1, 0], cl); // tut.bas 0 (= kare[0]) korumalı: sıfır uzunluklu aralık yok
    const ek = disari * Math.max(cik * cik, gir);
    bilek = [bilek[0] + ek, bilek[1]]; dirsek = [dirsek[0] + ek, dirsek[1]];
    const L = Math.hypot(dirsek[0] - bilek[0], dirsek[1] - bilek[1]) || 1;
    const omuz: P = [dirsek[0] + ((dirsek[0] - bilek[0]) / L) * 0.31 * qE, dirsek[1] + ((dirsek[1] - bilek[1]) / L) * 0.31 * qE];
    const pozV: ElPoz = verenTut && p <= verenTut.bit ? "kistir" : "ac";
    return { bilek, dirsek, omuz, aci, kistir: kis(bilek), poz: pozV };
  })();

  // ---- muhafız eli (soldan): json `hedef` "ust-kol" (K2 W5, yönetmen) → alıcının ÜST KOLUNUN üst yüzüne (omuz→dirsek %30, kumaşın görünen
  // yeri); yoksa omuz başına iner. json yolunun biçimi korunur, temas noktası gerçek kola bağlanır (eli izler) ----
  const ustKol = (omuzEl as (El & { hedef?: string }) | undefined)?.hedef === "ust-kol";
  const omuzBasi: P | null = omuzA ? (ustKol && kol ? (() => {
    const t = 0.3, m = lp(omuzA, kol.dirsek, t), v: P = [kol.dirsek[0] - omuzA[0], kol.dirsek[1] - omuzA[1]], L = Math.hypot(v[0], v[1]) || 1;
    let nn: P = [-v[1] / L, v[0] / L]; if (nn[1] > 0) nn = [-nn[0], -nn[1]];
    const w = (0.15 * pxmA + (0.1 * pxmA - 0.15 * pxmA) * t) / 2;
    return [m[0] + nn[0] * w * 0.85, m[1] + nn[1] * w * 0.85] as P;
  })() : [omuzA[0] + 0.02 * qE, omuzA[1] - 0.07 * qE]) : null;
  const muhCiz = (() => {
    if (!omuzEl || !omuzBasi) return null;
    const tk = omuzEl.kare[2] ?? omuzEl.kare[omuzEl.kare.length - 1];
    const olcM = olc * 1.1;
    const aci = deger(omuzEl.aci, omuzEl.kare, p) + 6;
    const av = elGeometri("omuz").avucNoktasi;
    const avV = elNokta([0, 0], aci, olcM, [av[0], -av[1] * 0.4]);
    const hedefBilek: P = [omuzBasi[0] - avV[0], omuzBasi[1] - avV[1]];
    const j = anahtar(omuzEl.bilek, omuzEl.kare, p), jT = anahtar(omuzEl.bilek, omuzEl.kare, tk);
    const dj = anahtar(omuzEl.dirsek, omuzEl.kare, p), djT = anahtar(omuzEl.dirsek, omuzEl.kare, tk);
    const sk = 1; // json yolu (giriş zamanlaması dahil) aynen; yalnız temas noktası gerçek omuz başına bağlanır
    const bilek: P = [hedefBilek[0] + (j[0] - jT[0]) * sk, hedefBilek[1] + (j[1] - jT[1]) * sk];
    const fv: P = [djT[0] - jT[0], djT[1] - jT[1]], fL = Math.hypot(fv[0], fv[1]) || 1;
    const dirsek: P = [bilek[0] + (fv[0] / fL) * 0.29 * qE + (dj[0] - djT[0] - (j[0] - jT[0])) * sk, bilek[1] + (fv[1] / fL) * 0.29 * qE + (dj[1] - djT[1] - (j[1] - jT[1])) * sk];
    const L = Math.hypot(dirsek[0] - bilek[0], dirsek[1] - bilek[1]) || 1;
    const omuz: P = [dirsek[0] + ((dirsek[0] - bilek[0]) / L) * 0.31 * qE - 40, dirsek[1] + ((dirsek[1] - bilek[1]) / L) * 0.31 * qE - 60];
    const yuk = omuzBasi[1] - (bilek[1] + avV[1]);
    return { bilek, dirsek, omuz, aci, olc: olcM, yuk, temas: p >= tk, bas: Math.max(0, interpolate(p, [tk, tk + 5], [0, 1], cl)) };
  })();
  const omuzCokme = muhCiz ? 6 * muhCiz.bas : 0; // kumaş 4–6 px içeri (tasarim §3.7)

  // ---- kese ----
  type KD = { x: number; y: number; aci: number; ezik: number; yerde: boolean; elde: "veren" | "alan" | null; H: number };
  const keseDurum = ((): KD | null => {
    if (!kesePr) return null;
    const tutBit = verenTut?.bit ?? 0;
    const pozlar = (alanEl?.poz ?? []) as { kare: number; poz: string }[];
    const kistirK = pozlar.find((z) => z.poz === "kistir" || z.poz === "kapa")?.kare;
    const gevseK = kistirK !== undefined ? pozlar.find((z) => (z.poz === "gevsek" || z.poz === "gevse") && z.kare > kistirK)?.kare : undefined;
    const kareler = kesePr.kare ?? [], ys = (Array.isArray(kesePr.y) ? kesePr.y : [kesePr.y ?? 0]) as number[];
    const yerI = kareler.findIndex((kk, i) => i > 0 && kk > tutBit && ys[i] >= 1300);
    const yerK = yerI >= 0 ? kareler[yerI] : Infinity;
    if (verenCiz && p <= tutBit) { const sal = 3 * Math.sin(p * 0.21) * (1 - interpolate(p, [tutBit - 10, tutBit], [0, 1], cl)); return { x: verenCiz.kistir[0], y: verenCiz.kistir[1] + 0.8 * keseH, aci: sal, ezik: 0, yerde: false, elde: "veren", H: keseH }; }
    if (avucAlan && (gevseK === undefined || p < gevseK + 2)) return { x: avucAlan[0], y: avucAlan[1] + (pozAlan === "kapa" ? 4 : 0), aci: (aciAlan - (pozAlan === "gevse" ? 0 : elAciAlan)) * 0.6, ezik: interpolate(p, [tutBit, tutBit + 4, tutBit + 10], [0, 0.22, 0], cl), yerde: false, elde: "alan", H: keseH };
    const jx = deger(kesePr.x, kesePr.kare, p), jy = deger(kesePr.y, kesePr.kare, p, 0, (t) => t * t);
    const Hy = (y: number) => keseH * q(Math.min(ZEMIN, Math.max(y, 1300))) / qE;
    if (p < yerK) {
      // gevşeyen avuçtan kayar (avuç eğimi yönünde), json yoluna karışır, düşer (dönerek)
      const k0 = gevseK! + 2, t = interpolate(p, [k0, k0 + 12], [0, 1], cl);
      const av0 = avucAlan ?? [jx, jy];
      const a = ((aciAlan + 15) * Math.PI) / 180;
      const kay: P = [av0[0] + 40 * t * Math.cos(a), av0[1] + 40 * t * Math.sin(a)];
      return { x: lerp(kay[0], jx, t), y: lerp(kay[1], jy, t), aci: 20 * t + 50 * interpolate(p, [k0 + 12, yerK], [0, 1], cl), ezik: 0, yerde: false, elde: null, H: Hy(jy) };
    }
    const t = interpolate(p, [yerK, yerK + 8], [0, 1], { ...cl, easing: (u) => 1 - (1 - u) ** 2 });
    return { x: jx, y: jy, aci: lerp(50, 74, t), ezik: interpolate(p, [yerK, yerK + 3, yerK + 10], [0, 0.6, 0.35], cl), yerde: true, elde: null, H: Hy(jy) };
  })();

  // ---- sikke (P11): kese yere çarpınca ağzından çıkar, dönerek yuvarlanır, yatar ----
  const sikkeCiz = (() => {
    if (!sikkePr || !Array.isArray(sikkePr.kare) || p < sikkePr.kare[0]) return null;
    const x = deger(sikkePr.x, sikkePr.kare, p), y = deger(sikkePr.y, sikkePr.kare, p);
    const du = propDurum(sikkePr as Prop, p);
    let faz = 0; for (let t = sikkePr.kare[0]; t < p; t++) faz += 0.55 * n(propDurum(sikkePr as Prop, t).donus, 0);
    const yat = Math.max(0, Math.min(1, n(du.yatis, 0)));
    const r = (0.022 * 3 * q(y)) / 2 * n(sikkePr.olcek, 1); // 22 mm × stilize 3 (tasarim §4)
    const once = faz - 0.55 * n(du.donus, 0);
    const parlak = yat < 0.95 && Math.floor(faz / Math.PI) !== Math.floor(once / Math.PI);
    return { x, y, r, faz, yat, parlak };
  })();

  // ---- ıslaklık (P07): yen ucundan damla (her 12 karede), basamakta ıslak leke + parlama ----
  const damla = c?.durum?.damla as number[] | undefined;
  const damlalar: React.ReactNode[] = [];
  if (damla && kol && islakW > 0 && p >= damla[0] && p <= damla[1]) {
    const yenUc = (t: number): P => { const v: P = [kol.bilek[0] - kol.dirsek[0], kol.bilek[1] - kol.dirsek[1]]; return [kol.bilek[0] - v[0] * t, kol.bilek[1] - v[1] * t + 10]; };
    [0.05, 0.6].forEach((tt, i) => {
      const per = 12 + i * 2, faz = i * 6, t0 = Math.floor((p - faz) / per) * per + faz, t = p - t0;
      const src = yenUc(tt), zem = Math.max(src[1] + 0.25 * qE, ZEMIN - 40);
      const L = zem - src[1], sure = Math.max(4, Math.sqrt(L / 9));
      if (t < sure) { const yy = src[1] + L * (t / sure) ** 2; damlalar.push(<path key={`dm${i}`} d={`M ${src[0]} ${yy - 12} q 6 8 4 12 q -4 4 -8 0 q -2 -4 4 -12 Z`} fill={C.parla} stroke="#e6eef0" strokeWidth={1} />); }
      else if (t < sure + 2) damlalar.push(<ellipse key={`dh${i}`} cx={src[0]} cy={zem} rx={12} ry={3.5} fill="none" stroke={C.parla} strokeWidth={2} opacity={0.7} />);
    });
  }
  // P07: basamakta ıslak leke (orta basamak, avucun çevresi) + parlama; üst basamakta damla izleri (Lagâri sudan çıkıyor) — K2 W1/W3
  const bid2 = "isl" + React.useId().replace(/:/g, "");
  const basamakIslak = saat === "gece" && basamakTemas ? (() => {
    const X1 = INS.kenarX - BAS.w, X0 = X1 - BAS.w, H1 = -2 * BAS.r, H0 = -BAS.r;
    const leke = [proj(X0 + 0.005, H1, BAS.d0 + 0.02), proj(X1 - 0.01, H1, BAS.d0 + 0.0), proj(X1 - 0.02, H1, BAS.d0 + 0.42), proj(X0 + 0.02, H1, BAS.d0 + 0.5)];
    const ust = [proj(INS.kenarX - BAS.w + 0.01, H0, BAS.d0 + 0.05), proj(INS.kenarX - 0.03, H0, BAS.d0 + 0.12), proj(INS.kenarX - 0.04, H0, BAS.d0 + 0.3), proj(INS.kenarX - BAS.w + 0.02, H0, BAS.d0 + 0.26)];
    const parla = [proj(X0 + 0.02, H1, BAS.d0 + 0.12), proj(X0 + 0.03, H1, BAS.d0 + 0.36)];
    return <g clipPath={`url(#${bid2})`}>
      <defs><clipPath id={bid2}><polygon points={DENIZ_TARAFI} /></clipPath></defs>
      <polygon points={poly(leke)} fill={C.islak} opacity={0.85} />
      <polygon points={poly(ust)} fill={C.islak} opacity={0.6} />
      <line x1={parla[0][0]} y1={parla[0][1]} x2={parla[1][0]} y2={parla[1][1]} stroke={C.parla} strokeWidth={pozAlan === "bas" ? 4 : 3} strokeOpacity={pozAlan === "bas" ? 0.85 : 0.5} strokeLinecap="round" />
    </g>;
  })() : null;

  // ---- kilit noktaları ----
  if (avucAlan) kilit.push({ ad: pozAlan === "bas" ? "ıslak el basamak" : "avuç", p: ekranNokta(k, avucAlan), tur: pozAlan === "bas" ? "temas" : "dokunus" });
  if (keseDurum) kilit.push({ ad: "kese", p: ekranNokta(k, [keseDurum.x, keseDurum.y]), tur: keseDurum.yerde ? "temas" : "kurulum" });
  if (sikkeCiz) kilit.push({ ad: "sikke", p: ekranNokta(k, [sikkeCiz.x, sikkeCiz.y]), tur: "temas" });
  if (muhCiz?.temas && omuzBasi) kilit.push({ ad: "omuz teması", p: ekranNokta(k, omuzBasi), tur: "temas" });

  // ---- gölgeler (tek ışık, K2 W4): kol/el/kese SİLUETİ ışık tanımından zemine izdüşürülür (afin, aynı yon/nokta); yalnız rıhtım
  // döşemesine düşer (su keskin gölge taşımaz → kırpılır). Basamaktaki avuç temasta: gölgesi temas lekesinde. Sikke küçük: elips. ----
  const zid = "insZ" + React.useId().replace(/:/g, "");
  const kxE = (y: number) => INS.un[0] + INS.kenarX * q(y), dxE = (y: number) => INS.un[0] + INS.duvarX * q(y);
  const zeminKlip = poly([INS.un, [kxE(2200), 2200], [dxE(2200), 2200]]);
  const GA = saat === "gece" ? 0.3 : 0.4; // gece pencere ışığı zayıf ve uzak: yumuşak
  const golgeler: React.ReactNode[] = [];
  const HV = havada(0.35);
  if (kol && omuzA && pozAlan !== "bas") golgeler.push(<GolgeIz key="ga" isik={isik} A={HV.A} B={HV.B} ref={kol.bilek} hm={0.35} alfa={GA} clip={`url(#${zid})`}>
    <OsmanliKol omuz={omuzA} dirsek={kol.dirsek} bilek={kol.bilek} gen={[0.15 * pxmA, 0.1 * pxmA]} tip={alanTip} elAci={aciAlan} olc={olcA} poz={pozAlan} />
  </GolgeIz>);
  if (verenCiz && verenCiz.bilek[0] < 1180) { const HVv = havada(0.38); golgeler.push(<GolgeIz key="gv" isik={isik} A={HVv.A} B={HVv.B} ref={verenCiz.bilek} hm={0.38} alfa={GA} clip={`url(#${zid})`}>
    <OsmanliKol omuz={verenCiz.omuz} dirsek={verenCiz.dirsek} bilek={verenCiz.bilek} gen={[0.15 * qE, 0.1 * qE]} tip={verenEl!.tip as unknown as OsmanliElTip} elAci={verenCiz.aci} olc={olc} poz={verenCiz.poz} />
  </GolgeIz>); }
  if (keseDurum) {
    // kese DİK nesne: tabanı elde (avuç/kıstırma: tabanın zemindeki gölge noktası), düşerken (iniş y'si üstünde), yerde (kendi tabanı)
    const yIn = Math.max(keseDurum.y, n((Array.isArray(kesePr!.y) ? (kesePr!.y as number[]).slice(-1)[0] : kesePr!.y) as number, ZEMIN - 95));
    const hmK = keseDurum.elde === "alan" ? 0.35 : keseDurum.elde === "veren" ? 0.23 : keseDurum.yerde ? 0 : Math.max(0, (yIn - keseDurum.y) / q(yIn));
    const H0 = havada(Math.max(0.001, hmK));
    const taban: P = hmK > 0 ? uygula(golgeM(isik, H0.A, H0.B, hmK), [keseDurum.x, keseDurum.y]) : [keseDurum.x, keseDurum.y];
    const di = dikIsik(isik, taban);
    golgeler.push(<GolgeIz key="gk" isik={di} A={-1} B={taban[1]} ref={taban} hm={0} alfa={keseDurum.yerde ? 0.5 : GA} clip={`url(#${zid})`}>
      <Kese x={taban[0]} y={taban[1]} H={keseDurum.H} aci={keseDurum.aci} icerik="gumus" ezik={keseDurum.ezik} />
    </GolgeIz>);
  }
  if (sikkeCiz) golgeler.push(<ellipse key="gs" cx={sikkeCiz.x + (isik.tip === "yonlu" ? sikkeCiz.r * 1.6 * (1 - sikkeCiz.yat) : -0.3 * sikkeCiz.r)} cy={sikkeCiz.y} rx={sikkeCiz.r * (1 + (1 - sikkeCiz.yat) * (isik.tip === "yonlu" ? 2.4 : 0.4))} ry={sikkeCiz.r * 0.3} fill="#2e2620" opacity={0.4} />);
  // muhafız eli gölgesi: güneş soldan → el kolun üstündeyken (yuk px) EL SİLUETİ yon·yuk kadar kayarak alıcının koluna/omzuna düşer
  // (yalnız kumaşın üstünde: alıcı omuz + kol siluetine kırpılır), p96–104
  const kid2 = "insK" + React.useId().replace(/:/g, "");
  const muhGolge = muhCiz && isik.tip === "yonlu" && omuzBasi && omuzA && kol && muhCiz.yuk > 2 && muhCiz.yuk < 120 ? (
    <g clipPath={`url(#${kid2})`} opacity={0.4}>
      <g transform={`translate(${isik.yon[0] * muhCiz.yuk},${(1 + isik.yon[1]) * muhCiz.yuk})`} filter="url(#insGolgeDuz)">
        <OsmanliKol omuz={muhCiz.omuz} dirsek={muhCiz.dirsek} bilek={muhCiz.bilek} gen={[0.17 * qE, 0.11 * qE]} tip={omuzEl!.tip as unknown as OsmanliElTip} elAci={muhCiz.aci} olc={muhCiz.olc} poz="omuz" />
      </g>
    </g>) : null;
  const alanKolBant = omuzA && kol ? (() => { const w0 = 0.075 * pxmA, w1 = 0.05 * pxmA; const nrm = (a: P, b: P): P => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [-(b[1] - a[1]) / L, (b[0] - a[0]) / L]; }; const n1 = nrm(omuzA, kol.dirsek), n2 = nrm(kol.dirsek, kol.bilek); return poly([[omuzA[0] + n1[0] * w0, omuzA[1] + n1[1] * w0], [kol.dirsek[0] + n1[0] * w0, kol.dirsek[1] + n1[1] * w0], [kol.bilek[0] + n2[0] * w1, kol.bilek[1] + n2[1] * w1], [kol.bilek[0] - n2[0] * w1, kol.bilek[1] - n2[1] * w1], [kol.dirsek[0] - n1[0] * w0, kol.dirsek[1] - n1[1] * w0], [omuzA[0] - n1[0] * w0, omuzA[1] - n1[1] * w0]]); })() : "";

  // ---- alıcının kadraj içindeki omuz başı (gövde solda, kadraj dışı) ----
  const omuzKutle = omuzA && kaftan ? (() => {
    const r = 0.1 * pxmA, o: P = [omuzA[0], omuzA[1] + omuzCokme];
    const kc = islakW > 0 ? karistir(kaftan.coat, "#232c42", islakW) : kaftan.coat;
    const d = `M ${o[0] + r * 0.9} ${o[1] + r * 0.2} Q ${o[0] + r * 0.8} ${o[1] - r * 0.95} ${o[0] - r * 0.3} ${o[1] - r * 0.9} Q ${o[0] - r * 2.2} ${o[1] - r * 0.75} ${-120} ${o[1] - r * 0.55} L ${-120} ${o[1] + r * 3.5} L ${o[0] - r * 0.4} ${o[1] + r * 2.4} Z`;
    return <g>
      <defs><clipPath id={kid2}><path d={d} /><polygon points={alanKolBant} /></clipPath></defs>
      <path d={d} fill={kc} stroke={ink(kc)} strokeWidth={3} strokeLinejoin="round" />
      <path d={`M ${o[0] + r * 0.8} ${o[1] - r * 0.7} Q ${o[0]} ${o[1] - r * 1.05} ${o[0] - r * 1.4} ${o[1] - r * 0.85}`} stroke={isik.tip === "yonlu" ? "#f0d79a" : "#f0b060"} strokeWidth={3} fill="none" opacity={0.55} />
      {islakW > 0.3 && <path d={`M ${o[0] - r * 0.6} ${o[1] - r * 0.8} q ${r * 0.6} -6 ${r * 1.1} 4`} stroke="#a9bccb" strokeWidth={3} fill="none" opacity={0.45 * islakW} />}
      {muhCiz?.temas && <path d={`M ${omuzBasi![0] - r * 0.7} ${omuzBasi![1] + 14 + omuzCokme} q ${r * 0.7} ${8 + omuzCokme} ${r * 1.4} 0`} stroke={ink(kc)} strokeWidth={3} fill="none" opacity={0.7} />}
    </g>;
  })() : null;

  const keseCiz = keseDurum ? <Kese x={keseDurum.x} y={keseDurum.y} H={keseDurum.H} aci={keseDurum.aci} icerik={(propDurum(kesePr as Prop, p).icerik as "gumus" | "altin") ?? "gumus"} ezik={keseDurum.ezik} isikYon={isikYon} gece={saat === "gece"} ag={saat === "gun" ? 1 : 0.4} /> : null;
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        <g transform={katDonusum(k, 1)}>
          <defs>
            <filter id="insGolgeDuz" filterUnits="userSpaceOnUse" x={-4000} y={-4000} width={12000} height={12000}><feFlood floodColor="#14110d" /><feComposite in2="SourceAlpha" operator="in" /></filter>
            <clipPath id={zid}><polygon points={zeminKlip} /></clipPath>
          </defs>
          <InsertDekor saat={saat} p={p} />
          {isik.tip === "nokta" && <g style={{ mixBlendMode: "screen" }}>
            <ellipse cx={1000} cy={1430} rx={560} ry={250} fill={isik.renk} opacity={0.25 * 0.5} />
            <ellipse cx={1000} cy={1430} rx={325} ry={145} fill={isik.renk} opacity={0.25 * 0.7} />
          </g>}
          {basamakIslak}
          {golgeler}
          {keseDurum?.yerde && keseCiz}
          {sikkeCiz && <Sikke x={sikkeCiz.x} y={sikkeCiz.y} r={sikkeCiz.r} faz={sikkeCiz.faz} yatis={sikkeCiz.yat} parlak={sikkeCiz.parlak} />}
          {verenCiz && <>
            {keseDurum?.elde === "veren" && keseCiz}
            <OsmanliKol omuz={verenCiz.omuz} dirsek={verenCiz.dirsek} bilek={verenCiz.bilek} gen={[0.15 * qE, 0.1 * qE]} tip={verenEl!.tip as unknown as OsmanliElTip} elAci={verenCiz.aci} olc={olc} poz={verenCiz.poz} isik={elIsik(verenCiz.bilek)} />
          </>}
          {omuzKutle}
          {kol && omuzA && <OsmanliKol omuz={[omuzA[0], omuzA[1] + omuzCokme]} dirsek={kol.dirsek} bilek={kol.bilek} gen={[0.15 * pxmA, 0.1 * pxmA]} tip={alanTip} elAci={aciAlan} olc={olcA} poz={pozAlan} islak={islakW} isik={elIsik(kol.bilek)} kenarIsik={saat === "gece" && islakW > 0 ? { renk: "#eaa956", px: 4, yon: [0.7, -0.7] } : undefined} avucNesne={keseDurum?.elde === "alan" ? keseCiz : undefined} />}
          {keseDurum && !keseDurum.yerde && !keseDurum.elde && keseCiz}
          {muhGolge}
          {muhCiz && <OsmanliKol omuz={muhCiz.omuz} dirsek={muhCiz.dirsek} bilek={[muhCiz.bilek[0], muhCiz.bilek[1] + omuzCokme]} gen={[0.17 * qE, 0.11 * qE]} tip={omuzEl!.tip as unknown as OsmanliElTip} elAci={muhCiz.aci} olc={muhCiz.olc} poz="omuz" isik={elIsik(muhCiz.bilek)} />}
          {damlalar}
        </g>
      </RenkKaydi>
    </svg>
  );
};
void taramaAcisi; void Golge; void izdusum; void rnd; void tonla; void AYAK_TABAN; void govdeDunya; void kuklaIsigi; void Kukla; void karakterPoz; void RIG_BIRIM_M;
export type { Palet as _Palet, Poz as _Poz };
