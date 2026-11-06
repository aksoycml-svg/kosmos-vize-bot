# Blanc Kardeşler · Storyboard v2 · Eleştiri D: YÖN KARARI (A: tam kod · B′: hibrit plaka)

Eleştirmen · 2026-11-06 · Tarafsız karşılaştırma; kod değişmedi.
Girdiler: CLAUDE.md, `elestiri-C.md`, `hibrit-test/hibrit-test.md`, katki-raporu (mekân sorumlusu hibrit plaka testi; motion hibrit kompozit testi), `hibrit-test/{kompozit-sayfa, kompozit-3, kompozit-3-360, kompozit-3-p120, BORSA-plaka-tam}.png`, `kareler/{A4-gravur-karsilastirma, SB2-BORSA-p0}.png`, `mood/mood-05-gravur-sokak-bordeaux.png`, `sahne-plani.md` (plan tablosu).
Yöntem: kırpma ve büyütme, piksel ölçümü (PIL) scratchpad'de. Koordinatlar 1080×1920, plaka için 1536×2752.

---

## 0. Kısa karar

- **Telefonda tek kare güzelliğinde B′ açık ara önde.** Kompozit-3, 360 px'te tek resim gibi okunuyor. A4 hâlâ "temiz vektör".
- **Film olarak A önde.** 23 planın büyük çoğunluğu insert, yakın ya da göğüs plan. Kamera, temas ya da ışık değişimi istiyor. Bunlar B′'de de kodla çizilecek. Plakanın fayda verdiği geniş mimari süre tahminen **≈ 6–8 sn / 60 sn (%10–13)**: P02 geniş + dönüş, P04 boy açılış, P06 açılış, P09, P18 kuruluş.
- Bu yüzden B′, A'nın işini azaltmıyor, üstüne yeni bir iş ekliyor. Aynı planın içinde **plaka geniş → kod insert → plaka geniş** kesmesi de yeni bir "iki dünya" riski açıyor.
- **Öneri: "A+" (kod omurga + Gemini hedef kare).** Gemini plakası ekrana konmaz, mekân başına **görsel hedef ve ayrıntı envanteri** olarak kullanılır. A tek turluk bir "ayrıntı yoğunluğu + rig ışığı" adımıyla bu hedefe yaklaştırılır. Zaman kutulu ve ölçülebilir bir geri dönüş tetiği var: A5, 360 px'te ≥ 7 alamazsa B′, **yalnız kuruluş planları** için ve **iskelet koşullu üretimle** devreye girer (bölüm 4–5).

---

## 1. Ölçüt ölçüt puan (1–10)

| # | Ölçüt | A (tam kod, A4) | B′ (plaka + kod ön çerçeve + rig, kompozit-3) |
|---|---|---|---|
| 1 | Telefonda görsel kalite, "gravür" okunması | **5.5**. A4 G6: Borsa/Sokak 6, Tours 5. Mürekkep artık mimariyi taşıyor ama ayrıntı yoğunluğu (konsol, balüstrad, pencere bölmesi, taş lekesi) ve ton aralığı düşük. 360'ta "çizgi film dekoru" okunuyor. | **Plaka 8.5 / kompozit 7.** 360'ta litografi hissi, derinlik ve malzeme var. Kompozitte düşüren üç şey: kompars düz kahve karton kesik gibi (kompozit-3, 150–940 × 990–1240); rig taraması ışık yönünü bilmiyor, tüm kumaşa tek yön "\\" çizgili kumaş/pijama gibi biniyor (2× satırı); yüzler düz dolgu. |
| 2 | Dönem/mimari doğruluk ve denetlenebilirlik | **8.** Kemer tipi, kat düzeni, ufuk ve nesne konumu parametrik. Hata bulunur, tek yerden düzelir. Tel örgü (BC1) gibi hatalar modül kuralıyla kalıcı yasaklanabildi. | **5.5.** İskelet bu sefer doğru: yarım daire, pilastr, dikey dövme demir, açık avlu. Ama kadran (imza 2) eksik, alınlıkta tek amblem yerine demet var, tezgâh defterinde **sahte yazı**, ön kemer tepesi kadrajda (kart: görünmez). Model istenmeyen eklemeler yapıyor: mood-05'te gotik kule + haç, sahte tabela harfleri; d1'de ışınsal lunette. Her plaka madde madde denetim istiyor ve denetim ancak düzeltme isteyebiliyor; düzeltme yeniden üretim demek. |
| 3 | Karakterlerle bütünlük ("iki dünya"), ışık uyumu | **6.** Aynı çizgi ailesi; G3 sonrası mimari ve karakter konturu yaklaştı. Ama ikisi de "düz" olduğu için uyum düşük bir çıtada. | **5.** 360'ta kaynaşıyor. Tam boyda ve yakında "gravür dekor önünde karikatür kukla" (yüz 3× satırı). Işık sorunlu: plakanın kendi ışığı bile tek kaynaktan türemiyor (bkz. 2.2). Rig önden düz ışıkta, gölgeleri sol-öne gidiyor; plakadaki zemin gölge kaması sağ-öne açılıyor. "Tek ışık kaynağı" kuralı plakada tanımla sağlanamaz, gözle eşlenir. |
| 4 | Kamera hareketi, paralaks, insert esnekliği | **9.** Gerçek perspektif, sınırsız push-in, katman katman paralaks, insert aynı geometriden. | **3.5.** 2K plaka net en fazla ≈ 1.35× push-in taşır; p120 (1.10×) temiz. Paralaks yalnız 2 düzlemde; arka katmanın içinde derinlik yok ("fotoğrafa zoom"). Tahta insert plakadan çıkmaz (5.8× gerekiyor); her insert ayrı plaka ya da kod demek. |
| 5 | Plan plan süreklilik, aynı mekânın farklı açıları | **9.** Aynı sahne, farklı kamera. P02 geniş → tahta insert → Louis göğüs aynı mimariden. | **4.** Açı başına yeni üretim. Aynı prompta yakın d1 → d2'de bile amblem, pencere bölmesi ve korniş dişi değişti. P02'de geniş (plaka) → insert (kod) → geniş (plaka) kesmesi: üslup her kesmede sıçrar. P02→P03 MATCH tahta konumunu ister; plakada tahta x 470–612, y 960–1065, hedef x 300–780, y 400–760. |
| 6 | Üretim maliyeti ve kota (23 plan, 12 mekân) | **6.** Pahalı kalem motion (opus) zamanı; 9 mekân kaldı. Ama modüller (Kemer, Cephe, Tarama, Golge, KolEl) her mekânda tekrar kullanılıyor; maliyet azalarak gidiyor. | **4.** Tek tek Gemini çağrısı ucuz. Ama tam B′ için mekân sorumlusu tahmini ≈ 60–90 üretim + deneme; bu testte 4 deneme = 1 plaka + 2 katman ve ufuk yine tutmadı. Üstüne maske temizliği, plaka başına dönem denetimi, sahne planının plakaya uydurulması, temasların piksele kilitlenmesi geliyor. Rig gravür filtresi render süresini ≈ 2–3× artırıyor. Ve kod işi azalmıyor (insert/yakın %85+). Gemini fiyatı ve kotası **doğrulanmalı**. |
| 7 | Revizyon kolaylığı | **8.** Ufuk, konum, renk, tarama parametre; değişiklik tüm planlara yayılır. | **3.** Plaka değişirse ufuk, nesne konumu, temas noktaları, maske ve ön katman hepsi kayar. Küçük düzeltme (kadran ekle, sahte yazı sil) ya üstüne kod yaması ya da yeniden üretim; ikincisi her şeyi oynatır. |
| 8 | Kanal kimliği, sonraki bölümlere ölçeklenme | **7.** Sahiplenilebilir, tutarlı bir el. Rig ve modüller bölümden bölüme taşınır. Zayıf yanı: yeni şehir/dönem için yeni mimari modül gerekir (ör. Osmanlı ahşap ev, Viktoryen Londra). | **5.5.** Yeni şehir/dönem hızlı çıkar; bu gerçek bir avantaj. Ama üslup bölümden bölüme modelin günlük "eli"ne bağlı. Görünüm piyasadaki "AI illüstrasyon" kanallarına yaklaşıyor. Tarih kanalında yorumlarda güven riski (yorum, ölçülmedi). |
| 9 | Yasal/ticari risk | **9.** Kod + kamu malı referans; sahiplik açık. | **5. Doğrulanmalı:** (a) Gemini API çıktısının ticari kullanım koşulları ve ücretsiz/ücretli katman veri kullanımı; (b) SynthID filigranı ve Meta'nın "AI info" etiketi (Instagram otomatik etiketleyebilir; görünürlüğe etkisi bilinmiyor); (c) yalnız yapay zekâ üretimi görselin telif korumasının zayıflığı (ABD Telif Ofisi yaklaşımı) → kanal plakayı koruyamayabilir; (d) prompt "1830'lar gravürü" tarzı istiyor, tarz korunmaz ama belirli bir eseri kopyalama ihtimali denetlenmeli. Hiçbiri bu oturumda doğrulanmadı. |
| | **Ağırlıksız ortalama** | **≈ 7.6** | **≈ 4.9** |

Not: ölçüt 1 ağırlığı kullanıcı için muhtemelen en yüksek. Yalnız 1 ve 3'e bakılırsa B′ önde. Film bütününe (4–7) bakılırsa A önde.

---

## 2. B′ plakasının kendi kusurları (d2 / d3 / d4 + kompozit)

| # | Yer (px) | Kusur | Kural | Öncelik |
|---|---|---|---|---|
| P1 | sol kanat korniş/taban; avlu derzleri | **Perspektif tutarsız** (motion ölçümü): sol kanat korniş ve taban çizgileri farklı kaçışlara gidiyor, derzlerde ±30 px sapma. Ufuk y ≈ 1000 (hibrit-test.md'deki 1135 yanlış; o arka cephe tabanı). Sahne planı 800 istiyor. | Ufuk–ölçek, kamera tutarlılığı | **KRİTİK** (sahne planını plakaya uydurmayı zorunlu kılıyor) |
| P2 | zemin gölge kaması (plaka 700→1000 × 1190→1650) ↔ hokka gölgesi (tezgâh) | **Işık tek kaynaktan türemiyor.** Zemin gölgesi arkada geniş, öne doğru daralıyor. Düz ve paralel bir kanadın gölgesi perspektifte tersine daralmalı (ölçülmedi, gözlem). Hokkanın gölgesi sağa düşüyor, yani ışık soldan; kart "sağ-arka" diyor. Hokka portik çatısının altındaki gölge bandında olduğu hâlde net güneş gölgesi atıyor. Rig gölgeleri ise sol-öne. | Tek ışık kaynağı | **KRİTİK** |
| P3 | ön ayaklar, ön kemer, tezgâh yanı | **Saf siyaha yakın mürekkep.** Plakada piksellerin **%6.2'si L<15**, %2.3'ü L<8, ortalama koyu `#0f0802`. Motion'ın "%1" ölçümünden çok yüksek. Kompozitte %4.0 L<15. Tahta `#202221` (kompozit ölçümü), neredeyse siyah. | Saf siyah yok | ORTA (ton eşlemesiyle kaldırılır ama plakanın "gravür" gücü kısmen bu koyulukta) |
| P4 | ön ayak gövdeleri, kemer içi | Çok sık çapraz tarama; 360'ta gri ağ/ekran tonu. A4 G6(b) kafes yasağına sınırda. | Gravür dili G2/G6 | ORTA |
| P5 | tezgâh defteri (kompozit-3 ≈ 1000–1050 × 1555–1580; plaka sağ alt) | **Sahte yazı karalaması** (harf benzeri şekiller). 360'ta okunmuyor ama tam boyda ve 4K tuvalde görünür. | Yazı yasağı / kanıtsız ayrıntı | ORTA |
| P6 | arka cephe | 1750 kadranı yok (imza 2). Alınlıklarda demet amblem. Ön kemer tepesi kadrajda. Işık öğle değil ikindi okunuyor. | Mimari kart 10.1 | KÜÇÜK–ORTA |
| P7 | tahta (kompozit 470–612 × 960–1065) | Dokunuş nesnesi telefonda ≈ 47 px (360'ta). Plakadan insert yapılamıyor; P03 MATCH konumu tutmuyor. | Dokunuş okunurluğu, süreklilik | **KRİTİK** (P02 için) |
| P8 | 2K çözünürlük | Push ≤ 1.35×, 4K hareketli tuval gereken planda ölçeklenmiyor. | Teknik | ORTA |

### Kompozitin rig tarafı (yol seçiminden bağımsız, iki yolda da kapanmalı)
- **Louis yazmıyor:** tüy kalem defterde dik duruyor, eli kâğıt kenarında (kompozit-3 ≈ 640–700 × 1095–1130). BC3 hibritte de sürüyor. **KRİTİK**.
- François'nın taba eldiveni tüccarın paltosuyla aynı tonda; omuzdaki el 360'ta kayboluyor (kompozit-3 ≈ 230–260 × 1170–1220). Jest okunmuyor. ORTA.
- Louis'nin cep eldiveni beyaz dikdörtgen, "kart" okunuyor (SÜ1 notu). ORTA.
- Pupitr ayağının altında yumuşak bulanık elips gölge var (G4 net kenar kuralına aykırı). KÜÇÜK.
- Kompars siluetleri tek düz kahve; gravür dünyasında karton kesik gibi. ORTA.
- Yüzler ≈ 75 px; bu geniş planda oyunculuk yok. Kural gereği zaten kesme lazım (iki yolda da).

---

## 3. A tarafının açık kusurları (adil olmak için)
- A3→A4 iki turda gravür okunurluğu yalnız ≈ +1 puan arttı. Kök neden tarama değil **ayrıntı yoğunluğu ve ton aralığı**: plakada balüstrad, dişli korniş, bölmeli pencere, taş lekesi/yıkama, gölge kamaları var; A4'te düz paneller (A4-gravur-karsilastirma alt satır ile mood-05 kıyası).
- Panel içi degrade yasağı (renk yıkaması yok) litografi hissini kesiyor. Motion bunu ilk açık soru olarak sordu, karar bekliyor.
- Rig ışığı (yön taraması, kenar ışığı) yok. Bu **iki yolun da ortak borcu.** B′'de daha görünür, ama A'da da "düz" okunmanın bir nedeni bu.
- Kod maliyeti: kalan 9 mekân + insertler motion (opus) kotasının en büyük kalemi.

---

## 4. Öneri: **A+** (kod omurga, Gemini plakası "hedef kare" olarak; ekrana girmez)

Gerekçe:
1. Filmin %85+'i insert, yakın ya da temaslı plan; bunlar her durumda kod.
2. B′'nin kazancı ≈ 6–8 sn'lik kuruluş anlarında; bedeli süreklilik, ışık, revizyon ve yasal belirsizlik.
3. Plakanın asıl dersi "üretim yöntemi" değil, **"hedef yoğunluk"**: hangi ayrıntı ve ton aralığı telefonda gravür okutuyor. Bu ders koda çevrilebilir; tersine, plakanın kusurları (P1, P2) koda çevrilemez.

### İlk 5 adım (sırasıyla; CLAUDE.md bağımlılık sırasına uygun)
1. **Kullanıcı kararı + ölçülebilir hedef.** `kompozit-3-360.png` BORSA için **görsel hedef** olarak sabitlenir (ekrana girmez). Kabul: 360 px'te A5 karesi hedefin yanında "aynı aile" okunur, eleştirmen G6 + bu bölümün ölçüt 1'inde ≥ 7.
2. **Mekân sorumlusu: ayrıntı envanteri** (`mekanlar.md` 11'e yeni bir "ayrıntı yoğunluğu" basamağı). d2 plakasından hangi elemanların okunurluk verdiğini çıkarır: balüstrad, dişli korniş, bölmeli pencere, taş yıkama lekesi, zemin gölge kaması, kemer içi koyuluğu. Her biri için "yakın / orta / uzak'ta çizilir mi" tablosu. Panel içi renk yıkaması (degrade yasağının gevşetilmesi) için karar.
3. **Motion A5 (yalnız BORSA, tek tur, zaman kutulu):**
   - (a) ayrıntı basamağı modüllere (Cephe/Kemer: balüstrad, korniş dişi, pencere bölmesi);
   - (b) panel içi yıkama + kâğıt lekesi (seed sabit);
   - (c) **rig ışığı:** `Kukla` `isik` prop'u, yön taramalı gölge tarafı + sıcak kenar ışığı, sahne ışık tanımından;
   - (d) kompars taraması;
   - (e) BC2 tahta insert, BC3 yazan el.
   Çıktı: tam + 360 + güvenli; yanına `kompozit-3-360` ile karşılaştırma sayfası.
4. **Eleştirmen kapısı (A5).** Ölçüt 1 ≥ 7 ve G6 tutuyorsa A+ kesinleşir; kalan 9 mekânın iskelet plakaları (Eleştiri C §7) bu basamakla sürer. Tutmuyorsa adım 5b.
5. **Paralel ve küçük:**
   - (5a) Kalan mekânlar için Gemini **hedef kare** üretimi (her mekâna 1, ekrana girmez; yalnız mekân sorumlusu ve motion için yön). Mood-05 gibi referans dosyasına "kanıtsız/yanlış ayrıntılar" notu düşülür (haç, gotik kule, sahte yazı).
   - (5b) **Geri dönüş (yalnız A5 başarısızsa):** B′ yalnız **kuruluş planları** için (P02 geniş/dönüş, P04 boy açılış, P06 açılış, P09, P18 geniş). Şart: **iskelet koşullu üretim**. Motion kod karesinin çizgi iskeletini (ufuk, kaçış, kilit nesne dikdörtgenleri) verir, Gemini onu boyar. Bu yöntem henüz denenmedi; önce BORSA'da tek test.

### Risk azaltma
- **Zaman kutusu:** A5 tek tur. Kriter tutmazsa tartışma yeniden açılmaz, 5b'ye geçilir.
- **Ortak borç önce:** rig ışığı ve kompars taraması iki yolda da gerekli. A5'te yapılırsa B′'ye geçilse bile boşa gitmez.
- **Referans kirliliği:** Gemini hedef kareleri `mood/` altında, dosya adında `HEDEF-` öneki ve kusur notuyla durur. Hiçbir render'a import edilmez (teknisyen kontrolü: `public/` altında Gemini görseli yok, deney klasörü `public/blanc/hibrit/` hariç ve o klasör yayın kompozisyonlarında kullanılmaz).
- **Yasal (B′'ye geçilirse önkoşul):** kullanıcı Gemini ticari kullanım koşullarını, ücretli katmanı ve Meta AI etiket politikasını doğrular; `muzik/lisanslar.md` benzeri `gorsel/kaynaklar.md` açılır (prompt, model, tarih, seed/deneme no).
- **B′'ye geçilirse kurallar:**
  - mekân başına tek ana plaka, diğer açılar yalnız düzenlemeyle;
  - aynı plan içinde plaka ↔ kod insert kesmesi varsa insert kod yoğunluğu plakaya eşlenmeden plan geçmez;
  - plaka girişinde zorunlu ölçüm: ufuk/kaçış, gölge yönü, L<15 oranı ≤ %1, sahte yazı taraması;
  - temaslar plakadaki nesneye değil kod katmanındaki nesneye kilitlenir.

---

## 5. Kullanıcıya iki cümle
- "Hangisi daha güzel?" sorusunun cevabı tek karede B′. "Hangisiyle bu filmi 23 plan boyunca tutarlı, düzeltilebilir ve kurallara uygun bitiririz?" sorusunun cevabı A.
- Önerim, B′'nin güzelliğini **hedef** olarak alıp bir tur A ile yakalamayı denemek. Tutmazsa B′'yi yalnız 4–5 kuruluş planına sınırlı ve iskelet koşullu olarak açmak.
