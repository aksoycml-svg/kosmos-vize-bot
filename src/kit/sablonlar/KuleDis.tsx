// ===== KULE-DIS şablonu (ilk sürüm, sade) =====
// Açık gök + Loire ovası sırtları (hava perspektifi) + 1–5 Chappe istasyonu: kare tuffeau kule (mekanlar.md KD-B, #dccaa0) + çatıdan
// gök mavisi direk + T (ChappeKule; oran 2.3:1, kollar siyah, karşı ağırlık gri). Uzaktaki kule küçük (L), ayrıntı mesafeyle iner.
// saat: gun (kollar anahtarlı oynar) · alacakaranlik (siluet, kollar SABİT — telgraf gece/siste çalışmaz; doğrulayıcı denetler).
// halo: [bas, bit] — "hata" vurgusu, kırmızı halka (kırmızı yalnız hata/vurgu). Işık: güneş sol-üst → gölge sağa.
import React from "react";
import { interpolate } from "remotion";
import { ChappeKule, CHAPPE_ORAN } from "../../doku/ChappeKule";
import { RenkKaydi, Tarama } from "../../doku/Tarama";
import { KonturTitreme } from "../../doku/KonturTitreme";
import { BL, DOKU_SEED, ink, poly, rnd, tonla } from "../../doku/sabitler";
import { cl, GIRIS, kameraHesapla, ekranNokta } from "../zaman";
import { param, Sablon, SablonProps } from "../ortak";
import { kolHesapla, KolParam } from "./MasaInsert";

export type KuleTanim = { x: number; taban: number; L: number; konum: KolParam; halo?: [number, number]; govde?: boolean };
const VARSAYILAN: KuleTanim[] = [
  { x: 330, taban: 1470, L: 280, konum: "BEKLE" },
  { x: 700, taban: 1060, L: 120, konum: "BEKLE" },
  { x: 860, taban: 960, L: 64, konum: "BEKLE" },
  { x: 955, taban: 905, L: 36, konum: "BEKLE" },
];
const S = DOKU_SEED.kule;

const Kule: React.FC<{ k: KuleTanim; p: number; siluet: boolean }> = ({ k, p, siluet }) => {
  const L = k.L, H = L * CHAPPE_ORAN.direk;
  const bw = L * 1.05, bh = L * 1.6; // kule gövdesi (iki katlı kare taş ≈ 7.5 m; direk ≈ 7 m, regülatör 4.6 m)
  const tas = siluet ? "#2a2436" : "#dccaa0", cati = siluet ? "#2a2436" : "#5a6078";
  const detay = siluet ? "siluet" : L > 200 ? "yakin" : L > 70 ? "orta" : "siluet";
  const ust = k.taban - bh;
  const kol = kolHesapla(k.konum, p);
  const halo = k.halo ? interpolate(p, [k.halo[0], k.halo[0] + 8, k.halo[1] - 6, k.halo[1]], [0, 1, 1, 0], { ...cl, easing: GIRIS }) : 0;
  return (
    <g>
      {k.govde !== false && <g>
        <polygon points={poly([[k.x - bw / 2, k.taban], [k.x - bw / 2, ust], [k.x + bw / 2, ust], [k.x + bw / 2, k.taban]])} fill={tas} stroke={siluet ? "none" : ink(tas)} strokeWidth={Math.max(1.2, L * 0.012)} />
        {!siluet && L > 70 && <>
          <Tarama sekil={[[k.x + bw * 0.18, k.taban], [k.x + bw * 0.18, ust], [k.x + bw / 2, ust], [k.x + bw / 2, k.taban]]} basamak="II" aci={62} renk={ink(tas)} derinlik={L > 200 ? "yakin" : "orta"} seed={S + Math.round(L)} />
          <rect x={k.x - bw * 0.12} y={ust + bh * 0.2} width={bw * 0.2} height={bh * 0.22} fill="#3a342e" stroke={ink(tas)} strokeWidth={1.5} />
          <rect x={k.x - bw * 0.14} y={k.taban - bh * 0.34} width={bw * 0.24} height={bh * 0.34} fill="#4a3220" stroke={ink(tas)} strokeWidth={1.5} />
          <line x1={k.x - bw / 2} y1={ust + bh * 0.5} x2={k.x + bw / 2} y2={ust + bh * 0.5} stroke={tonla(tas, -0.12)} strokeWidth={L * 0.02} />
        </>}
        {/* basık arduvaz çatı (kameradan saçak altı + az yüzey: kule göz hizasının üstünde) */}
        <polygon points={poly([[k.x - bw / 2 - L * 0.05, ust], [k.x + bw / 2 + L * 0.05, ust], [k.x + bw * 0.3, ust - L * 0.14], [k.x - bw * 0.3, ust - L * 0.14]])} fill={cati} />
        {/* temas gölgesi (tek güneş: sağa) */}
        {!siluet && <ellipse cx={k.x + bw * 0.25} cy={k.taban + 2} rx={bw * 0.75} ry={Math.max(2, L * 0.03)} fill="#14110d" opacity={0.3} />}
      </g>}
      {halo > 0 && <circle cx={k.x} cy={ust - L * 0.14 - H} r={L * (0.55 + 0.1 * halo)} fill="none" stroke={BL.redLit} strokeWidth={Math.max(3, L * 0.03)} opacity={0.85 * halo} />}
      <ChappeKule x={k.x} y={ust - L * 0.1} L={L} konum={kol} detay={detay} siluetRenk={siluet ? "#1c1826" : undefined} payanda={false} />
    </g>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const siluet = param<string>(plan, "saat", "gun") === "alacakaranlik";
  const kuleler = [...param<KuleTanim[]>(plan, "kuleler", VARSAYILAN)].sort((a, b) => a.L - b.L);
  const k = kameraHesapla(plan.kamera, p);
  const kat = (f: number) => `translate(${540 + k.cx * f},${960 + k.cy * f}) scale(${1 + (k.cs - 1) * f}) translate(-540,-960)`;
  kuleler.forEach((t, i) => kilit.push({ ad: `kule ${i + 1} T`, p: ekranNokta(k, [t.x, t.taban - t.L * 1.6 - t.L * 1.62]), tur: "kurulum" }));
  const gok = siluet ? ["#3a3a6a", "#a86a6a", "#e8a36a"] : ["#a9bede", "#cfdcff", "#f2e8c9"];
  const sirt = siluet ? ["#4a3a52", "#3a3044", "#2a2436"] : ["#c9c8b4", "#aeb093", "#8f9672"];
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs><linearGradient id="kdGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={gok[0]} /><stop offset="0.6" stopColor={gok[1]} /><stop offset="1" stopColor={gok[2]} /></linearGradient></defs>
      <RenkKaydi>
        <g transform={kat(0.2)}>
          <rect x={-600} y={-600} width={2280} height={2000} fill="url(#kdGok)" />
          {!siluet && Array.from({ length: 4 }).map((_, i) => <ellipse key={i} cx={((rnd(S, `b${i}`) * 1400 + p * 0.15) % 1600) - 260} cy={260 + rnd(S, `by${i}`) * 380} rx={200 + rnd(S, `bw${i}`) * 160} ry={26} fill="#f6efe0" opacity={0.6} style={{ filter: "blur(8px)" }} />)}
        </g>
        {/* Loire sırtları: alçak, yuvarlak; uzak açık-düşük kontrast. Kuleler sırtlara basar → sırtlar ve kuleler aynı katmanda (parallaks yok, temas korunur) */}
        <g transform={kat(1)}><path d="M -400 930 Q 120 880 520 912 Q 860 940 1480 890 L 1480 1500 L -400 1500 Z" fill={sirt[0]} /></g>
        <g transform={kat(1)}><path d="M -400 1010 Q 200 960 560 1000 Q 900 1036 1480 980 L 1480 1700 L -400 1700 Z" fill={sirt[1]} /></g>
        <g transform={kat(1)}>
          <path d="M -400 1260 Q 160 1180 600 1240 Q 900 1280 1480 1200 L 1480 2300 L -400 2300 Z" fill={sirt[2]} />
          {/* ön plan: en yakın istasyona çıkan toprak yol (alt üçte bir boş kalmaz; istasyona erişim) */}
          {kuleler.length > 0 && (() => { const y = kuleler[kuleler.length - 1]; return <path d={`M ${y.x - y.L * 0.12} ${y.taban} Q ${y.x - y.L * 0.3} ${y.taban + 160} ${y.x - 120} 2000 L ${y.x + 330} 2000 Q ${y.x + y.L * 0.2} ${y.taban + 160} ${y.x + y.L * 0.12} ${y.taban} Z`} fill={siluet ? "#3a3044" : "#b8a57a"} stroke={siluet ? "none" : ink("#b8a57a")} strokeWidth={2} />; })()}
          <KonturTitreme derinlik="orta" seed={S}>
            {kuleler.map((t, i) => <Kule key={i} k={t} p={p} siluet={siluet} />)}
          </KonturTitreme>
        </g>
      </RenkKaydi>
    </svg>
  );
};

export const KULE_DIS: Sablon = { Sahne, arsiv: () => "gunduz" };
