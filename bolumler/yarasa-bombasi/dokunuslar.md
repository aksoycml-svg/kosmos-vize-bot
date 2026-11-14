# Dokunuşlar — Yarasa Bombası (yaratıcı yönetmen, 2026-11-14)

Girdi: onaylı `senaryo.md` (değişmedi), `arastirma.md`, `src/kit/DOKUNUS-KUTUPHANESI.md`, `src/kit/KATALOG.md`. Format: 12 plan, 7 dokunuş (P01, P12 hariç; P02, P04, P06 dokunuşsuz — günlük format kararı). Kimlik öneki `YB-`. Zamanlar: plan-içi sn / mutlak sn (TR+EN uzun süreler, senaryo §7; ses ölçülünce plan süreleri değişirse oranla kayar). Kural: hareket plan sonundan ≥12 kare (0.2 sn) önce biter.

Ton kuralı: yarasa yanması, acı, ölümü gösterilmez; hayvan gövdesi hiçbir dokunuşta alevle aynı karede olmaz; şaka yok. Savaş konusu: whoosh/riser yok. Foley seviyesi −5/−9 dB, anlatım 0 dB.

## Liste

| id | plan | dokunuş | plan-içi → mutlak | bağlı eylem (sebep → sonuç, karakter) |
|---|---|---|---|---|
| YB-D1 | P03 MASA (defter) | **Kalem durur, alev çatıya sıçrar** | 3.2–5.6 → 11.8–14.2 | "Göğsüne yangın bağlasan" cümlesi: Adams kalemi yarasa göğsünün üstünde 0.4 sn durdurur (fikrin ağırlığı), sonra küçük kırmızı alevi çizer; çizgi kâğıtta çatı taramasına geçer, tarama kırmızıya döner. Adams'ı tereddütsüz ve sistemli gösterir (diş hekimi titizliği). |
| YB-D2 | P05 MASA (lab insert) | **Kapsül mandalı çıt** | 2.6–3.8 → 23.8–25.0 | Fieser'in eli (cımbız) kapsülü uyuyan yarasanın göğsüne iliştirir; kapsül gövdesindeki minik mandal halkası çıt diye kapanır. Fieser'in titiz kimyacılığı; yarasa kımıltısız. Kapsül ucundaki kapak kapalı kalır (P07/P09 kurulumu). |
| YB-D3 | P07 MASA (tepsi insert) | **Tek kanat titremesi, komşuya geçmez** | 0.8–3.2 → 32.4–34.8 | "Ne zaman uyanacağı ayarlanamıyor": tepsideki tek gözde yarasa kanadı iki kez seğirir, yanındaki göz bir kez kıpırdar ve durur; öteki gözler kımıltısız; seğirme sönüp kanat yine katlanır. Engel görünür olur. |
| YB-D4 | P08 ÇÖL-ÜS geniş | **Sürü gölgesi tankın üstünden geçer** | 1.6–4.4 → 37.2–40.0 | "Silahlı yarasalar salındı": bulut üs üstünde yayılırken yumuşak gölgesi zeminde kayar, yakıt tankının gövdesine düşer (≥1 sn net, 3.0–4.0) ve kadraj sol kenarından çıkar. Tankı P09'un hedefi olarak önceden kurar (kurulum → karşılık). |
| YB-D5 | P09 ÇÖL-ÜS yakın, **anahtar** | **Tünme dalgası + amber nabız** | 1.0–5.9 → 42.1–47.0 | Kamera tankın altına push-in; yarasalar saçak kirişine soldan sağa tek tek tutunur, kanat katlar. Her kapsül ucunda yavaş amber nabız (yanıp sönen LED değil). Son tünmeden sonra 1.5 sn kıpırtısız tutma, çevre vinyet. "Karanlık köşe arayan yarasalar" tam davranış; hepsi aynı ritimde değil. |
| YB-D6 | P10 ÇÖL-ÜS | **Üç kıvılcım, sonra alev** | 0.2–2.4 → 47.5–49.7 | "Kapsüller tek tek yandı": tankın altındaki gölgede üç ayrı kıvılcım arka arkaya, her biri saçak ve tank yüzeyine kendi ışığını düşürür; üçüncüden sonra alev saçağa tutuşur. Yarasa gövdesi kadrajda net değil, çıplak tünek ve ışık noktaları (hayvan yanması gösterilmez). |
| YB-D7 | P11 MASA (belge) | **Mühür "etkili"nin üstüne iner** | 4.2–6.6 → 55.1–57.5 | Amiral King'in iptal kararı: kırmızı mühür belgedeki gözlemci satırının ("etkili") tam üstüne iner (temas 5.0 → 55.9). İroni: etkili bulundu, yine de iptal. King'in soğukluğu: kararı tek vuruşla verir. |

## Ayrıntı (okunurluk · foley · kit)

| id | okunurluk (ölçek, ≥%10, ≥1 sn) | foley (temas kare → ses) | kit durumu |
|---|---|---|---|
| YB-D1 | Defter insert, çizim ekran yüksekliğinin ≈%30'u; küçük jest (kalem ucu) için kamera cs ≈1.4 push-in, kalem+alev bölgesi ≥%12. Alev geçişi net 1.6 sn. Diğer hareket yok, ışık kalemde | `kalem-kagit` (çizgi boyunca, −9), `kalem-tik` (alev başlangıç noktasına değiş, p 3.6 sn, −6); duruşta sessizlik | **kit_eksik**: MASA-INSERT `defter`+`kalem`+`cizim` propu (çatı tarama→kırmızı morf). `kitap` hukuk kitabı, yetmez |
| YB-D2 | Lab insert cs ≈1.6, kapsül ≈%12, mandal halkası ≥%12 yüksekliğe yakın (küçük jest → yakın kamera). Mandal kapalı kalır ≥1.2 sn net | `pens-tik` (cımbız göğse değer, p 2.6, −9), `mandal-cit` (p 3.4, −6) | **kit_eksik**: `kapsul` (mandal halkası, kapak) + uyuyan `yarasa` insert sprite + cımbızlı el (KolEl tip `yazici`/`gorevli` yakın; cımbız propu yok) |
| YB-D3 | Tepsi gözü insert, tek göz hücresi ≈ ekran yüksekliğinin ≥%12'si (~230 px), kanat titremesi net ≈1.8 sn; öteki gözler durağan, göz yönlendirmesi komşu kıpırtısıyla | `kanat-titrek` (p 0.8 ve 1.3, çok kısık −9), komşu `kagit-hisirti` yok | **kit_eksik**: `tepsi-goz` insert (yumurta kolisi gözleri, dil-nötr diyagram) |
| YB-D4 | Geniş plan; gölge ekranın ≈%35'ini kapsar, tank gölgeyi alırken ≥1 sn net; diğer hareket durur (kamera sabit), alt güvenli banda gölge ucu dahil değil | `kanat-uzak` (sürü vızıltısı uzaktan, sürekli bölümde −9, hafif kabarır); gölge sessiz | **kit_eksik**: ÇÖL-ÜS şablonu (`tank`, alçak yapı, `sürü` + `sürü_golgesi {bas,bit,hedef:tank}` tek ışık geç ikindi) |
| YB-D5 | Yakın plan, yarasalar ekran yüksekliğinin ≈%15–20'si; push-in cs 1.0→2.4; kapsül nabzı ≥%10 (kapsül başına ≈%4, topluca kümede okunur, yoksa cs 2.8'e çık); 1.5 sn tutma | `pencere-tutun` ×3 (yarasa pençesi kirişe, kısık −9, her tünmede), tank metal çıtırtısı ortam (−12); anahtar sessizlikte yatak −22 dB altı. **Foley yok** nabızda (görünmez/ses beklenmez) | **kit_eksik**: ÇÖL-ÜS `saçak_alti` + `tunek_dalgasi {bas,bit,adet}` + `kapsul_nabiz` |
| YB-D6 | Kıvılcım halo'su + yansıma ≈%10–12 (tank gölge alanı büyür), üç kıvılcım 0.5 sn arayla, toplam 2.2 sn; kadrajda hayvan yok | `kivilcim-cirt` ×3 (−9, −7, −5 artan; ateş çıtırtısı), ardından `ates-yatak` (−12). Whoosh/riser yok | **kit_eksik**: ÇÖL-ÜS `kivilcim_dizisi` + `alev` (MONTMARTRE `darbe` kıvılcımı KT `darbe` ile yaklaşık, kısmi) |
| YB-D7 | Belge insert, mühür çapı ≈%18; mühür oturmuş durum ≥1.4 sn net, çevre sakin, kâğıt yazısı "etkili" yazı katmanında | `muhur-tok` (p 5.0, −5), `kagit-hisirti` (belge yerleşir, −9) | **kısmi**: HARITA `muhur {kare, metin}` var (kırmızı, dil-nötr çarpı); MASA-INSERT'te `belge` propu + mühür hedefi yok → kit_eksik |

## Tekrar kontrolü
- Dokunuş kütüphanesi (D1–D8, P13, PK-D1–D8) ile çakışma yok. Yakın olanlar: PK-D5 (kutu/şerit, kâğıt) ≠ D1; PK-D2 (kumaşın şişmesi) ≠ YB-D4; Paris `darbe` (patlama) YB-D6'dan ayrı (üç küçük kıvılcım, patlama yok). **Mühür** Blanc/HARITA kitinde var; kütüphanede dokunuş olarak kayıtlı değil; yine de başka bölümde mühür dokunuşu çıkarsa `YB-D7` bölüm adıyla eşlenmeli.
- Bölüm içinde: kalem (D1) tek; seğirme (D3) tek; gölge (D4) tek; tünme (D5) tek; kıvılcım (D6) tek; mühür (D7) tek. Üç P05–P07 MASA planı ardışık: biçimleri farklı (mandal çıtı / kanat seğirmesi / mühür).
- Aynı mekanizma tekrarı: kapsül yanma fikri üç yerde geçiyor (D2 kurulum, D5 nabız, D6 kıvılcım); her biri farklı aşama (takma, bekleme, yanma) — kurulum→karşılık, tekrar değil.

## Uyarılar / orkestraya notlar
1. **P09 "kırmızı nokta yanıp sönüyor" senaryosu dönem dışı okunur** (1943'te LED yok; zamanlayıcı kimyasal, kaynak tek: arastirma §1). Dokunuşta yanıp sönme yerine yavaş amber nabız önerildi. Senaryoya dokunmadım; yönetmen/senarist "kırmızı nokta" ifadesini json'da "amber nabız" olarak eşleştirsin ya da kullanıcı onayı alsın.
2. **P07 "kapsülün küçük kadranı ve ibre" kaynakta yok** (mekanizma görseli doğrulanamadı). Dokunuşu kadrana bağlamadım; kadran yönetmen kararıyla çıkarılabilir ya da ikincil olur.
3. **Ton kontrolü (eleştirmen):** D5/D6'da yarasa gövdesi alev ile aynı karede olmamalı; D6'da yarasa gövdeleri net çizilmez (gölge, tünek, ışık noktası).
4. **Işık:** P08/P09/P10'da tek ışık geç ikindi; kıvılcım ve nabız kendi ışığını yüzeye düşürür.
5. Foley dosyaları henüz yok: `kalem-kagit, kalem-tik, pens-tik, mandal-cit, kanat-titrek, kanat-uzak, pencere-tutun, kivilcim-cirt, ates-yatak, muhur-tok, kagit-hisirti` → `tools/sfx.mjs` ile üretilecek (teknisyen).

## Yeni kit parçaları (tek liste, kit_eksik)
Mekân şablonları (bölümde toplam 4 şablon: senaryo ile aynı):
1. **ÇÖL-ÜS** (P01, P08–P10, P12): alçak nötr yapılar, saçak altı, ayaklı yakıt tankı; `sürü` (bulut+spiral) + `sürü_golgesi`, `tunek_dalgasi`, `kapsul_nabiz`, `kivilcim_dizisi`, `alev`. Dokunuş: D4, D5, D6.
2. **MAĞARA** (P01–P02): alacakaranlık çıkışı, sürü spirali. Dokunuşu yok; senaryo için gerekli.
3. **MASA-INSERT yeni proplar** (P03, P05, P07, P11; yeni şablon değil): `defter`+`kalem`+`cizim` morfı (D1), `kapsul`+uyuyan `yarasa`+cımbız eli (D2), `tepsi-goz` (D3), `belge` + mühür hedefi (D7).
4. **HARİTA ABD görünümü** (P04, P11): dokunuş yok; rota (`rota_noktalar`) var, görünüm yok.
Kısmen kitte: HARITA `muhur`, KT `darbe`, KolEl.
