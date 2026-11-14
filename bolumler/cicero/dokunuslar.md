# Dokunuşlar — Çiçero (Ankara 1943–44)

Girdi: `senaryo.md` (kilitli, dokunulmadı), `arastirma.md`, `src/kit/DOKUNUS-KUTUPHANESI.md`. Kitte 1940'lar yok; aşağıdaki prop/jestler **kurulum ekibine** yeni, basit, parametrik parçalardır (bkz. "Kit işi").
Sayım: **7 dokunuş** (P02, P03, P04, P06, P07, P08, P09). P01 (banknot kayar) ve P10 (banknot ışığa tutulur, eşleşen kesme) kanca/kapanış; bu sayıma girmez. P05 bilerek dokunuşsuz (4.8 sn, film kutusu–zarf değişimi ana eylem; kural: her plana zorunlu değil).
Zaman = filmin mutlak saniyesi. Her dokunuş kendi planında başlar ve biter; animasyon plan sonundan ≥0.2 sn (12 kare @60) önce tamamlanır.
Savaş konusu: riser/whoosh yok; yalnız temas foley'i, seviye −5/−9 dB, anlatımı bastırmaz. Foley dosyaları `bolumler/cicero/foley/` altına üretilecek (`tools/sfx.mjs`); adlar planlıdır, dosyalar henüz yok.

## Özet tablo

| plan | dokunuş | sn | bağlı eylem | foley |
|---|---|---|---|---|
| P02 | Anahtarı komodine bırakma (kutu kilitlenir) | 8.6–11.4 | Elçi kutuyu kilitler, anahtarı bırakır, banyoya gider | `cic_kutu_kilit_tik`, `cic_anahtar_komodin_cin`, `cic_banyo_kapi_kapanis` |
| P03 | Mum izi, yarım kalan anahtar çizimi | 15.4–19.4 | Bazna anahtarı muma bastırır | `cic_mum_bas_yumusak`, `cic_cizgi_kalem_hafif` |
| P04 | Kapı altında ayak gölgesi: elçi kapıya yaklaşır, Bazna donar | 23.2–25.0 | Belgeler yatakta çekilirken banyo suyu kesilir | `cic_su_kesilir`, `cic_terlik_adim_x3`, `cic_su_tekrar` |
| P06 | Dolu çekmece, dosya üste atılır, kapanışta sıkışan köşe | 33.6–36.8 | Berlin'in eli ikinci dosyayı çekmeceye iter | `cic_cekmece_kayma`, `cic_dosya_at_hisirti`, `cic_cekmece_tok` |
| P07 | Banknot sayma (bakmadan) + iki aynı banknot, çarpı | 38.9–45.0 | Bazna zarfı açar ve sayar | `cic_zarf_ac`, `cic_banknot_dokul`, `cic_banknot_say`, `cic_carpi_firca` |
| P08 | Yetkili bakmadan çay fincanını alır | 47.0–49.4 | Uşak tepsiyle yetkilinin arkasından geçer | `cic_fincan_tin`, `cic_adim_hafif` |
| P09 | Lamba sönerken filaman kızarır, oda kararır | 55.8–57.0 | Bazna makineyi çekmeceye koyar ve lambayı söndürür | `cic_cekmece_kucuk`, `cic_lamba_dugme_tik` |

## Ayrıntı

### P02 · ANAHTAR KOMODİNDE (8.6–11.4)
- **Tarif:** Elçi (sırtı bize) kutu kapağını kapatıp anahtarı çevirir, anahtarı komodine bırakır ve banyoya yürür; kamera kutu + komodinde 2.8 sn kalır, anahtar komodinde net durur.
- **Sebep-sonuç / karakter:** Anahtarın yerinde bırakılması P03'ü mümkün kılar (kurulum: komodin anahtarı). Elçinin rahatlığı ve güveni: yaşlı, kayıtsız, uşağa arkasını döner. Bazna tepsiyle kapıda hareketsiz bekler, bakışı anahtara bir kez kayar (jest yok, yalnız baş yönü).
- **Okunurluk:** insert/yakın: kutu kapağı + anahtar + komodin kadrajı; anahtar ekran yüksekliğinin ≥%10'u (kamera push-in, katalog sınırı içinde). Anahtar komodinde net ≥1.2 sn (10.0–11.4). Göz yönlendirme: elçi dışında diğer hareketler durur; sıcak kenar ışığı anahtarda.
- **Foley:** kutu kilidi tık (8.9), anahtar bırakma metal çın (9.8, kısık), banyo kapısı kapanış (11.6, plan içinde, dokunuş sonrası). Kapı altı ışık çizgisi 11.8 (senaryo kurulumu).
- **Kendi planında:** başlar 8.6, biter 11.4; plan 13.8.

### P03 · MUM İZİ (15.4–19.4)
- **Tarif:** Bazna bal rengi mumu avucuna alıp elçinin anahtarını bastırır; mumda anahtarın kabartma izi kalır; iz üstünde ince bir anahtar çizimi kendini çizer ve yarıda durur (senaryo: "saklanan şey").
- **Sebep-sonuç / karakter:** Kutu kilitli sorusunun cevabı; Bazna'nın eli sakin, ölçülü (ürkek değil, planlı). Ekran "Kaynak: Bazna ve Moyzisch'in kendi anlatısı" (anlatıya göre).
- **Okunurluk (küçük jest = yakın kamera):** insert, el + mum ekran yüksekliğinin ≥%25'i (el ≥%12 koşulu aşılır); iz ≥%14. Net iz ≥1.5 sn (16.3–17.9). Banyo suyu sesi kısık ortam; başka hareket yok.
- **Foley:** mum bası yumuşak (15.9), çizim çizgisi hafif kalem (17.0–18.2, kısık). Su sesi görünmeyen kaynak = yalnız çok kısık ortam.
- **Başlar-biter:** çizim 18.2'de yarıda durur ve yarım şekilde 1.0 sn tutulur (bilinçli askıda; `lint: izin hareket-tamamlanma, not: yarım çizim senaryo saklanan şeyi`). Plan sonu 20.6, animasyon 18.2'de durmuş (≥0.2 sn marj).
- **Dönem notu:** mum izi yalnız "anlatıya göre" (çelişki 6); mum rengi bal, beyaz değil.

### P04 · KAPI ALTINDA AYAK GÖLGESİ (23.2–25.0)
- **Tarif:** Belgeler yatakta çekilirken banyodaki su kesilir; kapı altındaki sıcak ışık şeridinde iki ayak gölgesi kapıya yaklaşır, durur; Bazna belgenin üstünde donar; gölgeler geri çekilir, su yeniden akar.
- **Sebep-sonuç / karakter:** "Elçi dönmeden" baskısını görselleştirir; ardından Bazna belgeleri toplar, film kutusu cebe girer (senaryo karşılığı). Bazna'yı anlatır: soğukkanlı, yerinden kıpırdamaz, yalnız nefesini tutar.
- **Okunurluk:** kısa insert (kapı alt kenarı + yere düşen ışık şeridi), şerit ekran yüksekliğinin ≥%10'u (kadraj kapıyı kırpıp zemini doldurur). Gölgeler net ≥1.0 sn (23.8–24.8). Dokunuş anında lamba ışığı kısık, Bazna hareketsiz (diğer hareketler durur).
- **Foley:** su kesilir (23.2), 3 terlik adımı (23.4–23.8, kısık), sessizlik 1.0 sn, su yeniden (24.9). Görünen kapı-altı gölgesi = görünür kaynak, ses meşru.
- **Not (yönetmen):** P04 6.2 sn ve kalabalık; kutu açma/kopya anahtar ilk 2.4 sn'ye sıkışır, toplama 25.0–26.4. Sıkışma kaçınılmazsa dokunuş öncelikli, toplama jesti kısaltılır.
- **Işık:** şerit sıcak kehribar (saf beyaz yok), tek kaynak = banyo lambası; yatak odasındaki masa lambasından ayrı kaynak, her biri kendi havuzunu düşürür.

### P06 · DOLU ÇEKMECE, SIKIŞAN KÖŞE (33.6–36.8)
- **Tarif:** Berlin masasında eller ikinci dosyayı açılmış çekmeceye atar; çekmecede ince, okunmamış dosya yığını var; çekmece itilip kapanır ve kapanışta dosyanın bir köşesi ağızda sıkışıp dışarıda kalır; kamera orada bekler.
- **Sebep-sonuç / karakter:** "Çoğunu kullanmadı" cümlesinin görselidir; Berlin'in umursamazlığı (atma, ittirme, düzeltmeme). Sıkışan köşe "düzgün kaldırılmadı" ironisi.
- **Okunurluk:** çekmece ekran yüksekliğinin ≥%20'si (kamera push-in 34.8–35.8); sıkışan köşe net 1.0 sn + anlatım payı (36.0–37.4). Normandiya dairesi haritada kadrajın üst yarısında kalır (P06 kurulumu).
- **Foley:** çekmece ahşap kayma (34.6), dosya atma kâğıt hışırtısı (35.0, kısık), tok kapanış (35.9). Whoosh yok.
- **Başlar-biter:** çekmece 36.0'da kapanır, köşe sabit; plan 38.4.
- **Not:** anahtar/kilit yok (P02–P03 anahtar dokunuşu tekrar edilmez).

### P07 · BAKMADAN SAYILAN PARA, İKİ AYNI BANKNOT, ÇARPI (38.9–45.0)
- **Tarif:** Bazna zarfı açar, beyaz banknotlar masaya dökülür, parmakları banknotlara bakmadan hızla sayar; kamera iki banknota girer, ikisi birebir aynı, kamera ikisi arasında gidip gelir; sonra birinin köşesine iki fırça vuruşuyla küçük kırmızı çarpı çizilir.
- **Sebep-sonuç / karakter:** P05'te açılmayan zarfın karşılığı; Bazna'nın ihmali: yüzüne hiç bakmadan sayar (sahteyi bilmiyor, aç gözlü ve aceleci). Çarpıyı kimse çizmez, anlatıcı vurgusu (dil-nötr işaret).
- **Okunurluk:** insert, banknotlar ekran yüksekliğinin ≥%30'u, çarpı ≥%10 ve net ≥1.0 sn (44.2–45.2; çizim biter 44.2, plan sonu 45.4). Kamera gidiş-gelişte diğer hareket yok.
- **Foley:** zarf açma (39.0), banknot dökülme (39.6), sayma hışırtısı (40.6–41.8), çarpı fırça (43.8–44.2, çok kısık). Whoosh yok.
- **İmza nesnesi:** banknot sahnenin en parlak ve en doygun-beyaz-sıcak noktası (L* en yüksek); zarf ve masa mat, düşük parlaklık, kraft/tütün tonu; fincan, belge, mum, film kutusu beyaz değil. Çarpı küçük kırmızı vurgu, alan ≤ banknot yüzünün %8, tek kullanım.
- **Dönem notu:** "white fiver" görünüm: portre yok, tek yüz siyah mürekkep, arka boş, rakam yok.

### P08 · BAKMADAN ALINAN FİNCAN (47.0–49.4)
- **Tarif:** İngiliz yetkili çenesinde elle açık kutuya bakarken, arkasından geçen Bazna'nın tepsisine bakmadan öbür elini uzatıp çay fincanını alır; Bazna durmadan geçer, kadrajdan çıkar; yetkili fincanı elinde tutarak kutuya bakmaya devam eder.
- **Sebep-sonuç / karakter:** "Sızdıranı bulamıyordu"nun görselidir: uşak göz önünde, ama görünmez. Bazna sırtı dönük, yüzü hiç görünmez (senaryo). Sözle iddia yok, yalnız ima (tek kaynaklı "uşak aptal" cümlesine girmeden).
- **Okunurluk:** bel plan; yetkilinin uzanan eli + fincan ekran yüksekliğinin ≥%12'si (kamera bel planda, yetkili ve tepsi kadrajın ön yarısında). Net ≥1.2 sn (47.6–48.8).
- **Foley:** fincanın tabakta tek "tın" (47.9), hafif ayakkabı adımı (kısık). Whoosh yok.
- **İmza nesnesi:** fincan ve tabak beyaz porselen **olmaz** (koyu mavi emaye ya da bakır); tepsi koyu metal.
- **Başlar-biter:** Bazna 49.6'ya dek kadrajdan çıkar (hareket P08'de tamamlanır); plan 51.6.

### P09 · LAMBA SÖNER (55.8–57.0)
- **Tarif:** Bazna fotoğraf makinesini çekmeceye koyar, lambaya uzanır, düğmeyi çevirir; filaman bir an kızıl parlar ve söner, oda mavi gece ışığına kalır, Bazna siluet.
- **Sebep-sonuç / karakter:** P04'te kurulan lambanın karşılığı; "işi bıraktı"nın görseli. Bazna'nın tek eylemi, telaşsız ve kesin (korkusu kararlı, panik değil). Lamba P10'da yeniden yanar (döngü bağı).
- **Okunurluk:** göğüs/bel plan; lamba ekran yüksekliğinin ≥%12'si; ışık havuzu daralır (kontrast kendiliğinden göz çeker). Filaman net 1.0 sn (55.8–56.8), kararma 56.0–56.9. Tam siyah yok: pencereden tek soluk mavi gece kaynağı.
- **Foley:** çekmece küçük kapanış (55.2), lamba düğmesi tık (56.0). Whoosh/riser yok; kararma sessizdir.
- **Başlar-biter:** 57.0'da tamamlanır, plan 57.8. P09a (sekreter kaçışı) ayrı eylem, dokunuş değil.

## Tekrar kontrolü
- Mekanizmalar birbirinden ayrı: anahtar (P02), mum (P03), ışık/gölge (P04), çekmece (P06), banknot/çarpı (P07), fincan (P08), lamba (P09). Çekmece P09'da da geçer ama yalnız küçük ev eylemi (dokunuş değil, foley var).
- P01 banknot kayması ve P10 banknot ışığa tutma kanca/kapanıştır; P07 çarpısıyla farklı jest.
- Kanal kütüphanesinde bu mekanizmalar daha önce yok (kontrol edildi: Blanc, Paris).
- Beyaz banknot dışında hiçbir nesne beyaz/parlak değil: belgeler sarımsı-gri, mum bal, zarf kraft, film kutusu siyah, fincan emaye.
- Dönem/fizik: gece planlarında telgraf yok (konu dışı); P04/P09 lambaları tek kaynak; mum iz yalnız "anlatıya göre"; flaş yok (1943 kamera + lamba ışığı).

## Kit işi (kurulum ekibine, 1940'lar kiti)
`anahtar` + `kutu.kilit` (P02) · `komodin` (P02) · `mum {iz, cizim.yarim}` (P03) · `kapiAltiIsik {golge: [ayak], su}` (P04) · `cekmece {yigin, dosya.atis, kose.sikisma}` (P06) · `zarf {ac}` + `banknot {dok, say, carpi}` (P07) · `fincan` + `tepsi` + `el.uzat-bakmadan` (P08) · `lamba {son, filaman}` + `makine` (P09). Hepsi **yok**, basit vektör şekil; parametre isimleri yönetmen `bolum.json` için taslak.
