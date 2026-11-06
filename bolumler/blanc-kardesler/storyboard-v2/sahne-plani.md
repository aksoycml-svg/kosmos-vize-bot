# Blanc Kardeşler · Storyboard v2 · Sahne Planı

Girdi: `senaryo-v2.md` (onaylı, 23 plan), `arastirma.md`. Kullanıcı kararları uygulandı: süre 60.0 sn tam kesim (3600 kare), anlatımda "kardeşler", P14 maskesiz, P22 kukla/tahta dokusu (neon yok), 8 yeni mekân tam detay. Ses: ElevenLabs Umut Canbay (TR). 1080x1920 @ 60 fps.

---

## 0. Okuma kılavuzu

**Kare.** Mutlak kare = sn x 60. Bir plan `start` karesinde başlar, `end` karesinde biter (end hariç, son görünen kare = end−1). `p+N` = plan başından N. kare. Temas karesi mutlak olarak yazılır: `2928 (p+12)`.

**Koordinat (karakter konumu).** Sokak/dış mekânlarda `Sokak.tsx` ile aynı: `z` = derinlik (1 = kameraya en yakın zemin çizgisi, büyüdükçe uzak, ZMAX 7), `u` = yanal (0 = sol duvar/kenar … 1 = sağ duvar/kenar, ekran yönünde). İç mekânlarda aynı sözleşme, oda sol/sağ duvarına göre. Tepe açı insertlerde `z` yerine masa üstü (x,y) px. Zemin noktası = `zemin(z,u)`; ayaklar/baston ucu bu noktaya basar.

**Kamera notasyonu (Proto.tsx ile aynı).** `cs` ölçek, `cx/cy` px kayma (merkezden). Örn. `cs 1.00→1.06, cy 0→−30`. "Statik" = sabit; insertlerde hafif nefes (cs ±0.01) serbest.

**Ekran yazısı bantları (güvenli alan: üst 220, alt 420, yan 80 → kullanılabilir y 220–1500, x 80–1000).**
- ÜST-BANT: y 240–400, x 80–1000 (etiketler, yıllar). Font 64–72 px, kalın, en çok 2 satır.
- ALT-BANT: y 1290–1490 (replik altyazıları ve üstte içerik varsa etiketler). Proto.tsx `Altyazi` ile aynı yerleşim.
- Önemli içerik (yüz, nesne, kule kolu) y 420–1290 arasında tutulur. İstisnalar planında yazılı.

**Seviye (foley, anlatım 0 dB ref).** YAKIN temas −2, ORTA −5, GENİŞ −8 dB; müzik ~−18 dB. Foley tek temkinli: kullanıcı yüksek bulur.

**Geçiş sözlüğü.** SERT = sert kesme (+ses vurgusu); MATCH = şekil/renk/konum eşlemeli kesme; KÂĞIT = zaman atlaması kesmesi (kâğıt/sayfa/tahta temalı); SAME = aynı mekân sürekliliği kesmesi. Fade ve çapraz çözülme yok (hiçbir nesne fade ile kaybolmaz). Karartma yalnız P14→P15'te ve fiziksel gerekçeli (dürbün kapağı).

**Mekân sözlüğü (tasarımcıyla ortak ad).** 8 yeni mekân: BORSA, TOURS-KULUBE-IC, KULE-DIS, PARIS-AVLU, CATI-BORDEAUX, CATI-KATI, YATAK-ODASI, MAHKEME. Mevcut: HARITA, SOKAK-BORDEAUX (prototip Sokak, Paris ögeleri çıkarılmış). Varyant/özel: PARIS-MASA (TOURS-KULUBE-IC masa varyantı, P23), TOURS-KAPI (KULE-DIS'in Tours cephesi, P21), KANUN-INSERT (P20), MONTAJ-15 (ALTIN-MASA + TOURS-KULUBE-IC alt yarı, P15), WIFI-MORF (P22).

**Ses zamanı notu.** `zamanlama.json` henüz yok. Anlatım kareleri tahmini (~2.5 kelime/sn). Foley kareleri **görüntüye** bağlıdır (kilit); ses kaydı gelince anlatım, plan sınırı içinde ve belirtilen nefes boşluklarına göre oturtulur, foley kaymaz.

**Mekân genel kuralları (tüm planlar).** Tours kulübesinde iki pencere: (A) direk penceresi, arka duvar sağ, direk ve kolları pencere dışında ~5 m; (B) Paris/önceki kule penceresi, sol duvar, uzak tepe. Regülatör (minyatür T kollu) pencere tezgâhında durur. Tüm kule istasyonlarında aynı düzen (P11, P12, P13).

---

## 1. Plan özeti

| Plan | start–end (kare) | sn | Mekân | Tip | Çıkış geçişi |
|---|---|---|---|---|---|
| P01 | 0–156 | 2.60 | TOURS-KULUBE-IC (masa) | kinetic | SERT |
| P02 | 156–360 | 3.40 | BORSA | character | MATCH (PARIS yazısı) |
| P03 | 360–564 | 3.40 | HARITA | map | MATCH (toz→sis) |
| P04 | 564–780 | 3.60 | SOKAK-BORDEAUX | character | SERT |
| P05 | 780–996 | 3.60 | HARITA | map | MATCH (mühür→güneş) |
| P06 | 996–1128 | 2.20 | CATI-BORDEAUX | character | KÂĞIT/SERT |
| P07 | 1128–1284 | 2.60 | TOURS-KULUBE-IC | character | SAME |
| P08 | 1284–1440 | 2.60 | TOURS-KULUBE-IC | character | SERT (şok) |
| P09 | 1440–1560 | 2.00 | PARIS-AVLU | character | MATCH (paket) |
| P10 | 1560–1692 | 2.20 | TOURS-KULUBE-IC (masa tepe) | document | SERT |
| P11 | 1692–1884 | 3.20 | TOURS-KULUBE-IC → insert | tower | MATCH (halo→maske) |
| P12 | 1884–2028 | 2.40 | KULE-DIS | tower | SERT |
| P13 | 2028–2184 | 2.60 | KULE-DIS | tower | MATCH (kule→kule) |
| P14 | 2184–2316 | 2.20 | CATI-KATI | tower | KÂĞIT (karartma) |
| P15 | 2316–2472 | 2.60 | MONTAJ-15 | chart | MATCH (memur) |
| P16 | 2472–2640 | 2.80 | YATAK-ODASI | character | SAME |
| P17 | 2640–2784 | 2.40 | YATAK-ODASI | character | SERT |
| P18 | 2784–2916 | 2.20 | MAHKEME | character | SERT (ses) |
| P19 | 2916–3036 | 2.00 | MAHKEME | character | KÂĞIT |
| P20 | 3036–3192 | 2.60 | KANUN-INSERT | document | SERT |
| P21 | 3192–3324 | 2.20 | TOURS-KAPI | tower | MATCH (kule) |
| P22 | 3324–3468 | 2.40 | WIFI-MORF | kinetic | SERT (karanlık) |
| P23 | 3468–3600 | 2.20 | PARIS-MASA | document | LOOP→P01 |

Toplam 3600 kare = 60.00 sn. Senaryodan tek süre sapması: P09 1.8→2.0 sn, P10 2.4→2.2 sn (bkz. Bölüm 4, madde 1).

---

## 2. Planlar

### P01 · kare 0–156 · TOURS-KULUBE-IC (masa varyantı) · KANCA
- **Kadraj/kamera:** Yakın plan, tepe-önden (~60° aşağı). Kamera eldivenle birlikte hafifçe yükselir: `cs 1.14→1.00, cy +40→0`. Masa tahtası, kahverengi paket kâğıdı, fener ışığı (amber). Pencere (A) sağ-üst: x 560–1000, y 460–920 (kadrajın ~%24'ü; ilk satırdaki etiketten ayrı).
- **Karakterler:** Memurun eli (zayıf, titrek, gri ceket kolu, sol el) masa üstünde (x 300–620, y 1000–1350). Yüz yok.
- **Giriş/çıkış:** El kadraj sol-alt kenarından girer (kare açılırken zaten içeride).
- **Zaman çizelgesi (p+N):** 0 eldiven kâğıttan yarı çıkmış, el çekiyor (hareketin ortası, ilk kare okunur) · 0–44 eldiven yükselir, kâğıt sürtünür · 44 eldiven kâğıttan tamamen ayrılır; **aynı karede** pencere (A) dışındaki direkte kol "şak" yeni konuma oturur (B konumu) · 50 kâğıt masaya geri yatar · 52–134 el eldiveni havada tutar, titreme sönümlenir, fener tozu (kapanış anı) · 134–142 eldiveni masadaki ışık dairesine bırakır · 142–156 el hareketsiz, kâğıt oturmuş.
- **Temas (foley):** 0 (süren) kâğıt sürtünmesi başlar (0–44) · **44** direk kolu "klak" (tahta menteşe) · 50 kâğıt masaya yatar · **140** eldiven masaya yumuşak "tap" (ORTA, −5).
- **Süreklilik:** Kurulum → P08/P11/P17/P21/P22 (aynı direk, pencere A). Eldiven masada bırakılır (P10'da eldiven paketi karşılığı). Kol A konumu (önce) = P23 son kare.
- **Fizik:** Pencerede görünen direk, Tours binasına bitişik ek yapının çatısında, pencerenin ~5 m dışında; halat/tel hattı pencere dışından direğe iner (P11 regülatörü ile bağlı). Kolun "şak"ı kanca metaforu: oda içindeki ikinci el (kadraj dışı) regülatörde olduğundan fiziksel; kadrajda görünmeyen el sesi çıkarmaz (ses sadece direk "klak").
- **Geçiş (çıkış):** SERT, eldivenin masaya "tap"ından 14 kare sonra, anlatım "...hackledi" bitişinde.
- **Ekran yazısı:** "1834. Bilgisayar yok." ÜST-BANT, **f0'dan itibaren tam görünür** (kapak karesi), 0–156. Kapak ayrı: "ELDİVENLE DEVLETİ HACKLEDİLER" (video dışı katman, teknisyen).
- **Anlatım:** "Bu eldiven, Fransız devletinin ağını hackledi." (6 kelime, ~p+4 ile p+150).

### P02 · kare 156–360 · BORSA
- **Kadraj/kamera:** Geniş → orta, yavaş dolly-in: `cs 1.00→1.18, cy 0→−60`. Borsa salonu, öğle altın ışığı, yüksek sütunlar. Fiyat tahtası arkada üst-orta: x 300–780, y 400–760 (≥%18 yükseklik); katip platformda (z 5.5, u 0.50).
- **Karakterler:** François z 2.2, u 0.40 (lacivert frak, silindir; sağ eliyle Tüccar'ın omzunu tutar, gülerek konuşur). Tüccar (kısa figür, kahverengi) z 2.2, u 0.24. Louis z 2.3, u 0.62 (bordo frak, gri şapka; sağ el cebinde değil, defter + kalem; cep dışına beyaz eldiven köşesi taşar, sağ göğüs cebi). Kalabalık 10–12 silindir şapkalı figür z 2.0–6.0, u 0.05–0.95. İsim etiketleri: "FRANÇOIS" "LOUIS" karakter başının 80 px üstünde (y ~700–800, 44 px).
- **Giriş/çıkış:** Hepsi kare açılırken içeride; kimse girip çıkmaz (iç mekân kapıları arka duvarda, kullanılmıyor).
- **Zaman çizelgesi:** 0–20 dolly başlar, kalabalık hareketli · 20–64 katip tahtaya rakam yazar (tebeşir cızırtısı) · **66 tebeşir kırılır** (beyaz toz "puf" 1 sn asılı) · 66–84 parça platformdan düşer · 72–100 kalabalık başlarını tahtaya çevirir, **donar** (100–140) · Louis defter yazmayı sürdürür (kafası kalkmaz) tüm plan boyunca · 130 katip kırık yarım tebeşirle ilk çizgiyi çeker (kapanış) · 140–204 dolly biter, kalabalık yavaş uğultuya döner.
- **Temas:** 156+20..64 tebeşir cızırtısı (süren, 176–220) · **222 (p+66)** tebeşir "çıt" · **238 (p+82)** parça zemine sekme-1 · **250 (p+94)** sekme-2 · **286 (p+130)** yarım tebeşirle "cız" · kalem cızırtısı süren (156–360, kısık).
- **Süreklilik:** Louis sağ göğüs cebinde beyaz eldiven köşesi (kurulum → P19). François solda, Louis sağda (ekran). Rakam yazılan tahta başlığı "PARIS · RENTE 3%" → P03 harita PARIS etiketi.
- **Fizik:** Katip yükseltilmiş platformda, merdiveni görünür (arkada); tebeşir parçası platformdan zemine iki sekme, kalabalığın ayak arasına girmeden. Ölçek derinlikle orantılı (z 5.5'te katip küçük).
- **Geçiş (çıkış):** MATCH. Dolly bitişinde tahta başlığındaki "PARIS" yazısı ekranın (540, 430) noktasında; P03'te Paris etiketi aynı noktada.
- **Ekran yazısı:** "Oyun: Paris'teki tahvil fiyatı" ÜST-BANT, 162–354.
- **Anlatım:** "Bordeaux'lu kardeşler François ve Louis Blanc, devlet tahviline oynuyor." (9 kelime, tüm plan). **Dokunuş:** tebeşir kırılması + Louis'nin soğukluğu.

### P03 · kare 360–564 · HARITA
- **Kadraj/kamera:** Tepe harita. `cs 1.30 sabit, cy +300→−300` (Paris üstten Bordeaux'ya tilt). Paris (540, 430) → Bordeaux alt-sol. Güney-batı kıyı. Tours düğümü yolun üzerinde işaretli (küçük, etiketli): P07 kurulumu. Sayaç + güneş/ay diski sağ-üst: x 760–1000, y 340–560. ÜST-BANT'ın altında.
- **Eylem:** Posta arabası (küçük) Paris'ten Bordeaux'ya. Gün 1: p+0–60, Gün 2: 60–120 (Tours'u ~p+100'de geçer), Gün 3: 120–180; güneş→ay diski 3 tur. p+176–180 araba Bordeaux'da durur; p+180–204 toz bulutu şehrin üstüne çöker (kapanış: toz oturur, kare toz yatışmış bitiyor).
- **Karakter:** Yok (araba üzerinde arabacı ikonu).
- **Temas:** **360 (p+0)** sayaç "1" tık · **420 (p+60)** "2" tık · **480 (p+120)** "3" tık · süren: tekerlek gıcırtısı + toynak kısık (360–536) · **540 (p+180)** araba durur, toz "puf" (ORTA).
- **Süreklilik:** Tours düğümü (→P07); araba ikonu ve rota aynı (→P05).
- **Fizik:** Araba rota boyunca yolda; harita yolu kesmez.
- **Geçiş (çıkış):** MATCH. Bordeaux üstüne çöken gri-mavi toz katmanı, P04'te sokağın sis katmanıyla aynı doku ve tonda; kesme toz yatışınca (p+204).
- **Ekran yazısı:** "Paris → Bordeaux: 3 GÜN" ÜST-BANT, 366–558.
- **Anlatım:** "Fiyat Paris'te belirleniyor. Haber Bordeaux'ya üç günde geliyor."

### P04 · kare 564–780 · SOKAK-BORDEAUX (gece) · EN YOĞUN PLAN
- **Kadraj/kamera:** p+0–26 orta plan alçak açı: `cs 1.00→1.03`. p+26–94 INSERT (kaldırım hizası, FareInsert), statik. p+94–216 orta plan, yavaş push-in: `cs 1.06→1.18, cx 0→+60, cy −20→−120` (François'ya). Sokak ucunda sis içinde Garonne gemi direkleri, ipe asılı réverbère (fener), mavi ay + amber.
- **Karakterler:** F ve L adımın ortasında kameraya yürür. François z 2.7→2.4 (p+26) →1.8 (p+94), u 0.52→0.46. Louis z 3.0→2.7 →1.9, u 0.68→0.66. Louis p+58'de lağım ızgarasının ön-yanındadır (z ~2.15, u 0.66); baston sağ elinde (karakter sağı = kameraya dönükken ekranın SOLU), ucu ızgaranın hemen sağında taşta. **Izgara:** z 2.2, u 0.58 (ekran ~ (600, 1465)), fare ızgaradan çıkar.
- **Giriş/çıkış:** Karakterler sokaktan gelir, kare açılırken sokak ortasında (sisten çıkış yok, fade yok). Fare ızgaradan çıkar ve kaçarak aynı ızgaraya girer. Kimse duvardan geçmez.
- **Zaman çizelgesi:** 0–24 fare ızgaradan çıkar (geniş planda ~40 px, görünür), 24 fare kenarda koklar, 26 **kesme: insert** · 26–40 fare bir adım atar, devlere bakar · 48–57 baston üstten kadraja iner · **58 TAK** · 60–64 fare irkilme zıplaması · 64–72 fare döner, ızgaraya yönelir · 72–86 dalış · 88 kuyruk ucu ızgarada kaybolur, "tink" (kapanış) · 88–94 boş ızgara (hold) · 94 **kesme: orta plan** · 94–116 F/L son adımlar, durur · 104–122 François şapkasını kaldırır (kolu yukarıda kalır, şapka elinde) · replik 100–210 ("Herkesten önce bilen" p+100–166; **nefes 166–184 sessizlik = 0.3 sn**; "kazanır" 184–210) · **196–208 göz kırpma** (filmdeki tek) · 208–216 sırıtış (kapanış).
- **Temas:** adımlar `yuru()` fazından motion üretir (≈ p+6, 20 geniş; p+100, 112 orta; ADIM olayları listede otomatik) · **574 (p+10)** fare pençesi taşa tıkırtı · **622 (p+58)** baston ucu taşa "TAK" (YAKIN, −2) · **624 (p+60)** fare irkilme, pençe "tık" · **636 (p+72)** fare ızgara kafesine dalar, demir tıngırtısı · **652 (p+88)** kuyruk ucu girer, "tink" · **680 (p+116)** Louis durur, baston ucu taşa "tık" · 764 (p+200) göz kırpma, sessiz.
- **Süreklilik:** Izgara + fare p+0'da geniş planda kurulu (kurulum) → insert karşılığı. François'nın şapkası kalkık elde biter (P05+ zaman atlaması); Louis bastonu sağ elde yerde; Louis cep eldiven köşesi görünür (P02 ile aynı).
- **Fizik:** Baston ucu yüksekliği `zemin(z,u).y`'de, taşa gömülmez. Fare ızgarada tam kaybolur. Louis ızgaranın üstüne basmaz, yanından geçer.
- **Geçiş (çıkış):** SERT, "kazanır" bitince 8 kare.
- **Ekran yazısı:** Altyazı (François): "Herkesten önce bilen… kazanır." ALT-BANT, 664–780, "FRANÇOIS" etiketi üstünde. Ayrı ÜST etiket yok.
- **Anlatım:** FRANÇOIS (alçak, sinsi). **Dokunuşlar:** baston-fare (Louis), göz kırpma (François).

### P05 · kare 780–996 · HARITA
- **Kadraj/kamera:** P03'ün **başlangıç kadrajı** (Paris üstte, Bordeaux altta), statik, `cs 1.30, cy +300→+220` (hafif). Mühür merkez noktası (540, 880).
- **Eylem:** Araba Paris'ten yola çıkar (p+0–150). Işık sinyali p+20'de Paris kulesinden çıkar; 9 kule ikonu sırayla kol çevirir (aralıklar kısalır). Sinyal p+70'te arabayı sollar (toz savrulur). Son kule p+115. p+150 araba durur (kırmızı bandın hemen önünde), p+150–158 mühür iner, **p+158 tok**, kırmızı balmumu kenarlara taşar (158–182), hat Paris→Bordeaux kırmızıya boyanır (164–200), 200–216 hold (kapanış).
- **Temas:** 780 araba tekerleği (kısık, süren) · kule klakları **804, 822, 838, 852, 864, 874, 882, 889, 895** (p+24,42,58,72,84,94,102,109,115; ORTA→GENİŞ −5→−8 uzaklıkla) · **850 (p+70)** sinyal sollama whoosh · **930 (p+150)** araba durur · **938 (p+158)** mühür "tok" (YAKIN −2) · 938–962 balmumu taşma, yumuşak "squelch".
- **Süreklilik:** Kırmızı mühür tasarımı → P21 ilanındaki mühür. Kule ikonları P03'te çizilmiş hat üzerinde.
- **Fizik:** Mühür haritanın üstüne düşer (harita yüzeyi), sinyal ve araba hattı aynı rota.
- **Geçiş (çıkış):** MATCH. Mühür dairesi (540, 880) → P06'da doğan güneş diski aynı noktada, aynı çap. Kesme mühür hold'unda.
- **Ekran yazısı:** "Telgraf: BİRKAÇ SAAT · halka kapalı" ÜST-BANT, 786–990.
- **Anlatım:** "Devletin telgrafı ise birkaç saatte getiriyor. Ama sadece devlete."

### P06 · kare 996–1128 · CATI-BORDEAUX (şafak)
- **Kadraj/kamera:** p+0–44 orta plan: `cs 1.00→1.06`. p+44–98 INSERT cep saati: kadran ekranın %20'si (≥384 px), statik. p+98–132 orta plan, statik.
- **Çatı kimliği:** Arduvaz çatı, baca kümeleri, çinko oluklu yürüme sırtı (düz 1.2 m genişlikte çinko teras, korkuluk taş). Arkada çatı katı penceresi (dormer, soldan 2.) açık: P14 ile eşleşir. Ufukta sağda uzak tepede Chappe kule silueti (kurulum → P14). Güneş doğuyor, disk ufukta.
- **Karakterler:** Louis z 2.0, u 0.45 (çatı terasında, dormer penceresinin yanında). Sol elinde açık cep saati (insert'te çıplak el), baston sol ön koluna asılı (sapı kolda, ucu havada). Kafes taş korkuluk üstünde z 2.3, u 0.62, sağda.
- **Giriş/çıkış:** Louis dormer penceresinden çıkmış (kare açılırken terasta). Güvercin kafesten çıkıp kadrajın sağ-üstünden çıkar (p+40).
- **Zaman çizelgesi:** 0–10 Louis sağ eliyle kafes kapağını açar · 14 güvercin kafes tabanından iter, kanat · tüy kopar, salınarak saatin camına düşer (p+16–38) · 40 güvercin kadrajdan çıkar (üst-sağ) · 44 **insert**: tüy camda · 56–62 başparmak fiske · 60–80 tüy uçar, kadrajdan çıkar · 84–92 saat kapağı kapanır · 98 **orta plan**: Louis boş gökyüzüne bakar, sabırsız (kapanış), 98–132 hold.
- **Temas:** 1000–1006 (p+4–10) kafes menteşe gıcırtısı · **1006 (p+10)** kapak korkuluğa "tık" · **1010 (p+14)** güvercin ayakları kafes tabanı "pat", kanat çırpışı 1010–1038 · **1034 (p+38)** tüy cama (duyulmaz, ORTA) · **1056 (p+60)** parmak fiske "tık" (YAKIN) · **1086 (p+90)** saat kapağı "çat".
- **Süreklilik:** Tüy orta planda saatin camına konarak kurulur (insert karşılığı, aniden belirmez). Güneş diski (→P05 mühür). Dormer + uzak kule (→P14). Louis'nin eldivenleri cepte (cep köşesi görünür). Baston: sol kolda.
- **Fizik:** Güvercin kadrajı terk eder (yukarıda kaybolmaz fade ile; kanat çırparak çıkar). Louis teras sırtında, çatı eğimine basmıyor.
- **Geçiş (çıkış):** KÂĞIT/SERT: Louis'nin bakışı, gökyüzü turuncu → Tours gece mum.
- **Ekran yazısı:** "Plan A: Güvercin — başarısız" ÜST-BANT, 1002–1122.
- **Anlatım:** "Önce güvercin denediler. ...Olmadı." (nefes: "...Olmadı" öncesi 0.3 sn). **Dokunuş:** tüy + fiske.

### P07 · kare 1128–1284 · TOURS-KULUBE-IC (gece)
- **Kadraj/kamera:** Orta plan, profil. Kamera Louis'ten müdüre pan: `cs 1.00→1.08, cx +10→+110`, **p+98'de durur** (çekmece "bam"). Tek mum masada (kurulum → P08).
- **Karakterler:** Louis z 2.0, u 0.22 (sola dönük bordo frak, baston masa kenarına dayalı sağ yanında), müdür z 2.0, u 0.60 (yaşlı, iri, koyu yelek, oturmuş), memur z 2.8, u 0.78 (zayıf, gri ceket, şapkasız, müdürün arkasında ayakta, bir adım geride), François z 3.4, u 0.08 (kapı aralığında gölgede, lacivert frak, gülümser). Masa: Louis'nin önünde **iki** altın kesesi; çekmece (müdür tarafı, ön yüz, y 1250–1400, hafif aralık).
- **Giriş/çıkış:** Kapı arka duvar solda (François kapıda); pencere A arka duvar sağda, direk dışarıda (kolu sabit). Kimse girip çıkmaz.
- **Zaman çizelgesi:** 6–40 Louis bir keseyi masa üstünde müdüre kaydırır · 30–52 müdür uzanır · 54 kese avucunda · 62 kese ters, sikkeler masaya dökülür · 76–90 müdür kolunu süpürür, sikkeler çekmeceye · **98 çekmece "BAM"**, kamera durur (hold 98–156) · memur gözü altınlarda ve pencerede, François kapıda gülümser (kapanış).
- **Temas:** 1134–1168 (p+6–40) kese masa üstü sürtünmesi · **1168 (p+40)** kese durur "tok" · **1190 (p+62)** sikkeler "şıngır" · **1216 (p+88)** sikkeler çekmeceye · **1226 (p+98)** çekmece "BAM" (YAKIN −2).
- **Süreklilik:** İkinci kese Louis'nin dirseğinde kalır (→P08 memura kayar). Mum, pencere A, direk, kapı, baston konumu (→P08, P14).
- **Fizik:** Masa ayakları zeminde; Louis masaya yaslanmaz; müdür sandalyede, ayakları zeminde; kese masa yüzeyinde kayar. Çekmece masanın içine girer (dışarı çıkmış kısmı yok).
- **Geçiş (çıkış):** SAME (aynı oda, yakın plana omuz üstü). Çekmece sesinden sonra 0.3 sn sessizlik.
- **Ekran yazısı:** "Plan B: Rüşvet · Tours" ÜST-BANT, 1134–1278.
- **Anlatım:** "Sonra Tours istasyonunda iki memuru satın aldılar." **Dokunuş:** müdürün çekmeceyi çarpması.

### P08 · kare 1284–1440 · TOURS-KULUBE-IC
- **Kadraj/kamera:** Yakın plan. p+0–60 Louis yüzü (memurun omzu üzerinden, hafif alçak); p+60–156 ters açı: Louis'nin omzu kadraj sol-önde bulanık, memurun yüzü, pencere A **memurun başının sağında**: x 640–1000, y 420–960 (%28). `cs 1.00→1.06`. Mum alttan, gölge sert.
- **Karakterler:** Louis z 1.5, u 0.30 (öne eğilir p+0–20; yüzü ifadesiz). Memur z 1.7, u 0.62. Baston Louis'nin sağ yanında masaya dayalı, sapı kadraj kenarında.
- **Zaman çizelgesi:** 0–20 Louis öne eğilir · replik 10–60 "Tek bir hata." (dudak senkronu) · 60 **kesme**: memur · 60–72 Louis'nin eli **ikinci keseyi** kadraja sokup memurun önüne kaydırır, durur (p+72) · replik "Fazlası değil." 84–130 (ekran dışı ses) · 72–96 memurun gözü kese ↔ pencere · **100–140 direk kolu kendi kendine gıcırdayarak kıpırdar** (pencerede, ~20°) · **106 memur irkilir** (omuz kalkar) · 140–156 hold (kapanış).
- **Temas:** **1356 (p+72)** kese masaya kayıp durur "tok" · 1384–1424 (p+100–140) kol gıcırtısı (uzun) · **1390 (p+106)** memur irkilme (kumaş, hafif) · mum alevi dalgalanır (görsel).
- **Süreklilik:** İkinci kese P07'de masadaydı (kurulum). Direk P01/P07'deki ile aynı, kol konumu B'den sapma ~20° (rüzgâr). Memur: gri ceket, şapkasız, sol göğüs cebinde beyaz eldiven köşesi (→P15, P16).
- **Fizik:** Kol kıpırtısı gevşek halat hattının rüzgârdaki sallanışı (stilize, kol oturma konumuna +20° döner, sonra geri 100–150 salınır ve durur).
- **Geçiş (çıkış):** SERT + ses vurgusu (şok): kol gıcırtısı kesilir, Paris gündüz.
- **Ekran yazısı:** Altyazı (Louis): "Tek bir hata. Fazlası değil." ALT-BANT, 1294–1414, "LOUIS" etiketi.
- **Anlatım:** LOUIS (düz, soğuk). **Dokunuş:** kulenin memuru izliyor hissi.

### P09 · kare 1440–1560 · PARIS-AVLU (gündüz)
- **Kadraj/kamera:** Orta plan, hafif alçak açı (adamın başı kadrajın üstünde kesik, **yüzü görünmez**). `cs 1.00→1.05, cx 0→+30`. Taş avlu, sağda "TOURS" etiketli posta arabası (etiket 380x110 px).
- **Karakterler:** Paris adamı z 1.6, u 0.28 (koyu redingot, **gri manşet, sağ manşette tek altın düğme**), arabacı z 2.2, u 0.80 (kutu üstünde oturur, çizmeli, sağ ayağı kutu korkuluğunda). Araba z 2.2, u 0.62.
- **Giriş/çıkış:** Avlu kapısı arkada (kullanılmıyor).
- **Zaman çizelgesi:** 0–18 eller paketi kaldırır · **18 fırlatma** · 18–40 paket yay çizer · **40 arabanın tepesine iner** · 42–62 kayar, düşmek üzere · **64 arabacı çizmesiyle durdurur**, paket oturur · 80 gri manşet düzeltilir (kapanış) · 80–120 toz oturur, hold.
- **Temas:** **1458 (p+18)** "huf" · **1480 (p+40)** paket araba tepesine "tok" · 1482–1502 sürtünme · **1504 (p+64)** çizme "tap" · 1520 (p+80) manşet kumaşı.
- **Süreklilik:** Paket kahverengi kâğıt + kenevir ip + "TOURS" kâğıt etiketi (→P10). Gri manşet + düğme (→P23).
- **Fizik:** Paket araba tepesindeki bagaj çıtasının dışına sürtünmeden kayar, ön kenarda çizmeyle durur; çizme kutu korkuluğunda, korkuluğa gömülmez.
- **Geçiş (çıkış):** MATCH. Kahverengi paket, P10'da masada aynı kâğıt dokusu ve etiket.
- **Ekran yazısı:** "Şifre: bir posta paketi" ÜST-BANT, 1446–1554.
- **Anlatım:** "Paris'ten Tours'a paket geliyor."

### P10 · kare 1560–1692 · TOURS-KULUBE-IC (masa üstü, tepe açı)
- **Kadraj/kamera:** Tepe açı (90° aşağı), statik. `cs 1.00→1.04`. Masa ortasında iki açık paket yan yana: sol (x 140–500) eldiven + yeşil ↑ etiketi; sağ (x 580–940) koyu yün çorap + kırmızı ↓ etiketi. Çorap masa alt kenarına yakın (kenar y ~1270). Fener amber.
- **Karakterler:** Yok.
- **Eylem:** 8–28 yeşil ok etiketi hafif zıplar, eldiven kâğıtta kabarır (yükseliş) · 54–76 kırmızı ok etiketi iner; etiket ipi çorabı çeker · 76–88 çorap masa kenarına gelir · **88 kenardan sarkar "flop"** · 88–116 sallanır (pörsümüş) · 116–132 durur (kapanış).
- **Temas:** **1572 (p+12)** eldiven kabarma, kâğıt hışırtısı · **1618 (p+58)** etiket ipi çorabı çekmeye başlar · 1636 (p+76) yün kenar sürtünmesi · **1648 (p+88)** çorap kenardan "flop" · 1676 (p+116) son sallanma.
- **Süreklilik:** Paket kâğıdı ve "TOURS" etiketi P09'dan. Eldiven P01 eldiveniyle aynı model.
- **Fizik:** Etiket ipi çorabın bileğine bağlı (görünür ip). Çorap kendi ağırlığıyla kenarda sarkar.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "ELDİVEN = ↑ · ÇORAP = ↓" ÜST-BANT, 1566–1686 (anlatımla örtüşme senaryoda gerekçeli).
- **Anlatım:** "Eldiven: yükseliş. Çorap: düşüş." **Dokunuş:** sarkan çorap.

### P11 · kare 1692–1884 · TOURS-KULUBE-IC → INSERT
- **Kadraj/kamera:** p+0–64 orta plan, gündüz, soğuk ışık: `cs 1.00→1.04`. p+64–192 INSERT 45° aşağı: regülatör sapı + eller + çene üstte; sap ve damla ekranın %25'i. `cs 1.00→1.06`.
- **Karakterler:** Memur z 1.8, u 0.50 (profil, sağa dönük, gri ceket, şapkasız; terli şakak, çene ucunda damla belirir). Regülatör pencere tezgâhında. Pencere B (önceki kule) kadraj sol-üst, uzak kule küçük (≥100 px) ve kolları görünür.
- **Giriş/çıkış:** Yok (memur yerinde).
- **Zaman çizelgesi:** 10–24 memur iki eliyle sapı kavrar · 24–52 pencere B'ye bakar (resmî mesajı veren kule) · 52–62 bakış iner · **64 kesme: insert** · 70–100 sap iki konum: tık, tık · **108 fazladan çentik TIK** (kırmızı halo 108–176) · 108–118 çenede damla birikir · **134 damla sapa "tıp"** (damla sapta kayar 134–160) · 150–166 tık, tık devam · 170–192 sap yeni konumda durur (kapanış).
- **Temas:** **1704 (p+12)** eller sapa "tak" · **1770 (p+78)** tık · **1784 (p+92)** tık · **1800 (p+108)** TIK (sert) · **1826 (p+134)** damla "tıp" · **1842 (p+150)** tık · **1858 (p+166)** tık. Müzik 1800–1830 arası kesilir.
- **Süreklilik:** Regülatör düzeni (→P12, P13). Çentik konumu X (→P12 POV'daki kule kolu X). Memur gömlek yakası, cep eldiveni.
- **Fizik:** Memur sapı iki elle kavrar, eller sapın üzerinde; damla çeneden sapa yerçekimiyle düşer, aradaki mesafe insertte görünür.
- **Geçiş (çıkış):** MATCH. Kırmızı halo dairesi → P12 dürbün maskesi (aynı merkez/çap ~860 px).
- **Ekran yazısı:** "Resmî mesaj + gizli bir "hata"" ÜST-BANT, 1698–1878.
- **Anlatım:** "Memur, resmî mesajın içine küçük bir hata gizliyor." **Dokunuş:** ter damlası.

### P12 · kare 1884–2028 · KULE-DIS (ara kule, gündüz)
- **Kadraj/kamera:** p+0–24 orta-yakın (dışarıdan, kulübe penceresi, telgrafçı bel üstü). p+24–70 dürbün POV, **dairesel maske** (merkez (540, 950), çap ~860). p+70–144 aşırı yakın göz/kaş (göz y 520–820, kaş yayı y 400–520, tüm yüz alanı >%50).
- **Karakterler:** Telgrafçı (kısa, tombul, kahve resmî frak, bıyık, şapkasız) kulübe penceresinde z 1.5, u 0.50. Dürbün = tek tüplü pirinç teleskop (dönem). POV'da Tours kulesi (uzak, kollar X konumunda, ≥300 px siluet).
- **Giriş/çıkış:** Telgrafçı penceredeki yerinde, dürbünü kaldırırken görülür (kurulum). Kimse kadraja girmez.
- **Zaman çizelgesi:** 0–24 telgrafçı dürbünü gözüne kaldırır · 24 POV · 40 odak halkası, kule net · 70 **ters açı**, gözünü kısar (70–90) · 94–126 **tek kaş yavaşça kalkar** · 126–144 hold (kapanış).
- **Temas:** **1906 (p+22)** dürbün gözüne "tık" · **1924 (p+40)** odak halkası "kırt" (YAKIN, −3) · rüzgâr süren. Anlatım "Her kulede iki dürbün var." p+6–96; **0.5 sn tam sessizlik p+100–130 (müzik de susar)**.
- **Süreklilik:** Telgrafçı aynı kişi P13'te. POV'daki kule kolu X = P11 çentik konumu. Pencere/regülatör düzeni (genel kural).
- **Fizik:** POV'da kule 8–10 km uzakta, çözünürlük/kontrast hava perspektifiyle düşük ama kol silueti okunur.
- **Geçiş (çıkış):** SERT (kaş inince, müzik geri gelir).
- **Ekran yazısı:** "Ya fark ederse?" **ALT-BANT** (üst yarıyı kaş dolduruyor), 1980–2022.
- **Anlatım:** "Her kulede iki dürbün var." **Dokunuş:** kaş. (Senaryodan sapma: 24 karelik giriş eklendi, bkz. Bölüm 4.)

### P13 · kare 2028–2184 · KULE-DIS
- **Kadraj/kamera:** Orta plan, dışarıdan, kulübe penceresi. p+0–60: `cs 1.25`. p+60–130 geri çekilme: `cs 1.25→0.80, cy +60→−120`. Üstte telgrafçının **kendi direği** (kulübe çatısında), ufukta sıradaki kule siluet.
- **Karakterler:** Telgrafçı z 1.5, u 0.50 (aynı kişi). Yüz ekranın ≥%15'i (esneme anında 300+ px).
- **Zaman çizelgesi:** 0–14 dürbünü indirir, tezgâha koyar · 14–30 omuz silker · 30–66 kolu çevirir, **esner** (36–66) · **68 kendi direğinin kolu "klak", çentik X'i kopyalar** · 60–130 kamera geri çekilir · **114 ufuktaki kule kopyalar** · 130–156 hold (kapanış).
- **Temas:** **2038 (p+10)** dürbün tezgâha "tok" · 2062–2094 (p+34–66) kol cırcırı · **2096 (p+68)** direk "klak" · **2142 (p+114)** ufuk kule uzaktan "klak" (GENİŞ −8, yankı).
- **Süreklilik:** Kopyalanan konum X (P11 çentik). Ufuk kulesi → P14'te Bordeaux kulesi.
- **Fizik:** Kamera dışarıdayken geri çekilir, duvarın içinden geçmez (pencere önündeki kamera dış tarafta).
- **Geçiş (çıkış):** MATCH. Ufuk kulesinin siluet çizgisi (kol X) → P14'te dürbünde aynı çizgi.
- **Ekran yazısı:** "Kimse durdurmadı. Herkes kopyaladı." ÜST-BANT, 2034–2178.
- **Anlatım:** "Ama devletin adamları hatayı aynen kopyalıyor." **Dokunuş:** esneme.

### P14 · kare 2184–2316 · CATI-KATI
- **Kadraj/kamera:** Omuz üstü, **maskesiz**. Odak kayması **tüm kadrajda**: p+0–40 odak yakın (omuz, teleskop net, uzak kule bulanık) → p+40–100 **uzak kule net, ön plan bulanık (1 sn tut)** → p+112–132 odak orta (Louis). `cs 1.00→1.05`.
- **Karakterler:** Suç ortağı z 1.5, u 0.30 (sırtı yarı kameraya, koyu kahve redingot, basık kasket, teleskop pencere pervazında). Pencere (dormer, içeriden): x 380–900, y 380–1000. Louis arka planda masa başında z 3.0, u 0.78 (bordo frak, gri şapka masada, baston masaya dayalı, bekler). Uzakta tepede Bordeaux kulesi.
- **Giriş/çıkış:** Dormer pencere açık; kimse girmez/çıkmaz.
- **Zaman çizelgesi:** 4 teleskop pervaza oturur · 20–40 odak halkası (rack) · 40 kule net · **56–70 kule kolu çentik X'e "klak"** (seçilir) · 100–112 ortak teleskopu tek hamlede kapatır **"şlak"** · 112–132 odak Louis'ye, hold (kapanış).
- **Temas:** **2188 (p+4)** teleskop pervaza "tık" · 2204–2224 halka sesi · **2244 (p+60)** uzak kule "klak" (GENİŞ −8) · **2294 (p+110)** teleskop kapanır "şlak" (YAKIN).
- **Süreklilik:** Dormer, kule ve oda P06 çatı dışından eşleşir (aynı pencere dışarıda soldan 2.). Louis'nin bastonu masada (P07 kuralı). Kol X.
- **Fizik:** Teleskop pervaza dayanır, pencere çerçevesinden geçmez; kule uzak, ölçek derin.
- **Geçiş (çıkış):** KÂĞIT (karartma). Teleskop kapağı kapanınca ekran tamamen siyah (p+128–132), P15 takvim.
- **Ekran yazısı:** "Dürbünün ucunda: Bordeaux" ÜST-BANT, 2190–2310.
- **Anlatım:** "Bordeaux'da bir suç ortağı bekliyor." **Dokunuş:** odak kayması.

### P15 · kare 2316–2472 · MONTAJ-15
- **Kadraj/kamera:** Dikey ikiye bölünmüş. Ayraç ahşap kiriş y 948–972. ÜST yarı (ALTIN-MASA, sıcak, y 220–948): sol Louis'nin defteri (x 120–520, y 700–900), altın yığını (x 380–620, y 780–930), sağ François'nın kadeh tutan eli (x 640–900, y 560–800), sağ-üst takvim bloğu (x 700–960, y 330–600, yaprak 220x240). ALT yarı (TOURS-KULUBE-IC, soğuk, y 972–1500): memur masa başında, elinde buruşuk beyaz eldiven, gözaltı koyulaşır. Statik, `cs 1.00→1.04`.
- **Eylem:** 6–36 üç sikke yığına düşer, yığın büyür · 20–70 François kadeh kaldırır, masaya bırakır (70) · **40–54 "1835" yaprağı takvimden kopar** · 54–110 yaprak ayracın **önünden** salınarak alta süzülür · **112 memurun omzuna konar** · 120–140 takvimde "1836" yaprağı görünür · 52 ve 128'de memur öksürür · her öksürükte omuzlar bir tık düşer (zayıflama) · 140–156 hold.
- **Temas:** **2324, 2332, 2342** sikke "şıngır" (p+8,16,26) · **2358 (p+42)** takvim yırtılması · **2368 (p+52)** öksürük · **2386 (p+70)** kadeh masaya "tık" · **2428 (p+112)** yaprak omza (çok yumuşak) · **2444 (p+128)** öksürük.
- **Süreklilik:** Memur: gri ceket, **buruşuk beyaz eldiven elinde** (kurulum → P16 elinde). Takvim 1834 başlangıcı (P01 yılı). Ceket sol göğüs cebi.
- **Fizik:** İki yarı tek ahşap çerçevenin iki penceresi; yaprak ayracın önünden geçer (duvar içinden geçmez). Yaprak kâğıt gibi salınır, düşme ivmesi yavaş.
- **Geçiş (çıkış):** MATCH. Memurun omuz silueti alt yarıdan tam ekrana (P16'da yatakta aynı omuz açısı).
- **Ekran yazısı:** "1834 → 1836" ÜST-BANT, 2322–2466.
- **Anlatım:** "İki yıl boyunca... herkesten önce bildiler." **Dokunuş:** 1835 yaprağı.

### P16 · kare 2472–2640 · YATAK-ODASI (gece)
- **Kadraj/kamera:** p+0–60 orta plan, yavaş push-in `cs 1.00→1.10`. p+60–168 INSERT alçak açı (yer seviyesi), eldiven ve tahta zemin, `cs 1.00→1.12`.
- **Oda kimliği:** Taşra odası (tuffeau duvar, ahşap kiriş), demir yatak, saman şilte, mum soldaki komodinde, pencere (A tipi, soğuk mavi) sağ-arka, kapı arka-sol, sandalyede **koyu figür silüeti** (u 0.85, z 2.8, dinleyici, kurulum → P17). Memurun gri ceketi duvardaki askıda.
- **Karakterler:** Memur yatakta z 2.2, u 0.45, gömlek, solgun, terli; başı yastıkta sağa dönük; sağ eli yatak kenarında elinde eldiven.
- **Zaman çizelgesi:** 0–60 nefes, pencerede uzak kule; el gevşemeye başlar · 60 **kesme: insert** · 72 eldiven yorgandan kayar · 84 kenardan aşağı · 84–102 düşer · **102 tahtaya "tok"** · 108 küçük sekme · 108–168 eldiven yerde, parmakları yarı açık (kapanış).
- **Temas:** nefes süren · **2544 (p+72)** kumaş sürtünmesi · **2574 (p+102)** eldiven tahta zemine (YAKIN −3, yumuşak) · **2580 (p+108)** minik sekme.
- **Süreklilik:** Eldiven P15'te memurun elinde kuruldu. Pencere kule (→P17). Sandalye silüeti (→P17). Ceket askıda (cep boş, eldiven çıkarılmış).
- **Fizik:** Yorgan yatak kenarına eğik; eldiven kenardan yere düşer, yatak ayağına çarpmaz; zemin döşeme tahtası.
- **Geçiş (çıkış):** SAME (aynı oda, yakın yüz).
- **Ekran yazısı:** "1836 · İçeriden biri" ÜST-BANT, 2478–2634.
- **Anlatım:** "Ta ki bir memur ağır hastalanana kadar."

### P17 · kare 2640–2784 · YATAK-ODASI
- **Kadraj/kamera:** Yakın plan, memurun yüzü (y 520–1100), 3/4. Pencere (A) sağ-üstte: kule x 640–960, y 300–620 (%17). Sağ kenarda dinleyicinin omuz/şapka kenarı (bulanık, koyu, yüzsüz). `cs 1.00→1.05`.
- **Eylem:** 0–20 başını yastıkta dinleyiciye çevirir · 24–66 fısıltı "Eldiven... çorap..." (dudak) · 74–110 anlatıcı "Ve anlattı." · **112 uzak kule kolları dinlenme konumuna iner "klunk"** · 114–132 tam sessizlik (0.3 sn) · 120–144 memur gözlerini kapatır (kapanış).
- **Temas:** **2648 (p+8)** yastık hışırtısı · **2752 (p+112)** kule "klunk" (GENİŞ −8, boğuk).
- **Süreklilik:** Dinleyici P16 sandalye silüetiyle aynı; kule kolları dinlenme konumu (→P21, P22). Memur gömlekli.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** Altyazı (Memur): "Eldiven… çorap…" ALT-BANT, 2660–2706; ayrı ÜST etiket yok.
- **Anlatım:** MEMUR (fısıltı, kırık) + ANLATICI.

### P18 · kare 2784–2916 · MAHKEME
- **Kadraj/kamera:** Geniş, alçak açı, yavaş push-in `cs 1.00→1.12`. Kürsü kadraj orta-üstünde; duvar saati x 760–920, y 470–640 (huzme üstünde). Jüri sıraları sol, halk arka. Çapraz toz huzmeleri uzun pencerelerden.
- **Karakterler:** Başkan yargıç z 5.0, u 0.50, iki yargıç yanında; kürsüde **tokmak** (başkanın elinin yanında, kurulum → P19). Sanık sırasında **arkadan** ikizler: François (lacivert) z 2.4, u 0.34 (ekran solu), Louis (bordo) z 2.4, u 0.52, şapkalar dizlerinde, baston sıraya dayalı sağ yanında (u 0.58).
- **Giriş/çıkış:** Kimse girip çıkmaz (oturuyor). Kapı arka duvarda.
- **Zaman çizelgesi:** 6–62 anlatım "1837. Mahkeme." · salon uğultusu **66'da keser** · 70–106 sessizlik (0.6 sn) · **88 saat yelkovanı tek sert zıplar "TIK"** · 106–132 hold (kapanış).
- **Temas:** **2872 (p+88)** saat "TIK" (yankılı, ORTA).
- **Süreklilik:** Sanık sırası: **kamera kürsüye bakarken** François ekran solu. P19 ters açıdan (kürsü kamera arkasında) **Louis ekran solu**. Şapkalar dizde (P19 sonuna kadar). Louis'nin cebi: eldiven köşesi sırttan görünmez; P19'da cebe açıklık verilir.
- **Fizik:** Huzmeler pencerelerden zemine çapraz, gölge yönü ışık kaynağının tersine. Saat yelkovanı skalası; duvar saati duvarda asılı.
- **Geçiş (çıkış):** SERT (TIK'ten hemen sonra, 0.6 sn sessizliğin sonunda).
- **Ekran yazısı:** "Tours Ağır Ceza · Mart 1837" ÜST-BANT, 2790–2910.
- **Anlatım:** "1837. Mahkeme." **Dokunuş:** saat TIK.

### P19 · kare 2916–3036 · MAHKEME
- **Kadraj/kamera:** p+0–40 INSERT tokmak (aşırı yakın, statik). p+40–76 orta plan sanık sırası, **ters açı (kamera sanıklara bakar)**. p+76–120 INSERT eller (ekranın %20+).
- **Karakterler:** Sanık sırası önden: **Louis ekran solu** z 2.0, u 0.34; **François ekran sağı** z 2.0, u 0.62; şapkalar dizde. Tokmak yargıç elinde (insert).
- **Eylem:** 0–10 tokmak havada · **12 iner TAK** · "BERAAT" damgası p+12'de iner (sert, hafif dönük) · 40 kesme · 44–72 François'nın gülümsemesi yayılır · 48–58 Louis sağ elini cebine sokup beyaz eldivenleri çıkarır (cepten çıkış görünür) · 58–76 sol eldiveni giyer · 76 insert · 80–108 sağ eldiveni **parmak parmak** giyer · **112 bilek düğmesi** · 112–120 eller kenetli (kapanış).
- **Temas:** **2928 (p+12)** tokmak "TAK" + kısa reverb (YAKIN −2) · 2964 (p+48) cep kumaşı · **2984 (p+68)** sol eldiven bilek gerilmesi · **3002, 3008, 3014, 3020** (p+86,92,98,104) parmak gerilmeleri (deri) · **3028 (p+112)** bilek düğmesi "çıt".
- **Süreklilik:** Louis eldivenleri sağ göğüs cebinden (P02, P04, P06 cep köşesi ile kurulu). Tokmak P18'de kürsüde. Baston sıraya dayalı kalır (görünmez).
- **Fizik:** Tokmak sehpaya (yuvarlak ahşap taban) iner, eldiven parmakları el boyuna uyar.
- **Geçiş (çıkış):** KÂĞIT (sayfa kesmesi): eller kenetlenir → P20 sayfa.
- **Ekran yazısı:** "BERAAT" damga, **ALT-BANT**, 2928–3016, kırmızı mürekkep, dönük (−4°), 180 px. İki kadrajda da (insert ve orta) aynı yerde kalır.
- **Anlatım:** "Beraat." **Dokunuş:** Louis'nin eldiven giymesi (şifre: yükseliş).

### P20 · kare 3036–3192 · KANUN-INSERT
- **Kadraj/kamera:** Tepe açı insert. Açık kanun kitabı (x 140–940, y 480–1300). Yargıç eli siyah cübbe kollu, kitabın sağında. `cs 1.00→1.05`. Pencere huzmesi sayfaya düşer.
- **Eylem:** 0–70 yargıç sayfaları hızla çevirir (6 çevirme) · 72 ilgili bölüm bomboş; parmağı sayfaya bastırır · **kurulum:** p+0'dan beri cilt oluğunda **kanatları kapalı güve** (~110 px) durur · **100 güve kanatlarını açar** (~220 px, ≥%11) · 108–150 kitabın ortasından kalkar, kadrajın üst-sağından çıkar · 150–156 sayfa titreyip yatışır (kapanış).
- **Temas:** **3042, 3050, 3058, 3066, 3074, 3082** sayfa "fışt" (p+6…46) · **3108 (p+72)** parmak sayfaya · **3136 (p+100)** kanat açma (çok hafif) · 3144–3186 kanat pırpırı (GENİŞ).
- **Süreklilik:** Güve cilt oluğunda p+0'dan görünür (kurulum). Yargıç cübbesi P18 ile aynı.
- **Fizik:** Güve kitaptan yukarı kalkar, kadraj dışına uçar.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Suç yok. Çünkü yasa yok." ÜST-BANT, 3042–3186.
- **Anlatım:** "Çünkü bunu suç sayan bir yasa yoktu." **Dokunuş:** güve.

### P21 · kare 3192–3324 · TOURS-KAPI (gündüz)
- **Kadraj/kamera:** p+0–60 orta plan: kapı x 320–760, y 700–1400; ilan x 420–660, y 800–1100 (%16). Direk kapı üstünde x 380–700, y 330–700, kollar **dinlenme konumu** (P17). p+60–120 INSERT sürgü (kapı sağ kenarı, demir sürgü ve yuvası ~%25). p+120–132 orta plan. Statik/hafif push.
- **Karakterler:** Resmî görevlinin eli: siyah redingot kolu, **beyaz manşet** (Paris gri manşetinden ayırt edilir), yüz yok; sol el ilanı tutar, sağ el çekiçle çakar. Görevli kadrajın sağ-altından girer (kare açılırken içeride), 46'dan sonra elini çeker.
- **Eylem:** **16, 30, 46 (TAK) çekiç darbeleri** · 46–58 el çekilir, kadrajdan sağ-alta çıkar · 60 insert · 64–82 sürgü sarkaç gibi titrer · **84 yuvasına "klank"** · 84–120 durur · 120 orta plan kapı kilitli (kapanış).
- **Temas:** **3208 (p+16), 3222 (p+30), 3238 (p+46)** çekiç + çivi · 3258, 3266 (p+66, 74) sürgü halkası "tink" ×2 · **3276 (p+84)** sürgü "klank" (YAKIN).
- **Süreklilik:** İlandaki **kırmızı mühür** P05'in mührüyle aynı. Direk kolları dinlenme (P17). Tours kulübesi cephesi = KULE-DIS kulübesi (pencere A bu cephenin arkası).
- **Fizik:** Çiviler kapı tahtasına çakılı; el çekilince kapı sallanmaz. Sürgü kendi ağırlığıyla yuvaya düşer (yerçekimi), kapıdan geçmez.
- **Geçiş (çıkış):** MATCH. Direk (dikey çizgi) → P22 siluet direği aynı konum.
- **Ekran yazısı:** "Önce açık. Sonra yasa." **ALT-BANT** (direk üstte), 3198–3318.
- **Anlatım:** "Telgraf yasası aynı yıl geldi."

### P22 · kare 3324–3468 · WIFI-MORF
- **Kadraj/kamera:** Siluet, geniş → morph. p+0–60: Tours direği alacakaranlık moru gökyüzüne karşı, kamera kollara zoom `cs 1.00→2.20`. p+60–96 T kolları katlanarak üç yaya dönüşür. Morph merkez (540, 800), boy ≥ 600 px (%31). Arka plan 60–110'da alacakaranlıktan telefon-ekranı karanlığına.
- **Doku:** Kukla/tahta kesme, boyalı kâğıt, katmanlı ahşap, kenar gölgesi. **Neon yok, parlama yok.** "Yanma" = ahşap koyu → açık amber boya tonu geçişi + hafif kenar vurgusu.
- **Eylem:** 60–90 kollar katlanır, direk nokta olur · **90, 102, 114 üç yay sırayla yanar** · 114–144 hold (kapanış).
- **Temas (ses olayı, fiziksel temas değil):** 3384–3414 tahta gıcırtısı · **3414 (p+90), 3426 (p+102), 3438 (p+114)** digital "blip" (blip'ler kısık).
- **Fizik:** Morph şekil değiştirmedir, fiziksel nesne değil; yine de kollar katlanırken mafsal noktaları sabit.
- **Süreklilik:** Direk P21 ve P17 ile aynı siluet.
- **Geçiş (çıkış):** SERT, ekran karanlığından P23 fener ışığı.
- **Ekran yazısı:** "İlk siber saldırı" **ALT-BANT**, 3330–3462 (morph ortada).
- **Anlatım:** "Bazıları buna ilk siber saldırı diyor."

### P23 · kare 3468–3600 · PARIS-MASA · LOOP
- **Kadraj/kamera:** P01'in aynası: tepe-önden, **aynı kamera, `cs 1.00`**, aynı masa/pencere A/fener konumu. P01 f0 kompozisyonu son karede. Pencere A sağ-üst, direk dışında, kollar B konumunda (P01 sonrası) başlar.
- **Karakterler:** Paris adamının elleri (gri manşet, sağ manşette altın düğme, P09'daki).
- **Eylem:** 0–20 eldiveni kâğıdın ortasına koyar · 20–44 sol kenar katlanır · 44–68 sağ · 68–84 alt/üst · 84–118 ip dolanır · 108–120 fiyonk çekilir · **112 ip gerilir** · **114–122 direk kolu "klak", A konumuna döner (P01 f0 konumu)** · 120–132 eller çekilir, kapalı paket merkezde (kapanış).
- **Temas:** **3482 (p+14)** eldiven kâğıda · 3502, 3526, 3546 (p+34,58,78) kâğıt katlama · 3564 (p+96) ip sürtünmesi · **3580 (p+112)** ip "zıııt" · **3584 (p+116)** direk "klak".
- **Süreklilik:** **Döngü:** son kare = P01 f0 kompozisyonu (aynı kamera, pencere, kol A). P01 f0 paket yarı açık, el eldiveni çekiyor: P23 paket kapalı biter; kesme "kapat → aç" anlamı taşır. Senaryodaki "son kare kâğıt yarı açık" ifadesi bu yüzden değiştirildi (Bölüm 4, madde 2).
- **Fizik:** Paket ve masa P01 ile aynı; ip düğümü fiziksel (iki ucu çekilir).
- **Geçiş (çıkış):** LOOP: SERT, müzik P01 pizzicato notasına kesintisiz bağlanır.
- **Ekran yazısı:** "Elektrik yok. Sadece…" ÜST-BANT, 3474–3600.
- **Anlatım:** "Kablo yok. Bilgisayar yok. Sadece..." (cümle P01 "...bu eldiven" ile tamamlanır).

---

## 3. Süreklilik kontrol tablosu

| Öğe | Durum plan plan |
|---|---|
| **Beyaz eldiven (kanca/paket)** | P01 memurun elinde, kâğıttan çıkar, masaya bırakılır · P10 paketin içinde (↑ etiketi) · P15 memurun elinde buruşuk, sıkılı · P16 elinde → yatak kenarından yere düşer · P23 Paris'te pakete konur (aynı model, aynı beyaz) |
| **Louis'nin eldivenleri** | P02, P04, P06, P07: sağ göğüs cebinden **beyaz köşe** görünür, ellerde yok · P18 sırttan görünmez · P19 cepten çıkarılır, giyilir (kurulum tamam) |
| **Gri manşet (Paris adamı)** | P09 koyu redingot + **gri manşet, sağ manşette tek altın düğme**, yüz görünmez · P23 aynı manşet ve düğme. P21 görevlinin manşeti **beyaz** (karışmasın) |
| **Louis'nin bastonu** | P04 sağ elde, ucu yerde · P06 sol ön koluna asılı · P07 masa kenarına dayalı, sağ yanında · P08 aynı (kadraj kenarı) · P14 masaya dayalı · P18 sıraya dayalı, sağ yanında · P19 aynı (görünmez) |
| **Louis'nin şapkası** | gri; P02–P07 başında, P14 masada, P18–P19 dizinde |
| **François'nın şapkası** | siyah silindir; P02 başında · P04 sonunda elde, kalkık · P07 başında · P18–P19 dizinde |
| **Louis/François ekran yönü** | P02, P04: François solda, Louis sağda · P18 (arkadan): François solda · P19 (ters açı, önden): **Louis solda, François sağda** (kasıtlı, aynı oturuş düzeni) |
| **Memurun kıyafeti** | zayıf, yıpranmış **gri ceket**, şapkasız, sol göğüs cebinde eldiven köşesi: P01 (kol), P07, P08, P11, P15 · P16–P17 gömlek (ceket askıda) |
| **Müdür** | yalnız P07 (yaşlı, iri, koyu yelek). P08'de görünmez (kadraj dışı), P11'de yok |
| **Telgrafçı (ara kule)** | P12, P13 aynı kişi, kısa, tombul, kahve frak, bıyık. Memur değildir |
| **Suç ortağı** | P14 (koyu kahve redingot, basık kasket); P06'da yok, ama dormer pencere ve kule P06'da kurulur |
| **Kule görünürlüğü** | P01 (A penceresi, kol A→B) · P03/P05 (harita ikonları) · P06 (uzak siluet) · P07 (A, sabit B) · P08 (A, gıcırtı +20°) · P11 (B penceresi uzak kule) · P12 (POV X) · P13 (kendi direk + ufuk) · P14 (Bordeaux X) · P16 (pencerede uzak) · P17 (dinlenmeye iner) · P21 (dinlenme) · P22 (siluet) · P23 (A) |
| **Kol konumları** | A = P01 f0 / P23 son. B = P01 f44 sonrası, P07. X = fazladan çentik (P11 → P12 → P13 → P14). Dinlenme = P17 sonrası, P21 |
| **Mum / fener** | P01 fener (amber) · P07, P08 tek mum masada (aynı) · P16 mum komodinde |
| **İkinci kese** | P07 Louis dirseğinde → P08 memurun önüne kayar |
| **Kırmızı mühür** | P05 haritada · P21 ilanda (aynı tasarım) |
| **Dormer penceresi** | P06 dışarıdan, soldan 2., açık · P14 içeriden (aynı pencere) |
| **Paket** | P09 kahverengi + ip + "TOURS" etiketi · P10 aynı kâğıt/etiket · P23 kapatılan |
| **Saat/tokmak** | P18 saat üst-sağ, tokmak kürsüde · P19 tokmak iner (aynı nesne) |
| **Güve** | P20 cilt oluğunda p+0'dan, 100'de açılır |
| **Sandalye silüeti** | P16 arka sağ, P17 sağ kenar omuz (dinleyici) |
| **Işık yönü** | Bordeaux gündüz sıcak altın · gece mavi ay + amber · Tours iç tek fener/mum amber · Mahkeme çapraz huzme · P22 alacakaranlık mor |

---

## 4. Senaryodan sapmalar ve yakalanan sorunlar

1. **P09 1.8 sn kuralı ihlali.** CLAUDE.md ve yönetmen ilkesi: sahne 2–5 sn. P09'dan 12 kare P10'a kaydı: P09 2.0 sn (120 kare), P10 2.2 sn (132 kare). Toplam değişmez. Senarist onayı gerekir.
2. **P23 "son kare kâğıt yarı açık" ile "ipi çeker" çelişkisi.** Bir paket hem bağlanıp hem yarı açık olamaz. Çözüm: P23 kapalı paketle biter, kamera/masa/pencere/kol A P01 f0 ile birebir; döngü kamera ve kompozisyon eşleşmesidir, "kapat → aç".
3. **P01 → pencere kule + tek el.** Kancada kolun "şak"ı eldivenle aynı karede; fiziksel gerekçe: oda içinde kadraj dışı ikinci el regülatörde (ya da halat). Metafor, belgeliyor.
4. **P12 kurulum eksiği.** Senaryoda telgrafçının yüzü aşırı yakın planda ilk kez görünüyordu. Eklendi: p+0–24 giriş (dürbünü kaldırır). Süre toplamı değişmez.
5. **P08 ikinci kese.** Senaryoda "gözü kese ile pencere arasında" yazıyordu ama kese P07'de müdüre gidiyordu. P07'de masaya **iki kese** kondu, ikincisi P08'de memura kayar.
6. **P15 memur eldiveni.** P16'da "buruşuk beyaz eldiven" elde birden görünürdü. P15 alt yarıda memurun elinde kuruldu.
7. **P16/P17 dinleyici.** Kimliği belirsiz kişi P16'da sandalyede silüet olarak kuruldu.
8. **P19 eldiven cebi.** Louis'nin cebi P02'den itibaren beyaz köşeyle kuruldu.
9. **P18 → P19 sol/sağ.** Ters açıda ikizlerin ekran yönü tersine döner (tabloda).
10. **P14 "dürbün".** Dönem doğruluğu: tek tüplü pirinç teleskop (lunette), çift dürbün değil. Anlatım "dürbün" der, görsel teleskop, kabul edilebilir.
11. **"İkizler" → "kardeşler".** P02 metni değişti. Açıklama metni ve EN uyarlaması "twins" diyor; **senaristin açıklamayı güncellemesi gerekir** (yönetmen kapsamı dışı).
12. **P04 yoğunluğu.** Baston-fare, replik, göz kırpma. Kayıtlı risk R1.
13. **Hareket tamamlanır/kapanış:** her planda kapanış anı yazıldı. P03 toz, P05 araba durur, P06 saat/bakış, P07 çekmece hold, P09 manşet, P12 kaş hold, P13 ufuk kule, P16 eldiven parmakları, P20 güve çıkışı, P21 sürgü, P23 paket kapalı.
14. **Dönem notu:** P02 tahta %3 rente (kâğıt para yok, altın/gümüş frank), P04 ipe asılı réverbère, Notre-Dame yok, P11 regülatör T biçimli kollu (yel değirmeni değil).

---

## 5. Riskli planlar

| # | Plan | Risk | Önlem |
|---|---|---|---|
| R1 | P04 | 3.6 sn'de insert + replik + göz kırpma. Replik penceresi 1.9 sn, "kazanır" kare 184–210 | Insert 68 kareye sıkıştırıldı. Replik 1.9 sn'yi aşarsa göz kırpma "kazanır" ile eşzamanlı; baston TAK (p+58) kaymaz. Gerekirse P03'ten 12 kare |
| R2 | P19 | Parmak parmak eldiven ve cepten çıkış 2 sn'de; rig'de parmak yok | Ayrı vektör "EldivenEl" insert varlığı (motion). Sol eldiven orta planda, sağ insertte |
| R3 | P15 | Bölünmüş montaj, yaprak ayracın önünden geçip omuza konar; 6+ hareketli öğe | Önceden hazırlanmış 3 katman; yaprak yolu eğri parametreli. Tek ana hareket yaprak |
| R4 | P14 | Odak kayması tüm kadrajda: `blur` filtresi swangle'da yavaş | İki katman (ön/arka) keskin + bulanık iki sürüm, çapraz opaklık yerine kare başı katman değişimi; stil karesinde test |
| R5 | P22 | Wi-Fi morfu neon'a kayabilir | Tahta dokusu katmanları, yanma = renk tonu; eleştirmen kontrolü |
| R6 | P02 | 12 figürlük kalabalık + 60 fps | Kalabalık statik siluet dizisi, sadece 3 figür animasyonlu |
| R7 | P12/P13 | Aşırı yakın göz ve kaş telefonda okunmalı; esneme yüzü | Göz/kaş büyük vektör parçaları, y 400–820 |
| R8 | P01 | Kapak karesi + kanca: ilk karede hareket + yazı + pencere | f0 "yarım hareket" pozu motion stil karesi olarak çizilir |
| R9 | P03/P05 | Gerçek Fransa sınırı; harita kırpma ve tilt | `Harita.tsx` yeniden kullanılır; P05 kadrajı P03 başlangıcı |
| R10 | P16 | Eldiven yorgandan düşüşü (kumaş fiziği) | Yorgan eğik yüzey olarak sabit; eldiven rigid parça ile kayar, düşüşte iki nokta |
| R11 | P20 | Güve ≥%10 ölçek, stil dışına çıkabilir | Büyük, basit gri-kahve vektör form |
| R12 | P09 | Paket kayması ve çizme temas anı | Araba tepesi eğimsiz; paket x ekseninde kayar, çizme tam o karede çizgide |
| R13 | Genel | 60 sn tam kesim: ses kaydı gelince anlatım kayabilir | Foley görüntüye kilitli; her planda anlatım boşlukları yazılı |

---

## 6. Önerilen stil kareleri (her mekân için tek temsilî kare)

Motion bu kareleri kodla çizip onaya sunar; tüm mekân paleti, ışık, doku, rig ölçeği buradan oturur.

| Mekân | Plan | Mutlak kare | Neden |
|---|---|---|---|
| TOURS-KULUBE-IC (masa, hook) | P01 | **30** | Eldiven, el, kâğıt, pencere ve kule kolu aynı karede; kapak ve en kritik ilk izlenim |
| TOURS-KULUBE-IC (oda) | P07 | **1226** | Çekmece BAM anı: mum, pencere A direği, kapıda François, üç karakter, masa |
| BORSA | P02 | **258** | Tebeşir tozu asılı, kalabalık dönmüş: ölçek, kalabalık stili, tahta |
| HARITA | P05 | **944** | Mühür + kırmızı balmumu + kule hattı: tüm harita katmanları |
| SOKAK-BORDEAUX | P04 | **700** | François şapka kalkık, fener, sis, gemi direkleri: prototip kimliği Bordeaux'ya oturur |
| PARIS-AVLU | P09 | **1504** | Paket oturur, çizme, "TOURS" etiketi, araba, gri manşet |
| CATI-BORDEAUX | P06 | **1012** | Güvercin çıkışı, tüy, dormer, uzak kule, şafak |
| CATI-KATI | P14 | **2250** | Net kule + bulanık ön plan: odak kayması en zor render |
| KULE-DIS | P13 | **2128** | Geri çekilmiş kadraj: kulübe, kendi direk, ufuk kulesi |
| YATAK-ODASI | P16 | **2520** | Orta plan: yatak, mum, pencere kule, sandalye silüeti, ceket |
| MAHKEME | P18 | **2850** | Huzmeler, kürsü, saat, jüri: en kalabalık geniş kadraj |
| KANUN-INSERT | P20 | **3148** | Güve açık, boş sayfa, huzme |
| TOURS-KAPI | P21 | **3238** | Son çekiç darbesi: ilan, mühür, direk, kapı |
| MONTAJ-15 | P15 | **2428** | Yaprak omza konarken iki yarı + ayraç |
| WIFI-MORF | P22 | **3438** | Tam Wi-Fi ikonu: tahta dokusu / neon kontrolü |
| PARIS-MASA | P23 | **3580** | Fiyonk gerilir: P01 ile kompozisyon eşleşmesi |
| Rig doğrulama (opsiyonel) | P19 | **3002** | Eldiven insert eli: parmak vektörü |

---

## 7. Foley olay listesi (özet)

Tüm temas kareleri her plan bölümünde ve `sahne-plani.json` içinde `temaslar[]` olarak mutlak karelerle verildi. `ADIM` olayları motion'ın `yuru()` faz çıktısından üretilir (tahmini kareler P04 bölümünde). Müzik/anlatım boşlukları: P04 p+166–184 (0.3 sn), P08 sonrası 0.3 sn, P11 1800–1830 müzik kesilir, P12 p+100–130 tam sessizlik (müzik de), P17 p+114–132 (0.3 sn), P18 p+70–106 (0.6 sn), P23→P01 müzik kesintisiz.
