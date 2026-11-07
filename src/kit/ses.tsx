// ===== Kit sesi: foley (temaslar[].ses) + müzik (miks.json) — SET KİTİ ses eki =====
// foley.json: { "<ses_adi>": { dosya (public/'tan göreli), tepe_ms, onerilen_db } }
// miks.json : { muzik: { dosya, bas_kare, db, fade_in_kare, fade_out_kare, duck: { anlatim_db } }, foley_varsayilan_db, istisnalar }
// Dosyalar varsayılan olarak bolum json'unun klasöründen okunur (bolumler/<slug>/foley.json, miks.json); yoksa sessiz geçilir.
import React from "react";
import { Sequence, getStaticFiles, interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import type { BolumJson } from "./tipler";

export type FoleyKayit = { dosya: string; tepe_ms?: number; onerilen_db?: number };
export type FoleyJson = Record<string, FoleyKayit>;
export type MiksJson = {
  muzik?: { dosya: string; bas_kare?: number; db?: number; fade_in_kare?: number; fade_out_kare?: number; duck?: { anlatim_db?: number; atak_kare?: number; birakma_kare?: number } };
  foley_varsayilan_db?: number;
  istisnalar?: Record<string, number | { db?: number }> | unknown[];
  // Aralık istisnaları (mutlak kare): müzik/foley bu aralıkta en çok bu seviyede (6 kare rampa). Tek kareli kayıtlar not amaçlıdır.
  muzik_istisnalari?: { kare: number | [number, number]; muzik_db?: number; foley_db?: number }[];
};

const RAMPA = 6;
// Aralık tavanı (dB): a karesinde geçerli en düşük istisna; yoksa undefined. Rampa: aralık dışına 6 kare yumuşak geçiş.
const tavanDb = (m: MiksJson | null, a: number, alan: "muzik_db" | "foley_db"): { db: number; w: number } | undefined => {
  let en: { db: number; w: number } | undefined;
  for (const x of m?.muzik_istisnalari ?? []) {
    const db = x[alan];
    if (db === undefined || !Array.isArray(x.kare)) continue;
    const [s, e] = x.kare;
    const w = a < s - RAMPA || a > e + RAMPA ? 0 : a < s ? (a - (s - RAMPA)) / RAMPA : a <= e ? 1 : 1 - (a - e) / RAMPA;
    if (w > 0 && (!en || db < en.db)) en = { db, w };
  }
  return en;
};
// mevcut seviye db'yi tavana doğru w oranında çek (tavan daha düşükse)
const tavanUygula = (db: number, t?: { db: number; w: number }) => (t && t.db < db ? db + (t.db - db) * t.w : db);
export type Aralik = [number, number]; // mutlak kare [bas, bit)

const sctx = require.context("../../bolumler", true, /(foley|miks[^/]*)\.json$/);
const jsonOku = <T,>(yol: string): T | null => (sctx.keys().includes(`./${yol}`) ? (sctx(`./${yol}`) as T) : null);
const klasor = (yol?: string) => (yol && yol.includes("/") ? yol.slice(0, yol.lastIndexOf("/") + 1) : "");
export const foleyYukle = (bolumYol?: string, yol?: string) => jsonOku<FoleyJson>(yol ?? `${klasor(bolumYol)}foley.json`);
export const miksYukle = (bolumYol?: string, yol?: string) => jsonOku<MiksJson>(yol ?? `${klasor(bolumYol)}miks.json`);

const dbVol = (db: number) => Math.pow(10, db / 20);
// public/ dosya varlığı: liste boşsa (sunucu/player) denetlenemez → var say
const dosyaVar = (d: string) => {
  const l = getStaticFiles();
  return !l || l.length === 0 || l.some((f) => f.name === d);
};

// temas db önceliği: temas.db > miks.istisnalar[ses] > foley.onerilen_db > miks.foley_varsayilan_db > -4
const istisnaDb = (m: MiksJson | null, ad: string): number | undefined => {
  const i = m?.istisnalar;
  if (!i || Array.isArray(i)) return undefined;
  const v = (i as Record<string, number | { db?: number }>)[ad];
  return typeof v === "number" ? v : v?.db;
};

export const FoleyKatmani: React.FC<{ b: BolumJson; foley: FoleyJson | null; miks: MiksJson | null; fps: number }> = ({ b, foley, miks, fps }) => {
  if (!foley) return null;
  const out: React.ReactNode[] = [];
  let bas = 0;
  for (const plan of b.planlar) {
    for (const [i, t] of (plan.temaslar ?? []).entries()) {
      const k = t.ses ? foley[t.ses] : undefined;
      if (!k || !k.dosya || !dosyaVar(k.dosya)) continue; // tanımsız/eksik: doğrulayıcı uyarır, render sessiz geçer
      const db = t.db ?? istisnaDb(miks, t.ses!) ?? k.onerilen_db ?? miks?.foley_varsayilan_db ?? -4;
      const start = bas + t.kare - Math.round(((k.tepe_ms ?? 0) * fps) / 1000); // tepe = temas karesi
      out.push(
        <Sequence key={`${plan.id}-f${i}`} from={Math.max(0, start)} layout="none" name={`foley ${plan.id} ${t.ses} @${bas + t.kare}`}>
          <Audio src={staticFile(k.dosya)} volume={(f: number) => dbVol(tavanUygula(db, tavanDb(miks, Math.max(0, start) + f, "foley_db")))} trimBefore={start < 0 ? -start : undefined} />
        </Sequence>,
      );
    }
    bas += plan.sure_kare;
  }
  return <>{out}</>;
};

// Anlatım aralıkları (duck için): plan.ses başlangıcından ses süresi kadar, plan sonuyla kırpılmış (ses plan sonunda kesilir)
export const anlatimAraliklari = (b: BolumJson, sureler?: Record<string, number>, fps = 60): Aralik[] => {
  const r: Aralik[] = [];
  let bas = 0;
  for (const plan of b.planlar) {
    for (const s of plan.ses ?? []) {
      const sn = sureler?.[s.dosya];
      const bit = sn ? Math.min(plan.sure_kare, s.kare + Math.ceil(sn * fps)) : plan.sure_kare;
      r.push([bas + s.kare, bas + bit]);
    }
    bas += plan.sure_kare;
  }
  return r;
};

// calculateMetadata içinde (tarayıcı): ses sürelerini oku; zaman aşımı/hata → yok (plan sonuna kadar duck)
export const sesSureleri = async (dosyalar: string[]): Promise<Record<string, number>> => {
  if (typeof document === "undefined") return {};
  const tek = (d: string) =>
    new Promise<number | null>((res) => {
      const a = document.createElement("audio");
      const t = setTimeout(() => res(null), 4000);
      a.preload = "metadata";
      a.onloadedmetadata = () => { clearTimeout(t); res(Number.isFinite(a.duration) ? a.duration : null); };
      a.onerror = () => { clearTimeout(t); res(null); };
      a.src = staticFile(d);
    });
  const o: Record<string, number> = {};
  await Promise.all([...new Set(dosyalar)].filter(dosyaVar).map(async (d) => { const s = await tek(d); if (s) o[d] = s; }));
  return o;
};

// Müzik: tek Audio, bas_kare'den bölüm sonuna; fade in/out; anlatım çalarken duck.anlatim_db (MUTLAK seviye) — db'den düşükse uygulanır
export const MuzikKatmani: React.FC<{ miks: MiksJson | null; toplam: number; anlatim: Aralik[] }> = ({ miks, toplam, anlatim }) => {
  const m = miks?.muzik;
  if (!m?.dosya || !dosyaVar(m.dosya)) return null;
  const bas = m.bas_kare ?? 0, L = toplam - bas;
  if (L <= 0) return null;
  const fi = Math.max(1, m.fade_in_kare ?? 30), fo = Math.max(1, m.fade_out_kare ?? 60);
  const tabanDb = m.db ?? -18, duckDb = Math.min(tabanDb, m.duck?.anlatim_db ?? tabanDb);
  const atak = m.duck?.atak_kare ?? 9, birak = m.duck?.birakma_kare ?? 24;
  const vol = (f: number) => {
    const fade = Math.min(interpolate(f, [0, fi], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), interpolate(f, [L - fo, L], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
    const a = bas + f;
    // duck derinliği 0..1: aralığa girerken atak, çıkarken bırakma rampası
    let d = 0;
    for (const [s, e] of anlatim) {
      if (a >= s - atak && a < e + birak) d = Math.max(d, a < s ? (a - (s - atak)) / atak : a < e ? 1 : 1 - (a - e) / birak);
    }
    return fade * dbVol(tavanUygula(tabanDb + (duckDb - tabanDb) * d, tavanDb(miks, a, "muzik_db")));
  };
  return (
    <Sequence from={bas} durationInFrames={L} layout="none" name={`müzik ${m.dosya}`}>
      <Audio src={staticFile(m.dosya)} volume={vol} />
    </Sequence>
  );
};
