# Eleştiri: Ben-my-Chree kalibrasyon tur-3 (eleştirmen, 2026-11-15)

Bağımsız teşhis. Yalnız mevcut karelere bakıldı, render yapılmadı. Kareler `karsilastirma.png` içinde Paris `genel-tr.jpg` ve `hedef-ozet.jpg` ile yan yana kondu. Ayrıca 360/güvenli sürümler, 4 hareket şeridi ve 2× kırpımlar incelendi.

## Puan (Paris çıtası, eşik 7)
| Kare | Puan | Paris'in yanında | Kısa neden |
|---|---|---|---|
| K1 P01 liman | **5.5** | geri kalır | Orta plan (kale, kasaba, gemi) iyi. Ama alt yarının yarısını işlevsiz, flu, bej bir kütle kaplıyor. Gök boş bantlardan ibaret, kontrajur ve güneş yok. Oyuk kaldırıldığı için kanca çizgisinin bir kaynağı kalmadı |
| K2 P07b hangar | **4.5** | geri kalır | Kadrajın %50'sini düz gri duvar kaplıyor, katmanlar yarı saydam. T3 küçük, eli "selam" verir gibi okunuyor. Ön plan öğesi yok. Kart MCU istiyordu, kare boy plan |
| K3 P05 teğmen | **4.5** | belirgin geri kalır | Gövde düz panellerden oluşuyor ve her yer tarama şeritli. Yüzde kural ihlali var. Hafif gülümseme kararlılık değil, kibir gibi okunuyor. El namluya dayanmıyor, havada duruyor ve IG düğmelerinin altında kalıyor. Low angle uygulanmamış |
| K4 P04 oyuk | **4** | belirgin geri kalır | Düz arazide çalıyla çerçevelenmiş bir tünel ya da yuva gibi okunuyor, yamaçta bir kaya oyuğu değil. Arkada deniz görünüyor, oysa kamera denizden karaya bakıyor. Mekanlar §3.3 ve §0.10 ihlal edildi. Tekrarlı çalı ve taş "yumurta kolisi" gibi duruyor |

**Genel ≈ 4.6. Geçmez.** Motion öz puanı (≈6) iyimser. Ölçümlerin hepsi geçiyor (sıcak %, p95, KOR tekilliği). Sorun ölçülemeyen yerde: işleme, geometri ve figür.

## Sorulan beş konu
1. **K1 ön plan kayası kompozisyonu taşıyor mu?** Hayır. Kaya x 0–640 ve y 1050–1920 arasını kaplıyor (karenin ≈ %35'i). σ 6 flu olduğundan karren çatlakları lekelenmiş el yazısı gibi okunuyor. Mor gölge yaması havada duruyor gibi. Değeri gökteki sıcak bantla aynı (bej üstüne bej), kenar ışığı ve siluet yok. Paris hedefindeki kümes gibi koyu, net bir çerçeve kurmuyor. Tur-3'te oyuk kaldırıldı, böylece kayanın tek işlevi de gitti: P01'in sakladığı şey ("karanlık oyuktan gemiye uzanan çizgi", mekanlar §1.1) artık yok. Çizgi kayanın kenarında başlıyor ve 360 px'te sudaki siyah bir "solucan/hortum" gibi okunuyor. Sağ alttaki ikinci kayanın sarı-siyah çizgili tepesi telefonda arı ya da tırtıl gibi görünüyor. Bu bir **süreklilik riski**: P04 ve P06 V1 "P01 kayasının oyuğu"nu karşılık olarak kullanıyor.
2. **K4 oyuk yamaçta mı, düz arazide mi?** Düz arazide bir tünel ağzı, hatta iglo ya da yuva gibi okunuyor. Nedenleri:
   (a) Kamera yukarıdan bakıyor ve sundurmanın üst yüzü görünüyor. Spec ise "göz mevziin 6 m altında, bakış 8° yukarı, oyuğun tavanı görünmez" diyor.
   (b) Oyuğun arkasında deniz ufku var (y ≈ 500), Likya sırtı yok. Kamera güneyden (denizden) karaya bakıyorsa arkada deniz olamaz: **coğrafya ve fizik hatası**.
   (c) Zemin yatay, tabakalı bir düzlük ve oyuğun üstünde yükselen kaya kütlesi yok. "Yukarı yükselen diyagonal" (mekanlar §3.1) kurulmamış.
   (d) Ağzı çevreleyen deniz kestanesi biçimli çalı topları §0.10 ve tasarım §4.4'teki "kamuflaj/çalı örtüsü çizilmez" kuralına aykırı. Üstelik oyuğu "saklanan" değil ilk karede apaçık görünen bir nesne yapıyor.
   (e) Sundurmanın düz kesik kenarları "kapı/kapak" okunmasına yol açıyor (§3.6 yasak benzerlik).
   (f) Ağız ≈ 900 px, kadrajın %85'i. Oyuk bir manzaranın parçası olmaktan çıkıp manzaranın kendisi oluyor.
   Dolly zoom şeridinde (190–440) oyuk sabit kalıyor, büyüyen tek şey gök ve deniz bandı. Sırt olmadığından izleyici "kıyı ağırlaşıyor" diye değil "gök kayıyor" diye görüyor. **Teknik süs kalıyor, duyguyu (şaşkınlık) taşımıyor.**
3. **K2 sol duvar ve figür ölçeği.** Duvar kadrajın sol yarısının tamamını kaplıyor. Yarı saydam üst üste paneller var (x 380–520 arasındaki açık şeritte alttaki dikiş çizgileri görünüyor; şeritte k790'da kanat da hayalet gibi): **katman/maske hatası**. Perçin sıraları seyrek, alevin duvara düşen sıcak ışığı kapı kenarında yalnız birkaç piksel. Tarama yatay şerit olarak bütün duvarı kaplıyor. T3'ün boyu ≈ 650 px, yüzü ≈ 72 px. Kart (85 mm MCU) bu planı şok anı olarak yakın çekim istiyor ("önemli oyunculuk = yakın plan" kuralı), kare boy plan. Poz da sorunlu: kol başın yanında, avuç açık, dizler bükük, geriye yaslanmış. Bu "el sallama/dans" okunuyor, alevden korunma okunmuyor. Güverte sağda boşlukta bitiyor: korkuluk yok, direk havada. Sağ kenarda (x 1040, y 1040) amacı belli olmayan flu koyu bir leke var. Açılan kanat (şerit 794–810) koridor genişliğinden geniş, kadrajın sağından taşıyor. 5 m'lik kanat 2.5 m'lik koridorda 90° açılamaz: **fizik**. Kanadın boyunu ya da açılma açısını sınırlayın.
4. **K3 figürlerin duruşu ve onuru.** Her askerin bir yüzü var (E1 bıyıklı, E3 farklı yüzlü), kural kâğıt üzerinde karşılanıyor. Ama onur zayıf:
   - Teğmenin ağzı yarım gülümsüyor. Kart "kararlılık/güç, onurlu, gösterişsiz" istiyor, kare kibirli okunuyor.
   - Yüz kuralı ihlalleri (kırpım `kirpim2x_yuz_tegmen`): favori ve kulak önünde koyu **dikdörtgen/yamuk bloklar** var ("favori kutu değil" kuralı). Işık–gölge sınırı yanağı dikey bir **bıçak çizgisi**yle bölüyor. Çene kayışı yanaktan geçen dikişli bir yarık gibi duruyor.
   - Omuz (`kirpim2x_omuz_tegmen`): başlık gövde silüetinin kenarında değil, göğsün ortasında yeşil bir leke. Silüetin arkasındaki büyük yuvarlak kambur sırt çantası ya da kamburluk gibi okunuyor. Gövde düz renk panellerinden ve üstüne yapıştırılmış bej çubuklardan (kayış) oluşuyor. Omuz kuralının (4). maddesi ihlal.
   - E1'in elleri kadraj içinde amacı belli olmayan gri bir levhaya dayalı (kalkan kaldırılmıştı). E1 oturuyor mu ayakta mı belli değil.
   - Teğmenin eli namlunun üstünde açık parmaklarla havada duruyor, "dayalı" okunmuyor. Bu el ve namlu ağzı x 930–1080 arasında, yani **IG düğmelerinin altında ve 80 px yan sınırın dışında** (`_guvenli` "el" işareti). Planın dokunuşu örtülüyor.
   - Kart LOW ANGLE (0.5 m) istiyor, ama ufuk y ≈ 480 ve kare göz hizası. Onuru taşıyacak kamera kararı uygulanmamış.
   Referans fotoğraf (20341r) dik, ağırlığı topuklarında, kemerli ve çizmeli, rahat ama ciddi bir duruş gösteriyor. Bizim figürler ise manken ya da kesme karton gibi.
5. **İşleme dili Paris ailesinde mi?** Palet evet (mor-gül-şeftali, kâğıt sıcaklığı). İşleme hayır. Paris temiz düz renk alanları, her yerde aynı kalınlıkta net kontur, **yerel** tarama, keskin değer hiyerarşisi (koyu ön plan / açık arka) ve görünür bir ışık kaynağı (güneş halesi, aydınlık pencere) kullanıyor. Tur-3'ün `Isleme` sarmalayıcısı ise:
   (a) Gölge taramasını sahne parlaklığından **global** maskeliyor. Bütün orta-koyu alanlar (duvar, gövde, kaya, gök) 2.6/9 px yatay şeritle kaplanıyor ve telefonda **CRT tarama çizgisi / jaluzi** gibi okunuyor. Bu, "tarama büyük önemsiz yüzeyde değil" ve "geniş alanda kafes yok" kurallarına aykırı.
   (b) `kagit-lif.png` α .32 çarpma katmanı ve %16 sepya, gök ve denizi yatay sürtülmüş boya gibi bulanıklaştırıyor.
   (c) Yaygın σ flu (K1 kaya, K3 arka plan, K2 gök) gravür yerine odak dışı video hissi veriyor.
   (d) Kontur tutarsız: gemi ve kalede 2 px mürekkep var, kayada, gökte ve çalıda yok.
   Sonuç: kareler "aynı aileden ama bulanık bir baskı" gibi duruyor.

## Üç katman ve kamera (Ben-my-Chree ek soruları)
| Kare | Ön plan | Işık olayı | Atmosfer | Kamera: duygu mu süs mü |
|---|---|---|---|---|
| K1 | var ama işlevsiz/aşırı | zayıf: ışıltı bütün denize eşit dağılmış, güneş yönü yok, gemi kontrajur siluet değil | buğu bandı var; tuz zerresi görünmüyor | truck paralaksı sakin, uygun |
| K2 | **yok** (korkuluk/halat kadraj dışı) | alev var ama duvara/güverteye ışınsal yayılmıyor; çekirdek "yumurta" | duman var, köpük loblu | yavaş dolly uygun ama boy planda şoku taşımıyor |
| K3 | tekerlek/namlu var | **yok** (namlu ışık şeridi, kenar ışığı seçilmiyor) | **yok** (toz yok) | low angle uygulanmadı → onur kaybı |
| K4 | ölçeksiz tekrar taşlar | parıltı var, küçük | **yok** (toz/buğu seçilmiyor) | dolly zoom sırtsız → **süs** |

Anlatım sorusu (d) bu turda geçerli değil (ses yok).

## En büyük 3 neden
1. **İşleme parametreleri** (motion, `bmcOrtak.tsx` `Isleme`): global gölge taraması, kâğıt lifi α .32, sepya %16 ve yaygın σ flu. Paris'in net-düz-yerel dilinden kopuyor ve "tarama çizgili, bulanık" okunuyor.
2. **Geometri spec'ten sapmış** (motion uyguladı, mekân/yönetmen kabul etmedi): K4 kamera yüksekliği ve yönü, arka plan ve örtü (§3.3, §0.10); K1'de oyuğun kaldırılması (§1.1, §1.4 katman 12); K2'de 85 mm MCU yerine 40 mm boy plan. Kompozisyon kusurlarının hepsi bu sapmalardan çıkıyor.
3. **Figür rig'i** (motion + tasarımcı): düz panel gövde, omuz başlığı yeri, yüzde kutu favori ve bıçak gölge, gülümseme varsayılanı, havada el, eksik low angle. Ortaya "yüzlü ama onursuz manken" çıkıyor.

## Tur-4 düzeltmeleri (en çok 6, önem sırasıyla)
1. **Motion · `Isleme`:** tarama global değil maskeli olsun: yalnız mekanlar.md "tarama yerleri" (saçak/dudak altı, gövde alt şeridi, yanak gölgesi) ve en çok 3 bölge. Figür gövdesinde ve gökte tarama olmasın. Kâğıt lifi α .32 → ≤ .12, yönsüz doku. Sepya %16 → ≤ %8. σ flu yalnız K1 uzak sırt ve K3 arka plan için, ≤ 3. Bütün ana nesnelerde kontur 2–3 px `#3e302b`. Kabul: aynı 4 kare `karsilastirma.png`'de Paris'le "aynı baskı" okunmalı.
2. **Mekân sorumlusu → motion · K4 `yamac-oyuk`:** §3.3'e dönülsün. Göz oyuğun 6 m altında, bakış +8°. Yamaç diyagonali sol-alttan sağ-üste. Oyuğun üstünde yükselen karren kayası. Arkada Likya sırtı, **deniz yok**. Oyuk başlangıçta ≤ 450×260 px. Sundurmanın üstü görünmesin, kenarlar kırık olsun. **Çalı örtüsü kaldırılsın**, maki %30 seed'li loblar halinde ağızdan uzakta. Yönetmen kartındaki "ağız ≈ 900×520" değeri mekanlar §3.3 ile çelişiyor: yönetmen 450×260'a çeksin, dolly zoom'da sırt ×2 oyuğun üstüne kapansın. Toz atmosferi (25 tane) eklensin.
3. **Motion (mekân onayıyla) · K1 katman 12:** oyuk (x 120–420, y 1260–1400) ve çizginin oyuk ucu geri gelsin; kanca ve süreklilik buna bağlı. Kaya üst kenarı y 1170→1320 kırık eğri, en çok x 0–600. σ 6 → ≤ 3. Karren olukları net, değeri koyu (`#6f6488` baskın), sıcak kenar ışığı `#eec5a2`, yani koyu çerçeve. Sağ alt kayadaki sarı çizgili tepe düz maki lobuna dönsün. Gök: 2. bulut şeridi ve güneş yönünde sıcak hale. Işıltı sağ yarıda yoğunlaşsın. Gemi kontrajurda koyu siluet + kenar ışığı.
4. **Motion + tasarımcı · figür rig (K3):** yüzde favori biçimli saç kütlesi olsun (kutu değil). Yanaktaki dikey ışık sınırı yumuşak geçiş olsun. Çene kayışı ince ve kontursuz olsun. Ağız varsayılanı nötr ya da sıkılmış dudak olsun, gülümseme olmasın (tasarımcı ifade tablosuna `kararli` ekler). Omuz başlığı silüetin dış kenarında olsun, kambur sırt kaldırılsın. Gövdede kumaş kıvrımı tonu olsun, yapışık bej çubuk olmasın. Teğmenin eli namluya **temas etsin** (avuç namlu üstünde, parmaklar sarılı). El ve namlu ağzı x ≤ 900'e çekilsin (IG düğme bandı dışı). E1'in gri levhası kaldırılsın, eli çarkta ya da sandıkta olsun.
5. **Yönetmen → motion · K3 ve K2 kamera:** K3'te kart uygulansın: göz 0.5 m, low angle (ufuk y ≥ 1100). Teğmen ve namlu gök önünde siluetlensin, arkadan kenar ışığı alsın. K2'de MCU'ya dönülsün. Öneri: OTS ya da dirty single, T3'ün omzu ve başı ön planda (yüz ≥ 230 px), kapı ve alev orta planda. Böylece hem ön plan öğesi oluşur hem duvar payı %50'den ≤ %30'a iner. T3'ün pozu "kolu yüzünün önünde, gövdesi alevden geri dönük" olsun, açık avuç kullanılmasın.
6. **Motion · K2 fizik ve katman:** duvar ve kanat panellerindeki yarı saydamlık kaldırılsın (opak, tek z sırası). Kanat genişliği koridora sığsın ya da açılma açısı ≤ 60° olsun. Kanada kalınlık, menteşe ve perçin eklensin. Güverte kenarına korkuluk eklensin. Sağ kenardaki flu koyu leke ya kaldırılsın ya tanımlansın. Alev ışığı duvara ve güverteye kapıdan ışınsal 3 basamakla yayılsın, alev çekirdeğinin yumurta şekli alev dili ile değişsin.

## Kritik (3 sınırının dışında)
- K3: dokunuş eli IG düğmelerinin altında, yan sınır dışında (güvenli alan, KRİTİK). Düzeltme 4'te karşılanıyor.
- K4: kameranın denizden karaya baktığı yerde arkada deniz var (coğrafya/fizik, KRİTİK). Düzeltme 2'de karşılanıyor.
- K1→P04/P06: oyuk kaldırıldı ve kurulum–karşılık zinciri koptu (süreklilik, KRİTİK). Düzeltme 3'te karşılanıyor.
- K2: yarı saydam katmanlar, kanadın koridora sığmaması (fizik/maske, KRİTİK). Düzeltme 6'da karşılanıyor.

## Tur-4 notu
Son tur. Düzeltme 1 (işleme) ve 2 (K4 yeniden kurgu) en çok puanı getirecek iki iş. İkisi tutmazsa CLAUDE.md "Paris çıtası" 3 gereği kullanıcıya yön karesiyle dönülür. Önerim tur-4 öncesinde K4 için mekân sorumlusundan tek bir kroki istemek: yamaç diyagonali, oyuk konumu, sırt. Motion o krokiye göre kursun. Kör kurulum bir tur daha yakar.
