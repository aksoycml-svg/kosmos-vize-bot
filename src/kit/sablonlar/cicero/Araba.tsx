// ===== ARABA şablonu (Çiçero KC-S2; ilk 1940'lar kiti) — `gorunum: "ic"` sedan yan kesiti (kukla tiyatrosu: yakın kapı yok) =====
// Araba SOLA bakar (ön = sol). Kamera kabinde göz h 1.05 m (oturan göz), F 1265, ufuk y 670 (mekanlar.md §2.3):
//   y = 670 + (1.05 − h)·F/Z · x = 540 + X·F/Z (X araç boyunca m, + arka/sağ; 0 ≈ ön koltuk sırtının arkası).
//   Figür düzlemi Z 1.10 (1150 px/m) · uzak kapı/cam Z 1.62 (781 px/m) · cephe Z 7.6 (166 px/m, sokak göz +1.45) · yakın kesit Z 0.55.
// Kabin iç yüksekliği 1.40 m (mekanlar 1.30 önerisi → kenarlı şapkalı 1.80 m oturan figür tavana girmesin diye 1.40; rapor tablosunda).
// Işık (tek): alçak güneş sol-ön-uzak (ön camdan), yon [0.85, 0.15] → Bazna'nın yüzü ışıkta, Moyzisch kontra; cephe güneşi sıyırarak alır.
// Karakterler: bazna = Kukla takim40 oturan (ön kol GravurEl konik kolla ayrı çizilir); moyzisch = SiluetFigur40 sapkali (gövde sola, baş sağa: geri dönük).
// parametreler: el {moyzisch|bazna: {kare, bilek [[x,y]], aci [], poz, omuzKay?}} · banknot {kare, x, y, aci, yuz, arkada (0/1 basamak: cebe girerken ceketin arkasında)}
//   · bazna {x (m kalça), lean, bakis} · moyzisch {x (m kalça)} · daktilo {yaziyor: true} · motor (≤ 2 px titreme, seed'li, kareye değil zamana sabit frekans).
// dis (P09a) henüz kurulmadı → hata.
import React from "react";
import { Isik } from "../../../doku/Isik";
import { RenkKaydi, Tarama } from "../../../doku/Tarama";
import { P, poly, rnd } from "../../../doku/sabitler";
import { Kukla } from "../../../rig/Kukla";
import { kuklaIsigi } from "../../../rig/RigIsik";
import { govdeDunya } from "../../../rig/kinematik";
import { karakterPoz } from "../../jestler";
import { param, Sablon, SablonProps } from "../../ortak";
import { deger, ekranNokta, kameraHesapla } from "../../zaman";
import type { Sayi } from "../../tipler";
import { CIC, EL_BAZNA, EL_MOYZISCH } from "../../paletler/cicero";
import { Banknot, FilmKutusu, Zarf } from "../../props/cicero/Esyalar40";
import { SiluetFigur40, siluet40Yol } from "../../props/cicero/SiluetFigur40";
import { KUKLA40_M } from "./ElciOda";
import { GravurEl, GRAVUR_POZ, konikKol } from "../../props/paris/GravurEl";

const F = 1265, UFUK = 670, GOZ = 1.05, ZF = 1.1, ZU = 1.62, ZC = 7.6, TAVAN = 1.4, SEED = 191;
const yH = (h: number, Z: number) => UFUK + ((GOZ - h) * F) / Z;
const xX = (X: number, Z: number) => 540 + (X * F) / Z;
const pxm = F / ZF; // 1150
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
type ElAnahtar = { kare: number[]; bilek: P[]; aci: number[]; poz?: "gevsek" | "kistir" | "tutus" | "cimdik"; bukum?: 1 | -1; dirsek?: P[] };
const anah = (arr: P[], kare: number[], p: number): P => [deger(arr.map((q) => q[0]), kare, p), deger(arr.map((q) => q[1]), kare, p)];

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const gorunum = param<string>(plan, "gorunum", "ic");
  if (gorunum === "dis") return <DisSahne plan={plan} p={p} kilit={kilit} />;
  if (gorunum !== "ic") throw new Error(`[ARABA] gorunum "${gorunum}" yok (ic | dis)`);
  const k = kameraHesapla(plan.kamera, p);
  // motor titremesi: ≤ 2 px, düşük frekans, seed sabit (kameraya değil zamana bağlı tek sinüs; dünya kaynamaz)
  const motor = param<boolean>(plan, "motor", false) ? Math.sin(p * 0.9) * 1.2 : 0;
  const kam = `translate(${540 + k.cx},${960 + k.cy + motor}) scale(${k.cs}) translate(-540,-960)`;
  const gunes: Isik = { tip: "yonlu", ad: "alçak güneş (ön cam)", yon: [0.85, 0.15], renk: CIC.kenar };
  const TH = 80;
  const isikV: P = [-0.98, -0.18]; // ışığa doğru (ekran)
  const mur = CIC.murekkep;
  // ---- figür yerleşimi ----
  const BZ = param<{ x?: Sayi; lean?: Sayi; kare?: number[] }>(plan, "bazna", {});
  const MZ = param<{ x?: number }>(plan, "moyzisch", {});
  const otur = 0.36;
  // Moyzisch (ön koltuk, sol): gövde ileri (sola), baş geri (sağa) dönük
  const mX = xX(MZ.x ?? -0.24, ZF);
  // Bazna (arka koltuk, sağ): Kukla, yüz sola, öne eğik
  const blean = deger(BZ.lean ?? 12, BZ.kare, p);
  // arka kanepenin ön kenarı (X, m): ayak boşluğu −0.13 … ARK. Kukla uyluğu kısa (karikatür oran) → kenar 0.14 ile baş ≈ x 780
  const ARK = param<number>(plan, "arkaKanepe", 0.06);
  // Kukla ölçeği (v2, eleştiri #3): taban takim40 1.70 m (KUKLA40_M); rig başı karikatür büyük → 0.6× ile baş ≈ siluet Moyzisch başına yakın
  const s = KUKLA40_M * pxm * param<number>(plan, "kuklaOlcek", 0.72);
  // kalça x: verilmezse diz arka kanepenin ön kenarına (X 0.04) gelecek biçimde (baldır ayak boşluğuna iner)
  const bx = BZ.x !== undefined ? xX(deger(BZ.x, BZ.kare, p), ZF) : xX(ARK - 0.03, ZF) + 104 * s;
  const bc = (plan.karakterler ?? []).find((c) => c.kim === "bazna");
    // kalça eklemi oturak üstünün 0.10 m üstünde (uyluk kalınlığı); göz ≈ ufuk (kamera = oturan göz)
  const bKalca = yH(otur + 0.1, ZF);
  const bd = bc ? karakterPoz({ ...bc, jestler: (bc.jestler ?? []).filter((j) => j.ad !== "yuru") }, p, { yer: () => ({ x: bx, y: bKalca + 226 * s - 7 * s, s }), faz: () => 0 }) : null;
  if (bd) Object.assign(bd.pz, { facing: -1, thighF: -88, kneeF: 92, thighB: -84, kneeB: 88, footF: 0, footB: 0, lean: blean, onKolYok: true, shB: 18, elB: -60, headTilt: deger((BZ as { bas?: Sayi }).bas ?? 6, BZ.kare, p) });
  // ---- eller ----
  const EL = param<Record<string, ElAnahtar>>(plan, "el", {});
  const omuzB: P | null = bd ? govdeDunya(bd.pz, [40, -372]) : null;
  // geri dönük gövde: yakın (sağ) omuz koltuk sırtına doğru döner; omuz yüksekliği siluet yolundan (tek kaynak)
  const mGeo = siluet40Yol("sapkali", { oturan: otur, profil: true });
  const omuzM: P = [mX + 0.05 * pxm, yH(mGeo.omuzY - 0.03, ZF)];
  const elCiz = (kim: "bazna" | "moyzisch", omuz: P, tutulan?: React.ReactNode) => {
    const e = EL[kim]; if (!e) return null;
    const bilek = anah(e.bilek, e.kare, p), aci = deger(e.aci, e.kare, p), E = 0.18 * pxm;
    const L = Math.hypot(bilek[0] - omuz[0], bilek[1] - omuz[1]) || 1, nx = -(bilek[1] - omuz[1]) / L, ny = (bilek[0] - omuz[0]) / L;
    // kol derinlikte kısalır (yan kesitte kameraya/uzağa uzanan kol): görünür dirsek sapması L'ye oranlı
    const bk = 0.16 * L * (e.bukum ?? 1);
    const dirsek: P = e.dirsek ? anah(e.dirsek, e.kare, p) : [lerp(omuz[0], bilek[0], 0.5) + nx * bk, lerp(omuz[1], bilek[1], 0.5) + ny * bk];
    const kol = konikKol(omuz, dirsek, bilek, kim === "moyzisch" ? [0.1 * pxm, 0.09 * pxm, 0.07 * pxm] : [0.11 * pxm, 0.095 * pxm, 0.07 * pxm]);
    const pal = kim === "bazna" ? EL_BAZNA : EL_MOYZISCH, kr = kim === "bazna" ? "#3b3a4e" : CIC.moyzisch;
    const poz = GRAVUR_POZ[e.poz ?? "gevsek"], elB = kol.ileri(-0.02 * E);
    const mA = kol.ileri(-0.2 * E), mB = kol.ileri(0), n2 = kol.n2, w = 0.04 * pxm;
    const q = (o: P, k2: number): P => [o[0] + n2[0] * k2, o[1] + n2[1] * k2];
    kilit.push({ ad: `${kim} eli`, p: ekranNokta(k, bilek), tur: "dokunus" });
    return <g>
      <path d={kol.d} fill={kr} stroke={mur} strokeWidth={3} strokeLinejoin="round" />
      <path d={kol.kenar} fill="none" stroke={CIC.kenar} strokeWidth={3} opacity={kim === "bazna" ? 0.55 : 0.8} transform="translate(-3 -1)" />
      <polygon points={poly([q(mA, w * 1.04), q(mB, w), q(mB, -w), q(mA, -w * 1.04)])} fill={pal.manset} stroke={pal.mansetGolge} strokeWidth={2.5} />
      <GravurEl bilek={elB} aci={aci} E={E} poz={poz} palet={pal} isik={isikV} taramaAci={TH} katman="arka" />
      {tutulan}
      <GravurEl bilek={elB} aci={aci} E={E} poz={poz} palet={pal} isik={isikV} taramaAci={TH} katman="on" onMaske />
    </g>;
  };
  // ---- banknot (İMZA) ----
  const BN = param<{ kare: number[]; x: number[]; y: number[]; aci: number[]; yuz?: "on" | "arka"; arkada?: number[]; tutan?: string[]; sizinti?: number } | null>(plan, "banknot", null);
  let banknot: React.ReactNode = null, bnArkada = false;
  if (BN) {
    const bxy: P = [deger(BN.x, BN.kare, p), deger(BN.y, BN.kare, p)], ba = deger(BN.aci, BN.kare, p);
    let ark = 0; (BN.arkada ?? []).forEach((v, j) => { if (p >= BN.kare[j]) ark = v; }); bnArkada = ark > 0;
    banknot = <g transform={`translate(${bxy[0]} ${bxy[1]}) rotate(${ba})`}><Banknot W={0.211 * F / 1.0} yuz={BN.yuz ?? "arka"} sizinti={BN.sizinti ?? 0.12} golge={0} kivrik={0.35} golgeKay={[10, 12]} golgeRenk="#2a2440" /></g>;
    kilit.push({ ad: "banknot", p: ekranNokta(k, bxy), tur: "dokunus" });
  }
  // nesneler (P05): zarf / film kutusu — elden ele (anahtarlı yol), arkada [0/1] = Bazna'nın ceketi arkasında (cep/kucak)
  type Nesne = { tur: "zarf" | "filmKutusu"; kare: number[]; x: number[]; y: number[]; aci: number[]; arkada?: number[]; olcek?: number };
  const NS = param<Nesne[]>(plan, "nesneler", []);
  const nesneCiz = (ark: boolean) => NS.map((n, i) => {
    let a = 0; (n.arkada ?? []).forEach((v, j) => { if (p >= n.kare[j]) a = v; }); if ((a > 0) !== ark) return null;
    const xy: P = [deger(n.x, n.kare, p), deger(n.y, n.kare, p)], r = deger(n.aci, n.kare, p);
    kilit.push({ ad: n.tur, p: ekranNokta(k, xy), tur: "dokunus" });
    return <g key={`n${i}`} transform={`translate(${xy[0]} ${xy[1]}) rotate(${r})`}>{n.tur === "zarf" ? <Zarf W={0.24 * F * (n.olcek ?? 1)} golgeKay={[8, 10]} /> : <FilmKutusu H={0.055 * 1.4 * F * (n.olcek ?? 1)} />}</g>;
  });
  if (bd) { kilit.push({ ad: "bazna yüz", p: ekranNokta(k, govdeDunya(bd.pz, [20, -450])), tur: "yuz" }); for (const [ad, lp] of [["baş üstü", [20, -540]], ["ense", [-70, -450]]] as [string, P][]) kilit.push({ ad: `bazna ${ad}`, p: ekranNokta(k, govdeDunya(bd.pz, lp)), tur: "yuz" }); }
  kilit.push({ ad: "daktilo penceresi", p: ekranNokta(k, [571, 640]), tur: "kurulum" });
  // ---- dış: cephe (Z 7.6, sokak göz +1.45) ----
  const yC = (hs: number) => UFUK + (1.45 - hs) * (F / ZC);
  const pen0 = 480; // daktilo penceresi sol kenarı (px); aks 2.5 m
  const penX = [-2, -1, 0, 1, 2].map((i) => pen0 + i * 2.5 * (F / ZC));
  const DK = param<{ yaziyor?: boolean }>(plan, "daktilo", { yaziyor: true });
  const tik = DK.yaziyor ? Math.sin(p * 1.7) * 1.2 : 0;
  // tavan dikişleri (X sabit çizgiler, kaçış noktasına yakınsar)
  const dikis: number[] = []; for (let X = -0.75, i = 0; i < 8; i++) { X += 0.3 + rnd(SEED + 1, i) * 0.12; dikis.push(X); }
  const tavanK = (X0: number, X1: number): P[] => [[xX(X0, ZU), yH(TAVAN, ZU)], [xX(X1, ZU), yH(TAVAN, ZU)], [xX(X1, 0.55), yH(TAVAN, 0.55)], [xX(X0, 0.55), yH(TAVAN, 0.55)]];
  const sinirX = dikis[2];
  const camUst = 514, bel = 826;
  const onCam: P[] = [[-20, camUst], [400, camUst], [400, bel], [-20, bel]];
  const arkaCamD = `M 445 ${camUst} L 840 ${camUst} Q 930 ${camUst} 930 ${camUst + 90} L 930 ${bel} L 445 ${bel} Z`;
  // oturak üst yüzleri (figür düzleminden yakın kesite)
  const minder = (X0: number, X1: number): P[] => [[xX(X0, ZF), yH(otur, ZF)], [xX(X1, ZF), yH(otur, ZF)], [xX(X1, 0.55), yH(otur, 0.55)], [xX(X0, 0.55), yH(otur, 0.55)]];
  const moyz = (plan.karakterler ?? []).find((c) => c.kim === "moyzisch");
  const TABAN = 0.24; // ayak boşluğu tabanı (oturan Kukla baldırı bu yüksekliğe iner)
  const bosluk = (h: number): P[] => [[xX(-0.13, ZF), yH(h, ZF)], [xX(ARK, ZF), yH(h, ZF)], [xX(ARK, 0.55), yH(h, 0.55)], [xX(-0.13, 0.55), yH(h, 0.55)]];
  const pli: number[] = []; for (let X = -1.0, i = 0; X < 1.2 && i < 60; i++) { X += (22 + rnd(SEED + 8, i) * 18) / pxm; if (X < -0.15 || X > ARK + 0.03) pli.push(X); }
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <clipPath id="arOnCam"><polygon points={poly(onCam)} /></clipPath>
        <clipPath id="arArkaCam"><path d={arkaCamD} /></clipPath>
        <clipPath id="arBosluk"><polygon points={poly([[xX(-0.13, ZF), yH(otur, ZF)], [xX(ARK, ZF), yH(otur, ZF)], [xX(ARK, 0.55), yH(TABAN, 0.55)], [xX(-0.13, 0.55), yH(TABAN, 0.55)]])} /></clipPath>
        <filter id="arFlu" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={3} /></filter>
        <filter id="arFlu4" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={4} /></filter>
      </defs>
      <rect x={0} y={0} width={1080} height={1920} fill={CIC.kesit} />
      <RenkKaydi>
        <g transform={kam}>
          {/* ÖN CAM: gök 2 basamak + ufuk ışıması + flu ağaç tepeleri (güneş diski yok) */}
          <g clipPath="url(#arOnCam)">
            <rect x={-20} y={camUst} width={440} height={80} fill={CIC.gokOrta} />
            <rect x={-20} y={camUst + 76} width={440} height={UFUK - camUst - 70} fill={CIC.ufuk} />
            <g filter="url(#arFlu4)">
              <path d={`M -40 ${UFUK + 6} ${Array.from({ length: 7 }).map((_, i) => `Q ${-10 + i * 66} ${UFUK - 30 - rnd(SEED + 3, i) * 40} ${30 + i * 66} ${UFUK - 4}`).join(" ")} L 440 ${bel} L -40 ${bel} Z`} fill={CIC.agac} />
              <rect x={-40} y={UFUK + 40} width={480} height={bel - UFUK} fill={CIC.agacPus} />
            </g>
          </g>
          {/* ARKA CAM: elçilik cephesi (zemin kat bandı) — sıva güneşte, düz lento pencereler, andezit subasman; flu + pus */}
          <g clipPath="url(#arArkaCam)">
            <g filter="url(#arFlu)">
              <rect x={400} y={camUst - 10} width={600} height={bel - camUst + 20} fill={CIC.cepheIsik} />
              <rect x={400} y={yC(1.0)} width={600} height={bel} fill={CIC.andezit} />
              {[0, 1, 2].map((r) => <line key={r} x1={400} y1={yC(1.0) + 6 + r * 26} x2={1000} y2={yC(1.0) + 6 + r * 26} stroke="#46424e" strokeWidth={3} />)}
              {penX.map((x0, i) => { const w = 1.1 * (F / ZC); return <g key={i}>
                <rect x={x0 - 6} y={yC(2.8) - 6} width={w + 12} height={yC(1.2) - yC(2.8) + 12} fill="#b49e88" />
                <rect x={x0} y={yC(2.8)} width={w} height={yC(1.2) - yC(2.8)} fill={i === 2 ? CIC.daktiloIc : "#6a6478"} />
                <rect x={x0} y={yC(2.8)} width={w} height={yC(1.2) - yC(2.8)} fill="none" stroke="#5a5266" strokeWidth={5} />
                <line x1={x0 + w / 2} y1={yC(2.8)} x2={x0 + w / 2} y2={yC(1.2)} stroke="#5a5266" strokeWidth={4} />
                <polygon points={poly([[x0 + w - 16, yC(2.8)], [x0 + w, yC(2.8)], [x0 + w, yC(1.2)], [x0 + w - 16, yC(1.2)]])} fill={CIC.cepheGolge} />
                <rect x={x0 - 8} y={yC(1.2)} width={w + 16} height={8} fill="#d0bca6" />
              </g>; })}
            </g>
            {/* daktilo başında sekreter (topuzlu, yüzsüz) + daktilo — kaynak sayılmaz, cepheye ışık düşürmez */}
            <g transform={`translate(0 ${tik * 0.3})`}>
              <SiluetFigur40 kod="topuzlu" ayak={[pen0 + 46, yC(1.2) + 0.95 * (F / ZC)]} pxm={F / ZC} renk={CIC.sekreter} yon={1} oturan={0.45} golge={false} kirp={yC(1.2)} />
            </g>
            <polygon points={poly([[pen0 + 58, yC(1.2)], [pen0 + 86, yC(1.2)], [pen0 + 82, yC(1.2) - 11], [pen0 + 62, yC(1.2) - 11]])} fill="#2e2a38" />
            <rect x={400} y={camUst} width={600} height={bel - camUst} fill={CIC.gokOrta} opacity={0.12} />
          </g>
          {/* direkler + cam çerçevesi iç kenar taraması */}
          <rect x={400} y={camUst - 4} width={45} height={bel - camUst + 4} fill="#2e3040" stroke={mur} strokeWidth={2} />
          <Tarama sekil={[[440, camUst], [452, camUst], [452, bel], [440, bel]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="yakin" seed={SEED + 5} />
          <path fillRule="evenodd" d={`M -20 ${camUst - 8} H 940 V ${bel + 6} H -20 Z M -20 ${camUst} H 400 V ${bel} H -20 Z ${arkaCamD}`} fill="#2e3040" />
          <line x1={-20} y1={bel + 3} x2={940} y2={bel + 3} stroke={CIC.krom} strokeWidth={4} opacity={0.6} />
          {/* tavan üstü şerit (h 1.25–1.40, uzak) + tavan döşemesi (sol ışıkta, sağ gölgede; sınır dikişte) + dikişler */}
          <rect x={-20} y={yH(TAVAN, ZU)} width={1120} height={camUst - 8 - yH(TAVAN, ZU)} fill={CIC.tavanGolge} />
          <polygon points={poly(tavanK(-1.2, sinirX))} fill={CIC.tavanIsik} />
          <polygon points={poly(tavanK(sinirX, 1.2))} fill={CIC.tavanGolge} />
          {dikis.map((X, i) => <line key={i} x1={xX(X, ZU)} y1={yH(TAVAN, ZU)} x2={xX(X, 0.55)} y2={yH(TAVAN, 0.55)} stroke={X < sinirX ? "#6a5448" : "#34304a"} strokeWidth={4} />)}
          {/* C direği / arka iç panel + güneş yaması (ön cam açıklığından) */}
          <path d={`M 930 ${camUst + 90} Q 930 ${camUst} 840 ${camUst} L 840 ${camUst - 16} L 1100 ${camUst - 16} L 1100 1490 L 930 1490 Z`} fill="#34324a" stroke={mur} strokeWidth={2} />
          {/* güneş yaması: ön cam açıklığından arka koltuk sırtı + C direği iç yüzüne düşen paralelkenar (net kenar) */}
          <polygon points={poly([[900, 690], [1100, 650], [1100, 1220], [900, 1290]])} fill="#c09a86" opacity={0.55} />
          {/* uzak kapı paneli: kolçak, krom kapı kolu, cam kolu (krank) */}
          <rect x={-20} y={bel + 6} width={950} height={1490 - bel} fill="#45405a" />
          <rect x={-20} y={1072} width={950} height={1490 - 1072} fill="#3e3a52" />
          {Array.from({ length: 22 }).map((_, i) => { const x = -10 + i * 44 + rnd(SEED + 4, i) * 14; return <line key={i} x1={x} y1={bel + 30} x2={x} y2={990} stroke="#2e2c42" strokeWidth={2.4} opacity={0.5} />; })}
          <rect x={-20} y={1006} width={950} height={40} rx={10} fill={CIC.koltukIsik} stroke={mur} strokeWidth={2} />
          <rect x={-20} y={1008} width={950} height={9} rx={4} fill="#8c7470" />
          <Tarama sekil={[[-20, 1046], [930, 1046], [930, 1072], [-20, 1072]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="yakin" seed={SEED + 6} />
          <rect x={560} y={920} width={80} height={14} rx={7} fill={CIC.krom} stroke={mur} strokeWidth={1.5} />
          <circle cx={566} cy={920} r={3} fill={CIC.metalNokta} />
          <g transform="translate(700 1100)"><circle r={12} fill={CIC.krom} stroke={mur} strokeWidth={1.5} /><rect x={-4} y={-50} width={8} height={50} fill={CIC.krom} stroke={mur} strokeWidth={1.2} /><rect x={-12} y={-56} width={24} height={10} rx={4} fill={CIC.krom} stroke={mur} strokeWidth={1.2} /></g>
          {/* güneşlik (katlı, ön-plan çerçeve) */}
          <polygon points={poly([[-20, 60], [330, 90], [320, 214], [-20, 196]])} fill="#2e2c3c" stroke={mur} strokeWidth={3} />
          <line x1={-20} y1={186} x2={322} y2={204} stroke={CIC.tavanIsik} strokeWidth={2} opacity={0.6} />
          {/* figürler: Moyzisch (kontra, şapkalı), banknot (arkada ise), Bazna */}
          {moyz && <SiluetFigur40 kod="sapkali" ayak={[mX, yH(0, ZF)]} pxm={pxm} renk={CIC.moyzisch} yon={-1} basYon={1} oturan={otur} profil golge={false} kenar={{ renk: CIC.kenar, dx: -3, dy: -1 }} />}
          {bnArkada && banknot}
          {nesneCiz(true)}
          {bd && <Kukla pz={bd.pz} p={bd.palet} golgesiz isik={kuklaIsigi(gunes, [bx, yH(0, ZF)], 600 * s, { murekkep: mur, kamera: k.cs, seed: SEED + 9 })} />}
          {/* ön koltuk sırtı (figür düzlemi; Moyzisch'in sırtı buna dayanır) + dikey pli */}
          <path d={`M ${xX(-0.13, ZF)} 1490 L ${xX(-0.13, ZF)} 940 Q ${xX(-0.13, ZF)} 900 ${xX(-0.08, ZF)} 898 Q ${xX(-0.03, ZF)} 900 ${xX(-0.03, ZF)} 940 L ${xX(-0.03, ZF)} 1490 Z`} fill={CIC.koltuk} stroke={mur} strokeWidth={3} />
          <path d={`M ${xX(-0.03, ZF)} 940 L ${xX(-0.03, ZF)} 1490 L ${xX(-0.055, ZF)} 1490 L ${xX(-0.055, ZF)} 930 Z`} fill="#2a283c" />
          <Tarama sekil={[[xX(-0.06, ZF), 930], [xX(-0.03, ZF), 940], [xX(-0.03, ZF), 1490], [xX(-0.06, ZF), 1490]]} basamak="III" aci={TH} renk={CIC.tarama} derinlik="yakin" seed={SEED + 7} />
          <path d={`M ${xX(-0.12, ZF)} 920 Q ${xX(-0.08, ZF)} 896 ${xX(-0.05, ZF)} 912`} stroke={CIC.koltukIsik} strokeWidth={4} fill="none" />
          {/* eller (banknot iki el arasında; tutan el banknotun üstünden kavrar) */}
          {nesneCiz(false)}
          {elCiz("moyzisch", omuzM, !bnArkada && (EL.moyzisch?.poz === "kistir") ? banknot : undefined)}
          {!bnArkada && EL.moyzisch?.poz !== "kistir" && EL.bazna?.poz !== "kistir" && banknot}
          {omuzB && elCiz("bazna", omuzB, !bnArkada && EL.bazna?.poz === "kistir" ? banknot : undefined)}
          {/* oturak üst yüzleri (yakın kesite uzanır; alt üçte bir): ön kanepe | taban | arka kanepe */}
          {/* ayak boşluğu: yükseltilmiş taban (h 0.24, paspas) + kanepe ön yüzleri */}
          <rect x={-20} y={yH(otur, ZF)} width={1120} height={600} fill="#2a2838" />
          <polygon points={poly(bosluk(TABAN))} fill="#3a3646" />
          {[0.3, 0.55, 0.8].map((t, i) => <line key={i} x1={lerp(xX(-0.13, ZF), xX(ARK, ZF), t)} y1={yH(TABAN, ZF)} x2={lerp(xX(-0.13, 0.55), xX(ARK, 0.55), t)} y2={yH(TABAN, 0.55)} stroke="#2a2636" strokeWidth={4} />)}
          {bd && <g clipPath="url(#arBosluk)"><Kukla pz={bd.pz} p={bd.palet} golgesiz isik={kuklaIsigi(gunes, [bx, yH(0, ZF)], 600 * s, { murekkep: mur, kamera: k.cs, seed: SEED + 9 })} />
            <ellipse cx={bx - 104 * s} cy={yH(TABAN, ZF) + 4} rx={0.12 * pxm} ry={10} fill="#14121a" opacity={0.55} /></g>}
          <polygon points={poly(minder(-1.0, -0.13))} fill={CIC.koltuk} stroke={mur} strokeWidth={3} />
          <polygon points={poly(minder(ARK, 1.2))} fill={CIC.koltuk} stroke={mur} strokeWidth={3} />
          {pli.map((X, i) => <line key={i} x1={xX(X, ZF)} y1={yH(otur, ZF) + 6} x2={xX(X, 0.55)} y2={yH(otur, 0.55)} stroke="#26243a" strokeWidth={3} opacity={0.7} />)}
          {/* döşeme dikiş hatları (sabit Z, kumaş bölmeleri — kanepe okunsun, döşeme tahtası değil) */}
          {[0.92, 0.74].map((Z, i) => <g key={`dk${i}`}><path d={`M ${xX(-1.0, Z)} ${yH(otur, Z)} L ${xX(-0.13, Z)} ${yH(otur, Z)}`} stroke="#26243a" strokeWidth={4} /><path d={`M ${xX(ARK, Z)} ${yH(otur, Z)} L ${xX(1.2, Z)} ${yH(otur, Z)}`} stroke="#26243a" strokeWidth={4} /><path d={`M ${xX(-1.0, Z)} ${yH(otur, Z) - 4} L ${xX(-0.13, Z)} ${yH(otur, Z) - 4} M ${xX(ARK, Z)} ${yH(otur, Z) - 4} L ${xX(1.2, Z)} ${yH(otur, Z) - 4}`} stroke={CIC.koltukIsik} strokeWidth={2.5} opacity={0.7} /></g>)}
          {/* kanepe ön kenarı: yuvarlak biye (ışık basamağı) */}
          {[-0.13, ARK].map((X0, i) => <g key={i}><line x1={xX(X0, ZF)} y1={yH(otur, ZF)} x2={xX(X0, 0.55)} y2={yH(otur, 0.55)} stroke={CIC.koltukIsik} strokeWidth={14} strokeLinecap="round" /><line x1={xX(X0, ZF) + (i ? 8 : -8)} y1={yH(otur, ZF)} x2={xX(X0, 0.55) + (i ? 14 : -14)} y2={yH(otur, 0.55)} stroke="#8c7470" strokeWidth={4} /></g>)}
          {/* kesit kenarı (tavan, yakın) + sıcak alt kenar */}
          <rect x={-20} y={-200} width={1120} height={295} fill={CIC.kesit} />
          <line x1={-20} y1={95} x2={1100} y2={95} stroke={CIC.tavanIsik} strokeWidth={2} />
        </g>
      </RenkKaydi>
    </svg>
  );
};


// ===== ARABA `gorunum: "dis"`, `saat: "alacakaranlik"` (P09a; mekanlar §2.7) — elçilik cephesi + kaldırım + park araba =====
// F 1540, göz 1.5 m, cephe Z 14 (110 px/m), ufuk y 1085, cephe dibi y 1250, kaldırım kenarı y 1295, park araba Z 12.5.
// Işık: batı parıltısı soldan (kadraj dışı, alçak) → figür kenar ışığı sol; yanık pencereler kaldırıma kendi yamuğunu düşürür.
// parametreler: sekreter {kare, x[] (ayak x dekor px), pencereKalkis (masadan kalkar; pencere boş), kapidan (kapıda görünür), biner (arabanın arkasına geçer)} ·
//   araba {kare, x[] (gövde öteleme px; + sağa), kapi (0 kapalı … 1 açık), kapiKare[]} · daktilo {yaziyor}.
const DisSahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const k = kameraHesapla(plan.kamera, p);
  const kam = `translate(${540 + k.cx},${960 + k.cy}) scale(${k.cs}) translate(-540,-960)`;
  const mur = CIC.murekkep, PXC = 110, DIP = 1250, kald = 1295;
  const yC = (h: number) => DIP - h * PXC;
  const SK = param<{ kare: number[]; x: number[]; pencereKalkis?: number; kapidan?: number; biner?: number } | null>(plan, "sekreter", null);
  const AR = param<{ kare?: number[]; x?: Sayi; kapi?: Sayi; kapiKare?: number[] }>(plan, "araba", {});
  const ax = deger(AR.x ?? 0, AR.kare, p), kapiA = deger(AR.kapi ?? 0, AR.kapiKare, p);
  const DK = param<{ yaziyor?: boolean }>(plan, "daktilo", { yaziyor: true });
  const masada = !SK || p < (SK.pencereKalkis ?? 1e9);
  const gorunur = !!SK && p >= (SK.kapidan ?? 0) && p < (SK.biner ?? 1e9) + 1;
  const sx = SK ? deger(SK.x, SK.kare, p) : 0;
  const adim = SK ? deger(SK.x, SK.kare, p) / (0.62 * PXC / Math.PI) : 0; // faz = yol / yarım adım
  const penX = [245, 520, 795, 1070], kat: [number, number][] = [[1.2, 2.8], [4.5, 6.2], [8.0, 9.7]];
  const yanik = (i: number, j: number) => (j === 0 && i === 1) || (j === 1 && i === 2) || (j === 2 && i === 1);
  if (SK && gorunur) kilit.push({ ad: "sekreter ayak", p: ekranNokta(k, [sx, yC(-0.15)]), tur: "ayak" });
  kilit.push({ ad: "daktilo penceresi", p: ekranNokta(k, [580, 1030]), tur: "kurulum" });
  const araba = (<g transform={`translate(${ax} 0)`}>
    {/* park araba (yan profil, sağa bakar; 1937–42 genel sedan siluet: ayrık çamurluk, basamak, yuvarlak bagaj) */}
    <ellipse cx={923} cy={1272} rx={300} ry={10} fill="#14121a" opacity={0.5} />
    <path d="M 650 1230 Q 648 1190 690 1180 L 760 1176 Q 790 1120 850 1112 L 980 1110 Q 1050 1112 1090 1170 L 1170 1180 Q 1206 1186 1204 1225 L 1200 1246 L 655 1246 Z" fill="#3d4640" stroke={mur} strokeWidth={3} />
    <path d="M 800 1172 Q 820 1128 860 1122 L 940 1120 L 940 1172 Z M 952 1120 L 1000 1121 Q 1050 1128 1070 1172 L 952 1172 Z" fill="#4d5b84" stroke={mur} strokeWidth={2} />
    <rect x={760 + 120 * (1 - kapiA) * 0} y={1174} width={120 * (1 - 0.7 * kapiA)} height={70} fill="#46504a" stroke={mur} strokeWidth={2} />
    <line x1={770} y1={1200} x2={790} y2={1200} stroke={CIC.krom} strokeWidth={3} />
    <path d="M 660 1246 L 1200 1246 L 1190 1256 L 670 1256 Z" fill="#2a302c" />
    {[740, 1110].map((wx) => <g key={wx}><circle cx={wx} cy={1246} r={30} fill="#1c1e22" /><circle cx={wx} cy={1246} r={12} fill={CIC.krom} /></g>)}
    <Tarama sekil={[[690, 1230], [1190, 1230], [1190, 1246], [690, 1246]]} basamak="III" aci={20} renk={CIC.tarama} derinlik="orta" seed={SEED + 30} />
    <line x1={660} y1={1200} x2={1200} y2={1196} stroke="#f0d0bc" strokeWidth={2} opacity={0.5} />
  </g>);
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <rect x={0} y={0} width={1080} height={1920} fill="#26283a" />
      <RenkKaydi>
        <g transform={kam}>
          {/* gök 3 basamak + sol boşlukta batı ışıması */}
          <rect x={-200} y={-400} width={1500} height={900} fill="#4d5b84" />
          <rect x={-200} y={500} width={1500} height={700} fill="#6f86ad" />
          <polygon points={poly([[-200, 700], [270, 700], [270, 1000], [-200, 1000]])} fill="#f0d0bc" />
          <rect x={-200} y={640} width={470} height={60} fill="#c9a6a0" />
          {/* bahçe duvarı + 2 düzensiz ağaç tepesi (siluet) */}
          <path d={`M -200 1250 L -200 960 Q -120 820 -40 880 Q 20 800 90 870 Q 160 830 200 930 Q 240 900 262 980 L 262 1250 Z`} fill="#2f3550" />
          <rect x={-200} y={yC(2.2)} width={462} height={2.2 * PXC} fill="#363c58" stroke={mur} strokeWidth={2} />
          {/* cephe: sıva, silmeler, andezit subasman, düz lento pencereler (akşam), kapı + beton saçak + 2 basamak */}
          <rect x={262} y={-200} width={1100} height={DIP + 200} fill="#6e6470" />
          {[4.1, 7.6].map((h) => <rect key={h} x={262} y={yC(h + 0.15)} width={1100} height={0.15 * PXC} fill="#7e7480" stroke={mur} strokeWidth={1.5} />)}
          <rect x={262} y={yC(1.0)} width={1100} height={PXC} fill={CIC.andezit} />
          {[0, 1, 2].map((r) => <line key={r} x1={262} y1={yC(1.0) + 36 * (r + 1)} x2={1362} y2={yC(1.0) + 36 * (r + 1)} stroke="#4a4652" strokeWidth={2} />)}
          {penX.map((x0, i) => kat.map(([a, b2], j) => { if (j === 0 && i === 0) return null; const w = 1.1 * PXC, lit = yanik(i, j); return <g key={`${i}${j}`}>
            <rect x={x0 - 6} y={yC(b2) - 6} width={w + 12} height={(b2 - a) * PXC + 12} fill="#5e5664" />
            <rect x={x0} y={yC(b2)} width={w} height={(b2 - a) * PXC} fill={lit ? (j === 0 ? CIC.daktiloIc : "#e4bc98") : "#3a3d58"} />
            <polygon points={poly([[x0, yC(b2)], [x0 + 14, yC(b2)], [x0 + 14, yC(a)], [x0, yC(a)]])} fill="#2e2c40" opacity={0.6} />
            <line x1={x0 + w / 2} y1={yC(b2)} x2={x0 + w / 2} y2={yC(a)} stroke="#4a4458" strokeWidth={4} />
            <rect x={x0 - 8} y={yC(a)} width={w + 16} height={7} fill="#8a8090" />
            {j === 0 && lit && <polygon points={poly([[x0 - 10, DIP], [x0 + w + 10, DIP], [x0 + w + 40, kald], [x0 - 40, kald]])} fill="#8c6f66" />}
          </g>; }))}
          {/* daktilo başında sekreter (pencereKalkis'e kadar) */}
          {masada && <g transform={`translate(0 ${DK.yaziyor ? Math.sin(p * 1.7) * 0.6 : 0})`}><SiluetFigur40 kod="topuzlu" ayak={[575, yC(1.2) + 0.95 * PXC]} pxm={PXC} renk={CIC.sekreter} yon={1} oturan={0.45} golge={false} kirp={yC(1.2)} /></g>}
          <polygon points={poly([[592, yC(1.2)], [622, yC(1.2)], [618, yC(1.2) - 12], [596, yC(1.2) - 12]])} fill="#2e2a38" />
          {/* kapı + saçak + basamaklar */}
          <rect x={330} y={yC(2.6) - 4} width={154} height={2.6 * PXC} fill="#2e2630" stroke={mur} strokeWidth={3} />
          <line x1={407} y1={yC(2.6)} x2={407} y2={yC(0.3)} stroke={mur} strokeWidth={3} />
          <rect x={300} y={yC(3.1) - 6} width={214} height={12} fill="#8a8494" stroke={mur} strokeWidth={2} />
          <Tarama sekil={[[300, yC(3.1) + 6], [514, yC(3.1) + 6], [514, yC(3.1) + 22], [300, yC(3.1) + 22]]} basamak="III" aci={20} renk={CIC.tarama} derinlik="orta" seed={SEED + 31} />
          <rect x={318} y={yC(0.3)} width={178} height={0.15 * PXC} fill="#6a6474" stroke={mur} strokeWidth={2} />
          <rect x={306} y={yC(0.15)} width={202} height={0.15 * PXC} fill="#7a7484" stroke={mur} strokeWidth={2} />
          {/* kaldırım + yanık pencere yamukları */}
          <rect x={-200} y={DIP} width={1500} height={kald - DIP} fill="#55606e" />
          {/* sekreter (yürür) — biner karesinden sonra arabanın arkasında (önde olan arkadakini örter) */}
          {SK && gorunur && <SiluetFigur40 kod="topuzlu" ayak={[sx, kald - 30 + (SK.biner !== undefined ? Math.max(0, Math.min(1, (p - (SK.biner - 14)) / 14)) * 90 : 0)]} pxm={PXC * 1.04} renk={CIC.sekreter} yon={1} adim={adim} kenar={{ renk: "#f0d0bc", dx: -2 }} />}
          {araba}
          {/* yol + karşı kaldırım (ön plan) */}
          <rect x={-200} y={kald} width={1500} height={420} fill="#2f3550" />
          <rect x={-200} y={kald + 260} width={1500} height={160} fill="#26283a" />
          <rect x={-200} y={1700} width={1500} height={40} fill={CIC.andezit} stroke={mur} strokeWidth={3} />
          <rect x={-200} y={1740} width={1500} height={400} fill="#3a3e50" />
        </g>
      </RenkKaydi>
    </svg>
  );
};
export const ARABA: Sablon = { Sahne, arsiv: (plan) => (param<string>(plan, "gorunum", "ic") === "dis" ? "litografi" : "gunduzMineral") };
