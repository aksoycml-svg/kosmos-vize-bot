#!/usr/bin/env node
// bolum.json doğrulayıcı (SET KİTİ K1). Kullanım:
//   node tools/bolum_dogrula.mjs bolumler/<slug>/bolum.json [--tam] [--temas cikti.json]
// --tam: bölüm düzeyi kurallar (30–60 sn, 8–14 plan, ≤4 şablon) HATA sayılır; yoksa uyarı (örnek/parça dosyaları için).
// --temas: tüm temasların mutlak kare/saniye listesini yazar (kurgucu/teknisyen sesleri bu listeden yerleştirir).
// Sınırlar tek kaynaktan: src/kit/sinirlar.json (KATALOG.md ile aynı).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const kok = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SN = JSON.parse(fs.readFileSync(path.join(kok, "src/kit/sinirlar.json"), "utf8"));
const arg = process.argv.slice(2);
const DEGERLI = ["--temas", "--foley", "--miks"];
const dosya = arg.find((a, i) => !a.startsWith("--") && !DEGERLI.includes(arg[i - 1]));
const argDeger = (ad) => (arg.includes(ad) ? arg[arg.indexOf(ad) + 1] : null);
const TAM = arg.includes("--tam");
const temasCikti = arg.includes("--temas") ? arg[arg.indexOf("--temas") + 1] : null;
if (!dosya) { console.error("kullanım: node tools/bolum_dogrula.mjs <bolum.json> [--tam] [--temas cikti.json] [--foley foley.json] [--miks miks.json]"); process.exit(2); }

const hatalar = [], uyarilar = [];
const H = (yer, m) => hatalar.push(`${yer}: ${m}`);
const U = (yer, m) => uyarilar.push(`${yer}: ${m}`);
let B;
try { B = JSON.parse(fs.readFileSync(dosya, "utf8")); } catch (e) { console.error(`JSON okunamadı: ${e.message}`); process.exit(1); }

// ses eki: foley.json / miks.json (varsayılan bolum json'unun klasörü; yoksa uyarı, hata değil)
const jsonYa = (f) => { try { return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : null; } catch (e) { U("ses", `${f} okunamadı: ${e.message}`); return null; } };
const foleyYol = argDeger("--foley") ?? path.join(path.dirname(dosya), "foley.json");
const miksYol = argDeger("--miks") ?? path.join(path.dirname(dosya), "miks.json");
const FOLEY = jsonYa(foleyYol), MIKS = jsonYa(miksYol);
const foleyEksik = new Set(), foleyTanimsiz = new Map(), foleyKullanilan = new Set();
if (FOLEY) for (const [ad, k] of Object.entries(FOLEY)) {
  if (!k?.dosya) U("foley", `${ad}: dosya alanı yok`);
  else if (!fs.existsSync(path.join(kok, "public", k.dosya))) { foleyEksik.add(ad); U("foley", `${ad}: dosya bulunamadı public/${k.dosya} (render sessiz geçer)`); }
  if (k && k.tepe_ms === undefined) U("foley", `${ad}: tepe_ms yok — ses başı temas karesine konur`);
}
if (MIKS?.muzik) { const m = MIKS.muzik; if (!m.dosya || !fs.existsSync(path.join(kok, "public", m.dosya))) U("miks", `müzik dosyası bulunamadı: public/${m.dosya} (müzik çalmaz)`); }
else if (MIKS) U("miks", "muzik alanı yok");
const dizi = (v) => (Array.isArray(v) ? v : [v]);
const aralik = (yer, ad, v, [a, b]) => dizi(v).forEach((x) => { if (typeof x !== "number" || x < a || x > b) H(yer, `${ad}=${x} aralık dışı [${a}, ${b}]`); });
const anahtarUzunluk = (yer, ad, v, kare) => { if (Array.isArray(v) && v.length > 1 && (!kare || kare.length !== v.length)) H(yer, `${ad} dizisi (${v.length}) ile kare dizisi (${kare?.length ?? 0}) eşit değil`); };
const artan = (yer, kare) => { for (let i = 1; i < (kare?.length ?? 0); i++) if (kare[i] <= kare[i - 1]) H(yer, `kare dizisi artan değil (${kare.join(",")})`); };
const sesSure = (f) => { try { const o = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], { encoding: "utf8" }); const d = parseFloat(o); return Number.isFinite(d) ? d : null; } catch { return null; } };
// kit/hareket gait (ops.cozucu = "gait"): basış kareleri ŞABLONLA AYNI KODDAN (src/kit/hareket/gait.ts; Node tip ayıklama ile içe aktarılır)
const gaitVar = (B.planlar ?? []).some((pl) => [pl, pl.devam_plan ?? {}].some((b) => (b.karakterler ?? []).some((c) => (c.jestler ?? []).some((j) => j.ad === "yuru" && j.ops?.cozucu === "gait"))));
const GAIT = gaitVar ? await import(new URL("../src/kit/hareket/gait.ts", import.meta.url).href) : null;
// xy yolu (GALATA-TEPE, BOGAZ): kalça x / zemin y json anahtarları (pchip, şablonla aynı), pxm(y) = (y − ufuk)/göz
function gaitDenetle(plan, Y, c, j, ufuk, goz, sure, PAY) {
  const yer = `${Y} ${c.kim} yuru(gait)`;
  if (!Array.isArray(c.x) || !Array.isArray(c.kare)) { H(yer, "gait: x yolu (dizi) + kare zorunlu"); return; }
  const tur = GAIT.turAdi(String(j.ops?.tur ?? "walk")), T = GAIT.ADIM_TUR[tur];
  const beyan = j.ops?.adim_m ?? c.adim_m ?? plan.parametreler?.adim_m;
  const A = typeof beyan === "number" ? beyan : T.adim_m;
  if (A < T.aralik[0] || A > T.aralik[1]) U(yer, `adım ${A} m (${typeof beyan === "number" ? "beyan" : "tür varsayılanı"}) ${tur} aralığı ${T.aralik.join("–")} m dışında`);
  const x = (q) => GAIT.pchip(c.kare, c.x, q), yy = (q) => (Array.isArray(c.y) ? GAIT.pchip(c.kare, c.y, q) : (c.y ?? 1250));
  const bas = j.ops?.bas_kare ?? j.bas;
  const hes = GAIT.basisKareleri({ bas, bit: j.bit, x, yer: yy, pxm: (q) => Math.max(1, (yy(q) - ufuk) / goz), adim_m: A, tur }).map((b) => b.kare);
  const adimT = (plan.temaslar ?? []).filter((t) => /^adim/.test(t.ses ?? "") && t.kare > bas && t.kare <= j.bit + 1).map((t) => t.kare).sort((a, b) => a - b);
  if (adimT.length) {
    // çözücü json temaslarını basış olarak KULLANIR (ses = görüntü); yol kuralından sapma = kalça adımdan önce/sonra gider → bacak açılır/çöker
    const sap = adimT.length !== hes.length || adimT.some((q, i) => Math.abs(q - hes[i]) > 3);
    if (sap) U(yer, `"adim" temasları (p${adimT.join(", p")}) yol kuralıyla uyuşmuyor: adım ${A} m → basış p${hes.join(", p")} (±3). Temasları buna çekin ya da adim_m'yi değiştirin`);
    const ara = adimT.slice(1).map((q, i) => q - adimT[i]); if (ara.some((d) => d < (tur === "run" ? 6 : 9))) U(yer, `basışlar arası < ${tur === "run" ? 6 : 9} kare (p${adimT.join(", p")}) — salınım çizilemez`);
  } else {
    const eksik = hes.filter((q) => !temasVar(plan, q, 2));
    if (eksik.length) U(yer, `adım ${A} m → ${hes.length} basış (p${hes.join(", p")}); temas yok: p${eksik.join(", p")} — "adim-*" foley teması ekle (TEMAS = SES)`);
  }
  const son = adimT.length ? adimT[adimT.length - 1] : hes[hes.length - 1];
  if (typeof son === "number" && son > sure - PAY) H(yer, `son basış p${son} plan sonuna ${sure - son} kare (≥ ${PAY})`);
}
const temasVar = (plan, kare, tol = 2) => (plan.temaslar ?? []).some((t) => Math.abs(t.kare - kare) <= tol);

if (B.fps !== SN.fps) H("bölüm", `fps ${B.fps} (beklenen ${SN.fps})`);
if (!Array.isArray(B.planlar) || !B.planlar.length) { H("bölüm", "planlar boş"); }
const idler = new Set(), dokunuslar = new Map(), sablonlar = new Set();
const yuzKullanim = new Map(); // K3: yüz varyantı → Map(kişi → ilk plan)
const VARYANTLAR = new Set(Object.values(SN.yuzVaryant ?? {}));
const PAY = SN.bitisPayiKare ?? 12;
let toplam = 0;
const tumTemas = [];

for (const plan of B.planlar ?? []) {
  const Y = plan.id ?? "(id yok)";
  if (!plan.id) H(Y, "id yok");
  if (idler.has(plan.id)) H(Y, "id tekrar ediyor"); idler.add(plan.id);
  const S = SN.sablonlar[plan.sablon];
  if (!S) { H(Y, `bilinmeyen şablon ${plan.sablon} (katalog: ${Object.keys(SN.sablonlar).join(", ")})`); continue; }
  sablonlar.add(plan.sablon);
  const sure = plan.sure_kare;
  if (!Number.isInteger(sure) || sure < SN.planSureMinKare) H(Y, `sure_kare ${sure} (en az ${SN.planSureMinKare}, tam sayı)`);
  const prm = plan.parametreler ?? {};
  // K3 (CLAUDE.md bolum.json kuralı 3): kontrol_kare zorunlu ve plan içinde
  if (!Number.isInteger(plan.kontrol_kare)) H(Y, "kontrol_kare yok (zorunlu: dokunuşun/ana eylemin en okunur karesi)");
  else if (plan.kontrol_kare < 0 || plan.kontrol_kare >= sure) H(Y, `kontrol_kare ${plan.kontrol_kare} plan dışında [0, ${sure})`);
  // K3 (kural 2): her jest/prop/morf/dokunuş aralığı plan içinde ve plan sonundan ≥PAY kare önce biter
  const bitis = (yer, ad, bit) => { if (typeof bit !== "number") return; if (bit > sure - PAY) H(yer, `${ad} p${bit} bitişi plan sonuna ${sure - bit} kare (≥ ${PAY} kare önce bitmeli; süre ${sure})`); };
  const son = (k) => (Array.isArray(k) && k.length ? k[k.length - 1] : undefined);
  for (const ad of ["golgeT", "pervazBicak", "eldivenGiy", "posta", "telgraf"]) if (prm[ad]) bitis(Y, ad, prm[ad].bit);
  if (prm.muhur) bitis(Y, "muhur", prm.muhur.kare);
  if (prm.insert) bitis(Y, "insert (fare 66 kare)", prm.insert.bas + 66);
  if (typeof prm.pervazCentikYeni === "number") bitis(Y, "pervazCentikYeni", prm.pervazCentikYeni);
  if (prm.kol && typeof prm.kol === "object") bitis(Y, "kol", son(prm.kol.kare));
  (prm.kuleler ?? []).forEach((k, i) => { if (typeof k.konum === "object") bitis(Y, `kule ${i + 1} konum`, son(k.konum.kare)); if (k.wifi) bitis(Y, `kule ${i + 1} wifi`, k.wifi.bit); if (Array.isArray(k.halo)) bitis(Y, `kule ${i + 1} halo`, k.halo[1]); });
  if (plan.dokunus) bitis(Y, `dokunuş ${plan.dokunus.id}`, plan.dokunus.bit);
  for (const z of S.zorunlu) if (prm[z] === undefined) H(Y, `zorunlu parametre yok: ${z}`);
  for (const [ad, izin] of Object.entries(S.parametreler)) if (prm[ad] !== undefined && !izin.includes(prm[ad])) H(Y, `${ad}="${prm[ad]}" geçersiz (${izin.join(" | ")})`);
  // şablona özel kurallar
  if (plan.sablon === "SOKAK" && prm.saat === "gun" && prm.sehir !== "bordeaux") H(Y, "SOKAK gün yalnız bordeaux (paris yalnız gece)");
  // Evliya: kurulmamış görünüm/saat render'da hata verir (yer tutucu çizilmez)
  if (S.kurulu && prm.gorunum !== undefined && !(S.kurulu[prm.gorunum] ?? []).includes(prm.saat)) H(Y, `${plan.sablon} gorunum "${prm.gorunum}" / saat "${prm.saat}" henüz kurulmadı (kurulu: ${Object.entries(S.kurulu).map(([g, s]) => `${g}+${s.join("/")}`).join(", ")})`);
  // K3 kosk: şenlik fişeği (E2) — bas < patlama, düşme plan sonundan ≥ bitiş payı önce biter, patlama karesinde temas (görünür → ses)
  if (plan.sablon === "SARAYBURNU" && Array.isArray(prm.senlik)) prm.senlik.forEach((sn, i) => {
    const y = `${Y} senlik ${i + 1}`;
    if (!(sn.bas < sn.patlama)) H(y, "bas < patlama olmalı");
    bitis(y, "şenlik düşüşü (patlama + dusme_kare)", sn.patlama + (sn.dusme_kare ?? 70));
    if (!temasVar(plan, sn.patlama, 1)) H(y, `patlama p${sn.patlama}: temas yok (görünür patlama = ses)`);
    if (prm.gorunum !== "kosk") U(y, "senlik yalnız kosk görünümünde çizilir");
  });
  if (plan.sablon === "SARAYBURNU" && prm.gorunum === "kosk" && prm.padisah?.bas_aci && typeof prm.padisah.bas_aci === "object") { const b = prm.padisah.bas_aci; if (!(Array.isArray(b.kare) && b.kare.length === (b.deger ?? []).length && b.kare.length > 1)) H(`${Y} padisah`, "bas_aci {kare, deger} eşit uzunlukta dizi olmalı"); else { artan(`${Y} padisah bas_aci`, b.kare); bitis(`${Y} padisah`, "baş çevirme", son(b.kare)); } }
  // K4 ic: pencere kanadı kapanışı görünür → kanat son açısına vardığı karede "tok", mandal oturunca "tık" teması; kanat/jest plan içinde biter
  if (plan.sablon === "SARAYBURNU" && prm.gorunum === "ic") {
    const kn = (plan.props ?? []).find((q) => q.tur === "pencere-kanat");
    if (!kn) U(Y, "ic: pencere-kanat prop'u yok (ışık yarığı sabit açık kalır)");
    else if (Array.isArray(kn.kare)) { artan(`${Y} pencere-kanat`, kn.kare); const sk = son(kn.kare); bitis(`${Y} pencere-kanat`, "kanat kapanışı", sk); if (!temasVar(plan, sk, 1)) H(`${Y} pencere-kanat`, `kanat p${sk}'de durur: temas yok (görünür kapanma = ses)`); if (!(plan.temaslar ?? []).some((t) => t.kare > sk && t.kare <= sk + 8)) U(`${Y} pencere-kanat`, "mandal oturma teması yok (kapanıştan sonraki 8 kare)"); }
    const pd = (plan.karakterler ?? []).find((c) => c.kim === "padisah");
    if (!pd) H(Y, "ic: padisah karakteri yok");
    if (prm.padisah && typeof prm.padisah.yuz_on_kontur_x !== "number") U(Y, "ic: padisah.yuz_on_kontur_x yok (varsayılan 457)");
  }
  // K8 KITAP-INSERT: defter açılışı temas (K9: kapağın tablaya yattığı kare = acik.bit); kıvılcım plan içinde biter. BOGAZ: iniş teması, martı ekran yolu
  if (plan.sablon === "KITAP-INSERT") {
    (prm.defterler ?? []).forEach((df, i) => {
      const yd = `${Y} defter ${df.id ?? i + 1}`;
      if (df.acik) { if (!(df.acik.bas < df.acik.bit)) H(yd, "acik {bas < bit}"); bitis(yd, "açılma", df.acik.bit); if (!temasVar(plan, df.acik.bit, 2)) H(yd, `kapak tablaya yatar p${df.acik.bit} (acik.bit): temas yok (TEMAS = SES)`); }
      if (Array.isArray(df.kapali_kutu) && (df.kapali_kutu[3] > 1500 || df.kapali_kutu[0] < 80)) H(yd, "kapali_kutu güvenli alan dışında (y ≤ 1500, x ≥ 80)");
    });
    if (prm.kivilcim) bitis(Y, "kıvılcım", prm.kivilcim.bit);
  }
  if (plan.sablon === "BOGAZ") {
    const hz = (plan.karakterler ?? []).find((c) => c.kim === "hezarfen");
    const uc = hz && (hz.jestler ?? []).find((j) => j.ad === "ucus");
    if (uc && !temasVar(plan, uc.bit, 1)) H(Y, `iniş p${uc.bit} (ucus.bit): temas yok (TEMAS = SES)`);
    const yjB = hz && (hz.jestler ?? []).find((j) => j.ad === "yuru" && j.ops?.cozucu === "gait");
    if (yjB) gaitDenetle(plan, Y, hz, { ...yjB, ops: { ...yjB.ops, bas_kare: Math.max(yjB.bas, uc?.bit ?? yjB.bas) } }, 860, 3.9, sure, SN.bitisPayiKare ?? 12);
    if (prm.rota_cizgi) bitis(Y, "rota çizgisi", prm.rota_cizgi.bit);
    const im = prm["iniş_meydani"]; if (im && hz && Array.isArray(hz.x) && Math.abs((hz.x[hz.x.length - 2] ?? 0) - im.x) > 120) U(Y, `iniş x ${hz.x[hz.x.length - 2]} meydandan (x ${im.x}) uzak`);
    const dx = prm.dekor_x; if (Array.isArray(dx) && plan.kamera) for (const c of plan.kamera.cx ?? []) { const sol = 540 - c - 540 / 1, sag = 540 - c + 540; if (sol < dx[0] - 1 || sag > dx[1] + 1) H(Y, `kamera cx ${c}: görünen dekor x ${sol}…${sag} dekor_x ${dx.join("…")} dışında`); }
  }
  // K9 iki dil yazı katmanı: dil_katmanlari'ndaki her dil için metin var mı; harita etiketi fişi bant dışında, işaret çizgisi ≤ 60 px
  {
    const ana = B.dil ?? "tr", diller = B.dil_katmanlari ?? [ana];
    const var_ = (v, ek, d) => (v && typeof v === "object" ? v[d] != null : d === ana ? v != null : ek != null);
    for (const d of diller) {
      (plan.ekran_yazisi ?? []).forEach((y, i) => { if (!var_(y.metin, y[d], d)) H(`${Y} ekran_yazisi[${i}]`, `'${d}' metni yok`); });
      (plan.replik ?? []).forEach((r, i) => { const ek = r[d]; if (!var_(r.metin, typeof ek === "object" ? ek?.metin : ek, d)) H(`${Y} replik[${i}]`, `'${d}' metni yok`); if (r.kim != null && !var_(r.kim, r[`kim_${d}`], d)) H(`${Y} replik[${i}]`, `'${d}' konuşan adı (kim_${d}) yok`); });
      (plan.harita_etiketleri ?? []).forEach((h, i) => { if (!var_(h.metin ?? { tr: h.tr, en: h.en }, undefined, d)) H(`${Y} harita_etiketleri[${i}]`, `'${d}' metni yok`); });
      if (d !== ana && (plan.ses ?? []).length && !(plan[`ses_${d}`] ?? []).length) H(Y, `ses_${d} yok`);
    }
    (plan.harita_etiketleri ?? []).forEach((h, i) => {
      const yh = `${Y} harita_etiketleri[${i}]`, k = h.kutu ?? [h.x, h.y];
      if (!(Number(h.bas ?? 0) < Number(h.bit ?? sure)) || Number(h.bit ?? sure) > sure) H(yh, "bas < bit ≤ sure_kare olmalı");
      if (k[1] < 520 || k[1] > 1250) U(yh, `fiş y ${k[1]} tasarım aralığı 520–1250 dışında (üst/alt yazı bandı)`);
      const L = Math.hypot(k[0] - h.x, k[1] - h.y); if (L > 60 + 140) U(yh, `işaret çizgisi uzun olabilir (nokta–fiş merkezi ${L.toFixed(0)} px; ≤ 60 px kenardan)`);
    });
  }
  // K5 GALATA-TEPE: taş itme / düşüş temasları, kamera takibi, yürüyüş adımları
  if (plan.sablon === "GALATA-TEPE") galataKurallari(plan, Y, plan.karakterler ?? [], plan.props ?? [], plan.kamera, sure);
  // K5 plan içi kesme (devam_plan): kesme karesi tutarlı, ilk bölümün animasyonları kesmeden önce biter, devam şablonu/karakter/prop/kamera kuralları
  if (plan.devam_plan || prm.plan_ici_kesme) {
    const d = plan.devam_plan, yk = `${Y} devam`;
    if (!d) H(yk, "parametreler.plan_ici_kesme var ama devam_plan yok");
    else {
      const kb = d.kare_bas;
      if (!Number.isInteger(kb) || kb <= 0 || kb >= sure - PAY) H(yk, `kare_bas ${kb} plan içinde olmalı (0, ${sure - PAY})`);
      if (prm.plan_ici_kesme && (prm.plan_ici_kesme.kare !== kb || prm.plan_ici_kesme.sonraki_sablon !== d.sablon)) H(yk, `plan_ici_kesme {kare ${prm.plan_ici_kesme.kare}, ${prm.plan_ici_kesme.sonraki_sablon}} ↔ devam_plan {kare_bas ${kb}, ${d.sablon}} uyuşmuyor`);
      const DS = SN.sablonlar[d.sablon];
      if (!DS) H(yk, `bilinmeyen şablon ${d.sablon}`);
      else {
        const dp = d.parametreler ?? {};
        for (const z of DS.zorunlu) if (dp[z] === undefined) H(yk, `zorunlu parametre yok: ${z}`);
        for (const [ad, izin] of Object.entries(DS.parametreler)) if (dp[ad] !== undefined && !izin.includes(dp[ad])) H(yk, `${ad}="${dp[ad]}" geçersiz (${izin.join(" | ")})`);
        if (DS.kurulu && dp.gorunum !== undefined && !(DS.kurulu[dp.gorunum] ?? []).includes(dp.saat)) H(yk, `${d.sablon} gorunum "${dp.gorunum}" / saat "${dp.saat}" kurulmadı`);
        const K2 = d.kamera;
        if (K2) { artan(`${yk} kamera`, K2.kare); for (const ad of ["cs", "cx", "cy"]) if (K2[ad]) { anahtarUzunluk(`${yk} kamera`, ad, K2[ad], K2.kare); aralik(`${yk} kamera`, ad, K2[ad], DS.kamera[ad]); } if ((K2.kare ?? []).some((q) => q < kb || q > sure)) H(yk, `kamera kareleri [${kb}, ${sure}] dışında`); }
        if ((d.karakterler ?? []).length > DS.karakterMaks) H(yk, `karakter sayısı > ${DS.karakterMaks}`);
        for (const c of d.karakterler ?? []) {
          const yc = `${yk} ${c.kim}`;
          if (!SN.karakterler.includes(c.kim)) H(yc, "bilinmeyen karakter");
          for (const ad of ["x", "y", "olcek"]) anahtarUzunluk(yc, ad, c[ad], c.kare);
          if (c.kare) { artan(yc, c.kare); if (c.kare.some((q) => q < kb)) H(yc, `yol kareleri kesmeden (p${kb}) önce`); bitis(yc, "yol (kare)", son(c.kare)); }
          for (const j of c.jestler ?? []) { if (!SN.jestler.includes(j.ad)) H(yc, `bilinmeyen jest ${j.ad}`); if (j.bas < kb) H(yc, `jest ${j.ad} p${j.bas} kesmeden önce başlıyor`); bitis(yc, `jest ${j.ad}`, j.bit); }
        }
        for (const pr of d.props ?? []) {
          if (!SN.props.includes(pr.tur)) H(yk, `bilinmeyen prop ${pr.tur}`);
          if (SN.propSablon?.[pr.tur] && !SN.propSablon[pr.tur].includes(d.sablon)) H(yk, `prop ${pr.tur} yalnız ${SN.propSablon[pr.tur].join(", ")} şablonunda çizilir`);
          if (pr.bagli && typeof pr.bagli === "string" && !(d.karakterler ?? []).some((c) => c.kim === pr.bagli)) H(yk, `prop ${pr.tur} bagli "${pr.bagli}" devamda yok`);
        }
        if (d.sablon === "GALATA-TEPE") galataKurallari(plan, yk, d.karakterler ?? [], d.props ?? [], d.kamera, sure);
      }
      // kesme hareketin ortasına gelmez: ilk bölümün kamera/prop/jest anahtarları kesmeden önce biter
      const once = (yer, ad, q) => { if (typeof q === "number" && q > kb) H(yer, `${ad} p${q} kesmeden (p${kb}) sonra bitiyor — ilk bölümün hareketi kesmede yarım kalır`); };
      once(Y, "kamera", son(plan.kamera?.kare));
      for (const pr of plan.props ?? []) once(`${Y} ${pr.tur}`, "prop anahtarı", son(pr.kare));
      for (const c of plan.karakterler ?? []) for (const j of c.jestler ?? []) once(`${Y} ${c.kim}`, `jest ${j.ad}`, j.bit);
    }
  }
  if (plan.sablon === "SOKAK" && prm.insert) { if (prm.insert.tur !== "fare") H(Y, "insert.tur yalnız 'fare'"); if (prm.insert.bas + 66 > sure) H(Y, `fare insert'i (66 kare) plan sonunu aşıyor`); }
  if (plan.sablon === "KULE-DIS") {
    const kl = prm.kuleler ?? [];
    if (kl.length > S.kuleMaks) H(Y, `kule sayısı ${kl.length} > ${S.kuleMaks}`);
    if (prm.saat === "alacakaranlik") kl.forEach((k, i) => { if (typeof k.konum !== "string") H(Y, `kule ${i + 1}: alacakaranlıkta kollar SABİT olmalı (telgraf gece/siste çalışmaz)`); });
    kl.forEach((k, i) => { if (typeof k.konum === "object") { artan(`${Y} kule ${i + 1}`, k.konum.kare); k.konum.kare.slice(1).forEach((q) => { if (!temasVar(plan, q)) U(Y, `kule ${i + 1} kol varışı p${q}: "klak" teması yok`); }); } });
  }
  // K2 kit parçaları
  if (plan.sablon === "IC-ODA") {
    const kar0 = plan.karakterler ?? [];
    const O = S.ortusme;
    if (O) {
      const anlar = [...new Set([0, sure - 1, ...kar0.flatMap((c) => c.kare ?? [])])];
      const dg = (v, kare, p) => { if (!Array.isArray(v)) return v; if (!kare || v.length < 2) return v[0]; let i = 0; while (i < kare.length - 1 && p > kare[i + 1]) i++; if (p <= kare[0]) return v[0]; if (p >= kare[kare.length - 1]) return v[v.length - 1]; const t = (p - kare[i]) / (kare[i + 1] - kare[i]); return v[i] + (v[i + 1] - v[i]) * t; };
      for (let a = 0; a < kar0.length; a++) for (let b = a + 1; b < kar0.length; b++) {
        const A = kar0[a], Bk = kar0[b];
        const kotu = anlar.find((p) => { const za = dg(A.z, A.kare, p), zb = dg(Bk.z, Bk.kare, p), ua = dg(A.u, A.kare, p), ub = dg(Bk.u, Bk.kare, p); if (Math.abs(za - zb) > O.dz) return false; const xa = 540 + (ua * O.F) / za, xb = 540 + (ub * O.F) / zb; return Math.abs(xa - xb) < 0.5 * (O.omuzM * O.F / za + O.omuzM * O.F / zb); });
        if (kotu !== undefined) U(Y, `${A.kim} ↔ ${Bk.kim} örtüşüyor (p${kotu}: aynı derinlik yakınında ekran x farkı omuz genişliğinden az) — u farkını aç ya da z ayır`);
      }
    }
    if (prm.golgeT) { const g = prm.golgeT; if (prm.isik !== "mum") H(Y, "golgeT: duvar gölgesi yalnız isik=mum (tek nokta ışık)"); const c = kar0.find((q) => q.kim === g.kim); if (!c) H(Y, `golgeT.kim "${g.kim}" planda yok`); else if (prm.masa && Math.max(...dizi(c.z)) <= prm.masa.z) U(Y, "golgeT: karakter mumun önünde (z ≤ masa z) → gölge arka duvara düşmez"); if (!(g.bas < g.bit) || g.bit > sure) H(Y, "golgeT zamanı geçersiz"); }
    if (prm.manipulator) { const c = kar0.find((q) => q.kim === prm.manipulator.kim); if (!c) H(Y, `manipulator.kim "${prm.manipulator.kim}" planda yok`); else if (!(c.jestler ?? []).some((j) => j.ad === "it-cek")) U(Y, "manipulator: karakterin it-cek jesti yok (kol sabit kalır)"); }
    if (prm.pervazBicak) { const b = prm.pervazBicak; if (!(b.bas < b.kare && b.kare < b.bit)) H(Y, "pervazBicak: bas < kare < bit olmalı"); if (!temasVar(plan, b.kare, 1)) H(Y, `pervazBicak kesik p${b.kare}: temas ("kırt") yok`); if (prm.pervazCentikYeni !== undefined && prm.pervazCentikYeni !== b.kare) U(Y, "pervazCentikYeni pervazBicak.kare ile aynı olmalı (bıçak çizerken belirir)"); }
  }
  if (plan.sablon === "MASA-INSERT" && prm.eldivenGiy) { const e = prm.eldivenGiy, g = e.gerilme ?? Math.round(e.bas + (e.bit - e.bas) * 0.86); if (!temasVar(plan, g, 1)) H(Y, `eldivenGiy gerilme p${g}: temas yok (TEMAS = SES)`); if ((e.olcek ?? 1.3) < 1.2) U(Y, "eldivenGiy olcek < 1.2: eller ekranın %20'sinin altına iner"); }
  if (plan.sablon === "KULE-DIS") (prm.kuleler ?? []).forEach((k, i) => { if (!k.wifi) return; if (prm.saat === "alacakaranlik") H(Y, `kule ${i + 1}: wifi morfu yalnız gün`); const D = (k.wifi.bit - k.wifi.bas) / 3; [1, 2, 3].forEach((j) => { const q = Math.round(k.wifi.bas + D * j); if (!temasVar(plan, q)) U(Y, `kule ${i + 1} wifi yay ${j} varışı p${q}: temas yok`); }); });
  { const ey = (plan.ekran_yazisi ?? []).filter((y) => y.bant === "ust"), rp = (plan.replik ?? []).filter((y) => y.bant === "ust"); for (const a of ey) for (const r of rp) if ((a.bas ?? 0) < r.bit && r.bas < (a.bit ?? sure)) U(Y, `üst bantta ekran yazısı ile replik aynı anda ("${a.metin}" / "${r.metin}") — üst üste biner`); }
  for (const yz of plan.ekran_yazisi ?? []) if ((yz.vurgu ?? []).length > 1) U(Y, `ekran yazısı "${yz.metin}": vurgu tek kelime (yalnız ilk eşleşen kırmızı)`);
  if (plan.sablon === "HARITA" && prm.muhur && !temasVar(plan, prm.muhur.kare, 1)) H(Y, `mühür p${prm.muhur.kare}: temas (TOK) yok`);
  if (plan.sablon === "YAKIN-YUZ") {
    if (!prm.arka?.sablon || !SN.sablonlar[prm.arka.sablon] || prm.arka.sablon === "YAKIN-YUZ") H(Y, "arka.sablon geçerli bir şablon olmalı (YAKIN-YUZ hariç)");
    if ((prm.olcek ?? 3.6) < 3.5) H(Y, `olcek ${prm.olcek}: yüz ekranın %15'inin altına iner (≥ 3.5)`);
    const yz = prm.yuz ?? [540, 800];
    if ((yz[1] >= 240 - 60 && yz[1] <= 400 + 60) || (yz[1] >= 1290 - 60 && yz[1] <= 1490 + 60)) U(Y, `yüz y=${yz[1]} yazı bandına yakın`);
  }
  // kamera
  const K = plan.kamera;
  if (K) {
    artan(`${Y} kamera`, K.kare);
    for (const ad of ["cs", "cx", "cy"]) if (K[ad]) { anahtarUzunluk(`${Y} kamera`, ad, K[ad], K.kare); aralik(`${Y} kamera`, ad, K[ad], S.kamera[ad]); }
    if ((K.kare ?? []).some((q) => q < 0 || q > sure)) H(Y, "kamera karesi plan dışında");
  }
  // karakterler
  const kar = plan.karakterler ?? [];
  if (kar.length > S.karakterMaks) H(Y, `karakter sayısı ${kar.length} > ${S.karakterMaks}`);
  kar.forEach((c, i) => {
    const y = `${Y} ${c.kim ?? `karakter${i}`}`;
    if (!SN.karakterler.includes(c.kim)) H(y, `bilinmeyen karakter (kayıt: ${SN.karakterler.join(", ")})`);
    if (S.z && plan.sablon !== "YAKIN-YUZ") { aralik(y, "z", c.z, S.z); aralik(y, "u", c.u, S.u); }
    if (S.konum === "xy") {
      // SARAYBURNU: x/y dekor px yolu; olcek anahtarlı; ufuk–ölçek (kiyi: rıhtımdaki figürün ölçeği y'den — json olcek farkı uyarılır)
      for (const ad of ["x", "y", "olcek"]) anahtarUzunluk(y, ad, c[ad], c.kare);
      for (const [ad, v] of Object.entries(c.durum ?? {})) {
        // aralık durumları (S.durumAralik, ör. damla [bas, bit]): anahtar dizisi değil — plan içinde ve bitiş payı
        if ((S.durumAralik ?? []).includes(ad)) { if (!Array.isArray(v) || v.length !== 2 || !(v[0] < v[1]) || v[0] < 0) H(y, `durum.${ad} [bas, bit] aralığı olmalı`); else bitis(y, `durum.${ad}`, v[1]); continue; }
        if (typeof v === "boolean") continue;
        anahtarUzunluk(y, `durum.${ad}`, v, c.kare);
      }
      if (Array.isArray(c.x) || Array.isArray(c.y) || Array.isArray(c.olcek)) bitis(y, "yol (kare)", son(c.kare));
      if (c.x === undefined && !c.bagli) H(y, "x/y yok (SARAYBURNU konum dili: dekor px, zemin teması)");
      if (c.bagli && !(plan.props ?? []).some((q) => q.id === c.bagli.prop)) H(y, `bagli.prop "${c.bagli.prop}" planda yok`);
      if (c.bagli?.bit !== undefined) { if (!(c.bagli.bit > 0 && c.bagli.bit < sure)) H(y, `bagli.bit ${c.bagli.bit} plan içinde değil`); else bitis(y, "bırakma (bagli.bit)", c.bagli.bit); if (!temasVar(plan, c.bagli.bit, 2)) U(y, `bırakma p${c.bagli.bit}: temas yok`); }
      // K3 kosk: aynı x'te (±0.5 m) fisek-demet varsa oturan karakter demetin oturağına bağlanır (sol uzak grup)
      const koskDemet = prm.gorunum === "kosk" && (plan.props ?? []).some((q) => q.tur === "fisek-demet" && Math.abs((dizi(q.x)[0] ?? 0) - (dizi(c.x)[0] ?? -999)) <= 0.5 * 406.7 * (dizi(c.olcek)[0] ?? 0.075));
      if (c.poz === "oturan" && !c.bagli && !koskDemet && !(c.jestler ?? []).some((j) => j.ad === "ucus")) U(y, "poz oturan ama bagli yok: oturak/dayama bilinmez, ayaklar havada kalır — bagli {prop} ver ya da süreyi böl");
      if (prm.gorunum === "kiyi" && c.olcek !== undefined && !c.bagli) {
        const ys = dizi(c.y), os = dizi(c.olcek);
        ys.forEach((yy, i) => { const o = os[Math.min(i, os.length - 1)]; if (yy >= 1256 && Math.abs(o - (yy - 720) / 610) / ((yy - 720) / 610) > 0.08) U(y, `ufuk–ölçek: y ${yy} rıhtımda → ölçek ${((yy - 720) / 610).toFixed(2)} (json olcek ${o} yok sayılır)`); });
      }
    }
    anahtarUzunluk(y, "z", c.z, c.kare); anahtarUzunluk(y, "u", c.u, c.kare); if (c.kare) artan(y, c.kare);
    if (Array.isArray(c.z) || Array.isArray(c.u)) bitis(y, "yol (kare)", son(c.kare));
    // K3: ifade / poz / yüz varyantı
    if (c.yuz?.ifade !== undefined && !SN.ifadeler.includes(c.yuz.ifade)) U(y, `ifade "${c.yuz.ifade}" kitte yok → "dinlen" çizilir (${SN.ifadeler.join(", ")}) — kit_eksik ile işaretle`);
    if (c.poz !== undefined && !SN.pozlar.includes(c.poz)) H(y, `poz "${c.poz}" (${SN.pozlar.join(" | ")})`);
    if (c.poz === "yatik" && !(plan.sablon === "IC-ODA" && prm.oda === "yatak") && !(plan.sablon === "YAKIN-YUZ" && prm.yatik)) U(y, "poz yatik yalnız IC-ODA oda=yatak ya da YAKIN-YUZ yatik:true'da yatağa oturur");
    if (c.yuzVaryant !== undefined && !VARYANTLAR.has(c.yuzVaryant)) H(y, `yuzVaryant "${c.yuzVaryant}" yok (${[...VARYANTLAR].join(", ")})`);
    const varyant = c.yuzVaryant ?? SN.yuzVaryant?.[c.kim], kisi = SN.ayniKisi?.[c.kim] ?? c.kim;
    if (varyant) { if (!yuzKullanim.has(varyant)) yuzKullanim.set(varyant, new Map()); const m = yuzKullanim.get(varyant); if (!m.has(kisi)) m.set(kisi, plan.id); }
    for (const j of c.jestler ?? []) {
      if (!SN.jestler.includes(j.ad)) H(y, `bilinmeyen jest ${j.ad}`);
      else if ((SN.jestlerKurulumda ?? []).includes(j.ad)) U(y, `jest ${j.ad} kurulumda: şemada var, henüz ÇİZİLMİYOR (kit_eksik; render'da etkisiz)`);
      if (!(j.bas < j.bit) || j.bas < 0) H(y, `jest ${j.ad} zamanı [${j.bas}, ${j.bit}] geçersiz`);
      else bitis(y, `jest ${j.ad}`, j.bit);
      if (j.ad === "yuru" && !Array.isArray(c.z) && !Array.isArray(c.u) && !(S.konum === "xy" && Array.isArray(c.x))) U(y, "yuru jesti var ama z/u yolu (dizi) yok — yerinde sayar");
      const o = j.ops ?? {};
      if (j.ad === "baston-vur") { const v = o.vurus ?? Math.round(j.bas + (j.bit - j.bas) * 0.6); if (!temasVar(plan, v, 1)) H(y, `baston-vur vuruşu p${v}: temas yok (TEMAS = SES)`); if (!(c.aksesuar ?? []).includes("baston") && o.el !== "on") U(y, "baston-vur: aksesuar 'baston' yok"); }
      if (j.ad === "it-cek") { const t = o.tekrar ?? 3, L = j.bit - j.bas; for (let q = 0; q < t; q++) { const k = Math.round(j.bas + ((q + 0.25) * L) / t); if (!temasVar(plan, k)) U(y, `it-cek tik p${k}: temas yok`); } }
      if (j.ad === "eldiven-giy") { const g = o.gerilme ?? Math.round((j.bas + j.bit) / 2); if (!temasVar(plan, g)) H(y, `eldiven-giy gerilme p${g}: temas yok`); }
      // K8 (SARAYBURNU kiyi): bin = ayak dayamaya basar + oturağa oturur (iki temas); tutun = kavrama teması (ops.temas ya da bit−2)
      if (j.ad === "bin") {
        if (!(plan.sablon === "SARAYBURNU" && prm.gorunum === "kiyi")) H(y, "bin yalnız SARAYBURNU kiyi");
        if (c.bagli || c.poz === "oturan") H(y, "bin: karakter ayakta başlar (bagli/poz oturan verilmez; son poz bagli+oturan ile aynı)");
        if (!(plan.props ?? []).some((q) => q.tur === "fisek-demet")) H(y, "bin: planda fisek-demet yok");
        const at = o.ayak_temas, ot = o.oturma;
        if (!(typeof at === "number" && typeof ot === "number" && j.bas < at && at < ot && ot <= j.bit)) H(y, "bin: ops.ayak_temas / ops.oturma (bas < ayak_temas < oturma ≤ bit) zorunlu");
        else { if (!temasVar(plan, at, 1)) H(y, `bin ayak dayamaya p${at}: temas yok (TEMAS = SES)`); if (!temasVar(plan, ot, 1)) H(y, `bin oturma p${ot}: temas yok (TEMAS = SES)`); }
      }
      if (j.ad === "tutun") {
        if (!(c.poz === "oturan" && c.bagli)) H(y, "tutun: oturan + bagli karakter gerekir (eli demetin sicim bağını kavrar)");
        const t = o.temas ?? j.bit - 2; if (!temasVar(plan, t, 2)) H(y, `tutun kavrama p${t}: temas yok (TEMAS = SES)`);
      }
    }
  });
  // props + el
  const propIdler = new Set();
  for (const pr of plan.props ?? []) {
    if (!SN.props.includes(pr.tur)) H(Y, `bilinmeyen prop ${pr.tur}`);
    if (SN.propSablon?.[pr.tur] && !SN.propSablon[pr.tur].includes(plan.sablon)) H(Y, `prop ${pr.tur} yalnız ${SN.propSablon[pr.tur].join(", ")} şablonunda çizilir`);
    for (const alan of SN.propKurulumda?.[pr.tur] ?? []) if (pr[alan] !== undefined) U(`${Y} ${pr.tur}`, `${alan} kurulumda: henüz ÇİZİLMİYOR (kit_eksik)`);
    if (pr.bagli && typeof pr.bagli === "string" && !(plan.karakterler ?? []).some((c) => c.kim === pr.bagli)) H(`${Y} ${pr.tur}`, `bagli "${pr.bagli}" planda yok`);
    if (pr.olcek !== undefined) anahtarUzunluk(`${Y} ${pr.tur}`, "olcek", pr.olcek, pr.kare);
    if (pr.id) propIdler.add(pr.id);
    anahtarUzunluk(`${Y} ${pr.tur}`, "x", pr.x, pr.kare); anahtarUzunluk(`${Y} ${pr.tur}`, "y", pr.y, pr.kare);
    for (const [k, v] of Object.entries(pr.durum ?? {})) anahtarUzunluk(`${Y} ${pr.tur}`, `durum.${k}`, v, pr.kare);
    if (Array.isArray(pr.kare) && pr.kare.length > 1) bitis(`${Y} ${pr.tur}`, "prop anahtarı", son(pr.kare));
    // K4 el–prop teması (IC-ODA): it / al
    const kimVar = (kim) => (plan.karakterler ?? []).some((c) => c.kim === kim);
    if (pr.it) { const y = `${Y} ${pr.tur}.it`; if (plan.sablon !== "IC-ODA") H(y, "it yalnız IC-ODA"); if (!kimVar(pr.it.kim)) H(y, `kim "${pr.it.kim}" planda yok`); if (!(pr.it.bas < pr.it.bit)) H(y, "bas < bit olmalı"); bitis(y, "itme (el çekilişi +14)", pr.it.bit + 14); if (!temasVar(plan, pr.it.bas, 1)) H(y, `itme p${pr.it.bas}: temas yok (TEMAS = SES)`); }
    if (pr.al) { const y = `${Y} ${pr.tur}.al`; if (plan.sablon !== "IC-ODA") H(y, "al yalnız IC-ODA"); if (!kimVar(pr.al.kim)) H(y, `kim "${pr.al.kim}" planda yok`); bitis(y, "alma (kaldırış)", pr.al.kare + 4 + (pr.al.don ?? 30)); if (!temasVar(plan, pr.al.kare, 1)) H(y, `kavrama p${pr.al.kare}: temas yok (TEMAS = SES)`); }
  }
  for (const [i, el] of (plan.el ?? []).entries()) {
    const y = `${Y} el${i}`;
    if (!(S.elMaks > 0)) H(y, "el bu şablonda yok (MASA-INSERT, SARAYBURNU insert)");
    if (plan.sablon === "SARAYBURNU") {
      if (prm.gorunum !== "insert") H(y, "el SARAYBURNU'da yalnız gorunum insert");
      if (S.elTip && !S.elTip.includes(el.tip)) H(y, `el tip "${el.tip}" (${S.elTip.join(" | ")})`);
      if (S.elRol && !S.elRol.includes(el.rol)) H(y, `el rol "${el.rol}" (${S.elRol.join(" | ")})`);
      for (const z of el.poz ?? []) if (S.elPoz && !S.elPoz.includes(z.poz)) H(y, `el poz "${z.poz}" (${S.elPoz.join(" | ")})`);
      // omuz eli: inişin bittiği anahtar (kare[2]) temas karesidir (TEMAS = SES)
      if (el.rol === "omuz" && el.kare?.length > 2 && !temasVar(plan, el.kare[2], 1)) H(y, `omuz eli inişi p${el.kare[2]}: temas yok`);
      // alan eli: ilk anahtar zemine yakınsa (P07 basamak) temas p${el.kare[0]} olmalı
      if (el.rol === "alan" && el.bilek?.[0] && (plan.karakterler?.[0]?.y ?? 1450) - el.bilek[0][1] < 0.4 * (((plan.karakterler?.[0]?.y ?? 1450) - 180) / 1.95) && !temasVar(plan, el.kare[0], 1)) H(y, `alan eli p${el.kare[0]} basamak teması: temas yok`);
    } else if (plan.sablon !== "MASA-INSERT") H(y, "el yalnız MASA-INSERT'te");
    for (const ad of ["bilek", "dirsek", "aci"]) if (el[ad]?.length !== el.kare?.length) H(y, `${ad} (${el[ad]?.length}) ile kare (${el.kare?.length}) eşit değil`);
    artan(y, el.kare);
    bitis(y, "el hareketi", son(el.kare));
    if (el.tut) bitis(y, "bırakma", el.tut.bit);
    if (el.tut) { if (!propIdler.has(el.tut.prop)) H(y, `tut.prop "${el.tut.prop}" prop id'si değil`); if (el.tut.bit < sure && !temasVar(plan, el.tut.bit, 1)) H(y, `bırakma p${el.tut.bit}: temas yok`); }
  }
  if ((plan.el ?? []).length > (S.elMaks ?? 0)) H(Y, `el sayısı > ${S.elMaks ?? 0}`);
  // yazılar
  for (const yz of [...(plan.ekran_yazisi ?? []), ...(plan.replik ?? [])]) {
    if (!SN.bantlar.includes(yz.bant)) H(Y, `yazı bandı "${yz.bant}" (ust | alt)`);
    if ((yz.bas ?? 0) < 0 || (yz.bit ?? sure) > sure) H(Y, `yazı "${yz.metin}" zamanı plan dışında`);
    if ([...(yz.metin ?? "")].some((ch) => ch.codePointAt(0) > 0x2215 && !"…→↑↓·".includes(ch))) U(Y, `yazıda font dışı olabilecek glif: "${yz.metin}"`);
  }
  // temaslar + dokunuş
  for (const t of plan.temaslar ?? []) {
    if (t.kare < 0 || t.kare >= sure) H(Y, `temas p${t.kare} plan dışında`);
    if (!t.ses) U(`${Y} temas p${t.kare}`, `"${t.olay}": ses yok (TEMAS = SES; görünmüyorsa temas olarak yazma)`);
    else if (FOLEY && !FOLEY[t.ses]) foleyTanimsiz.set(t.ses, [...(foleyTanimsiz.get(t.ses) ?? []), `${plan.id} p${t.kare}`]);
    else if (FOLEY) { foleyKullanilan.add(t.ses); const ms = FOLEY[t.ses].tepe_ms ?? 0; if (toplam + t.kare - Math.round((ms * SN.fps) / 1000) < 0) U(`${Y} temas p${t.kare}`, `${t.ses}: tepe hizası bölüm başından önce — baş kırpılır`); }
    tumTemas.push({ plan: plan.id, kare: toplam + t.kare, sn: +((toplam + t.kare) / SN.fps).toFixed(3), olay: t.olay, ses: t.ses ?? null, db: t.db ?? null });
  }
  // plan sesleri: dosya var mı, plan sonundan taşıyor mu (ffprobe), çakışma
  const sesAralik = [];
  for (const [i, s] of (plan.ses ?? []).entries()) {
    const y = `${Y} ses${i}`;
    if (typeof s.dosya !== "string" || !s.dosya) { H(y, "dosya yok"); continue; }
    if (!Number.isInteger(s.kare) || s.kare < 0 || s.kare >= sure) H(y, `kare ${s.kare} plan dışında [0, ${sure})`);
    if (s.db !== undefined && (typeof s.db !== "number" || s.db > 6)) U(y, `db ${s.db} (sayı, ≤ +6 beklenir)`);
    const tam = path.join(kok, "public", s.dosya);
    if (!fs.existsSync(tam)) { H(y, `dosya bulunamadı: public/${s.dosya}`); continue; }
    const sn = sesSure(tam);
    if (sn === null) { U(y, "ffprobe yok/okunamadı — süre ve çakışma denetlenmedi"); continue; }
    const bit = s.kare + Math.ceil(sn * SN.fps);
    if (bit > sure) U(y, `${s.dosya} (${sn.toFixed(2)} sn) plan sonunu ${bit - sure} kare aşıyor — kesilir`);
    for (const o of sesAralik) if (s.kare < o.bit && o.bas < bit) U(y, `${s.dosya} ile ${o.dosya} çakışıyor (p${Math.max(s.kare, o.bas)}–p${Math.min(bit, o.bit)})`);
    sesAralik.push({ dosya: s.dosya, bas: s.kare, bit });
  }
  if (plan.dokunus) { if (dokunuslar.has(plan.dokunus.id)) H(Y, `dokunuş ${plan.dokunus.id} tekrar ediyor (ilk: ${dokunuslar.get(plan.dokunus.id)})`); dokunuslar.set(plan.dokunus.id, plan.id); }
  toplam += sure || 0;
}

// K5 GALATA-TEPE kuralları (plan ya da devam_plan için)
function galataKurallari(plan, Y, kar, props, kamera, sure) {
  const PAY = SN.bitisPayiKare ?? 12;
  const tas = props.find((q) => q.tur === "tas");
  for (const c of kar) for (const j of c.jestler ?? []) {
    if (j.ad === "tas-it") {
      const t = j.ops?.temas;
      if (!tas) H(`${Y} ${c.kim}`, "tas-it: planda tas prop'u yok");
      if (typeof t !== "number" || t <= j.bas || t >= j.bit) H(`${Y} ${c.kim}`, "tas-it ops.temas (ayağın taşa değdiği kare) bas < temas < bit olmalı");
      else if (!temasVar(plan, t, 1)) H(`${Y} ${c.kim}`, `tas-it p${t}: temas yok (TEMAS = SES)`);
    }
    if (j.ad === "yuru" && j.ops?.cozucu === "gait") gaitDenetle(plan, Y, c, j, 829, 1.65, sure, PAY);
    else if (j.ad === "yuru") {
      if (!Array.isArray(c.x)) U(`${Y} ${c.kim}`, "yuru: x yolu (dizi) yok — yerinde sayar");
      else {
        // px/m = (ayak y − 829)/1.65 — her basma görünür temas (TEMAS = SES)
        // K7: adım uzunluğu sabit 0.75 m DEĞİL; öncelik: jest ops.adim_m → karakter adim_m → plan parametreler.adim_m → temaslardan çıkarım → 0.75.
        //   Çıkarım: yürüyüş aralığında "adim*" temasları varsa şablon (GALATA-TEPE yuruCoz) basışları ZATEN bu listeden alır; adım = yol / temas sayısı.
        //   Bu durumda denetim: adım uzunluğu yürüyüş aralığında mı (0.3–0.9 m) ve temaslar eşit aralıklı mı (±%35).
        const y0 = Array.isArray(c.y) ? c.y[0] : (c.y ?? 1250), pxm = Math.max(1, (y0 - 829) / 1.65);
        const xAt = (q) => { const k = c.kare ?? []; if (q <= k[0]) return c.x[0]; for (let i = 1; i < k.length; i++) if (q <= k[i]) { const u = (q - k[i - 1]) / (k[i] - k[i - 1]); const e = u < 0.5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2; return c.x[i - 1] + (c.x[i] - c.x[i - 1]) * e; } return c.x[c.x.length - 1]; };
        let yolTop = 0; { let x0 = xAt(j.bas); for (let q = j.bas + 1; q <= j.bit; q++) { const x1 = xAt(q); yolTop += Math.abs(x1 - x0) / pxm; x0 = x1; } }
        const adimT = (plan.temaslar ?? []).filter((t) => /^adim/.test(t.ses ?? "") && t.kare > j.bas && t.kare <= j.bit + 1).map((t) => t.kare).sort((a, b) => a - b);
        const beyan = j.ops?.adim_m ?? c.adim_m ?? plan.parametreler?.adim_m;
        const ADIM = typeof beyan === "number" ? beyan : adimT.length ? yolTop / adimT.length : 0.75;
        const kaynak = typeof beyan === "number" ? "beyan" : adimT.length ? "temaslardan" : "varsayılan";
        if (ADIM < 0.3 || ADIM > 0.9) U(`${Y} ${c.kim}`, `yuru: adım ${ADIM.toFixed(2)} m (${kaynak}) yürüyüş aralığı 0.3–0.9 m dışında`);
        if (kaynak === "temaslardan") {
          const ara = adimT.slice(1).map((q, i) => q - adimT[i]), ort = ara.reduce((a, b) => a + b, 0) / Math.max(1, ara.length);
          if (ara.some((d) => Math.abs(d - ort) > 0.35 * ort)) U(`${Y} ${c.kim}`, `yuru: adım temasları düzensiz aralıklı (p${adimT.join(", p")})`);
        } else {
          const adim = []; let yol = 0, n = 1, x0 = xAt(j.bas);
          for (let q = j.bas + 1; q <= j.bit; q++) { const x1 = xAt(q); yol += Math.abs(x1 - x0) / pxm; x0 = x1; if (yol >= n * ADIM) { adim.push(q); n++; } }
          const eksik = adim.filter((q) => !temasVar(plan, q, 2));
          if (eksik.length) U(`${Y} ${c.kim}`, `yuru: adım ${ADIM} m (${kaynak}) → ${adim.length} adım basması görünür (p${adim.join(", p")}); temas yok: p${eksik.join(", p")} — "adim" foley teması ekle`);
        }
      }
    }
  }
  if (tas && Array.isArray(tas.kare)) {
    artan(`${Y} tas`, tas.kare);
    const k = tas.kare;
    if (k.length >= 2 && !temasVar(plan, k[1], 1)) H(`${Y} tas`, `taş p${k[1]}'de itilir: temas yok`);
    if (!temasVar(plan, k[k.length - 1], 1)) H(`${Y} tas`, `taş p${k[k.length - 1]}'de yere çarpar: temas yok`);
    const sk = k[k.length - 1]; if (sk > sure - PAY) H(`${Y} tas`, `taş yere çarpma p${sk} plan sonuna ${sure - sk} kare (≥ ${PAY})`);
  }
  const tk = kamera?.takip;
  if (tk) {
    if (!props.some((q) => (q.id ?? q.tur) === tk.prop)) H(`${Y} kamera.takip`, `prop "${tk.prop}" yok`);
    if (!(Array.isArray(tk.kare) && tk.kare.length === 2 && tk.kare[0] < tk.kare[1])) H(`${Y} kamera.takip`, "kare [bas, bit] olmalı");
    else if (tk.kare[0] < (kamera.kare?.[0] ?? 0) || tk.kare[1] > sure) H(`${Y} kamera.takip`, "takip aralığı plan/kamera dışında");
    if (typeof tk.ekran_y !== "number" || tk.ekran_y < 400 || tk.ekran_y > 1290) U(`${Y} kamera.takip`, `ekran_y ${tk.ekran_y} yazı bantlarına/güvenli alana yakın`);
  }
}


// ses eki özeti
const sesliTemas = tumTemas.filter((t) => t.ses).length;
if (!FOLEY && sesliTemas) U("foley", `${foleyYol} yok — ${sesliTemas} temas sesi çalmayacak`);
for (const [ad, yer] of foleyTanimsiz) U("foley", `"${ad}" foley.json'da tanımsız (${yer.join(", ")}) — çalmaz`);
if (FOLEY) for (const ad of Object.keys(FOLEY)) if (!foleyKullanilan.has(ad) && !foleyTanimsiz.has(ad)) U("foley", `"${ad}" tanımlı ama hiçbir temasta kullanılmıyor (görünmeyen ses çalınmaz)`);

// K3: iki farklı kişi aynı yüz varyantını kullanıyorsa (kompars ana kadronun/başkasının yüzünü kopyalar)
for (const [v, m] of yuzKullanim) if (m.size > 1) U("bölüm", `yüz varyantı "${v}" ${m.size} kişide: ${[...m].map(([k, p]) => `${k} (${p})`).join(", ")} — yuzVaryant ile ayır ya da palet.yuzsuz`);

const sn = toplam / SN.fps, BK = SN.bolum;
const bolumKural = (m) => (TAM ? H("bölüm", m) : U("bölüm", m));
if (sn < BK.sureMinSn || sn > BK.sureMaxSn) bolumKural(`süre ${sn.toFixed(1)} sn (${BK.sureMinSn}–${BK.sureMaxSn})`);
const n = (B.planlar ?? []).length;
if (n < BK.planMin || n > BK.planMax) bolumKural(`plan sayısı ${n} (${BK.planMin}–${BK.planMax})`);
if (sablonlar.size > BK.sablonMaks + 2) bolumKural(`şablon çeşidi ${sablonlar.size} (önerilen mekân şablonu 2–${BK.sablonMaks})`);

console.log(`${dosya}: ${n} plan · ${toplam} kare · ${sn.toFixed(2)} sn · şablonlar: ${[...sablonlar].join(", ")}`);
for (const u of uyarilar) console.log(`  UYARI  ${u}`);
for (const h of hatalar) console.log(`  HATA   ${h}`);
console.log(`  temas: ${tumTemas.length}  dokunuş: ${dokunuslar.size}  →  ${hatalar.length ? "GEÇMEDİ" : "GEÇTİ"} (${hatalar.length} hata, ${uyarilar.length} uyarı)`);
if (temasCikti) { fs.writeFileSync(temasCikti, JSON.stringify({ fps: SN.fps, temaslar: tumTemas }, null, 2)); console.log(`  temas listesi → ${temasCikti}`); }
process.exit(hatalar.length ? 1 : 0);
