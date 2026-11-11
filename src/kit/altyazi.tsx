// ===== KT-1 Kelime kelime altyazı (yazı katmanı, dil başına) =====
// Teknik fikir: claude-animation-skills (MIT, © 2026 Artem Novitckii) stick-figure captions — 1–3 kelimelik parçalar, noktalama
// sonrası kır, parça sonu = sonraki parça başı (boşluk < 0.5 sn) ya da kelime sonu + 0.25 sn; kısa "pop" girişi.
// Bizim dil: Playfair 900 (src/theme.ts), kâğıt rengi dolgu + mürekkep kontur + yumuşak gölge; bantlar CLAUDE.md'den.
// Kelime zamanları: plan `ses`/`ses_<dil>` dosyasının yanındaki .json (`words: [{t, s, e}]`, sn; ses_kenar düzeltmesi zaten işli).
import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { serif } from "../theme";
import type { KilitNokta } from "../doku/GuvenliAlan";
import type { AltyaziAyar, BolumJson, Plan, PlanSes } from "./tipler";
import { Dil, ekranCoz, replikCoz } from "./dil";
import { vurguIndeks, YAZI } from "./yazi";
import { GIRIS, cl } from "./zaman";

export type Kelime = { t: string; s: number; e: number };
export type KelimeHarita = Record<string, Kelime[]>; // ses dosyası (public/'den göreli mp3) → kelimeler
export type AltyaziGrup = { metin: string; ham: string; bas: number; bit: number; vurguSes: string[] };

export const altyaziAyar = (plan: Plan, b: BolumJson): AltyaziAyar | null => {
  if (plan.altyazi === false) return null;
  const a = { ...(b.altyazi ?? {}), ...(plan.altyazi ?? {}) };
  return a.acik ? a : null;
};
export const altyaziVarMi = (b: BolumJson) => b.planlar.some((p) => altyaziAyar(p, b));
export const sesListesi = (plan: Plan, dil: Dil, ana: Dil): PlanSes[] =>
  (dil === ana ? plan.ses : (plan as unknown as Record<string, PlanSes[] | undefined>)[`ses_${dil}`]) ?? [];
export const kelimeYolu = (mp3: string) => mp3.replace(/\.[a-z0-9]+$/i, ".json");

// Ses metnindeki BÜYÜK HARF kelimeler (eleven_v3 vurgu işareti: "KESTİ.", "İKİ MİLYON…") ekranda normal yazılır:
// cümle başıysa ilk harf büyük, değilse küçük. Bu kelimeler `vurgu_ses: true` ile vurgu adayıdır (grupta tek kelime kırmızı).
const buyukMu = (w: string) => { const h = w.replace(/[^\p{L}]/gu, ""); return h.length >= 2 && h === h.toLocaleUpperCase("tr") && h !== h.toLocaleLowerCase("tr"); };
const sesDuzelt = (W: Kelime[], dil: Dil) => {
  const loc = dil === "tr" ? "tr" : "en";
  return W.map((w, i) => {
    if (!buyukMu(w.t)) return { ...w, vurgu: false };
    const bas = i === 0 || /[.?!…]["'\u201d\u2019)]*$/.test(W[i - 1].t);
    const k = w.t.toLocaleLowerCase(loc);
    return { ...w, t: bas ? k.replace(/\p{L}/u, (c) => c.toLocaleUpperCase(loc)) : k, vurgu: true };
  });
};

// noktalamasız: harf/rakam/%; kelime içi kesme işareti (Tours'taydı) korunur; tire boşluk olur
const temizle = (s: string, a: AltyaziAyar, dil: Dil) => {
  let q = s;
  if (a.noktalamasiz) q = q.replace(/[-–—]/g, " ").replace(/(\p{L})['’](\p{L})/gu, "$1’$2").replace(/[^\p{L}\p{N}%’ ]/gu, "").replace(/\s+/g, " ").trim();
  if (a.kucuk) q = q.toLocaleLowerCase(dil === "tr" ? "tr" : "en");
  return q;
};

export const altyaziGruplari = (plan: Plan, a: AltyaziAyar, sesler: PlanSes[], kh: KelimeHarita, dil: Dil): AltyaziGrup[] => {
  const G: AltyaziGrup[] = [];
  const grup = a.grup ?? 2, maks = a.maks_harf ?? 14;
  for (const s of sesler) {
    if (!kh[s.dosya]) continue;
    const W = sesDuzelt(kh[s.dosya], dil);
    type Ks = (typeof W)[number];
    let cur: { w: Ks[]; ham: string } | null = null;
    const ham: { w: Ks[]; ham: string }[] = [];
    W.forEach((w, i) => {
      const onceki = W[i - 1];
      const kir = !cur || cur.w.length >= grup || (cur.ham + " " + w.t).length > maks || /[.,;:?!…]["'”’)]*$/.test(onceki?.t ?? "");
      if (kir) { cur = { w: [w], ham: w.t }; ham.push(cur); } else { cur!.w.push(w); cur!.ham += " " + w.t; }
    });
    ham.forEach((c, i) => {
      const bas = s.kare + Math.round(c.w[0].s * 60);
      const son = c.w[c.w.length - 1].e, n = ham[i + 1];
      const bitS = n && n.w[0].s - son < 0.5 ? n.w[0].s : son + 0.25;
      G.push({ metin: temizle(c.ham, a, dil), ham: c.ham, vurguSes: c.w.filter((w) => w.vurgu).map((w) => temizle(w.t, { ...a, kucuk: true, noktalamasiz: true }, dil)), bas, bit: Math.min(plan.sure_kare, s.kare + Math.round(bitS * 60)) });
    });
  }
  return G;
};

// Bant seçimi (öncelik): replik > ekran yazısı > altyazı. Altyazı alt bantta (y 1290–1490); alt bantta ayak/temas/dokunuş/kurulum
// kilidi ya da alt bant ekran yazısı varsa üst banda çıkar; gittiği bantta ekran yazısı varsa öteki banda, o da doluysa GÖSTERİLMEZ.
const ALT_KILIT = (k: KilitNokta) => k.tur !== "yuz" && k.tur !== "yazi" && k.p[1] > YAZI.altY - 20 && k.p[1] < YAZI.altAlt + 20;
export const altyaziBant = (plan: Plan, a: AltyaziAyar, p: number, kilit: KilitNokta[], dil: Dil, ana: Dil): "ust" | "alt" | null => {
  if (replikCoz(plan, dil, ana).some((r) => p >= r.bas && p < r.bit)) return null;
  const ek = ekranCoz(plan, dil, ana).filter((y) => p >= y.bas && p < y.bit);
  const dolu = { ust: ek.some((y) => y.bant === "ust"), alt: ek.some((y) => y.bant === "alt") || kilit.some(ALT_KILIT) };
  const tercih = a.bant === "ust" ? "ust" : "alt";
  if (!dolu[tercih]) return tercih;
  const obur = tercih === "alt" ? "ust" : "alt";
  if (a.bant === "oto" || a.bant === undefined) return dolu[obur] ? null : obur;
  return null; // bant elle sabitlendi ve dolu
};

const KAGIT = "#f3ead6", MUREKKEP = "#1c1915", KIRMIZI = "#e5483c";
export const KitAltyazi: React.FC<{ g: AltyaziGrup; p: number; bant: "ust" | "alt"; a: AltyaziAyar; vurgu?: string[]; dil: Dil }> = ({ g, p, bant, a, vurgu, dil }) => {
  const t = GIRIS(interpolate(p, [g.bas, g.bas + 6], [0, 1], cl));
  const cik = interpolate(p, [g.bit - 3, g.bit], [1, 0], cl); // hızlı çıkış (3 kare)
  const k = g.metin.split(" ").filter(Boolean);
  const vi = vurguIndeks(k, vurgu, dil);
  const px = Math.min(a.boyut ?? 84, (YAZI.kutuW - 40) / Math.max(1, g.metin.length * 0.6));
  const merkezY = bant === "alt" ? (YAZI.altY + YAZI.altAlt) / 2 : (YAZI.ustY + YAZI.ustAlt) / 2;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div lang={dil} style={{ position: "absolute", left: YAZI.yan, right: YAZI.yan, top: merkezY - px * 0.62, textAlign: "center", whiteSpace: "nowrap",
        fontFamily: serif, fontWeight: 900, fontSize: px, lineHeight: 1.2, color: KAGIT, opacity: Math.min(t * 1.5, cik),
        transform: `scale(${0.86 + 0.14 * t})`, transformOrigin: "50% 50%",
        WebkitTextStroke: `${Math.round(px * 0.16)}px ${MUREKKEP}`, paintOrder: "stroke fill", textShadow: "0 5px 16px rgba(20,17,13,0.6)" }}>
        {k.map((w, i) => <span key={i} style={{ color: i === vi ? KIRMIZI : undefined }}>{w}{i < k.length - 1 ? " " : ""}</span>)}
      </div>
    </AbsoluteFill>
  );
};
