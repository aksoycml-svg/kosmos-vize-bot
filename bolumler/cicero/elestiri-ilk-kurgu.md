# Çiçero · ilk kurgu · eleştirmen (günlük mod, tek tur) · 2026-11-15

Girdi: `out/cicero/cicero-tr.mp4` / `cicero-en.mp4` (64.83 sn, 60 fps), genel32, KK_*. Hareket şeritleri: P02 kapı (kare 636–696 ve 670–685 kare kare), P04 ayak gölgesi (1437–1497), P09a araba (3236–3324). Ek şerit: P04 kapanış (1541–1589). Ses: RMS 100 ms pencere, ebur128 (TR I −14.0 LUFS, tepe −1.9 dBFS ✓).

## Altı soru
1. **Kanca (0.0–2.0 sn):** El banknotu kaydırıyor, hareket var; ama telefonda not "beyaz kâğıt" gibi okunuyor, ilk merakı yazı ("Bir uşak") taşıyor. Orta.
2. **Doruk (P07, ~44.5 sn):** Büyük kırmızı çarpı okunuyor; ancak hemen öncesinde altyazıda kırmızı "sahteydi" ve tüm filmdeki ~20 kırmızı kelime çarpının tekilliğini zayıflatıyor.
3. **Jenerik/AI kare (52.0–55.5 sn, P09a):** Düz ızgara pencereli cephe ve küçük araba; sekreter ~70 px, telefonda nokta. Ayrıca 40.3–40.8 sn sayaç "~225.638 £ / ~265.652 £" (tilde + kesin rakam).
4. **En zayıf 5 sn (51.6–56.0 sn, P09a):** "Sekreter kaçtı" vuruşu görüntüde okunmuyor, yalnız anlatım taşıyor.
5. **Üç büyük kesme:** P05→P06 30.8 sn: kesmeden önce 0.5 sn −45/−50 dBFS, sonra −16/−11 (boşluk + sıçrama). P06→P07 40.0 sn: −42 → −12, aynı desen. P09→P10 58.3 sn: −50 → −13. Müzik dosyası ilk yarıda ≈−30 LUFS, aralarda sessizlik gibi duruyor. EN'de 4.85–6.05 sn (kanca içinde) ve 61.7–63.55 sn (P10 tutması) −45 dBFS altında; kulakla bakılacak.
6. **AI gibi duran okuma (40.3–40.8 sn):** Sayaç ara değerleri ("~265.652 £") hem yapay hem doğruluk dışı kesinlik veriyor. Anlatımda AI kelimesi bulunmadı.

## Orkestra notları
- **Kırmızı altyazı kelimeleri:** DOĞRULANDI. 10 planın 10'unda iki katmanda kırmızı var (≈20 kelime). "Kırmızı yalnız vurgu" kuralı teknik olarak delinmiyor. Ama "Filmleri", "yerine", "ELÇİ", "ANLATISI" ve "1944" anlam vurgusu taşımıyor. P07'deki kırmızı çarpı bu yüzden "bir kırmızı daha" gibi okunuyor.
- **P07 sayaç:** DOĞRULANDI (`sayac.sure 100`, kit yuvarlamıyor; ara değerler 2420–2460. karelerde).
- **P02 "ELÇİ" kırmızısı:** DOĞRULANDI. Üstelik `zemin:"koyu"` (şeritsiz beyaz yazı) lamba V huzmesinin üstüne biniyor; kırmızı açık zeminde kayboluyor.

## En çok 3 düzeltme (önem sırasıyla)
1. **Ekran yazısı okunmuyor (P02, P03, P04, P10).** `zemin:"koyu"` şeritsiz beyaz yazı, lamba V huzmesi ve abajurun üstünde kırılıyor. 360 px'te "KNATCHBULL", "KAYNAK: BAZNA" ve "ALMANYA'NIN" okunmuyor. Kaynak etiketleri doğruluğu taşıdığı için önemli.
   - Sahibi: yönetmen.
   - Parametre: `bolum.json` → P02/P03/P04/P10 `ekran_yazisi[].zemin` alanını sil (kâğıt şerit).
   - Yeniden render: **yazı katmanı** (TR+EN).
2. **Kırmızı enflasyonu.**
   - Sahibi: yönetmen.
   - Parametre: tüm planlarda `altyazi.vurgu.tr/en` = `[]`, yalnız P01 `sahte`/`fake` ve P10 `Almanlar`/`Germans` kalsın. `ekran_yazisi[].vurgu` yalnız P06 `TUZAK` ve P10 `BERNHARD` için kalsın; P01, P02, P03, P04, P05, P08 ve P09'da silinsin. P07'de kırmızı yalnız çarpıda olsun.
   - Yeniden render: **yazı katmanı**.
3. **P07 sayaç.**
   - Sahibi: yönetmen.
   - Parametre: P07 `ekran_yazisi[0]`: `tur:"iddia"`, `metin:"SÖZDE ~300.000 £ · ÇOĞU SAHTE"` / `en:"SO-CALLED ~£300,000 · MOSTLY FAKE"`, `sayac` sil. Kitte yuvarlama parametresi yok; yeni kod gerekmez.
   - Yeniden render: **yazı katmanı**.

## 3 sınırı dışında: KRİTİK (fizik/süreklilik)
- **P04 25.8–26.6 sn (kare 1549–1590):** Fotoğraf makinesi elden kayboluyor (p328). Belgeler yataktan havada süzülüp kutuya giriyor, kutu kapağı kendi kendine kapanıyor; Bazna bu sırada kolu boşta, uzakta duruyor. Nesne kendiliğinden hareket ediyor, hareket tamamlanmıyor.
   - Neden: `kit_eksik` (kutu kapatma eli, makine cebe giriş jesti yok), ama prop yolları yine de oynatılmış.
   - Düzeltme: yönetmen, P04 `kamera` p310→p340 sağa (banyo kapısına, ör. `cx +250`, `cs 1.3→1.45`) yapılsın; komodin kadraj dışında kalsın. p328–358 aralığındaki belge/kapak prop hareketi görünmesin, `cic_belge_kutu_hisirti`/`cic_kutu_kapak_tok` kadraj dışı kısık (−6 dB) çalsın.
   - Yeniden render: **görüntü** (yalnız P04) ve **ses**.

## Notlar (düzeltme listesine girmedi)
- **23.97 sn (kare 1438):** Altyazı grubu "sonra her" aynı kelimelerle üst banttan alt banda sıçrıyor (`altyazi.bant:"oto"` kare başına karar veriyor). Öneri: plan başına sabit bant.
- **P02 11.3 sn (kare 677–681):** Elçinin yürüyüşü tek karede ayakta poza geçiyor, kapı 5 karede çarpıyor. Kapanış foley'i p246 (kare 684), kapı ~681'de kapalı; 3 kare geç.
- **P04 ayak gölgesi (24.0–24.6 sn):** Kapı altında iki koyu kama görünüyor, telefonda ~30 px; okunuyor ✓.
- **P09a araba:** Kadrajdan sola tam çıkıyor ✓. Sekreter okunmuyor (soru 4).
- **Lamba V huzmesi:** P04'te boyun yatağa bükülünce mekanlar.md §0.5'e göre V'nin yatması gerekiyordu; render'da V dikey kalıyor. P04 kontrol karesinde abajur ağzı sola-aşağı bakarken huzme tavana çıkıyor. Mekân sorumlusu/motion bakmalı (kurulum işi, bu tur değil).

## Puan: **6 (düzgün)**
