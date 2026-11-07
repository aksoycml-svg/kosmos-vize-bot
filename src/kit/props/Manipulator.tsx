// ===== Chappe kumandası (manipulateur) + it-çek eli + kablolar (K2) =====
// Dönem: kumanda kule odasında direk dibinde; küçük ölçekli T (regülatör kolu + 2 gösterge kolu) bir ahşap direğe takılı, kablo-makara
// ile tavandan dış direğe bağlı; görevli kolu it-çek ile döndürür. Kurallar: tutulan nesne eli takip eder → burada TERSİ: kol açısı
// it-çek fazından hesaplanır, EL kol ucuna IK ile oturur (kolIK) — el hiçbir karede koldan kopmaz. Kablolar uçlardan tavana gerilir.
import React from "react";
import { interpolate } from "remotion";
import type { Poz } from "../../rig/Kukla";
import { kolIK } from "../../rig/kinematik";
import { ink, P } from "../../doku/sabitler";
import type { Karakter } from "../tipler";
import { cl, zarf } from "../zaman";

const AHSAP = "#6a4a2c", KOL = "#2a2620", KABLO = "#8a7650", PIRINC = "#b08a40";

// it-çek fazından kol açısı (derece, yatay ± salınım). Jest yoksa 0.
export const manipAci = (c: Karakter | undefined, p: number, genlik = 26) => {
  const j = c?.jestler?.find((q) => q.ad === "it-cek");
  if (!j) return 0;
  const t = typeof j.ops?.tekrar === "number" ? (j.ops.tekrar as number) : 3;
  const ph = interpolate(p, [j.bas, j.bit], [0, t * Math.PI * 2], cl);
  return genlik * Math.sin(ph) * zarf(p, j.bas, j.bit, 0.15, 0.15);
};

// Kol ucunu (karaktere bakan uç = tutamak) hesaplar, karakterin ön elini IK ile oraya koyar (pz değişir).
// pivot: ekran (aynı koordinat çerçevesi), yari: kol yarı boyu px, yon: karakterin bakış yönü (tutamak karaktere dönük: −yon).
export const manipUygula = (pz: Poz, pivot: P, yari: number, aci: number, yon: number) => {
  const r = (aci * Math.PI) / 180;
  const d: P = [-yon * Math.cos(r), Math.sin(r)];
  const tut: P = [pivot[0] + d[0] * yari, pivot[1] + d[1] * yari];
  const karsi: P = [pivot[0] - d[0] * yari, pivot[1] - d[1] * yari];
  const ik = kolIK(pz, tut, true, [0, 6]);
  pz.shF = ik.sh; pz.elF = ik.el;
  return { tut, karsi };
};

// Çizim: direk (pivot → zemin), kol (tut ↔ karsi), gösterge kolları, kablolar (uçlardan tavana; makara).
export const Manipulator: React.FC<{ pivot: P; tut: P; karsi: P; zemin: number; tavan: number; s: number; murekkep?: string }> = ({ pivot, tut, karsi, zemin, tavan, s, murekkep }) => {
  const m = murekkep ?? ink(AHSAP);
  const w = Math.max(3, 0.05 * s), kw = Math.max(3, 0.035 * s), gl = 0.13 * s;
  const ang = Math.atan2(karsi[1] - tut[1], karsi[0] - tut[0]);
  const dik: P = [-Math.sin(ang), Math.cos(ang)];
  const gosterge = (q: P, yan: 1 | -1) => <line x1={q[0]} y1={q[1]} x2={q[0] + dik[0] * gl * yan * -1} y2={q[1] + dik[1] * gl * yan * -1 + gl * 0.25} stroke={KOL} strokeWidth={kw * 0.8} strokeLinecap="round" />;
  const makara = (q: P): P => [q[0], tavan];
  return (
    <g>
      {/* kablolar (kenevir) uçlardan tavandaki makaralara — gergin düz çizgi */}
      {[tut, karsi].map((q, i) => { const t = makara(q); return <g key={i}><line x1={q[0]} y1={q[1]} x2={t[0]} y2={t[1]} stroke={KABLO} strokeWidth={Math.max(1.6, 0.012 * s)} /><circle cx={t[0]} cy={t[1] + 0.03 * s} r={0.035 * s} fill={AHSAP} stroke={m} strokeWidth={1.5} /></g>; })}
      {/* direk + taban */}
      <rect x={pivot[0] - w / 2} y={pivot[1]} width={w} height={zemin - pivot[1]} fill={AHSAP} stroke={m} strokeWidth={1.8} />
      <rect x={pivot[0] - w * 2} y={zemin - w * 0.8} width={w * 4} height={w * 0.8} fill={AHSAP} stroke={m} strokeWidth={1.8} />
      {/* küçük regülatör kolu (siyah, dış T ile aynı dil) + gösterge kolları */}
      <line x1={tut[0]} y1={tut[1]} x2={karsi[0]} y2={karsi[1]} stroke={m} strokeWidth={kw + 3} strokeLinecap="round" />
      <line x1={tut[0]} y1={tut[1]} x2={karsi[0]} y2={karsi[1]} stroke={KOL} strokeWidth={kw} strokeLinecap="round" />
      {gosterge(karsi, 1)}
      <circle cx={pivot[0]} cy={pivot[1]} r={kw * 0.7} fill={PIRINC} stroke={m} strokeWidth={1.2} />
      {/* tutamak (ahşap topuz) — el bunun üstüne IK ile oturur */}
      <circle cx={tut[0]} cy={tut[1]} r={kw * 0.9} fill={AHSAP} stroke={m} strokeWidth={1.2} />
    </g>
  );
};
