# Eleştiri — Harita turu kalibrasyonu (KE-PK-H1…H5) + M1/M2 · 2026-11-14 · elestirmen

**Karar: DÜZELTMEYLE GEÇER · puan 6.5** (Harita dili ve sebep-sonuç iskeleti doğru kurulmuş. Üç okunurluk kusuru var, biri anlamı bozuyor.)

## Sorulara cevap
1. **Gravür dili:** Kısmen aynı dilde. Halka maviği, mürekkep siyahı ve siluetler filmin paletinde. Kâğıt dokusu, vinyet ve Fransa taraması da "belge" katmanı olarak tutarlı; P01/P03'ün düz afiş yüzeyinden ayrışmaları bilinçli bir insert dili olarak kabul edilebilir. Dört paris-cevre planı ve iki fransa planı kendi içinde tutarlı. Sorun değil.
2. **P02 dokunuşu (halka kapanır → tel kopar):** Halkanın kapanması 360'ta okunuyor (f120 boşluk → f132 kapalı). Tel kopması da okunuyor. Ama kopan uçlar 180° J kıvrımına giriyor ve **baston / şemsiye sapı** gibi okunuyor (P02 f140, f250). Sebep-sonuç bu yüzden "tel koptu" yerine "haritada iki baston" diye okunuyor. Son işaretin oturması (f132) ile kopma (f138) arası 6 kare; telefonda baskı anı ayrı okunmuyor.
3. **Mekanizmalar:**
   - **P03B:** Rüzgâr çizgileri ve geri ok 360'ta kıl inceliğinde. Balon ikonu ≈12 px, yazı yığını ≈25 px. "Balon geri dönmez" fikrini görüntü değil, ekran yazısı taşıyor. Zayıf ama ekran yazısı yetiyor.
   - **P04A:** f60'ta kuş sol kenarda ≈15 px, kümes merkezde ≈12 px. "Kuş evine döner" görüntüde okunmuyor.
   - **P08:** İniş okunmuyor. Sönmüş balon ikonu f78–90'da beyaz yarıklı bir **göz/mercek lekesi** (f84 tam boyda ≈56 px, 360'ta ≈19 px). Gizli segment noktalı çizgisi f164'te okunuyor.
   - **P11A:** 3 çizgi merkeze varıyor, 9 çizgi halkanın dışında duruyor. Ayrım 360'ta zayıf: duran uçlar saç teli gibi. Durma anında kuş ikonu "mürekkebe gömülüyor", yani fiziksel olarak düşmeden yok oluyor (fade kuralına sınırda). Yığın f150'de okunuyor.
4. **M2 kapandı.** Şerit f200–260'ta el halatta, dirsek dışarıda, gövde dik, ekleme kopma yok. **M1 kısmen kapandı.** P10 f240'ta zarf ve kol okunuyor. Memur-3'ün başı ve gövdesi koltuk sırtlarına ve duvara karışıyor; figür "insan" olarak ayrışmıyor.
5. **Fade, fizik, güvenli alan, kırmızı:**
   - Kırmızı yalnız yazı katmanında; dekorda %0.
   - Güvenli alan ihlali yok. P08 iniş noktası (≈954,645) sağ kenara yakın ama IG sütununun üstünde.
   - Fade: tek sınır vakası P11 kuş "emilmesi" (bkz. düzeltme 3).
   - Fizik: P06b tırmanışında f228–236 diz baş hizasına kalkıyor. Mümkün ama siluet bir kütleye dönüşüyor (küçük).

## Teşhis + en çok 3 düzeltme (önem sırasıyla)
1. **Tel uçları "baston" okunuyor.** P02, P03B, P04A ve P11A'da her karede ekranda. **Kritik (anlam).**
   - Sahibi: motion.
   - Neden: kopma kıvrımı θ0 70° sönümle 180°'ye varıyor; dış serbest uç ≈220 px; iç uç Cité'ye uzanan düz hatla birleşip uzun bir sap oluşturuyor.
   - Parametre önerisi:
     - `tel.kopma.theta0` 70° → ≤20°, kıvrım yok.
     - Serbest uç ≤80 px.
     - İki uç arasında ≥60 px açık boşluk, uçlar 2–3 kısa tel lifiyle (çatallı) bitsin.
     - İç hattın Cité'ye giden kısmı kısalsın ya da sur kapısında bitsin.
   - Tasarım ayrıntısı: son işaretin teli bastırması 6 → 12 kare tutulsun (oturma f132, kopma f144; P02 temas zamanı da kayar → yönetmen `temaslar.json`).
2. **P08 iniş okunmuyor (dokunuş).** **Kritik (okunurluk).**
   - Sahibi: motion + yönetmen.
   - Neden: balon/sepet ikonu 56 dekor px; kamera f60–100 arasında Fransa geneli kadrajında.
   - Parametre önerisi:
     - Yönetmen: `kamera` f56–100 arasında iniş noktasına push-in (cs ≥2.2). İkon ekranda ≥110 px olsun (≥%5.5; dokunuş eşiği için yakın plan).
     - Motion: sönmüş balon biçimi "göz" değil, yere yatmış sepet + yana yayılmış buruşuk kumaş (asimetrik, beyaz yarık yok). `balon_ikon.olcek` ≥2.
3. **Kuşlar görünmüyor (P04A dönüş, P11A dönemeyenler).** **Orta.**
   - Sahibi: motion.
   - Neden: kuş ikonu 44 px (360'ta ≈15), kümes ikonu ≈36 px. P11'de dönemeyen kuş "emiliyor".
   - Parametre önerisi:
     - Kuş ikonu ≥90 px, kümes ≥72 px.
     - P11 dönemeyen kuş: çizgi ucunda yan yatmış kuş ikonu olarak **kalır** (fiziksel düşüş, yok olma yok).
     - Varan 3 kuş kümes ikonuna oturur. Böylece 9'a 3 ayrımı görüntüde sayılır.

## 3 sınırının dışında (anlam/doğruluk riski — orkestra karar versin)
- **Siluetlerin konumu:** Siluetler 40 adet, bant r 200–395. Yani **surun dışında**, forlar ile Prusya halkası arasında duruyorlar ve dışa dönükler. "1.998.374 insan" Parisliler; koyu, yüzsüz ve halka boyunca dizili siluetler kuşatan asker gibi okunabiliyor.
  - Öneri (mekân sorumlusu + yönetmen): `kalabalik.bant_r` sur içine alınsın; merkezde yalnız kümes ve yığın için küçük bir boşluk bırakılsın.
  - Ya da bant yerinde kalır ve siluetler içe (Paris'e) döner.
  - Tur-17'deki "40 siluet" varsayılanı sayıyla ilgili; konum orada tartışılmamış.

## Küçükler
- **Tel yönü:** Tel KB'ye gidiyor, Tours ise GB'de (§5H.2: 53.6° sol-aşağı). Tel "Tours'la bağ" anlamı taşıyorsa yön tutarsız. Mekân sorumlusu doğrulasın (Paris'ten KB'ye giden hat da olabilir; araştırmada yön yok).
- **P02 f250:** Dış tel kıvrımı başlık kutusunun altına giriyor (kutu kenarı x≈100, y≈150 @360). Düzeltme 1 çözer.
- **P02 f250 kontrol karesi:** Kalabalık yalnız batı yarıda. "1.998.374" yazısıyla doluluk henüz tam değil. Kontrol karesi f300'e kaysın ya da dolum f205–260'a sıkışsın (yönetmen).
- **P03B:** Rüzgâr çizgisi ve geri ok kalınlığı ≥4 px. Balon ikonu ≥70 px (motion).
- **M1:** Memur-3'ün başına ve kasket kenarına lantern tarafından soğuk kenar ışığı, ya da palto `#3d414c` → `#4a505c` (motion). Zarf zaten okunuyor; düşük öncelik.
- **P06b f228–236:** Bacak, kol ve gövde tek koyu kütle. Diz yüksekliği biraz düşsün ya da bacakta açık kontur olsun (motion, küçük).
- **P08 f84:** Üst %25 boş parşömen. Yazı bandı orayı dolduruyor, kabul.

## Dinleme notu (kurgucuya)
P02 temas f132 → f144'e kayarsa `temaslar.json` mutlak karesi ve foley hizası güncellenmeli.
