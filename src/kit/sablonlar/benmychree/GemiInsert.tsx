// ===== GEMI-INSERT şablonu (Ben-my-Chree; mekanlar.md §2, tasarim §2–3, sahne-plani P07b + §12) =====
// KURULU: hangar-kapi (P07b). KURULMADI: kic, korkuluk, bas-capa, kic-su, bot, korkuluk-su → açık hata.
// hangar-kapi geometrisi (gerçek 3B, kamera25d): iskele yan güvertesi (duvar ↔ korkuluk 2.5 m). Kamera duvardan 1.1 m, göz 1.2 m,
//   28 mm (F 840), pan −28.7° → duvar hattı kaçış noktası (1000, 960). Kapı duvarda z 1.0–6.0 m (5 × 4.2 m, [G]; mekanlar 7 × 5 bu
//   koridorda kadraja sığmaz). Yakın (sol) kanat kapalı-kararmış; uzak (sağ) kanat menteşede dışa açılır (yayKare benzeri sönümlü salınım).
// Işık: ANAHTAR = alev (nokta kaynak, açıklığın içinde); güneş rel 325 yalnız sol kenar ışığı. Havuz 3 düz basamak (0.6/1.3/2.4 m), C* ≤ 28.
// Parametreler: gorunum, gun_yuksekligi, kapi {sizinti [a,b], itilir (kare), aci (62), oturma (kare)}, t3 {geri [a,b]}, kamera25, seed.
import React from "react";
import { interpolate } from "remotion";
import type { Plan } from "../../tipler";
import { param, Sablon, SablonProps } from "../../ortak";
import { cl, GIRIS } from "../../zaman";
import { izd, izdPoli, Kam25, kamera25, Kamera25, V3 } from "../../kamera25d";
import { RenkKaydi } from "../../../doku/Tarama";
import { Alev, BP, Duman, Flu, gokSutun, Gok5, kirik, P2, pts, rr, Tara, Isleme } from "./bmcOrtak";
import { karisim as mix } from "./renk";
import { KolOmuz, ProfilFigur, profilIskelet, YUZ_KART } from "./Figur";

type Gorunum = "kic" | "korkuluk" | "bas-capa" | "kic-su" | "hangar-kapi" | "bot" | "korkuluk-su";
const KURULU: Gorunum[] = ["hangar-kapi"];
export const GI_KAYIT: Record<"hangar-kapi", Kamera25> = {
  "hangar-kapi": { kare: [0], konum_yol: [[0.3, 1.2, 0]], yon_yol: [[-16, 3]], lens_mm: [40], odak_z: [3.4], diyafram: 4 },
};
const DUVAR_X = -1.1, KAPI = { z0: 2.0, z1: 7.0, h: 4.2 }, HANGAR_H = 5.6, HANGAR_Z1 = 16;
const ALEV: V3 = [-1.7, 0.2, 5.9]; // alev tabanı (hangar içinde, açıklığın uzak yarısında)
const EL_T = { isik: "#c9a88f", golge: "#8a6f7a", konturYuk: "#5a4438", konturIsik: "#a8836c", kenar: "#e4b296", tarama: "#6a4f40", manset: "#585870", mansetGolge: "#3f3e58" };

const P = (k: Kam25, X: V3): P2 => { const q = izd(k, X, 0.02); return q ? [q.x, q.y] : [NaN, NaN]; };
const poli = (k: Kam25, A: V3[]) => { const q = izdPoli(k, A); return q.length > 2 ? `M${pts(q)} Z` : ""; };

const HangarKapi: React.FC<{ plan: Plan; p: number; kilit: SablonProps["kilit"] }> = ({ plan, p, kilit }) => {
  const k = kamera25(param<Partial<Kamera25>>(plan, "kamera25", {}), p, GI_KAYIT["hangar-kapi"]);
  const t = p / 60, gok = gokSutun(param<number>(plan, "gun_yuksekligi", 18));
  const kp = param<{ sizinti: [number, number]; itilir: number; aci: number; oturma: number }>(plan, "kapi", { sizinti: [10, 54], itilir: 62, aci: 62, oturma: 112 });
  const tr = Math.max(0, p - kp.itilir) / 60;
  // sönümlü yay: hızla açılır, 62°'yi bir kez aşar, oturma karesinde durur (hareket tamamlanır)
  const aci = p < kp.itilir ? 0 : p >= kp.oturma ? kp.aci : kp.aci * (1 - Math.exp(-tr * 7) * Math.cos(tr * 11));
  const siz = interpolate(p, kp.sizinti, [0, 1], { ...cl });
  const yan = p >= kp.itilir ? 1 : 0, darbe = interpolate(p - kp.itilir, [0, 2, 9], [0, 1, 0], { ...cl });
  const alevBoy = yan ? interpolate(p - kp.itilir, [0, 6], [0.82, 1], { ...cl, easing: GIRIS }) : 0;
  const t3 = param<{ geri: [number, number] }>(plan, "t3", { geri: [70, 95] });
  const geri = interpolate(p, t3.geri, [0, 1], { ...cl, easing: GIRIS });

  const W = (z: number, y: number): V3 => [DUVAR_X, y, z];
  const kapiPoli = poli(k, [W(KAPI.z0, 0), W(KAPI.z1, 0), W(KAPI.z1, KAPI.h), W(KAPI.z0, KAPI.h)]);
  const zm = (KAPI.z0 + KAPI.z1) / 2;
  // açık kanat: menteşe uzak dikmede (z1), dışa (koridora, +x) döner
  // açılan = UZAK kanat (menteşe z1, dışa döner); kapalı = yakın kanat (kararmış)
  const r = (aci * Math.PI) / 180, uc: V3 = [DUVAR_X + Math.sin(r) * (KAPI.z1 - zm), 0, KAPI.z1 - Math.cos(r) * (KAPI.z1 - zm)];
  const kanat = [W(KAPI.z1, 0), [uc[0], 0, uc[2]] as V3, [uc[0], KAPI.h, uc[2]] as V3, W(KAPI.z1, KAPI.h)];
  const acik = [W(zm, 0), W(KAPI.z1, 0), W(KAPI.z1, KAPI.h), W(zm, KAPI.h)], kapali = [W(KAPI.z0, 0), W(zm, 0), W(zm, KAPI.h), W(KAPI.z0, KAPI.h)];
  const AL = P(k, ALEV), ekranS = izd(k, ALEV)!.s;
  // havuz: güvertede alev tabanından 0.6 / 1.3 / 2.4 m (açıklıktan koridora yamuk), yalnız alevi gören yüzey
  const havuz = (m: number) => poli(k, [W(zm - m * 1.1, 0.002), W(KAPI.z1 + m * 0.3, 0.002), [DUVAR_X + Math.min(2.4, m * 1.1), 0.002, KAPI.z1 - m * 0.1], [DUVAR_X + Math.min(2.4, m * 1.1), 0.002, zm - m * 1.4]]);
  // T3: duvardan 0.7 m, z 2.9 → 2.55 (bir adım geri), boy 1.75 m
  const t3Z = 3.3 + 0.3 * geri, t3X = 0.05 + 0.08 * geri; // adım geri = kapıdan uzağa (kameraya doğru değil, kıça)
  const ayak = P(k, [t3X, 0, t3Z]), bas = P(k, [t3X, 1.75, t3Z]), H = ayak[1] - bas[1], s3 = H / 1.75;
  kilit.push({ ad: "T3 ayak", p: ayak, tur: "ayak" }, { ad: "T3 yüz", p: [bas[0] - 0.05 * s3, bas[1] + 0.13 * s3], tur: "yuz" }, { ad: "kapı (açılan kanat)", p: P(k, W(KAPI.z1, KAPI.h / 2)), tur: "dokunus" });

  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <RenkKaydi><Isleme aci={65}>
        {/* gök (sağ üst; duvar üst hattının üstü) + ada sırtı + liman suyu (korkuluğun ötesi) */}
        <Gok5 sinir={[160, 380, 600, 800]} renk={gok} x0={0} x1={1080} y0={-200} seed={191} />
        <Flu s={3}><path d={`M300,960 L${pts(kirik([300, 905], [1100, 915], 14, 10, "gia"))} L1100,960 Z`} fill={mix(BP.sirt[1], BP.bugu, 0.3)} /><rect x={300} y={940} width={800} height={30} fill={mix(BP.su, BP.bugu, 0.2)} /></Flu>
        {/* hangar duvarı + güverte evi (kıçta derrick direği siluet) */}
        <line x1={P(k, [0.6, 0, HANGAR_Z1 + 6])[0]} y1={P(k, [0.6, 0, HANGAR_Z1 + 6])[1]} x2={P(k, [0.6, 14, HANGAR_Z1 + 6])[0]} y2={P(k, [0.6, 14, HANGAR_Z1 + 6])[1]} stroke={BP.direk} strokeWidth={9} />
        <path d={poli(k, [W(-3, 0), W(HANGAR_Z1, 0), W(HANGAR_Z1, HANGAR_H), W(-3, HANGAR_H)])} fill={BP.duvarGolge} stroke={BP.kontur} strokeWidth={3} />
        {/* saçak altı III tarama + saçak ışık kenarı (güneş sol-ön-üst) */}
        <path d={poli(k, [W(-3, HANGAR_H - 0.35), W(HANGAR_Z1, HANGAR_H - 0.35), W(HANGAR_Z1, HANGAR_H), W(-3, HANGAR_H)])} fill={mix(BP.duvarGolge, BP.dumanCekirdek, 0.35)} />
        <Tara d={poli(k, [W(-3, HANGAR_H - 0.9), W(HANGAR_Z1, HANGAR_H - 0.9), W(HANGAR_Z1, HANGAR_H - 0.35), W(-3, HANGAR_H - 0.35)])} aci={65} aralik={7.5} kalin={2.2} renk={BP.dumanCekirdek} alfa={0.5} kutu={[-200, -400, 1080, 960]} />
        <path d={`M${pts([P(k, W(0.35, HANGAR_H)), P(k, W(HANGAR_Z1, HANGAR_H))])}`} stroke={BP.kenar} strokeWidth={4} />
        {/* levha ek çizgileri + perçin sıraları (seed'li eksik %8) */}
        {[-1.5, 0.0, 9, 11.5, 14].map((z, i) => <path key={`dk${i}`} d={poli(k, [W(z, 0), W(z + 0.015, 0), W(z + 0.015, HANGAR_H - 0.35), W(z, HANGAR_H - 0.35)])} fill={mix(BP.duvarGolge, BP.kontur, 0.45)} />)}
        {[1.4, 2.8, 4.6].map((y, i) => <path key={i} d={`M${pts([P(k, W(0.35, y)), P(k, W(HANGAR_Z1, y))])}`} stroke={mix(BP.duvarGolge, BP.kontur, 0.4)} strokeWidth={2} opacity={0.7} />)}
        {Array.from({ length: 40 }).map((_, i) => { const z = -0.8 + i * 0.42; if (z > KAPI.z0 - 0.3 && z < KAPI.z1 + 0.3) return null; return [0.3, 2.95, 4.75].map((y, j) => rr(`pc${i}${j}`) < 0.08 ? null : (() => { const iz = izd(k, W(z, y), 0.2); if (!iz) return null; return <circle key={`${i}${j}`} cx={iz.x} cy={iz.y} r={Math.max(1.4, iz.s * 0.012)} fill={mix(BP.duvarGolge, BP.kontur, 0.5)} />; })()); })}
        {yan > 0 && [[1.6, "#7d6d84"], [1.0, "#957a84"], [0.5, "#b08e8a"]].map(([m, c], i) => <path key={`dh${i}`} d={poli(k, [W(zm - (m as number) * 0.8, 0), W(KAPI.z1 + (m as number), 0), W(KAPI.z1 + (m as number) * 0.8, Math.min(HANGAR_H - 0.4, KAPI.h + (m as number))), W(zm - (m as number) * 0.5, Math.min(HANGAR_H - 0.4, KAPI.h + (m as number)))])} fill={c as string} opacity={alevBoy} />)}
        {[-1.2, 0.3, 7.6, 9.4, 12.2].map((z, i) => <path key={`pas${i}`} d={poli(k, [W(z, 4.55), W(z + 0.08, 4.55), W(z + 0.05 + rr(`ps${i}`) * 0.06, 2.6 + rr(`psy${i}`)), W(z + 0.02, 2.4 + rr(`psy${i}`))])} fill="#8a6a62" opacity={0.55} />)}
        {Array.from({ length: 60 }).map((_, i) => { const z = -2.6 + i * 0.3; if (z > KAPI.z0 - 0.2 && z < KAPI.z1 + 0.2) return null; return [1.35, 2.75, 4.55].map((y, j) => { const iz = izd(k, W(z, y), 0.2); if (!iz) return null; const q: P2 = [iz.x, iz.y], rq = Math.max(2, iz.s * 0.014); return <g key={`rv${i}${j}`}><circle cx={q[0]} cy={q[1]} r={rq} fill="#4a4660" /><circle cx={q[0] - rq * 0.35} cy={q[1] - rq * 0.35} r={rq * 0.45} fill="#a8a2b4" opacity={0.7} /></g>; }); })}
        {/* kapı açıklığı: içeri koyu + alev (tek ışık), açılmadan önce yalnız aralıktan sızan kızıl çizgi */}
        <path d={kapiPoli} fill={BP.oyuk} />
        <defs><clipPath id="giAcik"><path d={poli(k, acik)} /></clipPath></defs>
        {yan > 0 && <g clipPath="url(#giAcik)">
          <path d={poli(k, acik)} fill="#4a2c34" />
          {darbe > 0 && <ellipse cx={AL[0]} cy={AL[1] - ekranS * 1.2} rx={ekranS * 1.4 * darbe} ry={ekranS * 1.8 * darbe} fill={BP.cakim} opacity={0.8 * darbe} />}
          <Alev taban={[AL[0] + ekranS * 0.3, AL[1] + ekranS * 0.2]} gen={ekranS * 3.4} boy={ekranS * 5.0 * alevBoy} t={t} ruz={0.91} seed="gia" n={9} kontur={4} konturRenk="#6e2618" />
          <ellipse cx={AL[0] + ekranS * 0.3} cy={AL[1] - ekranS * 0.5} rx={ekranS * 0.45} ry={ekranS * 0.7} fill="#ffe2a8" />
        </g>}
        {/* kapı çerçevesi (iç yüz alevden aydınlanır) */}
        <path d={`M${pts([P(k, W(KAPI.z0 - 0.15, 0)), P(k, W(KAPI.z0 - 0.15, KAPI.h + 0.15)), P(k, W(KAPI.z1 + 0.15, KAPI.h + 0.15)), P(k, W(KAPI.z1 + 0.15, 0))])}`} stroke={BP.kapiCerceve} strokeWidth={10} fill="none" strokeLinejoin="round" />
        {yan > 0 && <path d={`M${pts([P(k, W(KAPI.z1 + 0.02, 0)), P(k, W(KAPI.z1 + 0.02, KAPI.h))])}`} stroke={BP.havuz} strokeWidth={5} opacity={0.6} />}
        {/* yakın kanat: kapalı, kararmış; menteşe ve takviye lamaları */}
        {yan === 0 && <path d={poli(k, acik)} fill={BP.kapi} stroke={BP.kontur} strokeWidth={3} />}
        <path d={poli(k, kapali)} fill={BP.kapi} stroke={BP.kontur} strokeWidth={3} />
        {[1.3, 3.0].map((y, i) => <path key={i} d={poli(k, [W(KAPI.z0 + 0.05, y), W(zm - 0.05, y), W(zm - 0.05, y + 0.1), W(KAPI.z0 + 0.05, y + 0.1)])} fill={mix(BP.kapi, BP.kontur, 0.4)} />)}
        {[0.5, 2.1, 3.7].map((y, i) => <path key={i} d={poli(k, [W(KAPI.z0 + 0.02, y), W(KAPI.z0 + 0.12, y), W(KAPI.z0 + 0.12, y + 0.3), W(KAPI.z0 + 0.02, y + 0.3)])} fill={BP.demir} />)}
        {[0.6, 0.3].map((m, i) => <path key={`kr${i}`} d={poli(k, [W(zm - m, KAPI.h * (0.45 + i * 0.2)), W(zm, KAPI.h * (0.3 + i * 0.2)), W(zm, KAPI.h), W(zm - m * 1.3, KAPI.h)])} fill={BP.dumanCekirdek} opacity={0.3 + i * 0.2} />)}
        {yan > 0 && [1.4, 0.8, 0.35].map((m, i) => <path key={`kh${i}`} d={poli(k, [W(zm - m, 0.05), W(zm, 0.05), W(zm, KAPI.h - 0.05), W(zm - m, KAPI.h - 0.05)])} fill={BP.havuz} opacity={[0.12, 0.2, 0.3][i]} />)}

        <path d={`M${pts([P(k, W(zm - 0.02, 0)), P(k, W(zm - 0.02, KAPI.h))])}`} stroke={siz > 0 ? BP.alevDis : BP.kontur} strokeWidth={yan ? 4 : 3 + 3 * siz} opacity={yan ? 0.9 : 0.4 + 0.6 * siz} />
        {/* duman: kapı üstünden ve saçaktan, sağa yatar, kadraj üstünden çıkar (fade yok); alt yüzleri alev ışığı */}
        <Duman taban={P(k, W(KAPI.z1 - 0.2, KAPI.h + 0.6))} t={t + 3} hiz={95} genis0={45} genis1={170} ruz={0.91} seed="gid" boy={1400} isikSag={false} altIsik yogun={1.2} />
        <Duman taban={P(k, W(KAPI.z1 + 1.2, HANGAR_H))} t={t + 2} hiz={80} genis0={40} genis1={150} ruz={0.91} seed="gid2" boy={1100} isikSag={false} yogun={0.9} />
        {/* güverte: tahtalar kaçış noktasına (seed'li ek çizgisi) + alev havuzu 3 basamak */}
        <path d={poli(k, [[DUVAR_X, 0, -3], [DUVAR_X, 0, 40], [1.4, 0, 40], [1.4, 0, -3]])} fill={mix(BP.guverte, BP.guverteGolge, 0.45)} /> {/* koridor hangar gölgesinde (güneş duvarın ardında, h 18°); ahşap gölgede de sıcak kalır */}
        {/* havuz: 3 düz basamak (kenarları net), C* ≤ 28 */}
        {yan > 0 && [2.6, 1.5, 0.9].map((m, i) => <path key={m} d={havuz(m)} fill={["#a88576", "#d0a690", "#ecc2a4"][i]} opacity={alevBoy} />)}
        {Array.from({ length: 21 }).map((_, i) => { const x = DUVAR_X + i * 0.12; return <path key={i} d={poli(k, [[x, 0, -3], [x, 0, 40], [x + 0.012, 0, 40], [x + 0.012, 0, -3]])} fill={mix(BP.guverteGolge, BP.kontur, 0.45)} />; })}
        {Array.from({ length: 40 }).map((_, i) => { const x = DUVAR_X + Math.floor(rr(`ek${i}`) * 20) * 0.12, z = -1 + rr(`ekz${i}`) * 14; return <path key={`e${i}`} d={poli(k, [[x, 0, z], [x + 0.12, 0, z], [x + 0.12, 0, z + 0.012], [x, 0, z + 0.012]])} fill={mix(BP.guverteGolge, BP.kontur, 0.5)} />; })}
        {Array.from({ length: 26 }).map((_, i) => { const x = DUVAR_X + 0.03 + Math.floor(rr(`dm${i}`) * 20) * 0.12, z = -1 + rr(`dmz${i}`) * 9; return <path key={`d${i}`} d={poli(k, [[x, 0, z], [x + 0.06, 0, z], [x + 0.06, 0, z + 0.9], [x, 0, z + 0.9]])} fill={mix(BP.guverteGolge, BP.guverte, 0.4)} opacity={0.5} />; })}
        <path d={poli(k, [[DUVAR_X, 0.001, HANGAR_Z1 + 1], [DUVAR_X, 0.001, 40], [1.4, 0.001, 40], [1.4, 0.001, HANGAR_Z1 + 4]])} fill={BP.guverte} />
        {/* açık kanat (iç yüzü alevden aydınlanır) */}
        {yan > 0 && <g>
          <path d={poli(k, kanat as V3[])} fill={mix(BP.kapi, BP.havuz, 0.6)} stroke={BP.kontur} strokeWidth={3} />
          {[1.3, 3.0].map((y, i) => <path key={i} d={poli(k, [[DUVAR_X, y, KAPI.z1], [uc[0], y, uc[2]], [uc[0], y + 0.1, uc[2]], [DUVAR_X, y + 0.1, KAPI.z1]])} fill={mix(BP.kapi, BP.kontur, 0.3)} />)}
          <path d={`M${pts([P(k, [uc[0], 0, uc[2]]), P(k, [uc[0], KAPI.h, uc[2]])])}`} stroke={BP.kenar} strokeWidth={3} />
        </g>}
        {/* T3: temas gölgesi alevden dışa (sağ-alt), adım geri, gövde hafif geri; kontrollü şaşkınlık */}
        <ellipse cx={ayak[0] + 40} cy={ayak[1] + 4} rx={0.32 * s3} ry={0.06 * s3} fill="#2a2638" opacity={0.6} />
        <path d={`M${ayak[0]},${ayak[1]} L${ayak[0] + 1.6 * s3},${ayak[1] + 0.3 * s3} L${ayak[0] + 1.6 * s3},${ayak[1] + 0.42 * s3} L${ayak[0] - 0.1 * s3},${ayak[1] + 0.08 * s3} Z`} fill="#2e2a40" opacity={0.35} />
        {(() => {
          const pz = { egilme: -9 * geri - 3, basEgim: 10, adim: 0.18 + 0.24 * geri };
          const sk = profilIskelet(ayak, s3, -1, 1.75, pz);
          // 1917 denizci iş kıyafeti: açık V yakalı kazak (iç fanila), kollar sıvalı, baş açık; kemer/ceket yok
          const kiy = { tur: "kazak" as const, renk: "#5f6278", isik: mix("#7a7c92", BP.havuz, 0.5), golge: "#44465c", pantolon: "#545a6e", pantolonIsik: mix("#6e7488", BP.havuz, 0.45), cizme: "#2a2836" };
          // ön kol yüzü korur: el yüz hizasında öne, avuç aleve dönük; dirsek aşağıda
          const onKol = <KolOmuz omuzR={0.048 * s3} omuzIsik={BP.havuz} kolluk={{ renk: kiy.renk, oran: 0.55 }} ad="T3 kol" omuz={sk.omuz} bilek={[sk.bas[0] - 0.2 * s3, sk.bas[1] + 0.02 * s3]} E={0.18 * s3} poz="avuc" elAci={-125} kolBoy={[0.29 * s3, 0.26 * s3]} bukum={-1} ayna palet={EL_T} kolRenk={mix(EL_T.isik, EL_T.golge, 0.3)} kolKontur="#3b2e2a" gen={[0.095 * s3, 0.075 * s3, 0.06 * s3]} isik={[-0.9, -0.3]} taramaAci={65} kenar={{ renk: BP.havuz, alfa: 0.9 }} />;
          const arkaKol = <path d={`M${sk.omuz[0] + 0.02 * s3},${sk.omuz[1]} q${0.06 * s3},${0.2 * s3} ${0.02 * s3},${0.36 * s3}`} stroke={mix(kiy.golge, "#2a201c", 0.3)} strokeWidth={0.085 * s3} fill="none" strokeLinecap="round" />;
          return <ProfilFigur ayak={ayak} s={s3} yon={-1} boy={1.75} pz={pz} k={kiy} kart={YUZ_KART.T3} isik="on" sicak={BP.havuz} bakisY={-0.2} onKol={onKol} arkaKol={arkaKol} />;
        })()}
        <Flu s={6}>{(() => { const c = P(k, [0.55, 0, 1.0]), sc = izd(k, [0.55, 0, 1.0])!.s; return <g>
          {[0.32, 0.26, 0.2, 0.14].map((rr2, i) => <ellipse key={i} cx={c[0]} cy={c[1] - sc * 0.05 * i} rx={sc * rr2} ry={sc * rr2 * 0.42} fill="none" stroke={i % 2 ? BP.halat : "#8a7660"} strokeWidth={sc * 0.06} />)}
          <path d={`M${c[0] - sc * 0.3},${c[1] - sc * 0.1} a${sc * 0.3},${sc * 0.12} 0 0 1 ${sc * 0.5},${-sc * 0.06}`} stroke={BP.kenar} strokeWidth={sc * 0.015} fill="none" />
        </g>; })()}</Flu>
        {/* ön plan: korkuluk dikmeleri + tırabzan (sancak tarafı x 1.4), flu */}
        <Flu s={5}>{[0.6, 1.4, 2.2, 3.0].map((z, i) => { const a = P(k, [1.25, 0, z]), b = P(k, [1.25, 1.05, z]); return isNaN(a[0]) ? null : <line key={`kd${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#4e4048" strokeWidth={Math.max(8, izd(k, [1.25, 0.5, z])!.s * 0.05)} />; })}
          <path d={poli(k, [[1.25, 1.02, 0.4], [1.25, 1.02, 9], [1.25, 1.08, 9], [1.25, 1.08, 0.4]])} fill="#4e4048" /></Flu>
        {/* darbe çakımı (≤ 10 kare, ekranın %10'undan küçük; yıldız/şok halkası yok) */}
        {/* duman zerresi (sağa) */}
        {Array.from({ length: 30 }).map((_, i) => { const x = ((rr(`dz${i}`) * 1200 + t * (30 + rr(`dzv${i}`) * 30)) % 1200) - 60, y = 200 + rr(`dzy${i}`) * 900 - t * 10; return <circle key={i} cx={x} cy={y} r={2 + rr(`dzr${i}`) * 2} fill={BP.dumanGolge} opacity={0.3} />; })}
      </Isleme></RenkKaydi>
    </svg>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const g = param<Gorunum>(plan, "gorunum", "hangar-kapi");
  if (!KURULU.includes(g)) throw new Error(`[GEMI-INSERT] görünüm "${g}" kurulmadı (kurulu: ${KURULU.join(", ")}) — kalibrasyon turu 1`);
  return <HangarKapi plan={plan} p={p} kilit={kilit} />;
};
export const GEMI_INSERT: Sablon = { Sahne, arsiv: () => "litografi" };
