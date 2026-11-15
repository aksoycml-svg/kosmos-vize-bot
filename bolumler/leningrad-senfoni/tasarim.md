# Leningrad'da 7. Senfoni — Görsel Tasarım (tasarımcı, 2026-11-15)

Girdi: `arastirma.md` §5 + §2A, `dokunuslar.md`, `sahne-plani.md` (§1 mekân, §7 kit_eksik), Paris `tasarim.md` §13–15, Çiçero `tasarim.md` (takim40/El40), `GORSEL-RECETE.md`, `KATALOG.md`; referans karelerine bakıldı: `paris-kusatmasi/kalibrasyon/tam-render-3/genel-tr.jpg`, `paris-kusatmasi/hedef/hedef-ozet.jpg`.
Spesifikasyondur, kod/görsel değil. Hex ve L\*/C\* elle hesaplandı (±3, "~"); motion `renk_olcum.py`, eleştirmen render'da ölçer.
Etiketler: **[A]** arastirma'da kaynaklı · **[S]** senaryo/sahne planı · **[G]** genel bilgi, kaynak açılmadı, **doğrulanmalı** (araştırmacıya) · **[T]** tasarım kararı. [G] hiçbir dokunuşu tek başına taşımaz, okunur metin içermez; doğrulanmazsa nötr kalır.
**Gemini kullanılmadı, arşiv görseli indirilmedi; `varliklar.md` açılmadı** (Wikimedia 429; kullanılırsa kaynak + lisans oraya yazılır).
**Yeni renk/font yok** (`theme.ts` değişmez). Bu belgedeki hex'ler sahne paletidir, kanal rengi değil; `gold #b8862b` görüntüde yok (yazı katmanı); `red #b3261e` görüntüde **0 piksel** (Sovyet kırmızısı, yıldız, bayrak, kolluk, afiş yok; kırmızı yalnız yazı katmanında tek vurgu kelime).

---

## 0. Kimlik ve yön

**Karar: Paris dili aynen çevrilir — litografi gravür + kâğıt dokusu + sıcak–soğuk karşıtlık; "kuşatma kışı" soğuk, "yaz/konser" sıcak.** Soğuk planlar da soğuk-gri değildir (Paris tur-4 dersi "çok soğuk, estetik yok"): gölge mavi-mor, her planda görünür tek sıcak ışık (lamba havuzu, kapı çizgisi, ufuk ışıması).
- **Anlatı = ısınma eğrisi [T]:** kış/prova/bodrum = mavi-mor gölge + dar sıcak ışık (sıcak piksel %14–22) → P09c (Aydarov dönüşü) havuz genişler → yaz/konser = gül-altın hacim (sıcak piksel ≥%35). P12'de avizelerin yanması bu eğrinin tepesi; P15'te yüze düşen ışık kapanış. Palet, hikâyenin duygusunu (ölüm → hayat) taşır.
- **Çizgi kalınlığı (bölümde tek, Paris §0.3 / Çiçero §0.1 ile aynı sınıf):** prop 2.5 px (geniş) – 4 px (insert), 6'yı geçmez, renk = dolgunun %55 koyusu kendi tonunda · dekor 3 (uzak) – 6 (yakın) · figür: Kukla konturu kit varsayılanı, kompars siluette kontur yok + kenar ışığı 2 px · tarama ≥2 px, aralık 7 px, açı tek (ışıktan türer) · yarım pikselin altı çizilmez.
- **Doku (en fazla 3, seed sabit):** (1) kâğıt `paper #e9dfc9` multiply α .12–.16 + lif + 6–10 soluk leke; (2) stipple tane (gölge alanlarda α .10, nokta ızgarası değil); (3) mor tonlu tarama `#2f2d46` ailesi, yalnız ışığın mimariyi/biçimi anlattığı yerde: avize/lamba altı, sandalye-tabure-sehpa gölge yüzü, kapı pervazı, merdiven basamağı kenarı, örtü kıvrımı, kol altı. Geniş yüzeyde (sıva, zemin, kar, örtü düzü) tarama/kafes/çapraz yok. Litografi gök: 5 düz basamak + sınırda 2–3 ince çizgi + tane (yumuşak gradyan yok).
- **Tek ışık sözleşmesi** (huzme, havuz, gölge, kenar ışığı aynı tanımdan; elle konmaz):
| Mekân / plan | Tek kaynak | İkincil (kaynak sayılmaz) |
|---|---|---|
| SALON `prova` (P02b, P03b, P04b, P05, P06, P09c) | tepeden asılı **çalışma lambası**; havuz yarıçapı ≥ kadrajın %18'i, 3 basamak | kapıdan gelen sıcak şerit (P04), pencere gök mavisi yalnız camda |
| SALON `prova` P10b | **pencereden yaz güneşi** (lamba sönük); defter kenarında sıcak çizgi | — |
| SALON `konser` (P01, P12, P14, P15) | **avize grubu** (tek tanım; havuz, kasnak kenar ışığı, yüz yan ışığı ondan) | uzak arka sıcak siluetler (flu) |
| BODRUM (P07, P08, P09a) | **kapı aralığı** (10 cm → dar çizgi; basamak→zemin→sedye); P08'in tek kaynağı | — |
| BODRUM P09b | kapı itilince **tepeden gün ışığı** (tek kaynak, ışıkta toz) | — |
| SOKAK-LG kış (P03a, P04a) | alçak soğuk güneş **sağ-arka**; P04a kapı arkasından sıcak (tek) | — |
| SOKAK-LG yaz (P13) | öğleden sonra güneşi **sol-arka**; hoparlörde kenar ışığı | — |
| HARİTA (P02a, P10a, P11) | masa lambası havuzu; P10a pencere yaz ışığı; P11 namlu alevi ikincil, anlık, yalnız çevresine | — |
Görünen her lamba/pencere/avize çevresine ışık düşürür.

### 0.1 Reçete uygulama tablosu (`GORSEL-RECETE.md`; eksik madde gerekçesiz kabul edilmez)
| Madde | Bu bölümde | Not |
|---|---|---|
| A1 tek vektör, `golgeCokgen` | Her mekânın ışık tanımı yukarıda | sabit ofsetli gölge yok |
| A2 litografi gök | kış/yaz sokak gökü §2.4; salon/bodrumda açıklıktan (pencere, kapı) görünen gök aynı dilde | |
| A3 blursuz hale, 2–3 basamak havuz | lamba/avize/kapı çizgisi/pencere | |
| A4 derinlik ≥5 | iç: ön plan nesnesi + sahne/oda + arka duvar/sıra + açıklıktan dış + uzak flu; dış 8–10 | plan kartlarında yazılı |
| A5 buğu | salon uzağı, sokak sırtı, harita kenarı: `bugu(renk, D)` α ≤ .62 | |
| A6 derinlik bulanıklığı | arka sıralar, uzak sandalye, ön plan sandalye arkalığı `Flu` σ 5–7 | |
| A7 kenar ışığı | `#f0c4a8` (yaz/konser) / `#e6b5a0` (alçak güneş, lamba) 2–3 px | |
| A8 sıcak–soğuk + ölçüt | §3 ölçüm tablosu | |
| A9 `Tarama` bileşeni | elle desen yok | |
| A10 `RenkKaydi` (1.5, 1.0) · A11 `KonturTitreme` · A12 `litografi` arşiv (`kagit` modu yok) | `<SahnePlaka arsiv="litografi" titreme renkKaydi>` her şablon | |
| A13 seed'li düzensizlik | tek `rng`: sandalye aralığı/duruşu, kalabalık boyu, pencere ışığı, cephe yüksekliği | ızgara/"yumurta kolisi" yok |
| B1–B10 (bina/mimari) | **yalnız SOKAK-LG'ye tam uygulanır** (sıra, cephe katmanı, pencere ritmi, saçak altı, LOD, kontur, tarama yeri). Çatı profili/baca: sokaktan yalnız alt çatı kenarı + uzak silüet (B4/B6 kısmî). SALON/BODRUM iç mekân: B2/B3/B7/B10 karşılığı = pervaz, kornişe benzer saçak, söve gölgesi (mimari **nötr**, §1). `lint: {izin:["B4","B6"], not:"sokak planları alçak/orta kamera; çatı hattı çoğu planda kadraj dışı"}` SOKAK-LG için | mimari doğrulaması §1 |
| C mekân seçimi | **risk:** P09c→P10a→P10b→P11 (iç MCU / harita / insert / harita) art arda 4 derinliksiz plan. Çözüm (yönetmen/orkestra): P10b pencere açıklığından yaz dışı (gök + uzak çatı hattı); P11 harita bird's-eye eğik + flu ön plan parşömen kenarı; P09c arka planda flu sıra ya da açık kapı (derin). `lint` istenirse yönetmen yazar | |

---

## 1. Mekân kimliği ve kaynaksız ayrıntılar ([G] → nötr)
| Konu | Durum | Çizim kararı |
|---|---|---|
| SALON iç mimarisi (sütun, galeri, tavan süsü, avize biçimi) | [G]; yalnız "tüm avizeler yakıldı" [A orta, özet] | Hacim **nötr**: sahne tahtası, sıralı sandalye, davul, sehpalar, tavandan sarkan **avize grubu** (halka çerçeve + sıralı sıcak noktalar; kristal/damla ayrıntısı yok), arka plan flu sıcak siluet/panel. Sütun/balkon/beyaz sütun **çizilmez**; kamera dışı. Çizilmesi gerekirse nötr sıva `#c9b3a4` düz panel + sade korniş. Araştırmacı doğrularsa mekân sorumlusu iskeleti iner |
| SOKAK cephe rengi/çatı | [G] | Neoklasik **sade** ritim yok; düz sıva cepheler, farklı yükseklik/genişlik/ton (gül-krem `#dcc0b0`, `#cdb3a8`, `#d4c0b0`), pencere ritmi hizalı, sade kat silmesi; **tabela/yazı/afiş yok**. Savaş bantlama, kum torbası, kamuflaj, Admiralty/Aziz Isaac siluet **çizilmez** (çelişkili/kaynaksız) |
| Hoparlör | "siyah tabak" biçimi doğrulanamadı [A §5] | Nötr: direğe monte koyu çelik **konik huni** (ağız ≥ 150 px), tel; harf yok |
| Davul tipi | trampet denmez; Aydarov rolü bağlanmaz [A] | Nötr alçak silindirik orkestra davulu: koyu ahşap gövde, krem deri, 8 kulakçık/vida, çelik kasnak (L\* ≤ 75, parlak krom yok); gövdede harf/sayı yok |
| Sovyet üniforması | [G] | Nötr gri-yeşil `#585d4e`/gölge `#3a3f38`; **rütbe, yıldız, kolluk, arma, bayrak yok**; başlık yok ya da düz kasket `#4a4d44` |
| Eliasberg fraki [A tek kaynak, NPR özeti] | doğrulanmalı | **Frak çizilmez** (rig `frak` 1830 gövdeli → yanlış dönem okunur). `takim40` bol giysi; dönem kanıtı gelirse `takim40` arka etek uzatılır |
| Yaz sebze tarhı (Mars Meydanı vb.) | [A orta, özet] | P13 ön plan/orta plan: kaldırım kenarında küçük toprak tarh + sıra bitki (yer adı yok, nötr). İsteğe bağlı; Ağustos'ta kar yok |
| Uçak modeli, top tipi, Alman işareti | model doğrulanamadı | Nötr silüet (iki kanat + gövde, pervane/kokart yok); top ikonu gravür namlu yukarı; Alman = çelik mavi-gri kare blok (Paris dili) |
| Kış görüntüsü | [A orta] (125 g ekmek, soğuk) | Kızak/ölü taşıma **çizilmez** (yalnız avuç + ekmek + kar) |

---

## 2. Palet (hex)
Kural: kılıf yerine **çubuk dışı her şey C\* ≤ 28, L\* ≤ 88**; sıcak yüzeylerde hue 45–72° (gül-şeftali), 74°'ten sarıya kayan yüzey yok (avize altını bile: gül-altın). Saf siyah/beyaz yok: en koyu `#14120f`/`#262a4e`, en açık sahne dışı `#ecd2b0`; kontur kendi tonunda.

### 2.1 Ortak (tüm mekânlar)
| Ad | Hex | ~L\*/C\* |
|---|---|---|
| gölge mavi-mor / derin gölge | `#3e3b5c` / `#2f2d46` | 27/20 · 20/18 |
| kenar ışığı (lamba, alçak güneş) / (yaz, konser) | `#e6b5a0` / `#f0c4a8` | 77/21 · 80/23 |
| ışık havuzu çekirdek / orta / dış | `#efd0b6` / `#e4bc98` / `#c8a98e` | 85/20 · 79/25 · 71/20 |
| gül-altın (avize, kapı çizgisi) | `#e8c9a4` | 83/25 |
| tarama (mor) | `#2f2d46` | α yok, çizgi %60 koyu |
| kâğıt / ink | `#e9dfc9` / `#1c1915` | kanal |

### 2.2 SALON `prova` (soğuk dönem, tek lamba)
| Ad | Hex | Not |
|---|---|---|
| hacim gölge / orta / uzak flu | `#34385a` / `#4a4d72` / `#6a6488` | arkadan öne koyulaşır |
| sahne tahtası ışık / gölge | `#8a6d62` / `#4a4060` | |
| sandalye (koyu ahşap/metal) ışık kenar / gölge | `#c9a0a6` / `#3a3550` | boş sandalyeler karanlıkta ama kenar ışığı alır |
| davul gövdesi / deri ışık / deri gölge | `#4a3a44` / `#d8c7b0` / `#8f8aa8` | deri C\* ~14 (çubuğa karışmaz) |
| tabure oturak / bacak | `#4a3a44` / `#3a3d42` | |
| sehpa (koyu çelik) | `#3a3d42`, kenar `#c4b5a8` ≤ C\*18 | |
| pencere (P10b yaz) gök / güneş yaması | `#a9b7cc` / `#f2c9b2` | yaz ışığı: sıcak |

### 2.3 BODRUM (morg; saygı)
| Ad | Hex | Not |
|---|---|---|
| duvar sıva gölge / orta | `#2c3050` / `#40466a` | tuğla kırmızısı yok; doku nötr sıva |
| zemin / basamak yüzü | `#3a3a58` / `#4a4668` | basamak üst kenarı ışıkta `#8c6f66` |
| **kapı ışık çizgisi** çekirdek / kenar | `#efd0b6` / `#e4bc98` | 10 cm aralık; tozda 6–8 nokta `#f0d2b8` |
| örtü ışık / orta / gölge | `#cfc3bc` / `#a89ca8` / `#8f8aa8` | **beyaz değil** (L\* ≤ 82), çubuğun altında kalır |
| sedye bezi / sırık | `#4f4a52` / `#4a3a3c` | sırık kalın (≈6 cm) koyu: çubukla karışmaz |
| tırabzan | `#2f2d46`, kenar `#c9a0a6` | |
| P09b gün ışığı (kapı açık) | `#f0d0bc` huzme, gök `#a9b7cc` | |

### 2.4 SOKAK-LG
| Ad | Kış (P03a, P04a) | Yaz (P13) |
|---|---|---|
| gök tepe / üst / orta / alt / ufuk | `#6a82ab` / `#8b9dbd` / `#a8b6cb` / `#d0c8d0` / `#f0cdb8` | `#7a98bf` / `#98acc8` / `#b3c0d2` / `#d6d0d6` / `#f2d4bd` |
| güneş ışıması (disk yok) | sağ ufuk `#f2c9b2` | sol ufuk `#f2c9b2` |
| cephe ışık / gölge / derin | `#dcc0b0` / `#8d85a6` / `#7a7394` | `#e0c4b0` / `#a39cb6` / `#7a7394` |
| zemin (taş/kaldırım) ışık / gölge | kar `#dcd4dc`, gül kenar `#ead6cc` / `#8f93b4`, derin `#6d7098` | `#a89aa4` / `#6d6384` |
| bitki (yaz) ışık / gölge | — | `#a3a67a` / `#5f6a5c` (C\* ≤ 26, yeşil; imza bandına girmez) |
| hoparlör / direk | — | `#4a4a52`, kenar `#f0c4a8` |
| nefes buğusu / su yüzeyi (kova) | `#d8d2dc` α | `#8fa3c0` halkalar |

### 2.5 SALON `konser` (sıcak tepe)
| Ad | Hex | Not |
|---|---|---|
| karanlık (P12 0–0.5 sn) / hacim gölge | `#262a4e` / `#3e3b5c` | soğuk, tek renk gece mavisi değil: avizeler sönükken de pencere/kapı boşluğundan gül kenar |
| hacim orta / uzak sıcak flu (arka sıra, balkon yerine nötr) | `#6d6384` / `#b98a9e` | atmosfer: uzak açık, düşük kontrast |
| **avize** çekirdek / altın ışık / metal (koyu bronz-kahve) | `#efd0b6` / `#e8c9a4` / `#5a4638`, kenar `#e6b5a0` | L\* ≤ 88; sarı metal parlaması yok |
| sahne tahtası ışık / gölge | `#c8a98e` / `#5b5575` | P12'de dalga sonrası havuz |
| Eliasberg/müzisyen ışıkta ten | `#d6b49c` | gölge `#8f7360` |
| seyirci omuz/palto (flu, arkadan) | `#4f4668`, `#5a5068`, `#4f5a62` | seed'li ±3 L\* |

### 2.6 HARİTA `leningrad` (kit parşömeni üstüne)
Parşömen kit (kâğıt). Alman halkası çelik mavi-gri `#3e4c63` 12 px, işaret kare blok 24 px `#52627a` (Paris H1 dili, dolu, bayrak/arma yok) · su (Ladoga, Neva, körfez) `#9fb0b8` [A güvenli coğrafya; yer adı yazı katmanı] · Filarmoni ikonu sıcak halka `#e4bc98` + kontur `#1c1915` 3 px · Sovyet top ikonu koyu çelik `#3a3d42`, namlu yukarı, ≥ 150 px · uçak silüeti `#1c1915` (nötr) · rota 6 px · `darbe` krem parlama `#f4eddc` + gri-kül duman `#8f8aa8`/`#cfcac2` (turuncu/sarı yok, sarsıntı 0) · parşömen doygunluğu .62, tarama 2.5 px α .22 (kit `fransa` ile aynı).

### 2.7 Ölçüm hedefleri (arşiv derecelendirmesi sonrası, ±8 L\*)
| Plan türü | Sıcak piksel (hue 20–80°, C\*≥10) | p95 L\* | Çubuk (imza) |
|---|---|---|---|
| kış sokak (P03a) | ≥ %14 | ≥ 75 (ufuk ışıması + kar kenar) | — (ekmek koyu, imza değil) |
| prova (P02b–P06, P09c) | ≥ %14 (havuz ≥ %18) | ≥ 75 (havuz çekirdeği) | P06, P09c ≥ 2.1 × sahne maks. C\* |
| **bodrum (P07–P09a)** | ≥ %14 | ≥ 75 | P08: çubuk C\* ≥ 55, çizgide en parlak |
| yaz (P10, P11, P13) | ≥ %25 | ≥ 80 | — |
| konser (P01, P12, P14, P15) | ≥ %35 | ≥ 85 | P01, P15: çubuk en doygun/parlak nokta |
**Risk:** bodrum karanlık planında (P07/P08) p95 L\* ≥ 75 dar çizgiyle zor. Önlem: örtü ışık yüzü geniş (`#cfc3bc` L\* ~80) ve kapı yarığından gök şeridi. Sağlanmazsa yönetmen `lint: {izin:["p95_bodrum"], not:"saygı planı, tek ışık çizgisi"}` yazar (en düşük 70); sessizce gevşetilmez.

---

## 3. İMZA NESNESİ: DAVUL ÇUBUKLARI (bal-ten çift) [T seçim; A: davulcu Aydarov]
**Seçim (sahne planı sorusuna cevap): çubuklar** — alternatifler (boş tabure, defter, ışık) reddedildi.
**Gerekçe:** (1) kanca P01 (çubuk iner) → P06 elden düşer → P07 Eliasberg'in elinde bodruma iner → P08 sedye ayağı → P09 elde/tabureye → P15 vuruş = 7 plan, döngü bunları taşır; (2) "ölü sanılan adamın aleti" = diriliş: yaşayan = çubuk çalar; (3) boş tabure/defter bir yük, çubuk **hareket eden** nesne (düşer, yuvarlanır, tık, kavranır); (4) telefonda en küçük halinde sahnenin en doygun/açık noktası.
**Tanım:** iki kısa, ince, bal-ten ahşap çubuk, bir uçta damla baş; **iki çubuk birebir aynı** (asimetri/ayrı çizim yok). Ölçü: gerçek ≈ 40 × 1.3 cm [G genel, doğrulanmalı] — **uzunluk gerçek**, kalınlık ×1.6 (ø 2.1 cm, oran ≈19:1; telefonda kalınlık ≥ 7 px/360), baş damla ø = kalınlık × 1.4. El boyu E = 0.19 m ⇒ çubuk ≈ 2.1 E (el ≥ %15 olan P08'de çubuk ≈ 610 px). P01/P15'te uzunluk ≥ %40 ekran genişliği.
| Katman | Hex | ~L\*/C\* |
|---|---|---|
| gövde ışık yüzü | **`#F0B14E`** | 76 / 59, h 77° |
| gövde gölge yüzü | `#B97F34` | 58 / 52 |
| parlak kenar (2 px, ışık yönünde) | `#FBDFA0` | |
| sert ışık dilimi (spekülar, tek hilal) | `#FFF1CC` | L\* ~96; yıldız/kıvılcım değil |
| kontur | `#7a4f2a` (dolgunun %55 koyusu) | 2.5–4 px |
**Tekillik (Paris §13.3 dersi: ton yasağı değil, doygunluk + parlaklık):** çubuk dışı sahne C\* ≤ 28 (kenar ışığı ≈ 23, pencere ≈ 20, deri ≈ 14); çubuk C\* ≥ 2.1 × sahne maksimumu; L\* tavanı sahnede ≤ 88, çubuk speküları ~96. İmza bandı (hue 68–92°, C\* > 40, L\* 60–90) **yalnız çubuk kutusunda**; çubuk dışı bandda piksel ≤ çubuğun %25'i. Çevresine hale/ışık havuzu/kıvılcım yok; çubuk ışık yaymaz, yalnız kenar ışığı alır (P12 ilk parıltı = kenar `#FBDFA0` + spekülar).
| Çakışma (hiçbiri bal-ten/sarı değil) | Karar |
|---|---|
| yay (P05 düşer) | **koyu mor-kahve** çubuk `#5a3f4a`, kıl şeridi krem `#cdbfa8`, kurbağa ucu; çubuktan kalın-uzun-bükülü okunur, kısa damla başlı değil |
| koltuk değneği (P14) | koyu ahşap `#4a3a3c`, ≈1.3 m, koltuk altı çatalı; ışık kenarı ≤ C\*23 |
| sedye sırığı, tabure, sehpa, davul gövdesi | koyu mor-kahve / çelik (§2) |
| keman/yaylı gövde | vernik koyu kızıl-kahve `#7a4f45` (L\* ~38, C\* ~22), **hue 35°** |
| ekmek (P03a) | koyu mat `#5a4638`, ışık kenarı `#8a6c58` |
| nota defteri sayfa kenarı | `#cdbfa8` (C\* ~14) |
| avize/lamba ışığı | gül-altın `#e8c9a4`, C\* ≤ 25, hue 60–70° |
| kova | galvaniz mavi-gri `#7e8796` |
| Eliasberg gömlek yakası/manşeti | ecru `#b8b09c` |
**Kullanma yasakları:** Paris `SiluetFigur` kodu `omuzda-cubuk` (çubuk biçimi karışır) kullanılmaz; dirijör **batonu çizilmez** (kaynaksız, çubukla karışır; Eliasberg kollarıyla yönetir).
**Aynı aileden Paris kılıfı** (`#F0B43C`): ayrı bölüm, ayrı nesne; kanalda ardışık yayında "bal-ten imza" tekrarı olur → yayın sırasında Paris'ten ayrı slot (açık not).

---

## 4. Karakterler (tek rig `Kukla`, `takim40` Çiçero'dan; oranlar sabit)
**Dönem/saygı kuralları:** yüz kimlik iddiası değil (fotoğraf referansı doğrulanamadı [A §5]); gerçek kişiler tanınabilir portre değil, **ağırbaşlı, emek gösteren** figürlerdir. Yüzsüz yalnız: morgdaki örtülü biçimler (örtü) ve arkadan görülen/çok uzak (<60 px yüz) figürler; bunlar da baş eğimi, saç/boyun/omuz farkıyla bireyselleşir, dolgu kütlesi olmaz. Alay, karikatür, kalabalık dolgusu yok.
**Açlık (saygıyla):** yüz çökük (yanak çukuru, elmacık), bol giysi, omuz düşük, ince bilek. **Gövde oranı rig'de değişmez**; zayıflık `yuz.zayif` + giysi bolluğu + manşet kayması ile (gövde ölçeği ≤ 0.94 yalnız yoksa; motion kontrol eder, yoksa `kit_eksik`).
| Kim | Uygulama | Yüz / ayrışma | Bireysel ayrıntı |
|---|---|---|---|
| **Karl Eliasberg** (kahraman) | `Kukla` + `takim40` bol (`palet.bol` ≈1.12), palet `ELIASBERG`: ceket `#4a4668`/gölge `#2f2d46`/ışık `#6a6488`, pantolon `#34334a`, gömlek ecru `#b8b09c`, saç `#2a2226` | `yuzVaryant: eliasberg`: dar-uzun yüz (genislik .92, uzunluk 1.08), duz burun, çökük yanak (zayif), göz altı koyu, endişeli-sakin kaş, kısa koyu saç, bıyık/gözlük yok; boy 1.75 m [G] | yaş 30'larda [G doğrulanmalı]; bol manşet kayar (ince bilek), omuz öne; P12'de ceket yeni fırçalanmış (aynı ceket, ışıkta) |
| **Zhavdet Aydarov** | `Kukla` + `takim40` bol, üstüne dış giysi; palet `AYDAROV`: üniforma `#585d4e`/`#3a3f38`, ten `#cdb09e`/`#8f7360` | `yuzVaryant: aydarov`: geniş elmacık, kısa kesik saç, genç yüz (24, 1918 [A tek kaynak]), zayıf, gözü aşağıda notada; kimlik/etnisite iddiası yok; boy 1.72 m [G] | yüz yalnız **P15** (P01, P06, P08, P09: sırt/kol/el); P09c **sargılı zayıf el** (sargı `#bfae98`, beyaz değil); P06'da kol zeminde |
| Eliasberg'den ayrışma | yüz tipi (dar-uzun/koyu saç ↔ geniş-elmacık/kısa kesik), giysi tonu (gri-mor ↔ haki), duruş (omuz düşük ↔ dik gövde, bitkin) | | ana karakterin yüzü kopyalanmaz |
**Yakın plan yüz ifadesi (rig yüzü detaylı; kitte olmayan ifade `kit_eksik`):** Eliasberg: `yorgun-sakin` (taban), `eğilme-vedalaşma` (baş eğik, göz kapak yarı), `fark-ediş` (gözler kalkar, kaş yukarı-içe, ağız hafif aralık, nefes durur — P08-3 dolly zoom, ≥ %15 yüz), `kararlı` (P12 kollar). Aydarov: `notada` (bakış aşağı-sol, kaş sakin, ağız kapalı), P15 tutma.
**Eller:** `GravurEl` tek parça (iç dikiş/tırnak/boğum çizgisi yok), ten `#cdb09e`/gölge `#8f7360`, kenar `#f0c4a8` 2 px. P03a avuç soğuk `#c4a8a0`. P08 el: örtü kenarında, ışık çizgisinin üstünde; **işaret parmağı seğirir, havada tek kalkık parmak değil** (örtü üstünde kıvrık el, parmak ucu hareket).

### 4.1 Kompars seti (hepsi yüzlü; kalabalık dolgusu yok)
`yuzVaryant` yeni kayıtlar (kurulum ekibi; Eliasberg/Aydarov hariç 14: seyirci-3…5 ve tasiyici-1/2 ayrı sayılır). Yakın planda ≥ 60 px yüz isteyenler (asker-degnek, kadin-kova, sivil, ön sıra) öncelikli; arka sıradakiler aynı varyantı farklı palet/saçla paylaşabilir, ana yüz kopyalanmaz. Kıyafet çeşidi: her müzisyen farklı kat/ton (`#5a5068`, `#4f5a62`, `#625a52`, `#4a4d44`; "lahana gibi" katman [A orta]).
| Kod | Planlar | Yüz / yaş | Bireysel ayrıntı |
|---|---|---|---|
| `yayli-yasli` | P03b, P05, P14 | uzun yüz, 60'lar, seyrek gri saç, çökük yanak | gri bıyık, titreyen el, yay |
| `nefesli-genc` | P05 (yay/çalgı iner), P14 (OTS çalgıcı) | yuvarlak yüz, 20'ler, solgun, çatlak dudak | gözü yarı kapanır, omuz düşer; çalgı koyu boru, anahtar gri `#8e8e96` |
| `muzisyen-kadin` | P03b, P05 | orta yaş, ince çene, saç arkada toplu | konser giysisi üstüne yün hırka [A: kadınlar savaş öncesi konser elbisesi] |
| `asker-a` | P04b | 30'lar, kare çene, kısa kesik | bıyık, omuzda koyu deri çalgı kutusu, toz |
| `asker-b` | P04b | genç, çil, ince | sargılı el/alın, kutu |
| `asker-c` | P04b, P05 | 40'lar, uzun burun | yorgun göz altı, davula bakar |
| `asker-degnek` | **P14 (LS-D8)** | 30'lar, geniş kemikli yüz, sakin ağır bakış, gözler dik | koltuk değneği, sol bacak sargı; **ağırbaşlı, alaysız**, ayağa kalkış yavaş |
| `sivil-yanindaki` | P14 | 50'ler, kel, paltolu | asker kalkınca yanında kalkar |
| `seyirci-3…5` | P12 (arkadan flu omuz), P14 ön sıra | kadın/yaşlı/genç üniformalı | arkadan: saç, boyun, kulak, palto yakası farklı; ön sıra yüzlü |
| `tasiyici-1/2` | P09 sedye | biri yaşlı çökük yüzlü, biri genç solgun | yorgun ama düzgün adım; sırığı iki ellerle |
| `kadin-kova` | **P13 (LS-D7)** | yaşlıca, onurlu, ince çene, gri saç arkada | koyu yün hırka, kova galvaniz `#7e8796`, başını hoparlöre kaldırır |
Uzak kalabalık (P03b arka sıralar, P13 arka insanlar): ≥ 60 px yüz yüksekliğinde Kukla yüz; altında `SiluetFigur40` (burun–çene profili + **baş eğimi çeşitli**, her figür farklı poz/boy; fötr/şapka yok), dolgu kütlesi değil. `kit_eksik`: `SiluetFigur40` kodları `muzisyen-oturan`, `seyirci-oturan` (oturan poz; `oturan` parametresi var).
**Morgdaki biçimler:** örtülü, sıralı, uzak, yüzsüz (örtü); kadavra gösterisi yok; saygılı mesafe; Eliasberg başı eğik.
**Düşman:** Alman askeri çizilmez; çizilirse yüzlü, insan.

---

## 5. Proplar (360 px'te ≥ ~20 px = 1080'de ≥ 60 px; biçim yanlış okunmaz)
| Prop | Biçim | Ölçü | Ekran (plan) | 360 px |
|---|---|---|---|---|
| **çubuk çifti** | §3 | 40 cm, ×1.6 kalınlık | P01/P15 ≥ %40 genişlik; P06 %40; P08 ≈ 610 px | uzunluk ≥ 144 px, kalınlık ≥ 7 |
| **davul** | alçak silindir, koyu gövde, krem deri, 8 kulakçık, çelik kasnak; harf yok | ø 35 cm [G] | P01 deri merkez (540, 980), kasnak vidası flu ön plan | ≥ 150 px |
| **tabure** | yuvarlak oturak, dört bacak, koyu; çubuğa dayanma yüzü düz | oturak ø 30 cm | P03b kurulum, P06 tık, P09c | ≥ 70 px |
| **nota sehpası** | koyu çelik, eğilir tabla (`yayKare`), üç ayak | tabla 55×40 cm | P02b boş (tabla açık yüzey y≈900), P10b ≥ %35 | ≥ 120 px |
| **defter** | kalın ciltli, koyu mor-gri `#4a4560`, sayfa kenarı krem `#cdbfa8` kalın taramalı (252 sayfa [A]); iç satırlar **5 çizgi + nota başı**, harf yok | 30×40 cm, kalınlık 6 cm | P10b iki elle; ağırlık sehpa yayında | ≥ 100 px |
| **ekmek dilimi** | koyu mat dilim `#5a4638`, kenar `#8a6c58` (125 g [A]); tek dilim, koyu kütle okutmaz: ışık kenarı + kırıntı | 12×8 cm | P03a ≥ %30 ekran | ≥ 90 px |
| **kırıntı** | küçük koyu parça; stilize ×3 (gerçeği 360 px'te görünmez) | ≈ 1 cm ×3 | P03a el kenarı toplar | ≥ 20 px |
| **yay** | koyu mor-kahve çubuk + krem kıl, kurbağa | 70 cm | P05 düşer `yay-tahta-tok` | uzunluk ≥ 90 px |
| **çalgı kutusu** | dikdörtgen koyu deri `#4a3a3c`, köşe takviyesi, yazı yok | 80×30 cm | P04 elde/omuzda | ≥ 80 px |
| **sedye + örtü** | iki kalın koyu sırık + gerilmiş bez `#4f4a52`; üstü örtü `#cfc3bc` (beyaz değil) | 2 m | P07 uzak, P09 ≥ %40 | ≥ 120 px |
| **koltuk değneği** | §3 | 1.3 m | P14 ≥ %30–40 (asker), uç net | ≥ 100 px |
| **kova + su** | galvaniz silindir, kulp, su yüzeyi gök yansıması, durulma halkaları (`yayKare`) | ø 28 cm | P13 ≥ %10 | ≥ 60 px |
| **hoparlör** | §1 | huni ø 40 cm | P13 ağız ≥ 150 px | ≥ 50 px |
| **harita ikonları** | §2.6 (Filarmoni, top, uçak, Alman blok) | — | halka ≥ %45 genişlik | ≥ 50 px |
| **kapı** (P04, P07) | ahşap, sade; çizgi/aralık 10 cm | kapı 2.1 m | P07 çizgi net ≥ 1.2 sn | çizgi ≥ 8 px |
Foley'i olan her propun temas karesi `kontrol_kare`'dedir (sahne planı); çubuk temas gölgesi her karede.

---

## 6. Tipografi
`src/kit/yazi.tsx` standardı aynen (kâğıt şerit + Playfair 900, tek kırmızı vurgu; veri/tarih/yer Plex Mono; replik Inter 800). Altyazı kelime kelime, alt bant (y 1290–1490), ayak/temas varsa üst banda. Ekran yazıları, harita etiketleri (şehir/su adları), sayaç `3 SAAT → 15 DAKİKA`, kart: **yazı katmanı, dil başına**; görüntüde (davul, hoparlör, defter, harita, tabela, sedye) harf yok. Kiril/Latin metin çizilmez. Yazı hiçbir zaman dokunuşun üstüne binmez (üst bant 240–400).

---

## 7. Yeniden kullanılan kit parçaları (yeniden yazma)
| Parça | Nerede | Not |
|---|---|---|
| `Kukla` + `kostum: "takim40"` + `BAZNA` palet şeması (`paletler/cicero.ts`) | Eliasberg, Aydarov, kompars Kukla yüzleri | yeni `paletler/leningrad.ts` (ELIASBERG/AYDAROV/kompars); `palet.bol` yoksa giysi bolluğu için küçük ek |
| `GravurEl` / `El40` / `ElKol40` (tek parça el, dirsek IK, kol kuralları) | P01/P06/P08/P09c/P10b elleri | `elPalet`: ten `#cdb09e`; ecru manşet; Aydarov sargı varyantı yeni tip |
| `SiluetFigur40` (burun–çene profili, `oturan`, `adim`) | uzak kompars LOD | fötr/şapka kullanılmaz |
| MASA-INSERT `el40` + masa ışık mantığı | P03a avuç, P08 insert | `tut {prop}` çubuk için |
| ELÇİ-ODASI `lamba` tek kaynak (V/koni, havuz 3 basamak), `kapi.ayak` şerit mantığı | prova çalışma lambası; BODRUM kapı çizgisi | ışık tanımı yeniden yazılmaz, `CIC` hex'leri `LEN` ile eşlenir |
| Paris ortak: `isik.ts` (`isikta`, `golgeCokgen`), `GokLitografi`, `Hale`/`PencereHavuz`, `bugu`/`UfukBuguBandi`, `Flu`, `KenarIsik`, `paletKur`, `siraUret`/`Cephe` (SOKAK-LG), `lodSec`, `SahnePlaka` | tüm mekânlar | konumları motion doğrular (reçete "hedef `src/kit/gorsel/`") |
| `doku/Tarama`, `RenkKaydi`, `KonturTitreme`, `ArsivKatmani` (`litografi`) | tüm mekânlar | atlanamaz |
| HARITA motoru + `paris-cevre` `halka {merkez, yaricap, isaret_sayisi, bas, kalici}` + `rota_ciz`/`kamera_takip` + `darbe` | P02a, P10a, P11 | yeni `harita_gorunum: "leningrad"`; `telgraf_teli`, `kalabalik` (kâğıt siluet) **kullanılmaz** |
| `hareket/`: `yayKare` (sehpa yaylanması, kova su), `asiliNesne` (kova kulpu), `gait` `shuffle` (bitkin yürüyüş) + `merdivenZemin` (P07 dört adım) | P07, P10b, P13, P04b | |
| `Sayfa.tsx` (dil-nötr satır) | defter iç sayfa | nota çizgisi varyantı küçük ek |
| `yazi.tsx`, `altyazi.tsx` | yazı katmanı | |
**Kullanılmaz (dönem/biçim taraması):** Paris `SiluetFigur` `omuzda-cubuk`; Kukla `frak` + yelek (1830); Çiçero `banknot` prop (kâğıt para/imza çakışması), `SiluetFigur40` fötr şapkası; Paris `kalabalik` yüzsüz kâğıt siluet; Blanc SOKAK kiti (Bordeaux/Haussmann öncesi Fransız: **yanlış şehir**, yalnız perspektif cephe sistemi `cephe/zemin/sokakGenislik` kullanılır); Chappe/telgraf motifleri; kırmızı mühür.
Kurulum ekibine kalan kit_eksik'ler `sahne-plani.md` §7'dedir; tasarım ekleri: `paletler/leningrad.ts`, 16 yüz varyantı (Eliasberg, Aydarov, §4.1 kompars 14), `palet.bol`, çubuk/davul/tabure/sehpa/defter/yay/ekmek/kova/hoparlör/sedye/koltuk değneği prop şemaları, SALON/BODRUM/SOKAK-LG dekor paletleri.

---

## 8. Yön karesi (kod öncesi, **kullanıcıya tek kare**) — Gemini yok
Paris çıtası: yeni mekân/karakter için motion kod yazmadan önce tek yön karesi kullanıcıya gider (evet/hayır); yetki devredilmiş olsa da. **Öneri (sahne planı §8 ile aynı): P12 `kontrol` karesi (p96, "dalga kasnakta bitti")**, çünkü SALON `konser`'ı, Eliasberg rig'ini, yüzlü seyirciyi, çubuk imzasını ve ısınma eğrisinin tepesini tek karede gösterir. Tarif (kamu malı dönem gravürü dili + Paris onaylı hedeflerin dili; üretim ancak kullanıcı onayıyla):
- 9:16, WS arka sıradan (24 mm eşdeğeri, deep), kamera yukarı bakar. Alt üçte biri: seyirci omuzları/saç-boyun-kulak farkıyla (flu, gül-mor), sıra korkulukları, gölge. Orta: sahne tahtası `#c8a98e`, sıralı sandalyeler, orkestra siluetleri **yüzlü profiller** (yakın olanlar), Eliasberg ortada, bol manşetli kollar yukarı, ışığı yüzünde; davul kasnağında iki bal-ten çubuk ilk parıltı (`#FBDFA0` kenar + spekülar). Üst: avize grubu (halka çerçeve + sıralı gül-altın noktalar, havuz 3 basamak), arka tavan/hacim gül-mor flu (`#6d6384`/`#b98a9e`), litografi basamaklı üst bant, kâğıt lifi.
- Işık: tek kaynak avize; kenar ışığı `#f0c4a8` 2–3 px, gölge mavi-mor `#3e3b5c` + 3–5 çizgilik mor tarama (sandalye altı, kol altı); ışıkta tane/toz demeti.
- **Paris'in yanına konsa:** sıcak/soğuk, litografi gök-yerine-tavan basamakları, kâğıt grenı, tarama ve düz katmanlar Paris alacakaranlık karesiyle aynı dilde; figür Paris'ten yüzlü olduğu için daha insani, risk: iç mekân + figür ilk kez birlikte (Paris'te hedefsiz P05 el/P10 "çok kötü" bulundu) — bu yüzden hedef kare şart. İkincil kareler (kullanıcı isterse): P08-3 yüz dolly zoom (bodrum, çizgi parmak/yüz), P03a avuç.

## 9. Açık riskler / araştırmacıya ve orkestraya notlar
1. **SALON iç mimarisi, avize biçimi, hoparlör, davul tipi, üniforma, Eliasberg'in frakı, Sovyet cephe/çatı rengi [G]**: tümü nötr çizildi; doğrulanırsa tasarım ve `mekanlar.md` güncellenir. Araştırmacıya: Filarmoni Büyük Salon mimarisi, 1942 sokak hoparlörü biçimi.
2. **Yüz/kimlik:** Eliasberg/Aydarov fotoğrafı doğrulanmadı; yüzler kimlik iddiası değil, tanınabilir portre yapılmaz. Gerçek ölenler (morg) örtülü.
3. **P12 yön karesi ve yeni şablonlar en az 2 kalibrasyon turu**, eleştirmen ≥ 7 (CLAUDE.md Paris çıtası); SALON `konser`, `prova`, BODRUM, SOKAK-LG, HARİTA.
4. **Bodrum p95 L\* ≥ 75** zor (§2.7); lint açıkça yazılır.
5. **C maddesi:** P09c→P11 dört derinliksiz plan; yönetmen çözümü §0.1.
6. P11'de yüzlü topçu karşılanmadı (sahne planı §1 sapması); kullanıcı gerçek top isterse CEPHE 4. mekân + yüzlü topçu varyantı ayrı karar.
7. Paris kılıfı ile aynı bal-ten aile: yayın sırasında ayrı slot.
8. Kukla ifade/poz eksikleri (`fark-ediş`, `eğilme-vedalaşma`, oturan çalgıcı pozları), `palet.bol`, 16 yüz varyantı: kurulum ekibi (opus) kod öncesi yön karesi onayı bekler.
