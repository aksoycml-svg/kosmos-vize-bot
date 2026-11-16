// ===== Leningrad yakın yüz (¾ cephe, gravür dili) — Eliasberg `fark-ediş` (tasarım §4, mekanlar §13.10) =====
// Kitte cepheden yakın yüz yoktu (Kukla karikatür, BMC yalnız profil) → yeni, yalnız Leningrad klasöründe.
// Kurallar (CLAUDE.md "Yüzde iç çizgi"): elmacık, yanak çukuru, çene hattı ÇİZGİYLE değil düz ton alanı + ince tarama ile;
// yüzde kontur rengiyle iç çizgi yok (yalnız göz kapağı kirpik hattı ve tek kısa yarı saydam kapak kıvrımı, ten gölgesi renginde).
// Işık: ön cephe gölgede (ışık arkadan); kenar ışığı ışık yönündeki kenarda (hilal), alttan sıcak yansıma (iki düz basamak, hilal).
// Yerel birim H = tepe → çene; orijin yüz merkezi; x sağ, y aşağı. `don` ≈ ¾ dönüş (özellikler sağa kayar, uzak yan daralır).
import React from "react";
import { Tarama } from "../../../doku/Tarama";
import { cr, Hilal, Kirp, P2 } from "./lgOrtak";

export type YuzIfade = { kasIc: number; goz: number; agiz: number; bakis: P2 };
export type YuzPalet = {
  ten: string; tenOrta: string; tenDerin: string; yansima: [string, string]; kenar: string; kontur: string; tarama: string;
  sac: string; sacIsik: string; sacKontur: string; dudak: string; agizIc: string; gozAk: string; iris: string; bebek: string; kas: string; parilti: string;
};
export const ELIASBERG_GOLGEDE: YuzPalet = {
  // ön cephe gölgede: ten ailesi gül-mor (h 10–30, C* 11–16) — mor + ten karışımı grileşir, ten kendi ailesinde koyulaşır (tur-3 dersi)
  ten: "#8e6a6c", tenOrta: "#785762", tenDerin: "#5f4658", yansima: ["#a07862", "#b98b70"], kenar: "#f0c4a8", kontur: "#33222c", tarama: "#4a3242",
  sac: "#2a2226", sacIsik: "#4d3d44", sacKontur: "#171215", dudak: "#7d5559", agizIc: "#34212b", gozAk: "#b39088", iris: "#4b3a40", bebek: "#1d1519", kas: "#2d2227", parilti: "#efd0b6",
};

export const LgYuz: React.FC<{ x: number; y: number; H: number; rol?: number; ifade: YuzIfade; P?: YuzPalet; seed?: number;
  /** ışık yönü ekranda (kenar ışığı bu yandaki konturda) */ isikX?: 1 | -1 }> = ({ x, y, H, rol = 0, ifade, P = ELIASBERG_GOLGEDE, seed = 1942, isikX = 1 }) => {
  const c = Math.cos((rol * Math.PI) / 180), s = Math.sin((rol * Math.PI) / 180);
  const M = (q: P2): P2 => [x + H * (q[0] * c - q[1] * s), y + H * (q[0] * s + q[1] * c)];
  const Y = (a: P2[], k = true) => cr(a.map(M), k);
  const px = H / 290; // ekran ölçeği (290 px yüz referansı)

  // --- baş silueti: dar-uzun, elmacık belirgin, yanak çukur (iki yanda hafif içbükey), çene dar ---
  const yuz: P2[] = [[0.02, -0.53], [0.17, -0.5], [0.27, -0.42], [0.312, -0.28], [0.318, -0.14], [0.31, -0.04], [0.283, 0.08], [0.268, 0.19], [0.232, 0.31], [0.165, 0.42], [0.085, 0.49], [0.02, 0.503], [-0.065, 0.487],
    [-0.165, 0.42], [-0.252, 0.31], [-0.298, 0.18], [-0.318, 0.06], [-0.345, -0.05], [-0.355, -0.18], [-0.338, -0.32], [-0.28, -0.44], [-0.15, -0.515]];
  const yuzD = Y(yuz);
  // saç kütlesi (tepe ve yanlar; alın saç çizgisi hafif geri, şakaklar açık) — kısa koyu saç, yana taranmış
  const sac: P2[] = [[-0.372, -0.13], [-0.39, -0.3], [-0.335, -0.47], [-0.18, -0.575], [0.03, -0.592], [0.2, -0.552], [0.312, -0.44], [0.345, -0.28], [0.334, -0.14],
    [0.31, -0.2], [0.282, -0.29], [0.22, -0.35], [0.15, -0.372], [0.1, -0.392], [0.06, -0.378], [0.02, -0.398], [-0.04, -0.383], [-0.09, -0.393], [-0.17, -0.37], [-0.26, -0.335], [-0.318, -0.27], [-0.345, -0.17]];
  const sacD = Y(sac);
  const kulakYakin: P2[] = [[-0.335, -0.11], [-0.395, -0.135], [-0.428, -0.07], [-0.42, 0.03], [-0.39, 0.105], [-0.345, 0.12], [-0.322, 0.05]];
  const kulakUzak: P2[] = [[0.3, -0.1], [0.337, -0.125], [0.358, -0.06], [0.352, 0.03], [0.327, 0.09], [0.298, 0.075]];

  // --- ifade ---
  const kI = ifade.kasIc, g = ifade.goz;
  const kas = (ic: P2, orta: P2, dis: P2, k: number): P2[] => {
    const icY = ic[1] - 0.03 * kI, ortaY = orta[1] - 0.012 * kI; // fark-ediş: iç uçlar yukarı-içe
    return [[ic[0], icY - 0.018 * k], [orta[0], ortaY - 0.016 * k], [dis[0], dis[1] - 0.008 * k], [dis[0] + (dis[0] > ic[0] ? 0.012 : -0.012), dis[1] + 0.004], [orta[0], ortaY + 0.01 * k], [ic[0], icY + 0.016 * k]];
  };
  const kasYakin = kas([-0.035, -0.185], [-0.135, -0.198], [-0.245, -0.158], 1);
  const kasUzak = kas([0.105, -0.185], [0.19, -0.196], [0.272, -0.158], 0.85);
  // göz: köşeler + üst kapak tepe (açıklık g) + alt kapak
  const goz = (gx: number, gy: number, w: number, ic: 1 | -1) => {
    const hu = 0.036 * g, hl = 0.016;
    const A: P2 = [gx - w / 2, gy + (ic < 0 ? 0.004 : 0)], B: P2 = [gx + w / 2, gy + (ic > 0 ? 0.004 : 0)];
    const ust: P2 = [gx + ic * w * 0.06, gy - 2 * hu], alt: P2 = [gx - ic * w * 0.05, gy + 2 * hl];
    const d = (() => { const a = M(A), b = M(B), u = M(ust), l = M(alt); return `M${a[0]},${a[1]} Q${u[0]},${u[1]} ${b[0]},${b[1]} Q${l[0]},${l[1]} ${a[0]},${a[1]}Z`; })();
    const ustD = (() => { const a = M(A), b = M(B), u = M(ust); return `M${a[0]},${a[1]} Q${u[0]},${u[1]} ${b[0]},${b[1]}`; })();
    const kivrim = (() => { const a = M([gx - w * 0.38, gy - 2 * hu * 0.62 - 0.02]), b = M([gx + w * 0.4, gy - 2 * hu * 0.6 - 0.02]), u = M([gx + ic * w * 0.06, gy - 2 * hu - 0.022]); return `M${a[0]},${a[1]} Q${u[0]},${u[1]} ${b[0]},${b[1]}`; })();
    const iris: P2 = [gx + ifade.bakis[0] * w * 0.2, gy + 0.008 + ifade.bakis[1] * 0.012]; // iris alt kapağa değer: yalnız üstte ak (kapak kalkık)
    return { d, ustD, kivrim, iris, A, B, w };
  };
  const gY = goz(-0.125, -0.088, 0.122, 1), gU = goz(0.178, -0.088, 0.104, -1);
  const yuva = (gx: number, w: number): P2[] => [[gx - w * 0.62, -0.115], [gx - w * 0.2, -0.158], [gx + w * 0.45, -0.15], [gx + w * 0.7, -0.09], [gx + w * 0.45, -0.032], [gx - w * 0.1, -0.025], [gx - w * 0.55, -0.05]];
  const altHilal = (gx: number, w: number): P2[] => [[gx - w * 0.5, -0.07], [gx, -0.045], [gx + w * 0.52, -0.066], [gx + w * 0.4, -0.04], [gx, -0.018], [gx - w * 0.38, -0.042]];
  const ag = ifade.agiz;
  const mY = 0.292, mx0 = -0.035, mx1 = 0.13;

  const ISIK = isikX; // kenar ışığı: bu yana
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* uzak kulak (konturun arkasında; kenar ışığı alır) */}
      <path d={Y(kulakUzak)} fill={P.tenOrta} stroke={P.kontur} strokeWidth={2 * px} />
      <Hilal d={Y(kulakUzak)} renk={P.kenar} dx={-ISIK * 3.2 * px} dy={0} />
      {/* yakın kulak: iç kıvrım düz koyu alan, çizgi yok */}
      <path d={Y(kulakYakin)} fill={P.tenOrta} stroke={P.kontur} strokeWidth={2.2 * px} />
      <path d={Y([[-0.36, -0.08], [-0.398, -0.09], [-0.405, -0.02], [-0.385, 0.06], [-0.36, 0.06], [-0.375, -0.01]])} fill={P.tenDerin} />

      {/* yüz dolgusu */}
      <path d={yuzD} fill={P.ten} />
      <Kirp d={yuzD}>
        {/* ışıktan uzak yan (yakın yanak, şakak, çene yanı): bir basamak koyu düzlem — sınır yüz hacmini izler (bıçak çizgisi yok) */}
        <path d={Y([[-0.42, -0.52], [-0.29, -0.5], [-0.31, -0.37], [-0.285, -0.22], [-0.262, -0.09], [-0.205, 0.06], [-0.165, 0.22], [-0.1, 0.38], [-0.03, 0.56], [-0.42, 0.56]])} fill={P.tenOrta} />
        {/* yanak çukurları (elmacığın altında) */}
        <path d={Y([[-0.33, 0.02], [-0.25, 0.05], [-0.2, 0.13], [-0.21, 0.24], [-0.27, 0.27], [-0.31, 0.16]])} fill={P.tenDerin} opacity={0.45} />
        <path d={Y([[0.3, 0.0], [0.24, 0.04], [0.215, 0.12], [0.235, 0.21], [0.27, 0.2], [0.29, 0.1]])} fill={P.tenOrta} />
        {/* göz yuvaları + göz altı koyuluğu (bitkin) */}
        <path d={Y(yuva(-0.125, 0.122))} fill={P.tenOrta} opacity={0.7} />
        <path d={Y(yuva(0.178, 0.104))} fill={P.tenOrta} opacity={0.7} />
        <path d={Y(altHilal(-0.125, 0.122))} fill={P.tenDerin} opacity={0.45} />
        <path d={Y(altHilal(0.178, 0.104))} fill={P.tenDerin} opacity={0.4} />
        {/* burun: ışıktan uzak yan düzlemi + burun kanadı */}
        <path d={Y([[0.012, -0.11], [0.036, -0.1], [0.03, 0.04], [0.012, 0.11], [-0.022, 0.15], [-0.04, 0.128], [-0.012, 0.06]])} fill={P.tenOrta} />
        <path d={Y([[-0.036, 0.118], [-0.008, 0.112], [0.006, 0.145], [-0.012, 0.168], [-0.04, 0.158]])} fill={P.tenDerin} />
        {/* üst dudak gölgesi ve alt dudak altı */}
        <path d={Y([[mx0 - 0.01, 0.272], [0.04, 0.262], [mx1 + 0.012, 0.27], [mx1 + 0.02, 0.29], [mx0 - 0.02, 0.294]])} fill={P.tenOrta} />
        <path d={Y([[mx0 + 0.005, 0.345], [0.05, 0.338], [mx1 - 0.01, 0.346], [mx1 - 0.03, 0.372], [0.05, 0.38], [mx0 + 0.02, 0.37]])} fill={P.tenDerin} opacity={0.75} />
        {/* gölge yanında ince gravür taraması (yalnız yanak çukuru, şakak, çene yanı) */}
        <Tarama sekil={[[-0.42, -0.3], [-0.3, -0.3], [-0.262, -0.09], [-0.205, 0.06], [-0.165, 0.22], [-0.1, 0.38], [-0.04, 0.5], [-0.42, 0.5]].map((q) => M(q as P2))} basamak="III" aci={70} renk={P.tarama} aralik={6.5 * px} kalinlik={1.5 * px} seed={seed + 3} alfaCarpan={0.75} ton={0} />
        {/* alttan sıcak yansıma (aydınlık örtüden): çene altı, alt çene, alt dudak — iki düz basamak hilal */}
        <Kirp d={Y([[-0.6, 0.16], [0.6, 0.1], [0.6, 0.7], [-0.6, 0.7]])}>
          <Hilal d={yuzD} renk={P.yansima[0]} dx={-ISIK * 0.01 * H} dy={-0.05 * H} />
          <Hilal d={yuzD} renk={P.yansima[1]} dx={-ISIK * 0.005 * H} dy={-0.02 * H} />
        </Kirp>
        <path d={Y([[mx0 + 0.02, 0.314], [0.05, 0.322], [mx1 - 0.02, 0.312], [mx1 - 0.03, 0.326], [0.05, 0.334], [mx0 + 0.03, 0.326]])} fill={P.yansima[0]} opacity={0.8} />
        {/* burun ucu altı yansıma */}
        <path d={Y([[0.035, 0.158], [0.06, 0.152], [0.085, 0.158], [0.072, 0.17], [0.05, 0.171]])} fill={P.yansima[0]} opacity={0.8} />
      </Kirp>

      {/* kaşlar: biçimli şekil (çizgi değil), iç uçları yukarı-içe */}
      <path d={Y(kasYakin)} fill={P.kas} />
      <path d={Y(kasUzak)} fill={P.kas} />
      {/* gözler */}
      {[gY, gU].map((e, i) => <g key={i}>
        <path d={e.kivrim} stroke={P.tenDerin} strokeWidth={2 * px} fill="none" opacity={0.55} />
        <path d={e.d} fill={P.gozAk} />
        <Kirp d={e.d}>
          <circle cx={M(e.iris)[0]} cy={M(e.iris)[1]} r={0.038 * H * (i ? 0.92 : 1)} fill={P.iris} />
          <circle cx={M(e.iris)[0]} cy={M(e.iris)[1]} r={0.016 * H * (i ? 0.92 : 1)} fill={P.bebek} />
          {/* göz akında ve bebekte alttan sıcak yansıma (tek nokta, yarık ışığı değil örtü) */}
          <circle cx={M(e.iris)[0] + 0.012 * H} cy={M(e.iris)[1] + 0.012 * H} r={0.0065 * H} fill={P.parilti} />
          <path d={`M${M([e.A[0], e.A[1] + 0.012])[0]},${M([e.A[0], e.A[1] + 0.012])[1]} L${M([e.B[0], e.B[1] + 0.012])[0]},${M([e.B[0], e.B[1] + 0.012])[1]} L${M([e.B[0], e.B[1] + 0.05])[0]},${M([e.B[0], e.B[1] + 0.05])[1]} L${M([e.A[0], e.A[1] + 0.05])[0]},${M([e.A[0], e.A[1] + 0.05])[1]}Z`} fill={P.yansima[0]} opacity={0.35} />
        </Kirp>
        {/* kirpik hattı (özellik çizgisi; dış köşede kalınlaşır) */}
        <path d={e.ustD} stroke={P.kontur} strokeWidth={3.4 * px} fill="none" />
      </g>)}

      {/* burun delikleri (koyu küçük düz şekil) */}
      <path d={Y([[0.0, 0.158], [0.02, 0.153], [0.026, 0.163], [0.008, 0.168]])} fill={P.agizIc} opacity={0.85} />
      <path d={Y([[0.082, 0.154], [0.098, 0.151], [0.102, 0.16], [0.09, 0.164]])} fill={P.agizIc} opacity={0.85} />
      {/* ağız: hafif aralık (nefes durdu) */}
      <path d={Y([[mx0, mY - 0.004], [0.0, mY - 0.012 - 0.004 * ag], [0.05, mY - 0.008 - 0.004 * ag], [0.095, mY - 0.012 - 0.004 * ag], [mx1, mY - 0.002], [0.095, mY + 0.012 + 0.012 * ag], [0.05, mY + 0.016 + 0.014 * ag], [0.0, mY + 0.012 + 0.012 * ag]])} fill={P.agizIc} />
      <path d={Y([[mx0 + 0.01, mY - 0.006], [0.0, mY - 0.03], [0.04, mY - 0.026], [0.055, mY - 0.03], [0.1, mY - 0.026], [mx1 - 0.006, mY - 0.004], [0.095, mY - 0.012], [0.05, mY - 0.01], [0.0, mY - 0.012]])} fill={P.dudak} />

      {/* yüz konturu (dış siluet; mürekkep), sonra ışık yönündeki kenarda sıcak kenar ışığı (2–3 px) */}
      <path d={yuzD} fill="none" stroke={P.kontur} strokeWidth={2.6 * px} />
      <Hilal d={yuzD} renk={P.kenar} dx={-ISIK * 3 * px} dy={-1 * px} />
      {/* saç: koyu kütle + saç yönünde birkaç açık şerit (yana taranmış) + kenar ışığı */}
      <path d={sacD} fill={P.sac} />
      <path d={Y(sac.slice(0, 10), false)} fill="none" stroke={P.sacKontur} strokeWidth={2.4 * px} />
      <Kirp d={sacD}>
        {[[-0.28, -0.5, -0.36, -0.22], [-0.14, -0.55, -0.27, -0.3], [0.02, -0.57, -0.12, -0.36], [0.12, -0.55, 0.26, -0.33], [0.22, -0.5, 0.33, -0.22]].map(([a, b, cc, d], i) =>
          <path key={i} d={Y([[a, b], [(a + cc) / 2 + (i < 3 ? -0.02 : 0.02), (b + d) / 2 - 0.02], [cc, d]], false)} stroke={P.sacIsik} strokeWidth={4 * px} fill="none" opacity={0.85} />)}
      </Kirp>
      <Hilal d={sacD} renk={P.kenar} dx={-ISIK * 3 * px} dy={2 * px} />

    </g>
  );
};
