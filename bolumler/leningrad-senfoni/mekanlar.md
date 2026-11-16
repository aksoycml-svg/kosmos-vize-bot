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

---
---

# Mekân Şartnamesi — 2. tur: BODRUM · SOKAK-LG · HARİTA `leningrad` · SALON `prova` (mekân sorumlusu, 2026-11-16)

Girdi: yukarıdaki SALON bölümü + kabul edilen SALON kalibrasyonu (tur-4 `elestiri.md` 7/10, `olcum.md`), `salonDunya.ts` `LG` paleti, `tasarim.md` §0/§1/§2.3–2.6/§3/§5, `sahne-plani.md` P02a–P13, `dokunuslar.md` LS-D1/D3/D4/D5/D7, `arastirma.md` §2A/§4/§5, `GORSEL-RECETE.md`, `KATALOG.md` (HARITA, `kamera25d.ts`). Gemini kullanılmadı. Etiketler aynı: [K]/[A]/[G]/[T]/[H].
Ekran px 1080×1920. **Hesaplar [H] bu turda `kamera25d.ts` izdüşüm formülüyle betikle yapıldı** (kontrol render'ı değil; motion ilk karede ölçüp bu tabloya geri yazar).

## 12. Bu turun ortak kuralları (SALON tur-1…4 derslerinden; dört mekânın hepsine)
| # | Kural | Neden (kanıt) |
|---|---|---|
| O1 | **Gri yok:** gölge/orta tonlar C\* ≥ 16 (mor-lacivert h 285–305° ya da sıcak kahve h 40–60°); C\* < 10 yalnız kâğıt ve kar çekirdeği. Kontur `ink(dolgu)` mor aileden, tarama rengi **`#2b2a4f`** (L 19, C\* 25) — `#2f2d46` (C\* 17) yerine. | tur-2 D1 "gri = doygunluk"; tur-4 C\* medyanı mürekkep pikselleriyle düştü |
| O2 | **Flu yok, net çizgi:** derinlik = buğu tonu (`bugu`, α ≤ .55) + kontur LOD (6→3 px) + tarama aralığı (7.5/9/12) + ölçek. Gauss bulanıklığı yalnız **rack focus / makro** planlarında (P03a, P08-2), σ ≤ 2.5 px, kontur görünür kalır. | tur-3/4 "ön plan flu → karton" kararı; A6 bu anlamda uygulanır (`lint` yok, karşılığı buğu) |
| O3 | **Hale/havuz C\* ≥ 18** (screen rengi `#e0a070` ailesi, SALON tur-4 düzeltme 1); opak "çıkartma" leke yok. | tur-4 düzeltme 1 |
| O4 | **Kemer yalnız kartta yazılı yerde.** Işık havuzu/leke kemer biçimi almaz (elips `ry` ≤ .5 rx ya da düz bant). | tur-4 düzeltme 2 |
| O5 | Kamera: BODRUM/SOKAK-LG **`kamera25d.ts`** (`F = mm × 30`; dolly_zoom türetilmiş). **Dikkat:** SALON `salonDunya` 35 mm = F 1575 (24 mm kısa kenar); `kamera25d` 35 mm = F 1050. Bu belgede mm her zaman `kamera25d` sözleşmesindedir. | iki sözleşme karışırsa ölçek %50 kayar |
| O6 | `<SahnePlaka arsiv="litografi" titreme renkKaydi>` + şablon içi baskı katmanı (tur-4: RenkKaydi 2.2/1.5, lif multiply α .12, sabit gren overlay α .14). Seed sabit, dünyaya bağlı. | SALON tur-4 kabul edilen dil |
| O7 | Saygı (morg, kış): gösteri yok, sarsıntı 0, kadavra/ayak/yüz yok, ölü taşıma yok. | CLAUDE.md "Askerler ve şehitler", tasarım §4 |

---

## 13. BODRUM — Radyo Evi bodrumu, geçici morg (P07, P08-1/2/3, P09a, P09b)

**Duygusal amaç:** Yukarıdaki dünyadan gelen tek ince ışık çizgisi, karanlıkta sıralı yatan ölülerin arasından bir yaşayanı bulur.
**Görsel dil:** baskın şekil **diyagonal** (merdiven, ışık şeridi) + **dikey** (kapı yarığı, boru, Eliasberg) · ritim: basamaklar (ışıkta kırık zikzak) ve duvar dibindeki örtülü biçimlerin sırası (seed'li aralık) · sıcaklık: %90 soğuk mor-lacivert, %10 tek sıcak çizgi · kontrast: en yüksek kare-içi kontrast (L 19 ↔ 86) yalnız çizgi boyunca · boşluk: merdiven boşluğunun üstündeki karanlık (kapı yarığı orada parlar).

### 13.1 Mimari kart
| Madde | Tanım | Etiket |
|---|---|---|
| Bina | Radyo Evi, Malaya Sadovaya / İtalyanskaya köşesi; 20. yy başı çok katlı kâgir yapı. Yapım yılı, mimar, bodrum kuruluşu bu oturumda kaynaklanmadı | [A] yer (Kantor/Fontanka) · [G] bina ayrıntısı, **doğrulanmalı** |
| Bodrum tipi | **Yarı bodrum** (Petersburg kâgir yapılarında yaygın): zemin kotu sokaktan ~1.8 m aşağı; tek kollu düz merdivenle koridora bağlanır | [G] tip · [T] ölçü |
| Oda | Dikdörtgen, eni 7 m (u −3.5…+3.5), derinlik kameradan arka duvara 3 m (z 0…3); **arka duvarın solunda** derin yan bölme (u −3.5…−0.7, z 3…7.5) = örtülü biçimlerin yattığı yer; arka duvar ortasında merdiven boşluğu | [T] |
| Tavan | **Düz**, h 3.2, sıvalı; 2 enine kalın kiriş bandı (0.35 m, z 1.0 ve 2.6); **tonoz/kemer çizilmez** (Prusya tonozu olasılığı var ama doğrulanmadı ve kemer okuması riskli, O4) | [T] nötr |
| Duvar | Sıva; **alt 1.2 m koyu yağlı boya şeridi** (kurum yapısı lambri boyası) + üst açık sıva; şerit üst kenarında ince çizgi (ritim, ufuk referansı) | [G] dönem kurum içi, doğrulanmalı; nötr |
| Merdiven | Tek kollu, **10 rıht × 0.18 m**, basamak derinliği 0.28, eni 1.4 (u −0.7…+0.7); ilk rıht z 3.0, sahanlık kenarı z 5.52, sahanlık z 5.52–6.4, h 1.8. Basamak: taş/beton, burun yuvarlatılmış, ortası aşınmış (çukur) | [G] tip · [T] ölçü |
| Merdiven boşluğu | İki yan duvar (u ±0.7); oda tarafında **düz lento** (kiriş) h 3.2, z 3.0 — "portal" çerçeve; boşluk tavanı merdiven eğimine paralel, basamak burnundan 2.3 m yukarıda | [T] |
| Tırabzan | Sol duvarda tek **boru tırabzan** (ø 4 cm, duvar kelepçeli, h 0.9 basamak burnundan) | [T] nötr |
| Kapı | Sahanlıkta, arka duvar z 6.4: **tek kanat ahşap, dikdörtgen**, 0.9 × 2.1 m (h 1.8–3.9), **dışa (koridora) açılır**, menteşe solda (u −0.45), kilit tarafı sağ (u +0.45); düz kasa, üst pencere yok, 4 dolgu pano. Eliasberg içeri girip kanadı kendine çeker → **10 cm yarık kilit tarafında** (u +0.40). P09b taşıyıcı sırtıyla **dışa iter** (sahne planıyla tutarlı) | [T] |
| Döşeme | Beton/taş plak, nemli, çatlak; derzsiz düz (tarama yok) | [T] |
| Tesisat | Tavanda 3 koyu boru + 1 kablo demeti (kelepçeli), merdiven boşluğuna doğru yakınsar; sağ ön köşede **düşey boru + vana çarkı** (ön plan, P07); tavanda **sönük çıplak ampul** tel kafesli (elektrik yok → ışık vermez; kaynak sayılmaz) | [T] nötr; sönük ampul = [A] "elektrik kıt" ile tutarlı |
| Morg düzeni | Yan bölmede (u −2.0…−3.0, z 3.6–7.0) **5 örtülü biçim**, duvara dik, zeminde tahta/sedye üstünde, aralık 0.75–0.95 m (seed 421), boy 1.55–1.85; örtüler düzgün, kenarları yere iner; **ayak/el/yüz yok** | [A] "geçici morg" · [T] düzen, saygı |
| Aydarov'un sedyesi | Oda içinde, merdiven dibinin solunda: **iki alçak ahşap sehpa üstünde sedye**, u eksenine paralel, merkez (−0.3, —, 2.2), boy 2.0 (u −1.3…+0.7), en 0.55 (z 1.93–2.47), bez üstü h 0.78; sehpalar u −1.15 / +0.55. Örtü baştan kalçaya; **sağ el örtü kenarından dışarıda, yakın kenarda** (−0.42, 0.82, 1.95), avuç aşağı, parmaklar kenardan sarkar | [T] (tasarım §5 sedye + örtü; "sedye ayağı" = sehpa ayağı) |
| Kameradan görünen | P07 (alçak, h 0.45): merdiven, lento altı, kapı + yarık, tavan boruları, sedye, yan bölmede örtüler, ön sağ boru; **görünmez**: kapının ardındaki koridor (yalnız yarıktan ışık), basamak üst yüzleri yalnız ince şerit (kamera basamak kotunun altında). P08-3 (h 1.12): merdivenin alt yarısı, yarık, yan bölme; tavan kadraj dışı | [H] |

### 13.2 Tek ışık kaynağı — kapı yarığı (P07, P08, P09a) → kapı açık (P09b)
**Tek tanım (elle konmaz):** koridorda yüksek pencere = nokta kaynak **S (0.9, 4.6, 9.0)**; açıklık = kapı yarığı (u +0.40, h 1.8–3.9, z 6.4, genişlik `aralik_m`). Her ışınlı yüzey = S'den açıklığa atılan ışın demetinin ilk çarptığı yüzey (`golgeNokta` mantığı). Işık levhası neredeyse düşey bir düzlemdir: **u = 0.40 − 0.192·(6.4 − z)** (sedyede u ≈ −0.42).
Türetilen ışık yolu [H] (motion aynı formülden üretir, tablo kontrol içindir):
| Yarık yüksekliği h | Eğim | Çarptığı yer |
|---|---|---|
| 1.8–1.95 | 1.08–1.02 | sahanlık zemini (kapının dibinde kısa üçgen) |
| 1.95–2.68 | 1.02–0.74 | **basamaklar**: her basamakta basamak yüzünde parlak kısa parça + rıhtta kısa dikey parça → kırık **zikzak** (merdiveni okutan imza) |
| 2.68–3.0 | 0.74–0.62 | oda zemini z 2.8→1.5 (sedyenin altından geçer) |
| 3.0–3.3 | 0.62–0.50 | sedye: örtü üstünde **enine bant** + **el** (h 3.21) |
| 3.3–3.9 | 0.50–0.27 | sedyenin üstünden aşar, zeminde kameraya doğru uzayan çizgi (z 1.5 → −1.9), ön duvarda biter |
Şerit genişliği: yarıkta 0.10 → sedyede ~0.07 m (eğik kanat kenarı + kaynak boyu), kenar **net**.
**Basamaklar (A3):** çekirdek `#efd0b6` · orta `#e4bc98` · dış `#c48e74` (L 64, C\* 28, h 52); çekirdek şeridin ortası %40'ı, dış her yana +0.04 m. Etraf "yansıma" (bounce) yalnız iki yerde, düz şekil: **merdiven boşluğu üst duvarları** `#a07862` (L 54, C\* 22) yarıktan 1.5 m'ye kadar ve **sedye çevresinde zemin** `#94705e` elips (rx 1.4, ry 0.5 rx). Bu ikisi sıcak piksel kaynağıdır (§13.9 risk 1).
**Atmosfer ışıkta:** levha boyunca toz (seed 707, 40 nokta, 3–5 px `#f0d2b8`, yalnız levhanın içinde görünür; dışarıda 0); düşey sürüklenme 4 px/sn, dünyaya bağlı. Levha kameraya kenarından bakıldığında (P08-3) tozlar **tek ince ışıklı çizgi** okutur.
**Gölge:** her nesnenin levhadaki gölgesi S'den türer (Eliasberg merdivende inerken levhayı keser → çizgi basamaklarda kopar, gölgesi zikzakta yürür: P07 temas kanıtı). Gölge rengi `#2b2a4f` α .8.
**Kenar ışığı:** yalnız levhaya değen kenar (saç, kulak, omuz, örtü kıvrımı, sedye sırığı): `#e6b5a0` 2–3 px.
**P07 kapanma:** `aralik_m` 0.55 (giriş, geniş huzme) → 0.10 (f24–54, menteşe teması f54); huzme **kaynaktan daralır**, fade yok. **P09b açılma:** 0.10 → 0.9 (f282, menteşe), aynı S: huzme genişleyip merdiveni ve kapıyı doldurur, gök ve koridor duvarı kapıdan görünür (koridor duvarı `#d8b8a4`, pencere ışığı `#f0d0bc`); bu tek kaynak değişimi değil **aynı kaynağın açıklığının** büyümesidir.

### 13.3 Kameralar (`kamera25d`; dünya x=u, y=h, z) [H]
| Plan | Konum C (m) | pan / tilt (°) | lens | Kilit ekran noktaları |
|---|---|---|---|---|
| **P07** | (0.70, 0.45, −0.80) | −6 / **16 → 3** (pan down f60→126, inout) | 35 mm (F 1050) | f0: kapı y 785–1059 (x 541–605), lento y 588, Eliasberg sahanlıkta baş y 805 · f126: kapı y 525–819, lento y 291, Eliasberg (sedye yanında, u −0.75 z 2.8) baş (238, 733) ayak (243, 1141), sedye x −100…545 y 848–1168, örtüler x −20…235 y ~1025 |
| P08-1 MS | (0.55, 1.50, 0.20) | −20 / −8 | 35 mm | Eliasberg boy ≥ %40; sehpa ayağı + çubuk teması (f42) y ≤ 1250 |
| **P08-2** insert | (−0.62, 1.55, 2.80) (Eliasberg'in omzu üstü, sedyenin karşı kenarı) | 167 / −40 | 100 mm (F 3000), σ ≤ 2.5 yalnız zemin | el (540, 960), 0.19 m → **~500 px (%26)**; zemindeki ışık çizgisi sağ-üstten kadraj dışına uzar |
| **P08-3** dolly zoom | konu = yüz **(−0.52, 1.12, 2.15)**; C0 (−0.52, 1.12, 0.91) → C1 (−0.52, 1.12, 1.46) | 0 / 0, `merkez [540, 780]` | **50 → 28 mm** (`dolly_zoom {konu}` F türetilir: 1500 → 840) | yüz (540, 780) **290 px sabit (%15)** · el (684, 1213) → (711, 1294), 360 → 412 px büyür · yarık (791, 20–594) → (696, 307–664): **kapı küçülüp uzaklaşır** · basamak 5 (783, 883) → (704, 849) · örtüler x 104 → 266 · çubuk (sedye altı, ışık şeridinde) y 1777 → 1620 · sedye yakın kenarı y 1280 → 1388 |
| P09a truck | P08-1'in 1.2 m solu, h 1.4 | 0 / −4 | 35 mm | sedye yanlamasına; iki taşıyıcı yüzlü (yüz ≥ 60 px) |
| P09b | **P07 ile aynı C** | −6 / 3 → 18 (tilt up, sedyeyi izler) | 35 mm | kapı f282'de açılır; sedye f300 ışığa girer |
P08-3 geometri notu: Eliasberg sedyenin uzak kenarında, gövdesi levhanın solunda (u −0.75), başı sedyenin üstüne eğik; **yüzü levhanın 0.1 m solunda** → yüz ön cephesi gölgede (ışık arkadan gelir; yüz ışık levhasıyla aydınlatılmaz, fizik), sağ yanak/kulak/saç kenarında levhadan **kenar ışığı**, çene altında ve göz akında örtü bandından **sıcak yansıma** (`#a07862` yumuşak değil, 2 basamak düz alan). Gövdesi levhayı kesmez → el ışıkta kalır (kontrol: el ışık şeridinin içinde mi, her karede).

### 13.4 Katmanlar 2.5D (P07; P08-3 için ayrı sütun)
| # | Katman | z (m) | İçerik | Renk (ışık / gölge) | Tarama | Seed |
|---|---|---|---|---|---|---|
| 1 | Koridor (yalnız açıklıktan) | 6.4–9 | P07–P09a: yarıkta düz `#f0d6c4`; P09b: koridor duvarı + yüksek pencere (litografi gök 3 basamak `#d0d6e6`/`#b7c2dc`/`#9eaed0`) | — | yok | — |
| 2 | Merdiven boşluğu | 3–6.4 | basamaklar (zikzak ışık), sahanlık, kapı kanadı, yan duvarlar, eğik tavan | basamak burnu `#8c6f66` / yüz `#4a4668` / rıht `#3a3a58`; duvar `#40466a` / bounce `#a07862` | **basamak burnu altı** (7.5 px), kapı kasası gölge yanağı | 433 (aşınma çukuru, leke) |
| 3 | Yan bölme + örtüler | 3.6–7.5 | 5 örtülü biçim (sıra), duvar şeridi | örtü `#6a5f8c` / kıvrım `#463c62`; tek kenar ışığı `#c9a0a6` 1.5 px yalnız zemin bounce'una bakan kenarda | **örtü kıvrımı içi** (9 px, 2–3 çizgi) | 421 (boy, aralık, kıvrım) |
| 4 | Lento + tavan | 0–3.2 | düz lento (portal), 2 kiriş, 3 boru + kablo (VP'ye yakınsar), sönük ampul + kafes | tavan `#2b2a4f` / kiriş alt yüzü `#36324e` / boru kenarı `#584e7c` | **lento ve kiriş altı** (9 px) | 440 (boru kelepçe aralığı) |
| 5 | Oda: sedye + Eliasberg + zemin | 1.5–3 | sedye (sırık, bez, sehpa), örtü, el, Eliasberg, çubuklar | örtü ışık bandı `#efd0b6`→`#e4bc98`, örtü `#8a7aa6` / `#584e7c`; zemin `#3a3a58`; duvar alt şerit `#2c3050` / üst `#40466a` | **sehpa ve sedye altı**, Eliasberg kol altı | 455 (zemin çatlak, nem lekesi) |
| 6 | Ön plan | 0.3 | sağ kenarda düşey boru + vana çarkı (P07 x 1100–1180, kadraj boyu), **net**, kenar ışığı yok (levha ona değmez), yalnız siluet + 1 px iç çizgi | `#36324e` | yok | — |
P08-3 katmanları: ön = sedye yakın kenarı + el (z 1.95; dolly zoom'da büyür) · orta = yüz (2.15) · arka = merdiven + yarık (3–6.4) ve yan bölmede örtüler (4–6). Arkadaki katmanlar dolly zoom'da küçülür: **plaka (`plaka()`) ile gerçek z'de**; sahte ölçek yok.
**Atmosfer:** levhada toz; oda zemininde **soğuk nem buğusu** tek düz bant h 0–0.35 `#5d6494` α .25 (zemini arka plandan ayırır, sedye ayaklarını yumuşatmaz, net kenar); merdiven boşluğunda 2 buğu bandı `#6a7aa0` α .18/.28 (derinlik).

### 13.5 Malzeme ve doku (≤ 3 katman/yüzey; seed sabit)
| Yüzey | Malzeme | Doku | Kod | Parametre |
|---|---|---|---|---|
| Duvar üst | sıva | 4–6 nem lekesi (kenarı net, iç ton 1 basamak koyu), 2 çatlak | `Desen` leke + kontur 1.5 px | α .12, seed 455 |
| Duvar alt şerit | yağlı boya | üst kenar çizgisi + 3 kabarma; parlaklık yok | düz + `Desen` | α .10 |
| Basamak | taş/beton | burun aşınma çukuru (ortada açık elips), kenar kırığı 2–3 | düz şekil, seed 433 | çukur ry .5 rx |
| Örtü | keten/pamuk bez | kıvrımlar: 4–6 uzun yumuşak kıvrım, **iç kıvrım çizgisi** (SALON tur-4 figür dersi) + tarama yalnız kıvrım içinde | `Tarama` 9 px, 1.6 kalınlık | kıvrım yönü baştan ayağa |
| Sedye | ahşap sırık + kanvas | sırık damarı 1 çizgi, kanvas dikiş kenarı | düz | sırık `#4a3a3c` ışık kenarı `#8a6a62` |
| Kapı | boyalı ahşap | 4 pano, boya kabarması 3, kasa gölgesi | düz + `Tarama` kasa yanağı | 7.5 px |
| Boru/kablo | dökme demir, kumaş kablo | kelepçe ritmi (seed), pas lekesi 2 `#5a4a66` | düz | — |
| Ampul (sönük) | cam + tel kafes | kafes 6 çizgi; cam içi koyu, **ışık yok** | düz | — |
| Kâğıt üst katmanı | kanal | O6 | `SahnePlaka litografi` | — |

### 13.6 Palet (tasarım §2.3 aileleri; O1 ile doygunluk düzeltmeleri — **tasarımcı onayına**)
| Ad | Tasarım hex | Bu şartname | Neden |
|---|---|---|---|
| duvar gölge / orta | `#2c3050` / `#40466a` | aynı (C\* 22/23) | — |
| zemin / basamak yüzü | `#3a3a58` / `#4a4668` | aynı | — |
| basamak burnu ışıkta | `#8c6f66` | aynı + çizgide `#efd0b6` | — |
| örtü ışık / orta / gölge | `#cfc3bc` / `#a89ca8` / `#8f8aa8` (C\* 6/8/~10, gri) | **ışık bandında** `#efd0b6`/`#e4bc98`; bant dışı **`#8a7aa6` / `#6a5f8c` / `#463c62`** (C\* 26/27/25) | O1 gri; örtü yine "açık bez" okunur (zemin L 26 ↔ örtü L 43–54); beyaz değil, çubuğun altında |
| bounce | — | `#a07862` (merdiven), `#94705e` (sedye çevresi) | sıcak piksel (A8) |
| tarama / kontur ailesi | `#2f2d46` | `#2b2a4f` | O1 |
| tırabzan | `#2f2d46` | boru `#36324e`, kenar `#c9a0a6` yalnız levha değerse | — |
| P09b gün ışığı / gök | `#f0d0bc` / `#a9b7cc` | aynı | — |
| İmza (çubuk) | §3 | §3; **P08'de en parlak/doygun nokta** (C\* ≥ 55); çubuk levhanın içinde durur (P08-1 bırakma yeri = zemin şeridi u −0.45 z 2.55) | tasarım §2.7 |

### 13.7 Dokunuş ve eylem yüzeyleri
| Plan | Yüzey | Yer (dünya) |
|---|---|---|
| P07 LS-D3 | kapı kanadı kenarı + yarık; basamaklar (4 adım: basamak 9, 7, 5, 3 burnu; `merdivenZemin`) | yarık u +0.40 z 6.4; basamak burnu z = 3.0 + 0.28·(n−1), h = 0.18·n |
| P08-1 | çubuklar → zemin, sedye sehpasının yanında, **ışık şeridinin içinde** | (−0.45, 0.02, 2.55), çubuklar u eksenine ~20° |
| P08-2/3 LS-D4 | örtü kenarı + el (işaret parmağı seğirir) | el (−0.42, 0.82, 1.95), şeridin içinde |
| P09a | sehpalardan sedye kalkışı (iki taşıyıcı sırıkları kavrar), çubuklar Eliasberg'in eline | sırık uçları u −1.3 / +0.7 |
| P09b | basamaklar (3 adım), kapı kanadı (sırtla itilir, dışa açılır) | kapı menteşe u −0.45 |

### 13.8 Motion için çizim notları
- **Türet:** `kamera25d` (`izd`, `plaka`, `dolly_zoom`, `fluSigma` yalnız P08-2), `LanternOda` gravür huzmesi (4 sınır ışını + 2.5° iç ışın) → burada **levha** olarak, `ElciOda` `kapi.ayak` şerit mantığı, `Hale` (yarık çevresi 2 disk r 0.12/0.22 m, C\* ≥ 18), `doku/Tarama`, `SahnePlaka`, `Kukla` (Eliasberg `fark-ediş`, `eğilme-vedalaşma`), `GravurEl` (Aydarov eli, ten `#cdb09e` → ışıkta `#e4bc98`, soğuk alanda `#8a7aa6` ile karışmaz: el ten gölgesi `#8f7360`), `merdivenZemin`.
- **Yeni ortak modül önerisi (`src/kit/gorsel/`):** `IsikLevhasi {S, aciklik:{u,h0,h1,z,genislik}, yuzeyler[]}` → çarpma çokgenleri + gölge + toz maskesi (BODRUM'da kurulur; kapı/pencere yarığı olan her iç mekânda yeniden kullanılır) · `Merdiven {riht, basamak, en, burunAsinma, seed}` · `OrtuluBicim {boy, kivrimSayisi, seed}` (yüzsüz, ayak/elsiz; morg ve hasta yatağı) · `Sedye {sirik, bez, sehpa}`.
- Dolly zoom: `kamera25d` `{kare:[177,252], konum_yol:[C0,C1], lens_mm:[50], dolly_zoom:{konu:[-0.52,1.12,2.15]}, merkez:[540,780], egri:"inout"}`; tutma 252→sonu sabit. Doku/toz seed'i plaka koordinatında (kaynamaz).
- Zikzak ışık: her basamak için iki çokgen (basamak yüzü, rıht) levha düzlemiyle kesişimden; elle çizilmez. Eliasberg'in bacakları levhayı kestiğinde basamak parçası gölgeyle bölünür.
- Kapı kanadı: dışa açılır; yarık görüntüsü = kasa ile kanat kenarı arası; kanadın iç yüzü görünmez (koridor tarafında).

### 13.9 BODRUM GORSEL-RECETE
| Madde | Durum | Nasıl |
|---|---|---|
| A1 | ✔ | tek S + açıklık; gölgeler ışından |
| A2 | ✔ iç karşılık | gök yalnız P09b kapıdan (3 düz basamak); tavan düz koyu |
| A3 | ✔ | şerit 3 basamak, yarık halesi 2 disk, bounce 2 düz alan |
| A4 | ✔ 6 | koridor · merdiven · yan bölme · tavan/lento · oda · ön boru |
| A5 | ✔ | merdiven boşluğu 2 bant, zemin nem bandı |
| A6 | O2 karşılığı | buğu + LOD; σ yalnız P08-2 zemin ≤ 2.5 |
| A7 | ✔ | yalnız levhaya değen kenarlar |
| A8 | **risk** | sıcak ≥ %14 hedef: şerit + bounce + yarık; P07 ölçümünde kalmazsa `lint p95_bodrum` / `sicak_bodrum` (tasarım §2.7 öngördü, en düşük p95 70, sıcak %10) — gevşetme sessiz yapılmaz |
| A9 | ✔ | basamak burnu altı, lento/kiriş altı, sedye/sehpa altı, örtü kıvrımı, kol altı; duvar/zemin/örtü düzünde yok |
| A10–12 | ✔ | O6 |
| A13 | ✔ | örtü boy/aralık/kıvrım 421, leke 455, basamak aşınma 433, toz 707 |
| B1 | uyarlama | "sıra" = basamaklar + örtülü biçimler (seed'li aralık) |
| B2 | uyarlama | duvar: alt şerit + üst sıva + tavan kirişi |
| B3 | ✘ `lint` | pencere yok (tek kaynak); `lint:{izin:["B3"],not:"bodrum; tek açıklık kapı"}` |
| B4–B6 | ✘ `lint` | iç mekân |
| B7 | ✔ | lento ve kiriş altı, basamak burnu altı |
| B8 | ✔ | örtüler uzakta tek siluet + 1 kıvrım; yakında 4–6 kıvrım |
| B9 | ✔ | `ink(dolgu)` mor aile, clamp(1.5, 6) |
| B10 | ✔ | A9 satırı |
| C | ✔ | P07/P09b merdiven boşluğundan derin perspektif (z 0→9) |
| Üç katman | ✔ | ön: boru (P07) / el + sedye kenarı (P08-3) · ışık olayı: yarık levhası (daralır P07, parmakta P08, açılır P09b) · atmosfer: levhada toz + nem bandı |

### 13.10 YÖN KARESİ — P08-3, f252 (dolly zoom tepe karesi; parmak ön planda)
**Kamera:** sedyenin yakın tarafından, Eliasberg'in yüz hizasında (1.12 m), düz bakış; 28 mm eşdeğeri (dolly zoom bitti: kamera yüze 0.69 m), merkez yüzde.
**Yukarıdan aşağı:**
1. **y 0–300:** merdiven boşluğunun karanlık eğik tavanı, mor-lacivert, düz; üstte iki ince buğu bandı.
2. **y 300–670, x ~700:** sağ üstte **kapı yarığı**: dar, dikey, sıcak krem çizgi (2 disk halesi), kapı kasası ve kanadın koyu kenarı; uzakta ve küçük — "çıkış uzaklaştı".
3. **y 600–950:** Eliasberg'in yüzü merkezde (290 px), dar-uzun, çökük yanak, bıyıksız; başı hafif eğik, **gözler yeni kalkmış**, kaşlar yukarı-içe, ağız hafif aralık (nefes durdu). Yüzün ön cephesi soğuk mor gölgede; **sağ yanak, kulak ve saç kenarında 2–3 px sıcak kenar ışığı**; çene altında ve göz akında aşağıdaki aydınlık örtüden gelen sıcak yansıma. Sağ omzunun arkasında merdivenin alt basamakları: ışık basamaktan basamağa **kırık zikzak** çizer. Solda yan bölmede yan yana yatan **örtülü biçimler** (küçülmüş, sıralı, yüzsüz, ayaksız), yalnız kıvrım taraması ve tek gül kenar.
4. Yüzden ele inen **ince ışıklı toz çizgisi** (levha kenarından görünür): yarık → yanak kenarı → el; üçü aynı ışık.
5. **y 1150–1400, x ~700:** ön planda **örtünün kenarından çıkmış el** (≈ 400 px), sıcak şeridin içinde; işaret parmağı kenardan hafif kıvrık (seğirme bitti, el duruyor). Elin gerisinde örtüde enine sıcak bant. Örtü bandın dışında mor (beyaz değil).
6. **y 1390–1920:** sedyenin yakın kenarı (koyu sırık), altında karanlık; zemindeki ışık şeridinin içinde **iki bal-ten çubuk** — karenin en doygun noktası, küçük; nem buğusu bandı; zemin.
**Işık anı:** tek kaynak; sıcak olan yalnız yarık, şerit, el, kenar ışığı ve çubuk. **Atmosfer:** levhada toz; zeminde nem bandı. **Dil:** SALON tur-4 ile aynı: net mürekkep kontur, mor tarama, iç kıvrım çizgisi, kâğıt lifi ve gren, renk kayması.
**Paris'in yanına konsa:** sıcak–soğuk karşıtlığı Paris gece karesinin pencere havuzu düzeyinde; fark: Paris'te geniş şehir, burada tek çizgi ve yüz. Geri kalma riski: sıcak oranı düşük (A8), yüz rig'inin `fark-ediş` ifadesi (kitte yok), örtülerin "kalabalık dolgusu" gibi okunması (seed aralığı ve tek tek kıvrımla bireysel kalmalı).

---

## 14. SOKAK-LG — kuşatma sokağı (P03a kış, P04a kapı, P13a–b yaz; tek dekor, `mevsim` parametresi)

**Duygusal amaç:** Aynı sokak kışın donmuş bir sessizlik, yazın başını kaldırıp dinleyen bir şehirdir.
**Görsel dil:** baskın şekil **yatay** (kesintisiz korniş hattı, kat silmeleri, kar yığınları) kesilen **dikeylerle** (yağmur borusu, buz sarkıtları, hoparlör direği, soba boruları dumanı) · ritim: eşit pencere aksları (3.2–3.6 m) + bina başına farklı renk ve ayrıntı · sıcaklık: kış = mavi gölgede tek gül güneş şeridi (sıcak %14–20); yaz = altın-gül akşam, mor gölge (sıcak ≥ %25) · kontrast: kış yüksek değer (kar L 86 ↔ gölge L 48), yaz yüksek renk.
**Şehir imzası (Bordeaux/Paris'ten ayrışma, ilk 0.5 sn):** (1) **düzenli korniş yüksekliği** — Paris'in düzensiz çatı hattının tersi; komşu binalar ±1.5 m farkla aynı hatta [G: Petersburg yükseklik sınırı geleneği, doğrulanmalı]; (2) **granit kaide** + zemin katta **rustika** bantları; (3) **cepheden kaldırıma inen yağmur boruları**, ağzı bükük; kışın ağızda buz, kornişte sarkıt; (4) geniş parseller (15–35 m), 5 kat. Admiralty/İsaak silueti, pencere bantları, kum torbası, tabela **çizilmez** (tasarım §1).

### 14.1 Mimari kart
| Madde | Tanım | Etiket |
|---|---|---|
| Dönem / üslup | 19. yy ortası–20. yy başı Petersburg kira evleri (dokhodny dom), sade klasik/eklektik; 1941–42'de bakımsız: sıva dökük, boya solgun | [G] doğrulanmalı |
| Sokak | Yan sokak, cephe-cephe **16 m**: yol 11 m + iki kaldırım 2.5 m; düz, eksen z | [G] tip · [T] ölçü |
| Bina sırası | Her iki yanda bitişik 5–6 bina (seed 1941): parsel eni 15–35 m; zemin kat 4.6 m + 4 kat × 3.6 m → **korniş h 19–21 m** (±1.5 seed, komşu eşit olamaz: ≥ 0.4 m fark) | [G] · [T] |
| Cephe bölümlemesi | granit kaide 0.7 m (pembe-gri) → zemin kat **rustika** (yatay derz, 0.45 m aralık) → kat silmesi → 2. kat pencereleri **düz lento + sade alınlık (sandrik, düz korniş parçası)** → 3–5. kat düz lento, söve 0.15 m → **korniş** 0.6 m çıkıntı, altında konsol dizisi yok (sade) | [G], sade [T] |
| Pencere | dikdörtgen, oran 1:1.9, aks aralığı 3.2–3.6 m (bina başına sabit, binalar arası farklı); çift kanat, ortada kayıt + üst yatay kayıt (T kayıt); kış: **çift pencere** (iç çerçeve koyu görünür), camda buz çiçeği yok (okunmaz) | [G] |
| Kapı (P04a) | **paradnaya** girişi: çift kanat ahşap 1.4 × 2.9 m, üst yarı camlı dolgu, üstte **dikdörtgen** üst pencere (3 bölmeli), düz lento + sade alınlık; önünde 1 granit basamak; kanat **içe** açılır | [G] · kemer yok [T] |
| Avlu geçidi (podvorotnya) | her 2–3 binada bir, zemin katta 3.2 × 4.0 m; başı **basık kemer** (segment, yükseklik/açıklık 0.15) | [G] doğrulanmalı; kemer tipi açık yazıldı |
| Yağmur borusu | bina başına 2, ø 0.2 m, korniş oluğundan kaldırıma; dirsekli ağız 0.4 m'de, kaldırıma doğru bükük; 3 kelepçe/kat | [G] |
| Çatı | düşük eğimli sac çatı (~15°), boyalı; **alçak kameradan görünmez**; uzakta yalnız birkaç baca ve sokak sonunda karşı binanın korniş hattı | [G]; B4/B6 kısmî |
| Zemin | kaldırım taş plak + granit bordür; yol **arnavut taşı** (bulyzhnik); kış: tümü karla örtülü | [G] |
| Kış hali | yol ortasında **ayakla açılmış tek patika** (0.6–0.9 m), iki yanda kar yığınları 0.8–1.4 m, cephe dibinde kalın kar; korniş ve boru ağzında sarkıt; birkaç pencereden dışarı çıkan **soba borusu** ve ince duman (kuşatma kışı) | [G] doğrulanmalı (soba borusu, patika); kar [A] |
| Kızak (kış) | **boş çocuk kızağı** (ahşap, 0.9 m), üstünde yalnız **tahta kova** (su taşıma); patikanın kenarında duvara yakın, insansız; ölü/yük gösterimi yok | [G] su taşıma doğrulanmalı · **tasarım §1 "kızak çizilmez" ile çelişir** → orkestra kararı (brif: "kar, kızak — saygıyla"); parametre `kizak: false` ile kapanır. Gerekçe: kova P13'teki kadının kovasına kurulum olur (kış suyu → yaz kovası) |
| Yaz hali (P13) | kar yok; kaldırım kenarında **küçük sebze tarhı** (toprak + sıra bitki, 2 × 6 m, kaldırımın ağaç şeridinde) [A orta]; birkaç pencere **açık**; hoparlör direği | [A] tarh · [K] açık pencere (SALON §0) |
| Hoparlör | yol kenarında ahşap/demir direk h 6.5 m, tepede **konik huni** ø 0.4 (ağız aşağı-öne eğik), tel direkten binaya; harf yok | tasarım §1 nötr, [A] biçim doğrulanamadı |
| Kameradan görünen | P03a (göz 1.49, 24° aşağı): patika, kar, uzakta iki yanda bina zemin katları ve kar yığınları, sokak sonu ve gökyüzü şeridi; **kornişler kadraj dışı** · P04a (1.6, düz): kapı, rustika, kaide, sağda boru, 2. kat pencere alt kenarı · P13a (1.5, düz, 35 mm): korniş hattı **görünür** (uzak binalarda), hoparlör, tarh · P13b (alçak 0.6, yukarı): ikinci hoparlör gök önünde, korniş altı görünür, **çatı yüzü görünmez** | [H] |

### 14.2 Tek ışık: güneş (dünya vektörü; sokak ekseni z ≈ kuzeydoğu 45°)
| Mevsim | Saat | Güneş | Kamera yönü | Sonuç |
|---|---|---|---|---|
| kış (P03a) | ~13:00, Ocak sonu–Şubat | yükseklik **~10°**, azimut ~185° | P03a +z (KD): güneş **sağ-arka** ✓ tasarım §0 | 20 m'lik binalar sokağı tamamen gölgede bırakır (gölge boyu ~110 m). Güneş yalnız **boşluklardan** girer: sağdaki avlu geçidi ve 25 m'deki çapraz sokak → karda **gül ışık şeritleri** (A3 3 basamak); P03a figürü bir şeridin kenarında durur → el/ekmek/kol **kenar ışığı**, avuç mavi gölgede |
| kış kapı (P04a) | aynı gün, ~15:30 | ~3°, gölge | — | sokak güneşsiz; **tek kaynak kapı aralığı** (içeriden sıcak, kaynağı görünmez); gök soğuk |
| yaz (P13) | **~19:30**, 9 Ağustos | ~10°, azimut ~285° [H] | P13a ~60° (DKD): güneş **sol-arka** ✓ | uzun altın-gül şeritler; sağ cephelerin üst katları güneşte, sokak tabanında çapraz sokak şeritleri; hoparlöre kenar ışığı |
[H] Leningrad 59.9° K; konser saatinin "akşam" olduğu SALON §0.2 ile tutarlı; **tasarım §0 "öğleden sonra" yazıyor → saat önerisi tasarımcıya** (fark: gölge uzunluğu ve renk sıcaklığı; yön aynı "sol-arka").
**Türetilen:** `isik.ts` `ISIK_YON` (az, el) → gölge (`golgeCokgen`, α .8), ışıklı yüz, kenar ışığı, şerit çokgenleri (bina boşluklarından gölge hacmi çıkarılır). Elle şerit konmaz.

### 14.3 Kamera ve katmanlar
**P03a (yön karesi planı):** C (0, 1.49, 0) → dolly +0.08 m (push-in), tilt −24.3° → −25.5° (avuç y ≈ 820 sabit kalsın), 50 mm (F 1500), odak avuçta, σ ≤ 2.5 yalnız z > 8 m (O2). [H] avuç merkezi (0, 1.30, 0.53) → (540, ~830), el+ekmek **~590 px (%31)** ✓; ufuk y 283; çapraz sokak şeridi y ~388; patika 10 m y 535; karda 2 m y 1290.
| # | Katman | z (m) | İçerik | Renk ışık / gölge | Tarama | Seed |
|---|---|---|---|---|---|---|
| 1 | Gök | ∞ | litografi 5 basamak (tasarım §2.4 kış): `#6a82ab`/`#8b9dbd`/`#a8b6cb`/`#d0c8d0`/`#f0cdb8`; sağ ufukta ışıma `#f2c9b2` (disk yok) | — | basamak sınırında 2 çizgi | — |
| 2 | Uzak duman + buğu | 60–200 | soba borusu ve baca dumanları: 3–4 ince sütun, rüzgârla sola yatık, güneşli kısımları `#e8c0a0`, gölgeli `#9b9fc4`; ufukta 3 buğu bandı `#d0c8d0` α .30/.42/.55 | | yok | 1942 |
| 3 | Uzak bina sırası | 30–120 | iki yan, zemin katlar + kaide + boru + kar yığını; LOD orta (pencere ritmi, rustika yok) | cephe ışık (yalnız şeritte) `#e2bba6` / gölge `#8d85a6` / derin `#7a7394` | yok | 1941 |
| 4 | Çapraz sokak şeridi + kızak | 12–25 | karda gül şerit (3 basamak `#f0d6c4`/`#ead6cc`/`#e8c0a0`), boş kızak + kova (sol, z 12, ~60 px) | kar gölge `#8f93b4`, derin `#6d7098` | kızak altı 9 px | — |
| 5 | Patika + kar yığınları | 2–12 | ayak izi oyukları (seed'li, iki yön), yığın sırtı gül kenar `#ead6cc` | kar ışık `#dcd4dc` / gölge `#8f93b4` | **yığın ve iz oyuğu gölge yanağı** 9 px, kısa | 303 |
| 6 | El + ekmek | 0.5 | avuç (soğuk ten `#c4a8a0`, gölge `#8a7aa6` geçişli), ekmek `#5a4638` kenar `#8a6c58`, kırıntı ×3 | kenar ışığı `#e6b5a0` 2–3 px sağ kenarda | avuç içi gölge 7.5 px | — |
| 7 | Ön plan | 0.2–0.4 | sol-alt **palto kolu** (koyu, net siluet, sağ kenarında güneş kenarı), sağ kenarda **keman kutusu askısı** (çapraz kayış) | kol `#3d3a66`, kayış `#4a3a3c` | kol iç kıvrımı | — |
**Atmosfer:** ince düşen kar (seed 1203, 60 tane, 2–4 px `#e9d9d6`, dünyaya bağlı yavaş düşüş 18 px/sn, şeritte gül), nefes buğusu (avucun üstünde 1 bulut, `#d8d2dc` α .35, f0–60), uzak duman. **Alt üçte bir:** karda iz, kolun gölgesi, kar sırtı.
**P04a:** C (−1.2, 1.6, 0), pan +12°, 35 mm (F 1050); kapı merkezi u +0.6, z 4.9 → kapı x 600–900, y 520–1200 [H yaklaşık]. Katman: ön = **kapı pervazı/rustika köşesi** sağ kenarda net (z 1.2) · orta = Eliasberg (u −0.6, z 4.6), kapı, granit basamak, sağda yağmur borusu ağzında buz · arka = sokak boyunca soğuk gölgeli cepheler, gök şeridi üstte. **Tek ışık:** kapı aralanınca (f78) içeriden sıcak üçgen huzme (`#efd0b6`/`#e4bc98`/`#c48e74`) basamağa, kara ve Eliasberg'in yüz-yakasına düşer; aralık kapanıksa sahne mavi, kaynak yok (f0–78 yalnız gök + kar yansıması — "ışık olayı" kapının açılmasıdır). Atmosfer: kapıdan çıkan ılık buğu (`#d8d2dc` α .3), düşen kar.
**P13a:** C (0, 1.5, 0) truck sola (−1.6 m), 35 mm, kadın u −1.0 z 5→4.4 (boy ≥ %35); hoparlör direği ön plan sağda (z 2.5, net, kenar ışığı); arka: korniş hattı görünür, güneşli üst katlar, açık pencereler (iki tanesinde flu değil, küçük net yüzsüz baş siluetleri ≤ 40 px, başı dışarı), başı yukarıda 6–8 yüzlü insan (≥ 60 px olanlar Kukla yüzü). Tarh ön-orta sol. **P13b:** C (0.5, 0.6, 3), tilt +28°, pan sağa 25°, 50 mm: ikinci hoparlör (h 6.5) gök önünde, korniş altı taraması, akşam gök basamakları (yaz §2.4), şehir dışına bakan huni ağzı; Alman siperi yok.

### 14.4 Malzeme ve doku
| Yüzey | Malzeme | Doku | Kod | Parametre |
|---|---|---|---|---|
| Cephe sıvası | boyalı sıva | 3–6 dökük yama (alt tuğla görünmez, yalnız koyu ton), yağmur izi (boru yanında düşey), kaide üstü kir bandı | `Desen` + düz | α .10, seed bina_i = 1941+i |
| Rustika | sıva/taş | yatay derz 2 px, derz altında ince gölge | çizgi listesi | aralık 0.45 m, LOD: < 6 px ise yok |
| Granit kaide | pembe-gri granit | iri benek (stipple) yalnız yakın plan, kenar kırığı | `Desen` nokta | yakın: 40 nokta/m², α .18 |
| Korniş | sıva | alt yüz tarama, üst kenar kenar ışığı (yaz) / kar şeridi (kış) | `Tarama` + `KenarIsik` | 9 px |
| Pencere | cam + boyalı çerçeve | kış: koyu cam `#3d3a66`, iç çerçeve çizgisi; yaz: gök yansıması 2 basamak; açık kanat yanağı | düz | ışıklı pencere yok (kış: elektrik yok) |
| Yağmur borusu | galvaniz sac | 3 kelepçe/kat, dikiş çizgisi, kış ağızda buz | düz | `#6a7aa0` / `#4e5a78` |
| Sarkıt | buz | 3–9 adet/korniş parçası, boy seed'li 0.1–0.6 m, ışıkta tek spekülar nokta `#f0d6c4` | düz üçgen | seed 77 |
| Kar | kar | düz yüzey **taramasız**; sırtta gül kenar, iz oyuklarında mavi gölge yanağı | düz + tarama yalnız oyuk | — |
| Arnavut taşı (yaz) | granit taş | yakında taş başlıkları (seed'li yuvarlak), uzakta düz | LOD | taş ø 0.15 m |
| Hoparlör | çelik sac | huni içi koyu, ağız halkası, ışık kenarı | düz + `KenarIsik` | — |

### 14.5 Palet (tasarım §2.4 + O1 düzeltmeleri — **tasarımcı onayına**)
| Ad | Kış | Yaz | Not |
|---|---|---|---|
| gök 5 basamak | tasarım §2.4 aynen | aynen | — |
| cephe ışık (bina başına, seed) | `#e2bba6` gül-krem · `#dcbc94` soluk okra · `#b9c4a2` soluk yeşil · `#dcb4ac` soluk gül (L 77–79, C\* 16–25) | aynı (yazda ışık alan yüz daha geniş) | tasarım `#dcc0b0` (C\* 14) → bir basamak doygun; okra h 77 imza bandında ama C\* 25 < 40 (tekillik korunur) |
| cephe gölge / derin | `#8d85a6` / `#7a7394` | `#9a8cb4` / `#7d72a0` | yaz gölgesi daha mor, C\* 23–27 |
| kar ışık / gül kenar / gölge / derin | `#dcd4dc` / `#ead6cc` / `#8f93b4` / `#6d7098` | — | kar çekirdeği C\* 5 (O1 istisnası: kar) |
| güneş şeridi 3 basamak | `#f0d6c4` / `#ead6cc` / `#e8c0a0` | `#efd0b6` / `#e4bc98` / `#c48e74` | |
| hoparlör / direk | — | `#4e5a78`, kenar `#f0c4a8` | tasarım `#4a4a52` (C\* 5, gri) → mavi çelik |
| kova (galvaniz) | tahta kova `#6b5040` | `#6a7aa0` | tasarım `#7e8796` (C\* 9) → C\* 23 |
| bitki | — | `#a3a67a` / `#5f6a5c`→`#4f6050` | — |
| granit kaide | `#9a8a8e`→`#a07e70` ışık / `#5a4a66` gölge | aynı | pembe granit sıcak |

### 14.6 Dokunuş yüzeyleri
| Plan | Yüzey | Yer |
|---|---|---|
| P03a LS-D1 | avuç kenarı + kar yığını sırtı (kırıntı karda düşer, el kenarı toplar) | yığın sırtı h 1.0, z 0.6 — avucun 0.3 m altında; el inişi kısa, kadrajda kalır |
| P04a | kapı kanadı (2 vuruş, menteşe), granit basamak | kapı u +0.6 z 4.9 |
| P13a LS-D7 | kaldırım taşı (kova teması), kova su yüzeyi (`yayKare` halkalar `#8fa3c0`) | kova u −0.7 z 4.2, ayak y ≤ 1250 |
Not P03a: sahne planı "karın içinden toplar" diyor; kar zemini 1.2 m aşağıda olursa el kadraj dışına çıkar → **yığın sırtı avucun hemen altında** (yönetmen konumu onaylar).

### 14.7 Motion notları
- **Türet:** Blanc `Sokak.tsx` perspektif fikri yerine **`kamera25d` + `siraUret`/`Cephe`** (Paris ortak) — Bordeaux paleti/evleri kullanılmaz (tasarım §7). `GokLitografi`, `UfukBuguBandi`, `golgeCokgen`, `KenarIsik`, `lodSec`, `yayKare` (kova), `gait shuffle`.
- **Yeni ortak modül önerisi:** `CepheKlasik {kat:[4.6,3.6×4], aks, rustika, kaide, sandrik, kornis, boru[], sarkit, seed}` (Petersburg kira evi; Paris `Cephe`nin klasik varyantı) · `KarZemin {patika, yigin[], iz, seed}` · `GunesSeridi {ISIK_YON, bosluklar[]}` (bina boşluğundan geçen güneş çokgeni; BODRUM `IsikLevhasi` ile aynı aile) · `Hoparlor {huni, direk, tel}`.
- `mevsim: "kis"|"yaz"` değiştirir: kar/sarkıt/duman/kızak ↔ tarh/açık pencere/hoparlör; gök, güneş vektörü, palet. Dekor geometrisi (bina sırası seed 1941) **aynı** → P03a ↔ P13 eşleşmesi.
- Korniş hattı: komşu yükseklik farkı ≥ 0.4 m, ≤ 1.5 m (Paris'teki "zorla bir kat ayır" kuralı burada **tersine**: büyük sıçrama yok).

### 14.8 SOKAK-LG GORSEL-RECETE
| Madde | Durum | Nasıl |
|---|---|---|
| A1 | ✔ | güneş vektörü (kış/yaz), P04a kapı aralığı |
| A2 | ✔ | gök 5 basamak + sınır çizgileri |
| A3 | ✔ | güneş şeritleri 3 basamak; kapı huzmesi 3 basamak |
| A4 | ✔ 7 (P03a) / 8 (P13a) | §14.3 |
| A5 | ✔ | ufuk 3 bant + duman |
| A6 | O2 karşılığı | P03a σ ≤ 2.5 yalnız z > 8 |
| A7 | ✔ | el, kol, kar sırtı, hoparlör, korniş üstü (yaz) |
| A8 | ✔ hedef | kış ≥ %14 (şeritler + ufuk + duman), yaz ≥ %25 |
| A9 | ✔ | korniş altı, kar oyuğu, avuç içi, kızak altı |
| A10–12 | ✔ | O6 |
| A13 | ✔ | bina eni/boyu/rengi 1941, iz 303, kar 1203, sarkıt 77, duman 1942 |
| B1 | ✔ | iki yanda sıra, uzakta 2. derinlik (sokak sonu karşı bina) |
| B2 | ✔ | kaide + rustika + silme + söve + sandrik + korniş |
| B3 | ✔ | aks hizalı; kış ışıklı pencere 0 (elektrik yok — gerekçeli), yaz açık pencere %20–30 seed |
| B4 | kısmî `lint` | çatı alçak kameradan görünmez; yalnız uzak korniş hattı |
| B5 | ✘ `lint` | çatı penceresi görünmez |
| B6 | kısmî | uzakta baca + soba borusu dumanı |
| B7 | ✔ | korniş, sandrik, kapı lentosu altı |
| B8 | ✔ | yakın: rustika + granit benek; orta: pencere ritmi; uzak: siluet |
| B9–B10 | ✔ | — |
| C | ✔ | P03a/P13a sokak derinliği |
| Üç katman | ✔ | ön: kol + kayış (P03a), pervaz (P04a), hoparlör direği (P13a) · ışık: karda gül şerit / kapı huzmesi / akşam şeritleri · atmosfer: kar + nefes + duman / kapı buğusu / yaz tozu |

### 14.9 YÖN KARESİ — P03a, kontrol karesi p114 (el kenarı kırıntıyı toplar)
**Kamera:** müzisyenin sağ omzunun üstünden, göz hizası 1.5 m, 24° aşağı; 50 mm; sokak boyunca kuzeydoğuya bakış.
**Yukarıdan aşağı:**
1. **y 0–283:** kış göğü, beş düz basamak: tepede soğuk mavi, ufka doğru leylak-pembe; sağ ufukta disk olmadan gül-şeftali ışıma. Gökte sola yatan 3–4 ince **soba/baca dumanı** sütunu, güneşli yanları pembe.
2. **y 283–600:** dar, kar dolu sokak kaçış noktasına (540, 283) iner. İki yanda bitişik 5 katlı binaların **zemin katları**: pembe-gri granit kaide, rustika bantları, kapılar, cephe dibine kadar kar yığını, kaldırıma inen yağmur boruları ve ağızlarında buz. Kornişler kadraj dışında; uzakta sokak sonunda karşı binanın **düz korniş hattı** ufkun hemen üstünde. Yolun ortasında ayakla açılmış **tek patika**. ~25 m'de çapraz sokaktan karın üstüne yatay **gül güneş şeridi**; geri kalan kar mavi gölgede. Solda duvar dibinde **boş bir çocuk kızağı, üstünde tahta kova**. İnsan yok.
3. **y 600–1050:** **açık avuç** (≈ 590 px), soğuk ten, mavi gölgeli; içinde küçük, koyu, mat **ekmek dilimi** (125 g), ışık kenarı kahve. Elin sağ kenarında, avuç çizgisinde ve ekmekte 2–3 px gül güneş kenarı (çapraz sokaktan sızan şerit). Avucun hemen altında kar yığınının sırtı; elin dış kenarı kırıntıyı karın içinden süpürüp topluyor; iki kırıntı ekmeğin yanında, biri karda.
4. **y 1050–1920:** yakın kar: ayak izi oyukları (mavi gölge yanaklı), yığın sırtı gül kenarlı; sol-altta koyu **palto kolu** (net siluet, iç kıvrım çizgisi, sağ kenarında soğuk kenar); sağ kenarda çapraz geçen **keman kutusu kayışı**; havada seyrek düşen kar taneleri; avucun üstünde bir soluk nefes buğusu.
**Işık anı:** tek kaynak alçak güneş (sağ-arka, ~10°); sokak gölgede, ışık yalnız boşluklardan şerit olarak girer. **Dil:** SALON tur-4 dili (net kontur, mor tarama yalnız iz oyuklarında ve avuç içinde, kâğıt lifi, gren, renk kayması). Kar düz yüzeyde taramasız.
**Paris'in yanına konsa:** Paris kış/alacakaranlık gökleriyle aynı basamaklı gök ve ışık şeridi dili; fark: imza siluet yerine şehir **korniş düzeni ve granit-rustika-boru** üçlüsüyle okunur (yön karesinde sorulacak soru: "Petersburg okunuyor mu?"). Geri kalma riski: insert ölçeğinde şehir yalnız üst üçte birde ve küçük; kar geniş beyaz yüzey (C\* < 10) → kare medyan C\* düşer (§18 risk 4).

---

## 15. HARİTA `leningrad` (P02a, P10a, P11; mevcut HARITA motoru, `harita_gorunum: "leningrad"`)
**Amaç:** Şehrin bir halkada sıkıştığını, sonra o halkanın üstünden umut (uçak) ve tehdit (top) geldiğini tek kâğıtta göstermek. **Görsel dil:** dönem askerî planı gravürü (Paris `paris-cevre` dili): parşömen, mürekkep kıyı çizgisi + **kıyı su çizgileri** (açıklarda 3 eş-ötelenmiş ince çizgi, 6/11/18 px — gravür harita geleneği), halkanın çelik mavi-grisi, şehir sıcak.
**Coğrafya (kamu malı veri):** Natural Earth 1:10m (kamu malı) kıyı + göller + nehirler, kırpım lon 29.80–31.10 / lat 59.45–60.45; izdüşüm eşdikdörtgen, x ölçeği cos 60° = 0.5 (`leningradVeri.ts`, `parisCevreVeri.ts` biçiminde). Görünür: **solda Fin Körfezi** (Kronştadt adası kenarda), **sağda Ladoga Gölü'nün güneybatı kıyısı**, aradan **Neva** (Ladoga çıkışı Şlisselburg'dan batıya, şehirde kollara ayrılır: 3 kol sade). Şehir: Neva ağzında sıcak leke, ada biçimleri sadeleşmiş, iç blok taraması (9 px, tek açı). [G] coğrafya genel bilgi; yer adı **yazı katmanında** (`svg_etiket: false`).
**Kuşatma hattı (doğruluk notu):** 1941–42'de güneyde ve doğuda **Alman** hattı (Körfez kıyısı Strelna/Uritsk → Pulkovo güneyi → Neva boyunca Şlisselburg'a, Ladoga kıyısı), kuzeyde Karelya Kıstağı'nda **Fin** hattı; Ladoga yönü açık. [G — genel tarih; araştırmacıya doğrulama]. Çizim: güney-doğu yayı = `halka` **dolu çizgi `#3e4c63` 12 px + kare blok işaretler `#52627a` 24 px** (Alman, anlatıdaki "Alman ordusu"); kuzey yayı = **ince kesik çizgi `#52627a` 6 px, blok yok** (cephe hattı, bayraksız); Ladoga tarafı açık. Tam kapalı daire **çizilmez** (yanlış coğrafya). Anlatım yalnız "Alman ordusunun kuşattığı" diyor; kuzey yayının bloksuz olması bununla çelişmez. Halka animasyonu `halka {bas 18 → bit 192}` Körfez ucundan Ladoga'ya çizilir, bloklar sırayla iner.
**İkonlar (gravür, ≥ 50 px/360 → ≥ 150 px/1080 ana ikon):** Filarmoni = sıcak halka `#e4bc98` + kontur `#1c1915` 3 px, şehir merkezinde (30.33 D, 59.94 K) · uçak (P10a) = iki kanat + gövde silueti `#1c1915`, pervane/kokart yok, rota **doğudan (Ladoga üstünden)** halkayı aşıp şehre noktalı (`rota_ciz`, `kamera_takip`) [A uçak; rota yönü G] · Sovyet top ikonu (P11) = koyu çelik `#3a3d42` namlu yukarı, tekerlekli kundak, **yüzsüz topçu yok** (ikon; tasarım/sahne planı sapması kayıtlı), şehrin güney-güneybatısında halka içinde, ≥ 150 px · Alman bataryaları = halka dışında güneybatıda 3 blok `#52627a` (daha koyu kenar), mermi düşen yer yok · `darbe` yalnız **Sovyet namlu ağzında** (krem flaş `#f4eddc` + kül duman `#8f8aa8`/`#cfcac2`), `sarsinti: 0`.
**Işık (tek kaynak, `isik`):** `lamba` (P02a, P11) — sol-üst masa lambası: parşömende 3 basamak sıcak havuz (`#efd0b6`/`#e4bc98`/`#c48e74`, elips ry ≤ .5 rx, O4), köşeler soğuk (parşömen gölge `#8a7aa6` α .35 çarpma); halka blokları havuzun kenarına doğru düşük gölge (sağ-alt, `GOLGE` kit) · `pencere_yaz` (P10a) — sağ-üstten pencere çerçevesi gölgesi (2 kayıt çizgisi, düz koyu bant) + sıcak dikdörtgen güneş yaması `#f2c9b2` (P10b'nin pencere ışığına taşıyıcı) · P11 namlu alevi ikincil, 9 kare, yalnız 80 px çevresine.
**Katmanlar:** ön = parşömenin kıvrık köşesi (alt-sol, z 0.3, net, kıvrımda tarama) + masa kenarı ahşap şerit (alt 120 px, `#4a3a3c`, damar 2 çizgi) · orta = harita · arka = parşömen lifleri ve su lekesi (seed 1942) · atmosfer: lamba havuzunda kâğıt tozu 20 nokta (dünyaya bağlı), P11'de duman.
**Kamera:** kit `cs` 1.0–1.4, kuşbakışı (P11 "hafif eğik": `aci` yoksa kit sınırında kalır, eğik görünüm `kit_eksik` değil — 2° perspektif ön plan köşesiyle verilir).
**Reçete:** A1 ✔ lamba/pencere tek · A2 ✘ `lint` (gök yok, harita) · A3 ✔ havuz 3 basamak · A4 ✔ 4 (köşe, masa, harita, kâğıt arka) + `lint` A4 "harita insert" · A5 ✔ su çizgileri + kenar buğusu `bugu` α .3 · A6 O2 · A7 ✔ ikon kenarı lamba yönünde · A8 ✔ yaz ≥ %25 (P10a, P11), P02a ≥ %14 · A9 ✔ şehir bloğu, kıvrık köşe · A10–13 ✔ (kit `fransa` tarama 2.5 px α .22) · B ✘ `lint` · C: P11 derinliği ön plan köşesi + eğik (tasarım §0.1 C riski).

---

## 16. SALON `prova` (P02b, P03b, P04b, P05, P06, P09c, P10b) — sütunsuz nötr kutu, pencere ışığı
**Amaç:** Aç insanların karanlık bir sahnede tek bir pencere ışığına doğru oturduğu, büyük salonun henüz olmadığı yer.
**Mimari kart:** iskelet SALON sahnesinin aynısı (aynı `salonDunya` dünya modeli ve `prj`, F 1575/35 mm sözleşmesi): sahne tahtası (h 1.0, z 11–20, tahtalar z yönünde), 3 kademe, davul + tabure u +2.2 z 15.5, Eliasberg podyumu u 0 z 12, sehpalar. **Yok:** sütun, galeri, avize, koltuk sıraları, tavan (§0.1 [K] provalar Haziran'a kadar başka binada). **Var:** arka z 21'de **ağır perde** (düşey kıvrımlar, 0.35–0.6 m seed'li aralık; hem tiyatroya hem radyo stüdyosuna uyan nötr öğe [T]) · iki yan karanlık hacim · solda kadraj dışı **yüksek dikdörtgen pencere** (düz lento, kemer yok). P10b (Temmuz, Filarmoni [K]): isteğe bağlı en çok **bir** sütun gövdesi kenarı (başlıksız, sağda, kadraj kenarı) — kimlik değil, yer değişimi işareti.
**Tek ışık (`prova_isik: "pencere"`, orkestra kararı):**
| Durum | Planlar | Işık vektörü L (u, h, z) | Renk | Pencere konumu |
|---|---|---|---|---|
| `kis` | P02b, P03b, P04b, P05, P06 | (0.55, −0.42, 0.72) | soğuk-gül: havuz `#efd0b6`/`#e4bc98`/`#c48e74` ama dolgu α .55 (soluk); huzme kenarı `#e6b5a0` | **türet:** pencere = hedef − t·L, hedef = sehpa tablası (−0.5, 2.15, 13), t = 10.4 → (−6.2, 6.5, 5.5) |
| `bahar` | P09c | aynı L | havuz tam α, **sıcak** (iyileşme, tasarım §0) | aynı |
| `yaz` | P10b | (0.45, −0.62, 0.64) | sıcak `#f2c9b2` güneş yaması + `#efd0b6`/`#e4bc98` | **türet** hedef = sehpa tablası; Filarmoni penceresi (ayrı bina) |
Huzme: pencere dikdörtgeninin 4 köşesinden L boyunca 4 sınır ışını + 2.5° iç ışın çizgileri (`LanternOda`), dolgu α .10; zeminde paralelkenar havuz ≥ kadrajın %18'i; huzmede toz 30 nokta (dünyaya bağlı). Gölge `golgeCokgen` L'den. P04b kapıdan sıcak şerit **ikincil değil**: kapı açılınca P04a ile aynı içeri-ışık değil, bu salonda kapı kadraj dışı → **kullanılmaz** (tek kaynak; tasarım §0 tablosundaki ikincil şerit kaldırılır, tasarımcıya not).
**Katmanlar (P03b WS örneği, z):** ön = boş sandalye arkalığı (z 9.5, net, kenar ışığı yalnız huzme tarafında) · huzme ve havuz (11–17) · oturan 15 kişi (yüzlü yakındakiler, uzakta `SiluetFigur40` baş eğimiyle) + boş sandalyeler karanlıkta, yalnız ışık kenarı `#c9a0a6` · davul + boş tabure (z 15.5, havuzun kenarında: kurulum okunur) · perde (z 21, kıvrım tepeleri huzmeden gül kenar, oyuklar `#2b2a4f` tarama 9 px) · iki buğu bandı `#6a6488` α .25/.40.
**Palet:** tasarım §2.2 + O1: hacim `#34385a`→`#3d3a66` (C\* 29), orta `#4a4d72`→`#584e7c`, uzak `#6a6488` (aynı), sahne tahtası ışık `#8a6d62`→`#a07862` (havuzda `#c8a98e`), gölge `#4a4060`; perde `#463c62` / kıvrım ışık `#8a7aa6`, kenar `#e6b5a0`.
**Doku:** sahne tahtası SALON §6 ile aynı (seed `tahta` 1942 — P12 ile aynı tahta = süreklilik değil, aynı kit); perde dikiş/kıvrım iç çizgisi; sandalye ahşap damarı 1 çizgi.
**Reçete:** A1–A3 ✔ · A4 ✔ 6 · A5 ✔ · A6 O2 (P06 rack focus σ ≤ 2.5) · A7 ✔ · A8 kış ≥ %14 (havuz ≥ %18), P09c/P10b ≥ %25 · A9 ✔ sandalye/tabure/sehpa altı, perde oyuğu, kol altı · A13 ✔ sandalye aralığı/duruş seed, perde kıvrımı seed · B ✘ `lint` iç mekân (B7 karşılığı: sahne ön paneli üstü, perde üst kenarı) · C uyarı: P10b'de pencere kadraja girerse dış derinlik (gök + uzak çatı hattı) — tasarım §0.1 C çözümü.
**Yön karesi gerekmez** (SALON dili + SALON dünyası). Kalibrasyon önerisi: ilk kontrol karesi **P06 p324** (tabure teması, floor level) — imza nesnesi, havuz ve rack focus aynı karede.

---

## 17. Dört mekânın imza farkı (aynı stil, ayrı ışık ve malzeme)
| | Işık karakteri | Baskın şekil | Malzeme | Sıcak oran hedefi |
|---|---|---|---|---|
| SALON konser | çok kaynaklı tek grup (avizeler), hacim dolu | dikey + portal | taş, bronz, kadife | ≥ %35 |
| SALON prova | tek pencere huzmesi, kenar karanlık | yatay sahne + huzme diyagonali | ahşap tahta, perde | ≥ %14 → %25 |
| BODRUM | tek yarık levhası, her şey karanlık | diyagonal merdiven + dikey yarık | sıva, beton, bez | ≥ %14 (risk) |
| SOKAK kış/yaz | alçak güneş şeritleri, gök geniş | yatay korniş + dikey boru | sıva, granit, kar / taş | ≥ %14 / ≥ %25 |
| HARİTA | masa lambası havuzu | halka (eğri) | parşömen, mürekkep | ≥ %14 / ≥ %25 |

## 18. Kritik riskler
1. **BODRUM sıcak oranı ve p95 (A8):** tek ince şerit + bounce ile P07/P08-3'te sıcak %14 sınırda. Önlem içerde (bounce alanları, yarık halesi); tutmazsa `lint {izin:["sicak_bodrum","p95_bodrum"], not:"saygı planı, tek ışık çizgisi"}` (tasarım §2.7, en düşük p95 70 / sıcak %10). Sessiz gevşetme yok.
2. **P08-3 fizik:** ışık arkadan gelir; yüz **önden aydınlatılamaz** (yön karesinde yüz ön cephesi gölgede, okunurluk kenar ışığı + aşağıdan sıcak yansımayla). Yüz okunmazsa çözüm ışığı taşımak değil, yansıma alanını büyütmek (örtü bandı → çene altı). Eliasberg'in gövdesi levhayı keserse el karanlıkta kalır: her karede "el ışıkta mı" kontrolü.
3. **`fark-ediş` ifadesi ve yüz rig'i yakında (290 px)** kitte yok (tasarım §9.8) → kurulum ekibi; yön karesi bu yüzden zorunlu.
4. **SOKAK kış C\* medyanı:** geniş kar (C\* ≤ 9) kare medyanını düşürür (SALON'daki mürekkep etkisinin aynısı). Ölçüt kar maskesi dışında hesaplanmalı; eleştirmene not. Kar griye kaçmasın: gölge kar `#8f93b4` (C\* 19) mor kalır.
5. **Kızak kararı:** tasarım §1 "kızak çizilmez" ↔ orkestra brifi "kızak — saygıyla". Varsayılan `kizak: "kova"` (boş, yalnız su kovası); tasarımcı/orkestra kapatabilir. Ölü taşıma hiçbir koşulda yok.
6. **Kaynaksız şehir ayrıntıları [G]:** korniş yüksekliği düzeni, rustika, boru, soba borusu dumanı, podvorotnya basık kemeri, Radyo Evi bodrum kuruluşu, kuzey Fin hattı. Hepsi nötr/genel; araştırmacıya: (a) Petersburg sokak cephe düzeni ve 1941–42 kış fotoğrafları (soba boruları, patikalar, su taşıyan kızaklar), (b) Radyo Evi bodrumu, (c) 1941–42 kuşatma hattı haritası (Alman + Fin kesimleri). Yanlış çıkan parça parametreyle kapanır.
7. **Kamera sözleşmesi karışması (O5):** SALON 35 mm = F 1575, `kamera25d` 35 mm = F 1050. Plan kartında mm yazılırken hangi sözleşme olduğu belirtilmeli (yönetmene not).
8. **P13 saat:** tasarım "öğleden sonra", bu şartname "~19:30 akşam" (konser saatiyle tutarlılık, SALON §0.2). Yön aynı; tasarımcı karar verir.
9. **P03a kırıntı fiziği:** kar zemini avucun 1.2 m altında olursa toplama hareketi kadrajdan çıkar → kar yığını sırtı avucun hemen altında (yönetmen konumu onaylar).
10. **Harita kuşatma geometrisi:** tam kapalı halka çizilirse coğrafi yanlış; açık yay + kuzey kesik hattı. Halka "kapanır" animasyonu yine okunur (güneyden Ladoga'ya).
