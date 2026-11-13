# Paris kuşatması — toplu düzeltme listesi (2026-11-13)
Kaynak: kalibrasyon V4, B3, C2, C3, C4 `elestiri.md`; notlar tur-9, tur-15, tur-16. Sahibi: M = motion (kod), Y = yönetmen (json), K = kurgucu. Öncelik: K kritik, O orta, k küçük.
Durum: **yapıldı** = json'a işlendi (render kanıtı `kalibrasyon/T/yonetmen/`); **kit_eksik** = json tarafı hazır, kod bekliyor.

| # | Plan | Kare | Sorun | Sahibi | Parametre / dosya | Ö | Durum |
|---|---|---|---|---|---|---|---|
| 1 | P10 | f212–262 | Memur-3 kalkışı başsız levha, 0.27 sn, zarf yok | Y+M | `memur3_kalkis` bas 212/bit 262 (50 kare), `tepe_y_hedef` 1310, `egim_derece`, `zarf_gorunur` f200–262 (62 kare) | K | **json yapıldı**; kod: `LanternOda.tsx` satır ~202 baş tepesi 973 sabit, zarf çizilmiyor → **KE-PK-O1 (motion)** |
| 2 | P07 B | f186–252 | Ön kol rime dayalı, dirsek aşağı; gövde ön rime +0.3 m; torba 4 kilidi | Y onay + M | `devam_plan.parametreler.on_kol_onay` | O | onay **yapıldı**; kod `govde_on_m` → KE-PK-O2 (motion) |
| 3 | P05 | f280 | Şerit kenarı parmağa değiyor, alt ucu elin altına giriyor | M | `parmak.yan_ofset_m` 0.055 (json'a yazıldı); `DagronInsert.tsx` ~442 `n*0.034` sabit | O | json yalnız parametre; ölçü bölgesi P06 eşleşmesi kilitli → KE-PK-O3 (motion) |
| 4 | P07 | f112–156 | Delik konumu kuralı json notunda yok | Y | `darbe[0].delik_kurali` | k | **yapıldı** |
| 5 | P10 | f84, f200 | Lantern + levha yuvası (1018,998) + temas eli x > 920 (IG sütunu); lantern ≥100 px sola, sonra baş açıklığı yeniden ölç | M | `LanternOda.tsx` `LN.*` | O | motion |
| 6 | P10 | f200 | Huzme dikey yarıktan çıkıyor; mercek tüpü yok | M | `LN.mercek` + tüp | O | motion |
| 7 | P10 | f84 | Levhayı tutan el topak, parmak yok (5 ile) | M | `LanternOda.tsx` el | k | motion |
| 8 | P10 | f48 | Gökte y ~440/640/745 yatay şerit izleri | M | `GokLitografi`; lint.izin'de yok | k | motion |
| 9 | P01/P10/P11 | f24 (P01) | Koyu kılıf ipi (`ipStil:"koyu"`) yalnız P09'da; orkestra kararı: uygula. Kanca karesinde kılıf okunurluğu korunmalı (P01 f0/f24 kılıf ≈195 px, ΔE) | M | `Guvercin.tsx`/`ParisCati.tsx` kilif.ipStil; P01 f24 değişir | O | motion (kod) |
| 10 | P05 | f0 | Terazi dengesi | — | — | — | **kalır** (tur-16: sorulmaz) |
| 11 | P05 | f280 | Parmak ucu "kapak" yuvarlakları; tarak tarama `butce.avuc` 6→3 | M | `GravurEl.tsx` | k | motion |
| 12 | P05 | f280 | Parmak gölgesi kamera kutusu ön yüzüne taşıyor (x 590–640,y 650–780) | M | `DagronInsert.tsx` gölge maskesi | k | motion |
| 13 | P09 | f150 | El kuşu taşımıyor, yanında; kuyruk yelpazesi üstten görünüyor | M | `DagronInsert.tsx` Tours el/kuş, kuyruk poz | O | motion |
| 14 | P10 | f330 | Uzak elde üç küt parmak ucu mandal gibi | M | `GravurEl` okuyan poz | k | motion (başparmak kabul) |
| 15 | P10 | f200 | Sol duvarda küçük açık dikdörtgen | — | ip mandalı çizildi (C3 motion) | — | kapandı |
| 16 | P06b | f216–287 | El şapka hizasında ("selam"); tutunma noktası başın ≥1 baş genişliği solunda, h 1.60–1.65, gövde sağa 0.2 | M | MONTMARTRE biniş IK | O | motion (B3 #1) |
| 17 | P06b | f224–240 | Kalkan bacak dizsiz, ayaksız kütük; pantolon bir ton koyu, diz ≥70°, f226 bot | M | MONTMARTRE kompars bacağı | O | motion (B3 #2) |
| 18 | P07 | f112–156 | Delik: beyaz nokta kalksın, kontur yırtık, krem iç kenar | M | MONTMARTRE darbe delik | O | motion (B3 #3) |
| 19 | P07 | f116–156 | İz parçaları ayrık yaprak → tek duman şeridi | M | `duman_cizgisi` segment/opaklık | k | motion |
| 20 | P06b/P07 | gök | Hale arkası tarama ×0.6; P07 A üst bant sert kenar (y≈105 @360) | M | `GokBasamak` | k | motion |
| 21 | P06b | f218 | "El halatı kavrar" foley (−6 dB'den kısık); sepet tabanı alt bantta `lint.izin` | K | foley.json | k | kurgucu |
| 22 | P01 | f370 (V4) | Panthéon'a küçük haç (tur-9 varsayılanı, E3 orta güven); kubbe tepesi ≈ (835,430); 360'ta okunmazsa nötr | M | `catiDekor` Panthéon | k | motion |
| 23 | P01/P10 | gök y 350–600 | Tane şeritleri 1080'de kir gibi | M | `GokLitografi` tane yoğunluğu ↓ | k | motion |
| 24 | P01 | f370 | Kümes "devrilen kulübe": `KUMES_V2.sacak` farkı 0.2→0.1 | M | `catiDekor` | k | motion |
| 25 | P01 | f370 | Sol orta (x 0–430,y 640–900) lucarne'sız boş blok: `lucYok` 0.25→0.15 | M | `catiDekor` K3 | k | motion |
| 26 | P01/P10 | kuş | Kuyruk bantları düz dikdörtgen; tüy ucunu izlesin | M | `Guvercin.tsx` | k | motion |
| 27 | P10 | f330 | Elin sırtında açık tendon çizgileri; kontrast ↓ | M | `KolEl` | k | motion |
| 28 | P01 | f370 | Birimler hedefe göre küçük/sık; kuyruk bantları (V4 küçük) | M | `catiDekor` ölçek | k | motion (22–27 ile birlikte) |

## Sayım
- Yönetmen/json: #1 (süre+hedef), #2 onay, #3 parametre, #4 → bu turda işlendi.
- Motion'a kalan: 24 satır (#1 kod O1, #2 O2, #3 O3, #5–9, #11–14, #16–20, #22–28); kritik #1, orta #2 #3 #5 #6 #9 #13 #16 #17 #18. Kurgucu: #21 (1). Kapandı/kalır: #10, #15.
