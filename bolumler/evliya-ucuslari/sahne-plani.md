# Sahne planı: Evliya Uçuşları (yönetmen, 2026-11-08)

Girdi: onaylı `senaryo.md` / `senaryo-en.md` v2, `dokunuslar.md`, `public/evliya/ses/plan-sureleri.json` + kelime zamanları. Çıktı: `bolum.json` (bu belgenin makine hâli; tek gerçek kaynak). 60 fps, 1080x1920, **3774 kare = 62.9 sn**, 14 plan, 4 mekân şablonu (hepsi kitte YOK, `kit_eksik`).

**Kontrol kareleri RENDER EDİLEMEDİ.** Yeni şablonlar kitte olmadığı için kural 7 (kamera/ölçek/konum değiştirince kendi render ve bakış) uygulanamadı. Kamera, ölçek ve x/y değerleri hesapla üretilmiş **önerilerdir**; kurulum ekibi şablonu kurunca motion kalibrasyon karelerini render edip eleştirmenle birlikte ayarlayacak. Okunmayan plan o turda aynı kuralla düzeltilir.

Koordinat dili: `x,y` = dekor px (kamera öncesi 1080x1920 taban), `kamera.cs/cx/cy` = ölçek / ekran kayması (cy+ içerik aşağı kayar = kamera yukarı bakar), `el.*` = ekran px. Güvenli alan: üst 220, alt 420 (y ≤ 1500), yanlar 80; yazı bantları üst 240-400, alt 1290-1490.

## 1. Plan tablosu

Mutlak başlangıç = önceki planların toplamı. Süre = `plan-sureleri.json` (iki dilin uzunu + 0.4 sn), **değiştirilmedi**.

| Plan | Mutlak (sn) | Süre | Şablon / görünüm | Çekim ölçeği ve değişimi | Kamera | Ana eylem (TEK) | Dokunuş | Temas / foley kareleri (p) | kontrol_kare | Alt üçte biri |
|---|---|---|---|---|---|---|---|---|---|---|
| P01 | 0.0-5.6 | 336 | SARAYBURNU kıyı gece → (p176 kesme) GALATA-TEPE gün | A: boy/orta (binici+demet %36) → tilt takip; B: boy (siluet %22) → yavaş push | A cs 1.25→1.0, cy 0→500 (köşk kubbe sırtı p0'da ekran y≈427); B cs 1.0→1.25 | A: kıvılcım fitilde, fişek yükselip kadrajdan çıkar; B: Hezarfen kapıdan sekide çıkıntıya yürür | (döngü, dokunuş sayılmadı) | fitil-tiss 0 · puskurme 40 · fisek-kalkis 72 | 100 (+0, 230) | rıhtım taşı, fitil+kıvılcım, yardımcı bacakları; tilt sonrası denizde şenlik yansıması |
| P02 | 5.6-11.0 | 324 | SARAYBURNU köşk gece | geniş; push-in cs **0.9→1.05** | lineer | şenlik fişeği yükselip patlar; pencerede padişah siluet sabit | - | senlik-patlama 62, 205 (merkez y 150-250, köşkün arkasında) | 80 | rıhtım ön yüzü, deniz (şenlik yansıması), sol uçta ışıklı küçük grup + demet (P03 kurulumu, ekran y≈1344-1448) |
| P03 | 11.0-15.2 | 252 | SARAYBURNU kıyı gece | orta-boy; cs 1.15→1.3 | inout | Lagâri demete biner ve oturur | - | ayak-tahta 44 · oturma-tahta 92 | 100 | rıhtım taşı, fitil hattı, meşale ışık havuzu, yardımcı bacakları |
| P04 | 15.2-20.1 | 294 | SARAYBURNU kıyı gece | bel/göğüs; cs 2.5→2.7 (yüz %11-12) | inout | Lagâri köşke seslenir, elini indirip tutunur | - (EV-Y1 yedek kullanılmadı) | tutunma-tup 158 | 36 (+158) | demetin barut tüpleri, oturak, eller (y 1300-1500) |
| P05 | 20.1-23.6 | 210 | SARAYBURNU kıyı gece (geniş) | geniş/boy (yardımcı %33 ön planda); demet DİK yükselir, p112'den tilt | **cs 0.9**, cy 0→220 (p112-198) | fitil tutuşur (p56'da tükenir), fişek dik kalkar, püskürme P06'ya kesintisiz | **EV-D1** p56-134 | fitil-tiss 30 · puskurme 56 · kumas-hisirti 60 · baslik-inis 110 · fisek-kalkis 112 | 78 (+0, 110, 204) | rıhtım, Y1/Y2 bacakları (ayak ≤ 1485), yuvarlanan başlık y 1322, kömürleşmiş fitil kalıntısı; tilt'te kıyı aşağı kayar |
| P06 | 23.6-28.6 | 300 | SARAYBURNU kıyı gece (geniş → köşke push-in) | geniş (P05 sonuyla AYNI kadraj, p0-150) → push-in p150-230 | cs 0.9→**2.5**, cx 0→-735, cy 220→600 | Lagâri+demet birlikte havada, bırakma p46, kanat açılır, boş demet yakına düşer ve sola sürüklenip kadrajdan çıkar, Lagâri köşkün önüne süzülür (olcek 0.12, ≤3x), kanadı çözüp yüzer; **kanat suda kalır**; basamak/el yok | **EV-D2** p40-130 | kanat-hisirti 44 · birakma-tik 46 · su-dump 100 · buhar 102 · su-sap 215 · su-yatma 236 (kanat) | 76 (+0, 215, 290) | p0-150 rıhtım + Y1/Y2, demet halkası/buharı; p150+ köşk tabanı + su + yüzen Lagâri (sarık en açık leke, halka, 3 dalga izi) |
| P07 | 28.6-32.4 | 228 | SARAYBURNU insert gece | insert/orta-boy, eğilmiş Lagâri (**kanatsız**); cs 1.0 sabit | lineer | kese avuca düşer, Lagâri doğrulur | - | islak-el 0 (basamak) · kese-singir 68 | 72 (+0, 130; ayna çifti P11 p72) | rıhtım taşı y 1300-1500, ıslak ayak izi, damlalar |
| P08 | 32.4-36.6 | 252 | GALATA-TEPE gün | geniş → göğüs (p36) → ayak/taş (p40-52) → dikey takip (taş %10) → yukarı → göğüs | cs 1.0→1.9→2.0→1.95 | Hezarfen taşı iter, taş düşer, ufka bakar | **EV-D3** p36-232 | tas-surtme 40 · tas-kayma 44 · uzak-tik 148 | 100 (+0, 148, 216) | kule taşı, akan duvar ve çatılar, kule gölgesi |
| P09 | 36.6-41.3 | 282 | BOGAZ panorama gün | geniş; yatay pan | cs 1.0, cx 500→-500 (dekor x -540…1620; kule x 100, iniş (1250,1170)) | Hezarfen atlar, derinlikle büyüyerek süzülür (10→70→130 px), Üsküdar meydanına iner | **EV-D4** p112-195 | marti-cigligi 120 · kanat-hisirti 125 · inis-toprak 238 | 150 (+0, 238) | Boğaz suyu, ön plan martı, iki kıyı |
| P10 | 41.3-46.2 | 294 | SARAYBURNU köşk gün (P02 ile aynı kadraj p0, cs 0.9) | geniş (p0-24) → push-in p24-66 cs 0.9→**2.4** (son kare cx -28, cy 420); büst ≥ %12 | inout | padişah siluet başını Üsküdar yönüne çevirir | - | (yok) | 120 (+0) | kesme taş çifte kemerli altyapı (kemer tepeleri, dekor y 920-1185); rıhtım/deniz cs 2.4'te kadraj dışı |
| P11 | 46.2-50.2 | 240 | SARAYBURNU insert gün (P07 ile aynı kadraj, ışık ters: güneş soldan, gölgeler sağa) | insert/orta-boy, baş kadraj dışı; cs 1.0 sabit | lineer | kese avuca konur, omuza el iner, kese düşer, sikke yatar | **EV-D5** p104-214 | kese-singir 42 · omuz-tok 104 · kese-yere 140 · sikke-donme 144 · sikke-tin 208 | 128 (+42, 72 ayna çifti P07 p72, 98 muhafız gölgesi omuzda, 208) | rıhtım zemini, kese, sikke, ayaklar |
| P12 | 50.2-53.8 | 216 | SARAYBURNU iç gün | bel → göğüs push-in cs 1.8→2.6 → 2.2 | inout | padişah pencere kanadını kapatır, ışıktan döner, kapıyı gösterir (kapı x 60-352) | **EV-D6** p4-110 | pencere-tok 30 · mandal-tik 34 · ortam-kisma 30 | 66 (+0, 150) | kaftan + göğüsteki ışık şeridi, bandın havadaki devamı, pencere altı duvarı (zemin/minder kadraj dışı) |
| P13 | 53.8-58.8 | 300 | KITAP-INSERT (rahle) | insert (çizim %16) → geri çekilme cs 2.2→1.0 | inout | kitap geri çekilir, üç defter açılır, sayfalar boş | - | defter-ac 146, 164, 182 | 190 (+60) | hat satırları → rahle tablası, kalemdan/hokka, zeminde açık defterler (y 1150-1476) |
| P14 | 58.8-62.9 | 246 | KITAP-INSERT | geniş → insert: fişek çizimine push-in cs 1.0→4.6 | inout | kıvılcım çizimin fitilinde yürür (P01'e eşleşen kesme) | - | fitil-tiss 110 | 170 (+234) | sayfa dokusu, çizimin fitil çizgisi |

Dokunuş sayısı **6** (EV-D1…D6), hiçbiri tekrar etmez, her biri kendi planında başlar/biter. `DOKUNUS-KUTUPHANESI.md` güncellemesi bu görevde yapılmadı (sahibi orkestra).

Kıvılcım P01 ve P14'te senaryonun döngüsüdür, dokunuş sayılmadı. Dokunuşsuz planlar: P01, P14 (kanca/kapanış), P02, P03, P07, P10, P13 (bilinçli boşluk, dokunuslar.md) ve P04 (EV-Y1 yedek kullanılmadı).

## 2. Kaydırma tablosu (toplam kare sabit: 3774 = 62.9 sn)

Senaryo v2 toplamı 61.0 sn idi; gerçek ses + 0.4 sn kuyruk 62.9 sn verdi. Süreler `plan-sureleri.json`'dan alındı, yönetmen değiştirmedi. Plan içi kaymalar:

| Konu | Doc/senaryo | Şimdi | Gerekçe |
|---|---|---|---|
| P01 kesme | 3.2 sn | p176 (2.93 sn) | EN "Another" 2.96, TR "Bir başkası" 2.62: iki dilde ikinci cümleye denk gelir. Fişek p150'de kadrajdan çıkar, kesme hareket ortasına gelmez |
| EV-D1 (P05) | p62-140 / 240 kare | p56-134 / 210 kare | Plan 3.5 sn; "fırlatıyor" TR p125, EN p127. Kalkış p112 (doc açık sorusu 1: başlık yerdeyken) |
| EV-D2 (P06) | p28-120 / 300 | p40-130 / 300 | "kanatlarını açıyor" TR p56, EN "wings open" p50. İniş p215: TR "denize" p209-230, EN "pavilion" p178-222 |
| EV-D3 (P08) | p48-215 / 240 | p36-232 / 252 | Plan 4.2 sn; "tepesinde" TR p163, kamera yukarı dönerken |
| EV-D4 (P09) | p112-195 / 270 | p112-195 / 282 | Aynı. Atlayış p56-76 (TR "atlıyor" p48-81; EN "he jumps" p100, görüntü 0.7 sn önde, tek görüntü) |
| EV-D5 (P11) | p84-205 / 270 | p104-214 / 240 | "Ama sonra" TR p104, EN "But" p100 omuz vuruşuna denk |
| EV-D6 (P12) | p20-125 / 210 | p4-110 / 216, ses.kare 24 | Kanat kapanışı sözden önce biter (0.4 sn nefes, "karar önce görülür") |

Bitiş payı (kural 2): en geç animasyon P06 p288 (300-12), P14 kıvılcım p234 (246-12), P05 p198 (210-12); doğrulayıcı hepsini kabul etti.

## 3. Senaryo → parametre eşlemesi (kural 1), kritik cümleler

| Senaryo cümlesi | json karşılığı | Kit |
|---|---|---|
| "Kıvılcım fitilde ilerliyor" (P01) | `fitil {0-40}`, temas fitil-tiss p0 | KE-E1 |
| "kanatları belirsiz siluet kenara adım atıyor" | `devam_plan` hezarfen `yuru` 196-262, `kanat acik:0` | KE-K2, KE-P2 |
| "Padişahın sırtı/siluet pencerede, yüz yok" | `padisah siluet:true, yuz:null` | KE-K3 |
| "Barut dolu tüplerden demet, kol sayılmaz" | `fisek-demet` (nötr) | KE-P1 |
| "Lagâri demetin üstüne oturuyor" | `bin` jesti + `poz oturan` | KE-J1, KE-K6 |
| "elini kaldırıyor, sonra tutunuyor" | `isaret aci -150` p10-70, `tutun` p125-160 | KE-J2 |
| "Meşale fitile değiyor… ateş püskürerek yükseliyor" | `mesale` yol, `fitil 30-56`, `puskurme`, demet yolu p112+ | KE-P7, KE-E1 |
| "Ateş sönüyor, iki sade kanat açılıyor" | `puskurme sonuk`, `kanat-ac` p40-58 (yapı belirsiz) | KE-J3 |
| "şap diye iniyor, kafası sudan çıkıyor, yüzüyor" | `ucus` → su-sap p215, `islak` p232+, yüzme p222-288 | KE-J4, KE-J10 |
| "Islak Lagâri eğiliyor, el kese uzatıyor, avuca düşüyor" | `egil`, `el` veren + alan, kese `tut` bit 68 | KE-J5, KE-K5 |
| "tepe galerisi, kurşun gri külah, kanatlar sade" | GALATA-TEPE `kule.kulah kursun-gri-notr` | KE-S2 |
| "Hezarfen atlıyor ve süzülüyor, rota çizgisi" | `ucus` p56-238, `rota_cizgi 70-130` | KE-J4, KE-E6 |
| "P02'deki köşk aynı açıdan, gündüz" | `ayni_kadraj_p02`, cs 1.0 p0 | KE-S1 |
| "kese avuca düşer düşmez arkadan muhafız eli omza iner" | el3 `muhafiz` p104; omuz y≈800 | KE-K5 |
| "Padişah pencereden dönüyor, yüzü gölgede, eli kapıyı gösteriyor" | `don` p60-100, `isaret` p130-170, `yuz.golge` | KE-J11 |
| "Kitap geri çekiliyor, öteki defterler açılıyor, boş" | kamera p100-200, defter `acik` 146/164/182, `bos` | KE-P8 |
| "çizimin fitilinde kıvılcım, P01'e eşleşen kesme" | `kivilcim` p110-234, `son_kare` P01 p0 | KE-E1 |

Kitte karşılığı olmayanların hepsi `kit_eksik` kimliği taşır; "en yakınla doldurma" yapılmadı.

## 4. Fizik, süreklilik ve yazı kontrolleri

- **Yön tutarlılığı:** köşk her zaman **sağda**. Lagâri sağa bakar (yon 1), yardımcılar demetin **solunda**; uçuş, süzülme ve P09 sol→sağ (Galata→Üsküdar). Veren el P07/P11'de sağdan girer (köşk tarafı), muhafız eli soldan (Hezarfen'in arkası). P10 baş çevirme sağa, P12 padişah sağa (pencere) bakar, dönüp **sola** (kapı) işaret eder.
- **Kurulum → karşılık:** sol rıhtımdaki küçük grup+demet P02'de (figür ≈50 px, x 40-140, ışık lekesi) → P03'te büyür. Yardımcı+meşale P01'de (fitilin ucu, kıvılcımın kaynağı) → P03/P05. Köşk P03'ten itibaren sağ uzakta (x 740-928, su çizgisi y 762, üst 534) → P06 iniş → P07 basamak. P06'da çözülen kanat suda iniş noktasının solunda kalır; P07'de Lagâri kanatsız. Kese P07'de el ile girer (birden belirmez). Defterler P13 geri çekilirken kenarda kapalı görünür, sonra açılır. Fişek çizimi P13 sağ kenarda kurulur → P14. Muhafız eli P11 p80'de soldan girer, p104'te omuza iner.
- **Yürüyüş yolu fiziksel açık:** Hezarfen P01'de kule tepe odası **kapısından** seki üzerinde çıkıntıya yürür (x 290→700, y 1250). Galeride **korkuluk yok** (kanıtsız, ayakları örterdi): tepe katını 1.2 m **seki** (y 1250) çevreler, sağ uçta **dış çıkıntı** (x 640-900) vardır; Hezarfen kapıdan (x 163-418) sekide yürür, P08'de çıkıntıda durur, gevşek taş çıkıntıda (x 750-790). Lagâri P03'te demet tabanındaki çıkıntıdan oturağa çıkar. Hiçbiri duvardan geçmez; giren/çıkan eller kadraj kenarından girip çıkar.
- **Hareket tamamlanır:** fişek P01'de kadrajdan çıkar + kıvılcım düşer; P05-P06 bilinçli match cut (fişek yavaşlamış, P06'da son bulur); veren el P07 p130, P11 p80'de kadrajdan çıkar; martı sol kenardan çıkar (p194); kıvılcım P14'te bilinçli eşleşen kesme. Hiçbir nesne fade ile kaybolmaz.
- **Ayak/temas y:** rıhtım ayakları y 1330 (P01, P03, P05); P07/P11 zemin y 1450, kese yere y≈1355, sikke y 1440; P08 seki/çıkıntı y 1250, taş yere y 3580; P09 iniş (1250, 1170); P13 defterler y ≤ 1476. Hepsi ≤ 1500. P05 tilt sonrası (p134'ten sonra) rıhtım 1500 altına iner, o anda temas yok.
- **Yazı bantları:** ekran yazıları üst 240-400. P04 replik **üst** bantta (kim plakasıyla birleşik): oturak/eller y 1310-1450'de, alt altyazı kurulum nesnesini örterdi. P12 replik alt (yüz y 520-750, alt bantta yalnız kaftan). P01 yazısı rokete p110-125'te binebilir (kanca kapak yazısı, dokunuş değil). Yazı hiçbir dokunuşun üstüne binmez: başlık y≥480 + yazı p120'de; taş y≈900; martı y≥1100; omuz y≈800.
- **Ölü alan yok:** her plan için alt üçte biri tabloda yazılı.
- **Ufuk-ölçek (P05/P06):** ufuk y 720, yardımcı boyu 670 px (başı ufka yakın). **Stilize ölçek:** fişek ekranda yalnız ~120 px yükselir; 250 m yüksekliği tilt + ön plan yardımcı + köşk silueti + P06'daki süzülme yoluyla okunur, metrik değil. Kabul edilen kukla-tiyatrosu stilizasyonu (soru 2).
- **Işık:** Lagâri gece (tek kaynak meşale + pencere + şenlik), Hezarfen gündüz kontra. P12 pencere ışığı şeridi **pencere açıklığından türer** (`pencere.aciklik`), elle ayrı konmaz. P12 yüz: padişah yüzü yok kuralı yüzünden **profil siluet** (zemin/minder kadrajda yok); şerit göz hizasında profil konturunda parlar (yüz çizimi yok).
- **Kanat/fişek belirsizliği:** kanat tek siluet, ayrıntısız; demet nötr; martı kanadı Hezarfen'inkiyle karşılaştırılmasın diye ön planda bulanık, Hezarfen kontra düz.
- **Padişah yüzü yok**, portre referansı yok; hat yazısı dil-nötr (okunur kelime yok).
- **İki dil:** görüntü yazısız. Her `ekran_yazisi` `metin`(TR)+`en`; `replik` `en{metin,bas,bit,kelimeKare}` dilin kendi kelime zamanından; P09 harita etiketleri (`Boğaz`/`Bosphorus`) yazı katmanında. `ses`=TR, `ses_en`=EN aynı kareden başlar.

### Ses ve nefes
- Tüm `ses` plan başından (kare 0) başlar. **İstisna: P12 kare 24** (0.4 sn), kanat kapanışı sözden önce okunsun diye; replik zamanları +24. P12'den sonra P13 EN'de 26 kare boşluk (0.43 sn) kalır. P12 EN sesi plan sonundan 5 kare önce biter (mp3 kuyruk sessizliği dahil), taşma yok.
- Foley seviyeleri dokunuslar.md'ye göre, hepsi anlatım altında (-4…-22 dB), P12'de -6 (kullanıcı foley'i yüksek bulur). `foley.json` henüz yok (teknisyen/kurgucu): doğrulayıcı 38 temas için uyarı verir, normal.
- Görünmeyen kaynak sesi yok; görünen ortam: dalga, meşale, kule rüzgârı, kısık.

## 5. Doğrulayıcı sonucu (güncelleme 2026-11-08, mekanlar.md §7 + kullanıcı kararları)

**Bu turun niteliği:** `mekanlar.md`'nin hesapladığı değerler işlendi (kör ayar yok). Şablonlar kodlanmadığı için kural 7 (kendi render + bakış) uygulanamadı; **hiçbir kare render edilmedi**. Yeni kamera/konum değerlerinin tümü hesap sonucudur; motion kalibrasyonunda (mekanlar §8 sırası) render edilip eleştirmenle ayarlanacak, değişen değer buraya ve json'a geri işlenir.

- **Gerçek doğrulayıcı** (`node tools/bolum_dogrula.mjs bolumler/evliya-ucuslari/bolum.json --tam`): **GEÇMEDİ**, 15 hata, hepsi "bilinmeyen şablon SARAYBURNU / GALATA-TEPE / BOGAZ / KITAP-INSERT" (+ buna bağlı süre 0). Beklenen: şablonlar `sinirlar.json`'da yok. "Bilinmeyen şablon/parametre" dışında hata yok.
- **Genişletilmiş kopya** (scratchpad; `sinirlar.json` + 4 şablon, 5 karakter, 10 prop, 13 jest [`kanat-birak` ve `yuz` dahil], `poz oturan`; `el` kuralı açık): **GEÇTİ, 0 hata, 2 uyarı** (P09 `yuru` jesti z/u yerine x/y yolu; foley.json yok). 14 plan, 3774 kare (62.90 sn, değişmedi), 4 şablon, 39 temas (P06'ya `su-yatma` eklendi), 6 dokunuş, tüm `kontrol_kare` plan içinde, animasyonlar plan sonundan ≥12 kare önce biter (P06 kanat suda: p222-250), ses dosyaları var.
- Kurulum ekibi şablonları `sinirlar.json`'a eklediğinde (KE-Y6) aynı json gerçek doğrulayıcıdan geçmelidir; `kanat-birak` jesti ve `suda` prop durumu da eklenmeli.

### 5.0 K1 kalibrasyonu (P05/P06), 2026-11-08 — yönetmen revizyonu
Kaynak: `kalibrasyon/K1/elestiri.md` (KALDI) + motion önerisi (ölçek önerileri eleştirmence reddedildi). **Render edildi (kural 7):** P05 p0/p78/p204, P06 p0/p76/p215/p290 (scale 0.25, `--props` ile `{"yol":"evliya-ucuslari/bolum.json"}`, kare = P05 başı 1206 / P06 başı 1416 + p).
| Bulgu | Uygulanan (json) | Karede |
|---|---|---|
| K4 yükseliş silinmesi | P05 demet DİK: y 1330→960, olcek [1,1,.97,.95,.92]; P06 p0-46 aynı olcek. **Kamera cs 0.9** (1.0'da binici başı y≈140: güvenli alana çıkıyordu; yığın ≈850 px), cy 0→220 demeti izler | p204 binici başı ekran y≈415; rıhtım aşağı kayar, yükseliş tilt+kayma ile okunur (ekran kazancı yalnız ~110 px: yığın boyu sınırı, açık soru 7) |
| K1 fitil ip | `fitil.tukenir 56`, kalan kısa kömürleşmiş parça (motion çizer) | p204'te demete bağlı çizgi yok |
| K3 kesme | `puskurme {56, 210}`; P06 p0 = P05 son durumu (demet (540,960) olcek .92, Lagâri demette, meşale (150,1180), Y1/Y2, başlık yerde); Lagâri `bagli {demet, bit 46}` + `ucus` bas 46 | p204 ↔ P06 p0 aynı |
| K2 meşale | p0 alev fitil başına alçakta (330,1250); p56 sonrası (150,1180): alev x ≤ 330, y ≥ 900, koridor 400-700 dışı | p0/p204 yüz açık |
| O12 güvenli alan | Y1 y 1296, Y2 y 1268; cs 0.9 + cy 220 → ayaklar 1485/1457 ≤ 1500 | |
| O4 ikiz | Y2 x 95 (arka 3/4, boy 0.9, geride), Y1 sıçrama 300→270 (aralık ≈1 gövde); Y2 için motion önerisi x 112 yerine 95 (Y1 270'e çekildiği için) | p204'te iki figür ayrışık |
| K4/b iniş köşkün önünde | Lagâri iniş (810,775), olcek 0.25 (köşkten ≈6x, <10x); kamera p150-230 köşke push-in cs 0.9→2.0 (cx -300 katalog sınırı; cs 2.5 köşk-merkezli cx -735 sınır dışı → `kit_eksik`) | p215/p290 Lagâri köşk cephesi önünde suda |
| Boş demet | y 960→1200, olcek .92→.85, aci 0→40, yakın suya (halka/buhar motion'ın) | p76 yardımcıların yanında düşüyor |
| K6 kanat suda | kanat x 800→770, y≈778, olcek .25 (iniş noktasının solunda, köşk önünde); konum köşk önüne taşındı | çizim henüz yok (motion) |
| Eksik prop | P05 `kanat` (sırtta katlı), P06 `mesale1`, P06 `baslik` (kesme sürekliliği) eklendi | |
| O11 | P05 Lagâri `tutun` {sicim-bagi} (jest değil parametre: `tutun` jesti katalogda yok) | |
| P06 basamak (K4/b) | `kosk_basamak` x 790-830, y 762 parametresi, `kit_eksik` KE-S1 | kıyı dekorunda çizilmiyor (mekân sorumlusu/motion) |
| S5 | P06 üst bant: yazı p208-282'de Lagâri başı ekran y≈900 → çakışmaz; yazı kayarsa kontrol | |

**Motion için gerekli kod notu:** `Kiyi.tsx` `bagli.bit` alanını yok sayıyordu (Lagâri bağ bitse de demetin ölçeğini alıyordu → p215'te dev figür). Render doğrulaması için `Kiyi.tsx`'e 2 satırlık geriye uyumlu yama eklendi (`bagli.bit` varsa p ≥ bit sonrası bağ çözülür); motion kalıcı hâlini onaylasın.

### 5.0b K1-2 eleştirisi (KOŞULLU) — yönetmen açıkları, 2026-11-08 (kullanıcı: B yolu, belgeler şimdi, motion K2 turunda kodlar)
| Bulgu | Uygulanan | Not |
|---|---|---|
| Y2 iniş ≈5x | Lagâri olcek 0.12 (köşk 17 px/m ↔ 49 px/m ≈ **2.9x**); okunurluk: sarık en açık leke + halka + 3 kesik dalga izi (köşke doğru) → `parametreler.okutma`; kamera cs 2.5, cx -735, cy 600 (SARAYBURNU cx sınırı ±740, orkestra onayı) | köşk su çizgisi ekran y≈1065, üst 495; Lagâri ekran y≈1097 |
| Y3 basamak sesi/teması | P06'dan `islak-el` p286 ve `kosk_basamak` çıkarıldı; P06 p288 = yüzüş vuruşu tamamlanmış. **P07 p0:** ıslak el basamak üst yüzüne (200,1330) değer, `islak-el` temas p0, el yolu p0 basamak → p34 (440,1150) → p64 kese avucu | P06 `eslesme` alanında son kare ↔ P07 ilk kare (konum/durum) yazılı. P07 basamak x 60-260, y 1180-1480 (mekanlar §1.4) |
| Y4 meşale giysiye değmesin | Y1 (meşaleci) x 90→70 (taşıma pozunda alev ≈ Y1.x+255); Y2 x 215 (alev ≥ 60 px uzakta); p88 sonrası meşale dik, alev x≈345, y ≈ 900 (≤1000), demet koridorundan (x ≥ 440) uzak; fitile değme p30 alçak. Başlık x 90→320 | render p78/p204/P06 p0: alev Y2'ye değmiyor |
| Y9 demet kalıntısı | Boş demet p100-148'de sola sürüklenir (x 560→200), kamera p150-180'de dönerken kadrajdan çıkar; p215+ kadrajda yok | render p215/p290'da yok |
| Z2 başlık | iniş y 1322 → **1280** (cs 0.9, cy 220 → ekran y≈1467 ≤ 1470) | |
| Kullanıcı kararı | kalkışta binici başı kadraj dışına ÇIKMAZ (cs 0.9 hâli kalır) → açık soru 7 kapandı | |
Render: P05 p0/p78/p204, P06 p0/p76/p215/p290 yeniden bakıldı (scale 0.25). **P07/P11:** insert şablonu yok, render yapılmadı; değerler yalnız `mekanlar.md` §1.4 hesabı (basamak, ıslak izler, ışık noktası, zemin y 1450, kese y 1355, sikke y 1440). `tasarim.md` v1.3 ile tutarlı (el tipleri, ayna kadraj kese ±10 px, ışık ters, Lagâri kanatsız). K2 kontrol paketi için çiftler: **P07 p72 ↔ P11 p72** (kese avuçta, ayna), P07 p0 (ıslak el temas), P11 p98 (muhafız gölgesi) / p128 (EV-D5) / p208 (sikke).

### 5.1 Bu turda işlenen değişiklikler
| Plan | Değişiklik | Kaynak |
|---|---|---|
| P01 | `kosk_konum` (su çizgisi 762, üst 534, x 740-928); B: korkuluk yok, seki y 1250 + çıkıntı x 640-900 | mekanlar §7.1, §7.3 |
| P02 | cs 1.0→1.15 yerine **0.9→1.05**; şenlik merkezleri y 600 → **200 / 160** (köşkün arkasında); grup x 40-140, ayak y 1387, olcek 0.075 (≈50 px); padişah y 819 (denizlik, pencere içi) | §7.1, §7.2, §1.3 |
| P03-P05 | `kosk_konum` parametresi (P04: kadraj dışı) | §7.1 |
| P06 | **kanat suda kalır**: `kanat-birak` jesti p222-250, kanat x 725→650, y≈1185, %40 görünür, sabit halka, plan sonuna kadar; temas `su-yatma` p236 (-16 dB) | kullanıcı kararı, mekanlar §1.2 |
| P07 | Lagâri **kanatsız** (`kanat_yok`); ışık sağ-üst, gölgeler sola | kullanıcı kararı, §7.7 |
| P08 | korkuluk yok → seki + çıkıntı; taş yere y 3600 → **3580** (takip ekran y 900 ile tutarlı) | §7.3, §2.4 |
| P09 | dekor x -540…1620; kule **x 100** (tepe y 760); iniş **(1250, 1170)**; Hezarfen yolu ve **derinlikle büyüyen ölçek** (0.027→0.35); etiketler: Galata x 100 (p100'de biter, pan sol marjı geçmesin), Üsküdar (1250, 930); ot `#989c76` | §7.4 |
| P10 | cs [1, 1.6, 1.7] → **0.9 → 2.4** (kare 0/24/66/282: 0.4 sn P02'yle eşleşen geniş, sonra push-in; çevirme tam 2.4'te), son kare cx -28, cy 420 | §7.2 |
| P11 | muhafız eli gölgesi **kullanılır** (aşağıda); gün = sabah, güneş ENE | §1.4 |
| P12 | kapı **x 60-352**; zemin/minder/zemin lekesi parametrelerden çıkarıldı; pencere x 560-738, y 560-981; padişah ayak y 1267 (kadraj dışı) | §7.5 |
| P13 | **rahle** (masa değil): defterler zeminde, y ≤ 1476 (merkez d1 168,1257 · d2 758,1277 · d3 463,1369); kitap y 795; hokka kalemdan bölgesine (540, 510) | kullanıcı kararı, §7.6 |
| P14 | yüzey rahle; kitap y 795 | kullanıcı kararı |
| P08-P12 | `gunes: sabah-ENE` | kullanıcı kararı |

**P11 muhafız eli gölgesi kararı: KULLAN.** Gerekçe: (1) ışık tanımından (`Isik.yonlu`, güneş soldan) kendiliğinden çıkar, elle konmaz, ek kod/ses yok; (2) el omza değmeden ~8 kare (p96) önce gölgesi omuza ve kese eline düşer, EV-D5'e "geliyor" vurgusu verir; (3) sürpriz bozulmaz, çünkü el zaten p80'de soldan kadraja girer, gölge yalnız son 8 kare görünür; (4) P07'deki sağdan ışıkla ayna ters sonucu pekişir. Kontrol: `kontrol_ek` 98. Kalibrasyonda 360 px'te okunmazsa (omuz küçük) elin yolu değiştirilmez, gölge sessizce düşürülür.

## 6. Kurulum ekibi için şablon ihtiyaç listesi

Sıra: tasarımcı (palet, karakter, prop, tipografi) → mekân sorumlusu (mimari kart + doku) → motion (şablon kodu) → eleştirmen (kalibrasyon). Dönem: `arastirma.md` §5 (köşk = Sinan Paşa/İncili Köşk; Galata 1630'lar, sonradan eklenen kat yok). Her yeni parça bir bölüm json'ında kullanılıp render edilmiş karede görülünce kabul edilir (kural 5).

### 6.1 Şablonlar

**KE-S1 SARAYBURNU** (planlar P01 A, P02-P07, P10-P12; 4 görünüm × gece/gün)
- Parametreler: `gorunum` = `kosk | kiyi | insert | ic`; `saat` = `gece | gun`; önerilen kamera: cs 0.9-3.0, cx ±300, cy -200…900; karakterMaks 4; elMaks 3.
- `kosk` (P02 gece, P10 gün, **AYNI kadraj**, dekor ortak): köşk cephesi — kesme taş çifte kemerli altyapı + aradaki çeşme, üstte dikdörtgen taş ana mekân, nötr düşük kubbe, 4 baca, saçaklı ahşap cumba, önde rıhtım, deniz. Pencere (x≈560, y 700-860): padişah siluet (yüz yok), gece pencere içten ışıklı. Gökte şenlik fişeği patlaması (`senlik` listesi: x,y,bas,patlama; merkez y 150-250, kıvılcımlar köşkün arkasında düşüp söner). Sol uçta (x 40-140, ayak y 1387) 3 figür+demet+meşale (kurulum). Kamera cs 0.9-2.4: P02 0.9→1.05; P10 0.9→2.4 (son kare cx -28, cy 420). Okunurluk: padişah büstü ≥ %12 için cs 2.4 (P10); P02'de ≈%5 (mekân kurma), köşk imzası 360 px'te okunur.
- `kiyi` (P01 A, P03, P04, P05, P06; gece): yandan kıyı. Alt: taş rıhtım şeridi (zemin y 1330, kenar y≈1250), arkasında su bandı (y 800-1250), ufuk y 720, sağ uzakta köşk (x 740-928, su çizgisi y 762, üst y 534, 17 px/m; ufuk-ölçek düzeltmesi, mekanlar §7.1), geniş gök (negatif y -1300'e uzatılmış, P01 tilt için). Rıhtımda demet yeri (x 520), fitil hattı (x 330-520), yardımcı yerleri (x 240-300). Parametre: `fitil {bas,bit}`, `puskurme {bas,bit,sonuk}`, `su {y, halka{bas,bit}}`. Kamera cs 0.9-3.0 (P04 bel plan cs 2.5-2.7). P05→P06 kadraj aynı. Işık tek kaynak: meşale + pencere; deniz yüzü P05 sonunda fişek ışığıyla aydınlanır.
- `insert` (P07 gece, P11 gün, **AYNI kadraj**): rıhtım taş zemini y 1450, solda köşk rıhtımı basamağı, sağdan veren el girişi, soldan muhafız eli girişi. Kamera cs 1.0 sabit. Okunurluk: kese ≥ %10, omuz y≈800.
- `ic` (P12, gündüz iç): köşk iç mekânı. Sağda pencere (x 560-738, y 560-981) ahşap kanatlı, açıklıktan türeyen ışık şeridi (`isik_serit`), solda kapı (x 60-352, y 602-1250, ardı koyu); zemin/minder/zemin ışık lekesi bu kameralarda kadraj dışı (parametrelerde yok); kafes/arma yok (kanıtsız). Kamera cs 1.8-2.6, cx 150-216, cy 130-210. Okunurluk: profil baş ≥ %12.

**KE-S2 GALATA-TEPE** (P01 B, P08)
- Parametreler: `gorunum: tepe`, `saat: gun` (kontra ışık), kamera cs 0.9-3.2, cx ±400, cy **-5400…400** (dikey şerit), karakterMaks 1.
- İçerik: taş gövde, **kurşun gri külah (biçim nötr, kanıtsız eğim/pencere yok)**, tepe galerisi (yaklaşık sekiz kemerli açıklık), seki (y 1250; **korkuluk yok**) üzerinde kapı (x 163-418, merkez 290), sağ uçta dış çıkıntı (x 640-900), çıkıntıda gevşek taş yeri (x 750-790). Dikey şerit 2 ekran: duvar taş sıraları + aşağıda Galata çatıları/sokak, zemin çizgisi dekor y≈3600. Sonradan eklenen ahşap kat/bayrak direği yok.
- Okunurluk: Hezarfen siluet boy ≈ %22; taş cs 2.0'da ≈ %10 ve takipte ekran y≈900. Toz halkası (<%5) okunurluk sayılmaz.
- KE-C1: `kamera.takip {prop, ekran_y, kare}` (kamera taşı ekranda sabit tutar) ya da motion hesaplı cy.

**KE-S3 BOGAZ** (P09)
- Parametreler: `gorunum: panorama`, `saat: gun`, `rota: galata-uskudar`, `rota_cizgi {bas,bit}`, kamera cs 0.9-1.6, cx ±600, cy ±300, karakterMaks 1.
- İçerik: 2160 px genişlikte yandan panorama. Dekor x -540…1620. Sol: Galata yamacı + kule (x 100, tepe y 760, P08'deki kule). Sağ: Üsküdar kıyısı + açık meydan (iniş (1250, 1170); ağaç/çadır/bina yok, mimari uydurma yok) + uzakta nötr Üsküdar silueti. Orta: Boğaz suyu (y 1000-1500), ufuk y≈860. Rota çizgisi ince kesikli, çizilirken uçar. Ön plan katmanı (ekran uzayı) martı için. Harita etiketleri (`Galata`, `Üsküdar`, `Boğaz`/`Bosphorus`) **yazı katmanında**, görüntüde yok.
- Okunurluk: Hezarfen düz kontra siluet derinlikle büyür 10→70→130 px, martı kanat açıklığı 420 px.

**KE-S4 KITAP-INSERT** (P13, P14)
- Parametreler: `kitap: seyahatname`, `defterler[]`, `kenar_cizim[]`, kamera cs 0.9-**5.0**, cx/cy ±1000.
- İçerik: **rahle** tablasında (x 140-940, y 470-1110) açık Seyahatname (x 220-860, y 545-1045) (dil-nötr hat çizgileri, okunur kelime yok), sağ kenarda iki çizim: fişek (üstünde binici, solunda fitil) ve kanatlı adam (140 px yükseklik); zeminde (×0.67) 3 kapalı defter 156×214 px, hepsi y ≤ 1476 (açılınca sayfalar boş, mürekkep yok), tablada kalemdan/hokka (x 330-750, y 482-538). P14 son karesinde fişek çizimi P01 p0 ile ekranda aynı konum/ölçekte (binici+demet x≈390-640, y≈640-1330, fitil solda). Okunurluk: kenar çizimi ≥ %16 (cs 2.2).

### 6.2 Karakterler ve oyun parçaları

| Kimlik | Parça | Planlar | Durum / parametre | Not |
|---|---|---|---|---|
| KE-K1 | `lagari` | P01-P07 | poz oturan/ayakta, ıslak (P06 p232+, P07), yüz ifadeleri dinlen/A/O, `konus` | Yüz/giysi kanıtsız: nötr; Hezarfen'den ve padişahtan ayrışmalı |
| KE-K2 | `hezarfen` | P01 B, P08, P09, P11 | ayakta, yürür, bakar, uçar, eğilir; kanat sırtta | Lagâri'den farklı yüz/başlık |
| KE-K3 | `padisah` | P02, P10, P12 | siluet, yüz yok, kavuk/sorguç kanıtsız nötr; pencere/iç | Portre referansı yok |
| KE-K4 | `yardimci-1/-2` | P01 A, P02, P03, P05, P06 | **yüzsüz siluet**, sade başlık (P05'te ayrılan başlık), meşale tutar | Kompars: ana kadro yüzü kopyalanmaz |
| KE-K5 | `el` tipleri (`entari-yen` veren, `lagari`, `hezarfen` avuç, `muhafiz`) | P07, P11 | avuç aç/kapa/gevşe, kese tutma, omuza basma | `el` yalnız MASA-INSERT sınırı genişlemeli |
| KE-K6 | `poz: oturan` | P01-P06 | demet üstünde oturak | |
| KE-P1 | `fisek-demet` | P01-P06 | nötr barut tüpleri demeti (~0.9 m, kol/kanat sayılmaz), oturak tahtası, taban çıkıntısı, fitil; `puskurme`, `titreme`, `bos` | Yapı kaynakta tarif edilmez |
| KE-P2 | `kanat` | P01 B, P06, P08, P09 | `acik` 0→1, **tek siluet, ayrıntısız**; Lagâri ve Hezarfen aynı dil. **`suda` (P06 p222-250):** Lagâri'den ayrılıp su katmanına yatar, %40 görünür, ±4 px dalga, sabit halka, plan sonuna kadar kalır (KE-P2s) | Yapı belirsiz |
| KE-P3 | `kese` (17. yy.) + `sikke` | P07, P11 | `icerik gumus/altin`, olcek 1.4; sikke `donus`, `yatis` | Altın/gümüş karşılığı doğrulanmadı: renk gösterge |
| KE-P4 | `baslik` | P05 | ayrılabilir, yol anahtarlı, olcek 1.6, temas gölgesi | Nötr sade takke |
| KE-P5 | `tas` | P08 | dekor 95 px | |
| KE-P6 | `marti` | P09 | 3-4 pozluk çırpma + süzülme, ekran uzayı, bulanık | |
| KE-P7 | `mesale` | P01-P06 | alev, ışık havuzu, yola göre | |
| KE-P8 | `defter`, `kitap seyahatname`, kenar çizimleri | P13, P14 | `acik`, `bos`, `hat` | Blanc `kitap` kanun kitabı, yeni değil |
| KE-P9 | `pencere-kanat` | P12 | menteşe `aci` 80→12, ahşap, süssüz | |
| KE-J1…J11 | jestler: `bin`, `tutun`, `kanat-ac`, `ucus` (süzülme yolu), `egil`/`dogrul`/avuç, `tas-it`, `pencere-kapat`, `sicra`, `yuru` x/y yolu (J9), ıslaklık+damla (J10), `don` (J11), **`kanat-birak` (J12, P06 p222-250)** | ilgili planlar | | |
| KE-E1…E6 | efektler: fitil/kıvılcım/püskürme/duman · şenlik patlaması · su halkası+buhar+damla · toz halkası · pencere ışık şeridi · rota çizgisi | ilgili planlar | | `Efektler.tsx` kapsamı doğrulanmadı |

### 6.3 Sistem değişiklikleri

- **KE-Y1 `yazi_katmani_dil`:** `ekran_yazisi` ve `replik`: `metin` (TR) + `en` (+`vurgu_en`); `replik.en {metin,bas,bit,kelimeKare}`; `harita_etiketleri[]` `{ad,tr,en,x,y,bas,bit}`. Önerilen kalıcı şema: `metin: {tr,en}`, `vurgu: {tr,en}`. Görüntü yazısız + dil başına şeffaf yazı katmanı render modu.
- **KE-Y2 `ses_dil`:** `ses` (TR) + `ses_en` (EN) ya da dil seçimli tek alan.
- **KE-Y3 `gorsel_yazisiz`:** `Bolum` yazısız render modu (bölüm düzeyi bayrak).
- **KE-Y4 `plan_ici_kesme`:** P01 tek planda iki şablon (`devam_plan {kare_bas, sablon, parametreler, kamera, karakterler, props}`). Alternatif: P01'i ikiye bölmek plan sayısını 15 yapar (sınır 14), önerilmez.
- **KE-Y5 `konus_ses_json`:** `konus` jesti dudak zamanını `ses/{dil}/Pxx.json` kelimelerinden alır (dil başına ayrı zaman).
- **KE-Y6 `sinirlar.json` + doğrulayıcı:** 4 şablon (aralıklar yukarıda), 5 karakter, 10 prop, 11 jest, `poz oturan` eklenmeli; `el` kuralı SARAYBURNU/KITAP-INSERT'e açılmalı; `x,y` karakter yolu (z/u yerine) ve `plan_ici_kesme` tanınmalı.

## 7. Açık sorular (kullanıcı kararı gerektirenler)

1. **P11'de Hezarfen'in yüzü görünmüyor.** Ters köşenin duygusu (şok) omuz ve avuç gevşemesiyle veriliyor (insert, baş kadraj dışı, kese %10). Yüz yakın plan istenirse süre ve plan eklenir (sınır 14 plan). Mevcut hâl kabul mü?
2. **Yükseliş ölçeği P05-P06'da stilize** (fişek ekranda ~120 px çıkıyor, demet ~270 px düşüyor, 250 m gerçekte okunmuyor; tilt + büyük ön plan yardımcı + köşk silueti ile hissettiriliyor). Kukla-tiyatrosu dili olarak kabul mü, yoksa P05'e ayrı bir yükselen geniş plan mı (plan sayısı sınırında)?

3. **[ÇÖZÜLDÜ, K1 revizyonu §5.0] P06 sonu ölçek/konum:** köşk tabanı artık y 762; Lagâri'nin yüzme sonu (785, 985), olcek 0.85, tutunma p286 bununla tutmuyor (köşke ~220 px uzak; ufuk-ölçek kuralı y 985'te ≈0.43 verir). Landing p215 okunurluğunu (EV-D2) bozmamak için bu turda dokunulmadı; kalibrasyonda P06 p76/p215/p286 render karesiyle karar verilir (öneri: son anahtarları köşk basamağına yaklaştır, ölçeği ufuk kuralına indir).
4. **P02 sol grup yan güvenli alanı:** cs 1.05'te grup (x 40-140) ekran x≈15-120; leftmost figür 80 px marjının dışına 65 px taşar. Seçenekler: grubu x 90-160'a taşı (mekân sorumlusu, sur arkası sınırı x ≤ 160) ya da cx +65 (köşk sağ bacası kesilir). Mekân sorumlusu/kalibrasyon kararı.
5. **P13 kamera çakışması (render öncesi uyarı):** cs 2.2, cx -300, cy -120'de fişek çizimi (790, 760) ekran (790, 400)'e düşer; çizim y 246-554 ve üst yazı bandı 240-400 çakışır. Hesaplı öneri: cx -390, cy 80 (çizim ekran (700, 600), kanatlı adam (700, 1040)). Kural 7 gereği render etmeden değiştirilmedi.
6. **Mekân sorumlusuna:** §4.2 defter öneride d1 açılınca (x 90-402) ile d3 (x 385-) 17 px örtüşür (d3 sonra açılır, üstte kalır); kabul mü?

Kullanıcıya gerek olmayan, kurulum ekibine not: fişek yapısı ve binme biçimi nötr (dikey demet + oturak tahtası, kaynak tarif etmiyor); veren elin sahibi belirsiz; hat yazısı dil-nötr; P12 yüz yerine profil siluet.

7. **[KAPANDI, kullanıcı kararı: binici başı kadraj dışına çıkmaz; mevcut hâl kalır] Yükseliş ekran kazancı (K1):** binici+demet yığını ≈850 px olduğundan, başı güvenli alanda tutarak demet ekranda yalnız ~110 px yükselir (cs 0.9, cy 0→220); yükseliş rıhtımın aşağı kayması ve P06'daki alçalma ile okunur. Daha dramatik yükseliş için seçenekler: kamera cs < 0.9 (katalog sınırı 0.9) ya da binici başının üst bantta kısa süre kadraj dışına çıkması (kullanıcı kararı gerekir).
8. **[ÇÖZÜLDÜ: cx sınırı ±740, cs 2.5 uygulandı] P06 push-in cs 2.5 / köşk-merkezli** için SARAYBURNU `cx` sınırı ±300 → ≥ ±740 gerek (şu an cs 2.0, cx -300 ile köşk sağ-orta).
