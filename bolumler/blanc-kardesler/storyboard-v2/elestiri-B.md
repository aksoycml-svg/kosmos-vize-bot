# Blanc Kardeşler · Storyboard v2 · Eleştiri B (ikinci tur, A2 sonrası)

Eleştirmen · 2026-11-06 · Girdi: `kareler/SB2-{TOURS,SOKAK,BORSA}{,-360,-guvenli}.png`, `kareler/renk-olcum.md`, `tools/sb2_kontrol.py`, motion A2 raporu (katki-raporu.md), CLAUDE.md'nin yeni kuralları (yazı bantları, tek ışık, ufuk–ölçek, kompars, mekân dili, kontrol protokolü, ajan sırası), `elestiri-A.md`.
**Ek render (protokol eksiğini kapatmak için, kod değişmedi):** P01 f0 / p54 / p150, P02 p92 / p98 / p104, P04 p40 / p189 / p210 → scratchpad. Bu kareler olmadan dokunuş/kapanış denetlenemezdi.
Öncelik: **KRİTİK** / ORTA / KÜÇÜK. Koordinatlar 1080×1920.

## 0. Karar özeti

| Kare | A puanı | B puanı | Karar |
|---|---|---|---|
| SB2-TOURS (P01) | 4.5 | **6.5/10** | DÜZELTİLMELİ (kutu → kâğıt paket, havada düğüm, kol = kalas) |
| SB2-SOKAK (P04) | 6 | **8/10** | **GEÇER, tek kritik küçük düzeltmeyle** (baston tutan el görünmeli) |
| SB2-BORSA (P02) | 5 | **6.5/10** | DÜZELTİLMELİ (sivri gotik kemer, etiket–dokunuş çakışması) |

**Temel hazır mı? → EVET, koşullu.** A'daki 9 sistemik sorunun 7'si gerçekten kapandı (renk karartması, tek ışık kaynağı, güvenli alan bindirmesi + kilit nokta denetimi, mimari modüller, gök/maske, siluet/kompars, ıslak zemin). Kalan mekânlara (paralel) geçilebilir; şu 4 koşul **önce** sağlanmalı (bölüm 5): (1) `KemerliPencere` varsayılanı yuvarlak kemer, (2) paket kâğıdı modülü (`KagitYuzey`, P09/P10/P23 de buna bağlı), (3) renk aracına ton/ΔE denetimi, (4) protokol kareleri (`KARELER` listesine f0 + dokunuş + kapanış) her mekânda zorunlu. TOURS ve BORSA'daki öteki kritikler **plan düzeyi**dir, temeli bekletmez.

Motion'ın öz puanları (7 / 7.5 / 7) SOKAK için tutarlı, TOURS ve BORSA için kritik maddeler yüzünden yüksek.

---

## 1. Eleştiri A maddelerinin durumu

| A maddesi | Durum |
|---|---|
| T1 eldiven tutulmuyor | **Kapandı.** İşaret parmağı manşette, başparmak dışta; eldiven yumuşak sarkıyor, gölgesi kutu tabanında. |
| T2 huzme–gölge ters | **Kapandı.** Pencere biçimli güneş yaması sol-aşağı, el/eldiven gölgesi aynı yönde. |
| T3 eldiven/fener gölgesi | **Kapandı.** |
| T4 fener ışık havuzu | **Kapandı** (0–330, 1000–1250 amber). Kafes gölgesi zayıf (KÜÇÜK). |
| T5 masa = döşeme | **Kapandı.** Yatay dar tahta, ön kenar y 1705, hokka + kaz tüyü + defter. |
| T6 paket okunmuyor | **Yeni sorunla değişti:** artık karton koli (bkz. TB1). |
| T7 T telefonda vinç | **Büyük ölçüde kapandı.** Direk kalın, T sapı okunuyor. Sağ göstergenin içe-aşağı 45°'si direkle üçgen kurup hâlâ "darağacı/vinç" çağrışımı veriyor (ORTA, yönetmen kararı). |
| T8 etiket IG sağ | **Kapandı** (700–865). |
| T9 üst ölü alan | **Kapandı** (kirişler + sablière). |
| S1 gök maskesi | **Kapandı** (kök neden `#siva` filtresi taşması; düzeltme doğru). |
| S2 ayaklar IG altında | **Kapandı** (ayaklar y ≈ 1415–1420; replik üst bantta). |
| S3 ızgara kurulumu | **Kapandı** (440, 1390). Telefonda ≈ 27 px; ay kenar ışığıyla biraz parlatılabilir (KÜÇÜK). |
| S4 birikinti | **Büyük ölçüde kapandı;** bkz. SB3. |
| S5 gölge | **Kapandı.** Orta oluk [T, donem-dogrulama Ek 2 Soru 8 "güvenli ve makul"] gölgeyle karışmıyor. |
| S6 çatılar | **Kapandı** (saçak alt yüzü + kiremit uçları, yüzey yok). |
| S7 bayrak | Kaldırıldı. |
| S8 ay | **Kapandı** (≈ 90 px, sis içinde, eksen dışı). |
| S9 bakış | **Kapandı** (p150'den François kameraya). |
| B1 ön plan kafaları | **Kapandı.** Ayrıca kalabalık ölçeği iç tutarlı (bkz. BB4). |
| B2 etiket yanlış kişide | **Kapandı** (etiket + 30 px bağlantı kendi şapkasında). Yeni çakışma: BB2. |
| B3 pencereler | **Yeni sorunla değişti:** kemerler sivri (BB1). |
| B4 koridor | **Büyük ölçüde kapandı:** iyonik pilastr, dentilli korniş, estrad + merdiven. |
| B5 tüccar | **Kapandı** (kır sakal, bıyıksız, geniş kenarlı şapka, tıknaz). |
| B6 kompars | **Kapandı** (iki tonlu, yüzsüz, 4 varyant). |
| B7 gölgeler | **Kapandı** (sağa, bal rengi; zeminde pencere yamaları). |
| B8 tahta | **Kapandı** (rakam biçimli, okunmayan gruplar). |

---

## 2. SB2-TOURS (P01) — 6.5/10, DÜZELTİLMELİ

| # | Bölge (px) | Sorun | Kural | Düzeltme | Öncelik |
|---|---|---|---|---|---|
| TB1 | Paket (355–865, 1030–1500) | **Karton koli.** Dikey yan duvarlar, iç taban, dört kapaklı (RSC tipi) kutu. Orkestra gözlemi **doğrulandı.** (a) Senaryo ve tasarım: "kahverengi paket kâğıdı + kenevir ip" [S, tasarim.md prop listesi]. (b) **P23 bunu aynalayacak:** "kâğıt gerilirken altında eldivenin beş parmağı kabartı verir" yalnız eldivenin üstüne doğrudan sarılan yumuşak kâğıtla mümkün; kutuyla döngü kırılır. (c) Dönem [G]: oluklu mukavva 1850'ler sonrası; kapaklı oluklu sevkiyat kolisi 19. yy sonu. 1834'te mukavva şapka kutusu vardı ama bu çizim modern koli. | Doğruluk/dönem, süreklilik (P01↔P23), senaryo | Yumuşak açılmış paket: düz yatan kâğıt, eldiven boyu sığ kırışık "yatak", dört kanat masaya yatık ve uçları hafif kalkık (kat çizgisi ışık+gölge çifti), yan duvar yok. A'daki T6 tarifi geçerli. Bu çizim `KagitYuzey` modülü olarak yazılsın (P09/P10/P23 ortak). | **KRİTİK** |
| TB2 | Düğüm (625, 1278) ve ip (300–965, 1270–1290; 605–615, 1015–1560) | **İp açık paketin ağzı üstünden geçiyor, düğüm boşlukta asılı.** Kanatlar açıkken bağlı ip ağzı kesemez; ip çözülmüş olmalı. | Fizik (hiçbir şey havada/içinden geçmez) | İp çözülmüş: iki uç masaya gevşek kıvrılır, fiyonk izi (kâğıtta ezik çizgi) kalır. | **KRİTİK** |
| TB3 | Kol (0–420, 1020–1700) | **Kol tek parça gri kalas.** Bileğe kadar sabit genişlikte 1000 px'lik dikdörtgen; dirsek yok, kırışık yok, perspektifle genişlemiyor. Telefonda (360 px) ve özellikle **f0 kapak karesinde** "gri direk/kalas" okunuyor. Kancanın tek insanı okunmuyor. Sol alttaki kalkan biçimli dirsek yaması (50–120, 1510–1580) anlamsız. | Hikâye nesnesi 360 px'te ne olduğunu söyler; ölçek-derinlik | Kol kameraya doğru genişleyen koni (bilek ≈ 90 px → kadraj kenarında ≈ 200 px), dirsekte 25–35° kırılma, 3–4 kumaş kırışığı (ışık+gölge), manşet ve yama, yıpranmış gri redingot dokusu. Kol kadraja sol kenardan (y ≈ 1250–1400) girsin; alt köşeden değil, böylece IG bölgesini de az kullanır. | **KRİTİK** |
| TB4 | El (350–520, 1020–1170) | El sırtı küçük ölçekte "gaga" (motion da yazdı). Kıstırma okunuyor ama el anatomisi zayıf. | Okunurluk | EldivenEl insert varlığıyla ortak çizim: ince, kemikli, damarlı, 4 parmak boğumu. | ORTA |
| TB5 | p150 (kapanış karesi) | Eldiven hâlâ elde ve aynı yerde; sahne planındaki "134–142 ışık dairesine bırakır, 140 tap" uygulanmamış. Stil karesi aşamasında kabul, ama kapanış karesi şu an plana uymuyor. | Hareket tamamlanır; protokol | Animasyon aşamasında: eldiven sola, havuza (≈ 180, 1120) taşınır ve bırakılır; "tap" p140. | ORTA |
| TB6 | Pencere T (f54–f156) | SAK konumunda sağ gösterge içe-aşağı 45°, direkle üçgen kuruyor: telefonda "darağacı/vinç" çağrışımı sürüyor. f0 (ILK) daha da vinç gibi. | Okunurluk (kanca) | Yönetmen: kanca için iki göstergenin direkten uzaklaşan konumda olduğu bir hedef konum (ör. sol 90 / sağ +45 dışa). Dönem iddiası yok, kod sözleşmesi hazır. | ORTA |
| TB7 | Masa altı koyu bant (0–1080, 1750–1920) | Orkestra sorusu: gerekli mi? **Fiziksel olarak doğru** (masa ön yüzü + altı) ve tamamen IG alt bölgesinde; Instagram ızgara önizlemesi (orta 3:4 ≈ y 240–1680) dışında. Zararsız ama 170 px'lik düz siyah, kapak/döngü karesinde ağır. | Kompozisyon | Koru ama ön yüzü ahşap (çekmece kenarı/pah) yap, saf koyu leke kalmasın; yüksekliği ≈ 120 px'e indir. | KÜÇÜK |
| TB8 | Fener | Kare kafes gölgesi masada zayıf. | Tek ışık / okunurluk | Kafes gölgesi α artır. | KÜÇÜK |

**Mekân:** Tours artık okunuyor: beyaz badana + tuffeau alt bant, alçak kiriş, ova ve kavaklar, mavi direk. Işık mantığı tutarlı ve sıcak; kanca karesinde göz yolu yazı → eldiven → pencere doğru. Mekânın kendisi geçer seviyede, karede kalan sorunlar prop ve kol çiziminde.

---

## 3. SB2-SOKAK (P04) — 8/10, GEÇER (SK1 düzeltilerek)

| # | Bölge (px) | Sorun | Kural | Düzeltme | Öncelik |
|---|---|---|---|---|---|
| SK1 | Baston (550–605, 1280–1420), Louis'nin kolu (550–600, 1180–1230) | **Bastonu tutan el görünmüyor.** Louis'nin kolu François'nın sırtının arkasına giriyor; baston François'nın etek ucunun altından çıkıyor ve iki kardeşin arasında duruyor. Telefonda baston François'nınmış gibi ya da serbest duruyor gibi okunuyor. Baston bu planın dokunuş nesnesi; p150 "Louis durur, baston ucu taşa tık" teması tutan el görünmeden okunmaz. | Fizik (tutulan nesne eli takip eder, kıstıran parmaklar görünür), dokunuş okunurluğu | Baston Louis'nin dış (ekran sağı) elinde, gövdesinin sağında; ucu Louis'nin sağ ayağının önünde. Kardeşe dokunan kol ayrı ve boş. Insert'teki "paça + baston sağdan girer" ile de böylece tutarlı. | **KRİTİK** (küçük iş) |
| SK2 | Yüzler (François ≈ 455–530, 1030–1110) | Orkestra sorusu: göz kırpma telefonda okunur mu? **Hayır.** Yüz ≈ 70–75 px, göz ≈ 12 px; 360 px telefonda göz ≈ 4 px. p189 renderında 100 px'lik telefon kırpmasında göz kırpma seçilmiyor. Push-in sonunda (cs 1.18) bile ≈ 5 px. | Okunurluk (oyunculuk; dokunuş değil) | Yönetmen seçimi: (a) göz kırpmayı kaldır (sahne planı zaten "sıkışırsa ilk o kısalır" diyor), (b) son 0.6 sn'de François'ya cs ≥ 1.6 push-in, (c) yerine okunur bir jest (şapkayı yarım eğme). Öneri: (a) ya da (c). | ORTA |
| SB3 | Birikintiler (330–430, 1305–1370; 680–780, 1335–1410) | Ayna çalışıyor (amber dikey yansımalar), ama kenarları kırık taş gibi tırtıklı ve iç koyu: telefonda "içinde ateş olan çukur" okunabiliyor. | Okunurluk | Kenar yumuşak ve yassı (perspektif elipsine yakın), gök bandı biraz daha açık, kenarda 1 px ay ışığı çizgisi sürekli. | KÜÇÜK |
| SB4 | Saint-Michel tepesi + T (590–660, 365–380) | Replik üst bandının (y 240–400) alt kenarına değiyor; imza siluetin tepesi yazıyla yarışıyor. | Yazı bandı | Kule tepesi y ≥ 410 (kule biraz alçak ya da ölçek) ya da x ≈ 680'e. | KÜÇÜK |

**Mekân:** Şimdi **Bordeaux okunuyor:** bal rengi kesme taş, saçak altı kiremit uçları, yelkenli direkleri, külahsız kule silueti; ilk 0.5 sn testi geçer. Sis düzlemleri, réverbère ve ıslak taş yansımaları estetik; kare kendi içinde dengeli. Göz yolu: altyazı → ay/kule → réverbère → kardeşler. Ayaklar, ızgara ve birikintiler güvenli alanda; replik üst bantta ve hiçbir temasın üstüne binmiyor. p40 (yürüyüş) ve p210 (kapanış) kareleri de tutarlı.

---

## 4. SB2-BORSA (P02) — 6.5/10, DÜZELTİLMELİ

| # | Bölge (px) | Sorun | Kural | Düzeltme | Öncelik |
|---|---|---|---|---|---|
| BB1 | Sol duvar pencereleri (0–110, 170–1000, tepeler 170–300), sağ niş (975–1065, 150–1250) | **Sivri (gotik, ogival) kemer.** Orkestra gözlemi **doğrulandı.** Palais de la Bourse (Gabriel, 1742–49 [D]) 18. yy klasik; yuvarlak (plein cintre) ya da basık kemer. Dentilli korniş ve iyonik pilastrla sivri kemer üslup çatışması; uzun dar pencerelerle birlikte salon **kilise nefi** gibi okunuyor (telefonda en belirgin çağrışım). | Dönem/şehir, mekân dili | `KemerliPencere` varsayılanı **yuvarlak kemer** + kilit taşı; pencere oranı 1:2 (dar lanset değil), alt kısmı kaydırmalı küçük camlar. Niş/kapı da yuvarlak ya da düz lentolu. Sivri kemer bir parametre olarak kalabilir ama hiçbir 1830'lar sivil mekânında kullanılmaz. | **KRİTİK** |
| BB2 | Louis etiketi (650–998, 660–760) ↔ tebeşir kırılma noktası (≈ 650–690, 640–655, p92–p104 toz bulutu) | **Etiket dokunuşun dibinde.** Kırılma ve toz, Louis etiketinin sol-üst köşesine değiyor; parçanın düşüş yolu (tahtadan estrada, x ≈ 650 → 515) ilk 100 px'te etiketin sol kenarının arkasından geçiyor. Ayrıca p92/p98/p104 renderlarında **düşen tebeşir parçası hiç görünmüyor** (yalnız toz noktaları): dokunuş ya uygulanmamış ya da görünmez. | "Yazı hiçbir zaman dokunuşun üstüne binmez"; dokunuş okunurluğu | Etiketler p0–84 arasında görünüp p84–90'da yukarı kayarak çıksın (tasarim 4.3 çıkış biçimi) **ya da** Louis etiketi x ≥ 720'ye, y 560–650'ye. Tebeşir parçası ≥ 14 px, açık renk, koyu kontur, iki sekmesiyle animasyon aşamasında doğrulanacak; P02 p90/p102/p114 protokol karesi zorunlu. | **KRİTİK** |
| BB3 | Tricolore (875–1065, 370–590) | Doğru asılmış (mavi gönderde, şeritler göndere paralel). Ama (a) borsa **iç salonunda** bayrak için kaynak yok; yeni kural: "kanıtsız dönem detayı görsel olarak nötr kalır". "Tricolore 1830'dan beri" ulusal bayrağın varlığı için, iç mekânda asılı olduğunu kanıtlamaz. (b) Kadrajın en doygun lekesi sağ üstte, tahtadan göz çalıyor; kırmızı mühür/hata/vurgu dışında. Orkestra sorusu: **uygun değil.** | Doğruluk (kanıtsız → nötr), kırmızı kuralı | Kaldır. Bordeaux'yu taş, pilastr ve ışık söylüyor; bayrağa gerek yok. (Tasarımcı tasarim.md 1.1'deki "salon girişinde sarkık tricolore" satırını güncellemeli.) | ORTA |
| BB4 | Kamera yüksekliği / ufuk | Oda modeli (`ODALAR.borsa` yNear 1700/sNear 1.15, yFar 1030/sFar 0.6) ölçeği y ≈ 300'de sıfırlıyor: efektif ufuk y ≈ 250–300, kamera ≈ 3.5–4 m. Şartname "göz hizası y 880, kamera 1.6 m" diyordu. **Kare kendi içinde tutarlı** (ön ve arka kompars boyları bu ufka uyuyor, ufuk–ölçek ihlali yok), ama karakterler göz hizası profilinde çizildiği için (silindir tepesi görünmüyor) yüksek kamera ile kukla açısı arasında hafif çelişki var. | Ufuk–ölçek (tutarlılık geçer) | İhlal değil. Yönetmen sahne planına "BORSA efektif kamera ≈ 3.5 m, ufuk ≈ 280" yazsın; kalan iç mekânlar (MAHKEME, YATAK) için ufuk değeri `OdaParam`'dan türetilip belgeye yazılsın. | KÜÇÜK |
| BB5 | Alt bölüm (0–1080, 1440–1920) | Orkestra sorusu: alt 1/3 boş dama. 1500'ün altı zaten IG alt bölgesi (ayrıntı konmaz); güvenli alanda kalan boşluk yalnız 1440–1500. Dolly-in (cs 1.18, cy −60) bunu azaltır. A2'de söz edilen "sol önde bulanık sütun" bu karede görünmüyor. | Kompozisyon | Kabul. İstenirse sütun gövdesi sol kenarda x 0–90, y 900–1920, bulanık; zemine pencere yaması bir tane daha (sağ-alt). | KÜÇÜK |
| BB6 | Pencereler yalnız sol kenardan | Kemerli pencerelerin yalnız sol şeridi görünüyor (motion da yazdı). BB1 düzeltmesiyle birlikte en az bir pencere tam görünsün (ışığın kaynağı). | Tek ışık (görünen kaynak) | Sol duvar eğimi biraz azalt ya da ilk pencere x 20–160'a. | ORTA |

**Mekân:** Salon artık "koridor" değil; pilastrlar, korniş, estrad merdiveni, zemin güneş yamaları ve sıcak bal ışığıyla Bordeaux'nun en parlak, en kalabalık planı olarak çalışıyor. Kompars dili oturmuş, tüccar ayrışıyor, etiketler doğru kişide. Sivri kemerler kalktığında 8 civarına çıkar.

---

## 5. Sistemik — kalan 9 mekândan önce (koşullar)

1. **`KemerliPencere` varsayılanı yuvarlak kemer** (BB1). Kalan mekânların çoğu (MAHKEME, PARIS-AVLU araba kapısı, CATI-KATI, Tours kapı) bu modülü kullanacak; sivri varsayılan her mekâna dönem hatası taşır. Mekân sorumlusu mekanlar.md'ye kemer tipini yazsın (tek sahiplik: şartnamede yoktu, motion boşluğu doldurdu).
2. **`KagitYuzey` (paket kâğıdı) modülü** (TB1/TB2): P09, P10 ve P23 aynı paketi taşıyor. Tasarımcı açılmış/kapalı/kabartılı üç durumun çizim referansını versin; motion modülü bir kez yazsın.
3. **Renk ölçüm aracı yalnız parlaklığa (L) bakıyor, tona bakmıyor.** Örnek: SOKAK "cephe TAS-BDX (gece)" ölçülen `#a37041` (doygun turuncu-kahve), hedef `#8a7e66` (gri-bej): ΔL −3 "✓", ama ton açıkça farklı. Toleranslar da geniş (masa gölgesi ΔL −12 / tolerans 20 "✓"). **Düzeltme:** `sb2_kontrol.py`'ye ΔE2000 (ya da a\*/b\* farkı) sütunu, eşik ≈ 10–12; L toleransı 12'yi geçmesin. Yeni kural "derecelendirme şehir paletini aynılaştırmaz" ancak tonla denetlenebilir.
4. **Kontrol protokolü kare listesi.** A2 yalnız stil karesi verdi; CLAUDE.md artık her plan için ilk kare + dokunuş/temas + kapanış istiyor. Bu turda eksik kareleri ben render ettim; P01 kapanış ve P02 dokunuşta (TB5, BB2) plana uymayan durumlar ancak böyle görüldü. **Düzeltme:** `KARELER` her mekân için en az 3 kare; geçmeyen kare eleştirmene gelmesin.
5. **Kol/el/insan parçası insert'leri** (TB3/TB4): P09, P10, P15, P19, P23 el ve kol insert'lerine dayanıyor. `EldivenEl` ile ortak bir **kol + el** modülü (perspektifle genişleyen kol, dirsek, kırışık, manşet; ince el iskeleti) temel parça sayılmalı.
6. **Tek sahiplik / yukarı akış:** motion'ın değiştirdiği değerler (P02 oda parametreleri + z 1.6/1.7; P04 z 2.4/2.45, ızgara z 2.6 u 0.32, replik üst bant; P01 manipülatör kadraj dışı) sahne planına **yönetmen** tarafından işlenmeli, FareInsert yeniden kadrajı (ızgara konumu değişti) dahil. Aksi hâlde kalan planlar eski değerlerle kurulur.

---

## 6. Orkestra gözlemleri: doğrulama

| Gözlem | Sonuç |
|---|---|
| TOURS paket kapaklı karton kutu gibi, 1834 için anakronik olabilir, kâğıt kanatlar olmalı | **Doğrulandı** (TB1, KRİTİK). Ek bulgu: düğüm açık kutunun ağzında havada asılı (TB2, KRİTİK). |
| Masa alt kenarı altındaki ~250 px koyu boşluk gerekli mi | Fiziksel olarak doğru, tamamen IG bölgesinde ve ızgara önizlemesi dışında; **gerekli değil ama zararsız.** ≈ 120 px'e indirilip ahşap ön yüz yapılsın (TB7, KÜÇÜK). |
| BORSA sivri (gotik) kemerler: dönem hatası mı | **Evet** (BB1, KRİTİK): 18. yy klasik borsa, yuvarlak/basık kemer. Salon kilise nefi gibi okunuyor. |
| Alt 1/3 boş dama | Büyük kısmı IG alt bölgesi; kabul (BB5, KÜÇÜK). |
| Tricolore salonda uygun mu | **Uygun değil:** kanıtsız iç mekân detayı + kırmızı vurgu kuralı; kaldırılsın (BB3, ORTA). |
| SOKAK yüzler ~45 px; göz kırpma telefonda okunur mu | Yüz ≈ 70–75 px (tam boy), göz ≈ 12 px → telefonda ≈ 4 px; **okunmaz** (SK2, ORTA). Kaldır ya da okunur jestle değiştir. |

---

## 7. Yeniden denetim için kabul ölçütleri
- TOURS: TB1, TB2, TB3 kapanır → yeniden kare (f0, p54, p150) + 360 sayfa.
- BORSA: BB1, BB2 kapanır → yeniden kare (p0, p90, p102, p204) + 360 sayfa.
- SOKAK: SK1 düzeltmesi tek kareyle (p150 baston teması) doğrulanır; tam yeniden denetim gerekmez.
- Sistemik koşullar 1–4 karşılanınca kalan 9 mekân paralel başlayabilir; her mekân ilk turda protokol kareleri + ΔE'li renk tablosuyla gelir.
