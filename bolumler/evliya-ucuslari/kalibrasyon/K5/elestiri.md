# K5 eleştirisi (GALATA-TEPE gün, P01 B, P08, Hezarfen rig) + K4 kapanış (P12)
Eleştirmen (opus) · 2026-11-08 · tek tur.
İncelenen kareler: `telefon-sayfa.png`, P12 p0/30/66/80/204 (tam + güvenli), `P01p172_P01p176_yanyana.png`, P01 p230/p324, P08 p0/36/40/44/148/240 (güvenli), P08 p40↔p44↔p216 kırpık yan yana, `renk-olcum.md`. P12 yüzünü 360 px'te kırpıp büyüterek baktım. Ölçüler ekran px (1080x1920).

## KARARLAR
- **K4 (P12 iç): KOŞULLU.** 1 kritik (json zamanlaması), 4 orta.
  - U1, U4, U5, U7 ve R3 zemini kapandı. Göz bandı yok; ışık çizgisi gözde. Pencere kapıdan ayrışıyor. Avuç aşağı, işaret parmağı kapıyı gösteriyor.
  - U6 kısmen kapandı (bkz. A4).
  - P12, A1 düzeltilip yönetmen p66–100'ü render edince kullanıcıya gidebilir.
- **P12 p204 cs 1.6 (R3'te 2.2): KABUL.**
  - İşaret mekânsal bir eylem: hedef olan kapı, el ve yarık aynı kadrajda olmalı. Boy plan bunun için doğru ölçek. Oyunculuk anı (ışık gözde) p70–120 yakınında kalıyor.
  - Ayak 1481 ≤ 1490. Replik 2 üst bantta, sarığın 20 px'ten fazla üstünde. Zemin görünüyor ama ölü alan oluşturmuyor.
  - Şart: mekân sorumlusu §1.6a/§1.6b'deki p204 değerlerini 1.6 olarak düzeltsin (tek sahiplik).
- **EV-D6 ışık çizgisi 360 px'te ≈10×17 px: KABUL.** Koyu yüzde pembe çizgi telefonda seçiliyor. Nedeni olan yarık da büyük ve kadrajda. Şart: çizgi ≥1 sn net görünsün (A1).
- **`don` çelişkisi:** json'daki 60–100 geçerli değil; aşağıdaki A1 zamanlaması geçerli olsun. Tasarımcı, tasarım belgesindeki p95–125'i A1'e göre güncellesin.
- **K5 (GALATA-TEPE + Hezarfen): KALDI.** 6 kritik.
  - Şablon iskeleti, ölçüm (C*, imza) ve plan içi kesme çalışıyor.
  - Kalanlar:
    - Uzak şehir döşeme gibi okunuyor, yükseklik kayboluyor.
    - Kanat yarı saydam hayalete dönüşüyor.
    - Yürüyüş karesinde figür diz çökmüş gibi.
    - Taş IG düğmelerinin altına düşüyor.
    - Dipte taş ev boyunda.
    - Foley eksik.
  - İkinci tur yalnız bu kareler için yapılsın: P01 p230 ve p250 civarı, P08 p0, p44, p46, p148, p170, p185, p216.

## A. K4 / P12 açıkları
**A1 · KRİTİK · yönetmen (+ tasarımcı belgede).** EV-D6 net süresi 1 sn'nin altında.
- Kanat p34'te oturuyor. Yüz yakına ancak p70'te geliyor (push-in p36–70). `don` p60–100 ise yüzü p75 civarında ışıktan çeviriyor; p80'de ense görünüyor.
- Çizgi okunur ölçekte ≈0.3 sn kalıyor (p34'te cs 1.6: telefonda ≈6 px).
- Öneri:
  - Push-in p36–60.
  - `don` p100–130.
  - `isaret` p135–175 (plan 216, ≥12 kare pay).
  - `isik_serit.bit` ≥ 105.
  - Böylece çizgi cs ≥ 2.2'de p50–100 arası net kalır.
  - Ekran yazısının bitişi (p120) ve replik 2 (p123) jestle uyumlu.
- `kontrol_kare` = p90 (çizginin en okunur karesi).

**A2 · ORTA · yönetmen (+ mekân).** p66'da yüz, sarık hariç, ≈170 px (%9). U1 şartı ≥%12 idi.
- cs 2.6'da yarık ile yüz birlikte ancak bu ölçekte sığıyor.
- Seçenek: padişahı pencereye 0.3–0.4 m yaklaştırmak (yüz–yarık mesafesi kısalır), sonra cs ≈3.2 ile yüz %12, yarık kadrajda.
- Sığmazsa %9 kabul edilir ve gerekçe json'a yazılır. Çizgi yüksek kontrastlı, A1 süresi sağlanırsa okunuyor.

**A3 · ORTA · yönetmen.** p30–36 replik 1 alt bantta, ayaklar 1481'de.
- Önce yazı katmanıyla p30'u render et. Altyazı kutusunun alt kenarı ≤ 1450 ve ayakkabı + temas gölgesi görünür kalıyorsa kabul (o anda ayakta temas yok).
- Aksi halde:
  - "Padişah (Evliya'ya göre)" ekran yazısı değil isim etiketidir. Sarığın üstüne etiket olarak gitsin, p0–28.
  - Replik 1 üst banda alınsın.

**A4 · ORTA · motion.** Işık bandı tek ışık kuralına uymuyor.
- p66: kaftandaki bant omuzda ≈100 px, yüzdeki çizgi ≈30 px. Aynı yarıktan aynı mesafede gelen ışık aynı genişlikte olmalı.
- Telefonda (p30/p150/p204) bant hâlâ "açık renk yaka/astar" okunuyor.
- U6'nın kanıt lekesi (arkadaki yüzeyde ışık + içinde kesik gölge) kadrajda görünmüyor. Yalnız sol alt köşede, güvenli alan dışında küçük bir parça var.
- Öneri:
  - Bant genişliği yüzdeki çizgiye eşitlensin.
  - Leke kadrajdaki bir yüzeye düşsün; p30–150 kadrajında kapı pervazı ya da duvar en uygun yer.

**A5 · ORTA · motion.** p0 (kanat açık, tam ışık): kol, gövdenin önünde ucu sivri, elsiz siyah bir kama gibi (x 215–340, y 1000–1100).
- Kaftan ışıkta olduğu hâlde kol koyu. Telefonda "hançer/yüzgeç" okunuyor.
- Kol aynı ışığı alsın, yen ve el görünsün.
- p10–18 itme anında elin kanada değdiği görülmedi; p14 render edilsin. Değiyorsa hafif bir "el-ahşap" foley'i (−20 dB) ya da sessiz bırakma gerekçesi json'a yazılsın.

**A6 · KÜÇÜK · yönetmen.** p204'te işaret parmağının ucu x ≈100. U5 şartı ≥120 idi. cx +20.

**A7 · KÜÇÜK · motion/tasarımcı.** p0 ve p66'da boyun düz siyah dikdörtgen, ensede blok gibi okunuyor. Kaftan yakasıyla birleşsin ya da gölge tonu `#2a2420`'ye insin.

## B. K5 açıkları
**B1 · KRİTİK · motion (+ mekân).** Uzak şehir (P01 B, P08 p0/36/40/240) telefonda tuğla döşeme / kaldırım meydanı gibi okunuyor. Kule tepedeymiş gibi değil, bir meydanın kenarında duruyormuş gibi.
- Mekanlar §2.3 "y < 1100 tek ton pus" diyor. Render'da ufka kadar keskin, eşit aralıklı, satır satır koyu kutular var; bu spesifikasyondan sapma.
- Öneri:
  - Kutuları düzensiz kümeler yap; aralarda sokak boşluğu ve yükseklik farkı olsun.
  - y < 1100 tek ton pus olsun (ayrıntısız).
  - Yakın kenarda (y 1100–1250) birkaç büyük çatı sırtı ve saçak gölgesi olsun. Bunlar aşağıya bakışı ve yüksekliği anlatır.
- Mekân, ek bir siluet ister (cami kubbesi vb.) ancak araştırmacı doğrularsa.

**B2 · KRİTİK · motion.** Kanadın durumu planlar arasında tutarsız.
- P08 p36/p40'ta kanat opak gri. p44, p216 ve p240'ta yarı saydam koyu bir hayalet.
- p44'te elin yanında yarı saydam, taş biçiminde açık bir leke var (x ≈860–920, y ≈720–790). İz kopyası ya da önceki kare artığı olabilir.
- Nesne fade ile kaybolmaz, durumu da kendiliğinden değişmez. Kaynağı bulunsun: hızlı dönüş iz kopyalarının (α .25) yanlış aralıkta çalışması olabilir.
- p170 ve p185 render edilip bakılsın; bunlar şimdiye kadar hiç render edilmedi.

**B3 · KRİTİK · motion.** P01 p230 yürüyüşü bozuk.
- Arka bacak kalçadan yere düz uzanıyor ve dizi zemine değiyor gibi duruyor. Siluette "diz çökmüş / topallayan" okunuyor.
- Arka ayağın tabanı yok.
- Temas gölgesi iki ayağın arasında, keskin kenarlı siyah bir elips (≈x 480, y 1278). Zeminde delik gibi okunuyor.
- Düzeltme:
  - Arka ayak parmak ucunda zemine bassın (ya da topukla), diz zemine yaklaşmasın.
  - Temas gölgesi her ayağın altında olsun, yumuşak α ile.
  - p220–260 aralığında 3 kare render edilsin.

**B4 · KRİTİK · yönetmen.** P08 p148'de taşın yere çarptığı an IG düğme sütununda (taş x 840–1000, y 800–1010; sütun x ≥920, y ≥900). Temas noktası güvenli alanda olmalı.
- Takip boyunca (p100–166) cx −160 ya da taş x ≤ 785.
- Toz da sütunun dışında kalsın.

**B5 · KRİTİK · mekân + yönetmen.** Dip ölçeği tutarsız.
- Vinç taşı sabit boyda tutuyor (cs 2.0'da ≈150 px). Dipteki evler ise ×1/5.5 stilize ölçekte (≈92 px/m). Taş bu ölçekte ≈1.6 m, bir evin duvarının yarısı kadar; telefonda kaya parçası gibi duruyor.
- Öneri: dipte bütün evleri gösterme. Taşın ölçeğinde (255 px/m ×cs) yalnız iki saçak ucu/çatı kenarı kadrajın kenarlarını çerçevelesin, araları sokak olsun. Bu hem ölçeği hem "dar sokağa düştü"yü taşır.
- Ayrıca toz tek ve düzgün bir beyaz elips; telefonda "yumurta/su birikintisi" gibi. Duman dilindeki gibi düzensiz 3–5 öbek yapılsın, oturduktan sonra yerde kalsın.

**B6 · KRİTİK · yönetmen (json temaslar) → kurgucu.** Foley eksik.
- P01 B'deki adımlar: p229 ve p246, ayrıca yürüyüşün bütün basmaları p196–262 (küçük figür, −20/−22 dB).
- P08 p56'da tekme ayağının yere dönüşü.
- P08 p148–158 arasında taşın sekip ikinci kez yere değmesi (−22 dB).

**B7 · ORTA · yönetmen.** P08 p36/p40: taşın sağ kenarı x ≈950, y 1300–1440, IG sütununun içinde. Temas noktası (ayakkabı ucu x ≈770) dışarıda, ama mekânın beyan ettiği "taş p36 x≈857" tutmuyor. cx ≈ −40 daha sola.

**B8 · ORTA · motion.** `tas-it` itmesi okunmuyor.
- p40'ta diz önde bükük, gövde ve kalça yerinde. "Hafifçe dokundu" okunuyor, "itti" değil.
- Bacak p40–44'te uzansın ve ağırlık öne kaysın.
- İtme yönü yanal, taşın düşüşü ise ön dudaktan. Taşın p44–46'da öne/sağa devrildiği görünsün; p46 render edilsin.

**B9 · ORTA · mekân + motion.** Kule kimliği zayıf.
- P01 p176 ve P08 p0'da külah tek düz bir yüzey, saçağı da düz. Tepe katının ön yüzü düz. Telefonda "taş ev/şapel ve arduvaz çatı" okunuyor; silindir + koni değil.
- Öneri:
  - Korniş ve seki kenarı iki uçta belirgin kavisle aşağı insin.
  - Dikişler kadraj dışındaki tepeye açık bir yelpaze gibi yakınsasın.
  - Külahın ışıklı yüzü sağda geniş bir şerit olarak görünsün (§2.3 katman 4).

**B10 · ORTA · tasarımcı.** Hezarfen sarığı (`sarik-basik`) üstü geniş ve öne taşkın.
- P08'de "kabarık başlık", P01 B'nin kontra siluetinde "kabarık saç (pompadour)" okunuyor.
- §3.0b'deki sıkı yuvarlak sargı oranına dönsün: tepe genişliği ≤ baş genişliği ×1.1, öne taşma yok.

**B11 · ORTA · tasarımcı + motion.** Katlı kanat P08 p0/36/40'ta ve P01 p324'te gri, düz kenarlı bir levha; telefonda "kalkan" okunuyor.
- Kurulum → karşılık: kanat sonra açılıyor. Burada kanat olduğu okunmalı.
- §4.2'deki ters damla biçimi, 2–3 kaburga/tüy çizgisi, uçta sivri alt uç ve gölge tonu ailesi uygulansın.

**B12 · ORTA · tasarımcı/motion.** Sakal "kısa dolgun" tarifinde değil; çene boyunca ince bir çizgi var. Bıyık Lagâri'ninki kadar büyük, bu yüzden telefonda iki yüzün ayrışması zayıf.
- Sakal çene altını dolduran kütle olsun.
- Bıyık Lagâri'nin "belirgin" bıyığından küçük olsun.

**B13 · KÜÇÜK · tasarımcı.** Aynı yer, saat ve güneş: P01 B'de Hezarfen neredeyse siyah siluet (α .94), P08'de renkli.
- Kanca gizemi için kabul.
- Ama aynı yöne bakan taş duvar açık tonda olduğu için figür "gölge adam" gibi duruyor. α ≤ .75 yapılsın; yeşil kaftan sezilsin, P08 ile bağ kurulsun.

**B14 · KÜÇÜK · mekân.** Duvar dibinin 1150 olması (seki üst yüzü 1150→1264): **KABUL.** Gerekçe: fizik ancak böyle çalışıyor (taşın dudaktan düşmesi). Kart (§2.2/§2.3) ve tablo güncellensin.

**B15 · KÜÇÜK · imza.** P01 p230'daki 4 örnek x 1040, y 760'ta. Burası güneş parlamasının basamak kenarı; demet biçimli değil, alan yok: **KABUL.**
- P08 p36'daki 51 örnek sarığın tepesindeki kenar ışığı ve taşın kırık yüz kenarı: **KABUL**, bir şartla. Sarığın kenar ışığı `renk_olcum.py`'de `isik` bölgesi olarak sayılsın (motion).
- P01 p100'deki püskürme ŞART (b) uyarısı: püskürme demetin kendi eylemi, kabul. Tasarımcı not düşsün.

**B16 · KÜÇÜK · yönetmen/motion.** P01 p172 (fişek kalktıktan sonra): yardımcının meşale alevi ayakkabısının dibinde, yerde duruyor. Fitil işi bitti; meşale kaldırılsın ya da çekilsin.

## Geçenler (kanıtı karede)
- P01 p172↔p176 plan içi kesme: duman sütunu geceden aydınlık kuleye geçiş net. Hareket ortada kesilmiyor (fişek p150'de kadrajdan çıkmış).
- Galata renkleri: C* oranı %73–104, ΔE00 ≤ 3.3. Kırmızı 0.
- Ufuk ve ölçek tutarlı: P08 p0'da baş ≈ ufuk 829.
- Hezarfen'in kapıdan çıkışı fiziksel olarak mümkün.
- P08 p240'ta ayaklar 1475'te, çıkıntının üstünde, güvenli alanda.

## Öz
- K4: bir zamanlama düzeltmesi kaldı (A1). Gerisi json/poz ayarı.
- K5: iskelet doğru. Ama telefonda üç okuma yanlış:
  - Şehir döşeme gibi.
  - Kanat kalkan / hayalet gibi.
  - Yürüyüş diz çökme gibi.
- Bunlara ek olarak güvenli alan, ölçek ve foley açıkları var. İkinci tur kısa: yalnız yukarıdaki kareler.

## Dersler (ek)
1. "Spesifikasyonda pus var" yetmez. Uzak katmanın telefonda neye benzediği ("bu ne?") her yeni şablonda ayrıca sorulur.
2. Vinç ile sabit tutulan nesne arka plan ölçeğiyle çelişir. Sabit nesne seçilince arka plan da aynı ölçekte kurulur.
3. Yürüyüş tek karede kontrol edilir: adımın en geniş anı (iki ayak yerde) ve arka ayak teması.
4. Durum sürekliliği (opak ↔ saydam) aynı planın kareleri arasında da karşılaştırılır.
