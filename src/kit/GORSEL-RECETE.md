# Görsel reçete — Paris çıtası (zorunlu)

Kaynak: Paris kodunun incelenmesi (2026-11-15). Paris "zengin" göründü çünkü **her plan aynı zinciri** uyguladı. Çiçero (gece iç mekân/masa ağırlığı, buğu ve derinlik yok) ve Yarasa (MASA-YB kitin doku parçalarını hiç çağırmadı, "kagit" arşiv modu soldurdu) bu zinciri eksik uyguladı.

Her yeni mekân şablonu aşağıdaki maddelerin **hepsini** uygular. Uygulanmayan madde `lint: {izin:[…], not:"neden"}` ile gerekçelendirilir; gerekçesiz eksik şablon kabul edilmez.

## A. Işık, derinlik, doku (her mekân)
1. **Tek ışık vektörü, tek dünya modeli** — gölge boyu, aydınlanan yüz, tarama ve kenar ışığı aynı vektörden (`montmartreDunya.ts:23-33` `ISIK_YON/golgeVek/golgeNokta/isikta`). Atılan gölge = köşe izdüşümünün dışbükey zarfı (`golgeCokgen`), α ~.8. Sabit ofsetli sahte gölge yok.
2. **Litografi gök** — yumuşak gradyan yok; 5 düz basamak + basamak sınırında ince çizgi/tarama geçişi (`catiDekor.tsx:107-126`, `montmartreDekor.tsx:13-50`). İç mekânda pencere/kapı açıklığından görünen gök ve ışık da aynı dilde.
3. **Blursuz hale ve ışık havuzu** — eş merkezli düz diskler (r 130/200, α .55/.30); her görünen lamba/pencere net kenarlı havuz düşürür (`catiDekor.tsx:129-135, 364-423`). Havuz tek ton değil, 2–3 basamak.
4. **Derinlik katmanı ≥5** (dış mekânda 8–10; iç mekânda ön plan nesnesi + masa/oda + duvar + açıklıktan görünen dış + uzak dış). Arkadan öne renk koyulaşır ve soğur.
5. **Buğu (hava perspektifi)** — `bugu(renk, D)` uzak rengi açık nötre karıştırır (maks α .62); ufukta 3 buğu bandı (`havadanParis.tsx:18`, `montmartreDekor.tsx:65-98`).
6. **Derinlik bulanıklığı** — `Flu` / `fluSigma` ile uzak katman σ 5–7 (`catiDekor.tsx:100-106`).
7. **Kenar ışığı** — yalnız ışık alan kenarda 1.5–3 px sıcak çizgi; sırtta sıcak bant; siluette 2 px ofsetli kenar (`catiDekor.tsx:195, 227, 373-471`).
8. **Sıcak–soğuk palet** — gölge mavi-mor, ışık gül-şeftali-altın; sahne C* ≤28; sıcak piksel ≥%14, p95 L* ≥75. Gece/iç mekân da bu ölçüte uyar (tek renk gece mavisi yok).
9. **Işığa göre tarama** — kitteki `doku/Tarama` bileşeni (elle desen yazılmaz): uzak/orta/yakın aralık 12/9/7.5 px, kalınlık 1.1/1.6/2.2, önce ton bloğu, seed'li ±%8 sapma; yalnız ışık almayan yüzde; çapraz tarama yalnız ≤120 px gölgede.
10. **Litografi renk kayması** — sahne `RenkKaydi` ile sarılır (dx 1.5, dy 1.0).
11. **Kontur titremesi** — `KonturTitreme` (ölçek 1.2–3).
12. **Arşiv katmanı `litografi`** — kâğıt lifi .14, gren .10, mor vinyet α .22, doygunluk düşürülmez. Soldurup karartan mod (`kagit`, doygunluk <1, kahve vinyet) kullanılmaz.
13. **Seed'li düzensizlik** — tek `rng` (mulberry32); boy, aralık, ayrıntı varlığı, ışıklı pencere oranı seed'le.

## B. Binalar ve mimari ayrıntı
1. **Sıra, tek cephe değil** — dış mekânda bitişik bina sıraları (en az 2 derinlikte); bina eni/yükseklik/renk seed'le; komşu yükseklik farkı < eşik ise zorla bir kat ayrılır (ızgara yok); %15–30 ayrıntısız bina (sağır çatı vb.) (`catiDekor.tsx:256-277 sira()`).
2. **Cephe katmanları** — taş/sıva yüzey + kat silmesi/bant + pervaz + kayıt çizgisi + (dönemse) balkon + korniş; korniş altı taramalı, üst kenarı kenar ışıklı (`catiDekor.tsx:356-379`).
3. **Pencere ritmi ve içi** — pencereler aks ve kat adımıyla hizalı; pervaz + cam + kayıt + cam parıltısı + denizlik; ışıklı/karanlık seed'le (~%22–35), ışıklı pencere iki net elips havuz düşürür (`catiDekor.tsx:359-369`, `montmartreDekor.tsx:136-142`).
4. **Çatı profili dönemin** — mansard/eğik/düz; malzeme sıra çizgileri (arduvaz 0.3 m, çinko kenet 0.6 m), kırık çizgide sıcak kenar, sırtta sıcak bant; yalnız komşusundan yüksek binanın yan kalkanı çizilir (`catiDekor.tsx:381-447`).
5. **Çatı penceresi / çıkıntılar** — ön yüz + görünen yanak + çatı yüzleri ayrı; ışıklı yanak kenar ışığı, gölgeli yanak tarama; saçak öz gölgesi + temas çizgisi (`catiDekor.tsx:394-427`).
6. **Baca kümesi** — dönem/şehirde varsa: ortak duvarda, 2–8 külah, seed'li konum, başlık + ağız elipsi + ışık/gölge yarısı + sıva lekesi + kurum izi + tuğla çizgisi + temas gölgesi; örtülen baca çizilmez (`catiDekor.tsx:304-324, 449-480, 625-672`).
7. **Saçak altı gölgesi** — koyu ton + tarama, her saçak/korniş/çıkıntının altında.
8. **Mesafeye göre ayrıntı (LOD)** — yakın: doku + süsleme + 4 px kontur; orta: oran + pencere ritmi; uzak: kontursuz siluet + baca tarağı. Eşikler: kontur D<400 → 2.5 px, <700 → 1.5 px, daha uzak yok; pencere D<700, baca D<1500 (`havadanParis.tsx:263-291`).
9. **Kontur dili** — kontur rengi dolgudan (`ink(dolgu)`), round join, kalınlık ölçeğe göre clamp(1.5, 6); sabit renk/sabit kalınlık yok.
10. **Tarama yeri** — korniş altı, gölgedeki yanak, bacanın gölge yüzü, saçak altı; büyük düz yüzeyde yok.

## C. Mekân seçimi (senarist/yönetmen)
- Bölüm planlarının **en az üçte biri derinlikli** (ufuk, sokak, pencereden dış, uzak katman) olur; masa/iç mekân insertleri art arda 3 plandan fazla dizilmez. İç mekânda açıklık (pencere/kapı) üzerinden dış derinlik gösterilir.

## Ortak kod (hedef: `src/kit/gorsel/`)
Hazır ortak: `doku/Tarama` (`Tarama`, `Desen`, `RenkKaydi`), `KonturTitreme`, `ArsivKatmani`, `doku/Isik`, `sabitler` (`karistir`, `ink`, `rnd`), `GravurEl`.
Paris'ten taşınacak: `isik.ts` (isikYon, golgeVek, golgeNokta, isikta, golgeCokgen), `<GokLitografi>`, `<Hale>`, `<PencereHavuz>`, `bugu()` + `<UfukBuguBandi>`, `<Flu>`/`fluSigma`, `<KenarIsik>`, `paletKur()` (C*/sıcak oran denetimli), tek `rng`; mimari: `siraUret()`, `<Cephe>`, `<CatiProfil>`, `<BacaKumesi>`, `<Kulah>`, `lodSec()`, `konturGenislik()`; ve hepsini zorunlu kılan sarmalayıcı **`<SahnePlaka arsiv="litografi" titreme renkKaydi>`** — her şablon bununla sarılır, atlanamaz.
