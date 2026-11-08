// ===== SARAYBURNU `kiyi` görünümü (gece) — P01 A, P03, P04, P05, P06 =====
// Konum dili: karakter/prop x/y = DEKOR px, ZEMİN TEMASI (ayak tabanı / kızak altı). Ölçek ufuk–ölçek kuralından:
//   rıhtımdaki (y ≥ 1256) nesne → px/m = (y − 720)/1.5 (json `olcek` yok sayılır, doğrulayıcı farkı uyarır);
//   havadaki / sudaki nesne → px/m = 406.7 × olcek (y'den türetilemez; olcek yoksa 1).
//   bagli karakter (oturan) → prop'un oturağına oturur, ayakları dayamaya basar (json x/y yok sayılır).
// Tek ışık (mekanlar §0.6): püskürme sürerken (bas+6'dan) anahtar = demet ağzı; değilse meşale (yardımcı 1'in elinde). Köşk penceresi ikincil
// (yalnız kendi halesi + su kolonu, gölge vermez). Gölgeler anahtar ışığın tersine; kukla kenar ışığı aynı kaynaktan (mavi RIM yok).
import React from "react";
import { Easing, interpolate } from "remotion";
import { Golge, Isik, IsikHavuzu } from "../../../doku/Isik";
import type { KilitNokta } from "../../../doku/GuvenliAlan";
import { RenkKaydi } from "../../../doku/Tarama";
import { DOKU_SEED, P } from "../../../doku/sabitler";
import { Kukla, Poz } from "../../../rig/Kukla";
import { kuklaIsigi } from "../../../rig/RigIsik";
import { AYAK_TABAN, dunyaya, elDunya, govdeDunya, kolIK } from "../../../rig/kinematik";
import { Duman, FitilKivilcimi, Puskurme } from "../../../components/GravurEfekt";
import { Baslik, DemetDurum, demetAgizlar, demetFitilUcu, demetOturak, demetOturakKenar, demetTutamak, FisekDemet, Fitil, fitilKivilcimNoktasi, fitilNoktalari, kanatEl, KanatCiz, kanatGeo, Mesale, mesaleAlev } from "../../props/evliya";
import { karakterBul } from "../../karakterler";
import { DUR, karakterPoz, KarakterDurum } from "../../jestler";
import type { Karakter, Plan, Prop } from "../../tipler";
import { cl, deger, ekranNokta, GIRIS, kameraHesapla, katDonusum, zarf } from "../../zaman";
import { param } from "../../ortak";
import { propDurum } from "../../props";
import { BOY_OLCEK, KIYI, pxmZemin, REF_PXM, RIG_BIRIM_M, zemindeMi } from "./geo";
import { KiyiDeniz, KiyiRihtim, KiyiUzak, KIYI_GECE, KOSK_VARSAYILAN, KoskKonum, YansimaKolonu } from "./KiyiDekor";
import { koskPencere } from "./SinanPasaKosk";

const S = DOKU_SEED.sarayburnu;
const KANATLI = new Set(["lagari"]); // kıyı görünümünde sırtta kanat taşıyan (tasarim §3.2: P01 A–P06); durum.kanat 0 → ayrılmış
const MESALECI = "yardimci-1";      // mekanlar §0.6: meşale yardımcı 1'in elinde (json'da mesale prop'u yoksa da elde — tek ışık kaynağı)
const n = (v: unknown, d: number) => (typeof v === "number" ? v : d);

type DemetCoz = { pr: Prop; d: DemetDurum; puskurme: number };
type Cizim = { derinlik: number; el: React.ReactNode };

const demetCoz = (pr: Prop, p: number, puskurmeAralik: { bas: number; bit: number } | null): DemetCoz => {
  const x = deger(pr.x, pr.kare, p, 520), y = deger(pr.y, pr.kare, p, 1330);
  const ol = (pr as Prop & { olcek?: number | number[] }).olcek;
  const pxm = zemindeMi(y) && ol === undefined ? pxmZemin(y) : REF_PXM * deger(ol as number | number[] | undefined, pr.kare, p, 1);
  const du = propDurum(pr, p);
  const aktif = puskurmeAralik ? p >= puskurmeAralik.bas && p < puskurmeAralik.bit : true;
  return { pr, d: { x, y, pxm, aci: deger(pr.aci, pr.kare, p, 0), titreme: n(du.titreme, 0), bos: n(du.bos, 0), p }, puskurme: aktif ? Math.max(0, Math.min(1, n(du.puskurme, 0))) : 0 };
};

// ---- jestler (Evliya): pz'yi değiştirir. Karışım zarfla (giriş bezier(.16,1,.3,1), çıkış hızlı) ----
const karis = (pz: Poz, h: Partial<Poz>, w: number) => {
  if (w <= 0) return;
  for (const [k, v] of Object.entries(h)) { if (typeof v !== "number") continue; const a = ((pz as unknown as Record<string, number | undefined>)[k]) ?? 0; (pz as Record<string, unknown>)[k] = a + (v - a) * w; }
};
const OTURAN: Partial<Poz> = { thighF: -84, kneeF: 78, thighB: -84, kneeB: 78, footF: 0, footB: 0, bodyY: 110, lean: 4 };
const UCUS: Partial<Poz> = { lean: 30, thighF: 18, kneeF: 16, thighB: 26, kneeB: 10, footF: 28, footB: 28, bodyY: 0 };
const SICRA: Partial<Poz> = { lean: -12, thighF: -22, kneeF: 26, thighB: 16, kneeB: 8, shB: -138, elB: -72, headTilt: -8 };

// Işık havuzu (mekanlar §1.2 "meşale havuzunda #7e6a52"): gradyan yerine 2 düz basamak, ekran karışımı → derzler havuzda da okunur
const HavuzDuz: React.FC<{ isik: Isik; guc?: number }> = ({ isik, guc = 1 }) => {
  if (isik.tip !== "nokta" || !isik.havuz) return null;
  const { rx, ry, alfa } = isik.havuz;
  return (
    <g style={{ mixBlendMode: "screen" }}>
      <ellipse cx={isik.zemin[0]} cy={isik.zemin[1]} rx={rx} ry={ry} fill={isik.renk} opacity={alfa * 0.5 * guc} />
      <ellipse cx={isik.zemin[0]} cy={isik.zemin[1]} rx={rx * 0.58} ry={ry * 0.58} fill={isik.renk} opacity={alfa * 0.6 * guc} />
    </g>
  );
};
void IsikHavuzu;

export type KiyiParam = { fitil?: { bas: number; bit: number }; puskurme?: { bas: number; bit: number; sonuk?: boolean }; kosk_konum?: KoskKonum };

export const KiyiSahne: React.FC<{ plan: Plan; p: number; kilit: KilitNokta[] }> = ({ plan, p, kilit }) => {
  const k = kameraHesapla(plan.kamera, p);
  const fitil = param<KiyiParam["fitil"] | null>(plan, "fitil", null);
  const pusk = param<KiyiParam["puskurme"] | null>(plan, "puskurme", null);
  const kosk = { ...KOSK_VARSAYILAN, ...param<Partial<KoskKonum>>(plan, "kosk_konum", {}) };
  const props = plan.props ?? [];
  const karakterler = plan.karakterler ?? [];

  // ---- prop'lar ----
  const demetPr = props.find((q) => q.tur === "fisek-demet");
  const demet = demetPr ? demetCoz(demetPr, p, pusk ? { bas: pusk.bas, bit: pusk.bit } : null) : null;
  const mesalePr = props.find((q) => q.tur === "mesale");
  const baslikPr = props.find((q) => q.tur === "baslik");
  const kanatPr = props.filter((q) => q.tur === "kanat");
  const baslikKalkti = baslikPr && Array.isArray(baslikPr.kare) && baslikPr.kare.length > 1 ? p >= baslikPr.kare[1] : false;

  // ---- karakterler: poz + ölçek + konum ----
  type KC = { c: Karakter; d: KarakterDurum; pxm: number; zemin: boolean; derinlik: number; ayak: P; arka?: React.ReactNode; arkaUst?: React.ReactNode; on?: React.ReactNode; mesale?: { tutamak: P; yon: P } };
  const kc: KC[] = karakterler.map((c) => {
    const kayit = karakterBul(c.kim);
    let x = deger(c.x, c.kare, p, 540), y = deger(c.y, c.kare, p, 1330), pxm: number, zemin = false;
    const bagli = c.bagli && demet && (c.bagli.prop === demet.pr.id || c.bagli.prop === "demet") ? demet : null;
    if (bagli) pxm = bagli.d.pxm;
    else if (zemindeMi(y)) { pxm = pxmZemin(y); zemin = true; }
    else pxm = REF_PXM * deger(c.olcek, c.kare, p, 1);
    const s = (pxm / RIG_BIRIM_M) * (BOY_OLCEK[c.kim] ?? 1);
    const d = karakterPoz({ ...c, z: 0, u: 0, kare: undefined, jestler: (c.jestler ?? []).filter((j) => j.ad !== "yuru") }, p, { yer: () => ({ x, y, s }), faz: () => 0 });
    d.palet = { ...kayit.palet, ...(c.palet ?? {}) };
    const pz = d.pz;
    const jest = (ad: string) => (c.jestler ?? []).find((j) => j.ad === ad && p >= j.bas - 2 && p <= j.bit + 12);
    // oturan: uyluk yatay, diz 78°, bodyY 110 (tasarim KE-K6)
    if (c.poz === "oturan") Object.assign(pz, OTURAN);
    const ucus = jest("ucus");
    if (ucus) karis(pz, UCUS, zarf(p, ucus.bas, ucus.bit, 0.12, 0.08));
    const sicra = jest("sicra");
    if (sicra) { const w = zarf(p, sicra.bas, sicra.bit, 0.25, 0.3); karis(pz, SICRA, w); pz.lookX = -0.6 * w + (pz.lookX ?? 0) * (1 - w); }
    // bağlı (oturan): kalça oturakta, ayaklar dayamada (seat local y = −226 + bodyY + 22)
    if (bagli && c.poz === "oturan" && !(ucus && p >= ucus.bas)) {
      const [ox, oy] = demetOturak(bagli.d);
      pz.x = ox - 0.12 * pxm - 2 * s; pz.y = oy - (-226 + (pz.bodyY ?? 0) + 22) * s;
      x = pz.x; y = oy;
    } else { pz.x = x; pz.y = y + AYAK_TABAN * s; }
    pz.scale = s;
    // takke ayrıldıysa baştan gizle (prop aynı konum/açıdan devralır)
    if (baslikPr && baslikKalkti && c.kim === (String((baslikPr as Prop & { sahip?: string }).sahip ?? MESALECI))) d.palet = { ...d.palet, sapka: "yok" };
    const out: KC = { c, d, pxm, zemin, derinlik: zemin ? y : bagli ? bagli.d.y + 0.01 : KIYI.ufuk + pxm * KIYI.goz, ayak: [x, y] };
    // ---- eller ----
    const ikEl = (on: boolean, hedef: P, w = 1) => { const r = kolIK(pz, hedef, on); if (on) { pz.shF += (r.sh - pz.shF) * w; pz.elF += (r.el - pz.elF) * w; } else { pz.shB += (r.sh - pz.shB) * w; pz.elB += (r.el - pz.elB) * w; } };
    if (bagli && c.poz === "oturan" && !(ucus && p >= ucus.bas)) { ikEl(true, demetTutamak(bagli.d)); ikEl(false, demetOturakKenar(bagli.d)); }
    // meşale: yardımcı 1'in ön elinde. json yolu varsa baş hedefi oradan; el ulaşamazsa meşale ELİ izler (baş json'dan kayar)
    if (c.kim === MESALECI) {
      const omuz = govdeDunya(pz, [40, -380]);
      // json `mesale` x/y = meşale BAŞI hedefi. Baş omuzdan ≥ 0.9 m uzaktaysa (ör. fitile uzanma) yol izlenir: el omuz→baş doğrultusunda,
      // baş elden 0.75 m. Daha yakınsa (baş gövdenin içine düşerdi) taşıma pozu: el önde-aşağıda, sopa dik + 20° ileri (alev hep yukarı).
      // Geçiş 0.75–0.9 m arasında yumuşak. Meşale her durumda ELİ izler (tutulan nesne eli takip eder).
      const f = pz.facing ?? 1;
      // sıçrarken (sicra) el bele iner, sopa dikleşir: alev yardımcının yüzünün önünde, binicinin yüzünden uzak kalır
      const geri = sicra ? zarf(p, sicra.bas, sicra.bit, 0.25, 0.3) : 0;
      const tasiHedef: P = [omuz[0] + f * (0.3 - 0.08 * geri) * pxm, omuz[1] + (0.3 + 0.17 * geri) * pxm];
      const egim = ((20 - 15 * geri) * Math.PI) / 180;
      const tasiYon: P = [f * Math.sin(egim), -Math.cos(egim)];
      let hedef: P = tasiHedef, yon: P = tasiYon;
      if (mesalePr && mesalePr.x !== undefined) {
        const bas: P = [deger(mesalePr.x, mesalePr.kare, p), deger(mesalePr.y, mesalePr.kare, p)];
        const dx = bas[0] - omuz[0], dy = bas[1] - omuz[1], L = Math.hypot(dx, dy) || 1;
        const w = interpolate(L / pxm, [0.75, 0.9], [0, 1], cl);
        if (w > 0) {
          const yy: P = [dx / L, dy / L];
          const hy: P = [bas[0] - yy[0] * 0.75 * pxm, bas[1] - yy[1] * 0.75 * pxm];
          hedef = [tasiHedef[0] + (hy[0] - tasiHedef[0]) * w, tasiHedef[1] + (hy[1] - tasiHedef[1]) * w];
          const ym: P = [tasiYon[0] + (yy[0] - tasiYon[0]) * w, tasiYon[1] + (yy[1] - tasiYon[1]) * w]; const Lm = Math.hypot(ym[0], ym[1]) || 1;
          yon = [ym[0] / Lm, ym[1] / Lm];
        }
      }
      ikEl(true, hedef);
      const el = elDunya(pz, true);
      out.mesale = { tutamak: el, yon };
      out.derinlik += 0.02; // aynı derinlikte meşale (öne uzatılmış) bitişik nesnenin önünde kalır

    } else if (c.kim.startsWith("yardimci")) {
      // kompars boşta: eller kuşakta (tasarim §3.6 Y2)
      ikEl(true, govdeDunya(pz, [50, -246])); ikEl(false, govdeDunya(pz, [-44, -246]));
    }
    // ---- kanat (sırtta): KANATLI karakter; json'da bağlı kanat prop'u varsa acik oradan ----
    const kp = kanatPr.find((q) => q.bagli === c.kim);
    const takili = deger(c.durum?.kanat as number[] | number | undefined, c.kare, p, 1);
    if ((KANATLI.has(c.kim) || kp) && takili > 0.5) {
      const acik = kp ? Math.max(0, Math.min(1, n(propDurum(kp, p).acik, 0))) : 0;
      const katliAlt = c.poz === "oturan" && !(ucus && p >= ucus.bas) ? -110 : -150;
      const g = kanatGeo(acik, pz.lean ?? 0, RIG_BIRIM_M, -606, katliAlt);
      if (acik > 0.05) { ikEl(true, govdeDunya(pz, kanatEl(g.yakin)), acik); ikEl(false, govdeDunya(pz, kanatEl(g.uzak)), acik); }
      (out as KC & { kanat?: { g: typeof g; acik: number } }).kanat = { g, acik };
    }
    return out;
  });

  // ---- tek ışık ----
  const mesaleci = kc.find((q) => q.mesale);
  const mesaleIsik: Isik | null = mesaleci?.mesale ? (() => { const a = mesaleAlev(mesaleci.mesale.tutamak, mesaleci.mesale.yon, mesaleci.pxm); const zy = mesaleci.zemin ? mesaleci.ayak[1] : KIYI.refY; return { tip: "nokta", ad: "meşale", zemin: [a[0], zy] as P, yukseklik: Math.max(20, zy - a[1]), renk: "#f0a848", havuz: { rx: 380, ry: 95, alfa: 0.35 } }; })() : null;
  const pg = demet ? demet.puskurme * (pusk?.sonuk ? interpolate(p, [pusk.bas, pusk.bit], [1, 0.2], cl) : 1) : 0;
  const agiz = demet ? demetAgizlar(demet.d) : [];
  const agizOrta: P = agiz.length ? [agiz.reduce((s0, q) => s0 + q[0], 0) / agiz.length, agiz.reduce((s0, q) => s0 + q[1], 0) / agiz.length] : [540, 1330];
  const puskurmeAnahtar = !!demet && pg > 0 && !!pusk && p >= pusk.bas + 6;
  const demetYerde = !!demet && zemindeMi(demet.d.y);
  const puskIsik: Isik | null = demet ? { tip: "nokta", ad: "püskürme", zemin: [agizOrta[0], demetYerde ? demet.d.y : Math.max(demet.d.y, KIYI.refY)], yukseklik: demetYerde ? 60 : Math.max(60, KIYI.refY - agizOrta[1]), renk: "#f0a040", havuz: { rx: 520, ry: 130, alfa: 0.3 } } : null;
  const isik: Isik = (puskurmeAnahtar ? puskIsik : mesaleIsik) ?? { tip: "nokta", ad: "varsayılan", zemin: [300, 1330], yukseklik: 300, renk: "#f0a848" };

  // ---- kilit noktaları ----
  kc.forEach(({ c, d, zemin, ayak }) => {
    if (zemin) kilit.push({ ad: `${c.kim} ayak`, p: ekranNokta(k, ayak), tur: "ayak" });
    kilit.push({ ad: `${c.kim} yüz`, p: ekranNokta(k, dunyaya(d.pz, [20, -450 + (d.pz.bodyY ?? 0)])), tur: "yuz" });
  });
  if (demet && demetYerde) kilit.push({ ad: "demet temas", p: ekranNokta(k, [demet.d.x, demet.d.y]), tur: "temas" });
  const pencere = koskPencere((kosk.x[0] + kosk.x[1]) / 2, kosk.su_cizgisi, kosk.px_m);
  kilit.push({ ad: "köşk penceresi", p: ekranNokta(k, pencere), tur: "kurulum" });

  // ---- çizim listesi (derinlik sırası: uzak önce; önde olan arkadakini örter) ----
  const cizim: Cizim[] = [];
  const murekkep = KIYI_GECE.murekkep;
  kc.forEach((q, i) => {
    const pz = q.d.pz;
    const kanat = (q as KC & { kanat?: { g: ReturnType<typeof kanatGeo>; acik: number } }).kanat;
    const ekranOlcek = (pz.scale ?? 1) * k.cs;
    const isikYakin = Math.hypot(isik.zemin[0] - q.ayak[0], isik.zemin[1] - isik.yukseklik - (q.ayak[1] - 300)) < 2.2 * q.pxm;
    const kanatCiz = (g: ReturnType<typeof kanatGeo>["yakin"], uzak: boolean, katli: number) => <KanatCiz g={g} katli={katli} ton={isikYakin ? "isikli" : "kontra"} kenar="#f0b060" olcekEkran={ekranOlcek} uzak={uzak} />;
    const katli = kanat ? 1 - kanat.acik : 0;
    // katlıyken iki kanat da gövdenin arkasında; açıkken uzak kanat arka elin üstünde (arkaUst), yakın kanat ön kolun üstünde (on)
    const arka = kanat && kanat.acik < 0.35 ? <>{kanatCiz(kanat.g.uzak, true, katli)}{kanatCiz(kanat.g.yakin, false, katli)}</> : undefined;
    const arkaUst = kanat && kanat.acik >= 0.35 ? kanatCiz(kanat.g.uzak, true, katli) : undefined;
    const on = kanat && kanat.acik >= 0.35 ? kanatCiz(kanat.g.yakin, false, katli) : undefined;
    const ki = kuklaIsigi(isik, q.ayak, 600 * (pz.scale ?? 1), { murekkep, kamera: k.cs, seed: S + 300 + i * 11 });
    cizim.push({
      derinlik: q.derinlik,
      el: (
        <g key={`k${i}`}>
          {q.zemin && <Golge isik={isik} ayak={q.ayak} h={600 * (pz.scale ?? 1) * 0.9} genislik={100 * (pz.scale ?? 1)} alfa={0.5} stil="gravur" seed={S + 40 + i} />}
          <Kukla p={q.d.palet} pz={pz} golgesiz isik={ki} arka={arka} arkaUst={arkaUst} on={on} />
          {q.mesale && <Mesale tutamak={q.mesale.tutamak} yon={q.mesale.yon} pxm={q.pxm} p={p} seed={S + 77} ten={q.d.palet.skin} tenKoyu={q.d.palet.skinDark} />}
        </g>
      ),
    });
  });
  if (demet) {
    const dd = demet.d;
    const derinlik = zemindeMi(dd.y) ? dd.y - 0.005 : KIYI.ufuk + dd.pxm * KIYI.goz - 0.005; // oturan karakterin hemen arkası
    cizim.push({ derinlik, el: <g key="demet"><FisekDemet d={dd} isikX={isik.zemin[0]} seed={S + 9} /></g> });
  }
  if (baslikPr && baslikKalkti) {
    const sahip = kc.find((q) => q.c.kim === String((baslikPr as Prop & { sahip?: string }).sahip ?? MESALECI));
    const bx = deger(baslikPr.x, baslikPr.kare, p), by = deger(baslikPr.y, baslikPr.kare, p);
    const pxm = sahip?.pxm ?? REF_PXM;
    const yerde = by >= KIYI.rihtimUst - 20;
    cizim.push({ derinlik: (sahip?.derinlik ?? KIYI.refY) + 0.5, el: (
      <g key="baslik">
        {yerde && <ellipse cx={bx} cy={by + 0.05 * pxm} rx={0.1 * pxm * n(baslikPr.olcek, 1)} ry={0.02 * pxm * n(baslikPr.olcek, 1)} fill="#14110d" opacity={0.5} />}
        <Baslik x={bx} y={by} aci={deger(baslikPr.aci, baslikPr.kare, p, 0)} pxm={pxm} olcek={n(baslikPr.olcek, 1)} palet={(sahip ? karakterBul(sahip.c.kim).palet : karakterBul(MESALECI).palet)} />
      </g>
    ) });
  }
  cizim.sort((a, b) => a.derinlik - b.derinlik);

  // fitil: kıvılcım uçtan (x 330) demete yürür; sonra yanmış kalır
  const fitilPts = demet && fitil ? fitilNoktalari([330, KIYI.refY - 6], demetFitilUcu(demet.d)) : null;
  const yanma = fitil ? interpolate(p, [fitil.bas, fitil.bit], [0, 1], cl) : 1;
  if (fitilPts) kilit.push({ ad: "fitil ucu", p: ekranNokta(k, fitilPts[0]), tur: "kurulum" });
  const kivilcim = fitilPts && fitil && p >= fitil.bas && p < fitil.bit ? fitilKivilcimNoktasi(fitilPts, yanma) : null;

  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        <g transform={katDonusum(k, 1)}>
          <KiyiUzak kosk={kosk} />
          <KiyiDeniz p={p} cs={k.cs} />
          {/* köşk penceresi: kendi halesi + su kolonu (rıhtıma ışık düşürmez: 85 m) */}
          <circle cx={pencere[0]} cy={pencere[1]} r={40} fill={KIYI_GECE.pencere} opacity={0.2} style={{ mixBlendMode: "screen" }} />
          <YansimaKolonu x={pencere[0]} y0={kosk.su_cizgisi + 2} y1={1000} renk={KIYI_GECE.pencere} alfa={0.5} gen={16} seed={S + 3} p={p} />
          {/* anahtar ışığın suya düşen kolonu + püskürmenin su yüzünü aydınlatması */}
          <YansimaKolonu x={isik.zemin[0]} y0={KIYI.dudakUst - 2} y1={KIYI.dudakUst - (puskurmeAnahtar ? 260 : 120)} renk="#e0a050" alfa={puskurmeAnahtar ? 0.6 * pg : 0.45} gen={puskurmeAnahtar ? 60 : 30} seed={S + 5} p={p} />
          <KiyiRihtim />
          <HavuzDuz isik={isik} />
          {puskurmeAnahtar && mesaleIsik && <HavuzDuz isik={mesaleIsik} guc={0.5} />}
          {fitilPts && <Fitil pts={fitilPts} yanma={yanma} />}
          {kivilcim && <FitilKivilcimi x={kivilcim[0]} y={kivilcim[1]} p={p} seed={S + 21} />}
          {demet && pg > 0 && <Duman kaynak={[agizOrta[0], demetYerde ? demet.d.y : agizOrta[1]]} pxm={demet.d.pxm} p={p} bas={pusk?.bas ?? 0} seed={S + 31} yogun={0.8 + 0.4 * pg} />}
          {cizim.map((c) => c.el)}
          {demet && pg > 0 && <Puskurme agizlar={agiz} asagi={[-Math.sin((demet.d.aci * Math.PI) / 180), Math.cos((demet.d.aci * Math.PI) / 180)]} pxm={demet.d.pxm} p={p} guc={pg} uzunluk={demetYerde ? 0.8 : 1.3} zeminY={demetYerde ? demet.d.y : undefined} seed={S + 13} />}
        </g>
      </RenkKaydi>
    </svg>
  );
};
void GIRIS; void Easing; void DUR;
