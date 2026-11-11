// ===== HARITA şablonu (blanc/Harita.tsx'in parametrik hâli) =====
// Parşömen üzerinde Fransa (Natural Earth sadeleştirilmiş), dönem rotası, isteğe bağlı üç vuruş:
//  posta {bas, bit}: posta arabası rota boyunca; sayaç "N. GÜN" + gün/ay diski (SVG ikon; font dışı glif YOK)
//  telgraf {bas, bit, kule}: hat boyunca ışık sinyali, kule ikonları sırayla yanar; sayaç "N SAAT" + T ikonu
//  K4 (v4 P03) harita_cift_sayac: posta ve telgraf İKİ AYRI sayaç kutusu (üstte telgraf "N SAAT", altta posta "N. GÜN"); her kutu
//  kendi vuruşunun bas karesinde sağ kenardan kayarak girer ve plan sonuna kadar son değerinde kalır (karşılaştırma okunur).
//  Vuruşlar art arda ya da üst üste koşabilir; sıra anlatımla aynı verilir (ör. önce telgraf, sonra posta).
//  posta.gun / telgraf.saat vuruş içinde de verilebilir (plan düzeyi `gun`/`saat` yerine).
//  muhur {kare, metin}: kırmızı mühür iner (ölçek 2.4 → 1, temas = kare) — kırmızı yalnız burada
// Gece karartma katmanı YOK (kural): posta gününü sayaçtaki gün/ay diski anlatır.
import React from "react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import geo from "../../bolumler/blanc/fransa.json";
import { mono, serif } from "../../theme";
import { cl, GIRIS, kameraHesapla, KameraDurum } from "../zaman";
import type { Plan } from "../tipler";
import { param, Sablon, SablonProps } from "../ortak";

const K = 70, X0 = -5.4, Y0 = 51.3, YS = 1.45, OX = 70, OY = 400;
const pj = (lon: number, lat: number): [number, number] => [OX + (lon - X0) * K, OY + (Y0 - lat) * K * YS];
const polys: string[] = [];
type Geo = { type: string; geometry?: { type: string; coordinates: number[][][] | number[][][][] }; features?: Geo[] };
const g0 = geo as unknown as Geo;
for (const f of g0.type === "Feature" ? [g0] : g0.features ?? []) {
  const g = f.geometry!;
  const rings = (g.type === "Polygon" ? [(g.coordinates as number[][][])[0]] : (g.coordinates as number[][][][]).map((q) => q[0])) as number[][][];
  for (const r of rings) polys.push("M" + r.map(([lo, la]) => pj(lo, la).map((v) => v.toFixed(1)).join(",")).join("L") + "Z");
}
const FR = polys.join(" ");

export const ROTALAR: Record<string, [string, number, number, boolean][]> = {
  "paris-bordeaux": [
    ["PARIS", 2.35, 48.86, true], ["Chartres", 1.49, 48.44, false], ["Châteaudun", 1.33, 48.07, false], ["Vendôme", 1.07, 47.79, false],
    ["TOURS", 0.69, 47.39, true], ["Châtellerault", 0.55, 46.82, false], ["Poitiers", 0.34, 46.58, false], ["Angoulême", 0.16, 45.65, false],
    ["Barbezieux", -0.15, 45.47, false], ["BORDEAUX", -0.58, 44.84, true],
  ],
};
type RotaNokta = [string, number, number, boolean];
const rotaYol = (ad: string, ozel?: RotaNokta[]) => {
  const R = ozel?.length ? ozel : ROTALAR[ad] ?? ROTALAR["paris-bordeaux"];
  const PTS = R.map(([, lo, la]) => pj(lo, la));
  const SEG = PTS.slice(1).map((q, i) => Math.hypot(q[0] - PTS[i][0], q[1] - PTS[i][1]));
  const TOT = SEG.reduce((a, b) => a + b, 0);
  const at = (q: number): [number, number] => {
    let d = q * TOT;
    for (let i = 0; i < SEG.length; i++) { if (d <= SEG[i]) { const t = d / SEG[i]; return [PTS[i][0] + (PTS[i + 1][0] - PTS[i][0]) * t, PTS[i][1] + (PTS[i + 1][1] - PTS[i][1]) * t]; } d -= SEG[i]; }
    return PTS[PTS.length - 1];
  };
  // KT-3: her noktanın rota üzerindeki oranı (şehir etiketi çizgi oraya varınca belirir)
  const ORAN = PTS.map((_, i) => SEG.slice(0, i).reduce((a, b) => a + b, 0) / Math.max(1e-6, TOT));
  return { R, at, ORAN, YOL: "M" + PTS.map((q) => q.join(",")).join(" L") };
};

// ===== KT-3 rota çizimi + kamera takibi + iğne (teknik fikir: claude-animation-skills map-route, MIT © 2026 Artem Novitckii) =====
// rota_noktalar: [[ad, lon, lat, buyuk], ...] (ROTALAR yerine) · rota_ciz {bas, bit}: mürekkep çizgi kendini çizer (inout), uçta divit
// noktası; şehir adı çizgi oraya varınca belirir · kamera_takip {kare:[a,b], cs, ekran:[x,y], gecis 20}: kamera rota ucunu ekranda
// sabit noktada tutar (plan kamerasından GIRIS ile bağlanır, b'den sonra uç durur, kamera da) · igne {kare, dusme 14}: pirinç başlı
// harita iğnesi rota sonuna yerçekimiyle düşer, kare = batma TEMASI (temaslar'a "igne-tak"), bir küçük sekme, temas gölgesi.
type RotaCiz = { bas: number; bit: number };
type Takip = { kare: [number, number]; cs: number; ekran?: [number, number]; gecis?: number };
type Igne = { kare: number; dusme?: number };
const rotaIlerleme = (plan: Plan, p: number) => {
  const rc = param<RotaCiz | null>(plan, "rota_ciz", null);
  return rc ? interpolate(p, [rc.bas, rc.bit], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) }) : 1;
};
const rotaPlan = (plan: Plan) => rotaYol(param<string>(plan, "rota", "paris-bordeaux"), param<RotaNokta[] | undefined>(plan, "rota_noktalar", undefined));
export const haritaKamera = (plan: Plan, p: number): KameraDurum => {
  const k0 = kameraHesapla(plan.kamera, p);
  const tk = param<Takip | null>(plan, "kamera_takip", null);
  if (!tk) return k0;
  const { at } = rotaPlan(plan);
  const uc = at(rotaIlerleme(plan, Math.min(p, tk.kare[1])));
  const E = tk.ekran ?? [540, 900];
  const kt = { cs: tk.cs, cx: E[0] - 540 - (uc[0] - 540) * tk.cs, cy: E[1] - 960 - (uc[1] - 960) * tk.cs };
  const w = GIRIS(interpolate(p, [tk.kare[0], tk.kare[0] + (tk.gecis ?? 20)], [0, 1], cl));
  return { cs: k0.cs + (kt.cs - k0.cs) * w, cx: k0.cx + (kt.cx - k0.cx) * w, cy: k0.cy + (kt.cy - k0.cy) * w };
};
// iğnenin dekor noktası (rota sonu) — kart (yazı katmanı) buna bağlanır
export const igneNokta = (plan: Plan): [number, number] | null => {
  if (!param<Igne | null>(plan, "igne", null)) return null;
  const { R } = rotaPlan(plan);
  const s = R[R.length - 1];
  return pj(s[1], s[2]);
};
const IgneCiz: React.FC<{ x: number; y: number; ig: Igne; p: number }> = ({ x, y, ig, p }) => {
  const n = ig.dusme ?? 14, t = p - ig.kare;
  if (t < -n) return null;
  // düşüş: yerçekimi (in quad) 140 px yükseklikten; temas sonrası 8 karelik tek sekme (8 px)
  const h = t < 0 ? 140 * Easing.in(Easing.quad)(-t / n) : t < 8 ? 8 * Math.sin((Math.PI * t) / 8) : 0;
  const ezil = t >= 0 && t < 4 ? 1 - 0.12 * Math.sin((Math.PI * t) / 4) : 1;
  const gol = interpolate(h, [0, 140], [1, 0.35], cl);
  return (
    <g>
      {/* temas gölgesi: harita ışığı sol-üstten (parşömen dokusuyla aynı) → gölge sağ-alta */}
      <ellipse cx={x + 6 + h * 0.25} cy={y + 3 + h * 0.12} rx={14 * gol + 4} ry={5 * gol + 2} fill={INK} opacity={0.35 * gol} />
      <g transform={`translate(${x},${y - h}) scale(${1 / Math.sqrt(ezil)},${ezil})`}>
        <line x1={0} y1={0} x2={0} y2={-46} stroke="#3a3128" strokeWidth={4} strokeLinecap="round" />
        <circle cx={0} cy={-52} r={17} fill="#b8862b" stroke={INK} strokeWidth={4} />
        <circle cx={-5} cy={-57} r={5} fill="#e7c98a" />
      </g>
    </g>
  );
};

const INK = "#2b1d10";
// ikonlar (font dışı glif yerine SVG): güneş, ay, Chappe T
const Gunes: React.FC = () => <g><circle r={13} fill="#e7c37a" />{Array.from({ length: 8 }).map((_, i) => { const a = (i * Math.PI) / 4; return <line key={i} x1={Math.cos(a) * 17} y1={Math.sin(a) * 17} x2={Math.cos(a) * 24} y2={Math.sin(a) * 24} stroke="#e7c37a" strokeWidth={3.5} strokeLinecap="round" />; })}</g>;
// K4: hilal (eski iç yay yarıçapı kirişten küçüktü → SVG onu büyütüp sıfır alan çiziyordu; ay görünmüyordu)
const Ay: React.FC = () => <path d="M 6 -18 A 18 18 0 1 0 6 18 A 22 22 0 0 1 6 -18 Z" fill="#cfd6e6" />;
const TIkon: React.FC<{ renk: string }> = ({ renk }) => <g stroke={renk} strokeLinecap="round"><line x1={0} y1={22} x2={0} y2={-14} strokeWidth={4} /><line x1={-20} y1={-14} x2={20} y2={-14} strokeWidth={6} /><line x1={-20} y1={-14} x2={-20} y2={-2} strokeWidth={4} /><line x1={20} y1={-14} x2={20} y2={-26} strokeWidth={4} /></g>;

const KuleIkon: React.FC<{ x: number; y: number; on: number }> = ({ x, y, on }) => (
  <g transform={`translate(${x},${y})`}>
    <circle r={34} fill={`rgba(255,179,87,${0.55 * on})`} style={{ filter: "blur(8px)" }} />
    <rect x={-8} y={-6} width={16} height={14} fill="#3a2a1a" />
    <rect x={-1.5} y={-34} width={3} height={30} fill="#2a1d12" />
    <rect x={-15} y={-37} width={30} height={4} fill="#2a1d12" />
    <rect x={-16} y={-37} width={3} height={12} fill="#2a1d12" />
    <rect x={13} y={-45} width={3} height={12} fill="#2a1d12" />
  </g>
);

type Vurus = { bas: number; bit: number; kule?: number; gun?: number; saat?: number };
const SayacKutu: React.FC<{ y: number; giris: number; ikon: React.ReactNode; metin: string; sag?: number }> = ({ y, giris, ikon, metin, sag = 80 }) => (
  <div style={{ position: "absolute", right: sag, top: y, transform: `translateX(${(1 - giris) * 700}px)`, display: "flex", alignItems: "center", gap: 18, fontFamily: mono, fontSize: 44, letterSpacing: 4, padding: "12px 26px", color: "#f1e4c4", background: "rgba(30,18,8,0.88)", border: "2px solid #b8862b" }}>
    <svg width={52} height={52} viewBox="-26 -26 52 52">{ikon}</svg>{metin}
  </div>
);
const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const { R, at, ORAN, YOL } = rotaPlan(plan);
  const rc = param<RotaCiz | null>(plan, "rota_ciz", null), qr = rotaIlerleme(plan, p);
  const ig = param<Igne | null>(plan, "igne", null), igN = igneNokta(plan);
  const posta = param<Vurus | null>(plan, "posta", null);
  const tel = param<Vurus | null>(plan, "telgraf", null);
  const muhur = param<{ kare: number; metin: string } | null>(plan, "muhur", null);
  const gunSayisi = posta?.gun ?? param<number>(plan, "gun", 3), saatSayisi = tel?.saat ?? param<number>(plan, "saat", 4);
  const etiket = param<{ saat?: string; gun?: string }>(plan, "sayac_etiket", {});
  const sayacSag = param<number>(plan, "sayac_sag", 80); // sayaç kutusu sağ kenar boşluğu (px, varsayılan 80)
  const etSaat = (n: number) => (etiket.saat ?? "{n} SAAT").replace("{n}", String(n));
  const etGun = (n: number) => (etiket.gun ?? "{n}. GÜN").replace("{n}", String(n));
  const k = haritaKamera(plan, p);
  const qp = posta ? interpolate(p, [posta.bas, posta.bit], [0, 1], { ...cl, easing: Easing.inOut(Easing.sin) }) : 0;
  const qt = tel ? interpolate(p, [tel.bas, tel.bit], [0, 1], { ...cl, easing: Easing.in(Easing.quad) }) : 0;
  const [ax, ay] = at(qp);
  const telAktif = !!tel && p >= tel.bas;
  const cycle = qp * gunSayisi;
  const gece = Math.sin(cycle * Math.PI * 2 - Math.PI / 2) > 0.3;
  const gun = Math.min(gunSayisi, Math.floor(cycle) + 1);
  const saat = Math.max(1, Math.round(qt * saatSayisi));
  const ms = muhur ? interpolate(p, [muhur.kare - 12, muhur.kare], [2.4, 1], { ...cl, easing: Easing.in(Easing.cubic) }) : 0;
  const muhurVar = !!muhur && p >= muhur.kare - 12;
  const bob = Math.sin(p * 0.6) * 3;
  if (posta) kilit.push({ ad: "araba", p: [540 + k.cx + (ax - 540) * k.cs, 960 + k.cy + (ay - 960) * k.cs], tur: "dokunus" });
  if (muhur) kilit.push({ ad: "mühür", p: [540, 880], tur: "temas" });
  if (ig && igN) kilit.push({ ad: "iğne", p: [540 + k.cx + (igN[0] - 540) * k.cs, 960 + k.cy + (igN[1] - 960) * k.cs], tur: "temas" });
  if (rc) { const u = at(qr); kilit.push({ ad: "rota ucu", p: [540 + k.cx + (u[0] - 540) * k.cs, 960 + k.cy + (u[1] - 960) * k.cs], tur: "dokunus" }); }
  // sayaç kutuları alt bantta: altyazı (KT-1) bu kilit yüzünden üst banda çıkar
  if (posta || tel) kilit.push({ ad: "sayaç kutusu", p: [800, posta && tel ? 1400 : 1350], tur: "kurulum" });
  const nKule = tel?.kule ?? 13;
  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a120b", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${k.cx}px,${k.cy}px) scale(${k.cs})` }}>
        <Img src={staticFile("blanc/img/parsomen.jpg")} style={{ position: "absolute", left: -200, top: -300, width: 1480, height: 2520, objectFit: "cover" }} />
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <defs><pattern id="hrTarama" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeWidth="0.8" opacity="0.2" /></pattern></defs>
          <path d={FR} fill={INK} stroke={INK} strokeWidth={7} strokeLinejoin="round" opacity={0.85} />
          <path d={FR} fill="#d9c49a" />
          <path d={FR} fill="url(#hrTarama)" />
          {!rc && <path d={YOL} fill="none" stroke={INK} strokeWidth={4} strokeDasharray="2 10" strokeLinecap="round" opacity={0.7} />}
          {/* KT-3: mürekkep rota kendini çizer (iki geçiş: yumuşak alt iz + net kontur), uçta divit damlası */}
          {rc && qr > 0 && <>
            <path d={YOL} fill="none" stroke={INK} strokeWidth={11} pathLength={1} strokeDasharray={`${qr} 2`} strokeLinecap="round" strokeLinejoin="round" opacity={0.18} />
            <path d={YOL} fill="none" stroke={INK} strokeWidth={5} pathLength={1} strokeDasharray={`${qr} 2`} strokeLinecap="round" strokeLinejoin="round" />
            {qr < 1 && (() => { const [ux, uy] = at(qr); return <circle cx={ux} cy={uy} r={7} fill={INK} />; })()}
          </>}
          {posta && <path d={YOL} fill="none" stroke="#7a5a2a" strokeWidth={5} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - qp} strokeLinecap="round" />}
          {telAktif && <path d={YOL} fill="none" stroke="#c98a2a" strokeWidth={6} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - qt} strokeLinecap="round" />}
          {R.map(([n, lo, la, big], i) => { const [x, y] = pj(lo, la);
            // KT-3: rota çizilirken şehir, çizgi varınca mürekkeple belirir (ölçek .6 → 1, GIRIS)
            if (rc) { const g = i === 0 ? 1 : GIRIS(interpolate(qr, [ORAN[i] - 0.001, ORAN[i] + 0.12], [0, 1], cl)); if (g <= 0) return null;
              return <g key={n} transform={`translate(${x},${y}) scale(${0.6 + 0.4 * g}) translate(${-x},${-y})`} opacity={g}>{big ? <><circle cx={x} cy={y} r={11} fill={INK} /><text x={x + 20} y={y + 12} fontFamily={serif} fontWeight={900} fontSize={40} fill={INK}>{n}</text></> : <circle cx={x} cy={y} r={5} fill={INK} />}</g>; }
            return big ? <g key={n}><circle cx={x} cy={y} r={11} fill={INK} stroke={INK} strokeWidth={3} /><text x={x + 20} y={y + 12} fontFamily={serif} fontWeight={900} fontSize={40} fill={INK}>{n}</text></g> : <circle key={n} cx={x} cy={y} r={4} fill={INK} />; })}
          {telAktif && Array.from({ length: nKule }).map((_, i) => { const q = i / (nKule - 1); const [x, y] = at(q); return <KuleIkon key={i} x={x - 28} y={y} on={interpolate(qt, [q - 0.02, q + 0.02], [0, 1], cl)} />; })}
          {posta && qp > 0 && qp < 1 && Array.from({ length: 8 }).map((_, i) => { const [dx, dy] = at(Math.max(0, qp - 0.004 * (i + 1))); return <circle key={i} cx={dx + 40} cy={dy + 10} r={6 + i * 2.4} fill="#c9b48a" opacity={0.4 * (1 - i / 8)} />; })}
          {/* mühür: harita yüzeyine iner (540, 880); temas karesinde ölçek 1 */}
          {muhurVar && <g transform={`translate(540,880) scale(${ms}) rotate(-10)`}>
            <rect x={-300} y={-58} width={600} height={116} fill="rgba(233,223,201,0.55)" stroke="#b3261e" strokeWidth={10} />
            <text x={0} y={24} textAnchor="middle" fontFamily={mono} fontSize={64} letterSpacing={6} fill="#b3261e">{muhur!.metin}</text>
          </g>}
          {ig && igN && <IgneCiz x={igN[0]} y={igN[1]} ig={ig} p={p} />}
        </svg>
        {posta && <Img src={staticFile("blanc/img/araba.png")} style={{ position: "absolute", left: ax - 100, top: ay - 82 + bob, width: 200 }} />}
      </div>
      {/* K4 çift sayaç: telgraf üstte, posta altta (ikisi birden varsa); tek vuruşta tek kutu eski yerinde */}
      {tel && p >= tel.bas && <SayacKutu y={posta ? 1290 : 1320} giris={interpolate(p, [tel.bas, tel.bas + 12], [0, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) })} ikon={<TIkon renk="#f1e4c4" />} metin={etSaat(saat)} sag={sayacSag} />}
      {posta && p >= posta.bas && <SayacKutu y={tel ? 1400 : 1320} giris={interpolate(p, [posta.bas, posta.bas + 12], [0, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) })} ikon={gece ? <Ay /> : <Gunes />} metin={etGun(gun)} sag={sayacSag} />}
    </div>
  );
};

export const HARITA: Sablon = { Sahne, arsiv: () => "kagit" };
