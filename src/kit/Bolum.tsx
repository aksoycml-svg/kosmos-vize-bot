// ===== Bolum: bolum.json → Sequence'ler (SET KİTİ K1) =====
// Kompozisyon "Bolum": props { yol: "blanc-kardesler/bolum.ornek.json", guvenli?: boolean, bolum?: BolumJson (yol yerine satır içi) }.
// JSON'lar bundle'a webpack require.context ile girer: bolumler/**/bolum*.json (yeni bölüm = yeni dosya, kod yok).
import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { ArsivKatmani } from "../doku/ArsivKatmani";
import { GuvenliAlan, KilitNokta } from "../doku/GuvenliAlan";
import { IsimEtiketi } from "../components/EkranYazisi";
import { KitEkranYazisi, KitReplik } from "./yazi";
import type { BolumJson, Plan } from "./tipler";
import { SABLONLAR } from "./sablonlar";
import { cl, GIRIS } from "./zaman";
import { anlatimAraliklari, FoleyKatmani, foleyYukle, miksYukle, MuzikKatmani, sesSureleri } from "./ses";

const ctx = require.context("../../bolumler", true, /bolum[^/]*\.json$/);
export const BOLUM_YOLLARI: string[] = ctx.keys().map((k) => k.replace(/^\.\//, ""));
export const bolumYukle = (yol?: string, bolum?: BolumJson): BolumJson => {
  if (bolum) return bolum;
  const key = `./${yol}`;
  if (!yol || !ctx.keys().includes(key)) throw new Error(`[Bolum] json bulunamadı: ${yol} (mevcut: ${BOLUM_YOLLARI.join(", ")})`);
  return ctx(key) as BolumJson;
};

// foley/miks: bolumler/'den göreli json yolu; verilmezse bolum json'unun klasöründeki foley.json/miks.json (yoksa sessiz).
// sesSure: calculateMetadata'nın doldurduğu anlatım süreleri (müzik duck'ı için; elle verilmez).
export type BolumProps = { yol?: string; bolum?: BolumJson; guvenli?: boolean; foley?: string; miks?: string; sesSure?: Record<string, number>; katman?: "anlatim" | "foley" | "muzik" };
// katman: yalnız o ses katmanı çalınır (Premiere ses kanalı dışa aktarımı için, --codec=wav); verilmezse tam bölüm (varsayılan değişmez).

export const bolumMetadata: CalculateMetadataFunction<BolumProps> = async ({ props }) => {
  const b = bolumYukle(props.yol, props.bolum);
  const durationInFrames = Math.max(1, b.planlar.reduce((s, p) => s + p.sure_kare, 0));
  const sesSure = miksYukle(props.yol, props.miks)?.muzik ? await sesSureleri(b.planlar.flatMap((p) => (p.ses ?? []).map((s) => s.dosya))) : {};
  return { durationInFrames, fps: 60, props: { ...props, sesSure } };
};

// ---- yazı katmanı: ekran yazısı (iddia/formül), replik altyazısı, isim etiketi ----
const Giris: React.FC<{ p: number; bas: number; children: React.ReactNode }> = ({ p, bas, children }) => {
  const t = interpolate(p, [bas, bas + 14], [0, 1], { ...cl, easing: GIRIS });
  return <AbsoluteFill style={{ opacity: t, transform: `translateY(${(1 - t) * 18}px)` }}>{children}</AbsoluteFill>;
};
const YaziKatmani: React.FC<{ plan: Plan; p: number }> = ({ plan, p }) => (
  <>
    {(plan.ekran_yazisi ?? []).map((y, i) => {
      const bas = y.bas ?? 0, bit = y.bit ?? plan.sure_kare;
      if (p < bas || p >= bit) return null;
      // K2 yazı standardı: kâğıt şerit + Playfair, tek vurgu kelimesi (kagitSerit/boyut alanları yok sayılır — geri uyum için şemada)
      return <Giris key={`y${i}`} p={p} bas={bas}><KitEkranYazisi metin={y.metin} vurgu={y.vurgu} tur={y.tur} bant={y.bant} /></Giris>;
    })}
    {(plan.replik ?? []).map((r, i) => {
      if (p < r.bas || p >= r.bit) return null;
      const okunan = r.kelimeKare ? r.kelimeKare.reduce((a, k, j) => (p >= k ? j : a), -1) : -1;
      return <Giris key={`r${i}`} p={p} bas={r.bas}><KitReplik metin={r.metin} kim={r.kim} vurgu={r.vurgu} bant={r.bant} okunan={okunan} /></Giris>;
    })}
  </>
);

// etiket: karakterin başının üstünde (Sahne'nin kilit listesindeki "<kim> yüz" noktasından)
const Etiketler: React.FC<{ plan: Plan; p: number; kilit: KilitNokta[] }> = ({ plan, p, kilit }) => (
  <>
    {(() => {
      const ets = (plan.karakterler ?? []).map((c) => ({ c, yuz: kilit.find((q) => q.ad === `${c.kim} yüz`) })).filter(({ c, yuz }) => c.etiket && yuz && p >= (c.etiket.bas ?? 0) && p < (c.etiket.bit ?? plan.sure_kare));
      const orta = ets.reduce((s, e) => s + e.yuz!.p[0], 0) / Math.max(1, ets.length);
      return ets.map(({ c, yuz }, i) => {
        // birden çok etiket: ortanın solundaki karakterin etiketi solda, sağdakinin sağda (yüzü ve diğer karakteri örtmez)
        const solda = ets.length > 1 ? yuz!.p[0] <= orta : yuz!.p[0] > 540;
        const W = 350, x = solda ? Math.max(80 + W, yuz!.p[0] - 30) : Math.min(1000 - W, yuz!.p[0] + 30);
        return <IsimEtiketi key={i} ad={c.etiket!.ad} alt={c.etiket!.alt} sekme="#b8862b" x={x} y={Math.max(430, yuz!.p[1] - 330)} hedef={[yuz!.p[0], yuz!.p[1] - 150]} hiza={solda ? "sag" : "sol"} W={W} />;
      });
    })()}
  </>
);

// GuvenliAlan, Sahne'nin render sırasında doldurduğu kilit listesini okur (aynı geçişte, Sahne'den SONRA render edilir)
const KilitBindirme: React.FC<{ plan: Plan; p: number; kilit: KilitNokta[] }> = ({ plan, p, kilit }) => {
  const ust = [...(plan.ekran_yazisi ?? []), ...(plan.replik ?? [])].some((y) => y.bant === "ust" && p >= (y.bas ?? 0) && p < (y.bit ?? plan.sure_kare));
  const alt = [...(plan.ekran_yazisi ?? []), ...(plan.replik ?? [])].some((y) => y.bant === "alt" && p >= (y.bas ?? 0) && p < (y.bit ?? plan.sure_kare));
  return <GuvenliAlan noktalar={kilit} aktifBant={alt ? "alt" : ust ? "ust" : null} baslik={`${plan.id} ${plan.sablon} p${p}`} />;
};

// K5 plan içi kesme: devam_plan.kare_bas'tan itibaren görüntü devam şablonundan (aynı plan karesi p; ses/yazı/temas planın kendisinde)
export const etkinPlan = (plan: Plan, p: number): Plan => {
  const d = plan.devam_plan;
  if (!d || p < d.kare_bas) return plan;
  return { ...plan, sablon: d.sablon, parametreler: d.parametreler, kamera: d.kamera, karakterler: d.karakterler ?? [], props: d.props ?? [], el: [] };
};

const PlanGoster: React.FC<{ plan: Plan; guvenli?: boolean; yazisiz?: boolean; onceki?: Plan }> = ({ plan: ham, guvenli, yazisiz, onceki }) => {
  const p = useCurrentFrame();
  const plan = etkinPlan(ham, p);
  const S = SABLONLAR[plan.sablon];
  if (!S) throw new Error(`[Bolum] bilinmeyen şablon: ${plan.sablon}`);
  const kilit: KilitNokta[] = [];
  const sahne = <AbsoluteFill><S.Sahne plan={plan} p={p} kilit={kilit} onceki={plan === ham ? onceki : undefined} /></AbsoluteFill>;
  return (
    <AbsoluteFill style={{ backgroundColor: "#14110d" }}>
      {S.arsivAtla?.(plan, p) ? sahne : <ArsivKatmani mod={S.arsiv(plan)}>{sahne}</ArsivKatmani>}
      {/* gorsel_yazisiz (iki dil): görüntüde yazı/etiket yok — dil başına ayrı şeffaf katman (KE-Y, sonraki aşama) */}
      {!yazisiz && <Etiketler plan={plan} p={p} kilit={kilit} />}
      {!yazisiz && <YaziKatmani plan={plan} p={p} />}
      {guvenli && <KilitBindirme plan={plan} p={p} kilit={kilit} />}
    </AbsoluteFill>
  );
};

// plan sesleri: plan Sequence'i içinde kendi karesinden başlar; plan bitince kesilir (taşma doğrulayıcıda uyarı)
const PlanSesleri: React.FC<{ plan: Plan }> = ({ plan }) => (
  <>
    {(plan.ses ?? []).map((s, i) => (
      <Sequence key={`ses${i}`} from={s.kare} layout="none" name={`ses ${s.dosya}`}>
        <Audio src={staticFile(s.dosya)} volume={Math.pow(10, (s.db ?? 0) / 20)} />
      </Sequence>
    ))}
  </>
);

export const Bolum: React.FC<BolumProps> = ({ yol, bolum, guvenli, foley, miks, sesSure, katman }) => {
  const b = bolumYukle(yol, bolum);
  const fj = foleyYukle(yol, foley), mj = miksYukle(yol, miks);
  const toplam = b.planlar.reduce((s, p) => s + p.sure_kare, 0);
  let bas = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#14110d" }}>
      {b.planlar.map((plan, i) => {
        const from = bas; bas += plan.sure_kare;
        return <Sequence key={plan.id} from={from} durationInFrames={plan.sure_kare} name={`${plan.id} · ${plan.sablon}`}>{!katman && <PlanGoster plan={plan} guvenli={guvenli} yazisiz={!!b.gorsel_yazisiz} onceki={i > 0 ? b.planlar[i - 1] : undefined} />}{(!katman || katman === "anlatim") && <PlanSesleri plan={plan} />}</Sequence>;
      })}
      {(!katman || katman === "foley") && <FoleyKatmani b={b} foley={fj} miks={mj} fps={60} />}
      {(!katman || katman === "muzik") && <MuzikKatmani miks={mj} toplam={toplam} anlatim={anlatimAraliklari(b, sesSure, 60)} />}
    </AbsoluteFill>
  );
};
