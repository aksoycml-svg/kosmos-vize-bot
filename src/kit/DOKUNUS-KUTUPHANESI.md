# Dokunuş Kütüphanesi

Yaratıcı yönetmen buradan seçer ya da yeni yazar (yeni olan, kit karşılığı yoksa kurulum ekibine not). Kurallar: plan başına ≥1, bölümde tekrar yok, kendi planında başlar–biter, telefonda okunur (≥%10 ekran ya da yakın/insert, ≥1 sn), sesi varsa foley'i atlanmaz.
Durum: **kitte** = mevcut şablon/jest/prop ile kurulabilir · **kısmi** = yaklaşık · **yok** = kurulum gerekir.

| id | ad (Blanc) | şablon | kit karşılığı | temas/ses | durum |
|---|---|---|---|---|---|
| D1 | Baston–fare | SOKAK gece | `insert: {tur: "fare", bas}` (66 kare; Louis çizmesi + baston TAK + fare dalışı + kuyruk tink); geniş planda `baston-vur` jesti | pençe, çizme, TAK, cıyak, dalış, tink | kitte |
| D2 | El–gölge (memurun it-çek'i duvarda T kol gölgesi) | IC-ODA mum | `golgeT {kim, bas, bit, konum}` + `manipulator {kim}` + `it-cek` jesti | 3–4 × makara tik | kitte (K2) |
| D3 | Çorabı kaldıran el (sarkar, uzar, ok ↓) | MASA-INSERT | `corap` prop `durum.sarkma` + `el.tut`; ok ↓ = ekran yazısı | yün "flop" (bırakma) | kısmi — ok grafiği yazıyla |
| D4 | Fazladan çentik + kopya dalgası | KULE-DIS gün | `kuleler[].konum` anahtarları (sırayla `HATA`) + `halo` | klak zinciri (ilki sert) | kitte |
| D5 | Esneme | YAKIN-YUZ (arka KULE-DIS) | `esne` jesti (yakında kocaman `esneme` ağzı), olcek ≥ 3.6 | esneme sesi (ağız tepe karesi), uzak klak | kitte (K2) |
| D6 | Pervaz çentiği ("iki yıl") | IC-ODA bordeaux-cati, push-in | `pervazCentik` (sayı) + `pervazBicak {bas, kare, bit}` (+ `pervazCentikYeni` = kare) | bıçak "kırt" (kare) | kitte (K2) |
| D7 | Eldiven giyme (dosya kapağı aksan) | MASA-INSERT | `eldivenGiy {bas, bit, gerilme}` (parmak parmak, eller ≥ %20); dosya aksanı ayrı planda `dosya.kapak` | eldiven gerilme (+ dosya TOK) | kitte (K2) |
| D8 | Boş kitap + güve | MASA-INSERT | `kitap` `durum.sayfa`, `bos`, `guve` (anahtarlı 0→1) | sayfa çevirme (güve sessiz/çok kısık) | kitte (K2) |
| P13 | T kolu → Wi-Fi (döngülü son) | KULE-DIS gün | `kuleler[].wifi {bas, bit}` | 3 × ahşap "tak" (yay varışları) | kitte (K2) |

## Paris Kuşatması (PK) — 2026-11-11
Senaryo v5 (11 plan) ile hizalı: D1 P02 · D2 P03 · D4 P04 · D5 P05 · D8 P06 · D3 P07 · D6 P09 · D7 P10. Hepsi **yok** (şablonlar yeni: HARİTA-GÖK, MONTMARTRE, DAGRON-INSERT). Ayrıntı: `bolumler/paris-kusatmasi/dokunuslar.md`. Bu bölümde eldiven yok (çıplak yüzsüz el).

| id | ad | şablon | kurulum önerisi | temas/ses | durum |
|---|---|---|---|---|---|
| PK-D1 | Halka kapanır, telgraf teli kopar | HARİTA-GÖK | `halka {bas, kapanis}` + `tel {kopma, uc-kivrim}` | kâğıt tık, tel pınk | yok |
| PK-D2 | Hortumdan şişen kumaş | MONTMARTRE / balon | `balon.sisme {bas, bit}` (kırışık→ağ gerilimi) | gaz fışş, kumaş pof | yok |
| PK-D3 | Balast: Dagron iki kum torbasını atar, sepet sıçrar, balon yükselir (P07; öncesi vurulan balon çöker) | MONTMARTRE sepet | `sepet {balast: 2, sicrama}` + `balon.coker` (kurulum) | kum şşş, sepet gıcır, halat gevşeme, gaz boşalma | yok |
| PK-D4 | Kafes açılır, güvercin yön arar | DAGRON-INSERT kafes | `kafes {kapak, kus.yonAra}` | menteşe kriik, kanat | yok |
| PK-D5 | Sayfa kutuda şeride küçülür, parmakla ölçü | DAGRON-INSERT masa | `fotografKutusu {sayfa→serit}` + `parmakOlcu` | kapak tak, kâğıt fişt, çekmece, şerit tık | yok |
| PK-D6 | Kılıf kuyruk tüyüne bağlanır | DAGRON-INSERT makro | `kus.kuyruk {kilif, ip, dugum, pirilti}` | ip çıt, düğüm, kanat | yok |
| PK-D7 | Filmin perdede büyümesi + odak | DAGRON-INSERT perde | `perde {film, odak, buyume}` (dil-nötr satırlar) | cam tık, odak dişlisi | yok |
| PK-D8 | Ağır sandık sepete konur, sepet çöker, halat gerilir (P06; eski Norveç D8 silindi) | MONTMARTRE sepet | `sepet {yuk: sandik, coke}` + `halat.gerilme` | sandık tok, hasır gıcır, halat gıırt | yok |

## Çiçero (CI) — 2026-11-14
Senaryo (10 plan) ile hizalı: P02 · P03 · P04 · P06 · P07 · P08 · P09. Hepsi **yok** (1940'lar kiti yeni: ELÇİ-ODASI, ARABA, BERLİN, BANKNOT). Ayrıntı: `bolumler/cicero/dokunuslar.md`.

| id | ad | şablon | kurulum önerisi | temas/ses | durum |
|---|---|---|---|---|---|
| CI-D1 | Anahtarı komodine bırakma | ELÇİ-ODASI insert | `kutu.kilit` + `anahtar {komodin}` | kilit tık, metal çın | yok |
| CI-D2 | Mum izi, yarım kalan anahtar çizimi | ELÇİ-ODASI insert | `mum {iz, cizim.yarim}` | mum bası, kalem | yok |
| CI-D3 | Kapı altında ayak gölgesi, su kesilir | ELÇİ-ODASI insert | `kapiAltiIsik {golge, su}` | su kesilir, 3 terlik adımı | yok |
| CI-D4 | Dolu çekmece, sıkışan dosya köşesi | BERLİN | `cekmece {yigin, dosya.atis, kose.sikisma}` | kayma, kâğıt, tok kapanış | yok |
| CI-D5 | Bakmadan sayılan para, iki aynı banknot, kırmızı çarpı | BANKNOT insert | `zarf.ac` + `banknot {dok, say, carpi}` | zarf, kâğıt, fırça | yok |
| CI-D6 | Yetkili bakmadan çay fincanını alır | ELÇİ-ODASI gündüz | `fincan` + `tepsi` + `el.uzat` | fincan tın | yok |
| CI-D7 | Lamba söner, oda kararır | ELÇİ-ODASI | `lamba {son, filaman}` | düğme tık | yok |

## Yarasa bombası (YB) — 2026-11-15
Senaryo v1.1 (12 plan): D1 P03 · D2 P05 · D3 P07 · D4 P08 · D5 P09 · D6 P10 · D7 P11. Kit kuruldu (COL-US, MASA-YB, yarasa rig/sürü, HARITA abd); ilk kurgu render'ında görüldü. Ayrıntı: `bolumler/yarasa-bombasi/dokunuslar.md`.

| id | ad | şablon | kurulum | temas/ses | durum |
|---|---|---|---|---|---|
| YB-D1 | Kalem durur, alev çatıya sıçrar (çizim) | MASA-YB | `alt_sayfa {durak, alev, kirmizi}` + `kalem` | kalem-kagit, kalem-tik | var |
| YB-D2 | Kapsül yapıştırılır | MASA-YB | `nesneler: kapsul-set` | pens-tik, kap-oturma | var |
| YB-D3 | Kanat titrer, baş karanlığa döner | MASA-YB tepsi | `nesneler: tepsi` | kanat-titrek | var |
| YB-D4 | Sürü gölgesi tanktan geçer (defter spiralinin aynası) | COL-US genis | `suru`, `suru_golgesi` | kanat-uzak | var |
| YB-D5 | Tünme dalgası + amber nabız | COL-US tank-alti | `tunek_dalgasi`, `kapsul_nabiz` | tutun-uzak | var |
| YB-D6 | Yarasalar tünekten ayrılır, üç kıvılcım, sonra alev | COL-US | `tunek_dalgasi.birak`, `kivilcim_dizisi`, `alev` | kivilcim-cirt, ates-tutus | var |
| YB-D7 | Mühür iner, başlık açılır | MASA-YB | `nesneler: belge, muhur` | muhur-tok | var |

## Ben-my-Chree (BMC) — 2026-11-15
Metin v5 (10 plan): D1 P02 · D2 P03 · D3 P04 · D4 P05 · D5 P06 · D6 P07 · D7 P08 · D8 P09. Hepsi **yok** (şablonlar yeni: LİMAN, GEMİ-INSERT, KIYI-BATARYA). Ayrıntı: `bolumler/ben-my-chree/dokunuslar.md`.

| id | ad | şablon | kurulum önerisi | temas/ses | durum |
|---|---|---|---|---|---|
| BMC-D1 | Derrick deniz uçağını suya indirir | GEMİ-INSERT kıç | `derrick {ucak.indir, halat.gevsek}` + `ucak {samandira}` | vinç-halat, şamandıra şap | yok |
| BMC-D2 | Çıpa iner, zincir gerilir | GEMİ-INSERT baş | `capa {birak, zincir.gerilme}` | zincir akış, şap, gerilme | yok |
| BMC-D3 | Kaya gölgesinde namlu ucu parlar | KIYI-BATARYA insert | `namlu.parilti {bas, bit}` + push-in | kuru ot, kısık metal tink | yok |
| BMC-D4 | Teğmen namluya iki pat | KIYI-BATARYA yakın | `el.pat {hedef: namlu, sayi: 2}` | avuç-metal pat x2 | yok |
| BMC-D5 | İki su sütunu, üçüncüde sütun yok, hangarda çakım | LİMAN + ön plan top | `atis {sira: 1..3, sutun}` + `hangar.cakim` | top gümleme x3, su sütunu x2, isabet tok | yok |
| BMC-D6 | Kapalı hangar kapısı alevle açılır | GEMİ-INSERT hangar | `hangarKapi {alev, kanat.sallan}` | ateş tutuş, kapı çatırtı, menteşe | yok |
| BMC-D7 | Ölü motor, tutan motor | LİMAN orta | `bot {motor: olu→tutar}` | krank tık, motor tutuş | yok |
| BMC-D8 | Can simidi kancadan çıkar, suya düşer | LİMAN orta-yakın | `simit {kancadan.cik, su}` + gemi `yatis` | simit pat, gövde inleme, kabarcık | yok |

## Yeni dokunuş eklerken
- Satır ekle: id (bölüm-öneki ile, ör. `BL-D1`), şablon, hangi parametre/jest/prop ile kurulur, temas listesi, durum.
- "yok/kısmi" olanlar için kurulum ekibine tek satır iş: hangi şablona hangi parametre.

## Leningrad 7. Senfoni (LS) — 2026-11-15
Senaryo v3.2 (15 plan): D1 P03 · D2 P06 · D3 P07 · D4 P08 · D5 P10 · D6 P12 · D7 P13 · D8 P14. Hepsi **yok** (şablonlar yeni: SALON, BODRUM, SOKAK-LG, CEPHE, HARİTA-LG). Ayrıntı: `bolumler/leningrad-senfoni/dokunuslar.md`.

| id | ad | şablon | kurulum önerisi | temas/ses | durum |
|---|---|---|---|---|---|
| LS-D1 | Müzisyen avucundaki ekmekten düşen kırıntıyı kardan toplar (kış) | SOKAK-LG insert | `avuc {ekmek, kirinti.dus, topla}` | kar sürtme | yok |
| LS-D2 | Çubuklar düşer, yuvarlanır, boş tabureye dayanır | BODRUM-dışı nötr zemin, floor level | `cubuk {dus, yuvarlan, tabure.carpma}` + `tabure` | ahşap tok x2, yuvarlanma, tabure tık | yok |
| LS-D3 | Kapı tam kapanmaz, ışık çizgisi sedyeye uzanır | BODRUM merdiven | `kapi {aralik}` + `huzme {kaynak: kapi}` | menteşe gıcır kısık, kapı tok | yok |
| LS-D4 | Örtü kenarında parmak seğirir + yüzde dolly zoom (bölümde tek) | BODRUM insert + yüz | `el.insert {parmak.segir}` + `kamera.dollyZoom {hedef: yuz}` | kumaş-deri sürtünme x2 | yok |
| LS-D5 | Kalın nota defteri sehpayı yaylandırır | HARİTA-LG → nota sehpası | `sehpa {yuk, yay}` + `defter {sayfa: 252}` | defter tok, sehpa gıcır | yok |
| LS-D6 | Avize ışığı arkadan sahneye dalgalanır, davul kasnağında biter | SALON geniş | `avize {dalga {bas, bit}}` + `kasnak.parilti` | yalnız kısık elektrik ambiyansı | yok |
| LS-D7 | Kadın kovayı yere koyar, su durulur (hoparlör başlayınca) | SOKAK-LG yaz | `kova {birak}` + `su.yuzey {sonum}` | kova tak, su şap kısık | yok |
| LS-D8 | Koltuk değnekli asker ilk ayağa kalkar, ardından salon | SALON orta | `seyirci {kalkis.dalga}` + `degnek` + `rackFocus` | değnek tok, sandalye gıcır x5 | yok |
