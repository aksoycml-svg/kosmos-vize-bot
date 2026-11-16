// ===== LIMAN bölüm görünümleri (tur-7, tam bölüm; sahne-plani §12, kilitli kareler P01/P04/P07b/P10a ile aynı dil) =====
// kiyidan-olay  (P06 atış/sütun/isabet · P07c duman · P09 yatış-batış) — K1 kiyidan-ada üstüne ek katmanlar (K1 kodu değişmez)
// gemi-sahne    (P02 derrick + deniz uçağı, dolly out + zoom out · P08 bot, truck + crane up) — gemi-orta dilinin genelleştirilmişi
// batarya-genis (P05a alçak açı, top hattı, truck paralaks) · durbun-insert (P05b el + dürbün, odak halkası)
// Tek ışık: güneş az 235°; rüzgâr 335°. KOR yalnız alev/atış/isabet çakımı.
import React, { useId } from "react";
import { interpolate } from "remotion";
import type { Plan } from "../../tipler";
import { param, SablonProps } from "../../ortak";
import { cl, GIRIS, CIKIS, INOUT } from "../../zaman";
import { RenkKaydi } from "../../../doku/Tarama";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { BP, Duman, egriYol, Flu, gokSutun, Isleme, kirik, P2, pts, rr, ruzgar, Tara } from "./bmcOrtak";
import { Sirt } from "./Liman";
import { GEMI, GemiDurum, GemiProfil, GemiYansima } from "./Gemi";
import { karisim as mix } from "./renk";
import { KiyidanAda, KiyidanCtx, KiyidanEk } from "./Liman";
import { AnaTop, Asker, AskerTip, DenizCiz, denizSatir, Gok, kam, MeisArka, Yangin } from "./LimanYeni";
import { Dal, Ot } from "./KiyiBatarya";

type Kilit = SablonProps["kilit"];
const ara = (p: number, k: number[], v: number[], e: (t: number) => number = INOUT) => (v.length === 1 ? v[0] : interpolate(p, k, v, { ...cl, easing: e }));
const GX0 = 190; // K1 gemi baş x (ref px)

// ---------- su sütunu (ref px; yükselir 24 / tutar 20 / çöker 22; tabanda köpük halkası) ----------
const SuSutunu: React.FC<{ x: number; y: number; p: number; bas: number; boy?: number; gen?: number; seed: string }> = ({ x, y, p, bas, boy = 150, gen = 66, seed }) => {
  const a = p - bas; if (a < 0 || a > 110) return null;
  const yuk = a < 24 ? GIRIS(a / 24) : a < 44 ? 1 : Math.max(0, 1 - CIKIS((a - 44) / 22)), gen2 = gen * (1 + (a > 44 ? (a - 44) / 40 : 0));
  const H = boy * yuk, sol: P2[] = [], sag: P2[] = [];
  for (let i = 0; i <= 8; i++) { const u = i / 8, w = gen2 * 0.5 * (0.55 + 0.45 * Math.sin(Math.PI * Math.min(1, u * 1.15))) * (1 + 0.12 * Math.sin(u * 9 + rr(`${seed}w`) * 6)); sol.push([x - w, y - H * u]); sag.push([x + w * 1.05, y - H * u]); }
  const halka = a > 4 ? Math.min(1, (a - 4) / 60) : 0;
  return (
    <g>
      {halka > 0 && <ellipse cx={x} cy={y + 2} rx={gen * (0.7 + 1.6 * halka)} ry={8 + 10 * halka} fill="none" stroke={BP.kopuk} strokeWidth={3} opacity={0.9 * (1 - halka)} />}
      {H > 4 && <g>
        <path d={egriYol([...sol, ...sag.slice().reverse()])} fill={BP.kopukGolge} />
        <path d={egriYol([...sol.map((q) => [q[0] + gen2 * 0.18, q[1]] as P2), ...sag.slice().reverse()])} fill={BP.kopuk} />
        <polyline points={pts(sag)} fill="none" stroke={BP.kenar} strokeWidth={2.5} />
        {Array.from({ length: 9 }).map((_, i) => { const u = rr(`${seed}d${i}`), d = a > 30 ? (a - 30) * 0.9 : 0; return <circle key={i} cx={x + (u - 0.5) * gen2 * 1.6} cy={y - H * (0.75 + 0.3 * rr(`${seed}e${i}`)) + d} r={2 + 2 * rr(`${seed}r${i}`)} fill={BP.kopuk} opacity={a > 60 ? 0.4 : 0.9} />; })}
      </g>}
    </g>
  );
};

// ===================================================================================================
// kiyidan-olay — K1 kadrajı üstünde olaylar (P06 / P07c / P09)
// ===================================================================================================
const KiyidanOlay: React.FC<{ plan: Plan; p: number; kilit: Kilit }> = ({ plan, p, kilit }) => {
  const olay = param<"atis" | "duman" | "batis">(plan, "olay", "atis");
  const cid = useId().replace(/:/g, "");
  const ek = (c: KiyidanCtx): KiyidanEk => {
    const { pxm, wl, t } = c, sm = (m: number) => GX0 + m * pxm, sh = (h: number) => wl - h * pxm * GEMI.abarti, ruz = ruzgar(190);
    const hc = sm(90.3), hy = sh(11.6);
    if (olay === "atis") {
      const at = param<number[]>(plan, "atislar", [186, 262, 404]), su = param<number[]>(plan, "sutunlar", [246, 322]), is = param<number>(plan, "isabet", 464);
      // namlu: oyukta, gemiye (sağ-üst) dönük; atış 1'de 24 px geri teper (24 karede döner)
      const g = p >= at[0] && p < at[0] + 30 ? (p - at[0] < 4 ? (p - at[0]) / 4 : 1 - CIKIS((p - at[0] - 4) / 26)) : 0;
      const dx = -24 * g * 0.83, dy = 24 * g * 0.56;
      const cak = p >= at[0] && p < at[0] + 6 ? 1 - (p - at[0]) / 6 : 0;
      const toz = p >= at[0] ? (p - at[0]) / 60 : -1;
      const isab = p >= is ? p - is : -1;
      return {
        gemi: <g>
          {su.map((q, i) => <SuSutunu key={i} x={i === 0 ? sm(14) - 40 : sm(104) + 50} y={wl + (i === 0 ? 14 : 10)} p={p} bas={q} seed={`ss${i}`} boy={i === 0 ? 150 : 140} />)}
          {/* isabet: hangar bölgesinde krem çakım + KOR çekirdek (≤ 40 kare), ardından ince duman (fade yok, kadraj üstünden çıkar) */}
          {isab >= 0 && <g>
            <Duman taban={[hc + 10, hy - 26]} t={isab / 60 - 600 / 40} hiz={40} genis0={14} genis1={70} ruz={ruz} seed="ksd" boy={600} tara={false} />
            {isab < 14 && <path d={`M${pts(Array.from({ length: 14 }).map((_, i) => { const a = (i / 14) * 6.283, r = (i % 2 ? 0.45 : 1) * (70 + 50 * (isab / 14)) * (0.7 + 0.5 * rr(`ib${i}`)); return [hc + Math.cos(a) * r, hy - 10 + Math.sin(a) * r * 0.75] as P2; }))} Z`} fill={BP.cakim} opacity={0.85 * (1 - isab / 14)} />}
            {isab < 80 && (() => { const k = 1 - isab / 120, L = (s2: string, R: number): P2[] => Array.from({ length: 9 }).map((_, i) => { const a = (i / 9) * 6.283, r = R * (0.6 + 0.6 * rr(`${s2}${i}`)) * (1 + 0.08 * Math.sin(t * 5 + i)); return [hc + Math.cos(a) * r * 1.3, hy + 2 + Math.sin(a) * r * 0.7 - (a > 3.4 && a < 6 ? r * 0.4 : 0)] as P2; });
              return <g><path d={egriYol(L("ik1", 52 * k))} fill="#c4562c" opacity={0.7} /><path d={egriYol(L("ik2", 34 * k))} fill="#e2742c" /><path d={egriYol(L("ik4", 20 * k))} fill="#ffb84e" /></g>; })()}
          </g>}
        </g>,
        kaya: <g>
          {/* mevzideki top: kalkan kenarı ve namlu oyuğun ağzından gemiye uzanır (P01 oyuğunun karşılığı) */}
          <g transform={`translate(${dx} ${dy})`}>
            <path d={`M${pts([[262, 1318], [356, 1252], [366, 1266], [274, 1334]])} Z`} fill="#3e3b52" stroke={BP.kontur} strokeWidth={3} />
            <line x1={264} y1={1317} x2={357} y2={1252} stroke={BP.demirIsik} strokeWidth={3} />
            <ellipse cx={361} cy={1259} rx={8} ry={10} fill="#1e1a2c" stroke={BP.kontur} strokeWidth={2} transform="rotate(-35 361 1259)" />
          </g>
          <path d={`M${pts([[196, 1306], [238, 1282], [258, 1298], [252, 1340], [204, 1352]])} Z`} fill="#34304a" stroke={BP.kontur} strokeWidth={2.5} />
          <polyline points={pts([[196, 1306], [238, 1282], [258, 1298]])} fill="none" stroke={BP.kenar} strokeWidth={3} />
          {cak > 0 && <g><circle cx={372} cy={1250} r={34 * cak + 8} fill="#ffb84e" opacity={0.9} /><circle cx={372} cy={1250} r={14 * cak + 4} fill="#fff0c4" /></g>}
          {toz >= 0 && toz < 1.2 && Array.from({ length: 10 }).map((_, i) => { const u = rr(`kt${i}`), r = (18 + 22 * rr(`ktr${i}`)) * (0.5 + toz), y = 1296 - toz * (40 + 40 * u) + (toz > 0.8 ? (toz - 0.8) * 60 : 0);
            return <circle key={i} cx={200 + u * 220 + toz * 40} cy={y} r={r} fill={mix("#d8c4a8", BP.bugu, 0.3)} opacity={Math.max(0, 0.75 - toz * 0.6)} />; })}
          <Dal a={[-40, 1500]} b={[220, 1380]} k={1.6} seed="kod1" />
        </g>,
      };
    }
    if (olay === "duman") {
      const g = param<number>(plan, "yangin_guc", 0.35);
      return {
        gemi: <g>
          {/* kıç köpüğü: dümen bozuk, pervane boşa döner */}
          {Array.from({ length: 6 }).map((_, i) => <ellipse key={i} cx={sm(118) + 10 + i * 14 + Math.sin(t * 3 + i) * 3} cy={wl + 4 + i * 2} rx={18 + i * 6} ry={4 + i} fill={BP.kopuk} opacity={0.7 - i * 0.09} />)}
          <Duman taban={[hc + 10, hy]} t={t} hiz={70} genis0={22} genis1={270} ruz={ruz} seed="kod" boy={1200} tara={false} isikRenk="#c9aea6" />
          <Yangin x0={sm(76.1)} x1={sm(104.6)} yCati={hy} yTaban={sh(GEMI.borda + 0.2)} guc={g} t={t} ruz={ruz} cerceve={[76.1, 81, 86, 91, 96, 101, 104.6].map(sm)} />
        </g>,
      };
    }
    // batis (P09): sancağa yatar (f10–140), su hattı tırmanır, duman söner; halkalar f100–150
    const e = ara(p, [10, 140], [0, 1]), trim = 3 * e, yat = 22 * e, bat = 3.6 * e;
    const H = GEMI.borda * pxm * GEMI.abarti;
    return {
      gemiYerine: <g>
        <g transform={`translate(${GX0} ${wl + 2})`} opacity={1 - 0.6 * e}><GemiYansima pxm={pxm} seed={181} boy={0.6 - 0.3 * e} /></g>
        <defs><clipPath id={`kb${cid}`}><rect x={-400} y={-1200} width={2400} height={wl + 1200} /></clipPath></defs>
        <g clipPath={`url(#kb${cid})`}><g transform={`translate(${GX0} ${wl}) rotate(${trim}) skewX(${-yat}) translate(0 ${bat * pxm * GEMI.abarti})`}>
          {e > 0.05 && <path d={`M${pts([[0, -H], [118 * pxm, -H], [118 * pxm + 14, -H - 2.1 * pxm * GEMI.abarti * e], [10, -H - 2.4 * pxm * GEMI.abarti * e]])} Z`} fill="#6e6476" stroke={BP.kontur} strokeWidth={2} />}
          <KonturTitreme derinlik="uzak" seed={183} olcek={0.8}><GemiProfil pxm={pxm} durum={e > 0.4 ? "batik" : "vurulmus"} seed={181} /></KonturTitreme></g></g>
        {[0, 1, 2].map((i) => <path key={i} d={`M${GX0 - 10 - i * 16},${wl + 1 + i * 6} L${GX0 + 118.9 * pxm + 18 + i * 20},${wl + 1 + i * 6}`} stroke={i ? BP.suYol : BP.kopuk} strokeWidth={i ? 2 : 3.2} opacity={(i ? 0.6 : 0.9) * Math.min(1, e * 3)} />)}
        {p >= 100 && [0, 1, 2].map((i) => { const q = Math.min(1, (p - 100 - i * 10) / 70); return q > 0 ? <ellipse key={`h${i}`} cx={GX0 + 70 * pxm} cy={wl + 6} rx={380 * (0.6 + 0.6 * q)} ry={14 + 16 * q} fill="none" stroke={BP.kopuk} strokeWidth={2.5} opacity={0.7 * (1 - q)} /> : null; })}
        <Duman taban={[GX0 + 90 * pxm, wl - 50]} t={t} hiz={45} genis0={24} genis1={170 * (1 - 0.5 * e)} ruz={ruz} seed="kbd" boy={800} tara={false} yogun={0.9 - 0.4 * e} isikRenk="#c9aea6" />
      </g>,
    };
  };
  if (olay === "atis") kilit.push({ ad: "namlu (mevzi)", p: [372, 1250], tur: "dokunus" });
  // isabet darbesi: ≤ 2 px, 14 karede söner (gösterişsiz; kenar boşluğu için %0.4 büyütme)
  const is0 = param<number>(plan, "isabet", 464), ds = olay === "atis" && p >= is0 && p < is0 + 14 ? (1 - (p - is0) / 14) * 2 : 0;
  if (ds > 0) return <div style={{ position: "absolute", inset: 0, transform: `translate(${Math.sin(p * 2.3) * ds}px, ${Math.cos(p * 3.1) * ds * 0.6}px) scale(1.004)` }}><KiyidanAda plan={plan} p={p} kilit={kilit} ek={ek} /></div>;
  return <KiyidanAda plan={plan} p={p} kilit={kilit} ek={ek} />;
};

// ===================================================================================================
// gemi-sahne — P02 (derrick + deniz uçağı) / P08 (bot): gemi düzlemi Z_s, kamera yolu {Zd, F, h, xc, yh}
// ===================================================================================================
const BAS_X = -66.1;
type Yol = { kare: number[]; Zd: number[]; F: number[]; h: number[]; xc: number[]; yh: number[] };
// deniz uçağı (genel iki şamandıralı çift kanat; işaret/renk yok) — yan-üst 3/4 görünüş, birim m (x kıça +, y yukarı +)
const Ucak: React.FC<{ X: (m: number) => number; Y: (h: number) => number; s: number }> = ({ X, Y, s }) => {
  const P = (u: number, v: number): P2 => [X(u), Y(v)];
  const kanat = (v0: number, dx: number, dv: number) => [P(-2.6, v0), P(-0.6, v0), P(-0.6 + dx, v0 + dv), P(-2.6 + dx, v0 + dv)];
  const keten = "#d6ccb8", ketenG = "#9a907e", govde = "#c8bea8", kn = BP.kontur, w = Math.max(2, s * 0.08);
  return (
    <g strokeLinejoin="round">
      {/* uzak yarım kanatlar (gövdenin arkasında, sağ-üst) */}
      <path d={`M${pts(kanat(3.55, 2.6, 1.3))} Z`} fill={ketenG} stroke={kn} strokeWidth={w} />
      <path d={`M${pts(kanat(1.9, 2.4, 1.1))} Z`} fill={ketenG} stroke={kn} strokeWidth={w} />
      {/* şamandıralar + dikmeler */}
      <path d={`M${pts([P(-5.6, 0.2), P(-4.8, 0), P(0.6, 0), P(0.9, 0.45), P(-5.2, 0.62)])} Z`} fill="#8a7f72" stroke={kn} strokeWidth={w} />
      <path d={`M${pts([P(4.4, 0.55), P(5.4, 0.5), P(5.5, 0.85), P(4.5, 0.9)])} Z`} fill="#8a7f72" stroke={kn} strokeWidth={w} />
      {[-4.2, -1.2].map((u, i) => <path key={i} d={`M${pts([P(u, 0.6), P(u + 0.3, 1.6)])} M${pts([P(u + 0.5, 0.6), P(u + 0.2, 1.6)])}`} stroke={kn} strokeWidth={w * 0.7} />)}
      {/* gövde: burun motor kaportası, kıça incelir; kuyruk dikmesi ve yatay kuyruk */}
      <path d={`M${pts([P(-6, 1.6), P(-5.2, 1.5), P(5.6, 2.1), P(6, 2.4), P(5.6, 2.6), P(-5.2, 2.9), P(-6, 2.8)])} Z`} fill={govde} stroke={kn} strokeWidth={w} />
      <path d={`M${pts([P(-6, 1.6), P(-4.6, 1.52), P(-4.6, 2.9), P(-6, 2.8)])} Z`} fill="#6a6470" />
      <path d={`M${pts([P(4.6, 2.55), P(5.2, 3.7), P(5.9, 3.75), P(6, 2.5)])} Z`} fill={govde} stroke={kn} strokeWidth={w} />
      <path d={`M${pts([P(4.2, 2.3), P(6.2, 2.3), P(6.6, 2.0), P(4.6, 2.0)])} Z`} fill={ketenG} stroke={kn} strokeWidth={w * 0.8} />
      <ellipse cx={X(-6.15)} cy={Y(2.2)} rx={Math.max(2, s * 0.12)} ry={s * 1.25} fill="none" stroke={kn} strokeWidth={w * 0.7} opacity={0.7} />
      {/* yakın yarım kanatlar (kameraya, sol-alt) + kanat arası dikmeler */}
      <path d={`M${pts(kanat(1.9, -2.6, -1.5))} Z`} fill={keten} stroke={kn} strokeWidth={w} />
      <path d={`M${pts(kanat(3.55, -2.9, -1.7))} Z`} fill={keten} stroke={kn} strokeWidth={w} />
      {[[-3.5, -1.0], [-1.6, -1.0]].map(([u, dv], i) => <line key={i} x1={X(u - 1.3)} y1={Y(1.9 + dv * 0.5)} x2={X(u - 1.45)} y2={Y(3.55 + dv * 0.55)} stroke={kn} strokeWidth={w * 0.8} />)}
      <polyline points={pts([P(-2.6 - 2.9, 3.55 - 1.7), P(-0.6 - 2.9, 3.55 - 1.7), P(-0.6, 3.55)])} fill="none" stroke={BP.kenar} strokeWidth={w} />
      <polyline points={pts([P(-5.2, 2.9), P(5.6, 2.6)])} fill="none" stroke={BP.kenar} strokeWidth={w * 0.9} />
    </g>
  );
};
// motorbot (gemi filikası değil, tek motorlu bot): yan görünüş, birim m; oturan figürler (siluet < %5), ikisi sargılı
const Bot: React.FC<{ x: number; y: number; s: number; t: number; motor: number; seed: string }> = ({ x, y, s, t, motor, seed }) => {
  const P = (u: number, v: number): P2 => [x + u * s, y - v * s];
  return (
    <g strokeLinejoin="round">
      {motor > 0 && Array.from({ length: 5 }).map((_, i) => <ellipse key={i} cx={x - 4.8 * s - i * s * 1.2} cy={y + 2} rx={s * (0.8 + i * 0.5)} ry={s * 0.15 + 2} fill={BP.kopuk} opacity={(0.8 - i * 0.14) * motor * (0.8 + 0.2 * Math.sin(t * 9 + i))} />)}
      {Array.from({ length: 6 }).map((_, i) => { const u = -3 + i * 1.2, b = 0.95 + 0.1 * rr(`${seed}b${i}`); const sar = i === 1 || i === 4;
        return <g key={i}><path d={`M${pts([P(u - 0.35, 0.9), P(u + 0.35, 0.9), P(u + 0.3, 0.9 + b * 0.6), P(u - 0.3, 0.9 + b * 0.62)])} Z`} fill="#2c283e" />
          <circle cx={P(u, 1.75)[0]} cy={P(u, 1.75)[1]} r={s * 0.23} fill="#2c283e" />
          {sar && <path d={`M${pts([P(u - 0.24, 1.82), P(u + 0.24, 1.86)])}`} stroke="#c8c0b4" strokeWidth={Math.max(2, s * 0.12)} />}
          <path d={`M${pts([P(u + 0.3, 0.9), P(u + 0.3, 1.5)])}`} stroke={BP.kenar} strokeWidth={1.6} opacity={0.8} /></g>; })}
      <path d={`M${pts([P(-4.8, 0.95), P(4.2, 1.05), P(4.9, 1.25), P(4.6, 0.3), P(3.5, -0.05), P(-4.4, -0.05), P(-4.9, 0.4)])} Z`} fill="#7a6252" stroke={BP.kontur} strokeWidth={2.5} />
      <path d={`M${pts([P(-4.6, 0.5), P(4.5, 0.6)])}`} stroke="#5a4840" strokeWidth={Math.max(2, s * 0.1)} />
      <polyline points={pts([P(-4.8, 0.95), P(4.2, 1.05), P(4.9, 1.25)])} fill="none" stroke={BP.kenar} strokeWidth={3} />
      <path d={`M${pts([P(-4.4, 0.95), P(-3.6, 0.95), P(-3.6, 1.6), P(-4.4, 1.55)])} Z`} fill="#4e4a66" stroke={BP.kontur} strokeWidth={1.6} />
    </g>
  );
};
// tur-13 (P06): Meis tarafından (su seviyesi) bakışta geminin arkasındaki Anadolu kıyısı — dünya metresiyle izdüşüm (zoom/pan ile tutarlı)
// sırt profili metre cinsinden (seed'li tepe kümeleri); ön sırt kıyıda (gemiden ~2.4 km), arka dağlar ~9 km. Güneş kameranın arkasında-solda → yamaçlar önden ışıkta (sıcak).
const sirtM = (x0: number, x1: number, tepeler: [number, number, number][], seed: string, adim: number, puruz: number) => {
  const A: [number, number][] = [];
  for (let x = x0; x <= x1; x += adim) { let h = 0; for (const [c, hh, w] of tepeler) h += hh * Math.exp(-(((x - c) / w) ** 2)); A.push([x, h + (rr(`${seed}${Math.round(x / adim)}`) - 0.5) * puruz]); }
  return A;
};
const SIRT_ON = sirtM(-3000, 3000, [[-900, 260, 520], [-250, 330, 380], [420, 300, 420], [1100, 380, 500], [1900, 260, 520], [-1800, 300, 600]], "ana1", 40, 14);
const SIRT_ARKA = sirtM(-9000, 9000, [[-3000, 900, 1800], [500, 1200, 1600], [3600, 1000, 2000], [-6500, 800, 2200]], "ana2", 160, 40);
const AnadoluArka: React.FC<{ F: number; Zc: number; xc: number; yh: number; t: number; p: number; cakim: { kare: number; x: number; h: number }[] }> = ({ F, Zc, xc, yh, t, p, cakim }) => {
  const pr = (Z: number) => (q: [number, number]): P2 => [540 + (q[0] - xc) * F / (Z - Zc), yh - q[1] * F / (Z - Zc)];
  const Zon = 2800, Zar = 9000, on = SIRT_ON.map(pr(Zon)), ar = SIRT_ARKA.map(pr(Zar));
  const sirtR = mix("#b8957e", BP.sirt[2], 0.22), arR = mix(mix(BP.sirt[1], BP.bugu, 0.3), "#c8a8a0", 0.25);
  const s = F / (Zon - Zc);
  return (
    <g>
      <Flu s={1.6}><Sirt A={ar} alt={yh + 4} renk={arR} /></Flu>
      <rect x={-20} y={yh - 70} width={1120} height={70} fill={BP.bugu} opacity={0.3} />
      <Flu s={0.8}><g>
        <Sirt A={on} alt={yh + 4} renk={sirtR} golge={mix(BP.sirt[3], BP.toprak, 0.15)} bant={3} />
        <Tara d={`M${on[0][0]},${yh + 4} L${pts(on.map((q) => [q[0] + 14, q[1] + 22] as P2))} L${on[on.length - 1][0]},${yh + 4} Z`} aci={105} aralik={9} kalin={2} renk={BP.tasDerin} alfa={0.22} kutu={[-20, yh - 700, 1100, yh + 4]} />
        {/* maki lekeleri (seed'li, yamaca bağlı) + kıyı kayalık şeridi */}
        {Array.from({ length: 70 }).map((_, i) => { const X = -3000 + rr(`ak${i}`) * 6000; let H = 0; for (let j = 1; j < SIRT_ON.length; j++) if (SIRT_ON[j][0] >= X) { H = SIRT_ON[j][1]; break; }
          const hm = H * (0.1 + 0.75 * rr(`akh${i}`)), q = pr(Zon)([X, hm]), L = (14 + 22 * rr(`akl${i}`)) * s; if (q[0] < -60 || q[0] > 1140) return null;
          return <g key={`ak${i}`}><path d={`M${q[0]},${q[1]} l${L * 0.5},${-L * 0.18} l${L * 0.5},${L * 0.08} l${-L * 0.2},${L * 0.22} Z`} fill={mix(BP.tasGolge, sirtR, 0.45)} /><path d={`M${q[0]},${q[1]} l${L * 0.5},${-L * 0.18} l${L * 0.5},${L * 0.08}`} stroke={BP.kenar} strokeWidth={Math.max(1.5, s * 1.2)} fill="none" opacity={0.85} /></g>; })}
        {Array.from({ length: 300 }).map((_, i) => { const X = -3000 + rr(`am${i}`) * 6000; let H = 0; for (let j = 1; j < SIRT_ON.length; j++) if (SIRT_ON[j][0] >= X) { H = SIRT_ON[j][1]; break; }
          const hm = H * (0.08 + 0.8 * rr(`amh${i}`)), q = pr(Zon)([X, hm]); return q[0] < -30 || q[0] > 1110 ? null : <ellipse key={i} cx={q[0]} cy={q[1]} rx={(7 + 12 * rr(`amr${i}`)) * s} ry={(4 + 6 * rr(`amr${i}`)) * s} fill={i % 3 ? mix(BP.maki, BP.bugu, 0.25) : mix(BP.makiGolge, BP.bugu, 0.2)} />; })}
        <rect x={-20} y={yh - 6 * s} width={1120} height={6 * s + 4} fill={mix(BP.tasOrta, BP.bugu, 0.3)} />
      </g></Flu>
      {/* namlu çakımları (uzak kıyıda küçük) + barut dumanı (yükselir, rüzgârla sağa açılır, incelerek dağılır) */}
      {cakim.map((c, i) => { const a = p - c.kare; if (a < 0) return null; const q = pr(Zon)([c.x, c.h]);
        return <g key={i}>
          {a < 7 && <g><circle cx={q[0]} cy={q[1]} r={(6 + 12 * (1 - a / 7)) * Math.min(1.6, s)} fill="#ffb84e" opacity={0.9} /><circle cx={q[0]} cy={q[1]} r={(2.5 + 5 * (1 - a / 7)) * Math.min(1.6, s)} fill="#fff0c4" /></g>}
          {a < 200 && Array.from({ length: 4 }).map((_, j) => { const u = a / 200, r = (4 + 12 * u + 3 * j) * Math.min(1.6, s);
            return <circle key={j} cx={q[0] + ((j - 1.5) * 4 + u * (30 + 8 * j)) * Math.min(1.6, s)} cy={q[1] - (4 + u * (26 + 6 * j)) * Math.min(1.6, s)} r={r} fill={mix("#d8c4b4", sirtR, 0.3 + 0.6 * u)} opacity={0.6 * (1 - u)} />; })}
        </g>; })}
    </g>
  );
};
const GemiSahne: React.FC<{ plan: Plan; p: number; kilit: Kilit }> = ({ plan, p, kilit }) => {
  const t = p / 60, h0 = param<number>(plan, "gun_yuksekligi", 22), seed = param<number>(plan, "seed", 181), ruz = ruzgar(190);
  const Y = param<Yol>(plan, "yol", { kare: [0, 413], Zd: [150, 330], F: [4050, 2550], h: [4, 4], xc: [39.5, -6.6], yh: [1290, 1290] });
  const Zd = ara(p, Y.kare, Y.Zd), F = ara(p, Y.kare, Y.F), hg = ara(p, Y.kare, Y.h), xc = ara(p, Y.kare, Y.xc), yh = ara(p, Y.kare, Y.yh);
  const durum = param<GemiDurum>(plan, "gemi_durum", "demirli");
  // tur-13: arka "anadolu" (Meis'ten bakış) + ayna (gemi diğer bordasından: baş sağda) + atis olayları + kayık ön planı + kıç köpüğü
  const arka = param<"meis" | "anadolu">(plan, "arka", "meis"), ayna = param<boolean>(plan, "ayna", false), dir = ayna ? -1 : 1;
  const onP = param<"halat" | "kayik">(plan, "on", "halat"), kicK = param<boolean>(plan, "kic_kopuk", false);
  const atis = param<string>(plan, "olay", "") === "atis" ? { atislar: param<number[]>(plan, "atislar", [186, 262, 404]), sutunlar: param<number[]>(plan, "sutunlar", [246, 322]), isabet: param<number>(plan, "isabet", 464), cakim_x: param<number[] | undefined>(plan, "cakim_x", undefined) } : null;
  const pxm = F / Zd, wl = yh + (hg * F) / Zd, X0 = 540 + dir * (BAS_X - xc) * pxm;
  const sm = (m: number) => X0 + dir * m * pxm, sh = (hm: number) => wl - hm * pxm * GEMI.abarti;
  const shipT = `translate(${X0} ${wl})${ayna ? " scale(-1 1)" : ""}`, yanT = (dy: number) => `translate(${X0} ${wl + dy})${ayna ? " scale(-1 1)" : ""}`;
  const fA = 0.8 * Math.sqrt(F / 4050), tr = () => `translate(${540 - 330 * fA / 0.8 - xc * 2} ${yh + 12}) scale(${fA}) translate(-540 -990)`;
  const ZS = 389.4, kk = kam([xc, hg, ZS - Zd], F, [540, yh]);
  const V = arka === "anadolu" ? denizSatir("gsA", 3400, 1.5, 6, 3000, (u) => (u < -0.33 ? 0.3 : u < 0.33 ? 0.22 : 0.12), 2600) : denizSatir("gs", 4050, 4, 14, 2200, (u) => (u < -0.33 ? 0.06 : u < 0.33 ? 0.2 : 0.5), 2600);
  const uc = param<{ in: [number, number]; gevse: [number, number] } | null>(plan, "ucak", null);
  const bot = param<{ motor: number; cikis: number } | null>(plan, "bot", null);
  const yg = param<number>(plan, "yangin_guc", 0);
  const hc = sm(90.3), hy = sh(11.6);
  // uçak: derrick kancasından (bumba ucu m 116.5, h 15.8) iner; şamandıra tabanı yüksekliği hf
  let ucakEl: React.ReactNode = null;
  if (uc) {
    const e = ara(p, [uc.in[0], uc.in[1]], [0, 1]), hf = 8.4 * (1 - e) + (p > uc.in[1] ? 0 : 0), sal = Math.sin(t * 1.4) * 0.35 * (1 - e);
    const um = 108.5 + sal, X = (m: number) => sm(um) + m * pxm * 1.25, Yh = (v: number) => wl - (hf + v) * pxm * 1.25 * 0.95;
    const gev = ara(p, uc.gevse, [0, 1], GIRIS), tip: P2 = [sm(116.5), sh(15.8)], kanca: P2 = [X(-1.6), Yh(3.65)];
    const sarkma = 120 * gev * pxm / 27;
    const sicra = p >= uc.in[1] ? (p - uc.in[1]) / 50 : -1;
    ucakEl = <g>
      <path d={`M${tip[0]},${tip[1]} Q${(tip[0] + kanca[0]) / 2 + sarkma * 0.6},${(tip[1] + kanca[1]) / 2 + sarkma} ${kanca[0]},${kanca[1]}`} stroke={BP.halat} strokeWidth={Math.max(2, pxm * 0.07)} fill="none" />
      <Ucak X={X} Y={Yh} s={pxm * 1.25} />
      {sicra >= 0 && sicra < 1.6 && <g>{[0, 1].map((i) => <ellipse key={i} cx={X(-2.4 + i * 4)} cy={wl + 3} rx={pxm * (2.2 + 4 * Math.min(1, sicra)) * (i ? 0.5 : 1)} ry={4 + 6 * Math.min(1, sicra)} fill="none" stroke={BP.kopuk} strokeWidth={3} opacity={Math.max(0, 0.9 - sicra * 0.55)} />)}
        {sicra < 0.5 && Array.from({ length: 8 }).map((_, i) => <circle key={`d${i}`} cx={X(-4 + i * 1.1)} cy={wl - (12 + 18 * rr(`ud${i}`)) * Math.sin(Math.PI * sicra * 2)} r={2.5} fill={BP.kopuk} />)}</g>}
    </g>;
    kilit.push({ ad: "deniz uçağı", p: [X(0), Yh(2)], tur: "dokunus" });
  }
  // bot: gemiden ayrılır (motor), sağ kenardan çıkar
  let botEl: React.ReactNode = null;
  if (bot) {
    const q = ara(p, [bot.motor, bot.cikis], [0, 1], (x) => x * x * (3 - 2 * x)), bx = param<number>(plan, "bot_x0", -2.1) + q * 110, bz = ZS - 110 - q * 60;
    const zr = bz - (ZS - Zd), s = F / zr, x = 540 + (bx - xc) * s, y = yh + (hg * F) / zr;
    const motor = p >= bot.motor ? 1 : 0;
    botEl = <g>
      {motor > 0 && q > 0.02 && [-1, 1].map((sg) => <path key={sg} d={`M${x - 4.6 * s},${y + 2} L${x - 4.6 * s - 420 * q * s / 14},${y + 2 + sg * 26 * q * s / 14}`} stroke={BP.kopuk} strokeWidth={3} opacity={0.75} />)}
      <Bot x={x} y={y} s={s} t={t} motor={motor} seed="bt" />
    </g>;
    kilit.push({ ad: "bot", p: [Math.min(1000, x), y], tur: "dokunus" });
  }
  // atış olayları (P06): su sütunları geminin iki yanında (baş önü / kıç ötesi), isabet hangarda (krem çakım + KOR çekirdek + duman)
  let atisEl: React.ReactNode = null;
  if (atis) {
    const isab = p >= atis.isabet ? p - atis.isabet : -1, k9 = pxm / 9.75;
    atisEl = <g>
      {atis.sutunlar.map((q, i) => <SuSutunu key={i} x={i === 0 ? sm(-14) : sm(132)} y={wl + (i === 0 ? 6 : 4)} p={p} bas={q} seed={`ss${i}`} boy={(i === 0 ? 30 : 27) * pxm} gen={11 * pxm} />)}
      {isab >= 0 && <g>
        <Duman taban={[hc, hy - 26 * k9]} t={isab / 60 - 600 / 40} hiz={40} genis0={14 * k9} genis1={70 * k9} ruz={ruz} seed="ksd" boy={600} tara={false} />
        {isab < 14 && <path d={`M${pts(Array.from({ length: 14 }).map((_, i) => { const a = (i / 14) * 6.283, r = (i % 2 ? 0.45 : 1) * (70 + 50 * (isab / 14)) * k9 * (0.7 + 0.5 * rr(`ib${i}`)); return [hc + Math.cos(a) * r, hy - 10 * k9 + Math.sin(a) * r * 0.75] as P2; }))} Z`} fill={BP.cakim} opacity={0.85 * (1 - isab / 14)} />}
        {isab < 80 && (() => { const kk2 = (1 - isab / 120) * k9, L = (s2: string, Rr: number): P2[] => Array.from({ length: 9 }).map((_, i) => { const a = (i / 9) * 6.283, r = Rr * (0.6 + 0.6 * rr(`${s2}${i}`)) * (1 + 0.08 * Math.sin(t * 5 + i)); return [hc + Math.cos(a) * r * 1.3, hy + 2 + Math.sin(a) * r * 0.7 - (a > 3.4 && a < 6 ? r * 0.4 : 0)] as P2; });
          return <g><path d={egriYol(L("ik1", 52 * kk2))} fill="#c4562c" opacity={0.7} /><path d={egriYol(L("ik2", 34 * kk2))} fill="#e2742c" /><path d={egriYol(L("ik4", 20 * kk2))} fill="#ffb84e" /></g>; })()}
      </g>}
    </g>;
    kilit.push({ ad: "isabet (hangar)", p: [hc, hy], tur: "dokunus" });
  }
  const dsA = atis && p >= atis.isabet && p < atis.isabet + 14 ? (1 - (p - atis.isabet) / 14) * 2 : 0;
  const govde = (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <RenkKaydi><Isleme aci={105}>
        <Gok sinir={[yh - 900, yh - 640, yh - 480, yh - 330]} renk={gokSutun(h0)} seed={seed} hale={[1190, yh - 180]} haleR={1.2} t={t}
          bulut={[[-60, 520, yh - 760, 34, "g1"], [380, 1140, yh - 520, 30, "g2"], [640, 1040, yh - 640, 18, "g3"], [-80, 300, yh - 330, 16, "g4"]]} />
        {arka === "anadolu" ? <AnadoluArka F={F} Zc={ZS - Zd} xc={xc} yh={yh} t={t} p={p} cakim={(atis?.atislar ?? []).map((k2, i) => ({ kare: k2, x: (atis?.cakim_x ?? [-460, -330, -210])[i] ?? -300, h: 110 + 25 * i }))} /> : <MeisArka tr={tr} t={t} seed={seed} />}
        <g transform={yanT(2)}><GemiYansima pxm={pxm} seed={seed} boy={0.75} /></g>
        <rect x={-20} y={yh + (arka === "anadolu" ? 2 : 14)} width={1120} height={Math.max(0, wl - yh - 12)} fill={BP.su} />
        {yg > 0 && <Duman taban={[hc + 30, hy]} t={t} hiz={95} genis0={40} genis1={480} ruz={ruz * 0.6} seed="gsd" boy={1600} yogun={0.9} tara={false} isikRenk="#c9aea6" />}
        <g transform={shipT}><KonturTitreme derinlik="orta" seed={seed + 2} olcek={1.2}><GemiProfil pxm={pxm} durum={durum} seed={seed} /></KonturTitreme></g>
        {kicK && Array.from({ length: 7 }).map((_, i) => <ellipse key={`kk${i}`} cx={sm(118) + dir * (8 + i * 2.6 * pxm) + Math.sin(t * 3 + i) * 3} cy={wl + 3 + i * 1.5} rx={pxm * (2.2 + i * 1.1)} ry={3 + i * 0.8} fill={BP.kopuk} opacity={(0.85 - i * 0.1) * (0.75 + 0.25 * Math.sin(t * 6 + i * 1.7))} />)}
        {atisEl}
        {yg > 0 && <Yangin x0={sm(76.1)} x1={sm(104.6)} yCati={hy} yTaban={sh(GEMI.borda + 0.2)} guc={yg} t={t} ruz={ruz} cerceve={[76.1, 80, 84.5, 89, 93.5, 98, 102, 104.6].map(sm)} n={9} olcek={pxm / 10.4} duzensiz={1} />}
        <rect x={-10} y={wl + 1} width={1100} height={1940 - wl} fill={mix(BP.su, BP.bugu, 0.08)} />
        <DenizCiz V={V} k={arka === "anadolu" ? kam([xc, hg, 0], F, [540, yh]) : kk} t={t} isik={BP.suYol} golge={BP.suGolge} ymin={wl + 4} />
        <g transform={yanT(2)} opacity={0.5}><GemiYansima pxm={pxm} seed={seed + 1} boy={0.5} /></g>
        {yg > 0 && Array.from({ length: 24 }).map((_, i) => { const y = wl + 6 + i * 8 + i * i * 0.2, gen = (sm(104.6) - sm(76.1)) * (0.8 - i * 0.015), x = hc + (rr(`gy${i}`) - 0.5) * 50 + Math.sin(t * 2.2 + i) * 5;
          return <line key={`a${i}`} x1={x - gen / 2} x2={x + gen / 2} y1={y} y2={y} stroke={i % 2 ? "#e2742c" : "#ffb84e"} strokeWidth={3.5} strokeDasharray={`${gen * 0.25} ${gen * 0.12}`} opacity={(1 - i / 26) * yg} />; })}
        {ucakEl}
        {botEl}
        {/* ön plan: rıhtım halatı (flu, z ≈ 6 m) | kayık bordası (P06: su seviyesi, Meis tarafı) */}
        {onP === "kayik" ? <Flu s={8}><path d="M-60,1990 L-60,1800 C240,1736 640,1722 1140,1790 L1140,1990 Z" fill="#6a5446" /><path d="M-60,1800 C240,1736 640,1722 1140,1790" stroke="#8a6e5a" strokeWidth={30} fill="none" /><path d="M-60,1784 C240,1720 640,1706 1140,1774" stroke={BP.kenar} strokeWidth={6} fill="none" opacity={0.8} />
          <path d="M760,1990 L900,1700" stroke="#4a3a32" strokeWidth={26} /><path d="M120,1880 C300,1840 420,1850 520,1900" stroke={BP.halat} strokeWidth={16} fill="none" /></Flu> : <Flu s={7}><path d="M-40,1980 C200,1820 420,1760 1120,1700" stroke={BP.halat} strokeWidth={34} fill="none" /><path d="M-40,1968 C200,1808 420,1748 1120,1688" stroke={mix(BP.halat, BP.kenar, 0.5)} strokeWidth={6} fill="none" /></Flu>}
        {Array.from({ length: 30 }).map((_, i) => { const x = 380 + ((rr(`gz${i}`) * 700 + t * (6 + rr(`gzv${i}`) * 8)) % 700), y = 700 + rr(`gzy${i}`) * 900; return <circle key={i} cx={x} cy={y} r={1.2 + rr(`gzr${i}`) * 1.2} fill="#efe0cc" opacity={0.3} />; })}
      </Isleme></RenkKaydi>
    </svg>
  );
  if (dsA > 0) return <div style={{ position: "absolute", inset: 0, transform: `translate(${Math.sin(p * 2.3) * dsA}px, ${Math.cos(p * 3.1) * dsA * 0.6}px) scale(1.004)` }}>{govde}</div>;
  return govde;
};

// ===================================================================================================
// batarya-genis — P05a: alçak açı, top hattı yamaçta derinlikte, truck sağa (paralaks), uzakta Meis + küçük gemi
// ===================================================================================================
const BataryaGenis: React.FC<{ plan: Plan; p: number; kilit: Kilit }> = ({ plan, p, kilit }) => {
  const t = p / 60, seed = 193, ruz = ruzgar(170), F = 2400;
  const dx = ara(p, [0, 105], [0, 1.0], GIRIS); // m (truck sağa); katman kayması = −(1 − dx)·F/Z (son kare = tasarım yerleşimi)
  const kay = (Z: number) => (1.0 - dx) * F / Z;
  const SY2 = 880, tr = () => `translate(${690 + kay(4000)} ${SY2}) scale(0.5) translate(-540 -758)`;
  const kenar: P2[] = [[-20, 690], ...kirik([-20, 690], [300, 860], 6, 8, "bk1"), ...kirik([300, 860], [640, 1020], 6, 8, "bk2"), ...kirik([640, 1020], [1100, 1150], 6, 8, "bk3")];
  const toplar: [number, number, number, number][] = [[118, 772, 0.24, 56], [262, 852, 0.33, 44], [430, 960, 0.48, 30]]; // x, y (yakın teker tabanı), ölçek, Z
  const fig: (AskerTip & { Z: number })[] = [
    { ad: "teğmen", x: 312, y: 880, B: 1.75 * F / 42, yon: 1, bas: "kabalak-subay", kol: "yan", ek: ["durbun"], cizme: true, biyik: "ince", Z: 42 },
    { ad: "E1", x: 232, y: 856, B: 1.75 * F / 46, yon: 1, bas: "kabalak-er", kol: "yan", ek: ["tufek"], biyik: "dolu", Z: 46 },
    { ad: "E2", x: 92, y: 772, B: 1.75 * F / 58, yon: 1, bas: "kabalak-er", kol: "yan", ek: ["matara"], biyik: "dolu", Z: 58 },
    { ad: "E3", x: 156, y: 790, B: 1.75 * F / 56, yon: 1, bas: "kasket", kol: "yan", ek: ["battaniye"], biyik: "yok", Z: 56 },
  ];
  kilit.push({ ad: "ön top", p: [760 + kay(12) * 0, 1180], tur: "kurulum" });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <RenkKaydi><Isleme aci={105}>
        <Gok sinir={[160, 340, 560, 730]} renk={gokSutun(22)} seed={seed} hale={[1160, 640]} haleR={1.1} t={t}
          bulut={[[-60, 520, 260, 30, "b1"], [420, 1140, 420, 26, "b2"], [640, 1080, 600, 14, "b3"], [-80, 280, 700, 12, "b4"]]} />
        <MeisArka tr={tr} t={t} seed={181} />
        <g transform={tr()}><g transform={`translate(190 ${1040})`}><GemiProfil pxm={11250 / 2000} durum="demirli" seed={181} /></g></g>
        <rect x={-20} y={SY2 + 150} width={1120} height={1000} fill={mix(BP.su, BP.bugu, 0.12)} />
        {Array.from({ length: 60 }).map((_, i) => { const x = rr(`bs${i}`) * 1100, y = SY2 + 152 + rr(`bsy${i}`) * 300; return <line key={i} x1={x} x2={x + 12 + rr(`bsl${i}`) * 20} y1={y} y2={y} stroke={x > 600 ? BP.suYol : BP.suGolge} strokeWidth={2.5} />; })}
        {/* yamaç (alçak açı): sol-üstten sağ-alta inen sırt; üst kenar güneşte, gövde sıcak toprak → koyu */}
        <g transform={`translate(${kay(30)} 0)`}>
          <defs><linearGradient id="bgZem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b0927e" /><stop offset="0.45" stopColor="#9a7e70" /><stop offset="1" stopColor="#5a4c5c" /></linearGradient></defs>
          <path d={`M${pts(kenar)} L1400,1960 L-300,1960 L-300,690 Z`} fill="url(#bgZem)" stroke={BP.kontur} strokeWidth={2.5} />
          <polyline points={pts(kenar)} fill="none" stroke={BP.kenar} strokeWidth={4} />
          {[[60, 900, 80], [380, 1060, 90], [700, 1180, 110], [200, 1260, 120]].map(([x, y, L], i) => <g key={`kr${i}`}><path d={`M${x - 7},${y} Q${x - 10},${y + L * 0.5} ${x + 2},${y + L} Q${x + 3},${y + L * 0.5} ${x + 8},${y} Z`} fill="#2e2a44" opacity={0.7} /><path d={`M${x + 8},${y} Q${x + 4},${y + L * 0.5} ${x + 3},${y + L}`} stroke={BP.kenar} strokeWidth={2} fill="none" opacity={0.7} /></g>)}
        </g>
        {/* top hattı (Z 30–56) + figürler (< %5, siluet + kenar ışığı); her katman kendi derinliğiyle kayar */}
        {toplar.map(([x, y, s, Z], i) => <g key={`t${i}`} transform={`translate(${x + kay(Z)} ${y}) scale(${s}) translate(-432 -1331)`}><AnaTop t={t} /></g>)}
        {fig.map((a) => <g key={a.ad} transform={`translate(${kay(a.Z)} 0)`}><Asker a={a} /></g>)}
        {/* ön plan top (Z 12): kalkan ≈ 260 px, sağ-alt */}
        <g transform={`translate(${760 + kay(12)} 1300) scale(0.85) translate(-432 -1331)`}><AnaTop t={t} /></g>
        {[[560, 1250], [900, 1290], [330, 1400], [980, 1520], [120, 1560]].map(([x, y], i) => <Ot key={i} x={x + kay(14)} y={y} L={50 + rr(`bo${i}`) * 40} ruz={ruz} t={t} seed={`bo${i}`} n={6} w={3.5} />)}
        {/* dal örtüsü (Z 3, flu): topun çevresinde, kamera kaydıkça açılır */}
        <g transform={`translate(${kay(3) * 0.35} 0)`}><Flu s={7}><Dal a={[1120, 900]} b={[760, 1080]} k={2} seed="bd1" /><Dal a={[1120, 1700]} b={[700, 1520]} k={2.2} seed="bd2" /><Dal a={[-40, 1820]} b={[300, 1640]} k={2} seed="bd3" /></Flu></g>
        {Array.from({ length: 26 }).map((_, i) => { const x = ((rr(`bz${i}`) * 1200 + t * ruz * 12) % 1200 + 1200) % 1200 - 60, y = 700 + rr(`bzy${i}`) * 900; return <circle key={i} cx={x} cy={y} r={2 + rr(`bzr${i}`) * 2} fill="#e8d4b0" opacity={0.4} />; })}
      </Isleme></RenkKaydi>
    </svg>
  );
};

// ===================================================================================================
// durbun-insert — P05b: el + manşet + dürbün (yüz yok), başparmak odak halkasını çevirir (tık = temas)
// ===================================================================================================
const DurbunInsert: React.FC<{ plan: Plan; p: number; kilit: Kilit }> = ({ plan, p, kilit }) => {
  // tur-9 (jüri-2): arkadan, sağ omuz üstünden. Oküler uçları başın (göz hizası) arkasında kalır — baş siluetine değer;
  // tüpler sağa-yukarı derinliğe (Meis limanı) uzanır, perspektifle incelir; objektif yüzü izleyiciden öte yana bakar (halka görünmez).
  // Sağ el yakın tüpü alttan sarar, işaret parmağı köprüdeki odak halkasında; sol elin parmakları uzak tüpün üstünde. Yüz yok.
  const b0 = param<number>(plan, "insert_bas", 119), q = p - b0, t = p / 60;
  const hk = param<{ bas: number; bit: number; tik: number }>(plan, "halka", { bas: 20, bit: 70, tik: 60 });
  const it = ara(q, [0, 90], [0, 1], GIRIS), s = 1 + 0.05 * it;
  const don = ara(q, [hk.bas, hk.tik], [0, 1]), parmak = Math.sin(Math.PI * Math.min(1, Math.max(0, (q - hk.bas) / (hk.bit - hk.bas)))) * 3;
  const tr = () => `translate(700 700) scale(1.25) translate(-480 -900)`;
  const kn = BP.kontur, deri = "#2e2830", metal = "#6a6480", ten = "#b48a72", tenG = "#7c5c58", kumas = "#5a564a";
  // tüp: arka (oküler, baş arkasında) a → ön (objektif, derinlikte) b; ön uç yalnız dış kenar yayı (izleyiciden öte bakar)
  const tup = (a: P2, b: P2, r0: number, r1: number) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    const uc = Array.from({ length: 9 }).map((_, i) => { const th = -Math.PI / 2 + (i / 8) * Math.PI; return [b[0] + (nx * Math.sin(-th) + (dx / L) * Math.cos(th) * 0.35) * r1, b[1] + (ny * Math.sin(-th) + (dy / L) * Math.cos(th) * 0.35) * r1] as P2; });
    return { yol: `M${pts([[a[0] + nx * r0, a[1] + ny * r0], [b[0] + nx * r1, b[1] + ny * r1]])} L${pts(uc)} L${pts([[b[0] - nx * r1, b[1] - ny * r1], [a[0] - nx * r0, a[1] - ny * r0]])} Z`,
      ust: [[a[0] - nx * r0, a[1] - ny * r0], [b[0] - nx * r1, b[1] - ny * r1]] as P2[], alt: [[a[0] + nx * r0, a[1] + ny * r0], [b[0] + nx * r1, b[1] + ny * r1]] as P2[], n: [nx, ny] as P2, d: [dx / L, dy / L] as P2 }; };
  const T2 = tup([300, 840], [560, 720], 54, 40), T1 = tup([320, 935], [600, 812], 62, 46); // T2 uzak (sol-üst), T1 yakın (sağ-alt)
  const kafa: P2 = [170, 880];
  kilit.push({ ad: "odak halkası", p: [395, 860], tur: "dokunus" });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <RenkKaydi><Isleme aci={105}>
        <Gok sinir={[180, 380, 560, 700]} renk={gokSutun(22)} seed={197} hale={[1150, 620]} haleR={1.25} t={t} bulut={[[-60, 520, 300, 30, "d1"], [420, 1140, 480, 26, "d2"]]} />
        <Flu s={4}><MeisArka tr={tr} t={t} seed={181} /><g transform={tr()}><g transform="translate(190 1040)"><GemiProfil pxm={11250 / 2000} durum="demirli" seed={181} /></g></g>
          <rect x={-20} y={940} width={1120} height={1100} fill={mix(BP.su, BP.bugu, 0.1)} />
          {Array.from({ length: 60 }).map((_, i) => { const x = rr(`ds${i}`) * 1100, y = 950 + rr(`dsy${i}`) * 950; return <line key={i} x1={x} x2={x + 18 + 30 * rr(`dsl${i}`)} y1={y} y2={y} stroke={x > 600 ? BP.suYol : BP.suGolge} strokeWidth={4} />; })}</Flu>
        <g transform={`translate(${kafa[0]} ${kafa[1]}) scale(${1.45 * s}) translate(${-kafa[0]} ${-kafa[1]})`}>
          {/* uzak tüp + sol el parmakları üstünde */}
          <path d={T2.yol} fill={mix(deri, BP.sirt[3], 0.2)} stroke={kn} strokeWidth={3} />
          <polyline points={pts(T2.ust)} fill="none" stroke={BP.kenar} strokeWidth={3} />
          <path d={egriYol([[400, 772], [430, 752], [470, 740], [488, 752], [470, 772], [430, 786]])} fill={ten} stroke={kn} strokeWidth={3} />
          {/* köprü + odak halkası */}
          <path d={`M${pts([[330, 860], [430, 806], [450, 846], [350, 900]])} Z`} fill="#3e3640" stroke={kn} strokeWidth={3} />
          <g transform="rotate(-25 395 840)"><rect x={366} y={818} width={60} height={42} rx={9} fill={metal} stroke={kn} strokeWidth={3} />
            <defs><clipPath id="dHalka3"><rect x={368} y={820} width={56} height={38} rx={8} /></clipPath></defs>
            <g clipPath="url(#dHalka3)">{Array.from({ length: 11 }).map((_, i) => { const x = 360 + ((i * 8 + don * 24) % 88); return <line key={i} x1={x} x2={x} y1={816} y2={862} stroke="#3e3850" strokeWidth={2.6} />; })}</g>
            <line x1={370} x2={422} y1={820} y2={820} stroke={BP.kenar} strokeWidth={2.6} /></g>
          {/* yakın tüp: deri, alt yarı taramalı gölge, üst kenar kontrajur ışığı */}
          <path d={T1.yol} fill={deri} stroke={kn} strokeWidth={4} />
          <Tara d={`M${pts([T1.alt[0], T1.alt[1], [(T1.alt[1][0] + T1.ust[1][0]) / 2, (T1.alt[1][1] + T1.ust[1][1]) / 2], [(T1.alt[0][0] + T1.ust[0][0]) / 2, (T1.alt[0][1] + T1.ust[0][1]) / 2]])} Z`} aci={60} aralik={7} kalin={2} renk="#141018" alfa={0.5} kutu={[240, 740, 660, 1020]} />
          <polyline points={pts(T1.ust)} fill="none" stroke={BP.kenar} strokeWidth={4} />
          {[0.35, 0.8].map((u, i) => { const c: P2 = [320 + 280 * u, 935 - 123 * u], r = 62 - 16 * u; return <path key={i} d={`M${c[0] + T1.n[0] * r},${c[1] + T1.n[1] * r} L${c[0] - T1.n[0] * r},${c[1] - T1.n[1] * r}`} stroke={metal} strokeWidth={6} />; })}
          {/* sağ el: avuç yakın tüpün altında, dört parmak tüpün yanından sarar; işaret parmağı odak halkasında (tek parça, iç çizgi yok) */}
          <path d={egriYol([[300, 1080], [360, 1010], [430, 975], [500, 950], [530, 905], [505, 880], [470, 905], [430, 930], [395, 925], [370, 900], [345, 940], [300, 1000], [262, 1050]])} fill={ten} stroke={kn} strokeWidth={4} />
          <path d={egriYol([[300, 1075], [360, 1012], [430, 978], [400, 1010], [340, 1060]])} fill={tenG} opacity={0.7} />
          <g transform={`rotate(${parmak} 380 905)`}><path d={egriYol([[350, 930], [362, 885], [380, 858], [404, 848], [414, 862], [398, 882], [384, 912], [372, 940]])} fill={ten} stroke={kn} strokeWidth={4} />
            <path d={`M${pts([[380, 858], [404, 848], [414, 862]])}`} stroke={BP.kenar} strokeWidth={3} fill="none" /></g>
          <path d={`M${pts([[500, 950], [530, 905], [505, 880]])}`} stroke={BP.kenar} strokeWidth={4} fill="none" />
          {/* manşet + ön kol aşağı (omuza) */}
          <path d={egriYol([[262, 1050], [330, 1010], [380, 1080], [330, 1260], [200, 1400], [80, 1380], [140, 1200]])} fill={kumas} stroke={kn} strokeWidth={4} />
          <path d={`M${pts([[276, 1042], [334, 1012], [376, 1076]])}`} stroke={BP.kenar} strokeWidth={4} fill="none" />
        </g>
        {/* baş arkası (kabalak) + omuz: oküler uçlarını örter — dürbün göze dayalı; yüz görünmez */}
        <Flu s={3}><g transform={`translate(${kafa[0]} ${kafa[1]}) scale(${1.45 * s}) translate(${-kafa[0]} ${-kafa[1]})`}>
          <path d={egriYol([[60, 760], [180, 730], [270, 790], [300, 900], [270, 1000], [180, 1040], [80, 1010], [40, 900]])} fill="#2a2628" />
          <path d={egriYol([[50, 770], [170, 712], [270, 760], [262, 800], [160, 772], [70, 812]])} fill="#3c3650" />
          <path d={`M${pts([[180, 732], [270, 790], [300, 900]])}`} stroke={BP.kenar} strokeWidth={4} fill="none" />
          <path d={egriYol([[-60, 1060], [100, 1020], [240, 1090], [300, 1300], [200, 1600], [-60, 1600]])} fill="#3c3830" />
          <path d={`M${pts([[100, 1020], [240, 1090], [290, 1240]])}`} stroke={BP.kenar} strokeWidth={4} fill="none" />
        </g></Flu>
      </Isleme></RenkKaydi>
    </svg>
  );
};

export const LimanBolumSahne: React.FC<{ g: string; plan: Plan; p: number; kilit: Kilit }> = ({ g, plan, p, kilit }) =>
  g === "kiyidan-olay" ? <KiyidanOlay plan={plan} p={p} kilit={kilit} /> : g === "gemi-sahne" ? <GemiSahne plan={plan} p={p} kilit={kilit} />
    : g === "batarya-genis" ? <BataryaGenis plan={plan} p={p} kilit={kilit} /> : <DurbunInsert plan={plan} p={p} kilit={kilit} />;
