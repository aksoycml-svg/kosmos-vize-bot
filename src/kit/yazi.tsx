// ===== Kit yazı standardı (K2) — şablondan BAĞIMSIZ, parametre değil =====
// EKRAN YAZISI: her zaman kâğıt şerit (01-masa stili) + Playfair 900 (formül: Plex Mono). Vurgu kırmızısı YALNIZ TEK kelime
// (vurgu listesinden ilk eşleşen). İki satıra bölünürse şerit iki satırı birlikte kapsar; kutu üst bant y 240–400 içinde kalır
// (boyut satır uzunluğundan hesaplanır — taşma yok). Dış hat/gölgeli serbest yazı YOK (kalabalık arka planda okunmuyordu, K1 03/05).
// REPLİK ALTYAZISI: Inter 800 + konuşan plakası (02-sokak-gece stili) + arkasında yarı saydam koyu bant (α .62).
import React from "react";
import { AbsoluteFill } from "remotion";
import { mono, sans, serif } from "../theme";

export const YAZI = { ustY: 240, ustAlt: 400, altY: 1290, altAlt: 1490, yan: 80, kutuW: 920 } as const;
const KAGIT = "rgba(233,223,201,0.94)", MUREKKEP = "#1c1915", KIRMIZI_KAGIT = "#b3261e", KIRMIZI = "#e5483c";

const kucuk = (s: string, dil = "tr") => s.toLocaleLowerCase(dil);
// tek vurgu: metindeki ilk kelime ki vurgu listesindeki bir öğeyle başlar (tırnak/işaret baştan atlanır)
export const vurguIndeks = (kelimeler: string[], vurgu: string[] = [], dil = "tr") => kelimeler.findIndex((w) => vurgu.some((v) => v && kucuk(w, dil).replace(/^[^\p{L}\p{N}~]+/u, "").startsWith(kucuk(v, dil))));

// iki satıra dengeli bölme (karakter sayısına göre en dengeli kesme noktası)
const bol = (k: string[]): string[][] => {
  const top = k.join(" ").length;
  let en = 1, fark = Infinity, say = 0;
  for (let i = 1; i < k.length; i++) { say += k[i - 1].length + 1; const f = Math.abs(top - 2 * say); if (f < fark) { fark = f; en = i; } }
  return [k.slice(0, en), k.slice(en)];
};

// Satır yerleşimi: tek satır sığarsa büyük, sığmazsa iki satır (kutu bant içinde) ve boyut satır uzunluğundan
const yerlesim = (metin: string, maks: number, enOran: number, ikiliMaks: number, kutuW: number = YAZI.kutuW) => {
  const k = metin.split(" ").filter(Boolean);
  const ic = kutuW - 52;
  const gen = (s: string, px: number) => s.length * enOran * px;
  if (gen(k.join(" "), maks) <= ic || k.length < 2) return { satirlar: [k], px: Math.min(maks, ic / Math.max(1, k.join(" ").length * enOran)) };
  const satirlar = bol(k);
  const uzun = Math.max(...satirlar.map((s) => s.join(" ").length));
  return { satirlar, px: Math.min(ikiliMaks, ic / (uzun * enOran)) };
};

const Serit: React.FC<{ children: React.ReactNode; padY?: number; maxW?: number }> = ({ children, padY = 8, maxW = YAZI.kutuW }) => (
  <div style={{ background: KAGIT, borderTop: `2px solid ${MUREKKEP}`, borderBottom: `2px solid ${MUREKKEP}`, padding: `${padY}px 26px ${padY + 4}px`, boxShadow: "0 3px 0 rgba(20,17,13,0.35)", maxWidth: maxW }}>{children}</div>
);

// EKRAN YAZISI (iddia / formül). bant "alt" yalnız istisna (alt bant replik içindir): kutu alt kenarı y 1490.
// K9: dil (lang + vurgu küçük harf yerel ayarı); kutuX: [x0, x1] yatay sınır (örtme istisnası, ör. Evliya P02 x ≥ 260)
export const KitEkranYazisi: React.FC<{ metin: string; vurgu?: string[]; tur?: "iddia" | "formul"; bant?: "ust" | "alt"; dil?: string; kutuX?: [number, number] }> = ({ metin, vurgu, tur = "iddia", bant = "ust", dil = "tr", kutuX }) => {
  const formul = tur === "formul";
  const sol = kutuX ? Math.max(YAZI.yan, kutuX[0]) : YAZI.yan, kutuW = kutuX ? Math.min(1080 - YAZI.yan, kutuX[1]) - sol : YAZI.kutuW;
  // en/oran: Playfair 900 ≈ 0.52 em/harf (ölçüldü), Plex Mono = 0.6. İki satırda boyut ≤ 64 → kutu ≈ 152 px (bant 160)
  // K4 (v4 P06/P07): formül telefonda küçük kalıyordu (44 px mono). Artık iddia boyutuna yakın: tek satır ≤ 64, iki satır ≤ 60;
  // " · " ayırıcısı varsa satır oradan kırılır (ayırıcı düşer) — "ELDİVEN = ↑" / "ÇORAP = ↓"; yoksa "=" öncesinden kırılır.
  const formulYer = () => {
    const ic = kutuW - 52, en = 0.6;
    const tek = metin.length * en * 64 <= ic;
    if (tek) return { satirlar: [metin.split(" ").filter(Boolean)], px: 64 };
    const parca = metin.includes(" · ") ? metin.split(" · ") : (() => { const i = metin.lastIndexOf(" = "); return i > 0 ? [metin.slice(0, i), metin.slice(i + 1)] : [metin]; })();
    if (parca.length !== 2) return yerlesim(metin, 64, en, 60, kutuW);
    const satirlar = parca.map((q) => q.split(" ").filter(Boolean));
    const uzun = Math.max(...parca.map((q) => q.length));
    return { satirlar, px: Math.min(60, ic / (uzun * en)) };
  };
  // opsiyonel elle satır sonu ("\n"): verilirse satırlar aynen alınır (EN yetim kırılımı için); yoksa eski otomatik akış
  const elle = metin.includes("\n") ? metin.split("\n").map((q) => q.split(" ").filter(Boolean)) : null;
  const elleEn = elle ? Math.max(...metin.split("\n").map((q) => q.length)) : 0;
  // K9 (iki dil): iddia da iki satıra düşerse " · " ayırıcısından kırılır (ayırıcı düşer) — EN "EUROPE → ASIA / ~3 km (2 mi)" satır başı "·" kalmaz
  const iddiaYer = () => {
    const ic = kutuW - 52, en = 0.52;
    const parca = metin.split(" · ");
    if (parca.length !== 2 || metin.length * en * 72 <= ic) return yerlesim(metin, 72, en, 64, kutuW);
    const uzun = Math.max(...parca.map((q) => q.length));
    return { satirlar: parca.map((q) => q.split(" ").filter(Boolean)), px: Math.min(64, ic / (uzun * en)) };
  };
  const { satirlar, px } = elle ? { satirlar: elle, px: Math.min(formul ? 60 : 64, (kutuW - 52) / (elleEn * (formul ? 0.6 : 0.52))) } : formul ? formulYer() : iddiaYer();
  const tum = satirlar.flat();
  const vi = formul ? -1 : vurguIndeks(tum, vurgu, dil);
  let j = 0;
  return (
    <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: bant === "ust" ? "flex-start" : "flex-end", padding: bant === "ust" ? `${YAZI.ustY + 6}px ${YAZI.yan}px 0 ${sol}px` : `0 ${YAZI.yan}px ${1920 - YAZI.altAlt}px ${sol}px` }}>
      <Serit padY={satirlar.length > 1 ? 6 : 8} maxW={kutuW}>
        <div lang={dil} style={{ fontFamily: formul ? mono : serif, fontWeight: formul ? 500 : 900, fontSize: px, lineHeight: 1.04, letterSpacing: formul ? "0.04em" : undefined, color: MUREKKEP, whiteSpace: "nowrap" }}>
          {satirlar.map((s, si) => (
            <div key={si}>{s.map((w, wi) => { const i = j++; return <span key={wi} style={{ color: i === vi ? KIRMIZI_KAGIT : undefined }}>{w}{wi < s.length - 1 ? " " : ""}</span>; })}</div>
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
// Kutu genişliği/punto en uzun hâlden (son sayı ya da dönüş metni) hesaplanır → sayarken boyut değişmez.
// Teknik fikir: claude-animation-skills graph/template (count-up, toLocaleString) — MIT, © 2026 Artem Novitckii.
export const KitSayac: React.FC<{ sablon: string; deger: string; enUzun: string; donus?: string; donusT?: number; vurgu?: boolean; bant?: "ust" | "alt"; dil?: string }> = ({ sablon, deger, enUzun, donus, donusT = 0, vurgu, bant = "ust", dil = "tr" }) => {
  const ic = YAZI.kutuW - 52, en = 0.7; // Playfair 900 BÜYÜK harf ≈ 0.68 em (0.6 EN 'TWO MILLION PEOPLE'yi kesiyordu)
  const px = Math.min(72, ic / Math.max(1, enUzun.length * en));
  const w = Math.min(YAZI.kutuW, enUzun.length * en * px + 52);
  const parca = sablon.split("{n}");
  const satir = (icerik: React.ReactNode, y: number, op: number) => (
    <div style={{ position: "absolute", left: 26, right: 0, top: 6, transform: `translateY(${y}px)`, opacity: op, whiteSpace: "nowrap" }}>{icerik}</div>
  );
  const sayi = <>{parca[0]}<span style={{ color: vurgu ? KIRMIZI_KAGIT : undefined }}>{deger}</span>{parca.slice(1).join("{n}")}</>;
  const t = Math.max(0, Math.min(1, donusT));
  return (
    <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: bant === "ust" ? "flex-start" : "flex-end", padding: bant === "ust" ? `${YAZI.ustY + 6}px ${YAZI.yan}px 0` : `0 ${YAZI.yan}px ${1920 - YAZI.altAlt}px` }}>
      <div style={{ position: "relative", width: w, height: px * 1.04 + 18, overflow: "hidden", background: KAGIT, borderTop: `2px solid ${MUREKKEP}`, borderBottom: `2px solid ${MUREKKEP}`, boxShadow: "0 3px 0 rgba(20,17,13,0.35)" }}>
        <div lang={dil} style={{ fontFamily: serif, fontWeight: 900, fontSize: px, lineHeight: 1.04, color: MUREKKEP, fontVariantNumeric: "tabular-nums lining-nums" }}>
          {satir(sayi, -t * px * 1.1, 1 - t)}
          {donus && t > 0 && satir(<span style={{ color: vurgu ? KIRMIZI_KAGIT : undefined }}>{donus}</span>, (1 - t) * px * 1.1, t)}
        </div>
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
