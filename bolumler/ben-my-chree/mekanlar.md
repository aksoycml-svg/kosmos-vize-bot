# Ben-my-Chree · Mekân Şartnamesi (kurulum ekibi, adım 5b)

Hazırlayan: mekân sorumlusu · 2026-11-15 · Girdiler (kesin): `tasarim.md` (palet §1, imza KOR §2, gemi kartı §3, karakter/prop §4–5, reçete tablosu §6, [G] listesi §8, yön karesi §9), `sahne-plani.md` (§0 ışık, §2 zaman, §4 plan plan, §9 parametreler, §10 kalibrasyon), `arastirma.md` (§1, §5, §10), `notlar/tur-0, tur-3` ("Paris gibi", "görseller zengin"). Çıta: Paris `mekanlar.md` biçimi, `hedef/hedef-ozet.jpg`, `kalibrasyon/tam-render-3/genel-tr.jpg` (bakıldı: 5 düz basamaklı gök, mavi-mor gölge + gül-şeftali kenar ışığı, flu uzak katman, gölgede gravür taraması, kâğıt lifi, kadrajın tek doygun sıcak noktası).
Bu belge **şartnamedir, kod değildir.** Görsel üretilmedi, Gemini çalıştırılmadı, git yapılmadı. Hex'ler `tasarim.md` §1 paletinden; yeni hex yalnız **[yeni]** etiketli ve aynı C* ≤ 28 / L* ≤ 88 sınırında.

Etiketler: **[A]** arastirma.md'de kaynaklı · **[S]** sahne planı · **[G]** genel bilgi, kaynağı açılmadı → nötr çizilir, **doğrulanmalı** · **[T]** tasarım/sahne kararı (tarihî iddia değil).

### Özet kararlar (orkestra için)
0. **Çıta (tur-6, kullanıcı: "kolaya kaçmayalım"):** üç mekân üç ayrı dünyadır (§0.0). Her kadrajın ön, orta ve arka planı, atmosferi ve **ışık olayı** somut yazıldı (§1.6, §2.5, §3). Reddedilir: düz panel, tek renk ailesi, boş gök, ızgara tekrarı, "yeterli" sade çözüm. Her katmanın z mesafesi verildi; dolly ve dolly zoom desteklenir (§0.11).
1. **Dört şablon, 18 görünüm:** LIMAN (6), GEMI-INSERT (7), KIYI-BATARYA (4: + `saygi`), HARITA-MEIS (1). Tek dünya modeli: gemi, ada, mevzi ve güneş aynı koordinatta (§0.1). Ekran konumları sahne planınındır; pusula yönü `b` yalnız ışık, gölge ve rüzgâr için kullanılır.
2. **P01 kamerası fiziksel olarak düzeltildi (yönetmene).** Sahne planındaki "yükseklik 1.2 m" ile "ufuk y 800, su hattı y 1050, gemi 670 px" birlikte olamaz: 1.2 m gözden 2 km'deki su hattı ufkun yalnız ~7 px altına düşer. Çözüm: kamera **kayanın 1.2 m üstünde, ama kaya deniz seviyesinden ≈ 50 m yüksekte** (mevzi yamaçta) [T; mevzi yüksekliği kaynakta yok, **doğrulanmalı**]. Böylece F = 11 270 px, Z(gemi) = 2 000 m, su hattı y ≈ 1047 olur (§1.3). P04 kamerası da aynı yamaçta, mevziin ≈ 6 m altında olur (§3.4).
3. **Su yolu yok, yan ışıltı var.** Güneş eksenden 45° sağda, telefoto kadraj ±2.75°. Bu durumda sürekli ışık yolu fiziksel olarak kadraja düşmez. Sıcaklık, güneşe dönük dalga sırtlarından gelir: gül-altın kısa vuruşlar kadrajın sağına doğru seyrekten sıkıya üç basamakla artar (§0.7). Tasarım §9'daki "sağ-üstten kameraya ışık yolu" yalnız `rihtim-yan` ve `hangar-yakin`te (rel 25–30°) kadrajın sağ kenarında kısmi yol olarak çizilir.
4. **Rüzgâr tek vektör:** dünyada **335°'ye doğru** (güney-güneydoğudan esen) [T]. Bu yön, duman taşıyan bütün gemi çekimlerinde (P01, V2, V3, P07a–c, P08, P10a) dumanı **ekranın sağına** yatırır. Böylece kesmeler arasında duman yönü dönmez. Bayrak ve ot her görünümde bu vektörden türer (§0.8 tablo).
5. **Meis imzası:** kayalık burun üstündeki **kale** (sol), limandan yamaca **amfi gibi tırmanan** bitişik, farklı yükseklikte, düz lentolu, kepenkli evler (biçim ve renk kanıtsız [G], nötr dizi). Arkasında 3 soğuk sırt katmanı vardır. **Kemer yok** (§0.4).
6. **Uzak sırtlar dikeyde ×0.3 sıkıştırıldı [T].** Gerçek oranda ada tepeleri (≈ 270 m [G]) telefotoda kadrajın üstünden taşar ve gök hiç görünmezdi. Gök, sıcak ufuk bandını taşıdığı için gerekli. Bu "tiyatro dekoru" sıkıştırmasıdır; yapı tipi ve dönem değişmez.
7. **Kaş kıyısı imzası:** gri-beyaz karst kireçtaşı, keskin oluklu kaya yüzü, ceplerde soluk kızıl toprak, **koyu-zeytin yaprak dökmeyen maki** ve tek koyu **kaya oyuğu** (mevzi). "Kuru ot" yalnız geçen yazdan kalmış sap olarak çizilir. Gerekçe: Ocak, Likya kıyısında yağışlı mevsimdir [G, doğrulanmalı].
8. **Gemi = mimari.** Gemi kartı `tasarim.md` §3'ten alınır. Hangar kapısı hangarın **iskele (kameraya ve bataryaya bakan) yan duvarında**, kıç ucuna yakın konur [G]. Daha olası seçenek derrick'e bakan kıç uç duvarıdır (açık soru 3); sahne planındaki ışık ve kadraj yan duvar kapısıyla tutarlı olduğu için yan duvarda kalır.
9. **Tarama kalınlığı alt sınırı 2.0 px:** GORSEL-RECETE A9'daki 1.1/1.6 px değerleri 360 px'te 0.37/0.53 px'e iner ve yok sayılır (CLAUDE "Gravür telefonda okunur"). Uzakta tarama yok; orta 2.0 px / 9 px; yakın 2.2 / 7.5; insert 2.6 / 8.
10. **HARITA-MEIS kıyı verisi:** Natural Earth 10m bu ölçekte (2 km'lik boğaz) Meis'i 3–5 noktaya indirir ve kullanılamaz. Öneri: GSHHG "full" (LGPL, veri serbest) ya da OSM kıyı çizgisinden elle sadeleştirilmiş iz (ODbL, açıklamada atıf). Orkestra kararı (§4).
12. **P10a saygı anı (yönetmene düzeltme önerisi):** sahne planındaki b 100 ile "arkada batık gemi + solda kale" fiziksel olarak birlikte olamaz. Batarya'dan enkaz ve kale 190°–200° yönündedir; b 100'de ikisi de kameranın ≈ 90° sağında, kadraj dışında kalır, sol taraf da anakara olur. Bir başka sorun da şu: yüzü görünen (profil) bir figür, kendi bakış yönündeki nesneyi asla kadrajın içinde tutamaz. **Çözüm (hilesiz):** P10a = P01/P06 V1 dünyası. Kamera b 190°, mevziin ≈ 20 m gerisinde, telefoto F 11 270, 0.6° aşağı tilt (göz hizası y 643). Erler ve teğmen ön planda profil olarak sağa (batıya, gün batımı denizine) bakar; enkaz ve kale arkada, gerçek yerlerindedir. Alçak güneş (az 235, 6°) yüzlerin **ön düzlemini** (alın, burun, çene, göğüs) gül-altınla aydınlatır; kameraya bakan yanaklar mavi-mor gölgede kalır. Uzun gölgeler kameraya ve sola düşer (§3.6).
13. **Dolly / dolly zoom (tur-6 notu):** bütün görünümler katman başına Z ile kurulur (2.5D). Dolly zoom öneri anı: **P04** (oyuk aynı boyda kalır, Likya sırtı ×2 büyüyerek üstüne kapanır; fiziksel olarak güçlü). Alternatif **P07c** (yanan gemi sabit, ada ve kale "sahne perdesi" olarak büyür; [T]). 2 km'deki gemiyle gerçek dolly zoom telefonda okunmaz. Karar yönetmenin (§0.11).
11. **Yön karesi zorunlu (Paris çıtası 1):** §5'teki iki İngilizce tarif (P01 k124, P07b k2388) kullanıcıya gider. Teğmen için P05 k150 ayrı kare olarak gider (tasarım §9). Onaydan önce motion kod yazmaz.

---

## 0.0 Üç dünya: her mekânın kendi estetiği (aynı çizgi ailesi, aynı kâğıt; ayrışma ışık, malzeme ve kompozisyonla)
| | **LIMAN — "ışıklı liman, sahne perdeleri"** | **KIYI-BATARYA — "taşın sabrı"** | **GEMI-INSERT — "makinenin içi"** |
|---|---|---|---|
| Duygu | güven, düzen, kış öğleden sonrasının durgunluğu → yangın → gün batımında sessizlik | gizlilik, emek, sabır; sonunda ağırbaşlı saygı | düzenli makine → kırılan makine → terk |
| Baskın şekil | **yatay katmanlar** (su vuruşu, rıhtım, gövde) + dikey karşı ritim (baca, direk, kule) | **yükselen diyagonal** (yamaç) + dikey karren olukları + oyuğun karanlık ağzı (çerçeve içinde çerçeve) | **diyagonal gerilim** (bumba, halat, zincir, eğik gövde) + tekrar eden küçük ritim (perçin, dikme, tahta) |
| Kompozisyon fikri | 6–8 "tiyatro perdesi": arkadan öne gök → sırtlar → amfi kasaba → kale → gemi → su → kaya. Derinlik buğu ve flu ile | ön planda kaba kaya kütlesi, kadrajı **oyuk ağzı** ya da kaya kenarı çerçeveler; figür ve namlu çerçevenin içinde. Arkada uzak deniz şeridi ve ada | sığ derinlik, **büyük ön plan nesnesi** (makara, korkuluk, kapı); arka plan dar bir gök ya da su penceresinden görünür; kadraj diyagonal bölünür |
| Işık karakteri | yumuşak kontrajur (rel 25–45): kenar ışıklı siluetler, **su ışıltısı** sağ tarafta, sıcak gök alt bandı | sert ön ve yan ışık (rel 135–220): **sıcak taş** ↔ mor oyuk, keskin gölge kenarı. Gün batımında profil ışığı | **sıyırıcı yan ışık** (rel 275–325): perçin, tahta ve halat dokusunu ortaya çıkarır. P07b'de anahtar ışık alevdir (nokta kaynak, ışınsal gölge) |
| Malzeme ve doku | kireçtaşı rıhtım, pastel sıva mozaiği (5 ton), kepenk çıtası, su vuruşu, buğu | karst kireçtaşı (oluk, kırık kenar, kızıl toprak cebi), maki lobu, ot sapı, toz; topta ahşap tekerlek ve çelik | perçinli çelik levha, ahşap güverte (damar + ek), halat bükümü, bez kanat, pirinç yok; duman ve alev |
| Sıcaklığın taşıyıcısı | gök alt bantları, ışıltı, kale ve ev sağ yüzleri | taşın ışık yüzü, toprak, yüzlerin ön düzlemi | kenar ışığı, ahşap, su ışıltısı; P07b'de alev havuzu |
| Kontrast | orta (buğulu) | yüksek | yüksek; P07b'de en yüksek |
| Tarama yoğunluğu | az (yalnız saçak/gövde altı) | orta (oyuk dudağı, kaya gölgesi) | çok (bot içi, kapı çerçevesi, makara, duman gölgesi) |
| Tekrar riski ve önlemi | evler: `siraUret` seed, komşu farkı; su vuruşu: satır başı x ofseti | karren: oluk aralığı ve boyu ±%40 | perçin: sıra başına seed'li eksik perçin %8; dikme aralığı ±%5; tahta ek çizgisi seed'li |

## 0. Ortak sistem (dört şablonda aynı)

### 0.1 Dünya koordinatı ve kamera
- **Dünya:** x = doğu, y = yukarı, z = kuzey (m). Orijin: gemi su hattında, baş–kıç ekseninin ortası. Gemi pruvası **doğuya** (090°) bakar. İskele tarafı kuzeye (anakaraya, bataryaya ve P01 kamerasına), sancak tarafı güneye (kasabaya) bakar. Batarya/P01 kamerası: (−350, 50, 1 970) [T] → ekseni b = 190°.
- **Ekran:** kit kuralı `ekran = (d − 540|960)·cs + 540|960 + (cx|cy)`. cx/cy pan/tilt'tir, parallaks vermez.
- **Ufuk–ölçek:** göz hizası y_g, odak F (px, cs 1); Z mesafesinde h m yüksekliğindeki nokta `y = y_g + (e − h)·F/Z`, ölçek `px/m = F/Z`. Deniz ufku, göz hizasının `√(2e/6.371e6)·F` px altındadır (e = 50 m'de 0.226° → F 11 270'te 45 px).
- **Kameradan görünen** her mimari kartta ayrıca yazılıdır.

### 0.2 Güneş vektörü (tek kaynak; sahne planı §0)
`L = (sin az·cos h, sin h, cos az·cos h)`, az 235°. Gölge boyu = yükseklik × 1/tan h.
| Durum (tasarım §1) | Planlar | h | L (ışığa doğru) | gölge × |
|---|---|---|---|---|
| A | P01–P05 | 22° | (−0.759, 0.375, −0.532) | 2.48 |
| A | P06 | 20° | (−0.770, 0.342, −0.539) | 2.75 |
| A | P07 | 18° | (−0.779, 0.309, −0.546) | 3.08 |
| B | P08 | 16° | (−0.787, 0.276, −0.552) | 3.49 |
| B | P09 | 12° | (−0.801, 0.208, −0.561) | 4.70 |
| C | P10a | 6° | (−0.815, 0.105, −0.571) | 9.51 → çizimde ≤ 6× [T] |
`isik.ts` bu tabloyu `gun_yuksekligi` anahtarıyla üretir. Elle gölge ofseti yazılmaz (A1).

### 0.3 Görünüm başına ışık, tarama açısı, rüzgâr
`rel = (235 − b) mod 360`. Tarama θ ekranda ışık yönüne diktir (0° = yatay, saat yönünün tersine). Rüzgâr ekran bileşeni `sin(335 − b)`: + değer sağa, − değer sola.
| Görünüm | b | rel | Işık ekranda | Gölgede kalan yüz | θ | Rüzgâr (duman, bayrak, ot) |
|---|---|---|---|---|---|---|
| LIMAN `kiyidan-ada`, `enkaz`; KB `top-onplan` | 190 | 45 | sağ-üst-arka (kontrajur) | kameraya bakan her yüz | 105° | +0.57 sağa, kameraya doğru |
| LIMAN `ada-rihtim` | 120 | 115 | sağdan, hafif önden | sol yüzler | 80° | −0.57 sola |
| LIMAN `karsi-kiyi`; KB `yamac-oyuk` | 15 | 220 | sol-arka (ön ışık) | sağ yüzler, oyuk içi | 60° | −0.64 sola |
| LIMAN `rihtim-yan` | 210 | 25 | sağ-arka-üst (kontrajur) | ön yüzler | 110° | +0.82 sağa |
| LIMAN `hangar-yakin` | 205 | 30 | sağ-arka-üst | iskele duvarı, kapı | 110° | +0.77 sağa |
| GI `kic` | 320 | 275 | soldan yan | sağ yüzler | 80° | +0.26 sağa |
| GI `korkuluk` | 290 | 305 | sol-ön | ön ve sağ | 70° | +0.71 sağa |
| GI `bas-capa` | 20 | 215 | sol-arka (ön ışık) | sağ yüzler | 60° | −0.71 sola |
| GI `kic-su`, `bot` | 300 | 295 | sol-ön | ön ve sağ | 75° | +0.57 sağa |
| GI `hangar-kapi` | 270 | 325 | sol-ön-üst; **anahtar = alev** | kapı ve iskele duvarı | 65° (güneş kenarı) / alev için ışınsal | +0.91 sağa |
| GI `korkuluk-su` | 320 | 275 | soldan yan, alçak | sağ yüzler | 80° | +0.26 sağa |
| KB `tegmen` | 100 | 135 | sağ-arka | yüzün ön düzlemi | 95° | −0.82 sola |
Kenar ışığı her görünümde yalnız ışığa dönük kenarda 2–3 px `#eec5a2` (C'de `#e4b496`) çizilir (A7).

### 0.4 Açıklık sözlüğü: bu bölümde KEMER YOK
| Öğe | Tip | Geometri |
|---|---|---|
| Meis ev pencereleri | `duz` (lento) | Dikdörtgen, oran 1 : 1.6 (≈ 0.9 × 1.45 m) [G], açık iki kanat kepenkli. Söve yalnız yakında (P03a) 0.10 m |
| Meis ev kapıları | `duz` | 1.1 × 2.3 m [G]; yarım daire tepe penceresi çizilmez (kanıtsız, kemer okunur) |
| Kale | mazgal dişi (dikdörtgen merlon) + 1–2 dar dikdörtgen yarık | kemerli kapı çizilmez (görünmez yüzde, kanıtsız) |
| Gemi lumbuzu | daire ø 0.35 m [G] | yalnız GEMI-INSERT'te; LIMAN'da 1.5–2 px nokta |
| Köprü üstü pencereleri | dikdörtgen | 4 nokta şerit (tasarım §3) |
| Hangar kapısı | dikdörtgen, çift kanat, dışa açılır | tasarım §3; çerçeve 0.15 m |
Kural: `Kemer.tsx`'ten yalnız `duz` çağrılır. `yarimDaire`, `basik`, `sivri` ve `osmanli` çağrılmaz. (Blanc dersi: motion yazılmayan kemeri sivri çizdi.)

### 0.5 Mesafeye göre ayrıntı (LOD)
| Sınıf | ekran px/m | Kontur | Doku | Tarama | Süsleme |
|---|---|---|---|---|---|
| insert | ≥ 250 | 6–8 px (`ink(dolgu)`) | ahşap damarı, perçin sırası, halat bükümü, taş oluğu | 2.6 px / 8 px | perçin, menteşe, kanca |
| yakın | 40–250 | 4–6 px | güverte tahtası, taş sırası (2'de 1), kepenk çıtası | 2.2 / 7.5 | imza ayrıntı |
| orta | 8–40 | 2.5–3 px | yalnız pencere/kepenk ritmi, gövde lumbuz noktası | 2.0 / 9 (yalnız saçak altı, gövde alt gölgesi) | yok |
| uzak | < 8 | yok | düz ton | yok | tek siluet |
P01'de gemi 5.6 px/m (uzak-orta sınırı): kontur 2.5 px yalnız gövde siluetinde, iç ayrıntı düz ton. Kale ve kasaba (≈ 4.9 px/m) kontursuz siluet + pencere noktaları (4×7 px).

### 0.6 Doku katmanları (yüzey başına ≤ 3), seed, arşiv
1. Taban deseni (taş oluğu, güverte tahtası, perçin, dalga vuruşu) · 2. `doku/Tarama` (yalnız §0.9 yerleri) · 3. `ArsivKatmani litografi` (kâğıt lifi .14, gren .10, mor vinyet .22, doygunluk düşürülmez).
- Sarmalayıcı: her şablon `<SahnePlaka arsiv="litografi" titreme renkKaydi>` ile sarılır. `RenkKaydi` dx 1.5 / dy 1.0, `KonturTitreme` uzak 1.2, orta 2.0, yakın 2.6, insert 3.0.
- **Seed (sabit, kaynamaz):** `DOKU_SEED.liman 181`, `gemiInsert 191`, `kiyiBatarya 193`, `haritaMeis 197`. Alt seed = taban + k (ev sırası +1, sırt +2, dalga vuruşu +3, ışıltı +4, duman lobu +5, alev yaprağı +6, kaya oluğu +7, maki +8). Rastgelelik **dünya koordinatına** bağlanır, kareye ya da kameraya bağlanmaz (Paris P07 "şehir titriyor" dersi). Yalnız ışıltının yanıp sönme fazı zamana bağlıdır (vuruş başına sabit faz, 0.4–0.9 Hz). Dalganın kendisi kaymaz.
- `TasDuvar` bulutlanma katmanı kapalı. Yüzeyde en çok 2 ton basamağı olur, yumuşak gradyan yok. İstisna yok: alev havuzu da basamaklıdır.

### 0.7 Su dili (ortak modül önerisi `SuYuzeyi`)
- **Satırlar:** dalga vuruşu satırları dünyada eşit aralıklıdır (Δz = 6 m). Ekran y'si ufuk–ölçekten gelir: `y_i = y_g + e·F/Z_i`. Satır aralığı < 3.5 px ise satırlar birleştirilir: en az 3.5 px aralık. Vuruş uzunluğu `L = 2.2 m·F/Z` (sınır 6–60 px), kalınlık 2 px (uzak) → 3 px (yakın), seed'li ±%30 boy ve %20 boşluk. Izgara yok: satır başına x ofseti seed'li.
- **Üç ton (tasarım §1.2):** taban `#5f7fa6`. Gölge vuruşu (dalga sırtının arka yüzü) `#4c5780`. Işıklı vuruş (güneşe dönük sırt): A `#e6c498` · B `#eac3a2` · C `#e4b496`. Kameraya yakın derin su `#46628a`, tarama aralığı 7.5 px.
- **Yan ışıltı (rel 45 görünümleri):** ışıklı vuruşun oranı ekran x'iyle üç basamakta artar: x < 360 → %6 · 360–720 → %14 · > 720 → %26. Sıçrama tepeleri `#f3d9b6` (L* ≤ 88): vuruş başına ≤ 1, 3–6 px, yalnız x > 600.
- **Kısmi ışık yolu (rel 25–30):** kadrajın sağ kenarında x 820–1080, ufuktan aşağı genişleyen üçgen bölgede ışıklı oran %45. Bu, güneşin kadraj dışındaki yerini gösterir.
- **Yansıma:** gemi/kale/ev yansıması dikey olarak su hattından aşağı aynalanır. Dolgu = kaynak rengi %40 + su tabanı %60. 4–6 px yatay dilimlere bölünür, aralarda 3 px boşluk kalır, dilimler seed'li ±6 px kayar. Uzunluk kaynak yüksekliğinin %60'ı. Yansımada kontur yok. Kor yansıması C* ≤ 28 `#e0b090` (imza tekilliği).
- **Halka (`halkalar[]`):** düz eliptik çizgi, en/boy = 1 : sin(bakış açısı) (P01 için 1:0.03 → yalnız 2 yatay çizgi; yakın görünümde 1:0.25). Işık yarısı `#e6dac6`, gölge yarısı `#9aa6c0`, 2.5 px. Büyür (r ∝ √t), 3 halka 10 kare arayla doğar; çizgi 1 px'e incelir ve **kırılarak** biter (vuruşlara bölünür). Fade yok.
- **Köpük / kıç köpüğü:** düz, kırık kenarlı yatay lekeler `#e6dac6`; gölge tarafı `#9aa6c0`. Pervane boşa dönerken (P07a) leke sayısı 2 → 7 büyür, yer değiştirmez.
- **Dalga izi (`dalga_izi`, bot):** V açısı 2×19.5° (Kelvin) dünyada. Kollar 3–5 kırık eğik vuruştan oluşur, ışık yüzü `#e6dac6`. Kollar bot geçtikten 2 sn sonra halkaya dönüşür (P08b → P09 taşıyıcı).
- **Su sütunu (E3, SARAYBURNU kodu):** gövde `#e6dac6`, gölge yüz `#8f9bb8`, gölge yüzde dikey tarama (2.2 px / 7.5 px, 3–5 çizgi). Tepede 5–7 yapraklı taç, tabanda elips halka. Kenar ışığı ışığa dönük kenarda (rel 25 → **sağ** kenar ve taç üstü) `#eec5a2` 3 px. Zaman: yükselir 24 kare (ease-out), tutar, çöker 22 kare; çökerken taç yaprakları **ayrı damlalar** olarak düşer ve su yüzeyine değince halka doğurur. Su sütunu suyun içinden doğar; havada belirmez.

### 0.8 Duman ve alev gravür dili (COL-US `alev` + `duman` kodu)
- **Duman:** tırtıklı kenarlı lob kümesi; her lob bir daire (r 30–90 px, seed'li). Kümenin dış konturu kırık yaylardır, kontur 3 px `#3a3450`. Üç ton: ışık yüzü (ekranda güneşe dönük taraf) `#b5a9ae`, gölge `#5e566e`, çekirdek `#3a3450`. Alevin üstündeki alt yüz `#e0b090` (2 basamak, C* ≤ 28). Gölge yüzde tarama: 3–5 paralel çizgi, 2.2 px, aralık 7 px, açı θ (§0.3). Kenar ışığı lobun güneş tarafında 2 px `#eec5a2`.
- **Hareket:** loblar 40–70 px/sn yükselir. Rüzgâr bileşeni §0.3'e göre yanal sapma yaratır: `dx = 0.6·rüzgâr·t²` px (kademeli yatma). Loblar büyür, kadrajın üstünden çıkar. **Fade yok.** Seed'li lob dizisi dünyaya bağlıdır.
- **Kalınlık durumu:** `vurulmus` = tek ince sütun (genişlik 0.8 m, P01'de 5 px ⇒ minimum 14 px) · `yanan` = kalın sütun (genişlik 1.0 × hangar boyu, P07c'de 160 px tabanda, tepede 420 px), kadraj üstünden çıkar · `batik` (P10a) = duman yok (kor söndü, tasarım §2).
- **Alev (imza KOR, tasarım §2):** 3 yaprak katmanı (dış `#d9501f`, orta `#f58a2e`, çekirdek `#ffd48a`), 5–7 yaprak, seed'li boy. Uç rüzgâr yönünde kıvrılır. Kontur `#3a2c36` 2.5 px. Alev içinde tarama yok. Yaprak boyu 4–6 Hz ile ±%12 salınır (faz yaprak başına sabit). Yıldız, şok halkası, kıvılcım yağmuru yok.
- **Alevin ışığı (P07b, P07c):** 3 düz basamaklı havuz (`#e4b296` α .45 / .28 / .14). Basamak sınırları alev tabanından 0.6 / 1.3 / 2.4 m'dedir. Havuz yalnız alevi gören yüzeye düşer (kapı eşiği, güverte, tayfa ön yüzü, duman alt yüzü). Gölgeler alevden dışa ışınsal düşer (`golgeCokgen` nokta kaynak modu).

### 0.9 Tarama nerede
- **Yalnız şu yerlerde:** gemi gövdesinin alt gölge şeridi (su hattı üstü 0.3 × borda), baca arka yüzü, hangar saçak altı, kapı çerçevesi iç yüzü, can botu iç gölgesi, kale gölge yüzü (taş sırası 2'de 1), ev saçak altları (yalnız P03a), kaya oyuğu ağzının üst dudağı (II–III), karst kaya gölge yüzü (yalnız yakında), duman gölge yüzü, su sütunu gölge yüzü, katır/top/tekerlek gölge yüzü, teğmen yanak gölgesi (4–6 kısa çizgi).
- **Taranmaz:** gök, deniz yüzeyi (vuruşlar tarama sayılmaz), geniş gövde levhası, hangar duvarının geniş yüzü, güverte, ev cephelerinin geniş yüzü, harita karası. Geniş gölge düz koyu tonla verilir.
- Çapraz tarama yalnız ≤ 120 px derin gölgede: oyuk ağzının iç köşesi, kapı menteşe aralığı, can botu altı. Kafes deseni yok.

### 0.10 Ortak varlık: KAYA OYUĞU (`KayaOyugu`, LIMAN + KIYI-BATARYA aynı dünya nesnesi)
- **Dünya:** mevzi noktası M = (−350, 48, 1 975) [T]. Mevzi, yamaçtaki kireçtaşı çıkıntısının içinde doğal bir **kaya sığınağıdır** (karst oyuğu) [G]. Taban düz bir kaya sekisidir. Ağız güneye (denize) bakar: 4.5 m genişlik, sarkan üst dudağın altında 2.6 m yükseklik, 3 m derinlik. Dudak doğuya (P01/V1'de sola) doğru alçalır. Arkada (kuzeyde) yamaca tırmanan dar bir **yarık** vardır; katır ve top bu yoldan gelir [T]. Ağız biçimi basık, asimetrik, kırık kenarlıdır. **Yapı değildir**; düzgün kemer çizilmez.
- **Gölge fiziği:** h 20–22°'de dudak gölgesi ağzın 7 m gerisine kadar uzanır; sığınağın içi bütünüyle gölgededir. Top ve erler gölgede, deniz ışıkta kalır. Bu, "gizli batarya"nın ışıkla anlatımıdır ([T]; kamuflaj yok).
- **Görünüm:**
  - P01 ve P07c: kamera çıkıntının üstünde, sığınağın arkasında. Oyuk, yarıktan aşağı bakılan karanlık bir çukur olarak ön plan kayasında görünür (iç `#2e2a44`). Dudak ışıkta `#b89a86`, sağda 2 px kenar ışığı.
  - P04: aşağıdan, güneyden görünür. Ağız ön ışık alır, içi yine karanlıktır.
  - P06 V1 ve P10a: kamera yarığın içinde, mevziin ≈ 20 m gerisindedir ve sığınağın içinden denize bakar. Telefoto (dikey 9.7°) yüzünden dudak ve duvarlar büyük ölçüde kadraj dışında kalır; yalnız alçalan dudağın doğu ucu sol-üst köşeye, doğu iç duvarı sol kenara girer.
- **Kaya:** gri-beyaz kireçtaşı `#d9b99a` (ışık) / `#b89a86` (orta) / `#6f6488` (gölge) / `#4a4468` (derin). Yüzeyde dikey erime olukları (karren) vardır: yakında 3–5 oluk, her biri 2 çizgi (gölge kenarı `#6f6488` 4 px + ışık kenarı `#eec5a2` 2 px), seed +7. Ceplerde soluk kızıl toprak **[yeni] `#a07e6a`** (h ≈ 55°, C* ≈ 17; kırmızı bandı dışında).
- **Doğrulama:** mevzi yeri, yüksekliği ve oyuk varlığı kaynakta yok [A §5: "mevzi gizleme doğrulanamadı"]. Oyuk hikâyenin görsel aracıdır ve kaynak iddiası değildir [T]. Kamuflaj ağı ve çalı örtüsü çizilmez (tasarım §4.4).

### 0.11 2.5D derinlik, dolly ve dolly zoom (tur-6 notu)
- Her katmanın Z'si (m) katman tablolarındadır. Ekran ölçeği `s_k = F(t)/Z_k(t)`, `Z_k(t) = Z_k − d(t)` (d: kameranın ileri gidişi). Katmanın ekran konumu, kendi dünya noktasının izdüşümüyle hesaplanır. cs zoom yalnız F'yi değiştirir, parallaks vermez; dolly d'yi değiştirir ve parallaks verir.
- **Dolly zoom:** konu katmanı Z_s'nin ekran boyu sabit tutulur, `F(t) = F_0 · (Z_s − d(t))/Z_s`. Kamera geri giderken (d < 0) F büyür: arka plan büyür, ön plan küçülür. Uzak katman (Z ≥ 2 000) yalnız F oranında büyür. Ön plan kaya hızla küçülür ve kadrajdan çıkar; çıkış kadraj kenarından olur, katman "kaybolmaz".
- **Fizik sınırı:** dolly zoom yalnız konu yakınken güçlüdür. Konu 2 km'deyse (gemi) kamera 1.2 km geri gitse bile (F × 1.6) ada sırtı ancak ×1.14, kale ×1.035 büyür. Bu etki telefonda okunmaz.
- **Öneri 1 (fiziksel, güçlü): P04 `yamac-oyuk`.** Konu oyuk (Z_s 20 m). Kamera 20 m geri çekilir (d −20), F × 2. Sonuç: oyuk ekranda aynı boyda kalır; Likya sırtı (Z 6 000) ve gök basamakları ≈ ×2 büyüyerek oyuğun üstüne kapanır; ön plan taş ve ot (Z 2–5) ×0.2'ye küçülür ve alt kenardan çıkar. Anlam: boş görünen kıyı birden ağırlaşır. Sahne planındaki itme (cs 1→2.4) yerine ya da onun ilk 1.5 sn'si olarak kullanılabilir; parıltı (yerel 190) dolly zoom bittikten sonra, kamera dururken gelir.
- **Öneri 2 (2.5D, [T]): P07c.** Konu yanan gemi. Gerçek dolly zoom zayıf kalacağı için sırt ve kale katmanları "sahne perdesi" olarak ek ×1.25 büyür (Özet 6'daki sıkıştırılmış dekorla tutarlı). Bu bilinçli sapma `lint: {izin:["dolly_zoom_perde"]}` ile kaydedilir. Anlam: liman gemiyi kapatır, "dönemiyordu".
- Süre 1.5–2.5 sn, ease in-out. Yasak: kesmeyi geçmek, titreme, iki dolly zoom (bölümde tek; karar yönetmenin).
- Seed dünya koordinatına bağlı olduğu için dolly sırasında doku kaymaz ve kaynamaz (Paris P07 dersi). Flu σ, katmanın Z'sine göre dolly ile yeniden hesaplanır (`fluSigma(Z, odak)`).

---

## 1. LIMAN (P01, P03a, P03c, P06 V2, P06 V3, P07c; P10a arka plan plakası)

### 1.1 Duygusal amaç ve görsel dil
- **Amaç:** sakin, ışıklı, güvenli görünen bir kış limanı. İzleyici P01'de yalnız bir şey sezer: karanlık bir oyuktan gemiye uzanan çizgi. Aynı kadraj P07c'de yanan gemiye, P10a'da gün batımında enkaza döner (kurulum → karşılık).
- **Görsel dil:**
  - Baskın şekil **yatay**: gemi gövdesi, rıhtım, su vuruşları. Dikey karşı ritim: iki baca, iki direk, kale kulesi. Diyagonal tek çizgi: mürekkep çizgi.
  - Ritim: ev pencerelerinin düzensiz noktaları ve baca–direk–baca–direk aralıkları.
  - Sıcaklık: gök alt bandı ve sağdaki ışıltı sıcak; gemi, kaya gölgesi ve ön su soğuk.
  - Kontrast: P01'de orta (kontrajur gemi koyu siluet + parlak sırt bandı); P10a'da yüksek.

### 1.2 Mimari ve coğrafi kart: Meis limanı ve kasabası, Ocak 1917
| Madde | İçerik | Kanıt |
|---|---|---|
| Dönem ve üslup | Osmanlı'dan 1915 sonu Fransız işgaline geçmiş bir Doğu Ege ada kasabası. Limana bakan amfi kasaba; 19. yy denizci zenginliği dönemi | işgal [A §1, Çelişki 5: Aralık 1915]; zenginlik ve üslup [G] |
| Coğrafya | Ayios Stefanos ile Nifti burunları arasındaki geniş koy, üç kenarı rıhtımlı. Kale kasabanın üstünde. Batıda Palaiokastro. Anakaraya ~2 km | [A §1, §5] |
| Kameradan dizilim (b 190°) | Sol (doğu): kayalık burun üstünde kale. Orta: rıhtım ve yamaca tırmanan evler. Sağ (batı): adanın batı tepeleri, buğulu. Gemi koyda demirli, iskele tarafı kameraya bakar. **Deniz ufku kadrajda görünmez** (ada kapatır); ufuk y 800 yalnız geometri referansıdır | yerleşim [A]; kalenin doğuda olması [G, doğrulanmalı] |
| Kale | 14. yy Şövalyeler Kalesi [A]. Çizim: kayalık burun (yüzey kızıla çalan kireçtaşı) üstünde dikdörtgen sur kütlesi + tek kare kule + 5–7 dikdörtgen mazgal dişi. 1917 hâli (yıkık/sağlam) kanıtsız, bu yüzden siluet düzeyinde nötr: kule tepesi düz, külah yok. Direkte küçük tricolore (≤ 40×27 px) | yapı [A], biçim [G] |
| Yapı tipi (evler) | 2–3 katlı bitişik kasaba evleri, kâgir, sıvalı. Rıhtım sırasında zemin katı depo/dükkân kapıları, üst katlarda düzenli pencereler. Yamaçta arka sıralar | [G], kanıtsız (arastirma §5: "evlerin biçimi doğrulanamadı") |
| Kat ve cephe | Kat yüksekliği 3.4 m (zemin 3.8). Cephe 2–3 aks, ev eni 6–11 m (seed). Ön sıra 2–3 kat, arka sıralar 1–3 kat. Komşu yükseklik farkı en az 0.6 kat (zorla). %20 ev ayrıntısız (sağır yan duvar) | [T] B1 |
| Çatı | Seed ile iki tip: **%60 düşük eğimli (≈ 20°) kırma çatı**, soluk toprak `#a8826e`, sıra çizgisi yalnız P03a'da; **%40 düz dam + alçak parapet**. Kiremit iddiası yok (tasarım G4). Baca küçük ve tekil, küme yok. Saçak 0.3 m, altı koyu bant | [G] — "düz/kiremit" ikisi de kanıtsız; karışık nötr seçim |
| Açıklıklar | §0.4: düz lento, iki kanat kepenk (`#7a8a90`, soluk gri-mavi), kepenklerin %40'ı açık. Balkon: yalnız P03a'da 2 evde ince demir korkuluklu 1. kat balkonu [G]; LIMAN geniş görünümlerinde yok | [G] |
| Renk | `tasarim.md` §1.3 beş cephe tonu, seed'li; aynı renk yan yana gelmez | [G] |
| Rıhtım | kesme taş rıhtım, yüksekliği 1.2 m, üst kenarı ışıkta `#d9b99a`, yüzü gölgede `#6f6488`; demir babalar (P03a) | [A] "rıhtımlı"; malzeme [G] |
| Kameradan görünen (P01, göz deniz +50 m, 2 km) | Evlerin cepheleri ve saçak altları görünür. Çatı yüzleri **görünür**, çünkü göz 50 m'de ve ön sıra evlerin üstündedir. Ancak bakış açısı 1–1.5° olduğundan çatı yüzü 2–4 px'lik ince şerittir; yalnız arka yamaç evlerinde (göze yakın yükseklikte) çatı şeridi çizilir. Gemi güvertesi görünmez (bakış 1.3°, 14 m genişlik → 1.8 px): gemi tam profildir | geometri [T] |

### 1.3 Kamera geometrisi: `kiyidan-ada` (P01, P06 V1 arkası, P07c, P10a; aynı kadraj)
- Göz deniz seviyesinden e = 50 m (kayanın 1.2 m üstü), b = 190°, F = 11 270 px (cs 1; yatay görüş 5.5°, dikey 9.7°).
- **Göz hizası y_g = 758, deniz ufku y 803** (≈ sahne planı 800).
- Gemi Z 2 000 m: 5.64 px/m. Su hattı y = 758 + 50·5.64 = 1 040 (+ dalga payı → 1 045–1 050). Uzunluk 118.9 m → 670 px ✓. Dikey abartı ×1.15 (tasarım §3).
- Kasaba rıhtımı Z 2 350: 4.80 px/m; rıhtım su hattı y 998. Gemi gövdesi kasabanın alt kısmını örter: ön sıra evler yalnız x < 190 ve x > 860'ta görünür. Yamaçtaki üst sıralar y 820–960 arasında, bacalar ve direkler arasından görünür.
- Kale Z 2 200, 5.12 px/m. Kaya burnu tabanı y ≈ 1 000, kale tepesi y 640 (≈ 70 m; gerçek burun + sur ≈ 45 m [G], ×1.5 abartı serbest [T]).
- Uzak sırtlar Z 2 800–4 000, dikeyde ×0.3 sıkıştırılmış (Özet 6).
- Ön plan kaya Z 3–8 m (flu σ 6). Sağ alt su Z 485–1 335 m (y 1 920 → 1 180).
- Kaçış noktası: göz hizasında, ekran x 540 (tek nokta perspektif yalnız rıhtım hattı için; telefoto neredeyse paraleldir).

### 1.4 Katman tablosu `kiyidan-ada` (dekor = cs 1 ekranı; arkadan öne)
| # | Katman | Z (m) | Şekil listesi | Hex (A / C) | Kontur | Tarama | Flu σ | Buğu α |
|---|---|---|---|---|---|---|---|---|
| 0 | Gök | ∞ | 5 düz basamak: sınırlar y 260 / 420 / 540 / 640 (alt sınır sırt). Her sınırın altında 3 ince yatay çizgi (üst tonun rengi, 2.5 px, aralık 7, α .35) + 20 px stipple (ø 2.5, yoğunluk .08) | §1.1 A sütunu / C sütunu | yok | yalnız sınır çizgileri | 0 | — |
| 1 | Bulut | ∞ | 2 düz yatay şerit: (a) x −40…640, y 372–398, sağ ucu yuvarlak; (b) x 420…1120, y 500–520. Alt kenar gölge `#9a94b4` 6 px, üst-sağ kenar `#eec5a2` 2 px | `#e8d3d0` | yok | yok | 2 | — |
| 2 | Uzak sırt (batı tepeleri) | 4 000 | x 560–1080 tek siluet, tepe y 590–640 (seed +2, 6 tepe noktası). Sırt çizgisinde güneşe dönük (sağ) eğimlerde 3 px sıcak bant | `#9aa4c0`, bant `#e0b898` | yok | yok | 6 | .62 |
| 3 | Orta sırt (ana tepe) | 3 000 | x −20–900, tepe y 620–680, sol tarafta kale burnuna iner | `#8f9bb8`, bant `#e0b898` | yok | yok | 5 | .45 |
| 4 | Buğu bandı 1 | — | y 680–720 tam en, düz | `#e2cfc6` **[yeni]** (L* 84, C* 6) | yok | yok | — | .40 |
| 5 | Yakın sırt + yamaç | 2 600 | x −20–1100, üst kenar y 700–760 (makili, 1 px kırıklı), alt kenarı kasabaya karışır | `#7886a8`, maki noktaları `#5f6c90` | yok | yok | 4 | .30 |
| 6 | Kasaba üst sıraları | 2 450 | 3 dizi bitişik ev, `siraUret` seed +1. Ev eni 30–55 px, yükseklik 22–48 px. Cephe tonu §1.3'ün `bugu(.25)` karışımı. Pencere 4×7 px nokta (koyu kepenk `#5f5a78`), %30'unda cam parıltısı yok (gündüz) | §1.3 cephe ×5, çatı `#a8826e`, saçak altı `#5f5a78` | yok | yok | 2 | .25 |
| 7 | Kale + burun | 2 200 | burun: x 60–330, y 860–1 000, kırık kenarlı kaya. Sur: x 90–420, y 700–860 dikdörtgen + mazgal dişleri (7 adet, 14×12 px). Kule: x 180–250, y 640–700. Bayrak direği 2 px x 238, y 610–640; tricolore 40×27 px | ışık yüz `#d0b392`, gölge `#6f6488`, kenar `#eec5a2` | 2 px `ink` | yalnız gölge yüzde taş sırası II (2.0 px / 9 px, θ 105°) | 0 | .15 |
| 8 | Rıhtım + ön sıra evler | 2 350 | rıhtım şeridi y 990–1 000 (x 0–190, 860–1 080). Ön sıra 2–3 kat ev, aynı `siraUret` (komşu farkı zorlanmış) | §1.3 | 2 px yalnız yan kenarlar | yok | 0 | .10 |
| 9 | Liman suyu (gemi arkası) | 2 050–2 350 | §0.7 satırları, vuruş 8–12 px, satır aralığı 3.5 px. Ev ve kale yansıma dilimleri | taban `#5f7fa6` | yok | — | 0 | — |
| 10 | **Gemi** (`GemiProfil`, durum) | 2 000 | §2.2 profil listesi, P01 px | tasarım §1.4 | 2.5 px siluet | gövde alt gölge şeridi II (2.0 / 9, θ 105°); baca arka yüzü | 0 | 0 |
| 11 | Ön su | 485–2 000 | §0.7 satırları, vuruş 12–60 px, aralık 3.5 → 9 px. Yan ışıltı üç basamak. Gemi yansıması (dilimli, %60 boy) | `#5f7fa6` / `#4c5780` / `#46628a` (y > 1 500) / ışık A | yok | yok | 0 | — |
| 12 | Ön plan kaya (sol) | 3–8 | x −20–600, y 1 170–1 940. Üst kenar kırık eğri (sağa doğru alçalır, y 1 170 → 1 320). Oyuk x 120–420 y 1 260–1 400 (§0.10). Karren olukları 4 adet. Sağ ve üst kenarda kenar ışığı | `#b89a86` / `#6f6488` / oyuk `#2e2a44` / kenar `#eec5a2` | 6 px (flu altında çizilmez) | oyuk üst dudağı III (2.2 / 7.5, θ 105°, yalnız 140 px'lik bant) | 6 | — |
| 13 | Ön plan ot + maki | 2–4 | sol kayanın üst kenarında 9 sap kümesi (meltem); sağ alt köşe x 820–1 100, y 1 640–1 940: 1 maki kümesi (koyu-zeytin, 5 lob) + 6 sap | maki `#8c9272` gölge `#5f6c90`; sap `#a39a78`, uç `#eec5a2` | yok | yok | 7 | — |
| 14 | Mürekkep çizgi | ekran | P01 yalnız: a (270, 1 330) → b (560, 1 010), hafif sarkık 2. derece eğri (orta noktası 12 px aşağıda), 10–12 px, uçta damla ø 18 px. Kare 6 → 124 boyunca çizilir | `#1c1915` | — | — | 0 | — |
| 15 | Atmosfer | — | `Dust` tuz (ø 2–3 px, 40 tane, `#efe0cc` α .35, yalnız ışık tarafında, yavaş sağa) · ufuk `Fog` = buğu bantları (4, 5) · kâğıt | — | — | — | — | — |
- **Çizim sırası:** 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → yansımalar → 10 → duman(10) → 11 → 12 → 13 → 14 → 15 → Arşiv.
- **Ölü alan:** üst üçte bir = gök + bulut + yazı bandı (y 240–400 yazı şeridiyle dolu). Orta = kale + kasaba + gemi. Alt = sol kaya + sağ alt maki + aradaki su. Hiçbir üçte bir boş kalmaz.
- **Güvenli alan:** alt 420 px'te (y > 1 500) yalnız kaya, su ve maki var; kritik nesne yok. Oyuk ve çizgi başlangıcı y 1 260–1 400'de, yani altyazı bandının (1 290–1 490) içinde. **Yönetmene not:** P01'de altyazı üst banda alınır ya da yok (kural: altyazı kurulum nesnesini örtmez). Çizginin oyuk ucu 1 330'dadır.

### 1.5 Işık ve sıcaklık (`kiyidan-ada`)
- Güneş rel 45, h 22° (A) / 18° (P07c) / 6° (P10a). Kameraya bakan her yüz (gemi iskele bordası, kale ön yüzü, ev cepheleri, kaya ön yüzü) **gölgede ve mavi-mordur**.
- Işık alanlar: gemi siluetinin sağ ve üst kenarları (baca sağ kenarı, direk sağ çizgisi, hangar çatısı, köprü üstü çatısı), kale kulesinin sağ yüzü (ince şerit 6 px), evlerin sağ yan duvarları (görünen 4–10 px şerit, seed'li %50), sırtların sağ eğim bandı, su ışıltısı.
- **Sıcak piksel bütçesi (≥ %14):** gök alt 2 basamak (y 540–700, ≈ %8) + sırt bantları (%1) + ışıltı (sağ yarı ≈ %4) + ev sağ yanları ve kale kenarı (%1.5) + ön kaya kenar ışığı ve ot uçları (%1). Toplam ≈ %15.5. Risk: buğu α'sı ufuk bandını grileştirirse bütçe düşer. Ölçüm: ufuk bandı C* ≥ hedefin %85'i.
- **p95 L* ≥ 75:** gök alt bandı L* ≈ 83, ışıltı tepeleri 88.
- **Gölgeler:** dünyada güneşin tersi (0.759, −, 0.532) yönünde, yani kameraya doğru ve sola. P01'de gemi gölgesi suya düşmez (su yansıma verir, gölge değil). Kaya gölgesi ön suya değil kendi üstüne düşer: sol kayanın ön yüzü bütünüyle gölgede.
- **P10a (C, 6°):** gök C sütunu. Sırt bandı `#e4b496` kalınlaşır (5 px). Işıltı oranları ×1.5. Kale ve ev sağ yüzleri gül-altın, ön yüzler mor `#5f5a78`. Uzun gölgeler. Enkaz: §2.4 `batik`. Gün batımı ısısı ölçüsü: sıcak piksel ≥ %20 hedeflenir.
- **P07c (yanan):** güneş ana kaynaktır. Alev ikinci kaynaktır ve yalnız gemi üst yapısına ve dumanın alt yüzüne havuz düşürür (§0.8). Sudaki alev yansıması dilimli, x hangar ± 40 px, y 1 050–1 140, `#e0b090`.

### 1.6 Diğer LIMAN görünümleri (aynı dünya, farklı kamera)
| Görünüm | Kamera (göz e, b, F, odak Z) | Kompozisyon (ekran px, cs 1) | Katmanlar (arkadan öne) | Dikkat |
|---|---|---|---|---|
| `ada-rihtim` (P03a) | rıhtım 3 m, b 120, F 1 700, gemi Z 140 m (12 px/m) | Kale sol tepede x 40–420 y 380–760 (yakın, kule kenar ışıklı). Rıhtım hattı y 960–1 010, sağa kaçar (KN x 1 020, y_g 900). Gemi x 200–880, su hattı 1 040, son metrelerini kayar ve 90. karede durur; baş sol üstte, kıç köpüğü söner. Ön plan: sağ alt rıhtım taşı + baba + iskele halatı (x 600–1 080, y 1 380–1 920) | gök (A) · sırt · kale + burun · ev sırası (2 derinlik; **yakın LOD**: kepenk, söve, saçak altı taraması θ 80°, 2 balkon) · rıhtım · gemi · liman suyu · halat/taş (flu σ 5) | Ev cepheleri sağdan ışık alır: sağ yüzler sıcak, cephe tonu orta; ışıklı oranı yüksek. Tricolore rıhtım direğinde (sola dalgalanır, rüzgâr −0.57). Göz 3 m: çatı yüzeyleri **görünmez**, saçak altları görünür |
| `karsi-kiyi` (P03c) | gemi baş güvertesi 4 m, b 15, F 2 600, kıyı Z 2 000 (1.3 px/m) | Ufuk y 860. Karşı kıyı (Kaş yamacı) 3 katman sırt: en yakın kıyı kayası y 820–880, orta sırt tepe y 640–700, en uzak y 560–600. Sırtların hepsi ön ışıkta (rel 220): sıcak, sol yüzleri gül-altın. Ön su y 880–1 920: vuruşlar büyür. Sol altta flu gemi korkuluğu köşesi (x 0–360, y 1 560–1 920). Ölçü çizgisi gemi (sol alt) → kıyı (orta) | gök · 3 sırt (`#9aa4c0` → `#7886a8`, sol yüz bandı `#e0b898`) · buğu bandı (y 840–870) · kıyı kayası şeridi · su · korkuluk (σ 6) | **Kıyı bomboş** (saklanan şey): oyuk bu mesafede görünmez (2.6 m × 1.3 = 3 px) ve çizilmez. Yamaçta maki noktaları seed'li, %20'si açık kaya |
| `rihtim-yan` (P06 V2) | rıhtım ucu 2 m, b 210, F 2 200, gemi Z 80 m (27 px/m) | Gemi x 480–1 080, y 820–1 080 (iskele bordası kameraya, koyu). Sütun 1 x 300, sütun 2 x 700 (gemi arkası). Taban su hattı y 1 040, tepe y 520 (480 px ✓). Sağ kenarda kısmi ışık yolu (§0.7). Ön plan: rıhtım taşı sol alt (x 0–380, y 1 500–1 920) + halkalar | gök · uzak sırt (ada batısı, b 210'da kadrajda) · buğu · gemi · sütunlar · su · rıhtım (σ 5) | Sütunlar arkadan ışıklı (rel 25): **sağ kenarı ve tacı** kenar ışıklı, gövdesi gölge yüzü taramalı. Sütun gemiden önce mi arkada mı: sütun 1 önde (Z 70), sütun 2 arkada (Z 110, ölçek ×0.73, gemi tarafından alttan kesilir) |
| `hangar-yakin` (P06 V3) | rıhtım ucu 2 m, b 205, F 3 600, gemi Z 60 m (60 px/m) | Gemi arka bölüm: arka baca x 120–230 (tepe y 520), hangar x 260–820 y 700–1 080, **kapı x 380–700 y 760–1 080 kapalı**, kıç derrick x 860–980. Su hattı 1 090. Ön su y 1 090–1 920, iki halka söner | gök · sırt · buğu · gemi (yakın LOD: perçin sırası yok, lumbuz, korkuluk çizgisi) · su | İsabet noktası kapı üstü (540, 740): çakım ≤ 10 kare, çekirdek ≥ 110 px. Sonra ince duman sağa yatar. Hangar duvarı geniş yüzde taranmaz; yalnız saçak altı III (θ 110°) |
| `enkaz` (P10a arka plakası) | = `kiyidan-ada` plakası (Z ≥ 2 000 katmanları 0–11), kamera mevziin 20 m gerisinde, 0.6° aşağı tilt: içerik 115 px yukarı (göz hizası y 643) | Enkaz x 190–860, su hattı y 925 (§2.4 `batik`). Kale x 80–420, tepe y 525. Gök y 0–505 | §1.4 katman 0–11, **C ışığı** | Ön plan KIYI-BATARYA `saygi`'dir (§3.6). Gemide duman ve kor yok. Su sakin: ışıltı ×1.5, yansımalar uzun |

**Görünüm başına ışık olayı ve atmosfer (LIMAN; "boş gök" ve "düz panel" yasağının karşılığı):**
| Görünüm | Ön / orta / arka (özet) | Atmosfer | Işık olayı (kadrajda neyin değiştiği) |
|---|---|---|---|
| `kiyidan-ada` P01 | flu kaya + oyuk + ot / gemi + su / kale, amfi kasaba, 3 sırt, 5 basamak gök + 2 bulut şeridi | 3 buğu bandı, tuz zerresi sağa, kâğıt | mürekkep çizgi ilerlerken sağdaki ışıltı vuruşları sırayla yanıp söner (faz seed'li); bulut şeridi (b) 3 sn'de 20 px sağa kayar |
| `ada-rihtim` P03a | taş, baba, halat / gemi kayıp durur / kale (yakın), 2 derinlik ev sırası | gemi köpüğünün buharı, bayrak, rıhtımda 2 uzak siluet (< %5) | gemi dururken kıç köpüğü söner ve gövdenin yansıması parçalıdan bütüne toplanır |
| `karsi-kiyi` P03c | flu korkuluk köşesi / ışıltılı su / ön ışıkta sıcak Kaş sırtları (3 kat) | buğu bandı kıyı ayağında, yükselen tek bulut gölgesi sırt üstünde soldan sağa geçer | bulut gölgesi kıyıyı geçerken yamaç önce kararır, sonra yeniden ısınır; ölçü çizgisi bu ışık değişimi sırasında çizilir |
| `rihtim-yan` P06 V2 | rıhtım taşı + halkalar / iki su sütunu / gemi (gölgede) + ada batısı | sütun çöküşünden kalan su tozu (`#e6dac6` α .25, rüzgârla sağa) | sütunlar kontrajurda: tepe tacı kenar ışığıyla yanar, çökerken su tozu sağdaki ışık yolunu bir an örter |
| `hangar-yakin` P06 V3 | su + sönen iki halka / hangar, kapı, arka baca / sırt + gök | tuz zerresi; isabetten sonra ince duman | 60 kare boyunca hiçbir şey olmaz (saklama); sonra çakım kapı üstünü ≤ 10 kare aydınlatır ve kararmış leke kalır |
| `kiyidan-ada` P07c | aynı kaya / yanan gemi / aynı kasaba | kalın duman sütunu kadrajın üstünden sağa çıkar; duman gölgesi güneşin tersine, gemi ile kamera arasındaki suya ve sola düşer (koyu `#4c5780` bant, kırık kenarlı) | alev ikinci kaynak olur: suda dilimli sıcak yansıma, dumanın alt yüzü ısınır. Dolly zoom seçilirse ada kapanır (§0.11) |

### 1.7 360 px okunurluk (LIMAN)
| Ne okunmalı | 1080'de | 360'ta | Biçim testi |
|---|---|---|---|
| İki baca, aralıklı | 26 px en, 105 px aralık | 9 / 35 px | koyu iki dik dikdörtgen + sağ kenar ışığı ⇒ "vapur" |
| Hangar (arka bacanın gerisinde yüksek kutu) | 160 × 35 px | 53 × 12 px | gövde çizgisinden yükselen düz çatılı kutu; baca–kutu bitişikliği net |
| İki direk | 6 px | 2 px | kenar ışığı çizgisiyle okunur (2 px `#eec5a2`) |
| Kale | 340 × 240 px | 113 × 80 px | mazgal dişleri 14 px → 4.7 px: tarak okunur ⇒ "kale" |
| Kasaba | evler 30–55 px | 10–18 px | düzensiz basamak siluet + pencere noktaları ⇒ "kasaba", ızgara değil |
| Oyuk | 300 × 140 px | 100 × 47 px | en koyu leke, kırık kenarlı ⇒ "mağara", kapı değil |
| Mürekkep çizgi | 10–12 px | 3.5–4 px | tek koyu çizgi + damla |
| Tricolore | 40 × 27 px | 13 × 9 px | 3 şerit seçilmez, "bayrak" okunur; kırmızı yok sayılır (C* 28) |
Yasak benzerlik: gemi "tren" ya da "fabrika" okunmamalı. Bunun için su hattı ve yansıma şarttır; ayrıca bacalar arkaya 4° eğiktir.

---

## 2. GEMI-INSERT (P02a, P02b, P03b, P07a, P07b, P08a/b, P09)

### 2.1 Duygusal amaç ve görsel dil
- **Amaç:** ilk yarıda dev ve düzenli bir makine (vinç, uçak, zincir). İkinci yarıda yangın, çaresizlik, terk. Aynı yüzeyler (kapı, botlar, simit) önce düzenli, sonra kırık görünür.
- **Görsel dil:**
  - Baskın şekil **diyagonal**: derrick bumbası, halatlar, zincir, eğik gövde.
  - Ritim: korkuluk dikmeleri (seed'li küçük sapma), perçin sıraları, güverte tahtaları.
  - Sıcaklık: kenar ışığı ve su ışıltısı sıcak, gövde gölgesi soğuk. P07b'de sıcaklığı alev taşır.
  - Kontrast: yüksek. Koyu gövde ↔ açık gök ve su.

### 2.2 Mimari kart: Ben-my-Chree (gemi = yapı)
| Madde | İçerik | Kanıt |
|---|---|---|
| Dönem ve tip | 1908 Isle of Man yolcu vapuru; 1915'te deniz uçağı gemisine dönüştürülmüş. İnce gövde, "küçük Cunarder" profili | [A] |
| Kütle | 118.9 × 14 m; 2 baca, 2 direk (iskuner); arka bacanın gerisinde hangar; başta 18 m sökülebilir platform + ray; baş ve kıçta derrick; 3 can botu | [A]; ön hangar çizilmez (tek kaynak) |
| Profil (P01 px; tasarım §3 tablosu aynen) | su hattı 1 050 · güverte 1 010 · köprü üstü 982 · hangar tepe 975 · baca tepe 935 · direk tepe 885. Baş solda x 190, kıç sağda x 860. Baş eğik (≈ 70°), kıç yuvarlak (cruiser kıç [G]), gövde sheer'i baş ve kıça +6 px yükselir | [T] oran |
| Gövde kuruluşu | perçinli çelik levha (yakında: yatay levha sırası her 2.4 m, dikey ek her 6 m [G]); tek sıra lumbuz (ana güverte altı); ince su hattı bandı `#4b4a5a`; borda üstünde korkuluk (dikme 1.2 m aralık, 3 yatay tel/boru) | [G] |
| Üst yapı | köprü üstü (0.28–0.38 L), baca çevresinde güverte evleri, can botu kızakları (davit), hangar (0.64–0.88 L) | konumlar [G] |
| Hangar | düz çatılı kutu, güverteden 6.5 m yükseklikte, 28 m uzunlukta [G]. **Kapı:** iskele yan duvarında, kıç köşesine yakın, çift kanat, dışa açılır, açıklık 7 × 5 m [G]. Çerçeve 0.15 m `#4b4a5a`. Kanatlarda 2 yatay takviye lamasının izi ve 3 menteşe | kapı yeri ve biçimi [G] — açık soru 3 |
| Derrick | kıç direğin dibinden kıça uzanan eğik bumba (40°), çift sapan, makaralı kanca; kumanda vinci güvertede | [A] derrick var; biçim [G] |
| Can botu | ahşap açık kayık 7.5 m, davitte asılı; motor gösterilmez | [G] (G9) |
| Can simidi | sancak korkuluğunda kancada, ø 0.75 m, mantar-bez `#c9b08a` + 4 koyu bant `#5a5278` + halat | [G] (G10) |
| Çıpa | baş, stoklu klasik çıpa [G], fırdöndü + zincir (halka 0.25 m); makara (ırgat) baş güvertede | [G] |
| Renk | nötr gri-kum gövde, koyu nötr baca; işaret/yazı/roundel yok | [G] (G1) |
| Kameradan görünen | Göz güvertede (2–2.2 m): üst yapının çatıları görünmez, saçak altları görünür. Göz su hizasında (0.8–1.5 m): borda dik duvar, güverte görünmez; korkuluk gökyüzüne karşı siluet | geometri |

### 2.3 Ortak katman yığını (GEMI-INSERT, her görünüm)
1. **Gök** (5 basamak, ışık durumuna göre) — her görünümde en az %12 alan. P07a/P09 dahil, açık kalan şerit.
2. **Uzak** — ada sırtı ya da karşı kıyı (yöne göre: b 270–320 → ada batısı ve açık deniz; b 20 → Kaş kıyısı). Buğu α .45, σ 6.
3. **Orta uzak** — liman suyu + kasaba şeridi (σ 4), varsa duman perdesi.
4. **Gemi gövdesi / üst yapı** — keskin.
5. **Eylem nesnesi** — uçak, simit, çıpa, kapı, bot.
6. **Ön plan çerçeve** — flu makara, halat kangalı, korkuluk köşesi, güverte tahtası (σ 5–7).
7. **Atmosfer** — tuz `Dust`; P07'den sonra duman zerresi (koyu `#5e566e` α .3, yavaşça rüzgârla). Ardından kâğıt.

### 2.4 Gemi durumları (tek rig `GemiProfil`; LIMAN ve GEMI-INSERT aynı model)
| Durum | Görsel | Kanıt |
|---|---|---|
| `demirli` | çıpa zinciri baştan suya 35° iner, kıç köpüğü yok, bayrak/flama yok | [A] demirli; flama [G] → yok |
| `vurulmus` | hangar kapısı üstünde 1.2 m çapında kararmış leke `#3a3450` (kırık kenar, 5–7 köşe) + ince duman sütunu | [T] |
| `yanan` | hangar çatısı kenarında alev (tepe ≥ 90 px P07c'de), kalın duman; kapının bir kanadı açık sarkık; kıç köpüğü boşa | [A] hangar yangını, dümen |
| `yatik` | sancağa 22° yatış (P09). Dünyada boyuna eksen etrafında döner | [A] sancağa yattı |
| `batik` | P10a: gövde su hattı +3.5 m batmış (borda ancak 1.5 m görünür), sancağa 22°. P01 kamerası iskele tarafını gördüğü için **yatış kameradan uzağa** olur: bacalar ve direkler ekranda yanal eğilmez, kısalır (cos 22° → %93) ve tepeleri adaya doğru kaçar. **Telefon okunurluğu için [T]:** eğik görünüm ekranda 10° yanal eğimle desteklenir (kamera 10° eksen dışında + baş trim ≈ 2°). İskele bordasının alt kısmı (sintine dönümü) sudan çıkar: koyu bant `#4c5780`, 18 px. Su hattında köpüksüz, sakin halka | yatış yönü [A]; ekran eğimi [T] |
Bu durumlar arasında oran değişmez (Paris "aynı karakter tek rig").

### 2.5 Görünümler (konumlar sahne planı §4; burada katman, ölçek, ışık, doku)
**`kic` (P02a)** — göz 2.2 m (güverte), b 320, rel 275 (soldan yan). İnsert-yakın ölçek: uçak 12.4 m → 440 px (≈ 35 px/m). 
- Arka: gök (y 0–700, 5 basamak A). Ada batı sırtı y 640–720 (σ 6). Liman suyu y 720–860 (yan ışıltı sol tarafta yoğun; güneş sol kadraj dışında).
- Orta: kapalı hangar kapısı (sol, x 60–330 y 760–1 120). Kapı yüzü gölgede `#7a768a`, çerçeve `#4b4a5a`, sol kenarında 3 px kenar ışığı; menteşe tarafında çapraz tarama (≤ 120 px). Botlar sağ üstte (davitte, `#b79877`), iç gölgeleri taramalı.
- Figürler: **T2** (≈ 40, kırlaşmış gür bıyık) bumbanın halatına asılır, **T1** (≈ 22, tüysüz) uçağın kanat ucunu halatla yönlendirir. Boy ≈ 520 px (y 760–1 280), yüz ≥ 75 px. Soldan yan ışık: yüzlerin sol yarısı ve ön düzlemi sıcak, sağ yanak mavi-mor. Ayaklar güverte tahtasında, temas gölgesi sağa (güneşin tersi).
- Eylem: derrick bumbası (koyu `#4b4a5a`, sol kenar ışıklı) + uçak. Uçak bezi `#d6c4a0`; kanat altı gölge `#8a7e8a`; kanat ön kenarında sıcak kenar ışığı 3 px; dikmeler 2 tane her yanda, kafes yok. Şamandıralar ahşap `#8a6f5a`.
- Ön: güverte tahtası (y 1 250–1 920; tahtalar kameraya doğru kaçar, KN (420, 700), tahta eni 0.12 m, ek çizgileri seed'li). Halat kangalı sol alt (σ 5). Flu makara sağ alt (σ 7).
- Su teması: şamandıralar yerel 258'de suya değer → halka + 2 sıçrama damlası. Su, gövdenin iskele/kıç kenarından görünür (x 640–1 080, y 980–1 120).

**`korkuluk` (P02b)** — göz 2 m, b 290, rel 305. Simit x 380–700 y 700–1 010 (ø 200 px ≈ 265 px/m), kanca net.
- Arka: gök. Sağda deniz ve kasaba şeridi (σ 5).
- Orta: korkuluk dikmeleri (6 px), üst boru (8 px) y 1 010'da yatay (P03a taşıyıcısı). Solda bot tabanı (alttan görünüş: omurga ve kaplama sırası 3 çizgi).
- Simit: 4 bant `#5a5278`, mantar-bez gövde. Işık sol-ön: sol üst çeyrekte kenar ışığı. Sağ alt yarıda 3 kısa eğri tarama (θ 70°, 2.6 px). Halat bağı 2 tur. Asılı nesne `asiliNesne` ile ±2° sallanır.
- Ön: sağ alt su vuruşları + sol alt flu güverte köşesi.

**`bas-capa` (P03b)** — göz 2 m, b 20, rel 215 (ön ışık soldan arkadan): çıpa ve gövde baş bordası ışıkta, sıcak gri-kum. Çıpa x 360–720 y 520–1 000 (≥ %25).
- Arka: Kaş kıyısı sırtı (b 20 → anakara!). Ön ışıkta sıcak; oyuk görünmez (uzak). Buğu .45.
- Orta: baş bordası (sol), fırdöndü deliği, zincir. Zincir halkası 18 px; tek tek okunur, halkalar sırayla düz/yan döner.
- Su: zincirin suya girdiği yerde (y 1 500) sıçrama ve halka. Zincir gerildiğinde (yerel 240) damlalar zincir boyunca fırlar (8–12 damla, `#e6dac6`, ışık yüzü sıcak).
- Ön: sol alt flu ırgat (σ 6), sağ alt su.
- Tarama: çıpa kollarının gölge yüzü (sağ), θ 60°, 2.6 / 8.

**`kic-su` (P07a)** — göz 2 m, b 300, tilt aşağı. İlk kare duman sütunu x (P06 V3 ile aynı ekran x ≈ 540) gök önünde, sağa yatar. Tilt sonunda kıç gövdesi x 0–700, dümen kanadı x 380–620 y 1 200–1 520, suda sapık açıda (≈ 25°). Pervane köpüğü kıçın altında: leke sayısı 2 → 7 büyür, gemi yerinde. Su: kıç gölgesi suya düşmez (yansıma); gövdenin hemen dibindeki su gölge `#4c5780`.

**`hangar-kapi` (P07b) — kalibrasyon karesi k2388 (yerel 214)**
- Kamera: göz 1.7 m, iskele yan güvertesinde (hangar duvarı ile korkuluk arasındaki 2.5 m'lik yol), b 270 (kıça bakar). Hangar yan duvarı sol yarıda, **¾ açıyla** kaçar: KN (1 000, 700). Kapı x 260–820 y 560–1 150 (≥ %35). Kapı, perspektifte sol kenarı (yakın) uzun, sağ kenarı (uzak) kısa bir yamuktur.
- Işık: anahtar = alev (nokta kaynak, kapı açıklığının içinde, (560, 900) civarı). Güneş rel 325 (sol-ön-üst) yalnız siluet kenarı verir: duvarın sol üst kenarı, tayfanın sol omzu, dumanın sol-üst lobları (2 px `#eec5a2`).
- Katmanlar:
  - 0 gök: sol üst köşe x 0–420, y 0–520, 4 basamak görünür (A, h 18°). Sıcak alan ≥ %6 burada.
  - 1 uzak ada sırtı y 470–540 (σ 6) + liman suyu şeridi sağda, korkuluğun üstünden görünür (y 540–600).
  - 2 duman perdesi: kapı üstünden ve hangar çatı kenarından çıkar, sağa yatar, kadrajın üstünden çıkar. Alt yüzleri alev ışığı `#e0b090`.
  - 3 hangar duvarı: `#9a96a2` gölgede `#6a6683`. Geniş yüzde tarama yok; saçak altında III, θ 65°.
  - 4 kapı çerçevesi `#4b4a5a`. Çerçevenin iç yüzü alevden aydınlanır (`#e4b296` α .45, 2 basamak).
  - 5 kapı kanatları: sol kanat yerinde, kapalı ve kararmış; sağ kanat menteşede dışa açılmış (yerel 212'den sonra 0 → 62°, yayKare ile sönümlü salınır, 262'de durur). Açık kanadın iç yüzü alevden aydınlanır.
  - 6 kapı içi: `#2e2a44` zemin üstünde alev (dış/orta/çekirdek). Kapı açıklığından ≥ 120 px yükselir, rüzgârla sağa kıvrılır. İçerideki uçak/eşya **gösterilmez** (saklanan şey).
  - 7 **T3** (yüzlü, tasarım §4.2b; ≈ 28, kemikli, kaşlarda toz): x 830–1 040, y 700–1 260, boy 560 px, yüz ≥ 75 px, ¾ profil kapıya dönük, bir adım geri. Kıyafet `#585870` / gölge `#3f3e58`. Yüzün kapıya bakan yarısı alev havuzunun iki basamağını alır (`#e4b296` α .45 → ten `#c9a88f` üstünde); öbür yarı mavi-mor gölgede, gökten yansıma hilali `#b9a8b4`. Sol omuzda güneş kenar ışığı. İfade kontrollü şaşkınlıktır: kaş kalkık, ağız kapalı, korku maskesi yok. Ayak teması güvertede y 1 260; temas gölgesi alevden dışa (sağ-alt) düşer.
  - 8 güverte: tahtalar KN'ye kaçar (y 1 150–1 920). Kapı eşiğinden yayılan havuz 3 basamakta: eşikte α .45, 1.3 m'de .28, 2.4 m'de .14. Havuz elips değil, perspektife oturan yamuktur.
  - 9 ön plan: sağ alt flu korkuluk dikmesi + boru (σ 6), sol alt flu yangın kovası askısı (boş; tayfa kovaya uzanmaz) [T].
  - 10 atmosfer: duman zerresi (sağa), 2 kor zerresi değil (kıvılcım yağmuru yasak).
- **Sıcak bütçe:** gök köşe %6 + alev/kor ≈ %3.5 + havuz basamakları (C* ≤ 28 ama sıcak hue) ≈ %6 → ≈ %15.5. p95 L*: alev çekirdeği 87 ve gök alt bandı.
- **Kor tekilliği:** alev dışındaki her yüzey C* ≤ 28. Havuz renkleri `#e4b296` / `#e0b090` sınırda kalır.

**`bot` (P08a/b)** — göz 0.8 m (su hizası), b 300. Sol: gemi gövde duvarı x 0–260 (dik koyu levha, perçin sırası yakın LOD). Arkada duman perdesi gemi üstünü örter (gök yalnız sağ üstte, y 0–520, B ışığı). İki bot yan yana x 120–1 000 y 840–1 250. Bot içleri gölgede, kenar ışığı sol küpeştede. **T4** (yüzlü, çene sıkık, şakakta ter) A botunun kıçında krankta. 5 yaralı (tasarım §4.2b) sargılı (`#d8c9ac`), yüzleri sakin ve görünür (≥ 60 px), biri ötekinin omzuna yaslı. Yüzler sol-ön güneşten (rel 295) yarı ışık alır: ön düzlem sıcak, kameraya bakan yanak gölgede. Su: bot gövdesine vuran küçük dalga halkaları. P08b'de B botu sağdan kadrajı terk eder, V izi kalır (§0.7). Geri çekilmede gemi σ 4'e flulaşır. **Krank:** A botunun kıç tarafında, insert değil; elin dönüşü 3 tık (yerel 60/95/130).

**`korkuluk-su` (P09)** — göz 1.5 m, b 320, B ışığı (12°, gül-altın, rel 275 soldan). Gövde sağda x 480–1 080 y 560–1 250, 22°'ye yatar (yerel 10–150). Korkuluk çizgisi eğilir; su hattı gövdeye tırmanır. Simit kancadan çıkar (66), düşer (yerçekimi, 34 kare), suya değer (100): halka + sıçrama, sonra yüzer (döner, 168'de durur). Odak çekmesi: gövde σ 0 → 4, simit σ 4 → 0. Su sol yarıda, ışıltı yoğun (güneş solda). Kabarcık: gövde dibinde 6–10 küçük daire, `#9aa6c0`.

**Görünüm başına ışık olayı ve atmosfer (GEMI-INSERT):**
| Görünüm | Ön / orta / arka | Atmosfer | Işık olayı |
|---|---|---|---|
| `kic` P02a | halat kangalı + makara (flu) / bumba, uçak, T1–T2 / hangar kapısı, botlar, ada sırtı, gök | tuz buharı; şamandıra temasında su tozu | uçak inerken kanat ucundaki kenar ışığı kanat boyunca kayar (kanat güneşe göre döner); suya değince ışıltı halkası yayılır |
| `korkuluk` P02b | flu güverte köşesi / korkuluk + simit / bot tabanı, kasaba şeridi, su | tuz zerresi | simit sallanırken üst kenar ışığı ±2° kayar; korkuluk borusu üstünde tek ışık çizgisi sabit kalır (taşıyıcı) |
| `bas-capa` P03b | flu ırgat / çıpa + zincir / ön ışıkta Kaş kıyısı (sıcak) | zincirden fırlayan damlalar | gerilme anında damlaların her biri kısa bir ışık noktası olur (≤ 6 kare) |
| `kic-su` P07a | flu halat / kıç, dümen kanadı, köpük / duman sütunu, gök | duman zerresi, su buharı | tilt boyunca ışık kayar: üstte dumanın alevli alt yüzü, altta kıç suyunun soğuk gölgesi |
| `hangar-kapi` P07b | flu korkuluk, kova askısı / kapı, alev, T3 / gök köşesi, ada sırtı | duman perdesi, duman zerresi | kapı itilince alev havuzu 3 basamakta güverteye "açılır" (her basamak 2 kare arayla); ışınsal gölgeler belirir |
| `bot` P08a/b | bot tabanı + su / iki bot, T4, yaralılar / gövde duvarı, duman perdesi, sağ üstte gök | duman zerresi rüzgârla sağa; su yüzünde ince yağ halkası (`#9aa6c0` α .3) | motor tutunca kıçtaki köpük beyazlaşır ve V izi açılır; bot duman gölgesinden ışığa çıkar (kenar ışığı yanar) |
| `korkuluk-su` P09 | su + simit / yatan gövde, korkuluk / sağ üstte gök, buğulu kasaba | kabarcık, sakin buhar | yatış ilerledikçe güverte kenarındaki kenar ışığı söner (yüzey güneşten döner); simit suya düşünce ışıltı halkası |

### 2.6 360 px okunurluk (GEMI-INSERT)
Uçak (P02a) 440 px → 147 px: iki kanat + iki şamandıra seçilir. Simit 200 → 67 px: bantlı halka. Çıpa 480 → 160 px: çıpa biçimi. Zincir halkası 18 → 6 px. Kapı 590 px yüksek → 197 px: çerçeve + açık kanat + içerideki alev. Bot 300 px → 100 px. Yasak benzerlik: simit "can simidi değil süs çelengi" okunmamalı; bant sayısı 4, düz renk.

---

## 3. KIYI-BATARYA (P04, P05, P06 V1, P10a `saygi`)

### 3.1 Duygusal amaç ve görsel dil
- **Amaç:** boş, sessiz, sabırlı bir yamaç. Tehlike küçüktür ve gizlidir: tek parıltı, tek el, tek namlu.
- **Görsel dil:**
  - Baskın şekil **yukarı yükselen diyagonal**: yamaç eğimi. Karşısında namlunun yatay çizgisi.
  - Ritim: dikey karren olukları ve seed'li maki lobları.
  - Sıcaklık: ön ışıkta sıcak kireçtaşı (P04); kontrajurda mor gölge (P06 V1).
  - Kontrast: oyuğun karanlığı kadrajın en koyu noktasıdır.

### 3.2 Coğrafi kart: Kaş kıyısı, Meis karşısı, Ocak 1917
| Madde | İçerik | Kanıt |
|---|---|---|
| Konum | Meis'in ~2 km karşısındaki anakara kıyısı; bataryanın Kaş bölgesine getirildiği | [A §1] |
| Arazi tipi | Denize dik inen kireçtaşı yamaç. Çıplak kaya basamakları, kaya arasında maki, ceplerde kızıl toprak. Deniz kenarında dalga çentiği | genel Likya kıyısı [G, doğrulanmalı] |
| Siluet | Arkada yükselen 2–3 sırt (Likya dağları, soğuk), önde kırık basamaklı kaya | [G] |
| İmza 1 | **Kaya oyuğu** (§0.10): tek koyu ağız | [T] |
| İmza 2 | **Karren olukları**: kireçtaşında dikey erime oluğu, kenar ışığıyla | [G] |
| Bitki | Koyu-zeytin yaprak dökmeyen maki kümeleri (lob siluet, iç ayrıntı yok), %70 kaya / %30 maki. Kış ot sapları (geçen yazdan) `#a39a78` + birkaç genç yeşil tutam `#8c9272` | Ocak yağışlı mevsim [G]; tür adı verilmez |
| Yapı | yok. Yol, ev, duvar yok (kıyı boş, saklanan şey). Tek iz: taze katır izi (toz çizgisi + 3 toynak izi, P04) | [A] katırla taşındı (arama özeti) |
| Kameradan görünen | P04 (göz mevziin 6 m altında): oyuğun tavanı ve içi görünmez; ağzın alt dudağı ve önündeki toprak düzlüğü daralır. P06 V1 (göz mevzide, 1.2 m): kundak üstten, deniz aşağıda, ada karşıda | geometri |

### 3.3 Katman tablosu `yamac-oyuk` (P04; cs 1.0 başlangıç → 2.4 itme)
Kamera: göz deniz +42 m (yerel 3 m, alt kaya basamağında), b 15, F 3 000. Oyuk Z 30 m (100 px/m cs 1 → 240 px/m cs 2.4). Bakış 8° yukarı: göz hizası y_g 1 250 (kadrajın alt yarısında; sırt yukarıda).
Oyuk ağzı 4.5 × 2.6 m → cs 1'de ≈ 450 × 260 px (sahne planı 320 × 220'den biraz büyük; yönetmen kadrajı x 320–770 y 940–1 200 olarak günceller). Namlu ucu cs 2.4'te görünen 1.0 m → 240 px ✓, ağız çapı 29 px, parıltı çekirdeği ≥ 60 px ✓.
| # | Katman | Z | Şekil | Hex | Tarama | σ |
|---|---|---|---|---|---|---|
| 0 | Gök | ∞ | y 0–520, 5 basamak A. Ön ışık (güneş kamera arkasında, rel 220) olduğundan gök **tepe tonu koyu, alt tonları sıcak** | §1.1 A | sınır çizgileri | 0 |
| 1 | Uzak sırt (Likya) | 6 000+ | tepe y 380–460, 2 siluet | `#9aa4c0` / `#8f9bb8`, sol yüz bandı `#e0b898` | yok | 6 |
| 2 | Buğu | — | y 480–540 | `#e2cfc6` α .45 | — | — |
| 3 | Yamaç üstü | 60–200 | kırık kaya basamakları y 520–900, maki lobları %30 | kaya ışık `#d9b99a`, gölge `#6f6488`; maki `#8c9272` / `#5f6c90` | yok | 3 |
| 4 | **Oyuk yamacı** | 30 | x 0–1 080, y 700–1 500. Oyuk x 320–770, y 940–1 200 (itmeyle merkeze 540, 900). Karren 6 oluk. Ağız üst dudağı III tarama | §0.10 | III θ 60° yalnız dudak altı; çapraz ≤ 120 px iç köşe | 0 |
| 5 | Namlu ucu | 30.5 (ağızdan 0.5 m geride) | Yalnız ucu görünür: x 520–760, y 880–940 (cs 2.4'te ≈ 240 px uzunluk). Ağız halkası `#4c5780`, üst kenarı `#a8a2b4`. Parıltı noktası yerel 190: `#ffcf7a` çekirdek ≥ 60 px (cs 2.4), 2 kısa yatay ışın (≤ 80 px; yıldız yok) | `#5a5670` | yok | 0 |
| 6 | Ön düzlük | 8–15 | taze katır izi: toz çizgisi + 3 toynak izi (U biçimli, 30 px) y 1 300–1 420 | toprak `#b89a86` / `#a07e6a` | yok | 2 |
| 7 | Ön plan | 2–5 | sol alt taş (x −40–420, y 1 520–1 940) + sağ alt ot sapları (meltem, sola) | `#b89a86` / `#6f6488`, sap `#a39a78` | yok | 7 |
| 8 | Atmosfer | — | yamaç tozu (ø 2–4, 25 tane, `#d9c3a0` α .30), ısı titremesi **yok** (kaynama yasağı; sahne planındaki "ısı sisi" yerine buğu bandı) | — | — | — |
- Işık rel 220: yamaç ön ışıkta, kaya yüzleri sıcak. Sağ yüzler ve oyuk içi gölgede. **Metal parıltısı fiziği:** güneş kamera arkasında olduğundan namlunun silindirik üst yüzü güneşi kameraya yansıtabilir. Parıltı, namlu bir an oyuğun ağzına çıkınca oluşur (186–232) ve namlu geri çekilince gölgeye girer (namlu 0.4 m geri). Bu geri çekilme ışık değil konum değişimidir; fade yok.
- Sıcak bütçe: kaya ışık yüzleri ≈ %25. Bu görünüm sıcak riski taşımaz; risk tersine p95 L*'nin aşırı çıkmasıdır: kaya ışık tonu L* ≤ 80 tutulur.

### 3.4 `tegmen` (P05)
Kamera: göz 1.5 m (yerel, mevzi önü), b 100, rel 135. Ölçek ≈ 1 580 px/m (namlu çapı 0.12 m → 190 px, tasarım §4.1 düzeltmesi).
- Arka (σ 6–7): gök (y 0–560, A), uzak kıyı ve deniz şeridi. **Not:** b 100'de gemi ve ada rel ≈ 90° sağda, kadraj dışı. Sahne planındaki "uzakta ada/gemi çizgisi" bu yönde görünmez. Öneri: arkada Kaş kıyısının doğuya kıvrılan sırtı ve deniz. Ya da yönetmen b'yi 150'ye çevirir (rel 85, ışık sağdan yan; kenar ışığı korunur).
- Orta: mevzi kaya duvarı (oyuğun iç yan duvarı), sol yarıda, gölgede `#6f6488`, karren kenar ışığı.
- Ön: namlu yatay (x 100–1 000, y 870–1 060, kalınlık 190). Namlu üstü ışık şeridi `#a8a2b4`, sağ uçta rim. Namlu çeliğinde yansıma yalnız tek uzun şerittir; **kor rengi taşımaz**. El tek parça siluet (tasarım §4.1). Yüz profil sağda.
- Sol üst: flu katır başı ve kulakları (σ 8, `#6e6068`, kulak kenarında ışık).
- Arka figürler (σ ≤ 2, yüz okunur, Z 6–8 m): **E1** sol-arka x 60–340 (nişan, çark elinde), **E3** sağ-arka x 800–1 050 (halat omuzda). Yüzleri ≥ 110 px. Sağ-arka ışık (rel 135): ense, kulak ve elmacıkta 2–3 px kenar ışığı; yüzün ön düzlemi gölgede ama L* ≥ 50. Teğmenin yüzüne binmezler.
- Işık olayı: el namluya iki kez değdiğinde namlu üstündeki ışık şeridi elin altında kesilip yeniden birleşir; teğmenin kirpik ve burun kenarındaki ışık çizgisi göz kırpmadan sabit kalır (sakinlik).
- Atmosfer: katır nefesi yok (kanıtsız ayrıntı değil ama gösteri), ince yamaç tozu sola sürüklenir (rüzgâr −0.82).
- Alt üçte bir: top tekerleği kenarı (ahşap `#8a6f5a`, çelik çember) + taş zemin + katır kayışı (flu).
- Tarama: yanak gölgesi (4–6 kısa çizgi, θ 95°), namlu alt yüzü II (2.6 / 8), tekerlek gölge yüzü.

### 3.5 `top-onplan` (P06 V1)
Kamera b 190, F 11 270 (P01 ile aynı lens), ama **mevziin ≈ 20 m gerisinde**, mevzi zemininden 1.0 m yüksekte (sahne planı 1.2 m; fark ≤ 0.2 m, ayak y 1 280'i tutmak için). Arka plan LIMAN §1.4 katmanları 0–11 aynen (Z ≥ 2 000; 20 m fark ölçeği %1 değiştirir). Işık A, h 20° (gök alt basamak biraz daha sıcak: `#dfc4c2` **[yeni]**). Ön plan kayası (katman 12) yerine:
- **Ölçek:** Z 20–22 m → 512–563 px/m. Tekerlek ø 0.9 m ≈ 500 px; kundak sol alt x 0–560, y 1 000–1 500 ✓. Erler 1.64–1.72 m ≈ 880–960 px ✓ (sahne planı boy ≈ 900).
- **Sığınak çerçevesi:** sığınak 4.5 m ≈ 2 400 px genişliğindedir, kadrajdan büyüktür. Görünen parçalar: alçalan dudağın doğu ucu sol-üst köşede (x 0–420, y 220–560, koyu `#4a4468`, alt kenarında 2 px kenar ışığı; yazı kâğıt şeritte okunur), doğu iç duvarı sol kenarda (x 0–150, karren olukları), taban sekisi alt kenarda (y 1 280–1 920, gölgede `#6f6488`, kenarı ışıklı). Bu, P01 kayasının içten görünüşüdür: çerçeve içinde çerçeve, koyu sığınak → ışıklı liman.
- **Top:** oyuk gölgesinde `#2e2a44`/`#4a4468`; yalnız namlu üst kenarında rim (rel 45) ve tekerlek çember kenarında 2 px ışık. Namlu gemiye doğru sağa-yukarı (8°).
- **Erler (yüzlü, tasarım §4.2):** E1 kundak arkası x 40–300 (nişan, gözler kısık, eli yükseltme çarkında; yüz ≥ 125 px) · E2 x 290–500 (mermi sandığı, omuzda ip; yanakta toz) · E3 sol-ön x 0–190, yarı kadraj kesik, profil. Oyuğun gölgesindedirler: kıyafet gölge tonu `#615c70`; oyuk ağzından giren gök ışığı (gökten yansıma `#b9a8b4`) yüzlerin sağ düzlemine düşer; sağ kenarlarında güneşten 2 px kenar ışığı (oyuk ağzını geçen kısım). Yüzler L* ≥ 40 (tasarım §4.2).
- **Kompozisyon:** sol yarı koyu, insanlı, ağır; sağ yarı ışıklı, uzak, sakin gemi. Erler gemiyi örtmez (x ≥ 560 serbest).
- **Işık olayı:** atış anında (yerel 186) ağız parlaması ≤ 5 kare oyuğun içini bir an aydınlatır: yüzler ve tavan 2 kare boyunca `#e4b296` α .35 havuz alır (C* ≤ 28), sonra yeniden gölgeye döner. Toz bulutu oyuk ağzından ışığa çıkınca kenar ışığı kazanır.
- Atış (yerel 186): namlu 24 px geri (24 kare); ağız parlaması ≤ 5 kare (tasarım önerisi, yönetmen onayı bekliyor), çekirdek `#ffe0a0` ≤ 90 px. E4 toz: `#c9b8b0` / gölge `#7a7090`, sağa-kameraya doğru (rüzgâr +0.57) sürüklenir, oturur.
- Boyut ironisi (tasarım §4.4): top gölgede ve koyu, gemi ışıkta ve uzakta.

### 3.6 360 px okunurluk (KIYI-BATARYA)
Oyuk (P04 cs 1) 320 × 220 → 107 × 73 px, en koyu leke. Parıltı 60 px → 20 px ✓. El 285 → 95 px. Yüz 380 → 127 px. Namlu kalınlığı 190 → 63 px. Katır kulakları flu ama çift uzun kulak biçimi okunur (at değil). Toynak izi 30 → 10 px (zayıf; destek olarak toz çizgisi 8 px). Yasak benzerlik: oyuk "kapı" okunmamalı (düz kenar yok); parıltı "yıldız/sihir" okunmamalı (4 köşeli ışın yok).

---

## 4. HARITA-MEIS (P10b)
- **Kimlik:** mevcut HARITA dili. Parşömen `theme.paper/paperDark`, kâğıt lifi, mürekkep. Yeni görünüm yalnız coğrafya ve tarama.
- **Kadraj:** Kaş kıyısı üstte-sağda (kuzey yukarı), Meis altta-solda. Boğaz ≈ 2 km = 520 px (cs 1) → 0.26 px/m. Meis adası (~6 km boy) ≈ 1 560 px; kadrajdan taşar, yalnız kuzeydoğu kısmı ve liman koyu görünür (koy x 260–520, y 1 120–1 300).
- **Kıyı verisi:** Özet 10. Natural Earth 10m yetersizdir; GSHHG full ya da OSM elle sadeleştirilmiş iz (≤ 120 nokta/kıyı, Douglas-Peucker 15 m) kullanılır. Kaynak ve lisans `varliklar.md`'ye yazılır.
- **Katmanlar:**
  - deniz: yatay dalga taraması 2.2 px, aralık 9 px, `#52627a` α .55. Kıyıya paralel 3 kontur çizgisi (dalga kıyı halesi, aralık 7 px, `#3e4c63`).
  - kara: parşömen + kabartma taraması (Kaş yamacı; yamaç eğimine dik kısa vuruşlar 2.2 px, sırt çizgisinde sıklaşır), seed 197.
  - liman: koy içinde demirli gemi ikonu (enkaz durumunda yatık gövde siluet 70 px, iki baca çizgisi).
  - mevzi: Kaş kıyısında küçük top ikonu (36 px, tek koyu siluet).
  - rota: mürekkep çizgi `#1c1915` 10–12 px (P01 ile aynı), mevziden gemiye; uçta damla.
  - iğne: pirinç başlı iğne; pirinç `theme.gold`, sahnede tek altın nokta; harita kor içermez.
  - ölçek çubuğu (2 km), pusula gülü (alt üçte bir, x 760–1 000, y 1 560–1 800).
- **Yazı:** etiketler yazı katmanında (`svg_etiket:false`). Haritada gömülü harf yok.
- **360 px:** gemi ikonu 70 → 23 px ✓; top ikonu 36 → 12 px (zayıf → 48 px'e büyüt).

---

## 5. Hedef kare tarifleri (yön karesi; kamu malı litografi dili; İngilizce, Gemini prompt'una dönüştürülebilir — ÇALIŞTIRILMADI)

**P01 k124 (LIMAN `kiyidan-ada`, kapak):**
> Vertical 9:16 illustration in the language of an early-20th-century colour lithograph / travel-poster stone print, rendered as hand-made flat vector shapes: flat stepped colour areas, thin ink contours, fine engraved parallel hatching only in small shadows, visible cream paper fibre and soft grain, slight colour-registration offset. Long telephoto view from a high limestone hillside on the Anatolian coast, looking south-southwest across a two-kilometre strait at a small Aegean island harbour on a January afternoon in 1917. Bottom-left foreground: a large out-of-focus pale grey-white limestone boulder with vertical solution grooves, its face in cool blue-violet shadow, a thin rose-gold rim of light along its right and top edges, a few winter grass stalks; set into the boulder is an irregular, very dark violet cave-like hollow, and from that hollow a single thin black ink line, like a line drawn with a pen, runs diagonally up across the water and just touches the ship's hull, ending in a small ink drop. Middle: a long, slender, plain grey steamship moored broadside with the bow to the left: two tall dark funnels well apart, two thin masts, a tall flat-roofed box hangar directly behind the rear funnel, a flat platform over the bow; no markings, no lettering, no red. The sun is out of frame to the upper right, so the ship is backlit: its near side cool blue-violet, a thin rose-gold line of light along the top and right edges of the funnels, masts and hangar. Water: steel-blue horizontal engraved strokes with a broken reflection of the ship; wave crests catch rose-gold light, sparse on the left and dense toward the right edge. Behind: on the left, a medieval knights' castle — a plain rectangular curtain wall with square crenellations and one square tower on a rocky headland — with a tiny faded French tricolour; along the quay and climbing the slope, an irregular town of two- and three-storey attached houses of different heights and widths, pale sand, ochre, faded rose, pale grey-blue and lime-white, with rectangular shuttered windows and low hipped or flat roofs, no arches; above, three layers of island hills fading into cool lilac haze. Sky in five flat horizontal bands from blue-violet at the top to soft peach above the ridges, two thin flat cloud strips. Empty band at the top for a caption. Palette: blue-violet shadows, rose-gold and peach light, muted and unsaturated; no sun disc, no glow halo, no orange, no pure black or white, no people, no text in the image. Mood: calm, bright, deceptively safe.

**P07b k2388 (GEMI-INSERT `hangar-kapi`):**
> Vertical 9:16 illustration in the same early-20th-century colour lithograph language: flat stepped vector colour, thin ink contours, engraved hatching only in small deep shadows, cream paper fibre, slight registration offset. Close three-quarter view along the side deck of a plain grey 1917 seaplane-carrier steamer: the tall steel side wall of a deck hangar recedes from left to right, and in it a large rectangular double door (no arch) fills the middle of the frame; one leaf has just burst outward on its hinges and hangs open at an angle, the other leaf is still shut and scorched. From inside the dark violet opening, layered stylised flame tongues in three tones — deep orange outer leaves, bright orange middle, pale golden core — rise and curl to the right with the wind; this flame is the only saturated, bright colour in the whole picture. The flame lights the door frame, the inside of the open leaf and the deck planks in front in two or three flat, hard-edged steps of muted peach; everything else is in cool blue-violet shadow. Thick engraved smoke clouds with jagged lobed edges pour out above the door and drift right and up, out of the top of the frame, their undersides tinted muted peach. A faceless dark sailor silhouette steps back from the door on the right, feet planted on the planks, his front lit by the fire, a thin rose-gold rim from the low afternoon sun on his left shoulder. Top-left corner: a small patch of five-band blue-violet to peach sky and a hazy island ridge above the rail. Blurred rail stanchion in the lower-right foreground. No explosion star, no sparks shower, no white flash, no blood, no markings or lettering, no pure black. Mood: sudden, contained, serious — wartime restraint, not spectacle.

Not: iki tarif kamu malı dönem litografisi ve Paris hedeflerinin diliyle yazıldı. Gemini üretimi yalnız kullanıcı onayıyla ve bölüm bütçesi (≤ $1) içinde yapılır.

---

## 6. GORSEL-RECETE kontrol listesi (bu şartnamede nasıl karşılandı)
| Madde | Karşılık | Durum |
|---|---|---|
| A1 tek ışık | §0.2 vektör tablosu, §0.3 görünüm tablosu; alev yalnız P07b/P07c'de ikinci nokta kaynak | ✓ |
| A2 litografi gök | §1.4 katman 0 (sınır y'leri), her görünümde gök şeridi ≥ %12 | ✓ |
| A3 hale/havuz | güneş kadraj dışı → hale yok (`lint: hale_gunes_kadraj_disi`); alev havuzu 3 basamak | gerekçeli |
| A4 ≥ 5 katman | LIMAN 15, GEMI-INSERT 7+, KIYI-BATARYA 8 | ✓ |
| A5 buğu | 3 bant (LIMAN katman 2, 4, 5), α .62/.45/.30 | ✓ |
| A6 flu | uzak σ 4–6, ön plan σ 5–8; σ > 3 iken kontur çizilmez | ✓ |
| A7 kenar ışığı | §0.3 son satır, her katmanda ışık kenarı yazıldı | ✓ |
| A8 sıcak–soğuk | bütçeler §1.5, §2.5 (P07b), §3.3 | ölçülür |
| A9 tarama | §0.9; kalınlık alt sınırı 2.0 px (A9 değerleri düzeltildi, Özet 9) | ✓ (düzeltme) |
| A10–A12 | §0.6 `SahnePlaka` | ✓ |
| A13 seed | §0.6 seed tablosu, dünya koordinatına bağlı | ✓ |
| B1 sıra | Meis 3 derinlik, komşu farkı ≥ 0.6 kat, %20 sağır | ✓ [G] |
| B2–B7 | düz lento, kepenk, saçak altı; baca kümesi yok (kanıtsız) | nötr |
| B8 LOD | §0.5 tablosu | ✓ |
| B9 kontur | `ink(dolgu)`, clamp | ✓ |
| C mekân seçimi | 19 çekimin 10'u derinlikli (LIMAN 7 + KB 3) | ✓ |

## 7. Motion için çizim notları (yeni ortak modül önerileri; kod motion'ın)
- `src/kit/sablonlar/liman/limanDunya.ts` — tek dünya modeli (§0.1). Kamera kayıtları (`kiyidan-ada` e 50 F 11 270 …), güneş tablosu, rüzgâr vektörü 335°.
- `GemiProfil` — tek rig, durumlar §2.4, LOD sınıfları. LIMAN ve GEMI-INSERT aynı modülü çağırır. Konumlar tasarım §3 L oranlarıyla.
- `SuYuzeyi` (§0.7: satır, ışıltı, yansıma, halka, köpük, dalga izi). SARAYBURNU E3 ve `okutma.dalga_izi` buraya taşınır.
- `DumanSutunu`, `AlevDili` — COL-US `alev`/`duman` kodundan; θ ve rüzgâr parametresi ekle.
- `KayaOyugu`, `KarstYamac` (karren, maki lobu, kızıl toprak cebi) — LIMAN ve KIYI-BATARYA ortak.
- `AdaKasaba` (`siraUret` Paris'ten; düz lento, kepenk, çatı tipi seed'li), `Kale` (dikdörtgen + tarak + kule), `Tricolore` (`meltem`).
- `DenizUcagi`, `CanBotu`, `CanSimidi`, `CapaZincir` (`asiliNesne`).
- Türetme: `src/doku/TasDuvar.tsx` (taş sırası yalnız kale gölge yüzünde), `Tarama.tsx`, `ArsivKatmani.tsx`, `KonturTitreme.tsx`, `perspektif.ts`.
- Kalibrasyon sırası: önce P01 k124 ve P07b k2388 (sahne planı §10), yön karesi onayından sonra. Renk ölçümü: gök alt/ufuk bandı, kale ışık yüzü, su tabanı, gemi gölge yüzü hedef hex'e karşı.

## 8. Açık sorular ve bir sonraki ajana notlar
1. **Yönetmen:** P01 kamera yüksekliği "1.2 m" → yerel 1.2 m, deniz +50 m (Özet 2). P04 "deniz hizası 3 m" → yerel 3 m, deniz +42 m. P05 b 100'de gemi kadraj dışı (§3.4); arka plan değişir ya da b 150. P01'de altyazı oyuk ve çizgi başını örter (§1.4). Altyazı üst banda alınmalı; üst bantta yazı varsa altyazı yok.
2. **Tasarımcı:** "kuru ot / kuru maki" yerine koyu-zeytin maki + eski sap (Ocak, yağışlı mevsim [G]); hex'ler aynı kalır. Yeni hex'ler: `#e2cfc6` buğu, `#a07e6a` kızıl toprak, `#dfc4c2` P06 gök alt basamağı. Hepsi C* ≤ 28.
3. **Araştırmacı (doğrulanmalı):** hangar kapısının yeri (yan duvar mı kıç uç mu); Meis kalesinin 1917 hâli ve limanın doğu burnunda olup olmadığı; 1917 Meis evleri (çatı tipi, balkon), dönem fotoğrafı (Commons/Gallica); Kaş tarafında bataryanın yeri ve yüksekliği; Ocak'ta kıyı bitki örtüsü.
4. **Orkestra:** HARITA-MEIS kıyı verisi (GSHHG full ya da OSM + atıf) kararı; uzak sırt ×0.3 sıkıştırması (Özet 6) bilinçli sapma olarak eleştirmen listesine `lint: {izin:["sirt_sikistirma"], not:"gök bandı için tiyatro dekoru"}` şeklinde yazılır; yön karesi (§5) kullanıcıya tek mesajda.
5. **Motion:** rüzgâr 335° tek vektör. Duman tüm gemi çekimlerinde sağa yatar; P03b/P03c/P04/P05'te bayrak ve ot sola yatar. Bu fiziksel olarak doğrudur, hata sayılmaz.
