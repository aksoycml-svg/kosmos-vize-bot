# Yarasa Bombası — Görsel Tasarım (kurulum ekibi, adım 1)

Hazırlayan: tasarimci · 2026-11-14 · Girdi: `senaryo.md` v1.1, `arastirma.md` (§6, T2.4, T2.5), `mekan-dokumu.md`, `notlar/tur-1.md` (Yöntem C), `dokunuslar.md`, `src/theme.ts`, `src/kit/yazi.tsx`, `src/kit/sablonlar/Harita.tsx`; yalnız yapı/ders için `paris-kusatmasi/tasarim.md` §13–15.
Bu belge **spesifikasyondur, kod değildir.** Hex/oran/px motion'a doğrudan uygulanır. Mimari kart ve doku (ÇÖL-ÜS yapı yüzeyi, masa/defter dokusu) **mekân sorumlusunun** işidir; ben yalnız palet, kimlik ve prop/figür tasarımını veriyorum.

Etiketler: **[A]** arastirma.md'de kaynaklı · **[S]** senaryo/dokunuş (dramatizasyon) · **[G]** genel bilgi, kaynak açılmadı, **doğrulanmalı** · **[T]** tasarım kararı (tarihî iddia değil).
Kural: [G] ayrıntı tek başına dokunuş taşımaz, okunur metin içermez, doğrulanmazsa nötr kalır. Liste §10.
L\*/C\* değerleri elle tahmindir (±4); motion `renk_olcum.py` ve eleştirmen render'da doğrular.

---

## 1. Görsel kimlik ve palet

### 1.1 Kanal kimliği (değişmez, `theme.ts`)
`paper #e9dfc9` · `paperDark #d6c7a6` · `ink #1c1915` · `inkSoft #4a4237` · `red #b3261e` · `gold #b8862b` · `night #14120f`. Playfair 900 / Inter 500-800 / Plex Mono 500. **Yeni font yok.** Kanal `gold`'u yalnız yazı katmanında; görüntüde yok.
**Yeni renk gerekçesi (yazılı):** (a) imza kehribarı `#F29A2E` ve alev ailesi: `gold` (L\* 59, C\* 50) sahnenin en parlak/doygun noktası olamaz, imza için ≥ C\* 64 gerekir; (b) gül-altın / mavi-mor çöl paleti: Paris §13'ün onaylı sıcak–soğuk karşıtlık dili, bölüme uyarlandı. Başka yeni renk yok.

### 1.2 Yön: "savaş yılları teknik çizim + WPA posteri" [T]
- **Dönem kaynağı (dil, görüntü değil):** 1940'lar ABD WPA/savaş dairesi posteri (düz renk blok, güçlü silüet, ışık yüzü/gölge yüzü iki ton), savaş dönemi **teknik çizim/kesit/patlama diyagramı** (ince mürekkep hat, düz lavis), gazete gravürü **tarama çizgisi**. Halftone nokta ızgarası **yok** (ızgara/dönem dışı okunur); gölge hep çizgi taramayla.
- Kanalın gravür + kâğıt dokusu çizgisi aynen: düz katmanlı paneller, ortak mürekkep konturu, gölgede tek yönlü tarama, kâğıt tanesi. Bölüme özel yeni stil yok.
- **Arşiv görseli ekrana girmez**; yalnız dil referansı (LoC WPA posterleri, HAER UT-92, Commons yangın fotoğrafı). Hepsi vektörle çizilir; kaynak/hak durumu `varliklar.md`.
- **Sıcak–soğuk karşıtlık her mekânda:** ışık alan yüz gül-altın/şeftali, gölge mavi-mor, kenar ışığı, arkada flu/atmosferik katman, görünür tarama + kâğıt dokusu (Paris dersi "çok soğuk, estetik yok").
- Saf siyah/beyaz yok (en koyu `#14120f`, en açık `#f6f2e2`). Beyaz eldiven/beyaz imza nesnesi yok (bu bölümün imzası amber).

### 1.3 Işık sözleşmesi (tek kaynak, tek vektör)
| Mekân | Kaynak | Yön / not |
|---|---|---|
| **MASA / defter** (P01a, P02–P07, P11b, P12) | **Masa lambası**, kadraj dışı, sol-üst ≈ 45° | gölgeler **sağ-aşağı**; ışık `#f2cfa6`; soğuk **dolgu** = akşam göğü (yönsüz, gölge rengini mavi-mor yapar `#3c3650`; sağ kenarlarda 2 px `#8e93bd` α .35). Lamba gövdesi çizilmez (yalnız ışık) |
| **ÇÖL-ÜS** (P01b, P08–P10, P12) | **Batan güneş**, kadraj solunda, alçak, yükseklik ≈ 9° [T; 15 Mayıs, enlem 32.4°; saat kaynakta yok → "geç ikindi" varsayımı] | kamera **kuzeye** bakar ⇒ güneş **sol**, gölgeler **sağa-öne**, gerçek boy ≈ 6.3×; kadraja sığmıyorsa ≤ 5× (abartı). Kenar ışığı **sol/üst** yüzlerde `#f0c0a0` 2–3 px |
Lamba (sol-üst) ve güneş (sol-alçak) **aynı yarım küre**: P12 çizim ↔ gerçek geçişinde gölge yönü sıçramaz. Görünen her kıvılcım/köz/alev kendi ışığını yüzeye düşürür (α .18–.25, yarıçap ≤ 2× kaynak boyu).

### 1.4 ÇÖL-ÜS paleti (geç ikindi)
| Ad | Hex | L\* / C\* | Not |
|---|---|---|---|
| gök tepe / üst / orta / alt / ufuk | `#5b6a9a` / `#8a86b0` / `#b99fb4` / `#e3b8a4` / `#f0cfab` | 45/27 · 57/22 · 68/15 · 78/21 · 85/25 | 5 düz basamak, sınırda litografi geçişi (3 ince çizgi + stipple), yumuşak gradyan yok; güneş diski çizilmez, sol ufukta `#f6dcb8` iki halka (α .5 / .28) |
| uzak tepe sırası (tek siluet) | `#9a8aa6` / daha uzak `#b49bb0` | 59/15 · 66/15 | kontursuz, düz sırt; ayrıntı yok |
| toprak ışık / orta / gölge / derin gölge | `#d9b595` / `#b98f76` / `#6f6486` / `#463f5c` | 76/24 · 62/24 · 44/15 · 28/17 | zemin: kuru, çıplak; uzun gölge mavi-mor |
| kuru çalı topağı (3–5 adet, nötr) | `#8b7d6d` / gölge `#4e4658` | 54/10 · 33/12 | tür adı yok [G] |
| alçak yapı: kaplama ışık / gölge | `#cfa98a` / `#6c5f7a` | 70/25 · 41/17 | yatay tahta ritmi; tarama yalnız saçak altı, pencere yanağı |
| yapı çatı (koyu kâğıt kaplama) ışık-kenar / gövde | `#e0b093` / `#5a5066` | 75/27 · 35/10 | |
| **saçak altı / tank altı** (karanlık köşe) | `#2f2c45` | 19/16 | hikâyenin "karanlık köşesi": en koyu nokta `#14120f` değil, mor-siyah |
| yakıt tankı yüzü / kenar / gölge | `#9aa0ad` / `#e3b9a0` / `#5c5f78` | 65/7 · 77/22 · 40/15 | boyalı çelik, soğuk gri; yazı/numara yok |
| ayak/kiriş (ahşap) | `#6b5a52` / gölge `#3e3650` | 41/13 | |
| kompars siluet (≤ 2, uzak) | `#3e3b5c`, kenar ışığı `#f0c0a0` | 27/22 | yüzsüz, başlıksız/şapkasız, boy ve duruş farklı; üniforma [G] → yok |
| duman | `#6a5f78` / gölge `#3e3b5c` | 42/12 | tırtıklı kümeler, fade değil küçülerek ayrılır |
| yanmış ahşap / kömür | `#2f2a2e` / kor kenarı `#8a3a22` | 17/4 · 33/35 | yalnız P10 sonrası, P12 yanmış saçak |
**Sıcak piksel ölçüsü:** hue 30–80°, C\* ≥ 14. ÇÖL-ÜS planlarında ≥ **%22** hedef (≥ %14 taban): ufuk + alt gök + ışık yüzü toprak/kaplama. **P09 tank altı** karanlık kadrajda bile taban sağlanır: ayaklar arasından görünen ufuk dilimi + sol kenar ışığı + köz ışığı; p95 L\* ≥ 75 (ufuk dilimi).

### 1.5 MASA / defter paleti (sıcak masa lambası)
| Ad | Hex | L\* / C\* | Not |
|---|---|---|---|
| defter kâğıdı ışık / orta / gölge | `#e6d8b9` / `#d8c9a8` / `#aa9fb0` | 87/17 · 81/18 · 66/9 | eski kâğıt; `paper`'dan bir ton koyu (L\* ≤ 88); gölge mor |
| cilt oluğu / sayfa kenarı gölgesi | `#8d8196` | 56/10 | orta oluk 40 px, yumuşak değil düz bant + 3 tarama |
| defter bezi (kapak, kadraj kenarında) | `#57474e` | 33/9 | yazı/etiket yok |
| mürekkep (kuru / ıslak) | `#2b2f45` / `#1b1d33` | 20/12 · 12/12 | mavi-siyah dolma kalem mürekkebi [T]; ıslak 0.4 sn sonra kurur (ton açılır) |
| masa yüzeyi ışık / gölge | `#8a6a54` / `#3c3650` | 48/20 · 25/15 | koyu ahşap; yazı/oyma yok |
| lamba ışığı (havuz) | `#f2cfa6` α .22–.30 | 85/26 | kâğıdı ısıtır, C\* ≤ 28 |
| zarf / not kâğıdı | `#d6c8a8` / `#e2d4b4`, gölge `#a39ab0` | 79/18 · 85/18 | |
| belge (iptal) | `#dccfb0` | 83/17 | satırlar soyut çizgi |
| çizim kâğıdı (kovan kesiti) | defter kâğıdıyla aynı | | **mavi baskı (blueprint) değil**: sıcaklık için krem kâğıt + mürekkep hat + 2 ton lavis |
| kovan çeliği ışık / gölge / hat | `#8b90a0` / `#4f5370` / `#2b2f45` | 59/9 · 35/15 | tepsi çeliği `#6e7480` |
| mühür kırmızısı / gölge / tutacak | `#b3261e` / `#6f2a2e` / `#4b3a44` | 39/60 · 25/20 | `theme.red` = **tek** mat kırmızı |
Tek ışık: lamba. Pencere/gün ışığı çizilmez.

### 1.6 Çizgi kalınlığı (bölümde tek; Paris tablosu)
| Öğe | Kalınlık |
|---|---|
| defter çizgisi (kalemle çizilen) | **3.5 px** (insert 4 px); çizim animasyonunda sabit |
| prop konturu | 2.5 px (geniş) – 4 px (insert), ≤ 6 px; renk = dolgunun %55 koyusu kendi tonunda |
| yarasa | yakın/orta planda 2.5 px; **sürüde kontur yok** (düz dolgu); kanat zar damarı 1.5 px yalnız yakın plan |
| ÇÖL-ÜS dekor | 3 px (uzak) – 6 px (yakın); kontur rengi mor tonlu (`#2b2f45` ailesi = defter mürekkebiyle aynı hue ⇒ P12 geçişi) |
| tarama | çizgi ≥ 2.5 px, aralık ≥ 7 px (360 px'te ≥ 0.8 px), açı tek **72°**, renk gölge tonunun %60 koyusu mor |
| harita rota / eyalet sınırı | 6 px / 2.5 px |
`strokeLinejoin="round"`. 360 px'te yarım pikselin altına inen çizgi çizilmez. Tarama yalnız ışığın mimariyi anlattığı yerde (saçak altı, tank altı, pencere yanağı, cilt oluğu); geniş yüzeyde tarama/kafes yok.

### 1.7 Ölçüm sözleşmesi (eleştirmen/betik)
- Kapsül/köz/alev (§2) dışında **C\* > 32 piksel ≤ %0.5**; rest **C\* ≤ 28, L\* ≤ 88** (spekülar hilal ve alev çekirdeği hariç).
- İmza bandı (hue 55–75°, C\* > 55, L\* 60–92) **yalnız** kapsül/köz/alev iç katmanında; kapsül C\* ≥ **2.3 ×** sahne maksimumu.
- **Kırmızı bandı** (h 340–40°, C\* > 30) izin listesi: mühür (P11–P12), defter alevi + çatı taramasının kırmızıya dönüşü (P03), ÇÖL-ÜS alev dış katmanı (P01b, P10). Başka yerde 0.
- Sıcak piksel ≥ %14, p95 L\* ≥ 75 her planda; saf siyah/beyaz 0.

---

## 2. İmza nesnesi: AMBER KAPSÜL (selüloz kap) → köz → alev

**Seçim:** yarasanın karnına yapıştırılan küçük kapsül. **Gerekçe:** hikâyenin tüm mekanizması bu nesnede (P03 "göğsüne yangın", P05 takılır, P09 yanmayı bekler, P10 yanar) ve senaryo Kurulum→Karşılık tablosu onu bağlıyor (kapalı kapak → ucunda ışık). Kapalı halka P05'te kurulur, P09'da aynı halka parlar.

| Evre | Plan | Görünüm |
|---|---|---|
| boşluk | P02 | defterde yarasanın karnı **boş bırakılmış** (kâğıt rengi daire), amber yok |
| çizili alev | P03 | defterde **kırmızı mürekkep** küçük alev (vurgu; çekirdeği kâğıt rengi), çatı taraması kırmızıya döner |
| kapsül | P05 | amber yarı saydam kap, **çelik gri kapak + halka kapalı** |
| köz nabzı | P09 | halka çevresinden amber ışıma, **yavaş nabız** (aşağıda) |
| kıvılcım → alev | P10 | tek amber kıvılcım ×3 → alev (amber çekirdek, kırmızı-turuncu dış kenar) |
| iz | P12 | yanmış saçak/kararmış tank gölgesi: **amber yok** (iz kalır, imza söner); son kare defter, amber yok (döngü) |

**Kapsül biçimi [T; kaynak: selüloz kap + yapıştırıcı [A], gerisi serbest, kaynaksız]:**
- Silindir, uzunluk **0.55** (yarasa gövdesi = 1.0), çap **0.20**, uçlar yarım küre. Okunurluk için stilize ×1.5 (gerçek oran kaynaksız).
- Gövde `#F29A2E` yarı saydam (opak katmanlarla, alfa değil): dış `#F29A2E`, içte jel `#B9651C`, kontur `#8a4f10`, **tek spekülar hilal `#FFE3A0`** sol-üstte (ışık solda). L\* 69 / C\* ≈ 74 / h ≈ 63°.
- Ön uç: **çelik gri kapak** `#6b6a72` (boy 0.07) + ince **halka** `#8b90a0` (0.02). P05'te kapak kapalı; P09'da halka çevresi amber `#FFC76B` ışır.
- Yapıştırıcı: 2 küçük damla ø 5 px (insert ölçeği), `#cdbf9a` (amber **değil**, soluk yarı saydam, C\* 18), tek spekülar. Karın ortasından gövde boyunun %30'u kadar önde, gövde eksenine paralel, **dışa dönük ön yüzde**.
- **Tekillik:** başka hiçbir nesnede amber/`#F29A2E` ailesi yok: kalem, lamba, ışık, kâğıt, tepsi, tank, tünek, çalı, el, cımbız, yapıştırıcı hepsi §1.4–1.5 C\* ≤ 28. `gold` ve sarı metal (dolma kalem ucu, kilit, lamba) **yok**; metal koyu çelik/çinko.
- Aynı kapsül yarasa sayısınca çoğalır (P09 ~10–14 görünür): aynı nesne, tekrar değil.

**Köz nabzı (P09) [T; LED değil]:** 1943'te LED yok ve zamanlayıcı kimyasal [A özet, tek]; "yanıp sönen kırmızı nokta" dönem dışı okunur → **ısınan uç / köz**: kapak halkasında amber yoğunluğu `0.35 → 1.0 → 0.35`, periyot **96 kare (1.6 sn)**, sinüs (keskin on/off yok), tepe rengi `#FFC76B`. Yarasa başına faz seed'li (aynı ritimde değil). Plan boyunca periyot yavaşça kısalır 96 → 68 kare (yaklaşım hissi). Halo: yalnız komşu yarasa karnı ve tünek yüzeyine α .22, yarıçap ≤ 2× kapsül boyu; yıldız/pırıltı/hale yok. **Bu, senaryo P09 "kırmızı noktalar yanıp sönüyor"u değiştirir** → §11 karar 1.

---

## 3. Yarasa rig (Tadarida brasiliensis; **tek rig, sürekli parametre**)

Kaynak [A, K3/Wilkins]: boy ≈ 9 cm, 7–12 g (Duffin 14 g çelişkisi → gram verilmez); koyu kahve–gri; **kanatlar uzun, dar, sivri uçlu**; **kuyruk toplam boyun neredeyse yarısı ve uropatagiumdan dışarı uzanır**; **kulaklar geniş, yuvarlak, yüzün önünde neredeyse birleşir (ortada birleşmez)**; üst dudakta derin kırışıklar; ayaklarda uzun beyaz kıllar. Kanat açıklığı kaynakta **yok** → ≈ 3.1 × gövde **[G, doğrulanmalı]**.

### 3.1 Oranlar (tüm pozlarda sabit; birim u = baş+gövde uzunluğu = 1.0)
| Parça | Ölçü |
|---|---|
| gövde elips | 1.0 × 0.38 u; baş ø 0.34 (gövde önünde, hafif alçak) |
| kulak | 2 geniş yuvarlak, yükseklik 0.24, önde birbirine ≈ 0.04 mesafede (birleşmez) |
| kuyruk | toplam 0.8; 0.5'i uropatagium içinde, **serbest uç 0.3**, kalınlık 0.04 çubuk |
| kol (humerus+önkol) | 0.55; **dirsek** bükümlü; el kanadı (parmaklar) 1.0, ucu **sivri** |
| kanat açık açıklık | ≈ 3.1 (tüm pozlarda aynı kol/el uzunlukları, yalnız açılar değişir) |
| kanat arka kenarı | **3 yaylı taraklı kenar** (parmak aralarında), yay derinliği ≥ %12 kord |
| ayak | iki küçük ayak, 4–5 beyaz kıl çizgisi `#d8cdbb` |

**Parametreler (sürekli, poz isimleri yalnız kısayol):** `kanat` 0 (açık) … 1 (katlı) · `faz` (çırpma 0…1) · `yon` 0 / 180° (baş yukarı / baş aşağı) · `egim` · `nefes` (0…1) · `kapsul` (0/1) · `yuz` (uzak/orta/yakın detay). Poz farkı çizim değil parametre farkıdır (Paris "kuş tahtada/uçarken çok fark" dersi).

### 3.2 Pozlar
| Poz | Parametre | Çizim |
|---|---|---|
| **uyuyan** (P05, P06 tepsisi, P07) | `kanat 1`, yatay/yan yatık, `nefes` ±2% göğüs ölçeği, periyot 0.9 sn | kanatlar gövde boyunca katlı, kompakt oval "kapsül" siluet; kulaklar yatık; **kımıltısız** (D3'te yalnız bir kanat 2 seğirme: kol açısı +9°, 6 kare) |
| **tünemiş** (P09, P10 tünek) | `kanat 0.95`, `yon 180°`, ayaklar tünekte | baş aşağı asılı, kanat gövdeyi sarar; **karın dışa dönük ⇒ kapsül görünür**; tünme anı: ayak kavrar, kanat kapanır (D5 dalgası, bireysel gecikme) |
| **uçan** (P01, P08, P09 giriş) | `kanat` 0→0.15 döngü, `faz` | **4 anahtarlı kanat çırpma**: yukarı-açık / orta / aşağı-açık / geri; döngü **20 kare**, bireyde faz seed'li; "M" üst hat (dirsekten kırık), dar el kanadı geriye kıvrık |
| **sürü** (P01, P08, P10 uzak) | N birey, seed'li | §3.4 |

### 3.3 Renk
| Parça | Hex | Not |
|---|---|---|
| gövde / kürk | `#4a3f40` / gölge `#2f2a36` | koyu kahve-gri (L\* 28, C\* 6); saf siyah yok |
| kanat zarı | `#3e363b`; **arkadan ışıkta** zar geçirir `#74585f` | gün batımı karşısında sürü koyu siluet `#3b3450` |
| kenar ışığı | `#e8b99a` 2 px (sol/üst) | amber **değil** (C\* 22) |
| kulak içi / yakın plan dudak kırışığı | `#6a5258` / çizgi `#2f2a36` | yalnız `yuz: yakın` |
| göz | `#1c1915` küçük nokta + 1 px parıltı `#e6d8b9` | yalnız yakın plan (P07) |
| ayak kılı | `#d8cdbb` | |
Yakın plan (P07 başı döner): kulak iç damar 2 çizgi, dudak kırışığı 3 çizgi, göz, burun; Paris dersi "rig yüzü yakın planda detaylı".

### 3.4 Sürü (seed'li düzensiz yoğunluk, kaynamaz)
- **Konum = f(seed_i, t)**: her birey için sabit seed'den türeyen log-spiral parametreleri (`r = a·e^{bθ}`, 2 kol + çıkış kolonu); `Math.random` yok; **kameraya, ekran boyutuna, kareye rastgelelik bağlanmaz**. Kamera hareketi dünya modelinin üstünde ayrı dönüşüm (P07 "şehir titriyor" dersi).
- **Izgara yok:** Poisson-disk yerleşim (min mesafe boy×0.9) + 2–3 yoğun çekirdek (gauss) + seyrek kuyruk/öksüz bireyler; bireyin boy ölçeği 0.5–1.2 (derinlik), kanat fazı seed'li (senkron çırpma yok). Spiral kolu kenarlarında **boşluk ve kümelenme** olur (düzenli halka okunmaz).
- **Sayı (ekranda):** 120–220 birey (hikâyedeki ~1.000 ekran sayısı değildir; "yoğunluk" hissi).
- **LOD pop yok:** ayrıntı **boyutla** söner (kanat yayı → kanat çizgisi → nokta), opaklıkla değil; kamera yaklaşırken bireyler yerinde büyür.
- **Defter spirali ile ÇÖL-ÜS spirali aynı parametre seti** (a, b, kol sayısı, seed): P08 "ayna" kanıtı. Defterde bireyler mürekkep siluet `#2b2f45` (renksiz), ÇÖL-ÜS'te §3.3 rengi.

### 3.5 Telefon okunurluğu ("yarasa", kuş/yaprak değil)
- **Tek yarasa 360 px'te ≥ 20 px** kanat açıklığı = **1080'de ≥ 60 px**; tasarım eşiği **72 px**. Her planda **≥ 6 birey ≥ 72 px** ve biçim taşıyıcıdır; daha küçük bireyler "bulut" olarak okunur (kimlik taşımaz).
- Kuş/yaprak ayrımı (biçim kontrolü, ölçek yetmez): (1) **taraklı arka kenar**, (2) **dirsekten kırık "M"** üst hat (kuşta yumuşak kavis/"V"), (3) **ince çubuk kuyruk** (kuşta yelpaze yok), (4) **sivri el kanadı**, (5) yaprakta olan sap/damar yok, gaga yok. Eleştirmen 360 px'te "yarasa mı?" bakar.
- Uçuş yolu yumuşak spline (titrek jitter yok = kaynama değil, doğal).

---

## 4. Defter çizim sahnesi (Yöntem C)

**Mekân:** MASA-INSERT üstünde Adams'ın açık defteri (tepe-önden). Işık §1.3 lambası; renk §1.5. **Doku (en çok 3 katman, seed sabit):** (1) kâğıt lifi + 6–10 soluk leke (ø 20–60 px, α .06), multiply α .12–.16, (2) cilt oluğu gölgesi + kenar kıvrımı, (3) mürekkep kuruma halkaları. Kâğıt dokusunu mekân sorumlusu incelter.
**Çizgi dili (tek kural):**
- **Çizim animasyonu:** `stroke-dashoffset`; düz hat 700 px/sn, eğri 450 px/sn; başlamadan önce 4 kare "kalem değer" damlası (ø 6 px); ıslak ton `#1b1d33` → 24 kare sonra kuru `#2b2f45`. Çizgi **plan içinde tamamlanır** (≥ 12 kare kala).
- Kalem ucundaki el/gölge: gölge sağ-aşağı (lamba sol-üst). Kalem **dolma kalem** (§5.1).
- **P01 ilk kare farklı:** sürü ve mağara ağzı **çizilmiş**, bireyler **canlı hareket eder** (mürekkep siluetler spiral boyunca kayar; ince akış çizgileri dash ofsetiyle sürüklenir); "çiziliyor" değil "mürekkep canlandı" (P03'te tersine, çizim gerçekten çizilir).
- **Mağara ağzı çizimi:** kâğıtta alt-orta; yatay kaya katmanları 4–5 kıvrık hat + gölgede 3–5 tarama (72°); ağız koyu lavis `#463f5c` α .75 (en koyu nokta `#2f2c45`); ağızdan yukarı genişleyen koni → spiral (§3.4). Gök yok: **kâğıt boş** (çizim vinyeti), köşelerde lamba düşüşü.
- **P03 dönüşüm dili:** (a) çatı çizgisi + **ahşap tarama** (72°, aralık 7 px); (b) kalem durur 0.4 sn (nokta, damla büyür ø 6→9 px); (c) **kırmızı mürekkep alev** (`#b3261e`, çekirdek kâğıt rengi, kontur 3.5 px) göğüste; (d) çatı taraması **soldan sağa kırmızıya geçer** (mürekkep karışır, kenar net, 0.6 sn, fade değil). Hareket plan sonundan ≥ 12 kare önce biter.
- **P12 gerçeğe dönüşüm (çizim → yanmış çatı):** aynı çatı hattı korunur; **tarama çizgilerinin her biri bir kaplama tahtası olur** (aynı konum, aynı 72° → boyutla büyür, hat kalınlığı 3.5 → 4–6 px dekor kalınlığına geçer), kâğıt `#e6d8b9` → toprak/gök paleti, hat rengi mürekkep tonunu korur (ÇÖL-ÜS konturu aynı hue). Yanmış saçak `#2f2a2e`, kor kenarı `#8a3a22`, tank gölgesi kararmış; **amber ve alev yok** (iz). Işık yönü tutarlı (§1.3). Geri dönüş (son ≈ 0.7 sn): tahtalar çizgiye çekilir, sayfa çevrilir, ilk sayfa = P01 ilk karesi.

---

## 5. Masa propları (MASA-INSERT; hepsi yazısız, dil-nötr)

Elin biçimi, §5.1. Ekran ölçüleri 1080×1920'de.

| Prop | Tasarım | Okunurluk |
|---|---|---|
| **defter + dolma kalem** | açık iki sayfa, ~%65 genişlik; sayfa kenarı kıvrık; kalem: gövde ebonit `#3b3f4a`, **uç çelik gri `#8a8d96`** (altın uç yok), mürekkep damlası | P03 çizim alanı ekran yüksekliğinin ≈ %30'u; kalem ucu + alev bölgesi ≥ %12 (kamera push-in cs ≈ 1.4) |
| **zarf + not** | zarf 11×14 cm [G] ×1.4 stilize `#d6c8a8`, üçgen kapak çizgisi `#8a8576`, adres bloğu = 3 kısa çizgi; **pul/damga/mühür/yazı yok** (Beyaz Saray adresi okunmaz); not 2 soyut satır + kıvrık kenar, 2. satır görünmez (saklanan şey); not metni ekran yazısı katmanında | zarf ≥ %12 ekran; not ≥ 1 sn net |
| **kapsül + cımbız + yarasa** | §2; cımbız çelik `#9aa0aa`, iki ince bıçak, uç yarasa göğsünü **değer** (temas gölgesi); yarasa uyuyan poz, `kapsul 1` | **ölçek ≈ 100 px/cm** (Paris eli kuralı): yarasa gövdesi ≈ 500 px (%26), kapsül ≈ 275 px (%14), kapak halkası ≥ %12'ye yakın; mandal çıtı (D2) ≥ 1.2 sn net |
| **kovan kesiti** | sac tüp ~1.5 m (boy:çap ≈ 2:1 çünkü tepsi ø 76 cm [A]) çizim kâğıdında **kesit diyagramı**; içte **26 yuvarlak tepsi** üst üste (yan kesit: ince yatay dilimler; üstteki 2–3 tepsi 3/4 görünümde **elips** = yuvarlak okunur); yumurta kolisi/yumurta gözü **yok**; fren paraşütü çizilmez, yalnız yan paneller açılıp düşer (kaynak [A]); her tepsi bölmelerinde uyuyan yarasa (düzlem silüet, kapsüllü) | kesit ≥ %60 yükseklik; 26 dilim 360 px'te ≥ 5 px aralıkla ayrışır (aralık ≥ 15 px @1080); tek bölme kıpırtısı (P06→P07 kurulum) kenarda okunur |
| **tepsi yakın (P07)** | yuvarlak tepsinin bir dilimi üstten: **yuvarlak-köşeli bölmeler** (40/tepsi = 1.040/26, çıkarım; ekranda 12–16 görünür, halka sıralı, ızgara değil); tepsi çeliği `#6e7480`; bölme içi gölge `#3c3650` | tek bölme hücresi ≥ %12 (≥ 230 px); kanat titremesi ≥ 1.8 sn net; bölme biçimi **kaynaksız** → nötr |
| **belge + iptal mührü** | belge `#dccfb0`, 4 soyut satır + üst başlık şeridi (kalın çizgi, harf yok), kenarda **kıvrık**; mühür: yuvarlak, tutacak koyu ahşap `#4b3a44`, iz **büyük çarpı + daire**, `#b3261e`, ø ≈ %18 ekran | mühür oturmuş ≥ 1.4 sn net; "etkili" yok (senaryo v1.1): başlık şeridi mühür inene kadar **gizli**, vurulunca açılır; mühür **kırmızı tek**; mühür izi amber değil |
| **tüneyen çatı çizimi (P03)** | ahşap taramalı çatı hattı, Japon üslubu iddiası yok (sade eğik çatı + saçak) | çatı hattı ≥ %20 genişlik |

### 5.1 El ve kol (Paris dersine uygun)
- **Tek parça silüet**, iç dikiş/bant/tırnak yok; **dirsekli kol** (dirsek 100–130°), kadrajın bir kenarından girer, manşet kesik kenarda kalır. Havada tek kalkık parmak yok; kalemde başparmak + işaret + orta kıstırır, cımbızda başparmak + işaret.
- **Oran:** bilekten parmak ucuna 0.18–0.19 m; yarasa (9 cm) elin ≈ yarısı. Kıstırma noktaları gerçekten **değer** (kesişen yüzey, temas gölgesi).
- **Renk:** ten ışık `#d6b49c` · gölge `#8f7360` (Paris değerleri; C\* ≤ 28) · kenar ışığı `#e8b99a` 2 px sol-üst. Ten **imza amber'den ayrışır** (C\* 24 vs 74; ΔE76 ≥ 15).
- **Adams'ın eli (P02, P03, P04, P12):** sivil, yün tonlu kol `#6b5d52` + manşet `#d6cdb8`; saat/yüzük/düğme yok [G, kıyafet doğrulanamadı → nötr].
- **Fieser'in eli (P05, laboratuvar):** soğuk açık gri manşet `#cfd2d4` (L\* 84, C\* 2); **beyaz (saf) yok**; Adams'ın elinden manşetle ayrışır, ten aynı.

---

## 6. ÇÖL-ÜS karakter/prop ve ateş dili

**Doğrulanmamış (nötr) [A T2.4, G]:** üniforma, bina tipi, kontrol kulesi, hangar kemeri, kışla malzemesi, çöl bitki türü. Kule/hangar kemeri/bayrak/ABD yıldız işareti/yazı/numara **çizilmez**.
- **Yakıt tankı (kaynak: yarasalar tankın altına tünedi [A, tek dipnot]):** yatay silindir, boy:çap ≈ 2.4:1, **4 ahşap/çelik ayak** + alt kiriş; çevresinde korkuluk/merdiven yok; tank **yanarken çizilmez**. Tank altı = karanlık köşe `#2f2c45`; tünek = **alt kiriş + saçak kirişi** (yarasa tünemesi için gerçek yüzey). Ayak taban gölgesi sağa uzun.
- **Alçak yapılar:** tek katlı, alçak eğimli beşik çatı, **geniş saçak çıkıntısı** (karanlık köşeyi veren tek imza ayrıntı), yatay tahta kaplama ritmi, 1–2 küçük pencere (iç ışık yok). **Düzensizlik:** üç yapı farklı boy/genişlik/aralık, ızgara yok.
- **Zemin/alt üçte bir:** uzun gölgeler, toprak izleri, çalı topakları (ölü alan yok); P09'da zemin tank altına kadar iner.
- **Kompars:** ≤ 2 yüzsüz uzak siluet (P01b/P10 geniş); ana kadroda yüz yok (Adams kadrajda yalnız el). Kompars yerleşimi anlam taşır: kuşatan asker okunmasın (ordu "bakıyor/koşuyor" gibi), alev tarafına koşan veya bakan **tek** siluet.
- **Kıvılcım:** **tek amber nokta** ø 6 px + 2–3 px kuyruk izi; çok uçlu yıldız/kıvılcım yağmuru yok. Üç kıvılcım 0.5 sn arayla (D6), her biri kendi ışığını tank/saçağa düşürür (α .22).
- **Alev (gravür dili):** düz katmanlı yaprak biçimli diller, 3 katman: dış `#D8501F` (52/62, h 40°) · orta `#F29A2E` · çekirdek `#FFE3A0`; dil kenarı mürekkep konturu `#4f2a2a` 3 px, uçlar kıvrık, rüzgârla sağa eğik; **alev ≤ kadrajın %12'si**; ışığı çevreye α .20 amber havuz; duman tırtıklı gri-mor. Büyük gradyan/turuncu-sarı ateş topu yok.
- **Ton kuralı (gerekçe: ölçülü ton):** yarasa gövdesi **alevle aynı karede net olmaz**; P10'da sürü yalnız alev yarıçapının ≥ %50 ekran genişliği dışında **soluk nokta bulutu** (≤ 40 px, kontaksız) ya da kadraj dışı. Dokunuş notu (D5/D6) bu daha sıkı kuraldır; senaryo P10 "yarasa siluetleri alevden uzaklaşan bulutta" ile uyumlu okunur (§11 karar 2). Yarasa yanması/acı yok.

---

## 7. Harita (ABD; HARITA şablon diline uyumlu)

Şablon: parşömen kâğıt (`paper`/`paperDark`), mürekkep rota `rota_ciz` (divit damlası), iğne **mürekkep başlı** (`renk: "murekkep"`; pirinç yok), kart/etiketler yazı katmanında. **Kaynak: harita verisi kitte yalnız Fransa** (`fransa.json`) → **kit_eksik** (§11).
| Öğe | Tarif | Hex / ölçü |
|---|---|---|
| ülke gövdesi | **yalnız kıta 48 eyalet** (1943 ve bugün aynı sınırlar; Alaska/Hawaii çizilmez [G güvenli]); dolgu `#e0d3b4`, kıyı konturu 4 px `#2b2f45` | 1080'de ≈ 920 px genişlik |
| eyalet sınırı | ince, kıyıdan hafif; **tarama yok** | 2.5 px `#8a7f6a` |
| kâğıt / boş | `paperDark` `#d6c7a6`; köşe lekeleri ≤ 3 | |
| **rota P04** | Irwin (PA) → Washington, mürekkep çizgi; **~45 px uzunlukta** (iki nokta yakın) → `kamera_takip cs ≥ 4` (doğu kıyıya yaklaşır) ya da inset büyütme; rota ≥ 220 px ekranda | rota 6 px `#1c1915`; zarf ikonu rota ucuna |
| **Carlsbad (NM)** | küçük mağara işareti (kemer + 3 yarasa) — yalnız bağlam | ikon 56 px, kontur 3 px |
| **Dugway (UT)** | çöl üzerinde **düzensiz** küçük ev ikonları (5–7 adet; beşik çatı + kare gövde; "Japon" iddiası/üslubu yok) + yarasa bulutu (14–20 birey ≥ 24 px) köyün üstüne iner | ev ikonu 40 px; yarasalar §3 uçan poz |
| **iptal mührü (P11b)** | MASA belgesinde (HARITA `muhur` yalnız harita sahnesinde) | `#b3261e` |
| etiketler | PENNSYLVANIA, WASHINGTON, CARLSBAD, DUGWAY yazı katmanında (dil başına) | Plex Mono |
Kuzey oku/ölçek çubuğu çizilmez. Uzak: harita %45 alt üçte birinde dolu (eyaletler, kâğıt lekesi, ikon); ölü alan yok.

---

## 8. Tipografi ve dil-nötr kural

- **Kit standardı korunur** (`src/kit/yazi.tsx`): ekran yazısı kâğıt şerit + Playfair 900, tek kırmızı vurgu kelime; formül Plex Mono; üst bant y 240–400. Bu bölümde replik yok. Yazı genişliği font metriğiyle ölçülür (`fontMetrik`), tahminle değil.
- **Görüntü yazısız render edilir.** Defter, zarf, belge, mühür, tank, harita, kovan üzerinde **harf yok**: satırlar soyut çizgi, başlıklar kalın şerit, mühür **çarpı**; ay/tarih/etiket/sayaç dil başına yazı katmanında.
- Yazı katmanı (şerit kâğıdı L\* ≈ 89) §1.7'nin piksel ölçümüne **girmez** (görüntü katmanı ölçülür).

---

## 9. Tekrar eden motifler (bölüm içi)
1. **Amber kapsül** (§2): boşluk → kapsül → köz → alev → iz.
2. **Mürekkep spirali** (§3.4, §4): defter ↔ ÇÖL-ÜS ↔ defter (döngü).
3. **Çatı hattı + 72° tarama**: P03 çizim → P12 yanmış saçak.
4. **Kâğıt-mor gölge / gül-altın ışık** her planda aynı karşıtlık.

---

## 10. Kaynaksız → nötr / doğrulanmalı ([G] listesi)

| # | Ayrıntı | Durum | Nötr karar |
|---|---|---|---|
| G1 | Kanat açıklığı (≈ 3.1 × gövde) | kaynakta yok [G] | çizimde sabit oran; sayı verilmez |
| G2 | Kapsül boyu/oranı, kapak/halka biçimi | [A: yalnız selüloz kap, yapıştırıcı]; geri kalan [T] | ×1.5 stilize; metin/sayı yok |
| G3 | Kapsül rengi amber (selüloz) | [T] | imza kararı; gerçek renk iddiası yok |
| G4 | Zamanlayıcı biçimi/ışığı | [A özet, tek]; "kırmızı nokta" dönem dışı | köz nabzı (§2), kadran/LED yok |
| G5 | Kovan: tüp 1.5 m, 26 tepsi ø 76 cm, 1.040 yarasa | [A Duffin, TEK] | kesit çizilir; bölme biçimi nötr; paraşüt çizilmez |
| G6 | Tepsi bölmesi biçimi (40/tepsi) | çıkarım | yuvarlak-köşeli, sade |
| G7 | Yakıt tankı biçimi/boyu, bina tipi, saçak | tank altı [A TEK]; gerisi [G] | yatay silindir + ayak; alçak nötr yapı; kule/hangar kemeri yok |
| G8 | Üniforma, kompars kıyafeti | doğrulanamadı | yüzsüz siluet, aksesuarsız |
| G9 | Çöl bitkisi, uzak tepeler | [G] | tür adı yok, düz tepe sırası |
| G10 | Güneş saati/yüksekliği (geç ikindi, 9°) | yangın saati kaynakta **yok** [T] | "geç ikindi" varsayımı; açıkça işaretli |
| G11 | Dolma kalem, abajurlu masa lambası, defter | [G güvenli: 1940'lar ABD]; doğrulanmadı | lamba gövdesi çizilmez; kalem uçsuz altın yok |
| G12 | Zarf/not boyu, Beyaz Saray zarfı | [G] | yazısız, pul/mühür yok |
| G13 | Dugway evleri: yapım 1943 [A K4]; biçim/malzeme | [A yer/yıl]; biçim [G] (HAER UT-92 bakılmalı) | nötr ev ikonu |
| G14 | Commons yangın fotoğrafı içeriği | künye PD; **görsel görülmedi** | referans olarak kullanılmadı; hangar/kışla/araba çizilmez |
| G15 | Eyalet sınırı (48 eyalet 1943) | [G güvenli] | kıta 48 çiziliyor |
| G16 | Yarasa sayısı/ağırlığı | 14 g vs 7–12 g çelişkisi | gram yok; ekranda 120–220 birey |

**Dönem hatası taraması (mevcut görsel yok; risk listesi, eleştirmen bakar):** LED/elektronik devre okuması (kapsül, nabız) · plastik/parlak sentetik yüzey (kap = selüloz, mat-yarı saydam) · modern el feneri/LED masa lambası · tükenmez kalem · ABD bayrağı/yıldız işareti/ordu arması · kâğıt para/pul/damga · drone sürüsü gibi düzenli ızgara · blueprint mavi baskı (dönem uygun ama sıcaklığı öldürür, kullanılmaz).

---

## 11. Orkestra kararları, devir ve kit_eksik

**Karar 1 (köz).** Senaryo P09 "kırmızı noktalar yanıp sönüyor" → görselde **amber köz nabzı**; ekran yazısı "Zamanlayıcılar işliyor" aynı kalır. Gerekçe: LED dönem dışı + kırmızı yalnız vurgu/alev/mühür. Senaryo metni değişmez; yönetmen json'da "amber nabız" eşler.
**Karar 2 (ton).** Yarasa–alev aynı kare kuralı §6'daki gibi dokunuş notundan daha gevşek değil: net yarasa yok; uzak soluk nokta bulutu serbest. Eleştirmen kontrol eder.
**Karar 3 (P03 kırmızı alev).** Defter alevi kırmızı mürekkep (vurgu); gerçek dünya alevinde dış katman kırmızı-turuncu, iç amber. İmza amber **kapsülde**; alev sonucudur. Gerekçe: senaryo "kırmızı alev" diyor, amber yalnız kapsül/nabız/alev çekirdeği.
**Karar 4 (ışık yarım küresi).** Lamba sol-üst, güneş sol-alçak: P12 geçişi sıçramasın.

**Motion / kit_eksik (mekân sorumlusu ve motion için):**
1. `yarasa` rig (§3) + `sürü` {seed, a, b, kol, N} + `tunek_dalgasi` + `kapsul` (+ `kapsul_nabiz`) — **yeni kit parçası, bir bölüm json'ında render edilmiş karede kanıtlanınca kabul** (kural 5).
2. MASA-INSERT yeni proplar: `defter`+`kalem`+`cizim` (çizim animasyonu + P03 morf + P12 dönüşüm), `zarf+not`, `cimbiz`, `kovan_kesit`, `tepsi_yakin`, `belge+muhur`.
3. ÇÖL-ÜS şablonu: `tank`, `alcak_yapi`, `sacak_alti`, `sürü_golgesi`, `kivilcim_dizisi`, `alev` (§6 dili).
4. HARITA ABD görünümü (kıta 48 eyalet konturu verisi; kamera cs ≥ 4 yakınlaşma sınırı kitte yetmezse `kit_eksik`).
5. El/kol: Paris el silueti (`KolEl`/`ParisEl`) bu bölüme `adams` ve `lab` manşet/ten parametresiyle; iç dikiş/tırnak yok.

**Hedef kare (tek, kullanıcıya gitmez, orkestra yetkisi tur-2):** Gemini yok (bütçe + onay). Önce **motion kalibrasyon karesi**: P09 `kontrol_kare` (tank altı + köz) + P03 son kare (defter alevi) + P08 spiral ayna; eleştirmen ölçüm tablosu (§1.7) ile.

**Bir sonraki ajana:** mekân sorumlusu: ÇÖL-ÜS mimari kartı (beşik çatı, saçak, tank), defter dokusu, saçak altı tarama; palet §1.4–1.5 bağlayıcı, imza bandı kapsül dışında yok. Motion: önce 1–3 kalibrasyon karesi.
