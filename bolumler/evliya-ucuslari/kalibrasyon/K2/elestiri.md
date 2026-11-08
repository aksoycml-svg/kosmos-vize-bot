# K2 eleştirisi + K1 kapanışı (SARAYBURNU kiyi gece / insert gece–gün)
Eleştirmen (opus) · 2026-11-08. İncelenen: K2 paketi (17 kare tam/telefon/güvenli alan, 3 yan yana karşılaştırma, telefon sayfası, renk-olcum.md). Renkleri render'dan kendim ölçtüm (9×9 medyan, Lab D65).

## KARARLAR
- **K1 (kıyı gece, P05/P06): KOŞULLU.** Şablon dili kapandı. P06'ya ait 2 orta koşul açık (Y10 taç sıçrama, Y11 suda kanat). Bunlar K3'ü ve sonraki şablonları bekletmez; P06 kullanıcıya gitmeden kapanır.
- **K2 (insert, P07 gece / P11 gün): KOŞULLU.** Dekor, ışığın ters dönmesi, ayna konumu ve renkler geçti. 2 kritik (W1, W2) ve 3 orta koşul açık. Kritikler P07/P11'in kendi temas karelerinde. Şablonun ışık, palet ve ayna dili sonraki şablonlara taşınabilir.

## 1. K1-2 bulgu tablosu
| ID | Durum | Not |
|---|---|---|
| Y1 duman sıçraması | **KAPANDI** | P05 p204 ↔ P06 p0 bulutları aynı |
| Y2 iniş ölçeği | **KAPANDI** | ≈2.9×; sarık + halka + V izi okunuyor |
| Y3 basamak sesi P06'da | **KAPANDI** | P07 p0'a taşındı (ama bkz. W1) |
| Y4 meşale alevi giyside | **KAPANDI** | Alev dik, x≈345 y≈900; Y2'ye ≈100 px |
| Y5 iniş sıçraması | **KISMEN** → Y10 | Boyu yeterli, biçimi yanlış |
| Y6 maskeli yüz | **KAPANDI** | Arka baş + kulak; 360 px'te ense okunuyor |
| Y7 açık kanat bez | **KAPANDI** | İnceliyor, parmak kısa, baş kanadın önünde |
| Y8 katlı kanat levha | **KAPANDI** | Koyu ters damla. "Kalkan/sırt çantası" ikincil okuması **kabul**: ikinci odak değil, P06'da açılınca karşılığını buluyor |
| Y9 demet iskele | **KAPANDI** | p180'de kadrajdan çıkıyor |
| Z1 betik kadraj dışı | **KAPANDI** | |
| Z2 başlık y | **KAPANDI** | Ekranda ≈1467 |
| Z3 kanat ton sıçraması | **KAPANDI** | L\* 22.9–24.2, komşu kare farkı ≤ 0.9 |

## 2. K1 açık koşulları (yalnız P06)
**Y10. Taç sıçrama buz kristali gibi okunuyor.** P06 p215 (ekran ≈x 420–540, y 1030–1100): sivri, düz kenarlı beyaz üçgen konilerden oluşuyor, "buz / diken" okunuyor. Kural: efekt dili (tasarim §5 E3: "taç biçimli damla yayı"). **Motion:** dilleri kavisli ve uçları yuvarlak damlayla biten şeritler yap. Damlalar kopup düşsün. Renk `#a9bccb`, dolgunun kenarı açık, düz beyaz değil.

**Y11. Suda kanat kalas/sopa gibi okunuyor.** P06 p236–299: amber konturlu ince yatay çizgi. Kullanıcı kararı "kanat suda, %40'ı görünür" ekranda yok. Kanat olduğu okunmazsa P07'de "kanatsız Lagâri" karşılığı boşa düşer. **Motion:** kanat bir uç ve parmaklar yukarıda olmak üzere ≈15–20° eğik batsın. Suyun üstünde inen kenar ve parmak silueti (≥ 60 px yükseklik) görünsün; kalan kısım su altında koyu gölge olsun. ±4 px salınım ve halka kalsın.

## 3. K2 kararları (orkestranın sorduğu 3 nokta)
1. **Alıcı gövdesinin kadraj dışında olması (çömelmiş, yalnız omuz başı + kol): KABUL.**
   - Sahne planının "insert, omuz + avuç" niyetiyle ve kullanıcının P11 yüzsüz insert kararıyla uyumlu.
   - Ayakta figürde kese ekranın %5'ine düşüyordu; bu, okunurluk kuralını bozardı.
   - Şart: yönetmen json'da `karakterler`i kadraj dışı alıcıya çevirsin, `alt_ucte_bir`'den "ayaklar"ı çıkarsın. Omuz kütlesi her karede kadraj kenarına yaslı kalsın; boşlukta yüzen kol olmasın (şu an doğru).
2. **P07'de elin soldan/alttan girmesi: KABUL.** Basamaklar ve deniz kadrajın solunda; Lagâri denizden çıkıyor. K1-2'de yazdığım "sağdan/alttan" yanlıştı, geri alıyorum. P06 son karesinde köşke doğru yüzüş ile P07'de soldan giriş, kesmede zaman atlamasıyla tutarlı.
3. **Motion'ın bıraktıkları:**
   - Basamak kademeleri zayıf: **açık** (W3).
   - Katlı kanadın "kalkan" okunması: kabul (Y8).
   - Muhafız gölgesinin elips olması: **açık** (W4, bütün zemin gölgeleriyle birlikte).
   - P11 p210'da elin keseye uzanması: **KRİTİK** (W2).
   - Suda kanadın tahta gibi okunması: **açık** (Y11).

## 4. K2 bulguları (önem sırasıyla)
### KRİTİK
**W1. P07 p0'da el, kendi yeninin üstüne geri katlanmış. Temas basamakta değil.**
- Kare ekran x 0–450, y 1070–1480.
- Yen, kadraj içinde biten kapalı bir dikdörtgen kutu. Yen ağzı ve bilek sağ-altta. Avuç ise sola dönük, yenin **üstünde** yatıyor.
- El kolun devamı değil ve basamağa değmiyor. Planın temas karesi bu (`islak-el` foley'i p0'da).
- Kural: fizik (anatomi, tutulan/temas eden el), temas = ses, kurulum (Y3'ün karşılığı).
- **Motion:**
  - Kol kadrajın sol-alt kenarından gelsin (yen kadraj dışında başlasın, kadraj içinde bitmesin).
  - Yen ağzı → bilek → avuç aynı yönde ilerlesin.
  - Avuç aşağı dönük, parmaklar basamak kenarını kavrasın.
  - Avucun altında ıslak koyu leke + parlama, temas karesinde netleşsin.

**W2. P11 p208–210'da Hezarfen'in eli yerdeki keseyi boynundan tutuyor gibi.**
- Ekran x 470–700, y 1050–1330.
- EV-D5'in anlamı tersine dönüyor ("gevşeyen avuç, kese kayıp düşer" yerine "keseyi alıyor / geri kapıyor").
- Kural: dokunuş okunur, senaryo → parametre.
- **Yönetmen:** bilek y ≤ 1000'de kalsın. Avuç açık, aşağı dönük ve gevşek olsun. Parmaklar keseden ≥ 80 px uzak dursun. El, muhafızın bastırmasıyla yalnız 10–20 px çöksün.

### ORTA
**W3. Basamaklar "denize inen basamak" değil, beton blok / bank gibi okunuyor.**
- Kare ekran x 0–330, y 1120–1960; 360 px'te 2 kademe görünüyor, denizle bağı yok.
- P07 p0 teması tam burada olduğu için okunması şart.
- **Motion + mekân sorumlusu:**
  - 3 kademe net olsun (üst yüz açık, ön yüz koyu, kenarda ince parlama).
  - En alt kademe su çizgisinde bitsin: kadrajın sol-alt köşesinde su şeridi ya da ıslak koyu bant + küçük halka.
  - P07'de üst kademede ıslak izler olsun.

**W4. Zemin gölgeleri kopuk elips; bir kısmı suya düşüyor.**
- P11 p42/p72: alıcının omuz gölgesi ≈x 210–390, y 740–790'da yarısı denizin üstünde, keskin bir disk. P07 p130 basamakta elips. Muhafız eli gölgesi de elips.
- Kural: tek ışık (gölge kaynağın siluetinden türer). Su keskin gölge taşımaz.
- **Motion:** gölge, kol/el çokgeninin güneş/pencere yönündeki zemin izdüşümünden çizilsin (aynı `yon` vektörü). Su üstündeki kısım çizilmesin ya da α ≤ .15 olsun. Muhafız eli için el silueti izdüşümü kullanılsın.

**W5. Muhafızın eli omuza değil üst kola iniyor (P11 p98, ekran ≈x 540–680, y 330–470).**
- "Kolundan tutuldu" anlamı da yakalanmayı anlatıyor, kabul edilebilir. Ama `kumaş 6 px içeri` teması kumaşın görünen yerinde olsun.
- **Yönetmen:** json'da hedefi "üst kol" diye beyan etsin (kural 1). Kumaş çökmesi kontrol karesinde ölçülsün.

### KÜÇÜK
- **Z5.** Duvar sıra çizgileri duvar üst kenarını aşıp göğe taşıyor. Her insert karesinde üst-orta bölgede (≈x 520–700, y 0–130) "tel" gibi çizgiler var. Maske hatası. **Motion.**
- **Z6.** Kemer A2 iç köşesi, tam boy taramalı siyah bir yarık; kemer eğrisi görünmüyor, "yarık / kapı aralığı" okunuyor. Görünür bir üzengi ya da kemer eğrisinin alt ucu eklensin. **Mekân.**
- **Z7.** Duvarın derin perspektifinde dikey derzler yoğunlaşıp "çit / tahta perde" okunuyor. Uzak bölgede dikey derz seyreltilsin (mesafeye göre ayrıntı: uzak = yalnız sıra çizgisi). **Motion.**
- **Z8.** Altın sikke gün ışığında imzaya ΔE76 17.3 (kendi ölçümüm; motion'ınki 18.8), sınıra yakın. Yatma parlaması karelerinde (`#f0d890`) yeniden ölçülsün. **Motion.**

## 5. Renk teyidi (render, kendi ölçümüm)
| Kare | Bölge | Ölçülen | Hedef | Sonuç |
|---|---|---|---|---|
| P11 p72 | gök | `#c9c9be` L 80.7 C 5.8 h 110 | `#cfcfc4` L 82.8 C 5.8 h 110 | ✓ |
| P11 p72 | deniz | `#5d7075` L 45.9 C 7.8 h 221 | `#5e7378` C 8.4 h 219 | ✓ C %93 |
| P11 p72 | rıhtım | `#9d937e` | `#a09682` | ✓ |
| P11 p72 | duvar | `#a99d84` | `#b4a88e` | ✓ (ΔL −4.1; imzaya ΔE 17.0) |
| P07 p72 | gök | `#161c29` L 10.3 C 9.8 h 278 | `#1c2232` L 13.4 C 11.6 h 281 | ✓ C %84 |
| P07 p72 | deniz | `#161b24` | `#161c26` | ✓ |
| P07 p72 | rıhtım | `#444349` | `#45444a` | ✓ |

Parça başına imzaya ΔE76: kese (gün) 28.9, Hezarfen eli 25.2, Lagâri eli 27.8, veren el 19.8, sikke 17.3 → hepsi ≥ 15. Kırmızı 0. Motion'ın tablosuyla tutarlı.

## 6. Dersler (ek)
1. **Insert'te kol, kadraj kenarından gelir.** Kadraj içinde biten bir yen kutusu ya da yenin üstüne katlanan el, ölçekten bağımsız bir anatomi hatasıdır. Temas karesinde el teması yüzeye gösterilir.
2. **Bir dokunuşun son karesi anlamı taşır.** "Gevşeyen el" ile "uzanan el" arasındaki fark bilek yüksekliği ve avuç yönüdür. Bu ikisi json'da beyan edilir.
3. **Gölge izdüşümle çizilir, elips şablonla çizilmez.** Su keskin gölge almaz.
4. **Efekt biçimi malzemeyi söyler.** Su sıçraması kavisli ve damlalı olur; düz kenarlı koni buz okunur.
