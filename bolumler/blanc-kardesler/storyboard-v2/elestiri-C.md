# Blanc Kardeşler · Storyboard v2 · Eleştiri C (üçüncü tur, motion A3 sonrası)

Eleştirmen · 2026-11-06 · Girdi: `kareler/SB2-{TOURS,SOKAK,BORSA}-p*.png` (+ `-360`, `-guvenli`), `A3-sayfa.png`, `renk-olcum.md`, motion A3 raporu (katki-raporu.md sonu), `elestiri-B.md`, mekanlar.md (10.1–10.4, 11, 12), tasarim.md (2.2, 4.3, prop listesi), sahne-plani.md v2.5 (P01, P02, P04), dokunuslar.md, mood-05.
Yöntem: kod değişmedi. Kırpma/büyütme ve 7×7 px renk ölçümü scratchpad'de (ffmpeg + PIL). Koordinatlar 1080×1920. Öncelik: **KRİTİK** / ORTA / KÜÇÜK.

## 0. Karar özeti

| Kompozisyon | A | B | **C** | Karar |
|---|---|---|---|---|
| SB2-TOURS (P01, kanca) | 4.5 | 6.5 | **6.5/10** | DÜZELTİLMELİ: B'nin üç kritiği (koli, düğüm, kalas kol) kapandı; iki yeni kritik çıktı (eldiven ölçeği, T kesik) |
| SB2-SOKAK (P04) | 6 | 8 | **7/10** (mekân 8) | MEKÂN GEÇER, PLAN DÜZELTİLMELİ: eldiven sürekliliği (kritik, tasarımdan geliyor), etiket çakışması ve fare insert'i protokolde yok |
| SB2-BORSA (P02) | 5 | 6.5 | **5.5/10** (iskelet 7) | DÜZELTİLMELİ: iskelet doğru (yarım daire arcade, açık avlu), ama "tel örgü" parmaklık, dokunuş okunmuyor, Louis kalemi tutmuyor |

Motion'ın öz puanları (7 / 7.5 / 6.5) TOURS ve SOKAK için yaklaşık 0.5 yüksek. BORSA'da 1 puan yüksek: dokunuş ve el sorunları öz taramada yok.

**Kalan 9 mekâna geçilebilir mi? → İskelet için koşullu EVET, bitmiş plaka için HAYIR.** Ayrıntı ve koşullar bölüm 7'de.

---

## 1. Orkestra gözlemleri: doğrulama

| # | Gözlem | Sonuç |
|---|---|---|
| 1 | Numarasız SB2-TOURS.png / SB2-BORSA.png hâlâ A2 | **Doğrulandı, kapsam daha geniş.** `SB2-SOKAK.png` de A2. Dokuz dosya A2'den kalma (zaman damgası 21:21–21:22; A3 kareleri 22:35–22:38): `SB2-{TOURS,SOKAK,BORSA}{,-360,-guvenli}.png`. Yan yana açınca: koli kutu, damalı salon + bayrak, eski sokak. Kullanıcı ya da ajan yanlış dosyaya bakabilir. → Teknisyen bunları `kareler/arsiv-A2/`'ye taşısın. `sb2_kontrol.py` numarasız ad üretmesin. (ORTA, süreç) |
| 2a | TOURS p60: eldiven, tutan elden çok küçük | **Doğrulandı → KRİTİK (TC1).** El bilekten parmak ucuna ≈ 270 px, eldivenin el kısmı (manşetsiz) ≈ 200 px, avuç genişliği ≈ 90–105 px (elin yüksekliği ≈ 150 px). Eldiven elin **≈ %70–75'i**; p155'te masada yatarken ≈ %65. Telefonda "çocuk/kukla eldiveni" okunuyor. Boş, yassı bir erkek eldiveni elle aynı boyda ya da biraz büyük olur (manşet bilek üstüne taşar). |
| 2b | T kolu kemerli pencerenin üstünde kırpık; telefonda T okunuyor mu | **Doğrulandı → KRİTİK (TC2).** f0'da (A/BEKLE) yatay T tam görünüyor ve telefonda okunuyor. Ama f54 sonrasında B konumunda **iki gösterge de kesik**: sol dikey gösterge pencere kemerine (y ≈ 395) çarpıp bitiyor; sağ gösterge (dışa-yukarı +45°) sağ söveye girip ≈ 30 px kalıyor. Görünen şekil: mavi direk + yatay çubuk + solda yukarı kalkan kol + solda **aşağı sarkan gri karşı ağırlık**. Telefonda bu **darağacı (Γ + sarkan ip)** okunuyor (360 sayfası, pencere ≈ 100 px). B'de olan "şak" bu planın dokunuşu. Dokunuşun vardığı şekil okunmuyorsa dokunuş yok demektir. |
| 2c | İpin altındaki tarama gölgesi garip | **Doğrulandı → ORTA (TC5).** Gölge el + eldiven silueti (p60: 420–760, 1330–1660). Garipliğin iki nedeni var. (a) **Katman sırası:** ip, kâğıt kat çizgileri ve "TOURS" etiket ipi gölgenin **üstünde** tam parlaklıkta. Gölge kâğıdın altına düşmüş gibi okunuyor. (b) Eldivenin gölge "parmakları" kâğıt kenarını (y ≈ 1600) aşıp masaya iniyor ve **y ≈ 1660'ta düz bir çizgiyle kesiliyor**. Bu bir maske kenarı. |
| 3a | SOKAK p189: göz kırpma okunuyor | **Doğrulandı (iyi).** Yüz ≈ 230–240 px; 360 sayfasında kapalı göz seçiliyor. SK2 kapandı. |
| 3b | Asılı fener "FRANÇOIS" satırıyla çakışıyor | **Doğrulandı → ORTA (SC2).** p189'da réverbère gövdesinin alt kenarı (610–765, 180–275) "FRANÇOIS" etiketinin "IS" harflerine biniyor (etiket 445–630, 255–282). p215'te fener tamamen üst yazı bandının içinde (y 80–260, bant 240–400 sınırında). Ayrıca etiket altın `#917140` sis zemini `#665443` üstünde: kontrast ≈ 1.6:1. Telefonda (≈ 10 px harf) **okunmuyor**. |
| 3c | Su birikintisi hâlâ leke | **Doğrulandı → ORTA (SC4).** p0: (335–440, 1305–1365), (665–780, 1335–1400), (345–565, 1700–1790). p189/p215: (35–375, 1565–1760). Kenarı tırtıklı taş gibi; iç koyu, tek renkli, yansıma yok. Push-in'de 340 px'lik **siyah kaya/çukur** gibi okunuyor. SB3 düzeltmesi pencere yansımasını kaldırmış ama yerine ayna koymamış. |
| 3d | Louis P04'te beyaz eldivenli; P19/P02 cep kurulumuyla çatışma | **Doğrulandı → KRİTİK (SÜ1, bölüm 6).** Kök neden motion değil **tasarım kanonu**. tasarim.md 2.2: "François krem eldiven `#e8dcc0`, Louis gri eldiven `#cfc9b8`; rig tüm karakterlere eldiven çizer". Gece amber ışığında Louis'nin eldiveni `#b8ac90` ölçülüyor, Borsa'da François'nınki `#d1c19d`. İkisi de kahraman eldiveni (`#e5d9be`, TOURS p60) ve cep köşesi (`#e4d8be`) ile **aynı krem-beyaz** okunuyor. |
| 4a | BORSA p90: gravür taraması neredeyse görünmüyor | **Doğrulandı.** Bkz. GRAVÜR DİLİ (bölüm 5). Görünen tek yoğun tarama yan arcade parmaklıklarındaki çapraz IV. O da **tel örgü** (KRİTİK BC1). |
| 4b | Tahta ve katip küçük; tebeşir dokunuşu ≥%10 / ≥1 sn şartını sağlıyor mu | **Hayır → KRİTİK (BC2).** Tahta 310×212 px (ekran yüksekliğinin %11'i). Dokunuş şartnamesi "tahta + katip kolu ≈ %22, 1.3 sn", "toz ≥240 px", "parça ≥14 px". Gerçekleşen: katip ≈ 150 px, **koyu kahve siluet koyu yeşil tahta üstünde** (kolu seçilmiyor), toz bulutu ≈ 100 px ve soluk, parça 16×7 px (telefonda ≈ 5×2 px). Kırılma anı telefonda **görünmüyor**. |

---

## 2. SB2-TOURS (P01, KANCA) — 6.5/10, DÜZELTİLMELİ

B'den kapananlar: TB1 kâğıt paket ✓ (tek tabaka, kat izleri, yan duvar yok) · TB2 ip çözük ✓ · TB3 kol koni + dirsek + kırışık + manşet ✓ · TB5 eldiven p140'ta bırakılıyor ✓ · TB7 ön yüz ✓ · BEKLE'de T telefonda okunuyor ✓.

| # | Kare · bölge (px) | Sorun | Kural | Düzeltme | Öncelik |
|---|---|---|---|---|---|
| TC1 | p0–p155 · eldiven (p60: 655–790, 1105–1365) | **Eldiven elden küçük** (≈ %70–75; avuç ≈ 0.6 el genişliği; parmaklar ince çubuk). Filmin kahraman nesnesi telefonda çocuk eldiveni gibi okunuyor. Anlam da kayıyor. | Ölçek (fizik), hikâye nesnesi 360'ta ne olduğunu söyler | `Eldiven` ölçeği ×1.35–1.45: el kısmı ≈ elin boyu (≈ 270 px), avuç ≈ 130 px, parmaklar dolgun ve uçları yuvarlak, manşet ağzı açık (kıstırılan kenar). Eldiven yassı kumaş: kenar biraz dalgalı, sarkarken avuçta tek kırışık. P10/P15/P16/P23 aynı ölçek tablosuna bağlansın (`ELDIVEN_OLCEK` = el boyu × 1.05). | **KRİTİK** |
| TC2 | p54–p155 · pencere (640–1010, 370–800) | **B konumu kesik → darağacı okuması** (bkz. 1/2b). Sol gösterge kemerde, sağ gösterge sövede kesiliyor. Telefonda "Γ + sarkan ağırlık". | Dokunuş okunabilirliği; R9 "A/B telefonda okunmalı"; kanca | Kural: **B'nin tüm uçları pencere camının içinde, kenarlardan ≥ 25 px içeride**. Seçenekler: (a) direği pencerede sola kaydır (x ≈ 780) ve regülatörü ≈ %15 küçült (12 m'de de makul); (b) pencereyi 360 px genişliğe çıkar; (c) kamerayı p54'te hafif yukarı kaydır (cy −30). Ek: sol göstergenin karşı ağırlığı aşağı sarkan "ip + ağırlık" gibi duruyor. Ağırlık kısa ve kola hizalı olsun ki ilmik okunmasın. 360'ta B'yi tek başına test et: "7" ya da "T'nin iki kolu kalkık" okunmalı. | **KRİTİK** |
| TC3 | p0–p155 · fener (200–345, 635–1000) ↔ ışık havuzu (≈ 430, 1170) | **Işık havuzu fenerden kopuk.** Havuz merkezi fener tabanından ≈ 180 px sağda, 170 px aşağıda. Fenerin dibi (200–350, 1000–1050) aydınlık değil. Motion havuzu taşımış ama feneri taşımamış. | Tek ışık kaynağı ("havuz kaynak tanımından türetilir") | Ya fener (430, ≈ 1000)'e gelsin (eldiven bırakma noktası havuzun içinde kalır) ya da havuz fener tabanına dönsün ve bırakma noktası oraya taşınsın. Havuz fener tabanında en parlak, radyal sönümlü olmalı. Kafes gölgesi (TB8) aynı tanımdan: dört dikme gölgesi radyal. | ORTA |
| TC4 | p0–p155 · pencere içi manzara (650–990, 640–790) | **(a) Dağ silueti.** Gri üçgen sırtlar dağ okunuyor. Tours Loire ovasında; yalnız alçak yamaçlar (coteaux) var. **(b) Yuvarlak kule yok.** Direk, eşik hizasında düz beyaz bir döşemeden (780–970, 755–800) çıkıyor. mekanlar 10.4 imza ayrıntısı (1): "yuvarlak kule + mavi direk + siyah T". | Şehir/dönem iskeleti ("imza silueti"), mesafeye göre ayrıntı | Dağ yerine 1–2 çok alçak, yuvarlak sırt (hava perspektifi `#a9a596`, kontrast %25) ya da yalnız arduvaz çatı + baca kümesi. Kule: direğin altında **yuvarlak taş gövdenin üst bölümü** (elips korkuluk/parapet ağzı + eğri gövdede 1 pencere + form takipli `TaramaEgri`), tuffeau beyazı. Eşik hizasında elips okunursa "kule tepesi" anlaşılır. | ORTA |
| TC5 | p0–p60 · el/eldiven gölgesi (420–760, 1330–1660) | Katman sırası: ip, kat çizgileri ve etiket ipi gölgenin üstünde parlak. Gölge masaya taşınca y ≈ 1660'ta düz kesiliyor (maske kenarı). p0'da eldiven kâğıda değiyor ama gölgesi temas noktasına bağlanmıyor (havada asılı gibi). | Tek ışık / maske kenarı kalmaz | Gölge katmanı ip, kat çizgisi ve etiketin **üstünde** (multiply). Gölge çokgeni kâğıt + masa birleşik zemine kırpılsın, alt kesik kalksın. p0'da eldiven ucu ↔ gölge ucu temasta birleşsin. | ORTA |
| TC6 | p0 · yarı açık paket kanatları (515–865, 1105–1175; 545–830, 1395–1530) | Üst ve ön kanat dik kenarlı, düz cetvel çizgili **karton levha** gibi. Telefonda (p0 = kapak karesi) hâlâ "kutu açılıyor" okunuyor. | Hikâye nesnesi okunurluğu, tasarım 4.x YARI AÇIK | Kanatlar yumuşak: kenarı hafif kavisli, köşesi yuvarlanmış, kat çizgisinde ışık + gölge çifti, iç yüzde 1–2 kırışık. Cetvel çizgilerini kaldır. | KÜÇÜK |
| TC7 | p155 · kol (0–220, 1080–1500) | Ön kol neredeyse dikey dikdörtgen, el ondan 90° yana çıkıyor. "L boru" okunuyor; bilek kırığı sert. | Okunurluk | Bırakma sonrası kol hafif geri çekilsin (dirsek 40–50°, bilek 20–30°). | KÜÇÜK |
| TC8 | p0–p155 · el (440–720, 1040–1220) | Parmaklar üst üste dizilmiş "sosis" gibi; başparmak seçilmiyor. Tasarım `kistir` duruşunda başparmak üstte ve görünür olmalı. | Tutulan nesne eli takip eder; kıstıran parmak uçları görünür | Başparmak eldiven manşetinin önünde net, işaret parmağı altta. Diğer üç parmak kıvrık ve geride, daha kısa. | KÜÇÜK |

**Mekân:** Çatı katı bürosu doğru okunuyor: kiriş, badana + tuffeau bandı, lucarne, makara ipi, sıcak geç gün. Göz yolu yazı → el/eldiven → pencere doğru. Kancayı iki şey bekletiyor: eldivenin boyu ve B'nin okunması. İkisi de kanca karesinin hikâyesini taşıyor.

---

## 3. SB2-SOKAK (P04) — 7/10 (mekân 8/10)

B'den kapananlar: SK1 baston dış elde, parmaklar görünür ✓ · SK2 göz kırpma yakında okunuyor ✓ · SB4 kule bandın altında ✓ · ayrı evler, dükkânlar, fıçı ve chasse-roue ile alt üçte bir dolu ✓.

| # | Kare · bölge (px) | Sorun | Kural | Düzeltme | Öncelik |
|---|---|---|---|---|---|
| SC1 | p0, p150, p189, p215 · iki kardeşin elleri (p189 Louis 860–1000, 1290–1480) | **Kardeşler krem/beyaz eldivenli** (üç çizgili dikiş görünüyor). Ayrıntı bölüm 6. | Süreklilik (KRİTİK sınıfı), motif tekliği | Bölüm 6 çözümü. Motion'da tek satırlık iş (`bare(LOUIS)`, François eldiven rengi). Karar tasarımcıda. | **KRİTİK** |
| SC2 | p189 / p215 · fener (610–765, 80–275) ↔ "FRANÇOIS" (445–630, 255–282) | Çakışma + etiket kontrastı ≈ 1.6:1 (bkz. 1/3b). | Yazı hiçbir şeyle çakışmaz; okunurluk | (a) Push-in sonunda réverbère y ≤ 200'de bitsin ya da x ≥ 700'e kaysın (ip noktası sabit, kamera cx). (b) Replik etiketi altın yerine `#e7c37a` + 0 2px 0 #000 gölge, 30→34 px; sis üstünde ≥ 3:1. | ORTA |
| SC3 | p189 / p215 · Louis'nin yüzü (915–1080, 730–990) | Yüzün sağ yarısı kadraj dışında. Göz x ≈ 960–1060, IG sağ şeridinde. Tepki (Louis'nin François'ya bakışı) ikinci aktör ama kesik. Güvenli alan aracı yan payı 80 px alıyor. IG eylem düğmeleri ≈ x 920–1060, y 1100–1700 (baston eli p189'da bu sütunda). | Güvenli alan, oyunculuk = yakın plan | Push-in hedefi cx +40 (iki yüz de kadrajda: François merkez sol, Louis sağ, yüzü x ≤ 1000). Ya da p200–216'da kısa Louis karşı yakın planı. Araç: sağ alt IG sütunu (x 920–1080, y 1100–1700) ayrı kilit bölgesi olarak işaretlensin. | ORTA |
| SC4 | p0, p150, p189 · birikintiler | Leke/kaya okunuyor (bkz. 1/3c). | Okunurluk | Birikinti = **yassı perspektif elipsi** (en/boy ≥ 3:1), kenar yumuşak. İçinde gök bandı (`#2a3352`) + réverbère'in dikey amber yansıması (fener ekseninde, kısa) + üstte 1 px ay ışığı kontur. Yakında (push-in) tek küçük taş kenarı içe taşar. Koyu dolgu kullanma. | ORTA |
| SC5 | p0 · tricolore (190–430, 340–600); p150 kırmızı kama (140–290, 0–80) | Karenin en doygun, en parlak lekesi. Gece ve yakın ışık yok, ama gündüz tonunda boyanmış. "Resmî yapı" cephe olarak diğer evlerden ayrışmıyor. p150'de çerçeveden kesik kırmızı kama göz çekiyor. Plan "isteğe bağlı [T]" diyor. Temmuz Monarşisi'nde resmî yapıda bayrak makul, ama kanıtsız ve kırmızı yalnız vurgu için. | Tek ışık (renk gece tonunda), kırmızı kuralı, kanıtsız → nötr | Öneri: kaldır. Tutulursa: gece paletine indir (mavi `#2b3550`, beyaz `#8a8676`, kırmızı `#5a2a28`), boyut ≈ %60, sarkık. Bina resmî yapı gibi ayrışsın (alınlık/kapı üstü arma kartuşu nötr). | ORTA |
| SC6 | p189 / p215 · François'nın kalkan kolu (390–560, 640–1050) | Kol çenenin ve sol yanağın önünden geçiyor. Yüzün ekran-solu kolla kesiliyor. Uzun koyu favori (640–700, 720–930) telefonda yüzde bir şerit gibi okunuyor. | Okunurluk (yakın planda yüz detaylı) | Şapkayı kaldıran kol yüzün dışından yükselsin (omuzdan yana ve yukarı, dirsek yüzden ≥ 40 px uzakta). Favori ≈ %50 dar, saçla aynı ton, kulak önünde bitsin. | ORTA |
| SC7 | P04 bütünü · fare insert (p78–144) | Planın **dokunuşu** (baston–fare, TAK p108) protokol karelerinde yok. FareInsert yeni ızgara konumuna göre yeniden kadrajlanmamış (motion yazdı). p189 dokunuş değil, oyunculuk karesi. | Kontrol protokolü (her plan için dokunuş/temas karesi) | FareInsert p87 / p108 / p138 kareleri (tam + 360 + güvenli). Bu kareler olmadan P04 plan olarak geçemez. Mekân geçer. | **KRİTİK** (plan onayı için) |
| SC8 | p0 / p150 · üst kat korniş ve balkon altları (ör. p150 0–90, 50–180; 200–280, 190–280) | IV çapraz tarama, büyük aralık ve +60° ile **elmas kafes** deseni veriyor. Cephede "kafes/kafes perde" okunuyor. | Gravür dili (11.2) | Bölüm 5, madde G2. | ORTA |
| SC9 | p189 / p215 · alt kenar (500–720, 1880–1920) | Plan "push-in'de ayaklar kadraj dışına çıkar" diyor, ama çizme burnu hâlâ alt kenarda ve IG alt bandında. | Ayaklar güvenli alanda ya da tamamen dışarıda | cy −20 daha (ya da cs 3.3) ile ayaklar tamamen dışarıda. | KÜÇÜK |
| SC10 | p0 · Saint-Michel (430–510, 450–760) ve direkler (430–650, 640–960) | Gemi direkleri kulenin **önünde**. Sokak rıhtıma iniyorsa, kule rıhtımın ötesinde, yani karşı kıyıda kalır. Saint-Michel karadadır, rıhtıma ≈ 150 m. | İskelet/şehir coğrafyası | Kule sokak ekseninden sola, çatıların arkasına (plan: "sol-arka, çatıların arkasında"). Direkler eksende kalabilir. | KÜÇÜK |
| SC11 | p0 · François'nın sallanan bacağı (≈ 510–580, 1235–1280) | İlk karede baldır öne yatay, ayak ≈ 17 cm havada. Tekme gibi okunuyor. | Yürüyüş okunurluğu | `yuru` faz ofseti: p0 temas ya da geçiş pozunda başlasın. | KÜÇÜK |

**Mekân:** Bordeaux ilk 0.5 sn'de okunuyor: bal taşı, ayrı evler, ferforje soylu kat, dükkân tabelaları, rıhtım direkleri, réverbère ipi. Tek ışık mantığı tutarlı. Yakın plan sisi kademeli. Mekân geçer. Mood-05'e göre eksikler gravür bölümünde (iç kontur ve söve rölyefi az, cephe düz).

---

## 4. SB2-BORSA (P02) — 5.5/10 (iskelet 7/10)

B'den kapananlar: BB1 yarım daire arcade + kilit taşı + imposte ✓ · BB3 bayrak yok ✓ · BB4 ufuk 800 / göz 1.6 m, kompars ölçekleri tutarlı ✓ · BB6 ışık kaynağı (açık gök) ✓ · alt üçte bir dolu ✓ · etiketler kırılmadan önce çıkıyor ✓ · tebeşir parçası p168 ve p203'te yerde duruyor (hareket tamamlanmış) ✓.

| # | Kare · bölge (px) | Sorun | Kural | Düzeltme | Öncelik |
|---|---|---|---|---|---|
| BC1 | p0 / p90 / p168 / p203 · yan arcade'lar (p0 110–240 ve 840–970, 560–1000; p168 830–1080, 0–900) | **Demir parmaklık + IV tarama = modern tel örgü (çit teli).** Elmas desen telefonda da net. Oluklu koli gibi bu da bir dönem okuma hatası: elmas örgülü tel çit 1840'lar sonrası. p168'de Louis'nin arkasında kadrajın üçte birini kaplıyor. | Dönem okuma, mekân dili | Parmaklık: **seyrek dikey demir çubuklar** (≈ 18–22 cm, uçları mızrak), alt + üst yatay kuşak, üstte yarım daire lunette'de ışınsal çubuklar. Arkası **III tek yön tarama** (çapraz yok), demirden açık ton. Çapraz IV yalnız kapalı köşede, küçük alanda. | **KRİTİK** |
| BC2 | p84–p114 · tahta + katip + tebeşir | **Dokunuş telefonda okunmuyor** (bkz. 1/4b). Tahta %11, katip siluet koyu-üstüne-koyu, toz soluk, parça 16 px. | Dokunuş okunurluğu (≥ %10 + göz yönlendirme, ≥ 1 sn), küçük jest = yakın kamera | Plan zaten "p+90–150 boy/orta tebeşir" diyor, uygulama geniş kalmış. Çözüm (yönetmen + motion): **p84'te kesme → tahta insert/orta** (tahta ≥ %30 ekran, katip eli + tebeşir ≥ 60 px). Kırılma, toz (≥ 240 px, güneşte asılı), parça (≥ 40 px ekranda) burada. p102'de geniş plana dönüp sekme + kalabalık donması. Katip siluet değil: rig `KATIP` paleti, kol ve el **açık manşetle** tahtadan ayrışsın, tahtanın önünde ışık sınırı (plan: "ışık sınırı tahtanın hemen önünde") katibi kenar ışıkla ayırsın. | **KRİTİK** |
| BC3 | p168 · Louis göğüs (el 410–480, 1120–1185; kalem 180–260, 1010–1180) | **Louis yazmıyor.** "El" parmaksız krem bir kart (eldiven). Kaz tüyü defterin sırtında **kendi başına dik duruyor**, elle bağlantısı yok. Defter üstünde açıklanmamış bir **gözlük** (gri iki yay, 260–390, 1140–1160) var. Plan: "kafası kalkmaz, yazar; defter, kalem, el kadrajda; kalem cızırtısı". | Tutulan nesne eli takip eder (fizik, KRİTİK); temas = ses (cızırtı görünür bir yazma ister); her nesnenin yeri anlamlı | Göğüs planında `KolEl` (A3'te yazılan modül) ile **yazan el**: tüy başparmak + işaret + orta parmak arasında, ucu kâğıtta, sayfada mürekkep satırı ilerlesin. Gözlük tasarımda yoksa kalksın; varsa (Louis'nin hesapçılığı) burnunda olsun. Bu kare oyunculuk karesi: yüz iyi (≈ 290 px), el aynı ciddiyette olmalı. | **KRİTİK** |
| BC4 | p0–p78 · isim etiketleri (François 255–600, 640–740; Louis 650–1000, 630–730) | (a) François etiketi tahtanın başlığını ve satırlarını örtüyor. p30–78 boyunca katibin yazması (dokunuşun kurulumu) görünmüyor. (b) Louis etiketinin merkezi x ≈ 825, şapkası x ≈ 670. Etiket komparsların ve parmaklığın üstünde, bağlantı ucu sağa (x ≈ 930) gidiyor, Louis'yi göstermiyor. François etiketinin ucu da sola-aşağı. | Etiket kendi karakterinin üstünde; yazı dokunuşun (kurulumunun) üstüne binmez | Önerim: etiketler **p0–30** arasında görünsün (katip p30'da yazmaya başlar) ve **tahtanın iki yanına** konsun (François x 120–380, Louis x 720–980, y 600–700), tahtayla çakışmasın. Bağlantı çizgisi kendi şapka tepesine insin. | ORTA |
| BC5 | p0 · ön portik çerçevesi (0–110 ve 970–1080 tam boy; 0–1080, 1600–1920) | Koyu, çapraz taramalı düz şeritler. Pah, sütun başlığı, kemer başlangıcı, ışık kenarı yok. Telefonda **siyah çerçeve/letterbox** okunuyor, mimari değil. Alttaki tezgâh p203'te köşede kesik bir parça (935–1080, 1770–1880). Amacı okunmuyor. | Ölü alan yok (alan dolu ama boş okunuyor), her nesnenin yeri anlamlı | Sol ve sağ ayak: iç kenarda 1 ışık pahı, üstte imposte + kemer başlangıcı (kemer içi IV). Zeminde avlu güneşinin portik eşiğinde bitiş çizgisi (sert gölge kenarı). Tezgâh ya tam görünsün (defter + hokka, katip yardımcısı tezgâhı) ya da kalksın. Demir kapı kanadı BC1 parmaklık diliyle aynı. | ORTA |
| BC6 | p0 / p90 / p203 · karakter gölgeleri, kemer içleri | Gölgeler **yumuşak bulanık elips** (gravürde gölge kenarı net, tarama III). Öğle güneşi tepeden ama kemer içi (intrados), portik tavanı ve sütun gölgeleri ışıktaki duvarla aynı ton. Mekânın ışık/gölge iskeleti eksik. | Gravür 11.2 / 11.5, tek ışık | Bölüm 5, G1. | ORTA |
| BC7 | p0–p203 · Louis'nin cep eldiven köşesi | P02 **kurulum planı** ("sağ göğüs cebinde beyaz eldiven köşesi"). Louis'nin kolu göğsünü örttüğü için köşe hiçbir karede görünmüyor. | Süreklilik (kurulum → karşılık) | Bölüm 6 ile birlikte: cep tarafı kameraya dönük, köşe p168 göğüs planında kolun **üstünde** kalsın. | ORTA |
| BC8 | p0 / p90 · karakter boyu | Ufuk 800, göz 1.6 m. François'nın gözleri y ≈ 920 (p0 cy +30 sonrası bile ≈ 60–90 px aşağıda). Kardeşler ve tüccar ≈ 1.50–1.55 m çıkıyor. Arka komparslar da kısa, yani tutarlı ama herkes kısa. | Ufuk–ölçek | `Kukla` boy katsayısı ≈ 1.07 ya da ufuk ≈ 840. Biri yeter. | KÜÇÜK |

**Mekân:** Açık portikli avlu iskeleti doğru ve okunuyor: yarım daire arcade, kilit taşı, imposte, üst katta dikdörtgen pencereler, korniş, tympanum amblemleri, harfsiz kadran. Bordeaux'nun bal rengi taşı gündüz ışığında Sokak'tan ayrışıyor. Planı geri bırakan üç şey: tel örgü, okunmayan dokunuş, yazmayan el. Bunlar kapanınca 7.5–8 bekliyorum.

---

## 5. GRAVÜR DİLİ değerlendirmesi

**Okunuyor mu? → Telefonda HAYIR, tam boyda kısmen.** 360 px sayfada üç kompozisyon da "temiz düz vektör çizgi film" okunuyor. Kullanıcı onaylı yön "1830'lar renkli litografi / çelik gravür, kukla tiyatrosu dekoru" henüz ekranda yok. Mood-05 ile 360 px yan yana bakıldığında fark tarama yoğunluğundan çok **mürekkep çizgisinin mimariyi taşımasında**. Mood'da her söve, kat silmesi, konsol, kilit taşı koyu iç konturla çizili ve gölge tarafı tonlu. Bizde mimari ince açık kontur ve düz dolgu.

| Mekân | Ne var | Ne eksik |
|---|---|---|
| TOURS | Lucarne yanağında dikey tarama, el/kol atılan gölgesi taramalı, sol duvar kenarı | Kiriş alt yüzleri, masa altı, pencere iç söveleri (III–IV), kâğıt dokusu; `RenkKaydi` yok |
| SOKAK | Korniş/balkon altında çapraz tarama (kafes gibi okunuyor), taş derzleri | Gölge tarafı cephe (sol sıra) II–III, kemer içleri, saçak altı IV, söve ve kat silmesi konturları; bulanık sis düzlemleri gravürü yutuyor |
| BORSA | Korniş dişlerinde çizgi, çerçeve ve parmaklıkta çapraz IV (tel örgü) | Kemer içleri, portik tavanı, sütun gölgeleri, karakterlerin net taramalı gölgeleri, avlu taşında derz + ton; mekânın neredeyse tamamı I basamağında (ışık) |

**Kök nedenler (sistemik):**
1. **Telefon ölçeği hesaba katılmamış.** Yakın tarama 1.4 px / 6 px aralık, 360'ta 0.47 px / 2 px. Çizgi kaybolup düz bir ton kayması kalıyor. Çapraz IV ise büyük alanda moiré/elmas desene dönüşüyor (tel örgü, kafes).
2. **Basamak dağılımı yanlış yerde.** Tarama büyük ve önemsiz yüzeylerde (çerçeve, parmaklık arkası), ışığın mimariyi anlattığı yerlerde (kemer içi, saçak altı, söve gölgesi) yok. `basamakBul` normalden basamak buluyor ama mimari modüller (Kemer, Cephe) intrados, soffit ve söve yüzü için **normal vermiyor** olabilir. Motion kontrol etsin.
3. **Atılan gölgeler eski `Golge` bulanık dolgusuyla** çiziliyor (Borsa karakterleri, Sokak kardeşleri). 11.5: "gölge çokgeni Tarama III, kenar yumuşatma yok".
4. **İç kontur hiyerarşisi (11.4, 6 : 3 : 1.4) uygulanmamış.** Mimari kontur ≈ 2 px açık kahve, karakter konturu ≈ 4–5 px koyu. Karakterler mimariden ayrı bir dünyadan yapıştırılmış gibi duruyor.
5. **`RenkKaydi` ve suluboya kenarı yok**, kâğıt lifi görünmüyor. Litografi imzasının ikisi eksik.

**Nasıl güçlendirilir (öncelik sırasıyla, hepsi modül düzeyinde, tek yerden):**
- **G1 · Gölge iskeleti önce.** Her mekânda ışığa göre III/IV alacak yüzeylerin listesi: kemer içi, portik tavanı, saçak/balkon altı, söve iç yüzü, kapı/pencere aralığı, masa altı, kiriş altı, karakter atılan gölgesi. Bunlar dolgu L −%8…−15 + tarama ile koyulsun. Gravür önce **ton bloğu** olarak okunur, sonra çizgi olarak.
- **G2 · Telefon önce tarama ölçüsü.** Yakın: aralık 7–8 px, çizgi 2.0–2.4 px. Orta: 9 px / 1.6 px. Uzak: tarama yok. Kalınlık kuralı "≤ kontur/3" yerine "≤ kontur/2". IV: ikinci yön **+35…45°** (60° değil), **yalnız < 120×120 px alanlarda** ya da yoğunluk maskesiyle kenara doğru sönen bölgede. Büyük düz alanda çapraz yok.
- **G3 · İç kontur.** Kemer, söve, kat silmesi, korniş profili, konsol: 3 px `ink(fill)` koyu; dış siluet 5–6 px. Mimari çizgi karakter çizgisiyle aynı aileye çıksın.
- **G4 · Atılan gölge = taramalı çokgen.** `Golge` → `Tarama basamak="III"`, net kenar, IV çekirdek. Borsa'da öğle güneşi: kısa ama **net** gölgeler.
- **G5 · Litografi imzası.** `RenkKaydi dx 1.5, dy 1` statik plakalara; kâğıt lifi multiply α .06–.08; düz dolgu kenarında 2 px suluboya kenarı.
- **G6 · Kabul testi.** 360 px'te (a) her mekânda en az üç yerde tarama seçilmeli, (b) hiçbir yerde kafes/örgü deseni okunmamalı, (c) mood-05 yanında aynı aileden görünmeli. Bu test A4 sayfasına ayrı satır olarak girsin (mood-05 | Borsa p0 | Sokak p0, hepsi 360).

---

## 6. SÜREKLİLİK — eldiven

**Durum.** Filmde üç beyaz eldiven rolü var:
1. **Kahraman eldiveni:** memurun paketi (P01, P10, P15, P16, P23), `#f4efe2`.
2. **Louis'nin cebindeki eldiven:** P02–P07 göğüs cebinde beyaz köşe → P19'da cepten çıkarılıp **çıplak ele** parmak parmak giyilir ("yükseliş").
3. **Rig kanonu:** François krem `#e8dcc0`, Louis gri `#cfc9b8` eldivenle çiziliyor (tasarim.md 2.2, "rig tüm karakterlere eldiven çizer").

Render'da ışık altında üçü de **krem-beyaz** (ölçüm: Louis gece `#b8ac90`, François gündüz `#d1c19d`, kahraman `#e5d9be`, cep köşesi `#e4d8be`).

**Sonuç (KRİTİK, SÜ1):**
- P19 dokunuşu boşa düşüyor. Louis filmin başından beri beyaz eldivenli görünüyor. "Eldiven giyerek yükselme" okunmaz, ancak "eldivenini değiştirdi" okunur.
- P04'te aynı anda **eldiven giymiş** ve **cebinde eldiven** taşıyor (göğüsteki beyaz dikdörtgen, p189 930–1000, 1120–1165). Parmaksız olduğu için telefonda bilet/rozet okunuyor.
- Kahraman eldiven motifi (memurun sırrı) kardeşlerin ellerinde de görünüyor. Sesi kapalı izleyen "beyaz eldiven" ile kimi bağlayacağını bilemiyor.

**Çözüm (tek sahiplik: tasarımcı karar verir → yönetmen tabloya işler → motion palet değiştirir):**
- **Louis P02–P18: çıplak el** (`bare(LOUIS)`, `LOUIS_ELSIZ` P18'den P02'ye genişler). Eldiven yalnız cepte. P19'da ilk kez elinde.
- **François:** eldiven korunacaksa koyu/ten dışı bir ton (taba/sarı-kahve deri, ör. `#8a6a48`). Krem-beyaz kalmasın. Alternatif: o da çıplak el.
- **Beyaz (`#e5d9be`–`#f4efe2` bandı) = yalnız kahraman eldiven + Louis'nin cep eldiveni.** Renk tablosuna kural olarak girsin (renk ölçümüne "eldiven beyazı yalnız bu iki nesnede" kontrolü).
- **Cep köşesi okunur hâle gelsin:** ≈ 24×14 px yerine yakında ≈ 50×30 px, iki parmak ucu ayrı (yuvarlak), cep ağzı çizgisi, hafif sarkma. Telefonda "eldiven ucu" okunmalı, "kart" değil. P02 göğüs planında (p168) kolun üstünde görünür.
- Yukarı akış: bu bir tasarım belgesi değişikliği. Orkestra tasarımcıya iletsin. Kalan mekânlarda (CATI-BDX P06, P07, MAHKEME P18) karakterler bu kararla çizilsin.

---

## 7. Kalan 9 mekâna geçilebilir mi?

**Karar: İSKELET için koşullu EVET, bitmiş plaka (ışık + gravür + teslim) için HAYIR.**

Gerekçe: A3'ün sistemik modülleri (Kemer, Cephe, KolEl, PaketKagidi, ölçüm aracı ΔE + ΔH°, protokol kareleri) çalışıyor. Mimari iskelet üç mekânda da doğru okunuyor: Tours lucarne, Bordeaux ayrı evler, Borsa yarım daire avlu. Ama iki **sistemik** sorun her mekâna taşınır:
- (a) **gravür dili telefonda okunmuyor** ve çapraz tarama örgüye dönüşüyor;
- (b) **eldiven paleti.**

Bunlar şimdi çözülmezse 9 mekân ikinci kez boyanır. Tarama ve gölge modül düzeyinde (pişirilmiş katman) olduğu için iskelet işi boşa gitmez: modül düzelince plakalar yeniden pişer.

**Koşullar (öncelik sırasıyla):**
1. **Eldiven kararı (SÜ1)**: tasarımcı → yönetmen → motion palet. Karakterli tüm mekânları etkiler. *Engelleyici.*
2. **Gravür kalibrasyonu A4 (G1–G6)**: tek mekânda (öneri BORSA, en zayıf olan) gölge iskeleti + telefon önce tarama + iç kontur + taramalı atılan gölge. Kabul testi G6, eleştirmen onayı. *Bitmiş plakalar için engelleyici; iskelet için değil.*
3. **Tel örgü / kafes yasağı (BC1, SC8)**: IV kuralı modülde değişsin (G2). Parmaklık modülü dikey çubuk. *Engelleyici* (aynı desen MAHKEME korkuluğu, YATAK demir karyola, CATI korkuluğu gibi her demir elemana gelir).
4. **Dokunuş ölçek kuralı (BC2, TC2)**: yönetmen kalan planlar için her dokunuşun **ekran ölçüsünü** sahne planına yazsın (nesne px, plan tipi). Motion bunu protokol karesinde ölçüp tabloya koysun (A3'te yalnız yüz ölçüldü). Uzak plandaki dokunuş = kesme ya da push-in.
5. **Eski dosyalar ve araç**: numarasız 9 A2 dosyası arşive. `sb2_kontrol.py` IG sağ-alt düğme sütununu (x 920–1080, y 1100–1700) ayrı kilit bölgesi olarak denetlesin. Protokol her planın **dokunuş** karesini içersin (P04 fare insert eksikti, SC7).
6. **Plan düzeyi kritikler (iskeletle paralel)**: TC1 eldiven ölçeği, TC2 B görünürlüğü, BC2 tebeşir insert, BC3 yazan el, SC7 fare insert kareleri. Bunlar 9 mekânı bekletmez. A4'te aynı turda kapanmalı ve yeniden kare + 360 ile gelmeli.

**Paralel başlayabilir (şimdi):** kalan 9 mekânın mimari kartından **iskelet blok plakası** (Kemer/Cephe modülleriyle düz dolgu, doğru kat düzeni ve açıklıklar, kamera/ufuk, karakter z/u yerleşimi, güvenli alan). Her biri tek kare + 360 olarak eleştirmene gelsin (iskelet onayı). Işık, tarama ve doku A4 kalibrasyonu geçince.

---

## 8. Yeniden denetim kabul ölçütleri (A4)
- **TOURS:** TC1 (eldiven ≈ el boyu), TC2 (B'nin tüm uçları camda; 360'ta "7" okunur), TC3 (havuz fenerden), TC4 (dağ yok, kule tepesi elipsi). Kareler: p0, p54, p60, p140, p155 + 360.
- **SOKAK:** SC1 (kardeş elleri kararına göre), SC2, SC4, SC7 (fare insert p87 / p108 / p138). Kareler: p0, p150, p189 + insert üçlüsü.
- **BORSA:** BC1, BC2 (tahta insert p84–102), BC3 (yazan el). Kareler: p0, p86, p90, p102, p168, p203 + 360.
- **Gravür:** G6 karşılaştırma sayfası (mood-05 | Borsa | Sokak | Tours, 360 px).
- **Renk:** mevcut 11 noktaya ek: her mekânda bir gölge (III) bölgesi ve "eldiven beyazı" kontrolü.
