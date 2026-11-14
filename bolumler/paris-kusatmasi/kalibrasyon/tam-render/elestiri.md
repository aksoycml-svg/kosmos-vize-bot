# Paris kuşatması: ilk tam render, jüri (günlük mod) · eleştirmen · 2026-11-14

Malzeme: out/paris/paris-{tr,en}.mp4 (58.22 sn, 60 fps), genel-{tr,en}.png, foley/müzik stem'leri. Ölçümler scratchpad'de yapıldı: üst bant kırpıntıları, 4 karelik hareket şeritleri, temas kareleri, foley stem ile final arasında çapraz korelasyon.

**Karar: kullanıcıya GÖSTERİLMEZ.** Yazı katmanında üç kritik sorun var: yazı kadraj dışına taşıyor, P11 sayacı okunmuyor, P02 sayacı sayıyı olduğundan kesin gösteriyor. Görüntü ve ses hazır. Kit düzeltilince yalnız yazı katmanı yeniden render edilip birleştirilir.

## Altı soru
1. **Kanca (0.00–2.0):** Evet. 0.00'da kuyruğunda bal rengi kılıf olan güvercin büyük görünüyor, 0.25'te kanat açıyor, 1.3'te kadrajdan çıkıyor. Ekran yazısı 0.13'te geliyor. Küçük kusur: yazının 2. satırı "· 4 AY KUŞATMA" diye ayırıcıyla başlıyor (EN'de "· 4-MONTH SIEGE").
2. **Doruk:** P07 35.12'deki vuruş çalışıyor: delik 35.14'te açılıyor, balon 35.5–35.9'da düşüp alttan çıkıyor. Ama vurulan balon telefonda ~45 px. Okunan kısım torba atılışı (36.5–37.4) ve P10 "okudu" (51.7). Karşılık güçlü.
3. **Jenerik/AI gibi duran kare:** 36.3–38.9 sepet bel planında silindir şapkalı yüzsüz Dagron sepet kenarına yatmış gibi duruyor. Kukla gibi okunuyor, insan gibi değil.
4. **En zayıf 5 sn:** 38.9–43.9 (P08 Fransa haritası). İğne inişi ve küçük ikonlardan başka olay yok. Tek mekanizması gri leke + noktalı çizgi.
5. **Üç büyük kesmenin sesi:** 6.37 ve 33.32'deki whip'ler sessiz (karar gereği). Müzik ikisinde de kesilmiyor: kesmeden önceki ara −30 dBFS, sonraki anlatım −15. 46.03'te kanat salma foley'i kesmenin üstüne biniyor, kopukluk yok. Döngü 58.22→0.00'da son 50 ms −48 dBFS, ilk 50 ms −31 (TR) / −24 (EN). Müzik sönüp yeniden başlıyor; kulakla dinlenmeli.
6. **AI gibi duran kelime/okuma:** EN 56.0 civarında kelime kelime altyazı "did carried" diye bir grup gösteriyor ("Those that did carried a city's letters."), dil bilgisi hatası gibi okunuyor. EN "Dagron's dumped sand" da sesli okunuşta takılıyor. TR temiz.

## Düzeltmeler (önem sırasıyla, en çok 3)
1. **KRİTİK · Ekran yazısı kadraj dışına taşıyor**, motion (kit). `src/kit/yazi.tsx` `iddiaYer()`/`yerlesim()` içindeki genişlik katsayısı `en = 0.52` BÜYÜK HARF Playfair 900 için düşük kalıyor. Ölçüm: P05 "FOTOĞRAFÇI RENÉ DAGRON" 64 px'te ~920 px, yani harf başına ≈0.65 em. Bu yüzden `whiteSpace: nowrap` satırı şeridin ve x=1000 yan sınırının dışına itiyor. Etkilenen yerler: TR P05 (DAGRON/BOYU), P07 (EKİPMAN), P09 (MEKTUPLAR), P10 (MEKTUPLA[R] kesik); EN P03 (WAY), P04 (FAR), P05 (DAGRO[N], FINGER-SIZED), P07 (EQUIPMEN[T]). Öneri: büyük harf için en ≈0.66 ya da ölçülen genişlik. Aynı düzeltmede 3 parçalı " · " metinde ikinci satır ayırıcıyla başlamasın (P01).
2. **KRİTİK · P11 sayacı okunmuyor**, motion (kit). `KitSayac`: `px = min(72, ic/(enUzun.length*en))` ve tek satır zorunlu. Dönüş metni TR 51 / EN 79 karakter olduğundan sayaç ve dönüş yazısı ~28 px / ~18 px'e iniyor (telefonda 6–9 px). Bunun üstüne şerit tam genişlikte boş kalıyor. Dönüş metni " · " ayırıcısından iki satıra bölünsün; sayaç kendi uzunluğuna göre boyutlansın.
3. **ORTA · EN altyazı gruplaması**, yönetmen. P11 `altyazi` kelime grupları (kelimeKare): "Those that did" bir grup, "carried a city's letters" sonraki grup olsun. Metin ve ses değişmez.

## 3 sınırının dışında (doğruluk / fizik)
- **KRİTİK DOĞRULUK · P02 sayaç "2.000.000 İNSAN" (EN "2,000,000 PEOPLE"), 10.3–12.0.** arastirma.md E1'e göre nüfus yalnız mertebe olarak biliniyor ("tek kesin sayı yok"). Sayacın tam 2.000.000'da durması kesin sayım gibi okunuyor. Sahibi yönetmen. Parametre: P02 `ekran_yazisi[1].metin` → "~{n} İNSAN" / "~{n} PEOPLE" ya da dönüş metni "≈2 MİLYON".
- **ORTA FİZİK · P07 35.45–35.9.** Uzaktaki küçük balon düşerken ön plandaki gar çatısının ÖNÜNDEN geçiyor. Derinlikle ölçek tutarsız: uzak cisim yakın yapının arkasında kalmalı. Sahibi motion. Parametre: düşen balon katmanının z sırası (gar katmanının altına) ya da düşüş yolunun garın solunda bitmesi.

## Ölçülen ve temiz çıkanlar
- Foley yerleşimi: final mp4'te temas zamanından +5 ms (igne-tak, tel-kopma, kılıf-otur, cam-levha, zarf-aç, sandık-tok için çapraz korelasyonla). Görüntü temas karesi: darbe deliği 35.14 (json 35.12), iğne teması ≈41.60 (json 41.65, ~3 kare erken; kabul edilebilir).
- TR/EN yazı katmanları ayrı. EN'de Türkçe yazı yok, TR'de İngilizce yazı yok. Harita adları (PARIS/TOURS) dil-nötr.
- Döngü görüntüsü: son kare (konmuş kılıflı güvercin) ile ilk kare aynı kadraj ve aynı kümes; hareket tamamlanıyor.
- Düşen balon kadrajın altından fiziksel olarak çıkıyor, fade yok.

**Puan: 6** (düzgün). Düzeltme 1–2 ve P02 sayacından sonra beklenen puan 7.
