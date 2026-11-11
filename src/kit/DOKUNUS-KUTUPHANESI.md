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

## Yeni dokunuş eklerken
- Satır ekle: id (bölüm-öneki ile, ör. `BL-D1`), şablon, hangi parametre/jest/prop ile kurulur, temas listesi, durum.
- "yok/kısmi" olanlar için kurulum ekibine tek satır iş: hangi şablona hangi parametre.
