# P12 f96 · SALON `konser` · kalibrasyon tur-4 (son tur) eleştirisi (eleştirmen, 2026-11-16)

Bakılan: tur-4 `p12-f96.png`, `-360.png`, `paris-yaninda.jpg`, `olcum.md`; tur-3 `olcum.md`; Paris `hedef-ozet.jpg`, `tam-render-3/genel-tr.jpg`. 2× kırpım: davul, Eliasberg, ön seyirci, sağ üst hale.

## Puan: **7 / 10 — şablon kabul**
Paris'in yanına konunca geri kalmıyor. Bunu sağlayan beş şey var:
- net mürekkep konturu,
- mavi-lacivert gölge ile şeftali arka ışığın sıcak–soğuk karşıtlığı,
- ön plandan arka duvara 6–7 okunur katman,
- seyirci başlarında kenar ışığı,
- davulda telefonda okunan çubuk V'si.

Tur-2'deki gri ve flu "karton" his gitti. Puanı 7'de tutan, karenin üst üçte biri: hale ve tavan lekeleri hâlâ gri.

## Tur-2 düzeltmeleri
| | Durum | Kanıt |
|---|---|---|
| D1 doygunluk | **kısmen** | Palet doygunlaştı, zeytin-griler gitti. Arka duvar C* 22.4 (Paris 22.1). Kare medyanı 15.8. |
| D2 hale / tavan lekesi / kemer | **kaldı** | Hale bölgesi C* 12.3, tavan lekesi C* 8.4 (iki opak elips). Arka duvar havuzunun eş merkezli yayları hâlâ büyük kemerli pencere okutuyor. |
| D3 orkestra kenarı | geçti | Tek kontur, mavi aile. Yer yer kopuk mürekkep parçası var (davulun solu), küçük. |
| D4 sütun / Korint | geçti | Gövdede tarama 0. Başlık sade blok: Korint okunmuyor ama yanlış dönem de okutmuyor (nötr, LOD). |
| D5 dalga davulda | geçti | Push-in f40–96. Davul ø 45 px, çubuk V'si 360 px'te net. Kasnak için `lint okunurluk_cubuk_P12` izinli, yeniden açılmadı. |

Küçükler:
- Toz 360 px'te yine zor seçiliyor.
- Topuz başlarda halka okuması sürüyor (ön sıra, x 320 y 1500).
- Eliasberg'in kolu omuz köşesinden yatay bant gibi çıkıyor: sınırda geçer.

## C* / p95 tutmazlığı puanı düşürür mü? **Hayır, ama tek yerde düşürür.**
- **C* 15.8 < 18:** eksik ölçüm hatası değil, yerel. Koyu mürekkep pikselleri çıkarılınca (L*>25) medyan 16.6, Paris 22.1. Fark bütünüyle **üst üçte birden** geliyor: hale 12.3, tavan lekesi 8.4. Orta ve alt üçte bir Paris ile eşit (arka 22.4) ya da bilinçli koyu (koltuk 14.5, bordo, kırmızı yasağı). Gözle karenin ana gövdesi Paris yanında kabul edilebilir. Üst gri cep görünür ama puanı 7'nin altına çekmiyor.
- **p95 77.8 < 85:** 85 tasarım hedefi. Kanal ölçütü (GORSEL-RECETE A8) ≥75 ve karşılanıyor. Arka duvar havuzu ve sütun ışık yüzleri Paris'in güneş diski kadar parlak okunuyor. Puanı düşürmez.

## Kalan 3 düzeltme (sonraki SALON planlarında; önem sırasıyla)

**1. Üst üçte birdeki gri cep** (motion `Salon.tsx` `AvizeHale`, `Tavan`)
- Hale screen rengi `#cf9a66 → #e0a070` (daha doygun), α .40/.20 kalır.
- Tavan lekesi opaklığı `.8/.85 → .35/.45`, rengi `LG.tavanLeke`. Ya da lekeler tümden kaldırılıp kaset kirişinin alt kenarına `LG.kenarLamba` kenar ışığı konur.
- Hedef: hale ve tavan bölgesi C* ≥18, kare medyanı ≥18.

**2. Arka duvar havuzu kemerli pencere okutuyor** (motion `ArkaDuvar` havuz elipsleri)
- `ry` çarpanı `.78 → .5`.
- Elips merkezi saçaklığın (h 10) altına: üst yay korniş arkasında kalsın, görünen kenar yatay bant gibi okusun.
- Şartname "kemer çizilmez" diyor.

**3. Seyirci başı ayrıntıları** (motion `Seyirci`)
- `topuz` dairesinde `stroke` kaldırılsın, `r .24 → .18`, tip oranı %20 → %8.
- `kel` tipindeki ense saç bandının konturu `ink(sac)` yerine `LG.tenGolge`; bant "kafa bandı" okutmasın.
- Alt kenarda kadrajla kesilen tek baş tepesi (x ~760, y ~1900) çıkarılsın (`SIRALAR` son sıra z 2.5 → koltuk yalnız).
