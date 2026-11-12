# Eleştirmen · PARIS-CATI V3 kalibrasyonu · 2026-11-12

**Karar: DÜZELTMEYLE GEÇER · Puan: 6 (düzgün)**
B turu (Montmartre) başlayabilir. Aşağıdaki 3 düzeltme PARIS-CATI'de tek turda yapılır. Sonra yalnız P01 f24 ve f370 yeniden render edilip bakılır. Kanca (f0/f24), döngü kilidi, güvenli alan ve imza tekliği sağlam. Bu turda yeni kritik fizik, süreklilik ya da doğruluk hatası yok. f190 alt bant geçişi kullanıcı onaylı (`lint.izin`), yeniden açılmadı.

## Ölçüm (f370 ↔ hedef-cati, Lab, 270x480)
| | L* ort | L* p95 | C* ort | sıcak piksel (b*>3) | C*>20 |
|---|---|---|---|---|---|
| hedef | 46 | 81 | 21.4 | %18.1 | %66 |
| V3 f370 | 40 | 62 | 19.4 | %7.5 | %47 |
Fark kroma tavanından gelmiyor (ortalama C* yakın). Fark **ışıklarda**: p95 L* 19 puan düşük, sıcak piksel oranı hedefin yarısından az. Yani "sıcaklık" sorunu C* ≤ 28 sınırıyla değil, açık sıcak yüzlerin azlığıyla ilgili. Kılıf oranı korunarak çözülebilir.

## Sorulan noktalar
- **Hedefe yakınlık:** Yoğunlukta yakın, hatta fazla: 4 sıra × eşit aralık. Sıcaklıkta geride (yukarıdaki tablo). Hedefte 2 büyük, farklı yükseklikte sıra, iri terrakota külahlar ve parlayan bir pencere dizisi var. V3'te çok sayıda küçük, birbirinin aynısı birim var.
- **Çatı denizi ızgara mı:** **Evet.** f370 y 620–1000 arası: baca kutuları aynı boy ve aynı külah sayısıyla, eşit aralıkla dizilmiş. Lucarne'lar tek boy, sıralar ekranda eşit adımla basamaklanıyor ve her sıranın saçak çizgisi düz. 360'ta "yumurta kolisi / döşenmiş desen" gibi okunuyor. K3b bacaları (y 620–700) arkalarında çatı kütlesi olmadan şamandıra gibi duruyor. Haussmann öncesi değil ama kural "düzensizlik + ritim" istiyor; şu an ritim var, düzensizlik yok.
- **Tek ışık / gölge:** Kümes, tekne ve teras bacası kameraya doğru uzun gölge düşürüyor (arka ışık). Aynı karede sıra bacaları ve lucarne'lar hiç gölge düşürmüyor. Bu tek ışık kuralının eksik uygulanması.
- **Ölü alan:** f370 y 1450–1780 (≈ %17) düz çinko. Gölgeler kısmen dolduruyor; hedefte de boş teras var ama sıcak ışık havuzlarıyla canlı. Ölü alan kritik değil, düzeltme 2 ile kapanır. `CinkoTeras` ışık şeridi f370'te seçilmiyor.
- **Güvercin yakın plan:** Okunuyor ve A'ya göre çok daha iyi (göz, cere, kuyruk bandı, kanat bantları). Yine de hedef-kus'a göre **çıkartma/clip-art** gibi duruyor: tarama ve gövde gölgelemesi yok, boyun yanardönerliği iki düz yama, kanat bantları dikdörtgen "yarık", kenar ışığı konturdan kaymış ikinci çizgi gibi (baskı kayması). Dekor gravür dilinde, kuş vektör dilinde; aynı karede iki üslup var.
- **f24 kanat–saçak:** Üst kanat ucu (x 350–450, y 245–330) saçak plakasının önüne biniyor. 2.5B'de 3 cm boşluk var ama ekranda kontur konturla çakışıyor. 360'ta "kanat çatıya çarptı" diye okunuyor. Fiziksel bir delip geçme yok, okuma sorunu (orta).
- **P10 el:** A'daki "rock işareti" düzeldi; başparmak kılıfın üstünde, parmaklar kapalı. 360'ta "kuyruktan kavrayan el" diye okunuyor. Elin sırtındaki beyaz çapraz çizgiler (x 290–440, y 1250–1360) yara izi gibi duruyor (küçük, `KolEl` parisGri tendon çizgisi).
- **Telefon 360:** f0/f24'te kılıf ve kuş net. f370'te kümes, tekne, ışıklı lucarne'lar ve siluetler okunuyor. Duman neredeyse görünmüyor; hedefte canlılığı duman veriyor (küçük).
- **AI/jenerik:** (1) kopyala-yapıştır baca kutuları, (2) çıkartma güvercin, (3) gök orta bandında (y 350–600) noktalı tane şeritleri 1080'de kir/ölü piksel gibi duruyor (`GokLitografi` tane yoğunluğu, küçük).
- **Kümes geniş planda:** yaw 30° + öne inen tek eğimli büyük çatı + yüksek kamera. f190/f370'te kümes "devrilen kulübe" gibi okunuyor (dikeyler doğru, okuma yanlış). Orta. Düzeltme kanca kilidini bozacağından şimdi önerilmiyor; B'den sonra bakılsın (`KUMES_V2.sacak` farkı 0.2 → 0.1 kümes yakın görünüşünü bozmadan çatı alanını küçültür).

## En çok 3 düzeltme (önem sırasıyla)
1. **Çatı denizinin ızgara görünümünü kır.** Sahibi: mekân sorumlusu (şartname) → motion (`catiDekor.tsx` `SIRALAR` / `sira()`). Bina `dh` sapması ≈ ±1 kat (±3 m) olsun. Bina başına `BRISIS_H` ve lucarne boyu değişsin. `bacaH` [0.6, 1.8] ve külah sayısı 2–8 seed'e göre seçilsin. K4b'nin ve K3'ün %20–30 binasında lucarne olmasın, ya da kalkan duvar boşluğu bırakılsın. K3b'de bacalar azaltılsın ve gövdesiz baca kalmasın. Hedef gibi daha az ama daha büyük ve daha farklı birimler.
2. **Tek ışık + sıcaklık aynı geçişte.** Sahibi: motion (`catiDekor.tsx` `sirasiBacalar` çizimi + `CinkoTeras isikSerit` + palet `cinkoIsik`, `sirtParlama`, `kulah`). Sıra bacaları ve lucarne'lar kümesle aynı `golgeVektor`'den kısa gölge düşürsün. Sıcak yüzlerde ışık (sırt bandı, bourrelet, ışığa bakan baca yanı, külahlar) L* ≈ 75–82 olsun, C* tavanı korunarak ton terrakota/şeftaliye kaysın. Teras ışık şeridi görünür olsun (L* +12). Ayrıca ışıklı pencerelere küçük hale. Hedef: p95 L* ≥ 75, sıcak piksel ≥ %14. Kılıf oranı ≥ 2.3 yeniden ölçülsün.
3. **Güvercin gravür diline + f24 saçak payı.** Sahibi: motion (`Guvercin.tsx` + `ParisCati.tsx` kalkış kanat sınırları). Gövde altına ve kanat örtüsüne tek yön tarama (dekorla aynı kalınlık) eklensin. Boyun yamaları gradyan/tarama ile birleşsin. Kanat bantları dikdörtgen değil, tüy uçlarını izlesin. Kenar ışığı kontura yapışsın, kayma olmasın. Kalkış kanat sınırına ekleme: "saçak alt kenarından ekranda ≥ 25 px", yani f20–f28 üst vuruş tepesi aşağı çekilsin ya da faz kaydırılsın.

Düzeltmeden sonra yalnız P01 f24, f370 (+360) ve f270–370 şeridi yeniden render edilir.
