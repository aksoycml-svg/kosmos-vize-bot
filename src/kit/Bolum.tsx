// ===== Bolum: bolum.json → Sequence'ler (SET KİTİ K1) =====
// Kompozisyon "Bolum": props { yol: "blanc-kardesler/bolum.ornek.json", guvenli?: boolean, bolum?: BolumJson (yol yerine satır içi) }.
// JSON'lar bundle'a webpack require.context ile girer: bolumler/**/bolum*.json (yeni bölüm = yeni dosya, kod yok).
import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { ArsivKatmani } from "../doku/ArsivKatmani";
import { GuvenliAlan, KilitNokta } from "../doku/GuvenliAlan";
import { IsimEtiketi } from "../components/EkranYazisi";
import { KitEkranYazisi, KitHaritaEtiketi, KitHaritaKart, KitReplik, KitSayac } from "./yazi";
import { anaDil, Dil, ekranCoz, etiketCoz, haritaCoz, kartCoz, replikCoz, sayiBicim } from "./dil";
import type { BolumJson, Plan, PlanSes } from "./tipler";
import { altyaziAyar, altyaziBant, altyaziGruplari, altyaziVarMi, KelimeHarita, kelimeYolu, KitAltyazi, sesListesi } from "./altyazi";
import { DarbeKatmani, donusumNokta, SahneDonusum, sahneDonusum, SahneSarmal } from "./kameraDili";
import { haritaKamera, igneNokta } from "./sablonlar/Harita";
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
export type BolumProps = { yol?: string; bolum?: BolumJson; guvenli?: boolean; foley?: string; miks?: string; sesSure?: Record<string, number>; katman?: "anlatim" | "foley" | "muzik"; mod?: BolumMod; dil?: Dil;
  kelimeler?: KelimeHarita }; // KT-1: calculateMetadata doldurur (elle verilmez)
// mod (K9, iki dil): "gorsel" yazısız görüntü (+ses) · "yazi" yalnız yazı katmanı, ŞEFFAF zemin, sessiz (ProRes 4444 / PNG dizi) · "tam" görüntü + yazı.
//   Verilmezse: gorsel_yazisiz ? "gorsel" : "tam" (eski davranış). dil: yazı + anlatım dili (varsayılan bolum.dil ?? "tr").
// katman: yalnız o ses katmanı çalınır (Premiere ses kanalı dışa aktarımı için, --codec=wav); verilmezse tam bölüm (varsayılan değişmez).

export const bolumMetadata: CalculateMetadataFunction<BolumProps> = async ({ props }) => {
  const b = bolumYukle(props.yol, props.bolum);
  const durationInFrames = Math.max(1, b.planlar.reduce((s, p) => s + p.sure_kare, 0));
  const sesSure = miksYukle(props.yol, props.miks)?.muzik ? await sesSureleri(b.planlar.flatMap((p) => (p.ses ?? []).map((s) => s.dosya))) : {};
  // KT-1: altyazı açıksa, istenen dilin plan seslerinin kelime json'ları (mp3 yanındaki .json) okunur
  const kelimeler: KelimeHarita = {};
  if (altyaziVarMi(b)) {
    const ana = anaDil(b), dil: Dil = props.dil ?? ana;
    for (const pl of b.planlar) for (const s of altyaziAyar(pl, b) ? sesListesi(pl, dil, ana) : []) {
      const r = await fetch(staticFile(kelimeYolu(s.dosya)));
      if (!r.ok) throw new Error(`[Bolum] ${pl.id}: altyazı kelime json'u yok: ${kelimeYolu(s.dosya)}`);
      kelimeler[s.dosya] = ((await r.json()).words ?? []) as KelimeHarita[string];
    }
  }
  return { durationInFrames, fps: 60, props: { ...props, sesSure, kelimeler } };
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
      if (y.tur === "sayac" && y.sayac) {
        // KT-4: sayaç — değer GIRIS eğrisiyle; dönüş metni varsa donus.kare'de 14 karede yer değiştirir
        const S = y.sayac, q = p - y.bas;
        const n = S.baslangic + (S.hedef - S.baslangic) * GIRIS(interpolate(q, [S.bas, S.bas + S.sure], [0, 1], cl));
        const fmt = (v: number) => sayiBicim(S.ondalik ? v : Math.round(v), dil, S.ondalik);
        const enUzun = [y.metin.replace("{n}", fmt(S.hedef)), S.donus?.metin ?? ""].reduce((a, b) => (b.length > a.length ? b : a));
        const dt = S.donus ? GIRIS(interpolate(q, [S.donus.kare, S.donus.kare + 14], [0, 1], cl)) : 0;
        return <Giris key={`y${i}`} p={p} bas={y.bas}><KitSayac sablon={y.metin} deger={fmt(n)} enUzun={enUzun} donus={S.donus?.metin} donusT={dt} vurgu={S.vurgu} bant={y.bant} dil={dil} /></Giris>;
      }
      // K2 yazı standardı: kâğıt şerit + Playfair, tek vurgu kelimesi (kagitSerit/boyut alanları yok sayılır — geri uyum için şemada)
      return <Giris key={`y${i}`} p={p} bas={y.bas}><KitEkranYazisi metin={y.metin} vurgu={y.vurgu} tur={y.tur === "sayac" ? "iddia" : y.tur} bant={y.bant} dil={dil} kutuX={y.kutu?.x} /></Giris>;
    })}
    {replikCoz(plan, dil, ana).map((r, i) => {
      if (p < r.bas || p >= r.bit) return null;
      const okunan = r.kelimeKare ? r.kelimeKare.reduce((a, k, j) => (p >= k ? j : a), -1) : -1;
      return <Giris key={`r${i}`} p={p} bas={r.bas}><KitReplik metin={r.metin} kim={r.kim} vurgu={r.vurgu} bant={r.bant} okunan={okunan} dil={dil} /></Giris>;
    })}
  </>
);

// harita etiketleri: dekor koordinatı → ekran, görüntüyle AYNI kamera fonksiyonu (kameraHesapla + ekranNokta; plan içi kesmede etkin plan kamerası)
// KT-2/3: HARITA'da rota takip kamerası (haritaKamera) + kamera dili/whip/darbe dönüşümü (donusumNokta) — etiket dekora yapışık kalır
const planKamera = (pl: Plan, p: number) => (pl.sablon === "HARITA" ? haritaKamera(pl, p) : kameraHesapla(pl.kamera, p));
const HaritaKartlari: React.FC<{ ham: Plan; p: number; dil: Dil; ana: Dil; d: SahneDonusum }> = ({ ham, p, dil, ana, d }) => {
  const ks = kartCoz(ham, dil, ana), pl = etkinPlan(ham, p), n = pl.sablon === "HARITA" ? igneNokta(pl) : null;
  if (!ks.length || !n) return null;
  const nokta = donusumNokta(d, ekranNokta(planKamera(pl, p), n));
  return <>{ks.map((c, i) => {
    if (p < c.bas || p >= c.bit) return null;
    const t = Math.min(interpolate(p, [c.bas, c.bas + 16], [0, 1], { ...cl, easing: GIRIS }), 1 - interpolate(p, [c.bit - 8, c.bit], [0, 1], { ...cl, easing: CIKIS }));
    return <KitHaritaKart key={i} metin={c.metin} alt={c.alt} nokta={nokta} t={t} yon={c.yon} dil={dil} />;
  })}</>;
};
const HaritaEtiketleri: React.FC<{ ham: Plan; p: number; dil: Dil; ana: Dil; d?: SahneDonusum }> = ({ ham, p, dil, ana, d }) => {
  const ets = haritaCoz(ham, dil, ana);
  if (!ets.length) return null;
  const k0 = planKamera(etkinPlan(ham, p), p);
  const k = k0;
  return <>{ets.map((h, i) => {
    if (p < h.bas || p >= h.bit) return null;
    // giriş GIRIS 14 kare, çıkış hızlı (CIKIS, 8 kare)
    const t = Math.min(interpolate(p, [h.bas, h.bas + 14], [0, 1], { ...cl, easing: GIRIS }), 1 - interpolate(p, [h.bit - 8, h.bit], [0, 1], { ...cl, easing: CIKIS }));
    const en = (q: [number, number]) => (d ? donusumNokta(d, ekranNokta(k, q)) : ekranNokta(k, q));
    return <KitHaritaEtiketi key={i} metin={h.metin} kutu={en(h.kutu)} nokta={en(h.nokta)} t={t} dil={dil} />;
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

// K5 plan içi kesme (+ Paris C: devam_plan.kesme_2 ikinci kesme): devam_plan.kare_bas'tan itibaren görüntü devam şablonundan (aynı plan karesi p; ses/yazı/temas planın kendisinde)
export const etkinPlan = (plan: Plan, p: number): Plan => {
  const d = plan.devam_plan;
  if (!d || p < d.kare_bas) return plan;
  const k2 = d.kesme_2;
  if (k2 && p >= k2.kare_bas) return { ...plan, sablon: k2.sablon ?? d.sablon, parametreler: k2.parametreler, kamera: k2.kamera ?? d.kamera, karakterler: [], props: [], el: [] };
  return { ...plan, sablon: d.sablon, parametreler: d.parametreler, kamera: d.kamera, karakterler: d.karakterler ?? [], props: d.props ?? [], el: [] };
};

// mod: "gorsel" = yazısız görüntü · "yazi" = yalnız yazı katmanı (şeffaf zemin; ekran yazısı, replik, isim/harita etiketi) · "tam" = ikisi
// KT-1 altyazı: kilit noktaları (Sahne'nin bu karede doldurduğu, sahne dönüşümüyle ekrana eşlenmiş) bant seçimine girer
const Altyazi: React.FC<{ ham: Plan; b: BolumJson; p: number; kilit: KilitNokta[]; d: SahneDonusum; dil: Dil; ana: Dil; kh?: KelimeHarita }> = ({ ham, b, p, kilit, d, dil, ana, kh }) => {
  const a = altyaziAyar(ham, b);
  if (!a || !kh) return null;
  const g = altyaziGruplari(ham, a, sesListesi(ham, dil, ana), kh, dil).find((q) => p >= q.bas && p < q.bit);
  if (!g) return null;
  const bant = altyaziBant(ham, a, p, kilit.map((k) => ({ ...k, p: donusumNokta(d, k.p) })), dil, ana);
  if (!bant) return null;
  const v = [...(a.vurgu ? (Array.isArray(a.vurgu) ? a.vurgu : a.vurgu[dil] ?? []) : []), ...(a.vurgu_ses ? g.vurguSes : [])];
  return <KitAltyazi g={g} p={p} bant={bant} a={a} vurgu={v} dil={dil} />;
};

const PlanGoster: React.FC<{ plan: Plan; guvenli?: boolean; mod: BolumMod; dil: Dil; ana: Dil; onceki?: Plan; b: BolumJson; kh?: KelimeHarita }> = ({ plan: ham, guvenli, mod, dil, ana, onceki, b, kh }) => {
  const p = useCurrentFrame();
  const plan = etkinPlan(ham, p);
  const S = SABLONLAR[plan.sablon];
  if (!S) throw new Error(`[Bolum] bilinmeyen şablon: ${plan.sablon}`);
  const kilit: KilitNokta[] = [];
  const sahne = <AbsoluteFill><S.Sahne plan={plan} p={p} kilit={kilit} onceki={plan === ham ? onceki : undefined} /></AbsoluteFill>;
  const gorsel = mod !== "yazi", yazi = mod !== "gorsel";
  // KT-2: kamera dili (itme + titreme) + darbe sarsıntısı + whip — yalnız görüntüye; yazı bantları sabit, dekora bağlı etiket aynı dönüşümle
  const darbeKendi = !!SABLONLAR[ham.sablon]?.darbeKendi; // şablon darbeyi kendi çizer → genel darbe + sarsıntı yok
  const d = sahneDonusum(darbeKendi ? { ...ham, darbe: undefined } : ham, p, onceki, b);
  const alt = yazi && !!altyaziAyar(ham, b);
  // yazı modunda isim etiketi / altyazı bant seçimi kilit noktasına muhtaç: Sahne yalnız kilit için GİZLİ render edilir (boyanmaz)
  const kilitGerek = yazi && !gorsel && ((plan.karakterler ?? []).some((c) => c.etiket) || alt);
  return (
    <AbsoluteFill style={{ backgroundColor: gorsel ? "#14110d" : undefined }}>
      {gorsel && <SahneSarmal d={d} id={ham.id}>{S.arsivAtla?.(plan, p) ? sahne : <ArsivKatmani mod={S.arsiv(plan)}>{sahne}</ArsivKatmani>}{!darbeKendi && <DarbeKatmani plan={plan} p={p} />}</SahneSarmal>}
      {kilitGerek && <div style={{ display: "none" }}>{sahne}</div>}
      {yazi && <HaritaEtiketleri ham={ham} p={p} dil={dil} ana={ana} d={d} />}
      {yazi && <HaritaKartlari ham={ham} p={p} dil={dil} ana={ana} d={d} />}
      {yazi && <Etiketler plan={plan} p={p} kilit={kilit} dil={dil} ana={ana} />}
      {yazi && <YaziKatmani plan={ham} p={p} dil={dil} ana={ana} />}
      {alt && <Altyazi ham={ham} b={b} p={p} kilit={kilit} d={d} dil={dil} ana={ana} kh={kh} />}
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

export const Bolum: React.FC<BolumProps> = ({ yol, bolum, guvenli, foley, miks, sesSure, katman, mod: modP, dil: dilP, kelimeler }) => {
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
        return <Sequence key={plan.id} from={from} durationInFrames={plan.sure_kare} name={`${plan.id} · ${plan.sablon}`}>{!katman && <PlanGoster plan={plan} guvenli={guvenli} mod={mod} dil={dil} ana={ana} onceki={i > 0 ? b.planlar[i - 1] : undefined} b={b} kh={kelimeler} />}{ses && (!katman || katman === "anlatim") && <PlanSesleri plan={plan} dil={dil} ana={ana} />}</Sequence>;
      })}
      {ses && (!katman || katman === "foley") && <FoleyKatmani b={b} foley={fj} miks={mj} fps={60} />}
      {ses && (!katman || katman === "muzik") && <MuzikKatmani miks={mj} toplam={toplam} anlatim={anlatimAraliklari(b, sesSure, 60)} />}
    </AbsoluteFill>
  );
};
