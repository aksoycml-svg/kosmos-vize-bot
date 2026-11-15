// ===== HARITA `harita_gorunum: "paris-cevre"` (KE-PK-H1/H2/H3/H5, F1; mekanlar.md §5H) =====
// Tek kâğıt (kit parşömeni) üstünde 1870 kuşatma planı gravürü (GravurArazi) + kukla tiyatrosu parçaları:
//  KusatmaHalkasi  halka {merkez, yaricap, isaret_sayisi, isaret{boyut_px, aci_sapma_derece}, bas, son_isaret_oturur, kalici}
//  TelgrafTeli     telgraf_teli {kopma_noktasi, kopma_kare, uc_sonum{bas,bit}, tel_kalinlik_px, uc_boy_px}; yoksa `tel_kopuk` (vars. true) = kopuk dinlenme hâli
//  KagitKalabalik  kalabalik {bas, bit, sayi, boy_px, bant_r, bosluk} (menteşeyle kalkış) | kalabalik_hazir N ya da {sayi, boy_px, bant_r, bosluk} (vars. halka.kalici ? 40 : 0)
//  P03B            balon_izi {bas,bit} · ruzgar_cizgileri {bas,bit} · geri_ok {ciz, suprulur} · yazi_yigini {bas, baslangic, carpma_nokta, carpma}
//  P04A            kumes_ikon {konum, ciz{bas,bit}} · guvercin_cizgisi {bas, bit, baslangic}
//  P11A            kus_cizgileri {baslangic_dekor, t_dur, varan_no, varis_kare, dur_kare} · serit_yagmuru {bas, adet, yigin_merkez, yigin_px, ilk_inis, son_firlatma, son_inis}
// Fiziksel giriş/çıkış (§5H.6): fade yok — parçalar kadraj dışından kayar, kâğıttan kalkar, mürekkep kendini çizer, rüzgârla kenardan çıkar.
// Işık tek kaynak: masa ışığı KB → gölge GD (+5,+6) α .22; havadaki parçada ofset büyür (§5H.4).
import React from "react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import type { KilitNokta } from "../../../doku/GuvenliAlan";
import { SiluetFigur, SiluetKod, siluetBoy } from "../../props/paris/SiluetFigur";
import type { Plan } from "../../tipler";
import { param } from "../../ortak";
import { cl, ekranNokta, KameraDurum } from "../../zaman";
import { egri, icinde, kumulatif, mesafe, noktaS, parca, Pt, rng, yay, yolD } from "./cizgi";
import { AGACLAR, CITE, FORTLAR, fortYol, KOPMA, NEHIR_D, nehreUzak, PK, SEED, SU_CIZGI, SUR, SUR_D, TARAMA, TEL_K } from "./parisCevreVeri";
import { BalonIkon, Golgeli, KumesIkon, KusIkon, SeritIkon, YiginIkon } from "./ikonlar";

type Halka = { merkez?: Pt; yaricap?: number; isaret_sayisi?: number; isaret?: { boyut_px?: [number, number]; aci_sapma_derece?: number }; bas?: number; son_isaret_oturur?: number; kalici?: boolean };
const t01 = (p: number, a: number, b: number, e: (x: number) => number = (x) => x) => e(interpolate(p, [a, b], [0, 1], cl));
const OUT3 = Easing.out(Easing.cubic);
const SIN = Easing.inOut(Easing.sin);
// mürekkep çizgisi (kit rota dili): alt iz +6 px α .15 + net çizgi
const Murekkep: React.FC<{ d: string; w: number; renk?: string; dash?: string; kapak?: "round" | "butt" }> = ({ d, w, renk = PK.murekkep, dash, kapak = "round" }) => (
  <g fill="none" strokeLinecap={kapak} strokeLinejoin="round">
    <path d={d} stroke={renk} strokeWidth={w + 6} opacity={0.15} strokeDasharray={dash} />
    <path d={d} stroke={renk} strokeWidth={w} strokeDasharray={dash} />
  </g>
);

// ================= GravurArazi =================
const GravurArazi: React.FC = () => (
  <g>
    <rect x={-600} y={-700} width={2280} height={3320} fill={PK.arazi} opacity={0.45} style={{ mixBlendMode: "multiply" }} />
    <path d={SUR_D.dolgu} fill={PK.surIci} opacity={0.4} />
    {/* tepe taraması (hachure) + orman işaretleri */}
    <g stroke={PK.tarama} strokeLinecap="round">{TARAMA.map((h, i) => <line key={i} x1={h.a[0]} y1={h.a[1]} x2={h.b[0]} y2={h.b[1]} strokeWidth={h.w} />)}</g>
    <g stroke={PK.tarama} strokeWidth={2.5} fill="none" strokeLinecap="round">{AGACLAR.map((q, i) => <g key={i}><circle cx={q[0]} cy={q[1]} r={3.5} /><line x1={q[0] + 2} y1={q[1] + 5.5} x2={q[0] + 6} y2={q[1] + 3} /></g>)}</g>
    {/* nehirler: çift kıyı (3 px) + dolgu + su çizgileri */}
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={NEHIR_D.seine} stroke={PK.kontur} strokeWidth={26} /><path d={NEHIR_D.seine} stroke={PK.nehir} strokeWidth={20} />
      <path d={NEHIR_D.marne} stroke={PK.kontur} strokeWidth={18} /><path d={NEHIR_D.marne} stroke={PK.nehir} strokeWidth={12} />
      {SU_CIZGI.map((s, i) => <path key={i} d={s.d} stroke={PK.su} strokeWidth={2.5} strokeDasharray={s.dash} strokeLinecap="butt" />)}
    </g>
    <ellipse cx={CITE.c[0]} cy={CITE.c[1]} rx={CITE.rx} ry={CITE.ry} transform={`rotate(${CITE.aci} ${CITE.c[0]} ${CITE.c[1]})`} fill={PK.surIci} stroke={PK.kontur} strokeWidth={2.5} />
    {/* sur: bastiyon izi (dış zigzag 5 px, iç rampart 2.5 px) — iki geçişli mürekkep */}
    <Murekkep d={SUR_D.dis} w={5} renk={PK.kontur} />
    <path d={SUR_D.ic} fill="none" stroke={PK.kontur} strokeWidth={2.5} />
    {/* fortlar: bastiyonlu beşgen + içte gölge yüzünde 3 tarama (135°) */}
    {FORTLAR.map(([ad, c], i) => {
      const cap = ad === "Mont-Valérien" ? 34 : 26, s = cap / 26;
      return <g key={ad}>
        <path d={fortYol(c, cap, SEED + 40 + i)} fill={PK.arazi} stroke={PK.kontur} strokeWidth={3.5} strokeLinejoin="round" />
        <g stroke={PK.kontur} strokeWidth={2.5} strokeLinecap="round">{[-4, 1, 6].map((o, j) => <line key={j} x1={c[0] + (o - 3) * s} y1={c[1] + (o + 3) * s} x2={c[0] + (o + 3) * s} y2={c[1] + (o - 3) * s} />)}</g>
      </g>;
    })}
  </g>
);

// ================= KusatmaHalkasi =================
type Isaret = { th: number; rot: number; bas: number; otur: number; son: boolean };
const halkaDuzen = (c: Pt, R: number, n: number, kopma: Pt, bas: number, sonOtur: number, sapma: number) => {
  const r = rng(SEED + 50), th0 = Math.atan2(kopma[1] - c[1], kopma[0] - c[0]), step = (Math.PI * 2) / n;
  const tau = Math.PI * 2, nrm = (a: number) => ((a % tau) + tau) % tau, th0n = nrm(th0), guney = Math.PI / 2;
  const ham = Array.from({ length: n }, (_, k) => ({ k, th: th0 + k * step + (k > 0 ? (r() - 0.5) * 2 * 0.12 * step : 0), rot: (r() - 0.5) * 2 * sapma }));
  // iki kol güneyden: saat yönü (ekran) kolu güney → KB boşluğu; ters kol güney → doğu → kuzey → KB boşluğu
  const cw = ham.filter((m) => m.k > 0 && nrm(m.th) >= guney && nrm(m.th) < th0n).sort((a, b) => nrm(a.th) - nrm(b.th));
  const ccw = ham.filter((m) => m.k > 0 && !(nrm(m.th) >= guney && nrm(m.th) < th0n)).sort((a, b) => nrm(guney - a.th) - nrm(guney - b.th));
  const sira = [...cw.map((m, i) => ({ m, f: (i + 0.5) / cw.length })), ...ccw.map((m, i) => ({ m, f: (i + 0.5) / ccw.length }))].sort((a, b) => a.f - b.f);
  const out: Isaret[] = ham.map((m) => ({ th: m.th, rot: m.rot, bas: 0, otur: 0, son: m.k === 0 }));
  sira.forEach(({ m }, j) => { out[m.k].bas = bas + 4 * j; out[m.k].otur = bas + 4 * j + 26; });
  out[0].bas = sonOtur - 20; out[0].otur = sonOtur;
  return out;
};
const KusatmaHalkasi: React.FC<{ h: Halka; p: number; tel: TelGeo; baski?: number }> = ({ h, p, tel, baski }) => {
  const c = h.merkez ?? [540, 900], R = h.yaricap ?? 430, n = h.isaret_sayisi ?? 22, [bw, bh] = h.isaret?.boyut_px ?? [32, 16];
  const animasyon = h.bas !== undefined; // bas yoksa kalıcı (kapanmış) hâl
  const sonOtur = h.son_isaret_oturur ?? 132, bas = h.bas ?? 8;
  const M = halkaDuzen(c, R, n, KOPMA, bas, sonOtur, ((h.isaret?.aci_sapma_derece ?? 6) * Math.PI) / 180);
  const pp = animasyon ? p : 1e6;
  // açısal sırada komşu yaylar: ikisi de oturunca 6 karede, önce oturandan sonrakine doğru çizilir; son boşluğun iki yayı f(son−6)…(son+4)
  const sirali = M.map((m, i) => ({ ...m, i })).sort((a, b) => a.th - b.th);
  const yaylar = sirali.map((a, j) => {
    const b = sirali[(j + 1) % sirali.length];
    const thB = b.th + (j + 1 === sirali.length ? Math.PI * 2 : 0);
    const sonluk = a.son || b.son;
    const t0 = sonluk ? sonOtur - 6 : Math.max(a.otur, b.otur), t1 = sonluk ? sonOtur + 4 : t0 + 6;
    const ileri = sonluk ? !a.son : a.otur <= b.otur; // son işarete doğru çizilir
    const [s, e] = ileri ? [a.th, thB] : [thB, a.th];
    const pt = (t: number): Pt => [c[0] + Math.cos(t) * R, c[1] + Math.sin(t) * R];
    const d = `M${pt(s).join(",")} A ${R} ${R} 0 0 ${e > s ? 1 : 0} ${pt(e).join(",")}`;
    return { d, q: t01(pp, t0, t1, Easing.inOut(Easing.quad)) };
  });
  return (
    <g>
      <g fill="none" stroke={PK.halka} strokeLinecap="round">
        {yaylar.map((y, i) => y.q > 0 && <g key={i}>
          <path d={y.d} strokeWidth={18} opacity={0.15} pathLength={1} strokeDasharray={`${y.q} 2`} />
          <path d={y.d} strokeWidth={12} pathLength={1} strokeDasharray={`${y.q} 2`} />
        </g>)}
      </g>
      {M.map((m, i) => {
        if (pp < m.bas) return null;
        let x: number, y: number;
        const tan = (m.th * 180) / Math.PI + 90 + (m.rot * 180) / Math.PI;
        if (m.son) {
          // son işaret: kadrajın sol-üstünden telin üstünde kayar (boncuk gibi), kopma noktasına oturur
          const q = t01(pp, m.bas, m.otur, OUT3);
          const s = tel.sKopma + (1 - q) * 720, v = baski ?? 0;
          [x, y] = noktaS(tel.duz, tel.c, s).p;
          x += BASKI_YON[0] * v; y += BASKI_YON[1] * v;
        } else {
          const rr = R + (1150 - R) * (1 - t01(pp, m.bas, m.otur, OUT3));
          x = c[0] + Math.cos(m.th) * rr; y = c[1] + Math.sin(m.th) * rr;
        }
        const ez = pp >= m.otur && pp < m.otur + 3 ? 1 - (pp - m.otur) / 3 : 0; // oturma ezilmesi 1.12 → 1 (3 kare)
        const sx = 1 + 0.12 * ez, sy = 1 - 0.12 * ez;
        return <g key={i}>
          <rect x={-bw / 2} y={-bh / 2} width={bw} height={bh} transform={`translate(${x + 5},${y + 6}) rotate(${tan}) scale(${sx},${sy})`} fill={PK.kontur} opacity={0.22} />
          <rect x={-bw / 2} y={-bh / 2} width={bw} height={bh} transform={`translate(${x},${y}) rotate(${tan}) scale(${sx},${sy})`} fill={PK.isaret} stroke={PK.halka} strokeWidth={3} strokeLinejoin="round" />
        </g>;
      })}
    </g>
  );
};

// ================= TelgrafTeli =================
// H2 (eleştiri #1 "baston"): kopan uçlar kıvrılmaz. Her uç çapasından (direk) ≤ 80 px düz uzanır, θ0 ≤ 20° sönümlü salınır, uçta 3 kısa
// çatallı lifle (kopuk tel) biter; iki uç arası ≥ 60 px boşluk (kopmada uçlar geri teper: boşluk 0 → 2·UC_BOSLUK, 6 kare).
// Kopmadan önce son işaret teli bastırır (son_isaret_oturur → kopma): tel kopma noktasında içe (halka merkezine) V çizer, son 4 karede titrer.
type TelGeo = { duz: Pt[]; c: number[]; sKopma: number; direkler: number[] };
const UC_BOSLUK = 50, UC_MAX = 80, CAPA = UC_BOSLUK + 75; // çapa kopmadan 125 px (uç 75 px + yarım boşluk; lifler dahil uçlar arası ≥ 66 dekor px)
const TEL: TelGeo = (() => {
  const duz = egri(TEL_K, false, 3);
  // Catmull-Rom köşeleri yumuşatır; kopma noktasının yay uzunluğu en yakın örnekten
  const c = kumulatif(duz);
  let sK = 0, dmin = 1e9;
  duz.forEach((q, i) => { const d = mesafe(q, KOPMA); if (d < dmin) { dmin = d; sK = c[i]; } });
  const direkler: number[] = [];
  for (let s = sK - CAPA; s > 30; s -= 120) direkler.unshift(s);
  for (let s = sK + CAPA; s < c[c.length - 1]; s += 120) direkler.push(s);
  return { duz, c, sKopma: sK, direkler };
})();
// bastırma vektörü: kopma noktasında halka merkezine doğru (son işaret ringi sıkıştırır); kopmada 3 karede geri
// S: tel kopmada halka merkezine neredeyse paralel uzanıyordu → merkez yönlü V tel boyunca kayıp görünmüyordu. Artık telin NORMALİ
// (merkez tarafı): V tele dik çentik olarak okunur.
const BASKI_YON: Pt = (() => {
  const t = noktaS(TEL.duz, TEL.c, TEL.sKopma).t, L = Math.hypot(t[0], t[1]) || 1, n: Pt = [-t[1] / L, t[0] / L];
  return n[0] * (540 - KOPMA[0]) + n[1] * (900 - KOPMA[1]) >= 0 ? n : [-n[0], -n[1]];
})();
// S (eleştiri H2 küçük): V derinliği 10 → 20 px, kol yarı boyu 70 → 90 px (360 px sayfada ≈ 7 px okunur çentik)
const BASKI_PX = 20, BASKI_YARI = 90;
export const telBaski = (p: number, bas: number, kopma: number): number => {
  if (p < bas) return 0;
  if (p >= kopma) return BASKI_PX * (1 - t01(p, kopma, kopma + 3, OUT3));
  const titre = p >= kopma - 4 ? 2.5 * Math.sin((p - (kopma - 4)) * 2.6) : 0;
  return BASKI_PX * t01(p, bas, kopma - 3, Easing.inOut(Easing.quad)) + titre;
};
// direkler arası 6 px sarkma (aşağı); baskı: |s − sKopma| < BASKI_YARI px içinde V (doğrusal)
const sarkikTel = (s0: number, s1: number, d0: number[], baski = 0): Pt[] => {
  const pts: Pt[] = [], dug = [s0, ...d0.filter((s) => s > s0 && s < s1), s1];
  for (let i = 0; i < dug.length - 1; i++) {
    const a = dug[i], b = dug[i + 1], n = Math.max(2, Math.ceil((b - a) / 8));
    for (let j = 0; j <= n; j++) {
      const s = a + ((b - a) * j) / n, q = noktaS(TEL.duz, TEL.c, s).p, v = baski * Math.max(0, 1 - Math.abs(s - TEL.sKopma) / BASKI_YARI);
      pts.push([q[0] + BASKI_YON[0] * v, q[1] + 6 * Math.sin((Math.PI * j) / n) + BASKI_YON[1] * v]);
    }
  }
  return pts;
};
// serbest uç: çapadan kopmaya doğru L px, düz; açı = dinlenme sarkması 7° (ekranda aşağı) + θ(t) = θ0·e^(−t/14)·cos(2πt/20), uca doğru artan
// (yay gibi hafif bükülür, kıvrılmaz). Uçta 3 lif (çatal). Döner: gövde + lifler.
const serbestUc = (sCapa: number, yon: 1 | -1, t: number, L: number, th0: number): { govde: Pt[]; lif: Pt[][] } => {
  const A = noktaS(TEL.duz, TEL.c, sCapa).p, B = noktaS(TEL.duz, TEL.c, sCapa + yon * (L + UC_BOSLUK)).p;
  const phi0 = Math.atan2(B[1] - A[1], B[0] - A[0]), taraf = Math.cos(phi0) >= 0 ? 1 : -1; // + dönüş ekranda aşağı
  const geriTep = t < 0 ? 0 : t01(t, 0, 6, OUT3); // kopmada uç kopma noktasında, 6 karede çapaya doğru geri teper
  const Lt = L + UC_BOSLUK * (1 - geriTep);
  const th = t < 0 ? 0 : ((th0 * Math.PI) / 180) * Math.exp(-t / 14) * Math.cos((2 * Math.PI * t) / 20);
  const dinlen = ((7 * Math.PI) / 180) * (t < 0 ? 0 : 1 - Math.exp(-t / 8));
  const N = 24, ds = Lt / N, govde: Pt[] = [A];
  let x = A[0], y = A[1], a = phi0;
  for (let i = 1; i <= N; i++) {
    const w = i / N; // eğrilik uca doğru doğrusal artar → toplam büküm ≈ (dinlen + th)
    a += (taraf * 2 * w * (dinlen + th)) / N;
    x += Math.cos(a) * ds; y += Math.sin(a) * ds; govde.push([x, y]);
  }
  const lif = ([[-0.55, 15], [0.08, 18], [0.6, 13]] as [number, number][]).map(([da, l]) => {
    const b = a + da, m: Pt = [x + Math.cos(b) * l * 0.55 + Math.cos(b + 1.57) * 1.5 * Math.sign(da || 1), y + Math.sin(b) * l * 0.55 + Math.sin(b + 1.57) * 1.5 * Math.sign(da || 1)];
    return [[x, y], m, [x + Math.cos(b) * l, y + Math.sin(b) * l]] as Pt[];
  });
  return { govde, lif };
};
const SICRANTI: [number, number, number][] = [[-15, 11, 3.5], [13, -10, 2.5], [7, 17, 2.2]];
const TelgrafTeli: React.FC<{ p: number; kopma: number; sonum: [number, number]; kalin: number; boy: number; th0?: number; baskiBas?: number }> = ({ p, kopma, sonum, kalin, boy, th0 = 18, baskiBas }) => {
  const kopuk = p >= kopma, t = p - kopma;
  const ic = TEL.direkler.filter((s) => s < TEL.sKopma), dis = TEL.direkler.filter((s) => s > TEL.sKopma);
  const icCapa = ic[ic.length - 1], disCapa = dis[0];
  const tt = p >= sonum[1] ? 1e6 : t; // sönüm bitince dinlenme
  const L = Math.min(UC_MAX, boy, CAPA - UC_BOSLUK), tet = Math.min(20, th0);
  const uclar = kopuk ? [serbestUc(icCapa, 1, tt, L, tet), serbestUc(disCapa, -1, tt, L, tet)] : [];
  const baski = !kopuk && baskiBas !== undefined ? telBaski(p, baskiBas, kopma) : 0;
  const parcalar: Pt[][] = kopuk
    ? [sarkikTel(0, icCapa, ic), ...uclar.map((u) => u.govde), sarkikTel(disCapa, TEL.c[TEL.c.length - 1], dis)]
    : [sarkikTel(0, TEL.c[TEL.c.length - 1], TEL.direkler, baski)];
  const sq = t01(p, kopma, kopma + 4, OUT3);
  return (
    <g>
      {parcalar.map((pl, i) => {
        const d = yolD(pl);
        return <g key={i} fill="none" stroke={PK.murekkep} strokeLinecap="round" strokeLinejoin="round">
          <path d={d} strokeWidth={kalin + 6} opacity={0.15} /><path d={d} strokeWidth={kalin} />
        </g>;
      })}
      {/* kopuk uç lifleri: 3 kısa çatal (≈ 4.5 px), tel kalınlığından incelir */}
      {uclar.map((u, i) => <g key={`l${i}`} fill="none" stroke={PK.murekkep} strokeLinecap="round" strokeLinejoin="round">
        {u.lif.map((l, j) => <path key={j} d={yolD(l)} strokeWidth={Math.max(5, kalin * 0.5)} />)}
      </g>)}
      {/* direkler: dikey 24 px, 4 px; çapraz kol yok (T okutmaz) */}
      {TEL.direkler.map((s, i) => { const q = noktaS(TEL.duz, TEL.c, s).p; return <g key={i}>
        <ellipse cx={q[0] + 4} cy={q[1] + 25} rx={5} ry={2} fill={PK.kontur} opacity={0.3} />
        <line x1={q[0]} y1={q[1] - 2} x2={q[0]} y2={q[1] + 24} stroke={PK.murekkep} strokeWidth={4} strokeLinecap="round" />
      </g>; })}
      {/* sur kapısı: hattın iç ucu (Cité'ye uzanmaz) */}
      <circle cx={TEL_K[0][0]} cy={TEL_K[0][1]} r={kalin * 0.7} fill={PK.murekkep} />
      {/* kopma anında 3 mürekkep sıçrantısı: kopma noktasından fırlar, kâğıtta kalır */}
      {kopuk && SICRANTI.map(([dx, dy, r], i) => <circle key={i} cx={KOPMA[0] + dx * sq} cy={KOPMA[1] + dy * sq} r={r * sq} fill={PK.murekkep} />)}
    </g>
  );
};

// ================= KagitKalabalik (KE-PK-F1 kâğıt kesik varyantı) =================
type Figur = { q: Pt; boy: number; kod: SiluetKod; yon: 1 | -1; bas: number };
// H2: siluetler SUR İÇİNDE (Parisliler). bant_r = merkezden radyal bant (yatayda sur ovaline göre ×1.3); `bosluk` [x0,y0,x1,y1] dikdörtgeni
// (vars. kümes + kuş çatısı + şerit yığını) hiçbir siluetin gövde kutusuyla kesişmez; ayak ve baş surun içinde; ayak suya basmaz.
type KalabalikAyar = { sayi?: number; boy_px?: [number, number]; bant_r?: [number, number]; bosluk?: [number, number, number, number] };
export const KALABALIK_VARS = { sayi: 40, boy_px: [60, 90] as [number, number], bant_r: [45, 150] as [number, number], bosluk: [515, 820, 655, 1018] as [number, number, number, number] };
const KALABALIK_ONBELLEK = new Map<string, Figur[]>();
// S (eleştiri H2 küçük "tel başların üstünden geçiyor"): sur içindeki tel parçası (+ sur kapısı ucu) çevresinde 10 px koridor boş kalır;
// tel kâğıtta mürekkep, siluetler zaten üstte — koridor telin baş/omuz aralarından geçiyormuş gibi okunmasını önler.
const TEL_KORIDOR = 10;
const TEL_SUR_ICI: Pt[] = [...TEL.duz.filter((q) => icinde(q, SUR)), TEL_K[0] as Pt];
const kalabalikDuzen = (c: Pt, a: KalabalikAyar, bas0: number, son: number): Figur[] => {
  const n = a.sayi ?? KALABALIK_VARS.sayi, boy = a.boy_px ?? KALABALIK_VARS.boy_px, bant = a.bant_r ?? KALABALIK_VARS.bant_r, bos = a.bosluk ?? KALABALIK_VARS.bosluk;
  const key = JSON.stringify([c, n, boy, bant, bos, bas0, son]);
  if (!KALABALIK_ONBELLEK.has(key)) KALABALIK_ONBELLEK.set(key, kalabalikHesap(c, n, boy, bant, bos, bas0, son));
  return KALABALIK_ONBELLEK.get(key)!;
};
const kalabalikHesap = (c: Pt, n: number, boy: [number, number], bant: [number, number], bos: [number, number, number, number], bas0: number, son: number): Figur[] => {
  const r = rng(SEED + 60), out: Figur[] = [];
  for (let k = 0; k < 20000 && out.length < n; k++) {
    const rr = bant[0] + r() * (bant[1] - bant[0]), a = r() * Math.PI * 2;
    const q: Pt = [c[0] + Math.cos(a) * rr * 1.3, c[1] + Math.sin(a) * rr];
    const u = r(), kod: SiluetKod = u < 0.2 ? "cocuk" : u < 0.5 ? "yetiskin-a" : u < 0.82 ? "yetiskin-b" : "omuzda-cubuk";
    const b = kod === "cocuk" ? boy[0] + r() * 6 : boy[0] + 14 + r() * (boy[1] - boy[0] - 14);
    if (!icinde([q[0], q[1] + 6], SUR) || !icinde([q[0] - 14, q[1]], SUR) || !icinde([q[0] + 14, q[1]], SUR) || !icinde([q[0], q[1] - b * 0.4], SUR)) continue; // sur içi (ayak + gövde ortası)
    if (q[0] + 15 > bos[0] && q[0] - 15 < bos[2] && q[1] + 4 > bos[1] && q[1] - b < bos[3]) continue; // merkez boşluğu (kümes/yığın)
    if (!nehreUzak(q, 14)) continue; // ayak suya basmaz
    if (TEL_SUR_ICI.some((t) => t[0] > q[0] - 15 - TEL_KORIDOR && t[0] < q[0] + 15 + TEL_KORIDOR && t[1] > q[1] - b - TEL_KORIDOR && t[1] < q[1] + 6 + TEL_KORIDOR)) continue; // S: tel koridoru (baş/gövde telin üstüne binmez)
    if (out.some((o) => Math.abs(o.q[0] - q[0]) < 24 && Math.abs(o.q[1] - q[1]) < 28)) continue;
    out.push({ q, boy: b, kod, yon: q[0] >= c[0] ? 1 : -1, bas: 0 });
  }
  // sıra: güneyden saat yönünde; her ~6 karede 2–3 siluet, son siluet `son`da kalkar
  const g = (f: Figur) => (((Math.atan2(f.q[1] - c[1], f.q[0] - c[0]) - Math.PI / 2) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  out.sort((a, b) => g(a) - g(b));
  const grup = Math.ceil(out.length / 2.67);
  out.forEach((f, i) => { const gi = Math.min(grup - 1, Math.floor(i / 2.67)); f.bas = Math.round(bas0 + ((son - bas0) * gi) / Math.max(1, grup - 1)); });
  return out;
};
const KAGIT_KENAR = { renk: "rgba(233,223,201,0.5)", dx: -2, dy: -2 };
const KagitKalabalik: React.FC<{ figurler: Figur[]; p: number; hazir: boolean }> = ({ figurler, p, hazir }) => (
  <g>
    {[...figurler].sort((a, b) => a.q[1] - b.q[1]).map((f, i) => {
      // menteşe: yatık 3 px çizgi → 9 karede dikilir (scaleY .08 → 1.06 → 1, ease-out-back), gölge büyür
      const t = hazir ? 99 : p - f.bas;
      if (t < 0) return null;
      const sy = t >= 9 ? 1 : interpolate(t, [0, 6, 9], [0.08, 1.06, 1], { ...cl, easing: Easing.out(Easing.quad) });
      const pxm = f.boy / siluetBoy(f.kod);
      return <g key={i} transform={`translate(${f.q[0]},${f.q[1]}) scale(1,${sy}) translate(${-f.q[0]},${-f.q[1]})`}>
        <g transform="translate(5,6)" opacity={0.22}><SiluetFigur kod={f.kod} ayak={f.q} pxm={pxm} renk={PK.kontur} yon={f.yon} golge={false} /></g>
        <SiluetFigur kod={f.kod} ayak={f.q} pxm={pxm} renk={PK.kontur} yon={f.yon} kenar={KAGIT_KENAR} golgeRenk={PK.kontur} />
      </g>;
    })}
  </g>
);

// ================= kayan çizgi (rüzgâr): baş soldan sağa, kuyruk geriden; kâğıtta durmaz, sağ kenardan çıkar =================
const KayanCizgi: React.FC<{ y0: number; bas: number; v: number; L: number; p: number; faz: number }> = ({ y0, bas, v, L, p, faz }) => {
  const bx = -60 + v * (p - bas);
  if (p < bas || bx - L > 1240) return null;
  const yf = (x: number) => y0 + 14 * Math.sin(x / 170 + faz);
  const x0 = Math.max(-80, bx - L), x1 = Math.min(1260, bx), pts: Pt[] = [];
  for (let x = x0; x <= x1; x += 8) pts.push([x, yf(x)]);
  pts.push([x1, yf(x1)]);
  if (bx <= 1260) { // uçta küçük kıvrık
    const a = Math.atan2(yf(x1 + 1) - yf(x1), 1), R = 11;
    for (let k = 1; k <= 8; k++) { const u = (k / 8) * Math.PI * 1.25; pts.push([x1 + Math.cos(a) * R * Math.sin(u) + Math.sin(a) * R * (1 - Math.cos(u)), yf(x1) + Math.sin(a) * R * Math.sin(u) - Math.cos(a) * R * (1 - Math.cos(u))]); }
  }
  return <Murekkep d={yolD(pts)} w={7} renk={PK.kontur} />; // H2: 360 px sayfada görünür kalınlık
};

// ================= çizgi ucunda kuş (H2: ≥ 90 px) =================
// uçan: çırpar, çizginin yönünde; kon: kanat toplu, dik (kümes çatısında); dus 0..1: yolda düşer — gölge ofseti (yükseklik) 8/10 → 3/4,
// gövde uçuş yönünden +155° döner (sırt üstü yan yatık: "düştü" okunur), kanat aşağı-düz kalır; inişte 3 karelik ezilme. Yok olmaz: çizgi ucunda yatık kalır (fade yok).
const KUS_OLCU = 48; // KusIkon gövde boyu (yerel px)
// ayna −1..1: yatay yön (kon kuşu dışa döner; inişte 8 karede döner, pop yok). Gölge dünya +x'te kalır.
const KusUcta: React.FC<{ q: Pt; aci: number; p: number; px: number; kon?: boolean; dus?: number; ez?: number; ayna?: number }> = ({ q, aci, p, px, kon, dus = 0, ez = 0, ayna = 1 }) => {
  const kanat = (kon || dus > 0 ? 1 : Math.floor(p / 6) % 2) as 0 | 1;
  const a0 = Math.max(-40, Math.min(40, aci));
  const a = kon ? 0 : a0 + 155 * dus;
  const s = px / KUS_OLCU;
  const gx = kon ? 4 : 8 - 5 * dus, gy = kon ? 5 : 10 - 6 * dus;
  const ay = Math.abs(ayna) < 0.05 ? (ayna < 0 ? -0.05 : 0.05) : ayna;
  return <g transform={`translate(${q[0]},${q[1]}) rotate(${a}) scale(${s * (1 + 0.08 * ez) * ay},${s * (1 - 0.12 * ez)})`}>
    <Golgeli dx={gx / (s * ay)} dy={gy / s}>{(g) => <KusIkon golge={g} kanat={kanat} />}</Golgeli>
  </g>;
};

export const ParisCevreSahne: React.FC<{ plan: Plan; p: number; kilit: KilitNokta[]; k: KameraDurum }> = ({ plan, p, kilit, k }) => {
  const h = param<Halka>(plan, "halka", {});
  const c = (h.merkez ?? [540, 900]) as Pt;
  const tl = param<{ kopma_kare?: number; uc_sonum?: { bas: number; bit: number }; tel_kalinlik_px?: number; uc_boy_px?: number; uc_theta0_derece?: number } | null>(plan, "telgraf_teli", null);
  const kopmaK = tl?.kopma_kare ?? 144;
  const telKopuk = param<boolean>(plan, "tel_kopuk", true);
  const kb = param<(KalabalikAyar & { bas: number; bit: number }) | null>(plan, "kalabalik", null);
  // kalabalik_hazir: sayı (vars. bant) ya da {sayi, boy_px, bant_r, bosluk} — P02 sonundaki düzenin aynısı f0'da ayakta (negatif kare gerekmez)
  const hzRaw = param<number | KalabalikAyar | false>(plan, "kalabalik_hazir", h.kalici ? KALABALIK_VARS.sayi : 0);
  const hz: KalabalikAyar | null = typeof hzRaw === "number" ? (hzRaw > 0 ? { sayi: hzRaw } : null) : hzRaw || null;
  const figurler = kb ? kalabalikDuzen(c, kb, kb.bas + 13, kb.bit - 10) : hz ? kalabalikDuzen(c, hz, 0, 0) : [];
  const E = (q: Pt) => ekranNokta(k, q);
  const id = `pc-${plan.id}`;

  // ---- P03B ----
  const bi = param<{ bas: number; bit: number; ikon_px?: number } | null>(plan, "balon_izi", null); // H2: balon >= 70 px (vars. 76)
  const rz = param<{ bas: number; bit: number } | null>(plan, "ruzgar_cizgileri", null);
  const ok = param<{ ciz: { bas: number; bit: number }; suprulur: { bas: number; bit: number } } | null>(plan, "geri_ok", null);
  const yg = param<{ bas: number; baslangic?: Pt; carpma_nokta?: Pt; carpma?: number; ikon_px?: number } | null>(plan, "yazi_yigini", null);
  // ---- P04A / P11A ----
  const km = param<{ konum?: Pt; ciz?: { bas: number; bit: number }; boyut_px?: [number, number] } | null>(plan, "kumes_ikon", null);
  const gv = param<{ bas: number; bit: number; baslangic?: Pt } | null>(plan, "guvercin_cizgisi", null);
  const kc = param<{ baslangic_dekor: Pt[]; t_dur: (number | null)[]; varis_kare: Record<string, number>; dur_kare?: [number, number]; ikon_px?: number } | null>(plan, "kus_cizgileri", null);
  const sy = param<{ bas: number; adet?: number; yigin_merkez?: Pt; yigin_px?: [number, number]; ilk_inis?: number; son_firlatma?: number; son_inis?: number } | null>(plan, "serit_yagmuru", null);

  const kumesQ = (km?.konum ?? [560, 930]) as Pt;
  const kumesCiz = km?.ciz ? t01(p, km.ciz.bas, km.ciz.bit, Easing.inOut(Easing.quad)) : 1;
  const kumesS = (km?.boyut_px?.[1] ?? 80) / 40; // H2: kümes ≥ 72 px (vars. 80)
  const catı: Pt = [kumesQ[0], kumesQ[1] - 42 * kumesS]; // kuşun konduğu çatı tepesi
  const kusPx = kc?.ikon_px ?? 90, konPx = Math.round(kusPx * 0.52); // H2: kuş ≥ 90 px uçarken; konan kuş kanat toplu ~47 px
  // çatıya konan kuşlar: tepe, sol eğim, sağ eğim (çatı eğimi 45°; gövde merkezi çatının ~0.13·konPx üstünde)
  // S (eleştiri H2 #1 "9'a 3"): yan kuşlar saçak uçlarında (yerel ±18 → ekran ±36), tepe kuşundan ≥ 7 px dikey açıklık; sol kuş dışa (sola)
  // döner → başı tepe kuşunun kanadına değmez. Tepe (v 0) P04 ile aynı yerde.
  const konus = (v: number): Pt => { const dx = [0, -1, 1][v % 3] * (v % 3 ? 18 : 0) * kumesS, h = konPx * 0.14; return [catı[0] + dx, catı[1] + Math.abs(dx) - h]; };
  const konAyna = (v: number, p: number, bit: number) => (v % 3 === 1 ? Math.cos(Math.PI * t01(p, bit - 8, bit, SIN)) : 1);

  if (tl) kilit.push({ ad: "kopma", p: E(KOPMA), tur: "dokunus" });
  if (km) kilit.push({ ad: "kümes", p: E(kumesQ), tur: "kurulum" });

  // ---- balon izi (P03B) ----
  let balon: React.ReactNode = null, iz: React.ReactNode = null;
  if (bi && p >= bi.bas) {
    const A: Pt = [559, 797], B: Pt = [930, 560], K: Pt = [800, 770];
    const q = t01(p, bi.bas, bi.bit, SIN);
    const yol: Pt[] = Array.from({ length: 41 }, (_, i) => { const t = (i / 40) * q, u = 1 - t; return [u * u * A[0] + 2 * u * t * K[0] + t * t * B[0], u * u * A[1] + 2 * u * t * K[1] + t * t * B[1]]; });
    const uc = yol[yol.length - 1];
    const kalk = t01(p, bi.bas, bi.bas + 16, OUT3);
    if (q > 0.002) iz = <><Murekkep d={yolD(yol)} w={6} /><circle cx={uc[0]} cy={uc[1]} r={5} fill={PK.murekkep} /></>;
    balon = <g transform={`translate(${uc[0]},${uc[1]}) scale(${((bi.ikon_px ?? 76) / 56) * (0.85 + 0.15 * kalk)})`}><Golgeli dx={5 + 9 * kalk} dy={6 + 12 * kalk}>{(g) => <BalonIkon golge={g} />}</Golgeli></g>;
  }
  // ---- geri ok + süpürülme (P03B) ----
  let okCiz: React.ReactNode = null;
  if (ok && p >= ok.ciz.bas) {
    const govde = yay([902, 598], [652, 770], 0.12, 6), cg = kumulatif(govde), L = cg[cg.length - 1];
    const q = t01(p, ok.ciz.bas, ok.ciz.bit, Easing.inOut(Easing.quad));
    // rüzgâr darbesi başı x(t) = −60 + 50·(t − (sup.bas − 14)); her nokta baş geçince 34 px/kare'ye ivmelenir (uç önce vurulur → ok büzülür)
    const gBas = ok.suprulur.bas - 14, vG = 50;
    const kay = (x: number) => { const ts = gBas + (x + 60) / vG, tau = p - ts; return tau <= 0 ? 0 : (34 * tau * tau) / (tau + 4); };
    const kismi = parca(govde, cg, 0, L * q).map(([x, y]) => [x + kay(x), y] as Pt);
    const izKuru = p >= gBas + (652 + 60) / vG;
    if (kismi.length > 1) {
      const u = kismi[kismi.length - 1], u0 = kismi[Math.max(0, kismi.length - 3)], a = Math.atan2(u[1] - u0[1], u[0] - u0[0]);
      const ch = 36 * t01(q, 0.82, 1);
      const kol = (s: number): Pt => [u[0] - Math.cos(a + s) * ch, u[1] - Math.sin(a + s) * ch];
      okCiz = <>
        {izKuru && <path d={yolD(govde)} fill="none" stroke={PK.tarama} strokeWidth={5} strokeDasharray="9 4 14 3 6 5" strokeLinecap="butt" />}
        <Murekkep d={yolD(kismi)} w={7} renk={PK.kontur} />
        {ch > 0 && <Murekkep d={`M${kol(0.5).join(",")} L${u.join(",")} L${kol(-0.5).join(",")}`} w={7} renk={PK.kontur} />}
      </>;
    }
  }
  // ---- yazı yığını (P03B): sol-alt dışından sabit hızla, halkaya çarpar, ezilir, seker, oturur ----
  let yigin: React.ReactNode = null, kesik: React.ReactNode = null;
  if (yg && p >= yg.bas) {
    const S0 = (yg.baslangic ?? [-60, 1560]) as Pt, CN = (yg.carpma_nokta ?? [236, 1204]) as Pt, tc = yg.carpma ?? 290;
    const L0 = mesafe(S0, CN), u: Pt = [(CN[0] - S0[0]) / L0, (CN[1] - S0[1]) / L0], dur: Pt = [CN[0] - u[0] * 44, CN[1] - u[1] * 44];
    const ilerle = Math.min(1, (p - yg.bas) / (tc - yg.bas));
    const geri = p < tc ? 0 : p < tc + 4 ? (6 * (p - tc)) / 4 : interpolate(p, [tc + 4, tc + 10], [6, 0], { ...cl, easing: Easing.inOut(Easing.quad) });
    const q: Pt = [S0[0] + (dur[0] - S0[0]) * ilerle - u[0] * geri, S0[1] + (dur[1] - S0[1]) * ilerle - u[1] * geri];
    const ez = p >= tc && p < tc + 4 ? 1 - 0.12 * Math.sin((Math.PI * (p - tc)) / 4) : 1;
    const ustKay = 8 * t01(p, tc, tc + 16, OUT3);
    const aci = (Math.atan2(u[1], u[0]) * 180) / Math.PI;
    const s = (yg.ikon_px ?? 80) / 84;
    kesik = <path d={`M${S0.join(",")} L${q.join(",")}`} fill="none" stroke={PK.kontur} strokeWidth={4} strokeDasharray="18 12" strokeLinecap="butt" />;
    const zerre = p >= tc ? [[-6, 0], [5, 3]].map(([dx, dy], i) => { const t = t01(p, tc, tc + 6, OUT3); return <circle key={i} cx={CN[0] + dx} cy={CN[1] + dy + 10 * t} r={(2 + i) * Math.min(1, (p - tc + 1) / 3)} fill={PK.murekkep} />; }) : null;
    yigin = <g>
      <g transform={`translate(${q[0]},${q[1]}) rotate(${aci}) scale(${ez},${1 / Math.sqrt(ez)}) rotate(${-aci}) rotate(-8)`}>
        <Golgeli>{(g) => <YiginIkon golge={g} ustKay={ustKay} olcek={s} />}</Golgeli>
      </g>
      {zerre}
    </g>;
    kilit.push({ ad: "çarpma", p: E(CN), tur: "temas" });
  }
  // ---- güvercin çizgisi (P04A) ----
  let guv: React.ReactNode = null, guvKus: React.ReactNode = null;
  if (gv && p >= gv.bas) {
    const yol = yay((gv.baslangic ?? [36, 1238]) as Pt, konus(0), -0.08, 5), cy = kumulatif(yol), L = cy[cy.length - 1];
    const q = t01(p, gv.bas, gv.bit, SIN), uc = noktaS(yol, cy, L * q);
    guv = <Murekkep d={yolD(parca(yol, cy, 0, L * q))} w={4} renk={PK.kontur} />;
    const kon = p >= gv.bit, son = t01(p, gv.bit - 12, gv.bit, OUT3);
    guvKus = <KusUcta q={kon ? konus(0) : uc.p} aci={(Math.atan2(uc.t[1], uc.t[0]) * 180) / Math.PI} p={p} px={kusPx + (konPx - kusPx) * son} kon={kon} />;
  }
  // ---- kuş çizgileri (P11A) ----
  const kusCizgi: React.ReactNode[] = [], kusUcu: React.ReactNode[] = [];
  if (kc) {
    const r = rng(SEED + 70), dk = kc.dur_kare ?? [30, 96];
    // varanlar varis_kare'den; t_dur'daki null olmayan değerler SIRAYLA varmayan çizgilere dağıtılır (json'da null'lar #4/#7/#10'da,
    // varanlar #4/#7/#11 — 9 değer = 9 duran çizgi; kayma yönetmene not edildi)
    const varNo = new Set(Object.keys(kc.varis_kare).map((no) => +no - 1));
    const degerler = kc.t_dur.filter((t) => t !== null) as number[];
    const tDurHiz: (number | null)[] = kc.baslangic_dekor.map(() => null);
    let di = 0;
    kc.baslangic_dekor.forEach((_, i) => { if (!varNo.has(i)) tDurHiz[i] = degerler[di++] ?? 0.3; });
    const duranlar = tDurHiz.map((t, i) => ({ t, i })).filter((x) => x.t !== null).sort((a, b) => (a.t as number) - (b.t as number));
    const durKare: Record<number, number> = {};
    duranlar.forEach((x, j) => { durKare[x.i] = Math.round(dk[0] + ((dk[1] - dk[0]) * j) / Math.max(1, duranlar.length - 1)); });
    const varanlar = Object.entries(kc.varis_kare).map(([no, f]) => ({ i: +no - 1, f })).sort((a, b) => a.f - b.f);
    kc.baslangic_dekor.forEach((s0, i) => {
      const sis = (0.06 + r() * 0.04) * (r() < 0.5 ? 1 : -1), bas = Math.round(r() * 18);
      const v = varanlar.findIndex((x) => x.i === i), varan = v >= 0;
      const hedef: Pt = varan ? konus(v) : catı;
      const yol = yay(s0 as Pt, hedef, sis, 5), cy = kumulatif(yol), L = cy[cy.length - 1];
      const tDur = varan ? 1 : tDurHiz[i] ?? 1, bit = varan ? varanlar[v].f : durKare[i];
      const q = tDur * t01(p, bas, bit, varan ? SIN : Easing.out(Easing.quad));
      const uc = noktaS(yol, cy, L * q);
      if (q > 0.001) kusCizgi.push(<Murekkep key={i} d={yolD(parca(yol, cy, 0, L * q))} w={4} renk={PK.kontur} />);
      const aci = (Math.atan2(uc.t[1], uc.t[0]) * 180) / Math.PI;
      if (varan) {
        const kon = p >= bit, son = t01(p, bit - 12, bit, OUT3);
        kusUcu.push(<KusUcta key={i} q={kon ? hedef : uc.p} aci={aci} p={p + i * 2} px={kusPx + (konPx - kusPx) * son} kon={kon} ayna={konAyna(v, p, bit)} />);
      } else {
        // H2: yolda durur → kuş 7 karede kâğıda düşer (gölge kısalır), yan yatar; temas karesinde 3 kare ezilir ve mürekkep damlası
        // (koyu, emilmez) çizgi ucunda kalır. Kuş yok olmaz.
        const dus = t01(p, bit, bit + 7, Easing.in(Easing.quad)), tc = bit + 7;
        const ez = p >= tc && p < tc + 3 ? Math.sin((Math.PI * (p - tc)) / 3) : 0;
        if (p >= tc) {
          const sq = t01(p, tc, tc + 4, OUT3);
          kusCizgi.push(<g key={`d${i}`}>
            <circle cx={uc.p[0]} cy={uc.p[1]} r={4 + 3 * sq} fill={PK.murekkep} />
            {[[11, -7], [-6, 12]].map(([dx, dy], j) => <circle key={j} cx={uc.p[0] + dx * sq} cy={uc.p[1] + dy * sq} r={2.2 * sq} fill={PK.murekkep} />)}
          </g>);
        }
        kusUcu.push(<KusUcta key={i} q={uc.p} aci={aci} p={p + i * 2} px={kusPx} dus={dus} ez={ez} />);
      }
    });
  }
  // ---- şerit yağmuru + yığın (P11A) ----
  const seritler: React.ReactNode[] = [];
  if (sy) {
    const n = sy.adet ?? 38, ym = (sy.yigin_merkez ?? [600, 985]) as Pt, [yw, yh] = sy.yigin_px ?? [110, 56];
    const t0 = sy.bas, tSon = sy.son_firlatma ?? 150, ilk = sy.ilk_inis ?? 130, sonI = sy.son_inis ?? 166;
    // S (eleştiri H2 #1): şeritler kümesin iniş tahtasından (yerel y −12) çıkar, alçak kemerle (≤ 16 px) yığına düşer → havadaki şeritler
    // çatı ve saçaktaki 3 kuşun altında kalır (f150'de "üst yığın" oluşmaz).
    const r = rng(SEED + 80), kapi: Pt = [kumesQ[0] + 6 * kumesS, kumesQ[1] - 12 * kumesS];
    if (p >= (sy.ilk_inis ?? 130)) kilit.push({ ad: "yığın", p: E(ym), tur: "kurulum" });
    for (let i = 0; i < n; i++) {
      const tf = t0 + ((tSon - t0) * i) / (n - 1);
      const uc = i === 0 ? ilk - tf : i === n - 1 ? sonI - tf : 14 + r() * 4;
      // yığın yuvası: içten dışa (yığın büyür), sonrakiler biraz daha yukarıda (üst üste)
      const rr = Math.sqrt((i + 0.5) / n), a = r() * Math.PI * 2;
      const yer: Pt = [ym[0] + Math.cos(a) * rr * (yw / 2 - 12), ym[1] + Math.sin(a) * rr * (yh / 2 - 6) - i * 0.25];
      const kemer = r() * 16, dons = (r() < 0.5 ? -1 : 1) * (140 + r() * 60), dinlen = (r() - 0.5) * 60;
      if (p < tf) continue;
      const u = Math.min(1, (p - tf) / uc);
      const x = kapi[0] + (yer[0] - kapi[0]) * u + (u > 0.6 && u < 1 ? 6 * Math.sin((u - 0.6) * 25) * (1 - u) : 0);
      const y = kapi[1] + (yer[1] - kapi[1]) * u - 4 * kemer * u * (1 - u);
      const aci = dinlen - dons * (1 - u);
      const havada = u < 1;
      seritler.push(<g key={i} transform={`translate(${x},${y}) rotate(${aci})`}>
        <Golgeli dx={havada ? 10 : 5} dy={havada ? 12 : 6}>{(g) => <SeritIkon golge={g} />}</Golgeli>
      </g>);
    }
  }

  return (
    <>
      {/* §5H.3 notu: parşömen lekeleri arazi multiply'ı ile C* > 32'ye çıkıyordu (ölçüm %1.4) → yalnız bu görünümde doygunluk düşürülür */}
      <Img src={staticFile("blanc/img/parsomen.jpg")} style={{ position: "absolute", left: -200, top: -300, width: 1480, height: 2520, objectFit: "cover", filter: "saturate(0.62)" }} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <GravurArazi />
        {/* kâğıda basılı mürekkep: tel, halka çizgisi, izler, rüzgâr, kesik çizgi, kuş çizgileri (gölge vermez) */}
        {tl
          ? <TelgrafTeli p={p} kopma={kopmaK} sonum={[tl.uc_sonum?.bas ?? kopmaK, tl.uc_sonum?.bit ?? kopmaK + 50]} kalin={tl.tel_kalinlik_px ?? 10} boy={tl.uc_boy_px ?? 75} th0={tl.uc_theta0_derece ?? 18} baskiBas={h.bas !== undefined ? h.son_isaret_oturur ?? 132 : undefined} />
          : telKopuk && <TelgrafTeli p={1e6} kopma={0} sonum={[0, 1]} kalin={10} boy={75} />}
        {iz}{okCiz}{kesik}{guv}{kusCizgi}
        {rz && [[600, 0, 30, 420, 0.4], [720, 2, 28, 340, 2.1], [840, 4, 30, 280, 4.0]].map(([y0, d, v, L, f], i) => <KayanCizgi key={i} y0={y0} bas={rz.bas + d} v={v} L={L} p={p} faz={f} />)}
        {ok && <KayanCizgi y0={690} bas={ok.suprulur.bas - 14} v={50} L={380} p={p} faz={1.3} />}
        {/* kâğıttan kalkan parçalar (gölgeli) */}
        {(h.bas !== undefined || h.kalici) && <KusatmaHalkasi h={h} p={p} tel={TEL} baski={tl && h.bas !== undefined ? telBaski(p, h.son_isaret_oturur ?? 132, kopmaK) : 0} />}
        <KagitKalabalik figurler={figurler} p={p} hazir={!kb} />
        {km && <g transform={`translate(${kumesQ[0]},${kumesQ[1]}) scale(${kumesS})`}><Golgeli dx={5 / kumesS} dy={6 / kumesS}>{(g) => <KumesIkon golge={g} ciz={kumesCiz} id={`${id}-k${g ? "g" : ""}`} />}</Golgeli></g>}
        {seritler}
        {yigin}{balon}{guvKus}{kusUcu}
      </svg>
    </>
  );
};
