# Evliya Uçuşları — Görsel Tasarım (kurulum ekibi, adım 5a)

Hazırlayan: tasarimci · 2026-11-08 · Girdi: `arastirma.md` §4–§5, `sahne-plani.md` §6, `dokunuslar.md`, `src/theme.ts`, `src/kit/KATALOG.md`, `src/kit/karakterler.ts`, `src/rig/Kukla.tsx`.
**v1.1 (2026-11-08):** kullanıcı kararları (imza = demet, sabah ENE, Lagâri bıyık / Hezarfen sakal, P06 kanat suda kalır) ve `arastirma.md` §10 (tasarım doğrulama eki) işlendi. Değişenler: çatı (§1.2, §8), demet malzemesi (§2.2, §2.4), sarık rengi + yeşil yasağı (§3.0, §3.5), Lagâri yüzü (§3.2), kanat sürekliliği (§3.2, §7), sikke 0.022 m ve kese (§4, §4.3), rahle + kalem/hokka (§1.4, §4.8), pencere kanadı (§4.10), efekt dönem notu (§5), sorular (§10).
**v1.2 (2026-11-08):** mekanlar.md notları karara bağlandı: ot `#a8a07a` → `#989c76` (imza tekilliği), mekân sorumlusunun 11 ek tonu onaylandı (§1.1, §1.2), pencere kanadı ölçüsü mekanlar.md §1.6 ile eşlendi (§4, §4.10).
**v1.3 (2026-11-08, K1 kalibrasyonu KALDI → tasarım maddeleri):** sarık rengi soğuk kırık beyaz + render ölçüm kuralı (§3.0, §2.4); sarık siluet tarifi (yeni §3.0b); ten muafiyeti yok, tüm ten tonları kaydırıldı (§3.0, §3.2, §3.3, §3.5, §3.6, §3.7); kostüm taraması yalnız terminatör bandında (§3.0); kompars yeniden tanımlandı (§3.6); kanat açık/katlı siluet yeniden (§4.2); ayak dayama 0.333 m (§2.2); meşale 1.28 m notu (§4, §4.7); rig ihtiyaçları R14–R17 (§7).
Bu belge **spesifikasyondur, kod değildir.** Hex/oran/px değerleri motion'a doğrudan uygulanacak önerilerdir; mimari ve doku `mekanlar.md`'nin (mekân sorumlusu) işidir.

Etiketler: **[A]** arastirma.md'de kaynaklı · **[S]** senaryo/sahne planı (dramatizasyon) · **[G]** genel bilgi, **doğrulanmalı** (araştırmacıya soruldu, bkz. §9) · **[T]** tasarım kararı (tarihî iddia değil).
Kural: [G] olan hiçbir ayrıntı tek başına dokunuş taşımaz ve okunur metin içermez; doğrulanmazsa nötr kalır.

---

## 0. Kimlik ve yön

### 0.1 Kanal kimliği (değişmez, `theme.ts`)
`paper #e9dfc9` · `paperDark #d6c7a6` · `ink #1c1915` · `inkSoft #4a4237` · `red #b3261e` · `gold #b8862b` · `night #14120f`. Fontlar: Playfair Display 900, Inter 500/800, IBM Plex Mono 500. **Yeni font yok.**

### 0.2 Yön: "gravür iskelet, minyatür nefesi" [T]
- **Canlı sahneler (P01–P12) = kanalın 1830 gravür/kukla tiyatrosu dili:** düz katmanlı paneller, ortak kontur, gölgede tek yön tarama, kâğıt tanesi. Bölüm ayrı bir "minyatür stili"ne geçmez; geçerse kanal kimliği kopar.
- **Minyatürden alınan yalnız üç şey:** (1) geniş, gradyansız düz renk alanları (gök, su, sur yüzü: en fazla 2 ton basamağı, yumuşak gradyan yok); (2) sınırlı, toprak-mineral palet (lapis gecesi, malakit-gri su, aşı boyası taş), doygunluk ≤ %45; (3) **yalnız kitap insert'inde (P13–P14)** mürekkep çizgi dili: kenar çizimleri tek kalınlıkta kalem çizgisi, tarama yok, tek renk (yalnız kıvılcım renkli).
- Kırmızı **görüntüde yok** (kaftan, sarık, kese, fişek, kitap rubriği dahil). Kırmızı yalnız yazı katmanındaki tek vurgu kelimesi. Minyatürlerin kırmızı kaftanları bilerek alınmadı.
- Altın yalnız Hezarfen'in sikkesi (P11) ve gündüz güneş kenar ışığı. Kostümde altın işleme, sırma, düğme yok (kanıtsız + sikkeyle yarışır).
- **Saf siyah/beyaz yok:** en koyu `#12141c`, en açık `#f6ecd0`. Yeni kodda `#000`/`#fff` yerine `ink`/`#f6ecd0` kullanılır (Kukla'daki mevcut `#000` gölge bindirmeleri α ile çalıştığı için dokunulmaz; yeni Osmanlı gövdesinde kullanılmaz).

### 0.3 Sistem notu: "imza nesnesi = Chappe kulesi" talimatı
Sanat yönetmeni kalıbındaki "bu bölüm: Chappe kulesi" Blanc'tan kalmış; bu bölümde Chappe yok (1630'lar İstanbul). İmza nesnesi aşağıda (§2) seçildi. Orkestra kalıbı güncellesin.

### 0.4 Kontur ve çizgi kalınlığı (her şablonda aynı)
| Öğe | Kalınlık | Renk |
|---|---|---|
| Karakter ve kanat | rig `SW = 2` yerel birim (ekranda ≈ 2–6 px; ölçek 1.0–2.7) | `ink(fill)` (dolgunun %55 koyusu) |
| Prop (demet, kese, sikke, takke, kanat kanadı, pencere kanadı) | ekranda **2.5 px** (geniş) – **4 px** (insert), ölçekle büyür ama 6 px'i geçmez | `ink(fill)` |
| Dekor | 3 px (uzak) – 6 px (yakın) | mekanlar.md |
| Kitap kenar çizimi | dekor **1.4 px** (cs 2.2'de 3 px, cs 4.6'da 6.4 px ≈ P01 dekor konturu) | `#4a4237` |
| Rota çizgisi | 6 px, kesik 22/16 | §6 |
`strokeLinejoin="round"`. 360 px telefonda 0.5 px altına inen çizgi (ekranda < 1.5 px) yok sayılır: o ölçekte çizilmez.

---

## 1. Bölüm paleti

### 1.1 GECE — Sarayburnu kıyı/köşk/insert (P01 A, P02–P07)
Işık sözleşmesi: **anahtar = meşale** (yardımcının elinde, sahne solu, alçak; amber), **dolgu = şenlik patlamaları** (üstten, soluk saman, kısa süreli), **uzak nokta = köşk penceresi** (sağ, amber, çevresine küçük havuz düşürür). P05 p56'dan sonra anahtar **püskürmenin kendisi** olur (aşağıdan, sıcak). Ay **yok** (kaynak yok; rig'in varsayılan `RIM #c4d6ff` mavi kenar ışığı bu bölümde **kullanılmaz**; kenar ışığı sahnenin `KuklaIsik` tanımından amber gelir).

| Ad | Hex | Not |
|---|---|---|
| gök tepe / orta / ufuk | `#12141c` / `#1c2232` / `#2c3246` | 3 düz basamak, lapis-mürekkep |
| şenlik dumanı bandı | `#3e3834` α .5 | ufkun 60 px üstü, P02 sonrası kalıcı |
| **v1.2 onaylı ek tonlar (mekanlar.md §8)** | ağaç `#181c26` / `#1e2230` · sur `#2e2e34` · Asya kıyısı `#232838` | gece; imza/kırmızıdan uzak |
| deniz taban / dalga çizgisi | `#161c26` / `#2c3444` | yatay kısa çizgiler, 3 px |
| deniz yansıması (meşale / şenlik) | `#e0a050` / `#e8d6a6` | kesik yatay şeritler, ışık kaynağının altında dikey kolon |
| meşale çekirdek / alev / alev kenarı | `#ffd890` / `#f0a040` / `#b8622c` | kenar kahve-turuncu; kırmızıya kaymaz |
| meşale ışık havuzu | `#f0a848` α .35 → 0 | yarıçap ekranda 380 px (cs 1.0), zemine elips |
| köşk penceresi (içten) | `#f2c070` | pencere altına `#f2c070` α .2 havuz |
| köşk taşı gölge / ışıklı | `#4e4a46` / `#8a7458` | doku mekanlar.md |
| rıhtım taşı / derz / meşale ışığında | `#45444a` / `#2a2a30` / `#7e6a52` | |
| rıhtım ıslak (P07) | `#3a3e48` + parlama `#a9bccb` α .4 | ayak izi §4.12 |
| karakter kenar ışığı (gece) | `#f0b060` α .55 | meşale yanı; püskürmeden sonra alttan |

### 1.2 GÜNDÜZ — Galata, Boğaz, Sarayburnu gün (P01 B, P08–P11)
**Güneş [T, fiziksel türetme; kullanıcı kararı 2026-11-08: ONAYLI]:** kaynak saat vermez [A §5.5]. Hezarfen'in "kontra" okunması ve P12'de pencereden giren ışık için **sabah erken, güneş doğu-kuzeydoğuda alçak (azimut ≈ 65°, yükseklik ≈ 15°)** seçildi. Gerekçe: P09 kamerası kuzeye bakar (Galata solda, Üsküdar sağda); güney güneşi bu kadrajda kontra veremez (kamera arkasında kalır). Doğu-kuzeydoğu güneşi: Hezarfen sağa (doğuya) uçarken önünde/sağında kalır → yan-kontra siluet; P08'de Üsküdar'a bakan yüzü güneşe dönüktür (kamera arkasından = kontra); P12'de Boğaz'a bakan köşk penceresinden ışık girer. Bütün gündüz planlarının gölge yönü bu tek tanımdan türetilir (batı-güneybatıya, yani ekranda sola ve hafif kameraya doğru). Lodos [A] = ılık, nemli, puslu hava → gök pus tonlu.

| Ad | Hex | Not |
|---|---|---|
| gök tepe / orta / ufuk (lodos pusu) | `#a9b6bf` / `#cfcfc4` / `#e6dcc0` | sağ ufukta güneş parlaması `#f6e8c0` α .4, disk çizilmez |
| Boğaz suyu taban / orta / güneş yolu | `#5e7378` / `#7c9090` / `#e4dcc4` | güneş yolu kadraj sağında |
| Galata taş / gölge / tarama | `#9a8f7e` / `#6b6357` / `#4e473f` | |
| Galata külahı kurşun / ışıklı | `#7c8288` / `#a3a8aa` | biçim nötr [A §5.1] |
| Galata/Üsküdar konut çatıları | `#6e5240` (tek ton), gölge yüzü `#4e3a2e` | **koyu toprak çatı, tek ton**; malzeme iddiası yok (kiremit doğrulanamadı [A §10.9]): kiremit sırası/deseni çizilmez, kırmızıya kaymaz; eğim alçak-orta, **dik/mansard çatı yok** (İstanbul'da dik çatı 19. yy. sonrası [A §10.9]). Kurşun yalnız Galata külahında ve cami kubbelerinde |
| uzak Üsküdar siluet | `#9aa2a4` | atmosfer, tek ton |
| Doğancılar meydanı ot / toprak | **`#989c76`** (v1.2; eski `#a8a07a` imzaya ΔE76 12.4 idi) / `#8a7a5c` | ağaç/çadır/bina yok [A §5.3] |
| **v1.2 onaylı ek tonlar (mekanlar.md §8)** | ağaç gün `#7e8478` · konut duvarı `#8a7660` / gölge `#5e5040` · sur gün `#8e8472` / `#6a6252` · uzak şehir hava perspektifi `#a49c90` · Galata koyu taş sırası `#5e574c` · Boğaz su orta `#6c8284` | hepsi imzaya ΔE76 ≥ 20, kırmızı değil (§2.4) |
| Sarayburnu köşk gün / gölge | `#b4a88e` / `#7e7462` | |
| rıhtım gün | `#a09682` | |
| karakter kenar ışığı (gün) | `#f0d79a` α .6 | güneş yanı |
| kontra siluet dolgu | `#3a3634` | P01 B, P09 Hezarfen |

### 1.3 İÇ — köşk içi gündüz (P12)
| Ad | Hex | Not |
|---|---|---|
| oda gölge / duvar ışıklı | `#3a3430` / `#cbbfa4` | duvar sade kireç sıva; kalem işi, çini, kafes, arma yok (kanıtsız) |
| pencere kanadı ahşap ışıklı / gölge | `#6a4a30` / `#3a2a1e` | §4.10 |
| ışık şeridi (pencere aralığından) | `#f6e4b0` α .55 | kenarları NET, toz zerresi 6–8 adet `#f6e4b0` α .6 |
| dış (pencere açıklığından görünen) | gündüz paleti, %30 aşırı pozlanmış `#ece2c4` | |
| minder/halı kenarı | `#5a4a3e` | desen yok; v1.2: P12 kamerasında zemin kadraja girmez (mekanlar.md §1.6), kullanılmayabilir |

### 1.4 KİTAP INSERT (P13–P14)
| Ad | Hex | Not |
|---|---|---|
| yüzey (rahle, ahşap) / gölge | `#4a3222` / `#2e2016` | **rahle** yüzeyi [A §10.7]; rahle ayağı/X kasnağı, minder, oturan kişi çizilmez (§4.8) |
| sayfa / sayfa kenarı-kıvrım | `#e9dfc9` / `#d6c7a6` | **kanal kâğıdının kendisi** = Seyahatname sayfası (kimlik bağı) |
| hat çizgisi | `#2a2420` | dil-nötr §4.8 |
| kenar çizimi | `#4a4237` | tek kalınlık, tarama yok |
| kıvılcım (P14) | §2.3 renkleri | sayfadaki TEK renkli öğe |
| defter kapakları (3) | `#3e2e24` / `#4a4038` / `#34302c` | sade deri, süs yok |
| hokka / kamış kalem | `#5a5048` / `#a08a5c` | §4.8; divit yok |
| ışık | üst-sol tek kaynak, gölge sağ-aşağı | |

### 1.5 Renk ölçüm tablosu hedefleri (FilmLook/arşiv derecelendirmesi sonrası)
Derecelendirme gece ile gündüzü aynılaştırmaz. Eleştirmen kontrol karesinde ölçer (±8 L\*):
| Bölge | Hedef | Plan |
|---|---|---|
| gece gök orta | `#1c2232` | P02, P05 |
| gece deniz | `#161c26` | P06 |
| gündüz gök orta | `#cfcfc4` | P09 |
| Boğaz suyu | `#7c9090` | P09 |
| Galata taşı | `#9a8f7e` | P08 |
| köşk gündüz | `#b4a88e` | P10 |
| sayfa | `#e9dfc9` | P13 |
| Doğancılar otu | `#989c76` | P09 |
| demet tüp yüzü (imza) | `#c4a874` (gece meşale altında L\* 55–72) | P03, P05 |

---

## 2. İmza nesnesi: FİŞEK DEMETİ

### 2.1 Seçim ve gerekçe [T] — **kullanıcı kararı 2026-11-08: ONAYLI** (5 görünür tüp)
**Fişek demeti** (kanat değil). Gerekçeler:
1. **Kanat tekil olamaz:** P09'da martı kanadı aynı kadrajda (EV-D4). Kanadı imza yaparsak martı imzanın biçimini tekrarlar; ayrıca kanat "tek siluet, ayrıntısız" kalmak zorunda (yapı kaynakta yok), imza nesnesi ise ayırt edici biçim/renk ister.
2. **Döngüyü demet taşır:** kanca ilk karesi (P01 kıvılcım fitilde) ve kapanış (P14 kenar çizimindeki fitil) aynı demettir. Tekrar eden motif = **fitil kıvılcımı** (P01, P05, P14).
3. Demet bölümün "nasıl"ıdır (EV-D1 başlığı uçuran güç, EV-D2 bırakılan boş demet).
Hezarfen yarısında demet yok; bu bilinçli: P14 kenar çizimi iki hikâyeyi aynı sayfada (demet + kanatlı adam) toplar.

### 2.2 Demet tanımı (biçim nötr: kaynak yapıyı anlatmaz [A Çelişki 6])
- **Ölçü (gerçek):** tüp gövdesi 1.00 m yükseklik × 0.36 m genişlik (≈ 70 L; 50 okka ≈ 64 kg barut macununa [A] makul hacim, model iddiası değil [T]); oturak tahtası 0.42 × 0.05 m; ayak dayama çubuğu oturağın **0.333 m** altında (v1.3: motion'ın rig açılarıyla tutarlı ölçüsü, K1'de eleştirmen kabul etti; ölçü iddiası değil [T]), iki yana 0.18 m taşar; taban kızağı (yerde duran ahşap çerçeve) 0.50 × 0.08 m.
- **Tüpler:** görünen **5 silindir** (önde 3, arkada aralardan 2), her biri ≈ 0.11 m çap. **7 tüp çizilmez, sayılabilir 7 öğe yok** ("yedi kollu"nun ne olduğu belirsiz [A]; 7 görünen öğe yorum iddiası olur). Tüplerin üstü oturak altında kaybolur, altları **açık ağızlı** (koyu halka).
- **Malzeme görünümü (KARAR, v1.1):** **düz mat silindir**, sargı çizgisi yok, malzeme iddiası yok (Osmanlı fişek kılıfı doğrulanamadı [A §10.5]; renk adı "ham kum", "kâğıt" diye anılmaz). Demeti **3 sicim bağı** sarar (alt, orta, üst; her biri 3 tur, 2 px çizgi) [T]. Metal çember, perçin, süs, yazı yok.
- **Renk (TEKİL):** tüp yüzü "ham kum" `#c4a874` · gölge yanı `#8e7650` · sicim `#3a2e22` · ağız halkası (is) `#2a2420` · oturak/ayak dayama/kızak ahşap `#6a4a30` (gölge `#3a2a1e`) · fitil `#6a5a40`, yanmış kısmı `#2a2420`.
- **Fitil:** demetin alt ağızlarından çıkar, rıhtım üstünde sola, yardımcıya doğru gevşek S eğrisiyle uzanır (x 330–520, zemin y 1330); 3 px (ekran, cs 1.0), zemine temas gölgeli.
- **Durumlar:** `puskurme` (alt ağızlardan), `titreme` (±3 px, 30 Hz değil 12 Hz, P05 p56–112), `sonuk` (ağızlar is rengi, duman ince), `bos` (P06: tüp yüzü %15 koyu `#a8905e`, ağızlardan ince duman), düşüşte `aci` yolu.
- **Ekran ölçüsü / okunurluk:** P05–P06 geniş planda demet ≈ 220–400 px (≥ %11), 360 px telefonda 73–133 px: silindir demeti + oturak okunur. P04 göğüs planında tüpler ekranın alt %20'si (y 1300–1500); silindir hacmi yalnız ışık/gölge yanı ve sicim bağlarıyla okunur.

### 2.3 Tekrar eden motif: fitil kıvılcımı
- Biçim: **4 köşeli yıldız** (uzun kollar dikey/yatay, 45°'de kısa kollar) + 6–10 kıvılcım parçacığı (2–4 px, 8–20 karede söner) + yumuşak hale.
- Renk: çekirdek `#fff0c4` · yıldız `#ffd27a` · hale `#ffc860` α .45 · parçacık `#f0a040`.
- Ölçü: çekirdek yıldız **48 px**, hale çapı **140 px** (P01 p0; telefonda 16/47 px). Fitil üzerinde 2 px/kare yürür, arkasında fitil `#2a2420`'ye döner.
- **P14 son kare = P01 p0:** kıvılcım ekran noktası, yıldız boyu ve fitilin ekran açısı birebir aynı. Motion P01 p0 kamerasından kıvılcım ekran noktasını hesaplar; P14 kenar çiziminin sayfadaki yeri ve cs 4.6 bundan geriye türetilir (sahne-plani: binici+demet x≈390–640, y≈640–1330).

### 2.4 Tekillik yasakları (eleştirmen ve betik kontrolü)
| Yasak | Neden |
|---|---|
| `#c4a874` ±ΔE76 15 aralığında başka nesne/kostüm yok (sarık, entari, kese, takke, kanat, taş, sikke dahil) | imza rengi |
| Demet biçiminde başka silindir kümesi yok. **Köşkün 4 bacası** taş renginde, taş örgülü, başlıklı; kum tonlu düz silindir okunmaz (mekanlar.md'ye not) | biçim tekrarı |
| Meşale sapı tek koyu sopa `#4a3424`, sargılı başı katran-is rengi `#2e2620`; kum tonlu tüp görünmez | biçim tekrarı |
| 4 köşeli yıldız biçimi yalnız fitil kıvılcımında. Şenlik fişeği **yıldız değil, düşen çizgi** (§5) | motif tekrarı |
| Rulo kâğıt, tomar, borulu nesne P13 masasında yok | P14 çizimiyle karışır |
Ölçülen ayrışmalar (elle, D65; motion `kontrol` betiğiyle doğrular): demet `#c4a874` (L≈70 a≈3 b≈29) ↔ altın sikke `#c9a24a` ΔE76 ≈ 23 · ↔ Lagâri sarığı `#dcdcd2` ≈ 27 (v1.3; eski `#d9cfb6` palette 20 ama **render'da 12.0** idi) · ↔ Lagâri teni `#c08468` ≈ 20 · ↔ kese `#625646` ≈ 33 · ↔ takke `#5b4a3a` ≈ 40 · ↔ kanat `#6e6a64` ≈ 34. Hedef: her ışıkta ΔE2000 ≥ 12.
**v1.2 palet geneli kontrolü (mekanlar.md §5 ölçümü, sRGB→Lab D65):** tüm yüzeyler imzaya **ΔE76 ≥ 15** olmalı. Ot `#a8a07a` (12.4) **değiştirildi → `#989c76`** (17.2). Sınırda: köşk gün `#b4a88e` 15.9 — kabul (P10/P11/P12'de demet yok, demetin geçtiği gece planlarında köşk `#4e4a46`/`#8a7458`); eleştirmen yine ölçer. Ek tonlar: konut duvarı 24.8, sur 24.5, uzak şehir 24.0, toprak 21.8.
**v1.3 ölçüm kuralı (K1 dersi):** tekillik **render'dan** ölçülür, paletten değil (amber/güneş açık krem ve ten tonlarını imza bandına çeker). `renk_olcum.py` kostüm parçası başına (sarık, ten-yüz, ten-el, entari, kuşak) ΔE76 raporlar; eşik **≥ 15, ten dahil, muafiyet yok**. Demet bölgesi dışında imza bandındaki piksel sayısı demet içindekinin %25'ini geçemez.

---

## 3. Karakterler

### 3.0 Ortak kostüm kuralı (17. yy. İstanbul, genel) [A §5.4]
Erkek giyimi: don, çakşır/şalvar, gömlek, entari, kaftan, başlık; elit ile halkı ayıran **kumaş kalitesi ve başlık biçimi** [A]. Buna göre:
- **Ana kadro (Lagâri, Hezarfen):** ayak bileğine inen **entari** + üstte **önü açık kaftan** (entari önde 40–60 px şerit olarak görünür) + bel **kuşağı** + başta **sarık** (yuvarlak sargı) [A genel; sarığın biçimi/rengi kişiye özel kanıtsız → nötr]. Ayakta koyu kahve mest/çizme `#2e241c`.
- **Kompars (yardımcılar):** **diz boyu** entari/cepken + bol şalvar + **takke** (sargısız keçe başlık). Ana kadrodan biçimle ayrışır (uzunluk + başlık). Batılı kalıp yasak (v1.3, K1 O2): klapa/devrik yaka, kemer bandı + toka, dar düz pantolon, düğme sırası yok — §3.6.
- **Kanıtsız, çizilmeyecekler:** sorguç, mücevher, sırma, arma, kürk yaka (padişah dahil), renkli kemer tokası, rütbe işareti, yeniçeri börkü, okunur yazı.
- **Sakal/bıyık (kullanıcı kararı 2026-11-08):** Hezarfen sakallı, Lagâri bıyıklı — yalnız ayrışma aracı [T], yaş/statü iddiası taşımaz (yaşa bağlı sakal kalıbı doğrulanamadı [A §10.4b]). Risk önlemi: sakalsız yüz dönemde "sakalsız genç" ya da "yeniçeri" okunabilir; Lagâri ise sipahilik alan yetişkindir [A] → bıyığı belirgin, çenesi olgun (§3.2).
- **Sarık rengi:** beyaz sarık Müslüman erkeğin temel işareti [A §10.4a, tek kaynak] → ana kadro sarıkları beyazın doğal tonu, saf beyaz değil. **v1.3 (K1 K5):** krem/bej tonlar amber ışıkta imza bandına kaydı (render `#bbac8b`, ΔE 12.0) → sarıklar **soğuk kırık beyaz** (b\* ≤ 5): Lagâri `#dcdcd2`, Hezarfen `#cfd0c8`, padişah `#d6d3c6`. Hedef **render'da, arşiv katmanı sonrası, amber ışık altında imzaya ΔE76 ≥ 15** (motion `renk_olcum.py` kostüm parçası başına ölçer). Tutmazsa b\* daha da düşürülür (yedek `#d8dad6`), krem/sarıya geri dönülmez. **Yeşil sarık hiçbir figürde yok — padişah dahil** (dönemde seyyid/emir ayrıcalığı [A §10.4a]; yanlış okunur). Renkli sarık da yok.
- **Ten (v1.3, K1 ten ↔ imza ΔE 10.8): MUAFİYET YOK.** Gerekçe: Lagâri'nin yüzü ve elleri demetin hemen üstünde/üzerinde; sarık + ten + demet aynı ton bandında birleşince imza tekilliği kaybolur. Kural: her ten tonu imzadan **a\* ile ayrışır** (kızıl-pembe yön, a\* ≥ 15), **render'da ΔE76 ≥ 15**; kaydırma sarıya/açığa değil pembeye/koyuya yapılır. Esmerlik sırası (açıktan koyuya): veren el → Lagâri → Hezarfen → yardımcılar ≈ muhafız. Değerler §3.2, §3.3, §3.5, §3.6, §3.7.
- **Kostüm taraması (v1.3, K1 O3) — bütün karakterler aynı dil:** kumaş **düz 2 ton** (ışık yanı + gölge yanı, net sınır). Tarama yalnız (a) gölge sınırındaki **terminatör bandında** (en çok 14 rig birimi geniş, 3–5 kısa çizgi, açı sahnenin tek θ'sı) ve (b) derin kıvrım gölgesinde (kuşak altı, kol iç dirseği; en çok 3 çizgi). Giysinin tamamına yayılan çizgi **yasak** (çizgili kumaş deseni okunur). Rig'in `Bolge` tarama katmanı kostümde bu banda kırpılır.

### 3.0b Sarık siluet tarifi (v1.3, K1 O8: "bere" okunuyordu)
Kaynak düzeyi: beyaz sarığın bir başlık (kavuk/takke) üstüne sarıldığı [A §10.4a "beyaz sarık sarılmış kavuk"]; kişiye özel biçim kanıtsız → aşağıdaki biçim [T].
- **Yapı:** sarık başın üstüne konan bir şapka değil, **başı saran** kumaş halkasıdır. İçteki başlığın (kavuk/takke) yalnız **tepesi** sargının ortasından görünür.
- **Oturuş:** alt kenar **alına iner** (kaşın 14–18 rig birimi üstü), **kulağın üst yarısını örter**, arkada enseye doğru 10 birim daha aşağı iner (önden arkaya eğik oturur, ~8°). Altından saç görünmez (yalnız favori ve ense, `sac: "sarikalti"`). Alt kenar kafa konturuna oturur, düz kesik çizgi değil.
- **Oran:** genişlik = baş genişliği × **1.40** (Lagâri), ×1.30 (Hezarfen), ×1.70 (padişah). Sargı kütlesinin yüksekliği / genişliği: Lagâri **0.50**, Hezarfen **0.42** (basık), padişah 0.62. Biçim yarım küre değil, **basık yastık/soğan**: en geniş yer alt üçte birde, üst hafif yassı.
- **Sargı katmanları:** 4–5 katman, her biri **küre yüzeyini izleyen eğri** (düz yatay çizgi yok). Katmanlar **çapraz sarılır**: ön yüzde sol-alttan sağ-üste ~20° eğik (Lagâri), Hezarfen'de ters yön (sağ-alttan sol-üste). Katman uçları birbirine **kaydırılmış** (tuğla örgüsü gibi; aynı noktada başlayıp biten çizgi yok). Her katman sınırı = ışık yanı ince açık çizgi + gölge yanı koyu çizgi (çift ton, tarama değil).
- **360 px'te okunacak 2 imza ayrıntı:**
  1. **Tümsekli dış kontur:** sargı katmanlarının kabarıklığı siluete taşar: üst kontur 3–4 yumuşak tümsek (genlik 4–6 rig birimi), pürüzsüz kubbe değil. (Bere = pürüzsüz; sarık = katmanlı.)
  2. **Tepede içteki başlığın görünen ucu:** sargının ortasından çıkan alçak koyu kubbe, genişlik sarığın %30'u, yükseklik 10–12 birim, renk koyu keçe `#4a3e34` (kırmızı/yeşil değil). [G — içteki başlığın tepesinin görünürlüğü kişiye göre değişir; doğrulanmazsa da kalabilir: biçim nötr, renk nötr.] Padişahta bu uç daha yüksek değil, aynı oranda (sorguç izlenimi vermesin).
- **Yasak benzerlikler (360 px testi):** bere/örgü şapka (pürüzsüz yarım küre + düz alt kenar), aşçı şapkası (dik silindir), Sih türbanı (sivri ön düğüm), fes (silindir + püskül).

### 3.1 Oranlar (rig birimi; Kukla ayakta ≈ 620 birim şapkalı)
| Karakter | Boy (sarıksız) | Sarık/takke ek | Toplam | `scale` | Not |
|---|---|---|---|---|---|
| Lagâri | 560 | +70 (sarık) | 630 | 1.00 | gövde `zayif` 0.4 (ince yapı [T]; "sıska" iddiası anlatıda yok, görüntüde vurgu yapılmaz) |
| Hezarfen | 560 | +62 (sıkı sarık) | 622 ×1.04 | 1.04 | omuz 1.06× |
| Padişah | 560 | +110 (büyük sarık) | 670 | 1.00 | yalnız siluet (§3.4) |
| Yardımcı 1 / 2 | 545 | +38 (takke) | 583 | 0.98 / **0.90** (v1.3) | yüzsüz, sırtı/arka 3/4 kameraya (§3.6) |
Gerçek boy eşleşmesi: yetişkin 1.65 m sarıksız. Kıyı şablonunda (P05) yardımcı 670 px ⇒ **≈ 406 px/m** (z yakın); demet 1.0 m ≈ 406 px; ufuk y 720 = baş hizası (ufuk–ölçek kuralı).

### 3.2 LAGÂRİ (KE-K1) — P01 A, P03–P07
| Öğe | Değer |
|---|---|
| Kaftan / gölge / ışık | çivit `#34405e` / `#222a40` / `#4c5a7c` |
| Entari | soluk çivit-gri `#7c8494` |
| Kuşak | koyu kahve `#4a3426`, 34 birim yüksek, 2 sargı çizgisi |
| Şalvar (yalnız bilekte) + mest | `#3e3a38` + `#2e241c` |
| Sarık (v1.3) | soğuk kırık beyaz `#dcdcd2`, gölge `#a8aaa2`, katman çizgisi `#8e9088`; biçim §3.0b (×1.40, y/g 0.50, sol-alt→sağ-üst sargı), sargı ucu yok (P06 ıslakta ucu çözülür) |
| Ten / ten gölge (v1.3) | `#c08468` / `#8e5a46` (imzaya ΔE76 ≈ 20 palet; render ≥ 15 hedef; eski `#d9a77f` render'da 8.6) |
| Saç (yalnız ense + favori) / bıyık | `#3a2416` |
| Yüz (YUZLER `lagari`) | `genislik 0.94, uzunluk 1.08, burunTip "duz", kasAci −3 (açık, hafif meraklı), sac "sarikalti", zayif 0.4, yasCizgi 0.25` · `biyik "duz"` **belirgin: bıyık %20 kalın/geniş, uçları ağız köşesinin 4 birim dışına taşar**, `sakal false`, `sideburn 0.8`, `browHeavy 1.1`, `burun 1.05` |
| Olgun çene (v1.1) | çene konturu köşeli (yuvarlak bebek çenesi değil), çene altında 1 gölge çizgisi `#8e5a46`, yanak çukuru `zayif 0.4` ile; amaç "genç/yeniçeri" okunmaması [A §10.4b risk notu]. Yaş iddiası yok |
| Kanat (sırtta) | §4.2, `acik 0` P01 A–P05, açılır P06 |
| Yakın plan (P04, yüz %11–12, cs 2.5–2.7) | `yakin: true` zorunlu: göz kapağı, dolgulu kaş, alt dudak hacmi; ağız `A/O/dinlen` visem (`konus`), kaş `browF` +0.3 replik başında (kararlı neşe) |
**Oturan poz (KE-K6, P01 A–P05):** oturak tahtasında, **ayaklar ayak dayama çubuğunda** (ayak sallanmaz: "ayak her karede zemine basar" bu pozda dayamaya basar). `thighF/B −84`, `kneeF/B 78`, `bodyY +110`, `lean +4`. Eller: `tutun` = ön el yan tüpün sicim bağını kavrar (parmaklar sicimin önünde), arka el oturak kenarında. Etek: kaftan + entari diz üstünden **yumuşak** sarkar, alt kenar baldır ortasına iner, oturak kenarından 20–30 birim aşağı dalgalı düşer (katı kalıp değil). Kanat sırtta katlı, oturağın arkasından yukarı taşar.
**Islak hâl (P06 p232+, P07) — `islak: 0→1` (12 karede):**
- Kumaş %25 koyu, doygunluk +%10: kaftan `#232c42`, entari `#59606e`, sarık `#a8aaa4` (soğuk kalır; yarı saydam değil, koyulaşmış).
- Siluet daralır: etek genişliği ×0.88, kumaş bacağa yapışır (etek alt kenarı düz değil, bacak konturunu izler); kollar sarkık, yen ağızları aşağı çekilmiş.
- Sarık: sargı ucu çözülmüş, sol omza 60 birim sarkar; sarık %10 basık.
- Parlama: omuz ve sarık üstünde `#a9bccb` α .45 ince kenar çizgisi (ışık yanı).
- Damlalar: yen ucu, etek ucu, sarık ucundan 3 kaynak; her 10–14 karede bir damla (teardrop 6×9 px ekran, `#a9bccb` + `#e6eef0` α .7 nokta), zemine inince 1 karelik halka. P07 rıhtımda ıslak ayak izi (§4.11).
- **Kanat SUDA KALIR (kullanıcı kararı 2026-11-08):** P06 inişte (su-sap p215) açık kanat suya yatar; Lagâri kanadın altından/arasından sıyrılıp yüzmeye başlar (p222+), kanat **suda yüzer hâlde, ekranda görünür** kalır (yarı batık düz siluet, `#2a2828` + amber kenar, su çizgisi üstünde %40'ı görünür, dalgayla ±4 px salınır, kadrajdan fade ile çıkmaz; plan sonuna dek yerinde). P07'de Lagâri **kanatsız** (sırtta kanat yok, kayış/bağlantı izi de yok). Kanat ayrık prop olur: `kanat` (`suda: true`).

### 3.3 HEZARFEN (KE-K2) — P01 B, P08, P09, P11
| Öğe | Değer |
|---|---|
| Kaftan / gölge / ışık | zeytin `#55603f` / `#3a4228` / `#6e7a54` |
| Entari | soluk deve tüyü `#7a6a50` |
| Kuşak | `#3e3a30` |
| Şalvar + mest | `#3e3a38` + `#2e241c` |
| Sarık (v1.3) | soğuk açık gri `#cfd0c8`, gölge `#9a9c94`; §3.0b: Lagâri'ninkinden **basık ve dar** (×1.30, y/g 0.42), sargı yönü **ters** (sağ-alt→sol-üst) |
| Ten / gölge (v1.3) | `#a87256` / `#7a4c36` (Lagâri'den esmer; imzaya ΔE76 ≈ 23) |
| Saç / sakal | `#2a2018`; kısa dolgun sakal (`sakal: true`), `biyik "duz"` |
| Yüz (YUZLER `hezarfen`) | `genislik 0.98, uzunluk 1.12, burunTip "sivri", kasAci 5 (kararlı), sac "sarikalti", yasCizgi 0.3` · `browHeavy 1.3`, `burun 1.05` |
| Kanat | §4.2; P01 B/P08 sırtta `acik 0`, P09 açık |
| Gündüz kontra | P01 B ve P09: düz siluet `#3a3634`, güneş yanında `#f0d79a` kenar (2 px). P08 göğüs: yüz yarı gölgede, okunur ama küçük jest yok (bakış = baş çevirme, sahne-plani) |

### 3.4 360 px'te Lagâri ↔ Hezarfen ayrışması (tek kişi sanılmasın)
Aynı karede hiç durmazlar; ama izleyici "aynı adam mı?" dememeli.
| Ayırıcı | Lagâri | Hezarfen | 360 px'te |
|---|---|---|---|
| Kaftan rengi | çivit (soğuk, koyu) | zeytin (sıcak-yeşil) | ana ayırıcı; gece/gündüz farkı bunu güçlendirir |
| Sakal | yok (bıyık) | kısa sakal | yüz siluetinin alt kontur farkı |
| Sarık | dolgun yastık (y/g 0.50), kırık beyaz, sol-alt→sağ-üst sargı | basık (y/g 0.42), açık gri, ters sargı | baş silueti oranı |
| Ten | orta, pembe-kızıl | daha esmer | |
| Yapı | ince | omuz 1.06×, boy 1.04× | |
| Duruş | oturan / kollar açık | ayakta, dik, eller kuşakta | |
Eleştirmen testi: P04 göğüs karesi ile P08 göğüs karesi 360 px'te yan yana; iki kişi olarak okunmalı.

### 3.5 PADİŞAH (KE-K3) — P02, P10, P12 · yalnız siluet, yüz yok
Portre referansı yok (Murad IV portreleri 19. yy. [A §5.4]). Kukla değil, **ayrı siluet bileşeni** (`PadisahSiluet`):
- **Biçim:** büyük yuvarlak sarık (baş genişliğinin 1.7×, yükseklik 1.1× baş; Lagâri sarığının 1.35×'i), sorguç/mücevher **yok**; sarık tonu (görünürse) kırık beyaz `#d6d3c6`, **yeşil asla** (§3.0), biçim §3.0b (×1.70, y/g 0.62); geniş omuzlu kaftan siluet (omuz 1.15×), kollar gövdede. Sarık sargı çizgisi yalnız P12 yakınında 2 adet, ton farkıyla.
- **Renk:** siluet gece `#1e1c22` (ışıklı pencerenin önünde, P02) · gündüz `#2a2622` (P10) · kenar ışığı gece `#f2c070` (içteki ışık arkadan), gündüz `#f0d79a` (güneş).
- **`bas_aci` 0 → 1 (P10):** 0 = önden (baş + sarık simetrik elips), 1 = sağa profil (alın–burun–dudak çıkıntısı belirir, sarık arkaya doğru asimetrik). Ara değerler morf; omuz sabit. Okunurluk: P10 cs 1.6'da siluet ≥ 240 px (%12).
- **P12 profil (göğüs, cs 1.8–2.6):** profil konturu alın → burun → dudak → çene; **göz, kaş, ağız çizilmez.** Çene kaftan yakasının gölgesinde kaybolur (sakal sorusu açılmaz [G]). Yüzün gölge yanı `#2a2420`; ışık şeridi göz hizasında konturda `#dca08a` (ten, ışıklı; v1.3, imzaya ΔE ≈ 17) bant olarak parlar, bant genişliği = pencere aralığından türeyen şerit genişliği. Kaftan `#36302c`, yakada tek ton farkı, süs yok. Eli (kapıyı gösterir, P12 p130–170): çıplak el `#b88470` (v1.3), yen geniş, yen rengi kaftanla aynı.
- Kim plakası (P12 replik): yazı katmanında, siluetin üstünde, yüz alanını örtmez.

### 3.6 YARDIMCILAR (KE-K4) — P01 A, P02, P03, P05, P06 · yüzsüz kompars
**v1.3 (K1 O2, O3, O4): kostüm, yön ve ayrışma yeniden tanımlandı.**
- **Kostüm (`kostum: "osmanli-kisa"`) — çizim kuralı:**
  - **Entari/cepken diz altına (diz kapağının 30 birim altı) iner; YAKASIZ**, önü **çapraz kavuşur** (sağ panel sol panelin üstüne, boyundan kuşağa giden tek eğik kenar çizgisi; V yaka değil, klapa/devrik yaka yok). Düğme sırası yok.
  - **Kuşak = sarılı kumaş:** 2–3 tur, tur çizgileri hafif eğri, bir yanda kısa sarkan uç (40–60 birim); **kemer bandı, toka yok**.
  - **Şalvar bol:** diz altında entari eteğinden çıkan bacak, baldır genişliği rig bacağının **1.6×**'i, kumaş 2–3 dikey kıvrım; **paçada büzgü** (bileğe toplanan 3–4 kısa kıvrım çizgisi), dar düz pantolon değil.
  - Ayakta düz mest/yemeni `#2e241c`, topuksuz.
  - Kollar: dar yen, bilekte kısa kıvrım; manşet/ceket kolu dikişi yok.
  - Kumaş taraması §3.0 kuralı (düz 2 ton + terminatör bandı).
- **Yön (yüzsüz yumurta yüz sorununun çözümü):** yardımcılar **sırtı ya da arka 3/4'ü kameraya dönük** durur, **olaya (demete, Lagâri'ye, denize) bakar**. Kameradan yüz yüzeyi görünmez: baş arkadan görünür (ense + takke/saç arka kütlesi + kulak kenarı); yanakta en çok 6–8 birimlik ten kenarı (ışık yanı). Göz/ağız/kaş zaten yok. P05 sıçramada bile baş kameraya dönmez; kol yüze kalkar (O10), gövde arkaya `lean −12`.
- **İki yardımcı ayrışır (ikiz/çift görüntü yasak):**
| | Y1 (meşaleci, P05 takkesi uçan) | Y2 |
|---|---|---|
| Ölçek / derinlik | 1.0, önde | **0.90**, geride (z daha uzak, ufuk–ölçeğe göre ayak y'si yukarıda) |
| Aralık | — | Y1'den **≥ 1 gövde genişliği** (ekranda ≥ 110 px) yanda; üst üste binmez |
| Duruş | ayakta, ağırlık arka bacakta, meşale ön elde vücuttan uzak, alçak (alev ekran x ≤ 330, y ≥ 900 — K2) | **çömelmiş ya da bir dizi yerde** (fitil hattının başında, fitili hazırlayan) ya da elleri kuşakta öne eğik; Y1'den farklı siluet şart |
| Entari | `#6a5a48` (toprak kahve) | **`#4e5658`** (soğuk koyu gri; v1.3, eski `#5a5448` Y1'e çok yakındı) |
| Şalvar | `#4a4038` | `#3a3a38` |
| Takke | koyu keçe `#5b4a3a` | `#3e3a34` |
| Kuşak | `#3a3026` | `#5a4a36` |
| Ten (yalnız el/ense) | `#9c6a50` | `#8e6048` |
- **Takkesiz baş (Y1, P05 p90 sonrası):** kısa, kafaya yapışık **tek parça koyu saç kütlesi** `#2a2018` (kulak açık, ense çizgisi yumuşak); şerit, tepe bandı ya da yan blok ("kulaklık") yok. Takke uçarken başta ayrılma çizgisi olmaz: saç kütlesi takkenin altında hep vardır.

### 3.7 Eller (KE-K5) — P07, P11 insert
Mevcut `KolEl` yapısı (MASA-INSERT) temel; bölüme 4 `tip` eklenir. Ölçek: el (bilekten parmak ucuna) **≈ 260 px** (insert, cs 1.0), kese ≈ 0.85× el.
| tip | Yen | Ten | Ayırıcı | Giriş |
|---|---|---|---|---|
| `entari-yen` (veren, saray) | **geniş, bilekten 1.6× açılan yen**, ince kumaş, soluk murdum `#4b4250`, gölge `#2e2834`; yen ağzında tek kıvrım | `#c48c72` (v1.3) | geniş yen + bakımlı el | sağdan (köşk tarafı) |
| `lagari` | dar yen, çivit `#34405e` (P07 ıslak: `#232c42` + damla), entari yeni `#7c8494` bilekte 12 px şerit | `#c08468` (v1.3; ıslak: %8 koyu + 2 parlama noktası) | çivit + ıslaklık | alttan |
| `hezarfen` (avuç) | dar yen, zeytin `#55603f`, entari şeridi `#7a6a50` | `#a87256` (v1.3) | zeytin + daha esmer | alttan |
| `muhafiz` | **kalın, kaba yün** yen `#3e3a34`, düz, kıvrımsız, yen ağzı kalın kenar | `#94644a` (v1.3; P11'de Hezarfen'den esmer kalır), boğum çizgileri belirgin, el 1.1× | ağır + kaba; işaret/arma yok | soldan, P11 p80, omza iner p104 |
Avuç pozları: `ac` (avuç yukarı, parmaklar hafif kıvrık), `kapa` (keseyi saran), `gevse` (parmaklar açılır, bilek 12° düşer: EV-D5). Omuz: `muhafiz` el P11'de omuza bastığında parmaklar kumaşı **4–6 px içeri bastırır** (kumaş kıvrımı), sert yapışık sticker gibi değil.
P07/P11 aynı kadraj: kese avucunun ekran yeri ±10 px aynı; yalnız el tipi, ışık (gece/gün) ve kese içeriği değişir → ayna okunur.

---

## 4. Prop'lar

Genel: ekran ölçüsü gerçeğe göre; stilize büyütme **yalnız** tabloda "stilize ×" yazanlarda ve en fazla ×1.6 (sikke hariç, açıklamalı).

| # | Prop | Gerçek ölçü | Ekran ölçü (plan) | 360 px'te | Stilize |
|---|---|---|---|---|---|
| KE-P1 | fişek demeti | 1.00 × 0.36 m | 220–400 px (P05–P06) | 73–133 px | — |
| KE-P2 | kanat (açık, iki kanat toplam) | açıklık 3.1 m [T] | P06 ≈ 520 px, P09 ≈ 260 px | 87 / 87 px | — |
| KE-P3 | kese | 0.15 × 0.11 m | 220–240 px (%11–12) | 75 px | ×1.4 (sahne-plani onaylı) |
| KE-P3 | sikke (altın, sultani) | ≈ 0.022 m [A §10.6: 21–24 mm] | 96 px (%5) | 32 px | ×3 (ek ayrıntı; okunurluk keseye ait) |
| KE-P4 | takke | çap 0.18 m, yük. 0.10 m | 117 px (olcek 1.6) | 39 px | ×1.6 |
| KE-P5 | taş | 0.25 m [T] | 190 px takipte (%10) | 63 px | kamera yaklaşması (cs 2.0) |
| KE-P6 | martı | açıklık 1.3 m | 420 px (ön plan) | 140 px | ön plan perspektifi |
| KE-P7 | meşale | 1.1 m sap + 0.18 m baş = **1.28 m** | 406 px/m'de **≈ 520 px** (alev hariç; P05) | 173 px | — |
| KE-P8 | defter/kitap | 0.32 × 0.22 m (açık 0.44) | P13 cs 1.0: kitap 640 px | 213 px | — |
| KE-P9 | pencere kanadı | 0.55 × 1.30 m | pencere duvarında 324 px/m ⇒ dekor 178 × 421 px; ekranda **cs 1.8: 758 px (%39) · cs 2.2: 926 px (%48) · cs 2.6: 1095 px (%57)** yükseklik (v1.2, mekanlar.md §1.6) | 253–365 px (yükseklik) | — |

### 4.1 Fişek demeti — §2.2.

### 4.2 Kanat (KE-P2) — tek siluet, ayrıntısız, iki karakterde AYNI çizim
Yapı kaynakta yok [A §2]: tüy, kaburga, iskelet, kumaş gerdirme, kayış, tutamak **çizilmez**.
- **Açık biçim (her kanat) — v1.3 (K1 O6: 3 oyuk + sivri uç "yarasa" okundu):**
  - Ön kenar: kalın, yuvarlak, hafif yukarı kavisli tek eğri (kökten uca).
  - **Arka kenar: TEK, sığ, sürekli kavis** (kökten uca hafif içbükey, en derin yerde sehim = kanat uzunluğunun %6'sı). **Oyuk, tırnak, sivri köşe yok**; kavis boyunca kırılma yok.
  - **Kanat ucu: yuvarlak**, sivri değil. "Kartal" işareti yalnız uçta: **3 kısa, ayrık, yuvarlak uçlu parmak** (yarıklı kanat ucu), her biri kanat uzunluğunun %10–12'si, aralarında dar V boşluk (dip yuvarlak), parmaklar hafif yukarı kıvrık. Arka kenar boyunca başka yarık yok.
  - Kök genişliği 0.24 × açıklık; kanat kökten uca düzgün daralır, uçta yeniden hafif genişler (parmakların tabanı).
  - 3/4 görünüşte kameraya yakın kanat 1.0×, uzak kanat 0.7× ve kısmen gövde arkasında.
  - **Yasak benzerlikler (360 px testi):** yarasa/ejderha (arka kenarda dişli oyuk, sivri tırnak, kemik çizgisi), uçak kanadı (düz kesik uç), martı (kırık M biçimi).
- **Bağlantı:** kanat kökü omuz arkasında gizli; kollar kanadın altında ön kenar boyunca uzanır, **eller ön kenarın altında kaybolur** (tutamak gösterilmez). Böylece "nasıl tutuyor?" sorusu yapı iddiasıyla cevaplanmaz.
- **Katlı (`acik 0`) — v1.3 (K1 O7: eni 100 birim "tahta/sörf tahtası" okundu):**
  - Boy: başın 0.15H üstünden **diz hizasına** kadar (ayakta: diz; oturan pozda: diz = oturak hizası, ayak dayamasına inmez). **Sapma kabul edilmez.**
  - **En 150 birim** (140–160 aralığı; rig birimi), yani omuz genişliğinden geniş; Lagâri'nin **sağ arkasına** kaydırılır (sırt hizasından 30–40 birim arkaya), böylece Y1'i örtmesi konumla çözülür, enle değil.
  - **İki kat görünür:** ön kat ışıklı ton `#6e6a64`, arka kat 1 ton koyu `#4a4642`, arka kat ön katın kenarından 6–10 birim taşar (kat olduğu okunur). Her katın kenarında **4 birimlik kalınlık şeridi** (ışık yanında açık).
  - **Kumaş/germe yumuşaklığı:** uzun kenarlar düz cetvel çizgisi değil, hafif dışbükey ve dipte hafif sarkık; ortada **2 yumuşak kıvrım çizgisi** (uzunlamasına, uçları sönen). Köşe yok, hepsi yuvarlatılmış (r ≥ 12 birim).
  - Alt kenarda açık biçimin izi: uç parmaklarından **tek bir yumuşak çentik** (yuvarlak dipli, sığ), katlı kanat olduğu okunsun; birden fazla çentik yok.
  - **Yasak benzerlik:** tahta, sörf tahtası, kalkan, kapı (düz kenar + sert köşe + tek ton).
- **Açılma (`acik 0→1`, 18 kare):** kökten döner + uzar; yarı yolda (0.5) kanatlar 60° yukarı. Arka kenar kavisi ve uç parmakları son 6 karede belirir (katlı hâldeki çentik uç parmaklarına açılır).
- **Renk:** düz mat, doku yok. Işıklı yüz `#6e6a64` · gölge `#4a4642` · kontra siluet `#3a3634` (gün) / `#2a2828` (gece) · kenar ışığı gün `#f0d79a`, gece `#f0b060` (2 px). Lagâri ve Hezarfen'de **aynı dosya, aynı renk**.
- **Martı ile karşılaştırma önlemi:** martı kanadı kırık "M" biçimli, mafsallı, beyaz-gri + koyu uçlu; kanat düz, rijit, tek renk. P09'da Hezarfen yalnız kontra siluet.

### 4.3 Kese + sikke (KE-P3)
- **Kese (v1.1):** **kumaş/bez torba** [A §10.6: "kumaştan yapılmış çanta biçimli kap", tek kaynak]; deri değil. Ağız büzgüsü tasarım kararıdır [T] (büzgü kanıtsız): ağızda 3–4 kumaş kıvrımı + 2 kısa sarkan bağ ucu. Gövde armut biçimi (alt geniş), dolu olduğu için tabanı yuvarlak ağır, kumaş yumuşak: 3 kıvrım çizgisi büzgüden aşağı, kenar hafif dalgalı. Doku: **nötr bez** (çok seyrek, 1 px dokuma tanesi α .15; deri parlaması/dikişi yok). Renk gri-kahve bez `#625646`, gölge `#3e352a`, bağ `#8a7a5c`. Süs, mühür, yazı yok.
- **İçerik göstergesi (iki kese aynı nesne tipi, aynı biçim; ayna — tasarım kararı; kaynak gümüşe *kese*, altına *surre* der [A §10.6], ekranda ad geçmez):** büzgü ağzında görünen 2 sikke kenarı, **ölçeksiz dairesel kenar** (akçe çapı bilinmiyor; miktar iması yok): P07 **gümüş akçe** `#a9aaa4` / ışık `#d8d8d0` (gece meşalede ısınır `#c8b89a`); P11 **altın** `#c9a24a` / ışık `#f0d890`. Altın/gümüşün "kese" karşılığı doğrulanmadı [A Çelişki 5]: renk yalnız göstergedir, miktar iddiası yok.
- **Sikke (P11, düşen):** gerçek ≈ 22 mm (sultani), ekranda ×3 stilize; daire, kalınlık çapın 0.12'si (kenar görünür). Yüz **dil-nötr**: dış halka + iç halka + ortada 3 kısa kıvrık soyut çizgi (hat çağrışımı; harf/rakam/tuğra **yok**). Dönme: elips yatay yarıçapı cos(θ) ile; yatarken son 3 salınım, kenar parlaması her yarım turda 1 kare `#f0d890`. Gölge `#2e2620` α .4, yatınca net elips.
- Ölçü: kese ekranda 220–240 px yüksek; sikke 96 px.

### 4.4 Başlık / takke (KE-P4, EV-D1)
- Yardımcı 1'in takkesi: yarım kubbe keçe, tabanı hafif içe dönük, üstte 1 dikiş çizgisi; `#5b4a3a`, gölge `#3a2e24`. Sargı yok (sarıkla karışmasın).
- Ayrılma karesinde baştaki takke gizlenir, prop aynı konum/açıdan devralır (kopukluk 0 px). Yol: sağa yay, rıhtıma iner (temas "fıt", gölge temas karesinde netleşir), 2 yuvarlanma (yuvarlanırken elips silueti, 1 tur ≈ 14 kare), ağzı aşağı ya da yana yatar. Takkenin altı (iç) `#2e241c`.

### 4.5 Taş (KE-P5, P08)
Galata galerisi çıkıntısından kopan düzensiz kesme taş parçası (5 köşeli, köşeler hafif yuvarlak), Galata taş paleti `#9a8f7e` / gölge `#6b6357`, 1 kırık yüz açık `#b4aa96`. Düşerken 1 tur/40 kare yavaş döner. Toz §5.

### 4.6 Martı (KE-P6, P09)
4 poz döngüsü (kanat yukarı / yatay / aşağı / yatay, 4 kare/poz ≈ 1 vuruş/16 kare) + süzülme pozu. Gövde `#dcdcd6`, kanat üstü `#a9adb0`, kanat ucu `#3a3a3e`, gaga `#c8a04a` (küçük; kırmızı benek yok). Ön planda bulanık (blur 6 px) — Hezarfen net. Kontur yok (bulanık ön plan), yalnız ton.

### 4.7 Meşale (KE-P7)
Sopa `#4a3424` (1.1 m), baş: katran emdirilmiş bez sargı `#2e2620` [G], alev §1.1. **Toplam 1.28 m (şartname doğru, v1.3 notu):** K1'de motion 1.65 m (≈ 670 px) çizdi; 406 px/m'de sap ucundan baş tepesine **≈ 520 px** olmalı. Taşıma pozu kabul edildi. Meşale yolu ana eylem koridoruna (ekran x 400–700) girmez; P05 p56'dan sonra alev ekran x ≤ 330, y ≥ 900 (K2; yönetmen/motion). Alev 3 dilli, 8 karede bir şekil değiştirir (seed sabit, döngü), yukarı + rüzgârla hafif sağa. Işık havuzu ve karakter kenar ışığı alevin **ekran noktasından** türetilir (tek kaynak). Dumanı ince `#4a4440` α .4.

### 4.8 Defterler ve Seyahatname (KE-P8, P13–P14)
- **Seyahatname (açık):** iki sayfa, ortada cilt oluğu gölgesi. Her sayfada metin bloğu kenarlardan %12 boşluklu, çevresinde **çift ince cetvel çizgisi** `#4a4237` (renkli cetvel/rubrik yok).
- **Hat çizgileri (dil-nötr):** 15 satır/sayfa; her satır sağdan sola dalgalı kalın-ince çizgi dizisi: 4–7 "kelime kümesi" (kısa yatay vuruş + 1–2 dikey çıkıntı + ara sıra nokta), kümeler arasında boşluk, satırlar iki yana yaslı, bazı satırlarda uzatılmış yatay vuruş (keşide çağrışımı). **Hiçbir küme Arap/Latin harfi olarak okunmaz** (eleştirmen: 360 px ve 1080 px'te harf aranır). Çizgi `#2a2420`, kalınlık dekor 1.6–3 px değişken (kamış kalem hissi).
- **Kenar çizimleri (sağ sayfa dış kenarı, iki adet):** (1) **demet + binici:** P01 p0 kompozisyonunun mürekkep çizgisi hâli — demet silindirleri (5), oturak, oturan siluet (yüz yok), sırtta katlı kanat, solda fitil ve fitil ucunda kıvılcım yeri; (2) **kanatlı adam:** açık kanat §4.2 biçimi, gövde küçük. Her biri dekor 140 px yükseklik, tek kalınlık 1.4 px, tarama yok, `#4a4237`. Çizimler sayfadaki hat bloğunun **dışında**, kenar boşluğunda.
- **3 defter:** kapalı, sade deri kapak §1.4, köşeler hafif aşınmış (açık ton köşe), sırtta 3 bant çizgisi. Açılınca **iki boş sayfa**, cetvel bile yok (mürekkep yok = kaynak yok).
- **Kalem + hokka [A §10.7]:** **kamış kalem** ve hokka bir arada, nötr: ya ahşap kalemdan içine gömülü hokka ya da ayrı küçük hokka + yanında kamış kalem (motion birini seçer, ikisi birden değil). Divit çizilmez. Gölge yüzeye.
- **Yüzey = RAHLE (v1.1, doğrulandı [A §10.7]: yazı/okuma için küçük dar masa):** sahne-plani'deki "ahşap masa" → **rahle**. Kitap rahlenin düz üst tablası üzerinde açık; P13 geri çekilmede (cs 1.0) rahle tablasının dar, ahşap kenarı görünebilir (ince kenar, oyma yok), ama **rahle ayakları/X kasnağı, minder, sandalye ve yazıcının oturuşu çizilmez** (oturuş doğrulanamadı → nötr). 3 defter ve hokka tablada; tabla dar olduğu için defterlerden biri tablanın kenarında üst üste durabilir. Kadrajda tabla dışı alan koyu `#2e2016` (zemin ayrıntısız). Batı tipi masa/sandalye yok.

### 4.9 Pencere ışığı ve aralık (P12) — §5.6.

### 4.10 Pencere kanadı (KE-P9)
**Çift kanatlı ahşap kepenk ailesinin bir kanadı** [A §10.10, dolaylı]: padişahın çektiği kanat görünür; ikinci kanat/çerçeve kenarı aralıkta belirsiz kalır (sabit, gölgede). Kanat: çerçeve + içe gömme düz paneller, **panel sayısı nötr** (köşk için kanıt yok; çizimde 2–3 arası, okunur ritim yaratmayacak sade bölüntü). Menteşe ve mandal **nötr basit** (koyu `#2e2a26` küçük, biçim iddiası yok; mandal kapanışta "tık"). **Cam çizilmez (nötr)** — "cam yok" iddiası değil (saray revzeni belgeli [A §10.10]). Kafes, oyma, çini çizilmez (nötr). Renk §1.3. **Ölçü ve yer (v1.2, mekanlar.md §1.6 ile birebir):** görünen **sol kanat**, menteşe sol pervazda; açıklık dekor **x 560–738, y 560–981** (0.55 × 1.30 m, 324 px/m), pervaz 26 px, denizlik y 981–1000; ikinci kanat x 738–916 kadraj dışı. Ekran yüksekliği cs'ye bağlı (§4 tablosu: %39–57; eski "≈ 576 px / %30" değeri kaldırıldı). Menteşe `aci` 80° (açık) → 12° (aralık kalır); 12°'de yarık dekor x 706–738 = **32 px** (cs 2.2'de 70 px, cs 2.6'da 83 px); yarık genişliği = ışık şeridi genişliği. Kanat kalınlığı kenardan görünür (dekor 10 px ≈ 3 cm, cs 2.2'de 22 px, ışıklı kenar).

### 4.11 Islak ayak izi (P07)
Rıhtım taşında 2–4 iz, `#3a3e48` α .6 düzensiz yaprak biçimi (mest tabanı, parmak ayrımı yok), en yenisi en koyu; P07 boyunca kurumaz.

---

## 5. Efekt dili (KE-E1…E6)
`Efektler.tsx` kapsamını okumadım (brifte yok); aşağıdakiler biçim/renk sözleşmesidir, mevcut efekt uyuyorsa yeniden kullanılır. Hepsi **seed sabit**, fade ile kaybolma yok (sönme = küçülme + koyulaşma).

| Efekt | Biçim | Renk | Süre / ölçü | Plan |
|---|---|---|---|---|
| E1 fitil kıvılcımı | §2.3 4 köşeli yıldız + parçacık | `#fff0c4` / `#ffd27a` / `#f0a040` | 48 px çekirdek, 140 px hale | P01, P05, P14 |
| E1 püskürme | demet ağızlarından aşağı koni, 3 katman (çekirdek dar, alev, kıvılcım yağmuru); koni uzunluğu titreşimde 0.6–1.0 m, kalkışta 1.6 m | çekirdek `#ffe6a8` → `#f0a040` → kenar `#a8642e` | kalkış anında ekranın %25'ine kadar aydınlatma: rıhtım ve deniz `#f0a040` α .3 | P01, P05 |
| E1 duman | yuvarlak bulut kümeleri, düz 2 ton, kenarı tırtıklı (gravür) | ışıklı `#8a7e70` / gölge `#4e4844` α .7 | yukarı + rüzgârla sağa, büyür | P01, P05, P06 |
| E2 şenlik fişeği | yükselen ince iz (2 px) → patlama: **merkezden düşen 18–24 kavisli çizgi** (söğüt), uçları sönerken koyulaşır; yıldız/küre yok | çizgi `#e8d6a0` → uç `#8a7a5a`; patlama anında gök `#e8d6a0` α .12 | yarıçap 220–320 px, 70 karede düşer | P02 (P01 A arka planda) |
| E3 su halkası | 2–3 eş merkezli elips (perspektifte basık 1:4), dışa açılır, kalınlaşmaz incelir | `#9fb0bf` α .7 (gece) / `#e4dcc4` (gün) | 40 kare | P06 |
| E3 buhar | boş, sıcak demet suya değince 4–6 yuvarlak puf, dik yükselir | `#b8b4aa` α .5 | 30 kare | P06 (EV-D2) |
| E3 sıçrama + damla | taç biçimli 5–7 damla yayı; damlalar §3.2 | `#a9bccb` | 20 kare | P06 iniş, P07 |
| E4 toz | yere yayılan basık yarım halka + 3–5 küçük taş parçası | `#b8a888` α .6 | < %5, 24 kare | P08 taş, P09 iniş |
| E5 ışık şeridi | pencere aralığının **geometrik izdüşümü** (aralık kenarlarından güneş yönünde çizilen paralel kenarlı bant); yüz/duvar/zemine düşer | `#f6e4b0` α .55, kenar net | kanat açısıyla anlık genişler/daralır | P12 |
| E6 rota çizgisi | Galata tepesinden Doğancılar'a hafif kavisli kesik çizgi (dash 22 / gap 16), uçar gibi çizilir (baştan uca), başta ve sonda 10 px nokta | `#e9dfc9` + 1.5 px `#1c1915` kontur (harita dili; altın değil — sikkeyle karışmaz) | 6 px | P09 |
**Renk ve biçim notu (v1.1):**
- Yaygın renkli (kırmızı/yeşil/mavi) havai fişek 19. yy. Avrupa'sına tarihlenir [A §10.8, çok kaynaklı arama özeti]; 1630'lar İstanbul şenliğinin renkleri kaynakta yok. Bu yüzden şenlik ve kıvılcım için **saman/altın-turuncu aralığı bir tasarım kararıdır [T]** (renkli patlama çizmemek = nötr kalmak), tarihî renk iddiası değildir.
- E2'nin "yıldız değil, düşen çizgi" biçimi **motif tekilliği kararıdır [T]** (4 köşeli yıldız yalnız fitil kıvılcımına ait, §2.4); tarihî iddia değildir — 1582 Osmanlı şenliğinde "yıldız" türü fişek de anılır [A §10.5].

---

## 6. Tipografi (yazı katmanı, TR/EN ayrı)
Görüntü **yazısız** render edilir; aşağıdakilerin hepsi dil başına ayrı şeffaf katman (KE-Y1, KE-Y3).
- **Ekran yazısı:** kit standardı aynen (`src/kit/yazi.tsx`, K2/K4): kâğıt şerit + Playfair Display 900, üst bant y 240–400, tek kırmızı vurgu kelimesi. Tarih/sayı içeren yazılar (`1630'LAR`, `~64 KG`, `~3 KM`) `tur: formul` → IBM Plex Mono 500. Bölüme özel stil yok.
- **Replik:** kit standardı (konuşan plakası + Inter 800 + yarı saydam koyu bant `#14120f` α .72). Plaka metni `replik.kim`'den dil başına (TR `LAGÂRİ`, `PADİŞAH`; EN senaryo-en'deki karşılık). Â, İ, Ş, Ğ glifleri `latin`/`latin-ext` alt kümelerinde var (theme.ts aralıkları). P04 üst bant, P12 alt bant (sahne-plani).
- **Harita etiketleri (P09, `harita_etiketleri[]`):** IBM Plex Mono 500, 30 px, BÜYÜK HARF, harf aralığı 0.08em, `#1c1915`; kâğıt fiş `#e9dfc9` α .92, 1.5 px `#1c1915` kenar, iç boşluk 8/14 px; noktaya 2 px `#4a4237` ince işaret çizgisi (≤ 60 px). TR: `GALATA` · `ÜSKÜDAR` · `BOĞAZ`; EN: `GALATA` · `ÜSKÜDAR` · `BOSPHORUS`.
  - Yerleşim: etiketler **dekor koordinatına bağlı** ve görüntüyle **aynı kamera dönüşümünü** alır (P09 yatay pan cx 500→−500); yazı katmanı ayrı render olsa da kamera fonksiyonu ortak olmalı (motion notu). y aralığı 520–1250 (üst/alt bant dışı); `BOĞAZ` su ortasında y≈1060; `GALATA` kule tepesinin 90 px üstünde değil, **yanında** (kule silueti örtülmez); `ÜSKÜDAR` meydanın üstünde, iniş noktasını örtmeden. Rota çizgisi ve martı yolunun üstüne binmez (martı y ≥ 1100 bölgesine etiket konmaz p112–195).
- **Görüntüde gömülü dil yok:** kese, sikke, kitap, pencere, köşk, kule üzerinde okunur yazı yok (hat çizgileri dil-nötr §4.8).

---

## 7. Rig / kit ihtiyaçları (mevcut Kukla ne yapar, ne yapamaz)

**Mevcut `Kukla.tsx` ile yapılabilenler:** 3/4 poz, yürüme, `konus` visem, `yakin` yüz ayrıntısı (göz kapağı, dolgulu kaş, dudak), `lookX/Y`, `headTilt`, `lean`, `bodyY` ile oturma açıları, `palet.yuzsuz` (kompars), YUZLER yüz varyantı (`genislik/uzunluk/burunTip/kasAci/zayif/yasCizgi`, `biyik duz`, `sakal`), sahne ışığı (`KuklaIsik`, kenar ışığı rengi sahneden).
**Yapamadıkları (1830 Avrupa kostümüne sabit):** frak etekleri, yelek + düğmeler, kolalı yaka + kravat, pantolon bacağı, silindir/kasket/geniş şapka. Osmanlı kıyafeti bunları **kapatmayı** ve yeni parçalar eklemeyi gerektirir.

| Kimlik | Parça | Kim | Not |
|---|---|---|---|
| R1 | `palet.kostum: "osmanli"` gövde: ayak bileğine entari + önü açık kaftan (iki ön panel, aradan entari şeridi) + kuşak; frak etekleri/yelek/düğme/yaka/kravat **çizilmez**; yen ağzı bilekte 1.25× açılır; şalvar yalnız bilekte, mest | Lagâri, Hezarfen | Etek iki panel, uyluk açısına bağlı (yürüme + oturma); alt kenar bileğin 20 birim üstü |
| R2 | `palet.kostum: "osmanli-kisa"`: diz boyu entari + şalvar + kuşak | yardımcılar | R1'in kısa varyantı |
| R3 | `palet.sapka: "sarik" \| "sarik-basik" \| "takke"` + palet `sarikYon: 1 \| -1` (v1.3: iki sarıkta da eğri çapraz katman, yalnız yön farklı; biçim R15/§3.0b); sarık alın çizgisinden (yerel y ≈ −28) yukarıyı ve kulak üstünü örter | Lagâri, Hezarfen, yardımcılar | |
| R4 | `YuzTip.sac: "sarikalti"` — üst saç kütlesi çizilmez, yalnız ense + favori | Lagâri, Hezarfen | bukle saç sarığın dışına taşmasın |
| R5 | YUZLER `lagari`, `hezarfen` (§3.2, §3.3) + `sinirlar.json yuzVaryant` | | K3 doğrulayıcı aynı varyant uyarısı yok |
| R6 | `poz: "oturan"` (Blanc'ta yalnız açı denemesi vardı): etek dizden sarkar, ayaklar dayamaya kilitli (ayak kilidi zemin yerine prop noktası) | Lagâri | KE-K6 |
| R7 | `aksesuar: kanat` + `durum.acik` 0–1, katlı/açık; açıkken kollar kanadın altına kilitlenir, eller gizli; **ayrılma**: P06 iniş karesinde aksesuar gizlenir, aynı konum/açıyla `kanat` prop'u (`suda: true`) devralır, Lagâri P07'de kanatsız | Lagâri, Hezarfen | KE-P2, KE-J3 |
| R8 | `poz: "ucus"` (süzülme: gövde 30° öne, bacaklar bitişik geride, etek rüzgârla geriye 15°) | Lagâri P06, Hezarfen P09 | KE-J4 |
| R9 | `islak` 0–1 (palet koyulaşma, siluet daralma, sarık ucu, damla yayıcı 3 nokta) | Lagâri | KE-J10 |
| R10 | `PadisahSiluet` bileşeni (Kukla değil): `bas_aci` 0–1 önden→profil morf, `profil` (P12) + kenar ışığı + şerit bandı + işaret eden el | padişah | KE-K3, KE-J11 |
| R11 | `KolEl.tip`: `entari-yen`, `lagari` (+ıslak), `hezarfen`, `muhafiz`; avuç `ac/kapa/gevse`; `omuz-bas` (kumaş içe basma) | P07, P11 | `el` kuralı SARAYBURNU insert'e açılmalı (sahne-plani KE-Y6) |
| R12 | Kenar ışığı: bu bölümde rig `RIM #c4d6ff` sabiti devre dışı; tüm kenar ışığı `KuklaIsik`'tan (gece amber, gün `#f0d79a`) | hepsi | ay yok |
| R14 (v1.3) | **Arka / arka 3/4 görünüm** (`gorunum: "arka34"`): rig şu an yalnız ön 3/4 çiziyor. Arka görünümde yüz yüzeyi yok (ense + saç/takke arka kütlesi + kulak kenarı + yanakta ≤ 8 birim ten), kuşak sarkan ucu arkada, kol katman sırası ters (ön kol gövdenin arkasında) | yardımcılar | K1 O4 |
| R15 (v1.3) | `sarik` çizimi §3.0b: başı saran basık yastık, alına/kulak üstüne iner, eğri çapraz katmanlar (yön parametresi), tümsekli kontur, tepede içteki başlık ucu | Lagâri, Hezarfen, padişah | K1 O8 |
| R16 (v1.3) | Kostüm taraması: `Bolge` tarama katmanı giyside terminatör bandına (≤ 14 birim) ve derin kıvrım gölgesine kırpılır; geri kalan kumaş düz 2 ton | hepsi | K1 O3 |
| R17 (v1.3) | `osmanli-kisa` kalıbı §3.6: yakasız çapraz kavuşan ön, sarılı kuşak (toka yok), bol şalvar (×1.6) + paça büzgüsü; takkesiz baş = tek parça kısa saç kütlesi | yardımcılar | K1 O2 |
| R13 | Prop'lar: `fisek-demet`, `kanat` (ayrık, P06 suda kalan), `kese` (17. yy. biçim + içerik), `sikke`, `takke`, `tas`, `marti`, `mesale`, `defter`, `kitap seyahatname` (hat + kenar çizimi), `pencere-kanat`, `ayak-izi` | | KE-P1…P9 |

---

## 8. Mekân sorumlusuna devredilen noktalar (mimari onların)
1. **Palet bağlayıcı:** §1 gece/gündüz/iç/kitap tabloları; mekanlar.md doku/tarama tonlarını bu hex'lerden türetir. Gök/su düz basamaklı (gradyansız) minyatür alanı kuralı.
2. **Güneş tanımı (tüm gündüz şablonları):** azimut ≈ 65° (ENE), yükseklik ≈ 15°, sabah [T, kullanıcı onaylı]. P09 kamerası kuzeye bakar; P12 pencere Boğaz'a (doğu-kuzeydoğu) bakar. Gölge yönleri buradan.
3. **Gece ışığı:** ay yok; meşale + köşk penceresi + şenlik. Köşk penceresi çevresine havuz düşürür.
4. **Köşk bacaları** taş örgülü, başlıklı, taş renginde; demet silindirlerini çağrıştırmasın (§2.4).
5. Köşk kubbesi/çatısı (Eldem ahşap çatı ↔ gravür piramit kubbe [A §5.2]), Galata külahının eğimi/pencereleri [A §5.1], Doğancılar meydanı [A §5.3] — mekanlar.md kararı; nötr kalanlar nötr. **Konut çatıları (v1.1, bağlayıcı):** koyu toprak tek ton `#6e5240`, kiremit deseni yok, eğim alçak-orta, dik/mansard yok [A §10.9]; konutlar ahşap gövdeli [A §10.9, arama özeti].
6. **Ölçek ilişkisi:** kıyı şablonu yakın z'de **≈ 406 px/m** (yardımcı 1.65 m = 670 px, baş ≈ ufuk y 720). Demet 1.0 m, meşale 1.1 m, rıhtım basamağı 0.2 m. Köşk uzakta (P05: taban y≈900, üst y≈640 ⇒ ≈ 260 px), karakterle oranı ufuk kuralına uymalı. GALATA-TEPE: Hezarfen %22 boy (≈ 420 px) ⇒ ≈ 255 px/m; galeri korkuluğu 1.0 m ≈ 255 px, kapı 1.9 m. BOGAZ: Hezarfen 130 px.
7. Kitap yüzeyi: rahle tablası; ayak/kasnak kadraja girmez (§4.8).
8. Pencere (P12): çift kanatlı kepenk ailesi, açıklık ile kanat ölçüsü §4.10; cam çizilmez (nötr); içeride kafes/kalem işi/çini çizilmez.
9. FilmLook derecelendirmesi §1.5 hedeflerini korumalı.

---

## 9. Kalibrasyon: öncelikli 3 kare
Sıra riske göre (yeni parça sayısı × okunurluk riski). P12 profil + pencere 4. sırada: yedeği var (dokunuslar EV-D6 yedek) ve tek plana özgü.

| # | Kare | Neden ilk | Bakılacaklar (eleştirmen + betik) |
|---|---|---|---|
| **K1** | **P06 p76** (gece kıyı; demet yarı yolda, Lagâri kanat açık) + aynı kadrajın **P05 p78**'i (tek render turu, şablon aynı) | En çok yeni parça: gece paleti, imza demet, kanat dili, Osmanlı gövdesi (R1), oturan poz (R6, P05), uçuş pozu (R8), yardımcı yüzsüz + takke, meşale tek ışık, deniz | demet 360 px'te "silindir demeti" okunur mu, 7 sayılabilir öğe yok mu · demet rengi başka hiçbir yerde yok (ΔE ≥ 12) · kanat ayrıntısız tek siluet, el/tutamak görünmüyor · Lagâri ayakları P05'te dayamada · yardımcı başı ufka yakın (y≈720), ayaklar y ≤ 1480 · kenar ışığı amber (mavi RIM yok) · meşale havuzu ve gölge aynı noktadan · kırmızı piksel yok · gök/deniz §1.5 hedefleri · demet/kanat zonları ayrı (EV-D2) |
| **K2** | **P11 p128** (gün insert; kese havada, avuç gevşek, muhafız eli omuzda) ve eşi **P07 p72** | Gündüz paleti + 4 el tipi + kese/sikke + P07/P11 ayna kadrajı | kese ≥ %10 (≥ 192 px), 360 px'te "kese" okunur · iki el tipi 360 px'te ayrışır (zeytin ↔ kaba yün ↔ murdum yen) · omuza basan el kumaşı bastırıyor · kese bez/kumaş okunur (deri parlaması yok) · sikke yüzünde harf/rakam yok · P07 ile kese konumu ±10 px · gümüş/altın gösterge ayırt edilir · ayak/temas y ≤ 1480 · Lagâri ıslaklığı (P07) okunur |
| **K3** | **P14 son kare ↔ P01 p0** (yan yana) | İmza motifi + döngü + kitap dili + dil-nötr hat | kıvılcım ekran noktası/boyutu iki karede aynı (±6 px) · kenar çizimi konturu cs 4.6'da P01 dekor konturuyla aynı kalınlık sınıfında (5–7 px) · hat çizgilerinde okunur harf yok (1080 ve 360 px) · sayfada kıvılcımdan başka renk yok · P01 p0'da Lagâri oturan, demet + fitil + kıvılcım alt üçte birde, güvenli alan içinde |
| (4) | P12 p66 | profil + şerit | göz/ağız çizilmemiş; şerit pencere aralığından türemiş, yüz konturunda göz hizasında; yüz alanı ≥ %12 |

---

## 10. Açık sorular

**Kullanıcı kararları — KARARA BAĞLANDI (2026-11-08)**
1. ~~İmza nesnesi~~ → **fişek demeti, 5 görünür tüp** (§2.1).
2. ~~Gündüz saati~~ → **sabah, güneş ENE** (§1.2).
3. ~~Sakal/bıyık~~ → **Lagâri bıyık (belirgin, olgun çene), Hezarfen sakal** (§3.0, §3.2).
12. ~~P06–P07 kanat sürekliliği~~ → **kanat SUDA KALIR**: P06'da suda görünür, P07'de Lagâri kanatsız (§3.2, R7).

**Araştırma soruları — KARARA BAĞLANDI (`arastirma.md` §10, arama özeti düzeyi)**
4. Sarık rengi → beyaz/krem tutuyor; **yeşil sarık hiçbir figürde yok** (padişah dahil). Sakal kalıbı doğrulanamadı → iddia taşımaz (§3.0).
5. Fişek kılıfı → doğrulanamadı → **düz mat silindir**, sargı çizgisi yok, "kâğıt" denmez (§2.2).
6. Kese → **kumaş/bez torba** (deri değil), büzgü [T]; sikke **≈ 0.022 m** (§4, §4.3).
7. Yazı yüzeyi → **rahle** (doğrulandı); oturuş doğrulanamadı → çizilmez; kamış kalem + hokka nötr, divit yok (§4.8).
8. Renkli fişek 19. yy. → şenlik/kıvılcım rengi [T] olarak yeniden yazıldı; "düşen çizgi" = motif tekilliği [T] (§5).
9. Çatı → kiremit doğrulanamadı → **koyu toprak tek ton, desensiz, dik çatı yok** (§1.2, §8).
10. Pencere → **çift kanatlı kepenk ailesinin bir kanadı, panel sayısı nötr, cam çizilmez (nötr)** (§4.10).

**Hâlâ açık (orkestra / sonraki ajan)**
11. Sanat yönetmeni kalıbındaki "imza nesnesi: Chappe kulesi" bu bölüme ait değil; kalıp güncellenmeli.
13. `Efektler.tsx` kapsamı okunmadı; motion mevcut efektleri §5 sözleşmesine göre eşler.
14. `arastirma.md` §10'un tamamı arama özeti (sayfa açılamadı); sayfalar açılırsa (Ralamb, Merian 1635, revzen makalesi) §1.2 çatı, §3.0 sarık ve §4.10 pencere yeniden gözden geçirilir.
