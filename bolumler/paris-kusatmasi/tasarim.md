# Paris Kuşatması 1870 — Görsel Tasarım (kurulum ekibi, adım 1)

Hazırlayan: tasarimci · 2026-11-11 · Girdi: `arastirma.md` (§5 dönem/görsel, §9 doğrulanamayanlar), `senaryo.md` v5, `dokunuslar.md` (PK-D1…D8, imza kuralı), `sahne-plani.md` (§7 kit_eksik, 22 kimlik), `bolum.json`, `notlar/tur-1.md`, `src/theme.ts`, `src/kit/KATALOG.md`, `src/kit/paletler/evliya.ts`, biçim örneği `bolumler/evliya-ucuslari/tasarim.md`.
Bu belge **spesifikasyondur, kod değildir.** Hex/oran/px değerleri motion'a doğrudan uygulanacak önerilerdir. Mimari, cephe dokusu ve mekân dili `mekanlar.md`'nin (mekân sorumlusu) işidir; ben yalnız bölüm paletini ve mekânlarda geçen propları veriyorum.

Etiketler: **[A]** arastirma.md'de kaynaklı · **[S]** senaryo/sahne planı (dramatizasyon) · **[G]** genel bilgi, kaynak açılmadı, **doğrulanmalı** · **[T]** tasarım kararı (tarihî iddia değil).
Kural: [G] olan hiçbir ayrıntı tek başına dokunuş taşımaz, okunur metin içermez; doğrulanmazsa nötr kalır. Nötr bırakılanların tam listesi §8, kullanıcıya gidenler §12.

---

## 0. Kimlik ve yön

### 0.1 Kanal kimliği (değişmez, `theme.ts`)
`paper #e9dfc9` · `paperDark #d6c7a6` · `ink #1c1915` · `inkSoft #4a4237` · `red #b3261e` · `gold #b8862b` · `night #14120f`. Fontlar Playfair Display 900 / Inter 500-800 / IBM Plex Mono 500. **Yeni renk ve yeni font yok.** Kanalın `gold`'u yalnız yazı katmanında/çerçevede kalır, **görüntüde yok** (imza kehribarına ΔE76 ≈ 22, aynı aile; §2.4).

### 0.2 Yön: "kuşatma kışı gravürü" [T]
- Bölüm, kanalın gravür/kukla tiyatrosu dilinde kalır: düz katmanlı paneller, ortak mürekkep konturu, gölgede tek yönlü tarama, kâğıt tanesi. Bölüme özel yeni bir stil yok.
- **Soğuk, düşük doygunluk:** gök, taş ve çatı soğuk gri/lacivert/krem. Doygunluk yalnız iki yerde yükselir: (1) **bal kehribarı kılıf** (tek sıcak, doygun nokta), (2) yazı katmanındaki kırmızı vurgu. Bu bilinçli bir kural: kılıf her karede, geniş planda bile, görüntünün en sıcak ve en doygun pikselidir.
- **Sarı metal yok:** bu bölümde pirinç/altın/bakır görünmez (terazi, lantern, mercek, iğne, kilit, halka dahil). Metal koyu çelik/çinko gri `#3a3d42` – `#6d6a63`. Gerekçe: imza kehribarı "tekil" olmak zorunda; sarı metal onu ikinci bir sarı nesneye çevirirdi.
- **Kırmızı yok (görüntüde):** mühür, zarf pulu/mührü, bayrak, tuğla baca, güvercin ayağı dahil. Kırmızı yalnız yazı katmanındaki tek vurgu kelime ve sayaç sayısı.
- **Saf siyah/beyaz yok:** en koyu `#14120f` (night), en açık `#f6f2e2`. Yeni kodda `#000`/`#fff` yerine bunlar.
- **Bayrak, arma, tricolore, kâğıt para, Chappe T-kolu yok.** (Blanc dersi.) Optik telgraf (T kol) bu bölümde hiçbir yerde çizilmez; P02'deki "telgraf" **elektrik teli** olarak çizilir ve direk işaretinde çapraz kol yoktur (yatay çıta "T" okutur) [G: 1870'te optik telgraf kullanım dışı — doğrulanmalı].
- Bölümde yeni karakter rig'i yok: tüm insanlar yüzsüz siluet, Dagron sırt + manşetli el (§3).

### 0.3 Kontur ve çizgi kalınlığı (Evliya ile aynı sınıf, bölümde tek)
| Öğe | Kalınlık | Renk |
|---|---|---|
| Siluet figür | kontur yok, düz dolgu; kenar ışığı 2 px | §3 |
| Prop (balon, kafes, kutu, sandık, kılıf, torba…) | ekranda **2.5 px** (geniş) – **4 px** (insert), ölçekle büyür ama 6 px'i geçmez | `ink(fill)` = dolgunun %55 koyusu |
| Dekor | 3 px (uzak) – 6 px (yakın) | mekanlar.md |
| Harita halka / tel | 12 px / 10–12 px (D1 kuralı: tel ≥ 10 px) | §6 |
| Harita rota / kuş çizgisi | 6 px (kit) / 4 px | §6 |
| Tarama | çizgi ≥ 2 px, aralık ≥ 6 px (360 px'te 0.67 / 2 px) | gölge tonunun %60 koyusu |
`strokeLinejoin="round"`. 360 px'te yarım pikselin altına inen çizgi çizilmez.

### 0.4 Tarama (hatching) kuralı [CLAUDE.md "Gravür telefonda okunur"]
Tarama yalnız (a) balon küresinin gölge yarısında terminatör bandında, (b) duman bulutu altında, (c) kutu/sandık/kafes gölge yüzünde, (d) P07 isabet çevresinde. Açı sahnenin tek ışığından türer (aşağıda), büyük düz yüzeyde (gök, cephe, perde) tarama yok. **Ağ ve kafes geniş alanda tel-örgü okutmaz** (§4.1, §4.3).

---

## 1. Bölüm paleti

### 1.1 Tek ışık kaynağı (sözleşme)
| Durum | Kaynak | Not |
|---|---|---|
| **Kış günü** (P03 meydan, P06b, P07, P10 kümes, DAGRON-INSERT penceresi) | Alçak sabah güneşi, **güneydoğu, yükseklik ≈ 12°** [T, fiziksel türetme: Niépce'nin kalkışı "09:00" [A: GUT/MICRO özeti], 12 Kasım, enlem 49° ⇒ yükseklik ≈ 12°, azimut ≈ 135° GD; yerel saat standardı belirsiz, ±1 saat ⇒ ±4°]. Gölge uzunluğu ≈ 4.7 × boy, **ışığın tersine** (kuzeybatı). Ekran yönü: kamera kuzeybatıya bakmıyorsa, mekân sorumlusu ışığı **soldan-arkadan** (gölge sağa-öne) kurar; bu, bölümün tüm gündüz planlarında aynıdır | P01/P11 alacakaranlık değil; P07 gölgesi balonun kendi terminatörünü de belirler |
| **Alacakaranlık** (P01, P11b) | **Ufuk ışığı, arkadan** (soluk gül-mor); çatı ve kuşun kenarına 2 px kenar ışığı `#c9b3b8`. Pencere ışıkları küçük **ikincil** kaynaklar: yalnız kendi çevrelerine soluk krem havuz | Kılıfın pırıltısı ışık yaymaz, yalnız ufuk ışığını yansıtır (§2.3) |
| **Lantern odası** (P10b) | Tek kaynak: **lantern huzmesi** (kireç beyazı-yeşilimsi). Odadaki ışık, perdeden yansıyan yumuşak ikincil | Kapıdan gelen gün ışığı soğuk, yalnız kapı çevresi |
| **DAGRON-INSERT** (P04b kafes dahil) | Üst-soldaki pencereden soğuk gün ışığı; gölge sağ-aşağı | Mum/fener yok |

**Hava durumu iddiası yok:** kar, yağmur, bulut, sis çizilmez (kaynakta yok [A]; kar yalnız Norveç'teydi ve o hikâye çıktı). "Kış" yalnız palet soğukluğuyla anılır. Sokak lambası ve gaz lambası çizilmez [G: 1870 Paris aydınlatması/kuşatma karartması doğrulanamadı, arastirma §5.1].

### 1.2 ALACAKARANLIK (P01, P11 kümes)
> **Tur-4 notu (2026-11-12):** bu tablodaki hex'ler ve §0.2 "soğuk, düşük doygunluk" cümlesi **§13 ile değişti**; çelişkide §13 geçerlidir. Aşağıdaki tablo tarihçe olarak kalır.
| Ad | Hex | Not |
|---|---|---|
| gök tepe / orta / ufuk | `#232840` / `#4a4663` / `#a58e98` | 3 düz basamak, gradyan yok; ufuk **soluk gül**, turuncu/şeftali yok |
| uzak şehir siluet | `#5a5670` | hava perspektifi, tek ton |
| mansard çatı (arduvaz-çinko nötr gri-mavi) ışık / gölge | `#5f6578` / `#454a5c` | [G] malzeme adı konmaz, yalnız ton |
| krem taş cephe (alacakaranlıkta) ışık / gölge | `#a49fa8` / `#6d697d` | gündüz değerinin soğuk karşılığı |
| baca kümesi | cephe tonu; başlık `#3f4254` | tuğla kırmızısı **yok** |
| pencere ışığı (içten) | `#e6d8bd` | soluk krem; **turuncu/kehribar değil**; çevresine `#e6d8bd` α .18 havuz |
| pencere kasası / demir korkuluk | `#3a3a4c` / `#2f2f35` | |
| kenar ışığı (ufuk yönü, çatı ve kuş) | `#c9b3b8` | 2 px |
| siluet (pencere/balkon) | `#262434` | pencere ışığının önünde okunur |
| kümes ahşap ışık / gölge | `#6b6570` / `#4b4754` | soğuk gri-kahve |
| güvercin (alacakaranlık) | §4.2 + kenar ışığı `#c9b3b8` | |

### 1.3 KIŞ GÜNÜ (P03, P06b, P07, P10a)
> **Tur-7 notu (2026-11-12):** bu tablo, §0.2 "soğuk, düşük doygunluk" ve §1.1 "hava durumu iddiası yok" satırı **§14 "Sabah dili" ile değişti**; çelişkide §14 geçerlidir. Aşağıdaki tablo tarihçe olarak kalır.
| Ad | Hex | Not |
|---|---|---|
| gök tepe / orta / ufuk | `#8d9aa6` / `#aab4bc` / `#d4d2c8` | 3 düz basamak. **Balon ayrışması:** balon ışık yüzü L\* ≈ 84, gök orta L\* ≈ 72, tepe ≈ 62 ⇒ kontur + terminatör şart (§4.1) |
| güneş kenar ışığı | `#efe6cc` α .6 | disk çizilmez; amber değil (b\* ≤ 15) |
| krem taş cephe ışık / gölge / tarama | `#d8cdb4` / `#a89d86` / `#7c7260` | [G] Haussmann sonrası krem taş; doku mekanlar.md |
| mansard çatı ışık / gölge | `#737b8a` / `#59606e` | |
| pencere camı (gündüz) / demir | `#6f7f8c` / `#2f2f35` | |
| meydan zemini (taş) / toprak yol | `#9a9384` / `#8d836f` | [G] Place Saint-Pierre'in görünümü doğrulanamadı → mekân sorumlusu, nötr |
| kış çıplak ağaç / kuru çimen | `#4c4a44` / `#8f8c78` | b\* ≤ 14 |
| gün siluet (kompars) | `#3a3632`, kenar ışığı `#efe6cc` | |
| gölge rengi (genel) | zemin tonunun %70'i, soğuk (b\* düşer) | sıcak gölge yok |

### 1.4 DAGRON-INSERT (Paris atölyesi P05, Tours masası P09, kafes P04b)
| Ad | Hex | Not |
|---|---|---|
| masa yüzeyi ışık / gölge | `#5e4f40` / `#3e342a` | mat, doku mekanlar.md |
| arka duvar (badana, soğuk) | `#b9b3a2` | |
| mektup sayfası / gölge / satır çizgisi | `#e4dfd0` / `#bdb7a6` / `#6d675a` | |
| ışık hattı (küçültme anı) | `#f6f2e2` | beyaz, kehribar değil |
| film şeridi (yüz / ışık geçen kenar) | `#5a5048` / `#6b645a` | koyu sepya-gri |
| ahşap kutu / sandık ışık / gölge | `#7a6a56` / `#4a3f33` | |
| demir (mercek çerçevesi, bant, menteşe) | `#3a3d42` | sarı metal yok |
| mercek camı | `#cfe0e0` + sert beyaz hilal `#f6f2e2` | |
| kuş kefesi / terazi çelik | `#6d6a63` | |

### 1.5 LANTERN-ODA (P10b)
| Ad | Hex | Not |
|---|---|---|
| oda gölgesi (en koyu) | `#1b1d24` | saf siyah değil |
| perde (badanalı duvar) ışıkta / karanlıkta | `#d9d9cf` / `#2c2f36` | [A] duvara yansıtılır; çarşaf/ekran iddiası yok |
| huzme dolgu / kenar | `#e4ecd8` α .30 / α .55 | **kireç beyazı-yeşilimsi** [S/G: ışık kaynağı kaynaksız → renk yalnız beyaz-soğuk], kenarlar net; toz 6–8 adet `#e4ecd8` |
| lantern gövde / kaide | `#2f3238` / `#4a3f33` | boyalı sac nötr; **pirinç yok** (§0.2) |
| memur masası / kâğıt | `#3e352c` / `#e4dfd0` | |
| kapı dışı (soğuk gün) | `#aab4bc` | kapıda bekleyen siluetler kontra, `#3a3632` |
| memur/okuyan eli: ten / manşet | `#cdb09a` / `#5d5f63` | Dagron'un sepyasından ayrışır (§3.3) |

### 1.6 HARİTA ekleri (kit parşömeni `paper` üzerine)
| Ad | Hex | Not |
|---|---|---|
| Prusya bölgesi dolgu / kenar | `#52627a` α .55 / `#3e4c63` | **çelik mavi-gri**; kırmızı değil; düz dolgu, tarama/kafes yok |
| Prusya halkası (çevre çizgisi) | `#3e4c63`, 12 px | işaretler küçük dolu kare blok (24 px), bayrak/arma yok |
| Paris içi kâğıt siluetler (kalabalık) | `#4a4237` | halka içi |
| telgraf teli | `#1c1915`, 10–12 px | direk işareti: tek dikey çizgi 24 px, çapraz kol yok |
| rota (Dagron) / gizli segment | `#1c1915` kesik 22/16 (kit) / `#4a4237` noktalı | |
| güvercin çizgileri | `#4a4237`, 4 px | |
| ikon dolgusu / konturu | `#e9dfc9` / `#1c1915` 3 px | |
| iğne başı | **`#1c1915`** + sert krem hilal `#f6f2e2` | kit varsayılanı **pirinç başlı**: bu bölümde override (sarı metal yok). Kodu okumadım, parametreyi motion bulur; yoksa `kit_eksik` |

### 1.7 Renk ölçüm hedefleri (arşiv derecelendirmesi sonrası, eleştirmen ±8 L\*)
| Bölge | Hedef | Plan |
|---|---|---|
| alacakaranlık gök orta | `#4a4663` | P01 |
| alacakaranlık ufuk | `#a58e98` | P01, P11 |
| kış gökü orta | `#aab4bc` | P03, P07 |
| krem taş cephe (ışık) | `#d8cdb4` | P03, P06 |
| balon küre ışık yüzü | `#d9d0b8` | P03, P07 |
| masa / sayfa | `#5e4f40` / `#e4dfd0` | P05 |
| lantern huzmesi | `#e4ecd8` | P10 |
| **kılıf (imza) ışık yüzü** | `#F0B43C` | P01, P09, P10, P11 |

---

## 2. İmza nesnesi: KUYRUK KILIFI (bal kehribarı)

### 2.1 Seçim ve gerekçe [T]
Kullanıcı kararı (DEVAM.md): güvercinin kuyruk kılıfı, bal kehribarı yarı saydam. Gerekçe: (1) hikâyenin tek cümlelik kancasının nesnesi ("mektupları kuşun kuyruğuna sığdırdı"); (2) kanca (P01) → bağlama (P09) → çözme (P10) → kapanış (P11 = P01 ilk karesi) döngüsünü taşıyan tek nesne; (3) alacakaranlık gökte ve kış gününde tek sıcak, doygun nokta olduğu için 360 px'te en küçük halinde bile okunur.

### 2.2 Tanım (biçim ve malzeme nötr: Çelişki 12 [A])
- **Biçim:** ince, uçları yuvarlak **yarı saydam silindir**, kuyruğun **ortadaki tüyüne boyuna** bağlı [A: "kuyruk tüyüne (ortada)"], iki noktadan ince iple sarılı. Bir ucu **tıkaç/kapak** (kılıf rengi, bir ton koyu); çözülürken tıkaç ucu açılır, şerit görünür. Kaz tüyü ya da metal diye **adlandırılmaz**, doku iddiası yok.
- **Gerçek ölçü:** 4.5 cm × 0.6 cm [T: film ≤ 40 mm [A: UCLA/CDM özeti] + pay]. Oran 7.5 : 1.
- **Stilize büyütme: ×1.6** (7.2 × 0.96 cm; bölümde sabit, hiçbir planda değişmez). Gerekçe: P01-P11 geniş planlarda kuş %6 olduğunda gerçek ölçü 360 px'te ≈ 3 px kalır; ×1.6 ile kuş gövde uzunluğunun ≈ %22'si, 360 px'te ≥ 8 × 3 px.
- **Ekran ölçüsü:** P01 f0 ≈ 320 px boy (%17, cs 3.2) · P09 ≈ 270 px (%14) · P10 kılıf çözme ≈ 270 px · P11 son kare = P01 f0 · geniş planda (P01 f300, kuş çıkışı) ≥ 24 × 9 px.
- **Çizim (yarı saydamlık bir çizim dilidir, gerçek alfa değil):** alfa zemine göre rengi kaydırıp imzayı bozar (P01'de koyu gök üstünde α .78 ⇒ `#C2943B`). Bu yüzden kılıf **opak katmanlarla** çizilir ve saydamlık şöyle okutulur: iç şerit gölgesi (içindeki film, bulanık koyu şerit `#4a3e34` α .6) + parlak iç kenar + sert ışık dilimi.

| Katman | Hex | Not |
|---|---|---|
| gövde, ışık yüzü | **`#F0B43C`** | imza çekirdeği (L\* ≈ 77, a\* ≈ 11, b\* ≈ 66, elle hesap) |
| gövde, gölge yüzü | `#C98F26` | alt yarı, tek net sınır |
| ince parlak kenar (2 px, ışık yönünde) | `#FBE3A0` | |
| sert ışık dilimi (spekülar, tek hilal) | `#FFF3CC` | **4 köşeli yıldız/kıvılcım değil** (Evliya fitil motifiyle karışmasın) |
| iç film gölgesi (SAKLANAN ŞEY) | `#4a3e34` α .6 | P01: bulanık, okunmaz; P10: ip çözülünce şerit netleşir |
| tıkaç ucu | `#B9801F` | |
| ip | `#c9c3b2`, gölge `#8d8878` | soğuk kırık beyaz; **bal rengine yakın ip yok** [A: "mumlu ip" tek özet, renk kesin değil] |

### 2.3 Durumlar ve pırıltı
| Durum | Plan | Tarif |
|---|---|---|
| **bağlı, sakin** | P01 f0–40, P11 sonu | Ufuk ışığı kenarı `#FBE3A0` 2 px; **pırıltı = tek spekülar hilal kılıf boyunca bir kez kayar** (P01 f6–40, 34 kare), yıldız ve hale yok |
| **bağlanıyor** | P09 | kılıf kuyruk tüyünün altına yerleşir; ip 2 tur sarılır, düğüm, tek çekiş/deneme (dokunuş); sonra aynı spekülar hilal tek kez (P01'in karşılığı) |
| **çözülüyor** | P10 f48 | ip düğümü açılır (ip kılıftan ayrılıp sarkar), tıkaç ucu çıkar, **film şeridi** (`#5a5048`) kılıftan 1/3 uzunluk çıkar; kılıf yerinde kalır, rengi değişmez |
| **kapanış** | P11 f176–333 | P01 f0 ile aynı kompozisyon, aynı ekran noktası, aynı boy; kuş konmuş (kanat toplu) |
Pırıltı yalnız kılıfın kendi yüzeyinde (dokunuslar.md kuralı); çevresine hale, ışık havuzu, kıvılcım yok.

### 2.4 Tekillik yasakları (eleştirmen ve betik)
**İmza bandı:** `#F0B43C` civarı ΔE76 < 15 (hue ≈ 80° ± 12°, kroma > 45, L\* 60–90). Render'da bu banttaki piksel **yalnız kılıf bölgesinde**; kılıf dışı sayı kılıf içindekinin %25'ini geçmez (ışık/güneş muaf değildir, kenar ışığı b\* ≤ 15 tutulur). **Kılıf dışında hiçbir yüzey b\* > 26 ve L\* > 55 birlikte taşımaz.**
| Yasak | Neden |
|---|---|
| Sarı/altın/pirinç/bakır metal: terazi, lantern, mercek, iğne, kilit, halka, kandil | imza rengi + biçim |
| Kehribar/bal/altın mühür, balmumu, ip, sepet kenarı, güneş diski, pencere ışığı (turuncu), alev (P07 turuncu yok) | imza rengi |
| Başka bir "yarı saydam sarı silindir": cam tüp, şişe, mum, kalem, kamış | biçim tekrarı |
| Eldiven yok (Blanc imzası), kehribar manşet/düğme yok | kanal imza tekrarı |
| Dagron'un el/manşeti sepya `#4a3a2c` (kehribar değil) | dokunuslar.md |
| Film kenarına bal ışığı yok (P05'te sahne planı uygulamadı; tasarım da onaylar) | imza yalnız kılıfta |
| Kanalın `gold #b8862b`'u görüntüde yok | ΔE76 ≈ 22, aynı aile |
**Ölçülen ayrışmalar (elle, D65 sRGB→Lab; render'da motion `renk_olcum.py` ile doğrular, hedef ΔE76 ≥ 15, ten dahil muafiyet yok):** balon ışık `#d9d0b8` ≈ 55 · pencere ışığı `#e6d8bd` ≈ 53 · Dagron eli `#c9a58a` ≈ 48 · hasır ışık `#85715a` ≈ 51 (`#8a6e4a` ile hesaplandı) · kum `#bdb3a0` ≈ 55 · kanal `gold` ≈ 22. Diğer yüzeyler b\* ≤ 20 olduğundan ≥ 40 (tahmini). Eleştirmen ölçer.

---

## 3. Figürler

Bölümde Kukla rig'i **kullanılmaz** (tüm kadro yüzsüz siluet ya da el). Kit karakter kaydı yok; set KE-PK-F1, F2.

### 3.0 Dönem ve nötrlük kuralı [G]
Kıyafet kaynaksız: Ulusal Muhafız kepisi, Prusya Pickelhaube'si, Gambetta'nın giysisi, kadın/erkek giysisi, Dagron'un görünüşü **doğrulanamadı** [A §5.3]. Bu yüzden siluetlerde şapka, kepi, kask, arma, rütbe, etek/çan etek, bayrak **yok**; ayrışma yalnız **boy sınıfı** ve **duruş** ile (aşağıda). Kış paltosu iddiası yok; gövde "uzun sade dış giysi" nötr kütlesi (diz altına inen düz kesim, yaka/düğme yok).

### 3.1 KOMPARS SİLUET SETİ (KE-PK-F1)
Tek ton düz dolgu, kontur yok, yüz yok (baş = düz oval, kulak/burun yok), ayaklar zeminde temas gölgeli.
| Kod | Boy (gerçek) | Gövde | Kullanıldığı yer |
|---|---|---|---|
| `yetiskin-a` | 1.70 m | dar omuz, düz kütle | pencere/balkon (P01), halka içi (P02), yükleyici (P06), memur (P10), kapıdaki (P10) |
| `yetiskin-b` | 1.62 m | geniş omuz, hafif öne eğik | aynı; **a ile yan yana ikiz olmaz** |
| `cocuk` | 1.05 m | yuvarlak baş oranı büyük | halka içi (P02), pencere (P01) |
| `omuzda-cubuk` | 1.70 m | `yetiskin-a` + omuzda ince uzun çubuk (model iddiası yok) | halka içi "asker" (P02) [G] |
- **Ayrışma:** `a` dar/dik, `b` geniş/öne eğik; 360 px'te iki farklı kütle. Aile = `a + b + cocuk` yan yana (P02 halka içi).
- **Renk:** gün `#3a3632` (kenar ışığı `#efe6cc` 2 px), alacakaranlık `#262434` (kenar `#c9b3b8`), harita kâğıt siluetleri `#4a4237` (kâğıt kesiği gibi, düz dolgu).
- **Boy–ufuk:** ayakta yetişkinin başı ufuk çizgisine (göz hizası ≈ 1.60 m) yakın; ön plan figürü de bu kurala uyar. Ayak y ≤ 1480 (güvenli alan).
- **Pencere siluetleri (P01):** 5 adet, pencere/balkon çerçevesinde bel yukarı, hepsi sağ-üste (kuşun gittiği yön) bakar, **hareketsiz**; ekranda her biri ≈ 30–45 px. Aynı tasarım P10 kapısında geri gelir (sahne planı açık soru 2: "aynı siluet tasarımı").
- **Yükleyiciler (P06):** iki `yetiskin-a/b`, sırtları yarı kameraya, sandığı iki yandan tutar; ayakları meydan zeminine basar, sandık havadan iner (zemine değmez, dokunuslar PK-D8).
- **Okuyan siluet (P10 f290–386, göğüs/yakın):** `yetiskin-b`, baş eğik, düz oval baş (yüz yok), omuz + iki el + açılan zarf; elleri Paris eli (§3.3). Ekranda göğüs-yakın: el yüksekliğinin ≥ %12'si (≥ 230 px).

### 3.2 DAGRON (KE-PK-F2) — yüzsüz: sırt + sepya manşetli el
Dagron'un görünüşü doğrulanamadı [A §5.3] ⇒ kimlik **nötr**; tanınma **iki sabit işaretle**: (1) **sepya manşet**, (2) **sırtı kameraya** (hiçbir planda yüzü yok).
| Öğe | Tarif |
|---|---|
| Gövde (sırttan, P06 f212–248 sepete biner) | `yetiskin-a` boyu 1.70 m, ama **iki tonlu** (ışık yanı `#4f4a44` / gölge `#2e2a26`), kompars gibi tek ton değil ⇒ ayrışır; omuz çizgisi `yetiskin-b` ile aynı değil; yaka/düğme/şapka yok |
| Baş | düz oval, **şapka yok** (kaynaksız ⇒ nötr), ensede kısa saç gölgesi `#2a2420` |
| Kol ağzı (manşet) | **koyu sepya `#4a3a2c`**, gölge `#2e2318`; düz, düğme/tokası yok (metal yok), 2 dikiş çizgisi; kol yünlü dış giysiye ait |
| El | çıplak, `#c9a58a` (gölge `#8e6a52`), 5 parmak, 2 boğum çizgisi, tırnak yalnız kısa ark; el bilekten parmak ucuna **0.19 m**; **yüzük yok** (metal yok) |
| Duruş/karakter | sakin, titiz, soğukkanlı (dokunuslar.md); el acele etmez |
- **Ekran ölçüsü:** P05 şerit + parmak ≈ %14; işaret parmağı ≥ 270 px; el kadrajın %25–35'i (cs 1.6). P09 makro: iki el + kuyruk.
- **Stilize büyütme:** yok (el gerçek ölçekte; kadraj yaklaşır).
- **Süreklilik:** Dagron'un eli P05, P06 (sepete tutunma/sandık), P07 (torba bırakma), P09'da **aynı sepya manşet**. Paris'teki eller (P10) ayrı manşet ve ten (§3.3).

### 3.3 Paris eli (memur / okuyan) — P10
Ten `#cdb09a`, gölge `#8f7360`, manşet **kömür-gri `#5d5f63`** (Dagron sepyasından ve imza kehribarından ayrışır), düz, düğmesiz. Ellerde yüzük/saat yok. Dagron eliyle yan yana asla görünmez (P10'da Dagron ekranda yok).

---

## 4. Prop kartları

Genel: ekran ölçüsü gerçeğe göre; stilize büyütme yalnız tabloda "×" yazanlarda ve en fazla ×1.6. "360 px" sütunu = ekran ölçüsü ÷ 3.
Özet:
| # | Prop | Gerçek ölçü | Ekran ölçüsü (plan) | 360 px | Stilize |
|---|---|---|---|---|---|
| N3 | kuyruk kılıfı (imza) | 4.5 × 0.6 cm | 270–320 px boy (P01, P09–P11), geniş planda ≥ 24 × 9 px | 90–107 px; geniş ≥ 8 × 3 px | ×1.6 |
| N1 | balon küresi + sepet | küre çap ≈ 15 m [G] · sepet 1.2 × 1.2 × 0.95 m [G] | P03 balon ≈ 860 px (%45); P07 geniş %50; P06 sepet+sandık ≈ 670 px (%35) | 287 / 223 px | sepet:küre ≈ 1:8 (gerçek ≈ 1:12) sabit |
| N1 | balast torbası | 0.35 × 0.25 m [T] | P07 ≈ 230 px (%12) | 77 px | — |
| N2 | güvercin | gövde 0.32 m, kanat açıklığı 0.65 m [G] | P04 ≈ 576 px (%30); geniş planda %6 ≈ 115 px | 192 / 38 px | geniş planda kılıf ×1.6 (yukarıda) |
| N2 | kafes | 0.40 × 0.30 × 0.30 m [T] | P04b ≈ 520 px geniş | 173 px | — |
| N2 | kümes | 1.2 × 0.8 × 0.9 m [T] | P10a/P11 yakın: ağız ≈ 500 px | 167 px | — |
| N4 | terazi | kol 0.35 m, kefe ø 0.18 m [T] | P05 ≈ 560 px geniş | 187 px | ×1.5 |
| N4 | küçültme kutusu | 0.35 × 0.28 × 0.25 m [T] | P05 ≈ 520 px | 173 px | ×1.4 |
| N4 | mektup sayfası / film şeridi | sayfa 21 × 27 cm [T] / şerit 4 × 2 cm [A boy ≤ 40 mm] | sayfa ≈ 420 px (%22); şerit 280 px (52°) | 140 / 93 px | şerit ×1.6 (6.4 × 3.2 cm) |
| N5 | magic lantern + cam levha | gövde 0.45 × 0.30 × 0.35 m [G]; levha 8 × 8 cm [G] | P10 huzme kaynağı ≈ 380 px | 127 px | ×1.3 |
| N5 | perde (badana duvar) | yansıma ≈ 1.2 × 1.2 m [T] | ≈ 1056 px (%55) | 352 px | — |
| N6 | zarf | 11 × 14 cm [G] | P10 ≈ 240 px | 80 px | ×1.4 |
| N6 | posta çuvalı | 0.7 × 0.4 m [G] | P03 sepette ≈ 160 px | 53 px | — |
| S2 | alet sandığı | 0.7 × 0.45 × 0.45 m [T] | P06 sepet+sandık %35 | 223 px | — |
| E2 | sepet halatı | ø 2 cm | 3–4 px ince çizgi → yakın planda 6 px | — | kontur sınıfı 4–6 px |
Not: parmak boyu çelişkisi §12 madde 1.

### 4.1 BALON (KE-PK-N1) — küre, ağ, halka, sepet, hortum, torbalar
**Kaynak durumu:** pamuk kumaş, ipek reddedildi, kömür gazı, Gare du Nord'da vernik [A: SAMH/HIN]; pilotlar çoğunlukla denizci [A]; kum balastı atıldı [A: DASH]. **Küre biçimi, üstten saran ağ, hasır sepet, ≈2.000 m³ hacim kaynaksız** [arastirma §5.2: "found nothing on…"; gravürler küre+ağ gösterir, görsel referansla kontrol et] ⇒ **[G] doğrulanmalı**, aşağıdaki biçim **nötr tutarak** çizilir. Hacim kaynaksız: ölçüler küre çapı için yalnız oran verir.
- **Küre:** tam küre; alt %12'si hafif içe konik **boğaz** (hortum bağlantısı, P03 D2); armut/uzun gövde yok, üst supap ipi ve valf **çizilmez** (kaynaksız). Hacim iddiası yok: çap sabit "kamera ölçeği" ile verilir (P03'te %45, P07'de %50).
- **Kumaş:** kirli krem, vernik parlaması tek hilal. Işık `#d9d0b8` · gölge `#b3a98f` (terminatör sert kenar) · vernik hilali `#efe9d6` · kontur `#2a2622` 3–4 px (kış gökten ayrışma bu konturla, §1.3). **b\* ≤ 18** (sarıya kaçmaz). Yama, şerit, renkli panel, **yazı, isim, bayrak, arma, tricolore yok** [G: Blanc dersi]. Adlar (Niépce) yalnız ekran yazısında.
- **Ağ:** yalnız küre üst-yan yüzeyinde: **9–11 meridyen** çizgisi + **4 paralel** halka; çizgi 2.5 px (cs 1.0), ağ gözü ekranda ≥ 60 px ⇒ tel örgü/kafes desenine dönmez. Işık yüzünde seyrek (ince, `#a89d86`), gölge yüzünde belirgin (`#7c7260`). Ağ alt halkada toplanır. **Şişme (D2):** ağ halatları başta gevşek kıvrık, gerilme 3 aşamada (f40, f66, f88) düzleşir; kırışık çizgisi sayısı 9 → 0, üstten alta.
- **Halka + halatlar:** ağ alt halkada (çember, `#5a4e3e` ince 5 px) toplanır; sepete **önde 5 halat** iner (stilize, gerçek sayı iddiası yok). Halat `#8a7a62` · gölge `#5a4e3e`. Halat gerilmesi (D8 f262) halatın düz çizgiye dönmesi; gevşekken hafif sarkar.
- **Sepet:** dikdörtgen hasır kasa, kenar yüksekliği bel hizası (≈ 0.95 m). **Hasır dokusu:** dikey kamış + 2 yatay sarma kuşağı (çapraz örgü yok, geniş kafes yok). Işık `#85715a` · gölge `#5a4a3a` · kenar bandı `#3e342a`. Sandık yüklenince hasır **bir parmak çöker** (D8): alt kenar 3–4 px içe, dikey kamışlar hafif kavisli sıkışır; sepet kenarı sağ-sol bir kez sallanır.
- **Torbalar:** dış kenarda asılı **4 görünür** balast torbası (P06 kurulum, P07 karşılık), ham keten `#a8a08a` · gölge `#7c7462`, ağız ip bağı `#8a7a62`, alt yuvarlak ağır; ip düğümü kancaya. Yazı/damga yok. Düşen kum: ince açık gri iz `#bdb3a0`.
- **Gaz hortumu (P03):** koyu düz silindir `#3a342e`, ø 0.12 m, malzeme iddiası yok, balon boğazına bağlı; çıkış ucunda `#cfcac2` küçük puf (gaz akışı, kıvılcım/alev yok).
- **Durumlar:** `yigin` (P03 başı: kumaş buruşuk yığın) → `sisme 0..1` → `dolu` → `yukselis` → `coker` (P07 vurulan, §5) → `ikon` (haritada küçük silüet, §6).
- **Okunurluk (360 px):** küre + ağ + sepet + halat 4 parçası ayırt edilir; sepet 360 px'te ≥ 55 × 55 px; P06'da sandık sepetten ayrışır (sandık koyu çelik bant).
- **Risk:** küre yüzeyi büyük düz alan ⇒ doku gerekirse yalnız ağ + terminatör taraması; geniş kafes/çapraz tarama **yasak**.

### 4.2 GÜVERCİN (KE-PK-N2) — poz seti
**Kaynak durumu:** kuş türü/rengi kaynaksız [A]; genel güvercin anatomisi [G güvenli]. ⇒ **nötr gri tek kuş**, tür işareti (yeşil-mor boyun parıltısı, iki kanat çubuğu, beyaz kuyruk bandı) **çizilmez**. Güvercin, martı (Evliya) ve karga ile karışmaz: **kısa kalın boyun, yuvarlak göğüs, küçük yuvarlak baş, kısa gaga, geniş yelpaze kuyruk**.
- **Ölçü:** gövde (gaga–kuyruk ucu) 0.32 m, açıklık 0.65 m [G]. Kuyruk 9 görünen tüy yelpaze; **ortadaki tüy kılıf taşıyan** (diğerlerinden 1 tüy genişliği daha uzun görünür: bağlama yeri belli).
- **Renk:** üst/gövde ışık `#8f949a` · gölge `#6b7076` · karın `#a9acaf` · kanat ucu `#4a4d52` · kuyruk ucu bandı **yok** · gaga `#4f4b4f` · **ayak `#6a5a60` (koyu mor-gri; kırmızı yok)** · **göz: tek `#14120f` nokta, iris/turuncu halka yok** (turuncu göz imzayı kirletir, yüz detayı kuralı).
- **Poz seti** (kuş ekranda 576 px'te ayakta, 4-poz kanat döngüsü 16 kare/vuruş):
| Poz | Tarif | Plan |
|---|---|---|
| `tunek` | gövde 35° dik, kuyruk aşağı kapalı, kanat toplu, baş sağa | P01 f0 öncesi, P04, P10, P11 |
| `tunek-yon-ara` | gövde-baş ±25° iki salınım, ikinci salınımda sağ-üste kilit (D4) | P04 f166–226 |
| `kalkis-a/b` | kanat tam yukarı / yarı aşağı, bacak toplu, kuyruk yelpaze açık | P01 f0–24, P04 f226–244, P09 f196 |
| `ucus-yukari/asagi` | kanat tam yukarı / tam aşağı; gövde 15° yukarı | uçuş döngüsü (4-poz) |
| `suzulme` | kanat yatay, uçlar hafif yukarı, kuyruk yelpaze düz | P01 f24–275 |
| `konma` | kanat geriye açık, kuyruk yelpaze aşağı-geniş, bacak öne uzar | P10 f20, P11 f176–222 |
| `kanat-topla` | kanat gövdeye iner (hareket tamamlanır) | P11 f222–262 |
- **Tutulan kuş (P09 makro):** el sıkmadan tutar, kuyruk tüyü elin dışında yumuşak sarkar (katı kalıp değil); kuş kadrajda yalnız kuyruk + göğsün alt kısmı.
- **Kılıfsız/kılıflı:** P04, P05 kuşları kılıfsız; yalnız P01, P09–P11 kılıflı (süreklilik sahne planı §6).
- **Okunurluk:** geniş planda (%6 ≈ 115 px) silüet güvercin okunur (kısa boyun + yelpaze kuyruk) ve kılıf tek sıcak nokta. Kuş küçük ⇒ ayrıntı yok, 3 ton.

### 4.3 KAFES (KE-PK-N2) — P04b
- **Biçim:** dikdörtgen ahşap çerçeve + **dikey çubuklar** (görünür 7), **yatay tel yok, örgü yok** ("kafes/tel örgü" desen yasağı; çubuk aralığı ≥ 40 px ekran). Ön yüzde **sol menteşeli yan kapak** (D4: iter, menteşe açılır, 100°'ye gider), içte 1 yatay **çıta (tünek)** ø 2.5 cm; kuş çıtada durur. Üstte küçük taşıma halkası (çelik `#3a3d42`).
- **Ölçü:** 0.40 × 0.30 × 0.30 m [T, kaynaksız ⇒ nötr]. Sepete (P04b "uzakta inen sepet insert") yerleşik.
- **Renk:** çerçeve ışık `#7a6a56` · gölge `#4a3f33` · çubuk `#4a4237` (6 px) · menteşe `#3a3d42`. Sarı metal yok.
- **Okunurluk:** kapak ve çıta ayrı okunur; kuş ekranın %30'u (576 px). Kapağın açılma kenarı ışık yüzünde `#efe6cc` kenar çizgisi.

### 4.4 KÜMES (KE-PK-S1/N2) — çatıda, P01 f0 / P10a / P11b
**Kaynak durumu:** Paris'te güvercin kümesi ("lofts in Paris") [A: HORNE özeti]; biçim ve yer kaynaksız ⇒ **[G] nötr**: çatıda, baca kümelerinin yanında küçük ahşap kulübe.
- **Biçim:** alçak ahşap kutu-kulübe, **tek eğimli çatı**, ön yüzde (a) **iniş tahtası** (çıkıntı 0.25 m, kuşun konduğu), (b) 2–3 **giriş açıklığı** (üstü yarım daire değil, düz dikdörtgen), (c) bir tarafta **el ağzı** (kapak, P10 elin kılıfı çözdüğü yer). Dikey tahta kaplama (çapraz yok). Kümes çatı düzlüğüne oturur; zemine temas gölgesi.
- **Ölçü:** 1.2 × 0.8 × 0.9 m [T]. Yakın planda ağız ve iniş tahtası kadrajın %40'ı.
- **Renk:** gün ahşap `#7a7468` / gölge `#4f4a42`; çatı (ince çinko-gri) `#59606e`; alacakaranlık §1.2. Ahşap soğuk gri-kahve (b\* ≤ 14).
- **Okunurluk:** P01 f0 yakın plan: kümes dışarıda, kadrajda yalnız iniş tahtası kenarı + kuyruk; geri çekilince kümes çatıda "küçük ev" okunur. P11 son kare = P01 f0.

### 4.5 TERAZİ (KE-PK-N4) — P05 f10–100 (gag)
- **Biçim:** iki kefeli kol terazisi: dikey ayak + enine kol (tek parça) + iki ince zincir/ip + iki yuvarlak kefe. Zincirler ince `#6d6a63` 3 px; **kefeler çelik/çinko gri** `#6d6a63` (pirinç yok). Kaide ahşap `#7a6a56`.
- **Ölçü:** kol 0.35 m, kefe ø 0.18 m [T]; ekranda ≈ 560 px geniş (×1.5).
- **Kefe yükleri:** bir kefede **mektup destesi** (8–10 sayfa üst üste, kalınlık görünür, `#e4dfd0`), öbüründe **güvercin** (`tunek`, kefeye konmuş, kılıfsız). Deste kefesi iner (f10–36), kuş çırpar (f50–100) ama kefe kalkmaz (yönetmen/motion: kuvvet küçük, kol bir kez titrer).
- **Okunurluk:** kol eğikliği + iki yük 360 px'te "tartı" okunur; zincirler 3 px ince olduğu için kefe ile kolun birleşim noktaları büyütülmüş (küçük çelik halka 14 px).

### 4.6 DAGRON'UN MERCEKLİ KÜÇÜLTME KUTUSU (KE-PK-N4) — P05, kimyasal adım gösterilmez
**Kaynak durumu:** mikrofilm fotoğrafla küçültülür [A: UCLA/CDM]; cihazın biçimi **kaynaksız** [G]. ⇒ nötr "mercekli ahşap kutu".
- **Biçim:** ahşap kutu; **ön yüzde mercek tüpü** (ø 0.08 m, kısa), **üstte kaldırılabilir kapak** (D5: kapak kalkar → sayfa ışık hattına çekilir), **yanda çekmece** (şerit kayar, D5). Üstte kapak menteşesi, kenarlarda demir köşe bantları.
- **Ölçü:** 0.35 × 0.28 × 0.25 m [T], ekranda ≈ 520 px (×1.4). Mercek çerçevesi koyu çelik `#3a3d42`, **cam** `#cfe0e0` + beyaz hilal `#f6f2e2`.
- **Küçültme anı (D5):** sayfa kutuya çekilirken **ince beyaz ışık hattı** `#f6f2e2` (kutu önünde yatay, 4 px), hat dışında efekt yok (kıvılcım/duman/kimyasal şişe yok). Şerit çekmeceden **kayarak** çıkar, parmak yanına konur, 52° eğik (sahne planı: rota çizgisinin ilk parçasına eşleşir).
- **Süreklilik:** aynı kutu P09'da yok (Tours masasında yalnız şerit yığını, D6 ile tekrar olmasın).

### 4.7 MEKTUP, ŞERİT, ZARF, ÇUVAL (KE-PK-N4/N6)
- **Mektup sayfası:** `#e4dfd0`, **satırlar dil-nötr**: 11–13 dalgalı yatay vuruş (kamış/kalem çağrışımı), harf yok; kenarda katlama çizgisi `#bdb7a6`. P05: tam sayfa %22.
- **Film şeridi:** 4 × 2 cm [T: boy ≤ 40 mm [A]; en kaynaksız] ×1.6 ⇒ 280 px boy, 52° eğik; yüz `#5a5048`, ışık geçen kenar `#6b645a`; içinde **8 ince yatay mikro çizgi** (dil-nötr, 1.5 px, `#3e352c`); **delik/perforasyon yok** (kaynaksız, sinema filmi okutur). P09: masada **şerit yığını** (8–10 şerit), kılıfa sarılacak tek şerit öne.
- **Zarf (P10):** 11 × 14 cm [G] ×1.4; `#e4dfd0` / gölge `#bdb7a6`; **üçgen kapak çizgisi** `#8a8576`; adres bloğu = 3 kısa çizgi (dil-nötr); **pul, damga, mühür, yazı yok** (kırmızı mühür kaynaksız, damga yazı taşır). Zarf açılma: kapak yukarı döner (2 kare ara), içinden mektup sayfası (katlı) çıkar. Kapıdaki siluetin elinde ekranda ≥ 230 px (okuma anı yakın plan).
- **Posta çuvalı (P03 sepette):** bez torba, ham keten `#a89f88` / gölge `#7a7160`, ağzı ip bağlı, alt yuvarlak, yazı/damga yok [A: çuval var; Ville d'Orléans "dört posta çuvalı"; bu hikâyede miktar iddiası yok]. P03'te sepet içinde 2 görünen.
- **Yazı yığını (HARİTA P03):** haritada kâğıt yığın ikonu (§6).

### 4.8 SANDIK (KE-PK-S2) — P06 D8
- **Biçim:** ahşap alet sandığı, düz kapak, **iki yan kulp** (halat kulp `#8a7a62`), köşe demir bantları, **kilit/kapaklı mandal yok**, dikey tahta (çapraz çıta yok). **Yazı/stencil yok** ("~600 KİLO EKİPMAN" ekran yazısında) [A: ≈600 kg ekipman, Dagron'un çıkışı].
- **Ölçü:** 0.70 × 0.45 × 0.45 m [T]. Sepet:küre oranı ile bir arada, sepet+sandık %35 ekran. Küçük ikinci sandık (0.45 × 0.30 × 0.30 m) yanında yığılı.
- **Renk:** ışık `#7a6a56` · gölge `#4a3f33` · bant `#3a3d42` · kulp `#8a7a62`.
- **Ağırlık okunurluğu:** sandık oturunca hasır çöker (§4.1), halat sallanır; sandık yüzü 360 px'te ahşap tahta çizgileri (dikey 3 çizgi) ile "kasa" okunur.

### 4.9 MAGIC LANTERN + CAM LEVHA + PERDE (KE-PK-N5/S4) — P10b
**Kaynak durumu:** magic lantern ile duvara yansıtılır [A: CDM/MICRO özeti]; cihaz gövdesi, ışık kaynağı (mum/kireç) ve oda **kaynaksız** [G; arastirma §5.4, §9: oda yeri belirsiz]. ⇒ nötr.
- **Lantern:** kutu gövde + mercek tüpü (dar silindir) + üstte kısa baca + cam levha yuvası (yan kesit). Gövde **boyalı sac, koyu** `#2f3238`, kenarlar `#4a4d52`, kaide ahşap `#4a3f33`. **Pirinç yok.** İç alev görünmez (kaynak iddiası yok); baca ağzında ince gri duman çizgisi yok (kıvılcım yok).
- **Cam levha:** 8 × 8 cm çerçeveli kare [G], cam `#cfe0e0` α, çerçeve ahşap `#4a3f33`; yuvaya yerleşir (D7 f84 temas).
- **Mercek halkası:** dönen halka çelik `#3a3d42`, diş çizgileri 6 adet (odak dişlisi, dokunuş).
- **Huzme:** lantern merceğinden perdeye **geometrik koni**; dolgu `#e4ecd8` α .30, kenarlar net 2 px `#e4ecd8` α .55; içinde toz zerreleri 6–8 adet; huzme perdede düşer. Fade yok: koni lamba yanınca **uzayarak** belirir (ışık geometrik büyür).
- **Perde:** **badanalı duvarın bir bölümü** [A: duvara yansıtılır] ışıkta `#d9d9cf`, karanlıkta `#2c2f36`; yansıma dikdörtgeni hafif yuvarlak köşeli, 1056 px (%55). Çarşaf, çıta, çerçeve yok.
- **Bulanık → net (D7):** bulanık hâl = aynı mikro satırların **3 kopyası** (±14 px kayık, α .33 her biri); odak oturdukça kopyalar üst üste biner (tek kopya, α 1). Satırlar **dil-nötr** (§4.7) 14 satır; harf yok. Büyüme: küçük bulanık kare (ekranın %8'i) → perde dolusu (%55).
- **Memur masası:** perdeden yansıyan yumuşak ışık; memurlar silüet, kâğıda yazar (kâğıt `#e4dfd0` yığın), kapıda bekleyen siluetler arkadan gün ışığı.

### 4.10 ZARF TESLİMİ (P10 f272–386)
Zarf kâğıt yığınından alınır → kapıdaki siluetin eline (aynı tasarım, §3.1) → açılır → mektup sayfası çıkar → siluet baş eğik okur. Okuyan elin zarf tutuşu: iki elle kenarlardan; zarf yumuşak, hafif kıvrık. **Hiçbir yerde okunur harf yok.**

---

## 5. P07 darbe tarifi — dönem gravürü dili (mevcut çizgi roman patlaması KULLANILMAZ)

**Kaynak durumu:** Daguerre balonunun "vuruldu" (orta-yüksek [A: DASH, STRAT]); **neyle vurulduğu (tek kaynak), yangın çıkıp çıkmadığı, gaz boşalmasının görünümü kaynaksız** ⇒ tek görünür olay **kumaşın delinmesi ve çökmesi**; ateş/top **gösterilmez** (dokunuslar.md D3). "Kısa alev" yalnız çok kısa bir **parlama** olarak, aşağıdaki gravür diliyle: [T, kaynaksız: dramatizasyon].

| Evre (darbe `f108`'e göre) | Çizim | Renk / ölçü |
|---|---|---|
| **−24…0 (f84–108): yerden duman çizgisi** | Kadraj altından yükselen **ince dik duman sütunu**, 90 px genişlik, rüzgârla hafif sağa kıvrılır; ucunda 3 küçük tırtıklı bulut kümesi. Mermi izi, top, namlu **çizilmez** | gri-kül `#8f8a84` ışık / `#5b5752` gölge |
| **0…4: delinme** | Küre yüzeyinde isabet noktası: **koyu delik** ø 52 px (`#2a2622`), çevresinde **6 radyal yırtık çizgisi** (kıvrık, dışa açılan kumaş kenarı, kenar iç yüzü açık `#efe9d6`, dış yüzü gölge `#b3a98f`); yırtık çizgi 3 px mürekkep | delik küre yüzeyinde ekranda ≥ %3.5 |
| **0…10: kısa parlama** | Delikten çıkan **düzensiz yaprak biçimli kâğıt-krem alan** (mürekkepsiz bırakılmış gibi), yarıçap ≤ 110 px, **2–3 kısa alev dili** (≤ 80 px, içi `#f4eddc`, mürekkep kontur `#1c1915` 3 px, uçları kıvrık). Sonra küçülür ve söner (fade değil: küçülme + kontur koyulaşması) | `#f4eddc`; **turuncu/sarı/kehribar yok**, L\* > 90 ve b\* < 12 |
| **4…60: gri-kül duman** | Delikten yükselen 3–5 **tırtıklı bulut kümesi**, düz 2 ton, kenar gravür tırtığı; rüzgârla sağa, büyür, sonra seyrelir (kümeler küçülerek ayrılır) | `#8f8a84` / `#5b5752`, hiçbir ışık yaymaz |
| **4…40: kumaş çöker** (D3 kurulumu) | Küre içe katlanır: yüzeyde 5 çökme meridyeni, alt yarıdan üstte doğru; gaz boşalması **ince soluk-gri puf** (küçülerek ayrılır) | puf `#cfcac2` |
| **tarama** | Gölge yüzünde ve duman altında **3–5 paralel tarama**, açı sahnenin tek θ'sı (güneş GD ⇒ gölge sol-aşağıdan sağ-yukarıya hatları); isabet çevresinde **radyal tarama yok** | çizgi 2 px, aralık 7 px, gölge tonunun %60 koyusu |
| **sarsıntı** | Hafif: kamera ≤ 3 px, 12 kare (patlama sarsıntısı değil, tepki) | |
**Yasak:** 8+ sivri uçlu patlama yıldızı, çizgi film "BOOM" balonu, turuncu-sarı gradyan, kıvılcım yağmuru, tam ekran flaşı (flaş ≤ ekranın %10'u), yatay şok halkası, kıymık/enkaz, alev kümelerinin büyük bulutu, ateş topu, top/namlu ağzı. Sepet düşüşü kadraj dışında biter (görmediğimiz yerin sesi yok, dokunuslar.md).
**Okunurluk:** vurulan balon ekranın %50'si; çöküş net ≥ 1.4 sn; isabet noktası parlama ile ilk 10 karede okunur. Darbe `siddet`/`yaricap` değerleri kit `darbe` yerine **KE-PK-E1** özel çizici ister (`duman: false`, sahne planı).

---

## 6. HARİTA çizim dili (HARITA, kit parşömeni üstüne; KE-PK-H1…H5)

Kit HARITA'daki parşömen, mürekkep rota (`rota_ciz`), divit damlası, kart (`harita_kart`) aynen. Bölüm ekleri (hepsi mürekkep/kâğıt dilinde, **kırmızı yok**, **sarı yok**):
| Öğe | Tarif | Çizgi / ölçü | Renk | Plan |
|---|---|---|---|---|
| **Prusya halkası** | Paris çevresinde dairesel diziyle küçük **dolu kare blok işaretleri** (24 px, 22 adet); son işaret son boşluğa oturunca halka kapanır (D1), çevre çizgisi kalıcı olur | halka 12 px, halka çapı = ekranın %45'i | `#3e4c63`; işaret `#52627a` | P02 |
| **Telgraf teli** | Paris merkezinden kıvrımlı tek çizgi; **direk işareti = dikey 24 px çizgi** (çapraz kol yok); halka kapanınca tel halka çizgisinin içinde **kopar**, uçlar iki yana kıvrılır (iç uç Paris'e, dış uç boşluğa), 40 karede sallanıp durur (D1) | tel 10–12 px, uç kıvrımları ≥ 220 px | `#1c1915` | P02 |
| **Kalabalık** | Halka içinde 14–18 **kâğıt siluet** (§3.1, aile / asker / çocuk), yan yana, dışarıya dönük; halkanın dışı **boş** | siluet 60–90 px | `#4a4237` | P02 |
| **Balon izi + rüzgâr çizgileri** | Paris dışına doğru **mürekkep iz** (rota_ciz), uçta biter; rüzgâr = 3 ince tek yönlü uzun çizgi (kavisli); **geri ok** önce çizilir sonra **fırça gibi süpürülür** (silinir, iz kalır) | iz 6 px, ok 4 px | `#1c1915` / `#4a4237` | P03 |
| **Yazı yığını** | Halkanın dışında kâğıt yığın ikonu (kenarı kıvrık 5 sayfa); **kesik çizgiyle** halkaya gelir, halkaya **çarpıp** durur (sekme 6 px, tamamlanır) | yığın ikonu 80 px, kesik çizgi 4 px | ikon `#e9dfc9` + kontur | P03 |
| **Güvercin çizgisi + kümes ikonu** | Uzak noktadan Paris'teki küçük kümes ikonuna ince çizgi; **kuş ikonu** çizginin ucunda 36 px (silüet) | çizgi 4 px | `#4a4237` | P04 |
| **TOURS ikonu** | Küçük **nötr bina** (dikdörtgen gövde + üçgen çatı, 56 px; kule/çan/Chappe/bayrak yok) + yanında kâğıt yığın (mektuplar orada yazılıyor) | kontur 3 px | `#e9dfc9` / `#1c1915` | P06, P08 |
| **PRUSYA BÖLGESİ** | Paris dışında bir noktada **düz çelik mavi-gri dolgulu bölge** (kenarı mürekkep, düzensiz); tarama/kafes yok; halka ile aynı mavi-gri ailesi | bölge ≈ 340 px | dolgu `#52627a` α .55 | P08 |
| **BALON / YATIK SEPET ikonu** | Balon ikonu = küçük küre + sepet (56 px). **Yatık sepet** = yana devrik sepet (60° eğik) + yanında **sönük, katlanmış küre silüeti** (balon indi) 64 px | kontur 3 px | `#e9dfc9` / `#1c1915` | P08 |
| **Gizli segment** | Prusya bölgesinden Tours'a ince **noktalı** çizgi (gizlice kaçış); rota etiketi çizgiyle kesişmez (KE-PK-H4) | 4 px nokta | `#4a4237` | P08 |
| **Çizgilerin yolda sönmesi** (P11) | Kümeslere uzanan 14 ince güvercin çizgisi; çoğu **yolun ortasında ince nokta olarak biter** ve ucundaki kuş ikonu küçülüp çizgiye gömülür (fade değil), 3-4'ü kümese varır | çizgi 4 px | `#4a4237` | P11 |
| **Film şeridi yağmuru** | Kümeslere varan çizgilerin ucundan Paris'e **küçük şerit ikonları** (24 × 12 px, §4.7) yağar, yığın büyür | | `#5a5048` | P11 |
- **iğne** (kit): batma sekmesi ve temas gölgesi kit'te; **başı mürekkep siyahı** (§1.6).
- **Kart** (`harita_kart`): kit standardı (Playfair 44 / Plex Mono 28); alt satır 28 px 360 px'te küçük (kit raporu) ⇒ kart alt satırı kısa ve en çok 14 karakter (yönetmen).
- **Etiketler yazı katmanında** (PARIS, TOURS, ~200 KM): dil başına ayrı katman; haritaya gömülü yazı yok.

---

## 7. Dil-nötr kural ve tipografi

- **Görüntü yazısız render edilir.** Balon, sepet, sandık, kutu, zarf, çuval, torba, pencere, kümes, kafes, tabela, levha, perde üzerinde **hiç yazı yok**; mektup/film/perde satırları soyut çizgi (§4.7, §4.9). Pul/damga/mühür metni yok.
- **Yazı katmanında** (dil başına ayrı, şeffaf): ekran yazıları (kit standardı: kâğıt şerit + Playfair 900, tek kırmızı vurgu), sayaçlar, harita etiketleri (Plex Mono), `harita_kart`, altyazı (kelime kelime). Bölüme özel stil yok.
- Kırmızı vurgu kelime/sayı: `theme.red #b3261e` — **tek** kırmızı kaynak. Görüntüde kırmızı piksel eleştirmen kontrolünde 0 olmalı.
- Font dışı glif: `≈` yerine `~` (sahne planı kararı). `Â İ Ş Ğ` glifleri mevcut.

---

## 8. Kaynaksız → nötr kararları ([G] listesi)

| # | Ayrıntı | Durum | Bu belgedeki nötr karar |
|---|---|---|---|
| G1 | 1870 Paris: krem taş, mansard, baca kümeleri (Haussmann sonrası) | [G] arastirma §5.1 doğrulanmalı; mekân sorumlusu referansla kontrol | yalnız ton verildi (§1.2-1.3); doku/ayrıntı mekanlar.md |
| G2 | Çatı malzemesi (arduvaz/çinko) | [G] | adı yok; soğuk gri-mavi ton |
| G3 | Balon küre biçimi, ağ, hasır sepet, halka, hacim | [G] arastirma §5.2 | küre + seyrek ağ + hasır; hacim/gerçek ölçü iddiası yok |
| G4 | Balon rengi/vernik görünümü | [G]; pamuk+vernik [A] | kirli krem, b\* ≤ 18, yazı/bayrak/arma yok |
| G5 | Kafes biçimi, güvercin cinsi/rengi | [G] | nötr gri, tür işareti yok, çubuk kafes |
| G6 | Kümes biçimi ve çatıdaki yeri | [G]; "lofts in Paris" [A özeti] | alçak ahşap kulübe, tek eğim, iniş tahtası |
| G7 | Dagron'un görünüşü/kıyafeti/başlığı | [G] doğrulanamadı | yüzsüz sırt + sepya manşetli el, başlık yok |
| G8 | Kompars kıyafeti (kepi, Pickelhaube, Ulusal Muhafız, kadın giysisi) | [G] doğrulanamadı | yalnız boy/duruş farkı, aksesuar yok; "asker" = omuzda çubuk |
| G9 | Magic lantern gövdesi, ışık kaynağı (mum/kireç), oda | [G] | koyu sac gövde, kireç beyazı huzme (kaynak iddiası yok), oda yeri nötr |
| G10 | Küçültme cihazı biçimi (mercekli kutu) | [G] | ahşap kutu + mercek tüpü + kapak + çekmece; kimyasal adım yok |
| G11 | Film şerit boyutu 4 × 2 cm | boy [A özet: ≤ 40 mm]; en [T] | perforasyon yok |
| G12 | Zarf boyu, kapak biçimi, pul/damga | [G] | boş zarf, pul/damga/mühür yok |
| G13 | Sokak/gaz lambası, kuşatma karartması | [G] doğrulanamadı | çizilmez; yalnız pencere ışığı soluk krem |
| G14 | Place Saint-Pierre / Montmartre görünümü (değirmen, bahçe, evler) | [G] doğrulanamadı | yalnız meydan zemini, kış çıplak ağaç; ayrıntı mekanlar.md |
| G15 | Telgrafın elektrik teli olduğu, Chappe'nin kullanım dışı oluşu | [G] | tel çizilir, T-kolu hiç çizilmez |
| G16 | Güneş saati/yönü (09:00 ⇒ GD, 12°) | [T] astronomik türetme; yerel saat standardı belirsiz | ±4° pay, ışık "soldan-arkadan" öneri |
| G17 | Yanma/alev, vuran silah | kaynaksız (tek kaynak STRAT silah) | silah yok; parlama yalnız gravür kısaltması [T] |
| G18 | Sandık biçimi, torba boyutu, kum rengi | [G]/[T] | düz kasa + bant; keten torba; kum açık gri |
| G19 | Tours binası | kaynaksız | nötr bina ikonu, kule/çan/Chappe yok |

---

## 9. Mekân sorumlusuna devredilen noktalar
1. **Palet bağlayıcı:** §1 tabloları; mekanlar.md doku/tarama tonlarını bu hex'lerden türetir. Gök 3 düz basamak, gradyan yok. Mekân paleti imza bandına (§2.4) girmez, kılıf dışında b\* > 26 ve L\* > 55 olmaz.
2. **Işık:** §1.1 tek kaynak tanımı. PARIS-CATI ve MONTMARTRE'de her görünen pencere kendi çevresine havuz düşürür; gün planlarında tüm gölgeler GD güneşinden.
3. **PARIS-CATI** (KE-PK-S1): Haussmann **sonrası** (Blanc SOKAK kiti yanlış dönem); düzensizlik kuralı **geçerli değil**, bulvar/cephe ritmi tekdüze olabilir [G]; Sacré-Cœur ve Eyfel **yok**. Kümes çatıda (§4.4); baca kümeleri cephe renginde (kırmızı tuğla yok). P01 f0 kompozisyonu P11 son karesi ile birebir (kümes + kuyruk + kılıf, cs 3.2).
4. **MONTMARTRE:** meydan + gök + sepet kenarı; sepet halatı balon küresinin ağına bağlanır (§4.1). Kış ağaçları çıplak, kar yok.
5. **DAGRON-INSERT:** masa (tepe-önden), terazi + kutu + şerit; Tours masası = aynı masa, farklı prop kümesi (şerit yığını); kafes + sepet kesiti (P04b). Mevcut MASA-INSERT masası/KolEl kullanılırsa **el tipi sepya manşet ve ten `#c9a58a`** override (kitte `ceket/gomlek/parisManset/gorevli` tipleri var: kurulum ekibi hangisi uygun?).
6. **LANTERN-ODA:** karanlık oda, tek ışık huzme, perde = badanalı duvar, memur masaları, kapı; oda yeri/binası nötr [A §9].
7. Pencere ışığı **turuncu değil** soluk krem; gece/alacakaranlıkta bile kehribar yok.

---

## 10. Motion/kit için tasarım → kit_eksik eşlemesi
| Tasarım bölümü | KE kimliği |
|---|---|
| §3.1 kompars siluet seti | KE-PK-F1 |
| §3.2 Dagron sırt + manşetli el | KE-PK-F2 |
| §4.1 balon, sepet, torbalar | KE-PK-N1 |
| §4.2–4.4 güvercin, kafes, kümes | KE-PK-N2 |
| §2 kılıf + film + ip | KE-PK-N3 |
| §4.5–4.7 terazi, kutu, sayfa/şerit | KE-PK-N4 |
| §4.9 lantern, levha, perde | KE-PK-N5 |
| §4.7, §4.10 zarf, çuval, yazı yığını | KE-PK-N6 |
| §4.8 sandık | KE-PK-S2 (+J1) |
| §5 darbe | KE-PK-E1 |
| §6 halka, tel, kalabalık, ikonlar | KE-PK-H1…H5 |
Rig ihtiyaçları: **Kukla kullanılmaz.** `iğne başı` ve `darbe` kit varsayılanlarına override. Güvercin 4-poz kanat döngüsü + gövde dönüşü (yön arama) tek bileşen; balon morfu (yığın → küre) ve çökme morfu aynı küre bileşeninin iki yönü.

---

## 11. Kalibrasyon: öncelikli 3 kare (riske göre; eleştirmen + betik)
| # | Kare | Neden | Bakılacaklar |
|---|---|---|---|
| **K1** | **P01 f24** (alacakaranlık; kuyruk + kılıf cs 3.2'den geri çekilmeye başlar) ↔ **P11 son kare** (yan yana) | İmza + döngü + alacakaranlık paleti + siluet + kümes | kılıf `#F0B43C` render'da ΔE ≤ 10; imza bandı yalnız kılıfta · kılıf 360 px'te "kapsül" okunur · pırıltı tek hilal, yıldız/hale yok · pencere ışığı krem, turuncu değil · pencere siluetleri 5 adet, yüzsüz · kümes iniş tahtası okunur · P01/P11 ekran noktası ±6 px aynı · kırmızı piksel 0 · alt üçte bir dolu (baca/çatı) |
| **K2** | **P07 f200** (balast torbası atılır, sepet bel plan) ve **P07 f112** (isabet + çöküş) | Balon + sepet + torba + darbe diliyle gravür | darbe turuncu/sarı içermez, radyal yıldız yok · delinme/yırtık okunur · gri-kül duman tırtıklı 2 ton · torba %12, sepet hasırı dikey kamış, kafes/tel örgü okunmaz · balon kış gökünden kontur ve terminatörle ayrışır (360 px) · ağ tel örgü okunmaz · tarama 360 px'te görünür, radyal değil |
| **K3** | **P05 f280** (şerit + parmak, ölçü karesi) ve **P10 f238** (perde net, satırlar) | Dagron eli, kutu, şerit, lantern/perde, dil-nötr satır | sepya manşet vs Paris eli gri manşet 360 px'te ayrışır · el ten ΔE ≥ 15 · şerit 52°, 280 px · satırlar harf olarak okunmaz (1080 ve 360) · huzme kenarı net, kireç beyazı · terazi/lantern/mercek çerçevesi sarı metal değil |

---

## 12. Kullanıcıya açık sorular (varsayılan seçildi, açıkça yazıldı)

1. **"Parmak boyu" ölçü çelişkisi.** Senaryo "parmak boyuna küçültmek" der; kaynakta film ≤ 40 mm (3–4 cm) [A]. İşaret parmağı ≈ 7–8 cm olduğundan gerçek şerit parmağın yaklaşık yarısıdır. **Varsayılan:** şerit ×1.6 stilize (6.4 cm), parmağın ≈ %85'i, "parmak boyu" okunur; bölümde sabit. Alternatif: gerçek ölçü (parmağın yarısı) ya da senaryoda "parmak boyunda" yerine "bir tırnak boyunda/küçük". Onay?
2. **Kılıf stilize ×1.6** ve bal kehribarı "yarı saydam" çizimi opak katmanlarla (alfa değil). Kılıfın malzemesi (kaz tüyü/metal) hiçbir yerde adlandırılmaz. Onay?
3. **Balonun biçimi, rengi, ağı, sepeti [G]** ve **kümes**, **kafes**, **magic lantern gövdesi** kaynaksız; nötr çizildi. Araştırmacıdan dönem gravürüyle (Gallica/Commons Ville d'Orléans, Old Book Illustrations "Gare d'Orléans atölyesi") doğrulama istenebilir (Wikimedia 429 veriyor). **Varsayılan:** nötr ile devam, doğrulama gelirse güncelle. Arşiv görseli bu aşamada indirilmedi, `varliklar.md` açılmadı.
4. **P07 "kısa alev".** `dokunuslar.md` D3 turuncu alev göstermemeyi ve yalnız duman çizgisini söylüyordu; sizin brifte "kısa alev" vardı. **Varsayılan:** kâğıt-krem, mürekkep konturlu çok kısa (≤ 10 kare) parlama + gri-kül duman; ateş topu/yangın yok, silah gösterilmez. Daha da sade (yalnız delinme + duman) istenirse parlama çıkar.
5. **HARİTA iğne başı pirinç yerine mürekkep siyahı** (sarı metal imzayı çoğaltmasın). Kit varsayılanını bu bölüm için override etmek uygun mu? (Kodu okumadım; motion parametre bulamazsa `kit_eksik`.)
6. **Kompars "asker" = omuzda çubuk** ve kıyafet/başlık yok (kanıtsız ⇒ nötr). P02'de "aile, asker, çocuk" ayrımı yalnız boy ve çubukla okunacak; yeterli mi?
7. **Dagron başlıksız** (şapka kaynaksız). Sepete binerken kış başı açık görünüm kabul mü?
8. **P05 film kenarı bal rengi** senaryo notu uygulanmadı (yönetmenle aynı karar): imza yalnız kılıfta.

**Sonraki ajana (mekân sorumlusu):** `mekanlar.md` §9'daki noktalar; sarı metal ve kırmızı yasakları mekân paletine de uygulanır; PARIS-CATI doku/ayrıntı için dönem gravürü referansı gerekli ve Haussmann sonrası kuralları araştırmacı doğrulamasıyla kesinleştirilmeli.

---

## 13. Görsel dil revizyonu (tur-4) — 2026-11-12

Girdi: `notlar/tur-4.md` (kullanıcı: "kuş planı çok soğuk, estetik yok", "çatı kötü gözüküyor" + orkestra teşhisi + A2 zayıf noktaları), A2 kareleri (P01 f000/f024/f370). Spesifikasyondur, kod/görsel değil. Hex'ler elle Lab tahminiyle kontrol edildi (±3); motion `renk_olcum.py` ve eleştirmen render'da doğrular. **§0.2, §1.2, §2.4 (b\* kuralı), §4.2 (renk/tür işareti), §4.4 (kümes rengi) ile çelişen yerlerde §13 geçerlidir.** Kapsam: alacakaranlık (P01, P11 son, P10a kümes) + kümes ahşabı gün saatinde. Kış günü planları (P03, P06, P07) paletine dokunulmadı.

### 13.0 Teşhis → karar
| Teşhis | Karar |
|---|---|
| Tek renk ailesi | Sıcak–soğuk karşıtlık: gölge mavi-mor, ışık gül-altın (§13.1) |
| Işık yok | Tek kaynak batan güneş, kenar ışığı + uzun gölge + sıcak pencere (§13.4) |
| Derinlik yok | Kuş planında flu arka çatı denizi; geniş planda 5 katman (§13.6) |
| Doku yok | Kâğıt + gravür taraması 360 px'te görünür, en fazla 3 katman (§13.5) |
| Çatı boş zemin + dev baca kutusu | Yüksek bakış, çatı denizi, baca külahı sıraları, lucarne, ışıklı pencere, ince duman, Panthéon (§13.6) |

### 13.1 Alacakaranlık paleti v2 (P01, P11 son, P10a)
| Ad | Hex | Not |
|---|---|---|
| gök: tepe / üst / orta / alt / ufuk | `#2b2f5c` / `#4d4a80` / `#7d6a95` / `#b98a9e` / `#e6b5a0` | 5 düz basamak (§13.5 geçiş); **güneş diski çizilmez**, sağ-arkada ufukta `#f0cdb4` iki eş merkezli düz parıltı halkası (α .55 / .30), turuncu yok |
| çatı denizi, arkadan öne | `#a98aa0` (uzak) · `#8d7899` · `#6d6384` · `#4e4a68` · `#2f2d46` (en yakın siluet) | atmosfer: uzak açık ve düşük kontrast, yakın koyu ve kontrastlı |
| mansard arduvaz-çinko ışık / gölge | `#6d6384` / `#3e3b5c` | mavi-mor |
| krem taş cephe (güneşe sırtı, gölge) / sağ kenar ışığı | `#6f6684` / `#d9a995` | cephe çoğunlukla kontrajur gölgede |
| baca külahı ışık / gölge | `#8a6458` / `#4f4347` | soluk toprak, C\* ≤ 18, kırmızı değil |
| pencere ışığı (içten) | `#f0d2b8` | şeftali-krem; çevresine `#e6b5a0` α .22 havuz |
| pencere kasası / korkuluk | `#3a3550` / `#2f2d46` | |
| **kenar ışığı** (çatı, kümes, kuş; sağ-üst yüz) | `#e6b5a0` | 2–3 px |
| **kümes ahşabı** (yıpranmış sıcak kahve) ışık kenar / orta / gölge / damar | `#b58a6c` / `#7e5a48` / `#4a3844` / `#3a2c36` | gün saatinde (P10a): `#a8805f` / `#8c6d56` / `#5a4638` |
| kümes çatısı (çinko) | `#5c5a7a`, sağ kenar `#e6b5a0` | |
| teras çinko (kenet çizgileri) | `#5b5878` / çizgi `#3e3b5c` / sağ kenar ışığı `#c9a0a6` | |
| **güvercin** gövde orta / gölge / karın / kanat ucu | `#8a8796` / `#5b5870` / `#b3aab0` / `#43415a` | güvercin grisi, hafif mor-gri |
| güvercin kenar ışığı (sırt, kanat üstü, kuyruk uçları; sağ-üst) | `#e6b5a0` | 2–3 px |
| boyun yanardönerliği | yeşil `#5f7f72` + mor `#8a6c96` | yalnız boyun yan şeridi, iki leke; C\* ≤ 22 |
| ayak / gaga / göz | `#7a5a66` (mor-gül, kırmızı değil) / `#4f4b4f` / `#14120f` tek nokta | iris ve turuncu halka yok |
| gölge rengi (genel) | zemin tonunun %65'i, **mavi-mor** kaydırılmış (`#3e3b5c` civarı) | gün batımında gölge soğuk, ışık sıcak |
Arşiv derecelendirmesi (`geceLapis`) gök gülünü grileştirmeyecek: ölçüm gök alt/ufuk C\* ≥ hedefin %85'i. (Evliya K1 dersi.)

### 13.2 Kuş (P01 kanca)
- Rim ışığı: batan güneş sağ-arkada, kuş sağa bakıyor ⇒ sırt/kanat üstü/kuyruk uçlarında 2–3 px sıcak kenar çizgisi; gövde ön yüzü mavi-mor gölge tonunda, karın biraz açık (gökten yansıma `#b3aab0`).
- Boyun: yeşil-mor yanardönerlik, iki leke, düz dolgu (gradyan yok). **Yanardönerlik tür iddiası değil**, hâlâ çizilmez: iki koyu kanat çubuğu, beyaz kuyruk bandı, turuncu göz.
- **Kompozisyon (kullanıcı notu, A2 zayıf nokta 1):** kuşun başı **tamamen kadrajda ve üst UI bandının (y ≥ 220) altında**, baş üstü ile kadraj üst kenarı arasında ≥ 80 px boşluk; kuş gaga-kuyruk ayağa kadar ekrana sığar. Kılıf ekran köşegeninin ≥ %10'u (≥ 190 px), P01 f0 ↔ P11 son aynı kare.
- **Arka plan:** kuşun arkası düz kümes duvarı değil. Kuş iniş tahtasının **sağ ucunda**; kümes ön yüzü kadrajın solunda ~%40'ta biter; kuşun sağ-üst arkası açık gök + flu çatı denizi (§13.6). Bu kamera/dekor değişikliğidir (kümes ön yüzü genişliği, kamera cx): hedef görsel onaylanırsa mekân sorumlusu/yönetmen ölçer.

### 13.3 Kılıf tekliği: ton yasağı yerine doygunluk + parlaklık
Kılıf `#F0B43C` değişmez (L\* 77, C\* ≈ 67, h ≈ 80°). Sahnede artık sıcak tonlar (gül, şeftali, kahve) var; imza bu yüzden **ton yerine nicelikle** ayrılır:
| Ölçüt | Sahne (kılıf dışı) | Kılıf |
|---|---|---|
| Kroma C\* | **≤ 28** (kenar ışığı ≈ 23, pencere ≈ 19, ahşap ışık kenarı ≈ 24) | ≥ 60 (hedef 67) |
| Parlaklık L\* tavanı | **≤ 88** (ufuk parıltısı, pencere) | spekülar hilal `#FFF3CC` L\* ≈ 96 |
| Ton (hue) | ışık/pencere/kenar 45–70° (gül-şeftali) | 80° ± 12° |
- Kural: **kılıf dışında C\* > 32 piksel yok** (anti-alias payı %0.5), imza bandı (hue 68–92°, C\* > 40, L\* 60–90) yalnız kılıf kutusunda. Eski "b\* > 26 ve L\* > 55" kuralı bu kuralla değişir (daha sıkı değil, doygunluğa bağlı).
- "Kılıf en sıcak piksel" yerine: **kılıf sahnenin en doygun ve en parlak (spekülar) tek noktasıdır.** Eleştirmen betiği: kılıf C\* ≥ 2.3 × sahne maksimumu.
- Kılıf çevresine hale/ışık havuzu/kıvılcım hâlâ yok (§2.3); kılıf yalnız sağ-üst kenarda `#FBE3A0` kenar ışığı alır.

### 13.4 Eski yasaklardan hangisi gevşer, hangisi kalır
| Yasak | Karar | Yeni sınır |
|---|---|---|
| §0.2 "soğuk, düşük doygunluk" tek aile | **GEVŞER** | sıcak–soğuk karşıtlık; sahne C\* ≤ 28 |
| §1.2 pencere ışığı "soluk krem, turuncu değil" | **GEVŞER (kısmen)** | şeftali-krem `#f0d2b8`, C\* ≤ 22, hue 45–70°; **turuncu/kehribar hâlâ yok** |
| ahşap / kenar ışığı b\* ≤ 14–15 | **GEVŞER** | b\* ≤ 24 (C\* ≤ 28) |
| §4.2 yeşil-mor boyun çizilmez | **GEVŞER (kısmen)** | yalnız boyun yanardönerliği, C\* ≤ 22; kanat çubuğu / beyaz kuyruk bandı / turuncu göz **kalır** |
| §0.2/mekanlar "gök 3 düz basamak, gradyan yok" | **GEVŞER** | 5 basamak + tarama/tane geçişi (§13.5); CSS yumuşak gradyan **hâlâ yok** |
| "Kılıf en sıcak piksel" | **DEĞİŞİR** | en doygun + en parlak (§13.3) |
| Sarı/altın/pirinç/bakır **metal** (terazi, lantern, mercek, iğne, kilit, halka, kandil) | **KALIR** | ışık metale sıcak kenar verebilir (≤ C\* 23), metalin kendi rengi koyu çelik/çinko |
| Kehribar/bal/altın mühür, balmumu, ip, sepet kenarı | **KALIR** | |
| Güneş diski, turuncu alev | **KALIR** | disk çizilmez, yalnız parıltı halkası |
| Görüntüde kırmızı (mühür, bayrak, tuğla, ayak) | **KALIR** | gül/mauve tonlar C\* < 30 ve kırmızı betik bandı (C\* > 30, h 340–40°) 0 |
| Kanal `gold #b8862b` görüntüde yok | **KALIR** | |
| Sokak/gaz lambası, kar, sis, bulut | **KALIR** | gök yalnız düz bantlar |
Net özet: **gevşeyen = renk ailesi, ışık/pencere/ahşap sıcaklığı, gök basamağı, boyun yanardönerliği; kalan = metal, mühür/bayrak/kırmızı, güneş diski, alev, bal/kehribar nesneler, gold.**

### 13.5 Doku (en fazla 3 katman, 360 px'te görünür)
1. **Taban deseni:** tahta damarı + derz (kümes), çinko kenet çizgisi, arduvaz sırası, taş sırası.
2. **Gravür taraması:** yalnız ışığın mimariyi anlattığı yerde (korniş altı, lucarne yanağı, baca gölge yüzü, kümes saçak altı, iniş tahtası alt yüzü, kuşun gölge tarafında kısa 3–5 çizgi). Çizgi ≥ 2.5 px (1080 tabanı), aralık 7 px, renk gölge tonunun %60 koyusu **mor tonlu** (`#2f2d46` ailesi), açı tek (72°). Geniş yüzeyde tarama/kafes yok.
3. **Kâğıt + litografi grenı:** `paper #e9dfc9` multiply α .12–.16, lif uzunluğu ≥ 24 px, 6–10 adet soluk leke (ø 20–60 px, α .06), kenarlarda hafif koyulaşma. Seed sabit.
- **Gök geçişi (litografi):** basamak sınırlarında 2–3 ince yatay çizgi + tane (stipple) geçişi; yumuşak gradyan değil. Bu, 2. katmandan sayılır.
- **Renkli kontur:** `ink(dolgu)` = dolgunun %55 koyusu **kendi tonunda** (mor/kahve), siyah kontur değil (§0.3 ile uyumlu).
- 360 px kontrolü (öneri eşik, eleştirmen/betik): 40×40 px gök örneğinde L\* std ≥ 1.2; tarama çizgisi 360'ta ≥ 0.8 px.

### 13.6 Derinlik ve çatı denizi
**Kuş planı (P01 f0, cs ≥ 2.4):** kuş ve kümes keskin, kontur tam. Arka plan "odak dışı" (vektörde): konturlar kalkar, kenar yumuşatma σ ≈ 7 px (1080 tabanı), pencere ışıkları 3–4 yumuşak disk (ø 16–28 px, `#f0d2b8`), 1–2 ince duman şeridi, ufukta Panthéon kubbesi çok silik. Atmosfer: arka tonlar açık ve düşük kontrast (`#a98aa0`, `#8d7899`), kuş koyu-sıcak kenarla önde okunur. Kuşun arkası düz yüzey olmaz.

**Geniş plan (P01 kapanış, f370):** kamera **yüksek bakış**: göz teras üstü 1.0 m → **≥ 3.5 m** (kümes ve baca üstü, hafif aşağı eğik), ufuk kadrajın ≈ %33'ünde (y ≈ 630) [T; mekân sorumlusu fiziksel tutarlılığı doğrular]. Çatı denizi 5 katman, arkadan öne:
| Kat | d (Z/Z_k) | İçerik | Ton / ayrıntı |
|---|---|---|---|
| K1 | ≥ 40 | uzak sırt + **Panthéon kubbesi** (haçsız, yaldızsız siluet; güneş parıltısı önünde koyu) | `#a98aa0`, kontursuz |
| K2 | 25–40 | mansard silueti + baca külahı tarağı | `#8d7899`, kontursuz |
| K3 | 15–25 | lucarne sırası, 5–6 ışıklı pencere, 2–3 ince duman şeridi | `#6d6384`, 3 px kontur |
| K4 | 8–12 | karşı bina: korniş, lucarne (beşik çatılı), baca kümesi + külah sırası, sağ kenar ışığı, tarama | `#4e4a68`, 4 px kontur |
| K5 | 3–5 | kendi terasımız, kenet çizgileri, **yem/su teknesi**, kümes, **sağ baca (Z 4.4)** | `#2f2d46` siluet + kenar ışığı |
- Duman: ince, seyrek (2–3 baca), gri-mor `#8d7899`, çözülerek biter (fade değil, kümeler küçülür). Kuşatma kışında yakacak kıtlığı olabilir [G, doğrulanmalı] ⇒ pencerelerin hepsi yanmaz (≈ %35).
- **Dev özelliksiz baca kutusu yok:** ön baca da külah sırası, korniş bandı, tarama ve kenar ışığı taşır ya da kadraj dışında kalır. Yem/su teknesi ve sağ baca (kullanıcı kapsamında) çatı denizinin K5 katmanı olarak kalır; sağ baca K1–K3 üstünü örtmez, Panthéon (x ≈ 820) görünür kalır.
- Alt üçte bir: kenet çizgileri VP'ye yakınsar, tekne, uzun gölgeler, zemin ışığı (sol-önde gül-altın leke) ⇒ ölü alan yok.

### 13.7 Işık (tek kaynak)
- **Kaynak:** batan güneş, kadrajda **sağ, derinlikte (ufukta)**: mekanlar §0.6'daki "43° sağda, önde" ile aynı yön; "sağ-arka" = sahnenin derinliği, kontrajur. Yükseklik ≈ 3–5° [T].
- Kenar ışığı sağ-üst yüzlerde (`#e6b5a0`, 2–3 px); ön yüzler mavi-mor gölgede; gölgeler **sola ve kameraya** uzun düşer (gerçek boy ≈ 11×; kadraja sığması için çizimde ≤ 6× [T, abartı]); kuşun gölgesi iniş tahtasına.
- Pencere ışıkları ikincil: yalnız kendi çevrelerine α .22 havuz, gölge vermez. Kılıf ışık yaymaz.
- Gök parıltısı, kenar ışığı yönü, gölge yönü **tek vektörden** (`ISIK_YON` alacakaranlık değerini 243° batış ile hizala).

### 13.8 P10 Paris eli (A2 zayıf nokta 2)
- **Oran:** el bilekten parmak ucuna **0.18–0.19 m**, kuş gövdesi 0.32 m ⇒ el kuşa göre gerçek oranda (≈ kuş gövdesinin %58'i). A2'de el iri ve başparmak uzundu; kılıf ×1.6 (7.2 cm) elin boyunun ≈ %38'i olur, kıstırma açıklığı buna uyar.
- **Kıstırma:** başparmak ucu + işaret parmağı ucu kılıfa/ipe **gerçekten değer** (çizimde yüzeyler kesişir, temas gölgesi), diğer parmaklar avuca kıvrık, başparmak işaret parmağının ≈ %80'i kadar (A2'deki uzun başparmak düzelir). Temas karesi `kontrol_kare`.
- **Renk (yeni palet):** ten ışık `#d6b49c` · gölge `#8f7360` · kenar ışığı `#e6b5a0` 2 px (sağ-üst) · manşet `#5d5f63` (kömür-gri, kalır). Ten C\* ≤ 28; kılıfa ΔE76 ≥ 15 (≈ 45) korunur. Pencere/gün batımı kenar ışığı ele kehribar olarak okunmaz.

### 13.9 [G] / doğrulanmalı (araştırmacıya)
1. Panthéon kubbesinin bu çatıdan GGB yönünde görünürlüğü ve 1870'te tepesindeki haç durumu (kilise hâli) ⇒ nötr siluet.
2. Kuşatma kışında baca dumanı/pencere ışığı yoğunluğu (yakacak, aydınlatma kıtlığı).
3. Boyun yanardönerliği: ev/posta güvercini için genel bilgi [G güvenli]; cins kaynaksız ⇒ tür işareti sayılmaz, hafif tutuldu.
4. Çatı güvercinliğinin biçimi (zaten [G]).

### 13.10 Devir (tek sahiplik; ben yalnız tasarim.md)
- **Mekân sorumlusu:** `mekanlar.md` §0.3 (gradyan yasağı istisnası, gök 5 basamak), §1.2 palet hex'leri, §1.4 katman tablosu (K1–K5, göz yüksekliği, kümes ön yüz genişliği), ArsivKatmani modu renk korunumu.
- **Motion:** `catiDekor.tsx` palet, kenar ışığı, flu arka plan, çatı denizi katmanları; Guvercin boyun/kenar ışığı; KolEl parisGri ton + oran + kıstırma. Önce hedef görsel (Gemini) onayı.
- **Yönetmen:** P01 f0 kamera (baş kadrajda, kılıf ≥ %10), P01 kapanış yüksek bakış.
- **Eleştirmen betiği:** §13.3 ölçütleri (C\* > 32 kılıf dışı 0, kılıf C\* ≥ 2.3 × sahne maks., L\* tavanı, kırmızı bandı 0).
- Hedef görsel promptları: `hedef/prompt-kus.txt`, `hedef/prompt-cati.txt`.

---

## 14. Sabah dili (kış sabahı, Montmartre) — 2026-11-12 (tur-7)

Girdi: `notlar/tur-4..7.md` (kullanıcı: alacakaranlık yönü beğenildi, A turundaki soğuk/estetiksiz görünüm reddedildi), §13 (ilkeler), mekanlar §0.6 + §2 (MONTMARTRE) + §1v2.8 (P10a ışığı), `hedef/hedef-kus.png`, `hedef/hedef-cati.png`. Spesifikasyondur, kod/görsel değil. Hex'ler elle Lab ile kontrol edildi (±3; L\*/C\* sütunları); motion `renk_olcum.py` ve eleştirmen render'da doğrular. **§0.2, §1.1 (hava satırı), §1.3, §1.7 (kış gökü/krem taş/balon satırları), §4.1 (balon renkleri), §4.8 (sandık rengi), §5 (darbe renkleri), mekanlar §2.7 hex'leri ve mekanlar §1v2.9 "P10a v1 gün paleti" ile çelişen yerlerde §14 geçerlidir.** Kapsam: P03 `meydan`, P06 (meydan sahnesi = `yukleme`; P06a HARİTA ise kâğıt paleti değişmez), P07 `gok` + `sepet`, P10a (PARIS-CATI gün). Alacakaranlık (§13) değişmedi.

### 14.0 Teşhis → karar
| A turu (§1.3) | Karar |
|---|---|
| Gök 3 düz gri basamak (`#8d9aa6/#aab4bc/#d4d2c8`), taş `#d8cdb4` b\* ≤ 14, "sıcak gölge yok": tek renk ailesi, güneş yok sayılmış | Sıcak–soğuk karşıtlık: **ışık alan yüz gül-krem, gölge yüzü mavi-mor, gök temiz kış mavisi, ufuk şeftali-gül** (§13'ün sabah karşılığı) |
| Balon krem `#d9d0b8` düz gri-sarımsı, gölge `#b3a98f`: gökten ayrışmıyor, "kirli" | Balon üç düz basamak + vernik hilali + mor tonlu terminatör taraması; sıcak ışık yüzü, soğuk gölge |
| Derinlik yok: Paris `#a9adb0` düz bant | 3 katman hava perspektifi (açık, düşük kontrast, kontursuz) |
| Doku yok | §13.5 aynen: ≤ 3 katman, mor tonlu tarama, kâğıt + litografi grenı, gök geçiş çizgileri |

### 14.1 Işık (tek kaynak, tek vektör)
| Öğe | Değer |
|---|---|
| Kaynak | Alçak kış güneşi, azimut ≈ 135° (GD), yükseklik ≈ 12° [T, §1.1/G16; 12 Kasım enlem 49° için ikinci elle hesap: azimut 135.9°, yükseklik 12° ⇒ 08:58 güneş saati]. Gölge boyu **gerçek 4.7 × yükseklik**; §13'teki gibi kısaltma/abartı gerekmez |
| `meydan`, `yukleme`, `gok`, `sepet` (kamera güneye, 180°) | Güneş **45° solda, önde**; F 1500'de yatay görüş ≈ 39.5° ⇒ **güneş kadraj dışında**: disk yok, hale yok, ışın yok. Gök yalnız sol alt ufukta **ışıma** taşır (14.2). `ISIK_YON.gunMontmartre` (ışığa doğru) = **(−0.692, 0.208, 0.692)**; zemin gölge yönü (−1 ile) sağ-kameraya, ekranda (+0.9, +0.25) (mekanlar §2.2) |
| Işık alan yüzler | **Sola (doğuya) bakan** dikey yüzler ve **yukarı bakan** yüzler (zemin, sepet kenarı üstü, sandık kapağı, çatı sırtı). Sağdaki yan evin meydana bakan sol duvarı ışıkta; solundaki evin iç duvarı (batıya bakar) gölgede |
| Gölgede kalan | **Kameraya (kuzeye) bakan her yüz**: balonun gövdesi, sepet ön yüzü, ev cepheleri, kalabalık. Bu yüzler çok koyulaşmaz: berrak sabah göğünün mavi dolgu ışığını alır ⇒ açık mavi-mor (14.2 gölge ailesi) |
| Balon (küre) | Gerçekte güneş kenarda-arkada ⇒ ince hilal (≈ %15). Çizimde **sol-üst ≈ %35 ışık yüzü**, onu terminatör bandı, geri kalanı gölge gövde [T, bilinçli abartı: balonun gül-krem okunması ve gökten ayrışması için; §13.7'deki gölge kısaltmasıyla aynı mantık] |
| Kenar ışığı | Siluetlerin **sol ve üst** kenarlarında `#f0c4a8` 2–3 px (kalabalık, ağaç, yan ev köşeleri, sepet, halat, balon konturunun sol yayı). Alacakaranlık kenarı `#e6b5a0`'dan bir ton açık (doğrudan güneş) |
| P10a (PARIS-CATI gün, kamera 230°) | Güneş **95° solda, hafif arkada**: `ISIK_YON.gun` (−0.974, 0.208, −0.085), mekanlar §1v2.8 aynen. Kümes ön yüzü gölgede, **sol yan yüzü ve iniş tahtası üstü ışıkta**; kuş/kılıf/el soldan yan ışık; gölgeler sağa 4.7×. Gök güneşin **tersinde**: sıcak ışıma yok, daha derin ve soğuk (14.2 P10a satırı) |
| Pencereler | Gündüz **iç ışık yok**: cam gök yansıtır (`#7f90ab`); yalnız güneşe dönük 2–3 pencerede küçük güneş parıltısı `#f0d4bc`. Gerekçe: gündüz iç lamba okunmaz; kuşatma yakacak kıtlığı [G, doğrulanmalı]. Pencere havuzu ve gece-gündüz karışması yok |

### 14.2 Sabah paleti
Genel: kılıf dışı **C\* ≤ 28** (en yüksek bölge: ahşap/hasır ışık yüzü ≈ 20–25), **L\* ≤ 88**; C\* ≥ 22 olan sıcak yüzeylerde ton (hue) **45–72°** (gül-şeftali), 74°'ten sarıya kayan hiçbir yüzey yok. Kontur = dolgunun %55 koyusu **kendi tonunda** (ışık yüzünde kahve-gül, gölgede mor); saf siyah/beyaz yok.

**Gök (meydan / yukleme / gok / sepet)** — 5 düz basamak, ufuk basamak oranı korunarak kamera ufkuna ölçeklenir (`gok`'ta ufuk y 760, mekanlar §2.5); yumuşak gradyan yok, sınırlarda litografi geçişi (§13.5: 3 ince çizgi + stipple)
| Basamak | Dekor y (meydan) | Hex | L\* / C\* |
|---|---|---|---|
| tepe | 0–420 | `#6f86ad` | 56 / 23 |
| üst | 420–760 | `#8fa3c0` | 66 / 17 |
| orta | 760–1000 | `#a9b7cc` | 74 / 12 |
| alt | 1000–1180 | `#cdc6d0` | 81 / 6 |
| ufuk | 1180–1300 | `#f0d0bc` | 86 / 16 (h 60°) |
| **sol ışıma** (yalnız x < %45, ufuk basamağı + üstündeki 60 px, kenarı düz) | — | `#f2c9b2` | 84 / 20 (h 56°) |
Balon ışık yüzü gök orta ile ΔL ≈ 9, alt ile ≈ 2: **balonun alt %25'i ara ton/yansıma olduğundan** sorun çıkmaz, yine de ölçümde balon konturu ile alt basamak ΔL ≥ 8 şart; yetmezse alt basamak `#c5bfcc`'ye koyulaşır.

**Paris (meydan: ince çatı bandı; `gok`/`sepet`: havadan)** — hava perspektifi buğusu (düz katmanlar, kontursuz uzakta)
| Ad | Hex | Not |
|---|---|---|
| uzak buğu bandı (D > 1500 m / meydanda en uzak) | `#dccfcf` | ufuk basamağına karışır, L\* 84 |
| orta bant (D 600–1500) | `#b0a6c0` | kontursuz |
| yakın çatı silueti / baca tarağı | `#8d85a6` / `#7a7394` | meydanda 3 px kontur yok, ≤ 8 px tarak |
| ışık alan çatı yüzleri (sola bakan) | `#d8b8a4` | 1–2 px ince, kümelenmez (77 / 17) |
| blok krem ışık yüzü / gölge yüzü (havadan, `gok` `sepet`) | `#e0c8b2` / `#9a92ae` | tek blok başına seed'li ±3 L\* |
| mansard çatı havadan ışık / gölge | `#a89fbe` / `#7a7394` | |
| bulvar zemini + ağaç gölgesi | `#d3bba6` / `#9a92ae` | iki sıra çıplak ağaç noktası `#6a6280` |
| baca dumanı (1–2 ince şerit) | `#c3bccd` | çözülerek biter, bulut okutmaz (14.4) |

**Taş, sıva, çatı, zemin, ağaç (MONTMARTRE)**
| Ad | Hex | L\* / C\* | Not |
|---|---|---|---|
| yan ev sıva, ışık yüzü (sağ evin sol duvarı) | `#e8d0ba` | 85 / 17 | h 65°; [G] sıva rengi kaynaksız, nötr sıcak krem |
| yan ev sıva, gölge yüzü (cephe) | `#a39cb6` | 66 / 15 | mavi dolgu ışığı |
| derin gölge (saçak altı, söve, pencere içi) | `#7a7394` | 49 / 17 | II tarama burada |
| pencere camı / güneş parıltısı | `#7f90ab` / `#f0d4bc` | — | iç ışık yok |
| kırma çatı: kuzey eğimi (gölge) / mahya sol kenarı | `#6d6384` / `#f0c4a8` | 44 / 20 | malzeme adı yok |
| meydan toprağı, ışık alan | `#c8ae98` | 73 / 16 (h 67°) | tek ton + stipple tane |
| gölge yeri (uzun gölgeler, tekerlek izi içi) | `#8f8aa8` / iz içi `#a8949a` | 59 / 17 | gölge kenarı net, gradyan yok; "soğuk toprak" kırağı okutur, kırağı iddiası yok |
| çakıl | `#d6c1ae` | | 40 nokta (mekanlar §2.7), gölge yarısı `#8f8aa8` |
| çıplak ağaç (gövde + dallar) / sol kenar ışığı | `#5f5470` / `#f0c4a8` α .8 | | uzak ⇒ kontursuz; ağaç balonun arkasında (Z 28 > 16.7) |
| kompars siluet (kalabalık, yükleyici, Dagron dışı) | `#45405a` ±3 L\* seed'li, sol kenar ışığı `#f0c4a8` 2 px | 29 / 17 | yüzsüz, aksesuar yok (§3.0); uzun gölge `#8f8aa8` sağ-kameraya 480–600 px |
Dagron (P06 sırt) gövde iki tonu `#4f4a44/#2e2a26` → `#5a5068` (ışık yanı, sol) / `#3a3550` (gölge); sepya manşet ve ten §3.2 aynen (sepya `#4a3a2c`, ten `#c9a58a` + sol kenar `#f0c4a8`).

**Balon kumaşı (N1)** — kaynaksız biçim/renk nötr (pamuk + vernik [A]; küre, ağ [G]); renk "kirli krem" **değil, sıcak ışıkta gül-krem**; yama, şerit, panel, yazı, bayrak, arma **yok** (Blanc dersi)
| Yüz | Hex | L\* / C\* | Not |
|---|---|---|---|
| ışık yüzü (sol-üst ≈ %35) | `#e6c9b4` | 83 / 16 (h 63°) | |
| vernik hilali (ışık yüzünde tek ince hilal) | `#ecd9c2` | 88 / 16 | tek sert hilal, yıldız/hale yok |
| terminatör bandı (tarama) | `#c9b0ac` + tarama `#4d4a6e` | 74 / 10 | **mor tonlu** çizgi ≥ 2 px, aralık 7, açı 78° (mekanlar §0.5), yalnız bu bantta |
| gölge gövde | `#8f8aa8` | 59 / 17 | açık mavi-mor (gök dolgusu) |
| yer yansıması (alt 2–3 şerit, balon gökte değilken) | `#b59ea2` | | alt yarıda ince bant; `gok`'ta yok |
| kontur | ışık yüzünde `#9a7f78` / gölgede `#4d4a6e` | | 3–4 px, kendi tonunda |
| ağ (9–11 meridyen + 4 paralel, 2.5 px, göz ≥ 60 px) | ışıkta `#a88f86` seyrek / gölgede `#4e4560` belirgin | | geniş kafes/tel örgü okunmaz (§4.1 aynen) |
| halka (alt) / halat / halat gölgesi | `#5a4e5a` / `#b59e84` / `#6a5a62` | | halat sol kenarı `#f0c4a8` 1 px |
| gaz hortumu / çıkış puf | `#4a4560` / `#d8d2dc` | | puf soğuk beyaz-lila, alev/kıvılcım yok; sol kenar ışığı |
Yarı şişmiş durum (P03 f0–104): üst yarı pürüzsüz küre (ışık yüzü + terminatör), alt yarı **gölge ailesinde ağır kıvrımlar** (kıvrım çizgisi `#4d4a6e`, 9 → 0); şişince terminatör bandı aşağı iner. Kumaş çökerken (P07) aynı palet, çökme meridyenleri gölge ailesinde.

**Hasır sepet, sandık, kum torbası, posta çuvalı**
| Ad | Hex | L\* / C\* | Not |
|---|---|---|---|
| hasır ışık yüzü (sol yan + rim üstü) | `#b89677` | 64 / 23 (h 68°) | kamış ışık kenarı `#c9a98a` (71 / 23) |
| hasır gölge (ön yüz) | `#6e5a56` | 40 / 10 | **düz koyu bant** (tarama yerine, mekanlar §0.5); dikey kamış + 2 sarma kuşağı, çapraz örgü yok |
| sepet kenar bandı | `#4f3d46` | | |
| sandık ışık / ön / derin | `#b4937a` / `#7a6460` / `#4a3f46` | 63 / 20 | demir bant `#3a3d42`, kulp `#b59e84`; sol kenar `#f0c4a8` |
| kum torbası (ham keten) ışık / orta / gölge | `#d0bba6` / `#a8978f` / `#7a6f86` | 77 / 14 | ağız ip bağı `#9a8268`; yazı/damga yok |
| düşen kum izi | `#d3c1ac` + sağ gölge kenarı `#8f8aa8` 2 px | | mavi gökte açık sıcak iz okunur; 20 kare |
| posta çuvalı | torba ile aynı | | sepet içinde ağzı rim üstünde |

**P07 darbe (tasarım §5 evre tablosunun renkleri bununla değişir; çizim/süre/yasaklar §5 aynen)**
| Evre | Hex |
|---|---|
| yerden duman sütunu / kâğıt-krem parlama | ışık `#a39ba6` / gölge `#5a556a` (ton: mor-gri kül, **bulut gibi okunmaz**: 3 px koyu kontur, tırtıklı kenar, gökten koyu) / parlama `#f2e6d2` (91 / 11) |
| delik / yırtık iç yüzü / dış yüzü | `#2f2d46` / `#ecd9c2` / `#8f8aa8` |
| gri-kül duman kümeleri | ışık `#a39ba6`, gölge `#5a556a`, sol kenar `#f0c4a8` 2 px |
| gaz boşalma puf | `#d8d2dc` |
| tarama | `#2f2d46` 2 px, aralık 7 |
Parlama L\* 91 (>88) tek istisnadır: P07 f108–118, ≤ %10 ekran, C\* 11, kılıf kadrajda yok ⇒ `lint: {izin: ["L_ustu_88_parlama"], not: "P07 darbe parlaması, kılıf kadrajda yok"}`.

**P10a (PARIS-CATI gün, kamera 230°, güneşe sırtı gök; bu satırlar mekanlar §1v2.9 "v1 gün paleti"nin yerine geçer)**
| Ad | Hex | L\* / C\* |
|---|---|---|
| gök tepe / üst / orta | `#6f86ad` / `#8fa3c0` / `#a9b7cc` | meydan ile aynı |
| gök alt / ufuk (**sıcak ışıma yok**, güneş arkada) | `#c9c8d2` / `#dcd0d0` | 80 / 5 · 84 / 5 |
| çatı denizi arkadan öne: K1 sırt / Panthéon (haçsız) / K2 / K3 / K4 brisis / K5 siluet | `#c8c0d2` / `#b0a6c0` / `#b3aac6` / `#9a91b3` / `#7d7599` / `#5a5278` | atmosfer: uzak açık-düşük kontrast |
| ışık alan çatı/baca/lucarne yüzleri (sola bakan) / kenar | `#d8b8a4` / `#f0c4a8` 2–3 px | 77 / 17 |
| krem cephe K4 (güneşe 85°, gölgeli) / lucarne yanağı ışık | `#b9aab4` / `#e2c6b2` | cephe 71 / 8 |
| pencere camı / parıltı (2–3 adet) | `#7f90ab` / `#f0d4bc` | iç ışık yok |
| baca külahı ışık / gölge | `#8a6458` / `#4f4347` | §13.1 aynen (C\* ≤ 18) |
| **kümes ahşabı** ışık yüzü (sol yan + iniş tahtası üstü) / orta (ön, gölgede) / derin / damar | `#c49a7c` / `#85634f` / `#4a3844` / `#3a2c36` | 67 / 25 (h 63°) · 45 / 20 |
| kümes çatısı çinko / sırt + sol kenar | `#5c5a7a` / `#f0c4a8` 3 px | |
| teras çinko ışık / gölge / kenet tepesi | `#7a7498` / `#4e4a6e` / `#d9b8b0` | güneş sıyırır |
| kuş: §13.1 güvercin satırları, kenar ışığı sol-üst | `#f0c4a8` 2–3 px | |
| Paris eli: ten ışık / gölge / manşet | `#dcb9a2` / `#8f7360` / `#5d5f63` + sol kenar `#f0c4a8` | ten 77 / 17; kılıfa ΔE76 ≈ 45 |
| duman (1 şerit, soluk) | `#c8c0d2` | |

### 14.3 Kılıf tekliği (C\*/L\* ayrımı) — kılıf bu sahnelerde görünmese de kural geçerli
- P03/P06/P07'de kılıf **kadrajda yok**; kural yine betikte çalışır (kılıf dışı C\* > 32 piksel 0; kırmızı bandı C\* > 30 h 340–40° 0). **P10a'da kılıf kadrajda** (el + kuş + kılıf, sabah ışığında): kılıf C\* ≈ 67; sahne tavanı ahşap ışık yüzü C\* 25 ⇒ oran **2.7 (≥ 2.3 ✓)**; sahnede C\* > 28 bölge yok (hesap: en yüksek `#c49a7c` 25, hasır 23, kenar ışığı `#f0c4a8` 23).
- **Altın saat tuzağı:** düşük güneş sarı-turuncu boyanmaz. Sıcak ışık hue **45–72° gül-şeftali**, kılıf hue 80° ± 12°; ışık/kenar/hasır/ahşap hiçbir yerde 74°'ü geçip C\* > 22 olmaz. Güneş diski, turuncu gök, sarı-altın halo yok.
- ΔE76 (kılıf `#F0B43C` L 77 a 11 b 66'ya, elle): balon ışık ≈ 47, toprak ışık ≈ 51, hasır ışık ≈ 46, ahşap ışık ≈ 43, kum torbası ≈ 52, sandık ≈ 48, kenar ışığı `#f0c4a8` ≈ 46 (hepsi ≥ 15, çoğu ≥ 40). Eleştirmen render'da ölçer.
- **P03'te posta çuvalı, hasır, balon, torba** kılıf biçiminde yarı saydam sarı silindir değildir; ip rengi bal tonunda değil (`#b59e84` C\* 17, soğuk-sıcak nötr).
- Güvenli alt sınır: kılıf dışında L\* > 88 piksel yok (tek istisna P07 parlaması, lint izni yukarıda).

### 14.4 Kar / sis / bulut / diğer yasaklar: gözden geçirme
| Yasak | Karar | Gerekçe / yeni sınır |
|---|---|---|
| **Kar** (yağış, yer örtüsü) | **KALIR** | Kaynakta yok [A]; kar yer örtüsünü L\* 90'a çıkarır ⇒ ışık alan sıcak toprak, uzun mor gölgeler ve gül-krem balon (L\* 83) gözden kaybolur. "Kış" = çıplak ağaç + soğuk berrak gök + gölgede soğuk toprak (kırağı okuması, iddiası yok) |
| **Sis** (hacimli, perdeleyen) | **KALIR**; yerine **GEVŞEK: hava perspektifi buğusu** | Düz katmanlı, kontursuz uzak bantlar (14.2); hacimli sis, gradyan, balonun önünü örten perde yok. Ekran yazısı/anlatımda "sis" geçmez. Gerekçe: derinlik gereği (§13.6) ve Paris tepenin ≈ 100 m altında; fiziksel olarak da uzak şehir buğulu okunur; hava durumu iddiası değil |
| **Bulut** | **KALIR** | (1) Kaynaksız hava iddiası. (2) P07'de **tek bulutlu şey duman olmalı**: darbe dumanı bulutla karışırsa "vuruldu" okunmaz. (3) Balon ışık yüzü ile gök ayrışması düz bantla ölçülebilir. Gök berrak: yalnız basamaklar |
| Güneş diski / hale / ışın | KALIR | Güneş kadraj dışında (14.1) ⇒ doğal olarak çizilmez |
| Sokak/gaz lambası | KALIR | G13 |
| Pencerede iç ışık (gün) | YASAK (yeni) | 14.1 |
| "Sıcak gölge yok" (§1.3) | **GEVŞER → TERSİNE** | Gölge mavi-mor (`#8f8aa8` ailesi); ışık yüzü sıcak. Sıcak gölge hâlâ yok |
| Sarı metal, kırmızı (mühür/bayrak/tuğla/ayak), gold, bal/kehribar nesne | KALIR | §13.4 |
| Gök gradyanı | KALIR (CSS yumuşak gradyan yok) | 5 basamak + litografi geçişi |
Kalan "gevşek" tek şey: sabah gökte ufuk ışıması (sol alt) ve buğu bantları; ikisi de düz şekil.

### 14.5 Derinlik ve doku özeti (§13.5/13.6 ile aynı sözleşme)
- **Katman sırası (meydan):** ön plan (hortum, yerde 2 çuval, halat, uzun gölgeler; kontur 6 px, keskin) → orta (balon, sepet, kalabalık; keskin, 3–4 px) → uzak (ağaç, yan evler; 3 px / kontursuz) → Paris bandı (3 buğu katmanı, kontursuz) → gök. Ağaç, balonun **arkasında**. Uzak katman açık ve düşük kontrastlı, yakın katman koyu ve kontrastlı.
- **Doku (en fazla 3):** (1) toprak stipple tanesi / hasır kamışı / sıva lekesi (tek kabarma α .10); (2) mor tonlu tarama, yalnız ışığın mimariyi anlattığı yerde: balon terminatör bandı, saçak altı, söve, sandık/sepet gölge yüzünde dikey bant, gölgenin keskin kenarı; geniş yüzeyde (gök, zemin, cephe) yok; (3) kâğıt `paper #e9dfc9` multiply α .12–.16 + lif + 6–10 soluk leke, seed sabit.
- **ArsivKatmani:** gündüz sahnelerinde `gunduzMineral` gök mavisini ve kenar ışığını grileştirirse `litografi` modu (§13 gece için yazılan) gündüz değerleriyle denenir; ölçüt: gök üst/orta C\* ≥ hedefin %85'i, kenar ışığı C\* ≥ 18 (Evliya K1 dersi).
- 360 px eşikleri §13.5 aynen (gök 40×40 L\* std ≥ 1.2; tarama ≥ 0.8 px). Kalabalık siluet 360'ta ≥ 20 px boy.

### 14.6 Devir (tek sahiplik)
- **Mekân sorumlusu:** mekanlar §2.7 hex tablosu (yan ev `#b8b0a0/#8a8274`, toprak `#8d836f`, Paris bandı `#a9adb0`, ağaç, hasır `#5a4a3a`) §14.2 değerleriyle; §2.2–§2.6 "güneş sol-önde" cümleleri aynı; `gok`/`sepet` ufuk–basamak ölçeği; `HavadanSehir` renkleri; P10a gök/çatı denizi (§1v2.9 v1 gün paleti kalkar); `ISIK_YON.gunMontmartre` eklenir; ArsivKatmani gündüz modu kararı.
- **Motion (kurulum, onaydan sonra):** `Balon` küre 3 basamak + terminatör taraması + yer yansıması + ağ; `Sepet`, `MeydanZemin` (toprak ışık/gölge), `GolgeSeridi` (gün vektörü, 4.7×), kalabalık kenar ışığı, P07 darbe renkleri (§5), `CATI_PALET.gun` v2, `Guvercin`/`KolEl` sol kenar ışığı.
- **Eleştirmen betiği:** §13.3 ölçütleri + 14.3 (P10a oran ≥ 2.3; hue 74° üstü C\* > 22 piksel 0) + renk ölçüm noktaları (meydan, dekor y): gök orta (300, 880) `#a9b7cc`; ufuk (300, 1250) `#f0d0bc`; sol ışıma (150, 1250) `#f2c9b2`; balon ışık yüzü (350, 400) `#e6c9b4`; balon gölge gövde (700, 700) `#8f8aa8`; toprak ışık (500, 1650) `#c8ae98`; sağ ev ışık duvarı `#e8d0ba`; hasır ışık `#b89677`. Güncellenen §1.7 satırları: kış gökü orta `#a9b7cc`, krem taş ışık `#e8d0ba`, balon küre ışık yüzü `#e6c9b4`.
- **Yönetmen:** yalnız P03 f0–40 ağaç dalı ve gölge yönü notu; kamera değişmez.

### 14.7 [G] / doğrulanmalı (araştırmacıya)
1. Kalkış sabahının havası (açık/berrak gök, güneşin görünürlüğü): kaynaksız; palet "berrak kış sabahı" varsayar. Kaynak "kapalı/sisli" derse §14.4 bulut/sis kararı yeniden açılır.
2. Montmartre'de çıplak ağaç, yan evlerin sıva rengi ve katı, meydan zemini (toprak): [G] (G14).
3. Balonun rengi/vernik görünümü: pamuk + vernik [A], renk kaynaksız ⇒ nötr krem; gül-krem tonu ışıktan geliyor, kumaşın boyası iddiası değil.
4. Kalabalığın varlığı/sayısı (6): kaynaksız, dramatizasyon.
5. Hasır sepet, 4 görünür kum torbası: [G] (G3/G18).

### 14.8 Kullanıcıya / orkestraya açık sorular (varsayılan seçildi)
1. **Balon sıcak gül-krem + mor gölge** (kirli krem yerine): kaynaksız renk, estetik tercih. Varsayılan: evet.
2. **Balonun ışık yüzü gerçekte %15 hilal, çizimde %35** [T abartı]. Varsayılan: evet; istenmezse gerçek hilal (balon çoğunlukla mor siluet olur, gül-krem azalır).
3. **Bulut yasağı kalıyor, sis yerine buğu bandı gevşedi.** Kullanıcı bulut isterse tek şerit gök bulutu P03/P07'ye eklenebilir; P07 dumanı karışma riski yüzünden bu turda önerilmiyor.
4. **P06a hangisi?** HARİTA ise bu palet dışı; meydan sahnesi ise `meydan`/`yukleme` ile aynı palet. Varsayılan: P06a HARİTA.
5. **ArsivKatmani gündüz modu** gök mavisini grileştirirse `litografi` modu gündüz için (motion/mekân sorumlusu kararı).
6. **P07 parlaması L\* 91 lint izni** (kılıf kadrajda yok). Varsayılan: izin.
7. Hedef görsel: `hedef/prompt-montmartre.txt` (P03 kalkış meydanı). Onaylanırsa mekân sorumlusu §2'yi buna göre günceller.

---

## 15. İç mekân figür ve el dili (tur-15) — 2026-11-13

Girdi: `notlar/tur-15.md` (kullanıcı: "P10 f330 görseli çok kötü"), `kalibrasyon/C/elestiri.md` (düzeltme 1, 3, 4, 5-P09), C kareleri (P05 f280, P10 f330, ozet), onaylı hedef dili (`hedef/*.png`, V4 `karsilastir.png`, B3 özeti), §3.3, §13.8, mekanlar §2v2-H2 H2.8. Spesifikasyondur; kod, görsel, git yok. **§3.1 "okuyan siluet" (düz oval baş), §3.2 el satırı ("2 boğum çizgisi, tırnak yay"), §3.3, §13.8 oran dışındaki satırları, §2.2 ip satırı ve mekanlar H2.8 "yüz yok / kulak yok" satırı ile çelişen yerlerde §15 geçerlidir.** Hex'ler mevcut palete aittir (yeni renk yok, §15.8). Tüm px 1080×1920 tabanı, kamera cs 1.0'da; kamera yakınlaşırsa ölçek B/E'den türer, kontur kalınlığı §15.1 formülüyle yeniden hesaplanır.

### 15.0 Teşhis → karar
| C karesinde görülen | Neden | Karar |
|---|---|---|
| P10 f330: baş düz daire + kulak diski, yön yok; "bize kâğıt gösteriyor" | Baş cepheden, kâğıt kameraya dönük, baş eğik değil | **3/4 profil**, baş 28° kâğıda eğik, kâğıt kameraya 45° (§15.2); burun-çene silueti serbest (iç yüz detayı yok) |
| Kollar eşit genişlikte yeşil-gri bloklar, palto mor | Kol ayrı renk, konik değil | Kol = palto dolgusu, konik, dirsek yuvarlak (§15.2.4) |
| Çizgi film eli: kalın sabit kontur, tırnak lekesi, boğum tireleri, eşit parmak | KolEl/ParisEl dili | Gravür eli: ince-kalın kontur, tarama, taper (§15.1) |
| P05: havada tek parmak, başparmak ters taraf, el ekranın %55'i | `isaret` pozu, ayna anatomi | Yatık el, dört parmak yan yana düz, doğru el (§15.1.4) |
| Memur başı = disk + 2 kulak elipsi + parlama yayı = "kulaklıklı kask" | LanternOda başı | Üç farklı arka-baş, kulak yok (§15.3) |
| P09: baş kadraj dışı, ip 360'ta yok | Açık ince ip | Baş+göz kadrajda, koyu kalın 2 sarım (§15.4) |

### 15.1 Paris eli / Dagron eli (tek gravür dili)
Tek el modeli iki ten/manşet paletiyle (aynı çizim, aynı oranlar). **E = el boyu** (bilek çizgisi → orta parmak ucu), gerçek 0.19 m. P05'te **E = 640 px** (bbox yüksekliği ≤ 670 px = ekranın %35'i; manşet hariç el bbox'ı ekranın ≤ %35'i), P10 okuyan elinde **E ≈ 200 px** (= 0.83 B, §15.2).

**1.1 Oranlar (E cinsinden).**
| Parça | Değer |
|---|---|
| Avuç (bilek → parmak kökü çizgisi) | uzunluk 0.54 E · parmak kökü eni 0.42 E · bilek eni 0.30 E |
| Parmak boyları (kökten uca) | orta 0.46 · yüzük 0.43 · işaret 0.42 · serçe 0.33 (orta en uzun, işaret yüzükten kısa: anatomi) |
| Parmak eni | kökte 0.115 E → uçta 0.080 E (uca doğru incelir, eşit genişlik yok); uç yarım yuvarlak, kapsül değil |
| Başparmak | bilekten 0.30 E ilerde çıkar (tenar kabarık), serbest kısım 0.30 E, en 0.135 → 0.095 E; işaret ekseninden 38–50° açık |
| Tırnak | parmak ucunun son 0.13 E'si; ayrı yuvarlak leke **yok**; yalnız kök kenarında 1.5 px yay + uç kenarda 1.2 px çizgi. Boğum tiresi **yok** |
| Boğum | parmağın ışık kenarında silüet kırılması 2 px (PIP ve DIP'te) + gölge kenarında kontur 1 kademe kalınlaşır. İç çizgi yok |
| Avuç sırtı | tek 1.2 px tendon çizgisi (işaret ve yüzük kemiği arası), uzunluk 0.35 E, α .6; "3 uzun kemik çizgisi" kalktı. Bilekte tek küçük ulna kabarması (silüette 3 px) |

**1.2 Kontur (değişken, tek kapalı yol).** Yük tarafı = gölge/aşağı/masaya basan kenar. Kalınlık **yük = clamp(0.010 × E, 3.5, 6) px** (E 640 → 6 px; E 200 → 3.5 px); **ışık kenarı = 0.36 × yük** (2.2 / 1.5 px); parmak ucu ve kıvrım uçları **0.25 × yük, ≥ 1.0 px**. Geçiş 24 px uzunlukta yumuşak (iki ayrı çizgi değil, tek dolu ana hat; motion: iki çokgenli "dolu kontur" ya da konik stroke). Renk **kendi tonunda**: gölge yüzü kontur ten gölgesinin %55 koyusu, ışık yüzü kontur dolgunun %78'i. Siyah yok. `strokeLinejoin="round"`.

**1.3 Renk, tarama, ışık.**
| | Paris eli (P10) | Dagron eli (P05, P09) |
|---|---|---|
| Ten ışık / gölge | `#d6b49c` / `#8f7360` | `#c9a58a` / `#8e6a52` |
| Kontur yük / ışık | `#5a4438` / `#a8836c` | `#5a4132` / `#a07f66` |
| Sıcak kenar ışığı | `#f0c4a8` (kapı ışığı, sabah güneşi) | `#e6c9b4` (pencere, 18° sabah güneşi) |
| Manşet | `#5d5f63` düğmesiz, kol ağzından 0.08 B dar gömlek şeridi; **kol palto rengi** | **dagronSepya `#4a3a2c`**, gölge `#2e2318`, düğmesiz, 2 dikiş çizgisi 1.5 px `#2e2318` aralık 8 px; yüksek 0.22 E |
- **Gölge tarafı paralel tarama:** parmak/avuç gölge yüzünde, bölgeyi aşmaz (kontura 3 px kala biter), tek açı = sahne θ (P05 **143°**, P10 **78°**), **çizgi 2 px (E 640'ta 2.5), aralık 6 px (E 640'ta 7)**, renk gölge tonunun %60 koyusu (`#6a4f40`). Parmak başına 3–4 çizgi; avuç sırtı gölge yarısında 6–8. Ten dolgusu iki düz ton (ışık/gölge), gradyan yok.
- **Kenar ışığı:** ışık yüzü konturunun **içine yapışık** 2.5 px (E 200'de 2 px) şerit, parmak sırtı + bilek + başparmak üst kenarında, uçları incelir; ikinci kayık çizgi olmaz. C\* ≤ 24 ✓.
- Temas gölgesi (masa/kâğıt): kaynak tersine **kısa** 18–24 px, `#3e342a` α .35, kenarı net.
- **Katman sırası (arkadan öne):** temas gölgesi → kol/manşet → el dolgusu (ışık) → gölge alanları (düz) → tarama → kenar ışığı → değişken kontur → tendon çizgisi → tırnak yayları.

**1.4 Sol/sağ anatomi (kamera görüş açısına göre).** Başparmak tarafı kuralı (üstten bakış, parmaklar kameradan uzağa):
| Poz | Sağ el | Sol el |
|---|---|---|
| Avuç aşağı (sırt görünür) | başparmak **solda** | başparmak **sağda** |
| Avuç yukarı (iç yüz görünür) | başparmak **sağda** | başparmak **solda** |
Kol hangi kenardan girerse o el: sol-alttan giren kol = sol el. Doğrulayıcı kontrol: ayna görüntü (başparmak yanlış tarafta) = ret; ayrıca "sol" etiketli rig'in sırtı görünüyorsa başparmak sağda olmalı.

**1.5 P05 ölçü pozu (kullanıcı kararı: yatık el, işaret şeride paralel, hiçbir parmak havada değil).**
- **Sol el**, kol sol-alttan girer, **avuç aşağı, masaya tam yatık**; başparmak sağda (çekmece ve şerit tarafı). El ekseni **52°** (yukarı-sağ), forearm ekseni ±8° aynı.
- **Dört parmak da düz, yan yana, masada** (PIP bükülmesi ≤ 12°, parmak aralığı işaret–orta 6°, orta–yüzük–serçe 0–3°). Orta parmak ucu işaret ucundan 0.04 E ileride (anatomik); **tek parmak ayrışmaz, hiçbir parmak havaya kalkmaz, yumruk/kıvrık parmak yok** (orta parmak jesti okuması: ret).
- **Başparmak** işaretten 50° açık, **yatık**, ucu şerit hizasının ötesinde. **Şerit (216 × 108 px = 0.34 E × 0.17 E)**, işaret parmağı ile başparmak arasındaki V'de, işaret eksenine **±5° paralel**, işaretin yan kenarından 0.06 E boşlukla yatar; boyu işaret parmağının %80'i ("parmak boyu"). Şeridin ucu işaret ucuna 0.04 E yakın, parmak şeride değmez, merceğe ≥ 120 px.
- Bilek ekranda yaklaşık **(300, 1560)**, orta parmak ucu ≈ (694, 1056) (E 640, 52°). bbox ≤ %35. El sayfanın üstünde: şerit koyu `#5a5048`, el ten ışık, sayfa `#e4dfd0` ⇒ ayrışma ✓.
- Parmak kalınlığı 0.115 E = 74 px, uç 51 px: 360'ta 17 px, 4 parmak ayrı okunur.

### 15.2 Okuyan figür (P10 `kapi`, f330 doruk)
**Ölçü birimi B = baş yüksekliği (tepe → çene) = 240 px.** Gerçek yetişkin 0.23 m ⇒ el E = 0.83 B = 200 px, üst kol 1.30 B (0.30 m), ön kol 1.17 B (0.27 m), omuz genişliği 2.2 B.

**2.1 Duruş ve "okuduğu okunur" gerekçesi.** Yüzün yönü ve eğimi okumayı verir, kâğıdı bize tutan figür değil, kâğıda gömülen figür:
- **Kâğıt koyu tarafta (ekranda sol), kapı ışık paneli figürün arkasında-sağında.** Figür **sola bakar** (yüz yönü ekran solu), baş ekseni kameraya göre **70° (3/4 profil)**, gövde 55° dönük.
- **Baş 28° öne-aşağı eğik** (SVG `rotate(−28°)`, pivot atlas ≈ kulak noktasının 0.25 B altı-arkası). Burun ucu çene hizasının solunda, **burun ucundan kâğıt üst-ortasına çizgi ≤ 65° aşağı** (göz çizgisi 59°: baş 28° + göz 31°).
- **Kâğıt göz hizasının ≥ 1.0 B altında**, çene altında 24–40 px boşluk, çene kâğıda binmez.
- Kafa-omuz: boyun öne eğik, omuz yuvarlak; sırt hafif kambur (5°).

**2.2 Yerleşim (cs 1.0; mekân v3 geometrisi farklıysa orantılar kalır, nokta ±24 px).**
| Öğe | Ekran |
|---|---|
| Baş bbox | x 520–735, y 520–770 (vertex (640, 522), burun ucu (525, 715), çene ucu (570, 768), ense (730, 690)) |
| Kâğıt köşeleri | sol-üst (270, 800) · sağ-üst (470, 812) · sağ-alt (470, 1155) · sol-alt (270, 1170) |
| Yakın omuz / dirsek / bilek | (610, 850) / (665, 1160) / (455, 1130) |
| Torso silüeti | ön (sol) kenar x 545 @ y 900 → 535 @ 1920; arka (sağ) kenar x 885 @ 860 → 975 @ 1920 (palto A-kesim, diz boyu) |
| Omuz hattı | tepe (700, 805), boyundan **18° aşağı** iner (vatkasız, düşük omuz) |

**2.3 Baş: yüzsüz ama yön belli (profil silüeti).** Yerel profil noktaları (yüz solda; tepe-çene = 1.0 B; x yüz önünden geriye): alın saç çizgisi (0.10, 0.18) · kaş çıkıntısı (0.02, 0.44) · nasion (0.05, 0.50) · **burun ucu (−0.10, 0.64)** · burun altı (0.01, 0.68) · dudak dalgası (−0.01, 0.77) · çene ucu (0.03, 0.93) · çene altı (0.12, 1.00) · çene köşesi (0.58, 0.80) · ense (0.70, 0.90) · kafa arkası (0.84, 0.45) · tepe (0.45, 0.0). Burun çıkıntısı 0.10 B = **24 px** (360'ta 8 px: okunur). **Göz, ağız, kaş, iç yüz çizgisi yok.**
- **Kulak elipsi yok.** Kulak, kafa silüetinin arka kenarında **tek C-yayı çıkıntı** (0.14 × 0.26 B) ve iç yarım çizgi (1.5 px `#2a2638`); parlak disk yok.
- **Saç:** ten üstünde ayrı şekil, `#2a2638`; saç çizgisi alından şakağa (0.30, 0.35) → kulak önü (0.40, 0.42) → kulak arkası → ense (0.62, 0.80). **Kafa arkası ve ense kenarı düzensiz:** 5 küçük tutam (boy 0.05–0.08 B, aralıklar 0.07/0.11/0.06/0.10/0.08 B, seed 191); alın tarafı düz kalır.
- Baş ten rengi (kontrajur, arkası açık): `#6e5a62` (gölge ten); **çene altı, burun altı, yanak alt kenarı kâğıt yansımasıyla** `#8f7360` + 2 px kenar `#d8b8a4`. Boyun ense çizgisi yakaya iner; devrik yaka tabanı ense çizgisinde 2 px `#2a2638`, yaka dışa 0.20 B devrik, üst kenarı saçın 0.15 B altında.
- **Işık (tek kaynak = kapı ışığı, sağ-arka):** kulak arka kenarı, ense ve saç tutam uçlarında kırık parçalar halinde sıcak kenar ışığı **3 px `#f0c4a8`** (kulağın ışığı geçirmesi fiziksel; yanakta değil). Yanak/çene/burun altı sıcaklığı **kâğıdın yansıması** (ikincil, kaynak tanımından türer, şiddet %35). *Sapma notu:* "kapı ışığından sıcak yanak kenar ışığı" brifi yüz sola bakarken kapı arkada olduğundan kulak/ense olarak uygulandı; yanak sıcaklığı kâğıttan. Kapı panelinin başka yere (sola) alınması hâlinde figür aynalanır (§15.2.7).
- Baş silüeti açık kapı paneline karşı koyu: yön en güçlü okumayı buradan verir (burun + çene + saç kenarı).

**2.4 Gövde ve konik kollar: tek giysi.**
- **Palto** diz boyu, dolgu `#45405a` (kompars), kol dahil **aynı dolgu**. Kontur 3.5 px `#2a2638` (kendi tonunda, siyah değil), iç çizgiler (palto önü, yaka, kol ağzı, dirsek kıvrımı) 2 px `#2a2638`. Düğme yok (metal yok). Arkadan görünmeyen yırtmaç çizilmez.
- **Kol:** üst kol omuzda **0.60 B (144 px) → dirsekte 0.50 B (120 px)**, dirsek dışı yuvarlak (r 0.30 B, kumaş birikimi 1.1×), ön kol dirsekte 0.50 B → bilekte **0.30 B (72 px)**; kol ağzı bandı 0.12 B, hemen altında dar gömlek manşeti (`#5d5f63`, 0.08 B = 19 px). Dirsek açısı 75° (yakın kol), **hiç ters bükülmez**, dirsek gövdeden aşağı-geriye bakar, "Z" düz çizgi yok. **Ön kol ekranda 0.74× kısalır** (kameraya 42° döner).
- **Tarama (gölge tarafı = kapı ışığının tersi = sol/ön):** 78°, 2 px, aralık 6 px, `#2f2d46`; yakın kolun alt-ön yüzü, ön göğüs (sol üçte bir), yaka altı, kol altı kıvrımı. Sağ-arka (ışıklı) üçte iki düz. Taramalı alan figürün ≤ %30'u.
- **Işık yüzü:** omuz hattı üstü ve sırt kenarı 3 px `#f0c4a8` kırık parçalar (omuzdan 0.9 B aşağı), palto ışık tonu `#524a6e` yalnız bu 14 px şeritte.

**2.5 Kâğıt ve eller (kâğıdı iki elle tutar).**
- **Kâğıt:** gerçek sayfa 280 × 360 px (1.17 B × 1.5 B; 21 × 27 cm × stilize 1.1). **Normali kamera ile kapı ışığı arasında (45°)**: ekranda genişlik 200 px (×0.71), sol kenar sağ kenardan **%8** uzun (sol kenar kameraya yakın). Üst kenar 12° geriye eğik. Kâğıt "ışığa dönük": sağ yarı `#e4dfd0` + sağ kenar 2 px `#f0c4a8`, sol yarı `#c9c3b2`. Yatay katlama çizgisi %50'de 1.5 px `#bdb7a6`; 11–13 dalgalı satır `#6d675a` (dil-nötr, harf yok); **alt kenar 6 px yumuşak sarkar**, üst kenar 4 px dalgalı: katı levha değil. Arkası **koyu** (ΔL\* ≥ 30): açık kapı paneli kâğıdın arkasına girmez (mekân v3 notu).
- **Yakın el (okuyanın sol eli, E 200):** bilekten parmaklar kâğıdın **sağ-alt köşesine** uzanır; **başparmak kâğıdın ön yüzünde** (ucu kenardan 0.28 E içeride), diğer dört parmak kâğıdın arkasında, yalnız işaret ve orta parmak uçları alt kenardan 0.08 E taşar. Başparmak kâğıda **gerçekten basar** (temas gölgesi 10 px). Kâğıdın tutulan kenarı eli takip ederek hafif kıvrılır.
- **Uzak el (sağ el):** gövde arkasında; yalnız **başparmak ucu** (kâğıdın sağ kenarına 0.25 E içeride, ön yüzde) + işaret/orta parmak uçları kenardan 0.12 E taşar. Avuç ve bilek görünmez.
- **Boş/sarkan el yok.** f266–296 aralığında (zarf alınırken) boştaki el gevşek yarı açık: parmak bükülmesi serçeye doğru 15 → 25°, başparmak işaret yanında; **yumruk ve "boşluğu kavrayan" biçim yok**.
- Katman sırası (arkadan öne): kapı paneli → arkadaki figür → yer gölgesi → torso + uzak kol → torso taraması → **ense + yaka → baş + saç** → kâğıt → yakın kol + el → kapı kenar ışıkları → kâğıt yansıması → konturlar.

**2.6 Dönem başlığı: YOK (karar ve gerekçe).** (1) İç mekân/eşik: 1870'te içeri giren erkek başlığını çıkarır; H2.8'in silindir/melon/kasket önerisi sokak ve sepet figürleri içindir [G]. (2) İki el kâğıtta; başlık eldeyse üçüncü nesne ve hacim ister. (3) Başlık kenarı yüzü ve kâğıdı gölgeler, burun-çene siluetini ve "okuma" okumasını bozar. (4) Saç kenarı, yön ve dönemi başlıktan daha az iddiayla (kaynaksız kıyafet [G]) söyler. Kapıdaki bekleyen iki siluet (P01 tasarımı, §3.1) başlık taşımaz.

**2.7 Ayna kuralı.** Kapı ışığı ekranın solundaysa tüm figür (baş, kâğıt, kollar) `scaleX(−1)`; bu durumda **el anatomisi de değişir** (yakın el = okuyanın sağ eli; §15.1.4 tablosu yeniden uygulanır), manuel ayna kopyası kabul edilmez.

**2.8 Okunurluk (360 px).** Baş 80 px, burun çıkıntısı 8 px (≥ 6 ✓), kâğıt 67 × 120 px, kol 40 px / 24 px, el 67 px, tarama aralığı 2 px (kaba doku olarak okunur, çizgi sayılmaz: kabul). Kâğıt tek başına "mektup", baş eğimi "okuyor" okutur; göz-kâğıt hizası çizgisi çıkarıldığında kâğıt görünmeden de duruş anlam taşır.

### 15.3 Memur başları (P10 `oda`, arkadan siluet)
Perdeye bakan üç memur, **kamera arkalarında**: yalnız kafa arkası + ense + omuz. **Kulak elipsi ve üst parlama yayı yok.** Baş yüksekliği (B_m): **A 150 · B 160 · C 148 px**; hiçbiri aynı y'de değil (±40 px), aynı eğimde değil (öne eğik 12–25°: yazarlar). Omuz genişliği 1.9–2.2 B_m, düşük omuz 18°, yakalı palto `#2c2f36` (oda gölge tonu; ışık yüzü yalnız kenar), kontur 2.5 px `#1b1d24`.
| Baş | Biçim | Saç/ten | Ense/yaka |
|---|---|---|---|
| **A kel** | geniş yuvarlak: eni 0.80 B_m | tepe çıplak ten `#5a4c52`; kulak hizasında ve ensede ince saç şeridi 0.12 B_m `#2a2638` (kulak çizilmez, şerit yan kenarda süreklidir) | kalın ense, **2 yatay kıvrım** (2 px `#1b1d24`); düşük yaka |
| **B dağınık** | dar uzun: eni 0.64 B_m, boy ×1.06 | saç kütlesi 7–9 tutam, boy 0.06–0.18 B_m, asimetrik (sağ üstte 1 kalkık tutam), tutam uçları kenarı kırar `#2a2638` | saç yakaya taşar; devrik yaka dışa 0.15 B_m |
| **C ayrık** | kare arka: eni 0.72 B_m, baş 8° sola eğik | **düşey ayrım çizgisi** (2 px, taçta soldan 0.18 B_m), sol saç kütlesi büyük, sağ yassı `#2a2638` | ensede **düz berber kesimi** (yatay 2 px), dik yaka |
- **Işık (tek kaynak = lantern huzmesi, sağ-ön):** kenar ışığı yalnız **huzme tarafı kenarda**, kenarın %25–40'ında, kontura yapışık **2 px `#c4ccbc`** (L\* ≈ 81; `#e4ecd8` L\* 93 tavanı geçer), uçları incelir, saç tutam uçlarında ayrı kırık parçalar. Başın tam yayı kaplayan parlak çizgi **yok**; huzme başın üstünden geçtiği yerde üst kenar çizgisi aynı kuralla.
- Omuz/sırt: kenar ışığı yalnız huzmeye bakan omuz çizgisinde (0.8 B_m uzunluk). Gölge tarafı tarama yok (≥ 120 px boyda değil).
- 360'ta baş 50–53 px, "kel / dağınık / ayrık" siluet farkı okunur; "kask/kulaklık" okuması kalkar.

### 15.4 Kuş elde (P09, Dagron eli)
- **Kuş yüzü kadrajda:** baş merkezi ekran **x 650–820, y 560–760** (üst bant 300'ün altında, yan güvenli ≤ 1000); baş kameraya 3/4 (profile 60°), **tek göz** (yakın taraf), göz ø **28 px** `#14120f` (iris yok), üst-solda 4 px ışık hilali `#f0c4a8`, çevresinde 3 px koyu tüy halkası `#43415a`. Gaga `#4f4b4f`, boyun yanardönerliği §13.1 (iki leke). Kuş **yandan 3/4**, yukarıdan kuyruk yelpazesi kapsülleri ("balık" okuması) yok.
- **Tutuş (el sıkmaz):** sol el, avuç yukarı-hafif içe (başparmak solda); kuş sırtı üstte, gövdesi avuçta; başparmak ve dört parmak kanat kapaklarının üstünde **gevşek**, parmak–gövde arası 0.03 E hava, **baş elin ön kenarından ≥ 1.4 baş boyu dışarıda**, kuyruk elin arkasında serbest, tüyler yumuşak sarkar. Sağ el kuyruğu tutar/ipi bağlar. Dagron paleti §15.1.3.
- **Kılıf ipi (kuyruğa bağ):** **koyu `#4a4237`, kalınlık 5 px (1080), 2 tam sarım**, sarım aralığı 9 px, kılıf boyunun kuyruk tarafındaki %20–%34'ünde, kılıf eksenine ≈ 12° eğik; kılıf gövdesine 3 px ip gölgesi `#B9801F`; düğüm 10 × 8 px, iki kısa kuyruk 22 px. **Ekran alt sınırı 4 px (360'ta ≥ 1.3 px)**; kuş küçükse ip kalınlığı kılıf boyunun %2.6'sı. Bu ip **tüm planlarda aynı** (P01 kanca, P09, P10, P11; **§2.2 ip satırı "soğuk kırık beyaz" kalktı**, gerekçe: 360'ta açık ince ip kayboluyordu, eleştiri C P09). Kılıf tekliği etkilenmez (ip C\* < 10).
- Tüy dili (hedef-kuş): kanat örtüsü 3 sıra yay (scallop), kontur 2 px kendi tonunda, gölge tarafında 3–5 kısa tarama (72°, 2 px, 7 px aralık).

### 15.5 Eleştirmen kontrol listesi (§15 kabul ölçütleri)
1. P05 f280: başparmak doğru tarafta (sol el, sağda); dört parmak masada, hiçbiri kalkık değil; şerit işarete ±5°; el bbox ≤ %35; boğum tireleri/tırnak lekesi yok; ışık yüzü ince, gölge yüzü kalın kontur görünür.
2. P10 f330: baş sola eğik 28°, burun ucu çıkıntısı ≥ 20 px, kâğıt göz hizasının ≥ 1.0 B altında, kâğıt arkası koyu, kollar palto dolgusuyla aynı hex, konik, dirsek yuvarlak, tarama gölge tarafında, tek ışık (kapı) yönü tutarlı, boş/kavrayan el yok.
3. P10 oda: üç baş siluetinde kulak elipsi yok, 360'ta üçü ayrışır, kenar ışığı parça parça.
4. P09: baş + göz kadrajda, ip 360'ta iki sarım olarak seçilir.
5. Renk: kılıf dışı C\* ≤ 28 (en yüksek `#f0c4a8` ≈ 23), L\* ≤ 88, imza bandı dışarıda 0, kırmızı 0.

### 15.6 Devir (tek sahiplik)
- **Motion:** `ParisEl.tsx` / `KolEl.tsx` (el modeli §15.1, `dagronSepya` manşeti, sol/sağ anatomi, P05 pozu `olcu` = isaret yerine), `FigurSiluet` okuyan varyantı (§15.2, baş eğimi, profil, konik kol, tarama), `LanternOda.tsx` memur başları (§15.3), P09 kuş kadrajı + ip (§15.4). Önce P10 f330 kalibrasyon karesi, sonra P05 f280, P09 f150, P10 f200.
- **Mekân sorumlusu (v3 paralel):** kapı paneli figürün arkası-sağında, kâğıt arkası koyu eşik/duvar, kapı ışığı sıcak `#f0c4a8` kenar yönü; lantern huzmesi memur başlarının sağ-ön yönünden. Çelişki olursa figür aynalanır (§15.2.7).
- **Yönetmen:** P10 f330 `kontrol_kare` aynı, P05 el ölçeği E 640 / cs; P09 kamera cx kuş başı x 650–820'yi kadrajda tutacak şekilde.
- **Eleştirmen:** §15.5.

### 15.7 [G] / doğrulanmalı
1. 1870'te iç mekânda erkeğin başı açık olması [G, genel görgü]. 2. Palto kesimi (düşük omuz, devrik yaka) [G]. 3. Kılıf ipinin rengi: kaynak "mumlu ip", renk kesin değil [A]; koyu seçim okunurluk kararı [T].

### 15.8 Yeni renk / font: yok
Kullanılan tüm hex'ler mevcut paletten (§1.5, §3.2, §3.3, §13.1, §14.2) ya da bu bölümdeki gerekçeli türevlerdir: `#6e5a62` (baş ten gölgesi, `#8f7360` ile `#45405a` arası tek ara ton), `#524a6e` (palto ışık şeridi), `#a8836c`/`#5a4438`/`#a07f66`/`#5a4132` (ten kontur türevleri, %55/%78 kuralı), `#c4ccbc` (oda kenar ışığı, `#e4ecd8`'in L\* tavanına uyan türevi), `#5a4c52` (kel ten). Hepsi C\* ≤ 28, L\* ≤ 88; sarı metal ve kırmızı yok.
