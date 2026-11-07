// ===== SOKAK şablonu (SB2-SOKAK P04'ten) =====
// Perspektif sokak: proto/Sokak.tsx (cephe/zemin/sokakGenislik). sehir: bordeaux (gece | gün) · paris (yalnız gece, Proto).
// Tek ışık: gece réverbère (nokta, z 2.3, sokak ortası) · gün güneş (yönlü, sol-üst arkadan → gölge sağ-öne).
// Karakter: (z 1.25–4.5, u 0.12–0.88); yürüyüş yolu z/u dizisi + `yuru` jesti. Parallaks: gök .25, uzak .55, sokak 1.
// insert: { tur: "fare", bas } → bas..bas+66 arası SB2 fare insert'i (kendi temasları: pençe +9, çizme +20, TAK +30, dalış +50, tink +60).
import React from "react";
import { Sokak as SokakDekor, Tanimlar, zemin, sokakGenislik, reverbere, SokakOnPlan, Saat, Sehir } from "../../bolumler/blanc/proto/Sokak";
import { FareInsertSb2 } from "../../bolumler/blanc/sb2/Sb2SokakFare";
import { KonturTitreme } from "../../doku/KonturTitreme";
import { RenkKaydi } from "../../doku/Tarama";
import type { Isik } from "../../doku/Isik";
import { BDX_GECE_PALET } from "../../doku/Cephe";
import { DOKU_SEED } from "../../doku/sabitler";
import { karakterPoz, Yerlesim } from "../jestler";
import { KarakterCiz, karakterKilit, param, Sablon, SablonProps } from "../ortak";
import { deger, kameraHesapla, katDonusum } from "../zaman";

const OLCEK_K = 1.32 / sokakGenislik(1.3);
export const SOKAK_YER: Yerlesim = {
  yer: (z, u) => { const [x, y] = zemin(z, u); return { x, y, s: OLCEK_K * sokakGenislik(z) }; },
  faz: (dz, du) => dz * 9.9 + du * 6, // SB2 P04 kalibrasyonu (ayak kaymaz): 9.9 rad / z birimi
};
export const SOKAK_INSERT_SURE = 66;
const INSERT_P0 = 78; // FareInsertSb2 iç kare tabanı

const Izgara: React.FC<{ z: number; u: number }> = ({ z, u }) => {
  const [gx, gy] = zemin(z, u);
  const k = (sokakGenislik(z) / 1240) * 1.25;
  return (
    <g transform={`translate(${gx},${gy}) scale(${k})`}>
      <ellipse cx={0} cy={0} rx={72} ry={17} fill="#3a4258" />
      <ellipse cx={0} cy={0} rx={64} ry={14} fill="#07080e" />
      {Array.from({ length: 7 }).map((_, i) => <line key={i} x1={-48 + i * 16} y1={-10} x2={-52 + i * 17} y2={12} stroke="#4a4e5a" strokeWidth={5} />)}
    </g>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const sehir = param<Sehir>(plan, "sehir", "bordeaux");
  const saat = param<Saat>(plan, "saat", "gece");
  const gun = saat === "gun";
  const ins = param<{ tur: "fare"; bas: number } | null>(plan, "insert", null);
  if (ins && p >= ins.bas && p < ins.bas + SOKAK_INSERT_SURE) return <FareInsertSb2 p={INSERT_P0 + (p - ins.bas)} />;
  const izgara = param<{ z: number; u: number } | null>(plan, "izgara", null);
  const revAsili = param<number>(plan, "revAsili", 15);
  const k = kameraHesapla(plan.kamera, p);
  const frame30 = p * 0.5;
  const { lamp } = reverbere(frame30, revAsili);
  const lz = zemin(2.3, 0.5);
  const isik: Isik = gun
    ? { tip: "yonlu", ad: "güneş (sol-üst-arka)", yon: [0.42, 0.16], renk: "#fff1c8" }
    : { tip: "nokta", ad: "réverbère", zemin: [lamp[0], lz[1]], yukseklik: lz[1] - lamp[1], renk: "#ffb357" };
  const murekkep = gun ? "#3a2c1c" : BDX_GECE_PALET.murekkep;
  const kar = (plan.karakterler ?? []).map((c, i) => ({ c, i, d: karakterPoz(c, p, SOKAK_YER), z: deger(c.z, c.kare, p, 3) })).sort((a, b) => b.z - a.z);
  kar.forEach(({ c, d }) => kilit.push(...karakterKilit(c.kim, d, k)));
  if (izgara) kilit.push({ ad: "ızgara", p: [540 + k.cx + (zemin(izgara.z, izgara.u)[0] - 540) * k.cs, 960 + k.cy + (zemin(izgara.z, izgara.u)[1] - 960) * k.cs], tur: "kurulum" });
  const sis = (kk: number, y: number, o: number, n = 2) => (
    <g transform={katDonusum(k, kk)}>{Array.from({ length: n }).map((_, i) => <ellipse key={i} cx={((frame30 * (0.9 + i * 0.6) + i * 600) % 1700) - 300} cy={y + i * 50} rx={700} ry={110} fill={gun ? "#efe6cf" : "#6e7aa6"} opacity={gun ? o * 0.35 : o} style={{ filter: "blur(30px)" }} />)}</g>
  );
  const S = DOKU_SEED.sokakBdx;
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <Tanimlar />
      <RenkKaydi>
        <g transform={katDonusum(k, 0.25)}><SokakDekor katman="gok" sehir={sehir} saat={saat} /></g>
        <g transform={katDonusum(k, 0.55)}><KonturTitreme derinlik="uzak" seed={S}><SokakDekor katman="uzak" sehir={sehir} saat={saat} /></KonturTitreme></g>
        {sis(0.55, 960, 0.26)}
        <g transform={katDonusum(k, 1)}>
          <KonturTitreme derinlik="orta" seed={S}><SokakDekor katman="orta" t={0} sehir={sehir} saat={saat} izgaraFaresiz revAsili={revAsili} /></KonturTitreme>
          {izgara && <Izgara z={izgara.z} u={izgara.u} />}
          {kar.map(({ c, i, d }) => <KarakterCiz key={i} d={d} isik={isik} kamera={k} murekkep={murekkep} seed={S + 300 + i * 11} cepEldiven={c.aksesuar?.includes("cep-eldiven")} golgeAlfa={gun ? 0.35 : 0.5} />)}
          {!gun && <circle cx={lamp[0]} cy={lamp[1] + 200} r={420} fill="url(#kitRev)" style={{ mixBlendMode: "screen" }} />}
          <SokakOnPlan gun={gun} />
        </g>
        {!gun && sis(1.3, 1800, 0.1)}
      </RenkKaydi>
      <defs><radialGradient id="kitRev"><stop offset="0" stopColor="#ffb357" stopOpacity="0.24" /><stop offset="1" stopColor="#ffb357" stopOpacity="0" /></radialGradient></defs>
    </svg>
  );
};

export const SOKAK: Sablon = {
  Sahne,
  arsiv: (plan) => (param<Saat>(plan, "saat", "gece") === "gun" ? "gunduz" : "gece"),
  // insert kendi arşiv katmanını taşır (çift gren olmasın)
  arsivAtla: (plan, p) => { const ins = param<{ bas: number } | null>(plan, "insert", null); return !!ins && p >= ins.bas && p < ins.bas + SOKAK_INSERT_SURE; },
};
