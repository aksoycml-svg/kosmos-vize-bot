# Sahne planı: Leningrad'da 7. Senfoni (yönetmen, 2026-11-15)

Girdi: kilitli `senaryo.md` v3.2, `dokunuslar.md` (LS-D1…D8), `public/leningrad/ses/plan-sureleri.json` + `{tr,en}/Pxx.json` (speed 1.05, güncel), `KATALOG.md`, `SINEMATOGRAFI-SOZLUK/DUYGU.md`. **`bolum.json` yazılmadı** (şablonlar yok); sonunda taslak parametreler var. **Kontrol karesi render edilemedi** (kural 7 uygulanamaz); kamera/z/u/px değerleri hesapla üretilmiş **önerilerdir**, kalibrasyonda ölçülüp bu belgeye geri işlenir (plan tek gerçek kaynaktır).
60 fps · 1080x1920 · kritik her şey (yüz, temas, kurulum nesnesi, ayak) **y 420–1290**, yanlardan x 80–1000; üst bant 240–400 ekran yazısı; alt bant 1290–1490 kelime altyazısı (`altyazi` açık, TR/EN ayrı katman) — alt bant yalnız zemin/gölge/ön plan dolgusu taşır.
Kare/olay tablosu **en sonda, `zaman_tablo.py` ile üretilir** (süre değişirse betik yeniden çalışır; olay saniyeleri betiğin içinde tek kaynaktır).

## 0. Süre kararı
`plan = max(TR,EN) + 0.4` (plan-sureleri.json) toplam 85.36 sn. **Anahtar tutma eklemesi** (senaryo kısa tutmayı seçmişti; ölçülen sesle kurala yaklaştırıldı): P08 +0.8 (tutma, konuşma sonundan 1.45 sn), P12 +0.4 (1.05 sn), P15 +0.6 (1.24 sn) → **toplam 87.13 sn (5228 kare)**, ≤88 sınırı içinde. Kurgucu/ses bu üç planın sonuna sessiz kuyruk ekler; plan-sureleri.json değişmez (kaymalar `zaman_tablo.py`'de). Kural "okuma+1.5" tam karşılanmadı → `lint: {izin: ["anahtar_tutma"], not: "toplam süre sınırı; tutma 1.05–1.45 sn"}`.
**TR/EN ortak görüntü:** görsel olaylar iki dilin kelimeleri arasına oturtuldu. EN kısa olduğunda (P09 −2.7 sn, P11 −1.6, P15 −1.3, P04 −1.3) resim taşır, ses erken biter; EN'de bu planlarda kuyruk sessizliği bilinçli.

## 1. Mekân kararı (3 mekân + harita)
| Mekân | Görünüm | Planlar |
|---|---|---|
| **SALON** (Filarmoni Büyük Salonu) | `konser` (avize, altın, seyirci) | P01, P12, P14, P15 |
| | `prova` (nötr karanlık, tek çalışma lambası havuzu; P10'da pencereden yaz ışığı) — senaryodaki "nötr karanlık zemin" bu | P02b, P03b, P04b, P05, P06, P09c, P10b |
| **BODRUM** (Radyo Evi, geçici morg) | merdiven + morg | P07, P08, P09a–b |
| **SOKAK-LG** | `kis` / `yaz` (aynı dekor) + `kapi` (bina girişi) | P03a, P04a, P13 |
| HARITA `leningrad` (mevcut HARITA motoru, yeni görünüm) | halka, uçak ikonu, top ikonları | P02a, P10a, P11 |
**P11 CEPHE yerine HARITA** (kota kararı): Sovyet top ikonları (gravür, namlu yukarı) + `darbe` (alev/duman, sarsıntı 0); gerçek top/topçu çizimi yok. Sapma: dokunuslar.md "topçular yüzlü" maddesi harita ikonuyla karşılanmaz → yön karesinde kullanıcı gerçek top isterse 4. mekân (CEPHE) kurulumu ayrı karar. Dil-nötr: harita etiketleri/şehir adları yazı katmanında (`svg_etiket: false`), sahnede tabela/afiş yok, hoparlör ve davul gövdesinde harf yok.

## 2. Çekim kartları ve plan ayrıntıları
Biçim: **Duygu** · ölçek · açı · hareket · ekipman · lens · netlik · hız · gerekçe (§10: 1 ne açıyor/saklıyor, 5 duyguyla ilişki, 6 süs mü). Kamera `cs` aralıkları öneridir. Her sahnenin tek ana hareketi kalın.
Tempo: hizli/nefes/bekle. TAŞ = plan sonundan sonrakine taşıyıcı.

### P01 · SALON konser · tempo **hizli** · kanca
- **Duygu:** merak, kırılganlık. INSERT/CU (çubuk+davul kasnağı; yüz kadraj üstünde) · eye level · **locked-off**, vuruştan sonra çok yavaş pedestal up · tripod → slider · 85 mm · shallow (kasnak vidası flu ön plan, çubuk uçları net, arka sıcak siluetler flu) · ease out · yüzü saklar, ellerin ne yaptığını açar.
- **Ana hareket:** çubuklar davula iner (f0'da yol ortasında, ilk kare hareketli) ve kalkar. Konum: davul derisi merkez (540, 980), çubuk uçları y ≈ 800–900, eller y 600–760 (ekranın %12 yüksekliği), çubuk uzunluğu ≥ %40 genişlik.
- **Katman:** ön: kasnak kenarı + vida (y 1180–1290, flu) · ışık: avize tek sıcak kaynak, çubuk uçlarında kenar ışığı (sahnenin en açık/doygun noktası) · atmosfer: vuruşta deriden kalkan toz. **Alt üçte bir:** kasnak/deri, toz, flu vida dolgusu.
- **Foley:** `davul-vurus` (temas karesi). **Saklanan:** davulcunun yüzü. **Yazı (üst):** LENINGRAD · 9 AĞUSTOS 1942. **Okunurluk:** çubuk+el ≥ %25 ekran, net 3 sn. kontrol_kare: vuruş.
- **TAŞ → P02:** *şekil (daire)*: kamera kasnağa çok yavaş yaklaşır, kasnağın dairesi alt kadraja girer → P02a halkası; vuruş kuyruğu 0.3 sn P02'ye taşar.

### P02 · HARITA → SALON prova · tempo **nefes**
- **P02a (0–3.85 sn) Duygu:** kaçınılmazlık. WS · high angle (bird's-eye) · **slow push-in** (cs 1.0→1.25, dolly) · 35 mm · deep · ease in/out · neden: şehrin tek bir halkada sıkıştığını okutur. Harita: şehir merkezde sıcak, halka (Alman ordusu işaretleri) kapanır (bas 0.3 → bit 3.2). Ön: parşömen kenarı · ışık: masa lambası havuzu · atmosfer: kâğıt tozu. **Alt üçte bir:** parşömen + halka güney yayı + gölge.
- **P02b (3.85–8.63) Duygu:** yük, yalnızlık. MS arkadan (Eliasberg sırtı 3/4, bol giysi) · eye level · **truck right** (paralaks: ön plan sehpa ayağı, orta Eliasberg, arka sandalyeler) · jib/slider · 50 mm · shallow→ sehpa tablası net · slow controlled · boş sehpa saklanan şeydir. Eliasberg x≈330 (sol üçte bir), boş sehpa x≈640, tablası y≈900 açık yüzey; ayak y ≤ 1250. Işık: tepeden tek lamba, omuzda kenar ışığı; atmosfer: toz, nem. **Alt üçte bir:** sahne tahtası, sandalye ayakları, sehpa gölgesi.
- **Yazı:** Karl Eliasberg · şef (üst, TR 'Şef Karl' ile) → Şostakoviç · 7. Senfoni. **Saklanan:** boş sehpa (notalar P10'da). kontrol: Eliasberg+sehpa.
- **TAŞ P02a→b (plan içi):** *ışık havuzu* (masa lambası havuzu → tepe lambası havuzu sehpada). **TAŞ → P03:** *açık düz yüzey*: boş sehpa tablası → karda açık avuç (aynı y ≈ 900, aynı boyut); soğuk renk kayması (zaman atlaması geri dönüş).

### P03 · SOKAK-LG kış → SALON prova · tempo **bekle** · LS-D1
- **P03a Duygu:** kırılganlık, saygı. INSERT · **high angle** (omuz üstü, avuca bakış) · slow push-in (dolly) · 50 mm · shallow (sokak flu) · slow controlled · neden: açlığı tek dilim ekmekle verir, kırıntı saygısı karakteri anlatır. Avuç + ekmek ekranın ≥ %30'u (y 640–1000, avuç merkezi (540, 820)); kırıntı düşer, el kenarı karın içinden toplar, avuç kapanır (bit ≥12 kare önce). Keman kutusu askısı kadraj kenarında (kurulum, yüz kadraj dışı). Ön: kapüşonlu kol flu + kar · ışık: alçak soğuk kış güneşi sağ-arka, avuçta mavi gölge · atmosfer: ince kar, nefes buğusu. **Alt üçte bir:** kar zemini, iz, kol gölgesi.
- **P03b Duygu:** eksiklik, yalnızlık. WS · eye level · **dolly out** (cs 1.4→1.0, jib alçak) · 28 mm · deep · slow decelerating · on beş oturan (yakında yüzlü, uzakta baş eğimiyle okunur), gerisi boş sandalye karanlıkta; en arkada davul + boş tabure (kurulum P04/P06/P09/P15'e). Ayak y ≤ 1270; ön boş sandalye arkalığı flu (y 1150–1290).
- **Yazı:** üst1 1941–42 kışı · günde 125 g ekmek (TR "on beş" öncesi) → üst2 40 → ~15 · gereken: ~100. **Foley:** `kar-avuc-surtme` (el kırıntı toplarken, tek, kısık). **Saklanan:** boş sandalyeler dolacak mı. kontrol: kırıntı toplanışı.
- **TAŞ a→b:** *koyu dikdörtgen kütle* (ekmek dilimi → sandalye arkalığı) + dolly hareketi sürer. **TAŞ → P04:** **çıplak kesme #1** (gerekçe: mekân/zaman sıçraması "kapı kapı arama"; müzik yatağı ve soğuk ışık sürer; ses taşıyıcı yok çünkü kapı vuruşu görünmeyen kaynakta ses olurdu).

### P04 · SOKAK-LG kapı → SALON prova · tempo **hizli**
- **P04a Duygu:** umut, çaba. MS · eye level · **static hold** (tripod) · 35 mm · deep · kapı çalma ≤1.2 sn: iki vuruş (21, 42), kapı aralanır (78), bir el çalgı kutusuyla çıkar (102–140). Eliasberg x≈330 sol, sırtı/profil; kapı x 600–900, y 520–1200 (ışık aralıktan). Ön: kapı pervazı · ışık: kapı arkasından sıcak (tek) · atmosfer: toz. **Alt üçte bir:** eşik taşı, kar kalıntısı, gölge.
- **P04b Duygu:** toparlanma, dayanışma. MWS · eye level · **pan right** (tripod, gelenleri izler) · 35 mm · deep→ orta net · gelen üniformalı askerler **yüzlü**, yorgun, bireysel (bıyık, sargı, toz), omuzda çalgı kutuları; sandalyeler dolar; tabureye biri oturur (sırtı dönük, yüz yok). Ayak y ≤ 1270.
- **Yazı:** gelenlere fazladan ekmek. **Foley:** `kapi-vurus-ahsap` ×2, `kapi-mentese`, `sandalye-oturma` (tabure oturuş). **Saklanan:** tabureye oturanın yüzü (P09/P15). kontrol: kapı aralığı + çalgı kutusu.
- **TAŞ a→b:** *çalgı kutusu* (kapıdan çıkan el → omuzdaki kutular). **TAŞ → P05:** *oturan davulcu sırtı* kadrajın aynı noktasında kalır (kamera önceki planın son değerinden başlar, elle eşitlenir; aynı SALON prova).

### P05 · SALON prova · tempo **nefes**
- **Duygu:** umut → bitkinlik. MWS · hafif high angle (podyumdan, Eliasberg'in kolları ön plan kenarında flu) · **slow dolly out** (cs 1.3→1.0, slider) · 35 mm · deep · slow decelerating · neden: güç kadrajla birlikte çekilir; ayaktaki kollar kalkar, yaylar/nefesliler kalkar → yay düşer, baş eğilir, çalgı iner, kollar iner. Aydarov davulda (sırtı yarı dönük, yüz görünmez). Ön: Eliasberg kolu + yay ucu · ışık: tepeden tek lamba, kollarda kenar ışığı · atmosfer: **nefes buğusu + toz**. **Alt üçte bir:** sandalye ayakları, sehpa ayakları, yay gölgesi.
- **Yazı:** sayaç `3 SAAT → 15 DAKİKA` (tur sayac). **Foley:** `yay-tahta-tok` (düşen yay yere). **Saklanan:** bu orkestra konseri çıkarabilir mi. kontrol: yay düşüşü + eğik baş.
- **TAŞ → P06:** *kamera alçalması* ve sandalyeye inen çalgı: P05 sonu çalgı sandalyede, kamera pedestal down başlar → P06 aynı kamera değerinden (elle eşitle).

### P06 · SALON prova · tempo **bekle** · LS-D2 · dinlenme
- **Duygu:** kayıp, güçsüzlük. MS (üç boş sandalye + üstünde çalgılar, sağda davul+tabure) → **CU–INSERT floor level** · tek planda **crane down** (jib) + **rack focus** (çubuk→tabure) · 35 mm · shallow (sandalye ayağı flu ön plan) · decelerating · neden: düşüşü kameranın düşüşüyle yaşatır (kayıp = Crane down); rack focus çubuk durunca bakışı taburedeki boşluğa yöneltir.
- **Ana hareket:** Aydarov'un gevşeyen elinden çubuklar düşer (iki temas), yuvarlanır, boş tabureye dayanır (tık); **kol zemine uzanır, hareketsiz (dinlenme ≥1.05 sn, anlatım sürer: "ölü sanılıp morga kondu")**; sonra Eliasberg'in eli girer, çubukları alır, kadrajdan çıkar (kurulum → P07 elinde çubuk). Çubuk uzunluğu ≥ %40 genişlik, imza nesnesi en açık nokta; çubuk y 1050–1250 (alt bant dışı).
- **Yazı:** Zhavdet Aydarov · vurmalı çalgılar. **Foley:** `cubuk-tahta-yere` ×2, `cubuk-yuvarlanma` (kısık), `cubuk-tabure-tik`, `giysi-hisirti` (el). Müzik tepelerinin 10–15 dB altı. **Saklanan:** Aydarov öldü mü (yüz yok, yalnız kol). kontrol: tabure teması.
- **TAŞ → P07:** *çubuklar* (Eliasberg'in eli çubukları kadraj üstünden çıkarır → P07'de merdivende aynı elde, aynı ekran noktası).

### P07 · BODRUM · tempo **nefes** · LS-D3
- **Duygu:** ağırlık, saygı, kaçınılmazlık. MWS · **low angle** (merdiven dibi) · static → hafif **pan down** (ışık çizgisini izler) · tripod · 35 mm · deep · slow controlled · neden: kapı aralığından gelen tek ışık çizgisini aşağıdaki sedyeye taşır, mekânı "aşağı" okutur.
- Eliasberg basamaklarda iner (çubuk elinde; dört adım, ayak temas karesi basamağa), kapıyı arkasından çeker, **~10 cm aralık bırakır**; çizgi basamak→zemin→örtülü sedye kenarı. Aşağıda duvar dibinde örtülü, yüzsüz, uzak biçimler (saygılı, sıralı); önde örtülü sedye; Eliasberg başı eğik yanında. Ayak/sedye y ≤ 1250; ön: tırabzan + basamak kenarı flu · ışık: kapı aralığı tek kaynak (P08'in kaynağı), toz huzmede · atmosfer: nem, ağır hava. **Alt üçte bir:** basamaklar, zemin, sedye ayakları, gölge.
- **Yazı:** Radyo Evi · bodrum. **Foley:** `kapi-mentese-kisik`, `kapi-aralik-tok`, `adim-ahsap-basamak` ×4. **Saklanan:** örtünün altı. kontrol: Eliasberg sedye yanında.
- **TAŞ → P08:** *ışık çizgisi + kamera durumu* (aynı BODRUM; P08 kamerası P07 son pan değerinden başlar).

### P08 · BODRUM · tempo **bekle** · ★ anahtar · LS-D4 (doruk)
- **P08-1 (0–1.0) Duygu:** kaygı. MS · eye level · static · 35 mm · deep: Eliasberg çubukları sedye ayağına bırakır (tık).
- **P08-2 insert (1.0–2.9) Duygu:** kaygı, yoğun dikkat. ECU/INSERT · hafif high angle · **static hold** · 100 mm macro · shallow (parmak net, örtü flu) · subtle · el ≥ %15 (~290 px; örtü kenarında el, ışık çizgisi üstünde y ≈ 800–1100); işaret parmağı iki seğirir. Yüz yok (saygı). Sıcak çizgi parmakta, çevre soğuk; atmosfer: çizgide toz. **Alt üçte bir:** örtü kıvrımları, sedye kenarı gölgesi.
- **P08-3 yüz (2.9–5.07) Duygu:** şok, gerçeklik algısının bozulması (ağır, sessiz). CU · eye level · **dolly zoom** (dolly in + zoom out, 50→28 mm eşdeğer, yüz ölçeği sabit, 2.95→4.2 sn) · virtual dolly + varifocal · deep · decelerating · neden: bölümün tek dolly zoom'u; arkadaki sedyeler/ışık çizgisi açılır (dünya uzaklaşır). Yüz merkez (540, 780), ≥ %15 yükseklik; gözler kalkar, nefes durur; ön: omuz/sedye ayağı flu. Dolly zoom 4.2'de biter; **tutma 4.2–5.07 + konuşma sonrası toplam 1.45 sn**, müzik geri çekilir (kesilmez).
- **Foley:** `cubuk-tahta-yere-yumusak`, `ortu-parmak-surtme` ×2 (parmak teması). **Saklanan:** Aydarov yaşıyor mu. **Anahtar:** çevre geri çekilir (kamera yüze, başka hareket yok). kontrol_kare 1: parmak (1.9 sn), 2: yüz dolly zoom (3.6 sn).
- **TAŞ P08 içi:** *bakış* (Eliasberg aşağı bakar → parmak → gözler kalkar) + ışık çizgisi aynı çizgi parmakta ve yüzde. **TAŞ → P09:** *kapı ışığı genişler* (dar çizgi → üstte açılan kapı; sebep: sedye çıkarılıyor).

### P09 · BODRUM → SALON prova · tempo **hizli**
- **P09a (0–3.0) Duygu:** acil umut. MS · eye level · **truck** (sedyeyi izler, steadicam/slider) · 35 mm · deep: Eliasberg çubukları sedye ayağından alır; iki yüzlü, yorgun siluet-kişi sedyeyi kaldırır (ayak sedye yan yön, hareket tamamlanır). Örtünün altında Aydarov'un eli kımıldar sarkar (yüz örtülü).
- **P09b (3.0–5.8) Duygu:** kurtuluş. MWS · **low angle** (P07'nin merdiven dibi, aynı nokta) · **tilt up** (sedyeyi ışığa kadar izler) · 35 mm · deep · accelerating→decelerating: sedye merdiveni çıkar (adımlar), öndeki taşıyıcı kapıyı sırtıyla iter (menteşe), gün ışığı içeri dolar (tek kaynak, tepe); ışıkta toz. **Yazı:** hastaneye gönderildi.
- **P09c (5.8–8.76) Duygu:** dönüş, sakin güven. MCU · eye level · **dolly in çok yavaş** · 50 mm · shallow · slow: davul taburesi üstünde çubuklar (Eliasberg'in eli bırakır); ardından zayıf, sargılı bir el çubukları alır, kadrajdan çıkar (yüz yok). Çubuklar y 900–1100. Ön: tabure ayağı flu · ışık: P12/P14 ile aynı ailede sıcak havuz (iyileşme); atmosfer: toz. **Alt üçte bir:** davul gövdesi, zemin, gölge.
- **Foley:** `cubuk-tik-sedye`, `sedye-tasima-ahsap`, `adim-ahsap-basamak` ×3, `kapi-mentese-agir`, `cubuk-tabure-tik`, `cubuk-kavrama`. **Saklanan:** çubukları alan elin sahibi. kontrol_kare: kapı iter + sedye ışığa girer (4.8 sn).
- **TAŞ a→b:** *sedye* (yan hareket → merdiven yönü; kamera aynı BODRUM, low angle P07'ye eşitlenir). **TAŞ b→c:** *çubuklar* (Eliasberg'in elinde ışığa çıkan çubuk → tabureye konan çubuk). **TAŞ → P10:** **tasarlanmış kâğıt geçişi** (zaman atlaması Temmuz; el çubukla yukarı kalkar → kâğıt/parşömen kıvrılır; kayıt: yalnız bu bölümde bir kez).

### P10 · HARITA → SALON prova (yaz) · tempo **nefes** · LS-D5
- **P10a (0–1.9) Duygu:** umut. WS · bird's-eye · **slow pan** (uçağı izler, `kamera_takip`) · 35 mm · deep: P02 haritası; küçük uçak siluetleri halkanın üstünden şehre iner (model nötr). **Yazı:** Temmuz 1942. Parşömen sıcak yaz ışığı. Ön: parşömen kıvrık köşe.
- **P10b (1.9–4.03) Duygu:** önem, sorumluluk. MCU–INSERT · eye level · **dolly in çok yavaş** (P02b sehpa kadrajına eşleşir) · 50 mm · shallow (sehpa+defter net) · slow: Eliasberg defteri iki elle koyar, sehpa tablası eğilir, yaylanır, el defterin üstünde 0.6 sn bekler, çeker. Pencereden yaz güneşi (defter kenarında sıcak çizgi); atmosfer: toz. Sehpa+defter+eller y 700–1150. **Alt üçte bir:** sehpa ayakları, zemin tahtası, gölge. **Yazı:** 252 sayfa. **Foley:** `defter-tok`, `sehpa-ahsap-gicir`. **Saklanan:** yok. kontrol: defter teması.
- **TAŞ a→b:** *pencere ışığı yönü* (haritaya düşen sıcak ışık = P10b pencere ışığı). **TAŞ → P11:** *ses* (uzak, alçak top gümbürtüsü kısık başlar; P11 haritasında ortam olarak sürer).

### P11 · HARITA leningrad · tempo **hizli**
- **Duygu:** gerilim → koruma. WS→MWS · bird's-eye (hafif eğik) · **slow push-in + pan** (cs 1.0→1.4, cx şehirden mevzilere) · jib/slider · 35 mm · deep · accelerating→ ease out. Şehir merkezinde Filarmoni ikonu (sıcak halka); sol-alt Sovyet top ikonları (gravür, namlu yukarı, ≥ 150 px); halka dışında Alman bataryaları (nötr işaret; **mermi düşen yer gösterilmez**). Üç salvo: `darbe` (alev + duman, **sarsıntı 0**), duman sonunda oturur. Ön: parşömen kenarı · ışık: masa lambası tek kaynak + namlu alevi ikincil anlık · atmosfer: duman, kâğıt tozu. **Alt üçte bir:** parşömen, halka yayı, duman.
- **Yazı:** 9 Ağustos · konserden önce. **Foley:** `top-uzak-gumbur` ×3 (alçak, kısık), riser/whoosh yok. **Saklanan:** salon vurulacak mı. kontrol: ikinci salvo.
- **TAŞ → P12:** *ışık* (son namlu alevinin sönen sıcak-krem rengi → P12'de karanlık ve ilk filaman); sert kesme değil, aynı ışık ailesi.

### P12 · SALON konser · tempo **hizli** · ★ anahtar · LS-D6 (bölümün patlaması)
- **Duygu:** zafer beklentisi, yükseliş. WS · eye level (arka sıradan) · **crane up + tilt up** (jib, çok yavaş) · 24 mm · deep focus · slow accelerating · neden: ilk sıcak aydınlık geniş kare; kamera ışıkla birlikte yükselir; davulun başındaki kişi kadraj dışında (saklanan). Karanlık (0–0.5) → avize dalgası arkadan sahneye (0.5→1.6), davul kasnağında biter (kasnak + çubuklar ilk parıldar); Eliasberg kolları kalkar (1.5–2.2), manşet kayar; tutma 2.3→sonu (1.2 sn).
- Ön: arka sıra seyirci omuzları (yüzlü, paltolu/üniformalı) y 1100–1290, flu · ışık: avize grubu tek tanım · atmosfer: demette toz. Eliasberg (540, 900 sahne tahtası), sandalyeler sıralı. **Alt üçte bir:** seyirci omuzları, sıra korkulukları, gölge.
- **Yazı:** Filarmoni Büyük Salonu. **Foley:** yok (şalter görünmez); kısık `elektrik-uguldu-amb`, `giysi-hisirti`. **Saklanan:** davulun başındaki kişi. kontrol: dalga kasnakta bitti.
- **TAŞ → P13:** *şekil (daire)* kasnak → hoparlör ağzı, *ses* (müzik filtreli ve uzak: salon → hoparlör EQ'su).

### P13 · SOKAK-LG yaz · tempo **nefes** · LS-D7
- **P13a Duygu:** birlik, sessiz saygı. MLS · eye level · **truck left** (kadını izler, paralaks: ön hoparlör direği/ağaç, orta kadın, arka insanlar başı yukarıda) → push in · 35 mm · deep (hoparlör net) · smooth. Kadın (yüzlü, yorgun, onurlu) kovayla yürür, kovayı koyar, su durulur, başını kaldırır. Kadın boy ≥ %35, kova ≥ %10; ayak y ≤ 1270. Işık: öğleden sonra yaz güneşi sol-arka; hoparlörde kenar ışığı; atmosfer: yaz tozu.
- **P13b Duygu:** uzaklık, yöneliş. MS · **low angle** · **pan right** (hoparlörün baktığı yönde şehrin dışına) · 50 mm · shallow: ikinci hoparlör şehir dışına bakar; Alman siperi çizilmez. **Alt üçte bir:** kaldırım taşı, kova/su yansıması, gölge.
- **Yazı:** radyo ve sokak hoparlörleri. **Foley:** `kova-yere-tak`, `su-sap-kisik`; hoparlör sesi kısık. **Saklanan:** yok. kontrol: kova + su durulması.
- **TAŞ a→b:** *bakış yönü* (kadının yukarı bakışı → hoparlörün baktığı yön). **TAŞ → P14:** *aşağı inen kollar*: kova bırakan kolun hareketi → çalgıcının inen kolları (aynı yön, aynı hız); ışık sıcaklığı sürer.

### P14 · SALON konser · tempo **bekle** · LS-D8
- **Duygu:** fark ediş, şefkat, dayanışma. OTS → MS · eye level · **rack focus** (çalgıcı→koltuk değnekli asker) + hafif **push-in** · tripod+slider · 85 mm · shallow · slow · neden: izleyici gücü tükenenle, onu ayağa kaldıranı aynı kadrajda, odağın yolculuğuyla bağlar. Önce (0–2.0) nefesli çalgıcı OTS omzu ön plan flu, kolları iner, omuzları düşer; rack focus 1.9–2.5 arka sıraya; asker değneğe dayanıp kalkar (yüzü ağır, sakin), yanındaki sivil, sonra sıra sıra (en çok 5 sandalye); çalgıcı çalgısını yeniden kaldırır (bit ≥12 kare önce). Asker (%30–40 ekran, y 600–1200), değnek ucu net. Işık: avize grubu (P12 ile aynı), yüze sıcak yan ışık; atmosfer: toz. **Alt üçte bir:** çalgıcının omzu/çalgı gövdesi (flu), sıra arkalıkları.
- **Foley:** `degnek-tok`, `sandalye-kalkis-gicir` ×5, `giysi-hisirti`; alkış yok. **Saklanan:** sonuna kadar çalabilecekler mi. kontrol: değnek teması.
- **TAŞ → P15:** *yukarı yön*: ayağa kalkan seyircinin yükselişi → P15'te kamera yukarı kayar; ışık aynı avize.

### P15 · SALON konser · tempo **bekle** · ★ anahtar · döngü
- **Duygu:** onur, kapanış/karşılık. CU (eller, P01 ile aynı çerçeve ve lens) → CU yüz · eye level (P01 ile aynı) · **tilt up** (pedestal up çok yavaş, yüz ilk kez görünür 4.4) · 85 mm · shallow · ease out · neden: P01'in sakladığını (yüz) açar; genç, zayıf, gözü notada. Çubuklar iner (tek `davul-vurus`), kalkar; kalkmış çubuklardan **P01'e eşleşen kesme**. Tutma: konuşma sonundan 1.24 sn. Işık: avize sıcak yüze; atmosfer: deriden toz. **Alt üçte bir:** kasnak/deri, toz.
- **Yazı:** Zhavdet Aydarov. **Saklanan:** yok (kapanır). kontrol: yüz görünür.
- **TAŞ → P01:** *çubuklar* (kalkmış çubuklar → P01 f0 inen çubuklar; daire/kasnak aynı).

## 3. Taşıyıcı özeti ve kesme bütçesi
Çıplak kesme: **1** (P03→P04, gerekçeli). Tasarlanmış geçiş: kâğıt (P09→P10) **bir kez**; whip yok. Eşleşen kesmeler: P01→P02, P02→P03, P15→P01. Aynı mekân kamera eşitleme (elle): P04b→P05→P06, P07→P08, P09b↔P07 low angle.

## 4. Ritim
- Süreler (sn): 3.64 · 8.63 · 6.33 · 5.57 · 6.09 · 7.24 · 3.59 · 5.07 · 8.76 · 4.03 · 5.86 · 3.49 · 5.47 · 5.94 · 7.45 (üst üste 5 benzer yok).
- Tempo: hizli · nefes · bekle · hizli · nefes · bekle · nefes · bekle · hizli · nefes · hizli · hizli · nefes · bekle · bekle (üç aynı yok).
- **Dinlenme ≥1 sn:** P06 sonu (5.5→6.45, 1.05 sn, anlatım sürer; resim durur); P08 tutma; P15 tutma. **Patlama:** P12 ışık dalgası (karanlıktan sıcak aydınlığa tek yükseliş; ses de müzik cümlesiyle yükselir).
- Ses dinlenirken resim taşır (P06 sonu, P08 tutma, P12 tutma); resim beklerken satır taşır (P03a, P10b).

## 5. Çeşitlilik kontrolü
- Ölçek+hareket: INSERT locked → WS push → MS truck → INSERT push → WS dolly out → MS static → MWS pan → MWS dolly out → MS→CU crane down → MWS pan down → MS/INSERT/CU dolly zoom → … hiçbir ölçek+hareket çifti üst üste 2'yi geçmiyor.
- **Rack focus:** P06, P14. **Paralaks:** P02b, P12, P13a. **Alçak/yüksek açı:** P03a high, P06 floor, P07 low, P09b low, P13b low. **Dolly zoom:** yalnız P08. Savaş/ölüm: shaky/crash zoom/whip yok, sarsıntı 0.
- **Askerler/şehitler:** asker, seyirci, taşıyıcı, kadın, müzisyen hepsi yüzlü ve onurlu; yüzsüz yalnız P04b tabureye oturan (saklanan, P15 karşılığı) ve P12'de davulcu kadraj dışı.
- İmza nesnesi: davul çubukları en açık/doygun nokta; başka çubuk/sopa biçimi yok (koltuk değneği koyu ahşap, farklı).

## 6. Fizik ve süreklilik
- Kurulum → karşılık: boş tabure (P03b) → P04b/P06/P09c/P15; boş sehpa (P02b) → P10b; çubuklar P06 yerden → P07 elde → P08 sedye ayağı → P09a elde → P09c tabure → P15; harita halkası (P02a) → P10a/P11; Alman bataryaları P11'de kurulur (halka işaretlerinden).
- Giriş/çıkış: Eliasberg merdivenden iner, kapı yukarıda; sedye kapıdan çıkar (kapıyı taşıyıcı iter); askerler kapıdan/sandalye sırasından girer; el çubukları kadrajdan çıkarır. Ayak y ≤ 1280.
- Hareket tamamlanır: tüm hareketler plan sonundan ≥12 kare önce biter (tablo uyarı satırı: yok).
- Mevsim: kar yalnız P03a; P04–P09 mevsimsiz iç (nefes buğusu yalnız P05); P10–P15 yaz.

## 7. kit_eksik (kurulum ekibi iş emri; en çok plan kullanan önce)
| # | Öğe | Planlar (adet) | Not |
|---|---|---|---|
| 1 | **SALON** (`konser`: avize dalgası, seyirci sıraları; `prova`: tek lamba, nötr; P10'da yaz ışığı) + davul/kasnak/tabure | P01, P02b, P03b, P04b, P05, P06, P09c, P10b, P12, P14, P15 (11) | iç mimari kaynaksız (arastirma §5) → nötr; yön karesi önce |
| 2 | **Rig: Eliasberg** (sırt/3-4/yakın yüz, dirijör kolları) + Aydarov el/yüz (yaşlı genç varyant) | P02b, P05, P07, P08, P09, P10b, P12 · P01, P06, P08, P09c, P15 (12) | yakın planda göz kapağı/kaş/ağız |
| 3 | **Props:** çubuk fiziği (düşme, yuvarlanma, tık), davul, tabure, nota sehpası (yaylanma), defter | P01, P03b, P06, P07, P08, P09, P10b, P15 (8) | tabure + çubuk P06'da temas |
| 4 | **Kompars rig'leri** (yüzlü müzisyen, asker, seyirci sırası, sedye taşıyıcı, kadın) + ayağa kalkış | P03b, P04, P05, P09, P12, P13, P14 (7) | "yüzü ve onuru var mı" |
| 5 | **HARITA `leningrad`** (halka, uçak ikonu, top ikonu, salon ikonu; `darbe` sarsıntısız) | P02a, P10a, P11 (3) | mevcut motor, yeni görünüm |
| 6 | **BODRUM** (merdiven, kapı huzmesi tek kaynak, sedye, örtü, el-insert) | P07, P08, P09a–b (3) | huzme gölgeyi türetir |
| 7 | **SOKAK-LG** kış/yaz/kapı (ortak dekor) + hoparlör, kova+su sönümü | P03a, P04a, P13 (3) | dil-nötr, tabela yok |
| 8 | **Kamera teknikleri:** dolly zoom (yalnız P08), rack focus (P06, P14), crane up/down (P06, P12), pan/tilt down/up, plan-içi `devam_plan` | P06, P08, P12, P14 (4) | |
| 9 | Küçük props: ekmek+kırıntı, koltuk değneği, davul vuruş tozu | P03a, P14, P01/P15 | |

## 8. Yön karesi (tek) — öneri
**P12, `kontrol` karesi (p96, "dalga kasnakta bitti")**: SALON `konser` (avize altın, seyirci omuzları ön plan, Eliasberg, kasnakta ilk parıltı). Neden: bölümün ilk sıcak geniş karesi, 11 planın ortak mekânı ve filmin ışık/kimlik dilini belirler; `prova` karanlık hâli aynı salonun ışıksız halidir; yüzlü seyirci/Eliasberg rig'ini aynı karede sınar. Hedef olarak kamu malı dönem gravürü tarifi (Gemini yok).

## 9. bolum.json taslak parametreleri (yazılmadı)
Ortak alanlar: `tempo`, `tasiyici {nesne, aciklama}` (yok ise gerekçe), `saklanan`, `kontrol_kare` (aşağıdaki tablo "kontrol"), `altyazi {acik, bant: "alt"}`, `kamera` anahtarları (cs önerisi aşağıda), `lint {izin: ["anahtar_tutma"]}` P08/P12/P15.
| Plan | sablon / gorunum | parametre özeti | kamera cs (öneri) | dokunus |
|---|---|---|---|---|
| P01 | SALON konser | `davul {yakin}`, `cubuk` 0→1 vuruş, `toz` | 2.6→2.7 + pedestal | — |
| P02 | HARITA leningrad → SALON prova | `halka {bas 18, bit 192, isaret_sayisi}`; `sehpa {bos}`, `Eliasberg arka` | 1.0→1.25; truck cx | — |
| P03 | SOKAK-LG kis → SALON prova | `insert avuc+ekmek`, `kirinti`; `sandalye 15 oturan/boş`, `davul+tabure` | 2.2→2.5; 1.4→1.0 | LS-D1 |
| P04 | SOKAK-LG kapi → SALON prova | `kapi {aralanir 78}`, `calgi_kutusu`; `asker x5`, `tabure_oturan` | 1.0; pan cx | — |
| P05 | SALON prova | `kollar`, `yay_duser 186`, `nefes_bugu`, `sayac {180→15}` | 1.3→1.0 | — |
| P06 | SALON prova | `cubuk {duser 243,252, yuvarlan, tabure_tik 324}`, `rack_focus`, `eliasberg_el {girer 387, alir 408}` | 1.0→2.4 crane down | LS-D2 |
| P07 | BODRUM | `kapi {aralik 10cm}`, `merdiven adim ×4`, `sedye`, `huzme` | 1.0; pan down | LS-D3 |
| P08 | BODRUM (3 kesme) | `el_insert {parmak 102,132}`, `yuz`, `dolly_zoom {177→252, mm 50→28}` | MS 1.0; insert 3.2; yüz dolly zoom | LS-D4 |
| P09 | BODRUM → SALON prova | `sedye {tasiyici ×2}`, `kapi_iter 282`, `cubuk tasima`, `el_alir 438` | truck; tilt up; 2.0 | — |
| P10 | HARITA → SALON prova (yaz) | `ucak {12→102}`, `defter_koy 174`, `sehpa_yaylan` | 1.0; 2.2 dolly | LS-D5 |
| P11 | HARITA leningrad | `top_ikonlari`, `darbe ×3 {192,234,270; sarsinti 0}` | 1.0→1.4 | — |
| P12 | SALON konser | `avize_dalgasi {30→96}`, `kollar {90→132}` | 1.0→1.3 crane up | LS-D6 |
| P13 | SOKAK-LG yaz | `kadin yuru`, `kova {koy 60}`, `su`, `hoparlor ×2` | truck; 1.0 | LS-D7 |
| P14 | SALON konser | `calgici omuz`, `asker_degnek {180}`, `sandalye ×5`, `rack_focus {114→150}` | 2.2→2.5 | LS-D8 |
| P15 | SALON konser | P01 çerçevesi, `tilt_up {180→264}`, `davul_vurus 318` | 2.6 + pedestal | — |

## 10. Kurallar kontrolü / açık notlar
- Her sahnede tek ana hareket; 5 sn'yi aşan planlar (P02, P03, P04b/P05, P06, P09…) kamera hareketi veya plan-içi kesme taşıyor. P05 ve P14 tek çekimde >5 sn (kamera hareketli).
- Senaryo→parametre eşleme: P01–P15 yukarıda; kitte karşılığı olmayanlar kit_eksik. Sapma: P11 top/topçu → harita ikonu (bkz. §1).
- P07 çıplak olmayan geçişler; P12 şalter görünmez → ses yok.
- Orkestraya: (1) P08/P12/P15 uzatması için kurgucu/ses kuyruğu; (2) yön karesi P12; (3) EN'de P09/P11/P15 ses erken biter, resim taşır; (4) P06 sonunda Eliasberg'in elinin çubukları alması senaryoda yok, P07 kurulumu için eklendi.

## 11. Kare / olay tablosu (üretilen: `python3 -I bolumler/leningrad-senfoni/zaman_tablo.py`)
60 fps; plan-içi kare p; mutlak = plan başı + p; "temas" = foley karesi; uyarı satırı yok.

| Plan | Mutlak kare | Süre sn (kare) | Olaylar (plan-içi kare p) |
|---|---|---|---|
| P01 | 0–217 | 3.64 (218) | davul-vurus 9 · cubuk-kalkis-bit 54 · yazi LENINGRAD 0 · yazi-bit 192 · kontrol 9 |
| P02 | 218–735 | 8.63 (518) | halka-kapanir bas 18 · halka-kapanir bit 192 · KESME a>b 231 · yazi Eliasberg 234 · yazi Sostakovic 330 · truck-sag bas 231 · kontrol 300 |
| P03 | 736–1115 | 6.33 (380) | kirinti-duser 54 · el-kirinti-toplar 114 · avuc-kapanir bit 162 · KESME a>b 186 · yazi-1 (kis/ekmek) 18 · yazi-2 (40>15) 198 · dolly-out bas 186 · kontrol 114 |
| P04 | 1116–1449 | 5.57 (334) | kapi-vurus-1 21 · kapi-vurus-2 42 · kapi-aralanir 78 · el-calgi-kutusu-cikar 102 · KESME a>b 156 · askerler-girer 168 · tabureye-oturur 264 · yazi 180 · kontrol 120 |
| P05 | 1450–1814 | 6.09 (365) | kollar-kalkar 18 · yay-duser(temas) 186 · bas-egilir 210 · calgi-iner 240 · kollar-iner bit 318 · sayac 180>15 168 · kontrol 234 |
| P06 | 1815–2248 | 7.24 (434) | crane-down bas 144 · crane-down bit 216 · cubuk-1-duser(temas) 243 · cubuk-2-duser(temas) 252 · cubuk-yuvarlanir 258 · rack-focus bas 294 · tabure-tik(temas) 324 · DINLENME bas 330 · el-girer(Eliasberg) 387 · cubuk-alinir(temas) 408 · el-cikar bit 420 · yazi 180 · kontrol 324 |
| P07 | 2249–2463 | 3.59 (215) | kapi-mentese 24 · kapi-aralik-tok 54 · adim-1 42 · adim-2 60 · adim-3 78 · adim-4 96 · pan-down bas 60 · durur 126 · bas-egilir 144 · yazi 12 · kontrol 156 |
| P08 | 2464–2767 | 5.07 (304) | cubuk-birak(temas) 42 · KESME >insert 60 · parmak-1(temas) 102 · parmak-2(temas) 132 · KESME >yuz 174 · dollyzoom bas 177 · dollyzoom bit 252 · TUTMA bas 252 · kontrol-1 parmak 114 · kontrol-2 yuz 216 |
| P09 | 2768–3293 | 8.76 (526) | cubuk-alir(temas) 24 · sedye-kalkar(temas) 84 · KESME A>B 180 · adim-1 204 · adim-2 228 · adim-3 252 · kapi-itilir(menteşe) 282 · sedye-isiga-girer 300 · yazi hastane 240 · KESME B>C 348 · cubuk-tabureye(temas) 378 · el-cubuk-kavrar(temas) 438 · el-cikar bit 504 · kontrol 288 |
| P10 | 3294–3535 | 4.03 (242) | ucak-giris bas 12 · ucak-iner bit 102 · KESME a>b 114 · defter-tok(temas) 174 · sehpa-yaylanir 174 · el-bekler bit 216 · yazi Temmuz 1942 6 · yazi 252 sayfa 132 · kontrol 180 |
| P11 | 3536–3887 | 5.86 (352) | salon-isareti 18 · pan bas 60 · alman-bataryalari-gorunur 108 · salvo-1(darbe) 192 · salvo-2(darbe) 234 · salvo-3(darbe) 270 · duman-oturur 330 · yazi 12 · kontrol 234 |
| P12 | 3888–4096 | 3.49 (209) | karanlik 0 · isik-dalgasi bas 30 · dalga-kasnakta bitti 96 · kollar-kalkar 90 · kollar-yukarida bit 132 · TUTMA bas 138 · yazi 24 · kontrol 96 |
| P13 | 4097–4424 | 5.47 (328) | kova-koy(temas) 60 · su-durulur bit 132 · baş-kalkar 120 · KESME a>b 180 · pan-sag bas 180 · yazi 48 · kontrol 96 |
| P14 | 4425–4780 | 5.94 (356) | omuz-duser 36 · rack-focus bas 114 · rack-focus bit 150 · degnek-tok(temas) 180 · sandalye-1 198 · sandalye-2 216 · sandalye-3 234 · sandalye-4 249 · sandalye-5 264 · calgi-kalkar bit 318 · kontrol 192 |
| P15 | 4781–5227 | 7.45 (447) | tilt-up bas 180 · yuz-gorunur 264 · davul-vurus(temas) 318 · cubuk-kalkar bit 378 · TUTMA bas 378 · yazi Aydarov 264 · kontrol 276 |
