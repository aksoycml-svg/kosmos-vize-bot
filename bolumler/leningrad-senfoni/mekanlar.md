# Leningrad'da 7. Senfoni · Mekân Şartnamesi — SALON (mekân sorumlusu, 2026-11-15)

Kapsam bu tur: **SALON** (`konser`, `prova`). BODRUM, SOKAK-LG, HARİTA sonraki tur.
Girdi: `tasarim.md` (palet §2.1/2.2/2.5, ışık sözleşmesi §0, imza §3 — **renk sahibi tasarım; burada yeni kanal rengi yok**, yalnız mekân yüzey hex'leri tasarım ailesinden türetildi), `sahne-plani.md` P01/P02b/P03b/P04b/P05/P06/P09c/P10b/P12/P14/P15, `dokunuslar.md` LS-D2/D6/D8, `arastirma.md` §5, `GORSEL-RECETE.md`, `KATALOG.md`, Paris `mekanlar.md` + iki referans görsel (bakıldı).
Etiketler: **[K]** bu turda kaynakla doğrulandı · **[A]** arastirma.md · **[G]** genel bilgi, kaynak bekliyor (doğrulanmalı) · **[T]** tasarım kararı · **[H]** hesap (bu belgedeki izdüşüm).
Gemini kullanılmadı. Ekran koordinatları 1080×1920; dünya metre; kamera modeli tek (§3).

---

## 0. Bu turda bulunan kaynak ve sonuçları (önce oku)

en.wikipedia, iki madde açıldı (ru.wikipedia proxy 403, sonra API hız sınırı; daha fazla okunamadı):
| Bulgu | Kaynak | Sonuç |
|---|---|---|
| Bina 1839'da tamamlandı; mimar P. Jacot, cephe C. Rossi; Büyük Salon ~1500 koltuk | [K] en.wikipedia "Saint Petersburg Philharmonia" | iskelet dönemi = 1830'lar neoklasik; 1500 koltuk → uzun, geniş tek hacim |
| "Konserden kısa süre önce **sahnenin üstündeki elektrik ışıkları**, provalar başladığından beri **ilk kez** yakıldı" | [K] en.wikipedia "Leningrad première of Shostakovich's Symphony No. 7" | P12 dalgası doğru; **provada elektrik ışığı yoktu** okuması güçlü (§0.1) |
| "Salona sığmayan Leningradlılar **açık pencerelerin** ve hoparlörlerin çevresinde toplandı" | [K] aynı | salonun dışa açılan pencereleri var; konser saatinde dışarı aydınlık (§0.2) |
| "Provalar **Haziran'da** Filarmoni salonuna taşındı"; provalar 10:00–13:00 | [K] aynı + [A] §2 | **kış prova planları (P02b–P06, P09c) Büyük Salon'da DEĞİL** (§0.1) |
| Beyaz Korint sütun dizisi, iki yanda galeri, kristal avizeler, kırmızı kadife koltuk | **[G]** (orkestra brifi; ru kaynak açılamadı) | iskelet olarak yalnız `konser`'de; ayrıntı nötr, sade |

### 0.1 Sonuç 1 — `prova` sütunlu salon değildir (ihlal önleme)
Kış provaları (Mart: P03b, P04b, P05, P06; P02b, P09c) bu salonda yapılmadı [K]; arastirma §5/115 de "prova mekânını genel anlatmayın" diyor. Bu yüzden **`prova` = nötr sahne kutusu**: sahne tahtası, sandalyeler, sehpa, davul+tabure, karanlık hacim. **Sütun, galeri, avize `prova`'da çizilmez** (yanlış yer/yıl okunur). Tek istisna P10b (Temmuz, artık Filarmoni): kadraj dışı pencere ışığı + en çok bir flu sütun kenarı (isteğe bağlı).
**Işık önerisi (tasarım onayına, sahibi tasarımcı):** tasarım §0 `prova` için "tepeden çalışma lambası" diyor. Kaynak, elektrik ışığının konser günü "ilk kez" yandığını ve provaların öğlen yapıldığını söylüyor → elektrik lambası P12'nin anlamını (ışık = olay) zayıflatır. **Öneri: `prova_isik: "pencere"`** — yüksek, kadraj dışı bir pencereden tek gün ışığı demeti (kış: soğuk-gül alçak güneş; Temmuz P10b: sıcak). Aynı geometri her iki seçenekte de çalışır (§5.2); varsayılan tasarım kararı gelene kadar `lamba`, kod iki modu da taşır.

### 0.2 Sonuç 2 — P12 "karanlık" tam karanlık değil
9 Ağustos, Leningrad: gün batımı ~21:00 [H, enlem 60°; doğrulanmalı], konser akşam (18:00 konuşma sonrası) [A]. Pencereler açık [K]. → P12 f0–30 **loş** (perdeli yüksek pencerelerden soğuk-mor gün), tam gece değil. Bu tasarım §2.5 notuyla ("avizeler sönükken de pencere boşluğundan gül kenar") uyumlu. Loş evrede pencere tek kaynaktır; dalgadan sonra avize grubu tek kaynak olur, pencere yalnız cam rengi kalır.

### 0.3 Sonuç 3 — lens: 24 mm yerine 35 mm öneriyorum (yönetmene, orkestra üzerinden)
[H] 24 mm (F 1080 px) ile Eliasberg ~118 px, davul ~25 px, çubuk ~27 px (telefonda 8–9 px). **35 mm (F 1575 px)** ile Eliasberg ~230 px, davul 38 px, çubuk 40 px; dikey kadrajda düşey görüş hâlâ 63° (avize + sütun + sahne + seyirci aynı karede). "Deep focus" ve geniş okuma korunur. Çekim kartı sahibi yönetmen; ben yalnız ölçüyü veriyorum.

---

## 1. SALON `konser` — duygusal amaç ve görsel dil
**Amaç (tek cümle):** Aylarca karanlıkta kalmış soğuk bir taş tapınak, ışık ona yeniden can verdiğinde bütün şehrin nefesini tuttuğu yere dönüşür.
- **Baskın şekil:** **dikey** (sütun gövdeleri, avize zincirleri) + sahneye **yakınsayan iki diyagonal** (sütun tabanları, sahne tahtası çizgileri) → dikey kadrajda "portal".
- **Ritim:** sütunlar eşit aralıklı (klasik düzen gerçekten düzenlidir; ızgara hissi ışıkla kırılır, aralıkla değil — §7 A13); avizeler iki sıra, dalga onları sırayla yakar = ritmin zamanda okunması.
- **Renk sıcaklığı:** loşta gece mavisi-mor (`#262a4e` → `#3e3b5c`); dalgadan sonra gül-altın hacim, gölgeler mor kalır (sıcak piksel ≥ %35).
- **Kontrast:** önde koyu, arkadan aydınlatılmış seyirci başları (kenar ışıklı siluet) ↔ ortada parlak sahne ↔ arkada buğulu, açık, düşük kontrastlı sütunlar. En parlak/doygun nokta: çubuklar (imza).
- **Boşluk:** sahnenin üstünde, iki avize sırası arasındaki havada (yazı bandı oraya düşer, §6.4).

## 2. SALON mimari kartı (`konser`)
| Madde | Tanım | Etiket |
|---|---|---|
| Dönem / üslup | 1830'lar Petersburg neoklasiği (bina 1839, Jacot); 1942'de savaş yılı: süs yerinde, bakımsız (sıvada lekeler, avize metali kararmış) | [K] tarih · [G] üslup ayrıntısı |
| Yapı tipi | Konser/balo salonu: tek büyük dikdörtgen hacim, uzun ekseni sahneye; zemin kotunda koltuk sıraları, uç duvarda yükseltilmiş sahne | [G] |
| Model ölçüleri (dünya m) | Nef (sütun eksenleri arası) **12 m** (u −6…+6); sütun arkasında galeri derinliği 3 m; sahne ön kenarı z 11, sahne derinliği 9 m (z 11–20), arka duvar z 30; tavan h 13 | [T] — gerçek ölçü bilinmiyor; nef duygu için hafif daraltıldı (dikeylik) |
| Sütun dizisi | İki yanda **serbest duran tam yuvarlak sütun** (pilastr değil), eksen aralığı **4 m** (z 8, 12, 16, 20, 24, 28), çap 1.0 m, kaide 0.6 m (kare plint + 2 halka torus), **düz (yivsiz) gövde** h 0.6–8.8, **Korint başlık** 1.2 m (h 8.8–10.0), sahne ucunda dizi arka duvar önünden döner (U) | [G] dizi ve başlık · yivsiz = nötr seçim [T] |
| Korint başlık (çizim tipi) | Gövde boynunda astragal halka → çan → **iki sıra yaprak** (yan görünüşte 5 yuvarlak loblu tümsek, alt sıra kısa, üst sıra uzun) → köşelerde **iki küçük kıvrım (volüt)** → **içbükey kenarlı abakus**. Akant damarı, rozet yok. Uzakta (çap < 70 px) yalnız çan + abakus silueti | [G] |
| Saçaklık | h 10.0–11.4: arşitrav (2 bant) + düz friz + korniş (0.4 m çıkıntı), korniş altında tarama; diş sırası yok | [G], sade [T] |
| Galeri | Sütunların arkasında, **h 5.0'de** taş korkuluk (balüstrad: kısa vazo biçimli babalar, ritim 0.3 m; uzakta düz bant), galerinin arka duvarında yüksek pencereler | [G] |
| Pencereler | Galeri dış duvarında, h 6–9.5, **dikdörtgen, düz lento**, söve 0.15 m; kemer çizilmez (tip doğrulanmadı; düz lento nötr). Konser: açık/perdeli, cam soğuk açık; savaş bantı, kum torbası yok | [K] pencere var · [G] konum/biçim |
| Tavan | h 13 düz, kenarda bir kaset şeridi (koyu sıcak çizgiler), göbek süsü yok | [G] nötr |
| Avize | İki sıra (u −3, +3), z 6/10/14/18/22 → **10 avize**; askı h 13→7.5 (zincir); gövde: merkez dikme + **3 halka katı** (üst ø0.9, orta ø2.2, alt ø1.4), her halkada 10/16/12 lamba noktası; halkalardan sarkan **kristal yok** (tasarım §1: damla ayrıntısı yok), yalnız alt katın altında 6 kısa düşey çizgi (sarkıt izi); metal koyu bronz-kahve | [A] "tüm avizeler yakıldı" · [G] biçim/sayı · [K] "sahne üstü ışıklar" = z 14/18 çifti sahnenin üstünde |
| Sahne | Yükseklik 1.0 m, ön yüz düz ahşap panel (koyu), tahtalar **z yönünde** (kameraya doğru) 0.12 m; arkada 3 basamak yükselti (h +0.4/+0.8/+1.2; z 15, 17, 19) — orkestra kademeleri | [G] kademe · tahta yönü [T] |
| Orkestra yerleşimi | Eliasberg u 0, z 12, 0.3 m podyum; yaylılar önde yay, nefesliler 2. kademe, **davul u +2.2, z 15.5, 1. kademe (h 1.6)**; ~30 oturan figür görünür (seed) | [T] |
| Koltuklar | Zemin kotunda sıra sandalye/koltuk, sıra adımı 0.9 m, orta koridor u ≈ −1.6; döşeme **sönük bordo-kahve** (C\* ≤ 20, kırmızı okunmaz) | [G] kırmızı kadife → tasarım §0 "kırmızı 0 piksel" ile sönükleştirildi [T] |
| Kameradan görünen (P12, h 1.9) | Görünür: sahne ön yüzü ve tahtası, orkestra, z ≥ 16 sütunlar (iki yanda 4'er), başlıklar, saçaklık parçası, galeri korkuluğu (z ≥ 16), arka duvar, z 10–22 avizeler, seyirci başlarının **arkası**. **Görünmez:** tavan yüzeyi (yalnız en üst 200 px'te kaset şeridinin alt kenarı), yakın sütunlar (kadraj dışı), sahnenin üst yüzü yalnız ince şerit (kamera sahne kotunun 0.9 m üstünde: tahta derinliği sıkışır), seyirci yüzleri (arkadan) | [H] |

## 3. Kamera ve izdüşüm (P12; tek dünya, LANTERN-ODA `KAM_*` yöntemi)
- F = 1575 px (35 mm, kısa kenar 24 mm), kamera **u −1.0, z 0**, sapma (yaw) +3° sahneye, koltuk sırası arası (arka sıra).
- **P12 crane + tilt:** f0 h 1.35 / eğim −1° → f96 h 1.9 / +3° → f208 h 2.3 / **+4° (en çok)**. Brifteki daha büyük tilt (≥ 7°) sahneyi y 1380'e, ön seyirciyi kadraj dışına iter → alt üçte bir boşalır [H]. Crane'in anlamı: f0'da kamera **seyirci başları arasında** (baş hizası 1.25 m), sahne başların ardında yarım görünür; yükselince sahne ışıkla birlikte açılır.
- Kaçış noktası / ufuk (eksen): f0 (540, 905) · **f96 (540, 1043)** · f208 (540, 1100).

| Nokta (f96) | Dünya (u, h, z) | Ekran (x, y) | Boyut |
|---|---|---|---|
| Sahne ön kenarı sol/sağ | (∓3, 1.0, 11) | (165, 1174) / (1024, 1170) | — |
| Eliasberg ayak / baş | (0, 1.3/3.05, 12) | (589, 1121) / (588, 892) | 230 px boy (%12) |
| Davul derisi (üst) | (2.2, 2.2, 15.5) | (780, 1012) | ø 38 px, çubuk 40 px |
| Sütun sol z16 / z28 taban–başlık | (−6, …) | x −48→171; taban y 1174→1117, başlık y 250→588 | çap 99→57 px |
| Sütun sağ z16 / z28 | (+6, …) | x 1136→848; başlık y 280→598 | |
| Avize z10 / z14 / z18 / z22 (sol·sağ) | (∓3, 7.5, z) | (149,173)·(1062,199) / (236,418)·(895,432) / (285,556)·(801,564) / (316,643)·(740,649) | ø 340 / 244 / 191 / 157 px |
| Galeri korkuluğu sol z16 | (−6, 5, 16) | (−39, 734) | |
| Arka duvar (u 0, z 30) h1–h12 | | y 1090–520 | |
| Seyirci başları z 3.6–3.9 | (−1.3/+0.9, 1.25) | (323,1332) / (1214,1302); omuz y 1400–1450 | baş ~95 px |
| Seyirci başları z 6–10 | seed | y 1150–1250 | baş 35–58 px |

## 4. Katmanlar 2.5D (P12; arkadan öne; z gerçek, paralaks bundan hesaplanır)
| # | Katman | z (m) | İçerik | Flu σ | Buğu (`bugu`, hedef `#b98a9e`) | Tarama |
|---|---|---|---|---|---|---|
| 1 | Tavan şeridi + arka duvar | 25–30 | kaset şeridi alt kenarı, arka duvar sıvası, dönen sütun dizisi, **galeri arkasında ayakta sıcak siluetler** (yüz < 60 px → `SiluetFigur40`, baş eğimleri farklı) | 4 | α .45 | yok (büyük yüzey) |
| 2 | Uzak sütunlar + saçaklık + galeri | 20–28 | 3 sütun/yan, korkuluk, pencere camı | 3 | α .30 | **korniş altı**, sütun gölge yüzü (uzak aralık 12 px) |
| 3 | Orkestra + kademeler + davul + yakın sütunlar | 13–19 | ~30 oturan, sehpalar, davul, sütun z16 | 1 (davul 0) | α .12 | sandalye altı, kademe ön yüzü (9 px) |
| 4 | Sahne ön + Eliasberg | 11–12 | sahne ön paneli, podyum, Eliasberg sırt | 0 (net düzlem) | — | kol altı, sahne ön paneli üst kenar gölgesi (7.5 px) |
| 5 | Seyirci sıraları | 5–10 | başların arkası (saç, ense, kulak, yaka farkı), seed'li boy ±4 cm, baş eğimi ±8° | 2–3 | — | yok (kenar ışığı yeter) |
| 6 | **Ön plan seyirci** | 2.4–4 | 3–4 baş-omuz, palto/üniforma yakası, biri kasketli (`#4a4d44`), kenar ışığı tepeden-önden | 6 | — | omuz gölgesi kısa tarama |
| 7 | **Ön plan avize altları** (köşeler) | 6–10 | yakın iki avizenin alt halkaları, sol-üst / sağ-üst köşe kırpılı | 4 | — | yok |
Atmosfer (katman 2–5 arası, dünyaya sabit): toz noktaları 48 adet (seed 7), avize havzalarının içinde yoğun (3×); ışık alan toz `#f0d2b8` α .5–.8, 2–4 px; yavaş düşey sürüklenme 6 px/sn, **dünyaya bağlı, kameraya değil**. Uzak hacimde 3 düz buğu bandı (tavan altı, galeri hizası, sahne üstü) α .18/.24/.30 `#b98a9e`.

## 5. Işık
### 5.1 `konser` — tek kaynak: avize grubu (P01, P12, P14, P15)
- **Tek tanım:** 10 avize = nokta kaynak listesi `AVIZE[i] = {u ∓3, h 7.5, z 6…22, yanik_i}`; gölge vektörü = yanan avizelerin ağırlık merkezi (P12 sonunda ≈ u 0, h 7.5, z 14) → `golgeCokgen`. Havuz, kenar ışığı, tarama, gölge buradan; elle konmaz.
- **Avize çizimi:** metal `#5a4638` (kenar `#e6b5a0` 2 px ışık yönünde); lamba noktası çekirdek `#efd0b6`, halka ışığı `#e8c9a4`; `Hale` 2 disk r = 0.55/0.95 × avize çapı, α .45/.22, **blursuz**; tavanda her avizenin üstünde elips sıcak leke (`#c8a98e` α .35).
- **Havuzlar (3 basamak, net kenar):** zemin/sahne/sütun yüzünde avize altına `#efd0b6` / `#e4bc98` / `#c8a98e`; sahne havuzu en büyük (z 14/18 çifti; tahtada elips 700×180 px f96).
- **Sütun:** ışık yüzü (sahneye bakan iç yarı) `#e6cfba`, orta `#b8a3a6`, gölge yüzü `#6d6384`, derin `#3e3b5c`; ışık-gölge sınırı **net** (yumuşak gradyan yok), sınırda 2 px kenar ışığı `#f0c4a8`.
- **Seyirci (arkadan ışık):** başın/omzun üst konturunda kenar ışığı `#f0c4a8` 2–3 px; yüz kameradan uzakta, ense/kulak sıcak gölge `#8f7360`; gövde siluet `#4f4668`/`#5a5068`/`#4f5a62` (seed ±3 L\*).
- **Gölge yönü (ekran):** sahne figürleri: kısa, kameraya doğru (aşağı), hafif dışa; seyirci: ön plana doğru, kadraj altına.
- **P12 dalga zamanlaması (f, plan içi; sahne planı 30→96):** loş evre f0–30 (pencere tek kaynak, `#a9b7cc` camda + galeri korkuluğunda gül kenar α .5). Avize çiftleri: **z6 f30 · z10 f43 · z14 f56 · z18 f69 · z22 f80**; her avize: 4 kare şeftali-kor filaman (`#d89a7a`, ≤ 6 px noktalar; Çiçero `lamba.filaman` mantığı) → `yanik` 0→1 8 karede, havuz kaynaktan **radyal büyür (fade yok)**. **f80–96: sahne havuzu davula doğru kayar ve kasnakta biter** — f90'da kasnak üst yarısında kenar ışığı yayı `#e6b5a0`, f92–96 çubuklarda kenar `#FBDFA0` + tek spekülar hilal `#FFF1CC` (tasarım §3). Çubuk ışık yaymaz, hale yok.
- Eliasberg kolları f90–132 (sahne planı): manşet kayması bu ölçekte okunmaz (el ~25 px) → `kit_eksik` değil, **okunurluk notu**: manşet P02b/P10b yakınlarında gösterilir, P12'de yalnız kol siluet "Y".

### 5.2 `prova` — tek kaynak (§0.1 öneri)
| Mod | Kaynak | Geometri | Havuz / huzme |
|---|---|---|---|
| `pencere` (önerilen) | kadraj dışı yüksek pencere, sol-üst; kış güneşi alçak, gül-soğuk | ışık vektörü (u +0.55, h −0.42, z +0.72) normalize; P10b yaz: daha dik (h −0.62) ve sıcak | huzme: 4 kenar ışını + iç ışın 2.5° (LANTERN-ODA gravür huzmesi), dolgu α .10; zeminde paralelkenar havuz 3 basamak (`#efd0b6`/`#e4bc98`/`#c8a98e`), ≥ kadrajın %18'i; huzmede toz 30 nokta |
| `lamba` (tasarım varsayılanı) | asılı tek ampul + teneke koni (h 4.2 dünya, kadraj üstünde kablo görünür) | ELÇİ-ODASI `lamba` V/koni; yarı açı 32° | sahne tahtasında elips r ≈ 2 m, 3 basamak |
Her iki modda: sandalyeler karanlıkta, yalnız ışık yönündeki kenar `#c9a0a6`; hacim `#34385a`/`#4a4d72`/uzak `#6a6488` (tasarım §2.2); sütun/avize/galeri **yok**; arka plan = karanlık hacimde 2 düz buğu bandı (`#6a6488` α .25/.4) + seed'li boş sandalye siluetleri (derinlik). P05 nefes buğusu `#d8d2dc` α. P09c havuzu tasarım gereği sıcak (iyileşme).

## 6. Malzeme ve doku (yüzey başına ≤ 3 doku katmanı; seed sabit, kaynamaz; yalnız ışık değişir)
| Yüzey | Malzeme | Doku tarifi | Kod yöntemi | Parametre |
|---|---|---|---|---|
| Sütun gövdesi | sıvalı/boyalı taş, beyaz [G] | ışık yüzünde 3–5 soluk leke + kaide üstünde kir bandı (0.4 m, koyu %8); yiv yok | kâğıt üst katmanı + `Desen` leke | leke α .08, seed `sutun_i` = 300+i |
| Korint başlık | alçı/taş | yaprak lobları kontur; çan içi gölge | `Tarama` (yalnız gölge yüzü), kontur `ink(dolgu)` | yakın 7.5 px / uzak 12 px; çap < 70 px'te tarama yok |
| Korniş/saçaklık | taş | alt yüzde tarama, üst kenarda kenar ışığı | `Tarama`, `KenarIsik` | 9 px, kalınlık 1.6 |
| Galeri korkuluğu | taş babalar | yakın: vazo siluet ritmi 0.3 m; uzak: düz bant + 1 çizgi | LOD (`lodSec`) | baba < 8 px ise bant |
| Avize | kararmış bronz + cam | metal kenarda 1 parlama noktası/halka; cam yok, lamba noktaları | düz şekil + `Hale` | nokta ø 4–9 px (ölçekle) |
| Sahne tahtası | ahşap | tahta derzleri z yönünde (VP'ye yakınsar), %20 tahtada damar çizgisi, cila aşınması havuz merkezinde açık | çizgi listesi seed `tahta` 1942 | derz 2 px `#5b5575`, damar α .15 |
| Sahne ön paneli | koyu ahşap panel | 3 m'lik pano bölmeleri, üst kenar gölgesi | düz + `Tarama` yalnız üst 0.15 m | 7.5 px |
| Koltuk/sandalye | ahşap çerçeve + döşeme | döşeme sönük bordo-kahve ışık `#8a6a68`, gölge `#4a3a44`, derin `#3e2f38`; çerçeve `#3a3550` | düz; arkalık üst kenarı kenar ışığı | C\* ≤ 20 |
| Duvar/arka sıva | sıva `#c9b3a4` (ışık) / `#5b5575` (gölge) | kabarma lekesi 4–6, savaş nemi izi (alt kenar) | `Desen` + buğu | α .10 |
| Pencere camı | eski dalgalı cam | 2 eğri yansıma çizgisi, cam `#a9b7cc` (loş evre) | düz | — |
| Kâğıt üst katmanı (tüm sahne) | kanal | lif + gren + mor vinyet | `ArsivKatmani litografi` | lif .14, gren .10, vinyet α .22 |
Kontur: dekor 3 (uzak) – 6 (yakın) px, `ink(dolgu)`, round join; < 1.5 px çizgi çizilmez (360 px kuralı). Tarama ≥ 2 px, tek açı (ışık vektöründen), çapraz yalnız ≤ 120 px gölgede.

## 6.4 Yazı ve güvenli alan (P12)
Üst bant y 240–400 "Filarmoni Büyük Salonu" (yazı katmanı): avize z14 çifti (x 236/895, y 418–432) bandın **altında ve kenarlarında**; yazı şeridi x 250–830 içinde kalmalı (font metriğiyle ölçülür). Üst %11 (y < 220): yalnız yakın avize altlarının flu kenarı + tavan şeridi, ayrıntı yok. Alt %22 (y > 1500): ön plan seyirci omuzları flu (σ 6), bilgi taşımaz ama boş değil.

## 7. GORSEL-RECETE işaret tablosu (SALON)
| Madde | Durum | Nasıl |
|---|---|---|
| A1 tek vektör, `golgeCokgen` | ✔ | konser: avize grubu ağırlık merkezi; prova: pencere (ya da lamba) |
| A2 litografi gök | ✔ (iç mekân karşılığı) | gök yok; **tavan/hacim 5 düz basamak** (üstten `#262a4e`→`#3e3b5c`→`#4a4062`→`#6d6384`→`#b98a9e` buğu) + basamak sınırında 2 ince çizgi; pencere camı da düz ton |
| A3 blursuz hale, 2–3 basamak havuz | ✔ | §5.1 her avize 2 disk; havuz 3 basamak |
| A4 derinlik ≥ 5 | ✔ 7 katman | §4 |
| A5 buğu | ✔ | 3 bant + katman başına α .12–.45 |
| A6 derinlik bulanıklığı | ✔ | σ 0–6 (§4) |
| A7 kenar ışığı | ✔ | seyirci üst konturu, sütun ışık-gölge sınırı, avize metali, Eliasberg omzu |
| A8 sıcak–soğuk + ölçüt | ✔ hedef | konser sıcak ≥ %35, p95 L\* ≥ 85; prova ≥ %14 / ≥ 75 (tasarım §2.7); eleştirmen ölçer |
| A9 `Tarama` bileşeni | ✔ | yalnız korniş altı, başlık gölgesi, kademe ön yüzü, sandalye altı, kol altı |
| A10 `RenkKaydi` · A11 `KonturTitreme` · A12 `litografi` | ✔ | `<SahnePlaka arsiv="litografi" titreme renkKaydi>` |
| A13 seed'li düzensizlik | ✔ (bilinçli sınır) | **sütun aralığı düzenli kalır** (klasik düzen; düzensizleştirmek dönem yanlışı); düzensizlik: her sütunun ışık payı (avize uzaklığı), leke yeri, seyirci boy/eğim/giysi, orkestra duruşu, avize yanma faz farkı ±2 kare, toz |
| B1 sıra | ✔ uyarlama | iki sütun dizisi = "sıra"; seyirci ve orkestra sıraları seed'li |
| B2 cephe katmanları | ✔ uyarlama | kaide + gövde + başlık + saçaklık (arşitrav/friz/korniş) + galeri korkuluğu |
| B3 pencere ritmi | ✔ kısmî | galeri pencereleri sütun aralığıyla hizalı; ışıklı/karanlık ayrımı yok (gün ışığı) |
| B4 çatı profili · B5 çatı penceresi · B6 baca | ✘ `lint` | `lint: {izin:["B4","B5","B6"], not:"iç mekân; çatı/baca görünmez"}` |
| B7 saçak altı gölgesi | ✔ | korniş altı + galeri korkuluğu altı + sahne ön paneli üstü |
| B8 LOD | ✔ | başlık: çap ≥ 70 px tam (yaprak lobları + volüt), 40–70 px çan+abakus, < 40 px dikdörtgen; korkuluk babası < 8 px → bant |
| B9 kontur dili | ✔ | `ink(dolgu)`, clamp(1.5, 6) |
| B10 tarama yeri | ✔ | yukarıdaki yerler; sütun gövdesi düz yüzeyinde tarama yok |
| C mekân seçimi | uyarı | SALON 11 plan; P12 bölümün en derin iç karesi (z 2.4–30). Prova planlarında derinlik: buğu bantları + karanlıkta sandalye siluetleri + huzme (pencere modu dış derinliği ışıkla taşır); P10b'de pencere açıklığı (tasarım §0.1 C çözümü) |

## 8. Dokunuş ve eylem yüzeyleri (sahne planı z/u ile)
| Plan | Yüzey | Yer |
|---|---|---|
| P01/P15 | davul derisi + kasnak (vida flu ön plan) | konser, yakın; deri merkez (540, 980), kasnak y 1180–1290 |
| P06 / P09c | sahne tahtası (çubuk düşer, yuvarlanır) + tabure ayağı (tık) | prova; tahta düz, derzler yuvarlanma yönüne dik değil (çubuk derzde takılmaz), tabure u +2.2 z 15.5 eşlenik |
| P02b / P10b | nota sehpası tablası (y ≈ 900) | prova; sehpa önünde boş tahta, pencere modunda tabla ışık şeridinin içinde |
| P12 | sahne havuzu → kasnak (dalganın sonu) | konser (780, 1012) |
| P14 | sıra arkalıkları + koltuk değneği teması (zemin) | konser seyirci zemini: koridor halısı yok [G], ahşap parke `#6d5a5c`/`#3e3448` |
| P04b | tabure (oturma), sandalyeler | prova |

## 9. Motion için çizim notları
- **Türetilecek:** `LanternOda` (`KAM_*` tek dünya + iki kamera yöntemi, gravür huzme, sırttan baş-omuz figürleri), `ElciOda` `lamba` (V/koni, `yanik` radyal, `filaman`), `catiDekor`/`montmartreDekor` (`Hale`, `Flu`, `bugu`, kenar ışığı), `SiluetFigur40 {oturan}` (orkestra/galeri uzak), `Kukla` (Eliasberg sırt), `doku/Tarama`, `SahnePlaka`.
- **Yeni ortak modüller (öneri, `src/kit/gorsel/` hedefi):** `Sutun {tip:"korint", cap, h, isikYon, lod}` · `Saclik` (arşitrav/friz/korniş) · `Avize {katlar, yanik, filaman, metal}` · `IsikDalgasi {kaynaklar[], bas, aralik}` (avize sırasını ve havuz kaymasını tek zaman çizelgesinden süren sıralayıcı) · `SeyirciSirasi {z0, adim, sayi, seed, arkadan:true}` · `SahneTahtasi {vp, derz, seed}` · `TozAlani {seed, dunyaSabit:true}`. Hepsi BODRUM/başka salonlarda yeniden kullanılır.
- Kamera hareketi (crane/tilt) **dünya noktalarını §3 izdüşümüyle** yeniden hesaplar; sahte ölçekleme yok, toz ve seed kameraya bağlanmaz (Paris P07 "şehir titriyor" dersi).
- Ön plan seyirci başları crane sırasında aşağı kayar (paralaks doğal); f208'de en yakın baş y ≈ 1500–1700 → kadrajda kalır.
- Davulcu (saklanan): u +2.2 z 16 oturur; **önünde bir nefesli çalgıcı (z 15, u +1.8) ve nota sehpası** gövdesini örter; yalnız kalkık çubuk uçları görünür. Yüz ≤ 25 px zaten okunmaz, ama örtme güvenlidir.

## 10. P12 yön karesi (kod öncesi kullanıcıya; f96 "dalga kasnakta bitti")
**Kamera:** arka-orta sıra, 35 mm, h 1.9 m, hafif yukarı (+3°), sahneye 12 m. Dikey kadraj.
**Ne görünür (yukarıdan aşağı):**
1. **y 0–220:** tavanın koyu sıcak kaset şeridi; sol-üst ve sağ-üst köşede iki yakın avizenin **flu** alt halkası, sıcak noktalarla.
2. **y 170–650:** iki sıra avize sahneye doğru küçülerek iner (ø 340 → 157 px); her birinin çevresinde iki net kenarlı hale diski. Sol ve sağ kenarda **beyaz Korint sütunlar** sahneye doğru dizilir (4'er; başlıklar y 250–600); sütunların sahneye bakan yüzü gül-krem, dış yüzü mor; korniş altında tarama; aralarda galeri korkuluğu ve arkasında ayakta duran sıcak, flu insan siluetleri, uzak camda soğuk akşam.
3. **y 520–1100:** buğulu, açık, düşük kontrastlı arka duvar; kademelerde ~30 oturan çalgıcı (profil siluetler, baş eğimleri farklı); **ortada Eliasberg sırtı** (x 589, y 892–1121), iki kolu "Y" biçiminde kalkmaya başlamış, omuzlarında kenar ışığı; sağda davul (780, 1012): sahne havuzunun son ucu kasnağın üstüne oturmuş, kasnakta gül ışık yayı, **iki bal-ten çubuk ucu sahnenin en parlak ve en doygun noktası**; davulcunun gövdesi önündeki çalgıcı ve sehpanın arkasında saklı.
4. **y 1120–1180:** sahne ön kenarı, tahta çizgileri kaçış noktasına (540, 1043) yakınsar, üstte geniş sıcak havuz.
5. **y 1150–1920:** seyirci başlarının arkası, sıra sıra (saç, ense, kulak, yaka, bir kasket); en önde 3–4 baş-omuz flu, üst konturları sıcak kenar ışığıyla; alt köşelerde koltuk arkalıklarının sönük bordo-kahvesi.
**Işık anı:** dalga salonun arkasından (kamera tarafı) sahneye ilerledi ve tam şimdi durdu: yakın avizeler tam yanık, en uzaktaki çift (z 22) yeni yanmış (hale diski hâlâ büyüyor), havuz kasnakta bitti. Gölgeler mor, kısa, kameraya doğru.
**Atmosfer:** avize halelerinin içinde sıcak toz noktaları; galeri hizası ve sahne üstünde iki düz gül-mor buğu bandı.
**Dil:** Paris'in gravür-litografi dili — düz katmanlı paneller, net kenarlı ışık diskleri, mor tarama, kâğıt lifi ve greni; renk kayması 1.5 px.
**Paris'in yanına konsa:** sıcak–soğuk karşıtlığı (gül-altın ışık / mor gölge) ve buğu derinliği Paris alacakaranlık karesi düzeyinde; fark: iç mekân, sonsuz gök yerine sütunların ritmi. Geri kalma riski: §11.
(Gemini istenirse aynı tarif prompt olarak kullanılabilir; **yalnız kullanıcı onayıyla**, maliyet bölüm bütçesine sayılır.)

## 11. Kritik riskler
1. **Kaynaksız iskelet (sütun, galeri, avize biçimi) [G]:** arastirma §5 "çizimde kullanma" diyordu; orkestra "genel bilgi" etiketiyle izin verdi. Yön karesi kullanıcıya bunu açıkça yazarak gitmeli. Doğrulama: ru.wikipedia "Большой зал филармонии" / Filarmoni sitesi (bu sunucudan ru.wikipedia 403).
2. **`prova` = Büyük Salon değil [K]:** sütunlu salon kış provasında çizilirse yanlış yer okunur. `prova`'da iskelet yok (§0.1).
3. **Prova ışığı (elektrik lambası) kaynakla çelişebilir [K]:** tasarımcı kararı gerekli (`pencere` önerildi).
4. **P12 imza okunurluğu:** 35 mm'de bile çubuk 40 px (telefonda 13 px < 20). İmza burada "en parlak nokta" olarak çalışır; kimliği P01/P06/P09c'de kurulmuş. Önerilen lint (yönetmen yazar): `lint: {izin:["okunurluk_cubuk_P12"], not:"WS; kurulum P01/P06/P09c; dalga sonu havuzu ≥%10 genişlik taşır"}`. 24 mm'de kalınırsa Eliasberg 118 px'e düşer, bu da kabul edilmez.
5. **Tilt sınırı:** +4° üstü ön plan seyirciyi kadrajdan atar, alt üçte biri boşaltır.
6. **Kırmızı koltuk:** döşeme C\* ≤ 20 tutulmazsa tasarım "görüntüde kırmızı 0 piksel" kuralı bozulur; eleştirmen ölçer.
7. **"Izgara" eleştirisi:** sütunlar gerçekten düzenli; düzensizlik aralıkla değil ışık/örtme/seyirci ile verilir — eleştirmen bunu kusur saymamalı (gerekçe A13 satırı).
8. **Loş evre tek kaynak geçişi:** f0–30 pencere, f30 sonrası avize; iki kaynak aynı anda havuz düşürmez (pencere yalnız camda kalır).
