# Blanc Kardeşler · Storyboard v2 · Sahne Planı (v2.2: küçük jest + ölü alan revizyonu)

Girdi: `senaryo-v2.md` (v2.1, onaylı, 23 plan), `arastirma.md`, `storyboard-v2/dokunuslar.md` (v2.1 dönem dahil), `donem-dogrulama.md`, kullanıcı geri bildirimi (A2 kareleri `kareler/SB2-{TOURS,SOKAK,BORSA}.png`) ve CLAUDE.md'ye eklenen iki kural. Kullanıcı kararları: süre 60.0 sn tam kesim (3600 kare), anlatımda "kardeşler", P14 maskesiz (omuz üstü suç ortağı + sabit teleskop, odak kayması tüm kadrajda), P22 kukla/tahta dokusu (neon yok), 8 yeni mekân tam detay. Ses: ElevenLabs Umut Canbay (TR). 1080x1920 @ 60 fps.

**Yeni kurallar (v2.2):**
- **Küçük jest = yakın kamera.** Göz kırpma, kaş, esneme, el gibi jestlerde yüz/el yüksekliği ≥ ekran yüksekliğinin %12'si (~230 px). Değilse push-in, yakın plan/insert ya da kameraya yakın konum.
- **Ölü alan yok.** Dikey kadrajın hiçbir üçte biri (0–640, 640–1280, 1280–1920) boş kalmaz. Boş zemin/gök yok; ön plan öğesi, ışık/doku, kamera kayması ya da karakterin yer değiştirmesiyle doldurulur (ufuk–ölçek kuralına uyarak: yakın nesne büyük, uzak küçük, ayak–zemin teması korunur).
- Bölüm 8'de tüm 23 planın taraması ve değişiklikleri var. Toplam 3600 kare ve plan sınırları değişmedi.

**Orkestra kararları (işlendi):** P14 144 kare, P15 144 kare; P09/P10 aktarımı onaylı. **Dönem revizyonu (varsayılan kararlar):** P15 = Alt-1 (elle yazılmış "1835" defter sayfası); P19 = (a) tokmaksız, başkan hükmü okur, dosya kapağı kapanır, BERAAT dosya kapağı "TOK" karesinde; P01 geç gün ışığı/erken akşam; dürbünler sabit; manipulateur itme/çekme; Bordeaux sinyali Saint-Michel çan kulesi üstünde.

---

## 0. Okuma kılavuzu

**Kare.** Mutlak kare = sn x 60. Bir plan `start` karesinde başlar, `end` karesinde biter (end hariç, son görünen kare = end−1). `p+N` = plan başından N. kare. Temas karesi mutlak yazılır: `2925 (p+9)`.

**Koordinat (karakter konumu).** Sokak/dış mekânlarda `Sokak.tsx` ile aynı: `z` = derinlik (1 = kameraya en yakın zemin çizgisi, büyüdükçe uzak, ZMAX 7), `u` = yanal (0 = sol duvar/kenar … 1 = sağ duvar/kenar, ekran yönünde). İç mekânlarda aynı sözleşme. Tepe/eğik açı insertlerde `z` yerine masa üstü (x,y) px. Zemin noktası = `zemin(z,u)`; ayak ve baston ucu bu noktaya basar.

**Kamera notasyonu (Proto.tsx ile aynı).** Dönüşüm: `translate(540+cx, 960+cy) scale(cs) translate(−540,−960)`; yani ekran = (540+cx + cs·(x−540), 960+cy + cs·(y−960)). Katmanlar paralaks katsayısı k ile (gök 0.25, uzak 0.55, orta/karakter 1, ön plan 1.25–1.3) aynı eğriyi izler. "Statik" = sabit; insertlerde hafif nefes (cs ±0.01) serbest.

**Ekran yazısı bantları (güvenli alan: üst 220, alt 420, yan 80 → kullanılabilir y 220–1500, x 80–1000).**
- ÜST-BANT: y 240–400, x 80–1000 (etiketler, yıllar, **P04 repliği**). Font 64–72 px, kalın, en çok 2 satır.
- ALT-BANT: y 1290–1490 (replik altyazıları P08/P17 ve üstte içerik yoğunsa etiketler).
- Önemli içerik (yüz, nesne, kule kolu) y 420–1290 arasında. İstisnalar planında yazılı.

**Seviye (foley, anlatım 0 dB ref).** YAKIN −2…−4, ORTA −5, GENİŞ −8 dB; müzik ~−18 dB. Foley temkinli.

**Geçiş sözlüğü.** SERT = sert kesme (+ses vurgusu/köprüsü); MATCH = şekil/renk/konum eşlemeli kesme; KÂĞIT = zaman atlaması kesmesi; SAME = aynı mekân sürekliliği. Fade/çapraz çözülme yok.

**Mekân sözlüğü (tasarımcıyla ortak ad).** 8 yeni mekân: BORSA, TOURS-KULUBE-IC, KULE-DIS, PARIS-AVLU, CATI-BORDEAUX, CATI-KATI, YATAK-ODASI, MAHKEME. Mevcut: HARITA, SOKAK-BORDEAUX. Varyant/özel: PARIS-MASA (P23), TOURS-KAPI (P21), KANUN-INSERT (P20), MONTAJ-15 (P15), WIFI-MORF (P22).

**Ses zamanı notu.** `zamanlama.json` yok. Anlatım kareleri tahmini (~2.5 kelime/sn). Foley kareleri **görüntüye** kilitli.

**Tours kulübesi (genel kural, dönem).** Manipulateur (minyatür T kollu regülatör, kablo + makara) **içeride, direk dibindeki odada**; kumanda **itme/çekme**. İki pencere: (A) direk penceresi, arka duvar sağ, direk pencerenin ~5 m dışında; (B) Paris yönü penceresi, sol duvar, uzak tepede önceki kule. Dürbünler kule içinde ahşap kutuya **sabit**, elde tutulmaz. Kule kolu **dokunuşu yalnız P01**. Telgraf gece/sisli havada çalışmaz: kol hareketi yalnız gündüz planlarında (P01, P05, P11–P14, P21); P07/P08/P16/P17 gece planlarında kollar sabit.

---

## 1. Plan özeti

| Plan | start–end (kare) | sn | Mekân | Tip | Dokunuş | Çıkış geçişi |
|---|---|---|---|---|---|---|
| P01 | 0–156 | 2.60 | TOURS-KULUBE-IC (masa) | kinetic | kol "şak" | SERT |
| P02 | 156–360 | 3.40 | BORSA | character | tebeşir kırılır | MATCH (PARIS yazısı) |
| P03 | 360–564 | 3.40 | HARITA | map | gün-gece + at yorgunluğu | SERT (ses köprüsü) |
| P04 | 564–780 | 3.60 | SOKAK-BORDEAUX | character | baston–fare | SERT |
| P05 | 780–996 | 3.60 | HARITA | map | sollama + mühür | MATCH (mühür→güneş) |
| P06 | 996–1128 | 2.20 | CATI-BORDEAUX | character | tüy + fiske | SERT |
| P07 | 1128–1284 | 2.60 | TOURS-KULUBE-IC | character | çekmece çarpması | SAME |
| P08 | 1284–1440 | 2.60 | TOURS-KULUBE-IC | character | parmak tiki + duvar gölgesi | SERT |
| P09 | 1440–1560 | 2.00 | PARIS-AVLU | character | paket kayar, çizme durdurur | MATCH (paket) |
| P10 | 1560–1692 | 2.20 | TOURS-KULUBE-IC (masa) | document | çorabı kaldıran el | SERT |
| P11 | 1692–1884 | 3.20 | TOURS-KULUBE-IC → insert | tower | ter damlası | MATCH (halo→maske) |
| P12 | 1884–2028 | 2.40 | KULE-DIS | tower | kaş | SERT |
| P13 | 2028–2184 | 2.60 | KULE-DIS | tower | esneme | MATCH (kule→kule) |
| P14 | 2184–2328 | 2.40 | CATI-KATI | tower | pervaza çentik kazıma | SERT |
| P15 | 2328–2472 | 2.40 | MONTAJ-15 | chart | elle yazılmış "1835" defter sayfası | MATCH (memur) |
| P16 | 2472–2640 | 2.80 | YATAK-ODASI | character | eldiven düşer | SAME |
| P17 | 2640–2784 | 2.40 | YATAK-ODASI | character | kurutma kumu | SERT |
| P18 | 2784–2916 | 2.20 | MAHKEME | character | sarkaçlı saat TIK | SERT |
| P19 | 2916–3036 | 2.00 | MAHKEME | character | Louis eldiven giyer (aksan: dosya kapağı) | KÂĞIT |
| P20 | 3036–3192 | 2.60 | KANUN-INSERT | document | güve | SERT |
| P21 | 3192–3324 | 2.20 | TOURS-KAPI | tower | sürgü düşer | MATCH (direk) |
| P22 | 3324–3468 | 2.40 | WIFI-MORF | kinetic | Wi-Fi morfu | SERT (karanlık) |
| P23 | 3468–3600 | 2.20 | PARIS-MASA | document | parmak kabartısı | LOOP→P01 |

Toplam 3600 kare = 60.00 sn. Onaylı süre sapmaları: P09 1.8→2.0, P10 2.4→2.2, P14 2.2→2.4, P15 2.6→2.4 sn.

---

## 2. Planlar

### P01 · kare 0–156 · TOURS-KULUBE-IC (masa varyantı) · KANCA
- **Kadraj/kamera:** Yakın plan, tepe-önden (~60° aşağı). **v2.2:** `cs 1.14→1.06, cy +40→0` (alt koyu şerit ve üst kiriş dışarıda kalır; A2 karesinde alt %9 boştu). Işık **geç gün ışığı / erken akşam** (pencereden alçak sıcak güneş + masada küçük fener; gökyüzü soluk altın). Pencere A kanca yazısının **altında**: x 560–1000, y 450–770 (~%17), kol silueti ≥%10. Eldiven/el ≥%12 (A2 karesinde eldiven ~330 px ✔).
- **Karakterler:** Memurun eli (zayıf, titrek, gri ceket kolu, sol el), x 300–620, y 1000–1350. Yüz yok.
- **Giriş/çıkış:** El kadraj sol-alt kenarından girer (kare açılırken içeride).
- **Zaman çizelgesi (p+N):** 0 eldiven kâğıttan yarı çıkmış, el çekiyor (hareketin ortası; ilk kare okunur) · 0–54 eldiven yükselir, kâğıt sürtünür · **54 eldiven kâğıttan tamamen ayrılır; aynı karede** direkte kol "şak" B konumuna oturur · 60 kâğıt masaya geri yatar · 62–134 el eldiveni havada tutar, titreme sönümlenir (kol B'de net 1.7 sn) · 134–142 eldiveni ışık dairesine bırakır · 142–156 hareketsiz.
- **Temas (foley):** 0 (süren) kâğıt sürtünmesi (0–54) · **54** direk kolu "klak" (tiz, −3) · 60 kâğıt masaya yatar · **140** eldiven masaya "tap" (ORTA).
- **Süreklilik:** Kurulum → P08/P11/P17/P21/P22 (aynı direk, pencere A). Kol A = P23 son kare. P23'ün son karesi P01 f0 kamerasına (cs 1.14, cy +40) eşleşir.
- **Fizik:** Direk, binanın ek yapısı çatısında pencerenin ~5 m dışında; kablo pencere dışından iner. Kolu oynatan ikinci el kadraj dışında manipulateur'de (kanca metaforu). Görünmeyen elin sesi yok.
- **Geçiş (çıkış):** SERT, eldiven "tap"ından 14 kare sonra.
- **Ekran yazısı:** "1834. Bilgisayar yok." ÜST-BANT, **f0'dan itibaren tam görünür**, 0–156. Kapak ayrı (video dışı): "ELDİVENLE DEVLETİ HACKLEDİLER".
- **Anlatım:** "Bu eldiven, Fransız devletinin ağını hackledi." **Dokunuş:** kol "şak".

### P02 · kare 156–360 · BORSA
- **Kadraj/kamera (v2.2, A2 karesindeki boş alt üçte bir kapatılıyor):** Geniş → orta dolly-in, **`cs 1.00→1.30, cx 0→+20, cy +130→−40`**. Başlangıçta içerik 130 px aşağı kaydırılır (tahta orta üçte bire iner, ayaklar alt üçteki ~y 1560'a oturur), dolly ile yaklaşılır. Karakterler **kameraya yaklaştırıldı:** François z 2.2→**1.8**, Tüccar z **1.8**, Louis z 2.3→**1.9** (ayak y ~1430→~1560, ölçek ≈ x1.25; ufuk ve kalabalık ölçeği derinlikle uyumlu: arka plan siluetleri z 2–6'da kalır, yalnız öndeki üç figür yaklaşır). **Ön plan (alt üçte bir):** sol-alt ve sağ-alt köşede sırtı kameraya **iki silindirli koyu kalabalık figürü** (z 1.2, ölçek x1.5, paralaks k 1.3, bellere kadar görünür, ayak y >1900; alt üçte biri ~%40 doldurur) + damalı zeminde pencere ışık lekeleri. Üst üçte bir: sütun başlıkları, tahta başlığı, bayrak (dolu). Louis yüzü ve defter eli p+150'de ≥230 px (final cs 1.30).
- **Karakterler:** François z 1.8, u 0.40 (lacivert frak, silindir; sağ eliyle Tüccar'ın omzunu tutar, gülerek konuşur). Tüccar z 1.8, u 0.24. Louis z 1.9, u 0.62 (bordo frak, gri şapka; ciltli defter pupitrde, sağ göğüs cebinde beyaz eldiven köşesi). Katip platformda (z 5.5, u 0.50). Kalabalık 10–12 silindir şapkalı figür z 2–6. İsim etiketleri başın 80 px üstünde (44 px).
- **Giriş/çıkış:** Hepsi kare açılırken içeride.
- **Zaman çizelgesi:** 0 dolly başlar · 30–88 katip rakam yazar · **90 tebeşir kırılır** (beyaz toz bulutu **≥240 px**, asılı) · 90–114 parça düşer, iki sekme · 96–126 kalabalık tahtaya döner, **donar** (126–168) · Louis tüm plan boyunca yazar (kafası kalkmaz) · 176 katip yarım tebeşirle ilk çizgiyi çeker · 168–204 dolly biter.
- **Temas:** süren tebeşir cızırtısı (186–244) · **246 (p+90)** tebeşir "çıt" · **258 (p+102)** sekme-1 · **270 (p+114)** sekme-2 · **332 (p+176)** yarım tebeşir "cız" · kalem cızırtısı süren (kısık) · kalabalık uğultusu p+90–168 arası 0.5 sn kısılır.
- **Süreklilik:** Louis cep eldiven köşesi (→P19); ciltli defteri (→P15). François solda, Louis sağda. Tahta başlığı "PARIS" (540,430) → P03 Paris etiketi (dolly sonunda "PARIS" ekran (540, ~430) konumuna ayarlanır: cs 1.30 ve cy −40 ile yeniden hesaplanacak; hedef kural: MATCH noktası değişmez).
- **Fizik:** Katip platformda; tebeşir parçası platformdan zemine iki sekme. Ön plan figürler ayaklarını zemine basar (z 1.2'de zemin ayakları kadraj dışında olabilir, bel üstü kesik, temas gölgesi kadraj kenarında). Ölçek derinlikle.
- **Geçiş (çıkış):** MATCH ("PARIS" (540,430)).
- **Ekran yazısı:** "Oyun: Paris'teki tahvil fiyatı" ÜST-BANT, 162–354.
- **Anlatım:** "Bordeaux'lu kardeşler François ve Louis Blanc, devlet tahviline oynuyor." **Dokunuş:** tebeşir kırılması + Louis'nin soğukluğu.

### P03 · kare 360–564 · HARITA
- **Kadraj/kamera:** Tepe harita. `cs 1.30`, p+0–132 `cy +300→−300`; p+132–170 araba+at'a yaklaşma **`cs 1.30→2.60`** (v2.2: at başı jesti ≥%12; araba+at ≥%13 = 250 px). Paris (540,430). Tours düğümü (kurulum → P07). Disk çap 200 px **sol kenar** x 80–280, y 340–540; sayaç altında.
- **Ölü alan:** Harita tüm kadrajı kaplar (kıyı, deniz, komşu bölgeler, pusula gülü alt-sağ köşede); boş deniz/kara şeritleri doku ve pusula/ölçek çubuğu ile doldurulur.
- **Eylem:** Posta arabası Paris→Bordeaux. **Üç gün-gece döngüsü**, her biri 0.7 sn: p+6–48, 48–90, 90–132. Her gece harita %35 kararır, araba feneri yanar. p+132 araba Bordeaux'da durur, **toz yok**. p+132–180 kamera yaklaşır, at tek nefes verir (p+150), **başını öne bırakır** (p+150–180). p+180–204 hold.
- **Temas:** **408 (p+48)** gün "tık" · **450 (p+90)** "tık" · **492 (p+132)** gün sonu "tık" + tekerlek/toynak durur · **510 (p+150)** at nefesi · toynak kısık (366–492).
- **Süreklilik:** Tours düğümü (→P07); araba/rota (→P05).
- **Geçiş (çıkış):** SERT (gündüz→gece). Ses köprüsü: at nefesi → P04 ıslak adım.
- **Ekran yazısı:** "Paris → Bordeaux: 3 GÜN" ÜST-BANT, 366–558.
- **Anlatım:** "Fiyat Paris'te belirleniyor. Haber Bordeaux'ya üç günde geliyor." **Dokunuş:** gün-gece döngüsü + at yorgunluğu.

### P04 · kare 564–780 · SOKAK-BORDEAUX (gece)
- **Kadraj/kamera (v2.2):**
  - **p+0–78 orta plan** (alçak açı): `cs 1.00→1.10, cy 0→−20`. Karakterler daha yakın yürür (François z 2.6→2.1, Louis z 2.9→2.3); ayak y ≈1420→1490. **Alt üçte bir ön plan (A2 karesinde kaldırım boştu):** sol-alt ters çevrilmiş varil + kasa (z 1.3, k 1.3), sağ-alt kaldırım taşı kenarı ve yağmur oluğu, ıslak taşlarda fener yansıması (y 1560–1900); ızgara ön planda görünür.
  - **p+78–144 INSERT** (kaldırım hizası, statik; ızgara (400,1130), ufuk y 700). Fare boyu %12 (≥230 px ✔), baston ucu sağdan girer.
  - **p+144–216 orta plan → François yakın planı.** Tek kesintisiz push-in, `e = easeInOutCubic(t)`, `t=(f−144)/40`, `cs = 1.06+1.34e`, `cx = 62e`, `cy = −20−365e` (hedef: François yüzü ekran (540, 820), yüz yüksekliği ≈260 px). Kare kare (p+N → cs / cx / cy):

| p+N | t | cs | cx | cy |
|---|---|---|---|---|
| 144 | 0.0 | 1.060 | 0.0 | −20.0 |
| 148 | 0.1 | 1.065 | 0.2 | −21.5 |
| 152 | 0.2 | 1.103 | 2.0 | −31.7 |
| 156 | 0.3 | 1.205 | 6.7 | −59.4 |
| 160 | 0.4 | 1.403 | 15.9 | −113.4 |
| 164 | 0.5 | 1.730 | 31.0 | −202.5 |
| 168 | 0.6 | 2.057 | 46.1 | −291.6 |
| 172 | 0.7 | 2.255 | 55.3 | −345.6 |
| 176 | 0.8 | 2.357 | 60.0 | −373.3 |
| 180 | 0.9 | 2.395 | 61.8 | −377.4 |
| 184 | 1.0 | 2.400 | 62.0 | −385.0 |
| 200 | – | 2.450 | 64.0 | −392.5 |
| 216 | – | 2.500 | 66.0 | −400.0 |

  (184–216 arası doğrusal yavaş sürüklenme. Aradaki kareler formülle üretilir.) Paralaks: gök k 0.25, uzak k 0.55, karakter/orta k 1, ön plan k 1.3.
- **Karakterler:** François z 2.6→2.3 (p+78) → **2.1** (p+144), u 0.52→0.46. Louis z 2.9→2.5 → **2.2**, u 0.68→0.66; baston sağ elinde. **Izgara:** z 2.2, u 0.58, plan başından kaldırımda **görünür** (kurulum, ekran ~ (600,1465)); fare yok, girişi insertte. Louis ızgaranın yanından geçer.
- **Giriş/çıkış:** Karakterler kare açılırken sokak ortasında. Fare ızgaradan çıkar ve aynı ızgaraya girer.
- **Zaman çizelgesi:** 4–74 "Herkesten önce bilen" (yürürken) · **78 kesme: insert** (müzik 1.1 sn sessiz) · 78–87 boş ızgara, paça yaklaşır · **87–96 fare ızgaradan çıkar** · 96–106 devlere bakar · 100–108 baston iner · **108 TAK** · 110 fare irkilir · 112–130 ızgaraya dalar · **138 kuyruk ucu "tink"** · 138–144 boş ızgara · **144 kesme: orta plan, push-in başlar** · 144–162 François şapkasını kaldırır (elinde yukarıda kalır) · 146–176 "kazanır" · 150 Louis durur, baston ucu taşa · **186–200 göz kırpma** (push-in tamamlanmış, yüz ≈260 px) · 200–216 sırıtış.
- **Temas:** adımlar `yuru()` fazından (~564+6, +20, +34, +48, +62, +72) · **651 (p+87)** fare pençesi · **662 (p+98)** Louis'nin çizmesi (insert) · **672 (p+108)** baston ucu taşa "TAK" (−2) · **674 (p+110)** fare irkilme · **690 (p+126)** fare kafese dalış · **702 (p+138)** kuyruk ucu "tink" · **714 (p+150)** Louis durur, baston ucu "tık" · 750–764 (p+186–200) göz kırpma sessiz.
- **Süreklilik:** Izgara p+0'dan kurulu. Şapka kalkık elde biter. Louis cep eldiven köşesi.
- **Fizik:** Baston ucu `zemin(z,u).y`'de, taşa gömülmez. Cut yürüyüş döngüsü sürerken (tek seferlik hareket kesilmiyor). Push-in sırasında François ayakları kadraj dışına çıkar (bel üstü), kesilen kısım zeminde ayakla temas halinde.
- **Geçiş (çıkış):** SERT, sırıtıştan sonra.
- **Ekran yazısı:** **ÜST-BANT** (y 240–400): "FRANÇOIS" etiketi (y 250–290) + "Herkesten önce bilen… kazanır." (okunan kelime kırmızı), 568–760. Alt bantta yazı yok.
- **Anlatım:** FRANÇOIS (alçak, sinsi); "..." duraklaması insert. **Dokunuş:** baston–fare (tek). Müzik: insert 1.1 sn sessiz.

### P05 · kare 780–996 · HARITA
- **Kadraj/kamera:** P03'ün **başlangıç kadrajı**, `cs 1.30, cy +300→+220`. Mühür merkezi (540,880), çap ~300 px (%16). Ölü alan: harita dokusu tüm kadrajda.
- **Eylem:** A) p+24–108: ışık sinyali Paris'ten, 9 kule ikonu sırayla kol çevirir, sinyal p+64'te arabayı **sollar** (rüzgâr/toz yok). B) p+132–150 mühür iner, **p+150 tok**, balmumu taşar (150–174), hat kırmızıya boyanır (156–190), 190–216 hold. Araba p+146'da hattın önünde durur.
- **Temas:** 780 araba tekerleği kısık · kule klakları **804, 820, 834, 846, 856, 864, 871, 877, 882** · **844 (p+64)** whoosh · **926 (p+146)** araba durur · **930 (p+150)** mühür "tok" (−3) · 930–954 balmumu "squelch".
- **Süreklilik:** Mühür → P21 ilanı.
- **Geçiş (çıkış):** MATCH. Mühür (540,880) → P06 güneş diski aynı noktada, aynı çap.
- **Ekran yazısı:** "Telgraf: BİRKAÇ SAAT · halka kapalı" ÜST-BANT, 786–990.
- **Anlatım:** "Devletin telgrafı ise birkaç saatte getiriyor. Ama sadece devlete." **Dokunuş:** sollama + mühür.

### P06 · kare 996–1128 · CATI-BORDEAUX (şafak)
- **Kadraj/kamera (v2.2):** p+0–44 orta plan **push-in `cs 1.15→1.45`** (kafes kapağı ve Louis'nin eli ≥230 px, kafes ~330 px). p+44–104 INSERT sol ön kol + tüy (%20, tüy ≥%10), statik. p+104–132 orta plan **Louis bel üstü `cs 1.60`** (yüz ≥260 px, kafa kalkışı ve saatli el ≥230 px).
- **Ölü alan:** Üst üçte bir gökyüzü: Saint-Michel çan kulesi + T kol siluet (y 300–700), bulut, doğan güneş, güvercin (insertten önce); orta plan sıkı olduğundan üst üçte bir Louis'nin şapkası ve çatı katı penceresi ile dolu. Alt üçte bir: çinko teras, taş korkuluk, kafes ayağı, baca kümeleri.
- **Çatı kimliği:** Bordeaux çatıları **tuile canal ağırlıklı**, baca kümeleri, çinko oluklu teras (taş korkuluk). Çatı katı penceresi (dormer, soldan 2., açık; P14 ile eşleşir). Sağ ufukta **Saint-Michel çan kulesi ve tepesinde T kollu telgraf siluet** (kurulum → P14). Güneş doğuyor.
- **Karakterler:** Louis z 2.0, u 0.45 (teras). Sol elinde cep saati (sahne elemanı), baston **taş korkuluğa dayalı**. Kafes korkuluk üstünde z 2.3, u 0.62.
- **Giriş/çıkış:** Louis dormer'den çıkmış. Güvercin kadrajın sağ-üstünden çıkar (p+40).
- **Zaman çizelgesi:** 0–10 sağ eliyle kafes kapağını açar · 14 güvercin iter · **16 tek tüy kopar**, **bordo sol önkola** süzülür (16–40) · 40 güvercin çıkar · **40 tüy kola konar** · 44 **insert** · 56–80 Louis gökyüzüne bakar (kol sabit) · **84 sağ işaret parmağıyla fiske**, tüy savrulur, çıkar (84–104) · 104 **orta plan (bel üstü)**: Louis boş gökyüzüne bakar · **120 saat kapağı çat** · 120–132 hold.
- **Temas:** 1000–1006 menteşe gıcırtısı · **1006 (p+10)** kapak korkuluğa "tık" · **1010 (p+14)** güvercin "pat", kanat 1010–1038 · **1036 (p+40)** tüy kumaşa (−8) · **1080 (p+84)** fiske (−5) · **1116 (p+120)** saat kapağı "çat".
- **Süreklilik:** Tüy orta planda kola konarak kurulur. Güneş diski (→P05 mühür). Dormer + çan kulesi (→P14).
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Plan A: Güvercin — başarısız" ÜST-BANT, 1002–1122.
- **Anlatım:** "Önce güvercin denediler. ...Olmadı." **Dokunuş:** tüy + fiske.

### P07 · kare 1128–1284 · TOURS-KULUBE-IC (gece)
- **Kadraj/kamera:** Orta plan profil. Louis'ten müdüre pan `cs 1.00→1.08, cx +10→+110`, **p+98'de durur**. Tek mum masada. Çekmece ön yüzü y 1250–1400 (%12). **Ölü alan (v2.2):** alt üçte bir masa ön yüzü + çekmece + zemin döşemesi + sandalye bacakları + Louis'nin botları (z yakın, k 1.2); üst üçte bir kapı, duvar, pencere A, mum alevi yansıması. Zemin boş bırakılmaz.
- **Karakterler:** Louis z 2.0, u 0.22 (baston masa kenarına dayalı; önünde **iki** altın kesesi). Müdür z 2.0, u 0.60. Memur z 2.8, u 0.78 (gri ceket, şapkasız, müdürün arkasında). François z 3.4, u 0.08 (kapı aralığında gölgede, gülümser).
- **Giriş/çıkış:** Kapı arka duvar solda; pencere A arka duvar sağda (direk gece sabit). Kimse girip çıkmaz.
- **Zaman çizelgesi:** çekmece **plan başında yarı açık** · 6–40 Louis bir keseyi müdüre kaydırır · 30–52 müdür uzanır · 54 kese avucunda · 62 sikkeler masaya · 76–90 süpürür, sikkeler çekmeceye · **98 çekmece BAM**, kamera durur (hold 98–156) · **102 memur irkilir** (omuz + baş geri çekilir, tüm gövde jesti; v2.2: "yalnız göz kırpar" kaldırıldı, göz kırpma 230 px kuralını sağlayamıyordu) · François kapıda gülümser (kapanış).
- **Temas:** 1134–1168 kese sürtünmesi · **1168 (p+40)** kese "tok" · **1190 (p+62)** sikkeler · **1216 (p+88)** sikkeler çekmeceye · **1226 (p+98)** çekmece "BAM" (−2) · 1230 (p+102) memur irkilme (kumaş, çok hafif).
- **Süreklilik:** İkinci kese Louis'nin dirseğinde (→P08). Mum, pencere A (→P08). Baston konumu (→P14, P18).
- **Fizik:** Masa ayakları zeminde; çekmece masa içine girer.
- **Geçiş (çıkış):** SAME; çekmece sesinden sonra 0.3 sn sessizlik.
- **Ekran yazısı:** "Plan B: Rüşvet · Tours" ÜST-BANT, 1134–1278.
- **Anlatım:** "Sonra Tours istasyonunda iki memuru satın aldılar." **Dokunuş:** müdürün çekmeceyi çarpması (memur irkilmesi tepki).

### P08 · kare 1284–1440 · TOURS-KULUBE-IC
- **Kadraj/kamera (v2.2):** Yakın plan. p+0–60 Louis yüzü (OTS, yüz ≥300 px). p+60–156 ters açı **push-in `cs 1.00→1.18`**: memurun yüzü sert mum ışığında, **memurun sağ eli masada y 1000–1330 (≥330 px, %17; önceki 200 px → kural gereği büyütüldü)**, duvarda gölge (sol-üst, x 100–520, y 430–860, %22), pencere A (direk statik, gece) sağda. **Ölü alan:** alt üçte bir masa yüzeyi + kese + mum + ikinci kese; üst üçte bir duvar + gölge + pencere.
- **Karakterler:** Louis z 1.5, u 0.30 (baston sağ yanında masaya dayalı). Memur z 1.7, u 0.62.
- **Zaman çizelgesi:** 0–20 Louis öne eğilir · 6–48 "Tek bir hata.", 50–60 "Fazlası..." · **60 kesme**: memur · 60–72 Louis'nin eli **ikinci keseyi** memurun önüne kaydırır · "değil." biter p+84 · 72–100 memurun gözü kese ↔ pencere, **Louis kıpırdamaz** · **102, 117, 132 memurun sağ eli manipulateur kolunu itip çeker gibi üç kez tıklar** · mum gölgesi **T biçimli kol silueti** · 132–156 hold.
- **Temas:** **1356 (p+72)** kese "tok" · **1386, 1401, 1416** parmak "tık" ×3 (−6) · mum cızırtısı −12.
- **Süreklilik:** İkinci kese P07'den. Direk A statik, B konumunda.
- **Fizik:** Gölge ışığın tersine; el masaya basar.
- **Geçiş (çıkış):** SERT + ses vurgusu.
- **Ekran yazısı:** Altyazı (Louis) ALT-BANT, "LOUIS" etiketi, 1294–1414 (içerik üst yarıda olduğundan alt bant boş değil, el+masa alt üçtedir).
- **Anlatım:** LOUIS. **Dokunuş:** el–gölge.

### P09 · kare 1440–1560 · PARIS-AVLU (gündüz)
- **Kadraj/kamera:** Orta plan, alçak açı (adamın başı kadrajın üstünde kesik, yüzü yok). `cs 1.00→1.05, cx 0→+30`. "TOURS" etiketli posta arabası (arma/taç yok). Paket+çizme ~%18. **Ölü alan (v2.2):** alt üçte bir; arabanın ön tekerleği (ön plan, z 1.5), sol-altta Paris adamının botları + kaldırım taşı rayı, taş avlu derzleri ve su oluğu. Üst üçte bir avlu duvarı, kemer, bacalar.
- **Karakterler:** Paris adamı z 1.6, u 0.28 (gri manşet, sağ manşette tek altın düğme). Arabacı z 2.2, u 0.80 (plan başından kadrajda, sağ ayağı ön korkuluğunda). Araba z 2.2, u 0.62.
- **Zaman çizelgesi:** 0–24 eller paketi kaldırır · **24 fırlatma** · **46 araba tepesine iner** · 48–64 kayar · **66 arabacı topuğuyla durdurur** (net 1.1 sn) · 84 manşet düzeltilir · 84–120 hold.
- **Temas:** **1464 (p+24)** "huf" · **1486 (p+46)** "tok" · 1488–1504 sürtünme · **1506 (p+66)** çizme "tap" (−3) · 1524 (p+84) manşet.
- **Süreklilik:** Paket + "TOURS" etiketi (→P10). Gri manşet (→P23).
- **Geçiş (çıkış):** MATCH (paket).
- **Ekran yazısı:** "Şifre: bir posta paketi" ÜST-BANT, 1446–1554.
- **Anlatım:** "Paris'ten Tours'a paket geliyor." **Dokunuş:** kayan paket + çizme.

### P10 · kare 1560–1692 · TOURS-KULUBE-IC (masa üstü, 55° eğik açı)
- **Kadraj/kamera:** Eğik tepe-önden (~55°), `cs 1.00→1.04`. İki açık paket: sol eldiven + yeşil ↑; sağ çorap + kırmızı ↓. **Ölü alan:** üst üçte bir masa arkası duvar + pencere ışık dikdörtgeni + fener; alt üçte bir masa ön kenarı, sarkan çorap (%30), memurun kolu (el ≥230 px).
- **Karakterler:** Memurun eli (gri ceket kolu) alt kenardan girer.
- **Zaman çizelgesi:** 8–28 yeşil etiket zıplar, eldiven kımıldamaz · 20–36 el girer · **36–52 el çorabı kaldırır** · 52–88 çorap sarkar ve uzar, **kırmızı ok ↓ (64–88)** · **104 el çorabı bırakır** · 104–132 el çekilir.
- **Temas:** **1572** etiket + kâğıt · **1596** el çorabı kaldırır · **1624** kırmızı etiket · **1648** çorap uzar (−6) · **1664** masaya "flop".
- **Süreklilik:** Paket P09'dan. Eldiven P01 eldiveni.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "ELDİVEN = ↑ · ÇORAP = ↓" ÜST-BANT, 1566–1686.
- **Anlatım:** "Eldiven: yükseliş. Çorap: düşüş." **Dokunuş:** sarkan çorap.

### P11 · kare 1692–1884 · TOURS-KULUBE-IC → INSERT (gündüz)
- **Kadraj/kamera:** p+0–64 orta plan `cs 1.00→1.04`. p+64–192 INSERT 45°: manipulateur sapı + eller + çene üstte; sap+damla %25; üst köşede pencere A alt kenarı ve bulanık direk kolu. `cs 1.00→1.06`. **Ölü alan:** orta plan alt üçte bir tezgâh + manipulateur gövdesi + zemin; insert tamamen dolu.
- **Karakterler:** Memur z 1.8, u 0.50 (profil, gri ceket, şakağı terli). Sap **iki elle iter-çeker**. Pencere B'de uzak kule.
- **Zaman çizelgesi:** 10–24 sapı kavrar · 24–52 pencere B'ye bakar · **64 kesme: insert** · 72–84 itme, çekme · **96 fazladan çentik TIK**, kırmızı halo (96–170) · **102 dışarıdaki büyük kol karşılık verir** · 90–120 çenede damla · 120–132 düşer · **132 sapa "tıp"** · 150, 166 tık, tık · 170–192 sap durur.
- **Temas:** **1704** eller sapa "tak" · **1764** · **1776** tık · **1788** TIK (makara/kablo hafif) · **1794 (p+102)** direk karşılık "klak" (−10, kol görünürken) · **1824** damla "tıp" (−3) · **1842** · **1858** tık. Müzik 1788–1832 **kısılır**.
- **Süreklilik:** Manipulateur düzeni (→P12, P13). Çentik X (→P12–P14). Ter damlası yalnız burada.
- **Geçiş (çıkış):** MATCH (kırmızı halo → P12 dürbün maskesi merkez (540,950), çap ~860).
- **Ekran yazısı:** "Resmî mesaj + gizli bir "hata"" ÜST-BANT, 1698–1878.
- **Anlatım:** "Memur, resmî mesajın içine küçük bir hata gizliyor." **Dokunuş:** ter damlası.

### P12 · kare 1884–2028 · KULE-DIS (ara kule, gündüz)
- **Kadraj/kamera:** p+0–24 orta-yakın (dışarıdan, kulübe penceresi, telgrafçı bel üstü); ahşap kutuda **iki sabit pirinç tüp**. p+24–70 dürbün POV, **dairesel maske** (merkez (540,950), çap ~860). **p+70–144 aşırı yakın göz/kaş (v2.2: büyütüldü):** göz+kaş bölgesi y 400–860 (≥460 px = %24), kaş yayı uzunluğu ~480 px, kaş yüksekliği ≥230 px (kaş + üst kapak), göz y 560–860. Alt üçte bir (y 1280–1920): yanak, bıyık, pirinç oküler halka ve ahşap kutu gövdesi (ölü alan yok).
- **Karakterler:** Telgrafçı (kısa, tombul, kahve resmî frak, bıyık, şapkasız) z 1.5, u 0.50. **Dürbün sabit**, odak bir kez ayarlı.
- **Zaman çizelgesi:** 0–22 tüpe eğilir, gözünü dayar · 24 POV · 70 ters açı: göz halkaya dayalı, göz kısılır (70–90) · **94–126 tek kaş yavaşça kalkar** · 126–144 hold.
- **Temas:** **1906 (p+22)** göz/alın pirinç halkaya "tık" (−6) · rüzgâr −14. Anlatım p+6–96; **0.5 sn tam sessizlik p+100–130 (müzik de susar)**.
- **Süreklilik:** Telgrafçı P13'te aynı kişi. POV'daki kol X (≥300 px).
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Ya fark ederse?" **ALT-BANT**, 1980–2022.
- **Anlatım:** "Her kulede iki dürbün var." **Dokunuş:** kaş.

### P13 · kare 2028–2184 · KULE-DIS
- **Kadraj/kamera:** Orta plan, dışarıdan. p+0–68 `cs 1.25` (**yüz ≥300 px, esneme ≥%15 ✔**; v2.2: geri çekilme p+68'de başlıyor ki esneme (36–66) tam yakın planda bitsin). p+68–130 geri çekilme `cs 1.25→0.80, cy +60→−120`. Üstte kendi direği, ufukta sıradaki kule. **Ölü alan:** geri çekilirken alt üçte bir kulübe duvarı/tezgâh + ön plan çit/çalı + yol; üst üçte bir direk ve gökyüzü bulutları.
- **Karakterler:** Telgrafçı z 1.5, u 0.50.
- **Zaman çizelgesi:** 0–14 gözünü dürbünden çeker, doğrulur (dürbün sabit) · 14–30 omuz silker · 30–66 manipulateur iter-çeker, **esner (36–66)** · **68 kendi direği "klak"** · 68–130 kamera geri çekilir · **114 ufuktaki kule kopyalar** · 130–156 hold.
- **Temas:** **2034 (p+6)** doğrulurken kumaş (−8) · 2062–2094 itme/çekme tık + kablo/makara (−5) · **2096 (p+68)** direk "klak" (−8) · **2142 (p+114)** ufuk kule "klak" (−10).
- **Süreklilik:** Kopyalanan konum X. Ufuk kulesi → P14 çan kulesi hattı.
- **Geçiş (çıkış):** MATCH (ufuk kulesi → P14 teleskopta çan kulesi).
- **Ekran yazısı:** "Kimse durdurmadı. Herkes kopyaladı." ÜST-BANT, 2034–2178.
- **Anlatım:** "Ama devletin adamları hatayı aynen kopyalıyor." **Dokunuş:** esneme.

### P14 · kare 2184–2328 · CATI-KATI (144 kare)
- **Kadraj/kamera:** Omuz üstü, **maskesiz**, odak kayması **tüm kadrajda**. `cs 1.00→1.05`. Pencere x 380–900, y 380–1000. Alt-sol kadranda pervaz+bıçak (x 80–620, y 1000–1290, %22, bıçaklı el ≥230 px ✔). Pervaz onlarca eski çentikle dolu. Pencerede **Saint-Michel çan kulesi + T kol** (≥230 px). **Ölü alan:** alt üçte bir pervaz + suç ortağının omzu/dirseği + masa köşesi; üst üçte bir çatı kirişi, tavan eğimi, dormer çerçevesi.
- **Karakterler:** Suç ortağı z 1.5, u 0.30 (koyu kahve redingot, basık kasket); **teleskop pervaza kurulu**. Louis arka planda masada z 3.0, u 0.78 (baston masaya dayalı; bulanık).
- **Zaman çizelgesi:** 0–10 göz teleskopta · **10–40 gözünü çeker, öne eğilir, bıçakla çentik atar** · 40–54 doğrulur, gözünü dayar · 54–78 odak kayması (pervaz p+62'ye kadar okunur) · **78–138 kule net (1.0 sn)** · **90 uzak T kol "klak"** · 124–138 suç ortağı gözünü çekip başını Louis'ye çevirir · 138–144 odak Louis'ye.
- **Temas:** **2214 (p+30)** bıçak "kırt" (−4) · **2238 (p+54)** göz teleskopa "tık" (−8) · **2274 (p+90)** T kol "klak" (−8) · 2308 (p+124) kumaş.
- **Süreklilik:** Dormer + çan kulesi P06 ile eşleşir. Kol X.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Dürbünün ucunda: Bordeaux" ÜST-BANT, 2190–2322.
- **Anlatım:** "Bordeaux'da bir suç ortağı bekliyor." **Dokunuş:** pervaza çentik kazıma.

### P15 · kare 2328–2472 · MONTAJ-15 (144 kare) · Alt-1: "1835" defter sayfası
- **Kadraj/kamera (v2.2):** Dikey ikiye bölünmüş, ayraç ahşap kiriş y 948–972, `cs 1.00→1.04`. **Her iki yarı kadrajın uç noktasına kadar dolu:** ÜST (ALTIN-MASA, y 0–948): üst 0–220 perde/pencere/şamdan dekoru, **ciltli defter pupitrde x 120–520, y 540–840** (Louis'nin tüy tutan eli ≥230 px), altın yığını x 540–760, y 800–940, François'nın kadeh tutan eli x 780–1000, y 540–780. ALT (TOURS-KULUBE-IC, soğuk, **y 972–1920 tam dolu**): memur masa başında (y 1050–1500), alt 1500–1920 masa ön yüzü, manipulateur gövdesi, zemin tahtaları ve ön plan sandalye sırtı (öksürük omuz hareketi ≥230 px).
- **Eylem:** 6–36 üç sikke yığına düşer · 20–70 François kadeh kaldırır, bırakır (70) · **22–40 Louis kaz tüyüyle defter sayfasına "1835" yazar** · **40–54 sayfayı koparır**: pürüzlü kenarlı krem yaprak (~210 px) · 54–110 yaprak ayracın **önünden** süzülür (yol ≥600 px) · **112 memurun omzuna konar** · 118–132 Louis sonraki boş sayfaya geçer · 52, 124 öksürük · 132–144 hold.
- **Temas:** **2336, 2344, 2354** sikke · 2350–2368 tüy cızırtısı (−8) · **2370** sayfa yırtılması (−4) · **2380** öksürük · **2398** kadeh · **2440** yaprak omza · **2452** öksürük.
- **Süreklilik:** Defter P02'den. Memur eldiven elinde (→P16). Ter damlası yok.
- **Geçiş (çıkış):** MATCH (memur omuz silueti).
- **Ekran yazısı:** "1834 → 1836" ÜST-BANT, 2334–2466.
- **Anlatım:** "İki yıl boyunca... herkesten önce bildiler." **Dokunuş:** elle yazılmış "1835" sayfası.

### P16 · kare 2472–2640 · YATAK-ODASI (gece)
- **Kadraj/kamera (v2.2):** p+0–36 orta plan push-in `cs 1.00→1.10` (nefes, pencerede kule, yazı sehpası). **p+36–168 INSERT, yatak kenarı hizası, eldiven + el ≥%20 (≥380 px), kamera düşüşü izler:** p+36–96 el + eldiven (cy 0), p+96–116 aşağı pan (`cy 0→+620`, düşüşü takip, eldiven kadrajdan çıkmaz), p+116–168 zemin yakın plan (`cs 1.00→1.12`). (Önceki: elin gevşemesi orta planda küçük kalıyordu; insert 24 kare öne çekildi, kesme hareketsiz ana denk gelir: el eldiveni tutarken.) **Ölü alan:** insert alt/üst üçte birleri yorgan dokusu, yatak demiri, tahta zemin; boş yok.
- **Oda kimliği:** Taşra odası, demir yatak, mum komodinde, pencere sağ-arka (uzakta kule, gece sabit), kapı arka-sol, sandalyede **koyu figür silüeti** (u 0.85, z 2.8), önünde yazı sehpası (kâğıt, hokka, kum kutusu; →P17). Gri ceket askıda.
- **Karakterler:** Memur yatakta z 2.2, u 0.45, gömlek, solgun, terli (damla yok); sağ elinde **buruşuk beyaz eldiven plan başından**.
- **Zaman çizelgesi:** 0–36 nefes · **36 kesme: insert** · **48–72 el yorgunluktan gevşer** · 84 eldiven parmak parmak kayar · 98 kenardan aşağı · 98–114 düşer · **114 tahtaya "tok"** · 120 küçük sekme · 120–168 parmaklar yarı açık (kapanış). Müzik tek uzun nota.
- **Temas:** nefes süren (−8) · **2556 (p+84)** eldiven kumaşta kayar · **2586 (p+114)** eldiven tahta zemine (−4) · **2592 (p+120)** minik sekme.
- **Süreklilik:** Eldiven P15'te elde kurulu. Pencere kule (→P17). Sandalye silüeti + sehpa (→P17).
- **Fizik:** Yorgan kenara eğik; eldiven yere düşer, yatak ayağına çarpmaz.
- **Geçiş (çıkış):** SAME.
- **Ekran yazısı:** "1836 · İçeriden biri" ÜST-BANT, 2478–2634.
- **Anlatım:** "Ta ki bir memur ağır hastalanana kadar." **Dokunuş:** eldivenin düşmesi.

### P17 · kare 2640–2784 · YATAK-ODASI
- **Kadraj/kamera:** Yakın plan, memurun yüzü sol-üst (y 520–1100, 3/4; yüz ≥%12 ✔). **Alt-sağda eller** (x 560–1000, y 1000–1250 → **v2.2: y 1000–1260, el+saçak ≥240 px**): kimliksiz siyah kollu el. Pencerede uzak kule **statik**, dinlenme (x 640–960, y 300–620). `cs 1.00→1.05`. **Ölü alan:** alt üçte bir yazı sehpası, yorgan, kâğıt, hokka (dolu).
- **Eylem:** 0–20 başını dinleyiciye çevirir · 10–60 fısıltı; el yazar (0–70) · 66–108 "Ve anlattı." · **84–110 kurutma kumu delikli saçaktan serpilir** · 126–144 tam sessizlik (0.3 sn); memur gözlerini kapatır.
- **Temas:** **2648** yastık · kalem cızırtısı (2640–2710) · **2724 (p+84)** kum serpme (−5).
- **Süreklilik:** Sandalye silüeti + sehpa (P16). Kule dinlenme (→P21, P22).
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** Altyazı (Memur) "Eldiven… çorap…" ALT-BANT, 2660–2706.
- **Anlatım:** MEMUR (fısıltı) + ANLATICI. **Dokunuş:** kum serpme.

### P18 · kare 2784–2916 · MAHKEME
- **Kadraj/kamera:** Geniş, alçak açı, push-in `cs 1.00→1.12` (v2.2: **sarkaçlı saat çapı ≥280 px**, x 720–1000, y 440–720; saat ibresi TIK jesti ≥230 px okunur; push-in ile saat ~315 px'e ulaşır). Kürsü orta-üst; jüri sol; halk arka; çapraz toz huzmeleri; **arka duvarda haç/arma yok, cübbeler tek koyu ton**. **Ölü alan:** alt üçte bir sanık sırasının ön korkuluğu, ahşap panel, ön plan figürleri (François/Louis sırtları, z 2.4, bel üstü) ve zemin tahtaları; üst üçte bir panel, kornişler, huzme.
- **Karakterler:** Başkan yargıç z 5.0, u 0.50; önünde açık ciltli dosya + karar kâğıdı; tokmak yok. Sanık sırasında **arkadan** François (lacivert) z 2.4, u 0.34 (ekran solu), Louis (bordo) z 2.4, u 0.52; şapkalar dizlerinde; baston sıraya dayalı.
- **Zaman çizelgesi:** 4–96 "bin sekiz yüz otuz yedi. Mahkeme." · **60 yargıç oturur** · **96 uğultu keser** · 96–132 sessizlik 0.6 sn · **108 dakika ibresi TIK** · **129 salon tek iç çekiş** · 108–132 hold.
- **Temas:** **2844 (p+60)** sandalye (−5) · uğultu kesilir (2880) · **2892 (p+108)** saat "TIK" (−2) · **2913 (p+129)** iç çekiş (−10).
- **Süreklilik:** François ekran solu; P19 ters açıda Louis solda. Dosya + kâğıt kürsüde.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Tours Ağır Ceza · Mart 1837" ÜST-BANT, 2790–2910.
- **Anlatım:** "1837. Mahkeme." **Dokunuş:** saat TIK.

### P19 · kare 2916–3036 · MAHKEME
- **Kadraj/kamera (v2.2):** p+0–26 INSERT başkanın eli + ciltli dosya (aşırı yakın, statik). **p+26–52 orta plan sanık sırası, ters açı, bel üstü: iki yüz de ≥240 px** (François gülümsemesi jest; eşdeğer cs ~1.6, ufuk–ölçek derinlikle: z 2.0 yerine **z 1.3** konumu). p+52–120 INSERT eller (%20+, ≥380 px). **Ölü alan:** orta plan alt üçte bir sıra korkuluğu + dizlerdeki şapkalar + paneller; üst üçte bir arka duvar paneli + pencere huzmesi.
- **Karakterler:** Başkanın eli (koyu cübbe kolu). Sanık sırası önden: **Louis ekran solu** z 1.3, u 0.34; **François ekran sağı** z 1.3, u 0.62; şapkalar dizde.
- **Zaman çizelgesi:** 0–6 başkan karar kâğıdını bırakır · 6–9 **dosya kapağını kapatır** · **9 TOK** + "BERAAT" aynı karede (smash-cut) · 26 kesme · 30–60 François'nın gülümsemesi yayılır (0.5 sn) · 38–50 Louis cebinden eldivenleri çıkarır · **52 insert** · 54–70 sol eldiven · **72–104 sağ eldiven parmak parmak** · **108 bilek düğmesi** · 108–120 eller kenetli.
- **Temas:** **2925 (p+9)** dosya kapağı "TOK" (−2) · **2960 (p+44)** cep kumaşı · **2982 (p+66)** sol eldiven · **2994, 3001, 3008, 3015** sağ eldiven parmak (−5) · **3024 (p+108)** bilek düğmesi.
- **Süreklilik:** Louis cep eldivenleri (P02…P18). Louis sol, François sağ (ters açı).
- **Geçiş (çıkış):** KÂĞIT.
- **Ekran yazısı:** "BERAAT" **ALT-BANT**, 2925–3012, kırmızı, −4°, 180 px, animasyonsuz.
- **Anlatım:** "Beraat." **Dokunuş:** Louis'nin eldiven giymesi. Seçenek (b) el çanı kullanıcı onayında.

### P20 · kare 3036–3192 · KANUN-INSERT
- **Kadraj/kamera (v2.2):** Tepe açı insert, **kitap x 140–940, y 560–1380** (önceden y 480–1300: üst 480 px boştu), `cs 1.00→1.05`. **Ölü alan:** üst üçte bir (y 0–640): yargıç cübbe kolu + hokka + kalem + huzme; alt üçte bir (y 1280–1920): masa üstü, ciltli dosya yığını, tomar kâğıtlar, alt-sol küçük mühür. Güve açık kanat **≥240 px** (≥%12).
- **Eylem:** 0–70 yargıç sayfaları hızla çevirir · 72 bölüm bomboş, parmak basar · güve p+0'dan cilt oluğunda (kapalı ~110 px) · **100 kanat açar (~240 px)**, huzmede parlar · 108–150 kalkar, üst-sağdan çıkar · 150–156 sayfa yatışır.
- **Temas:** **3042, 3050, 3058, 3066, 3074, 3082** sayfa "fışt" · **3108** parmak · **3136** kanat açma · 3144–3186 pırpır (−8).
- **Süreklilik:** Güve p+0'dan görünür.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Suç yok. Çünkü yasa yok." ÜST-BANT, 3042–3186.
- **Anlatım:** "Çünkü bunu suç sayan bir yasa yoktu." **Dokunuş:** güve.

### P21 · kare 3192–3324 · TOURS-KAPI (gündüz)
- **Kadraj/kamera (v2.2):** Orta plan alçak, kapı x 320–760, y 700–1400; ilan x 420–660, y 800–1100; direk kapı üstü x 380–700, y 330–700 (kollar dinlenme). **Çekiç eli ön planda (z yakın, k 1.2): el + çekiç x 560–1000, y 900–1250, el ≥260 px** (önceden kapı ölçeğinde ~150 px'ti). Son vuruşta sürgüye **push-in `cs 1.00→1.35`** (p+48–132). **Ölü alan:** alt üçte bir eşik taşı, kapı alt kısmı, çamurlu zemin, ön plan basamak; üst üçte bir direk + gökyüzü.
- **Karakterler:** Resmî görevlinin eli: siyah redingot kolu, **beyaz manşet**, yüz yok; sağ-alttan.
- **Eylem:** 12, 33, 54 çekiç · 54–66 el çekilir, sağ-alttan çıkar · **66 sürgü yerçekimiyle düşüp yuvaya "klank"** · 66–132 net.
- **Temas:** **3204, 3225, 3246** çekiç+çivi (−3) · **3258 (p+66)** sürgü "klank" (−3).
- **Süreklilik:** İlanda kırmızı mühür (P05). Direk dinlenme.
- **Geçiş (çıkış):** MATCH (direk → P22).
- **Ekran yazısı:** "Önce açık. Sonra yasa." ALT-BANT, 3198–3318.
- **Anlatım:** "Telgraf yasası aynı yıl geldi." **Dokunuş:** sürgü.

### P22 · kare 3324–3468 · WIFI-MORF
- **Kadraj/kamera:** Siluet, geniş → morph. p+0–60 `cs 1.00→2.20`. Morph merkez (540,800), boy ≥600 px. **Ölü alan (v2.2):** üst üçte bir: alacakaranlık gökyüzü, ince bulut şeritleri, yıldız noktaları (kukla/tahta dokulu kâğıt kesme); alt üçte bir: tepe/çatı siluet katmanları, ön plan çit/ağaç dalları ve zemin çizgisi; telefon-ekranı karanlığına geçişte kenarda ekran çerçevesi/ışık yansıması.
- **Doku:** Kukla/tahta kesme, **neon yok**. Üç yay krem boyaya **dolar**.
- **Eylem:** 60–90 kollar katlanır · **90, 102, 114 üç yay boya dolar** · 114–144 hold.
- **Temas (ses olayı):** 3384–3414 gıcırtı (−5) · **3414, 3426, 3438** ahşap tık (−6).
- **Geçiş (çıkış):** SERT (karanlık → P23).
- **Ekran yazısı:** "İlk siber saldırı" ALT-BANT, 3330–3462.
- **Anlatım:** "Bazıları buna ilk siber saldırı diyor." **Dokunuş:** morf.

### P23 · kare 3468–3600 · PARIS-MASA · LOOP
- **Kadraj/kamera (v2.2):** Tepe-önden, **`cs 1.06→1.14, cy 0→+40`** (P01 f0 ile birebir eşleşir; önceki taslakta cs 1.00 yazıyordu, P01 f0 cs 1.14 ile uyuşmazdı). Aynı masa, pencere A, **aynı geç gün ışığı**, kol A sabit. Paket ekranın %55'i, kabartı ~%30. Ölü alan P01 ile aynı çözüm (alt koyu şerit ve üst kiriş dışarıda).
- **Karakterler:** Paris adamının elleri (gri manşet, sağ manşette altın düğme).
- **Eylem:** 0–20 eldiveni kâğıda koyar · 20–54 kâğıt katlanır · **54–120 ipi çekerken beş parmak kabartısı** · **90 ip gerilir** · **114 düğüm sıkılır, kabartı yatışır** · 120–132 eller çekilir.
- **Temas:** **3482** eldiven · **3488, 3506, 3522** katlama · **3558** ip "zıııt" (−4) · **3582** düğüm tok (−5).
- **Süreklilik:** **Döngü:** son kare = P01 f0 kamerası (cs 1.14, cy +40). Kule kolu hareket etmez.
- **Geçiş (çıkış):** LOOP: SERT, müzik kesintisiz.
- **Ekran yazısı:** "Elektrik yok. Sadece…" ÜST-BANT, 3474–3600.
- **Anlatım:** "Kablo yok. Bilgisayar yok. Sadece..." **Dokunuş:** parmak kabartısı.

---

## 3. Süreklilik kontrol tablosu

| Öğe | Durum plan plan |
|---|---|
| **Beyaz eldiven (kanca/paket)** | P01 memurun elinde, kâğıttan çıkar, masaya bırakılır · P10 pakette (kımıldamaz) · P15 memurun elinde buruşuk · P16 elinde → yere düşer · P23 Paris'te pakete konur |
| **Louis'nin eldivenleri** | P02, P04, P06, P07: sağ göğüs cebinden **beyaz köşe** · P18 sırttan görünmüyorsa yan kesitten · P19 cepten çıkarılır, giyilir |
| **Louis'nin ciltli defteri** | P02 pupitrde (kurulum) → P15 "1835" |
| **Gri manşet (Paris adamı)** | P09 + P23: gri manşet, sağ mansette tek altın düğme. P21 görevlisi: **beyaz** manşet |
| **Louis'nin bastonu** | P04 sağ elde · P06 taş korkuluğa dayalı · P07, P08 masa kenarına dayalı · P14 masaya dayalı · P18–P19 sıraya dayalı |
| **Şapkalar** | Louis gri; François silindir; P04 sonunda François şapka elde; P18–P19 dizde |
| **Louis/François ekran yönü** | P02, P04, P18: François solda · P19 (ters açı): Louis solda |
| **Memur** | gri ceket, şapkasız, cepte eldiven köşesi: P01 (kol), P07, P08, P10 (kol), P11, P15 · P16–P17 gömlek |
| **Müdür / telgrafçı / suç ortağı** | Müdür yalnız P07 · telgrafçı P12–P13 · suç ortağı P14 |
| **Dürbün/teleskop** | P12–P13 sabit tüp (iki tüp), P14 pervaza kurulu |
| **Kule görünürlüğü** | P01 (A, kol A→B, geç gün ışığı) · P03/P05 (harita) · P06 (çan kulesi + T kol) · P07/P08 (A, B sabit, gece) · P11 (B uzak kule, insert köşesinde direk) · P12 POV X · P13 kendi direk + ufuk · P14 çan kulesi T kol · P16 (gece sabit) · P17 (dinlenme) · P21 (dinlenme) · P22 siluet · P23 (A) |
| **Kol konumları** | A = P01 f0 / P23. B = P01 f54 sonrası, P07, P08. X = P11→P14. Dinlenme = P17, P21 |
| **Işık** | P01, P10 geç gün ışığı + fener · P07, P08 tek mum (gece) · P16 mum (gece) |
| **Kamera eşleşmeleri** | P23 son = P01 f0 (cs 1.14, cy +40) · P05 başlangıç = P03 başlangıç |
| **İkinci kese / mühür / dormer / paket / saat / dosya / güve / sehpa / pervaz** | önceki sürümle aynı: P07→P08 kese · P05→P21 mühür · P06→P14 dormer · P09→P10→P23 paket · P18→P19 dosya (tokmak yok) · P20 güve p+0'dan · P16→P17 sehpa · P14 pervaz çentikleri |
| **Mahkeme nötrlüğü** | Cübbe tek koyu ton, haç/arma yok |

---

## 4. Senaryodan sapmalar ve yakalanan sorunlar

1. **Süre kaydırmaları (onaylı).** P09 2.0, P10 2.2, P14 2.4, P15 2.4 sn. Toplam 3600.
2. **P23 çelişkisi.** Kapalı paketle biter, eşleşen kesme; v2.2'de kamera cs de eşitlendi (P23 son = P01 f0).
3. **P01 kolun "şak"ı.** Kadraj dışı ikinci el manipulateur'de (kanca metaforu).
4. **P12 kurulum.** p+0–24 giriş eklendi.
5. **P08 ikinci kese**, 6. **P15/P16 eldiven**, 7. **P16/P17 yazan silüet**, 8. **P19 eldiven cebi**: kurulum→karşılık eklemeleri (önceki sürümle aynı).
9. **P18 → P19** ters açıda kardeşlerin ekran yönü tersine döner.
10. **Dürbün (dönem).** Sabit pirinç tüp; odak halkası/şlak/tezgâha bırakma yok.
11. **"Kardeşler"** kullanıldı.
12. **dokunuslar.md uyumu** (ilk tur + v2.1 dönem).
13. **P14** (kullanıcı kararı + dokunuş birlikte; 144 kare, kule 1.0 sn net).
14. **P04 insert ızgarası** (400,1130)'a kaldırıldı.
15. **P10** 55° eğik açı.
16. **P18 konuşma/sessizlik** düzeni.
17. **Dönem revizyonu (varsayılan):** P15 Alt-1, P19 (a), P01 geç gün ışığı, manipulateur itme/çekme, Saint-Michel çan kulesi.
18. **P18 → P19 iç çekiş** 2913.
19. **v2.2 yakalananlar (kullanıcı A2 geri bildirimi + yeni kurallar):**
   - **P04 göz kırpma ~45 px** (yüz ~90 px, A2): kesintisiz push-in ile François yüzü ≈260 px'e çıkarıldı; replik üst banda.
   - **P02 alt üçte bir boş damalı zemin:** karakterler yaklaştırıldı (z 1.8), ön plan figürleri ve kamera cy kayması eklendi.
   - **P07 memur göz kırpması** 230 px kuralını sağlayamıyordu: gövde irkilmesine çevrildi (yaratıcı yönetmen bilgilendirilecek).
   - **P08 el 200 px → ≥330 px**, **P16 el gevşemesi** orta planda küçüktü: insert 24 kare öne çekildi, **P21 çekiç eli** ~150 px'ti: ön plana alındı, **P18 saat 210 → ≥280 px**, **P20 güve 220 → 240 px**, **P03 at %11 → %13**, **P12 kaş %10 → ≥%12**, **P19 orta plan yüzleri** küçüktü: bel üstü/yakın konum.
   - **P23 kamera cs çelişkisi** (P01 f0 cs 1.14, P23 cs 1.00 yazıyordu) düzeltildi.
   - **Ölü alan:** P01 alt koyu şerit, P02 alt zemin, P04 alt kaldırım, P06 üst gök, P07 alt zemin, P09 alt avlu, P10 üst duvar, P15 alt yarı 1500–1920, P20 üst 480 px, P22 üst/alt gradyan: doldurma yöntemleri ilgili planlarda yazılı.
20. **Dönem:** %3 rente, ipe asılı réverbère, Notre-Dame yok, T regülatör, sarkaçlı saat, kurutma kumu, arma/taç yok.

---

## 5. Riskli planlar

| # | Plan | Risk | Önlem |
|---|---|---|---|
| R1 | P04 | Push-in 40 karede cs 1.06→2.40: hız, bulanıklık, ayak kesilmesi, parallax | easeInOutCubic; katman k değerleri; stil karesi 724'te test; gerekirse kesme (p+168'de François yakın plan klibine) |
| R2 | P19 | Dosya kapağı insert + orta plan yakın + parmak parmak eldiven; rig'de parmak yok | Ayrı "EldivenEl" varlığı; z 1.3'e alınan figürler için yakın ölçek varyantı |
| R3 | P15 | Bölünmüş montaj, yarılar 1920'ye kadar dolu, defter yazısı + yaprak + omuz | Üç katman; yaprak eğri parametreli |
| R4 | P14 | Odak kayması tüm kadrajda: swangle'da blur yavaş | İki katman keskin+bulanık, kare başı katman değişimi |
| R5 | P22 | Wi-Fi morfu neon'a kayabilir | Tahta dokusu, boya dolgusu |
| R6 | P02 | Ön plan figürleri + 12 figürlük kalabalık + 60 fps | Kalabalık statik siluet, 3 figür + 2 ön plan siluet animasyonsuz |
| R7 | P12/P13/P14 | Göz/kaş/esneme okunurluğu; P13 geri yaslan ≠ P14 öne eğil | Farklı klip; rig kontrolü |
| R8 | P01/P23 | Kapak karesi + loop kamera eşleşmesi | cs 1.14 / cy +40 sabit parametre |
| R9 | P03/P05 | Gerçek Fransa sınırı; tilt + yaklaşma | `Harita.tsx` yeniden kullanılır |
| R10 | P08 | El ≥330 px + gölge %22 + push-in aynı planda | Gölge katmanı ayrı |
| R11 | P16 | Insert kamerasının düşüşü izleyen pan'i | cy eğrisi yatak/zemin katmanlarıyla |
| R12 | P12 | Göz+kaş 460 px alan büyük vektör; yeterli detay | Büyük vektör parçaları; rig |
| R13 | P06 | Push-in cs 1.15→1.45 ve bel üstü cs 1.60 çatı arka planı kaybı | Çatı katmanı geniş çizilir |
| R14 | Genel | 60 sn tam kesim | Foley görüntüye kilitli |
| R15 | P11 | Direk karşılığı yalnız kol görünürken | Köşe katmanı bulanık direk + kol |

---

## 6. Önerilen stil kareleri

| Mekân | Plan | Mutlak kare | Neden |
|---|---|---|---|
| TOURS-KULUBE-IC (hook) | P01 | **60** | Eldiven yükselmiş, kol B'de; geç gün ışığı; kapak |
| TOURS-KULUBE-IC (oda) | P07 | **1226** | Çekmece BAM, üç karakter, alt üçte bir dolu |
| BORSA | P02 | **276** | Tebeşir tozu, kalabalık donmuş; ön plan figürleri (alt üçte bir dolu) |
| HARITA | P05 | **940** | Mühür + balmumu + kule hattı |
| SOKAK-BORDEAUX | P04 | **724** | François şapka kalkık, push-in ortası (cs ~1.4); ayrıca yüz kontrolü p+190 = 754 (cs 2.43, göz kırpma) |
| PARIS-AVLU | P09 | **1506** | Paket oturur, çizme |
| CATI-BORDEAUX | P06 | **1012** | Güvercin çıkışı, çan kulesi + T kol |
| CATI-KATI | P14 | **2264** | Çan kulesi net, ön plan bulanık |
| KULE-DIS | P13 | **2128** | Geri çekilmiş kadraj |
| YATAK-ODASI | P16 | **2520** | Orta plan: yatak, mum, sandalye silüeti |
| MAHKEME | P18 | **2850** | Huzmeler, kürsü, dosya, saat (≥280 px), ön plan sırtlar |
| KANUN-INSERT | P20 | **3148** | Güve açık, dolu üst/alt üçte bir |
| TOURS-KAPI | P21 | **3258** | Sürgü düştü |
| MONTAJ-15 | P15 | **2440** | Yaprak omza konarken |
| WIFI-MORF | P22 | **3438** | Tam Wi-Fi ikonu |
| PARIS-MASA | P23 | **3582** | Düğüm sıkıldı; P01 ile kamera eşleşmesi |
| Rig doğrulama (opsiyonel) | P19 | **3008** | Eldiven insert eli |

---

## 7. Foley / boşluk özeti

Tüm temas kareleri her plan bölümünde ve `sahne-plani.json` içinde `temaslar[]` olarak mutlak karelerle verildi. `ADIM` olayları `yuru()` fazından üretilir. v2.2 değişiklikleri: P04 göz kırpma sessiz kareleri 750–764; P07 memur irkilmesi 1230 (göz kırpma yerine); P16 kareleri değişmedi (2556, 2586, 2592). Kaldırılanlar (dönem): P12 odak halkası, P13 dürbün "tok", P14 şlak, P19 tokmak, P15 takvim yırtılması. Müzik/anlatım boşlukları: P04 insert (1.1 sn), P07→P08 0.3 sn, P11 müzik kısılır, P12 tam sessizlik p+100–130, P17 p+126–144, P18 p+96–132, P19 TOK'ta akor, P23→P01 kesintisiz. Üç "kapanma" sesi (P07 çekmece ahşap-içi dolu, P19 dosya karton-ahşap yankılı, P21 sürgü demir) benzememeli.

---

## 8. Kural taraması v2.2: "Küçük jest = yakın kamera" ve "Ölü alan yok"

Ölçüt: yüz/el ≥230 px (%12); kadrajın dikey üçte birleri (0–640, 640–1280, 1280–1920) dolu.

| Plan | Küçük jest | Önceki boyut | Sonuç / değişiklik | Ölü alan riski / çözüm |
|---|---|---|---|---|
| P01 | eldiven + el | ~330 px (A2) ✔ | Aynı; cs 1.14→1.06 | Alt ~160 px koyu şerit, üst kiriş: cs ile dışarı alındı |
| P02 | Louis yazması, tebeşir kırılması | Louis yüz ~130 px; toz 90 px | final cs 1.30 + z 1.8: yüz ≥230; toz ≥240 | **Alt üçte bir boş damalı zemin:** z yaklaştırma, ön plan siluet figürleri, cy kayması |
| P03 | at başı eğilmesi | %11 | cs →2.60, %13 | Harita dokusu tam kadraj |
| P04 | göz kırpma | yüz ~45–90 px | push-in cs 1.06→2.40 (kare kare tablo), yüz ≈260 px | Alt zemin: ön plan varil/kasa/oluk; replik üst bantta |
| P05 | – (mühür 300 px ✔) | | Değişiklik yok | Harita tam |
| P06 | kafes açma, fiske, bakış, saat | orta planda küçük | push-in cs 1.15→1.45; final bel üstü cs 1.60 | Üst gök: çan kulesi, bulut, güneş; sıkı planda şapka/pencere |
| P07 | memur göz kırpması | ~60 px | **Gövde irkilmesine** çevrildi (kural gereği) | Alt: masa ön yüzü, çekmece, zemin, sandalye bacakları |
| P08 | parmak tiki | el ~200 px | el ≥330 px, push-in cs 1.18 | Alt masa/kese/mum, üst gölge+pencere |
| P09 | manşet düzeltme, çizme | %18 ✔ (manşet küçük, ikincil) | Manşet sahne ikincil ögesi; dokunuş paket+çizme %18 | Alt: tekerlek, bot, kaldırım rayı |
| P10 | el + çorap | %30 ✔ | Değişiklik yok | Üst duvar/pencere ışığı, alt masa kenarı |
| P11 | damla + sap | %25 ✔ | Değişiklik yok | Dolu |
| P12 | kaş | %10 (192 px) | göz+kaş bölgesi ≥460 px, kaş ≥230 px | Alt: yanak, bıyık, halka, kutu |
| P13 | esneme | %15+ ✔ | Geri çekilme p+68'e kaydırıldı (esneme yakın planda biter) | Alt çit/yol, üst direk/gök |
| P14 | çentik kazıma (bıçaklı el) | %22 ✔ | Aynı | Alt pervaz/omuz, üst kiriş |
| P15 | tüy tutan el, öksürük | defter 300 px | el ≥230 px; alt yarı 1920'ye kadar dolu | Üst 0–220 perde/şamdan, alt 1500–1920 masa ön/ön plan |
| P16 | el gevşemesi, eldiven | orta planda küçük | insert p+36'ya çekildi (≥380 px), düşüşü izleyen pan | Insert tam dolu |
| P17 | kum serpme eli | 250 px ✔ | el+saçak ≥240 px | Alt sehpa/yorgan |
| P18 | saat ibresi TIK | saat 210 px | saat ≥280 px, push-in 315 px | Alt ön plan sırtlar, üst panel |
| P19 | gülümseme, eldiven giyme | orta planda yüzler ~120 px | bel üstü, z 1.3, yüz ≥240 px; insert ≥380 px | Alt korkuluk/şapkalar, üst panel |
| P20 | güve, sayfa çevirme | güve 220 px | güve 240 px; kitap y 560–1380 | **Üst 480 px boştu:** kol + hokka + huzme; alt dosya yığını |
| P21 | çekiç eli | ~150 px | ön plan el ≥260 px; sürgü push-in 270 px | Alt eşik/basamak |
| P22 | – morf ≥600 px | | Değişiklik yok | Üst bulut/yıldız, alt tepe/çit |
| P23 | parmak kabartısı %30 ✔ | | cs P01 f0'a eşitlendi | P01 ile aynı |

**Toplam 3600 kare korundu; plan başlangıç/bitiş kareleri değişmedi.** Değişenler plan içi kamera/konum/jest zamanı: P04 (wink 750–764, subtitle üst bant), P07 (1230 irkilme), P16 (insert p+36), P13 (geri çekilme p+68), P23 (cs), P20 (kitap konumu).
