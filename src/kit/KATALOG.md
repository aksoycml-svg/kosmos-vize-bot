# Set Kiti K1+K2 — Şablon Kataloğu

Yönetmen bölümü **yalnız bu katalogla** kurar: `bolumler/<slug>/bolum.json` yazılır, kod yazılmaz.
Sınırların makine okunur tek kaynağı: `src/kit/sinirlar.json` (doğrulayıcı aynı dosyayı okur).

## Akış
1. `bolum.json` yaz (şema: `src/kit/tipler.ts`).
2. `node tools/bolum_dogrula.mjs bolumler/<slug>/bolum.json --tam --temas bolumler/<slug>/temaslar.json`
3. Kontrol karesi: `npx remotion still Bolum out.png --frame=N --props='{"yol":"<slug>/bolum.json","guvenli":true}'`
   (`guvenli: true` → güvenli alan + yazı bantları + ayak/yüz/temas kilit noktaları bindirmesi)
4. Tam render: `npx remotion render Bolum --props='{"yol":"<slug>/bolum.json"}'`

Dosya adı `bolum*.json` olmalı (bundle'a `require.context` ile girer). Kareler **60 fps**, plan içi kare `p` 0'dan başlar.

## Plan ortak alanları
```jsonc
{
  "id": "P04", "sablon": "SOKAK", "sure_kare": 240,
  "parametreler": { ... },                         // şablona özel (aşağıda)
  "kamera": { "kare": [0, 78, 144], "cs": [1, 1.1, 1.7], "cx": [0, 0, 80], "cy": [0, -20, -247], "egri": "giris|inout|lineer" },
  "karakterler": [{ "kim": "louis", "z": [3.3, 2.45], "u": 0.7, "kare": [0, 74], "yon": -1,
                    "jestler": [{ "ad": "yuru", "bas": 0, "bit": 76 }], "yuz": { "ifade": "gulumse", "bakis": [1, 0], "kas": 0.5 },
                    "aksesuar": ["baston", "cep-eldiven"], "palet": { "skin": "#d8c8b0" }, "etiket": { "ad": "Louis", "alt": "BLANC · BORDEAUX" } }],
  "props": [{ "tur": "paket", "id": "paket", "x": 690, "y": 1340, "olcek": 1.15, "kare": [0, 54], "durum": { "acik": [0.5, 1] } }],
  "el": [ ... ],                                    // yalnız MASA-INSERT
  "ekran_yazisi": [{ "bant": "ust", "metin": "1834. Bilgisayar yok.", "vurgu": ["yok"], "kagitSerit": true, "tur": "iddia|formul", "bas": 0, "bit": 180 }],
  // ekran_yazisi.metin içinde "\n" = elle satır sonu (yetim kırılımı önler; yoksa otomatik). replik.kim serbest metin etiketidir (EN: "OPERATOR").
  "replik": [{ "kim": "FRANÇOIS", "metin": "…", "bant": "ust", "bas": 4, "bit": 196, "vurgu": ["kazanır"], "kelimeKare": [4, 20, 40] }],
  "temaslar": [{ "kare": 108, "olay": "baston TAK", "ses": "baston-tak", "db": -4 }],
  "dokunus": { "id": "D1", "ad": "Baston–fare" }
}
```
- **Anahtarlı değer:** sayı ya da dizi; dizi ise aynı nesnenin `kare` dizisiyle eşit uzunlukta (yol, durum, kamera).
- **Kamera eğrisi:** `giris` = bezier(.16,1,.3,1) (varsayılan), `inout` push-in, `lineer` yalnız kamera kaymasında.
- **Yazı bantları:** `ust` y 240–400, `alt` y 1290–1490. Replik ayakları/temas/kurulum nesnesini örtecekse `ust`.
- **Yazı standardı (K2, şablondan bağımsız — parametre DEĞİL, `src/kit/yazi.tsx`):** ekran yazısı HER ZAMAN kâğıt şerit + Playfair 900 (`tur: formul` → Plex Mono, yine şeritli; **K4:** tek satır 64 px, iki satır ≤ 60 px, ` · ` varsa oradan, yoksa son ` = ` öncesinden kırılır); kırmızı vurgu yalnız TEK kelime (`vurgu` listesinden ilk eşleşen); uzun metin iki dengeli satıra bölünür, şerit iki satırı kapsar, kutu 240–400 içinde kalır (boyut otomatik). `kagitSerit`/`boyut` alanları geri uyum için şemada, yok sayılır. Replik: konuşan plakası + Inter 800 + arkasında yarı saydam koyu bant. Doğrulayıcı: üst bantta ekran yazısı ile replik aynı anda → uyarı; vurgu > 1 → uyarı.
- **Temas = ses:** görünür her çarpma/bırakma bir `temaslar` girdisi. Jest temasları (baston-vur vuruşu, it-cek tik'leri, eldiven-giy gerilmesi, MASA-INSERT bırakma, HARITA mühür, kule kol varışı) doğrulayıcıda denetlenir. `--temas` çıktısı mutlak kare/saniye listesidir; sesler oradan yerleşir.
- **Plan sesi (`ses`, opsiyonel):** `"ses": [{ "dosya": "blanc/ses-v3/P05.mp3", "kare": 12, "db": 0 }]` — `dosya` public/ altından göreli, `kare` plan içi başlangıç, `db` kazanç (varsayılan 0 → volume 1). Plan bitince kesilir. Doğrulayıcı: dosya yok = HATA; plan sonundan taşma ve aynı planda iki sesin çakışması = UYARI (ffprobe yoksa uyarı).
- **Foley + müzik (ses eki, `src/kit/ses.tsx`):** bolum.json'a alan EKLENMEZ. Bolum props `foley`/`miks` (bolumler/'den göreli json yolu) verilmezse bolum json'unun klasöründeki `foley.json` / `miks.json` okunur; yoksa sessiz geçilir. `foley.json`: `{ "<ses_adi>": { "dosya": "blanc/foley/x.wav", "tepe_ms": 35, "onerilen_db": -6 } }` — her `temaslar[].ses` adı buradan çalar; başlangıç = temas mutlak karesi − tepe_ms·60/1000 (tepe temas karesinde), plan kesmesinde kesilmez. db önceliği: `temas.db` > `miks.istisnalar[ses]` (sayı ya da `{db}`) > `onerilen_db` > `miks.foley_varsayilan_db` > −4. `miks.json`: `{ "muzik": { "dosya", "bas_kare", "db", "fade_in_kare", "fade_out_kare", "duck": { "anlatim_db", "atak_kare"?, "birakma_kare"? } }, "foley_varsayilan_db", "istisnalar" }` — tek müzik bas_kare'den bölüm sonuna; `db` = anlatımsız seviye, `duck.anlatim_db` = plan `ses` çalarken MUTLAK seviye (atak 9 / bırakma 24 kare rampa; anlatım süresi calculateMetadata'da okunur, okunamazsa plan sonuna dek duck). public'te olmayan dosya render'da atlanır. Doğrulayıcı (`--foley`/`--miks` ile yol ezilir): foley.json yok, tanımsız ses adı, eksik dosya, tepe_ms yok, sessiz temas, kullanılmayan foley, müzik dosyası yok = UYARI.
- **Dokunuş:** plan başına en çok bir `dokunus.id`; bölümde tekrar ederse doğrulayıcı hata verir. Kütüphane: `DOKUNUS-KUTUPHANESI.md`.

### Karakter kaydı (`kim`)
`francois, louis, louis-eldivenli, memur, mudur, telgrafci, katip, tuccar, yargic` (src/kit/karakterler.ts) · Evliya: `lagari, yardimci-1, yardimci-2` (src/kit/paletler/evliya.ts; Kukla `kostum: osmanli | osmanli-kisa`, `sapka: sarik | sarik-basik | takke`). Bölüme özel kostüm/ten: `palet` override. Yeni karakter = kurulum ekibi (palet ekler).

### Jest kütüphanesi (`jestler[].ad`, ops)
| jest | ops | not |
|---|---|---|
| `yuru` | `faz` (rad) | z/u **dizi** yolu gerekir; adım fazı kat edilen yoldan (ayak kaymaz) |
| `konus` | `metin`, `hiz` (kare/harf, 5) | visem dudak |
| `isaret` | `aci` (−95 ileri, −150 yukarı) | ön kol |
| `sapka-kaldir` | — | ön el şapkayı kaldırır, bit'te iner |
| `baston-vur` | `vurus` (kare), `el` (arka/on), `hedefX` | uç taşa iner, temas = `vurus` (zorunlu temas). `aksesuar: baston` |
| `esne` | `agiz` (`esneme`\|`O`\|`uykulu` K4) | yakın planda (YAKIN-YUZ) varsayılan kocaman `esneme` ağzı (çene düşer, diş + dil, gözler sıkı); genel planda küçük O. Ağız ifadesi `yuz.ifade: "esneme"` da olur |
| `it-cek` | `tekrar` (3) | kol iter-çeker; tik kareleri `round(bas + (i+.25)·L/tekrar)` |
| `eldiven-giy` | `gerilme` (kare) | iki el önde; gerilme karesinden sonra el eldiven beyazı (temas zorunlu) |
| `fisilda` | `hiz` | ağır göz kapağı, kısık ağız döngüsü |
| `yaz` | — | ön kol yazma, baş aşağı |
| `bak` | `x`, `y`, `egim` | bakış/baş |
Jestler zarfla karışır (giriş bezier(.16,1,.3,1), çıkış hızlı); aynı anda birden çok jest olabilir.

### Prop kaydı (`props[].tur`, `durum`)
| tur | durum | not |
|---|---|---|
| `paket` | `acik` 0–1, `ipCozuk`, `kabarti`, `etiket`, `etiketX/Y`, **K4:** `kapan` 0–1, `ip` 0–1 | kâğıt + kenevir ip (kutu yok). **K4 kapanma (MASA-INSERT, `acik: 1` iken):** `kapan` 0→1 dört kanadı sırayla katlar (sol 0–.25 · sağ .25–.5 · alt .5–.75 · üst .75–1), silüet/konum/ölçek SÜREKLİ (sprite atlaması yok); `ip` 0→1 gevşek uçlar çekilir, ip boyuna+enine sarar, .6–1 fiyonk sıkılır, etiket düğüme gelir. Her kanadın inişi `kagit-katlama`, ip `ip-zit`, düğüm `dugum-tok` teması. Kanat geçişleri arasında 8–12 kare bekleme anahtarı ver (el yeni kanada gider) |
| `eldiven` | `elBoyu` (266) | İMZA NESNESİ — beyazı başka nesnede yok |
| `corap` | `sarkma` 0–1 | koyu yün |
| `dosya` | `kapak` 0 açık → 1 kapalı | kapanış karesi = "TOK" teması |
| `kitap` | `sayfa` 0–1, `bos` (K4: boolean dizisi de olur, basamaklı), `guve` (K4: < 0 = yok) | açık kanun kitabı, TEK nesne: her çevirişte `sayfa` 0→1, sonraki yaprak için 0. `bos` son çevirişin ilk karesinde true (yaprak sağ sayfayı örterken). `guve` anahtarlı: −1 yok · 0 boş sayfada kanat kapalı, çevrilen yaprağın ALTINDA (yaprak kalkınca görünür) · .1'den sonra kanat çırparak uçar (yaprağın üstünde) · 1 kadraj üstünden çıkmış (fade yok) |
| `kese`, `hokka`, `mum`, `fener` | — | fener/mum ışık kaynağı şablonda aynı noktadan |
| **K4 el–prop teması (IC-ODA, her prop)** | `it: {kim, bas, bit}` · `al: {kim, kare, uzan (24), don (30)}` | `it`: karakterin ön eli (IK) bas–bit prop'un arkasında izler (prop yolu `x/y` anahtarı; el 14 karede gelir/çekilir), bas = temas. `al`: kare−uzan…kare uzanır, kare'de kavrar (prop ele bağlanır, ağzından sarkar), sonra `don` karede bel–göğüs hizasına kaldırır ve tutar; kare = temas. Arkadaki karakter masaya uzanırsa ön kolu masanın önünde çizilir. Erişim yetmezse kalçadan ≤ 20° eğilir. Doğrulayıcı: kim planda, temas, bitiş payı |

---

## SOKAK
Perspektif dar sokak (Haussmann öncesi; Bordeaux = Gambetta düzeni ayrı evler, maskaron, balkon; tuile, Garonne direkleri, külahsız Saint-Michel + T; Paris = Proto sokağı).
| parametre | değerler |
|---|---|
| `sehir` * | `bordeaux` · `paris` (yalnız gece) |
| `saat` * | `gece` (réverbère tek nokta ışık, ıslak taş, sis) · `gun` (TAS-BDX #d6bf8e, kuru taş, güneş sol-üst-arka) |
| `izgara` | `{z, u}` kurulum ızgarası |
| `insert` | `{tur: "fare", bas}` → bas..bas+66 fare insert'i (iç temaslar: pençe +9, çizme +20, TAK +30, cıyak +32, dalış +50, tink +60) |
| `revAsili` | réverbère sarkması (15) |
- Karakter: `z` 1.25–4.5 (1.3 ≈ boy plan, 2.4 ≈ geniş), `u` 0.12–0.88 (0 sol duvar, 1 sağ duvar). En çok 3 karakter.
- Kamera: `cs` 0.9–3.4 (3.2 ≈ yüz yakın: cx/cy ile yüzü kadraja getir; P04 tablosu örnek). Parallaks otomatik (gök .25, uzak .55).
- Güvenli alan: z ≥ 2.2'de ayaklar y ≤ 1480. z < 2'de ayaklar alt banda iner → replik `ust`.
```json
{ "id": "P04", "sablon": "SOKAK", "sure_kare": 240, "parametreler": { "sehir": "bordeaux", "saat": "gece", "izgara": { "z": 2.6, "u": 0.32 }, "insert": { "tur": "fare", "bas": 78 } },
  "karakterler": [{ "kim": "francois", "z": [3.2, 2.4], "u": 0.46, "kare": [0, 74], "yon": -1, "jestler": [{ "ad": "yuru", "bas": 0, "bit": 76 }] }] }
```

## IC-ODA
Kutu oda, göz hizası 1.6 m (ufuk y 760, F 1150), alçak çatı katı tavanı + kirişler, arka duvarda basık kemerli lucarne (dış manzara), döşeme tahtası.
| parametre | değerler |
|---|---|
| `oda` * | `tours-buro` (tuffeau badana; dışı Tours kulesi + T) · `bordeaux-cati` (TAS-BDX; dışı tuile çatılar + külahsız Saint-Michel; pervaz çentikleri + teleskop) · `yatak` (yatak arka duvarda; dışı gece) |
| `isik` * | `mum` (masadaki mum TEK nokta ışık; tonlar loş-sıcak — karartma katmanı yok) · `gun` (pencereden güneş) |
| `masa` | `{z, u, w, d, h}` (m) — props masanın üstüne: `x` = u (m), `y` = z (m) |
| `pencere` | `{u, h0, w, h}` (m; varsayılan u .9, h0 .95, 1.0×1.15) |
| `dis` | `tours` · `bordeaux` · `gece` (oda varsayılanını ezer). **K4:** `bordeaux` Saint-Michel T'si planın `kol` parametresini izler (MESAJ/HATA, varışta aşma), T %35 büyük ve açıklığın içinde; sol gösterge HATA açısına yaklaşınca kırmızı halka (ayrı parametre yok) |
| `kol` | dış T kolu: `"BEKLE"` ya da `{kare:[a,b], konum:["BEKLE","SAK"]}` (gece/sis: sabit) |
| `arka` | arka duvar z (4.2) · `pervazCentik` (sayı) · `pervazCentikYeni` (kare: bir çentik daha — bıçak teması) · `teleskop` |
- Karakter: `z` 2.2–4.0 m, `u` −2.0…2.0 m (0 orta). Ekran x = 540 + u·1150/z → **|u|/z ≤ 0.33** tut (IG düğme sütunu x > 920). En çok 3.
- Ayak y = 760 + 1840/z: z ≥ 2.6 ⇒ ayak ≤ 1468.

| K2 parametre | değerler |
|---|---|
| `golgeT` (K2, D2) | `{kim, bas, bit, donusum (36), konum ("MESAJ"; "SAK" önerilir), koyuluk (0.82; 0–1 opaklık), kenar (1; 0–1 netlik, 1 = keskin)}` — yalnız `isik: mum`. T merkezi kol gölgesinin ortasında. Karakter zemin gölgesi IC-ODA'da zemine kırpılır (duvara tırmanmaz; duvardaki kısım bu izdüşüm). Karakterin omuz/dirsek/el/baş/kalça noktaları mum alevinden arka duvara izdüşer (net kenar, büyür; pencere camına düşmez); `bas`→`bas+donusum` kol düzleşip regülatör, parmak/baş gösterge, gövde direk olur; `bit`'e doğru geri döner. Karakter z > masa z olmalı (mumun arkasında). Gölge karakterin yanına düşsün: mum yanal olarak karakterden ≥ 1 m uzak (örnek: masa u 0.45, karakter u −0.2, z 3.65 / masa z 3.0) |
| `manipulator` (K2) | `{kim, ileri (0.75 m), h (1.0 m), yari (0.3 m)}` — Chappe kumandası: karakterin önünde ahşap direk + küçük siyah kol + tavandaki makaralara kablolar. Kol açısı karakterin `it-cek` fazından; ön el IK ile tutamağa oturur (el koldan kopmaz). Tik temasları `it-cek` ile aynı |
| `pervazBicak` (K2, D6; K4) | `{bas, kare, bit, kim}` — **K4:** bıçak `kim` karakterinin (yoksa ilk karakter) KENDİ ön kolunda: kukla kolu + manşet + el + sapı kavrayan parmaklar, rig ışığı sahnenin tek ışığından; iki kemikli IK (dirsek aşağı), erişim için ≤ 24° öne eğilme; çakı plan başından elde (birden belirmez). `tip` artık yok sayılır; uç `pervazCentik`+1. çentiği çizer, `kare` = "kırt" teması (zorunlu). `pervazCentikYeni` = aynı kare. Push-in planında kullan (kamera cs ≈ 2.5; pencere `u` 0.1 ile çentik merkeze yakın, cx sınırı içinde) |
- Örtüşme (K2): doğrulayıcı aynı derinlik yakınındaki (|Δz| ≤ 0.6) karakterlerin ekran x farkı omuz genişliğinden (0.6 m) azsa UYARI verir (`sinirlar.json` → `IC-ODA.ortusme`).

## MASA-INSERT
Tepe-önden masa yakın planı (SB2-TOURS P01 plakası): meşe masa, prop seti, 0–2 KolEl eli.
| parametre | değerler |
|---|---|
| `aci` * | `tepe-onden` (masa y 820'den; arkada duvar + lucarne) · `tepe-egik` (duvar şeridi y 520'ye kadar, pencere yok) · `tepe` (yalnız masa) |
| `isik` * | `gun` (güneş, sağ-üst → gölge sol-aşağı) · `fener` (+ fener ışık havuzu) |
| `pencere` | `tours` · `bordeaux` · `gece` · `yok` (yalnız tepe-onden) · `kol` (dış T, IC-ODA ile aynı) |
| `fener` | `[x, taban]` (430, 1092) · `elYukseklik` (el gölge kayması, 120) |
- Props: ekran px (masa düzlemi). Masa y aralığı ≈ 860–1680 (tepe-onden).
- El: `{tip, giris, kare[], bilek[[x,y]], dirsek[[x,y]], aci[], olcek(1.9), poz:[{kare, poz:"kistir|gevsek"}], tut:{prop, bas, bit, tutulAci, birakAci}}`. Tutulan prop kıstırma noktasını izler, bit'ten önceki 18 karede `birakAci`'ya döner, bit'te bırakıldığı yerde kalır (bit = temas, zorunlu). `tip`: ceket · gomlek · parisManset · gorevli · yazici · louis.
- **K4 `el.takip: [{prop, kare: [a, b]}]`** (MASA-INSERT): pencere içinde kıstırma noktası prop'un tutma noktasını izler (paket: o an katlanan kanadın serbest kenarı; `ip` evresinde düğüm). Pencere dışına 6 kare yumuşak geçiş; anahtarlı `bilek` pencere sınırında tutma noktasına yakın verilir (Blanc P14). Paket kanatları/ip eldivenin üstünde, elin altında çizilir.
- Kamera: cs 1.0–1.5. Kıstırma noktası ve bırakma yeri alt banda (y > 1290) gelmesin; yazı `ust`.

| K2 parametre | değerler |
|---|---|
| `eldivenGiy` (K2, D7) | `{bas, bit, gerilme (bas+.86·L), x (540), y (1000 = eldiven boğum hattı), olcek (1.3), aci}` — Louis sol eli alttan girer, sağ el (KolEl) manşeti kıstırır; kılıflar sırayla dolar (işaret→orta→yüzük→serçe→başparmak), sonra manşet çekilir. `gerilme` = TEMAS (zorunlu). olcek 1.3 ⇒ el ≈ ekranın %21–26'sı. **K4:** sağ el (KolEl) eldivenle AYNI el boyunda çizilir (eldiven = bir el boyu; eskiden sağ el eldivenin ≈ %65'iydi). Eldiven = İMZA beyazı; bu planda başka eldiven prop'u koyma |
- Tutulan prop'un masaya gölgesi (K2): otomatik, el gölgesiyle aynı güneş kaymasından (`elYukseklik`).

## KULE-DIS
Açık gök + Loire sırtları + 1–5 Chappe istasyonu (kare tuffeau kule ≈ 2 kat, çatıdan gök mavisi direk + siyah T; 2.3:1).
| parametre | değerler |
|---|---|
| `saat` * | `gun` (kollar anahtarlı oynar) · `alacakaranlik` (siluet; kollar SABİT — doğrulayıcı zorlar) |
| `kuleler` | `[{x, taban, L, konum, halo:[bas,bit], govde}]` — `L` regülatör px (280 yakın … 36 uzak); `konum` KONUMLAR adı (`BEKLE, SAK, MESAJ, HATA, DINLEN`) ya da `{kare, konum[]}` (varışta aşma + yerleşme; varış karesi = "klak") |
- Kule tepesi y = taban − 3.2·L: L 280 ⇒ taban ≥ 1300 ki T üst banda girmesin. Uzak kuleler sırt çizgisine (y 900–1060) bassın.
- `halo`: kırmızı halka (yalnız hata vurgusu). Ön planda en yakın kuleye toprak yol otomatik.
- Kamera cs 0.9–4.0 (push-in kola).
- `kuleler[].wifi` (K2, P13): `{bas, bit}` — T kolları ahşap Wi-Fi ikonuna döner: sağ gösterge → küçük yay, sol → orta, regülatör → büyük yay, sırayla (her biri ⅓); pivot topuzu = nokta. Siyah boyalı ahşap + açık kenar çizgisi, neon/parlama yok; direk gök mavisi kalır. Varış kareleri `bas + (bit−bas)·i/3` (i=1..3) = "tak" temasları. Yalnız `saat: gun`. Yaylar regülatör tepesinin 0.86·L üstüne çıkar → büyük kulede taban/L'yi üst banda girmeyecek seç (L 240, taban 1500 ⇒ yay tepesi y ≈ 520).

## HARITA
Parşömen + Fransa + dönem rotası. Font dışı glif yok (sayaç ikonları SVG: güneş/ay/T).
| parametre | değerler |
|---|---|
| `rota` * | `paris-bordeaux` (Chartres–Tours–Poitiers–Angoulême) |
| `posta` | `{bas, bit, gun}` araba rota boyunca; sayaç "N. GÜN" + gün/ay diski (`gun`: 3) |
| `telgraf` | `{bas, bit, kule, saat}` sinyal + kule ikonları; sayaç "N SAAT" (`saat`: 4) |
| `sayac_etiket` | `{saat, gun}` sayaç metin şablonu, `{n}` sayıyı alır (EN: `{"saat":"{n} HOURS","gun":"DAY {n}"}`); verilmezse TR: "{n} SAAT" / "{n}. GÜN" |
| `sayac_sag` | sayaç kutularının sağ kenar boşluğu px (varsayılan 80; EN'de 96) |
| `muhur` | `{kare, metin}` kırmızı mühür (540, 880) iner; kare = TOK teması (zorunlu) |
- Sayaç kutusu sağ-alt (y 1320–1400). **K4 çift sayaç:** `posta` ve `telgraf` birlikte verilirse iki ayrı kutu (telgraf üstte y 1290, posta altta y 1400); her kutu kendi `bas`'ında sağdan kayarak girer, son değerinde kalır. Vuruşlar art arda ya da üst üste olabilir; sırayı anlatıma göre ver. Sayaç değişimleri (saat: qt .375/.625/.875; gün: qp 1/3, 2/3) `sayac-tik` teması alır. Kamera cs 1.0–1.6. Gece karartma katmanı yok.

## YAKIN-YUZ
Tek karakter yakın (rig `yakin` yüz), arka başka şablonun bulanık sahnesi.
| parametre | değerler |
|---|---|
| `arka` * | `{sablon: "KULE-DIS"|"IC-ODA"|"SOKAK"|..., parametreler, kamera}` |
| `yuz` | `[x, y]` yüz merkezi (540, 800) — yazı bantlarından ≥ 60 px uzak |
| `olcek` | 3.6 (≥ 3.5 ⇒ yüz ≥ %15) · `egim` (yastığa yaslanma °) · `yastik` · `bulanik` (16) · `isik` `gun`|`mum` |
- 1 karakter; `z/u` yok sayılır. `esne` jesti burada kocaman `esneme` ağzı verir (K2).
- `manipulator` (K2): `{ileri: [x, y] rig yerel (175, −280), yari (72)}` — göğüs önünde kumanda kolu; it-çek fazı kolu döndürür, el IK ile tutamakta; kablolar kadraj üstüne. Kol jest dışında da elde kalır (süreklilik).

## SARAYBURNU (Evliya, İstanbul 1630'lar — kurulu: `kiyi` + `gece` (K1), `insert` + `gece`/`gun` (K2), `kosk` + `gece`/`gun` (K3))
Sinan Paşa (İncili) Köşkü kıyısı (mekanlar.md §1). `src/kit/sablonlar/sarayburnu/`. Kurulmamış görünüm/saat render'da AÇIK HATA verir; doğrulayıcı da HATA.
| parametre | değerler |
|---|---|
| `gorunum` * | `kiyi` (KURULU, gece) · `insert` (KURULU, gece+gün) · `kosk` (KURULU K3, gece+gün; P02/P10 aynı dekor) · `ic` (sonraki kalibrasyon) |
| `kosk` parametreleri | `senlik [{x,y,bas,patlama,yaricap,dusme_kare}]` (E2 düşen çizgi, köşk arkasında; patlama karesinde temas zorunlu) · `pencere_isigi` · `padisah {renk, kenar_isik, bas_aci: sayı \| {kare, deger}}` (karakter `padisah` = `PadisahSiluet`, Kukla değil; yoksa `bak` jesti) · `kosk_konum.pencere_x/y` (mekanlar §1.3 ile aynı olmalı) · sol uzak grup: karakter `olcek` × 406.7 px/m, `poz oturan` + aynı x'te `fisek-demet` → demete bağlı |
| `saat` * | `gece` · `gun` (gün = arşiv `gunduzMineral`) |
| `fitil` | `{bas, bit}` kıvılcım x 330'dan demet ağzına yürür (4 köşeli yıldız; yalnız burada) |
| `puskurme` | `{bas, bit, sonuk}` demet ağızlarından püskürme; bas+6'dan anahtar ışık püskürme (meşale gölge payını devreder); yerdeyken zemine çarpan alev + kıvılcım, duman |
| `kosk_konum` | `{su_cizgisi 762, ust 534, x [740, 928], px_m 17}` |
- **Konum dili `xy`:** karakter/prop `x/y` = dekor px, ZEMİN TEMASI (ayak tabanı / kızak altı). Rıhtımdaki (y ≥ 1256) figürün ölçeği ufuk–ölçekten (ufuk 720, göz 1.5 m: px/m = (y − 720)/1.5; json `olcek` yok sayılır, doğrulayıcı farkı uyarır). Havadaki/sudaki nesne `olcek` (1 = y 1330, 406.7 px/m) ister — y'den türetilemez.
- **Karakterler:** `lagari` (osmanli kostüm, sarık, bıyık, sırtta kanat varsayılan) · `yardimci-1` (yüzsüz, takke; **meşale ön elinde varsayılan** — mekanlar §0.6 tek ışık) · `yardimci-2` (yüzsüz, eller kuşakta). En çok 4.
- **`poz: oturan` + `bagli: {prop: "<demet id>"}`:** kalça oturakta, ayaklar dayama çubuğunda, ön el üst sicim bağında, arka el oturak kenarında (x/y yok sayılır).
- **Jestler:** `sicra` (geri adım + kol yüze, lean −12; meşale bele iner) · `kanat-ac` (kanat prop `durum.acik` 0→1; kollar ön kenar altına) · `ucus` (gövde 30° öne, bacaklar geride) · `yuz`, `kanat-birak` = KURULUMDA (şemada var, çizilmez; doğrulayıcı uyarır).
- **Prop'lar (yalnız SARAYBURNU):** `fisek-demet` (İMZA #c4a874; durum `puskurme`, `titreme`, `bos`; `aci`; havada `olcek`) · `mesale` (`bagli` yardımcı; x/y = baş hedefi: omuzdan ≥ 0.9 m ise izlenir, değilse taşıma pozu; meşale her zaman eli izler) · `baslik` (takke; `kare[1]`'de sahibinin başından ayrılır, `olcek` 1.6 stilize; sahip varsayılan `yardimci-1`) · `kanat` (`bagli` karakter, `durum.acik`; `suda` KURULUMDA).
- Kamera cs 0.9–3.0, cx ±740, cy −200…600; parallaks yok (mekanlar §0.1: hepsi f = 1).
- **Eşleşen kesme:** önceki plan aynı şablonsa ve `puskurme.bas = 0` ise duman önceki planın kaynağı/seed'i/yaşıyla devralınır (Bolum → `onceki`).
- **`okutma.dalga_izi`** (kıyı): yüzen figürün arkasında 3 kesik V dalga izi. İniş (`ucus.bit`) = taç sıçrama (E3, 20 kare) + 10 karede batış.
- **`insert` (K2, P07/P11):** mekanlar §1.4 kamera (göz 1.0 m, UN (560,180), zemin y = 180 + 3793/d, px/m = y − 180). Sağda köşk altyapı duvarı + kemer iç köşesi, solda deniz, rıhtım kenarında denize inen 3 basamak (0.2 m; d 3.5–4.55 m), döşeme sıraları 0.4 m.
  - **Gövdeler kadraj dışında:** alıcı (`karakterler[0]`: `lagari`/`hezarfen`) solda — kadrajda yalnız sağ omuz başı + kolu; omuz avuç yüksekliğini izler (çömelir/doğrulur), `egil` omzu öne, `dogrul` yukarı alır. Karakter `x/y` insert'te çizimde kullanılmaz (durum `islak`, `damla [bas,bit]`, jestler kullanılır).
  - **`el[]`** (en çok 3; ekran px): `rol: alan` (tip `lagari`/`hezarfen`; dirsek json'dan, bilek json'dan; ilk anahtar zemine yakınsa avuç basamağa BASAR = temas o karede) · `rol: veren` (tip `entari-yen`, sağdan; `tut {prop, bas, bit}` kese kıstırmada, `bit`'te kese tabanı alıcı avucuna oturur; çıkışta el tümüyle sağdan çıkar) · `rol: omuz` (tip `muhafiz`, soldan; `kare[2]` = omza iniş teması; json yolu, gerçek omuz başına bağlanır; kumaş 6 px içeri). Poz: `gevsek`(önce)=avuç açık, `kistir`=kapa, `gevsek`(sonra)=gevşe (bilek 12° düşer, kese kayar). El boyu 0.19 m (≈ 240 px), kese = 0.85 × el.
  - **Prop:** `kese` (kumaş torba #625646, `durum.icerik gumus|altin`; x/y = taban teması; elde iken eli izler, json yolu yalnız serbest düşüş/yerde) · `sikke` (altın, `durum.donus`, `yatis`; x/y = zemin teması, 22 mm × 3).
  - **Işık:** gece köşk penceresi (`isik_nokta`, gölge sola, döşemenin sağ yarısında amber havuz) · gün güneş tam soldan (yönlü (3.7, −0.15), gölge sağa uzun; muhafız eli gölgesi omza iniş öncesi ışıktan türer).

## AVLU-SALON (kayıtlı değil)
`src/kit/sablonlar/avlu-salon/AvluSalon.tsx` = SB2-BORSA P02 kodu (portikli avlu, kalabalık, tahta). Parametrelenmedi; `SB2-BORSA` kompozisyonu olarak çalışır. Gerektiğinde kurulum ekibi şablonlaştırır.

## Bölüm düzeyi kurallar (doğrulayıcı `--tam`)
30–60 sn · 8–14 plan · plan ≥ 60 kare · 2–4 mekân şablonu (+ HARITA/YAKIN-YUZ/MASA-INSERT) · dokunuş tekrarı yok.

## K3 ekleri (yatık poz · hasta yüz · yüz varyantları · bitiş/kontrol_kare kuralları)
| alan | değerler |
|---|---|
| `karakterler[].poz` | `ayakta` (varsayılan) · `yatik` — yatakta sırtüstü: baş solda yastıkta, gövde yorgan altında (kabartı göğüs–kalça–diz–ayak), kol yorganın üstünde, şapka otomatik yok, ayak gölgesi/ayak kilidi yok. **IC-ODA `oda: yatak`** → karyolaya oturur (z/u yok sayılır; yatak arka duvara paralel u −1.6…0.5, ayak ucu tahtası yorgan ucunu örter). **YAKIN-YUZ `yatik: true`** → yüz `yuz` noktasında, yandan-üstten; altında keten çarşaf + başucu tahtası, yorgan kısa sarkar. `egim` çapraz verir (8 iyi). `yorgan` (YAKIN-YUZ): renk (varsayılan #5d6b7a) **ya da K4** `{renk, kalinlik 0.3–1 (kabartı yüksekliği, 1), sarkma (rig yerel, 120)}` — yakın planda yorgan alt üçte birin ≤ %25'i (Blanc P10: `{kalinlik .5, sarkma 30}` ≈ %18) |
| `yuz.ifade: "hasta"` | solgun ten (el dahil), göz altı morluğu, göz yarı kapalı (kırpma sürer), yanak kızarıklığı yok. `yuz.ter: true` → alında/şakakta 4 ter damlası. `fisilda` jesti hasta yüzde küçük `fisilti` ağzıyla döner (diş görünmez) |
| ağız `fisilti` | küçük aralık dudak (ifade olarak da verilebilir) |
| `karakterler[].yuzVaryant` | kayıttaki yüzü ezer: `francois, louis, memur, telgrafci, katip, mudur, tuccar, yargic` |
- **Yüz varyantları** (`src/kit/karakterler.ts` YUZLER; kim → varyant `sinirlar.json` `yuzVaryant`): memur = dar-uzun yüz, seyrek saç (açık alın), endişeli ince kaş, yanak çukuru, sakalsız/bıyıksız, şapkasız · telgrafçı = yuvarlak geniş yüz, gür favori, kalın kaş, yuvarlak burun, kumaş kasket · katip = sivri burun, ince bıyık, yağlı yana taranmış saç, kemerli kaş, gözlük yok · müdür/tüccar/yargıç kendi varyantı. François/Louis değişmedi (piksel farkı 0). Rig parametreleri: `palet.yuz {genislik, uzunluk, burunTip duz|sivri|yuvarlak, kasAci, sac bukle|seyrek|duz, yasCizgi, zayif}`, `biyik … | ince`, `sapka … | kasket`; kaş kalınlığı `browHeavy`, favori `sideburn`.
- **Doğrulayıcı (K3):** iki farklı kişi aynı yüz varyantı → UYARI (louis/louis-eldivenli aynı kişi); kitte olmayan `ifade` → UYARI (dinlen çizilir); `poz` geçersiz/`yuzVaryant` yok → HATA. **HATA:** her jest/prop anahtarı/el/yürüyüş yolu/morf (golgeT, pervazBicak, eldivenGiy, wifi, kule konum, halo, posta, telgraf, mühür, fare insert, kol) ve `dokunus.bit` plan sonundan **≥ 12 kare önce** biter; **`kontrol_kare` her planda zorunlu** ve plan içinde.
- **Kontrol kareleri:** `node tools/kontrol_kareleri.mjs bolumler/<slug>/bolum.json [cikti.json] [--komut]` → plan başına ilk / kontrol_kare / son (plan içi + mutlak kare + sn); `--komut` remotion still satırlarını yazar. Otomatik kare seçimi yok.
