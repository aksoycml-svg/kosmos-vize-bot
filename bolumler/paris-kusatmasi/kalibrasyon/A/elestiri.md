# Eleştirmen · Kurulum A kalibrasyonu (PARIS-CATI + güvercin + kılıf + kümes + siluet) · 2026-11-12

**Karar: DÜZELTMEYLE GEÇER · Puan: 6 (düzgün)**
Kılıf imzası, döngü eşleşmesi (P01 f0 ↔ P11 son), palet ölçümü ve güvenli alan sağlam. Haussmann okuması, geniş kapanıştaki ölü alan, ışık yönü tutarsızlığı ve yakın plan güvercin çizgisi şablona gömülmeden düzeltilmeli.

## Bulgular

| Kare | Sorun | Neden (parametre/dosya) | Düzeltme | Sahibi | Öncelik |
|---|---|---|---|---|---|
| P01 f370 | Alt %35 (y 1250–1920) yalnız 4 kenet çizgili düz çinko: **ölü alan** (kullanıcı kuralı, Blanc dersi). Ön baca y 1410'da bitiyor, altı boş | P01 son kamera `cy −160` (kümes tabanı y 1021, zemin kadrajın %47'si) + teras katmanında (katman 9) ön plan nesnesi yok | 1) `cy` −160 → ≈ −40 (kırık çizgi ≈ y 964, zemin ≈ %40); 2) teras ön planına işlevli bir nesne: kümes önünde su/yem teknesi ya da çatı kapağı (tabatière, kümesçinin çıkış yolu) | yönetmen (cy) · mekân sorumlusu → motion (`catiDekor.tsx`, katman 9) | kritik |
| P01 f370 | **Tek ışık ihlali:** ön bacanın külahları sağdan aydınlık (sol #342d31, sağ #524443), sağ baca kümesinin külahları soldan aydınlık. Aynı karede iki ışık yönü | `catiDekor.tsx` BacaKumesi külah gölge yüzü sabit taraflı çiziliyor, dünya ışık vektöründen türemiyor | Külah ışık/gölge yüzü ışık vektöründen (alacakaranlıkta sağ-ön) hesaplansın, iki baca da sağ yüz aydınlık | motion | kritik |
| P01 f370 | Sağ baca (x 955, y 620) ve ön baca (x 10, y 710) üstünde yuvarlak soluk leke: lens parlaması/hayalet gibi okunuyor | BacaKumesi "kabarma lekesi" (α .10) daire biçimli | Lekeyi kaldır ya da düzensiz, kenarı net, dikey sıva izi yap | motion | orta |
| P01 f370 | **Haussmann zayıf:** karşı binada lucarne'lar brisise gömülü düz dikdörtgen (kendi çatısı, alınlığı, yanağı yok); brisis yatay çizgileri tahta kaplama gibi okunuyor; korniş gölge bandı (26 px) görünmüyor. 360'ta "pencereli gri ahşap bina" okunuyor; Paris okumasını Panthéon ve külahlar taşıyor | `catiDekor.tsx` karşı bina sırası (katman 5): lucarne çizimi mekanlar §1.2/§1.4'ten sapıyor | Lucarne'a üçgen/yay alınlık + iki yanak (II tarama), korniş çıkıntısı + altında koyu gölge bandı, arduvaz sırası aralığı 13 px ve daha ince (tahta gibi değil) | motion (şartname mekân sorumlusunda zaten var) | orta |
| P10a f048 | cx −100'de kuşun gagası sağ 80 px yan marjda (x ≈ 1020), ayakları IG sütununda (x 870–940, y ≈ 1090) | P10a `kamera.cx` | **cx −180** (−380 değil, −100 değil): kılıf ≈ x 360, ayaklar ≈ 790–860, gaga ≈ 940. Yönetmen render edip baksın | yönetmen | orta |
| P10a f048/f056 | Paris eli kıstırmıyor: dört parmak açık, serçe yukarıda, başparmak yok; "rock" işareti gibi okunuyor. f056'da ip parmak arasına değil boşluğa gidiyor | `KolEl.tsx` `parisGri` + `kistir` pozu (parmak açıları) | Başparmak + işaret parmağı ucu ipi kıstırır, diğer üç parmak kapalı; ip ucu bu iki parmağın temasına bağlı | motion | orta (P10 anahtar plan: kritik olabilir) |
| P01 f000, P11 son | Kanca ilk karesi: kılıf güçlü okunuyor (tek sıcak nokta, merkezde), ama kuş okunmuyor: baş kadraj dışı, kuyruk "üst üste tahta", kanat iki gri bıçak. Alt %43 düz yatay bant (iniş tahtası + kümes tahtaları) | `cs 3.2` (kuş 1423 px, baş kadraj dışında) + Guvercin.tsx kuyruk çizimi | `cs` 3.2 → ≈ 2.75 + cx/cy ile baş sağ üstte kadraja girsin (kılıf ≈ 190 px, %10 sınırında kalır). P01 f0 ve P11 son **aynı değer** (döngü kilidi). Kuyruk tüylerine uçta koyu bant (gerçek güvercin işareti) + orta tüy sapı | yönetmen (cs/cx/cy) · motion (Guvercin.tsx) | orta |
| P01 f024 | Kuşun arkasında yarı saydam gri poligon (x 650–1000, y 300–1110): çırpış bulanığı hata gibi duruyor | Guvercin.tsx çırpış bulanığı katmanı (opaklık/şekil) | Bulanık katmanı kaldır ya da kanat biçimli 2–3 kontur izine çevir | motion | küçük |
| P01 f370 | Sağ baca kümesi Z 8 m'de; kendi terasımız Z 5'te (kırık çizgi) bitiyor → baca sokağın havasında duruyor (ekranda görünmüyor, model hatası) | mekanlar §1.4 katman 7, d 2.67 | Z ≤ 4.5 m (terasımızda) ya da "komşu bina" olarak karşı sıranın önüne al; ekran konumu korunabilir | mekân sorumlusu → motion | küçük |
| P01 f370 | Ufuk basamağının eğik üst kenarı (y 440→380) düz ve keskin; 360'ta çatı saçağı/tavan gibi okunuyor | mekanlar §1.4 katman 0 (60 px eğim) | Eğimi 20 px'e indir ya da kenara hafif dalga | mekân sorumlusu | küçük |
| P01 şerit | Hareket şeridi **24 karede bir**; protokol 4 kare ister. Kalkış (f0–96) ve kuş çıkışı (f270–335) arası görülmedi | kontrol betiği adımı | f0–96 ve f270–335 için 4 karelik şerit | teknisyen | orta (süreç) |

## Sorulan noktalar
- **Dönem:** Paris 1870 çatı okunuyor (külah tarağı, çinko teras, Panthéon kubbesi, lucarne'da siluetler); Haussmann'a özgü okuma zayıf (yukarıdaki lucarne/korniş satırı). Eyfel, fener, bayrak, kırmızı tuğla yok. Panthéon'un Sağ Yaka'dan GGB yönünde görünmesi araştırmacı onayı bekliyor.
- **Kanca:** Kılıf imza olarak okunuyor; ilk kare hareketli. Merak var ama "ne taşıyor?" sorusu "bu ne hayvan?" karmaşasıyla bölünüyor (kuş f48'de okunuyor ≈ 0.8 sn).
- **360x640:** kılıf, kümes, lucarne siluetleri okunuyor. f0'da kuş okunmuyor. f144 sonrası kılıf birkaç piksel, ama tek sıcak nokta olarak seçiliyor.
- **İmza tekliği:** geçti. Külahlar kahve, el teni b\* 15, pencereler krem. Kehribar başka yerde yok.
- **Ufuk–ölçek:** siluetler lucarne'a oranlı (bel yukarı ≈ pencerenin yarısı). Uyumsuzluk yok.
- **Renk:** ölçülen değerler hedefin ±3 L\* içinde (teras #565b6f / #565a6e, gök orta #494663 / #4a4663, kümes alaca #746e78 / #6b6570, gün #756f62 / #7a7468).
- **P10a cx:** −380 reddedildi (kılıf solda kesik, elin altında). −100 yan marjı ve IG sütununu ihlal ediyor → **−180**.
- **Kümes kapağı ön yüzde:** kabul. Açıklıkları kapatmıyor, menteşe solda, işlevi anlamlı. Geometrik gerekçe doğru (kamera kümesin genişliği içinde, yan yüzler görünmez). Mekanlar §1.4'e not düşülsün.

## En çok 5 öncelikli düzeltme (sırayla)
1. P01 son **ölü alan**: `cy` −160 → ≈ −40 (yönetmen) + teras ön planına işlevli nesne (mekân sorumlusu → motion, `catiDekor.tsx`).
2. **Tek ışık**: BacaKumesi külah gölge yüzü ışık vektöründen; daire lekeler kaldırılır (motion, `catiDekor.tsx`).
3. **Haussmann lucarne + korniş** şartnameye göre (motion, `catiDekor.tsx`, katman 5).
4. **P10a**: `cx −180` (yönetmen) + `KolEl parisGri kistir` başparmak-işaret parmağı kıstırma (motion).
5. **Kanca karesi / döngü**: P01 f0 ve P11 son `cs` ≈ 2.75 + baş kadrajda; kuyruk uç bandı, hayalet kanat kaldırılır (yönetmen + motion, `Guvercin.tsx`).
Ayrıca: 4 karelik hareket şeridi (teknisyen). Düzeltmeden sonra yalnız P01 f0/f370, P10a f048/f056 ve P11 son yeniden render edilip bakılır; tam tur gerekmez.
