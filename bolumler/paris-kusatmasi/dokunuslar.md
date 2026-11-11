# Paris Kuşatması — Dokunuşlar (yaratıcı yönetmen, senaryo v3 onaylı)

Girdi: `senaryo.md` v3, `arastirma.md`, `src/kit/DOKUNUS-KUTUPHANESI.md`. Kural: CLAUDE.md "Dokunuş" (bölümde 6–8 güçlü dokunuş, kanca/kapanış hariç, her plana zorunlu değil). Burada **8 dokunuş**, 8 planda (P02–P06, P08, P09, P11). P07 ve P10 dokunuşsuz (insert/harita ağırlıklı, senaryodaki eylem zaten okunur). Kanca (P01) ve kapanış (P12) sayılmaz; notları en altta.

Zamanlar: plan içi saniye (film saniyesi parantezde). Her dokunuş plan bitiminden ≥0.2 sn (12 kare @60 fps) önce biter. Foley dosyaları henüz yok: `tools/sfx.mjs` ile üretilecek, adlar öneridir (`ses/foley/pk-*.wav`). Seviye: anlatım 0 dB, foley −6 ile −10 dB (temkinli).

## Özet tablo

| # | Plan | Dokunuş | Plan içi (film) sn | Bağlı eylem | Çekim | Foley |
|---|---|---|---|---|---|---|
| PK-D1 | P02 | Son Prusya işareti halkayı kapatır, telgraf teli kopar, uçlar geri kıvrılır | 1.4–3.0 (5.9–7.5) | Halkanın kapanması | harita üstten, kamera 6.0'da %115 push-in | pk-halka-tik, pk-tel-kopma |
| PK-D2 | P03 | Hortumdan şişen kumaş: kırışıklar sırayla açılır, ağ gerilir | 0.8–2.6 (11.2–13.0) | Balonun hazırlanması | boy → bel (balon yüksekliğin %45'i) | pk-gaz-fis, pk-kumas-pof |
| PK-D3 | P04 | Balast torbası atılır, sepet hafifleyip sıçrar, balon yükselir | 0.3–1.9 (14.7–16.3) | Kalkış kararı | sepet kenarı bel plan | pk-halat-coz, pk-kum-akis, pk-sepet-gicir |
| PK-D4 | P05 | Kafes kapağı açılır, güvercin yönünü bulur (gövde döner), çıkar | 1.5–3.2 (20.4–22.1) | Güvercinin bırakılması | kafes insert, kuş yüksekliğin %30'u | pk-kapak-menteşe, pk-kanat |
| PK-D5 | P06 | Sayfa kutu merceğine çekilip şeride küçülür, parmakla ölçülür | 2.1–5.2 (25.4–28.5) | Dagron'un buluşu | masa yakın, sayfa %22, şerit+parmak %14 | pk-mercek-tak, pk-kagit-fist, pk-cekmece, pk-serit-tik |
| PK-D6 | P08 | Kılıf kuyruk tüyüne ince iple bağlanır, tek pırıltı | 0.4–2.3 (34.4–36.3) | Mesajın kuşa verilmesi | makro insert, kuyruk/el tam kadraj | pk-ip-gerilme, pk-dugum, pk-kanat-salma |
| PK-D7 | P09 | Mercek odak çevrilir, bulanık küçük kare perdeye büyür ve satırlara netleşir | 2.0–3.8 (39.5–41.3) | Filmin okunması | perde odaklı geniş-boy, perde %55 | pk-cam-levha, pk-odak-disli |
| PK-D8 | P11 | Tours çizgisi sabit, gerçek rota rüzgârla sapıp uzar; 6 cetvel tıkı | 2.4–4.4 (49.2–51.2) | Rüzgârın yön vermesi | harita geri çekilir, çizgi yüksekliğin %60'ı | pk-kalem-cizgi, pk-cetvel-tik ×6 |

Kütüphane taraması: Blanc/Evliya satırları (fare, T kol gölgesi, çorap, çentik, esneme, pervaz, eldiven giyme, kitap+güve, Wi-Fi) ile mekanizma ve nesne olarak örtüşen yok. Bu bölümde **eldiven yok** (Blanc imzası): bütün eller çıplak, yüzsüz siluet eli.

## Dokunuşlar

### PK-D1 · P02 · Halka kapanır, tel kopar
- **Ne olur:** Prusya işaretleri halka olup yaklaşır; son işaret son boşluğa oturunca Paris'ten çıkan ince telgraf teli tam o noktada iki yana kopar, uçlar geri yaylanıp kıvrılır (içteki uç Paris'e, dıştaki uç boşluğa sarkar), sallanıp durur. Sallanma bitmeden kalabalık dolmaya başlamaz (göz bu ana kilitli).
- **Zaman:** 1.4 son işaret oturur · 1.6 kopma · 1.6–2.6 uçlar kıvrılıp sönümlenir · 3.0 durmuş. Kalabalık dolumu 3.2'de başlar (dokunuş sayılmaz).
- **Neden:** Telgraf anlatımda "kesildi" der; izleyici kesmeyi görür. Halka ve tel aynı eylemin iki yüzü: kapanış = kopuş (sebep-sonuç). Karakter: kuşatanın soğuk, makine gibi kesinliği.
- **Okunurluk:** Harita üstten, halka yüksekliğin ~%45'i; 6.0'da kamera kopma noktasına %115 push-in. Kıvrılan uçlar toplamı ≥220 px (~%11.5); tel kalın mürekkep çizgi (≥10 px). Net süre ≈1.6 sn.
- **Foley:** son işaret kâğıt "tık" (−8 dB), tel "pınk" kısa gergin (−7 dB), uçlar titreşirken kısık ikinci "pınk" yok (tek ses). Dosya: `pk-halka-tik.wav`, `pk-tel-kopma.wav`.
- **Kaynak:** §1 kuşatma başlangıcı (telgraf kesildi); stilize harita, kaynakla çelişmez.

### PK-D2 · P03 · Hortumdan şişen kumaş
- **Ne olur:** Dikilmiş kumaş şeritleri yerde buruşuk yığın; gaz hortumu ucu yığına girer, kumaş kabarır, kırışıklar sırayla üstten alta açılır, üzerine örtülen ağ halatları gerilir, küre tamamlanınca son bir yumuşak "oturma" ile sallanıp durur. Sonra çuvallı sepet bağlanır, balon halkanın üstünden çıkar (dokunuş sayılmaz).
- **Zaman:** 0.8 hortum gaz verir · 0.8–2.2 şişme · 2.2–2.6 oturma, sallanma sönümlenir.
- **Neden:** "Çare gökyüzüydü" cümlesinin somut hali: boş bez, havagazıyla bir şehir kaçış aracına dönüşür. Sebep-sonuç: gaz → küre.
- **Okunurluk:** Balon tamamlanınca yüksekliğin ≥%45'i; hortum ve kırışıklar bel-boy planda. Şişme net ≥1.8 sn. Başka hareket (kamera yükselişi) şişme başlarken durur.
- **Foley:** sürekli gaz "fışşş" (−9 dB, şişmeyle birlikte biter), ağ gerilirken 2–3 küçük ip "gıt" (−10 dB), oturma "pof" (−8 dB). Dosya: `pk-gaz-fis.wav`, `pk-kumas-pof.wav`.
- **Kaynak:** §1 malzeme (pamuk, havagazı). Küre/ağ biçimi "genel bilgi": tasarımcı referansla doğrular. Balon kumaşı sarıya çalmamalı (imza rengi, aşağıya bak).

### PK-D3 · P04 · Balast torbası
- **Ne olur:** Sepet kenarında yüzsüz pilot elleri halatı çözer, sepet yerden kopmaya başlar (halat gerilir). Pilot kum torbasını kenardan aşağı bırakır; torba dönerek düşüp kadrajdan çıkar, ardında ince kum izi kalır. Hafifleyen sepet bir an yukarı sıçrar, halat boşalır, balon belirgin hızlanıp yükselir. Rüzgâr çizgileri 1.9'dan sonra başlar.
- **Zaman:** 0.3 halat çözülür · 0.9 torba bırakılır · 1.0–1.9 sıçrama ve yükseliş (dokunuş biter). Haritaya geçiş 2.0.
- **Neden:** Pilot rotaya karışamaz; tek sahip olduğu kumanda yükseklik (kum atmak). Karakteri anlatır: çaresiz ama soğukkanlı; "rüzgârla gider" cümlesinin sahnesi. Karşılık: P11'de yönü yine rüzgâr belirler.
- **Okunurluk:** Bel plan sepet kenarı, torba ~%12. Torba kadrajdan çıkana dek net ≈0.8 sn, sıçrama+yükseliş ≈0.9 sn. Görmediğimiz yere düşen torbanın düşme sesi **yok** (kadraj dışı).
- **Foley:** halat çözülme hışırtı (−8 dB), kum akışı kısa "şşş" (−9 dB), sepet sıçraması ahşap/hasır "gıcır" (−8 dB). Dosya: `pk-halat-coz.wav`, `pk-kum-akis.wav`, `pk-sepet-gicir.wav`.
- **Kaynak:** §5.2 balast ("Niépce balast atıp yükseldi"). Fizik: torba yerden değil havadan düşer, hiçbir şeye gömülmez; sepet zemin dışı olduktan sonra atılır.

### PK-D4 · P05 · Kafes kapağı, güvercin yönünü bulur
- **Ne olur:** Uzakta bırakılan sepet insert: kafes kapağını çıplak yüzsüz el iter, menteşe açılır. Güvercin hemen uçmaz: kafes çıtasında durur, gövdesi iki kez sağa-sola döner (yön arar), üçüncü dönüşte Paris yönüne (haritadaki uçuş yönü ile aynı) kilitlenir, kanat açıp çıkar ve kadrajdan çıkar.
- **Zaman:** 1.5 kapak açılır · 1.9–2.7 yön arama (2 salınım + kilit) · 2.7–3.2 çıkış, kadraj dışı. Plan sonuna 1 sn pay.
- **Neden:** "Güvercin kümesine döner" cümlesinin kanıtı; kuş dönmeyi bilir (P12 "eve dönmeyi bilen güvercin" kurulumu). Sebep-sonuç: kapak → kuş yönelir → uçar.
- **Okunurluk:** Küçük jest = yakın kamera: kafes insert, kuş yüksekliğin ~%30'u (≈580 px), gövde dönüşü ekranda büyük. Yön arama net ≈1 sn. Harita uçuş yönü ile insert çıkış yönü aynı (yönetmen kontrol).
- **Foley:** menteşe kısık "kriik" (−9 dB), tüy/kanat hışırtısı 2 çırpma (−8 dB). Dosya: `pk-kapak-mentese.wav`, `pk-kanat.wav`.
- **Kaynak:** §3 çözüm (kümese döner, genel bilgi). Güvercin rengi/cinsi nötr gri.

### PK-D5 · P06 · Sayfa şeride küçülür, parmakla ölçülür
- **Ne olur:** Ahşap mercekli kutunun önündeki sehpada tam boy sayfa. El mercek kapağını kaldırır, sayfa tek hamlede ince bir ışık hattına çekilip kutuya girer; kutunun yan çekmecesinden kibrit kutusu boyunda bir şerit kayar. El şeridi parmak yanına koyar: şerit parmağın boyunda kalır. (Terazi gag'i senaryodan gelir, dokunuş sayılmaz.)
- **Zaman:** 2.1 kapak kalkar · 2.5–3.1 sayfa kutuya çekilir · 3.3–3.9 çekmece kayar, şerit çıkar · 4.1 parmak yanına konur · 4.3–5.2 ölçü net (dokunuş biter 5.2; plan 5.9).
- **Neden:** Buluşun "vay be" anı: sayfa ↔ parmak boyu karşıtlığı. Sebep-sonuç: kuş taşıyamaz (terazi) → kutu küçültür. "Mucit" demiyoruz: eylemi Dagron'un yöntemi olarak gösteriyoruz.
- **Okunurluk:** Masa yakın; sayfa yüksekliğin ~%22'si; şerit + parmak ~%14 (parmak ≥ 270 px). Küçük jest olduğu için kamera 3.9'da şerit/parmağa push-in. Ekran yazısı (üst bant) dokunuşa binmez.
- **Foley:** kapak "tak" (−8 dB), sayfa çekilmesi kısa kâğıt "fişt" (−8 dB), çekmece sürtünme "sırrt" (−9 dB), şerit masaya "tık" (−7 dB). Dosya: `pk-mercek-tak.wav`, `pk-kagit-fist.wav`, `pk-cekmece.wav`, `pk-serit-tik.wav`.
- **Kaynak:** §1 film boyutu (3–4 cm), §3 yöntem. Fotoğraf işleminin tekniği (kolodyon/jelatin) çelişkili: mekanik **stilize** (ışık hattı), kimyasal adım gösterilmez. Kutu gövdesi genel bilgi, tasarımcı doğrular.

### PK-D6 · P08 · Kılıf kuyruk tüyüne bağlanır
- **Ne olur:** Makro insert: bir el (çıplak, yüzsüz) güvercini sıkmadan tutar, ince kılıfı kuyruk tüyünün altına yerleştirir; diğer elin parmakları ince ipi iki tur sarar ve bir düğümü çeker, ip gerilir. Kılıf tek bir pırıltı verir (imza). El kuşu bırakır; kuş kadrajdan çıkar. Bağlama tamamlandıktan sonra kuş salınır.
- **Zaman:** 0.4–1.5 yerleştirme + sarım · 1.5–1.8 düğüm çekilir · 1.8–2.3 pırıltı + net bağlı kılıf (≈1.3 sn net) · 2.5–3.0 salma ve çıkış (dokunuş sayılmaz). Plan 3.5.
- **Neden:** P01'de kuyrukta gördüğümüz parlak kılıfın hikâyesi; kurulum → karşılık. Elin ağırlığı ve sakinliği emanetin değerini anlatır.
- **Okunurluk:** Küçük jest = yakın kamera: makro insert, kuyruk ve el tam kadraj; kılıf yüksekliğin ≥%12'si (≥230 px), yani gerçek ölçekten büyütülmüş (kuş vücudu kadrajda yarım). Tutulan kuş eli takip eder; tüy yumuşak sarkar.
- **Foley:** ip gerilmesi "çıt" (−9 dB), düğüm çekilişi kısa sürtünme (−9 dB), salma kanat "frt" (−8 dB). Dosya: `pk-ip-gerilme.wav`, `pk-dugum.wav`, `pk-kanat-salma.wav`.
- **Kaynak:** Kuyruk tüyüne bağlama kesin (Çelişki 12). Kılıf ve ip malzemesi kesin değil: kılıf **şekli nötr** (ince silindir, yarı saydam), ip "ince ip". Metal tüp gibi görünmemeli, kaz tüyü kesin de söylenmiyor.

### PK-D7 · P09 · Perdede büyüme ve odak
- **Ne olur:** Karanlık odada huzmede küçük, bulanık bir ışık karesi; memur mercek halkasını çevirir, kare perdeye büyür ve odak oturdukça yatay satırlar netleşir. Bu sürede odadaki diğer her hareket durur (memurlar kalemi bırakmış, başlar perdeye döner). Satırlar netleşince memurlar yazmaya başlar (dokunuş sayılmaz).
- **Zaman:** 2.0 cam levha yerleşir · 2.2–3.3 büyüme + odak · 3.3–3.8 net satırlar. Memurların yazması 3.9'da başlar. Plan 4.5, son kare 4.3'te durur.
- **Neden:** P06 küçülmenin aynadaki karşılığı; küçük film → okunur mesaj. "Neden bu işe yaradı?" sorusunun cevabı ekranda. Göz yönlendirme: perde dışında hareket yok, ışık huzmesi perdeye çizgi.
- **Okunurluk:** Perde yüksekliğin ~%55'i, ≥1 sn net. Satır içeriği **dil-nötr** (yatay çizgi/mikro desen, okunur harf yok), çünkü dil katmanı ayrı.
- **Foley:** cam levha yerleşme "tık" (−8 dB), odak dişlisi kısa "trrr" (−10 dB), lamba "fışş" kısık (−12 dB, ortam). Dosya: `pk-cam-levha.wav`, `pk-odak-disli.wav`.
- **Kaynak:** §3 Paris'te / §5.4 (magic lantern). Gövde ve ışık kaynağı genel bilgi; huzmenin rengi imza rengiyle çakışmamalı (aşağıya bak). Projeksiyon odasının yeri doğrulanamadı: oda nötr.
- **Not:** PK-D5'in bilinçli simetrisi (küçülme ↔ büyüme); mekanizma farklı (kutu/çekmece vs mercek/odak), tekrar sayılmaz.

### PK-D8 · P11 · Rüzgâr çizgiyi 6 kat uzatır
- **Ne olur:** Harita: Paris'ten Tours'a **kesik kurşun kalem çizgisi** (plan) kısa ve sabit durur. Gerçek rota mürekkep çizgisi Paris'ten başlar, rüzgâr çizgilerinin ucunu savurduğu yöne doğru sapar ve uzar; kamera geri çekilirken çizgi her 200 km'lik cetvel adımında bir "tık"la ilerler: 6 tık, çizgi ucu Norveç'e varır. Kesik Tours çizgisi altta küçük kalır.
- **Zaman:** 2.4 mürekkep çizgi başlar · 2.8–4.0 altı tık (≈0.2 sn aralık) · 4.0–4.4 çizgi ucu kar işaretine oturur, durur. Plan 7.9; sonraki kar ve Tours kesmeleri 4.6'dan sonra.
- **Neden:** "Rüzgâr yönetti" kurulumunun (P04) karşılığı: pilot yön veremez. 6 kat farkı sayılan tıklarla ekranda görünür. Katkı: P11 ironisinin merkezi; "Paris'in elinden çıkmıştı" cümlesi bu çizgide görünür.
- **Okunurluk:** Çizgi yüksekliğin ~%60'ı, Tours çizgisi (200 km) ~%13. 6 tık ≥1.2 sn net. Üst bant yazısı çizgi başlangıcına binmez.
- **Foley:** kalem/mürekkep çizgi "ssss" (−10 dB), 6 × cetvel "tık" (−8 dB, artan ton, ayrı örnek). Dosya: `pk-kalem-cizgi.wav`, `pk-cetvel-tik.wav`.
- **Kaynak:** §1 Ville d'Orléans (≈1.200 km vs ≈200 km, orta güven), Norveç/Telemark. **Rota uyarısı:** Tours Paris'in güneybatısında, Norveç kuzeyinde; kaynakta yalnız iniş noktası ve mesafe var, ara rota yok. Çizgi **stilize** (planlanan kesik ≠ gerçek), ara geçiş yerleri (Manş vb.) haritada adlandırılmaz.

## İmza nesnesi önerisi (tekil)
**Kuyruk kılıfı** (güvercinin kuyruk tüyündeki film kılıfı), araştırma §6 aday A. Kancada ilk karede (P01), P08'de bağlanır, P09'da çözülür, P12'de döngüyle döner.
- Renk önerisi: **bal kehribarı yarı saydam (#F0B43C civarı) + ince parlak kenar**, tek pırıltı yıldızı P01/P08'de. Tasarımcı teyit eder.
- Başka hiçbir nesne, kostüm veya ışıkta bu kehribar/altın tonu yok: balon kumaşı sarıya çalmaz (kırık beyaz-gri/krem + ağ), sepet koyu hasır kahve, mektup kâğıdı soğuk krem, film şeridi koyu sepya-gri, magic lantern huzmesi **kireç ışığı beyaz-yeşilimsi** (kehribar değil), alacakaranlık gök lacivert-mor + soluk gül (turuncu yok). Kar buz-mavi beyaz; kırmızı yalnız P11 mühürü (vurgu).
- Pırıltı (ışıltı) her yerde kılıfın kendi üzerinde; ortam parıltısı olarak başka yerde kullanılmaz.

## Kanca / kapanış (sayılmaz, bilgi)
- P01: kılıfın ilk karedeki pırıltısı = imza kurulumu (PK-D6'nın karşılığı). Hareketin ortasında başlar; plan içinde biter (güvercin kümese konmadan kesme).
- P12: sürüklenen bez ve P01'e döngü kesmesi; ayrı dokunuş yok, hareket tamamlanır (güvercin konar).

## Kit / maliyet notları (orkestra için)
- Bölümde yeni şablon parametresi gerekir; kütüphane karşılığı **yok**. Her biri insert/nesne hareketi, karakter oyunculuğu yok (eller yüzsüz siluet). Tahmini iş: PK-D1/D8 HARİTA-GÖK (çizgi çizme, kopma, cetvel tıkı), PK-D2/D3 MONTMARTRE (kumaş-şişme, sepet+torba), PK-D4/D6 DAGRON-INSERT (kuş + el), PK-D5/D7 DAGRON-INSERT (mercek kutusu, perde).
- Bütçe dar kalırsa çıkarma sırası: önce PK-D2 (şişme morfu en pahalı), sonra PK-D4 (kuş gövde dönüşü). PK-D7 bulanıklaştırma + ölçekle ucuz kurulur, son çıkarılır. PK-D1, D3, D5, D6, D8 çekirdek; sayı 6'nın altına inmez.
- Gece planında (P11 kalkış) balon çıkışı dokunuş değil; telgraf kolu yok, Chappe kuralı bu bölümü ilgilendirmez.
