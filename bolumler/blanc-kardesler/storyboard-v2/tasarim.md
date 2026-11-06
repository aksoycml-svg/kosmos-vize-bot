# Blanc Kardeşler (Bölüm 1) — Storyboard v2 Görsel Tasarım Dosyası (v2.1 — dönem revizyonu)

Hazırlayan: tasarimci · 2026-11-06 · **v2.1:** `donem-dogrulama.md` (araştırmacı, 8 maddelik düzeltme listesi), `dokunuslar.md` v2.1, güncel `sahne-plani.md` (P14/P15 144 kare, P15 defter sayfası, P19 tokmaksız dosya kapağı, P01 geç gün ışığı) işlendi.
Girdi: `senaryo-v2.md` (v2.1), `arastirma.md`, `karakter/*`, `src/theme.ts`, `src/rig/Kukla.tsx`, `src/bolumler/blanc/proto/Sokak.tsx`, `src/components/ChappeTower.tsx`, `Harita.tsx`, `final/araba-yesil.png`, `final/S06.png`.
Bu belge **tasarımdır, kod değildir.** Kod bloğundaki sabitler motion'a öneridir, hiçbir dosyaya yazılmadı.

**v2.2 (eleştiri B + CLAUDE.md yeni kuralları):** Yeni bölümler: **3.1 PaketKagidi modülü** (yumuşak kâğıt paket; kutu/koli değil; kapalı/yarı açık/açık/kabartılı), **3.2 Bayrak (tricolore) çizim tanımı**, **2.11 Tüccar kartı** (motion'ın uyguladığı hâl), **2.12 Memur kolu + eli (`KolEl` modülü)**. Borsa salonundan tricolore kalktı (1.1). Paletlere `MEMUR_EL` genişletildi, `TUCCAR` güncellendi (bölüm 6).

**v2.3 DEĞİŞİKLİK NOTU (eldiven sürekliliği, eleştiri C SÜ1/SC1/TC1 + CLAUDE.md "İmza nesnesi tekildir"):** Beyaz eldiven filmin **imza nesnesidir**, beyaz yalnız 3 yerde: (1) kahraman eldiven (P01/P10/P15*/P16/P23), (2) Louis'nin cebindeki eldiven (P02–P18 cep köşesi), (3) P19'da Louis'nin giydiği eldiven. Louis P02–P18 **çıplak el**; François **taba deri eldiven** `#8a6a48`; kompars/rig varsayılan eldiveni krem/beyaz/açık gri olamaz; eldiven ölçüsü = yetişkin eli. İşlenen yerler: yeni **bölüm 0.6**, kartlar 2.1, 2.2, 2.3, 2.8, 2.10, 2.12 notu, prop tablosu (eldiven + yeni "cep eldiveni" satırı), bölüm 6 kod bloğu (`GLOVE`, `FRANCOIS_TABA`, `LOUIS_ELDIVENLI`, `ELDIVEN_OLCEK`, `KOMPARS_ELDIVEN`), 0.4 P18 satırı, 1.10 notu. (*P15: memurun elindeki buruşuk eldiven = aynı kahraman eldiven, 4. eldiven değil; orkestra teyit etsin.) **Memurun sol göğüs cebindeki beyaz köşe KALDIRILDI** (ikinci cep eldiveni = imza nesnesi tekrarı); sahne-plani/motion bu cep köşesini çizmesin.

**v2.4 DEĞİŞİKLİK NOTU (motion A4b bölüm 2 raporu + orkestra kararları + eleştiri D):** (1) **Cep eldiveni** rig yerel konumu `(40, −325)` → **`(−40, −318)`**; ekran boyutu göğüs planında **~80×50**, orta **~35×22**, geniş planda çizilmez; çizim tanımı güçlendirildi (kumaş kıvrımı, parmak uçları, gölge; "kart" okunmasın) → 0.6, 2.2, prop tablosu, kod bloğu. (2) **Eldiven beyazı ölçüm eşiği:** palet bandı (L\* ≥ 90) arşiv derecelendirmesinden sonra renderda oluşmuyor; **ölçülen eşik gündüz L\* ≥ 80, gece L\* ≥ 70, C\* < 12**, yalnız izinli yerlerde (A/B/C) → 0.6, kod bloğu `ELDIVEN_BANDI`. (3) **Katip:** siyah redingot yerine **açık gömlek kolu + kum yelek + kenar ışığı**; dönem notu "doğrulanmalı" → 2.7. (4) **Gömlek manşeti** rigde %20 koyulaştırıldı (beyaz bant olmasın) → 2.12, `MEMUR_EL`. (5) **Eleştiri D:** François taba eldiveni ile tüccar paltosu aynı ton (ΔE76 ≈ 9) → **tüccar paltosu `#7a5a2e` → `#4a4f42`** (ΔE76 ≈ 26), eldiven omuzda kenar vurgusu → 0.6, 2.11, `TUCCAR`.

**Kapsam notu:** Mekân kartlarının derinleştirmesini artık mekan-sorumlusu ajan `storyboard-v2/mekanlar.md` içinde yapıyor. Bu dosyada **karakter, prop, tipografi ve kimlik** bölümleri güncel; **mekân kartları (Bölüm 1) için yalnız yanlışlar düzeltildi.** Her kart (1.1–1.12) için **ayrıntı: mekanlar.md**; çakışırsa mekanlar.md önceliklidir, dönem doğruluğu sorularında `donem-dogrulama.md`.

Etiketler (her dönem iddiasının yanında):
- **[A]** `arastirma.md`'de kaynaklı.
- **[S]** senaryoda yazılı (kullanıcı onaylı; çoğu dramatizasyon).
- **[D✓] / [D~] / [D?]** `donem-dogrulama.md` sonucu: kesin / olası / bulunamadı.
- **[G]** Genel tarih bilgisi; doğrulanmadı. **[G ◐]** daha az emin. Doğrulanana kadar görsel yumuşak tutulur (okunur metin yok, tek ayrıntıya bağlı dokunuş yok).
- **[T]** Tasarım kararı (tarihî iddia değil).

---

## 0. Genel kararlar (kimlik)

### 0.1 Kimlik ve renk disiplini
- Kanal kimliği: eskimiş kâğıt `#e9dfc9`, mürekkep `#1c1915`, mühür kırmızısı `#b3261e`, altın `#b8862b` (`C`, `theme.ts`). Dünya renkleri (ay mavisi, amber, alacakaranlık moru, Bordeaux altını) prototipte onaylı. Yeni her renk **~%15 desatüre, kâğıt tonuna doğru ısıtılmış**; her sahneye `FilmLook` (tane + vinyet).
- **Yeni renk gerekçesi (onay bekler):**
  1. `redLit #e5483c`: `C.red #b3261e` koyu zeminde (`#14120f`) kontrast ≈ 2.9:1, altyazıda yetersiz. Aynı tonun aydınlık hâli ≈ 4.5:1. Açık/kâğıt zeminde `C.red` kalır (≈ 4.9:1).
  2. `up #5f9f6e` (patina yeşili): yalnız P10 "yeşil ↑". Bakır oksit tonu. Başka yerde yok.
  3. `boyaKrem #e6c88c`: P22 yay dolgusu (yaratıcı "krem", yönetmen "açık amber"; ikisinin ortası).
  4. `direkMavi #8fb2d8` (desatüre gök mavisi): **Chappe direği dışının gerçek rengi** [D✓]; yalnız direkte, kule bölümü 1.5.
  Yeni font yok. Fontlar: Playfair Display 900, Inter 500/800, IBM Plex Mono 500 (başka ağırlık/italik **yüklü değil**).
- **Chappe kule renkleri [D✓ kesin, donem-dogrulama 2a–c]:** **direk gök mavisi** (`#8fb2d8`), **regülatör ve iki gösterge siyah** (`#1c1915`), **karşı ağırlıklar (fourchettes) gri** (`#8a8d94`), kanatlar **sabit jaluzili (persiennes fixes)**. Alacakaranlık/gece siluetlerinde renk okunmaz (tümü koyu). Kırmızı yalnız fazladan çentik halosu ve mühürlerde.
- **Kule oranı [D✓]:** regülatör 4,60 × 0,35 m, göstergeler 2 × 0,30 m ⇒ **regülatör : gösterge ≈ 2,3 : 1**; direk ~7 m (≈ 1,5× regülatör). `ChappeTower.tsx` (280 × 90) 3,1 : 1: göstergeler **≈ 122 px**, regülatör kalınlığı ≈ 21 px, gösterge ≈ 18 px olmalı (bölüm 1.5).
- **Gece / sis kuralı [D~, Universalis]:** telgraf gece ve sisli havada çalışmaz. Kol hareketi yalnız gündüz planlarında (P01 geç gün ışığı, P05 harita, P11–P14, P21); gece planlarında (P07, P08, P16, P17) kollar sabit.
- **Kontur kuralı (her bölümde aynı çizgi kalınlığı):** karakter/prop konturu = rig `SW = 2` (yerel birim), renk `ink(fill)`, asla saf siyah değil. Dekor konturu ekranda 3 px (uzak) – 6 px (yakın). `strokeLinejoin="round"`.
- **Işık sözleşmesi:** Rig'deki kenar ışığı (`RIM #c4d6ff`) karakterin **baktığı yöndeki** kenara çizilir ve `facing` ile aynalanır; karakter ışık kaynağına bakacak şekilde yönlendirilir. Kontrajur/karşılıklı bakan planlarda `rim` bayrağı gerekir (Açık soru 8).
- **Ekran yönü:** P12–P13 kule zincirinde haber **soldan sağa** akar (Tours solda ufukta, sıradaki kule sağda). Bordeaux'da hat biter: sinyal **Saint-Michel çan kulesi üstünden** okunur [D✓], kule **sağda uzak ufukta** (P06/P14); suç ortağı sağa bakar.
- **Güvenli alan:** 1080×1920; canlı alan x 80–1000, y 220–1500. Kilit anlar y ≤ 1500.
- **Kukla boyu:** şapka dahil ≈ 620 birim (François), 635 (Louis). Oturma pozu denemesi: `thigh −88, knee 88, bodyY ≈ +105` (müdür P07).

### 0.2 "Yüz detayı yok" ile Kukla yüzü
Sanat yönetmeni kuralı "minimal siluet, yüz detayı yok". Onaylı prototip rig'i gözlü/kaşlı/ağızlı; senaryo dudak senkronu, kaş (P12), esneme (P13), göz kırpma (P04) ister. **Karar:**
- **Yüzlü (Kukla):** François, Louis, memur, müdür, ara-kule telgrafçısı, suç ortağı, tüccar.
- **Yüzsüz siluet:** katip (küçük), yargıçlar, jüri, arabacı, kompars. "Paris'teki adam" ve resmî görevli yalnız el/kol.
- **Siluet filtresi** (rig'deki göz beyazı palette gizlenemediği için):

```tsx
// <g filter="url(#siluet-uzak)"> <Kukla .../> </g>
// renk derinliğe göre: yakın #1c1a22, orta #2a2c3c, uzak #3a3c52 (gün sahnelerinde #5a4a3c / #7a6a58 / #9a8a74)
<filter id="siluet-uzak"><feColorMatrix type="matrix" values="0 0 0 0 0.227  0 0 0 0 0.235  0 0 0 0 0.322  0 0 0 1 0"/></filter>
```

### 0.3 Mekân – plan matrisi

| Mekân (ortak ad) | Yeni/Mevcut | Planlar | Işık varyantı |
|---|---|---|---|
| BORSA | yeni | P02 | gündüz altın |
| HARITA | mevcut (`Harita.tsx`) | P03, P05 | posta: gün-gece döngüsü / telgraf: sabit |
| SOKAK-BORDEAUX | `Sokak.tsx`'ten türer | P04 | gece ay + amber |
| TOURS-KULUBE-IC | yeni | P01, P07, P08, P10, P11, (P15 alt) | A **geç gün ışığı + fener** (P01, P10, P23) · B gece-mum (P07, P08) · C gündüz-soğuk (P11, P15 alt). PARIS-MASA = P01 plakası (P23) |
| KULE-DIS | yeni | P12, P13, P17 penceresi, P21 (TOURS-KAPI), P22 | KD-A Tours kapı gündüz · KD-B ara kule dış, gündüz · KD-C alacakaranlık siluet (P22; P17 gece statik) |
| PARIS-AVLU | yeni | P09 | gündüz |
| CATI-BORDEAUX | yeni | P06 | şafak |
| CATI-KATI | yeni | P14, P15 üst (ALTIN-MASA) | gündüz altın |
| YATAK-ODASI | yeni | P16, P17 | mum + soğuk mavi pencere |
| MAHKEME | yeni | P18, P19 | çapraz toz huzmesi (iki kamera yönü) |
| KANUN-INSERT | yeni | P20 | tepe açı, tek huzme |
| WIFI-MORF | yeni | P22 | alacakaranlık → ekran karanlığı |

### 0.4 Plan belgeleriyle çakışmalar: v2.1 sonrası durum
Güncel `dokunuslar.md` v2.1 ve `sahne-plani.md` okundu; önceki çakışmaların çoğu kapandı.

| Konu | Durum | Tasarım kararı |
|---|---|---|
| P06 tüy | Kapandı: tüy Louis'nin bordo koluna (dokunuşlar) | Bordo kol yüzeyi temiz; saat sahne elemanı |
| P08 | Kapandı: el–gölge, **kol çevirme yok, itme/çekme** | Duvarda boş gölge alanı (1.4); kule hareketi yok |
| P17 | Kapandı: kule **statik** (DINLEN), kum serpme | Kule statik, sağ alt: siyah kollu el + kum saçağı |
| P18 | Kapandı: saat ≥ 210 px, sarkaçlı | Sarkaç görünür |
| P19 | **Tokmak yok.** Başkan hükmü okur, **ciltli dosyanın kapağını kapatır (TOK)**, BERAAT aynı karede belirir | Dosya + karar kâğıdı çizilir (bölüm 3); tokmak/çan çizilmez |
| Mahkeme | Cübbe **tek koyu ton**, haç/arma yok, boş panel [D? 1b–1c] | Cübbe `#2a1c1e`; arka duvar boş lambri panel |
| P15 | **Takvim yaprağı kalktı**: Louis kaz tüyüyle defter sayfasına "1835" yazar, sayfayı koparır | Defter sayfası (bölüm 3); takvim bloğu yok |
| P12–P14 dürbün | Kule içinde ahşap kutuya **sabit**, elde tutulmaz; P12 göz oküler halkaya dayalı, P13 gözünü çeker, P14 teleskop pervaza kurulu | Prop ve KD-B güncellendi |
| P01 | **Geç gün ışığı / erken akşam**, pencere x 560–1000, y 450–770 | 1.4 ışık varyantı A |
| Bordeaux kulesi | **Saint-Michel çan kulesi üstünde T kol** (P06 kurulum, P14) | 1.7, 1.8 |
| P03 disk tarafı | Yönetmen sağ-üst, yaratıcı sol | Disk 200 px; tarafı yönetmen/yaratıcı seçer |
| Telgrafçı rengi | Yönetmen "kahve frak" (hâlâ), suç ortağı da kahve | **Zeytin yeşili** önerim; yönetmen onaylamalı |
| P18 cep | Yaratıcı: eldiven ucu görünür; yönetmen: "sırttan görünmüyorsa yan kesitten" | Yan kesit/omuz üstü çözüm yönetmende. **v2.3:** cep köşesi 0.6'daki biçimle (kumaş kıvrımı + iki parmak ucu + gölge; v2.4 ölçek: orta ≈ 35×22 px) görünür; P18'de Louis çıplak el |

### 0.5 Oda zemin parametreleri (`Sokak.tsx zemin(z,u)` sözleşmesi)
İç mekânlarda `zemin()` ile aynı formül: `y = yNear + (yFar − yNear)·sz(z)`, `x = lerp(xNear, xFar, sz(z))` (sol/sağ ayrı), ölçek `sNear → sFar` doğrusal.

| Mekân | yNear / sNear | yFar / sFar | x near (sol–sağ) | x far (sol–sağ) | Kaçış noktası |
|---|---|---|---|---|---|
| BORSA | 1700 / 1.15 | 980 / 0.50 | −100 – 1180 | 160 – 920 | (540, 880) |
| TOURS-KULUBE-IC | 1760 / 1.05 | 1400 / 0.80 | −60 – 1140 | 110 – 970 | (540, 700) |
| CATI-KATI | 1740 / 1.05 | 1250 / 0.60 | −60 – 1140 | 120 – 960 | (540, 880) |
| YATAK-ODASI | 1760 / 1.10 | 1380 / 0.85 | −60 – 1140 | 100 – 980 | (540, 900) |
| MAHKEME (alçak açı) | 1800 / 1.10 | 1220 / 0.45 | −100 – 1180 | 170 – 910 | (540, 1150) |
| PARIS-AVLU | 1780 / 1.05 | 1150 / 0.55 | −80 – 1160 | 150 – 930 | (540, 860) |
| CATI-BORDEAUX (teras) | 1760 / 1.20 | 1300 / 0.95 | −80 – 1160 | 200 – 880 | (540, 1000) |
| SOKAK-BORDEAUX | mevcut `zemin()` / `sokakGenislik()` | | | | bkz. 1.3 |

Ayak ve baston ucu daima `zemin(z,u).y` değerine basar.

### 0.6 İmza nesnesi: beyaz eldiven (v2.3, KARAR)
**Kural (CLAUDE.md "İmza nesnesi tekildir"):** filmde "eldiven beyazı" yalnız aşağıdaki 3 yerde görünür. Bunun dışında hiçbir eldiven, manşet-eldiven, el örtüsü beyaz/krem/açık gri olamaz. Gerekçe: P19 "çıplak el → eldiven = yükseliş" okunsun; sesi kapalı izleyen "beyaz eldiven" ile tek bir nesneyi (memurun sırrı) bağlasın.

| Yer | Planlar | Biçim | Renk |
|---|---|---|---|
| **A. Kahraman eldiven** (paketin içi) | P01, P10, P15 (memurun elinde buruşuk), P16, P23 | glacé erkek eldiveni, üç çizgili dikiş, ağzı açık manşet | `GLOVE.hero #f4efe2` |
| **B. Louis'nin cep eldiveni** | P02'den P18'e (sağ göğüs cebi) | cep ağzından **kumaş kıvrımı + iki parmak ucu**; kart/bilet/rozet gibi okunmaz (aşağıda) | `GLOVE.hero`, kıvrım gölgesi `GLOVE.heroGolge` |
| **C. Louis'nin giydiği eldiven** | P19 (EldivenEl insert + sonrası) | B'deki eldivenin aynısı elde; çıplak elden parmak parmak giyilir | `GLOVE.hero` |

**Yasaklar:** François beyaz/krem eldiven giymez. Memurun ceket cebinde beyaz köşe yok (v2.3). Kompars/yargıç/jüri/arabacı/Paris elleri/görevli eldiven giymez ya da koyu eldiven giyer. Görevli (P21) beyaz **manşet** eldiven değildir ama kayma olmasın diye `#e0d9c6` (L\* ≈ 87) olarak koyultuldu, "eldiven beyazı bandı" dışında. "Eldiven beyazı bandı" iki ayrı düzeyde tanımlıdır (v2.4): **palet değeri** hero = L\* 94.5, a\* −0.6, b\* 6.9 (palet bandı L\* ≥ 90, C\* < 12); **render ölçümü** (arşiv derecelendirmesi sonrası, motion A4b ölçtü: palet bandı hiçbir pikselde oluşmuyor) = **gündüz L\* ≥ 80, gece L\* ≥ 70, C\* < 12**. Kontrol (`sb2_kontrol.py`) ölçülen bantla yapılır: bu bantta ölçülen her bölge yalnız izinli A/B/C kutularında olabilir. Bunun dışında kalan açık tonlar (gömlek, kum yelek, manşet) **C\* ≥ 15** (sıcak, kirli) ya da L\* < bant tutulur ki bantla karışmasın.

**Karakter eldiven özeti**
| Karakter | P02–P18 | P19 | Not |
|---|---|---|---|
| François | taba deri eldiven `#8a6a48` (P02, P04; mahkemede çıplak: `FRANCOIS_ELSIZ`) | çıplak | beyazla karışmaz |
| Louis | **çıplak el** (`LOUIS_ELSIZ` P02'den P18'e genişledi) | hero eldiveni giyer (`LOUIS_ELDIVENLI`) | eldiven yalnız cepte |
| Memur | çıplak el (cep köşesi yok) | — | eldiveni **paketten** çıkarır (P01), elinde taşır (P15/P16) |
| Kompars (silüet) | eldiven yok (siluet filtresi eli kaybeder) | | yüzlü kompars (tüccar) çıplak el |

**Ton ayrışması (ΔE; hesap D65, sRGB→Lab, motion ışık altında `sb2_kontrol.py` ile doğrulayacak)**
| Çift | Lab (nötr ışık) | ΔE76 nötr | Işık altı hedef |
|---|---|---|---|
| hero `#f4efe2` | L 94.5 a −0.6 b 6.9 | referans | — |
| François taba `#8a6a48` | L 47.2 a 8.2 b 23.9 | **≈ 51** | ΔE2000 ≥ **20** her ışık varyantında (gün altın, fener amber, ay mavisi) |
| François taba vurgu `#a88660` (en açık) | L 58.2 a 7.8 b 25.5 | ≈ 42 | aynı |
| çıplak ten `#d9b190` (Louis eli) | L ≈ 73.6 a ≈ 12 b ≈ 24 | ≈ 30 | ΔE2000 ≥ **15** (P19'da çıplak → hero geçişi okunsun) |
| **Tüccar paltosu eski `#7a5a2e` (v2.4 KALDIRILDI)** vs François taba | Lab ≈ L 40.6 a 8.0 b 30.1 | taba ile **ΔE76 ≈ 9** | omuzdaki taba eldiven palto içinde kayboluyordu (eleştiri D) |
| **Tüccar paltosu yeni `#4a4f42`** (koyu zeytin-gri) vs François taba | Lab ≈ L 32.8 a −4.8 b 6.9 | taba ile **ΔE76 ≈ 26** (elle hesap, ±2) | ΔE2000 ≥ **15** her ışıkta; motion `sb2_kontrol.py` ile doğrular; sağlamazsa palto daha koyu/soğuk |
| eski Louis gri eldiven `#cfc9b8` (KALDIRILDI) | L ≈ 80 | ≈ 16 | eşik altı: hata kaynağıydı |
| eski François krem `#e8dcc0` (KALDIRILDI) | L ≈ 88 | ≈ 9 | eşik altı |
**Işık altı kuralı (v2.4, ölçüme bağlı):** taba eldiven amber ışıkta ısınır (kızıl-kahve), ay ışığında soğuk-koyu kahve olur; **taba L\* hiçbir zaman 70'i geçmez**; hero **gündüz planlarda L\* ≥ 80, gece planlarında L\* ≥ 70** (C\* < 12) ölçülür. Eski "hero hiçbir zaman 80'in altına düşmez" gece için gevşetildi (ay mavisi + vinyet). Eşik, eleştirmen onayına bağlıdır. Ölçüm aracı: "eldiven beyazı yalnız A/B/C" kontrolü (bölge ton + L\* eşiği) her kare protokolünde.

**Eldiven ölçüsü (eleştiri C TC1: eldiven elin %70'iydi):** `ELDIVEN_OLCEK` = bir yetişkin eli. Eldivenin el kısmı (manşetsiz) = çıplak el boyunun **×1.05**'i; P01'de el ≈ 270 px ise eldiven el kısmı ≈ 285 px, **avuç genişliği ≈ 130 px** (elin ≈ %48'i), parmaklar dolgun, uçları yuvarlak, manşet ağzı açık (kıstırılan kenar), bilek üstüne ≈ 60–70 px taşar. Yassı boş eldiven: kenar hafif dalgalı, avuçta tek kırışık. **Tutan elden küçük olamaz**; P10, P15, P16, P23, P19 aynı tabloya bağlı (hepsi el boyuna göre ×1.05; sabit px değil).

**Cep eldiveni (B) çizim tanımı (eleştiri C SÜ1 "rozet okunmasın"):**
- **Ölçek (v2.4, ekran boyutuna göre; motion `EldivenKose` Louis'nin ekran boyuna bakarak seçer):** göğüs/yakın planda **≈ 80×50 px** (v2.3'teki 50×30 de telefonda yetmedi), orta planda **≈ 35×22 px** (P04 p150 dahil), geniş planda (Louis boyu < 400 px) köşe **çizilmez** (okunmayan minik beyaz leke de rozet gibi okunur). Eski 24×14 → 50×30 → 80×50 geçmişi: "bilet/rozet" okunması boyuttan çok **biçim** sorunuydu, ikisi birlikte çözülür.
- **Biçim, "kart" okunmasın (eleştiri D, çizim tanımı güçlendirildi):** dikdörtgen/kart **değil**; hiçbir kenar ruler gibi düz değil.
  1. **Parmak uçları:** cep ağzından yukarı sarkan **iki yuvarlak parmak ucu**, biri öbüründen ≥ 10 px (80×50'de) yüksek; arada **parmak arası çentik** (V, yuvarlak dip); üçüncü parmağın ucu yalnız ipucu (arkadan 4–6 px); ucun tepesi tam yarım daire değil, hafif içe eğik (kumaş ağırlığıyla).
  2. **Kumaş kıvrımı:** eldiven kumaşı cep ağzında **şişer ve cebin kenarına bindirir** (kumaş cep ağzını örter; ağız çizgisi eldivenin ALTINDAN geçer, üstünden değil); eldiven gövdesinde **2 kıvrım çizgisi** (biri parmak aralarından başlayıp cebe doğru çekilir, biri ağızda yatay gerilme), her biri ışık + gölge çifti; yakın planda (80×50) 3. kısa kırışık serbest.
  3. **Gölge:** (a) cep ağzı içine düşen koyu gölge `#b5ad98` (eldivenin cebe girdiği yerde), (b) eldivenin **kendi gölgesi** bordo frak üstüne ışık tersi yönde, yumuşak kenarlı (≈ 6–8 px kayık, α .25 koyu bordo), (c) parmak ucu alt kenarında 1 gölge çizgisi, üst kenarında 1 ışık çizgisi. Gölge yoksa "üstüne yapıştırılmış kart" okunur: gölge **zorunludur** (orta planda yalnız (a) ve (b)).
  4. Hafif öne sarkma (−12° eğim korunur), üst kenar eğri; **hiçbir köşe 90° değil**, kenar boyunca ≥ 2 küçük dalga.
- **Mesafeye göre ayrıntı:** yakın (80×50) = 2 parmak ucu + çentik + 2 kıvrım + 3 gölge; orta (35×22) = 2 parmak ucu + 1 kıvrım + ağız gölgesi + frak gölgesi; geniş = çizilmez.
- Renk: `GLOVE.hero #f4efe2`, cep içine giren kısım ve kıvrım gölgesi `GLOVE.heroGolge #d9d2c0`, cep ağzı gölgesi `#b5ad98`. Bordo frak üstünde tek beyaz leke: kontrast yüksek, **vurgu olarak yeter**, ikinci beyaz öğe (mendil, gömlek köşesi) aynı göğüste yok.
- **Konum:** **sağ göğüs cebi**, kamera tarafında; rig yerel **`(−40, −318)`** (v2.4; eski `(40, −325)` uzak göğüsteydi ve ön kol cebi örtüyordu, BC7'nin kök nedeni). Louis'nin kolu göğsü örtüyorsa (P02 p168) köşe kolun açıkta bıraktığı göğüste durur. Kurulum → karşılık: P02'de en az bir kare ≥ 80×50 px (göğüs planı) görünür.
- Motion `Louis.cepEldiven` overlay'i `EldivenKose` (ayrı SVG: iki yuvarlak parmak ucu + kıvrımlar + gölgeler) olarak yazar; yerel konum yukarıdaki değer.

---

## 1. Mekân kartları (yalnız düzeltmeler; ayrıntı: mekanlar.md)

### 1.1 BORSA (P02) — ayrıntı: mekanlar.md
**Düzeltme:** Önceki "krem kireçtaşı" iddiası kaldırıldı. Palais de la Bourse (Gabriel, 1742–1749) borsa olarak biliniyor [D~]; **1830'lardaki iç düzeni ve fiyat ilanı biçimi bulunamadı [D?]**. Cam tonoz sonradan eklenmiş olabilir: açık avlu/portikli salon çiz, belirli iç mekân kopyalama. Tebeşirli tahta **dramatizasyon**; açıklamada belirtilsin (araştırmacı önerisi: ciltli defter + haykıran agent alternatif).
- **Amaç:** "Bordeaux'lu kardeşler... tahvile oynuyor." Sıcak altın öğle. Tahta başlığı **"PARIS · RENTE 3%"** (P02→P03 MATCH); gerçek fiyat iddiası yok. Kalem kaz tüyü + hokka [G]; kâğıt para yok. **Tricolore bu salondan kaldırıldı** (eleştirmen B BB3): ulusal bayrağın 1830'dan beri var olması iç mekânda asılı olduğunu kanıtlamaz ("kanıtsız dönem detayı nötr kalır") ve kadrajın en doygun lekesi olarak tahtadan göz çalıyordu. Bordeaux'yu taş, pilastr ve ışık söyler. **Kemer:** pencere/niş **yuvarlak (plein cintre) ya da basık** kemer + kilit taşı; **sivri (gotik) kemer yok** (Palais de la Bourse 18. yy klasik, eleştirmen B BB1), pencere oranı ≈ 1:2.
- **Düzen:** tahta x 300–780, y 400–760; katip estradında (z 5.5, u 0.50, merdiven kadraj sol-arka); François z 2.2/u 0.40, tüccar z 2.2/u 0.24, Louis z 2.3/u 0.62; 10–12 siluet kalabalık (3 animasyonlu).
- **Palet:** duvar taşı `#d8c49a` (sarımsı-bal) · gölge `#a58f68` · sütun `#efe2bd` · dama `#cbbd9c / #8b7b5c` · korkuluk `#5b3d25` · tahta `#1f2a26` · tebeşir `#f3eddc` · siluetler `#5a4a3c → #9a8a74`. Işık sol-üst, gölge sağ-aşağı.
- **Not:** Tebeşir "çıt" + toz çizgisi tahtada; Louis dönmez. Louis'nin cebinden beyaz eldiven köşesi (bölüm 2.2).

### 1.2 HARITA (P03, P05) — ayrıntı: mekanlar.md
**Kaynak:** `Harita.tsx`. Palet: zemin `#1a120b`, mürekkep `#2b1d10`, parşömen `parsomen.jpg` (~`#d9c49a`), kule parlaması `rgba(255,170,60)`, aktif kol `#b3261e`.
**Düzeltmeler**
- **Posta arabası (`araba-yesil.png`):** kapıdaki **arma/taç çizilmez, "ROYALES" yazısı kısaltılır/okunmaz bırakılır, yalnız "POSTES" levhası** [D? 4b]. Renk tek bir kesin iddia olmasın: üst gövde **gris puce / kahve** (`#5e5256`), alt gövde sarı-krem (`#cdbf9e`) [D~ 4a, tek kaynak]; "Restorasyon sarısı" olmasın. PNG rötuş gerekir; kromakey kenar temizliği; at başı ayrı katman (P03 at yorgunluğu).
- Disk 200 px (P03). Toz/sis tonu `#8b93ad` (P03 sonu = P04 sisi). Mühür çap 300 px, merkez (540, 880), **Chappe T baskısı** (arma yok; P21 ilanındaki mühürle aynı); P05→P06 MATCH (mühür = güneş diski).
- Kule ikonu T biçimli, 45° adımlı; pervane gibi dönmez.

### 1.3 SOKAK-BORDEAUX (P04) — ayrıntı: mekanlar.md
**Düzeltmeler [donem-dogrulama 3c–e]**
- **Çatı oranı ters çevrildi:** **tuile canal ağırlıklı (%60+), arduvaz azınlık** [D~]. Bordeaux'da çatılar (özellikle échoppe) **korniş arkasında sokaktan az görünür**; cephe baskın.
- **Cephe rengi:** "krem/pierre blonde" iddiası yok; kireçtaşı **sarımsı, gözenekli** [D~]. `SIVA` paleti ay ışığında sıcak gri-bej-bal: `["#7b7868","#867f6c","#706e72","#8a826f","#78766c","#74707a"]`.
- **Garonne:** "buharlı gemi yok" iddiası **kaldırıldı** (küçük vapurlar vardı, kanıt zayıf [D~]); tercihen **baca dumanı koyulmaz**, yalnız direkler (iddia yapmadan). Büyük gemiler yalnız **Pont de Pierre'in (1822) aşağısında** [D~].
- Yarı ahşap oranı `0.35 → 0.15`. Dükkân adları: `VINS`, `BOULANGERIE`, `CAFÉ`, `CHAPELIER`, biri `TONNELIER`.
**Uzak katman:** Notre-Dame çıkar; 4 direk x = 452, 512, 566, 628; üstler y = 760, 650, 720, 800; seren, sarılı yelken, halat; tepede amber fener; gövde bandı y 1090–1130; 3 sis düzlemi `#6e7aa6` (α .35/.25/.5). İsteğe bağlı çok uzak **Saint-Michel çan kulesi** silueti (bölüm 1.7 uyarısıyla).
**Palet (gece):** gök `#070b1f → #1b2852 → #40507e`, ay `#f2f0e6`, kenar ışığı `#c4d6ff`, amber `#ffb357 / #ff9a40 / #ffd98f`, panjur `#2f4a40 / #4a3328 / #33405a`.
**Perspektif:** `Sokak.tsx` gerçek tek nokta değil (`sz(z)` doğrusal); cephe tepe çizgileri y ≈ 838'de birleşir, zemin ufku y ≈ 977, sokak ucu `z = 7` ⇒ y = 1130, x 410–670. Türetme: `Sokak.tsx` (`uzak` prop'u, `SIVA`, çatı varyantı), P04 insert `FareInsert.tsx` (ızgara z 2.2, u 0.58).
**Not:** Baston ucu taşa gömülmez; baston **Louis'nin dış elinde**, tutan el görünür (eleştirmen B SK1). **P04'te kullanıcı bir tricolore istiyor:** konumu mekân sorumlusu (mekanlar.md) belirler; çizim tanımı (oran, şerit sırası, kumaş, gönder) bölüm **3.2**.

### 1.4 TOURS-KULUBE-IC (P01, P07, P08, P10, P11, P15 alt) — ayrıntı: mekanlar.md
**Düzeltmeler**
- **Işık A = geç gün ışığı / erken akşam (P01, P10, P23):** pencereden alçak sıcak güneş (anahtar), masada küçük fener tamamlayıcı; **gökyüzü mor değil, soluk altın** (`#e8c88a → #f2e2b8`). Gölge **sol-aşağı** (pencere sağ-üstte) + fener kare kafes deseni. (Telgraf gece çalışmaz [D~].)
- **Pencere A (P01 masa plakası):** x 560–1000, y 450–770 (440×320, ≈ %17), kanca yazısının altı. Orta planda (P07–P08) x 700–890, y 760–1100.
- **Manipulateur [D✓ 2h]:** **içeride, direk dibindeki odada**; kablo + makara ile dışarıdaki kolların konumunu **minyatür** tekrarlar; kumanda **itme/çekme** (kol çevirme yok). Regülatör pencere A tezgâhında. Çentik sayısı iddia edilmez. İstasyonda **2 stationnaire** [D✓], üçüncü kişi koyma.
- **Tuffeau:** beyazdan sarıya, **hafif lekeli, tebeşirimsi** [D~]; tek ton değil. Arduvaz çatı [D?]: dışarıdan görünmez, iddia yok.
- Pencere dışı kule: **tek ahşap direk (gök mavisi) + siyah T kol**, kafes/pilon yok (`S06.png` ihlali).
**Düzen (özet):** duvar-zemin y ≈ 1400; sol arka kapı x 110–330, y 420–1400; pencere B sol duvar (uzak önceki kule); masa üst düzlem y 1330–1500, x 260–960; çekmece plan başında yarı açık; **P08 el–gölge alanı** (duvar x 500–900, y 700–1250 boş); müdür sandalyede (oturma pozu).
**Işık varyantları**
| Varyant | Planlar | Anahtar | Dolgu | Gölge |
|---|---|---|---|---|
| A geç gün ışığı + fener | P01, P10, P23 | pencereden alçak güneş `#f2c27a` | fener amber `#ffb357` | **sol-aşağı** + kare kafes |
| B gece-mum | P07, P08 | mum alttan `#ffcf70` | pencere gece mavisi `#4a5f94` | yukarı ve duvara |
| C gündüz-soğuk | P11, P15 alt | pencere soğuk gün `#cfdcff` | oda amber α .15 | sol-aşağı |

**Palet:** duvar taşı `#5a5450 / #8a8478`, harç `#3a3632`, kiriş `#3b2818`, masa `#7a5230` (üst `#a07848`), zemin `#2d2a2c`, halat `#a07a48`, fıçı `#6a4a2c`, demir `#1c1915`, pirinç `#c9a24a`.
**Notlar:** P01 kol ILK→SAK "klak"; **P11 halo = ince kırmızı halka ø≈860, merkez (540, 950)** (P12 maskesiyle MATCH); P11 **sap iter-çeker**, dışarıdaki büyük kol karşılık verir (kablo/makara foley); P08'de memur parmak ucu üç kez "itip çeker gibi" tıklar; P10 çorabı kaldıran **çıplak** memur eli; P15 alt: buruşuk eldiven elde.

### 1.5 KULE-DIS (P12, P13, P17 penceresi, P21, P22) — ayrıntı: mekanlar.md
**Kule modeli (ChappeTower'dan türeme), düzeltilmiş [D✓]**
- `ChappeTower.tsx` yapı olarak doğru: T biçimi, tek direk, 3 kol. **Düzeltmeler:**
  1. **Direk gök mavisi `#8fb2d8`** (dış yüz; yakın planlarda P01, P12, P13, P21 gündüz), kollar **siyah**, karşı ağırlıklar **gri `#8a8d94`**; kırmızı gösterge **yok**.
  2. **Oran regülatör : gösterge ≈ 2,3 : 1:** regülatör 280×21, göstergeler **122×18** (mevcut 90 px fazla kısa/oransız), direk ≈ 1,5× regülatör.
  3. Kanatlar **sabit jaluzili** (5 ince çizgi α .25), pivotlarda altın perçin; direk dibinde ahşap payanda.
  4. Bina: piramit çatılı taş kulübe + küçük pencere (bina ayrı katman). Gövde tipi serbest (kare/yuvarlak/piramit ya da **çan kulesi üstü**) [D~ 2d].
- **Adlandırılmış kol konumları** (45° adımlı yedi konum [A]; açılar yaklaşık; yönetmen adları parantezde):

| Ad | Reg | Sol | Sağ | Kullanım |
|---|---|---|---|---|
| ILK ("A") | 0 | 45 | −45 | P01 f0, **P23 son kare** |
| SAK ("B") | 0 | 90 | −45 | P01 54. kare sonrası, P07 |
| MESAJ-A | 0 | 90 | −90 | P11/P13 normal |
| HATA ("X") | 0 | 135 | −90 | **fazladan çentik** (P11, P12 POV, P13, P14) |
| DINLEN | 0 | 0 | 0 | P17 (statik), P21, P22 başı |

**Varyantlar**
- **KD-A TOURS-KAPI (P21, gündüz):** tuffeau (beyazdan sarıya lekeli) `#e3dcc6 / #cdbf9e`, gölge `#b5ad94`; çatı koyu gri-mavi (arduvaz [D?], iddia yok); kapı ahşap `#5a3d28` demir bantlı, x 320–760, y 700–1400; ilan x 420–660, y 800–1100; direk kapı üstü x 380–700, y 330–700 (DINLEN). İlan: beyaz kâğıt `#efe9d8` [G ◐], üstte tricolore bandı 24 px, metin çizgileri okunmaz, **kırmızı balmumu mühür (Chappe T)**, 4 kare başlı demir çivi. **Düşen mandal:** pivotlu demir çubuk, çekiç titreşiminde 20° dönüp kancaya oturur "klank" (insert ≥ %14, 270 px). Görevli eli: siyah kol + **beyaz manşet**.
- **KD-B ara kule, dıştan pencere görünümü, gündüz (P12, P13):** taş kulübe, açık pencere, tezgâhta **ahşap kutuya SABİT iki pirinç tüp (biri Tours'a, biri sıradaki kuleye; elde tutulmaz, odak bir kez ayarlı)** [D✓ 2g]; telgrafçı bel üstü (**tek görevli** tarihe uygun [D✓ 2f]). Çatıda kendi direği (mavi + siyah kol). Ufukta soldan Tours kulesi, sağda sıradaki kule. **P12 POV:** tek daire maske, merkez (540, 950), ø≈860, pirinç halka; gözü oküler halkaya dayalı kalır, **odak halkası jesti yok**, kaş ekranın üst yarısında (göz y 520–820, kaş y 400–520). **P13:** gözünü çeker, doğrulur, omuz silker, manipulateur'ü **iter-çeker**, esner; kamera dışarıda geri çekilir.
- **KD-C alacakaranlık siluet (P22):** gök `#1d1838 → #3b2f5c → #8a5a6e → #d98a5a`; kule `#1c1915`, tek kenarda amber kenar ışığı. **P17 penceresi:** gece, **kollar statik (DINLEN)**, x 640–960, y 300–620.
**Not:** Kol hareketi yalnız 45° adımlar + 6 karelik "klak"; asla sürekli dönmez.

### 1.6 PARIS-AVLU (P09) ve PARIS-MASA (P23) — ayrıntı: mekanlar.md
**Düzeltmeler**
- Avlu görünümü araştırmada **bulunamadı [D? 4c]**: "bir posta avlusu", kemerli kapı, taş bina, arduvaz mansard genel kalır; **"Hôtel des Postes" yazısı yok**, konum iddiası yok.
- **Araba:** arma/taç **çizilmez**, yalnız **"POSTES"** levhası ("ROYALES" yok); renk: üst gövde gris puce `#5e5256` / kahve, alt gövde sarı-krem `#cdbf9e` (tek kaynak, yumuşak ifade). "TOURS" etiketi 380×110 px krem kâğıt.
- Düzen: araba z 2.2/u 0.62; arabacı kutuda z 2.2/u 0.80, **sağ ayağı kutu korkuluğunda**; Paris adamı z 1.6/u 0.28, **başı kadrajın üstünde kesik**, gri manşet + **sağ manşette tek altın düğme**. Gündüz, gölge sağ-aşağı.
- **PARIS-MASA (P23):** MASA-PLAKA (1.4) ile birebir aynı: aynı kamera, **aynı geç gün ışığı**, direk kolu ILK konumunda; paket **kapalı** biter; eller gri manşet. Paris'teki kule konumu belirtilmez (Açık soru 10).

### 1.7 CATI-BORDEAUX (P06) — ayrıntı: mekanlar.md
**Düzeltmeler**
- **Ufuktaki kule = Saint-Michel çan kulesi üstünde T kol** [D✓ 2d, kaynak: fr piratage] (P14 kurulumu). **Tarihî uyarı [G ◐]:** çan kulesinin sivri tepesi (flèche) 19. yy ortasında eklendi; 1834'te **düz tepeli** çiz, sivri uç koyma (Notre-Dame kuralı gibi); araştırmacı teyit etsin.
- **Çatılar tuile canal ağırlıklı** (kiremit `#9a5a3c`), arduvaz azınlık [D~]. Çinko yürüme sırtı (yönetmen). Pont de Pierre (1822) silüeti sis içinde [D~].
- Düzen: sun diski (540, 880) ø300 (P05 mührüyle MATCH), Louis z 2.0/u 0.45, kafes korkuluk üstü z 2.3/u 0.62, dormer soldan 2. Kontrajur ışık. Güvercin sağ-üstten çıkar; tüy bordo kola konar; saat sahne elemanı (cebinde eldiven köşesi).
- Palet: kiremit `#9a5a3c / #6a3a28`, korkuluk `#c4b08a`, çinko `#8a8f98`, hasır `#a07a48`, güvercin `#dfe2ea`, tüy `#cfd3dc`, kule siluet `#5a5a70` α .7.

### 1.8 CATI-KATI (P14, P15 üst = ALTIN-MASA) — ayrıntı: mekanlar.md
**Düzeltmeler**
- **P14 = 144 kare (2.4 sn).** Teleskop **pervaza kurulu**, elde tutulmaz; suç ortağı gözünü çeker, öne eğilir, çakıyla **pervaza çentik** atar, tekrar dayar; **"şlak/kapanma" jesti yok**; odak kayması tüm kadrajda: kule netleşir (1.0 sn net), kadraj sonunda odak Louis'ye. Suç ortağı tarihî Chappe istasyonunda olmadığı için kendi teleskopunu kullanır [D✓ 2g notu].
- **Pencerede Saint-Michel çan kulesi + tepesinde T kol** (≥ 230 px, HATA konumu, düz tepeli, bkz. 1.7 uyarısı); geometri: dormer x 380–900, y 380–1000; pervaz+çakı alt-sol x 80–620, y 1000–1290 (%22); pervaz onlarca eski çentik (beşli gruplar). Suç ortağı z 1.5/u 0.30, `facing = +1`; Louis z 3.0/u 0.78 bulanık.
- **P15 üst yarı (ALTIN-MASA), güncel:** ahşap kiriş ayraç y 948–972; **Louis'nin ciltli defteri pupitrde x 120–520, y 540–840**; altın yığını x 540–760, y 800–940; François'nın kadeh tutan eli x 780–1000, y 540–780. **Takvim bloğu yok.** Louis kaz tüyüyle defter sayfasına "1835" yazar, sayfayı koparır; pürüzlü kenarlı krem yaprak ≈ 210 px ayracı geçer, memurun omzuna konar.
- Palet: kiriş `#3b2818 / #5b3d25`, sıva `#b9ad92 / #8f8470`, zemin `#7a5230`, gök `#cfdcff → #f2e8c9`, çatılar kiremit ağırlıklı, pirinç `#c9a24a`, pervaz `#6a4a2c` (çentik iç `#2a1c10`). Işık pencereden sağdan-ön, gölge sola-aşağı.

### 1.9 YATAK-ODASI (P16, P17) — ayrıntı: mekanlar.md
**Düzeltmeler:** P17'de pencere kulesi **statik** (gece, kol hareketi yok); yazıcı **kurutma kumunu delikli kapaklı saçaktan** serper, yazının ~10 cm üstünden; saçağın kenarında sığ tabla [D✓ 7]. Düzen (yönetmen): demir yatak [G ◐], mum soldaki komodinde, pencere sağ-arka (kule x 640–960, y 300–620), sandalyede yüzsüz siluet (z 2.8, u 0.85) + yazı sehpası (kâğıt, hokka, kum kabı), memur z 2.2/u 0.45 (eldiven plan başından elde), ceket askıda. Kukla yatamaz: yorgan çokgeni önde, `lean ≈ 60–70°`, takke overlay. Palet: duvar `#4a4238 / #6a5f52`, yorgan `#6b5a4a`, çarşaf `#d8d0bb`, parke `#5a4630 / #3b2c1c`, pencere `#4a5f94`, mum `#ffcf70`, yazıcı kolu `#1c1915`. Işık: mum anahtar (sol-alçak), pencere soğuk dolgu.

### 1.10 MAHKEME (P18, P19) — ayrıntı: mekanlar.md
**Düzeltmeler (donem-dogrulama 1a–1d, dokunuslar v2.1)**
- **Tokmak ve el çanı çizilmez** [D? 1a]. Başkanın önünde **açık ciltli dosya + karar kâğıdı** (P18 kurulum); P19'da başkan hükmü okur, kâğıdı bırakır, **dosya kapağını kapatır (TOK)**, BERAAT aynı karede belirir.
- **Cübbe tek koyu ton** `#2a1c1e` (bordo-siyah arası, renk okunmaz) + beyaz rabat; kırmızı/siyah iddiası yok [D? 1b]. **Arka duvarda haç/arma/tricolore/büst yok, boş lambri panel** [D? 1c]. Jandarma yok (kaynak yok).
- **Düzen [T]:** başkan + 2 yargıç (3) ve **12 kişilik sivil jüri siluet sırası solda** [D~ 1d: sayı güvenli, yerleşim tasarım kararı, tarihî iddia olarak sunulmaz]. Salon tarifi araştırmada yok.
- **İki kamera yönü:** MAHKEME-A (kürsü yönü, P18, pencereler solda; **sarkaçlı saat x 760–960, y 470–680, ≥ 210 px**, sarkaç görünür) ve MAHKEME-B (sanık sırası yönü, P19; pencereler sağda, huzmeler sağdan, Louis ekran solu, François sağı).
- Palet: lambri `#3b2818 / #5b3d25`, zemin `#2d2118`, kürsü `#2f2016`, cübbe `#2a1c1e`, rabat `#efe9d8`, toque `#1a1418`, huzme `#fff1c8` α .22, dosya kapağı `#3a2c24`, karar kâğıdı `#e9dfc9`. Alçak açı, kaçış (540, 1150). Karakterler pencereye bakar.
- Yargıçlar Kukla dışı statik siluet; iki kardeş Kukla (`FRANCOIS_ELSIZ`, `LOUIS_ELSIZ`, şapkalar dizde). P19: Louis çıplak elle başlar (P02–P18'in devamı, `LOUIS_ELSIZ`), cepten beyaz eldiveni çıkarır, parmak parmak giyer (EldivenEl insert, `LOUIS_ELDIVENLI`, imza nesnesi C); François bu planda **çıplak el** (taba eldiven yok, beyaz hero eldiven tek başına parlasın).

### 1.11 KANUN-INSERT (P20) — ayrıntı: mekanlar.md
**Düzeltme:** yargıç kolu **tek koyu ton cübbe** (kırmızı/siyah iddiası yok), rabat manşet `#efe9d8`. Code pénal (1810) cilt, yeşil çuha `#2f4a40`, "bomboş sayfa" dramatizasyon; güve p+0'dan oluğunda kapalı (~110 px) → açık ~220 px, üst-sağdan çıkar. Tek çapraz huzme.

### 1.12 WIFI-MORF (P22) — ayrıntı: mekanlar.md
Ahşap dokulu, neon yok; yaylar `boyaKrem #e6c88c` ile **alttan yukarı dolar**; merkez (540, 800), boy ≈ 600 px (%31): dış `r 545`, orta `365`, iç `190`, kalınlık 84, nokta `r 55`. Malzeme koyu ceviz `#3b2412`, altın perçin `#d4ad52`. Morf: regülatör → dış yay, göstergeler → orta/iç yay, direk → nokta; mafsal noktaları sabit. Direk gök mavisi **yok** (alacakaranlık siluet). Yazı ALT-BANT.

---

## 2. Karakter kartları

**Ortak:** rig `Kukla.tsx`; çizgi `SW = 2`; oranlar sabit; yürüme `yuru`. Paletler ve rig ekleri bölüm 6.
**Yakalanan tutarsızlıklar**
- `karakter/louis-kart.png`: sağ alt portrede **yeşil dolar benzeri kâğıt para** (kural: yok). Yalnız yüz/kıyafet referansı; para sahnesinde altın/gümüş frank.
- `karakter/francois-kart.png`: yelek gri desenli; rig `#6e5a3a` kahve-altın. Şapka kartta lacivert, rig/senaryo siyah. **Rig/senaryo kanon.**
- Rig tüm karakterlere eldiven çizer; çıplak el için `glove = skin`. **v2.3:** rig varsayılan eldiveni artık krem/gri **olamaz** (François krem `#e8dcc0` ve Louis gri `#cfc9b8` kaldırıldı; bölüm 0.6). Rig'de `Palet.glove` verilmezse `KOMPARS_ELDIVEN` (koyu) ya da `skin` kullanılır.

### 2.1 François Blanc
- **Kostüm (rig kanon):** lacivert frak `#24407a`, kahve-altın yelek `#6e5a3a` + altın zincir, krem kravat `#f1e8d2`, pantolon `#3a3530`, siyah silindir `#141317`, **taba/kahverengi deri eldiven `#8a6a48`** (gölge `#5e4630`, vurgu `#a88660`; v2.3, eski krem `#e8dcc0` beyazla karıştığı için kalktı). Taba eldiven L\* ≈ 47 (hero beyazından ΔE76 ≈ 51; ışık altında bile ΔE2000 ≥ 20, bölüm 0.6), yelek `#6e5a3a` ve ten ile de ayrışsın diye eldiven yelekten **daha kızıl-açık** çizilir, dikişi `#5e4630`. Mahkemede (P18–P19) çıplak el.
- **Silüet farkı:** normal boy silindir, **kıvrık bıyık uçları**, bastonsuz, **parlak krem kravat**, favori 1, kaş 1. Varyant `FRANCOIS_ELSIZ` (mahkeme, şapka dizde). P04'te filmdeki tek göz kırpma.

### 2.2 Louis Blanc
- **Kostüm (rig kanon):** bordo frak `#74222f`, gri yelek `#85878e`, siyah kravat `#16141a`, pantolon `#46464c`, **uzun gri şapka** (`tall = 1.15`), **ÇIPLAK EL P02–P18** (v2.3; eski gri eldiven `#cfc9b8` kaldırıldı), altın topuzlu baston. Eldiven yalnız cepte (P02–P18) ve P19'da elinde.
- **Silüet farkı:** şapka %15 uzun ve açık değerli, dikey baston, kısa düz bıyık, favori 1.35, kaş 1.2, siyah boyun.
- **Cep eldiveni (süreklilik, v2.3 yeniden):** P02, P04, P06, P07, P18'de **sağ göğüs cebinden eldiven köşesi** (`GLOVE.hero #f4efe2`, **ekran boyuna göre: göğüs ≈ 80×50, orta ≈ 35×22 px, geniş çizilmez (v2.4)**, rig yerel `(−40, −318)`; iki yuvarlak parmak ucu + kumaş kıvrımı + gölgeler + cep ağzı çizgisi, −12° sarkma; "bilet/rozet/kart" okunmasın diye çizim tanımı 0.6'da güçlendirildi). Tam tanım ve ölçek tablosu: **bölüm 0.6**. P19'da cepten çıkarılır, parmak parmak giyilir. Cepte **başka beyaz öğe yok**.
- **Elsiz varyant:** `LOUIS_ELSIZ` artık **P02–P18'in tamamında** (eskiden P18–P19) — Louis P04'te beyaz eldivenli çiziliyordu, hata. Giydikten sonra (P19) eldiven **kahraman beyazı `#f4efe2`** (`LOUIS_ELDIVENLI`, eldiven boyu = el ×1.05); giyme insert'i rig dışı **EldivenEl** vektör çizimi (`KolEl` iskeleti). P02'de **kaz tüyü + defter**, P15'te kaz tüyüyle defter sayfasına "1835" yazar ve sayfayı koparır.
- **Baston:** P04 sağ elde; P06 sol kola asılı (cane yatay ya da korkuluğa dayalı); P07–P08 masaya dayalı; P18–P19 sıraya dayalı.

### 2.3 Memur (Tours müdür yardımcısı)
- **Rol:** riski taşıyan. **Zayıf, yıpranmış gri ceket, şapkasız** [S]. İstasyonda iki görevli (müdür + yardımcı) tarihe uygun [D✓ 2f]; terim farkı: kaynaklarda "directeur + assistant" ve "2 stationnaire"; anlatımda yumuşak.
- **Kostüm:** gri redingot `#6b6a66`, dirsek/manşet yama (`#5a5953`), soluk yelek `#5a5347`, eski keten kravat `#b9b29d`, pantolon `#4b4741`; çıplak eller; ~~sol göğüs cebinde beyaz eldiven köşesi~~ **KALDIRILDI (v2.3)**: ikinci cep eldiveni imza nesnesini tekrarlıyordu. Memurun eldiveni paketten çıkan **tek** kahraman eldivendir (P01 çeker, P15/P16 elinde buruşuk taşır); ceket cebi düz.
- **Silüet farkı:** tek şapkasız ana karakter, **dar** (`scaleX 0.86`, `scaleY 1.02`), hafif öne eğik, seyrek saç.
- **Rig:** `MEMUR`; şapkasız için `sapkaTip: "yok"` (öneri). **Evrim:** `MEMUR` → `MEMUR_HASTA` (P15 alt) → `MEMUR_YATAK` (P16–P17: gece gömleği, takke, terli parlama; ceket askıda).
- **Kol ve el çizimi:** bölüm **2.12** (`KolEl`); P01'de kol "tek parça kalas" okunuyordu (eleştirmen B TB3), koni + dirsek + kırışık + manşet ile yeniden tanımlandı.
- **Oyunculuk:** P07 çekmece çarpınca göz kırpma; **P08 parmak ucu "kol itip çeker gibi" üç tık** (manipulateur kablo/makara [D✓]); P11 sapı iki elle iter-çeker, ter; P15 öksürük (omuz bir tık düşer).

### 2.4 Müdür (Tours istasyon müdürü)
- **Rol:** yaşlı, iri, açgözlü; yalnız P07. (Davadan sonra istifa etmek zorunda kaldı [D✓ fr piratage]: filmde gösterilmez.)
- **Kostüm:** zeytin-kahve redingot `#5a4630`, hardal yelek `#a58a4a`, kalın beyaz kravat, çıplak el, **kırçıl saç** `#b9b5ab`, geniş favori 1.7, kaş 1.5; şapkasız.
- **Silüet farkı:** **iri ve geniş** (`scaleX 1.18`, `scale 1.08`), memurun zıttı; **sandalyede oturur**.

### 2.5 Ara-kule telgrafçısı (P12, P13)
- **İsim notu:** İstekte "Tours telgrafçısı". Senaryoda P12: sıradaki kulede bir telgrafçı Tours kulesine bakıyor; yani Tours'tan *sonraki* ara kule görevlisi (Açık soru 2). Ara kulede **tek görevli** tarihe uygun [D✓].
- **Kostüm:** zeytin yeşili iş redingotu `#4f5a3e`, **hardal yün atkı** `#c79a3a`, yelek `#7a6a48`, çıplak eller, şapkasız. **Kısa-tombul** (`scale 0.94`, `scaleX 1.12`), kalın kaş 1.3. Yönetmen "kahve frak" yazıyor; suç ortağıyla karışmasın diye zeytin (onay bekler).
- **Oyunculuk (v2.1):** P12 gözü **sabit dürbünün oküler halkasına dayalı kalır** (göz çekilmez, odak jesti yok), `browF/browB +1` tek kaş kalkar; P13 **gözünü dürbünden çeker, doğrulur**, omuz silker, manipulateur'ü **iter-çeker**, `agiz "A"` esneme (yüz ≥ %15–18). "Dürbünü indirir/tezgâha koyar" yok.

### 2.6 Suç ortağı (Bordeaux)
- **Rol:** kuleye bakan gözcü [A]. Kaynakta adı geçen "Renaud" ve "eski memur" detayı kullanılmaz; kiralık oda [D✓ fr piratage] çatı katıyla uyumlu.
- **Kostüm:** toprak kahve redingot `#4a3a2c`, hardal yelek `#7d6a3f`, siyah kravat, çıplak el, kısa koyu saç, **basık kasket** `#3a2c20`. Silüet: toprak tonları, eğik duruş, teleskopa dayalı göz.
- **Rig:** `SUC_ORTAGI`; `sapkaTip: "kasket"` (öneri); `facing = +1`, `lean ≈ 25`.
- **Oyunculuk (v2.1):** teleskop pervaza kurulu; gözünü çeker, öne eğilir, **çakıyla pervaza çentik** atar, doğrulur, gözünü dayar; kapanış jesti yok.

### 2.7 Katip (Borsa)
**v2.4 (motion A4b + orkestra kararı):** siyah redingot ve siyah kol koruyucuları **kalktı**: koyu kıyafet koyu tahtada (`#1f2a26`) kayboluyor, yazan kol okunmuyordu. Yeni: **redingotsuz, açık gömlek kolu** `#d9ccae` (L\* ≈ 82, C\* ≈ 19 ⇒ eldiven beyazı bandına girmez, bkz. 0.6) + **kum rengi yelek** (`KATIP_ACIK`), 3 px sıcak **kenar ışığı** (tahtadan ayrışsın; kol L\* ≥ tahta + 35), gri saç, küçük ölçek (z 5.5); artık siluet değil, motion'da sade yüzlü/yarı yüzsüz çizilir (kuralı tasarımcı 0.2'ye göre "katip yüzsüz" idi; motion yüzü çizdi, bu belge motion'ın uyguladığı hâli alır). Kol yüksekte (`shF ≈ −150`).
- **Dönem kontrolü:** 19. yy büro katipleri **kolluk (manches de lustrine / sleeve guards)** takardı, ama kaynaklı bilgim bu kolluğun **koyu** (siyah/lacivert lüstrin) olduğu yönünde ve koyu kolluk tam da çözmeye çalıştığımız kontrast sorununu geri getirir; **açık renk (ham keten/ekru) kolluk için kaynağım yok ⇒ [G ◐] doğrulanmalı**, araştırmacıya soru. **Redingotsuz gömlek kolu** (ceketin çıkarılıp yelekle çalışması) bir büro katibi için olası ama 1830'lar Bordeaux Borsası'nda **kanıtlanmadı [D?]**; dramatizasyon/okunurluk kararıdır [T], tarihî iddia olarak sunulmaz. **Yedek (araştırmacı olumsuz dönerse):** koyu redingot kalır, kontrast **kum yelek + açık kravat + güçlü kenar ışığı + tahtanın katibin arkasında açık bölgeye (tebeşir yazılı alan) denk getirilmesi** ile sağlanır; açık kolluk eklenmez.

### 2.8 Paris'teki adam: gri manşetli eller (P09, P23)
- Yüzü hiç görünmez [S]. **Gri manşet + sağ manşette tek altın düğme**, P09 ve P23'te aynı.
- **P09:** Kukla `PARIS_ADAM` (koyu redingot `#2b2a30`, başı kadrajın üstünde kesik) + gri manşet overlay (`Palet.cuff` önerisi).
- **P23:** yalnız eller (sprite seti): çıplak el `#d3a784`, koyu kol `#2b2a30`, manşet `#7c7f87`, altın düğme `#d4ad52`; 3 poz: eldiveni koy, katla, ip çek; kâğıt altında eldivenin beş parmağı **kabartı**.
- Paris elleri **çıplak** (eldiven yok); P23'te elleri tutan nesne = kahraman eldiven (A), kâğıt altında kabaran beş parmak da aynı eldiven ölçüsünde (el boyu ×1.05, bölüm 0.6). Gri manşet `#7c7f87` eldiven değil, L\* ≈ 53.
- Resmî görevli (P21) manşeti **kirli beyaz** `#e0d9c6` (v2.3: `#efe9d8` eldiven beyazı bandına yaklaşıyordu), çıplak el `#d8ae8b`, eldiven yok.

### 2.9 Arabacı (P09)
Keten bluz `#b8a882`, deri yelek `#5a3f28`, pantolon `#4a3b2c`, geniş kenarlı yağmurluk şapka `#2b2420`, diz üstü çizme `#2a1d14`. **Özel statik oturan figür** (yüzsüz), yalnız sağ bacak/çizme animasyonlu; **sağ ayağı kutu korkuluğunda**; paketi **topuğuyla** durdurur; plan başından kadrajda.

### 2.10 Kompars seti (isimsiz)
Borsa kalabalığı (10–12 siluet, 3 animasyonlu), **tüccar** (yüzlü, bkz. 2.11), seyirci (8–10 siluet), **12 kişilik sivil jüri** (siluet, [T]), **yargıçlar** (3, tek koyu ton cübbe, statik). Jandarma yok. Yüzsüz siluet filtresi, ayak temas gölgesi. **Eldiven (v2.3):** kompars/yargıç/jüri/arabacı/katip/müdür/telgrafçı/suç ortağı/tüccar eldiven giymez (`glove = skin`) ya da gerekiyorsa `KOMPARS_ELDIVEN #3a3530` (koyu, L\* ≈ 22); **beyaz/krem/açık gri eldiven yasak** (imza nesne tekdir). Silüet filtresi elleri zaten kaybettirir; yüzlü kompars (tüccar) çıplak elle çizilir. Rig `Palet.glove` boş kalırsa varsayılan `skin`.

### 2.11 Tüccar (P02) — motion'ın uyguladığı hâl
- **Rol:** François'nın gülerek omzundan tuttuğu Bordeaux tüccarı; kalabalığın tek **yüzlü** isimsiz figürü. Tebeşir kırılınca kalabalıkla birlikte tahtaya bakar (kaş kalkık, ağız "O").
- **Kostüm / yüz (`TUCCAR_V`):** **kır saç ve kır sakal** `#9a958a` (`sakal: true`), **bıyıksız** (`biyik: "yok"`), geniş favori (`sideburn 1.8`), belirgin burun (`burun 1.2`), **geniş kenarlı şapka** (`sapka: "genis"`, `#4a3a26`, şerit `#2a2016`), **koyu zeytin-gri redingot `#4a4f42`** (koyu `#33372e`, açık `#62685a`; v2.4: eski hardal-kahve `#7a5a2e` François'nın taba eldivenine `#8a6a48` ΔE76 ≈ 9 ile aynı tondu, omuzdaki eldiven kayboluyordu, eleştiri D; yeni ΔE76 ≈ 26), hardal yelek `#a58a4a`, krem kravat `#d8d0bb`, pantolon `#3a3530`.
- **Silüet farkı:** **tıknaz** (dış sarmalayıcı `scale(1.12, 1)`), **kısa** (`scale × 0.95`), geniş kenarlı şapka (kardeşlerin silindirinden ve kalabalığın silindirlerinden ayrılır), sakal. Ana kadronun yüzü kopyalanmaz (CLAUDE: kompars ayrışır). Kalabalık 4 iki tonlu yüzsüz varyanttan oluşur (silindir/geniş şapka, sakallı/sakalsız).
- **Dönem:** geniş kenarlı şapka ve çene sakalı 1830'larda yaşlı/taşralı kesim için olası [G ◐]; baskın moda silindir olduğu için "farklı kişi" ipucu olarak kullanılıyor, tarihî iddia değil.
- **Omuzdaki el ayrışması (v2.4):** taba eldiven (`#8a6a48`) koyu zeytin-gri palto (`#4a4f42`) üzerinde L\* 47 → 33, ton yönü de ayrı (sıcak/soğuk); ek olarak omuz temas bölgesinde eldivenin üst kenarına `tabaIsik #a88660` 2 px kenar çizgisi ve paltoda eldivenin altına 6 px temas gölgesi. Yan ürün: yelek `#a58a4a` ile palto arasında da kontrast artar. Sağlanmazsa yedek: eldiven tonunu değiştirmek yerine palto daha da koyulur (`#3f443a`), çünkü eldiven tonu 0.6'daki "ΔE2000 ≥ 20 hero'dan" tabloya bağlı.
- **Konum / oyunculuk:** z 1.6, u 0.20, `facing +1` (François'ya dönük); François'nın sağ kolu tüccarın omzuna `kolIK` ile gider (omuz noktası rig yerel (50, −352)). Reaksiyon: `lookY −0.6`, `headTilt −6`, `agiz "O"`, `browF/browB 0.8`.

### 2.12 Memur kolu ve eli — `KolEl` modülü (P01, P10, P11, P15, P16)
**Sorun (eleştirmen B TB3/TB4):** kol sabit genişlikte 1000 px'lik gri kalas; dirsek, kırışık, perspektif yok; el sırtı "gaga". Telefonda (360 px) ve f0 kapak karesinde kol okunmalı. Aynı iskelet `EldivenEl` insert'iyle (P19), Paris elleriyle (P09/P23), görevli eliyle (P21) ve yazıcı eliyle (P17) **ortak modül** olur; farklı olan kol/manşet paletidir.

**Kol (ceket, P01 tepe-önden ~60°):**
- **Perspektif koni:** kol kameraya doğru genişler: bilekte ≈ 90 px, kadraj kenarında ≈ 200 px (paralel kenarlı kalas yok). Kol **sol kenardan** girer (y ≈ 1250–1400), alt köşeden değil.
- **Dirsek:** 25–35° kırılma; iç kıvrımda **3–4 kumaş kırışığı** (her biri ışık + gölge çizgi çifti, kol eksenine 20–40° açıyla), iç kıvrım gölgesi `#35342f`. Dış noktada **yama** `#5a5953` (kola paralel, ≈ 70×60 px, yuvarlatılmış köşe, kesik dikiş çizgisi `#3d3c38`, bir köşesi kalkık, iplik ucu); sol alttaki kalkan biçimli anlamsız yama kalkar.
- **Kumaş:** yıpranmış gri redingot `#6b6a66`; ışık şeridi `#8a8983` (ışık yönü ışık sözleşmesine göre: P01 pencere sağ-üstte ⇒ kolun üst/sağ kenarı aydınlık, alt/sol gölge `#46453f`); kontur yakın 6 px, iç çizgiler 3 px; en fazla 3 doku katmanı (dokuma, aşınma, ışık).
- **Ceket manşeti:** kol ucunda 1,2× aydınlık şerit, 2 dikiş çizgisi, yıpranmış kenar (iplik uçları), **iki düğme izi, biri düşmüş** (ø10 px `#1c1915` + eksik yerde ip ucu). Bilek üstünde kumaş yığılması (3 kısa kıvrım).
- **Gömlek manşeti:** ceket manşetinden **14–18 px taşar**, `#d8d0bb`, kirli kenar `#b9b29d`, buruşuk. Telefonda koldan "kol" okutan en güçlü ipucu bu açık bant (≥ 14 px). **v2.4:** rigde gömlek manşeti **%20 koyulaştırıldı** (etkin ≈ `#ada696`, kirli kenar ≈ `#948e7d`; L\* ≈ 68): çıplak bilekte "beyaz bant" eldiven beyazıyla karışıyor/imza nesne tekrarı okunuyordu. Bant hâlâ ≥ 14 px ve koldan ayrışır; tasarım değeri `gomlekManset` kodda etkin renge çekildi.

**El (çıplak, `#d9b190` / gölge `#a9806a`):**
- **Anatomi:** ince, kemikli; el sırtında 3 metakarp çizgisi, 2 soluk damar (`#8c8a9a` α .35), her parmakta **2 boğum çizgisi + eklem çıkıntısı** (küçük ışık noktası), başparmak ayrı segment (2 boğum), bilekte kemik çıkıntısı. Parmak uzunluk oranı: işaret 1.0, orta 1.08, yüzük 0.96, serçe 0.78, başparmak 0.8. Parmak araları **negatif boşluk ≥ 6 px** (avuç üçgen/"gaga" olmasın; avuç dikdörtgenimsi).
- **Tırnak:** oval, kısa, ışık `#e8cdb4`, kenar `#c9a38a`, alt kenarda kir çizgisi.
- **Boyut:** el ≥ 200×190 px (telefonda ≥ 75 px); kol girişten ele ≈ 700–800 px.
- **Titreme:** ±1.5° ve ±2 px, ≈ 9 Hz, p+62–134'te sönümlenir.

**Pozlar**
| Poz | Kullanım | Tanım |
|---|---|---|
| `kistir` | P01 eldiveni çekme, P10 çorabı kaldırma | **Başparmak üstte, işaret parmağı altta** eldiven/çorap ucunu kıstırır (kıstıran parmak uçları görünür, kumaşa gömülmez); diğer üç parmak kıvrık/serbest, serçe havada; kumaş parmak ucunda yumuşak çöker ve sarkar (katı kalıp gibi durmaz) |
| `kavra` | P11 manipulateur sapı (iki el) | 4 parmak sapı sarar, başparmak karşıdan; eklemlerde kavrama açıklığı (`#ead0b8` α .5), ön kol perspektifle kısalmış, dirsek açık |
| `tik` | P08 masada üç tık | parmak ucu masaya "itip çeker gibi", el yarı yatık |
| `yumruk` | P15 alt (eldiven sıkılı) | buruşuk eldiven avuçta, boğumlar beyaz |
| `gevsek` | P16 gevşeyen el | parmaklar yarı açık, bilek sarkık; kol **gömlek** (`#d8d0bb`, aynı dirsek kırışıkları) |

**Modül imzası (öneri):** `KolEl({ kol: "ceket" | "gomlek" | "parisManset" | "gorevli" | "yazici", poz, titreme, olcek, yon })`. Paris eli: koyu redingot kol + **gri manşet + sağ manşette tek altın düğme**; görevli: siyah kol + **beyaz manşet**; yazıcı: siyah kol. Telefon testi (360×640): koni siluet + dirsek açısı + beyaz manşet bandı + parmak boşluğu bir arada kol olarak okunmalı; okunmuyorsa büyütülür.

---

## 3. Prop listesi

"Temas yüzeyi / ses" sütunu `Temas = ses` kuralı içindir.

| Prop | Dönem notu | Boyut / renk | Planlar | Temas yüzeyi ve ses |
|---|---|---|---|---|
| **Eldiven (kahraman) · İMZA NESNESİ A** | Glacé (kuzu/dana) erkek eldiveni, beyaz [G]; ön yüzde üç çizgili dikiş. **Ölçü = yetişkin eli:** el kısmı = el boyu ×1.05 (P01'de ≈ 285 px), avuç ≈ 130 px, parmak uçları yuvarlak dolgun, manşet ağzı açık, yassıyken kenar dalgalı, avucta tek kırışık (tutan elden küçük olamaz; eleştiri C TC1) | `#f4efe2`, gölge `#d9d2c0`, dikiş `#b9ad92` | P01, P10, P15 (memurun elinde buruşuk), P16, P23 | kâğıt hışırtı, masa "tap", P16 parke "tok" |
| **Cep eldiveni · İMZA NESNESİ B** (Louis, sağ göğüs cebi) | Aynı eldivenin cepten sarkan köşesi: **iki yuvarlak parmak ucu + parmak arası çentik + 2 kumaş kıvrımı + cep ağzı ve frak gölgesi**, −12° sarkma; kart/bilet/rozet değil. Göğüs ≈ 80×50 px, orta ≈ 35×22, geniş planda çizilmez; rig yerel (−40, −318). Tam tanım: 0.6 | `#f4efe2`, kıvrım `#d9d2c0`, cep ağzı gölgesi `#b5ad98` | P02–P18 (P02 p168, P04, P06, P07, P18 görünür) | sessiz (cepte); P19'da çıkarken kumaş "fış" |
| **Giyilen eldiven · İMZA NESNESİ C** (Louis, P19) | B'nin aynısı elde; çıplak elden **parmak parmak** giyilir (EldivenEl/KolEl iskeleti), ölçü A ile aynı | `#f4efe2`, gölge `#d9d2c0` | P19 | `p19_eldiven-gerilme.wav` (deri gerilme) |
| **François'nın eldiveni** (beyaz DEĞİL) | Taba/kahverengi deri erkek eldiveni; beyazla karışmaz (ΔE76 ≈ 51, ışık altında ΔE2000 ≥ 20) | `#8a6a48`, gölge `#5e4630`, vurgu `#a88660`, dikiş `#5e4630` | P02, P04 (mahkemede çıplak) | sessiz |
| **Yün çorap** | El örgü koyu yün, topuk yamalı [G] | `#4b3a2c`, yama `#6a5340` | P10 | kenardan sarkar "flop" |
| **Ok etiketi** (↑ yeşil / ↓ kırmızı) | İple bağlı kâğıt kart [T]; oklar SVG | `#efe9d8`, `#5f9f6e`, `#e5483c` | P10 | kâğıt hışırtı |
| **Paket kâğıdı + ip (`PaketKagidi`, 3.1)** | **Eldivene doğrudan sarılan yumuşak kahverengi paket kâğıdı + kenevir ip [S]; kutu/koli/mukavva DEĞİL** (modern, anakronik); "TOURS" etiketi 380×110 | kâğıt `#b08a5a`, ip `#d8c9a0` | P01, P09, P10, P23 | kâğıt hışırtı, ip "zıııt", çatıda "tok" |
| **Altın kesesi + frank** | Deri/kadife kese; altın 20 frank, gümüş 5 frank [G]; **kâğıt para yok** | kese `#3e3426`; altın `#d4ad52`; gümüş `#c9ccd2` | P07, P08, P15 | kese kayma, sikke şıngırtı |
| **Çekmece** | Ceviz, pirinç halka | `#7a5230`, `#c9a24a` | P07 | "bam" |
| **Cep saati** | Cep saati yaygın; **kapaklı (savonnette) tip 1830'larda olası** [D~ 6]; zincirle yelek cebine | kasa `#d4ad52`, kadran `#f2ecd8`; **kapak içi kadran okunmaz**, marka/fiyat yazısı yok | P06 (+ masa) | kapak "çat" |
| **Dürbün / teleskop (pirinç)** | **Kule içinde ahşap kutuya SABİT iki tüp** (biri önceki, biri sonraki kuleye), elde tutulmaz, odak bir kez ayarlı [D✓ 2g]; P14 suç ortağı **kendi teleskopu** pervaza kurulu | pirinç `#c9a24a / #f1d48a / #7a5a1f`, deri `#5a3a22`, kutu `#5b3d25` | P12, P13 (sabit), P14 (kurulu) | P12 göz/alın halkaya "tık"; P14 göz teleskopa "tık"; **odak halkası "kırt" ve "şlak" yok** |
| **Çakı** | Katlanır çakı [G] | çelik `#aab0bd`, sap `#5b3d25` | P14 | pervaz "kırt" |
| **Pervaz çentikleri** | Beşli sayma işaretleri, onlarca eski çentik (kurulum) [T] | `#2a1c10` | P14 | — |
| **Defter (ciltli) + defter sayfası "1835"** | Ciltli defter; **elle yazılmış "1835" sayfası** (kaz tüyü), pürüzlü kenarlı krem yaprak ≈ 210 px koparılır [G]. **Takvim yaprağı yok** [D? 5] (yedek: ciltli almanak sayfası) | sayfa `#e9dfc9`, mürekkep `#1c1915`, cilt `#5a3a22` | P02 (kurulum), P15 | tüy cızırtı, sayfa yırtılma "çıt", omuza konma yumuşak |
| **Ciltli dosya + karar kâğıdı** | Başkanın önünde açık ciltli dosya; **tokmak/el çanı yok** [D? 1a]. Kapak kapanır "TOK" | kapak `#3a2c24`, kâğıt `#e9dfc9`, bağ `#8a2c24` | P18 (kurulum), P19 | kapak "TOK" (ahşap/karton, kısa reverb), kâğıt bırakma |
| **Baston** | Ahşap koyu, altın topuz [rig] | `#3b2412`, `#d4ad52` | P04, P06, P07, P18 | kaldırım "tak" |
| **Kanun kitabı** | Code pénal (1810), dana derisi cilt, kırmızı etiket [G] | `#5a3a22`, etiket `#8a2c24`, harf `#b8862b` | P20 | sayfa hışırtı |
| **İlan** | Beyaz resmî ilan, tricolore bandı, kırmızı mühür [G ◐] | `#efe9d8`, mühür `#b3261e` | P21 | çivi "tak-tak-TAK" |
| **Demir mandal** | Düşen mandal + kanca [G] | `#1c1915` | P21 | "klank" |
| **Güvercin / kafes** | Posta güvercini [A]; hasır kafes | `#dfe2ea`; `#a07a48` | P06 | kapak "tak", kanat |
| **Kule kolları** | Regülatör + 2 gösterge **siyah, sabit jaluzili, karşı ağırlık gri, direk gök mavisi**, oran 2,3:1 [D✓]; T biçimli (yel değirmeni **asla**) | bölüm 0.1 ve 1.5 | P01, P05, P11–P14, P17, P21–P23 | menteşe "klak" |
| **Manipulateur (kumanda)** | **İçeride, direk dibinde, kablo + makara**, minyatür T tekrarı; kumanda **itme/çekme** [D✓ 2h]; çentik sayısı iddia edilmez | demir `#1c1915`, pirinç `#c9a24a` | P08 (el), P11, P13 | "tık-tık-TIK" + kablo/makara gıcırtısı |
| **Fener** | Kare cam fener, tenekeli [G] | teneke `#6a6a70`, cam `#ffd98f` α .8 | P01, P10, P23 | masaya "tık" |
| **Şamdan + mum** | Pirinç şamdan [G] | `#c9a24a`, alev `#ffcf70` | P07, P08, P16 | masaya konuş |
| **Kaz tüyü + hokka** | 1830'lar yazı aracı [G] | `#e8e0cc`, `#1c1915` | P02, P15, P17 | cızırtı |
| **Kum saçağı** | **Delikli kapaklı kum kabı, kenarında sığ tabla**; kurutma kumu 19. yy boyunca kullanıldı [D✓ 7] | pirinç/ahşap `#c9a24a` | P17 | ince kum "şş" (−5) |
| **Yazı sehpası (lap desk)** | Taşınabilir yazı sehpası [G] | ceviz `#5b3d25` | P16–P17 | kalem cızırtı |
| **Tebeşir** | Beyaz | `#f3eddc` | P02 | "çıt", sekme "tak" |
| **Duvar saati** | Sarkaçlı, beyaz mineli, Roma rakamı; ≥ 210 px, sarkaç görünür | `#f2ecd8`, çerçeve `#5b3d25` | P18 | sandalye gıcırtı, "TIK" |
| **Ter damlası** | | r ≈ 10 px, `#cfdcff` α .7 | P11 | "tıp" |
| **Güve** | | `#b9a98a`, ~220 px | P20 | kanat sesi |

### 3.1 `PaketKagidi` modülü (P01, P09, P10, P23 ortak)
**Dönem kararı:** 1834 paketi = **eldivene doğrudan sarılan yumuşak kahverengi paket kâğıdı + kenevir ip** [S]. **Kutu, koli, kapaklı mukavva yok:** oluklu mukavva 19. yy sonu/20. yy [G]; mevcut stil karesindeki RSC tipi karton koli (eleştirmen B TB1) kaldırılır. P23'ün "kâğıdın altında eldivenin beş parmağı kabarır" dokunuşu yalnız yumuşak sarım ile fiziksel.

**Yapı:** tek parça dikdörtgen kâğıt (≈ 30×36 cm), eldiven düz yatar; kâğıt **zarf gibi** katlanır: iki yan kenar ortaya, alt ve üst kıvrım üst üste. Kenevir ip **boyuna bir, enine bir kez çaprazlanır**, ortada fiyonk/düğüm; **TOURS etiketi düğüme ipiyle bağlı** (`ToursEtiketi`: ip deliği = bağ noktası; kapalıda düğümden sarkar, açıkta ipiyle kâğıdın yanında yatar). Her planda **aynı kâğıt dokusu ve etiket** (P09→P10 MATCH, P01↔P23 döngü).

| Durum | Planlar | Çizim |
|---|---|---|
| **KAPALI** | P09 (araba çatısında), P23 son kare | Dikdörtgen ≈ 1:1,25; yan kenar katları ve alt kat görünür, üst bindirme; **ip çaprazı + fiyonk** (≈ 20 px kabarık), etiket sarkar; kenarlar yumuşak yuvarlak (keskin kutu köşesi yok), hafif şişkin eldiven kabarıklığı |
| **YARI AÇIK** | P01 f0–f54 | **Eldiven kâğıt ağzından yarı çıkmış**; üst kanat geri yatmış ve kalkık, yan kanatlar gevşek açılmış; **ip çözülmüş** (düğüm yok, iki uç masada kıvrık); kâğıt eldivene takılır, çıkınca yavaşça masaya yatar (p60) |
| **AÇIK** | P01 p54 sonrası, P10 | **4 kanat (üst/alt/sol/sağ) masaya yatık**, uçları hafif kalkık (kat çizgisi = **ışık + gölge çifti**), ortada eldiven boyu sığ **kırışık yatak**, **yan duvar yok**; ip çözülmüş: iki uç masada gevşek kıvrım, kâğıtta **ezik fiyonk izi** ve çapraz ip izleri (silik çizgiler); ip açık paketin üstünden **geçmez**, düğüm havada asılı kalmaz (eleştirmen B TB2) |
| **KABARTILI** | P23 p54–p120 | KAPALI durumunun üstüne: kâğıdın altında **eldivenin beş parmağı** kabartı (parmak sırtında ışık şeridi, ışığın tersine gölge; ip gerildikçe α 0 → .5, düğüm sıkılınca .15'e yatışır) |

**Parametre önerisi:** `PaketKagidi({ acik: 0..1, kabarti: 0..1, ipCozuk: boolean, etiket: boolean })`: `acik` 0 = kapalı, ~0.5 = yarı açık, 1 = açık; kanat çokgenleri (4) `acik` ile döner/yassılır.
**Renkler:** kâğıt `#b08a5a`, aydınlık yüz `#c49f6c`, gölge `#8a6a40`, kat ışığı `#d9bf94`, kat gölgesi `#6e5230`, eskime kenarı `#9a7a4c`; ip `#d8c9a0` (kontur `#8a7a52`, 5–6 px, çapraz bükülme çizgileri). Tek doku katmanı: ince yatay kâğıt lifi (α .12).
**Işık:** P01/P10/P23'te geç gün ışığı (pencere sağ-üst) ⇒ kat ışıkları sağda/üstte, gölgeler sol-aşağı; P09 gündüz sol-üst güneş ⇒ gölge sağ-aşağı.
**Telefon (360×640):** paket "kâğıt paket" okunmalı: 4 kanat siluetinin kontrastı (kâğıt `#b08a5a` ↔ masa `#7a5230`/aydınlık yüz), ip çarpısı, TOURS etiketi. Okunmuyorsa kanatlar büyütülür, kutu hissi veren dik kenarlar yasak.
**Ses/foley:** kâğıt hışırtısı (açılış/katlama), ip "zıııt" (P23), çatıda "tok" (P09).

### 3.2 Bayrak (tricolore) çizim tanımı
Kullanıcı **P04 sokak planında bir tricolore** istiyor; **konumu mekân sorumlusu** (mekanlar.md) belirler. **Borsa salonunda yok** (1.1). Çizim tanımı:
- **1830+ ulusal tricolore:** **dikey** şeritler, **mavi gönderde (hoist), ortada beyaz, dışta kırmızı** [CLAUDE]. Beyaz Bourbon bayrağı ve zambak/arma/yıldız/yazı **yok**.
- **Oran:** yükseklik : genişlik ≈ 2 : 3; üç şerit okunurluk için **eşit** (1 : 1 : 1; 1794 düzenlemesindeki 30:33:37 denizcilik oranı [G ◐], karada eşit okutulur).
- **Kumaş:** keten/yün bunting, **hafif dalgalı**: dalga genliği uca doğru artar (`wave(x) = sin(frame·0.12 − x·0.05)·(x/L)·12`, mevcut `Sokak.tsx` `Bayrak`), kenar ucu hafif yıpranmış; üç şeride ortak **kumaş gölge degradesi** (gönderden uca α .1 → .45), dikiş çizgisi şeritlerin birleşiminde.
- **Renkler (gün):** mavi `#2a3f7e`, beyaz `#d9d4c8`, kırmızı `#a8262c`. **Gece/ay ışığında** doygunluk ~%30 düşer (ay mavisine çekilir); kırmızı bandın alanı küçük tutulur (kırmızı yalnız mühür/hata/vurgu kuralı: bayrak göz çalmaz, doygunluk ~%70).
- **Gönder:** duvardan çıkan **eğik gönder** (≈ 25–30° yukarı), koyu ceviz `#3b2412` (kenar `ink`), ucunda pirinç topuz `#c9a24a`; bayrak 3 pirinç halkayla göndere bağlı. Gönder sarkık bayrak taşıyorsa şeritler göndere **paralel**, mavi gönder tarafında; yatay açık dalgalanıyorsa mavi gönderde dikey şerit.
- **Gölge:** ışık kaynağının tersine; bayrak ve gönder duvara gölge düşürür (tek ışık kaynağı).
- **Ölçek:** sokakta gönder dahil ≈ 180 px, bayrak ≈ 150×100 (`Sokak.tsx`), cepheye perspektifle oturur; yazı bandına (üst y 240–400) girmez.

---

## 4. Ekran yazısı tipografisi ve isim etiketi

### 4.1 Teknik sınırlar
- **Yüklü ağırlıklar:** Playfair Display **900**, Inter **500 ve 800**, IBM Plex Mono **500**; **italik yok.** Prototipteki `fontStyle: italic` sahte italik üretir, kaldırılır.
- **Türkçe büyük harf:** `text-transform: uppercase` yalnız `lang="tr"` ile doğru; ya da büyük harf doğrudan yazılır.
- **Ok glifi riski:** `theme.ts` aralığı `↑ ↓` içerir, **`→ (U+2192)` içermez**. Tüm oklar **SVG yol** (Açık soru 9).
- **Güvenli alan:** x 80–1000, **ÜST-BANT y 240–400**, **ALT-BANT y 1290–1490**; hiçbir yazı y > 1500 değil.
- **Dünya içi yazı:** "1835" (defter sayfası) ve "TOURS" etiketi dünya içinde **Playfair 900 mürekkep** ile çizilir (yeni font yok); el yazısı hissi için hafif eğim + mürekkep taşması (`feTurbulence`). Okunur tek yıl: "1835".

### 4.2 Yazı tipleri
| Tip | Kullanım | Font / boyut | Renk | Konum |
|---|---|---|---|---|
| **T1 KÜNYE** | "TOURS · 1834", "Paris → Bordeaux: 3 GÜN", "Plan A: Güvercin — başarısız", "Tours Ağır Ceza · Mart 1837", "1836 · İçeriden biri" | IBM Plex Mono 500, **34 px**, aralık 0.18 em, büyük harf | altın `#b8862b` (koyu) / mürekkep (kâğıt şerit) | ÜST-BANT, sol x 80 |
| **T2 İDDİA** | "1834. Bilgisayar yok.", "Ya fark ederse?", "Kimse durdurmadı. Herkes kopyaladı.", "Önce açık. Sonra yasa.", "Suç yok. Çünkü yasa yok.", "Elektrik yok. Sadece…" | Playfair 900, **72 px** / 64 px (iki satır), satır 1.05 | `#e9dfc9`, **vurgu `#e5483c`** | ÜST-BANT (T1 varsa tek satır); P12, P21, P22 ALT-BANT |
| **T3 FORMÜL** | "ELDİVEN = ↑ · ÇORAP = ↓" (P10), "Oyun: Paris'teki tahvil fiyatı" | Plex Mono 500 **42 px** + SVG ok (52 px, kalınlık 8) | kâğıt; ↑ `#5f9f6e`, ↓ `#e5483c` | ÜST-BANT |
| **T4 DAMGA** | "BERAAT" (P19) | Playfair 900, **170–180 px**, çift çerçeve (6+2 px), −4°, mürekkep eksik doku | `#e5483c`, kâğıt kenar 3 px | **ALT-BANT**; **dosya kapağı TOK karesinde belirir, animasyon yok** (P05 mührüyle metafor tekrarı olmasın) |
| **T5 ALTYAZI** | anlatıcı + replik | Inter **800**, **56 px**, satır 1.15, **en fazla 2 satır**, maks 920 | `#f6f1e4`; **vurgu `#e5483c`**; `textShadow: 0 3px 0 #000, 0 0 22px rgba(0,0,0,.9)` | alt kenar y ≈ 1490 |
| **T5b REPLİK ETİKETİ** | "FRANÇOIS", "LOUIS", "MEMUR" | Plex Mono 500 **30 px**, aralık 0.2 em | altın `#b8862b` | altyazı üstü |

**Kurallar**
- **Vurgu kelime kırmızı.** Prototipte ve `Film.tsx`'te "okunan kelime" altın `#ffcf70`: **kural ihlali.** Yeni: okunan kelime **ölçek 1.06 + parlaklık**, kırmızı yalnız planın anahtar kelimesi.
- Vurgu önerisi: P01 *hackledi*, P02 *tahvil*, P03 *üç günde*, P04 *kazanır*, P05 *devlete*, P06 *Olmadı*, P07 *satın*, P08 *hata*, P09 *paket*, P10 *düşüş*, P11 *hata*, P12 *iki dürbün*, P13 *kopyalıyor*, P14 *suç ortağı*, P15 *önce*, P16 *hastalanana*, P17 *anlattı*, P18 *Mahkeme*, P19 *Beraat*, P20 *yasa*, P21 *yasası*, P22 *siber*, P23 *Sadece*.
- **Giriş:** yukarıdan 30 px + opaklık (0.45 sn). **Çıkış fade değil:** kâğıt şerit gibi yukarı kayarak maskelenir (0.25 sn).
- Açık zeminde T1/T2 **kâğıt şerit** (`#e9dfc9` α .92, 2 px mürekkep üst-alt çizgi) üstünde mürekkep; vurgu `C.red`.
- Ses kapalı: yazı anlatımı tekrarlamaz, tamamlar. Kapak: ≤ 5 kelime, üst %22.

### 4.3 İsim etiketi ("dosya etiketi")
- **Form:** kâğıt etiket `#e9dfc9`, sağ üst köşe kesik (14 px), 2 px mürekkep kenar, tane, dolgu 14×22. Sol kenar **6 px sekme** = ceket açık rengi (François `#3c5ea3`, Louis `#9a3646`).
- **İçerik:** satır 1 ad, Playfair 900 **44 px** ("François", "Louis"); satır 2 Plex Mono 500 **30 px**, `#4a4237`, büyük harf: **"BLANC · BORDEAUX"** (rol iddiası yok).
- **Bağlantı:** şapka tepesine 3 px çizgi + 12 px daire; etiket şapkanın 60–80 px üstünde, y ≥ 240, yan 80 px; karakter yürürse ofsetle takip.
- **Giriş** 0.4 sn yukarıdan 20 px; **çıkış** yukarı kayıp maske. Yalnız P02'de.

---

## 5. Açık sorular (belgede "Açık soru N")

1. **Tokmak: kapandı.** P19 tokmaksız, ciltli dosya kapağı "TOK" (varsayılan karar; kullanıcı storyboard onayında değiştirebilir). El çanı önerilmiyor (1830'lar için kanıtsız).
2. **"Tours telgrafçısı" adı:** P12–P13 kişisi Tours'tan *sonraki* ara kule görevlisi; kart öyle. Yanlışsa Tours memuru kullanılır.
3. **"Yüz detayı yok" ile Kukla yüzü:** bölüm 0.2 uzlaşması onaylanmalı.
4. **Mahkeme:** haç/arma/cübbe rengi/jüri yerleşimi doğrulanamadı [D?]; tek koyu ton cübbe, boş panel, 3 yargıç + 12 jüri (yerleşim [T]) uygulandı.
5. **Takvim: kapandı** (defter sayfası "1835"). Yedek Alt-2: ciltli almanak sayfası.
6. **Posta arabası PNG'si:** arma/"ROYALES" rötuşu, renk (gris puce/kahve, tek kaynak), kromakey kenarı, at başı ayrı katman.
7. **Yeni renkler:** `redLit`, `up`, `boyaKrem`, `direkMavi` onay bekler.
8. **Rig kenar ışığı yönü:** `RIM` `facing` ile aynalanır; P06 kontrajur ve karşılıklı bakan çiftler için `Poz.rim`.
9. **Ok glifleri:** `→` aralıkta yok; `↑ ↓` woff2 glif varlığı doğrulanmadı (araç erişimim yoktu).
10. **Paris'te kule (P23):** araştırma Paris'in hattaki yerini vermiyor; konum belirtilmez.
11. **Borsa tahtası:** 1830'larda ilan biçimi bulunamadı [D?]; tebeşirli tahta dramatizasyon, açıklamada belirtilsin.
12. **Saint-Michel çan kulesi tepesi:** 1834'te düz tepeli mi (sivri flèche sonradan [G ◐])? Araştırmacı teyit etsin.
13. **Tours çatısı (arduvaz) [D?], tuffeau tonu [D~], Bordeaux cephe tonu [D~]:** yumuşak çizildi.
14. **Eski referanslar:** `S06.png` kafes pilon (Chappe değil); `louis-kart.png` kâğıt para.
15. **Kalan çakışmalar (0.4):** telgrafçı rengi, P03 disk tarafı, P18 cep görünürlüğü.
16. **Direk gök mavisi** gökte/gün ışığında az görünür (araştırmacı notu): yakın planlarda kontur ve siyah kollar kontrastı sağlar; test karesinde kontrol.

---

## 6. Önerilen palet sabitleri ve rig ekleri (kod bloğu; dosyaya yazılmadı)

```ts
// src/bolumler/blanc/palet.ts (öneri)
import type { Palet } from "../../rig/Kukla";
import { LOUIS, FRANCOIS } from "../../rig/Kukla";

export const BL = {
  redLit: "#e5483c",     // altyazı/vurgu, koyu zeminde
  up: "#5f9f6e",         // yalnız P10 ↑
  boyaKrem: "#e6c88c",   // yalnız P22 yay dolgusu
  gloveHero: "#f4efe2",  // kahraman eldiven (= GLOVE.hero; geriye uyum)
  // Chappe kulesi [donem-dogrulama 2a–c]
  direkMavi: "#8fb2d8", kolSiyah: "#1c1915", karsiAgirlik: "#8a8d94",
  // posta arabası (gris puce / kahve; arma yok)
  arabaUst: "#5e5256", arabaAlt: "#cdbf9e",
  // geç gün ışığı (P01, P10, P23)
  gecGunGok: "#e8c88a", gecGunGok2: "#f2e2b8", gecGunGunes: "#f2c27a",
  rimCool: "#c4d6ff", amber: "#ffb357", amberDeep: "#ff9a40", candle: "#ffcf70",
  tuffeau: "#e3dcc6", tuffeauSari: "#cdbf9e", tuile: "#9a5a3c", pierreBdx: "#d8c49a",
  brass: "#c9a24a", brassLight: "#f1d48a", brassDark: "#7a5a1f", walnut: "#3b2818",
  duskTop: "#1d1838", duskMid: "#3b2f5c", duskLow: "#8a5a6e", duskHorizon: "#d98a5a", screenDark: "#0e0d12",
  toz: "#8b93ad",        // P03 toz = P04 sis
  cubbe: "#2a1c1e",      // mahkeme cübbesi, tek koyu ton (renk okunmaz)
};

// ELDİVEN = İMZA NESNESİ (v2.3, bölüm 0.6). Beyaz ("eldiven beyazı" L*>=90, C*<12) YALNIZ hero-eldiven (A),
// Louis cep eldiveni (B), Louis P19 giydiği (C). Başka hiçbir palette glove bu bantta olamaz.
export const GLOVE = {
  hero: "#f4efe2",       // Lab ≈ L94.5 a-0.6 b6.9 — A, B, C
  heroGolge: "#d9d2c0",  // kıvrım/avuç gölgesi (L≈84.5) — hâlâ eldiven ailesi, ten değil
  cepAgzi: "#b5ad98",    // cep ağzı gölgesi (B)
  dikis: "#b9ad92",
  // François: taba deri (beyazla karışmaz). ΔE76 hero'ya ≈ 51, tene ≈ 27; ışık altında ΔE2000 >= 20
  taba: "#8a6a48",       // Lab ≈ L47.2 a8.2 b23.9
  tabaGolge: "#5e4630",
  tabaIsik: "#a88660",   // Lab ≈ L58.2 a7.8 b25.5 (en açık; L* 70'i geçmez)
  // kompars/rig varsayılanı: koyu ya da ten; krem/beyaz/açık gri YASAK
  kompars: "#3a3530",    // L* ≈ 22
} as const;
// Ölçü: eldiven el kısmı = çıplak el boyu × 1.05 (P01: el ≈ 270 px ⇒ ≈ 285 px, avuç ≈ 130 px). Sabit px değil, orana bağlı.
export const ELDIVEN_OLCEK = 1.05;
// v2.4: palet bandı renderda oluşmuyor (arşiv derecelendirmesi). Denetim ÖLÇÜLEN bantla: bu bantta ölçülen bölge yalnız A/B/C kutularında olabilir.
export const ELDIVEN_BANDI = { palet: { LMin: 90, CMax: 12 }, olcum: { gunduzLMin: 80, geceLMin: 70, CMax: 12 }, tabaLMax: 70, tabaDE2000Min: 20 };

const bare = (p: Palet): Palet => ({ ...p, glove: p.skin });
export const FRANCOIS_TABA = { ...FRANCOIS, glove: GLOVE.taba } as Palet;   // P02, P04 (+ sokak/borsa planları)
export const FRANCOIS_ELSIZ = bare(FRANCOIS);                                 // mahkeme P18–P19
export const LOUIS_ELSIZ = bare(LOUIS);                                       // P02–P18 TAMAMI (eskiden P18–P19)
export const LOUIS_ELDIVENLI = { ...LOUIS, glove: GLOVE.hero } as Palet;      // yalnız P19 (giyme sonrası)
// Louis cep eldiveni (B): overlay `EldivenKose`, rig yerel (-40, -318) (v2.4), ekran boyuna göre: göğüs ≈ 80×50, orta ≈ 35×22, geniş çizilmez.
// Dikdörtgen/kart değil: iki yuvarlak parmak ucu (biri ≥10 px yüksek) + çentik + 2 kıvrım + cep ağzı gölgesi + frak gölgesi (0.6).
export const CEP_ELDIVEN = { renk: GLOVE.hero, golge: GLOVE.heroGolge, agiz: GLOVE.cepAgzi, aci: -12, yerel: [-40, -318], goguPx: [80, 50], ortaPx: [35, 22], genisPx: null, kivrim: 2, parmakFarkPx: 10 } as const;

export const MEMUR: Palet = { coat: "#6b6a66", coatDark: "#46453f", coatLight: "#8a8983", vest: "#5a5347", vestDark: "#3d382f", vestDesen: "#5a5347", cravat: "#b9b29d", shirt: "#d8d0bb", pants: "#4b4741", shoe: "#1a1512", glove: "#d9b190", skin: "#d9b190", skinDark: "#a9806a", hair: "#5e5144", hat: "#2c2a26", hatBand: "#1c1b18", sideburn: 0.6, browHeavy: 0.8 };
export const MEMUR_HASTA: Palet = { ...MEMUR, glove: "#cdb7a2", skin: "#cdb7a2", skinDark: "#9a8573", hair: "#6a5f55" };
export const MEMUR_YATAK: Palet = { ...MEMUR_HASTA, coat: "#d8d0bb", coatDark: "#b3ab97", coatLight: "#efe8d6", vest: "#d8d0bb", vestDark: "#b3ab97", vestDesen: "#d8d0bb", cravat: "#d8d0bb" };
export const MUDUR: Palet = { coat: "#5a4630", coatDark: "#3a2c1d", coatLight: "#7a6044", vest: "#a58a4a", vestDark: "#7a6430", vestDesen: "#d9c47a", cravat: "#efe6d0", shirt: "#f2ede1", pants: "#3d352c", shoe: "#120e0b", glove: "#d79f7b", skin: "#d79f7b", skinDark: "#a86f55", hair: "#b9b5ab", hat: "#1e1a16", hatBand: "#2e2a24", sideburn: 1.7, browHeavy: 1.5 };
export const TELGRAFCI: Palet = { coat: "#4f5a3e", coatDark: "#323a28", coatLight: "#6c7956", vest: "#7a6a48", vestDark: "#54482f", vestDesen: "#7a6a48", cravat: "#c79a3a", shirt: "#d8cfb8", pants: "#3e3a34", shoe: "#17120e", glove: "#dcae8b", skin: "#dcae8b", skinDark: "#ad7b60", hair: "#4a3626", hat: "#4a3b2c", hatBand: "#2c241c", sideburn: 0.9, browHeavy: 1.3 };
export const SUC_ORTAGI: Palet = { coat: "#4a3a2c", coatDark: "#2e2319", coatLight: "#6a5440", vest: "#7d6a3f", vestDark: "#574a2a", vestDesen: "#a8935a", cravat: "#2b2a30", shirt: "#eee8d8", pants: "#34302b", shoe: "#0f0d0c", glove: "#d7a782", skin: "#d7a782", skinDark: "#a8765c", hair: "#2b1c12", hat: "#3a2c20", hatBand: "#241a12", sideburn: 1.1, browHeavy: 1.0 };
// v2.4 KATIP_ACIK: redingotsuz, açık gömlek kolu + kum yelek + 3 px sıcak kenar ışığı (dönem: doğrulanmalı [G ◐], 2.7). Eski siyah KATIP kalktı.
export const KATIP_ACIK: Palet = { coat: "#d9ccae", coatDark: "#b3a78a", coatLight: "#ece2c8", vest: "#b59f6e", vestDark: "#8a7850", vestDesen: "#b59f6e", cravat: "#d8d0bb", shirt: "#d9ccae", pants: "#3a3a3e", shoe: "#0f0d0c", glove: "#d8ae8b", skin: "#d8ae8b", skinDark: "#a97d62", hair: "#6a6a6a", hat: "#141317", hatBand: "#2a2a2e", sideburn: 0.8, browHeavy: 0.9 }; // coat = gömlek kolu; kenar ışığı #f2c27a
export const KATIP_KENAR = "#f2c27a";
// (eski, kullanılmaz) KATIP siyah: aşağıdaki satır yedek referanstır
export const KATIP: Palet = { coat: "#2d2b28", coatDark: "#1a1917", coatLight: "#4a4742", vest: "#8a8a80", vestDark: "#5f5f58", vestDesen: "#8a8a80", cravat: "#d8d0bb", shirt: "#e8e2d0", pants: "#3a3a3e", shoe: "#0f0d0c", glove: "#d8ae8b", skin: "#d8ae8b", skinDark: "#a97d62", hair: "#4a4a4a", hat: "#141317", hatBand: "#2a2a2e", sideburn: 0.8, browHeavy: 0.9 };
// Tüccar (P02): motion'ın uyguladığı hâl (2.11). Palet'teki biyik/sakal/sapka/burun alanları rig'de mevcut.
export const TUCCAR: Palet = { coat: "#4a4f42", coatDark: "#33372e", coatLight: "#62685a", vest: "#a58a4a", vestDark: "#7a6430", vestDesen: "#a58a4a", cravat: "#d8d0bb", shirt: "#e8e2d0", pants: "#3a3530", shoe: "#0f0d0c", glove: "#d8ae8b", skin: "#d8ae8b", skinDark: "#a97d62", hair: "#9a958a", hat: "#4a3a26", hatBand: "#2a2016", sideburn: 1.8, browHeavy: 1, biyik: "yok", sakal: true, sapka: "genis", burun: 1.2 }; // + dış sarmalayıcı scale(1.12,1), scale × 0.95
// KolEl (2.12): memur kolu/eli
export const MEMUR_EL = { kol: "#6b6a66", kolKoyu: "#46453f", kolIsik: "#8a8983", kirisikGolge: "#35342f", yama: "#5a5953", yamaDikis: "#3d3c38", manset: "#7a7975", gomlekManset: "#ada696", gomlekKir: "#948e7d", /* v2.4: rig %20 koyulaştırdı (eski #d8d0bb / #b9b29d) */ dugme: "#1c1915", ten: "#d9b190", tenKoyu: "#a9806a", tenIsik: "#ead0b8", damar: "#8c8a9a", tirnak: "#e8cdb4", tirnakKenar: "#c9a38a" };
// PaketKagidi (3.1) ve Bayrak (3.2)
export const PAKET = { kagit: "#b08a5a", kagitIsik: "#c49f6c", kagitGolge: "#8a6a40", katIsik: "#d9bf94", katGolge: "#6e5230", eskime: "#9a7a4c", ip: "#d8c9a0", ipKontur: "#8a7a52" };
export const BAYRAK = { mavi: "#2a3f7e", beyaz: "#d9d4c8", kirmizi: "#a8262c", gonder: "#3b2412", topuz: "#c9a24a" };
export const PARIS_ADAM: Palet = { coat: "#2b2a30", coatDark: "#1a1a1e", coatLight: "#44434c", vest: "#55555c", vestDark: "#3a3a40", vestDesen: "#55555c", cravat: "#d8d0bb", shirt: "#e9e3d2", pants: "#34302b", shoe: "#0f0d0c", glove: "#d3a784", skin: "#d3a784", skinDark: "#a77b5f", hair: "#2b2018", hat: "#141317", hatBand: "#2a2a2e", sideburn: 1, browHeavy: 1 };
// Kukla dışı (statik siluet/overlay)
export const YARGIC = { cubbe: "#2a1c1e", cubbeGolge: "#150d0f", rabat: "#efe9d8", toque: "#1a1418" }; // tek koyu ton; kırmızı yok
export const DOSYA = { kapak: "#3a2c24", bag: "#8a2c24", karar: "#e9dfc9" };
export const ARABACI = { bluz: "#b8a882", yelek: "#5a3f28", pantolon: "#4a3b2c", sapka: "#2b2420", cizme: "#2a1d14" };
export const PARIS_EL = { ten: "#d3a784", tenGolge: "#a77b5f", kol: "#2b2a30", manset: "#7c7f87", mansetKoyu: "#55575e", altinDugme: "#d4ad52", gomlek: "#e9e3d2" };
export const GOREVLI_EL = { kol: "#1c1915", manset: "#e0d9c6", ten: "#d8ae8b" }; // v2.3: manşet eldiven beyazı bandının altında (L*≈87), eldiven yok
export const YAZICI_EL = { kol: "#1c1915", ten: "#d3a784" };
```

**Rig'e (Kukla.tsx) gereken küçük ekler (motion):**
1. Şapka tipi: motion `Palet.sapka?: "silindir" | "genis" | "yok"` olarak **uyguladı** (tüccar geniş kenarlı); suç ortağı için `"kasket"` hâlâ eksik. Ayrıca `biyik`, `sakal`, `burun` alanları rig'de var.
2. `Poz.rim?: 1 | -1` (kenar ışığı yönü).
3. `Palet.cuff?: string` (gri manşet).
4. Genişlik/incelik için dış `scale(x,y)` sarmalayıcı yeter.
5. Siluet SVG filtresi (bölüm 0.2).
6. Oturma pozu: `thigh −88, knee 88, bodyY +105` denenmeli; olmazsa müdür özel statik figür.
7. `ChappeTower.tsx` (mekân tarafı ama kule imza nesne): `armColor`, `direkColor`, `agirlikColor` ayrı; gösterge uzunluğu 90 → ≈ 122; regülatör kalınlığı 16 → ≈ 21.
