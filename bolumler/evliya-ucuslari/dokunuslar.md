# Dokunuşlar — "İki uçuş, tek tanık" (Lagâri + Hezarfen)

Girdi: onaylı `senaryo.md` (14 plan, 59.5 sn, 60 fps) + `arastirma.md` (dokunuş adayları notu dahil) + `src/kit/DOKUNUS-KUTUPHANESI.md` + `src/kit/KATALOG.md` + CLAUDE.md "Dokunuş".
Sayı: **6 ana dokunuş + 1 yedek** (kanca P01 ve kapanış P14 hariç; P01↔P14 kıvılcım döngüsü senaryonun kendi kurgusu, dokunuş sayılmadı).
Kare sütunları plan içi `p` (0 = plan başı) ve mutlak kare (60 fps). Her dokunuş `bit` ≤ plan sonu − 12 kare.

## Özet tablo

| id | plan | dokunuş | p aralığı (mutlak sn) | ölçek | bağlı eylem | kit |
|---|---|---|---|---|---|---|
| EV-D1 | P05 | Fitil tutuşunca yardımcının başlığı uçar | p62–140 (18.03–19.33) | boy (yardımcı) + geniş (fişek) | fitil ateşlenir, yardımcı sıçrar | yok: `baslik` prop |
| EV-D2 | P06 | Lagâri fişeği bırakır: boş demet düşer, o süzülür | p28–120 (21.47–23.00) | geniş | "barut bitince kanatlarını açıyor" | yok: demet düşüş yolu + su/buhar efekti |
| EV-D3 | P08 | Düşen taş (kamera taşı izler) | p48–215 (31.30–34.08) | göğüs → insert (taş) → göğüs | Hezarfen kenara adım atar, aşağı bakar, ufka döner | yok: dikey şerit + `tas` |
| EV-D4 | P09 | Martı çırpar, Hezarfen çırpmadan geçer | p112–195 (36.37–37.75) | geniş (ön planda martı) | Hezarfen süzülür | yok: `marti` prop |
| EV-D5 | P11 | Kese avuçtan kayıp yere düşer, sikke dönüp yatar | p84–205 (44.40–46.42) | insert (el + rıhtım zemini) | omza inen el | kısmi: `kese` var, `sikke` yok |
| EV-D6 | P12 | Padişah pencere kanadını kapatır, ışık gözlerde şeride iner | p20–125 (47.83–49.58) | göğüs/yakın (yüz ≥ %12) | pencereden dönüş | yok: `kanat` prop + açıklıktan türeyen huzme |
| EV-Y1 (yedek) | P04 | Fişeği kavrayan elin boğumları beyazlar | p125–190 (15.58–16.67) | insert (eller) | "sonra tutunuyor" | yok: `el.solgunluk` |

Dokunuşsuz planlar: P02, P03, P07, P10, P13 (CLAUDE.md: her plana zorunlu değil). Gerekçe aşağıda "Bilinçli boşluklar".

## Tekrar kontrolü

- Blanc'ta kullanılanlar: baston–fare, T kol gölgesi, çorap, çentik/HATA klak zinciri, esneme, pervaz çentiği, eldiven giyme, boş kitap+güve, Wi-Fi'ye dönen T, mühür. Hiçbiri bu listede yok.
- Film içi: başlık uçması, bırakılan demet, taş, martı (tek kuş), kese+sikke, pencere kanadı. Hepsi farklı mekanizma ve farklı nesne. Kuş yalnız EV-D4'te, kese düşüşü yalnız EV-D5'te.
- P07 (kese avuca düşer) ve P11 senaryoda aynalı. Yalnız P11 dokunuş sayıldı; P07 sade kalır (aksi hâlde "iki kese dokunuşu" tekrar okunur).
- Kıvılcım P01 ve P14'te zaten senaryonun döngüsü; ek bir kıvılcım dokunuşu kurulmadı.

---

## EV-D1 · P05 · Başlık uçar

- **Plan:** P05, 240 kare (mutlak 1020–1260). **Dokunuş p62–140** (mutlak 1082–1160). `kontrol_kare` p92 (başlık yayın tepesinde, yardımcı sıçramış).
- **Ne olur:** Meşale fitile değer (p40), fişek p62'de püskürmeye başlar ama yerinde titrer (p62–100, 0.6 sn bekleyiş). Meşaleyi tutan yardımcı geri sıçrar, kolu yüzünde. Püskürmenin ilk basıncı başlığını kafasından alır. Başlık sağa doğru yay çizer, rıhtıma iner, iki kez yuvarlanıp durur (p118–140). Fişek ancak p100'de kalkar, yani dikkat önce yardımcıda, sonra fişekte.
- **Bağlı eylem / sebep-sonuç:** ateşleme (sebep) → itki basıncı başlığı uçurur (sonuç). Barut gücünü ekranda gösterir: ekrandaki "~250 m" iddiasından önce izleyici gücü hisseder.
- **Karakter:** yardımcının korkusu Lagâri'nin soğukkanlılığını ve riski anlatır. Lagâri bu planda yerinde oturur, kıpırdamaz.
- **Çekim ölçeği:** yardımcı boy (kamera sabit, ön plan sol/sağ), fişek ve Lagâri orta plan geniş. Ölçek değişimi yok.
- **Okunurluk:** yardımcı figürü ekran yüksekliğinin ≈ %35'i; başlık yayı yatayda ≈ 450 px, yükseklikte ≈ 260 px; net süre 1.3 sn. Başlık y ≥ 520 (üst yazı bandı 240–400'ün altında), iniş x ≤ 960 (yan güvenli alan). Fişek 0.6 sn bekler: göz yardımcıya yönlenir, kalkış başlık yere inerken (p118) başlamaz, p100'de başlar ama başlık hâlâ havada; yönetmen bu çakışmayı kare kare kontrol etmeli (gerekirse kalkış p112).
- **Foley:** fitil tıss (p40, −8 dB) · püskürme fışşş, kısa crescendo (p62, −8 dB) · yardımcı sıçrama: kumaş hışırtısı + ayak (p64, −10 dB) · başlık yere iniş yumuşak kumaş "fıt" (p118, −10 dB, görünür temas) · yuvarlanma sessiz · fişek kalkış whoosh (p100, −6 dB).
- **Kit:** 17. yy. yardımcı kostümü ve rıhtım mekânı yok (kurulum ekibi). **En küçük parça:** `baslik` prop (kafadan ayrılma karesinde baştaki başlık gizlenir, prop `x/y/aci` anahtarlı yol izler, temas gölgesi). Prop yol anahtarı motoru kitte var. Başlık biçimi nötr (sade takke/kavuk; kanıtsız renk/arma yok).
- **Kaynak notu:** yardımcıların ateşlediği Evliya'da var (TDV-L); başlık ve sıçrama dramatizasyon (açıklamada zaten "sahneler ve jestler dramatizasyondur").

## EV-D2 · P06 · Bırakılan demet düşer, Lagâri süzülür

- **Plan:** P06, 300 kare (mutlak 1260–1560). **Dokunuş p28–120** (mutlak 1288–1380). `kontrol_kare` p62 (demet yarı yolda, Lagâri kanat açmış, iki hareket ters yönde).
- **Ne olur:** Ateş söner (p0–28). Lagâri kollarını açar: aynı hareket hem demeti bırakmak hem kanatları açmaktır (p28–40). Boşalmış demet altından kayıp düşer (p34–88), Lagâri ise sağa, köşke doğru yükselip süzülür. Demet suya "dümp" ile iner, buhar halkası yükselir (p88–120). "Biri düşer, biri süzülür" tek karede okunur.
- **Bağlı eylem / sebep-sonuç:** P04'te "sonra tutunuyor" (kurulum) → P06'da tutunmayı bırakmak zorunda (karşılık). Barut bitti (sebep) → ağır, boş demet gider, hafif adam kalır (sonuç). Bu, senaryonun mekanizma görevini ("barut bitince kanat açılır") görsele bağlar.
- **Karakter:** Lagâri hazırlıklı ve kararlı; bırakma tereddütsüz.
- **Çekim ölçeği:** geniş. Lagâri üst yarıda (y ≈ 600–800), deniz alt yarıda (y 1100–1480). Demet su yüzüne ekran içinde iner.
- **Okunurluk:** demet yüksekliği ≈ %11–12 (≈ 220 px) düşüş boyunca; net süre ≈ 1.4 sn. Kanat siluet, sade ve belirsiz (yapı çizilmez, ayrıntı yok). Düşüş zonu (alt-sol) ile kanat zonu (üst-sağ) ayrı; planın üst yazısı ("Sonra yüzerek padişaha döndü.") dokunuştan sonra gelir.
- **Foley:** bırakma: kumaş/ahşap kısa "tık" (p30, −10) · düşerken kısık rüzgâr düdüğü (p34–88, −14) · su çarpma ağır "dümp" (p88, −8) · buhar tsss (p88–120, −12). Planın sonundaki Lagâri iniş "şap"ı (senaryodaki) −4 dB ile en yüksek kalır; demet sesi ondan belirgin kısık.
- **Kit:** `demet` (barut tüpleri, nötr, kol/kanat sayılmaz) P03/P05 için zaten gerekecek. **En küçük ek parça:** demet düşüş yolu (prop `x/y/aci` anahtarı, kitte var) + su çarpma halkası ve buhar efekti (`Efektler.tsx` içeriği bu görevde doğrulanmadı; yoksa 2 parçalık halka+duman).
- **Kaynak notu:** "Barut bitince kartal kanatlarını açtı" Evliya'da var (TDV-L). Fişeği bırakma kaynakta yok ama onunla çelişmez; kanat yapısı hâlâ belirsiz. Risk: P06 5 sn'de çok iş yapıyor (düşüş + iniş + yüzme); yönetmen, iniş "şap"ı ve yüzmeyi p288'e kadar bitirmeli. Sığmazsa demet düşüşü kısaltılır (p34–70), splash çıkarılır.

## EV-D3 · P08 · Düşen taş

- **Plan:** P08, 240 kare (mutlak 1830–2070). **Dokunuş p48–215** (mutlak 1878–2045). `kontrol_kare` p100 (taş düşüşün ortasında, duvar paralaksı akıyor).
- **Ne olur:** Hezarfen galeri kenarında durur (p0–48). Ayağı kenardaki bir taş parçasını iter (p48). Kamera taşı izleyerek aşağı iner (p58–150): taş ekranda sabit boyutta, kule duvarı ve en altta sokak/tersane çatıları yukarı akar. Taş zemine çarpar, küçük toz (p150). Kamera hızla yukarı döner (p150–190), Hezarfen aşağıya değil ufka, karşı kıyıya bakar (bak jesti, p185–215).
- **Bağlı eylem / sebep-sonuç:** ayak taşı iter (sebep) → yükseklik görünür olur; Hezarfen aşağı bakıp korkmak yerine ufka döner (sonuç).
- **Karakter:** Hezarfen yüksekliği görür, bilir, yine de karşıya bakar: korkusuz, kararlı. (Louis'in "fareyi umursamaması"ndan farkı: burada bakar, ölçer, sonra karar verir.)
- **Çekim ölçeği:** göğüs (Hezarfen) → taşı izleyen dikey insert → göğüs. Ölçek değişimleri: p48–58 yakın ayak/taş, p58–150 takip, p150–190 kamera yukarı, p190+ göğüs.
- **Okunurluk:** taş stilize büyütülmüş ≈ %10 (≈ 190 px) ve takipte sabit; net 1.6 sn. Çarpma noktasındaki toz küçük kalır (<%5); bu yüzden okunurluk taşın yolunda ve duvar paralaksında aranır, tozda değil. Hezarfen yüzü göğüs planında ≥ %12 değil (bak jesti küçük): bakış büyük hareketle (baş çevirme) verilir, göz kırpma gibi küçük jest kullanılmaz.
- **Foley:** ayakkabı taşı iter: kısa taş sürtmesi "çırt" (p48, −8) · taş kenardan kayar hışırtı (p52, −10) · düşerken rüzgâr (p58–150, −14) · uzak "tık" + toz (p150, −18; çarpma ekranda görünür olduğu için ses var, uzaklıktan kısık) · taş gecikmeli ses fiziksel olarak mümkün, abartılmaz.
- **Kit:** Galata kule tepesi şablonu kurulumla gelecek. **En küçük parça:** üç ekran boyunda dikey şerit (kule duvarı + aşağıda sokak katmanı; kamera `cy` anahtarıyla gezer) + `tas` prop + toz halkası. Bu planın en pahalı parçası.
- **Yedek (ucuz):** taş sabit kadrajda kenardan kaybolur, ses yok, Hezarfen ufka bakar. Okunurluk düşer (yükseklik hissi azalır); ancak bütçe kısılırsa kabul.
- **Kaynak notu:** Galata kulesi Evliya'ya göre bir zamanlar zindan/ambar (TDV-G); külah biçimi nötr kalır. "Rüzgâr ölçüldü" tarzı jest (parmak ıslatma vb.) bilerek kullanılmadı.

## EV-D4 · P09 · Martı çırpar, Hezarfen süzülür

- **Plan:** P09, 270 kare (mutlak 2070–2340). **Dokunuş p112–195** (mutlak 2182–2265). `kontrol_kare` p150 (Hezarfen martıyı geçerken).
- **Ne olur:** Hezarfen atlar (p0–45), rota çizgisi çizilir (p50–110). Ön planda sağ alttan bir martı girer (p112) ve hızlı kanat çırparak Hezarfen'in yanında uçar; Hezarfen kanat çırpmaz, martıyı geçer (p150). Martı çırpmayı bırakır, kanadını sabitleyip süzülmeye geçer (p170) ve sol alttan çıkar (p195). Hezarfen karşı kıyıya iner (p210–255).
- **Bağlı eylem / sebep-sonuç:** süzülme (eylem) → kuş çırpar, o çırpmaz (sonuç). Lodos kelimesini ve "süzülerek geçiyor" cümlesini ekranda somutlaştırır: çırpmadan gitmek nasıl bir şey.
- **Karakter:** bu plan Hezarfen'in sakinliğini anlatır (çırpınmaz).
- **Çekim ölçeği:** geniş; martı kameraya yakın ön plan (büyük, hafif bulanık), Hezarfen orta mesafede, kontra ışıkta. Ufuk–ölçek kuralı: Hezarfen küçük, martı ön plan olduğu için büyük, tutarlı.
- **Okunurluk:** martı kanat açıklığı ≈ 420 px (genişliğin %39'u), çırpma genliği ≈ 220 px (≈ %11); net 1.4 sn. Martı y ≥ 520, rota çizgisi bitmiş olur (p110), yani iki grafik üst üste binmez.
- **Kanat belirsizliği uyarısı:** martının kanadı net çizilirse Hezarfen'in kanadıyla karşılaştırılıp "kanat nasıl?" sorusu açılabilir. Önlem: Hezarfen kontra ışıkta düz bir siluet, ayrıntı yok; karşılaştırma şekilde değil hareket tipinde (çırp / çırpma).
- **Foley:** martı çığlığı ×1 (p120, −10) · kanat çırpma hışırtısı, 4–5 vuruş (p112–170, −12) · Hezarfen'in kumaş/rüzgâr dalgası (ortam, p45–260, −16) · martı çırpmayı bıraktığında çırpma sesi kesilir, yalnız rüzgâr (p170).
- **Kit:** **En küçük parça:** `marti` prop (kanat çırpma 3–4 pozluk döngü + süzülme pozu, `x/y/olcek/aci` anahtarlı yol). Prop yol motoru kitte var; döngü çizimi yeni.

## EV-D5 · P11 · Düşen kese ve dönen sikke

- **Plan:** P11, 270 kare (mutlak 2580–2850). **Dokunuş p84–205** (mutlak 2664–2785). `kontrol_kare` p112 (kese havada, el açık, omuzdaki el üstte).
- **Ne olur:** Üstten bir el keseyi uzatır, kese Hezarfen'in avucuna konar (p58, şıngır). Avuç kapanamadan arkadan bir el omza iner (p84). Parmaklar gevşer, kese avuçtan kayar (p92–104), rıhtıma düşer (p118). Kese ağzından tek altın sikke fırlar, dönerek yuvarlanır, yavaşlar, yatar (p120–200). Kamera kese ve sikkeyle sabit kalır.
- **Bağlı eylem / sebep-sonuç:** ödül verilir (kurulum) → el omza iner, kese kayar (sonuç): ödül boşa çıkar. P07'de aynı hareket "avuç kapanır, kese tutulur" olarak kurulur; P11'de avuç kapanamaz. Senaryodaki "altın ama sürgün" ters sonu görsel olarak kapatır.
- **Karakter:** Hezarfen'in tepkisi pasif: ne direnir ne atılır; çaresizlik ve şaşkınlık.
- **Çekim ölçeği:** insert (eller + rıhtım zemini). P07 ile **aynı kadraj** (elin y ≈ 850, zemin y ≈ 1300) kurulmalı ki ayna okunsun ve kese düşüşü zemin görsün. Kamera sabit, ölçek değişimi yok.
- **Okunurluk:** kese ≈ %12–13 (≈ 240 px), net 2.0 sn. Sikke ≈ %5, ek ayrıntı sayılır (okunurluk ölçüsü kese içindir). Ayak/temas noktası y ≤ 1480; üst yazı "Sürgün: Cezayir" üst bantta.
- **Foley:** kese avuca "şıngır" (p58, −6) · omza el "tok" bez-ağır (p84, −8) · kese yere "tok+şıngır" (p118, −6) · sikke dönme zırr (p120–195, azalan, −12) · sikke yatış ince "tın" (p200, −10). P07'nin şıngırından farklı: burada altın sikke tınısı daha parlak.
- **Kit:** `kese` prop var (düşüş = `x/y` anahtarı; 17. yy. görünümü kurulumla). Yeni: `sikke` prop (altın, dönme animasyonu = eliptik yatış), el `tip: entari-yen` (Osmanlı kolu) ve P07/P11 için ortak **KIYI-INSERT** (el + rıhtım zemini) şablonu.
- **Kaynak notu:** "bir kese altın, sürgün" Evliya'da (TDV-H). Muhafız eli ve kesenin düşmesi dramatizasyon. Kese gümüş/altın karşılığı doğrulanamadı; renk ayrımı göstergedir.

## EV-D6 · P12 · Pencere kanadı kapanır, ışık gözlerde şeride iner

- **Plan:** P12, 210 kare (mutlak 2850–3060). **Dokunuş p20–125** (mutlak 2870–2975). `kontrol_kare` p60 (kanat kapalı, ışık şeridi gözde).
- **Ne olur:** Padişah profilden pencerede (p0–20), dışarı, Hezarfen'in uçtuğu yöne bakıyor. Kolunu uzatır, ahşap pencere kanadını çeker (p20–48), kanat "tok" kapanır, dar bir aralık kalır. Pencere ışığı tek şeride düşer ve yüzünde yalnız gözlerin üstüne vurur (p48–120). Replik p45'te başlar. Padişah ışıktan dönüp karanlığa girer (p95–125); yüz gölgede (senaryo), eli kapıyı gösterir (p150–185).
- **Bağlı eylem / sebep-sonuç:** "pencereden dönüyor" (senaryo) → dönmeden önce gördüğünü kapatır. Hezarfen'in izlendiği pencere kapanır, karar verilir. İzleyici replik başlamadan önce kararı görmüş olur.
- **Karakter:** Padişah soğuk ve kararlı; yüzü gösterilmez (portre referansı yok, kanıtsız detay nötr).
- **Çekim ölçeği:** göğüs/yakın (yüz ≥ %12 ≈ 230 px; senaryodaki bel planı, dokunuş anı için göğüse yaklaştırılır). Ölçek değişimi: p0–20 bel, p20–48 göğüse push-in, p120+ bel-göğüs.
- **Okunurluk:** kanat ≈ ekran yüksekliğinin %30'u ve 0.45 sn hareket; ışık şeridi 1.2 sn net (p48–120). Replik altyazısı alt bantta; yüz y ≈ 600–900, çakışmaz. Şerit tek ışık kaynağından (pencere aralığı) türetilir; huzme genişliği = aralık genişliği, ayrı el konumu yok.
- **Foley:** kanat kapanma "tok" (p48, −4) · mandal/sürgü "tık" (p52, −8) · dış ortam (dalga, martı, uzak şenlik kalıntısı) kanat kapanınca kısılır ve alçak geçirgen olur (p48, −12 → −22): kapanan pencerenin sesi kesilir.
- **Kit:** iç köşk mekânı kurulumla gelir. **En küçük parça:** `kanat` prop (menteşe açısı anahtarlı) + ışık huzmesinin pencere açıklığından türemesi (şablon parametresi `pencere.aciklik`). Süslemesiz ahşap kanat; kafes/arma yok (kanıtsız dönem detayı).
- **Yedek (ucuz):** kanat çizilmez, yalnız ışık maskesi daralır ve yüz gölgeye girer; "tok" sesi kapı sesiyle verilir. Okunurluk biraz düşer.

---

## Yedek · EV-Y1 · P04 · Boğumlar beyazlar

- **Plan:** P04, 210 kare (mutlak 810–1020). **Dokunuş p125–190** (mutlak 935–1000). `kontrol_kare` p150. Net 1.08 sn (sınırda).
- **Ne olur:** Lagâri replikten sonra (p125) elini kaldırdığı selamdan fişeğe iner, tüpü kavrar; kamera ele iner; boğumlar beyazlar, parmaklar tüpün kâğıdını hafifçe ezer.
- **Sebep-sonuç:** korku ya da gerginlik → sıkı kavrayış; P06'daki bırakmanın kurulumu. Karakter: dışarıdan kararlı, içeriden gergin.
- **Çekim ölçeği:** bel → p118–140 push-in → insert (eller ≥ %12). Replik alt bantta, eller y ≈ 1000.
- **Foley:** kâğıt/tüp ezilme çıt (p150, −10), kumaş.
- **Kit:** yok: `el.solgunluk` (0→1 anahtarlı ten açma parametresi). Sürenin sınırda olması ve ek kit gereği nedeniyle yedek.

---

## Bilinçli boşluklar

- **P02, P10:** aynı kadraj eşleşmesi senaryonun kurgusu; dokunuş eklenirse eşleşme okunurluğu bozulur. Tespih/dürbün gibi fikirler dönem ve kanıt gerekçesiyle elendi.
- **P03:** düğüm/ip bağlama Blanc paket dokunuşunu (ip-düğüm) çağrıştırdığı için, kıvılcım ise kanca/kapanış döngüsünü seyreltmemek için elendi.
- **P07:** P11'in aynası; dokunuş saymamak tekrar riskini önler.
- **P13:** senaryodaki "öteki defterler açılıyor, sayfaları boş" kitap prop'unun `bos` mekanizmasını (Blanc D8 "boş kitap + güve") yeniden kullanır; güve yok ama mekanizma benzer. Dokunuş sayılmadı. Orkestra: kullanıcı kabul ederse sade bırakılır, istemezse sayfalar boş yerine ince bir mürekkep çizgisiyle (tek satır) gösterilir.

## Yeni kit parçaları (toplu, maliyet sırasıyla)

Sahne kitleri (17. yy. İstanbul mekânı, kostüm, demet, kese, kitap) kurulum ekibi işi; aşağıdakiler yalnız dokunuşların ek istediği en küçük parçalar.

| # | parça | kullanan | tür | maliyet |
|---|---|---|---|---|
| 1 | `sikke` prop (altın, dönüp yatma animasyonu) | EV-D5 | prop | düşük |
| 2 | `baslik` prop (ayrılabilir, yol anahtarlı, baştaki hâli gizlenir) | EV-D1 | prop | düşük |
| 3 | Toz halkası + su çarpma halkası + buhar (Efektler.tsx kontrol edilmeli) | EV-D2, EV-D3 | efekt | düşük |
| 4 | Demet düşüş yolu (mevcut prop yol motoru, ek kod yok) | EV-D2 | parametre | düşük |
| 5 | `marti` prop (3–4 pozluk çırpma döngüsü + süzülme) | EV-D4 | prop (çizim) | orta |
| 6 | KIYI-INSERT (el + rıhtım zemini, P07/P11 ortak kadraj) + `el.tip: entari-yen` | EV-D5 | şablon/el | orta |
| 7 | `kanat` prop (menteşe açısı) + huzmenin pencere aralığından türemesi | EV-D6 | prop + şablon parametresi | orta |
| 8 | Dikey şerit (3 ekran boyu: kule duvarı + alt katman) + `tas` prop | EV-D3 | şablon katmanı | yüksek |
| 9 | (yedek) `el.solgunluk` | EV-Y1 | karakter parametresi | düşük |

**Ses (bölüme özel `foley.json`, mevcut Blanc kayıtlarından yeniden kullanım yok):** fitil-tiss, puskurme, kumas-hisirti, baslik-iniş, fisek-kalkis, birakma-tik, dusme-ruzgar, su-dump, buhar, tas-surtme, tas-kayma, uzak-tik, marti-cigligi, kanat-hisirti, kese-singir, omuz-tok, kese-yere, sikke-donme, sikke-tin, pencere-tok, mandal-tik, ortam-kisma. Seviyeler yukarıda; hepsi anlatımın (0 dB) altında, foley −4…−18.

## Kesilme sırası (bütçe daralırsa)

1. EV-D3 tam sürüm → yedek sürüm (dikey şerit çıkar).
2. EV-D6 kanat prop → yalnız ışık maskesi.
3. EV-D4 martı → çıkar (6 → 5 dokunuş; alt sınır 6 olduğu için EV-Y1 devreye girer).

## Orkestraya açık sorular

1. P05'te fişek kalkışı başlık yere inmeden (p100) mi, sonra mı (p112)? Yönetmen render karesine bakıp karar verir.
2. P06'daki "fişeği bırakma" kaynakta yok ama kaynakla çelişmez; kullanıcı dramatizasyonu kabul ediyor mu? Etmezse EV-D2 yerine EV-Y1 öne çıkar.
3. `DOKUNUS-KUTUPHANESI.md`'ye ekleme bu görevde yapılmadı (yalnız bu dosya yazıldı); dokunuşlar onaylanınca eklenecek.
