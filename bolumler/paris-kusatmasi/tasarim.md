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
