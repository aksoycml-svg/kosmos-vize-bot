# Evliya Uçuşları · Mekân Şartnamesi (kurulum ekibi, adım 5b)

Hazırlayan: mekân sorumlusu · 2026-11-08 · Girdi: `tasarim.md` v1.1 (palet ve ışık bağlayıcı), `arastirma.md` §5 ve §10, `sahne-plani.md` §1 ve §6.1, `bolum.json` (kamera değerleri). Kod yalnızca okundu: `src/kit/sablonlar/KuleDis.tsx`, `src/doku/{Kemer,Tarama,Isik,TasDuvar,ArsivKatmani,sabitler}`.
Bu belge **şartnamedir, kod değildir.** Bütün sayılar motion içindir. Motion bunlarla `src/kit/sablonlar/` altında 4 şablon kurar.

> **R1 (2026-11-08, K1 eleştirisi):**
> - Köşk siluetinde cami okunması giderildi: örtü kesik kırma piramit + saçak, bacalar küt ve düz başlıklı, platonun altında; 360 px imzası ve yasak benzerlik tablosu §1.1a'da (O1).
> - Pencere halesi kaldırıldı, yerine yalnız alta düşen 2 basamaklı havuz geldi (§1.2a, S2).
> - Gece kroması: C\* hedefleri §6a'da, ArsivKatmani gece derecelendirmesi §8'de (O5).
> - Hex hedefleri değişmedi.
>
> **R3 (2026-11-08, K4 + K5 hazırlığı):** P12 zemin hesabı düzeltildi (§1.6a; 1612 < 1920, zemin görünüyordu). Pencere ↔ kapı ayrışma imzası eklendi (§1.6b). GALATA-TEPE K1–K4 derslerine göre gözden geçirildi (§2.4a): `gunduzMineral`, kroma hedefleri, yasak benzerlikler (deniz feneri, roket), külah saçağı %10, P08 p36–52 taş alt bantta → cy ≤ −41.
>
> **R2 (2026-11-08, K3/K4):** gündüz yansıması yeniden tarif edildi (§1.3a, V8). Motion'ın iki sorusu cevaplandı (§1.3b: eksen asimetrisi kasıtlı; P02 cs 0.97 + grup onaylandı, sağ ucu ≤ 148). P12 kartı gözden geçirildi (§1.6): etkin yarık formülü düzeltildi, havadaki huzme yalnız kenar çizgisi olacak.

Etiketler: **[A]** arastirma.md · **[A10]** arastirma.md §10 (yalnızca arama özeti) · **[S]** sahne-plani/senaryo · **[G]** genel bilgi, kaynağı yok, **doğrulanmalı** · **[T]** tasarım kararı (tarihî iddia değil). Kanıtsız ayrıntı **nötr** kalır.

---

## 0. Ortak sistem (dört şablonun hepsinde aynı)

### 0.1 Koordinat ve kamera
- Dekor px, kamerasız 1080x1920 taban. Ekran konumu: `ekran = (d − 540|960)·cs + 540|960 + (cx|cy)·f` (KuleDis `kat(f)` ile aynı).
- **Tilt, pan ve zoom kameranın kendi dönüşü sayılır, bu yüzden parallaks yoktur:** bütün katmanlarda f = 1. P01'deki tilt, P09'daki pan ve bütün push-in'ler bu türdendir.
- **Tek istisna P08'deki vinç inişidir** (kamera kule boyunca aşağı iner). Bu planda arka katmanlar f < 1 alır (§2.4).
- Ölçek dili **px/m (dekor, cs 1)** ile verilir. Her figür ve her yapı kendi derinliğindeki px/m değerine uyar (ufuk–ölçek kuralı). Görünüm başına ufuk y değeri ve kamera göz yüksekliği yazılıdır.

### 0.2 Mesafeye göre ayrıntı (sınıf yerel px/m ile belirlenir)
| Sınıf | px/m (dekor) | Kontur | Doku | Tarama | Süsleme |
|---|---|---|---|---|---|
| yakın | ≥ 150 | 6 px | blok + derz, kurşun dikiş, tahta | II/III, yalnız §0.5'teki yerlerde | imza ayrıntı + söve |
| orta | 40–150 | 4 px | yalnız ana sıra çizgileri | II, yalnız kemer içi ve saçak altı | yalnız imza |
| uzak | < 40 | 3 px ya da yok | yok, düz ton | yok | yok, tek siluet |
Ekranda kontur ≈ dekor × cs, en çok 8 px. 360 px telefonda 0.5 px'in altına inen çizgi çizilmez (`tasarim.md` §0.4).

### 0.3 Doku katmanları: yüzey başına en fazla 3
1. **Taban deseni:** taş bloğu ve derz, tahta çizgisi ya da dalga çizgisi.
2. **Tarama:** `Tarama.tsx`, yalnızca §0.5'te sayılan yerlerde.
3. **Kâğıt lifi ve gren:** `ArsivKatmani` (gündüz lif .18 / gren .08, gece .13 / .12). Kanalda ortak katmandır.

- **TasDuvar'ın (b) bulutlanma/gözenek katmanı bu bölümde kapalı.** Minyatür düz alan kuralı geçerli (`tasarim.md` §0.2): bir yüzeyde en çok 2 ton basamağı olur, yumuşak gradyan kullanılmaz.
- `KonturTitreme` bir doku katmanı sayılmaz. Değerleri: uzak 1.2, orta 2.0, yakın 2.6, insert 3.0.
- **Seed sabit** (doku kaynamaz). Önerilen `DOKU_SEED` ekleri: `sarayburnu: 131`, `galata: 137`, `bogaz: 139`, `kitap: 149`.

### 0.4 Kemer sözlüğü (öğe başına tip açık)
| Öğe | Tip | Geometri |
|---|---|---|
| Köşk çifte kemer, çeşme nişi | **`osmanli` (YENİ tip)**: iki merkezli, basık-sivri | Merkezler üzengi hattında, ortadan ±0.134 W. R = 0.634 W, yükselti 0.62 W. Mevcut `sivri` (eşkenar, 0.87 W, gotik) **kullanılmaz**: lanset/gotik okunur. [G: klasik Osmanlı kemer tipi; köşk için doğrulanmadı] |
| Köşk pencereleri (ana kat + cumba) | `duz` (lento) | Dikdörtgen, söve 0.10 m. Alınlık ve kemerli tepe penceresi yok (kanıtsız, nötr) |
| Galata tepe katı açıklıkları | `yarimDaire` | Yükselti 0.5 W. [G, **doğrulanmalı**: Matrakçı 1537 "yaklaşık sekiz kemerli açıklık" der [A], kemer tipini vermez. Köşkün `osmanli` tipinden ayrışması için seçildi] |
| P12 iç kapı | `duz` | Lento, söve 0.08 m |
Kural: kemerin ekrandaki biçimi `kemerEgri` ile **metreden** hesaplanır, sonra px/m ile ölçeklenir. Elle sivriltme yapılmaz.

### 0.5 Tarama nerede (ışık mimariyi anlatıyorsa)
- **Sadece şu yerlerde:** kemer içi, saçak altı (soffit), pencere ve kapı sövesinin gölge tarafı, baca gölge yüzü, Galata korniş altı, gölge sınırı (terminatör) bandı (60 px).
- **Taranmaz:** gök, su, rıhtım döşemesi, geniş duvar gölgesi (düz koyu ton olur), sayfa, rahle.
- Çapraz tarama (IV) yalnızca ekran kutusu 120 px'ten küçük derin gölgede kullanılır, örneğin çeşme nişinin dibinde. Büyük kemer içi III + koyu ton bloğu alır.
- Açı θ = anahtar ışığın ekrandaki yönüne dik (`taramaAcisi`). Sahne başına tek θ. Renk `ink(dolgu)`.
- **Gece köşk cephesinde tarama yok:** cephe düz iki tonla okunur, ışık yalnız pencere havuzundan gelir.

### 0.6 Işık sözleşmesi (tek kaynak → havuz + gölge + tarama açısı)
| Görünüm | Anahtar (gölge veren TEK kaynak) | İkincil (gölge vermez) | `Isik` tanımı |
|---|---|---|---|
| kıyı gece (P01 A, P03–P06) | **meşale** (yardımcı 1'in elinde) | köşk penceresi (uzak; yalnız kendi havuzu ve su kolonu) · şenlik (gökte α .12 parlama, suda kesik şerit) | `nokta`: `zemin` = meşale x'inin o derinlikteki rıhtım y'si; `yukseklik` = alev − zemin (ekran px); havuz rx 380, ry 95, α .35 |
| kıyı gece, püskürme (P05 p56–198, P01 p40–150) | **püskürme ağzı** (demet tabanı x 520, y 1330, yükseklik 60 px) | meşale (6 karede gölge payını devreder) | `nokta`, havuz rx 520, ry 130, `#f0a040` α .3 |
| köşk gece (P02) | **cumba orta penceresi** (içten) | şenlik | `nokta` (pencere altı, rıhtım), havuz `#f2c070` α .2 |
| insert gece (P07) | köşk penceresi, sağ-üst, kadraj dışı | — | `nokta` zemin (1250, 900), yükseklik 1100 → gölgeler **sola** |
| GÜNDÜZ hepsi | **güneş** azimut 65° (ENE), yükseklik 15° [T, kullanıcı onaylı]. Gölge boyu = 3.73 × yükseklik | gök dolgusu (tonla, gölgesiz) | `yonlu`, `yon` görünüm başına aşağıda (kamera yönünden türetildi) |

Gündüz kamera yönleri ve gölge vektörleri (tek tanımdan türetildi, motion kalibrasyonda ±%15 ayarlar):
| Görünüm | Kamera yönü | Güneş kadrajda | `yon` (zemin, px / px yükseklik) | Sonuç |
|---|---|---|---|---|
| GALATA-TEPE (P01 B, P08) | 20° (KKD) | 45° sağda, ileride (kadraj dışı) | (−2.64, +1.09) | yan-kontra; kameraya bakan yüzler gölgede, sağ kenar ışıklı |
| BOGAZ (P09) | 0° (K) | 65° sağda (kadraj dışı) | (−3.4, +0.3) | Galata'nın sağ yüzleri ışıklı; Üsküdar kontra, düz ton |
| köşk gün (P10) | 235° (BGB, cepheye bakar) | kameranın arkasında, 10° sağda | (−0.97, −0.15) | önden ışık; kemer içi ve saçak altı koyu |
| insert gün (P11) | 155° (GGD, rıhtım boyunca) | tam solda (90°) | (+3.7, −0.15) | ışık soldan, gölge **sağa**. P07'de ışık sağdan geliyordu, burada ters döner: ayna ters sonu ışıkla da güçlendirir (fiziksel sonuç, ek iş değil) |
| iç (P12) | 35°, pencere duvarına 30° eğik | pencere arkasında, sağ-üst | huzme yönü (−0.83, +0.56) | §1.6 |
| kitap (P13–P14) | dik tepeden | üst-sol | (+0.4, +0.5) | `tasarim.md` §1.4 |

### 0.7 İstanbul imzası: karar ve gerekçe
- **Karar:** şehir imzası **yalnızca kanıtlı iki yapı** üzerinden kurulur.
  - **Galata Kulesi:** taş gövde, kurşun külah, kemerli tepe katı [A §5.1]. Gündüzün ana imzasıdır, P01 p176'dan itibaren görünür.
  - **Sinan Paşa (İncili) Köşkü:** çifte kemer, cumba, kurşun örtü, 4 baca, sur üstünde [A §5.2]. Gecenin imzasıdır. 360 px'te cami okunmaması için siluet kuralları §1.1a'da (K1 O1).
  - Yanlarına Boğaz'ın iki kıyısı (Asya kıyısı tepe silueti) ve saray bahçesi ağaç kütlesi eklenir [A §5.2 "ağaçlı bahçe"].
- **Kubbe + minare silueti (Ayasofya, Süleymaniye, Sultan Ahmed) çizilmez.**
  - (1) `arastirma.md` bunları doğrulamıyor.
  - (2) Seçilen kamera yönlerinde tarihî yarımada kadraj dışında kalıyor: BOGAZ ve GALATA kuzeye bakar, yarımada kameranın arkasındadır. Kıyı ve köşk görünümünde yarımada sağdaki Topkapı sırtı ve ağaçların arkasında kalır.
  - Uydurma siluet "yanlış yer" okunur.
- **P01 A ilk karesinde İstanbul'u ne okutuyor:**
  - Osmanlı kıyı köşkü silueti: su üstünde iki koyu kemer ağzı, boydan boya koyu saçak çizgisi, tek ışıklı pencere, alçak düz kenarlı örtü.
  - Sarık ve kostüm.
  - Deniz ve karşı kıyı.
  - Şehir adını anlatım ve ekran yazısı taşır.
  - Galata Kulesi 2.9. saniyede gelir.
  - Ses kapalıyken "İstanbul" sözcüğü siluetten çok "Osmanlı kıyı sarayı" olarak okunur. Bu bilinçli bir kabul (bkz. açık soru 1).

---

## 1. KE-S1 SARAYBURNU (P01 A, P02–P07, P10–P12)

### 1.1 Mimari kart: Sinan Paşa (İncili) Köşkü
| Madde | Değer |
|---|---|
| Dönem ve üslup | 1589–91, mimar Dâvud Ağa; 17.–18. yy.'da ayakta ve gösterişli [A §5.2]. Klasik Osmanlı sahil kasrı [G] |
| Yapı tipi | Saray sahil köşkü. Topkapı'nın en dış sınırında, **Bizans Marmara surlarının üstünde**, kesme taş kemerli altyapı üzerinde [A] |
| Kat düzeni (ölçüler [T], kaynak boyut vermiyor) | Rıhtım deniz seviyesinden 1.0 m yüksek · **altyapı 5.0 m** (kesme taş, çifte kemer + çeşme) · **ana kat 5.0 m** (dikdörtgen taş gövde) · **örtü 2.4 m** (kesik kırma piramit, saçaklı) · bacaların tepesi korniş üstüne +1.6 m, **örtü platosunun altında**. Gövde **11.1 m** genişlik |
| Açıklıklar | Altyapı: **denize bakan çifte kemer** [A], tip `osmanli` (§0.4); her biri açıklık 2.8 m, yükseklik 4.0 m, iki kemerin arasında **çeşme** [A]. Çeşme: `osmanli` niş 0.8 × 1.5 m + taş tekne (yalak) çıkıntısı 0.15 m. Lüle ve kitabe yok (yazı yok, kanıtsız). Ana kat: 4 dikdörtgen pencere `duz`, 1.0 × 1.6 m; çoğu cumbanın arkasında kalır. Cam ve kafes çizilmez, iç taraf koyudur (nötr [A10 §10]) |
| Cumba | **Önde geniş saçaklı, ahşap çatılı cumba** [A]: ana kat hizasında, 5.6 m genişlik, 1.5 m dışarı taşar. Alt kenarı tek kalın taşıyıcı kirişle biter (konsol biçimi kanıtsız, süs yok). Cephede **3 dikdörtgen pencere** (1.0 × 1.4 m, `duz`), aralarında ahşap dikme. Saçak 1.2 m taşar. Orta pencere = padişah penceresi |
| Örtü (R1, K1 O1) | TDV "kubbe" der, gravür piramit gösterir, Eldem ahşap çatı der [A]. **Karar: kubbe DEĞİL, kesik kırma piramit** (gravür yönü). Taban = gövde + her yanda **0.6 m saçak taşması** (12.3 m); **kenarlar düz**, eğri yok; tepede **düz plato** 3.0 m (sivri tepe ve alem yok); yükseklik 2.4 m (önceki kartla aynı yükseklik, eğim ≈ 27°). Saçak çizgisi, kubbede olmayan ve "çatı" okutan öğedir. Renk kurşun gri `#7c8288` [G]. Görünürlük: kıyı görünümünde (85 m, kamera alçak, bakış açısı ≈ 6°) yüzeyi görünür; köşk görünümünde (17.5 m, bakış ≈ 28.5° > eğim 27°) **görünmez**, yalnız saçak altı görünür |
| Bacalar (R1, K1 O1) | **Dört köşede** [A]. Kare kesitli, **0.8 × 0.8 m, küt**: örtü yüzeyinden çıkan görünür boy 1.2 m (**görünür oran ≤ 1:1.5**; sınır 1:2.5). Gövde köşelerinin 1.0 m içinden çatı yüzeyini delerek çıkar; **saçak çizgisinin dışında ve gövdenin yanında serbest durmaz**. Tepeleri korniş + 1.6 m, yani **örtü platosundan 0.8 m aşağıda**: hiçbir baca çatının en yüksek noktasını geçmez. **Başlık: düz taş plaka 1.2 × 0.15 m** (gövdeden her yana 0.2 m taşar). Piramit kapak, sivri uç, külah ve şerefe benzeri bilezik **yok**. Taş örgü: 1 sıra çizgisi. Arka çift ön çiftten **≥ 18 px (kıyı) / ≥ 60 px (köşk) içeride** ve biraz yukarıda: dört baca ayrı ayrı görünür. Silindir değil, kum tonunda değil (`tasarim.md` §2.4) |
| Süsleme imzası 2 | **Cumba saçağının derin gölgesi** + altında çifte kemerin iki koyu ağzı. Kitabe, çini, kalem işi ve arma yok (kanıtsız; "İznik çinisi" iddiası zayıf [A10 §10]) |
| Sur | Köşkün iki yanında devam eder. Yükseklik altyapıyla aynı (5 m). Moloz ve kesme taş karışık, köşk taşından daha koyu ve eski. Mazgal ve tuğla hatıl çizilmez [G, doğrulanmalı] |
| Arka plan | Saray bahçesi ağaçları [A §5.2]: yuvarlak tepe kütleleri, iki ton. Servi ve saray binası çizilmez (nötr) |
| Kameradan görünen | Köşk görünümünde (yakın, alçak) cumba ve ana saçak altı görünür, örtü yüzeyi görünmez; gökle yalnız saçak çizgisi ve 4 küt baca kesişir. Kıyı görünümünde (uzak) örtünün düz kenarlı yüzü ve platosu görünür |

#### 1.1a 360 px imzası ve yasak benzerlikler (K1 O1)
- **Köşkü 360 px'te "kıyı köşkü" yapan imza (önem sırasıyla):**
  1. **Su çizgisine oturan yatay taş kütle + iki koyu kemer ağzı** (köşk suya "ayak basar"). Sur bandı köşkün iki yanında altyapı üst hizasında devam eder; köşk + sur birlikte **yatay** okunur.
  2. **Boydan boya koyu saçak çizgisi** (cumba saçağı + ana saçak). Kıyıda telefonda ≥ 3 px kalınlık (dekor ≥ 8 px).
  3. **Tek ışıklı pencere** (§1.2 pencere ışığı).
  4. Üstte alçak, düz kenarlı örtü ve çatının içinden çıkan **4 küt baca**. Bacalar ikinci sıradadır, imzayı taşımaz.
- **Yasak benzerlik testi (eleştirmen 360 px'te sorar: "bu ne?"):**
| Benzerlik | Neden olur | Önlem |
|---|---|---|
| cami (kubbe + minare) | yarım küre örtü + yanında ince sivri kule | örtü kesik piramit + saçak; baca küt, düz başlıklı, plato altında, çatıdan çıkar |
| kilise/çan kulesi | tek yüksek dikey öğe | hiçbir öğe gövde yüksekliğinin %20'sinden fazla korniş üstüne çıkmaz |
| kale/burç | mazgal dişleri | sur ve köşk üstü düz; diş yok |
| çadır | yüksek sivri piramit | plato + saçak + basık eğim |

### 1.2 Görünüm `kiyi` (gece: P01 A, P03, P04, P05, P06)
- **Duygusal amaç:** geniş, karanlık bir sahnede tek sıcak ışık adası. Adam küçük, gök büyük.
- **Görsel dil:**
  - Yatay katmanlar: rıhtım, su, ufuk.
  - Fişek tek dikey olay olarak bunları keser.
  - Soğuk lapis ile amber kontrastı.
- **Yön:** kamera Sarayburnu rıhtımında, güneybatıya (≈ 200°) bakar. Deniz **solda ve ortada**, kara ve köşk **sağda** [S yön kuralı].
- **Ölçek:**
  - Kamera gözü rıhtımdan 1.5 m yüksekte. Ufuk y 720. Yakın ayak y 1330, burada **406 px/m**.
  - Köşk uzakta, **17 px/m** (yaklaşık 85 m ötede).

| # | Katman (uzak → yakın) | Dekor y | x | İçerik | Ton (`tasarim.md` §1.1) |
|---|---|---|---|---|---|
| 1 | Gök | −1300 → 720 | tümü | 3 düz basamak: tepe y < −200 · orta −200…460 · ufuk 460…720. Şenlik duman bandı y 600–660 | `#12141c` / `#1c2232` / `#2c3246`; bant `#3e3834` α .5 |
| 2 | Asya kıyısı | 696 → 720 | −200…620 | alçak, dalgalı tek ton tepe şeridi; ışık noktası yok (kanıtsız) | `#232838` (ufuk basamağından ΔL −6) |
| 3 | Sur + ağaç kütlesi | ağaç 560–665 · sur üstü 660 (köşk yanı) → 615 (x 1180) · sur altı (su çizgisi) 762 → 795 | 560…1180 | Sur sağa doğru kameraya yaklaşır (ölçek 17 → 30 px/m). Sol ucu x 560'ta kare bir kule kütlesiyle biter (9 m, üstü y 609) | sur `#2e2e34`, ağaç `#181c26` / `#1e2230` |
| 4 | **Köşk** (17 px/m, uzak/orta sınırı) | su çizgisi 762 · rıhtım üstü 745 · altyapı 745→660 · ana kat 660→575 · **saçak çizgisi 575, koyu bant 575–583** · örtü (kesik piramit) taban x 730–938 → **plato y 534, x 809–860** · **baca tepesi 548** (ön), 543 (arka) | **740…928** (saçakla 730…938) | Çifte kemer: 48 px ağız, koyu. **Bacalar 14 × 20 px** (görünür), başlık 20 × 3 px; ön çift merkez x 757 ve 911, arka çift x 777 ve 891 (≥ 18 px içeride). Cumba saçağı + ana saçak tek koyu bant. Orta cumba penceresi **17 × 24 px ışıklı**, **hale yok** → pencere ışığı §1.2a | cephe `#4e4a46`, saçak bandı `#2a2830`, örtü `#3a3e46` (gece kurşun), pencere `#f2c070` |
| 5 | Deniz | 720 → 1250 | tümü | Taban düz. Dalga çizgileri yatay, 3 px, boyu 20–60 px. Aralık ufukta 8 px, y 1250'de 40 px (perspektif). Yansıma kolonları: meşale altında `#e0a050` kesik şeritler; pencere altında y 762–1000 `#f2c070` α .5; şenlik patlarken patlama x'inde `#e8d6a6` | `#161c26` / çizgi `#2c3444` |
| 6 | Rıhtım dudağı | 1238 → 1256 | tümü | Kenar taş sırası, hafif açık ton, 3–4 kırık çentik | `#55545a` |
| 7 | Rıhtım döşemesi | 1256 → 2000 | tümü | Kesme taş, blok 0.6 × 0.4 m. Sıra yüksekliği y 1256'da 30 px, y 1920'de 140 px. Dikey derzler ufuk noktasına (540, 720) yakınsar | `#45444a`, derz `#2a2a30`, meşale havuzunda `#7e6a52` |
| 8 | Ön plan çerçeve | yok | — | Alt üçte birde rıhtım, fitil, ışık havuzu ve ayaklar var; başka çerçeve öğesi gerekmez | — |

- **1.2a Pencere ışığı (K1 S2; kıyı ve köşk görünümünde aynı kural):** daire hale **kaldırıldı** (cephede "saat/ay" okunuyordu).
  - Pencere: düz `#f2c070` dolgu + iç kenarında 1 basamak açık ton `#ffd890` (pencere eninin %15'i), sert kenar.
  - Işık havuzu yalnız **pencerenin altına**, denizlik çizgisinden başlayan basık yarım elips: rx = 1.2 × pencere eni, ry = 0.5 × pencere boyu. **2 düz basamak**: iç α .20, dış (rx ×1.6) α .08, `#f2c070`, gradyan yok. Pencerenin üstüne ve yanına ışık düşmez (saçak keser).
  - Kıyı: havuz rx 20, ry 12 (dekor). Köşk görünümü: rx 102, ry 60, cumba gövdesine ve altyapı üst sırasına düşer.
  - Suya yansıma kolonu (§1.2 katman 5) değişmez.
- **Oyun yüzeyleri:** demet tabanı x 520 / y 1330 · fitil hattı x 330–520 (S eğrisi) · yardımcılar x 240–300 · başlığın düşüp yuvarlandığı yer y 1315 · Lagâri'nin iniş suyu y 1180 (su bandının alt kenarı, rıhtım dudağının hemen önü).
- **P06 kanat suda kalır (kullanıcı kararı):**
  - Kanat `suda: true` olarak su katmanına (5) yatar, iniş noktasının 40–120 px solunda, y 1170–1200.
  - Su çizgisinin üstünde %40'ı görünür. Su çizgisi kanadın üstünden kesik bir dalga çizgisiyle geçer.
  - Dalgayla ±4 px salınır. Kanadın altına meşaleden gelen amber kenar düşer, 2 px.
  - Kanadın etrafında 1 sabit halka (E3, `#9fb0bf` α .4) plan sonuna kadar kalır.
  - Rıhtım dudağının (y 1238) önünde durur, dudağın arkasına geçmez.
- **Işık (§0.6):**
  - Meşale havuzu rıhtıma düşer. Rıhtım dudağını aşarsa suya yansıma kolonu olur.
  - Karakter gölgeleri meşalenin ters tarafına düşer: yardımcılar meşalenin solundaysa sola.
  - P05 p56'dan itibaren anahtar ışık püskürmedir: gölgeler demetten dışa doğru düşer, rıhtım ve su `#f0a040` α .3 ile aydınlanır.
  - Köşk penceresi rıhtıma ışık düşürmez (85 m uzakta).
- **Tarama:** rıhtımda ve suda yok. Yalnızca demet ve karakterlerin kendi gölgesi var (prop/rig işi).
- **P04 (cs 2.5–2.7):** köşk kadraj dışında kalır (ekran x ≈ 1265): Lagâri sağa, kadraj dışındaki köşke seslenir. Arka planda su ve gök vardır. Su çizgileri cs ile kalınlaşmaz, en çok 4 px.

### 1.3 Görünüm `kosk` (P02 gece, P10 gün, AYNI dekor)
- **Duygusal amaç:** iktidar yukarıda ve aydınlık, izleyen aşağıda ve suda. Padişah balkondan değil, cumba penceresinden bakar.
- **Görsel dil:**
  - Dikey: bacalar ve cumba dikmeleri.
  - Ritim: 3 cumba penceresi + 2 kemer.
  - Alçak kameradan aşağıdan yukarı bakış (kontrplonje).
- **Yön:** kamera denizde, ≈ 235°'ye bakar.
  - Göz deniz seviyesinden 1.5 m yüksekte. **Ufuk y 1372**: kara ufku kapatır, ufuk görünmez.
  - Köşk cephesinde **85 px/m**. Cumba kameraya 1.5 m yakın olduğundan ×1.08 ölçeklenir, yani 92 px/m.

| # | Katman | Dekor y | x | İçerik |
|---|---|---|---|---|
| 1 | Gök | ≤ 565 (saçak üstü, baca araları) | tümü | gece 3 basamak (§1.1) · gün `#a9b6bf` / `#cfcfc4` / `#e6dcc0`. Şenlik patlama merkezleri **y 150–250** (§7.1) |
| 2 | Ağaç kütlesi | 470–565 (bacalar arası, saçak üstü) + 900–1100 (sol uç, sur arkası) | −60…300, 960…1100 | gece `#181c26` · gün `#7e8478` (YENİ hex, §8) |
| 3 | Sol uç: uzak kıyı | sur 1180–1417 · rıhtım üstü 1387 | −60…160 | Kıyı sola doğru uzaklaşır (30 px/m). **Küçük grup + demet + meşale** x 90–148 (K3, §1.3b), ayak y 1387, figürler ≈ 50 px, meşale halesi r 60 (P03'ün kurulumu) |
| 4 | **Köşk** | su çizgisi 1500 · rıhtım üstü 1415 · altyapı 1415→990 · ana kat 990→565 · **ana saçak 565, taşma 51 px (x 109–1151), saçak altı bandı 565–585** · örtü **görünmez** (§1.1) · **baca tepesi 429** (ön), 445 (arka) | **160…1100** | Altyapı: kemer A1 x 268–506, A2 x 614–852. Uç y 1075, üzengi 1223. Çeşme nişi x 526–594, y 1244–1372, yalak y 1372–1385 · ana kat pencereleri (cumba dışında kalan) x 200–285 ve 975–1060, y 760–896 · **bacalar** 68 px en, başlık 102 × 13 px: ön çift x 211–279 ve 981–1049, arka çift (×0.9) x 281–343 ve 917–979 · pencere ışığı §1.2a |
| 5 | **Cumba** (92 px/m) | gövde 990→650 · saçak altı 650→620 (görünür soffit) · saçak dış kenarı 612 | **320…800** (orta 560) | Pencereler: x 368–453 · **518–603 (padişah)** · 668–753, y 700–819. Denizlik y 819. Dikmeler 2 tahta genişliğinde. Saçak altı II tarama |
| 6 | Önündeki rıhtım | 1415 → 1500 (ön yüz) | 160…1100 | Üst yüzey ince şerit olarak görünür (kamera 0.5 m yukarıda). Ön yüzde tek taş sırası |
| 7 | Deniz (alt üçte bir) | 1500 → 2030 | tümü | Dalga çizgileri, aralık 12 px → 44 px. **Pencere yansıma kolonu** x 540–580 (gece) · köşkün ters yansıması (gündüz) **§1.3a** · şenlik yansımaları |

- **Kamera önerisi (yönetmene not, §7.2):** P02 cs 0.9 → 1.05. P10 cs 0.9 → **2.4**, son kare cx −28, cy 420.
- **Neden:** padişah büstü (pencere içinde 1.1 m) 92 px/m'de 101 dekor px eder. %12 için (≥ 230 px) cs ≥ 2.3 gerekir.
  - Sahne planındaki cs 1.6 ile bu değer ancak köşk 3.5 kat büyütülürse tutar. O zaman köşk kadraja sığmaz ve 4 baca ile çifte kemer imzası kaybolur.
- **cs 2.4'te kadraj:** dekor x 315–765, y 385–1185. Üstte saçak, ortada üç pencere, altta kemer uçları görünür. Kompozisyon kendi içinde tamdır.
- **Işık P02 (gece):**
  - Cephe düz `#4e4a46`. Orta pencere `#f2c070` + rıhtıma ve saçak altına `#f2c070` α .2 havuz.
  - Padişah silueti `#1e1c22` pencere ışığının önünde.
  - Yan pencereler koyu `#2a2830`, ışıksız. Tek ışıklı pencere = tek göz.
  - Şenlik anında bütün cephe 6 kare boyunca `#e8d6a0` α .10 parlar, gölge vermez.
- **Işık P10 (gün):**
  - Önden güneş. Cephe ışıklı `#b4a88e`, kemer içi ve niş `#3a3430` (III + ton), saçak altı `#7e7462` (II).
  - Saçak gölge bandı cumba gövdesinin üst 0.4 m'sine düşer (37 px, 15° güneş × 1.2 m taşma).
  - Baca gölge yüzü solda, II.
  - Gölge vektörü (−0.97, −0.15): örtü görünmediği için baca gölgesi kadrajda yok; başlık plakası kendi gövdesine 4 px gölge bandı düşürür.
  - Pencere içi `#3a3430`, padişah `#2a2622` + sağda `#f0d79a` 2 px kenar.

#### 1.3a Gündüz yansıması (K3 V8, R2)
- **Sorun:** P10 p0'da yansıma opak bir düz kütleydi ve alt üçte birde "ikinci bina" okundu.
- **Yalnız koyu kütleler yansır:** iki kemer ağzı, çeşme nişi, cumba gövdesi (ahşap) ve saçak bandı. Açık taş cephe **ayrı bir kütle olarak yansımaz**: yerinde su tonu kalır, en çok `#7c9090` + `#b4a88e` %20 karışımı, yani su ile neredeyse aynı.
- **Opaklık:** koyu kütle yansımaları **α .55–.60**, renk = kaynağın %70 koyusu ile su tabanının karışımı. Kemer içi yansıması `#3e4446`; cumba yansıması `#4e4438`.
- **Boy:** kaynağın 0.6'sı (su çizgisi y 1500'den aşağı). Kemer uçlarının yansıması y ≈ 1750'de biter; kemerin sivri tepesi yansımada **görünmez**, dalga keser.
- **Kırılma:**
  - Yansıma **7 yatay dilime** bölünür (dilim yüksekliği 22–40 px, aşağıya doğru artar).
  - Dilimler arasında 4–8 px su aralığı bırakılır.
  - Her dilim yanlara **±6–14 px** kayar (seed 135, sabit; dilim başına işaret değişir).
  - Dilim kenarları düz yatay kesiktir, dalgalı eğri yoktur.
  - Su dalga çizgileri yansımanın **üstünden** geçer.
- **Alt kenar, iki düz basamak (gradyan yok):** son iki dilim α .30, en alttaki α .15. Ondan sonra yalnız su.
- **Gece (P02):** köşk yansıması çizilmez. Yalnız pencere kolonu (§1.2a) ve şenlik şeritleri vardır.
- **Telefon testi:** alt üçte bir "su" okunmalı. Yansımadaki iki koyu kemer lekesi bina değil, kırık leke olarak görünür.

#### 1.3b Motion soruları (K3)
1. **Eksen asimetrisi (gövde ortası 630, cumba/kemer/çeşme ekseni 560): kasıtlı, doğru [T].**
   - Asıl kompozisyon ekseni 560'tır: iki kemer + çeşme + cumba + padişah penceresi. P10 kalibrasyonu bu eksene bağlıdır.
   - Gövdenin sağda kalan bölümü (x 852–1100, ≈ 2.9 m) ana kat penceresi ve sağ baca ile **yan kanat** okunur.
   - Köşkün cephe simetrisi kaynakta yok. Sol tarafı daraltmanın nedeni P02'deki sol şerit (grup). Değiştirilmez.
   - Okunurluk şartı: sağ kanatta kemer ya da ikinci cumba **olmaz**. Sağ kanadın tek penceresi 975–1060 kalır. Böylece asimetri "eksik çizim" değil "yan kanat" okunur.
2. **P02 sapması (cs 0.97, grup x 90–160): ONAY, iki şartla.**
   - (a) Grubun sağ ucu ≤ x 148 olur: köşk gövdesiyle (x 160) arasında ≥ 12 px boşluk kalır ve grup uzak sur önünde ayrı durur (K3 karesinde gövdeye yapışık, köşkün rıhtımındaymış gibi okunuyor).
   - (b) Grubun rıhtım çizgisi (y 1387) köşk rıhtımından (1415) yukarıda kalır: derinlik bunu okutur.
   - §1.3 katman 3'teki x 40–140 değeri buna göre **x 90–148** olarak güncellendi.

### 1.4 Görünüm `insert` (P07 gece, P11 gün, AYNI dekor, cs 1.0 sabit)
- **Duygusal amaç:** her şey avucun içinde olup biter. Zemin taş, soğuk ve kalıcı.
- **Görsel dil:**
  - Diyagonal: rıhtım kenarı ve duvar dibi ufuk noktasına yakınsar.
  - Ritim: döşeme sıraları.
  - Ortada boş, ışıklı bir sahne alanı.
- **Yön:** kamera köşk rıhtımında, 155°'ye bakar. Göz 1.0 m yüksekte, 35° aşağı bakar. Deniz **solda**, köşk **sağda** (`kiyi` ile aynı yön kuralı).
- **Ufuk / ufuk noktası:** (560, 180).

| # | Katman | Dekor | İçerik |
|---|---|---|---|
| 1 | Gök + uzak deniz şeridi | y 0–180 | gece `#1c2232`, gün `#cfcfc4`. Ufuk çizgisinde x < 560 deniz şeridi (12 px), uzak ayrıntı yok |
| 2 | Köşk altyapı duvarı (sağ, perspektif) | Duvar dibi (1080, 1240) → UN. Duvar üstü kadraj dışı | Kesme taş, blok 0.9 × 0.45 m. Sıra çizgileri UN'ye yakınsar. Sağ üstte kemer A2'nin iç köşesi koyu (III + ton). **Veren el bu kemerin tarafından (sağ kenar) girer** |
| 3 | Deniz kenarı (sol) | Kenar çizgisi (110, 1920) → UN. Solunda su | Su: gece `#161c26`, gün `#5e7378`. Dalga çizgileri |
| 4 | **Basamaklar** | x 60–260, y 1180–1480 | Denize inen 3 basamak, her biri 0.2 m. Ön yüzler koyu, üst yüzler açık. Lagâri buradan çıktı (P07 ıslak izler başlangıcı) |
| 5 | Rıhtım döşemesi | y 1180 → 1920 | Sıra yüksekliği y 1450'de 150 px, UN'ye doğru her sırada ×0.8 (1300 / 1180 / 1084 / 1007…). Derzler UN'ye yakınsar. **Temas y 1450**, kese yere iner y 1355, sikke y 1440 (§7.5) |
| 6 | Islak ayak izleri (P07) | (230, 1290) → (330, 1350) → (430, 1320) → (540, 1390) | `tasarim.md` §4.11. Basamaktan avuca doğru giden yol |

- **Işık:**
  - **P07:** pencere ışığı sağ-üstten. Döşemenin sağ yarısında amber havuz `#f0a848` α .25, sol yarı `#45444a`. Gölgeler sola, kısa.
  - **P11:** güneş tam soldan. Döşeme `#a09682`, duvar ışıklı `#b4a88e` (sıyırıcı ışık, sıra çizgileri belirgin). Gölgeler **sağa, uzun** (3.7×).
- **Sonuç (yönetmen ve yaratıcı yönetmene bilgi):**
  - Soldan giren muhafız elinin gölgesi el omza değmeden önce (p80–104) omuza ve kese elinin üstüne düşebilir. Bu, ışık tanımının doğal sonucudur.
  - Kullanılırsa dokunuş EV-D5'i güçlendirir. Kullanılmazsa el gölgesi kadraj dışında kalacak şekilde elin yolu ayarlanır.
  - Karar yönetmenin.
- **Tarama:** yalnızca kemer iç köşesinde (III) ve basamakların ön yüzlerinde (II). Döşemede yok.

### 1.5 Malzeme ve doku tablosu (SARAYBURNU)
| Yüzey | Malzeme | Doku tarifi | Kod yöntemi | Parametre |
|---|---|---|---|---|
| Köşk altyapı + ana kat | kesme taş, düzgün sıralar [A "kesme taş"] | İzodom sıralar, blok 0.9 × 0.45 m, derz ince. Köşelerde hafif aşınma. Yağmur izi yok (minyatür düz alan) | `TasDuvar` yeni `tip: "kosk"` | gün taban `#b4a88e`, gölge `#7e7462`, derz `#8e8470` α .5 w 1.5 · gece ışıklı `#8a7458`, gölge `#4e4a46` · blok [0.9, 0.45] m · seed 131 · bulut yok |
| Sur | moloz + kesme karışık [G] | Düzensiz blok boyları (0.3–0.7 m), derzler daha koyu, köşkten bir ton koyu | `TasDuvar` `tip: "sur"` | gün `#8e8472` / `#6a6252` · gece `#2e2e34` · seed 132 |
| Cumba | ahşap [A] | Dikey kaplama tahtaları, 0.15 m (yakında çizgi, orta mesafede yok). Dikmeler 1 ton koyu | `AhsapYuzey` `boyali` → yeni tür `"cumba"` | ışıklı `#6a4a30`, gölge `#3a2a1e` (`tasarim.md` §1.3), çizgi α .25, seed 133 |
| Örtü (kesik piramit) | kurşun [G] | Yakında ve gündüzde plato kenarına yakınsayan 5–7 düz dikiş çizgisi, 1.5 px, `#a3a8aa` α .35. Orta mesafede ve gecede yok | yol + çizgi | `#7c8288` / ışıklı `#a3a8aa` |
| Baca | taş | 1 sıra çizgisi + düz başlık plakası (§1.1) | `TasDuvar kosk` küçük ölçek | gölge yüzü II tarama |
| Rıhtım döşemesi | kesme taş | Perspektif bloklar, kırık köşe (her 7. blokta) | yeni `Doseme` (UN yakınsamalı) | gece `#45444a` / `#2a2a30` · gün `#a09682` / `#7a7262` · seed 134 |
| Deniz | düz | 2 ton basamak + dalga çizgisi + yansıma kolonu. **Gradyan ve gürültü yok** | yeni `DuzSu` | gece `#161c26` / `#2c3444` · gün `#5e7378` / `#7c9090` |
| Islak taş (P07) | — | Ayak izi lekeleri + basamaklarda ıslak koyulaşma | ton | `#3a3e48` + parlama `#a9bccb` α .4 |

### 1.6 Görünüm `ic` (P12, köşk içi, gün)
- **Duygusal amaç:** dışarıdaki aydınlık bir kanatla kesilir. Karar karanlıkta verilir.
- **Görsel dil:**
  - Koyu oda, tek dikey ışık yarığı.
  - Yarık daralır, yüz konturunda bir şerit kalır.
  - Sıcak ışık ile soğuk gölge kontrastı.
- **Mimari kart:**
  - Ana kattaki oda; pencere denize (ENE) bakar.
  - Duvar sade kireç sıva [`tasarim.md` §1.3]. Kalem işi, çini, kafes ve revzen çizilmez (nötr).
  - Pencere: **çift kanatlı kepenk ailesinin sol kanadı** (`tasarim.md` §4.10), 0.55 × 1.30 m. Menteşe sol pervazda.
  - İkinci kanat (x 738–916) kadraj dışında kalır.
  - Kapı: lento `duz`, 0.9 × 2.0 m, ahşap pervaz. **Açık bırakılır, ardı koyu** `#2a2420`: işaretin anlamı "çık" olarak okunur.
  - Tavan, ocak ve sedir kadraja girmez.
- **Ölçek:** pencere duvarında **324 px/m**, padişahta (duvardan 0.4 m önde) 340 px/m.

| Öğe | Dekor |
|---|---|
| Pencere açıklığı (görünen kanat) | x 560–738, y 560–981 · pervaz 26 px · **denizlik y 981–1020** (0.12 m, 20 px öne taşar; üst yüzü ışıklı şerit `#cbbfa4`, altında **16 px koyu gölge bandı** `#2a2420`) · **ikinci kanat kenarı** x 738–752 (kapalı, gölgede `#3a2a1e`), her karede görünür · pencere altı duvarı y 1020–1250 (0.71 m düz sıva) — §1.6b |
| Pencere dışı | `#ece2c4` (gündüz %30 aşırı pozlanmış) + uzakta tek ton ufuk şeridi; ayrıntı yok |
| Duvar | ışıklı `#cbbfa4` (yalnız huzmenin vurduğu yerde) · gölgede `#3a3430` |
| Kapı (sahne-planı x≈120 yerine, §7.4) | **x 60–352**, y 602–1250 |
| Padişah | yüz ön konturu x ≈ 457, göz y 740 · ayak y 1267 (kadraj dışı) |
| Zemin + duvar dibi (R3, K4 U3) | Duvar dibi y 1250. Zemin 1250'den kameraya doğru. **Düzeltme:** önceki "cs 1.8'de ekran y ≥ 1612 → kadraj dışı" hesabı yanlıştı (1612 < 1920): zemin cs 1.8 / cy 130'da ekranda 1612–1920 arasında **görünür** ve alt güvenli bandın içindedir. Doğru kural ve tarif: §1.6a |

- **Huzme (E5, tek kaynaktan):** `AciklikIsigi`, `yonlu` yön (−0.83, +0.56).
  - Kaynak, kanadın serbest kenarıyla orta kayıt arasındaki dikey yarıktır. Kanat 12°'deyken yarık x 706–738 (32 px dekor, cs 2.6'da ekranda 83 px).
  - Yarık kendi yönünde süpürülür. Yarığın üst ucunun (y 560) izdüşümü x 457'de **y 739**'a düşer. Yani **bandın üst kenarı göz hizasından geçer**: alın ve sarık gölgede, gözden çeneye kadar ön kontur ve göğüste dikey şerit ışıklıdır. "Işık gözlerde şeride iner" (EV-D6) geometriden kendiliğinden çıkar.
  - Kanat 80°'de (açık) yarık x 560–738 olur ve band padişahı geniş biçimde yıkar.
  - Toz zerreleri yalnızca bandın içinde.
- **K4 gözden geçirme (R2):**
  - **Yarık genişliği:** kanat 12°'deyken bile 32 px'lik etkin aralık, kanadın ışık yönündeki izdüşümünden gelir: L·sin θ = 0.55 × sin 12° = 0.11 m ≈ 37 px; düzlem içi açıklık yalnız 4 px'tir. Motion yarığı **etkin açıklık = 0.55·sin θ** ile hesaplar; düzlem içi açıklığı kullanmaz, kullanırsa şerit kaybolur.
  - **Havadaki huzme şerit değildir:** dikey yarık (32 × 421) (−0.83, +0.56) yönünde süpürülünce havada ≈ 370 px kalınlığında bir sütun olur. Okunan "şerit" yalnız **yüzeyde** oluşur: pencereye dönük ön kontur (alın altı, burun, dudak, çene) ve kaftanın ön kenarı, 32 px × cs genişliğinde (cs 2.6'da 83 px).
    - Bu yüzden havadaki sütun **yalnız iki ince kenar çizgisi** (1.5 px, `#f6e4b0` α .2) + toz zerreleri (α .5) olarak çizilir. Dolgu en çok α .06.
    - Önceki "α .25 → .08 dolgu" tarifi iptal: dolgu geniş sütunu yüzü yıkayan bir sis gibi gösterir ve şeridi öldürür.
    - Alt üçte biri kaftan şeridi + sütun kenar çizgileri doldurur.
  - **Kadraj:**
    - cs 1.8 / cx 150'de (p0–10) pencere ekranda x 726–1046: kanat kapanışı görünür ✓.
    - p50'den sonra (cs 2.6 / cx 216) yarık ekranda x ≈ 1190–1270, **kadraj dışında**. Şerit sağ kenardan girer. Kabul: kaynak kapanışta kurulmuştu.
    - Göz y 740 ekranda y ≈ 598 (yazı bantlarının dışında) ✓.
    - Kapı pervazı x 352, cs 2.4 / cx 190'da ekranda x ≈ 279 ✓ (işaret anında görünür).
  - **Ölçü tutarlılığı:**
    - Kapı 0.9 × 2.0 m (292 × 648 px, y 602–1250) ve pencere 0.55 × 1.30 m (178 × 421), aynı 324 px/m düzleminde ✓.
    - Pencere üstü (y 560) kapı üstünden (602) 0.13 m yüksekte: kabul.
    - Denizlik 0.83 m.
    - Padişah gövdesi x ≈ 380–520, pencereye (560) 40 px kala durur. Yüzü pencereye ve dışarıya bakar, kanadı uzanarak çeker (kol yolu kanadın serbest kenarına, x ≈ 738'e varır).
  - **Sonuç:** kart geçerli. Yalnız etkin yarık formülü ve havadaki huzme tarifi düzeltildi.
- **Alt üçte bir:**
  - Kaftan + göğüsteki ışık şeridi.
  - Bandın havadaki devamı (α .25 → .08, sol-alt köşeye doğru).
  - Pencere altı duvarı.
  - Zemin yalnız geniş evrede (p0–36) görünür (§1.6a). Push-in evresinde kadraj dışındadır. Zemine düşen ışık lekesi her durumda görünmez: 15° güneşle denizlikten (0.83 m) düşen leke duvardan 3.1 m ötede, kameranın altında kalır.

#### 1.6a Zemin ve duvar dibi (K4 U3, R3)
- **Hesap (ekran y = (d − 960)·cs + 960 + cy):** duvar dibi d 1250, padişah ayağı d 1267.
  - cs 1.8 / cy 130 → ayak 1683, duvar dibi 1612: alt bantta, KABUL EDİLMEZ.
  - **Geniş evre (p0–36):** ayak ve temas gölgesi ≤ 1490 için cs 1.8'de **cy ≤ −23** (öneri cy −30: ayak 1483, duvar dibi 1452). Sarık tepesi (d ≈ 650) ekranda ≈ 372 olur, yazı bandına (≤ 400) girer. İkisi birden tutmuyorsa yönetmen p0–36'yı cs 1.6'ya düşürür: ayak ≤ 1490 için cy ≤ 39; cy 30 ile sarık 494 ve ayak 1481 olur, ikisi de tutar. **Öneri: p0–36 cs 1.6, cy 30.**
  - **Push-in evresi (p70+):** zemin kadraj dışı için duvar dibi > 1920 olmalı, yani cs 2.6'da cy ≥ 206 (mevcut 210, sınırda ✓). cs 2.2'de cy ≥ 322 (**mevcut 170 → zemin 1793'te görünür ✗**). Yönetmen p204'te cy ≥ 330 yapar ya da zeminin görünmesini kabul eder (bkz. aşağıdaki tarif; görünürse alt bant ölü alan olmaz, ama ayak kadraja girmez çünkü d 1267 → 2149).
  - Her beyan kontrol karesinde ölçülür (K4 dersi 4).
- **Zemin tarifi (görünürse):** düz tek ton döşeme `#2e2824` (oda gölgesinin bir basamak koyusu). Döşeme deseni, tahta çizgisi ve süpürgelik yok (kanıtsız, nötr).
  - **Halı:** padişahın bastığı yerde düz `#5a4a3e` halı (`tasarim.md` §1.3). Arka kenarı duvara paralel d 1262 çizgisinde, duvardan 0.04 m önde; ön ve yan kenarları kadraj dışında. Desen ve saçak yok.
  - Duvar dibinde 12 px'lik temas gölgesi bandı `#221e1a`.
  - Padişahın temas gölgesi yalnız ortam ışığıyla oluşur: halı üstünde basık, yumuşak olmayan koyu elips α .35. Huzme zemine düşmediği için yön gölgesi yok.
- **Işık kanıtı (K4 U6 ile uyumlu):** huzme kapı pervazına ve arka duvara düşer. Kapı pervazı (x 300–352) ve kapı solundaki duvar, huzme sütunu içindeyse `#cbbfa4` leke alır ve padişahın kesik gölgesi bu lekenin içine düşer. Leke alanı = sütunun (§1.6 K4 gözden geçirme) duvar düzlemiyle kesişimi, elle konmaz.

#### 1.6b Pencere ↔ kapı ayrışma imzası (K4 U4, R3)
| | **Pencere (sağ)** | **Kapı (sol)** |
|---|---|---|
| Alt kenar | **Yerden 0.83 m yüksek.** Kalın denizlik (20 px çıkıntı + 16 px gölge) ve altında **düz sıva duvar** görünür | **Zemine iner:** taş eşik (0.05 m, açık ton `#6a6258`), altında duvar yok |
| İçi | Kapalı ahşap kanat. Bölüntü **üstte kare panel** (0.42 × 0.42 m) + **altta tek alçak panel** (0.42 × 0.62 m), yatay kayıt 0.06 m. Cam, kafes ve oyma yok | **Açık, karanlık boşluk** `#2a2420`. Kanadı görünmez (dışa açılmış) |
| Işık | Kanatlar arasındaki **yarıkta aşırı pozlanmış dış çizgi** `#f6e4b0` (etkin açıklık 0.55·sin θ). **Pencerenin kimliği budur, kadrajda kalmalı** (yönetmene not aşağıda) | Kendi ışığı yok, ancak huzme lekesi pervazına düşebilir |
| Pervaz | İnce (26 px) + sağda ikinci kanadın kenarı (14 px) | Daha kalın (0.10 m = 32 px), üstte düz lento (0.15 m) |
| Oran | Kanat 1:2.4, **yerden kopuk dikdörtgen** | 1:2.2, **zemine basan dikdörtgen** |
- **Telefon testi:** "sağdaki pencere, soldaki kapı" yalnız alt kenarlardan (denizlik + duvar ↔ eşik) ve yarıktaki ışık çizgisinden okunmalı.
- **Yönetmene (kadraj):** yarık (d x 738) ekranda ≤ 1000 ve kapı pervazı (d x 352) ≥ 100 olmalı.
  - **cs 2.2'de** ikisi birlikte sığar: **cx ∈ [−26, +24]**. Mevcut p204 cx 170'te yarık 1146'da, kadraj dışında.
  - **cs 2.6'da** birlikte sığmazlar (386 × 2.6 = 1004 > 920). p50–120'de öncelik yarık + yüz: **cx ≤ −55** (yüz ön konturu ekranda ≈ 269). Kapı pervazı bu evrede kadraj dışında kalır; işaret anı (p130+) cs 2.2'ye döndüğünde kapı geri gelir.
  - Instagram sağ düğme sütunu (x 920–1080, y 900–1700): yarık 1000'e kadar kabul, çünkü yarığın kendisi ince bir ışık çizgisidir, temas noktası değildir. Kanat kenarı **temasında** (p30 "tok") x ≤ 880 (K4 §2.1a).
- **Tarama:** pervazın gölge tarafında II, kapı ağzında III + ton. Geniş duvar gölgesi düz ton.

---

## 2. KE-S2 GALATA-TEPE (P01 B, P08)

### 2.1 Mimari kart: Galata Kulesi, 1630'lar
| Madde | Değer |
|---|---|
| Dönem | Ceneviz kulesi, Osmanlı onarımlarıyla [G]. 1630'larda gemi levazım ambarı, öncesinde zindan [A §5.1]. **1875 sonrası eklenen iki ahşap kat ve bayrak direği yok. Bugünkü konik külah (1965–67) yok** [A] |
| Yapı tipi | Silindir taş kule. Gövde + tepe katı (Matrakçı'da "tepe köşkü ve üstündeki kat") + kurşun külah [A] |
| Kat düzeni (kadrajda) | **Gövde** (moloz/yonu taş, sıra 0.45 m) → gövdenin üst yüzü = **1.2 m'lik taş seki** (tepe katını çevreleyen yürüme yeri) → **tepe katı** (gövdeden 1.2 m içeride, yüksekliği 3.0 m, `yarimDaire` kemerli açıklıklar) → **korniş** (0.3 m, sade, tek çıkıntı) → **külah** |
| Açıklıklar | Tepe katında yaklaşık 8 kemerli açıklık [A]: genişlik 1.0 m, yükseklik 2.4 m (üzengi 1.9 m), `yarimDaire` (§0.4, doğrulanmalı). Açıklık içi koyu. Kadrajda biri **kapı** (x 290), biri sağ uçta kısalmış görünür |
| Seki ve çıkıntı | Seki kenarında **korkuluk çizilmez** [T: kanıtsız → nötr; ayrıca öndeki korkuluk Hezarfen'in ayaklarını örterdi, yönetmene not §7.3]. **Çıkıntı:** sekinin sağ uçta dışa taşan taş levhası, 0.8 m taşma, altında tek sade taş konsol. Gevşek taş levhanın dış kenarında |
| Külah (süsleme imzası 1) | **Kurşun kaplı** [A]. Biçim nötr: düz koni, **yükseklik = 1.0 × taban çapı**. Saçak taşması tabanın **%10'u** (R3: deniz feneri / roket benzerliğine karşı, §2.4a). Pencere, çatı penceresi, alem ve bayrak **yok** [A "eğim/pencere kanıtsız"]. Yakında dikiş çizgileri §2.5 |
| Süsleme imzası 2 | Kemerli tepe katı (koyu açıklık dizisi) + korniş çizgisi. Başka süs yok |
| Çevre | Galata konutları: ahşap gövde [A10 §10.9], çatı koyu toprak `#6e5240` tek ton, eğim alçak-orta, **kiremit deseni ve dik çatı yok** [A10]. Galata surları çizilmez (doğrulanmadı [A]) |
| Kameradan görünen | Kamera sekinin dışında, sekiyle aynı seviyede havada; göz 1.65 m yüksekte, tepe katı duvarından 4 m uzakta. **Külah dik olduğu için yüzeyi görünür** (eğim > bakış açısı). Saçak altı görünür. Külahın tepesi kadrajın üstünden taşar: koni yakınsayan iki kurşun yüzey olarak okunur, tam siluet P09'dadır |

### 2.2 Ölçek ve yön
- **Seki zemini y 1250 = Hezarfen'in ayağı, 255 px/m** (%22 boy, `tasarim.md` §8.6). Ufuk y 829.
- Kamera yönü 20°: sağ = doğu (Boğaz / Üsküdar yönü), güneş sağda ve ileride. **Yan-kontra ışık.**

### 2.3 Katmanlar (cs 1 kadrajı: P01 B, P08 p0)
| # | Katman | Dekor y | x | İçerik / ton (`tasarim.md` §1.2) |
|---|---|---|---|---|
| 1 | Gök (lodos pusu) | ≤ 829 | 700…1300 (külahın sağı) | `#a9b6bf` / `#cfcfc4` / `#e6dcc0` düz basamaklar. Sağ üstte güneş parlaması `#f6e8c0` α .4, x 1000–1300, y 500–829, disk yok |
| 2 | Uzak: Boğaz şeridi + Asya kıyısı | 790–870 | 700…1300 | Asya tepeleri `#9aa2a4` (y 790–829), Boğaz şeridi `#7c9090` (829–870) + güneş yolu kıvılcımları `#e4dcc4`, sağ kenarda |
| 3 | Aşağıdaki şehir (Galata, Tophane çatıları) | 870 → 2400 | 700…1300 | Yukarıdan bakılan çatı kutuları: ölçek y 870'te 6 px'lik kutu, y 2400'de 60 px. Çatılar `#6e5240`, gölge yüzü `#4e3a2e` sol tarafta; duvarlar `#8a7660` / `#5e5040` (YENİ hex, §8). Yüzeyde hava perspektifi: y < 1100 tek ton `#a49c90` |
| 4 | Külah | 0 → 485 (saçak altı 485–500) | −540…800 | İki yüzey: sol `#7c8288` (gölge), sağ dar şerit `#a3a8aa` (ışık). Sırt çizgisi sağ üste yakınsar |
| 5 | Korniş | 485–500 (yükseklik 0.3 m = 77 px, öne taşma) | −540…720 | Altı II tarama |
| 6 | Tepe katı duvarı | 500 → 1250 | −540…700 (sağ uç kavisli) | Moloz/yonu taş, sıra 0.45 m = 115 px. Taban `#6b6357` (gölge yüzü). x 600–700 terminatör bandı II, **x 680–700 ışıklı `#9a8f7e`** (sağ uç) |
| 7 | Açıklıklar | Kapı D x 163–418; üzengi y 765, tepe y 637, eşik 1250 | | içi `#2a2620`, kemer içinde III + ton. Sağ uç açıklığı x 560–650 (perspektifle daralmış), koyu |
| 8 | Seki | üst yüzey 1250 → 1430 (perspektif), ön yüz 1430 → 1575 | −540…860 | Taş levha, ön yüz `#6b6357`, üst yüz bir ton açık `#7e7466`. **Ayak teması y 1250** (sahne-plani ile aynı) |
| 9 | Çıkıntı | üst 1250–1460, ön yüz 1460–1540, konsol 1540–1650 | **640…900** | Gevşek taş x 750–790 (`tasarim.md` §4.5). Hezarfen'in durduğu yer x 700–800 |
| 10 | Gövde (aşağıya doğru dikey şerit) | 1575 → 3600 | −540…1060 (gövde, tepe katından 1.2 m geniş) | §2.4 |

- **Kontra okuma:** Hezarfen (x 700–800) ve kanat silueti `#3a3634`, arkada açık pus gök ve uzak şehir. Bu yüzden çıkıntının arkasındaki gök/şehir alanı (x 700–1080, y 600–1250) **boş ve açık** kalır. Bulut, kuş ya da baca konmaz.
- **Gölge:** (−2.64, +1.09). Hezarfen'in gölgesi sekide sola ve aşağıya, uzun düşer; seki ön kenarından aşağı kırılır (y 1430'da kenar).

### 2.4 Dikey şerit (P08 vinç inişi p52–148)
- **Kamera türü:** EV-D3 "taş ekranda sabit boyutta, duvar akar" → **vinç** (kamera taşla birlikte iner). Duvarın ölçeği sabit kalır.
- **Stilize kısaltma:** gerçek yükseklik ≈ 50 m, şerit 2350 px = 20 taş sırası ≈ 9 m. Kısaltma ×5.5 [T].
  - Yükseklik bilgisini p0 kadrajı taşır: aşağıdaki şehir küçük çatılar olarak görünür.
  - P09'da tam siluet görünür.
- **Gövde (f = 1):**
  - Sıralar 115 px, sabit. Blok genişliği 0.5–0.9 m düzensiz.
  - Her 4 sırada bir **daha koyu taş sırası** (`#5e574c`): akışı okutur [T]. İskele deliği ya da pencere yok (kanıtsız).
  - Gövdenin sağ ucu x 1060 (cs 2.0'da kadraj dışı). Taş gövdenin önünden düşer.
  - Işık: gölge yüzü düz `#6b6357`, tarama yok (geniş yüzey).
- **Dip (y 3200–3600, f = 1):**
  - Gövde tabanı y 3600, zemin `#8a7a5c` (sıkıştırılmış toprak, nötr).
  - Önde, kameraya yakın **iki ev çatısı** saçak altı ile görünür: sol x 100–560, sağ x 820–1250, saçak y 3420, sırt y 3330. Çatı `#6e5240`, alçak eğimli, desensiz.
  - Taş, iki çatı arasındaki sokak boşluğuna (x 560–820) **y 3580**'de düşer. Toz efekti E4.
- **Arka katmanlar (çıkıntının sağı) yalnız cs 1'de görünür.** Vinç sırasında kadraj dışında kalırlar, f değerleri bu yüzden kritik değildir: gök/uzak f = 0, şehir f = 0.35.
- **Takip doğrulaması:** cs 2.0, cy −5300'de dekor y 3580 → ekran y 900 (`bolum.json` P08 takip `ekran_y 900` ile tutarlı).
- **Hızlı dönüş (p148–200):** aynı şerit tersine gider. Hareket bulanıklığı, şeridin 3 kopyası α .25 ile verilir (fade değildir, kamera hareketidir).

### 2.4a K5 hazırlığı: K1–K4 derslerine göre gözden geçirme (R3)
| Ders | GALATA-TEPE'de uygulanışı |
|---|---|
| Derecelendirme | **`gunduzMineral`** (doygunluk 1.0, `max(in, bp)`, bp `#14110d`). `gunduz` kullanılmaz |
| Kroma hedefi (§6a) | Galata taşı ışıklı `#9a8f7e` C\* 10.6 (≥ 7.4) · gölge `#6b6357` C\* 8.0 (≥ 5.6) · kurşun `#7c8288` C\* 4.1 (h° aranmaz) · gök orta `#cfcfc4` C\* 5.8 (≥ 4.1) · Boğaz şeridi `#7c9090` C\* 7.5 (≥ 5.3) |
| Tarama yeri | Yalnız kemer içleri (III + ton), korniş altı (II), terminatör bandı (x 600–680, II, 60 px). Geniş gölge yüzü (tepe katı x < 600, gövde) **düz ton**. Hezarfen kostümünde tarama yok (K1 O3) |
| Güneş parlaması | `#f6e8c0` α .4 **iki düz basamak** (iç α .4, dış α .18), radyal gradyan yok (minyatür + K3 dersi 1: yumuşak geçiş ara ton üretir) |
| Yasak benzerlikler (360 px, "bu ne?") | **Deniz feneri** (silindir + galeri + koni): tepe katında ışık/cam yok, açıklıklar koyu; koni h = çap (ince-uzun değil); gövde taş sıralı (beyaz düz değil). **Roket/kalem** (silindir + sivri koni: bölümün konusu yüzünden en büyük risk): kadrajda koni tek parça yalnız P09'da; korniş taşması + koyu kemer bandı koniyi gövdeden ayırır, koni ucu sivri ama alemsiz, gövdeden geniş saçaklı (taşma %6 → **%10**'a çıkarıldı). **Satranç kalesi / burç**: mazgal dişi yok. **Kilise kulesi**: yarım daire kemer, çan ve haç yok |
| Ufuk–ölçek | Kamera gözü seki + 1.65 m → ufuk y 829 = Hezarfen'in baş hizası (ayak 1250, 255 px/m) ✓. Uzak şehir ufkun altında küçülerek ✓ |
| Kamera + dikey şerit | Vinç = taş sabit boyda (K1 dersi 8) ✓, takip y 900 ↔ d 3580 ✓. **Hata (yönetmene):** P08 p36–52 (cs 1.9–2.0, cy 120) çıkıntı ve taş d 1250 → **ekran y 1631**, alt güvenli bantta; tas-surtme p40 ve tas-kayma p44 temasları orada. Taş ≤ 1470 için cs 1.9'da **cy ≤ −41** (öneri −50: taş 1420, Hezarfen başı d 830 → ekran 663). p52 cy −650 zaten daha yukarıda |
| Kadraj dışı beyanları (K4 dersi 4) | cs 2.0 / cx −140'ta görünen d x 340–880 → gövde sağ ucu 1060 dışarıda ✓; sokak boşluğu 560–820 ve taş 750–790 içeride ✓; taş p36'da ekran x ≈ 857 < 920 (sağ düğme sütunu) ✓. P01 B cs 1.25 / cx −80: çıkıntı dış ucu ekran x 910, sütun sınırında. Hezarfen 660–785 ✓ |
| Dip ölçeği | Dipteki iki ev çatısı gövdeyle **aynı stilize kısaltmayı** alır (×1/5.5 → görünür 46 px/m): 460 px'lik çatı ≈ 10 m'lik bir ev. Taş prop'u 95 px (`tasarim.md` stilize) |
| İmza tekliği | Bu şablonda `#c4a874` ±15 içinde ton yok: taş 22.7, uzak şehir 24.0, kurşun 38. Hezarfen ten/sarık render'da ölçülür (K1 dersi 1, güneş kenar ışığında) |

### 2.5 Doku (GALATA-TEPE)
| Yüzey | Malzeme | Doku | Kod | Parametre |
|---|---|---|---|---|
| Gövde + tepe katı | moloz/yonu taş [G] | Sıra yüksekliği 0.45 m sabit, bloklar düzensiz genişlikte (0.5–0.9 m), derz bir ton koyu. Her 9. blokta kırık köşe | `TasDuvar` `tip: "galata"` | taban `#9a8f7e`, gölge `#6b6357`, derz/tarama `#4e473f` α .55 w 2, seed 137, bulut yok |
| Külah | kurşun [A] | Yakında (P01 B, P08 p0) apekse yakınsayan dikiş çizgileri, aralık 0.6 m, 1.5 px, ışık yüzünde `#c2c6c6` α .3, gölge yüzünde `#5e6268` α .3. Uzakta yok | yol | `#7c8288` / `#a3a8aa` |
| Seki + çıkıntı | kesme taş levha | Üst yüzde 3 levha derzi, ön yüzde tek sıra | `TasDuvar galata` | yukarıda |
| Açıklık içi | — | düz koyu + kemer iç kenarında III | `Tarama` | `#2a2620` |
| Şehir (yukarıdan) | ahşap ev [A10] | Kutu: çatı + bir duvar yüzü, ayrıntı yok. Uzakta tek ton | yeni `KonutKumesi` (seed 138, yoğunluk sabit) | §2.3 |

---

## 3. KE-S3 BOGAZ (P09 panorama, gün)

### 3.1 Mimari kart
| Madde | Değer |
|---|---|
| Kurgu | Kamera Boğaz ağzının üstünde, kuzeye (0°) bakar. **Pan** (kamera dönüşü; parallaks yok). Solda Galata yamacı ve kule, sağda Üsküdar kıyısı ve Doğancılar meydanı, ortada Boğaz kuzeye uzanır [A §5.3: Üsküdar kabaca doğuda] |
| Galata Kulesi (imza) | §2.1 ile aynı yapı, **uzak tek siluet:** gövde + koyu kemer noktaları bandı + korniş + koni (yükseklik = çap). Sağ yüzü ışıklı. Bayrak, ahşap kat ve alem yok |
| Galata yamacı | Konut kutuları yamaçta yukarı doğru sıralanır. Çatılar `#6e5240` tek ton, alçak eğimli. Cami kubbesi ve minare çizilmez (§0.7) |
| Üsküdar kıyısı | Uzak siluet tek ton `#9aa2a4`: alçak tepe hattı + 8–12 düzensiz konut kutusu çentiği. **Belirli yapı yok** [A: "mimari ayrıntı uydurulmamalı"] |
| Doğancılar meydanı | Açık eğimli çayır. Ot `#989c76` (§5 tekillik notu; tasarım paletindeki `#a8a07a` yerine öneri), toprak lekeleri `#8a7a5c`. **Ağaç, çadır ve bina yok** [A §5.3] |
| Kameradan görünen | Kamera iniş noktası çevresinde yerden ≈ 4 m yüksekte (Hezarfen 130 px, ayak y 1170, ufuk y 860 → göz 3.9 m). Çatıların yalnız ön eteği görünür |

### 3.2 Ölçek ve derinlik (fiziksel tutarlılık)
- Galata, Üsküdar iniş noktasından çok daha uzakta: kule ölçeği ≈ **3.7 px/m**, iniş noktası ≈ **79 px/m**.
- **Bu yüzden Hezarfen uçuş boyunca büyür:**
  - Kalkışta (Galata tepesinde) ≈ 10 px.
  - p150'de (ortası) ≈ 60–80 px.
  - İnişte 130 px.
- Uçuş kameraya doğru yaklaşan bir yaydır. Rota çizgisi bu yayın zemine düşen izidir.
- **Yönetmene not §7.3:** sabit 130 px'lik siluet, kuleyi ya da meydanı ölçeksiz bırakır.

### 3.3 Katmanlar (dekor x −540…1620, 2160 px; §7.3 konum düzeltmesi)
| # | Katman | Dekor y | x | İçerik / ton |
|---|---|---|---|---|
| 1 | Gök | ≤ 860 | tümü | `#a9b6bf` (y < 300) / `#cfcfc4` (300–700) / `#e6dcc0` (700–860) · güneş parlaması x 1300–1620, y 680–860, `#f6e8c0` α .4 |
| 2 | Boğaz'ın içi (kuzey) | 830–860 | 300…900 | İki yandan alçak tepeler `#9aa2a4`, ortada su şeridi `#7c9090` ufka daralır |
| 3 | **Galata yamacı + kule** | yamaç profili y 900 (x −540) → kıyı y 1000 (x 400) · **kule x 100**, taban y 985, korniş 790, **tepe y 760**, genişlik 60 px (gerçek ölçü, §3.4) | −540…400 | Kule taşı `#9a8f7e`, sol yarısı `#6b6357`, külah `#7c8288` / sağ şerit `#a3a8aa`. Yamaç evleri: duvar `#8a7660`, çatı `#6e5240`, gölge solda |
| 4 | **Üsküdar kıyısı + meydan** | uzak siluet 880–1000 · kıyı çizgisi y 1150 (x 900) → 1260 (x 1620) · **meydan** x 1050–1450, y 1110–1260 | 900…1620 | Siluet `#9aa2a4`. Meydan otu düz; yalnız yakında 3 px dikey ot vuruşları (α .4, seed 139). **İniş noktası (1250, 1170)** |
| 5 | Boğaz suyu | 860 → 1920 | tümü | 3 ton basamak: ufuk `#7c9090` → orta (y 1100+) `#6c8284` → yakın (y 1500+) `#5e7378`. Dalga çizgileri 3 px (ufukta 10 px aralık, altta 50 px). **Güneş yolu** x 1150–1620, y 870–1400, kesik `#e4dcc4` vuruşlar, sağa ve aşağı yelpaze. Kıyı çizgisinin altında ince açık köpük şeridi yok (sade) |
| 6 | Rota çizgisi (E6) | Galata tepesi (100, 760) → iniş (1250, 1170), hafif yukarı kavisli yay | | `tasarim.md` §5 E6 |
| 7 | Ön plan martı | ekran uzayı | | `tasarim.md` §4.6, bulanık |

- **Işık:**
  - Galata'nın sağ yüzleri ışıklı.
  - Üsküdar kontra ve düz tonda (güneş arkasında).
  - Su güneş yolu sağda.
  - Hezarfen kontra `#3a3634` + sağda `#f0d79a` kenar.
  - İniş gölgesi (−3.4, +0.3): meydanda sola uzun düşer, iniş karesinde (p238) ayağa bağlanır.
- **Tarama:** yalnızca Galata yamacı ev duvarlarının gölge yüzlerinde (orta, II, 9 px aralık). Kulede yok (uzak). Su ve gökte yok.

### 3.4 Okunurluk notu
- Gerçek ölçekte kule 3.7 px/m × 64 m = 237 px boyunda, 16 m × 3.7 = 59 px eninde olur. Telefonda 79 × 20 px.
- Uzak siluet için **en %50 genişletilmez**, yalnız kemer noktaları 4 px'lik koyu kareler olarak büyütülür (`tasarim.md` "duygu için hafif abartı" yalnız ayrıntıya uygulanır).
- Tablodaki "60 px genişlik" gerçek ölçüdür.

---

## 4. KE-S4 KITAP-INSERT (P13, P14)

### 4.1 Mimari kart (yüzey)
| Madde | Değer |
|---|---|
| Yüzey | **Rahle** tablası [A10 §10.7: yazı ve okuma için küçük dar masa]. Düz ahşap tabla. **Ayak, X kasnağı, oyma, minder ve oturan kişi yok** (`tasarim.md` §4.8) |
| Kamera | Dik tepeden. Tabla, kameradan 0.6 m uzakta; zemin 0.9 m'de → **zemin ölçeği tablanın 0.67'si** |
| Ölçek | Kitap düzleminde 1455 px/m (açık kitap 0.44 m = 640 px) |
| Işık | Üst-soldan tek kaynak, gölgeler sağ-aşağı (+0.4, +0.5). Kaynak çizilmez |

### 4.2 Katmanlar (cs 1)
| # | Katman | Dekor | İçerik / ton |
|---|---|---|---|
| 1 | Zemin (tabla dışı) | tüm kadraj | `#2e2016` düz, ayrıntısız |
| 2 | Tablanın zemine gölgesi | tabla dikdörtgeni + (24, 30) | `#1e140c` α .5, kenarı net |
| 3 | **Rahle tablası** | **x 140–940, y 470–1110** (0.55 × 0.44 m) | `#4a3222`. Yatay damar çizgisi 1.4 px α .25 (`AhsapYuzey` ceviz benzeri, seed 149). Kenar 8 px'lik açık ton aşınma çizgisi `#5e4230`. Kenar kalınlığı görünmez (tepeden) |
| 4 | Kalemdan + hokka | x 330–750, y 482–538 | Gömülü hokkalı ahşap kalemdan **ya da** ayrı hokka + kamış kalem (motion birini seçer). `#5a5048` / kamış `#a08a5c` |
| 5 | **Seyahatname (açık)** | **x 220–860, y 545–1045** · cilt oluğu x 540 (2 tonlu 40 px gölge: `#d6c7a6` + `#c4b594` α .5) | sayfa `#e9dfc9`, kenar `#d6c7a6`. Metin bloğu kenarlardan %12 içeride. Kenar çizimleri sağ sayfanın dış boşluğunda: **fişek (790, 760)**, **kanatlı adam (800, 960)**, her biri 140 px (`tasarim.md` §4.8) |
| 6 | Kitabın tablaya gölgesi | kitap + (8, 10) | `#2e2016` α .55 |
| 7 | **3 defter (zeminde, ×0.67)** | Kapalı ölçü 0.16 × 0.22 m → **156 × 214 px**, açık 312 × 214. **Öneri (§7.5):** d1 x 90–246 (açılınca 90–402), y 1150–1364 · d2 x 680–836 (→ 992), y 1170–1384 · d3 x 385–541 (→ 697), y 1262–1476 | kapaklar `#3e2e24` / `#4a4038` / `#34302c`, açık sayfa `#e9dfc9` boş. Gölge (+6, +8) |

- **Alt üçte bir:** açılan defterler (y 1150–1476) + koyu zemin.
- **Doku:**
  - Sayfa = kanal kâğıdı + `ArsivKatmani kagit` lifi (.18).
  - Hat ve kenar çizimi `tasarim.md` §4.8 dilinde (tarama yok).
  - Tablada yalnızca damar.
  - **Bu şablonda tarama hiç yok.**
- **P14 son kare:**
  - Kenar çiziminin konturu cs 4.6'da 1.4 × 4.6 = 6.4 px olur ve P01 dekor konturuyla (6 px) aynı sınıfa düşer.
  - Kıvılcımın ekrandaki noktası P01 p0'dan geriye hesaplanır (motion).
  - Sayfadaki tek renk kıvılcımdır.

---

## 5. 360x640 telefon okunurluğu (imza siluetler)
| Plan / görünüm | Öğe | Telefonda | Okunur mu / önlem |
|---|---|---|---|
| P01 A (cs 1.25) | Köşk (çifte kemer + saçak + örtü + baca) | 87 × 95 px; kemer ağzı 20 px, saçak bandı 3.3 px, baca 6 × 8 px küt, plato 21 px | Test: "bu ne?" → "su kenarında kemerli bina / köşk". Cami okunursa §1.1a önlemleri eksik uygulanmıştır |
| P02 (cs 0.9) | Köşk bütün | 282 × 340 px; kemer 71 px, pencere 25 × 36 px | **Okunur:** 4 baca, saçak altı bandı, iki kemer, tek ışıklı pencere |
| P10 (cs 2.4 son) | Padişah büstü pencerede | 81 px (%12.6) | Okunur. Baş çevirme siluet olarak görünür |
| P01 B / P08 (cs 1) | Galata tepe katı + külah + Hezarfen | külah yüzeyi üst 160 px, kemerli kapı 85 × 204 px, Hezarfen 140 px | Kemerli açıklık + kurşun koni + taş sıra: "kule tepesi" okunur. Külahın tam konisi P09'da |
| P09 (cs 1) | Galata Kulesi uzak | 20 × 75 px | Koni + korniş + kemer noktaları okunur. **Kule ve külah, gök basamağıyla (ufuk `#e6dcc0`) karşıtlık taşır: kule tepesi y 760 olduğundan külah orta gök basamağının (`#cfcfc4`) önündedir. Külah `#7c8288` ile ΔL ≈ 28: yeterli** |
| P09 | Üsküdar kıyısı + meydan | meydan 133 × 50 px | Düz yeşil-sarı alan + gölge okunur; "açık meydan" |
| P12 | Pencere kanadı + yarık | kanat 154 × 365 px (cs 2.6); yarık 28 px | Okunur |
| P13 (cs 1) | Kitap + 3 defter | kitap 213 px, defter 52–104 px | Okunur. Boş sayfa açık ton |
| Hepsi | Demet `#c4a874` tekliği (ΔE76 ölçüldü, sRGB→Lab D65) | — | **İhlal 1:** `tasarim.md` §1.2'deki ot rengi `#a8a07a` → ΔE **12.4** (< 15). Öneri: `#989c76` (ΔE 17.2, L 63). Karar tasarımcının (paletin sahibi); bu belge öneriyi kullanıyor. Sınırda: köşk gün `#b4a88e` ΔE 15.9 (P10'da demet yok). Geri kalan bütün yeni tonlar ΔE ≥ 20 (konut duvarı 24.8, sur 24.5, uzak şehir 24.0, toprak 21.8). Bacalar kare kesitli ve taş tonunda, silindir değil |

## 6. Renk ölçüm tablosu (eleştirmen, ±8 L\*, ArsivKatmani sonrası)
| Bölge | Hedef | Plan · ölçüm yeri (ekran) |
|---|---|---|
| Gece gök orta | `#1c2232` | P02 · (540, 300) · P05 · (300, 500) |
| Gece gök ufuk | `#2c3246` | P05 · (300, 690) |
| Gece deniz | `#161c26` | P06 · (300, 1000), yansıma kolonları dışında |
| Gece rıhtım | `#45444a` | P03 · (900, 1700), meşale havuzu dışında |
| Gece köşk cephesi | `#4e4a46` | P02 · (950, 800) |
| Gündüz gök orta | `#cfcfc4` | P09 · (540, 500) |
| Boğaz suyu | `#7c9090` | P09 · (540, 1000), güneş yolu dışında |
| Galata taşı ışıklı / gölge | `#9a8f7e` / `#6b6357` | P08 p0 · (690, 900) / (300, 900) |
| Kurşun külah | `#7c8288` | P01 B · (200, 150) |
| Köşk gündüz | `#b4a88e` | P10 p0 · (950, 1250) |
| Rıhtım gün | `#a09682` | P11 · (700, 1600) |
| İç duvar gölge | `#3a3430` | P12 · (200, 700) |
| Rahle | `#4a3222` | P13 p190 · (180, 520) |
| Sayfa | `#e9dfc9` | P13 · (380, 700) |
~~Not: ArsivKatmani siyah noktası kabul edilebilir~~ **geçersiz (K1 O5):** mevcut derecelendirme gece mavisini siliyor, bkz. §6a.

### 6a. Kroma (C\*) ve ton açısı hedefi (K1 O5, R1)
- **L\* ve ΔE tek başına yetmez:** düşük kromada ΔH anlamsızlaşır, gri bir gök "TAMAM" alır. Hex hedefleri değişmedi (`tasarim.md` §1.1 ile aynı); her ölçüm noktasına C\* ve h° hedefi eklendi.
- **Kural:**
  - Ölçülen C\* ≥ hedefin **%70'i** olmalı.
  - h° hedefe ±20° yakın olmalı (C\* < 5 olan yüzeylerde h° aranmaz).
  - `renk_olcum.py` iki sütun ekler: `C* oranı` ve `Δh°`.

| Bölge | Hex | L\* | **C\* hedef (alt sınır %70)** | h° | K1 ölçümü |
|---|---|---|---|---|---|
| gece gök tepe | `#12141c` | 6.4 | 6.0 (≥ 4.2) | 283 | — |
| gece gök orta | `#1c2232` | 13.4 | **11.6 (≥ 8.1)** | 281 | 3.5 ✗ |
| gece gök ufuk | `#2c3246` | 21.1 | **13.6 (≥ 9.5)** | 283 | ≈4 ✗ |
| Asya kıyısı gece | `#232838` | 16.3 | 11.3 (≥ 7.9) | 283 | — |
| gece deniz | `#161c26` | 10.1 | **7.7 (≥ 5.4)** | 273 | 0.8 ✗ |
| dalga çizgisi | `#2c3444` | 21.6 | 11.1 (≥ 7.8) | 276 | — |
| gece rıhtım | `#45444a` | 29.1 | 3.9 (≥ 2.7) | (297) | 2.3 ✗ |
| gece köşk cephe | `#4e4a46` | 31.7 | 3.1 | (74) | ✓ |
| gündüz gök orta | `#cfcfc4` | 82.8 | 5.8 (≥ 4.1) | 110 | K2'de ölçülür |
| Boğaz suyu | `#7c9090` | 58.3 | **7.5 (≥ 5.3)** | 199 | K2'de ölçülür |
| Galata taşı | `#9a8f7e` | 59.9 | 10.6 (≥ 7.4) | 84 | — |
| köşk gündüz | `#b4a88e` | 69.2 | 15.0 (≥ 10.5) | 90 | — |
| rahle | `#4a3222` | 23.2 | 16.9 (≥ 11.8) | 59 | — |

- **Neden kayboldu (ölçülerek doğrulandı):** `ArsivKatmani` derecelendirmesi `saturate .86` ve ardından sıcak siyah nokta (`#14110d`) ile doğrusal `bp + x·(wp − bp)` eşlemesi uyguluyor. Bu eşleme koyu değerleri sıcak yöne kaldırıp mavi kanalı bastırıyor.
- Simülasyon render'ı birebir veriyor:
  - `#1c2232` → `#2d2e33` (C\* 3.5); render'da `#2b2c31`.
  - `#161c26` → `#28292a` (C\* 0.8); render'da `#262728`.
- Yani kayıp çizimde değil, derecelendirmede. Gündüz de aynı eşleme kullanılıyor; Boğaz suyu ve gök K2'de aynı testten geçmeli.

## 7. Yönetmene notlar (sahne-planı / bolum.json değişiklik önerileri)
1. **Kıyı görünümünde köşk konumu:** sahne-planı köşkü taban y≈900, üst y≈640 olarak veriyor. Bu ufuk–ölçek kuralına aykırı: ufuk 720 olduğunda 260 px'lik bir köşk 2.2 m yüksekliğinde bir oyuncak olurdu.
   - **Öneri:** su çizgisi **y 762**, üst **y 534**, x 740–928 (17 px/m).
   - P01 p0'da (cs 1.25) örtü platosu ekranda y ≈ 427'ye düşer, üst yazı bandının (240–400) altında kalır.
   - Şenlik patlamaları P02'de **y 150–250** (dekor) olmalı: y 600 köşk cephesinin önüne düşer. Düşen çizgiler köşk örtüsünün arkasında kalır (köşk önde örter).
2. **Köşk görünümünün kamerası:** **P02 cs 0.9 → 1.05**, **P10 cs 0.9 → 2.4 (son kare cx −28, cy 420)**. Gerekçe §1.3: padişah %12 için gerekli.
   - P02'de grubun ayakları ekran y ≈ 1344'te (alt bant içinde). P02'de replik yok, sorun değil.
3. **GALATA-TEPE:**
   - Korkuluk yok (kanıtsız; ayrıca ayakları örterdi). Sahne-plani §4'teki "korkuluk" yerine **seki + çıkıntı** kullanılır.
   - Hezarfen'in yolu x 290 → 700 aynı kalır, ayak y 1250.
   - Taş dekor y 1250'de çıkıntıdan kopar, y 3580'de düşer.
4. **BOGAZ:** `cx 500 → −500` ve cs 1.0 ile görünen dekor x aralığı −500…1580 olur. Sahne-planındaki **iniş x 1800 hiç görünmez**.
   - **Öneri:** dekor x −540…1620; **kule x 100**, **iniş (1250, 1170)**.
   - Hezarfen uçuşta derinlikle büyür (§3.2), sabit 130 px değil.
5. **P12:**
   - Kapı **x 60–352** olmalı. x≈120'de cs 1.8, cx 150 ile kapı tümüyle kadraj dışında kalır, işaret boşluğa düşer.
   - Zemin geniş evrede görünür, push-in'de cy şartına bağlı (§1.6a: p0–36 cs 1.6 / cy 30; p204 cy ≥ 330). Zemin ışık lekesi her durumda görünmez. Kapı ile yarık için kadraj şartı §1.6b.
   - Pencere ölçüsü, `tasarim.md` §4.10'daki "≈ 576 px" değerinden farklı olarak, cs 2.2'de ≈ 926 px eder (pencere kanadı 1.30 m × 324 px/m × 2.2). Tasarımcıya bilgi.
6. **P13 defterler:** d3 y 1650 alt güvenli alana (> 1500) giriyor. Öneri §4.2: bütün defterler y ≤ 1476, zemin ölçeği 0.67.
7. **P07/P11 ışığı:** P07'de ışık sağdan, P11'de soldan geliyor (fiziksel). Kese konumu aynı kalır (±10 px), yalnız gölge yönü ters döner.

## 8. Motion için çizim notları
- **Yeni ortak modüller:**
  - `Kemer` için `osmanli` tipi (§0.4).
  - `TasDuvar` için `kosk | sur | galata` tipleri (bulutlanma kapalı).
  - `Doseme`: ufuk noktasına yakınsayan döşeme (rıhtım; P07/P11 ve kıyı).
  - `DuzSu`: basamaklı su + dalga çizgisi + `yansimaKolonu(x, renk)` + `halka`.
  - `KonutKumesi`: yukarıdan ve yandan görünen ev kutuları; `olcek(y)`, seed.
  - `SinanPasaKosk`: `detay: yakin|orta|uzak`, `saat`, `pencereIsik`. Tek geometri metre cinsinden; kıyı (17 px/m) ve köşk (85 px/m) görünümleri aynı bileşeni farklı ölçek ve konumla çağırır.
  - `GalataKule`: `detay: tepe | uzak`. `tepe`, §2.3 parçalarıdır. `uzak` ise P09 silueti.
- **Türetilecek mevcut kod:**
  - `KuleDis.tsx` katman ve `kat(f)` düzeni.
  - `Isik.tsx` (`nokta` / `yonlu`, `AciklikIsigi`, `Golge`).
  - `Tarama.tsx`, `KonturTitreme`, `ArsivKatmani` (gece/gündüz).
  - `disManzara.tsx`'teki kırpma tekniği (P12 pencere dışı).
- **ArsivKatmani gece derecelendirmesi (K1 O5; zorunlu, kodu motion yazar):** derecelendirme parametreleri moda bağlanır (`AYAR[mod]` içine).
  - **`gece`:**
    - `doygunluk 1.0` (`saturate` yok).
    - **Siyah nokta `#12141c`** (`tasarim.md` §0.2 en koyusu, mavi).
    - Kanal eğrisi **doğrusal kaldırma değil**, kanal başına `out = max(in, bp_c)` (≈ 0.02 genişliğinde yumuşak diz).
    - Gölgeye soğuk karışım yok (palet zaten soğuk). Işık ucunda (x ≥ .75) sıcak karışım `#ffe2a8` α .04 kalır (alev ve pencere).
    - Sonuç: gece paletindeki her renk siyah noktanın üstünde olduğundan derecelendirmeden **değişmeden** çıkar. Doğrulandı: `#1c2232`, `#161c26`, `#2c3246`, `#45444a` birebir korunur.
    - Kâğıt lifi (multiply .13, nötr gri), gren (overlay .12) ve gece vinyeti (`rgba(6,6,14,.58)`) olduğu gibi kalır. Toplamda C\*'den en çok ≈ %10 alırlar, %70 sınırının içinde.
  - **`gunduz` / `kagit`:** mevcut ayar korunur, ama K2'de Boğaz suyu ve gök C\* oranı ölçülür. %70'in altına düşerse gündüze de `doygunluk 1.0` + `max(in, bp)` uygulanır (gündüz siyah noktası `#14110d` kalabilir).
  - **Yasak:** gece rengini kurtarmak için kaynak hex'leri "ön-telafi" amacıyla doygunlaştırmak. Palet tek gerçek kaynaktır; düzeltme derecelendirmede yapılır.
- **Arşiv modu:** kıyı, köşk ve insert gece = `gece`; GALATA, BOGAZ, köşk ve insert gün, iç = `gunduz`; KITAP = `kagit`.
- **YENİ hex'ler (paleti değiştirmez, eksik alanı doldurur; orkestra onaylamalı):**
  - Ağaç gece `#181c26` / `#1e2230`, gün `#7e8478`.
  - Konut duvarı `#8a7660` / gölge `#5e5040`.
  - Sur gece `#2e2e34`, gün `#8e8472` / `#6a6252`.
  - Asya kıyısı gece `#232838`.
  - Uzak şehir hava perspektifi `#a49c90`.
  - Ot önerisi `#989c76` (tasarım paletindeki `#a8a07a` demet tekliğini bozuyor, §5).
  - Galata koyu sıra `#5e574c`.
  - Su orta `#6c8284`.
  - Bunların hiçbiri `#c4a874` ±ΔE 15 aralığında değil, kırmızı da değil.
- **Kilit noktaları (`kilit.push`):**
  - Ayak ve temas: rıhtım y 1330, seki y 1250, iniş (1250, 1170), insert y 1450.
  - Kurulum: demet x 520, köşk penceresi, gevşek taş, kapı (P12).
- **Kalibrasyon sırası (`tasarim.md` §9 ile uyumlu):**
  - Önce **P05 p78 / P06 p76** (kıyı: köşk ölçeği ve konumu, su, rıhtım, meşale havuzu).
  - Sonra **P11 p128 / P07 p72** (insert: ışığın ters dönmesi).
  - Sonra **P02 p80 + P10 son kare** (köşk: aynı kadraj, padişah %12).
  - Sonra **P08 p0 / p100** (Galata: kontra ve şerit).

## 9. Açık sorular
- **Kullanıcıya (1):** P01 A'nın ilk karesinde "İstanbul" sesi kapalıyken Galata ya da minare silueti olmadan, yalnızca Osmanlı köşk silueti ve deniz ile okunuyor. Kanıtsız bir kubbe/minare silueti eklemiyorum.
  - Kubbe/minare istenirse önce araştırmacı doğrulamalı: hangi yapı 1630'larda bu açıdan görünür.
  - Varsayılan: eklenmez.
- **Araştırmacıya (sonra):**
  - Galata tepe katı kemer tipi (Matrakçı 1537, Merian 1635).
  - Köşk örtüsü: kubbe mi, ahşap çatı mı.
  - Bizans deniz surlarının tuğla hatıl bandının 1630'larda görünürlüğü.
  - Galata gövdesinde 17. yy. pencere/mazgal yarıkları.
  - Hepsi şimdilik nötr.
