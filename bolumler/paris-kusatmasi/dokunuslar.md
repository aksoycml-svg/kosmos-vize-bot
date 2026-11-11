# Paris Kuşatması — Dokunuşlar (yaratıcı yönetmen, senaryo v5 kullanıcı onaylı)

Girdi: `senaryo.md` v5 (§2 plan tablosu, §9 etki listesi), `arastirma.md`, `src/kit/DOKUNUS-KUTUPHANESI.md`. Kural: CLAUDE.md "Dokunuş" (6–8 dokunuş, kanca/kapanış hariç, her plana zorunlu değil).
**8 dokunuş, 8 planda** (P02–P07, P09, P10). P01 (kanca), P08 ve P11 (kapanış) dokunuşsuz. Kütüphane taraması: Blanc/Evliya satırlarıyla mekanizma ya da nesne olarak örtüşen yok; bölüm içinde de tekrar yok (aşağıda tekrar taraması). **Eldiven yok** (Blanc imzası): bütün eller çıplak, yüzsüz siluet eli.

Zamanlar: plan içi sn (film sn parantezde, senaryo §2 başlangıçlarına göre). Her dokunuş (ve plan eylemi) plan bitiminden ≥0.2 sn (12 kare @60) önce biter. Foley dosyaları henüz yok (`tools/sfx.mjs`, `ses/foley/pk-*.wav`, adlar öneridir). Seviye: anlatım 0 dB, foley −6…−10 dB.

## Kahraman bağı: Dagron'un elleri
Dagron yüzsüz; ekranda **eli** ve **sırtı**. Süreklilik için Dagron'un eli her planda aynı: sade koyu sepya manşet (P05, P06, P07, P09). Paris'teki memur elleri (P10) farklı manşet (gri), karıştırılmaz. Karakter çizgisi: **sakin, titiz, soğukkanlı** (P05 tereddütsüz uzanır, P07 arkasına bakmadan atar, P09 düğümü bir kez çekip dener).

## Özet tablo

| # | Plan | Dokunuş | Plan içi (film) sn | Bağlı eylem | Çekim | Foley |
|---|---|---|---|---|---|---|
| PK-D1 | P02 | Son Prusya işareti halkayı kapatır, telgraf teli kopar, uçlar kıvrılıp durur | 2.0–3.1 (8.5–9.6) | Halkanın kapanması ("kesti") | harita üstten, kopma anında %115 push-in | pk-halka-tik, pk-tel-kopma |
| PK-D2 | P03 | Hortumdan şişen kumaş: kırışıklar açılır, ağ gerilir | 0.2–2.2 (12.7–14.7) | Balonun hazırlanması | boy → bel (balon %45) | pk-gaz-fis, pk-kumas-pof |
| PK-D4 | P04 | Kafes kapağı açılır, güvercin yön arar, Paris yönüne kilitlenip çıkar | 3.0–4.9 (20.9–22.8) | Kuşun bırakılması | kafes insert, kuş %30 | pk-kapak-mentese, pk-kanat |
| PK-D5 | P05 | **Dagron'un fikir anı:** terazide kalkamayan kuşun mektubunu eli kutuya taşır; sayfa şeride küçülür, parmakla ölçülür | 2.8–6.6 (26.1–29.9) | Dagron'un buluşu ("fikri vardı") | masa yakın, sayfa %22, şerit+parmak %14 | pk-kagit-al, pk-mercek-tak, pk-kagit-fist, pk-cekmece, pk-serit-tik |
| PK-D8 | P06 | **Ağır sandık sepete konur, sepet çöker, halat gerilir** (Dagron biner) | 4.0–5.7 (34.4–36.1) | Dagron'un yola çıkışı (kurulum: ağırlık) | meydan boy → sepet bel | pk-sandik-tok, pk-hasir-gicir, pk-halat-gerilme |
| PK-D3 | P07 | **Balast:** Dagron iki kum torbasını atar, sepet sıçrar, balon menzilin üstüne çıkar | 4.4–6.6 (40.8–43.0) | Dagron'un kurtuluşu (doruk) | sepet kenarı bel plan, torba %12 | pk-kum-akis, pk-sepet-gicir, pk-halat-gevse |
| PK-D6 | P09 | **Dagron'un bağlaması:** kılıf kuyruk tüyüne iple bağlanır, düğüm çekilip denenir, tek pırıltı | 0.5–3.4 (48.3–51.2) | Mesajın kuşa verilmesi | makro insert, kuyruk/el tam kadraj | pk-ip-gerilme, pk-dugum, pk-kanat-salma |
| PK-D7 | P10 | Bulanık küçük kare perdeye büyür, odak oturur, satırlar netleşir | 2.0–4.6 (54.1–56.7) | Filmin okunması (karşılık) | perde odaklı boy, perde %55 | pk-cam-levha, pk-odak-disli |

(Sıra: planlara göre D1, D2, D4, D5, D8, D3, D6, D7. id'ler sabit kaldı; PK-D8 artık P06'daki yeni dokunuş.)

## Dokunuşlar

### PK-D1 · P02 · Halka kapanır, tel kopar (değişmedi, saniyeler v5'e hizalı)
- **Ne olur:** Prusya işaretleri halka olup yaklaşır; son işaret son boşluğa oturunca Paris'ten çıkan telgraf teli tam o noktada kopar, uçlar yaylanıp kıvrılır (iç uç Paris'e, dış uç boşluğa), sallanıp durur. Sallanma bitmeden kalabalık dolumu başlamaz (göz bu ana kilitli).
- **Zaman:** 2.0 son işaret oturur · 2.1 kopma ("kesti" vurgusuyla) · 2.1–3.1 uçlar sönümlenir · 3.1 durmuş. Kalabalık dolumu 3.3'te ("iki milyon") başlar, dokunuş sayılmaz.
- **Neden:** Anlatım "kesti" der, izleyici kesmeyi görür. Kapanış = kopuş (sebep-sonuç); kuşatanın soğuk, makine gibi kesinliği.
- **Okunurluk:** Halka yüksekliğin ~%45'i; kopmada kamera %115 push-in; kıvrılan uçlar ≥220 px, tel ≥10 px kalın. Net ≈1.1 sn (+ push-in öncesi yaklaşma).
- **Foley:** son işaret kâğıt "tık" (−8 dB), tel "pınk" (−7 dB), tek ses. `pk-halka-tik.wav`, `pk-tel-kopma.wav`.
- **Kaynak:** §1 kuşatma başlangıcı; stilize harita.

### PK-D2 · P03 · Hortumdan şişen kumaş (değişmedi; en pahalı, ilk çıkarılacak)
- **Ne olur:** Kumaş şeritleri yerde buruşuk yığın; gaz hortumu girer, kumaş kabarır, kırışıklar üstten alta açılır, ağ halatları gerilir, küre tamamlanınca yumuşak "oturma" ile sallanıp durur. Sonra sepet bağlanır, balon çıkar (dokunuş değil).
- **Zaman:** 0.2 hortum gaz verir · 0.2–1.8 şişme · 1.8–2.2 oturma, sönüm. 2.4'te halat çözülür, 3.4'e dek çıkış; "dönmezdi" için rüzgâr çizgisi/geri ok silinişi (yönetmen) 3.4–3.9; yazı yığını planı 3.9–5.2. Plan 5.4 çok dolu: yönetmen sığdıramazsa D2 çıkar.
- **Neden:** Boş bez gazla kaçış aracına dönüşür; ardından "balon dönmezdi" kederini taşır. Sebep-sonuç: gaz → küre.
- **Okunurluk:** Balon yüksekliğin ≥%45'i; şişme net ≥1.6 sn; şişme başlarken kamera hareketi durur.
- **Foley:** gaz "fışş" (−9 dB, şişmeyle biter), 2–3 ağ "gıt" (−10 dB), oturma "pof" (−8 dB). `pk-gaz-fis.wav`, `pk-kumas-pof.wav`.
- **Kaynak:** §1 malzeme (pamuk, havagazı). Balon kumaşı sarıya çalmaz (imza).

### PK-D4 · P04 · Kafes kapağı, güvercin yön arar (saniyeler v5'e göre sıkıştı)
- **Ne olur:** Uzakta inen sepet insert: yüzsüz çıplak el kafes kapağını iter, menteşe açılır. Güvercin hemen uçmaz: çıtada durur, gövdesi bir sağa bir sola döner (yön arar), ikinci dönüşte Paris yönüne (haritadaki uçuş yönü ile aynı) kilitlenir, kanat açıp kadrajdan çıkar. Kuyruğunda **kılıf yok** (P01'in ve P09'un kurulumu için temiz).
- **Zaman:** 3.0 kapak açılır (S2 "uzağa götürdüler") · 3.5–4.5 yön arama (1 salınım + kilit) · 4.5–4.9 çıkış, kadraj dışı. Plan 5.4. Harita uçuş çizgisi 0–2.8 (S1) zaten kuşu kurar.
- **Neden:** "Kümesine döner"in kanıtı; kuş dönmeyi bilir. Kapak → yönelir → uçar.
- **Okunurluk:** Küçük jest = yakın kamera: kafes insert, kuş ~%30 (≈580 px). Yön arama net ≈1.0 sn. Harita ile insert yönü aynı (yönetmen kontrol).
- **Foley:** menteşe kısık "kriik" (−9 dB), 2 çırpma (−8 dB). `pk-kapak-mentese.wav`, `pk-kanat.wav`.
- **Kaynak:** §3 çözüm (genel bilgi). Güvercin nötr gri.

### PK-D5 · P05 · Dagron'un fikir anı: sayfa şeride küçülür, parmakla ölçülür
- **Ne olur:** Plan terazi gag'i ile açılır (0–2.4: bir kefede mektup deste, öbüründe güvercin, kuş kalkamaz; dokunuş sayılmaz). Kesme 2.6: aynı masa. **Dagron'un eli** terazideki kuşun kefesinden değil, **mektup destesinden bir sayfa** alır (tereddütsüz) ve ahşap mercekli kutunun önüne koyar: sebep (kuş taşıyamaz) → sonuç (el çözümü bulmuş gibi doğrudan harekete geçer). Kapağı kaldırır, sayfa tek hamlede ince ışık hattına çekilip kutuya girer; yan çekmeceden kibrit kutusu boyunda şerit kayar. El şeridi parmak yanına koyar: şerit parmak boyunda.
- **Zaman:** 2.8 sayfa alınır · 3.4 kapak kalkar (S2 "fikri vardı") · 3.6–4.1 sayfa çekilir · 4.2–4.8 çekmece, şerit çıkar · 5.0 parmak yanına · 5.2–6.6 ölçü net (dokunuş biter; plan 7.1). 4.9'da şerit/parmağa push-in.
- **Neden:** Dagron'un "vay be" anı; sayfa ↔ parmak boyu karşıtlığı, hook'un "kuyruğa sığdırdı" sorusunun ilk cevabı. Karakter: kararlı, hızlı, sakin.
- **Okunurluk:** Sayfa ~%22, şerit+parmak ~%14 (parmak ≥270 px); küçük jest olduğu için push-in. Ekran yazısı (üst bant) dokunuşa binmez. Net ≈1.4 sn. Terazi bölümünde hareket yok ya da dokunuşa dek durur.
- **Foley:** sayfa alma kâğıt "hışt" (−9 dB), kapak "tak" (−8 dB), çekilme "fişt" (−8 dB), çekmece "sırrt" (−9 dB), şerit "tık" (−7 dB). `pk-kagit-al.wav`, `pk-mercek-tak.wav`, `pk-kagit-fist.wav`, `pk-cekmece.wav`, `pk-serit-tik.wav`.
- **Kaynak:** §1 film boyutu 3–4 cm. Kimyasal adım gösterilmez (stilize ışık hattı). Kutu gövdesi genel bilgi, tasarımcı doğrular.

### PK-D8 · P06 · Ağır sandık sepete konur, sepet çöker (YENİ, eski D8 Norveç yerine)
- **Ne olur:** Meydan, gün ışığı. İki yüzsüz siluet en ağır alet sandığını sepete indirir; sandık oturunca **sepet hasırı sıkışıp bir parmak çöker**, üstteki balon küresi halatta geri eğilir, sallanıp durur. Dagron (sırtı dönük, sepya manşet) sandığın yanına biner; sepet bir daha hafif çöker, halat gerilir (yukarı çeken kuvvet belli olur).
- **Zaman:** 3.7 kesme (Tours haritasından meydana, S2 "Tek yol balondu" ≈3.9) · 4.0 sandık oturur · 4.0–4.9 çökme + sallanma sönümü · 4.7–5.3 Dagron biner · 5.3–5.7 halat gerilir, durur. Plan 6.0. Süre dar (meydanda yalnız 2.1 sn): sığmazsa D8 çıkar (7 dokunuş, aralık içinde).
- **Neden:** Kurulum → karşılık: ağırlık görünür olur ("~600 KİLO EKİPMAN" ekranı P07'de), P07'de Dagron'un kum atması bu yüzden gerekir. Karakter: işini ağır sandığıyla götüren, ekipmanı bırakmayan adam. Sebep-sonuç: sandık → sepet çöker → balonun kaldırması gerekecek.
- **Okunurluk:** Sepet + sandık yüksekliğin ~%35'i; çökme ≥%3 sepet yüksekliği değil, hasırın görünür sıkışması (yakın bel plan). Net ≈1.7 sn. Ekran yazısı (üst bant) sepete binmez.
- **Foley:** sandık "tok" (−7 dB), hasır "gıcır" (−9 dB), halat gerilmesi "gıırt" (−9 dB). `pk-sandik-tok.wav`, `pk-hasir-gicir.wav`, `pk-halat-gerilme.wav`.
- **Fizik:** sepet zeminde, ayaklar (siluetler) zemine basar; sandık havadan iner, zemine değmez; halat sepetten balon ağına gider.
- **Kaynak:** ~600 kg ekipman §1 (Dagron'un çıkışı, ekranda); sandık/sepet biçimi genel bilgi.

### PK-D3 · P07 · Balast: Dagron kum atar, balon yükselir (P04'ten taşındı, doruk)
- **Önce (kurulum, dokunuş sayılmaz):** 0–2.8 iki balon yan yana yükselir; 2.8 yerden duman çizgisi; 3.1–3.9 vurulan balonun küresi **ani çöker** (gaz boşalır), sepet kadraj dışına düşer (düşenin sesi yok; yalnız küre boşalırken kısık "fışş", −12 dB). Ateş sesi yok (kaynak görünmüyor), en çok kısık uzak tek "pat" (ortam, −14 dB).
- **Ne olur (dokunuş):** Sepet kenarı bel plan. **Dagron'un eli** (sepya manşet) kum torbasını kenardan bırakır, **ardından bakmadan** ikincisini; torbalar dönerek düşüp kadrajdan çıkar, ardında ince kum izi. Sepet hafifleyip bir an sıçrar, halat boşalır, balon belirgin hızlanır, üstte ateş menzilinin çizgisini geçer (yer küçülür).
- **Zaman:** 4.4 birinci torba (S2 "kum torbalarını") · 4.9 ikinci torba · 5.0–5.5 sıçrama · 5.5–6.6 yükseliş ("yükseldi" ≈6.4), biter. Plan 7.1. Kamera sepetten yukarı çıkar yalnız 5.5'ten sonra.
- **Neden:** Hikâyenin doruğu; kurtulma Dagron'un kendi eylemiyle olur. Karakter: soğukkanlı, öteki balona bakmadan işini yapar (soğukluğu değil kararlılığı). Karşılık: P06 sandığı ağırlığı kurmuştu (D8) → P07 hafifletme. P01 "çıkmalıydı" gerilimi burada çözülür.
- **Okunurluk:** Torba ~%12; sıçrama+yükseliş net ≈1.8 sn; çöküş anında başka hareket yok, göz oraya kilitli. Torba düşüşü görmediğimiz yerde biter, sesi yok.
- **Foley:** kum akışı "şşş" (−9 dB, 2 kez), sepet sıçrama hasır "gıcır" (−8 dB), halat gevşeme hışırtı (−10 dB). `pk-kum-akis.wav`, `pk-sepet-gicir.wav`, `pk-halat-gevse.wav`; çöküş için `pk-gaz-bosal.wav` (−12 dB).
- **Fizik:** torba sepet kenarından havaya bırakılır, hiçbir şeye gömülmez; çöken balon ve sepet kadraj dışına çıkar (hareket tamamlanır = kadrajdan çıkar). Gün ışığı, sabah.
- **Kaynak:** §1 Balonlara ateş; §5.2 Balast (Niépce, orta-yüksek). Neyle vurulduğu gösterilmez (yalnız duman çizgisi, düşük güven).

### PK-D6 · P09 · Dagron'un bağlaması: kılıf kuyruk tüyüne (saniyeler v5'e hizalı, Dagron'a bağlı)
- **Ne olur:** Tours masası, mektup yığını **şerit yığını** olarak zaten masada (kutu/küçülme tekrar gösterilmez: D5 ile çakışmasın). Makro insert: Dagron'un eli (sepya manşet) güvercini sıkmadan tutar, ince kılıfı kuyruk tüyünün altına yerleştirir; diğer elin parmakları ince ipi iki tur sarar, düğümü çeker, **bir kez çekip dener** (titizlik), ip gerilir. Kılıf tek bir pırıltı verir (imza; P01 karşılığı). El kuşu bırakır, kuş kadrajdan çıkar.
- **Zaman:** 0.5–1.4 yerleştirme + sarım · 1.5 düğüm · 1.7–2.1 deneme çekişi · 2.2–3.4 pırıltı + net bağlı kılıf (≈1.2 sn net) · 3.4–3.9 salma ve çıkış. Plan 4.3.
- **Neden:** P01'deki kılıfın hikâyesi, kurulum → karşılık. Elin ağırlığı ve titizliği emanetin değerini anlatır (etiket "titiz, sakin"). Sebep-sonuç: yük ancak küçüldüğü için kuyruğa bağlanabilir (P05).
- **Okunurluk:** Küçük jest = yakın kamera: makro insert, kılıf ≥%12 (≥230 px), gerçek ölçekten büyütülmüş. Tutulan kuş eli takip eder, tüy yumuşak sarkar.
- **Foley:** ip gerilmesi "çıt" (−9 dB), düğüm sürtünmesi (−9 dB), salma kanat "frt" (−8 dB). `pk-ip-gerilme.wav`, `pk-dugum.wav`, `pk-kanat-salma.wav`.
- **Kaynak:** Kuyruk tüyüne bağlama kesin (Çelişki 12); kılıf şekli nötr (ince yarı saydam silindir), ip "ince ip".

### PK-D7 · P10 · Filmin perdede büyümesi ve odak (karşılık)
- **Önce (plan eylemi):** 0–1.7 Paris çatısında kümes ağzı, güvercin konar, el kılıfı çözer (ip "çıt", film şeridi görünür; P09'un karşılığı); 1.7 kesme karanlık odaya.
- **Ne olur (dokunuş):** Huzmede küçük bulanık ışık karesi; memur mercek halkasını çevirir, kare perdeye büyür, odak oturdukça satırlar netleşir. Bu sürede odadaki diğer her hareket durur (memurlar kalemi bırakmış, başlar perdeye dönük). Satırlar netleşince memurlar yazmaya başlar (S3 "okudu", dokunuş sayılmaz).
- **Zaman:** 2.0 cam levha yerleşir · 2.2–3.9 büyüme + odak ("büyüdü" ≈3.5) · 3.9–4.6 net satırlar (dokunuş biter). Memurlar yazmaya 4.9'da, zarf/okuma 5.0–6.2. Plan 6.5.
- **Neden:** P05 küçülmenin aynadaki karşılığı: parmak boyundaki sayfa **yeniden büyüdü**. Dagron'un fikri sonucuna ulaşır; Dagron ekranda yok ama eseri var. Duygusal doruk "Paris mektuplarını okudu"ya hazırlık.
- **Okunurluk:** Perde yüksekliğin ~%55'i, net ≥1.0 sn. Satırlar **dil-nötr** (çizgi/mikro desen, okunur harf yok). Perde dışında hareket yok, huzme perdeye çizgi çeker.
- **Foley:** kılıf çözme ip "çıt" (−10 dB), cam levha "tık" (−8 dB), odak dişlisi "trrr" (−10 dB), lamba "fışş" kısık (−12 dB, ortam). `pk-kilif-coz.wav`, `pk-cam-levha.wav`, `pk-odak-disli.wav`.
- **Kaynak:** §3 Paris'te / §5.4 (magic lantern). Huzme rengi kireç ışığı beyaz-yeşilimsi (kehribar değil). Oda yeri nötr.
- **Not:** PK-D5'in bilinçli simetrisi; mekanizma farklı (kutu/çekmece vs mercek/odak), tekrar sayılmaz.

## Tekrar taraması (bölüm içi ve kütüphane)
| Mekanizma | Planlar | Sonuç |
|---|---|---|
| Hat/çizgi kopması–çizilmesi | D1 tel (P02) | Tek: haritadaki başka çizgiler (P03 iz, P04 uçuş, P08 kaçış) dokunuş sayılmaz, sade çizim. |
| Balon/sepet | D2 şişme (P03), D8 sandık-çökme (P06), D3 balast (P07) | Üç farklı eylem (şişme · yük · atma), üçü de ayrı sebep-sonuç; D2 ilk çıkan. |
| Kuş | D4 yön arama (P04), D6 bağlama (P09) | Farklı eylem (gövde dönüşü · bağlama); P10 kılıf çözme plan eylemi. |
| Film/sayfa | D5 küçülme (P05), D7 büyüme (P10) | Bilinçli ayna, mekanizma farklı. P09 şerit yığını küçülmeyi **tekrar etmez**. |
| El jesti | D5 sayfa-parmak, D6 düğüm-deneme | Farklı nesne/jest. |
| Blanc/Evliya kütüphanesi (fare, T kol gölgesi, çorap, çentik, esneme, pervaz, eldiven, kitap+güve, Wi-Fi) | — | Çakışma yok. |

## İmza nesnesi (tekil, değişmedi)
**Kuyruk kılıfı:** P01 ilk karede (kurulum, pırıltı), P05 (film kenarı bal ışığı verir, kılıfı müjdeler), P09 (bağlama, ana pırıltı), P10 (kılıf çözülür, film çıkar), P11 (son kare = P01).
- Bal kehribarı yarı saydam (#F0B43C civarı) + ince parlak kenar; tasarımcı teyit eder.
- Başka hiçbir nesnede kehribar/altın yok: balon kumaşı kırık beyaz-gri/krem, sepet koyu hasır kahve, mektup kâğıdı soğuk krem, film şeridi koyu sepya-gri, **Dagron manşeti koyu sepya (kehribar değil)**, lantern huzmesi kireç beyaz-yeşilimsi, alacakaranlık lacivert-mor + soluk gül (turuncu yok), vurulan balonun alevi/dumanı gri-kül (turuncu alev gösterilmez, yalnız duman çizgisi). Kırmızı yalnız mühür/vurgu.
- Pırıltı yalnız kılıfın kendi üzerinde.

## Kanca / kapanış (dokunuş sayılmaz)
- P01: kılıf pırıltısı = imza kurulumu; hareket tamamlanır (kuş kadrajdan çıkar).
- P11: çizgilerin sönmesi ve film yağmuru ayrı dokunuş değil; son kare P01'e eşleşir, güvercin konar (tamamlanır).
- P08: yalnız çizim (balon iner, çizgi Tours'a uzanır); dokunuşsuz, kısa (4.3 sn).

## Kit / maliyet notları
- Tümü yeni şablon parametresi (kütüphane karşılığı yok). Hepsi insert/nesne hareketi; karakter oyunculuğu yok, eller yüzsüz. HARİTA-GÖK: D1. MONTMARTRE: D2, D8, D3. DAGRON-INSERT: D4, D5, D6, D7.
- Bütçe dar kalırsa çıkarma sırası: **D2** (şişme morfu en pahalı) → **D8** (süre zaten dar) → D4 (gövde dönüşü). Çekirdek: D1, D3 (doruk), D5, D6, D7; sayı 6'nın altına inmez.
- D3 çöküş (vurulan balon) ayrı dokunuş değil, D3'ün kurulumu; kit karşılığı `balon.coker` yalnız küre sönümü + sepet düşüşü.
- Gece planı yok; Chappe/telgraf kolu kuralı bu bölümü ilgilendirmez.
