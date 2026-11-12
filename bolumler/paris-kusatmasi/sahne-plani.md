# Sahne planı: Paris Kuşatması 1870 (yönetmen, 2026-11-11)

Girdi: onaylı `senaryo.md` / `senaryo-en.md` v5, `dokunuslar.md` (PK-D1…D8), `public/paris/ses/plan-sureleri.json` + `{tr,en}/P01–P11.json` kelime zamanları, `src/kit/KATALOG.md`. Çıktı: `bolum.json` (bu belgenin makine hâli, tek gerçek kaynak). 60 fps, 1080x1920, **3493 kare = 58.22 sn**, 11 plan, 4 mekân şablonu (+ HARITA). Doğrulayıcı: `node tools/bolum_dogrula.mjs bolumler/paris-kusatmasi/bolum.json --tam --temas bolumler/paris-kusatmasi/temaslar.json` → **GEÇTİ (0 hata, 1 uyarı: foley.json yok, kurgucunun işi)**. Temas listesi `temaslar.json` (49 temas, mutlak kare).

**Render durumu.** Şablonların dördü kitte YOK (`kit_eksik`); sahneler çizilemez. Yer tutucu kaydı `src/kit/sinirlar.json`'a `"kurulmadi": true` ile eklendi (doğrulayıcı bilinmeyen şablonu reddeder). Yalnız HARITA tabanı çizilebildi ve baktım: P06 f78 (iğne/Tours), P08 f164 (iğne/Tours), P02 f140 (taban harita; halka/tel yok, KE-PK-H1/H2). İkisinde kamera_takip kayması yüzünden "PARIS" etiketi sağ güvenli kenara taşıyordu: aynı turda düzelttim (P06 ekran x 470→400; P08 cs 2.0→1.8, ekran (460, 900)), yeniden baktım, okunuyor. Diğer 8 planın kamera/ölçek/konum değerleri **hesapla üretilmiş önerilerdir**; kurulum ekibi şablonu kurunca motion kalibrasyon karelerini render eder, okunmayan plan o turda düzeltilir (kural 7). Not: bu makinede `npx remotion still` için `--browser-executable=/usr/bin/google-chrome` gerekti (remotion.media'ya erişim yok). Render `gorsel_yazisiz` olduğundan yazı bantları kontrol karesinde görünmez; yazı konumları bant kurallarına göre hesaplandı, render'da doğrulanmadı.

## 1. Plan tablosu

Mutlak başlangıç = önceki planların toplamı. Süre = `plan-sureleri.json` (iki dilin uzunu + 0.4 sn, `round(sn·60)`), **değiştirilmedi**. Çekim ölçeği: geniş · boy · bel · göğüs · yakın · insert.

| Plan | Mutlak (kare / sn) | Süre (kare / sn) | Mekân | Çekim ölçeği ve değişim | Tempo | Dokunuş (okunurluk) | kontrol_kare (plan içi / mutlak) |
|---|---|---|---|---|---|---|---|
| P01 | 0 / 0.0 | 382 / 6.37 | PARIS-CATI cati, alacakaranlık | yakın (kuyruk+kılıf %17, cs 3.2) → geri çekilme cs 1.0 → geniş (çatılar, kuş %6) | hizli | yok (kanca; kılıf pırıltısı kurulum) | 24 / 24 |
| P02 | 382 / 6.37 | 356 / 5.93 | HARITA paris-çevre | geniş (halka %45) → push-in cs 1.15 (orta) → geri çekilme geniş | bekle | PK-D1 halka kapanır, tel kopar (halka %45, tel ≥10 px, net 1.5 sn) | 140 / 522 (+250) |
| P03 | 738 / 12.3 | 333 / 5.55 | MONTMARTRE meydan → (f160) HARITA | boy (balon %45, kamera sabit) → tilt → geniş harita cs 1.0→1.15 | hizli | PK-D2 hortumdan şişen kumaş (balon %45, net 1.6 sn) | 80 / 818 (+290) |
| P04 | 1071 / 17.85 | 267 / 4.45 | HARITA → (f122) DAGRON-INSERT kafes | geniş harita cs 1.15→1.3 → kafes insert, kuş %30 (yakın) | nefes | PK-D4 kafes kapağı, kuş yön arar (kuş %30, net 1.0 sn) | 206 / 1277 |
| P05 | 1338 / 22.3 | 374 / 6.23 | DAGRON-INSERT masa (Paris atölyesi) | orta (terazi cs 1.0) → push-in → yakın (şerit+parmak cs 2.0, cx -40, cy -610; ölçü bölgesi ekran (540,930)) | hizli, **anahtar** | PK-D5 sayfa şeride küçülür (sayfa %22, şerit+parmak %14, net 1.5 sn) | 280 / 1618 (+182) |
| P06 | 1712 / 28.53 | 287 / 4.78 | HARITA → (f168) MONTMARTRE (hale altında, `arka: "hale"`) | orta→yakın harita (takip cs 2.3) → boy hale altı (sepet+sandık %35) → bel | nefes | PK-D8 sandık sepete konur, sepet çöker (%35, net 1.3 sn) | 206 / 1918 (+78) |
| P07 | 1999 / 33.32 | 336 / 5.6 | MONTMARTRE gök → (f160) sepet | geniş (iki balon %50) → bel (sepet kenarı, torba %12) | hizli (patlama) | PK-D3 balast, kum torbası atılır (torba %12, net 1.8 sn) | 200 / 2199 (+112) |
| P08 | 2335 / 38.92 | 209 / 3.48 | HARITA (Fransa, rota ucu takibi) | orta (takip cs 1.8) → yakın (iğne) | hizli | yok | 164 / 2499 |
| P09 | 2544 / 42.4 | 218 / 3.63 | DAGRON-INSERT masa (Tours) | insert makro (kılıf %14, cs 1.6→2.0, cy -120; kılıf 278 px) | nefes | PK-D6 kılıf kuyruk tüyüne bağlanır (kılıf %14, net 1.1 sn) | 150 / 2694 |
| P10 | 2762 / 46.03 | 398 / 6.63 | PARIS-CATI kümes (gün) → (f60) LANTERN-ODA | yakın (kuş+el+kılıf, dolly cs 2.6→2.75, cx -380; kılıf 164–191 px) → orta-geniş (perde %55) → pan + göğüs/yakın (okuyan siluet) | bekle, **anahtar** | PK-D7 perdede büyüme ve odak (perde %55, net 1.1 sn) | 238 / 3000 (+48, 330) |
| P11 | 3160 / 52.67 | 333 / 5.55 | HARITA paris-çevre → (f172) PARIS-CATI kümes (alacakaranlık) | geniş harita → geniş→yakın (kuyruk+kılıf cs 3.2 = P01 f0) | nefes | yok (kapanış, döngü) | 270 / 3430 (+190) |

Dokunuş sayısı **8** (PK-D1…D8; kanca/kapanış hariç). Çıkarma sırası bütçe dar kalırsa: **D2 → D8 → D4**. Hiçbiri tekrar etmez; her biri kendi planında başlar ve plan sonundan ≥12 kare önce biter.

**Ritim.** Süreler (sn): 6.37 · 5.93 · 5.55 · 4.45 · 6.23 · 4.78 · 5.6 · 3.48 · 3.63 · 6.63 · 5.55 (üst üste 5 benzer yok). Tempo: hizli · bekle · hizli · nefes · hizli · nefes · hizli · hizli · nefes · bekle · nefes (üst üste üç aynısı yok). Dinlenme ≥1 sn: P10 EN'de anlatım f266'da biter, plan f398'e kadar akar (resim + müzik taşır); P10 okuma tutması 1.5 sn; P02 "kesti" sonrası ~0.7 sn sessizlik + kopan tel. Patlama: P07 "vuruldu" (f108).

**Anahtar planlar** (tutma = okuma + 1.5 sn, çevre geri çekilir): P05 (şerit+parmak ölçüsü f268–358, 1.5 sn) ve P10 (okuma f296–386, 90 kare = 1.5 sn). **Saklanan şey:** kılıfın içi bulanık (P01, P09), P10'da ip çözülünce şerit görünür; P07'de vurulan balonun sepet düşüşü kadraj dışında biter (görmediğimiz yere düşenin sesi yok).

## 2. Zaman çizelgesi (plan içi kare; TR f = s·60, EN ayrı yazıldığı yerde)

| Plan | Olaylar ve söze oturuşu |
|---|---|
| P01 | f0–24 kalkış çırpışı (ilk kare hareketli), kılıf pırıltı f6–40; f0–300 geri çekilme cs 3.2→1.0; ekran f8–300; kuş çıkış f275–330 (TR "çıkmalıydı" f316; EN "escape first" f238–282: ortak pencere); f330–374 boş çatılar; whip yukarı f374–382 |
| P02 | halka f8–132 (son işaret **f132 tık**); tel kopar **f138** (TR "kesti" f150, EN "telegraph" f120–150); uç sönümü f138–188; kalabalık dolumu f192–300; sayaç f196–262 ("iki milyon" TR f217–247, EN f183–215); ekran 1 f12–170; push-in cs 1.15 f140; geri çekilme f196–344 |
| P03 | şişme f6–104 (**gaz f8**, ağ f40/66/88, **oturma f104**); halat çözülür f108–116; yükselis f116–156 kadrajdan çıkar; **kesme f160** → harita: balon izi f164–214, rüzgâr f160–216, geri ok çizilir f214–228 ve süpürülür f228–246, yazı yığını f244–310 (**çarpma f290**; TR "Cevap" f236, EN f166: EN'de ~1.6 sn sessizlik, resim taşır) |
| P04 | harita kuş çizgisi f8–108; **kesme f122**; sepet iner (**temas f136**); kapak **f150**; yön arama f166–226; çıkış f226–244 (**kanat f232**); kapanış boş kafes f244–255 |
| P05 | terazi: deste kefesi iner f10–36 (**f36**), kuş çırpar f50–100 (**f60**); el girer f118; sayfa alınır **f140**, konur **f160**; kapak **f166**; sayfa çekilir **f182**; çekmece **f210**; şerit parmak yanına **f268** ("parmak boyuna" TR f268–304, EN "finger size" f267–305); ölçü net f268–358; el çekilir f340–358 |
| P06 | rota f0–62; iğne **f78**; kart f92–160; **kesme f168**; sandık oturur **f190**, hasır **f194**; Dagron biner f212–248 (ayak **f226**); halat gerilir **f262**; bit f268–272 |
| P07 | iki balon f0–158; duman çizgisi f84–108; **darbe f108** (TR "vuruldu" f110–130, EN "shot down" f87–125), gaz boşalır **f112**; sepet düşer f120–152; **kesme f160**; torba 1 **f196**, torba 2 **f214** (TR "kum" f201, EN "dumped" f192); sıçrama **f236**; halat **f246**; yükseliş f250–320 ("yükseldi" TR f267–297, EN f247–274); whip sol f328–336 |
| P08 | rota f0–150, balon iner f52–76 (**f76**), yatık sepet ikonu f70–90, iğne **f164** ("Tours'a vardı" TR f151–170, EN f144–166) |
| P09 | el kuşla girer f0–24; kılıf **f34**; ip sarılır f46–92; düğüm **f96**; deneme **f118**; pırıltı + net f122–190; salma **f194**; kuş çıkış f196–206 |
| P10 | kuş konar **f20**; kılıf çözülür **f48**; **kesme f60**; lamba **f68**, cam levha **f84**, bulanık kare f86–112, büyüme + odak f112–204 (mercek **f120**), net f204–270 (TR "büyüdü" f217–235, EN "grew" f148–175); memurlar yazar f206–248 (**f214**); zarf **f272**, zarf açılır **f290**; okuma f296–386 (TR "okudu" f341–360) |
| P11 | çizgiler f0–96, varanlar f60–110, şerit yağmuru f112–166 (**f130**); sayaç f100–166, dönüş f190; **kesme f172**; kuş iner f176–222 (**f222**), kanat toplar f222–262, pırıltı f250–290, tutma f290–333 |

**EN P10 boşluğu:** EN anlatımı f266'da biter (3. cümle "Paris read its mail" f184–252, görüntüde memurların yazma/zarflama anı). Plan f398'e kadar görüntüyle dolar: zarf kapıya gider, siluet açar, 1.5 sn okur. Görüntü TR'ye göre kurulu (TR "okudu" f341).

## 3. Taşıyıcı ve geçişler

Çıplak kesme **2** (P08→P09, P10→P11) + döngü kesmesi. Whip **2**, üst üste değil (P01 yukarı, P07 sol). Geri kalanı eşleşme/devam.

| Sınır | Tür | Taşıyıcı |
|---|---|---|
| P01→P02 | whip yukarı | kuşun yukarı çıkışı + ufuk; ses: kanat → kâğıt hışırtısı |
| P02→P03 | eşleşme (doku) | krem harita kâğıdı → krem kumaş yığını; ses: kâğıt → gaz fışşı |
| P03→P04 | aynı mekân devamı | HARITA kamerası cs 1.15 devam; kesik çizgi → güvercin çizgisi |
| P04→P05 | ses J-cut | kuşun kanat çırpışı P05'e taşar → kefe gıcırtısı |
| P05→P06 | eşleşme (şekil) | şerit (52°, 280 px, ekran merkezi ≈ (540, 930)) → rota çizgisinin ilk parçası (üstten kâğıt → harita) |
| P06→P07 | aynı mekân eşleşmesi | halat gerilmesi → iki balon kalkar (Dagron'unki solda; sağdaki balon P06'da uzakta kurulu) |
| P07→P08 | whip sol | balonun doğuya yönü → harita sağdan girer (iniş Paris'in doğusunda) |
| P08→P09 | **çıplak kesme #1** | zaman atlaması (9 gün); ses: iğne tak → kâğıt |
| P09→P10 | eşleşme (hareket yönü) | kuş P09'da sağa çıkar, P10'da soldan girer |
| P10→P11 | **çıplak kesme #2** | duygusal doruk → bedel; müzik cümlesi sürer |
| P11→P01 | döngü eşleşmesi | aynı kompozisyon (kümes + kuyruk + kılıf, cs 3.2): P11'de kuş konmuş, P01'de kalkıyor |

Plan içi kesmeler (`devam_plan`) taşıyıcıları JSON'da (`devam_plan.tasiyici`): P03 balon kadrajdan çıkar→harita ikonu; P04 çizgi→kuş yönü; P06 ses J-cut; P07 yükselme sürer; P10 şerit→huzme karesi; P11 çizgi ucu→kuş inişi.

## 4. Senaryo → parametre eşlemesi (kural 1) ve kit karşılığı

Ayrıntı her planın `not` alanında. Kitte karşılığı **olan** yalnız: HARITA `rota_noktalar`/`rota_ciz`/`kamera_takip`/`igne`/`harita_kart` (P06, P08), `sayac` ekran yazısı (P02, P11), `darbe` (P07, dönem diline uymuyor), `gecis: whip` (P01, P07), kelime kelime altyazı, `devam_plan`. Gerisi `kit_eksik`; "en yakınla doldurma" yapılmadı.

| Senaryo cümlesi | json karşılığı | kit |
|---|---|---|
| kuyruğunda bal rengi kılıf parlıyor (P01) | `kus.kuyruk_kilifi.parilti` | KE-PK-N3 |
| çatılar, pencerelerde ışık, siluetler dışarı bakıyor | `sehir.figurler`, `pencereler` | KE-PK-S1, F1 |
| Prusya işaretleri halka, tel kopar, uçlar kıvrılır (P02) | `halka`, `telgraf_teli` | KE-PK-H1, H2 |
| halkanın içi siluetlerle doluyor, dışı boş | `kalabalik` | KE-PK-H2, F1 |
| hortumdan şişen kumaş küre, halat çözülür, balon çıkar (P03) | `balon.sisme` … `yukselis` | KE-PK-S2, N1 |
| rüzgâr çizgileri, iz uçta biter, geri ok silinir | `ruzgar_cizgileri`, `balon_izi`, `geri_ok` | KE-PK-H3 |
| yazı yığını kesik çizgiyle halkaya gelir, çarpıp durur | `yazi_yigini` | KE-PK-H3, N6 |
| bırakılan güvercin çizgiyle kümese uçar (P04) | `guvercin_cizgisi` | KE-PK-H3 |
| kafes kapağı açılır, kuş yönünü bulur, kılıf yok | `kafes_kapak`, `kus.yon_arama` | KE-PK-S3, N2 |
| terazi: deste vs güvercin, kuş havalanamıyor (P05) | `nesneler.terazi` | KE-PK-N4, N2 |
| sayfa tek hamlede şerit, parmak yanına ölçü | `sayfa çekilir`, `serit`, `parmak` | KE-PK-N4, J1, F2 |
| Tours'ta bina, yazı yığını (P06) | rota + `tours_ikon` | kitte rota; ikon KE-PK-H4 |
| sandık sepete konur, sepet çöker, Dagron biner, halat gerilir | `sandik`, `sepet_coker`, `dagron_biner`, `halat_gerilir` | KE-PK-S2, N1, F2, J1 |
| iki balon, duman çizgisi, küre çöker, sepet düşer (P07) | `iki_balon`, `duman_cizgisi`, `kure_coker`, `sepet_duser`, `darbe` | KE-PK-E1, E4, N1 |
| eller torbayı bırakır, sepet sıçrar, yer küçülür | `torba_1/2`, `sepet_sicrama`, `yukselis` | KE-PK-J1, E4 |
| balonun ucu Paris dışında iner, Prusya rengi, gizli çizgi Tours'a (P08) | `prusya_bolgesi`, `balon_ikon_inis`, `gizli_segment` | KE-PK-H4 (rota kitte) |
| film ince kılıfa sarılıp kuyruk tüyüne bağlanır (P09) | `kilif`, `ip`, `eller` | KE-PK-N3, F2, J1 |
| kümes ağzı, el kılıfı çözer (P10) | `kumes`, `kilif_coz` | KE-PK-S1, N3 |
| huzme, bulanık kare, mercek halkası, büyüme, odak | `huzme`, `cam_levha`, `buyume_odak` | KE-PK-S4, N5 |
| memurlar yazar, zarflanır, kapıdakilere gider, biri açıp okur | `memurlar`, `kapi` | KE-PK-F1, N6 |
| çizgilerin çoğu yolda söner, birkaçı varır, film yağar (P11) | `kus_cizgileri`, `serit_yagmuru` | KE-PK-H5 |
| kılıflı güvercin kümese konar, P01 ilk karesi | `kus_iner`, final | KE-PK-S1, N2, N3 |

## 5. Kurulum → Karşılık (görsel)

| Kurulum | Plan | Karşılık | Plan |
|---|---|---|---|
| kılıf pırıltısı, içi bulanık | P01 | kılıf bağlanır, çözülür, şerit görünür, son kare | P09, P10, P11 |
| pencerede bekleyen siluetler | P01 | kapıda bekleyen siluet zarfı açıp okur (aynı siluet tasarımı) | P10 |
| halka (kalıcı) | P02 | balon dışarı çıkar, kuş çizgisi halkayı geçer, yazı yığını çarpar | P03, P04 |
| kuş kılıfsız, yön arar | P04 | kuş kılıflı döner | P09, P10, P11 |
| terazide kuş ağır yük taşıyamaz | P05 | şerit parmak boyunda | P05 |
| şerit 52° | P05 | rota çizgisi | P06 |
| sepette sandık + dış kenarda torbalar, sağda ikinci balon | P06 | torba atılır; ikinci balon vurulur | P07 |
| ağır sandık sepeti çökertir | P06 | hafifletme (balast) | P07 |
| Tours işareti | P06 | iğne Tours'a | P08 |

## 6. Fizik ve süreklilik kontrolleri

- **Yön:** kuş her zaman soldan sağa/aşağıdan yukarı (Tours güneybatıda, Paris kuzeydoğuda): P04 çıkış sağ-üst, P09 çıkış sağ, P10 giriş sol, P11 iniş soldan. Balonlar doğuya (sağa): P03, P07, P08. Dagron'un balonu P06–P07'de solda, öteki sağda.
- **Süreklilik:** sağdaki ikinci balon P06'da küçük de olsa görünür (P07 vurulması); kum torbaları P06 sepet kenarında asılı (P07 karşılığı); kuş P04, P05'te kılıfsız, kılıf yalnız P01, P09–P11; Dagron'un eli koyu sepya manşet (P05, P06, P07, P09), Paris'teki memur/el gri (P10); balon küresi krem, kehribar yok.
- **Giriş/çıkış:** el P05 sağdan, P09 sağdan girer (kuş avucunda, birden belirmez); kuş P10 soldan girer; torbalar kadrajdan çıkar; vurulan balonun sepeti kadraj altından çıkar; fade ile kaybolan nesne yok (geri ok süpürülür, yolda biten çizgi kâğıda emilir ama iz kalır).
- **Ayak/temas y:** P03 meydan siluet ayakları y ≈ 1420–1490, P06b hale altı Dagron ayağı 1275 / sepet tabanı ≤ 1498 (≤ 1500); insert planlarında ölçü/bırakma noktaları ekran y ≈ 930 (alt bant 1290 üstü); P10 perde alt kenarı y ≈ 1468, odak merkezi y 700–1000 (altyazı bandı 1290–1490 yalnız perde alt satırlarını örter, dokunuşu örtmez); P02 kopma noktası (293, 548), halka üstü y 470 (> 400 bant). Ekran yazıları 240–400 bandında, kılıf/dokunuş üstüne binmez.
- **Ölü alan yok:** her planın alt üçte biri `alt_ucte_bir` alanında.
- **Gece/telgraf kuralı** (Chappe) bu bölümü ilgilendirmez; 1870 Paris Haussmann SONRASI (krem taş, mansard, baca kümeleri; Sacré-Cœur ve Eyfel yok).
- **İmza nesnesi tekil:** bal kehribarı yalnız kılıfta. Senaryo P05'teki "film kenarı bal rengi ışık verir" notu **uygulanmadı** (`dokunuslar.md` imza kuralı: kutu/şerit kehribar değil).
- **gait yok:** Bu bölümde yürüyüş yok (Dagron sepete tırmanır, kuş uçar); `ayak_kayma` ölçümü gerekmiyor.

## 7. kit_eksik listesi (tasarımcı → mekân sorumlusu → motion)

Şablon sözleşmesi (görünümler, kamera sınırları) `src/kit/sinirlar.json` yer tutucusunda; nesne/animasyon taslağı her planın `parametreler`inde.

| Kimlik | Eksik | Plan |
|---|---|---|
| KE-PK-S1 | **PARIS-CATI** (cati geniş alacakaranlık + kümes yakın gün/alacakaranlık; Haussmann sonrası krem taş, mansard, baca kümesi; Blanc SOKAK kiti yanlış dönem) | P01, P10, P11 |
| KE-PK-S2 | **MONTMARTRE** (meydan, gök, sepet kenarı; balon biçimi/ağ/sepet kaynaksız, nötr) | P03, P06, P07 |
| KE-PK-S3 | **DAGRON-INSERT** (masa tepe-önden: terazi, kutu, şerit; Tours masası; kafes + sepet). MASA-INSERT masası/KolEl yeniden kullanılabilir mi: kurulum ekibi | P04, P05, P09 |
| KE-PK-S4 | **LANTERN-ODA** (karanlık oda, huzme, perde, memur masaları, kapı). Maliyet dar kalırsa P10 perde görünümü DAGRON-INSERT'e alınabilir | P10 |
| KE-PK-H1 | HARITA `paris-cevre` görünümü (Île-de-France ölçeği, halka %45; mevcut haritada Paris 35 px) + Fransa görünümünde küçük halka | P02–P04, P06, P08, P11 |
| KE-PK-H2 | Halka kapanır, telgraf teli kopar + uç sönümü, kalabalık siluet dolumu (D1) | P02 |
| KE-PK-H3 | Balon izi, rüzgâr çizgileri, geri ok süpürülür, yazı yığını + kesik çizgi + çarpma, güvercin çizgisi + kümes ikonu | P03, P04 |
| KE-PK-H4 | Tours ikonu + kâğıt yığını, Prusya bölgesi rengi, balon/yatık sepet ikonu, kesikli ikinci rota segmenti, rota etiketi çizgiyle kesişmez (P08'de çizgi "PARIS" etiketini ortadan geçiyor) | P06, P08 |
| KE-PK-H5 | Güvercin çizgileri (yolda biten/varan), film şeridi yağmuru, büyüyen yığın | P11 |
| KE-PK-F1 | Yüzsüz siluet figür seti (pencere, kalabalık, yükleyici, memur, kapıdaki); kitte karakter kaydı yok | P01, P02, P06, P10 |
| KE-PK-F2 | Dagron: sırt + koyu sepya manşetli el (tutarlı) | P05–P07, P09 |
| KE-PK-N1 | Balon: küre, ağ, halat, sepet, hortumdan şişme morfu (D2), çökme, balast torbaları | P03, P04, P06–P08 |
| KE-PK-N2 | Güvercin (nötr gri; gövde dönüşü, kanat), kafes, çatı kümesi | P01, P04, P05, P09–P11 |
| KE-PK-N3 | Kuyruk kılıfı (İMZA, bal kehribarı yarı saydam) + pırıltı + film şeridi + ip/düğüm/çözülme | P01, P09–P11 |
| KE-PK-N4 | Terazi, mektup destesi, mercekli kutu, çekmece, küçülme morfu (D5) | P05 |
| KE-PK-N5 | Magic lantern: huzme, cam levha, mercek, perde, büyüme/odak morfu (D7) | P10 |
| KE-PK-N6 | Zarf/mektup/yazı yığını, memur masası, kâğıt | P03, P10 |
| KE-PK-J1 | Jestler: sayfa alma, kapak kaldırma, ip sarma, düğüm, torba bırakma, sepete tırmanma (kitte `bin` yalnız SARAYBURNU demeti) | P05–P07, P09 |
| KE-PK-E1 | Darbe dönem diline: delinen kumaş, kısa alev + gri-kül duman, gravür taraması (turuncu yok); kit `darbe` yalnız yer tutucu. JSON'da `duman: false` (kit duman 150 kare, kesmeyi aşar) | P07 |
| KE-PK-E2 | `asiliNesne` render kanıtı yok (kural 5): sepet halatı, kafes tüneği, balon ipi | P04, P06, P07, P09 |
| KE-PK-E3 | `sayac.donus` çok parçalı satır (" · " kırılımı), `harita_kart` yön "sag" ve HARITA yazı katmanının görünüm içi yerleşimi render'da doğrulanmadı | P06, P11 |
| KE-PK-E4 | Balon yükseliş parallax (arka plan küçülür, `kamera_H`; menzil çizgisi YOK, açık soru) + sepet planında `kamera_dil` ile çakışmama | P07 |

Doğrulayıcı notu (araç sahibi): `KATALOG.md` "KT ekleri" kontrolleri (sayaç, darbe/iğne teması, whip, kart, altyazı json) `bolum_dogrula.mjs`'de henüz yok. Eksik olanları ben yazmadım; bunun yerine `animasyonlar` listelerindeki her bitişin plan sonundan ≥12 kare önce olduğunu, devam_plan kesmesinden önce bittiğini, kontrol karelerinin plan içinde olduğunu ve toplam sürenin `plan-sureleri.json` ile birebir aynı olduğunu kendi betiğimle denetledim (geçti).
Sayaç ekran yazısı `metin` TR dizgesi + `en` biçiminde yazıldı (`{tr,en}` nesne biçimi doğrulayıcıyı çökertiyor: `[...yz.metin]` nesnede iterable değil; araç sahibine not).

## 8. Kullanıcıya açık sorular (varsayılan seçildi, açıkça yazıldı)

1. **Döngü (P11→P01):** P11 son karesinde kuş kümese konmuş (kanat toplu, kılıf parlıyor); P01 ilk karesinde aynı kompozisyonda kuş kalkış çırpışında (ilk kare hareketli = kapak). Kuş konup yeniden kalkıyor. Varsayılan bu. Alternatif: P01 f0'da kuş tünekte hareketsiz (ilk kare hareketsiz kalır).
2. **P10 "P01'deki bekleyen siluetlerle aynı kadraj":** P01'de siluetler pencerede, P10'da kapıda; birebir aynı kadraj kurulamaz. Aynı siluet tasarımı kullanıldı. Yeterli mi?
3. **P05 "film kenarı bal rengi ışık":** uygulanmadı (imza yalnız kılıfta). Onay?
4. **P11 sayaç:** 0 → "60.000+ MESAJ" sayar, sonra "ON BİNLERCE MESAJ ULAŞTI · KAYNAĞA GÖRE 60–150 BİN". 60.000 kaynak aralığının alt sınırı; "on binlerce"ye uyuyor mu, yoksa sayaçsız statik yazı mı?
5. **P02 sayaç:** anlatım "iki milyon" derken ekranda 2.000.000 İNSAN sayar (rakam, tamamlayıcı). "İKİ MİLYON İNSAN" yazıya dönüşü anlatımı tekrar edeceği için kullanılmadı.
6. **P08:** ayrı gök planı kesildi (3.48 sn, tek harita planı); "sepet yamaçta yatık" harita ikonu olarak. Yeterli mi?
7. **Ekran yazısı:** "≈66 BALON" → "~66 BALON" ("≈" font dışı glif uyarısı veriyordu).
8. **Mekân sayısı:** 4 mekân + HARITA. LANTERN-ODA yalnız P10'da (tek plan); kurulum kotası dar kalırsa P10 perdesi DAGRON-INSERT içine alınabilir (tasarımcıya not).

## 9. Yukarı akış düzeltmesi (mekanlar.md §7 uygulaması, 2026-11-12)

Zamanlama, plan süreleri, temaslar (`temaslar.json`) değişmedi; yalnız kamera/konum/ölçek. Doğrulayıcı: GEÇTİ (0 hata, 1 uyarı foley).

| Plan | Eski | Yeni | Gerekçe |
|---|---|---|---|
| P01 | `ufuk_y` 1000, saf zoom | `ufuk_y` **739**, `kamera_modu: dolly`, `kilif_kilit [540,960]` | dekor ufku; cs = kamera mesafesi; P01 f0 = P11 son kare ±0 px |
| P10a | cs 1.8→1.9 (kılıf 76 px) | cs **2.6→2.75, cx −380, cy 0** (kılıf 164–191, el 433–505 px) | çözme anı okunsun |
| P10b | cx −420/−440 | cx **−1250 (f290) → −1345 (f398)**, cs 1.6→1.7 | okuyan dekor x 1390; pan f250–290 |
| P05 | son cs 1.6, cx −95, cy −420 | f268–374 **cs 2.0, cx −40, cy −610**; terazi (380,1000), deste (330,1400), kutu (720,1080) 519 px, ölçü bölgesi (560,1250); şerit 280 px, parmak 328 px ekranda | ölçü karesi (540,930), P06 rota eşleşmesi |
| P09 | cs 1.6→2.2, cy −300 | cs **1.6→2.0, cy −120** (kılıf 278 px) | tasarım ≈270 px |
| P06b | `meydan`, ikinci balon x 900–1050 / y 700–1150 | **`yukleme` + `arka: "hale"`** (Gare d'Orléans halesi, tur-9); ikinci balon (Daguerre) sepet (888,937), küre (888,687) ø 246; cy 0/−100/−210 | ufuk–ölçek (Z 36.7 m); kalkış yeri araştırma Ek E3 |
| P07 | "sis", menzil çizgisi | hava perspektifi (3 ton), `gok_kamera_H` 60→140 m, `sepet_kamera_H` 150→300 m (f250–320), menzil çizgisi yok | tasarım sis yasağı; açık soru 3 varsayılanı |
| P03 | — | `kalabalik: 6` | mekanlar §7.9 |
| P04b | cs 1.3→1.55, cy −40 | değişmedi (zaten uyumlu) | §7.10 |

## B turu düzeltmeleri (yönetmen, 2026-11-12; kamera/parametre, zamanlama aynı)
- **P03:** toprak zemin (yalnız bu planda), kazıkçı + bağlama halatı (f112 failli), kalabalık 3+3, `ufuk_y 1304`; yükseliş ~5× zaman sıkıştırması **kabul** (tur-9 varsayılanı); f0–45 sağ üst gök → `lint.izin` (balon şişmeden önce, tur-9 varsayılanı).
- **P06b / P07:** `arka: "hale"`, `isik: "haleSabah"` (§2v2-H). P06b cy 0/−100/−210 (taban ≤ 1498); Dagron sol-arka (128,1275), biniş (175,920); yükleyiciler sepetin arkasında; Daguerre (888,687) ø 246 + asma halatı; ön plan posta çuvalı; "halat gerilir" = bağlama halatı. Taşıyıcılar: "hale yankısı", "aynı hale ağzı".
- **P07 doğruluk (E3.1, varsayılan uygulandı):** "küre çöker, sepet kadraj altına düşer" → küre **kısmen söner**, sepet **serbest düşmez, hızla alçalır** (hız eğrisi) ve f152'de alt kenardan çıkar; kare ve süre aynı. Darbe (712,687); duman kaynağı ufuk buğusu (dekor (1150,935)); darbe parlaması `lint.izin` (tur-8).
- **Doğu yönü (açık):** P07 A'da yön belli eden öğe yok; `tasiyici.cikis` "doğuya (sağa)" değişmedi. Kamera 161°'ye bakınca doğu solda kalır; çelişki orkestra/kullanıcı kararı bekliyor.
- Senaryo `[GÖRSEL]` "meydanda sepet" → "hale altında sepet": **senarist** sahibi, bu turda değiştirilmedi (metin/ses aynı).
- Render yok (şablon kodu henüz yok): ilgili planlarda `lint.not = "B turu kamera, render motion sonrası"`.
