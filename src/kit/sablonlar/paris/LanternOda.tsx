// ===== KE-PK-S4 LANTERN-ODA v3 (Paris kuşatması 1870; mekanlar.md §4v3 · tasarım §15.2–15.3, tur-15) =====
// İki görünüm, her biri kendi pinhole kamerasının cs 1 ekranında (mekanlar §4v3.2 / §4v3.5 ekran tabloları birebir):
//   `oda`  — F 1700, göz 1.70, arka duvar Z 3.6 (472 px/m), ufuk y 960. Tavan + korniş, çıtaya iple asılı projeksiyon BEZİ (%61),
//            kapalı iç kepenkli pencere, ip mandalı; lantern SAĞ-ALT ön planda (mercek (892,1605) gövdenin arkasında);
//            huzme = mercek ile o anki görüntü dikdörtgeninin zarfı, ışınlar görüntünün yakın kenarlarında biter (perdeyi aşmaz);
//            üç farklı arka-baş (kel / dağınık / ayrık, kulaksız) + memur-3 kalkar, sağ kenardan çıkar.
//   `kapi` — F 1180, göz 1.25, kapı duvarı Z 2.6, ufuk y 960. Kamera odada, kapı SAĞDA: pervaz + başlık + soffit + söve iç yüzü +
//            eşik; açıklıkta güneşli koridor duvarı (pencere kası gölgeli leke), iki bekleyen; döşemede kapı ışığı havuzu +
//            okuyanın gölgesi. Okuyan (tasarım §15.2): sola bakan 3/4 profil, baş öne eğik, yüzsüz burun-çene silueti, kulak/ense
//            sıcak kenar ışığı (kapı), yanak/çene altı kâğıt yansıması, tek giysi konik kollar, 78° palto taraması, kâğıt 45°
//            ışığa dönük, iki el tutuşu (gravür eli, GravurEl).
// Tek ışık: oda = lantern (perde ikincil), kapı = koridor güneşi → açıklık alan ışığı (sağ-arka → sol-ön). Fade yok, kırmızı yok,
// sarı metal yok, kılıf yok. Görüntüde harf yok (dil-nötr satırlar).
import React, { useId } from "react";
import { interpolate } from "remotion";
import { RenkKaydi } from "../../../doku/Tarama";
import { dortgen, P, rnd } from "../../../doku/sabitler";
import type { Plan } from "../../tipler";
import { cl, CIKIS, ekranNokta, GIRIS, INOUT, kameraHesapla, katDonusum } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";
import { satirYollari } from "../../props/paris/Sayfa";
import { SiluetFigur } from "../../props/paris/SiluetFigur";
import { GravurEl, GRAVUR_POZ, GravurPalet, konikKol } from "../../props/paris/GravurEl";
import type { Kam } from "./montmartreDunya";

type Ar = { bas: number; bit: number; temas?: number; kare?: number };
const ar = (v: unknown, d: Ar): Ar => (v && typeof v === "object" && typeof (v as Ar).bas === "number" ? (v as Ar) : d);
const obj = (plan: Plan, ad: string) => ((plan.parametreler?.[ad] ?? {}) as Record<string, unknown>);
const t01 = (p: number, a: number, b: number, e: (t: number) => number = INOUT) => interpolate(p, [a, b], [0, 1], { ...cl, easing: e });
const pt = (a: P[]) => a.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
const yk = (a: P[]) => `M${a.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join("L")}Z`;
const lp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const S = 167; // DOKU_SEED.lanternOda

export const KAM_ODA: Kam = { F: 1700, X: 0, e: 1.7, Z: 0, U: 960 };
export const KAM_KAPI: Kam = { F: 1180, X: 0, e: 1.25, Z: 0, U: 960 };
const LP = {
  tavan: "#1e1d2c", duvar: "#2e2c40", halka: "#4a4762", bez: "#3a3a4a", perde: "#d9d9cf", huzme: "#e4ecd8", satir: "#6d675a",
  lantern: "#2f3238", lanternKenar: "#4a4d52", sehpa: "#4a3f33", memur: "#2c2f36", memurKontur: "#1b1d24", kenarSoguk: "#c4ccbc",
  sacK: "#2a2638", kelTen: "#5a4c52", sove: "#2a2838", soveIc: "#c9a998", koridor: "#e8cdb6", sicakKenar: "#f0c4a8",
  palto: "#45405a", paltoIsik: "#524a6e", paltoKontur: "#2a2638", paltoTarama: "#2f2d46", basTen: "#6e5a62", yansima: "#8f7360", yansimaKenar: "#d8b8a4",
  kagitIsik: "#dad5c6" /* §15.2.5 #e4dfd0 L* 89.6 → §15.5 tavanı 88 */, kagitGolge: "#c9c3b2", kagitKat: "#bdb7a6", zarf: "#d6d2c6", zarfCizgi: "#8a8576", zarfIc: "#a9a49a",
  lambri: "#3e3446", soffit: "#4a3c4c", tasZemin: "#b89a8a", gunSerit: "#d9bfa8", esik: "#8a7480", havuzIc: "#6e5862", havuzDis: "#4a3c4c",
  koridorTarama: "#a88c80", sogukBasamak: "#3a3850", gomlek: "#5d5f63",
};

// ---- lantern geometrisi (C4, oda görünümü ekran koordinatı; kaçış noktası (540,960), Z ≈ 2.0 m, mercek ≈ 1.5 m) ----
const LN = (() => {
  const VP: P = [540, 960], s = 0.85; // ön yüz: kutu derinliği ≈ 0.35 m
  const bx0 = 915, bx1 = 1200, by0 = 1000, by1 = 1290;
  const on = (q: P): P => [VP[0] + (q[0] - VP[0]) * s, VP[1] + (q[1] - VP[1]) * s];
  const merk: P = [(bx0 + bx1) / 2, by0 + (by1 - by0) * 0.55];
  const mercek: P = [VP[0] + (merk[0] - VP[0]) * 0.8, VP[1] + (merk[1] - VP[1]) * 0.8]; // mercek borusu ucu (kutunun arkasında gizli)
  return {
    bx0, bx1, by0, by1, mercek, onSolUst: on([bx0, by0]), onSolAlt: on([bx0, by1]), onSagUstX: on([bx1, by0])[0],
    bacaX: 922, bacaY: 790, yuva: [1018, 998] as P, sehpaOnBacak: [on([bx0 + 10, by1 + 20]), on([bx0 + 10, 1990])] as [P, P],
  };
})();

// ---- değişken aralıklı tek yön tarama (çizgiler tek tek; aralık konuma göre sıklaşır) ----
const TaramaCizgi: React.FC<{ aci: number; kutu: [number, number, number, number]; aralik: (u: number) => number; renk: string; kalin: number; alfa: number; seed: number }> = ({ aci, kutu, aralik, renk, kalin, alfa, seed }) => {
  const r = (aci * Math.PI) / 180, d: P = [Math.cos(r), -Math.sin(r)], n: P = [-d[1], d[0]];
  const [x0, y0, x1, y1] = kutu, ks: P[] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const us = ks.map((q) => q[0] * n[0] + q[1] * n[1]), uMin = Math.min(...us), uMax = Math.max(...us);
  const L = Math.hypot(x1 - x0, y1 - y0);
  const out: React.ReactNode[] = [];
  let u = uMin, i = 0;
  while (u < uMax && i < 400) {
    const c: P = [(x0 + x1) / 2, (y0 + y1) / 2], cu = c[0] * n[0] + c[1] * n[1], o: P = [c[0] + n[0] * (u - cu), c[1] + n[1] * (u - cu)];
    out.push(<line key={i} x1={o[0] - d[0] * L} y1={o[1] - d[1] * L} x2={o[0] + d[0] * L} y2={o[1] + d[1] * L} />);
    u += aralik(u - uMin) * (0.92 + 0.16 * rnd(seed, i)); i++;
  }
  return <g stroke={renk} strokeWidth={kalin} strokeOpacity={alfa} strokeLinecap="round">{out}</g>;
};

// ---- perdedeki sayfa: aynı P05 sayfası (satırlar dil-nötr), bulanık → net 3 kopya ----
const PerdeSayfa: React.FC<{ r: [number, number, number, number]; bulanik: number; cizgi: number }> = ({ r, bulanik, cizgi }) => {
  const [x0, y0, x1, y1] = r;
  const h = y1 - y0, w = Math.min(x1 - x0, h * (0.21 / 0.27)) * 0.94, cx = (x0 + x1) / 2;
  const m = dortgen([cx - w / 2, y0 + h * 0.05], [cx + w / 2, y0 + h * 0.05], [cx + w / 2, y1 - h * 0.05], [cx - w / 2, y1 - h * 0.05]);
  const yollar = satirYollari(m, S + 40, 13);
  const ofs = 14 * bulanik * ((x1 - x0) / 566 + 0.6);
  const kopya = bulanik > 0.02 ? [-ofs, 0, ofs] : [0];
  return (
    <g stroke={LP.satir} strokeWidth={cizgi} strokeLinecap="round" fill="none">
      {/* film karesinin sayfa kenarı (kâğıdın kenar boşluğu) */}
      <rect x={cx - w / 2} y={y0 + h * 0.05} width={w} height={h * 0.9} stroke="#b9b9ae" strokeWidth={Math.max(1.5, cizgi * 0.5)} />
      {kopya.map((d, i) => <g key={i} transform={`translate(${d} ${d * 0.35})`} opacity={kopya.length > 1 ? (i === 1 ? 0.34 + 0.66 * (1 - bulanik) : 0.33 * bulanik) : 1}>{yollar.map((y, j) => <path key={j} d={y} />)}</g>)}
    </g>
  );
};

// ================================================================== memur arka-başları (tasarım §15.3) ==================================================================
type BasTip = "kel" | "daginik" | "ayrik" | "daginik2";
/** memur başının silüeti (kafa + saç tutamları) ve dönüşümü — çizim, huzme maskesi ve perde gölgesi aynı geometriden */
const memurKafa = (x: number, tepe: number, B: number, tip: BasTip, egim: number) => {
  const en = tip === "kel" ? 0.8 : tip === "ayrik" ? 0.72 : 0.64, boy = tip.startsWith("daginik") ? 1.06 : 1;
  const w = en * B, h = B * boy, cx = x, cy = tepe + h / 2;
  const yanEg = tip === "ayrik" ? -8 : tip === "daginik2" ? 5 : 0, boyunY = cy + h * 0.46;
  // kafa arkası: üstte yuvarlak, ensede daralan (kulak yok)
  const kafa = `M${cx - w / 2} ${cy - h * 0.05} C${cx - w / 2} ${cy - h * 0.62} ${cx + w / 2} ${cy - h * 0.62} ${cx + w / 2} ${cy - h * 0.05} C${cx + w * 0.5} ${cy + h * 0.28} ${cx + w * 0.3} ${cy + h * 0.44} ${cx + w * 0.22} ${cy + h * 0.5} L${cx - w * 0.22} ${cy + h * 0.5} C${cx - w * 0.3} ${cy + h * 0.44} ${cx - w * 0.5} ${cy + h * 0.28} ${cx - w / 2} ${cy - h * 0.05} Z`;
  const tutam = (n: number, a0: number, a1: number, b0: number, b1: number, k: string) => {
    let d = "";
    for (let i = 0; i < n; i++) {
      const a = a0 + ((a1 - a0) * (i + 0.5)) / n, L = (b0 + (b1 - b0) * rnd(S + 31, `${k}${i}`)) * B, r = (a * Math.PI) / 180;
      const bx = cx + Math.cos(r) * w * 0.5, by = cy - h * 0.05 + Math.sin(r) * h * 0.55;
      const ux = bx + Math.cos(r) * L, uy = by + Math.sin(r) * L, s = 0.045 * B;
      d += `M${bx - Math.sin(r) * s} ${by + Math.cos(r) * s} L${ux} ${uy} L${bx + Math.sin(r) * s} ${by - Math.cos(r) * s} Z`;
    }
    return d;
  };
  const sac: string[] = [];
  if (tip.startsWith("daginik")) sac.push(tutam(8, tip === "daginik" ? -170 : -175, tip === "daginik" ? 10 : 5, 0.06, 0.16, tip));
  if (tip === "daginik") sac.push(`M${cx + w * 0.3} ${cy - h * 0.42} L${cx + w * 0.42} ${cy - h * 0.66} L${cx + w * 0.4} ${cy - h * 0.38} Z`);
  if (tip === "ayrik") sac.push(`M${cx - w * 0.5} ${cy - h * 0.05} L${cx - w * 0.6} ${cy - h * 0.18} L${cx - w * 0.46} ${cy - h * 0.3} Z`);
  const tf = `rotate(${yanEg} ${cx} ${boyunY}) rotate(${egim * 0.25} ${cx} ${boyunY})`;
  return { kafa, sac, tf, w, h, cx, cy, yanEg, boyunY, merkez: [cx, cy] as P };
};

const MemurArka: React.FC<{ x: number; tepe: number; B: number; tip: BasTip; egim: number; isik: number; uid: string; omuzY: number; sadece?: "govde" | "bas" }> = ({ x, tepe, B, tip, egim, isik, uid, omuzY, sadece }) => {
  const { kafa, sac, w, h, cx, cy, yanEg, boyunY } = memurKafa(x, tepe, B, tip, egim);
  const ow = (tip === "kel" ? 2.2 : 1.95) * B / 2;
  const govde = `M${cx - w * 0.24} ${boyunY - 6} C${cx - w * 0.3} ${omuzY - 14} ${cx - ow * 0.7} ${omuzY - 4} ${cx - ow} ${omuzY + 0.18 * ow} L${cx - ow * 1.1} ${omuzY + 2.4 * B} L${cx + ow * 1.1} ${omuzY + 2.4 * B} L${cx + ow} ${omuzY + 0.18 * ow} C${cx + ow * 0.7} ${omuzY - 4} ${cx + w * 0.3} ${omuzY - 14} ${cx + w * 0.24} ${boyunY - 6} Z`;
  const kw = 2.5;
  const govdeVar = sadece !== "bas", basVar = sadece !== "govde";
  return (
    <g transform={`rotate(${yanEg} ${cx} ${boyunY})`}>
      <defs><clipPath id={`${uid}k`}><path d={kafa} /></clipPath></defs>
      {govdeVar && <path d={govde} fill={LP.memur} stroke={LP.memurKontur} strokeWidth={kw} strokeLinejoin="round" />}
      {/* yaka */}
      {!govdeVar ? null : tip === "ayrik" ? <path d={`M${cx - w * 0.36} ${boyunY + 2} L${cx - w * 0.3} ${boyunY - 0.16 * B} L${cx + w * 0.3} ${boyunY - 0.16 * B} L${cx + w * 0.36} ${boyunY + 2} Z`} fill={LP.memur} stroke={LP.memurKontur} strokeWidth={kw} />
        : <path d={`M${cx - w * 0.5} ${boyunY + 6} Q${cx} ${boyunY - (tip === "kel" ? 0.02 : 0.12) * B} ${cx + w * 0.5} ${boyunY + 6} L${cx + w * 0.62} ${boyunY + 0.14 * B} Q${cx} ${boyunY + 0.02 * B} ${cx - w * 0.62} ${boyunY + 0.14 * B} Z`} fill={LP.memur} stroke={LP.memurKontur} strokeWidth={kw} />}
      {basVar && <g transform={`rotate(${egim * 0.25} ${cx} ${boyunY})`}>
        <path d={kafa} fill={tip === "kel" ? LP.kelTen : LP.sacK} stroke={LP.memurKontur} strokeWidth={kw} />
        <g clipPath={`url(#${uid}k)`}>
          {tip === "kel" && <>
            {/* kulak hizası ve ensede ince saç şeridi; iki ense kıvrımı */}
            <path d={`M${cx - w * 0.55} ${cy + h * 0.02} Q${cx} ${cy + h * 0.2} ${cx + w * 0.55} ${cy + h * 0.02} L${cx + w * 0.55} ${cy + h * 0.6} L${cx - w * 0.55} ${cy + h * 0.6} Z`} fill={LP.sacK} />
            {[0.34, 0.42].map((v, i) => <path key={i} d={`M${cx - w * 0.2} ${cy + h * v} Q${cx} ${cy + h * (v + 0.03)} ${cx + w * 0.2} ${cy + h * v}`} stroke={LP.memurKontur} strokeWidth={2} fill="none" />)}
          </>}
          {tip === "ayrik" && <>
            <path d={`M${cx - w * 0.5 + 0.18 * B} ${cy - h * 0.6} L${cx - w * 0.5 + 0.2 * B} ${cy - h * 0.1}`} stroke={LP.kelTen} strokeWidth={2} />
            <path d={`M${cx - w * 0.6} ${cy + h * 0.36} L${cx + w * 0.6} ${cy + h * 0.36}`} stroke={LP.kelTen} strokeWidth={2} />
          </>}
        </g>
        {sac.map((d, i) => <path key={`s${i}`} d={d} fill={LP.sacK} />)}
        {/* perde/huzme kenar ışığı: üst kenarın %25–40'ı, kırık parçalar, uçları incelir */}
        {isik > 0 && <g stroke={LP.kenarSoguk} fill="none" strokeLinecap="round" opacity={isik}>
          <path d={`M${cx - w * 0.36} ${cy - h * 0.4} Q${cx - w * 0.12} ${cy - h * 0.52} ${cx + w * 0.08} ${cy - h * 0.505}`} strokeWidth={2} />
          <path d={`M${cx + w * 0.16} ${cy - h * 0.49} Q${cx + w * 0.26} ${cy - h * 0.46} ${cx + w * 0.32} ${cy - h * 0.42}`} strokeWidth={1.5} />
          <path d={`M${cx - ow * 0.95} ${omuzY + 0.14 * ow} C${cx - ow * 0.7} ${omuzY - 2} ${cx - ow * 0.4} ${omuzY - 6} ${cx - w * 0.32} ${omuzY - 12}`} strokeWidth={2} />
        </g>}
      </g>}
    </g>
  );
};

// ================================================================== ODA görünümü (§4v3.2) ==================================================================
const OdaSahne: React.FC<{ plan: Plan; p: number; uid: string; kilit: SablonProps["kilit"] }> = ({ plan, p, uid, kilit }) => {
  const k = kameraHesapla(plan.kamera, p);
  const hz = obj(plan, "huzme") as { lamba_acilir?: Ar; isin?: { kaynak?: P } };
  const la = ar(hz.lamba_acilir, { bas: 62, bit: 80, temas: 68 }), cam = ar(plan.parametreler?.cam_levha, { bas: 80, bit: 90, temas: 84 });
  const bo = ar(plan.parametreler?.buyume_odak, { bas: 112, bit: 204 });
  const mm = obj(plan, "memurlar") as { durur?: Ar; yazar?: Ar; memur3_kalkis?: Ar; konum_dekor_x?: number[] };
  const du = ar(mm.durur, { bas: 100, bit: 206 }), ya = ar(mm.yazar, { bas: 206, bit: 248 }), mk = ar(mm.memur3_kalkis, { bas: 250, bit: 266 });
  const pb = obj(plan, "perde_bez") as { buyume_merkezi?: P };
  const yan = la.temas ?? 68;
  const lamba = p >= yan ? 1 : 0; // ışık olayı (lamba yanar)
  const uzan = t01(p, yan, la.bit, GIRIS); // huzme mercekten perdeye uzar
  // C4 (eleştiri C3 kritik): lantern izleyicilerin arkasında YÜKSEK SEHPADA (dönem: baş üstünden yansıtma). Mercek şablon sabiti
  // (lantern çiziminden türetilir); json `huzme.isin.kaynak` artık kullanılmaz — tüm ışınlar baş tepelerinin (y ≥ 1205) üstünden geçer.
  void hz.isin;
  const kaynak: P = LN.mercek;
  // görüntü dikdörtgeni: küçük bulanık kare (80 px) → 566 × 439 (merkez (422,779)); her karede bezin içinde
  const C: P = pb.buyume_merkezi ?? [422, 779];
  const g = t01(p, bo.bas, bo.bit, INOUT);
  const yw = 40 + (283 - 40) * g, yh = 40 + (219.5 - 40) * g;
  const R: [number, number, number, number] = [C[0] - yw, C[1] - yh, C[0] + yw, C[1] + yh];
  const bulanik = p < bo.bas ? 1 : 1 - t01(p, bo.bas + 20, bo.bit, INOUT);
  const icerik = p >= (cam.temas ?? 84);
  const TR: P = [R[2], R[1]], BR: P = [R[2], R[3]], BL: P = [R[0], R[3]];
  const uc = (q: P): P => lp(kaynak, q, uzan);
  // ışınlar: zarf kenarları (mercek→TR, mercek→BL) + yakın kenarlara (alt + sağ) 2.5° iç ışınlar; uçları kenarda biter
  const aTR = Math.atan2(TR[1] - kaynak[1], TR[0] - kaynak[0]), aBL = Math.atan2(BL[1] - kaynak[1], BL[0] - kaynak[0]);
  const icIsin: P[] = [];
  for (let a = Math.min(aTR, aBL) + (2.5 * Math.PI) / 180; a < Math.max(aTR, aBL) - 0.008; a += (2.5 * Math.PI) / 180) {
    const d: P = [Math.cos(a), Math.sin(a)];
    const tAlt = (R[3] - kaynak[1]) / d[1], xAlt = kaynak[0] + d[0] * tAlt;
    if (xAlt >= R[0] && xAlt <= R[2]) { icIsin.push([xAlt, R[3]]); continue; }
    const tSag = (R[2] - kaynak[0]) / d[0];
    icIsin.push([R[2], kaynak[1] + d[1] * tSag]);
  }
  const zarfPts = [kaynak, uc(TR), uc(BR), uc(BL)];
  // memurlar (§4v3.2 tablo): Z 2.6, x 82/344/671/945; baş tepe y 1222 (dik) / 1320 (yazarken); omuz y ≈ 1385
  const xs = mm.konum_dekor_x ?? [82, 344, 671, 945];
  const TIP: BasTip[] = ["daginik", "kel", "ayrik", "daginik2"], BM = [156, 150, 148, 160], DY = [0, 22, -18, 10];
  const bakis = t01(p, du.bas, du.bas + 14) * (1 - t01(p, ya.bas, ya.bas + 10)); // perdeye bakarken baş kalkık
  const memur = xs.map((x0, i) => {
    const yaz = p >= ya.bas && p < ya.bit + 10 ? Math.max(0, Math.sin(((p - ya.bas + i * 5) / 11) * Math.PI)) * (1 - t01(p, ya.bit, ya.bit + 10)) : 0;
    const egim = 12 + i * 4 - 10 * bakis + 6 * yaz; // öne eğik 12–25° (yazarlar)
    let x = x0, tepe = 1222 + DY[i] + (1 - bakis) * 40 + yaz * 8, omuzY = 1385 + DY[i] * 0.6 + yaz * 5;
    if (i === 3 && p >= mk.bas - 4) {
      const kalk = t01(p, mk.bas - 4, mk.bas + 6, INOUT); // kalkar: baş tepe → y 973 (ayakta yetişkin, ufka yakın)
      tepe = tepe + (973 - tepe) * kalk; omuzY = omuzY + (973 + 150 + 30 - omuzY) * kalk;
      x = x0 + 420 * t01(p, mk.bas + 4, mk.bit, (t) => t * t); // sağ kenardan (duvarsız kadraj kenarı) çıkar
    }
    return { x, tepe, omuzY, B: BM[i], tip: TIP[i], egim };
  });
  const memurIsik = lamba && uzan >= 1 ? Math.min(1, 0.45 + (yw - 40) / 200) : 0;
  // C4 (orkestra kararı): perdede baş gölgesi YOK — mercek tüm başların üstünde, huzme hiçbir başı kesmez (maske/gölge kaldırıldı).
  const toz = Array.from({ length: 8 }, (_, i) => {
    const t = 0.35 + rnd(S + 9, `t${i}`) * 0.5, hedef = lp(BL, TR, rnd(S + 9, `x${i}`)), q = lp(kaynak, hedef, t);
    return [q[0] + 10 * Math.sin(p / 40 + i), q[1] - ((p * 0.3 + i * 37) % 40)] as P;
  });
  // cam levha: sağ kenardan gelen el (gri manşet) levhayı lantern üst yüzündeki yuvaya indirir (temas f84) ve çekilir
  const yuva: P = LN.yuva;
  const cT = cam.temas ?? 84;
  const elIn = t01(p, cam.bas - 14, cam.bas - 2, GIRIS), elOut = t01(p, cT + 2, cam.bit + 14, CIKIS);
  const levhaAlt = p < cT ? yuva[1] - 70 * (1 - t01(p, cam.bas - 2, cT, INOUT)) : yuva[1];
  const elUc: P = [yuva[0] + 6 + 460 * (1 - elIn) + 460 * elOut, levhaAlt - 74 - 60 * (1 - elIn) - 40 * elOut];
  const elGor = p >= cam.bas - 14 && p <= cam.bit + 14;
  // bez: tek kapalı yol (üst düz, yanlar dalgalı, alt sarkık + köşe kıvrımları)
  const bezYol = `M92 526 L752 526 Q754 640 751 760 Q749 900 752 1045 Q748 1052 742 1050 Q600 1072 422 1078 Q240 1072 102 1050 Q96 1052 92 1045 Q95 900 93 760 Q90 640 92 526 Z`;
  if (p >= bo.bit) kilit.push({ ad: "perde", p: ekranNokta(k, C), tur: "dokunus" });
  return (
    <g transform={katDonusum(k)}>
      <defs>
        <clipPath id={`${uid}bz`}><path d={bezYol} /></clipPath>
        <clipPath id={`${uid}dv`}><rect x={-200} y={204} width={1033} height={1110} /></clipPath>
        <clipPath id={`${uid}ly`}><rect x={-400} y={-400} width={1900} height={yuva[1] + 400} /></clipPath>
      </defs>
      {/* tavan + korniş */}
      <rect x={-400} y={-400} width={1900} height={2800} fill={LP.duvar} />
      <rect x={-400} y={-400} width={1900} height={463} fill={LP.tavan} />
      {[[63, 120], [120, 170], [170, 204]].map(([a, b], i) => <g key={i}>
        <rect x={-400} y={a} width={1900} height={b - a} fill={i === 1 ? "#34324a" : LP.duvar} />
        <line x1={-400} y1={a} x2={1500} y2={a} stroke={lamba ? LP.halka : "#26243a"} strokeWidth={3} />
      </g>)}
      {[[120, 26], [170, 22], [204, 28]].map(([y, h], i) => <g key={`kt${i}`} stroke={LP.tavan} strokeOpacity={0.8} strokeWidth={3}>
        {Array.from({ length: Math.floor(h / 8) }, (_, j) => <line key={j} x1={-400} y1={y - 4 - j * 8} x2={1500} y2={y - 4 - j * 8} />)}
      </g>)}
      {/* arka duvar: seyrek tek yönlü 60° tarama (halka içinde yok), köşelere doğru sıklaşır */}
      <defs><mask id={`${uid}tm`} maskUnits="userSpaceOnUse" x={-400} y={-400} width={1900} height={2800}>
        <rect x={-400} y={204} width={1900} height={1110} fill="#fff" />
        <rect x={92 - 120} y={526 - 120} width={660 + 240} height={552 + 240} rx={30} fill="#000" />
        <rect x={833} y={370} width={300} height={960} fill="#000" />
      </mask></defs>
      <g mask={`url(#${uid}tm)`}><TaramaCizgi aci={60} kutu={[-60, 204, 1140, 1314]} aralik={(u) => (u < 300 ? 10 : u < 520 ? 10 + ((u - 300) / 220) * 6 : 16)} renk={LP.tavan} kalin={3} alfa={0.55} seed={S + 2} /></g>
      {/* perde çevresi yansıma halkası (2. ton, net kenar) — C3 (eleştiri kritik 1): ölçüsü SABİT (duvardaki yansıma bezi
          çevreler, büyümez); yalnız parlaklığı görüntünün açılmasıyla artar. Görüntü dikdörtgeni R tek büyüyen öğe. */}
      {lamba > 0 && uzan >= 1 && <g clipPath={`url(#${uid}dv)`}><rect x={92 - 120} y={526 - 120} width={660 + 240} height={552 + 240} rx={30} fill={LP.halka} opacity={0.45 + 0.55 * g} /></g>}
      {/* pencere + kapalı iç kepenk (perdenin sağı) */}
      <g>
        <rect x={833} y={370} width={300} height={944} fill={LP.sove} />
        {[[400, 760], [780, 930], [950, 1290]].map(([a, b], i) => <g key={i}>
          <rect x={880} y={a} width={260} height={b - a} fill="#2a2840" stroke={LP.tavan} strokeWidth={3} />
          <rect x={898} y={a + 18} width={224} height={b - a - 36} fill="#2e2c44" stroke="#24223a" strokeWidth={2} />
          <line x1={880} y1={a} x2={880} y2={b} stroke={LP.halka} strokeWidth={2} opacity={lamba} />
          <line x1={898} y1={a + 18} x2={898} y2={b - 18} stroke={LP.halka} strokeWidth={2} opacity={lamba * 0.8} />
          <g stroke={LP.tavan} strokeWidth={2}>{[0, 1, 2].map((j) => <line key={j} x1={902} y1={b - 22 - j * 6} x2={1080} y2={b - 22 - j * 6} />)}</g>
        </g>)}
        <line x1={833} y1={370} x2={833} y2={1314} stroke={lamba ? LP.halka : "#26243a"} strokeWidth={2} />
      </g>
      {/* lambri üst çıtası */}
      <line x1={-400} y1={1314} x2={1500} y2={1314} stroke={LP.halka} strokeWidth={3} />
      <line x1={-400} y1={1326} x2={1500} y2={1326} stroke={LP.tavan} strokeWidth={2} />
      <rect x={-400} y={1328} width={1900} height={700} fill="#29273a" />
      {/* kancalar + asma ipleri + mandal; çıta */}
      <g stroke={LP.halka} strokeWidth={4} strokeLinecap="round" fill="none">
        <line x1={80} y1={214} x2={80} y2={505} /><line x1={764} y1={214} x2={764} y2={505} />
        <path d="M80 214 Q60 640 40 1065" />
      </g>
      <g stroke={LP.kenarSoguk} strokeWidth={1} strokeOpacity={0.5 * lamba}><line x1={82} y1={216} x2={82} y2={505} /><line x1={766} y1={216} x2={766} y2={505} /></g>
      {[[80, 210], [764, 210]].map(([x, y], i) => <path key={i} d={`M${x - 8} ${y} q8 -10 16 0`} stroke={LP.sehpa} strokeWidth={4} fill="none" />)}
      {/* ip mandalı (C3: eski küçük dikdörtgen "elektrik düğmesi" okunuyordu): duvara çakılı ahşap kazık, ip üstüne bir tur sarılıp sarkar */}
      <circle cx={40} cy={1068} r={6} fill={LP.sehpa} stroke={LP.tavan} strokeWidth={2} />
      <path d="M36 1062 q10 2 8 10 q-4 6 -8 2" stroke={LP.halka} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M38 1074 q8 6 2 14 q-8 8 4 20" stroke={LP.halka} strokeWidth={3} fill="none" strokeLinecap="round" />
      <rect x={68} y={505} width={708} height={13} fill={LP.sehpa} />
      <line x1={68} y1={518} x2={776} y2={518} stroke={LP.kenarSoguk} strokeWidth={1} opacity={0.5 * lamba} />
      {/* bez: ışıksız ton + ışıklı görüntü + kıvrımlar + lif; görüntü bezin içinde kırpılır */}
      <path d={bezYol} fill={LP.bez} stroke="#24232f" strokeWidth={2.5} />
      <g clipPath={`url(#${uid}bz)`}>
        {lamba > 0 && uzan >= 1 && <rect x={R[0]} y={R[1]} width={R[2] - R[0]} height={R[3] - R[1]} rx={6} fill={LP.perde} />}
        {lamba > 0 && uzan >= 1 && icerik && <PerdeSayfa r={R} bulanik={bulanik} cizgi={Math.max(2, 4.5 * (yw / 283))} />}
        {[250, 470, 640].map((x, i) => <path key={i} d={`M${x} 528 Q${x + (i - 1) * 4} 800 ${x + 2} 1080`} stroke="#14141c" strokeWidth={2} strokeOpacity={0.1} fill="none" />)}
        {lamba > 0 && uzan >= 1 && [0, 1, 2, 3, 4, 5].map((i) => <line key={`l${i}`} x1={R[0]} x2={R[2]} y1={R[1] + (i + 1) * (R[3] - R[1]) / 7} y2={R[1] + (i + 1) * (R[3] - R[1]) / 7} stroke="#8a8a80" strokeWidth={1} strokeOpacity={0.05} />)}
        <path d="M92 1045 Q98 1030 108 1040" stroke="#24232f" strokeWidth={2} fill="none" /><path d="M752 1045 Q746 1030 736 1040" stroke="#24232f" strokeWidth={2} fill="none" />
      </g>
      {/* memur gövdeleri (huzmenin altında: ışın lantern tarafında, gövdelerin önünden geçer); başlar huzmeden SONRA (opak, ışığı keser) */}
      {memur.map((m, i) => <MemurArka key={i} x={m.x} tepe={m.tepe} B={m.B} tip={m.tip} egim={m.egim} isik={memurIsik} uid={`${uid}m${i}`} omuzY={m.omuzY} sadece="govde" />)}
      {/* sandalye arkalıkları */}
      {memur.slice(0, 3).map((m, i) => <rect key={`s${i}`} x={xs[i] - 0.95 * m.B} y={1660} width={1.9 * m.B} height={300} rx={8} fill="#1f1e2a" stroke={LP.memurKontur} strokeWidth={2.5} />)}
      {p < mk.bas + 6 && <rect x={xs[3] - 0.95 * 160} y={1660} width={1.9 * 160} height={300} rx={8} fill="#1f1e2a" stroke={LP.memurKontur} strokeWidth={2.5} />}
      {p >= mk.bas + 6 && <rect x={xs[3] - 0.95 * 160 + 30} y={1690} width={1.9 * 160} height={300} rx={8} fill="#1f1e2a" stroke={LP.memurKontur} strokeWidth={2.5} />}
      {/* huzme: zarf dolgusu α .10 + iç ışınlar 2 px α .20 + 2 sınır ışını 3 px α .55 + toz (lantern gövdesinin altında) */}
      {lamba > 0 && <g>
        <polygon points={pt(zarfPts)} fill={LP.huzme} fillOpacity={0.1} />
        <g stroke={LP.huzme} strokeWidth={2} strokeOpacity={0.2} strokeLinecap="round">{icIsin.map((q, i) => { const e = uc(q); return <line key={i} x1={kaynak[0]} y1={kaynak[1]} x2={e[0]} y2={e[1]} />; })}</g>
        <g stroke={LP.huzme} strokeWidth={3} strokeOpacity={0.55} strokeLinecap="round">{[TR, BL].map((q, i) => { const e = uc(q); return <line key={i} x1={kaynak[0]} y1={kaynak[1]} x2={e[0]} y2={e[1]} />; })}</g>
        {uzan >= 1 && toz.map((q, i) => <circle key={i} cx={q[0]} cy={q[1]} r={1.5 + (i % 3)} fill={LP.huzme} opacity={0.5} />)}
      </g>}
      {memur.map((m, i) => <MemurArka key={`b${i}`} x={m.x} tepe={m.tepe} B={m.B} tip={m.tip} egim={m.egim} isik={memurIsik} uid={`${uid}mb${i}`} omuzY={m.omuzY} sadece="bas" />)}
      {/* cam levha (yuvaya iner; yuva altında gövde içine girer) */}
      {p >= cam.bas - 14 && <g clipPath={`url(#${uid}ly)`}>
        <rect x={yuva[0] - 36} y={levhaAlt - 84} width={72} height={84} fill="#8a8494" stroke={LP.sehpa} strokeWidth={7} />
        <line x1={yuva[0] - 28} y1={levhaAlt - 76} x2={yuva[0] + 28} y2={levhaAlt - 76} stroke={LP.huzme} strokeWidth={2} opacity={0.5} />
      </g>}
      {/* lantern (C4): yüksek ahşap sehpa üstünde, arkadan-soldan görülen kutu; derinlik kenarları kaçış noktasına (540,960) gider.
          Arka yüz kameraya bakar; mercek borusu ön yüzde (gizli). Ön bacak + sehpa tablası + arka bacak; ayaklar kadraj altında zemine iner. */}
      <g strokeLinejoin="round">
        {/* ön (uzak) sehpa bacağı + kayıt çıtası */}
        <polygon points={pt([LN.sehpaOnBacak[0], [LN.sehpaOnBacak[0][0] + 20, LN.sehpaOnBacak[0][1]], [LN.sehpaOnBacak[1][0] + 20, 1990], [LN.sehpaOnBacak[1][0], 1990]])} fill="#2c251f" stroke={LP.memurKontur} strokeWidth={2.5} />
        <polygon points={pt([[LN.sehpaOnBacak[0][0] + 20, 1640], [LN.bx0 + 4, 1660], [LN.bx0 + 4, 1684], [LN.sehpaOnBacak[0][0] + 20, 1662]])} fill="#2c251f" stroke={LP.memurKontur} strokeWidth={2} />
        {/* sol yüz (derinlik), üst yüz (ince: göz hizasına yakın), arka yüz */}
        <polygon points={pt([[LN.bx0, LN.by0], LN.onSolUst, LN.onSolAlt, [LN.bx0, LN.by1]])} fill="#272a30" stroke={LP.lanternKenar} strokeWidth={3} />
        <polygon points={pt([[LN.bx0, LN.by0], LN.onSolUst, [LN.onSagUstX, LN.onSolUst[1]], [LN.bx1, LN.by0]])} fill="#3a3d44" stroke={LP.lanternKenar} strokeWidth={3} />
        {/* baca (havalandırma şapkalı), sol-arka köşede */}
        <rect x={LN.bacaX} y={LN.bacaY} width={52} height={LN.by0 - LN.bacaY} fill={LP.lantern} stroke={LP.lanternKenar} strokeWidth={3} />
        <rect x={LN.bacaX - 9} y={LN.bacaY - 14} width={70} height={14} fill={LP.lanternKenar} stroke="#1a1a24" strokeWidth={3} />
        <line x1={LN.bacaX} y1={LN.bacaY} x2={LN.bacaX} y2={LN.by0} stroke={LP.kenarSoguk} strokeWidth={2} opacity={0.35 * lamba} />
        {/* yuva (levha ağzı) üst yüzde */}
        <rect x={yuva[0] - 36} y={yuva[1] - 4} width={72} height={8} fill="#1a1a24" />
        <rect x={LN.bx0} y={LN.by0} width={LN.bx1 - LN.bx0} height={LN.by1 - LN.by0} fill={LP.lantern} stroke={LP.lanternKenar} strokeWidth={4} />
        <defs><clipPath id={`${uid}ly2`}><polygon points={pt([[LN.bx0, LN.by0], LN.onSolUst, LN.onSolAlt, [LN.bx0, LN.by1]])} /></clipPath></defs>
        <g clipPath={`url(#${uid}ly2)`}><TaramaCizgi aci={100} kutu={[LN.onSolUst[0], LN.by0, LN.bx0, LN.by1]} aralik={() => 6} renk="#1a1a24" kalin={2} alfa={0.85} seed={S + 5} /></g>
        <rect x={LN.bx0 + 50} y={LN.by0 + 110} width={110} height={130} fill="none" stroke={LP.lanternKenar} strokeWidth={4} />
        {/* havalandırma yarıkları: lamba yanınca içeriden ışık sızar (tek kaynak: lamba) */}
        {[LN.by0 + 34, LN.by0 + 54].map((y, i) => <line key={i} x1={LN.bx0 + 30} y1={y} x2={LN.bx1 - 40} y2={y} stroke={lamba ? LP.huzme : "#1a1a24"} strokeWidth={3} opacity={lamba ? 0.6 : 1} />)}
        {[[LN.bx0 + 16, LN.by0 + 16], [LN.bx0 + 16, LN.by1 - 16]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill={LP.lanternKenar} />)}
        <line x1={LN.bx0} y1={LN.by0} x2={LN.bx1} y2={LN.by0} stroke={LP.kenarSoguk} strokeWidth={2} opacity={0.35 * lamba} />
        <line x1={LN.bx0} y1={LN.by0} x2={LN.bx0} y2={LN.by1} stroke={LP.kenarSoguk} strokeWidth={2} opacity={0.3 * lamba} />
        {/* sehpa tablası (sol yüz + ön kenar) ve arka (yakın) bacak; ayak kadraj altında */}
        <polygon points={pt([[LN.bx0 - 16, LN.by1], [LN.onSolAlt[0] - 14, LN.onSolAlt[1]], [LN.onSolAlt[0] - 14, LN.onSolAlt[1] + 16], [LN.bx0 - 16, LN.by1 + 22]])} fill="#3a3129" stroke={LP.memurKontur} strokeWidth={2} />
        <rect x={LN.bx0 - 16} y={LN.by1} width={1200 - LN.bx0} height={22} fill={LP.sehpa} stroke={LP.memurKontur} strokeWidth={2.5} />
        <rect x={LN.bx0 + 6} y={LN.by1 + 22} width={30} height={1990 - LN.by1} fill={LP.sehpa} stroke={LP.memurKontur} strokeWidth={2.5} />
        <line x1={LN.bx0 + 6} y1={LN.by1 + 24} x2={LN.bx0 + 6} y2={1960} stroke={LP.kenarSoguk} strokeWidth={1.5} opacity={0.25 * lamba} />
        <rect x={LN.bx0 + 36} y={1700} width={1200 - LN.bx0} height={22} fill="#3a3129" stroke={LP.memurKontur} strokeWidth={2} />
      </g>
      {elGor && (() => {
        const bilek: P = [elUc[0] + 150, elUc[1] - 10];
        const kol = konikKol([bilek[0] + 330, bilek[1] + 60], [bilek[0] + 190, bilek[1] + 40], bilek, [110, 92, 62]);
        return <g>
          <path d={kol.d} fill="#34363d" stroke={LP.memurKontur} strokeWidth={3} />
          <GravurEl bilek={bilek} aci={172} E={150} poz={GRAVUR_POZ.kistir} isik={[-0.6, -0.8]} taramaAci={78} palet={{ ...ODA_EL }} />
        </g>;
      })()}
    </g>
  );
};
const ODA_EL: GravurPalet = { isik: "#a89a9a", golge: "#6a5c62", konturYuk: "#3a3036", konturIsik: "#7a6a6e", kenar: "#c4ccbc", tarama: "#4a3c44", manset: "#5d5f63", mansetGolge: "#3e3f44" };

// ================================================================== KAPI görünümü (§4v3.5 + tasarım §15.2) ==================================================================
// Okuyanın baş profili (tasarım §15.2.3; yüz solda, tepe–çene = 1 B). Ekrana: rotate(−24°) [+ boyun/sırt öne eğimi ≈ 28° toplam] + öteleme.
const PROFIL: P[] = [[0.45, 0], [0.24, 0.05], [0.18, 0.2], [0.06, 0.44], [0.08, 0.5], [-0.1, 0.64], [0.01, 0.68], [-0.01, 0.77], [0.03, 0.93], [0.12, 1.0], [0.36, 0.95], [0.58, 0.8], [0.7, 0.9], [0.8, 0.7], [0.84, 0.45], [0.72, 0.13]];
const KapiSahne: React.FC<{ plan: Plan; p: number; uid: string; kilit: SablonProps["kilit"] }> = ({ plan, p, uid, kilit }) => {
  const k = kameraHesapla(plan.kamera, p);
  const zv = ar(plan.parametreler?.zarf_verilir, { bas: 272, bit: 272, kare: 272 });
  const tVer = zv.kare ?? zv.temas ?? 272;
  const za = ar(plan.parametreler?.zarf_acilir, { bas: 276, bit: 296, temas: 290 }), ok = ar(plan.parametreler?.okuma, { bas: 296, bit: 386 }), kp = ar(plan.parametreler?.kapanis, { bas: 386, bit: 398 });
  const me = obj(plan, "memur_eli") as { giris?: Ar; cikis?: Ar };
  const mg = ar(me.giris, { bas: 266, bit: 272 }), mc = ar(me.cikis, { bas: 272, bit: 284 });
  const tAc = za.temas ?? 290;
  const ISIK: P = [0.8, -0.6]; // ekranda ışığa doğru (kapı açıklığı sağ-arka)
  // ---- zaman çizelgesi (kapak f278–tAc; sayfa çıkar tAc−2…tAc+4; açılır tAc+4…tAc+10; uzak el kenara tAc+6…tAc+16) ----
  const kapakT = t01(p, za.bas + 2, tAc, INOUT);
  const cekT = t01(p, tAc - 2, tAc + 4, INOUT), acT = t01(p, tAc + 4, tAc + 10, INOUT);
  const okumaT = p >= ok.bas && p < ok.bit ? (p - ok.bas) / (ok.bit - ok.bas) : 0;
  const kap = t01(p, kp.bas, kp.bit, INOUT);
  const sal = Math.sin(okumaT * Math.PI * 2) * (1 - kap);
  // kâğıt (§15.2.5): sol-üst (270,800) · sağ-üst (470,812) · sağ-alt (470,1155) · sol-alt (270,1170); kapanışta 20 px iner
  const dy = 20 * kap + 2 * sal, dx = 1.5 * sal;
  const K0: [P, P, P, P] = [[270 + dx, 800 + dy], [470 + dx, 812 + dy], [470 + dx, 1155 + dy], [270 + dx, 1170 + dy]];
  const km = dortgen(...K0);
  // zarf: kâğıdın alt yarısıyla aynı düzlemde (196 × 150), kapak tarafı kameraya; memur eli soldan getirir
  const zGel = t01(p, mg.bas, mg.bit, GIRIS);
  const zOff: P = p < tVer ? [-470 * (1 - zGel), 40 * (1 - zGel)] : [0, 0];
  const ZM = dortgen([272 + zOff[0] + dx, 1008 + zOff[1] + dy], [468 + zOff[0] + dx, 1016 + zOff[1] + dy], [468 + zOff[0] + dx, 1152 + zOff[1] + dy], [272 + zOff[0] + dx, 1162 + zOff[1] + dy]);
  // ---- okuyan: baş (profil), boyun, gövde, kollar ----
  const nefes = Math.sin((p - 266) / 50) * 1.5;
  const basRot = -24 + 1.2 * sal + 4 * kap, pivot: P = [706, 760];
  const H = (q: P): P => {
    const r = (-24 * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
    const x = (q[0] * c - q[1] * s) * 240 + 500.45, y = (q[0] * s + q[1] * c) * 240 + 564.92 + nefes;
    const r2 = ((basRot + 24) * Math.PI) / 180, c2 = Math.cos(r2), s2 = Math.sin(r2);
    return [pivot[0] + (x - pivot[0]) * c2 - (y - pivot[1]) * s2, pivot[1] + (x - pivot[0]) * s2 + (y - pivot[1]) * c2];
  };
  const bas = PROFIL.map(H);
  const basYol = (() => {
    const q = bas, n = q.length, f = (v: number) => v.toFixed(1);
    let d = `M${f(q[0][0])} ${f(q[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = q[(i - 1 + n) % n], p1 = q[i], p2 = q[(i + 1) % n], p3 = q[(i + 2) % n];
      const kk = i >= 3 && i <= 9 ? 9 : 6; // yüz önü daha keskin (burun, dudak, çene kırılır)
      d += `C${f(p1[0] + (p2[0] - p0[0]) / kk)} ${f(p1[1] + (p2[1] - p0[1]) / kk)} ${f(p2[0] - (p3[0] - p1[0]) / kk)} ${f(p2[1] - (p3[1] - p1[1]) / kk)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + "Z";
  })();
  // saç: alın saç çizgisi → şakak → kulak önü → (kulak arkası) → ense; kafa arkası kenarı düzensiz 5 tutam (seed 191)
  const sacIc: P[] = [[0.18, 0.2], [0.3, 0.35], [0.4, 0.42], [0.47, 0.6], [0.62, 0.8], [0.7, 0.9]];
  const tutamlar: P[][] = [[0.8, 0.22], [0.86, 0.36], [0.86, 0.5], [0.82, 0.64], [0.76, 0.78]].map(([x, y], i) => {
    const L = 0.03 + rnd(191, i) * 0.025, a = Math.atan2(y - 0.47, x - 0.45) + 0.6 + (rnd(191, `a${i}`) - 0.5) * 0.4;
    return [[x - 0.045 * Math.sin(a) - 0.02 * Math.cos(a), y + 0.045 * Math.cos(a) - 0.02 * Math.sin(a)], [x + Math.cos(a) * L, y + Math.sin(a) * L], [x + 0.045 * Math.sin(a) - 0.02 * Math.cos(a), y - 0.045 * Math.cos(a) - 0.02 * Math.sin(a)]] as P[];
  });
  const sacYol = yk(([...sacIc, [0.84, 0.6], [0.88, 0.45], [0.8, 0.18], [0.6, 0.02], [0.45, -0.01], [0.3, 0.03], [0.2, 0.1]] as P[]).map(H));
  // kulak: kafa silüetinin arka yarısında C-yayı (0.14 × 0.26 B), parlak disk yok
  const kulak = yk(([[0.52, 0.44], [0.6, 0.42], [0.665, 0.48], [0.67, 0.58], [0.64, 0.68], [0.58, 0.7], [0.55, 0.62]] as P[]).map(H));
  const kulakKenar = ([[0.6, 0.42], [0.665, 0.48], [0.67, 0.58], [0.64, 0.68]] as P[]).map(H);
  // kâğıt yansıması: burun altı, dudak, çene, çene altı, yanak alt kenarı
  const yansima = yk(([[0.0, 0.775], [0.035, 0.925], [0.12, 0.995], [0.34, 0.955], [0.3, 0.93], [0.13, 0.95], [0.08, 0.9], [0.05, 0.8]] as P[]).map(H));
  const yansimaKenar = ([[-0.09, 0.655], [0.01, 0.68], [-0.01, 0.77], [0.03, 0.93], [0.12, 1.0]] as P[]).map(H);
  // gövde (§15.2.2): ön kenar x 545@900 → 535@1920; arka kenar x 885@860 → 975@1920; omuz tepe (700,805), 18° iner; sırt 5° kambur
  const boyunOn = H([0.3, 0.98]), ense = H([0.7, 0.9]);
  const govde = `M${boyunOn[0]} ${boyunOn[1] + 18} C${600} ${822} ${560} ${852} ${545} ${900} L${540} ${1400} L${535} ${1960} L${985} ${1960} L${975} ${1600} C${960} ${1200} ${905} ${960} ${885} ${862} C${850} ${838} ${780} ${812} ${ense[0] + 4} ${ense[1] + 30} Z`;
  const yaka = `M${boyunOn[0] - 6} ${boyunOn[1] + 22} C${640} ${790} ${700} ${770} ${ense[0] + 10} ${ense[1] + 4} L${ense[0] + 26} ${ense[1] + 30} C${740} ${800} ${690} ${818} ${648} ${842} C${630} ${852} ${612} ${852} ${boyunOn[0] - 6} ${boyunOn[1] + 22} Z`;
  // ---- kollar (konik, palto rengi; §15.2.4) ----
  // yakın kol (sol): omuz (610,850) → dirsek → bilek; el kâğıdın sağ-alt köşesini tutar (başparmak ön yüzde)
  const elVar = p >= tVer;
  const gelT = t01(p, mg.bas, tVer, GIRIS);
  const yakinBilek: P = elVar ? [446 + dx, 1206 + dy] : lp([600, 1380], [446, 1206], gelT);
  const yakinDirsek: P = elVar ? [668, 1176 + dy * 0.5] : lp([660, 1170], [668, 1176], gelT);
  const yakinKol = konikKol([612, 860], yakinDirsek, yakinBilek, [144, 122, 76]);
  const yakinElAci = elVar ? -124 : -124 + 214 * (1 - gelT); // başta aşağı sarkık (90°), zarfa uzanırken döner
  // C3 (§15.1b b.2): tutuşta başparmak ekranda dikeyden 30° yatık (−120°), kâğıt ön yüzünde; ayna el → bas.a = el açısı − ekran açısı
  const BAS_EKRAN = -128; // eksen −120° + uçtaki 6° bükülme işarete doğru → kökten uca ≈ dikeyden 30–32°
  const yakinPoz = elVar ? { ...GRAVUR_POZ.tutus, bas: { ...GRAVUR_POZ.tutus.bas, a: -124 - BAS_EKRAN } } : GRAVUR_POZ.gevsek;
  // uzak kol (sağ): tAc'ye kadar gövdenin arkasında; kapağı açar → sayfayı çeker → kâğıdın sol kenarını arkadan tutar
  const kapakUc: P = lp(ZM(0.5, 0.0), ZM(0.5, 0.55), 1 - kapakT * 2 < -1 ? -1 : 1);
  const sayfaUst: P = [km(0.5, 0)[0], lp([0, 1010 + dy], [0, 800 + dy], cekT)[1]];
  const uzakHedef: P = (() => {
    // bilek = kıstırılan noktanın 0.46 E yukarısı (el aşağı bakar, başparmak + işaret ucu kıstırır)
    const tepe = ZM(0.5, 0.55 - 1.1 * kapakT), kap: P = [tepe[0] + 4, tepe[1] - 92];
    const bekle: P = [660, 1080], sayfa: P = [sayfaUst[0] + 4, sayfaUst[1] - 84];
    if (p < za.bas) return bekle;
    if (p < za.bas + 6) return lp(bekle, kap, t01(p, za.bas, za.bas + 6, GIRIS));
    if (p < tAc - 2) return kap;
    if (p < tAc + 6) return lp(kap, sayfa, t01(p, tAc - 2, tAc, INOUT));
    const sol: P = [km(0, 0.42)[0] + 40, km(0, 0.42)[1]];
    return lp(sayfa, sol, t01(p, tAc + 6, tAc + 16, INOUT));
  })();
  void kapakUc;
  const uzakGorunur = p >= za.bas;
  // uzak el gösterimi: f<tAc+6 "cimdik" (kapak/sayfa üstü, önde), sonra arkada (yalnız sol kenarı saran parmak uçları)
  const uzakArkada = p >= tAc + 6;
  const kenarSarT = t01(p, tAc + 12, tAc + 18, INOUT);
  // ---- çizim parçaları ----
  const kagitCiz = (alt: number) => {
    // alt: 0 → katlı (yalnız üst yarı), 1 → açık; üst kenar 4 px dalgalı, alt kenar 6 px sarkık (katı levha değil)
    const a0 = km(0, 0), a1 = km(1, 0), m0 = km(0, 0.5), m1 = km(1, 0.5);
    const b0 = lp(m0, km(0, 1), alt), b1 = lp(m1, km(1, 1), alt);
    const ust = `M${a0[0]} ${a0[1]} Q${(a0[0] + a1[0]) / 2 - 30} ${(a0[1] + a1[1]) / 2 - 4} ${(a0[0] + a1[0]) / 2} ${(a0[1] + a1[1]) / 2} Q${(a0[0] + a1[0]) / 2 + 40} ${(a0[1] + a1[1]) / 2 + 4} ${a1[0]} ${a1[1]}`;
    const d = `${ust} L${b1[0]} ${b1[1]} Q${(b0[0] + b1[0]) / 2} ${(b0[1] + b1[1]) / 2 + 6 * alt} ${b0[0]} ${b0[1]} Z`;
    const mm = dortgen(a0, a1, b1, b0);
    return (
      <g>
        <defs><clipPath id={`${uid}kg`}><path d={d} /></clipPath></defs>
        <path d={d} fill={LP.kagitGolge} stroke={LP.paltoKontur} strokeWidth={2.5} strokeLinejoin="round" />
        <g clipPath={`url(#${uid}kg)`}>
          {/* ışığa dönük sağ yarı açık ton (net kenar) */}
          <polygon points={pt([mm(0.46, -0.1), mm(1.1, -0.1), mm(1.1, 1.1), mm(0.42, 1.1)])} fill={LP.kagitIsik} />
          <g stroke={LP.satir} strokeWidth={3} strokeLinecap="round" fill="none">{satirYollari(dortgen(km(0, 0), km(1, 0), km(1, 1), km(0, 1)), S + 40, 12).map((y, i) => <path key={i} d={y} />)}</g>
          {alt > 0.98 && <line x1={m0[0]} y1={m0[1]} x2={m1[0]} y2={m1[1]} stroke={LP.kagitKat} strokeWidth={1.5} />}
        </g>
        <line x1={a1[0] - 1} y1={a1[1]} x2={b1[0] - 1} y2={b1[1]} stroke={LP.sicakKenar} strokeWidth={2} />
      </g>
    );
  };
  const zarfCiz = (
    <g>
      <polygon points={pt([ZM(0, 0), ZM(1, 0), ZM(1, 1), ZM(0, 1)])} fill={LP.zarf} stroke={LP.paltoKontur} strokeWidth={2.5} strokeLinejoin="round" />
      <polygon points={pt([ZM(0.5, -0.02), ZM(1.02, -0.02), ZM(1.02, 1.02), ZM(0.48, 1.02)])} fill={LP.kagitIsik} opacity={0.5} />
      <polyline points={pt([ZM(0, 1), ZM(0.5, 0.52), ZM(1, 1)])} stroke={LP.zarfCizgi} strokeWidth={2} fill="none" />
      {/* kapak: üst kenarda menteşe; kapalı → aşağı üçgen, açık → yukarı (iç yüzü koyu) */}
      {(() => { const tepe = ZM(0.5, 0.55 - 1.1 * kapakT); return <polygon points={pt([ZM(0, 0), ZM(1, 0), tepe])} fill={kapakT > 0.5 ? LP.zarfIc : LP.zarf} stroke={LP.paltoKontur} strokeWidth={2.5} strokeLinejoin="round" />; })()}
    </g>
  );
  const elPalet = undefined;
  const yakinElArka = <GravurEl bilek={yakinKol.ileri(14)} aci={yakinElAci} E={200} poz={yakinPoz} ayna isik={ISIK} taramaAci={78} katman="arka" palet={elPalet} />;
  const yakinElOn = <GravurEl bilek={yakinKol.ileri(14)} aci={yakinElAci} E={200} poz={yakinPoz} ayna isik={ISIK} taramaAci={78} katman="on" palet={elPalet} onMaske />;
  const manset = (kol: ReturnType<typeof konikKol>, w: number) => {
    const a = kol.ileri(-30), b = kol.ileri(-4), c = kol.ileri(14), n = kol.n2;
    const q = (o: P, s: number): P => [o[0] + n[0] * s, o[1] + n[1] * s];
    return <g>
      <polygon points={pt([q(b, w * 0.42), q(c, w * 0.36), q(c, -w * 0.36), q(b, -w * 0.42)])} fill={LP.gomlek} stroke={LP.paltoKontur} strokeWidth={2} />
      <polygon points={pt([q(a, w * 0.52), q(b, w * 0.52), q(b, -w * 0.52), q(a, -w * 0.52)])} fill={LP.palto} stroke={LP.paltoKontur} strokeWidth={2} />
    </g>;
  };
  // uzak kol: omuz gövde arkasında (790, 880) → hedef
  const uzakBilek: P = uzakHedef;
  const uzakOmuz: P = [800, 880];
  const uzakDirsek: P = lp(uzakOmuz, uzakBilek, 0.5).map((v, i) => v + (i ? 60 : 10)) as P;
  const uzakKol = konikKol(uzakOmuz, uzakDirsek, uzakBilek, [130, 110, 70]);
  const uzakElAci = uzakArkada ? 175 : 96;
  // memur eli (soldan, gri manşet; zarfın sol kenarını kıstırır)
  const memurGor = p >= mg.bas && p <= mc.bit;
  const memurBilek: P = p < tVer ? [ZM(0, 0.5)[0] - 70, ZM(0, 0.5)[1] + 10] : lp([ZM(0, 0.5)[0] - 70, ZM(0, 0.5)[1] + 10], [-420, 1120], t01(p, mc.bas, mc.bit, CIKIS));
  const memurKol = konikKol([memurBilek[0] - 420, memurBilek[1] + 110], [memurBilek[0] - 230, memurBilek[1] + 56], memurBilek, [150, 124, 78]);
  kilit.push({ ad: "kâğıt", p: ekranNokta(k, km(0.5, 0.5)), tur: "dokunus" });
  kilit.push({ ad: "okuyan el", p: ekranNokta(k, yakinBilek), tur: "dokunus" });
  const kagitOnde = p >= tAc + 4; // sayfa zarftan tamamen çıktı → zarfın önüne alınır
  const kagitVar = p >= tAc - 2;
  return (
    <g transform={katDonusum(k)}>
      <defs>
        <clipPath id={`${uid}ac`}><rect x={497} y={508} width={700} height={944} /></clipPath>
        <clipPath id={`${uid}gv`}><path d={govde} /></clipPath>
        <clipPath id={`${uid}ku`}><path d={yakinKol.d} /></clipPath>
        <clipPath id={`${uid}zu`}><rect x={-400} y={-400} width={1900} height={ZM(0.5, 0)[1] + 400} /></clipPath>
        <mask id={`${uid}dm`} maskUnits="userSpaceOnUse" x={-400} y={-400} width={1900} height={2800}>
          <rect x={-400} y={-400} width={837} height={1927} fill="#fff" />
          <rect x={437} y={-400} width={800} height={756} fill="#fff" />
          <rect x={230} y={760} width={280} height={450} rx={10} fill="#000" />
        </mask>
      </defs>
      {/* oda duvarı (kapının solu) + perde yönünden soğuk yansıma basamağı + 60° seyrek tarama (kâğıt çevresi 40 px boş) */}
      <rect x={-400} y={-400} width={1900} height={2800} fill={LP.duvar} />
      <rect x={-400} y={-400} width={510} height={1927} fill={LP.sogukBasamak} />
      <g mask={`url(#${uid}dm)`}><TaramaCizgi aci={60} kutu={[-40, -40, 1120, 1100]} aralik={(u) => (u < 260 ? 11 : u < 460 ? 11 + ((u - 260) / 200) * 5 : 16)} renk={LP.tavan} kalin={3} alfa={0.55} seed={S + 21} /></g>
      {/* lambri */}
      <rect x={-400} y={1096} width={836} height={431} fill={LP.lambri} />
      <line x1={-400} y1={1096} x2={436} y2={1096} stroke={LP.halka} strokeWidth={5} />
      <line x1={-400} y1={1106} x2={436} y2={1106} stroke={LP.tavan} strokeWidth={2} />
      {[[30, 200], [230, 410]].map(([a, b], i) => <g key={i}>
        <rect x={a} y={1130} width={b - a} height={360} fill="none" stroke={LP.halka} strokeWidth={3} />
        <rect x={a + 3} y={1133} width={b - a - 6} height={354} fill="none" stroke={LP.tavan} strokeWidth={2} />
        <g stroke={LP.sove} strokeWidth={2}>{[0, 1, 2].map((j) => <line key={j} x1={a + 6} x2={b - 6} y1={1480 - j * 6} y2={1480 - j * 6} />)}</g>
      </g>)}
      {/* kapı açıklığı: koridor karşı duvarı (gölgede sıcak gri) + güneş lekesi + pencere kası gölgeleri; zemin; bekleyenler */}
      <g clipPath={`url(#${uid}ac)`}>
        <rect x={497} y={508} width={700} height={747} fill={LP.soveIc} />
        <TaramaCizgi aci={75} kutu={[497, 508, 1100, 1255]} aralik={() => 9} renk={LP.koridorTarama} kalin={2} alfa={0.6} seed={S + 23} />
        <polygon points={pt([[560, 560], [1100, 552], [1100, 1180], [560, 1180]])} fill={LP.koridor} />
        <polygon points={pt([[560, 594], [1100, 552], [1100, 566], [560, 608]])} fill={LP.soveIc} />
        <rect x={838} y={556} width={18} height={624} fill={LP.soveIc} />
        <rect x={497} y={1255} width={700} height={200} fill={LP.tasZemin} />
        <polygon points={pt([[860, 1255], [1100, 1255], [1100, 1452], [940, 1452]])} fill={LP.gunSerit} />
        {[[700, 1255], [860, 1255], [1020, 1255]].map(([x, y], i) => { const t = (1452 - y) / (y - 960); return <line key={i} x1={x} y1={y} x2={x + (x - 540) * t} y2={1452} stroke={LP.koridorTarama} strokeWidth={2} />; })}
        <SiluetFigur kod="yetiskin-a" ayak={[1052, 1290]} pxm={250} renk="#4a4560" kenar={{ renk: LP.sicakKenar, dx: 2 }} yon={-1} />
        <SiluetFigur kod="yetiskin-a" ayak={[947, 1311]} pxm={281} renk={LP.palto} kenar={{ renk: LP.sicakKenar, dx: 2 }} yon={-1} />
      </g>
      {/* soffit (lento alt yüzü, yatay tarama) + pervaz başlığı */}
      <rect x={490} y={438} width={700} height={70} fill={LP.soffit} />
      <g stroke={LP.sove} strokeOpacity={0.8} strokeWidth={3}>{Array.from({ length: 10 }, (_, j) => <line key={j} x1={490} x2={1190} y1={442 + j * 7} y2={442 + j * 7} />)}</g>
      <rect x={400} y={356} width={800} height={82} fill={LP.sove} />
      <line x1={400} y1={436} x2={1200} y2={436} stroke={LP.tavan} strokeWidth={3} />
      <line x1={400} y1={360} x2={1200} y2={360} stroke={LP.halka} strokeWidth={2} />
      {/* eşik + oda döşemesi + kapı ışığı havuzu (iki ton, net kenar) + okuyanın gölgesi */}
      <rect x={490} y={1452} width={700} height={75} fill={LP.esik} />
      <line x1={490} y1={1453} x2={1190} y2={1453} stroke={LP.yansimaKenar} strokeWidth={2} />
      <rect x={-400} y={1527} width={1900} height={500} fill={LP.duvar} />
      <polygon points={pt([[497, 1527], [1190, 1527], [1190, 1960], [160, 1960]])} fill={LP.havuzDis} />
      <polygon points={pt([[560, 1527], [1190, 1527], [1190, 1960], [330, 1960]])} fill={LP.havuzIc} />
      {[[-200, 1527], [120, 1527], [380, 1527]].map(([x, y], i) => { const t = (1960 - y) / (y - 960); return <line key={i} x1={x} y1={y} x2={x + (x - 540) * t} y2={1960} stroke={LP.tavan} strokeWidth={2} strokeOpacity={0.7} />; })}
      <polygon points={pt([[600, 1527], [880, 1527], [560, 1960], [180, 1960]])} fill={LP.sove} />
      {/* sol pervaz (3 düşey fitil) + kanat kenarı + söve iç yüzü (sıcak kenar ışığı) */}
      <rect x={436} y={438} width={54} height={1089} fill={LP.sove} />
      <g>{[448, 462, 476].map((x, i) => <g key={i}><line x1={x} y1={440} x2={x} y2={1527} stroke={LP.tavan} strokeWidth={2} /><line x1={x + 2} y1={440} x2={x + 2} y2={1527} stroke={LP.halka} strokeWidth={1} /></g>)}</g>
      <rect x={484} y={438} width={8} height={1089} fill="#24223a" />
      <line x1={491} y1={438} x2={491} y2={1527} stroke={LP.soveIc} strokeWidth={2} />
      <rect x={490} y={508} width={7} height={944} fill={LP.soveIc} />
      {/* ---- okuyan (katman sırası §15.2.5) ---- */}
      {/* uzak kol (gövde ve kâğıt arkasında) */}
      {uzakGorunur && <path d={uzakKol.d} fill={LP.palto} stroke={LP.paltoKontur} strokeWidth={3.5} strokeLinejoin="round" />}
            {/* gövde + tarama (gölge tarafı = sol/ön üçte bir) + ışık şeridi (omuz/sırt) */}
      <path d={govde} fill={LP.palto} stroke={LP.paltoKontur} strokeWidth={3.5} strokeLinejoin="round" />
      <g clipPath={`url(#${uid}gv)`}>
        <polygon points={pt([[520, 840], [690, 870], [650, 1960], [500, 1960]])} fill={LP.paltoTarama} fillOpacity={0.35} />
        <TaramaCizgi aci={78} kutu={[520, 840, 700, 1960]} aralik={() => 6} renk={LP.paltoTarama} kalin={2} alfa={1} seed={S + 25} />
        <path d={`M${ense[0] + 4} ${ense[1] + 30} C${780} ${812} ${850} ${838} ${885} ${862} C${900} ${940} ${920} ${1010} ${930} ${1080}`} stroke={LP.paltoIsik} strokeWidth={14} fill="none" />
        <line x1={620} y1={980} x2={600} y2={1920} stroke={LP.paltoKontur} strokeWidth={2} />
      </g>
      {[[[ense[0] + 8, ense[1] + 30], [790, 818]], [[808, 826], [870, 852]], [[888, 870], [902, 960]], [[906, 980], [916, 1060]]].map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={LP.sicakKenar} strokeWidth={3} strokeLinecap="round" />)}
      {/* ense + yaka */}
      <path d={`M${boyunOn[0] - 4} ${boyunOn[1] - 4} L${ense[0] - 6} ${ense[1] - 6} L${ense[0] + 8} ${ense[1] + 36} L${boyunOn[0] + 4} ${boyunOn[1] + 30} Z`} fill={LP.basTen} />
      <path d={yaka} fill={LP.palto} stroke={LP.paltoKontur} strokeWidth={3} strokeLinejoin="round" />
      <line x1={ense[0] + 12} y1={ense[1] + 8} x2={ense[0] + 24} y2={ense[1] + 28} stroke={LP.sicakKenar} strokeWidth={3} strokeLinecap="round" />
      {/* baş: ten (kontrajur) + kâğıt yansıması + saç + kulak + sıcak kenar ışığı + kontur */}
      <defs><clipPath id={`${uid}bs`}><path d={basYol} /></clipPath></defs>
      <path d={basYol} fill={LP.basTen} />
      <g clipPath={`url(#${uid}bs)`}>
        <path d={yansima} fill={LP.yansima} />
        <path d={sacYol} fill={LP.sacK} />
      </g>
      {tutamlar.map((t, i) => <polygon key={i} points={pt(t.map(H))} fill={LP.sacK} />)}
      <path d={basYol} fill="none" stroke={LP.paltoKontur} strokeWidth={3.5} strokeLinejoin="round" />
      <polyline points={pt(yansimaKenar)} stroke={LP.yansimaKenar} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={kulak} fill={LP.basTen} stroke={LP.sacK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={`M${H([0.585, 0.48])[0]} ${H([0.585, 0.48])[1]} Q${H([0.63, 0.55])[0]} ${H([0.63, 0.55])[1]} ${H([0.6, 0.64])[0]} ${H([0.6, 0.64])[1]}`} stroke={LP.sacK} strokeWidth={1.5} fill="none" />
      <polyline points={pt(kulakKenar)} stroke={LP.sicakKenar} strokeWidth={3} fill="none" strokeLinecap="round" />
      {[[[0.86, 0.36], [0.87, 0.47]], [[0.84, 0.56], [0.8, 0.68]], [[0.74, 0.82], [0.7, 0.9]], [[0.62, 0.06], [0.74, 0.14]]].map(([a, b], i) => { const A = H(a as P), Bq = H(b as P); return <line key={i} x1={A[0] + 2} y1={A[1]} x2={Bq[0] + 2} y2={Bq[1]} stroke={LP.sicakKenar} strokeWidth={3} strokeLinecap="round" />; })}
      {tutamlar.map((t, i) => { const u = H(t[1]); return i % 2 === 0 ? <circle key={`u${i}`} cx={u[0] + 1} cy={u[1]} r={1.6} fill={LP.sicakKenar} /> : null; })}
      {/* zarf / kâğıt / eller (kâğıt arkası koyu duvar ve pervaz) */}
      {memurGor && <g><path d={memurKol.d} fill={LP.memur} stroke={LP.memurKontur} strokeWidth={3} />{manset(memurKol, 78)}</g>}
      {elVar && !kagitOnde && yakinElArka}
      {kagitVar && !kagitOnde && <g clipPath={`url(#${uid}zu)`}>{kagitCiz(0)}</g>}
      {(p >= mg.bas) && zarfCiz}
      {memurGor && <GravurEl bilek={memurKol.ileri(14)} aci={-4} E={190} poz={GRAVUR_POZ.kistir} isik={ISIK} taramaAci={78} />}
      {elVar && kagitOnde && yakinElArka}
      {kagitOnde && kagitCiz(acT)}
      {/* uzak el önde: kapak ucu / sayfa üstü (cimdik) */}
      {uzakGorunur && !uzakArkada && <GravurEl bilek={uzakKol.ileri(14)} aci={uzakElAci} E={190} poz={GRAVUR_POZ.cimdik} isik={ISIK} taramaAci={78} />}
      {/* uzak el arkada: sol kenarı saran parmak uçları (işaret/orta/yüzük) ön yüzde */}
      {uzakArkada && kenarSarT > 0 && (() => {
        // kâğıdın arkasından sol kenarı saran el: kenar dışında parmak sırtı (orta boğumlar) + ön yüzde 3 parmak ucu (gravür eli)
        const L = 22 * kenarSarT, uclar = [0.36, 0.43, 0.5].map((v) => km(0, v));
        const disYol = `M${uclar[0][0]} ${uclar[0][1] - 13} C${uclar[0][0] - 20 * kenarSarT} ${uclar[0][1] - 12} ${uclar[2][0] - 24 * kenarSarT} ${uclar[2][1] - 6} ${uclar[2][0] - 18 * kenarSarT} ${uclar[2][1] + 12} L${uclar[2][0]} ${uclar[2][1] + 12} Z`;
        return <g>
          <path d={disYol} fill="#8f7360" stroke="#5a4438" strokeWidth={3} strokeLinejoin="round" />
          {uclar.map((a, i) => {
            const w = 15 - i;
            const d = `M${a[0] - 2} ${a[1] - w / 2} L${a[0] + L - w / 2} ${a[1] - w / 2 + 1} A${w / 2} ${w / 2} 0 0 1 ${a[0] + L - w / 2} ${a[1] + w / 2 - 1} L${a[0] - 2} ${a[1] + w / 2} Z`;
            return <g key={i}>
              <path d={d} fill="#d6b49c" stroke="#5a4438" strokeWidth={2} strokeLinejoin="round" transform="translate(-1.2 1.2)" />
              <path d={d} fill="#d6b49c" stroke="#a8836c" strokeWidth={1.3} strokeLinejoin="round" />
              <path d={`M${a[0] + L - w * 0.9} ${a[1] - w / 2 + 2} q${w * 0.3} ${w * 0.4} 0 ${w - 4}`} stroke="#a8836c" strokeWidth={1.2} fill="none" />
            </g>;
          })}
        </g>;
      })()}
      {/* yakın kol (önde) + manşet + el ön katmanı (başparmak ön yüzde) + temas gölgesi */}
      <path d={yakinKol.d} fill={LP.palto} />
      <g clipPath={`url(#${uid}ku)`}>
        <polygon points={pt([[yakinDirsek[0] - 140, yakinDirsek[1] + 6], [yakinDirsek[0] + 90, yakinDirsek[1] - 30], [yakinDirsek[0] + 90, yakinDirsek[1] + 120], [yakinDirsek[0] - 220, yakinDirsek[1] + 120]])} fill={LP.paltoTarama} fillOpacity={0.35} />
        <TaramaCizgi aci={78} kutu={[yakinBilek[0] - 40, yakinDirsek[1] - 10, yakinDirsek[0] + 90, yakinDirsek[1] + 90]} aralik={() => 6} renk={LP.paltoTarama} kalin={2} alfa={1} seed={S + 27} />
        <path d={`M${612} ${790} C${700} ${800} ${730} ${1000} ${yakinDirsek[0] + 60} ${yakinDirsek[1] - 10}`} stroke={LP.paltoIsik} strokeWidth={14} fill="none" />
      </g>
      <path d={yakinKol.kenar} fill="none" stroke={LP.paltoKontur} strokeWidth={3.5} strokeLinejoin="round" />
      <path d={`M${yakinDirsek[0] + 40} ${yakinDirsek[1] - 4} q-30 16 -60 10`} stroke={LP.paltoKontur} strokeWidth={2} fill="none" />
      {manset(yakinKol, 76)}
      {elVar && <g opacity={0.35}><GravurEl bilek={yakinKol.ileri(14)} aci={yakinElAci} E={200} poz={yakinPoz} ayna isik={ISIK} taramaAci={78} katman="on" golge="#3e342a" golgeKay={[-8, 8]} /></g>}
      {elVar ? yakinElOn : <GravurEl bilek={yakinKol.ileri(14)} aci={yakinElAci} E={200} poz={yakinPoz} ayna isik={ISIK} taramaAci={78} />}
    </g>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const uid = "lo" + useId().replace(/:/g, "");
  const gor = param<string>(plan, "gorunum", "oda");
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>{gor === "kapi" ? <KapiSahne plan={plan} p={p} uid={uid} kilit={kilit} /> : <OdaSahne plan={plan} p={p} uid={uid} kilit={kilit} />}</RenkKaydi>
    </svg>
  );
};
export const LANTERN_ODA: Sablon = { Sahne, arsiv: () => "geceLapis" };
