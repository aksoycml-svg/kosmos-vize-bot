// ===== IsikKaynagi — tek kaynak tanımından aydınlık alan, havadaki huzme, toz ve gölge yönü =====
// CLAUDE.md "Işığın yolu" + "Tek ışık kaynağı": ışık yalnız kaynağı gören yüzeye düşer; çokgen araya giren her
// kütleyle (figür, sedye, mobilya) kırpılır. Huzme, ışık havuzu ve gölge yönü burada AYNI `IsikTanim`'dan türer;
// şablon elle ayrı huzme/gölge koymaz.
//
// Kullanım (SVG içinde):
//   const isik: IsikTanim = { konum: [540, 420], menzil: 1300, koni: { yon: Math.PI / 2, yari: 0.7 } };
//   <IsikKaynagi tanim={isik} engeller={[sedye, figur]} sinir={{ x: 0, y: 0, w: 1080, h: 1920 }}
//     aydinlik={<AydinlikZemin />} />
// Engel = ekran koordinatında kapalı çokgen (P2[]). Rig silueti SVG path ise `src/kit/cizim/MurekkepCizgi`
// `yolNoktalari(d, adim)` ile örneklenir (adim 8–14 px yeter).
import React, { useId, useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { cokgenD, gorunurlukCokgeni, golgeYonu, Koni, P2, Parca, Sinir } from "./gorunurluk";

export type IsikTanim = {
  /** kaynak noktası (ekran px) */
  konum: P2;
  /** sıcak ışık rengi (huzme/havuz) */
  renk?: string;
  /** düşüş mesafesi (px): ışık bu yarıçapta sıfıra iner */
  menzil: number;
  /** pencere/kapı/abajur huzmesi; yoksa her yöne */
  koni?: Koni;
};

export type IsikHesap = {
  nokta: P2[];
  d: string;
  /** p noktasında gölgenin düştüğü birim yön (kaynaktan uzağa) */
  golge: (p: P2) => P2;
};

/** Saf hesap (hook değil): kare başına bir kez çağır. */
export function isikHesapla(tanim: IsikTanim, engeller: P2[][], sinir: Sinir, parcalar?: Parca[]): IsikHesap {
  const nokta = gorunurlukCokgeni({ kaynak: tanim.konum, engeller, parcalar, sinir, koni: tanim.koni });
  return { nokta, d: cokgenD(nokta), golge: (p) => golgeYonu(tanim.konum, p) };
}

/** Hesabı girdiler değişmedikçe önbellekler (sabit kaynak + sabit engelde her kare yeniden hesaplanmaz). */
export function useIsik(tanim: IsikTanim, engeller: P2[][], sinir: Sinir, parcalar?: Parca[]): IsikHesap {
  const anahtar = JSON.stringify([tanim.konum, tanim.koni, engeller, parcalar, sinir]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => isikHesapla(tanim, engeller, sinir, parcalar), [anahtar]);
}

/** useId → SVG url(#…) içinde güvenli kimlik */
export function useSvgId(onek: string, id?: string): string {
  const r = useId();
  return id ?? `${onek}-${r.replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

/** Yalnız clipPath tanımı: başka katmanları (ışıklı doku, kenar ışığı) aynı çokgenle kırpmak için. */
export const IsikClip: React.FC<{ id: string; d: string }> = ({ id, d }) => (
  <defs>
    <clipPath id={id} clipPathUnits="userSpaceOnUse">
      <path d={d} />
    </clipPath>
  </defs>
);

const mulberry = (seed: number) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export type IsikKaynagiProps = {
  tanim: IsikTanim;
  engeller: P2[][];
  parcalar?: Parca[];
  sinir: Sinir;
  /** dışarıda hesaplandıysa (aynı hesabı gölge/kenar ışığı için de kullanmak) */
  hesap?: IsikHesap;
  /** kimlik öneki; verilmezse useId */
  id?: string;
  /** aydınlık sürüm katmanı (ışıklı duvar/zemin): çokgenle kırpılır + mesafeyle söner */
  aydinlik?: React.ReactNode;
  /** havadaki huzme (toz ışığı) */
  huzme?: false | { siddet?: number; blur?: number; karisim?: React.CSSProperties["mixBlendMode"] };
  /** havada asılı toz zerreleri (seed sabit; yalnız kareyle yavaşça süzülür) */
  toz?: false | { adet?: number; seed?: number; boy?: number; siddet?: number };
  /** aydınlık katmanın kenar yumuşaklığı (px blur) */
  yumusak?: number;
};

/**
 * Sıra: aydınlık sürüm (kırpılmış + sönümlü) → havadaki huzme (radyal gradyan, kırpılmış, bulanık kenar) → toz.
 * Engelleri (figür, sedye) bu bileşenden SONRA çiz: önde olan arkadakini kapatır; kenar ışığı için `IsikClip`.
 */
export const IsikKaynagi: React.FC<IsikKaynagiProps> = ({
  tanim, engeller, parcalar, sinir, hesap, id, aydinlik, huzme = {}, toz = {}, yumusak = 3,
}) => {
  const kare = useCurrentFrame();
  const kok = useSvgId("isik", id);
  const kendi = useIsik(tanim, engeller, sinir, parcalar);
  const h = hesap ?? kendi;
  const renk = tanim.renk ?? "#ffd49a";
  const [kx, ky] = tanim.konum;
  const R = tanim.menzil;
  const cid = `${kok}-k`, gid = `${kok}-g`, mid = `${kok}-m`, mgid = `${kok}-mg`, bid = `${kok}-b`, aid = `${kok}-a`;

  const zerre = useMemo(() => {
    if (!toz) return [];
    const r = mulberry(toz.seed ?? 7);
    const n = toz.adet ?? 70;
    const koni = tanim.koni;
    return Array.from({ length: n }, () => {
      const a = koni ? koni.yon + (r() * 2 - 1) * Math.min(koni.yari, Math.PI) : r() * Math.PI * 2;
      const m = Math.sqrt(r()) * R * 0.85;
      return { a, m, faz: r() * Math.PI * 2, hiz: 0.4 + r() * 0.8, boy: (toz.boy ?? 2.4) * (0.6 + r() * 0.8) };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toz && toz.seed, toz && toz.adet, toz && toz.boy, R, tanim.koni?.yon, tanim.koni?.yari]);

  const hz = huzme ? { siddet: huzme.siddet ?? 0.32, blur: huzme.blur ?? 6, karisim: huzme.karisim ?? "screen" } : null;
  const genis = { x: sinir.x - 50, y: sinir.y - 50, width: sinir.w + 100, height: sinir.h + 100 };

  return (
    <g>
      <defs>
        <clipPath id={cid} clipPathUnits="userSpaceOnUse"><path d={h.d} /></clipPath>
        <radialGradient id={gid} gradientUnits="userSpaceOnUse" cx={kx} cy={ky} r={R}>
          <stop offset="0" stopColor={renk} stopOpacity={1} />
          <stop offset="0.18" stopColor={renk} stopOpacity={0.75} />
          <stop offset="0.5" stopColor={renk} stopOpacity={0.28} />
          <stop offset="1" stopColor={renk} stopOpacity={0} />
        </radialGradient>
        <radialGradient id={mgid} gradientUnits="userSpaceOnUse" cx={kx} cy={ky} r={R}>
          <stop offset="0" stopColor="#fff" stopOpacity={1} />
          <stop offset="0.45" stopColor="#fff" stopOpacity={0.8} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </radialGradient>
        <mask id={mid} maskUnits="userSpaceOnUse" {...genis}>
          <rect {...genis} fill={`url(#${mgid})`} />
        </mask>
        <filter id={aid} filterUnits="userSpaceOnUse" {...genis}><feGaussianBlur stdDeviation={yumusak} /></filter>
        {hz && <filter id={bid} filterUnits="userSpaceOnUse" {...genis}><feGaussianBlur stdDeviation={hz.blur} /></filter>}
      </defs>

      {aydinlik && (
        <g filter={yumusak > 0 ? `url(#${aid})` : undefined}>
          <g clipPath={`url(#${cid})`} mask={`url(#${mid})`}>{aydinlik}</g>
        </g>
      )}

      {hz && (
        <g filter={hz.blur > 0 ? `url(#${bid})` : undefined} style={{ mixBlendMode: hz.karisim }} opacity={hz.siddet}>
          <g clipPath={`url(#${cid})`}>
            <rect x={sinir.x} y={sinir.y} width={sinir.w} height={sinir.h} fill={`url(#${gid})`} />
          </g>
        </g>
      )}

      {toz && zerre.length > 0 && (
        <g clipPath={`url(#${cid})`} style={{ mixBlendMode: "screen" }}>
          {zerre.map((z, i) => {
            const t = kare / 60;
            const x = kx + Math.cos(z.a) * z.m + Math.sin(t * 0.5 * z.hiz + z.faz) * 9;
            const y = ky + Math.sin(z.a) * z.m + Math.cos(t * 0.37 * z.hiz + z.faz * 1.3) * 7 + t * 4 * z.hiz;
            const dus = Math.max(0, 1 - Math.hypot(x - kx, y - ky) / R);
            const parilti = 0.55 + 0.45 * Math.sin(t * 1.7 * z.hiz + z.faz);
            return <circle key={i} cx={x} cy={y} r={z.boy} fill={renk} opacity={(toz.siddet ?? 0.8) * dus * parilti} />;
          })}
        </g>
      )}
    </g>
  );
};
