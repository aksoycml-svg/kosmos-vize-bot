// ===== KIYI-BATARYA `tegmen` görünümü (P05; tasarim §4.1, mekanlar §3.4, sahne-plani P05 + §12 kartı) =====
// 85 mm, göz 0.5 m (alçak açı), b 125° (yay sonu) → güneş rel 110 (sağ-arka): yüzlerin ÖN düzlemi sıcak, kameraya bakan yanak mor.
// Plakalar (ref = yay ve itme sonu kamerası, ekran px). z (m): katır 0.5 · namlu/el 1.35 · teğmen yüzü 1.6 · tekerlek 2.2 · erler 4.6/5.2 ·
// mevzi duvarı 5.5 · kıyı burnu 1500 · Kaş sırtları 4000/8000 · gök ∞. Rack focus: odak_z namlu(1.35) → yüz(1.6), diyafram f/18.
// BMC-D4: pat (el 6 px kalkar, iner) kareleri `tegmen.pat`; el sabit sonra. Boştaki el kadraj dışında (Çiçero kuralı).
import React from "react";
import { interpolate } from "remotion";
import type { Plan } from "../../tipler";
import { param, SablonProps } from "../../ortak";
import { cl, GIRIS } from "../../zaman";
import { kamera25, Kamera25, plaka } from "../../kamera25d";
import { RenkKaydi } from "../../../doku/Tarama";
import { BP, BulutSerit, gokSutun, Gok5, Katman, kirik, P2, pts, rr, Tara } from "./bmcOrtak";
import { karisim as mix } from "./renk";
import { figurYol, KolOmuz, ProfilFigur, profilIskelet, YUZ_KART } from "./Figur";

export const TEGMEN_REF: Kamera25 = { kare: [0], konum_yol: [[0, 0.5, 0]], yon_yol: [[0, 0]], lens_mm: [85], odak_z: [1.6], diyafram: 18 };
const EL_TEGMEN = { isik: "#cba790", golge: "#8a6f7a", konturYuk: "#5a4438", konturIsik: "#a8836c", kenar: "#eec5a2", tarama: "#6a4f40", manset: "#8c8466", mansetGolge: "#4f4b60" };
const EL_ER = { isik: "#c4a088", golge: "#8a6f7a", konturYuk: "#5a4438", konturIsik: "#a8836c", kenar: "#eec5a2", tarama: "#6a4f40", manset: "#7d7860", mansetGolge: "#615c70" };
const HAKI = { isik: "#a39a78", orta: "#85805f", golge: "#615c70" }, ER_HAKI = { isik: "#8f8a6c", orta: "#7d7860", golge: "#615c70" };

const Sirt: React.FC<{ taban: number; tepeler: [number, number, number][]; renk: string; seed: string }> = ({ taban, tepeler, renk, seed }) => {
  const A: P2[] = [];
  for (let x = -600; x <= 1700; x += 8) { let y = taban; for (const [c, h, w] of tepeler) y -= h * Math.exp(-(((x - c) / w) ** 2)); y += (rr(`${seed}${Math.round(x / 22)}`) - 0.5) * 4; A.push([x, y]); }
  return <g><path d={`M-600,2400 L${pts(A)} L1700,2400 Z`} fill={renk} />
    {/* güneş sağda (rel 110): sağa bakan (inen) yamaçlarda sıcak bant */}
    {A.slice(1).map((q, i) => (q[1] > A[i][1] + 0.4 ? <line key={i} x1={A[i][0]} y1={A[i][1] + 2} x2={q[0]} y2={q[1] + 2} stroke={BP.sirtBant} strokeWidth={4} strokeLinecap="round" /> : null))}</g>;
};
// Kaş kıyısı: doğuya kıvrılan burun + deniz şeridi
const Kiyi: React.FC = () => (
  <g>
    <rect x={-600} y={1010} width={2300} height={140} fill={mix(BP.su, BP.bugu, 0.25)} />
    {Array.from({ length: 40 }).map((_, i) => { const x = -200 + rr(`dz${i}`) * 1500, y = 1016 + rr(`dzy${i}`) * 60; return <line key={i} x1={x} x2={x + 14 + rr(`dzl${i}`) * 20} y1={y} y2={y} stroke={x > 700 ? BP.suYol : BP.suGolge} strokeWidth={2.5} />; })}
    <path d={`M-600,1012 L${pts(kirik([-600, 1000], [420, 984], 12, 6, "kb"))} L560,1012 Z`} fill={mix(BP.sirt[2], BP.tasOrta, 0.3)} />
    <path d={`M${pts(kirik([-600, 1000], [420, 984], 12, 6, "kb"))}`} stroke={BP.sirtBant} strokeWidth={3} fill="none" />
  </g>
);
// mevzi iç yan duvarı (oyuk, sol): gölgede karst; sağ kenar ışıkta
const MevziDuvar: React.FC = () => {
  const kenar: P2[] = [[-200, -200], [260, -200], ...kirik([260, -200], [330, 420], 8, 18, "md1"), ...kirik([330, 420], [430, 1000], 8, 16, "md2"), [470, 1400], [-200, 1400]];
  return (
    <g strokeLinejoin="round">
      <path d={`M${pts(kenar)} Z`} fill={BP.tasGolge} />
      <path d={`M${pts([[-200, 300], [120, 260], [200, 520], [60, 700], [-200, 720]])} Z`} fill="#655c84" />
      <path d={`M${pts([[-200, 900], [180, 840], [300, 1000], [140, 1200], [-200, 1240]])} Z`} fill="#5d5580" />
      <path d={`M${pts(kenar.slice(2, 19))}`} stroke={BP.kenar} strokeWidth={4} fill="none" />
      {[[40, 60, 300], [150, 120, 380], [250, 500, 300], [60, 760, 260]].map(([x, y, L], i) => <g key={i}><path d={`M${x - 8},${y} L${x + 4},${y + L} L${x + 8},${y} Z`} fill={BP.tasDerin} /><path d={`M${x + 8},${y} L${x + 5},${y + L}`} stroke="#8a7fa4" strokeWidth={2.5} /></g>)}
      <Tara d={`M${pts([[-200, -200], [260, -200], [300, 120], [-200, 160]])} Z`} aci={95} aralik={8} kalin={2.2} renk={BP.tasDerin} alfa={0.5} kutu={[-200, -200, 300, 160]} />
      <path d={`M${pts([[60, 1080], [150, 1060], [200, 1100], [120, 1120]])} Z`} fill={BP.toprak} opacity={0.8} />
    </g>
  );
};
// top tekerleği (ahşap, çelik çember, 12 parmak) — ön ışık değil: çember sağ kenarı ışıkta
const Teker: React.FC<{ c: P2; r: number }> = ({ c, r }) => (
  <g>
    <circle cx={c[0]} cy={c[1]} r={r} fill="none" stroke="#4c4a60" strokeWidth={r * 0.07} />
    <circle cx={c[0]} cy={c[1]} r={r * 0.93} fill="none" stroke="#8a6f5a" strokeWidth={r * 0.1} />
    {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2 + 0.1; return <line key={i} x1={c[0] + Math.cos(a) * r * 0.16} y1={c[1] + Math.sin(a) * r * 0.16} x2={c[0] + Math.cos(a) * r * 0.88} y2={c[1] + Math.sin(a) * r * 0.88} stroke={i % 3 ? "#7a604e" : "#8a6f5a"} strokeWidth={r * 0.06} />; })}
    <circle cx={c[0]} cy={c[1]} r={r * 0.18} fill="#5a4a44" stroke="#3a3040" strokeWidth={r * 0.02} />
    <path d={`M${c[0] + r * 0.6},${c[1] - r * 0.78} A${r},${r} 0 0 1 ${c[0] + r},${c[1]}`} stroke={BP.kenar} strokeWidth={r * 0.025} fill="none" />
    <path d={`M${c[0] + r * 0.62},${c[1] - r * 0.7} A${r * 0.9},${r * 0.9} 0 0 1 ${c[0] + r * 0.9},${c[1]}`} stroke="#b89070" strokeWidth={r * 0.03} fill="none" />
  </g>
);
// namlu (yatay, sağa uzanır, sağ uç = ağız) — tek uzun ışık şeridi (kor rengi yok), alt yüz tarama II
const Namlu: React.FC<{ x0: number; x1: number; y0: number; y1: number; k0: number; k1: number }> = ({ x0, x1, y0, y1, k0, k1 }) => {
  const d = `M${x0},${y0 - k0 / 2} L${x1},${y1 - k1 / 2} L${x1},${y1 + k1 / 2} L${x0},${y0 + k0 / 2} Z`;
  const yA = (x: number, f: number) => { const t = (x - x0) / (x1 - x0); return y0 + (y1 - y0) * t + (k0 + (k1 - k0) * t) * f; };
  return (
    <g strokeLinejoin="round">
      {/* lafet: muylu kulağı namlunun altından tekerlek göbeğine (sol alt) iner */}
      <path d={`M${x0 + 300},${yA(x0 + 300, 0.4)} L${x0 + 480},${yA(x0 + 480, 0.4)} L${x0 + 190},${y0 + 470} L${x0 + 60},${y0 + 450} Z`} fill="#4c4a60" stroke="#2a2740" strokeWidth={5} />
      <path d={`M${x0 + 300},${yA(x0 + 300, 0.4)} L${x0 + 60},${y0 + 450}`} stroke="#a8a2b4" strokeWidth={4} opacity={0.6} />
      {/* geri tepme silindiri (namlu altında, kısa) + beşik kelepçeleri */}
      <path d={`M${x0 + 120},${yA(x0 + 120, 0.45)} L${x1 - 260},${yA(x1 - 260, 0.45)} L${x1 - 260},${yA(x1 - 260, 0.45) + k1 * 0.42} L${x0 + 120},${yA(x0 + 120, 0.45) + k0 * 0.42} Z`} fill="#46445a" stroke="#2a2740" strokeWidth={4} />
      <path d={`M${x0 + 120},${yA(x0 + 120, 0.5)} L${x1 - 260},${yA(x1 - 260, 0.5)}`} stroke="#8a86a0" strokeWidth={4} />
      <path d={d} fill="#5a5670" stroke="#2a2740" strokeWidth={5} />
      <path d={`M${x0},${yA(x0, -0.5)} L${x1},${yA(x1, -0.5)} L${x1},${yA(x1, -0.18)} L${x0},${yA(x0, -0.2)} Z`} fill="#6e6a86" />
      <path d={`M${x0},${yA(x0, -0.36)} L${x1 - 20},${yA(x1 - 20, -0.36)}`} stroke={BP.demirIsik} strokeWidth={10} strokeLinecap="round" />
      <Tara d={`M${x0},${yA(x0, 0.12)} L${x1},${yA(x1, 0.12)} L${x1},${yA(x1, 0.5)} L${x0},${yA(x0, 0.5)} Z`} aci={95} aralik={8} kalin={2.6} renk="#2a2740" alfa={0.55} kutu={[x0, Math.min(yA(x0, 0.1), yA(x1, 0.1)), x1, Math.max(yA(x0, 0.5), yA(x1, 0.5))]} />
      {/* takviye bileziği + ağız halkası (sağ uç, rim ışık) */}
      {[0.12, 0.62].map((f, i) => { const x = x0 + (x1 - x0) * f; return <path key={i} d={`M${x},${yA(x, -0.53)} L${x + 34},${yA(x + 34, -0.53)} L${x + 34},${yA(x + 34, 0.53)} L${x},${yA(x, 0.53)} Z`} fill="#4c4a60" stroke="#2a2740" strokeWidth={4} />; })}
      <path d={`M${x1 - 40},${yA(x1, -0.56)} L${x1},${yA(x1, -0.56)} L${x1},${yA(x1, 0.56)} L${x1 - 40},${yA(x1, 0.56)} Z`} fill="#4c4a60" stroke="#2a2740" strokeWidth={4} />
      <ellipse cx={x1} cy={y1} rx={k1 * 0.16} ry={k1 * 0.56} fill="#3a3650" stroke="#2a2740" strokeWidth={4} />
      <ellipse cx={x1 + 4} cy={y1} rx={k1 * 0.07} ry={k1 * 0.24} fill="#14121c" />
      <path d={`M${x1 - 4},${y1 - k1 * 0.54} A${k1 * 0.16},${k1 * 0.56} 0 0 1 ${x1 + k1 * 0.15},${y1}`} stroke={BP.kenar} strokeWidth={5} fill="none" />
    </g>
  );
};
// katır başı (yalnız baş + iki uzun kulak; ön plan flu) — uzun kulak = katır (at değil)
const KatirBasi: React.FC = () => (
  <g>
    <path d={figurYol([[-80, 520], [-40, 330], [60, 250], [170, 300], [250, 470], [300, 640], [230, 700], [120, 640], [0, 660], [-80, 700]])} fill="#6e6068" />
    <path d={figurYol([[40, 270], [10, 60], [40, -10], [80, 70], [90, 260]])} fill="#655862" />
    <path d={figurYol([[120, 270], [150, 40], [200, -20], [215, 80], [170, 290]])} fill="#6e6068" />
    <path d="M150,40 Q200,-20 215,80" stroke={BP.kenar} strokeWidth={10} fill="none" />
    <path d="M170,300 Q260,430 300,640" stroke={BP.kenar} strokeWidth={10} fill="none" />
    <circle cx={190} cy={420} r={14} fill="#2a2430" />
    <path d="M-80,560 L300,560" stroke="#8a6f5a" strokeWidth={26} opacity={0.9} />
  </g>
);

export const TegmenSahne: React.FC<{ plan: Plan; p: number; kilit: SablonProps["kilit"] }> = ({ plan, p, kilit }) => {
  const ref = kamera25(undefined, 0, TEGMEN_REF);
  const k = kamera25(param<Partial<Kamera25>>(plan, "kamera25", {}), p, TEGMEN_REF);
  const t = p / 60, gok = gokSutun(param<number>(plan, "gun_yuksekligi", 22));
  const pat = param<{ pat: number[] }>(plan, "tegmen", { pat: [87, 120] }).pat;
  // el kalkışı: her pat'tan 10 kare önce 6 px yukarı (GIRIS), pat karesinde temas (hızlı iniş)
  const kalk = pat.reduce((m, q) => Math.max(m, interpolate(p, [q - 12, q - 4, q], [0, 1, 0], { ...cl, easing: GIRIS })), 0) * 10;
  const nefes = Math.sin(t * 2 * Math.PI * 0.25) * 1.5;
  // ekran yerleşimi (ref, k150): namlu y 1080–1290; teğmen başı kulak (690, 690), H 470; el namlu üstünde
  const nY0 = 1320, nY1 = 1262, nK0 = 232, nK1 = 196, nX0 = -120, nX1 = 1010;
  const nUst = (x: number) => nY0 + (nY1 - nY0) * ((x - nX0) / (nX1 - nX0)) - (nK0 + (nK1 - nK0) * ((x - nX0) / (nX1 - nX0))) / 2;
  const skT = profilIskelet([778, 2633 + nefes], 1594, 1, 1.72, { diz: true, egilme: 4 });
  // kol: omuz (gövde içinde) → dirsek namlu üstüne dayalı → ön kol namlu boyunca, el kamaya doğru; avuç namluyu kavrar (dayali)
  const omuz: P2 = skT.omuz, dirsek: P2 = [omuz[0] - 100, nUst(omuz[0] - 100) + 4], bilek: P2 = [dirsek[0] - 170, nUst(dirsek[0] - 170) + 2 - kalk];
  kilit.push({ ad: "teğmen yüz", p: plaka(ref, k, 1.6).T([skT.bas[0] + 120, skT.bas[1] + 40]), tur: "yuz" }, { ad: "el (pat)", p: plaka(ref, k, 1.35).T([430, nUst(430)]), tur: "dokunus" },
    { ad: "E1 yüz", p: plaka(ref, k, 4.6).T([200, 600]), tur: "yuz" }, { ad: "E3 yüz", p: plaka(ref, k, 5.2).T([470, 560]), tur: "yuz" });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <RenkKaydi>
        <Katman r={ref} k={k} z={1e7}><Gok5 sinir={[200, 420, 620, 800]} renk={gok} seed={195} x0={-800} x1={1900} />
          <BulutSerit x0={500} x1={1300} y={470} h={30} seed="tg1" /><BulutSerit x0={-200} x1={420} y={690} h={22} seed="tg2" /><BulutSerit x0={620} x1={1200} y={760} h={16} seed="tg3" renk="#ecd0c2" /></Katman>
        <Katman r={ref} k={k} z={8000}><Sirt taban={1000} tepeler={[[200, 90, 260], [620, 120, 240], [1000, 80, 220]]} renk={mix(BP.sirt[0], BP.bugu, 0.25)} seed="ts1" /><rect x={-600} y={960} width={2300} height={40} fill={BP.bugu} opacity={0.35} /></Katman>
        <Katman r={ref} k={k} z={4000}><Sirt taban={1010} tepeler={[[-100, 70, 200], [380, 60, 180], [860, 95, 200], [1300, 60, 200]]} renk={BP.sirt[1]} seed="ts2" /></Katman>
        <Katman r={ref} k={k} z={1500}><Kiyi /></Katman>
        {/* mevzi tabanı (sekisi): ışıkta kireçtaşı + toz */}
        <Katman r={ref} k={k} z={8}>
          <path d={`M-600,2400 L${pts(kirik([-600, 1080], [1700, 1060], 20, 6, "tb"))} L1700,2400 Z`} fill={mix(BP.tasOrta, BP.tasIsik, 0.35)} />
          <path d={`M${pts(kirik([-600, 1080], [1700, 1060], 20, 6, "tb"))}`} stroke={BP.kenar} strokeWidth={3} fill="none" />
          {Array.from({ length: 30 }).map((_, i) => <ellipse key={i} cx={-400 + rr(`tt${i}`) * 2000} cy={1100 + rr(`tty${i}`) * 500} rx={20 + rr(`ttr${i}`) * 30} ry={5} fill={BP.tasGolge} opacity={0.35} />)}
        </Katman>
        <Katman r={ref} k={k} z={5.5}><MevziDuvar /></Katman>
        {/* E3 (z 5.2, arka basamakta +0.5 m): halat omuzda, iki eli halatta (emek); profil sağa, ağırbaşlı */}
        <Katman r={ref} k={k} z={5.2}>{(() => {
          const ay: P2 = [452, 1440], sE = 490, pz = { egilme: 10, basEgim: 4, adim: 0.3 };
          const sk = profilIskelet(ay, sE, 1, 1.68, pz);
          const kiy = { tur: "ceket" as const, renk: ER_HAKI.orta, isik: ER_HAKI.isik, golge: ER_HAKI.golge, pantolon: "#6e6a58", pantolonIsik: "#8f8a6c", cizme: "#3a3446" };
          const halat = <g><path d={`M${sk.omuz[0] - 0.12 * sE},${sk.omuz[1] - 0.02 * sE} Q${sk.omuz[0] + 0.05 * sE},${sk.omuz[1] + 0.25 * sE} ${sk.omuz[0] + 0.32 * sE},${sk.omuz[1] + 0.62 * sE}`} stroke={BP.halat} strokeWidth={0.035 * sE} fill="none" />
            <path d={`M${sk.omuz[0] - 0.11 * sE},${sk.omuz[1] - 0.03 * sE} Q${sk.omuz[0] + 0.06 * sE},${sk.omuz[1] + 0.23 * sE} ${sk.omuz[0] + 0.31 * sE},${sk.omuz[1] + 0.6 * sE}`} stroke="#a89070" strokeWidth={0.01 * sE} fill="none" /></g>;
          const kol = <KolOmuz omuzR={0.045 * sE} ad="E3 halat" omuz={sk.omuz} bilek={[sk.omuz[0] + 0.14 * sE, sk.omuz[1] + 0.3 * sE]} E={0.18 * sE} poz="tutus" elAci={55} kolBoy={[0.29 * sE, 0.26 * sE]} bukum={-1} palet={EL_ER} kolRenk={ER_HAKI.orta} kolKontur="#3a3650" gen={[0.09 * sE, 0.08 * sE, 0.062 * sE]} isik={[0.8, -0.6]} taramaAci={95} kenar={{ renk: BP.kenar, alfa: 0.9 }} />;
          return <ProfilFigur ayak={ay} s={sE} yon={1} boy={1.68} pz={pz} k={kiy} kart={YUZ_KART.E3} isik="on" onKol={<>{halat}{kol}</>} />;
        })()}</Katman>
        {/* E1 (z 4.6, basamakta): usta er, gözler kısık, denize bakar; yakın eli kaya duvarına dayalı (havada değil) */}
        <Katman r={ref} k={k} z={4.6}>{(() => {
          const ay: P2 = [168, 1478], sE = 554, pz = { egilme: 6, basEgim: 2, adim: 0.2 };
          const sk = profilIskelet(ay, sE, 1, 1.72, pz);
          const kiy = { tur: "ceket" as const, renk: ER_HAKI.orta, isik: ER_HAKI.isik, golge: ER_HAKI.golge, pantolon: "#6e6a58", pantolonIsik: "#8f8a6c", cizme: "#3a3446" };
          const kol = <KolOmuz omuzR={0.045 * sE} ad="E1 kaya" omuz={sk.omuz} bilek={[sk.omuz[0] + 0.32 * sE, sk.omuz[1] + 0.2 * sE]} E={0.18 * sE} poz="dayali" elAci={20} kolBoy={[0.29 * sE, 0.26 * sE]} bukum={1} palet={EL_ER} kolRenk={ER_HAKI.orta} kolKontur="#3a3650" gen={[0.09 * sE, 0.08 * sE, 0.062 * sE]} isik={[0.8, -0.6]} taramaAci={95} kenar={{ renk: BP.kenar, alfa: 0.9 }} />;
          return <g>
            {/* dayandığı kaya çıkıntısı (mevzi iç duvarının basamağı) */}
            <path d={`M${pts([[sk.omuz[0] + 0.2 * sE, sk.omuz[1] + 0.27 * sE], [sk.omuz[0] + 0.62 * sE, sk.omuz[1] + 0.24 * sE], [sk.omuz[0] + 0.7 * sE, 1400], [sk.omuz[0] + 0.15 * sE, 1400]])} Z`} fill={mix(BP.tasGolge, BP.tasOrta, 0.3)} stroke="#4a4468" strokeWidth={3} />
            <path d={`M${sk.omuz[0] + 0.2 * sE},${sk.omuz[1] + 0.27 * sE} L${sk.omuz[0] + 0.62 * sE},${sk.omuz[1] + 0.24 * sE}`} stroke={BP.kenar} strokeWidth={4} />
            <ProfilFigur ayak={ay} s={sE} yon={1} boy={1.72} pz={pz} k={kiy} kart={YUZ_KART.E1} isik="on" onKol={kol} />
          </g>;
        })()}</Katman>
        {/* top tekerleği (z 2.2) */}
        <Katman r={ref} k={k} z={2.2}><Teker c={[40, 1640]} r={520} /></Katman>
        {/* teğmen (z 1.6): diz çökmüş, gövde dik, profil sağa (güneye); boştaki (uzak) kol gövdenin arkasında, görünmez */}
        <Katman r={ref} k={k} z={1.6}>{(() => {
          const kiy = { tur: "ceket" as const, renk: HAKI.orta, isik: HAKI.isik, golge: HAKI.golge, pantolon: "#76705a", pantolonIsik: "#9a9274", cizme: "#3a3446" };
          return <ProfilFigur ayak={[778, 2633 + nefes]} s={1594} yon={1} boy={1.72} pz={{ diz: true, egilme: 4, basEgim: 7 }} k={kiy} kart={YUZ_KART.tegmen} isik="on" />;
        })()}</Katman>
        {/* namlu + teğmenin eli (z 1.35): ön kol namlu üstünde, el geriye (kamaya) doğru dayalı; pat = 6 px kalkış */}
        <Katman r={ref} k={k} z={1.35}>
          <Namlu x0={nX0} x1={nX1} y0={nY0} y1={nY1} k0={nK0} k1={nK1} />
          <KolOmuz omuzR={0.048 * 1594} omuzIsik={BP.kenar} ad="teğmen el" omuz={omuz} dirsek={dirsek} bilek={bilek} E={250} poz="dayali" elAci={176} palet={EL_TEGMEN} kolRenk={HAKI.orta} kolKontur="#3a3650" gen={[150, 125, 95]} isik={[0.9, -0.4]} taramaAci={95} kenar={{ renk: BP.kenar, alfa: 0.9 }} temasGolge={{ renk: "#2a2740", kay: [0, 14 + kalk], alfa: 0.4 }} />
        </Katman>
        {/* katır başı (z 0.5, ön plan flu σ ≈ 7) */}
        <Katman r={ref} k={k} z={0.5}><g transform="translate(-150 120) scale(0.75)"><KatirBasi /></g></Katman>
      </RenkKaydi>
    </svg>
  );
};
