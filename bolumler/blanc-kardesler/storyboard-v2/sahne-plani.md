# Blanc Kardeşler · Storyboard v2 · Sahne Planı

Girdi: `senaryo-v2.md` (v2.1, onaylı, 23 plan), `arastirma.md`, `storyboard-v2/dokunuslar.md` (yaratıcı yönetmenin kesin dokunuş listesi, bu plana işlendi). Kullanıcı kararları uygulandı: süre 60.0 sn tam kesim (3600 kare), anlatımda "kardeşler", P14 maskesiz (omuz üstü suç ortağı + dürbün, odak kayması tüm kadrajda), P22 kukla/tahta dokusu (neon yok), 8 yeni mekân tam detay. Ses: ElevenLabs Umut Canbay (TR). 1080x1920 @ 60 fps.

**Orkestra kararları (işlendi):** P14 144 kareye çıktı (12 kare P15'ten alındı; kule ≥1 sn net; odak kayması + pervaz çentiği birlikte). P09/P10 12 kare aktarımı onaylandı. Toplam 3600 kare korundu; P14 ve P15 dışındaki planların kareleri değişmedi (P14 sonu ile P15 başı aynı 12 kare kadar kaydı, P15 sonu 2472 sabit).

---

## 0. Okuma kılavuzu

**Kare.** Mutlak kare = sn x 60. Bir plan `start` karesinde başlar, `end` karesinde biter (end hariç, son görünen kare = end−1). `p+N` = plan başından N. kare. Temas karesi mutlak yazılır: `2925 (p+9)`.

**Koordinat (karakter konumu).** Sokak/dış mekânlarda `Sokak.tsx` ile aynı: `z` = derinlik (1 = kameraya en yakın zemin çizgisi, büyüdükçe uzak, ZMAX 7), `u` = yanal (0 = sol duvar/kenar … 1 = sağ duvar/kenar, ekran yönünde). İç mekânlarda aynı sözleşme, oda sol/sağ duvarına göre. Tepe/eğik açı insertlerde `z` yerine masa üstü (x,y) px. Zemin noktası = `zemin(z,u)`; ayak ve baston ucu bu noktaya basar.

**Kamera notasyonu (Proto.tsx ile aynı).** `cs` ölçek, `cx/cy` px kayma. "Statik" = sabit; insertlerde hafif nefes (cs ±0.01) serbest.

**Ekran yazısı bantları (güvenli alan: üst 220, alt 420, yan 80 → kullanılabilir y 220–1500, x 80–1000).**
- ÜST-BANT: y 240–400, x 80–1000 (etiketler, yıllar). Font 64–72 px, kalın, en çok 2 satır.
- ALT-BANT: y 1290–1490 (replik altyazıları; üstte içerik yoğunsa etiketler). Proto.tsx `Altyazi` yerleşimiyle aynı.
- Önemli içerik (yüz, nesne, kule kolu) y 420–1290 arasında. İstisnalar planında yazılı.

**Seviye (foley, anlatım 0 dB ref).** YAKIN −2…−4, ORTA −5, GENİŞ −8 dB; müzik ~−18 dB. Foley temkinli (kullanıcı yüksek bulur).

**Geçiş sözlüğü.** SERT = sert kesme (+ses vurgusu/köprüsü); MATCH = şekil/renk/konum eşlemeli kesme; KÂĞIT = zaman atlaması kesmesi; SAME = aynı mekân sürekliliği. Fade/çapraz çözülme yok; hiçbir nesne fade ile kaybolmaz.

**Mekân sözlüğü (tasarımcıyla ortak ad).** 8 yeni mekân: BORSA, TOURS-KULUBE-IC, KULE-DIS, PARIS-AVLU, CATI-BORDEAUX, CATI-KATI, YATAK-ODASI, MAHKEME. Mevcut: HARITA, SOKAK-BORDEAUX (prototip Sokak, Paris ögeleri çıkarılmış). Varyant/özel: PARIS-MASA (TOURS-KULUBE-IC masa varyantı, P23), TOURS-KAPI (KULE-DIS'in Tours cephesi, P21), KANUN-INSERT (P20), MONTAJ-15 (ALTIN-MASA + TOURS-KULUBE-IC alt yarı, P15), WIFI-MORF (P22).

**Ses zamanı notu.** `zamanlama.json` yok. Anlatım kareleri tahmini (~2.5 kelime/sn). Foley kareleri **görüntüye** kilitlidir; ses kaydı gelince anlatım plan sınırında ve belirtilen nefes boşluklarına göre oturtulur, foley kaymaz.

**Tours kulübesi (genel kural).** İki pencere: (A) direk penceresi, arka duvar sağ, direk ve kolları pencerenin ~5 m dışında (halat hattı pencere dışından iner); (B) Paris yönü penceresi, sol duvar, uzak tepede önceki kule. Regülatör (minyatür T kollu) pencere tezgâhında. Tüm kule istasyonlarında aynı düzen (P11, P12, P13). Kule kolu **dokunuşu yalnız P01**; diğer planlarda kol hareketi hikâye mekaniğidir.

---

## 1. Plan özeti

| Plan | start–end (kare) | sn | Mekân | Tip | Dokunuş (dokunuslar.md) | Çıkış geçişi |
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
| P15 | 2328–2472 | 2.40 | MONTAJ-15 | chart | 1835 yaprağı | MATCH (memur) |
| P16 | 2472–2640 | 2.80 | YATAK-ODASI | character | eldiven düşer | SAME |
| P17 | 2640–2784 | 2.40 | YATAK-ODASI | character | kurutma kumu | SERT |
| P18 | 2784–2916 | 2.20 | MAHKEME | character | sarkaçlı saat TIK | SERT |
| P19 | 2916–3036 | 2.00 | MAHKEME | character | Louis eldiven giyer | KÂĞIT |
| P20 | 3036–3192 | 2.60 | KANUN-INSERT | document | güve | SERT |
| P21 | 3192–3324 | 2.20 | TOURS-KAPI | tower | sürgü düşer | MATCH (direk) |
| P22 | 3324–3468 | 2.40 | WIFI-MORF | kinetic | Wi-Fi morfu | SERT (karanlık) |
| P23 | 3468–3600 | 2.20 | PARIS-MASA | document | parmak kabartısı | LOOP→P01 |

Toplam 3600 kare = 60.00 sn. Senaryodan süre sapmaları (onaylı): P09 1.8→2.0, P10 2.4→2.2, P14 2.2→2.4, P15 2.6→2.4 sn.

---

## 2. Planlar

### P01 · kare 0–156 · TOURS-KULUBE-IC (masa varyantı) · KANCA
- **Kadraj/kamera:** Yakın plan, tepe-önden (~60° aşağı). Kamera eldivenle birlikte hafifçe yükselir: `cs 1.14→1.00, cy +40→0`. Masa tahtası, kahverengi paket kâğıdı, fener (amber). Pencere A kanca yazısının **altında**: x 560–1000, y 450–770 (~%17), kol silueti ≥%10.
- **Karakterler:** Memurun eli (zayıf, titrek, gri ceket kolu, sol el), x 300–620, y 1000–1350. Yüz yok.
- **Giriş/çıkış:** El kadraj sol-alt kenarından girer (kare açılırken zaten içeride).
- **Zaman çizelgesi (p+N):** 0 eldiven kâğıttan yarı çıkmış, el çekiyor (hareketin ortası; ilk kare okunur) · 0–54 eldiven yükselir, kâğıt sürtünür · **54 eldiven kâğıttan tamamen ayrılır; aynı karede** direkte kol "şak" B konumuna oturur · 60 kâğıt masaya geri yatar · 62–134 el eldiveni havada tutar, titreme sönümlenir, fener tozu (kapanış anı; kol B'de net, 1.7 sn) · 134–142 eldiveni masadaki ışık dairesine bırakır · 142–156 hareketsiz.
- **Temas (foley):** 0 (süren) kâğıt sürtünmesi (0–54) · **54** direk kolu "klak" (tiz, ahşap menteşe, −3) · 60 kâğıt masaya yatar · **140** eldiven masaya yumuşak "tap" (ORTA).
- **Süreklilik:** Kurulum → P08/P11/P17/P21/P22 (aynı direk, pencere A). Kol A = P23 son kare. Eldiven masada bırakılır.
- **Fizik:** Direk, binanın ek yapısı çatısında pencerenin ~5 m dışında; halat hattı pencere dışından iner (P11 regülatörüne bağlı). Kolu oynatan ikinci el kadraj dışında regülatörde (kancanın metaforu, fiziksel). Görünmeyen elin sesi yok; ses direk "klak".
- **Geçiş (çıkış):** SERT, eldiven "tap"ından 14 kare sonra.
- **Ekran yazısı:** "1834. Bilgisayar yok." ÜST-BANT, **f0'dan itibaren tam görünür** (kapak karesi), 0–156. Kapak ayrı (video dışı): "ELDİVENLE DEVLETİ HACKLEDİLER".
- **Anlatım:** "Bu eldiven, Fransız devletinin ağını hackledi." **Dokunuş:** kol "şak" (filmde yalnız burada).

### P02 · kare 156–360 · BORSA
- **Kadraj/kamera:** Geniş → orta, yavaş dolly-in: `cs 1.00→1.18, cy 0→−60`. Borsa salonu, öğle altın ışığı. Fiyat tahtası arkada üst-orta x 300–780, y 400–760 (başlık "PARIS · RENTE 3%"), katip platformda (z 5.5, u 0.50); tahta+katip kolu ~%22.
- **Karakterler:** François z 2.2, u 0.40 (lacivert frak, silindir; sağ eliyle Tüccar'ın omzunu tutar, gülerek konuşur). Tüccar z 2.2, u 0.24. Louis z 2.3, u 0.62 (bordo frak, gri şapka; defter+kalem; sağ göğüs cebinden beyaz eldiven köşesi görünür). Kalabalık 10–12 silindir şapkalı figür z 2–6, u 0.05–0.95. İsim etiketleri "FRANÇOIS" "LOUIS" başın 80 px üstünde (44 px).
- **Giriş/çıkış:** Hepsi kare açılırken içeride; kimse girip çıkmaz.
- **Zaman çizelgesi:** 0 dolly başlar · 30–88 katip rakam yazar (tebeşir cızırtısı) · **90 tebeşir kırılır** (beyaz toz asılı) · 90–114 parça platformdan düşer, iki sekme · 96–126 kalabalık tahtaya döner, **donar** (126–168) · Louis tüm plan boyunca yazar (kafası kalkmaz) · 176 katip yarım tebeşirle ilk çizgiyi çeker (kapanış) · 168–204 dolly biter.
- **Temas:** süren tebeşir cızırtısı (186–244) · **246 (p+90)** tebeşir "çıt" · **258 (p+102)** parça sekme-1 · **270 (p+114)** sekme-2 · **332 (p+176)** yarım tebeşir "cız" · kalem cızırtısı süren (156–360, kısık) · kalabalık uğultusu p+90–168 arası 0.5 sn kısılır.
- **Süreklilik:** Louis cep eldiven köşesi (kurulum → P19). François solda, Louis sağda. Tahta başlığı "PARIS" (540,430) → P03 Paris etiketi.
- **Fizik:** Katip yükseltilmiş platformda (merdiveni arkada görünür); tebeşir parçası platformdan zemine iki sekme, ayakların arasından geçmez. Ölçek derinlikle (z 5.5'te katip küçük).
- **Geçiş (çıkış):** MATCH. Dolly bitişinde "PARIS" (540,430); P03'te Paris etiketi aynı noktada.
- **Ekran yazısı:** "Oyun: Paris'teki tahvil fiyatı" ÜST-BANT, 162–354.
- **Anlatım:** "Bordeaux'lu kardeşler François ve Louis Blanc, devlet tahviline oynuyor." **Dokunuş:** tebeşir kırılması + Louis'nin soğukluğu (1.3 sn, tahta %22).

### P03 · kare 360–564 · HARITA
- **Kadraj/kamera:** Tepe harita. `cs 1.30`, p+0–132 `cy +300→−300` (Paris→Bordeaux tilt); p+132–170 araba+at'a yaklaşma `cs 1.30→2.40` (araba+at %11). Paris (540,430). Tours düğümü yol üzerinde küçük etiketli (kurulum → P07). Disk (gündüz güneş / gece ay, çap 200 px = %10) **sol kenar** x 80–280, y 340–540; sayaç diskin altında x 80–280, y 560–640.
- **Eylem:** Posta arabası (küçük fener) Paris→Bordeaux. **Üç gün-gece döngüsü**, her biri 0.7 sn (42 kare): p+6–48, 48–90, 90–132. Her gece harita %35 kararır, araba feneri yanar; gündüz söner. Tours düğümünü gün 2'de geçer (~p+60). p+132 araba Bordeaux'da durur, **toz yok**. p+132–180 kamera yaklaşır, at tek nefes verir (p+150), **başını öne bırakır** (p+150–180), hareket durur. p+180–204 hold (kapanış).
- **Karakter:** Yok (arabacı ikonu araba üstünde).
- **Temas:** **408 (p+48)** gün "tık" (sayaç 2) · **450 (p+90)** "tık" (sayaç 3) · **492 (p+132)** gün sonu "tık" + tekerlek/toynak durur · **510 (p+150)** at nefesi (horultu, tek) · süren: toynak kısık (366–492, GENİŞ).
- **Süreklilik:** Tours düğümü (→P07); araba/rota (→P05).
- **Fizik:** Araba rota boyunca yolda.
- **Geçiş (çıkış):** SERT (gündüz→gece, zaman atlaması). Ses köprüsü: at nefesi biter, P04 ıslak adım sesi girer.
- **Ekran yazısı:** "Paris → Bordeaux: 3 GÜN" ÜST-BANT, 366–558.
- **Anlatım:** "Fiyat Paris'te belirleniyor. Haber Bordeaux'ya üç günde geliyor." **Dokunuş:** gün-gece döngüsü + at yorgunluğu.

### P04 · kare 564–780 · SOKAK-BORDEAUX (gece)
- **Kadraj/kamera:** p+0–78 orta plan alçak açı `cs 1.00→1.04`. p+78–144 INSERT (kaldırım hizası, statik). p+144–216 orta plan push-in `cs 1.06→1.18, cx 0→+60, cy −20→−120` (François'ya). Sokak ucunda sis içinde Garonne gemi direkleri, ipe asılı réverbère, mavi ay + amber.
- **Karakterler (orta plan):** adımın ortasında kameraya yürürler. François z 2.9→2.3 (p+78) → 1.9 (p+144), u 0.52→0.46. Louis z 3.2→2.6 → 1.95, u 0.68→0.66; baston sağ elinde (kameraya dönükken ekranın SOLU). **Izgara:** z 2.2, u 0.58 (ekran ~(600,1465)), plan başından kaldırımda **görünür** (kurulum). Fare geniş planda yok; girişi insertte gösterilir.
- **Insert yeniden kadrajı:** proto FareInsert ızgarası (400,1446) ALT-BANT'a denk geliyor. Insert'te ızgara merkezi **(400, 1130)**, ufuk y 700; Louis'nin bordo paçası + baston ucu sağdan girer; ALT-BANT altyazıyla çakışma yok.
- **Giriş/çıkış:** Karakterler kare açılırken sokak ortasında (fade/sis girişi yok). Fare ızgaradan çıkar ve aynı ızgaraya girer.
- **Zaman çizelgesi:** 4–74 "Herkesten önce bilen" (dudak senkronu, yürürken) · **78 kesme: insert** (yürüyüş sürerken; her şey durur, müzik 1.1 sn sessiz) · 78–87 boş ızgara, paça yaklaşır · **87–96 fare ızgaradan çıkar** · 96–106 başını kaldırıp devlere bakar · 100–108 baston üstten iner · **108 TAK** (Louis bakmadan vurur) · 110 fare irkilme zıplaması · 112–130 döner, ızgaraya dalar · **138 kuyruk ucu kaybolur "tink"** (kapanış) · 138–144 boş ızgara · **144 kesme: orta plan** · 144–162 François şapkasını kaldırır (şapka elinde yukarıda kalır) · 146–176 "kazanır" · 150 Louis durur, baston ucu taşa · 156–180 sessiz bakış · **180–198 göz kırpma** (oyunculuk, sıkışırsa ilk o kısalır) · 198–216 sırıtış (kapanış).
- **Temas:** adımlar `yuru()` fazından (ADIM olayı, ~564+6, +20, +34, +48, +62, +72) · **651 (p+87)** fare pençesi ızgara demirine tıkırtı · **662 (p+98)** Louis'nin çizmesi taşa (insert) · **672 (p+108)** baston ucu taşa "TAK" (YAKIN −2) · **674 (p+110)** fare irkilme, pençe "tık" · **690 (p+126)** fare kafese dalış tıngırtısı · **702 (p+138)** kuyruk ucu "tink" · **714 (p+150)** Louis durur, baston ucu "tık" · 744 (p+180) göz kırpma sessiz.
- **Süreklilik:** Izgara p+0'dan kurulu; fare girişi insertte. Şapka kalkık elde biter. Louis cep eldiven köşesi (P02 ile aynı).
- **Fizik:** Baston ucu yüksekliği `zemin(z,u).y`, taşa gömülmez. Fare ızgaranın içinde tam kaybolur. Louis ızgaranın üstüne basmaz, yanından geçer. Cut yürüyüş döngüsü sürerken (tek seferlik hareket kesilmiyor).
- **Geçiş (çıkış):** SERT, sırıtıştan sonra.
- **Ekran yazısı:** Altyazı (François) ALT-BANT, "FRANÇOIS" etiketi, "Herkesten önce bilen… kazanır." 568–760.
- **Anlatım:** FRANÇOIS (alçak, sinsi); "..." duraklaması insert. **Dokunuş:** baston–fare (tek). Müzik: insert 1.1 sn sessiz (senaryoda 0.3 sn'ydi; kurgucu bilsin).

### P05 · kare 780–996 · HARITA
- **Kadraj/kamera:** P03'ün **başlangıç kadrajı** (Paris üstte, Bordeaux altta), `cs 1.30, cy +300→+220`. Mühür merkezi (540,880), çap ~300 px (%16).
- **Eylem:** A) p+24–108: ışık sinyali Paris'ten çıkar, 9 kule ikonu sırayla kol çevirir (aralıklar kısalır), sinyal p+64'te posta arabasını **sollar** (araba geride küçük ve yavaş kalır; rüzgâr/toz yok). B) p+132–150 kırmızı devlet mührü iner, **p+150 tok**, balmumu kenarlara taşar (150–174), hat Paris→Bordeaux kırmızıya boyanır (156–190), 190–216 hold (kapanış). Araba p+146'da kırmızı hattın önünde durur.
- **Temas:** 780 araba tekerleği kısık · kule klakları **804, 820, 834, 846, 856, 864, 871, 877, 882** (p+24,40,54,66,76,84,91,97,102) · **844 (p+64)** sinyal sollama whoosh · **926 (p+146)** araba durur · **930 (p+150)** mühür "tok" (YAKIN −3) · 930–954 balmumu taşma yumuşak "squelch".
- **Süreklilik:** Mühür tasarımı → P21 ilanı. Kule ikonları P03 hattı üzerinde.
- **Fizik:** Mühür harita yüzeyine düşer; sinyal hattı rota boyunca.
- **Geçiş (çıkış):** MATCH. Mühür (540,880) → P06'da doğan güneş diski aynı noktada, aynı çap.
- **Ekran yazısı:** "Telgraf: BİRKAÇ SAAT · halka kapalı" ÜST-BANT, 786–990.
- **Anlatım:** "Devletin telgrafı ise birkaç saatte getiriyor. Ama sadece devlete." **Dokunuş:** sollama (A) ve mühür (B).

### P06 · kare 996–1128 · CATI-BORDEAUX (şafak)
- **Kadraj/kamera:** p+0–44 orta `cs 1.00→1.06`. p+44–104 INSERT sol ön kol + tüy (%20, tüy ≥%10), statik. p+104–132 orta, statik.
- **Çatı kimliği:** Arduvaz çatı, baca kümeleri, çinko oluklu yürüme terası (taş korkuluk). Arkada çatı katı penceresi (dormer, soldan 2., açık; P14 ile eşleşir). Sağ ufukta uzak tepede Chappe kule silueti (kurulum → P14). Güneş doğuyor.
- **Karakterler:** Louis z 2.0, u 0.45 (teras üstünde, dormer'in yanında). Sol elinde açık cep saati (sahne elemanı), baston **taş korkuluğa dayalı** (kafesin solunda). Kafes korkuluk üstünde z 2.3, u 0.62.
- **Giriş/çıkış:** Louis dormer'den çıkmış (kare açılırken terasta). Güvercin kafesten çıkıp kadrajın sağ-üstünden çıkar (p+40).
- **Zaman çizelgesi:** 0–10 sağ eliyle kafes kapağını açar · 14 güvercin iter, kanat · **16 tek tüy kopar**, salınarak Louis'nin **bordo sol önkoluna** süzülür (16–40) · 40 güvercin kadrajdan çıkar · **40 tüy kola konar** · 44 **insert**: tüy kolda (0.8 sn+) · 56–80 Louis gökyüzüne bakar (kadraj dışı bakış, kol sabit) · **84 sağ işaret parmağıyla fiske**, tüy yukarı savrulur, kadrajdan çıkar (84–104) · 104 **orta plan**: Louis boş gökyüzüne bakar · **120 saat kapağı çat** · 120–132 hold (kapanış).
- **Temas:** 1000–1006 kafes menteşe gıcırtısı · **1006 (p+10)** kapak korkuluğa "tık" · **1010 (p+14)** güvercin kafes tabanı "pat", kanat 1010–1038 · **1036 (p+40)** tüy kumaşa (çok hafif, −8) · **1080 (p+84)** fiske (YAKIN −5) · **1116 (p+120)** saat kapağı "çat".
- **Süreklilik:** Tüy orta planda kola konarak kurulur (insert karşılığı). Güneş diski (→P05 mühür). Dormer + uzak kule (→P14). Louis cep eldiven köşesi.
- **Fizik:** Güvercin kanat çırparak çıkar. Louis terasta durur, eğimli çatıya basmaz.
- **Geçiş (çıkış):** SERT, bakış sonunda (turuncu gökyüzü → Tours mum).
- **Ekran yazısı:** "Plan A: Güvercin — başarısız" ÜST-BANT, 1002–1122.
- **Anlatım:** "Önce güvercin denediler. ...Olmadı." (fiske "Olmadı" ile). **Dokunuş:** tüy + fiske.

### P07 · kare 1128–1284 · TOURS-KULUBE-IC (gece)
- **Kadraj/kamera:** Orta plan profil. Louis'ten müdüre pan `cs 1.00→1.08, cx +10→+110`, **p+98'de durur**. Tek mum masada. Çekmece ön yüzü alt-orta y 1250–1400 (%12).
- **Karakterler:** Louis z 2.0, u 0.22 (baston masa kenarına dayalı sağ yanında; önünde **iki** altın kesesi). Müdür z 2.0, u 0.60 (yaşlı, iri, koyu yelek, oturmuş). Memur z 2.8, u 0.78 (zayıf, gri ceket, şapkasız, müdürün arkasında, bir adım geride). François z 3.4, u 0.08 (kapı aralığında gölgede, gülümser).
- **Giriş/çıkış:** Kapı arka duvar solda; pencere A arka duvar sağda (direk sabit B). Kimse girip çıkmaz.
- **Zaman çizelgesi:** çekmece **plan başında yarı açık (kurulum)** · 6–40 Louis bir keseyi müdüre kaydırır · 30–52 müdür uzanır · 54 kese avucunda · 62 sikkeler masaya dökülür · 76–90 müdür kolunu süpürür, sikkeler çekmeceye · **98 çekmece BAM**, kamera durur (hold 98–156, çekmece %12, ~1 sn+) · **102 memur çekmece çarpınca göz kırpar** (yalnız göz) · François kapıda gülümsemeye devam (kapanış).
- **Temas:** 1134–1168 kese sürtünmesi · **1168 (p+40)** kese durur "tok" · **1190 (p+62)** sikkeler "şıngır" · **1216 (p+88)** sikkeler çekmeceye · **1226 (p+98)** çekmece "BAM" (YAKIN −2).
- **Süreklilik:** İkinci kese Louis'nin dirseğinde (→P08). Mum (→P08). Pencere A direği (→P08). Baston konumu (→P14, P18).
- **Fizik:** Masa ayakları zeminde; müdür sandalyede ayakları zeminde; çekmece masa içine girer.
- **Geçiş (çıkış):** SAME (aynı oda, yakın plana omuz üstü); çekmece sesinden sonra 0.3 sn sessizlik.
- **Ekran yazısı:** "Plan B: Rüşvet · Tours" ÜST-BANT, 1134–1278.
- **Anlatım:** "Sonra Tours istasyonunda iki memuru satın aldılar." **Dokunuş:** müdürün çekmeceyi çarpması + memurun göz kırpması.

### P08 · kare 1284–1440 · TOURS-KULUBE-IC
- **Kadraj/kamera:** Yakın plan. p+0–60 Louis yüzü (memurun omzu üzerinden, hafif alçak); p+60–156 ters açı: Louis'nin omzu sol-önde bulanık, memurun yüzü sert mum ışığında (alttan), **memurun sağ eli masada alt kadranda** (y 1050–1250), duvarda gölge (sol-üst, x 100–520, y 430–860, %22). Pencere A (direk **statik**) sağda. `cs 1.00→1.06`.
- **Karakterler:** Louis z 1.5, u 0.30 (öne eğilir p+0–20; yüzü ifadesiz; baston sağ yanında masaya dayalı, sapı kadraj kenarında). Memur z 1.7, u 0.62 (gri ceket).
- **Zaman çizelgesi:** 0–20 Louis öne eğilir · 6–48 "Tek bir hata." (dudak senkronu), 50–60 "Fazlası..." · **60 kesme**: memur · 60–72 Louis'nin eli **ikinci keseyi** kadraja sokup memurun önüne kaydırır, durur · "değil." biter p+84 · 72–100 memurun gözü kese ↔ pencere, **Louis kıpırdamaz** · **102, 117, 132 memurun sağ eli masada kol çevirir gibi üç kez tıklar** (parmak ucu/başparmak); mumun alttan ışığıyla duvardaki gölge **T biçimli kol silueti** verir · 132–156 hold (gölge sabit, kapanış).
- **Temas:** **1356 (p+72)** kese masaya kayıp durur "tok" · **1386 (p+102), 1401 (p+117), 1416 (p+132)** parmak "tık" ×3 (−6) · mum cızırtısı ortam −12.
- **Süreklilik:** İkinci kese P07'de masadaydı. Direk A statik, B konumunda. Memur gri ceket, şapkasız, sol göğüs cebinde beyaz eldiven köşesi (→P15, P16).
- **Fizik:** Gölge ışık kaynağının (mum, alt-ön) tersine, duvarda yukarı-arkaya düşer; el masa yüzeyinde, parmak masaya basar.
- **Geçiş (çıkış):** SERT + ses vurgusu (sessizlik → Paris gündüz).
- **Ekran yazısı:** Altyazı (Louis) ALT-BANT, "LOUIS" etiketi, 1294–1414.
- **Anlatım:** LOUIS (düz, soğuk). **Dokunuş:** el–gölge. Kule/pencere kolu **yok**.

### P09 · kare 1440–1560 · PARIS-AVLU (gündüz)
- **Kadraj/kamera:** Orta plan, hafif alçak açı (adamın başı kadrajın üstünde kesik, **yüzü görünmez**). `cs 1.00→1.05, cx 0→+30`. Sağda "TOURS" etiketli posta arabası (etiket 380x110 px). Paket+çizme ~%18.
- **Karakterler:** Paris adamı z 1.6, u 0.28 (koyu redingot, **gri manşet, sağ manşette tek altın düğme**). Arabacı z 2.2, u 0.80 (kutu üstünde, **plan başından kadrajda**, sağ ayağı ön korkuluğunda = kurulum). Araba z 2.2, u 0.62.
- **Giriş/çıkış:** Avlu kapısı arkada (kullanılmaz).
- **Zaman çizelgesi:** 0–24 eller paketi kaldırır · **24 fırlatma** · 24–46 yay · **46 arabanın tepesine iner** · 48–64 kayar, düşmek üzere · **66 arabacı çizmesinin topuğuyla durdurur**, paket oturur (net 1.1 sn: 30–102) · 84 gri manşet düzeltilir (kapanış) · 84–120 hold.
- **Temas:** **1464 (p+24)** "huf" · **1486 (p+46)** paket tepeye "tok" · 1488–1504 sürtünme · **1506 (p+66)** çizme "tap" (−3) · 1524 (p+84) manşet kumaşı.
- **Süreklilik:** Paket kahverengi kâğıt + kenevir ip + "TOURS" etiketi (→P10). Gri manşet + düğme (→P23).
- **Fizik:** Paket araba tepesindeki bagaj çıtası içinde kayar; çizme ön korkuluğa dayalı, gömülmez.
- **Geçiş (çıkış):** MATCH (kahverengi paket → masadaki paket).
- **Ekran yazısı:** "Şifre: bir posta paketi" ÜST-BANT, 1446–1554.
- **Anlatım:** "Paris'ten Tours'a paket geliyor." **Dokunuş:** kayan paket + arabacının çizmesi.

### P10 · kare 1560–1692 · TOURS-KULUBE-IC (masa üstü, 55° eğik açı)
- **Kadraj/kamera:** Eğik tepe-önden (~55°), `cs 1.00→1.04` (çorap sarkması okunabilsin). Masada iki açık paket: sol (x 140–500) eldiven + yeşil ↑ etiketi; sağ (x 580–940) koyu yün çorap + kırmızı ↓ etiketi. Fener amber.
- **Karakterler:** Memurun eli (gri ceket kolu, P01'deki aynı el) kadraj alt kenarından girer. Yüz yok.
- **Zaman çizelgesi:** 8–28 yeşil ok etiketi yukarı zıplar, **eldiven kımıldamaz** · 20–36 el girer · **36–52 el sağ paketten çorabı uçtan kaldırır** · 52–88 çorap kendi ağırlığıyla sarkar ve uzar (pörsümüş), **kırmızı ok ↓ aynı anda iner (64–88)** · çorap sarkıtı ekranın %30'u (~576 px), net 1.4 sn · **104 el çorabı bırakır** (masaya flop) · 104–132 el çekilir (kadrajdan alt kenara çıkar), kapanış.
- **Temas:** **1572 (p+12)** yeşil etiket zıplar, kâğıt hışırtısı · **1596 (p+36)** el çorabı kaldırır (yün sürtünmesi) · **1624 (p+64)** kırmızı etiket iner (kâğıt) · **1648 (p+88)** çorap tam sarkıtta uzar (yün gerilmesi, −6) · **1664 (p+104)** çorap masaya "flop".
- **Süreklilik:** Paket kâğıdı + "TOURS" etiketi P09'dan. Eldiven P01 eldiveniyle aynı model (P10'da kaldırılmıyor; P19 ile karışmasın).
- **Fizik:** Etiket ipi çorap bileğine bağlı (görünür); çorap elde askıda yerçekimine uyar; masa kenarına değmez.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "ELDİVEN = ↑ · ÇORAP = ↓" ÜST-BANT, 1566–1686.
- **Anlatım:** "Eldiven: yükseliş. Çorap: düşüş." **Dokunuş:** sarkan çorap (memurun eylemine bağlı).

### P11 · kare 1692–1884 · TOURS-KULUBE-IC → INSERT
- **Kadraj/kamera:** p+0–64 orta plan, gündüz soğuk ışık `cs 1.00→1.04`. p+64–192 INSERT 45° aşağı: regülatör sapı + eller + çene üstte; sap+damla ekranın %25'i. `cs 1.00→1.06`.
- **Karakterler:** Memur z 1.8, u 0.50 (profil, sağa dönük, gri ceket, şapkasız, şakağı terli). Regülatör pencere tezgâhında. Pencere B'de uzak kule (≥100 px, kolları görünür).
- **Zaman çizelgesi:** 10–24 iki eliyle sapı kavrar · 24–52 pencere B'deki önceki kuleye bakar · 52–62 bakış iner · **64 kesme: insert** · 72–84 sap iki konum (tık, tık) · **96 fazladan çentik TIK**, kırmızı halo (bilgi, 96–170) · 90–120 çenede damla oluşur · 120–132 düşer · **132 sapa "tıp"** (sapta bir an parlar, kayar 132–160) · 150, 166 tık, tık devam · 170–192 sap yeni konumda durur (kapanış).
- **Temas:** **1704 (p+12)** eller sapa "tak" · **1764 (p+72)** tık · **1776 (p+84)** tık · **1788 (p+96)** TIK (sert) · **1824 (p+132)** damla "tıp" (−3) · **1842 (p+150)** tık · **1858 (p+166)** tık. Müzik 1788–1832 arası **kısılır** (kesilmez).
- **Süreklilik:** Regülatör düzeni (→P12, P13). Çentik konumu X (→P12, P13, P14). Ter damlası filmde yalnız burada.
- **Fizik:** Memur sapı iki elle kavrar; damla çeneden sapa düşer (insertte mesafe görünür).
- **Geçiş (çıkış):** MATCH. Kırmızı halo → P12 dürbün maskesi (merkez (540,950), çap ~860).
- **Ekran yazısı:** "Resmî mesaj + gizli bir "hata"" ÜST-BANT, 1698–1878.
- **Anlatım:** "Memur, resmî mesajın içine küçük bir hata gizliyor." **Dokunuş:** ter damlası.

### P12 · kare 1884–2028 · KULE-DIS (ara kule, gündüz)
- **Kadraj/kamera:** p+0–24 orta-yakın (dışarıdan, kulübe penceresi, telgrafçı bel üstü). p+24–70 dürbün POV, **dairesel maske** (merkez (540,950), çap ~860; maske yalnız burada). p+70–144 aşırı yakın göz/kaş (göz y 520–820, kaş yayı y 400–520, üst yarı).
- **Karakterler:** Telgrafçı (kısa, tombul, kahve resmî frak, bıyık, şapkasız) kulübe penceresinde z 1.5, u 0.50. Dürbün = tek tüplü pirinç teleskop (dönem). POV'da Tours kulesi (uzak, kol X, ≥300 px).
- **Giriş/çıkış:** Telgrafçı penceredeki yerinde; dürbünü kaldırırken görülür (kurulum).
- **Zaman çizelgesi:** 0–24 dürbünü gözüne kaldırır · 24 POV · 40 odak halkası, kule net · 70 ters açı, göz kısılır (70–90) · **94–126 tek kaş yavaşça kalkar** · 126–144 hold (kapanış).
- **Temas:** **1906 (p+22)** dürbün gözüne "tık" · **1924 (p+40)** odak halkası "kırt" (−6) · rüzgâr −14. Anlatım p+6–96; **0.5 sn tam sessizlik p+100–130 (müzik de susar)**.
- **Süreklilik:** Telgrafçı P13'te aynı kişi. POV'daki kol X = P11 çentik konumu.
- **Fizik:** POV'da kule 8–10 km uzakta, hava perspektifiyle düşük kontrast, kol silueti okunur.
- **Geçiş (çıkış):** SERT (kaş inince müzik geri gelir).
- **Ekran yazısı:** "Ya fark ederse?" **ALT-BANT** (üst yarıyı kaş dolduruyor), 1980–2022.
- **Anlatım:** "Her kulede iki dürbün var." **Dokunuş:** kaş. (Senaryodan sapma: 24 karelik giriş, Bölüm 4.)

### P13 · kare 2028–2184 · KULE-DIS
- **Kadraj/kamera:** Orta plan, dışarıdan. p+0–60 `cs 1.25`; p+60–130 geri çekilme `cs 1.25→0.80, cy +60→−120`. Üstte telgrafçının **kendi direği**, ufukta sıradaki kule. Yüz ≥%15 (esnemede 300+ px).
- **Karakterler:** Telgrafçı z 1.5, u 0.50.
- **Zaman çizelgesi:** 0–14 dürbünü indirir, tezgâha koyar · 14–30 omuz silker · 30–66 kolu çevirir, **esner (36–66)** · **68 kendi direği "klak", çentik X'i kopyalar** · 60–130 kamera geri çekilir · **114 ufuktaki kule kopyalar** · 130–156 hold.
- **Temas:** **2038 (p+10)** dürbün tezgâha "tok" · 2062–2094 kol cırcırı · **2096 (p+68)** direk "klak" · **2142 (p+114)** ufuk kule uzaktan "klak" (GENİŞ −10, yankı).
- **Süreklilik:** Kopyalanan konum X. Ufuk kulesi → P14 Bordeaux kulesi.
- **Fizik:** Kamera dışarıda geri çekilir, duvarın içinden geçmez.
- **Geçiş (çıkış):** MATCH (ufuk kulesi siluet çizgisi → P14'te dürbünle görülen kule aynı çizgi).
- **Ekran yazısı:** "Kimse durdurmadı. Herkes kopyaladı." ÜST-BANT, 2034–2178.
- **Anlatım:** "Ama devletin adamları hatayı aynen kopyalıyor." **Dokunuş:** esneme (yüz %18).

### P14 · kare 2184–2328 · CATI-KATI (144 kare, 2.4 sn)
- **Kadraj/kamera:** Omuz üstü, **maskesiz**, odak kayması **tüm kadrajda** (kullanıcı kararı). `cs 1.00→1.05`. Pencere (dormer, içeriden) x 380–900, y 380–1000. Alt-sol kadranda pervaz+bıçak (x 80–620, y 1000–1290, %22). Pervaz **onlarca eski çentikle dolu** (plan başından görünür = "iki yıl" kurulumu).
- **Karakterler:** Suç ortağı z 1.5, u 0.30 (sırtı yarı kameraya, koyu kahve redingot, basık kasket, tek tüplü teleskop). Louis arka planda masada z 3.0, u 0.78 (bordo frak, gri şapka masada, baston masaya dayalı, bekler; bulanık).
- **Giriş/çıkış:** Dormer açık; kimse girmez/çıkmaz.
- **Zaman çizelgesi:** 0–54 odak **yakın** (pervaz, bıçak, omuz net; kule bulanık) · 10–40 suç ortağı dürbünü gözünden indirmiş, **bıçağıyla pervaza bir çentik daha atar** (dokunuş) · 40–54 dürbünü kaldırır, pervaza dayar · **54–78 odak kayması, kule net** · **78–138 kule net (60 kare = 1.0 sn)** · **90 uzak kule kolu çentik X'e "klak"** (seçilir) · **128 teleskopu tek hamlede kapatır "şlak"** (kule net penceresi 78–128 + kapanış jesti; net 1 sn: 78–138 aralığında kule sahnesi görünür) · 128–144 odak Louis'ye döner, hold (kapanış).
- **Temas:** **2214 (p+30)** bıçak "kırt" (−4) · **2238 (p+54)** teleskop pervaza "tık" · 2238–2262 odak halkası · **2274 (p+90)** uzak kule "klak" (GENİŞ −8) · **2312 (p+128)** teleskop kapanır "şlak" (YAKIN).
- **Süreklilik:** Dormer + kule P06 çatı dışıyla eşleşir (soldan 2. dormer). Louis bastonu masada. Kol X (P11→P12→P13→P14).
- **Fizik:** Teleskop pervaza dayanır, çerçeveden geçmez; kule uzak, ölçek derin.
- **Geçiş (çıkış):** SERT (zaman atlaması "iki yıl"; ses köprüsü şlak → takvim yırtılması).
- **Ekran yazısı:** "Dürbünün ucunda: Bordeaux" ÜST-BANT, 2190–2322.
- **Anlatım:** "Bordeaux'da bir suç ortağı bekliyor." **Dokunuş:** pervaza çentik kazıma. Odak kayması kamera aracı (kullanıcı kararı). Net kule süresi 1.0 sn (12 kare P15'ten alınarak sağlandı).

### P15 · kare 2328–2472 · MONTAJ-15 (144 kare, 2.4 sn)
- **Kadraj/kamera:** Dikey ikiye bölünmüş, ayraç ahşap kiriş y 948–972, `cs 1.00→1.04`. ÜST (ALTIN-MASA, sıcak, y 220–948): sol Louis'nin defteri (x 120–520, y 700–900), altın yığını (x 380–620, y 780–930), sağ François'nın kadeh tutan eli (x 640–900, y 560–800), sağ-üst takvim bloğu (x 700–960, y 330–600). ALT (TOURS-KULUBE-IC, soğuk, y 972–1500): memur masa başında, elinde **buruşuk beyaz eldiven**, her öksürükte biraz çöker.
- **Eylem (12 kare kısaltıldı, hold payı azaldı):** 6–36 üç sikke yığına düşer · 20–70 François kadeh kaldırır, bırakır (70) · **40–54 "1835" yaprağı** (diğerlerinden büyük, krem, ~210 px) kopar · 54–110 yaprak ayracın **önünden** alt yarıya süzülür · **112 memurun omzuna konar**, omuz hafifçe çöker · 118–132 takvimde "1836" · 52, 124 öksürük · 132–144 hold.
- **Temas:** **2336, 2344, 2354** (p+8,16,26) sikke "şıngır" · **2370 (p+42)** takvim yırtılması · **2380 (p+52)** öksürük · **2398 (p+70)** kadeh masaya "tık" · **2440 (p+112)** yaprak omza (kâğıt, çok yumuşak) · **2452 (p+124)** öksürük.
- **Süreklilik:** Memur gri ceket, eldiven elinde (kurulum → P16). Ter damlası yok (yalnız P11).
- **Fizik:** İki yarı tek ahşap çerçevenin iki penceresi; yaprak ayracın önünden geçer. Yaprak kâğıt gibi salınır.
- **Geçiş (çıkış):** MATCH (memur omuz silueti → P16 yatakta aynı omuz açısı).
- **Ekran yazısı:** "1834 → 1836" ÜST-BANT, 2334–2466.
- **Anlatım:** "İki yıl boyunca... herkesten önce bildiler." **Dokunuş:** 1835 yaprağı.

### P16 · kare 2472–2640 · YATAK-ODASI (gece)
- **Kadraj/kamera:** p+0–60 orta push-in `cs 1.00→1.10`. p+60–168 INSERT yer seviyesi, eldiven ≥%18, `cs 1.00→1.12`.
- **Oda kimliği:** Taşra odası (tuffeau duvar, ahşap kiriş), demir yatak, saman şilte, mum soldaki komodinde, pencere A tipi (soğuk mavi) sağ-arka, uzakta kule, kapı arka-sol. Sandalyede **koyu figür silüeti** (u 0.85, z 2.8), önünde küçük yazı sehpası (kâğıt, hokka, kum kutusu; kurulum → P17). Memurun gri ceketi duvardaki askıda.
- **Karakterler:** Memur yatakta z 2.2, u 0.45, gömlek, solgun, terli (damla yok); sağ elinde **buruşuk beyaz eldiven plan başından** (kurulum).
- **Zaman çizelgesi:** 0–48 nefes, pencerede uzak kule · **48–72 el yorgunluktan gevşer** · **60 kesme: insert** · 84 eldiven parmak parmak kayar · 98 yatak kenarından aşağı · 98–114 düşer · **114 tahtaya "tok"** · 120 küçük sekme · 120–168 parmaklar yarı açık yatar (kapanış). Müzik tek uzun nota.
- **Temas:** nefes süren (−8) · **2556 (p+84)** eldiven kumaşta kayar · **2586 (p+114)** eldiven tahta zemine (YAKIN −4, yumuşak) · **2592 (p+120)** minik sekme.
- **Süreklilik:** Eldiven P15'te elde kurulu. Pencere kule (→P17). Sandalye silüeti + sehpa (→P17).
- **Fizik:** Yorgan yatak kenarına eğik; eldiven kenardan yere düşer, yatak ayağına çarpmaz; zemin döşeme tahtası.
- **Geçiş (çıkış):** SAME.
- **Ekran yazısı:** "1836 · İçeriden biri" ÜST-BANT, 2478–2634.
- **Anlatım:** "Ta ki bir memur ağır hastalanana kadar." **Dokunuş:** gevşeyen elden eldivenin düşmesi.

### P17 · kare 2640–2784 · YATAK-ODASI
- **Kadraj/kamera:** Yakın plan, memurun yüzü sol-üst (y 520–1100, 3/4). **Alt-sağda eller** (x 560–1000, y 1000–1250, ~%13): kimliksiz kişinin **sadece siyah kollu eli**. Pencerede uzak kule **statik**, dinlenme konumunda (x 640–960, y 300–620). `cs 1.00→1.05`.
- **Eylem:** 0–20 başını yastıkta dinleyiciye çevirir · 10–60 fısıltı "Eldiven... çorap..." (dudak); el kâğıda yazar (0–70) · 66–108 anlatıcı "Ve anlattı." · **84–110 fısıltı bitince yazılan sayfaya kurutma kumu serpilir** · 126–144 tam sessizlik (0.3 sn); memur gözlerini kapatır (kapanış).
- **Temas:** **2648 (p+8)** yastık hışırtısı · kalem cızırtısı süren (2640–2710, −8) · **2724 (p+84)** kum serpme (−5, süren 2724–2760) · fısıltı foley kanalında.
- **Süreklilik:** Dinleyici P16 sandalye silüeti ve sehpa. Kule kolları dinlenme (→P21, P22).
- **Fizik:** Kum serpme eli yazıdan ~10 cm yükseklikte, kum kâğıda düşer.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** Altyazı (Memur) "Eldiven… çorap…" ALT-BANT, 2660–2706.
- **Anlatım:** MEMUR (fısıltı, kırık) + ANLATICI. **Dokunuş:** kum serpme.

### P18 · kare 2784–2916 · MAHKEME
- **Kadraj/kamera:** Geniş, alçak açı, push-in `cs 1.00→1.12`. Kürsü orta-üst; **sarkaçlı duvar saati** x 760–960, y 470–680 (≥%11, ~210 px, huzme üstünde). Jüri sol, halk arka. Çapraz toz huzmeleri.
- **Karakterler:** Başkan yargıç z 5.0, u 0.50 (kürsüde tokmak, kurulum → P19), iki yargıç yanında. Sanık sırasında **arkadan** François (lacivert) z 2.4, u 0.34 (ekran solu), Louis (bordo) z 2.4, u 0.52; şapkalar dizlerinde; baston sıraya dayalı sağ yanında (u 0.58).
- **Giriş/çıkış:** Yargıç kürsüye oturur (p+60); kimse girip çıkmaz.
- **Zaman çizelgesi:** 4–96 "bin sekiz yüz otuz yedi. Mahkeme." · **60 yargıç oturur** (sandalye gıcırtısı) · **96 salon uğultusu aniden keser** · 96–132 sessizlik 0.6 sn, sarkaç salınır · **108 dakika ibresi tek sert TIK ile bir çentik atlar** · 108–132 hold (kapanış).
- **Temas:** **2844 (p+60)** sandalye gıcırtısı (−5) · uğultu kesilir (2880) · **2892 (p+108)** saat "TIK" (yankılı, −2).
- **Süreklilik:** Sanık sırasında kamera kürsüye bakarken François ekran solu; P19 ters açıda **Louis ekran solu**. Louis cep eldiven ucu görünür olmalı (sırttan görünmüyorsa omuz/yan kesitten). Tokmak kürsüde.
- **Fizik:** Huzmeler pencerelerden zemine çapraz; gölgeler ışığın tersine. Saat duvarda asılı, sarkaç görünür.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Tours Ağır Ceza · Mart 1837" ÜST-BANT, 2790–2910.
- **Anlatım:** "1837. Mahkeme." **Dokunuş:** saat TIK (yargıcın oturması sebep, sessizlik sonuç).

### P19 · kare 2916–3036 · MAHKEME
- **Kadraj/kamera:** p+0–26 INSERT tokmak (aşırı yakın, statik). p+26–52 orta plan sanık sırası, **ters açı** (kamera sanıklara bakar). p+52–120 INSERT eller (%20+, ≥1.1 sn net).
- **Karakterler:** Sanık sırası önden: **Louis ekran solu** z 2.0, u 0.34; **François ekran sağı** z 2.0, u 0.62; şapkalar dizde.
- **Zaman çizelgesi:** 0–9 tokmak iner · **9 TAK** + "BERAAT" yazısı aynı karede **belirir** (smash-cut, damga animasyonu yok) · 26 kesme · 30–60 François'nın gülümsemesi yayılır (0.5 sn) · 38–50 Louis sağ elini cebine sokup beyaz eldivenleri çıkarır · **52 insert** · 54–70 sol eldiveni giyer · **72–104 sağ eldiveni parmak parmak giyer** · **108 bilek düğmesi** · 108–120 eller kenetli (kapanış).
- **Temas:** **2925 (p+9)** tokmak "TAK" + kısa reverb (−2) · **2960 (p+44)** cep kumaşı · **2982 (p+66)** sol eldiven bilek gerilmesi · **2994, 3001, 3008, 3015** (p+78,85,92,99) sağ eldiven parmak gerilmeleri (deri/keten, −5) · **3024 (p+108)** bilek düğmesi "çıt".
- **Süreklilik:** Louis eldivenleri sağ göğüs cebinden (P02, P04, P06 cep köşesi ile kurulu; P18'de görünür). Tokmak P18'de kürsüde. Louis sol, François sağ (ters açı).
- **Fizik:** Tokmak yuvarlak ahşap tabana iner; eldiven parmakları el boyuna uyar.
- **Geçiş (çıkış):** KÂĞIT (eller kenetlenir → P20 sayfa).
- **Ekran yazısı:** "BERAAT" **ALT-BANT**, 2925–3012, kırmızı mürekkep, −4° dönük, 180 px, animasyonsuz; iki kadrajda aynı yerde.
- **Anlatım:** "Beraat." **Dokunuş:** Louis'nin eldiven giymesi (şifre: yükseliş).

### P20 · kare 3036–3192 · KANUN-INSERT
- **Kadraj/kamera:** Tepe açı insert, kitap x 140–940, y 480–1300, `cs 1.00→1.05`. Yargıç eli siyah cübbe kollu. Pencere huzmesi sayfaya düşer.
- **Eylem:** 0–70 yargıç sayfaları hızla çevirir (6 çevirme) · 72 ilgili bölüm bomboş, parmak sayfaya basar · **p+0'dan cilt oluğunda kanatları kapalı güve (~110 px)** · **100 kanatlarını açar** (~220 px, genişlik %20, ışık huzmesinde silüet parlar) · 108–150 kitabın ortasından kalkar, üst-sağdan çıkar · 150–156 sayfa yatışır (kapanış). Yargıç güveyi kovalamaz.
- **Temas:** **3042, 3050, 3058, 3066, 3074, 3082** sayfa "fışt" (p+6…46) · **3108 (p+72)** parmak sayfaya · **3136 (p+100)** kanat açma (çok hafif) · 3144–3186 kanat pırpırı (−8).
- **Süreklilik:** Güve p+0'dan görünür (kurulum). Yargıç cübbesi P18 ile aynı.
- **Geçiş (çıkış):** SERT.
- **Ekran yazısı:** "Suç yok. Çünkü yasa yok." ÜST-BANT, 3042–3186.
- **Anlatım:** "Çünkü bunu suç sayan bir yasa yoktu." **Dokunuş:** güve.

### P21 · kare 3192–3324 · TOURS-KAPI (gündüz)
- **Kadraj/kamera:** Orta plan, kapı x 320–760, y 700–1400; ilan x 420–660, y 800–1100 (%16), direk kapı üstü x 380–700, y 330–700 (kollar **dinlenme**). Kamera son vuruşta sürgüye **yavaş push-in** `cs 1.00→1.35` (p+48–132), sürgü ~%14 (270 px) kapı sağ kenarı.
- **Karakterler:** Resmî görevlinin eli: siyah redingot kolu, **beyaz manşet** (Paris gri manşetinden ayırt edilir), yüz yok; sol el ilanı tutar, sağ el çekiç. Görevli kadrajın sağ-altından (kare açılırken içeride).
- **Eylem:** 12, 33, 54 çekiç (üçüncü ağır) · 54–66 el çekilir, sağ-alttan çıkar · **66 son vuruşun sarsıntısıyla sürgü yerçekimiyle düşüp yuvasına oturur "klank"** · 66–132 sürgü net 1.1 sn (kapanış).
- **Temas:** **3204 (p+12), 3225 (p+33), 3246 (p+54)** çekiç+çivi (−3) · **3258 (p+66)** sürgü "klank" (ağır demir, −3).
- **Süreklilik:** İlandaki **kırmızı mühür** P05'in mührüyle aynı. Direk kolları dinlenme (P17). Kulübe cephesi = KULE-DIS kulübesi.
- **Fizik:** Çiviler kapı tahtasında; el çekilince kapı sallanmaz. Sürgü yerçekimiyle düşer, kapıdan geçmez; kendiliğinden değil, vuruşun sonucu.
- **Geçiş (çıkış):** MATCH (direk dikey çizgisi → P22 siluet direği).
- **Ekran yazısı:** "Önce açık. Sonra yasa." **ALT-BANT**, 3198–3318.
- **Anlatım:** "Telgraf yasası aynı yıl geldi." **Dokunuş:** sürgü.

### P22 · kare 3324–3468 · WIFI-MORF
- **Kadraj/kamera:** Siluet, geniş → morph. p+0–60 Tours direği alacakaranlık moru gökyüzünde, kollara zoom `cs 1.00→2.20`. p+60–96 T kolları katlanarak üç yaya dönüşür. Morph merkez (540,800), boy ≥600 px (%31). Arka plan 60–110'da telefon-ekranı karanlığına.
- **Doku:** Kukla/tahta kesme, boyalı kâğıt, katmanlı ahşap, kenar gölgesi. **Neon/parıltı yok.** Üç yay sırayla tahta renginden krem boyaya **dolar**.
- **Eylem:** 60–90 kollar katlanır, direk nokta olur · **90, 102, 114 üç yay sırayla boya dolar** · 114–144 hold (kapanış).
- **Temas (ses olayı, fiziksel temas değil):** 3384–3414 tahta gıcırtısı (−5) · **3414 (p+90), 3426 (p+102), 3438 (p+114)** üç yükselen **ahşap tık** (marimba benzeri, sentetik blip değil, −6).
- **Süreklilik:** Direk P21/P17 ile aynı siluet.
- **Geçiş (çıkış):** SERT (ekran karanlığı → P23 fener).
- **Ekran yazısı:** "İlk siber saldırı" **ALT-BANT**, 3330–3462.
- **Anlatım:** "Bazıları buna ilk siber saldırı diyor." **Dokunuş:** morf (kol animasyonu değil simge dönüşümü).

### P23 · kare 3468–3600 · PARIS-MASA · LOOP
- **Kadraj/kamera:** P01'in aynası: tepe-önden, **aynı kamera `cs 1.00`**, aynı masa/pencere A/fener; direk kolu **A konumunda sabit** (P01 f0). Paket ekranın %55'i, kabartı ~%30.
- **Karakterler:** Paris adamının elleri (gri manşet, sağ manşette altın düğme; P09'daki aynı).
- **Eylem:** 0–20 eldiveni kâğıdın ortasına koyar · 20–54 kâğıt katlanır (sol, sağ, alt/üst) · **54–120 ipi çekerken kâğıdın altında eldivenin beş parmağı kabarık el silüeti** verir · 84–114 ip dolanır, **90 ip gerilir** · **114 düğüm/fiyonk sıkılır, kabartı yatışır** · 120–132 eller çekilir; kapalı paket merkezde (kapanış).
- **Temas:** **3482 (p+14)** eldiven kâğıda · **3488, 3506, 3522** (p+20,38,54) katlama hışırtısı · **3558 (p+90)** ip "zıııt" (−4) · **3582 (p+114)** düğüm tok (−5).
- **Süreklilik:** **Döngü:** eşleşen kesme, paket aynı yerde, aynı kamera/pencere/kol A. P23 kapalı paketle biter, P01 f0'da paket açılıyor ("kapat → aç"). Senaryodaki "son kare kâğıt yarı açık" kaldırıldı (Bölüm 4, madde 2). Kule kolu P23'te hareket etmez (dokunuş tekrarı olmasın).
- **Fizik:** Paket ve masa P01 ile aynı; ip düğümü fiziksel (iki ucu çekilir).
- **Geçiş (çıkış):** LOOP: SERT, müzik P01 pizzicato notasına kesintisiz bağlanır.
- **Ekran yazısı:** "Elektrik yok. Sadece…" ÜST-BANT, 3474–3600.
- **Anlatım:** "Kablo yok. Bilgisayar yok. Sadece..." **Dokunuş:** eldivenin parmak kabartısı.

---

## 3. Süreklilik kontrol tablosu

| Öğe | Durum plan plan |
|---|---|
| **Beyaz eldiven (kanca/paket)** | P01 memurun elinde, kâğıttan çıkar, masaya bırakılır · P10 pakette (↑ etiketi, kımıldamaz) · P15 memurun elinde buruşuk · P16 elinde → yere düşer · P23 Paris'te pakete konur (aynı model, aynı beyaz) |
| **Louis'nin eldivenleri** | P02, P04, P06, P07: sağ göğüs cebinden **beyaz köşe**, ellerde yok · P18 sırttan görünmüyorsa yan kesitten cep ucu · P19 cepten çıkarılır, giyilir (kurulum tamam) |
| **Gri manşet (Paris adamı)** | P09 koyu redingot + **gri manşet, sağ manşette tek altın düğme**, yüz görünmez · P23 aynı manşet ve düğme. P21 görevlisinin manşeti **beyaz** (karışmasın) |
| **Louis'nin bastonu** | P04 sağ elde, ucu yerde · P06 taş korkuluğa dayalı · P07 masa kenarına dayalı, sağ yanında · P08 aynı (kadraj kenarı) · P14 masaya dayalı · P18 sıraya dayalı, sağ yanında · P19 aynı (görünmez) |
| **Louis'nin şapkası** | gri; P02–P07 başında, P14 masada, P18–P19 dizinde |
| **François'nın şapkası** | siyah silindir; P02 başında · P04 sonunda elde, kalkık · P07 başında · P18–P19 dizinde |
| **Louis/François ekran yönü** | P02, P04: François solda · P18 (arkadan): François solda · P19 (ters açı, önden): **Louis solda, François sağda** (aynı oturuş düzeni) |
| **Memurun kıyafeti** | zayıf, yıpranmış **gri ceket**, şapkasız, sol göğüs cebinde eldiven köşesi: P01 (kol), P07, P08, P10 (kol), P11, P15 · P16–P17 gömlek (ceket askıda) |
| **Müdür** | yalnız P07 (yaşlı, iri, koyu yelek) |
| **Telgrafçı (ara kule)** | P12, P13 aynı kişi (kısa, tombul, kahve frak, bıyık). Memur değildir |
| **Suç ortağı** | P14 (koyu kahve redingot, basık kasket); P06'da yok ama dormer + kule kurulu |
| **Kule görünürlüğü** | P01 (A, kol A→B) · P03/P05 (harita) · P06 (uzak siluet) · P07 (A, B) · P08 (A, statik B) · P11 (pencere B uzak kule) · P12 (POV X) · P13 (kendi direk + ufuk) · P14 (Bordeaux X) · P16 (pencerede uzak) · P17 (dinlenme, statik) · P21 (dinlenme) · P22 (siluet) · P23 (A, sabit) |
| **Kol konumları** | A = P01 f0 / P23. B = P01 f54 sonrası, P07, P08. X = fazladan çentik (P11→P12→P13→P14). Dinlenme = P17, P21 |
| **Mum / fener** | P01, P10 fener (amber) · P07, P08 tek mum (aynı) · P16 mum komodinde |
| **İkinci kese** | P07 Louis dirseğinde → P08 memura kayar |
| **Kırmızı mühür** | P05 haritada · P21 ilanda (aynı tasarım) |
| **Dormer penceresi** | P06 dışarıdan, soldan 2., açık · P14 içeriden |
| **Paket** | P09 kahverengi + ip + "TOURS" etiketi · P10 aynı kâğıt/etiket · P23 kapatılan |
| **Saat/tokmak** | P18 sarkaçlı saat üst-sağ, tokmak kürsüde · P19 tokmak (aynı nesne) |
| **Güve** | P20 cilt oluğunda p+0'dan, p+100'de açılır |
| **Sandalye silüeti + sehpa** | P16 arka sağ → P17 yazan siyah kollu el |
| **Pervaz çentikleri** | P14 plan başından görünür, bir çentik eklenir |
| **Işık yönü** | Bordeaux gündüz sıcak altın · gece mavi ay + amber · Tours iç tek fener/mum · Mahkeme çapraz huzme · P22 alacakaranlık mor |

---

## 4. Senaryodan sapmalar ve yakalanan sorunlar

1. **Süre kaydırmaları (onaylı).** P09 1.8→2.0 sn (sahne 2–5 sn kuralı), P10 2.4→2.2 sn (12 kare aktarıldı, orkestra onayladı). P14 2.2→2.4 sn ve P15 2.6→2.4 sn (12 kare P15'ten P14'e, orkestra kararı; kule ≥1 sn net). Toplam 3600.
2. **P23 "son kare kâğıt yarı açık" ile "ipi çeker" çelişkisi.** Kapalı paketle bitiyor, eşleşen kesme (aynı kamera/paket konumu) döngüyü taşıyor.
3. **P01 kolun "şak"ı eldivenle aynı karede.** Fiziksel gerekçe: kadraj dışındaki ikinci el regülatörde. Kanca metaforu, belgeli.
4. **P12 kurulum eksiği.** Telgrafçının yüzü aşırı yakın planda ilk kez görünüyordu; p+0–24 giriş eklendi.
5. **P08 ikinci kese.** P07'ye iki kese eklendi.
6. **P15/P16 memurun eldiveni.** P15'te elde kuruldu, P16'da elde başlar.
7. **P16/P17 dinleyici/yazan.** Kimliksiz silüet + yazı sehpası P16'da kuruldu.
8. **P19 eldiven cebi.** Louis'nin cebi P02'den itibaren beyaz köşeyle kuruldu.
9. **P18 → P19 sol/sağ.** Ters açıda kardeşlerin ekran yönü tersine döner (tabloda).
10. **Dürbün.** Dönem: tek tüplü pirinç teleskop; anlatım "dürbün" diyor.
11. **"Kardeşler".** P02 metni ve bu belgedeki tüm ifadeler "kardeşler"; "ikiz/twins" geçen yer kalmadı. Senaryo v2.1 açıklamasındaki bilinçli yumuşak ifade senaristte.
12. **dokunuslar.md ile uyum.** Plana işlendi: P01 pencere kanca yazısının altında; P03 gün-gece + at yorgunluğu, toz yok; P04 replik bölünmesi; P05 rüzgâr/toz yok; P06 tüy kola + fiske; P07 memurun göz kırpması; P08 parmak tiki + duvar gölgesi (kule kolu yok); P10 çorabı kaldıran el; P11 müzik yalnız kısılır; P14 çentik kazıma; P17 kum serpme; P18 sarkaçlı saat; P19 BERAAT animasyonsuz; P21 sürgü çekiç sarsıntısı sonucu; P22 boya dolgusu + ahşap tık; P23 parmak kabartısı, kule kolu hareketsiz.
13. **P14 (kullanıcı kararı + dokunuş birlikte).** Odak kayması kamera aracı (kullanıcı kararı), dokunuş pervaza çentik (yaratıcı yönetmen). Orkestra kararıyla plan 144 kareye çıktı; kule 78–138 arasında 1.0 sn net.
14. **P04 insert ızgarası.** Proto FareInsert ızgarası (400,1446) ALT-BANT altyazıyla çakışır; insert (400,1130)'a kaldırıldı.
15. **P10 açısı.** 90° tepe açıda sarkan çorap okunmazdı; 55° eğik açıya alındı.
16. **P18 konuşma süresi.** "bin sekiz yüz otuz yedi. Mahkeme." ~1.6 sn; 0.6 sn sessizlik plan sonuna kondu.
17. **Hareket tamamlanır/kapanış:** her planda yazıldı.
18. **Dönem:** %3 rente (kâğıt para yok), ipe asılı réverbère, Notre-Dame yok, regülatör T biçimli, 1830'lar sarkaçlı saat ve kurutma kumu.

---

## 5. Riskli planlar

| # | Plan | Risk | Önlem |
|---|---|---|---|
| R1 | P04 | Replik bölündü ama insert 66 kare, göz kırpma ve şapka dönüşte; "kazanır" 146–176 | Göz kırpma ilk kısalır. Baston TAK (p+108) kaymaz. Insert ızgarası (400,1130)'a kaldırılacak |
| R2 | P19 | Parmak parmak eldiven + cepten çıkış 2 sn'de; rig'de parmak yok | Ayrı vektör "EldivenEl" insert varlığı (motion) |
| R3 | P15 | Bölünmüş montaj; yaprak ayracı geçer, omza konar; plan 144 kareye kısaldı | Üç katman; yaprak eğri parametreli. Hold payı 12 kare |
| R4 | P14 | Odak kayması tüm kadrajda: swangle'da blur yavaş; kule net 1.0 sn (78–138) | İki katman (ön/arka) keskin+bulanık, kare başı katman değişimi; stil karesinde (2264) önce test |
| R5 | P22 | Wi-Fi morfu neon'a kayabilir | Tahta dokusu, yanma = boya dolgusu; eleştirmen kontrolü |
| R6 | P02 | 12 figürlük kalabalık + 60 fps | Kalabalık statik siluet, 3 figür animasyonlu |
| R7 | P12/P13 | Aşırı yakın göz/kaş ve esneme telefonda okunmalı; rig'de kaş, esneme var mı | Motion erken söylesin; yoksa büyük vektör parçaları |
| R8 | P01 | Kapak karesi + kanca: ilk karede hareket+yazı+pencere | f0 "yarım hareket" pozu stil karesi |
| R9 | P03/P05 | Gerçek Fransa sınırı; tilt + yaklaşma (P03) | `Harita.tsx` yeniden kullanılır; P05 kadrajı P03 başlangıcı |
| R10 | P08 | El–gölge: T biçimli gölge ışık mantığıyla (mum alttan) tutarlı olmalı; gölge %22 | Gölge ışığın tersine; motion önce gölge kurgusunu çizer |
| R11 | P16 | Eldiven yorgandan düşüşü (kumaş fiziği) | Yorgan eğik yüzey; eldiven rigid parça, düşüşte iki nokta |
| R12 | P20 | Güve ≥%10, stil dışına çıkabilir | Büyük basit gri-kahve vektör |
| R13 | P09 | Paket kayması ve çizme teması | Araba tepesi eğimsiz; paket x ekseninde kayar, çizme tam o karede |
| R14 | P10 | Çorap uzaması (esneyen vektör) ve el | Tek parça kıvrımlı path, bileği ip ucuyla bağlı |
| R15 | Genel | 60 sn tam kesim: ses gelince anlatım kayabilir | Foley görüntüye kilitli; nefes boşlukları yazılı |

---

## 6. Önerilen stil kareleri (her mekân için tek temsilî kare)

| Mekân | Plan | Mutlak kare | Neden |
|---|---|---|---|
| TOURS-KULUBE-IC (hook) | P01 | **60** | Eldiven yükselmiş, kol B'de, kâğıt masaya yatmış: el, fener, pencere ve yazı aynı karede; kapak ve ilk izlenim |
| TOURS-KULUBE-IC (oda) | P07 | **1226** | Çekmece BAM: mum, pencere A direği, kapıda François, üç karakter, masa |
| BORSA | P02 | **276** | Tebeşir tozu asılı, kalabalık dönmüş/donmuş: ölçek, kalabalık stili, tahta |
| HARITA | P05 | **940** | Mühür + balmumu taşması + kule hattı: tüm katmanlar |
| SOKAK-BORDEAUX | P04 | **724** | François şapka kalkık, sırıtış; fener, sis, gemi direkleri: prototip kimliği Bordeaux'ya oturur |
| PARIS-AVLU | P09 | **1506** | Paket oturur, çizme, "TOURS" etiketi, araba, gri manşet |
| CATI-BORDEAUX | P06 | **1012** | Güvercin çıkışı, tüy, dormer, uzak kule, şafak |
| CATI-KATI | P14 | **2264** | Kule net (78–138 aralığı), ön plan bulanık: odak kayması en zor render; pervaz çentikleri bulanık görünür |
| KULE-DIS | P13 | **2128** | Geri çekilmiş kadraj: kulübe, kendi direk, ufuk kulesi |
| YATAK-ODASI | P16 | **2520** | Orta plan: yatak, mum, pencere kule, sandalye silüeti, ceket |
| MAHKEME | P18 | **2850** | Huzmeler, kürsü, saat, jüri: en kalabalık geniş kadraj |
| KANUN-INSERT | P20 | **3148** | Güve açık, boş sayfa, huzme |
| TOURS-KAPI | P21 | **3258** | Sürgü düştü: ilan, mühür, direk, kapı |
| MONTAJ-15 | P15 | **2440** | Yaprak omza konarken iki yarı + ayraç |
| WIFI-MORF | P22 | **3438** | Tam Wi-Fi ikonu: tahta dokusu / neon kontrolü |
| PARIS-MASA | P23 | **3582** | Düğüm sıkıldı, kabartı yatışıyor: P01 ile kompozisyon eşleşmesi |
| Rig doğrulama (opsiyonel) | P19 | **3008** | Eldiven insert eli: parmak vektörü |

---

## 7. Foley / boşluk özeti

Tüm temas kareleri her plan bölümünde ve `sahne-plani.json` içinde `temaslar[]` olarak mutlak karelerle verildi. `ADIM` olayları motion'ın `yuru()` fazından üretilir. Müzik/anlatım boşlukları: P04 insert p+78–144 (müzik 1.1 sn sessiz), P07→P08 çekmece sonrası 0.3 sn, P11 müzik kısılır (kesilmez), P12 p+100–130 tam sessizlik (müzik de), P17 p+126–144 (0.3 sn), P18 p+96–132 (0.6 sn), P23→P01 müzik kesintisiz.
