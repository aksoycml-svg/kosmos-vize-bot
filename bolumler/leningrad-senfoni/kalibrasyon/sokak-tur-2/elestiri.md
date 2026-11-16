# SOKAK-LG P03a · tur-2 eleştirisi (elestirmen, 2026-11-16)
Bakılan: `p03a.png` (tam + 2× kırpım: baş 0–520×800–1320, eller 380–880×1080–1640), `p03a-360.png`, `hedef-yaninda.jpg`, Paris referansları, kod `SokakHedef.tsx`, `benmychree/Figur.tsx` (`BasProfil`), `GravurEl.tsx`.

## Puan: **4.5 / 10 — geçmez** (eşik 7)
Kamera, perspektif, ışık şeridi mantığı ve gök hedefe yakın. Figür ise hedefin ve Paris'in çok gerisinde: kol yerden çıkıyor, ekmeği tutan el yok. Paris'in yanında:
- **Cephe:** Paris cephelerinde sıcak taş, saçak taraması ve ışıklı pencere var. Buradaki cepheler gri pastel: sol cephe C* medyanı **2.4**, hedefte ≈ 10 ve okra/gül ışık.
- **Kar:** kar düz bir levha. L* aralığı **50–66**, hedefte 24–79 (iz, yığın, gölge oluğu).
- **Doku:** tarama yalnız paltoda. Kornişler ve yığınlar taramasız.

## KRİTİK (3 madde sınırının dışında)
**K1 · Fizik — sağ kol gövdeye bağlı değil, kadrajın altından yükselen bir boru.**
- Neden: `kolSag` yolu `M560,1560 … L640,1960 L520,1960Z`. Kol kadraj tabanından (y 1960) başlıyor, omuzla bağı yok. Kamera adamın sağ omzu üstünde (baş x ≈ 40–190), ama sağ kol ekranın ortasında yerden çıkıyor. `paltoD` sağa doğru x 840'a kadar açılan bir çan gibi; omuz çizgisi yok.
- Hedef:
  - Sağ omuz başlığı x ≈ 180–260, y ≈ 1230 (başın hemen sağ-altı; "Omuz" kuralı).
  - Üst kol öne kısalmış (foreshortened), dirsek x ≈ 420–480, y ≈ 1560 civarı.
  - Önkol öne ve yukarı, bilek x ≈ 690, y ≈ 1370.
  - Kol `konikKol(omuz, dirsek, bilek, [150,120,90])` + dirsek kıvrımları ile kurulsun.
  - `paltoD` sırt + omuz olsun; sağ kenar x ≤ 420'de kesilsin (adamın sırtı kadraj sol-altını doldurur).
- Sahibi: motion. Parametreler: `paltoD`, `kolSag`.

**K2 · El — ekmeği tutan el yok, yalnız bir "çubuk başparmak" var (lolipop okuması).**
- Neden: `GravurEl … katman="arka"` (avuç ve 4 parmak) ekmeğin tam arkasında kalıyor. `aci=-72` ve bilek ekmeğin alt-orta noktasında olduğu için ekranda yalnız `katman="on"` başparmağı görünüyor; manşetten dik çıkan bir çubuk gibi. Ekmek (170×200 px) eli bütünüyle örtüyor.
- Hedef (tutuş hedefteki gibi):
  - El ekmeğin **altında ve yanında** görünsün. Avuç ve 4 parmak ekmeğin alt-sağ kenarını sarsın, en az 3 parmak ucu ekmeğin önüne kıvrılsın. Başparmak ekmeğin üst yüzünde, yatık.
  - `aci` ≈ −20…−35 (el yatay ve öne).
  - Bilek ekmeğin sağ-alt köşesinin 60–80 px sağında ve altında.
  - E 180 → 220; ekmek eni ≤ 0.85 E (≈ 185 px).
  - Ekmek `katman` sırası: avuç → ekmek → parmak uçları ve başparmak. Parmaklar için `onMaske` / ayrı ön parmak katmanı. Kitte yoksa `kit_eksik: "GravurEl ön parmak katmanı"` yazılsın.
- Sahibi: motion (kit: `GravurEl`). Parametreler: `TUTUS`, `aci`, `bilek`, `E`, `ekmek` konumu.

**K3 · "Yüzde iç çizgi / favori" kuralı — profil yüzde dikey bıçak sınırı ve kulakta kutu favori.**
- Neden (`BasProfil`):
  - `isik="on"` ön düzlem bandı `yol([[0.24,-0.62],[0.225,…],[0.185,…]…])` alından çeneye dik bir sınırla yüzü ikiye bölüyor. Kural: "ışık–gölge sınırı yüzü dikey ikiye bölen bıçak çizgisi olmaz."
  - Favori yolu (satır 96) kulağın üstünde koyu üçgen bir takoz olarak duruyor: kara bir kama, saç yönünde biçim değil.
  - Boyun dikdörtgeni, üstünde 6 px dikey ışık çizgisiyle (satır 73) paltoya giren bir çubuk gibi okunuyor.
- Hedef:
  - Işık sınırı elmacıktan ağız köşesine kavisli gitsin (yüz hacmini izlesin); sınırda ton basamağı 2 olsun.
  - Favori kulağın önünde, kulak yüksekliğinin %60'ı kadar, alta doğru sivrilen saç yönlü bir şekil olsun.
  - Boyun ışık çizgisi kaldırılsın; yerine boyun yan yüzünde 2 basamaklı bir ton alanı.
  - Saç başa oturan düz bir kapak; alın ve ense çizgisi düzensiz tutamlı olsun.
  - Not: hedefte baş "kayıp profil" (yanak + kulak + ense, burun ucu ancak görünür). Bunu `BasProfil`'e dönme parametresi olarak eklemek kit işi; yoksa `kit_eksik`.
- Sahibi: motion (kit: `Figur.tsx BasProfil`). Parametreler: `isik="on"` bant yolu, favori yolu, boyun çizgisi.

## Düzeltme listesi (7'ye çıkarmak için, en çok 6)
**1 · Avuç (kırıntılı el) bozuk ve küçük.**
- Neden: `GravurEl` üstüne `scale(1 0.62)` uygulanmış. Eşit olmayan ölçek parmakları basıyor ve konturu inceltiyor. `avuc` pozunda parmaklar düz, tarak gibi. Kırıntılar 4 eşit koyu daire, ışıklı avuçta delik ya da düğme gibi okunuyor. El sol kola değil, paltonun ortasına iliştirilmiş.
- Hedef:
  - Eşit olmayan ölçek kaldırılsın; avucun yatıklığı `aci` + poz ile verilsin (kitte yoksa `kit_eksik: avuç perspektifi`).
  - Parmaklar hafif çanak: b 15–25°, serçe en kıvrık.
  - E 210 → 220.
  - Kırıntılar 8–12 düzensiz çokgen (r 2–6), `LH.ekmek` + ışık tarafında 1 px kenar. 2–3 tanesi avuç kenarından düşüyor (hareket şeridinde izlenecek).
  - Sol kol (`kolSol`) omuzdan gelsin (sol omuz kadraj dışında, sol alt).
- Sahibi: motion. Parametreler: `GravurEl` sarmalayıcı transform, `GRAVUR_POZ.avuc`, kırıntı dizisi.

**2 · Palto ve kayış: sırt bir çuval.**
- Neden: `paltoD` beş kuadratik eğriden oluşan tek bir kütle. Omuz dikişi, yaka hacmi ya da kol–gövde kıvrımı yok. Tek tarama bloğu ve bir kıvrım çizgisi var. Kayış (`M60,1190 L130,1205 L40,1960`) omuz kıvrımına basmıyor, düz bir şerit.
- Hedef:
  - Yaka kalkık ve yuvarlak, kalınlık 40–60 px; boynu sarsın, ensede ton basamağı olsun.
  - Omuz dikişi kavisli tek çizgi.
  - Sırtta kayışın bastığı yerde 2 çekme kıvrımı; koltuk altında 2–3 kıvrım.
  - Kayış omuz üstünde kumaşı içeri bastırarak 5–8° kırılsın; toka metalinde 1 ışık kenarı.
  - Işık şeridine bakan kenarlarda sıcak kenar, hedefteki gibi 3–4 px.
- Sahibi: motion. Parametreler: `paltoD`, kıvrım yolları, kayış yolu.

**3 · Cepheler soluk ve gri; ışık mimariyi anlatmıyor.**
- Neden:
  - `golge = karistir(boya, LH.golgeKarisim, 0.4)`: %40 gri-mor karışım okra ve gülü öldürüyor (sol cephe C* 2.4, ton 244°: yeşilimsi gri).
  - Işıklı bölge `isikH = 16.5` m'nin üstünde, kadrajda yalnız ince bir çatı bandı.
  - Pencere söveleri `#fff` %18 ile soluk; ışıklı ve karanlık pencere ayrımı yok (reçete B3).
  - Rustika çizgileri çok ince.
- Hedef:
  - Gölge karışımı 0.4 → 0.22 ve mor yerine `#5a4a78`; gölgede cephe C* ≥ 10, ton 20–60°.
  - Işık alan üst katlar `LH.cephe` tam doygunlukta, korniş üstünde 3 px sıcak kenar.
  - Korniş altına `Tarama` (B7, aralık 7.5–9).
  - Pencere: söve + sandrik (1. ve 2. katta), cam koyu `#2a2a4a`. Seed'li %8–12 pencerede sıcak lamba yok (karartma) ama kâğıt bant var; bant L* 70–80.
  - Bina yükseklik farkı ≥ 1 kat (şu an 19–21 m arası, ızgara gibi duruyor); %20 binada farklı kat adımı.
- Sahibi: motion. Parametreler: `Cephe` (`golge`, `isikH`, söve rengi), `binalar()` yükseklik aralığı.

**4 · Kar düz levha; derinlik ve iz yok.**
- Neden: `Zemin` tek `karGolge` dolgusu + 3 basamak şerit. İz 34 küçük elips; yığınlar ince tek sırt; tarama ve oluk yok.
- Hedef:
  - Ortada çiğnenmiş iki patika: 2 koyu oluk + kenar sırtı.
  - Yığınlarda 3–5 tümsek, gölge tarafında `Tarama` (aralık 9 → 7.5, yakına doğru).
  - Kızak izi iki paralel çizgi.
  - Ön planda (y > 1400) kar tanesi kümesi ve kaba doku.
  - Kar L* aralığı ≥ 35 olsun (şu an 16).
- Sahibi: motion. Parametre: `Zemin`.

**5 · Gök ve atmosfer.**
- Gökte y ≈ 236–241 arasında 5 px koyu boşluk çizgisi var.
  - Neden: RenkKaydi değil, geometri. `rect i=0` yüksekliği `ufuk-640` → bitiş `ufuk-660`; `i=1` başlangıcı `ufuk-655`.
  - Düzeltme: `height={ufuk-655+20+2}` (üst üste binsin).
- Güneş ışıması hedefte kaçış noktasında en parlak, buğulu bir koridor. Bizde 0.55 α tek disk.
  - Hedef: kaçış noktasında 2–3 eş merkezli disk (A3) + ufukta 3 buğu bandı (A5) + uzak cephelerin buğuya karışması `bugu(renk, D)`.
- Sahibi: motion. Parametreler: gök `rect` yüksekliği, ışıma diskleri, `Cephe` uzaklık buğusu.

**6 · Ekmek hikâyenin nesnesi; okunuyor ama "kızarmış tost" gibi.**
- Neden: dilim simetrik "tost" silüeti, kabuk `ekmekIc` 22 px düz şerit. 125 g kuşatma ekmeğinin sıkı, nemli, koyu ve kalıp köşeli kesiti okunmuyor.
- Hedef:
  - Kare kalıp ekmeği dilimi: düz üst, yuvarlatılmış köşe.
  - Kabuk ince (6–8 px) ve koyu `#3a2a20`; iç `#4e3a2c`.
  - Gözenek 25–35 küçük düzensiz nokta.
  - Işık tarafında kesik yüzde 1 basamak açık ton.
- Sahibi: motion. Parametre: `ekmek` dizisi ve iç doku.

## Reçete işaretleme
| Madde | Durum |
|---|---|
| A1 | ✓ Şerit/el koşulu tek kaynaktan. |
| A2 | ✓ Ama boşluk çizgisi var (madde 5). |
| A3 | ✗ Kaçış noktası ışıması zayıf. |
| A4 | ✓ |
| A5 | ✗ Buğu yok. |
| A6 | ✗ Uzak katman net. |
| A7 | ~ |
| A8 | ✓ Ama cephe C* düşük. |
| A9 | ✗ Korniş ve yığın taramasız. |
| A10 | ✓ |
| A11 | ✗ |
| A12 | ✓ |
| A13 | ✓ |
| B1 | ~ Yükseklik farkı az. |
| B2 | ~ Silme var, söve/sandrik zayıf. |
| B3 | ✗ Işıklı/karanlık ayrımı ve parıltı yok. |
| B4 | ✓ Düz çatı ve kar. |
| B7 | ✗ |
| B8 | ✓ |
| B9 | ~ Sabit kontur. |

## Ek sorular
- **(a)**
  - Ön plan öğesi: müzisyen ✓ (ama K1/K2).
  - Işık olayı: pembe şerit ✓.
  - Atmosfer: kar ✓, duman zayıf, buğu yok ✗.
- **(b)** Pan ve tilt sabit, steadicam ile 0.1 m ilerleme. "Açlıkta küçük bir lokma" duygusuna hizmet ediyor; süs değil. Ama hareket ancak el okunursa anlam taşır.
- **(c)** Müzisyenin bir yüzü var. Ancak yüz profil kesikli, bıçak sınırlı (K3). Onurlu, yorgun duruş henüz verilemiyor: baş öne eğik değil, omuz yok.
- **(d)** Anlatım bu turda yok, uygulanmaz.
