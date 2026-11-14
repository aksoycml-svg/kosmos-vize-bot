# Yarasa Bombası · Mekân Şartnamesi (kurulum ekibi, adım 5b)

Hazırlayan: mekân sorumlusu · 2026-11-14 · Girdi: `tasarim.md` (palet §1.4–1.5, ışık §1.3, çizgi §1.6, ölçüm §1.7, imza §2, defter §4: **bağlayıcı**), `senaryo.md` v1.1, `dokunuslar.md`, `sahne-plani.md` v1, `mekan-dokumu.md`, `notlar/tur-1.md` (Yöntem C), `arastirma.md` §6/T2.4/T2.5. Kod yalnız okundu: `src/doku/{sabitler,Tarama,Isik,AhsapYuzey,ArsivKatmani}`, `src/kit/KATALOG.md` (MASA-INSERT).
Bu belge **şartnamedir, kod değildir**. Görsel üretilmedi (Gemini yok, bütçe). Dünya modeli projeksiyonları betikle hesaplandı (±5 px).

Etiketler: **[A]** kaynaklı · **[S]** senaryo/sahne planı · **[Ç]** çıkarım, kaynaksız, **doğrulanmalı**, görsel olarak nötr · **[T]** tasarım kararı (tarihî iddia değil).

## 0. Özet kararlar (orkestra)
1. **Mekânlar:** ÇÖL-ÜS (5 görünüm: `genis`, `tank-alti`, `yangin`, `yangin-kenar`, `yanik`, **tek dünya modeli**) · MASA-YB (defter + masa; MASA-INSERT `aci: tepe` + yeni `isik: lamba`).
2. **Işık tasarım §1.3'e göre** (sol-alçak güneş, 9°, az 288°; gölge az 108° = ekranda sağa-öne). `sahne-plani.md` "güneş sağ-arka 14°, gölgeler sola" **geçersiz** → yönetmen düzeltir (§5).
3. **Tank yapının saçağı altında** (yönetmen P08 fikri, alındı): B1 cephesinin önünde, saçak tankın arka yarısını örter. "Saçak altı + tank altı" tek karanlık cep; P03 çizimindeki çatı hattı P12'de bu saçağa oturur.
4. **P09 2B zoom değil dolly** (Paris §1.3 gibi): 2B cs ile 9 cm yarasa ≥ 60 px olmaz. `tank-alti` ayrı fiziksel kameradır, P08→P09 arası konum enterpolasyonu.
5. **Defter iki sayfa üst üste (cilt yatay):** üst sayfa mağara+sürü, alt sayfa saçak+yarasa. P01 p0 = P12 son kare yalnız üst sayfayı gösterir → döngü fiziksel olarak tam; "sayfa geri çevrilir" yerine **kamera alt sayfadan üst sayfaya kayar** (§3.6).
6. **Kemer yok.** Bu bölümde bütün açıklıklar düz lentolu dikdörtgen; mağara ağzı doğal kaya (basık, asimetrik), mimari kemer değil.

---

## 1. ÇÖL-ÜS — Carlsbad AAF yardımcı üssü, 15 Mayıs 1943, geç ikindi

**Duygusal amaç:** düz, sessiz, sıcak bir çöl öğleden sonrası; tek karanlık cep (saçak + tank altı) bütün sahnenin gözünü çeker. **Görsel dil:** yatay baskın (ufuk, saçak, kaplama, tank) + tek dikey vurgu (soba borusu, tank havalandırma borusu, yükselen sürü); ritim = mertek uçlarının dişli sırası (0.61 m); renk = gül-altın ışık / mavi-mor gölge; kontrast en yüksek saçak altında.

### 1.1 Mimari kart
| Madde | Karar | Etiket |
|---|---|---|
| Dönem/üslup | 1942–43 ABD Ordusu geçici ahşap yapıları ("mobilization / theater-of-operations" tipi): ahşap karkas, tek kat, beşik çatı, yerden yükseltilmiş döşeme. Yapı adı (kışla/hangar/kule) **yok**, yazı/numara/yıldız/bayrak **yok**. Uçak, rüzgâr tulumu, kule **çizilmez** | [Ç] (T2.4: malzeme/tip doğrulanamadı) |
| Yerleşim | Yapılar aynı eksende (askerî düzen, uzun eksen az 305°/125°), **boy, genişlik, aralık farklı**; ızgara sırası yok | [T] |
| **B1** (ana yapı, tanklı) | 6.1 × 9.1 m; döşeme +0.45 m ahşap takozlar üstünde (altında koyu boşluk bandı); duvar üstü 3.0 m; mahya 4.1 m (eğim 20°); **saçak çıkıntısı 1.0 m** (gerçek ≈0.3–0.6 [Ç], imza için abartı); alın saçağı 0.45 m; **açık mertek uçları 0.61 m arayla**, 0.05×0.14 m; alın tahtası (fascia) 0.15 m; çatı rulo kaplama, kenarda 3 cm sarkık dudak | [Ç] |
| B1 cephesi (kameraya dönük uzun yüz, normal az 215°) | yatay bindirme tahta kaplama, görünür bant 0.15 m; **tek pencere** (tankın sağında, kenar 3.0 m), 0.9 × 1.4 m, eşik +1.2 m, **düz lento**, iki kanatlı sürme pencere: ortada yatay kayıt + tek dikey kayıt; kapı sağ alın duvarında (kadraj dışı) | [Ç] |
| B1 çatı üstü | sağ uçtan 2.5 m, cepheden 2.0 m geride ince soba borusu ø 0.15, mahyanın 1.0 m üstü, konik başlık | [Ç] nötr dikey vurgu |
| **B2** (uzak, sol) | 9.1 × 18 m, duvar 3.6, mahya 5.0 (17°); **katran kâğıdı + dikey çıta 0.9 m** (B1'den malzemeyle ayrışır); yalnız siluet + çıta ritmi | [Ç] |
| **B3** (çok uzak) | 3.7 × 4.9 m, **tek eğimli** çatı (2.5→3.1 m); tek siluet | [Ç] |
| Uzak sıra | Z 120–250 m'de 3 alçak siluet, boy 2.6–4.2 m, aralık seed'li | [T] |
| **Tank** | yatay silindir L 3.8 m, ø 1.6 m (2.4:1, tasarım), alt +0.55, üst +2.15; **2 ahşap semer** (eksen ortasından ±1.2 m; beşik kızak 0.15×0.15, alt yüzü +0.40) + **4 ahşap ayak** (her semerde 2, eksenden ±0.65); üstte dolum kapağı (ø 0.25, 0.08 yüksek) + havalandırma borusu ø 0.05, 0.6 m; 2 çevresel kaynak dikişi (1/3, 2/3); yazı yok. Eksen cepheye paralel, **cepheden 1.1 m önde** (arka yüzü duvardan 0.3 m) → saçak tankın arka yarısını örter. Yanarken çizilmez | [A] tank altı tünek (TEK); biçim/ölçü [Ç]; I-profil yerine ahşap: tasarım paleti + pürüzlü tutunma yüzeyi |
| **Tünek yüzeyleri** | (a) mertek uçları arası saçak altı, (b) semer kirişi alt yüzü (+0.40), (c) tank kabuğu–semer arası oyuk (en karanlık) | [A] "eaves, attics" + tank altı |
| Arazi | Chihuahua çölü düzlüğü; yapı çevresi 6 m tesviye edilmiş çıplak toprak; dışında kuru çalı topakları (kreozot benzeri, tür adı yok); lastik izi | [G]/[Ç] |
| Uzak dağ | Guadalupe Dağları'nın kuzeydoğu uzantısı (Capitan resif sırtı): kamera K-KB'ye bakarken **sol yarıda alçak, düz tepeli sırt**, soldan sağa alçalır, sağ yarıda düz ufuk (Pecos vadisi) | [Ç] (K1 koordinatı 32°15′39″K 104°13′45″B doğrulanmadı) |
| Kameradan görünen | Göz ≤ 1.7 m < saçak 3.0 m ⇒ **çatı yüzeyi hiçbir görünümde görünmez**; görünen: alın tahtası, saçak altı + mertek dişleri, alın üçgeni profili, soba borusu, tankın üstü yalnız P08'de (göz 1.7 < 2.15 → üst yüzey ince şerit, kapak/boru siluet) | — |

### 1.2 Dünya modeli (m; X doğu, Z kuzey, Y yukarı)
- Orijin O = B1 cephe tabanında tank ortasının arkası. Cephe yönü d = az 305° (−0.819, 0.574), dış normal n = az 215° (−0.574, −0.819).
- B1 cephe: O + 4.9·d (sol uç) … O − 4.2·d (sağ uç, alın köşesi). Tank ekseni ortası T = O + 1.1·n.
- B2 merkez (−30, 22); B3 (−48, 60). Çalı: Poisson min 4 m, seed 215, yapıdan ≥ 6 m. Seed'ler **dünyaya** bağlı (kamera/kare değil).
- **Güneş:** az 288°, yükseklik 9° [T]; gölge boyu = 6.3 × h, kadraja sığmazsa ≤ 5 × h. Gölge, kenar ışığı, kenar parlaması aynı vektörden (`Isik.izdusum`).
- Kamera formülü: `x = 540 + F·xc/zc`, `y = U − F·(h − göz)/zc`, dikeyler dik (kaydırmalı objektif). cs bu kameranın üstünde 2B kırpmadır; dolly ayrı.

| Görünüm (plan) | Konum C (X, Z) | göz | bakış az | F | ufuk U | Not |
|---|---|---|---|---|---|---|
| `genis` (P08, P10 son, P01b) | (5.2, −15.6) | 1.7 | 335° | 1400 | **1010** | güneş ekranda sol dış (x −960, y 788); gölgeler ekranda sağ-aşağı |
| `tank-alti` (P09 son, P10 baş) | (2.47, −5.02) | 0.30 | 320° | 1400 | **1180** | yarı karşı ışık; güneş sol dış (x −335, y 958) |
| `yanik` (P12 B) | (−2.54, −4.33) | 0.60 | 40° | 1150 | 1470 (gizli) | güneş sol-arka; cephe ışıkta |

**Denetim noktaları (cs 1.0, ±5 px):**
- `genis`: tank merkezi (622, 1041), sol uç (538, 1038), sağ uç (726, 1045), üst y 970, alt y 1112, zemin y 1165 (ekranda ≈ 190×195 px; yönetmenin 260×200 hedefine yakın) · B1 sol uç x 501 (saçak y 922, zemin 1126), sağ köşe x 979 (saçak 867, zemin 1197) · alın tahtası (440, 916)→(897, 855) · B2 x 82 (saçak 956, zemin 1059) · B3 x 290 (zemin 1036). **Ufuk x 0–500 açık** (sırt + B2 + B3 + uzak sıra burada); x 500–1080 B1 + tank.
- `tank-alti`: yakın kapak merkezi (865, 736) r 338 (x 527–1203, y 398–1074) · yakın semer üst/alt (746, 1092/1145) · uzak semer (533, 1124/1158) · tank altı zemin (615, 1262) · alın tahtası (641, 436)→(414, 791) · duvar üstü (885, 484)→(550, 808) · B2 (287, 1069–1190). **Ufuk 1180 tank altı boşluğunda** (y 1074–1262): sıcak ufuk dilimi + uzak sırt orada görünür.
- `yanik`: §4.2 anahtar hatları.

**Dolly (P08→P09):** k ∈ [0,1] ile C, göz, az, U doğrusal (az kısa yoldan); 2B cs ayrı. Öneri: P08 p340–391 k 0→0.15 · P09 p0–150 k 0.15→1 (inout) · P09 p120–220 cs 1.0→2.5, hedef dekor (700, 1110) (yakın semer). Yol tanka ≥ 2 m. **P10:** p0–110 `tank-alti` cs 2.5 sabit → p110–208 k 1→0 ve cs 2.5→1.0 → son = `genis` cs 1.0. **P01b:** `genis`, alev evresi = P10 son, cs 1.05, cx +330 (alev ekran x ≈ 956, sağ kenarda yarım).

### 1.3 Katmanlar (ön → arka; kontur tasarım §1.6, renk #2b2f45 ailesi α .85)
| Katman | İçerik | Kontur | Flu / atmosfer |
|---|---|---|---|
| L0 gök | 5 düz basamak (§1.5), basamak sınırında litografi geçişi | yok | — |
| L1 uzak sırt | 2 ton, düz tepe, max ufkun 46 px üstü (×3 abartı) | yok | üst kenar blur 1.2 px; alt %30'a `#e3b8a4` α .30 pus bandı |
| L2 uzak sıra + çalı bandı (Z > 60) | düz siluet `#b49bb0`/`#9a8aa6`, sol kenar ışığı 2 px | 3 px ya da yok | blur 0.6 px; pus α .25 |
| L3 orta (B2, B3, Z 40–90) | siluet + çıta/pencere ritmi | 3–4 px | pus α .12 |
| L4 yakın (B1, tank, Z 10–25) | tam mimari + doku | 6 px (P09 yakın 6 px, cs ile büyür) | — |
| L5 ön plan (Z 3–8) | P08: çalı Ç0 taban (130, 1600), Z 4.0, boy 1.3 m → 450 px, sol kenardan kesilir; lastik izleri (2 iz, 1.6 m aralık, kaçış (662, 1010)); çakıl | 6 px | yok (ön plan net; ufuk–ölçek uyar) |
Katman kenarında maske şeridi bırakılmaz (alfa 1 kenar + 1 px taşma).

### 1.4 Malzeme ve doku (yüzey başına ≤ 3 katman: ① ortak kâğıt/gren `ArsivKatmani` · ② malzeme deseni · ③ tarama yalnız §6 yerlerinde; seed `DOKU_SEED.colUs = 211`, sabit)
| Yüzey | Malzeme | Doku tarifi | Kod yöntemi | Parametre |
|---|---|---|---|---|
| Gök | — | düz basamak + geçişte 3 ince çizgi + nokta | `<rect>` ×5; geçiş bandı 24 px | çizgi 1.5 px, 5 px aralık, alt ton α .5; nokta ø 2 px, 0.004/px², α .6, seed 211 |
| Güneş parıltısı | — | disk çizilmez; sol dış merkezli 2 halka | düz daire, multiply değil screen | `#f6dcb8` α .50 r 520 · α .28 r 900 (`genis`); `tank-alti` r 420/760 |
| Toprak | kuru, tesviye | ışık/orta/gölge düz bölge + çakıl noktası | path + stipple | çakıl ø 2/3/5 px, yakın 0.0025/px², orta 0.001, uzak 0; renk toprak gölge α .5; yalnız ön planda 1 px sol parlama `#f0c0a0` |
| Lastik izi | — | iki şerit, kısa enine diş | dash | şerit 0.25 m; diş 3 sıra, `#b98f76` α .6, sol kenar ışığı 1.5 px |
| B1 kaplama | yatay bindirme ahşap | her bindirmenin altında gölge çizgisi; ek yerleri şaşırtmalı | yatay çizgi seti dünyada | gölge çizgisi 2.5 px (`genis`) / 3 px (yakın) `#6c5f7a` α .7; üst parlama 1 px `#f0c0a0` α .4 (ışık yüzü); ek yeri 1.5 px dikey, 2.4–3.6 m seed 213; damar yalnız yakın, 2 dalgalı çizgi/tahta α .12 |
| Mertek ucu + alın tahtası | ahşap | sol yüz ışık `#e0b093`, alt yüz gölge; her mertek duvara çapraz gölge düşürür (sıyırıcı ışık) | kutu izdüşümü | `genis`te mertek ≈ 4 px genişlik, 49 px ritim → **imza "dişli saçak"** |
| B2 katran kâğıdı | — | düz koyu + dikey çıta | çizgi | çıta 0.05 m, sol kenar ışığı; yatay ek her 0.9 m ince |
| Pencere | eski cam | koyu cam + çapraz gök yansıma şeridi | iki ton | cam `#3c3650`; şerit `#8a86b0` α .30, 25° eğik, dalga yok |
| Tank | boyalı çelik | terminatörlü silindir: ışık → gövde → gölge 3 düz bant; kaynak dikişi; 3–5 dikey akıntı izi kapaktan | düz bant + çizgi | dikiş 2 px gövde %55 koyusu; akıntı `#8b90a0` α .25, 2–3 px; yazı/pas yok |
| Semer/ayak | ahşap | 2 damar çizgisi | çizgi | `#6b5a52` / `#3e3650` |
| Çalı | kuru topak | tabandan yelpaze 9–15 ince gövde + küçük yaprak kümeleri | path | gövde 2–3 px; küme ø 6–14 px `#8b7d6d`, ışık `#a8957f`, gölge `#4e4658`; boy 0.8–1.8 m |
| Duman (P10, P12) | — | tırtıklı lob kümeleri; güneş yüzü gül-altın, alev yüzü ılık | path, küçülerek ayrılır (fade yok) | gövde `#6a5f78`/`#3e3b5c`; güneş kenarı `#e3b8a4` 2–4 px; alev altı `#c08a6c` (C\* 29) |
| Yanık ahşap (P12) | kömür | "timsah derisi" kısa dik çatlaklar | çizgi seti seed 216 | `#2f2a2e`; çatlak 1.5 px `#4e4658`; **kor kenarı yok** (P12'de kırmızı bandı yasak) |
| Kurum (P12) | — | duvar üstünde 3 basamak düzensiz kenarlı bant; tank üst yarısında çapraz kurum lekesi | path | `#2f2a2e` → `#4e4658` → `#5a5066`; tank kurumu `#3e3b5c` + kabarmış boya noktası `#5c5f78` |
Kontur titreşimi `KonturTitreme` TITREME değerleri, seed sabit; doku kaynamaz, yalnız ışık (alev titreşimi) değişir.

### 1.5 Palet (tasarım §1.4 + türetilen; L\*/C\*/h betikle ölçüldü)
| Ad | Hex | L\*/C\*/h | Not |
|---|---|---|---|
| gök tepe/üst/orta/alt/ufuk | `#5b6a9a` `#8a86b0` `#b99fb4` `#e3b8a4` `#f0cfab` | 45/29/284 · 58/24/296 · 68/15/331 · 78/20/52 · 85/23/74 | basamak sınırları ufuktan yukarı: 0–120 ufuk · 120–330 alt · 330–620 orta · 620–900 üst · >900 tepe (px, cs 1) |
| sırt / uzak sırt | `#9a8aa6` / `#b49bb0` | 60/17 · 67/15 | |
| toprak ışık / orta / gölge / derin | `#d9b595` `#b98f76` `#6f6486` `#463f5c` | 76/23/68 · 63/23/57 · 45/21 · 28/19 | |
| kaplama ışık / gölge | `#cfa98a` / `#6c5f7a` | 72/23/66 · 42/17 | |
| saçak altı / tank altı / oyuk | `#2f2c45` | 19/17 | sahnenin en koyusu (`#14120f` değil) |
| tank ışık / kenar / gölge | `#9aa0ad` `#e3b9a0` `#5c5f78` | 66/7 · 78/22/58 · 41/15 | |
| kenar ışığı (güneş) | `#f0c0a0` | 81/26/61 | 2–3 px, güneşe bakan sol/üst kenarlar |
| alev dış ışığı (yeni) | `#ecbe9c` | 80/26/63 | `#f0b48a` (C\* 34) yerine: §1.7 C\* ≤ 32 |

### 1.6 Işık ve gölge (tek kaynak)
- **`genis`:** güneş kadraj solu dışında, gölgeler ekranda **sağ-aşağı** (dünya az 108°). B1 cephesi sıyırıcı ışıkta (geliş 73°): ışık tonu `#cfa98a`, mertekler duvara çapraz gölge; saçak gölge bandı duvarda saçaktan **0.54 m** aşağı (1.0 × tan9°/cos73°). Tank: sol uç kapağı tam ışık (`#e3b9a0` ailesi), gövde gri, alt karanlık; gölgesi cephe boyunca sağa uzanır → karanlık cep sağa genişler. B1 sağ alın duvarı gölge (`#6c5f7a`, düz ton). Kenar ışığı: alın tahtası üst kenarı, tank üst-sol, çalı tepeleri, soba borusu sol kenarı.
- **`tank-alti`:** yarı karşı ışık. Kameraya bakan yüzler gölgede (mor), siluet kenarları gül-altın; tank altı boşluğundan **sıcak ufuk** görünür, yarasalar ona karşı koyu siluet + 2 px sol kenar ışığı (okunurluğu bu verir). Ayak gölgeleri kameraya doğru uzar.
- **`yanik`:** güneş sol-arkada; cephe ışıkta ama saçak bandı + kurum koyu; gök kameranın arkasındaki güneşin karşısında "gül kuşağı" (§4.2).
- **Alev = ikinci ışık kaynağı (P10, P01b) — kural:**
  1. Kaynak noktası = alev tabanı ağırlık merkezi; şiddet I(t) = alev alanı / maks alan; titreşim ±%8, deterministik `f(kare, seed 217)`, 3–5 Hz.
  2. Etki yarıçapı R = 2 × alev boyu (ekran). Yalnız **alevi gören** yüzeyler ışık alır: saçak altı, alın tahtası, tank üstü ve sağ ucu, duvar, zemin. İç halka (≤ 1 × boy) `#F29A2E` α .20 (alev bölgesi sayılır, imza bandı izinli) · dış halka (1–2 × boy) `#ecbe9c` α .14.
  3. Alev gölgesi: yalnız R içindeki nesnelerden (tank, ayak, kompars), **alevden uzağa**, α ≤ .18, boy ≤ nesne–alev mesafesi. **Güneş gölgeleri aynen kalır**, baskın gölge yönü değişmez.
  4. Kenar ışığı: aleve bakan kenarlarda 2 px `#ecbe9c`. Duman alt yüzü `#c08a6c`.
  5. Alev görünmeden önce ışığı görünür: P10 p102–110 (alev kadraj dışında, saçakta) tank kapağı üst kenarına ve semerin üst yüzüne titreyen `#ecbe9c` α .14 düşer; ses yok (görünmeyen kaynak).
- **Kıvılcım (D6):** tasarım "ø 6 px, kuyruk 2–3 px". Işığı halo değil **yüzey yaması**: en yakın yüzeyde (semer alt yüzü, tank kabuğu) r 45 px (`tank-alti` cs 2.5'te), `#F29A2E` α .22, 10 kare sönüm. Gerekçe: dokunuş D6 "halo + yansıma ≈ %10–12" ister; tasarımın "≤ 2 × kaynak" sınırı 12 px'te görünmez. **Konum: tank kabuğu–semer oyuğu** (en karanlık yer, gövde zeminle ΔL\* ≤ 4 → yarasa bedeni okunmaz; ton kuralı). Ufka karşı siluet yarasalar kıvılcım almaz.

### 1.7 Plan başına kadraj notları
- **P08 `genis`:** gök y 0–1010 (sürü, sol dış parıltı), sol yarı açık ufuk + sırt + B2/B3 (atmosferik derinlik), sağ yarı B1 + tank (190×195 px). Alt üçte bir: toprak, ön plan çalı Ç0, lastik izi, uzun gölgeler. **D4 sürü gölgesi:** her bireyin izdüşümü (güneş vektörü) zemine/tanka/cepheye; elle konmaz. Tankın üstüne düşmesi için akış tankın 13–32 m batı-kuzeybatısından 2–5 m yükseklikte geçmelidir (ekranda x ≈ 300–500, ufka yakın alçak akış); sürü sağdan sola uçtuğu için gölge önce tanka, sonra sola, sol kenardan çıkar.
- **P09 `tank-alti` (anahtar):** üst: tank yakın kapağı (koyu, sol-üst kenar ışığı) + sağ üstte saçak altı ve mertek dişleri; orta: semerler + tünemiş yarasalar ufuk parıltısına karşı; alt: tank altı zemin, kameraya uzanan ayak gölgeleri. cs 2.5 hedefinde yakın semer yarasası ≈ 0.11 m × 351 px/m × 2.5 ≈ **97 px** (≥ 60 eşiği; yarasa ×1.25 abartı, tasarım ≈ 9 cm). Üst bant (y 240–400) yazının arkası koyu kapak = düz zemin.
- **P10:** baş `tank-alti` (kıvılcımlar oyukta) → çekilme → son `genis` (alev alın tahtasında tankın üstünde, ekran ≈ (622, 890) tabanlı, boy ≤ 300 px, alev+duman çekirdeği ≤ kadrajın %12'si; duman sağ-yukarı, rüzgâr sağa). Sürü: sol üst gök x 60–420, y 360–760, nokta ≤ 40 px, alevden ≥ 540 px. Kompars (≤ 1): sol düzlükte Z ≈ 14 m, ayak (260, 1180), boy 175 px (baş ≈ ufuk), sağa (aleve) bakar, kenar ışığı sol.
- **P12 B `yanik`:** §4.2.

---

## 2. MASA-YB — Adams'ın defteri ve masası (P01a, P02, P03, P12 A/C; P04 B, P05–P07, P11 B aynı masa)

**Duygusal amaç:** gece yarısı fikir masası; sıcak bir ışık adası içinde tek kişinin takıntısı. **Görsel dil:** yatay masa damarı + defterin dikey yığılımı (üst sayfa/alt sayfa), tek sıcak havuz, köşelere doğru mavi-mor.

### 2.1 Mimari kart (iç)
| Madde | Karar | Etiket |
|---|---|---|
| Kamera | `aci: tepe` (yalnız masa, duvar/pencere yok), tepeden ≈ 8° önden eğik | [T] |
| Masa | tek parça kaplamalı koyu ahşap tabla (1940'lar ofis masası), damar yatay; kenar, çekmece, yazı, oyma görünmez | [G] nötr |
| Lamba | abajurlu masa lambası **kadraj dışı sol-üst**, yükseklik 45° ⇒ gölge boyu = nesne yüksekliği, yön sağ-aşağı. Gövde çizilmez | [G] (tasarım G11) |
| Defter | açık, **cilt yatay**: üst sayfa + alt sayfa; sayfa 860 × 700 px (≈ 27 × 22 cm, 31.9 px/cm); kapak bezi `#57474e` sayfalardan 13 px taşar; dış köşeler 4 mm kalkık | [T] |
| Ölçü düzeni (dekor, cs 1) | yayılım x 110–970 · **üst sayfa y 610–1310** (merkez 540, 960) · cilt oluğu 1310–1346 · **alt sayfa 1346–2046** | [T] |

### 2.2 Masa yüzeyi ve lamba havuzu (seed `DOKU_SEED.masaYB = 227`)
- **Havuz** (dünyaya sabit): merkez dekor **(420, 1180)**, elips 1.2:1, uzun eksen 135° (lambaya doğru). Basamak: R1 720 · R2 1100 · dış. Basamak sınırları gök gibi litografi geçişi (3 ince çizgi + nokta), yumuşak gradyan yok.
| Bölge | Masa | Kâğıt |
|---|---|---|
| R1 çekirdek | `#8a6a54` (47/20/61) | **`#ebcfab` (85/22/78, yeni)** |
| R1–R2 | `#725a4c` (40/14/57, yeni) | `#e6d8b9` (87/17/90) |
| dış | `#3c3650` (24/17) | `#d8c9a8` → köşelerde `#aa9fb0` |
Gerekçe (`#ebcfab`): tasarım kâğıdı `#e6d8b9` h = 90°, "sıcak piksel" bandının (30–80°) dışında; defter kareyi doldurduğu P01/P03'te sıcak ≥ %14 tutmaz. Lamba ile ısınmış kâğıt h 78°, C\* 22, L\* 85 ≤ 88. Tasarımcıya bildirim, palete ek (çelişki değil, ışık tonu).
- **Damar:** uzun yatay dalgalı çizgiler 1.5–2.5 px `#5e4a40` α .35, aralık 10–34 px seed 227; 2 katedral (V) figür; budak yok. **Cila parlaması:** havuz içinde 135° yönünde uzun yumuşak şerit `#b08a70` α .15 (beyaz parlama yok).
- **Prop gölgeleri:** ofset = yükseklik × (0.71, 0.71) sağ-aşağı, `#3c3650` α .55, kenar net (gravür). Defter kalınlığı 1 cm → 32 px gölge; kalem ucu masadan 2 cm → 64 px.
- Masa P04 B/P05–P07/P11 B'de aynı tabla, aynı havuz (belge/zarf/pamuk yatak propları bu zemine oturur; havuz merkezi plan merkezine göre yeniden konmaz: dünya sabit).

### 2.3 Kâğıt dokusu (≤ 3 katman, seed sabit)
| Katman | Tarif | Yöntem | Parametre |
|---|---|---|---|
| ① lif | yönlü kâğıt lifi | `feTurbulence fractalNoise` baseFrequency 0.85 / 0.35, octaves 2 → parlaklık, multiply | α .14, seed 223 (`DOKU_SEED.cizim`) |
| ② leke + oluk + kenar | 6–10 leke ø 20–60 px; oluk düz bant 36 px `#8d8196` + iki yanda 24 px kâğıt kıvrım basamağı `#d8c9a8` + bantta 3 kısa tarama (72°); dış kenarda 8 px sararma; kalkık köşede 2 px parlama `#ebcfab` + altında gölge `#8d8196` α .5 (5, 5) | path | leke `#b9a07a` α .06, seed 224 |
| ③ mürekkep | çizgi kenarına emilim, uç ve duraklarda kuruma halkası | `feDisplacementMap` scale 0.8 (turbulence 0.6, seed 225); halka 0.8 px `#1b1d33` α .5 | ıslak `#1b1d33` → 24 kare → kuru `#2b2f45` (tasarım) |

### 2.4 Mürekkep çizgi kalınlıkları (dekor, cs 1; 360 px karşılığı ≥ 0.8 px)
| Çizgi | Kalınlık |
|---|---|
| ana hat (çatı hattı, alın tahtası, mağara ağzı, kaya ana katmanı, yarasa konturu) | 3.5 px |
| ikincil (kaplama çizgisi, duvar üstü, kaya ara hattı, akış çizgisi, kenar notları) | 2.5 px |
| tarama | 2.5 px / aralık 7 px / 72° |
| sürü bireyi | kontursuz dolgu `#2b2f45`, boy 10–34 px |
P01'de cs 2.4 ⇒ ana hat 8.4 px ekran; P02 cs 1.0 ⇒ 3.5 px (360'ta 1.2 px). Hepsi okunur.

### 2.5 Üst sayfa: mağara ağzı + sürü (P01, P02, P12 son) — sayfa-yerel (0–860, 0–700), dekor = yerel + (110, 610)
- **Ağız:** doğal kaya açıklığı, **basık ve asimetrik** (sol taraf alçak), merkez (430, 520), genişlik 300, yükseklik 120; mimari kemer değil. Lavis `#463f5c` α .75, iç %60 çekirdek `#2f2c45`; en içteki küçük cep (≤ 120 × 50 px) tek yer çapraz tarama.
- **Kaya katmanları:** 5 yatay kıvrık hat, x 120–760, y ≈ 430 / 470 / 505 / 575 / 620 (±8 seed'li, −3° sağa alçalır), ağızda kesilir. Çıkıntıların altında 3–5 tarama grubu (6–10 çizgi, 72°), sağ-alt taraflarda.
- **Tepe hattında 3 küçük çalı topağı** (tür yok).
- **Sürü:** ağızdan (430, 470) yükselen koni (yarı açı 14°) → 2 kollu log-spiral (tasarım §3.4 a, b, seed ortak), **ters saat yönü** (yönetmen), sütun yükseldikçe sağa kayar (520, 80); 70–110 birey; P01 cs 2.4'te ≥ 6 birey ≥ 72 px (yerel ≥ 30). Akış çizgisi 6–8, 2.5 px, dash 18/14, ofset kayması 40 px/sn.
- **Gök yok**, kâğıt boş (tasarım). Kenar boşluklarında (yerel x 20–100 ve 770–840) 3–5 soyut not satırı (dil-nötr) — P02'de görünür.
- **P01 p0 kadrajı:** cs 2.4, cx 0, cy 0 → görünen dekor x 315–765, y 560–1360: üst sayfa tam boy + oluk (ekran y 1800–1886, alt bandı doldurur) + 14 px boş alt sayfa kenarı. Masa şeridi ekran y 0–120 (üst güvenli alan). **Alt sayfadaki çizim kadraja girmez** ⇒ P12 son karesi P01 p0 ile birebir.

### 2.6 Alt sayfa: saçak + asılı yarasa (P02 yarım, P03 tam, P12 dönüşüm) — sayfa-yerel, dekor = yerel + (110, 1346)
Çizim, P12 B gerçek kadrajının (§4.2) ölçekli kopyasıdır: `yerel = (ekran − (540, 960)) / 1.9 + (430, 300)`.
| Hat | Yerel koordinat | Kalınlık |
|---|---|---|
| H1 çatı hattı (alın tahtası üst) | (146, 161) → (714, 193) | 3.5 |
| H1' rulo kaplama dudağı | H1'e paralel, 6 px yukarı | 2.5 |
| H2 alın tahtası alt | (146, 184) → (714, 215) | 3.5 |
| H3 duvar üstü | (146, 267) → (714, 291) | 2.5 |
| H4 saçak gölge bandı alt | (146, 335) → (714, 353) | — (tarama sınırı) |
| M1–M8 mertek uçları (duvar → alın) | (174,275)→(121,183) · (252,278)→(219,188) · (328,281)→(315,193) · (403,284)→(409,198) · (476,287)→(500,203) · (547,290)→(588,207) · (617,293)→(675,212) · (686,295)→(759,217) | 3.5 (yelpaze; perspektif gereği orta dikey, kenarlar eğik) |
| Tarama T1 | H2–H3 arası saçak altı, mertekler arası, 72°, 7 px | 2.5 |
| Tarama T2 | H3–H4 arası duvar gölge bandı, 72°, 7 px, yalnız sol yarı yoğun | 2.5 |
| Kaplama | H3 altında 2 kısa çizgi H3'e paralel, +26 / +52 px, x 180–620 | 2.5 |
| Yarasa | M4 ucundan asılı, ayak (409, 205), göğüs (412, 262), baş (414, 330); kanat katlı, kulaklar aşağıda; P02'de göğüs boş (kâğıt rengi daire ø 22) | 3.5 kontur |
| Kırmızı alev (P03) | göğüsten H2'ye uzanan dil: taban (412, 262), uç (418, 200), genişlik 34, `#b3261e`, çekirdek kâğıt rengi | 3.5 |
| Kenar notları | yerel x 740–840 (P12 B kadrajının dışında kalır) | 2 |
**Sırası (P03, yönetmen kareleriyle):** H1+H1' → H2 → M1–M8 → T1 → (yarasa P02'den hazır) → kalem göğüste durur 0.4 sn → alev → T1+T2 soldan sağa kırmızıya geçer (tasarım). Alt sayfanın geri kalanı boş (P12'de gerçek sahnenin tank/zemin bölgesi).

### 2.7 P12 çizim ↔ gerçek eşlemesi (katman katman)
| Çizimde | Gerçekte (`yanik`) | Geçiş |
|---|---|---|
| H1, H1', H2 | alın tahtası üst/alt kenarı, rulo kaplama dudağı (yanık `#2f2a2e`, güneş kenarı `#f0c0a0` kırık) | çizgi kalınlığı 3.5 → 6 px kontur; arası tahta yüzüne dolar |
| M1–M8 (kalın) | mertek uçları (aynı konum, aynı açı), 3B kutuya şişer: sol yüz ışık, alt yüz kömür | 8 kare |
| T1 (kırmızı tarama) | saçak altı gölgesi + kurum (tarama gerçek sahnede de tarama kalır: gravür dili) | renk `#b3261e` → `#4f2a2a` → `#2f2a2e`, soldan sağa, kenar net, 10 kare |
| T2 | duvar saçak gölge bandı | tarama kalır, ton bandı altına basılır |
| H3 + kaplama çizgileri | duvar üstü + bindirme tahtaları (çizgi sayısı 2 → gerçek ritim 0.15 m; ek çizgiler soldan sağa "basılır") | baskı silmesi |
| Yarasa + kırmızı alev | **karşılığı yok** | önce **geri çizilir** (dashoffset tersine, 14 kare); yanmış yarasa çağrışımı olmasın diye kömür lekesine dönüşmez |
| Boş kâğıt üst | gök (gül kuşağı) + duman perdesi | baskı katmanı |
| Boş kâğıt alt | tank (kurumlu) + saçak gölgesi + zemin | baskı katmanı |
**Baskı katmanı kuralı (fade yok):** kâğıt → gerçek renk, litografi baskısı gibi 4 düz katmanın sırayla soldan sağa yırtık kenarlı silmesiyle (gök → duvar → tank + zemin → saçak), her biri 4 kare, kenar net. Toplam A→B ≈ 40 kare (geri çizim 14 + kırmızı→kömür 10 + baskı 16): yönetmen P12 B sabit tutmayı (p112–172) bu bitişten başlatır. **B→C (p318):** ters sıra 18 kare (baskı geri, tahtalar çizgiye çekilir, tarama mürekkep `#2b2f45`, kırmızıya dönmez), sonra kamera alt sayfadan üst sayfaya kayar ve cs 2.4'e iter (≈ 32 kare), son = P01 p0. Kâğıt asla zıplamaz; ışık yönü (lamba sol-üst / güneş sol) sıçramaz.

---

## 3. Ortak notlar
### 3.1 Tarama (hatching) — nerede / nerede değil
| Evet (72°, ≥ 2.5 px, aralık ≥ 7 px; kit `TARAMA_KALINLIK` yakın 2.2 bu bölümde 2.5'e çıkar) | Hayır |
|---|---|
| B1 saçak altı (mertek arası) + duvardaki 0.54 m saçak gölge bandı | gök, sırt, uzak siluetler |
| pencere sağ yanağı (gölge tarafı) | geniş toprak gölgeleri (düz ton) |
| tank alt yüzü yalnız terminatör bandı (en çok 0.25 × çap) | tank gövdesinin geniş yüzü |
| semer kirişi alt yüzü | B1 sağ alın duvarı (düz gölge tonu) |
| defter: kaya çıkıntı altı, cilt oluğu (3 kısa), saçak çizimi T1/T2 | duman, alev, masa, kâğıt boş alanı |
**Çapraz tarama yalnız:** tank kabuğu–semer oyuğu (≤ 120 × 60 px), pencere üst köşe derin gölgesi (≤ 40 px), B1 döşeme altı boşluğunun en karanlık 1 m'si (≤ 120 px), mağara ağzı iç cebi (≤ 120 × 50 px). Kafes/örgü deseni hiçbir yerde yok.

### 3.2 Renk ölçüm hedefleri (eleştirmen; kutu 30 × 30 px, ekran koordinatı, ortalama ΔE76 ≤ 6, L\* ±4)
| Mekân/kare | Ölçü noktası | Hedef hex |
|---|---|---|
| **P08 `genis` cs 1.0** | gök üst (540, 300) | `#8a86b0` |
| | gök ufuk bandı (200, 940) (sırt üstü) | `#f0cfab` |
| | uzak sırt (120, 995) | `#9a8aa6` |
| | B1 duvar ışık (900, 1080) | `#cfa98a` |
| | saçak gölge bandı (900, 900) | `#6c5f7a` ± tarama (ortalama L\* 38–46) |
| | tank sol uç ışık (550, 1040) / gövde (650, 1010) | `#e3b9a0` / `#9aa0ad` |
| | tank altı (630, 1140) | `#2f2c45` |
| | zemin ışık (420, 1450) / tank gölgesi (850, 1215) | `#d9b595` / `#6f6486` |
| **P09 `tank-alti` cs 2.5 (hedef (700,1110))** | ufuk dilimi (ekran 540, 1150) | `#f0cfab` |
| | yakın kapak alt (ekran 540, 400) | `#5c5f78` |
| | oyuk (ekran 760, 870) | `#2f2c45` |
| | zemin tank altı ışık (ekran 300, 1700) / ayak gölgesi | `#d9b595` / `#463f5c` |
| **P10 son (`genis` + alev)** | alev iç halka tank üstü (622, 960) | `#cfa98a` + `#F29A2E` α .20 (C\* ≤ 40, alev bölgesi) |
| | dış halka duvar (800, 1000) | C\* ≤ 32 |
| | duman gövde (900, 500) | `#6a5f78` |
| **P12 B `yanik`** | gök üst (540, 200) / gül kuşağı (540, 640) | `#8a86b0` / `#e3b8a4` |
| | yanık alın tahtası (400, 720) | `#2f2a2e` |
| | tank kurumu (300, 1100) / tank ışık (800, 1250) | `#3e3b5c` / `#9aa0ad` |
| | kırmızı bandı piksel | 0 (mühür kadrajda değilse) |
| **P01 p0 MASA** | kâğıt çekirdek (300, 700) / orta (900, 1500) | `#ebcfab` / `#e6d8b9` |
| | masa şeridi (540, 60) | `#8a6a54` |
| | cilt oluğu (540, 1840) | `#8d8196` |
| | mağara çekirdeği | `#2f2c45` |
| **P03 son** | kırmızı tarama | `#b3261e` (izinli) |
**Toplu ölçüt (tasarım §1.7):** sıcak piksel ≥ %14 (ÇÖL-ÜS hedef %22), p95 L\* ≥ 75, saf siyah/beyaz 0, imza bandı yalnız kapsül/köz/alev. Tahmin: P08 ≈ %35 (ufuk, toprak, cephe), P09 cs 2.5 ≈ %30 (ufuk dilimi + ışık zemin), P12 B ≈ %15–18 (gül kuşağı + duman güneş kenarı + mertek ışık yüzü + tank sağ ucu) — **sınırda; geçmezse gül kuşağı bandı 170 → 260 px**.

### 3.3 Dönem/şehir doğruluğu (kaynak gerekçesi)
- Yer ve gün [A Y]; tank altına tünek [A, TEK: Silverman s.122]; "saçak, tavan arası" tünek [A K1/K3]. Yanan yapılar ekranda adlandırılmaz.
- Yapı tipi, malzeme, ölçü, mertek aralığı, soba borusu, pencere, döşeme yüksekliği, tank biçimi/ölçüsü/semeri: **[Ç] doğrulanmalı** (HAER/1942 Ordu standart planları; araştırmacıya soru §5). Hepsi yazısız, nötr; hiçbiri dokunuş taşımaz (tank altı dokunuşu kaynaklı davranışa dayanır, biçime değil).
- Uzak sırt yönü ve varlığı **[Ç]**; görünmüyorsa yerine düz ufuk (atmosferik derinlik uzak sıra + pusla korunur).
- Güneş saati [T] (tasarım G10).

### 3.4 Motion için çizim notları
- **Türetilecek:** `src/doku/Isik.tsx` (`izdusum`, `Golge stil:"gravur"` — güneş az 288°/9°), `Tarama.tsx` (`Desen` sabit 72° — `taramaAcisi` ışıktan türetmez, tasarım kararı), `AhsapYuzey.tsx` (`ceviz` + palet ezme), `ArsivKatmani.tsx` (kâğıt/gren ortak üst katman), `KonturTitreme`, `Siluet`, `IsikKatmani.titresim` (alev titreşimi), Paris `dagronDunya.ts` `mp()` deseni (dünya→ekran), `MasaInsert.tsx` el/prop.
- **Yeni ortak modül önerisi:** `BindirmeKaplama` (yatay bindirme tahta, gölge çizgisi, şaşırtmalı ek), `MertekSacak` (açık mertek uçlu saçak + 0.54 m gölge bandı + izdüşüm gölgeleri; P03 çizim modu `stil:"murekkep"` aynı geometriden), `AyakliTank` (silindir + semer + ayak; `kurum` 0–1), `GokBasamak` (5 basamak + litografi geçişi; masa havuzu da aynı geçişi kullanır), `CalıTopak` (seed'li), `IkinciIsik` (alev kuralı §1.6), `BaskiSilme` (§2.7 katman silmesi), `CizimEsle` (çizim hattı ↔ dünya hattı listesi).
- Dünya modeli tek dosyada (`colUsDunya.ts`): §1.2 sayıları; görünümler yalnız kamera kaydı.
- `DOKU_SEED` ekle: `colUs: 211, cizim: 223, masaYB: 227` (215 çalı, 216 yanık, 217 alev titreşimi alt seed'leri).

## 4. Görünüm ayrıntıları
### 4.1 P01b `yangin-kenar`
`genis` + P10 son alev durumu; cs 1.05, cx +330. Sol yarı: B1 cephesi (ışık) + tank (alev ışığı üstte) + uzun gölgeler + toprak; sağ kenarda alev yarım. Sürü uzak noktalar ≤ 14 px sol üstte (yönetmen). Alt üçte bir: toprak + Ç0 çalısı (cx kaymasıyla kısmen).
### 4.2 P12 B `yanik` (anahtar hatlar, ekran px, cs 1.0)
- Alın tahtası üst (0, 695)→(1080, 756) · alt (0, 740)→(1080, 798) · duvar üstü (0, 897)→(1080, 942) · gölge bandı alt (0, 1026)→(1080, 1061).
- Mertek uçları (duvar→alın): (53,912)→(−47,737) · (201,918)→(140,747) · (346,924)→(322,757) · (488,929)→(500,766) · (627,935)→(673,775) · (763,941)→(841,784) · (896,946)→(1005,793) · (1026,951)→(1165,802).
- Tank üst hattı (eksen) (−281, 986)→(319, 1007)→(871, 1026); ön siluet (h 1.35) (−480, 1171)→(977, 1202); alt ≈ y 1485; sağ uç kapağı x 871–977. Tank altı ve zemin y 1485–1920 (alt bant dolu).
- Gök: güneş arkada → gül kuşağı: y 0–300 `#8a86b0`, 300–520 `#b99fb4`, 520–690 `#e3b8a4`; duman perdesi y 200–600, 2–3 ince sütun alın tahtasından yükselir, güneş kenarı `#e3b8a4`.
- Yanık bölge: d ekseninde −2.5…+2.5 m (tank üstü), düzensiz sınır seed 216; mertekler kömür, duvar üstü 0.6 m kurum bandı; pencere bu kadrajda yok. Amber, alev, kor **yok** (tasarım §2 "iz").

## 5. Yönetmene / orkestraya düzeltme notları (tek sahiplik: sahne-plani yönetmenindir)
1. **Işık:** `sahne-plani.md` §0 ve KE-6 `isik {yukselti 14, yon "sag-arka"}` → `{yukselti 9, az 288}`; "gölgeler sola-öne" → "ekranda sağa-öne"; P09 "sağdan alçak güneş" → "soldan, yarı karşı ışık". Gerekçe: tasarım §1.3 bağlayıcı, lamba ile aynı yarım küre.
2. **P08:** ufuk 1010 korunur; tank ekranda (622, 1041) ≈ 190×195 (260×200 yerine). p391 hedefi tank merkezi.
3. **P09:** 2B cs 1.35→2.5 yerine dolly k + cs (§1.2); KE-6'ya `kamera.dolly {k}` ekle. Hedef dekor (700, 1110).
4. **P10:** kıvılcımlar oyukta (§1.6); alev ışığı p102–110 görünmeden önce kadraja girer; son = `genis`.
5. **P01/P12 defter:** P01 p0 cs **2.4** (1.10 değil), p134 cs ≈ 2.7 spiral merkezine; P12 son cs 2.4, cx 0, cy 0. "Sayfa geri çevrilir" (p352–372, `kagit-cevir`) yerine **kamera alt sayfadan üst sayfaya kayar**; `kagit-cevir` foley'i düşer. P02 her iki sayfa: cs 1.0, merkez dekor ≈ (540, 1250) (cy −290; KE-1 cy sınırı ±400). P03 göğüs dekor (522, 1608); P12 A sonu (cs 1.9): dekor (540, 1646) ekran (540, 960)'a gelir → cy ≈ −1303. MASA KE-1 cx/cy sınırı **±1400** olmalı (ekran ofseti yüksek cs'de büyür).
6. **P12 B:** "tank altı kadrajı cs 2.0" yerine `yanik` görünümü cs 1.0→0.95; A→B geçişi ≈ 40 kare (§2.7), sabit tutma bundan sonra.
7. **Araştırmacıya (doğrulama, bekletmez):** 1942–43 Ordu geçici yapı standart planı (TO / 700-serisi): saçak çıkıntısı, mertek açıklığı, kaplama tipi; 1943 yardımcı sahada yakıt tankı tipi (yatay, semerli?); Commons yangın fotoğrafı (T2.4) içeriği. Bulgu çelişirse yalnız §1.1 satırı değişir, dünya modeli ölçüleri parametrik.
