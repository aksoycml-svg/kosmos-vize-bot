import React from "react";
import { AbsoluteFill } from "remotion";
import { P } from "./sabitler";

// ===== Güvenli alan + yazı bandı + Instagram arayüzü bindirmesi ve kilit nokta denetimi (eleştiri A, sistemik 3) =====
// Sahne `guvenli` prop'u ile render edilince bindirme çizilir; kilit noktalar (ayak, temas, kurulum nesnesi, yüz…)
// otomatik denetlenir. İhlaller kırmızı işaret + sol üstte liste olarak karede görünür ve konsola yazılır.
// igSag: Instagram sağ alt eylem düğmeleri sütunu (beğeni/yorum/paylaş/kaydet/ses) — x 920–1080, y 900–1700 ayrı KİLİT bölgesi
// (A4, elestiri-C SC3: alt 420 bandına taşan kısmı da işaretlenir; yüz de bu sütuna girmez — göz düğmenin altında kalır).
export const GUVENLI = { ust: 220, alt: 420, yan: 80, igSag: 160, igSagY: [900, 1700] as [number, number] };
export const BANTLAR = { ust: [240, 400] as [number, number], alt: [1290, 1490] as [number, number] };

export type KilitTur = "ayak" | "temas" | "kurulum" | "yuz" | "dokunus" | "yazi";
export type KilitNokta = { ad: string; p: P; tur: KilitTur };

// Kurallar: tüm kilit noktalar y 220–1500, x 80–1000; ayak/temas/kurulum/dokunuş/YÜZ IG sağ düğme sütununda (x>920, y 900–1700) olmaz;
// aktif altyazı/yazı bandına düşmez (yazı türü hariç).
export const kilitKontrol = (k: KilitNokta, aktifBant: "ust" | "alt" | null): string | null => {
  const [x, y] = k.p;
  // IG düğme sütunu önce: alt banda ya da yan paya da düşse asıl neden bu (ayrı ad)
  if (k.tur !== "yazi" && x > 1080 - GUVENLI.igSag && y > GUVENLI.igSagY[0] && y < GUVENLI.igSagY[1]) return `${k.ad}: IG sağ düğme sütunu (x ${Math.round(x)}, y ${Math.round(y)})`;
  if (y < GUVENLI.ust) return `${k.ad}: üst 220 içinde (y ${Math.round(y)})`;
  if (y > 1920 - GUVENLI.alt) return `${k.ad}: alt 420 içinde (y ${Math.round(y)})`;
  if (x < GUVENLI.yan || x > 1080 - GUVENLI.yan) return `${k.ad}: yan 80 içinde (x ${Math.round(x)})`;
  if (k.tur !== "yazi" && aktifBant) { const [a, b] = BANTLAR[aktifBant]; if (y > a && y < b) return `${k.ad}: ${aktifBant === "ust" ? "ÜST" : "ALT"} yazı bandında (y ${Math.round(y)})`; }
  return null;
};
export const kilitRapor = (noktalar: KilitNokta[], aktifBant: "ust" | "alt" | null) => noktalar.map((k) => ({ k, hata: kilitKontrol(k, aktifBant) }));

export const GuvenliAlan: React.FC<{ noktalar?: KilitNokta[]; aktifBant?: "ust" | "alt" | null; baslik?: string }> = ({ noktalar = [], aktifBant = null, baslik }) => {
  const rapor = kilitRapor(noktalar, aktifBant);
  const hatalar = rapor.filter((r) => r.hata);
  if (hatalar.length) console.warn(`[GuvenliAlan] ${baslik ?? ""}: ${hatalar.map((h) => h.hata).join(" | ")}`);
  const kirmizi = "rgba(229,72,60,0.28)";
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={1080} height={1920}>
        <rect x={0} y={0} width={1080} height={GUVENLI.ust} fill={kirmizi} />
        <rect x={0} y={1920 - GUVENLI.alt} width={1080} height={GUVENLI.alt} fill={kirmizi} />
        <rect x={0} y={GUVENLI.ust} width={GUVENLI.yan} height={1920 - GUVENLI.ust - GUVENLI.alt} fill={kirmizi} />
        <rect x={1080 - GUVENLI.yan} y={GUVENLI.ust} width={GUVENLI.yan} height={1920 - GUVENLI.ust - GUVENLI.alt} fill={kirmizi} />
        {/* IG sağ düğme sütunu: tam genişlik (920–1080) + düğme yerleri; çizgili, ayrı kilit bölgesi */}
        <defs><pattern id="igSutun" patternUnits="userSpaceOnUse" width={16} height={16} patternTransform="rotate(45)"><line x1={0} y1={0} x2={0} y2={16} stroke="rgba(255,120,40,0.55)" strokeWidth={5} /></pattern></defs>
        <rect x={1080 - GUVENLI.igSag} y={GUVENLI.igSagY[0]} width={GUVENLI.igSag} height={GUVENLI.igSagY[1] - GUVENLI.igSagY[0]} fill="url(#igSutun)" stroke="#ff7828" strokeWidth={3} />
        {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={1000} cy={GUVENLI.igSagY[0] + 90 + i * 150} r={34} fill="none" stroke="#ff7828" strokeWidth={4} />)}
        <text x={1076} y={GUVENLI.igSagY[0] - 10} textAnchor="end" fontFamily="monospace" fontSize={20} fill="#ff7828" stroke="#000" strokeWidth={4} paintOrder="stroke">IG düğmeleri</text>
        {(["ust", "alt"] as const).map((b) => <rect key={b} x={GUVENLI.yan} y={BANTLAR[b][0]} width={1080 - 2 * GUVENLI.yan} height={BANTLAR[b][1] - BANTLAR[b][0]} fill={aktifBant === b ? "rgba(80,160,255,0.16)" : "none"} stroke="#50a0ff" strokeWidth={3} strokeDasharray="14 8" />)}
        <line x1={0} y1={420} x2={1080} y2={420} stroke="#ffd060" strokeWidth={2} strokeDasharray="6 10" />
        <line x1={0} y1={1290} x2={1080} y2={1290} stroke="#ffd060" strokeWidth={2} strokeDasharray="6 10" />
        {rapor.map(({ k, hata }, i) => (
          <g key={i}>
            <circle cx={k.p[0]} cy={k.p[1]} r={12} fill="none" stroke={hata ? "#ff3020" : "#30e060"} strokeWidth={4} />
            <line x1={k.p[0] - 18} y1={k.p[1]} x2={k.p[0] + 18} y2={k.p[1]} stroke={hata ? "#ff3020" : "#30e060"} strokeWidth={2} />
            <text x={k.p[0] + 16} y={k.p[1] - 14} fontFamily="monospace" fontSize={20} fill={hata ? "#ff3020" : "#30e060"} stroke="#000" strokeWidth={4} paintOrder="stroke">{k.ad}</text>
          </g>
        ))}
        <text x={90} y={60} fontFamily="monospace" fontSize={26} fill="#fff" stroke="#000" strokeWidth={5} paintOrder="stroke">{`${baslik ?? ""}  kilit: ${rapor.length}  ihlal: ${hatalar.length}`}</text>
        {hatalar.map((h, i) => <text key={i} x={90} y={100 + i * 30} fontFamily="monospace" fontSize={22} fill="#ff6050" stroke="#000" strokeWidth={5} paintOrder="stroke">{h.hata}</text>)}
      </svg>
    </AbsoluteFill>
  );
};
