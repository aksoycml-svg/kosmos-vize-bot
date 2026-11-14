# Paris kuşatması — toplu düzeltme listesi (2026-11-13)
Kaynak: kalibrasyon V4, B3, C2, C3, C4 `elestiri.md`; notlar tur-9, tur-15, tur-16. Sahibi: M = motion (kod), Y = yönetmen (json), K = kurgucu. Öncelik: K kritik, O orta, k küçük.
Durum: **yapıldı** = json'a işlendi (render kanıtı `kalibrasyon/T/yonetmen/`); **kit_eksik** = json tarafı hazır, kod bekliyor.

| # | Plan | Kare | Sorun | Sahibi | Parametre / dosya | Ö | Durum |
|---|---|---|---|---|---|---|---|
| 1 | P10 | f212–262 | Memur-3 kalkışı başsız levha, 0.27 sn, zarf yok | Y+M | `memur3_kalkis` bas 212/bit 262 (50 kare), `tepe_y_hedef` 1310, `egim_derece`, `zarf_gorunur` f200–262 (62 kare) | K | **json yapıldı**; kod **yapıldı (motion T)**: LanternOda memur-3 eğik kalkış (kalça pivotu, `egim_derece` 38 / `tepe_y_hedef` 1310 json'dan), bacak+kalça, zarf sol elde f200'den; çıkış f262 (zarf ≈ f254'e dek kadrajda ≈ 0.9 sn — memur x 860 kenara 0.34 m) · `kalibrasyon/T/P10-serit-f200-268.png` |
| 2 | P07 B | f186–252 | Ön kol rime dayalı, dirsek aşağı; gövde ön rime +0.3 m; torba 4 kilidi | Y onay + M | `devam_plan.parametreler.on_kol_onay` | O | onay **yapıldı**; kod **yapıldı (motion T)**: `govde_on_m` 0.3 (vars.), kalça 0.2 m; kol x ≤ 1000 (torba 4 kilidi korunur) · `T/P07-f196.png` |
| 3 | P05 | f280 | Şerit kenarı parmağa değiyor, alt ucu elin altına giriyor | M | `parmak.yan_ofset_m` 0.055 (json'a yazıldı); `DagronInsert.tsx` ~442 `n*0.034` sabit | O | **yapıldı (motion T)**: `DagronInsert` tip ofseti json `nesneler.parmak.yan_ofset_m` (0.055) okunur; şerit parmağa değmiyor · `T/P05-f280.png` |
| 4 | P07 | f112–156 | Delik konumu kuralı json notunda yok | Y | `darbe[0].delik_kurali` | k | **yapıldı** |
| 5 | P10 | f84, f200 | Lantern + levha yuvası (1018,998) + temas eli x > 920 (IG sütunu); lantern ≥100 px sola, sonra baş açıklığı yeniden ölç | M | `LanternOda.tsx` `LN.*` | O | **yapıldı (motion T)**: lantern dünya izdüşümüyle yeniden kuruldu, ≥100 px sola (arka yüz x 853–1031), yuva (872,992), temas kilidi yeşil · huzme–baş açıklığı ≥ 140 px (memur-2), ≥ 200 px (memur-1) · `T/P10-f084-guvenli.png` |
| 6 | P10 | f200 | Huzme dikey yarıktan çıkıyor; mercek tüpü yok | M | `LN.mercek` + tüp | O | **yapıldı (motion T)**: lantern perdeye dönük (yaw −29.5°), 0.24 m koyu mercek tüpü + 2 halka + ağız; huzme tüp ucundaki tek noktadan |
| 7 | P10 | f84 | Levhayı tutan el topak, parmak yok (5 ile) | M | `LanternOda.tsx` el | k | **yapıldı (motion T)**: yeni `LEVHA_POZ` (4 parmak aralıklı), kol sağ-üstten; levha temastan önce eli izler (havada asılı kalmaz), yuvaya 30 px girer |
| 8 | P10 | f48 | Gökte y ~440/640/745 yatay şerit izleri | M | `GokLitografi`; lint.izin'de yok | k | **yapıldı (motion T)**: `GokLitografi` geçiş çizgileri 3→2, α .35→.2 |
| 9 | P01/P10/P11 | f24 (P01) | Koyu kılıf ipi (`ipStil:"koyu"`) yalnız P09'da; orkestra kararı: uygula. Kanca karesinde kılıf okunurluğu korunmalı (P01 f0/f24 kılıf ≈195 px, ΔE) | M | `Guvercin.tsx`/`ParisCati.tsx` kilif.ipStil; P01 f24 değişir | O | **yapıldı (motion T)**: `ParisCati` kılıf `ipStil:"koyu"` (P01/P10/P11; P09 el kılıfı da); P01 f24 kılıf ≈ 193 px korunur; döngü kilidi: kılıf bbox P01 f0 = P11 son birebir |
| 10 | P05 | f0 | Terazi dengesi | — | — | — | **kalır** (tur-16: sorulmaz) |
| 11 | P05 | f280 | Parmak ucu "kapak" yuvarlakları; tarak tarama `butce.avuc` 6→3 | M | `GravurEl.tsx` | k | **yapıldı (motion T)**: uç gölge hilali maskelendi (uç tonu düz); `butce.avuc` 6→3 |
| 12 | P05 | f280 | Parmak gölgesi kamera kutusu ön yüzüne taşıyor (x 590–640,y 650–780) | M | `DagronInsert.tsx` gölge maskesi | k | **yapıldı** (C3 maskesi doğrulandı; T/P05-f280'de kutu ön yüzüne taşma yok) |
| 13 | P09 | f150 | El kuşu taşımıyor, yanında; kuyruk yelpazesi üstten görünüyor | M | `DagronInsert.tsx` Tours el/kuş, kuyruk poz | O | **yapıldı (motion T)**: el karın altına 48 px yükseldi, parmaklar gövdeye biner (taşır); tutuş pozu kuyruk 0 (kapalı, yandan) · salma sürekliliği düzeltildi |
| 14 | P10 | f330 | Uzak elde üç küt parmak ucu mandal gibi | M | `GravurEl` okuyan poz | k | **yapıldı (motion T)**: üç uç farklı boy/kalınlık, incelen, hafif kıvrık; tırnak yayı + ikinci kontur kalktı |
| 15 | P10 | f200 | Sol duvarda küçük açık dikdörtgen | — | ip mandalı çizildi (C3 motion) | — | kapandı |
| 16 | P06b | f216–287 | El şapka hizasında ("selam"); tutunma noktası başın ≥1 baş genişliği solunda, h 1.60–1.65, gövde sağa 0.2 | M | MONTMARTRE biniş IK | O | **yapıldı (motion T)**: tutunma h 1.80→1.58 (kapanışta 1.38'e kayar), gövde sağa 0.2, f212 başı sepete yatar · `T/P06b-serit-f200-260.png` |
| 17 | P06b | f224–240 | Kalkan bacak dizsiz, ayaksız kütük; pantolon bir ton koyu, diz ≥70°, f226 bot | M | MONTMARTRE kompars bacağı | O | **yapıldı (motion T)**: öndeki bacak pantolonu paltodan koyu (baldır bir ton daha), diz kırığı, ayrı koyu bot (taban çizgili) |
| 18 | P07 | f112–156 | Delik: beyaz nokta kalksın, kontur yırtık, krem iç kenar | M | MONTMARTRE darbe delik | O | **yapıldı (motion T)**: beyaz puf noktası kaldırıldı; kontur 30 noktalı yırtık, krem iç kenar; ağ deliğin üstünden kesintisiz geçer |
| 19 | P07 | f116–156 | İz parçaları ayrık yaprak → tek duman şeridi | M | `duman_cizgisi` segment/opaklık | k | **yapıldı (motion T)**: tek, uca doğru incelen düzensiz kenarlı şerit; dağılırken kaynak ucu çekilir (fade yok) · `T/P07-serit-f160-300.png` |
| 20 | P06b/P07 | gök | Hale arkası tarama ×0.6; P07 A üst bant sert kenar (y≈105 @360) | M | `GokBasamak` | k | **yapıldı (motion T)**: `GokBasamak.siklik` (P06b hale arkası 0.6); ilk sınır geçiş bandı 64/30 → 110/56 px |
| 21 | P06b | f218 | "El halatı kavrar" foley (−6 dB'den kısık); sepet tabanı alt bantta `lint.izin` | K | foley.json | k | kurgucu |
| 22 | P01 | f370 (V4) | Panthéon'a küçük haç (tur-9 varsayılanı, E3 orta güven); kubbe tepesi ≈ (835,430); 360'ta okunmazsa nötr | M | `catiDekor` Panthéon | k | **yapıldı (motion T)**: fener tepesinde küçük haç (`kubbeG` tonu); 360'ta seçiliyor |
| 23 | P01/P10 | gök y 350–600 | Tane şeritleri 1080'de kir gibi | M | `GokLitografi` tane yoğunluğu ↓ | k | **yapıldı (motion T)**: tane yoğunluğu .08→.03, α .35→.25 |
| 24 | P01 | f370 | Kümes "devrilen kulübe": `KUMES_V2.sacak` farkı 0.2→0.1 | M | `catiDekor` | k | **yapıldı (motion T)**: `KUMES_V2.sacak` [1.0,1.2]→[1.0,1.1] |
| 25 | P01 | f370 | Sol orta (x 0–430,y 640–900) lucarne'sız boş blok: `lucYok` 0.25→0.15 | M | `catiDekor` K3 | k | **yapıldı (motion T)**: K3 `lucYok` 0.25→0.15 |
| 26 | P01/P10 | kuş | Kuyruk bantları düz dikdörtgen; tüy ucunu izlesin | M | `Guvercin.tsx` | k | **yapıldı (motion T)**: uç bandı tüy ucu eğrisini izler (iç kenar kavisli) |
| 27 | P10 | f330 | Elin sırtında açık tendon çizgileri; kontrast ↓ | M | `KolEl` | k | **yapıldı (motion T)**: `KolEl` parisGri tendon α .28→.12 |
| 28 | P01 | f370 | Birimler hedefe göre küçük/sık; kuyruk bantları (V4 küçük) | M | `catiDekor` ölçek | k | **yapılmadı**: K3/K4 birim ölçeği (gen) değişirse kabul edilmiş ızgara (V4 'tuttu') ve P01 f370 kompozisyonu yeniden kurulur; küçük not → mekân sorumlusu referans karesiyle ayrı tur. Kuyruk bandı kısmı #26 ile yapıldı |

## Sayım
- Yönetmen/json: #1 (süre+hedef), #2 onay, #3 parametre, #4 → bu turda işlendi.
- Motion'a kalan: 24 satır (#1 kod O1, #2 O2, #3 O3, #5–9, #11–14, #16–20, #22–28); kritik #1, orta #2 #3 #5 #6 #9 #13 #16 #17 #18. Kurgucu: #21 (1). Kapandı/kalır: #10, #15.
