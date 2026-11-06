# Blanc Kardeşler (Bölüm 1) · Mekân Şartnamesi

Hazırlayan: mekân sorumlusu (production designer) · 2026-11-06
Brif (kullanıcı): "MEKÂN çok önemli. Senaryoya, dokuya, şehre uygun hem de kendi içinde estetik olmalı. Dokudan bahsediyorum, dilden de."
Girdi: `senaryo-v2.md` (v2.1), `arastirma.md`, `storyboard-v2/tasarim.md` (12 mekân kartı, bu belgenin temeli), `storyboard-v2/sahne-plani.md` (P14 ve P15 144 kare olan güncel sürüm), `storyboard-v2/dokunuslar.md` (v2.1 dönem revizyonu), `storyboard-v2/donem-dogrulama.md` (araştırmacı). Kod (yalnız okundu): `src/theme.ts`, `proto/Sokak.tsx`, `proto/Proto.tsx`, `Harita.tsx`, `components/ChappeTower.tsx`, `Paper.tsx`, `Efektler.tsx`.
Bu belge **şartnamedir, kod değildir.** Kod bloklarındaki imzalar ve sayılar motion için öneridir, hiçbir kaynak dosya değiştirilmedi.

Etiketler: **[A]** arastirma.md · **[D]** donem-dogrulama.md (güveni yanında: kesin/olası) · **[S]** senaryo (dramatizasyon) · **[G]** genel bilgi, kaynaklanmadı · **[G ◐]** emin değilim, **doğrulanmalı** · **[T]** tasarım kararı (tarihî iddia değil).

---

> **Değişiklik notu R1 (2026-11-06, kare denetimi):** SB2-SOKAK ve SB2-BORSA kareleri kullanıcı sorusu üzerine denetlendi. Sonuçlar ve motion uygulama listesi **bölüm 9**'da. 3.1 (BORSA) ve 3.3 (SOKAK-BORDEAUX) kartları bu bölümle birlikte okunur; çakışırsa bölüm 9 geçerli. CLAUDE.md'ye eklenen "Her nesnenin yeri anlamlı", "Ölü alan yok", "Küçük jest = yakın kamera" kuralları uygulandı.

## 0. Bu belge tasarim.md'yi nerede değiştiriyor

Tasarımcının kartları temel alındı. Aşağıdakiler dönem doğrulaması, güncel sahne planı ve dokunuş revizyonu nedeniyle **değişti**. Gerekçeler ilgili kartta.

| # | tasarim.md | Bu belge | Gerekçe |
|---|---|---|---|
| 1 | Kule direği ve kollar siyah | **Direk gök mavisi** `#8fa9c4`, **kollar siyah**, **karşı ağırlıklar gri** `#8b8d8c`, kanatlar **sabit jaluzili** | [D kesin]. Siluet planlarında (P22, P17 penceresi) renk okunmaz, sorun yok |
| 2 | Bordeaux kulesi "sağ uzak tepede" bağımsız kule | **Saint-Michel çan kulesi + tepesinde Chappe** (P06, P14; P04'te uzak siluet) | [D kesin]. Ayrıca 1830'larda bu kulenin **sivri külahı yoktu** (1768 kasırgası, 1860'larda yeniden yapıldı) **[G ◐ doğrulanmalı]**. Kesik tepeli çizilir. Notre-Dame kuralının Bordeaux karşılığı |
| 3 | Dürbün elde, pervaza dayalı (P12, P13) | Kulede **iki pirinç dürbün, ahşap kutuya sabit** (biri önceki, biri sonraki kuleye); göz dayanır | [D kesin]. P14'te suç ortağının teleskopu kendi aleti, pervaza **kurulu** (yaratıcı yönetmen v2.1) |
| 4 | Manipülatör pencere tezgâhında, "kol çevirme" | Manipülatör **pencere A önünde**, tavandan inen **iki kablo + makara** ile dışarıdaki kollara bağlı; jest **itme/çekme** | [D kesin]. Kablo tavana ve dışarı giden bir makara hattına bağlanır (bkz. 3.4) |
| 5 | Bordeaux çatıları %60 arduvaz / %40 tuile canal | **%70 tuile canal, %30 arduvaz**, düşük eğim (~%33); sokaktan çatı **az görünür** | [D olası] |
| 6 | Bordeaux taşı "krem, pierre blonde" | **Sarımsı, gözenekli kireçtaşı (calcaire à astéries)**, bal tonuna yakın; "pierre blonde" adı belgede iddia olarak kullanılmaz | [D olası] |
| 7 | Tuffeau tek ton `#e3dcc6` | Tuffeau **beyaz ana ton + sarı ve gri lekeler**, tebeşirimsi | [D olası] |
| 8 | Mahkeme: tokmak varsayılan, tricolore + kral büstü | **Tokmak yok.** Başkan masası: yeşil çuha, **iple bağlı ciltli dosya**, karar kâğıdı. Arka duvar **boş lambri** + saat. Cübbe tek koyu ton | [D bulunamadı] + yaratıcı yönetmen v2.1 (P19 dosya kapağı TOK) |
| 9 | P15 sağ-üst takvim bloğu | **Takvim yok.** Louis'nin pupitr üstündeki defteri y 540–840 | [D bulunamadı] + yaratıcı yönetmen v2.1 |
| 10 | Posta arabası: kahve üst / krem alt, raster `araba-yesil.png` | Üst gövde **gri-puce** `#6b5a60` [D olası], **arma yok**, levhada yalnız "POSTES"; vektörle yeniden çizilir | [D] + stil bütünlüğü (raster resim vektör dünyada tek yabancı yüzey) |
| 11 | P01 "alacakaranlık" | **Geç gün ışığı** (güneş batmadan önceki son 20 dk) | Telgraf gece ve siste çalışmaz [D olası, Universalis özeti]. Kol oynuyorsa gök hâlâ aydınlık olmalı |
| 12 | Tours kulübesi zemin `#2d2a2c` (taş) | **Ahşap döşeme**: oda kulenin **üst katı** | [D kesin: çalışma odası üst katta, altında dinlenme odası] |
| 13 | "Garonne'da buharlı gemi yok" iddiası | İddia kaldırıldı; **yine de vapur çizilmez** (yalnız yelkenli direkleri) | [D olası: küçük vapurlar vardı]. Çizmemek hata üretmez, çizmek sorun açar |

---

## 1. Ortak doku sistemi (malzeme kütüphanesi)

### 1.1 İlke: "el yapımı arşiv vektörü"

Kanalın dili: vektör kukla + arşiv dosyası (eskimiş kâğıt `#e9dfc9`, mürekkep `#1c1915`, mühür kırmızısı `#b3261e`, altın `#b8862b`). Mekânlar **fotoğraf değil, kesilip boyanmış kâğıt ve mürekkep**: düz renk alanları, 2–3 tonlu gölgelendirme, el titremesi olan kontur, sabit kâğıt lifi, ince gren.

Beş kural (tüm mekânlarda aynı):
1. **Stil sabit, ışık değişken.** Mekânları birbirinden ayıran şey şehir (taş, çatı, nehir) ve ışık. Çizgi ailesi, gren, kâğıt katmanı ve kontur titremesi her planda aynı.
2. **Doku kaynamaz.** Her yüzey dokusunun `seed`i sabittir ve mekân sabitinden türer (`DOKU_SEED.tours = 23` vb.). Kare kare değişen tek şey **ışık katmanı** (mum titremesi, huzme nefesi, réverbère salınımı) ve gren ofseti.
3. **Saf siyah ve saf beyaz yok.** En koyu `#14110d`, en açık `#f4ecd8`. Son derecelendirme katmanı bunu zorlar (1.4).
4. **Doku ölçekle değişmez, mesafeyle sadeleşir.** Uzak katmanda doku yoğunluğu ×0.4, orta ×0.7, yakın ×1.0, insert ×1.2 (opaklık çarpanı). Uzak yüzeyler düz renk ve hava perspektifi ile okunur.
5. **Her yüzey en fazla üç doku katmanı taşır:** (a) taban desen (blok, damar, sıra), (b) gürültü (gözenek, lif), (c) kullanım izi (aşınma, leke, yağmur izi). Dördüncü katman ışıktır.

### 1.2 Ortak katmanlar ve sayısal değerler

| Katman | Değer | Kod yöntemi |
|---|---|---|
| **Kontur ailesi** | Karakter/prop: rig `SW = 2` (yerel birim). Dekor: uzak **3 px**, orta **4 px**, yakın **6 px**, insert **8 px**. Renk `ink(fill)` = dolgu renginin HSL L ×0.45, S ×0.8 (asla `#000`). `strokeLinejoin="round"`, `strokeLinecap="round"` | Yardımcı `kontur(derinlik)` + `ink(hex)` |
| **Kontur titremesi** (el çizimi) | `feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="2" seed={mekânSeed}` → `feDisplacementMap scale` uzak **1.2**, orta **2.0**, yakın **2.6**, insert **3.0** | Katman grubuna bir kez uygulanır (her nesneye değil). Seed sabit: kontur kaynamaz |
| **Kâğıt lifi üst katmanı** | Tek sabit görsel `public/doku/kagit-lif.png` (1080×1920, bir kez üretilir): `feTurbulence fractalNoise baseFrequency="0.004 0.045" numOctaves=3 seed=7` (yatay lif) + `baseFrequency=0.9 numOctaves=2 seed=8` α .5, gri tonlu. Uygulama: `mix-blend-mode: multiply`, opaklık **gündüz .12 / gece .08 / harita .18** | Bir kez pişirilir, her planda aynı dosya. Kanal kimliği (her bölümde aynı) |
| **Gren** | Sabit 512×512 gürültü karosu `public/doku/gren-512.png` (`fractalNoise 0.85`, 3 oktav, seed 11, desatüre). `overlay`, opaklık **gündüz .08 / gece .12**. Hareket: 8 sabit ofset listesinden her **4 karede** (60 fps'te 15 Hz) bir sonrakine geçilir | Mevcut `FilmLook` her karede yeni seed üretiyor (`seed={frame % 10}`): doku "kaynar" ve her kare filtre yeniden hesaplanır (swangle'da yavaş). Karo + ofset hem sabit hem ucuz |
| **Vinyet** | Radyal: %55'te şeffaf → kenarda gündüz `rgba(40,24,8,.42)`, gece `rgba(6,6,14,.58)`. Siyah değil, **sıcak kahve** (arşiv) | `FilmLook`'taki saf siyah vinyetin yerine |
| **Kenar sararması** (yalnız kâğıt-dünya planları: P03, P05, P10, P20, P23) | Çerçeve kenarından 120 px içe `#8a6a3a` α .14 multiply | Degrade |
| **Derecelendirme** | Son katman `feColorMatrix`: doygunluk **0.86**; siyah nokta `#14110d`; beyaz nokta `#f4ecd8`; gölgelere `#1b2236` α .06 (soğuk), ışıklara `#ffe2a8` α .04 (sıcak) | Tek `ArsivKatmani` bileşeni (1.5) |

**Performans notu (motion):** SVG filtreleri (turbulence, displacement) her karede yeniden hesaplanır. Statik mekân katmanları (duvar, zemin, çatı, uzak manzara) **plan başına bir kez PNG'ye pişirilir** (`npx remotion still`, kamera yaklaşmasına göre 1.0× ya da 1.5× çözünürlükte, ör. P21 `cs 1.35` için 1620×2880) ve `<Img>` olarak kullanılır. Canlı kalanlar: karakterler, hareketli prop'lar, ışık katmanı. P22 morfu ve P14 odak kayması canlı vektördür. Pişirme tasarımı değiştirmez, aynı SVG'nin donmuş hâlidir.

**Filtre kimliği notu:** `Paper.tsx` (`id="grain"`) ve `FilmLook` (`id="fg"`) sabit id kullanıyor; aynı karede iki kopya olursa çakışır. Yeni modüller id'yi `useId()` ya da mekân önekiyle üretmeli.

### 1.3 Malzeme kütüphanesi

Ölçek varsayımı: yakın katmanda **1 m ≈ 300 px**. Parametreler yakın katman içindir; uzak katmanda 1.1 kural 4 uygulanır.

| Kod | Malzeme | Taban renk(ler) | Doku tarifi | Kod yöntemi ve parametre |
|---|---|---|---|---|
| **TAS-BDX** | Bordeaux kireçtaşı (calcaire à astéries, sarımsı, gözenekli) [D olası] | ışık `#d6bf8e`, orta `#bfa676`, gölge `#8f774f`, derz `#7e6846` | Kesme blok (ashlar) 60×30 cm, ince derz. Blok başına ton farkı. Gözenekli yüzey. Kornişlerin ve pencere altlıklarının altında **dikey yağmur izi** (kararmış şerit). Köşelerde hafif aşınma. 18. yy cephelerde kilit taşında **maskaron** [G] | Taban: `<pattern>` 180×90 px blok, derz 1.5 px `#7e6846` α .55, her blok `random(seed+i)` ile L ±%4. Gözenek: `fractalNoise bf=0.9 oct=2 seed=11` → `feComponentTransfer` α `0 .16`, multiply. Yağmur izi: korniş altına 8–20 px genişlik, 120–320 px boy degrade şerit `#6e5c40` α .15→0. Kenar: blok `rx 3` + titreme |
| **TUFFEAU** | Loire tuffeau (Tours) [D olası] | beyaz `#e6e0cc`, sarı leke `#dccaa0`, gri leke `#b9b7ad`, harç `#cfc6ab`, gölge `#a39b84` | Tebeşirimsi, mat, yumuşak. Blok iri (60×35 cm) ama derz **açık renkli ve kalın** (kireç harcı). Duvar dibinde 40–80 cm **nem bandı**; alt sıralarda **petekleşme** (alvéolisation: küçük oyuk kümeleri) [G]. Yüzeyde büyük, yumuşak sarı/gri bulutlanma | Taban: `<pattern>` 180×105 px, derz 3 px `#cfc6ab` α .8 + iç gölge 1 px `#a39b84` α .3. Bulutlanma: `fractalNoise bf=0.012 oct=3 seed=23` α `0 .14`, iki renkli (sarı/gri) `feColorMatrix`. İnce gren `bf=1.2` α .07. Nem bandı: zeminden 160 px degrade `#9a927c` α .22→0. Petek: alt %20'de 20–40 küçük elips (r 2–5 px) `#b5ad94` α .35, seed sabit |
| **TAS-PARIS** | Paris kireçtaşı + alçı sıva (plâtre) [G] | taş `#c9c2b2`, sıva `#bdb6a8`, gölge `#8a8478`, derz `#a29b8c` | Gri-bej, **soğuk**. Cepheler çoğunlukla **sıvalı**; kesme taş yalnız köşe taşlarında, kapı/pencere sövelerinde. Sıvada yatay is lekeleri (baca isi), kat silmesi | Sıva: Sokak.tsx `#siva` filtresi (`bf="0.035 0.06" oct=3 seed=4`, α `0 .35`) aynen. Köşe taşı: dönüşümlü uzun/kısa blok (Sokak `quoin` mantığı). İs: üst katlarda yatay `fractalNoise bf="0.002 0.02"` α .1 koyu |
| **SIVA** | Kireç sıva / badana (iç mekân) | Tours iç `#e2dccb`, Bordeaux çatı katı `#cbbd9e`, yatak odası `#b8ad96` | Kabarma (açık lekeler), dökülme (alttan taş görünen 1–2 yama), köşelerde kir | `#siva` filtresi + 3–6 düzensiz poligon `#ffffff` α .08 (kabarma) + 1–2 yama: clipPath içinde ilgili TAS deseni, kenarı titrek, iç gölge 2 px |
| **AHSAP-MESE** | Meşe (kiriş, masa, kapı, pervaz) | açık `#a07848`, orta `#7a5230`, koyu `#3b2818` | Damar **parçanın uzun ekseni boyunca**. 400 px başına 0–1 budak. Ellerin değdiği kenarlarda **cila aşınması** (açık). Kirişlerde balta izi (kısa yatay çizik) | Damar: `<pattern>` içinde `sin` tabanlı 6–8 dalgalı yol, aralık 9 px, genlik 3 px, kontur `ink` α .22, `patternTransform rotate(yön)`. Budak: iç içe 3 elips (8/14/22 px) α .3. Aşınma: kenara 18 px degrade `#c49a68` α .3. Pah: üst kenar 2 px `#c9a070` α .5 |
| **AHSAP-CEVIZ** | Ceviz (lambri, kürsü, çekmece, pulpitr, kitap sırtı yok) | `#5b3d25`, koyu `#3b2818`, vurgu `#7a5532` | Damar ince ve sık. Cilalı: pencereye bakan dikey yüzeylerde yumuşak **parlama şeridi** | Damar aralık 6 px α .15. Parlama: panel başına 1 dikey şerit (genişlik %18) `#c9a070` α .12, ışık tarafında. Panel ritmi: çerçeve 14 px + iç panel pahı |
| **AHSAP-DOSEME** | Çam döşeme | `#5a4630`, derz `#3b2c1c` | Tahta 18 cm (≈54 px), uçlarda 2 çivi başı, ayak yollarında aşınma (açık) | Perspektifte kaçış noktasına giden derzler, tahta başına L ±%5, çivi `#2a2016` r 2 |
| **AHSAP-BOYALI** | Boyalı ahşap: **Chappe direği gök mavisi** [D kesin], kapı/panjur yeşili | direk `#8fa9c4` / gölge `#5f7a96` / aşınma `#7a5a3c`; panjur `#2f4a40` | Boya kat kalınlığı, damar yönünde kısa çatlaklar, kenarlarda boyanın kalkıp ahşabın görünmesi | Düz renk + damar yönünde 4–10 px kısa çizgi `ink` α .2; kenarlarda 2–6 px düzensiz `#7a5a3c` yamalar. Uzakta (siluet) düz renk |
| **JALUZI** | Chappe kolları: meşe çerçeve, **sabit** çam lameller, siyah boya; karşı ağırlık gri [D kesin] | kol `#1c1915`, kenar ışığı `#5a5a62`, karşı ağırlık `#8b8d8c` | Çerçeve içinde 45° eğik **sabit lameller**; yakın planda lamel aralarından **gök görünür** (kol "dolu" değil) | Yakın (P01, P13, P21): lameller ayrı çokgen, aralık = arka plan (maske ile delik). Orta: 5 çizgi α .25 (tasarim.md). Uzak: dolu siluet. Oran: regülatör uzunluğu / gösterge uzunluğu = **2.3** [D: 4.6 m / 2 m] |
| **ARDUVAZ** | Arduvaz (Paris mansard; Tours [G ◐]; Bordeaux azınlık) | `#3c4660`, koyu `#2c3550`, ışık `#6a7896`, ıslak `#8a98b6` | Pullu sıralar, sıra başına yarım kaydırma, her pul ton farklı; mahyada çinko/kurşun çizgi | `<pattern>` pul 22×30 px `rx 2`, sıra kaydırma 11 px, pul başına L ±%6. Sıra çizgisi 1.5 px `#1c2236`. Mahya 2.5 px `#a9b8e6` α .6 (Sokak mevcut) |
| **TUILE-CANAL** | Oluklu Roma kiremidi (Bordeaux ağırlıklı) [D olası] | `#a8603e`, orta `#8a4a30`, oluk gölgesi `#5e2e1e`, liken `#8a8a5a` | Dışbükey/içbükey sıralar dönüşümlü (açık sırt, koyu oluk), sıralar **dalgalı ve düzensiz**; düşük eğim; yaşlı kiremitlerde liken lekeleri | `<pattern>` 34 px periyot: 17 px dışbükey (üst kenarda 2 px ışık `#c98a62`) + 17 px oluk (`#5e2e1e` α .7). Sıra başına L ±%8. Titreme `scale 3` (düzensiz sıralar). Liken: `fractalNoise bf=0.05` eşikli lekeler α .25 |
| **CINKO** | Çinko (Bordeaux teras, mansard kenarı) | `#8a8f98`, ışık `#b8bec8` | Donuk, 60 cm aralıklı dikiş çıtaları | Düz renk + dikiş çizgisi 3 px `#6a6f78` + 1 px ışık |
| **DEMIR** | Dövme demir (sürgü, çivi, balkon, yatak, ızgara) | `#1c1915`, pas `#6a3a22` | Dövme izi (hafif kalınlık değişimi), birleşimlerde pas | Kontur kalınlığı ±%15 titreme. Pas: birleşimlerde 4–8 px leke α .4. Kenar ışığı tek taraf 1 px (gece `#9fb3ea`, gündüz `#c9b8a0`) |
| **PIRINC** | Pirinç (şamdan, dürbün, çekmece halkası, saat çerçevesi) | `#c9a24a`, ışık `#f1d48a`, koyu `#7a5a1f` | **Tek parlama noktası** kuralı: her pirinç nesnede bir yumuşak beyazımsı leke, anahtar ışığa bakan tarafta. Kenarlarda koyu patina | 3 tonlu dolgu (koyu/orta/ışık şerit) + parlama elipsi `#fff4c0` α .8 blur 2 px. Parlama ışık kaynağı hareket edince kayar (ışık katmanı), doku kaymaz |
| **CAM-ESKI** | Dalgalı eski cam, küçük kare camlar | cam tonu `#9fb0c0` α .15 | Arkadaki görüntü **hafif dalgalı** bozulur; cam başına ton farkı; çapraz yansıma şeridi; birkaç hava kabarcığı | Pencere dışı katmana `fractalNoise bf="0.008 0.03" oct=1 seed=31` → `feDisplacementMap scale=6`. Cam başına `#ffffff` α .03–.06. Yansıma: 45° şerit α .10. Kabarcık: 3–5 nokta r 1.5 |
| **KAGIT-PAKET** | Kahverengi paket kâğıdı + kenevir ip | `#b08a5a`, kıvrım ışığı `#d0ab78`, gölge `#7e5e38`, ip `#d8c9a0` | Uzun lifler, katlama kırışıkları (ışık-gölge çifti), kenarlarda hafif yırtık | Lif: `fractalNoise bf="0.01 0.25"` α .12. Kırışık: 1 px açık + 1 px koyu yan yana. İp: 3 px + 1 px ışık, bükülme her 10 px kısa eğik çizgi |
| **KAGIT-ARSIV** | Parşömen, ilan, defter, kanun sayfası | `#e9dfc9`, `#efe9d8` (ilan), kenar `#d6c7a6`, mürekkep `#2b1d10` | Lif + leke (foxing: küçük kahve noktalar) + kenar sararması; mürekkep hafif dağılmış | Lif üst katmanla aynı. Foxing: 6–12 nokta r 2–6 `#a07a48` α .2. Mürekkep: `feGaussianBlur 0.4` + α .9 |
| **KUMAS-YUN** | Yün (çorap, battaniye, atkı) | çorap `#4b3a2c`, battaniye `#6b5a4a` | Örgü dokusu (küçük V'ler), kabarık kenar | `<pattern>` 8 px V zinciri α .25. Kenar: titreme `scale 2.5` + 2–3 px kısa tüy çizgileri |
| **KUMAS-KETEN** | Keten (çarşaf, gömlek, bluz) | `#d8d0bb` | Çok ince çapraz örgü, yumuşak kırışık | `<pattern>` 4 px çapraz α .07; kırışık: 2–4 kavisli çizgi α .2 |
| **KUMAS-CUHA** | Yeşil çuha (mahkeme ve yargıç masası) | `#2f4a40`, ışık `#46665a`, kenar `#22362f` | Hav dokusu (mat, ışığı yutar), masa kenarında daha koyu | `fractalNoise bf=1.5 oct=1` α .1; kenarda 20 px koyu degrade |
| **DERI** | Deri (eldiven, kese, çizme, kitap cildi, dosya) | eldiven `#f4efe2`, cilt `#5a3a22`, kese `#3e3426`, çizme `#2a1d14` | Pürüzsüz; eklem yerlerinde 2–3 kavisli kırışık; tek yumuşak parlama | Düz renk + kırışık çizgileri `ink` α .3 + parlama α .25. Eldiven dikişi 3 çizgi `#b9ad92` (tasarim.md) |
| **BALMUMU** | Kırmızı mühür mumu (P05 harita, P21 ilan) | `#b3261e`, iç gölge `#7a1914`, kenar `#e5483c` α .5 | Kenara taşmış düzensiz dil, baskı motifi (Chappe T) kabartma | Taşma: titreme `scale 6`. Kabartma: motif 1 px ışık + 1 px gölge ofset |
| **KALDIRIM-ISLAK** | Islak taş kaldırım (Bordeaux gece) | taş `rgb(48–70)` mavi kaymalı (Sokak mevcut) | Taş başına ton; **ışık altında dikey uzamış yansıma**; 3–5 **su birikintisi** (gök ve fener renginde ayna); birikinti kenarında 1 px parlak çizgi | Mevcut `Zemin` + yansımalar korunur. Birikinti: düzensiz poligon (z 1.4–3.0), dolgu = yansıyan kaynağın rengi, `feDisplacementMap scale 4` sabit seed (dalga **donuk**: yalnız fare geçerken yerel halka), kenar `#c4d6ff` α .35 |
| **KALDIRIM-KURU** | Avlu taşı (Paris), teras | `#6a6458`, `#4a463e`, toz `#8a8270` | Daha iri kare taş, derzlerde toz, at arabası tekerlek izi (iki koyu paralel şerit) | Kare grid + L ±%6, derz 3 px `#3a362e`, tekerlek izi α .15 |
| **OVA** | Düz ova (Touraine/Poitou) [G] | yakın `#9aa06a`, uzak `#b9bc94`, kavak `#5a6a44` | Tarla şeritleri, kavak dizileri; uzaklaştıkça göğe karışır | Düz bantlar; bant başına göğe doğru %12 karışım (hava perspektifi). Kavak: dikey kesik elips siluetleri |
| **GOK-BULUT** | Gök ve bulut | plan paletinden | Gündüz bulutları **kâğıt kesme** (2 tonlu düz şekil, alt kenarda gölge, blur ≤ 4 px). Gece bulutları ve sis **bulanık** (hacim) | Gece: mevcut `Clouds`, `Fog`. Gündüz: yeni `KesmeBulut` (düz yol + alt gölge şeridi). Bulut hızı ≤ 0.3 px/kare |
| **SIS-TOZ** | Sis (P04), toz huzmesi (P18–P20) | sis `#8b93ad` (P03 tozu ile aynı), toz `#fff1c8` | Sis üç düzlem; toz zerresi yalnız huzme içinde görünür | Sis: mevcut. Toz: `Dust` sabit seed, yalnız huzme maskesi içinde (maske = huzme çokgeni) |

### 1.4 Işık katmanı (animasyonlu tek katman)

| Kaynak | Renk | Davranış | Kod |
|---|---|---|---|
| Mum | alev `#ffcf70`, hale `#ff9a40` | Titreme genliği ±%8, iki sinüs + 3 karede bir rastgele (mevcut `Glow`) | `Glow strength .55`, gölgeler ışıkla **±2 px** kayar (gölge katmanı da ışık katmanına bağlı) |
| Fener (kare camlı) | `#ffb357` | Mumdan daha sakin (±%4); 4 cam yüzün çerçevesi masaya **kafesli gölge** düşürür | Kafes gölgesi sabit çokgen, ışık şiddetiyle opaklık |
| Réverbère | `#ffb357` / `#ffd98f` | İpte salınım (mevcut `reverbere()`), yansıması aynı fazla kayar | Mevcut |
| Ay | kenar `#c4d6ff` | Sabit | Rig `RIM` |
| Güneş/gün | plana göre | Sabit; yalnız huzme ±%3 "nefes" (0.25 Hz) | `Huzme` |
| Pencere dolgusu | plana göre | Sabit | Gradyan |

**Gölge yönü sözleşmesi:** her kartta "anahtar ışık → gölge yönü" verildi. Karakter temas gölgesi: elips, genişlik = ayak aralığı ×1.4, opaklık .35 (gündüz) / .5 (gece), anahtar ışığın tersine 0.15× boy kadar uzar.

### 1.5 Motion'ın yazacağı ortak modüller (öneri: `src/doku/`)

```ts
// src/doku/sabitler.ts
export const DOKU_SEED = { borsa: 101, harita: 7, sokakBdx: 4, tours: 23, kule: 37, paris: 53, catiBdx: 61, catiKati: 67, yatak: 71, mahkeme: 83, kanun: 89, wifi: 97 };
export const KONTUR = { uzak: 3, orta: 4, yakin: 6, insert: 8 };
export const TITREME = { uzak: 1.2, orta: 2.0, yakin: 2.6, insert: 3.0 };
export const ink: (hex: string) => string;                     // L×0.45, S×0.8
export type Derinlik = "uzak" | "orta" | "yakin" | "insert";

// <DokuTanimlari> : bir mekânın tüm <filter>/<pattern> tanımlarını tek <defs> içinde üretir; id'ler `${mekan}-${ad}` önekli
<DokuTanimlari mekan="tours" malzemeler={["TUFFEAU","AHSAP-MESE","AHSAP-DOSEME","CAM-ESKI","PIRINC"]} />

<TasDuvar tip="bdx" | "tuffeau" | "paris" sekil={points} blok={[180,105]} isik="sol-ust" derinlik="yakin"
          yagmurIzi={[{x,y,boy}]} nemBandi={160} petek={0.2} seed={DOKU_SEED.tours} />
<SivaYuzey sekil renk kabarma={4} dokulme={[{points, alt:"tuffeau"}]} seed />
<AhsapYuzey tur="mese" | "ceviz" | "doseme" | "boyali" sekil yon={0} asinma={[{x,y,r}]} budak={1} boya?="#8fa9c4" seed />
<CatiOrtusu tip="arduvaz" | "tuileCanal" | "cinko" dortgen={[A,B,C,D]} egim={0.33} likenli seed />
<PencereEskiCam x y w h kayit={[2,3]} dalga={6} yansima={0.1} acik={0 | 1} kanat="sol"> {disGorunum} </PencereEskiCam>
<KagitYuzey tip="paket" | "arsiv" | "ilan" sekil kirisik={[[x1,y1,x2,y2]]} sararma={0.3} foxing={8} seed />
<Kumas tip="yun" | "keten" | "cuha" sekil seed />
<MetalVurgu tip="pirinc" | "demir" sekil isik={{x,y}} />          // tek parlama noktası; ışık hareket edince kayar
<IslakKaldirim isiklar={[{x,y,renk,salinim}]} birikinti={[...]} seed />
<IsikKatmani kaynaklar={[{tip:"mum"|"fener"|"reverbere"|"pencere"|"gunes", x, y, r, renk, titreme}]} golgeler={[...]} />
<Huzme baslangic={[x,y]} aci={28} genislik={[a,b]} renk="#fff1c8" alfa={0.22} toz={{sayi:30, seed}} nefes={0.03} />
<KonturTitreme derinlik="orta" seed>{children}</KonturTitreme>
<KesmeBulut x y w ton="#e8dcc4" golge="#b9a98a" />
<ArsivKatmani mod="gunduz" | "gece" | "kagit" />                  // kâğıt lifi + gren karosu + vinyet + derecelendirme; FilmLook'un yerine
<ChappeKule konum="ILK" | "SAK" | "MESAJ" | "HATA" | "DINLEN" | {reg, sol, sag}
            bina="kulube" | "kare-kule" | "saintMichel" | "yok" detay="yakin" | "orta" | "siluet"
            direkRenk="#8fa9c4" kolRenk="#1c1915" karsiAgirlik="#8b8d8c" klak={kareNo} />
<SaintMichel kesikTepe detay="siluet" | "orta" chappe={ChappeKuleProps} />
<DurbunKutusu yon={-1 | 1} uzunluk={260} />                      // ahşap kutuya sabit pirinç tüp
<Manipulator konum isik kablolar={["tavan","pencere"]} />          // minyatür T + iki tutamak + kablo/makara
<PostaArabasi olcek renk="#6b5a60" etiket="TOURS" atBasi="ayri" /> // vektör; harita ikonu ve P09 aynı çizim
```

`ChappeKule` mevcut `ChappeTower.tsx`'ten türer; değişiklikler: göstergeler kırmızı değil siyah (`C.red` yalnız "fazladan çentik" halosunda), direk mavi, oran 2.3:1, jaluzi lamelleri, karşı ağırlıklar, direk dibinde iki payanda, bina varyantları. `ChappeTower` dokunulmadan kalabilir (haritada kullanılıyor), yeni bileşen yanına yazılır.

---

## 2. Şehir ayrışması: ilk karede Bordeaux / Tours / Paris

Kural: izleyici ses kapalıyken **ilk 0.5 sn'de** hangi şehirde olduğunu taşın rengi, çatının şekli ve ışığın sıcaklığından anlamalı. Yazı (ÜST-BANT) bunu doğrular, yerine geçmez.

| | **Bordeaux** (P02, P04, P06, P14, P15 üst) | **Tours** (P01, P07, P08, P10, P11, P15 alt, P16–P21) | **Paris** (P09; P23 bilinçli istisna) |
|---|---|---|---|
| Taş | Sarımsı-bal kireçtaşı **TAS-BDX** `#d6bf8e`, kesme blok, maskaron, dövme demir balkon | Beyaz tebeşirimsi **TUFFEAU** `#e6e0cc`, kalın açık derz, nem bandı | Gri-bej sıva **TAS-PARIS** `#bdb6a8`, köşe taşı, is lekesi |
| Çatı | **Tuile canal** turuncu-kırmızı, düşük eğim, dalgalı sıralar; sokaktan az görünür | Koyu mavi-gri **arduvaz**, dik çatı, çatı penceresi [G ◐] | Arduvaz **mansard** + çinko, sık **baca kümeleri** |
| Nehir / ufuk | Garonne: **yelkenli direkleri**, Pont de pierre (1822), **külahsız Saint-Michel kulesi + Chappe** | Düz ova, kavaklar, tepede **tek mavi direkli Chappe kulübesi** | Ufuk görünmez: avlu kapalı, gök şeridi dar |
| Işık | **Sıcak altın** (gündüz), mavi ay + amber (gece). Güney ışığı: sert gölge, yüksek doygunluk | **Süt beyazı yumuşak gündüz**, içeride tek amber kaynak (mum/fener), dışarıda soğuk mavi | **Gümüş bulutlu**, gölgesiz denecek kadar yumuşak, en düşük doygunluk |
| Renk sıcaklığı | +2 / +3 | içeride +1 (yerel) / −2 (ortam); dışarıda 0 / −1 | −1 |
| Imza siluet | Gemi direkleri + kesik tepeli çan kulesi | Mavi direk + siyah T, tuffeau kulübe | Mansard + baca kümesi + kemerli araba kapısı |
| Baskın şekil | Yatay (Garonne, rıhtım, uzun cepheler) ve kalabalık | Dikey (direk, kiriş arası, dar pencere) ve boşluk | Kapalı kare (avlu) |

**İstisna, P23 (PARIS-MASA):** P01'in plakasıyla **birebir aynı** (döngü). Şehri gri manşet + altın düğme anlatır. Gerekçe: döngünün kusursuz eşleşmesi şehir ayrışmasından değerli; P23 bir "yer" değil, "sırrın başa dönüşü". Yönetmen ve tasarımcı kararı korunur.

**Mood 04'teki Paris paneli kullanılmaz:** üretilen görsel Haussmann tipi sürekli balkonlu cephe çizdi (1850 sonrası). Paris için yön: dar, farklı yükseklikte, sıvalı, mansardlı bitişik evler (CLAUDE.md dönem listesi).

---

## 3. Mekân kartları

Her kart: duygusal amaç · görsel dil · kompozisyon (9:16, güvenli alan) · katmanlar ve perspektif · malzeme-doku tablosu · palet ve ışık · dönem/şehir · dokunuş ve eylem yüzeyleri · motion notları.
Güvenli alan (1080×1920): üst 220 px ve alt 420 px'te **küçük ayrıntı yok** (yalnız gök, duvar, zemin, düz yüzey). Yazı bantları: ÜST y 240–400, ALT y 1290–1490. Kilit anlar y 420–1290.

### 3.1 BORSA (P02) · Bordeaux, gündüz öğle

**Duygusal amaç:** Altın bir kovan: herkes aynı şeyi istiyor, bu kalabalıkta öne geçmenin tek yolu bilgi.

**Görsel dil:** baskın şekil **dikey** (sütun ve kemerli pencere), ritim **3+1** (üç pencere aralığı, sonra tahta), renk sıcaklığı **+3** (filmin en sıcak ve en parlak planı, APL ~%62), kontrast **orta** (güneş huzmesi var ama gölgeler bal rengi, siyaha düşmez). Boşluk yok: kalabalık kadrajı doldurur, tek boş alan tebeşir parçasının düştüğü estrad önü.

**Kompozisyon:** ufuk / göz hizası **y 880** (kamera ~1.6 m, ayakta göz seviyesi: tüm şapka tepeleri ufuğa yakın, klasik kalabalık düzeni). Kaçış noktası (540, 880). Tahta x 300–780, y 400–760 (başlığı "PARIS · RENTE 3%" y ~430: P03 MATCH). Üst 220 px: kemerlerin üst kısmı, düz taş. Alt 420 px: dama zemin ve ön plan bulanık siluetler (ayrıntısız).

**Katmanlar**
1. Arka duvar: TAS-BDX iç cephe, iyonik pilastrlar, **üç kemerli pencere solda** (x 60–280 arası perspektifli), tahta ortada, sağ pilastrda **rüzgâr kadranı** (x 830–960, y 440–570, r 65; Palais de la Bourse'taki 1750 tarihli rüzgâr yönü kadranı [D olası]: tüccarlar gemi gelişini tahmin ederdi; "önce bilmek" temasının sessiz yankısı, düşük kontrast, dokunuşla yarışmaz). Tahta önünde iki basamaklı ahşap estrad, merdiveni sol-arkada.
2. Orta: kalabalık (10–12 siluet, 3 animasyonlu), François, tüccar, Louis.
3. Ön: sol altta sütun gövdesi (bulanık, x 0–120), sağ altta pupitr (Louis'nin defteri), ahşap korkuluk.

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Duvar, pilastr | TAS-BDX | blok + gözenek + pencere altlığı altında yağmur izi **yok** (iç mekân); onun yerine pilastr diplerinde ayak izi kiri | blok 180×90, gözenek α .12 (iç mekân yumuşak) |
| Kemer pencere | CAM-ESKI | dışarısı aşırı pozlanmış sıcak beyaz `#fff1c8`; dalga 6 | camlar α .9 parlak, kayıtlar `#5b3d25` |
| Zemin | taş dama `#cbbd9c` / `#8b7b5c` | kare 60 cm, aşınmış yol (tahta önü daha açık) | perspektif grid; aşınma α .15 |
| Fiyat tahtası | kara tahta `#1f2a26` | eski silinmiş rakam gölgeleri (palimpsest), tebeşir tozu alt kenarda | silinti: 6–10 rakam şekli `#f3eddc` α .06; toz bandı 20 px α .2 |
| Estrad, korkuluk, pupitr | AHSAP-MESE | ayakların değdiği basamak kenarı aşınmış | aşınma α .3 |
| Rüzgâr kadranı | pirinç ibre + boyalı kadran `#e9dfc9` | yalnız ibre ve 4 yön çizgisi, harf yok | PIRINC tek parlama |

**Palet:** duvar `#d6bf8e` / gölge `#a58f68` / pilastr vurgu `#efe2bd` · zemin `#cbbd9c`/`#8b7b5c` · korkuluk `#5b3d25` · tahta `#1f2a26` · tebeşir `#f3eddc` · huzme `#ffd98f` α .18 · kalabalık `#5a4a3c` (yakın) → `#9a8a74` (uzak).
**Işık:** güneş sol-üstten kemerli pencerelerden, huzmeler **30° sağ-aşağı**; gölgeler **sağ-aşağı, kısa**. Dolgu: sıcak taştan seken ışık (gölgeler bal rengi `#8f774f`, asla gri). François ve Louis ışığa döner (`facing −1`).

**Dönem/şehir:** Palais de la Bourse 1749'dan beri tüccar borsası [D]; 1830'larda iç düzen ve fiyat ilan biçimi **bulunamadı** [D] → belirli bina kopyalanmaz, "genel neoklasik borsa iç mekânı". Avlu 1830'larda açık olabilir [D olası]; bu belge salon olarak çizer ([T], güneş huzmesi için). Tebeşirli tahta **dramatizasyon** [S]; açıklamaya not. "Place Royale" adı kullanılmaz (koordinatör notu). Kâğıt para yok.

**Dokunuş ve eylem yüzeyleri:** tebeşirin kırıldığı **tahta yüzeyi** (katip z 5.5, u 0.50; tahtanın sağ-alt çeyreği), parçanın sektiği **estrad basamağı** (iki sekme noktası: estrad üst kenar, sonra zemin; z 5.2) ve **zemin dama karesi** (boş tutulur, kimse durmaz). Louis'nin kalem ucu: **pupitr defter yüzeyi** (z 2.3, u 0.62, yüzey yüksekliği bel hizası).

**Motion notları:** yeni arka plan, pişirilmiş plaka (`cs 1.18`'e kadar → 1.25× çözünürlük). Kalabalık Kukla + siluet filtresi. `Huzme` ×3, `Dust` (huzme içinde). Dolly-in sırasında ön plan sütunu 1.3× parallaks.

---

### 3.2 HARITA (P03, P05) · kâğıt ve mürekkep dünyası

**Duygusal amaç:** Fransa bir masa üstü: zaman (3 gün) ile mesafeyi elle tutulur kılmak; P05'te devletin mührüyle kapanan kapı.

**Görsel dil:** baskın şekil **diyagonal** (Paris üst-sağ → Bordeaux alt-sol rota), ritim **kule ikonlarının eşit aralığı** (P05) ve **gün-ay döngüsü** (P03), renk sıcaklığı **+1** (kâğıt), kontrast **düşük** (mürekkep kahve, parşömen); tek yüksek kontrast vuruş **kırmızı mühür** (P05). Harita filmin "arşiv dosyası" kimliğinin en saf hâli: diğer mekânların kâğıt üst katmanı burada ana malzeme olur.

**Kompozisyon:** ortografik tepeden. Paris (540, 430) P02 tahtasıyla MATCH. Gün-ay diski sol kenar x 80–280, y 340–540 (sahne planı). Mühür merkez (540, 880), çap 300 = P06 güneş diski.

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Zemin | KAGIT-ARSIV (mevcut `parsomen.jpg`) | foxing, kırışık, kenar sararması | Raster kalabilir; üstüne aynı `kagit-lif` katmanı α .18 (diğer planlarla ortak doku) |
| Fransa | mürekkep `#2b1d10` + tarama (mevcut 35° pattern) | kontur 7 px | `KonturTitreme` orta (2.0): şu an kusursuz düz çizgi, el çizimi değil |
| Rota | kesikli mürekkep | | mevcut |
| Kule ikonu | mürekkep T | **aktif ikon amber hale**, kol kırmızı değil siyah | `Harita.tsx` aktif regülatörü `#b3261e` yapıyor: kırmızı yalnız mühüre ve hata halosuna kalsın |
| Mühür | BALMUMU | taşan dil + Chappe T kabartması | P21 ilanıyla aynı motif |
| Gece kararması | `#0b1530` multiply α .35 (P03) | | sahne planı |

**Işık:** düz harita; gölge yalnız araba ve mühürde sağ-aşağı 6 px α .3. P05 **gündüz kalır** (gece kararması yok): telgraf yalnız gün ışığında çalışır [D olası]; gece/gündüz döngüsü yalnız posta (P03) tarafında. Bu zıtlık hikâyeye katkı: posta gece de yürür ama yavaş; telgraf yalnız gündüz ama hızlı.

**Dönem notları ve yakalanan kod sorunları (motion, mevcut `Harita.tsx`):**
- Telgraf modundaki sayaç **"⚡"** simgesi kullanıyor: (1) "elektrik" anlamı taşıyor, filmin "Elektrik yok" fikriyle çelişiyor; (2) `theme.ts` unicode aralığında değil, sistem fontuna düşer. Kaldırılmalı; yerine küçük T kule ikonu (SVG).
- Posta sayacındaki **"☀ ☾"** glifleri de font aralığında değil. Gün-ay diski zaten SVG; sayaç yalnız rakam ve "GÜN".
- `YALNIZCA DEVLET` dikdörtgen damgası P05 mühür tasarımıyla (yuvarlak balmumu) çakışıyor; mühür kararı geçerli, damga kalkar.
- Posta modunda arabanın arkasında toz parçacıkları çiziliyor; P03'ten toz **çıkarıldı** (dokunuşlar).
- Araba görseli `araba.png` (Gemini raster, kapıda "POSTES ROYALES" ve arma): vektör `PostaArabasi` ile değişmeli (3.6).
- **Doğrulanmalı:** P05'teki telgraf hattı, posta yoluyla (Chartres, Châteaudun, Vendôme) aynı çizgide çiziliyor. Paris–Bordeaux telgraf hattının Orléans–Blois–Tours üzerinden gittiği **[G ◐]**; doğrulanırsa kule ikonları ayrı bir çizgiye taşınır (iki yol yan yana: yavaş posta, hızlı telgraf; görsel olarak da daha güçlü).

**Dokunuş yüzeyleri:** P03 gün-ay diski (sol kenar), araba+at (son kadrajda %11). P05 mührün indiği harita yüzeyi (540, 880): altında yazı/şehir adı olmamalı (balmumu okunurluğu); Angoulême etiketi bu noktaya yakınsa 40 px kaydırılır.

---

### 3.3 SOKAK-BORDEAUX (P04) · gece, dar ıslak sokak

**Duygusal amaç:** Liman şehrinin ıslak karanlığında iki kardeşin niyeti: "kabul etmeyeceğiz" (François'nın beyanı, Louis'nin soğukluğu).

**Görsel dil:** baskın şekil **tek nokta perspektif** (cepheler sokak ucuna akar, göz Garonne'a çekilir), ritim **pencere ve balkon tekrarı**, renk sıcaklığı **−2 taban + amber vurgular** (fener, réverbère, açık pencereler), kontrast **yüksek** (ay kenar ışığı + amber, derin gölge). Prototipte onaylı dil korunur; yalnız şehir değişir.

**Kompozisyon:** kamera alçak (~0.9 m), zemin ufku y ≈ 977, cephe tepe çizgileri y ≈ 838'de birleşir (mevcut `Sokak.tsx`). Sokak ucu açıklığı x 410–670, y 600–1130. Insert ızgarası (400, 1130) (sahne planı R1).

**Paris'ten Bordeaux'ya dönüşüm (motion, `Sokak.tsx` parametreleri):**

| Öğe | Prototip (Paris) | Bordeaux | Kaynak |
|---|---|---|---|
| Cephe | `SIVA` mor-gri `#6a6170…` | **TAS-BDX gece tonu** `["#8a7e66","#7f7560","#93866a","#857a62","#7a715c","#8d8168"]` + blok deseni (uzak ×0.4) + korniş altı yağmur izi | [D olası] |
| Yarı ahşap | %35 | **%5** (Bordeaux merkezinde taş hâkim) | [G ◐] |
| Çatı | %100 arduvaz, yüksek (`hNear*0.3`) | **%70 tuile canal / %30 arduvaz**, çatı yüksekliği `×0.3 → ×0.14` (düşük eğim, sokaktan az görünür) | [D olası] |
| Lento | düz | Yakın 3 evde kilit taşında **maskaron** (yüz kabartması, 40–60 px, ay kenar ışığı) | [G] |
| Uzak | Notre-Dame | **Garonne direkleri** (tasarim.md 1.3 geometrisi) + sol çatıların üstünde, sis içinde, **külahsız Saint-Michel kulesi** silueti x 300–360, y 520–760, `#2c3358` α .55, tepede küçük T (DINLEN; gece çalışmaz) | [D kesin: Bordeaux telgrafı Saint-Michel'de] |
| Duman | iki baca dumanı (`Duman`) | kalır (ev bacası; buharlı gemi dumanı değil) | |
| Dükkân | BOULANGERIE, VINS, CHAPELIER, CAFÉ | VINS, CAFÉ, CHAPELIER kalır; BOULANGERIE → **TONNELIER** (fıçıcı: şarap limanı) | [T] |
| Zemin | ıslak kaldırım | aynı + 3 **su birikintisi** (z 1.6, u 0.30 / z 2.4, u 0.70 / z 3.2, u 0.45) | [T] |

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Cepheler | TAS-BDX (gece) | blok + gözenek + yağmur izi | uzak ×0.4, yakın ×0.8 (gece dokusu kısık) |
| Balkonlar | DEMIR | ay kenar ışığı tek taraf | mevcut `balkon demiri` |
| Panjur | AHSAP-BOYALI yeşil/kahve/mavi | lameller | mevcut |
| Kaldırım | KALDIRIM-ISLAK | yansıma + birikinti | 1.3 |
| Izgara | DEMIR | 7 çubuk, ay ışığı halkası | mevcut |
| Gemi direkleri | AHSAP siluet | düz, sis katmanlarıyla | tasarim.md 1.3 |

**Palet:** gök `#070b1f → #1b2852 → #40507e` · ay `#f2f0e6` · kenar `#c4d6ff` · amber `#ffb357 / #ff9a40 / #ffd98f` · cephe yukarıdaki dizi · kaldırım `rgb(48–70)` · sis `#6e7aa6` / `#8b93ad`.
**Işık:** ay üst-orta (mavi kenar, karakterlerin sırtından), réverbère sokak ortasında z 2.3 (ön-yan amber dolgu), duvar feneri sol z 1.75. Gölgeler lambadan radyal, ışığın tersine.

**Dokunuş yüzeyi:** baston ucunun indiği **kaldırım taşı** ızgaranın 30 cm solu (insert'te ızgara merkezinin 120 px solu, y 1130 hizası), **taşa gömülmez**; ızgara demirleri fare pençesi temas noktası. Louis ızgaranın üstüne basmaz.

**Motion notları:** `Sokak.tsx`'e `sehir: "paris" | "bordeaux"` parametresi (renk dizileri, yarı ahşap oranı, çatı tipi/yüksekliği, `uzak` bileşeni). Mevcut `#siva` filtresi cephede kalır, üstüne blok deseni eklenir. Prototip altyazısındaki `fontStyle: italic` (yüklü italik yok) ve altın vurgu (`#ffcf70`) tasarim.md'ye göre düzeltilmeli.

---

### 3.4 TOURS-KULUBE-IC (P01, P07, P08, P10, P11, P15 alt) · telgraf istasyonunun üst kat çalışma odası

**Duygusal amaç:** Baskı ve yalnızlık: dar, beyaz bir taş kutuda tek ışık, dışarıda insanı izleyen bir makine.

**Görsel dil:** baskın şekil **dikey** (direk, kiriş araları, dar pencere, sarkan kablolar) + **alçak tavan** (kirişler kadrajın üstünü bastırır), ritim **kiriş aralıkları (3)** ve **pencere kayıtları**, renk sıcaklığı **çift kutuplu**: içeride tek amber kaynak (+1 yerel), duvarlar beyaz tuffeau olduğu için ışığı **yakalar** (beyaz duvar = sahne perdesi, gölgeler okunur), dışarıda soğuk mavi/mor; kontrast **çok yüksek** (P07–P08 chiaroscuro). Boşluk: memurun arkasındaki duvar bilerek boş (P08 gölge alanı).

**Mimari karar (yeni, [D] ile hizalı):**
- Oda, kule binasının **üst katı** (çalışma odası); altında dinlenme odası [D kesin]. Bu yüzden **zemin ahşap döşeme**, sol arka kapı **merdiven sahanlığına** açılır (P07'de François sahanlıkta, gölgede durur: kapı aralığından alttan gelen sönük ışık, merdivenin ilk 2 basamağı görünür).
- Manipülatör (minyatür T + iki tutamak) **pencere A'nın önünde, tezgâhta**; tavandan inen **iki kablo** (kenevir, `#a07a48`) tavandaki makaralardan geçip duvardaki bir delikten dışarı çıkar ve dış duvar boyunca direğe tırmanır; pencere A'nın dış kenarında **makara hattı** görünür. Bu kablo hattı P01'de ikinci elin görünmez işini "fiziksel" kılar (sahne planı R: kol oynatan el kadraj dışında manipülatörde).
- **İki sabit dürbün kutusu** [D kesin]: (1) pencere B'de (Paris yönü, önceki kule), duvara gömülü ahşap kutu + pirinç tüp; (2) sağ duvarda dar bir **mazgal açıklığında** (sonraki kule, Bordeaux yönü). P11'de memur pencere B'deki kutuya eğilerek bakar (çıplak gözle 10 km öteyi okumaz: yönetmene öneri).
- **Pencere A ve direk mesafesi (karar gerekiyor):**
  - **Seçenek 1 (önerilen, [T] kompozisyon):** oda binanın yan kanadındaki üst kat; direk ana gövdenin çatısında, pencere A'dan **~12 m** ötede, yukarı-sağda. Bu mesafede regülatör (4.6 m) ve iki gösterge pencere içinde **tam T** olarak okunur (pencere 1.0 m, kamera pencereye 3 m: görünür genişlik ≈ 5 m). Kablolar dış duvar boyunca makaralarla ana gövdeye gider. Kaynakla küçük sapma: [D] "direğin dibindeki çalışma odası" der; burada oda direğin tam altında değil, yanında.
  - **Seçenek 2 (kaynağa sadık):** oda direğin tam altında; pencere A'dan direk 4–5 m yukarıda, **regülatörün sağ ucu + sağ gösterge + karşı ağırlık** büyük ve kırpık görünür. Kol hareketi daha büyük ve okunur, ama T şekli tam görünmez (P22 morfunun "T" kurulumu zayıflar).
  - Kanca (P01) T siluetine dayandığı için **Seçenek 1**. Yönetmen/kullanıcı onayı.

**Kompozisyon (P07–P08 orta plan):** göz hizası / kaçış (540, 700) (kamera ~1.2 m: oturan müdüre göre alçak, odayı yüksek ve basık gösterir). Duvar-zemin birleşimi y ≈ 1400. Kapı x 110–330, y 420–1400. Pencere A x 700–890, y 760–1100. Masa ön kenarı y ≈ 1500 (alt güvenli alanın hemen üstü: masa yüzü kadrajın tabanı, ayrıntısız koyu ön yüz alt 420 px'i doldurur). Üst 220 px: tavan kirişleri (düz koyu ahşap, ayrıntı yok).
**MASA-PLAKA (P01, P10, P23):** tepe-önden ~60°, pencere A x 560–1000, y 450–770 (kanca yazısının altında), masa üst düzlemi y 800–1700; fener sol x 140–330, y 700–1050.

**Katmanlar (orta plan)**
1. Dış (pencere içinden): gök (varyanta göre) + direk + kollar + kablo/makara hattı + uzakta ova çizgisi; `CAM-ESKI` dalgasıyla bozulmuş.
2. Duvarlar: TUFFEAU arka ve sol duvar, kirişler, kapı, pencere A, pencere B (sol duvar, perspektifle kısalmış), sağ duvarda dürbün mazgalı.
3. Orta: masa, sandalye, manipülatör tezgâhı (pencere A önü), raf (kutular), halat bobinleri (sol duvar), fıçı (arka sağ köşe, gölge alanı dışında).
4. Ön: masa ön kenarı, mum/fener.

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Duvarlar | TUFFEAU (iç yüz, **yarı badanalı**: üst yarı kireç badana SIVA `#e2dccb`, alt yarı çıplak tuffeau) | badana kabarması, alt yarıda nem bandı ve petek | badana dökülmesi 2 yama (pencere B altı, kapı yanı) |
| Kirişler, kapı, pervaz | AHSAP-MESE | balta izi, kapı tutamak çevresinde aşınma | kiriş damar yönü yatay |
| Masa, çekmece | AHSAP-MESE (üst) / AHSAP-CEVIZ (çekmece yüzü) | **masa kenarında el aşınması**, üstte kâğıt/mum lekeleri (2 halka iz), çekmece pirinç halka | masa üstü `#a07848`, aşınma α .3 |
| Zemin | AHSAP-DOSEME | kapıdan masaya giden ayak yolu açık | |
| Manipülatör | DEMIR + PIRINC + AHSAP-MESE | perçinler, tutamakların elle parlamış pirinci | tek parlama noktası tutamakta |
| Kablolar | KAGIT-PAKET ip dokusu (kenevir) | bükülme | 3 px |
| Pencereler | CAM-ESKI | 2×3 küçük cam, dalga 6 | |
| Dürbün kutuları | AHSAP-MESE + PIRINC | | `DurbunKutusu` |
| Fener | teneke `#6a6a70` + cam | is lekesi üst kapakta | |
| Halat, fıçı, raf | AHSAP-MESE, ip | | uzak ×0.7 |

**Işık varyantları**

| Varyant | Planlar | Anahtar | Dolgu | Gölge yönü | Pencere dışı |
|---|---|---|---|---|---|
| **A geç gün ışığı + fener** | P01, P10, P23 | fener `#ffb357`, masa solunda, alçak | pencereden **geç gün** (alt `#e8a36a` → üst `#6a5a8a`): güneş henüz batmadı, telgraf çalışıyor | sağ-yukarı + fener kafes deseni | direk `#8fa9c4` sıcak ışıkla `#b0a090`'a kayar, kollar siyah siluet |
| **B gece + mum** | P07, P08 | mum `#ffcf70` masada, **alttan** | pencereden gece mavisi `#4a5f94` | yukarı ve duvara (alttan ışık); P08 T gölgesi sol-üst duvar x 100–520, y 430–860 | kollar **SAK konumunda sabit** (gece çalışmaz [D olası]) |
| **C gündüz soğuk** | P11, P15 alt | pencere A'dan soğuk gün `#cfdcff` | oda amber α .15 | sol-aşağı | açık gök, direk mavi net, kollar MESAJ/HATA |

**Palet:** tuffeau `#e6e0cc` (ışıkta) / `#8a8478` (B gecede gölge) · badana `#e2dccb` · harç `#cfc6ab` · kiriş `#3b2818` · masa `#7a5230` / üst `#a07848` · döşeme `#5a4630` · demir `#1c1915` · pirinç `#c9a24a` · kablo `#a07a48` · pencere gece `#1a2033`.

**Dönem/şehir:** Tours istasyonu, müdür + yardımcı [A]; [D] "istasyonda 2 görevli" ile uyumlu, üçüncü kişi yok. Tuffeau [D olası]. Kâğıt para yok (altın/gümüş frank).

**Dokunuş ve eylem yüzeyleri**
| Plan | Yüzey | Konum |
|---|---|---|
| P01 | Paket kâğıdı ve masa ışık dairesi (eldiven bırakılır); pencere A içinde kol | masa x 300–620, y 1000–1350; ışık dairesi fener önü (r 220) |
| P07 | **Çekmece ön yüzü** (plan başında yarı açık), masa kenarı (kese kayar), sikkelerin süpürüldüğü masa üstü | çekmece y 1250–1400 alt-orta (%12); müdür z 2.0, u 0.60 |
| P08 | Masa yüzeyi (parmak tıkları), **boş duvar** (T gölgesi) | el y 1050–1250; duvar x 100–520, y 430–860 boş: raf, askı, halat konmaz |
| P10 | İki açık paket (masa üstü, 55°) | sol x 140–500, sağ x 580–940 |
| P11 | **Manipülatör tutamakları** (ter damlası iner) ve pencere B dürbün kutusu | memur z 1.8, u 0.50; insert sap+damla %25 |
| P15 alt | masa başı, memurun omzu (yaprak konar) | y 972–1500 |

**Motion notları:** üç ışık varyantı aynı geometriden (`IsikKatmani` değişir, plaka aynı). MASA-PLAKA ayrı pişirilmiş plaka (P01 ve P23'ün kare eşleşmesi için **aynı dosya**). `ChappeKule detay="yakin"` (jaluzi delikli) pencere içinde. Kablo hattı P01 "şak" anında 2 px gerilir (fiziksel neden).

---

### 3.5 KULE-DIS (P12, P13, P21, P22 başı; pencerelerden görünen kuleler)

**Duygusal amaç:** Devletin makinesi: geniş, açık, kayıtsız bir manzarada birbirini taklit eden ahşap kollar.

**Görsel dil:** baskın şekil **T** (yatay regülatör + dikey direk), ritim **ufukta küçülen T'ler** (Tours → ara kule → sonraki), renk sıcaklığı **0 / −1** (açık gökte süt beyazı gün), kontrast **düşük-orta** (hava perspektifi; tek sert kontrast siyah kollar). Boşluk bol: gök kadrajın yarısı.

**Kule modeli (`ChappeKule`):** direk 7 m gök mavisi `#8fa9c4` [D kesin], regülatör 4.6×0.35 m, göstergeler 2×0.30 m, siyah, sabit jaluzili [D kesin], gösterge uçlarında gri karşı ağırlık (çatal) [D kesin], pivotlarda pirinç, direk dibinde iki payanda. 45° adımlı konumlar ve adlar tasarim.md 1.5 tablosundaki gibi (ILK, SAK, MESAJ, HATA, DINLEN). **Doğrulanmalı:** "DINLEN" (kollar kapalı) konumunun gerçek dinlenme konumu olduğu [G ◐].

**Varyantlar**

**KD-A · TOURS-KAPI (P21), gündüz.** Kulübe cephesi TUFFEAU (yağmur izi pencere altında, nem bandı kapı yanında), çatı arduvaz [G ◐: yumuşak tut, düz koyu mavi-gri, pul ayrıntısı uzakta yok], kapı AHSAP-MESE demir bantlı (çivi başları sıra), pervaz tuffeau `#cfc6ab`. Direk kapı üstünde, mavi, kollar DINLEN. Gök `#cfdcff → #f2e8c9`, güneş sol-üst, gölge sağ-aşağı. Geometri sahne planı: kapı x 320–760, y 700–1400; ilan x 420–660, y 800–1100; sürgü kapı sağ kenarı, push-in sonunda ~270 px. Kamera göz hizası ~1.5 m, ufuk y ~1050 (kapının ortasından biraz yukarıda; direk yukarı bakışla yükselir).
- İlan: KAGIT-ARSIV `#efe9d8`, tricolore bandı [G ◐], 2 sütun okunmaz metin, balmumu mühür (P05 ile aynı motif), 4 kare başlı çivi. Kâğıt kenarı çivilerin arasında hafif kabarır.
- **Sürgü (dokunuş yüzeyi):** DEMIR düşen mandal, sol pivot perçin, pervazda demir kanca; temas noktası kanca içi (yuva). Mandalın düşüş yayı boyunca kapı yüzeyinde hiçbir çıkıntı yok (çarpma olmaz).
- Görevli eli sağ-alttan girer (siyah kol, beyaz manşet).

**KD-B · ARA KULE (P12, P13), gündüz.** Tours'tan sonraki bir ara istasyon. **Kare taş kule, iki katlı** [D olası: gövde biçimi kare/yuvarlak/piramit olabilir; malzeme bulunamadı] → taş TUFFEAU sarı-gri varyantı (`#dccaa0` ana ton: kırsal sarı tuffeau [D olası]), çatıdan mavi direk yükselir. Üst kat penceresi açık (kanat dışa), **pencere içinde ahşap kutuya sabit iki pirinç dürbün**: biri sola (Tours'a), biri sağa (sonraki kuleye) bakar [D kesin]. Telgrafçı (zeytin yeşili redingot `#4f5a3e` + hardal atkı: koordinatör kararı; pencere içi koyu `#3a342e` zemine karşı okunur, taşın sarısıyla çakışmaz) pencere içinde bel üstü (z 1.5, u 0.50), sağdaki dürbünün değil soldakinin okülerine eğilir (Tours'tan geleni okur).
- Manzara: OVA, tarla şeritleri, kavak dizisi; **Tours kulesi solda ufukta** (uzak küçük T, HATA), **sonraki kule sağda**. Hava perspektifi: uzak kuleler `#7a7f90` (siyah değil), kontrast %40.
- P12 POV: tek dairesel maske (merkez (540, 950), çap ~860), pirinç halka 28 px; içeride Tours kulesi ≥300 px, gökle düşük kontrast, kollar HATA. Maskenin içi hafif `CAM-ESKI` dalgası (scale 3): dönem merceği.
- P12 aşırı yakın göz: arkada düz bulanık gök + **oküler halkasının pirinç kenarı** (göz dayalı kalır; v2.1 dokunuş). Halka sol-altta kadrajı keser, kaş üst yarıda.
- P13: kamera dışarıda geri çekilir; kulenin kendi direği üstte, ufukta sonraki kule. Kamera duvarın içinden geçmez (geri çekilme pencere düzleminin önünde).
- Palet: gök `#cfdcff → #f2e8c9`, ova `#9aa06a / #7d8a56`, taş `#dccaa0` / gölge `#9a8e70`, pencere içi `#3a342e`, ahşap `#7a5230`, pirinç dürbün `#c9a24a`.
- Işık: güneş sağ-üst (haber soldan sağa aktığı için telgrafçı sola bakar; yüzü gölge tarafında kalmasın diye anahtar sağ-ön); gölge sol-aşağı.

**KD-C · ALACAKARANLIK SİLUET (P17 penceresi, P22 başı).** Gök `#1d1838 → #3b2f5c → #8a5a6e → #d98a5a`, kule tek ton `#1c1915` (direk mavisi okunmaz, siluet), tek kenarda amber kenar ışığı `#ffb357` α .5. Kollar DINLEN (telgraf geceye girerken çalışmaz: P17 için doğru).

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Direk | AHSAP-BOYALI mavi | boya çatlağı, dipte aşınma | yakın (P21) tam doku; orta (P13) düz + tek gölge şeridi |
| Kollar | JALUZI | yakın: lamel delikleri; orta: 5 çizgi; uzak: dolu | |
| Kulübe/kule | TUFFEAU (beyaz Tours / sarı ara kule) | nem, yağmur izi | |
| Çatı | ARDUVAZ [G ◐] | uzakta düz | |
| İlan | KAGIT-ARSIV + BALMUMU | | |
| Ova | OVA | hava perspektifi | |

**Motion notları:** kollar yalnız 45° adım + 6 karelik oturma; asla sürekli dönmez. Her adımda menteşe foley'i (görünür kol). Uzak kulelerin "klak"ı GENİŞ −10.

---

### 3.6 PARIS-AVLU (P09) ve PARIS-MASA (P23)

**Duygusal amaç (P09):** Sıradan bir sabah rutini: devletin başkentinde şifre, bir posta paketi gibi önemsizce fırlatılır.

**Görsel dil:** baskın şekil **kapalı kare** (avlu duvarları kadrajı çevreler, gök dar bir şerit), ritim **sıvalı cephede tekrarlayan pencereler + mansard çatı pencereleri**, renk sıcaklığı **−1** (filmin en gri ve en az doygun gündüzü: Bordeaux altınının zıttı), kontrast **düşük** (bulutlu gümüş ışık, yumuşak gölge). Paris'i ayıran şey **gri + baca kümeleri + mansard**.

**Kompozisyon:** kamera hafif alçak (~1.1 m), ufuk y ~860, kaçış (540, 860). Paris adamının başı kadrajın üstünde kesik. Arka: kemerli araba kapısı (karanlık geçit, x 120–420, y 620–1150), 3 katlı sıvalı cephe, arduvaz mansard, 2 baca kümesi (her biri 4–6 kil baca başlığı). Orta: posta arabası sağda (z 2.2, u 0.62), arabacı kutuda (u 0.80). Ön: çuvallar, ahşap tezgâh (sol-alt, alt güvenli alanda ayrıntısız koyu kütle). Üst 220 px: gri gök şeridi + çatı silmesi.

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Cephe | TAS-PARIS (sıva) | is lekesi, kat silmesi, köşe taşı | `#siva` α .35 |
| Mansard | ARDUVAZ + CINKO kenar | | |
| Avlu zemini | KALDIRIM-KURU | tekerlek izi, derzde toz, saman parçaları | |
| Araba | `PostaArabasi`: gövde üst **gri-puce** `#6b5a60` [D olası], alt koyu `#3a2e30`, tekerlek `#3a2a1c` + jant `#c9a24a`, **arma yok**, levha yalnız "POSTES" (küçük, okunmaz ölçek) | ahşap gövdede boya parlaması, çamurluk kiri | P09 etiketi "TOURS" 380×110 krem kâğıt (Playfair 900) |
| Paket | KAGIT-PAKET + ip | | P10 ile aynı |
| Çuval | KUMAS-KETEN kaba `#a89870` | | |

**Palet:** sıva `#bdb6a8` / gölge `#8a8478` · arduvaz `#3c4660` · çinko `#8a8f98` · zemin `#6a6458 / #4a463e` · araba `#6b5a60` · paket `#b08a5a` · gök `#c9ccd2 → #e2e0da`.
**Işık:** bulutlu gün, yumuşak ışık sol-üstten; gölgeler **sağ-aşağı, kısa ve yumuşak** (blur 6). Temas gölgeleri α .3.

**Dönem/şehir:** Hôtel des Postes avlusunun görünümü bulunamadı [D] → "bir posta avlusu", konum iddiası yok, binaya yazı yok. Malle-poste'ler sabah erken varırdı [D]; P09 gündüz, dramatizasyon. "POSTES ROYALES" yazısı kullanılmaz [D öneri].

**Dokunuş yüzeyi:** araba **çatı bagaj çıtası** (eğimsiz, paket x ekseninde kayar), arabacının **kutu ön korkuluğu** (sağ ayak plan başından orada, topuk paketi durdurur). İkisi aynı yükseklikte, paket ile çizme arasında boşluk kalmaz (çizme paketin içinden geçmez).

**PARIS-MASA (P23):** MASA-PLAKA ile **aynı dosya** (3.4). Işık varyantı A. Kollar ILK'te sabit (P23'te kol hareketi yok). Fark yalnız eller (gri manşet + altın düğme). Gerekçe bölüm 2.

---

### 3.7 CATI-BORDEAUX (P06) · şafak, çinko teras

**Duygusal amaç:** Umutlu ve soğuk bir hesap: yeni günün ışığında ilk plan uçup gidiyor.

**Görsel dil:** baskın şekil **yatay** (ufuk, Garonne kıvrımı, korkuluk) + **merkezde güneş diski** (P05 mührüyle MATCH), ritim **dalgalı tuile canal sıraları**, renk sıcaklığı **+2** (şeftali-pembe), kontrast **yüksek kontrajur** (Louis siluet, sıcak kenar). Boşluk: güneşin etrafındaki gök (güvercinin çıkış yolu).

**Kompozisyon:** kamera hafif aşağıdan (~1.3 m teras üstü), ufuk y ≈ 1000, güneş merkezi (540, 880) çap 300. Sağ ufukta **Saint-Michel kulesi** x 820–900, y 560–1000 (kesik tepe, tepesinde mavi direk + T, ≥%10 kurulum değil ama P14 için okunur siluet ≥ 120 px boy), solda Garonne kıvrımı + gemi direkleri + **Pont de pierre** (uzak, sis içinde, alçak kemerli bant [G: 1822 açılış, D]). Orta: tuile canal çatı denizi, baca kümeleri, **soldan 2. dormer açık** (P14 eşleşmesi). Ön: TAS-BDX korkuluk, CINKO teras, Louis (z 2.0, u 0.45), kafes (z 2.3, u 0.62). Üst 220 px: düz lavanta gök. Alt 420 px: çinko teras yüzeyi ve korkuluk taşı (ayrıntısız).

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Çatılar | TUILE-CANAL (%70) + ARDUVAZ (%30) | dalgalı sıralar, liken; kontrajurda sıraların üst kenarı ışık çizgisi | orta ×0.7 |
| Bacalar | TAS-BDX + kil baca başlığı `#8a5a42` | is | |
| Korkuluk | TAS-BDX | gözenek, üst yüzde güvercin pisliği yok (temiz tut: kafes ve tüy okunurluğu) | yakın ×1.0 |
| Teras | CINKO | dikiş çıtaları kameraya doğru | |
| Kafes | hasır (osier) `#a07a48` | örgü pattern 6 px | |
| Saint-Michel | TAS gotik siluet `#5a5a70` α .7 | yalnız silüet + birkaç sivri kemerli açıklık | `SaintMichel detay="siluet"` |

**Palet:** gök üst `#5c6a9a` → orta `#d89a8a` → ufuk `#f2b27a` · güneş `#ffd9a0` · kiremit `#a8603e` / gölge `#6a3a28` · korkuluk `#c4b08a` / `#7a6a52` · çinko `#8a8f98` · güvercin `#dfe2ea`.
**Işık:** kontrajur: güneş Louis'nin arkasında; kenar ışığı `#ffb357` elle overlay (rig `RIM` facing ile aynalanıyor, `Poz.rim` önerisi); gölgeler **kameraya doğru uzun**. Telgraf şafakta çalışmaya başlar: Saint-Michel'in kolları **MESAJ** konumunda sabit (hareket yok; dokunuş yalnız P01'de).

**Dönem/şehir:** Bordeaux telgrafı Saint-Michel'de [D kesin]; külah 1830'larda yok **[G ◐ doğrulanmalı: 1768'de yıkıldı, 1860'larda Abadie yeniden yaptı]**. Kulenin şehirdeki konumu ve terastan görünüp görünmediği iddia edilmez (kompozisyon).

**Dokunuş yüzeyi:** tüyün konduğu **Louis'nin bordo sol önkolu** (insert %20; kol yüzeyi düz, desen yok, tüy okunur); kafes kapağının vurduğu **korkuluk üstü**; Louis'nin bastonu korkuluğa dayalı (kafesin solu).

**Mood:** `mood/mood-03-cati-bordeaux-saint-michel.png` (kesik tepeli kule promptu ile üretildi; yalnız yön).

---

### 3.8 CATI-KATI (P14) ve ALTIN-MASA (P15 üst yarı) · Bordeaux, kiralık çatı odası, gündüz

**Duygusal amaç:** Sabırlı bir gözetleme odası: iki yılın çentikleri bir pervazda birikiyor, pencerenin ucunda bir kilise kulesi yalan söylüyor.

**Görsel dil:** baskın şekil **diyagonal** (mansard eğik tavanı sağa yükselir, teleskop çapraz uzanır), ritim **pervaz çentikleri (beşli gruplar)** ve kirişler, renk sıcaklığı **+2** (öğleden sonra altını), kontrast **orta-yüksek** (pencereden giren ışık yamuğu, oda gölgede). Odak kayması (yakın net → kule net → Louis) planın ikinci dilidir: kat kat derinlik.

**Kompozisyon:** kamera omuz üstü (~1.4 m), göz hizası/kaçış (540, 880). Dormer (içeriden) x 380–900, y 380–1000; dışarıda Bordeaux çatıları ve **Saint-Michel kulesi + T** (≥230 px, %12; HATA). Pervaz + bıçak alt-sol x 80–620, y 1000–1290 (%22). Louis z 3.0, u 0.78 (masada, bulanık). Üst 220 px: eğik tavan kirişi (koyu, ayrıntısız). Alt 420 px: döşeme ve sandık (bulanık).

**Dönem:** suç ortağı Saint-Michel'e bakan **kiralık bir oda** tutmuştu [D kesin, FR; adı "Pierre Renaud" anlatımda kullanılmaz, araştırmada tek kaynak]. Teleskop tarihî istasyon aleti değil, kendi aleti; pervaza **kurulu** (v2.1). Mansard çatı katı [G].

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Eğik tavan, duvar | SIVA `#cbbd9e` | kabarma, köşede su lekesi | |
| Kirişler | AHSAP-MESE koyu | | |
| **Pervaz (dokunuş)** | AHSAP-MESE kalın | **onlarca çentik, beşli gruplar** (4 dikey + 1 çapraz), eskiler koyulaşmış `#2a1c10`, yenisi açık `#c49a68`; çentik derinliği iç gölge 2 px | 7–9 grup, sabit seed (P14 boyunca aynı) |
| Teleskop | PIRINC + DERI orta bölüm | tek parlama | |
| Döşeme | AHSAP-DOSEME | | |
| Pencere dışı | TUILE-CANAL çatılar + Saint-Michel | odak kayması: iki sürüm (keskin/bulanık) | |
| Masa (P15) | AHSAP-CEVIZ | mürekkep lekesi, sikke izleri | |

**ALTIN-MASA (P15 üst, y 220–948):** v2.1 dokunuşa göre **takvim yok**; Louis'nin defteri **pupitrde y 540–840** (yaprak yolu ≥300 px), altın yığını x 380–620, y 780–930, François'nın kadehi sağ x 640–900, y 560–800, Bordeaux şişesi. Ayraç kiriş y 948–972 (AHSAP-MESE, iki yarıyı bağlayan "ahşap çerçeve"). Yaprak: KAGIT-ARSIV, **pürüzlü yırtık kenar** (titreme `scale 5`), elle yazılmış "1835" (mürekkep, kaz tüyü kalınlık değişimi).
**Palet:** kiriş `#3b2818 / #5b3d25` · sıva `#cbbd9e` · pervaz `#6a4a2c` · pencere dışı gök `#cfdcff → #f2e8c9` · çatılar `#a8603e / #3c4660` · kule `#5a5a70` → netken `#1c1915` (kollar) + `#8fa9c4` (direk, küçük) · pirinç `#c9a24a / #f1d48a / #7a5a1f` · altın frank `#d4ad52`.
**Işık:** güneş pencereden sağ-önden, içeri uzun ışık yamuğu; **gölgeler sola-aşağı**. P15 üst yarı aynı oda, aynı yön: sıcak +3.

**Motion notları:** odak kayması için iki pişirilmiş katman (ön keskin/bulanık, arka keskin/bulanık), kare başı geçiş (blur canlı hesaplanmaz, swangle'da yavaş). Kule kolları netken **HATA**'ya "klak" (p+90).

---

### 3.9 YATAK-ODASI (P16, P17) · Tours, memurun evi, gece

**Duygusal amaç:** Sırrın ağırlığı bedene geçmiş: soğuk mavi bir odada tek mum, uzakta artık susan makine.

**Görsel dil:** baskın şekil **yatay** (yatak, yorgan, yatan beden: dikey Tours kulübesinin zıttı, "düşüş"), ritim **demir yatak parmaklıkları**, renk sıcaklığı **−3** (filmin en soğuk planı; mum yalnız küçük sıcak ada), kontrast **yüksek ama karanlık** (APL ~%14). Boşluk: memurla pencere arasındaki karanlık.

**Kompozisyon:** göz hizası (540, 900), kamera ~1.0 m (yatak hizasına yakın, alçak, mahrem). Yatak y 1000–1500; mum sol komodinde; **pencere sağ-arka** x 640–960, y 300–620 (uzak kule, KD-C, DINLEN); kapı arka-sol; sandalyede yüzsüz figür (z 2.8, u 0.85) + dizde yazı pulpitri, hokka, **kum kabı** (P17 kurulumu). Gri ceket duvardaki askıda. Üst 220 px: koyu kiriş/tavan. Alt 420 px: döşeme ve yorgan saçağı (ayrıntısız, koyu).

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Duvar | TUFFEAU + badana (Tours evi: kulübeyle aynı taş, şehir sürekliliği) | badana dökülmesi, nem | gece tonu `#4a4238 / #6a5f52` |
| Kiriş | AHSAP-MESE | | |
| Yatak | DEMIR (karyola) | kenar ışığı soğuk `#9fb3ea` α .3 | |
| Yorgan | KUMAS-YUN `#6b5a4a` | örgü + basit desen | |
| Çarşaf, yastık, takke | KUMAS-KETEN | kırışık | |
| **Döşeme (dokunuş: eldiven düşer)** | AHSAP-DOSEME `#5a4630 / #3b2c1c` | insert yer seviyesinde: tahta derzi, toz, mum ışığının uzun yansıması | insert ×1.2 |
| Pencere | CAM-ESKI | soğuk mavi `#4a5f94`, dalga 6 | |
| Pulpitr, kum kabı | AHSAP-CEVIZ + PIRINC (delikli kapak) | | |

**Palet:** duvar `#4a4238 / #6a5f52` · yatak `#1c1915` · yorgan `#6b5a4a` · çarşaf `#d8d0bb` · takke `#e8e0cc` · döşeme `#5a4630 / #3b2c1c` · pencere `#4a5f94` · mum `#ffcf70` + hale `#ff9a40`.
**Işık:** anahtar mum (sol, alçak, amber) → yüzde gölge **sağa-yukarı**; dolgu pencere (sağ-arka, soğuk mavi) → yatak kenarında soğuk kontur. Soğuk baskın.
**Dönem:** demir karyola ve gece takkesi [G ◐]; kurutma kumu 19. yy boyunca kullanıldı [D kesin].
**Dokunuş yüzeyleri:** P16 eğik yorgan kenarı (eldivenin kaydığı yüzey) + döşeme temas noktası (yatak ayağından 40 cm uzak: çarpma yok). P17 pulpitr üstündeki yazılı sayfa (kum serpilir, alt-sağ x 560–1000, y 1000–1250).

---

### 3.10 MAHKEME (P18, P19) · Tours Ağır Ceza, Mart 1837

**Duygusal amaç:** Soğuk otorite: yüksek, simetrik bir ahşap kutu; beklenti saatin tek tıkında kasılır ve ceza gelmez.

**Görsel dil:** baskın şekil **dikey + simetri** (yüksek kemerli pencereler, lambri dikmeleri, ortada yüksek kürsü), ritim **pencere-huzme-pencere-huzme**, renk sıcaklığı **0** (soluk altın huzme ama ortam koyu ceviz ve gölge kahvesi), kontrast **çok yüksek** (huzme ile lambri gölgesi; filmin en dramatik ışığı). Alçak açı otoriteyi büyütür.

**Kompozisyon (MAHKEME-A, P18, kürsüye bakış):** kamera alçak (~0.8 m, sanık sırasının arkasından), kaçış (540, 1150), dikeyler yukarı %4 yakınsar. Kürsü orta-üst; **sarkaçlı saat x 760–960, y 470–680** (≥210 px, huzmenin üstünde). Pencereler **solda** (3 kemerli), huzmeler sağ-aşağı 28°. Sanık sırası ön planda arkadan (François u 0.34 sol, Louis u 0.52). Jüri sırası sol (12 siluet, [T]: yerleşim kaynaksız [D]). Üst 220 px: lambri tepesi/kornişi (düz). Alt 420 px: sanık sırası arkalığı (koyu, ayrıntısız ahşap).
**MAHKEME-B (P19, sanıklara bakış):** arka duvar giriş kapısı + seyirci sırası; pencereler **sağda**, huzme sağdan, gölgeler sola. Louis ekran solu.

**Tokmaksız masa düzeni (yeni, [D] + dokunuş v2.1):** başkan masası kürsüde, **yeşil çuha** örtülü, üstünde: **iple bağlı kalın ciltli dosya** (dava dosyası, deri sırtlı karton kapak `#5a3a22`, bez kurdele `#c9bfa4`), **karar kâğıdı** (tek yaprak, KAGIT-ARSIV), hokka + kaz tüyü, **küçük pirinç el çanı** (yalnız dekor, kullanılmaz; [D olası, modern kanıt]). P18'de dosya **açık**; P19 insert'te başkanın eli karar kâğıdını bırakır ve **dosya kapağını kapatır (TOK)**. Bu düzen kullanıcı tokmak seçerse de çalışır: tokmak masanın sağına, tablası çuhanın üstüne eklenir; yüzey aynı.
**Arka duvar:** **boş lambri** + saat. Haç, arma, kral büstü, tricolore **yok** (kanıtsız [D]; boş duvar en az riskli). Bayrak isteniyorsa yalnız araştırmacı doğrularsa.
**Cübbe:** tek koyu ton `#3a1c1e` (bordo-siyah arası; renk okunmaz, kırmızı/siyah tartışmasını açmaz [D öneri]); rabat `#efe9d8`.

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Lambri | AHSAP-CEVIZ | panel ritmi, pencereye bakan dikmelerde parlama şeridi | dikme aralığı 120 px (uzak) |
| Kürsü, sanık sırası, korkuluk | AHSAP-CEVIZ koyu `#2f2016` | korkulukta el aşınması | |
| Başkan masası | KUMAS-CUHA | | |
| **Dosya (dokunuş yüzeyi P19)** | DERI sırt + karton kapak + bez kurdele | kapak kenarı aşınmış, köşe kıvrık | insert ×1.2 |
| Zemin | AHSAP-DOSEME koyu `#2d2118` | pencere kafes gölgesi uzar | |
| Pencere | CAM-ESKI aşırı pozlanmış | | |
| Saat | kadran beyaz mine `#f2ecd8`, çerçeve AHSAP-CEVIZ, sarkaç PIRINC | Roma rakamı, saniye ibresi yok | |
| Huzme | `Huzme` | toz yalnız huzme içinde | `#fff1c8` α .22 → 0, screen |

**Palet:** lambri `#3b2818 / #5b3d25` · vurgu `#7a5532` · zemin `#2d2118` · kürsü `#2f2016` · cübbe `#3a1c1e` · rabat `#efe9d8` · çuha `#2f4a40` · dosya `#5a3a22` · huzme `#fff1c8`.
**Işık:** güneş yüksek pencerelerden; gölgeler ışığın tersine; karakterler pencereye bakar (rig kenar ışığı doğru tarafta).
**Dönem:** Tours Ağır Ceza, 11–14 Mart 1837 [A, D]. 1831 yasası sonrası başkan + 2 yargıç + 12 jüri [D olası]. **Doğrulanmalı:** duruşmanın yapıldığı bina (bugünkü Tours adalet sarayının 1840'larda yapıldığı **[G ◐]**; 1837'deki salonun görünümü bilinmiyor → genel salon).
**Dokunuş yüzeyleri:** P18 saat (kürsünün sağ-üstünde, huzmenin üstünde, kimse önünde durmaz); başkanın oturduğu sandalye (gıcırtı). P19 dosya kapağı (çuha üstünde), Louis'nin sağ göğüs cebi (eldiven ucu P18'de yan kesitten görünür).

---

### 3.11 KANUN-INSERT (P20) · yargıcın masası, tepe açı

**Duygusal amaç:** Bürokratik boşluk: kalın bir kanun kitabının içinde aranan şey yok, yalnız bir güve.

**Görsel dil:** baskın şekil **açık kitabın iki dikdörtgeni + cilt oluğu** (merkez simetri), ritim **sayfa çevirme (6)** ve metin sütunları, renk sıcaklığı **+1** (kâğıt + soluk huzme), kontrast **orta**: huzme sayfanın üst yarısını yıkar, boş alt kısım ışıkta "bembeyaz" kalır. Kâğıt dünyası (harita gibi): kenar sararması açık.

**Kompozisyon:** ortografik tepe, kitap 6° dönük, x 140–940, y 480–1300. Masa: **P19 ile aynı yeşil çuha** (süreklilik: aynı masa). Huzme soldan, sayfanın üst yarısında. Güve cilt oluğunda (kanatlar kapalı ~110 px), açılınca ~220 px. Üst 220 px ve alt 420 px: çuha (ayrıntısız).

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Sayfalar | KAGIT-ARSIV | iki sütun okunmaz metin (α .5), **alt yarı boş**, foxing, sayfa kenarı sararmış | metin çizgisi `#4a4237` |
| Cilt | DERI `#5a3a22`, kırmızı etiket `#8a2c24`, altın harf `#b8862b` ("CODE PÉNAL", Code pénal 1810 [G]) | sırt bantları, köşe aşınması | |
| Masa | KUMAS-CUHA | | |
| Güve | düz vektör `#b9a98a`, kanatta 2 koyu leke | huzmede kenar parlar (screen +.2) | |
| Yargıç eli | cübbe kolu `#3a1c1e` (P18 ile aynı) + rabat manşeti | | |

**Işık:** tek çapraz huzme soldan; gölgeler sağ-aşağı; toz yalnız huzme içinde.
**Dokunuş yüzeyi:** cilt oluğu (güvenin başladığı yer, p+0'dan görünür) ve sayfanın boş alt yarısı (parmak basar).

---

### 3.12 WIFI-MORF (P22) · tahta kukla dokusu, neon yok

**Duygusal amaç:** Geçmişten bugüne bir köprü: aynı tahta ve boya, yalnız şekil değişir.

**Görsel dil:** baskın şekil **T → üç yay** (yatay+dikey çizgiden eşmerkezli kavise), ritim **üç yayın sırayla dolması**, renk sıcaklığı **−1 → −3** (alacakaranlık moru → telefon ekranı karanlığı), kontrast **siluet** (koyu tahta, kenar ışığı, en sonda krem boya). Dünyanın malzemesinde kalır: ışık yaymaz, boyanır.

**Kompozisyon:** düz ortografik; morf merkez (540, 800), boy ≥600 px (%31), y 480–1120. ALT-BANT yazı. Üst 220 px: düz gök/karanlık.

| Yüzey | Malzeme | Doku | Parametre |
|---|---|---|---|
| Yaylar | AHSAP-CEVIZ koyu `#3b2412` | damar **yay boyunca** (patternTransform yerine yay eğrisine teğet damar çizgileri), uçlarda pirinç perçin | damar α .22, perçin PIRINC |
| Nokta | aynı ceviz + **direğin gök mavisinden bir halka** `#8fa9c4` (direk noktaya dönüştüğü için rengini taşır) | [T] | halka 6 px |
| Boya dolgusu | `boyaKrem #e6c88c` (tasarım), **fırça izi** (dolgu sınırı titrek, 2–3 yatay fırça çizgisi α .15) | dolgu alttan yukarı | parıltı blur ≤ 8 α .3 yalnız kenarda |
| Gölge | kâğıt kesme gölgesi 4 px α .35 | | |
| Arka plan | KD-C gök → `#0e0d12` | aynı kâğıt lifi katmanı (karanlıkta da arşiv dokusu sürer) | lif α .08 |

**Motion notları:** morf canlı vektör (pişirilmez). Doku şekille birlikte bükülür ama **seed değişmez**. Kollar katlanırken jaluzi lamelleri yaylara "damar" olarak geçer (orta ayrıntı → damar çizgisi): malzeme sürekliliği.

---

## 4. Filmin ışık eğrisi

Ölçek: **Sıcaklık** −3 (en soğuk) … +3 (en sıcak), baskın ortam rengine göre. **Kontrast**: anahtar/gölge değer oranı (D = düşük ≤ 3:1, O = orta 3–6:1, Y = yüksek 6–12:1, ÇY = çok yüksek > 12:1). **APL**: ortalama parlaklık tahmini (%).

| Plan | Mekân | Saat | Anahtar ışık | Sıcaklık | Kontrast | APL | Not (duygu) |
|---|---|---|---|---|---|---|---|
| P01 | TOURS masa | geç gün | fener + pencere gün sonu | +2 | Y | 32 | Kanca: sıcak sır, soğuk dış dünya |
| P02 | BORSA | öğle | güneş huzmesi | **+3** | O | **62** | Filmin en parlak/sıcak noktası: açgözlülük |
| P03 | HARITA | gün↔gece | kâğıt, %35 kararma döngüsü | +1 ↔ −1 | D | 48 | Zamanın yükü (salınım) |
| P04 | SOKAK-BDX | gece | ay kenar + amber | −2 | Y | 18 | Niyet, gizlilik |
| P05 | HARITA | gündüz | düz kâğıt + kırmızı mühür | +1 | O (mühür vuruşu) | 52 | Devlet kapıyı kapatır |
| P06 | CATI-BDX | şafak | kontrajur güneş | +2 | Y | 40 | Umut ve başarısızlık |
| P07 | TOURS iç B | gece | mum, alttan | +1 yerel / −2 ortam | **ÇY** | 16 | Rüşvet: chiaroscuro |
| P08 | TOURS iç B | gece | mum, alttan | +1 / −2 | **ÇY** | 14 | Korkunun bedeni (duvar gölgesi) |
| P09 | PARIS-AVLU | gündüz bulutlu | yumuşak gri | **−1** | **D** | 50 | Rutin, önemsizlik (Paris grisi) |
| P10 | TOURS masa | geç gün | fener | +2 | O | 36 | Şifre çözümü: sıcak masa |
| P11 | TOURS iç C | gündüz | pencereden soğuk gün | −1 | O | 42 | Mekanik suç, soğuk ışık |
| P12 | KULE-DIS B | gündüz açık | açık gök | 0 | D → O (göz) | 58 | Gözetim; sessizlik |
| P13 | KULE-DIS B | gündüz | açık gök | 0 | O | 60 | Kayıtsızlık, ferahlık (ironi) |
| P14 | CATI-KATI | öğleden sonra | pencereden altın yamuk | +2 | Y | 38 | Sabırlı gözetleme |
| P15 | MONTAJ | ikiye bölünmüş | üst altın / alt soğuk | **+3 / −2** | Y (iki yarı arası) | 40 | **Ayrılma zirvesi**: kazanç ve bedel yan yana |
| P16 | YATAK | gece | mum + mavi pencere | −2 | Y | 16 | Bedel bedende |
| P17 | YATAK | gece | soğuk pencere baskın | **−3** | Y | **12** | Filmin en karanlık ve soğuk noktası: itiraf |
| P18 | MAHKEME A | gündüz | toz huzmeleri | 0 | **ÇY** | 30 | Otorite, kasılan beklenti |
| P19 | MAHKEME B + insert | gündüz | huzme sağdan | 0 → +1 (eldiven beyazı) | Y | 34 | Kırılma: beraat |
| P20 | KANUN | gündüz | tek huzme | +1 | O | 46 | Boşluk |
| P21 | TOURS-KAPI | gündüz açık | güneş | 0 | D | **64** | Soğuk, aydınlık sonuç: yasa kapıyı kilitler |
| P22 | WIFI-MORF | alacakaranlık → karanlık | kenar ışığı | −1 → −3 | Y (siluet) | 30 → 10 | Bugüne geçiş |
| P23 | PARIS-MASA | geç gün | fener (P01 aynası) | +2 | Y | 32 | Döngü: P01'e kusursuz bağlanır |

**Eğrinin okunuşu:**
1. **Açılış sıcak ve parlak** (P01–P02): sır ve hırs altın renkte; izleyici ışığa çekilir.
2. **Sıcak/soğuk salınım** (P03–P06): harita gün-gece, Bordeaux gece, şafak. Hikâye planlar yapıp duruyor.
3. **Tours'a girişte kontrast zirve** (P07–P08): renk sıcak ama karanlık (APL 14–16). Rüşvet tek mumun etrafında.
4. **Mekanik orta bölüm soğuk ve açık** (P09–P13): Paris grisi, gün ışığında makineler. Duygu değil sistem.
5. **Bordeaux'ya dönüş ısınır** (P14), **P15'te sıcak ile soğuk aynı karede ayrılır** (eğrinin dönüm noktası).
6. **Bedel en soğuk ve en karanlık** (P16–P17, APL 12).
7. **Mahkeme nötr ama en sert kontrastlı** (P18–P20): duygu değil hüküm.
8. **P21 en aydınlık ve en soğuk-nötr gündüz**: kazanmış gibi görünen kardeşlere karşı devletin parlak, duygusuz cevabı. P02'nin (en sıcak-parlak) tersi.
9. **P22 kararır, P23 P01'in sıcaklığına döner**: döngü ışıkta da kapanır.

Kurgu notu (Premiere): renk düzeltmede bu tabloyu bozacak toplu "look" uygulanmamalı; `ArsivKatmani` zaten ortak derecelendirmeyi yapıyor.

---

## 5. Kod tabanında yakalanan mekân/doku sorunları (motion'a, düzeltme önerisi)

| # | Dosya | Sorun | Öneri |
|---|---|---|---|
| 1 | `ChappeTower.tsx` | Göstergeler `C.red`; direk siyah; oran 280:90 = 3.1:1; jaluzi, karşı ağırlık yok | `ChappeKule` (1.5): siyah kol, mavi direk, 2.3:1, jaluzi, gri karşı ağırlık |
| 2 | `Harita.tsx` | "⚡" ve "☀ ☾" glifleri (font dışı; ⚡ "elektrik" anlamı), dikdörtgen "YALNIZCA DEVLET" damgası, posta tozu, aktif kule kırmızı, raster araba "POSTES ROYALES" + arma | 3.2 |
| 3 | `Efektler.tsx` `FilmLook` | Her karede yeni gren seed'i (doku kaynar, pahalı); saf siyah vinyet; sabit filtre id'si `fg` | `ArsivKatmani` |
| 4 | `Paper.tsx` | Sabit filtre id'si `grain` | `useId` |
| 5 | `Sokak.tsx` | Paris'e özgü: Notre-Dame `Uzak`, mor-gri sıva, %35 yarı ahşap, yüksek arduvaz çatı | `sehir` parametresi (3.3) |
| 6 | `Proto.tsx` | Replik altyazısı `fontStyle: italic` (yüklü italik yok), altın kelime vurgusu | tasarim.md 4.2 |
| 7 | `final/*.png`, `karakter/*.png` | Ressamsı (painterly) Gemini kareleri; S02 Borsa sahnesi ve S11 kule iyi **mood**, ama S06 pencere kafes pilon, louis-kart kâğıt para, S10 mahkemede tokmak + kırmızı kuşak | Yalnız ışık/kompozisyon yönü için; çizim referansı değil |

---

## 6. Mood referansları (yalnız yön; karede kullanılmaz)

Üretim: `node tools/gorsel.mjs <prompt> <out> --ar 9:16 --size 2K`, promptlar oturum karalama alanında. Ortak stil cümlesi: düz 2D vektör kesme kukla arka planı, titrek mürekkep kontur, sabit kâğıt lifi + ince gren, parşömene ısıtılmış desatüre palet, üst %11 ve alt %22 sakin.

| Dosya | Mekân | Ne için bakılır | Dikkat (hatalı/abartılı olan) |
|---|---|---|---|
| `mood/mood-01-tours-kulube-ic.png` | TOURS-KULUBE-IC gece | Beyaz tuffeau'nun mum ışığını tutması, kalın açık derz, sert alttan gölge, kiriş tavan, dalgalı camlı pencerede direk | Görsel tavanın üstüne gök koymuş (iç mekânda olmaz); kollar tam T okunmuyor; zemin taş (bu belgede ahşap döşeme) |
| `mood/mood-02-sokak-bordeaux.png` | SOKAK-BORDEAUX gece | Bal rengi taş + maskaron + dövme balkon + réverbère + sokak ucunda direkler; dokunun yoğunluğu ve kontur kalınlığı ailesi | Çatılar fazla arduvaz ve fazla görünür (Bordeaux'da tuile canal, alçak); prototipin perspektifi esas |
| `mood/mood-03-cati-bordeaux-saint-michel.png` | CATI-BORDEAUX şafak | Kontrajur, tuile canal denizi, ufukta kesik tepeli çan kulesi + T | Kulenin biçimi yön içindir, mimari kopya değildir. Model üstte ve altta krem kâğıt bandı eklemiş (kadraj değil). Güneş merkezde değil, sola kaymış (plan: (540, 880)). Kollar küçük ve haç gibi okunuyor: gerçek çizimde regülatör/gösterge oranı 2.3:1 olmalı |
| `mood/mood-04-sehir-ayrismasi.png` | Şehir ayrışması | Bordeaux (bal taş, kiremit, altın ışık) ve Tours (beyaz taş, koyu çatı, tepede direk) ilk bakış farkı | **Paris paneli Haussmann tipi (anakronik), kullanılmaz** (bölüm 2) |

---

## 7. Araştırmacıya soru listesi (doğrulanmalı)

Tasarımcının [G ◐] listesinden açık kalanlar ve bu belgenin yeni soruları. Öncelik sırasıyla.

1. **Saint-Michel çan kulesi 1834–1836'da külahsız mıydı?** (1768 kasırgasında yıkılıp 1860'larda Abadie'nin yeniden yaptığı bilgisi.) Telgraf tepeye nasıl kurulmuştu (platform, direk boyu)? P06, P14, P04 ufkunu doğrudan etkiler.
2. **Paris–Bordeaux telgraf hattının güzergâhı:** Orléans–Blois–Tours üzerinden mi? (Harita P05'te kule ikonları posta yoluyla aynı çizgide.)
3. **Telgraf geceleyin çalışmıyordu** bilgisinin birincil kaynağı (şu an Universalis arama özeti). P01 ışığı buna göre "geç gün" yapıldı.
4. **Tours çatıları 1830'larda arduvaz mı?** (Tasarımcı [G ◐], [D] bulunamadı.) Şimdilik düz koyu mavi-gri, ayrıntısız.
5. **Chappe kulesinin dinlenme (kapalı) konumu** neydi? (Kollar regülatör boyunca katlı mı?) P17, P21, P22 başlangıcı.
6. **Tours'ta 1837 duruşmasının yapıldığı bina/salon** (bugünkü adalet sarayının 1840'larda yapıldığı [G ◐]).
7. **Mahkeme salonu ögeleri 1837:** tricolore, kral (Louis-Philippe) büstü/portresi, haç. Şu an hepsi yok (boş lambri).
8. **Bordeaux sokakları 1830'lar:** kaldırım tipi (iri taş / çakıl), sokak ortasında su oluğu (caniveau) var mıydı? Maskaron ve dövme balkonun yaygınlığı (18. yy cepheleri).
9. **Bordeaux kireçtaşının rengi:** "sarımsı" [D] dışında bir tarif; eski cephelerde kararma (is) ne kadardı? (1830'larda temizlenmemiş cepheler muhtemelen koyu: doğrulanırsa gece paleti koyulaşır.)
10. **Ara kule gövdesi (Tours–Poitiers arası):** kare taş kule mi, ahşap kulübe mi? Tours istasyonunun yeri (kilise kulesi mi, ayrı yapı mı)? 3.4'teki pencere/direk mesafesi kararına etki eder.
11. **Kurutma kumu kabı biçimi** ve 1830'lar yazı pulpitri (yaratıcı yönetmen P17 için kesin, ayrıntı yeter).
12. **Malle-poste "gris puce"** için ikinci kaynak; posta levhası yazısı (Temmuz Monarşisi'nde "POSTES" mi, "POSTE AUX LETTRES" mı).
13. **Borsa:** 1830'larda Bordeaux'da Paris rente fiyatının duyurulma biçimi (tahta, ilan kâğıdı, sesli okuma). Şu an tahta [S dramatizasyon].
14. **Tricolore'un ilan kâğıdında bant** olarak basılması (P21) [G ◐]; doğrulanmazsa bant kalkar, yalnız mühür.

---

## 8. Yönetmen ve tasarımcı için karar bekleyenler

1. **Tours pencere A–direk mesafesi:** Seçenek 1 (12 m, tam T, önerilen) ya da Seçenek 2 (direğin dibinde, kırpık kol). (3.4)
2. **P11:** memurun önceki kuleye **pencere B'deki sabit dürbünle** bakması (çıplak gözle değil). Sahne planı p+24–52 satırı.
3. **P05:** harita gündüz sabit kalır (gece kararması yok) — telgraf gece çalışmaz.
4. **P04:** sokak ucunda sol çatıların üstünde silik Saint-Michel silueti (P06/P14 kurulumu). Kalabalık bulunursa çıkarılabilir; Garonne direkleri esas.
5. **Mahkeme arka duvarı boş lambri** (tricolore/büst yok) — tasarim.md'den sapma.
6. **TOURS-KULUBE-IC zemini ahşap**, kapı merdiven sahanlığına açılır (üst kat) — P07 François konumu "sahanlıkta".

---

## 9. Revizyon R1 · Kare denetimi: SB2-SOKAK (P04) ve SB2-BORSA (P02)

Denetlenen: `storyboard-v2/kareler/SB2-SOKAK.png` (A2), A1 hâli (`aca94c8`, bayraklı), `SB2-BORSA.png`; kaynak `src/bolumler/blanc/sb2/Sb2Sokak.tsx`, `Sb2Borsa.tsx`, `proto/Sokak.tsx` (sehir="bordeaux"), `src/doku/Mimari.tsx`.
Kullanıcı sorusu: "Sokak planında mimari o senenin (1834 Bordeaux) mimarisi mi?" **Kısa cevap: malzeme ve atmosfer doğru, cephe dili değil.** Taş rengi, ferforje, réverbère, orta oluk, gemi direkleri ve külahsız Saint-Michel dönemle uyumlu. Ama cepheler 18. yy Bordeaux taş evlerinin kuruluşunu (kat hiyerarşisi, basık kemerli pencere, kilit taşında maskaron, ev ev ayrılan korniş) taşımıyor; tek parça, her katı aynı, ızgara gibi bir duvar okunuyor. Bu "herhangi bir eski şehir" görüntüsü verir.

### 9.1 SOKAK: ne doğru, ne yanlış

| # | Öğe | Karede | Durum | 1834 Bordeaux eski kenti için doğrusu | Kaynak |
|---|---|---|---|---|---|
| 1 | Taş | Bal-sarı kesme blok | **Doğru** | Sarımsı, gözenekli kireçtaşı (calcaire à astéries); 1830'larda cepheler muhtemelen **isle koyulaşmıştı** (temizlenmemiş): gece paletinde üst katlar ve korniş altları %10–15 daha koyu | [D olası]; is [G ◐ doğrulanmalı] |
| 2 | Ev ayrımı | Sol ve sağ duvar tek parça, aynı korniş çizgisi, aynı kat yüksekliği | **Yanlış** | Bitişik ama **ayrı evler**: her ev 3–4 pencere aksı (travée), komşudan farklı korniş yüksekliği (±%8), ev sınırında dikey derz/köşe taşı, bazı evlerde çatı katı (attique) geri çekilmiş. CLAUDE.md dönem listesi: "farklı yükseklikte bitişik evler" | [G] |
| 3 | Kat hiyerarşisi | Tüm pencereler aynı boy, bazı evler 6 kat okunuyor | **Yanlış** | Eski kentte **R+2 / R+3** (+ attique), en fazla R+4. Yüksek zemin kat (~4.5 m) + **entresol** (alçak, kare pencere) + **1. kat (étage noble, en uzun pencereler ~1:2.2)** + 2. kat (daha kısa ~1:1.8) + attique (kare, küçük). Pencereler yukarı çıktıkça kısalır | [G ◐ doğrulanmalı] |
| 4 | Pencere başı | Düz dikdörtgen | **Eksik** | 18. yy Bordeaux: **basık kemerli (arc segmentaire) lento** + çıkıntılı **oyma kilit taşı (clé)**; denizlikte ince profil. Basık kemer yüksekliği = açıklık genişliğinin **~%12** (yarım daire değil, sivri hiç değil) | [G] |
| 5 | Maskaron | Pencere üstünde **ayrı yamuk levha** (asılı tabela gibi); konum rastgele (sol x~55 y~910, sağ x~950 y~990) | **Yanlış** | Maskaron **kilit taşının kendisidir**: cephe düzleminde, taşla aynı renkte, kabartma (ayrı çerçeve yok). Yalnız **1. kat** ve zemin kat kemerlerinin kilit taşında, ev başına 2–4 adet, aynı evde aynı motif. Yakın evlerde okunur boyda (40–60 px), uzakta yalnız kilit taşı çıkıntısı | [G] |
| 6 | Ferforje | Küçük balkonlar rastgele katlarda | **Kısmen** | **1. kat boyunca**: ya taş konsollara oturan sürekli balkon (zengin ev) ya her pencerede balkonet (pencere önü korkuluğu). Üst katlarda yalnız alçak korkuluk; zemin katta yok. Ferforje motifi kıvrımlı (Louis XV/XVI), düz çubuk değil | [G] |
| 7 | Panjur | Hemen her pencerede renkli dış panjur | **Fazla** | Klasik taş cephelerde iç kepenk yaygındı, dış ahşap panjur daha çok mütevazı evlerde/üst katlarda [G ◐ doğrulanmalı]. Öneri: panjurları %80 → **%30**, yalnız mütevazı evlerde ve attique'te; soluk gri-yeşil, renk çeşitliliği azalt |
| 8 | Saksı çiçekleri | Kırmızı sardunya noktaları | **Kural ihlali** | Kırmızı yalnız mühür/hata/vurgu (CLAUDE.md). Gece zaten okunmaz: **kaldır** ya da koyu yeşil yaprak yalnız |
| 9 | Çatı/saçak | Duvar tepesinde büyük yuvarlak kiremit ağızları (yakında ~40 px), korniş yok | **Yanlış ölçek** | Bordeaux: duvar **taş korniş** (profilli, 25–35 cm çıkıntı) ile biter; arkasında düşük eğimli tuile canal, sokaktan **neredeyse görünmez**. Kiremit ağzı en fazla korniş üstünde ince bir sıra, yakında ≤ 14 px. Bacalar kornişin gerisinde, kısa |
| 10 | Dükkânlar | VINS, CAFÉ, CHAPELIER, BOULANGERIE dikdörtgen vitrin, yazı alınlıkta | **Kısmen** | Zemin katta **basık kemerli açıklık** içinde ahşap dükkân cephesi (devanture), üstte boyalı alınlık yazısı (doğru), **kapanış için ahşap kepenk panoları** gündüz yan tarafta istiflenir. Yazılar elle boyanmış serif, altın/krem. Dükkân türleri: VINS (şarap), TONNELIER (fıçıcı), CAFÉ, CHAPELIER uygun | [G] |
| 11 | Réverbère | Sokağı kesen ip + ortada fener | **Doğru** | İpin bir ucu duvardaki **kilitli küçük demir kutuya** (makara + ip sarma) bağlanır; fener yakmak için indirilir [G]. Kutu eksik: sol duvarda, ip ucunda, 2.5 m yükseklikte ekle. **Doğrulanmalı:** Bordeaux'da 1834'te bu sokakta havagazı mı yağ lambası mı (Bordeaux'ya havagazı 1830'larda girmeye başlamış olabilir [G ◐]). Yağ lambası güvenli kalır |
| 12 | Duvar feneri (sol) | Konsollu fener | **Doğru ama gereksiz** | Tek ışık kaynağı kararı (réverbère) ile yarışıyor; özel bir ev/dükkân feneri olarak kalabilir ama **söndürülmüş** ya da çok kısık |
| 13 | AVIS ilanı | Duvarda dikey kâğıt | **Doğru** | Resmî ilanlar duvara yapıştırılırdı [G]. Kalsın; P21 ilanının kurulumu gibi okunur |
| 14 | Kaldırım | Yuvarlatılmış dikdörtgen taşlar, **ortada oluk**, yaya kaldırımı yok | **Doğru** | Haussmann öncesi: sokak ortasına eğimli, **orta oluk (caniveau central)**, yaya kaldırımı yok [G]. Taş tipi [G ◐ doğrulanmalı]. Oluk düz taşlarla çizilir, içinde ince su şeridi ay ışığını yansıtır |
| 15 | Saint-Michel | Sokak ucunda, direklerin tam arkasında, **nehrin içinde duruyor gibi** | **Konum yanlış** | Kule karadadır: **soldaki uzak evlerin çatılarının arkasından** yükselsin (taban görünmez, çatı çizgisinin arkasında kesilir), sokak eksenine değil sola kayık: x 430–500, tepe y ~470. Chappe direği kule boyunun **~%12–15**'i [G ◐]. Kollar DINLEN (gece). Külahsız kesik tepe [G ◐ doğrulanmalı] |
| 16 | Gemi direkleri | Sis içinde, sokak ucunda | **Doğru** | Vapur yok (çizmemek güvenli) |
| 17 | Café önü | İki tahta "tabure/bank" (kod: `TabureSira`, z 2.6 / 3.2, u 0.9) | **Anlamsız (kural ihlali)** | 9.2 |
| 18 | Alt üçte bir (y 1450–1920) | Boş kaldırım | **Ölü alan (kural ihlali)** | 9.4 |
| 19 | Tricolore | A2'de yok (A1'de vardı) | **Kullanıcı istiyor** | 9.3 |
| 20 | Replik altyazısı | ÜST bantta | Sahne planı kararı (ayak/ızgara ALT bantta) | Mekân açısından sorun yok: gök bölgesi sakin |

### 9.2 Café önü: karar

Seçenekler: (a) gece kapalı kafe, sandalyeler masalara ters kaldırılmış; (b) kepenk panoları kapalı; (c) dışarıda hiçbir şey.
**Karar: (c) dışarıda hiçbir şey, kafe açık ve içi ışıklı.** Gerekçe:
- 1830'larda dar, yaya kaldırımsız bir sokakta kafe önüne masa-sandalye koymak araba ve yaya yolunu kapatır; kaldırım terası ancak geniş caddelerde ve kaldırımlar yaygınlaştıktan sonra olağanlaşır [G ◐]. Sandalyeyi masaya kaldırma (a) da bir teras varsayar.
- Kafenin ışıklı vitrini sahnede **işlevli**: réverbère dışında ikinci sıcak dolgu, kaldırıma ve sağdaki su birikintisine ışık düşürür, "şehir yaşıyor ama sokak boş" duygusunu verir. (b) kapalı kepenk bu ışığı öldürür.
- Anlamı güçlendirmek için: kapı **aralık** (yere 15° açılı ışık şeridi düşer, x 760–860, y 1250–1420 civarı, tek yamuk, `#ffb357` α .18), alınlıkta CAFÉ yazısı kalır, kapının üstünde **asılı tabela** (enseigne en potence: demir kol + küçük kahve fincanı ya da yuvarlak levha silueti, 60 px) [G]. Pencerede 2 oturan **müşteri silueti** (yüzsüz, koyu, statik): ışığın kaynağını anlamlandırır, hareket etmez.
- Kaldırılan: `TabureSira` (iki bank). Yerine hiçbir eşya konmaz.

### 9.3 Tricolore: konum, ışık, rüzgâr

- **Nereden asılır:** resmî bir yapının cephesinden, **eğik bayrak direği (hampe) üzerinde** [G]. Eski kentte bir karakol (corps de garde) ya da mahalle polis komiserliği kapısı gibi küçük resmî yapı [G ◐ doğrulanmalı: 1834 Bordeaux'da hangi yapıların bayrak astığı]. Yapıya kimlik: kapı üstünde **okunmaz küçük taş/teneke levha** (yazı çizgisi, harf yok) + kapı yanında taş **nöbetçi kulübesi değil** (abartı), yalnız levha. Tricolore 1830'dan beri [CLAUDE.md].
- **Konum (P04 kadrajı):** **sol cephe**, ikinci ev (`EVLER_SOL` z 1.55–2.2), **1. kat hizası** (cephe v ≈ 0.42): direk dibi ekranda ~ (150, 760), direk duvardan sokağa doğru yukarı **35°** eğik, uzunluk ~ 230 px, direk ucu ~ (340, 630). Bayrak boyu ~ 200×140 px. Bayrak alanı x 140–360, y 600–800: ÜST-BANT (y 240–400) ve karakterlerin (x 430–700, y 900–1420) dışında, réverbère ipinin (y ~700–760) **solunda ve önünde** (ip ile kesişmez: ip z 2.3'te, bayrak z ~1.9 daha yakında; ip bayrağın arkasından geçer).
- **Şerit yönü (önemli):** bayrak **direğe kılıfla bağlıdır**; kaldırma kenarı (hoist) direk boyuncadır. Bu yüzden **mavi şerit direğe bitişik**, beyaz ortada, kırmızı direkten en uzak kenarda. Bayrak sarktığı için şeritler direğe paraleldir (Sb2Borsa'daki doğru kural: "mavi gönderde"). A1'deki bayrak şeritleri direğe dikti: **yanlıştı**.
- **Rüzgâr:** sahnedeki sis soldan sağa (+x) akıyor (`Sb2Sokak` `sis()`), bacadan duman sağa eğik. Bayrak sol cepheden sokağa doğru açıldığı için hafif rüzgâr onu **sokağın ortasına doğru (+x)** dalgalandırır: tutarlı. Genlik düşük (gece esintisi): dalga genliği bayrak boyunun **%6**'sı, hız 0.12 rad/kare (30 fps eşdeğeri), sis hızıyla uyumlu; bayrak çoğunlukla **sarkık**, uç kısmı açılır.
- **Işık ve gece okunurluğu:** anahtar réverbère (sağ-aşağıda, sokak ortası z 2.3) bayrağın **alt-sağ kıvrımlarını** amberle yakalar; ay üstten mavi kenar verir. Gece renkleri (doygunluk ~%70, renk ölçüm tablosuna uygun): mavi `#2c3d78` (gölgede `#1e2a55`), beyaz `#d8cfb8` (amber yanda `#e9cf9a`), kırmızı `#9a2a2a` (gölgede `#6e1e20`). Kırmızı "vurgu" kuralıyla çakışmaz: bayrak tek dönem işareti, **mühür kırmızısından daha koyu ve doygunluksuz**. Kumaş kıvrımında 2 koyu kıvrım çizgisi (KUMAS-KETEN, ince yün bayrak kumaşı). Direk: AHSAP-BOYALI koyu, uçta küçük pirinç topuz (ay ışığında tek parlama). Bayrak gölgesi cepheye, réverbère'in tersine (sol-yukarı) yumuşak düşer.
- **Hareket kuralı:** bayrak kadrajda baştan sona durur; P04 push-in'inde (`cx +60`) kadrajın solundan çıkabilir (fiziksel çıkış, fade yok).

### 9.4 Ölü alan (alt üçte bir, y 1450–1920)

Şu an boş kaldırım. Kural: alt bant önemli bilgi taşımaz ama boş görünmez. Uygulama (önem sırasıyla):
1. **Sol ön: TONNELIER dükkânının önü** (BOULANGERIE → TONNELIER, bölüm 3.3): kapı yanında **duvara dayalı bir fıçı** (z 1.15, u 0.06, ekranda ~ x 0–150, y 1500–1800, kenardan kırpık) ve kapının taş eşiği. Anlamlı: dükkânın ticaret işareti. Koyu, ayrıntısız, yalnız çember ve ay kenarı.
2. **Sağ ön: CHAPELIER kapısının taş basamağı + köşe taşı (chasse-roue)**: araba tekerleğinin duvarı sıyırmasını önleyen alçak taş babası [G], z 1.2, u 0.95. Anlamlı ve dönemli.
3. **Zemin derinliği:** orta oluğun ay ışığını yansıtan su şeridi y 1500–1920 boyunca sürsün (göz yolu karakterlere çıkar), ön planda bir **su birikintisi** réverbère'i yansıtsın (z 1.4, u 0.40, ~260×70 px).
4. Alt kenar degrade karartma (mevcut) korunur; bu öğeler degradenin içinde kalır.
Karakterleri öne almak (z 2.4 → 1.9) ölü alanı daha iyi çözer ama ayakları alt 420 px'e indirir (sahne planı A2 kararı); yönetmen kararı. **Küçük jest kuralı:** göz kırpma bu geniş kadrajda okunmaz (yüz ~100 px < 230 px); sahne planındaki p+144 sonrası push-in, yüz ≥ 230 px olacak kadar uzamalı (`cs` ≥ ~1.6 ya da kırpma). Yönetmen/motion.

### 9.5 BORSA: kemer tipi ve salon dili

**Sorun:** sol duvardaki üç pencere ve sağ kemerli giriş **sivri (gotik) kemer** gibi okunuyor. Kaynak kodda iki neden var (`doku/Mimari.tsx` `KemerliPencere`):
1. Kemer yüksekliği `kemerOran` pencere **yüksekliğinin** oranı (0.22) olarak verilmiş; pencere dar ve uzun olduğu için kemer yüksekliği açıklık genişliğinin yarısını aşıyor, yarım daire uzayıp sivrileşiyor (perspektif daraltma bunu artırıyor).
2. Kemer içine **tepe noktasından iki yana inen iki kayıt** (`bar(m(0.5,k), m(0.22/0.78,…))`) çizilmiş: bu "Y" biçimli taş tracery, gotik pencerenin imzası.

**Doğrusu:** Palais de la Bourse (Gabriel, 1742–1749) 18. yy Fransız klasik dili [D]: 
- Zemin kat ve büyük salon açıklıkları **yarım daire (plein cintre)** kemer: kemer yüksekliği = açıklık genişliği / 2, **metrik birimde** hesaplanır (perspektif eşlemesinden önce). Üst pencereler **basık kemer (segmentaire)**, yükseklik = genişlik × 0.12–0.15 [G].
- Kemer tepesinde **kilit taşı (agrafe)**, kemer başlangıcında yatay **imposte silmesi**, söve profili düz ve kalın.
- Doğrama: **küçük dikdörtgen camlı ızgara** (dikey ve yatay kayıtlar paralel; kemer içinde dikey kayıtlar yukarı devam eder). Tepeye yakınsayan kayıt yok. İstenirse kemer içi tek yatay kayıt (imposte) + 3 dikey kayıt.
- Salon dili: **pilastr + düz korniş + düzenli aks ritmi** (pencere-pilastr-pencere), simetri, açık taş, iç mekânda süs az. Mevcut iyonik başlıklı pilastrlar ve korniş bu dile uygun, kalsın. Gotik çağrışım yapan dar-uzun oran yerine pencere oranı **1:2** (genişlik:yükseklik, kemer dahil).
- **Ölü alan:** alt üçte bir (y 1450–1920) boş dama zemin. Tasarımdaki ön plan öğeleri karede yok: **sol önde sütun gövdesi** (x 0–140, y 1150–1920, bulanık, sıcak gölgede) ve **ön sağda ahşap korkuluk** (y 1560–1720 bandında, balüstrlü, bulanık, AHSAP-MESE) eklensin; ikisi de anlamlı (salonun mimarisi ve tüccarların yaslandığı bölme).
- **Bayrak:** Borsa'daki sarkık tricolore şerit yönü doğru (mavi gönderde). İç mekânda bayrak [G ◐ doğrulanmalı]; sokakta artık bir tricolore olduğu için Borsa'dakinin kalması isteğe bağlı. Öneri: **kalsın ama küçülsün** ve gölge tarafında kalsın (P04'teki ilk "okunan" bayrak olsun diye değil; P02 önce gelir: bu durumda P02'deki bayrak filmin ilk tricolore'u, P04'teki ikinci. İkisi de dönem işareti, tekrar sayılmaz: dokunuş değil).

### 9.6 Motion uygulama listesi (sırayla)

**`src/doku/Mimari.tsx`**
1. `KemerliPencere`: kemer yüksekliğini **açıklık genişliğinden** hesapla (`tip: "yarimDaire" | "basik"`; yarım daire: yükseklik = genişlik/2; basık: genişlik × 0.13), metrik birimde, perspektif eşlemesinden önce. `kemerOran` parametresini bu hesaba bağla ya da kaldır.
2. Tepe noktasından inen iki eğik kayıt (`bar(m(0.5,k), m(u, …))`) **kaldır**; yerine paralel dikey kayıtlar + kemer başlangıcında yatay imposte kaydı. Kemer tepesine kilit taşı (agrafe) çokgeni, kemer başlangıcına imposte silmesi.
3. Yeni `BasikKemerLento` (segmentaire lento + kilit taşı; isteğe bağlı `maskaron`) — Sokak cepheleri için.

**`src/bolumler/blanc/proto/Sokak.tsx` (`sehir="bordeaux"`)**
4. `TabureSira` **kaldır** (café önünde hiçbir şey).
5. CAFÉ: kapı aralığı + kaldırıma tek ışık yamuğu, kapı üstünde asılı tabela (potence), vitrinde 2 statik yüzsüz siluet.
6. `Maskaron`: yamuk levha çerçevesini kaldır; cephe düzleminde (cephe eşlemesiyle afin) **kilit taşı** olarak, taş renginde kabartma; yalnız 1. kat ve zemin kat kemerlerinde, ev başına 2–4, aynı evde aynı motif.
7. Cepheler: ev başına farklı korniş yüksekliği (±%8), ev sınırında köşe taşı/derz, kat hiyerarşisi (zemin yüksek + entresol + 1. kat uzun + 2. kat kısa + attique küçük), pencereler basık kemer lentolu; ev başına R+2 / R+3 (+ attique); 6 kat okunan evleri düşür.
8. Ferforje: 1. katta sürekli balkon (konsollu) ya da her pencerede balkonet; diğer katlarda yok/alçak korkuluk.
9. Panjur oranı %30, yalnız mütevazı evler ve attique; renk çeşitliliğini tek soluk gri-yeşile indir.
10. Sardunya noktaları (kırmızı) **kaldır**.
11. Saçak: büyük kiremit ağızlarını kaldır; profilli taş korniş + korniş üstünde ince tuile canal sırası (yakında ≤ 14 px), bacalar kısa ve geride.
12. Réverbère ipinin sol ucuna duvarda küçük kilitli demir kutu (ip makarası).
13. Sol duvar fenerini söndür ya da α ≤ .3 (tek ışık kararı).
14. Saint-Michel: `SM_X/SM_Y` sola, soldaki uzak çatıların arkasına; taban çatı çizgisinin arkasında kesilsin; direk kule boyunun %12–15'i; kollar DINLEN.
15. Tricolore (`Bayrak` bileşeni Bordeaux için yeniden): sol cephe, `EVLER_SOL[1]` 1. kat hizası, eğik hampe 35°, **mavi direk tarafında, şeritler direğe paralel**, rüzgâr +x, genlik %6, gece renkleri 9.3; kapı üstüne okunmaz resmî levha.
16. BOULANGERIE → TONNELIER; önüne duvara dayalı fıçı (z 1.15, u 0.06) + taş eşik. CHAPELIER önüne taş basamak + chasse-roue (z 1.2, u 0.95). Ön planda réverbère'i yansıtan birikinti (z 1.4, u 0.40). Orta oluk su şeridi alt kenara kadar.

**`src/bolumler/blanc/sb2/Sb2Borsa.tsx`**
17. Sol duvardaki üç pencere ve sağ giriş: yeni `KemerliPencere` (yarım daire, Y kayıt yok, agrafe + imposte), oran 1:2.
18. Ön plan: sol sütun gövdesi (x 0–140, y 1150–1920) + ön sağ balüstrlü korkuluk (y 1560–1720), ikisi bulanık.
19. Tricolore küçültülsün (%70), gölge tarafında kalsın (isteğe bağlı).

**Sahne planı/yönetmen (bilgi):** P04 göz kırpma için push-in sonunda yüz ≥ 230 px (Küçük jest kuralı).

### 9.7 Araştırmacıya ek sorular
15. 1834 Bordeaux eski kentinde (Saint-Pierre/Saint-Michel mahalleleri) tipik ev yüksekliği (R+2/R+3?), dış panjur yaygınlığı, cephelerin is ile kararması.
16. Bordeaux'da 1834'te sokak aydınlatması: yağlı réverbère mi, havagazı mı?
17. Eski kentte bayrak asan resmî yapılar (karakol/corps de garde, komiserlik, octroi bürosu) ve bayrağın kalıcı mı bayram günlerine özgü mü asıldığı.
18. Kafe terasının (kaldırıma masa) 1830'larda Bordeaux'da varlığı.
19. Palais de la Bourse iç salonunun 1830'lardaki kemer/pencere düzeni (yarım daire mi basık mı).
