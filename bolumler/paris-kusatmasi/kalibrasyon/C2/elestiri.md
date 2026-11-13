# C2 kısa kontrol: DAGRON-INSERT + LANTERN-ODA (eleştirmen, 2026-11-13)

**Karar: DÜZELTMEYLE GEÇER. Puan 6** (C'de 5'ti).
- C'nin 5 düzeltmesi büyük ölçüde tuttu.
- P10 f330 artık "okuyan adam" olarak okunuyor.
- **Yeni 3 KRİTİK fizik/süreklilik hatası ve P05 eli kullanıcıya gitmeden düzeltilmeli.** Düzeltmeden sonra yalnız ilgili şeritler yeniden render edilir; tam kalibrasyon turu gerekmez.

## C'nin 5 düzeltmesi
1. **P05 ölçü: KISMEN.**
   - Tutanlar: El masaya yatık, kalkık parmak yok, başparmak doğru tarafta. Şerit sayfa minyatürü olarak okunuyor ve sayfayla aynı karede.
   - Tutmayan: El dili tutmadı (aşağıda 4).
2. **P10 `oda`: TUTTU.**
   - Bez çubuğa ve ipe asılı, alt kenarı sarkıyor.
   - Lantern sağ-alt ön planda.
   - Duvarda pervaz, kapı paneli ve tarama var.
   - Dikiş yok. Işınlar perde köşesinde bitiyor.
3. **P10 `kapi` okuyan: TUTTU.**
   - Profil, burun ve sıcak çene kenarı görünüyor. Baş kâğıda eğik.
   - Kollar konik, palto renginde ve taranmış.
   - 360'ta "kâğıt gösteriyor" değil, "okuyor" diye okunuyor.
4. **Memur başları: TUTTU.** Kask okuması gitti, başların biçimleri farklı. Ancak memur-3'te yeni hata var (aşağıda 2).
5. **Fizik paketi: TUTTU.**
   - P04b'de kuyruk çerçevenin içinde, menteşe görünüyor.
   - P05 f0'da kuyruk direkte değil.
   - P09'da baş kadrajda, ip koyu ve okunuyor.

## Anahtar anlar (360)
- **P05 f280 (mekanizma): okunuyor.** "Sayfa → avuç içi kadar film" tek karede. Okunmayı bozan şey el dili.
- **P10 f200 (karşılık): okunuyor.** Projeksiyon odada, perdede.
- **P10 f330 (doruk): okunuyor.** Kâğıt koyu fonda, baş parlak kapı açıklığında.

## Yeni hatalar (kare · sorun · neden)
1. **KRİTİK (süreklilik): P10 f150–178 perde bezi büyüyor.**
   - Sorun: Bez çerçevesi görüntüyle birlikte yaklaşık 120 → 170 px (360 ölçeğinde) büyüyor. Memurlar ve lantern ise sabit. Bu kamera itmesi değil, çünkü öndeki nesneler daha az büyümez. Görünen şey: duvardaki bez genişliyor.
   - Neden: `LanternOda.tsx`'te bez ölçüsü, görüntü büyüme parametresine bağlı.
   - Düzeltme: Bez sabit kalsın; yalnız ışık dikdörtgeni ve huzme büyüsün.
2. **KRİTİK (fizik): P10 f200'de memur-3'ün başı saydam (x 610–720, y 1205–1340).**
   - Sorun: Duvar taraması başın içinden görünüyor.
   - Neden: Memur-3'ün baş dolgusu eksik ya da opaklığı düşük. Huzme katmanı da başın önünde değil arkasında çizilmeli: baş huzmenin içinde, yani ışığı kesmeli.
   - Düzeltme: Baş dolgusu opak olsun ve perdeye baş gölgesi düşsün. Daha ucuz yol: memur-3'ün x'i huzme dışına alınsın (yönetmen json).
3. **KRİTİK (fizik, tek ışık): P05 elin gölgesi elden kopuk.**
   - f268–272: El sağ üstte, gölgesi sol altta. f280'de ise gölge sağ üste düşüyor; ışık yönü kare içinde dönüyor.
   - f348–356: El kadrajdan çıktıktan sonra gölgesi sayfada kalıyor.
   - Neden: `DagronInsert.tsx`'te gölge, elin dönüşümünden değil kendi ayrı anahtarından konumlanıyor.
   - Düzeltme: Gölge = el yolu + sabit ışık ofseti (f280'deki yön). El çıkınca gölge de çıksın.
4. **KRİTİK (P05 anahtar insert): el "dikişli eldiven" gibi okunuyor (P05 f280, P09 f150).**
   - Kabul edilemez: P05'te el karenin yaklaşık %40'ı ve mekanizma anının öznesi. Eldiven okuması "kim, ne giymiş?" sorusu açar, dikkati şeritten alır.
   - Neden (`GravurEl.tsx`):
     - Tüm kontura paralel, eşit genişlikte taralı bant (dikiş izi).
     - Bilekte boğum hizasından geçen taralı yay (eldiven ağzı/dikiş).
     - Başparmak avuçtan ayrı yama gibi çizilmiş ve alt kenarda düz kesiliyor.
   - Düzeltme:
     - Bant yalnız gölge tarafında olsun, içe doğru incelsin, konturu izlemesin.
     - Boğum yayı kalksın.
     - El tek silüet yol olsun (başparmak avuçtan çıksın).
     - Kontur gölge tarafında kalın, ışık tarafında ince olsun.
5. **Orta: P10 f330 yakın el başparmağı.** Başparmak yaklaşık 115 px uzunlukta ve dik; kâğıdın önünde "mandal" gibi duruyor. Neden: `GravurEl` başparmak uzunluğu ve açısı (okuyan pozu). Düzeltme: Başparmak ×0.7, kâğıt kenarına doğru 30° yatık.

Küçük (bu turda zorunlu değil):
- P09: Kuyruk yelpazesi hâlâ yukarıdan görünüyor, yandan görünen gövdeyle çelişiyor. El kuşu taşımıyor, yanında duruyor.
- P05 f280: Parmak gölgesi kamera kutusunun dik ön yüzüne taşıyor (x 590–640, y 650–780).
- P10 f200: Sol duvarda (x 35–45, y 1065–1090) küçük açık dikdörtgen var; 1870 için elektrik anahtarı gibi okunabilir. İp kancasıysa kancaya benzetilsin.
- P05 f0: Kuş ile sayfalar terazide dengede. Anlatım "aynı ağırlık" demiyorsa terazi kuş tarafına eğilmeli. Senarist/araştırmacıya soru.

## Toplu düzeltme turu (sahibi · parametre, önem sırasıyla)
1. motion · `LanternOda.tsx`: bez ölçüsü sabit, yalnız görüntü büyüsün (KRİTİK 1).
2. motion · `LanternOda.tsx` memur-3 baş dolgusu/katman sırası + perdeye baş gölgesi; ya da yönetmen · `bolum.json` P10 memur-3 x'i huzme dışına (KRİTİK 2).
3. motion · `DagronInsert.tsx`: el gölgesi el dönüşümüne bağlansın, sabit ışık ofseti (KRİTİK 3).
4. tasarımcı tarifi → motion · `GravurEl.tsx`: kontur bandı, boğum yayı, başparmak yaması (KRİTİK 4). Ardından P05 f280, P09 f150, P10 f330 yeniden render.
5. motion · `GravurEl` okuyan pozu: başparmak uzunluğu ve açısı.
6. Küçükler: P09 kuyruk görünümü, P05 gölge taşması, P10 duvar dikdörtgeni, P05 f0 terazi dengesi sorusu.

Yeniden kontrol: P05 şeridi f264–358, P10 şeridi f150–200, P05 f280, P10 f200/f330 (360). Uzun tarama gerekmez.
