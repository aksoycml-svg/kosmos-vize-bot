# Blanc Kardeşler (Bölüm 1) — Storyboard v2 Görsel Tasarım Dosyası

Hazırlayan: tasarimci · 2026-11-06
Girdi: `senaryo-v2.md` (v2.1), `arastirma.md`, `storyboard-v2/dokunuslar.md` (yaratıcı yönetmen), `storyboard-v2/sahne-plani.md` (yönetmen), `karakter/*`, `src/theme.ts`, `src/rig/Kukla.tsx`, `src/bolumler/blanc/proto/Sokak.tsx`, `src/components/ChappeTower.tsx`, `Harita.tsx`, `final/araba-yesil.png`, `final/S06.png`.
Bu belge **tasarımdır, kod değildir.** Kod bloğundaki sabitler motion'a öneridir, hiçbir dosyaya yazılmadı.

Etiketler (her dönem iddiasının yanında):
- **[A]** `arastirma.md`'de kaynaklı.
- **[S]** senaryoda yazılı (kullanıcı onaylı; çoğu dramatizasyon).
- **[G]** Genel tarih bilgisi. `arastirma.md`'de yok; araştırmacı/eleştirmen doğrulamadan "kesin" sayılmaz. **[G ◐]** = daha az emin olduğum. Doğrulanana kadar görsel yumuşak tutulur (okunur metin yok, tek ayrıntıya bağlı dokunuş yok).
- **[T]** Tasarım kararı (tarihî iddia değil).

---

## 0. Genel kararlar

### 0.1 Kimlik ve renk disiplini
- Kanal kimliği: eskimiş kâğıt `#e9dfc9`, mürekkep `#1c1915`, mühür kırmızısı `#b3261e`, altın `#b8862b` (`C`, `theme.ts`). Dünya renkleri (ay mavisi, amber, alacakaranlık moru, Bordeaux altını) prototipte onaylı. Yeni her renk **~%15 desatüre, kâğıt tonuna doğru ısıtılmış** seçildi; her sahneye `FilmLook` (tane + vinyet) bindirilir.
- **Yeni renk gerekçesi (onay bekler):**
  1. `redLit #e5483c`: `C.red #b3261e` koyu zeminde (`#14120f`) kontrast ≈ 2.9:1, altyazıda yetersiz. Aynı tonun aydınlık hâli ≈ 4.5:1. Açık/kâğıt zeminde `C.red` kalır (≈ 4.9:1).
  2. `up #5f9f6e` (patina yeşili): yalnız P10 "yeşil ↑" için (senaryo gereği). Bakır oksit tonu, kimlik dışı parlak yeşil değil. Başka yerde kullanılmaz.
  3. `boyaKrem #e6c88c`: P22 "yay dolgusu" rengi. Yaratıcı yönetmen "krem", yönetmen "açık amber" dedi; ikisinin ortası, kâğıt kimliğine yakın.
  Yeni font yok. Fontlar: Playfair Display 900, Inter 500/800, IBM Plex Mono 500 (başka ağırlık/italik **yüklü değil**).
- **Kontur kuralı (her bölümde aynı çizgi kalınlığı):** karakter ve prop konturu = rig `SW = 2` (yerel birim, ölçekle büyür), renk `ink(fill)` (fill'in %55 koyusu), asla saf siyah değil. Dekor konturu ekranda 3 px (uzak) – 6 px (yakın). `strokeLinejoin="round"`.
- **Işık sözleşmesi:** Rig'deki kenar ışığı (`RIM #c4d6ff`) karakterin **baktığı yöndeki** kenara çizilir ve `facing` ile aynalanır. Bu yüzden karakter **ışık kaynağına doğru bakacak** şekilde yönlendirilir. Karşılıklı bakan iki karakterde bir kenar ışığı ters olur (Açık soru 8).
- **Ekran yönü:** P12–P13 kule zincirinde haber **soldan sağa** akar (Tours solda ufukta, sıradaki kule sağda). Bordeaux'da hat biter: Bordeaux kulesi **sağdaki uzak tepede** (yönetmen sahne planı, P06/P14); suç ortağı sağa (kuleye) bakar.
- **Güvenli alan:** 1080×1920; canlı alan x 80–1000, y 220–1500. Kilit anlar (çekmece, mühür, sürgü, tokmak) y ≤ 1500.
- **Kukla boyu:** şapka dahil ≈ 620 birim (François), 635 (Louis); ekranda yükseklik = 620 × scale. Oturma pozu: `thigh −88, knee 88, bodyY ≈ +105` (kalça sandalye hizası), masa/sandalye bacakları gizler (müdür P07).

### 0.2 "Yüz detayı yok" ile Kukla yüzü
Sanat yönetmeni kuralı "minimal siluet, yüz detayı yok" der. Onaylı prototip rig'i gözlü/kaşlı/ağızlı. Senaryo ise dudak senkronu (P04, P08, P17), kaş (P12), esneme (P13), göz kırpma (P04) ister. **Karar:**
- **Yüzlü (Kukla):** François, Louis, memur, müdür, ara-kule telgrafçısı, suç ortağı.
- **Yüzsüz siluet:** katip (küçük ölçek), yargıçlar, jüri, arabacı, kompars/kalabalık, jandarma. "Paris'teki adam" ve resmî görevli yalnız el/kol.
- **Siluet filtresi** (rig'e dokunmadan dışarıdan sarılır; rig'deki göz beyazı palette gizlenemediği için filtre şart):

```tsx
// <g filter="url(#siluet-uzak)"> <Kukla .../> </g>
// renk derinliğe göre: yakın #1c1a22, orta #2a2c3c, uzak #3a3c52 (gün sahnelerinde #5a4a3c / #7a6a58 / #9a8a74)
<filter id="siluet-uzak"><feColorMatrix type="matrix" values="0 0 0 0 0.227  0 0 0 0 0.235  0 0 0 0 0.322  0 0 0 1 0"/></filter>
```

### 0.3 Mekân – plan matrisi

| Mekân (ortak ad) | Yeni/Mevcut | Planlar | Işık varyantı |
|---|---|---|---|
| BORSA | yeni | P02 | gündüz altın |
| HARITA | mevcut (`Harita.tsx`) | P03, P05 | posta: gün-gece döngüsü / telgraf: sabit |
| SOKAK-BORDEAUX | `Sokak.tsx`'ten türer | P04 | gece ay + amber |
| TOURS-KULUBE-IC | yeni | P01, P07, P08, P10, P11, (P15 alt yarı) | A akşam-fener (P01, P10) · B gece-mum (P07, P08) · C gündüz-soğuk (P11, P15 alt) · **PARIS-MASA = P01 plakası (P23)** |
| KULE-DIS | yeni | P12, P13, P17 penceresi, P21 (**TOURS-KAPI**), P22 | KD-A Tours kapı gündüz (P21) · KD-B ara kule dış, gündüz (P12, P13) · KD-C alacakaranlık siluet (P17, P22) |
| PARIS-AVLU | yeni | P09 (+ P23 masa) | gündüz (P09) |
| CATI-BORDEAUX | yeni | P06 | şafak |
| CATI-KATI | yeni | P14, P15 üst yarı (**ALTIN-MASA**) | gündüz altın |
| YATAK-ODASI | yeni | P16, P17 | mum + soğuk mavi pencere |
| MAHKEME | yeni | P18, P19 | çapraz toz huzmesi (iki kamera yönü) |
| KANUN-INSERT | yeni | P20 | tepe açı, tek huzme |
| WIFI-MORF | yeni | P22 | alacakaranlık → ekran karanlığı |

### 0.4 Yönetmen / yaratıcı yönetmen belgeleriyle çakışmalar ve kararım
Üç belge aynı gün yazıldı; çakışan yerlerde tasarım şöyle çözüldü. Karar asıl sahibine (yönetmen/yaratıcı yönetmen/kullanıcı) aittir; **tasarım her iki seçeneği de destekleyecek şekilde çizilir**.

| Konu | Çakışma | Tasarım kararı |
|---|---|---|
| P06 | Yönetmen: saat insert + tüy saat camında. Yaratıcı yönetmen: tüy Louis'nin bordo koluna konar, saat sahne elemanı | Saat (savonnette) çizilir; kola konan tüy için bordo kol yüzeyi temiz bırakılır. Seçim yönetmen+yaratıcıda |
| P08 | Yönetmen: pencere kolu gıcırdar. Yaratıcı: kol yok, **el–gölge** (duvarda T gölge, %22) | Pencere A kolu hareketli çizilir **ve** masa arkasında duvarda boş "gölge alanı" bırakılır (bölüm 1.4) |
| P17 | Yönetmen: kule "klunk" ile dinlenmeye iner. Yaratıcı: kule statik, **kurutma kumu** | Kule iki durumda hazır (statik/iner); sağ alt: yazıcının siyah kollu eli + kum kabı |
| P18 | Saat çapı: yönetmen 160 px, yaratıcı ≥ 210 px (%11) | **≥ 210 px**, sarkaçlı saat (sarkaç görünür) |
| P19 | BERAAT: yönetmen "iner", yaratıcı "smash-cut, damga animasyonu yok" | Damga **belirir** (animasyonsuz), ALT-BANT, 170–180 px |
| P22 | Yay rengi: yaratıcı "krem", yönetmen "amber" | `boyaKrem #e6c88c` boya dolgusu, parıltı yok |
| P03 | Gün-ay diski: yönetmen sağ-üst, yaratıcı sol kenar | Disk 200 px, güvenli alanda; tarafı yönetmen/yaratıcı seçer (tasarım iki tarafta da boş tutar) |
| P09 | Manşet: tek **altın düğme** sağ manşette (yönetmen) | Bu kabul edildi; palet buna göre |
| P12–P13 telgrafçı | Yönetmen: kısa, tombul, kahve frak. Suç ortağı da kahve | **Zeytin yeşili** (kahve suç ortağında kalsın), kısa-tombul kabul. Yönetmen onaylamalı |
| Mahkeme | Yönetmen: jüri sıraları sol, siyah cübbe kollu yargıç | **Siyah cübbe** varsayılan, **jüri siluet sırası** sol; kırmızı cübbe yalnız araştırmacı doğrularsa |
| P15 | "Takvim bloğu / yaprak" (günlük kopan yaprak dönem için [G ◐]) | Yıl yaprağı çizilir; dönem riski Açık soru 5 |
| P12–P13 mekân | Yönetmen: **dıştan pencere görünümü** (kesit değil) | KD-B dış cephe + pencere olarak çizildi (önceki kesit fikri bırakıldı) |
| P23 | "PARIS-MASA" = P01 masa varyantı; paket **kapalı** biter | PARIS-MASA = P01 ile **aynı plaka**, paket kapalı, kol A'ya "klak" döner |

### 0.5 Oda zemin parametreleri (`Sokak.tsx zemin(z,u)` sözleşmesi)
Yönetmen karakter konumunu `z` (derinlik, 1 yakın … 7 uzak) ve `u` (0 sol … 1 sağ) ile verir. İç mekânlarda `zemin()` ile aynı formül, köşeler odaya göre: `y = yNear + (yFar − yNear)·sz(z)`, `x = lerp(xNear, xFar, sz(z))` (sol ve sağ ayrı), ölçek `s` aynı `sz(z)` ile `sNear → sFar` doğrusal.

| Mekân | yNear / sNear | yFar / sFar | x near (sol–sağ) | x far (sol–sağ) | Kaçış noktası |
|---|---|---|---|---|---|
| BORSA | 1700 / 1.15 | 980 / 0.50 | −100 – 1180 | 160 – 920 | (540, 880) |
| TOURS-KULUBE-IC | 1760 / 1.05 | 1400 / 0.80 | −60 – 1140 | 110 – 970 | (540, 700) |
| CATI-KATI | 1740 / 1.05 | 1250 / 0.60 | −60 – 1140 | 120 – 960 | (540, 880) |
| YATAK-ODASI | 1760 / 1.10 | 1380 / 0.85 | −60 – 1140 | 100 – 980 | (540, 900) |
| MAHKEME (alçak açı) | 1800 / 1.10 | 1220 / 0.45 | −100 – 1180 | 170 – 910 | (540, 1150) |
| PARIS-AVLU | 1780 / 1.05 | 1150 / 0.55 | −80 – 1160 | 150 – 930 | (540, 860) |
| CATI-BORDEAUX (teras) | 1760 / 1.20 | 1300 / 0.95 | −80 – 1160 | 200 – 880 | (540, 1000) |
| SOKAK-BORDEAUX | mevcut `zemin()` / `sokakGenislik()` | | | | bkz. 1.3 |

Not: Hiçbir iç mekân gerçek tek-nokta perspektif matematiği taşımaz; `Sokak.tsx` gibi yaklaşık ve katmanlı. Ayak ve baston ucu daima `zemin(z,u).y` değerine basar.

---

## 1. Mekân kartları

### 1.1 BORSA (P02) — Bordeaux Borsası, gündüz

**Amaç:** "Bordeaux'lu kardeşler... tahvile oynuyor." Kalabalığın ortasında iki kardeş, sıcak altın öğle.

**Dönem ve kaynak**
- Tahvil (%3 rente) ve Borsa [A]. Silindir şapkalı kalabalık [CLAUDE dönem listesi].
- Mimari: Bordeaux'nun 18. yy kireçtaşı (sarı-krem) neoklasik salon, yüksek kemerli pencereler, dama zemin [G]. **Hangi binada geçtiği araştırmada yok;** belirli bir iç mekân kopyalanmaz, "genel neoklasik borsa salonu".
- Fiyat tahtası: tebeşirle yazılan kara tahta [S dramatizasyon; Açık soru 11]. **Gerçek fiyat iddiası yok:** başlık **"PARIS · RENTE 3%"** (P02→P03 MATCH, yönetmen), altında iki satır yarı okunur rakam.
- Kalem: **kaz tüyü + hokka** [G]. Defter: ciltli, sütun çizgili.
- Tricolore: salon girişinin üstünde sarkık bayrak [CLAUDE].
- Kâğıt para yok; altın/gümüş frank, tahvil kâğıdı (okunur para görüntüsü verilmez).

**Katmanlar (arka → ön)**
1. **Arka:** üç yüksek kemerli pencere (sol tarafta ışık), **fiyat tahtası** x 300–780, y 400–760, altında tebeşir rafı. Tahta önünde **iki basamaklı ahşap estrad** (katip; **merdiveni arkada, kadraj sol-arka görünür**: yönetmen z 5.5, u 0.50). Duvar-zemin birleşimi y ≈ 980.
2. **Orta:** 10–12 siluet figür (silindir boyları farklı, 3 baston, 2 defter), 3 derinlik; yalnız **3 figür animasyonlu** (yönetmen R6), kalan statik siluet dizisi. Estradın iki yanında **boşluk** (tebeşir düşüşü görünür). François (z 2.2, u 0.40), **tüccar kompars** (kısa, kahverengi, z 2.2, u 0.24; François omzundan tutar), Louis (z 2.3, u 0.62).
3. **Ön:** sol altta sütun gövdesi, sağ altta bastonlu sırt siluetinin bulanık parçası, **yüksek pupitr** (Louis'nin defteri), ahşap korkuluk.

**Palet:** duvar taşı `#d8c49a` · taş gölgesi `#a58f68` · sütun vurgusu `#efe2bd` · zemin dama `#cbbd9c` / `#8b7b5c` · korkuluk `#5b3d25` · tahta `#1f2a26` · tebeşir `#f3eddc` · huzme `#ffd98f` α .18 · kalabalık siluetleri `#5a4a3c` (yakın) → `#9a8a74` (uzak).
**Işık:** güneş sol-üst (pencereler solda), huzmeler 30° sağ-aşağı; **gölgeler sağ-aşağı**, kısa. François/Louis ışığa bakar (`facing = -1`).
**Perspektif:** tablo 0.5 (BORSA). Dolly-in `cs 1.00 → 1.18, cy 0 → −60`.
**Türetme:** yeni arka plan (SVG); kalabalık = Kukla + siluet filtresi; `Efektler.tsx`: `Dust`, `Glow`, `FilmLook`.
**Motion notları**
- İsim etiketleri bölüm 4.3; yönetmen etiketi şapkanın ~80 px üstüne koyar (y ≈ 700–800).
- **Tebeşir (dokunuş, yaratıcı yönetmen):** katip sağ-alt köşede yazarken parça kırılır, tahtadan seker ve **tahtada beyaz toz çizgisi kalır**; parça estrada iki sekme, sonra zemin. Parça `#f3eddc`, 14×5 px. Üç temas = üç foley (çıt, tak, tak). Kalabalık tahtaya döner ve **donar**; Louis dönmez, yazmaya devam eder.
- Louis kaz tüyü ucu defter yüzeyine temas eder (cızırtı). Cebinden **beyaz eldiven köşesi** görünür (bölüm 2.2).
- Kalabalık kenardan girer/çıkar; duvardan geçmez.

---

### 1.2 HARITA (P03, P05) — mevcut, tasarım notları

**Kaynak:** `Harita.tsx` (gerçek Fransa GeoJSON, tarihî Paris→Chartres→Tours→Poitiers→Angoulême→Bordeaux yolu, T biçimli kule ikonu). Ara şehirler harita sadeliği için, etiket küçük; Tours düğümü işaretli (P07 kurulumu).
**Palet (koddan):** zemin `#1a120b` · mürekkep `#2b1d10` · parşömen görseli `parsomen.jpg` (~`#d9c49a`, Gemini üretimi) · kule parlaması `rgba(255,170,60)` · aktif kule kolu `#b3261e`.
**Işık/gölge:** düz harita; vinyet. Araba/mühür hafif sağ-aşağı gölge.
**Perspektif:** üstten ortografik; kamera tilt Paris→Bordeaux.
**Çizim ihtiyaçları**
- **Gün-ay diski (P03):** çap **200 px** (%10 kuralı), güvenli alanda (üst-bant altında, x 760–1000, y 340–560 yönetmen önerisi). Güneş `#e8b86a` → ay `#e9dfc9`, üç tur. Sayaç mono "1. GÜN · 2. GÜN · 3. GÜN" diskin altında. Harita her gece %35 kararır, arabanın küçük feneri yanar.
- **Posta arabası:** `final/araba-yesil.png` (kromakey yeşil). **At başı eğme (yaratıcı yönetmen, P03 kapanışı) için at başı ayrı katman olmalı:** görsel tek parça raster; ya at başı kesilip pivotla bağlanır ya da at vektör redraw edilir (motion kararı). Kenar sızıntısı temizlenmeli. **Dönem uyarısı:** kapıda "POSTES ROYALES" ve arma/taç var; 1830 sonrası eski rejim arması [G ◐]; küçük ölçekte okunmaz, P09'da sadeleştirilir (Açık soru 6).
- **Toz/sis tonu:** P03 sonundaki Bordeaux'a çöken toz (MATCH) = P04 sokak sisi. İkisi de `#8b93ad` (Sokak `Duman` rengi) α .22–.35 yumuşak daireler; aynı doku (yönetmen).
- **Mühür (P05):** kırmızı balmumu, çap **300 px** (%16), merkez (540, 880), taşan lekeler (`#b3261e`, iç gölge `#7a1914`, kenar parlak `#e5483c` α .5). **Baskı motifi: Chappe T kulesi** (arma riski yok; P21 ilanındaki mühürle **aynı tasarım**). P05→P06 MATCH: mühür dairesi = P06 doğan güneş diski (aynı nokta, aynı çap).
- **Kule ikonu:** T biçimli (regülatör yatay + iki kısa gösterge); **asla pervane gibi dönmez**, yalnız 45° adımlar. Kule klakları kısalan aralıklarla.
**Türetme:** doğrudan `Harita.tsx`. Motion notu: sinyal arabayı solladığında araba küçük ve yavaş kalır, toz yok (yaratıcı yönetmen).

---

### 1.3 SOKAK-BORDEAUX (P04)

**Karar:** Prototip sokağı Bordeaux'ya taşınır. Notre-Dame çıkar; sokak ucunda sis içinde Garonne gemi direkleri. Yürüyüş/fare/baston/şapka/göz kırpma aynen kalır.

**Dönem ve kaynak**
- Haussmann öncesi: dar sokak, farklı yükseklikte bitişik evler, panjur, baca kümeleri, ipe asılı **réverbère**, tricolore [CLAUDE]. Mevcut Sokak bunları uyguluyor (kontrol edildi). Bayrak sırası (gönderde mavi, beyaz, kırmızı) doğru.
- Bordeaux'ya özgü [G]: açık krem kireçtaşı cepheler; birinci kat demir balkon (mevcut `balkon demiri`); sokak ucu **Garonne rıhtımı** ve yelkenliler; çatılar arduvaz + **oluklu kiremit (tuile canal)** karışımı [G ◐].
- Dükkân adları: `VINS` (kalır, şarap şehri), `BOULANGERIE`, `CAFÉ`, `CHAPELIER` kalır; biri `TONNELIER` (fıçıcı) olabilir.
- Gemiler yalnız yelkenli; **buharlı gemi/baca dumanı yok** [G].

**Katmanlar**
1. **Gök (`katman="gok"`):** mevcut ay + yıldız + bulut.
2. **Uzak (`katman="uzak"`), değişen:** `Uzak` (Notre-Dame) kaldırılır, yerine **Garonne ufku**:
   - Sokak ucu açıklığı x 410–670, y 600–1130. Direk tabanı y ≈ 1100.
   - 4 direk x = 452, 512, 566, 628; üstler y = 760, 650, 720, 800; her direkte 2–3 seren (70–120 px), sarılı yelken ruloları, ince halat (1.5 px). En yüksek direk tepesinde amber fener (r 5 + blur 40 α .35).
   - Gövdeler y 1090–1130 koyu bant; rıhtım kenarı/su çizgisinde amber ışıltı.
   - **3 sis düzlemi** `#6e7aa6` α .35 (y 980–1130), α .25 (y 880–1000), direk önünde α .5 degrade. Uzak direkler açık, yakın olanlar koyu (`#20284a → #2c3358`). Sis tonu P03 tozuyla aynı (`#8b93ad`).
   - İki yan "ev ucu" silueti (`M 400 860…`) düz kalır.
3. **Orta (`katman="orta"`):** `SIVA` paleti Bordeaux'ya `["#7b7868","#867f6c","#706e72","#8a826f","#78766c","#74707a"]`; yarı ahşap oranı `0.35 → 0.15`; çatı varyantı %40 `tuile canal` (`#7a3f2c`, oluk çizgisi `#4a2418`), %60 arduvaz (`#2c3550`); dükkân adları.
**Palet (gece):** gök `#070b1f → #1b2852 → #40507e` · ay `#f2f0e6` · kenar ışığı `#c4d6ff` · amber `#ffb357 / #ff9a40 / #ffd98f` · panjur `#2f4a40 / #4a3328 / #33405a` · kaldırım `rgb(48–70)`.
**Işık:** ay üst-orta, mavi kenar; **réverbère amber** sokak ortasında (ön-yan dolgu). Gölgeler lambadan radyal, ışığın tersine.
**Perspektif (önemli):** `Sokak.tsx` gerçek tek nokta perspektif değil; `sz(z)` ile cephe köşelerini (SOL/SAĞ A-B-C-D) doğrusal harmanlar. Cephe tepe çizgileri y ≈ 838'de birleşir, zemin ufku y ≈ 977 (`z → ∞`), sokak ucu düzlemi `z = 7` ⇒ y = 1130, x 410–670. Kaçış bandı y 840–980.
**Türetme:** `Sokak.tsx` (motion: `uzak` prop'u, `SIVA` ve çatı varyantı parametre). P04 insert'i `FareInsert.tsx` (kaldırım hizası, ızgara; ızgara `z 2.2, u 0.58` yönetmen) aynen.
**Motion notları**
- Baston ucu zemin hizasında, taşa **gömülmez**; "tak" temas karesi olay listesinde.
- Direkler sisle birlikte 1–2 px yatay ortam hareketi.

---

### 1.4 TOURS-KULUBE-IC (P01, P07, P08, P10, P11, P15 alt)

**Amaç:** Hikâyenin kalbi: eldiven paketi (P01), rüşvet (P07–P08), şifre masası (P10), gizli çentik (P11).

**Dönem ve kaynak**
- Tours istasyonu, müdür + yardımcı [A]. Taş duvar, ahşap tavan kirişleri, küçük pencere, halat bobinleri, fıçı, raf. Referans `final/S06.png` (eski storyboard kompozisyonu) [T]. Tours/Loire bölgesi yapı taşı **tuffeau** [G].
- **Pencere dışındaki kule: tek direk + T kolu.** `S06.png` pencerede **kafes/pilon (elektrik direği) benzeri** kule gösteriyor: bu Chappe değil. Yeni çizimde direk **düz ahşap, tek mast**, kafes yok (yakalanan ihlal).
- **Yönetmen düzeni:** iki pencere. **A (direk penceresi):** arka duvar sağ, direk pencere dışında ~5 m. **B (önceki kule):** sol duvar, uzak tepe. **Regülatör** (minyatür T kollu) **pencere A tezgâhında**. Tüm kule istasyonlarında aynı düzen (P11, P12, P13).
- Kumanda düzeneği: küçük T modeli + demir kol + çentikli sektör [G]. Çentik sayısı iddia edilmez.
- Aydınlatma: **kare cam fener** (P01, P10; teneke, 4 cam yüz, mum içinde [G]; masaya pencere kafesli ışık deseni), **şamdanda mum** (P07, P08, P16).
- Para: altın/gümüş frank, kâğıt para yok.

**Düzen (orta plan, P07–P08; 1080×1920)**
- Duvar-zemin birleşimi y ≈ 1400. Sol arka **kapı** x 110–330, y 420–1400 (aralık; François gölgede). **Pencere B** sol duvar (perspektifle kısalmış), **pencere A** x 700–890, y 760–1100 (190×340 = %17.7; P08 yakın planda yönetmenin x 640–1000, y 420–960 kırpımına ölçeklenir). Sill ~0.9 m, memur pencere yanında başı pencere hizasında.
- Masa ön kenarı y ≈ 1500, üst düzlem y 1330–1500, x 260–960. Çekmeceler müdür tarafında (sağ), **çekmece ön yüzü masanın alt-ortasında, plan başında yarı açık** (P07 kurulumu).
- **P08 el–gölge alanı:** mum masa ortasında alçak; memurun arkasındaki duvar bölümü x 500–900, y 700–1250 **boş** (halat/askı yok). Elin gölgesi (T biçimli kol silueti, duvarda %22 = ~420 px) mumun tersine, yukarı-sağa düşer. Gölge çokgeni elden projeksiyonla türetilir.
- Sol duvarda halat bobinleri, sağda alet askısı, arka sağ köşede fıçı (el–gölge alanının dışında), rafta kutular.
- **Müdür sandalyede** (yönetmen): oturma pozu (bölüm 0.1) + ahşap sandalye; masa bacakları gizler.
- Ölçek ve konum tablo 0.5 (TOURS-KULUBE-IC).

**MASA-PLAKA (P01, P10, P23; tepe-önden yakın):** üst kısım duvar + **pencere A sağ-üstte** x 600–960, y 450–800 (360×350 = %18; kanca yazısının altı), masa üst düzlemi altta. Masada fener (sol), kahverengi paket kâğıdı (orta), eldiven. P10'da tepe 90° iki paket yan yana. **Aynı plaka P23'te yeniden kullanılır** (PARIS-MASA): aynı kamera, aynı fener/pencere/direk; fark yalnız eller (P01 memur eli çıplak ve titrek, P23 gri manşetli Paris elleri).

**Işık varyantları**
| Varyant | Planlar | Anahtar | Dolgu | Gölge yönü |
|---|---|---|---|---|
| A akşam-fener | P01, P10, P23 | fener amber `#ffb357`, masa solunda | pencereden mor `#3b2f5c` | **sağ-yukarı** + kare kafes desen |
| B gece-mum | P07, P08 | mum alttan `#ffcf70` | pencereden gece mavisi `#4a5f94` | **yukarı ve duvara** (alttan ışık) |
| C gündüz-soğuk | P11, P15 alt | pencereden soğuk gün `#cfdcff` | oda amber α .15 | pencerenin tersi: **sol-aşağı** |

**Palet:** duvar taşı `#5a5450` (karanlık) / `#8a8478` (ışıklı), harç `#3a3632`, kiriş `#3b2818`, masa `#7a5230` (üst yüzey `#a07848`), zemin `#2d2a2c`, pencere gece `#1a2033`, halat `#a07a48`, fıçı `#6a4a2c`, demir `#1c1915`, pirinç `#c9a24a`.
**Perspektif:** P07–P08 tek nokta kaçış (540, 700); P01/P10/P11 insert ortografik tepe-önden (hafif 8° eğim).
**Türetme:** yeni arka plan; pencere kulesi `ChappeTower.tsx` (bölüm 1.5); Kukla; `Glow`, `Dust`, `FilmLook`.
**Motion notları**
- **P01 (şak):** eldiven kâğıttan tamamen çıktığı karede direk kolu **A→B** konumuna oturur (tek gösterge bir adım), menteşe "klak". Kol pencere çerçevesi içinde kalır.
- **P07:** müdür altını masa kenarından açık çekmeceye süpürür; çekmece kapanır "bam". **İki kese** masada (ikincisi Louis'nin dirseğinde, P08'de memura kayar). Kese kayması + sikke şıngırtısı. Memur çekmece çarpınca **gözünü kırpar**.
- **P08:** memur sağ elini masaya bırakır, parmak ucu **üç kez** tıklar (kol çevirme alışkanlığı); mum alttan, duvarda T gölge. (Pencere kolu gıcırtısı yönetmen seçeneği: kol A'dan ~20° sapıp geri döner; tasarım iki seçeneği de çizer.)
- **P10 (tepe açı):** memur eli (çıplak) çorabı uçtan kaldırır; çorap sarkıp uzar (%30 ekran). Eldiven kımıldamaz. **Ok etiketleri** kâğıt kart + ip: ↑ yeşil, ↓ kırmızı (bölüm 3).
- **P11 insert:** kumanda kolunu **çıplak eller** tutar (eldivenli değil); fazladan çentik halosu = **ince kırmızı halka, çap ≈ 860 px, merkez (540, 950), 6 px, blur ≤ 6, 0.4 sn** (P11→P12 dürbün maskesiyle aynı merkez/çap, MATCH). Ter damlası çeneden sapa düşer (r ≈ 10 px). Pencere B'de uzak kule ≥ 100 px.
- **P15 alt yarı:** memur masa başında, elinde buruşuk beyaz eldiven (kurulum → P16), gri ceket sol göğüs cebinde eldiven köşesi, gözaltı koyu (`MEMUR_HASTA`).
- Kapı yalnız François için; kimse duvardan çıkmaz.

---

### 1.5 KULE-DIS (P12, P13, P17 penceresi, P21, P22)

**Amaç:** Chappe kulesi **imza nesne**; her mekânda tekrar eden motif (pencerede, ufukta, haritada, Wi-Fi morfunda).

**Kule modeli (ChappeTower'dan türeme)**
- Kaynak: `ChappeTower.tsx` (400×600 viewBox; direk 14×300; regülatör 280×16; göstergeler 12×90; hub `C.gold`). Yapı doğru: **T biçimi, tek direk, 3 kol**; yel değirmeni çağrışımı yok.
- Önerilen değişiklikler (motion, yeni bileşen `ChappeKule` ya da prop):
  1. `armColor` / `indColor` ayrı. **Varsayılan tüm kollar `#1c1915` (siyah)**; mevcut bileşendeki kırmızı göstergeler tarihî değil (kollar siyah boyalıydı [G ◐], Açık soru 12). Kırmızı yalnız fazladan çentik halosu, harita mührü ve ilan mührü.
  2. Kol yüzeyi **jaluzili (kepenkli) kanat** [G ◐]: 5 ince çizgi (α .25); karşı ağırlık; pivotlarda altın perçin.
  3. Direk dibine iki ahşap payanda (A-şekli).
  4. Bina: üçgen çatılı kutu yerine **piramit arduvaz çatılı taş kulübe** (S01 storyboard) + küçük pencere.
  5. Bina ayrı katman (sahne kırpabilsin).
- **Adlandırılmış kol konumları** (45° adımlı yedi konum [A: 7 konum]; açılar yaklaşık, motion eksene göre ince ayar). Yönetmen adları parantezde:

| Ad | Reg | Sol | Sağ | Kullanım |
|---|---|---|---|---|
| ILK (yönetmen "A") | 0 | 45 | −45 | P01 f0 ve **P23 son kare** |
| SAK ("B") | 0 | 90 | −45 | P01 "şak" sonrası, P07 |
| MESAJ-A | 0 | 90 | −90 | P11/P13 normal mesaj |
| HATA ("X") | 0 | 135 | −90 | **fazladan çentik**: MESAJ-A'dan tek gösterge +45° (P11, P12 POV, P13, P14) |
| DINLEN | 0 | 0 | 0 | P21 (kapı üstü), P22 başlangıç; P17 sonu (yönetmen seçeneği) |

**Varyantlar**
- **KD-A: TOURS-KAPI, gündüz (P21).** Cephe **tuffeau** `#e3dcc6`, gölge `#b5ad94`; çatı mavi arduvaz `#3c4660` [G ◐]; kapı ahşap `#5a3d28`, demir bantlı; pervaz `#c9c0a6`. Gök `#cfdcff → #f2e8c9`. Işık sol-üst, gölge sağ-aşağı.
  - **Geometri (yönetmen):** kapı x 320–760, y 700–1400 (440×700). **İlan** x 420–660, y 800–1100 (240×300, %16). Direk kapı üstünde x 380–700, y 330–700, kollar **DINLEN**. Sürgü insert'i kapı sağ kenarı, **~%14–25** (270+ px).
  - **İlan:** beyaz kâğıt `#efe9d8` [G ◐ resmî ilan beyaz kâğıt], üstte 24 px tricolore bandı (`#2a3f7e / #efe9d8 / #a8262c`), başlık bloğu, 2 sütun metin çizgisi (okunmaz, α .55), altta **kırmızı balmumu mühür** (P05'le aynı Chappe T baskısı). 4 köşe **kare başlı demir çivi**.
  - **Mandal (sürgü):** *düşen mandal*: yatay demir çubuk, sol ucu perçin pivot, çıkıntıya yaslı; çekiç titreşiminde 20° dönüp pervazdaki demir kancaya oturur ("klank"). İlanın hemen altında, el hizasında.
  - Görevli eli: siyah redingot kolu `#1c1915` + **beyaz manşet** `#efe9d8` (Paris gri manşetinden ayrışır), yüz yok; kadrajın sağ-altından girer/çıkar.
- **KD-B: ara kule, dıştan pencere görünümü, gündüz (P12 → P13).** Tours'tan sonraki ara kule görevlisi (bölüm 2.5).
  - Dış cephe: taş kulübe, **açık pencere** (casement, iç yüzde regülatör tezgâhı: **minyatür T + demir kol**), telgrafçı bel üstü pencere içinde (z 1.5, u 0.50). Çatıda **kendi direği** (P13'te üstte). Ufukta soldan **Tours kulesi** (uzak küçük T, MESAJ→HATA), sağda **sıradaki kule**.
  - Peyzaj: düz ova, tarla çizgileri, kavaklar. Kuleler 5–15 km arayla, her kulede iki dürbün [A].
  - Gök `#cfdcff → #f2e8c9`; ova `#9aa06a / #7d8a56`; taş `#c9c0a6` / gölge `#8a8478`; pencere içi `#3a342e`; ahşap `#7a5230`.
  - **P12 POV maskesi:** tek **daire** (merkez (540, 950), çap ≈ 860 px), pirinç halka 28 px, iç vinyet siyah. Tek tüp teleskop (lunette), çift gözlü (8 şekilli) maske **yok** [G]. POV'da Tours kulesi ≥ 300 px siluet, kollar HATA. Odak halkası "kırt".
  - **P12 aşırı yakın göz/kaş:** göz y 520–820, kaş yayı y 400–520 (yönetmen R7); arka plan düz bulanık gök + pirinç dürbün kenarı; `browF` +1.
  - **P13:** dürbünü indirir, omuz silker, kolu çevirir, esner; kamera geri çekilir (dış tarafta kalır, duvardan geçmez); kendi direği HATA'ya "klak"; ufuk kulesi 0.35 sn gecikmeyle kopyalar. `Birds` ≤ 3 (opsiyonel).
- **KD-C: alacakaranlık siluet (P17 penceresi, P22).** Gök `#1d1838 → #3b2f5c → #8a5a6e → #d98a5a`; kule `#1c1915`, tek kenarda amber kenar ışığı `#ffb357` α .5. **P17 penceresi:** yatak odasından uzak kule, ekranın ≥ %12'si (yönetmen x 640–960, y 300–620 = %17), kollar statik (yaratıcı) ya da sonunda DINLEN'e iner "klunk" (yönetmen).
**Türetme:** `ChappeTower.tsx`, `Efektler.tsx` `Clouds`, `Birds`.
**Motion notları:** kol hareketleri yalnız 45° adımlar + 6 karelik (60 fps) "klak" oturması; kollar **asla sürekli dönmez**. Her adımda menteşe foley'i.

---

### 1.6 PARIS-AVLU (P09 avlu) ve PARIS-MASA (P23)

**Dönem ve kaynak**
- Paris posta avlusu: taş avlu, **kemerli araba kapısı**, 2–3 katlı taş bina, arduvaz mansard çatı [G]. Tek konum iddiası yok; "bir posta avlusu" [S].
- Posta arabası: Harita'daki `araba-yesil.png` ile **aynı** (süreklilik): kahverengi üst gövde, krem alt gövde, "POSTES" levhası; arma sadeleştirilir (bkz. 1.2). Çatıda bagaj çıtası; **"TOURS" etiketi 380×110 px** (yönetmen), krem kâğıt etiket, Playfair 900 mürekkep.
- Paketler, posta çuvalları, ahşap tezgâh. Kâğıt para yok.
- Paris'te Chappe kulesi: Paris–Lille hattı Paris'ten başlar [A]; P23 plakasında pencerede kule var, **konum belirtilmez** (Açık soru 10).

**P09 avlu katmanları**
1. **Arka:** taş cephe + kemerli kapı (karanlık geçit), arduvaz çatı, baca, duvar dibinde çuvallar.
2. **Orta:** **posta arabası** yandan, sağda (z 2.2, u 0.62); atlar kadraj dışı. **Arabacı** kutuda (z 2.2, u 0.80), **sağ ayağı kutu korkuluğunda**; plan başından kadrajda (kurulum). Çatı bagaj çıtası eğimsiz.
3. **Ön:** **Paris adamı** (z 1.6, u 0.28), **başı kadrajın üstünde kesik, yüzü görünmez**: koyu redingot kolu, **gri manşet, sağ manşette tek altın düğme** (bölüm 2.8). Ön plan çuval/tezgâh.
**Palet:** taş `#b9ad92 / #8f8470`, arduvaz `#3c4660`, kaldırım `#6a6458 / #4a463e`, araba üst `#3a2a1c`, alt `#d9c9a0`, tekerlek `#3a2a1c` + jant `#c9a24a`, paket kâğıdı `#b08a5a`, ip `#d8c9a0`, çuval `#a89870`, etiket `#efe9d8`.
**Işık:** gündüz, güneş sol-üst; **gölge sağ-aşağı** (araba gölgesi zemine sağa). Hafif bulutlu, kontrast sert değil.
**Perspektif:** tablo 0.5 (PARIS-AVLU); kamera hafif alçak. Araba yan profil ortografik.
**Motion notları**
- Paket fırlatma: el soldan girer, parabol, **bagaj çatısına iner** ("huf" → "tok"), **eğimsiz çatıda x ekseninde kayar**, ön kenara varırken arabacı **topuğuyla** paketin köşesine basar ("tap"). Çizme paketin içinden geçmez, kutu korkuluğuna gömülmez. Çizme koyu deri `#2a1d14`, kenar `#7a5a3c`.
- Eller/adam kadraj kenarından girer/çıkar. P09→P10 MATCH: aynı kâğıt dokusu ve etiket.
**PARIS-MASA (P23):** **MASA-PLAKA** (bölüm 1.4) ile **birebir aynı**: aynı kamera `cs 1.00`, fener, pencere A, direk. Direk **HATA yerine ILK konumundan başlar** (P01 sonrası SAK), P23'te **ILK'e "klak"** döner (yönetmen: A konumu). Paket **kapalı** biter; döngü "kapat → aç" eşleşmesi. Eller: gri manşet + tek altın düğme. Katlama kâğıdı eldivenin beş parmağı **hafif kabartı** olarak görünür (yaratıcı yönetmen).

---

### 1.7 CATI-BORDEAUX (P06) — şafak, çatı terası

**Dönem ve kaynak**
- Bordeaux çatıları: arduvaz + oluklu kiremit, baca kümeleri [G ◐]. **Çinko oluklu yürüme sırtı** (düz ≈ 1.2 m teras, taş korkuluk): yönetmen. Ufukta Garonne hilali, sis, gemi direkleri (P04 ile tutarlı), isteğe **Pont de pierre (1822)** silüeti [G] (sis içinde çok küçük, konum iddiası değil).
- Çatı katı **dormer penceresi** (soldan 2., açık): P14 ile eşleşir (süreklilik). Ufukta **sağ tepede Chappe kule silueti** (kurulum → P14), yönetmen.
- Güvercin kafesi **hasır (osier)**; güvercin posta güvercini [A].
- Cep saati **savonnette**, bölüm 3.

**Katmanlar**
1. **Arka:** şafak gök (üst `#5c6a9a` → orta `#d89a8a` → ufuk `#f2b27a`). **Güneş diski ufukta, merkez (540, 880), çap ≈ 300 px** (P05 mührüyle MATCH; `#ffd9a0`). Garonne bandı, direkler, sağda uzak tepede kule siluet `#5a5a70` α .7.
2. **Orta:** çatı manzarası (kiremit `#9a5a3c` / arduvaz `#3c4660`), bacalar `#8a7a6a` (tuğla uç `#8a5a42`), dormer penceresi soldan 2.
3. **Ön:** taş korkuluk, çinko teras, Louis (z 2.0, u 0.45), **kafes** korkuluk üstünde (z 2.3, u 0.62, sağda).
**Palet:** kiremit `#9a5a3c`, gölge `#6a3a28`, korkuluk `#c4b08a` / gölge `#7a6a52`, çinko `#8a8f98`, hasır `#a07a48`, güvercin gri-beyaz `#dfe2ea` + kanat çubuğu `#4a5062` + boyun `#6a8f86`, tüy `#cfd3dc`.
**Işık:** **kontrajur.** Güneş Louis'nin arkasında ufukta; Louis siluetinin çevresinde sıcak kenar ışığı (`#ffb357`); gölgeler **kameraya doğru uzun**. Louis ışığa değil güneşe karşı duruyor: kenar ışığı bu planda **elle çizilen overlay** (rig `RIM` yönü `facing` ile geldiği için `rim` bayrağı gerekir, Açık soru 8).
**Perspektif:** tablo 0.5 (teras); kamera hafif aşağıdan, ufuk y ≈ 1000.
**Türetme:** yeni arka plan; çatı kiremit/arduvaz desenleri `Sokak.tsx` çatı kısmından; Kukla; `Birds` tek güvercin için özelleştirilir.
**Motion notları**
- Kafes kapağı açılır (tahta "tak"), güvercin çıkar, kanat çırparak **kadrajın sağ-üstünden çıkar** (yönetmen); fade yok. **Tek tüy** kopar. Yaratıcı yönetmen: tüy **Louis'nin bordo koluna** konar, Louis fiske atar (kol insert %20, tüy ≥ %10). Yönetmen: tüy saat camına konar (saat insert %20, ≥ 384 px). Tasarım ikisini de çizer (saat + bordo kol).
- Louis **bastonu sol ön koluna asmış:** `Kukla.cane` yalnız elde tutar; asılı poz için baston kol üzerinde yatay (`cane ≈ −80`) ya da korkuluğa dayalı çizilir.
- Cebinden beyaz eldiven köşesi görünür (süreklilik).

---

### 1.8 CATI-KATI (P14, P15 üst yarı = ALTIN-MASA) — Bordeaux çatı katı, gündüz

**Karar:** P14 dürbün **maskesiz** (kullanıcı kararı). Görsel **tek tüplü pirinç teleskop**, "dürbün" anlatımda kalır (yönetmen madde 10).

**Dönem ve kaynak**
- Çatı katı (mansarde): eğik tavan, açık kirişler, **dormer penceresi** ve panjur [G]. Pencere dışı: Bordeaux çatıları, **sağ uzak tepede kule** [A: suç ortağı kuleyi izler; kulenin Bordeaux'daki yeri araştırmada yok].
- Teleskop **pervaza dayanır** (yönetmen; sehpa yok). **Pervaz kalın ahşap, üstünde onlarca eski çentik** (yaratıcı yönetmen kurulumu: plan başından görünür); suç ortağı **çakıyla** bir çentik daha atar. Çentikler **beşli gruplar** (okunur sayma işareti).
- Masa: defter, hokka, kaz tüyü, cep saati; **altın ve gümüş frank yığınları** (P15 üst yarı), kadeh ve Bordeaux şarap şişesi (François'nın kadehi).

**Katmanlar (yönetmen koordinatları)**
1. **Arka (pencere duvarı):** dormer penceresi x 380–900, y 380–1000 (içeriden); dışarıda çatılar ve **sağ-uzak kule** (≥ 230 px = %12; HATA konumu; netleşince kol çizgisi keskin).
2. **Orta:** suç ortağı (Kukla, `facing = +1`, kuleye/ışığa bakar; z 1.5, u 0.30, sırtı yarı kameraya) pencerenin solunda eğilmiş; teleskop pervazda. **Louis arka planda masa başında** (z 3.0, u 0.78, bulanık, gri şapkası masada, baston masaya dayalı).
3. **Ön:** ön plan kiriş (üst çerçeve), köşede sandık/çuval, yer tahtaları.
**P15 üst yarı:** ahşap kiriş ayraç **y 948–972**; üst y 220–948: Louis'nin defteri (x 120–520, y 700–900), altın yığını (x 380–620, y 780–930), François'nın kadeh tutan eli (x 640–900, y 560–800), sağ-üst takvim (x 700–960, y 330–600; yaprak 220×240).
**Palet:** kiriş `#3b2818 / #5b3d25`, sıva `#b9ad92 / #8f8470`, zemin `#7a5230`, pencere dışı gök `#cfdcff → #f2e8c9`, çatılar `#9a5a3c / #3c4660`, uzak kule `#5a5a70` (netleşince `#1c1915`), pirinç `#c9a24a / #f1d48a / #7a5a1f`, pervaz `#6a4a2c` (çentik iç `#2a1c10`).
**Işık:** güneş pencereden, içeri uzun ışık yamuğu, **gölgeler sola-aşağı** (ışık sağdan-ön, pencere sağ-merkezde). Suç ortağı pencereye bakar → kenar ışığı doğru taraf.
**Perspektif:** tablo 0.5 (CATI-KATI); eğik tavan çizgileri sağa yükselir.
**Türetme:** yeni arka plan; Kukla `SUC_ORTAGI` (kasket, bölüm 2.6); kule `ChappeKule`.
**Motion notları**
- **Odak (yönetmen):** tüm kadraj odak yakın (omuz/teleskop net, kule bulanık) → **kule net, ön plan bulanık, 1 sn** → odak Louis'ye. R4: `blur` swangle'da yavaş, iki keskin/bulanık katman sürümü, kare başı katman değişimi.
- **Çentik (yaratıcı yönetmen):** suç ortağı teleskopu gözünden indirir, çakıyı pervaza bastırır ("kırt"), dürbünü yeniden kaldırır. Pervaz+çakı insert alt kadranda %22. Teleskop kapanırken **sehpadan değil pervazdan** kayar, tek hamlede "şlak".
- P14→P15 karartma fiziksel gerekçeli (teleskop kapağı).

---

### 1.9 YATAK-ODASI (P16, P17)

**Dönem ve kaynak**
- Taşra yatak odası: **tuffeau duvar, ahşap kiriş, demir yatak [G ◐], saman şilte**, yün battaniye, çarşaf, yastık, **gece takkesi (bonnet de nuit)** [G ◐], komodin, mum [S], pencere dışı uzak kule [S], kapı arka-sol (yönetmen). Memurun gri ceketi duvarda askıda (cep boş).
- **Hastalık:** "ağır hasta"; ölüm gösterilmez [A çelişki: FR öldü, S hastalandı]. Memur nefes alıyor.

**Düzen (yönetmen)**
- Yatak alt yarıda (y 1000–1500); memur yatakta (z 2.2, u 0.45), başı yastıkta sağa dönük, sağ elinde **buruşuk beyaz eldiven (plan başından)**.
- **Mum soldaki komodinde.** **Pencere sağ-arka** (A tipi, soğuk mavi), dışarıda uzak kule. **Sandalyede koyu figür silueti** (z 2.8, u 0.85): dinleyici/yazıcı (kimliği belirsiz, yüzsüz). Yazıcı **dizde yazı pulpitri (lap desk)** üstünde yazar [G]; kâğıt, hokka, **kum kabı** pulpitrin yanında (yaratıcı yönetmen P17: kurutma kumu serpme).
- P17 yakın plan: memurun yüzü sol-üst (y 520–1100, 3/4), **yazıcının siyah kollu eli alt-sağda %13**; pencere kulesi x 640–960, y 300–620.
**Palet:** duvar `#4a4238 / #6a5f52`, demir yatak `#1c1915` (kenar ışığı `#9fb3ea` α .3), yorgan `#6b5a4a` (desen `#5a4a3a`), çarşaf `#d8d0bb`, yastık/takke `#e8e0cc`, parke `#5a4630 / #3b2c1c`, pencere mavi `#4a5f94`, mum `#ffcf70` + halo `#ff9a40`, yazıcı kolu `#1c1915`.
**Işık:** iki kaynak. Anahtar: mum (sol-alçak amber) → yüzde sert gölge **sağa/yukarı**. Dolgu: pencere sağ-arkadan **soğuk mavi** → yatak üstünde soğuk kenar. Solgun yüz için soğuk baskın.
**Perspektif:** yavaş push-in; tablo 0.5 (YATAK-ODASI); yatak üç çeyrek.
**Türetme:** yeni arka plan; Kukla `MEMUR_YATAK`. **Kukla yatamaz:** yorgan çokgeni gövdenin önünde, gövde `lean ≈ 60–70°`, bacaklar yorgan altında; yalnız baş + omuz + sağ kol görünür; takke baş üstünde yumuşak koni (overlay).
**Motion notları**
- **P16:** eldiven elden parmak parmak kayar, yorgan yüzeyinde sürtünür, **eğik yorgan kenarından düşer**, parkeye "yumuşak" temas (insert alçak açı, yer seviyesi). Yatak ayağına çarpmaz. R10: yorgan sabit eğik yüzey, eldiven rigid parça, düşüşte iki nokta.
- **P17:** memur başını yazıcıya çevirir, fısıldar; yazıcı yazar, bitince **kum serper** (kum zerreleri 20–30 nokta, mürekkep yüzeyine yapışır). Kule statik (yaratıcı) ya da DINLEN'e iner (yönetmen).

---

### 1.10 MAHKEME (P18, P19)

**Dönem ve kaynak**
- Tours Ağır Ceza, Mart 1837 [A].
- **Lambri (ahşap panel)** duvarlar, yüksek pencereler, kürsü ve korkuluklu sanık sırası [G]. Arka duvarda sarkık **tricolore + kral büstü** (yüzsüz siluet) [G]. **Haç/çarmıh yok** (1830 sonrası mahkemelerden kaldırıldı [G ◐]).
- **Yargıçlar: siyah cübbe + beyaz rabat (iki şerit) + siyah toque** [G ◐], yönetmen "siyah cübbe kollu". Kırmızı başkan cübbesi (Ağır Ceza için [G ◐]) **yalnız araştırmacı doğrularsa** (Açık soru 4).
- **Jüri siluet sırası** sol (yönetmen); jüri kaynak yok, [G ◐].
- **Tokmak uyarısı:** Fransız mahkemesinde başkan **tokmak değil el çanı (clochette)** kullanır [G ◐]. Senaryo P19 "tokmak TAK". Tasarım ikisini de çizer; varsayılan tokmak (onaylı senaryo), öneri çan (Açık soru 1).
- **Duvar saati:** sarkaçlı, yuvarlak beyaz mineli kadran, Roma rakamı, siyah ibreler, **sarkaç görünür** (yaratıcı yönetmen).
- Jandarma siluetleri (bicorne) sanık sırası uçlarında, isteğe bağlı [G].

**İki kamera yönü (yönetmen: P18 kürsüye bakar, P19 sanıklara bakar)**
- **MAHKEME-A (kürsü yönü, P18):** pencereler solda. Sanık sırası arkadan, François ekran solu, Louis sağı. Kürsü orta-üst; **duvar saati y 430–650, çap ≥ 210 px (x 740–960)**, huzme üstünde. Jüri sol, halk arka.
- **MAHKEME-B (sanık sırası yönü, P19):** arka duvar = giriş kapısı + seyirci galerisi; **pencereler sağda**: huzmeler **sağdan**, gölgeler sola. Louis ekran solu, François sağ.
**Katmanlar (A)**
1. **Arka:** lambri, tricolore (sol-üst), kral büstü konsolda, saat, yargıç kürsüsü (3 koltuk; başkan z 5.0, u 0.50).
2. **Orta:** yargıç siluetleri (siyah cübbe), katip masası (kürsü altı sol), jüri sırası (sol), seyirci.
3. **Ön:** sanık sırası + korkuluk, iki kardeş (Kukla, mahkeme kıyafeti: şapka dizde, eldiven cepte; z 2.4), jandarmalar; alçak açı ön plan zemin tahtası.
- Üç yüksek kemerli pencere; **toz huzmeleri** sağ-aşağı 28°, `mix-blend-mode: screen`, degrade `#fff1c8` α .22 → 0.
**Palet:** lambri `#3b2818 / #5b3d25`, vurgu `#7a5532`, zemin `#2d2118`, kürsü `#2f2016`, siyah cübbe `#1c1915` (gölge `#0f0d0b`), rabat `#efe9d8`, toque `#1a1418` + şerit `#b8862b`, tricolore `#2a3f7e / #d9d4c8 / #a8262c`, huzme `#fff1c8`, toz `#fff1c8` α .5. (İsteğe bağlı kırmızı başkan: `#8f2a22` / `#5e1a15`.)
**Işık:** güneş pencerelerden; **gölgeler ışığın tersine**; pencere kafesli gölge zemine uzar. Karakterler pencereye/ışığa bakar.
**Perspektif:** **alçak açı**, kaçış (540, 1150), düşey çizgiler yukarı %4 yakınsar. Tablo 0.5 (MAHKEME).
**Türetme:** yeni arka plan; yargıçlar **Kukla dışı statik siluet** (cübbe overlay + toque; yalnız baş/el, yargıcın **oturma** hareketi P18); iki kardeş Kukla (`FRANCOIS_ELSIZ`, `LOUIS_ELSIZ`); `Dust`, `Glow`.
**Motion notları**
- **P18:** başkan oturur (sandalye gıcırtısı), salon uğultusu kesilir, **sarkaç salınımı** görünür ve dakika ibresi tek "TIK" atlar (yaratıcı yönetmen); saat ışık huzmesinin üstünde. Louis'nin sırtında frak cebi: eldiven köşesi **sırttan görünmez**; yaratıcı yönetmen P18'de cep ucunun görünmesini ister (açık nokta: kameranın sırt/cep yönü).
- **P19:** tokmak/çan insert'i; temas yüzeyi ahşap **tabla** (yuvarlak sehpa); "TAK" + reverb. **BERAAT damgası tokmakla aynı karede belirir** (animasyonsuz, bölüm 4). François gülümser; Louis kımıldamaz, **çıplak elle** başlar, cepten **beyaz eldiveni** çıkarır (cepten çıkış görünür), **parmak parmak** giyer (EldivenEl insert, R2), bilek düğmesi. Eller ≥ %20.

---

### 1.11 KANUN-INSERT (P20)

**Dönem ve kaynak**
- **Code pénal (1810)**: koyu dana derisi cilt, sırt bantları, kırmızı başlık etiketi "CODE PÉNAL" altın harf [G]. Yeşil çuha örtülü masa [G]. **"Bomboş sayfa" dramatizasyon** [S]; yasadaki gerçek maddeyi taklit etmez.
- Sayfalar: iki sütun metin (okunmaz), üstte başlık satırı, **alt kısım boş**, yaş lekeleri.
**Katmanlar (tepe açı)**
1. Yeşil çuha masa `#2f4a40` (Sokak `PANJUR` yeşili), ahşap kenar.
2. Açık kitap (x 140–940, y 480–1300; sayfa `#e9dfc9`, kenar `#d6c7a6`, metin çizgisi `#4a4237` α .5), cilt `#5a3a22`, etiket `#8a2c24`.
3. **Yargıç eli**: siyah cübbe kolu `#1c1915` + rabat manşet `#efe9d8`, çıplak el `#d8ae8b`; gölge sağ-alt.
**Işık:** tek **çapraz huzme** soldan sayfa üstünden; gölgeler sağ-aşağı; huzmede toz.
**Perspektif:** ortografik tepe açı, kitap 6° dönük.
**Motion notları**
- **Güve p+0'dan cilt oluğunda kanatları kapalı (~110 px)** (kurulum); açılışta ~220 px (kanat açıklığı ekran genişliğinin %20'si, ~%12 yükseklik), `#b9a98a`, 8 Hz. Güve kitaptan kalkar, **kadrajın üst-sağ kenarından çıkar** (fade yok). R11: büyük, basit gri-kahve vektör form.
- Altı sayfa çevirme; son sayfada alt kısım boş. Eller sağ üst kenardan girer/çıkar.

---

### 1.12 WIFI-MORF (P22)

**Karar:** Kukla/tahta dokusunda, **neon yok**. Filmin tek modern unsuru; dünyanın malzemesine çevrilir.

**Katmanlar**
1. **Arka:** KD-C alacakaranlık gökyüzü → morf ilerledikçe düz ekran karanlığı `#0e0d12` (alttan yukarı kararan degrade).
2. **Orta:** Chappe kulesi siluet (DINLEN) + kamera kollara zoom (`cs 1.00 → 2.20`).
3. **Ön:** **Wi-Fi simgesi tahta dokulu:** 3 yay (dış `r = 545`, orta `365`, iç `190`; kalınlık 84 px) + nokta (`r = 55`). Boy ≈ **600 px (%31)**, genişlik ≈ 770 px, merkez **(540, 800)** (yönetmen).
**Malzeme:** koyu ceviz `#3b2412`, ışık şeridi `#7a5030` α .6, kontur `ink(fill)`, her yay ucunda **altın perçin** `#d4ad52` (`#fff4c0` vurgu), ahşap lif çizgisi. Kenar ışığı `#c4d6ff` α .45 sağ kenarda.
**"Yanma":** neon yerine **boya dolgusu**: yaylar tahta renginden `boyaKrem #e6c88c`'e **alttan yukarı dolar** (nokta → iç → orta → dış, 0.25 sn). Parıltı blur ≤ 8 px α .3 (kenar vurgusu).
**Morf akışı:** regülatör bükülerek **dış yaya**, göstergeler **orta/iç yaylara**, direk kısalıp **noktaya**. Aynı sayıda yol noktası (24), `d` enterpolasyonu; mafsal noktaları sabit; doku şekille değişmez.
**Işık/gölge:** kenar ışığı sağdan; altta **kâğıt kesme gölgesi** (4 px, α .35).
**Perspektif:** düz ortografik.
**Türetme:** `ChappeTower.tsx` + yeni `WifiMorf` (SVG path). Kukla yok.
**Motion notları:** tahta gıcırtısı → ahşap tık (yaratıcı yönetmen) ya da kısık blip (yönetmen). Morf y 480–1120 aralığında; yazı **ALT-BANT** (yönetmen), üst-bant çakışmaz.

---

## 2. Karakter kartları

**Ortak:** rig `Kukla.tsx`; çizgi `SW = 2`; oranlar sabit; yürüme `yuru`. Paletler ve rig ekleri bölüm 6.
**Yakalanan tutarsızlıklar**
- `karakter/louis-kart.png`: sağ alt portrede **yeşil dolar benzeri kâğıt para** var; kural: kâğıt para yok [CLAUDE]. Portre yalnız yüz/kıyafet referansı; para sahnesinde **altın/gümüş frank**.
- `karakter/francois-kart.png`: yelek **gri desenli**; rig `FRANCOIS.vest = #6e5a3a` (kahve-altın). Şapka kartta lacivert, rig siyah, senaryo "siyah silindir". **Rig/senaryo kanon**; kart yüz referansı. Kardeşler ayrışsın diye yelek rengi korunur (François kahve, Louis gri).
- Rig tüm karakterlere **eldiven çizer** (`glove`). Çıplak el için `glove = skin`.

### 2.1 François Blanc
- **Rol:** karizmatik, sinsi gülümseyen kardeş.
- **Kostüm (rig kanon):** lacivert frak `#24407a`, kahve-altın desenli yelek `#6e5a3a` + altın zincir, krem kravat `#f1e8d2`, pantolon `#3a3530`, siyah silindir `#141317`, krem eldiven `#e8dcc0`.
- **Silüet farkı:** normal boy silindir (`tall = 1`), **kıvrık bıyık uçları**, bastonsuz, **parlak krem kravat** (karanlıkta boyunda açık leke), favori 1, kaş 1.
- **Varyantlar:** `FRANCOIS_ELSIZ` (mahkeme; şapka dizde). **Oyunculuk:** `agiz` "gulumse" ↔ "sirit"; P04'te filmdeki tek göz kırpma.
- Cep: P02, P04 ve sonrasında yalnız Louis'nin cebi eldiven taşır (François'da yok).

### 2.2 Louis Blanc
- **Rol:** soğuk hesapçı; yüz kıpırdamaz.
- **Kostüm (rig kanon):** bordo frak `#74222f`, gri yelek `#85878e`, siyah kravat `#16141a`, pantolon `#46464c`, **uzun gri şapka** `#74757c` (`tall = 1.15`), eldiven gri `#cfc9b8`, **altın topuzlu baston**.
- **Silüet farkı:** şapka %15 uzun ve **açık değerli**, dikey baston, **kısa düz bıyık**, favori 1.35, kaş 1.2, **siyah boyun**.
- **Cep eldiveni (süreklilik, yönetmen):** P02, P04, P06, P07'de **sağ göğüs cebinden beyaz köşe** görünür (overlay: `#f4efe2`, ≈ 24×14 px, −12° eğik, rig yerel (x ≈ 40, y ≈ −325) frak önü). P19'da cepten çıkarılır. Eldivenler ellerde değil.
- **Elsiz varyant:** `LOUIS_ELSIZ = {...LOUIS, glove: LOUIS.skin}` (P18–P19). P19'da giydikten sonra eldiven **kahraman beyazı** `#f4efe2`; giyme insert'i rig dışı **EldivenEl** vektör çizimi (parmaklar ayrı).
- **Baston:** P04 sağ elde; P06 sol kola asılı (bölüm 1.7); P07–P08 masaya dayalı; P18–P19 sıraya dayalı.

### 2.3 Memur (Tours müdür yardımcısı)
- **Rol:** riski taşıyan, korku ile açgözlülük arasında. **Zayıf, yıpranmış gri ceket, şapkasız** [S]. 1834 → 1836 daha zayıf, solgun, öksürüklü.
- **Kostüm:** gri redingot `#6b6a66`, dirsek ve manşet **yama/yıpranma** (`#5a5953` dikdörtgenler), soluk yelek `#5a5347`, eski keten kravat `#b9b29d`, pantolon `#4b4741`. Çıplak eller. **Sol göğüs cebinde beyaz eldiven köşesi** (P01 kol, P07, P08, P11, P15).
- **Silüet farkı:** tek şapkasız ana karakter, **dar** (dış sarmalayıcı `scaleX 0.86`, `scaleY 1.02`), hafif öne eğik (`lean ≈ 6`), seyrek saç.
- **Rig türetme:** `MEMUR`. Şapkasız: `hatYok` (öneri) ya da `hat: {x:0,y:9999,r:0}` hilesi.
- **Evrim:** `MEMUR` (P01–P11) → `MEMUR_HASTA` (P15 alt: soluk, göz altı koyu elips) → `MEMUR_YATAK` (P16–P17: gece gömleği, takke, terli parlama; ceket askıda).
- **Oyunculuk:** P07 çekmece çarpınca göz kırpma, P08 parmak tiki, P11 titrek eller ve ter, P15 öksürük (omuz bir tık düşer).

### 2.4 Müdür (Tours istasyon müdürü)
- **Rol:** yaşlı, iri, açgözlü; yalnız P07.
- **Kostüm:** zeytin-kahve redingot `#5a4630`, hardal yelek `#a58a4a` + desen `#d9c47a`, kalın beyaz kravat `#efe6d0`, pantolon `#3d352c`, çıplak el, **kırçıl saç** `#b9b5ab`, geniş favori (1.7), kalın kaş (1.5). Şapkasız.
- **Silüet farkı:** **iri ve geniş** (`scaleX 1.18`, `scale 1.08`), memurun zıttı (geniş ↔ dar; sıcak kahve ↔ soğuk gri). **Sandalyede oturur** (oturma pozu).
- **Oyunculuk:** altını tek hamlede süpürür, çekmeceyi çarpar; kararsızlık yok.

### 2.5 Ara-kule telgrafçısı (P12, P13)
- **İsim notu:** İstekte "Tours telgrafçısı". Senaryoda P12: **"Sıradaki kulede bir telgrafçı Tours kulesine bakıyor"**; yani Tours'tan *sonraki* ara kule görevlisi, Tours memuru değil. Kart buna göre (Açık soru 2).
- **Rol:** bürokratik kayıtsızlık: şüphelenir, omuz silker, esner.
- **Kostüm:** zeytin yeşili iş redingotu `#4f5a3e`, **hardal yün atkı** `#c79a3a` (`cravat` olarak), yelek `#7a6a48`, pantolon `#3e3a34`, çıplak eller, şapkasız.
- **Silüet farkı:** zeytin + hardal atkı (renkle ayrışır), **kısa-tombul** (`scale 0.94`, `scaleX 1.12`), kalın kaş (1.3). Rüzgârda atkı ucu salınır (overlay 8 px).
- **Oyunculuk:** P12 `browF/browB +1` (tek kaş kalkar), P13 `agiz "A"` + `headTilt` geriye (esneme, yüz ≥ %15–18).
- Yönetmen "kahve frak" demişti; suç ortağıyla karışmasın diye zeytin seçildi, onay bekler.

### 2.6 Suç ortağı (Bordeaux)
- **Rol:** dürbünün ucunda bekleyen gözcü [A: kuleyi izleyen suç ortağı; "eski telgraf memuru" tek kaynakta, kullanılmaz].
- **Kostüm:** toprak kahve redingot `#4a3a2c`, hardal yelek `#7d6a3f`, siyah kravat `#2b2a30`, pantolon `#34302b`, çıplak el, kısa koyu saç, **basık kasket** `#3a2c20` (yönetmen).
- **Silüet farkı:** kahverengi toprak tonları (kardeşlerin mavi/bordosundan ayrılır), teleskopa eğik duruş, tek gözü kapalı.
- **Rig türetme:** `SUC_ORTAGI`; **kasket için rig'e `Poz.sapkaTip: "silindir"|"kasket"|"yok"`** (bölüm 6). `facing = +1`, `lean ≈ 25`, `blinkF = 1` sabit.

### 2.7 Katip (Borsa)
- **Kostüm:** siyah redingot `#2d2b28`, gri yelek `#8a8a80`, **siyah kol koruyucuları (lustrin)** overlay `#1a1917` [G ◐], gri saç. Küçük ölçek (z 5.5), yüzsüz siluet filtresi uygulanabilir. Kol yüksekte (`shF ≈ −150`).

### 2.8 Paris'teki adam: gri manşetli eller (P09, P23)
- **Rol:** paketi hazırlayan, yüzü hiç görünmeyen adam [S]. **Gri manşet + sağ manşette tek altın düğme** (yönetmen); P09 ve P23'te **aynı**.
- **P09:** Kukla `PARIS_ADAM` (koyu redingot `#2b2a30`, **başı kadrajın üstünde kesik**), gri manşet overlay. Rig'in manşet şeridi `shade(coat, 0.12)`; gri için `Palet.cuff` önerisi (bölüm 6) ya da overlay.
- **P23:** **yalnız eller** (Kukla dışı sprite seti): çıplak el `#d3a784` (gölge `#a77b5f`), koyu redingot kol `#2b2a30`, **gri manşet** `#7c7f87` + altın düğme `#d4ad52`. 3 poz: eldiveni koy, iki el katla, ip çek (fiyonk spline).
- Resmî görevli (P21) manşeti **beyaz** (karışmasın).

### 2.9 Arabacı (P09)
- **Rol:** posta arabası kutusunda; topuğuyla paketi durdurur (yaratıcı yönetmen).
- **Kostüm:** ham keten bluz `#b8a882`, deri yelek `#5a3f28`, pantolon `#4a3b2c`, **geniş kenarlı yağmurluk şapka** `#2b2420`, **diz üstü çizme** `#2a1d14`.
- **Çizim:** Kukla oturamaz; **özel statik oturan figür** (yüzsüz siluet), yalnız **sağ bacak/çizme** animasyonlu; **sağ ayağı kutu korkuluğunda** (yönetmen). Koltuktan düşmez, çizme paketin içinden geçmez.

### 2.10 Kompars seti (isimsiz)
- **Borsa kalabalığı** (10–12 siluet, 3 animasyonlu), **tüccar** (kısa, kahverengi, yüzlü Kukla `TUCCAR`, `scale 0.9`), **seyirci** (8–10 siluet), **jüri** (12 siluet sıra, [G ◐]), **jandarma** (2, bicorne), **yargıçlar** (3, siyah cübbe, statik). Yüzsüz siluet filtresi, ayak temas gölgesi.

---

## 3. Prop listesi

"Temas yüzeyi / ses" sütunu `Temas = ses` kuralı içindir: her görünür temas olay listesinde bir satır.

| Prop | Dönem notu | Boyut / renk | Planlar | Temas yüzeyi ve ses |
|---|---|---|---|---|
| **Eldiven (kahraman)** | Dana/kuzu derisi (glacé) erkek eldiveni, beyaz [G]; ön yüzde üç çizgili süs dikişi (küçükte "eldiven" okutur) | `#f4efe2`, dikiş `#b9ad92` | P01, P10, P15, P16, P19, P23 | kâğıt hışırtısı, masa "tap", P16 parke "tok". Pozlar: düz, buruşuk (P15–P16), giyilen (P19) |
| **Yün çorap** | El örgü koyu yün, topuk yamalı [G] | `#4b3a2c`, yama `#6a5340` | P10 | kenardan sarkar "flop" |
| **Ok etiketi** (↑ yeşil / ↓ kırmızı) | İple bağlı kâğıt kart [T]; oklar SVG | kart `#efe9d8`, ↑ `#5f9f6e`, ↓ `#e5483c` | P10 | kâğıt hışırtı |
| **Paket kâğıdı + ip** | Kahverengi paket kâğıdı + kenevir ip (ficelle) [G], "TOURS" etiketi 380×110 (P09) | kâğıt `#b08a5a`, ip `#d8c9a0` | P01, P09, P10, P23 | hışırtı, ip "zıııt", paket çatıda "tok" |
| **Altın kesesi + frank** | Deri/kadife kese; **altın 20 frank, gümüş 5 frank (Louis-Philippe I)** [G]; **kâğıt para yok** | kese `#3e3426`; altın `#d4ad52` (kenar `#5a4018`, parlak `#fff4c0`); gümüş `#c9ccd2` (kenar `#6a6e78`) | P07, P08 (ikinci kese), P15 | kese kayma, sikke şıngırtı, çekmece "bam" |
| **Çekmece** | Ceviz, pirinç halka | `#7a5230`, `#c9a24a` | P07 | "bam" |
| **Cep saati** | **Savonnette (kapaklı) altın**, beyaz mine kadran, Roma rakamı, ince Breguet ibre [G] | kasa `#d4ad52`, kadran `#f2ecd8` | P06, P14/P15 masa | kapak "çat" |
| **Dürbün (teleskop, pirinç)** | **Tek tüp teleskop (lunette), teleskopik**, deri kaplı orta bölüm; çift gözlü yok [G] | pirinç `#c9a24a / #f1d48a / #7a5a1f`, deri `#5a3a22` | P12, P13, P14 | açılma "kırt", kapanma "şlak", pervaza "tık" |
| **Çakı** | Katlanır çakı [G] | çelik `#aab0bd`, sap `#5b3d25` | P14 | pervaz "kırt" |
| **Baston** | Ahşap koyu, altın topuz [rig] | `#3b2412`, `#d4ad52` | P04, P06, P07, P18 | kaldırım "tak" |
| **Takvim yaprağı** | **Yıl yaprağı** (büyük yıl rakamı, Playfair 900); günlük kopan yaprak 1830'larda yaygın olmayabilir [G ◐] | `#e9dfc9`, `#1c1915`; ≥ 210 px | P15 | yırtılma "çıt", omuza konma hafif |
| **Tokmak** (varsayılan) | **Fransız mahkemesinde tokmak yok, el çanı var** [G ◐] | ceviz `#5a3a22`, tabla `#2f2016` | P18, P19 | "TAK" + reverb |
| **El çanı** (öneri) | Pirinç clochette [G ◐] | `#c9a24a`, sap `#5b3d25` | P19 (alternatif) | çın + kısa reverb |
| **Kanun kitabı** | Code pénal (1810), dana derisi cilt, kırmızı etiket [G] | `#5a3a22`, etiket `#8a2c24`, harf `#b8862b` | P20 | sayfa hışırtı |
| **İlan** | Beyaz resmî ilan, tricolore bandı, kırmızı mühür [G ◐] | `#efe9d8`, mühür `#b3261e` | P21 | çivi "tak-tak-TAK" |
| **Demir mandal** | Düşen mandal (loquet) + cramponnet, el yapımı demir [G] | `#1c1915` | P21 | "klank" |
| **Güvercin / kafes** | Posta güvercini [A]; hasır kafes | güvercin `#dfe2ea`; kafes `#a07a48` | P06 | kapak "tak", kanat |
| **Kule kolları** | Regülatör + 2 gösterge, siyah, jaluzili [G ◐]; T biçimli (yel değirmeni **asla**) | bölüm 1.5 | P01, P08, P11–P14, P17, P21–P23 | menteşe "klak" |
| **Kumanda düzeneği** | Oda içi minyatür T + demir kol + çentikli sektör [G] | demir `#1c1915`, perçin `#c9a24a` | P11, P13 | "tık-tık-TIK" |
| **Fener** | Kare cam fener, tenekeli [G] | teneke `#6a6a70`, cam `#ffd98f` α .8 | P01, P10, P23 | masaya "tık" |
| **Şamdan + mum** | Pirinç şamdan, mum [G] | `#c9a24a`, alev `#ffcf70` | P07, P08, P16 | masaya konuş |
| **Kaz tüyü + hokka** | 1830'lar yazı aracı [G] | `#e8e0cc`, `#1c1915` | P02, P15, P17 | cızırtı |
| **Kum kabı** | Kurutma kumu (saupoudroir), ahşap/pirinç [G] | `#c9a24a` | P17 | serpme hışırtı |
| **Yazı pulpitri** | Taşınabilir yazı sehpası (lap desk) [G] | ceviz `#5b3d25` | P17 | kalem cızırtı |
| **Tebeşir** | Beyaz | `#f3eddc` | P02 | kırılma "çıt", sekme "tak" |
| **Duvar saati** | Sarkaçlı, beyaz mineli, Roma rakamı [G]; ≥ 210 px | `#f2ecd8`, çerçeve `#5b3d25` | P18 | sandalye gıcırtı, "TIK" |
| **Ter damlası** | | r ≈ 10 px, `#cfdcff` α .7 | P11 | "tıp" |
| **Güve** | | `#b9a98a`, ~220 px | P20 | kanat sesi |

---

## 4. Ekran yazısı tipografisi ve isim etiketi

### 4.1 Teknik sınırlar
- **Yüklü ağırlıklar:** Playfair Display **900**, Inter **500 ve 800**, IBM Plex Mono **500**; **italik yok.** Prototipteki `fontStyle: italic` (replik altyazısı) sahte italik üretir; **kaldırılır**.
- **Türkçe büyük harf:** `text-transform: uppercase` yalnız `lang="tr"` ile `İ/ı` doğru; ya da büyük harf doğrudan yazılır.
- **Ok glifi riski:** `theme.ts` unicode aralığı `↑ (U+2191)` ve `↓ (U+2193)` içerir, **`→ (U+2192)` içermez** (senaryo "Paris → Bordeaux", "1834 → 1836"). Tüm oklar **SVG yol** olarak çizilir. Font dosyalarındaki gerçek glif varlığını doğrulayamadım (Açık soru 9).
- **Güvenli alan:** x 80–1000 (920 px), **ÜST-BANT y 240–400** (yönetmen; T1+T2 tek satır ya da T2 iki satır), **ALT-BANT y 1290–1490**. Hiçbir yazı y > 1500 değil.

### 4.2 Yazı tipleri
| Tip | Kullanım | Font / boyut | Renk | Konum |
|---|---|---|---|---|
| **T1 KÜNYE** | "TOURS · 1834", "Paris → Bordeaux: 3 GÜN", "Plan A: Güvercin — başarısız", "Tours Ağır Ceza · Mart 1837", "1836 · İçeriden biri" | IBM Plex Mono 500, **34 px**, aralık 0.18 em, büyük harf | altın `#b8862b` (koyu) / mürekkep (kâğıt şerit) | ÜST-BANT, sol hizalı x 80 |
| **T2 İDDİA** | "1834. Bilgisayar yok.", "Ya fark ederse?", "Kimse durdurmadı. Herkes kopyaladı.", "Önce açık. Sonra yasa.", "Suç yok. Çünkü yasa yok.", "Elektrik yok. Sadece…" | Playfair 900, **72 px** (kısa) / 64 px (iki satır), satır 1.05 | kâğıt `#e9dfc9`, **vurgu `#e5483c`** | ÜST-BANT (T1 ile birlikteyse T2 tek satır); bazı planlar ALT-BANT (yönetmen: P12, P21, P22) |
| **T3 FORMÜL** | "ELDİVEN = ↑ · ÇORAP = ↓" (P10), "Oyun: Paris'teki tahvil fiyatı" | Plex Mono 500 **42 px** + SVG ok (52 px yüksek, 8 px kalın) | kâğıt; ↑ `#5f9f6e`, ↓ `#e5483c` | ÜST-BANT |
| **T4 DAMGA** | "BERAAT" (P19) | Playfair 900, **170–180 px**, çift çerçeve (6 + 2 px), −4° döndürülmüş, mürekkep eksik doku (`feTurbulence`) | `#e5483c`, kâğıt kenar 3 px | **ALT-BANT** (yönetmen). **Belirir, animasyon yok** (yaratıcı yönetmen; P05 mührüyle metafor tekrarı olmasın) |
| **T5 ALTYAZI** | anlatıcı + replik | Inter **800**, **56 px**, satır 1.15, **en fazla 2 satır**, maks 920 px | `#f6f1e4`; **vurgu `#e5483c`**; `textShadow: 0 3px 0 #000, 0 0 22px rgba(0,0,0,.9)` | alt kenar y ≈ 1490, ortalı |
| **T5b REPLİK ETİKETİ** | "FRANÇOIS", "LOUIS", "MEMUR" | Plex Mono 500 **30 px**, aralık 0.2 em | altın `#b8862b` | altyazı üstü, ortalı; replik tırnaklı |

**Kurallar**
- **Vurgu kelime kırmızı.** Prototipte ve `Film.tsx`'te "okunan kelime" altın `#ffcf70` ile vurgulanıyor: **kural ihlali.** Yeni: okunan kelime **ölçek `1.06` + parlaklık**, **kırmızı yalnız planın anahtar kelimesi**.
- Vurgu önerisi (yönetmen onayı): P01 *hackledi*, P02 *tahvil*, P03 *üç günde*, P04 *kazanır*, P05 *devlete*, P06 *Olmadı*, P07 *satın*, P08 *hata*, P09 *paket*, P10 *düşüş*, P11 *hata*, P12 *iki dürbün*, P13 *kopyalıyor*, P14 *suç ortağı*, P15 *önce*, P16 *hastalanana*, P17 *anlattı*, P18 *Mahkeme*, P19 *Beraat*, P20 *yasa*, P21 *yasası*, P22 *siber*, P23 *Sadece*.
- **Giriş:** yukarıdan 30 px kayma + opaklık (0.45 sn, `bezier(0.16,1,0.3,1)`). **Çıkış fade değil:** kâğıt şerit gibi yukarı kayarak maskelenir (0.25 sn).
- **Açık zeminde** (harita parşömeni, Bordeaux gündüz): T1/T2 **kâğıt şerit** (`#e9dfc9` α .92, 2 px mürekkep üst-alt çizgi, hafif tane) üstünde mürekkep renkte; vurgu `C.red`.
- Ses kapalı kuralı: yazı anlatımı tekrarlamaz, tamamlar. Kapak: ≤ 5 kelime, T2 stili, üst %22.

### 4.3 İsim etiketi ("dosya etiketi")
- **Form:** kâğıt etiket `#e9dfc9`, **sağ üst köşesi kesik** (14 px), 2 px mürekkep kenar, tane, iç dolgu 14×22. Sol kenarda **6 px sekme** = karakterin ceket açık rengi (François `#3c5ea3`, Louis `#9a3646`; yeni renk yok).
- **İçerik:** satır 1 ad, Playfair 900 **44 px**, mürekkep ("François", "Louis"). Satır 2 Plex Mono 500 **30 px**, `#4a4237`, aralık 0.14 em, büyük harf: **"BLANC · BORDEAUX"** (rol iddiası yok).
- **Bağlantı:** etiket altından karakterin şapka tepesine **3 px mürekkep çizgi** + 12 px daire uç. Etiket şapkanın **60–80 px üstünde**, y ≥ 240, yan 80 px. Karakter yürürse etiket ofsetle takip eder.
- **Giriş** 0.4 sn yukarıdan 20 px; **çıkış** yukarı kayıp maske. Yalnız P02'de; replikte konuşanı T5b belirtir.

---

## 5. Açık sorular (belgede "Açık soru N" olarak anılanlar)

1. **Tokmak mı çan mı (P19)?** Fransız mahkemesinde tokmak yok, çan var [G ◐]. Senaryo onaylı "tokmak". Seçenekler: A tokmak (okunur, anakronizm riski), B çan (doğru, "TAK" zayıflar), C kapanan dosya/mühür "TAK". Karar kullanıcı/yönetmen.
2. **"Tours telgrafçısı" adı:** P12–P13'teki kişi Tours'tan *sonraki* ara kule görevlisi; kart öyle çizildi. Yanlışsa Tours memuru (2.3) kullanılır.
3. **"Yüz detayı yok" ile Kukla yüzü:** bölüm 0.2 uzlaşması onaylanmalı.
4. **Mahkeme doğruluğu:** jüri varlığı, kırmızı başkan cübbesi, toque, haç yokluğu, jandarma [G ◐]. Araştırmacı doğrulamazsa jüri/jandarma çıkar, cübbeler siyah.
5. **Takvim:** günlük kopan yaprak 1830'larda yaygın değil olabilir [G ◐]; yıl yaprağı/yıllık levha çizildi. Yönetmen "takvim bloğu" diyor; arka plan akış yaprakları aynı tipte levha olsun.
6. **Posta arabası görseli** kapıda arma/taç taşıyor; 1830 sonrası sadeleştirilmeli. Kromakey kenar temizliği, at başı ayrı katman.
7. **Yeni renkler:** `redLit`, `up`, `boyaKrem` onay bekler.
8. **Rig kenar ışığı yönü:** `RIM` `facing` ile aynalanır; kontrajurlu planlarda (P06) ve karşılıklı bakan çiftlerde yanlış taraf. Öneri `Poz.rim` (bölüm 6).
9. **Ok glifleri:** `→` aralıkta yok; `↑ ↓` aralıkta ama woff2 içindeki gerçek glif doğrulanmadı (araç erişimim yok). Teknisyen kontrol etsin; o zamana dek SVG ok.
10. **Paris'te kule (P23):** araştırma Paris'in hattaki yerini vermiyor (yalnız Paris–Lille). Konum belirtilmez.
11. **Borsa tahtası:** 1834'te tebeşirli kara tahtada fiyat yazılması [S dramatizasyon], doğrulanmadı; gerçek rakam yok.
12. **Chappe kolu rengi/detayı:** siyah, jaluzili kanat, karşı ağırlık, payanda [G ◐]. `ChappeTower.tsx` kırmızı gösterge kullanıyor; araştırmacı teyidiyle siyaha çekilmesi önerildi.
13. **Bordeaux kulesi:** "sağ-uzak tepede kule", gerçek konum yok.
14. **Eski referanslar:** `S06.png` pencerede kafes pilon (Chappe değil); `louis-kart.png` kâğıt para. İkisi yalnız stil/yüz referansı.
15. **Plan belgeleri çakışması (bölüm 0.4):** P06 saat/tüy, P08 kol/gölge, P17 klunk/kum, P18 saat ölçüsü, P03 disk tarafı, telgrafçı rengi. Yönetmen + yaratıcı yönetmen ortak karar versin.
16. **P18 cep:** yaratıcı yönetmen P18'de Louis'nin cebinde eldiven ucu görünmesini ister; yönetmen "sırttan görünmez" yazıyor. Kamera arkadan olduğundan görünürlük cep tarafına (sağ göğüs) bağlı; yönetmen karar verir.

---

## 6. Önerilen palet sabitleri ve rig ekleri (kod bloğu; dosyaya yazılmadı)

```ts
// src/bolumler/blanc/palet.ts (öneri)
import type { Palet } from "../../rig/Kukla";
import { LOUIS, FRANCOIS } from "../../rig/Kukla";

export const BL = {
  redLit: "#e5483c",     // altyazı/vurgu, koyu zeminde (C.red'in aydınlık hâli)
  up: "#5f9f6e",         // yalnız P10 ↑
  boyaKrem: "#e6c88c",   // yalnız P22 yay dolgusu
  gloveHero: "#f4efe2",  // kahraman eldiven
  rimCool: "#c4d6ff", amber: "#ffb357", amberDeep: "#ff9a40", candle: "#ffcf70",
  tuffeau: "#e3dcc6", ardoise: "#3c4660", tuile: "#9a5a3c", pierreBdx: "#d8c49a",
  brass: "#c9a24a", brassLight: "#f1d48a", brassDark: "#7a5a1f", walnut: "#3b2818",
  duskTop: "#1d1838", duskMid: "#3b2f5c", duskLow: "#8a5a6e", duskHorizon: "#d98a5a", screenDark: "#0e0d12",
  toz: "#8b93ad",        // P03 toz = P04 sis
};

const bare = (p: Palet): Palet => ({ ...p, glove: p.skin });
export const FRANCOIS_ELSIZ = bare(FRANCOIS);
export const LOUIS_ELSIZ = bare(LOUIS);

export const MEMUR: Palet = { coat: "#6b6a66", coatDark: "#46453f", coatLight: "#8a8983", vest: "#5a5347", vestDark: "#3d382f", vestDesen: "#5a5347", cravat: "#b9b29d", shirt: "#d8d0bb", pants: "#4b4741", shoe: "#1a1512", glove: "#d9b190", skin: "#d9b190", skinDark: "#a9806a", hair: "#5e5144", hat: "#2c2a26", hatBand: "#1c1b18", sideburn: 0.6, browHeavy: 0.8 };
export const MEMUR_HASTA: Palet = { ...MEMUR, glove: "#cdb7a2", skin: "#cdb7a2", skinDark: "#9a8573", hair: "#6a5f55" };
export const MEMUR_YATAK: Palet = { ...MEMUR_HASTA, coat: "#d8d0bb", coatDark: "#b3ab97", coatLight: "#efe8d6", vest: "#d8d0bb", vestDark: "#b3ab97", vestDesen: "#d8d0bb", cravat: "#d8d0bb" };
export const MUDUR: Palet = { coat: "#5a4630", coatDark: "#3a2c1d", coatLight: "#7a6044", vest: "#a58a4a", vestDark: "#7a6430", vestDesen: "#d9c47a", cravat: "#efe6d0", shirt: "#f2ede1", pants: "#3d352c", shoe: "#120e0b", glove: "#d79f7b", skin: "#d79f7b", skinDark: "#a86f55", hair: "#b9b5ab", hat: "#1e1a16", hatBand: "#2e2a24", sideburn: 1.7, browHeavy: 1.5 };
export const TELGRAFCI: Palet = { coat: "#4f5a3e", coatDark: "#323a28", coatLight: "#6c7956", vest: "#7a6a48", vestDark: "#54482f", vestDesen: "#7a6a48", cravat: "#c79a3a", shirt: "#d8cfb8", pants: "#3e3a34", shoe: "#17120e", glove: "#dcae8b", skin: "#dcae8b", skinDark: "#ad7b60", hair: "#4a3626", hat: "#4a3b2c", hatBand: "#2c241c", sideburn: 0.9, browHeavy: 1.3 };
export const SUC_ORTAGI: Palet = { coat: "#4a3a2c", coatDark: "#2e2319", coatLight: "#6a5440", vest: "#7d6a3f", vestDark: "#574a2a", vestDesen: "#a8935a", cravat: "#2b2a30", shirt: "#eee8d8", pants: "#34302b", shoe: "#0f0d0c", glove: "#d7a782", skin: "#d7a782", skinDark: "#a8765c", hair: "#2b1c12", hat: "#3a2c20", hatBand: "#241a12", sideburn: 1.1, browHeavy: 1.0 };
export const KATIP: Palet = { coat: "#2d2b28", coatDark: "#1a1917", coatLight: "#4a4742", vest: "#8a8a80", vestDark: "#5f5f58", vestDesen: "#8a8a80", cravat: "#d8d0bb", shirt: "#e8e2d0", pants: "#3a3a3e", shoe: "#0f0d0c", glove: "#d8ae8b", skin: "#d8ae8b", skinDark: "#a97d62", hair: "#4a4a4a", hat: "#141317", hatBand: "#2a2a2e", sideburn: 0.8, browHeavy: 0.9 };
export const TUCCAR: Palet = { coat: "#6a5338", coatDark: "#443523", coatLight: "#8a7050", vest: "#8a8a80", vestDark: "#5f5f58", vestDesen: "#8a8a80", cravat: "#d8d0bb", shirt: "#e8e2d0", pants: "#3a3530", shoe: "#0f0d0c", glove: "#d8ae8b", skin: "#d8ae8b", skinDark: "#a97d62", hair: "#2f2418", hat: "#2a2622", hatBand: "#1c1a18", sideburn: 1, browHeavy: 1 };
export const PARIS_ADAM: Palet = { coat: "#2b2a30", coatDark: "#1a1a1e", coatLight: "#44434c", vest: "#55555c", vestDark: "#3a3a40", vestDesen: "#55555c", cravat: "#d8d0bb", shirt: "#e9e3d2", pants: "#34302b", shoe: "#0f0d0c", glove: "#d3a784", skin: "#d3a784", skinDark: "#a77b5f", hair: "#2b2018", hat: "#141317", hatBand: "#2a2a2e", sideburn: 1, browHeavy: 1 };
// Kukla dışı (statik siluet/overlay)
export const YARGIC = { cubbe: "#1c1915", cubbeGolge: "#0f0d0b", rabat: "#efe9d8", toque: "#1a1418", toqueSerit: "#b8862b", baskanKirmiziOpsiyon: "#8f2a22" };
export const ARABACI = { bluz: "#b8a882", yelek: "#5a3f28", pantolon: "#4a3b2c", sapka: "#2b2420", cizme: "#2a1d14" };
export const PARIS_EL = { ten: "#d3a784", tenGolge: "#a77b5f", kol: "#2b2a30", manset: "#7c7f87", mansetKoyu: "#55575e", altinDugme: "#d4ad52", gomlek: "#e9e3d2" };
export const GOREVLI_EL = { kol: "#1c1915", manset: "#efe9d8", ten: "#d8ae8b" };
export const YAZICI_EL = { kol: "#1c1915", ten: "#d3a784" };
```

**Rig'e (Kukla.tsx) gereken küçük ekler (motion; bu belge kod değiştirmez):**
1. `Poz.sapkaTip?: "silindir" | "kasket" | "yok"` (memur/müdür/telgrafçı şapkasız, suç ortağı kasket; şimdilik `hat` null ise her zaman silindir çiziliyor).
2. `Poz.rim?: 1 | -1` (kenar ışığı yönü `facing`'den bağımsız; P06 kontrajur, karşılıklı bakan çiftler).
3. `Palet.cuff?: string` (gri manşet; rig manşet şeridi `shade(coat, 0.12)`).
4. Genişlik/incelik için dış sarmalayıcı `scale(x,y)` yeter; rig'e parametre gerekmez.
5. Siluet SVG filtresi (bölüm 0.2).
6. **Oturma pozu:** rigde `thigh −88, knee 88, bodyY +105` denenmeli (müdür); olmuyorsa müdür özel statik figüre dönüşür.
