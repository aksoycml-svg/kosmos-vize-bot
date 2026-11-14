// ===== Kit yazı standardı (K2) — şablondan BAĞIMSIZ, parametre değil =====
// EKRAN YAZISI: her zaman kâğıt şerit (01-masa stili) + Playfair 900 (formül: Plex Mono). Vurgu kırmızısı YALNIZ TEK kelime
// (vurgu listesinden ilk eşleşen). İki satıra bölünürse şerit iki satırı birlikte kapsar; kutu üst bant y 240–400 içinde kalır
// (boyut satır uzunluğundan hesaplanır — taşma yok). Dış hat/gölgeli serbest yazı YOK (kalabalık arka planda okunmuyordu, K1 03/05).
// REPLİK ALTYAZISI: Inter 800 + konuşan plakası (02-sokak-gece stili) + arkasında yarı saydam koyu bant (α .62).
import React from "react";
import { AbsoluteFill } from "remotion";
import { mono, sans, serif } from "../theme";
import { ekranYerlesim, emPlayfair, olcIddia, PAY, yerlesim, type Olc } from "./yerlesim";

export const YAZI = { ustY: 240, ustAlt: 400, altY: 1290, altAlt: 1490, yan: 80, kutuW: 920 } as const;
const KAGIT = "rgba(233,223,201,0.94)", MUREKKEP = "#1c1915", KIRMIZI_KAGIT = "#b3261e", KIRMIZI = "#e5483c";

const kucuk = (s: string, dil = "tr") => s.toLocaleLowerCase(dil);
// tek vurgu: metindeki ilk kelime ki vurgu listesindeki bir öğeyle başlar (tırnak/işaret baştan atlanır)
export const vurguIndeks = (kelimeler: string[], vurgu: string[] = [], dil = "tr") => kelimeler.findIndex((w) => vurgu.some((v) => v && kucuk(w, dil).replace(/^[^\p{L}\p{N}~]+/u, "").startsWith(kucuk(v, dil))));

// KE-PK-Y1 (Paris C2): zemin "koyu" → kâğıt şerit yerine koyu zemine AÇIK MÜREKKEP (krem #e4dccb, L* ≈ 88; ince koyu alt gölge,
// çerçeve yok). Varsayılan (zemin yok) eski kâğıt şerit — mevcut bölümler değişmez.
const ACIK_MUREKKEP = "#e4dccb";
const Serit: React.FC<{ children: React.ReactNode; padY?: number; maxW?: number; koyu?: boolean }> = ({ children, padY = 8, maxW = YAZI.kutuW, koyu }) => koyu ? (
  <div style={{ padding: `${padY}px 26px ${padY + 4}px`, maxWidth: maxW, borderTop: `2px solid ${ACIK_MUREKKEP}`, textShadow: "0 2px 0 rgba(20,17,13,0.55)" }}>{children}</div>
) : (
  <div style={{ background: KAGIT, borderTop: `2px solid ${MUREKKEP}`, borderBottom: `2px solid ${MUREKKEP}`, padding: `${padY}px 26px ${padY + 4}px`, boxShadow: "0 3px 0 rgba(20,17,13,0.35)", maxWidth: maxW }}>{children}</div>
);

// EKRAN YAZISI (iddia / formül). bant "alt" yalnız istisna (alt bant replik içindir): kutu alt kenarı y 1490.
// K9: dil (lang + vurgu küçük harf yerel ayarı); kutuX: [x0, x1] yatay sınır (örtme istisnası, ör. Evliya P02 x ≥ 260)
export const KitEkranYazisi: React.FC<{ metin: string; vurgu?: string[]; tur?: "iddia" | "formul"; bant?: "ust" | "alt"; dil?: string; kutuX?: [number, number]; zemin?: "koyu" }> = ({ metin, vurgu, tur = "iddia", bant = "ust", dil = "tr", kutuX, zemin }) => {
  const koyu = zemin === "koyu";
  const formul = tur === "formul";
  const sol = kutuX ? Math.max(YAZI.yan, kutuX[0]) : YAZI.yan, kutuW = kutuX ? Math.min(1080 - YAZI.yan, kutuX[1]) - sol : YAZI.kutuW;
  const { satirlar, px } = ekranYerlesim(metin, formul, kutuW);
  const tum = satirlar.flat();
  const vi = formul ? -1 : vurguIndeks(tum, vurgu, dil);
  let j = 0;
  return (
    <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: bant === "ust" ? "flex-start" : "flex-end", padding: bant === "ust" ? `${YAZI.ustY + 6}px ${YAZI.yan}px 0 ${sol}px` : `0 ${YAZI.yan}px ${1920 - YAZI.altAlt}px ${sol}px` }}>
      <Serit padY={satirlar.length > 1 ? 6 : 8} maxW={kutuW} koyu={koyu}>
        <div lang={dil} style={{ fontFamily: formul ? mono : serif, fontWeight: formul ? 500 : 900, fontSize: px, lineHeight: 1.04, letterSpacing: formul ? "0.04em" : undefined, color: koyu ? ACIK_MUREKKEP : MUREKKEP, whiteSpace: "nowrap" }}>
          {satirlar.map((s, si) => (
            <div key={si}>{s.map((w, wi) => { const i = j++; return <span key={wi} style={{ color: i === vi ? (koyu ? KIRMIZI : KIRMIZI_KAGIT) : undefined }}>{w}{wi < s.length - 1 ? " " : ""}</span>; })}</div>
          ))}
        </div>
      </Serit>
    </AbsoluteFill>
  );
};

// REPLİK ALTYAZISI: konuşan plakası + koyu yarı saydam bant (satırları kapsar). okunan kelime ölçek 1.04 (K9: 1.06 + 13 px aralık kelimeleri birleştiriyordu; aralık 18 px); vurgu tek kelime kırmızı.
export const KitReplik: React.FC<{ metin: string; kim?: string; vurgu?: string[]; okunan?: number; bant?: "ust" | "alt"; dil?: string }> = ({ metin, kim, vurgu, okunan = -1, bant = "alt", dil = "tr" }) => {
  const k = metin.split(" ").filter(Boolean);
  const vi = vurguIndeks(k, vurgu, dil);
  const px0 = metin.length > 52 ? 48 : 54;
  // tek satıra ≥44 px ile sığıyorsa küçülterek tek satır (yetim son kelime/kesik yok); sığmıyorsa eski çok satırlı akış
  const tekPx = (YAZI.kutuW - 52 - (k.length - 1) * 5) / (metin.length * 0.58); // K9: aralık 18 px (eski 13) payı
  const tek = tekPx >= 44 && tekPx < px0;
  const px = tek ? Math.floor(tekPx) : px0;
  return (
    <AbsoluteFill style={{ justifyContent: bant === "alt" ? "flex-end" : "flex-start", alignItems: "center", padding: bant === "alt" ? `0 ${YAZI.yan}px ${1920 - YAZI.altAlt}px` : `${YAZI.ustY + 4}px ${YAZI.yan}px 0` }}>
      {kim && <div style={{ fontFamily: mono, fontWeight: 500, fontSize: 30, letterSpacing: "0.2em", color: "#e7c37a", marginBottom: 6, padding: "2px 14px 4px 18px", background: "rgba(20,17,13,0.82)" }}>{kim}</div>}
      <div lang={dil} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 18px", fontFamily: sans, fontWeight: 800, fontSize: px, lineHeight: 1.14, textAlign: "center", whiteSpace: tek ? "nowrap" : undefined, maxWidth: YAZI.kutuW, padding: "8px 26px 10px", background: "rgba(20,17,13,0.62)", borderRadius: 4 }}>
        {k.map((w, i) => (
          <span key={i} style={{ color: i === vi ? KIRMIZI : "#f6f1e4", display: "inline-block", transform: i === okunan ? "scale(1.04)" : undefined, filter: i === okunan ? "brightness(1.12)" : undefined }}>{w}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// HARİTA ETİKETİ (tasarım §6, Evliya P09): kâğıt fiş + Plex Mono 500 30 px BÜYÜK HARF, 0.08em; noktaya 2 px ince işaret çizgisi.
// Ekran koordinatı çağıranda (görüntüyle aynı kamera fonksiyonu: ekranNokta) hesaplanır. t: giriş/çıkış 0–1.
export const HARITA_FIS = { px: 30, harf: 0.6 + 0.08, padY: 8, padX: 14, kenar: 1.5 } as const;
export const haritaFisBoyut = (metin: string) => ({ w: metin.length * HARITA_FIS.harf * HARITA_FIS.px + 2 * (HARITA_FIS.padX + HARITA_FIS.kenar), h: HARITA_FIS.px * 1.2 + 2 * (HARITA_FIS.padY + HARITA_FIS.kenar) });
// §5H.7 şehir adı (yazı katmanı, dekora yapışık): Playfair 900, mürekkep; merkez ekran px, px = 40 × cs
export const KitHaritaAdi: React.FC<{ metin: string; merkez: [number, number]; px: number; t: number; dil?: string }> = ({ metin, merkez, px, t, dil = "tr" }) => (
  <div lang={dil} style={{ position: "absolute", left: merkez[0], top: merkez[1], transform: `translate(-50%,-50%) scale(${0.92 + 0.08 * t})`, opacity: t,
    fontFamily: serif, fontWeight: 900, fontSize: px, lineHeight: 1, color: MUREKKEP, whiteSpace: "nowrap", letterSpacing: "0.02em" }}>{metin}</div>
);
export const KitHaritaEtiketi: React.FC<{ metin: string; kutu: [number, number]; nokta: [number, number]; t: number; dil?: string }> = ({ metin, kutu, nokta, t, dil = "tr" }) => {
  const { w, h } = haritaFisBoyut(metin);
  // çizgi: noktadan fişin en yakın kenar noktasına (fiş içindeyse yok)
  const kx = Math.max(kutu[0] - w / 2, Math.min(kutu[0] + w / 2, nokta[0])), ky = Math.max(kutu[1] - h / 2, Math.min(kutu[1] + h / 2, nokta[1]));
  const cizgi = Math.hypot(kx - nokta[0], ky - nokta[1]) > 4;
  return (
    <AbsoluteFill style={{ opacity: t }}>
      {cizgi && <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <line x1={nokta[0]} y1={nokta[1]} x2={kx} y2={ky} stroke="#4a4237" strokeWidth={2} strokeLinecap="round" />
        <circle cx={nokta[0]} cy={nokta[1]} r={3} fill="#4a4237" />
      </svg>}
      <div lang={dil} style={{ position: "absolute", left: kutu[0] - w / 2, top: kutu[1] - h / 2, width: w, height: h, boxSizing: "border-box", transform: `scale(${0.92 + 0.08 * t})`,
        background: "rgba(233,223,201,0.92)", border: `${HARITA_FIS.kenar}px solid ${MUREKKEP}`, padding: `${HARITA_FIS.padY}px ${HARITA_FIS.padX}px`,
        fontFamily: mono, fontWeight: 500, fontSize: HARITA_FIS.px, lineHeight: 1.2, letterSpacing: "0.08em", color: MUREKKEP, whiteSpace: "nowrap", textAlign: "center" }}>{metin}</div>
    </AbsoluteFill>
  );
};

// KT-4 SAYAÇ (ekran yazısı türü): kâğıt şerit + Playfair 900, rakamlar tabular (kutu titremez); 0 → hedef GIRIS eğrisiyle,
// binlik ayırıcı dil başına (sayiBicim). donus: sayı kâğıtta yukarı kayıp çıkar, yuvarlak ifade alttan girer ("İKİ MİLYON").
// Paris jüri düzeltme 2: sayı ve dönüş metni AYRI boyutlanır (font metriği). Sayının punto/kutu genişliği hedef değerden (tüm rakamlar
// tabular → en geniş rakam '0' ile ölçülür) → sayarken boyut değişmez. Dönüş metni " · " ayırıcısından iki satıra kırılır (gerekirse 3),
// kutu yüksekliği dönüşle birlikte sayının satırından dönüşün satırlarına geçer (bant y 240–400 içinde).
// Teknik fikir: claude-animation-skills graph/template (count-up, toLocaleString) — MIT, © 2026 Artem Novitckii.
const olcSayi: Olc = (s) => emPlayfair(s.replace(/[0-9]/g, "0"));
export const KitSayac: React.FC<{ sablon: string; deger: string; hedefMetin: string; donus?: string; donusT?: number; vurgu?: boolean; bant?: "ust" | "alt"; dil?: string }> = ({ sablon, deger, hedefMetin, donus, donusT = 0, vurgu, bant = "ust", dil = "tr" }) => {
  const ic = YAZI.kutuW - 52;
  const px1 = Math.min(72, (ic * PAY) / Math.max(0.5, olcSayi(hedefMetin)));
  const w1 = olcSayi(hedefMetin) * px1 / PAY + 52, h1 = px1 * 1.04 + 18;
  const d = donus ? yerlesim(donus, olcIddia, YAZI.kutuW, [72, 64, 44], { maksSatir: 3 }) : null;
  const w2 = d ? Math.max(...d.satirlar.map((q) => olcIddia(q.join(" ")))) * d.px / PAY + 52 : 0;
  const h2 = d ? d.satirlar.length * d.px * 1.04 + (d.satirlar.length > 1 ? 16 : 18) : 0;
  const t = d ? Math.max(0, Math.min(1, donusT)) : 0;
  const w = Math.min(YAZI.kutuW, Math.max(w1, w2)), h = h1 + (h2 - h1) * t;
  const parca = sablon.split("{n}");
  const sayi = <>{parca[0]}<span style={{ color: vurgu ? KIRMIZI_KAGIT : undefined }}>{deger}</span>{parca.slice(1).join("{n}")}</>;
  const katman = (px: number, y: number, op: number, icerik: React.ReactNode) => (
    <div lang={dil} style={{ position: "absolute", left: 26, right: 0, top: 6, transform: `translateY(${y}px)`, opacity: op, whiteSpace: "nowrap",
      fontFamily: serif, fontWeight: 900, fontSize: px, lineHeight: 1.04, color: MUREKKEP, fontVariantNumeric: "tabular-nums lining-nums" }}>{icerik}</div>
  );
  return (
    <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: bant === "ust" ? "flex-start" : "flex-end", padding: bant === "ust" ? `${YAZI.ustY + 6}px ${YAZI.yan}px 0` : `0 ${YAZI.yan}px ${1920 - YAZI.altAlt}px` }}>
      <div style={{ position: "relative", width: w, height: h, overflow: "hidden", background: KAGIT, borderTop: `2px solid ${MUREKKEP}`, borderBottom: `2px solid ${MUREKKEP}`, boxShadow: "0 3px 0 rgba(20,17,13,0.35)" }}>
        {t < 1 && katman(px1, -t * h1, 1 - t, sayi)}
        {d && t > 0 && katman(d.px, (1 - t) * h2, t, d.satirlar.map((q, i) => <div key={i} style={{ color: vurgu ? KIRMIZI_KAGIT : undefined }}>{q.join(" ")}</div>))}
      </div>
    </AbsoluteFill>
  );
};

// KT-3 HARİTA BİLGİ KARTI (yazı katmanı): iğne noktasına bağlı kâğıt kart — başlık Playfair 900 44 px, alt satır Plex Mono 28 px.
// yon: kartın iğneye göre yeri (ust varsayılan). Kart güvenli alanda kalır (x 80–1000, y 240–1490); iğneye ince mürekkep sap.
// Teknik fikir: claude-animation-skills map-route (iğne düşer, kart iğnenin üstünde belirir, kenarlara kenetlenir) — MIT.
export const KitHaritaKart: React.FC<{ metin: string; alt?: string; nokta: [number, number]; t: number; yon?: "ust" | "alt" | "sol" | "sag"; dil?: string }> = ({ metin, alt, nokta, t, yon = "ust", dil = "tr" }) => {
  const bpx = 44, apx = 28;
  const w = Math.max(metin.length * 0.56 * bpx, (alt?.length ?? 0) * 0.62 * apx) + 2 * 24 + 4;
  const h = bpx * 1.15 + (alt ? apx * 1.3 + 6 : 0) + 2 * 16 + 4;
  const ara = 70;
  let cx = nokta[0], cy = nokta[1];
  if (yon === "ust") cy -= ara + h / 2; else if (yon === "alt") cy += ara + h / 2; else if (yon === "sol") cx -= ara + w / 2; else cx += ara + w / 2;
  cx = Math.max(YAZI.yan + w / 2, Math.min(1080 - YAZI.yan - w / 2, cx));
  cy = Math.max(YAZI.ustY + h / 2, Math.min(YAZI.altAlt - h / 2, cy));
  const kx = Math.max(cx - w / 2, Math.min(cx + w / 2, nokta[0])), ky = Math.max(cy - h / 2, Math.min(cy + h / 2, nokta[1]));
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, t * 1.4) }}>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <line x1={nokta[0]} y1={nokta[1] - 6} x2={kx} y2={ky} stroke={MUREKKEP} strokeWidth={2.5} strokeLinecap="round" strokeDasharray={`${Math.hypot(kx - nokta[0], ky - nokta[1]) * t} 2000`} />
      </svg>
      <div lang={dil} style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2 + (1 - t) * 16, width: w, height: h, boxSizing: "border-box", transform: `scale(${0.92 + 0.08 * t})`,
        background: KAGIT, border: `2px solid ${MUREKKEP}`, boxShadow: "0 4px 0 rgba(20,17,13,0.35)", padding: "16px 24px", textAlign: "center", whiteSpace: "nowrap" }}>
        <div style={{ fontFamily: serif, fontWeight: 900, fontSize: bpx, lineHeight: 1.15, color: MUREKKEP }}>{metin}</div>
        {alt && <div style={{ fontFamily: mono, fontWeight: 500, fontSize: apx, lineHeight: 1.3, marginTop: 6, letterSpacing: "0.06em", color: "#4a4237" }}>{alt}</div>}
      </div>
    </AbsoluteFill>
  );
};
