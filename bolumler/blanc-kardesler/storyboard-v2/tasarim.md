# Blanc Kardeşler (Bölüm 1) — Storyboard v2 Görsel Tasarım Dosyası

Hazırlayan: tasarimci · 2026-11-06 · Girdi: `senaryo-v2.md`, `arastirma.md`, `karakter/*`, `src/theme.ts`, `src/rig/Kukla.tsx`, `src/bolumler/blanc/proto/Sokak.tsx`, `src/components/ChappeTower.tsx`, `Harita.tsx`, `final/araba-yesil.png`, `final/S06.png`.
Bu belge **tasarımdır, kod değildir.** Kod bloklarındaki sabitler motion'a önerilen tanımlardır, henüz hiçbir dosyaya yazılmadı.

Etiketler (her dönem iddiasının yanında):
- **[A]** `arastirma.md`'de kaynaklı.
- **[S]** `senaryo-v2.md`'de yazılı (kullanıcı onaylı; çoğu dramatizasyon).
- **[G]** Genel tarih bilgisi. `arastirma.md`'de yok, araştırmacı/eleştirmen doğrulamadan "kesin" sayılmaz. Doğrulanana kadar görsel olarak yumuşak tutulur (okunur metin yok, tek bir ayrıntıya bağlı dokunuş yok).
- **[T]** Tasarım kararı (tarihî iddia değil).

---

## 0. Genel kararlar

### 0.1 Kimlik ve renk disiplini
- Kanal kimliği: eskimiş kâğıt `#e9dfc9`, mürekkep `#1c1915`, mühür kırmızısı `#b3261e`, altın `#b8862b` (`C` in `theme.ts`). Dünya renkleri (ay mavisi, amber, alacakaranlık moru, Bordeaux altını) prototipte onaylandı. Bunlar "kimlik filtresinden" geçer: yeni her renk **~%15 desatüre, kâğıt tonuna doğru ısıtılmış** seçildi; her sahneye `FilmLook` (tane + vinyet) ve kâğıt greni bindirilir.
- **Yeni renk gerekçesi (kullanıcı/yönetmen onayı bekler):**
  1. `redLit #e5483c`. `C.red #b3261e` koyu zeminde (`#14120f`) kontrast ≈ 2.9:1, altyazıda yetersiz. Aynı tonun aydınlık hâli (≈ 4.5:1). Kâğıt/açık zeminde `C.red` kalır (≈ 4.9:1).
  2. `up #5f9f6e` (patina yeşili). Yalnız P10 "yeşil ↑" için (senaryo gereği). Kimlik dışı parlak yeşil yerine bakır oksit tonu. Başka hiçbir yerde kullanılmaz.
  Başka yeni font yok. Fontlar: Playfair Display 900, Inter 500/800, IBM Plex Mono 500 (başka ağırlık/italik **yüklü değil**).
- **Kontur kuralı (her bölümde aynı çizgi kalınlığı):** karakter ve prop konturu = rig'deki `SW = 2` (yerel birim, ölçekle büyür), renk `ink(fill)` = fill'in %55 koyusu, asla saf siyah değil. Dekor konturu ekranda 3 px (uzak) – 6 px (yakın), aynı kural. Props için `strokeLinejoin="round"`.
- **Işık yönü sözleşmesi:** Rig'deki kenar ışığı (`RIM #c4d6ff`) karakterin **baktığı yöndeki** kenara çizilir ve `facing` ile aynalanır. Bu yüzden her sahnede **karakter ışık kaynağına doğru bakacak** şekilde yönlendirilir; ters bakan karakterde kenar ışığı yanlış taraf olur (bkz. Açık soru 8).
- **Akış yönü sözleşmesi (ekran yönü):** Haber/sinyal her zaman **soldan sağa** akar (Paris solda, Bordeaux sağda). Tüm dürbünler/bakışlar "Paris'e" = sola bakar (P12 telgrafçı, P14 suç ortağı, P06 güvercin sola uçar). Haritada (dikey) Paris üstte kalır.
- **Çözünürlük/güvenli alan:** 1080×1920; canlı alan x 80–1000, y 220–1500. Eylemin kilit anları (çekmece, mühür, sürgü, tokmak) y ≤ 1500.
- **Kukla boyu:** şapka dahil ≈ 620 birim (François), 635 (Louis); ayak y=0. Ekranda yükseklik = 620 × scale.

### 0.2 "Yüz detayı yok" kuralı ile Kukla yüzü
Sanat yönetmeni kuralı "minimal siluet, yüz detayı yok" der. Onaylı prototip rig'i (Kukla.tsx) gözlü/kaşlı/ağızlı. Senaryo ise dudak senkronu (P04, P08, P17), kaş kaldırma (P12), esneme (P13), göz kırpma (P04) ister. **Karar:**
- **Yüzlü (Kukla rig):** François, Louis, memur, müdür, ara-kule telgrafçısı, suç ortağı. Oyunculuk gerektirenler.
- **Yüzsüz siluet:** katip, yargıçlar, arabacı, kompars/kalabalık, jandarmalar, jüri. Ayrıca "Paris'teki adam" (yalnız el).
- Siluet filtresi (kod önerisi, rig'e dokunmadan dışarıdan sarılır; rig'deki gözlerin sabit beyaz rengi paletle gizlenemediği için filtre şart):

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
| SOKAK-BORDEAUX | mevcut Sokak'tan türer | P04 | gece ay + amber |
| TOURS-KULUBE-IC | yeni | P01, P07, P08, P10, P11 | A akşam-fener (P01, P10) · B gece-mum (P07, P08) · C gündüz-soğuk (P11, P15 alt yarı) |
| KULE-DIS | yeni | P12, P13, P17 penceresi, P21, P22 | KD-A Tours gündüz (P21) · KD-B ara kule kesit, gündüz (P12, P13) · KD-C alacakaranlık siluet (P17, P22) |
| PARIS-AVLU | yeni | P09 (avlu, gündüz) · P23 (masa) | P23 masa = P01 ile **aynı plaka** (bkz. 1.6) |
| CATI-BORDEAUX | yeni | P06 | şafak |
| CATI-KATI | yeni | P14 · P15 üst yarı (masa insert'leri) | gündüz altın, pencere solda |
| YATAK-ODASI | yeni | P16, P17 | tek mum + soğuk mavi pencere |
| MAHKEME | yeni | P18, P19 | çapraz toz huzmesi |
| KANUN-INSERT | yeni | P20 | tepe açı, tek huzme |
| WIFI-MORF | yeni | P22 | alacakaranlık → ekran karanlığı |

Not (senaryoda tanımsız kalan): P15 üst yarı (defter, altın yığını, kadeh, yıllık takvim levhası) için ayrı mekân açılmadı. CATI-KATI'nın masası kullanılır (Louis zaten orada bekliyor; maliyet düşer). P15 alt yarı = TOURS-KULUBE-IC C.

---

## 1. Mekân kartları

### 1.1 BORSA (P02) — Bordeaux Borsası, gündüz

**Amaç:** "Bordeaux'lu ikizler... tahvile oynuyor." Kalabalığın ortasında iki kardeş, sıcak altın öğle.

**Dönem ve kaynak**
- Tahvil (%3 rente) ve Borsa [A]. Silindir şapkalı kalabalık [S]/CLAUDE dönem listesi.
- Mimari: Bordeaux'nun 18. yy kireçtaşı (sarı-krem "pierre de Bordeaux") neoklasik salon, yüksek kemerli pencereler, dama zemin [G]. **Hangi binada (Palais de la Bourse?) geçtiği araştırmada yok**; belirli bir iç mekân kopyalanmaz, "genel neoklasik borsa salonu" çizilir.
- Fiyat tahtası: tebeşirle yazılan kara tahta (ardoise) [S dramatizasyon; 1834 borsa pratiği için bkz. Açık soru 11]. **Gerçek fiyat iddiası yok:** tahtada yalnızca "3 %" başlığı ve altında yarı okunur iki satır rakam (örn. "8·,··"). Rakamlar sahnede okunmaz.
- Kalem: **kaz tüyü + hokka** [G]; kurşun kalem değil. Defter: kenarı kalın, ciltli, sütunlu rakam çizgili.
- Tricolore: salon girişinin üstünde sarkık bayrak (1830'dan beri) [CLAUDE].
- Kâğıt para yok, tahvil/senet kâğıtları var (rente belgesi bir banknot değildir ama yine de okunur para görüntüsü verilmez).

**Katmanlar (arka → ön)**
1. **Arka (duvar, z uzak):** üç yüksek kemerli pencere (üst %5–35, sol tarafta ışık girer), duvarda **fiyat tahtası** üst-ortada (x 230–850, y 330–760), tahta altında tebeşir rafı. Tahtanın önünde **0,9 m'lik iki basamaklı ahşap estrad** (katip burada durur; **yan taraftan çıkar**, merdiven kadraj dışı). Duvar-zemin birleşimi y ≈ 980.
2. **Orta:** 12–14 siluet figür (silindir şapka boyları farklı, 3 baston, 2 defter), 3 derinlik sırası, **ayakları zeminde, her figürün altında temas gölgesi.** Estradın iki yanında bilerek **boşluk** bırakılır (tebeşir düşüş çizgisi görünür kalsın). Merkezde François + Louis (tam Kukla) + François'nın omzundan tuttuğu tüccar kompars.
3. **Ön:** sol altta bir sütun gövdesi (çerçeveleme, kadraj dışına kayar), sağ altta bastonlu bir sırt siluetinin bulanık parçası, bir **yüksek yazı pupitri** (Louis'nin defteri) ve ahşap korkuluk parçası.

**Palet:** duvar taşı `#d8c49a` · taş gölgesi `#a58f68` · sütun vurgusu `#efe2bd` · zemin dama `#cbbd9c` / `#8b7b5c` · ahşap korkuluk `#5b3d25` · tahta `#1f2a26` (soluk yeşilimsi kara) · tebeşir `#f3eddc` · ışık huzmesi `#ffd98f` α .18 · kalabalık siluetleri `#5a4a3c` (yakın) → `#9a8a74` (uzak, atmosferik).
**Işık:** güneş sol-üst (pencereler solda), huzmeler 30° sağ-aşağı. **Gölgeler sağ-aşağı**, kısa (öğle). Karakterler sola/ışığa bakar: François ve Louis `facing = -1`.
**Perspektif:** tek nokta, kaçış noktası **(540, 880)**, kamera göz hizası. Ölçek kuralı: `s(y) = 0.55 + 0.00085·(y − 1000)`. Örn. François/Louis ayak y = 1380 → s ≈ 0.87 (≈ 540 px boy). Kalabalık uzak sıra y 1060 → s ≈ 0.6. Dolly-in: s'e ek %12.
**Türetme:** yeni arka plan (SVG); kalabalık = Kukla + `siluet` filtresi (yürüme döngüsü `yuru` yavaşlatılmış, çoğu duran). `Efektler.tsx`: `Dust`, `Glow`, `FilmLook`. İsim etiketleri bölüm 4'te.
**Motion notları**
- İsim etiketleri karakter şapka tepesinin 40 px üstünde, y ≥ 240 (üst güvenli alanda kalmalı; tahta çakışırsa etiket tahtanın altına, şapka üstüne yerleşir).
- **Tebeşir (dokunuş):** katip tahtanın sağ alt köşesinde yazarken parça kırılır → tebeşir rafına seker → estrad tahtasına iki sekme → zemin taşına. Üç ayrı temas = üç foley (çıt, tak, tak). Parça beyaz `#f3eddc`, 14×5 px; **dokunuşun okunabilirliği kalabalığın dönmesiyle sağlanır** (kafalar sola-sağa döner, Louis dönmez). Tebeşir düşerken kalabalık "donar" (animasyon `amt` → 0).
- Louis kaz tüyü ile yazar; tüy ucu defter yüzeyine temas eder (kalem cızırtısı, temas anı olay listesine).
- Kalabalığın yürüyenleri kadraj kenarından ya da estrad yan girişinden girer/çıkar; duvardan geçmez.

---

### 1.2 HARITA (P03, P05) — mevcut, tasarım notları

**Kaynak:** `Harita.tsx` (gerçek Fransa GeoJSON, tarihî Paris→Chartres→Tours→Poitiers→Angoulême→Bordeaux yolu, kule ikonu). Rota tarihî ve ara şehirler [A: yalnız Paris–Tours–Bordeaux; ara şehirler harita sadeliği için, etiket küçük].
**Palet (mevcut kodtan):** zemin `#1a120b` · mürekkep `#2b1d10` · parşömen görseli `parsomen.jpg` (~`#d9c49a`, Gemini üretimi) · kule parlaması `rgba(255,170,60)` · aktif kule kolu `#b3261e`.
**Işık/gölge:** parşömen düz; kenarlarda vinyet. Gölge yok (düz harita). Posta arabası hafif sağ-alt gölge.
**Perspektif:** üstten ortografik; kamera tilt Paris→Bordeaux. Kaçış yok.
**Yeni çizim ihtiyaçları**
- **Gün-ay turu (P03):** sağ üstte küçük disk; güneş `#e8b86a` → ay `#e9dfc9` üç tur. Sayaç mono: "1. GÜN · 2. GÜN · 3. GÜN" (T1 stili, gold). Rota üstünde gece kararması mevcut (`night`).
- **Posta arabası:** `final/araba-yesil.png` (kromakey yeşil; kenar sızıntısı temizlenmeli). **Dönem uyarısı:** görselde kapı üzerinde "POSTES ROYALES" ve tacı/arması var. 1830 sonrası eski rejim arması (zambak) kalkmış olabilir [G]. Küçük ölçekte okunmaz; ancak P09'da da aynı araba kullanılacak, orada arma **sadeleştirilmiş/bulanık** çizilir (Açık soru 6).
- **Mühür (P05):** kırmızı balmumu mühür, çap ≈ 220 px, taşan balmumu kenar lekeleri (`#b3261e`, iç gölge `#7a1914`, parlak kenar `#e5483c` α .5). **Baskı motifi: Chappe T kule ikonu** (arma/zambak riskinden kaçınır; imza nesne tekrarı). Mühür haritaya inerken hat kırmızıya (`#b3261e`) boyanır.
- **Kule zinciri:** mevcut `Kule` ikonu T biçimli (regülatör yatay + iki kısa gösterge); **yel değirmeni okunmasın:** kollar asla pervane gibi dönmez; sadece gösterge kolları 45° adımlarla oynar.
**Türetme:** doğrudan `Harita.tsx`.
**Motion notları:** sinyal arabayı solladığı karede toz sinyale doğru savrulur (rüzgâr yönü sinyal yönü). Mühür inişi: ölçek 2.4→1 (mevcut `stamp`), temas karesinde "tok".

---

### 1.3 SOKAK-BORDEAUX (P04)

**Karar:** Prototip sokağı Bordeaux'ya taşınır. Notre-Dame çıkar; sokak ucunda sis içinde Garonne gemi direkleri. Yürüyüş/fare/baston/şapka/göz kırpma aynen kalır.

**Dönem ve kaynak**
- Haussmann öncesi: dar sokak, farklı yükseklikte bitişik evler, panjur, baca kümeleri, ipe asılı **réverbère**, tricolore [CLAUDE]. Mevcut Sokak bunların hepsini uyguluyor (kontrol edildi).
- Bordeaux'ya özgü [G]: açık krem kireçtaşı cepheler (ay ışığında sıcak gri-bej, Paris'in soğuk mor-grisinden ayrılır); birinci kat demir balkonlar/ferronnerie (mevcut `balkon demiri` kullanılır); sokak ucu **Garonne rıhtımı** ve yelkenli gemiler ("Port de la Lune"). Bordeaux'nun Paris'ten ayrıştıran çatı çeşitliliği: arduvaz + **oluklu kiremit (tuile canal)** karışımı.
- Dükkân adları: Paris listesi (`BOULANGERIE, VINS, CHAPELIER, CAFÉ`) Bordeaux'ya uyar: **`VINS`** kalır (şarap şehri), `BOULANGERIE`, `CAFÉ`, `CHAPELIER` (şapka motifi) kalır. İstersen bir dükkân `TONNELIER` (fıçıcı) olur.
- Yelkenliler: yalnız yelken [G]; buharlı gemi/baca dumanı **yok**.

**Katmanlar**
1. **Gök (`katman="gok"`):** mevcut ay + yıldız + bulut (değişmez).
2. **Uzak (`katman="uzak"`), değişen kısım:** Notre-Dame grubu (`Uzak` bileşeni) **kaldırılır**, yerine **Garonne ufku**:
   - Sokak ucu açıklığı yaklaşık x 410–670, y 600–1130. Direkler bu açıklıkta, taban y ≈ 1100.
   - 4 direk: x = 452, 512, 566, 628; üstler y = 760, 650, 720, 800. Her direkte 2–3 yatay seren (genişlik 70–120 px), sarılı yelken ruloları (koyu), ince donanım halatları (1.5 px).
   - En yüksek direğin tepesinde küçük amber fener (r 5 + blur 40 α .35).
   - Gövdeler y 1090–1130 arası koyu bant; rıhtım kenarı ve su çizgisinde amber ışıltı.
   - **3 sis düzlemi:** `#6e7aa6` α .35 (y 980–1130), α .25 (y 880–1000) ve direklerin önünde α .5 yatay degrade. Uzak direkler sise gömülüp açık, yakın olanlar koyu (`#20284a` → `#2c3358`).
   - İki yan "ev ucu" silueti (mevcut `M 400 860…` yolları) düz bırakılır.
3. **Orta (`katman="orta"`):** cepheler + zemin + réverbère + fener + ızgara/fare + ilan + teras + bayrak. Değişiklikler:
   - `SIVA` paleti Bordeaux'ya: `["#7b7868","#867f6c","#706e72","#8a826f","#78766c","#74707a"]`.
   - Yarı ahşap oranı `0.35 → 0.15` (Bordeaux merkezinde nadir).
   - Çatı varyantı: %40 `tuile canal` (`#7a3f2c`, 1.5 px oluk çizgileri `#4a2418`), %60 arduvaz (`#2c3550`).
   - Dükkân adları yukarıdaki gibi.
**Palet (gece):** gök `#070b1f → #1b2852 → #40507e` · ay `#f2f0e6` · kenar ışığı `#c4d6ff` · amber `#ffb357 / #ff9a40 / #ffd98f` · taş `SIVA_BDX` · panjur `#2f4a40 / #4a3328 / #33405a` · kaldırım `rgb(48–70)` mevcut.
**Işık:** ay üst-orta (mevcut), kenar ışığı mavi; **réverbère amber** sokak ortasında: karakterlere ön-yan dolgu. Gölgeler lambadan **radyal, ışığın tersine** (zeminde sola/sağa yayılır); yansımalar mevcut ıslak zemin elipsleri.
**Perspektif:** `Sokak.tsx` gerçek tek nokta perspektif değildir; `sz(z)` ile cephe köşelerini (SOL/SAĞ A-B-C-D) doğrusal harmanlar. Cephe tepe çizgileri y ≈ 838 civarında birleşir, zemin ufku y ≈ 977 (`z→∞`), sokak ucu düzlemi `z = 7` ⇒ y = 1130, x 410–670. Kaçış "bandı" y 840–980. Kukla konumu `zemin(z, u)` + `sokakGenislik(z)` (prototipteki `yol()` işlevi aynen).
**Türetme:** `Sokak.tsx` (kod değişikliği motion'da: `uzak` prop'u, `SIVA` paleti ve çatı varyantı parametre). Yeni dosya gerekmez.
**Motion notları**
- Fare/baston: Louis'nin baston ucu taşa **girmez**, zemin hizasında durur (prototipte çözüldü). `tak` temas karesi olay listesinde.
- Garonne direkleri sisle birlikte **hafif sallanır** (yalnız 1–2 px yatay, ortam hareketi); P04 kısa olduğu için sis akışı yavaş.
- Tricolore (`Bayrak`): mavi gönderde, sonra beyaz, kırmızı dışta. Mevcut sıra doğru.

---

### 1.4 TOURS-KULUBE-IC (P01, P07, P08, P10, P11)

**Amaç:** Hikâyenin kalbi: eldiven paketi açılır (P01), rüşvet (P07–P08), şifre masası (P10), gizli çentik (P11).

**Dönem ve kaynak**
- Tours istasyonu, müdür + yardımcı [A]. Odanın içi **taş duvar, ahşap tavan kirişleri, tek küçük pencere, halat makaraları, fıçı, raf** (kaynak değil; `final/S06.png` eski storyboard kompozisyonu referans [T]). Tours/Loire bölgesi yapı taşı **tuffeau** (beyaz-krem kireçtaşı) [G], dış cepheye geçerken önemli.
- **Pencere dışındaki kule: tek direk + T kolu.** Eski `S06.png` pencerede **kafes/pilon (elektrik direği) benzeri bir kule** gösteriyor, bu **Chappe değil** (kafes çelik kule 1850'ler sonrası). Yeni çizimde direk **düz ahşap, tek mast**; kafes yok (yakalanan ihlal).
- Kumanda düzeneği (P11): odanın içinde **küçük T modeli + demir kol + çentikli dişli sektör** (operatör kuleyi iç mekândan kumanda eder) [G]. Çentik sayısı sembolik; sayısı iddia edilmez.
- Aydınlatma: **kare cam fener** (P01, P10; teneke, 4 cam yüz, mum içinde, [G]) ve **şamdanda mum** (P07, P08, P16'da farklı oda). Fener, masa üzerinde pencere kafesli ışık desenini yansıtır (grafik, arşiv hissi).
- Para: altın/gümüş frank, **kâğıt para yok**.

**Düzen (ana plan, orta plan P07–P08 için; 1080×1920)**
- Arka duvar: duvar-zemin birleşimi y ≈ 1400. Sol arka **kapı** x 110–330, y 420–1400 (aralık, dışarısı karanlık; François burada gölgede).
- **Pencere:** x 700–890, y 760–1100 (190×340 = ekranın %17.7'si). Sill zemin üstünden ~0.9 m, memur pencere yanında dururken **başı pencere hizasında**. Dışarıda alacakaranlık/gece gökyüzü, uzakta KD-C kule siluetinin üst yarısı.
- Masa: ön kenar y ≈ 1500, üst düzlem y 1330–1500, x 260–960. Çekmeceler müdür tarafında (sağ), **çekmece ön yüzü masanın alt-ortasında** (P07 dokunuşu).
- Sol duvarda halat bobinleri, sağ duvarda alet askısı, arka sağ köşede fıçı, üst rafta kutular (arka katman, düşük kontrast).
- Kumanda düzeneği: pencerenin sağında, duvara bağlı (P11 insert'inde ana oyuncu).
- Ölçek kuralı: `s(y) = 0.80 + 0.0007·(y − 1420)` (memur y 1440 → 0.81; Louis y 1560 → 0.90).
- Karakter yerleşimi (P07): Louis sol-orta (kese uzatır), müdür masa arkası sağ-orta, memur müdürün arkasında bir adım geride (pencere yanı), François kapı aralığında gölgede. **Oturan figür yok:** rig oturamaz. Masa bacakları gizler.

**P01 ve P10 için "MASA-PLAKA" (tepe-önden yakın):** üst %33 duvar ve **pencere (kadrajın en az %15'i)**; alt %67 masa üst düzlemi. Pencerede T kolu siluet (KD-C). Masada fener (sol), kahverengi paket kâğıdı (orta), eldiven. P10'da bölünmüş ekran iki masa yarısı (sol eldiven, sağ çorap). **Aynı plaka P23'te yeniden kullanılır (bkz. 1.6).**

**Işık varyantları**
| Varyant | Planlar | Anahtar ışık | Dolgu | Gölge yönü |
|---|---|---|---|---|
| A akşam-fener | P01, P10 | fener amber `#ffb357` masa solunda | pencereden mor `#3b2f5c` | **sağ-yukarı** (fener solda alçak) ve kare kafes desen |
| B gece-mum | P07, P08 | mum alttan `#ffcf70` (masa ortası) | pencereden mavi gece `#4a5f94` | **yukarı ve duvara** (alttan ışık, yüzlerde sert gölge) |
| C gündüz-soğuk | P11 | pencereden soğuk gün `#cfdcff` | oda amber `#ffb357` α .15 | pencerenin tersi: **sol-aşağı** |

**Palet:** duvar taşı `#5a5450` (karanlık oda) / `#8a8478` (ışıklı), harç `#3a3632`, tavan kirişi `#3b2818`, masa `#7a5230` (S06'daki çam masa; üst yüzey açık `#a07848`), zemin `#2d2a2c`, pencere gece `#1a2033`, halat `#a07a48`, fıçı `#6a4a2c`, demir `#1c1915`, pirinç `#c9a24a`.
**Perspektif:** P07–P08: tek nokta, kaçış (540, 700), kamera göz hizası biraz alçak. P01/P10/P11 insert: ortografik tepe-önden (kaçış yok), vurgu için hafif 8° eğim.
**Türetme:** yeni arka plan. Pencere kulesi `ChappeTower.tsx`'ten (bölüm 1.5). Karakterler Kukla. Efektler: `Glow` (fener/mum), `Dust`, `FilmLook`.
**Motion notları**
- **P01 (şak):** eldiven kâğıttan tamamen çıktığı karede pencere dışındaki gösterge bir adım (45°) döner; tahta menteşe "klak". Kol pencerenin içinde kalır (kenara yapışık değil).
- **P07 (çekmece):** müdür altını sağ elle masa kenarına süpürür (altın masanın içine **düşer**, çekmece açık), çekmece kapanır; "bam" temas karesinde. Kese masa üzerinde kayar (sürtünme + şıngırtı); keseden dökülen madeni paralar ≤ 6 adet, masa yüzeyinde kalır.
- **P08 (irkilme):** pencere dışındaki kolun gıcırdayarak kıpırdaması ile memurun irkilmesi aynı karede. Pencere memurun başına bitişik (soldaki kural: pencere ≥ %12).
- **P11 insert:** kumanda kolu iki eldivenli değil **çıplak** el (memur çıplak elli, bkz. 2.2); fazladan çentik kırmızı `#e5483c` halo (blur 8 px, kısa, neon değil, 0.4 sn). Ter damlası çeneden kol sapına düşer: damla r ≈ 10 px, sap yüzeyinde sıçrar.
- Kapı yalnız François girişi için kullanılır (P07'de zaten içeride); kimse duvardan çıkmaz.

---

### 1.5 KULE-DIS (P12, P13, P17 penceresi, P21, P22)

**Amaç:** Chappe kulesi **imza nesne**; her mekânda tekrar eden motif (pencerede, ufukta, haritada, Wi-Fi morfunda). Bu kart üç varyant ve ortak **kule modeli** tanımlar.

**Kule modeli (ChappeTower'dan türeme)**
- Kaynak: `ChappeTower.tsx` (400×600 viewBox; direk 14×300, regülatör 280×16, göstergeler 12×90, hub `C.gold`). Yapı olarak doğru: **T biçimi, tek direk, 3 kol**. Yel değirmeni çağrışımı yok.
- Önerilen değişiklikler (motion, yeni bileşen `ChappeKule` veya prop):
  1. `armColor` ve `indColor` ayrı parametre. **Varsayılan: tüm kollar `#1c1915` (siyah)**; mevcut bileşendeki kırmızı göstergeler tarihî değil (Chappe kolları siyah boyalıydı [G ◐]) ve P12'de kolu kontrastlı siluet ister. Kırmızı **yalnız** "fazladan çentik" halosu (P11, P14), harita mührü ve Wi-Fi morf son aşaması için ayrılır.
  2. Kol yüzeyi: **jaluzili (kepenkli) kanatlar** [G ◐], 5 ince çizgi (ışıklı yüzde açık ton α .25); küçük ölçekte görünmez, yakında görünür. Uçlarda karşı ağırlık (küçük dikdörtgen), pivotlarda altın perçin (`C.gold` r 8).
  3. Direk dibine iki ahşap payanda (A-şekli), ağır ahşap çerçeve [G ◐].
  4. Bina: ChappeTower'daki üçgen çatılı kutu yerine **piramit arduvaz çatılı taş kulübe** (S01 storyboard'daki gibi), kapı + küçük pencere + pencere ışığı.
  5. `size` yerine `viewBox` korunur; çatı ve zemin sahne tarafından kırpılabilsin diye bina ayrı katman.
- **Adlandırılmış kol konumları** (regülatör ° / sol gösterge ° / sağ gösterge °; 45° adımlı yedi konum [A: 7 konum]; açı değerleri yaklaşık, motion `ChappeTower` eksenlerine göre ince ayar):

| Ad | Reg | Sol | Sağ | Kullanım |
|---|---|---|---|---|
| DINLEN | 0 | 0 | 0 | P17 sonu ("klunk"), P22 başlangıcı |
| ILK | 0 | 45 | −45 | P01 başlangıç |
| SAK | 0 | 90 | −45 | P01 "şak" (tek gösterge bir adım) |
| MESAJ-A | 0 | 90 | −90 | P11/P13 |
| HATA | 0 | 135 | −90 | **fazladan çentik:** MESAJ-A'dan tek gösterge +45° (P11, P13, P14) |

**Varyantlar**
- **KD-A: Tours istasyonu dış, gündüz (P21).** Kapı yakın plan/orta plan. Cephe **tuffeau** krem `#e3dcc6`, gölge `#b5ad94`; çatı **mavi arduvaz** `#3c4660` [G ◐]; kapı ahşap `#5a3d28` demir bantlı; kapı pervazı taş `#c9c0a6`. Gökyüzü açık `#cfdcff → #f2e8c9`. **Işık sol-üst, gölge sağ-aşağı.** Kule bina çatısında, kameranın üstünde kadrajın üst yarısına girer (yukarıda kule).
  - **İlan (P21):** beyaz kâğıt `#efe9d8` (resmî ilan beyaz kâğıtta basılırdı [G ◐]), 38×54 cm oranı; tepede 3 şeritli (mavi `#2a3f7e` / beyaz / kırmızı `#a8262c`) 24 px tricolore bandı, başlık bloğu (iki kalın satır siluet), 2 sütun metin çizgileri (okunmaz, `#4a4237` α .55), altta **kırmızı balmumu mühür** (`#b3261e`). 4 köşe **kare başlı el yapımı demir çivi**; çivi çakma temas anları olay listesine (tak, tak, TAK).
  - **Kapı mandalı (sürgü):** *düşen mandal* (loquet): kapıya bağlı yatay demir çubuk, sol ucu perçin pivot, çıkıntıya yaslı. Titreşimle 20° döner ve pervazdaki demir kancaya (cramponnet) oturur. Fizik doğru ve görsel: "klank". İlanın hemen altında, el hizasında. Insert 1 sn, ekranın ≥ %10'u.
- **KD-B: ara kule (P12 göz → P13 orta/geniş), gündüz.** **Kesit (cutaway) kule:** ön duvar çıkarılmış, iç mekân görünür (telgrafçı, kumanda kolu, tripoda dürbün); yan duvar kalın taş kesit; çatıda direk + T kolu. Ufukta soldan **Tours kulesi** (uzak küçük T, sola/Paris'e), sağda **sıradaki kule** (P13'te kopyalar). Peyzaj: düz Loire/Poitou ovası, ince tarla çizgileri, birkaç kavak. Kaynak: kuleler 5–15 km arayla, her kulede iki dürbün [A]; kesit sunum tercihi [T].
  - Gökyüzü gündüz `#cfdcff → #f2e8c9`; ova `#9aa06a`/`#7d8a56`; taş kesit `#c9c0a6` / iç duvar `#8a8478`; zemin ahşap `#7a5230`.
  - Dürbünler **tek tüp (lunette), teleskopik**; çift gözlü (8 şekilli) dürbün **yok** [G]. P12 POV maskesi tek **daire** (pirinç halka, 28 px, iç vinyet siyah). P14'te maske yok (kullanıcı kararı).
  - P12 aşırı yakın göz: arka plan düz bulanık gök + pirinç dürbün kenarı; kaş alanı üst yarıyı doldurur (rig `browF` +1).
  - P13: telgrafçı kendi kumanda kolunu çevirir; esneme (`agiz "A"`, büyük ağız, ≥ %15 yüz). Kamera geri çekilince **sıradaki kule** ufukta, kolu aynı ağırlıkta (HATA) kopyalar.
- **KD-C: alacakaranlık siluet (P17 pencere, P22).** Gökyüzü: `#1d1838 → #3b2f5c → #8a5a6e → #d98a5a` (üst → ufuk). Kule `#1c1915` siluet, kenar ışığı amber `#ffb357` α .5 tek kenarda. **P17:** yatak odası penceresinden görünen uzak kule, ekranın ≥ %12'si (≥ 230 px) ve kollar P17 sonunda DINLEN'e iner ("klunk").
**Perspektif:** KD-A ve KD-B ortografik/hafif tek nokta, kaçış (540, 900); KD-B kesitte iç oda 2D (derinlik gerektirmez), ufuk çizgisi y ≈ 1050.
**Türetme:** `ChappeTower.tsx` (bina + direk + kollar), `Efektler.tsx` `Clouds`, `Birds` (P13 ufukta ≤ 3 kuş, opsiyonel).
**Motion notları:** kol hareketleri yalnız 45° adımlar + 3 kare "klak" oturması (60 fps'de 6 kare); kollar **asla sürekli dönmez**. Kule menteşe foley'i her adımda. Ufuktaki kopya kule kendi gecikmesiyle hareket eder (0.35 sn).

---

### 1.6 PARIS-AVLU (P09 avlu · P23 masa)

**Dönem ve kaynak**
- Paris posta avlusu: taş avlu, **kemerli araba kapısı (porte cochère)**, 2–3 katlı taş bina, arduvaz mansard çatı, Haussmann öncesi (bakınız Sokak cephe sistemi) [G]. Paris'teki tek konum iddiası yok; "bir posta avlusu" [S].
- Posta arabası: `final/araba-yesil.png`'deki **kahverengi gövde üstü / krem alt gövde** "Postes" arabası (Harita'dakiyle **aynı araba**, süreklilik). Çatıda bagaj çatısı/kafesi, kapı levhası "POSTES" ve **sarkık krem etiket "TOURS"** (P09, 60 px yükseklik, Playfair 900, mürekkep). Arma sadeleştirilir (bkz. 1.2).
- Paketler, posta çuvalları (`sacs`), ağaç tezgâh. Kâğıt para yok.
- **Paris'te Chappe kulesi:** Paris–Lille hattı Paris'ten başlar [A: Paris–Lille 15 kule]; P23 masa plakasında penceredeki kule bu hattın bir kulesi olarak okunabilir, **konumu belirtilmez** (Açık soru 10).

**P09 avlu katmanları**
1. Arka: taş cephe + kemerli kapı (karanlık geçit), arduvaz çatı, baca. Duvar dibinde posta çuvalları.
2. Orta: **posta arabası** yandan (gövde + 2 tekerlek; atlar kadraj dışı sol, yani yola dönük), çatıda bagaj, **arabacı** kutusunda (siluet, kahverengi tonlar).
3. Ön: sol alttan kadraja uzanan **gri manşetli eller** (bölüm 2.8) paketi arabanın tepesine fırlatır; ön plan tezgâh kenarı + çuvallar.
**Palet:** taş `#b9ad92 / #8f8470`, arduvaz `#3c4660`, kalaş (kaldırım taşı) `#6a6458 / #4a463e`, araba üst `#3a2a1c`, alt `#d9c9a0`, tekerlek `#3a2a1c` + jant `#c9a24a`, paket kâğıdı `#b08a5a`, ip `#d8c9a0`, çuval `#a89870`, TOURS etiketi `#efe9d8`.
**Işık:** gündüz, güneş sol-üst; **gölge sağ-aşağı** (araba gölgesi zemine sağa uzar). Hafif sıcak bulutlu gün, çarpıcı kontrast yok.
**Perspektif:** orta plan, hafif yukarıdan: kaçış (540, 860); araba yan profil (ortografik), avlu zemini perspektifli. Ölçek: `s(y) = 0.70 + 0.0008·(y − 1200)`.
**Motion notları (dokunuş: paket kayma/arabacı ayağı)**
- Paket fırlatma: el kadraja soldan girer, paket parabol çizer, **bagaj çatısının ahşap yüzeyine** iner ("huf" → "tahtada sürtünme"). Kayar, **çatı kenarına** varmadan arabacı **çizmesiyle** paketin köşesine basar ("tap"). Çizme paketin içinden geçmez; temas köşesi görünür. Çizme koyu deri `#2a1d14` + parlak kenar `#7a5a3c`.
- Eller her zaman **kadraj kenarından** girer/çıkar (soldan), duvardan değil.

**P23 masa (loop kare):**
- **Kural:** P23'ün son karesi, P01'in ilk karesi ile aynı **MASA-PLAKA**dır (bölüm 1.4). Aynı fener, aynı pencere/kule, aynı kâğıt/eldiven yerleşimi. Fark yalnız ellerdir: P01'de memur eli (çıplak, ince, titrek), P23'te **gri manşetli eller** (Paris). Sahne bağlamı Paris olarak "avlu tezgâhı" altına açılan aynı oda çerçevesine oturur; masa üstünde sadece paket ve fener olduğu için mekân ayrıntısı okunmaz.
- Alternatif (eleştirmen seçsin): P23'te pencere dışında Paris çatı hattı değil, kule siluetinin kendisi kalır. Mevcut seçim: **aynı plaka** (döngü kusursuz olur).
- Katlama kâğıdı: kenar kıvırma → ip fiyonk (3 poz, bölüm 2.8). Son kare kâğıt yarı açık, eldiven ortada (P01 ilk karesi).
**Türetme:** yeni arka plan (avlu), araba `araba-yesil.png` (kromakey) ya da vektör redraw; masa = TOURS-KULUBE-IC MASA-PLAKA.

---

### 1.7 CATI-BORDEAUX (P06) — şafak, çatı terası

**Dönem ve kaynak**
- Bordeaux çatıları: oluklu kiremit (**tuile canal**) + arduvaz karışımı, baca grupları, kireçtaşı bacalar [G ◐]. Ufukta Garonne'un hilal kıvrımı, sis, gemi direkleri (P04 ile tutarlı), **Pont de pierre (1822, taş köprü, 17 kemer)** silüeti [G]. Pont de pierre sadece ufuk katmanında, çok küçük/sis içinde; konum iddiası değil.
- Güvercin kafesi: **hasır (osier) kafes**, ahşap taban; güvercin "posta güvercini" [A: posta güvercinleri].
- Cep saati: bölüm 3. **Savonnette (kapaklı)** altın saat.
- Şafak: gün doğumu soldan (doğu); sinyal/haber akışı da soldan geldiği için tutarlı.

**Katmanlar**
1. **Arka:** şafak gökyüzü (üst `#5c6a9a` → orta `#d89a8a` → ufuk `#f2b27a`), güneş diski ufukta sol (`#ffd9a0`, kısmen sis arkasında), Garonne bandı, direkler, Pont de pierre silüeti (`#6a6a8a` α .6).
2. **Orta:** çatı manzarası (kiremit `#9a5a3c` / arduvaz `#3c4660`), bacalar (`#8a7a6a`, tuğla uçlar `#8a5a42`). Chappe kulesi P06'da görünmez (Louis güvercini deniyor, kule henüz hikâyede yok).
3. **Ön:** taş korkuluk (parapet) kısa (dize kadar), Louis (tam Kukla, orta plan = bel üstü), **kafes** (parapet üstünde), sol elde saat, tuğla zemin terası.
**Palet:** çatı kiremit `#9a5a3c`, kiremit gölge `#6a3a28`, korkuluk taş `#c4b08a`, gölge `#7a6a52`, hasır `#a07a48`, güvercin gri-beyaz `#dfe2ea` + kanat çubukları `#4a5062` + boyun `#6a8f86`, tüy `#cfd3dc`.
**Işık:** güneş **sol-alçak, ufukta**; kenar ışığı sıcak turuncu (`#ffb357`) karakterin sol kenarında. Gölgeler **sağa ve uzun**. Louis `facing = -1` (ışığa bakar). Güvercin **sola** (güneşe, Paris yönüne) uçar → arkadan aydınlanmış silüet.
**Perspektif:** orta plan, hafif aşağıdan: kaçış (540, 1000) (ufuk çizgisi y ≈ 1000, Louis'nin göğsü). Ölçek: Louis `s ≈ 1.0` (orta plan, ayak kadraj dışı).
**Türetme:** yeni arka plan; çatı kiremit/arduvaz desenleri `Sokak.tsx` çatı bölümünden (arduvaz sıraları, mahya, baca); Kukla; `Birds` (tek güvercin için özelleştirilir).
**Motion notları**
- Kafes kapağı açılır (tahta "tak"), güvercin çıkar; **tek tüy** kanattan kopar, salınarak saatin camına düşer (cam üstünde kısa duraklama, "tık"), Louis tüyü fiske ile atar, **saat kapağı kapanır** ("çat"). Saat insert'i ekran yüksekliğinin ≥ %20'si (≥ 384 px).
- Güvercin kadraj kenarından çıkar, fade yok.

---

### 1.8 CATI-KATI (P14, P15 üst yarı) — Bordeaux çatı katı, gündüz

**Karar:** P14 dürbün **maskesiz** (kullanıcı kararı). Odak kayması tüm kadrajın netleşmesiyle verilir.

**Dönem ve kaynak**
- Çatı katı (mansarde): eğik tavan, açık ahşap kirişler, **çatı penceresi (lucarne)** ve panjur [G]. Pencere dışı: Bordeaux çatıları, ufukta **şehir kenarındaki tepede kule** [A: suç ortağı kuleyi izler; kulenin Bordeaux'daki tam yeri araştırmada yok, "tepe üstü uzak kule" çizilir].
- **Tek tüp pirinç teleskop, ahşap/pirinç üç ayaklı sehpa** [G] (bölüm 3).
- Masa: defter, mürekkep hokkası, kaz tüyü, cep saati; **altın ve gümüş frank yığınları** (P15 üst yarı), kadeh ve şarap şişesi (Bordeaux, François'nın kadehi).

**Katmanlar**
1. **Arka (pencere duvarı):** pencere sol-merkezde: x 80–620, y 400–1250 (540×850). Dışarıda çatılar ve **uzak kule** y 520–900 (≥ 380 px = %20; HATA konumu, ince kırmızı halka çizilir ama P14 sonunda).
2. **Orta:** suç ortağı (Kukla, profil, `facing = -1`) sehpanın yanında eğilmiş; **sehpa + teleskop** pencereye doğru (sol) uzanır. Arka planda, kadrajın sağ yarısında **masa + Louis** (ayakta, scale ≈ 0.55, küçük, bekliyor).
3. **Ön:** ön plan kiriş (üst kenar, çerçeve), sağ altta sandık/çuval, yer tahtası.
**Palet:** kiriş `#3b2818 / #5b3d25`, sıva `#b9ad92 / #8f8470`, tahta zemin `#7a5230`, pencere dışı gök `#cfdcff → #f2e8c9`, çatılar `#9a5a3c / #3c4660`, uzak kule `#5a5a70` (sis içinde, netleşince `#1c1915`), pirinç `#c9a24a / #f1d48a / #7a5a1f`, sehpa ahşap `#5b3d25`.
**Işık:** güneş pencereden **soldan**, içeri uzun dikdörtgen ışık yamuğu zeminde sağa uzanır. **Gölgeler sağa** (suç ortağı gölgesi masaya uzanır). Suç ortağı pencereye (ışığa) bakar (facing −1) → kenar ışığı doğru taraf.
**Perspektif:** tek nokta, kaçış (540, 880); eğik tavan çizgileri sağda yükselir. Ölçek: `s(y) = 0.60 + 0.0008·(y − 1200)`; suç ortağı y 1420 → s ≈ 0.78; Louis y 1180 → 0.58.
**Türetme:** yeni arka plan; Kukla (SUC_ORTAGI paleti); kule `ChappeKule` (KD modeli, küçük).
**Motion notları**
- **Odak (dokunuş):** tüm kadraja `blur(12px) → 0` (24 kare, ease-out), 1 sn netlik tutulur; netleşirken uzak kule HATA konumu seçilir, suç ortağı teleskopu **tek hamlede kapatır** ("şlak", teleskopun teleskopik kısmı iç içe geçer, temas karesinde). Kapanma sırasında teleskop sehpadan **ayrılmaz**.
- Suç ortağı ayakları zemin tahtalarında, temas gölgeli.
- **P15 üst yarı:** aynı masa, yakın insert, ≥ %10 boyutlu yıllık takvim levhası (bölüm 3). Altın yığını **büyür** (üç kez), her eklemede küçük "şıng".

---

### 1.9 YATAK-ODASI (P16, P17)

**Dönem ve kaynak**
- Taşra yatak odası: ceviz yatak, ağır yün battaniye, çarşaf, yastık, **gece takkesi (bonnet de nuit)** [G ◐], komodin, mum [S: "tek mum"], pencere dışı uzak kule [S].
- **Hastalığın niteliği:** "ağır hasta"; ölüm gösterilmez [A: çelişki; FR öldü, S hastalandı]. Memur nefes alıyor, hareketli.
- Tricolore/mimari ayrıntı yok.

**Düzen**
- Yatak alt yarıda: y 1000–1500. Baş ucu solda, **memurun başı** x 330–480, y 880–1040 (yastıkta, hafif yana).
- **Pencere:** sol-arka, x 80–300, y 480–860, dışarıda **uzak kule** (KD-C) ≥ 230 px (%12).
- Komodin: sağda, üzerinde **tek mum** (şamdan, pirinç) + su bardağı. Mum x ≈ 900, y 1180.
- **Eldiven:** memurun sağ elinden yorgana, oradan **yatak kenarından** yere düşer; yer: tahta parke, kadraj alt kenarı içinde (insert yer seviyesinde).
**Palet:** duvar `#4a4238 / #6a5f52`, yatak ahşap `#3b2818`, yorgan `#6b5a4a` (soluk desen çizgileri `#5a4a3a`), çarşaf `#d8d0bb`, yastık `#e8e0cc`, takke `#e8e0cc`, parke `#5a4630 / #3b2c1c`, pencere mavi `#4a5f94`, mum `#ffcf70` + halo `#ff9a40`.
**Işık:** **iki kaynak.** Anahtar: mum (sağ-alçak, amber) → yüzde sert gölge **sola/yukarı**. Dolgu: pencere soğuk mavi (sol-arka) → yatak üstünde soğuk kenar. Solgun yüz için sıcak yerine soğuk baskın.
**Perspektif:** yavaş push-in; tek nokta kaçış (540, 900); yatak yan-yarı üç çeyrek görünüm.
**Türetme:** yeni arka plan; Kukla `MEMUR_YATAK` paleti; yatay rig sorunu: **Kukla yatamaz**. Çözüm: yorgan çokgeni gövdenin önünde, gövde `lean ≈ 60–70°` ve bacaklar tamamen yorgan altında, yalnız baş + omuz + sağ kol görünür; kafa `headTilt` yana. Takke = baş üstüne bindirilmiş yumuşak koni (Kukla dışı overlay).
**Motion notları**
- P16: eldiven elden kayarken **yorgan yüzeyinde sürtünür** (soluk yün sesi), kenardan **düşer**, parkeye "yumuşak" temas (insert); eldiven buruşuk, beyaz `#f4efe2` lekeli gölgelerle.
- P17: memur başını çevirir ve **kimliği belirsiz gölgeye** (kadraj dışı sağda, yalnız bir silüet omzu) fısıldar. Fısıltı bitince pencere dışı kule DINLEN'e iner, "klunk" (uzak, boğuk).

---

### 1.10 MAHKEME (P18, P19)

**Dönem ve kaynak**
- Tours Ağır Ceza, Mart 1837 [A].
- **Lambri (ahşap panel)** duvarlar, yüksek pencereler, ahşap kürsü ve **sanık sırası korkuluklu** [G]. **Tricolore sarkık bayrak + kral büstü** arka duvarda (1830'dan beri tricolore [CLAUDE]; büst yüzsüz siluet, bir bakışta okunur [G]). **Çarmıh/haç yok** (1830 sonrası mahkemelerden kaldırıldığı bilgisi [G ◐]).
- **Yargıç kıyafeti:** başkan yargıç **kırmızı cübbe (robe rouge) + beyaz rabat (iki beyaz şerit) + siyah toque** [G ◐; Assize mahkemesi başkanı için], iki asesör siyah cübbe. Doğrulanmazsa tümü siyah cübbe, kırmızı yalnız damga/mühürde kalır.
- **Jüri bankı eklenmez** (Ağır Ceza'da jüri var ama araştırmada yok; jüri sorunu için bkz. Açık soru 4).
- **Tokmak uyarısı:** Fransız mahkemelerinde başkan **tokmak değil, el çanı (clochette/sonnette)** kullanır [G ◐]. Senaryo P19 "Tokmak iner (aşırı yakın) … TAK" diyor. Tasarım iki prop da çizer (bölüm 3); **varsayılan tokmak (onaylı senaryo)**, öneri **çan** (Açık soru 1). Karar kullanıcıda.
- **Yargıç masa saati:** duvar saati yuvarlak, beyaz mineli kadran, Roma rakamı, siyah ibreler (P18 dokunuşu).
- Gendarme siluetleri (bicorne şapka) sanık sırası iki ucunda [G], isteğe bağlı kompars.

**Katmanlar**
1. **Arka:** lambri duvar, sarkık tricolore (sol-üst), kral büstü konsolda (üst-orta), **yuvarlak duvar saati** üst üçte birde (x 800–1020, y 350–570; çap ≈ 220 px = %11.5), yargıç kürsüsü (3 koltuk), arkada koyu.
2. **Orta:** yargıç siluetleri (kırmızı/siyah cübbe), **katip masası** (kürsü altı sol), seyirci bankları (siluet).
3. **Ön:** sanık sırası + korkuluk, **iki kardeş** (Kukla, mahkeme kıyafeti: şapka diz üstünde ya da elde; eldiven cepte), jandarmalar yanlarda; alçak açı → ön plan zemin tahtaları.
- Sol duvar: üç yüksek kemerli pencere; **toz huzmeleri** pencerelerden **sağ-aşağı 28°**, `mix-blend-mode: screen`, degrade `#fff1c8` α .22 → 0.
**Palet:** lambri `#3b2818 / #5b3d25`, vurgu `#7a5532`, zemin `#2d2118`, kürsü `#2f2016`, yargıç kırmızı `#8f2a22` / gölge `#5e1a15`, siyah cübbe `#1c1915`, rabat `#efe9d8`, toque `#1a1418` + altın şerit `#b8862b`, tricolore `#2a3f7e / #d9d4c8 / #a8262c`, huzme `#fff1c8`, toz `#fff1c8` α .5.
**Işık:** güneş pencerelerden **soldan-üstten**; **gölgeler sağ-aşağı**, pencere kafesli gölge zemine uzar. Karakterler (sanık sırası) **sola** (ışığa/pencereye) bakar; P19'da kamera sanık sırasına çevrildiğinde `facing = -1`.
**Perspektif:** **alçak açı**, kaçış (540, 1150), yatay ufuk y ≈ 1150. Düşey çizgiler yukarı %4 yakınsar (keystone). Ölçek: sanık sırası y 1560 → s ≈ 0.95; yargıç kürsüsü y 1000 → s ≈ 0.55.
**Türetme:** yeni arka plan; yargıçlar **Kukla dışı statik siluet** (cübbe overlay + toque; yalnız baş dönmesi/el); iki kardeş Kukla (`FRANCOIS`/`LOUIS`, `LOUIS_ELSIZ` bölüm 2); `Dust`, `Glow`.
**Motion notları**
- **P18:** sessizlikte saat yelkovanı **bir kez sert zıplar**; saat ışık huzmesinin üstünde (huzme saati ışıtır).
- **P19:** tokmak/çan insert'inde temas yüzeyi: ahşap **tabla**; "TAK" + kısa reverb temas karesinde. François yavaş gülümser (`agiz "gulumse"` → `"sirit"`), Louis kımıldamaz. Louis **çıplak elle** başlar; cepten **beyaz eldiveni** çıkarır (kadrajda görünür, süreklilik), parmak parmak giyer. Giyme insert'i el boyutu ≥ %20 (bölüm 2.2 ve 3). **BERAAT** damgası (T4) tokmak vuruşuyla aynı karede iner.

---

### 1.11 KANUN-INSERT (P20)

**Dönem ve kaynak**
- **Code pénal (1810)**: koyu dana derisi cilt, sırt bantları (nervür), kırmızı başlık etiketi "CODE PÉNAL", altın harf [G]. Yeşil çuha masa örtüsü (tapis vert) mahkeme masasında [G]. **"Bomboş sayfa" dramatizasyondur** [S], yasadaki gerçek bir maddeyi taklit etmez.
- Sayfalar: iki sütun metin, üstte başlık satırı (okunmaz), alt kısım **boş**; yaş lekeleri (foxing).
**Katmanlar (tepe açı)**
1. Arka: yeşil çuha masa `#2f4a40` (Sokak PANJUR yeşilini yeniden kullanır), ahşap kenar.
2. Orta: açık kanun kitabı (sayfa `#e9dfc9`, kenar `#d6c7a6`, metin çizgileri `#4a4237` α .5), cilt `#5a3a22`, etiket `#8f2a22`.
3. Ön: **yargıcın elleri** (kırmızı cübbe kolu + beyaz rabat uçlu manşet, çıplak el `#d8ae8b`) sayfaları çevirir; elin gölgesi sağ-alta düşer.
**Işık:** tek **çapraz huzme** (soldan) sayfa üstünden geçer; **gölgeler sağ-aşağı**. Toz zerreleri huzmede.
**Perspektif:** ortografik tepe açı; kitap hafif 6° döndürülmüş.
**Türetme:** yeni; `Dust`/`FilmLook`.
**Motion notları**
- Sayfa çevirme: üç hızlı çevirme (flip), son sayfada alt kısım boş, **güve** katlanma çizgisinden kalkar. Güve: soluk kahverengi `#b9a98a`, kanat açıklığı ≈ 190 px (insert'te ~%10), kanat çırpma 8 Hz. Güve **kadrajın üst-sağ kenarından çıkar** (fade yok). Sayfa kâğıdına sürtünme sesi, güve kalkarken kısa kanat sesi.
- Eller sağ üst kenardan girer/çıkar.

---

### 1.12 WIFI-MORF (P22)

**Karar:** Kukla/tahta dokusunda, **neon yok** (kullanıcı kararı). Film içindeki tek modern unsur; bu yüzden **dünyanın malzemesine çevrilir**, dünya ona uymaz.

**Katmanlar**
1. **Arka:** KD-C alacakaranlık gökyüzü (`#1d1838 → #3b2f5c → #8a5a6e → #d98a5a`). Morf ilerledikçe gökyüzü **düz ekran karanlığına** `#0e0d12` geçer (alttan yukarı kararan degrade; neon parlama yok).
2. **Orta:** Chappe kulesi siluet (KD-C) + kamera kollara zoom.
3. **Ön:** **Wi-Fi simgesi, tahta dokulu:** 3 yay (dış `r = 520`, orta `350`, iç `180`, kalınlık 80 px) + nokta (`r = 54`). Toplam yükseklik ≈ 575 px (**%30 boy**), genişlik ≈ 735 px, ortada (540, 900).
**Malzeme:** koyu ceviz `#3b2412` (rig'deki baston tonu), yüzey ışık şeridi `#7a5030` α .6, kontur `ink(fill)` (2 → 6 px ölçekte), her yayın iki ucunda **altın perçin** (`#d4ad52`, vurgu `#fff4c0`), ahşap lif çizgileri. Kenar ışığı `#c4d6ff` α .45 sağ kenarda.
**"Yanma":** neon yerine **tahta → altın yaprak (`#b8862b`) renk geçişi** sırayla: nokta → iç yay → orta yay → dış yay (her biri 0.25 sn), geçişte tek bir sürüşlü parıltı (blur ≤ 8 px, α .35). Yani "yanar" = altınlaşma + küçük "tık".
**Morf akışı:** regülatör (yatay kiriş) bükülerek **dış yaya**, göstergeler (kısa kollar) yaylanıp **orta/iç yaylara**, direk kısalıp **noktaya** dönüşür. Aynı sayıda yol noktası (24) ile `d` enterpolasyonu; tahta dokusu morf boyunca sabit (doku yer değiştirmez, şekil değişir).
**Işık/gölge:** kenar ışığı sağdan; şekil altında **kâğıt kesme gölgesi** (4 px, `#000` α .35). Işık kaynağı tutarlı (sağ-üst).
**Perspektif:** düz, ortografik; kaçış yok.
**Türetme:** `ChappeTower.tsx` (kollar) + yeni `WifiMorf` (SVG path). Kukla kullanılmaz.
**Motion notları:** tahta gıcırtısı → dijital "blip" (ses tasarımı). Morf ekranın ortasında, y 600–1200 aralığında; üst güvenli alan (T2 yazı) ile çakışmaz ("İlk siber saldırı" başlığı y 240–400).

---

## 2. Karakter kartları

**Ortak:** rig `Kukla.tsx` (`Poz`, `Palet`); çizgi `SW = 2`; oranlar sabit; aynı yürüme döngüsü `yuru`. Paletlere ve rig eklerine dair "kod bloğu" bölüm 6'dadır.
**Önemli tutarsızlıklar (yakalanan):**
- `karakter/louis-kart.png`: Louis'in elinde **yeşil dolar benzeri kâğıt para** var (sağ alt portre). Kural: **kâğıt para yok** [CLAUDE]. Bu portre yalnızca yüz/kıyafet referansıdır, para sahnesi çizilirken **altın/gümüş frank** kullanılır.
- `karakter/francois-kart.png`: yelek **gri desenli**; rig `FRANCOIS.vest = #6e5a3a` (kahve-altın). Şapka kartta lacivert, rig siyah (`#141317`), senaryo "siyah silindir" der. **Rig/senaryo kanon**, kart sadece yüz referansı. Kardeşleri ayırmak için de kahve yelek (François) ve gri yelek (Louis) kalır.
- Rig tüm karakterlere **eldiven çizer** (`glove` alanı). Senaryo çıplak el ister (P01 memur, P19 Louis'nin eldiveni giymesi, P11). Çözüm: `glove` alanını `skin` ile aynı yap (aşağıda).

### 2.1 François Blanc
- **Rol:** karizmatik, sinsi gülümseyen kardeş; "herkesten önce bilen kazanır".
- **Kostüm (rig kanon):** lacivert frak `#24407a` (koyu `#15264a`, açık `#3c5ea3`), kahve-altın desenli yelek `#6e5a3a` + altın saat zinciri, krem kravat `#f1e8d2`, gri-kahve pantolon `#3a3530`, siyah silindir `#141317` şerit `#2e2c36`, krem eldiven `#e8dcc0`.
- **Silüet farkı:** normal boy silindir (`tall = 1`), **kıvrık bıyık uçları**, bastonsuz, **parlak krem kravat** (karanlıkta boyunda açık leke), favori `1`, kaş ağırlığı `1`. Sağ kolu hareketli (şapka çıkarma, kadeh, el sallama).
- **Mahkeme varyantı:** aynı palet, şapka elde/dizde (`hat` nesnesi), eldiven cepte (`FRANCOIS_ELSIZ`, glove = skin).
- **Oyunculuk:** `agiz` "gulumse" ↔ "sirit"; P04'te tek göz kırpma (`blinkF` 1, yalnız bu planda).

### 2.2 Louis Blanc
- **Rol:** soğuk hesapçı; az hareket, yüz kıpırdamaz.
- **Kostüm (rig kanon):** bordo frak `#74222f` (koyu `#47131c`, açık `#9a3646`), gri yelek `#85878e`, siyah kravat `#16141a`, pantolon `#46464c`, **uzun gri şapka** `#74757c` (`tall = 1.15`, şerit `#2a2a2e`), eldiven gri `#cfc9b8`, **altın topuzlu baston** (sağ el, `cane`).
- **Silüet farkı:** şapka %15 daha uzun ve **açık değerli** (karanlıkta gri leke), dikey baston çizgisi, **kısa düz bıyık**, favori `1.35` (geniş), kaş `1.2`, **siyah boyun** (François'nın parlak boynunun tersi).
- **Elsiz varyantı (P19):** `LOUIS_ELSIZ = {...LOUIS, glove: LOUIS.skin}`. Giydikten sonra eldiven **kahraman beyazı** `#f4efe2` olur (rig'de P19 içinde palet ya da el overlay olarak geçer); P04'te eldiven rig gri kalır. Eldiveni giyme insert'i rig dışı el çizimidir (bölüm 3, "eldiven").
- **P06:** sol elde cep saati; P07: kese; P02: kaz tüyü.

### 2.3 Memur (Tours müdür yardımcısı)
- **Rol:** riski taşıyan, korku ile açgözlülük arasında. Zayıf, **yıpranmış gri ceket, şapkasız** [S]. 1834 → 1836 boyunca daha zayıf, solgun ve öksürüklü.
- **Kostüm:** gri redingot `#6b6a66`, dirsek ve manşet **yama/yıpranma** (`#5a5953` bindirme dikdörtgenleri), soluk yelek `#5a5347` (desensiz), eski keten kravat `#b9b29d`, pantolon `#4b4741`. Çıplak eller. Şapka yok.
- **Silüet farkı:** **şapkasız** (tek şapkasız ana karakter), **dar** (`scaleX 0.86`, `scaleY 1.02` dışarıdan sarmalayıcı), hafif öne eğik (`lean ≈ 6`), seyrek saç. Kardeşlerden gövde genişliği ve baş-şapka siluetiyle ayrılır.
- **Rig türetme:** `MEMUR` paleti; `hat` yok: **Kukla her zaman başa şapka koyar** (`hat` null/undefined ise). Şapkasız için `hat: { x: 0, y: 9999, r: 0 }` hilesi ya da `hatYok?: boolean` ekle (bölüm 5). Dar gövde: `<g transform="scale(0.86,1.02)">` dışarıdan.
- **Evrim:** `MEMUR` (P01–P11) → `MEMUR_HASTA` (P15 alt yarı: daha soluk, göz altı koyu elips) → `MEMUR_YATAK` (P16–P17: gece gömleği, takke, solgun, terli parlama).
- **Oyunculuk:** P08 irkilme (kısa `shF/lean` sıçraması), P11 titrek eller, ter (çeneden damla).

### 2.4 Müdür (Tours istasyon müdürü)
- **Rol:** yaşlı, iri, açgözlü; yalnız P07'de.
- **Kostüm:** zeytin-kahve redingot `#5a4630` (koyu `#3a2c1d`), hardal yelek `#a58a4a` + desen `#d9c47a`, kalın beyaz kravat `#efe6d0`, pantolon `#3d352c`, çıplak elleri ve **kırçıl saç** `#b9b5ab`, **geniş favori** (`sideburn 1.7`), kalın kaş (`1.5`). Şapkasız (iç mekân, şapka askıda).
- **Silüet farkı:** **iri ve geniş** (`scaleX 1.18`, `scale 1.08`), kısa boyun, yelek karnı; memurun **zıttı** (geniş ↔ dar). Renk: sıcak kahve ↔ memurun soğuk grisi.
- **Rig türetme:** `MUDUR` paleti; `breathe` yüksek (genişlik).
- **Oyunculuk:** P07'de altını tek hamlede süpürür, çekmeceyi çarpar (kararsızlık yok); göz kese kilitli.

### 2.5 Ara-kule telgrafçısı (P12, P13)
- **Not (isim):** İstekte "Tours telgrafçısı" yazıyor. Senaryoda ise P12'de **"Sıradaki kulede bir telgrafçı Tours kulesine bakıyor"**; yani Tours'taki memur değil, **Tours'tan sonraki ara kule görevlisi**. Bu kart ara-kule telgrafçısı olarak çizilir; Tours memuru (2.3) ayrı karakter. (Açık soru 2.)
- **Rol:** bürokratik kayıtsızlık, ironinin yüzü: şüphelenir, omuz silker, esner.
- **Kostüm:** zeytin yeşili iş redingotu `#4f5a3e`, **hardal yün atkı** `#c79a3a` (rig'de `cravat` olarak, atkı gibi okunur), soluk yelek `#7a6a48`, pantolon `#3e3a34`. Çıplak eller. Şapkasız.
- **Silüet farkı:** zeytin yeşili + hardal atkı (diğer tüm karakterlerden renkle ayrılır), şapkasız, **kalın kaşlar** (`browHeavy 1.3`), yumuşak yuvarlak duruş (omuz silkme). Kuledeyken rüzgârda atkı ucu salınır (overlay şerit, 8 px).
- **Rig türetme:** `TELGRAFCI` paleti; `browF/browB` (+1) P12 kaş kalkması; `agiz "A"` + `headTilt` geriye P13 esneme.

### 2.6 Suç ortağı (Bordeaux)
- **Rol:** "dürbünün ucunda" bekleyen gözcü [A: kuleyi izleyen suç ortağı; "eski telgraf memuru" tek kaynakta, kullanılmaz].
- **Kostüm:** toprak kahve redingot `#4a3a2c`, hardal yelek `#7d6a3f`, siyah kravat `#2b2a30`, pantolon `#34302b`, çıplak el, kısa koyu saç, şapkasız (çatı katında).
- **Silüet farkı:** **kahverengi toprak tonları** (kardeşlerin mavi/bordosundan ayrılır), teleskopa **eğik duruş** (profil), tek gözü kapalı. Kardeşlere benzemesin diye favori `1.1`, bıyık yok kabul (rig'de `louis` bayrağı `false`, bıyık stili François'ya benzer; küçük ölçekte ayırt edilir).
- **Rig türetme:** `SUC_ORTAGI` paleti; `facing = -1`; `lean ≈ 25`, `headTilt` teleskopa. `blinkF = 1` (kapalı göz) süreyle sabit.

### 2.7 Katip (Borsa)
- **Rol:** tahtaya fiyat yazar; tebeşir kırılır.
- **Kostüm:** siyah kâtip redingotu `#2d2b28`, gri yelek `#8a8a80`, **siyah kol koruyucuları** (lustrin) overlay (`#1a1917`) [G ◐], çıplak eller, gri saç.
- **Silüet:** küçük ölçek (`s ≈ 0.55`), yüz detayı yok (siluet filtresi uygulanabilir ya da `KATIP` paleti ile). Sol kolu tahtada yukarıda.
- **Rig türetme:** `KATIP` paleti; kol yüksek (`shF ≈ −150`) yazı jesti.

### 2.8 Paris'teki gri manşetli eller (P09, P23)
- **Rol:** Paris'te paketi hazırlayan, yüzü hiç görünmeyen adam [S]. Yalnızca **eller + manşet**. P09'da "gri manşet", P23'te **aynı manşet** (görsel imza: tekrar eden süreklilik).
- **Çizim (Kukla dışı, el sprite seti):** çıplak el `#d3a784` (gölge `#a77b5f`), **gri yün kol/manşet** `#7c7f87` (koyu `#55575e`), **iki siyah düğmeli manşet** (`#1c1915`), manşet altında 8 px kolalı gömlek kenarı `#e9e3d2`.
- **Pozlar (3 poz/plan):**
  - P09: fırlatma (açık el, kol uzanmış, sonra bırakma).
  - P23: 1) eldiveni kâğıda yerleştirme, 2) iki el katlama (kenar kıvırma), 3) ip çekme (fiyonk; ip yolu spline, uçlar `#d8c9a0`).
- **Kadraj:** eller kadrajın kenarından girer/çıkar; arkada bedeni yok.

### 2.9 Arabacı (P09)
- **Rol:** posta arabasının kutusunda; ayağıyla paketi durdurur.
- **Kostüm:** ham keten bluz `#b8a882`, deri yelek `#5a3f28`, pantolon `#4a3b2c`, **geniş kenarlı yağmurluk şapka** `#2b2420`, **diz üstü çizme** `#2a1d14`.
- **Çizim:** Kukla **oturamaz**; arabacı **özel statik oturan figür** (gövde + bacaklar), yüzsüz siluet, yalnız **sağ bacak/çizme** animasyonlu (paketi durdurma). Üst gövde hafif öne eğik, `Poz`'a bağlı değil.
- **Fizik:** çizme paketin köşesine temas eder, içinden geçmez; arabacı koltuktan düşmez.

### 2.10 Kompars seti (isimsiz)
- **Borsa kalabalığı** (12–14 siluet), **seyirci** (mahkeme, 8–10 siluet), **jandarma** (2 siluet, bicorne şapka [G]), **yargıçlar** (3: 1 kırmızı + 2 siyah cübbe, statik siluet).
- Hepsi yüzsüz, siluet filtresi, ayak temas gölgesi.

---

## 3. Prop listesi

Foley/temas sütunu, `Temas = ses` kuralı için: görünür her temas bir olay listesi satırıdır.

| Prop | Dönem notu | Boyut / renk | Planlar | Temas yüzeyi ve ses |
|---|---|---|---|---|
| **Eldiven (kahraman)** | Dana/kuzu derisi (glacé) erkek eldiveni; beyaz/krem [G]. Ön yüzde üç çizgili süs dikişi (küçük ölçekte eldiveni "eldiven" yapan imza). | `#f4efe2`, dikiş `#b9ad92`, kontur `ink` | P01, P10, P16, P19, P23 | kâğıt hışırtısı, masa "tıf", P16 yer "yumuşak tak". Pozlar: düz, buruşuk (P16), giyilen (P19: parmak parmak, deri gerilme sesi) |
| **Yün çorap** | El örgü koyu yün, topuk yamalı [G]. | `#4b3a2c`, yama `#6a5340`, bant `#a07a48` | P10 | masa kenarından **pörsümüş sarkar** (flop) |
| **Paket kâğıdı + ip** | Kahverengi/gri paket kâğıdı + kenevir ip (ficelle) + balmumu mühür [G]. Etiket: "TOURS". | kâğıt `#b08a5a` (gölge `#8a6a40`), ip `#d8c9a0`, etiket `#efe9d8` | P01, P09, P10, P23 | kâğıt hışırtısı, ip gerilme "zıııt", paket çatıda tahta "huf/tap" |
| **Altın kesesi + frank** | Deri/kadife kese, bağcıklı (bourse). **Altın 20 frank, gümüş 5 frank (Louis-Philippe I)** [G]; **kâğıt para yok** [CLAUDE]. | kese `#3e3426`, bağ `#a07a48`; altın `#d4ad52` (kenar `#5a4018`, parlak `#fff4c0`); gümüş `#c9ccd2` (kenar `#6a6e78`) | P07, P15, P02 (defter yanı) | kese masada kayma, madeni para şıngırtısı, çekmece "bam" |
| **Cep saati** | **Savonnette (kapaklı) altın cep saati**, beyaz mine kadran, Roma rakamı, ince Breguet ibreler [G]. | kasa `#d4ad52`, kadran `#f2ecd8`, ibre `#1c1915` | P06 (insert %20), P15 | kapak "çat", cam üstü tüy "tık" |
| **Dürbün (pirinç)** | **Tek tüp teleskop (lunette), teleskopik**, deri kaplı orta bölüm; çift gözlü yok [G]. Sehpa: 3 ayaklı ahşap. | pirinç `#c9a24a / #f1d48a / #7a5a1f`, deri `#5a3a22`, sehpa `#5b3d25` | P12, P13, P14 | açılma "kırt", kapanma "şlak", sehpa zemin "tak" |
| **Baston** | Siyah-kahve ahşap, altın topuz [rig]; ucu zemin hizasında. | `#3b2412`, topuz `#d4ad52` | P04 (fare), P06, P18 | kaldırım "tak" (P04, temas karesi) |
| **Takvim levhası** | **Yıllık duvar takvimi levhası**; tek sayfa basılı takvim ("1834", "1835", "1836"). Günlük kopan yaprak 1830'larda yaygın değil [G ◐]. Didot tarzı yıl rakamı = Playfair Display 900. | kâğıt `#e9dfc9`, mürekkep `#1c1915`, kenar `#d6c7a6`; ≥ 190 px yükseklik | P15 | levha yırtılma "çıt", omuza konma yumuşak |
| **Tokmak** (varsayılan, senaryo) | **Fransız mahkemesinde tokmak kullanılmaz, el çanı kullanılır** [G ◐]. Anglo-Amerikan görsel dil. | ceviz `#5a3a22`, boyun `#3b2412`; masa tablası `#2f2016` | P19 | "TAK" + reverb |
| **El çanı (öneri alternatif)** | Pirinç el çanı (clochette), başkanın masasında [G ◐]. | pirinç `#c9a24a`, sap `#5b3d25` | P19 (alternatif) | çın + kısa reverb (vuruş hissi azalır) |
| **Kanun kitabı** | Code pénal (1810), koyu dana derisi, sırt bantları, kırmızı etiket [G]. | cilt `#5a3a22`, etiket `#8f2a22`, altın harf `#b8862b` | P20 | sayfa çevirme hışırtı, kapak ağırlığı |
| **İlan** | Resmî ilan beyaz kâğıt, üstte tricolore bandı, kırmızı mühür [G ◐]. | `#efe9d8`, mühür `#b3261e` | P21 | çivi darbeleri "tak-tak-TAK" |
| **Demir mandal/sürgü** | Düşen mandal (loquet) + cramponnet; el yapımı demir [G]. | `#1c1915`, ışık kenarı `#9fb3ea` α .35 | P21 | titreşim, "klank" |
| **Güvercin** | Posta güvercini [A], gri-beyaz | bölüm 1.7 | P06 | kanat çırpma, tüy |
| **Kafes** | Hasır kafes | `#a07a48` | P06 | kapak "tak" |
| **Kule kolları** | Regülatör + 2 gösterge, siyah, jaluzili [G ◐], T biçimli (yel değirmeni **asla**). | bölüm 1.5 | P01, P08, P11–P14, P17, P21, P22 | menteşe "klak", gıcırtı |
| **Kumanda düzeneği** | Oda içi küçük T modeli + demir kol + çentikli sektör [G]. | demir `#1c1915`, pirinç perçin `#c9a24a` | P11 | çentik "tık-tık-TIK" |
| **Fener** | Kare cam fener, tenekeli, mum içinde [G]. Masada, pencere kafesli ışık deseni. | teneke `#6a6a70`, cam `#ffd98f` α .8 | P01, P10 | masaya konuş "tık" |
| **Şamdan + mum** | Pirinç şamdan, tiftik/donyağı mum [G]. | `#c9a24a`, alev `#ffcf70` | P07, P08, P16 | masaya konuş |
| **Kaz tüyü + hokka** | 1830'lar yazı aracı [G]. | tüy `#e8e0cc`, hokka `#1c1915` | P02, P15 | kalem cızırtısı |
| **Tebeşir** | Beyaz tebeşir, tahtaya yazı | `#f3eddc` | P02 | kırılma "çıt", seken "tak" |
| **Çekmece** | Ceviz çekmece, pirinç halka | `#7a5230`, halka `#c9a24a` | P07 | "bam" |
| **Duvar saati** | Yuvarlak beyaz mineli duvar saati, Roma rakamı [G] | `#f2ecd8`, çerçeve `#5b3d25` | P18 | "TIK" |
| **Ter damlası** | — | r ≈ 10 px, `#cfdcff` α .7 | P11 | damla "tıp" |
| **Güve** | — | `#b9a98a` | P20 | kanat sesi |

---

## 4. Ekran yazısı tipografisi ve isim etiketi

### 4.1 Teknik sınırlar
- **Yüklü ağırlıklar:** Playfair Display **900**, Inter **500 ve 800**, IBM Plex Mono **500**. **İtalik yok.** Prototipteki `fontStyle: italic` (replik altyazısı) sahte italik üretir; **kaldırılır**.
- **Türkçe büyük harf:** `text-transform: uppercase` yalnız `lang="tr"` ile `İ/ı` doğru çevirir; ya da büyük harf metin doğrudan yazılır (senaryo "ELDİVEN", "BERAAT" doğrudan yazılı).
- **Ok glifi riski:** `theme.ts` unicode aralığı `↑ (U+2191)` ve `↓ (U+2193)` içerir ama **`→ (U+2192)` içermez** (senaryo "Paris → Bordeaux", "1834 → 1836" kullanıyor). Tüm oklar (**→ ↑ ↓**) **SVG yol olarak** çizilir (kalınlık = harf kalınlığı), font glifine güvenilmez. Dosyada font dosyalarındaki gerçek glif varlığı doğrulanmadı (Açık soru 9).
- Güvenli alan: x 80–1000 (maks genişlik 920), üst yazı y ≥ 240, altyazı alt kenarı y = 1490–1500. Ekran yazısı hiçbir yerde y > 1500 değil.

### 4.2 Yazı tipleri
| Tip | Kullanım (senaryodan örnek) | Font / boyut | Renk | Konum |
|---|---|---|---|---|
| **T1 KÜNYE** | "TOURS · 1834", "Paris → Bordeaux: 3 GÜN", "Plan A: Güvercin — başarısız", "Tours Ağır Ceza · Mart 1837", "1836 · İçeriden biri" | IBM Plex Mono 500, **34 px**, harf aralığı 0.18 em, büyük harf | altın `#b8862b` (koyu zemin) / mürekkep `#1c1915` (kâğıt şerit zemin) | y 240, sol hizalı (x 80), üstte |
| **T2 İDDİA** | "1834. Bilgisayar yok.", "Ya fark ederse?", "Kimse durdurmadı. Herkes kopyaladı.", "Önce açık. Sonra yasa.", "Suç yok. Çünkü yasa yok.", "Elektrik yok. Sadece…" | Playfair Display 900, **76 px** (kısa) / 64 px (uzun, 3 satır max), satır aralığı 1.05 | kâğıt `#e9dfc9`, **vurgu kelime `#e5483c`** | T1'in altı, y ≈ 290; sol hizalı; 920 px'e sığar |
| **T3 FORMÜL** | "ELDİVEN = ↑ · ÇORAP = ↓" (P10), "Oyun: Paris'teki tahvil fiyatı" | Plex Mono 500 **42 px** (etiket) + SVG ok (yüksekliği 52 px, kalınlık 8 px) | etiket kâğıt; ok: ↑ `up #5f9f6e`, ↓ `#e5483c` | P10'da iki masa yarısının üstünde ortalı, y ≈ 400 ve 1000 |
| **T4 DAMGA** | "BERAAT" (P19) | Playfair Display 900, **170 px**, çift çerçeve (6 px + 2 px), −4° döndürülmüş, mürekkep eksik doku (`feTurbulence`) | kırmızı `#e5483c` (koyu zemin), kâğıt kenar dış hat 3 px | ortada, y 620–900 |
| **T5 ALTYAZI** | anlatıcı + replik | Inter **800**, **56 px**, satır 1.15, en fazla **2 satır**, maks 920 px | beyaz-kâğıt `#f6f1e4`; **vurgu kelime `#e5483c`**; `textShadow: 0 3px 0 #000, 0 0 22px rgba(0,0,0,.9)` | alt kenar y ≈ 1490 (güvenli alanın hemen üstü), ortalı |
| **T5b REPLİK ETİKETİ** | "FRANÇOIS", "LOUIS", "MEMUR" | Plex Mono 500 **30 px**, aralık 0.2 em | altın `#b8862b` | altyazının hemen üstü, ortalı; replik tırnaklı |

**Kurallar**
- **Vurgu kelime kırmızı** (kural). Prototipte "okunan kelime" altın `#ffcf70` ile vurgulanıyor ve `Film.tsx` içinde de aynı; bu **kural ihlalidir**. Yeni: okunan kelime **renk değil ölçek** (`1.06`) ve parlaklık ile işaretlenir; **kırmızı** yalnızca planın anahtar kelimesidir.
- Vurgu kelimeleri (öneri; yönetmen onayı): P01 *hackledi*, P02 *tahvil*, P03 *üç günde*, P04 *kazanır*, P05 *devlete*, P06 *Olmadı*, P07 *satın*, P08 *hata*, P09 *paket*, P10 *düşüş* (tek vurgu; yükseliş/düşüş rengi ok ve T3 etiketinde zaten verilir), P11 *hata*, P12 *iki dürbün*, P13 *kopyalıyor*, P14 *suç ortağı*, P15 *önce*, P16 *hastalanana*, P17 *anlattı*, P18 *Mahkeme*, P19 *Beraat*, P20 *yasa*, P21 *yasası*, P22 *siber*, P23 *Sadece*.
- **Giriş/çıkış:** giriş yukarıdan 30 px kayma + opaklık (0.45 sn, `bezier(0.16,1,0.3,1)`, mevcut). **Çıkış fade değil:** kâğıt şerit gibi yukarı kayarak maskelenir (0.25 sn).
- **Açık zeminde** (harita parşömeni, Bordeaux gündüz): T1/T2 bir **kâğıt şerit** (`#e9dfc9` α .92, üst-alt 2 px mürekkep çizgi, hafif tane) üzerinde mürekkep renkte; vurgu `C.red #b3261e`.
- **Ses kapalı kuralı:** yazı anlatımı tekrarlamaz, tamamlar (senaryo §5 ile uyumlu).
- Kapak: 5 kelime, T2 stili, y 240, üst %22.

### 4.3 İsim etiketi ("dosya etiketi")
- **Form:** kâğıt etiket `#e9dfc9`, **sağ üst köşesi kesik** (14 px), 2 px mürekkep kenar, hafif tane, iç dolgu 14×22 px. Sol kenarda **6 px'lik "sekme"**: karakterin ceket rengi (François `#3c5ea3`, Louis `#9a3646`; yeni renk yok).
- **İçerik:** satır 1: ad, Playfair Display 900, **44 px**, mürekkep `#1c1915` ("François", "Louis"). Satır 2: Plex Mono 500, **28 px**, `#4a4237`, harf aralığı 0.14 em, büyük harf: **"BLANC · BORDEAUX"**. (Rol iddiası yok; "tüccar/iş insanı" yazılırsa [A] ile uyumlu: "İŞ İNSANI".)
- **Bağlantı:** etiket altından karakterin şapka tepesine (ya da omzuna) **3 px mürekkep çizgi** + 12 px daire uç. Etiket şapkanın **40 px üstünde**; kadrajda y ≥ 240; yan güvenli alan 80 px.
- **Giriş:** 0.4 sn, yukarıdan 20 px kayma + opaklık (mevcut `IsimKarti`). **Çıkış:** yukarı kayıp maske. Karakter hareket ederse etiket **çizgiyle takip eder** (ofset sabit).
- **Yalnız P02'de** (senaryo). Başka yerde repliklerde konuşan kişi T5b ile belirtilir.

---

## 5. Açık sorular (belgede "Açık soru N" olarak anılanlar)

1. **Tokmak mı çan mı (P19)?** Fransız mahkemesinde tokmak yok, el çanı var [G ◐]. Senaryo onaylı "tokmak". Seçenek A: tokmak (okunabilir, anakronizm riski), B: çan (doğru, "TAK" vuruş hissi zayıflar), C: ikisi de değil, kapanan dosya/mühür "TAK". Karar kullanıcı/yönetmen.
2. **"Tours telgrafçısı" adı:** P12–P13'teki kişi senaryoya göre Tours'tan *sonraki* ara kule görevlisi. Kart bu şekilde çizildi; yanlışsa Tours memurunun (2.3) tekrar kullanımı gerekir.
3. **"Yüz detayı yok" ile Kukla yüzü:** bölüm 0.2'deki uzlaşma (ana kadro yüzlü, kompars/yargıç/arabacı yüzsüz) onaylanmalı.
4. **Mahkeme doğruluğu:** kırmızı başkan cübbesi, toque, jüri yokluğu, haç yokluğu, jandarma [G ◐]. Araştırmacı doğrulamazsa tümü siyah cübbe, jüri/jandarma çıkar.
5. **Takvim:** günlük kopan yaprak yerine **yıllık levha** (1834/1835/1836) çizildi (dönem). Senaryodaki "yaprak kopar" jesti levha ile korunur.
6. **Posta arabası görseli (`araba-yesil.png`)** kapıda arma/taç taşıyor; 1830 sonrası için sadeleştirilmeli ya da küçük/bulanık kalmalı. Yeşil kromakey kenar temizliği gerekli.
7. **Yeni renkler:** `redLit #e5483c` ve `up #5f9f6e` (gerekçe bölüm 0.1) onay bekler.
8. **Rig kenar ışığı yönü:** `RIM` facing ile aynalanır; karşılıklı bakan iki karakterde bir kenar ışığı yanlış taraf olur. Çözüm `Poz.rim` (bölüm 5); motion karar verir.
9. **Ok glifleri:** `→` aralıkta yok; `↑ ↓` aralıkta ama woff2 içindeki gerçek glif doğrulanmadı (Bash erişimim olmadığı için). Teknisyen kontrol etsin; o zamana dek SVG ok.
10. **Paris'te kule (P23):** araştırma Paris'in hattaki yerini vermiyor (yalnız Paris–Lille). Pencere kulesi konum belirtilmeden, genel Chappe kulesi olarak çizildi.
11. **Borsa tahtası:** 1834'te tebeşirli kara tahtada fiyat yazılması [S dramatizasyon], doğrulanmadı; gerçek fiyat rakamı yok. Araştırmacı teyit ederse "gerçekçi" etiket eklenebilir.
12. **Chappe kolu rengi/detay:** siyah kollar, jaluzili kanat, karşı ağırlık, payanda [G ◐]. `ChappeTower.tsx` kırmızı gösterge kullanıyor; tarihî doğruluk için araştırmacı teyidi sonrası siyaha çekilmesi önerildi.
13. **Bordeaux kulesi konumu (P14):** "tepe üstü uzak kule", gerçek konum belirtilmiyor.
14. **Eski referanslar:** `final/S06.png` pencerede kafes pilon kule gösteriyor (Chappe değil); `karakter/louis-kart.png` kâğıt para içeriyor. İkisi stil/yüz referansıdır, kural dışı unsurlar kopyalanmaz.

---

## 6. Önerilen palet sabitleri ve rig ekleri (kod bloğu; dosyaya yazılmadı)

```ts
// src/bolumler/blanc/palet.ts (öneri)
import type { Palet } from "../../rig/Kukla";
import { LOUIS, FRANCOIS } from "../../rig/Kukla";

export const BL = {
  redLit: "#e5483c",     // altyazı/vurgu, koyu zeminde (C.red'in aydınlık hâli)
  up: "#5f9f6e",         // yalnız P10 ↑
  gloveHero: "#f4efe2",  // kahraman eldiven
  rimCool: "#c4d6ff", amber: "#ffb357", amberDeep: "#ff9a40", candle: "#ffcf70",
  tuffeau: "#e3dcc6", ardoise: "#3c4660", tuile: "#9a5a3c", pierreBdx: "#d8c49a",
  brass: "#c9a24a", brassLight: "#f1d48a", brassDark: "#7a5a1f", walnut: "#3b2818",
  duskTop: "#1d1838", duskMid: "#3b2f5c", duskLow: "#8a5a6e", duskHorizon: "#d98a5a", screenDark: "#0e0d12",
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
// Kukla dışı (statik siluet/overlay)
export const YARGIC = { baskanCubbe: "#8f2a22", baskanGolge: "#5e1a15", asesorCubbe: "#1c1915", rabat: "#efe9d8", toque: "#1a1418", toqueSerit: "#b8862b" };
export const ARABACI = { bluz: "#b8a882", yelek: "#5a3f28", pantolon: "#4a3b2c", sapka: "#2b2420", cizme: "#2a1d14" };
export const PARIS_EL = { ten: "#d3a784", tenGolge: "#a77b5f", manset: "#7c7f87", mansetKoyu: "#55575e", dugme: "#1c1915", gomlek: "#e9e3d2" };
```

**Rig'e (Kukla.tsx) gereken küçük ekler (motion; bu belge kod değiştirmez):** (1) `Poz.hatYok?: boolean` (memur, müdür, telgrafçı şapkasız); (2) `Poz.rim?: 1 | -1` (kenar ışığı yönü facing'den bağımsız); (3) (isteğe bağlı) `Poz.genislik?: number` yerine dış sarmalayıcı `scale(x,y)`; (4) `siluet` SVG filtresi bölüm 0.2.
