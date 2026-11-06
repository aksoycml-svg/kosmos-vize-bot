# Hibrit plaka testi · P02 BORSA (açık portikli avlu) · B yolu

Hazırlayan: mekan-sorumlusu · 2026-11-06 · Deney; üretim değil. Model: gemini-3-pro-image, 2K (çıktı 1536×2752, oranı 0.558; 9:16 = 0.5625 → kenarlardan ~10 px kırpılacak).
Girdiler: CLAUDE.md (mimari çeviri, gravür dili, güvenli alan), mekanlar.md §10.1 + §11, donem-dogrulama.md Ek 3 Soru 19, sahne-plani.md P02, referans: `kareler/SB2-BORSA-p0.png` (kompozisyon), `mood/mood-05-gravur-sokak-bordeaux.png` (üslup).

## Denemeler (4/4 kullanıldı)

| # | Dosya | Prompt | Sonuç |
|---|---|---|---|
| d1 | `BORSA-plaka-tam-d1.png` | `prompt-1-tam.txt` | İyi iskelet; ama ufuk çok alçak, ayak gölgesi taraması **kafes/ağ** dokusu, amblemler alınlıkta değil kilit taşının üstünde, lunette'te ışınsal çubuk, güneş soldan (karttan ters) |
| **d2** | **`BORSA-plaka-tam-d2.png` = `BORSA-plaka-tam.png` (en iyi)** | `prompt-2-tam.txt` | Amblemler alınlıkta (taş lunette), güneş sağ-arkadan (sağ cephe taramalı gölgede, zemin gölgesi sağda), tarama paralel çizgi; arka cephe daha küçük, avlu zemini daha geniş. Ön ayak gövdelerinde ince çapraz tarama hâlâ "ağ" gibi |
| d3 | `BORSA-katman-arka-d3.png` | `prompt-3-arka.txt` (d2 referans, düzenleme) | **Başarılı.** Ön çerçeve kaldırıldı; gök, iki yan cephe (yarım daire arcade + parmaklık) ve avlu zemini kenara kadar uzatıldı. Arka cephe, tahta, amblemler, ışık d2 ile aynı |
| d4 | `BORSA-katman-on-d4.png` (+ `BORSA-katman-on-maske.png`) | `prompt-4-on.txt` (d2 referans, düzenleme) | **Kısmen.** Çerçeve korundu, arka yeşile boyandı ama model arka cephenin **çizgilerini yeşilin üstünde bıraktı** (temiz chroma değil). Yeşil-baskın renk eşiği + 7 px kapatma/medyan filtresiyle maske çıkarıldı; kalan yeşil piksel 106 (ihmal edilebilir) |
| — | `BORSA-kompozit-test.png`, `-360.png` | d3 + d4 maske | Paralaks bileşimi **dikişsiz** okunuyor (bkz. görsel). Kayma/hale yok; parmaklık çubukları maskede korunuyor |

Not: maske/bileşim deney için tek seferlik Python ile yapıldı (repo koduna girmedi). Üretimde motion bunu `tools/` altında bir betik olarak sabitlemeli.

## Dönem / mimari denetimi (d2 + d3 + bileşim)

| Madde | Kart (§10.1) | Plaka | Durum |
|---|---|---|---|
| Kemer tipi | `yarimDaire` (plein cintre) [D Ek 3] | Arka ve yan arcade'lar ve ön portik kemeri tam yarım daire | ✓ Sivri yok |
| Kilit taşı / imposte | sade kilit taşı + imposte silmesi [G] | Var, sade | ✓ |
| Pilastr | arcade arası düz pilastr | Düz pilastr, kaide ve başlık | ✓ |
| Alınlık amblemi | her alınlıkta 1 ticaret amblemi [D Ek 3] | d2/d3: yan alınlıklarda terazi + çapa + Merkür asası + bereket boynuzu **bir arada** (tek amblem değil, armalı demet) | ◐ Kabul edilebilir; "okunmaz şehir adı satırı" çizilmedi (yazı yasağı nedeniyle istenmedi). Orta arcade açık, alınlıksız: tahtanın tepesine gölge düşer, iyi |
| Demir parmaklıklı kapılar | seyrek dikey çubuk, mızrak uç [D Ek 3 + BC1] | Seyrek dikey çubuk, mızrak uç, alt-üst kuşak | ✓ Tel örgü yok |
| Üst kat pencereleri | dikdörtgen, düz söve, kemer yok [T; Ek 3 bulunamadı] | Dikdörtgen, düz söve, iki kanatlı küçük bölmeli | ✓ (bölmeli cam 1830 için uygun [G]) |
| Korniş + balüstrad | üst korniş/balüstrad | Dişli korniş + balüstrad | ✓ |
| Açık avlu, cam tonoz yok | 1749 açık [D Ek 3, olası] | Gök açık, fener/tonoz yok | ✓ |
| Kadran (1750, saat + rüzgâr) | arka cephe, kornişin altında | **Yok** (prompt rakamlı saati yasakladı) | ✗ Eksik imza 2. Motion üstüne vektör kadran koyabilir ya da sonraki üretimde "rakamsız fayans kadran" istenir |
| Tahta | orta arcade altında, galeri duvarına dayalı, boş | Boş kara tahta + alçak ahşap estrad | ✓ Yazı yok (PARIS başlığı Remotion'da biner) |
| Ön portik çerçevesi | iki ayak (pah + imposte), gölgeli zemin bandı, sol alt yarı açık parmaklık kanadı, sağ alt tezgâh + defter + hokka | Hepsi var; tezgâh tam görünür (BC5 ✓) | ✓ Ama ön kemer tepesi kadraj içinde (kart: "görünmez"); SB2-p0 da gösteriyor → kabul |
| Işık | öğle, yüksek, sağ-arkadan, kısa gölge sol-öne | Sağ yan cephe taramalı gölgede, zemin gölgesi sağ arkadan diyagonal; portik eşiğinde net yatay ışık kenarı | ✓ Gölge çok uzun değil ama "tepeden" kadar kısa da değil (öğleden çok ikindi başı okunuyor) ◐ |
| İnsan / yazı / modern öğe | yok | Yok; bayrak yok, gaz lambası yok | ✓ |
| Tarama dili | paralel, kafes/örgü yok (A4 G6) | Cephe ve zemin: temiz paralel tarama. **Ön ayak gövdeleri ve kemer:** çok sık çapraz tarama, 360 px'de gri ağ/ekran tonu gibi | ◐ Ön katman için düzeltme gerekli (bkz. riskler) |
| Palet | 6 dolgu + kâğıt + güneş | Sıcak kum/sarımsı taş, gri-mavi gök, koyu kahve portik; saf siyah/beyaz yok. Tahta d3 bileşiminde neredeyse siyah (`#1f2a26`'dan koyu) | ◐ Renk ölçümüyle doğrulanmalı (renk-olcum.md protokolü); tahta tonunu motion kaldırabilir |
| Bordeaux kimliği | pierre blonde | Taş sarımsı, okunuyor; ama Bordeaux'ya özgü imza (maskaron vb.) bu mekânda yok, kaynağa uygun olarak | ✓ |

## Kamera / ufuk / güvenli alan uyumu (sahne-plani P02 ile)

- **Ufuk:** Zemin derzlerinin kaçışı ve arcade tabanı d2'de ≈ %59 yükseklikte → 1080×1920'de **y ≈ 1135**. Hedef ~800–880. **Tutmadı** (iki denemede de model ufku düşük tuttu; ikinci denemede %70'ten %59'a çıktı). Sonuç: kart ölçeğiyle (ayak y ≈1420–1560, yüz ≈90 px) karakterler bu plakada **arka cepheye göre devasa** okunur; ufuk–ölçek kuralı (baş ufka yakın) için ya kuklalar küçültülmeli (baş y ≈1135 civarı → ayak ≈1500'de boy ≈365 px, şimdiki ≈620 px) ya da plaka yeniden üretilmeli.
- **Tahta konumu:** plakada x ≈471–612, y ≈970–1060 (1080 ölçeğinde). P03 MATCH kuralı tahta x 300–780, y 400–760 ve "PARIS" (540,430) istiyor. **Uymuyor**: tahta 3.4× küçük ve 550 px aşağıda. Plaka kırpılarak büyütülürse (≈1.4× net çözünürlük sınırı) bile tahta y 400'e çıkmaz; MATCH geçişi tasarımı ya da plaka yeniden düşünülmeli.
- **Tahta insert (cs ≈3.1):** plakadan yapılamaz (tahta 145 px → 836 px = 5.8×, 2K plaka en fazla ~1.4× taşır). **İnsert ayrı plaka** ister (yakın tahta + arcade iç duvarı).
- **Güvenli alan:** üst %11 sakin gök + kemer (✓); alt %22 gölgeli portik zemini + tezgâh + parmaklık (✓ ölü alan yok, kalabalık detay yok). Yan 80 px: ön ayaklar kenarda (✓ çerçeve).

## Tutarlılık riskleri

1. **Aynı mekânın farklı açıları:** P02 dört ölçek kullanıyor (geniş, tahta insert, Louis göğüs, boy). Her açı ayrı üretim = mimari ayrıntının değişmesi (d1→d2 aynı prompta yakın olduğu hâlde amblem, pencere bölmesi, korniş dişi değişti). Referans görselle "düzenleme" (d3 gibi) tutarlılığı korur; sıfırdan üretim korumaz. Kural önerisi: **mekân başına tek ana plaka**, diğer açılar o plakadan düzenleme ile türetilir.
2. **23 plana ölçeklenme:** ~12 mekân × (ana + 1–3 açı) × (2–3 katman) ≈ 60–90 üretim + her biri 1–3 deneme. Bu testte 4 deneme ile 1 plaka + 2 katman çıktı, ufuk hedefi yine tutmadı. Kontrol edilebilirlik (ufuk px, nesne px konumu) kodun çok altında; her plaka için eleştirmen kontrolü + elle maske temizliği gerekir.
3. **Kafes/ağ taraması:** model koyu yüzeyleri ince ızgara ile dolduruyor; A4 G6 kabul testinde yasak. Prompt kısmen düzeltti (cephe), ön katman düzelmedi. Ön çerçeve kodla (A yolu) çizilip yalnız arka plaka üretilirse sorun ortadan kalkar.
4. **Rig ile plaka arasında "iki dünya":** plaka ince mürekkep + yoğun tarama; kukla rig düz dolgu + kalın kontur. Bileşim yan yana konmadan karar verilmemeli (sonraki adım: d3+rig+d4 kontrol karesi, motion).
5. **Dönem denetimi her plakada tekrar:** model kendiliğinden ekleme yapar (d1'de ışınsal lunette, mood-05'te haç/fener/kaldırım). Her plaka madde madde kontrol edilmeli; kaçış = yanlış dönem.
6. **Seed/kaynama:** plaka statik PNG olduğu için doku kaynamaz (✓). Işık değişimi (P02'de yok) plakada yapılamaz; ışık ancak üstüne bindirilen katmanla.
7. **Lisans/kaynak:** Gemini çıktısı; kanal ticari kullanımı için Google koşulları kullanıcıca kontrol edilmeli (doğrulanmalı).

## Kamera hareketi / paralaks sınırları

- 2K plaka genişliği 1536 px = 1080'in 1.42×'i. **Net push-in ≤ ~1.35×** (P02 geniş planındaki dolly cs 1.00→1.13 ✓).
- Paralaks: iki katman (arka d3 + ön çerçeve d4) yeterli ve dikişsiz. Ön çerçeve yanal kayma ≤ ~40 px (çerçeve kenarı ekran kenarından içeri girerse boşluk açılır; ön katman %3–5 büyük üretilmeli). Arka katmanda derinlik yok: dolly'de cephe ile zemin aynı ölçekte büyür (gerçek perspektif kayması olmaz); ≤1.15× hareketlerde fark edilmez, daha büyük hareketlerde "fotoğrafa zoom" okunur.
- Orta katman (yan arcade'lar, tahta, kalabalık) ayrılmak istenirse üçüncü düzenleme gerekir; bu testte denenmedi.

## Hangi mekânlar için uygun / uygunsuz

| Uygun (statik ya da az hareketli geniş arka plan) | Uygunsuz (kodla kalmalı) |
|---|---|
| BORSA geniş/boy (P02 p0–78, 186–204) | P02 tahta insert, Louis göğüs (ayrı plaka ya da kod) |
| SOKAK-BORDEAUX boy (P04 p0–78) arka cephe + gök (ışık havuzları üstte kod) | P04 fare insert (kaldırım hizası, fizik temas) |
| CATI-BORDEAUX (P06) şafak siluet + Saint-Michel | HARITA (P03, P05), WIFI-MORF (P22): grafik, animasyonlu |
| KULE-DIS uzak siluet (KD-C), PARIS-AVLU (P09) | KULE-DIS kol mekanizması (P12, P13, P21): Chappe ayrıntısı kanıtlı ve hareketli, model yel değirmeni/yanlış kol çizme riski yüksek |
| MAHKEME (P18) geniş salon | TOURS-KULUBE-IC (çekmece, pencere, kol B, mum ışığı değişimi), YATAK-ODASI (kum), KANUN-INSERT: dokunuş yüzeyleri canlı katman |

Genel kural: **etkileşim olmayan, ışığı değişmeyen, uzak/orta mesafe mimari** → plaka; **temas, ışık değişimi, kanıtlı mekanizma, insert** → kod.

## A (tamamen kod) ile kıyas

| Ölçüt | A (kod gravür, A4) | B (hibrit plaka, bu test) |
|---|---|---|
| Gravür kalitesi (mood-05'e yakınlık) | Düşük-orta: düz paneller, seyrek tarama, "vektör" okunuyor | **Yüksek**: gerçek litografi hissi, derinlik, malzeme |
| Mimari doğruluk kontrolü | Tam (kemer tipi, oran px ile) | Orta: iskelet doğru çıktı ama kadran eksik, amblem demeti, her plaka denetim ister |
| Kamera/ufuk/konum kontrolü | Tam (ufuk px, tahta px, MATCH) | **Zayıf**: ufuk 1135 (hedef ~840), tahta MATCH konumunu tutmadı |
| Kamera hareketi | Sınırsız (vektör), gerçek perspektif | ≤1.35× push-in, 2 katman paralaks |
| Işık değişimi / dokunuş yüzeyleri | Var | Yok (üstte kod katmanı gerekir) |
| Tutarlılık (açılar arası) | Garantili | Düzenleme ile kısmen; risk |
| Maliyet | Motion zamanı | Üretim + deneme + maske + denetim |
| Rig uyumu | Aynı çizgi ailesi | Üslup farkı riski (test edilmedi) |

**Önerim (mekân sorumlusu):** **Karma B′**: plaka yalnız geniş/uzak arka katman (gök + cepheler + zemin) için; ön çerçeve, temas yüzeyleri, tahta, ışık ve insertler kodla. Plaka sahne planından önce değil, **sahne planına uydurularak** üretilmeli; yani ufuk ve kilit nesne konumları için ya (a) plaka gelince sahne planı ona göre ayarlanır (ufuk ~1135, kuklalar küçülür), ya (b) motion SB2-p0'ın çizgi iskeletini (ufuk, tahta dikdörtgeni, arcade eksenleri) düz çizgi olarak verir, Gemini o iskelete "boyama" yapar (bu testte denenmedi; ufuk sorununu en iyi çözecek yöntem bu). Karar kullanıcının.

## Açık sorular
1. Kullanıcı: B′ yönü kabul mü? Ufuk için (a) sahne planını plakaya uydurmak mı, (b) iskelet referansıyla yeniden üretim mi?
2. Kadran (1750, saat + rüzgâr yönü): plaka üstüne vektör mü, yoksa çizilmesin mi?
3. Gemini çıktısının ticari kullanım koşulu (doğrulanmalı).
4. Motion: d3 + d4 + kukla rig ile tek kontrol karesi (iki dünya testi), eleştirmen bakışı.
