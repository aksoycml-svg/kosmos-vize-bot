# K4 eleştirisi (SARAYBURNU `ic`, P12) + K3 nihai kapanış
Eleştirmen (opus) · 2026-11-08.
İncelenen: K4 paketi (telefon sayfası, P10son↔P12p0 yan yana, P12 kontrol kareleri ve öneri kamera kareleri, renk-olcum.md). P12 p30/p34 öneri ile p66/p150 tam karelerini yarım boyda; padişah başını (P10 p66/p112, P02 p80) telefon boyunda kırparak baktım. P02/P12 kararlarının json'a işlenip işlenmediğini `bolum.json`'dan kontrol ettim.

## KARARLAR
- **K3 (köşk P02/P10): GEÇTİ.** Tek küçük açık V7 (baca dilimi) U8 olarak izleniyor.
- **K4 (iç P12): KOŞULLU.** 2 kritik, 5 orta. SARAYBURNU'nun dört görünümü kuruldu.
  - Dekor, palet ve tek ışık (güneş → yarık → sütun) dili geçti.
  - P12'nin dokunuşu (EV-D6) ve kapanma teması henüz okunmuyor; P12 kullanıcıya gitmez.
  - Sonraki şablonlar (Galata, Boğaz, kitap) bunu beklemez.

## 1. K3 kapanış tablosu
| ID | Durum | Not (kim kapattı) |
|---|---|---|
| V1 gece sarığı havada | **KAPANDI** | Tek kütle siluet + kenar ışığı; telefonda baş+sarık birleşik (motion) |
| V2 baş çevirme | **KAPANDI** | p112'de burun/dudak çıkıntısı ve sağ kenar ışığı telefonda okunuyor (motion) |
| V3 şenlik ↔ üst bant | **KAPANDI** | P02 yazısı alt bantta, kutu x 260–1000, y 1330–1450; grubu örtmüyor (yönetmen) |
| V4 P02↔P03 sürekliliği | **KAPANDI** | Lagâri ayakta x 118 (yönetmen) |
| V5 sikke parlaması | **KAPANDI (kabul)** | Yüzlerde ΔE ≥ 17.6. Kalan 27 örnek 1 px'lik sert sınır ve kese ağzı kenarı; geçici (yarım turda 1 kare). Kabul gerekçesi: imza tonunda alan yok, yalnız kenar yumuşatma çizgisi. (motion) |
| V6 kavuk ucu | **KAPANDI** | Sarık tonunda, kontursuz (motion) |
| V7 baca dilimi | **AÇIK** → U8 | P10 p66/p112, ekran x < 15, y ≈135 |
| V8 opak yansıma | **KAPANDI** | Dilimli, kademeli α (motion) |
| V9 ışık satırı | **KAPANDI** | `renk_olcum.py` ışığı ayrı sayıyor (motion) |
| V10 P07 kol kontrastı | **KAPANDI** | Amber kenar ışığı görünür (motion) |

## 2. Orkestranın sorduğu 4 noktaya kararlar
1. **P12 p30 "tok" kadraj dışı → öneri kamera `kare [0,36,70,120,204]`: KABUL, iki şartla.** Yönetmen.
   - (a) Öneri karesinde kanadın serbest kenarı ve tutucu ekran x ≈1040'ta. Bu, Instagram sağ düğme sütununun (x 920–1080, y 900–1700) içi; ışıklı kenarın alt yarısı y 900–1130'da düğmelerin altında kalıyor. Kural: temas noktası güvenli alan içinde olur. **p0–36'da cx, kanat kenarı x ≤ 880 olacak şekilde kaydırılsın** (içerik ≈160 px sola).
   - (b) Kural 7: yönetmen öneri kamerayla p30/p34'ü render edip bakar.
2. **Zemin ve ayakların alt güvenli bantta görünmesi: KABUL EDİLMEZ.**
   - Geniş evrede (p0–36) figür bütünüyle güvenli alanda kalsın: ayak ve temas gölgesi y ≤ 1490 (cy ile; motion'ın verdiği eşik cs 1.8'de ≥ 438).
   - Push-in evresinde (p70+) zemin ve ayak kadraj dışına çıksın: göğüs/bel planı (önemli oyunculuk = yakın plan kuralı).
   - Sarık tepesi üst yazı bandının altında kalsın (y ≥ 400; bkz. U9). İkisi aynı anda tutmuyorsa cs yükselsin.
   - **Yönetmen.**
   - **Mekân sorumlusu:** mekanlar §1.6'daki "zemin y ≥ 1612 → kadraj dışı" hesabını düzeltsin (1612 < 1920).
3. **V5 sikke: KABUL** (yukarıda).
4. Diğer noktalar:
   - Kapalı kanadın kapıyla karışması → U4 (orta).
   - İşaret elinin x≈90'da olması → U5 (orta).
   - P10'daki baca parçası → U8 (küçük).
   - İç mekânda el gölge tonu `#7a5848` (çıplak el `#b88470`'in odaya karışımı): **KABUL.** İmzadan uzak (ölçülen el ΔE 39), kırmızıya kaymıyor. Tasarımcı tasarım dosyasına kaydetsin.

## 3. K4 bulguları
### KRİTİK
**U1. EV-D6 okunmuyor: "ışık gözlerde şeride iner" yok; göz bölgesi siyah bir bantta.**
- P12 p30–p100, telefon ve tam kare (p66 ekran ≈x 330–470, y 640–760).
- Sarık V1 düzeltmesinde aşağı indi; profilde alt kenarı ve ensedeki koyu saç kütlesi göz hizasını tamamen örtüyor. Işık bandı ise burundan çeneye kadar alt yüzü aydınlatıyor.
- Telefonda okunan: koyu başlık + gözler üstünde siyah bant + aydınlık alt yüz → **maskeli / göz bantlı yüz.** K1'deki Y6 hatasının padişahta tekrarı.
- Planın dokunuşu ve oyunculuk anı tam bu: ışığın gözde daralması.
- Kural: dokunuş okunur, küçük jest = yakın kamera, önemli oyunculuk = yakın plan.
- **Tasarımcı:** profilde sarığın alt kenarı kaş çizgisinin üstünde kalsın. Göz bölgesi (kaş–elmacık arası) ten olarak görünsün; saç kütlesi yalnız ense ve kulak arkasında. Bu kural siluet/ön görünümü (P02/P10) değiştirmez.
- **Motion:** yarık dikey olduğu için bant yüzde dikey bir şerittir. Kanat kapanırken şerit daralıp **göz–burun kökü arasında** ince bir dikey ışık çizgisi olarak kalsın (son genişlik ≈ yarık izdüşümü). Yüzün geri kalanı gölge tonunda (`#2a2420`) kalsın; şimdiki gibi alt yüzün tamamı aydınlanmasın.
- **Yönetmen:** p66–100'de yüz (sarık hariç) ≥ %12 ve kontrol karesi bu an.

**U2. p30 "tok" ve p34 "tık" temasları bolum.json kamerasıyla kadraj dışında.** Kural: temas = ses, görünmeyen sesin olmaması. Karar §2.1 → **yönetmen.**

### ORTA
**U3. Ayak ve zemin alt bantta.** Karar §2.2 → **yönetmen + mekân sorumlusu.**

**U4. Kapanınca pencere kapı gibi okunuyor.**
- p30–204'te kanat 3 panelli, ahşap pervazlı, uzun bir dikdörtgen. Solda gerçek kapı var. Telefonda iki kapı yan yana okunuyor; padişahın "kapıyı gösterme" jestinde hangi kapı olduğu belirsizleşiyor.
- **Mekân + motion:**
  - Denizlik çıkıntısı ve altındaki gölgesi kalın olsun; denizlik altındaki duvar parçası ayırt edilsin.
  - Pencere pervazında ikinci (kapalı) kanadın kenarı her karede görünsün.
  - **Yarıktan sızan dış ışık çizgisi (aşırı pozlanmış dış) kadrajda kalsın.** Pencerenin kimliği bu ışık.
  - Panel oranı kapıdan ayrışsın: kanatta 3 panel yerine üstte kare bir panel + altta tek panel (nötr bölüntü).

**U5. "Kapıyı gösterme" jesti avuç yukarı, kıvrık parmaklı ve kadraj kenarında.**
- p150–204, ekran ≈x 40–175; 80 px yan güvenli alana taşıyor.
- Avuç yukarı ve parmaklar kıvrık: "buyur / rica" okunuyor; sürgün anlamındaki "dışarı" işareti değil.
- **Motion (`isaret` pozu):** kol öne uzansın; avuç aşağı ya da yana dönük; işaret parmağı uzun ve kapıya doğru; diğer parmaklar kapalı.
- **Yönetmen:** el x ≥ 120 olsun (cx), kapı kadrajda okunur kalsın.

**U6. Işık şeridi kaftanda kostüm deseni gibi okunuyor.**
- p30–204'te omuzdan eteğe uzanan sert kenarlı, zeytin-bej (`#897e65`) dikey bant var. Telefonda açık renkli bir entari şeridi sanılıyor.
- **Motion:**
  - Bandın kenarları gövde/kumaş kıvrımını izlesin (düz cetvel çizgisi olmasın).
  - Sütun figürün arkasında da devam etsin: arka duvara ya da kapı pervazına düşen ışık lekesi ve onun içinde padişahın kesik gölgesi. Böylece bandın ışık olduğu kanıtlanır (tek ışık kuralı: görünen her ışık yüzeye düşer).

**U7. p0'da (kanat tam açık) yüz tamamen aydınlık, profil ise özelliksiz.**
- p0, ekran ≈x 450–560, y 690–790. Pembe, düz bir "manken" profili.
- §3.5 "göz/kaş/ağız çizilmez" kuralı yüzün gölgede olduğu varsayımıyla yazılmıştı; tam ışıkta bu varsayım bozuluyor.
- **Tasarımcı karar versin:**
  - (a) Profilde tek kısa göz kapağı çizgisi + kaş kenarı. Portre iddiası taşımaz, yalnız canlılık verir. Önerim bu.
  - (b) p0'da yüz pencereye değil yarı geriye dönük olsun, gölgede kalsın.

### KÜÇÜK
- **U8 (eski V7).** P10 p66/p112'de sol üstte baca dilimi kalıyor (x < 15, y ≈135). Instagram üst arayüzünün altında, ama anlamsız bir kırpık parça. **Yönetmen:** cx +20 ya da **mekân/motion:** cs ≥ 2.2'de arka baca çizilmesin.
- **U9.** P12 p66 push-in'de sarık tepesi y ≈390, yani P12'nin üst yazı bandına (240–400; "Padişah (Evliya'ya göre)") değiyor. Kim plakası yüzü örtmez, ama sarıkla çakışmamalı. **Yönetmen:** U3 ayarından sonra yazı kutusunun alt kenarı ile sarık tepesi arasında ≥ 20 px boşluk olsun.
- **U10.** P02'de yardımcı-2 x 78, yan güvenli alan sınırı 80'in 2 px dışında. **Yönetmen:** x ≥ 85.

## 4. Renk teyidi
- Motion tablosu ile tam kareler tutarlı.
  - P12 duvar `#39332f`, dış `#e7ddbe`, kapı içi `#29231f`; C\* oranı %92–113.
  - Padişah ışıklı bant imzaya ΔE: ten 19.6, kaftan 23.2, sarık 26.9.
  - Işık hariç imza pikseli 0. Kırmızı 0.
- P02 gök noktası (540,330) şenlik dumanına düştüğü için KROMA çıktı. K3 ölçümü geçerli; bir sonraki ölçümde nokta (540,500)'e alınsın (**motion**).
- P10 p280 cumba ahşap KOYU (L\* 25.8 / hedef 34.3, ΔE00 7.2). Ölçüm noktası saçak gölge bandına düşüyor. Işıklı tahtadan (cumba alt yarısı) yeniden ölçülsün; sonuç yine KOYU çıkarsa cumba gündüz tonu açılsın (**motion**).

## 5. Dersler (ek)
1. **Bir düzeltme başka görünümde yan etki yapabilir.** Sarığı indirmek (V1, önden siluet) profilde gözleri örttü. Başlık/baş değişikliği her görünümde (ön, profil, arka 3/4) ayrı kontrol edilir.
2. **Dar kadrajda temas karesi önce kadrajda olmalı.** Kamera eğrisi temas karelerine göre kurulur (`temaslar` → kamera anahtarları), sonra push-in.
3. **Işık bandı kumaşta desen sanılır.** Işık olduğunu ikinci bir yüzeydeki lekesi ve kesik gölgesi kanıtlar.
4. **Mekân hesapları render ile doğrulanır.** "Kadraj dışı" diye beyan edilen her şey kontrol karesinde ölçülür.
