// ===== IC-ODA şablonu (SB2-TOURS çatı katı bürosunun iskeletinden; oda = kutu perspektif) =====
// Kamera göz hizası 1.6 m, ufuk y 760, F 1150 px: X = 540 + u·F/z, Y = 880 + (1.6 − h)·F/z. Oda 5.2 m geniş, tavan 2.5 m
// (çatı katı alçak), arka duvar z = ARKA (varsayılan 4.2 m). Karakter konumu (z m, u m; u 0 = orta, −sol/+sağ).
// oda: tours-buro (badanalı tuffeau, lucarne dışı Tours kulesi + T) · bordeaux-cati (TAS-BDX sıva, dışı Saint-Michel, pervaz
// çentikleri + teleskop) · yatak (aynı iskelet; arka duvarda yatak, dışı gece).
// isik: mum (masadaki mum TEK nokta kaynak; oda tonları loş-sıcak — karartma katmanı YOK) · gun (pencereden yönlü güneş).
import React from "react";
import { KonturTitreme } from "../../doku/KonturTitreme";
import { TasDuvar } from "../../doku/TasDuvar";
import { AhsapYuzey } from "../../doku/AhsapYuzey";
import { titresim } from "../../doku/IsikKatmani";
import { Isik } from "../../doku/Isik";
import { Kiris } from "../../doku/Mimari";
import { Kemer } from "../../doku/Kemer";
import { RenkKaydi, Tarama, taramaAcisi } from "../../doku/Tarama";
import { DOKU_SEED, P, dortgen, ink, karistir, murekkep, poly, tonla } from "../../doku/sabitler";
import { karakterPoz, Yerlesim } from "../jestler";
import { deger, kameraHesapla, ekranNokta } from "../zaman";
import { KarakterCiz, karakterKilit, param, Sablon, SablonProps } from "../ortak";
import { PROPLAR, propDurum, MUM_ALEV_Y } from "../props";
import { DisManzara, DisTur, PEN0 } from "./disManzara";
import { kolHesapla, KolParam } from "./MasaInsert";
import { GolgeT, GolgeTParam } from "../props/GolgeT";
import { Manipulator, manipAci, manipUygula } from "../props/Manipulator";
import { KolEl, KISTIR_YEREL } from "../../rig/KolEl";
import { interpolate, Easing } from "remotion";
import { cl, GIRIS, CIKIS } from "../zaman";

const F = 1150, UFUK = 760, GOZ = 1.6, TAVAN = 2.5, YARI = 2.6;
const X = (u: number, z: number) => 540 + (u * F) / z;
const Y = (h: number, z: number) => UFUK + ((GOZ - h) * F) / z;
const Q = (u: number, h: number, z: number): P => [X(u, z), Y(h, z)];
export const ODA_YER: Yerlesim = {
  yer: (z, u) => ({ x: X(u, z), y: Y(0, z), s: (F * 0.00298) / z }),
  faz: (dz, du) => Math.hypot(dz, du) * 4.5, // 1 döngü ≈ 1.4 m (iki adım)
};

type OdaAd = "tours-buro" | "bordeaux-cati" | "yatak";
const ODA: Record<OdaAd, { duvar: string; tas: "tuffeau" | "bdx"; dis: DisTur; seed: number }> = {
  "tours-buro": { duvar: "#ebe5d2", tas: "tuffeau", dis: "tours", seed: DOKU_SEED.tours },
  "bordeaux-cati": { duvar: "#e2cfa6", tas: "bdx", dis: "bordeaux", seed: DOKU_SEED.catiKati },
  yatak: { duvar: "#e4dcc6", tas: "tuffeau", dis: "gece", seed: DOKU_SEED.yatak },
};

type Masa = { z: number; u: number; w?: number; d?: number; h?: number };

const MasaCiz: React.FC<{ m: Masa; mur: string; ton: number }> = ({ m, mur, ton }) => {
  const w = m.w ?? 1.4, d = m.d ?? 0.8, h = m.h ?? 0.75;
  const z0 = m.z - d / 2, z1 = m.z + d / 2, u0 = m.u - w / 2, u1 = m.u + w / 2;
  const ust = [Q(u0, h, z1), Q(u1, h, z1), Q(u1, h, z0), Q(u0, h, z0)] as [P, P, P, P];
  const meSe = tonla("#9a7046", ton);
  return (
    <g>
      {[[u0 + 0.05, z1 - 0.05], [u1 - 0.05, z1 - 0.05], [u0 + 0.05, z0 + 0.05], [u1 - 0.05, z0 + 0.05]].map(([u, z], i) => { const a = Q(u, h, z), b = Q(u, 0, z), g = (F * 0.05) / z; return <rect key={i} x={a[0] - g / 2} y={a[1]} width={g} height={b[1] - a[1]} fill={tonla("#6a4a2c", ton)} stroke={mur} strokeWidth={2} />; })}
      <AhsapYuzey m={dortgen(...ust)} boyut={[w * 300, d * 300]} tur="mese" taban={meSe} tahta={4} seed={31} derinlik="orta" kenarKontur={false} />
      <polygon points={poly([Q(u0, h, z0), Q(u1, h, z0), Q(u1, h - 0.06, z0), Q(u0, h - 0.06, z0)])} fill={tonla("#7a5232", ton)} stroke={mur} strokeWidth={2.5} />
    </g>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const odaAd = param<OdaAd>(plan, "oda", "tours-buro");
  const O = ODA[odaAd];
  const mum = param<string>(plan, "isik", "mum") === "mum";
  const ARKA = param<number>(plan, "arka", 4.2);
  const pen = param<{ u: number; h0: number; w: number; h: number }>(plan, "pencere", { u: 0.9, h0: 0.95, w: 1.0, h: 1.15 });
  const dis = param<DisTur>(plan, "dis", O.dis);
  const kol = kolHesapla(param<KolParam>(plan, "kol", "BEKLE"), p);
  const masa = param<Masa | null>(plan, "masa", null);
  const centik = param<number>(plan, "pervazCentik", odaAd === "bordeaux-cati" ? 14 : 0);
  const centikYeni = param<number | null>(plan, "pervazCentikYeni", null);
  const teleskop = param<boolean>(plan, "teleskop", odaAd === "bordeaux-cati");
  const k = kameraHesapla(plan.kamera, p);
  const kam = `translate(${540 + k.cx},${960 + k.cy}) scale(${k.cs}) translate(-540,-960)`;
  const S = O.seed;
  const fl = titresim("mum", p, 3);
  // ton: mumlu oda loş-sıcak (malzeme tonu düşer), gün ışığında tam ton
  const ton = mum ? -0.38 : 0;
  const duvar = mum ? karistir(tonla(O.duvar, ton), "#ffb357", 0.08) : O.duvar;
  const mur = murekkep(O.duvar);
  // ışık: mum masada (yoksa sol önde şamdan zeminde) ya da pencereden güneş
  const mumYer = masa ? { u: masa.u + (masa.w ?? 1.4) * 0.3, z: masa.z, h: masa.h ?? 0.75 } : { u: -1.6, z: 2.6, h: 0 };
  const mumS = (F * 0.0011) / mumYer.z;
  const alev: P = [X(mumYer.u, mumYer.z), Y(mumYer.h, mumYer.z) + MUM_ALEV_Y * mumS];
  const mumZemin: P = Q(mumYer.u, 0, mumYer.z);
  const isik: Isik = mum
    ? { tip: "nokta", ad: "mum", zemin: mumZemin, yukseklik: mumZemin[1] - alev[1], renk: "#ffcf70" }
    : { tip: "yonlu", ad: "güneş (pencere)", yon: [-0.12, 0.42], renk: "#fff1c8" };
  const TH = taramaAcisi(isik);
  // pencere dikdörtgeni (arka duvarda, ekran)
  const pa = Q(pen.u - pen.w / 2, pen.h0 + pen.h, ARKA), pb = Q(pen.u + pen.w / 2, pen.h0, ARKA);
  const PW = pb[0] - pa[0], PH = pb[1] - pa[1];
  const disOlcek = Math.max(PW / PEN0.w, PH / PEN0.h);
  // K3 yatak (oda=yatak): arka duvara paralel, başucu solda. Yatık karakter (poz yatik) şilteye oturur (z/u yok sayılır).
  const yb = { u0: -1.6, u1: 0.5, zb: ARKA - 0.03, zf: ARKA - 0.95, h: 0.55 }; // z 3.7'te |u| ≤ 1.74 kadraj içi
  const yzm = (yb.zb + yb.zf) / 2, yum = yb.u0 + 1.07; // başucundan: yastık ucu 1.05 m, ayak ucu tahtadan önce
  const kar = (plan.karakterler ?? []).map((c, i) => {
    const d = karakterPoz(c, p, ODA_YER);
    if (d.pz.yatik && odaAd === "yatak") {
      const s = (F * 0.00298) / yzm;
      d.pz.x = X(yum, yzm); d.pz.y = Y(yb.h, yzm); d.pz.scale = s; d.pz.facing = 1;
      d.pz.sarkma = (Y(yb.h - 0.2, yb.zf) - d.pz.y) / s;
      return { c, i, d, z: yzm };
    }
    return { c, i, d, z: deger(c.z, c.kare, p, 3) };
  });
  // K2 kumanda (manipulateur): it-çek eden karakterin önünde direk; kol açısı it-çek fazından, el kol ucuna IK ile (el koldan kopmaz)
  const manip = param<{ kim: string; ileri?: number; h?: number; yari?: number } | null>(plan, "manipulator", null);
  const manipCiz: { z: number; el: React.ReactNode }[] = [];
  if (manip) {
    const m = kar.find((q) => q.c.kim === manip.kim);
    if (m) {
      const u = deger(m.c.u, m.c.kare, p, 0), yon = m.c.yon ?? 1;
      const up = u + yon * (manip.ileri ?? 0.75), hp = manip.h ?? 1.0, sF = F / m.z;
      const piv = Q(up, hp, m.z);
      const { tut, karsi } = manipUygula(m.d.pz, piv, (manip.yari ?? 0.3) * sF, manipAci(m.c, p), yon);
      manipCiz.push({ z: m.z + 0.02, el: <Manipulator key="manip" pivot={piv} tut={tut} karsi={karsi} zemin={Y(0, m.z)} tavan={Y(TAVAN, m.z)} s={sF} murekkep={mur} /> });
      kilit.push({ ad: "kumanda tutamak", p: ekranNokta(k, tut), tur: "dokunus" });
    }
  }
  kar.forEach(({ c, d }) => kilit.push(...karakterKilit(c.kim, d, k)));
  // derinlik sırası: uzak önce (karakterler + masa)
  const nesneler: { z: number; el: React.ReactNode }[] = kar.map(({ c, i, d, z }) => ({ z, el: <KarakterCiz key={`k${i}`} d={d} isik={isik} kamera={k} murekkep={mur} seed={S + 300 + i * 11} cepEldiven={c.aksesuar?.includes("cep-eldiven")} golgeAlfa={mum ? 0.5 : 0.35} /> }));
  if (masa) {
    const h = masa.h ?? 0.75;
    nesneler.push({ z: masa.z - 0.01, el: (
      <g key="masa">
        <MasaCiz m={masa} mur={mur} ton={ton} />
        {(plan.props ?? []).map((pr, i) => { const u = deger(pr.x, pr.kare, p), z = deger(pr.y, pr.kare, p); const s = ((F * 0.0011) / z) * (pr.olcek ?? 1); const C = PROPLAR[pr.tur]; return <g key={i} transform={`translate(${X(u, z)},${Y(h, z)}) scale(${s})`}><ellipse cx={0} cy={4} rx={60} ry={10} fill="#14110d" opacity={0.4} /><C durum={propDurum(pr, p)} seed={S} fl={fl} /></g>; })}
        {mum && <g transform={`translate(${X(mumYer.u, mumYer.z)},${Y(h, mumYer.z)}) scale(${mumS})`}><ellipse cx={0} cy={4} rx={60} ry={10} fill="#14110d" opacity={0.5} />{React.createElement(PROPLAR.mum, { durum: {}, seed: S, fl })}</g>}
      </g>
    ) });
    kilit.push({ ad: "masa", p: ekranNokta(k, Q(masa.u, masa.h ?? 0.75, masa.z)), tur: "kurulum" });
  }
  nesneler.push(...manipCiz);
  if (odaAd === "yatak") {
    // ayak ucu tahtası kameraya yakın (sağ uç) → yorgan ucunu örter
    const { u1, zb, zf } = yb;
    nesneler.push({ z: yzm - 0.6, el: <g key="ayakucu">
      <polygon points={poly([Q(u1, 0.85, zb), Q(u1, 0.85, zf), Q(u1, 0, zf), Q(u1, 0, zb)])} fill={tonla("#5a3e2a", ton)} stroke={mur} strokeWidth={2.5} />
      <polyline points={poly([Q(u1, 0.85, zb), Q(u1, 0.85, zf)])} stroke={tonla("#7a5636", ton)} strokeWidth={5} />
    </g> });
  }
  nesneler.sort((a, b) => b.z - a.z);
  // K2 (D2) gölge → T kol: mum alevinden arka duvara izdüşüm (pencere camına düşmez: kırpma deliği)
  const gT = param<GolgeTParam | null>(plan, "golgeT", null);
  const gTk = gT && mum ? kar.find((q) => q.c.kim === gT.kim) : undefined;
  const gTD = gT ? gT.donusum ?? 36 : 0;
  const gTt = gT ? (p < gT.bit - gTD * 0.5 ? interpolate(p, [gT.bas, gT.bas + gTD], [0, 1], { ...cl, easing: GIRIS }) : interpolate(p, [gT.bit - gTD * 0.5, gT.bit], [1, 0], { ...cl, easing: CIKIS })) : 0;
  const duvarSol = Q(-YARI, TAVAN, ARKA), duvarSag = Q(YARI, 0, ARKA);
  // K2 (D6) pervaza bıçakla çentik: el sağ-alttan girer (kadraj kenarı; push-in planında), bıçak ucu yeni çentiği çizer (kare = "kırt")
  const bicak = param<{ bas: number; kare: number; bit: number; tip?: "gomlek" | "ceket" | "gorevli" | "louis" } | null>(plan, "pervazBicak", null);
  const centikN = centik + (centikYeni !== null && p >= centikYeni ? 1 : 0);
  const centikAdim = Math.min(12, (PW - 20) / (centik + 1));
  const bicakCiz = (() => {
    if (!bicak || p < bicak.bas || p > bicak.bit) return null;
    const sF = F / ARKA, x = pa[0] + 10 + centik * centikAdim;
    const ucA: P = [x, pb[1] + 2], ucB: P = [x + 3, pb[1] + 17];
    const yaklas = interpolate(p, [bicak.bas, bicak.kare - 14], [1, 0], { ...cl, easing: GIRIS });
    const kes = interpolate(p, [bicak.kare - 10, bicak.kare], [0, 1], { ...cl, easing: Easing.in(Easing.quad) });
    const cek = interpolate(p, [bicak.kare + 8, bicak.bit], [0, 1], { ...cl, easing: CIKIS });
    const uc: P = [ucA[0] + (ucB[0] - ucA[0]) * kes, ucA[1] + (ucB[1] - ucA[1]) * kes - 4 * (1 - kes) * (p < bicak.kare - 10 ? 1 : 0)];
    const off: P = [(yaklas + cek) * 0.55 * sF, (yaklas + cek) * 0.7 * sF];
    const bl = 0.11 * sF; // bıçak ağzı ≈ 11 cm
    const bd: P = [Math.cos((118 * Math.PI) / 180), Math.sin((118 * Math.PI) / 180)]; // ağız aşağı-sol, sap yukarı-sağ
    const ucE: P = [uc[0] + off[0], uc[1] + off[1]];
    const kist: P = [ucE[0] - bd[0] * bl, ucE[1] - bd[1] * bl];
    const olc = (0.19 * sF) / 140, aci = 212, r = aci * Math.PI / 180;
    const bilek: P = [kist[0] - (KISTIR_YEREL[0] * Math.cos(r) - KISTIR_YEREL[1] * Math.sin(r)) * olc, kist[1] - (KISTIR_YEREL[0] * Math.sin(r) + KISTIR_YEREL[1] * Math.cos(r)) * olc];
    const g = olc / 1.9;
    return (
      <g>
        <KolEl giris={[bilek[0] + 0.62 * sF, bilek[1] + 0.95 * sF]} dirsek={[bilek[0] + 0.3 * sF, bilek[1] + 0.32 * sF]} bilek={bilek} gen={[210 * g * 1.3, 172 * g, 92 * g]} tip={bicak.tip ?? "ceket"} elAci={aci} olcek={olc} poz="kistir"
          tutulan={<g><line x1={0} y1={0} x2={ucE[0] - kist[0]} y2={ucE[1] - kist[1]} stroke="#9aa0a6" strokeWidth={Math.max(2.5, 0.016 * sF)} strokeLinecap="round" /><line x1={0} y1={0} x2={-(ucE[0] - kist[0]) * 0.7} y2={-(ucE[1] - kist[1]) * 0.7} stroke="#4a3220" strokeWidth={Math.max(4, 0.024 * sF)} strokeLinecap="round" /></g>} />
      </g>
    );
  })();
  if (bicak && p >= bicak.bas && p <= bicak.bit) kilit.push({ ad: "bıçak ucu / çentik", p: ekranNokta(k, [pa[0] + 10 + centik * centikAdim, pb[1] + 10]), tur: p >= bicak.kare ? "temas" : "dokunus" });
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <radialGradient id="ioMum"><stop offset="0" stopColor="#ffcf70" stopOpacity={0.42} /><stop offset="0.5" stopColor="#ffb357" stopOpacity={0.14} /><stop offset="1" stopColor="#ffb357" stopOpacity={0} /></radialGradient>
        <clipPath id="ioPen"><rect x={pa[0]} y={pa[1]} width={PW} height={PH} /></clipPath>
        <clipPath id="ioDuvar"><path clipRule="evenodd" d={`M ${duvarSol[0]} ${duvarSol[1]} H ${duvarSag[0]} V ${duvarSag[1]} H ${duvarSol[0]} Z M ${pa[0]} ${pa[1]} H ${pb[0]} V ${pb[1]} H ${pa[0]} Z`} /></clipPath>
      </defs>
      <rect x={0} y={0} width={1080} height={1920} fill={tonla("#3b2c1c", ton)} />
      <RenkKaydi>
        <g transform={kam}>
          {/* tavan (alçak, koyu ahşap) + kirişler kameraya doğru */}
          <polygon points={poly([Q(-YARI, TAVAN, ARKA), Q(YARI, TAVAN, ARKA), Q(YARI, TAVAN, 1.2), Q(-YARI, TAVAN, 1.2)])} fill={tonla("#3a2a1c", ton)} />
          {[-1.7, -0.55, 0.6, 1.75].map((u, i) => <Kiris key={i} on={[Q(u - 0.1, TAVAN, 1.2), Q(u + 0.1, TAVAN, 1.2), Q(u + 0.1, TAVAN - 0.12, ARKA), Q(u - 0.1, TAVAN - 0.12, ARKA)]} seed={S + 20 + i} derinlik="uzak" />)}
          {/* yan duvarlar */}
          {[-1, 1].map((s) => <polygon key={s} points={poly([Q(s * YARI, TAVAN, 1.2), Q(s * YARI, TAVAN, ARKA), Q(s * YARI, 0, ARKA), Q(s * YARI, 0, 1.2)])} fill={tonla(duvar, s < 0 ? -0.1 : -0.04)} stroke={mur} strokeWidth={3} />)}
          <Tarama sekil={[Q(-YARI, TAVAN, 1.2), Q(-YARI, TAVAN, ARKA), Q(-YARI, 0, ARKA), Q(-YARI, 0, 0.9)]} basamak="II" aci={TH} renk={mur} derinlik="orta" seed={S + 2} />
          {/* arka duvar */}
          <KonturTitreme derinlik="orta" seed={S}>
            <polygon points={poly([Q(-YARI, TAVAN, ARKA), Q(YARI, TAVAN, ARKA), Q(YARI, 0, ARKA), Q(-YARI, 0, ARKA)])} fill={duvar} />
            <TasDuvar m={dortgen(Q(-YARI, 0.9, ARKA), Q(YARI, 0.9, ARKA), Q(YARI, 0, ARKA), Q(-YARI, 0, ARKA))} boyut={[1100, 200]} tip={O.tas === "bdx" ? "bdx" : "tuffeau"} taban={duvar} seed={S} derinlik="orta" nemBandi={0.3} />
            {/* pencere nişi yan yüzü (gölge) */}
            <polygon points={poly([[pa[0] - 26, pa[1] - 18], [pa[0], pa[1]], [pa[0], pb[1]], [pa[0] - 26, pb[1] + 22]])} fill={tonla(duvar, -0.12)} />
            <Tarama sekil={[[pa[0] - 26, pa[1] - 18], [pa[0], pa[1]], [pa[0], pb[1]], [pa[0] - 26, pb[1] + 22]]} basamak="III" aci={TH} renk={mur} derinlik="orta" seed={S + 3} />
          </KonturTitreme>
          <Kemer m={(u, v) => [pa[0] + u * PW, pa[1] + v * PH]} W={pen.w} H={pen.h} tip="basik" dolgu="#e8d4a4" kayit={null} sove={{ gen: 0.05, renk: "#4a3220" }} esik={{ renk: tonla("#d8cfb4", ton) }} kontur={2.5}
            ic={<g clipPath="url(#ioPen)"><g transform={`translate(${pa[0] + PW / 2},${pa[1] + PH / 2}) scale(${disOlcek}) translate(${-(PEN0.x + PEN0.w / 2)},${-(PEN0.y + PEN0.h / 2)})`}><DisManzara tur={dis} kol={kol} /></g></g>} />
          {/* pervaz çentikleri (D6 "iki yıl"): bıçak izi sırası; yeni çentik temas karesinde belirir */}
          {centikN > 0 && Array.from({ length: centikN }).map((_, i) => { const x = pa[0] + 10 + i * centikAdim; return <line key={i} x1={x} y1={pb[1] + 2} x2={x + 3} y2={pb[1] + 17} stroke="#3a2a18" strokeWidth={3} strokeLinecap="round" />; })}
          {gTk && <GolgeT pz={gTk.d.pz} z={gTk.z} isik={{ u: mumYer.u, h: mumYer.h + 0.165, z: mumYer.z }} arka={ARKA} t={gTt} konum={gT!.konum} klip="url(#ioDuvar)"
            ekranDunya={(q, z) => ({ u: ((q[0] - 540) * z) / F, h: GOZ - ((q[1] - UFUK) * z) / F })} dunyaEkran={(u, h, z) => Q(u, h, z)} />}
          {teleskop && <g transform={`translate(${pa[0] + PW * 0.65},${pb[1] + 2})`}><rect x={-6} y={-24} width={12} height={24} fill="#4a3220" /><g transform="rotate(-14)"><rect x={-70} y={-40} width={130} height={18} rx={4} fill="#c9a24a" stroke={ink("#c9a24a")} strokeWidth={2} /><rect x={50} y={-43} width={18} height={24} rx={3} fill="#a8862e" /></g></g>}
          {/* zemin: çam döşeme tahtaları (derinlik yönünde) */}
          <AhsapYuzey m={dortgen(Q(-YARI, 0, ARKA), Q(YARI, 0, ARKA), Q(YARI, 0, 1.2), Q(-YARI, 0, 1.2))} boyut={[1300, 900]} tur="doseme" taban={tonla("#8a6a48", ton)} tahta={9} seed={S + 6} derinlik="orta" kenarKontur={false} />
          <polyline points={poly([Q(-YARI, 0, ARKA), Q(YARI, 0, ARKA)])} stroke={mur} strokeWidth={4} />
          {odaAd === "yatak" && (() => {
            // K3 yatak: arka duvara paralel ahşap karyola (başucu solda, 1.15 m), keten şilte (eldiven beyazının altında L*)
            const { u0, u1, zb, zf, h } = yb, ah = tonla("#5a3e2a", ton), ket = tonla("#cfc4a8", ton);
            return <g>
              <polygon points={poly([Q(u0, 0, zb), Q(u1, 0, zb), Q(u1, 0, zf), Q(u0, 0, zf)])} fill="#14110d" opacity={0.35} />
              <polygon points={poly([Q(u0, 1.15, zb), Q(u0, 1.15, zf), Q(u0, 0, zf), Q(u0, 0, zb)])} fill={ah} stroke={mur} strokeWidth={2.5} />
              <polyline points={poly([Q(u0, 1.15, zb), Q(u0, 1.15, zf)])} stroke={tonla("#7a5636", ton)} strokeWidth={6} />
              <polygon points={poly([Q(u0, h, zb), Q(u1, h, zb), Q(u1, h, zf), Q(u0, h, zf)])} fill={ket} stroke={mur} strokeWidth={2.5} />
              <polygon points={poly([Q(u0, h, zf), Q(u1, h, zf), Q(u1, h - 0.17, zf), Q(u0, h - 0.17, zf)])} fill={tonla("#b8ac90", ton)} stroke={mur} strokeWidth={2} />
              <polygon points={poly([Q(u0, h - 0.17, zf), Q(u1, h - 0.17, zf), Q(u1, 0.2, zf), Q(u0, 0.2, zf)])} fill={ah} stroke={mur} strokeWidth={2.5} />
              {[u0 + 0.04, u1 - 0.04].map((u, i) => { const a = Q(u, 0.2, zf), b = Q(u, 0, zf), g = (F * 0.06) / zf; return <rect key={i} x={a[0] - g / 2} y={a[1]} width={g} height={b[1] - a[1]} fill={ah} stroke={mur} strokeWidth={2} />; })}
            </g>;
          })()}
          {mum && <circle cx={alev[0]} cy={alev[1]} r={(F * 1.6) / mumYer.z} fill="url(#ioMum)" style={{ mixBlendMode: "screen" }} />}
          {nesneler.map((n) => n.el)}
          {bicakCiz}
        </g>
      </RenkKaydi>
    </svg>
  );
};

export const IC_ODA: Sablon = { Sahne, arsiv: (plan) => (param<string>(plan, "isik", "mum") === "mum" && param<string>(plan, "oda", "") === "yatak" ? "gece" : "gunduz") };
