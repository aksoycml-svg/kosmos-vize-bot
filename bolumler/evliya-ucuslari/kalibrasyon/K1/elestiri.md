# K1 kalibrasyon eleştirisi: SARAYBURNU `kiyi` gece (P05 p78, P06 p76)
Eleştirmen (opus) · 2026-11-08 · değerlendirilen: `*_oneri_*` + eleştirmenin ek render'ları (oneri-props, kod değişmedi): P05 p0/p30/p78(1080 tam)/p110/p204, P06 p0/p50/p100/p215/p290.

## KARAR: **KALDI**
Kalibrasyon karelerinin (p78/p76) dekor iskeleti (ufuk 720, rıhtım/deniz katmanları, demet 5 tüp + 3 bağ, meşale havuzu, gölge yönü) doğru yolda. Ama bu dil sonraki şablonlara taşınacağı için şu sistemik sorunlar şimdi düzeltilmeli: imza rengi sarıkta tekrar ediyor, köşk cami gibi okunuyor, kompars kostümü Batılı ve "çift görüntü" veriyor, gece mavisi kaybolmuş. Bunun yanında ilk, temas ve kapanış karelerinde KRİTİK fizik ve süreklilik hataları var: fitil uçan demete gerili ip gibi bağlı kalıyor, meşale alevi Lagâri'nin yüzüne biniyor, P05→P06 eşleşen kesmede Lagâri demetten ayrılıyor, demet suyun üstünde köşesinin üstünde dikiliyor. Ham ve öneri arasındaki seçimde **öneri** daha iyi (P06 ham kullanılamaz), ama öneri de geçmiyor.

Not: "tam" kareler 540x960 (scale 0.5). Protokol tam boy (1080) ister; p78'i 1080'de yeniden render ettim (öneri tam ile ortalama fark ~1/255, aynı kare).

---

## Bulgular (önem sırasıyla)

### KRİTİK
**K1. Fitil uçan demete gerili ip gibi bağlı kalıyor.** P05 p204 (eleştirmen render'ı): demet suyun üstünde, kızaktan rıhtıma (≈x 430, y 1500) uzanan düz koyu bir çizgi var. Fitil yanıp tükenmesi gereken bir şey. Kalkıştan sonra elastik ip gibi geriliyor. Kural: fizik (hiçbir şey imkânsız biçimde bağlı kalmaz), hareket tamamlanır. **Motion:** fitil p56'da tükenir (yanan kısım `#2a2420`, ağızda biter). Kalkıştan sonra fitil demete değil zemine aittir: rıhtımda kalan kısa kömürleşmiş parça olur.

**K2. Meşale alevi Lagâri'nin yüzünü ve demeti örtüyor.** P05 p110: alev Lagâri'nin yüzünün üstünde (ekran ≈x 470–540, y 560–660). P05 p204: alev uçan demetin ve Lagâri'nin üstüne biniyor. P05 p0: alev Lagâri'nin kucağının önünde. Kural: okunabilirlik (dokunuşun ve ana eylemin üstüne bir şey binmez), fizik (yakın meşale ile uzak demet ekranda çakışıyor, derinlik okunmuyor). **Motion + yönetmen:** meşale yolu Lagâri ve demet koridorundan (ekran x 400–700) uzak tutulur. P05 p56'dan sonra Y1 meşaleyi geri/aşağı çeker (sıçrama ile birlikte; alev x ≤ 330, y ≥ 900). P06'da alev x ≤ 330 kalır.

**K3. P05→P06 eşleşen kesmede süreklilik kopuyor.**
- P05 p198–210: demet havada, ne püskürme var ne duman (`puskurme.bit 198`). P06 p0'da püskürme yeniden yanıyor. Ateş sönüp yeniden yanıyormuş gibi okunur.
- P06 p0: Lagâri y 520'de, demet y 1020'de. Lagâri demetten ≈300 px yukarıda, havada kendi başına oturuyor (`bagli` yok). P05 son karesinde ise demetin üstündeydi.
- Bu yüzden EV-D2'nin mekanizması kırılıyor: "aynı hareket hem demeti bırakmak hem kanatları açmak". Bırakılacak demet zaten adamın altında değil.
- P06 p0'da 0.62 ölçekli (uzak) demetin alev konisi yakındaki rıhtım döşemesine kadar iniyor. Derinlik çelişkisi.
- Kural: süreklilik (konum ve durum planlar arası tutarlı), dokunuş mekanizması.
- **Yönetmen (json) + motion:** P05 `puskurme.bit` = 210 (kesmeye kadar). P06 p0–46'da Lagâri `bagli {prop: demet, bit: 46}` olur. Alev konisi demetle aynı ölçeği alır.

**K4. P05 kalkışında ölçek küçülmesi yükselişi siliyor.** Motion önerisi `olcek 1→0.62` iken y yalnız 1330→1020 değişiyor. Ufuk–ölçek gereği bu, demetin **deniz yüzeyi boyunca uzaklaşması** olarak okunuyor. p204'te demet suyun üstünde duruyor gibi; "göğe fırlatıyor" görüntüde yok. Stilize yükseklik kullanıcı onaylı, ama bu kurgu stilizasyonu da iptal ediyor. P06 ölçekleri (0.62→0.43) kendi içinde tutarlı (iniş y 1180 ≈ 0.45), fakat iki sonucu var:
- (a) Lagâri iniş noktasında köşkten ≈10 kat büyük. Köşk 17 px/m'de, Lagâri ≈175 px/m'de, yani rıhtımdan yalnız birkaç metre ötede. Senaryodaki "köşkün önünde denize iniyor" görüntüde yalan olur. P06 p290'da Lagâri köşkün yanında dev bir figür.
- (b) P06'nın kapanışındaki "basamağa tutunur" için kadrajda basamak yok.
- Kural: ufuk–ölçek, doğruluk (senaryo cümlesi ↔ görüntü), kural 1 (senaryo → parametre).
- **Yönetmen, mekân sorumlusuyla:** tek ve tutarlı bir yol önerisi var.
  - P05: demet dik yükselir (`olcek` ≥ 0.9), tilt onu izler.
  - P06 p0–46: Lagâri ile demet birlikte yüksekte durur, sonra bırakır.
  - Boş demet yakın suya düşer (ölçek ≈0.9, sıçraması okunur).
  - Lagâri köşke doğru süzülürken küçülür (0.9→≈0.25).
  - p150–288 arasında kamera köşke push-in yapar (cs 1→≈2.5, köşk merkezli). Böylece iniş köşk su çizgisinde (y≈770) okunur boyda olur.
  - Katalog sınırı yetmezse `kit_eksik`.

**K5. İmza rengi sarıkta tekrar ediyor.** P05 p78'de Lagâri sarığı render'da `#bbac8b`, imzaya ΔE76 **12.0** (sınır 15; tasarim §2.4 sarığı adıyla yasaklar). Paletteki `#d9cfb6` (ΔE 20) amber ışık altında imza bandına kayıyor. `renk-olcum.md`'deki "kostüm ≥ 21.8" değeri paletten hesaplanmış, render'dan ölçülmemiş. Sarık doğrudan demetin üstünde durduğu için demetin rengi tekilliğini kaybediyor. Ayrıca bölge dışındaki imza örnekleri (1605) demetin içindekilerden (1374) fazla. **Tasarımcı:** sarık tonunu soğuk krem/gri yönüne çeker (b\* düşer, ör. `#d6d3c6` civarı). Hedef: **render'da** amber ışık altında ΔE76 ≥ 15. **Motion:** `renk_olcum.py` imza taramasını render üzerinden kostüm parçası başına raporlar.

**K6. P06 kapanış tarafı kurulmamış ve görüntü fiziksel olarak yanlış.** Bilinen eksik, ama kullanıcıya gidemez:
- p100–300: boş demet suyun üstünde 40° eğik, **köşesinin üstünde dikiliyor**. Batmıyor, yüzmüyor, halka ve buhar yok.
- p215: Lagâri oturur pozda su yüzeyinde dik duruyor.
- p290: Lagâri kanatsız, suyun 0.3–0.5 m üstünde havada oturuyor. Kanat iz bırakmadan **yok olmuş** ("nesneler fade/yok olma ile gitmez" ve kullanıcının "kanat suda kalır" kararı ihlal).
- Temas sesleri su-dump p100, su-sap p215 ve su-yatma p236 için görünür temas yok (halka, sıçrama).
- **Motion:** E3 halka/buhar/sıçrama, `suda` kanat, `yuz`, `kanat-birak`, `islak` kurulmadan P06 kalibrasyonu kapanmaz. Demet suya değince yatar, %50 batık yüzer, ±3 px salınır.

### ORTA (sistemik, sonraki şablonlara yayılır)
**O1. Köşk 360 px'te küçük bir cami gibi okunuyor.** P05/P06 telefon karesinde (≈x 245–310, y 178–240) kubbe ile onu iki yanda çevreleyen iki ince, sivri uçlu kule birlikte "kubbe + minare" silueti veriyor. Mekanlar §0.7 bunu yasaklıyor. Arkadaki iki baca öndekilerin arkasına düştüğü için 4 değil 2 kule görünüyor. Kubbe temiz bir küre dilimi; kartın istediği "piramit-kubbe arası nötr" biçim değil. **Mekân sorumlusu → motion:**
- Bacalar daha kalın ve kısa olur (oran ≤ 1:2.5 görünür).
- Üstte **düz, dışa taşan geniş başlık** olur; sivri piramit kapak kalkar.
- Arka bacalar ≥ 10 px yana kaydırılır, dört baca da görünür.
- Örtü kenarları düzleştirilir (piramit yönü), yükseklik/genişlik 0.33 korunur.
- Cevap, motion'ın sorusuna: **evet, minare gibi okunuyor.**

**O2. Kompars kostümü Batılı okunuyor.** Y1/Y2'nin kostümünde devrik yaka/klapa, kemerli diz boyu palto ve dar, düz pantolon bacak var. 360 px'te "trençkot/19. yy. Avrupa ceketi" okunuyor (P05 p78 ekran x 60–330, y 760–1300). 17. yy. cepken/entari yakasızdır, önü kavuşur; şalvar bolluğu bacakta görünmüyor. Kural: dönem doğruluğu, kostüm dili (§3.0). **Tasarımcı (çizim kuralı) → motion (`osmanli-kisa`):**
- Klapa yerine yakasız, önü çapraz kavuşan yaka.
- Kuşak sargı olur, kemer bandı olmaz.
- Diz altında bol şalvar ve paçada büzgü.

**O3. Kompars üstünde tüm yüzeye yatay tarama var.** Y1/Y2 entari ve kollarının tamamı yatay çizgili. Telefonda **çizgili kumaş deseni** okunuyor (kanıtsız desen). Kural: "tarama ışığın biçimi anlattığı yerde; geniş yüzeyde değil", gravür telefonda okunur. Lagâri'de yok, yani iki karakter farklı dilde çizilmiş. **Motion:** kompars kumaşı düz 2 tonla çizilir. Tarama yalnız gölge tarafındaki dar terminatör bandında olur.

**O4. Kompars "ikiz/çift görüntü" ve yüzsüz yumurta yüz sorunu.**
- P06 p76'da (ekran x 20–200, y 830–1530) Y2, Y1'in ≈60 px gerisinde, aynı boy, aynı baş ve aynı duruşla duruyor. Telefonda hayalet/çift pozlama gibi okunuyor.
- Yüzsüz baş meşaleye dönük, tamamen aydınlık düz ten bir yumurta: "yüzü silinmiş insan" ürkütücülüğü (tasarim §3.6'nın kaçınmak istediği şey).
- Şartnamenin kendisi çelişkili: "meşaleye 3/4 dönük + yüz kendi gölgesinde" fiziksel olarak mümkün değil.
- P05 p78'de takkesi uçmuş Y1'in saçı "kulaklık" biçiminde okunuyor (tepe bandı + yan blok).
- Kural: kompars ayrışır, okunabilirlik.
- **Tasarımcı:** kompars **sırtı ya da arka 3/4'ü kameraya dönük** durur, olaya (demete/denize) bakar; yüz sorunu böylece doğal olarak ortadan kalkar. Y1–Y2 arası ≥ 1 gövde genişliği olur, boy ve duruş farkı (Y2 0.9 ve geride) eklenir. Entari tonları ayrışır (şu an `#6a5a48` ↔ `#5a5448` çok yakın).
- **Motion:** takkesiz baş için kısa saç kütlesi çizilir, şerit ya da blok değil.

**O5. Gece mavisi kaybolmuş, gece gri okunuyor.** Kroma (C\*) ölçümü:

| Yüzey | Ölçülen C\* | Hedef C\* |
|---|---|---|
| gök | 3.5 | 11.6 |
| deniz | 0.8 | 7.7 |
| rıhtım | 2.3 | 3.9 |

`renk-olcum.md` "TAMAM" diyor, çünkü düşük kromada ΔH° anlamsız ve L\* tutuyor. "Soğuk lapis ↔ amber" kontrastı (kıyının duygusal amacı) yok. Kural: renk denetimi ton dahil, derecelendirme paleti aynılaştırmaz. **Motion (ArsivKatmani gece doygunluk/siyah noktası) + mekân sorumlusu (hedef):** gök ve deniz C\* ≥ hedefin %70'i olur. **Betik:** `renk_olcum.py`'ye C\* oranı kontrolü eklenir.

**O6. Açık kanat yarasa/ejderha kanadı gibi okunuyor.** P06 p50/p76: arka kenardaki üç oyuk sivri tırnaklarla bitiyor ve uç da sivri; telefonda kesinlikle yarasa. Kural: §4.2 "kartal fikrine işaret". **Tasarımcı → motion:** arka kenardaki oyuklar sığ ve sürekli dalga olur, tırnak/sivri köşe kalmaz. "Kartal" işareti uçtaki 3 kısa, yuvarlak uçlu ayrık parmak (yarıklı kanat ucu) ile verilir; arka kenar boyunca değil. Cevap: **evet, yarasa okunuyor.**

**O7. Katlı kanat tahta/sörf tahtası gibi okunuyor.** P05 p78 ekran x 320–450, y 310–1000. Motion'ın 100 birimlik eni dar bir levha veriyor. Ayrıca alt ucu oturağın altına, ayak dayama hizasına kadar iniyor; şartnamede "dize kadar". **Sapma kabul edilmez.** **Tasarımcı → motion:** en ≈140–160 birim olur; iki kat ayrı ton ve kenar kalınlığıyla görünür; alt kenarda açık biçimin oyuklarından **birinin** yumuşak izi kalır (katlı kanat olduğu okunur); alt uç diz hizasında biter. Y1'i örtme sorunu konumla çözülür (kanat Lagâri'nin sağ arkasına kayar), enle değil.

**O8. Sarık biçimi bere gibi okunuyor.** Yarım küre, alt kenarı düz; başın üstünde yüksek oturuyor; altından saç ve kulak üstü görünüyor; çizgiler yatay ve paralel. 360 px'te "örgü bere / aşçı" okunuyor, 17. yy. İstanbul sarığı değil. **Tasarımcı → motion:**
- Sarık daha geniş (baş ≈1.4×), hafif basık küre olur.
- Alına ve kulak üstüne iner, alt kenarı kafaya oturur.
- Sargı çizgileri küre yüzeyini izleyen eğriler olur, uçları sargı katmanında birbirine kaydırılır.
- Renk K5'e göre değişir.

**O9. Meşale sapı fazla uzun.** p78'de alev tepesinden sap ucuna ≈670 px, yani 406 px/m'de 1.65 m. Şartname 1.1 m sap + 0.18 m baş = 1.28 m ≈ 520 px. **Taşıma pozu kabul**, uzunluk değil. **Motion.**

**O10. EV-D1'in karakter yarısı kontrol karesinde görünmüyor.** p78'de (dokunuş p56–134, `sicra` p58–90) Y1 yalnız ≈110 px sola kayıyor; geri sıçrama ve "kol yüzde" jesti yok. Başlık uçuyor ama yardımcının korkusu okunmuyor. Kural: kural 1 (senaryo/dokunuş → parametre), okunabilirlik. **Motion:** `sicra` jesti, p66–90'da ön kolu yüze kaldırır, gövdeye `lean −12` ve iki ayakla küçük bir geri adım ekler (ayaklar her karede zeminde). Meşale bu sırada geri/aşağı gider (K2).

**O11. Lagâri `tutun` pozunda değil.** p78'de ön el dizde, arka el oturakta; şartnamede ön el yan tüpün sicim bağını kavrıyor (§3.2, P04 "tutunuyor" kurulumu → P06 bırakma karşılığı). **Motion.**

**O12. Güvenli alan ihlali:** P06 p76'da Y1 ayağı y 1530, yani alt 420 px'in içinde. Sahne planında kabul edilmiş olması kuralı askıya almaz ("ayaklar güvenli alan içinde kalır"). **Yönetmen:** Y1 y 1290 olur (ufuk–ölçekle ölçek ≈0.93) ya da P06 cy ≤ 170.

### KÜÇÜK
- **S1.** Sarık üstünde saydam disk (P05 p78 sol kenarı, p110 tepesi): duman ya da hale katmanı sarığın önüne sızıyor, dikey bir kesik çizgi de görünüyor. Katman sırası ya da maske hatası. **Motion.**
- **S2.** Köşk penceresinin halesi (r≈40) sert kenarlı, düz bir daire. Telefonda cephede "saat/ay" gibi okunuyor. Hale küçülür ya da yalnız pencere altına basık havuz olur. **Mekân sorumlusu.**
- **S3.** P05 p78'de duman kaynağından kopuk: alev ile duman tabanı arasında ≈90 px boşluk var. Duman kenarı tırtıklı değil, yumuşak daire (tasarım §5 E1 "kenar tırtıklı"). p110'daki büyük bulut p204'e kadar tümüyle yok oluyor. Duman zemine/tabana bağlanır, kalkıştan sonra iz olarak kalır ve dağılır. **Motion.**
- **S4.** Oturak tahtası görünmüyor; Lagâri tüplerin yuvarlak tepesine oturmuş gibi. **Motion.**
- **S5.** P06 p76'da Lagâri'nin başı ve kanadın tepesi (y ≈300–340) üst yazı bandında (240–400). O anda yazı yok (p208'de başlıyor), ama yazı zamanı kayarsa çakışır. **Yönetmen** kayıt düşer.
- **S6.** Kontrol paketi: "tam" kareler scale 0.5; kontrol_ek kareleri (P05 p110, P06 p215/p286) render edilmemiş. Protokol ilk, temas ve kapanış karelerini ister; bu turun kritik bulgularının hepsi bu karelerden çıktı. **Motion/teknisyen.**

---

## Motion'ın sorularına kısa cevaplar
| Soru | Cevap |
|---|---|
| 4 baca minare gibi mi? | **Evet** (O1). İki görünen sivri kule ve kubbe birlikte cami silueti veriyor. |
| Açık kanadın 3 oyuğu yarasa gibi mi? | **Evet** (O6). |
| Katlı kanat tahta gibi mi? | **Evet** (O7). |
| Sarık dönem/İstanbul okunuyor mu? | **Hayır**, bere okunuyor; rengi de imza bandında (O8, K5). |
| Yüzsüz baş | Ürkütücü yumurta ve "kulaklık" saç; sırt/arka 3/4 önerildi (O4). |
| Ten ↔ imza (ΔE 10.8) | Telefonda biçim olarak demetle karışmıyor; yüz demet sanılmaz. Ama sarık ve yüzle birlikte imza tonu demetin dışında demetten daha çok alan kaplıyor. Kural ten için açık değil. **Öneri (tasarımcı kararı):** ten muaf sayılmaz, render'da ΔE76 ≥ 15 hedeflenir. Kompars teni `#a8745a` yönüne (ΔE 23) çekilir. Lagâri teni pembe/koyu yöne kaydırılır (ör. `#c08468` ΔE 20; Hezarfen `#c99872` ile esmerlik sırası korunarak). Lagâri yanağı render'da şu an ΔE **8.6**. |
| Ayak dayama 0.333 m | **Kabul.** Ölçü iddiası değil, rig açılarıyla tutarlı; ayak dayamaya basıyor. tasarim §2.2 güncellenir. |
| Katlı kanat eni 100 | **Red** (O7). |
| Meşale taşıma pozu | **Poz kabul.** Sap uzunluğu (O9) ve yolu (K2) red. |
| P06 öneri ölçekleri 0.62→0.43 | Geometri tutarlı, ama "köşkün önünde iniş" ile çelişiyor ve P05'in 1→0.62 küçülmesiyle birlikte yükselişi siliyor. **Bu hâliyle red** (K4); yönetmen yolu yeniden kurar. |
| P05/P06 Y2 x 112 | Kabul, ama yetersiz: ikiz okunuyor (O4). |

## Sonraki şablonlara taşınacak dersler
1. **İmza tonu render'da ölçülür, paletten değil.** Amber/güneş ışığı açık krem ve ten tonlarını imza bandına çeker. Ölçüm kostüm parçası başına yapılır.
2. **Renk ölçümünde kroma da oranlanır.** Düşük kromada ΔH ve L\* "TAMAM" der, ama gece griye döner.
3. **Siluet testi 360 px'te "bu ne?" sorusuyla yapılır:** baca → minare, kanat oyuğu → yarasa, katlı kanat → tahta, sarık → bere. Her imza silueti için yasak benzerlik yazılır ve kontrol edilir.
4. **Kompars kameraya yüzsüz bakmaz.** Sırtı ya da arka 3/4'ü dönük, olaya bakar. İki kompars aynı poz ve aynı ölçekte üst üste konmaz.
5. **Kostümde Batılı kalıp yok:** klapa, kemer bandı, dar pantolon. Osmanlı kostümü yakasız, kavuşan önlü, kuşaklı, şalvarlıdır.
6. **Tarama giysi yüzeyine yayılmaz.** Kumaşta tarama desen gibi okunur.
7. **Kontrol paketi ilk, temas ve kapanış karelerini içerir** (eşleşen kesmenin iki tarafı dahil). Bu turdaki kritiklerin tümü kontrol karesi dışındaki karelerden çıktı.
8. **Derinlikle küçülme yükselişi siler.** "Yükseliyor" denen nesne ufuk–ölçekte uzaklaşıyor gibi okunuyorsa ölçek sabit tutulur, kamera izler.
9. **Bağlı nesneler (fitil, ip, kayış) kopma/tükenme anını tanımlar.** Hiçbiri kalkan nesneyle gerilip uzamaz.
10. **Yakın el prop'u (meşale) ana eylem koridoruna girmez:** ekranda yakın-uzak çakışması derinliği bozar.
