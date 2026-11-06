# Blanc Kardeşler · Storyboard v2 · Sahne Planı (v2.3: oyunculuk = yakın plan, motion değerleri, Eleştiri B)

Girdi: `senaryo-v2.md` (v2.1), `arastirma.md`, `dokunuslar.md` (v2.1 dönem), `donem-dogrulama.md`, `mekanlar.md`, `elestiri-B.md`, motion A2 raporu (katki-raporu.md), kullanıcı geri bildirimi (A2 kareleri `kareler/SB2-{TOURS,SOKAK,BORSA}.png`) ve CLAUDE.md'deki kurallar. Kullanıcı kararları: süre 60.0 sn tam kesim (3600 kare), "kardeşler", P14 maskesiz, P22 kukla/tahta (neon yok), 8 yeni mekân tam detay, **göz kırpma (P04) kalsın, kamera yaklaşsın**. Ses: ElevenLabs Umut Canbay (TR). 1080x1920 @ 60 fps.

**Kurallar (bu planın uyduğu):**
- **Küçük jest = yakın kamera:** göz kırpma, kaş, esneme, el gibi jestlerde yüz/el ≥ %12 (~230 px).
- **Ölü alan yok:** dikey kadrajın hiçbir üçte biri (0–640, 640–1280, 1280–1920) boş kalmaz; ufuk–ölçek kuralına uyulur.
- **Önemli oyunculuk = yakın plan:** duygu, karar, ifade değişimi, replik sonu yakın plan (yüz) ya da bel plan; geniş/boy plan yalnız mekân kurulumu ve fiziksel eylem. Her plan için **çekim ölçeği** (aşağıda Bölüm 1 sütunu + her planda "Çekim ölçeği" satırı), filmin oyunculuk anları Bölüm 9'da, rig yüz kalitesi gerektiren planlar Bölüm 10'da.
- Plan süreleri ve toplam **3600 kare değişmedi**; gerektiğinde plan içi kesme kullanıldı.

**v2.3 değişiklikleri (özet):** (a) motion'ın değerleri işlendi: P02 oda (xFar 230–850, yFar 1030, efektif ufuk ≈ 280, kamera ≈ 3.5 m) ve z 1.65/1.75; P04 z 2.4/2.45, ızgara z 2.6 u 0.32, replik üst bant, fare insert yeniden kadraj; P01 manipulateur kadraj dışı sağda; (b) P04 göz kırpma kalır, push-in cs 3.2'ye kadar (yüz ≈ 240 px); (c) P01 f0 için telefonda okunur kol konumu (A: düz T, B: asimetrik); (d) P02 isim etiketleri p+78–86'da çıkar, tebeşir kırılması p+90; (e) P04 bastonu tutan el görünür; ek: Eleştiri B kritikleri (paket yumuşak kâğıt, ip çözülmüş, kol koni, Borsa yuvarlak kemer, tricolore kalktı); oyunculuk = yakın plan için P02, P07, P13, P16 planlarına plan içi kesmeler eklendi.

**Dönem revizyonu (varsayılan kararlar):** P15 = Alt-1 (elle yazılmış "1835" defter sayfası); P19 = (a) tokmaksız, dosya kapağı TOK; P01 geç gün ışığı; dürbünler sabit; manipulateur itme/çekme; Bordeaux sinyali Saint-Michel çan kulesi üstünde.

---

## 0. Okuma kılavuzu

**Kare.** Mutlak kare = sn x 60. Bir plan `start` karesinde başlar, `end` karesinde biter (end hariç). `p+N` = plan başından N. kare. Temas karesi mutlak yazılır: `2925 (p+9)`.

**Koordinat (karakter konumu).** Sokak/dış mekânlarda `Sokak.tsx` ile aynı: `z` = derinlik (1 yakın … ZMAX 7), `u` = yanal (0 sol … 1 sağ). İç mekânlarda aynı sözleşme (`ODALAR`/`oda().zemin`). Zemin noktası = `zemin(z,u)`; ayak ve baston ucu bu noktaya basar.

**Kamera notasyonu.** Ekran = (540+cx + cs·(x−540), 960+cy + cs·(y−960)); katmanlar paralaks k ile (gök 0.25, uzak 0.55, orta/karakter 1, ön plan 1.25–1.3) aynı eğriyi izler.

**Çekim ölçekleri.** geniş (mekân, figürler küçük) · boy (baştan ayağa) · bel (belden yukarı) · göğüs (göğüsten yukarı) · yakın (yüz) · insert (nesne/el). "Yüz yüksekliği" = baş (şapka hariç) ekran px'i.

**Ekran yazısı bantları.** ÜST-BANT y 240–400, x 80–1000 (etiketler, yıllar, **P04 repliği**); ALT-BANT y 1290–1490 (P08/P17 altyazıları, üstte içerik yoğunsa etiketler). Yüz, nesne, kule kolu y 420–1290.

**Seviye.** YAKIN −2…−4, ORTA −5, GENİŞ −8 dB; müzik ~−18 dB.

**Geçiş sözlüğü.** SERT · MATCH · KÂĞIT · SAME. Fade/çapraz çözülme yok.

**Mekân sözlüğü.** BORSA, TOURS-KULUBE-IC, KULE-DIS, PARIS-AVLU, CATI-BORDEAUX, CATI-KATI, YATAK-ODASI, MAHKEME; HARITA, SOKAK-BORDEAUX; varyant: PARIS-MASA, TOURS-KAPI, KANUN-INSERT, MONTAJ-15, WIFI-MORF.

**Ses zamanı notu.** `zamanlama.json` yok; anlatım kareleri tahmini; foley görüntüye kilitli.

**Tours kulübesi (dönem).** Manipulateur içeride, direk dibindeki odada (kablo + makara), kumanda itme/çekme. Pencere A (direk penceresi, direk ~12 m dışarıda: mekanlar.md Seçenek 1, tam T siluet), pencere B (Paris yönü). Dürbünler sabit kutuda. Kule kolu dokunuşu yalnız P01. Telgraf gece çalışmaz: P07/P08/P16/P17'de kollar sabit.

**Kule kol konumları (kanca okunurluğu için, v2.3).** **A (ILK, P01 f0 ve P23 son):** iki gösterge regülatörle aynı doğrultuda dışa uzanmış, **düz T çubuğu** (kalın mavi direk + siyah yatay çubuk); telefonda "T" okunur, üçgen kurmaz. **B (SAK, P01 f54 sonrası, P07/P08):** sol gösterge **dikey yukarı 90°**, sağ gösterge **dışa-yukarı +45°** (direkten uzaklaşan; önceki "içe-aşağı −45°" direkle üçgen kurup vinç/darağacı çağrışımı veriyordu, Eleştiri B TB6). A→B geçişi tek bakışta okunur (yatay çubuktan asimetrik "7"ye). Kod eşlemesi motion'da (ChappeKule açı sözleşmesinde sağ gösterge "dışa" yönü).

---

## 1. Plan özeti

| Plan | start–end (kare) | sn | Mekân | Tip | Dokunuş | Çekim ölçeği (plan içi) | Çıkış geçişi |
|---|---|---|---|---|---|---|---|
| P01 | 0–156 | 2.60 | TOURS-KULUBE-IC (masa) | kinetic | kol "şak" | insert/yakın (el+eldiven), tek çekim, cs 1.14→1.06 | SERT |
| P02 | 156–360 | 3.40 | BORSA | character | tebeşir kırılır | geniş (0–90) → boy/orta tebeşir (90–150) → **göğüs Louis (150–186, kesme)** → boy (186–204) | MATCH (PARIS yazısı) |
| P03 | 360–564 | 3.40 | HARITA | map | gün-gece + at yorgunluğu | harita (grafik) → at **yakın** (132–204) | SERT (ses köprüsü) |
| P04 | 564–780 | 3.60 | SOKAK-BORDEAUX | character | baston–fare | boy (0–78) → insert (78–144) → **bel (144) → push-in göğüs → yakın (180–216)** | SERT |
| P05 | 780–996 | 3.60 | HARITA | map | sollama + mühür | harita (grafik) | MATCH (mühür→güneş) |
| P06 | 996–1128 | 2.20 | CATI-BORDEAUX | character | tüy + fiske | boy→bel push-in (0–44) → insert (44–104) → **bel/göğüs (104–132)** | SERT |
| P07 | 1128–1284 | 2.60 | TOURS-KULUBE-IC | character | çekmece çarpması | orta/boy (0–30) → **bel müdür (30–66, kesme)** → orta/boy (66–156) | SAME |
| P08 | 1284–1440 | 2.60 | TOURS-KULUBE-IC | character | parmak tiki + duvar gölgesi | **yakın** Louis (0–60) → **yakın→göğüs** memur (60–156), el alt kadranda | SERT |
| P09 | 1440–1560 | 2.00 | PARIS-AVLU | character | paket kayar, çizme | orta/boy (fiziksel eylem) | MATCH (paket) |
| P10 | 1560–1692 | 2.20 | TOURS-KULUBE-IC (masa) | document | çorabı kaldıran el | insert/orta (eğik masa) | SERT |
| P11 | 1692–1884 | 3.20 | TOURS-KULUBE-IC → insert | tower | ter damlası | **bel** memur (0–64) → insert (64–192) | MATCH (halo→maske) |
| P12 | 1884–2028 | 2.40 | KULE-DIS | tower | kaş | bel (0–24) → POV maske (24–70) → **aşırı yakın** (70–144) | SERT |
| P13 | 2028–2184 | 2.60 | KULE-DIS | tower | esneme | **göğüs/yakın** (0–68) → boy→geniş geri çekilme (68–130) | MATCH (kule→kule) |
| P14 | 2184–2328 | 2.40 | CATI-KATI | tower | pervaza çentik kazıma | omuz üstü bel/orta + pervaz insert-benzeri (0–144) | SERT |
| P15 | 2328–2472 | 2.40 | MONTAJ-15 | chart | "1835" defter sayfası | üst: göğüs/bel Louis+defter; alt: **bel** memur | MATCH (memur) |
| P16 | 2472–2640 | 2.80 | YATAK-ODASI | character | eldiven düşer | **göğüs/bel** memur (0–36) → insert (36–168) | SAME |
| P17 | 2640–2784 | 2.40 | YATAK-ODASI | character | kurutma kumu | **yakın** yüz + el insert-benzeri (0–144) | SERT |
| P18 | 2784–2916 | 2.20 | MAHKEME | character | sarkaçlı saat TIK | geniş (kuruluş) + saat push-in | SERT |
| P19 | 2916–3036 | 2.00 | MAHKEME | character | Louis eldiven giyer | insert (0–26) → **göğüs/yakın** (26–52) → insert (52–120) | KÂĞIT |
| P20 | 3036–3192 | 2.60 | KANUN-INSERT | document | güve | insert (tepe) | SERT |
| P21 | 3192–3324 | 2.20 | TOURS-KAPI | tower | sürgü düşer | orta + ön plan el → sürgü push-in | MATCH (direk) |
| P22 | 3324–3468 | 2.40 | WIFI-MORF | kinetic | Wi-Fi morfu | geniş→yakın zoom (grafik) | SERT (karanlık) |
| P23 | 3468–3600 | 2.20 | PARIS-MASA | document | parmak kabartısı | insert/yakın, cs 1.06→1.14 | LOOP→P01 |

Toplam 3600 kare = 60.00 sn. Onaylı süre sapmaları: P09 2.0, P10 2.2, P14 2.4, P15 2.4 sn.

---

## 2. Planlar

### P01 · kare 0–156 · TOURS-KULUBE-IC (masa varyantı) · KANCA
- **Çekim ölçeği:** insert/yakın (el + eldiven + paket), tek çekim, tepe-önden; el ≥%12 (A2'de eldiven ~330 px ✔).
- **Kadraj/kamera:** `cs 1.14→1.06, cy +40→0` (alt koyu şerit ve üst kiriş dışarıda; Eleştiri B TB7: masa ön yüzü ≈120 px, ahşap pah). Işık geç gün ışığı / erken akşam (+ küçük fener). Pencere A kanca yazısının altında x 560–1000, y 450–770; **kule konumu f0 = A (düz T çubuğu), f54 sonrası = B** (bkz. kol konumları). Manipulateur kadraj dışı sağda (makara ipi kirişten iner).
- **Paket (Eleştiri B TB1/TB2):** yumuşak açılmış **kâğıt paket**: düz yatan kahverengi paket kâğıdı, dört kanat masaya yatık (uçları hafif kalkık, kat çizgisi ışık+gölge), eldiven yatağı sığ kırışık; karton koli/yan duvar yok. **İp çözülmüş**: iki ucu masada gevşek kıvrık, kâğıtta fiyonk izi (ezik çizgi); havada düğüm yok. "TOURS" kart etiketi (x ≤ 880, P09/P10/P23 ile ortak çizim).
- **Kol/el (TB3/TB4):** memurun kolu sol kenardan (y ≈1250–1400) girer; kameraya doğru genişleyen koni (bilek ≈90 px → kenarda ≈200 px), dirsekte 25–35° kırılma, 3–4 kumaş kırışığı, manşet ve yama; el ince, kemikli (EldivenEl ile ortak çizim). Eldiven tutuluşu: işaret parmağı manşette, başparmak dışta.
- **Karakterler:** Memurun eli (gri ceket kolu, sol el). Yüz yok.
- **Giriş/çıkış:** El sol kenardan girer (kare açılırken içeride).
- **Zaman çizelgesi (p+N):** 0 eldiven kâğıttan yarı çıkmış, el çekiyor · 0–54 eldiven yükselir · **54 eldiven kâğıttan tamamen ayrılır; aynı karede** direkte kol A→B "şak" · 60 kâğıt masaya yatar · 62–134 el eldiveni havada tutar, titreme sönümlenir (kol B'de net 1.7 sn) · **134–142 eldiveni sol-alttaki fener ışık havuzuna (≈ (180,1120)) bırakır (Eleştiri B TB5: kapanış karesinde bırakılmış olmalı)** · 142–156 hareketsiz.
- **Temas:** 0 (süren) kâğıt sürtünmesi (0–54) · **54** direk kolu "klak" (−3) · 60 kâğıt masaya yatar · **140** eldiven masaya "tap" (ORTA).
- **Süreklilik:** Kurulum → P08/P11/P17/P21/P22 (aynı direk). Kol A = P23 son kare; P23 son karesi P01 f0 kamerasına (cs 1.14, cy +40) eşleşir.
- **Fizik:** Direk pencere A'nın dışında (12 m); kablo kirişten manipulateur'e. Kolu oynatan ikinci el kadraj dışında.
- **Geçiş (çıkış):** SERT, "tap"tan 14 kare sonra.
- **Ekran yazısı:** "1834. Bilgisayar yok." ÜST-BANT, f0'dan itibaren tam görünür, 0–156. Kapak ayrı: "ELDİVENLE DEVLETİ HACKLEDİLER".
- **Anlatım:** "Bu eldiven, Fransız devletinin ağını hackledi." **Dokunuş:** kol "şak".

### P02 · kare 156–360 · BORSA
- **Çekim ölçeği:** geniş (p+0–90, dolly cs 1.00→1.15) → boy/orta tebeşir (p+90–150) → **göğüs Louis (p+150–186, kesme)** → boy (p+186–204).
- **Oda (motion A2 değerleri):** `ODALAR.borsa` xFar 230–850, yFar 1030; **efektif ufuk ≈ 280, efektif kamera ≈ 3.5 m** (Eleştiri B BB4). Yuvarlak (plein cintre) kemerli pencereler, iyonik pilastr, dentilli korniş, estrad + merdiven; **sivri kemer yok** (Gabriel klasik dili; Eleştiri B BB1). **Tricolore kaldırıldı** (kanıtsız iç mekân detayı, kırmızı kuralı; BB3). En az bir pencere tam görünür (BB6: ışık kaynağı). Tahta 400×228, başlık "PARIS · RENTE 3%" (dünya y≈562, dolly sonunda ekran y≈430; MATCH korunur).
- **Karakter z (motion):** François **z 1.65**, Tüccar **z 1.65**, Louis **z 1.75** (efektif ufka göre ölçek tutarlı; ayak y ≈1420). Yüz ≈80 px (geniş/boy); yakın plan için aşağıdaki Louis göğüs çekimi.
- **Kadraj/kamera:** p+0–90 `cs 1.00→1.15, cy +100→+40`; p+90–150 `cs 1.15→1.22, cy +40→+10, cx 0→+20` (tahta, katip, toz, kalabalık ve ön üçlü); **p+150–186 kesme: Louis göğüs planı, `cs 2.8, cx −392, cy −188` (A2 temel kadrajına göre), yüz merkezi ≈ (540,800), yüz ≥240 px**, defter, kalem ve kalem tutan el kadrajda, arka planda kalabalık siluetler tahtaya dönmüş bulanık; p+186–204 kesme: boy plan `cs 1.30, cy −40` dolly sonu. **Ölü alan:** ayaklar alt yarıya ≈1420–1560 oturur; alt üçte bir: sol kenarda bulanık sütun gövdesi (x 0–90, y 900–1920), sağ-altta bir pencere ışık yaması, iki ön kenar siluet figürü (z ~1.2: **başları y ≈1000–1100**, gövdeleri alt üçte biri doldurur, ayaklar kadraj dışı; efektif ufuk 280/kamera 3.5 m kuralına göre baş y 1500+ ihlali yok). Üst üçte bir: sütun başlıkları, korniş, tahta başlığı.
- **Karakterler:** François u 0.40 (lacivert frak, silindir; sağ eliyle Tüccar'ın omzunu tutar, gülerek konuşur), Tüccar u 0.24 (kır sakal, bıyıksız, geniş kenarlı şapka, tıknaz), Louis u 0.62 (bordo frak, gri şapka; ciltli defter pupitrde; sağ göğüs cebinde beyaz eldiven köşesi). Katip platformda (z 5.5, u 0.50). Kalabalık 12 + 2 ön kenar siluet (yüzsüz, iki tonlu).
- **İsim etiketleri (Eleştiri B BB2):** her biri kendi karakterinin şapkasının üstünde (bağlantı çizgisi 30 px). **Görünür p+0–78, p+78–86 arasında yukarı kayarak çıkar (p+86'da tamamen yok); tebeşir kırılması p+90.** Louis etiketi x ≥720, y 560–650'de; tebeşir kırılma noktasının (≈ tahtanın sağ-alt köşesi) ≥150 px dışında; hiçbir zaman toz bulutu ya da düşen parçanın üzerinde değil. Etiketler p+86'dan sonra bir daha gelmez.
- **Giriş/çıkış:** Hepsi kare açılırken içeride.
- **Zaman çizelgesi:** 0 dolly başlar · 30–88 katip rakam yazar · 78–86 etiketler çıkar · **90 tebeşir kırılır** (beyaz toz ≥240 px; parça ≥14 px, açık renk koyu kontur) · 90–114 parça platformdan düşer, iki sekme · 96–126 kalabalık tahtaya döner, **donar** (126–150; kırılma + toz + donma ≥1.0 sn net: p+90–150) · **150 kesme: Louis göğüs** (kafası kalkmaz, yazmaya devam; soğukluk) · 186 kesme: boy, dolly sonu · **192 katip yarım tebeşirle ilk çizgiyi çeker** (kapanış).
- **Temas:** süren tebeşir cızırtısı (186–244) · **246 (p+90)** tebeşir "çıt" · **258 (p+102)** sekme-1 · **270 (p+114)** sekme-2 · **348 (p+192)** yarım tebeşir "cız" · kalem cızırtısı süren (kısık; Louis göğüs çekiminde yakın, −8) · kalabalık uğultusu p+90–168 arası 0.5 sn kısılır.
- **Süreklilik:** Louis cep eldiven köşesi (→P19); ciltli defteri (→P15). François solda, Louis sağda.
- **Fizik:** Katip platformda; ön plan siluetler zemine basar (ayaklar kadraj dışı, temas gölgesi kadraj kenarında). Ölçek efektif ufka göre.
- **Geçiş (çıkış):** MATCH ("PARIS" (540,430)).
- **Ekran yazısı:** "Oyun: Paris'teki tahvil fiyatı" ÜST-BANT, 162–354.
- **Anlatım:** "Bordeaux'lu kardeşler François ve Louis Blanc, devlet tahviline oynuyor." **Dokunuş:** tebeşir kırılması + Louis'nin soğukluğu (göğüs çekimi).

### P03 · kare 360–564 · HARITA
- **Çekim ölçeği:** harita (grafik); p+132–204 **at yakın** (cs →2.60, at ≥%13 = 250 px).
- **Kadraj/kamera:** Tepe harita. `cs 1.30`, p+0–132 `cy +300→−300`; p+132–170 `cs 1.30→2.60`. Paris (540,430). Disk 200 px sol kenar x 80–280, y 340–540; sayaç altında. Ölü alan yok: harita dokusu, kıyı/deniz, pusula gülü alt-sağ köşede.
- **Eylem:** Posta arabası Paris→Bordeaux. **Üç gün-gece döngüsü** (0.7 sn): p+6–48, 48–90, 90–132; her gece harita %35 kararır, araba feneri yanar. p+132 araba Bordeaux'da durur, toz yok. p+132–180 kamera yaklaşır, at tek nefes (p+150), **başını öne bırakır** (150–180). p+180–204 hold.
- **Temas:** **408, 450, 492** gün "tık" (492'de tekerlek/toynak durur) · **510 (p+150)** at nefesi · toynak kısık (366–492).
- **Süreklilik:** Tours düğümü (→P07); araba/rota (→P05). Hat sırası Paris–Étampes–Orléans–Tours–Poitiers–Angoulême–Lormont–Bordeaux (donem-dogrulama Ek 2; Blois/Chartres yok).
- **Geçiş (çıkış):** SERT; ses köprüsü at nefesi → P04 ıslak adım.
- **Ekran yazısı:** "Paris → Bordeaux: 3 GÜN" ÜST-BANT, 366–558.
- **Anlatım:** "Fiyat Paris'te belirleniyor. Haber Bordeaux'ya üç günde geliyor." **Dokunuş:** gün-gece döngüsü + at yorgunluğu.

### P04 · kare 564–780 · SOKAK-BORDEAUX (gece)
- **Çekim ölçeği:** boy (p+0–78, orta/geniş yürüyüş) → insert (p+78–144) → **bel (p+144, kesme) → push-in göğüs → yakın (p+180–216)**. "kazanır" (replik sonu) göğüs→yakın; göz kırpma ve sırıtış yakın (yüz ≈240 px).
- **Motion değerleri (A2):** karakterler durduklarında François **z 2.4**, Louis **z 2.45** (ayaklar y ≈1420); **ızgara z 2.6, u 0.32** (ekran ≈ (440,1390), plan başından görünür; ay kenar ışığıyla biraz parlatılır, kurulum). Replik **ÜST-BANT**. Saint-Michel x 622 silik siluet (mekanlar.md 9: sol-arka, çatıların arkasında; kule tepesi y ≥410). François p150'den bakışını kameraya çevirir.
- **Kadraj/kamera:**
  - **p+0–78 boy/orta plan** (alçak açı): `cs 1.00→1.10, cy 0→−20`. François z 3.2→2.4 (u 0.46), Louis z 3.3→2.45 (u 0.70; François'ya göre ekran sağında, birbirinin gövdesini örtmez). **Alt üçte bir ön plan (mekanlar.md 9):** TONNELIER fıçısı + eşik, CHAPELIER basamağı + chasse-roue, ön birikinti ve ıslak taş yansımaları (y 1560–1900, k 1.3). Sol cephede küçük resmî yapıda tricolore (x 150–390, y 480–700; yazı/karakter/ip/fenerle çakışmaz). Ayaklar y ≈1420 (alt 420 dışında).
  - **p+78–144 INSERT** (kaldırım hizası, statik; **fare insert yeniden kadraj:** ızgara insert merkezi sol-orta **(300, 1130)**, ufuk y 700; Louis'nin bordo paçası + baston ucu sağdan girer, x ≈800–900). Fare boyu %12 (≥230 px). **Fare ızgaradan çıkar, Louis'nin ayağına doğru ~200 px yürür; baston fare'nin önüne iner; fare aynı ızgaraya koşarak döner** (ızgara u 0.32, Louis u 0.70: arasındaki mesafe insert'te fare yürüyüşüyle kapatılır).
  - **p+144–216 bel → göğüs → yakın (tek kesintisiz push-in, kesmeden sonra bel planda başlar).** François yüz merkezi dünya ≈ (492,1070), yüz yüksekliği ≈75 px @cs 1 → hedef ≥230 px: `cs 3.2` (≈240 px). `e = easeInOutCubic(t)`, `t=(f−144)/36` (f=144…180), `cs = 1.70+1.50e`, `cx = 81.6+72e`, `cy = −247−265e` (hedef: yüz ekran (540, 800); bel planda hat ve Louis'nin baston eli kadrajda; sonda dünya x 323–660, y 820–1420). Kare kare:

| p+N | t | cs | cx | cy |
|---|---|---|---|---|
| 144 | 0.000 | 1.700 | 81.6 | −247.0 |
| 148 | 0.111 | 1.708 | 82.0 | −248.5 |
| 152 | 0.222 | 1.766 | 84.8 | −258.6 |
| 156 | 0.333 | 1.922 | 92.3 | −286.2 |
| 160 | 0.444 | 2.227 | 106.9 | −340.0 |
| 164 | 0.556 | 2.673 | 128.3 | −418.9 |
| 168 | 0.667 | 2.978 | 142.9 | −472.8 |
| 172 | 0.778 | 3.134 | 150.4 | −500.3 |
| 176 | 0.889 | 3.192 | 153.2 | −510.6 |
| 180 | 1.000 | 3.200 | 153.6 | −512.0 |
| 198 | – | 3.260 | 156 | −517 |
| 216 | – | 3.300 | 158 | −522 |

  (180–216 doğrusal yavaş sürüklenme; aradaki kareler formülle üretilir.) Paralaks k: gök 0.25, uzak 0.55, karakter 1, ön plan 1.3.
- **Baston ve el (Eleştiri B SK1, kritik):** Baston **Louis'nin dış (ekran sağı) elinde, gövdesinin sağında**; kavrayan el ve parmaklar bel planda (p+144–168) tam görünür; baston ucu Louis'nin dış ayağının önünde, taşa değer (tutulan nesne eli takip eder, `bastonAcisi`/`kolIK`). Baston François'nın bacaklarının önünden geçmez, iki kardeşin arasında serbest durmaz; kardeşe dokunan kol ayrı ve boş. Insert'te baston ucunun "sağdan girmesi" ile tutarlı.
- **Giriş/çıkış:** Karakterler kare açılırken sokak ortasında yürüyor. Fare ızgaradan çıkar ve aynı ızgaraya girer.
- **Zaman çizelgesi:** 4–74 "Herkesten önce bilen" · **78 kesme: insert** (müzik 1.1 sn sessiz) · 78–87 boş ızgara, paça yaklaşır · **87–96 fare ızgaradan çıkar** · 96–104 fare Louis'ye doğru iki adım · 100–108 baston iner · **108 TAK** · 110 fare irkilir · **112–130 fare ızgaraya koşar**, 128 dalış · **138 kuyruk ucu "tink"** · 138–144 boş ızgara · **144 kesme: bel plan, push-in başlar** · 144–162 François şapkasını kaldırır · 146–176 "kazanır" (replik sonu, göğüs→yakın) · 150 Louis durur, baston ucu taşa (el bel planda görünür) · **180–186 François kameraya bakar, hazırlık** · **186–200 göz kırpma (yakın, yüz ≈240 px)** · 200–216 sırıtış (yakın).
- **Temas:** adımlar `yuru()` fazından (~564+6, +20, +34, +48, +62, +72) · **651 (p+87)** fare pençesi ızgara demirine · 660–668 fare adımları (taş tıkırtısı) · **662 (p+98)** Louis'nin çizmesi (insert) · **672 (p+108)** baston ucu taşa "TAK" (−2) · **674 (p+110)** fare irkilme · **692 (p+128)** fare kafese dalış · **702 (p+138)** kuyruk ucu "tink" · **714 (p+150)** Louis durur, baston ucu "tık" · 750–764 (p+186–200) göz kırpma sessiz.
- **Süreklilik:** Izgara p+0'dan kurulu (ekran (440,1390)). Şapka kalkık elde biter. Louis cep eldiven köşesi.
- **Fizik:** Baston ucu `zemin(z,u).y`'de. Cut yürüyüş döngüsü sürerken. Push-in'de François'nın ayakları kadraj dışına çıkar (bel üstü), kesilen kısım zeminde.
- **Geçiş (çıkış):** SERT, sırıtıştan sonra.
- **Ekran yazısı:** **ÜST-BANT** (y 240–400): "FRANÇOIS" etiketi + "Herkesten önce bilen… kazanır." (okunan kelime kırmızı), 568–760. Alt bantta yazı yok.
- **Anlatım:** FRANÇOIS (alçak, sinsi). **Dokunuş:** baston–fare (tek). Göz kırpma oyunculuk (kullanıcı kararı: kalır).

### P05 · kare 780–996 · HARITA
- **Çekim ölçeği:** harita (grafik); mühür ≥300 px.
- **Kadraj/kamera:** P03 başlangıç kadrajı, `cs 1.30, cy +300→+220`. Mühür merkezi (540,880), çap ~300 px. Harita dokusu tam kadraj.
- **Eylem:** A) p+24–108 ışık sinyali, 9 kule ikonu, sinyal p+64'te arabayı **sollar** (rüzgâr/toz yok). B) p+132–150 mühür iner, **p+150 tok**, balmumu taşar (150–174), hat kırmızıya boyanır (156–190), 190–216 hold. Araba p+146'da durur.
- **Temas:** 780 tekerlek kısık · kule klakları **804, 820, 834, 846, 856, 864, 871, 877, 882** · **844** whoosh · **926** araba durur · **930** mühür "tok" (−3) · 930–954 balmumu.
- **Süreklilik:** Mühür → P21 ilanı. Kule sırası P03 ile aynı.
- **Geçiş (çıkış):** MATCH (mühür (540,880) → P06 güneş diski).
- **Ekran yazısı:** "Telgraf: BİRKAÇ SAAT · halka kapalı" ÜST-BANT, 786–990.
- **Anlatım:** "Devletin telgrafı ise birkaç saatte getiriyor. Ama sadece devlete." **Dokunuş:** sollama + mühür.

### P06 · kare 996–1128 · CATI-BORDEAUX (şafak)
- **Çekim ölçeği:** boy→bel push-in (p+0–44) → insert sol önkol (p+44–104) → **bel/göğüs Louis (p+104–132, yüz ≥260 px, cs 1.60)**.
- **Kadraj/kamera:** p+0–44 `cs 1.15→1.45` (kafes ve el ≥230 px). p+44–104 insert, statik. p+104–132 `cs 1.60`, Louis kafa kalkışı ve saatli el. **Ölü alan:** üst üçte bir çan kulesi + T kol, bulut, güneş, güvercin; sıkı planda şapka + dormer; alt üçte bir çinko teras, korkuluk, kafes ayağı, baca kümeleri.
- **Çatı:** %70 tuile canal, düşük eğim, baca kümeleri, çinko teras. Dormer (soldan 2.), sağ ufukta **Saint-Michel çan kulesi (külahsız) + T kol siluet** (→P14). Güneş doğuyor.
- **Karakterler:** Louis z 2.0, u 0.45 (sol elinde cep saati, baston taş korkuluğa dayalı). Kafes korkuluk üstünde z 2.3, u 0.62.
- **Zaman çizelgesi:** 0–10 kafes kapağı · 14 güvercin iter · **16 tüy kopar**, bordo sol önkola süzülür · 40 güvercin çıkar, tüy kola konar · 44 **insert** · 56–80 Louis gökyüzüne bakar · **84 sağ işaret parmağıyla fiske**, tüy savrulur (84–104) · 104 **bel/göğüs**: Louis boş gökyüzüne bakar (sabırsız hesapçı) · **120 saat kapağı çat** · 120–132 hold.
- **Temas:** 1000–1006 menteşe · **1006** kapak "tık" · **1010** güvercin "pat", kanat 1010–1038 · **1036** tüy kumaşa (−8) · **1080** fiske (−5) · **1116** saat "çat".
- **Süreklilik:** Tüy orta planda kurulur. Güneş diski (→P05 mühür). Dormer + çan kulesi (→P14).
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Plan A: Güvercin — başarısız" ÜST-BANT, 1002–1122.
- **Anlatım:** "Önce güvercin denediler. ...Olmadı." **Dokunuş:** tüy + fiske.

### P07 · kare 1128–1284 · TOURS-KULUBE-IC (gece)
- **Çekim ölçeği:** orta/boy profil (p+0–30, pan) → **bel müdür (p+30–66, plan içi kesme; yüz ≥230 px)** → orta/boy (p+66–156, kamera sabit `cs 1.08, cx +110`).
- **Kadraj:** Çekmece ön yüzü y 1250–1400. **Ölü alan:** alt üçte bir masa ön yüzü, çekmece, zemin döşemesi, sandalye bacakları, Louis'nin botları; üst üçte bir kapı, duvar, pencere A (direk sabit B), mum yansıması. Tek mum masada.
- **Karakterler:** Louis z 2.0, u 0.22 (baston masa kenarına dayalı; önünde **iki** altın kesesi). Müdür z 2.0, u 0.60. Memur z 2.8, u 0.78 (gri ceket, şapkasız). François z 3.4, u 0.08 (kapı aralığında gölgede, gülümser).
- **Giriş/çıkış:** Kapı arka duvar solda; pencere A sağda. Kimse girip çıkmaz.
- **Zaman çizelgesi:** çekmece **plan başında yarı açık** · 0–30 orta: Louis keseyi müdüre kaydırır (kese sürtünmesi 6–30) · **30 kesme: müdür bel planı** (yaşlı, iri, koyu yelek; gözleri keseye, uzanır, kese avucunda; açgözlülük) · 40 kese durur · 54 kese avucunda · 62 sikkeler masaya · **66 kesme: orta/boy** · 76–90 süpürür, sikkeler çekmeceye · **98 çekmece BAM**, kamera sabit (hold 98–156) · **102 memur irkilir** (omuz + baş geri, gövde jesti) · François gülümser (kapanış).
- **Temas:** 1134–1158 kese sürtünmesi · **1168 (p+40)** kese "tok" · **1190 (p+62)** sikkeler · **1216 (p+88)** sikkeler çekmeceye · **1226 (p+98)** çekmece "BAM" (ahşap-içi dolu, −2) · 1230 memur irkilme (kumaş, çok hafif).
- **Süreklilik:** İkinci kese Louis dirseğinde (→P08). Mum, pencere A (→P08). Baston konumu (→P14, P18).
- **Geçiş (çıkış):** SAME; çekmece sonrası 0.3 sn sessizlik.
- **Ekran yazısı:** "Plan B: Rüşvet · Tours" ÜST-BANT, 1134–1278.
- **Anlatım:** "Sonra Tours istasyonunda iki memuru satın aldılar." **Dokunuş:** çekmece çarpması.

### P08 · kare 1284–1440 · TOURS-KULUBE-IC
- **Çekim ölçeği:** **yakın** Louis OTS (p+0–60, yüz ≥300 px) → **yakın→göğüs** memur (p+60–156, push-in `cs 1.00→1.18`); el alt kadranda ≥330 px.
- **Kadraj:** p+60–156 memurun yüzü sert mum ışığında (alttan), **sağ el masada y 1000–1330**, duvarda gölge (sol-üst x 100–520, y 430–860, %22), pencere A (direk statik, gece). Ölü alan: alt masa + kese + mum; üst duvar + gölge + pencere.
- **Karakterler:** Louis z 1.5, u 0.30 (baston sağ yanında). Memur z 1.7, u 0.62.
- **Zaman çizelgesi:** 0–20 Louis öne eğilir · 6–48 "Tek bir hata.", 50–60 "Fazlası..." · **60 kesme** · 60–72 Louis'nin eli ikinci keseyi memurun önüne kaydırır · 72–100 memurun gözü kese ↔ pencere (korku + açgözlülük çatışması, yakın) · **102, 117, 132 üç parmak tiki (manipulateur itme/çekme)** · mum gölgesi T biçimli kol silueti · 132–156 hold.
- **Temas:** **1356 (p+72)** kese "tok" · **1386, 1401, 1416** parmak "tık" (−6) · mum cızırtısı −12.
- **Süreklilik:** İkinci kese P07'den. Direk A statik, B konumunda.
- **Geçiş (çıkış):** SERT + ses vurgusu.
- **Ekran yazısı:** Altyazı (Louis) ALT-BANT, 1294–1414.
- **Anlatım:** LOUIS. **Dokunuş:** el–gölge.

### P09 · kare 1440–1560 · PARIS-AVLU (gündüz)
- **Çekim ölçeği:** orta/boy (fiziksel eylem; kuruluş), yüz yok.
- **Kadraj:** `cs 1.00→1.05, cx 0→+30`; adamın başı kadrajın üstünde kesik. Paket+çizme ~%18. Ölü alan: alt üçte bir arabanın ön tekerleği, botlar, kaldırım rayı; üst üçte bir avlu duvarı, kemer, bacalar. Arma/taç yok.
- **Karakterler:** Paris adamı z 1.6, u 0.28 (gri manşet, sağ manşette altın düğme). Arabacı z 2.2, u 0.80 (plan başından kadrajda). Araba z 2.2, u 0.62.
- **Zaman çizelgesi:** 0–24 paket kaldırılır · **24 fırlatma** · **46 araba tepesine iner** · 48–64 kayar · **66 arabacı topuğuyla durdurur** (net 1.1 sn) · 84 manşet düzeltilir · 84–120 hold.
- **Temas:** **1464, 1486** · 1488–1504 sürtünme · **1506** çizme "tap" (−3) · 1524 manşet.
- **Süreklilik:** Paket + "TOURS" etiketi (→P10). Gri manşet (→P23).
- **Geçiş (çıkış):** MATCH (paket).
- **Ekran yazısı:** "Şifre: bir posta paketi" ÜST-BANT, 1446–1554.
- **Anlatım:** "Paris'ten Tours'a paket geliyor." **Dokunuş:** kayan paket + çizme.

### P10 · kare 1560–1692 · TOURS-KULUBE-IC (masa üstü, 55° eğik açı)
- **Çekim ölçeği:** insert/orta (eğik masa), el ≥230 px.
- **Kadraj:** `cs 1.00→1.04`. İki açık **kâğıt paket** (yumuşak, yan duvarsız): sol eldiven + yeşil ↑; sağ çorap + kırmızı ↓. Üst üçte bir duvar + pencere ışığı + fener; alt üçte bir masa ön kenarı, sarkan çorap (%30), memurun kolu.
- **Karakterler:** Memurun eli (gri ceket kolu) alt kenardan.
- **Zaman çizelgesi:** 8–28 yeşil etiket zıplar · 20–36 el girer · **36–52 çorabı kaldırır** · 52–88 sarkar, **kırmızı ok ↓ (64–88)** · **104 bırakır** · 104–132 el çekilir.
- **Temas:** **1572, 1596, 1624, 1648** (−6), **1664** "flop".
- **Süreklilik:** Paket P09'dan. Eldiven P01 eldiveni.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "ELDİVEN = ↑ · ÇORAP = ↓" ÜST-BANT, 1566–1686.
- **Anlatım:** "Eldiven: yükseliş. Çorap: düşüş." **Dokunuş:** sarkan çorap.

### P11 · kare 1692–1884 · TOURS-KULUBE-IC → INSERT (gündüz)
- **Çekim ölçeği:** **bel** memur profil (p+0–64, yüz ≥230 px) → insert (p+64–192, sap+damla %25).
- **Kadraj:** `cs 1.00→1.04` bel; insert 45°, üst köşede pencere A alt kenarı ve bulanık direk kolu. Ölü alan: orta plan alt üçte bir tezgâh + manipulateur gövdesi + zemin.
- **Karakterler:** Memur z 1.8, u 0.50 (profil, gri ceket, şakağı terli); sapı iki elle iter-çeker. Pencere B'de uzak kule.
- **Zaman çizelgesi:** 10–24 sapı kavrar · 24–52 pencere B'ye bakar (korku/gerginlik, bel) · **64 kesme: insert** · 72–84 itme, çekme · **96 fazladan çentik TIK**, kırmızı halo · **102 direk karşılık** · 90–120 çenede damla · 120–132 düşer · **132 sapa "tıp"** · 150, 166 tık, tık · 170–192 sap durur.
- **Temas:** **1704, 1764, 1776, 1788** TIK, **1794** direk karşılık (−10, kol görünürken), **1824** damla (−3), **1842, 1858** · Müzik 1788–1832 kısılır.
- **Süreklilik:** Manipulateur düzeni (→P12, P13). Çentik X (→P12–P14). Ter damlası yalnız burada.
- **Geçiş (çıkış):** MATCH (halo → P12 maske (540,950), çap ~860).
- **Ekran yazısı:** "Resmî mesaj + gizli bir "hata"" ÜST-BANT, 1698–1878.
- **Anlatım:** "Memur, resmî mesajın içine küçük bir hata gizliyor." **Dokunuş:** ter damlası.

### P12 · kare 1884–2028 · KULE-DIS (ara kule, gündüz)
- **Çekim ölçeği:** bel (p+0–24) → POV maske (p+24–70) → **aşırı yakın göz/kaş** (p+70–144; göz+kaş bölgesi y 400–860 ≥460 px, kaş ≥230 px).
- **Kadraj:** ahşap kutuda iki sabit pirinç tüp. Alt üçte bir: yanak, bıyık, pirinç oküler halka, kutu gövdesi.
- **Karakterler:** Telgrafçı (kısa, tombul, zeytin yeşili resmî frak, bıyık) z 1.5, u 0.50. Dürbün sabit.
- **Zaman çizelgesi:** 0–22 tüpe eğilir, gözünü dayar · 24 POV · 70 ters açı: göz halkaya dayalı, göz kısılır (70–90) · **94–126 tek kaş yavaşça kalkar** · 126–144 hold.
- **Temas:** **1906 (p+22)** göz/alın halkaya "tık" (−6) · rüzgâr −14. Anlatım p+6–96; **0.5 sn tam sessizlik p+100–130**.
- **Süreklilik:** Telgrafçı P13'te aynı kişi. POV'da kol X ≥300 px.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Ya fark ederse?" ALT-BANT, 1980–2022.
- **Anlatım:** "Her kulede iki dürbün var." **Dokunuş:** kaş.

### P13 · kare 2028–2184 · KULE-DIS
- **Çekim ölçeği:** **göğüs/yakın** telgrafçı (p+0–68, yüz ≥300 px; esneme 36–66) → boy→geniş geri çekilme (p+68–130; fiziksel/kuruluş) → geniş hold.
- **Kadraj:** p+0–68 `cs 1.25`; p+68–130 `cs 1.25→0.80, cy +60→−120`. Ölü alan: alt kulübe duvarı/tezgâh + ön plan çit + yol; üst direk + gök.
- **Karakterler:** Telgrafçı z 1.5, u 0.50.
- **Zaman çizelgesi:** 0–14 gözünü dürbünden çeker, doğrulur · 14–30 omuz silker · 30–66 manipulateur iter-çeker, **esner (36–66)** · **68 kendi direği "klak"** · 68–130 geri çekilir · **114 ufuk kule kopyalar** · 130–156 hold.
- **Temas:** **2034** doğrulma (−8) · 2062–2094 itme/çekme + kablo (−5) · **2096** direk (−8) · **2142** ufuk kule (−10).
- **Süreklilik:** Kopyalanan konum X → P14 çan kulesi hattı.
- **Geçiş (çıkış):** MATCH (ufuk kulesi → P14 teleskopta çan kulesi).
- **Ekran yazısı:** "Kimse durdurmadı. Herkes kopyaladı." ÜST-BANT, 2034–2178.
- **Anlatım:** "Ama devletin adamları hatayı aynen kopyalıyor." **Dokunuş:** esneme.

### P14 · kare 2184–2328 · CATI-KATI (144 kare)
- **Çekim ölçeği:** omuz üstü bel/orta (suç ortağı sırtı yarı kameraya); pervaz+bıçak insert-benzeri alt-sol kadran (≥230 px); p+138–144 Louis'ye odak (ikincil).
- **Kadraj:** maskesiz, odak kayması tüm kadrajda. `cs 1.00→1.05`. Pencere x 380–900, y 380–1000. Pervaz+bıçak x 80–620, y 1000–1290 (%22). Pervaz onlarca eski çentikle dolu. Pencerede Saint-Michel çan kulesi + T kol (≥230 px). Ölü alan: alt pervaz + omuz/dirsek + masa köşesi; üst çatı kirişi, tavan eğimi, dormer çerçevesi.
- **Karakterler:** Suç ortağı z 1.5, u 0.30 (koyu kahve redingot, basık kasket); teleskop pervaza kurulu. Louis arka planda masada z 3.0, u 0.78 (baston masaya dayalı; bulanık).
- **Zaman çizelgesi:** 0–10 göz teleskopta · **10–40 gözünü çeker, öne eğilir, bıçakla çentik** · 40–54 doğrulur, gözünü dayar · 54–78 odak kayması (pervaz p+62'ye kadar okunur) · **78–138 kule net (1.0 sn)** · **90 T kol "klak"** · 124–138 başını Louis'ye çevirir · 138–144 odak Louis'ye.
- **Temas:** **2214** bıçak "kırt" (−4) · **2238** göz teleskopa (−8) · **2274** T kol (−8) · 2308 kumaş.
- **Süreklilik:** Dormer + çan kulesi P06 ile eşleşir. Kol X.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Dürbünün ucunda: Bordeaux" ÜST-BANT, 2190–2322.
- **Anlatım:** "Bordeaux'da bir suç ortağı bekliyor." **Dokunuş:** pervaza çentik kazıma.

### P15 · kare 2328–2472 · MONTAJ-15 (144 kare) · "1835" defter sayfası
- **Çekim ölçeği:** üst yarı göğüs/bel Louis + defter (tüy tutan el ≥230 px); alt yarı **bel** memur (öksürük/zayıflama, yüz ≥230 px).
- **Kadraj:** Dikey bölünmüş, ayraç y 948–972, `cs 1.00→1.04`; her iki yarı uca kadar dolu. ÜST: üst 0–220 perde/pencere/şamdan, **defter pupitrde x 120–520, y 540–840**, altın yığını x 540–760, y 800–940, François eli x 780–1000, y 540–780. ALT y 972–1920: memur masa başında y 1050–1500, alt 1500–1920 masa ön yüzü, manipulateur, zemin, ön plan sandalye sırtı.
- **Eylem:** 6–36 sikke · 20–70 François kadeh · **22–40 Louis "1835" yazar** · **40–54 sayfayı koparır** (~210 px) · 54–110 yaprak ayracın önünden süzülür · **112 memurun omzuna konar** · 118–132 Louis boş sayfaya geçer · 52, 124 öksürük · 132–144 hold.
- **Temas:** **2336, 2344, 2354** sikke · 2350–2368 tüy cızırtısı · **2370** sayfa yırtılması · **2380** öksürük · **2398** kadeh · **2440** yaprak omza · **2452** öksürük.
- **Süreklilik:** Defter P02'den. Memur eldiven elinde (→P16).
- **Geçiş (çıkış):** MATCH (memur omuz silueti).
- **Ekran yazısı:** "1834 → 1836" ÜST-BANT, 2334–2466.
- **Anlatım:** "İki yıl boyunca... herkesten önce bildiler." **Dokunuş:** elle yazılmış "1835" sayfası.

### P16 · kare 2472–2640 · YATAK-ODASI (gece)
- **Çekim ölçeği:** **göğüs/bel** memur (p+0–36, push-in `cs 1.05→1.35`, yüz ≥230 px; hasta/teslimiyet) → insert yatak kenarı (p+36–168, el+eldiven ≥380 px, düşüşü izleyen pan).
- **Kadraj:** p+36–96 `cy 0`; p+96–116 `cy 0→+620`; p+116–168 `cs 1.00→1.12` zemin. Ölü alan yok (yorgan, demir, tahta zemin). Oda: tuffeau duvar, ahşap kiriş, mum komodinde, pencere sağ-arka (kule gece sabit), sandalyede silüet + yazı sehpası.
- **Karakterler:** Memur yatakta z 2.2, u 0.45, gömlek, solgun; elinde buruşuk eldiven plan başından.
- **Zaman çizelgesi:** 0–36 nefes (yakın) · **36 kesme: insert** · **48–72 el gevşer** · 84 eldiven kayar · 98 kenardan düşer · **114 tahtaya "tok"** · 120 sekme · 120–168 parmaklar yarı açık.
- **Temas:** nefes (−8) · **2556 (p+84)** · **2586 (p+114)** (−4) · **2592 (p+120)**.
- **Süreklilik:** Eldiven P15'te elde kurulu. Pencere kule, sandalye silüeti + sehpa (→P17).
- **Geçiş (çıkış):** SAME.
- **Ekran yazısı:** "1836 · İçeriden biri" ÜST-BANT, 2478–2634.
- **Anlatım:** "Ta ki bir memur ağır hastalanana kadar." **Dokunuş:** eldivenin düşmesi.

### P17 · kare 2640–2784 · YATAK-ODASI
- **Çekim ölçeği:** **yakın** memur yüzü (y 520–1100 sol-üst, yüz ≥%12) + alt-sağda el/saçak (≥240 px).
- **Kadraj:** `cs 1.00→1.05`; pencerede kule dinlenme statik (x 640–960, y 300–620). Ölü alan: alt sehpa, yorgan, kâğıt, hokka.
- **Eylem:** 0–20 başını çevirir · 10–60 fısıltı (itiraf; dudak) · el yazar (0–70) · 66–108 "Ve anlattı." · **84–110 kurutma kumu** · 126–144 sessizlik, memur gözlerini kapatır.
- **Temas:** **2648** yastık · kalem (2640–2710) · **2724** kum (−5).
- **Süreklilik:** Sandalye silüeti + sehpa (P16). Kule dinlenme (→P21, P22).
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** Altyazı (Memur) ALT-BANT, 2660–2706.
- **Anlatım:** MEMUR + ANLATICI. **Dokunuş:** kum serpme.

### P18 · kare 2784–2916 · MAHKEME
- **Çekim ölçeği:** geniş (mekân kuruluşu, fiziksel eylem: yargıcın oturması) + saat push-in (cs 1.00→1.12; saat ≥280 px, ~315 px).
- **Kadraj:** Alçak açı, kürsü orta-üst; **sarkaçlı saat x 720–1000, y 440–720**; arka duvarda haç/arma yok, cübbeler tek koyu ton. Ölü alan: alt üçte bir sanık sırası ön korkuluğu, panel, ön plan François/Louis sırtları (bel üstü, z 2.4), zemin; üst panel, korniş, huzme.
- **Karakterler:** Başkan yargıç z 5.0, u 0.50; önünde açık ciltli dosya + karar kâğıdı; tokmak yok. François (lacivert) z 2.4, u 0.34 (ekran solu), Louis (bordo) z 2.4, u 0.52 (arkadan); şapkalar dizde; baston sıraya dayalı.
- **Zaman çizelgesi:** 4–96 "bin sekiz yüz otuz yedi. Mahkeme." · **60 yargıç oturur** · **96 uğultu keser** · 96–132 sessizlik 0.6 sn · **108 dakika ibresi TIK** · **129 salon iç çekiş** · 108–132 hold.
- **Temas:** **2844** sandalye (−5) · uğultu kesilir 2880 · **2892** saat "TIK" (−2) · **2913** iç çekiş (−10).
- **Süreklilik:** François solda; P19 ters açıda Louis solda. Dosya + kâğıt kürsüde.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Tours Ağır Ceza · Mart 1837" ÜST-BANT, 2790–2910.
- **Anlatım:** "1837. Mahkeme." **Dokunuş:** saat TIK.

### P19 · kare 2916–3036 · MAHKEME
- **Çekim ölçeği:** insert dosya + başkanın eli (p+0–26) → **göğüs/yakın sanık sırası, ters açı (p+26–52; yüzler ≥240 px, z 1.3)** → insert eller (p+52–120, ≥380 px).
- **Kadraj:** Ölü alan: orta plan alt üçte bir sıra korkuluğu + şapkalar + paneller; üst arka duvar paneli + huzme.
- **Karakterler:** Başkanın eli (koyu cübbe kolu). Sanık sırası önden: **Louis ekran solu** z 1.3, u 0.34; **François ekran sağı** z 1.3, u 0.62; şapkalar dizde.
- **Zaman çizelgesi:** 0–6 başkan karar kâğıdını bırakır · 6–9 dosya kapağını kapatır · **9 TOK** + "BERAAT" aynı karede · 26 kesme · **30–60 François'nın gülümsemesi yayılır (göğüs/yakın)** · 38–50 Louis cebinden eldivenleri çıkarır (Louis kımıldamaz, soğuk) · **52 insert** · 54–70 sol eldiven · **72–104 sağ eldiven parmak parmak** · **108 bilek düğmesi** · 108–120 eller kenetli.
- **Temas:** **2925 (p+9)** dosya kapağı "TOK" (−2) · **2960** cep kumaşı · **2982** sol eldiven · **2994, 3001, 3008, 3015** sağ eldiven (−5) · **3024** bilek düğmesi.
- **Süreklilik:** Louis cep eldivenleri (P02…P18).
- **Geçiş (çıkış):** KÂĞIT.
- **Ekran yazısı:** "BERAAT" ALT-BANT, 2925–3012, kırmızı, −4°, 180 px, animasyonsuz.
- **Anlatım:** "Beraat." **Dokunuş:** Louis'nin eldiven giymesi.

### P20 · kare 3036–3192 · KANUN-INSERT
- **Çekim ölçeği:** insert (tepe), güve kanadı ≥240 px.
- **Kadraj:** kitap x 140–940, y 560–1380, `cs 1.00→1.05`. Üst üçte bir cübbe kolu + hokka + kalem + huzme; alt üçte bir masa, dosya yığını, alt-sol küçük mühür.
- **Eylem:** 0–70 sayfa çevirme · 72 bomboş, parmak basar · güve p+0'dan cilt oluğunda · **100 kanat açar (~240 px)** · 108–150 kalkar, çıkar · 150–156 yatışır.
- **Temas:** **3042…3082** sayfa "fışt" ×6 · **3108** · **3136** · 3144–3186 pırpır.
- **Süreklilik:** Güve p+0'dan görünür.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Suç yok. Çünkü yasa yok." ÜST-BANT, 3042–3186.
- **Anlatım:** "Çünkü bunu suç sayan bir yasa yoktu." **Dokunuş:** güve.

### P21 · kare 3192–3324 · TOURS-KAPI (gündüz)
- **Çekim ölçeği:** orta + ön plan çekiç eli (≥260 px) → sürgü push-in (cs 1.00→1.35, sürgü 270 px).
- **Kadraj:** Kapı x 320–760, y 700–1400; ilan x 420–660, y 800–1100; direk x 380–700, y 330–700 (dinlenme). El+çekiç x 560–1000, y 900–1250. Ölü alan: alt eşik taşı, basamak; üst direk + gök.
- **Karakterler:** Görevlinin eli: siyah redingot kolu, beyaz manşet, yüz yok.
- **Eylem:** 12, 33, 54 çekiç · 54–66 el çekilir · **66 sürgü düşer "klank"** · 66–132 net.
- **Temas:** **3204, 3225, 3246** (−3) · **3258** sürgü (−3).
- **Süreklilik:** İlanda kırmızı mühür (P05). Direk dinlenme.
- **Geçiş (çıkış):** MATCH (direk → P22).
- **Ekran yazısı:** "Önce açık. Sonra yasa." ALT-BANT, 3198–3318.
- **Anlatım:** "Telgraf yasası aynı yıl geldi." **Dokunuş:** sürgü.

### P22 · kare 3324–3468 · WIFI-MORF
- **Çekim ölçeği:** geniş → yakın zoom (grafik), morph ≥600 px.
- **Kadraj:** `cs 1.00→2.20`; morph merkez (540,800). Ölü alan: üst bulut şeritleri + yıldız; alt tepe/çit/zemin; telefon karanlığı.
- **Doku:** Kukla/tahta, neon yok; yaylar krem boya.
- **Eylem:** 60–90 katlanır · **90, 102, 114 üç yay boya dolar** · 114–144 hold.
- **Temas (ses):** 3384–3414 gıcırtı · **3414, 3426, 3438** ahşap tık.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "İlk siber saldırı" ALT-BANT, 3330–3462.
- **Anlatım:** "Bazıları buna ilk siber saldırı diyor." **Dokunuş:** morf.

### P23 · kare 3468–3600 · PARIS-MASA · LOOP
- **Çekim ölçeği:** insert/yakın, tepe-önden, `cs 1.06→1.14, cy 0→+40` (P01 f0 ile eşleşir).
- **Kadraj:** Aynı masa, pencere A (kol **A: düz T çubuğu**, sabit), aynı geç gün ışığı; **yumuşak kâğıt paket (karton koli değil), ip çözülmüş başlar, sarılıp bağlanır**. Paket %55, kabartı ~%30.
- **Karakterler:** Paris adamının elleri (gri manşet, altın düğme).
- **Eylem:** 0–20 eldiveni kâğıda koyar · 20–54 kâğıt katlanır · **54–120 ipi çekerken beş parmak kabartısı** · **90 ip gerilir** · **114 düğüm sıkılır, kabartı yatışır** · 120–132 eller çekilir.
- **Temas:** **3482, 3488, 3506, 3522, 3558** (−4), **3582** (−5).
- **Süreklilik:** Son kare = P01 f0 (cs 1.14, cy +40, kol A).
- **Geçiş (çıkış):** LOOP.
- **Ekran yazısı:** "Elektrik yok. Sadece…" ÜST-BANT, 3474–3600.
- **Anlatım:** "Kablo yok. Bilgisayar yok. Sadece..." **Dokunuş:** parmak kabartısı.

---

## 3. Süreklilik kontrol tablosu

| Öğe | Durum plan plan |
|---|---|
| **Beyaz eldiven** | P01 memurun elinde, ışık havuzuna bırakılır · P10 pakette · P15 memurun elinde buruşuk · P16 elinde → yere düşer · P23 Paris'te pakete konur |
| **Louis'nin eldivenleri** | P02, P04, P06, P07: sağ göğüs cebinden beyaz köşe · P19 çıkarılıp giyilir |
| **Louis'nin ciltli defteri** | P02 pupitrde → P15 "1835" |
| **Gri manşet** | P09 + P23: gri manşet, sağ mansette altın düğme. P21: beyaz manşet |
| **Louis'nin bastonu** | P04 **dış (ekran sağı) elde, el görünür**, ucu dış ayağın önünde · P06 korkuluğa dayalı · P07, P08 masaya dayalı · P14 masada · P18–P19 sırada |
| **Şapkalar** | Louis gri; François silindir; P04 sonunda François şapka elde; P18–P19 dizde |
| **Ekran yönü** | P02, P04, P18: François solda · P19 ters açı: Louis solda |
| **Memur** | gri ceket, şapkasız: P01 (kol), P07, P08, P10 (kol), P11, P15 · P16–P17 gömlek |
| **Müdür / telgrafçı / suç ortağı** | Müdür yalnız P07 · telgrafçı (zeytin yeşili) P12–P13 · suç ortağı P14 |
| **Dürbün** | sabit tüp (P12–P13), pervaza kurulu teleskop (P14) |
| **Kule kol konumları** | A (düz T) = P01 f0 / P23 · B (asimetrik 7) = P01 f54 sonrası, P07, P08 · X = P11→P14 · Dinlenme = P17, P21 |
| **Kule görünürlüğü** | P01 A→B · P03/P05 harita · P06 çan kulesi + T kol · P07/P08 B sabit gece · P11 · P12 POV · P13 · P14 çan kulesi · P16 gece sabit · P17 dinlenme · P21 dinlenme · P22 siluet · P23 A |
| **Işık** | P01, P10 geç gün ışığı + fener · P07, P08, P16 gece mum |
| **Kamera eşleşmeleri** | P23 son = P01 f0 (cs 1.14, cy +40) · P05 başlangıç = P03 başlangıç |
| **Paket** | P01 açılmış yumuşak kâğıt, ip çözülmüş · P09 kapalı · P10 açık · P23 kapatılan; karton koli yok |
| **Diğer** | İkinci kese P07→P08 · mühür P05→P21 · dormer P06→P14 · dosya P18→P19 · güve P20 · sehpa P16→P17 · pervaz çentikleri P14 |
| **Mahkeme nötrlüğü** | Cübbe tek koyu ton, haç/arma yok, tokmak yok |
| **Borsa nötrlüğü** | Tricolore yok; yuvarlak kemer |

---

## 4. Senaryodan sapmalar ve yakalanan sorunlar

1. **Süre kaydırmaları (onaylı).** P09 2.0, P10 2.2, P14 2.4, P15 2.4 sn; toplam 3600.
2. **P23 çelişkisi.** Kapalı paket + eşleşen kesme; kamera cs eşitlendi (P01 f0).
3. **P01 kol "şak"** kadraj dışı ikinci el; v2.3: f0 = A (düz T), sonrası B (asimetrik) okunurluk için.
4. **P12 kurulum** p+0–24.
5. Kurulum→karşılık eklemeleri: P08 ikinci kese, P15/P16 eldiven, P16/P17 sehpa, P19 cep, P20 güve, P04 ızgara/fare, P14 pervaz.
6. **P18 → P19** ters açıda yön tersine döner.
7. **Dürbün (dönem)** sabit; odak halkası/şlak/tezgâha bırakma yok.
8. **dokunuslar.md uyumu** (ilk tur + v2.1 dönem).
9. **P14:** kullanıcı kararı + dokunuş birlikte; 144 kare.
10. **Dönem revizyonu (varsayılan):** P15 Alt-1, P19 (a), P01 geç gün ışığı, manipulateur itme/çekme, Saint-Michel çan kulesi.
11. **v2.2 (A2 geri bildirimi):** P04 göz kırpma yakın plan, P02 ölü alan, küçük jest ölçüleri (P03, P06, P07, P08, P12, P16, P18, P19, P20, P21), P23 cs düzeltmesi.
12. **v2.3 yakalananlar (bu tur):**
    - **P04 yüz ölçeği yeniden hesaplandı:** A2 ve Eleştiri B ölçümüne göre yüz ≈75 px (önceki taslakta 90 px varsayılmıştı): hedef cs 2.4→**3.2** (yüz ≈240 px).
    - **P04 baston eli (SK1, kritik):** baston Louis'nin dış elinde, el görünür; bel planda p+144–168.
    - **P04 ızgara çelişkisi:** motion ızgarayı u 0.32'ye (François'nın solu, ekran (440,1390)) taşıdı; Louis u 0.70'te, baston ızgaraya ulaşamıyordu. Çözüm: **fare ızgaradan çıkıp Louis'ye doğru yürür** (insert'te), baston fare'nin önüne iner, fare ızgaraya geri koşar; temas kareleri aynı, p+128 dalış (690→692).
    - **P02 ön plan siluetleri ufuk kuralı:** önceki taslakta ön plan figürleri "alt üçte biri dolduruyor" diye yazılmıştı; Eleştiri A "baş y 1500+ ufuk ihlali" demişti. Efektif ufuk 280/kamera 3.5 m'ye göre başlar y ≈1000–1100'e alındı.
    - **P02 etiket–tebeşir çakışması (BB2):** etiketler p+78–86'da çıkar; Louis etiketi x ≥720.
    - **P02 tebeşir net süre:** Louis göğüs çekimi p+150'ye alındı (kırılma+toz+donma p+90–150 = 1.0 sn); katip "cız" 332→348.
    - **P02 tricolore ve sivri kemer** kaldırıldı (BB3, BB1).
    - **P01 paket/ip/kol** (TB1–TB3), kapanışta eldiven bırakma (TB5), kol konumu (TB6).
    - **P07 müdürün açgözlülüğü** yakın plana (bel) alındı (oyunculuk = yakın plan).
    - **P13/P16/P11** oyunculuk planları bel/göğüs/yakın ölçeğe çekildi.
13. **Dönem:** %3 rente, ipe asılı réverbère, Notre-Dame yok, T regülatör, sarkaçlı saat, kurutma kumu, arma/taç yok.

---

## 5. Riskli planlar

| # | Plan | Risk | Önlem |
|---|---|---|---|
| R1 | P04 | Bel → göğüs push-in 36 karede cs 1.70→3.20 (yüz 75→240 px): hız, vektör kalitesi, paralaks | easeInOutCubic; kontur kalınlığı ölçeğe göre; stil karesi 754'te test; gerekirse p+168'de yakın plan klibine kesme |
| R2 | P04 | Fare–baston: ızgara u 0.32, Louis u 0.70 | Fare yürüyüşü insert'te; temas karesi 672 kilit |
| R3 | P19 | Dosya kapağı insert + yakın yüz + parmak parmak eldiven; rig'de parmak yok | Ayrı "EldivenEl"; z 1.3 yakın ölçek |
| R4 | P15 | Bölünmüş montaj, yarılar 1920'ye kadar dolu | Üç katman; yaprak eğrisi |
| R5 | P14 | Odak kayması tüm kadrajda: swangle'da blur yavaş | İki katman keskin+bulanık, kare başı katman değişimi |
| R6 | P22 | Wi-Fi morfu neon'a kayabilir | Tahta dokusu |
| R7 | P02 | Üç farklı çekim (geniş, tebeşir, Louis göğüs) ve 12+2 figür | Kalabalık statik siluet; Louis göğüs ayrı çekim kadrajı |
| R8 | P12/P13/P14 | Göz/kaş/esneme okunurluğu; P13 geri yaslan ≠ P14 öne eğil | Farklı klip; rig kontrolü |
| R9 | P01/P23 | Kapak karesi + loop eşleşmesi; A/B kol konumu telefonda okunmalı | cs 1.14/cy +40 sabit; A düz T, B asimetrik |
| R10 | P03/P05 | Harita kule sırası (Blois/Chartres yok) | `Harita.tsx`; donem-dogrulama Ek 2 |
| R11 | P08 | El ≥330 px + gölge %22 + push-in | Gölge ayrı katman |
| R12 | P16 | Insert kamerası düşüşü izler | cy eğrisi katmanlarla |
| R13 | P07 | Plan içi kesme p+30 ve p+66; müdür bel yüz kalitesi | Kese hareket kesilmeden geçmesi (kese avucunda) |
| R14 | Genel | 60 sn tam kesim | Foley görüntüye kilitli |
| R15 | P11 | Direk karşılığı yalnız kol görünürken | Köşe katmanı |

---

## 6. Önerilen stil kareleri

| Mekân | Plan | Mutlak kare | Neden |
|---|---|---|---|
| TOURS-KULUBE-IC (hook) | P01 | **60** | Eldiven yükselmiş, kol B'de |
| TOURS-KULUBE-IC (oda) | P07 | **1226** | Çekmece BAM, alt üçte bir dolu |
| BORSA | P02 | **276** (p+120) | Tebeşir tozu, kalabalık donmuş; ayrıca Louis göğüs p+170 = **326** (yüz ≥240 px kontrolü) |
| HARITA | P05 | **940** | Mühür + balmumu |
| SOKAK-BORDEAUX | P04 | **724** (p+160, push-in ortası) ve **754** (p+190, göz kırpma yakın plan, yüz ≈240 px) | İki kare: kompozisyon ve rig yüz kalitesi |
| PARIS-AVLU | P09 | **1506** | Paket oturur |
| CATI-BORDEAUX | P06 | **1012** | Güvercin çıkışı |
| CATI-KATI | P14 | **2264** | Çan kulesi net |
| KULE-DIS | P13 | **2128** | Geri çekilmiş kadraj |
| YATAK-ODASI | P16 | **2520** | Orta plan göğüs |
| MAHKEME | P18 | **2850** | Huzmeler, saat |
| KANUN-INSERT | P20 | **3148** | Güve açık |
| TOURS-KAPI | P21 | **3258** | Sürgü düştü |
| MONTAJ-15 | P15 | **2440** | Yaprak omza |
| WIFI-MORF | P22 | **3438** | Tam ikon |
| PARIS-MASA | P23 | **3582** | Düğüm sıkıldı |
| Rig doğrulama | P19 | **3008** | Eldiven eli |
| Rig yüz yakın plan | P08 | **1370** (p+86) | Memur yakın yüz (korku/açgözlülük, mum alttan) |

---

## 7. Foley / boşluk özeti

Temas kareleri her planda ve `sahne-plani.json` `temaslar[]` içinde mutlak karelerle. v2.3 değişimleri: P04 fare yürüyüşü 660–668, dalış 690→692; P02 katip "cız" 332→348; P01 eldiven bırakma "tap" 140 (aynı, ışık havuzuna). Kaldırılanlar (dönem): P12 odak halkası, P13 dürbün "tok", P14 şlak, P19 tokmak, P15 takvim yırtılması. Müzik/anlatım boşlukları: P04 insert 1.1 sn, P07→P08 0.3 sn, P11 kısılır, P12 tam sessizlik p+100–130, P17 p+126–144, P18 p+96–132, P19 TOK akoru, P23→P01 kesintisiz.

---

## 8. Kural taraması: "Küçük jest = yakın kamera" ve "Ölü alan yok" (v2.2, v2.3'te güncel)

| Plan | Küçük jest | Boyut / çözüm | Ölü alan çözümü |
|---|---|---|---|
| P01 | eldiven+el | ~330 px ✔ | cs 1.14→1.06; masa ön yüzü ≈120 px ahşap |
| P02 | Louis yazması, tebeşir | Louis göğüs çekimi cs 2.8 (yüz ≥240); toz ≥240 | z 1.65/1.75, ön plan silüet (baş y ≈1000–1100), sol sütun, sağ-alt ışık yaması |
| P03 | at başı | cs 2.60, %13 | harita tam |
| P04 | göz kırpma, sırıtış | yüz ≈240 px (cs 3.2) | fıçı, basamak, birikinti ön planı |
| P05 | – | mühür 300 px ✔ | harita tam |
| P06 | kafes, fiske, bakış | cs 1.45; bel/göğüs cs 1.60 | gök: çan kulesi, bulut, güneş |
| P07 | müdür açgözlülüğü, memur irkilmesi | bel müdür; irkilme gövde jesti | alt zemin/sandalye bacakları |
| P08 | parmak tiki, yüz çatışması | el ≥330 px, yakın yüz | masa/duvar dolu |
| P09 | manşet | ikincil; paket+çizme %18 | tekerlek, bot, kaldırım rayı |
| P10 | el+çorap | %30 ✔ | masa kenarı/duvar |
| P11 | damla+sap, memur yüzü | %25 ✔; bel yüz ≥230 | dolu |
| P12 | kaş | ≥230 px (bölge 460 px) | yanak, halka, kutu |
| P13 | esneme | yüz ≥300 px | çit/yol, direk/gök |
| P14 | bıçaklı el | %22 ✔ | pervaz, kiriş |
| P15 | tüy eli, öksürük | ≥230 px | alt yarı 1920'ye dolu |
| P16 | memur yüzü, el gevşemesi | göğüs yüz ≥230; insert ≥380 | yorgan/demir/tahta |
| P17 | yüz, kum | yüz ≥%12; el ≥240 | sehpa/yorgan |
| P18 | saat ibresi | ≥280 px | sırtlar, panel |
| P19 | gülümseme, eldiven | yüz ≥240; insert ≥380 | korkuluk, panel |
| P20 | güve | 240 px | üst kol/hokka, alt dosya |
| P21 | çekiç eli | ≥260 px | eşik/basamak |
| P22 | – | ≥600 px | bulut, tepe/çit |
| P23 | kabartı %30 ✔ | cs P01 f0'a eşit | P01 ile aynı |

---

## 9. Filmin oyunculuk anları (önemli oyunculuk = yakın plan)

Ölçek: göğüs/yakın = yüz ≥230 px; bel = yüz ≥150 px. Süre = plan içi kare / saniye (mutlak kare).

| # | Plan | Oyunculuk anı | Çekim ölçeği | Plan içi kare | Süre | Mutlak kare |
|---|---|---|---|---|---|---|
| 1 | P02 | Louis'nin soğukluğu (herkes döner, o yazar; kafası kalkmaz) | **göğüs** (plan içi kesme) | p+150–186 | 0.60 sn | 306–342 |
| 2 | P04 | François replik sonu "kazanır" (+ şapka kalkışı) | bel → göğüs → yakın (push-in) | p+144–180 | 0.60 sn | 708–744 |
| 3 | P04 | François göz kırpma (filmdeki tek) | **yakın** (yüz ≈240 px) | p+186–200 | 0.23 sn | 750–764 |
| 4 | P04 | François sırıtış (kapanış) | yakın | p+200–216 | 0.27 sn | 764–780 |
| 5 | P06 | Louis'nin sabırsız hesabı: boş göğe bakar, saati kapatır | bel/göğüs (cs 1.60) | p+104–132 | 0.47 sn | 1100–1128 |
| 6 | P07 | Müdürün açgözlülüğü (keseye uzanır, açar, altın) | **bel** (plan içi kesme) | p+30–66 | 0.60 sn | 1158–1194 |
| 7 | P07 | Memurun irkilmesi (çekmece çarpınca) | orta/boy (gövde jesti) | p+98–120 | 0.37 sn | 1226–1248 |
| 8 | P08 | Louis'nin ifadesiz soğuk repliği "Tek bir hata. Fazlası değil." | **yakın** | p+0–60 | 1.00 sn | 1284–1344 |
| 9 | P08 | Memurun korku/açgözlülük çatışması (gözü kese ↔ pencere), parmak tiki | **yakın→göğüs** | p+60–156 | 1.60 sn | 1344–1440 |
| 10 | P11 | Memurun gerilimi (önceki kuleye bakış), ter | bel → insert | p+10–64; 90–132 | 0.9 + 0.7 sn | 1702–1756; 1782–1824 |
| 11 | P12 | Telgrafçının şüphesi (tek kaş) | **aşırı yakın** | p+70–144 | 1.23 sn | 1954–2028 |
| 12 | P13 | Telgrafçının kayıtsızlığı (esneme, omuz silkme) | göğüs/yakın | p+0–68 | 1.13 sn | 2028–2096 |
| 13 | P14 | Suç ortağının rutini (çentik atar, tekrar bakar) | omuz üstü bel/orta | p+10–54 | 0.73 sn | 2194–2238 |
| 14 | P15 | Louis'nin hesapçılığı ("1835" yazar) | göğüs/bel (üst yarı) | p+22–54 | 0.53 sn | 2350–2382 |
| 15 | P15 | Memurun zayıflaması (öksürük, omuz çöker) | bel (alt yarı) | p+52, p+112–128 | ~0.7 sn | 2380; 2440–2456 |
| 16 | P16 | Memurun teslimiyeti (hasta, solgun, el gevşer) | **göğüs/bel** → insert | p+0–72 | 1.20 sn | 2472–2544 |
| 17 | P17 | Memurun itirafı (fısıltı, gözlerini kapama) | **yakın** | p+0–144 | 2.40 sn | 2640–2784 |
| 18 | P19 | François'nın gülümsemesi (kazandık) | **göğüs/yakın** | p+30–60 | 0.50 sn | 2946–2976 |
| 19 | P19 | Louis'nin soğukkanlı eldiven giyişi | göğüs (p+38–52) + insert | p+38–120 | 1.37 sn | 2954–3036 |

Not: Geniş/boy planlar yalnız mekân kurulumu ve fiziksel eylem için kullanıldı: P01, P03, P05, P09, P10, P18, P20, P21, P22, P23 ve P04/P06/P07'nin eylem bölümleri.

---

## 10. Rig yüz yakın plan kalitesi gerektiren planlar (motion için)

Yüz ≥230 px'te çizilecek, kontur kalınlığı ölçeğe göre yeniden hesaplanacak (sabit px değil). İhtiyaç duyulan yüz özellikleri: **kaş** (yükselme/çatma, tek kaş bağımsız), **göz** (kırpma, kısma, bakış yönü `lookX/lookY`, göz kapama), **ağız** (A/E/O/M görselleri `visem`, gülümse, sırıt, esneme açık, fısıltı, kapalı), **ter damlası/terli şakak**, **solgun/hasta palet**, **alttan mum ışığı + gölge**, **yüz detayı** (bıyık, sakal, kırışık).

| Plan | Kimin yüzü | Ölçek | Gereken |
|---|---|---|---|
| P02 | Louis | göğüs (cs 2.8, ≥240 px) | aşağı bakış, kaş düz, ifadesiz; defter/kalem eli |
| P04 | François | bel→yakın (≈240 px) | `visem` replik sonu ("kazanır"), kameraya bakış (p150+), **göz kırpma**, **sırıtış**, şapkalı el |
| P06 | Louis | bel/göğüs (≥260 px) | yukarı bakış, sabırsız ifade (kaş) |
| P07 | Müdür | bel (≥230 px) | açgözlü bakış (gözler keseye), yaşlı/iri yüz paleti; memur için gövde jesti |
| P08 | Louis, Memur | yakın (≥300 px) | Louis ifadesiz + `visem`; memurda **gözün kese↔pencere kayması**, korku/açgözlülük karışımı, terli şakak, alttan mum ışığı |
| P11 | Memur | bel (≥230 px) | profil, bakış, ter damlası çenede |
| P12 | Telgrafçı | aşırı yakın (≥460 px bölge) | **tek kaş bağımsız kalkış**, göz kısma, pirinç halkaya dayalı göz |
| P13 | Telgrafçı | göğüs/yakın (≥300 px) | **esneme (ağız tam açık)**, omuz silkme, göz kapama |
| P15 | Memur, Louis | bel (alt yarı), göğüs/bel (üst yarı) | öksürük (omuz çökmesi), Louis yazıda aşağı bakış |
| P16 | Memur | göğüs/bel (≥230 px) | solgun, terli (damla yok), yarı kapalı göz, ağır nefes |
| P17 | Memur | yakın (≥%12) | **fısıltı `visem`**, göz kapama, başı çevirme, gömlekli 3/4 yüz |
| P19 | François, Louis | göğüs/yakın (≥240 px) | **yavaş yayılan gülümseme**, Louis kıpırdamaz (mikro göz, nefes) |
| P14 | Suç ortağı | sırtı yarı kameraya | yüz gerekmez (profil/kasket); Louis bulanık, yüz gerekmez |
| P09, P18, P21, P23 | – | yüzsüz/kompars | yüz gerekmez |

Ek rig notları: P08 ve P17'de **alttan ışık** (mum) için yüz gölge katmanı; P07 ve P08'de aynı memur farklı ölçekte (bel/yakın) tutarlı olmalı; P13/P14 "göz çekme" klipleri farklı yönlü (geri yaslan / öne eğil).
