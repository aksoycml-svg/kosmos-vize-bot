# Paris Kuşatması 1870 · Mekân Şartnamesi (kurulum ekibi, adım 2)

Hazırlayan: mekân sorumlusu · 2026-11-11 · Girdi: `tasarim.md` (palet, tek ışık, sarı metal ve kırmızı yasağı, §9 notlar: bağlayıcı), `sahne-plani.md` (§1, §6, §7), `bolum.json` (kamera ve parametre taslakları), `arastirma.md` (§5, §9), `notlar/tur-1.md` (LANTERN-ODA ayrı mekân). Kod yalnız okundu: `src/kit/KATALOG.md`, `src/kit/sinirlar.json` (yer tutucular), `src/doku/{TasDuvar,CatiOrtusu,Kemer,Tarama,Isik,AhsapYuzey,Siluet,ArsivKatmani,sabitler}`, `src/kit/sablonlar/{MasaInsert,IcOda}.tsx` başlıkları. Biçim örneği `bolumler/evliya-ucuslari/mekanlar.md`.
Bu belge **şartnamedir, kod değildir.** Bütün sayılar motion içindir; görsel üretilmedi (bütçe), git yapılmadı.

Etiketler: **[A]** arastirma.md'de kaynaklı · **[S]** senaryo/sahne planı · **[G]** genel bilgi, kaynağı açılmadı, **doğrulanmalı** · **[T]** tasarım kararı (tarihî iddia değil). Kaynaksız ayrıntı nötr kalır, tek başına dokunuş taşımaz.

### Özet kararlar (orkestra için)
1. **Dört şablon, 9 görünüm:** PARIS-CATI (`cati` = `kumes`, **tek dekor**), MONTMARTRE (`meydan`, **`yukleme` yeni**, `gok`, `sepet`), DAGRON-INSERT (`masa`, `kafes`), LANTERN-ODA (`oda`).
2. **PARIS-CATI'de kamera dolly'dir, zoom değildir** (§1.3). Gerekçe: P01 f0'da kılıf 320 px (tasarım) ve P01 sonunda kümes "küçük ev" okunsun diye kümes katmanı ×10, karşı cephe ×1.08 ölçeklenmeli. Saf zoom (cs 3.2→1) bunu veremez: kümes geniş planda kadrajdan büyük kalır. Json `cs` aralığı değişmez; anlamı "kamera mesafesi" olur.
3. **Haussmann sonrası Paris imzası, telefonda:** krem kesme taş, sürekli korniş + 5. kat balkonu, **mansard + lucarne sırası**, **çinko teras kenet çizgileri**, **baca kümesi + sıra halinde baca külahları (mitron)**. Anıt silueti yok (§0.7).
4. **Kemer yok:** bu bölümün bütün açıklıkları düz lentolu dikdörtgendir (§0.4). Sivri/yarım daire kemer çizilmez.
5. **Kamera yönleri ışıktan türetildi** (§0.6): PARIS-CATI GGB'ye (200°), MONTMARTRE güneye (180°, Paris'e) bakar. İkisinde de gündüz güneşi sol-önde kalır, gölgeler sağa ve kameraya doğru düşer. Bu, tasarımdaki "soldan-arkadan, gölge sağa-öne" kuralına uyar. Alacakaranlık parıltısı PARIS-CATI'de sağ-önde, kuşun uçtuğu yönde.
6. **Montmartre tepesi kameranın arkasında:** 1870 görünümü doğrulanamadı [A §5.1]. Kamera Paris'e baktığı için değirmen, kilise ya da Sacré-Cœur çizme zorunluluğu doğmuyor.
7. **Yönetmene sayısal düzeltme önerileri** §7'de: P05 cs 2.0, P10a cs 2.6–2.75, P10b pan cx ≈ −1250, P06 ikinci balon konumu, ufuk değerleri.

---

## 0. Ortak sistem (dört şablonda aynı)

### 0.1 Koordinat ve kamera
- Dekor px, kamerasız 1080×1920 taban. Kit kuralı: `ekran = (d − 540|960)·cs + 540|960 + (cx|cy)`. **cx/cy kamera dönüşüdür (pan/tilt), parallaks vermez.** Bu yüzden bütün katmanlar aynı kaydırmayı alır.
- **Her görünümün fiziksel kamerası yazılıdır:** odak F (px, cs 1), göz yüksekliği e (m), ufuk y (dekor), kilit düzlemin mesafesi Z ve o düzlemin px/m değeri. Figür ve yapı ölçeği buradan türetilir (ufuk–ölçek): yükseklik h m, Z mesafesindeki nokta `y = ufuk + (e − h)·F/Z`, ölçek `px/m = F/Z`.
- **İstisnalar:**
  - PARIS-CATI'de cs bir **dolly**dir (§1.3): katman ölçeği katmanın derinliğine bağlıdır.
  - MONTMARTRE `gok` ve `sepet` görünümlerinde kamera yükselir (vinç). Zemin katmanı kamera yüksekliği H(t) ile yeniden hesaplanır (§2.5, §2.6).
- Kamera yüksekliğine göre görünenler her mimari kartta "Kameradan görünen" satırında yazılıdır.

### 0.2 Mesafeye göre ayrıntı (ekran px/m = dekor px/m × katman ölçeği)
| Sınıf | px/m (ekran) | Kontur (`KONTUR`) | Doku | Tarama | Süsleme |
|---|---|---|---|---|---|
| insert | ≥ 900 | 8 px (en çok) | tahta damarı, hasır kamışı, kâğıt lifi | yalnız §0.5 yerleri | yok |
| yakın | 150–900 | 6 px | kenet/derz, tahta, sıra | II–III | imza ayrıntı |
| orta | 35–150 | 4 px | yalnız ana sıra çizgileri (taş: 2 sırada bir) | II yalnız korniş altı/lucarne sövesi | yalnız imza |
| uzak | < 35 | 3 px ya da yok | düz ton | yok | tek siluet |
- Kontur ekranda dekor × ölçek, **en çok 8 px**. 360 px'te 0.5 px altına inen çizgi çizilmez (tasarım §0.3).
- `KonturTitreme`: uzak 1.2 · orta 2.0 · yakın 2.6 · insert 3.0 (sabitler.ts `TITREME`).

### 0.3 Doku katmanları (yüzey başına en çok 3) ve derecelendirme
1. **Taban deseni:** taş sırası, çinko keneti, arduvaz sırası, hasır kamışı ya da tahta damarı.
2. **Tarama:** `Tarama.tsx`, yalnız §0.5 yerlerinde.
3. **Kâğıt lifi + gren:** `ArsivKatmani`, kanal ortak katmanı.
- **TasDuvar bulutlanma/gözenek (b) katmanı kapalı.** Bir yüzeyde en çok 2 ton basamağı olur, yumuşak gradyan kullanılmaz (tasarım: gök 3 düz basamak). Tek istisna lantern huzmesi: dolgu sabit alfa, kenarı net.
- **Seed sabit, doku kaynamaz.** `DOKU_SEED` ekleri: `parisCati: 151`, `montmartre: 157`, `dagronMasa: 163`, `lanternOda: 167`, `havadanParis: 173`.
- **ArsivKatmani modu:**
  - Alacakaranlık (P01, P11b) ve LANTERN-ODA → `geceLapis`. Gök moru (`#4a4663`, C\* 18.6) `gece` modunda grileşir (Evliya K1 O5 dersi).
  - Gün görünümleri (PARIS-CATI gün, MONTMARTRE, DAGRON-INSERT) → `gunduzMineral`.
  - Ölçüm: C\* ≥ hedefin %70'i, h° ±20° (§6).

### 0.4 Açıklık sözlüğü — bu bölümde KEMER YOK
| Öğe | Tip | Geometri |
|---|---|---|
| Haussmann cephe pencereleri (5. kat) | `duz` (lento) | Dikdörtgen, oran 1 : 1.9 (1.1 × 2.1 m), söve 0.12 m, lento üstünde ince düz silme. Alınlık yok (5. katta sade) [G] |
| Mansard lucarne'ları | `duz` + **düz başlık** | 0.9 × 1.3 m, yan yanaklar (jouées) brisis yüzeyinden çıkar, üstte 0.12 m'lik düz çinko başlık (kısa saçak). Üçgen ya da yuvarlak alınlık çizilmez. Gerçekte çeşitliydi [G]; nötr seçim |
| Montmartre yan evleri | `duz` | 1.0 × 1.6 m, söve yok, sıva içinde |
| Kümes giriş açıklıkları | `duz` | 0.12 × 0.16 m dikdörtgen (tasarım §4.4) |
| LANTERN-ODA kapısı | `duz` | 0.9 × 2.2 m, söve 0.10 m, kasa koyu |
| Kafes kapağı | dikdörtgen çerçeve | sol menteşe (tasarım §4.3) |
Kural: `Kemer.tsx`'ten yalnız `duz` tipi kullanılır. `yarimDaire`, `basik`, `sivri` ve `osmanli` bu bölümde çağrılmaz.

### 0.5 Tarama nerede
- **Yalnız şu yerlerde:**
  - korniş altı (soffit)
  - lucarne yanağının ve sövesinin gölge yüzü
  - baca kümesinin gölge yüzü
  - kümes saçağının altı ve giriş açıklıklarının içi (küçük alan, IV serbest)
  - iniş tahtasının alt yüzü
  - sepetin gölge yüzü (yalnız dikey bant)
  - sandığın ve kutunun gölge yüzü
  - lantern gövdesinin gölge yüzü
  - masa ön kenarının alt yüzü
  - balonda yalnız tasarım §4.1'deki terminatör bandı
- **Taranmaz:** gök, perde, badana duvar, çinko teras ve meydan zemini gibi geniş yüzeyler, cephenin geniş düz alanı, masa üstü, kâğıt. Geniş gölge düz koyu tonla verilir.
- **Açı θ:** sahne başına tek θ, anahtar ışığın ekran yönüne dik:
  - PARIS-CATI gün: 72° (çizgi üstte sola yatık)
  - PARIS-CATI alacakaranlık: tarama yalnız IV derin noktalarda; ışık arkadan geldiği için yönsüz koyu ton tercih edilir
  - MONTMARTRE: 78°
  - DAGRON-INSERT: 143°
  - LANTERN-ODA: lantern gövdesinde 100°
- Çizgi ≥ 2 px, aralık ≥ 6 px (tasarım §0.3). Renk `ink(dolgu)`.
- Hasırın dikey kamışlarıyla tarama arasında ≥ 12° açı farkı olmalı. Aksi halde kafes/örgü okunur. 78° ile 90° arasında fark 12°: sınırda. Sepette tarama yerine **koyu ton bandı** önerilir.

### 0.6 Işık sözleşmesi (tek kaynak → havuz + gölge + tarama)
Güneş (tasarım §1.1): 12 Kasım 09:00, azimut ≈ 135° (GD), yükseklik ≈ 12° → gölge boyu = 4.70 × yükseklik.
Alacakaranlık: batış azimutu ≈ 243° (BGB) [T: 49° enlem, deklinasyon −17.6°, elle hesap]. Gök parıltısı bu yönde.

| Görünüm | Kamera yönü | Anahtar kaynak kadrajda | `Isik` | Gölge (zemin, ekran) |
|---|---|---|---|---|
| PARIS-CATI gün (P10a) | 200° (GGB) | güneş 65° solda, önde (kadraj dışı, sol) | `yonlu` | kümes derinliğinde `yon` ≈ (+4.26, +0.66): uzun gölge **sağa**, hafif kameraya doğru |
| PARIS-CATI alacakaranlık (P01, P11b) | 200° | gök parıltısı 43° sağda, önde, ufukta (kadraj dışı, sağ) | parıltı gölge vermez. Kenar ışığı `#c9b3b8` 2 px, **sağ/üst kenarlarda** | pencere havuzları ikincil `nokta`: yalnız pencere altına küçük elips |
| MONTMARTRE (hepsi) | 180° (G, Paris'e) | güneş 45° solda, önde | `yonlu` | meydan `yon` ≈ (+3.33, +k): gölge sağa ve kameraya doğru (k derinlikten, §2.2) |
| DAGRON-INSERT masa | masaya tepe-önden | pencere sol-üst-arka (kadraj dışı), yükseklik ≈ 35° | `yonlu` | masada `yon` ≈ (+0.86, +1.14): gölge sağ-aşağı (tasarım §1.1) |
| DAGRON-INSERT kafes | 180° (MONTMARTRE ile aynı) | güneş 45° solda, önde | `yonlu` | çubuk gölgeleri kafes tabanında sağa-öne |
| LANTERN-ODA | arka duvara dik | **lantern merceği** (`nokta`), sol-alt, ön | huzme koni | odada gölge veren tek kaynak. Perdeden yansıyan ışık gölgesiz dolgu. Kapı ışığı yalnız kapı çevresinde, gölge vermez (tasarım §1.1) |
- Kamera yönleri ekranda görünmez; yalnız ışığın kadrajdaki yerini belirler. Kuş ve balon ekran yönleri (soldan sağa) yönetmenin kuralıdır, pusulaya bağlanmaz.

### 0.7 Paris 1870 imzası: karar ve gerekçe
- **Karar:** şehir imzası yapı tipinden kurulur, anıttan değil.
  - Haussmann cephesinin tepesi: sürekli korniş, mansard ve lucarne sırası, baca kümesi + baca külahı (mitron) dizisi, çinko teras.
  - Bunlar bir arada Paris çatısını (les toits de Paris) okutur [G].
- **Anıt silueti çizilmez:** Notre-Dame, Panthéon, Invalides, Saint-Sulpice ve inşaattaki Opéra.
  - (1) `arastirma.md` bunların görünürlüğünü doğrulamıyor.
  - (2) Notre-Dame'ın kulesi 1870'te var (1859'da bitti [G]). Kanal kuralındaki "kule yok" 1786–1860 arası içindir; yanlış uygulanma riski var.
  - (3) Kamera yönü (GGB) ile hangi anıtın kadrajda olacağı hesaplanmadı.
  - İstenirse açık soru 1.
- **Yok (kesin):** Eyfel Kulesi (1889), Sacré-Cœur (1875 sonrası), gaz/sokak lambası (tasarım G13), bayrak, tricolore, tabela yazısı, kırmızı tuğla, pirinç/altın metal.
- **Ses kapalı ilk 0.5 sn (P01 f0):**
  - Kehribar kılıf, koyu kümes açıklığının önündedir.
  - Kamera geri çekilmeye başlayınca (f0–70) çinko kenet çizgileri ve baca külahı dizisi kadraja girer: "çatı".
  - "Paris" okuması f70–170'te gelir: mansard, lucarne'larda ışık ve siluetler.

---

## 1. KE-PK-S1 PARIS-CATI (P01, P10a, P11b)

### 1.1 Duygusal amaç ve görsel dil
- **Amaç:** kuşatılmış şehrin tepesinde tek kapı gökyüzüdür. Kalabalık şehir pencerelerden bakıp bekler; kuş tek başına, ışığa doğru gider.
- **Görsel dil:**
  - **Baskın şekil:** sol-alttan sağ-üste diyagonal. Kütle (kümes, baca kümesi) sol-altta, boşluk (gök, parıltı) sağ-üstte.
  - **Ritim:** iki kat yatay dizi (lucarne sırası, baca külahı tarağı) ve ön zeminde VP'ye yakınsayan çinko kenetleri.
  - **Renk sıcaklığı:** soğuk mor-lacivert. Tek sıcak nokta kılıftır. Pencereler soluk kremdir (sıcak değil).
  - **Kontrast:** yüksek. Siluet ile parlak pencere arasında; gök basamakları alçak kontrastlıdır.
  - **Boşluk:** üst sağ çeyrek.

### 1.2 Mimari kart: Haussmann sonrası Paris çatısı (1870)
| Madde | Değer |
|---|---|
| Dönem ve üslup | İkinci İmparatorluk, Haussmann yeniden yapılanması 1853–1870 [G]. Haussmann Ocak 1870'te görevden alındı, işlerin çoğu bitmişti [G]. 1859 yönetmeliği: ≥ 20 m genişlikte sokakta cephe ≤ 20 m, çatı 45° zarf içinde [G, doğrulanmalı]. Kanal kuralındaki "Haussmann öncesi düzensizlik" burada **geçerli değil** (tasarım §9.3). Aynı sırada bitişik binalar arasında küçük farklar kalır (aks aralığı, baca yeri) |
| Yapı tipi | Bulvar boyu kira apartmanı (immeuble de rapport): zemin + asma kat (dükkân), 2. kat "soylu kat" (sürekli balkon), 3.–4. kat, **5. kat (sürekli balkon)**, korniş, mansard (6. kat, hizmetçi odaları) [G]. Kamera teras kotunda olduğu için yalnız 5. kat tepesi ve yukarısı görünür |
| Kat ve çatı ölçüleri [T, G'den] | Korniş = 0 m kabul. 5. kat pencereleri −3.0…−0.9 m. Korniş taşması 0.6 m, yüksekliği 0.5 m. **Brisis** (mansardın dik alt yüzü) 0…+2.8 m, eğim 70°, arduvaz sıraları. **Lucarne** 0.9 × 1.3 m, eşiği +0.6 m, her pencere aksında bir tane. **Teras** (terrasson) +2.8…+3.4 m, çinko, %10 eğim; kırık çizgisinde yuvarlak çinko kenar. **Baca kümesi** (souche) ortak duvarlar üstünde: 0.8 m genişlik × 1.6 m yükseklik (teras üstü), düz başlık 0.1 m, üstünde **6–10 baca külahı** (ø 0.25 m, boy 0.4 m) tek sıra |
| Aks ve bina ritmi | Aks aralığı 3.0 m (bina A), 3.2 m (bina B), 2.9 m (bina C). Bina cephesi 15–18 m, aralarında baca kümesi. Korniş ve 5. kat balkonu **kesintisiz** (Haussmann imzası). Lucarne sırası bina değişiminde bir aks kayar |
| Süsleme imzası (en çok 2) | (1) **5. kat sürekli demir balkonu:** düz üst kayıt + dikey çubuklar (aralık 0.12 m). Desen ve kıvrım yok: geniş alanda örgü okunmasın (CLAUDE.md). (2) **Baca külahı tarağı.** Konsol, maskaron, alınlık yok |
| Malzeme [G] | Cephe: krem kesme taş (Lütesyen kireçtaşı, "pierre de Paris"), 0.5 m sıra. Brisis: arduvaz. Teras: çinko. Baca: sıva. Malzeme adı ekrana yazılmaz, ton ve dokuyla okunur (tasarım G2) |
| Baca külahı rengi | Gerçekte pişmiş toprak, kırmızımsı [G]. **Bölüm kuralı gereği soğuk gri** (tasarım: kırmızı yok, tuğla kırmızısı yok). Siluet ve sıra korunur, renk korunmaz. Bilinçli sapma: imza tekliği ve kırmızı yasağı tarihî renkten önce gelir |
| Panjur / pancur | Çizilmez. Haussmann döneminde katlanır demir panjur pencere içine katlanırdı [G]. Ayrıca Blanc'ın Haussmann öncesi panjur imzasıyla karışmasın |
| Kümes | Tasarım §4.4 (alçak ahşap kulübe, tek eğimli çatı, iniş tahtası, 3 giriş, yan el kapağı). Yeri: **kendi terasımızda, sol baca kümesinin rüzgâr gölgesinde** [T, kaynaksız: "lofts in Paris" [A]]. Ölçü: 1.2 (en) × 0.8 (derinlik) m; ön saçak 0.90 m, arka 1.05 m (eğim öne iner). İniş tahtası yerden 0.42 m, 0.25 m öne taşar. Açıklıklar 0.47–0.63 m. Tahtalar dikey |
| Kameradan görünen | Kamera kendi terasımızda, göz teras üstü **1.0 m** (çömelmiş kümesçi). Görünenler: teras yüzeyi (çinko kenetleri), kümesin ön yüzü ve ince bir şerit çatı yüzeyi (göz ön saçağın 0.1 m üstünde), kendi kırık çizgimiz (Z 5 m). Karşı binada (Z 26 m): teras yüzeyinin ince şeridi, baca kümeleri, brisis + lucarne'lar, korniş ve 5. kat pencerelerinin yalnız üst 30 px'i. Karşı cephenin geri kalanı ve sokak, kendi kırık çizgimizin arkasında kalır. Uzak çatılar: ufkun hemen altında teras çizgisi, ufkun üstünde baca tarakları |

### 1.3 Kamera modeli: dolly (cs = kamera mesafesi)
- **Taban (cs 1):** F = 1326 px, göz e = 1.0 m (teras üstü), kümes ön yüzü Z_k = 3.0 m → **kümes düzlemi 442 px/m**, **ufuk y 739** (dekor).
- **Dolly:** cs, kamerayı kümese doğru δ kadar ilerletir, δ(cs) = 1.31·(1 − 1/cs) (Z_k biriminde). Katman i'nin taban derinlik oranı d_i = Z_i / Z_k ise ölçek `s_i = d_i / (d_i − δ)` olur. Ölçek merkezi (540, 960); cx/cy sonra eklenir. **d_i − δ < 0.1 olan katman çizilmez** (kameranın arkasında kalır). Kenar örneği: ön baca, cs ≈ 1.6'da kadrajın dışına kayar.
- Json `cs` değerleri ve sinirlar aralığı aynen kalır. Yalnız anlamı değişir: kümes ölçeği değil, kamera mesafesi.

| cs | kamera–kümes | s kümes (d 1) | s karşı bina (d 8.7) | s uzak (d ≥ 20) | kılıf | kuş | el |
|---|---|---|---|---|---|---|---|
| 1.0 | 3.00 m | 1.00 | 1.000 | 1.00 | 32 px | 141 | 84 |
| 1.2 | 2.35 m | 1.28 | 1.03 | 1.01 | 41 | 181 | 107 |
| 1.8 | 1.25 m | 2.39 | 1.07 | 1.03 | 76 | 339 | 201 |
| 2.1 | 0.94 m | 3.19 | 1.09 | 1.04 | 101 | 451 | 268 |
| 2.4 | 0.71 m | 4.24 | 1.10 | 1.04 | 135 | 600 | 356 |
| 2.75 | 0.50 m | 6.01 | 1.11 | 1.04 | 191 | 850 | 505 |
| 3.2 | 0.30 m | **10.06** | 1.12 | 1.05 | **320** (%17, tasarım ✓) | 1423 | 845 |
| 3.3 | 0.26 m | 11.5 | 1.12 | 1.05 | 366 | 1626 | 966 |
- **Sınır:** cs ≤ 3.3. Kümes katmanı 4.2'de ıraksar; 3.3 üstünde ölçek çok hızlı değişir.
- **Kılıf kilidi:** P01 f0 ve P11 son kare, cs 3.2 / cx 0 / cy 0. Kılıf merkezi **dekor (540, 960)**, ölçek merkezinin tam üstünde. Bu yüzden ekranda da (540, 960)'ta durur ve P01 ↔ P11 ±0 px eşleşir (tasarım K1: ±6 px). Kılıf, kümes ön yüzünden 0.15 m önde kuşun kuyruğundadır; kümes katmanında sayılır (d = 1).
- **Geri çekilmenin görüntüsü (P01 f0–300):** kümes ×10'dan ×1'e küçülür. Karşı cephe ×1.12'den ×1'e. Gök sabit. Ön baca f≈170'te (cs ≈ 1.6) soldan kadraja kayar ve ön-plan çerçevesi olur. Bu fiziksel bir geri çekilmedir; saf zoomun "düzlem büyür" hissi oluşmaz.

### 1.4 Katmanlar (dekor px, cs 1). Yukarıdan aşağı, arkadan öne
| # | Katman | d (Z/Z_k) | İçerik ve konum |
|---|---|---|---|
| 0 | Gök | ∞ | 3 düz basamak (tasarım §1.2/§1.3). Alacakaranlık sınırları: tepe → orta **y 330**, orta → ufuk **y 600**. Ufuk basamağının üst kenarı sağa doğru 60 px yükselir (parıltı batıda, sağ-önde). Basamak kenarı düz çizgi, gradyan yok. Gün: tepe → orta y 300, orta → ufuk y 640 |
| 1 | Uzak tepe çizgisi | 3300 | Alçak, yumuşak tek siluet: y 703–739, stilize ×3. Bina yok [G: GB'de Meudon/Saint-Cloud sırtları; nötr, isteğe bağlı] |
| 2 | Uzak çatı denizi | 100 | Teras çizgisi y 741–744. Baca tarağı ≤ 10 px. Düz ton |
| 3 | Orta çatı denizi | 40 | Teras çizgisi y 744. Tarak y 717–744 (baca kümesi ≈ 20 px, aralık 120–220 px, seed). Düz ton, kenar ışığı yok |
| 4 | Yakın çatı denizi | 20 | Teras y 748. Tarak y 704–748 (35–44 px). Baca külahları ayrı ayrı (3–4 px). Alacakaranlıkta sağ kenarlarda 2 px kenar ışığı |
| 5 | **Karşı bina sırası** | 8.7 (Z 26 m, 51 px/m) | x −640…1720. Üç bina: A x −640…250 (aks 3.0 m = 153 px), B 250…1050 (3.2 m = 163 px), C 1050…1720 (2.9 m = 148 px). Satırlar: baca külahı tepesi **y 678**, baca kümesi tepesi 698, teras şeridi 759 (teras çizgisi), lucarne üstü **831**, lucarne eşiği **902**, korniş **933** (taşma çizgisi + altında 26 px gölge bandı), 5. kat pencere üstü 974. **y 1004'ten aşağısı kendi kırık çizgimizin arkasında kalır.** Baca kümesi 41 px geniş; külahlar 13 × 20 px, 6–10 tane |
| 6 | Kendi kırık çizgimiz | 1.67 (Z 5 m) | **y 1004** boyunca yatay çinko kenar: 6 px açık ton + altında 4 px koyu. Hafif yay yok; kenar düz |
| 7 | Sağ baca kümesi (kendi binamız) | 2.67 (Z 8 m, 166 px/m) | x 960–1093 (0.8 m), taban y 905, gövde tepesi 640, külahlar 574–640 (4 tane). Sağ kenarda dikey vurgu |
| 8 | **Kümes + kuş + kılıf** | 1 (Z 3 m, 442 px/m) | Kümes x **142–673**, teras teması **y 1181**, ön saçak y 783, arka saçak (Z 3.8) y 722. İniş tahtası üst yüzü y 995, öne 0.25 m (ön kenarı Z 2.75: ekranda 22 px aşağıda, y 1017). Açıklıklar y 902–973 (x 330, 430, 530 merkezli, 53 × 71 px). El kapağı sağ yan yüzde x 640–673 (görünür yan yüz 33 px; derinlik kısalması). Kuş: kuyruk ucu ≈ (520, 960), gövde sağa x 540–681. **Kılıf merkezi (540, 960)**. Kümes gölgesi: gün sağa uzun (4.7 × yükseklik, 1870 px, kadrajdan taşar). Alacakaranlıkta gölge yok; yalnız temas koyuluğu (8 px bant) |
| 9 | Teras zemini (ön) | 0.33–1.3 | y 1181 → 1920 (Z 3 → 0.99 m). Çinko kenet çizgileri VP (540, 739)'a yakınsar. Kenet aralığı 0.6 m (taban ölçekte y 1920'de ≈ 800 px; ekranda en çok 4 kenet görünür). Kenet 6 px (yakın) → 3 px (kümes dibi) |
| 10 | **Ön baca kümesi (ön-plan çerçeve)** | 0.533 (Z 1.6 m, 829 px/m) | x −200…297 (0.6 m), taban y 1568, gövde tepesi 573, başlık 573–490, külahlar 490–241 (2 tane, ø 0.25 → 207 px). cs 1'de ekranın sol kenarını çerçeveler ve sol üçte biri doldurur. cs ≥ 1.6'da kadrajın dışındadır (dolly) |
| — | Siluetler (F1) | 8.7 | **5 siluet, 4 lucarne'da.** Karşı bina, kümesin sağında (cs 1, cx −60'da ekran x 700–1110): (a) x 760, (b) x 920, (c) x 1083 (iki kişi: `yetiskin-a` + `cocuk`). (d) solda, ön bacanın sağında x 220 (yarısı görünür). Bel yukarı 0.8 m = 41 px. Hepsi sağ-üste bakar (tasarım §3.1: hareketsiz) |
- **Pencere ışığı:** lucarne'ların **%60'ı ışıklı** (seed). Işıklı iç `#e6d8bd`, ışıksız iç `#2e2c3e` (alacakaranlık) ya da cam `#6f7f8c` (gün). Her ışıklı lucarne'ın altında, brisis üstünde küçük havuz: rx 0.7·w, ry 0.18·h, `#e6d8bd` α .18. Siluetler ışıklı pencerenin önünde, kontur yok.
- **Kuşun yolu (P01 f24–330):** kümesten sağ-üste. Kuş derinleşir (Z 3 → 9 m); ekran boyu kamera geri çekilmesiyle birlikte %6'ya iner (tasarım). Gök üstünde düz `#8f949a`, sağ/üst kenarlarda kenar ışığı. Kılıf hep görünür (≥ 24 × 9 px).

### 1.5 Ekrandaki okuma (cs 1, cy −160, cx −60: P01 geniş son kare)
- Ufuk ekran y 579. Karşı bina bandı 518–844. Kümes 562–1021 (x 82–613). Kendi kırık çizgimiz 844.
- Alt üçte bir (1280–1920): teras kenetleri, ön bacanın dibi, kümesin dibi ve temas koyuluğu.
- Üst üçte bir (0–640): gök basamakları, ön bacanın külahları (y 81–330), karşı baca tarağı, sağ baca kümesi.
- **Ölü alan yok.**
- Yazı üst bandı (240–400) gökte; altında yalnız ön bacanın tepesi kalır (dokunuş değil).
- **Kuş çıkışı:** sağ-üst kenar x ≥ 1000, y ≤ 300 (IG sütunu ve üst UI dışında son 10 kare).

### 1.6 Saat varyantları (palet tasarım §1.2/§1.3 + bu belgenin ekleri)
| Yüzey | Alacakaranlık ışık / gölge | Gün ışık / gölge | Kaynak |
|---|---|---|---|
| Gök tepe / orta / ufuk | `#232840` / `#4a4663` / `#a58e98` | `#8d9aa6` / `#aab4bc` / `#d4d2c8` | tasarım |
| Uzak tepe | `#6e6680` | `#9ea4ac` | **yeni** |
| Uzak / orta çatı denizi | `#5a5670` / `#4a4c5e` | `#9ea4ac` / `#8a919b` | tasarım + **yeni** |
| Krem taş (karşı cephe) | `#a49fa8` / `#6d697d` | `#d8cdb4` / `#a89d86`, tarama `#7c7260` | tasarım |
| Mansard brisis | `#5f6578` / `#454a5c` | `#737b8a` / `#59606e` | tasarım |
| Çinko teras (ön) | `#565a6e` / `#3f4356`, kenet `#33374a`, kenet üst kenarı `#c9b3b8` α .45 | `#8e949c` / `#6a707a`, kenet `#565c66` | **yeni** |
| Baca kümesi (sıva) | cephe tonu `#a49fa8` / `#6d697d` | `#c8bfa9` / `#968c78` | tasarım + **yeni** |
| Baca başlığı / külah | `#3f4254` / `#4a4c5e` | `#5f6168` / `#5f6168` | tasarım + **yeni** |
| Pencere ışığı / ışıksız / cam | `#e6d8bd` / `#2e2c3e` / — | — / — / `#6f7f8c` | tasarım + **yeni** |
| Demir balkon, kasa | `#2f2f35` / `#3a3a4c` | aynı | tasarım |
| Kümes ahşap / çatı | `#6b6570` / `#4b4754` · `#454a5c` | `#7a7468` / `#4f4a42` · `#59606e` | tasarım |
| Siluet | `#262434`, kenar `#c9b3b8` | `#3a3632`, kenar `#efe6cc` | tasarım |
Yeni hex'lerin hepsi ölçüldü (sRGB→Lab D65): imzaya ΔE76 ≥ 53, b\* ≤ 15.7. Hiçbiri "b\* > 26 ve L\* > 55" koşulunu taşımaz. Kırmızı yok.

### 1.7 Malzeme ve doku (PARIS-CATI)
| Yüzey | Malzeme | Doku tarifi | Kod yöntemi | Parametre |
|---|---|---|---|---|
| Karşı cephe | krem kesme taş | 2 sırada bir yatay derz (orta sınıf), düşey derz yok. Korniş altında gölge bandı + II tarama | `TasDuvar` yeni tip `parisHaussmann` (bulut kapalı) | blok [180, 90] (yakın ölçek); derz 2 px, α .5; seed 151 |
| Brisis | arduvaz | yatay sıra çizgisi, aralık 0.25 m (13 px). Lucarne yanaklarında kesilir | `CatiOrtusu` `arduvaz` + palet override | sıra 13 px, çizgi 1.5 px (360'ta 0.5: sınırda; uzakta her 2. sıra) |
| Teras (karşı, uzak) | çinko | düz ton, kenet yok | düz dolgu | — |
| Teras (ön) | çinko | dikey kenet (tasseau) çizgileri VP'ye yakınsar. Kenet = ışık kenarı + gölge kenarı çifti. Panel yüzünde 2 ton bant yok, düz. Hafif 3 su izi (yalnız gün, α .08) | yeni `CinkoTeras` | kenet 0.6 m, çizgi çifti 6+4 px (yakın), seed 151 |
| Baca kümesi | sıva + külah | gövdede 1 kabarma lekesi (α .10), başlık düz plaka. Külah: silindir, üst kenarı elips | yeni `BacaKumesi` | külah sayısı 6–10, seed; `detay: uzak/orta/yakin` |
| Kümes | ahşap tahta | dikey tahta, aralık 0.12 m. Tahta başına ±4% ton (seed). Damar çizgisi yalnız cs ≥ 2.4'te, 2 px, α .25. Budak yok. İniş tahtasının ön kenarında aşınma bandı | `AhsapYuzey` `BOYALI` → soğuk gri-kahve override | seed 152 |
| Pencere camı (gün) | dalgalı cam | 45° tek yansıma şeridi, α .15. Kayıt çizgisi 2 px | düz (orta ölçek); `PencereEskiCam` gerekmez | — |
| Gren / lif | kâğıt | `ArsivKatmani` | `geceLapis` (alacakaranlık) / `gunduzMineral` (gün) | lif .13 / gren .12 (alaca), .14 / .08 (gün) |
- Tarama: korniş altı (II), lucarne yanağının sağ (gölge) yüzü (II), baca kümesi gölge yüzü (II), kümes saçak altı (III), açıklıkların içi (IV, kutu ≤ 120 px). Gün θ 72°. Alacakaranlıkta yalnız açıklık içi ve saçak altı koyu tonla.

### 1.8 360 px okunurluk ve yasak benzerlik (PARIS-CATI)
| Öğe (P01 geniş, cs 1) | Telefonda | Okunur mu |
|---|---|---|
| Lucarne | 15 × 22 px; ışıklıysa parlak dikdörtgen | Evet. Siluet 14 px (bel yukarı) okunur, yüz yok |
| Baca külahı tarağı | baca kümesi 14 × 20 px + külahlar 4 × 7 px | Evet: "tarak" |
| Karşı korniş + balkon | 2 px koyu çizgi + 9 px gölge bandı | Evet (uzun yatay) |
| Kümes | 177 × 153 px. Açıklıklar 18 × 24, iniş tahtası 3 px | Evet: "küçük kulübe" |
| Kılıf (cs 1, kuş kalkmışken) | ≥ 8 × 3 px | Tek sıcak nokta; tasarım §2.2 ölçüsü |
| Ön baca | 99 × 440 px | Ön plan çerçevesi |
**Yasak benzerlik:**
| Benzerlik | Neden olur | Önlem |
|---|---|---|
| Haussmann öncesi Paris (Blanc kiti) | farklı korniş yükseklikleri, yarı ahşap, ipe asılı fener | korniş ve balkon **kesintisiz düz**; yarı ahşap, fener ve panjur yok |
| Fabrika bacası / sanayi | tek yüksek baca | baca kümesi **geniş ve alçak**, her zaman sıra halinde külah |
| Kale | düz terasta diş gibi tarak | külahlar silindir, üst kenarı elips; kümeler arası aralık düzensiz |
| Kuş evi / oyuncak | kümes çok büyük ya da renkli | kümes soğuk gri-kahve, iniş tahtası düz, süs yok |

---

## 2. KE-PK-S2 MONTMARTRE (P03, P06b, P07)

### 2.1 Mimari kart: Place Saint-Pierre, Montmartre eteği (1870)
| Madde | Değer |
|---|---|
| Kaynak durumu | Kalkış yeri: Montmartre Place Saint-Pierre, tepenin eteği [A: SP-N, IRSEM, RT]. Nadar/Dartois/Duruof şirketi burada [A]. **1870 görünümü doğrulanamadı** (değirmen, bahçe, yamaç evleri) [A §5.1]. Sacré-Cœur yok (1875 sonrası) [A §5.1, G güçlü] |
| Karar | **Kamera güneye, Paris'e bakar; tepe kameranın arkasındadır.** Gerekçe: (1) doğrulanmamış tepe görünümü çizilmez. (2) Sabah güneşi sol-önde kalır (§0.6). (3) P07'de altta küçülen Paris çatıları yönetmenin alt üçte birini doldurur. Meydanın kimliği balon, kumaş, hortum ve sepetten gelir, yapıdan değil |
| Dönem ve üslup | Montmartre 1860'ta Paris'e katıldı [G]. Meydan kenarı Haussmann değil, **eski kasaba/varoş evleri**: 2–3 kat + çatı, sıvalı, düz lentolu pencere [G, nötr]. Haussmann cephesi burada çizilmez (PARIS-CATI ile ayrışma) |
| Yapı tipi | Açık meydan, hafif güney eğimi [T]. Sol ve sağ kenarda birer yan ev (Z 30–45 m). Güney kenar açık; Paris aşağıda kalır |
| Yan evler | 3 kat (her biri 3.0 m) + basit kırma çatı (eğim 35°, gri). Pencere 1.0 × 1.6 m `duz`, 3 aks. Söve, balkon, panjur, tabela yok [G nötr] |
| Zemin | **Sıkıştırılmış toprak + seyrek çakıl**, 3 tekerlek izi [T: kaynaksız, nötr; "kaldırım taşı" iddiası yok]. Tasarım tonu `#8d836f` |
| Ağaçlar | Kış, çıplak, 2 tane (sol ve sağ kenar). Gövde + 3 kademeli dal. Tür iddiası yok [G] |
| Kalabalık | P03 isteğe bağlı: 6–8 kompars siluet (F1), sol ve sağ grup, ip hattı yok. Kaynakta kalabalık yok; sahne planı "kalabalık" demiyor, görev brifi diyor → varsayılan **6**, hareketsiz, baş balonu izler |
| Kameradan görünen | `meydan`/`yukleme`: göz 1.6 / 1.0 m. Yan ev çatılarının yalnız saçak altı ve çatı kenarı görünür (alçak kamera, ev uzak: çatı yüzeyi ince şerit). Paris ufkun hemen altında ince bir bant. `gok`/`sepet`: kamera havada, Paris çatıları yukarıdan |

### 2.2 Görünüm `meydan` (P03, f0–160): şişme ve kalkış
- **Amaç:** büyüme ve umut. Yerdeki kumaş yığını gökyüzünü dolduran küreye döner; dikeylik artar.
- **Görsel dil:** yatay zemin bandı, ortadan yükselen tek büyük daire. Simetriye yakın ama hortum soldan girdiği için sola ağırlıklı. Soğuk açık gök ile krem küre arasında kontrast düşük; kontur ve terminatör şart (tasarım §4.1).
- **Kamera:** F 1500, göz e = 1.6 m (ayakta). Balon düzlemi Z 16.7 m, 90 px/m. **Ufuk y 1300** (kamera 8° yukarı bakar). Ayakta yetişkinin başı ufukta (kural ✓).
- **Konumlar (dekor):**
  | Öğe | Konum |
  |---|---|
  | Balon zemin teması (sepet tabanı) | **y 1444**, x 540 |
  | Sepet | 108 × 86 px (1.2 × 0.95 m), x 486–594, y 1358–1444 |
  | Küre (dolu) | ø 864 px (9.6 m stilize, tasarım 1:8), merkez (540, 656), y 224–1088. Ağ halkası y 1088, halatlar 1088 → 1358 (3 m) |
  | Kumaş yığını (f0) | x 300–800, y 1380–1460. Buruşuk 5–7 kıvrım; krem `#d9d0b8` / `#b3a98f` |
  | Gaz hortumu | sol kenardan girer (Z 6 m, y 1700) → kıvrılarak (Z 10, y 1540) → boğaza. Ø 0.12 m: önde 30 px, balonda 11 px. Şişme sonunda boğaz y 1088'de |
  | Posta çuvalları | sepette 2 tane (ağızları rim üstünde) + yerde ön planda 2 tane (Z 6–8 m, y 1600–1700, 120–180 px) |
  | Bağ halatı (çözülen) | sepetten sağa, yerdeki kazığa (x 760, y 1450) |
  | Kalabalık | Z 20–25 m, ayak y 1396–1420, boy 102–128 px. Sol grup x 90–330 (3), sağ grup x 760–990 (3) |
  | Yan evler | sol x −120…190, sağ x 900…1200; Z 35 m (43 px/m); taban y 1369, saçak y 982, mahya 908 |
  | Ağaçlar | sol x 200 (Z 28 m, 7 m boy → y 1386–1011), sağ x 860 |
  | Paris bandı | meydanın güney kenarı Z 40 m'de, y 1360. Uzak şehir y 1300–1360 arasında **ince çatı bandı** (`#a9adb0`, baca tarağı `#969ba0` ≤ 8 px). Tepe/anıt yok |
- **Ölü alan:** üst üçte bir = küre (f60 sonrası). f0–40'ta küre küçük; üst üçte birde yalnız gök ve yan ev çatıları var. **Önlem:** f0–40'ta sol ağacın dalları y 600'e kadar uzar (ağaç 9 m) ve gökte 2 basamak sınırı görünür. Kabul edilir: şişme 0.7 sn içinde üst üçte bire ulaşır.
- **Tilt (yönetmen, f116–156, cy 0 → 420):** zemin aşağı kayar; balon kadrajın üstünden çıkar. Dekor gök y −500'e kadar uzar (3. basamak tepe rengi).
- **Gölgeler:** güneş sol-önde, 12°. Sepet gölgesi sağa ve kameraya doğru: yükseklik 86 px → 4.7 × 86 ≈ 400 px uzunluk, ekran yönü (+0.9, +0.25). Küre gölgesi kadraj dışında (kamera arkasına düşer). Kalabalık gölgeleri sağa, 480–600 px.

### 2.3 Görünüm `yukleme` (P06b, f168–287) — YENİ GÖRÜNÜM
- **Neden ayrı:** sahne planı P06 sepet+sandığı %35 (boy plan) ister. Bu, P03'ün 90 px/m'lik dekorunun cs 1.45 ile yakınlaştırılmasıyla elde edilemez (6× fark). Ayrı fiziksel kamera gerekir.
- **Amaç:** ağırlık. Sandık sepeti çökertir, adam bilinmeyene biner. Alçak kamera kütleyi büyütür.
- **Görsel dil:** sepetin yatay kütlesi alt yarıda. Üstte halatlar ve yükleyicilerin kolları dikey çizgiler oluşturur. Sağ-uzakta ikinci balon küçük ama okunur (P07 kurulumu).
- **Kamera:** F 1500, göz e = **1.0 m** (alçak). Sepet ön yüzü Z 2.68 m, **560 px/m**. **Ufuk y 900.** Ufuk ayaktaki her figürü 1.0 m (kalça) hizasında keser; bu fiziksel tutarlılıktır, göz hizası kuralının alçak kamera karşılığıdır.

| Öğe | Konum (dekor, cs 1) |
|---|---|
| Sepet | x 200–872, rim ön kenarı **y 928**, taban **y 1460** (zemin teması, güvenli alan ✓). Hasır dikey kamış aralığı 0.05 m (28 px); 2 yatay sarma kuşağı (y 1060, 1330); kenar bandı 0.05 m |
| Halatlar | rimden 5 halat yukarı (x 260, 400, 536, 672, 812), kadraj üstüne yakınsar (küre kadraj dışında, 3 m yukarıda). Halat 0.02 m → 11 px (yakın sınıf, 6–8 px çizilir) |
| Kum torbaları | sepetin dış ön yüzünde, rimin 0.1 m altındaki halattan asılı 4 tane: x 300, 450, 620, 770. Torba 0.35 × 0.25 m → 196 × 140 px, y 984–1180 |
| Sandık | 0.70 × 0.45 × 0.45 m → 392 × 252 px. İniş f170–190: y 560 → sepet içine oturur. Oturunca üst yüzü rimin 0.05 m altında, görünmez; yalnız kapağı ve 2 kulpu rimin üstünde |
| Yükleyiciler (F1) | sepetin **arkasında**, Z 3.5 m (429 px/m), x 380 ve 700. Bel aşağısı sepetle örtülü. Kollar sandığı rimin üstünde tutar; baş y ≈ 600 |
| Dagron (F2) | sepetin solunda, Z 2.9 m (517 px/m), x 21–279 (sol kenar kısmen kesik), ayak **y 1417**, baş y 538. Sırtı kameraya. Biniş: ayak temas f226 rim sol köşesi (x 220, y 928) |
| İkinci balon | Z 55 m (27 px/m), zemin **y 927**. Sepet 32 px; küre ø 262, merkez (931, 688), y 557–819, x 800–1062. Dibinde 3 küçük siluet (46 px). Ağ 9 meridyen (2 px) |
| Paris bandı | ufkun altında y 900–940, `#a9adb0` düz bant + baca tarağı ≤ 6 px |
| Zemin | toprak, y 940–1920. Tekerlek izleri VP (540, 900)'a yakınsar |
| Ağaç | sol kenar Z 12 m (x 60, 125 px/m), dallar gökte y 200–700 (üst üçte bir dolu) |
- **Ölü alan:** üst üçte bir = ağaç dalları + halatlar + ikinci balon küresinin üst kısmı (y 557+) + yükleyicilerin başları. ✓
- **Gölgeler (güneş sol-önde):** sepet gölgesi sağa ve öne; gölge boyu sepet yüksekliğinin 4.7 katı (2500 px), kadrajın sağ altından taşar. Sağ alt köşe geniş bir gölgede kalır ve alt üçte biri doldurur. Dagron'un gölgesi sepetin önüne düşer.
- **Kamera:** yönetmen cs 1.0 → 1.45, cx 60, cy −80 uygundur. cs 1.45'te ikinci balonun sağ yarısı kesilir; kurulum cs 1.0'da (f168–214) yapılmış olur.

### 2.4 Kalkış meydanının ortak dili (P03 ↔ P06)
Aynı zemin tonu, aynı ağaç, aynı Paris bandı, aynı ışık. Seed 157. İki görünüm aynı meydanın iki kamera mesafesidir. P06'da yan evler kadraj dışında kalır (yakın kamera).

### 2.5 Görünüm `gok` (P07 A, f0–160): iki balon, vurulan
- **Amaç:** açıkta, savunmasız. Gökte iki küçük küre; aşağıda düşman menzilindeki şehir.
- **Görsel dil:** üst yarıda iki daire (sol büyük, sağ küçük). Alt yarıda VP'ye yakınsayan çatı blokları ve tek bir **diyagonal bulvar** (Haussmann imzası, yukarıdan). Soğuk ve açık.
- **Kamera:** F 1500, kamera havada (sanatsal bakış noktası), yatay bakış, **ufuk y 760**. Kamera yüksekliği H: f0 → 158'de **60 → 140 m** (yer küçülür). Zemindeki çatı noktası: `y = 760 + (H − 20)·1500/D` (D: yatay uzaklık, çatı kotu +20 m).

| Öğe | Konum |
|---|---|
| Dagron balonu (sol) | Z 30 m (50 px/m): küre ø 480, sepet 60 px, halat 3 m = 150 px. Sepet (300, 1010) → küre merkezi (300, 560), y 320–800. Yükseliş: ekranda yavaş yukarı, f158'e kadar −120 px |
| Öteki balon (sağ) | Z 45 m (33 px/m): küre ø 320, sepet 40 px. Sepet (760, 960) → küre (760, 660), y 500–820. Darbe f108, delik ve çökme (tasarım §5). Sepet f120–152 düşer, alt kenardan çıkar (y > 1920) |
| Paris (yukarıdan) | D 100–3000 m. f0 (H 60): D 200 → y 1060, D 300 → 960, D 1000 → 820. f158 (H 140): D 300 → 1360, D 600 → 1060. Bloklar: krem cephe şeridi + gri mansard üçgeni. Bulvar: bloklar arasında 2.5× geniş yarık; açık zemin `#a8a395` ve iki sıra çıplak ağaç noktası `#6a6a62` |
| Hava perspektifi | D > 1500 m düz bant; ufka doğru 3 ton: `#a9adb0` → `#c4c6c2` → ufuk `#d4d2c8` |
- **Ölü alan:** üst = küreler, alt = çatılar. ✓ (sahne planındaki "sis" çizilmez: tasarım "kar, bulut, sis yok"; yerine hava perspektifi.)
- **Darbe dili:** tasarım §5. Duman sütunu kadraj altından, yani çatıların arasından yükselir.

### 2.6 Görünüm `sepet` (P07 B, f160–336): balast
- **Amaç:** soğukkanlı hesap. Bakmadan atılan torba, hafifleyen sepet, uzaklaşan yer.
- **Görsel dil:** yatay rim çizgisi ekranı ikiye böler. Üstte gök ve halatların dikeyleri, altta hasır kütlesi ve asılı torbaların ritmi.
- **Kamera:** F 1500, sepetin önünde havada (sepetle birlikte hareket eder). Sepet ön yüzü Z 2.97 m, **505 px/m (cs 1)**; cs 1.3'te 657 px/m (torba %12 ✓). Göz rimin 0.3 m üstünde → **ufuk y 668**, **rim y 820**, sepet tabanı y 1300 (kadrajda).
- **Kamera yüksekliği:** f160–250 sabit H 150 m. f250–320: H 150 → 300 m. Çatı noktası `y = 668 + (H − 20)·1500/D`. H 150: D 600 → 993, D 1500 → 798. H 300: D 600 → 1368. Şehir aşağı kayar ve küçülür.

| Öğe | Konum |
|---|---|
| Rim | x 0–1080 (sepet 1.2 m = 606 px; cs 1.3'te 788 px; sepet x 237–843, kadrajın yanları gök + şehir) |
| Torbalar | 4 tane, x 300, 440, 600, 760. Asılma y 870, torba 177 × 126 px (cs 1), y 870–1047 |
| Halatlar | rim köşelerinden ve ortadan 4 halat yukarı yakınsar (kadraj üstü); 8–10 px |
| Dagron eli | rimin üstünden sağdan, sepya manşet (tasarım §3.2), torba düğümüne. Bırakma temasları f196, f214 |
| Düşen torba | sepet ön yüzünün önünden aşağı, kadraj altından çıkar (y > 1920), 1 tur dönüş. Kum izi `#bdb3a0` 3 px, 20 kare |
- **Ölü alan:** üst üçte bir = 4 halat + gök basamakları + uzak ufuk bandı (y 640–668). Yeterli. Halatlar ≥ 8 px kalın ve diyagonal olmalı.
- **"Ateş menzili çizgisi"** (sahne planı P07 B): tasarım bulut ve sis yasaklıyor. Çizilecekse **düz kesik mürekkep çizgisi** (4 px, 22/16) gökte yatay. Bu bir harita dili ödünçlemesidir: yönetmen/tasarımcı kararı (açık soru 3). Varsayılan: çizilmez.

### 2.7 Malzeme ve doku (MONTMARTRE)
| Yüzey | Malzeme | Doku tarifi | Kod yöntemi | Parametre |
|---|---|---|---|---|
| Meydan zemini | sıkıştırılmış toprak | 2 ton (ışık `#8d836f` / gölge `#6e6656`). 3 tekerlek izi `#7a7262` VP'ye yakınsar. Çakıl: 40 nokta, 3–6 px, `#9a9384`, yalnız Z < 10 m | yeni `MeydanZemin` | seed 157, çakıl yoğunluğu 40 / ekran |
| Yan ev | sıva | düz ton `#b8b0a0` / `#8a8274`. Kabarma lekesi 1 tane α .10. Saçak altı II tarama | düz + `Tarama` | — |
| Yan ev çatısı | gri (malzeme nötr) | `#6a707c`, sıra yok | düz | — |
| Paris bandı | uzak çatılar | düz ton + tarak | `CatiDenizi` (PARIS-CATI ile aynı modül, `detay: uzak`) | seed 158 |
| Ağaç | çıplak | gövde + 3 kademe dal, uçlar 2 px. Işık yüzünde dal kenarı yok | yeni `CiplakAgac` (seed) | dal 3 kademe, seed 159 |
| Sepet hasırı | kamış + sarma | dikey kamış 28 px aralık (yakın), 2 yatay kuşak. Gölge yüzü (sağ) düz koyu bant `#5a4a3a` (tarama yerine) | yeni `Sepet` (DAGRON-INSERT `kafes` ile ortak) | `cokme` 0–1 (alt kenar 3–4 px içe, kamış kavisi), seed 160 |
| Halat | kenevir (nötr) | düz `#8a7a62`, gölge kenarı `#5a4e3e` 2 px | çizgi | gevşek: sarkma (`asiliNesne`) |
| Balon küresi | pamuk + vernik [A] | tasarım §4.1 (ağ, terminatör, vernik hilali) | motion (N1) | — |
| Havadan Paris | bloklar | blok = krem dikdörtgen + gri üçgen mansard, satır başına seed. Bulvar diyagonali | yeni `HavadanSehir` | seed 173, blok 0.6–1.4 × 15 m |

---

## 3. KE-PK-S3 DAGRON-INSERT (P04b, P05, P09)

### 3.1 Görünüm `masa` — mimari kart (yüzey)
| Madde | Değer |
|---|---|
| Kaynak durumu | Dagron'un Paris atölyesi ve Tours büroları görsel olarak kaynaksız [A §5.4]. Küçültme cihazı kaynaksız (tasarım G10) |
| Yapı | Ağır ahşap çalışma masası: 4 tahta, **tahtalar soldan sağa** (damar yatay), tahta eni 0.22 m, derz 3 mm. Ön kenarda 0.04 m pah, aşınma bandı. Masanın arkasında badana duvar (yalnız cs 1'de, üst %33) |
| Paris atölyesi (P05) | duvar `#b9b3a2`. Sol üstten pencere ışığı duvarda yamuk (`AciklikIsigi`, `#cfcabb`). Duvarda 1 ahşap raf: y 330, 2 kapalı ahşap kutu + kâğıt destesi. Şişe, cam tüp ve kimyasal yok (tasarım §2.4: başka sarı silindir yok) |
| Tours masası (P09) | aynı masa (tasarım §9.5). Fark: çalışma alanında **koyu gri keçe altlık** (sumen) `#4a4e54`, 0.45 × 0.32 m [T]. Gerekçe: kehribar kılıf soğuk koyu zeminde en yüksek ayrışmayı alır (ahşap da sıcak tonlu). Mektup yığını solda, şerit yığını sağda (json) |
| Kameradan görünen | Tepe-önden: kamera masanın 0.42 m üstünde, 35° aşağı bakar. Ön kenar kadrajın altında (json `on_kenar_y 2000` ✓). Masa arka kenarı y 627, duvar y 0–627 (yalnız cs 1). cs ≥ 1.5'te duvar kadrajdan çıkar |

### 3.2 `masa` kamera ve ölçek (perspektif masa düzlemi)
- F 1176, yükseklik 0.42 m, eğim 35°. Masa ufku y 137. Masa düzleminde ölçek **s(y) = 1.966·(y − 137) px/m** (cs 1, dekor).
  | y | 700 | 900 | 1000 | 1180 | 1250 | 1360 | 1480 |
  |---|---|---|---|---|---|---|---|
  | px/m | 1107 | 1500 | 1697 | 2051 | 2188 | 2404 | 2640 |
- **Masa üstündeki nesneler** yüksekliklerine göre büyür: `s_h = s(y)·0.42/(0.42 − h)` (aynı ışın). Örnek: avuçta 5 cm yukarıdaki kuş için ×1.14.
- **Tasarım stilize çarpanlarıyla bağ:** terazi, kutu ve sayfa bu ölçekte **gerçek ölçüde** çizilince tasarımın ekran boylarını zaten verir. Bu yüzden ×1.5 / ×1.4 çarpanlarına gerek kalmaz (tasarımcıya not, §7).
  - Terazi kolu 0.35 m @ y 1000: **594 px** (tasarım 560 ✓).
  - Sayfa 21 cm @ y 1360: **505 px**.
  - Şerit 6.4 cm (×1.6, tasarım): cs 2.0'da 280 px.
  - El 0.19 m: cs 2.0'da y 1250'de 831 px.

| P05 öğe | Önerilen konum (taban teması, dekor) | Ekran (cs 1) | Not |
|---|---|---|---|
| Terazi | **(380, 1000)** (json 300 → 380: sol yan güvenli alan) | kol 594 px, x 83–677. Dikey yükseklik 0.30 m → ≈ 407 px (y 1000 → 593) | Kefeler kolun iki ucunda; destesi solda, kuş sağda |
| Mektup destesi | (330, 1400) | sayfa 521 px, x 70–591 | — |
| Mercekli kutu | **(720, 1080)** (json 640, 1180 → konum ve boy düzeltildi). Boy 0.28 m (×0.8; tasarım ×1.4 iptal) | 519 px, x 460–980 | Mercek tüpü öne (kameraya) bakar. Çekmece sağ yanda, dışarı kayar |
| Ölçü bölgesi (parmak + şerit) | **(560, 1250)** | cs 2.0: parmak 7.5 cm → **328 px (%17)**, şerit **280 px**, 52° | Sayfa ışık hattı kutunun önünde, y 1100, 4 px yatay |
- **Işık:** pencere sol-üst-arka, yükseklik 35°, `yonlu` `yon` (+0.86, +1.14). Gölge boyu = 1.43 × nesne yüksekliği, sağ-aşağı. Terazinin gölgesi kutuya düşmez (aralarında 0.15 m var); kontrol edilmeli. El gölgesi `elYukseklik` ile (MASA-INSERT kuralı).
- **Ölü alan:** cs 1'de üst üçte bir = duvar + raf + ışık yamuğu + terazinin üst kolu (y 593+). Push-in sonrası masa tam kadraj. ✓

### 3.3 Görünüm `masa` P09 (Tours)
- Kuş avuçta, masanın ≤ 5 cm üstünde. Kılıf merkezi dekor **(540, 1000)** (s 1697 × 1.14 = 1934 px/m). cs 2.2'de kılıf 0.072 × 1934 × 2.2 = **306 px**. Tasarım 270'e uymak için ya cs 2.0 (278 px) ya da kuş masaya değecek kadar alçak (h 0, 269 px). Öneri: **cs 1.6 → 2.0**, cy −120 (kılıf ekran y ≈ 960).
- Keçe altlık kuşun ve ellerin altında: x 330–750, y 900–1250. Şerit yığını sağda (820, 1200), mektup yığını solda (220, 1150), soluk (α değil, ton: `#d9d4c4`).
- Ölü alan: alt üçte bir = keçe kenarı + şerit yığını + el gölgeleri. ✓

### 3.4 Görünüm `kafes` (P04b, f122–267): sepet iner, kuş yön arar
- **Mimari:** taşrada iniş yeri, nötr düz tarla + çit/ağaç sırası [T; yer kaynaksız]. Kafes, inen sepetin ön kenarında, rime halatla bağlı (tasarım §4.3).
- **Amaç:** sessiz bekleyiş, sonra karar. Kuş koyu çitin önünde, kapı açık, yön arar.
- **Görsel dil:** kafes çubuklarının dikey ritmi (7 çubuk) ile ufkun yatayı. Kuşun çıkışı sağ-üste diyagonal.
- **Kamera:** yerde, F 1500, göz e = 1.15 m. Kafes Z 1.25 m, **1200 px/m (cs 1)**. **Ufuk y 1000** (kafes ortası).

| Öğe | Konum (dekor, cs 1) |
|---|---|
| Kafes | 0.40 × 0.30 m → 480 × 360 px, x 300–780, **y 820–1180**. Taban rim üstünde (rim + 0.05 m = 1.0 m) |
| Tünek | y 1108 (tabandan 0.06 m), kuş 0.32 m → 384 px. cs 1.5'te **576 px (%30)** ✓ |
| Sepet | rim **y 1180**; hasır y 1180 → kadraj altı (alt üçte bir dolu). `Sepet` modülü, `yakin` |
| Arka plan | Çit/ağaç sırası Z 15 m (100 px/m), 2.5 m: y 865–1115, koyu `#4c4a44`. **Kuş (`#8f949a`) bu koyu bandın önünde** (L\* 61 / 31, ayrışma ✓). Tarla Z 15–200 m, y 1000–1115 arası ince şerit `#8f8c78`. Gök y 0–865 |
| Çöken küre | sepetin arkasında Z 6–9 m, krem kumaş kütlesi. f122–267 boyunca y 0'dan y ≈ 700'e iner, kıvrılarak yığılır (P03 yığınının tersi). Üst üçte biri doldurur |
| İniş | f122–140: kafes ve rim yukarıdan kadraja iner. f136 temas: sepet yere değer (yer kadraj dışında). Kafes 6 px sıçrar, tünek sallanır (`asiliNesne`, E2) |
- **Işık:** güneş sol-önde (MONTMARTRE ile aynı yön). Çubuk gölgeleri kafes tabanına ve kuşa sağa-öne ince şeritler halinde düşer (α .35). Kenar ışığı `#efe6cc` sol kenarlarda.
- **Ölü alan:** üst = çöken küre + gök, orta = kafes, alt = hasır. ✓

### 3.5 Malzeme ve doku (DAGRON-INSERT)
| Yüzey | Malzeme | Doku | Kod | Parametre |
|---|---|---|---|---|
| Masa | koyu ahşap | yatay damar, tahta başına 3–5 damar çizgisi (2.5 px, α .3, `#54473a`). Derz `#2f2820` 3 px. Ön kenar aşınma bandı `#6e5e4c` 0.03 m. Budak 1 tane (sağ tahta) | `AhsapYuzey` `MESE` → palet override (tasarım `#5e4f40` / `#3e342a`) | 4 tahta, seed 163 |
| Badana duvar | kireç badana | düz `#b9b3a2`, gölge `#8e897a`. Pencere yamuğu `#cfcabb` (net kenar) | düz + `AciklikIsigi` | yamuk köşeleri pencere geometrisinden |
| Raf | ahşap | masa tonunun 1 basamak açığı | `AhsapYuzey` | — |
| Keçe altlık (Tours) | keçe | düz `#4a4e54`, kenar 2 px `#3a3e46`, doku yok | düz | — |
| Kafes | ahşap + çubuk | tasarım §4.3. Çerçevede dikey damar. Çubuklar düz | `AhsapYuzey` + çizgi | — |
| Gren / lif | — | `gunduzMineral` | `ArsivKatmani` | lif .14 / gren .08 |
- Tarama θ 143°: kutunun sağ (gölge) yüzü (II), çekmece içi (IV, küçük), terazi kaidesi gölge yüzü (II), masa ön kenarı alt yüzü (yalnız cs 1).

---

## 4. KE-PK-S4 LANTERN-ODA (P10b, f60–398)

### 4.1 Duygusal amaç ve görsel dil
- **Amaç:** karanlıkta beliren ses. Binlerce kelime bir tırnak kadar filmden duvarı dolduran ışığa büyür; insanlar o ışığın altında yazar, kapıda bekleyenlere taşır.
- **Görsel dil:**
  - **Baskın şekil:** büyük parlak kare (perde) + sol-alttan çıkan huzme diyagonali.
  - **Ritim:** memur başlarının alçak yatay dizisi.
  - **Renk sıcaklığı:** soğuk-nötr (kireç beyazı-yeşilimsi huzme, mavi-siyah oda). Kapı ışığı soğuk gri-mavi.
  - **Kontrast:** en yüksek. Kanalın "karanlık oda" anı.

### 4.2 Mimari kart
| Madde | Değer |
|---|---|
| Kaynak durumu | Magic lantern ile duvara yansıtılır, memurlar kopyalar [A: CDM, MICRO]. **Odanın yeri belirsiz** (merkez postane mi, Hôtel de Ville mi [A §5.4, §9]). Cihaz gövdesi ve ışık kaynağı kaynaksız (tasarım G9) |
| Karar | **Nötr bir resmî büro odası.** Mimari süs yok: pilastr, kartonpiyer, avize, tabela, arma yok. Yalnız badanalı arka duvar, düz lentolu kapı, düz süpürgelik. Bina okunmaz; işlev okunur |
| Oda | 6 m genişlik × 5 m derinlik × 3.6 m tavan [T]. Arka duvar badana, perde = duvarın 1.2 × 1.2 m'lik bölümü (çerçeve, çıta yok; tasarım §4.9). Perde alt kenarı 1.3 m, üst kenarı 2.5 m (oturan memurların başlarının üstünde) |
| Kapı | Arka duvarda, perdenin sağında. Söve X 0.70 m'den başlar, kapı 0.9 × 2.2 m `duz`. Kapı dışı: aydınlık koridor (soğuk gün). Bekleyenler kapı ağzında, Z 3.3–3.8 m |
| Mobilya | Uzun yazı masası (memurlar, Z 2.2 m, masa üstü 0.75 m, kadraj altında). Lantern sehpası (Z 1.55–2.0 m, sol). Memur sandalyeleri görünmez |
| Kameradan görünen | Göz 1.6 m (ayakta, memurların arkasında). Teleobjektif F 2600: düz, tiyatro sahnesi gibi. Zemin hiçbir kadrajda görünmez. Tavan görünmez (duvar üstü y −556). Memurlar sırttan, baş ve omuz |

### 4.3 Kamera ve konumlar
- F 2600, göz e = 1.6 m, arka duvar Z 2.95 m → **881 px/m**. **Ufuk y 1204.**
- **Perde:** x **12–1068**, y **412–1468** (merkez 540, 940; %55 ✓). Satırlar dil-nötr (tasarım §4.9).
- **Lantern (N5):** arkadan görülür, mercek ön yüzde (duvara bakar), kameradan gizlidir.
  - Gövde arka yüzü Z 1.55 m (1677 px/m): x −215…288, y 1321–1908. Görünen kısım ≈ 288 × 590 px, sol-alt köşe.
  - Kısa baca üstte: x 0–60, y 1120–1321.
  - Sehpa kadraj altında.
  - Mercek noktası (huzme kaynağı): Z 2.0, X −0.30, h 1.35 → ekran **(150, 1529)**.
  - Huzme gövdenin sağ ve üst kenarından çıkar.
- **Huzme:**
  - Koni = mercek noktası ile perde dikdörtgeninin (o anki büyüklüğüyle) dışbükey zarfı.
  - f86–112: küçük bulanık kare (ekranın %8'i = 154 px, merkez 540, 940). Huzme sol-alttan merkeze **belirgin diyagonal bir kama** çizer. Kenarlar net, 2 px `#e4ecd8` α .55, dolgu α .30.
  - Kare büyüdükçe kama genişler ve sonunda perdeyi kaplar. Huzme okuması bu noktada toz zerrelerine geçer (6–8 tane, yalnız perdenin altındaki kama şeridinde, y 1468–1529).
- **Memurlar (F1, 4 kişi):** Z 2.2 m (1182 px/m).
  - Konum: X −0.10, 0.18, 0.46 → ekran x **422, 753, 1084**; 4. memur X 0.74 → x 1415 (cs 1'de kadraj dışı, pan'da girer).
  - Baş eğik (yazarken, h 1.15 m): y 1736. Baş kalkık (perdeye bakarken, f100–206, h 1.25): y 1618.
  - Huzmenin alt kenarı bu derinlikte ≥ 1.30 m'den geçer → baş huzmeye girmez, perdeye gölge düşmez (bilinçli: tek kaynak + temiz görüntü).
  - Omuz y 1913. Siluet `#1f2128`; perdeye bakan üst kenarlarda yansıyan ışık kenarı `#d9d9cf` α .35, 2 px.
- **Kapı ve okuyan:**
  - Kapı söveleri dekor x **1157–1950**. Kapı içi (koridor) `#aab4bc`, söve `#23252b`.
  - Bekleyenler kapı ağzında: 3 siluet (F1, P01 lucarne siluetleriyle aynı tasarım), Z 3.3–3.8 m, `#3a3632`, kapı ışığına karşı kontra. Kenar ışığı `#aab4bc` 2 px, kapıya bakan yüzde.
  - Okuyan (`yetiskin-b`): Z 2.6 m (1000 px/m), X 0.85 → dekor x **1390**. Baş y ≈ 1104, eller göğüs hizasında. cs 1.7'de el 0.19 m = **323 px** (≥ 230 ✓).
  - Zarf/kâğıt `#e4dfd0` perdeden gelen ışığı sol yüzünde, kapı ışığını sağ kenarında taşır.
- **Pan (yönetmene, §7):** okuyanı ekran x ≈ 640'a getirmek için cs 1.7'de **cx ≈ −1345**, cs 1.6'da −1250. Json'daki −420/−440 kapıya ulaşmaz: o değerlerde ekran hâlâ perdenin içindedir. Perde 1.2 m olunca arka duvar düzleminde kadraj yalnız 1.23 m genişlik görür; kapı bu yüzden zorunlu olarak dışarıda kalır.
- **Ölü alan:**
  - cs 1, üst üçte bir: y 0–412 karanlık duvar (üst yazı bandı burada) + perdenin üst kısmı (412–640). Kabul: yazı bandı karanlık zeminde okunur ve perde üst üçte birin %36'sını doldurur.
  - Alt üçte bir: perdenin alt kısmı + memur başları + lantern. ✓
  - Pan sonrası: kapı ışığı + okuyan siluet. ✓

### 4.4 Palet ve doku (LANTERN-ODA)
| Yüzey | Hex | Doku | Kod |
|---|---|---|---|
| Oda en koyu | `#1b1d24` (tasarım) | düz | — |
| Duvar (karanlıkta) | `#2c2f36` (tasarım) | perdenin dışında, yansıyan dolgu: perde kenarından 120 px içinde `#4a4e54` (2. ton basamağı, net kenar) | düz 2 ton |
| Perde (ışıkta) | `#d9d9cf` (tasarım) | badana kabarması 2 leke α .06 (yalnız net evrede). Satırlar tasarım §4.9 | düz |
| Huzme | `#e4ecd8` α .30 / kenar α .55 | toz 6–8 nokta, 3–5 px, seed 167, kayar ama kaynamaz (konum kareye bağlı deterministik) | yeni `LanternHuzme` |
| Lantern gövde | `#2f3238`, kenar `#4a4d52`, sehpa `#4a3f33` | gövde gölge yüzünde IV tarama (kutu ≤ 120 px). Pirinç yok | — |
| Memur siluet | `#1f2128` | düz, kontur yok | `Siluet` |
| Kapı içi / söve | `#aab4bc` / `#23252b` | düz | — |
| Bekleyen siluet | `#3a3632`, kenar `#aab4bc` | düz | `Siluet` |
| Gren | `geceLapis` | lif .13 / gren .12 | `ArsivKatmani` |
Yeni hex'ler (`#4a4e54`, `#23252b`, `#1f2128`, `#3a3e46`) ölçüldü: imzaya ΔE ≥ 83, b\* < 0.

---

## 5. 360x640 telefon okunurluğu (özet)
| Plan / görünüm | Öğe | Telefonda | Okunur mu / önlem |
|---|---|---|---|
| P01 f0 (cs 3.2) | kılıf + kuyruk + koyu açıklık | kılıf 107 px, açıklık 177 × 237 px koyu | Evet: sıcak kapsül koyu zemin önünde |
| P01 geniş (cs 1) | lucarne + siluet, baca tarağı, kümes | §1.8 | Evet. Siluetler 14 px: yalnız "pencerede biri" okunur, kim olduğu okunmaz (kasıtlı) |
| P03 (cs 1) | küre, sepet, hortum | küre 288 px, sepet 36 × 29 px, hortum 4–10 px | Sepet küçük (tasarım ≥ 55 px istiyor). Önlem: P03'te sepetin okunması şart değil (D2 kumaş şişmesi). P06'da sepet 224 px |
| P06 (cs 1) | sepet, sandık, ikinci balon | 224 / 131 / 87 px | Evet |
| P07 A | iki küre, düşen sepet | 160 / 107 px | Evet. Delik ≥ %3.5 (tasarım) |
| P07 B (cs 1.3) | torba | 77 px | Evet |
| P05 (cs 2.0) | parmak + şerit | 109 / 93 px | Evet |
| P04b (cs 1.5) | kuş, kapak | 192 px, kapak 80 px | Evet; koyu çit önünde |
| P10b (cs 1) | perde, huzme kaması | 352 px, kama 2 px kenar | Kenar 0.67 px: **sınırda**. Önlem: kama kenarı 3 px |

---

## 6. Renk ölçüm tablosu (eleştirmen, ±8 L\*, ArsivKatmani sonrası)
| Bölge | Hedef | L\* / C\* (alt sınır %70) / h° | Plan · ölçüm noktası (ekran) |
|---|---|---|---|
| Alacakaranlık gök orta | `#4a4663` | 31 / 18.6 (≥ 13.0) / 298 | P01 son · (800, 450) |
| Alacakaranlık ufuk | `#a58e98` | 61 / 10.6 (≥ 7.4) / 349 | P01 son · (900, 560) |
| Çinko teras (alaca) | `#565a6e` | 39 / 12.3 (≥ 8.6) / 285 | P01 son · (700, 1700), kenet dışında |
| Brisis (alaca) | `#5f6578` | 43 / 11.6 (≥ 8.1) / 281 | P01 son · (900, 690) |
| Kış gökü orta | `#aab4bc` | 73 / 5.6 / 250 | P03 · (540, 120) |
| Meydan zemini | `#8d836f` | 55 / 12.2 (≥ 8.5) / 89 | P03 · (540, 1800) |
| Krem taş (gün) | `#d8cdb4` | 83 / 13.8 / 91 | P10a · karşı cephe (ekranda görünürse) |
| Masa | `#5e4f40` | 35 / 11.8 / 72 | P05 · (540, 1600) |
| Badana duvar | `#b9b3a2` | 73 / 9.5 / 95 | P05 f0 · (900, 200) |
| Keçe altlık | `#4a4e54` | 33 / 4.1 / — | P09 · (420, 1150) |
| Perde | `#d9d9cf` | 86 / 5.2 / 110 | P10b f238 · (540, 700) |
| Oda karanlığı | `#1b1d24` | 11 / 5.2 / 282 | P10b · (540, 200) |
| Kılıf (imza) | `#F0B43C` | tasarım §1.7 | P01 f24, P09, P10a, P11 |

---

## 7. Yönetmene notlar (bolum.json değişiklik önerileri — sahibi yönetmen)
1. **PARIS-CATI ufuk:** `ufuk_y 1000` → **739** (dekor; §1.3). P01 cs 1 / cy −160'ta ekran y 579. Kılıf kilidi dekor (540, 960), json cx/cy 0 ile P01 f0 = P11 son kare.
2. **P10a (kümes, gün):** cs 1.8 → 1.9 kılıfı 76–84 px verir; çözme anı (tasarım ≈ 270 px) okunmaz. **Öneri: cs 2.6 → 2.75, cx −380, cy 0** (kılıf 164–191 px, kuş 730–850, el 433–505 px). Daha büyük kılıf için cs 3.0 (251 px); bu durumda kuşun yalnız arka yarısı kadrajdadır.
3. **P05:** son kamera **cs 2.0, cx −40, cy −610** (f268'den). Parmak 328 px, şerit 280 px, ekran (540, 930): P06 rota eşleşmesiyle aynı nokta. Nesne konumları §3.2 tablosunda (terazi x 380, kutu (720, 1080), ölçü bölgesi (560, 1250)).
4. **P09:** cs 1.6 → **2.0** (2.2 yerine), cy −120. Kılıf 278 px.
5. **P06b:** `gorunum: "yukleme"` (yeni). İkinci balon: sepet zemin y 927, küre merkezi (931, 688), ø 262 (json'daki "y 700–1150" ufuk–ölçeğe aykırı: o konumda balon 4 m ötede oyuncak olurdu). Dagron solda (x 21–279), sepet x 200–872.
6. **P07 A:** sepet konumları (300, 1010) / (760, 960) uygun. Kamera yüksekliği `gok.kamera_H {kare:[0,158], m:[60,140]}` parametresi önerilir. "Sis" çizilmez, yerine hava perspektifi.
7. **P07 B:** `sepet.kamera_H {kare:[250,320], m:[150,300]}`. Menzil çizgisi varsayılan olarak yok (açık soru 3).
8. **P10b:** pan **cx −1250 (cs 1.6, f290) → −1345 (cs 1.7, f398)**. Okuyan dekor x 1390. Pan f250–290 (40 kare, ekranda ≈ 31 px/kare): hızlı ama okunur. Daha yavaş istenirse f240'tan başlatılır.
9. **P03:** kalabalık `kalabalik: 6` (isteğe bağlı). Sepet 36 px (360'ta): bu planda okunurluğu şart değil.
10. **P04b:** kafes y 820–1180 ve kuş ekran %30, json cs 1.3 → 1.55 ile uyumlu. cy −40 kafesi ekran ortasına getirir.

## 8. Katalog sınırı önerisi (`sinirlar.json`, kurulumda motion yazar)
| Şablon | gorunum | saat | cs | cx | cy | Not |
|---|---|---|---|---|---|---|
| PARIS-CATI | `cati`, `kumes` (aynı dekor) | `alacakaranlik`, `gun` | **0.95–3.3** | −700…300 | −300…200 | cs = dolly mesafesi (§1.3); `kilif_kilit` (540, 960) |
| MONTMARTRE | `meydan` | `gun` | 0.9–1.3 | ±200 | −100…600 | tilt yukarı balonu izler |
| MONTMARTRE | `yukleme` (YENİ) | `gun` | 1.0–1.6 | −150…150 | −200…100 | — |
| MONTMARTRE | `gok` | `gun` | 0.85–1.1 | ±150 | ±150 | `kamera_H` anahtarlı |
| MONTMARTRE | `sepet` | `gun` | 1.1–1.6 | ±150 | ±200 | `kamera_H` anahtarlı |
| DAGRON-INSERT | `masa` (`mekan: paris-atolye`, `tours-buro`) | `gun` | 1.0–2.4 | ±400 | −800…200 | masa düzlemi s(y) |
| DAGRON-INSERT | `kafes` | `gun` | 1.2–1.8 | ±200 | ±200 | — |
| LANTERN-ODA | `oda` | `lamba` | 0.95–1.8 | **−1400…200** | ±300 | kapı dekor x 1157–1950 |
Parametrik genişleme (sonraki bölümler için): PARIS-CATI `saat: gece` (pencere ışığı ana kaynak), `kumes: false` (çatı manzarası), `bina_sirasi {aks_m, kat, lucarne_tip}` seed. MONTMARTRE `meydan` → genel `KALKIS-MEYDANI` (ufuk, yan ev tipi, şehir bandı parametreli). LANTERN-ODA → genel `KARANLIK-ODA` (ışık kaynağı: lantern / mum / pencere yarığı).

## 9. Motion için çizim notları
- **Yeni ortak modüller** (`src/doku/` ya da `src/kit/sablonlar/paris/`):
  - `DollyKamera`: `s_i = d_i/(d_i − δ(cs))`, δ = k(1 − 1/cs), k = 1.31; katman listesi `{d, cizici}`; d − δ < 0.1 ise çizmez. Kit kamera formülüyle aynı cx/cy ekleme.
  - `HaussmannCephe`: `{aks_m[], kat_dizisi, kornis, balkon_katlari:[5], brisis {egim 70, yuk 2.8}, lucarne {w, h, tip:'duz'}, teras, detay, saat, isikli_oran, seed}`. Metre cinsinden geometri, px/m ile ölçek. Sonraki Paris 1853–1914 bölümleri için genel.
  - `BacaKumesi {genislik_m, yukseklik_m, kulah_sayisi, detay, seed}`.
  - `CinkoTeras {vp, kenet_m, alan, saat, seed}`.
  - `CatiDenizi {satirlar:[{Z, ton, tarak_yogunluk}], ufuk, seed}`.
  - `Kumes {olcu, egim, tahta_m, aciklik:3, el_kapagi, saat}`: tasarım §4.4.
  - `MeydanZemin`, `CiplakAgac`, `Sepet {cokme, detay}` (MONTMARTRE + DAGRON-INSERT kafes ortak), `HavadanSehir {H, F, ufuk, bulvar_aci, seed}`.
  - `MasaPerspektif {F, H, egim} → s(y)`, `LanternHuzme {mercek, dikdortgen, toz, seed}`.
- **Türetilecek mevcut kod:**
  - `TasDuvar` (yeni tip `parisHaussmann`; mevcut `paris` tipi Haussmann öncesi Proto içindir, dokunulmaz).
  - `CatiOrtusu` (`arduvaz`, `cinko` + palet override).
  - `Kemer` (yalnız `duz`), `Tarama`, `KonturTitreme`, `Isik` (`yonlu`, `nokta`, `AciklikIsigi`, `IsikHavuzu`), `Siluet`, `AhsapYuzey`, `ArsivKatmani` (`geceLapis`, `gunduzMineral`).
  - MASA-INSERT'ten el gölgesi (`elYukseklik`) ve KolEl kıstırma mantığı. Masa ve duvar tonları override. **Tours lucarne'ı ve `pencere: tours` kullanılmaz** (Chappe T okutur).
  - Blanc `Sokak.tsx` ve `Cephe.tsx` (Bordeaux arcade + maskaron) bu bölümde **kullanılmaz**: dönem yanlış.
- **Kilit noktaları (`kilit.push`):**
  - Kılıf (540, 960) PARIS-CATI.
  - Ayak/temas: meydan sepet y 1444 (P03), sepet tabanı y 1460, Dagron ayağı y 1417 / rim (220, 928) (P06).
  - Masa ölçü bölgesi (560, 1250).
  - Kafes rim y 1180.
  - Perde 12–1068 × 412–1468, mercek (150, 1529).
- **Kalibrasyon sırası** (tasarım §11 ile uyumlu):
  1. P01 f0 + f300 + P11 son kare (dolly, kılıf kilidi, Paris imzası 360 px'te).
  2. P05 f280 + P10b f238 (masa ölçeği, huzme kaması, perde).
  3. P07 f112 / f200 + P06 f214 (gök, sepet, ikinci balon ölçeği).

## 10. Açık sorular
- **Kullanıcıya:**
  1. **Paris anıtı:** P01 Paris'i yalnız Haussmann çatı tipiyle okutuyor; anıt silueti yok. Uzakta bir kubbe (Panthéon ya da Invalides, 1870'te ayakta [G]) eklensin mi? Eklenirse araştırmacı kamera yönünü (GGB) ve görünürlüğü doğrulamalı. **Varsayılan: eklenmez.**
  2. **Baca külahları gri:** gerçekte pişmiş toprak ve kırmızımsıydı [G]. Bölümün kırmızı yasağı gereği gri çizildi. Uygun mu? **Varsayılan: gri.**
  3. **P07 B "ateş menzili çizgisi":** sahnede düz kesik mürekkep çizgisi mi olsun, hiç olmasın mı? **Varsayılan: yok.**
  4. **Tours masasında koyu gri keçe altlık [T]:** kılıfı ve Tours'u ayırmak için. **Varsayılan: var.**
- **Araştırmacıya (ağ izni gelince):**
  - 1870 Place Saint-Pierre: zemin (toprak/kaldırım), kenar yapıları, güneye açık mı.
  - 1859 Haussmann yönetmeliği: korniş/çatı zarfı.
  - Mansard lucarne başlık tipi.
  - Kuşatma güvercinliklerinin Paris'teki yerleri ve biçimi (çatı mı, avlu mu).
  - Projeksiyon odasının binası ve iç görünümü.
  - Magic lantern / "megaskop" gövdesi.
  - Nadar/Dagron balonlarının sepet ve ağ görünümü (Gallica gravürleri).
- **Tasarımcıya:**
  - (a) DAGRON-INSERT'te terazi ×1.5 ve kutu ×1.4 çarpanları bu masa ölçeğinde gereksiz (§3.2). Terazi gerçek ölçüde, kutu 0.28 m önerildi.
  - (b) P03'te sepet 360 px'te 36 px (tasarımın ≥ 55 px hedefinin altında). Bu planda kabul mü?
  - (c) Bu belgedeki yeni hex'ler (§1.6, §2.7, §3.5, §4.4) palete eklenmeli mi? Hepsi ölçüldü.
- **Motion'a:** dolly modelinde katman sayısı 11. Kalibrasyonda P01 f0–300 şeridi (her 4 kare) ön bacanın soldan girişini ve karşı cephenin ölçek değişimini göstermeli. Kesme ya da maske şeridi olmamalı.
