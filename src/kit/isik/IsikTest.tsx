// ===== IsikTest — ışık çokgeni sınaması: bodrum, sallanan abajurlu lamba, sedye + ayakta figür =====
// Görülecek: huzme ve aydınlık duvar/zemin sedye ve figürde kırpılır (arkalarına geçmez); gölge yönü lamba
// sallandıkça döner; kenar ışığı yalnız lambayı gören kenarda; temas gölgesi aynı kaynaktan uzanır.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { IsikClip, IsikKaynagi, IsikTanim, isikHesapla } from "./IsikKaynagi";
import { elipsCokgen, icinde, P2, zeminGolgeUcu } from "./gorunurluk";

export const ISIK_TEST_SURE = 150;
const W = 1080, H = 1920;
const SINIR = { x: 0, y: 0, w: W, h: H };
const TAVAN = 250, ZEMIN = 1390; // duvar–zemin birleşimi
const PIVOT: P2 = [540, TAVAN - 10];
const KORDON = 330;

// --- engeller (ekran koordinatı, basit silüet çokgenleri; gerçek kullanımda rig'den gelir) ---
const SEDYE_ZEMIN = 1590;
const sedyeTabla: P2[] = [[130, 1262], [650, 1262], [650, 1292], [130, 1292]];
const sedyeOrtu: P2[] = [
  [150, 1262], [170, 1222], [215, 1198], [262, 1206], [300, 1186], [400, 1180], [480, 1190],
  [540, 1176], [590, 1196], [625, 1232], [632, 1262],
];
const ayak = (x: number): P2[] => [[x, 1292], [x + 14, 1292], [x + 14, SEDYE_ZEMIN - 16], [x, SEDYE_ZEMIN - 16]];
const tekerlek = (x: number) => elipsCokgen([x + 7, SEDYE_ZEMIN - 9], 10, 10, 10);

const FX = 850, FZ = 1640; // figür ayak hizası (sedyeden kameraya daha yakın → daha aşağı)
const figurGovde: P2[] = [
  [FX - 22, 1000], [FX + 22, 1000], // boyun
  [FX + 70, 1030], [FX + 84, 1090], [FX + 92, 1250], [FX + 84, 1330], [FX + 100, 1420], // sağ omuz–kol–palto
  [FX + 40, 1430], [FX + 36, FZ - 6], [FX + 62, FZ - 4], [FX + 62, FZ], [FX + 6, FZ], // sağ bacak + ayakkabı
  [FX + 2, 1450], [FX - 6, 1450],
  [FX - 10, FZ], [FX - 64, FZ], [FX - 64, FZ - 4], [FX - 38, FZ - 6], [FX - 42, 1430], // sol bacak
  [FX - 100, 1420], [FX - 86, 1330], [FX - 94, 1250], [FX - 86, 1090], [FX - 70, 1030],
];
const figurBas = elipsCokgen([FX - 4, 948], 46, 56, 18);
const ENGELLER: P2[][] = [sedyeTabla, sedyeOrtu, ayak(165), ayak(600), tekerlek(165), tekerlek(600), figurGovde, figurBas];

const dD = (c: P2[]) => "M" + c.map((p) => `${p[0]},${p[1]}`).join("L") + "Z";

/** duvar tuğlası + zemin taşı (iki renk sürümü: karanlık taban ve ışıklı sürüm) */
const Oda: React.FC<{ duvar: string; zemin: string; derz: string; tavan: string }> = ({ duvar, zemin, derz, tavan }) => {
  const sira: React.ReactNode[] = [];
  for (let r = 0, y = TAVAN; y < ZEMIN; r++, y += 46) {
    for (let x = (r % 2) * -60; x < W; x += 120) sira.push(<rect key={`${r}-${x}`} x={x + 3} y={y + 3} width={114} height={40} fill="none" stroke={derz} strokeWidth={3} rx={4} />);
  }
  const zeminCizgi: React.ReactNode[] = [];
  for (let i = -6; i <= 14; i++) zeminCizgi.push(<line key={`z${i}`} x1={540 + i * 90} y1={ZEMIN} x2={540 + i * 260} y2={H} stroke={derz} strokeWidth={3} />);
  for (let j = 0; j < 7; j++) { const y = ZEMIN + Math.pow(j / 6, 1.6) * (H - ZEMIN); zeminCizgi.push(<line key={`y${j}`} x1={0} y1={y} x2={W} y2={y} stroke={derz} strokeWidth={3} />); }
  return (
    <g>
      <rect x={0} y={0} width={W} height={TAVAN} fill={tavan} />
      <rect x={0} y={TAVAN} width={W} height={ZEMIN - TAVAN} fill={duvar} />
      {sira}
      <rect x={0} y={ZEMIN} width={W} height={H - ZEMIN} fill={zemin} />
      {zeminCizgi}
    </g>
  );
};

export const IsikTest: React.FC = () => {
  const f = useCurrentFrame();
  const th = 0.34 * Math.sin((2 * Math.PI * f) / ISIK_TEST_SURE); // sarkaç açısı
  const lx = PIVOT[0] + Math.sin(th) * KORDON, ly = PIVOT[1] + Math.cos(th) * KORDON;
  const ampul: P2 = [lx + Math.sin(th) * 34, ly + Math.cos(th) * 34];
  const isik: IsikTanim = { konum: ampul, menzil: 1500, renk: "#ffcf8e", koni: { yon: Math.PI / 2 - th, yari: 0.68 } };
  const hesap = isikHesapla(isik, ENGELLER, SINIR); // TEK hesap: huzme, havuz, kenar ışığı, gölge yönü
  const kenarId = "isiktest-kenar";

  // abajur (lambayla döner)
  const don = (p: P2): P2 => [lx + p[0] * Math.cos(-th) - p[1] * Math.sin(-th), ly + p[0] * Math.sin(-th) + p[1] * Math.cos(-th)];
  const abajur = [[-14, -14], [14, -14], [62, 34], [-62, 34]].map((p) => don(p as P2));

  // temas gölgeleri: aynı kaynaktan zemin gölgesi uzanımı; nesne ışığı görmüyorsa yalnız kısa temas (uzanım yok)
  const temas = (p: P2, yuk: number, gen: number) => {
    const isikta = icinde([p[0], p[1] - yuk * 0.5], hesap.nokta);
    const uc = isikta ? zeminGolgeUcu(ampul, p, yuk, 260) : p[0];
    const x0 = Math.min(p[0] - gen / 2, uc), x1 = Math.max(p[0] + gen / 2, uc);
    return <ellipse cx={(x0 + x1) / 2} cy={p[1] + 2} rx={(x1 - x0) / 2} ry={9} fill="#0b090d" opacity={0.75} />;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#141118" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {/* karanlık taban (gölge mavi-mor) */}
        <Oda duvar="#2a2633" zemin="#1d1a23" derz="#18151d" tavan="#121016" />

        {/* aydınlık sürüm + havadaki huzme + toz, hepsi aynı çokgenden */}
        <IsikKaynagi tanim={isik} engeller={ENGELLER} sinir={SINIR} hesap={hesap} id="isiktest"
          aydinlik={<Oda duvar="#c49470" zemin="#a77c5a" derz="#7a5640" tavan="#6a4c3a" />}
          huzme={{ siddet: 0.38, blur: 8 }} toz={{ adet: 90, seed: 11, boy: 2.6, siddet: 0.9 }} />

        {/* temas gölgeleri */}
        {temas([172, SEDYE_ZEMIN], 330, 40)}
        {temas([607, SEDYE_ZEMIN], 330, 40)}
        {temas([FX - 36, FZ], 690, 60)}
        {temas([FX + 34, FZ], 690, 60)}

        {/* engeller: önde olan arkadakini kapatır */}
        <IsikClip id={kenarId} d={hesap.d} />
        {[ayak(165), ayak(600)].map((c, i) => <path key={i} d={dD(c)} fill="#2e2b33" />)}
        {[tekerlek(165), tekerlek(600)].map((c, i) => <path key={i} d={dD(c)} fill="#1a171d" />)}
        <path d={dD(sedyeTabla)} fill="#36323c" />
        <path d={dD(sedyeOrtu)} fill="#4a4652" />
        <path d={dD(figurGovde)} fill="#2a2630" />
        <path d={dD(figurBas)} fill="#2a2630" />
        {/* kenar ışığı: engel konturu yalnız çokgen içinde kalan (lambayı gören) yarısıyla */}
        <g clipPath={`url(#${kenarId})`} fill="none" stroke="#ffd9a6" strokeLinejoin="round">
          {[sedyeTabla, sedyeOrtu, figurGovde, figurBas, ayak(165), ayak(600)].map((c, i) => <path key={i} d={dD(c)} strokeWidth={7} opacity={0.9} />)}
        </g>

        {/* kordon + abajur + ampul */}
        <line x1={PIVOT[0]} y1={PIVOT[1]} x2={lx} y2={ly} stroke="#0e0c10" strokeWidth={4} />
        <path d={dD(abajur)} fill="#3b3a2e" stroke="#0e0c10" strokeWidth={3} />
        <circle cx={ampul[0]} cy={ampul[1]} r={15} fill="#fff1cf" />
        <circle cx={ampul[0]} cy={ampul[1]} r={30} fill="#ffcf8e" opacity={0.35} />
      </svg>
    </AbsoluteFill>
  );
};
