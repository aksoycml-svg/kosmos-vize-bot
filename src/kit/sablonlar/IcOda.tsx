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
  const kar = (plan.karakterler ?? []).map((c, i) => ({ c, i, d: karakterPoz(c, p, ODA_YER), z: deger(c.z, c.kare, p, 3) }));
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
  nesneler.sort((a, b) => b.z - a.z);
  const yatakZ = ARKA - 0.05;
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <radialGradient id="ioMum"><stop offset="0" stopColor="#ffcf70" stopOpacity={0.42} /><stop offset="0.5" stopColor="#ffb357" stopOpacity={0.14} /><stop offset="1" stopColor="#ffb357" stopOpacity={0} /></radialGradient>
        <clipPath id="ioPen"><rect x={pa[0]} y={pa[1]} width={PW} height={PH} /></clipPath>
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
          {centik > 0 && Array.from({ length: centik + (centikYeni !== null && p >= centikYeni ? 1 : 0) }).map((_, i) => { const x = pa[0] + 10 + i * Math.min(12, (PW - 20) / (centik + 1)); return <line key={i} x1={x} y1={pb[1] + 4} x2={x + 3} y2={pb[1] + 16} stroke="#3a2a18" strokeWidth={2.4} />; })}
          {teleskop && <g transform={`translate(${pa[0] + PW * 0.65},${pb[1] + 2})`}><rect x={-6} y={-24} width={12} height={24} fill="#4a3220" /><g transform="rotate(-14)"><rect x={-70} y={-40} width={130} height={18} rx={4} fill="#c9a24a" stroke={ink("#c9a24a")} strokeWidth={2} /><rect x={50} y={-43} width={18} height={24} rx={3} fill="#a8862e" /></g></g>}
          {odaAd === "yatak" && <g>
            {/* yatak: ahşap çerçeve, keten (eldiven beyazının altında L*), arka duvara dayalı */}
            <polygon points={poly([Q(-2.3, 0.55, yatakZ - 1.9), Q(-0.5, 0.55, yatakZ - 1.9), Q(-0.5, 0.55, yatakZ), Q(-2.3, 0.55, yatakZ)])} fill={tonla("#cfc4a8", ton)} stroke={mur} strokeWidth={2.5} />
            <polygon points={poly([Q(-2.3, 0.55, yatakZ - 1.9), Q(-0.5, 0.55, yatakZ - 1.9), Q(-0.5, 0.2, yatakZ - 1.9), Q(-2.3, 0.2, yatakZ - 1.9)])} fill={tonla("#5a3e2a", ton)} stroke={mur} strokeWidth={2.5} />
            <polygon points={poly([Q(-2.3, 1.25, yatakZ), Q(-0.5, 1.25, yatakZ), Q(-0.5, 0.2, yatakZ), Q(-2.3, 0.2, yatakZ)])} fill={tonla("#5a3e2a", ton)} stroke={mur} strokeWidth={2.5} />
          </g>}
          {/* zemin: çam döşeme tahtaları (derinlik yönünde) */}
          <AhsapYuzey m={dortgen(Q(-YARI, 0, ARKA), Q(YARI, 0, ARKA), Q(YARI, 0, 1.2), Q(-YARI, 0, 1.2))} boyut={[1300, 900]} tur="doseme" taban={tonla("#8a6a48", ton)} tahta={9} seed={S + 6} derinlik="orta" kenarKontur={false} />
          <polyline points={poly([Q(-YARI, 0, ARKA), Q(YARI, 0, ARKA)])} stroke={mur} strokeWidth={4} />
          {mum && <circle cx={alev[0]} cy={alev[1]} r={(F * 1.6) / mumYer.z} fill="url(#ioMum)" style={{ mixBlendMode: "screen" }} />}
          {nesneler.map((n) => n.el)}
        </g>
      </RenkKaydi>
    </svg>
  );
};

export const IC_ODA: Sablon = { Sahne, arsiv: (plan) => (param<string>(plan, "isik", "mum") === "mum" && param<string>(plan, "oda", "") === "yatak" ? "gece" : "gunduz") };
