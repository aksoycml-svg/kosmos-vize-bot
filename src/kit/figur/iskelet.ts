// ===== Figür kiti 1: 2D İSKELET (Leningrad figür kararı, 2026-11-16; yalnız EKLEME) =====
// Neden: yakın plan figür (Leningrad P08) elle koordinatla çiziliyordu; omuz, dirsek, çene–boyun her karede yeniden "tahmin" ediliyordu.
// Bu dosya figürü kemik zinciriyle kurar: pelvis → bel → göğüs → boyun dibi (C7) → atlas (baş eklemi); omuz → dirsek → bilek → el;
// kalça → diz → ayak bileği → ayak. Uzunluklar ORAN tablosundan (baş birimi B; yetişkin 7.5 B), açılar sınırlı, IK = FABRIK.
// Saf TS (React yok). Çizim: Govde.tsx / Kafa.tsx.
//
// Koordinat: ekran px, y aşağı. Açılar derece, ekran düzleminde (0 = +x, 90 = aşağı, saat yönü +).
// yon: figürün yüzünün baktığı ekran yanı (+1 sağ, −1 sol). yaw: gövdenin kameradan dönüş büyüklüğü (0 = karşıdan, 90 = profil).
// Taraf: anatomik ("sol" = kişinin solu). Karşıdan/¾ bakışta kişinin solu ekranın sağındadır (sırt görünümü desteklenmez).
// Yerel açı sözleşmesi (+ = yüzün baktığı yana / öne):
//   kol.ust: üst kolun gövde-aşağı eksenine göre açısı (+ öne kalkar; 90 = öne yatay, 180 = baş üstü)
//   kol.dirsek: bükülme 0..155 (yalnız öne; ters bükülmez) · kol.bilek: −70..80
//   bacak.kalca: uyluğun DÜNYA dikeyine göre açısı (+ öne) · bacak.diz: 0..160 (yalnız geriye) · bacak.ayak: −25..60 (+ parmak aşağı)

export type P2 = [number, number];
export type Taraf = "sol" | "sag";
export const TARAFLAR: Taraf[] = ["sol", "sag"];

/** Oran tablosu (baş birimi). Kaynak: klasik 7.5 baş kanonu (Loomis, "Figure Drawing for All It's Worth" oranları). */
export const ORAN = {
  boy: 7.5,
  bas: 1, // tepe → çene
  omurgaAlt: 0.6, // pelvis (kalça eklemleri ortası) → bel (L3)
  omurgaOrta: 0.75, // bel → göğüs (T6)
  omurgaUst: 0.88, // göğüs → boyun dibi (C7)
  boyun: 0.7, // C7 → atlas (kafatası eklemi, kulak memesi hizası)
  omuzYari: 0.85, // gövde ekseninden omuz eklemine (karşıdan)
  omuzAlcak: 0.12, // omuz eklemi C7'nin altında
  omuzGeri: 0.08, // profilde omuz eklemi gövde ekseninin arkasında (CLAUDE "Omuz" 1)
  omuzKalk: 0.22, // tam kalkmada omuz eklemi yukarı
  kalcaYari: 0.42,
  ustKol: 1.45, onKol: 1.2, el: 0.75, elHedef: 0.55, // elHedef: bilekten avuç/boğum temas noktasına
  uyluk: 1.8, baldir: 1.8, ayakYuk: 0.28, ayakBoy: 1.05, topukGeri: 0.22,
} as const;

/** Eklem sınırları (yerel derece, yukarıdaki sözleşme) */
export const SINIR = {
  ust: [-60, 175] as P2, dirsek: [0, 155] as P2, bilek: [-70, 80] as P2,
  kalca: [-45, 130] as P2, diz: [0, 160] as P2, ayak: [-25, 80] as P2,
};

// ---------------- vektör yardımcıları ----------------
export const yonV = (deg: number): P2 => [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)];
export const aciV = (a: P2, b: P2) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
export const ekle = (a: P2, b: P2, k = 1): P2 => [a[0] + b[0] * k, a[1] + b[1] * k];
export const fark = (a: P2, b: P2): P2 => [a[0] - b[0], a[1] - b[1]];
export const uzak = (a: P2, b: P2) => Math.hypot(b[0] - a[0], b[1] - a[1]);
export const lerp2 = (a: P2, b: P2, t: number): P2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
/** (−180, 180] */
export const sar = (d: number) => { let x = ((d + 180) % 360 + 360) % 360 - 180; if (x === -180) x = 180; return x; };
const kis = (v: number, [a, b]: P2) => Math.max(a, Math.min(b, v));
const ss = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// ---------------- FABRIK IK (kısıtlı) ----------------
/** Göreli açı sınırı: kemik i'nin bir önceki kemiğe (i = 0 için refAci'ye) göre ekran açısı aralığı [min, max] (derece). */
export type AciAralik = P2 | null;
/**
 * FABRIK (Aristidou & Lasenby 2011): geri geçiş uç → hedef, ileri geçiş kök → sabit; ileri geçişte her kemik göreli açı sınırına kıstırılır
 * (dirsek/diz ters bükülmez). Başlangıç zinciri doğru bükülme yönünde verilmeli (FK pozundan). Erişilemeyen hedefte zincir sınır içinde uzanır.
 */
export function fabrik(zincir: P2[], hedef: P2, opt: { sinir?: AciAralik[]; refAci?: number; iter?: number; tol?: number } = {}) {
  const n = zincir.length, L = zincir.slice(1).map((p, i) => uzak(zincir[i], p));
  const p = zincir.map((q) => [q[0], q[1]] as P2), kok = p[0];
  const iler = () => {
    p[0] = kok;
    for (let i = 0; i < n - 1; i++) {
      const ebeveyn = i === 0 ? (opt.refAci ?? aciV(p[0], p[1])) : aciV(p[i - 1], p[i]);
      let a = aciV(p[i], p[i + 1]);
      const s = opt.sinir?.[i];
      if (s) a = ebeveyn + kis(sar(a - ebeveyn), s);
      p[i + 1] = ekle(p[i], yonV(a), L[i]);
    }
  };
  const iter = opt.iter ?? 40, tol = opt.tol ?? 0.25;
  for (let k = 0; k < iter; k++) {
    if (uzak(p[n - 1], hedef) < tol) break;
    p[n - 1] = [hedef[0], hedef[1]];
    for (let i = n - 2; i >= 0; i--) p[i] = ekle(p[i + 1], yonV(aciV(p[i + 1], p[i])), L[i]);
    iler();
  }
  iler(); // sonuç her zaman sınırlı ileri geçişten (uzunluk + açı garantili)
  return { nokta: p, hata: uzak(p[n - 1], hedef) };
}

// ---------------- poz girdisi ----------------
export type ElPozAdi = "sarkik" | "dayali" | "tutus" | "avuc";
export type KolPoz = {
  ust?: number; dirsek?: number; bilek?: number;
  /** omuz kalkması 0..1 (kol başın üstüne çıkınca kendiliğinden de kalkar) */
  kalk?: number;
  /** IK hedefi (ekran px). hedefNokta "el" (varsayılan): avuç/boğum temas noktası · "bilek" */
  hedef?: P2; hedefNokta?: "el" | "bilek";
  /** gövdenin önünde mi çizilir (varsayılan: yakın taraf önde; karşıdan bakışta ikisi de) */
  onde?: boolean;
  el?: ElPozAdi; elAyna?: boolean;
};
export type BacakPoz = { kalca?: number; diz?: number; ayak?: number; hedef?: P2; onde?: boolean };
export type Poz = {
  /** pelvis ekran konumu (zemin verilirse yalnız x bağlayıcı; y zemine oturtulur) */
  kok: P2;
  /** px / baş birimi (bkz. derinlikOlcek) */
  B: number;
  yon?: 1 | -1; yaw?: number;
  egim?: number; gogusEgim?: number; boyunEgim?: number;
  bas?: { yaw?: number; pitch?: number; roll?: number };
  kol?: Partial<Record<Taraf, KolPoz>>;
  bacak?: Partial<Record<Taraf, BacakPoz>>;
  /** zemin y (px): en alçak temas noktası (topuk / ayak ucu / yere değen diz) buraya oturur */
  zemin?: number;
  /** true: kol/bacak hedefleri kok'a göreli verilmiş (zemine oturtma pelvisi kaydırınca hedef de kayar; pozdan böyle üretir) */
  hedefGoreli?: boolean;
};

// ---------------- iskelet çıktısı ----------------
export type KolIsk = {
  omuz: P2; dirsek: P2; bilek: P2; elUc: P2; kalk: number; onde: boolean; yakin: boolean;
  ustAci: number; onKolAci: number; elAci: number; el: ElPozAdi; elAyna: boolean; hata: number;
};
export type BacakIsk = {
  kalca: P2; diz: P2; bilek: P2; topuk: P2; ayakTop: P2; ayakUc: P2; dizOn: P2; onde: boolean; yakin: boolean;
  uylukAci: number; baldirAci: number; ayakAci: number; hata: number;
  /** zemine değen noktalar (temas gölgesi + ses olayı için) */
  temas: P2[];
};
export type Iskelet = {
  B: number; yon: 1 | -1; yaw: number;
  pelvis: P2; bel: P2; gogus: P2; boyunDip: P2; atlas: P2;
  /** gövde çerçeveleri: u = gövde yukarı birim, r = ekran sağına dik birim (seviye: alt = pelvis–bel, ust = göğüs–C7) */
  cerceve: { alt: { u: P2; r: P2 }; orta: { u: P2; r: P2 }; ust: { u: P2; r: P2 }; boyun: { u: P2; r: P2 } };
  kol: Record<Taraf, KolIsk>; bacak: Record<Taraf, BacakIsk>;
  /** Kafa.tsx için toplam baş dönüşü (gövde + boyun + baş) */
  bas: { yaw: number; pitch: number; roll: number };
  yakinTaraf: Taraf; zemin?: number;
};

/** anatomik taraf → ekran yanal işareti (karşıdan/¾: kişinin solu ekranın sağında) */
export const yanIsaret = (t: Taraf) => (t === "sol" ? 1 : -1);

/**
 * Gövde 3B kesitinden ekrana: X = kişinin soluna (B), Z = öne (B), U = gövde yukarı (B).
 * ekran = c + rX·X·cosY·B + r·Z·sinY·yon·B + u·U·B  (ortografik; yaw kameraya göre gövde dönüşü).
 * Ekrandaki gövde eğimi ¾/profilde ÖNE eğilmedir (yanal eksen yatay kalır), karşıdan YANA eğilmedir (yanal eksen gövdeyle döner):
 * rX = yatay ile r arasında cos²Y ağırlıklı karışım. (Yalnız r kullanılınca öne eğik ¾ figürde uzak omuz göğüs hizasına iniyordu.)
 */
export const govdeIzdus = (isk: Pick<Iskelet, "B" | "yon" | "yaw">, c: P2, fr: { u: P2; r: P2 }, X: number, Z: number, U = 0): P2 => {
  const y = (isk.yaw * Math.PI) / 180, w = Math.cos(y) ** 2, h = fr.r[0] >= 0 ? 1 : -1;
  let rx = h * (1 - w) + fr.r[0] * w, ry = fr.r[1] * w; const rl = Math.hypot(rx, ry) || 1; rx /= rl; ry /= rl;
  const lx = X * Math.cos(y) * isk.B, lz = Z * Math.sin(y) * isk.yon * isk.B;
  return [c[0] + rx * lx + fr.r[0] * lz + fr.u[0] * U * isk.B, c[1] + ry * lx + fr.r[1] * lz + fr.u[1] * U * isk.B];
};

const cerceveAci = (yukariAci: number) => { const u = yonV(yukariAci); return { u, r: [-u[1], u[0]] as P2 }; };

/** Pozdan iskelet (FK + kısıtlı FABRIK). */
export function iskeletKur(pz: Poz): Iskelet {
  const B = pz.B, yon = pz.yon ?? 1, yaw = Math.max(0, Math.min(90, pz.yaw ?? 30));
  const yakinTaraf: Taraf = yon > 0 ? "sag" : "sol";
  const hd = (h: P2, pel: P2): P2 => (pz.hedefGoreli ? [h[0] + pel[0] - pz.kok[0], h[1] + pel[1] - pz.kok[1]] : h);
  // ---- bacaklar (pelvise göre) → zemine oturt ----
  const bacakKur = (pel: P2, t: Taraf): BacakIsk => {
    const bp = pz.bacak?.[t] ?? {};
    const fr0 = cerceveAci(-90 + yon * (pz.egim ?? 0) * 0.35);
    const kalca = govdeIzdus({ B, yon, yaw }, pel, fr0, yanIsaret(t) * ORAN.kalcaYari, 0);
    let uA = 90 - yon * kis(bp.kalca ?? 0, SINIR.kalca);
    let bA = uA + yon * kis(bp.diz ?? 4, SINIR.diz);
    let diz = ekle(kalca, yonV(uA), ORAN.uyluk * B), bilek = ekle(diz, yonV(bA), ORAN.baldir * B), hata = 0;
    if (bp.hedef) {
      const sinirK: P2 = yon > 0 ? [-SINIR.kalca[1], -SINIR.kalca[0]] : SINIR.kalca;
      const sinirD: P2 = yon > 0 ? SINIR.diz : [-SINIR.diz[1], -SINIR.diz[0]];
      // başlangıç: dizi hafif bükük (doğru yön)
      const d0 = ekle(kalca, yonV(90 - yon * 25), ORAN.uyluk * B), b0 = ekle(d0, yonV(90 + yon * 20), ORAN.baldir * B);
      const s = fabrik([kalca, d0, b0], hd(bp.hedef, pel), { sinir: [sinirK, sinirD], refAci: 90 });
      [, diz, bilek] = s.nokta; hata = s.hata; uA = aciV(kalca, diz); bA = aciV(diz, bilek);
    }
    const aA = bA - yon * 90 + yon * kis(bp.ayak ?? 0, SINIR.ayak);
    const f = yonV(aA), taban: P2 = [-f[1] * yon, f[0] * yon];
    const topuk = ekle(ekle(bilek, f, -ORAN.topukGeri * B), taban, ORAN.ayakYuk * B);
    const ayakTop = ekle(ekle(bilek, f, 0.6 * B), taban, ORAN.ayakYuk * B);
    const ayakUc = ekle(ekle(bilek, f, (ORAN.ayakBoy - ORAN.topukGeri) * B), taban, ORAN.ayakYuk * 0.85 * B);
    const bd = yonV(bA), dizOn = ekle(diz, [bd[1] * yon, -bd[0] * yon], 0.22 * B);
    const yakin = t === yakinTaraf;
    return { kalca, diz, bilek, topuk, ayakTop, ayakUc, dizOn, onde: bp.onde ?? yakin, yakin, uylukAci: uA, baldirAci: bA, ayakAci: aA, hata, temas: [] };
  };
  let pelvis: P2 = [pz.kok[0], pz.kok[1]];
  if (pz.zemin !== undefined) {
    const enAlt = Math.max(...TARAFLAR.flatMap((t) => { const b = bacakKur(pelvis, t); return [b.topuk[1], b.ayakUc[1], b.ayakTop[1], b.dizOn[1]]; }));
    pelvis = [pelvis[0], pelvis[1] + (pz.zemin - enAlt)];
  }
  const bacak = { sol: bacakKur(pelvis, "sol"), sag: bacakKur(pelvis, "sag") };
  if (pz.zemin !== undefined) for (const t of TARAFLAR) {
    const b = bacak[t];
    b.temas = [b.topuk, b.ayakTop, b.ayakUc, b.dizOn].filter((q) => Math.abs(q[1] - pz.zemin!) < 0.06 * B);
  }
  // ---- omurga ----
  const e = pz.egim ?? 0, ge = pz.gogusEgim ?? 0, be = pz.boyunEgim ?? 10;
  const aAlt = -90 + yon * e * 0.6, aOrta = -90 + yon * e, aUst = -90 + yon * (e + ge), aBoyun = -90 + yon * (e + ge + be);
  const bel = ekle(pelvis, yonV(aAlt), ORAN.omurgaAlt * B);
  const gogus = ekle(bel, yonV(aOrta), ORAN.omurgaOrta * B);
  const boyunDip = ekle(gogus, yonV(aUst), ORAN.omurgaUst * B);
  const atlas = ekle(boyunDip, yonV(aBoyun), ORAN.boyun * B);
  const cerceve = { alt: cerceveAci(aAlt), orta: cerceveAci(aOrta), ust: cerceveAci(aUst), boyun: cerceveAci(aBoyun) };
  // ---- kollar ----
  const kolKur = (t: Taraf): KolIsk => {
    const kp = pz.kol?.[t] ?? {};
    const fr = cerceve.ust, asagi = aUst + 180;
    const omuzAt = (k: number) => {
      const o = govdeIzdus({ B, yon, yaw }, boyunDip, fr, yanIsaret(t) * ORAN.omuzYari * (1 - 0.06 * k), -ORAN.omuzGeri, -ORAN.omuzAlcak + ORAN.omuzKalk * k);
      return o;
    };
    const sinirU: P2 = yon > 0 ? [-SINIR.ust[1], -SINIR.ust[0]] : SINIR.ust;
    const sinirD: P2 = yon > 0 ? [-SINIR.dirsek[1], -SINIR.dirsek[0]] : SINIR.dirsek;
    const sinirB: P2 = yon > 0 ? [-SINIR.bilek[1], -SINIR.bilek[0]] : SINIR.bilek;
    const coz = (k: number) => {
      const omuz = omuzAt(k);
      let uA = asagi - yon * kis(kp.ust ?? 4, SINIR.ust);
      let oA = uA - yon * kis(kp.dirsek ?? 14, SINIR.dirsek);
      let eA = oA - yon * kis(kp.bilek ?? 0, SINIR.bilek);
      let dirsek = ekle(omuz, yonV(uA), ORAN.ustKol * B), bilek = ekle(dirsek, yonV(oA), ORAN.onKol * B), hata = 0;
      if (kp.hedef) {
        const d0 = ekle(omuz, yonV(asagi - yon * 30), ORAN.ustKol * B), b0 = ekle(d0, yonV(asagi - yon * 75), ORAN.onKol * B);
        if ((kp.hedefNokta ?? "el") === "bilek") {
          const s = fabrik([omuz, d0, b0], hd(kp.hedef, pelvis), { sinir: [sinirU, sinirD], refAci: asagi });
          [, dirsek, bilek] = s.nokta; hata = s.hata; uA = aciV(omuz, dirsek); oA = aciV(dirsek, bilek); eA = oA - yon * kis(kp.bilek ?? 0, SINIR.bilek);
        } else {
          const e0 = ekle(b0, yonV(asagi - yon * 75), ORAN.elHedef * B);
          const s = fabrik([omuz, d0, b0, e0], hd(kp.hedef, pelvis), { sinir: [sinirU, sinirD, sinirB], refAci: asagi });
          [, dirsek, bilek] = s.nokta; hata = s.hata; uA = aciV(omuz, dirsek); oA = aciV(dirsek, bilek); eA = aciV(bilek, s.nokta[3]);
        }
      }
      return { omuz, dirsek, bilek, uA, oA, eA, hata };
    };
    // kol yükseldikçe omuz kalkar (kürek kemiği dönmesi): üst kol gövde-aşağıdan 70°'den sonra
    let s = coz(kp.kalk ?? 0);
    const yuk = Math.abs(sar(s.uA - asagi));
    const k = Math.max(kp.kalk ?? 0, ss(70, 165, yuk));
    if (k > (kp.kalk ?? 0) + 0.01) s = coz(k);
    const yakin = t === yakinTaraf;
    return {
      omuz: s.omuz, dirsek: s.dirsek, bilek: s.bilek, elUc: ekle(s.bilek, yonV(s.eA), ORAN.el * B), kalk: k,
      onde: kp.onde ?? (yakin || yaw < 20), yakin, ustAci: s.uA, onKolAci: s.oA, elAci: s.eA, el: kp.el ?? "sarkik", elAyna: kp.elAyna ?? yon < 0, hata: s.hata,
    };
  };
  const kol = { sol: kolKur("sol"), sag: kolKur("sag") };
  // ---- baş: gövde dönüşü + boyun eğimi + baş ----
  const yR = (yaw * Math.PI) / 180, boyunOne = e + ge + be;
  const bas = {
    yaw: Math.max(-90, Math.min(90, yon * yaw + (pz.bas?.yaw ?? 0))),
    pitch: (pz.bas?.pitch ?? 0) + boyunOne * Math.cos(yR) * 0.5,
    roll: (pz.bas?.roll ?? 0) + yon * boyunOne * Math.sin(yR) * 0.45,
  };
  return { B, yon, yaw, pelvis, bel, gogus, boyunDip, atlas, cerceve, kol, bacak, bas, yakinTaraf, zemin: pz.zemin };
}

/** Giyim/kumaş için çapa noktaları (ekran px). kemer: bel hizasında gövde silüetinin ekran-sol / ekran-sağ kenarı. */
export type Capalar = {
  omuz: Record<Taraf, P2>; dirsek: Record<Taraf, P2>; bilek: Record<Taraf, P2>; diz: Record<Taraf, P2>; ayakBilek: Record<Taraf, P2>;
  kemer: { sol: P2; sag: P2; orta: P2 }; boyun: P2; pelvis: P2;
};
export function capalar(isk: Iskelet): Capalar {
  const t2 = <T,>(f: (t: Taraf) => T) => ({ sol: f("sol"), sag: f("sag") });
  const fr = isk.cerceve.alt;
  // bel kesiti (Govde.tsx KESIT.bel ile aynı: yarı genişlik 0.6, ön 0.4, arka 0.22) → ekran-sol / ekran-sağ uç
  const q = Array.from({ length: 36 }, (_, i) => { const t = (i / 36) * Math.PI * 2, s = Math.sin(t); return govdeIzdus(isk, isk.bel, fr, 0.6 * Math.cos(t), s * (s > 0 ? 0.4 : 0.22)); });
  const l = (p: P2) => (p[0] - isk.bel[0]) * fr.r[0] + (p[1] - isk.bel[1]) * fr.r[1];
  const ks = q.reduce((a, p) => (l(p) < l(a) ? p : a)), kg = q.reduce((a, p) => (l(p) > l(a) ? p : a));
  return {
    omuz: t2((t) => isk.kol[t].omuz), dirsek: t2((t) => isk.kol[t].dirsek), bilek: t2((t) => isk.kol[t].bilek),
    diz: t2((t) => isk.bacak[t].diz), ayakBilek: t2((t) => isk.bacak[t].bilek),
    kemer: { sol: ks, sag: kg, orta: isk.bel },
    boyun: isk.boyunDip, pelvis: isk.pelvis,
  };
}

/**
 * Derinlik → ölçek (iğne deliği kamera). Karakter konumu (z derinlik m, u yanal m) → zemin noktası + B.
 * kamera: odak (px; 1 m'deki 1 m'nin px boyu), ufukY (göz hizası ekran y), merkezX, yukseklik (kamera yerden m).
 * Ayakta yetişkinin başı, kamera göz hizasındaysa (≈1.6 m) ufka yakın düşer (CLAUDE "Ufuk–ölçek").
 */
export function derinlikOlcek(z: number, u: number, kamera: { odak: number; ufukY: number; merkezX: number; yukseklik: number }, boyM = 1.75) {
  const k = kamera.odak / Math.max(0.05, z);
  return { zemin: [kamera.merkezX + u * k, kamera.ufukY + kamera.yukseklik * k] as P2, B: (boyM / ORAN.boy) * k, olcek: k };
}
