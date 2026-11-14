# Sahne planı — Yarasa Bombası (yönetmen, v1, 2026-11-14)

Girdi: `senaryo.md` v1.1 (+ `senaryo-en.md`), `dokunuslar.md` v1.1, `mekan-dokumu.md` + `notlar/tur-1.md` (yöntem C), `public/yarasa/ses/plan-sureleri.json`, `ses/{tr,en}/Pxx.json` (kelime zamanları), `src/kit/KATALOG.md`, `src/kit/sinirlar.json`.
Çıktı bu belge. `bolum.json` bu turda YAZILMADI (şablonlar kodlanmadı, doğrulanamaz). Json'a geçişte her satır §5 eşleme tablosundan parametreye çevrilir.

Konvansiyon: kare = 60 fps, **p = plan içi kare**, mutlak = plan başlangıcı + p. Zamanlar "sn (kare)". TR kelime zamanı esas; EN farkı ayrıca yazıldı (plan süresi iki dilin uzunu, animasyon iki dilde AYNI).

## 0. Plan tablosu (süre, mekân, ölçek, tempo, taşıyıcı)

Süre = `plan-sureleri.json` × 60 yuvarlanmış (P09 ve P12 dosyada zaten +1.5 sn anahtar tutması dahil: 4.71→6.21, 4.95→6.45; senaryo/dokunuş metnindeki 6.2/6.6 yerine dosya değeri). Toplam **3760 kare = 62.67 sn** (limit 65 ✓, 12 plan ✓, 3 şablon ✓).

| Plan | Kare (sn) | Başl. mutlak | Mekân | Çekim ölçeği (plan içi değişim) | Tempo | Çıkış taşıyıcısı (sonraki plana) |
|---|---|---|---|---|---|---|
| P01 | 301 (5.02) | 0 | MASA/defter → ÇÖL-ÜS (p135) | insert → geniş (kesme) | hizli | **çıplak #1** → P02: görsel taşıyıcı yok; ses (ateş yatağı sönümü + müzik sürer) |
| P02 | 163 (2.72) | 301 | MASA/defter | yakın (cs 1.40) → orta (1.02) | nefes | kalem ucu + yarım yarasa; P03 kamerası P02 son durumdan devam |
| P03 | 339 (5.65) | 464 | MASA/defter | orta → yakın (göğüs-alev) | bekle | kâğıt: sayfa merkezi (540,1000) → P04 zarf merkezi (540,1000) |
| P04 | 361 (6.02) | 803 | HARİTA (ABD doğu) → MASA (p228) | geniş → orta/insert | hizli | masa + ışık + el hareket yönü (sağdan çıkış → sağdan giriş) + ses |
| P05 | 290 (4.84) | 1164 | MASA/lab | orta → yakın (kapsül) | nefes | kapsüllü yarasa (aynı ekran konumu/boyut) |
| P06 | 339 (5.65) | 1454 | MASA/kesit | insert (bölme) → geniş (kovan) → yakın (bölme) | hizli | merkezdeki bölme (ekran (540,960), aynı bölme boyutu) |
| P07 | 209 (3.48) | 1793 | MASA/tepsi | yakın/insert (cs 2.0→2.25) | bekle | yön SOL (yarasanın baktığı) + ses (kanat titreşimi → uzak kanat) |
| P08 | 392 (6.54) | 2002 | ÇÖL-ÜS | geniş → orta-geniş (cs 1.0→1.35) | nefes | tank (aynı ekran konumu/ölçek) + kamera hareketi sürer + rüzgâr yatağı |
| P09 | 373 (6.21) | 2394 | ÇÖL-ÜS | orta → yakın (cs 1.35→2.5) | bekle (anahtar) | amber nabız noktası → P10 ilk kıvılcım (aynı kare konumu) |
| P10 | 224 (3.74) | 2767 | ÇÖL-ÜS | yakın → geniş (cs 2.5→1.0) | hizli (patlama) | **çıplak #2** → P11: ses (ateş yatağı kuyruğu) + renk (alev turuncusu → harita işareti) |
| P11 | 382 (6.36) | 2991 | HARİTA (ABD) → MASA/belge (p144) | geniş → orta/insert | nefes | mühür izi (kırmızı) + belge sağ kenarda; kamera pan defterine |
| P12 | 387 (6.45) | 3373 | MASA/defter → ÇÖL-ÜS (p112) → MASA/defter (p318) | orta → yakın / orta (tank altı) / orta | bekle (anahtar) | döngü: son kare = P01 p0 (aynı kompozisyon) |
| **Σ** | **3760** | | | | | |

**Ritim kontrolü.** Kare uzunlukları 301·163·339·361·290·339·209·392·373·224·382·387: üst üste 5 benzer yok (P03–P06 dört yakın, P07'de kırılıyor; P10'da tekrar kırılıyor). Tempo dizisi hizli·nefes·bekle·hizli·nefes·hizli·bekle·nefes·bekle·hizli·nefes·bekle: üst üste üç aynı yok. **≥1 sn dinlenme:** P09 tutma 258–348 (1.5 sn, çevre geri çekilir) + P08 p80–150 (TR "1943'te"→"bir" arası ≈1 sn, görüntü üssü kurar). **Patlama:** P10 p102 (alev tutuşması, `darbe`) + P01 p135 sert kesme.
**Çıplak kesme: 2** (P01→P02, P10→P11; sınır 2–3 ✓). Bölüm içi kesmeler (P01 p135, P04 p228, P11 p144, P12 p112/p318) hepsi taşıyıcılı (aşağıda). **Whip yok** (savaş/felaket konusu: whoosh/riser yok, geçiş sesi bütçesi 0).

**Ortak kararlar**
- Işık: ÇÖL-ÜS **geç ikindi** (kaynak saati vermiyor, varsayım): tek güneş sağ-arkadan alçak (≈14°), gölgeler sola-öne uzun, kenar ışığı yarasa/çatı sağ kenarında; tank altı ve saçak altı derin gölge (karanlık köşe). MASA: tek sıcak masa lambası sol-üst, gölge sağ-aşağı. Alev (P01 b, P10, P12 b) görünen kaynak: çevresine turuncu havuz düşer.
- Ton: yarasa yanması/acısı gösterilmez; yarasa gövdesi alevle aynı karede yok (P01'de uzak siluet nokta ≤14 px, P10'da tek tek seçilmez).
- Altyazı: bölüm `altyazi {acik:true, bant:"alt"}` varsayımı (kelime kelime, ses .json'dan); alt bantta temas/kurulum nesnesi varsa plan düzeyi `altyazi:false` ya da `bant:"ust"` (ekran yazısı önceliklidir). Karar orkestraya: kapatmak json'da tek satır.
- Ses: her planda `ses` (TR) = `yarasa/ses/tr/Pxx.mp3`, `ses_en` = `yarasa/ses/en/Pxx.mp3`, **kare 0, ofset yok** (iki dilde ilk kelime 0.07–0.19 sn, nefes sesin içinde). Anlatım 0 dB; foley −5/−9; müzik konuşmada anlatımın −22 dB altı, aralarda ≤ −16 dB; vuruş yatağın +6/8 dB üstü. Whoosh/riser 0.
- Ekran yazıları (üst bant y 240–400, dil başına ayrı katman). Kırmızı vurgu yalnız TEK kelime.
- Kontrol: her plan `kontrol_kare` beyan eder (aşağıda); otomatik seçim yok.

---

## P01 · 301 kare (5.02 sn) · hizli · KANCA
- **Ses:** TR "Yarasalar tam istenen şeyi yaptı." 0.07–2.04 · nefes 2.04–2.49 · "Ve Amerika kendi üssünü yaktı." 2.49–4.42. EN 0.08–1.78 · 2.33–3.72.
- **Kesme (plan içi, `devam_plan`):** **p135 (2.25 sn)** — iki dilde de ses nefesinin içinde (TR 2.04–2.49, EN 1.78–2.33); önemli cümleden önce 0.45 sn nefes. Senaryodaki 2.6 sn'den öne çekildi (sesin sessizliğine oturtmak için).
- **A) p0–134 MASA/defter (lamba), orta→yakın:** defter sayfası kadrajı doldurur (sayfa kenarı + kâğıt dokusu + sıcak ışık görünür). **Ana hareket:** mürekkep sürü spirali (canlı, `faz0` ≈0.55: ilk kare hareketin ortasında) mağara ağzından yükselir, ters-saat yönünde sarar. Kamera: p0 cs 1.10 → p134 cs 1.38 (inout), spiral merkezine (cx −20, cy −60). İlk kare kapak olarak okunur: spiral + ekran yazısı.
- **B) p135–300 ÇÖL-ÜS `yangin-kenar`, orta-geniş:** alçak nötr yapının çatısı alevde, **alev sağ kenarda yarım** (merkez x≈930, kadraj keser); sol yarıda yapının duvarı + uzayan gölge + çöl toprağı. **Ana hareket:** alev saçaktan çatıya yükselir (p135 tutuş → p230 tam). Arka planda yarasa siluetleri uzaklaşır (nokta ≤14 px, yanma yok). Kamera cs 1.00→1.10 (lineer, sabit sayılır; kadraj alevi yarım bırakır).
- **Taşıyıcı (p135 kesmesi):** yükselen siluet kümesi — son defter karesinde sürü kadrajın üst-sağında (x 560–900, y 380–800, yön yukarı-sağ), ilk üs karesinde aynı bölgede aynı yönde gerçek siluetler; kanat sesi `ates-tutus` altında sürer. (Match cut + ses vurgusu.)
- **Ekran (üst bant):** "Hedef: Japonya" p9–p155; "Hedef: Japonya\nYanan: ?" p156 (2.6 sn)–p288, vurgu `?`. Okuma ≥2.4 sn ✓. Üst bant, alev y≥800, çakışma yok.
- **Saklanan şey:** "Yanan: ?" yarım; alevin hangi üsse ait olduğu kadraj dışı.
- **Temas/foley:** p135 `ates-tutus` (−9, kesme vurgusu; yangın görünür ✓). p138 başlayan `ates-yatak` (−14, p301'e kadar). Öncesinde foley yok (mürekkep sessiz; oda tonu).
- **Müzik notu:** p0'dan alçak tek ses (yay/ince drone, −22), p135'te tek derin vuruş (yatak +6 dB); riser yok.
- **kontrol_kare:** p210 (mutlak 210; alev tam, ekran yazısı iki satır). Ek: p60 (spiral).
- **Okunurluk:** alev yüksekliği ≈300 px (%15), net 135→300 = 2.75 sn ✓; spiral %60 sayfa ✓.
- **Ölü alan:** A) alt üçte bir (y 1280–1920): sayfanın alt yarısı karalama notları + defter altı masa kenarı (ceviz) + lamba gölgesi. B) alt: kuru toprak + ön plan çalı silüeti (flu) + yapı gölgesi; y 1290–1480 önemli bilgi yok.
- **Fizik:** alev bina çatısında (zeminde değil); yarasa siluetleri yer seviyesinden yükselmiyor, ufukta.

## P02 · 163 kare (2.72 sn) · nefes · defter (zaman atlaması "geri sarım")
- **Ses:** TR 0.10–2.08 ("Her şey bir diş hekiminin fikriydi."), EN 0.065–1.675. Plan ≥2 sn ✓.
- **Mekân/ölçek:** MASA/defter (lamba), yakın→orta. **Ana hareket (tek):** kamera geri çekilir. Kamera: p0 cs 1.40 (cx 30, cy 80) → p100 cs 1.02 (cx 0, cy 0), egri `giris`; p100–162 sabit. "Geri sarım" kâğıt/kamera diliyle (görsel geri-oynatma efekti yok).
- **Kadraj:** defter sayfası dikey; üst (y 470–900) mürekkep mağara ağzı + sürü spirali (P01'in aynı spiral, `faz0` P01'den **bağımsız**, çizim tamamlanmış); alt yarı (y 1000–1250) **asılı yarasa** çizimi: baş aşağı, ayakları kirişte, kanat katlı, **göğsü boş**. Sağ altta sivil el (`el.tip: yazici`, nötr manşet) kalem tutar; **kalem p60–125 sağ-alttan girer, ucu yarasa göğsü hizasında (x 540, y 1130) durur (p125)**, p125–162 sabit tutulur (hareket tamamlandı). Adams kadrajda yalnız el + defter.
- **Ekran (üst):** "Dr. Lytle Adams · diş hekimi\nCarlsbad Mağarası" p8–p150 (2.37 sn, 6 kelime ✓), üst bant üstünde mağara çizimi yok (çizim y≥470).
- **Saklanan şey:** yarasa göğsü boş, kalem durur; çizilmez.
- **Temas/foley:** p95 `kalem-kagit` (−10, kısa sürtme); p125 `kalem-tik` (−9, ucun kâğıda değmesi).
- **Müzik:** P01'in vuruşu P02 p0'da sönümlenir; yatak −22'ye iner, sıcak tek nota.
- **kontrol_kare:** p150. **Okunurluk:** el+kalem ≈%12 (≈230 px, küçük jest yakın kamera ✓), kalem net 125→162 = 0.6 sn (jest kapanış anı; ana okuma yarım yarasa/boş göğüs ≥2 sn).
- **Ölü alan:** alt üçte bir: defter altı, el + masa ahşabı (y 1650+ koyu ceviz + lamba gölgesi); y 1290–1490 el/kalem + sayfa karalamaları.
- **Taşıyıcı:** kalem ucu (540,1130) ve yarım yarasa → P03 aynı konum/kamera.

## P03 · 339 kare (5.65 sn) · bekle · D1 "Kalem durur, alev çatıya sıçrar"
- **Ses:** TR 0.10–5.02: "Yarasa karanlık çatı altına tüner." 0.10–1.75+ · nefes · "Göğsüne yangın bağlasan," 2.53–3.38+ · "o çatı yanar." 4.23–5.02. EN 0.14–4.26 (Give one a fire 2.29; and the roof burns 3.3–4.26).
- **Mekân/ölçek:** MASA/defter, orta→yakın (göğüs+alev). **Kamera (P02 son durumundan devam, elle eşit):** p0 cs 1.02 (cx 0, cy 0) → p150 cs 1.35 → p204 cs 1.70 (göğüs ekran (540,1000)) → p338 cs 1.72. P02'deki asılı yarasa AYNI çizim: bu planda tamamlanır.
- **Ana hareket (tek): kalem çizer.**
  - p6–76 (0.1–1.27) kalem yarasanın üstüne **ahşap taramalı çatı çizgisi** çizer (eğik çizgi + alt tarama, Japon üslubu iddiası yok; ekranda y≈700–780 @cs 1.7).
  - p100–140 (1.67–2.33, "tüner") kalem yarasanın ayaklarını kirişe oturtur (tünek tamamlanır).
  - p150–178 kalem göğse gelir (2.5, "Göğsüne").
  - **D1 pencere p180–318:** p180–204 (3.0–3.4) kalem göğüste **DURUR** (çizgi yok, ses yok; TR "yangın"), p204–258 küçük kırmızı alev çizilir (3.4–4.3 "bağlasan"), p252–294 alev çizgisi göğüsten kirişe uzanır (TR "o çatı" 4.23/4.41), p276–318 çatı taraması kırmızıya döner ("yanar" 4.7). Bit p318 = plan sonundan 21 kare ✓.
- **Ekran:** "Hedef: ahşap Japon şehirleri" p72–p320 (4.1 sn), üst bant; çatı y≥700 çakışmaz.
- **Saklanan şey:** alev göğüste mi çatıda mı başlıyor — kalem 0.4 sn durup sonra çizer; kadraj defterde, alev çizgisi çatıya varana dek belirsiz.
- **Temas/foley:** p6 `kalem-kagit` (−9), p100 `kalem-kagit` (−9), p204 `kalem-tik` (−6), p210 `kalem-kagit` (−9), p256 `kalem-kagit` (−9); p180–204 sessizlik (nefes).
- **Müzik:** P02'nin sıcak notası sürer; p180'de müzikal cümle askıda (yatak −22'de tutulur), p204'te tek nota yükselir (yatağın +6 dB), p300 sönümlenir.
- **kontrol_kare:** p264 (alev çizgisi çatıda, tarama kırmızıya dönüyor). **Okunurluk:** alev ≈200 px (%10.4) + kalem uçları, net 204→318 = 1.9 sn ✓; çizim sayfa ≈%30+.
- **Ölü alan:** üst üçte bir: ekran yazısı + defter üst kenarı + çatı çizgisi (y 700+); orta: yarasa+alev; alt üçte bir (y 1280–1920): sayfa alt yarısı (P02'de çizilmiş küçük notlar/karalama), kalem gölgesi ve masa kenarı.
- **Fizik:** baş aşağı asılı yarasanın göğsü kameraya bakar (ventral); çatı kirişte tutunma.
- **Taşıyıcı (→P04):** kâğıt. P03 son karede sayfa merkezi (540,1000) → P04 p0'da aynı konum ve ton: harita zarf ikonu (540,1000), sayfa rengi (kâğıt krem) taşınır.

## P04 · 361 kare (6.02 sn) · hizli · HARİTA (ABD doğu) → MASA/belge
- **Ses:** TR 0.18–5.38: "Pearl Harbor'dan bir ay sonra Adams Beyaz Saray'a yazdı." 0.18–3.37(+0.2) · nefes · "Başkan işe baktırdı." 4.28–5.38. EN 0.10–4.38 ("wrote the White House." 1.61–2.7; "The president had it studied." 3.02–4.38).
- **Kesme (`devam_plan` HARİTA→MASA-INSERT): p228 (3.8 sn)** — TR "yazdı" 3.6'da bitti, "Başkan" 4.28'de başlar (TR sessizlik); EN "The president" (3.02–) sürüyor: görüntü EN'de sözden sonra gelir, kabul.
- **A) p0–227 HARİTA `abd/dogu`, geniş:** Doğu kıyısı bölgesi (Pennsylvania–Maryland–Virginia, Pittsburgh çevresi Irwin → Washington), parşömen + gravür tarama. **Ana hareket:** mürekkep rota Irwin→Washington çizilir (p18–200, `rota_ciz`), zarf ikonu rota ucunu izler, **kamera rota ucunu ekranda (540,950) tutar** (`kamera_takip` p10–200, cs 1.0→1.5). Zarf Washington'a varır p204 (TR "yazdı" 3.37): zarf ikonu haritaya konar, `kagit-tok`. Washington noktası y≤1300 (alt güvenli ✓), etiketler yazı katmanında (özel ad TR=EN).
- **B) p228–360 MASA/belge (lamba), orta/insert:** zarf (320×220 px, ≈%11) masada **aynı ekran konumu (540,960)**; **ana hareket: el not düşürür:** `el.tip: ceket` (koyu manşet) sağdan girer p240–290, notu zarfın yanına bırakır **p297 (temas)**, geri çekilip sağdan çıkar p297–335 (bit p335, plan sonuna 26 ✓). Not: küçük kâğıt, **sağ kenarı kıvrık**, ikinci satır görünmez (dil-nötr çizgi + tek satır). Kamera cs 1.0→1.25 (p228–350).
- **Ekran (üst bant):** "Ocak 1942" p15–p225 (3.5 sn); "Başkanın notu:\n"Bu adam kaçık değil."" p246–p345 (1.65 sn net; 5 kelime ✓). Vurgu: yok.
- **Saklanan şey:** notun geri kalanı (kıvrık kenar, ikinci satır kapalı).
- **Temas/foley:** p204 `kagit-tok` (−9, zarf harita üstüne), p297 `not-birak` (−9). p228 kesmesinde `kagit-hisirti` (−12) iki yönü bağlar.
- **Müzik:** yatak sürer (−22), p228'de aynı akor devam; harita fazında hafif tempo (hizli).
- **kontrol_kare:** p306 (not düşmüş, ekran yazısı iki satır). Ek: p204 (zarf varış).
- **Okunurluk:** zarf ikonu haritada ≈150×100 px (360'ta 28×19 px ✓ ≥20); masada zarf/not ≥%11; not net 297→361 = 1.0 sn + yazı.
- **Ölü alan:** A) harita parşömeni tam kadraj, alt üçte bir: kıyı çizgisi + pusula gülü (y 1290–1480 önemli bilgi yok ✓); B) masa ceviz + not/zarf gölgeleri + lamba gölgesi.
- **Fizik:** zarf haritanın üstünde (nesne bir yerden girer: sayfa katlanarak zarfa dönüşmüş P04 p0–12'de: "sayfa merkezi → zarf" taşıyıcısı, sayfa/zarf morfu 12 karede biter).
- **Taşıyıcı (→P05):** el yönü: bu plan elin sağdan girip sağdan çıkışı; P05 cımbızlı el sağdan girer. Ayrıca ışık/masa aynı + `kagit-hisirti` kuyruğu → `pens-tik`.

## P05 · 290 kare (4.84 sn) · nefes · D2 "Kapsül yapıştırılır, kapak kapalı kalır"
- **Ses:** TR 0.10–4.19 ("Napalm'i geliştiren Fieser," 0.10–1.7 · "yarasaya takılacak" 1.92–3.0 · "minik bir kapsül yaptı." 3.03–4.19). EN 0.13–3.86 (capsule 2.86).
- **Mekân/ölçek:** MASA/lab (lamba; beyaz laboratuvar eli, ten rengi aynı), orta→yakın. **Kamera:** p0 cs 1.0 → p130 cs 1.90 (inout; kapsül noktası ekran (540,1000)) → p289 cs 1.95. İlk kare: pamuk yatak üstünde **uyuyan yarasa** (sırtüstü, kanat gövdeye katlı, kımıltısız, göğüs yukarı) ekran merkezi; kapsül ve eller **girişleriyle** gösterilir (kurulum → karşılık: ilk kez görülen hiçbir şey birden belirmez).
- **Ana hareket (tek): kapsül göğse yapıştırılır.**
  - p0–50 sağdan `el.tip: gomlek` (beyaz önlük kolu) **cımbızla kapsülü** getirir (kapsül = selüloz silindir kap, ucu kapalı küçük kapak).
  - p50–120 soldan ikinci el (`gomlek`) damlalık (cam çubuk) getirir.
  - **D2 pencere p144–228:** p144 (2.4) damla göğse düşer (`damla-yapistir`), p150–180 damlalık sola çıkar; p156 (2.6) kapsül tabanı damlaya değer (`pens-tik`); p192 (3.2) kap bastırılır, **oturur** (`kap-oturma`); p192–228 cımbız bırakır, sağa çıkar (bit p250, plan sonuna 40 ✓).
  - p228–289 kapsül yapışmış, **kapak kapalı** (hold).
- **Ekran:** "Louis Fieser · Harvard kimyacısı · napalm" p24–p264 (4.0 sn), üst bant (iki satır ·).
- **Saklanan şey:** kapak altı (P09 amber nabzı kurar).
- **Temas/foley:** p144 `damla-yapistir` (−9, çok kısık), p156 `pens-tik` (−9), p192 `kap-oturma` (−6). Yarasa sessiz (acı/çırpınma yok).
- **Müzik:** P04'ten gelen yatak; p144–228 müzik tek nota/boşluk, foley öne çıkar.
- **kontrol_kare:** p216 (kapsül oturmuş, kapak kapalı).
- **Okunurluk:** kapsül ≈230–250 px (≥%12) @cs 1.9; kapak kapalı net 192→289 = 1.6 sn ✓.
- **Ölü alan:** alt üçte bir: pamuk yatağın alt kısmı + yarasanın kanat katları + masa üstü cımbız gölgeleri; y 1290–1490 kanat/pamuk (önemli bilgi yok).
- **Fizik:** yarasa pamukta yatar (yer çekimi ✓); eller masa kenarından girer; damla kapsül tabanında değil göğüste.
- **Taşıyıcı (→P06):** kapsüllü yarasa göğsü (540,1000) ve boyutu: P06 p0 aynı yarasa bölmede aynı ekran konumunda (cs 2.6).

## P06 · 339 kare (5.65 sn) · hizli · kovan kesiti
- **Ses:** TR 0.10–4.99: "Kapsüllü yarasalar uyutulup kovana dizildi;" 0.10–2.7 · "havada açılınca uyanıp çatılara tüneyecekti." 2.74–4.99. EN 0.15–2.54 (kısa; EN sesi plan ortasında bitiyor, görüntü TR'ye göre).
- **Mekân/ölçek:** MASA/kesit (diyagram dili, lamba sıcak vurgu), insert → geniş → yakın. **Kamera:** p0 cs 2.60 (bölme) → p100 cs 1.00 (kovan tam) → p215 cs 1.00 → p280 cs 1.35 → p327 cs 2.00 (merkez: kıpırdayan bölme (540,960)) → p338 sabit.
- **Ana hareket (tek): kovan açılır, yarasalar dağılır** (diyagram), kamera tepsiye döner.
  - p0–100: P05 yarasasının bölmesinden geri çekilme; **p15–100 ~26 tepsi** (düz yuvarlak, yan kesitte kat kat, bölmelerinde uyuyan yarasa) kovana **üstten tek tek oturur** (stagger ≈3 kare) — "dizildi" TR 1.63–2.7 ✓.
  - p100–170 (1.67–2.8) bomba biçimli kovan kesiti tam görünür, bekler (ekran yazısı okunur).
  - p170–225 (2.83–3.75, "havada açılınca" 2.74–3.57) kovan yan kapakları açılır.
  - p215–262 yarasalar kovandan dağılır (üst üç tepsi; diyagram okları); kamera p215'ten tepsiye yaklaşır.
  - **p300–325 saklanan:** tepsilerden birinde **tek bölme** hafif kıpırdar (kanat bir kez titrer, 8 kare). Plan sonu p338; kamera yaklaşması p327'de biter (marj tam 12 ✓).
- **Sapma (orkestra bilsin):** senaryodaki "kovan kapağı yeniden kapanır" **çıkarıldı** — kıpırdama telefonda okunsun diye son 60 kareye kamera yaklaşması konuldu; kapanış animasyonu için süre yok. Gerekirse P06 +45 kare (toplam 3805 = 63.4 sn, hâlâ ≤65).
- **Ekran:** "Soğukla uyutuldu · kovan başı ~1.000 yarasa" p30–p250 (3.7 sn).
- **Saklanan şey:** kıpırdayan bölme (P07 açar).
- **Temas/foley:** p25 `tepsi-dizilim` (−12, tek yuvarlanan tık dizisi), p185 `kovan-ac` (−9, metal menteşe), p225 `kanat-uzak` (−12, hafif), p305 `kanat-titrek` (−10, çok kısık).
- **Müzik:** hafif tempo artışı p170 (açılma), p300'de dinlenme, yatak −22.
- **kontrol_kare:** p305. Ek: p215 (açılma + dağılma).
- **Okunurluk:** kovan kesiti ≈%45 yükseklik (x 380–700, y 520–1380; burun y ≤1400 ✓); tepsi bölmeleri @cs 2.0: kıpırdayan yarasa ≈200 px (≈%10.4), net 300→339 = 0.65 sn + P07'de devamı; kabul (lint `izin: ["okunurluk_net_sure"]`, not: devamı P07'de yakın planda).
- **Ölü alan:** zemin teknik çizim kâğıdı (mavi-gri baskı + sıcak lamba vinyeti); alt üçte bir: kovan burun bölümü + ölçü çizgileri/oklar (y 1290–1480 yalnız çizgi, önemli bilgi yok).
- **Taşıyıcı (→P07):** kıpırdayan bölme ekranın merkezinde (540,960), boyut aynı; P07 üstten tepsi yakın planı.

## P07 · 209 kare (3.48 sn) · bekle · D3 "Kanat titrer, baş karanlığa döner"
- **Ses:** TR 0.10–2.84 ("Ama nereye tüneyeceğine yarasa kendi karar verir." nereye 0.32, tüneyeceğine 0.67, yarasa 1.31, kendi 1.84, karar 2.21, verir 2.56). EN 0.10–1.36 (görüntü TR'ye göre).
- **Mekân/ölçek:** MASA/tepsi (üstten), yakın/insert. **Kamera:** p0 cs 2.00 → p208 cs 2.25 (lineer, çok yavaş push); merkez bölme (540,960).
- **Ana hareket (tek): bir yarasa kanadını titretir, başını sola çevirir.** Dairesel tepsi, bölmelerde kımıltısız uyuyan yarasalar (komşular durağan). **D3 pencere p30–168:** p30 & p60 iki seğirme (kanat), **p84–144 baş dönüşü** (sola ≈ −45°, tepsi kenarının karanlık gölgesine), p144–168 durur (hold). Bit p168 = plan sonuna 41 ✓.
- **Ekran:** "Tüneyeceği yer: saçak altı, tavan arası" p21–p190 (2.8 sn, 7 kelime ✓).
- **Saklanan şey:** baktığı karanlık köşe kadraj dışında (sol kenar gölgesi).
- **Temas/foley:** p30 `kanat-titrek` (−9), p60 `kanat-titrek` (−9); baş dönüşü sessiz.
- **Müzik:** yatak boşalır (nefes), tek uzun nota p84'ten.
- **kontrol_kare:** p120. **Okunurluk:** baş ≈230–260 px (≈%12–13 ✓ küçük jest = yakın kamera), net 30→168 = 2.3 sn ✓.
- **Ölü alan:** tepsi çemberi (ø ≈1000 px) tüm alt üçte biri doldurur: komşu bölmeler ve uyuyan yarasalar (y 1100–1500), alt band önemli bilgi yok.
- **Fizik:** yarasa bölmenin içinde, baş döner ama bölme dışına çıkmaz.
- **Taşıyıcı (→P08):** yön SOL (baktığı yön) → P08'de sürü gölgesi sağdan sola; ses: `kanat-titrek` → `kanat-uzak` ses köprüsü. Kesme hareket bittikten (p168) sonra p209'da; ortada değil.

## P08 · 392 kare (6.54 sn) · nefes · D4 "Defter spiralinin aynası" · ÇÖL-ÜS geniş
- **Ses:** TR "15 Mayıs 1943'te" 0.19–1.4 · **sessizlik ≈1.0 sn (1.4–2.42)** · "bir yardımcı hava üssünde" 2.42–3.9 · "silahlı yarasalar" 3.93–4.9 · "kazayla salındı." 5.0–5.91. EN "On May 15, 1943," 0.10–1.2 · "armed bats escaped" 2.35–3.5 · "at an auxiliary airfield." 3.57–4.91.
- **Mekân/ölçek:** ÇÖL-ÜS `genis`, geç ikindi, geniş. **Kamera:** p0 cs 1.00 → p260 cs 1.06 → p391 cs 1.35 (tank merkezi ekran (540,1130), cx −60, cy −90). **Bitiş durumu = P09 başlangıç durumu** (elle eşitle).
- **Kadraj:** gök y 0–1000 (güvenli üst 220), ufuk y≈1010, alçak nötr yapılar y 880–1150 (üç yapı, farklı boy/aralık; kule/hangar/kışla tipi YOK), **yakıt tankı** (silindirik, ayaklı, x≈640, taban y≈1160, 260×200 px) bir yapının yanında (saçak tankın üstüne uzanır), uzak sırt, ön plan çıplak toprak + kuru çalı + uzun gölgeler.
- **Ana hareket (tek): sürü spirali yükselir ve yayılır; gölgesi tankın üstünden geçer (P01–P02 defter spiraliyle aynı biçim ve yön).**
  - p0–200 üs kurulur (kıpırdama: toz, rüzgâr, çalı) — **nefes/bekle** (TR sessizliği 1.4–2.42 içinde).
  - **D4 pencere p200–372** (senaryo/dokunuş pencerelerinden kayık: kelime zamanına bağlandı): p200–280 (3.33–4.67) bulut kadrajın **sağ alt kenarından** (yer seviyesi, kadraj dışı) yükselir, ters-saat spiral, "silahlı yarasalar" 3.93; p275–340 yumuşak gölge zeminde sağdan sola kayar, **tank gövdesine düşer (net 1.08 sn)**, "kazayla salındı" 5.0–5.9; p340–372 gölge sol kenardan çıkar; bulut kadrajın üstünde yayılmış, **hiçbir şey yere inmedi**. Bit p372 = plan sonuna 20 ✓.
  - p340–391 kamera tank'a yaklaşır (cs →1.35).
- **Ekran:** "Carlsbad yardımcı sahası · New Mexico · kaza" p30–p372 (üst bant, 5.7 sn).
- **Saklanan şey:** sürünün nereye ineceği (bulut üstte, binalar altta).
- **Temas/foley:** p0 ortam rüzgâr (−18, sürekli), p200 `kanat-uzak` (−9, p270'e dek hafif kabarır); gölge sessiz.
- **Müzik:** P07'den gelen tek nota tutulur; p200'den ince gerilim (riser yok), yatak −22.
- **kontrol_kare:** p315 (gölge tankın üstünde). **Okunurluk:** gölge ≈%35 çap (≈340 px), tankta ≥1.08 sn ✓; spiral bulutu y 300–800 (≈%26).
- **Ölü alan:** gök (spiral + güneş ışığı), orta (yapılar + tank), alt üçte bir (y 1280–1920): toprak, çalı, gölge uzantıları, lastik izi; alt band önemli bilgi yok (tank taban y 1160 ✓ <1290).
- **Fizik:** tank yapı yanında, ayakları zeminde (temas gölgesi); gölge güneşin tersine (sola).
- **Taşıyıcı (→P09):** tank aynı ekran konumu + ölçek (kamera hareketi sürer) + rüzgâr yatağı; kesme yok (P09 kamerası p0'da P08 son durumda).

## P09 · 373 kare (6.21 sn) · bekle · ANAHTAR · D5 "Tünme dalgası + amber nabız"
- **Ses:** TR "Karanlık köşe arayan yarasalar," 0.11–1.18+ · nefes · "yakıt tankının altına bile tünedi." 1.99–4.06 (tünedi 3.73). EN 0.13–3.46. Konuşma biter p244 (4.06); **tutma p258–348 (4.3–5.8)** = okuma 4.3 + 1.5 ✓ (plan sonu 373: 25 kare kuyruk).
- **Mekân/ölçek:** ÇÖL-ÜS `tank-alti`, orta→yakın. **Kamera:** p0 cs 1.35 (P08 sonu) → p220 cs 2.50 (inout push-in, tank altı) → p372 cs 2.50 (+0.03 mikro drift, tutma "kıpırtısız"). Vinyet (çevre geri çekilir) 0→0.55, p120–258.
- **Kadraj:** tankın alt yüzü + ayaklar arası çelik kiriş (I-profil) + bitişik yapı saçağı/saçak kirişi; **tank altı derin gölge**, sağdan alçak güneş gölge ağzına kenar ışığı. Tank altı y 800–1250, zemin y 1250+.
- **Ana hareket (tek): yarasalar tek tek tünek yüzeylerine tutunur (soldan sağa), kapsül uçları amber nabız atar.**
  - **D5 pencere p48–348:** tünme p48–258 (0.8–4.3): 7–9 yarasa saçak kirişine/tank kirişine **düzensiz aralıkla** (p70, 90, 150, 165, 215, 235…) soldan sağa tutunur, kanat katlar; son tünme p235–245 (TR "tünedi" 3.73=224).
  - amber nabız p180'den (≈1.2 sn periyot = 72 kare, `kapsul_nabiz{renk:"amber"}`; kırmızı LED YOK, dokunuşlar kararı).
  - p258–348 tutma: yarasalar kıpırtısız, yalnız nabız (kadraj kesilmez, ses boşalır).
- **Ekran:** "Zamanlayıcılar işliyor" p48–p355 (üst bant, kısa; anahtar plan, anlatımı tekrar etmez).
- **Saklanan şey:** kaç dakika kaldığı bilinmiyor — nabız ritmi sabit, sayaç yok.
- **Temas/foley:** p90, p150, p215 `tutun-uzak` (−9 ×3, görünürde tünme), p0 ortam tank metal inlemesi (−12). Nabızda foley YOK. Müzik yatağı p258–348'de −26'ya iner, tek uzun nota.
- **kontrol_kare:** p300 (tutma, nabız). Ek: p160 (tünme).
- **Okunurluk:** yarasa ≈%15–20 (290–380 px); kapsül kümesi nabzı ≥%10 (yoksa cs 2.8, katalog dışı → `kit_eksik`); tutma 1.5 sn ✓.
- **Ölü alan:** alt üçte bir: tank ayakları + zemin gölgesi + toprak (y 1250–1920), alt band y 1290–1490 boş-ama-dolu (gölge/ayak, önemli bilgi yok). `altyazi:false` (bu planda tutma sessiz).
- **Fizik:** yarasalar tünek yüzeyinde (kirişin ALT yüzü), baş aşağı; alev yok, yarasa–alev aynı karede değil ✓.
- **Taşıyıcı (→P10):** son nabız noktası (P09 son karede kapsül ucu ekranda (X,Y)) = P10 ilk kıvılcımın konumu; P10 kamerası P09 son durumdan başlar (cs 2.50).

## P10 · 224 kare (3.74 sn) · hizli · PATLAMA · D6 "Üç kıvılcım, sonra alev"
- **Ses:** TR "Kapsüller tek tek yandı." 0.10–1.7 (tek tek 0.89, yandı 1.43) · nefes · "Üs tutuştu." 2.39–3.11. EN "Then the capsules lit." 0.10–1.1 · "The base burned." 1.64–2.35.
- **Mekân/ölçek:** ÇÖL-ÜS (`tank-alti` → `yangin`), yakın → geniş. **Kamera:** p0–110 cs 2.50 sabit (P09 son durum) → **p110–208 cs 1.00 geri çekilir** (inout, ≥16 kare marj); bitiş geniş kadraj P08 geniş cs'ine eşit.
- **Ana hareket (tek): kapsüller tek tek tutuşur, alev saçağa ve yapıya yayılır.**
  - **D6 pencere p12–144:** kıvılcım **p12 / p42 / p72** (≈0.5 sn arayla; her biri saçağa/tanka kendi turuncu ışığını düşürür; kapsül yarasa göğsünde ama **yarasa gövdesi kadrajda net değil**: kıvılcımlar gölgede ışık noktası), **p102 (1.7) alev saçağa tutuşur** + `darbe` (siddet 0.6, flas 0.4, duman, sarsıntı küçük), p102–144 alev saçak boyunca çatıya yayılır.
  - p110–208 geri çekilirken **binalar alevde** (yapılar sırayla: alev p120, 140, 170); uzakta sürü çok küçük nokta bulutu (≤14 px, tek tek seçilmez).
  - p208–224 kapanış: alev sürer, duman yükselir (hold 16 kare).
- **Ekran:** "Test sahası yandı · anlatılana göre\nhangar, kışla, bir generalin arabası da" p30–p212 (3.0 sn; 11 kelime sınırda; uzarsa son satır çıkar: karar orkestranın "çıkarılabilir" notu). Üst bant y 240–400.
- **Saklanan şey:** hangi arabanın general'in olduğu (yalnız yazı).
- **Temas/foley:** p12 `kivilcim-cirt` (−9), p42 `kivilcim-cirt` (−7), p72 `kivilcim-cirt` (−5), p102 `ates-tutus` (−7) + darbe, p105 `ates-yatak` (−12, plan sonuna dek). Whoosh/riser YOK.
- **Müzik:** yatak sürer; p102'de tek vuruş (yatak +7 dB), sönümlenir; yarasa ölümü/acısı ima edilmez.
- **kontrol_kare:** p108 (alev saçağa tutuşuyor). Ek: p200 (geniş yangın).
- **Okunurluk:** her kıvılcım halo + yansıma ≈%10–12, 0.5 sn arayla (her biri ≥0.4 sn net), alev %15+, toplam 2.2 sn ✓.
- **Ölü alan:** yakın karede tank altı gölgesi + kıvılcım ışık havuzları (alt üçte bir zemin + yansıma); geniş karede alt üçte bir toprak + yangın ışığı yansıması + uzun gölgeler.
- **Fizik:** alev bina saçağından başlar (tankın kendisi yanarken gösterilmez); darbe sarsıntısı kameraya, dünya modeline değil.
- **Taşıyıcı (→P11) — çıplak #2:** görsel yok (şok: sert kesme); ses (ateş yatağı P11 p0–30'da −14→−30 sönümlenir) + renk (alev turuncusu → harita üzerindeki Dugway işareti turuncu halka).

## P11 · 382 kare (6.36 sn) · nefes · D7 "Mühür belgenin üstüne iner, başlık açılır"
- **Ses:** TR "Yine de proje sürdü." 0.10–1.03 · **nefes 1.03–1.92** · "Sonunda Amiral King," 1.92–3.4 · "silah geç hazır olacağı için" 3.41–5.0 · "iptal etti." 5.07–5.72. EN "Still, it went on," 0.13–0.8 · "until Admiral King cancelled it as too slow." 0.99–3.29 (EN "cancelled" 1.92, TR 5.07: 3.1 sn fark; temas TR'ye bağlandı).
- **Kesme (`devam_plan` HARİTA→MASA): p144 (2.4 sn)** — TR "Amiral" 2.41'de başlar ✓; EN "cancelled it" ✓.
- **A) p0–143 HARİTA `abd/ulusal`, geniş→orta:** Utah (Dugway) noktasına **kamera_takip** (p0–110, cs 1.0→2.0); iğne düşer p60 (`igne-tak`); p62–115 (TR nefes 1.03–1.92) çölde **küçük köy ikonları** sırayla çizilir (6 ev, her 56 px, "Japon evi kopyaları" simgesi: basit yarım-ahşap çatı); p100–138 küçük sürü ikonu köyün üstüne süzülüp oturur (hareket p138'de biter, yanma yok). Sınır: ekran Dugway merkezi (540,900).
- **B) p144–381 MASA/belge (lamba), orta/insert:** belge masada **aynı ekran merkezi (540,960)**. **Ana hareket: iptal mührü iner.**
  - p144–200 `el.tip: gorevli` (koyu nötr manşet, düğmesiz) mührü tutarak üstten girer; p200–282 havada bekler (nefes: "silah geç hazır olacağı için", TR 3.41–5.0).
  - **D7 pencere p264→340 (temas p294, TR 4.9):** p282–294 hızlı iniş, **p294 vuruş** (kırmızı çarpı mührü, dil-nötr); p294–330 belgenin **başlığı açılır**: başlığı örten ince kâğıt (not kâğıdı) vuruş sarsıntısıyla sağa kayar (`baslik_ortu`); p300–340 el çekilir, sağ-üstten çıkar. Mühür oturmuş p294–370 (**1.27 sn**; D7'nin 4.4 sn temasından 0.5 sn kaydırıldı: TR "iptal" 5.07 vuruşun 0.17 sn sonrasına düşer; EN'de vuruş sözden sonra, kabul).
- **Ekran:** A (harita, p6–p230): "Anlatılana göre Dugway, Utah'ta\nJapon evi kopyaları" (3.7 sn; kesmeyi aşar). B (p236–p366): "en erken 1945 ortası · ~2 milyon $ harcandığı söylenir" (2.2 sn). Üst bant, kesişme yok; replik yok.
- **Saklanan şey:** belge başlığı mühür inene kadar kapalı.
- **Temas/foley:** p60 `igne-tak` (−9), p62 `kalem-kagit` (−10, köy çizimi), p144 `kagit-hisirti` (−12, kesme köprüsü), **p294 `muhur-tok` (−5)**, p298 `kagit-hisirti` (−12, başlık örtüsü kayar).
- **Müzik:** yatak −22; p282'de nefes; p294'te tek vuruş (+6 dB); "iptal" 5.07 vuruşun hemen arkasında.
- **kontrol_kare:** p340 (mühür oturmuş, başlık açık, el çıkmış). Ek: p110 (köy ikonları).
- **Okunurluk:** mühür çapı ≈340 px (≈%18), oturmuş 1.27 sn ✓ (≥1 sn); köy ikonları: 56 px telefonda 10 px kalır (≥20 px kuralı), bu yüzden **ikon_px 112, ev sayısı 4** (yukarıdaki "6 ev, 56 px" bu değerle ezilir; lint izni yok).
- **Ölü alan:** harita: parşömen + ABD kıyı çizgisi + etiket yok; alt üçte bir: Utah altı eyaletler + tarama; masa: belge ≈%45, çevre ceviz + lamba gölgesi + defter köşesi (sol kenar, kurulum).
- **Fizik:** el belgeyi örtmez (üstten gelir, vuruşta mühür belgenin üstüne tam iner), mühür bırakıldığında el geri çekilir (mühür elde kalır, izi bırakır).
- **Taşıyıcı (p144):** kâğıt (parşömen ↔ belge kâğıdı; ikon merkezi (540,900) → belge merkezi (540,960)) + ses. **(→P12):** mühür izi (kırmızı) belgede kalır, belge P12 p0'da sağ kenarda; kamera defterine pan; **defter köşesi P11 B'de sol kenarda kurulu**.

## P12 · 387 kare (6.45 sn) · bekle · ANAHTAR · döngü
- **Ses:** TR "Savaşta hiç kullanılmadı." 0.11–1.8 · "En bilinen yangınını kendi üssünde çıkardı." 1.87–4.31 (EN 0.16–1.1 · 1.65–4.12). Konuşma p259'da (4.31) biter; tutma ekran yazısı ile p118–340 (3.7 sn = okuma ≈2 sn + 1.5 ✓).
- **A) p0–111 MASA/defter, orta→yakın:** defter (P03 çizimi: çatı + asılı yarasa + alev) solda, **kenarda mühürlü belge** (sağ kenar x 860–1000, kırmızı mühür izi okunur) **aynı masa, aynı lamba**. Kamera P11 son durumundan: p0 cs 1.25 (cx 0, belge sağ kenarda) → p111 cs 1.90 (cx −90, çizime pan) (çizimdeki çatı çizgisi ekranda y≈700–760, **eğim/konum kaydedilir**).
- **Kesme 1 (`devam_plan`) p112 (1.87 sn)** TR "En" 1.87 ✓. **Taşıyıcı:** çatı çizgisi (aynı eğim, aynı ekran konumu x 150–930, y 700–760; kırmızı tarama → gerçek yanmış saçağın kızıl kömür rengi). Match cut.
- **B) p112–317 ÇÖL-ÜS `yanik` (tank altı kadrajı, cs 2.0), orta (tank altı):** **yanmış saçak kirişi + kararmış tank gölgesi**; alev yok (sönmüş), ince duman, kıpırtı yok. Kamera **durur**: p112–172 (0.8 sn) tam sabit, sonra çok yavaş geri çekilme cs 2.0→1.9; vinyet 0→0.45 (çevre geri çekilir). **Ana hareket:** yok (hold; anahtar karşılık; yalnız duman/ışık).
- **Kesme 2 (`kesme_2`, döngü) p318 (5.3 sn):** ÇÖL-ÜS → MASA/defter; **yanmış çatı mürekkebe geri döner** (`murekkebe_don`: kızıl saçak çizgisi 18 karede defter kalem çizgisine çözülür, fade değil: çizgi gerçek çizgiye eşlenir), p340–360 kamera geri çekilir cs 1.7→1.10, **p352–372 defter sayfası geri çevrilir** (`kagit-cevir`), p372 son durum = **P01 p0 kompozisyonu** (defterin ilk sayfası, mağara ağzı + yükselen mürekkep spiral, cs 1.10, cx 0, cy 0, `faz0` = P01'in `faz0`). p372–386 hold (15 kare, ≥12 ✓).
- **Ekran:** "Hedef: Japonya\nYanan: New Mexico" p118–p340 (3.7 sn); vurgu `Mexico`. Döngü sırasında yazı p340'ta kalkar (P01 p9'da "Hedef: Japonya" yeniden doğar).
- **Saklanan şey:** yok; "?" kapanır. Döngü: son kare = P01 ilk kare.
- **Temas/foley:** p112 `ates-yatak` kuyruğu (−14→−30, p160'a dek), p352 `kagit-cevir` (−9). p160–340 ortam: rüzgâr (−18). Müzik: son akor p259'da çözülür, p372'den sonra yatak sürer (döngüde P01 yatak girişine bağlanır).
- **kontrol_kare:** p200. Ek (eşleşme): p386 ↔ P01 p0 (piksel farkı bakılır).
- **Okunurluk:** yanık saçak + tank gölgesi ≈%35; yazı iki satır ≥2 sn okuma; hold (3.7 sn) ✓.
- **Ölü alan:** A) üst: çizim çatısı, alt: defter alt yarısı + belge kenarı + masa; B) tank altı yanık yüzeyler, alt üçte bir: kararmış zemin + kül + tank ayak gölgesi; C) P01 A ile aynı.
- **Fizik:** sayfa çevirmede kâğıt kenarı katlanır, masaya değmez; yanık saçak dünya modeli P09–P10 ile aynı (hasar `yanik` oranı 0–1).
- **Taşıyıcı (→P01 döngü):** kompozisyon eşit (aynı spiral fazı, aynı kamera, aynı sayfa).

---

## 1. Anahtar anlar (kural: tutma = okuma + 1.5 sn, çevre geri çekilir)
| Plan | Okuma | Tutma | Çevre geri çekme | Kendi ses anı |
|---|---|---|---|---|
| P09 | ≈4.3 sn (TR dur) | p258–348 (1.5 sn) | vinyet 0→0.55 (p120–258) | müzik −26, tek nota; nabızda foley yok |
| P12 | ekran 3.7 sn p118–340 | ilk 0.8 sn (p112–172) tam sabit + kalan hold | vinyet 0→0.45 | ateş kuyruğu söner, `kagit-cevir` |
(P03 üçüncü anahtar: süre sığmadı, verilmedi — senaryo kararı.)

## 2. Taşıyıcı ve geçiş özeti
| Sınır | Tür | Taşıyıcı | Not |
|---|---|---|---|
| P01 p135 (plan içi) | match + ses vurgusu | yükselen siluet kümesi | şok |
| P01→P02 | **çıplak #1** | ses: ateş yatağı + müzik | gerekçe: kanca→geri sarım, zaman atlaması, 0.3+ sn |
| P02→P03 | kamera devam | kalem ucu + sayfa | aynı mekân |
| P03→P04 | kâğıt | sayfa merkezi (540,1000) → zarf | kâğıt/morf, zaman atlaması |
| P04 p228 | mekân (harita→masa) | zarf aynı konum | |
| P04→P05 | aynı masa | el yönü + ışık + ses | |
| P05→P06 | match | kapsüllü yarasa aynı konum/boyut | |
| P06→P07 | match | merkezdeki bölme | |
| P07→P08 | ses + yön | sol yön + kanat sesi | kesme hareket bittikten sonra |
| P08→P09 | kamera devam | tank | |
| P09→P10 | match | amber nabız → ilk kıvılcım | |
| P10→P11 | **çıplak #2** | ses kuyruğu + renk | gerekçe: şok → harita (zaman atlaması) |
| P11 p144 | kâğıt | parşömen ↔ belge | |
| P11→P12 | aynı masa | mühür izi + belge kenarda | |
| P12 p112 | match | çatı çizgisi | |
| P12 p318 | morf + sayfa | çatı çizgisi → mürekkep; sayfa | döngü |
| P12→P01 | döngü | aynı kompozisyon | |

## 3. Süreklilik (kurulum → karşılık) kontrolü
- **Yarasa:** P02/P03 çizimde (defter) → P05'te ilk gerçek yarasa uyuyan, kamera geri çekilmeden önce bütün kadrajda, kapsül/el girişleriyle; P06'da kapsüllü yarasa aynı konumda; P08 sürü siluetleri; P09 tünme. Konum/yön: baktığı yön SOL (P07) = bulut/gölge yönü sağdan sola (P08).
- **Tank:** ilk P08'de geniş planda kurulu (x≈640, yapı yanında) → P09 tank altı → P10 tutuşma → P12 yanık. P10 geniş karede tank solunda/sağında aynı yer.
- **Defter:** P01–P03, P12; P11 B'de sol kenarda köşesi kurulur → P12 A'da ilk kare (sürpriz yok).
- **Belge/mühür/not:** P04 not kâğıdı (kıvrık kenar) → P11 başlık örtüsü aynı kâğıt tipi; mühür P11'de iner, P12'de izi kenarda.
- **Kapsül:** P05 takılır (kapak kapalı) → P06 bölmelerde (küçük) → P09 amber nabız → P10 kıvılcım.
- **El/giysi:** P02 `yazici` (Adams), P04 `ceket` (Başkan), P05 `gomlek` (Fieser), P11 `gorevli` (King): dönem iddiası yok, birbirinden manşet rengiyle ayrışır; yüz yok.

## 4. Fizik kontrolü (özet)
Yer çekimi: damla, mühür, tepsiler (üstten oturur), zarf (haritaya konar). Yarasa tüneği: kirişin ALT yüzü (P03 çizim, P09). El girişleri masa kenarından, hiçbir şey masa içinden geçmez. Karakter yürüyüşü yok (yürüyüş yolu/gait gerekmez). Tank/yapı zeminde, temas gölgeli. Gölgeler güneşin tersine (sola-öne); masada sağ-aşağıya (lamba sol-üst).

## 5. Senaryo → parametre eşlemesi (kural 1)
| Senaryo cümlesi | Parametre | Durum |
|---|---|---|
| P01 mürekkep çizim: mağara ağzı + yarasa spirali, canlı | MASA `defter` + `cizim.spiral{yon:"ters-saat", faz0 0.55}` | kit_eksik KE-1/2 |
| P01 çatı alevde, kadraj alevin kenarında, siluetler uzaklaşıyor | ÇÖL-ÜS `gorunum:"yangin-kenar"`, `yapilar[].alev`, `suru.stil:"siluet"` | kit_eksik KE-6/7 |
| P02 kalem tutan sivil el, göğsü boş yarım yarasa | `el.tip:"yazici"` + `kalem` + `cizim.yarasa{tamam:0.9, gogus_bos:true}` | el var; kalem/çizim kit_eksik |
| P03 çatı çizgisi ahşap taramalı + kırmızı alev çizilir, tarama kırmızıya döner | `cizim.cati`, `cizim.alev`, `cizim.tarama_renk{bas,bit}` | kit_eksik KE-2 |
| P04 harita Irwin→Washington, zarf | HARİTA `harita_gorunum:"abd"`, `bolge:"dogu"`, `rota_noktalar`, `rota_ciz`, `kamera_takip`, `zarf_ikon` | rota/takip var; abd, zarf_ikon kit_eksik KE-8 |
| P04 masada zarf, el not düşürür (kıvrık kenar) | `zarf`, `not{kivrik:true}`, `el.tip:"ceket"` | KE-5 |
| P05 cımbızlı el, uyuyan yarasa, selüloz kap + yapıştırıcı | `yarasa{poz:"uyuyan-yatan"}`, `kapsul`, `cimbiz`, `damlalik`, `damla` | KE-3 |
| P06 kovan kesiti ~26 yuvarlak tepsi, açılma, dağılma | `kovan_kesit{tepsi:26, ac{bas,bit}, dagilma{bas,bit}}` | KE-4 |
| P07 tepsi yakın; kanat titrer, baş karanlığa döner | `tepsi_ust`, `yarasa.kanat_titre`, `yarasa.bas_don` | KE-4/7 |
| P08 üs geniş + sürü spirali + gölge tankta | ÇÖL-ÜS `genis`, `suru.spiral`, `suru_golgesi` | KE-6/7 |
| P09 saçak/tank altı, tünme, kapsülde nabız | `tank-alti`, `tunek_dalgasi`, `kapsul_nabiz{renk:"amber"}` | KE-6/7 |
| P10 kıvılcım→alev→saçak/çatı | `kivilcim_dizisi`, `alev`, `darbe` (var) | KE-6; darbe var |
| P11 Dugway köyü, bulut iner | HARİTA `abd/ulusal`, `igne` (var), `koy_ikon`, `suru_ikon` | KE-8 |
| P11 belge+mühür, başlık açılır | `belge`, `muhur_el`, `baslik_ortu` | KE-5 |
| P12 çizim→canlı çatı→defter, döngü | `devam_plan`+`kesme_2` (var), `murekkebe_don`, `loop_esle` | KE-9 |

## 6. Kit gereksinimi (motion şeması)

**Mevcut kullanılanlar:** MASA-INSERT `aci`(tepe-onden|tepe|tepe-egik) · `isik` · `el` (tip ceket/gomlek/gorevli/yazici, kare/bilek/dirsek/aci/olcek/poz/tut) · `props` (x,y,olcek,kare,durum) · `elMaks:2`; HARİTA `rota_noktalar`, `rota_ciz`, `kamera_takip`, `igne`, `svg_etiket:false`, `harita_gorunum`; ortak `ses/ses_en`, `altyazi`, `ekran_yazisi`, `temaslar`, `darbe`, `devam_plan` + `kesme_2`, `kamera_dil`, `kontrol_kare`. `KITAP-INSERT` `defter`/`kivilcim` props Evliya'ya özgü (`propSablon`) — bu bölümde kullanılamaz; yeni prop adları `sinirlar.json` `props` + `propSablon` listesine eklenecek.

### KE-1 · MASA-INSERT genişleme (YB)
| ad | tür | aralık / değerler | not |
|---|---|---|---|
| `kamera.cs` | sayı | **1.0–2.6** (mevcut 1.0–1.5) | P03 1.72, P05 1.95, P06 2.6, P07 2.25 |
| `kamera.cx / cy` | px | ±200 / ±260 | mevcut ±120/±160 |
| `isik` | enum | + **`lamba`** (sıcak, sol-üst, gölge sağ-aşağı; vinyet 0–0.6) | mevcut fener/gun |
| `masa_doku` | enum | `ceviz-1940` (koyu ahşap, hafif yeşil blotter şeridi) | mekân sorumlusu |
| `vinyet` | {bas,bit,deger 0–0.7} | anahtarlı | ışık/odak |

### KE-2 · Defter çizim sahnesi (`defter`, `cizim`, `kalem`)
| ad | tür | aralık | not |
|---|---|---|---|
| `defter` | prop {x,y,olcek,sayfa 0–1,cevir{bas,bit,yon}} | sayfa dikey, kâğıt dokusu, ciltsiz kenar | P01–P03, P12; `cevir` P12 geri sayfa (`sayfa` 1→0) |
| `cizim.spiral` | {yon "ters-saat"/"saat", sarim 1.5–3, merkez[x,y], yaricap[min,max], faz0 0–1, canli bool, siluet_n 12–60, seed} | | P01/P12 AYNI `faz0`/seed (döngü) |
| `cizim.magara` | {x,y,olcek} | mağara ağzı mürekkep | |
| `cizim.yarasa` | {x,y,olcek,poz "asili", tamam 0–1, gogus_bos bool, kanat_katli} | | P02 yarım, P03 tamam |
| `cizim.cati` | {x0,y0,x1,y1, tarama "ahsap", ciz{bas,bit}, tarama_renk{bas,bit,renk "kirmizi"}} | çizgi eğim/konum kaydı: `eslestir` | P12 match için `cati.eslestir:{x0,y0,x1,y1}` |
| `cizim.alev` | {x,y,boy 120–260, ciz{bas,bit}, renk "kirmizi"} | kırmızı yalnız burada | |
| `cizim.cizgi` | {nokta[], ciz{bas,bit}, renk} | alev→kiriş çizgisi | |
| `kalem` | {uc[x,y] anahtarlı, durum "cizer"/"durur"/"havada", boy 120–260, el "yazici"} | uç = çizim noktası; `durur` iken çizgi akmaz | el: yazici; kalem tutan elin parmakları görünür |
| `murekkebe_don` | {kaynak_cizgi[x0,y0,x1,y1], bas, bit 12–30} | gerçek→mürekkep çizgi eşlemesi | P12 p318 |
| `loop_esle` | {plan_ref "P01", kare 0, tolerans px 2} | son kare = P01 p0; doğrulayıcı piksel farkı | |

### KE-3 · Lab propları
| ad | tür | aralık | not |
|---|---|---|---|
| `yarasa` (bkz. KE-7) `poz:"uyuyan-yatan"` | | | pamuk yatak üstünde |
| `pamuk_yatak` | prop {x,y,w,h} | | gölge/temas |
| `kapsul` | prop {x,y,olcek,kapak 0–1(kapalı=0), baglan{yarasa,ofset}, nabiz{renk "amber",periyot 72,bas}} | selüloz silindir, ucu küçük kapak; boy ≈1.2× yarasa göğüs genişliği ≈230–250 px @cs 1.9 | yarasanın göğsüne bağlanır, hareketle gider |
| `cimbiz` | el aksesuarı {el_idx,tutan "kapsul",ac 0–1} | | el.tut ile |
| `damlalik` | {x,y,el_idx,damla{kare}} | cam çubuk | damla düşer, yayılır (3 kare) |
| `damla` | {x,y,yayil 0–1} | göğüs yüzeyi | |

### KE-4 · Kovan kesiti + tepsi
| ad | tür | aralık | not |
|---|---|---|---|
| `kovan_kesit` | {x,y,olcek,yon "burun-asagi",tepsi_n 20–30 (26), diz{bas,bit,stagger 2–4}, ac{bas,bit}, dagilma{bas,bit,n}, kesit_stil "diyagram"} | düzlem çizim, tek ışık yok (diyagram) | kapak kapanışı KONMADI |
| `kovan_kesit.bolme_titre` | {tepsi_idx,bolme_idx,kare,sure 8} | tek bölme kıpırdar | P06 saklanan |
| `tepsi_ust` | {x,y,olcek,cap_px 900–1100,bolme_n 7–19,uyuyan[bolme_idx],odak_bolme} | dil-nötr diyagram, bölmeli | P07 |
| `kesit_oklar` | [{x0,y0,x1,y1,bas,bit}] | diyagram okları | |

### KE-5 · Belge setleri
| ad | tür | aralık | not |
|---|---|---|---|
| `zarf` | {x,y,olcek,katla{bas,bit,kaynak "defter-sayfasi"}} | sayfa→zarf morfu (12 kare) | P04 |
| `not` | {x,y,kivrik bool,satir_n 1,birak{kare}} | kenar kıvrık, ikinci satır kapalı | |
| `belge` | {x,y,olcek,baslik_ortu{kare,kayma_px 0–220,yon "sag"},satir_n} | başlık satırı örtüyle gizli, kayınca açık | |
| `muhur_el` | {el_idx,x,y,bas,hover{bas,bit},in{kare 12 uzunluk},temas,iz "carpi"} | mühür çapı ≈340 px | mevcut HARİTA `muhur` MASA'ya taşınamaz → bu |
| `el.tip` | + yok (ceket/gomlek/gorevli/yazici yeterli) | | |

### KE-6 · ÇÖL-ÜS şablonu (yeni, `sinirlar.json`: `kamera cs 0.9–3.0, cx ±300, cy ±400`, `karakterMaks 0`)
| ad | tür | aralık / değer | not |
|---|---|---|---|
| `gorunum`* | enum | `genis` · `yangin-kenar` · `tank-alti` · `yangin` · `yanik` | P01 b, P08, P09, P10, P12 |
| `saat`* | enum | `ikindi` | tek değer |
| `isik` | {yukselti_der 10–20 (14), yon "sag-arka", gucu 0–1} | tek güneş: gölge/kenar ışığı/vinyet aynı kaynaktan | |
| `ufuk_y` | px | 960–1060 (1010) | |
| `yapilar` | [{id,x,taban_y,w,h,cati "alcak-egimli"|"duz",sacak_px 0–120,renk_idx,alev{bas,bit,siddet,yon}}] | 3–5, farklı boy/aralık, tip YOK (kule/hangar/kışla çizme) | |
| `tank` | {x,taban_y,w,h,ayak_h,kiris_n,yanik 0–1} | silindirik, ayaklı, ayak arası kiriş (tünek) | P08 x≈640 y 1160 |
| `tunek_yuzeyleri` | [{id,tur "kiris-alti"|"sacak-alti",x0,x1,y}] | yarasa tünme kontağı | |
| `uzak_sirt` | {y,renk} | tek siluet | |
| `on_plan` | [{tur "cali"|"diregi",x,y,flu 0–1}] | alt üçte bir dolgu | |
| `toz` | {bas,bit,yogunluk} | rüzgâr yatağı | |
| `kivilcim_dizisi` | [{kare,x,y,siddet 0–1}] | her biri halo+yansıma; temaslar'a girer | P10 3 adet |
| `alev` | {kaynak_id,bas,bit,yayilma,renk} | saçaktan çatıya; tank kendi yanarken YOK | |
| `duman` | {bas,seed} | `darbe` ile paylaşılır | |
| `yanik` | {oran 0–1,kararma 0–1,duman} | P12 | |
| `suru_golgesi` | {yol[[x,y]],bas,bit,yaricap 200–360,yumusak 0–1} | zemin gölgesi tank gövdesine düşer | P08 |
| `vinyet` | anahtarlı 0–0.7 | anahtar plan | |
| `eslestir.cizgi` | [x0,y0,x1,y1] | defter çatı çizgisiyle eş | P12 |

### KE-7 · Yarasa rig + sürü (tek rig, poz parametre sürekli)
| ad | tür | aralık | not |
|---|---|---|---|
| `yarasa.poz` | enum | `uyuyan-yatan` · `asili` (baş aşağı) · `tunemis` · `ucan` | **tek rig**, pozlar arası sürekli parametre (kanat_acik, govde_eg) |
| `yarasa.olcek` | sayı | 0.3–4 | |
| `yarasa.kanat_acik` | 0–1 | | |
| `yarasa.kanat_titre` | {bas,bit,siddet 0–1,sayi 1–4} | P07 iki seğirme | |
| `yarasa.bas_don` | {bas,bit,aci −60…60 (−=sol)} | | P07 −45 |
| `yarasa.kapsul` | {var bool, ofset} | göğüs bağlanma | |
| `yarasa.stil` | `gercek` · `siluet` · `murekkep` | murekkep=defter çizimi | |
| `suru` | {n 12–400, spiral{yon,sarim,merkez,yaricap,faz0}, yukselis_px, yayilma, hiz, seed, stil, kaynak[x,y]} | **defter spiralle AYNI geometri** (`spiral` ortak) | P01, P08 |
| `tunek_dalgasi` | {yuzey_id,adet 5–12,bas,bit,sira "soldan-saga",jitter 0–1,seed} | tutunma tek tek, kanat katlar | P09 7–9 adet |
| `kapsul_nabiz` | {renk "amber",periyot 72 (kare),baslangic,halo_px 20–40} | LED/kırmızı YOK | P09 |
| `suru_ikon` | {bas,bit,x,y,in{kare}} | HARİTA için | P11 |

### KE-8 · HARİTA ABD görünümü
| ad | tür | aralık | not |
|---|---|---|---|
| `harita_gorunum` | enum | + **`abd`** (parşömen, eyalet sınırı hafif, tarama α .22) | |
| `bolge` | enum | `ulusal` (bbox −125,24,−66,50) · `dogu` (bbox −82.5,37,−75,41.5) | `dogu`: Irwin→DC ≈383×205 px ✓ okunur |
| `rota_noktalar` | mevcut | `[["Irwin",−79.70,40.32,true],["Washington",−77.04,38.90,true]]` | |
| `rota_ciz`,`kamera_takip`,`igne` | mevcut | | `igne.renk "murekkep"` |
| `zarf_ikon` | {bas,bit,boyut_px 120–180,kaynak "rota"} | rota ucunu izler, varışta `kagit-tok` temasi | P04 |
| `koy_ikon` | {x_lonlat,ev_n 4–8,ikon_px 112–140,ciz{bas,bit,stagger}} | sembol, 112 px ≥ telefonda 20 px | P11 |
| `suru_ikon` | KE-7 | | |
| `isaret` | {lonlat,renk "turuncu",tur "halka",bas} | alev turuncusu taşıyıcı | P11 p0 |
| `etiket` | `svg_etiket:false`, `haritaAdlari` yazı katmanı | özel ad TR=EN | |

### KE-9 · Geçiş/ortak
`devam_plan`/`kesme_2` (mevcut) P01, P04, P11, P12 için; P12'de iki kesme (A→B p112, B→C p318) var — KATALOG "ikinci kesme" desteği yalnız LANTERN-ODA örneğinde: **şablonlar arası (ÇÖL-ÜS→MASA) `kesme_2.sablon`** doğrulanmalı. Plan alanları (json metası, doğrulayıcıya `izinli_meta`): `tempo` (hizli|nefes|bekle), `olcek`, `tasiyici`, `anahtar`, `saklanan`, `kontrol_kare`, `okunurluk{oran,net_sn}`.

## 7. Orkestraya notlar / varsayımlar (soru yok, karar yazıldı)
1. **Süre:** P09 6.21, P12 6.45 (dosya değeri; senaryo metni 6.2/6.6). Toplam 62.67 sn.
2. **Sapmalar (gerekçeli):** P01 kesme 2.25 sn (senaryo 2.6); P06 kapak kapanışı çıkarıldı (okunurluk için kıpırdayan bölme yakın plan); P08 D4 penceresi 3.33–6.2 sn (kelime zamanı; dokunuşlar 1.6–4.4 idi); P11 mühür temas 4.9 sn (dokunuşlar 4.4: TR "iptal" 5.07); P11 köy ikonları ≥112 px (senaryo "küçük köy"); P04 harita `dogu` bölgesi (ulusal haritada Irwin–DC 85 px, okunmaz).
3. **EN farkı:** P06, P07, P11 EN sesi TR'den çok önce biter (P07 1.36 vs 2.84; P11 EN "cancelled" 1.92 vs TR 5.07); görüntü TR kelime zamanına bağlı, EN'de görüntü sözü izler (altyazı/ekran yazısı bu farkı kapatır). Dinleme/izleme notu: EN P11 3.4–4.9 sn arası ses yok, mühür beklenir.
4. **Ton:** whoosh/riser yok; yarasa gövdesi alevle aynı karede yok; amber nabız (LED yok).
5. **Foley (teknisyen üretir):** kalem-kagit, kalem-tik, kagit-tok, not-birak, kagit-hisirti, damla-yapistir, pens-tik, kap-oturma, tepsi-dizilim, kovan-ac, kanat-uzak, kanat-titrek, tutun-uzak, kivilcim-cirt, ates-tutus, ates-yatak, igne-tak, muhur-tok, kagit-cevir (19; dokunuşlar listesine `not-birak, kagit-tok, tepsi-dizilim, kovan-ac, tutun-uzak (pencere-tutun yerine), ates-tutus, igne-tak, kagit-cevir` eklendi).
6. **Doğrulayıcı beklentileri:** tüm hareketler plan sonundan ≥12 kare önce (özet: P03 318/339, P05 250/290, P06 327/339 [marj tam 12], P07 168/209, P08 372/392, P10 208/224, P11 340/382, P12 372/387 [son 15 kare hold]); `kontrol_kare` her planda; dokunuş tekrarı yok (D1–D7).
7. **Açık risk:** P06 p327 marj tam 12 (kamera yaklaşması); sıkışırsa p320'ye çekilir. P12 son 0.95 sn çok yoğun (morf + kamera + sayfa) — kabul edilmezse P12 +30 kare (3790 kare = 63.2 sn).
