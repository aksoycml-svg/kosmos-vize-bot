# Blanc Kardeşler · Storyboard v2 · Eleştiri A (kalibrasyon kalite kapısı)

Eleştirmen · 2026-11-06 · Kareler: `kareler/SB2-TOURS.png` (P01 p60), `SB2-SOKAK.png` (P04 p160 = 724), `SB2-BORSA.png` (P02 p120 = 276).
Yöntem: tam çözünürlük + bölge kırpma (2–3× büyütme) + telefon boyutu (360×640, area ölçekleme) + piksel örnekleme (PIL) + kod kontrolü (`Sb2Sokak.tsx`, `Sokak.tsx zemin()`). Kod değiştirilmedi.
Koordinatlar 1080×1920 piksel. Öncelik: **KRİTİK** / ORTA / KÜÇÜK.

## 0. Karar özeti

| Kare | Puan | Karar | Tek cümle |
|---|---|---|---|
| SB2-TOURS (P01, kanca) | **4.5/10** | DÜZELTİLMELİ | Mekân okunmuyor (masa = döşeme, duvar tuffeau değil), eldiven tutulmuyor, ışık huzmesi gölgelerle ters, T kolu telefonda vinç gibi; kanca karesinin üst yarısı ölü. |
| SB2-SOKAK (P04) | **6/10** | DÜZELTİLMELİ | Atmosferi en iyi kare, ama gökte katman/maske hatası, ızgara kurulumu ve ayaklar yazı/IG bölgesinde, şehir Paris gibi okunuyor, ıslaklık yok. |
| SB2-BORSA (P02) | **5/10** | DÜZELTİLMELİ | Mekân "borsa salonu" değil "uzun koridor"; ışık kaynağı (pencereler) anlamsız çizgi; ön plan kafaları ufuk kuralını bozuyor; "François" etiketi tüccarın üstünde. |

Hiçbiri temel olarak geçmiyor. Doku altyapısı (blok, damar, kâğıt lifi, gren, kontur) sağlam; **sorun dokuda değil, mimari söz dağarcığında, ışık geometrisinde ve yerleşim-güvenli alan disiplininde.** Bunlar sistemik (bölüm 6), kalan 9 mekâna taşınmadan çözülmeli.

---

## 1. SB2-TOURS (P01, p60) — kanca karesi

### 1.1 Kural ihlalleri

| # | Bölge (px) | Sorun | Kural | Düzeltme | Öncelik |
|---|---|---|---|---|---|
| T1 | El (310–470, 1020–1140), eldiven (370–520, 1065–1340) | **Eldiven tutulmuyor.** El avucu yukarı açık, parmak uçları manşet ağzına sadece değiyor; kıstırma yok. Eldiven dik, katı, tek parça "porselen kalıp" gibi; sarkma/kıvrım yok. Bu durumda eldiven düşer. | Fizik: tutulan nesne eli takip eder | Başparmak + işaret parmağı manşet kenarını **içten-dıştan kıstırsın** (el yan döner, avuç kameraya değil eldivene); manşet kıstırma noktasında katlanır, eldiven 4–6° salınır, parmaklar hafif kıvrık ve ayrık sarkar (yumuşak deri). Eldiven gölgesi kâğıda düşsün (bkz. T3). | **KRİTİK** |
| T2 | Huzme (≈560–1000, 790 → 820–1080, 1300) vs. kol gölgesi (280–420, 1330–1500) | **Işık yönü çelişkisi.** Pencereden giren huzme sağ-aşağı (kameraya-sağa) akıyor; kolun gölgesi sol-aşağı düşüyor. Şartname "gölge sol-aşağı (pencere sağ-üst)" diyor: huzme yanlış yönde. | Fizik: gölgeler ışık kaynağının tersine | Huzme ve gölgeleri **tek ışık vektöründen** üret: huzme pencereden sol-aşağı (fenere doğru) aksın, masa üstünde pencere biçimli parlak yama (kayıt gölgeli) bıraksın. | **KRİTİK** |
| T3 | Eldiven, fener | Eldivenin **hiç gölgesi yok** (kolun var). Fener tabanında temas gölgesi çok zayıf; fener masada mı yerde mi belirsiz. | Temas gölgesi | Eldiven gölgesi kâğıtta sol-aşağı, yükseklik kadar ofsetli (havada olduğu okunur). Fener tabanına koyu temas elipsi + fener kafes gölgesi. | ORTA |
| T4 | Fener önü (sahne planı: ışık dairesi r 220) | **Fener ışık havuzu yok.** p134–142'de eldiven "masadaki ışık dairesine" bırakılacak; hedef kurulmamış. | Süreklilik (kurulum → karşılık), dokunuş katkısı | Fener önünde sıcak amber elips havuz (r ≈ 220, `screen`, α .25–.35) + kafes gölgeleri; havuz kenarı yumuşak ama okunur. | **KRİTİK** |
| T5 | Alt yarı (0–1080, 800–1920) | **Masa = oda döşemesi gibi okunuyor.** Tahtalar 150 px genişlikte, duvar dibinden kadraj altına kesintisiz uzanıyor; duvar dibinde süpürgelik var (döşeme işareti); masa ön kenarı, kalınlığı, masa üstü eşyası yok. Fener "yerde duran fener" gibi. (Koordinatör gözlemi **doğrulandı**.) | Mekân okunurluğu, ölçek | Masa tahtası dar (≈60–80 px) ve tek yön; masanın arka kenarında duvardan ayrılan ince gölge çizgisi + masa üst kenar pahı; süpürgelik kaldırılsın. Masa üstüne 2–3 kullanım nesnesi (hokka + kaz tüyü, ciltli kayıt defteri köşesi, mum lekesi halkaları — mekanlar.md 3.4 "2 halka iz"). Alt 420 px'te masanın ön kenarı ve koyu ön yüzü (şartnamedeki MASA-PLAKA: masa üst düzlemi y 800–1700). | **KRİTİK** |
| T6 | Paket (200–790, 1040–1550) | **Paket kâğıdı bir şey sarmıyor.** Düz bir yaprağın ortasında pahlı dikdörtgen "kutu kapağı" çizilmiş; açılmış paket (dört kanat, kat izleri, çözülmüş ip) okunmuyor. Eldiven "kâğıttan çekiliyor" değil, "çerçevenin önünde duruyor". (Koordinatör **doğrulandı**.) P23 bu kareyi aynalayacak: hata ikiye katlanır. | Dokunuş sebep-sonuç (eldiven kâğıttan çıkar → kol şak) | Açılmış paket: merkezde eldiven biçimli sığ çukur/kırışık yatak, dört kanat dışa yatık (her kanatta kat çizgisi ışık+gölge çifti), köşe kıvrıkları, çözülmüş ip iki uçtan sarkık, fiyonk izi. KAGIT-PAKET dokusu (uzun lif) görünür olsun. | **KRİTİK** |
| T7 | Pencere içi T (720–1000, 475–700) | **Telefonda T okunmuyor.** 360 px'te sol gösterge yukarı + sağ gösterge içe-aşağı çapraz + iki kablo + topuz = "inşaat vinci / iskele". Jaluzi yarıkları krem-beyaz (gökten açık) kesik çizgiler: "uyarı bandı/cetvel" etkisi. Direk (`#8d9390` ölçüldü) soluk altın gök (`#dbc99e`) önünde ince ve düşük kontrastlı: T'nin sapı kayboluyor. | Okunabilirlik (≥%10, telefonda net); kanca R8 | Direk 1.5× kalın, gölge yüzü `#5f7a96` + koyu kontur. Yarıklar gök renginde ve 3–4 adet (telefonda dolu siyah siluet okunsun). Bu karede (p54 sonrası) sağ göstergeyi aşağı-içe değil **dışa-yukarı 45°** gibi T'yi bozmayan bir konuma koymak yönetmene öneri (kanca = "T + bir kol"). Kablo topuzu küçültülsün. | **KRİTİK** |
| T8 | TOURS etiketi (855–1005, 1400–1470) | Instagram sağ buton sütunu (x > 920) etiketin "RS" kısmını kapatır. | Güvenli alan (sağ 160) | Etiket x ≤ 880'e, ipin ucu sola alınsın. | ORTA |
| T9 | Üst yarı (0–1080, 0–440) | Kanca karesinin üst %23'ü düz bej duvar + tek ip: ölü alan. Şartnamedeki **tavan kirişleri yok** (mekanlar 3.4 "üst 220 px tavan kirişleri", "alçak tavan kadrajı bastırır"). | Kanca, kompozisyon | Üst 220 px'e 2 koyu meşe kiriş (ayrıntısız), kirişten inen makara + kablo pencere A'ya doğru (manipülatör ilişkisi fiziksel okunur). Yazı şeridi kiriş altında kalır. | ORTA |

### 1.2 Mekân kalitesi
- **Şehir/yer okunmuyor.** Duvar örneklendi: `#ad9d7f` (gri-toprak bej). Şartname TUFFEAU `#e6e0cc` (süt beyazı, tebeşirimsi, sarı/gri bulutlanma, nem bandı, petek). Borsa duvarı `#bda67a`: **Tours ile Bordeaux aynı renk ailesinde, sadece Tours biraz daha kirli.** "Tours = beyaz kutu" ayrışması yok. Badana/çıplak taş ikiliği, kabarma, dökülme yamaları görünmüyor.
- **Doku:** taş bloklar düzgün ve düşük kontrastlı, "duvar kâğıdı" etkisi. Döşeme damarları güzel ama yanlış nesnede (masa değil döşeme gibi).
- **Işık:** şartname "çok yüksek kontrast, tek amber kaynak + dış soğuk". Kare L aralığı 25–221, ortalama 119: puslu, gri, kontrastsız. Fener sıcaklığı odaya yansımıyor; pencere güneşi masada iz bırakmıyor (huzme dışında).
- **Göz yolu (360 px):** yazı → beyaz eldiven → pencere. İyi sıra. Ama eldiven "sergilenen nesne" olarak okunduğu için eylem (çekme) ve merak zayıf. Kanca ses kapalı: "1834. Bilgisayar yok." + eldiven + garip makine; makine okunmazsa soru yarım kalır.
- **Pencere manzarası** (ova + kavaklar) güzel ve Touraine'i doğru işaret ediyor. Pencere çerçevesi/cam dalgası iyi.

### 1.3 Dönem
- Fener, 6 camlı pencere, Chappe T (yel değirmeni değil), gri karşı ağırlık, mavi direk: doğru.
- Manipülatör şartnamede "pencere A önünde tezgâhta"; P01'de pencere A kadrajda ama manipülatör yok. Ya bu pencere A değil, ya manipülatör kadraj sağında. Tavandan inen ip sağa gidiyor; okuma mümkün ama **yönetmen yazılı karar vermeli** (P11 sürekliliği).

---

## 2. SB2-SOKAK (P04, p160 = 724)

### 2.1 Kural ihlalleri

| # | Bölge (px) | Sorun | Kural | Düzeltme | Öncelik |
|---|---|---|---|---|---|
| S1 | Gök: x ≈ 405 ve ≈ 683 dikey keskin kenarlar, y 0–≈600 | **Katman/maske hatası.** Sokak boşluğunda düz gradyan gök şeridi, iki yanda bulutlu gök; aralarında cetvelle çekilmiş dikey sınır. Saint-Michel'in sol kenarı bu sınıra yapışık/kırpık. (Koordinatör **doğrulandı**.) Gök katmanı `kat(0.25)` paralaksla, bulut/çatı katmanı başka ölçekte; bulutlar sokak boşluğuna kadar uzanmıyor ya da boşluk maskesi bulutları kesiyor. | Teknik kusur (temel modül) | Bulutlar gök katmanına (tek katman, tam genişlik) taşınsın; sokak boşluğu maske değil, cephelerin önde durmasıyla oluşsun. Kontrol: gök katmanını tek başına render et, dikey kenar kalmamalı. | **KRİTİK** |
| S2 | Ayaklar: François (512, 1542), Louis (649, 1527) — `zemin()` ile hesaplandı | **Ayak teması alt 420 px Instagram bölgesinde** (y > 1500). Push-in sonu (p216, cs 1.18, cy −120) bile ayaklar y ≈ 1527. Ayrıca altyazı (y ≈ 1430–1490) iki kardeşin baldırlarını kapatıyor; baston ucu teması (630, 1535) IG altında. | Güvenli alan; fizik okunurluğu (ayak-zemin, baston "tık" p150 görünmeli) | Sahne planı z değerleri düzeltilsin: orta planda François z ≥ 2.4, Louis z ≥ 2.45 (ayak y ≈ 1420–1425) **ve** push-in `cy` −180'e; ya da altyazı bu planda ÜST-BANT'a. Yönetmen kararı. | **KRİTİK** |
| S3 | Izgara `zemin(2.2, 0.58)` = (589, 1465) | **Izgara kurulumu görünmez.** p0–78 boyunca tam ALT-BANT altyazısının (y 1430–1490) altında; bu karede Louis'nin bacakları arkasında. Insert'te ilk kez "beliren" ızgara = süreklilik ihlali. | Süreklilik (yakın planda ilk görülen şey önceden kurulur) | Izgarayı u 0.30–0.35, z 2.6 civarına taşı (≈ (430, 1390)); altyazı bandının dışında, karakter yolunun yanında. Insert yeniden kadrajı buna göre. | **KRİTİK** |
| S4 | Birikintiler: (378, 1648) görünen; (655, 1424) ve (517, 1312) | Görünen tek birikinti **IG alt bölgesinde** ve düz gri levha (`#403e43`), hiçbir şey yansıtmıyor: "taş/çukur" okunuyor. Diğer ikisi karakter/altyazı altında. Motion'ın itirafı doğru. | Mekân (ıslak sokak), şartname 1.3 KALDIRIM-ISLAK | Birikinti dolgusu = yansıyan kaynak (réverbère amber + gök + ters cephe pencereleri), kenarda 1 px `#c4d6ff` çizgi; konum y 1100–1400 arası, yazı bandı dışı. | ORTA |
| S5 | Merkez koyu şerit (520–560, 1550 → 1920) | François'nın réverbère gölgesi 40 px genişlikte, paralel kenarlı ve kadraj altına kadar uzanıyor: "oluk/çatlak" okunuyor. Lamba ~4–5 m yükseklikte, karakter ~0.4 z önünde: gölge sonlu ve gövde genişliğinde olmalı, uca doğru yumuşamalı. Louis'nin gölgesi neredeyse görünmüyor. | Fizik: gölge ışıktan geometrik | `TemasGolgesi` boyu = h·d/(H−h) ile; genişlik bacak açıklığı ×1.4, uçta açılan ve yumuşayan koni; iki gölge lambadan radyal ayrışsın. | ORTA |
| S6 | Çatılar (sağ 870–1080, 0–500; sol 0–100 ve çatı pencereleri 140–200, 300–400) | Alçak kameradan (~0.9 m) **çatı yüzeyleri görünüyor** ve dik eğimli: fiziksel olarak sokaktan bu açıyla eğimli çatı yüzeyi görülmez; ayrıca Bordeaux şartnamesine ters (düşük eğim ~%33, korniş arkasında az görünür). Arduvaz çatı pencereleri + yoğun baca kümeleri Paris imzası. | Fizik (perspektif), dönem/şehir | Bordeaux modunda çatı yüzeyi çizilmesin; korniş + çatı saçağı alt yüzü (kiremit uçları sırası) + geri çekilmiş az sayıda baca. Lucarne yalnız 1–2 evde. | **KRİTİK** (şehir okunurluğu) |
| S7 | Bayrak (730–940, 500–670) | Tricolore direğe **üst kenarından** bağlı gibi: şeritler direğe dik. Direkten asılan bayrakta gönder kenarı (mavi) direk boyuncadır, şeritler direğe paralel olur. Ayrıca kadrajın en doygun kırmızısı, göz çalıyor. | Dönem/fizik | Gönder kenarı direk boyunca, mavi direkte; doygunluk ay ışığında %70'e; ya da bayrak hiç olmasın (şartnamede P04 için istenmiyor). | ORTA |
| S8 | Ay (480–640, 200–360) | Ay kadrajın en parlak, en kontrastlı ve tam simetri ekseninde nesnesi; göz önce aya, sonra karakterlere gidiyor. Üst kenarı IG üst bölgesine (y < 220) giriyor. | Kompozisyon (göz yolu) | Çap 160 → 100 px, sis/bulut arkasında yarı kapalı, x ≈ 620'ye; hale geniş, disk soluk. | ORTA |
| S9 | Kardeşlerin bakışı | İkisi de ekran soluna, kadraj dışına bakıyor; François "kazanır" (p146–176) ve **göz kırpma (p180–198)** kime? Kameraya bakmadan göz kırpma okunmaz. | Okunabilirlik (oyunculuk), süreklilik | Bkz. 5. bölüm: yürüyüşte −1 kabul, p150'den itibaren François başını kameraya çevirsin. | ORTA |
| S10 | Kaldırım (alt yarı) | Taşlar aynı yuvarlak dikdörtgen damganın ızgara tekrarı; ıslaklık (dikey uzamış ışık yansımaları) neredeyse yok. "Islak sokak" okunmuyor. | Mekân şartnamesi 3.3 / 1.3 | Taş başına boyut/ton/dönme varyansı (seed), derzlerde koyu su, réverbère ve pencerelerin altında dikey uzamış amber yansıma şeritleri. | ORTA |
| S11 | Kenar tabelaları "…ELIER" (0–75, 1290–1400), "CHAR…" (1000–1080, 1290–1380) | Yan 80 px içinde kesik dünya yazısı; "CHAR…" ne olduğu belirsiz. | Güvenli alan (küçük) | Kenarlardan 80 px içeri ya da tamamen kadraj dışına. | KÜÇÜK |

### 2.2 Mekân kalitesi
- **En güçlü yön:** derinlik, sis düzlemleri, yanık pencere ritmi, ipte réverbère, sokak ucundaki direk siluetleri. Telefon boyutunda "gece, dar sokak, iki adam" net okunuyor. Altyazı kontrastı iyi.
- **Şehir okuması:** ilk bakışta **Paris** (dik çatı, baca kümeleri, çatı pencereleri, aynı yükseklikte sıra evler). Bordeaux işaretleri (yelkenli direkleri, Saint-Michel, tuile canal, maskaron) ya çok silik ya da görünmüyor. Maskaronlar (35–80, 880–940 ve 930–970, 970–1010) telefonda okunmuyor. Şartname 2. bölüm "ilk 0.5 sn'de şehir" testi **başarısız**.
- **Cepheler:** blok dokusu var ama cephelerin hepsi aynı kat yüksekliği/pencere tipinde; "farklı yükseklikte bitişik evler" kuralı zayıf.
- **Dönem:** Café önündeki yuvarlak masa + bükme sandalye (720–830, 1250–1400) Thonet tipi bistro sandalyesi gibi okunursa 1859 sonrası [G ◐]; düz ahşap tabure/sıra güvenli. KÜÇÜK.

---

## 3. SB2-BORSA (P02, p120 = 276)

### 3.1 Kural ihlalleri

| # | Bölge (px) | Sorun | Kural | Düzeltme | Öncelik |
|---|---|---|---|---|---|
| B1 | Ön plan kafa siluetleri (180–480, 1480–1920; 800–1080, 1560–1920) | **Ufuk kuralı ihlali.** Göz hizası y 880 (şartname: "tüm şapka tepeleri ufuğa yakın"; ana karakterlerin şapkaları 810–870, doğru). Kameraya en yakın ayakta yetişkinin başı da ≈ y 880'de olmalı; burada başlar y 1500+'da: bu kişiler ~1 m boyunda ya da yere yatmış gölgeler. Telefonda "leke" okunuyor. (Koordinatör sorusu: **leke, derinlik değil.**) | Fizik: ölçek derinlikle tutarlı | Ön plan derinlik öğesi şartnamedeki gibi **sütun gövdesi (sol, x 0–120) + korkuluk** olsun; insan siluet istenirse kadraj kenarından giren, başı y ≈ 800–900'de, gövdesi aşağı uzanan dev bulanık omuz. | **KRİTİK** |
| B2 | "François" etiketi (80–428, 712–812) | Etiket metni tüccarın (190–280) başının üstünde; bağlantı noktası (418, 815) François'ya küçük. İlk kez tanıştırılan ana karakter yanlış kişiye yapışıyor: ses kapalı izleyici kahverengi adamı François sanar. | Okunabilirlik / doğruluk | Etiket x merkezi François'nın şapkası (≈ 400) üstüne; tüccar yüzü etiket altında kalmasın; bağlantı çizgisi 30–40 px görünür. | **KRİTİK** |
| B3 | Sol duvar pencereleri (0–160, 0–840) | Üç kemerli pencere yerine dikey kahverengi çubuklar ve kısa çapraz çizikler: kemer yok, cam yok, ışık kaynağı okunmuyor. Sahnenin anahtar ışığının nedeni görünmüyor. (Koordinatör **doğrulandı**.) | Mekân şartnamesi 3.1, ışık mantığı | Perspektifte daralan 3 **kemerli** pencere: kalın ceviz kayıt, aşırı pozlanmış `#fff1c8` cam, alt pervaz, aralarında pilastr. Tepe kemeri üst 220 px'te düz yüzey olarak kalabilir. | **KRİTİK** |
| B4 | Tüm iç mimari | Salon değil **uzun koridor**: iyonik pilastr yok, kemer yok, estrad/merdiven belirsiz (500–630, 870–990 küçük kutu), korkuluk yok, giriş tricolore'u yok. Duvar tek düzlem blok dokusu. "Altın bir kovan" ve Bordeaux'nun neoklasik ticaret görkemi okunmuyor. | Mekân şartnamesi 3.1 | Arka duvara 2 pilastr (tahtanın iki yanı), tahtanın üstünde korniş; estrad 2 basamaklı ve merdiveni sol-arkada görünür; ön sağda ahşap korkuluk. Oda daha geniş ve kısa (derinlik değil genişlik). | **KRİTİK** |
| B5 | Tüccar (180–290, 870–1380) | Ana kadroyla **aynı yüz** (kaş, bıyık, favori, burun) ve aynı silindir şapka/redingot ailesi. Üç kardeş gibi. (Koordinatör **doğrulandı**; tasarım tüccarı yüzlü bırakıyor, ama farklı olmalı.) | Okunabilirlik, karakter ayrışması | Tüccar: tıknaz (`scaleX 1.15`), sakalsız ya da kır favori, alçak tepeli geniş kenarlı şapka ya da şapkasız, kahve-hardal; yüz varyantı (göz/kaş/burun). | ORTA |
| B6 | Kalabalık siluetleri | Düz, tek ton, aynı kalıp; baş yönü yok. Dokunuşun yarısı ("kalabalık tahtaya döner ve donar") siluetlerin yönü okunmazsa görünmez. | Dokunuş okunabilirliği | 2 tonlu siluet + ışık tarafında sıcak kenar ışığı, poz/boy varyansı, şapka profilinden baş yönü okunur olsun (asimetrik silindir + omuz çizgisi). | ORTA |
| B7 | Gölgeler (ayaklar, pupitr 600–770, 1390–1400) | Karakter temas gölgeleri neredeyse yok; pupitr gölgesi ayakların altında **ortalanmış elips**, sağa uzamıyor. Şartname: güneş sol-üst, gölgeler sağ-aşağı, sert. | Gölge yönü, temas gölgesi | Tüm temas gölgeleri sağa 0.15× boy uzasın, α .35 bal rengi; zemine pencere biçimli güneş yamaları (motion'ın itirafı). | ORTA |
| B8 | Tahta (300–780, 405–690) | Rakam yerine sinüs dalgaları: telefonda "doldurulacak yer" gibi. | Mekân okunurluğu | Rakam biçimli ama okunmayan tebeşir izleri (gerçek fiyat iddiası olmadan: hane grupları, virgül, çizgi), silinti gölgeleri daha belirgin. | ORTA |
| B9 | Louis etiketi (650–998, 712–812) | Alt kenar şapka tepesine (≈ 810) değiyor. | Okunurluk | Etiket 30 px yukarı ya da şapka 60 px altında kalacak şekilde. | KÜÇÜK |
| B10 | Rüzgâr kadranı (920–985, 385–540) | Duvar saati gibi okunuyor (P18 saat dokunuşuyla görsel çakışma riski). | Dokunuş tekrarı yok (görsel karışma) | İbre ok uçlu + 4 yön harfsiz çentik yerine pusula gülü motifi; ya da kaldır. | KÜÇÜK |

### 3.2 Mekân kalitesi
- **Sıcaklık doğru** (filmin en sıcak planı), ama kontrast yok (L 17–226, ortalama 128, gölgeler bal rengi ama ışık da sönük). "Sert güney ışığı" yok: ne huzme zemine düşüyor ne yüzlerde ışık-gölge ayrımı var.
- **Göz yolu (360 px):** yazı şeridi → tahta başlığı → iki etiket → karakterler. Üç yazı katmanı + tahta yazısı aynı anda: kalabalık. Tahta ve etiketler okunuyor; tebeşir parçası (515, 1000) telefonda görünmüyor (p120 için normal, p90 karesi ayrıca denetlenmeli).
- **Şehir:** Bordeaux'yu yalnız etiket söylüyor ("BLANC · BORDEAUX"). Duvar taşı bal tonu doğru yönde (`#bda67a`), ama Tours'la ayrışma zayıf (bkz. sistemik 1).
- **Louis** pupitrde, başı eğik, soğuk: iyi oyunculuk; cep eldiveni köşesi görünüyor (≈ 660, 1055), defter kurulumu var. Ayak-zemin doğru (ayaklar 1340–1395, güvenli alanda).

---

## 4. mekanlar.md şartnamesine uyum (özet)

| Şart | TOURS | SOKAK | BORSA |
|---|---|---|---|
| Malzeme (taş tipi ve renk) | ✗ tuffeau değil (`#ad9d7f` vs `#e6e0cc`) | ◐ TAS-BDX bloklar var; çatılar ters | ◐ TAS-BDX tonu doğru, pilastr yok |
| Mimari öğeler | ✗ kiriş yok, manipülatör yok, masa okunmuyor | ◐ maskaron telefonda yok, Saint-Michel okunmuyor | ✗ kemer, pilastr, estrad merdiveni, korkuluk, sütun yok |
| Işık (anahtar → gölge) | ✗ huzme ile gölge ters; fener havuzu yok | ◐ réverbère var, gölge geometrisi yanlış, yansıma yok | ✗ güneş yaması yok, gölge yönsüz |
| Kompozisyon / güvenli alan | ◐ etiket IG sağ bölgede, üst ölü | ✗ ayak/ızgara/birikinti yazı ve IG altında | ✗ ön plan ufuk kuralı |
| Arşiv katmanı (lif, gren, vinyet, siyah/beyaz noktası) | ✓ | ✓ | ✓ |
| Kontur ailesi / titreme | ✓ | ✓ | ✓ |
| Şehir 0.5 sn testi | ✗ | ✗ (Paris okunuyor) | ◐ (yalnız etiketle) |

---

## 5. Motion'ın sapmaları (yönetmen onayı bekleyenler) — görüş

| Sapma | Görüş | Koşul |
|---|---|---|
| **P02 oda genişliği** (xFar 160–920 → 230–850) | **Kabul.** | Asıl sorun genişlik değil mimari öğe eksikliği (B3, B4). Genişlik artışı pencereleri okutmaya yetmedi: kemerli pencere çizimi şart. |
| **P02 z değerleri** (2.2/2.3 → 1.65/1.75) | **Kabul** (yüzler telefonda okunur, ayaklar güvenli alanda). | Sahne planı ve tebeşir sekme yolu (estrad z 5.2) güncellensin; tüccar z de aynı oranda; etiket konumu B2'ye göre. |
| **P04 Saint-Michel x=445** | **Bu hâliyle ret.** | Maske şeridinin kenarına yapışık (S1), sokak ucunun tam ortasında direklerle yarışıyor, telefonda okunmuyor. Ya S1 düzeltilip x ≈ 600–640'a, ay kenar ışığıyla ve direklerden daha açık değerle konsun; ya P04'ten çıkarılıp P06'da kurulsun (tasarim.md 1.3 zaten "isteğe bağlı" diyor). Bordeaux kimliğini P04'te taşıyacak olan **direkler + rıhtım ışığı + alçak çatılar** olmalı. |
| **P01 "TOURS" etiketi** | **Koşullu kabul** (ses kapalı izleyiciye yer bilgisi verir, P09 etiketiyle aynı çizim olursa süreklilik kazanır). | (1) x ≤ 880 (T8). (2) P09'daki 380×110 etiketle **aynı çizim**. (3) P23 aynalaması için P23'te de görünmeli ya da P23'te etiketin bağlanışı gösterilmeli. Tasarımcı onayı. |
| **P04 kardeşler ekran soluna bakıyor (facing −1)** | **Koşullu kabul.** | Yürüyüş yönü (u 0.52→0.46, kameraya-sola) ve insert'te paçanın sağdan girişiyle tutarlı. Ama p146–198 "kazanır" + göz kırpma kameraya ya da Louis'ye yönelmeli: François p150'den itibaren başını kameraya (3/4 ön) çevirsin. Kol çakışması: şapkayı kamera tarafındaki kolla kaldırsın. |

---

## 6. Sistemik sorunlar — kalan 9 mekândan önce (öncelik sırası)

1. **Derecelendirme hattı rengi ve kontrastı yiyor; şehir ayrışması kayboluyor.** Tours duvarı `#ad9d7f`, Borsa `#bda67a`: ikisi aynı bej ailesi. Şartnamedeki taban renkler (`#e6e0cc` / `#d6bf8e`) `ArsivKatmani` (multiply kâğıt lifi + vinyet + doygunluk .86) ve sahne üstü multiply gradyanlarından sonra ~%20–25 kararıyor ve griye kayıyor. **Düzeltme:** derecelendirme sonrası hedef değer tablosu (her mekân için duvar/zemin/ışık örnek pikseli) ve kontrol karesinde otomatik ölçüm; Tours duvarı ışıkta L ≥ 210. Kalibrasyon bitmeden yeni mekân yok.
2. **Işık geometrisi tek kaynaktan değil.** Huzme, temas gölgesi, ışık havuzu ayrı ayrı elle konuyor: P01 huzme-gölge ters, P04 gölge sonsuz uzun, P02 gölge yönsüz, üç karede de **zemin ışık havuzu yok**. **Düzeltme:** `IsikKatmani` her kaynak için (konum, yükseklik, yön) tek tanım alsın; huzme, zemin yaması/havuzu, temas gölgesi uzunluğu-yönü-genişliği oradan türesin. Kontrol: her karede gölge vektörleri ışığa geri çizilince tek noktada kesişmeli.
3. **Yerleşim–güvenli alan–yazı bandı denetimi yok.** Sahne planı z değerleri ayakları, ızgarayı, birikintileri ALT-BANT ya da IG alt bölgesine koyuyor (P04). **Düzeltme:** her kontrol karesine isteğe bağlı **güvenli alan + yazı bandı + IG arayüzü (alt 420, sağ 160) bindirmesi**; sahne dosyalarında "kilit noktalar" listesi (ayak, temas, kurulum nesnesi) ve bunların y 420–1290, yazı bandı dışı olduğunu doğrulayan bir assert. Yönetmen sahne planındaki tüm z'leri `zemin()` ile ekran y'sine çevirip tabloya eklesin.
4. **Mimari söz dağarcığı eksik.** Doku modülleri yüzey üretiyor ama **biçim** yok: kemer, pilastr, korniş, kiriş, masa kenarı, korkuluk, saçak alt yüzü. Sonuç: Borsa koridor, Tours "boş kutu", Bordeaux sokağı Paris. **Düzeltme:** `src/doku/` yanına `Mimari` modülleri (KemerliPencere, Pilastr, Korniş, Kiris, Saçak, Korkuluk, MasaKenari) + kalan mekân kartlarındaki her mimari öğenin bir modüle eşlenmesi.
5. **Prop'lar "anlatan çizim" değil, yer tutucu.** Paket = çerçeve, eldiven = kalıp, tahta = dalgalar, birikinti = levha, pencere = çubuklar. Hikâyenin taşıyıcı nesneleri telefon boyutunda (360 px) ne olduğunu ve ne durumda olduğunu (açılmış, tutulan, ıslak) söylemeli. **Düzeltme:** tasarımcı her kahraman prop için 360 px siluet testi; motion prop'ları sahneden önce tek tek insert karesinde onaylatsın.
6. **Katman/paralaks kompozit hatası** (P04 gök şeridi). `kat()` ile farklı paralaks katsayılı katmanlar arasında maske/kenar kalıyor. Tüm dış mekânlar (KULE-DIS, CATI-BORDEAUX, PARIS-AVLU) aynı sistemi kullanacak. **Düzeltme:** gök + bulut tek katman, tam genişlik; her dış mekân kontrol karesinde gök katmanı tek başına da render edilsin.
7. **Kompars ve ikincil karakter dili.** Siluetler düz kesik karton; yüzlü ikinciller (tüccar) ana kadronun kopyası. Mahkeme (jüri, seyirci, yargıç) ve P09/P14 bu dile dayanıyor. **Düzeltme:** 2 tonlu siluet + kenar ışığı + poz/boy varyansı; rig'de en az 3 yüz varyantı (göz, burun, kaş, sakal).
8. **Islak/gece zemin ve yansıma modülü** (`IslakKaldirim`) işlevsiz görünüyor: ayna etkisi yok. P04 dışında P16–P17 pencere ışığı ve P06 şafak çinkosu da yansımaya dayanacak.
9. **Kontrol karesi protokolü yetersiz.** Tek kare, dokunuş anını ve kancanın ilk karesini göstermiyor. **İstek:** her plan için en az: f0 (P01 için kapak karesi), dokunuş temas karesi (P01 p54, P02 p90, P04 insert p108), kapanış karesi; ve bunların 360×640 telefon sayfası + güvenli alan bindirmesi.

---

## 7. Koordinatör gözlemleri: doğrulama

| Gözlem | Sonuç |
|---|---|
| SOKAK gökte düz mavi dikey şerit, katman/maske hatası; Saint-Michel şeridin içinde okunmuyor | **Doğrulandı** (S1; x ≈ 405 / 683 keskin kenar, kule sol kenarı şeride yapışık) |
| Altyazı bacak/ayakları örtüyor | **Doğrulandı ve daha kötü:** ayaklar zaten y 1527–1542'de IG alt bölgesinde (S2); ızgara da altyazının altında (S3) |
| Su birikintisi düz gri leke | **Doğrulandı** (`#403e43`, yansıma yok; S4) |
| Ay odağı çalıyor mu | **Evet**, orta öncelik (S8) |
| TOURS masa-zemin ayrışmıyor, fener yerde mi | **Doğrulandı** (T5) |
| Paket bir şey sarmıyor; eldiven dik katı nesne | **Doğrulandı** (T6, T1) |
| El eldivene benziyor | **Kısmen.** Ten rengi ve kırışık çizgiler el okutuyor, ama kalın, tek parça "kürek" biçimi ve avucun yukarı dönük pozu eldivenle karışmasına yol açıyor; T1 düzeltmesi (kıstırma pozu, ayrık parmaklar, ince bilek) bunu da çözer. ORTA |
| Chappe kolları küçük boyutta merdiven/kafes gibi | **Doğrulandı** (T7: telefonda vinç/iskele; T sapı kayboluyor) |
| Fener ışık havuzu yok | **Doğrulandı** (T4) |
| Kanca üst yarısı boş; ilk 1 sn göz nereye | Üst %23 ölü (T9). Göz yolu: yazı → eldiven → pencere; doğru sıra ama eylem ve makine okunmadığı için merak zayıf |
| BORSA tüccar ana kadroyla aynı aile | **Doğrulandı** (B5) |
| Sol duvar pencereleri anlamsız çizgiler | **Doğrulandı** (B3) |
| Alt ön plan bulanık kafalar derinlik mi leke mi | **Leke** ve ayrıca ufuk/ölçek ihlali (B1, KRİTİK) |

---

## 8. Yeniden denetim için kabul ölçütleri
- Üç karenin kritik maddeleri (T1, T2, T4, T5, T6, T7, S1, S2, S3, S6, B1, B2, B3, B4) kapanmadan kalan mekânlara geçilmez.
- Yeni turda: her plan için f0 + dokunuş karesi + kapanış karesi, 360×640 telefon sayfası, güvenli alan bindirmeli kopya, duvar/zemin piksel ölçüm tablosu.
