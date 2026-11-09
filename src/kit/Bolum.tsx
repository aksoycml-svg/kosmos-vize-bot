// ===== Bolum: bolum.json → Sequence'ler (SET KİTİ K1) =====
// Kompozisyon "Bolum": props { yol: "blanc-kardesler/bolum.ornek.json", guvenli?: boolean, bolum?: BolumJson (yol yerine satır içi) }.
// JSON'lar bundle'a webpack require.context ile girer: bolumler/**/bolum*.json (yeni bölüm = yeni dosya, kod yok).
import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { ArsivKatmani } from "../doku/ArsivKatmani";
import { GuvenliAlan, KilitNokta } from "../doku/GuvenliAlan";
import { IsimEtiketi } from "../components/EkranYazisi";
import { KitEkranYazisi, KitHaritaEtiketi, KitReplik } from "./yazi";
import { anaDil, Dil, ekranCoz, etiketCoz, haritaCoz, replikCoz } from "./dil";
import type { BolumJson, Plan, PlanSes } from "./tipler";
import { SABLONLAR } from "./sablonlar";
import { CIKIS, cl, ekranNokta, GIRIS, kameraHesapla } from "./zaman";
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
export type BolumMod = "gorsel" | "yazi" | "tam";
export type BolumProps = { yol?: string; bolum?: BolumJson; guvenli?: boolean; foley?: string; miks?: string; sesSure?: Record<string, number>; katman?: "anlatim" | "foley" | "muzik"; mod?: BolumMod; dil?: Dil };
// mod (K9, iki dil): "gorsel" yazısız görüntü (+ses) · "yazi" yalnız yazı katmanı, ŞEFFAF zemin, sessiz (ProRes 4444 / PNG dizi) · "tam" görüntü + yazı.
//   Verilmezse: gorsel_yazisiz ? "gorsel" : "tam" (eski davranış). dil: yazı + anlatım dili (varsayılan bolum.dil ?? "tr").
// katman: yalnız o ses katmanı çalınır (Premiere ses kanalı dışa aktarımı için, --codec=wav); verilmezse tam bölüm (varsayılan değişmez).

export const bolumMetadata: CalculateMetadataFunction<BolumProps> = async ({ props }) => {
  const b = bolumYukle(props.yol, props.bolum);
  const durationInFrames = Math.max(1, b.planlar.reduce((s, p) => s + p.sure_kare, 0));
  const sesSure = miksYukle(props.yol, props.miks)?.muzik ? await sesSureleri(b.planlar.flatMap((p) => (p.ses ?? []).map((s) => s.dosya))) : {};
  return { durationInFrames, fps: 60, props: { ...props, sesSure } };
};

// ---- yazı katmanı: ekran yazısı (iddia/formül), replik altyazısı, isim etiketi, harita etiketi — seçilen dilde (src/kit/dil.ts) ----
const Giris: React.FC<{ p: number; bas: number; children: React.ReactNode }> = ({ p, bas, children }) => {
  const t = interpolate(p, [bas, bas + 14], [0, 1], { ...cl, easing: GIRIS });
  return <AbsoluteFill style={{ opacity: t, transform: `translateY(${(1 - t) * 18}px)` }}>{children}</AbsoluteFill>;
};
const YaziKatmani: React.FC<{ plan: Plan; p: number; dil: Dil; ana: Dil }> = ({ plan, p, dil, ana }) => (
  <>
    {ekranCoz(plan, dil, ana).map((y, i) => {
      if (p < y.bas || p >= y.bit) return null;
      // K2 yazı standardı: kâğıt şerit + Playfair, tek vurgu kelimesi (kagitSerit/boyut alanları yok sayılır — geri uyum için şemada)
      return <Giris key={`y${i}`} p={p} bas={y.bas}><KitEkranYazisi metin={y.metin} vurgu={y.vurgu} tur={y.tur} bant={y.bant} dil={dil} kutuX={y.kutu?.x} /></Giris>;
    })}
    {replikCoz(plan, dil, ana).map((r, i) => {
      if (p < r.bas || p >= r.bit) return null;
      const okunan = r.kelimeKare ? r.kelimeKare.reduce((a, k, j) => (p >= k ? j : a), -1) : -1;
      return <Giris key={`r${i}`} p={p} bas={r.bas}><KitReplik metin={r.metin} kim={r.kim} vurgu={r.vurgu} bant={r.bant} okunan={okunan} dil={dil} /></Giris>;
    })}
  </>
);

// harita etiketleri: dekor koordinatı → ekran, görüntüyle AYNI kamera fonksiyonu (kameraHesapla + ekranNokta; plan içi kesmede etkin plan kamerası)
const HaritaEtiketleri: React.FC<{ ham: Plan; p: number; dil: Dil; ana: Dil }> = ({ ham, p, dil, ana }) => {
  const ets = haritaCoz(ham, dil, ana);
  if (!ets.length) return null;
  const k = kameraHesapla(etkinPlan(ham, p).kamera, p);
  return <>{ets.map((h, i) => {
    if (p < h.bas || p >= h.bit) return null;
    // giriş GIRIS 14 kare, çıkış hızlı (CIKIS, 8 kare)
    const t = Math.min(interpolate(p, [h.bas, h.bas + 14], [0, 1], { ...cl, easing: GIRIS }), 1 - interpolate(p, [h.bit - 8, h.bit], [0, 1], { ...cl, easing: CIKIS }));
    return <KitHaritaEtiketi key={i} metin={h.metin} kutu={ekranNokta(k, h.kutu)} nokta={ekranNokta(k, h.nokta)} t={t} dil={dil} />;
  })}</>;
};

// etiket: karakterin başının üstünde (Sahne'nin kilit listesindeki "<kim> yüz" noktasından)
const Etiketler: React.FC<{ plan: Plan; p: number; kilit: KilitNokta[]; dil: Dil; ana: Dil }> = ({ plan, p, kilit, dil, ana }) => (
  <>
    {(() => {
      const ets = (plan.karakterler ?? []).map((c) => ({ c, yuz: kilit.find((q) => q.ad === `${c.kim} yüz`) })).filter(({ c, yuz }) => c.etiket && yuz && p >= (c.etiket.bas ?? 0) && p < (c.etiket.bit ?? plan.sure_kare));
      const orta = ets.reduce((s, e) => s + e.yuz!.p[0], 0) / Math.max(1, ets.length);
      return ets.map(({ c, yuz }, i) => {
        // birden çok etiket: ortanın solundaki karakterin etiketi solda, sağdakinin sağda (yüzü ve diğer karakteri örtmez)
        const solda = ets.length > 1 ? yuz!.p[0] <= orta : yuz!.p[0] > 540;
        const W = 350, x = solda ? Math.max(80 + W, yuz!.p[0] - 30) : Math.min(1000 - W, yuz!.p[0] + 30);
        const e = etiketCoz(c.etiket! as Parameters<typeof etiketCoz>[0], dil, ana, `${plan.id} ${c.kim}.etiket`);
        return <IsimEtiketi key={i} ad={e.ad} alt={e.alt} sekme="#b8862b" x={x} y={Math.max(430, yuz!.p[1] - 330)} hedef={[yuz!.p[0], yuz!.p[1] - 150]} hiza={solda ? "sag" : "sol"} W={W} />;
      });
    })()}
  </>
);

// GuvenliAlan, Sahne'nin render sırasında doldurduğu kilit listesini okur (aynı geçişte, Sahne'den SONRA render edilir)
const KilitBindirme: React.FC<{ plan: Plan; p: number; kilit: KilitNokta[]; dil: Dil; ana: Dil }> = ({ plan, p, kilit, dil, ana }) => {
  const hepsi = [...ekranCoz(plan, dil, ana), ...replikCoz(plan, dil, ana)];
  const ust = hepsi.some((y) => y.bant === "ust" && p >= y.bas && p < y.bit);
  const alt = hepsi.some((y) => y.bant === "alt" && p >= y.bas && p < y.bit);
  return <GuvenliAlan noktalar={kilit} aktifBant={alt ? "alt" : ust ? "ust" : null} baslik={`${plan.id} ${plan.sablon} p${p} ${dil}`} />;
};

// K5 plan içi kesme: devam_plan.kare_bas'tan itibaren görüntü devam şablonundan (aynı plan karesi p; ses/yazı/temas planın kendisinde)
export const etkinPlan = (plan: Plan, p: number): Plan => {
  const d = plan.devam_plan;
  if (!d || p < d.kare_bas) return plan;
  return { ...plan, sablon: d.sablon, parametreler: d.parametreler, kamera: d.kamera, karakterler: d.karakterler ?? [], props: d.props ?? [], el: [] };
};

// mod: "gorsel" = yazısız görüntü · "yazi" = yalnız yazı katmanı (şeffaf zemin; ekran yazısı, replik, isim/harita etiketi) · "tam" = ikisi
const PlanGoster: React.FC<{ plan: Plan; guvenli?: boolean; mod: BolumMod; dil: Dil; ana: Dil; onceki?: Plan }> = ({ plan: ham, guvenli, mod, dil, ana, onceki }) => {
  const p = useCurrentFrame();
  const plan = etkinPlan(ham, p);
  const S = SABLONLAR[plan.sablon];
  if (!S) throw new Error(`[Bolum] bilinmeyen şablon: ${plan.sablon}`);
  const kilit: KilitNokta[] = [];
  const sahne = <AbsoluteFill><S.Sahne plan={plan} p={p} kilit={kilit} onceki={plan === ham ? onceki : undefined} /></AbsoluteFill>;
  const gorsel = mod !== "yazi", yazi = mod !== "gorsel";
  // yazı modunda isim etiketi yüz noktasına muhtaç: Sahne yalnız kilit için GİZLİ render edilir (boyanmaz); etiket yoksa hiç render edilmez
  const kilitGerek = yazi && !gorsel && (plan.karakterler ?? []).some((c) => c.etiket);
  return (
    <AbsoluteFill style={{ backgroundColor: gorsel ? "#14110d" : undefined }}>
      {gorsel && (S.arsivAtla?.(plan, p) ? sahne : <ArsivKatmani mod={S.arsiv(plan)}>{sahne}</ArsivKatmani>)}
      {kilitGerek && <div style={{ display: "none" }}>{sahne}</div>}
      {yazi && <HaritaEtiketleri ham={ham} p={p} dil={dil} ana={ana} />}
      {yazi && <Etiketler plan={plan} p={p} kilit={kilit} dil={dil} ana={ana} />}
      {yazi && <YaziKatmani plan={ham} p={p} dil={dil} ana={ana} />}
      {guvenli && gorsel && <KilitBindirme plan={ham} p={p} kilit={kilit} dil={dil} ana={ana} />}
    </AbsoluteFill>
  );
};

// plan sesleri: plan Sequence'i içinde kendi karesinden başlar; plan bitince kesilir (taşma doğrulayıcıda uyarı)
const PlanSesleri: React.FC<{ plan: Plan; dil: Dil; ana: Dil }> = ({ plan, dil, ana }) => {
  const liste = dil === ana ? plan.ses : (plan as unknown as Record<string, PlanSes[] | undefined>)[`ses_${dil}`];
  if (dil !== ana && plan.ses?.length && !liste) throw new Error(`[Bolum] ${plan.id}: ses_${dil} yok`);
  return (
  <>
    {(liste ?? []).map((s, i) => (
      <Sequence key={`ses${i}`} from={s.kare} layout="none" name={`ses ${s.dosya}`}>
        <Audio src={staticFile(s.dosya)} volume={Math.pow(10, (s.db ?? 0) / 20)} />
      </Sequence>
    ))}
  </>
  );
};

export const Bolum: React.FC<BolumProps> = ({ yol, bolum, guvenli, foley, miks, sesSure, katman, mod: modP, dil: dilP }) => {
  const b = bolumYukle(yol, bolum);
  const ana = anaDil(b), dil: Dil = dilP ?? ana;
  const mod: BolumMod = modP ?? (b.gorsel_yazisiz ? "gorsel" : "tam");
  const ses = mod !== "yazi"; // yazı katmanı sessiz
  const fj = foleyYukle(yol, foley), mj = miksYukle(yol, miks);
  const toplam = b.planlar.reduce((s, p) => s + p.sure_kare, 0);
  let bas = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: mod === "yazi" ? undefined : "#14110d" }}>
      {b.planlar.map((plan, i) => {
        const from = bas; bas += plan.sure_kare;
        return <Sequence key={plan.id} from={from} durationInFrames={plan.sure_kare} name={`${plan.id} · ${plan.sablon}`}>{!katman && <PlanGoster plan={plan} guvenli={guvenli} mod={mod} dil={dil} ana={ana} onceki={i > 0 ? b.planlar[i - 1] : undefined} />}{ses && (!katman || katman === "anlatim") && <PlanSesleri plan={plan} dil={dil} ana={ana} />}</Sequence>;
      })}
      {ses && (!katman || katman === "foley") && <FoleyKatmani b={b} foley={fj} miks={mj} fps={60} />}
      {ses && (!katman || katman === "muzik") && <MuzikKatmani miks={mj} toplam={toplam} anlatim={anlatimAraliklari(b, sesSure, 60)} />}
    </AbsoluteFill>
  );
};
