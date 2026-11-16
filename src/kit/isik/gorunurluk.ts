// ===== gorunurluk.ts — 2D görünürlük ("ışık") çokgeni, bağımlılıksız =====
// Yöntem: Red Blob Games "2D Visibility" açısal taraması. Olay açıları = engel uç noktaları + sınır köşeleri
// (+ koni kenarları). Açılar sıralanır; her olay açısında a−ε, a, a+ε ışınları atılır ve en yakın kenar kesişimi
// çokgen köşesi olur. "Açık kenar" sıralaması yerine en yakın kesişim doğrudan hesaplanır: engeller birbirine
// girse (figür sedyenin önünde, kol gövdeyle kesişiyor) de sonuç doğru kalır. Saf matematik → deterministik
// (aynı girdi = aynı çıktı, kaynama yok). ~200 kenarda kare başına ~1 ms (bkz. README).
//
// Koordinatlar ekran pikselidir (y aşağı). Açılar radyan, atan2(dy, dx) (0 = sağ, +π/2 = aşağı).

export type P2 = [number, number];
export type Parca = [P2, P2];

export type Sinir = { x: number; y: number; w: number; h: number };

export type Koni = {
  /** huzmenin merkez yönü (radyan; π/2 = aşağı) */
  yon: number;
  /** yarım açı (radyan); ≥ π ise tam daire */
  yari: number;
};

export type GorunurlukGirdi = {
  kaynak: P2;
  /** kapalı çokgenler (figür, sedye, mobilya silueti). Son nokta = ilk nokta tekrarı gerekmez. */
  engeller?: P2[][];
  /** açık çizgi parçaları (duvar, raf kenarı, pencere kayıtları) */
  parcalar?: Parca[];
  /** dış sınır (genelde kare: 0,0,1080,1920). Kaynak sınır içinde olmalı (dışındaysa içeri kıstırılır). */
  sinir: Sinir;
  koni?: Koni;
};

const EPS_ACI = 1e-5;
const TAM = Math.PI * 2;

/** açıyı (-π, π] aralığına getirir */
const sar = (a: number) => {
  let r = a % TAM;
  if (r <= -Math.PI) r += TAM;
  if (r > Math.PI) r -= TAM;
  return r;
};

/** Engel çokgenlerini + parçaları + sınırı tek kenar listesine çevirir. */
export function kenarlar(g: Pick<GorunurlukGirdi, "engeller" | "parcalar" | "sinir">): Parca[] {
  const out: Parca[] = [];
  const { x, y, w, h } = g.sinir;
  const k: P2[] = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  for (let i = 0; i < 4; i++) out.push([k[i], k[(i + 1) % 4]]);
  for (const c of g.engeller ?? []) {
    const n = c.length;
    if (n < 2) continue;
    for (let i = 0; i < n; i++) {
      const a = c[i], b = c[(i + 1) % n];
      if (a[0] !== b[0] || a[1] !== b[1]) out.push([a, b]);
    }
  }
  for (const p of g.parcalar ?? []) out.push(p);
  return out;
}

/** S'den θ yönüne atılan ışının en yakın kesişimi (t: mesafe). Sınır kenarı her zaman olduğu için hep vurur. */
function isinAt(sx: number, sy: number, th: number, ks: Parca[]): P2 {
  const dx = Math.cos(th), dy = Math.sin(th);
  let enT = Infinity;
  for (let i = 0; i < ks.length; i++) {
    const a = ks[i][0], b = ks[i][1];
    const ex = b[0] - a[0], ey = b[1] - a[1];
    const den = dx * ey - dy * ex;
    if (den > -1e-12 && den < 1e-12) continue; // paralel
    const ax = a[0] - sx, ay = a[1] - sy;
    const t = (ax * ey - ay * ex) / den;
    if (t <= 1e-9 || t >= enT) continue;
    const u = (ax * dy - ay * dx) / den;
    if (u < -1e-9 || u > 1 + 1e-9) continue;
    enT = t;
  }
  if (!isFinite(enT)) enT = 0;
  return [sx + dx * enT, sy + dy * enT];
}

/**
 * Görünürlük çokgeni. Tam daire: kaynağı çevreleyen kapalı çokgen (açı sırasıyla).
 * Koni: ilk nokta kaynak, sonra koni kenarından kenarına taranan noktalar (yelpaze).
 */
export function gorunurlukCokgeni(g: GorunurlukGirdi): P2[] {
  const { sinir } = g;
  const sx = Math.min(sinir.x + sinir.w - 0.01, Math.max(sinir.x + 0.01, g.kaynak[0]));
  const sy = Math.min(sinir.y + sinir.h - 0.01, Math.max(sinir.y + 0.01, g.kaynak[1]));
  const ks = kenarlar(g);
  const koni = g.koni && g.koni.yari < Math.PI ? g.koni : undefined;

  // olay açıları (koniye göre göreli tutulur: koni varken -yari..+yari, yoksa -π..π)
  const merkez = koni ? koni.yon : 0;
  const rel: number[] = [];
  const ekle = (r: number) => {
    if (koni && (r < -koni.yari || r > koni.yari)) return;
    rel.push(r);
  };
  for (const [a, b] of ks) {
    ekle(sar(Math.atan2(a[1] - sy, a[0] - sx) - merkez));
    ekle(sar(Math.atan2(b[1] - sy, b[0] - sx) - merkez));
  }
  if (koni) { rel.push(-koni.yari, koni.yari); }
  rel.sort((p, q) => p - q);

  const out: P2[] = [];
  const it = (p: P2) => {
    const s = out[out.length - 1];
    if (s && Math.abs(s[0] - p[0]) < 0.01 && Math.abs(s[1] - p[1]) < 0.01) return;
    out.push(p);
  };
  if (koni) out.push([sx, sy]);
  let onceki = -Infinity;
  const alt = koni ? -koni.yari : -Infinity, ust = koni ? koni.yari : Infinity;
  for (const r of rel) {
    if (r - onceki < 1e-9) continue; // aynı açı
    onceki = r;
    for (const d of [-EPS_ACI, 0, EPS_ACI]) {
      const rr = r + d;
      if (rr < alt || rr > ust) continue;
      it(isinAt(sx, sy, merkez + rr, ks));
    }
  }
  return dogrusalSadelestir(out, koni ? 1 : 0);
}

/** Aynı doğru üstündeki ara noktaları atar (path kısalır; şekil aynı). bas: korunacak baştaki nokta sayısı. */
function dogrusalSadelestir(n: P2[], bas: number): P2[] {
  if (n.length < 4) return n;
  const out: P2[] = n.slice(0, bas);
  const govde = n.slice(bas);
  for (let i = 0; i < govde.length; i++) {
    const a = out.length > bas ? out[out.length - 1] : govde[(i - 1 + govde.length) % govde.length];
    const b = govde[i], c = govde[(i + 1) % govde.length];
    if (i > 0 && i < govde.length - 1) {
      const cr = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
      const l = Math.hypot(c[0] - a[0], c[1] - a[1]) || 1;
      if (Math.abs(cr) / l < 0.05) continue;
    }
    out.push(b);
  }
  return out;
}

/** Noktaları kapalı SVG path'ine çevirir. */
export function cokgenD(n: P2[]): string {
  if (n.length === 0) return "";
  let s = `M${n[0][0].toFixed(2)},${n[0][1].toFixed(2)}`;
  for (let i = 1; i < n.length; i++) s += `L${n[i][0].toFixed(2)},${n[i][1].toFixed(2)}`;
  return s + "Z";
}

// ---------- gölge yardımcıları (aynı kaynak tanımından) ----------

/** p noktasındaki gölgenin düştüğü birim yön (kaynaktan uzağa). */
export function golgeYonu(kaynak: P2, p: P2): P2 {
  const dx = p[0] - kaynak[0], dy = p[1] - kaynak[1];
  const l = Math.hypot(dx, dy) || 1;
  return [dx / l, dy / l];
}

/**
 * Zemin gölgesinin uzanımı (yan görünüş): zemine p noktasında basan, `nesneYuk` px boyundaki dikey nesnenin
 * tepesinden geçen ışın zemin çizgisine (y = p.y) nerede düşer? Dönüş: gölgenin bittiği x
 * (gölge p.x'ten bu x'e uzanır; kaynaktan uzağa). Tepe kaynaktan yüksekteyse gölge sonsuza gider → `maks` ile kırpılır.
 */
export function zeminGolgeUcu(kaynak: P2, p: P2, nesneYuk: number, maks = 2000): number {
  const ty = p[1] - nesneYuk;
  const dy = ty - kaynak[1];
  const yon = Math.sign(p[0] - kaynak[0]) || 1;
  if (dy <= 1e-6) return p[0] + yon * maks;
  const x = kaynak[0] + (p[0] - kaynak[0]) * (p[1] - kaynak[1]) / dy;
  return Math.abs(x - p[0]) > maks ? p[0] + yon * maks : x;
}

/** Engelin kaynağa göre attığı gölge çokgeni (her kenar `uzunluk` px uzatılır). Gölgeyi ayrıca boyamak için. */
export function golgeCokgeni(kaynak: P2, engel: P2[], uzunluk = 4000): P2[][] {
  const out: P2[][] = [];
  const n = engel.length;
  for (let i = 0; i < n; i++) {
    const a = engel[i], b = engel[(i + 1) % n];
    const da = golgeYonu(kaynak, a), db = golgeYonu(kaynak, b);
    out.push([a, b, [b[0] + db[0] * uzunluk, b[1] + db[1] * uzunluk], [a[0] + da[0] * uzunluk, a[1] + da[1] * uzunluk]]);
  }
  return out;
}

/** p noktası çokgenin içinde mi (çift-tek kuralı). Hikâye nesnesi ışıkta mı sorusu için. */
export function icinde(p: P2, c: P2[]): boolean {
  let ic = false;
  for (let i = 0, j = c.length - 1; i < c.length; j = i++) {
    const a = c[i], b = c[j];
    if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) ic = !ic;
  }
  return ic;
}

/** Daire/elips → çokgen (baş, lamba gövdesi gibi yuvarlak engeller için). */
export function elipsCokgen(c: P2, rx: number, ry = rx, adim = 16, don = 0): P2[] {
  const out: P2[] = [];
  for (let i = 0; i < adim; i++) {
    const t = (i / adim) * TAM;
    const x = Math.cos(t) * rx, y = Math.sin(t) * ry;
    out.push([c[0] + x * Math.cos(don) - y * Math.sin(don), c[1] + x * Math.sin(don) + y * Math.cos(don)]);
  }
  return out;
}
