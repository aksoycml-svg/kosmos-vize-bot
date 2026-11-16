# BODRUM P08 · tur-2 eleştirisi (elestirmen, 2026-11-16)
Bakılan: `p08.png` (tam + 2× kırpım: yüz/atkı 440–960×340–900, el 380–820×1300–1720), `p08-360.png`, `hedef-yaninda.jpg`, Paris `tam-render-3/genel-tr.jpg` + `hedef/hedef-ozet.jpg`, kod `BodrumHedef.tsx`, `lgYuz.tsx`, `GravurEl.tsx` (`konikKol`).

## Puan: **4.5 / 10 — geçmez** (eşik 7)
Kompozisyon, ışık yönü ve ölçüm tablosu hedefe oturuyor; puanı figür, örtü ve el düşürüyor. Paris'in yanında bu kare **geri kalır**:
- **Figür:** Paris'teki Dagron elleri ve okuyan adam kontur + iki ton + tarama ile hacimli. Burada gövde düz bir levha, yüz maske gibi.
- **Doku:** Paris'te tarama 360 px'te seçiliyor. Burada tarama yalnız ceketin sağ yarısında ve sarkmada; duvar, tavan ve örtü düz dolgu.
- **Sıcak–soğuk:** ölçüt geçiyor ama dağılım yanlış. Sıcak alan neredeyse yalnız örtünün üst yüzü (L* medyan **79**, düz krem levha). Hedefte örtü çoğunlukla gölgede: L* medyan **47**, aralık 6–76, ışık yalnız kıvrım sırtlarında.
- **Derinlik:** sol ve sağdaki örtülü biçimler yastık gibi okunuyor, duvar düz. Arka katman, ön katmanla aynı ayrıntıda.

## KRİTİK (3 madde sınırının dışında)
**K1 · Fizik / tekrar eden kullanıcı notu (tur-3: "ışık … arkada kalmıyor mu") — kameraya yakın zemin ışıkta.**
- Kare y ≈ 1600–1920: sedyenin önündeki zeminde iki sıcak ışık şeridi var.
- Neden: `IsikliArka` içinde zemin kırpması `M-20,1190 … L1100,1940` sedyenin önüne kadar uzanıyor. `yelpaze()` çokgeni de y 3200'e kadar açık. Sedye ve Eliasberg ışığı kesmiyor (örtme testi yok). Oysa kodun kendi tanımına göre kapı sedyenin yakın kenarıyla aynı derinlikte. Bu durumda yakın kenardan kameraya doğru kalan zemine ışık ulaşamaz.
- Düzeltme: zemin ışığını sedyenin arkasındaki zemin bandıyla sınırla (kaydırma öncesi y 1075 → sedye üst kenarı ≈ 1250). Sedyenin altındaki ve önündeki zemin `LM.zemin` kalsın. Önde yalnız elin altına sedye gölgesinin içinde koyu bir temas lekesi konsun.
- Sahibi: motion. Parametre: `IsikliArka` zemin `Kirp` yolu.

**K2 · Fizik — ölü el örtünün içinden çıkıyor.**
- Bilek, örtünün dikey sarkma yüzünün ortasında (y ≈ 1350). El o yüzün önüne yapışık duruyor, sarkma da yere kadar iniyor. Görüntüde el kumaşın içinden geçiyor ya da kumaşa basılmış gibi; serbestçe sarkmıyor. Bilek düz bir yamayla kesilmiş (satır 211).
- Neden: `sark` dizisi y 1580–1820'ye kadar iniyor (sedye tahtası hiç görünmüyor) ve el sarkmanın önünde çiziliyor.
- Düzeltme: sarkmayı ~%60 kısalt (alt etek y ≈ 1440–1520, düzensiz). Altında sedye tahtasının ön kenarı (kalınlık 30–40 px, `LM.tahta` + ışık kenarı) ve iki ayak görünsün. Önkol örtü eteğinin altından, tahta kenarının üstünden çıksın. Önkoldan 60–80 px görünsün; bilek kırılsın, el bilekten aşağı sarksın.
- Sahibi: motion. Parametreler: `Sedye.sark`, `bilek`, bilek yaması.

**K3 · Omuz kuralı (CLAUDE.md "Omuz") — kollar düz kesik uçla gövde silüetinin dışına taşıyor.**
- Sol omuzda kare x 440–500, y 610–650'de gövdenin üstünden yükselen köşeli bir levha var. Sağ omuzda x 880–930'da çentik var.
- Neden: `konikKol([548,790]…[128,…])` omuz ucunu düz bir kenarla kapatıyor (`…L icK[0] Z`). 128 px'lik genişliğin yarısı `govdeYol` kenarının (x ≈ 536) dışına düşüyor. Kollar gövdenin arkasında çizildiği için bu köşe silüet olarak görünüyor.
- Düzeltme: omuz eklemini gövde silüetinin içine al (sol x ≥ 560, sağ x ≤ 850, y ≈ 800). `govdeYol`'a omuz başlığı yayı ekle (deltoid: 596,742 → 548,790 → 536,840 arası dışbükey yay). Kolun üst ucunu bu yaya teğet bitir. Kol dikişini kavisli tek çizgi olarak çiz.
- Sahibi: motion. Parametreler: `govdeYol`, `konikKol` omuz noktası/genişliği.

## Düzeltme listesi (7'ye çıkarmak için, önem sırasıyla, en çok 6)
**1 · Gövde kutu, poz yanlış: "yarı diz çökmüş" değil, tezgâh arkasında dimdik duran adam.**
- Neden:
  - `govdeYol` 12 noktalı, aynalı simetrik bir trapez. Yanlar 840 → 1265 arasında dikey; omuz eğimi tek bir 45° kırık.
  - Bel daralması, öne eğilme ve büzülmüş omuz yok.
  - Kalkık diz (`uyluk`) gövdenin arkasında ve `LM.pantolon` ≈ `ceketGolge` renginde, okunmuyor. Bu yüzden dizdeki el havada sallanıyor gibi.
- Hedef:
  - Gövde ekseni 12–18° öne-sola (ele doğru) eğik.
  - Uzak omuz yakın omuzdan 25–35 px yüksek.
  - Belde %8–10 daralma; palto eteği dize binsin.
  - Diz (uyluk) **gövdenin önünde** çizilsin. Üstü `Hilal` ile ışık kenarı alsın; diz kapağı tepesi elin avuç ortasının hemen altında olsun.
  - Elin altında 6–10 px temas gölgesi olsun.
- Sahibi: motion. Parametreler: `govdeYol` (asimetrik, eğik), `uyluk` çizim sırası ve rengi (`#3a3450` + ışık kenarı `LM.ceketIsik`).

**2 · Palto kıvrımı ve yaka: iç çizgiler var ama kumaşı anlatmıyor.**
- Neden:
  - 4 kısa düz çizgi var (satır 136–139).
  - Yaka `yakaL/yakaR` iki uzun damla; küpe ya da sarkan kulak gibi okunuyor, çentikli yaka değil.
  - Sağ yarıyı ayıran gölge sınırı (`M705,720 Q760,900 720,1270`) gövdeyi dikey ikiye bölüyor (bıçak çizgisi).
- Hedef:
  - Çentikli yaka: üst kol (yaka) ve alt kol (klapa) iki parça, köşesinde 25–35° çentik. Klapa düğme hattına iner.
  - Gerilim kıvrımları: dirsekten koltuk altına 2–3 kıvrım (kısa, sivrilen ton şekli, çizgi değil). Bükülen belde düğme hattından yana 2 yatay çekme kıvrımı. Dizin üstünde etek kırığı 1–2 kıvrım.
  - Toplam 6–9 kıvrım şekli. Her biri koyu oluk (`ceketGolge`) + ışık tarafında 2 px açık sırt.
  - Gölge sınırı gövdenin hacmini izlesin: omuzdan koltuk altına kavisli girsin, belde içeri, eteğe dışa açılsın.
  - Düğme 2 → 4.
- Sahibi: motion. Parametreler: `yakaL/R`, kıvrım yolları, gölge yolu.

**3 · Yüz kukla gibi duruyor.**
- Neden (`lgYuz.tsx`):
  - Baş silüeti düzgün bir yumurta.
  - İki kulak orta yükseklikte yana açık, ¾ görünümde uzak kulak tam görünüyor.
  - Gözler `goz: 0.95` ile irisin üstünde ve altında akla tam yuvarlak ("dehşet bebek"). Bakış ele inmiyor, kameraya bakıyor gibi okunuyor.
  - Burun tek düz kenarlı poligon.
  - Yaş, açlık, sakal izi yok. Hedefte çökük yanak, alın kırışığı, göz torbası ve kirli sakal var.
  - Baş dik (`rol=-4`), aşağı eğilmiyor.
- Hedef (çizgi değil ton alanıyla, "Yüzde iç çizgi" kuralına uygun):
  - **Göz:** `goz` 0.95 → 0.6–0.7. Üst kapak irisin üstünü %20 örtsün; iris alt kapağa değsin. `bakis` ekranda ele (sol-aşağı) dönsün.
  - **Kulak:** uzak kulak 0.3 kadar konturun arkasına girsin.
  - **Baş eğimi:** göz, burun ve ağız 0.03–0.04 H aşağı kaysın, alt yüz 0.04 H kısalsın; kafa öne eğik okunsun.
  - **Yaş ve açlık tonları:** alında 2 kısa yatay `tenOrta` ton bandı (α .35), burun–dudak oluğu ton alanı, şakak çukuru, göz torbası.
  - **Burun:** kanatlı; ışık tarafında sırt hilali.
  - **Sakal izi:** çenede ve dudak üstünde seed'li 40–60 nokta (`sac` + ten, α .5).
- Sahibi: motion. Parametreler: `LgYuz` ifade, `yuz` silüeti (elmacık 0.31 → 0.33, yanak 0.28 → 0.25), yeni `yas` ton alanları.

**4 · Saç kask gibi.**
- Neden: `sac` dizisi kafaya oturan düzgün bir kapak; alın çizgisi bıçakla kesilmiş. İçindeki 5 paralel `sacIsik` şeridi örgü bere ya da kask okutuyor.
- Hedef:
  - Silüette 8–12 düzensiz tutam (seed'li ±0.02 H), alından geri çekilmiş dağınık saç çizgisi.
  - Şakaklarda gri (`#7a6a6a`) iki tutam.
  - Açık şeritler 5 → 3. Eşit aralıklı olmasın; tutam yönünde sivrilen şekil olsun.
- Sahibi: motion. Parametre: `lgYuz` `sac`.

**5 · Atkı "boyun yastığı + sosis" okunuyor.**
- Neden: `atki` düzgün halka; içinde 8 dikey paralel çizgi var. `atkiUc` tek parça, yatay çizgili, ucu yuvarlak bir dil. Boyunu sarmıyor, katmanlanmıyor, püskülü yok.
- Hedef: üç parça.
  - (a) Boyunu saran kat: üst kenar düzensiz; iki katın binişi görünsün; sarma yönünde 3–4 kıvrım tonu.
  - (b) İki uç önde, yakanın içinde, biri ötekinin üstünde. Uzunluk 180–260 px; aşağı doğru 60 → 45 px daralsın; ucu 6–8 püskül çentiği.
  - (c) Örgü dokusu kumaş boyunca uzanan kaburga (ribbing): 4–5 çizgi, uçta 6–7 px aralık.
  - Işık yalnız sol (kapı) tarafında.
- Sahibi: motion. Parametreler: `atki`, `atkiUc` + yeni ikinci uç.

**6 · Örtü şilte ya da uyku tulumu gibi; altında beden yok. Ölü el bir tahta eldiven gibi.**
- Örtü:
  - Neden: üst yüz tek düz krem levha. Kıvrımlar 7 virgül şekli (`[[300,1272,…]]`), bıyık gibi okunuyor. Sarkmada eşit aralıklı 5 dikey çizgi, şilte kumaşı (ticking) gibi.
  - Hedef: altında beden okunsun. Sol uçta baş tümseği, ortada göğüs, sağda ayak uçları (iki sivri tepe).
  - Kıvrımlar bu tepelerden ışınsal çıkan **gerilim kıvrımları** olsun (5–7 tane, sivrilen ton şekli, uzunlukları farklı).
  - Sarkmada tahta kenarından inen **asılı kıvrımlar** olsun (4–5, aralık seed'li, alt uçta etekte V kırığı).
  - Ton: üst yüzün %60'ı `ortu[0]` gölgede. Işık yalnız yelpaze içindeki sırtlarda (`ortuIsik[0]`); sırt genişliği ≤ 30 px.
- El:
  - Neden: `GravurEl` E=250 geniş ve kısa parmaklı. `segirme` parmakları tarak gibi açık. Bilek ve önkol yok. Parmakta tırnak/yüzük okunan çizgi var (`tarama` artığı, x ≈ 545, y ≈ 1475; T #11 ihlali).
  - Hedef: ince, kemikli, gevşek ölü el. Parmaklar bitişik ve hafif kıvrık (b 25–45°, yayılma ±3°). Avuç vücuda dönük.
  - E 250 → 220; bilek genişliği 0.28 E. Boğumlarda tek ton işareti.
  - Ayrı kontur 2.5 px; tırnak ve iç çizgi yok.
- Sahibi: motion. Parametreler: `Sedye` (`ust`, kıvrım dizisi, `sark`), `segirme` pozu, `GravurEl` tarama bütçesi.

## Ek (küçük, sınır dışı not)
- Ceket sol üstünde (x ≈ 570–610, y ≈ 650) başıboş, ince, açık renk bir çapraz çizgi var. Büyük olasılıkla bir `Hilal` kayması; motion bulsun.
- Duvardaki tuğla yamaları (`tugla()`) yuvarlak etiket gibi duruyor (sıvası dökülmüş duvar okunmuyor). Sıva kenarını kırık, düzensiz çokgen yap. Tavanda hedefteki tonoz taraması yok (reçete A9).

## Reçete (GORSEL-RECETE) işaretleme
| Madde | Durum |
|---|---|
| A1 tek ışık | ✗ Zemin ışığı sedye örtmesini yok sayıyor (K1). |
| A3 havuz | ✓ |
| A4 katman | ~ Katmanlar var ama ayrıntı eşit. |
| A7 kenar ışığı | ✓ |
| A8 sıcak–soğuk | ✓ (ölçüm) |
| A9 tarama | ✗ Tavan, duvar ve örtü üstünde yok. |
| A10 renk kaydı | ✓ |
| A11 kontur titremesi | ✗ Yok. |
| A12 kâğıt | ✓ |
| A13 seed | ✓ |
| B | İç mekân. Tonoz kaburgası var, taş/sıva dokusu yok. |

## Ek sorular
- **(a)**
  - Ön plan öğesi: sedye ve örtü ✓.
  - Işık olayı: huzme ✓ (ama K1).
  - Atmosfer: toz ✓ (seyrek; hedefteki gibi ışın içinde yoğunlaşsın).
- **(b)** Bu kare bir dolly zoom tepesi. Teknik "fark ediş" duygusunu güçlendirir; ancak yüz okunmazsa süse döner. Yüz düzeltmesi (madde 3) ön koşul.
- **(c)** Karede asker yok. Aydarov'un eline saygı: el şu an tahta gibi. Madde 6 bunun için de gerekli.
