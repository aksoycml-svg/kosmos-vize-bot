// ===== SALON `konser` (Leningrad 1942, Filarmoni Büyük Salonu) — mekanlar.md §1–§10, tasarım §2.5 / §3 =====
// Tek dünya (salonDunya.ts): her öğe (u, h, z) ile tanımlı, ekran izdüşümle hesaplanır; seed dünyaya bağlı (kaynamaz).
// Tek ışık: yanan avizelerin ağırlık merkezi → havuz, kenar ışığı, gölge. Paris zinciri: RenkKaydi + KonturTitreme + Tarama + Flu +
// buğu + `litografi` arşiv katmanı (Bolum/kalibrasyon sarar). Görüntüde yazı yok (dil-nötr). Kırmızı yok. İmza: yalnız çubuklar.
// Mimari iskelet [G] (mekanlar §0/§11.1): Korint sütun dizisi, galeri, avize biçimi genel bilgi, kaynak bekliyor.
// `prova` durumu bu dosyada henüz yok (sonraki tur; sütunsuz nötr kutu).
import React, { useId } from "react";
import { RenkKaydi, Tarama } from "../../../doku/Tarama";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { ink, karistir, P, rnd } from "../../../doku/sabitler";
import { Flu } from "../paris/catiDekor";
import { GravurEl, GRAVUR_POZ, GravurPalet, konikKol } from "../../props/paris/GravurEl";
import { SiluetFigur40, siluet40Yol, Siluet40Kod } from "../../props/cicero/SiluetFigur40";
import { param, Sablon, SablonProps } from "../../ortak";
import {
  AvizeDurum, avizeler, dunyaPoly, ek, golgeNokta, isikMerkezi, LG, prj, ptsS, pxm, SALON, SalonKam, salonKamera, V3, yatayCember, zarf,
} from "./salonDunya";

const S = 1942; // seed
/** derinliğe göre buğu (hava perspektifi), maks α .4. Hedef rengi ışık durumundan: loşta #b98a9e (gül-mor), avizeler yandıkça
 *  gül-altına ısınır (tasarım §0 "yaz/konser = gül-altın hacim, gölgeler mor kalır"). Tek tanım: KonserSahne bağlamı verir. */
const BuguCtx = React.createContext<string>(LG.uzak);
const useBug = () => { const hedef = React.useContext(BuguCtx); return (renk: string, z: number) => karistir(renk, hedef, Math.min(0.48, Math.max(0, (z - 12) / 18) * 0.48)); };
const kenarEl: GravurPalet = { isik: LG.ten, golge: LG.tenGolge, konturYuk: "#5a4438", konturIsik: "#a8836c", kenar: LG.kenar, tarama: "#6a4f40", manset: LG.gomlek, mansetGolge: "#8a8474" };

// ======================================================= TAVAN + ARKA DUVAR =======================================================
const Tavan: React.FC<{ K: SalonKam; A: AvizeDurum[] }> = ({ K, A }) => {
  const bug = useBug();
  const H = SALON.tavan, bant = [14, 17.5, 21, 24.5, 28, 30.5], renk = [LG.gece, "#2c2c4c", LG.golge, LG.hacim, "#5b5072"];
  return (
    <g>
      {renk.map((r, i) => <polygon key={i} points={dunyaPoly(K, [[-9.5, H, bant[i]], [9.5, H, bant[i]], [9.5, H, bant[i + 1]], [-9.5, H, bant[i + 1]]])} fill={r} />)}
      {/* litografi basamak çizgileri */}
      {bant.slice(1, -1).map((z, i) => <polyline key={`c${i}`} points={dunyaPoly(K, [[-9.5, H, z + 0.25], [9.5, H, z + 0.25]])} stroke={renk[i]} strokeWidth={2.5} opacity={0.35} fill="none" />)}
      {/* avize üstü sıcak lekeler (tavanda) */}
      {A.filter((a) => a.z >= 14).map((a, i) => <polygon key={`l${i}`} points={ptsS(yatayCember(K, [a.u, H, a.z], 2.4 * a.hale))} fill={LG.tavanLeke} opacity={0.4 * a.yanik} />)}
      {/* kaset şeridi: enine kirişler (sütun eksenlerinde) + boyuna iki çıta (avize sıraları üstünde) */}
      {[16, 20, 24, 28].map((z) => <g key={`k${z}`}>
        <polygon points={dunyaPoly(K, [[-6, 12.6, z - 0.3], [6, 12.6, z - 0.3], [6, 12.6, z + 0.3], [-6, 12.6, z + 0.3]])} fill={bug("#3a3452", z)} />
        <polyline points={dunyaPoly(K, [[-6, 12.6, z - 0.3], [6, 12.6, z - 0.3]])} stroke={bug(LG.kenarLamba, z)} strokeWidth={2} opacity={0.7} fill="none" />
      </g>)}
      {[-3, 3].map((u) => <polyline key={`b${u}`} points={dunyaPoly(K, [[u, 12.8, 14], [u, 12.8, 30]])} stroke="#3a3452" strokeWidth={5} fill="none" />)}
    </g>
  );
};

const Sutun: React.FC<{ K: SalonKam; u: number; z: number; isik: number; uid: string }> = ({ K, u, z, isik, uid }) => {
  const bug = useBug();
  const r = SALON.sutunR, ic = u < 0 ? 1 : -1; // ışıklı (iç) yan: nefe bakan
  const a = ek(K, u, SALON.tabanH, z), b = ek(K, u, SALON.govdeUst, z);
  const ra = r * pxm(K, u, SALON.tabanH, z), rb = r * pxm(K, u, SALON.govdeUst, z) * 0.94; // entasis: üstte %6 incelme
  const yer = (t: number, ust: boolean): P => (ust ? [b[0] + (t * 2 - 1) * rb * ic * -1, b[1]] : [a[0] + (t * 2 - 1) * ra * ic * -1, a[1]]);
  // t: 0 dış kenar → 1 iç kenar
  const serit = (t0: number, t1: number) => [yer(t0, true), yer(t1, true), yer(t1, false), yer(t0, false)];
  const D = 2 * rb, bas = ek(K, u, SALON.baslikUst, z), Hc = b[1] - bas[1];
  const isikR = bug(karistir(LG.sutOrta, LG.sutIsik, isik), z), ortaR = bug(LG.sutOrta, z), golR = bug(LG.sutGolge, z);
  const kont = ink(ortaR), kw = Math.max(1.6, Math.min(4, D / 30));
  const lod = D >= 70 ? 2 : D >= 40 ? 1 : 0;
  // Korint başlık (ekranda, D'ye göre): astragal → çan → iki sıra yaprak → köşe volütleri → içbükey abakus
  const cx = b[0], yb = b[1], yt = bas[1];
  const lob = (n: number, w: number, y0: number, h: number) => {
    let d = `M${cx - w / 2} ${y0}`;
    for (let i = 0; i < n; i++) { const x0 = cx - w / 2 + (w * i) / n, x1 = x0 + w / n; d += ` C${x0} ${y0 - h * 1.1} ${x1} ${y0 - h * 1.1} ${x1} ${y0}`; }
    return d + "Z";
  };
  const abak = `M${cx - D * 0.78} ${yt} L${cx + D * 0.78} ${yt} Q${cx + D * 0.6} ${yt + Hc * 0.08} ${cx + D * 0.74} ${yt + Hc * 0.17} L${cx - D * 0.74} ${yt + Hc * 0.17} Q${cx - D * 0.6} ${yt + Hc * 0.08} ${cx - D * 0.78} ${yt}Z`;
  const can = `M${cx - D * 0.5} ${yb} L${cx + D * 0.5} ${yb} L${cx + D * 0.66} ${yt + Hc * 0.17} L${cx - D * 0.66} ${yt + Hc * 0.17}Z`;
  const golgeYari = [[cx + ic * -D * 0.05, yt], [cx - ic * D * 0.9, yt], [cx - ic * D * 0.9, yb + 4], [cx + ic * -D * 0.05, yb + 4]] as P[];
  const lekeler = Array.from({ length: 4 }, (_, i) => ({ t: 0.6 + rnd(S + 300 + z, `lt${i}${u}`) * 0.3, y: 0.15 + rnd(S + 300 + z, `ly${i}${u}`) * 0.7, r: 0.08 + rnd(S + 300 + z, `lr${i}${u}`) * 0.1 }));
  return (
    <g>
      {/* kaide: kare plint + iki torus */}
      {(() => { const p0 = ek(K, u, 0, z), p1 = ek(K, u, 0.3, z), w = 0.6 * pxm(K, u, 0, z); return <g>
        <rect x={p0[0] - w} y={p1[1]} width={2 * w} height={p0[1] - p1[1]} fill={ortaR} stroke={kont} strokeWidth={kw} />
        {[0.38, 0.52].map((h, i) => { const q = ek(K, u, h, z); return <rect key={i} x={q[0] - w * (0.92 - i * 0.08)} y={q[1] - (0.07 * w) / 0.6} width={2 * w * (0.92 - i * 0.08)} height={(0.14 * w) / 0.6} rx={(0.07 * w) / 0.6} fill={ortaR} stroke={kont} strokeWidth={kw * 0.8} />; })}
      </g>; })()}
      {/* gövde: dış gölge · orta · iç ışık; sınırlar net */}
      <polygon points={ptsS(serit(0, 1))} fill={ortaR} />
      <polygon points={ptsS(serit(0, 0.3))} fill={golR} />
      <polygon points={ptsS(serit(0.55, 1))} fill={isikR} />
      <g clipPath={`url(#${uid})`}>
        <defs><clipPath id={uid}><polygon points={ptsS(serit(0.55, 1))} /></clipPath></defs>
        {lekeler.map((l, i) => { const q = [yer(l.t, true), yer(l.t, false)]; const x = q[0][0] + (q[1][0] - q[0][0]) * l.y, y = q[0][1] + (q[1][1] - q[0][1]) * l.y; return <ellipse key={i} cx={x} cy={y} rx={rb * l.r * 3} ry={rb * l.r * 6} fill={LG.sivaGolge} opacity={0.08} />; })}
        {/* kaide üstü kir bandı */}
        <rect x={-50} y={a[1] - 0.4 * pxm(K, u, 0.6, z)} width={2000} height={0.4 * pxm(K, u, 0.6, z)} fill={LG.sivaGolge} opacity={0.08} />
      </g>
      <line x1={yer(0.55, true)[0]} y1={yer(0.55, true)[1]} x2={yer(0.55, false)[0]} y2={yer(0.55, false)[1]} stroke={bug(LG.kenar, z)} strokeWidth={2} />
      <polygon points={ptsS(serit(0, 1))} fill="none" stroke={kont} strokeWidth={kw} strokeLinejoin="round" />
      {/* başlık */}
      <rect x={cx - D * 0.53} y={yb - Hc * 0.04} width={D * 1.06} height={Hc * 0.07} fill={ortaR} stroke={kont} strokeWidth={kw * 0.8} />
      <path d={can} fill={ortaR} stroke={kont} strokeWidth={kw * 0.8} />
      {lod >= 2 && <path d={lob(5, D * 1.3, yt + Hc * 0.62, Hc * 0.42)} fill={isikR} stroke={kont} strokeWidth={kw * 0.8} />}
      {lod >= 2 && <path d={lob(5, D * 1.12, yb - Hc * 0.02, Hc * 0.34)} fill={isikR} stroke={kont} strokeWidth={kw * 0.8} />}
      {lod >= 2 && [-1, 1].map((s) => <g key={s}>
        <circle cx={cx + s * D * 0.62} cy={yt + Hc * 0.3} r={D * 0.11} fill={ortaR} stroke={kont} strokeWidth={kw * 0.8} />
        <path d={`M${cx + s * D * 0.62} ${yt + Hc * 0.3} m${-D * 0.05} 0 a${D * 0.05} ${D * 0.05} 0 1 1 ${D * 0.07} ${D * 0.02}`} stroke={kont} strokeWidth={kw * 0.6} fill="none" />
      </g>)}
      {lod >= 1 && <path d={abak} fill={isikR} stroke={kont} strokeWidth={kw * 0.8} />}
      {/* başlık gölge yarısı: tarama (yalnız çap ≥ 70 px) */}
      {lod >= 2 && <Tarama sekil={golgeYari} basamak="III" aci={72} renk={LG.tarama} derinlik={D > 90 ? "yakin" : "uzak"} seed={S + 11 + z} alfaCarpan={0.8} />}
    </g>
  );
};

/** saçaklık (arşitrav 2 bant + friz + korniş; korniş altı taramalı, üst kenar kenar ışıklı) — bir yan (s = −1 sol, +1 sağ) */
const Saclik: React.FC<{ K: SalonKam; s: number; z0: number; z1: number }> = ({ K, s, z0, z1 }) => {
  const bug = useBug();
  const u = s * 5.5, uk = s * 5.1;
  const bant = (h0: number, h1: number, uu = u): V3[] => [[uu, h0, z0], [uu, h0, z1], [uu, h1, z1], [uu, h1, z0]];
  const zm = (z0 + z1) / 2;
  const alt: V3[] = [[u, 11.0, z0], [u, 11.0, z1], [uk, 11.0, z1], [uk, 11.0, z0]];
  const altE = [ek(K, u, 11.0, z0), ek(K, u, 11.0, z1), ek(K, uk, 11.0, z1), ek(K, uk, 11.0, z0)];
  return (
    <g strokeLinejoin="round">
      <polygon points={dunyaPoly(K, bant(10.0, 10.25))} fill={bug(LG.sutOrta, zm)} stroke={ink(LG.sutOrta)} strokeWidth={2} />
      <polygon points={dunyaPoly(K, bant(10.25, 10.5))} fill={bug(LG.sutIsik, zm)} stroke={ink(LG.sutOrta)} strokeWidth={2} />
      <polygon points={dunyaPoly(K, bant(10.5, 11.0))} fill={bug("#a9969e", zm)} stroke={ink(LG.sutOrta)} strokeWidth={2} />
      <polygon points={dunyaPoly(K, alt)} fill={bug(LG.sutGolge, zm)} />
      <Tarama sekil={altE} basamak="III" aci={72} renk={LG.tarama} derinlik="orta" seed={S + 21 + s} />
      <polygon points={dunyaPoly(K, bant(11.0, 11.4, uk))} fill={bug(LG.sutOrta, zm)} stroke={ink(LG.sutOrta)} strokeWidth={2} />
      <polyline points={dunyaPoly(K, [[uk, 11.4, z0], [uk, 11.4, z1]])} stroke={bug(LG.kenar, zm)} strokeWidth={2.5} fill="none" />
    </g>
  );
};

/** galeri (bir yan): alt duvar, galeri tavanı (altı), arka duvar + pencereler, ayakta sıcak siluetler, korkuluk */
const Galeri: React.FC<{ K: SalonKam; s: number }> = ({ K, s }) => {
  const bug = useBug();
  const ud = s * SALON.galeriDis, uk = s * 6.3, z0 = 12, z1 = 30, G = SALON.galeriH;
  const pencereler = [14, 18, 22, 26];
  const figurler = Array.from({ length: 7 }, (_, i) => {
    const z = 15 + i * 2 + rnd(S + 40 + s, `z${i}`) * 1.2, uu = s * (7.2 + rnd(S + 40 + s, `u${i}`) * 1.2);
    const kod = (["yasli", "uzun-ince", "topuzlu", "uzun-ince", "yasli", "topuzlu", "uzun-ince"] as Siluet40Kod[])[(i + (s > 0 ? 2 : 0)) % 7];
    return { z, u: uu, kod, egil: -4 + rnd(S + 40 + s, `e${i}`) * 14 };
  }).sort((a, b) => b.z - a.z);
  return (
    <g>
      <polygon points={dunyaPoly(K, [[ud, 0, z0], [ud, 0, z1], [ud, G, z1], [ud, G, z0]])} fill={LG.derin} />
      <polygon points={dunyaPoly(K, [[ud, G, z0], [ud, G, z1], [ud, 13, z1], [ud, 13, z0]])} fill={bug("#5b5072", 22)} />
      {pencereler.map((z) => {
        const q: V3[] = [[ud, 6, z - 0.8], [ud, 6, z + 0.8], [ud, 9.5, z + 0.8], [ud, 9.5, z - 0.8]];
        const sv: V3[] = [[ud, 5.85, z - 0.95], [ud, 5.85, z + 0.95], [ud, 9.65, z + 0.95], [ud, 9.65, z - 0.95]];
        return <g key={z}>
          <polygon points={dunyaPoly(K, sv)} fill={bug(LG.sivaGolge, z)} />
          <polygon points={dunyaPoly(K, q)} fill={bug(LG.cam, z)} />
          <polyline points={dunyaPoly(K, [[ud, 7.75, z - 0.8], [ud, 7.75, z + 0.8]])} stroke={bug(LG.sivaGolge, z)} strokeWidth={3} fill="none" />
          <polyline points={dunyaPoly(K, [[ud, 6, z], [ud, 9.5, z]])} stroke={bug(LG.sivaGolge, z)} strokeWidth={3} fill="none" />
          <polyline points={dunyaPoly(K, [[ud, 8.6, z - 0.6], [ud, 9.2, z - 0.2]])} stroke="#d6dde6" strokeWidth={2} opacity={0.5} fill="none" />
        </g>;
      })}
      {/* galeride ayakta duran, sahneye bakan sıcak siluetler (yüz < 60 px; baş eğimleri farklı) */}
      <Flu id={`gf${s > 0 ? "s" : "l"}`} sigma={2.2}>
        {figurler.map((f, i) => { const a = ek(K, f.u, G, f.z); return <SiluetFigur40 key={i} kod={f.kod} ayak={a} pxm={pxm(K, f.u, G, f.z) * 0.98} renk={bug("#6e5466", f.z)} kenar={{ renk: bug(LG.kenar, f.z), dx: -s * 2, dy: -2 }} yon={(s < 0 ? 1 : -1) as 1 | -1} profil egil={f.egil} golge={false} />; })}
      </Flu>
      {/* galeri döşemesi altı (kameradan görünür) */}
      {(() => { const alt = [ek(K, uk, G, z0), ek(K, uk, G, z1), ek(K, ud, G, z1), ek(K, ud, G, z0)]; return <g>
        <polygon points={ptsS(alt)} fill={LG.derin} />
        <Tarama sekil={alt} basamak="III" aci={72} renk="#1f1d33" derinlik="orta" seed={S + 31 + s} />
      </g>; })()}
      {/* korkuluk: alt kaide + babalar (ritim 0.3 m; < 8 px → bant) + küpeşte (üstü kenar ışığı) */}
      <polygon points={dunyaPoly(K, [[uk, G - 0.4, z0], [uk, G - 0.4, z1], [uk, G + 0.12, z1], [uk, G + 0.12, z0]])} fill={bug(LG.sutOrta, 22)} stroke={ink(LG.sutOrta)} strokeWidth={2} />
      {Array.from({ length: 60 }, (_, i) => z0 + 0.15 + i * 0.3).filter((z) => z < z1).map((z, i) => {
        const a = ek(K, uk, G + 0.12, z), b = ek(K, uk, G + 0.9, z), w = 0.09 * pxm(K, uk, G, z);
        return w * 3.3 < 8 ? null : <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={bug(LG.sutOrta, z)} strokeWidth={w} />;
      })}
      <polygon points={dunyaPoly(K, [[uk, G + 0.9, z0], [uk, G + 0.9, z1], [uk, G + 1.05, z1], [uk, G + 1.05, z0]])} fill={bug(LG.sutIsik, 22)} stroke={ink(LG.sutOrta)} strokeWidth={2} />
      <polyline points={dunyaPoly(K, [[uk, G + 1.05, z0], [uk, G + 1.05, z1]])} stroke={LG.kenar} strokeWidth={2} fill="none" />
    </g>
  );
};

const ArkaDuvar: React.FC<{ K: SalonKam; A: AvizeDurum[]; uid: string }> = ({ K, A, uid }) => {
  const bug = useBug();
  const z = SALON.arkaZ;
  return (
    <g>
      <polygon points={dunyaPoly(K, [[-9, 0, z], [9, 0, z], [9, 13, z], [-9, 13, z]])} fill={bug(karistir(LG.sivaGolge, LG.sivaIsik, 0.55), 30)} />
      {/* arka duvara düşen sıcak lekeler (z22 avizeleri) — 2 basamak, net kenar */}
      {A.filter((a) => a.z === 22).map((a, i) => { const c = ek(K, a.u, 6.5, z), R = 3.2 * pxm(K, a.u, 6.5, z) * a.hale; return <g key={i} opacity={a.yanik}>
        <ellipse cx={c[0]} cy={c[1]} rx={R} ry={R * 1.25} fill={bug(LG.havuz[2], 30)} opacity={0.85} />
        <ellipse cx={c[0]} cy={c[1] - R * 0.1} rx={R * 0.62} ry={R * 0.8} fill={bug(LG.havuz[1], 30)} opacity={0.85} />
      </g>; })}
      {/* arka sütun dizisi (U dönüşü) + saçaklık */}
      {[-4, 0, 4].map((u) => <Sutun key={u} K={K} u={u} z={29} isik={0.6} uid={`${uid}a${u}`} />)}
      <polygon points={dunyaPoly(K, [[-6, 10, 28.6], [6, 10, 28.6], [6, 11.4, 28.6], [-6, 11.4, 28.6]])} fill={bug("#a9969e", 29)} stroke={ink(LG.sutOrta)} strokeWidth={2} />
      <polyline points={dunyaPoly(K, [[-6, 11.4, 28.6], [6, 11.4, 28.6]])} stroke={bug(LG.kenar, 29)} strokeWidth={2.5} fill="none" />
      <polygon points={dunyaPoly(K, [[-6, 10.95, 28.6], [6, 10.95, 28.6], [6, 11.05, 28.6], [-6, 11.05, 28.6]])} fill={bug(LG.sutGolge, 29)} />
    </g>
  );
};

// ======================================================= AVİZE =======================================================
const AvizeHale: React.FC<{ K: SalonKam; a: AvizeDurum }> = ({ K, a }) => {
  if (a.yanik <= 0) return null;
  const c = ek(K, a.u, SALON.avizeH, a.z), D = 2.2 * pxm(K, a.u, SALON.avizeH, a.z);
  return <g opacity={a.yanik}>
    <circle cx={c[0]} cy={c[1]} r={D * 0.95 * a.hale} fill={LG.altin} opacity={0.21} />
    <circle cx={c[0]} cy={c[1]} r={D * 0.55 * a.hale} fill={LG.havuz[0]} opacity={0.3} />
  </g>;
};
const Avize: React.FC<{ K: SalonKam; a: AvizeDurum }> = ({ K, a }) => {
  const H = SALON.avizeH, m = pxm(K, a.u, H, a.z), kat: [number, number, number][] = [[0.45, H + 0.45, 10], [1.1, H, 16], [0.7, H - 0.45, 12]];
  const ust = ek(K, a.u, SALON.tavan, a.z), alt = ek(K, a.u, H - 0.8, a.z);
  const metal = LG.metal, mw = Math.max(1.6, 0.055 * m);
  const yanik = a.yanik, nokta = yanik > 0 ? LG.cekirdek : a.filaman ? LG.filaman : "#6e5a52";
  return (
    <g strokeLinecap="round">
      <line x1={ust[0]} y1={ust[1]} x2={alt[0]} y2={alt[1]} stroke={metal} strokeWidth={mw * 1.2} />
      {/* zincir halkaları */}
      {Array.from({ length: 10 }, (_, i) => { const q = ek(K, a.u, H + 0.7 + i * 0.5, a.z); return <ellipse key={i} cx={q[0]} cy={q[1]} rx={mw * 0.9} ry={mw * 1.6} fill="none" stroke={metal} strokeWidth={mw * 0.5} />; })}
      {/* kollar: merkez dikmeden orta halkaya 6 kavis */}
      {Array.from({ length: 6 }, (_, i) => { const t = (i / 6) * Math.PI * 2 + 0.3, r = kat[1][0]; const o = ek(K, a.u, H + 0.3, a.z), e = ek(K, a.u + Math.cos(t) * r, H, a.z + Math.sin(t) * r), mid = ek(K, a.u + Math.cos(t) * r * 0.5, H - 0.12, a.z + Math.sin(t) * r * 0.5); return <path key={i} d={`M${o[0]} ${o[1]} Q${mid[0]} ${mid[1]} ${e[0]} ${e[1]}`} stroke={metal} strokeWidth={mw * 0.7} fill="none" />; })}
      {kat.map(([r, h, n], i) => {
        const c = yatayCember(K, [a.u, h, a.z], r, 32);
        return <g key={i}>
          <polygon points={ptsS(c)} fill="none" stroke={metal} strokeWidth={mw} strokeLinejoin="round" />
          {yanik > 0 && <polygon points={ptsS(c.map((q) => [q[0], q[1] + mw * 0.55] as P))} fill="none" stroke={LG.kenarLamba} strokeWidth={Math.max(1.5, mw * 0.35)} opacity={0.8 * yanik} />}
          {Array.from({ length: n }, (_, j) => { const t = (j / n) * Math.PI * 2 + i * 0.2, q = prj(K, a.u + Math.cos(t) * r, h + 0.06, a.z + Math.sin(t) * r), rr = Math.max(1.6, (0.055 * K.F) / q[2]); return <g key={j}>
            {yanik > 0 && <circle cx={q[0]} cy={q[1]} r={rr * 1.5} fill={LG.altin} opacity={0.3 * yanik} />}
            <circle cx={q[0]} cy={q[1]} r={a.filaman ? rr * 0.7 : rr} fill={nokta} />
          </g>; })}
        </g>;
      })}
      {/* alt katın altında 6 kısa sarkıt izi + uç damla */}
      {Array.from({ length: 6 }, (_, j) => { const t = (j / 6) * Math.PI * 2 + 0.5, q0 = ek(K, a.u + Math.cos(t) * 0.55, H - 0.45, a.z + Math.sin(t) * 0.55), q1 = ek(K, a.u + Math.cos(t) * 0.55, H - 0.68, a.z + Math.sin(t) * 0.55); return <line key={j} x1={q0[0]} y1={q0[1]} x2={q1[0]} y2={q1[1]} stroke={metal} strokeWidth={mw * 0.5} />; })}
      <circle cx={alt[0]} cy={alt[1]} r={mw * 1.3} fill={metal} />
    </g>
  );
};

// ======================================================= SAHNE + ORKESTRA =======================================================
type Calgici = { u: number; z: number; h: number; kod: Siluet40Kod; yon: 1 | -1; egil: number; calgi: "keman" | "cello" | "nefes" | "yok"; renk: string; boy: number };
const orkestra = (): Calgici[] => {
  const out: Calgici[] = [];
  const ekle = (u: number, z: number, h: number, i: number, calgi: Calgici["calgi"]) => {
    const r = (k: string) => rnd(S + 50, `${k}${i}`);
    const kod = (["yasli", "uzun-ince", "topuzlu", "uzun-ince", "yasli"] as Siluet40Kod[])[Math.floor(r("k") * 5)];
    out.push({ u: u + (r("u") - 0.5) * 0.18, z: z + (r("z") - 0.5) * 0.25, h, kod, yon: (u < 0.2 ? 1 : -1) as 1 | -1, egil: -6 + r("e") * 18, calgi, renk: LG.muzisyen[Math.floor(r("r") * 4)], boy: 0.96 + r("b") * 0.08 });
  };
  let i = 0;
  // ön yay (yaylılar) — şefin iki yanı açık
  for (const u of [-4.7, -3.9, -3.1, -2.3, -1.5, 0.95, 3.0, 3.8, 4.6]) ekle(u, 12.9 + 0.05 * u * u, SALON.sahneH, i++, u < 0 ? "keman" : "cello");
  // ikinci sıra — davul bölgesi (u 1.3–2.8) boş, yalnız önündeki nefesli
  for (const u of [-4.3, -3.4, -2.5, -1.6, -0.7, 0.4, 3.3, 4.2]) ekle(u, 14.15 + 0.03 * u * u, SALON.sahneH, i++, u < -1 ? "keman" : "nefes");
  // kademeler
  for (const u of [-4.4, -3.4, -2.4, -1.4, -0.4, 0.6, 3.4, 4.4]) ekle(u, 15.7, 1.4, i++, "nefes");
  for (const u of [-3.9, -2.8, -1.7, -0.6, 0.5, 1.6, 2.7, 3.8]) ekle(u, 17.6, 1.8, i++, i % 3 ? "nefes" : "yok");
  for (const u of [-3.0, -1.2, 0.9, 2.6]) ekle(u, 19.5, 2.2, i++, "yok");
  return out;
};
const ORKESTRA = orkestra();

const CalgiciCiz: React.FC<{ K: SalonKam; c: Calgici }> = ({ K, c }) => {
  const bug = useBug();
  const a = ek(K, c.u, c.h, c.z), m = pxm(K, c.u, c.h, c.z) * c.boy, oturak = 0.46;
  const g = siluet40Yol(c.kod, { oturan: oturak, profil: true });
  const T = (x: number, y: number): P => [a[0] + x * m * c.yon, a[1] - y * m];
  const renk = bug(karistir(c.renk, LG.derin, 0.35), c.z), by = g.basM, kalca = g.kalca;
  const kw = Math.max(1.5, 0.012 * m);
  return (
    <g>
      <ellipse cx={a[0] + 0.15 * m * c.yon} cy={a[1]} rx={0.36 * m} ry={0.05 * m} fill="#1f1d30" opacity={0.55} />
      {/* sandalye: oturak + iki ayak (koyu), arkalık */}
      <g stroke={bug(LG.cerceve, c.z)} strokeWidth={Math.max(1.5, 0.025 * m)}>
        <line x1={T(-0.2, oturak)[0]} y1={T(-0.2, oturak)[1]} x2={T(-0.2, 0)[0]} y2={T(-0.2, 0)[1]} />
        <line x1={T(0.25, oturak)[0]} y1={T(0.25, oturak)[1]} x2={T(0.25, 0)[0]} y2={T(0.25, 0)[1]} />
        <line x1={T(-0.22, oturak)[0]} y1={T(-0.22, oturak)[1]} x2={T(-0.26, oturak + 0.42)[0]} y2={T(-0.26, oturak + 0.42)[1]} />
      </g>
      {c.calgi === "cello" && <g>
        <ellipse cx={T(0.42, kalca + 0.12)[0]} cy={T(0.42, kalca + 0.12)[1]} rx={0.12 * m} ry={0.24 * m} fill={bug(karistir(LG.keman, LG.derin, 0.3), c.z)} stroke={ink(LG.keman)} strokeWidth={kw} />
        <line x1={T(0.4, kalca + 0.35)[0]} y1={T(0.4, kalca + 0.35)[1]} x2={T(0.32, by + 0.15)[0]} y2={T(0.32, by + 0.15)[1]} stroke={ink(LG.keman)} strokeWidth={kw * 1.4} />
        <line x1={T(0.42, -0.0)[0]} y1={T(0.42, 0)[1]} x2={T(0.42, kalca - 0.12)[0]} y2={T(0.42, kalca - 0.12)[1]} stroke={ink(LG.keman)} strokeWidth={kw} />
      </g>}
      <SiluetFigur40 kod={c.kod} ayak={a} pxm={m} renk={renk} kenar={{ renk: LG.kenar, dx: -c.yon * 1.2, dy: -2.8 }} yon={c.yon} oturan={oturak} profil egil={c.egil} golge={false} />
      {c.calgi === "keman" && <g>
        <ellipse cx={T(0.1, by - 0.13)[0]} cy={T(0.1, by - 0.13)[1]} rx={0.13 * m} ry={0.055 * m} transform={`rotate(${-18 * c.yon} ${T(0.1, by - 0.13)[0]} ${T(0.1, by - 0.13)[1]})`} fill={bug(LG.keman, c.z)} stroke={ink(LG.keman)} strokeWidth={kw} />
        <line x1={T(0.0, by - 0.02)[0]} y1={T(0.0, by - 0.02)[1]} x2={T(0.55, by - 0.32)[0]} y2={T(0.55, by - 0.32)[1]} stroke="#5a3f4a" strokeWidth={kw} />
      </g>}
      {c.calgi === "nefes" && <line x1={T(0.1, by - 0.04)[0]} y1={T(0.1, by - 0.04)[1]} x2={T(0.32, by - 0.5)[0]} y2={T(0.32, by - 0.5)[1]} stroke={bug("#2e2c3a", c.z)} strokeWidth={Math.max(2, 0.04 * m)} strokeLinecap="round" />}
    </g>
  );
};

/** nota sehpası: çalgıcıların önünde, kameraya sırtı dönük (koyu tabla arkası + üst kenar ışığı) */
const Sehpa: React.FC<{ K: SalonKam; u: number; z: number; h: number; boy?: number; tabla?: [number, number] }> = ({ K, u, z, h, boy = 1.12, tabla = [0.22, 0.29] }) => {
  const bug = useBug();
  const m = pxm(K, u, h, z), a = ek(K, u, h, z), t0 = ek(K, u, h + boy, z);
  const w = tabla[0] * m, hh = tabla[1] * m;
  return <g>
    <line x1={a[0]} y1={a[1]} x2={t0[0]} y2={t0[1]} stroke={bug(LG.sehpa, z)} strokeWidth={Math.max(1.5, 0.03 * m)} />
    {[-1, 1, 0].map((s) => <line key={s} x1={a[0]} y1={a[1] - 0.12 * m} x2={a[0] + s * 0.16 * m} y2={a[1] + (s === 0 ? 0.03 * m : 0)} stroke={bug(LG.sehpa, z)} strokeWidth={Math.max(1.5, 0.02 * m)} />)}
    <polygon points={ptsS([[t0[0] - w, t0[1] - hh], [t0[0] + w, t0[1] - hh], [t0[0] + w * 0.96, t0[1]], [t0[0] - w * 0.96, t0[1]]])} fill={bug(LG.sehpa, z)} stroke={ink(LG.sehpa)} strokeWidth={1.6} />
    <line x1={t0[0] - w} y1={t0[1] - hh} x2={t0[0] + w} y2={t0[1] - hh} stroke={bug(LG.sehpaKenar, z)} strokeWidth={2} />
    {/* tabladan taşan nota kâğıdı kenarı (kameradan yalnız üst şerit) */}
    <rect x={t0[0] - w * 0.8} y={t0[1] - hh - 0.05 * m} width={w * 1.6} height={0.05 * m} fill={bug(LG.nota, z)} />
  </g>;
};

const SahneZemin: React.FC<{ K: SalonKam; L: V3; uid: string }> = ({ K, L, uid }) => {
  const bug = useBug();
  const W = 5.4, H = SALON.sahneH;
  const ust: V3[] = [[-W, H, SALON.sahneOn], [W, H, SALON.sahneOn], [W, H, SALON.sahneArka], [-W, H, SALON.sahneArka]];
  const derzler = Array.from({ length: 46 }, (_, i) => -W + 0.24 * i);
  // havuz: avize grubunun altında, f80–96 davula doğru kaymış (merkez u≈1.2, z≈14.6) — 3 basamak net kenarlı
  const hc: V3 = [1.1, H, 14.4];
  const havuz = (k: number) => ptsS(Array.from({ length: 40 }, (_, i) => { const t = (i / 40) * Math.PI * 2; return ek(K, hc[0] + Math.cos(t) * 4.2 * k, H, hc[2] + Math.sin(t) * 2.6 * k); }));
  void L;
  return (
    <g>
      <polygon points={dunyaPoly(K, ust)} fill={LG.tahtaGolge} />
      <g clipPath={`url(#${uid}st)`}>
        <defs><clipPath id={`${uid}st`}><polygon points={dunyaPoly(K, ust)} /></clipPath></defs>
        <polygon points={havuz(1)} fill={LG.havuz[2]} opacity={0.8} />
        <polygon points={havuz(0.7)} fill={LG.havuz[1]} opacity={0.85} />
        <polygon points={havuz(0.42)} fill={LG.havuz[0]} opacity={0.8} />
        {derzler.map((u, i) => <polyline key={i} points={dunyaPoly(K, [[u, H, SALON.sahneOn], [u, H, 15]])} stroke={LG.derz} strokeWidth={1.6} opacity={0.55} fill="none" />)}
        {derzler.filter((_, i) => rnd(S + 60, `d${i}`) < 0.2).map((u, i) => <polyline key={`d${i}`} points={dunyaPoly(K, [[u + 0.1, H, 11.3 + rnd(S + 60, `a${i}`) * 2], [u + 0.1, H, 12.6 + rnd(S + 60, `b${i}`) * 2]])} stroke="#8a6d62" strokeWidth={1.5} opacity={0.3} fill="none" />)}
      </g>
      {/* kademeler: ön yüz (koyu ahşap, üst kenar gölgesi taramalı) + üst yüz (havuz ucu sıcak) */}
      {[...SALON.kademe].reverse().map((k, i) => {
        const z1 = SALON.sahneArka, h0 = k.h - 0.4;
        const on = [ek(K, -W, h0, k.z), ek(K, W, h0, k.z), ek(K, W, k.h, k.z), ek(K, -W, k.h, k.z)];
        const ustK: V3[] = [[-W, k.h, k.z], [W, k.h, k.z], [W, k.h, z1], [-W, k.h, z1]];
        return <g key={i}>
          <polygon points={dunyaPoly(K, ustK)} fill={bug(karistir(LG.tahtaGolge, LG.tahtaIsik, 0.45), k.z)} />
          <polygon points={ptsS(on)} fill={bug("#4a4060", k.z)} />
          <Tarama sekil={on} basamak="III" aci={72} renk={LG.tarama} derinlik="orta" seed={S + 70 + i} alfaCarpan={0.7} />
          <polyline points={dunyaPoly(K, [[-W, k.h, k.z], [W, k.h, k.z]])} stroke={bug(LG.kenarLamba, k.z)} strokeWidth={2} fill="none" />
        </g>;
      })}
    </g>
  );
};

// ---- davul (u 2.2, z 15.7, 1. kademe) + gizli davulcunun kolları + iki çubuk (imza) ----
const DAVUL = { u: 2.2, z: 15.75, h: 1.4, r: 0.18, alt: 1.9, ust: 2.08 };
const Davul: React.FC<{ K: SalonKam; parilti: number }> = ({ K, parilti }) => {
  const bug = useBug();
  const d = DAVUL, m = pxm(K, d.u, d.ust, d.z);
  const sol = ek(K, d.u - d.r, d.ust, d.z), sag = ek(K, d.u + d.r, d.ust, d.z), solA = ek(K, d.u - d.r, d.alt, d.z), sagA = ek(K, d.u + d.r, d.alt, d.z);
  const yan = [sol, sag, sagA, solA];
  const bant = 0.03 * m;
  const cember = yatayCember(K, [d.u, d.ust, d.z], d.r, 24);
  // ayaklık
  const a0 = ek(K, d.u, d.h, d.z), a1 = ek(K, d.u, d.alt, d.z);
  return <g>
    <g stroke={bug(LG.sehpa, d.z)} strokeWidth={2}>
      <line x1={a1[0]} y1={a1[1]} x2={a0[0]} y2={a0[1]} />
      <line x1={a1[0] - 2} y1={a1[1] + 8} x2={a0[0] - 0.2 * m} y2={a0[1]} /><line x1={a1[0] + 2} y1={a1[1] + 8} x2={a0[0] + 0.2 * m} y2={a0[1]} />
    </g>
    <polygon points={ptsS(cember)} fill={bug("#8f8aa8", d.z)} />
    <polygon points={ptsS(yan)} fill={bug(LG.davulGovde, d.z)} stroke={ink(LG.davulGovde)} strokeWidth={2} />
    <rect x={sol[0]} y={sol[1] - 1} width={sag[0] - sol[0]} height={bant} fill={bug(LG.kasnak, d.z)} />
    <rect x={solA[0]} y={solA[1] - bant} width={sagA[0] - solA[0]} height={bant} fill={bug(LG.kasnak, d.z)} />
    {[0.18, 0.5, 0.82].map((t, i) => <rect key={i} x={sol[0] + (sag[0] - sol[0]) * t - 1.5} y={sol[1] + bant} width={3} height={solA[1] - sol[1] - 2 * bant} fill="#8a8494" />)}
    {/* havuzun son ucu: kasnak üst yarısında gül kenar ışığı yayı */}
    <path d={`M${sol[0] - 1} ${sol[1] + 1} Q${(sol[0] + sag[0]) / 2} ${sol[1] - 5} ${sag[0] + 1} ${sag[1] + 1}`} stroke={LG.kenarLamba} strokeWidth={3} fill="none" opacity={parilti} />
  </g>;
};
const Cubuklar: React.FC<{ K: SalonKam; parilti: number; kilit?: SablonProps["kilit"] }> = ({ K, parilti, kilit }) => {
  const bug = useBug();
  // eller (kademe 1 üstünde oturan davulcu; gövdesi sehpa ve önündeki nefeslinin arkasında)
  const eller: [V3, V3, V3][] = [ // [omuz (sehpa arkası), el, çubuk ucu]
    [[2.05, 2.42, 16.15], [2.02, 2.13, 15.8], [1.74, 2.33, 15.55]],
    [[2.42, 2.42, 16.15], [2.42, 2.12, 15.8], [2.7, 2.31, 15.55]],
  ];
  return <g strokeLinecap="round">
    {eller.map(([o, e, u], i) => {
      const O = ek(K, o[0], o[1], o[2]), E = ek(K, e[0], e[1], e[2]), U = ek(K, u[0], u[1], u[2]), m = pxm(K, e[0], e[1], e[2]);
      // çubuk: elin 3 cm gerisinden uca; kalınlık okunurluk için büyütüldü (lint okunurluk_cubuk_P12)
      const g0: P = [E[0] - (U[0] - E[0]) * 0.12, E[1] - (U[1] - E[1]) * 0.12];
      const w = Math.max(4.5, 0.021 * m * 2.2);
      if (kilit) kilit.push({ ad: `cubuk${i}`, p: U, tur: "dokunus" });
      return <g key={i}>
        <path d={`M${O[0]} ${O[1]} L${E[0]} ${E[1]}`} stroke={bug("#4a4d44", 16)} strokeWidth={0.07 * m} />
        <line x1={g0[0]} y1={g0[1]} x2={U[0]} y2={U[1]} stroke={LG.cubukKontur} strokeWidth={w + 2} />
        <line x1={g0[0]} y1={g0[1]} x2={U[0]} y2={U[1]} stroke={LG.cubuk} strokeWidth={w} />
        <line x1={g0[0]} y1={g0[1] + w * 0.25} x2={U[0]} y2={U[1] + w * 0.25} stroke={LG.cubukGolge} strokeWidth={w * 0.4} />
        <circle cx={U[0]} cy={U[1]} r={w * 0.72} fill={LG.cubuk} stroke={LG.cubukKontur} strokeWidth={1.2} />
        {/* ilk parıltı: üst kenar + tek spekülar hilal (çubuk ışık yaymaz, hale yok) */}
        <line x1={g0[0]} y1={g0[1] - w * 0.3} x2={U[0]} y2={U[1] - w * 0.3} stroke={LG.cubukKenar} strokeWidth={1.6} opacity={parilti} />
        <circle cx={U[0] - w * 0.15} cy={U[1] - w * 0.3} r={w * 0.3} fill={LG.cubukSpek} opacity={parilti} />
        <ellipse cx={E[0]} cy={E[1]} rx={0.05 * m} ry={0.045 * m} fill={bug(LG.tenGolge, 16)} />
      </g>;
    })}
  </g>;
};

// ---- Eliasberg sırttan (kahraman; Kukla takim40'ta sırt görünümü yok → aynı paletle sırt figürü, kollar konikKol + GravurEl) ----
const Sef: React.FC<{ K: SalonKam; kol: number; L: V3 }> = ({ K, kol, L }) => {
  const u0 = 0, z0 = 12, h0 = 1.3, m = pxm(K, u0, h0, z0), a = ek(K, u0, h0, z0);
  const T = (x: number, y: number): P => [a[0] + x * m, a[1] - y * m];
  const lerp = (A: number, B: number) => A + (B - A) * kol;
  // şef kolları: hazır duruş (dirsek dışa, el göğüs önünde) → Y (eller baş üstü, dışa). El ekseni bilekte kırık: parmaklar dışa-öne
  // (yatay +25°), avuç aşağı — "eller yukarı / teslim" okunmaz (tur-1 iç teşhis). Arkadan elin sırtı görünür.
  const kollar = [-1, 1].map((s) => {
    const omuz = T(s * 0.2, 1.43), dirsek = T(s * lerp(0.4, 0.5), lerp(1.2, 1.6)), bilek = T(s * lerp(0.38, 0.66), lerp(1.36, 1.86));
    const elAci = s > 0 ? lerp(-10, -38) : 180 + lerp(10, 38);
    return { s, omuz, dirsek, bilek, elAci, k: konikKol(omuz, dirsek, bilek, [0.15 * m, 0.125 * m, 0.095 * m]) };
  });
  const govde = `M${T(-0.23, 0.74)} L${T(-0.25, 1.1)} Q${T(-0.27, 1.38)} ${T(-0.22, 1.45)} Q${T(-0.12, 1.5)} ${T(-0.06, 1.5)} L${T(0.06, 1.5)} Q${T(0.12, 1.5)} ${T(0.22, 1.45)} Q${T(0.27, 1.38)} ${T(0.25, 1.1)} L${T(0.23, 0.74)} Z`.replace(/,/g, " ");
  const bas = (dy = 0) => `M${T(-0.085, 1.56 + dy)} Q${T(-0.095, 1.74 + dy)} ${T(0, 1.76 + dy)} Q${T(0.095, 1.74 + dy)} ${T(0.085, 1.56 + dy)} Q${T(0.06, 1.5 + dy)} ${T(0, 1.5 + dy)} Q${T(-0.06, 1.5 + dy)} ${T(-0.085, 1.56 + dy)}Z`.replace(/,/g, " ");
  // gölge: tek kaynaktan (avize ağırlık merkezi) podyuma; kısa, kameraya doğru
  const gp = ([[-0.15, 0], [0.15, 0], [-0.25, 1.43], [0.25, 1.43], [0, 1.76], [-0.55, 1.9], [0.55, 1.9]] as P[]).map(([x, y]) => { const g = golgeNokta(L, [u0 + x, h0 + y, z0], h0); return ek(K, g[0], h0, g[2]); });
  const sil = (renk: string) => <g fill={renk}>
    <path d={govde} />{kollar.map((k) => <path key={k.s} d={k.k.d} />)}<path d={bas()} />
  </g>;
  const ISIK: P = [0, -1];
  return (
    <g strokeLinejoin="round">
      <polygon points={ptsS(zarf(gp))} fill="#2a2640" opacity={0.55} />
      <ellipse cx={a[0]} cy={a[1]} rx={0.3 * m} ry={0.05 * m} fill="#1c1a2c" opacity={0.75} />
      {/* bacaklar + ayakkabı */}
      {[-1, 1].map((s) => <g key={s}>
        <path d={`M${T(s * 0.03, 0.78)} L${T(s * 0.2, 0.78)} L${T(s * 0.17, 0.06)} L${T(s * 0.05, 0.06)}Z`.replace(/,/g, " ")} fill={LG.pantolon} stroke={ink(LG.pantolon)} strokeWidth={2} />
        <ellipse cx={T(s * 0.11, 0.035)[0]} cy={T(s * 0.11, 0.035)[1]} rx={0.075 * m} ry={0.04 * m} fill="#1e1c26" />
      </g>)}
      {/* sıcak kenar ışığı: siluetin yukarı kaydırılmış kopyası (ışık önden-üstten → omuz, kol üstü, saç tepesi) */}
      <g transform="translate(0 -3)">{sil(LG.kenar)}</g>
      <path d={govde} fill={LG.ceketGolge} stroke={ink(LG.ceket)} strokeWidth={2.5} />
      {/* sırt orta dikişi + yırtmaç; kürek kemikleri arası hafif ışık */}
      <path d={`M${T(0, 1.46)} L${T(0, 0.92)}`.replace(/,/g, " ")} stroke={ink(LG.ceket)} strokeWidth={2} />
      <path d={`M${T(-0.2, 1.36)} Q${T(0, 1.42)} ${T(0.2, 1.36)}`.replace(/,/g, " ")} stroke={LG.ceket} strokeWidth={0.1 * m} fill="none" opacity={0.8} />
      {/* kol altı taraması (ışık almayan) */}
      {kollar.map((k) => <Tarama key={`t${k.s}`} sekil={[T(k.s * 0.24, 1.36), T(k.s * 0.12, 1.3), T(k.s * 0.14, 1.06), T(k.s * 0.25, 1.1)]} basamak="III" aci={72} renk={LG.tarama} derinlik="yakin" seed={S + 80 + k.s} />)}
      {kollar.map((k) => <g key={k.s}>
        <path d={k.k.d} fill={LG.ceket} stroke={ink(LG.ceket)} strokeWidth={2.2} />
        {/* bol manşet: gömlek kenarı bilekte */}
        <line x1={k.k.ileri(-0.03 * m)[0]} y1={k.k.ileri(-0.03 * m)[1]} x2={k.k.ileri(0.005 * m)[0]} y2={k.k.ileri(0.005 * m)[1]} stroke={LG.gomlek} strokeWidth={0.085 * m} />
        <GravurEl bilek={k.k.ileri(0.01 * m)} aci={k.elAci} E={0.19 * m} poz={GRAVUR_POZ.gevsek} ayna={k.s < 0} palet={kenarEl} isik={ISIK} taramaAci={72} taramasiz />
      </g>)}
      {/* yaka (koyu ceket yakası boynu örter, üstünde ince ecru gömlek yakası), kulaklar, baş (kısa koyu saç, ense ince) */}
      <path d={`M${T(-0.1, 1.45)} L${T(-0.075, 1.555)} Q${T(0, 1.575)} ${T(0.075, 1.555)} L${T(0.1, 1.45)}Z`.replace(/,/g, " ")} fill={LG.ceketGolge} stroke={ink(LG.ceket)} strokeWidth={2} />
      <path d={`M${T(-0.07, 1.555)} Q${T(0, 1.575)} ${T(0.07, 1.555)}`.replace(/,/g, " ")} stroke={LG.gomlek} strokeWidth={0.018 * m} fill="none" />
      {[-1, 1].map((s) => <ellipse key={s} cx={T(s * 0.088, 1.64)[0]} cy={T(s * 0.088, 1.64)[1]} rx={0.018 * m} ry={0.03 * m} fill={LG.tenGolge} stroke={ink(LG.tenGolge)} strokeWidth={1.5} />)}
      <path d={bas(0.015)} fill={LG.sac} stroke={ink(LG.sac)} strokeWidth={2} />
      <path d={`M${T(-0.05, 1.57)} Q${T(0, 1.56)} ${T(0.05, 1.57)}`.replace(/,/g, " ")} stroke={LG.tenGolge} strokeWidth={0.012 * m} fill="none" />
    </g>
  );
};

// ======================================================= SEYİRCİ (arkadan) =======================================================
type BasTip = "kisa" | "topuz" | "kel" | "kasket" | "esarp";
const SAC = ["#2a2226", "#54402f", "#5a4638", "#7a6e6a", "#6e5444", "#7a5c44"];
const Seyirci: React.FC<{ x: number; y: number; B: number; tip: BasTip; sac: string; palto: string; egim: number; yaka: number; isik: number }> = ({ x, y, B, tip, sac: sac0, palto: palto0, egim, yaka, isik }) => {
  // arkadan (kameraya bakan sırt) ışık: yalnız kişinin GERİSİNDE kalan avizelerden (tek kaynak listesi) — ön sıralar gölgede, kenar ışıklı
  const palto = karistir(palto0, LG.havuz[2], 0.42 * isik), sac = karistir(sac0, "#8a6c58", 0.4 * isik);
  const w = B, h = B * 1.18, oy = y + h * 0.62, ow = B * 1.38, kw = Math.max(1.5, B * 0.02);
  const omuz = `M${x - w * 0.28} ${oy - h * 0.12} C${x - w * 0.5} ${oy} ${x - ow * 0.8} ${oy} ${x - ow} ${oy + B * 0.35} L${x - ow * 1.08} ${oy + B * 3.2} L${x + ow * 1.08} ${oy + B * 3.2} L${x + ow} ${oy + B * 0.35} C${x + ow * 0.8} ${oy} ${x + w * 0.5} ${oy} ${x + w * 0.28} ${oy - h * 0.12}Z`;
  const kafa = `M${x - w / 2} ${y} C${x - w / 2} ${y - h * 0.62} ${x + w / 2} ${y - h * 0.62} ${x + w / 2} ${y} C${x + w * 0.48} ${y + h * 0.3} ${x + w * 0.3} ${y + h * 0.48} ${x} ${y + h * 0.5} C${x - w * 0.3} ${y + h * 0.48} ${x - w * 0.48} ${y + h * 0.3} ${x - w / 2} ${y}Z`;
  const rim = (d: string) => <path d={d} stroke={LG.kenar} strokeWidth={Math.max(2, B * 0.035)} fill="none" strokeLinecap="round" />;
  return (
    <g>
      <path d={omuz} fill={palto} stroke={ink(palto)} strokeWidth={kw} />
      {rim(`M${x - ow * 0.95} ${oy + B * 0.3} C${x - ow * 0.8} ${oy + 2} ${x - w * 0.5} ${oy} ${x - w * 0.3} ${oy - h * 0.1}`)}
      {rim(`M${x + ow * 0.95} ${oy + B * 0.3} C${x + ow * 0.8} ${oy + 2} ${x + w * 0.5} ${oy} ${x + w * 0.3} ${oy - h * 0.1}`)}
      {/* yaka: kalkık palto yakası ya da gömlek */}
      {yaka > 0.5
        ? <path d={`M${x - w * 0.42} ${oy + B * 0.05} L${x - w * 0.36} ${oy - h * 0.3} Q${x} ${oy - h * 0.22} ${x + w * 0.36} ${oy - h * 0.3} L${x + w * 0.42} ${oy + B * 0.05} Q${x} ${oy - h * 0.05} ${x - w * 0.42} ${oy + B * 0.05}Z`} fill={karistir(palto, "#000000", 0.15)} stroke={ink(palto)} strokeWidth={kw} />
        : <rect x={x - w * 0.24} y={oy - h * 0.2} width={w * 0.48} height={h * 0.2} fill={LG.tenGolge} />}
      <g transform={`rotate(${egim} ${x} ${oy - h * 0.1})`}>
        {[-1, 1].map((s) => <ellipse key={s} cx={x + s * w * 0.5} cy={y + h * 0.06} rx={w * 0.09} ry={h * 0.13} fill={LG.tenGolge} stroke={ink(LG.tenGolge)} strokeWidth={kw} />)}
        <path d={kafa} fill={tip === "kel" ? karistir(LG.tenGolge, LG.ten, 0.5 * isik) : tip === "esarp" ? "#7a6670" : sac} stroke={ink(sac)} strokeWidth={kw} />
        {tip === "kisa" && <path d={`M${x - w * 0.32} ${y + h * 0.36} Q${x} ${y + h * 0.3} ${x + w * 0.32} ${y + h * 0.36} L${x + w * 0.24} ${y + h * 0.47} Q${x} ${y + h * 0.52} ${x - w * 0.24} ${y + h * 0.47}Z`} fill={LG.tenGolge} />}
        {tip === "kel" && <path d={`M${x - w * 0.5} ${y + h * 0.02} Q${x} ${y + h * 0.22} ${x + w * 0.5} ${y + h * 0.02} L${x + w * 0.42} ${y + h * 0.3} Q${x} ${y + h * 0.42} ${x - w * 0.42} ${y + h * 0.3}Z`} fill={sac} />}
        {tip === "topuz" && <circle cx={x} cy={y + h * 0.05} r={w * 0.24} fill={sac} stroke={ink(sac)} strokeWidth={kw} />}
        {tip === "kasket" && <path d={`M${x - w * 0.56} ${y - h * 0.02} C${x - w * 0.6} ${y - h * 0.66} ${x + w * 0.6} ${y - h * 0.66} ${x + w * 0.56} ${y - h * 0.02} L${x + w * 0.5} ${y + h * 0.06} L${x - w * 0.5} ${y + h * 0.06}Z`} fill={LG.kasket} stroke={ink(LG.kasket)} strokeWidth={kw} />}
        {tip === "esarp" && <path d={`M${x - w * 0.12} ${y + h * 0.46} L${x} ${y + h * 0.72} L${x + w * 0.14} ${y + h * 0.46}Z`} fill="#7a6670" />}
        {rim(`M${x - w * 0.42} ${y - h * 0.3} Q${x - w * 0.1} ${y - h * 0.5} ${x + w * 0.28} ${y - h * 0.4}`)}
      </g>
    </g>
  );
};

type Koltuk = { u: number; z: number; bos: boolean; tip: BasTip; sac: string; palto: string; egim: number; yaka: number; boy: number };
const SIRALAR = [9.7, 8.8, 7.9, 7.0, 6.1, 5.2, 4.3, 3.4, 2.5];
const koltuklar = (z: number, ri: number): Koltuk[] => {
  const out: Koltuk[] = [];
  for (let k = 0; k < 26; k++) {
    const u = -6.6 + k * 0.56 + (ri % 2) * 0.28 + (rnd(S + 90, `u${ri}-${k}`) - 0.5) * 0.14;
    if (u > -5.0 && u < -4.2) continue; // yan koridor (u ≈ −4.6; mekanlar §2 "u ≈ −1.6" kameranın yanında ölü kama bırakıyordu → tablo)
    if (u > 6.6) break;
    const r = (s: string) => rnd(S + 90, `${s}${ri}-${k}`);
    const tipR = r("t");
    const tip: BasTip = tipR < 0.42 ? "kisa" : tipR < 0.62 ? "topuz" : tipR < 0.74 ? "kel" : tipR < 0.84 ? "esarp" : tipR < 0.9 ? "kasket" : "kisa";
    out.push({ u, z: z + (r("z") - 0.5) * 0.14, bos: r("b") < 0.06 && z > 3, tip, sac: SAC[Math.floor(r("s") * SAC.length)], palto: LG.palto[Math.floor(r("p") * 3)], egim: (r("e") - 0.5) * 18, yaka: r("y"), boy: (tip === "topuz" || tip === "esarp" ? -0.05 : 0) + (r("h") - 0.5) * 0.11 });
  }
  return out;
};
const SeyirciSirasi: React.FC<{ K: SalonKam; z: number; ri: number; A: AvizeDurum[] }> = ({ K, z, ri, A }) => {
  const ks = koltuklar(z, ri);
  const arkaIsik = (k: Koltuk) => Math.min(1, A.filter((a) => a.z < k.z - 0.2).reduce((s, a) => s + a.yanik * Math.max(0, 1 - Math.hypot(k.z - a.z, (k.u - a.u) * 0.5) / 5.5), 0));
  return <g>
    {ks.map((k, i) => {
      const hb = 1.17 + k.boy, c = ek(K, k.u, hb, k.z), m = pxm(K, k.u, hb, k.z);
      if (c[0] < -260 || c[0] > 1340) return null;
      // koltuk arkalığı: oturanın arkasında (kameraya yakın), üst kenar h 0.84 — omuz (≈1.0) üstte kalır
      const sirt = [ek(K, k.u - 0.24, 0.84, k.z + 0.3), ek(K, k.u + 0.24, 0.84, k.z + 0.3), ek(K, k.u + 0.24, 0.35, k.z + 0.3), ek(K, k.u - 0.24, 0.35, k.z + 0.3)];
      const isik = arkaIsik(k);
      return <g key={i}>
        {!k.bos && <Seyirci isik={isik} x={c[0]} y={c[1]} B={0.17 * m} tip={k.tip} sac={k.sac} palto={karistir(k.palto, LG.derin, 0.3)} egim={k.egim} yaka={k.yaka} />}
        <polygon points={ptsS(sirt)} fill={karistir(LG.koltukDerin, LG.koltukIsik, 0.7 * isik)} stroke={LG.cerceve} strokeWidth={Math.max(1.5, 0.02 * m)} strokeLinejoin="round" />
        <line x1={sirt[0][0]} y1={sirt[0][1]} x2={sirt[1][0]} y2={sirt[1][1]} stroke={LG.koltukIsik} strokeWidth={Math.max(2, 0.03 * m)} strokeLinecap="round" />
        <polygon points={ptsS([sirt[0], sirt[1], [sirt[1][0], sirt[1][1] + 0.06 * m], [sirt[0][0], sirt[0][1] + 0.06 * m]])} fill={LG.koltukIsik} opacity={0.35} />
      </g>;
    })}
  </g>;
};

// ======================================================= ATMOSFER =======================================================
const Toz: React.FC<{ K: SalonKam; A: AvizeDurum[]; p: number }> = ({ K, A, p }) => <g>
  {Array.from({ length: 48 }, (_, i) => {
    const a = A[Math.floor(rnd(S + 7, `a${i}`) * A.length)];
    if (a.yanik <= 0) return null;
    const u = a.u + (rnd(S + 7, `u${i}`) - 0.5) * 4.5, z = a.z + (rnd(S + 7, `z${i}`) - 0.5) * 4, h = 3 + rnd(S + 7, `h${i}`) * 6 - ((p / 60) * 0.06) % 1;
    if (z < 5) return null;
    const q = prj(K, u, h, z), r = Math.max(1, Math.min(2.2, (0.02 * K.F) / q[2]));
    return <circle key={i} cx={q[0]} cy={q[1]} r={r} fill={LG.toz} opacity={(0.5 + rnd(S + 7, `o${i}`) * 0.3) * a.yanik} />;
  })}
</g>;
/** düz buğu bandı (dünya h aralığı, z derinliğinde) */
const BuguBandi: React.FC<{ K: SalonKam; h0: number; h1: number; z: number; alfa: number }> = ({ K, h0, h1, z, alfa }) => {
  const hedef = React.useContext(BuguCtx);
  const y0 = ek(K, 0, h1, z)[1], y1 = ek(K, 0, h0, z)[1];
  return <rect x={-50} y={y0} width={1180} height={y1 - y0} fill={hedef} opacity={alfa} />;
};

// ======================================================= SAHNE (kompozisyon) =======================================================
const KonserSahne: React.FC<{ plan: SablonProps["plan"]; p: number; kilit: SablonProps["kilit"]; uid: string }> = ({ plan, p, kilit, uid }) => {
  const K = salonKamera(p, param<undefined | { f: number[]; h: number[]; egim: number[] }>(plan, "kamera_yol", undefined));
  const bas = param<number>(plan, "dalga_bas", 30);
  const A = avizeler(p, bas), L = isikMerkezi(A);
  const yanikOran = A.reduce((s, a) => s + a.yanik, 0) / A.length;
  const buguHedef = karistir(LG.uzak, LG.havuz[1], 0.78 * yanikOran);
  const kolA = param<{ bas: number; bit: number }>(plan, "kollar", { bas: 90, bit: 132 });
  const kolT = Math.max(0, Math.min(1, (p - kolA.bas) / (kolA.bit - kolA.bas)));
  const kol = 0.18 + 0.82 * (1 - (1 - kolT) ** 3); // hazır duruştan Y'ye (giriş: hızlı başlar, yavaş oturur)
  const parilti = Math.max(0, Math.min(1, (p - (bas + 60)) / 6)); // f90–96: kasnak + çubuk ilk parıltı
  const sutunIsik = (z: number) => Math.min(1, A.filter((a) => Math.abs(a.z - z) < 5).reduce((s, a) => s + a.yanik * 0.5, 0));
  const uzakAv = A.filter((a) => a.z >= 14), yakinAv = A.filter((a) => a.z < 14);
  const onCalgici = ORKESTRA.filter((c) => c.h === SALON.sahneH), kademeC = (h: number) => ORKESTRA.filter((c) => c.h === h);
  const sirala = (c: Calgici[]) => [...c].sort((a, b) => b.z - a.z);
  return (
    <BuguCtx.Provider value={buguHedef}>
    <g>
      <rect x={-50} y={-50} width={1180} height={2020} fill={LG.golge} />
      {/* katman 1–2: tavan, arka duvar, galeri, uzak sütunlar (flu + buğu) */}
      <Flu id={`${uid}f1`} sigma={2.5}>
        <KonturTitreme derinlik="uzak" seed={S + 1}>
          <Tavan K={K} A={A} />
          <ArkaDuvar K={K} A={A} uid={`${uid}ad`} />
          <Galeri K={K} s={-1} /><Galeri K={K} s={1} />
          <BuguBandi K={K} h0={10.6} h1={13} z={29} alfa={0.18} />
          <BuguBandi K={K} h0={4.6} h1={6.4} z={29} alfa={0.24} />
        </KonturTitreme>
      </Flu>
      <Flu id={`${uid}f2`} sigma={1.2}>
        <KonturTitreme derinlik="orta" seed={S + 2}>
          {[28, 24, 20, 16].flatMap((z) => [-6, 6].map((u) => <Sutun key={`${u}${z}`} K={K} u={u} z={z} isik={sutunIsik(z)} uid={`${uid}s${u}${z}`} />))}
          <Saclik K={K} s={-1} z0={12} z1={28.6} /><Saclik K={K} s={1} z0={12} z1={28.6} />
        </KonturTitreme>
      </Flu>
      {/* avizeler (uzak → yakın), haleler mimarinin önünde (havadaki ışık) */}
      {[...uzakAv].sort((a, b) => b.z - a.z).map((a, i) => <AvizeHale key={`h${i}`} K={K} a={a} />)}
      {[...uzakAv].sort((a, b) => b.z - a.z).map((a, i) => <Avize key={`a${i}`} K={K} a={a} />)}
      {/* katman 3–4: sahne, kademeler, orkestra, davul, Eliasberg */}
      <KonturTitreme derinlik="orta" seed={S + 3}>
        <SahneZemin K={K} L={L} uid={uid} />
        <BuguBandi K={K} h0={2.6} h1={4.2} z={22} alfa={0.14} />
        <Flu id={`${uid}f3`} sigma={1}>
          {sirala(kademeC(2.2)).map((c, i) => <CalgiciCiz key={`k3${i}`} K={K} c={c} />)}
          {sirala(kademeC(1.8)).map((c, i) => <CalgiciCiz key={`k2${i}`} K={K} c={c} />)}
          {[-3.35, -1.15, 1.05, 3.25].map((u) => <Sehpa key={`sk2${u}`} K={K} u={u} z={17.15} h={1.8} />)}
          {sirala(kademeC(1.4)).map((c, i) => <CalgiciCiz key={`k1${i}`} K={K} c={c} />)}
        </Flu>
        {/* gizli davulcu (yüz görünmez: sehpa ve önündeki nefesli örter) + davul + çubuklar */}
        <SiluetFigur40 kod="uzun-ince" ayak={ek(K, 2.2, 1.4, 16.25)} pxm={pxm(K, 2.2, 1.4, 16.25)} renk="#45473f" kenar={{ renk: LG.kenar, dx: 0, dy: -2.5 }} yon={-1} oturan={0.5} profil egil={6} golge={false} />
        <Davul K={K} parilti={parilti} />
        <Cubuklar K={K} parilti={parilti} kilit={kilit} />
        <Sehpa K={K} u={2.22} z={15.4} h={1.4} boy={0.95} tabla={[0.3, 0.5]} /* tabla h 2.35–2.85: davulcunun başı + üst gövdesi örtülür (saklanan) */ />
        <Flu id={`${uid}f4`} sigma={0.6}>
          {[-3.85, -2.05, -0.25, 3.75].map((u) => <Sehpa key={`sk1${u}`} K={K} u={u} z={15.25} h={1.4} />)}
          {sirala(onCalgici.filter((c) => c.z > 13.8)).map((c, i) => <CalgiciCiz key={`o2${i}`} K={K} c={c} />)}
          <CalgiciCiz K={K} c={{ u: 1.15, z: 14.75, h: SALON.sahneH, kod: "yasli", yon: -1, egil: 4, calgi: "nefes", renk: LG.muzisyen[2], boy: 1 }} />
          {[-4.3, -2.7, -1.1, 3.4].map((u) => <Sehpa key={`so${u}`} K={K} u={u} z={13.55 + 0.03 * u * u} h={SALON.sahneH} boy={1.0} />)}
          {sirala(onCalgici.filter((c) => c.z <= 13.8)).map((c, i) => <CalgiciCiz key={`o1${i}`} K={K} c={c} />)}
        </Flu>
        {/* şef podyumu */}
        <polygon points={dunyaPoly(K, [[-0.45, 1.3, 11.6], [0.45, 1.3, 11.6], [0.45, 1.3, 12.4], [-0.45, 1.3, 12.4]])} fill={LG.tahtaIsik} />
        <polygon points={dunyaPoly(K, [[-0.45, 1.0, 11.6], [0.45, 1.0, 11.6], [0.45, 1.3, 11.6], [-0.45, 1.3, 11.6]])} fill="#4a4060" stroke={ink("#4a4060")} strokeWidth={2} />
        <Sef K={K} kol={kol} L={L} />
        {/* sahne ön paneli (koyu ahşap, 3 m pano bölmesi, üst kenar gölgesi taramalı) */}
        {(() => { const on = [ek(K, -5.4, 0, 11), ek(K, 5.4, 0, 11), ek(K, 5.4, 1.0, 11), ek(K, -5.4, 1.0, 11)]; const ustS = [ek(K, -5.4, 0.85, 11), ek(K, 5.4, 0.85, 11), ek(K, 5.4, 1.0, 11), ek(K, -5.4, 1.0, 11)]; return <g>
          <polygon points={ptsS(on)} fill={LG.sahneOn} stroke={ink(LG.sahneOn)} strokeWidth={2} />
          {[-2.4, 0.6, 3.6, -5.4 + 0.02].map((u) => <polyline key={u} points={dunyaPoly(K, [[u, 0.05, 11], [u, 0.85, 11]])} stroke={ink(LG.sahneOn)} strokeWidth={2} fill="none" />)}
          <Tarama sekil={ustS} basamak="III" aci={72} renk={LG.tarama} derinlik="yakin" seed={S + 95} />
          <polyline points={dunyaPoly(K, [[-5.4, 1.0, 11], [5.4, 1.0, 11]])} stroke={LG.kenarLamba} strokeWidth={2.5} fill="none" />
        </g>; })()}
      </KonturTitreme>
      <Toz K={K} A={A} p={p} />
      <polygon points={dunyaPoly(K, [[-9, 0, 1.6], [9, 0, 1.6], [9, 0, 11], [-9, 0, 11]])} fill={LG.derin} />
      {/* katman 5–6: seyirci (arkadan), uzaktan yakına; yakın sıralar flu */}
      {SIRALAR.map((z, ri) => <Flu key={ri} id={`${uid}r${ri}`} sigma={z > 6 ? 1.5 : z > 4 ? 2.6 : 5}>
        <KonturTitreme derinlik={z > 6 ? "orta" : "yakin"} seed={S + 100 + ri}><SeyirciSirasi K={K} z={z} ri={ri} A={A} /></KonturTitreme>
      </Flu>)}
      {/* katman 7: ön plan avize altları (z6/z10, köşeler, flu) */}
      <Flu id={`${uid}f7`} sigma={4}>
        {[...yakinAv].sort((a, b) => b.z - a.z).map((a, i) => <AvizeHale key={`yh${i}`} K={K} a={a} />)}
        {[...yakinAv].sort((a, b) => b.z - a.z).map((a, i) => <Avize key={`ya${i}`} K={K} a={a} />)}
      </Flu>
    </g>
    </BuguCtx.Provider>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const uid = "sl" + useId().replace(/:/g, "");
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi><KonserSahne plan={plan} p={p} kilit={kilit} uid={uid} /></RenkKaydi>
    </svg>
  );
};
/** SALON — Leningrad 1942 konser salonu (`durum: "konser"`; `prova` sonraki kurulum turunda). Arşiv: litografi (Paris zinciri). */
export const SALON_SABLON: Sablon = { Sahne, arsiv: () => "litografi" };
