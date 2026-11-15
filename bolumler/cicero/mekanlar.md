# Çiçero (Ankara 1943–44) · Mekân Şartnamesi (kurulum ekibi, adım 5b; kanalın ilk 1940'lar kiti)

Hazırlayan: mekân sorumlusu · 2026-11-14 · Girdi: `tasarim.md` (palet, ışık sözleşmesi, imza banknot: **bağlayıcı**), `sahne-plani.md` (§1, §3, §7, §8), `arastirma.md` §5, `dokunuslar.md`, `src/kit/KATALOG.md` (IC-ODA, MASA-INSERT), `src/kit/sablonlar/{IcOda,MasaInsert}.tsx` ve `src/doku/*` (yalnız yapı okundu). Biçim örneği: `paris-kusatmasi/mekanlar.md`.
Bu belge **şartnamedir, kod değildir.** Görsel üretilmedi (Gemini yok, bütçe), git yapılmadı.
Etiketler: **[A]** arastirma'da kaynaklı · **[S]** senaryo/sahne planı · **[G]** genel bilgi, kaynağı açılmadı, **doğrulanmalı** · **[T]** tasarım kararı (tarihî iddia değil). [G] öğe tek başına dokunuş taşımaz, metin içermez.

### Özet kararlar (orkestra için)
1. **Üç mekân, kemer yok:** ELÇİ-ODASI (IC-ODA `oda: elci-yatak`, gece/gündüz/sönük), ARABA (v2: `el`, `pencere`, `kucak`, `dis`), MASA-INSERT (`komodin`, `berlin`, `bazna`). Bütün açıklıklar **düz lentolu dikdörtgen** (1930'lar Ankara'sı ve iç mekân). Sivri, yarım daire, basık kemer çizilmez.
2. **ELÇİ-ODASI kutusu yeniden ölçülendi:** arka duvar z **5.0**, oda genişliği **4.2 m** (u −2.1…2.1), tavan **3.2 m**. Arka duvar cs 1'de x 57–1023'e sığar, bütün oda tek bakışta okunur. Yerleşim (soldan sağa, arka duvar): **tek kişilik yatak · komodin + lamba + kutu · pencere · banyo kapısı** (§1.3). Gerekçe: 9:16'da Bazna'nın sol-önde durabilmesi (yatak ayak ucu z 3.1), K-A'da lamba + pencere önünde Bazna + kapı şeridinin aynı karede sığması.
3. **K-A kamerası değişti (öneri):** P04 p200–240 için cs **1.4, cx −170, cy −90** (sahne önerisi cs 1.7 cx −240 idi). cs 1.7'de kapı şeridi alt banda (y > 1290) düşüyor, lamba kadraj dışında kalıyor. Yatak ve belgeler K-A'da kadraj dışında: p104–194'te görülürler, p200–240 pan'ı Bazna'nın bakışını kapıya taşır (§1.9).
4. **Lamba tek tasarım:** "eklemli (tek mafsal) boyunlu, koni abajurlu başucu lambası" [G]. Tasarım (koni abajur, ağır kaide) ile sahne (boyun çevrilir) birleştirildi. Abajurun **üst ağzı duvara keskin kenarlı bir V ışık** atar. Bu bölümün 1940'lar ışık imzası ve sıcak piksel kaynağı budur. Boyun bükülünce V ters yöne yatar.
5. **ARABA → v2 (tur-4, §2-v2):** `el` (P01a insert) · `pencere` (P01b, dışarıdan yolcu kapısı, gece, fener) · `kucak` (P05, tepeden) · `dis` (P09a, yakın). Aşağıdaki v1 notu geçersiz. ~~v1: **kukla tiyatrosu kesiti** (yakın kapı yok). Araba sola bakar: ön koltukta Moyzisch (solda, geri dönük), arka koltukta Bazna (sağda, öne eğik). İki profil birbirine bakar, aralarında ön koltuk sırtı durur. Arka yan camdan elçiliğin **zemin kat** daktilo penceresi iki başın arasında görünür. Kamera araba tabanından 1.05 m yükseklikte, ufuk y 670 (§2.3). Daktilo penceresi "2. kat" değil zemin kat. Gerekçe: oturan kameradan yan camın üst kenarı ~7° yukarıyı keser, üst kat görünmez (fizik).~~
6. **Elçilik cephesi nötr, 1930'lar Ankara modern-klasik:** düz sıva, düz lento pencere, kat silmeleri, düz çatı + parapet, koyu **andezit taş subasman**, kapı üstünde ince **beton saçak**. Bayrak, arma, tabela yok. Bina kimliği iddia edilmez [G, doğrulanmalı].
7. **Işık yönü:** (ARABA kısmı v1, geçersiz → v2 tek kaynak elçilik feneri §2.4) ~~ARABA güneşi **sol-ön-uzak** (ön yan camın ardından, alçak) gelir. Bazna'nın yüzü sıcak ışık alır, Moyzisch kontra kalır.~~ Berlin lambası sıcak ama **daha az doygun ve sert kenarlı** (sahnenin "soğuk-nötr" isteği oda tonuyla verilir, havuzla değil: sıcak piksel ölçütü).
8. **Dokunuş yüzeyleri ve sapmalar:** tepsi komodine sığmıyor (lamba + kutu doluyor), yeri **yatak ayak ucu sağ köşesi**. Yönetmene P02b/P03a/P08 konumları §1.8'de, ARABA ve MASA-INSERT koordinatları §2–§3'te.

---

## 0. Ortak sistem

### 0.1 Koordinat
- Dekor px = 1080×1920 cs 1 tabanı. Kit: `ekran = (d − 540|960)·cs + 540|960 + (cx|cy)`. cx/cy pan/tilt'tir, parallaks vermez.
- Her görünümde fiziksel kamera yazılıdır: F (px), göz yüksekliği, ufuk y, düzlem ölçeği px/m = F/Z. Figür ve yapı ölçeği buradan türer (ufuk–ölçek kuralı).
- **Dünya modeli sabit:** dekor, seed'li düzensizlik ve ışık dünyaya bağlıdır, kameraya ya da kareye bağlanmaz (Paris "şehir titriyor" dersi).

### 0.2 Mesafeye göre ayrıntı
| Sınıf | ekran px/m | Kontur (`KONTUR`) | Doku | Tarama | Süsleme |
|---|---|---|---|---|---|
| insert | ≥ 900 | 4 (prop) – 6 px (dekor) | ahşap damarı, kâğıt lifi, döşeme kumaşı | yalnız §0.4 yerleri | yok |
| yakın | 150–900 | 5–6 px | kumaş kıvrımı, parke çizgisi, kapı panosu | §0.4 | imza ayrıntı |
| orta | 35–150 | 4 px | yalnız ana çizgi (cephe silmesi, pencere sövesi) | yalnız pencere içi | imza (andezit, saçak) |
| uzak | < 35 | 3 px / yok | düz ton | yok | tek siluet |
Tasarım §0.1 çizgi ailesi geçerlidir: tarama ≥ 2 px, aralık ≥ 6 px. Yarım pikselin altına inen çizgi çizilmez (360 px kontrolü).

### 0.3 Doku (yüzey başına ≤ 3 katman, seed sabit, kaynamaz)
1. **Taban deseni:** ahşap damarı (`AhsapYuzey` `ceviz`/`doseme`/`boyali`), kumaş pli çizgisi, sıva lekesi (feTurbulence `baseFrequency .012`, `numOctaves 2`, α .05), andezit derzi (`TasDuvar`, bulutlanma kapalı).
2. **Tarama:** `Tarama.tsx`, yalnız §0.4 yerlerinde, açı = `taramaAcisi(isik)`.
3. **Kâğıt + gazete tanesi:** `ArsivKatmani` (kâğıt `#e9dfc9` multiply α .14 + lif + 6–10 soluk leke; gölgede rastgele tane α .10, ızgara değil). Gece ve sönük görünümde `geceLapis`, gündüz/akşam görünümde `gunduzMineral`.
- Bir yüzeyde en çok 2 düz ton basamağı. Yumuşak gradyan yok (istisna: gök 3 basamak, lamba V'si ve havuzunun **kenarı net**, içi 2 basamak).
- **Yeni `DOKU_SEED`:** `elciOda: 181`, `araba: 191`, `ankaraCephe: 193`, `komodinInsert: 197`, `berlinMasa: 199`, `baznaMasa: 211`.

### 0.4 Tarama nerede (ışığın biçimi anlattığı yer; geniş yüzeyde yok)
Renk gece `#2e3048`, gündüz `#6a6488` · α .55 · aralık `TARAMA_ARALIK` (yakın 7.5, insert 7) · kalınlık 2.2/2.4 px.
- **ELÇİ-ODASI:** abajur dış yüzünün gölge yarısı · komodinin ışık almayan yan yüzü ve çekmece pervazı altı · kutunun düşen gölgesi (küçük, III) · kapı sövesinin iç yanağı · perde kıvrımlarının dip çizgileri (3–4 kısa dikey öbek) · tavan kartonpiyeri altı (ince şerit) · yatak örtüsü saçağı altı. **Duvar, döşeme, halı ve yatak yüzeyinde tarama yok.**
- **ARABA (v2):** §2.11 listesi (saçak altı, çamurluk altı/kavsi, kapı alt kıvrımı şeridi, uzak cam çerçevesi iç kenarı, kanepe sırtı gölge yanağı, direksiyon göbeği gölge yanı). Gövde, cam, oturak, yol taramasız.
- **MASA-INSERT:** kutu/çekmece/zarf düşen gölgesi (küçük, III; çapraz IV yalnız ≤120 px kutuda) · masa ön kenar pervazı altı · lamba kaidesinin gölge yanı.

### 0.5 Işık (mekân başına tek tanım; huzme, havuz, gölge ve tarama açısı buradan türer)
| Görünüm | Kaynak (tek) | `Isik` tanımı (öneri) | İkincil (ayrı tanım, kendi havuzu) |
|---|---|---|---|
| ELÇİ gece | başucu lambası, ampul (u −0.83, h 1.00, z 4.85) | `nokta`, renk `#efd0b6`, havuz §1.6 | banyo kapı altı (kapı ardında, h 2.0) → yalnız şerit + zemin havuzu · ay yaması (pencere, `yonlu`, α .30, hep var) |
| ELÇİ gündüz | pencere güneşi, yükseklik 30°, odaya doğru, hafif sola | `yonlu` yon [−0.30, 0.95] | lamba sönük |
| ELÇİ sönük (P09b p292+) | ay yaması (pencere) tek kaynak | aynı ay tanımı, α .30 → .45 | yok |
| ARABA v2 (el, pencere, kucak, dis) | **elçilik duvar feneri** (kapının sağı, h 2.0), §2.4 | `nokta`, `#efd0b6` | yok. Daktilo ve yanık pencereler yalnız kendi camı + küçük yamuk, kaynak sayılmaz |
| MASA komodin | aynı başucu lambası (kadrajın sol-üstünde) | `nokta` | — |
| MASA berlin | metal kubbe masa lambası, sağ-üst | `nokta`, renk `#e6cfb2` | — |
| MASA bazna | aynı başucu lambası, sol-üst, boyun masaya eğik | `nokta` | P10 p0–24: yalnız soğuk ay dolgusu |
- **Lamba yanışı/sönüşü:** huzme ve havuz **kaynaktan uzar/çekilir** (14 kare, radyal silme). Fade yok.

### 0.6 Palet ekleri (tasarım §2'de olmayanlar; hepsi L\* ≤ 88, C\* ≤ 28; ölçüm Lab, D65)
| Ad | Hex | L\*/C\*/h° | Not |
|---|---|---|---|
| lamba yayılma basamağı (duvar/zemin, V ve havuz çevresi) | `#7a6658` | 45/12/63 | sıcak piksel sayılır (C\* ≥10) |
| gece duvar en koyu (köşe, tavan uzak) | `#2e3350` | 22/19/289 | |
| tavan (gece) | `#3a3d58` | 27/18/290 | V'nin değdiği yer `#c8a98e` |
| perde gölge / ışıkta | `#4f4658` / `#8a6f6c` | 31/12 · 49/12 | ağır kumaş, desensiz |
| kapı (boyalı ahşap) gece / gündüz | `#4a3f52` / `#9a8f9c` | 28/13 · — | kol yuvarlak koyu metal `#4a4a52` |
| kapı altı şerit / önündeki havuz / ayak gölgesi | `#e4bc98` / `#8c6f66` / `#2a2638` | 79/25 · 49/14 · 16/13 | |
| ay yaması (zemin/örtü) | `#5d6890` | 45/24/285 | |
| gündüz duvar dolaylı / güneş yaması | `#c0a48c` / `#e0c8b2` | 69/18 · 82/15 | ikisi de sıcak sayılır |
| dış gece: gök / sırt | `#4d5b84` / `#2f3550` | | hilal `#8da0c8` (tasarım) |
| dış gündüz: uzak bozkır sırtı | `#c9b8a0` | 76/15 | [G] Ankara bozkırı, nötr tek siluet |
| araba tavan döşemesi ışıkta / gölgede (v1, kullanılmaz; v2 renkleri §2.8) | `#9a8070` / `#4a4560` | 56/14 · 31/17 | |
| araba kesit kenarı (v1, kullanılmaz) | `#26283a` | 17/13 | |
| araba krom (kapı kolu, cam kolu) | `#8e8e96` | 59/5 | sarı metal yok |
| cephe sıva ışıkta (ic, sıyırma güneş) / akşam | `#c4ae96` / `#6e6470` | 72/16 · 44/8 | |
| cephe gölge (pencere yanağı) | `#8f8aa0` | 59/13 | |
| andezit subasman | `#5e5a66` | 39/8 | [G] Ankara andeziti koyu pembe-gri |
| daktilo penceresi içi | `#e8c9a4` | 83/23 | cepheden ΔL\* ≥ 10 |
| uzak ağaç/pus (gündüz) | `#d9b896` / `#b39a8a` | 77/23 · 65/14 | |
| kaldırım / yol akşam / yol yakın | `#55606e` / `#2f3550` / `#26283a` | | |
| 2. araba (P09a, koyu yeşil, v2'de de) | `#3d4640` | 29/6 | Moyzisch arabası `#262836` (aynı model, farklı renk) |
| Berlin lamba çekirdek / orta / oda en koyu | `#e6cfb2` / `#b89c86` / `#2e3048` | 84/18 · 66/17 · 21/16 | |
| Bazna masası ışıkta çekirdek | `#a6826c` | 57/20/58 | masa ışık `#8c6f66`, gölge `#5a4a44` (tasarım ahşap ailesi) |
| Bazna masası sönük (P10 p0–24) | `#2f3450` | 22/19 | P09b son karesiyle aynı hex (taşıyıcı) |
| komodin üstü lamba dibinde | `#a07f6c` | 56/18/57 | |

---

## 1. ELÇİ-ODASI — IC-ODA `oda: "elci-yatak"` (P02b, P03a, P04b, P08, P09b)

### 1.1 Duygusal amaç ve görsel dil
**Tek cümle:** güvenli sanılan özel oda: sıcak, yumuşak, sessiz. Ama her yüzey gözetleniyor; ışık yalnız bir köşeyi aydınlatır, gerisi mor-mavi karanlıkta dinler.
- **Şekil:** dikey (perde, kapı, lamba V'si, pencere) ve tek yatay (yatak + komodin hattı). **Ritim:** arka duvarda dört dikey açıklık/kütle (yatak başı · komodin-lamba · pencere · kapı). Aralıkları eşit değildir (0.15–0.4 m), tekdüze sıra yok.
- **Renk sıcaklığı:** sol-üstte sıcak V, sağda soğuk pencere ve kapı. Sahnede ikinci sıcak, kapı altındaki ince kehribar çizgidir. **Kontrast:** yüksek, yerel. Odanın geneli L\* 22–35, V çekirdeği L\* 85.
- **Boşluk:** tavan + V üst üçte biri doldurur. Halı, döşeme ve yatak ayak ucu alt üçte biri doldurur.

### 1.2 Mimari kart
| Madde | Karar |
|---|---|
| Dönem ve üslup | 1930'lar sonu yapılmış diplomatik konut iç mekânı [A: konut 1930'lar sonu; konum/plan doğrulanamadı → nötr]. Erken modern-klasik iç mekân: sade sıvalı duvar, kartonpiyer, ahşap süpürgelik [G]. Süs, arma, tablo, ayna **yok**. |
| Yapı tipi | Konutta yatak odası, üst kat [T]. Tek oda kutusu. Banyo bitişik (arka duvar sağ), giriş kapısı sol yan duvarda (z 2.3–3.1, kadraj dışı). |
| Ölçü | Genişlik 4.2 m (u −2.1…2.1), derinlik görünür kısım z 1.7–5.0, **tavan 3.2 m** [G: dönem konut tavanı 3–3.5 m]. Arka duvar z 5.0 (`arka: 5.0`). |
| Duvar / tavan / döşeme | Duvar: boyalı sıva, 0.12 m koyu ahşap süpürgelik. Tavan: düz sıva, duvar–tavan birleşiminde 0.15 m içbükey kartonpiyer (tek profil çizgisi). Döşeme: **şerit parke** [G], tahtalar kameraya doğru uzanır (kaçış noktasına yakınsar), genişlik 0.07–0.10 m seed'li. Merkezde düz halı (u −0.95…1.0, z 3.1…4.4), 0.12 m kenar bandı, desen yok. |
| Açıklıklar (hepsi **düz lento**, kemer yok) | **Pencere** u −0.15…0.55 (0.7 m), denizlik h 0.85, üst h 2.35. **İki kanatlı**, her kanatta 1 yatay kayıt (4 cam). 0.08 m söve, denizlik 0.05 m çıkıntılı. Üstte perde kutusu h 2.45–2.60 (u −0.35…0.75). İki yanda ağır perde, toplu: sol u −0.35…−0.15, sağ u 0.55…0.75. **Banyo kapısı** u 0.95…1.75 (0.8 m), h 2.10, menteşe sağda (u 1.75), **içeri (banyoya) açılır**. 0.08 m düz söve, kapı kanadı **iki yatay pano** (alt büyük, üst küçük). Yuvarlak kol (u 1.03, h 1.0). Kapı altı aralığı 0.02 m. |
| Mobilya | **Yatak** (tek kişilik [T/G]) u −2.0…−1.05, başı arka duvarda, ayak ucu z 3.1. Baş tahtası koyu ahşap, h 1.05, üst köşeler yuvarlak (r 0.08). Şilte üstü h 0.55. Örtü yere kadar sarkar (h 0.08), ayak tahtası yok. **Komodin** u −0.95…−0.30 (0.65), z 4.55…5.0, h 0.62: üstte tek çekmece (P09b) h 0.45–0.58, altında açık raf. Ceviz. **Lamba** komodinde sol-arka (u −0.83, z 4.85): kaide ø 0.15; boyun 0.32 m, üstte tek mafsal; koni abajur 0.16 m yüksek, alt ø 0.24, üst ø 0.09; ampul h 1.00 (görünmez). **Kutu** komodinde sağ-ön, uzun kenarı önde: u −0.72…−0.34, z 4.60…4.88, h 0.12. Kilit plakası ön yüz ortasında. **Tepsi** (P03–P04 bekler) yatak ayak ucu sağ köşesinde (u −1.25, z 3.35, h 0.55). |
| Kameradan görünen | Göz 1.6 m (IC-ODA). **Tavan görünür** (göz < 3.2), kartonpiyer çizgisi ufkun üstünde. Komodin ve şilte **üstten** görünür (h < 1.6): kutu kapağı, belgeler ve anahtar okunur. Abajurun **içi görünmez**, alt ağzının kenarı ince sıcak hilal (`#e8c9a4`) olarak görünür. Pencere dışından yalnız gök ve uzak sırt görünür, sokak görünmez (üst kat). |

### 1.3 Geometri (dekor px, cs 1; F 1150, ufuk 760, göz 1.6; `X = 540 + u·F/z`, `Y = 760 + (1.6 − h)·F/z`; arka duvar 230 px/m)
| Öğe | dekor x | dekor y | Not |
|---|---|---|---|
| Tavan–duvar çizgisi (h 3.2, z 5) | 57–1023 | 392 | tavan y 0–392 (yamuk, kameraya doğru açılır) |
| Yatak başı tahtası | 80–298 | 885 (üst) – 1128 | şilte üst ön kenarı (z 3.1) y 1149 |
| Komodin ön yüzü (z 4.55) | 300–464 | 1008 (üst) – 1165 | çekmece pervazı y 1022–1050 |
| Lamba ampulü | 343 | 902 | abajur alt ağzı y ≈ 916, ø 57 px |
| Kutu ön yüzü (z 4.60) | 357–451 | 976–1006 | |
| Pencere camı | 506–667 | 588–932 | perde kutusu y 563–588 |
| Banyo kapısı | 759–943 | 645–1128 | söve 741–961 · şerit y 1124–1132 |
| Kapı önü havuzu (z 4.5) | 744–1026 (ön kenar) | 1128–1169 | yamuk, öne doğru 1.1 m genişler |
| Halı | — | 1128 (arka) – 1354 (ön, z 3.1) | |

### 1.4 Katmanlar (arkadan öne)
1. **Pencere dışı** (gece): gök `#4d5b84` 2 basamak (üst `#3e4a72`), hilal `#8da0c8` (ø 22 px, camın sağ-üst çeyreği, sol kanat kaydının arkasında değil), uzak sırt `#2f3550` (camın alt %18'i, seed'li 3 tümsek). Gündüz: gök `#a9b7cc` → ufuk `#f0d0bc`, sırt `#c9b8a0`, flu (blur 3 px). **Yalnız tek bir görünüm. Sokak, kale, minare yok** (Ankara silueti doğrulanamadı [A §5]).
2. **Cam:** dalgalı eski cam değil (1930'lar düz cam [G]). Tek yansıma çizgisi α .12, kanat kayıtları `#3a3040`.
3. **Arka duvar + tavan + kartonpiyer + süpürgelik.**
4. **Lamba V'si (duvar + tavan)** ve yayılma basamağı.
5. **Kapı, söve, kapı altı şerit + havuz + ayak gölgeleri** (banyo kaynağından).
6. **Perdeler** (pencere önünde, z 4.96).
7. **Komodin, kutu, lamba** (z 4.55–5.0).
8. **Yatak** (z 3.1–5.0) + örtü + belgeler (P04).
9. **Döşeme + halı + ay yaması + lamba aşağı konisi** (zemine kırpılı).
10. **Karakterler** (z sıralı; temas gölgesi lambadan, `Golge stil: gravur`).
11. **Ön-plan çerçeve:** yok (iç mekân). Alt üçte bir doldurmayı halı kenarı + yatak örtüsü sarkması + parke yapar.

### 1.5 Malzeme ve doku
| Yüzey | Malzeme | Doku tarifi | Kod yöntemi | Parametre |
|---|---|---|---|---|
| Duvar | boyalı sıva | düz ton, çok hafif leke, tarama yok | feTurbulence | bf .012, oct 2, α .05, seed 181 |
| Tavan | sıva + kartonpiyer | düz ton; kartonpiyer altında 1 ince tarama şeridi | `Tarama` II | şerit 14 px |
| Parke | ahşap şerit | tahta çizgileri kaçış noktasına yakınsar, damar yok (orta sınıf) | `AhsapYuzey tur: "doseme"` | tahta 0.07–0.10 m seed 182, `#3a3040`/`#5a4a44` |
| Halı | yün, düz | tek ton + kenar bandı (koyu 1 basamak), lif yok | düz dolgu | gece `#4a4466`, havuzda `#8c6f66` |
| Yatak örtüsü | ağır pamuk/yün [G] | 3–4 seed'li kıvrım eğrisi (sarkmada dikey), beyaz değil | yol + ton | ışık `#cdb5a8`, gölge `#5b5575` |
| Baş tahtası, komodin | ceviz | damar dikey, budak yok, üst kenarda cila parlaması (1 kısa çizgi) | `AhsapYuzey tur: "ceviz"` | seed 183, `#6b5148`/`#3a3040` |
| Kapı | boyalı ahşap | pano çıtaları 1 ton koyu, düz | yol | `#4a3f52` |
| Perde | ağır kumaş | dikey kıvrım çizgisi, aralık 18–34 px seed'li; dipte kısa tarama öbekleri | yol + `Tarama` | seed 184 |
| Abajur | kumaş, koyu yeşil | dış düz `#3f4a45`; alt ağız içi sıcak hilal `#e8c9a4` | yol | kenar 2 px |
| Kaide/boyun | koyu metal | tek parlama noktası (lamba yanıkken) | yol | `#4a4a52`, nokta `#c4b5a8` |
| Pencere camı | düz cam | 1 yansıma çizgisi | çizgi | α .12 |

### 1.6 Işık: gece (`isik: lamba`)
- **Kaynak:** ampul (u −0.83, h 1.00, z 4.85) = dekor (343, 902). Abajur iki koni keser:
  - **Aşağı koni** (yarım açı 40°, eksen boyun açısından). Boyun dik iken (P02, P03, P09b) eksen düşey: komodin üstünde ø ≈ 0.65 m daire (komodini taşar, yatak başının sağ köşesine ve zemine düşer). Boyun bükük iken (P04 p104+): eksen yatağa doğru sol-öne, `[Δu −0.55, Δh −0.45, Δz −0.70]`. Yatak üstünde elips merkezi (u −1.3, z 4.05), yarı eksenler 0.55 × 0.70 m. Kenar net, içi 2 basamak (`#efd0b6` çekirdek %40, `#c8a98e`).
  - **Yukarı V** (üst ağız ø 0.09, yarım açı 24°). Duvarda kenarları net bir V/hiperbol olarak h 1.05'ten tavana çıkar, tavanda yay biçiminde biter. Dik boyunda simetrik. **Bükük boyunda V ters yöne, sağa yatar** (sol kenar düşeyden −8°, sağ kenar +34°). İç basamaklar: alt %35 `#efd0b6`, üst `#e4bc98`, en dış 50 px `#c8a98e`.
  - **Yayılma basamağı:** V ve aşağı koninin çevresinde 60–90 px'lik bir bant `#7a6658` (duvar, zemin, komodin yanı). Sıcak piksel kotası buradan tamamlanır.
- **Gölgeler:** lambadan uzağa, net kenar. Kutu gölgesi komodin üstünde sağ-öne, karakterlerin zemin gölgesi sağ-öne düşer (P04'te Bazna'nın gölgesi kapıya doğru uzar: kapı ile Bazna arasındaki gerilimi çizer).
- **Kenar ışığı:** lambaya bakan siluet kenarı `#f0c4a8` 2 px, kırık parça. Bazna lambanın sağında durduğu için kenar ışığı **sol omuz/sol yanak çizgisi**ndedir.
- **Pencere:** cam kendi ışığını odaya yaymaz. **Ay yaması** (hep var, α .30) pencere önünde zeminde paralelkenardır: z 4.9 → 3.9, u −0.35 → 0.25 (sola kayar). Lamba yanıkken bu yama sıcak katmanların altında kalır.
- **Kapı altı (ikincil):** şerit `#e4bc98`, 8 px (cs 1). Önündeki havuz yamuk `#8c6f66` (kenar net, z 5.0 → 4.5). **Ayak gölgeleri (P04 p228–330):** 2 koyu kama `#2a2638`, kapı merkezinin ±0.12 m'sinde. Şeritte 0.10 m genişlikle başlar, havuz ön kenarında 0.16 m'ye açılır (kaynak kapının ardında, yerden yüksek → ışınsal genişleme). Gelişte kama önce şeridi böler (p228), sonra havuz boyunca uzar (p248). Çekilişte ters sırayla döner (p312–328). Kapı açılışında (P02 p210–246) zemine kapı açıklığı kadar bir ışık kaması düşer. Kanat kapandıkça daralır ve şeride iner.

### 1.7 Işık: gündüz (P08) ve sönük (P09b p292+)
- **Gündüz:** güneş pencereden içeri, yükseklik 30°, yön [−0.30, 0.95]. Zeminde **güneş yaması**, net kenarlı paralelkenar `#e0c8b2`: z 3.53 → kadraj altı, u −0.15…0.55 önde sola kayar (−0.3 m/m). Kayıt gölgeleri yamada 2 koyu şerittir. Duvarlar dolaylı `#c0a48c`, köşeler `#a39cb6`. Lamba sönük (abajur içi `#6a5a50`). Pencere kontra: perde kenarları ve yetkili/Bazna silueti cam önünde koyu, kenar ışığı `#f0c4a8` pencere tarafında. Tarama rengi `#6a6488`.
- **Sönük (P09b p262–292 → p292+):** p262 düğme. Filaman p262–292 şeftali-kor `#e8a276`, ≤ %0.3 ekran (tasarım istisnası). V ve havuz **ampule doğru çekilir** (fade değil, 14 kare). p292'den sonra: duvar `#2e3350`, tavan `#26283a`, ay yaması α .45 (tek kaynak), Bazna silueti ay yamasının kenar ışığıyla (`#8da0c8` 2 px, sağ kenar). En koyu `#14120f` altına inilmez. **p292–370 için p95 L\* ≥ 75 aranmaz** (lint izni önerisi: `{izin: ["p95L"], not: "lamba söner = dokunuş; oda kasıtlı karanlık"}`). Bunun yerine pencere camı L\* ≥ 37 ve ay yaması ≥ %3 alan ölçülür.

### 1.8 Dokunuş/eylem yüzeyleri ve konumlar (yönetmene; z/u öneri, kalibrasyonda ölçülür)
| Plan | Kim / ne | z, u | Ayak y (cs 1) | Not |
|---|---|---|---|---|
| P02b | Bazna (tepsiyle bekler) | 3.6, −0.90 | 1271 | yatak sağ kenarının önünde. Tepsiyi yürürken yatak köşesine bırakır (u −1.25, z 3.35) |
| P02b | Elçi (komodin başında, sırtı bize) | 4.20, −0.20 | 1198 | Bazna'dan ekran x farkı 232 px ✓. Banyo yolu (−0.2, 4.2) → (1.35, 4.85), pencerenin önünden: siluet maviye karşı |
| P03a | Bazna komodinde | 4.20, −0.30 | 1198 | (−0.9, 3.6)'dan 0.85 m = 2–3 adım (sahne 4 adım dedi: yönetmen ayarlar) |
| P04b | Bazna (çeker, donar) | 3.80, 0.15 | 1244 | pencere önünde, lambanın sağında. Belgeler yatakta u −1.5…−1.1, z 3.7…4.4 |
| P08 | Yetkili (kutuya eğik) | 4.20, −0.30 | 1198 | komodin önünde |
| P08 | Bazna geçişi | sağ kenar (z 3.5) → (−0.9, 3.25) → sol kenar z ≥ 3.2 | ≤ 1335 | yatak ayak ucunun (z 3.1) hemen önünden çıkar. Güneş yamasına girer |
| P09b | Bazna (komodin çekmecesi, lamba düğmesi) | 4.20, −0.30 | 1198 | düğme kaide üstünde, sağ yan |
- Anahtar (P02–P03): komodin üstünde, kutunun solunda ve lambanın önünde (u −0.80, z 4.62). Lamba havuzunun çekirdeğinde, tek parlak metal.
- Komodin çekmecesi (P09b): ön yüz y 1022–1050, ortada küçük yuvarlak koyu metal düğme.

### 1.9 Kamera önerileri (json sahibi yönetmen; hepsi kontrol karesinde doğrulanır)
| Plan/aralık | cs | cx | cy | Kadrajda |
|---|---|---|---|---|
| P02b p150 → p349 | 1.00 → 1.12 | −80 | −40 | tüm arka duvar. 1.12'de Bazna ayağı 1268 ✓ |
| P03a | 1.12 | −80 | −40 | (P02 sonuyla eşit) |
| P04b p58–200 (belgeler + çekim) | 1.40 | +200 | −90 | yatak sağ yarısı + belgeler + lamba + Bazna (yatağa eğik) |
| **P04b p200–240 pan → p382 (K-A)** | **1.40** | **−170** | **−90** | lamba (sol kenar) · komodin + kutu · pencere önünde Bazna · kapı + şerit |
| P08 bel | 1.40 | +40 | −120 | yetkili + komodin + pencere. Push 2.2'de eli/fincanı ortala |
| P09b | 2.20 | +433 | +132 | lamba ortada, sağ kenarda pencerenin sol yarısı (mavi; P09a gök taşıyıcısı) |
cs 1.7'de (sahne önerisi) kapı şeridi y ≈ 1330'a düşer (alt bant). Lamba ve kapı birlikte sığmaz. Bu yüzden 1.4.

### 1.10 K-A — P04 p270 (mutlak 1491) "bu kare böyle görünmeli"
Kamera cs 1.4, cx −170, cy −90. Ekran konumları: lamba ampulü (94, 789), V duvarda sol-üstten tavana sağa yatık · komodin x 34–264, üst y 937, kutu açık kapağıyla üstünde · pencere x 322–548, y 349–831, mavi cam ve hilal · **Bazna** x ≈ 433 (gövde 327–539), baş y ≈ 548–650. Pencerenin önünde koyu siluet, sol omzunda sıcak kenar ışığı, başı sağa (kapıya) dönük, makine göğüs hizasında donmuş · **kapı** x 677–934, üst y 429. **Şerit** y 1105, iki koyu ayak kaması x ≈ 770 ve 840. Havuz y 1105–1163 · Bazna'nın zemin gölgesi sağa (kapıya doğru) uzanır · alt üçte bir: halı kenarı, parke, Bazna'nın ayakları y 1268.
**Kabul ölçütleri (eleştirmen ölçer):**
1. Sıcak piksel (h 20–80°, C\* ≥ 10) **≥ %18** (havuz şartı; ≥ %14 genel ölçüt otomatik geçer). p95 L\* **≥ 75**. Max L\* ≤ 88, max C\* ≤ 28 (filaman yok).
2. Kapı altı şerit genişliği ≥ 192 px (beklenen 258). Şerit ve havuz y 420–1290 içinde. Ayak kamaları 360 px sayfada iki ayrı koyu çentik olarak okunur (her biri ≥ 8 px).
3. Tek ışık tutarlılığı: V'nin yatma yönü, Bazna'nın kenar ışığının tarafı (sol) ve zemin gölgesinin yönü (sağ-ön) aynı ampul konumundan türer. Kapı havuzu kendi kaynağından türer; iki gölge sistemi karışmaz.
4. Bazna ayak y ≤ 1280, baş üstü ≥ 420 (yazı bandı dışı). Pencere ile Bazna siluetinin kontrastı ΔL\* ≥ 10.
5. Duvar/döşeme/halıda tarama yok. Tarama yalnız abajur, komodin yan yüzü, kapı sövesi ve perde dibinde. Kafes ve çapraz tarama yok (kutu gölgesi hariç).
6. Sıcak–soğuk okunur: sol-üst sıcak, sağ ve alt mor-mavi. 32 kare genel bakışta oda "ışıksız" görünmez.
7. Yatak ve belgeler bu karede kadraj dışında olabilir (bilinçli, §1.9). Belgeli ek kontrol karesi p170 önerilir (yatakta elips havuz + belgeler ≥ 60 px/sayfa @360).

---

## 2. ARABA

### 2.0 v1 (eski, 2026-11-14; tur-4'te reddedildi, yalnız kayıt)
Kukla tiyatrosu yan kesiti (yakın kapı yok), gündüz alçak güneş sol-ön, Moyzisch ön koltukta geri dönük, Bazna arka koltukta. `dis`: cephe karşıdan, park araba Z 12.5. **Neden reddedildi** (kullanıcı tur-4 "Araba planları iyi değil", "Araba içleri iki yerde var", "El kol doğru değil özürlü gibi"; orkestra teşhisi): (1) araba okunmadı: direksiyon, panel, yuvarlak köşeli cam, kapı kolu, çamurluk yoktu, kesit tren/otobüs kompartımanı gibi okundu; (2) Moyzisch tek ton koyu blok; (3) eller soluk, büyük, bilekten sarkık, kol omuza bağsız; (4) alt yarı boş koltuk ve döşeme; (5) banknot devri küçük; (6) P01 ile P05 aynı açı ve ölçekteydi; (7) **v1 hatası:** `dis`te park araba Z 12.5'teydi, yani kaldırımın (Z 11–14) üstünde. v1 tabloları silindi. Elçilik cephesi kartı (eski §2.6) korunur, §2.9'da güncellendi.

---

## 2-v2. ARABA v2 (2026-11-15, tur-4) · `gorunum: "el" | "pencere" | "kucak" | "dis"`

### 2.1 Karar özeti (orkestra için)
1. **Dört görünüm, üçü farklı açı.** Hiçbir görünüm iki planda aynı açı ve ölçekle tekrar etmez (kullanıcı: "Araba içleri iki yerde var").
   | Plan | Görünüm | Açı | Ölçek | Ne okutur |
   |---|---|---|---|---|
   | P01a (p0–110) | `el` | içeriden, yolcu tarafından sürücüye, yan-alçak, 25° aşağı | insert | banknot devri, imza nesnesi |
   | P01b (p110–438) | `pencere` | **dışarıdan**, kaldırımdan yolcu kapısına, yatay | göğüs/bel (iki kişi + kapı) | "araba + iki adam + elçilik penceresi" |
   | P05 (tümü) | `kucak` | **tepeden**, tavandan iki kucağa, 70° aşağı | insert-yakın | film kutusu ve zarf devri, direksiyon tam daire |
   | P09a | `dis` | karşı kaldırımdan elçilik cephesine, yatay | boy (sekreter ≥%12) | kaçış |
   **P05 kararı (gerekçe):** P05'te dışarıdan pencere görünümü işe yaramaz. (a) Film kutusu ≈ 8 cm. Camın dışından en iyi ihtimalle 50–60 px olur, şart ≥130 px. (b) Kucaktaki devir camın alt kenarının (bel çizgisi) altında kalır, dışarıdan görünmez. (c) P01b ile aynı açı olur. Tepeden kucak görünümü üç sorunu birden çözer. Direksiyon **tam bir halka** olarak okunur (yandan çizgi gibi görünürdü). İki kucak, iki el ve iki nesne aynı karede durur. Zarfın kucağa konması (p118 temas) görünür. **Kaybedilen:** P05'te daktilo penceresi yok. Kurulum P01b'de yapılır (kurulum → P09a karşılık zinciri bozulmaz). Senaryo P05 sahne notundaki "pencerenin ardında cephe, daktilo" satırı senarist ve yönetmene not (§2.12).
2. **Saat: alacakaranlık-gece (P01, P05, P09a).** Tek kaynak üçünde de aynı: **elçilik kapısının sağındaki duvar feneri** (§2.3). P01/P05'te gündüz güneşi kalkar. "ANKARA · 1943" gece okunur, sorun değil.
3. **Tek sedan modeli, iki renk.** `Sedan40` tek gövde. Moyzisch'in arabası **siyah-lacivert**. P09a'daki kaçış arabası **koyu yeşil** (aynı model). Gerekçe: aynı model dönem ve sokak tutarlılığını verir. Renk farkı "bu başka araba" bilgisini taşır. Aynı renk olsaydı izleyici sekreteri Moyzisch'in arabasına binmiş sanırdı (anlatım: "bir başka arabaya biner").
4. **Araba sağa bakar (ön = sağ)**, sol direksiyon. Kamera yolcu (sağ) tarafında. Bu yüzden Bazna kameraya yakın oturur, Moyzisch uzakta direksiyon başındadır. Kahraman büyük ve yüzlü kalır, Moyzisch aydınlık arka planın önünde siluet olur.
5. **Lamba yansıması yolda:** `pencere` görünümünde fizik gereği **yok**. Fener arabanın ardında, gövde yansıma yolunu keser (hesap §2.5). Sıcak ışık orada arabanın üst siluetinde kenar ışığı olarak görünür. Yoldaki fener yansıması **P09a'da** var (yansıma yolu açık, §2.9). Orkestra yönünden tek sapma budur.

### 2.2 Duygusal amaç ve görsel dil
**Tek cümle:** karanlık bir sokakta, camın ardında, bir fenerin kenar ışığında yapılan sessiz alışveriş. Dışarıdaki dünya (elçilik, daktilo, fener) çok yakın, ama kimse bakmıyor.
- **Şekil:** `pencere` = yatay bantlar (tavan eğrisi / cam / krom / kapı / basamak / yol) üstünde iki kafa. Camın yuvarlak köşeleri ve çamurluğun kavisi 1940'ları okutan iki eğridir. `el` = köşegen (sağ üst → sol alt el zinciri). `kucak` = halka (direksiyon) + iki yatay uyluk + ortada devir. `dis` = dikey kapı + fener + yatay araba.
- **Ritim:** krom çıta, basamak lastiği nervürleri, deri pli'leri. Hepsi seed'li aralıklı, ızgara yok.
- **Sıcaklık:** fener gül-şeftali (arka plan ve kenar ışığı), gövde ve gölge mavi-mor. **Kontrast:** en açık nokta banknot (P01). Ondan sonra fener çekirdeği, daktilo penceresi, yüz kenar ışığı gelir.

### 2.3 Mimari kart (araç = yapı) · `Sedan40` [G: 1937–42 genel dört kapılı sedan, marka/rozet/yazı yok; araştırmada doğrulanmadı (A §5), nötr]
| Madde | Karar (stilize ölçü, yerden m; **[T]** = okunurluk için hafif abartı) |
|---|---|
| Gövde | Dört kapılı sedan, boy 4.9 m, genişlik 1.75 m (çamurluk dahil), çatı tepesi **1.62**. Ayrık ön/arka çamurluklar, **basamak** (running board) üstü 0.34, gövdeden 0.20 dışarı taşar [G: 1937–42'de basamak hâlâ yaygın, bazı modellerde gizli; doğrulanmalı]. |
| Kat düzeni (yan) | çatı tepe 1.62 · yağmur oluğu 1.48 · **cam üstü 1.42** · **bel çizgisi + krom çıta 0.92** (cam altı) [T: gerçekte cam ≈0.40 m, burada 0.50, kapı 0.52] · kapı altı 0.40 · basamak 0.34 · zemin. |
| Açıklıklar | Ön kapı camı: **dört köşesi yuvarlak dikdörtgen**. Arka-üst köşe r 0.07 m, arka-alt r 0.03, ön-üst r 0.10. Ön kenarı A direğine paralel eğik. **Üçgen havalandırma camı** (vent), ince krom dikme ile ayrılır [G: 1930'ların ortasından itibaren yaygın, doğrulanmalı]. B direği dik, A direği geriye yatık (≈14°). Kemer yok. |
| Süsleme (imza, iki tane) | (1) **yuvarlak köşeli yan cam + krom çerçeve/bel çıtası**, (2) **çamurluk kavisi + basamak**. Ek: yatay **kapı kolu** (krom, itme düğmeli), cam üstü yağmur oluğu. Rozet, yazı, plaka yazısı, bayrak **yok**. Plaka: yazısız koyu dikdörtgen (yalnız `dis`). |
| İç | Ön **tek parça kanepe** (oturak üstü 0.60, sırt üstü 1.12, yuvarlak rulo üst). Kaplama **koyu deri, dikey/boyuna rulo pli + dikiş** [G: deri ya da sık yün, ikisi de dönem içi; deri seçildi, ışığı daha iyi tutuyor]. Tavan döşemesi iç 1.55. **Direksiyon** ø 0.43 m, ince jant (0.025), 3 kollu, 30° yatık. Kolon panele iner. **Ön panel (gösterge tablosu)** üstü 1.00, alt kenarı 0.78, krom şerit + 1 yuvarlak düğme [G]. Dikiz aynası ön cam üstünde ortada. |
| Kameradan görünen | `pencere`: göz 1.25, çatının altındasınız. **Çatı yüzeyi görünmez**, yalnız tavan eğrisinin silueti ve yağmur oluğu görünür. Kapı ve basamak üstü görünür (göz basamağın üstünde). `kucak`: tavandan, panel üstü ve ön cam görünmez, panel alt kenarı ve direksiyonun tamamı görünür. `el`: direksiyonun yalnız alt yayı ve panelin alt kenarı görünür. `dis`: göz 1.5, çatı tepesi gözün 0.12 m üstünde, çatı yüzeyi görünmez. |

### 2.4 Elçilik cephesi ve fener (bütün ARABA görünümlerinde aynı dünya)
- Cephe kartı eski §2.6 aynen (1930'lar Ankara modern-klasik, düz lento, andezit subasman, beton saçak, kemer yok) [G]. **Değişen:** daktilo penceresi **zemin katta, kapının hemen solunda**. Sıralama soldan sağa: diğer pencere · **daktilo penceresi** (1.1 × 1.6, denizlik +1.2) · 0.35 m · **kapı** (1.4 × 2.6, iki andezit basamak, beton saçak h 3.1) · 1.4 m · **duvar feneri**. Bu sıralama `pencere` ve `dis`te birebir aynıdır.
- **Duvar feneri (tek kaynak)** [T, nötr: sade 1930'lar duvar apliği; dönem/şehir tipi doğrulanmadı]: duvar kolu + buzlu cam küre ø 0.30, merkez h **2.0**. Küre içi `#efd0b6` (L\* 85; ampul görünmez, L\* ≤88). Hale iki net basamak: iç `#e4bc98`, dış `#e0c8b2`.
- `Isik` tanımı (tek): `{ tip: "nokta", ad: "elçilik feneri", konum: dünya (X fener, h 2.0, Z cephe − 0.25), renk "#efd0b6" }`. Cephe havuzu, kaldırım yamuğu, araç içi ışık bandı, kenar ışıkları ve gölge yönleri **hep bu tanımdan** türer. Gök kaynak değildir (yalnız ortam tonu).

### 2.5 `pencere` görünümü (P01b) · kamera, katmanlar, ölçü
**Kamera:** yakın kaldırımda, göz h **1.25**, yatay, F **1265**, ufuk **y 578**. Kapı düzlemi Z **1.62** (780 px/m).
Formül (cs 1): `x = 540 + X·F/Z`, `y = 578 + (1.25 − h)·F/Z`. X araç boyunca m (+ = ön/sağ, 0 = ekran ortası), h yerden m.
Derinlikler: kaldırım bordürü Z 1.10–1.25 · basamak dış kenarı Z 1.42 · kapı/cam Z 1.62 · **Bazna Z 2.07 (611 px/m)** · ön kanepe sırtı X −0.45 · **Moyzisch Z 2.72 (465)** · direksiyon Z 2.55 · uzak cam Z 3.22 (393) · karşı bordür Z 7.7 · **cephe Z 10.2 (124)**.

**Katmanlar (arkadan öne; px cs 1):**
| # | Katman | Konum (x · y) | Renk / not |
|---|---|---|---|
| 1 | Cephe (Z 10.2) | tam genişlik, y −…–720 | sıva `#6e6470`, silme h 4.1 → y 213 (`#7a707c`, 18 px). Fener havuzu (cepheye, fenerden ışınsal, **net kenarlı 2 basamak**): r 300 px `#c8a98e`, r 170 px `#e0c8b2`. 1. kat pencereleri y 0–170: seed 193'le 3 karanlık (`#4d5b84`, gök yansıması), 1 yanık `#e4bc98` (x 180–300). Katman flu 3 px + pus `#a9b7cc` α .20. |
| 1a | **Daktilo penceresi** | x 432–568 · y 386–584 (görünen kısım yalnız uzak cam bandında: y 511–584) | içi `#e8c9a4` (L\* 83). Sekreter (`topuzlu`, `#463f55`) oturur, baş + omuz + daktilo üstü y 522–584 (≈62 px). İki kafanın **arasında**, hiçbiriyle çakışmaz. |
| 1b | Kapı + saçak + basamak | kapı x 612–786 · y 400–722. Saçak x 575–823 · y 338 (h 3.1), altı tarama. Basamaklar y 722–760 | kapı koyu ahşap `#3a3040`. Fener ışığında sağ kanat `#6b5148`. Büyük kısmı A direği ve havalandırma camının ardında kalır. Yalnız ipucu olarak görünür (P09a kurulumu). |
| 1c | **Fener** | küre merkezi **(962, 485)**, r 19 px. Hale r 60 `#e4bc98`, r 110 `#e0c8b2` | A direğinin **sağında**, açık arka plan bölgesinde. Doğrudan görünen tek kaynak. Hale net kenarlı, blur yok. |
| 2 | Karşı kaldırım + yol (Z 7.7–10) | y 690–750 (yalnız A direğinin sağında ve cam bantlarından) | `#55606e`, fener yamuğu `#8c6f66` |
| 3 | Uzak taraf (Z 3.22): uzak kapı içi, uzak cam çerçevesi | uzak cam bandı y **511–653** | çerçeve `#26283a`. Bandın içinden 1 ve 2 görünür. |
| 4 | Tavan döşemesi (iç) | y 446–511, cam üst kenarı ile uzak cam üstü arası | `#3a3d58`, ışıksız, dikişsiz |
| 5 | Ön panel üstü + direksiyon (Z 2.4–2.6) | panel üst çizgisi y ≈ 718, x 800–950 (havalandırma camında). Direksiyon: dar elips, merkez (770, 700), yükseklik 212, en 74 (oran 0.35 [T: gerçekte neredeyse çizgi]), 30° geriye yatık. Bel çizgisi (y 835) altı görünmez | jant `#2a2834`, ışık kenarı `#f0c4a8` 2 px üst-sağda |
| 6 | **Moyzisch** (Z 2.72, siluet `sapkali`) | şapka tepesi y 471, kenar y 520, göz y 560, çene y 620, omuz y 680. Baş merkezi x **660** (şapka kenarı 585–740) | §2.10 poz tablosu. Hafif öne eğik (10°), yüz **sağa** (yola) bakar |
| 7 | Ön kanepe sırtı (X −0.45, Z 1.8–3.1, perspektifle) | yakın uç x 265 → uzak uç x 363, üst rulo h 1.12 (y 644 → 629) | deri `#4f3a3a`, ışık bandında `#7a5a50` |
| 8 | **Bazna** (Z 2.07, Kukla `takim40`, yüzlü, `yon +1`) | baş tepesi y 480, çene y 695 (**baş 215 px**), baş merkezi x **300** (190–410). Omuz y ≈ 770 | §2.10. Sırtı kanepeye yaslı. Bakışı Moyzisch'e (sağa, `bakis [0.9, 0.1]`) |
| 9 | Yakın cam (Z 1.62) | **ana cam x 135–785 · y 446–835**. Köşeler: arka-üst r 55 px, arka-alt r 24, ön-üst r 80. Havalandırma dikmesi x 785–797. Havalandırma camı dikmeden A direği iç kenarına [(840, 450) → (950, 835)] | yansıma: **iki çapraz şerit**, `#6f86ad` α .08, 60 px ve 18 px, A direğine paralel. Yalnız x 135–230 ve x 735–785'te. Banknot yolu ve yüzler şeritsiz |
| 10 | Gövde (Z 1.62): çatı silueti, direkler, kapı | çatı silueti: (0, 300) → (300, 288) → (700, 312) → (880, 380) → A direği dış kenarı (880, 380) → (1000, 845). Yağmur oluğu y 399. B direği x 70–125. Arka kapı dilimi x 0–70. **Krom bel çıtası y 835–851** (x 0 → A direği dibi). Kapı x 128–905 · y 851–1241 (ön kenarı çamurluğa doğru kavisli). **Kapı kolu x 160–280, y 870–892** (krom, sağ ucunda itme düğmesi ø 14). Kapı alt kenarı içe kıvrık y 1241–1262 | gövde `#262836`. Kapının üst omzunda yatay yansıma bandı y 860–905, `#3e4262`. Kapının ortası `#262836`, alt kıvrım `#1c1d2a`. **Siluet kenarı** (çatı, A direği dış, kaput çizgisi, çamurluk tepesi): fenerden 2–3 px `#f0c4a8` |
| 11 | Kaput + ön çamurluk | kaput yan çizgisi (905, 845) → (1080, 862). Çamurluk arka kavisi: (1080, 880) → (960, 960) → (915, 1150) → (930, 1290) basamağın ön ucuna. Lastik dilimi x 1010–1080 · y 1330–1692 | çamurluk `#262836`, **tepe kavsinde sıcak parlama** (fener, arkadan sıyırır) `#c8a98e` 40×6 px. Altı tarama. Lastik `#1e1c26` |
| 12 | Basamak | üst yüz y **1288–1389** (lastik nervür 4 çizgi: y 1300, 1318, 1342, 1370, seed ±4). Dış kenar krom y 1389–1395. Ön yüz y 1395–1424 | lastik `#2a2834`, nervür `#3a3848`. Krom kenarda soğuk parıltı `#8e8e96` |
| 13 | Gövde altı gölge | y 1424–1554 | `#1c1a28`, lastik dilimi. Altında gazete tanesi α .10 |
| 14 | Oluk + su birikintisi (yol, Z 1.36–1.62) | y 1554–1691 | parke taşı (küp, seed'li sıra kayması). Birikinti x 220–760 `#2f3550`, içinde basamak kenarının **kırık yansıması** (3 parça, `#55606e`) |
| 15 | Bordür (andezit) | y 1691–1760 | `#5e5a66`, üst kenar ışığı `#7a7684`, 2 dikey derz (seed) |
| 16 | Kaldırım plakaları (ön plan, ıslak) | y 1760–1920 | `#4a4858` / derz `#2e2c3a`, soğuk ıslak parıltı noktacıkları `#6f86ad` α .5 (8–12 adet, seed 191) |
- **Fener neden yolda yansımaz:** yansıma noktası yolda Z ≈ 1.3'te olur. Feneri gören ışın Z 1.62'de h ≈ 0.3'ten geçer, burası çamurluk/lastik bölgesidir. Işın kesilir.
- **Işık bandı (içerde, fenerden):** fener uzak camın ardından gelir, eğimi ≈ 0.10. Uzak camın üst ve alt kenarı içeride net kenarlı bir **sıcak bant** düşürür. Bazna'da bant h **0.87–1.29** (gözler, burun, ağız, çene, yaka, göğüs). Alnı ve saçı tavan gölgesindedir. Moyzisch'te bant h 0.99–1.35. Bant kenarları sağa doğru 3° yükselir. Uzak A direği, Moyzisch'in omzunu sağ üstten sol alta çaprazlayan 40 px'lik gölge şeridi atar (**"cama vuran çapraz ışık"**).
- **Kenar ışığı yönü:** fener sağ-arkadadır. Yüzlerin **sağa bakan profil kenarı** (alın, burun, dudak, çene) 2–3 px `#f0c4a8` alır. Kameraya dönük yanak gölgede kalır. Bazna'nın yanak gölgesi `#a8866e`: ifade okunsun diye çok koyu değil, `kuklaIsigi` yönü [0.95, −0.1].
- **Gölgeler:** kameraya doğru düşer (görünmez yüzlere). Görünen tek düşen gölge: Bazna'nın başının kanepe sırtındaki gölgesi, sola, 30 px.

**Kadraj üçte birleri:** üst (0–640) cephe + fener + tavan eğrisi + iki baş · orta (640–1280) cam altı + krom + kapı + kol + çamurluk · alt (1280–1920) basamak + gövde altı + birikinti + bordür + kaldırım. Ölü alan yok. Alt bant (1290–1490) yalnız basamak/gölge taşır, önemli nesne yok.
**Kamera hareketi (öneri, json yönetmenin):** p110 cs 1.0 → p438 cs 1.15, merkez Bazna'nın yüzü (cx +35, cy +20). cs 1.15'te Bazna'nın başı 247 px (%12.9). Küçük yüz jesti okunur.

### 2.6 `el` görünümü (P01a, kanca) · insert
**Kamera:** araç içinde, yolcu tarafında, Bazna'nın sol dizi hizasında, göz h 1.15, sürücüye doğru, 25° aşağı. Devir noktası (h ≈ 1.00, kanepenin ortası üstü) kameradan 0.48 m uzakta, **2650 px/m**. Ön = sağ.
| # | Katman (arkadan öne) | Konum (cs 1, p30) | Renk / not |
|---|---|---|---|
| 1 | Uzak taraf: sürücü kapısı içi + Moyzisch'in gövdesi (flu değil, koyu) | x 0–620 · y 0–520 | kapı `#2e3048`, palto `#3c3a4c`. Işık bandının üst kenarı yakasında |
| 2 | **Ön panel alt kenarı** | x 560–1080 · y 0–150. Krom şerit y 140–150, yuvarlak düğme (900, 80) ø 40 | `#2e2c3a`, krom `#8e8e96` |
| 3 | **Direksiyon alt yayı** | halka merkezi (990, 50), r 310, jant kalınlığı 28. Görünen yay x 690–1080 · y 200–360. Moyzisch'in **sol eli** jantı saat 7–8 konumunda kavrar (§2.10) | jant `#2a2834`, ışık kenarı `#f0c4a8` |
| 4 | Ön kanepe sırtı (solda, arka) | x 0–300 · y 150–1300, dikey rulolar (70 px ± seed), üstü y 150'de yuvarlak | deri gölge `#4f3a3a`. Bantta `#7a5a50`, rulo tepesi `#8c6f66`. Dikişler 2 px `#2e2634` + dikiş çizgisi (6 px çizgi, 6 px boşluk) |
| 5 | Kanepe oturağı (ortada, gölgede) | y 700–1920, boyuna rulolar yatay çizgiler halinde. Aralık aşağı doğru büyür: y 1080, 1130, 1195, 1275, 1375, 1500, 1650, 1830 (seed ±6). Sağ altta oturağın ön rulosu çapraz iner, altında koyu taban paspası `#1e1c2c` | rulo tepesi `#4a3a40`, oluk `#2e2634`. **Tarama yok** |
| 6 | Moyzisch sağ ön kolu + eli | kol sağ üst kenardan girer: dirsek kadraj dışı (1130, 380), **bilek (930, 600)**. El sol-aşağı, kıstırma noktası (775, 785) | kol `#3c3a4c`, **manşet koyu** (açık gömlek şeridi yok). Ten §2.10 |
| 7 | **Banknot** (arka yüz + sızıntı .12) | merkez **(540, 930)**, açı **+30°**, uzun kenar **561 px**, kısa 357. Uçları (783, 790) ↔ (297, 1070). Hafif kavisli (köşe kıvrık 6 px), katı levha değil | `#f6f1e4`, sızıntı ters yüz baskısı α .12. **Sahnenin en parlak noktası** |
| 8 | Bazna sol ön kolu + eli (**avuç yukarı**) | kol sol alttan: dirsek (−40, 1440) kadraj dışı, **bilek (230, 1230)**. Avuç banknotun sol-alt ucunun altında, başparmak p42'de üste kapanır | ceket `#3b3a4e` + ecru manşet şeridi `#b8b09c` (0.08 E). Ten §2.10 |
| 9 | Bazna sağ dizi + sağ eli (ön plan) | diz x 0–380 · y 1480–1920, sağ el dizin üstünde dayalı (avuç aşağı, parmaklar diz kapağını sarar) | pantolon `#262536`, ışıksız. El gölge tenleri |
- **Işık bandı (fenerden, uzak sürücü camından):** net kenarlı sıcak bant. Üst kenar (0, 560) → (1080, 470), alt kenar (0, 1230) → (1080, 1080). Bant içinde: iki el, banknot, kanepe sırtının üst yarısı, Moyzisch'in kolunun üst kenarı. **Oturak bandın altında (gölgede).** Fizik: bandın alt kenarı ortada h ≈ 0.99, oturak h 0.60. Böylece banknot ve eller soğuk gölgedeki koltuğun üstünde en yüksek kontrastı alır.
- **Gölgeler:** sola ve kameraya doğru. Banknotun düşen gölgesi oturakta görünmez (çok uzağa düşer). Yalnız **temas gölgeleri** görünür: parmak ile kâğıt arası 4–6 px `#2a2638` α .6, banknotun Bazna'nın avucuna düşen gölgesi.
- **Okunurluk:** el + banknot + manşet bbox ≈ (180, 560)–(1000, 1300) = 820×740 = **%29** (şart ≥ %25). Banknot uzun kenarı ≥ 540 px.
- Üst bant (240–400) yazısı yalnız panel ve direksiyonun üstüne biner, el ve banknot y ≥ 560. Alt bant boş görünmez (diz + oturak).

### 2.7 `kucak` görünümü (P05) · tepeden insert
**Kamera:** tavan iç yüzünde, iki koltuğun arası, h 1.50, **70° aşağı**, ön = **kadraj üstü**. Devir düzlemi (h ≈ 1.00) 0.55 m uzakta, **2300 px/m**. Kucak düzlemi (h 0.80) 0.75 m uzakta, 1690 px/m. Moyzisch solda, Bazna sağda (sol direksiyonlu araçta sürücü solda).
| # | Katman | Konum (cs 1) | Renk / not |
|---|---|---|---|
| 1 | Taban paspası + pedallar (çok koyu) | y 0–220, yalnız iki diz arasından | `#1e1c2c`, pedal yok sayılabilir (gerekmiyor) |
| 2 | **Ön panel alt kenarı** (yukarıdan görünen üst kenar) | x 0–1080 · y 180–300, krom şerit y 290–300 | `#2e2c3a` |
| 3 | **Direksiyon (tam halka)** | elips merkezi (300, 470), yarıçaplar 330 × 250 (30° yatıklıktan), jant 26 px. 3 kol göbeğe (300, 470), göbek ø 70. Kolon panele | jant `#2a2834`. Sağ üst yayda ışık kenarı `#f0c4a8` |
| 4 | Kanepe oturağı (orta şerit + iki kenar) | x 380–720 · y 300–1920 boyuna rulolar artık **dikey** çizgi (aralık 60–80, seed). Alt uçta sırt tabanı y 1700–1920 | gölge tenleri §2.6-5 |
| 5 | Moyzisch uyluğu + dizi (solda) | x 0–420 · y 560–1500, diz üstte (y 560) | palto eteği `#3c3a4c`, pantolon `#2c2a38` |
| 6 | Bazna uyluğu + dizi (sağda) | x 660–1080 · y 600–1600 | `#262536` / ceket eteği `#3b3a4e` |
| 7 | **Zarf** (Moyzisch'in kucağında, p0'dan görünür: **kurulum**) | p0: merkez (220, 1180), 0°, 410 × 273 (kucak düzleminde). Devirde (h 1.0): ≈ 560 × 373 | kraft `#a88b66`, üçgen kapak çizgisi `#7a6450`. Yazı/pul yok |
| 8 | **Film kutusu** (Bazna'nın elinde) | devirde uzunluk **175 px** (0.0825 m × 2300 × 0.92) | `#2a2830`, etiket bandı `#8a8470`, kenar ışığı `#f0c4a8` |
| 9 | Eller ve kollar | §2.10 poz tablosu | |
- **Işık:** fener aracın solundadır (elçilik tarafı, sürücü camından). Net kenarlı bant **soldan sağa yatay**: x 0 → 1080, y 640–1180 arası (devir yüksekliği). Moyzisch'in dizleri ve direksiyonun alt yarısı bandın üst kenarında. Bazna'nın uyluğu bandın sağ ucunda sönümlenir: ikinci basamak `#5a4a44`, sonra gölge. Kucak yüzeyleri (h 0.80) bandın altında, **zarf kucağa inince gölgeye girer** (L\* 59 → 44). Bu imza tekilliğine de yardım eder (P05'te banknot yok, en parlak yüzey zarfın ışıkta kalan kenarı ve eller).
- **Gölge:** sağa (Bazna tarafı), temas gölgeleri 4–8 px. Zarf kucağa konunca altında 10 px'lik koyu temas gölgesi (p118 temas karesi).
- Üçte birler: üst panel + direksiyon, orta devir, alt kucak + zarf + kanepe. Ölü alan yok.
- **Kamera hareketi (öneri):** sabit cs 1.0 (p0–247). İstenirse p150 → 232 arasında cs 1.0 → 1.08, merkez zarf (kucağa konduktan sonra). Yakın planı kesip dolduran yüz yok (P05 "yüz kadrajı dolduruyor" sorunu bu görünümde oluşamaz).

### 2.8 Renk (bu bölüme ek; hepsi L\* ≤ 88, C\* ≤ 28, banknot hariç)
| Ad | Hex | ~L\*/C\* | Not |
|---|---|---|---|
| Moyzisch arabası gövde / omuz yansıma / alt kıvrım | `#262836` / `#3e4262` / `#1c1d2a` | 16/10 · 28/16 · 11/9 | siyah değil, lacivert-siyah |
| P09a arabası gövde / yansıma | `#3d4640` / `#55605a` | 29/6 · 39/6 | koyu yeşil (eski P09a hex korunur) |
| krom / krom parlama | `#8e8e96` / `#c4b5a8` | 59/5 · 74/8 | sarı metal yok |
| lastik / basamak lastiği / nervür | `#1e1c26` / `#2a2834` / `#3a3848` | | |
| deri gölge / bantta / rulo tepesi / dikiş | `#4f3a3a` / `#7a5a50` / `#8c6f66` / `#2e2634` | 27/10 · 41/14 · 49/14 | sıcak piksel (C\* ≥10) |
| fener küre / hale iç / hale dış | `#efd0b6` / `#e4bc98` / `#e0c8b2` | 85/20 · 79/25 · 82/15 | banknotla ΔL\* ≥ 10 |
| cephe fener havuzu | `#c8a98e` | 71/20 | |
| parke/kaldırım ıslak / derz / soğuk parıltı | `#4a4858` / `#2e2c3a` / `#6f86ad` α .5 | | |
| bordür andezit / üst kenar | `#5e5a66` / `#7a7684` | | |
| Moyzisch ten ışık / gölge | `#cdb09e` / `#7f6a64` | 74/13 · 47/9 | Bazna'dan soğuk ve soluk (ayrışma). **Öneri, tasarımcı onaylar** |
| Bazna ten ışık / gölge (tasarım) | `#c9a58a` / `#8e6a52` | 70/18 · 48/18 | |

### 2.9 `dis` görünümü (P09a) · elçilik karşıdan, yakın
**Neden değişti:** (1) v1'de araba kaldırımın üstündeydi (Z 12.5 > bordür Z 11). (2) Sekreter 1.62 m × 110 px/m = 178 px (%9.3), ≥%12 değildi. (3) Kapı ile araba arası yürüyüş, 46 karede 3+ m'ydi (koşu hızı). (4) Kaldırım tarafındaki araba kapısı karşı kaldırımdan **görünmez**. Burada sekreter kaldırım tarafındaki arka kapıya biner; **uzak kapının açılıp kapanması ve oturuşu yakın arka camın içinden görünür** (`pencere` ile aynı "camın ardını görme" dili).
**Kamera:** karşı kaldırımda, göz h **1.5**, yatay, F **1300**, ufuk **y 1000**. Cephe Z **9.0** (144.4 px/m) · karşı bordür Z 7.0 · araba yakın yüzü Z **5.1** (255 px/m), uzak yüzü Z 6.85 · yakın bordür Z 2.6.
| # | Katman | Konum (cs 1) | Renk / not |
|---|---|---|---|
| 1 | Cephe | tam genişlik, y 0–1195 (taban). 1. kat silmesi h 4.1 → y 488 (18 px). 1. kat pencereleri y 200–445 (aks 2.5 m, seed 193: biri yanık `#e4bc98`, kalanı `#4d5b84` = P09b pencere hex'i, gök yansıması). 2. kat denizlikleri y 0–40 | sıva `#6e6470`, fener havuzu r 330 `#c8a98e` / r 190 `#e0c8b2` (net kenar) |
| 2 | **Daktilo penceresi** | x **251–410** · y 813–1043 (söve 0.1 m) | `#e8c9a4`. Sekreter oturur (baş y ≈ 1007), p16'da kalkar (baş y ≈ 935) |
| 3 | **Kapı** + saçak + 2 basamak | kapı x **461–663** · y 782–1152. Saçak y 632 (x 432–692), altı tarama. Basamaklar Z 8.4–9.0, y 1152–1195 | kapı `#3a3040`, açılan kanat içi `#2a2632` |
| 4 | **Fener** | küre merkezi **(692, 913)** (X 1.05, h 2.1), r 22. Hale r 70 / 125 | `#efd0b6` / `#e4bc98` / `#e0c8b2` |
| 5 | Karşı kaldırım + bordür | y 1195–1279 | `#55606e`. Fener yamuğu `#8c6f66`, x 520–900. Bordür ön yüzü `#5e5a66` |
| 6 | **Kaçış arabası** (`Sedan40`, koyu yeşil, **sağa bakar**, yakın yüzü Z 5.1) | arka tampon x **770**, ön kadraj dışında sağda. Çatı y 969, cam y 1020–1148, bel krom y 1148, kapı altı y 1280, basamak y 1291–1330, zemin y 1382. **Arka kapı x 922–1080+** (camı x 935–1060), bagaj eğrisi x 770–900 (tepesi h 1.05 → y 1115) | gövde `#3d4640`. Siluet kenarı fenerden `#f0c4a8`. Çamurluk altı tarama |
| 7 | Yol (parke taşı, ıslak) | y 1279–1675 | `#2f3550` → `#26283a`. **Fener yansıması: dikey, kırık şerit x 680–705, y 1430–1640** (`#e4bc98` → `#8c6f66`, 5–7 parça, seed 194). Daktilo penceresinin yansıması x 251–410, y 1330–1520, sönük `#7a6658`. Arabanın kendi koyu yansıması gövdesinin altında |
| 8 | Yakın bordür + kaldırım (ön plan) | bordür y 1675–1740, kaldırım y 1740–1920 | andezit `#5e5a66`, plakalar `#4a4858`, soğuk ıslak parıltı |
- **Fener yansıması neden burada var:** yansıma noktası yolda Z ≈ 3.75 (x 692). Fenere giden ışın X ≈ 0.7'den geçer, araba arka tamponu X 0.9'dan başlar. Yol açık.
- **Sekreter yolu (öneri, kareler yönetmenin):** p16 pencerede kalkar → p16–50 içeride sola, kapıya (pencere ile kapı arası 0.35 m) → p50 kapı açılır (temas) → p50–70 iki basamak (her adım bir basamağa) → p70–96 kaldırımda **sağa**, fenerin altından (kenar ışığı en güçlü an), bagajın arkasından (bel üstü görünür, bagaj h 1.05) arabanın uzak (kaldırım) arka kapısına (≈ 2.1 m, hızlı yürüyüş) → p96–104 uzak kapı açılır (çerçevesi **yakın arka camın içinden** görünür) → oturur, başı arka camda (y ≈ 1040) → p110 kapı kapanır (temas, cam içinden görünür) → p114–154 araba sağa kalkar (1.2 m'de kadrajdan çıkar). Plan sonundan ≥ 12 kare önce biter.
- **Boy:** kapıda Z 8.9 → **237 px (%12.3)**. Kaldırımda Z 7.6 → 277 px (%14.4). Şart ≥ %12 karşılanır.
- **Trafik yönü notu [G]:** Türkiye sağdan trafik. Karşı şeritte araç normalde sola bakar. Burada sağa bakar (kısa kaçış yolu: 1.2 m'de kadrajdan çıkar; sola baksaydı 5+ m gerekirdi). Kaçış anında ters yönde beklemek dramatik olarak kabul edilebilir. İzleyicinin fark etmesi beklenmez. Açıkça [T] tasarım kararı.
- **Gök yok** (cephe kadrajı doldurur). Alacakaranlık yanık pencereler, `#4d5b84` gök yansıması (P09b'ye taşıyıcı hex) ve fenerle okunur.
- Üçte birler: üst 1. kat pencereleri + silme · orta saçak, fener, kapı, daktilo penceresi, araba · alt ıslak yol, iki yansıma, bordür, kaldırım. Ölü alan yok.

### 2.10 El ve kol poz tablosu (kullanıcı: "El kol doğru değil özürlü gibi"; motion rig parametresine çevirir)
**Kurallar (bütün görünümler, ayrıca P04, P08, P09b, P10'da da kontrol):**
1. **El havada sarkmaz.** Her el her karede bir şu durumdadır: (a) **dayalı**: direksiyon, diz, kucak, kanepe sırtı (temas gölgesi var); (b) **tutuyor**: nesneyi kavrar ya da kıstırır; (c) **iletiyor**: nesneyi taşıyan ya da almaya uzanan, avuç yönü tanımlı, parmaklar gergin, ≤ 40 karelik geçiş. "Gevşek, avuç aşağı, parmaklar sarkık" poz arabada **yasak**.
2. **Bilek ön kolun devamıdır.** Ön kol ekseni ile el ekseni arasındaki açı: nötr ≤ 15°, kavrama/kıstırma ≤ 30°, **asla > 35°**. Avuç aşağı bükülü bilek (sarkık) yasak.
3. **El boyu (bilek–orta parmak ucu) = aynı figürün yüz boyunun (çene–saç çizgisi) ≈ %75'i**, aynı derinlikte ölçülür. Siluet figürlerde yüz 0.24 m → **E = 0.18 m** (`0.19` değil). Kukla Bazna'da yüz karikatür ölçüsünde olduğu için el **rig yüzünden** hesaplanır: `E = 0.75 × yüzBoyu(px)` (baş 215 px, yüz ≈ 170 px → **E ≈ 128 px**). Sınır: 0.65–0.85 × yüz. v1'deki "dev el" (≈ 1.1 × yüz) ve gerçek ölçüden hesaplanan "bebek el" (0.5 × karikatür yüz) ikisi de yasak. Insert görünümlerinde yüz kadrajda yoktur. Orada E = 0.18 m × px/m.
4. **Kol omuzdan dirsekle iner.** Omuz → dirsek → bilek üç nokta. Dirsek açısı 70°–160° (düz kol yok, katlanmış kol yok). Kol `konikKol` (omuz 0.11 m, dirsek 0.09, bilek 0.07 × px/m). Omuz noktası gövdenin omuz eklemine bağlıdır (`govdeDunya` / `siluet40Yol.omuzY`), serbest değildir.
5. **Ten rengi:** banknottan koyu (L\* ≤ 75) ve az doygun (C\* ≤ 20). Eller ışık bandında bile `#c9a58a` (Bazna) / `#cdb09e` (Moyzisch) üstüne çıkmaz. Ten bant dışında gölge tenine iner. Banknot ile ΔL\* ≥ 20.
6. **Tutma okunur:** kavrayan el, nesnenin **arkasından** sarar. 4 parmak altta (kısmen gizli), başparmak üstte görünür, nesne üstünde temas gölgesi. Kıstırmada başparmak ve işaret parmağı ucu nesnenin iki yüzündedir, arada kâğıt kalınlığı (3 px) görünür.

**Yeni poz önerileri (`GRAVUR_POZ`'a):** `avuc` (avuç yukarı, parmaklar düz ve hafif açık, başparmak yanda; almaya hazır), `dayali` (avuç aşağı, parmaklar dize ya da kucağa uyacak biçimde 20–30° bükük, temas gölgeli), `jant` (direksiyon kavrayışı: 4 parmak jantın arkasında, başparmak önde, `tutus` türevi).

| Görünüm / plan | Figür · el | Durum | Omuz → dirsek → bilek (cs 1 px) | El açısı / poz | Kareler (öneri) |
|---|---|---|---|---|---|
| `el` P01a | Moyzisch **sol** | direksiyonda dayalı (jant saat 7–8) | kadraj dışı (sağ üst) → kadraj dışı → bilek (1040, 330) | `jant`, avuç kameraya dönük, başparmak jantın önünde | p0–110 sabit |
| `el` P01a | Moyzisch **sağ** | ileten → bırakan | dirsek (1130, 380) dışarıda → bilek (930, 600) → kıstırma (775, 785) | `kistir`, bilek–ön kol 10°. p42'den sonra p42–70 parmaklar açılır, el bilekten geri çekilir: bilek (1000, 520), poz `dayali`. Kucağına iner, kadrajın sağ üstünden çıkar (p70–96) | p0, 24, 42, 70, 96 |
| `el` P01a | Bazna **sol** (alan) | **avuç yukarı** uzanır → kavrar → çeker | dirsek (−40, 1440) → bilek p0 (150, 1330) → p30 (230, 1230) | p0–30 `avuc`, avuç banknotun altında. **p42 başparmak üste kapanır** (`tutus`). p70–100 bilek (120, 1500)'e çekilir, banknotla birlikte sol alttan **kadrajdan çıkar** | p0, 30, 42, 70, 100 |
| `el` P01a | Bazna **sağ** | dizinde dayalı | — (diz ön planda, x 0–380, y 1480+) | `dayali`, el diz kapağında (200, 1600), parmaklar dizin kavsine | sabit |
| `pencere` P01b | Moyzisch **sağ** (yakın) | direksiyonda dayalı | omuz (640, 680) → dirsek (705, 770) → bilek (735, 650) | `jant`, jantın üstünde saat 11. Dirsek bel çizgisinin üstünde görünür (y 770 < 835) | sabit |
| `pencere` P01b | Moyzisch sol | görünmez (uzak taraf) | — | — | — |
| `pencere` P01b | Bazna **sağ** (yakın) | p110: kucakta, görünmez → p116–136 banknotla yükselir → **p138 ceket iç cebine girer** (temas) → p138–170 elini yakaya dayar → p170 iner ve bel altına çıkar | omuz (330, 770) → dirsek (250, 900) (cam altı, görünmez; kol bel çıtasının arkasından yükselir) → bilek p130 (360, 800) | banknot `tutus` ile, uzun kenar ≈ 150 px, bant içinde (en parlak). p138'den sonra `dayali` (yaka üstünde) | p110, 130, 138, 170 |
| `pencere` P01b | Bazna sol | kucakta, görünmez | — | — | — |
| `kucak` P05 | Moyzisch **sol** | direksiyonda dayalı (saat 9) | omuz kadraj dışı sol → bilek (40, 470) | `jant` | sabit |
| `kucak` P05 | Moyzisch **sağ** | p0–30 **avuç yukarı** uzanır (film kutusunu alır) → p44 kavrar → p44–60 kutuyu palto iç cebine götürür (kadrajın sol üstünden çıkar) → p60 zarfı kucağından alır → p70–84 ileten → p84 bırakır → kucağa döner, `dayali` | dirsek (260, 900) → bilek p0 (330, 980) → p30 (430, 900) | `avuc` → `tutus` → `tutus` (zarfın sağ kenarı) → `dayali` | p0, 30, 44, 60, 84, 110 |
| `kucak` P05 | Bazna **sol** (yakın merkez) | p2 kutuyu iç cebinden çıkarır (temas, kadrajın sağ üstünden girer) → p30 uzatır (kutu başparmak + 2 parmak arasında) → p44 bırakır → p70 **avuç yukarı** uzanır → p84 zarfı kavrar → p118 zarfı kucağına koyar (temas) → zarfın üstünde `dayali` | dirsek (900, 1000) → bilek p30 (650, 900) → p84 (620, 950) → p118 (820, 1250) | `kistir` → `avuc` → `tutus` → `dayali` | p2, 30, 44, 70, 84, 118 |
| `kucak` P05 | Bazna **sağ** | dizinde dayalı | — | `dayali`, (980, 640) | sabit |
| `dis` P09a | sekreter | kollar gövde yanında, yürüyüşte salınır. Kapı kolunu tutar (p50) | — | siluet el, tek parça | — |
- Bütün geçişlerde el **nesneyle birlikte** hareket eder. Bırakılan nesne bir yüzeye oturur ya da öbür ele geçer, fade yok. Bilek anahtarları arasında `inout` eğri, ≥ 14 kare.
- **Kontrol betiği önerisi (motion/teknisyen):** her kontrol karesinde her el için (a) bilek–ön kol açısı, (b) el boyu / baş boyu, (c) dirsek açısı yazdırılır. Sınır dışı = hata.

### 2.11 Malzeme ve doku (≤ 3 katman, seed sabit; `DOKU_SEED.araba 191`, `ankaraCephe 193`, yol 194)
| Yüzey | Malzeme | Doku tarifi | Kod yöntemi | Parametre |
|---|---|---|---|---|
| Gövde boyası | cilalı lacivert-siyah / koyu yeşil | düz ton + **tek yatay yansıma bandı** (kapı omzu) + siluet kenar ışığı. Gren yok | poligon + 2 px kenar yolu | bant α 1 (düz ton), seed yok |
| Krom | çıta, kol, basamak kenarı, cam çerçevesi | tek parlama noktası, uzun kenarda 1 soğuk çizgi | yol | `#8e8e96`, nokta `#c4b5a8` |
| Cam (yakın) | düz cam | 2 çapraz yansıma şeridi α .08. İçerisi tam görünür, ton kaydırması yok | poligon α | şeritler A direğine paralel |
| Deri döşeme | koyu deri | rulo pli + dikiş çizgisi (6/6 px kesik). Rulo tepesi 1 ton açık | yol, seed'li aralık | 60–80 px, seed 191 |
| Basamak | lastik | 4 boyuna nervür (perspektifle aralık açılır) | yol | seed ±4 px |
| Parke taşı (yol) | küp taş [G: 1940'lar Ankara ana caddeleri asfalt ya da parke, doğrulanmalı; parke seçildi] | sıralar yatay, sıra içi kayma seed'li (ızgara değil), taşların %30'unda üstte soğuk ıslak parıltı | `IslakKaldirim.tsx` türevi | sıra yüksekliği perspektifle, seed 194 |
| Kaldırım | andezit plaka | 2–3 derz, ıslak koyu ton | `TasDuvar` (bulut kapalı) | seed 193 |
| Cephe | sıva + andezit | v1 aynen (orta sınıf: silme + söve) | `TasDuvar` | seed 193 |
| Üst katman | kâğıt + gazete tanesi | `ArsivKatmani` `geceLapis`, gölgede tane α .10 | | tüm görünümler |
**Tarama (§0.4, ARABA satırı v2):** saçak altı · çamurluk altı ve iç kavsi · kapı alt kıvrımı (yalnız 20 px şerit) · uzak cam çerçevesinin iç kenarı · kanepe sırtının gölge yanağı (`el`) · direksiyon göbeğinin gölge yanı (`kucak`). **Gövde düz yüzeyinde, camda, oturakta, yolda tarama yok.**

### 2.12 Dönem/şehir doğruluğu (ARABA)
- [A] Teslimler genelde Moyzisch'in arabasında. Marka ve model doğrulanmadı → rozet, yazı, ızgara armasız nötr gövde.
- [G, doğrulanmalı]: 1937–42 sedanda basamak, üçgen havalandırma camı, deri kanepe, 3 kollu ince direksiyon, sol direksiyon (Türkiye sağdan trafik) · 1940'lar Ankara'da parke taşı yol · elçilik kapı feneri (tamamen [T] nötr) · daktilo penceresinin konumu ([T]).
- **Senaryo/sahne notu (orkestraya, sahibi senarist/yönetmen):** senaryo P05 sahne sütunundaki "pencerenin ardında elçilik cephesi, üst katta daktilo" `kucak` görünümünde yok. Kurulum P01b'de (zemin kat, iki başın arasında). P09a karşılığı aynı pencere. Anlatım metni etkilenmez.

### 2.13 Kalibrasyon: üç hedef kare ve kabul ölçütü (Gemini yok; ilk render bunlar)
**K-C1 · P01 p30 · `el`.** Kadrajın üst sağ köşesinde panelin krom alt kenarı ve direksiyonun alt yayı görünür, Moyzisch'in sol eli jantı kavrar. Sağ üstten koyu manşetli bir ön kol iner, el beyaz banknotun üst-sağ ucunu kıstırır. Sol alttan ecru manşetli bir el avuç yukarı uzanır, banknotun altına girer. Banknot +30° çapraz, arka yüzünde ters baskının soluk izi var. Net kenarlı sıcak bir bant iki eli ve kâğıdı aydınlatır. Altta soğuk gölgede deri oturak ve dikiş çizgileri, sol altta Bazna'nın dizinde dayalı sağ eli. Sol kenarda kanepe sırtının ruloları, üst yarısı bantta.
1. Banknot L\* ≥ 92 ve sahnenin en parlak noktası. Geri kalan max L\* ≤ 88, max C\* ≤ 28. Ten L\* ≤ 75, C\* ≤ 20, banknotla ΔL\* ≥ 20.
2. El + banknot + manşet bbox ≥ %25 alan. Banknot uzun kenarı ≥ 540 px.
3. 360 px sayfada "direksiyon" ve "araba koltuğu" okunur (jant ≥ 20 px yay + dikişli rulolar). Eleştirmen tek cümleyle "ne görüyorsun" yazar, "tren/otobüs" yanıtı ret sebebi.
4. El kuralları §2.10: bilek–ön kol ≤ 30°, el boyu E = 0.18 m × px/m (±10%), hiçbir el dayanaksız ve gevşek değil. Moyzisch'in manşeti koyu, Bazna'nınki ecru.
5. Sıcak piksel ≥ %14, p95 L\* ≥ 75. Tarama yalnız §2.11 yerlerinde.

**K-C2 · P01 p138 · `pencere` (iki kişi).** Gece kaldırımından lacivert-siyah bir sedanın yolcu kapısı görünür. Üstte tavan eğrisi var, silueti fenerden ince sıcak çizgi alır. Yuvarlak köşeli büyük yan cam krom çerçeveli, önünde havalandırma camı ve eğik A direği. Camın ardında yakında Bazna profilde sağa bakar: yüzünde ve yakasında net kenarlı sıcak bant, kameraya dönük yanağı yarı gölgede, sağ eli banknotu ceket iç cebine sokar (banknot en parlak). Uzakta direksiyon başında Moyzisch: kenarlı şapkalı koyu siluet, burun-çene profili aydınlık uzak camın önünde, sağ eli jantın üstünde, dirseği bükük. İki başın arasında uzak camdan sıcak daktilo penceresi ve içinde oturan küçük siluet. Sağ üstte A direğinin ötesinde elçilik kapısının kenarı, saçak ve fener (görünen tek kaynak). Cepheye düşen net kenarlı havuz. Altta krom bel çıtası, kapı kolu, çamurluk kavsi, nervürlü basamak, gövde altı gölge, birikinti, andezit bordür, ıslak kaldırım.
1. 360 px'te ses kapalı: "gece, eski araba, içinde iki adam, dışarıda bina". Kapı kolu ≥ 20 px (360'ta), cam köşe yuvarlaklığı seçilir.
2. Bazna başı ≥ 215 px (cs 1). Moyzisch'in burun-çene profili arka plana karşı ΔL\* ≥ 25, kenar ışığı görünür. Siluette en az 3 değer var (şapka kenarı / yüz / palto yakası). Tek ton blok ret sebebi.
3. Daktilo silueti + pencere ≥ 60 px yükseklik, iki başla ve banknotla çakışmaz.
4. Banknot L\* ≥ 92. Fener küresi ≤ 88, ΔL\* ≥ 7. Diğer her yer ≤ 88, C\* ≤ 28.
5. Sıcak ≥ %14, p95 L\* ≥ 75 (fener haleleri + cephe havuzu + daktilo). Tutmazsa önce cephe havuzu r +40, sonra 1. katta ikinci yanık pencere.
6. Üç üçte bir dolu. Alt bant (1290–1490) önemli nesne taşımaz. Krom çıta ve basamak düz ve ızgarasız (seed).
7. El kuralları §2.10 (Moyzisch'in dirseği y < 835 görünür, bilek düz). Hareket şeridi p110–170: banknot hep bant içinde, el nesneyle birlikte.

**K-C3 · P09a p70 · `dis` (sekreter).** Karşı kaldırımdan elçilik zemin katı. Solda sıcak daktilo penceresi boş (sandalye ve daktilo silueti), ortada açık kapı ve beton saçak. Sekreter (topuzlu yüzsüz siluet, diz altı etek-nötr) alt basamaktan kaldırıma iner. Sol kenarı ve topuzu fenerden kenar ışığı alır. Sağında fener ve cepheye düşen havuz. Sağda koyu yeşil sedanın arkası (bagaj eğrisi, arka kapı, çamurluk), bekler. Önde ıslak parke yolda fenerin kırık dikey yansıması ve daktilo penceresinin sönük yansıması. En altta yakın bordür ve kaldırım.
1. Sekreter boyu ≥ 230 px (%12). Ayakları basamakta, temas gölgesi var. Yürüyüş şeridinde (her 4 kare) her adım bir basamağa.
2. Araba yolda (yakın yüz Z 5.1, karşı bordürün önünde). Gövde kaldırıma basmaz. Arka kapı + bagaj + çamurluk ile "araba" okunur.
3. Fener yansıması fenerin dikey hizasında (x ±15 px). Yansıma ile fener arasında gövde yok.
4. Sıcak ≥ %14, p95 L\* ≥ 75. Max L\* ≤ 88 (banknot yok). Gök yok, P09b'ye taşıyıcı `#4d5b84` 1. kat camlarında var.
5. Hareket şeridi p96–154: uzak kapı çerçevesi yakın arka camın içinden görünür. Kapanış (p110) temas karesi ses ile aynı kare. Araba plan sonundan ≥ 12 kare önce kadrajdan tamamen çıkar.

### 2.14 Motion için çizim notları
- `Araba.tsx` `gorunum`: `ic` kaldırılır (hata verir, json'da `pencere` / `el` / `kucak`). `dis` yeniden kurulur. Plan içi kesme P01'de `el` → `pencere` (p110) için mevcut `plan_ici_kesme` / `devam_plan` yapısı kullanılır.
- **Yeni ortak modüller:** `Sedan40` (yan yüz parametrik: renk, X kaydırma, kapı açısı [uzak/yakın], cam içi slotu `icerik` [figürler arada çizilir], siluet kenar ışığı `Isik`'ten). `DuvarFeneri` (küre + hale basamakları + `Isik` nokta tanımı; havuz, yamuk ve yansıma aynı tanımdan). `DeriKanepe` (rulo + dikiş, `el` yan / `kucak` tepe yönleri). `Direksiyon` (halka + 3 kol + göbek, yatıklık ve görüş açısından elips). `IslakParke` (`src/doku/IslakKaldirim.tsx` türevi: seed'li sıra, yansıma sütunu `Isik`'ten).
- **Türetme:** cephe `ModernCephe` (v1 kodundaki `DisSahne` cephesi) aynı dünya. Kenar ışığı `src/doku/Siluet.tsx`. Eller `GravurEl` + `konikKol` + yeni pozlar (`avuc`, `dayali`, `jant`). Figürler `SiluetFigur40` (`sapkali`, `topuzlu`) ve `Kukla takim40`, `yon +1`.
- **Işık bandı geometrik hesaplanır:** fener noktası → uzak camın dört köşesi → figür düzlemi. Elle konmaz, net kenarlı, blur yok.
- **Dünya sabit:** seed'ler dünya koordinatında. Push-in ve araba kalkışında doku kaynamaz. Motor titremesi yok (araba duruyor; P09a'da yalnız kalkış).
- Mevcut kodda `el.*.dirsek` serbest nokta. v2'de omuz gövdeden gelir, dirsek kural 4'teki açı aralığına kısıtlanır (IK, `kinematik.ts`).

---

## 3. MASA-INSERT yeni masalar (`masa: komodin | berlin | bazna`)
Ortak: `aci` mevcut değerler. `isik: lamba` (başucu lambası, `fener`in yerine `lamba: {x, y, boyun}` önerisi) ve `lamba-kubbe` (Berlin). El ve prop sistemi aynen kalır.

### 3.1 `komodin` (P02a, P03b, P04a) — `aci: tepe-onden`
**Amaç:** gizli bir şeyin "sıradan" ev eşyası gibi durduğu dar yüzey, lambanın dibinde ve sıcak.
- **Ölçek:** komodin üstü 0.65 × 0.45 m → **1600 px/m** (genişlik kadrajı taşar: x −20…1100). Ön kenar y 1500, arka kenar (duvar dibi) y 820.
| Öğe | Konum (dekor px) | Not |
|---|---|---|
| Duvar (arka) | y 0–820 | gece duvar. Lambanın **V'si** sol-üstte (tabanı x 160–300, y 760 → üst kenar) |
| Abajur alt ağzı | merkez (230, 400), ø 380 → 0.24 m | üst bant arkasında kalabilir, kaynak görünür olsun diye **en az yarısı y > 400** |
| Lamba kaidesi (keçe altlık ø 0.18 ile) | elips merkez (230, 900), 240 × 70 | |
| **Kutu** | x 300–910, y 930–1240 (ön yüz 1240–1330) | kilit plakası ön yüz ortası (605, 1285). Anahtar deliği ≥ 24 px |
| Anahtar (P02 bırakılan yer) | (230, 1150) civarı, uzun eksen ≈ 200 px, −20° | çekirdek havuzda |
| Ön yüz: çekmece pervazı + çekmece | y 1500–1920 | `#3a3040` + damar + koyu metal düğme (540, 1700). Alt üçte bir |
- **Işık:** komodin üstünde lamba dibinde dairesel çekirdek `#a07f6c` (r 280, merkez kaide). Sonra `#6b5148`, kenarlar `#3a3040`. Kutu gölgesi sağ-öne, tarama III. Duvar V'si `#efd0b6`/`#e4bc98`.
- **Doku:** `AhsapYuzey ceviz`, damar **yatay** (komodin üstü enine), seed 197. Üst kenarda 1 cila parlama çizgisi. Ön yüz damarı dikey.
- **Ölü alan:** üst duvar + V, orta kutu, alt çekmece ön yüzü.

### 3.2 `berlin` (P06) — `aci: tepe-egik`
**Amaç:** soğuk, bürokratik, ağır bir masa. Çok önemli bir şey bir çekmeceye "dosyalanıp" unutulur.
| Öğe | Konum | Not |
|---|---|---|
| Duvar şeridi | y 0–520 | koyu lambri `#4a4a68`, 3 dikey pano çıtası, genişlikler eşit değil (x 210, 590, 900; ±30 seed). Üst bant yazısı bunun üstünde |
| Masa üstü (koyu maun) | y 520–1090 | `#5a463e`. Sümen `#44493f` x 160–920, y 600–1040 (zeytin, parlak yeşil çuha değil) |
| Lamba: metal kubbe (`#4a4a52`) | kaide (900, 600), kubbe ağzı (840, 470) ø 150 | [T] Ankara lambasından ayrışan biçim |
| **Harita** | x 250–830, y 560–900, −3° | `#d4c6a2`, deniz `#9fb0b8`, kara `#c9bb98`. **Normandiya halkası** merkez (500, 700), r 80, 10 px `#3a3e5e` |
| Masa ön kenarı | y 1090–1100 | 1 ince açık kenar çizgisi |
| **Orta çekmece** ön yüzü | x 300–780, y 1100–1260 | koyu metal tutamak (540, 1180). Açılınca öne (aşağı) kayar, içi üstten görünür, karton yığını `#b9a57f` |
| Sıkışan köşe (P06 → P07 eşleşmesi) | çekmece sağ ucu, üçgen (700–780, 1090–1135) | dış havuzda `#cfc6ac` |
| Ayak dolapları + diz boşluğu | y 1260–1920 | sol ve sağ dolap (x 0–260, 820–1080) çekmeceli, ortada diz boşluğu `#1e1c28`. Halı `#3a3448` |
- **Işık:** havuz çekirdeği merkez (540, 780), elips 380 × 260, `#e6cfb2` (kenar **sert**, iç basamak yok). Dış basamak merkez (580, 860), elips 520 × 420, `#b89c86` → çekmece ön yüzünü ve köşeyi kapsar. Oda `#2e3048`. Gölgeler sol-aşağı (lamba sağ-üst). Kubbenin üstü kapalı olduğu için duvarda V yok, duvarda yalnız kubbe arkasında küçük yayılma halkası.
- **Doku:** maun damarı yatay, seed 199. Sümen düz (lif yok). Lambri düz ton + çıta gölgesi taraması (dar şerit).
- **Ölçüt:** çekirdek havuz alanı ≈ %15 + dış basamak → sıcak ≥ %14. Berlin, Ankara odasından **daha koyu ve daha az sıcak** okunur: oda gölgesi `#2e3048` (L\* 21, Ankara `#3e4262` L\* 29), havuz rengi C\* 18 (Ankara 20–25), havuz kenarı yumuşak basamaksız ve sert.

### 3.3 `bazna` (P07, P10) — `aci: tepe`
**Amaç:** yalnız bir adamın sade masası. Tek lamba altında para: zenginlik vaadi küçük bir ışık dairesine sığar.
- **Ölçek:** masa **1500 px/m**. Banknot 211 × 134 mm → 316 × 201 px (cs 1). cs 1.45'te 459 × 291.
| Öğe | Konum (dekor) | Not |
|---|---|---|
| Masa tahtası | tüm kadraj | **dikey** tahtalar, 4 adet, genişlikler 0.17/0.22/0.19/0.24 m (seed 211). Derzler 2 px koyu, ızgara yok |
| Lamba (üstten) | kaide merkez (60, 260), kadrajın sol-üst köşesinde yarı kesik. Abajur dış halkası `#3f4a45`, iç ağız `#e8c9a4` hilal | boyun masaya eğik (merkeze) |
| Havuz | elips merkez (540, 980), yarı eksenler 560 × 650, uzun ekseni lambadan sağ-aşağı (−45°) | kenar net. Çekirdek `#a6826c`, ışık `#8c6f66`, dış `#5a4a44` |
| Zarf (P05'ten, açılmış) | x 140–620, y 330–640, kapak üçgeni sağ-alt köşede (P06 köşe eşleşmesi) | kraft `#a88b66` |
| **İki banknot (P07 p300)** | sol merkez (395, 790) −4°, sağ merkez (690, 1060) +3° | iki banknot da çekirdekte. Çarpı sağ banknotun sağ-üst köşesinde |
| Dökülmüş diğer banknotlar | alt kenar x 100–900, y 1300–1650, kenarları üst üste | havuz kenarında, gölge yarısında L\* ≤ 88 |
- **Işık:** gölgeler sağ-aşağı (lambadan uzağa), 10 px kayık, net. Banknot üstünde ikinci basamak yok (imza, tek ton `#f6f1e4`).
- **P10 p0–24 sönük:** masa `#2f3450` (P09b son karesiyle eşit), ay dolgusu soğuk, banknot `#b8bccc` (L\* 76, yine en açık). p24'te huzme lamba ağzından masaya **uzar** (14 kare radyal), p38 tam.

### 3.4 K-B — P07 p300 (mutlak 2700) "bu kare böyle görünmeli"
Kamera cs 1.45, cx 0, cy 0. Ekran konumları: sol banknot merkezi (330, 714), sağ banknot (758, 1105). İkisi de x 100–990 içinde, birebir aynı çizim (çerçeve + köşe rozetleri + boş oval + dalgalı satırlar). Sağ banknotun sağ-üst köşesinde iki fırça vuruşluk kırmızı çarpı. Çevrede sıcak havuz, havuzun üst kenarında kraft zarf ağzı, sol-üst köşede abajurun iç hilali, alt üçte birde havuz kenarında yığının kenarları ve koyu tahta derzleri.
**Kabul ölçütleri:**
1. Banknot L\* ≥ 92, sahnenin geri kalanı max L\* ≤ 88, C\* ≤ 28 (çarpı hariç). Zarf, masa çekirdeği ve yığın kenarı ile banknot arasında ΔL\* ≥ 10.
2. Çarpı `#b3261e`: mürekkep alanı ≤ banknot yüzünün %8'i, bbox ≥ %10 ekran. Sahnede başka kırmızı piksel (h 0–20°, C\* > 30) yok.
3. Banknot bölgesi (iki banknotun kapsadığı y aralığı) ≥ %28 ekran yüksekliği (beklenen ≈ %30). 360 px sayfada "iki aynı kâğıt" okunur, rozet ve çerçeve ≥ 2 px.
4. Sıcak piksel ≥ %14, p95 L\* ≥ 75.
5. Tahta derzleri dikey ve eşit olmayan aralıklı (ızgara yok). Masada tarama yalnız zarf ve banknot düşen gölgelerinde.
6. Lamba kaynağı kadrajda görünür (iç hilal), havuz yönü ve gölgeler aynı kaynaktan.

---

## 4. Dönem/şehir doğruluğu ve kaynak gerekçesi
- **Kaynaklı [A]:** elçinin yatak odası ve deri kutu, banyo ve kapı anlatısı (orta), lamba altında çekim (popüler), arabada teslim, white fiver görünümü, konutun 1930'lar sonu yapılmış olması.
- **Doğrulanmalı [G]** (araştırmacıya, öncelik sırasıyla):
  1. 1930'lar Ankara resmî/diplomatik yapı dili (düz sıva, düz lento, andezit subasman, beton saçak). Alman elçiliği binasının gerçek görünümü.
  2. 1930'lar eklemli boyunlu, koni abajurlu masa lambası (Avrupa genel).
  3. 1937–42 sedan içi: tek parça kanepe koltuk, kumaş tavan döşemesi dikişleri, iç güneşlik, cam krankı, yuvarlak arka yan cam.
  4. Konut iç mekânı: şerit parke, kartonpiyer, iki kanatlı pencere, tek kişilik yatak.
  5. Berlin: metal kubbe masa lambası, ayak dolaplı yazı masası.
- **Nötr bırakılanlar:** Ankara silueti (kale, minare, sokak lambası), araba markası, elçilik kimliği, bayrak/arma/tabela, tablo/ayna, duvar kâğıdı deseni.
- **Kemer:** bölümün hiçbir mekânında kemer yok (hepsi düz lento).

## 5. Motion için çizim notları
- **IC-ODA:** `oda: "elci-yatak"` yeni kayıt. `arka` 5.0, oda yarı genişliği 2.1 ve tavan 3.2 **oda başına** olmalı (şu an `YARI`/`TAVAN` sabit). Kirişler ve lucarne bu odada kapalı. `isik: lamba` (mum yerine `nokta` + abajur kesimi), `isik: gun` (pencere yönlü), `isik: sonuk`.
- **Yeni ortak modüller (öneri):** `AbajurIsigi` (ampul + abajur ağızları → aşağı koni elipsi + duvar V'si + yayılma basamağı, boyun açısı parametresi. IC-ODA ve MASA-INSERT aynı tanımı kullanır) · `KapiAltiIsik` (şerit + havuz + ayak kamaları + açılma kaması) · `AyYamasi` (pencere `aciklikYamasi` ile) · `PliKumas` (koltuk/perde dikey pli, seed) · `ModernCephe` (sıva + silme + düz lento pencere + andezit `TasDuvar` + beton saçak; `ic` camdan ve `dis` aynı dünya) · `SedanKesit` (kesit kenarı, tavan dikişleri, camlar, direkler, kapı paneli, kanepe).
- **Türetme:** zemin/duvar/ahşap `src/doku/{AhsapYuzey,TasDuvar,Tarama,Isik,ArsivKatmani}`. Lamba huzmesi biçimi için `paris/LanternOda.tsx` huzme kurgusu (kaynaktan uzama, net kenar). Siluet kenar ışığı `Siluet.tsx`.
- **Lamba V'si net kenarlıdır:** `filter blur` yok. Basamaklar düz poligon. V ve havuz aynı ampul noktasından geometrik hesapla bulunur, elle konmaz.
- **Seed'li düzensizlik:** perde kıvrımı, parke genişliği, tavan döşemesi dikişi, koltuk pli'si, pencere içi tonları, ağaç tepeleri, tahta genişlikleri. Hepsi dünya koordinatında sabit.

## 6. Açık sorular / tasarımla çelişkiler (gerekçeli)
1. **K-A kamerası** cs 1.7 → 1.4 (§1.9). Yatak ve belgeler K-A dışında kalır, p170 ek kontrol karesi önerildi. Yönetmen onaylar.
2. **(v1, geçersiz; v2'de tek kaynak elçilik feneri §2.4)** ARABA ışık yönü: tasarım "sol-arkadan" ile sahne "sağ-üst-arka" çelişiyordu. Tasarım seçildi (sol-ön-uzak = ön camdan, alçak). Bazna'nın yüzü ışık alır, Moyzisch kontra kalır.
3. **Daktilo penceresi zemin katta, kapının solunda** (v2 §2.4). `pencere` ve `dis`te aynı sıra.
4. **Berlin lambası sıcak** (tasarım §1) ama daha az doygun ve sert kenarlı. Sahnenin "soğuk-nötr" isteği oda tonuyla karşılanır.
5. **Tepsi** komodine sığmıyor, yeri yatak ayak ucu sağ köşesi (u −1.25, z 3.35). P02b'de bırakma anı yönetmene.
6. **P02b/P03a adım sayısı:** Bazna–komodin mesafesi 0.85 m (2–3 adım). Sahne 4 adım yazdı.
7. **P09b p292+ p95 L\*** ölçütü dışı (lint izni önerisi §1.7).
8. Gemini mood referansı üretilmedi (bütçe ve kullanıcı kuralı). Gerekirse yön karesi önce kalibrasyon render'ı olarak alınır.
9. **ARABA v2 (tur-4):** P05 `pencere` yerine `kucak` (tepeden) seçildi. Gerekçe §2.1: film kutusu dışarıdan ≥130 px olamaz, devir bel çizgisinin altında kalır, P01b ile aynı açı olurdu. Daktilo kurulumu yalnız P01b'de. Senaryo P05 sahne notu senarist/yönetmene iletilmeli. Lamba yansıması `pencere`de fizik gereği yok, P09a'da var. P09a kaçış arabası karşı şeritte sağa bakar ([T], kısa çıkış). Moyzisch ten rengi `#cdb09e` önerisi tasarımcı onayına.
