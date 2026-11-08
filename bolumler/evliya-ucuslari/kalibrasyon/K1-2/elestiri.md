# K1-2 eleştirisi: SARAYBURNU `kiyi` gece, ikinci tur
Eleştirmen (opus) · 2026-11-08 · İncelenen: K1-2 paketi (11 kare: tam, telefon ve güvenli alan; yan yana karşılaştırma; telefon sayfası; renk-olcum.md).
Ek olarak güncel kod + `bolum.json` ile 8 temas karesini kendim render ettim (yeni bundle, kod değiştirmeden): P05 p209 · P06 p46 / p100 / p215 / p220 / p226 / p236 / p286.

## KARAR: **KOŞULLU**
- **Şablon dili GEÇTİ:**
  - Gece kroması geri geldi.
  - İmza tekilliği sağlandı.
  - Köşk silueti artık köşk olarak okunuyor.
  - Sarık ve kompars kostümü dönemle uyumlu.
  - Tarama yalnız terminatör bandında.
  - Fitil, meşale ve süreklilik mekanizması kuruldu.
  - Bu dil K2'ye ve sonraki şablonlara taşınabilir.
- **P05/P06 plan düzeyinde 3 kritik ve 6 orta bulgu açık** (aşağıda). Bunlar kapanmadan P05/P06 kullanıcıya gitmez. Hiçbiri K2'yi (P07/P11 insert) bekletmez. K2'ye taşınan koşullar §4'te.

## 1. K1 bulgu tablosu
| ID | Konu | Durum | Not |
|---|---|---|---|
| K1 | Fitil gerili ip | **KAPANDI** | p56'da ağızda tükeniyor; rıhtımda kömür parçası kalıyor (p110, p204) |
| K2 | Meşale alevi Lagâri ve demet üstünde | **KAPANDI** (yeni sorun: Y4) | Alev artık koridor dışında, x ≤ 330 |
| K3 | P05→P06 süreklilik | **KISMEN** | Bağlı demet, püskürme ve başlık sürüyor ✓. **Duman sıçrıyor** (Y1) |
| K4 | Yükseliş ve iniş ölçeği | **KISMEN** | Dik yükseliş okunuyor ✓. **İniş ölçeği ≈5×** (Y2) |
| K5 | Sarık imza bandında | **KAPANDI** | Render'dan kendim ölçtüm: sarık `#ccccc0` ΔE76 27.7 |
| K6 | P06 kapanışı kurulmamış | **KISMEN** | Demet yatıp yüzüyor ✓, kanat suda ✓, halka ✓. **İniş sıçraması zayıf** (Y5), **basamak teması görünmüyor** (Y3) |
| O1 | Köşk = cami | **KAPANDI** | Kesik kırma çatı + küt bacalar; 360 px'te "sahil köşkü / ev" okunuyor |
| O2 | Batılı kompars kostümü | **KAPANDI** | Yakasız, kavuşan önlü entari, sarılı kuşak, bol şalvar |
| O3 | Kostümde tarama | **KAPANDI** | |
| O4 | Kompars ikiz / yumurta yüz | **KISMEN** | Ayrışma ve ton farkı ✓. **Baş "maskeli yüz" okunuyor** (Y6) |
| O5 | Gece kroması | **KAPANDI** | Kendi ölçümüm: gök C\* 11.0/11.6, deniz 7.1/7.7, rıhtım 4.1/3.9 |
| O6 | Açık kanat yarasa | **KAPANDI** (yeni sorun: Y7) | Artık yarasa değil; biçimi bez/eldiven gibi |
| O7 | Katlı kanat tahta | **AÇIK** (Y8) | |
| O8 | Sarık bere | **KAPANDI** | |
| O9 | Meşale sap boyu | **KAPANDI** | |
| O10 | Sıçrama ve kol yüze | **KAPANDI** | p78'de okunuyor |
| O11 | `tutun` | **KAPANDI** | Ön el üst sicim bağında |
| O12 | P06 ayak alt 420'de | **KAPANDI** | Ayaklar y ≤ 1485 (p0–p100) |
| S1–S4 | Sarıkta disk, hale, duman, oturak | **KAPANDI** | |
| S5 | Üst bant | Kayıt | P06 p76'da Lagâri y 500–940: üst bandın dışında ✓ |
| S6 | Kontrol paketi | **KAPANDI** | İlk, temas ve kapanış kareleri ile yan yana karşılaştırma pakette |

**Renk teyidi** (P05 p78 tam, 9×9 medyan, sRGB→Lab D65):
- Demet `#c6ab77` ΔE 1.1.
- Lagâri yanak/el ΔE 20.1–20.5; Y1 el 27.9; katlı kanat 37.4.
- İmza tonu: demet kutusunda 1763 örnek, dışında 76 (%4).
- Motion'ın tablosuyla tutarlı.

## 2. Açık ve yeni bulgular (önem sırasıyla)

### KRİTİK
**Y1. P05→P06 eşleşen kesmede duman sıçrıyor.**
- P05 p204–209'da sağ yarıyı kaplayan büyük bulut var; köşk görünmüyor.
- P06 p0'da bulut küçük, aşağıda ve başka yerde; köşk birden açılıyor (`P05p204_P06p0_yanyana.png`).
- Kesmenin iki yanında en büyük görsel kütle değişiyor. Kural: süreklilik.
- **Motion:** P06 p0 duman durumu P05 son karesinden devralınsın; duman kendi seed'i ve yaşıyla sürsün. Ya da iki planda aynı fonksiyon mutlak kareyle çağrılsın.

**Y2. P06 inişte Lagâri köşkten ≈5× büyük. Karar: RED.**
- p215–290'da sarık ≈75 px, köşk kemer ağzı ≈100 px (2.8 m). Sarık ≈2 m'lik bir kütle gibi okunuyor: "köşkün önünde dev bir baş".
- Push-in kadrajı bunu gizlemiyor, tersine yan yana koyuyor. Stilize yükseklik onayı yükseliş içindi; iniş ölçeğini kapsamıyor. Kural: ufuk–ölçek.
- **Yönetmen:** `olcek` ≈0.12–0.15 olsun (≤ 3×). Okunurluk ölçekle değil şunlarla sağlanır:
  - sarık karedeki en açık leke;
  - halka;
  - arkasında 2–3 kesik dalga izi (köşke doğru yön).
- Daha yakın kadraj için cs 2.5 / cx −735 katalog sınırını aşıyor (`kit_eksik`, yönetmen soru 8). **Orkestra kararı:** katalog cx sınırı ±750'ye genişletilsin. Benim önerim bu: tek seferlik bir şablon ayarı, günlük üretimde tekrar kullanılır.

**Y3. P06 p286'da basamak teması görünmüyor ama sesi var.**
- p286'da (temas `islak-el`, −12 dB) kadrajda basamak yok (≈11 px/basamak, telefonda okunmuyor) ve el görünmüyor.
- Kural: görünmeyen dokunuşun sesi olmaz; temas = ses.
- **Yönetmen:** P06'dan `islak-el` teması ve foley'i çıksın. Tutunma P07'nin ilk karesine taşınsın (insert zaten ıslak el + basamak; eşleşen kesme). P06 kapanışı Lagâri'nin köşke doğru yüzüş vuruşunun **sonunda** kesilsin (hareket tamamlanır). Basamak çizimi P06'da gerekmez.

### ORTA
**Y4. Meşale alevi kompars bacağına değiyor.**
- P05 p78 / p204 ve P06 p0 / p76'da baş aşağı tutulan meşalenin alevi Y2'nin entari eteği ve şalvarının üstünde (ekran x 165–240, y 1110–1380).
- Ateş giysiye değiyor; ayrıca meşale iki plan boyunca baş aşağı.
- **Yönetmen + motion:** p88'den sonra meşale dik tutulsun. Alev Y1'in dış yanında (x 330–380, y ≤ 1000) olsun; Y2'den ≥ 60 px, demet koridorundan (x ≥ 440) uzak. Fitile değme anı (p30) alçak kalabilir.

**Y5. Lagâri'nin iniş sıçraması `su-sap`ın (−4 dB, planın en yüksek foley'i) büyüklüğünü taşımıyor.**
- p215 temas karesinde yalnız halka var ve baş zaten suda. p220–226'da telefonda ≈10 px'lik birkaç damla.
- Kural: temas karede görünür; ses seviyesi ekran büyüklüğüyle orantılı.
- **Motion:** p215'te taç sıçrama (E3, 5–7 damla yayı, yükseklik ≈ baş boyunun 1.5×'i, 20 kare) olsun. Baş p215'te su yüzünde girsin, öncesinde değil.
- **Kurgucu:** sıçrama küçük kalırsa `su-sap` −8 dB'e insin.

**Y6. Yüzsüz kompars başı "maskeli / göz bantlı yüz" okunuyor.**
- Arka 3/4 başta saç kütlesi başın yalnız üst ≈%55'ini örtüyor. Altta çene konturlu ten oval kalıyor.
- 360 px'te iki yardımcı da "gözleri siyah bantla kapalı yüz" gibi okunuyor (P05 p78 x 95–330, y 690–830; P06 p76).
- **Motion (rig `pz.arka`):**
  - Saç enseye kadar insin (başın ≥ %80'i).
  - Kameraya dönük yanda kulak görünsün.
  - Ten yalnız ense ve kulak altında ince bir şerit olsun; çene konturu çizilmesin.
  - Takke arkadan basık kubbe olarak kalsın.

**Y7. Açık kanadın biçimi bez gibi.**
- P06 p50–p100'de kanat sabit genişlikte siyah bir dikdörtgen; uçtaki 3 yuvarlak parmak "eldiven / yırtık bayrak / pelerin" gibi okunuyor.
- Tasarım §4.2 "uzun, sivrilen yaprak; kök 0.22 × açıklık" diyor. Ayrıca yakın kanat Lagâri'nin yüzünün yarısını örtüyor (p76).
- **Motion:** genişlik kökten uca %60'a incelsin; arka kenar tek sığ kavisle kalsın; parmaklar kısa ve sivri-yuvarlak olsun (uzunluk ≤ kanat eninin %25'i, şimdi ≈%40). Yakın kanadın ön kenarı yüzün altından geçsin (omuz hizası).

**Y8. Katlı kanat hâlâ mezar taşı / sörf tahtası gibi. Karar: RED.**
- P05 p0–p204: yuvarlak tepeli, sabit genişlikte açık gri bir levha (L\* 44, gök L\* 13'ün önünde).
- Karede sarıktan sonraki en açık ve en büyük kütle; demetle yarışıyor. Alt ucu oturağın altına iniyor.
- Bu prop P01 A'nın (kanca karesi) ilk karesinde de olacak.
- **Tasarımcı → motion:**
  - Biçim katlanmış kuş kanadı silueti olsun: omuzda geniş, aşağı doğru sivrilen, alt ucu sivri, diz hizasında biten (ters damla / yaprak). Yuvarlak tepe yok; üst kenar omuz çizgisini izler.
  - Ton gölge yüzü `#4a4642` (L\* ≈30) + amber kenar 2 px. Işıklı yüz `#6e6a64` yalnız püskürme anında alttan ince bir şerit olarak görünsün.
  - **P01, P03 ve P04 kalibrasyonundan önce kapanmalı.**

**Y9. Push-in karelerinde boş demet "iskele" gibi okunuyor.**
- P06 p215–290'da ekran altında (y 1720–1920) kırpılmış, yatık demet var; dikey çıkıntılarıyla telefonda "iskele / çit" gibi duruyor. İmza nesnesi okunmuyor ve alt Instagram bandına düşüyor.
- **Yönetmen:** push-in sırasında demet kadrajdan tümüyle çıksın (cy ya da cx ile) ya da en az %60'ı görünür ve güvenli alan içinde kalsın. Ara durum olmasın.

### KÜÇÜK
- **Z1. P06 p290 güvenli alan betiği:** kadraj dışındaki öğeleri (y > 1920: yardımcı ayakları 2168/2112, demet teması 2352) "ihlal" sayıyor. **Motion/teknisyen:** kadraj dışı öğe "dışarıda" olarak raporlansın, ihlal sayılmasın; yalnız görünen kısım ölçülsün.
- **Z2. Başlık (takke) rıhtımda y ≈1490–1530:** P06 p76'da alt 420 sınırına biniyor. Başlık bir dokunuş nesnesi. **Yönetmen:** iniş y'si ≤ 1470.
- **Z3. Kanadın tonu P06 p40–58'de açık griden siyaha atlıyor:** katlı ışıklı yüzden açık alt yüze geçiş. Y8'deki gölge tonu bu sıçramayı da azaltır.
- **Z4. P06 push-in karelerinde üst üçte bir boş gök (y 400–640):** yazı bandı 240–400'ü dolduruyor. Kalan bölgeye şenlik dumanı bandı ya da uzak şenlik çizgisi kabul edilir. **Mekân** önerisi; zorunlu değil.

## 3. Motion'ın bıraktığı 4 noktaya kararlar
| Nokta | Karar |
|---|---|
| İnişte Lagâri ≈5× | **RED** (Y2). ≤ 3× ve sarık + halka + iz ile okunurluk; cx sınırı orkestra kararı |
| Boş demet stilize derinlik | **Düşüş (p46–100) KABUL**: okunuyor, suya değme görünüyor. **Push-in'deki "iskele" kalıntısı RED** (Y9) |
| Köşk basamağı ≈11 px | Okunmuyor; **basamak P06'dan çıkar**, tutunma P07'ye (Y3) |
| Katlı kanat panel | **RED** (Y8); P01/P03/P04'ten önce kapanır |

## 4. K2'ye (P07/P11 insert, gece/gün) taşınan koşullar
1. **Y3'ün karşılığı:** P07 ilk karesinde ıslak el basamağa değer ve `islak-el` foley'i tam o karede çalar. P06 son karesiyle konum ve yön eşleşir (el sağdan/alttan, ıslak çivit yen).
2. **Kroma denetimi gündüzde de yapılır** (P11): gün paleti C\* oranı ≥ %70. `geceLapis` benzeri derecelendirme kaybı gündüz modunda ölçülür.
3. **İmza tekilliği render'dan, parça başına ölçülür:** kese `#625646`, altın sikke `#c9a24a`, gün ışığında el tenleri (`entari-yen #d6a882`, `muhafiz #b08260`, `hezarfen #c99872`) imzaya ΔE76 ≥ 15 olmalı. Özellikle `#d6a882` ve `#c99872` gün ışığında sınıra yakın.
4. **Güvenli alan betiği** kadraj dışı öğeyi ihlal saymaz (Z1). Insert'te kese y 1355 ve sikke y 1440 alt sınıra yakın.
5. **Kontrol paketi** K1-2 biçiminde olur: ilk, temas ve kapanış kareleri; P07↔P11 ayna karşılaştırması yan yana.

## 5. Sonraki şablonlara taşınacak dersler (ek)
1. **Eşleşen kesmede parçacık/efekt durumu da devralınır** (duman, halka, buhar). Yalnız karakter ve prop değil.
2. **Ölçeği küçük okunmayan temas (basamak, el) o planda sesle yapılmaz.** Yakın plana ya da insert'e taşınır.
3. **Yüzsüz arka baş = saç ense dahil.** Ten oval çene konturuyla kalırsa "maskeli yüz" okunur.
4. **Açık-gri büyük düz prop gece sahnesinde ikinci odak olur.** Sırtta taşınan prop gölge tonunda çizilir.
