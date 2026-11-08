# Sahne planı: Evliya Uçuşları (yönetmen, 2026-11-08)

Girdi: onaylı `senaryo.md` / `senaryo-en.md` v2, `dokunuslar.md`, `public/evliya/ses/plan-sureleri.json` + kelime zamanları. Çıktı: `bolum.json` (bu belgenin makine hâli; tek gerçek kaynak). 60 fps, 1080x1920, **3774 kare = 62.9 sn**, 14 plan, 4 mekân şablonu (hepsi kitte YOK, `kit_eksik`).

**Kontrol kareleri RENDER EDİLEMEDİ.** Yeni şablonlar kitte olmadığı için kural 7 (kamera/ölçek/konum değiştirince kendi render ve bakış) uygulanamadı. Kamera, ölçek ve x/y değerleri hesapla üretilmiş **önerilerdir**; kurulum ekibi şablonu kurunca motion kalibrasyon karelerini render edip eleştirmenle birlikte ayarlayacak. Okunmayan plan o turda aynı kuralla düzeltilir.

Koordinat dili: `x,y` = dekor px (kamera öncesi 1080x1920 taban), `kamera.cs/cx/cy` = ölçek / ekran kayması (cy+ içerik aşağı kayar = kamera yukarı bakar), `el.*` = ekran px. Güvenli alan: üst 220, alt 420 (y ≤ 1500), yanlar 80; yazı bantları üst 240-400, alt 1290-1490.

## 1. Plan tablosu

Mutlak başlangıç = önceki planların toplamı. Süre = `plan-sureleri.json` (iki dilin uzunu + 0.4 sn), **değiştirilmedi**.

| Plan | Mutlak (sn) | Süre | Şablon / görünüm | Çekim ölçeği ve değişimi | Kamera | Ana eylem (TEK) | Dokunuş | Temas / foley kareleri (p) | kontrol_kare | Alt üçte biri |
|---|---|---|---|---|---|---|---|---|---|---|
| P01 | 0.0-5.6 | 336 | SARAYBURNU kıyı gece → (p176 kesme) GALATA-TEPE gün | A: boy/orta (binici+demet %36) → tilt takip; B: boy (siluet %22) → yavaş push | A cs 1.25→1.0, cy 0→500; B cs 1.0→1.25 | A: kıvılcım fitilde, fişek yükselip kadrajdan çıkar; B: Hezarfen kapıdan galeri açıklığına yürür | (döngü, dokunuş sayılmadı) | fitil-tiss 0 · puskurme 40 · fisek-kalkis 72 | 100 (+0, 230) | rıhtım taşı, fitil+kıvılcım, yardımcı bacakları; tilt sonrası denizde şenlik yansıması |
| P02 | 5.6-11.0 | 324 | SARAYBURNU köşk gece | geniş; push-in cs 1.0→1.15 | lineer | şenlik fişeği yükselip patlar; pencerede padişah siluet sabit | - | senlik-patlama 62, 205 | 80 | deniz yansıması, rıhtım, sol-altta ışıklı küçük grup + demet (P03 kurulumu) |
| P03 | 11.0-15.2 | 252 | SARAYBURNU kıyı gece | orta-boy; cs 1.15→1.3 | inout | Lagâri demete biner ve oturur | - | ayak-tahta 44 · oturma-tahta 92 | 100 | rıhtım taşı, fitil hattı, meşale ışık havuzu, yardımcı bacakları |
| P04 | 15.2-20.1 | 294 | SARAYBURNU kıyı gece | bel/göğüs; cs 2.5→2.7 (yüz %11-12) | inout | Lagâri köşke seslenir, elini indirip tutunur | - (EV-Y1 yedek kullanılmadı) | tutunma-tup 158 | 36 (+158) | demetin barut tüpleri, oturak, eller (y 1300-1500) |
| P05 | 20.1-23.6 | 210 | SARAYBURNU kıyı gece (geniş) | geniş/boy (yardımcı %35); p120'den tilt cy 0→200 | cs 1.0 | fitil tutuşur, fişek kalkar | **EV-D1** p56-134 | fitil-tiss 30 · puskurme 56 · kumas-hisirti 60 · baslik-inis 110 · fisek-kalkis 112 | 78 (+110) | rıhtım, yardımcı bacakları, yuvarlanan başlık y 1315, fitil/duman |
| P06 | 23.6-28.6 | 300 | SARAYBURNU kıyı gece (geniş) | geniş (P05 ile aynı kadraj); sonda tilt cy 200→60 | cs 1.0 | kanat açılır, demet düşer, Lagâri süzülüp denize iner, yüzer | **EV-D2** p40-130 | kanat-hisirti 44 · birakma-tik 46 · su-dump 100 · buhar 102 · su-sap 215 · islak-el 286 | 76 (+215, 286) | deniz ışıltısı, sol-altta yardımcılar, su halkası/buhar |
| P07 | 28.6-32.4 | 228 | SARAYBURNU insert gece | insert/orta-boy, eğilmiş Lagâri; cs 1.0 sabit | lineer | kese avuca düşer, Lagâri doğrulur | - | kese-singir 68 | 72 (+130) | rıhtım taşı y 1300-1500, ıslak ayak izi, damlalar |
| P08 | 32.4-36.6 | 252 | GALATA-TEPE gün | geniş → göğüs (p36) → ayak/taş (p40-52) → dikey takip (taş %10) → yukarı → göğüs | cs 1.0→1.9→2.0→1.95 | Hezarfen taşı iter, taş düşer, ufka bakar | **EV-D3** p36-232 | tas-surtme 40 · tas-kayma 44 · uzak-tik 148 | 100 (+0, 148, 216) | kule taşı, akan duvar ve çatılar, kule gölgesi |
| P09 | 36.6-41.3 | 282 | BOGAZ panorama gün | geniş; yatay pan | cs 1.0, cx 500→-500 | Hezarfen atlar, süzülür, Üsküdar meydanına iner | **EV-D4** p112-195 | marti-cigligi 120 · kanat-hisirti 125 · inis-toprak 238 | 150 (+0, 238) | Boğaz suyu, ön plan martı, iki kıyı |
| P10 | 41.3-46.2 | 294 | SARAYBURNU köşk gün (P02 ile aynı kadraj p0) | geniş → push-in cs 1.0→1.6 | inout | padişah siluet başını Üsküdar yönüne çevirir | - | (yok) | 120 (+0) | çifte kemerli altyapı, rıhtım, gündüz denizi |
| P11 | 46.2-50.2 | 240 | SARAYBURNU insert gün (P07 ile aynı kadraj) | insert/orta-boy, baş kadraj dışı; cs 1.0 sabit | lineer | kese avuca konur, omuza el iner, kese düşer, sikke yatar | **EV-D5** p104-214 | kese-singir 42 · omuz-tok 104 · kese-yere 140 · sikke-donme 144 · sikke-tin 208 | 128 (+42, 208) | rıhtım zemini, kese, sikke, ayaklar |
| P12 | 50.2-53.8 | 216 | SARAYBURNU iç gün | bel → göğüs push-in cs 1.8→2.6 → 2.2 | inout | padişah pencere kanadını kapatır, ışıktan döner, kapıyı gösterir | **EV-D6** p4-110 | pencere-tok 30 · mandal-tik 34 · ortam-kisma 30 | 66 (+0, 150) | kaftan, minder/halı kenarı, zemine düşen şerit yansıması |
| P13 | 53.8-58.8 | 300 | KITAP-INSERT | insert (çizim %16) → geri çekilme cs 2.2→1.0 | inout | kitap geri çekilir, üç defter açılır, sayfalar boş | - | defter-ac 146, 164, 182 | 190 (+60) | hat satırları → ahşap masa, hokka, açık defterler |
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
- **Kurulum → karşılık:** sol rıhtımdaki küçük grup+demet P02'de (25 px, ışık lekesi) → P03'te büyür. Yardımcı+meşale P01'de (fitilin ucu, kıvılcımın kaynağı) → P03/P05. Köşk P03'ten itibaren sağ uzakta → P06 iniş → P07 basamak. Kese P07'de el ile girer (birden belirmez). Defterler P13 geri çekilirken kenarda kapalı görünür, sonra açılır. Fişek çizimi P13 sağ kenarda kurulur → P14. Muhafız eli P11 p80'de soldan girer, p104'te omuza iner.
- **Yürüyüş yolu fiziksel açık:** Hezarfen P01'de kule tepe odası **kapısından** galeri açıklığına yürür (x 290→700, y 1250). Galeri korkuluğunda kemerli **açıklık + dış çıkıntı** vardır; P08'de çıkıntıda durur, taş çıkıntıda. Lagâri P03'te demet tabanındaki çıkıntıdan oturağa çıkar. Hiçbiri duvardan geçmez; giren/çıkan eller kadraj kenarından girip çıkar.
- **Hareket tamamlanır:** fişek P01'de kadrajdan çıkar + kıvılcım düşer; P05-P06 bilinçli match cut (fişek yavaşlamış, P06'da son bulur); veren el P07 p130, P11 p80'de kadrajdan çıkar; martı sol kenardan çıkar (p194); kıvılcım P14'te bilinçli eşleşen kesme. Hiçbir nesne fade ile kaybolmaz.
- **Ayak/temas y:** rıhtım ayakları y 1330 (P01, P03, P05); P07/P11 zemin y 1450, kese yere y≈1355, sikke y 1440; P08 çıkıntı y 1250; P09 iniş y 1170. Hepsi ≤ 1500. P05 tilt sonrası (p134'ten sonra) rıhtım 1500 altına iner, o anda temas yok.
- **Yazı bantları:** ekran yazıları üst 240-400. P04 replik **üst** bantta (kim plakasıyla birleşik): oturak/eller y 1310-1450'de, alt altyazı kurulum nesnesini örterdi. P12 replik alt (yüz y 520-750, alt bantta yalnız kaftan). P01 yazısı rokete p110-125'te binebilir (kanca kapak yazısı, dokunuş değil). Yazı hiçbir dokunuşun üstüne binmez: başlık y≥480 + yazı p120'de; taş y≈900; martı y≥1100; omuz y≈800.
- **Ölü alan yok:** her plan için alt üçte biri tabloda yazılı.
- **Ufuk-ölçek (P05/P06):** ufuk y 720, yardımcı boyu 670 px (başı ufka yakın). **Stilize ölçek:** fişek ekranda yalnız ~120 px yükselir; 250 m yüksekliği tilt + ön plan yardımcı + köşk silueti + P06'daki süzülme yoluyla okunur, metrik değil. Kabul edilen kukla-tiyatrosu stilizasyonu (soru 2).
- **Işık:** Lagâri gece (tek kaynak meşale + pencere + şenlik), Hezarfen gündüz kontra. P12 pencere ışığı şeridi **pencere açıklığından türer** (`pencere.aciklik`), elle ayrı konmaz. P12 yüz: padişah yüzü yok kuralı yüzünden **profil siluet**; şerit göz hizasında profil konturunda parlar (yüz çizimi yok).
- **Kanat/fişek belirsizliği:** kanat tek siluet, ayrıntısız; demet nötr; martı kanadı Hezarfen'inkiyle karşılaştırılmasın diye ön planda bulanık, Hezarfen kontra düz.
- **Padişah yüzü yok**, portre referansı yok; hat yazısı dil-nötr (okunur kelime yok).
- **İki dil:** görüntü yazısız. Her `ekran_yazisi` `metin`(TR)+`en`; `replik` `en{metin,bas,bit,kelimeKare}` dilin kendi kelime zamanından; P09 harita etiketleri (`Boğaz`/`Bosphorus`) yazı katmanında. `ses`=TR, `ses_en`=EN aynı kareden başlar.

### Ses ve nefes
- Tüm `ses` plan başından (kare 0) başlar. **İstisna: P12 kare 24** (0.4 sn), kanat kapanışı sözden önce okunsun diye; replik zamanları +24. P12'den sonra P13 EN'de 26 kare boşluk (0.43 sn) kalır. P12 EN sesi plan sonundan 5 kare önce biter (mp3 kuyruk sessizliği dahil), taşma yok.
- Foley seviyeleri dokunuslar.md'ye göre, hepsi anlatım altında (-4…-22 dB), P12'de -6 (kullanıcı foley'i yüksek bulur). `foley.json` henüz yok (teknisyen/kurgucu): doğrulayıcı 38 temas için uyarı verir, normal.
- Görünmeyen kaynak sesi yok; görünen ortam: dalga, meşale, kule rüzgârı, kısık.

## 5. Doğrulayıcı sonucu

- **Gerçek doğrulayıcı** (`node tools/bolum_dogrula.mjs bolumler/evliya-ucuslari/bolum.json --tam`): **GEÇMEDİ**, 15 hata, hepsi "bilinmeyen şablon SARAYBURNU / GALATA-TEPE / BOGAZ / KITAP-INSERT" (+ buna bağlı süre 0). Bu beklenen durum: şablonlar `sinirlar.json`'da yok, doğrulayıcı o planların geri kalanını atlıyor.
- **Genişletilmiş kopya** (yalnız doğrulama için scratchpad'de: `sinirlar.json` + 4 şablon, 5 karakter, 10 prop, 11 jest, `poz oturan`; `el` kuralı SARAYBURNU'ya açık): **GEÇTİ, 0 hata, 2 uyarı** (P09 `yuru` jesti z/u yolu yerine x/y yolu kullanıyor; foley.json yok). 14 plan, 3774 kare, 62.90 sn, 4 şablon, 38 temas, 6 dokunuş, tüm `kontrol_kare` plan içinde, tüm animasyonlar plan sonundan ≥12 kare önce, `ses` dosyaları var ve taşmıyor. EN ses dosyaları ayrıca ffprobe ile kontrol edildi (taşma yok).
- Kurulum ekibi şablonları `sinirlar.json`'a eklediğinde (KE-Y6) aynı json gerçek doğrulayıcıdan geçmelidir; önerilen sınırlar aşağıda.

## 6. Kurulum ekibi için şablon ihtiyaç listesi

Sıra: tasarımcı (palet, karakter, prop, tipografi) → mekân sorumlusu (mimari kart + doku) → motion (şablon kodu) → eleştirmen (kalibrasyon). Dönem: `arastirma.md` §5 (köşk = Sinan Paşa/İncili Köşk; Galata 1630'lar, sonradan eklenen kat yok). Her yeni parça bir bölüm json'ında kullanılıp render edilmiş karede görülünce kabul edilir (kural 5).

### 6.1 Şablonlar

**KE-S1 SARAYBURNU** (planlar P01 A, P02-P07, P10-P12; 4 görünüm × gece/gün)
- Parametreler: `gorunum` = `kosk | kiyi | insert | ic`; `saat` = `gece | gun`; önerilen kamera: cs 0.9-3.0, cx ±300, cy -200…900; karakterMaks 4; elMaks 3.
- `kosk` (P02 gece, P10 gün, **AYNI kadraj**, dekor ortak): köşk cephesi — kesme taş çifte kemerli altyapı + aradaki çeşme, üstte dikdörtgen taş ana mekân, nötr düşük kubbe, 4 baca, saçaklı ahşap cumba, önde rıhtım, deniz. Pencere (x≈560, y 700-860): padişah siluet (yüz yok), gece pencere içten ışıklı. Gökte şenlik fişeği patlaması (`senlik` listesi: x,y,bas,patlama; kıvılcımlar düşüp söner). Sol rıhtımda 4 küçük figür+demet+meşale (kurulum). Kamera cs 1.0-1.7. Okunurluk: padişah siluet ≥ %12 cs 1.6'da (240 px), köşk imzası 360 px'te okunur.
- `kiyi` (P01 A, P03, P04, P05, P06; gece): yandan kıyı. Alt: taş rıhtım şeridi (zemin y 1330, kenar y≈1250), arkasında su bandı (y 800-1250), ufuk y 720, sağ uzakta köşk (x 680-1000, taban y≈900, üst y≈640), geniş gök (negatif y -1300'e uzatılmış, P01 tilt için). Rıhtımda demet yeri (x 520), fitil hattı (x 330-520), yardımcı yerleri (x 240-300). Parametre: `fitil {bas,bit}`, `puskurme {bas,bit,sonuk}`, `su {y, halka{bas,bit}}`. Kamera cs 0.9-3.0 (P04 bel plan cs 2.5-2.7). P05→P06 kadraj aynı. Işık tek kaynak: meşale + pencere; deniz yüzü P05 sonunda fişek ışığıyla aydınlanır.
- `insert` (P07 gece, P11 gün, **AYNI kadraj**): rıhtım taş zemini y 1450, solda köşk rıhtımı basamağı, sağdan veren el girişi, soldan muhafız eli girişi. Kamera cs 1.0 sabit. Okunurluk: kese ≥ %10, omuz y≈800.
- `ic` (P12, gündüz iç): köşk iç mekânı. Sağda pencere (x 560-760, y 560-980) ahşap kanatlı, açıklıktan türeyen ışık şeridi (`isik_serit`), solda kapı (x≈120, y 900); minder/halı nötr; kafes/arma yok (kanıtsız). Kamera cs 1.8-2.6, cx 150-216, cy 130-210. Okunurluk: profil baş ≥ %12.

**KE-S2 GALATA-TEPE** (P01 B, P08)
- Parametreler: `gorunum: tepe`, `saat: gun` (kontra ışık), kamera cs 0.9-3.2, cx ±400, cy **-5400…400** (dikey şerit), karakterMaks 1.
- İçerik: taş gövde, **kurşun gri külah (biçim nötr, kanıtsız eğim/pencere yok)**, tepe galerisi (yaklaşık sekiz kemerli açıklık), korkuluk içinde kapı (x≈290, y 1250), dış çıkıntılı açıklık (x≈700), çıkıntıda gevşek taş yeri (x≈770). Dikey şerit 2 ekran: duvar taş sıraları + aşağıda Galata çatıları/sokak, zemin çizgisi dekor y≈3600. Sonradan eklenen ahşap kat/bayrak direği yok.
- Okunurluk: Hezarfen siluet boy ≈ %22; taş cs 2.0'da ≈ %10 ve takipte ekran y≈900. Toz halkası (<%5) okunurluk sayılmaz.
- KE-C1: `kamera.takip {prop, ekran_y, kare}` (kamera taşı ekranda sabit tutar) ya da motion hesaplı cy.

**KE-S3 BOGAZ** (P09)
- Parametreler: `gorunum: panorama`, `saat: gun`, `rota: galata-uskudar`, `rota_cizgi {bas,bit}`, kamera cs 0.9-1.6, cx ±600, cy ±300, karakterMaks 1.
- İçerik: 2160 px genişlikte yandan panorama. Sol: Galata yamacı + kule (tepe y≈780, x≈330, P08'deki kule). Sağ: Üsküdar kıyısı + açık meydan (iniş x≈1800, y≈1170; ağaç/çadır/bina yok, mimari uydurma yok) + uzakta nötr Üsküdar silueti. Orta: Boğaz suyu (y 1000-1500), ufuk y≈860. Rota çizgisi ince kesikli, çizilirken uçar. Ön plan katmanı (ekran uzayı) martı için. Harita etiketleri (`Galata`, `Üsküdar`, `Boğaz`/`Bosphorus`) **yazı katmanında**, görüntüde yok.
- Okunurluk: Hezarfen düz kontra siluet ≈ 130 px, martı kanat açıklığı 420 px.

**KE-S4 KITAP-INSERT** (P13, P14)
- Parametreler: `kitap: seyahatname`, `defterler[]`, `kenar_cizim[]`, kamera cs 0.9-**5.0**, cx/cy ±1000.
- İçerik: ahşap masada açık Seyahatname (dil-nötr hat çizgileri, okunur kelime yok), sağ kenarda iki çizim: fişek (üstünde binici, solunda fitil) ve kanatlı adam (140 px yükseklik); masada 3 kapalı defter (açılınca sayfalar boş, mürekkep yok), hokka. P14 son karesinde fişek çizimi P01 p0 ile ekranda aynı konum/ölçekte (binici+demet x≈390-640, y≈640-1330, fitil solda). Okunurluk: kenar çizimi ≥ %16 (cs 2.2).

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
| KE-P2 | `kanat` | P01 B, P06, P08, P09 | `acik` 0→1, **tek siluet, ayrıntısız**; Lagâri ve Hezarfen aynı dil | Yapı belirsiz |
| KE-P3 | `kese` (17. yy.) + `sikke` | P07, P11 | `icerik gumus/altin`, olcek 1.4; sikke `donus`, `yatis` | Altın/gümüş karşılığı doğrulanmadı: renk gösterge |
| KE-P4 | `baslik` | P05 | ayrılabilir, yol anahtarlı, olcek 1.6, temas gölgesi | Nötr sade takke |
| KE-P5 | `tas` | P08 | dekor 95 px | |
| KE-P6 | `marti` | P09 | 3-4 pozluk çırpma + süzülme, ekran uzayı, bulanık | |
| KE-P7 | `mesale` | P01-P06 | alev, ışık havuzu, yola göre | |
| KE-P8 | `defter`, `kitap seyahatname`, kenar çizimleri | P13, P14 | `acik`, `bos`, `hat` | Blanc `kitap` kanun kitabı, yeni değil |
| KE-P9 | `pencere-kanat` | P12 | menteşe `aci` 80→12, ahşap, süssüz | |
| KE-J1…J11 | jestler: `bin`, `tutun`, `kanat-ac`, `ucus` (süzülme yolu), `egil`/`dogrul`/avuç, `tas-it`, `pencere-kapat`, `sicra`, `yuru` x/y yolu (J9), ıslaklık+damla (J10), `don` (J11) | ilgili planlar | | |
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

Kullanıcıya gerek olmayan, kurulum ekibine not: fişek yapısı ve binme biçimi nötr (dikey demet + oturak tahtası, kaynak tarif etmiyor); veren elin sahibi belirsiz; hat yazısı dil-nötr; P12 yüz yerine profil siluet.
