# Dokunuşlar — Yarasa Bombası (yaratıcı yönetmen, v1.1 hizası, 2026-11-14)

Girdi: `senaryo.md` v1.1, `public/yarasa/ses/plan-sureleri.json`, `arastirma.md`, `src/kit/DOKUNUS-KUTUPHANESI.md`. 12 plan, 7 dokunuş (P01, P12 hariç; P02, P04, P06 dokunuşsuz). Önek `YB-`.
Plan süreleri sesten; P09 ve P12'ye +1.5 sn tutma eklendi → P09 = 6.21, P12 = 6.45 sn, toplam ≈62.7 sn. Zamanlar plan-içi sn (mutlak = plan başlangıcı + plan-içi). Kural: her dokunuş plan sonundan ≥0.2 sn (12 kare @60) önce biter.

Plan başlangıçları (mutlak): P03 7.74 · P05 19.41 · P07 29.90 · P08 33.38 · P09 39.92 · P10 46.13 · P11 49.87.

Ton: yarasa yanması/acısı gösterilmez; hayvan gövdesi alevle aynı karede olmaz; whoosh/riser yok; foley −5/−9 dB.

## Liste

| id | plan (süre) | dokunuş | plan-içi sn | mutlak sn | plan sonuna kalan | bağlı eylem (sebep → sonuç, karakter) |
|---|---|---|---|---|---|---|
| YB-D1 | P03 defter insert (5.65) | **Kalem durur, alev çatıya sıçrar** | 3.0–5.3 (duruş 3.0–3.4, alev 3.4–5.3) | 10.74–13.04 | 0.35 | "Göğsüne minik bir yangın bombası takarsan": Adams kalemi yarasa göğsünde 0.4 sn durdurur, sonra küçük kırmızı alevi çizer; çizgi çatı taramasına geçer, tarama kırmızıya döner. Adams tereddütsüz, sistemli. |
| YB-D2 | P05 lab insert (4.84) | **Kapsül yapıştırılır, kapak kapalı kalır** | 2.4–3.8 (yapıştırıcı damlası 2.4, kap oturur 3.2–3.8) | 21.81–23.21 | 1.04 | Fieser'in eli (cımbız) selüloz kabı uyuyan yarasanın göğsüne yapıştırıcı damlasıyla yapıştırır; uçtaki kapak kapalı. Titiz kimyacı; yarasa kımıltısız. Kapak P09'daki nabzın kurulumu. |
| YB-D3 | P07 tepsi insert (3.48) | **Kanat titrer, baş karanlığa döner** | 0.5–2.8 (iki seğirme 0.5–1.4, baş dönüşü 1.4–2.4, durur 2.4–2.8) | 30.40–32.70 | 0.68 | "Nereye tüneyeceğine yarasa kendi karar verir": tek bölmedeki yarasa kanadını iki kez titretir, başını tepsi kenarının karanlık gölgesine çevirir; öteki bölmeler kımıltısız. Kendi tüneğini seçer; baktığı yer kadraj dışı. |
| YB-D4 | P08 çöl-üs geniş (6.54) | **Defter spiralinin aynası: sürü gölgesi tanktan geçer** | 1.6–4.4 | 34.98–37.78 | 2.14 | "Silahlı yarasalar salındı": bulut P01–P02 defter spiralinin aynı biçim ve yönünde yükselip yayılır (çizgiden gerçeğe); yumuşak gölgesi zeminde kayar, tank gövdesine düşer (3.0–4.0 net) ve sol kenardan çıkar. Tankı P09'un hedefi olarak kurar. |
| YB-D5 | P09 çöl-üs yakın, **anahtar** (6.21) | **Tünme dalgası + amber nabız** | 0.8–5.8 (tünme 0.8–4.3, tutma 4.3–5.8) | 40.72–45.72 | 0.41 | Kamera tankın altına push-in; yarasalar saçak kirişine soldan sağa tek tek tutunur, kanat katlar. Kapsül uçlarında yavaş **amber/sıcak nabız** (≈1.2 sn periyot; 1943 kimyasal zamanlayıcı, LED değil). Son tünmeden sonra 1.5 sn kıpırtısız tutma, vinyet. Ritim eşit değil. |
| YB-D6 | P10 çöl-üs (3.74) | **Üç kıvılcım, sonra alev** | 0.2–2.4 (kıvılcım 0.2 / 0.7 / 1.2, alev 1.7–2.4) | 46.33–48.53 | 1.34 | "Kapsüller tek tek yandı": tank altında gölgede üç ayrı kıvılcım, her biri saçağa/tanka kendi ışığını düşürür; üçüncüden sonra alev saçağa tutuşur. Kadrajda net yarasa gövdesi yok. |
| YB-D7 | P11 masa belge (6.36) | **Mühür belgenin üstüne iner, başlık açılır** | 3.6–5.6 (temas 4.4) | 53.47–55.47 (temas 54.27) | 0.76 | Amiral King'in iptali: "iptal" mührü (dil-nötr çarpı) tek vuruşla iner, belge başlığı mührün vuruşuyla görünür olur (saklanan şey). King'in soğukluğu: tek vuruş. Mühür oturmuş 4.4–6.16 (1.7 sn net). |

## Ayrıntı (okunurluk · foley · kit)

| id | okunurluk (≥%10, ≥1 sn) | foley (plan-içi sn → ses) | kit durumu |
|---|---|---|---|
| YB-D1 | Defter insert, çizim ≈%30; kalem ucu küçük jest → kamera cs ≈1.4, kalem+alev ≥%12. Alev geçişi net 1.9 sn | `kalem-kagit` (çizgi boyunca, −9), `kalem-tik` (3.4, −6); duruşta sessizlik | **kit_eksik**: MASA-INSERT `defter`+`kalem`+`cizim` (çatı tarama → kırmızı morf) |
| YB-D2 | Lab insert cs ≈1.6, kapsül ≈%12 (küçük jest → yakın). Yapışmış kapsül, kapak kapalı ≥1.2 sn net (3.4–4.64) | `pens-tik` (2.4, −9), `damla-yapistir` (2.5, −9, çok kısık), `kap-oturma` (3.2, −6) | **kit_eksik**: `kapsul` (selüloz kap, kapak) + uyuyan `yarasa` sprite + cımbızlı el |
| YB-D3 | Tepsi bölmesi yakın plan, yarasa/baş ≥%12 (~230 px); titreme + baş dönüşü net 1.9 sn; komşu bölmeler durağan | `kanat-titrek` (0.5 ve 1.0, çok kısık −9); baş dönüşü sessiz | **kit_eksik**: `tepsi` insert (yuvarlak, bölmeli, dil-nötr diyagram) + yarasa titreme/baş dönüşü parametresi |
| YB-D4 | Geniş plan; gölge ≈%35, tankta ≥1 sn net; kamera sabit. Spiral biçimi P01 defter spiraliyle aynı `spiral{yön,sarım}` parametresi | `kanat-uzak` (−9, hafif kabarır); gölge sessiz | **kit_eksik**: ÇÖL-ÜS şablonu (`tank`, alçak yapı, `sürü`, `sürü_golgesi`); defter spiraliyle ortak spiral geometrisi |
| YB-D5 | Yarasa ≈%15–20; push-in cs 1.0→2.4; kapsül kümesi nabzı ≥%10 (okunmazsa cs 2.8); 1.5 sn tutma | `pencere-tutun` ×3 (−9), tank metal ortam (−12); yatak −22 dB altı. Nabızda foley yok | **kit_eksik**: `saçak_alti`, `tunek_dalgasi`, `kapsul_nabiz{renk:amber}` |
| YB-D6 | Kıvılcım halo + yansıma ≈%10–12; üç kıvılcım 0.5 sn arayla; toplam 2.2 sn; hayvan yok | `kivilcim-cirt` ×3 (−9/−7/−5), sonra `ates-yatak` (−12); whoosh yok | **kit_eksik**: `kivilcim_dizisi`, `alev` |
| YB-D7 | Belge insert, mühür çapı ≈%18; oturmuş ≥1.4 sn; çevre sakin | `muhur-tok` (4.4, −5), `kagit-hisirti` (belge yerleşir ≈3.6, −9) | **kısmi**: HARITA `muhur` var; MASA-INSERT `belge` + mühür hedefi + başlık gizli/açık kit_eksik |

## v1.1 hizalama notları
1. **D3:** kadran/ibre kaldırıldı (kaynaksızdı); yeni görsel yarasanın kendi tüneğini seçmesi, kaynaklı (saçak/tavan arası).
2. **D4:** "mağara spirali" artık defter çiziminin gerçek üstteki aynası; ayrı MAĞARA şablonu yok, bölüm 3 şablon (MASA, ÇÖL-ÜS, HARİTA).
3. **D5 (kesinleşti, orkestra onaylı):** kırmızı LED yok, amber nabız. Senaryo "kırmızı nokta yanıp sönüyor" satırı json'da `kapsul_nabiz{renk:amber}` ile eşlenir. Kırmızı yalnız D1 alevi ve mühürde kalır.
4. **D7:** v1.1'de "etkili" ve gözlemci notu çıktı → "etkili'nin üstüne iner" ironisi kalktı; dokunuş mühürün başlığı açmasına bağlandı (senaryo P11 saklanan şey).
5. **D2:** "iliştiriyor" → yapıştırıcıyla yapıştırma (v1.1 #6); mandal çıtı kaldırıldı, damla + kap oturması.

## Tekrar kontrolü
- Kütüphane (D1–D8, P13, PK-D1–D8) ile çakışma yok. Bölüm içinde her mekanizma tek: kalem (D1), yapıştırma (D2), titreme/baş dönüşü (D3), gölge (D4), tünme (D5), kıvılcım (D6), mühür (D7). P05–P07 ardışık, biçimleri farklı.
- Kapsül fikri üç aşamada (D2 takma, D5 bekleme, D6 yanma): kurulum → karşılık, tekrar değil. D4 spiral aynası, D1 çiziminden farklı plan ve mekân.
- Mühür başka bölümde dokunuş çıkarsa `YB-D7` ile eşle.

## Açık notlar
- Foley dosyaları yok (`tools/sfx.mjs`, teknisyen): kalem-kagit, kalem-tik, pens-tik, damla-yapistir, kap-oturma, kanat-titrek, kanat-uzak, pencere-tutun, kivilcim-cirt, ates-yatak, muhur-tok, kagit-hisirti.
- Ton: D5/D6'da yarasa gövdesi alevle aynı karede olmaz. Işık P08–P10 geç ikindi, tek kaynak.
- Varsayım: P12 +1.5 sn tutma D-yok planda; P09 tutması 4.3–5.8 plan-içi.
