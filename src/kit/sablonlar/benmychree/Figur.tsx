// ===== Yüzlü figür (Ben-my-Chree; tasarim.md §4.1–4.2b; CLAUDE "Askerler ve şehitler": yüzsüz er yok) =====
// Tek rig, kart parametreleriyle: teğmen, Osmanlı erleri E1–E4, Royal Navy tayfası T1–T4. Poz ayrı çizilmez (Paris "tek rig").
// Baş: PROFİL (sağa bakar; ayna = sola). Yerel birim H = tepe→çene; orijin kulak merkezi. Kalibrasyon turu 1'de ¾ görünüm YOK (kit_eksik).
// Işık: `on` = ışık yüzün baktığı yandan (ön düzlem sıcak: alın, burun sırtı, dudak, çene) · `arka` = ense/kulak kenar ışığı.
//   Kameraya bakan yanak mavi-mor gölge, terminatörde kısa tarama, yanak altında gökten yansıma hilali. Ten C* ≤ 20.
import React, { useId } from "react";
import { BP, P2, pts, rr } from "./bmcOrtak";
import { karisim as mix } from "./renk";
import { ElKol40, ElKol40Props, elKolGeo } from "../../props/cicero/El40";

export type YuzKart = {
  ad: string; yas: number;
  uzun: number; cene: number; burun: number; dudak: number; elmacik: number; boyun: number;
  kas: number; kasAci: number; goz: number; // goz: açıklık (1 = normal, .55 kısık)
  biyik: "yok" | "gur" | "seyrek-kir" | "kir-gur"; sakal: number; yara: boolean; toz: number; ter: boolean; kirisik: number;
  ten: string; tenGolge: string; sac: string; baslik: BaslikTip; kulak: number;
};
const TEN_GOLGE = "#8a6f7a";
// tasarim §4.1 teğmen (≈24, bıyıksız, temiz, genç) · §4.2 E1–E4 · §4.2b T1–T4 (kısa saç, başlıksız, kıyafet koyu nötr)
export const YUZ_KART: Record<string, YuzKart> = {
  tegmen: { ad: "Teğmen", yas: 24, uzun: 1.0, cene: 0.45, burun: 1.05, dudak: 0.9, elmacik: 0.5, boyun: 0.95, kas: 1.15, kasAci: 1, goz: 0.95, biyik: "yok", sakal: 0, yara: false, toz: 0, ter: false, kirisik: 0, ten: "#cba790", tenGolge: TEN_GOLGE, sac: "#3a2f2e", baslik: "yuvarlak-koyu", kulak: 1 },
  E1: { ad: "E1 usta er", yas: 38, uzun: 0.95, cene: 0.95, burun: 1.0, dudak: 1.0, elmacik: 0.6, boyun: 1.25, kas: 1.35, kasAci: 4, goz: 0.55, biyik: "gur", sakal: 0, yara: false, toz: 0.6, ter: true, kirisik: 0.55, ten: "#c4a088", tenGolge: TEN_GOLGE, sac: "#2f2826", baslik: "yuvarlak-haki", kulak: 1 },
  E2: { ad: "E2 genç er", yas: 19, uzun: 1.08, cene: 0.25, burun: 0.95, dudak: 0.85, elmacik: 0.9, boyun: 0.85, kas: 0.8, kasAci: -3, goz: 1.1, biyik: "yok", sakal: 0, yara: false, toz: 0.5, ter: true, kirisik: 0, ten: "#d0ae96", tenGolge: TEN_GOLGE, sac: "#2f2826", baslik: "yuvarlak-haki", kulak: 1 },
  E3: { ad: "E3 orta yaşlı er", yas: 30, uzun: 0.92, cene: 0.7, burun: 0.92, dudak: 1.05, elmacik: 0.3, boyun: 1.1, kas: 1.1, kasAci: 2, goz: 0.85, biyik: "yok", sakal: 0.8, yara: true, toz: 0.4, ter: false, kirisik: 0.25, ten: "#b89480", tenGolge: TEN_GOLGE, sac: "#2f2826", baslik: "yuvarlak-haki", kulak: 1 },
  E4: { ad: "E4 yaşlı er", yas: 45, uzun: 1.1, cene: 0.6, burun: 1.12, dudak: 0.8, elmacik: 0.8, boyun: 1.0, kas: 1.45, kasAci: 3, goz: 0.8, biyik: "seyrek-kir", sakal: 0, yara: false, toz: 0.3, ter: false, kirisik: 0.9, ten: "#c9a88f", tenGolge: TEN_GOLGE, sac: "#6e6662", baslik: "yuvarlak-haki", kulak: 1.25 },
  T1: { ad: "T1", yas: 22, uzun: 1.06, cene: 0.3, burun: 0.95, dudak: 0.85, elmacik: 0.7, boyun: 0.9, kas: 0.8, kasAci: -2, goz: 1.0, biyik: "yok", sakal: 0, yara: false, toz: 0, ter: false, kirisik: 0, ten: "#d0ae96", tenGolge: TEN_GOLGE, sac: "#5a4636", baslik: "yok", kulak: 1 },
  T2: { ad: "T2", yas: 40, uzun: 0.95, cene: 0.85, burun: 1.05, dudak: 1.0, elmacik: 0.5, boyun: 1.2, kas: 1.2, kasAci: 2, goz: 0.8, biyik: "kir-gur", sakal: 0, yara: false, toz: 0, ter: false, kirisik: 0.6, ten: "#c4a088", tenGolge: TEN_GOLGE, sac: "#7a7068", baslik: "yok", kulak: 1.05 },
  T3: { ad: "T3", yas: 28, uzun: 1.08, cene: 0.55, burun: 1.08, dudak: 0.85, elmacik: 0.95, boyun: 0.95, kas: 1.0, kasAci: -6, goz: 1.15, biyik: "yok", sakal: 0.15, yara: false, toz: 0.8, ter: false, kirisik: 0.15, ten: "#c9a88f", tenGolge: TEN_GOLGE, sac: "#4a3a30", baslik: "yok", kulak: 1 },
  T4: { ad: "T4", yas: 33, uzun: 1.0, cene: 0.8, burun: 1.0, dudak: 0.8, elmacik: 0.6, boyun: 1.05, kas: 1.1, kasAci: 5, goz: 0.85, biyik: "yok", sakal: 0.2, yara: false, toz: 0, ter: true, kirisik: 0.3, ten: "#c4a088", tenGolge: TEN_GOLGE, sac: "#3a302a", baslik: "yok", kulak: 1 },
};

const yol = (a: P2[], kapali = true) => {
  // Catmull-Rom kapalı/açık
  const n = a.length, g = (i: number) => a[kapali ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${a[0][0].toFixed(2)},${a[0][1].toFixed(2)}`;
  for (let i = 0; i < (kapali ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(2)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(2)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(2)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`; }
  return kapali ? d + " Z" : d;
};

/** profil yüz noktaları (birim H; kart oranlarıyla) */
export const profilGeo = (c: YuzKart) => {
  const u = c.uzun, b = c.burun, ce = c.cene;
  const on: P2[] = [ // alın çizgisi → çene altı (ön kontur)
    [0.27, -0.36 * u], [0.335, -0.24 * u], [0.37, -0.125 * u], [0.345, -0.065 * u],
    [0.355 + 0.045 * b, 0.02 * u], [0.37 + 0.07 * b, 0.1 * u], [0.405 + 0.02 * b, 0.135 * u], [0.365, 0.16 * u],
    [0.38 + 0.01 * c.dudak, 0.215 * u], [0.356, 0.25 * u], [0.372 + 0.01 * c.dudak, 0.285 * u], [0.342, 0.322 * u],
    [0.37 + 0.02 * ce, 0.4 * u], [0.33 + 0.02 * ce, 0.462 * u], [0.25, 0.49 * u],
  ];
  const cene: P2[] = [[0.12, 0.47 * u], [-0.02 - 0.04 * ce, 0.36 * u + 0.04 * ce], [-0.1, 0.2 * u]]; // çene hattı → kulak altı
  const arka: P2[] = [[-0.26, 0.24 * u], [-0.41, 0.0], [-0.38, -0.3 * u], [-0.12, -0.5 * u], [0.12, -0.49 * u]];
  return { on, cene, arka, goz: [0.272, -0.045 * u] as P2, kulak: [-0.06, -0.01] as P2 };
};

/** PROFİL BAŞ (sağa bakar). x,y = kulak merkezi ekran px; H = tepe→çene px. isik: "on" | "arka". bakis: göz bebeği öne/aşağı kayması (−1…1) */
export const BasProfil: React.FC<{ kart: YuzKart; x: number; y: number; H: number; ayna?: boolean; egim?: number; isik?: "on" | "arka"; sicak?: string; kenar?: string; bakisY?: number; agizAcik?: number }> = ({ kart: c, x, y, H, ayna, egim = 0, isik = "on", sicak = "#e4b496", kenar = BP.kenar, bakisY = 0, agizAcik = 0 }) => {
  const id = useId().replace(/:/g, "");
  const g = profilGeo(c), u = c.uzun;
  const kafa = [...g.on, ...g.cene, ...g.arka];
  const kd = yol(kafa), sw = (px: number) => px / H; // ekran px → birim
  const tenI = c.ten, tenG = mix(c.ten, c.tenGolge, 0.62), yansima = "#b9a8b4";
  const kontur = mix(c.tenGolge, "#2f2d46", 0.55);
  const yasCizgi = Math.max(0, c.kirisik);
  return (
    <g transform={`translate(${x} ${y}) rotate(${egim}) scale(${ayna ? -H : H} ${H})`} strokeLinecap="round" strokeLinejoin="round">
      <defs><clipPath id={`k${id}`}><path d={kd} /></clipPath></defs>
      {/* boyun (kafanın arkasında) */}
      <path d={`M${0.16 * c.boyun},${0.44 * u} L${0.17 * c.boyun},${0.66} L${-0.18 * c.boyun},${0.66} L${-0.2 * c.boyun},${0.2 * u} Z`} fill={tenG} />
      <path d={`M${0.16 * c.boyun},${0.46 * u} L${0.17 * c.boyun},${0.66}`} stroke={isik === "on" ? sicak : kontur} strokeWidth={sw(isik === "on" ? 6 : 3)} />
      {c.boyun > 1.15 && <path d="M0.05,0.62 Q0.12,0.7 0.18,0.68" stroke={kontur} strokeWidth={sw(2.5)} fill="none" opacity={0.5} />}
      {/* kafa: gölge tonu taban */}
      <path d={kd} fill={tenG} stroke={kontur} strokeWidth={sw(3.5)} />
      <g clipPath={`url(#k${id})`}>
        {/* ön düzlem ışığı: ön kontur boyunca iç bant (alın, burun sırtı, dudak, çene) */}
        {isik === "on" && <>
          <path d={yol([[0.24, -0.62], [0.225, -0.3 * u], [0.185, -0.13 * u], [0.215, 0.04 * u], [0.25, 0.1 * u], [0.17, 0.22 * u], [0.21, 0.36 * u], [0.17, 0.5 * u], [0.12, 0.66], [0.7, 0.66], [0.7, -0.62]])} fill={mix(tenI, sicak, 0.35)} />
          {[0.18, 0.24, 0.3].map((yy, i) => <line key={i} x1={0.14} y1={yy * u} x2={0.165} y2={yy * u - 0.018} stroke={c.tenGolge} strokeWidth={sw(1.6)} opacity={0.35} />)}
          <path d={`M0.04,${0.37 * u} Q0.1,${0.43 * u} 0.16,${0.43 * u}`} stroke={yansima} strokeWidth={0.016} fill="none" opacity={0.4} /></>}
        {isik === "arka" && <path d={yol([...g.arka, [0.12, -0.49 * u]], false)} stroke={kenar} strokeWidth={sw(8)} fill="none" />}
        {/* elmacık altı / yanak hacmi: çizgi yok, yumuşak ten gölgesi alanı */}
        <ellipse cx={0.13} cy={0.17 * u} rx={0.09} ry={0.06} fill={mix(tenG, c.tenGolge, 0.4)} opacity={0.25 + 0.25 * c.elmacik} />
        <ellipse cx={0.2} cy={-0.24 * u} rx={0.06} ry={0.07} fill={mix(tenG, c.tenGolge, 0.4)} opacity={0.15 + 0.2 * yasCizgi} />
        {/* sakal (kısa kirli): çene ve yanak altında nokta tarama */}
        {c.sakal > 0 && Array.from({ length: Math.round(34 * c.sakal) }).map((_, i) => { const a = rr(`sk${c.ad}${i}`), b2 = rr(`sk2${c.ad}${i}`); const px = -0.06 + a * 0.42, py = (0.2 + b2 * 0.3) * u;
          return py > 0.17 + (px - 0.0) * 0.4 ? <circle key={i} cx={px} cy={py} r={sw(1.6)} fill={mix(c.sac, tenG, 0.25)} opacity={0.7} /> : null; })}
      </g>
      {/* kulak */}
      <path d={`M${g.kulak[0] + 0.05 * c.kulak},${g.kulak[1] - 0.08 * c.kulak} C${g.kulak[0] - 0.06 * c.kulak},${g.kulak[1] - 0.12 * c.kulak} ${g.kulak[0] - 0.09 * c.kulak},${g.kulak[1] + 0.08 * c.kulak} ${g.kulak[0] - 0.01 * c.kulak},${g.kulak[1] + 0.1 * c.kulak}`} fill={mix(tenG, tenI, 0.25)} stroke={kontur} strokeWidth={sw(3)} />
      <path d={`M${g.kulak[0] + 0.01},${g.kulak[1] - 0.04 * c.kulak} q-0.03,0.04 0.0,0.08`} stroke={kontur} strokeWidth={sw(2.2)} fill="none" />
      {isik === "arka" && <path d={`M${g.kulak[0] - 0.06 * c.kulak},${g.kulak[1] - 0.06 * c.kulak} Q${g.kulak[0] - 0.09 * c.kulak},${g.kulak[1] + 0.04} ${g.kulak[0] - 0.02},${g.kulak[1] + 0.11 * c.kulak}`} stroke={kenar} strokeWidth={sw(4)} fill="none" />}
      {/* saç: favori + ense (başlık altından) */}
      <path d={`M0.0,${-0.2 * u} Q0.07,${-0.21 * u} 0.085,${-0.17 * u} Q0.06,${-0.12 * u} 0.045,${-0.05 * u} Q0.03,${-0.09 * u} 0.0,${-0.12 * u} Z`} fill={c.sac} opacity={0.9} />
      <path d={`M-0.38,${-0.18 * u} Q-0.4,${0.02} -0.27,${0.2 * u} L-0.2,${0.1 * u} Q-0.28,${-0.02} -0.24,${-0.2 * u} Z`} fill={c.sac} />
      {c.baslik === "yok" && <path d={yol([[0.28, -0.36 * u], [0.22, -0.46 * u], [0.05, -0.53 * u], [-0.18, -0.52 * u], [-0.37, -0.36 * u], [-0.41, -0.12], [-0.3, -0.2 * u], [-0.1, -0.32 * u], [0.12, -0.36 * u]])} fill={c.sac} stroke={mix(c.sac, "#1c1a24", 0.5)} strokeWidth={sw(3)} />}
      {/* kaş */}
      <path d={`M0.17,${(-0.115 + c.kasAci * 0.003) * u} Q0.27,${-0.145 * u} 0.355,${(-0.128 - c.kasAci * 0.002) * u}`} stroke={mix(c.sac, "#3a2c2c", 0.4)} strokeWidth={sw(7) * c.kas * (H / 380) ** 0.3} fill="none" />
      {c.toz > 0.5 && <path d={`M0.2,${-0.135 * u} L0.3,${-0.15 * u}`} stroke="#c9b8b0" strokeWidth={sw(2)} opacity={0.7} />}
      {c.yara && <path d={`M0.26,${-0.17 * u} L0.29,${-0.1 * u}`} stroke="#d8c0b0" strokeWidth={sw(3)} />}
      {/* göz: profil kanat + üst kapak + kapak kıvrımı; tek koyu iris (parıltı yok) */}
      {(() => { const [gx, gy] = g.goz, a = 0.022 * c.goz; return <g>
        <path d={`M${gx - 0.05},${gy} Q${gx},${gy - a * 1.3} ${gx + 0.045},${gy + 0.004} Q${gx},${gy + a * 0.9} ${gx - 0.05},${gy} Z`} fill="#e3d8c6" stroke={kontur} strokeWidth={sw(2.2)} />
        <circle cx={gx + 0.024} cy={gy + 0.002 + bakisY * 0.006} r={Math.min(0.016, a * 0.75 + 0.004)} fill="#14120f" />
        <path d={`M${gx - 0.055},${gy + 0.001} Q${gx},${gy - a * 1.5} ${gx + 0.05},${gy + 0.003}`} stroke={mix(c.sac, "#2a2026", 0.5)} strokeWidth={sw(4.5)} fill="none" />
        <path d={`M${gx - 0.04},${gy - a * 1.7} Q${gx},${gy - a * 2.4 - 0.008} ${gx + 0.035},${gy - a * 1.4}`} stroke={kontur} strokeWidth={sw(2)} fill="none" opacity={0.6} />
        <ellipse cx={gx - 0.005} cy={gy + a * 1.9 + 0.01} rx={0.045} ry={0.016 + 0.01 * yasCizgi} fill={c.tenGolge} opacity={0.12 + 0.3 * yasCizgi} />
      </g>; })()}
      {/* ağız çizgisi + burun kanadı + nazolabial (yaş) */}
      <path d={`M0.356,${0.25 * u} Q0.32,${(0.255 + agizAcik * 0.01) * u} 0.28,${0.245 * u}`} stroke={kontur} strokeWidth={sw(3)} fill="none" />
      <path d={`M0.35,${0.14 * u} Q0.33,${0.125 * u} 0.335,${0.152 * u}`} stroke={c.tenGolge} strokeWidth={sw(2.2)} fill="none" opacity={0.6} />
      {/* bıyık */}
      {c.biyik !== "yok" && <path d={yol([[0.36, 0.17 * u], [0.378, 0.205 * u], [0.35, 0.226 * u], [0.3, 0.222 * u], [0.27, 0.21 * u], [0.31, 0.182 * u]])} fill={c.biyik === "gur" ? "#2f2826" : c.biyik === "kir-gur" ? "#8a827a" : "#a39a92"} opacity={c.biyik === "seyrek-kir" ? 0.8 : 1} />}
      {/* toz (alın/elmacık) ve ter (şakak) */}
      {c.toz > 0 && Array.from({ length: Math.round(14 * c.toz) }).map((_, i) => <circle key={i} cx={0.16 + rr(`tz${c.ad}${i}`) * 0.18} cy={(-0.3 + rr(`tzy${c.ad}${i}`) * 0.42) * u} r={sw(1.8)} fill="#c9b8b0" opacity={0.55} />)}
      {c.ter && <path d={`M0.16,${-0.2 * u} q0.008,0.02 0,0.03 q-0.008,-0.01 0,-0.03 Z`} fill="#e3d8c6" opacity={0.85} />}
      {/* başlık: alçak yuvarlak, siperliksiz; rozet/arma yok; ışık kenarı */}
      <BaslikProfil tip={c.baslik} u={u} H={H} isik={isik} sicak={sicak} kenar={kenar} />
    </g>
  );
};

/** üniforma gövdesi (yüksek yakalı haki ceket, rütbe/arma/düğme parlaklığı yok) — omuz hattı + bel; ekran px */
export const Govde: React.FC<{ boyun: P2; omuzOn: P2; omuzArka: P2; bel: P2[]; renk: string; golge: string; isik: string; kenar?: string; yaka?: boolean; kirlilik?: number; seed: string }> = ({ boyun, omuzOn, omuzArka, bel, renk, golge, isik, kenar = BP.kenar, yaka = true, kirlilik = 0, seed }) => {
  const govde: P2[] = [omuzArka, [boyun[0] - 30, boyun[1]], [boyun[0] + 30, boyun[1] + 4], omuzOn, ...bel];
  return (
    <g strokeLinejoin="round">
      <path d={yol(govde)} fill={golge} stroke={mix(golge, "#1c1a24", 0.4)} strokeWidth={3} />
      <path d={yol([[boyun[0] + 30, boyun[1] + 4], omuzOn, [omuzOn[0] + 10, omuzOn[1] + 120], [boyun[0] + 50, boyun[1] + 200], [boyun[0] + 20, boyun[1] + 40]])} fill={renk} />
      <path d={`M${boyun[0] + 30},${boyun[1] + 4} Q${(boyun[0] + omuzOn[0]) / 2 + 10},${omuzOn[1] - 18} ${omuzOn[0]},${omuzOn[1]}`} stroke={isik} strokeWidth={6} fill="none" />
      <path d={`M${omuzArka[0]},${omuzArka[1]} Q${(boyun[0] + omuzArka[0]) / 2},${omuzArka[1] - 22} ${boyun[0] - 30},${boyun[1]}`} stroke={kenar} strokeWidth={3} fill="none" opacity={0.8} />
      {yaka && <path d={`M${boyun[0] - 34},${boyun[1] - 4} L${boyun[0] - 30},${boyun[1] - 40} L${boyun[0] + 36},${boyun[1] - 34} L${boyun[0] + 38},${boyun[1] + 6} Z`} fill={mix(renk, golge, 0.4)} stroke={mix(golge, "#1c1a24", 0.4)} strokeWidth={2.5} />}
      {/* kumaş kıvrımları + kirlilik (toz) */}
      {[0, 1, 2].map((i) => <path key={i} d={`M${boyun[0] + 10 + i * 30},${boyun[1] + 80 + i * 40} q${20},${30} ${10},${70}`} stroke={mix(golge, "#1c1a24", 0.3)} strokeWidth={3} fill="none" opacity={0.6} />)}
      {kirlilik > 0 && Array.from({ length: Math.round(30 * kirlilik) }).map((_, i) => <circle key={i} cx={omuzArka[0] + rr(`${seed}k${i}`) * (omuzOn[0] - omuzArka[0] + 60)} cy={boyun[1] + 40 + rr(`${seed}ky${i}`) * 300} r={2.5} fill="#c9b8b0" opacity={0.5} />)}
    </g>
  );
};
export { yol as figurYol };
export const _pts = pts;

// ===== Ayakta / diz çökmüş PROFİL figür (tek rig; eklem IK) =====
// Yerel birim m; s = px/m; ayak = iki ayağın ortası (zemin teması). yon +1 sağa bakar, −1 sola.
// Kıyafet: "ceket" (Osmanlı haki ceket, kalça altına iner) · "kazak" (Royal Navy iş kazağı, belde biter). Rütbe/arma/rozet yok.
export type FigurPoz = { egilme?: number; basEgim?: number; adim?: number; agirlik?: number; diz?: boolean; nefes?: number };
export type Kiyafet = { tur: "ceket" | "kazak"; renk: string; isik: string; golge: string; pantolon: string; pantolonIsik: string; cizme: string };
const ik2 = (a: P2, b: P2, L1: number, L2: number, yon: number): P2 => {
  const d = Math.min(L1 + L2 - 1e-4, Math.hypot(b[0] - a[0], b[1] - a[1])), t = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const c = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d))));
  return [a[0] + Math.cos(t + yon * c) * L1, a[1] + Math.sin(t + yon * c) * L1];
};
const kapsul = (a: P2, b: P2, wa: number, wb: number, bombe = 0): string => {
  const t = Math.atan2(b[1] - a[1], b[0] - a[0]), n: P2 = [-Math.sin(t), Math.cos(t)], m: P2 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const q = (p: P2, w: number, sgn: number): P2 => [p[0] + n[0] * w * sgn, p[1] + n[1] * w * sgn];
  const A1 = q(a, wa, 1), B1 = q(b, wb, 1), B2 = q(b, wb, -1), A2 = q(a, wa, -1), M1 = q(m, (wa + wb) / 2 + bombe, 1), M2 = q(m, (wa + wb) / 2 + bombe * 0.5, -1);
  return `M${A1[0]},${A1[1]} Q${M1[0]},${M1[1]} ${B1[0]},${B1[1]} L${B2[0]},${B2[1]} Q${M2[0]},${M2[1]} ${A2[0]},${A2[1]} Z`;
};
/** gövde + bacaklar + boyun (+ baş BasProfil). Kollar çağıran tarafından (ElKol40) omuz noktasından çizilir: dönüş { omuz, omuzArka, boyun, bas } */
export const profilIskelet = (ayak: P2, s: number, yon: 1 | -1, boy: number, pz: FigurPoz) => {
  const f = boy / 1.75, e = ((pz.egilme ?? 0) * Math.PI) / 180, X = (v: number) => ayak[0] + yon * v * s, Y = (v: number) => ayak[1] - v * s;
  const kalcaY = pz.diz ? 0.55 * f : 0.95 * f + (pz.nefes ?? 0) * 0;
  const kalca: P2 = [X(pz.diz ? -0.12 * f : 0.0), Y(kalcaY)];
  const govdeL = 0.52 * f, boyunP: P2 = [kalca[0] + yon * Math.sin(e) * govdeL * s, kalca[1] - Math.cos(e) * govdeL * s];
  const omuz: P2 = [boyunP[0] - yon * (0.05 * f * Math.cos(e) - 0.08 * f * Math.sin(e)) * s, boyunP[1] + (0.08 * f * Math.cos(e) + 0.05 * f * Math.sin(e) * 0) * s];
  const bas: P2 = [boyunP[0] + yon * (0.025 + Math.sin(e) * 0.1) * s, boyunP[1] - 0.15 * f * s];
  return { kalca, boyun: boyunP, omuz, bas, e, f };
};
export const ProfilFigur: React.FC<{ ayak: P2; s: number; yon: 1 | -1; boy?: number; pz: FigurPoz; k: Kiyafet; kart: YuzKart; isik: "on" | "arka"; sicak?: string; kenar?: string; bakisY?: number; basYok?: boolean; arkaKol?: React.ReactNode; onKol?: React.ReactNode }> = ({ ayak, s, yon, boy = 1.72, pz, k, kart, isik, sicak = "#e4b496", kenar = BP.kenar, bakisY, basYok, arkaKol, onKol }) => {
  const sk = profilIskelet(ayak, s, yon, boy, pz), f = sk.f, X = (v: number) => ayak[0] + yon * v * s;
  const adim = pz.adim ?? 0.18, ay = ayak[1];
  // bacaklar: ön ayak (yön tarafı) ve arka ayak; diz öne kırılır
  const onAyak: P2 = pz.diz ? [X(0.32 * f), ay - 0.06 * s] : [X(adim * 0.5), ay], arkaAyak: P2 = pz.diz ? [X(-0.42 * f), ay] : [X(-adim * 0.5), ay];
  const kalca = sk.kalca, kOn: P2 = pz.diz ? [X(0.34 * f), ay - 0.5 * f * s] : ik2(kalca, [onAyak[0], onAyak[1] - 0.08 * s], 0.47 * f * s, 0.45 * f * s, yon === 1 ? -1 : 1);
  const kArka: P2 = pz.diz ? [X(-0.05 * f), ay - 0.05 * s] : ik2(kalca, [arkaAyak[0], arkaAyak[1] - 0.08 * s], 0.47 * f * s, 0.45 * f * s, yon === 1 ? -1 : 1);
  const ayakB = (a: P2, on: boolean) => { const L = 0.27 * f * s, h = 0.09 * f * s; const x0 = a[0] - yon * 0.07 * s; return `M${x0},${a[1]} L${x0 + yon * L},${a[1]} Q${x0 + yon * L * 1.02},${a[1] - h * 0.8} ${x0 + yon * L * 0.6},${a[1] - h} L${x0},${a[1] - h * 1.4} Z`; };
  const bacak = (k1: P2, a: P2, renk: string) => <g>
    <path d={kapsul(kalca, k1, 0.085 * f * s, 0.06 * f * s, 0.01 * s)} fill={renk} stroke="#24223a" strokeWidth={2.5} />
    <path d={kapsul(k1, [a[0], a[1] - 0.08 * s], 0.06 * f * s, 0.05 * f * s)} fill={renk} stroke="#24223a" strokeWidth={2.5} />
  </g>;
  const e = sk.e, boyun = sk.boyun, T = (u: number, v: number): P2 => [kalca[0] + yon * (u * Math.cos(e) + v * Math.sin(e)) * s, kalca[1] + (u * Math.sin(e) * yon * 0 + (-v * Math.cos(e)) + u * Math.sin(e) * 0) * s];
  // gövde (göğüs önde şişkin, sırt hafif yuvarlak); yerel u: önde +, v: yukarı
  const R = (u: number, v: number): P2 => [kalca[0] + yon * (u * Math.cos(e) + v * Math.sin(e)) * s, kalca[1] - (v * Math.cos(e) - u * Math.sin(e)) * s];
  const ceketBoy = k.tur === "ceket" ? -0.2 * f : -0.02 * f;
  const govde = [R(-0.12 * f, ceketBoy), R(-0.13 * f, 0.16 * f), R(-0.16 * f, 0.38 * f), R(-0.14 * f, 0.49 * f), R(-0.06 * f, 0.545 * f), R(0.05 * f, 0.54 * f), R(0.12 * f, 0.48 * f), R(0.14 * f, 0.36 * f), R(0.11 * f, 0.18 * f), R(0.12 * f, ceketBoy + 0.02)];
  const isikTaraf = isik === "on" ? 1 : -1;
  const govdeIsik = [R(0.135 * f * isikTaraf * 0 + 0.04 * f, 0.5 * f), R(0.1 * f, 0.47 * f), R(0.135 * f, 0.36 * f), R(0.12 * f, 0.18 * f), R(0.13 * f, ceketBoy + 0.02), R(0.05 * f, ceketBoy + 0.02), R(0.06 * f, 0.36 * f)];
  void T;
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {arkaKol}
      {/* arka bacak (gölge tonu) + ön bacak */}
      {bacak(kArka, arkaAyak, mix(k.pantolon, "#1c1a24", 0.25))}
      <path d={ayakB(arkaAyak, false)} fill={k.cizme} stroke="#1c1a24" strokeWidth={2} />
      {bacak(kOn, onAyak, k.pantolon)}
      <path d={ayakB(onAyak, true)} fill={k.cizme} stroke="#1c1a24" strokeWidth={2} />
      {isik === "on" && <path d={`M${kalca[0] + yon * 0.07 * s},${kalca[1]} L${kOn[0] + yon * 0.05 * s},${kOn[1]} L${onAyak[0] + yon * 0.04 * s},${onAyak[1] - 0.1 * s}`} stroke={k.pantolonIsik} strokeWidth={Math.max(3, 0.02 * s)} fill="none" />}
      {/* boyun */}
      <path d={kapsul([boyun[0] + yon * 0.01 * s, boyun[1] + 0.03 * s], [sk.bas[0] - yon * 0.005 * s, sk.bas[1] + 0.07 * s], 0.048 * f * s, 0.045 * f * s)} fill={mix(kart.ten, kart.tenGolge, 0.55)} />
      {/* gövde */}
      <path d={figurYolExp(govde)} fill={k.golge} stroke="#24223a" strokeWidth={3} />
      <path d={figurYolExp(govdeIsik)} fill={k.isik} opacity={0.95} />
      {/* gölge tarafında gravür taraması (ışığa dik, kısa) */}
      {Array.from({ length: 9 }).map((_, i) => { const a = R(-0.13 * f, (0.06 + i * 0.05) * f), b = R(-0.06 * f, (0.09 + i * 0.05) * f); return <line key={`tr${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={mix(k.golge, "#1c1a24", 0.45)} strokeWidth={Math.max(2, 0.006 * s)} opacity={0.6} />; })}
      <path d={`M${pts([R(0.04 * f, 0.535 * f), R(0.1 * f, 0.47 * f), R(0.135 * f, 0.36 * f)])}`} stroke={isik === "on" ? sicak : kenar} strokeWidth={Math.max(3, 0.012 * s)} fill="none" />
      <path d={`M${pts([R(-0.08 * f, 0.52 * f), R(-0.14 * f, 0.4 * f)])}`} stroke={kenar} strokeWidth={Math.max(2, 0.008 * s)} fill="none" opacity={0.8} />
      {/* yaka: Osmanlı ceketi dik yaka, kazakta yuvarlak yaka */}
      {k.tur === "ceket" ? <>{(() => { const a = R(-0.07 * f, 0.5 * f), b = R(-0.055 * f, 0.585 * f), c = R(0.07 * f, 0.575 * f), d = R(0.09 * f, 0.495 * f), m1 = R(0.01 * f, 0.62 * f), m2 = R(0.01 * f, 0.52 * f);
          return <path d={`M${a[0]},${a[1]} Q${b[0] - yon * 0.01 * s},${b[1]} ${b[0]},${b[1]} Q${m1[0]},${m1[1]} ${c[0]},${c[1]} Q${d[0] + yon * 0.01 * s},${(c[1] + d[1]) / 2} ${d[0]},${d[1]} Q${m2[0]},${m2[1] + 0.02 * s} ${a[0]},${a[1]} Z`} fill={k.renk} stroke="#24223a" strokeWidth={2.5} />; })()}
        <path d={`M${pts([R(0.02 * f, 0.4 * f), R(0.115 * f, 0.4 * f), R(0.11 * f, 0.36 * f), R(0.065 * f, 0.345 * f), R(0.025 * f, 0.36 * f)])} Z`} fill={mix(k.isik, k.golge, 0.35)} stroke="#24223a" strokeWidth={2} /></>
        : <g><path d={`M${pts([R(0.02 * f, 0.545 * f), R(0.1 * f, 0.4 * f), R(0.12 * f, 0.5 * f)])} Z`} fill="#c9bfae" stroke="#24223a" strokeWidth={2} />
          <path d={`M${pts([R(-0.06 * f, 0.53 * f), R(0.02 * f, 0.55 * f), R(0.1 * f, 0.4 * f)])}`} stroke={mix(k.renk, "#1c1a24", 0.3)} strokeWidth={Math.max(4, 0.02 * s)} fill="none" /></g>}
      {/* kumaş kıvrımları + ceket alt kenarı */}
      {[0.12, 0.26].map((v, i) => <path key={i} d={`M${pts([R(-0.02 * f, v * f), R(0.06 * f, (v + 0.05) * f), R(0.1 * f, (v + 0.02) * f)])}`} stroke={mix(k.golge, "#1c1a24", 0.35)} strokeWidth={Math.max(2, 0.008 * s)} fill="none" opacity={0.7} />)}
      {k.tur === "ceket" && <path d={`M${pts([R(-0.13 * f, ceketBoy + 0.02), R(0.13 * f, ceketBoy + 0.04)])}`} stroke="#24223a" strokeWidth={Math.max(2, 0.008 * s)} />}
      {!basYok && <BasProfil kart={kart} x={sk.bas[0]} y={sk.bas[1]} H={0.27 * f * s} ayna={yon === -1} egim={(pz.basEgim ?? 0) * yon + ((pz.egilme ?? 0) * yon) / 2} isik={isik} sicak={sicak} kenar={kenar} bakisY={bakisY} />}
      {onKol}
    </g>
  );
};
const figurYolExp = (a: P2[]) => yol(a);

/** Omuz başlığı (deltoid): kolun üst ucunu örten yuvarlak kumaş kütlesi, üst kol yönünde döner; gövde tarafında kavisli kol dikişi,
 *  kol altında kırışık. Kol gövdenin önündeyse kolla birlikte ÜSTTE çizilir (düz kesik uç görünmez). Tur-7 "omuz" kuralı. */
export const OmuzBasi: React.FC<{ omuz: P2; dirsek: P2; r: number; renk: string; golge: string; isik?: string; kenar?: string }> = ({ omuz, dirsek, r, renk, golge, isik, kenar = BP.kenar }) => {
  const a = Math.atan2(dirsek[1] - omuz[1], dirsek[0] - omuz[0]), d = (a * 180) / Math.PI;
  const c: P2 = [omuz[0] + Math.cos(a) * r * 0.35, omuz[1] + Math.sin(a) * r * 0.35];
  return (
    <g transform={`translate(${c[0]} ${c[1]}) rotate(${d})`}>
      <ellipse cx={0} cy={0} rx={r * 1.1} ry={r * 0.92} fill={renk} />
      <path d={`M${-r * 1.1},0 A${r * 1.1},${r * 0.92} 0 0 1 ${r * 0.5},${-r * 0.82}`} stroke="#24223a" strokeWidth={Math.max(2, r * 0.04)} fill="none" />
      {isik && <path d={`M${-r * 0.9},${-r * 0.7} A${r * 1.2},${r} 0 0 1 ${r * 0.9},${-r * 0.75}`} stroke={isik} strokeWidth={Math.max(3, r * 0.12)} fill="none" opacity={0.85} />}
      <path d={`M${-r * 1.0},${-r * 0.75} A${r * 1.25},${r * 1.02} 0 0 1 ${r * 0.4},${-r * 1.0}`} stroke={kenar} strokeWidth={Math.max(2, r * 0.05)} fill="none" opacity={0.8} />
      {/* kol dikişi (gövde tarafında kavis) + koltuk altı kırışıkları */}
      <path d={`M${r * 0.35},${-r * 0.85} Q${r * 0.7},0 ${r * 0.4},${r * 0.8}`} stroke={golge} strokeWidth={Math.max(2, r * 0.035)} fill="none" opacity={0.6} />
      <path d={`M${r * 0.55},${r * 0.55} q${r * 0.35},${r * 0.12} ${r * 0.6},${r * 0.05} M${r * 0.45},${r * 0.8} q${r * 0.3},${r * 0.15} ${r * 0.55},${r * 0.12}`} stroke={golge} strokeWidth={Math.max(2, r * 0.04)} fill="none" opacity={0.8} />
    </g>
  );
};
/** ElKol40 + omuz başlığı (aynı geometriden) — figür kitinde kol her zaman bununla çizilir */
export const KolOmuz: React.FC<ElKol40Props & { omuzR: number; omuzIsik?: string; kolluk?: { renk: string; oran: number } }> = (pr) => {
  const g = elKolGeo(pr), kr = pr.kolluk?.renk ?? pr.kolRenk;
  const u: P2 = pr.kolluk ? [pr.omuz[0] + (g.dirsek[0] - pr.omuz[0]) * pr.kolluk.oran, pr.omuz[1] + (g.dirsek[1] - pr.omuz[1]) * pr.kolluk.oran] : pr.omuz;
  const a = (Math.atan2(g.dirsek[1] - pr.omuz[1], g.dirsek[0] - pr.omuz[0]) * 180) / Math.PI;
  return <g><ElKol40 {...pr} />
    {/* sıvalı kol: üst kolu örten kısa yen + kıvrılmış kumaş bileziği */}
    {pr.kolluk && <g><line x1={pr.omuz[0]} y1={pr.omuz[1]} x2={u[0]} y2={u[1]} stroke={kr} strokeWidth={pr.gen[0] * 1.08} />
      <ellipse cx={u[0]} cy={u[1]} rx={pr.gen[0] * 0.16} ry={pr.gen[0] * 0.6} transform={`rotate(${a} ${u[0]} ${u[1]})`} fill={mix(kr, "#ffffff", 0.12)} stroke="#24223a" strokeWidth={2.5} /></g>}
    <OmuzBasi omuz={pr.omuz} dirsek={g.dirsek} r={pr.omuzR} renk={kr} golge={mix(kr, "#1c1a24", 0.4)} isik={pr.omuzIsik} /></g>;
};

/** Başlık AYRI bileşen (kıyafet araştırması sürüyor: kabalak/Enveriye/subay başlığı kesinleşince yeni `tip` eklenir, yüz kartı yalnız adı taşır).
 *  Geçici nötr tip: "yuvarlak-haki" / "yuvarlak-koyu" = düz tepeli, siperliksiz, rozetsiz alçak başlık. Yerel birim baş H (BasProfil çerçevesi). */
export type BaslikTip = "yuvarlak-haki" | "yuvarlak-koyu" | "yok" | (string & {});
export const BaslikProfil: React.FC<{ tip: BaslikTip; u: number; H: number; isik: "on" | "arka"; sicak: string; kenar: string }> = ({ tip, u, H, isik, sicak, kenar }) => {
  if (tip === "yok") return null;
  const sw = (px: number) => px / H;
 const bc = tip === "yuvarlak-koyu" ? "#55505e" : "#7a7458", bk = mix(bc, "#1c1a24", 0.35), bi = mix(bc, sicak, 0.35); return <g>
        <path d={`M-0.42,-0.14 L-0.43,${-0.52 * u} Q-0.42,${-0.6 * u} -0.33,${-0.61 * u} L0.22,${-0.61 * u} Q0.31,${-0.6 * u} 0.31,${-0.52 * u} L0.31,${-0.29 * u} L0.14,${-0.31 * u} L-0.1,${-0.25 * u} Z`} fill={bc} stroke={bk} strokeWidth={sw(3)} />
        <path d={`M-0.42,-0.14 L-0.42,-0.22 L-0.1,${-0.33 * u} L0.14,${-0.38 * u} L0.31,${-0.37 * u} L0.31,${-0.29 * u} L0.14,${-0.31 * u} L-0.1,${-0.25 * u} Z`} fill={bk} />
        <path d={`M0.31,${-0.37 * u} L0.31,${-0.52 * u} Q0.31,${-0.6 * u} 0.22,${-0.61 * u}`} stroke={isik === "on" ? bi : kenar} strokeWidth={sw(6)} fill="none" />
        <path d={`M-0.33,${-0.61 * u} L0.22,${-0.61 * u}`} stroke={kenar} strokeWidth={sw(3)} opacity={0.7} />
        {[-0.3, -0.16, -0.02, 0.12].map((xx, i) => <path key={i} d={`M${xx},${-0.59 * u} L${xx + 0.01},${(-0.4 + i * 0.01) * u}`} stroke={bk} strokeWidth={sw(2)} opacity={0.5} />)}
      </g>;
};
