# K6 eleştirisi: yalnız kritik kareler
Eleştirmen (opus) · 2026-11-08 · tek tur, kısaltılmış.
İncelenen kareler: P12 p90, P08 p44 ve p148, P01 p229/p238/p250 (tam, güvenli, telefon). Ayrıca `telefon-sayfa.png` ve `renk-olcum.md`. Ölçüler ekran pikseli (1080x1920).

## K4 / P12 p90
- **A1 · GEÇTİ.** Koyu yüzde pembe çizgi gözün üstünde. Telefonda (≈17×20 px) seçiliyor. p66, p90 ve p100'de aynı yerde duruyor; `don` 100–130 aralığında olduğu için net süre ≥1 sn.
- **A2 · KALDI (orta).** Yüz, sarık hariç, y ≈650–830 aralığında: ≈180 px, %9.4 (hedef ≥%12). K5'teki seçenek hâlâ geçerli. Yönetmen ya padişahı pencereye 0.3 m yaklaştırıp cs ≈3.2 kullanır ya da %9 gerekçesini json'a yazar.
- **A4 · GEÇTİ.** Bant genişliği yüzdeki çizgiyle aynı. Bant, dikey ışık düzleminin profildeki gövdeyi kestiği ön kenarda; fiziksel olarak doğru. Kanıt lekesi sol duvarda, kadrajda. Telefonda bant hâlâ biraz "astar" gibi okunuyor ama yerdeki huzme konisi bunu ışık olarak bağlıyor.
- **A7 · GEÇTİ.** Boyun yaka ile birleşiyor, blok gibi okunmuyor.
- Küçük notlar:
  - Bir toz zerresi (360, 797) siyah yanağın üstüne düşüyor ve "ben/siğil" gibi okunuyor. Zerreler yüz maskesinin dışında kalsın.
  - Yen ucu (x 290–450, y 1460–1530) ince ve sivri bir kama gibi.

## K5 / P08 p44
- **B2 · GEÇTİ.** Kanat opak. p0, p44, p46 ve p216'da aynı ton ve biçimde. Taş biçimli leke yok.
- **B8 · KALDI (orta).** p44'te iki bacak neredeyse paralel, gövde dik, eller önde kenetli. 5° eğim ve 30 px sürüş telefonda görünmüyor; hâlâ "taşın yanında duruyor" okunuyor. p46'daki devrilme ise iyi.
  - Düzeltme: p40–44'te ön bacak taşın yan yüzüne doğru düz uzansın (ayak taşa değsin), gövde ≥12° öne eğilsin, serbest kol dengeye açılsın.
- **B10 · GEÇTİ.** Sarık sıkı sargı. Öne taşma yok; pompadour okuması bitti.
- **B11 · GEÇTİ.** Ters damla ve kaburgalar var. Telefonda kaburgalar zayıf ama kanat olduğu seziliyor (küçük not).
- **B12 · GEÇTİ.** Sakal çeneyi dolduruyor, bıyık küçük. Lagâri'den ayrışıyor.
- **B1:** Bu karede şehir görünmüyor. Değerlendirmesi P01'de.

## K5 / P08 p148
- **B4 · GEÇTİ.** Taş x 690–885, temas noktası (770, 970). IG sütunu x ≥920; ihlal 0.
- **Toz · GEÇTİ.** Temas karesinde yalnız kırıntı var. p170'te (telefon sayfası) yerde düzensiz, yassı bir öbek olarak okunuyor. Dip mekânını değerlendirmedim; K7'de değişecek.

## K5 / P01 p229, p238, p250
- **B3 · GEÇTİ.** Diz çökme yok. Basışta ayaklar seki yüzünde. Arka ayak p238'de parmak ucunda. Her ayağın altında yumuşak gölge var. Taralı döküm gölgesi güneşin tersine, sola düşüyor.
  - **Yeni (orta, yönetmen json):** p250'de adım çok geniş (ayaklar arası ≈210 px, figür ≈420 px). Kalça düştüğü için gövde "çömelip sinsice hamle yapıyor" okunuyor. Motion'ın json notu uygulansın: 4–5 adım, ya da anahtarlar basış ortalarına (≈383 / 588) çekilsin.
- **B13 · GEÇTİ.** Yeşil kaftan, yüz ve sakal seziliyor; P08 ile bağ kuruluyor. Yan etkisi: kanca gizemi azaldı. Bu kullanıcıya bilgi olarak iletilsin, hata değil.
- **B9 · GEÇTİ.** Silindir ve koni okunuyor: ∩ biçimli saçak, sağda geniş ışıklı külah şeridi, yakınsayan dikişler.
- **B1 · GEÇTİ (kritik kapandı).** Döşeme okuması yok. Yakın çatı sırtları aşağıya bakışı veriyor.
  - Küçük not: y 860–1100 arasındaki pus düzlüğü boş ve bej; telefonda "kumsal/düzlük" okunabiliyor. Bu bant 1–2 çok soluk çatı kümesiyle kırılsın.
- **Küçük (yeni):** Tüm P01 karelerinde x ≈485, y 1860–1920 aralığında siyah, sivri bir dilim var (IG bandında, anlamsız). K7'de dip çizimiyle birlikte kalktığı doğrulansın.

## Renk / imza ölçümü: kenar ışığı önerisi
- **KABUL, bir şartla.** Gövde ve kanat kenar ışığı gerçek güneş ışığıdır; kontur geçiş pikselleri `isik` bölgesine alınabilir (265–712 örnek).
- Şart: `isik` bölgesi bir kutu değil, figür siluetinin konturundan içe doğru ≤6 px'lik bir şerit olacak. Kontur dışında kalan imza tonlu piksel ihlal sayılmaya devam eder (kaftan ya da kanat yüzeyinde imza rengi çıkarsa yakalansın).
- P01 p229 ve P08 p0'daki 4–5 örnek, K5'te kabul edilen güneş parlaması kenarı: **KABUL.**
- Renk tablosunun tamamı TAMAM. P12 kaftan gölgesi ΔL* −4.8, sınırda ama kabul.

## Genel karar
- **K4 (P12): KOŞULLU.** Kritik yok. Koşullar:
  - A2: yaklaşma ya da json'a gerekçe (yönetmen).
  - `el-ahsap` `belirsiz` → false (yönetmen).
- **K5 (GALATA-TEPE + Hezarfen): KOŞULLU.** K5'in 6 kritiğinden B1, B2, B3 ve B4 kapandı. B5 (dip) K7'ye ertelendi. B6 (foley) bu turun kapsamında değil; kurgucu json temas listesinden doğrulamalı. Kalan iki orta madde:
  - B8: itme okunmuyor (motion).
  - P01 adım genişliği (yönetmen json).
  - Bu ikisi K7 turunda aynı karelerle (P08 p44, P01 p250) kontrol edilsin.
