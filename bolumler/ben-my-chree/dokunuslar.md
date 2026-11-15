# Dokunuşlar — Ben-my-Chree (yaratıcı yönetmen, 2026-11-15)

Girdi: `onayli-anlatim.md` (v5, kilitli, 10 plan), `arastirma.md`, kullanıcı notları tur-0/tur-3 (Paris çıtası, zengin görsel, kedi/köpek YOK). Kütüphane kontrol edildi: Blanc/PK/CI/YB dokunuşlarının hiçbiri tekrar etmiyor (fare, güvercin, el-gölge, mühür, yarasa vb. yok).
Saniyeler **plan içi** (plan başı = 0.0); mutlak zaman yönetmen sesi ölçünce yazar. Hareket plan sonundan en az 12 kare (60 fps → 0.2 sn) önce biter. Savaş konusu: gösteri yok; riser/whoosh yok; yangın ve su sütunu ölçülü, ceset/yaralı yakın planı yok.
Sayı: **8 dokunuş** (P02–P09; kanca P01 ve kapanış P10 sayılmaz). En zayıf/kesilebilir: BMC-D4 (P05).
Dönem/kaynak ortak notu: gemi boyası, üniforma, Ocak 1917 uçak envanteri, hava, mevzi gizleme **doğrulanamadı** → hepsi nötr; uçak "genel Short tipi" (renk/işaret yok); kamuflaj ağı/çalı örtüsü yok.

## Özet tablo

| id | plan | dokunuş (tek cümle) | plan içi sn | bağlandığı eylem | foley |
|---|---|---|---|---|---|
| BMC-D1 | P02 | Derrick deniz uçağını suya indirir, şamandıralar suya değer, halat gevşer | 0.6–4.4 | "uçak gemisine çevrilmişti" | `bmc-vinc-halat`, `bmc-samandira-sap`, `bmc-halat-gevsek` |
| BMC-D2 | P03 | Çıpa iner, zincir akar, sonra geriler ve gövdeyi bir an çeker | 0.8–3.8 | "demirledi" | `bmc-zincir-akis`, `bmc-capa-sap`, `bmc-zincir-gerilme` |
| BMC-D3 | P04 | Boş kıyıda kaya oyuğunun gölgesinde bir namlu ucu ışığı yakalar | 1.6–4.6 | "toplar gizlice oraya taşınmıştı" | `bmc-metal-tink-kisik`, `bmc-kuru-ot` |
| BMC-D4 | P05 | Genç teğmen namluya iki kez avucuyla pat yapar, sonra eli sabit tutar | 1.0–3.4 | "genç bir teğmendi" | `bmc-avuc-metal-pat` x2 |
| BMC-D5 | P06 | İki su sütunu ve üçüncüde sütun yok: gemide hangar bölgesinde çakım | 0.8–6.0 | "üçüncü mermi isabet etti" | `bmc-top-gum` x3, `bmc-su-sutunu` x2, `bmc-isabet-tok` |
| BMC-D6 | P07 | P02'deki kapalı hangar kapısı içerden alevle itilir, bir kanat menteşede sallanır | 0.8–3.6 | "hangarı yaktı" | `bmc-ates-tutus`, `bmc-kapi-catirti`, `bmc-mentese-gicirti` |
| BMC-D7 | P08 | Mürettebat bir botun motorunu çevirir: ölü; yandaki botun motoru tutar, bot açılır | 0.8–5.2 | "tek botla terk etti" | `bmc-krank-tik`, `bmc-motor-tutus`, `bmc-bot-su` |
| BMC-D8 | P09 | Gemi yatarken korkuluktaki can simidi kancadan çıkar, suya düşer, tek başına kalır | 0.8–3.6 | "limanda battı" | `bmc-simit-pat`, `bmc-govde-inleme`, `bmc-kabarcik` |

Kurulum → karşılık zinciri: P02 derrick + kapalı hangar kapısı + asılı can simidi + üç can botu → P07 (kapı), P08 (botlar), P09 (simit). P03 çıpa zinciri → P07 (gemi dönemiyor, zincir gergin). P05 el/namlu → P06 (aynı namlular ateş eder).

## Plan plan

### P02 — BMC-D1 · Derrick uçağı suya indirir
- **Ne:** Kıçtaki derrick (bumba), iki şamandıralı genel Short tipi deniz uçağını güverteden suya indirir; şamandıralar suya değince halkalar açılır, halat gevşer ve uçak yerine oturur.
- **Sebep-sonuç / karakter:** Yüzsüz bir tayfa vinç koluna asılır, ikinci tayfa halatı yönlendirir; sakin, rutin hareket ("gemi kendini güvende sanıyor"). Anlatım "uçak gemisine çevrilmişti" der; resim bunu gösterir (yolcu vapurunun kıçında uçak asılı).
- **Okunurluk:** İnsert/orta plan, uçak + derrick ekran yüksekliğinin ≥%30'u; net süre ≥3 sn. Plan bitmeden uçak suda durur (0.2 sn pay). Ekran yazısı üst bantta, dokunuş orta bantta (y 520–1150).
- **Kurulum nesneleri (P02 kadrajında görünmeli):** arkada kapalı hangar kapısı (P07'de karşılık), korkulukta asılı **can simidi** (P09), borda üstünde üç can botu (P08).
- **Foley:** `bmc-vinc-halat` (halat/makara gıcırtısı, −9 dB), `bmc-samandira-sap` (şamandıra suya değer, −7 dB), `bmc-halat-gevsek`.
- **Kaynak:** derrick'ler önde/arkada, uçaklar derrick'le suya indirilip alınırdı (EN-BMC, güçlü). Uçak tipi genel; Ocak 1917 envanteri iddia edilmiyor.
- **Katman:** ön plan bulanık makara ve halat; ışık: alçak güneş şamandıra altından suya oynak ışık yansıması, kanat kenarında sıcak kenar ışığı; atmosfer: tuz buharı, su ışıltısı.

### P03 — BMC-D2 · Çıpa iner, zincir gerilir
- **Ne:** Geminin baş tarafında çıpa makaradan kayar, suya çarpar, zincir akar; sonunda zincir gerilir, damlalar fırlar, gövde bir an geri çekilip durur.
- **Sebep-sonuç:** "Demirledi" eylemi; gerili zincir P06–P07'deki "yerinde durdu / yön veremedi"nin kurulumudur. Karakter anlatmaz (nesne dokunuşu); ama gemiyi "oraya bağlanmış" gösterir.
- **Okunurluk:** Baş insert'i, çıpa + zincir ≥%25 ekran yüksekliği, net ≥2.5 sn. Plan akışı önerisi: ada/kıyı geniş → çıpa insert → son 1.5 sn karşı kıyı ve "2 km" (dokunuş bitmiş).
- **Foley:** `bmc-zincir-akis` (zincir makaradan, ekranda büyük: −5 dB), `bmc-capa-sap`, `bmc-zincir-gerilme` (kısa "gıırt-tak").
- **Kaynak:** gemi limanda anakaraya bakan tarafta demirledi (EN-BMC).
- **Katman:** ön plan zincirden damlayan su, halka halka bulanık; ışık: kale taşı sıcak, gölge mavi-mor, su gül-altın; atmosfer: ufuk sisi, karşı kıyıda katmanlı soğuk dağ silueti.

### P04 — BMC-D3 · Gölgeden namlu ucu parlar
- **Ne:** Boş görünen yamaçta kamera yavaşça kaya oyuğuna yaklaşır; gölgede yatan namlu ucu bir an güneş ışığını yakalar (parıltı), hemen gölgeye döner; kamera yerinde durur.
- **Sebep-sonuç:** "Boş görünüyordu / oysa" cümlesinin resmi: göz, boş sahilin içinde gizli olanı tek ışıkla bulur. Çizginin öbür ucu (P01) cevaplanmaya başlar.
- **Okunurluk:** Push-in ile insert ölçeği, namlu ucu ≥%12 ekran; parıltı 1 sn net. Öncesinde 1.5 sn tamamen boş kıyı (karşıtlık için). Küçük jest değil, ışık olayı.
- **Foley:** yalnız kısık `bmc-kuru-ot` (rüzgâr hışırtısı) ve parıltı anında çok kısık `bmc-metal-tink-kisik` (−12 dB); katır sesi yok (görünmüyor).
- **Kaynak:** gizlice menzile sokuldu (EN-BMC), katırla taşıma (Türk özet). Gizleme yöntemi doğrulanamadı → kamuflaj/çalı örtüsü gösterilmez, yalnız kaya gölgesi. Parıltı güneşten değil "metal yüzeyin yansıması"; hava iddiası yok.
- **Katman:** ön plan bulanık kuru ot ve taş, taze katır izi (tekerlek yok); ışık: alçak ışık, parıltı tek parlak nokta; atmosfer: yamaç tozu, uzakta ısı/sis katmanı.

### P05 — BMC-D4 · Teğmen namluya pat yapar (en zayıf; kesilebilir)
- **Ne:** Yakın planda genç teğmenin eli namluya iki kez hafifçe vurur, sonra avucu namluda sabit kalır; kamera elden profil yüzüne kayar.
- **Sebep-sonuç / karakter:** Genç ama sakin; topa hayvan gibi güven verir, titremeyen el P06'da inen kolun kurulumudur ("yarım hareket, yarın karşılık").
- **Okunurluk (küçük jest = yakın):** El + namlu ≥%15 ekran (≥290 px), göğüs/yakın plan; el tek parça siluet (parmak ayrımı, iç dikiş yok). Net ≥1.5 sn. Ekran yazısı üst bantta, el orta-alt bantta.
- **Foley:** `bmc-avuc-metal-pat` x2 (yumuşak, −9 dB), kısık kumaş; arkada görünen katırın soluğu çok kısık.
- **Kaynak:** Ertuğrul'un orada olması tek kaynak (anılar); jest kaynaksız dramatizasyon (açıklamadaki "sahneler dramatizasyondur" kapsar). Üniforma/başlık nötr.
- **Katman:** ön plan bulanık katır kulağı/başı; ışık: yüz ve elde kenar ışığı (gül-altın), gölge mavi-mor; atmosfer: ışık huzmesinde toz.

### P06 — BMC-D5 · İki su sütunu, üçüncüde sütun yok (anahtar)
- **Ne:** Ön planda top namlusu ve geri tepme tozu, arkada demirli gemi. Her atışta ön planda toz; ilk iki mermi gemi yakınında su sütunu kaldırır; üçüncüde su yükselmez, hangar bölgesinde kısa çakım ve ince duman yükselir.
- **Sebep-sonuç:** İzleyici "denize düştü, denize düştü... üçüncü nereye?" merakıyla bekler; yokluk (sütun yok) vuruşu işaret eder. Göz yönlendirme: her atış arasında diğer hareketler durur, ışık gemiye sabit; üçüncüde kamera hangar gövdesine ~%4 yaklaşır, müzik cümlesi açılır (ses kesilmez).
- **Okunurluk:** Su sütunu ≥%25 ekran yüksekliği, her biri ≥1 sn; üçüncü an ≥1.5 sn net hold. Sayaç "1 · 2 · 3" üst bantta; sütun tepeleri y 400'ü geçmeyecek (yazı bandı üstüne binmez).
- **Foley:** `bmc-top-gum` x3 (uzak, bastırılmış, atış karelerinde), `bmc-su-sutunu` x2 (−7 dB), üçüncüde `bmc-isabet-tok` (metal-ahşap kısa, müzik tepelerinin 10 dB altı değil: vuruş yatağın 6–8 dB üstü). Whoosh/riser yok.
- **Kaynak:** ateş geminin gelişinden ~2 saat sonra, üçüncü atış isabet (EN-BMC, orta). İlk iki mermi "denize düştü" onaylı metin. İsabet sayıları (145/110) yok.
- **Katman:** ön plan top + toz bulutu; ışık: sütunlar arkadan gün ışığıyla parlar, gemi hafif gölgede; atmosfer: su damlacıkları, duman, gemi çevresinde halkalar.

### P07 — BMC-D6 · Kapalı hangar kapısı içerden açılır
- **Ne:** P02'de kapalı gördüğümüz hangar kapısı (aynı yer, aynı renk): kenarlarından kızıl ışık sızar, alev dili kapıyı iter, bir kanat menteşede sallanır, öbürü yerinde; duman güverteyi örter.
- **Sebep-sonuç / karakter:** P06 isabeti → hangar yanıyor. Bir yüzsüz tayfa tek adım geri çekilir (korku/şok), kovaya uzanmaz; dökülmeyen su "artık dönemiyor" çaresizliğini taşır.
- **Okunurluk:** Kapı insert ≥%35 ekran, alev parlaması ≥1.5 sn net; hangarın içi gösterilmez (içerik koyu/kor). Ekran yazısı "Hangar arka bacanın gerisindeydi" üstte.
- **Foley:** `bmc-ates-tutus` (pof, −7 dB), `bmc-kapi-catirti`, `bmc-mentese-gicirti` (sallanan kanat), kısık yangın çıtırtısı yatağı.
- **Kaynak:** hangar arka bacanın gerisinde (EN-BMC); yangın ve dümen hasarı kaynaklı. Yangının sebebi (benzin) söylenmez. Kırmızı/turuncu alev yangın vurgusu olarak serbest (gri gemi nötr).
- **"Dönemiyordu" görseli (katman):** kıç suyu pervane köpüğü boşa dönüyor, baş sabit, çıpa zinciri gergin.
- **Katman:** ön plan yükselen kıvılcım/kor ve duman; ışık: yangının turuncu ışığı tek kaynak (gövde ve suda), karşı yönde soğuk mavi; atmosfer: kalın duman sütunu.

### P08 — BMC-D7 · Ölü motor, tutan motor (anahtar)
- **Ne:** Bir tayfa borda botunun motorunu birkaç kez çevirir; motor tutmaz (sessiz, omuz çöker). Yan bota geçer, motor öksürüp tutar, bot gemiden açılır; arkada duman.
- **Sebep-sonuç / karakter:** Kaynaktaki "üç can botundan tek çalışan" bilgisinin görsel hâli; gerilim ve disiplin (acele yok, sıra), ardından "kimse ölmedi"ye geçiş. Yaralı siluetler (sargılı) botta oturur; yüzler görünmez.
- **Okunurluk:** Orta-yakın plan, bot + tayfa ≥%18 ekran, net ≥3 sn; ölü/diri ayrımı ses+hareketle, yalnız görsele bağlı değil. Ekran yazısı üstte (5 yaralı).
- **Foley:** `bmc-krank-tik` (üç sessiz tık, −9 dB), `bmc-motor-tutus` (kısa öksürük sonra pat-pat), `bmc-bot-su`.
- **Kaynak:** ~40 dk sonra, tek çalışır motorlu bot (EN-BMC, orta). Hangi botun ölü olduğu ve çevirme kolu **dramatizasyon**; motor tipi gösterilmez. Su içinde kimse yok.
- **Katman:** ön plan bot küreği/halat ve sargılı el siluet; ışık: duman arkasından süzülen soluk sıcak ışık; atmosfer: duman perdesi, su yansıması.

### P09 — BMC-D8 · Can simidi tek başına kalır
- **Ne:** Gemi sancağa yatarken korkuluktaki (P02'de kurduğumuz) can simidi kancadan çıkar, kısa düşüşle suya oturur, halkalar açılır; simit hafifçe döner ve durur. Gemi sığ suda yarı yatık kalır.
- **Sebep-sonuç / karakter:** Mürettebat kurtuldu; kullanılmayan simit "kimse ölmedi"nin sessiz sesi. Sakin kapanış; savaş gösterisi yok.
- **Okunurluk:** Orta-yakın plan, simit çapı ≥%10 ekran yüksekliği (≥190 px), net ≥1.5 sn; ön plan odak çekmesi gemiden simide kayar (göz yönlendirme). Yatış başlar/biter plan içinde (0.2 sn pay).
- **Foley:** `bmc-govde-inleme` (alçak metal, −9 dB), `bmc-simit-pat` (mantar-ahşap su "pat"), `bmc-kabarcik`. Whoosh/riser yok.
- **Kaynak:** sığ suda sancağa yattı, limanda battı (EN-BMC); "sahile oturtuldu" yok. Batış süresi söylenmez.
- **Katman:** ön plan su yüzeyi + simit; ışık: yan ışık, suda yansıma; atmosfer: sakinleşen duman, gövde çevresinde köpük/yağ halkaları.

## Sayılmayan planlar (katman notu yalnız)
- **P01 (kanca):** Dokunuş yok; senaryodaki gemiden kıyıya çekilen çizgi hook grafiğidir. Ön plan: bulanık kıyı kayası; ışık: alçak gün, suda gül-altın yol, gövdede kenar ışığı; atmosfer: ufuk sisi, deniz ışıltısı.
- **P10 (kapanış):** Dokunuş yok; çizgi/harita döngüsü (kurulum P01, karşılık burada) yönetmen kararı. Ön plan: harita kenarı ya da kıyı taşı; ışık: gün batımı tek ışık; atmosfer: ince sis, durgun su; sığ suda yatan enkaz siluetiyle "1920'de yüzdürüldü" yazısı.

## Kontroller
- Tekrar: fare/kuş/kedi-köpek yok; derrick yalnız P02'de dokunuş, P09'da dokunuş simit (farklı nesne, farklı mekanizma); su halkaları ortak ambiyans, dokunuş sayılmaz.
- Her dokunuş kendi planında başlar ve biter (hareket ≥0.2 sn önce tamamlanır). Foley her birinde var ve yalnız görünen kaynaktan.
- Küçük jest (BMC-D4, BMC-D3 namlu ucu) yakın/insert ölçekte.
- İmza nesnesi: bu bölümde imza nesnesi yok (eldiven vb.); alev turuncu/kızıl yalnız yangın vurgusu, gemi/kıyı palet nötr.
- Yönetmene notlar: P02 kadrajında simit/kapı/botlar görünmeli; P03'te zincirin gerili bitişi; P06 ön planda top tutarlı konum; kontrol_kare önerileri: P02 uçak suya değdiği an, P03 zincir gerildi, P04 parıltı, P05 ikinci pat, P06 üçüncü atış çakımı, P07 kapı açılma tepesi, P08 motor tutuş, P09 simit suya değdi.
