# Çiçero (Ankara 1943–44) · Mekân Şartnamesi (kurulum ekibi, adım 5b; kanalın ilk 1940'lar kiti)

Hazırlayan: mekân sorumlusu · 2026-11-14 · Girdi: `tasarim.md` (palet, ışık sözleşmesi, imza banknot: **bağlayıcı**), `sahne-plani.md` (§1, §3, §7, §8), `arastirma.md` §5, `dokunuslar.md`, `src/kit/KATALOG.md` (IC-ODA, MASA-INSERT), `src/kit/sablonlar/{IcOda,MasaInsert}.tsx` ve `src/doku/*` (yalnız yapı okundu). Biçim örneği: `paris-kusatmasi/mekanlar.md`.
Bu belge **şartnamedir, kod değildir.** Görsel üretilmedi (Gemini yok, bütçe), git yapılmadı.
Etiketler: **[A]** arastirma'da kaynaklı · **[S]** senaryo/sahne planı · **[G]** genel bilgi, kaynağı açılmadı, **doğrulanmalı** · **[T]** tasarım kararı (tarihî iddia değil). [G] öğe tek başına dokunuş taşımaz, metin içermez.

### Özet kararlar (orkestra için)
1. **Üç mekân, kemer yok:** ELÇİ-ODASI (IC-ODA `oda: elci-yatak`, gece/gündüz/sönük), ARABA (yeni: `ic` yan kesit, `dis` sokak), MASA-INSERT (`komodin`, `berlin`, `bazna`). Bütün açıklıklar **düz lentolu dikdörtgen** (1930'lar Ankara'sı ve iç mekân). Sivri, yarım daire, basık kemer çizilmez.
2. **ELÇİ-ODASI kutusu yeniden ölçülendi:** arka duvar z **5.0**, oda genişliği **4.2 m** (u −2.1…2.1), tavan **3.2 m**. Arka duvar cs 1'de x 57–1023'e sığar, bütün oda tek bakışta okunur. Yerleşim (soldan sağa, arka duvar): **tek kişilik yatak · komodin + lamba + kutu · pencere · banyo kapısı** (§1.3). Gerekçe: 9:16'da Bazna'nın sol-önde durabilmesi (yatak ayak ucu z 3.1), K-A'da lamba + pencere önünde Bazna + kapı şeridinin aynı karede sığması.
3. **K-A kamerası değişti (öneri):** P04 p200–240 için cs **1.4, cx −170, cy −90** (sahne önerisi cs 1.7 cx −240 idi). cs 1.7'de kapı şeridi alt banda (y > 1290) düşüyor, lamba kadraj dışında kalıyor. Yatak ve belgeler K-A'da kadraj dışında: p104–194'te görülürler, p200–240 pan'ı Bazna'nın bakışını kapıya taşır (§1.9).
4. **Lamba tek tasarım:** "eklemli (tek mafsal) boyunlu, koni abajurlu başucu lambası" [G]. Tasarım (koni abajur, ağır kaide) ile sahne (boyun çevrilir) birleştirildi. Abajurun **üst ağzı duvara keskin kenarlı bir V ışık** atar. Bu bölümün 1940'lar ışık imzası ve sıcak piksel kaynağı budur. Boyun bükülünce V ters yöne yatar.
5. **ARABA iç:** **kukla tiyatrosu kesiti** (yakın kapı yok). Araba sola bakar: ön koltukta Moyzisch (solda, geri dönük), arka koltukta Bazna (sağda, öne eğik). İki profil birbirine bakar, aralarında ön koltuk sırtı durur. Arka yan camdan elçiliğin **zemin kat** daktilo penceresi iki başın arasında görünür. Kamera araba tabanından 1.05 m yükseklikte, ufuk y 670 (§2.3). Daktilo penceresi "2. kat" değil zemin kat. Gerekçe: oturan kameradan yan camın üst kenarı ~7° yukarıyı keser, üst kat görünmez (fizik).
6. **Elçilik cephesi nötr, 1930'lar Ankara modern-klasik:** düz sıva, düz lento pencere, kat silmeleri, düz çatı + parapet, koyu **andezit taş subasman**, kapı üstünde ince **beton saçak**. Bayrak, arma, tabela yok. Bina kimliği iddia edilmez [G, doğrulanmalı].
7. **Işık yönü (tasarımla hizalı):** ARABA güneşi **sol-ön-uzak** (ön yan camın ardından, alçak) gelir. Bazna'nın yüzü sıcak ışık alır, Moyzisch kontra kalır. Sahne planındaki "sağ-üst-arka" yerine tasarım §1 seçildi. Berlin lambası sıcak ama **daha az doygun ve sert kenarlı** (sahnenin "soğuk-nötr" isteği oda tonuyla verilir, havuzla değil: sıcak piksel ölçütü).
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
- **ARABA:** koltuk sırtının gölge yanağı · kapı kolçağı altı · yan cam çerçevesinin iç kenarı · cephe pencere girintilerinin gölge yanağı (orta sınıf, yalnız sol söve) · `dis` görünümde beton saçak altı ve araba çamurluk altı.
- **MASA-INSERT:** kutu/çekmece/zarf düşen gölgesi (küçük, III; çapraz IV yalnız ≤120 px kutuda) · masa ön kenar pervazı altı · lamba kaidesinin gölge yanı.

### 0.5 Işık (mekân başına tek tanım; huzme, havuz, gölge ve tarama açısı buradan türer)
| Görünüm | Kaynak (tek) | `Isik` tanımı (öneri) | İkincil (ayrı tanım, kendi havuzu) |
|---|---|---|---|
| ELÇİ gece | başucu lambası, ampul (u −0.83, h 1.00, z 4.85) | `nokta`, renk `#efd0b6`, havuz §1.6 | banyo kapı altı (kapı ardında, h 2.0) → yalnız şerit + zemin havuzu · ay yaması (pencere, `yonlu`, α .30, hep var) |
| ELÇİ gündüz | pencere güneşi, yükseklik 30°, odaya doğru, hafif sola | `yonlu` yon [−0.30, 0.95] | lamba sönük |
| ELÇİ sönük (P09b p292+) | ay yaması (pencere) tek kaynak | aynı ay tanımı, α .30 → .45 | yok |
| ARABA ic | güneş, alçak (8°), sol-ön-uzak | `yonlu` yon [0.85, 0.15] | yok (daktilo penceresi uzak, ışık düşürmez) |
| ARABA dis (akşam) | batı parıltısı (sol, kadraj dışı, alçak) | `yonlu` yon [0.90, 0.10], renk `#f0d0bc` | yanan pencereler: her biri kaldırıma kendi küçük yamuğunu düşürür |
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
| araba tavan döşemesi ışıkta / gölgede | `#9a8070` / `#4a4560` | 56/14 · 31/17 | |
| araba kesit kenarı (ön-plan çerçeve) | `#26283a` | 17/13 | |
| araba krom (kapı kolu, cam kolu) | `#8e8e96` | 59/5 | sarı metal yok |
| cephe sıva ışıkta (ic, sıyırma güneş) / akşam | `#c4ae96` / `#6e6470` | 72/16 · 44/8 | |
| cephe gölge (pencere yanağı) | `#8f8aa0` | 59/13 | |
| andezit subasman | `#5e5a66` | 39/8 | [G] Ankara andeziti koyu pembe-gri |
| daktilo penceresi içi | `#e8c9a4` | 83/23 | cepheden ΔL\* ≥ 10 |
| uzak ağaç/pus (gündüz) | `#d9b896` / `#b39a8a` | 77/23 · 65/14 | |
| kaldırım / yol akşam / yol yakın | `#55606e` / `#2f3550` / `#26283a` | | |
| 2. araba (P09a) | `#3d4640` | 29/6 | P01 arabasından farklı |
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

## 2. ARABA — yeni şablon (`gorunum: ic` P01, P05 · `dis` P09a)

### 2.1 Duygusal amaç ve görsel dil
**Tek cümle:** dar, kapalı, gizli bir pazarlık kabini: iki yüz birbirine eğilir, dışarıdaki dünya (elçilik, daktilo) camın ardında sessizce izler.
- **Şekil:** iç görünümde yatay bant (cam şeridi) + iki profil kütlesi + aradaki dikey koltuk sırtı. Tavan döşemesi dikişleri kaçış noktasından ışınsal açılır: derinlik ve hafif "kafes" hissi. **Ritim:** cam–direk–cam (ön cam, B direği, arka cam, yuvarlak C köşesi). **Sıcaklık:** sol (ön cam) sıcak alçak güneş, sağ ve alt mor-mavi döşeme. **Kontrast:** Bazna'nın yüzü ve banknot en açık. Moyzisch kontra.

### 2.2 Mimari kart (araç iç mekânı = yapı)
| Madde | Karar |
|---|---|
| Dönem/üslup | 1937–42 arası genel dört kapılı sedan [G]; marka/model **yok** [A §5: doğrulanamadı]. Okutan siluet: **arka yan camın arka-üst köşesi geniş yuvarlak** (C direği eğik), yuvarlatılmış cam köşeleri (r 0.05 m), kumaş tavan döşemesi, öne açılır güneşlik [G]. |
| Kuruluş | Kabin iç yüksekliği 1.30 m, iç genişlik 1.45 m, ön ve arka **tek parça kanepe koltuk** [G]: oturak h 0.35, sırt üstü h 0.85, sırt kalınlığı 0.12 m, üstü yuvarlak. Kapı paneli: kolçak h 0.62, kapı kolu h 0.72, cam kolu (krank) h 0.55 [G]. Bel çizgisi (cam altı) h 0.85, cam üstü h 1.25. |
| Açıklıklar | Uzak yan duvarda iki cam: ön (B direğine kadar) ve arka (yuvarlak arka-üst köşe). Direkler gövde rengi. Yakın taraf **kesilmiş** (kukla tiyatrosu kesiti). Kesit kenarı koyu ön-plan çerçevesi olur. |
| Kameradan görünen | Kamera kabinde göz h 1.05 (oturan göz hizası), yakın kesit düzleminin 0.55 m dışında, yatay. **Tavan döşemesinin altı görünür**, araç dış kaportası ve tavanın üstü görünmez. Dışarısı yalnız camlardan, cam üst kenarı ~7° yukarıyı keser: **cephede yalnız zemin kat görünür**. |
| Dış yapı (camdan + `dis`) | §2.6 cephe kartı. |

### 2.3 Kamera modeli `ic` (cs 1)
F **1265** px · göz kabin h 1.05 (sokak +1.45) · **ufuk y 670** · figür düzlemi Z 1.10 (**1150 px/m**) · uzak kapı/cam Z 1.62 (781 px/m) · cephe Z 7.6 (166 px/m; sokak genişliği ≈ 6 m) · yakın kesit Z 0.55.
`y = 670 + (1.05 − h)·F/Z` (h kabin tabanından m). `x = 540 + (X − X0)·F/Z` (X araç boyunca m, ön = sol).
| Öğe | x | y | Not |
|---|---|---|---|
| Kesit kenarı (tavan, Z 0.55) | 0–1080 | 0–95 | koyu `#26283a` bant + alt kenarda 2 px sıcak kenar `#9a8070` |
| Güneşlik (ön, katlı) | 0–330 | 60–220 | koyu yamuk, 8° eğik, ön-plan çerçeve |
| Tavan döşemesi | 0–1080 | 95–514 | dikiş çizgileri (5, seed'li aralık 0.30–0.42 m) kaçış noktası (540, 670) yönüne |
| Uzak cam üst kenarı / bel çizgisi | — | 514 / 826 | |
| Ön cam | 0–400 | 514–826 | ön kenarı kadraj dışında |
| B direği | 400–445 | 514–826 | |
| Arka cam | 445–930 | 514–826 | arka-üst köşe r 90 px |
| C direği / arka iç panel | 930–1080 | 400–1490 | |
| Uzak kapı paneli | 0–930 | 826–1490 | kolçak üstü y 1006, kapı kolu (560–640, 928), cam kolu (700, 1061) |
| **Ön koltuk sırtı** (figür düzlemi, kenardan) | 395–500 | 900 (yuvarlak üst) – 1475 | dikey pli çizgileri |
| Oturak ön yüzleri (yakına uzanır) | 0–1080 | 1475–1920 | pli + kenar biyesi. Alt üçte biri doldurur |
| Moyzisch başı (önde, geri dönük, sağa bakar) | 170–400 | 417–682 | şapka tepesi y 268. Kenarlı şapka siluet yönü verir |
| Bazna başı (arkada, öne eğik, sola bakar) | 720–940 | 417–682 | burun ucu x ≈ 720 |
| **Daktilo penceresi** (cephe, arka camdan) | 480–663 | 514 (camla kesik) – 711 | iki başın arasında. Sekreter silueti (baş + omuz + daktilo üstü) y 645–711 (≈ 66 px) |
| Banknot (P01 p0, sahne) | merkez (560, 820) | −12°, uzun kenar ≥ 260 px | Z ≈ 1.0 (figür düzleminin 0.1 m önü) → 267 px ✓ |

### 2.4 Işık `ic` (gün, alçak güneş sol-ön-uzak, yon [0.85, 0.15])
- **Ön cam:** üstte gök `#a9b7cc` (y 514–590), altta ufuk ışıması `#f0d0bc` (590–670). Ufuk altında puslu uzak ağaç tepeleri `#d9b896`/`#b39a8a` (flu 4 px, seed'li 5–7 tümsek, tür belirsiz). Güneş diski yok.
- **Işık yamaları (`aciklikYamasi`, ön cam açıklığından):** Bazna'nın yüzü, boynu, yakası (`#e4bc98` yüz ışığı, ten tasarımdaki gibi), arka koltuk sırtı ve C direği iç yüzünde parçalı paralelkenar (x 860–1080, y 700–1300). Banknot yüzü bu huzmede (en parlak).
- **Tavan döşemesi:** sol yarı ön camdan yansıyan sıcaklıkla `#9a8070`, sağ yarı `#4a4560`. Sınır net, dikiş çizgisine oturur.
- **Moyzisch:** kontra. Şapka kenarı ve ense sol çizgisinde `#f0c4a8` 2 px, yüz yok.
- **Cephe:** güneşi sıyırarak alır: sıva `#c4ae96`, pencere girintilerinin sağ yanağı gölge `#8f8aa0` (tarama, orta sınıf). Daktilo penceresi içi `#e8c9a4` (içeride masa lambası; kaynak sayılmaz, cepheye ışık düşürmez), sekreter silueti `#463f55`. Cephe katmanı flu 3 px + pus `#a9b7cc` α .25.
- **Gölgeler:** sağa ve hafif aşağı (banknotun gölgesi koltuk sırtı üstüne sağ-alta, 8–12 px kayık).

### 2.5 Malzeme ve doku `ic`
| Yüzey | Malzeme | Doku | Kod | Parametre |
|---|---|---|---|---|
| Koltuk / kapı paneli | yün döşeme kumaşı [G] | dikey pli çizgisi, aralık 22–40 px seed'li. Kenar biyesi 1 ton açık | yol | seed 191, `#3a3750`/`#6a5c68` |
| Tavan döşemesi | kumaş | dikişler ışınsal; kumaşta tane yok | yol | seed 192 |
| Krom | metal | tek parlama noktası | yol | `#8e8e96`, nokta `#c4b5a8` |
| Cam | düz | tek yansıma çizgisi, ön camda yok (ışık zaten parlak) | çizgi | α .10 |
| Cephe (camdan) | sıva + andezit | orta sınıf: yalnız kat silmesi + pencere sövesi; andezitte 2 sırada bir derz | `TasDuvar` (bulut kapalı) | seed 193 |

### 2.6 Elçilik cephesi — mimari kart (camdan `ic` ve `dis`te aynı model)
| Madde | Karar |
|---|---|
| Dönem/üslup | **1930'lar Ankara modern-klasik** ("Yeni Mimari") [G, doğrulanmalı]: kübik kütle, düz sıva, **düz lento** pencere, yatay kat silmeleri, düz çatı ve parapet. Alman elçiliği binasının kendisi **doğrulanamadı** [A §5], kimlik iddiası yok. Gerekçe: 1930'larda Ankara'nın yeni resmî ve diplomatik yapıları ağırlıkla bu dilde. Osmanlı canlandırması (sivri/basık kemer, geniş saçak, çini) belirli bir binayı ve 1920'leri okutur, kaçınıldı. |
| Kuruluş | Bahçe içinde ayrık değil, sokak hattında 3 katlı yapı [T] (zemin + 2). Zemin döşemesi sokak +0.30 (iki andezit basamak), kat yükseklikleri 3.8 / 3.5 / 3.5, parapet 0.8 → toplam ≈ 11.9 m. Andezit subasman sokak 0–1.0 m. Kat silmeleri h 4.1 ve 7.6 (0.15 m). |
| Açıklıklar | Zemin kat pencere 1.1 × 1.6 m, denizlik sokak +1.2, söve 0.1 m sıva içinde, demir parmaklık ve panjur yok. Üst katlar 1.1 × 1.7 m. Pencere aksı 2.5 m (iskele 1.4 m). Kapı 1.4 × 2.6 m, iki kanat koyu ahşap, düz lento. Üstünde **0.6 m çıkmalı ince beton saçak** (h 3.1), altı taramalı. |
| İmza (iki tane) | koyu **andezit subasman** + **beton kapı saçağı**. |
| Düzensizlik (ızgara değil) | Pencere içleri seed'li: perde yarım/açık, iç ton 3 basamak. Akşam yalnız 3–4 pencere yanık, biri daktilo. Bitişik yapı yok, sol boşlukta bahçe duvarı (h 2.2) ve 2 düzensiz ağaç tepesi var. |
| Kameradan görünen | `ic`: yalnız zemin kat bandı (sokak +1.0…+2.6). `dis`: tüm cephe, parapetin üstü görünmez (göz 1.5 m). |

### 2.7 `dis` görünümü (P09a, alacakaranlık) — kamera ve katmanlar
F 1540 · göz 1.5 m · cephe Z 14 (110 px/m) · **ufuk y 1085** · sokak (cephe dibi) y 1250 · kaldırım kenarı (Z 11) y 1295 · park araba Z 12.5 (123 px/m).
| Katman (arkadan öne) | x | y | Hex / not |
|---|---|---|---|
| Gök 3 basamak | 0–1080 | 0–… | üst `#4d5b84` (**P09b pencereyle aynı hex**) · orta `#6f86ad` · sol boşlukta çatı hizasında ışıma `#f0d0bc` (x 0–260, y 700–1000) |
| Bahçe duvarı + 2 ağaç tepesi (siluet) | 0–260 | 820–1250 | `#2f3550`, seed 194 |
| Cephe | 260–1080+ | ≈ −50–1250 | sıva `#6e6470`, silmeler 1 ton açık, andezit `#5e5a66` (y 1140–1250) |
| Kapı + saçak + 2 basamak | 330–484 | kapı 931–1217, basamak 1217–1250, saçak 909 | saçak altı tarama. Basamak kenarları açık çizgi |
| **Daktilo penceresi** | 520–640 | 942–1118 | `#e8c9a4`. Sekreter silueti ≈ 100 px (oturan, sonra kalkar) |
| Diğer pencereler (seed'li ışık) | aks 2.5 m | 1. kat 513–700 · 2. kat 128–315 | 3 yanık `#e4bc98` (biri 1. kat), kalanı `#3a3d58` |
| Kaldırım | 0–1080 | 1250–1295 | `#55606e`. Yanık pencerelerin altında kendi sıcak yamuğu `#8c6f66` |
| Park araba (yan profil, sağa bakar) | 640–1206 | 1079–1270 | `#3d4640`. Ayrık çamurluk + basamak + yuvarlak bagaj [G]. Kapı x 760–880. Çamurluk altı tarama |
| Yol | 0–1080 | 1295–1700 | `#2f3550` → `#26283a`. Araba gölgesi sola-öne. Derz yok |
| Ön-plan: bu yakadaki kaldırım taşı | 0–1080 | 1700–1920 | andezit bordür `#5e5a66` + kaldırım. Alt üçte biri doldurur |
- Sekreter yolu: kapı (x 405) → basamaklar (her adım bir basamağa) → kaldırımda sağa → araba kapısı (x 820). Ayak y 1250–1280 ✓. Araba sağ kenardan çıkar.
- Işık: batı ışıması soldan, kenar ışığı figürlerin sol kenarında `#f0d0bc` 2 px. Sıcak ölçüt: yanık pencereler + ışıma + kaldırım yamukları ≥ %14. Tutmazsa yanık pencere sayısı (seed) artar.

### 2.8 K-C — P01 p24 (kanca) "bu kare böyle görünmeli"
Kamera cs 1.0 (push p150'de başlar). Sol üçte birde kontra Moyzisch: kenarlı şapka, ense ve şapka kenarında sıcak çizgi, kolu koltuk sırtının üstünden sağa uzanmış. Sağda öne eğik Bazna profili: yüz ve yaka sıcak güneşte, sol eli yarı açık, banknota doğru. Aralarında y ≈ 800–830'da kayan **beyaz banknot**, boş arka yüzüyle (kenar ışıklı). Hemen üstünde, iki başın arasında, arka camdan flu cephede tek sıcak pencere ve daktilo başında küçük koyu siluet. Üstte ışınsal dikişli tavan + koyu güneşlik, altta kanepe pli'leri ve kapı paneli. Sol camda alçak, pembe-şeftali ufuk ışıması.
**Kabul ölçütleri:**
1. Banknot sahnenin en parlak noktası, L\* ≥ 92. Geri kalan max L\* ≤ 88, max C\* ≤ 28. Banknot ile komşu açık yüzeyler (ufuk ışıması `#f0d0bc`, daktilo penceresi) arasında ΔL\* ≥ 9 (`#f0d0bc` L 86 → banknot 95). Banknot uzun kenarı ≥ 260 px.
2. Sıcak piksel ≥ %14, p95 L\* ≥ 75.
3. Daktilo silueti + pencere ≥ 60 px yüksek, 360 px sayfada "pencerede birisi" okunur. Pencere y 420–760 içinde, hiçbir başla ve banknotla çakışmaz.
4. İki profil yönü okunur (birbirine bakıyorlar). Moyzisch şapka siluetiyle Bazna'dan ayrışır. Yüzsüz kompars yüzü Bazna'yı kopyalamaz.
5. Kadrajın her üçte biri dolu (tavan + güneşlik / camlar + başlar / kanepe + kapı paneli). Ölü alan yok. Alt bant (1290–1490) önemli nesne taşımaz.
6. Tarama yalnız koltuk sırtı yanağı, kolçak altı, cam çerçevesi iç kenarı ve cephe pencere yanağında. Tavanda ve kumaşta tarama yok.
7. 2 px'ten büyük motor titremesi yok, dünya kaynamaz (seed'ler sabit).

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
2. **ARABA ışık yönü:** tasarım "sol-arkadan" ile sahne "sağ-üst-arka" çelişiyordu. Tasarım seçildi (sol-ön-uzak = ön camdan, alçak). Bazna'nın yüzü ışık alır, Moyzisch kontra kalır.
3. **Daktilo penceresi zemin katta** (sahne "2. kat" demişti): oturan kameradan üst kat görünmez. P09a'da da zemin kat.
4. **Berlin lambası sıcak** (tasarım §1) ama daha az doygun ve sert kenarlı. Sahnenin "soğuk-nötr" isteği oda tonuyla karşılanır.
5. **Tepsi** komodine sığmıyor, yeri yatak ayak ucu sağ köşesi (u −1.25, z 3.35). P02b'de bırakma anı yönetmene.
6. **P02b/P03a adım sayısı:** Bazna–komodin mesafesi 0.85 m (2–3 adım). Sahne 4 adım yazdı.
7. **P09b p292+ p95 L\*** ölçütü dışı (lint izni önerisi §1.7).
8. Gemini mood referansı üretilmedi (bütçe ve kullanıcı kuralı). Gerekirse yön karesi önce kalibrasyon render'ı olarak alınır.
