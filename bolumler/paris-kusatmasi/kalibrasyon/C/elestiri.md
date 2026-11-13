# C turu kalibrasyonu: DAGRON-INSERT + LANTERN-ODA (eleştirmen, 2026-11-13)

**Karar: GEÇMEZ. Puan 5.** P04b ve P09 düzeltmeyle geçer. Mekanizma anı (P05 ölçü) ve karşılık anı (P10 perde ve okuyan) geçmez.
Orkestranın gözlemi **doğrulandı**: bu iki şablon, çatı/Montmartre hedefinin (hedef-ozet: değişken kontur, tüy tüy kuş, iple sarılı kılıf, tarama) altında kalıyor. İç mekânlarda gravür dili yok denecek kadar az. Tarama yalnız P05'te terazi gölgesinde ve P10'da lantern yan yüzünde var. Duvarlar ve perde düz iki ton.

## Bulgular (kare · sorun · neden)
**P05 f268–300 (mekanizma, KRİTİK)**
- f280: Ekranın yaklaşık %55'ini kaplayan el ve havaya kalkık tek parmak. Başparmak ekranın solunda, ama sol elin sırtı görünüyor. Anatomik olarak bu ayna görüntüsü, yani sağ el gibi duruyor. Başparmak bükük işaret parmağı sanılırsa kalkık parmak **orta parmak** olarak okunur: müstehcen jest riski. Neden: KolEl yeni `isaret` pozu (parmak sırası ve başparmak tarafı) ile kamera cs 2.0 / cy −610.
- Şerit "küçülmüş sayfa" olarak okunmuyor; koyu bir etiket ya da domino gibi duruyor. İçindeki çizgiler dikey ve paralel, sayfadaki yatay dalgalı satırların minyatürü değil. Aynı karede tam sayfa ile şerit yan yana karşılaştırılmıyor; sayfa yalnızca zemin. Neden: `Sayfa.tsx` şerit mikro deseni (`#8a7466`, dikey çizgi) ve ölçü anındaki kadraj.
- f236: Parmak merceğe değiyor gibi duruyor (motion da belirtmişti). f264: sayfanın ortasında küçük mavi hilal artefaktı var (gölge maskesi), f268'de büyük gölge birden beliriyor. Bunlar küçük kusurlar.
- El çizgi dili: kalın ve sabit kontur, yuvarlak tırnak lekesi, boğum tireleri, uçları eşit genişlikte parmaklar. Çizgi film eldiveni gibi, hedef dilin dışında. Neden: `ParisEl.tsx` / KolEl kontur kalınlığı ve tırnak/boğum işaretleri.
- Fizik: f0'da sağ kefedeki kuşun kuyruğu terazi direğinin içinden geçiyor. Neden: kuş konumu/ölçeği (`dagronDunya.ts` kuş X ve kuyruk uzunluğu) motion'ın terazi kaydırmasıyla (−0.137, 0.95) birleşince.

**P10 `oda` f178–266 (karşılık, KRİTİK)**
- f200: Perde kadraj genişliğinin yaklaşık %98'ini dolduruyor. Lantern kaynağı (150,1529) perdenin sol-alt köşesine çok yakın; bu yüzden huzme sol altta ince bir kamaya çöküyor ve oda kayboluyor. "Büyüdü" anı, bir sayfanın ekranı doldurması gibi okunuyor, odada yansıtılan bir görüntü gibi değil. Neden: mekanlar §4v2.4 geometrisi (perde ölçüsü, kaynak konumu, kamera).
- f200: Perdenin üstünde (1070,415) → (300,1350) arasında **çapraz dikiş** var (dörtgen iki üçgenle çizilmiş, kenar yumuşatma izi). Kural: maske kenarı kalmaz. Neden: `LanternOda.tsx` perde poligonu.
- f200: Sol üstte (x 10–130, y 0–410) perdenin üst kenarını aşıp tavana giden ışınlar var. Işık perdeyi geçemez. Neden: sınır ışınları perde dikdörtgenine değil halka/hale dikdörtgenine hesaplanıyor.
- Perde, kenarında dalgalı çizgi olan düz bir dikdörtgen: ne çerçevesi, ne ipi, ne kumaş sarkması var. Duvarda mimari yok (lambri, pencere, kiriş). §4v2.8 geniş karanlığı taramayı yasaklıyor; sonuç ölü düz yüzey.
- Memur başları: disk + iki kulak elipsi + üst parlama yayı = 360 px'te "kulaklıklı kask". Neden: `LanternOda.tsx` memur başı çizimi.

**P10 `kapi` f266–398 (doruk "Paris okudu", KRİTİK)**
- f330: Kâğıt okunuyor, ama okuyan koyu ve düz bir kukla. Baş, ortasında kulak diski olan siyah bir daire; yüzün yönü yok. Bu yüzden "okuyor" değil "bize kâğıt gösteriyor" gibi duruyor. Kollar eşit genişlikte dikdörtgen bloklar. Kol rengi yeşil-gri, palto mor: iki ayrı giysi gibi. Palto taraması (§4v2.8'de 78°) uygulanmamış. Neden: FigurSiluet + KolEl IK (konik olmayan segment, kol tonu) ve okuyanın baş açısı.
- f266: Okuyanın sarkan eli belde, boşu kavrar gibi bükük parmaklarla duruyor. Küçük kusur.

**P09 f150 (düzeltmeyle geçer)**
- Kuşun başı kadraj dışında. Yukarıdan görülen kuyruk yelpazesi (üst üste kapsüller) ve sivrilen gövde "balık" gibi okunuyor. Kılıfı bağlayan ip 360 px'te görünmüyor (ince ve açık renk). Neden: `masa tours-buro` kamera cx ile kuş konumu, ip kalınlığı ve rengi, tüy çizimi.

**P04b f206 (düzeltmeyle geçer)**
- KRİTİK fizik: kuşun kuyruğu kafesin sol çerçevesinden dışarı taşıyor (x 135 < çerçeve 160). Neden: kafes içinde kuş ölçeği/konumu.
- Kapak, kafesin ortasında dikey bir pano gibi duruyor; kapı olarak okunmuyor. Balon "sönen" değil "duran" bir balon gibi (motion zayıflık 4). Kapağı açan el kullanıcı onayı bekliyor; kural gereği bir etken gerekir, ben elden yanayım.

## Düzeltmeler (en çok 5, önem sırasıyla)
1. **P05 ölçü anı: mekanizmayı tek karede kur** (motion + tasarım). `isaret` pozu yerine el masaya yatık dursun, işaret parmağı şeride paralel uzansın (yatay ölçü), başparmak anatomik olarak doğru tarafta olsun ve parmak havaya kalkmasın. Kamera cs 2.0 → ~1.5: tam sayfa, şerit ve parmak aynı karede, el ≤ %35. Şerit deseni sayfanın birebir minyatürü olsun: aynı satır düzeni, kenar boşluğu ve kare çerçeve, koyu film üstünde açık satırlar (`Sayfa.tsx` mikro desen). **Tasarımdan yeniden tarif:** Paris eli gravür dilinde (değişken ince-kalın kontur, tırnak lekesi ve boğum tiresi yok, gölge tarafı taranmış, uca doğru incelen parmaklar). `ParisEl.tsx` / KolEl bu tarife göre güncellenir.
2. **P10 `oda`: mekândan yeniden tarif** (mekân sorumlusu §4v2.4/4v2.8 → motion). Perde kadraj genişliğinin ≤ %70'i olsun; çerçeveye ya da ipe asılı, alt kenarı sarkan bir bez. Lantern sağ-alt ön plana gelsin; huzme memur başlarının üstünden çapraz geçsin ve ≥ %15 alan kaplasın. Duvarda 1–2 mimari öğe olsun (lambri, kepenkli pencere ya da kiriş). Geniş karanlıkta en az yön gösteren seyrek tarama olsun. Motion: perde poligonu dikişsiz tek yol olarak çizilsin; sınır ışınları perde köşesinde bitsin.
3. **P10 `kapi` okuyan** (tasarım §3.3/§13.8 yeniden → motion). Okuyan 3/4 profilde olsun. Burun-çene çizgisi ve kapı ışığından sıcak yanak kenarı görünsün, baş kâğıda eğik dursun. Kollar konik olsun, dirsekleri yuvarlatılsın ve palto renginde çizilsin. Paltoya 78° tarama gelsin. Kulak diski kalksın.
4. **Memur başları** (motion, `LanternOda.tsx`). Kulak elipsleri ve üst parlama yayı kalksın. Yerine düzensiz saç kenarı, yaka ve perde ışığından ince kenar ışığı gelsin; 3 memurun baş biçimleri birbirinden farklı olsun.
5. **Fizik ve okunurluk paketi** (motion).
   - P04b: kuş ×0.85 küçülsün ya da sağa alınsın, kuyruk çerçevenin içinde kalsın.
   - P05 f0: kuş sağ kefede sağa kaysın ya da kuyruk açısı değişsin; kuyruk direğe değmesin.
   - P09: kamera cx sola alınsın ya da kuş sola taşınsın; baş, göz ve kanat kadraja girsin. Kılıf ipi ≥ 4 px, koyu ve 2 sarım görünür olsun (hedef-ozet gibi).

Ek küçükler (düzeltme sayısına girmez):
- P05 f264 mavi hilal artefaktı.
- P05 f236 parmak merceğe değiyor gibi duruyor (el mercekten 20 px uzakta dursun).
- P04b kapağın menteşesi kenarda görünsün.
