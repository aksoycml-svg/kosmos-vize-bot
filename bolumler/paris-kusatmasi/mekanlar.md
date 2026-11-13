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
8. **v2 (2026-11-12):** PARIS-CATI §1v2 ile yeniden kuruldu: kamera yönü 230°, geniş plan göz 2.8 m / ufuk y 635 (%33), dolly genel öteleme (FOE ≠ kılıf), kümes 30° döndürülmüş dünya modeli, çatı denizi K1–K5, ön baca kaldırıldı. Kamera önerisi §1v2.12. PARIS-CATI satırlarında §0.6, §0.7, §7.1–7.2 ve §8 yerine §1v2 geçerli.
9. **v3 (2026-11-12, tur-6):** PARIS-CATI geniş plan ve dolly yolu §1v3 ile değişti: göz **5.0 m** (kamera bitişik, bir kat yüksek komşu çatıda), ufuk **y 600**, çatı denizi yukarıdan (K4 · K4b · K3 · K3b + K2/K1), kümes dünyada Z 7.5–8.7, sağ baca güvenli alana, ön-plan çerçeve (komşu çatı kenarı). Kanca (P01 f0/f24 = P11 son) ve P10a kompozisyonu **değişmez**; yalnız cs/cx/cy sayıları yeni sabitlerle yeniden hesaplandı (§1v3.6). §1v2.3, §1v2.5, §1v2.12'nin yerine §1v3 geçerli; §1v2'nin geri kalanı geçerli.
11. **Hale (2026-11-12, tur-9):** P06b/P07 mekânı **Gare d'Orléans halesi** (§2v2-H): MONTMARTRE'ye `arka: "hale"`, yeni şablon değil. Kamera hale içinde ağza bakar, ağız 80 m, 5 Polonceau makası + cam şerit + sağ duvar kolonları; ışık `haleSabah` (güneş 25° sol-önde, ağızdan girer). P07 gökte ray demeti. P03 Montmartre'da kalır. Panthéon fenerine küçük haç (§1v3.11).
12. **C turu (2026-11-13, tur-14):** DAGRON-INSERT §3v2 ve LANTERN-ODA §4v2 geçerli (§3/§4 arşiv). Masa ışığı fiziksel sınırla 18° (Kasım güneşi ≤ 23°), önden-soldan; terazi geri-sola, kutu 0.24 m, çekmece önde. Tours duvarı tuffeau [G]. LANTERN-ODA: okuma anına pan yerine **plan içi kesme f266 → `kapi` görünümü**; huzme ışınsal çizgi; kapı ışığı sıcak. Kamera tablosu §3v2/4v2 sonunda.
10. **MONTMARTRE v2 (2026-11-12, tur-8):** §2v2 geçerli, §2 arşiv. Tek dünya modeli (orijin Niépce sepeti), dört kamera. Meydan ufku y 1304, küre 6.6 m (sepet:küre 1:5.5, tasarımcıya soru), dolu küre tepesi y 430 (yazı bandı), sepet 25° döndürülmüş. `yukleme` kamerası (0.1, 1.0, −3.40), cy −210'a kadar (taban güvenli alanda). `gok` ufku 760 → **900**, darbe ekranda ≈ (712, 687), duman şehrin dışından. Niépce/Daguerre kalkış yeri araştırmacıya soruldu.

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

> **v2 GEÇERLİ (2026-11-12, tur-5 onaylı hedef):** PARIS-CATI için bağlayıcı metin **§1v2** (bu bölümün sonunda, §2'den önce). Aşağıdaki §1.1–§1.8 **v1 arşividir**; v2 ile çelişen her yerde v2 geçerlidir (kamera, dolly sabitleri, katmanlar, palet, kümes ölçüsü, ön baca, ışık yönü). v1'den v2'ye aynen geçenler §1v2.0'da listelidir.

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

## 1v2. PARIS-CATI v2 — GEÇERLİ (P01 kanca + geniş kapanış, P10a, P11 son)

Girdi: `hedef/hedef-kus.png`, `hedef/hedef-cati.png` (tur-5 kullanıcı onayı: "tamam bu yön"), `tasarim.md` §13 (palet v2, ışık, doku, derinlik, kılıf tekliği), `notlar/tur-4.md`, `notlar/tur-5.md`, motion kodu (`src/kit/sablonlar/paris/{dolly.ts, catiDekor.tsx, ParisCati.tsx}`), A2 kareleri. Hedef görsel **yön** verir, kare değildir. Hedeften bilinçli farklar (tur-5): **kâğıt çerçeve yok**, **kılıf uçlarında metal kapak yok**, **güneş diski yok, yalnız hale**. Ek farklar bu belgede gerekçeli: kümes açıklıkları dikdörtgen (hedef-çatı yuvarlak), terastaki sıcak leke sol-alt değil orta-alt (tek ışık), kümes tabanı güvenli alan içinde (hedefte y ≈ 1625, IG alt bandında).
Bütün sayılar pinhole hesabıyla (F 1326, `y = ufuk + (e − h)·F/Z`) üretildi; motion ilk still'de ±15 px doğrular. Etiketler §0 ile aynı ([A] [S] [G] [T]).

### 1v2.0 v1'den aynen kalanlar
- Haussmann sonrası çatı imzası (§1.2): mansard (brisis 70°, arduvaz) + lucarne sırası, sürekli korniş, baca kümesi + baca külahı (mitron) sırası, çinko terrasson. Panjur, yarı ahşap, fener, bayrak, Eyfel, Sacré-Cœur yok. **Kemer yok** (§0.4).
- Lucarne: motion A2'deki **beşik çatılı** küçük lucarne (iki yanak + arduvaz beşik çatı, düz lento pencere) v2'de onaylandı; §0.4'teki "düz başlık" yerine bu geçerli. Hedef-çatıdaki üçgen başlıklar da budur. Taş alınlık değildir, kemer değildir.
- Baca külahı rengi: tasarım §13.1 `#8a6458` / `#4f4347` (soluk toprak, C\* ≤ 18). v1 §1.2'deki "soğuk gri" kararı kalktı (tur-3 kullanıcı kararı + §13).
- `DOKU_SEED.parisCati 151`. Kılıf rengi ve tekliği tasarım §13.3.

### 1v2.1 Duygusal amaç ve görsel dil
- **Amaç:** kuşatılmış bir şehrin damlarında, gün biterken tek çıkış gökyüzü. Kanca planında kuş ve kılıf sıcak, yakın, keskin; şehir arkada yumuşak bir vaat. Kapanışta aynı kuş, sonsuz bir çatı denizinin içinde küçücük.
- **Görsel dil:**
  - **Baskın şekil:** kanca = sol üstten inen **diyagonal saçak** + sol %40 dikey kümes duvarı (çerçeve) + sağda açık derinlik. Geniş = **yatay basamaklar** (gök bantları, çatı sıraları üst üste) + önde VP'ye yakınsayan kenet çizgileri.
  - **Ritim:** lucarne sırası (K3, K4) ve baca külahı tarakları; aynı ritim uzaklaştıkça sıklaşır (atmosfer + ölçek).
  - **Renk sıcaklığı:** gölge mavi-mor, ışık gül-şeftali (tasarım §13.1). Tek doygun nokta kılıf.
  - **Kontrast:** önde yüksek (kümes, kuş, sağ baca koyu + sıcak kenar), arkada düşük (atmosfer açık ve yumuşak).
  - **Boşluk:** kanca planında sağ-üst gök (kuşun kalkacağı yön); geniş planda üst üçte bir gök + hale (yazı bandı burada).

### 1v2.2 Mimari kart (v2)
| Madde | Değer |
|---|---|
| Yer ve yön [T, doğrulanmalı] | Sol yaka, **Bd Saint-Germain doğu kesimi** (1855–1866 açıldı [G]) çevresinde bir bulvar yapısının arka terrasson'u. **Panthéon ≈ 0.9 km GB'de**, kamera yönü **230°**. Bu yönde 12 Kasım batışı ≈ 243° (§0.6 hesabı) ⇒ güneş eksenin **13° sağında**, Panthéon'un hemen arkasında. Görüş hattı ve tarih için araştırmacıya soru (§1v2.11). v1'deki 200° yön bırakıldı: o yönde güneş 43° sağda, kadraj dışında kalıyordu; onaylı hedefte hale Panthéon'un arkasında |
| Arazi | Montagne Sainte-Geneviève'e doğru yükselir [G] ⇒ uzak sıralar **kademeli yüksek**: K4 < K3 < K2 < K1. Çatı denizinin "basamak basamak" okunması fiziksel gerekçelidir, keyfî yığma değildir |
| Yapı tipi | Kendi binamız: bulvar kira apartmanı (korniş ≈ 20 m, mansard + terrasson). K4: arka **dar sokak** cephesi, korniş bizimkinden ≈ 3 m alçak (1859 yönetmeliğinde korniş yüksekliği sokak genişliğine bağlıdır [G, doğrulanmalı]). K3–K2: aynı tip, eğim yukarı |
| Kat düzeni (görünen) | Korniş (0.6 m taşma) → brisis (2.8 m, 70°, arduvaz sıraları) → kırık çizgi (yuvarlak çinko kenar) → terrasson (çinko, %10). Lucarne 0.9 × 1.3 m, eşik korniş +0.6 m, her pencere aksında bir; bina değişiminde bir aks kayar. Baca kümesi ortak duvarda, terrasson üstü 1.6 m, 6–10 külah tek sıra. 5. kat ve balkon v2 kadrajlarında **görünmez** (kendi kırık çizgimizin arkasında) |
| Açıklıklar | Hepsi düz lento dikdörtgen. Lucarne penceresi 2 kanat, ortada kayıt. Kümes açıklığı dikdörtgen |
| Süsleme (≤ 2 imza) | (1) lucarne sırası + ışıklı pencereler, (2) baca külahı tarağı + duman. Korniş tek düz profil + gölge bandı. Maskaron, konsol, alınlık yok |
| Kümes (v2) [T; tasarım §4.4'ü hedefe göre günceller, tasarımcı onayı istenir] | Tek eğimli (öne iner) ahşap kulübe, **ön yüz 1.0 m**, derinlik 0.8, **ayak 0.15**, ön saçak **1.00 m**, arka saçak 1.20 m, saçak taşması ön 0.10 / yan 0.05. Tahtalar dikey 0.12 m. **Açıklık dikdörtgen 0.20 × 0.28 m, eşik 0.62**, iki tane (sağdaki R köşesinden 0.12 m içeride; ikincisi 0.55 m içeride). **İniş tahtası** üst yüzü 0.60 m, 0.25 m öne taşar, ön yüz boyunca uzanır ve **sağ köşenin 0.10 m dışına taşar**; taşan ucun altında 45° **payanda**. El kapağı sol yan yüzde (geniş planda görünür). Çatı çinko. **Döndürülmüş: ön yüz normali kameranın 30° sağına bakar** (kuşun uçacağı şehre/batıya). Hedef-çatı yuvarlak delik çizmiş: v2 dikdörtgen (kanca planıyla tek biçim; §0.4) |
| Kümes yeri (dünya, m; X sağ, h teras üstü, Z geniş kameradan ileri) | Ön yüz sağ köşesi **R = (−0.50, Z 5.20)**, sol köşesi L = (−1.37, Z 4.70). Arka köşeler Z 5.39–5.89. Kendi kırık çizgimiz Z 6.2: kümes arka yüzü kenardan 0.3 m içeride, kırık çizginin rüzgâr gölgesinde |
| Kuş ve kılıf | Kuş iniş tahtasının taşan **sağ ucunda**, ayak ≈ R + 0.06 m (yüz boyunca) + 0.12 m (öne), h 0.60; baş üstü h 0.88; gövde ekseni ön yüze paralel, sağa bakar. **Kılıf K = (−0.509, h 0.70, Z 5.056)**: kuyruğun üstünde, açıklığın önünde, **uzun ekseni görüntü düzlemine paralel** (kuyruğa ≈ 30° çapraz bağlı, hedef-kuş gibi; yüz boyunca uzanırsa 0.87 kısalır ve 190 px'in altına düşer) |
| Yem/su teknesi | X −0.25…0.35, Z 4.65–4.90, h 0.15, iki göz (yem + su), kümesin sağ-önünde, tahtadan dökülen birkaç tane. A2'deki Z 1.75–1.99 yeri geçersiz (yeni kamerada kadraj altı) |
| Sağ baca kümesi (kendi binamız) | motion A2 değeri korunur: X 1.30–1.80, **Z 4.40**, derinlik 0.45, gövde 1.40, başlık 0.07, 4 külah (ø 0.10, boy 0.28). v2 kuralı: **özelliksiz kutu değil**: başlık bandı, gölge yüzünde II tarama, sağ kenar ışığı, külah sırası, 1 kabarma lekesi |
| Ön baca (v1 #10) | **Kaldırıldı.** Göz 2.8 m'de Z 1.6'daki baca kadraj altında kalır; ayrıca "dev özelliksiz baca" teşhisinin kaynağıydı |
| Kameradan görünen | **Geniş (göz 2.8 m):** kümes çatısının **üst yüzü görünür** (göz çatının 1.6 m üstünde), sol yan yüz + ön yüz görünür, sağ yan yüz görünmez. Kendi terrasson yüzeyimiz Z 2.9 → 6.2. K4'ün terrasson şeridi, baca kümeleri, brisis + lucarne'lar ve korniş çizgisi görünür; K4 5. katı ve sokak görünmez. **Kanca (göz 0.73 m):** kümes saçağının **altı (soffit) görünür, çatı yüzeyi görünmez**; iniş tahtasının üst yüzü ince şerit (göz 0.13 m üstünde), payandanın yan yüzü görünür. Ufuk kuşun göğsü hizasında: çatı denizi ufkun altında, Panthéon ve hale ufkun üstünde |

### 1v2.3 Kamera modeli v2: tek dekor, tek doğrusal kamera yolu
- **Geniş kamera (cs 1, cx 0, cy 0) = dekor koordinatı:** F 1326, göz **e = 2.8 m** teras üstü, optik eksen yatay + **lens kaydırma** (dikeyler dik kalır), **ufuk dekor y 635** (%33.1). Fiziksel karşılığı: ≈ 13.8° aşağı eğik kameranın dikey düzeltilmiş hâli (hedef-çatıda da dikeyler paralel). Göz yüksekliğinin fiziksel karşılığı [T]: bitişik komşu terrasson'un ≈ 1.2 m yüksek kenarında ayakta göz.
  - **Neden tasarımın "≥ 3.5 m"si değil 2.8 m:** (1) kümes tabanı ve teknenin IG alt bandı (y > 1500) üstünde kalması, (2) K4 kornişinin kendi kırık çizgimizin üstünde görünmesi ve (3) kümesin "küçük ev" okunacak büyüklükte kalması (≈ 270 px) üçü birlikte ancak e 2.6–3.0 aralığında sağlanıyor. e 3.5'te kümes tabanı y ≈ 1620'ye iner (IG bandı) ya da kümes Z 6'nın ötesine, kırık çizginin dışına düşer.
- **Kanca kamerası (cs 2.75):** C_k = (X −0.409, h **0.73**, Z 4.566). Kılıfa derinlik 0.49 m ⇒ kılıf düzlemi **2706 px/m** ⇒ kılıf 7.2 cm = **195 px** (≥ 190 ✓). Göz kılıfın 3 cm üstünde: ufuk kılıfın 81 px üstünde, kuşun göğüs hizasında (hedef-kuş).
- **Dolly = C_w → C_k doğrusal öteleme** (yön değişmez, yalnız cx/cy ile lens kaydırma). Öteleme T = (−0.409, −2.07, +4.566) m. Saf ötelemede her nokta **FOE**'den Z/(Z − t_z) oranında radyal açılır (mevcut `dolly.ts` formülü aynen; yalnız FOE kılıf değil):
  - **FOE (dekor) = (421.1, 1236.1)** = T yönünün izdüşümü (540 + F·Tx/Tz, 635 + F·(−Ty)/Tz).
  - **Zk = 5.056 m** (kılıf düzlemi, d = 1), δ_max = 4.566/5.056 = 0.9031.
  - δ(cs) = k·(1 − 1/cs), **k = 1.419** (cs 2.75 → δ_max). Kamera konumu = C_w + T·(δ/δ_max).
  - **Kılıf dekor noktası (406.1, 1185.7)** ≠ FOE. `kilif_kilit` parametresi ikiye ayrılır: `foe` (dolly merkezi) ve `kilif` (kilit/ölçüm noktası). Kılıf ekranı = FOE + (kılıf − FOE)·s + (cx, cy).
  - Ufuk ekranı = 635 + cy (sonsuzdaki noktalar s = 1). cy'nin animasyonu = kameranın eğilmesi (tilt); geri çekilirken cy 244 → 0, yani kamera yükselip geriye giderken hafifçe aşağı bakar.
  - **Yakın düzlem:** d − δ < 0.05 (≈ 0.25 m) kırpılır. Kümes ön yüzünün sol kısmı kancada bu düzlemi keser: dünya çokgeni **kırpılarak** çizilir (zemin gibi), katman toptan gizlenmez. Sağ baca kancada kameranın yanında/arkasında: köşelerden biri null ise bütün baca çizilmez (ekran dışında kalır, x > 9000).
- **Kamera yolu tablosu** (dünya; s = Z/(Z − t_z)):

| cs | δ | kamera X / h / Z (m) | s kümes (d 1) | s K4 (Z 20) | s K3 (Z 38) | s K1 | kılıf px |
|---|---|---|---|---|---|---|---|
| 1.0 | 0 | 0 / 2.80 / 0 | 1.00 | 1.000 | 1.000 | 1.000 | 19 |
| 1.1 | 0.129 | −0.06 / 2.50 / 0.65 | 1.15 | 1.034 | 1.017 | 1.001 | 22 |
| 1.25 | 0.284 | −0.13 / 2.15 / 1.44 | 1.40 | 1.077 | 1.039 | 1.002 | 26 |
| 1.6 | 0.532 | −0.24 / 1.58 / 2.69 | 2.14 | 1.155 | 1.076 | 1.003 | 40 |
| 2.1 | 0.743 | −0.34 / 1.10 / 3.76 | 3.90 | 1.231 | 1.110 | 1.004 | 74 |
| 2.4 | 0.828 | −0.38 / 0.90 / 4.19 | 5.81 | 1.265 | 1.124 | 1.005 | 110 |
| 2.6 | 0.873 | −0.40 / 0.80 / 4.42 | 7.89 | 1.283 | 1.131 | 1.005 | 149 |
| **2.75** | **0.903** | **−0.41 / 0.73 / 4.57** | **10.32** | **1.296** | **1.137** | **1.005** | **195** |
- **Sınır:** cs ≤ 2.85 (s kümes 12.7; üstünde kılıf düzlemi yakın düzleme girer). cs ≥ 0.95.
- **Kamera kimseyle çarpışmaz:** yol teknenin 0.6 m üstünden geçer (tekne kancada kadraj altında), sağ baca yolun 1.7 m sağında, kümes yolun önünde.

### 1v2.4 Kanca kompozisyonu (P01 f0 = P11 son; cs 2.75, cx 105, cy 244)
| Öğe | Ekran (1080 × 1920) | Kural |
|---|---|---|
| Kılıf merkezi | **(374, 960)**, uzun eksen 195 px | ≥ 190 px ✓; P01 f0 ↔ P11 son ±0 px (aynı kamera) |
| Kuş baş üstü | (879, **553**) | ≥ 300 (UI 220 + 80) ✓ |
| Kuş gaga ucu / kuyruk yelpazesi ucu | x ≈ 950 / x ≈ 82 | yan güvenli 80–1000 ✓ |
| Kuş ayakları (tahtada) | (695, 1187) | güvenli alan içinde ✓; temas gölgesi tahtaya, sola-öne |
| Kümes ön yüzü sağ kenarı | **x 455** (%42) | "sol ~%40" ✓; kenar boydan boya dikey, yüzün solu kadraj dışına taşar |
| Saçak (ön, taşmalı) | sağ ucu (651, 253) → sol üstte kadraj dışına (x 0'da y ≈ 76) | **diyagonal**, alt yüzü (soffit) görünür, III tarama; üst kısmı UI bandında, kritik değil |
| Açıklık (dikdörtgen, koyu) | x … → 195, y 371 → ≈ 1160 | kuyruk yelpazesinin ve kılıfın arkasında koyu zemin (kılıf kontrastı) |
| İniş tahtası | üst yüz y ≈ 1150–1250, sağ ucu (988, 1248) | ucu kadraj içinde biter (hedef-kuş) |
| Payanda | (602, 1626) → tahta ucunun altı | alt üçte biri dolduran diyagonal |
| Ufuk | **y 879** | kuşun göğüs hizası |
| Hale merkezi | (951, 884), r 130 / 200 | kuşun göğsünün sağında; kuş sırtına kenar ışığı gerekçesi |
| Panthéon | x ≈ 935, kubbe tepesi y ≈ 714 | flu, silik, halenin önünde |
| K4 baca kümeleri / lucarne'lar | y ≈ 1040 / ≈ 1290 | flu, ışıklı pencereler yumuşak disk |
| Kendi kırık çizgimiz / yakın teras | y ≈ 1470 / 1470–1920 | flu σ 5, alt bant boş görünmez |
- **Kalkış (P01 f0–24):** kanat açılırken kanat ucu y ≥ 230 (A2'de baş üst kenara değiyordu). Gerekirse kanat açısı sınırlanır, kamera değil.
- **Alt üçte bir (1280–1920):** solda kümes ön yüzü (tahtalar), ortada payanda + tahtanın alt yüzü (IV tarama), sağda flu K4 lucarne ışıkları ve kendi terasımız. Ölü alan yok.
- **Üst üçte bir (0–640):** sol üstte saçak diyagonali + soffit, ortada kuş başı, sağda gök bantları (`#2b2f5c` → `#4d4a80` → `#7d6a95`). Yazı bandı (240–400) gökte ve saçağın altında; kuş başına değmez (baş 553).

### 1v2.5 Geniş kompozisyon (P01 kapanış f370; cs 1, cx 0, cy 0)
| Öğe | Ekran | Not |
|---|---|---|
| Gök bantları | 0–200 / 200–380 / 380–500 / 500–585 / 585–ufuk | tepe → ufuk 5 basamak (§1v2.7) |
| Hale | merkez (846, 640) r 130 / 200 | güneş azimut 13° sağ ⇒ x 846; merkez ufkun 5 px altında (güneş batmış/arkada) |
| Panthéon | x 830, fener tepesi **y ≈ 470**, tambur 600–540, gövde K1 sırtının arkasında | ölçek **×1.6 stilize** [T]: 0.9 km'de gerçek tepe y 523, tambur ≈ 43 px; 360 px'te 7 px kalır, okunmaz. ×1.6 ile tambur ≈ 70 px (360'ta 23 px) |
| K1 sırt | y 650 (sol) → 600 (Panthéon yanı) | Montagne Sainte-Geneviève yükselişi |
| K2 | 620–690 | mansard silueti + tarak |
| K3 | 691–872 (külah 691, kırık 773, lucarne 805–850, korniş 872) | lucarne'lar K4 baca kümelerinin arasından görünür |
| K4 | 843–1215 (külah 843, baca 866, terrasson şeridi 900–996, lucarne 1060–1144, korniş 1192 + gölge bandı) | 4 siluet ışıklı lucarne'larda, x 560–900 |
| Kendi kırık çizgimiz | **y 1234** | 6 px açık + 4 px koyu yuvarlak çinko kenar |
| Kümes | x 147–420; arka saçak 995, ön saçak (L) 1155, taban L **1425** / R 1349 | çatı üst yüzü görünür; ≈ 270 px: "küçük ev" |
| Kuş + kılıf | baş (463, 1127), kılıf (406, 1186) ≈ 19 px | kalkış yaptıysa yok; P01 kapanışta kuş sağ üstten çıkmış olur |
| Yem/su teknesi | x 470–635, y 1352–1433 | güvenli alan içinde |
| Sağ baca | x 932–1082, külah 951, başlık 1035, taban **1479** | sağ kenar çerçevesi; Panthéon ve haleyi örtmez (baca üstü 951 > hale alt ucu 840) |
| Teras (ön) | 1234 → 1920, kenetler VP (540, 635)'e | §1v2.8 gölge ve ışık şeritleri |
- **Fiziksel doğrulama (ufuk–ölçek):** her satır `y = 635 + (2.8 − h)·1326/Z` ile üretildi (K4 korniş h −5.6 Z 20 → 1192; K3 korniş h −4.0 Z 38 → 872; K2 h +1.5 Z 120 → 649). Uzak sıralar ufkun altında kalır, yalnız arazi yükselişi (K1 +25 m, K2 +1.5–4 m) onları ufka değdirir. Ayakta bir insan terasımızda (h 1.7, Z 5) başı y 927'de olurdu: göz 2.8 m'de ufkun altında ✓ (yüksek bakış).
- **Ölü alan yok:** üst üçte bir gök + hale + Panthéon (yazı bandı gökte); orta üçte bir çatı denizi; alt üçte bir kümes, tekne, sağ baca dibi, kenetler, iki uzun gölge, sıcak ışık şeridi.
- **Kuş çıkışı:** sağ üst, x ≥ 1000, y ≤ 300, sağ bacanın üstünden geçer (örtüşme yok, A2 şeridi ile aynı).

### 1v2.6 Katman tablosu (dekor = geniş ekran; arkadan öne)
| # | Katman | Z (m) | d = Z/5.056 | s @ cs 2.75 | İçerik | Hex v2 (tasarım §13.1) | Kontur | Tarama | Flu σ @ kanca |
|---|---|---|---|---|---|---|---|---|---|
| 0 | Gök | ∞ | ∞ | 1 | 5 basamak + litografi geçişi | `#2b2f5c` / `#4d4a80` / `#7d6a95` / `#b98a9e` / `#e6b5a0` | yok | yalnız basamak geçiş çizgileri | 0 |
| 0b | Hale | ∞ | ∞ | 1 | 2 eş merkezli düz disk, kenar net, **disk/güneş yok** | `#f0cdb4` α .55 / .30 | yok | yok | 0 |
| 1 | K1 sırt + Panthéon | 500–1500 (Panthéon 915) | ≥ 99 | 1.005 | yükselen tek siluet + kubbe/tambur/fener (haç ve yaldız yok) | sırt `#a98aa0`, Panthéon `#8d7899` (halenin önünde koyu), gölge yanı (sol) `#7d6a95` | yok | yok | 5 |
| 2 | K2 | 90–160 | 18–32 | 1.03–1.05 | mansard silueti + tarak, 1 duman | `#8d7899` | yok | yok | 5 |
| 3 | K3 | 35–45 | 7–9 | 1.14 | lucarne sırası (%35 ışıklı), tarak, 1 duman | `#6d6384`, ışıklı `#f0d2b8` + havuz `#e6b5a0` α .22 | 3 px `ink` | yok | 7 |
| 4 | K4 karşı sıra | 20–26 | 4.0–5.1 | 1.21–1.30 | terrasson şeridi, brisis (arduvaz), beşik çatılı lucarne, korniş + gölge bandı, baca kümeleri + külah, 1 duman, 4 siluet | brisis `#6d6384` / `#3e3b5c`, kenar ışığı `#d9a995`, cephe `#6f6684`, en koyu `#4e4a68`, külah `#8a6458` / `#4f4347`, kasa `#3a3550`, siluet `#2f2d46` | 4 px | II korniş altı, lucarne gölge yanağı, baca gölge yüzü | 7 |
| 5a | Kendi teras + kırık çizgi | 2.9–6.2 | 0.57–1.23 | 1.2→∞ (kırpılır) | kenetler, gölge ve ışık şeritleri | `#5b5878`, kenet `#3e3b5c`, kenet tepesi `#c9a0a6`, ışık şeridi §1v2.8 | 4→6 px | yok (geniş yüzey) | 5 (yalnız Z > 5.6) |
| 5b | Sağ baca | 4.40–4.85 | 0.87–0.96 | kanca öncesi çıkar | dünya modeli | gövde ışık `#6f6684` / gölge `#4e4a68`, kenar `#e6b5a0`, külah `#8a6458` / `#4f4347` | 4–6 px | II gölge yüzü | — |
| 5c | Yem/su teknesi | 4.65–4.90 | 0.92–0.97 | kancada kadraj altı | iki göz, taneler | ahşap `#7e5a48` / `#4a3844`, su `#4d4a80` | 4 px | yok | — |
| 5d | **Kümes** (dünya modeli, yaw 30°) | 4.70–5.89 | 0.93–1.17 | 6.5–kırpılır | tahta, açıklıklar, saçak, tahta + payanda, el kapağı | ahşap ışık kenar `#b58a6c` / orta `#7e5a48` / gölge `#4a3844` / damar `#3a2c36`; çatı `#5c5a7a`, sağ kenar `#e6b5a0` | 4 px (geniş) → 6 px (kanca, en çok 8) | III saçak altı, IV açıklık içi, II tahta alt yüzü + payanda gölge yüzü | 0 (keskin) |
| 5e | **Kuş + kılıf** | 5.0–5.2 | 1 | 10.3 | Guvercin rig (tasarım §13.2) | tasarım §13.1 güvercin satırları, kılıf `#F0B43C` | rig | kısa 3–5 çizgi gölge tarafında | 0 |
| 6 | Kâğıt + gren | ekran | — | — | `ArsivKatmani` | paper `#e9dfc9` multiply α .14 | — | — | — |
- Katman sırası çizimde: 0 → 0b → 1 → 2 → duman(2) → 3 → duman(3) → 4 → duman(4) → 5a → 5c → 5b → 5d → 5e → 6. Kümes, sağ baca ve tekne dünya modelinde **Z'ye göre** sıralanır (kanca sırasında tekne kümesin önüne geçmez: kadraj dışı).
- **Flu (yalnız kanca tarafı):** σ(cs) = σ_maks · clamp((cs − 1.6)/0.8, 0, 1); cs 1'de 0. Katman grubuna tek `feGaussianBlur`; σ > 3 iken o katmanın konturu çizilmez (çift kenar olmasın). Işıklı pencere flu altında kendiliğinden yumuşak diske döner (ø 16–28 px). Kümes, kuş, kılıf, tahta **keskin**.
- **Duman (3 şerit):** K2 (x ≈ 150), K3 (x ≈ 300), K4 (x ≈ 700) bacalarından. Renk `#8d7899` α .55, kontursuz, 4–9 px kalınlıkta, yukarı doğru incelir ve kümeler hâlinde **çözülerek** biter (fade değil). Yol seed'li sabit eğri; yalnız boyuna kayan dalga fazı 0.15 Hz. Hepsi aynı rüzgârla **hafif sağa** eğilir. Kuşatma kışında yakacak kıtlığı nedeniyle seyrek [G, doğrulanmalı]: 3'ten fazla yok, ışıklı pencere ≈ %35.

### 1v2.7 Gök ve doku (yüzey başına ≤ 3 katman, seed sabit, kaynamaz)
| Yüzey | 1 Taban | 2 Tarama / geçiş | 3 Kâğıt | Kod | Parametre |
|---|---|---|---|---|---|
| Gök | 5 düz basamak (sınırlar dekor y 200 / 380 / 500 / 585) | her sınırın **altında** 3 ince yatay çizgi (üst bandın tonu, 2.5 px, aralık 7, α .35) + 24 px stipple şeridi (ø 2.5 px, yoğunluk .08) | Arsiv | yeni `GokLitografi` | seed 151; yumuşak gradyan yok |
| Hale | 2 düz disk | yok | Arsiv | yeni `HaleParilti {merkez, r:[130,200], alfa:[.55,.30]}` | ışık değişimi yalnız alfa |
| K1 / K2 | düz siluet | yok | Arsiv | `CatiDenizi` v2 satırı | kontursuz |
| K3 | düz ton + pencere dikdörtgenleri | yok | Arsiv | `CatiDenizi` v2 (`lucarne:true`) | 3 px kontur |
| K4 brisis | arduvaz sıra çizgisi her 0.25 m (dekor 16 px), ≥ 1 px | II tarama korniş altı / lucarne gölge yanağı, 72°, 2.5 px, aralık 7, `#2f2d46` | Arsiv | `KarsiSira` v2 | seed 151 |
| Teras (ön) | kenet çifti (ışık `#c9a0a6` 2 px + gölge `#3e3b5c` 4 px), 0.6 m | gölge/ışık şeritleri düz ton (tarama değil) | Arsiv | `CinkoTeras` v2 | 3 hafif su izi kapalı (alacakaranlıkta) |
| Sağ baca | sıva + 1 kabarma lekesi α .10 | II gölge yüzü | Arsiv | `BacaKumesiDunya` | seed +5 |
| Kümes | dikey tahta 0.12 m, tahta başına ±4 % ton; damar 2.5 px α .30 `#3a2c36` yalnız cs ≥ 2.1 | III saçak altı, IV açıklık içi, II tahta alt yüzü | Arsiv | yeni `KumesDunya` | seed 152 |
| Kâğıt | `paper #e9dfc9` multiply α .14, lif ≥ 24 px, 8 soluk leke ø 20–60 α .06, kenarda hafif koyulaşma | — | — | `ArsivKatmani` | **çerçeve yok** (tur-5); `geceLapis` gök gül/ufuk kromasını **≥ %85** korur |
- Tarama açısı tek: **72°** (tasarım §13.5). Geniş yüzeyde (gök, teras, cephe düzlüğü) tarama yok, kafes yok.
- Konturlar `ink(dolgu)` = dolgunun %55 koyusu, kendi tonunda. Saf siyah/beyaz yok.

### 1v2.8 Işık (tek vektör)
- **Kaynak:** batan güneş, azimut 243°, kamera 230° ⇒ **13° sağ, önde**, yükseklik ≈ 2° [T]. Disk Panthéon tamburunun arkasında (çizilmez); hale merkezi (846, 640).
- **`ISIK_YON.alacakaranlik` (dünya, ışığa doğru):** (**0.225, 0.035, 0.974**). v1'deki 200° kamera vektörü geçersiz.
- **Yüz kararları (vektörden):** kameraya bakan her yüz (ön yüzler, kümes ön ve sol yan yüzü, kümes çatısı, K4 cephesi, baca ön yüzleri) **gölgede**, mavi-mor. Işık alan: kümesin sağ yan yüzü (genişte görünmez, kancada kenar şeridi), bacaların sağ yan yüzleri, kenet tepeleri. **Kenar ışığı** `#e6b5a0` 2–3 px: siluetin **sağ ve üst** kenarlarında (kuş sırtı, kanat üstü, kuyruk uçları, saçak üstü, baca sağ kenarı, lucarne çatısının sağ yarısı).
- **Gölge yönü:** zeminde güneşin tersi, **kameraya doğru ve 13° sola**: dünya yönü (−0.225, 0, −0.974). Gerçek boy ≈ 29× (2°); çizimde **≤ 6 × yükseklik** [T, tasarım §13.7]. Ekranda gölgeler nesneden **aşağı, hafif sola** iner ve kadrajın alt kenarından çıkar:
  - kümes gölgesi: tabandan sol-alta, kadrajın sol alt köşesinden çıkar (alt solu koyu kaplar);
  - sağ baca gölgesi: x 932–1082'den aşağı, alt kenarda x ≈ 970–1150;
  - tekne gölgesi: kısa, sola;
  - kuş (kancada): ayaklardan tahtanın üst yüzüne, sola-öne.
- **Işık şeridi (terasta):** iki gölge arasında kalan orta-alt teras (x ≈ 300–900, y ≈ 1450–1920) güneşi sıyırarak alır: taban `#5b5878` yerine `#6d6384` + kenet tepeleri `#c9a0a6`. Kırık çizgi boyunca (güneşe en yakın kenar) 60 px'lik sıcak bant `#b98a9e` α .30 (çinkonun geniş parlama lobu). Hedef-çatıdaki **sol-alt sıcak leke çizilmez**: o noktada kümes gölgesi var (tek ışık kuralı).
- **Pencereler:** ikincil, yalnız kendi çevrelerine `#e6b5a0` α .22 havuz; gölge vermez. Kılıf ışık yaymaz; yalnız sağ üst kenarda `#FBE3A0` kenar.
- **Bilinçli sapma [T]:** disk Panthéon'un arkasındaysa biz kubbenin gölge şeridinde olurduk ve gölge yumuşardı. Hale + kenar ışığı + uzun gölge, tek vektörden üretilen stilize alacakaranlık olarak kabul edildi (tasarım §13.7 onaylı yön).
- **P10a (gün) ışığı:** 09:00, güneş azimut ≈ 135°, yükseklik ≈ 12° (§0.6) ⇒ kamera 230°'ye göre **95° solda, hafif arkada**. `ISIK_YON.gun` = (**−0.974, 0.208, −0.085**). Kümes ön yüzü gölgede, sol yan yüz ışıkta; kuş, kılıf ve el **soldan yan ışık**; gölgeler **sağa** (4.7 × yükseklik), hafif içeri. Kenar ışığı sol kenarlarda `#efe6cc` 2 px.

### 1v2.9 P10a kümes yakın planı (gün) — aynı dekor
- Aynı dünya modeli, aynı kamera yolu, `saat: gun`. Kamera kanca konumunun 0.15 m gerisinden kancaya iter (cs 2.6 → 2.75). Kılıf ekranda sabit kalır (kamera önerisi §1v2.12).
- **Palet:** kümes ahşabı tasarım §13.1 gün değerleri `#a8805f` / `#8c6d56` / `#5a4638`. Gök ve çatı denizi v1 gün paleti (§1.6; v2 gün paleti tanımlanmadı, tasarımcıya soru). Flu ve atmosfer aynı mekanikle; hale yok, duman 1 şerit.
- **Kuş girişi (f0–22, temas f20):** yön sürekliliği için **soldan**: kuş kadraja sol kenardan, **kümes ön yüzünün önünden** (yüzün 0.15–0.25 m önünde, kameraya daha yakın) girer ve tahtanın taşan ucuna konar. Duvarın içinden geçmez: kuş ön yüzün önünde kalır. Konuş teması iniş tahtasında (≈ (700, 1187)): foley.
- **El (memur, gri manşet):** kadrajın alt kenarından, tahtanın önünden kılıfa uzanır; temas kılıfta (≈ (410, 960)). Kol IG alt bandından geçebilir; temas noktası güvenli alanda. El oranı ve kıstırma tasarım §13.8.
- Okunurluk: kılıf ≈ 150 → 195 px (%10 üstü), kuş ≈ 600–800 px, el ≈ 0.19 m × ~2600 px/m ≈ 490 px.

### 1v2.10 Dönem/şehir doğruluk özeti
| Öğe | Durum |
|---|---|
| Haussmann çatı tipi (mansard, terrasson, lucarne, baca külahı) 1870 Paris'inde yaygın | [G] |
| Bd Saint-Germain doğu kesimi 1870'te açık | [G, doğrulanmalı] |
| Panthéon kubbesinin bu çatıdan 230° yönünde görünmesi | [T, doğrulanmalı] (kamera yeri bu soruya göre seçildi) |
| Panthéon 1870'te kilise (Sainte-Geneviève); fenerde haç olabilir | [G, doğrulanmalı] ⇒ haç **çizilmez**, nötr ince fener ucu |
| 1859 korniş sınırının sokak genişliğine bağlı olması (K4 alçak) | [G, doğrulanmalı] |
| Kuşatma kışında seyrek duman / pencere ışığı | [G, doğrulanmalı] |
| Çatı güvercinliği biçimi | [T] (kaynaksız; nötr kulübe, süs yok) |
| Baca külahı rengi soluk toprak | [G] + tasarım §13.1 |

### 1v2.11 Motion için çizim notları ve açık sorular
- **Değişecek sabitler:** `DOLLY_CATI = { F 1326, e 2.8, Zk 5.056, ufuk 635, k 1.419, foe [421.1, 1236.1] }`; yeni sabit `KILIF_DEKOR = [406.1, 1185.7]` (ölçüm ve `kilit.push`). `YAKIN` 0.05 kalır. `ISIK_YON` iki satır (§1v2.8). `CATI_PALET.alacakaranlik` → tasarım §13.1.
- **Yeni / türetilecek modüller:**
  - `KumesDunya {R:[X,Z], yaw:30, en:1.0, derin:0.8, ayak:0.15, sacak:[1.00,1.20], tasma:[0.10,0.05], aciklik:[{ic:0.12},{ic:0.55}], tahta:{h:0.60, derin:0.25, sagTasma:0.10, payanda:true}, elKapagi:'sol', saat, seed}`: `BacaKumesiDunya` gibi köşe başına `dunyaEkran` + yakın düzlem kırpması. Mevcut d = 1 kart `Kumes` geçersiz.
  - `GokLitografi`, `HaleParilti`, `Duman {kaynak, seed}`, `CatiDenizi` v2 satır listesi `{Z, h_kornis, lucarne, isikli_oran, renk, kontur, sigma}`.
  - `GolgeSeridi`: nesne taban çokgeni + `ISIK_YON` → zemin gölgesi (≤ 6h) ve ışık şeridi aynı vektörden.
- **Kaldırılanlar:** `ON_BACA`, v1 `Kumes` kartı, v1 gök 3 basamak, uzak tepe katmanı (K1 sırtıyla değişir).
- **Sınırlar (`sinirlar.json` PARIS-CATI):** cs 0.95–2.85, cx −200…300, **cy −100…300** (v1'de cy ≤ 200 idi; kanca cy 244 ister).
- **Kalibrasyon kareleri:** P01 f0, P01 f370, P10a f48 + P01 f0–300 şeridi (her 4 kare: kümes kırpma kenarı, flu geçişi, maske şeridi yok).
- **Renk ölçüm noktaları (eleştirmen, §6'ya ek):** gök orta (300, 440) `#7d6a95`; gök ufuk bandı (300, 600) `#e6b5a0`; K3 (200, 760) `#6d6384`; teras ışık şeridi (600, 1750) `#6d6384`; teras gölge (150, 1800) `#3e3b5c` civarı; kümes ön (300, 1300) `#7e5a48` (hepsi f370). Kanca: kılıf C\* ≥ 2.3 × sahne maks.
- **Açık sorular:**
  1. *Tasarımcıya:* kümes ölçüsü v2 (ön yüz 1.0 m, saçak 1.00/1.20, ayak, dikdörtgen açıklık) tasarım §4.4'ün yerine geçsin mi? Varsayılan: evet (onaylı hedef).
  2. *Tasarımcıya:* P10a gün için v2 gök/çatı paleti yok; v1 gün paleti + v2 ahşap kullanılıyor. Varsayılan: bu.
  3. *Araştırmacıya:* Bd Saint-Germain doğu kesiminden Panthéon görüşü (230°, ≈ 0.9 km); 1870'te Panthéon fenerinde haç; 1859 korniş kuralı; kuşatmada duman/ışık yoğunluğu.
  4. *Yönetmene:* P10a kuş girişi soldan, kümes yüzünün önünden (§1v2.9). Sorun görülürse sağ üstten (gökten) iniş alternatifi; yön sürekliliği yönetmenin kararı.

### 1v2.12 Yönetmen için kamera önerisi (PARIS-CATI v2; json sahibi yönetmen)
Bütün planlarda `ufuk_y: 635`. `kilif_kilit` yerine `dolly_foe: [421.1, 1236.1]` + `kilif: [406.1, 1185.7]` (motion iki parametreyi ayırınca). Kılıfı ekranda (X\*, Y\*)'a koymak için: s = 1/(1 − 1.419·(1 − 1/cs)), **cx = X\* − 421.1 + 15.0·s**, **cy = Y\* − 1236.1 + 50.4·s**.

| Plan | kare | cs | cx | cy | Not |
|---|---|---|---|---|---|
| **P01** | 0 · 24 · 90 · 190 · 300 · 370 | 2.75 · 2.75 · 2.3 · 1.5 · 1.08 · 1.0 | 105 · 105 · 80 · 40 · 8 · 0 | 244 · 244 · 190 · 100 · 15 · 0 | f0–24 sabit (kalkış okunur), sonra geri ve yukarı çekilme; ufuk 879 → 635. `egri: inout`. Kuş f275–330 sağ üstten çıkar (x ≥ 1000, y ≤ 300) |
| **P11 son** (devam f172–333) | 172 · 250 · 290 | 2.4 · 2.75 · 2.75 | 70 · 105 · 105 | 190 · 244 · 244 | f290'dan sonra kare **P01 f0 ile birebir** (kılıf (374, 960)); kuş soldan iner (temas f222, tahtanın ucu) |
| **P10a** (f0–56, gün) | 0 · 56 | 2.6 · 2.75 | 107 · 144 | 121 · 244 | kılıf her iki anahtarda ekranda **(410, 960)**: itme kılıfı oynatmaz, yalnız büyütür (150 → 195 px). Ufuk 756 → 879 |
- Kontrol kareleri: P01 `kontrol_kare` 24 (kalkış + kılıf), P01 kapanış 370, P11 son 333, P10a 48 (temas).
- Ölçekler (P01 f0): kılıf 195 px, kuş ≈ 800 px gaga–kuyruk, baş üstü y 553; (f370): kümes ≈ 270 px, lucarne ≈ 59 × 85 px (360'ta 20 × 28), siluet bel üstü ≈ 52 px.

---

## 1v3. PARIS-CATI v3 — GEÇERLİ geniş plan + dolly yolu (tur-6, kullanıcı onaylı)

Girdi: `notlar/tur-6.md`, `kalibrasyon/V2/karsilastir.png`, `V2/P01-f370.png`, `hedef/hedef-cati.png`, §1v2, katkı raporu motion V2 bölümü. **Kapsam yalnız geniş plan ve dolly yolu.** Kanca kompozisyonu (§1v2.4), P10a (§1v2.9), kümes/kuş/kılıf geometrisi, ışık vektörü (§1v2.8), doku (§1v2.7), dönem kartı (§1v2.2 kümes dışı satırlar) aynen geçerli. Hesap yine pinhole: `y = ufuk + (e − h)·F/Z`, F 1326; her sayı betikle üretildi, motion ilk still'de ±15 px doğrular.

### 1v3.0 Teşhis (V2 f370) ve tek cümlelik karar
- V2 f370'te göz 2.8 m: karşı sıra (K4) **yandan** görünüyor ⇒ tek düz duvar bandı + tek lucarne sırası; K3 ve ötesi K4'ün arkasında saklı; terasın 686 px'i (y 1234–1920) boş; ışık alan yüz yok (bütün görünen yüzler kameraya, yani güneşe sırt veriyor).
- **Karar:** göz **5.0 m**, ufuk **y 600 (%31.3)**, kamera **bitişik komşu binanın bir kat yüksek terrasson'unda** (ön-plan çerçeve bu çatının kenarı). Çatılar yukarıdan görünür: her sıranın **terrasson üst yüzü + kırık çizgi + brisis'in üst yarısı + baca kümesi** bir öncekinin üstünden taşar ⇒ 4 sık sıra + 2 siluet. Dolly yolu **tek doğrusal öteleme** kalır (yeni FOE/k/Zk).

### 1v3.1 Göz yüksekliği ile kümes büyüklüğü arasındaki zorunlu ödünleşim (orkestra bilsin)
- Kümes tabanı güvenli alanda (y ≤ 1490) ve ufuk y U ise kümesin ekranda **metre başına boyu = (1490 − U) / e** px'tir; F'den ve kümesin Z'sinden bağımsızdır. "Daha yüksek göz + daha büyük kümes + taban güvenli alanda" üçü birlikte **mümkün değil**.
  | e (m) | U | kümes px/m (taban 1490'da) | kümes ön yüz + çatı (≈ 1.3 m) | durum |
  |---|---|---|---|---|
  | 2.8 (V2) | 635 | 305 | ≈ 400 px | çatı denizi görünmüyor |
  | **5.0 (v3)** | **600** | **178** | **≈ 230 px** (360'ta 77 px) | **seçildi** |
  | 6.0 | 600 | 148 | ≈ 190 px | kümes "kulübe" okunurluğunun sınırı |
- **5.0 m seçildi:** çatı denizi yukarıdan okunuyor (K4 terrasson'u 92 px, K3 lucarne'ları K4b'nin üstünden tam görünür) ve kümes hâlâ çatısı + iki açıklığı + iniş tahtasıyla "küçük ev" okunuyor. Kümesin küçülmesi §1v2.1 amacıyla uyumlu: "kapanışta aynı kuş, sonsuz bir çatı denizinin içinde küçücük". Kümes "daha yakın" yapılamaz (taban IG bandına düşer); **sola** alındı.

### 1v3.2 Mimari kart farkları (yalnız değişen satırlar; gerisi §1v2.2)
| Madde | v3 değeri |
|---|---|
| Kamera yeri [T] | Bizim bulvar binamızın **bitişiğindeki, terrasson'u bizimkinden 3.4 m (≈ bir kat) yüksek** bina. 1870'te aynı sırada farklı korniş yükseklikleri olağandır (Haussmann öncesi/sonrası binalar yan yana; köşe binaları fazladan kat) [G, doğrulanmalı]. Göz = o çatıda ayakta 1.6 m ⇒ **bizim terasa göre e = 5.0 m**. Komşu çatının kenarı (yuvarlak çinko kenar, bourrelet) kameranın 1.75 m önünde, h 3.4 ⇒ **ön-plan çerçeve** |
| Bizim terrasson | Kırık çizgi (kenar) **Z 8.9** (V2 6.2). Terrasson görünen bölümü Z 5.47–8.9 (komşu kenarının gizlediği yerden kırık çizgiye) |
| Arka sokak (bizimle K4 arası) | K4 cephesi Z 24 ⇒ sokak ≈ 13 m. K4 korniş h −5.6 (bizimkinden ≈ 3 m alçak, §1v2.2 1859 kuralı [G, doğrulanmalı]) |
| K4 cephesi artık görünür | Korniş altında ≈ 2.9 m krem cephe görünür (gizlenme eşiği h −8.48): **5. kat pencere başları + 5. kat sürekli balkon korkuluğu** (balcon filant; Haussmann cephesinde 2. ve 5. katta sürekli balkon [G, doğrulanmalı]). §1v2.2'deki "5. kat ve balkon görünmez" kalktı. Pencere düz lentolu, kemer yok |
| Sıralar ve arazi | K4 Z 24 · **K4b Z 31 (yeni)** · K3 Z 40 · **K3b Z 52 (yeni)** · K2 90–160 · K1 500–1500. Korniş yükseklikleri her sırada artar (−5.6 · −3.8 · −2.0 · −0.6): Montagne Sainte-Geneviève yükselişi [G] + **hafif abartı [T]** (gerçek eğim bu mesafede ≈ 1 m verir; CLAUDE.md "duygu için hafif abartı serbest", yapı tipi değişmez). Sıra ardına sıra "basamak" bu yüzden fiziksel gerekçeli |
| Bina farklılığı (K4) | Üç bina: B1 x 0–420 korniş h −5.6, 3 aks; B2 x 420–960 korniş h **−5.2**, 4 aks (aks 2.9 m); B3 x 960–1080 korniş h **−6.0**. Bina sınırı = ortak duvar + üstünde baca kümesi. B2 > B3 basamağında B2'nin **sağa bakan açık kalkan duvarı** görünür ve ışık alır (§1v3.5) |
| Kümes yeri (yeni) | Bütün kümes/kuş/kılıf geometrisi V2'ye göre **(ΔX −0.35, ΔZ +2.80) ötelendi**, kendi içinde değişmedi: R = (−0.85, Z 8.00), L = (−1.72, Z 7.50), arka köşeler Z 8.20–8.70; kılıf **K = (−0.859, h 0.70, Z 7.856)**; kanca kamerası **C_k = (−0.759, 0.73, 7.366)**. Kümes arka yüzü kırık çizginin 0.2 m içinde |
| Yem/su teknesi (yeni yer) | X −0.10…0.50, Z 8.00–8.25, h 0.15 (kümesin sağında, bir boy önde değil yanda). Kancada kadraj dışı (sağ-alt, x > 1900) |
| Sağ baca (yeni yer) | X 2.20–2.70, **Z 8.00–8.45**, gövde 1.40, başlık 0.07, 4 külah ø 0.10 boy 0.28 (V2 ölçüsü). Güvenli alanda: x 885–988, külah ucu y 1126, taban 1429. Kancada ve P10a'da kadraj dışı (x > 3000). Motion V2 kararı korunur: **kilit/temas noktası değildir**, çerçeve öğesidir |
| Ön-plan çerçeve (yeni) | Komşu çatının bourrelet'i (ø 0.08 m yuvarlak çinko kenar) + çinko yüzeyinin 0.65 m'lik şeridi, **y 1812–1920** (IG alt bandı; önemli bilgi taşımaz, alt bandı "boş görünmez" yapar). Kenet çizgileri aynı VP'ye (540, 600) |
| Kameradan görünen (geniş, e 5.0) | **Görünür:** bütün sıraların terrasson üst yüzleri (çinko), kırık çizgiler, brisis'ler (arduvaz), lucarne'lar (K4 tam, K4b ve K3 pencere boyunun %90'ı, K3b üst yarısı), baca kümelerinin üst yüzü (başlık plakası ince şerit), K4 korniş üst yüzü (ince şerit), K4 5. kat. Kümesin **çatı üst yüzü belirgin** (göz çatının 3.8 m üstünde), sol yan + ön yüz. Tekne içi (yem + su yüzeyi) görünür. **Görünmez:** sokak, K4'ün 5. kat altı, kümesin sağ yan yüzü, sıraların arka brisis'leri |

### 1v3.3 Geniş kompozisyon (P01 kapanış f370; cs 1, cx 0, cy 0) — §1v2.5'in yerine
| Öğe | Ekran (1080 × 1920) | Not |
|---|---|---|
| Gök basamakları | 0–165 / 165–345 / 345–465 / 465–550 / 550–ufuk | §1v2.7 aynı, sınırlar −35 px (ufuk 635 → 600). Renk: motion V2 düzeltmesi **`#2e3157` / `#504e79`** (tepe/üst) + `#7d6a95` / `#b98a9e` / `#e6b5a0` |
| Hale | merkez **(846, 605)**, r 130 / 200 | ufkun 5 px altı (V2 ile aynı ilişki); üst kenar y 405, yazı bandının (≤ 400) hemen altında |
| Panthéon (×1.6 stilize) | x 830, fener ucu y ≈ 435, tambur ≈ 505–575, kaide K1 sırtının arkasında | halenin önünde koyu `#8d7899` |
| K1 sırt | y 615 (sol) → 562 (Panthéon yanı) | `#a98aa0`, kontursuz |
| K2 siluet | 585–655 | `#9a80a0`, tarak, kontursuz, 1 duman |
| **K3b** (Z 52, yeni) | külah 622, baca 629, sırt 658, kırık 674, lucarne üst yarısı 681–715 | `#8d7899`, kontursuz; lucarne'lar ışıksız, yalnız beşik tepeleri ritim verir |
| **K3** (Z 40) | külah 671, baca 680, sırt 715, kırık 741, **lucarne 752–811** (≈ 30 × 43 px), korniş 832 (gizli) | brisis `#7d6a95`, terrasson `#8a7d99`, 3 px kontur; **ışıklı sıra**: lucarne'ların ≈ %40'ı `#f0d2b8` + havuz α .22 (hedefteki ışıklı sıra), 1 duman |
| **K4b** (Z 31, yeni) | külah 760, baca 772, sırt 810, kırık 856, lucarne 872–948 (K4 sırtının üstünde ≈ 50 px'i görünür) | brisis `#76698a`, terrasson `#857a98`, 3 px kontur; ışıklı ≈ %25 |
| **K4** (Z 24) | külah 890, baca 904, **terrasson 943–1023**, kırık 1023, **brisis 1023–1186** (lucarne 1049–1148, ≈ 49 × 71 px), korniş 1186–1201 (üst yüzü ince şerit), **krem cephe 1201–1345** (pencere başları 1235, balkon korkuluğu 1307–1325) | brisis `#6d6384` / `#3e3b5c`, terrasson `#8a7d99`, cephe §1v3.5; 4 px kontur; ışıklı lucarne ≈ %35, 5. kat pencerelerinden 2'si ışıklı; en çok 3 siluet (lucarne'larda) |
| Bizim kırık çizgi | **y 1345** | 6 px açık + 4 px koyu yuvarlak çinko kenar |
| Kümes | x 197–420 (saçak ve tahta ucu dahil ≈ 430), arka saçak üstü 1179, ön saçak 1263 (R) / 1307 (L), taban R **1429** / L **1484** | çatı üst yüzü belirgin; açıklıklar + tahta okunur; ≈ 230 × 305 px |
| İniş tahtası ucu / kılıf | (414, 1316) / (395, 1326) ≈ 12 px | kuş kapanışta yok (f275–330'da çıkmış) |
| Yem/su teknesi | x 523–623, y 1380–1429 | iki göz görünür, taneler tahtada |
| Sağ baca | x 885–988, külah ucu 1126, başlık 1185, taban 1429 | güvenli alanda ✓; haleyi ve Panthéon'u örtmez (külah 1126 ≫ hale alt sınırı) |
| Bizim teras | 1345 → 1812 | kenetler VP (540, 600)'e; kümes gölgesi sol-alta, baca gölgesi alta (§1v2.8 vektörü), aradaki ışık şeridi x ≈ 450–850 |
| Ön-plan çerçeve (komşu çatı kenarı) | **1812 → 1920** | bourrelet üstü 3 px `#c9a0a6` parlama çizgisi, yüzey `#3e3b5c`, 2–3 kenet `#2f2d46`; kontursuz değil, 6 px kontur (en yakın katman) |
- **Üçte birler:** üst (0–640) gök + hale + Panthéon + K1/K2/K3b sırtı; orta (640–1280) K3 ışıklı sıra, K4b, K4 çatısı + lucarne'lar (hedefteki yoğunluk); alt (1280–1920) K4 krem cephe şeridi, kümes, tekne, baca, teras gölge/ışık şeritleri, ön-plan kenarı. **Boş karanlık teras kalmadı:** terasın görünen yüksekliği 686 → 467 px.
- **Güvenli alan:** kümes tabanı L 1484 ≤ 1500 ✓, tekne 1429 ✓, baca x ≤ 988 ≤ 1000 ✓ ve taban 1429 ✓, kümes sol kenarı 197 ≥ 80 ✓.
- **Kuş çıkışı (f275–330):** tahta ucundan sağ üste; yol x 900'ü y ≈ 580'de geçer ⇒ **halenin önünden** geçer (sağ bacanın 500 px üstünden). Öneri: kuş siluetinin halenin üstünden geçtiği 6–10 kare kapanışın imgesi olur; kanat kenar ışığı halenin önünde koyu siluete döner (ters ışık, tek kaynak).
- **Ufuk–ölçek doğrulaması:** terasımızda ayakta bir insan (h 1.7, Z 8) başı y 1147 < ufuk değil, ufkun 547 px altında: göz 5 m'de herkes ufkun altında ✓ (yüksek bakış). Bütün sıra satırları formülden.

### 1v3.4 Katmanlar v3 (dekor = geniş ekran; arkadan öne; §1v2.6'nın yerine geçen satırlar)
| # | Katman | Z (m) | d = Z/7.856 | s @ kanca (cs 2.75) | Hex | Kontur | Tarama | Flu σ @ kanca |
|---|---|---|---|---|---|---|---|---|
| 0 / 0b / 1 | Gök / hale / K1 + Panthéon | ∞ / ∞ / 500–1500 | — | 1 / 1 / ≈1.01 | §1v3.3 | yok | yok | 0 / 0 / 5 |
| 2 | K2 | 90–160 | 11–20 | 1.05–1.09 | `#9a80a0` | yok | yok | 5 |
| 3a | **K3b** | 52–57 | 6.6–7.3 | 1.16 | `#8d7899` | yok | yok | 6 |
| 3b | K3 | 40–45 | 5.1–5.7 | 1.22 | brisis `#7d6a95`, terrasson `#8a7d99`, pencere `#f0d2b8` | 3 px | yok | 7 |
| 4a | **K4b** | 31–37 | 3.9–4.7 | 1.31 | brisis `#76698a`, terrasson `#857a98` | 3 px | yalnız lucarne gölge yanağı | 7 |
| 4b | K4 | 23.4–30 | 3.0–3.8 | 1.45 | §1v2.6 K4 satırı + cephe §1v3.5 | 4 px | II korniş altı, lucarne gölge yanağı, baca gölge yüzü, balkon altı | 7 |
| 5a | Bizim teras + kırık çizgi | 5.47–8.9 | 0.70–1.13 | 1.3→∞ (kırpılır) | §1v2.6 | 4→6 px | yok | 5 (yalnız Z > 8.3) |
| 5b / 5c / 5d / 5e | Sağ baca / tekne / kümes / kuş + kılıf | §1v3.2 | ≈ 1.0–1.1 | kanca dışı / dışı / §1v2 / 16.0 | §1v2.6 | §1v2.6 | §1v2.6 | §1v2.6 |
| 6 | **Ön-plan çerçeve** (komşu kenarı) | 1.10–1.75 | 0.14–0.22 | kamera geçince kadraj altı | yüzey `#3e3b5c`, kenet `#2f2d46`, parlama `#c9a0a6` | 6 px | yok | 0 |
| 7 | Kâğıt + gren | ekran | — | — | `ArsivKatmani` litografi | — | — | — |
- Duman v3: 3 şerit **K2 (x ≈ 150), K3 (x ≈ 330), K4 (x ≈ 700)**; K4b'de yok (3 sınırı). Hepsi sağa eğik, çözülerek biter.
- Kanca arka planı (flu) yeni sıralar yüzünden biraz yoğunlaşır; kanca tablosundaki flu konumlar küçük kayar: kendi kırık çizgimiz 1470 → **1510**, K4 lucarne 1290 → **1279**, K4 baca kümeleri 1040 → **≈ 1000**, K4 korniş ≈ 1384. Keskin olan her şey (kuş, kılıf, kümes, tahta, payanda, saçak, açıklık) **piksel piksel aynı** kalır.

### 1v3.5 Işık ve sıcaklık (tek vektör §1v2.8 değişmez; yalnız hangi yüzün sıcak olduğu yazıldı)
Kaynak aynı: güneş 243°, eksenin 13° sağı, yükseklik ≈ 2°, `ISIK_YON.alacakaranlik` (0.225, 0.035, 0.974). Kameraya bakan yüzler gölgede kalır (kural). V2'de bu yüzden "sıcak ışık yok"tu; yukarıdan bakınca güneşe dönük yüzler görünür hâle geliyor:
| Yüz | Neden sıcak | Hex | Ölçü |
|---|---|---|---|
| Terrasson **arka sırtı** (her sıra) | güneşe en yakın kenar, çinkonun geniş parlama lobu (sıyırma ışık) | `#c9a0a6` α .45 bant | K4 10 px, K4b 7, K3 5, K3b 3 |
| Kırık çizgi bourrelet'i (her sıra) | yuvarlak kenarın güneşe bakan üstü | `#e6b5a0` | 2 px (K4 3 px) |
| **Sağa bakan** yan yüzler: baca gövdeleri (kadrajın sol yarısındakiler), lucarne sağ yanakları, B2'nin açık kalkan duvarı | normalin X bileşeni güneşe dönük | ışık yüzü `#c4a59a`, kenar `#e6b5a0` 2–3 px | kalkan duvar ≈ 1.2 × 2.5 m |
| Sola bakan yan yüzler (kadrajın sağ yarısındaki bacalar) | güneşe sırt | `#8a7a8c` + sağ kenar `#e6b5a0` 2 px | — |
| Baca külahları | §1v2 | `#8a6458` / `#4f4347`, sağ kenar `#e6b5a0` | — |
| Kümes çatısı (çinko, öne iner) | güneşe sırt ama yukarıdan görünür, sağ kenarı ve sırtı ışıkta | `#5c5a7a`, sırt + sağ kenar `#e6b5a0` 3 px | — |
| **Krem cephe (K4, 5. kat)** | güneşe sırt (kontrajur) **ama** kameranın arkasındaki doğu göğünden pembe yansıma alır (alacakaranlık karşı-parıltısı, "Venüs kuşağı": batışta doğu göğünün pembe bandı [G]). Gölge vermez, yalnız yüz tonu | taban `#9c8a96`, korniş altı 30 px `#a8908f`, pencere söve/korniş alt yüzü `#7d6f86` | bu tonlar **yeni** (tasarım §13.1'de krem cephe gölge `#6f6684` idi; tasarımcı onayı istenir, gerekçe: hedefteki "krem cephe ters ışıkta sıcak") |
| Lucarne yanakları / pencere çevresi (krem) | aynı yansıma | `#b89c96`, sağ yanak `#d2b0a4` | — |
| Pencereler | ikincil, §1v2.8 | `#f0d2b8` + havuz `#e6b5a0` α .22 | K3 %40, K4 %35, K4b %25, K4 5. kat 2 pencere |
| Teras ışık şeridi + kırık çizgi sıcak bandı | §1v2.8 | aynı | şerit x 450–850, y 1400–1812 |
- **Kılıf tekliği (§13.3) korunur:** yeni tonların hepsi ölçüldü: `#9c8a96` L\* 59 C\* 10 · `#a8908f` 62 / 10 · `#c4a59a` 70 / 14 · `#d2b0a4` 75 / 15 · `#b89c96` 67 / 12 · `#76698a` 47 / 20 · `#857a98` 53 / 18 · `#8a7d99` 54 / 17 · `#9a80a0` 57 / 21. Hepsi C\* ≤ 28, L\* ≤ 88. **Not (motion V2):** tasarım paletindeki gök tepe/üst (`#2b2f5c` C\* 30, `#4d4a80` C\* 34) "kılıf dışı C\* > 32 yok" kuralını bozuyordu; motion **`#2e3157` / `#504e79`** (C\* 25 / 27, aynı L\* ve ton) kullandı. Bu şartnamede geçerli değer budur; tasarım §13.1'in güncellenmesi tasarımcıya not.
- Hedefteki sol-alt sıcak leke yine çizilmez (orada kümes gölgesi; §1v2.8).

### 1v3.6 Dolly v3: tek doğrusal yol (yükseliş eğrisi değil)
- **Karar: doğrusal.** Gerekçe: (1) mevcut `dolly.ts` katman modeli (her d düzlemi FOE'den radyal ölçek) yalnız sabit FOE'li **saf ötelemede** doğrudur; eğri yolda FOE kare kare kayar ⇒ kod değişir (günlük model: şablon sabitleri değişsin, formül değil). (2) Doğrusal yol fiziksel olarak temiz: kamera kuş hizasından **geri ve yukarı** tek çizgide çekilir, komşu çatı kenarının 0.59 m üstünden geçer, hiçbir nesneye girmez. (3) Görsel his: inout eğrisiyle "vinç" gibi okunur; yükseliş ile geri çekilme birlikte olduğu için çatı denizi kademeli açılır (önce K4 lucarne'ları, sonra K3 ışıklı sıra, en son terrasson'lar ve ön-plan kenarı).
- **Dünya:** geniş kamera C_w = (0, 5.0, 0); kanca C_k = (−0.759, 0.73, 7.366). Öteleme **T = (−0.759, −4.27, +7.366) m**, |T| 8.55 m. Kamera yönü (230°, yatay eksen + lens kaydırma) değişmez.
- **Yeni sabitler:**
  ```
  DOLLY_CATI = { F: 1326, e: 5.0, Zk: 7.856, ufuk: 600, k: 1.4734, foe: [403.4, 1368.7] }
  KILIF_DEKOR = [395.0, 1325.8]
  YAKIN = 0.032          // = 0.25 m / Zk. V2'de 0.05 × 5.056 = 0.25 m idi; 0.05 kalırsa yakın düzlem 0.39 m'ye çıkar
                         // ve kancada kümes ön yüzünün sol kısmı kırpılır (döngü kilidi bozulur). Öneri: YAKIN metre ile (0.25) tanımlansın.
  ```
  δ_max = 7.366/7.856 = 0.9376; δ(cs) = 1.4734·(1 − 1/cs); kılıf ölçeği s = 1/(1 − δ); kanca s = 16.03 ⇒ kılıf 12.15 px × 16.03 = **195 px** (V2 ile aynı).
- **Kılıfı ekranda (X\*, Y\*)'a koymak:** **cx = X\* − 403.4 + 8.4·s**, **cy = Y\* − 1368.7 + 42.9·s**. Kanca (374, 960) ⇒ cx **105**, cy **279** (ufuk 600 + 279 = **879**, V2 ile aynı). Döngü kilidi korunur: kanca kamerası kümese göre aynı yerde, aynı yönde, aynı lens kaydırmasıyla.
- **Anlamı değişen sayı:** aynı cs değeri artık farklı mesafe demek (k 1.419 → 1.4734, δ_max 0.903 → 0.938). V2 json'daki ara cs değerleri yeni tabloyla değiştirilir.
- **Sınırlar (`sinirlar.json` PARIS-CATI):** cs 0.95–**2.80** (2.80'de kılıfa 0.42 m; 2.85'te 0.34 m, kümes kırpması kancadan farklılaşır), cx −200…300, cy −100…**300** (kanca 279).
- **Ön-plan kenarı dolly'de:** cs ≈ 1.04'ten büyükken kadraj altında; f300–370 arasında alttan girer ve 1812'de durur (kamera komşu çatının üstüne geri çekilmiş olur). Kamera kenarın üstünden cs 1.18'de geçer (h 3.99 > 3.4 ✓).
- **Kamera yolu tablosu:**
| cs | δ | kamera X / h / Z (m) | kılıf s | kılıf px | not |
|---|---|---|---|---|---|
| 1.00 | 0 | 0 / 5.00 / 0 | 1.00 | 12 | geniş |
| 1.08 | 0.109 | −0.09 / 4.50 / 0.86 | 1.12 | 14 | ön-plan kenarı kadraj altında |
| 1.18 | 0.225 | −0.18 / 3.98 / 1.77 | 1.29 | 16 | komşu kenarının üstünden geçiş |
| 1.50 | 0.491 | −0.40 / 2.76 / 3.86 | 1.97 | 24 | |
| 2.30 | 0.833 | −0.67 / 1.21 / 6.54 | 5.98 | 73 | |
| 2.52 | 0.889 | −0.72 / 0.95 / 6.99 | 9.05 | 110 | P11 f172 |
| 2.655 | 0.921 | −0.74 / 0.82 / 7.22 | 12.26 | 149 | P10a f0 |
| **2.75** | **0.938** | **−0.76 / 0.73 / 7.37** | **16.03** | **195** | kanca |

### 1v3.7 Motion V2 sapmaları şartnameye işlendi (geçerli değerler)
| Öğe | §1v2 | **Geçerli (v3)** | Gerekçe (motion) |
|---|---|---|---|
| İniş tahtası üst yüzü | h 0.60 | **h 0.655** | rig ayak–kılıf aralığı; kılıf K ve kamera kilidi korunarak ayak tahtaya basar |
| Açıklık eşiği | 0.62 | **0.67** | tahta açıklığın altında kalsın |
| Açıklık-1 içeri payı | R'den 0.12 m | **0.08 m** | kuyruk yelpazesinin arkası koyu (kılıf kontrastı) |
| Payanda | taşan ucun altı | **R köşesinin 0.03 m içi** | taşan ucun altında duvar yok; payanda duvara basar (fizik ✓) |
| Gök tepe / üst | `#2b2f5c` / `#4d4a80` | **`#2e3157` / `#504e79`** | kılıf dışı C\* > 32 yasağı |
| Kalkış gövde eğimi (PARIS-CATI) | 42° | **26°** | baş üst yazı bandına girmesin |
| Sağ baca | kilit noktası | **kilit dışı, çerçeve öğesi**; v3'te güvenli alana alındı (§1v3.2) | olay/temas değil |
| K4 lucarne aksları | — | §1v3.2 B1/B2/B3 aksları geçerli (V2 "bina-3 aks 104, ofset 580" kalkar) | v3'te K4 Z 24, px/m 55 |
| Siluetler | 4 | **en çok 3**, K4 lucarne'larında | 360'ta ≈ 11 px; daha fazlası kalabalık |

### 1v3.8 Motion için çizim notları
- **Değişen yalnız sabitler ve dünya yerleri:** `DOLLY_CATI`, `KILIF_DEKOR`, `YAKIN` (§1v3.6); kümes/kuş/kılıf/tekne/baca dünya konumları (§1v3.2). Kümes iç ölçüleri §1v3.7.
- **`CatiDenizi` v3 satır listesi** `{Z, h_kornis, binalar:[{x0,x1,dh}], aks, lucarne, isikli_oran, brisis, terrasson, kontur, sigma, sirtParlama}`: K4 (24, −5.6, B1/B2/B3), K4b (31, −3.8), K3 (40, −2.0), K3b (52, −0.6). Her sıra kendi derinliğinde **dünya modeli** (`dunyaEkran`) — terrasson üst yüzü artık bir dörtgen (kırık çizgi Z+0.96 → sırt Z+5), yandan şerit değil. Yeni öğe: `KalkanDuvar {x, h0, h1, isik:true}`, `BalkonFilant {y, ritim}` (yalnız K4, tek koyu çizgi + dik çubuk ritmi 12 px, 360'ta tek çizgi okunur).
- **`OnCerceve`** (komşu çatı kenarı): Z 1.10–1.75, h 3.4, d < 0.25 ⇒ yakın düzlem kırpması zemin gibi (`kirpCiz`). Toptan gizlenmez.
- **Kontrol karesi:** P01 f370 (geniş), f300 (ön-plan girişi), f0 ve f24 (V2 kanca ile piksel farkı yalnız flu arka planda olmalı), P11 son, P10a f48; şerit P01 f270–370 her 4 kare (ön-plan kenarının alttan girişi, kuşun hale önünden geçişi, maske şeridi yok).
- **Renk ölçüm noktaları (f370, §1v2.11'in yerine):** gök orta (300, 405) `#7d6a95`; gök ufuk bandı (300, 570) `#e6b5a0`; K3 brisis (200, 780) `#7d6a95`; K4 terrasson (300, 985) `#8a7d99`; K4 krem cephe (700, 1270) `#9c8a96`; teras ışık şeridi (650, 1650) `#6d6384`; kümes ön (300, 1400) `#7e5a48`. Kılıf dışı C\* > 32: 0 px.

### 1v3.9 Açık sorular
1. *Tasarımcıya:* krem cephe kontrajur tonu `#6f6684` → `#9c8a96` / `#a8908f` (Venüs kuşağı yansıması) ve lucarne kremi `#b89c96`; gök tepe/üst motion değerleri (§13.1 güncellemesi). Varsayılan: bu şartnamedeki değerler.
2. *Araştırmacıya:* bir sırada bir kat yüksek bitişik bina (kamera yeri) 1870 Bd Saint-Germain doğusunda olağan mı; 5. kat balcon filant; Venüs kuşağı gerekçesi genel optik bilgi [G].
3. *Yönetmene:* P01 f190 civarında kümes tabanı geçici olarak y ≈ 1666'ya (IG bandı) iner; hareket hâlinde, temas anı yok. Kabul edilmezse f190 cy 60 → 0 (ufuk 600, kılıf y 1284).

### 1v3.10 Yönetmen için kamera tablosu v3 (json sahibi yönetmen)
Bütün planlarda **`ufuk_y: 600`**, `dolly_foe: [403.4, 1368.7]`, `kilif: [395.0, 1325.8]`.
| Plan | kare | cs | cx | cy | Ekranda (doğrulama) |
|---|---|---|---|---|---|
| **P01** | 0 | 2.75 | 105 | 279 | kılıf (374, 960) 195 px, ufuk 879 — V2 ile aynı kare |
| | 24 | 2.75 | 105 | 279 | aynı (kalkış okunur) |
| | 90 | 2.30 | 80 | 215 | kılıf (433, 1327) 73 px, ufuk 815 |
| | 190 | 1.50 | 40 | 60 | kılıf (427, 1344), ufuk 660; kümes görünür, K4 lucarne'ları açılır |
| | 300 | 1.08 | 8 | 0 | kılıf (402, 1321), ufuk 600; kümes tabanı 1499; ön-plan kenarı henüz alt dışı |
| | 370 | 1.00 | 0 | 0 | geniş (§1v3.3); ön-plan kenarı 1812 |
| **P11 son** (devam f172–333) | 172 | 2.52 | 77 | 153 | kılıf noktası (405, 1134), 110 px (V2 ile aynı ekran yeri/boy) |
| | 250 | 2.75 | 105 | 279 | kanca |
| | 290 | 2.75 | 105 | 279 | f290'dan sonra **P01 f0 ile birebir** |
| **P10a** (f0–56, gün) | 0 | 2.655 | 109 | 117 | kılıf (410, 960) 149 px, ufuk 717 |
| | 56 | 2.75 | 141 | 279 | kılıf (410, 960) 195 px, ufuk 879 |
- `egri: inout` P01 f24–370. Kuş f275–330 tahtadan sağ üste çıkar, halenin önünden geçer (x ≥ 1000, y ≤ 300'de kadraj dışı).
- Kontrol kareleri: P01 24 (kontrol_kare) ve 370, P11 333, P10a 48. Lint notu: "v3 kamera, motion v3 sabitleri sonrası render".

### 1v3.11 Not (tur-9): Panthéon fenerinde küçük haç
- **Karar:** haç **eklenir**. Kaynak: arastirma Ek E3.4. 1851–1871 kilise döneminde fenerde haç vardı; orta güven, aralıktan çıkarım. Bu not §1v2.10'daki "haç çizilmez" satırının ve §1v2.6 K1 satırındaki "haç yok" ifadesinin yerine geçer.
- **Biçim:** fener ucunda sade Latin haçı. Boy 14 px (dekor; fener ucu y ≈ 435 → 421), kol 8 px, çizgi 2 px, kol düşey çubuğun üst üçte birinde. **Yaldız, altın ve parıltı yok:** malzeme doğrulanamadı, ayrıca sarı metal yasağı var (tasarım §14.4). Renk Panthéon siluetiyle aynı: alacakaranlıkta `#8d7899`, P10a günde `#b0a6c0`. Kenar ışığı yok.
- **360 px:** ≈ 5 px boy, çizgi 0.7 px. "Haç" değil, fener ucunda ince bir uç olarak okunur. Kabul edilir: haç ya da nötr uç, ikisi de dönem için yanlış değil. Kancada (cs 2.75) Panthéon bulanık, haç da onunla bulanık. Ayrı dokunuş taşımaz.

---

## 2v2. KE-PK-S2 MONTMARTRE v2 — GEÇERLİ (tur-8, hedef onaylı; P03 `meydan`, P06b `yukleme`, P07 `gok` + `sepet`)

> **Tur-9 (2026-11-12): P06b ve P07'nin mekânı hale ile değişti → §2v2-H (`arka: "hale"`).** Bu bölümdeki P06b/P07 arka plan öğeleri (ağaç, Paris bandı, meydan kenarı, toprak zemin, `gunMontmartre` ışığı, yatay bulvar) P06b/P07 için **geçersiz**. Sepet, balon, sandık, torba, figür ve kamera sayıları geçerli. **P03 `meydan` Montmartre'da kalır** (E3.2).

Girdi: `hedef/hedef-montmartre.png` + `prompt-montmartre.txt`, tasarım §14 (sabah dili, palet, yasaklar; **hex'lerin sahibi tasarım**), `notlar/tur-8.md`, §1v2/§1v3 (yöntem), `kalibrasyon/V3/elestiri.md` + katkı raporu V4 (ızgara, tek ışık, sıcaklık dersleri), `bolum.json` P03/P06/P07, `arastirma.md` §5. Hesap pinhole + lens kaydırma (dikeyler dik): `x = 540 + (X − Xk)·F/z`, `y = U + (e − h)·F/z`, z = kameradan derinlik. Bütün sayılar betikle üretildi; motion ilk still'de ±15 px doğrular. **§2.1–§2.7 (v1) arşivdir**; §5, §6, §7.4–7.7, §8, §9'daki MONTMARTRE satırlarının yerine bu bölüm geçer. Kod/görsel/git yok.

### 2v2.0 Hedeften bilinçli farklar (tek tablo; orkestra ve eleştirmen bunları "hata" saymaz)
| Hedef | v2 | Neden |
|---|---|---|
| Kâğıt çerçeve | yok | tur-8 |
| Balon görseldeki gibi duruyor | P03'te yığından şişer (§2v2.4), hedef = s 0.5 karesi (f55) | tur-8 |
| Küre tepesi y 240 | dolu kürede **y 430**; s 0.5'te 623 | üst yazı bandı 240–400 f12–296 açık: yazı dokunuşun (şişen küre) üstüne binmez |
| Sepet:küre ≈ 1:3.2 (sepet 250 px) | **1:5.5** (küre 6.6 m, sepet 1.2 m) | hedef küreyi insan boyuna göre ≈ 6–7 m çiziyor (kalabalık ölçeğiyle); 1:3.2 sepeti fiziksel olarak 2 m yapar. Tasarım N1 "1:8, küre ≈ 15 m [G]" → **tasarımcıya not** (açık soru 1) |
| Sepette asılı kum torbaları | P03'te **yok** | json P03: torbalar P06'da kurulur (kurulum → P07 karşılık) |
| Meydan kenarında alçak duvar | **yok**; kenar = toprak kırığı | duvar Paris bandını 25 px'e indiriyor (§2v2.5) ve kaynaksız yapı |
| Sepet dümdüz cepheden | sepet **25° döndürülmüş** (sol yüz ışıkta) | hedefteki iki tonlu hacim; dik cephede sol yüz görünmez, sepet tek koyu leke olur |
| 6 siluet | 6 + **1 kazıkçı** (halatı çözer) | "halat çözülür" f112 temasının görünür bir faili olmalı |

### 2v2.1 Duygusal amaç ve görsel dil
| Görünüm | Amaç (tek cümle) | Baskın şekil · ritim · sıcaklık · kontrast |
|---|---|---|
| `meydan` (P03) | Yerdeki kumaş yığını göğü dolduran bir umuda dönüşür. | Ortada büyüyen tek daire, onu taşıyan halat dikeyleri. Solda organik diyagonal (ağaç), sağda geometrik dikey (ev): asimetrik denge. Gök soğuk, ışık alan her yüz gül-krem. Orta kontrast; en koyu şey kalabalık |
| `yukleme` (P06b) | Ağırlık: sandık sepeti ezer, adam bilinmeyene biner. | Altta geniş yatay hasır kütlesi, üstte yakınsayan halat yelpazesi. Sıcak sepet yanı, soğuk ön yüz. Alçak kamera kütleyi büyütür |
| `gok` (P07 A) | Açıkta ve savunmasız: altta şehir kayıp gider, yanındaki balon düşer. | Üst yarıda iki daire (büyük sol / küçük sağ), alt yarıda ufka yakınsayan blok dokusu, bir yatay ve bir diyagonal bulvar. En açık ve en soğuk görünüm |
| `sepet` (P07 B) | Soğukkanlı hesap: bakmadan bırakılan torba, uzaklaşan yer. | Diyagonal rim çizgisi ekranı böler. Üstte gök + siluet, altta torbaların düzensiz ritmi + şehir. Kontrajur siluet |

### 2v2.2 Mimari kart (Montmartre eteği, Place Saint-Pierre, 12 Kasım 1870 sabahı)
| Madde | Değer |
|---|---|
| Kaynak durumu | Kalkış yeri Place Saint-Pierre, Butte eteği [A: SP-N, IRSEM, RT] (Neptune, Armand-Barbès). **1870 görünümü doğrulanamadı** [A §5.1]. Sacré-Cœur yok (1875 sonrası) [A §5.1]. **Niépce/Daguerre'nin kalkış yeri arastirma.md'de yazılı değil**; genel bilgim bu iki balonun Gare d'Orléans'tan kalktığı yönünde [G, **doğrulanmalı**, açık soru 2]. Bu yüzden P06b/P07'de görünen hiçbir şey Montmartre'a özgü değildir (sepet, gök, adı konmamış şehir dokusu) |
| Dönem ve üslup | Montmartre 1860'ta Paris'e katıldı [G]. Meydan kenarında Haussmann cephesi **yok**: eski varoş evi, sıvalı, düz lentolu pencere, kırma çatı [G, nötr]. PARIS-CATI'deki krem kesme taş/mansard dili yalnız ufuk bandında ve havadan şehirde |
| Kamera yönü | Hep **güney (180°), Paris'e**. Tepe kameranın arkasında (doğrulanmamış görünüm çizilmez). Güneş 45° solda-önde, kadraj dışında |
| Yapı tipi | Açık meydan, sıkıştırılmış toprak, düz kabul (eğim çizilmez). Güney kenarı (meydan kamerasına 60 m) toprak kırığıyla biter, ötesi aşağıda kalan Paris |
| Yan ev (sağ, tek) | Batı kenarda, **2 kat + kırma çatı**. Ön (kuzey) cephe 11 m, derinlik 8 m. Kat yüksekliği 3.0 m, 0.4 m subasman ⇒ saçak h 6.4; çatı eğimi 35° ⇒ mahya h 9.2. Pencereler `duz` (düz lento) 1.0 × 1.6 m, söve yok, aks 3.0 m; zemin kat denizlik h 1.0, üst kat h 3.9. **Kemer yok** (§0.4). Panjur, balkon, tabela, kapı süsü yok. Doğu kalkanı yerine **kırma (hip) çatının doğu üçgeni**. Tek baca: doğu eğiminde, 0.5 × 0.5 × 1.3 m, 2 külah. Saçak 0.3 m taşar, altı görünür |
| Ağaç (sol, tek) | Çıplak kış ağacı, 13 m, gövde ø 0.5 m, 3 kademe dal, taç yarıçapı 6 m (sağa daha uzun). Tür iddiası yok [G] |
| Zemin | Sıkıştırılmış toprak + seyrek çakıl, 3 tekerlek izi [T, kaynaksız; "kaldırım" iddiası yok]. json P03/P06 `alt_ucte_bir` alanındaki "kaldırım taşı" ifadesi **toprak** olarak düzeltilmeli (yönetmene not) |
| Ufukta Paris | Tepeden görülen çatı bandı: mansard + baca tarağı + iki duman şeridi; **anıt, kubbe, kule, değirmen, kilise yok** (§0.7) |
| Kameradan görünen | `meydan` (göz 1.6): evin saçak altı, kırma çatının kuzey yüzü ve doğu üçgeni görünür (saçağa bakış açısı 10.5° < 35° eğim), mahya ucu kadraj dışında. Sepet rimi üstü ve içte posta çuvallarının ağızları görünür (göz rimin 0.65 m üstünde). Paris çatıları yalnız siluet (hemen hemen yandan). `yukleme` (göz 1.0): rim üstü yalnız ince şerit; sepet içi görünmez; küre kadraj üstünde, yalnız halka ve halatlar. `gok`/`sepet`: şehir yukarıdan, sokaklar alçak güneş yüzünden gölgede |

### 2v2.3 Tek dünya modeli (dört görünüm aynı dünyadan)
Dünya ekseni: orijin = **Niépce sepetinin zemin merkezi**. X sağa (batı), h yukarı, Z ileri (güney). Sepet 25° döndürülmüş: köşeler FL (−0.29, −0.80) · FR (0.80, −0.29) · BL (−0.80, 0.29) · BR (0.29, 0.80); sol yüz normali (−0.91, −0.42) kameraya ve güneşe döner.
| Nesne | Dünya (X, Z) m | Ölçü | Görünümler |
|---|---|---|---|
| Sepet | (0, 0), yaw 25° | 1.2 × 1.2 × 0.95 | hepsi |
| Halka / küre | sepet ekseni | §2v2.4 | hepsi |
| Kazık (bağlama direği) | (2.9, −1.2) | ø 0.12, h 0.9 | meydan |
| Kazıkçı (F1) | (3.35, −1.5) | 1.74 m | meydan |
| Bağlama halatı | FR alt köşe → kazık (meydan) / FR alt köşe → kadraj sağ-altı (yukleme) | ø 0.03 | meydan, yukleme |
| Gaz hortumu | sol dış (−3.2, −9.0) → kangal (−1.6, −6.4) → sepet sol yanı → boğaz | ø 0.12 | meydan |
| Yerde 2 posta çuvalı (yüklenecek) | (−1.0, −7.9), (−0.6, −7.6) | 0.4 × 0.6 m | meydan |
| Kalabalık sol | (−5.1, 5.1) 1.80 · (−4.3, 3.9) 1.60 kadın, şal · (−3.4, 6.2) 1.15 çocuk | | meydan |
| Kalabalık sağ | (3.2, 3.2) 1.72 · (4.0, 4.4) 1.84 pelerin · (4.8, 2.8) 1.58 kadın | | meydan |
| Ağaç | gövde (−7.0, 7.6) | 13 m | meydan, yukleme (yalnız taç) |
| Yan ev | doğu yüzü X 6.0, kuzey cephe Z 7.6, X 6–17, Z 7.6–15.6 | §2v2.2 | meydan |
| Meydan güney kenarı | Z 45.6 | toprak kırığı | meydan, yukleme |
| Yükleyiciler (F1) | (−0.45, 1.05), (0.40, 1.10) | 1.75 / 1.68 | yukleme |
| Dagron (F2) | (−1.0, 0.6) sepetin sol-arkası → biner | 1.70 | yukleme, sepet (siluet) |
| Daguerre (2. balon) | (9.4, 36.7) | aynı balon modeli | yukleme, gok |
| Paris | meydan kenarının ötesi, ≈ 40 m aşağıda [G] | §2v2.11 | hepsi |
Kameralar: `meydan` (0, h 1.6, Z −14.42) · `yukleme` (0.1, h 1.0, Z −3.40) · `sepet` (0.1, rim + 0.30 = h 1.25, Z −3.40; sepetle birlikte havada) · `gok` havada, Niépce'nin 22 m kuzeyinde, yüksekliği H(t) (§2v2.7). Hepsinde F 1500.

### 2v2.4 Balon, sepet, sandık, torba: ölçü ve durumlar
**Dolu balon (yerde, bağlı):** sepet 0–0.95 · askı halatları rim → halka · **halka h 2.60** (ø 0.9) · boğaz h 2.9–3.4 · **küre ø 6.6 m**, alt kutup h 3.4, merkez 6.7, tepe 10.0. Ağ: 9–11 meridyen + 4 paralel, yalnız üst-yan yüz (tasarım §4.1).
**Şişme (P03, json f6–104):** gaz hacmi doğrusal ⇒ yarıçap `r = 3.3·s^(1/3)` (başta hızlı büyür, üst üçte biri erken doldurur); tepe `h = 1.0 + 9.0·s^(1/3)`; boğaz `1.2 + 1.7·s`; halka = boğaz − 0.3 (s < 0.85'te askı halatları gevşek kavisli). s = (f − 6)/98, son 10 karede ease-out.
| f | s | küre ø (px, meydan) | tepe y | merkez y | boğaz y | halka y | Durum |
|---|---|---|---|---|---|---|---|
| 0–6 | 0 | yığın 6 × 1.2 m (624 × 125 px), sepetin **arkasında** Z 0.5–3 | 1366 | — | — | rimde | P02 krem kâğıt eşleşmesi |
| 9 | .03 | 213 | 1076 | 1182 | 1340 | 1372 | kubbe yığından ayrılır |
| 16 | .10 | 319 | 932 | 1091 | 1328 | 1359 | |
| 30 | .25 | 432 | 777 | 993 | 1301 | 1333 | |
| 40 | .35 | 484 | 707 | 949 | 1284 | 1315 | ağ gerilmesi 1 |
| **55** | **.50** | **545** | **623** | 896 | 1257 | 1288 | **hedef karesi** (alt yarı ağır kıvrımlar) |
| 66 | .62 | 585 | 568 | 861 | 1236 | 1267 | ağ gerilmesi 2 |
| 80 | .75 | 624 | 516 | 828 | 1213 | 1244 | `kontrol_kare` |
| 88 | .85 | 650 | 480 | 805 | 1195 | 1227 | ağ gerilmesi 3, halatlar düzleşir |
| 104 | 1 | **686** (%36 boy, %64 en) | **430** | 773 | 1169 | 1200 | oturma; balon bütünü 430–1478 = **%55** |
Kıvrım (etek) kubbe ekvatorundan boğaza iner: s 0.5'te 9 kıvrım, s 1'de 0 (tasarım §4.1). Terminatör bandı s ile aşağı iner.
**Hortum ayrılır** f98–106: üst ucu boğazdan çıkıp halkanın yanından sepet soluna kayar ve yere iner; yer teması f106 → oturma "pof" f104 ile aynı vuruşta (ayrı foley yönetmen kararı). Hortum bağlıyken balon kalkmaz.

**Ekran boyları özeti:**
| Nesne | Gerçek | meydan (P03) | yukleme (P06b, cs 1) | gok (P07 A) | sepet (P07 B, cs 1.3) |
|---|---|---|---|---|---|
| Küre | ø 6.6 | 686 px (dolu) | kadraj dışı (yalnız halka y 194) | Niépce 450 · Daguerre 291 | kadraj dışı |
| Sepet | 1.2 × 1.2 × 0.95 | x 459–625, rim 1368–1376, taban 1462–1480 (≈ 166 × 105) | x 175–876, rim 918–929, taban 1257–1476 | 82 × 65 / 53 × 42 | x 66–977, rim 739–805 |
| Sandık | 0.70 × 0.45 × 0.45 | — | 329 × 211; oturunca ön yüzün üst 53 px'i rim üstünde (y 876–929) | — | kapağı rimin arkasında görünür (y ≈ 762 dekor) |
| Kum torbası (gövde 0.35 + ağız 0.07, en 0.25) | | yok (P03) | 4 adet, ön yüzde, rimin 0.10 m altındaki halattan; x 425 / 564 / 696 / 813, y 979–1226, 126–143 px en, ≈ 240 px boy (perspektifle soldan sağa küçülür: doğal düzensizlik) | — | 4 adet, ekran x 390 / 571 / 743 / 895, boy 276–312 px (**%14–16** ≥ %12 ✓) |
| Posta çuvalı | 0.4 × 0.7 | sepette 2 ağız rim üstünde (≈ 20 px); yerde 2 çuval 98 × 138 px | sepette, görünmez | — | — |

### 2v2.5 Görünüm `meydan` (P03 f0–156) — kamera ve kompozisyon
Kamera: F 1500, göz **e 1.6**, Z −14.42 ⇒ sepet ekseni 104 px/m. **Ufuk y 1304** (%68). Ayakta yetişkinin başı ufukta (S1 1289, R1 1294 ✓ ufuk–ölçek). Ekranın alt kenarı zeminde kameradan 3.9 m.
| Öğe | Ekran (cs 1, cx 0, cy 0) | Not |
|---|---|---|
| Gök basamakları | tepe **−520**–420 · üst 420–760 · orta 760–1000 · alt 1000–1180 · ufuk 1180–1304; sol ışıma x < 486, y 1120–1304 | tasarım §14.2; tilt (cy 420) için tepe −520'ye uzar |
| Küre (dolu) | merkez (540, 773), y 430–1117 | yazı bandının 30 px altı |
| Halka / boğaz | y 1200 / 1169 | |
| Sepet | x 459–625; rim 1368–1376 (FR→FL); zemin teması 1462–1480 | temas güvenli alanda ✓ |
| Kazık + kazıkçı | kazık (869, 1383–1486); kazıkçı ayak (929, 1490), baş 1288, boy 202 | halat çözülür f108–116: kazıkçı ilmeği kazık başından kaldırır (temas f112, kazık başı y 1383) |
| Bağlama halatı | FR alt (625, 1474) → kazık başı (869, 1383) | gevşek sarkma; çözülünce sepete doğru kalkar |
| Kalabalık sol | ayak (148, 1427) · (188, 1435) · (293, 1420); boy 138 · 131 · 83 (çocuk) | baş balonu izler (eğim 0 → 18°, f60–156) |
| Kalabalık sağ | ayak (812, 1440) · (859, 1432) · (958, 1443); boy 146 · 147 · 137 | evin ışık duvarının önünde: koyu–açık en güçlü ayrışma |
| Ağaç | gövde x 63 (ø 34 px), taban y 1413, tepe y 527; taç sağa x 438'e kadar, kürenin **arkasında** | |
| Yan ev | doğu duvarı x 840–949 (ışıkta), saçak 977 (köşe) → 1064; ön cephe x 949 → kadraj dışı, taban 1413; ön pencere sütunu x 996–1064: üst kat 1038–1147, zemin 1236–1345; doğu duvarında 1 dar pencere x 879–893, y 1080–1174; kırma çatı doğu üçgeni + kuzey yüzü 977 → 866; baca x 985–1013, y 856–929 | ev kadrajın sağ kenarında kesilir (hedefteki gibi) |
| Paris bandı | y 1282–1344 (§2v2.11) | |
| Meydan güney kenarı | y 1344 (Z 60): 2 px koyu kırık çizgisi `#a8949a` | duvar yok |
| Gaz hortumu | sol kenar (x −346 → giriş x 0, y ≈ 1700) → kangal (241, 1603) → sepet sol yanı (459, 1460) → halatların arasından boğaza | kalınlık 22 px (kangal) → 13 px (sepette) |
| Yerde posta çuvalları | (310, 1534–1672) ve (408, 1520–1656) | alt bant (IG): bilgi taşımaz, alt üçte biri doldurur; gölgeleri (870, 1834)'e kadar |
| Tekerlek izleri | 3 iz, alt kenarda x ≈ 250 / 560 / 830 → ufukta x 470 / 540 / 620 (tek VP'ye değil, ±70 px dağınık) | |
- **Tilt (yönetmen) f116–156 cy 0 → 420:** sahne aşağı kayar. Balonun f156'da kadraj üstünden çıkması için sepet tabanı dekor y < −420 olmalı ⇒ 40 karede ≈ 18 m yükseliş. Gerçek kalkış hızının ≈ 5 katı: **zaman sıkıştırması** [T], ease-in ile okunur (kabul: P03 "hızlı" tempo). İstenmezse kesme f160 yerine balon küresi çıktığında, sepet üst kenara değerken taşıyıcıya devredilir (yönetmen).

### 2v2.6 Görünüm `yukleme` (P06b f168–287) — arka plan ve ışık **hale ile değişti (§2v2-H.4)**
Kamera: F 1500, **göz 1.0** (alçak), (0.1, 1.0, −3.40). Sepet ön köşesi 576 px/m. **Ufuk y 900**; ufuk her ayaktaki figürü kalçada keser (alçak kameranın ufuk–ölçek karşılığı).
| Öğe | Ekran (cs 1) | Not |
|---|---|---|
| Gök | tasarım basamakları ufuk 900'e ölçekli: tepe −100–291 · üst 291–526 · orta 526–692 · alt 692–817 · ufuk 817–900; ışıma x < 486, y 776–900 | |
| Sepet | silüet x 175–876; sol (ışık) yüzü x 175–315, ön (gölge) yüzü 315–876; rim 918–929; taban FL **1476** · FR 1382 · BL 1306 | taban güvenli alanda ✓ |
| Halka / halatlar | halka y 194, x 297–694; 5 halat rim köşelerinden halkaya | halka IG üst bandında, çerçeve öğesi |
| Kum torbaları | x 425 / 564 / 696 / 813; y 979–1226 → 976–1188 | P07 kurulumu |
| Sandık iniş f170–190 | üst y 355 → oturunca 876; en 329, boy 211 | oturunca ön yüzün 53 px'i + iki kulp rim üstünde; yükleyicilerin elleri kulplarda |
| Yükleyiciler | sepetin **arkasında**: baş (355, 647), (640, 673); bel altı sepetle örtülü | v1'deki Z 3.5 sepetin içine düşüyordu: düzeltildi |
| Dagron | sepetin sol-arkasında, sırtı kameraya: ayak (128, 1275), baş 637, en ≈ 188 px | biniş f212–248, ayak teması f226 **BL rim köşesi (175, 920)** ✓ |
| Daguerre | sepet (888, 937), küre merkezi (888, 687), ø 246 (x 765–1011); dibinde 3 siluet 64 px (ayak 937) | cs 1.0'da kurulur (f168–200) |
| Ağaç | gövde kadraj dışı solda; taç sol üstten girer, dallar y −200…400, x 0…400 | üst üçte bir |
| Paris bandı / meydan kenarı | 878–931 / 931 | |
| Bağlama halatı | FR alt köşe (876, 1382) → yerde gevşek kavis → kadraj sağ-altı (1080, 1700) | **"halat gerilir" f262 = bu halat**: yerden kalkar, düz çizgiye döner (askı halatları zaten gergin). json `sepet.halat` "kürenin ağına" ifadesi bununla değişmeli (yönetmen) |
| Gölgeler | sepet gölgesi FR'den sağ-alt köşeye (kadrajı aşar), Dagron'un gölgesi (128, 1275)'ten sağ-alta ≈ 420 px, yükleyicilerin gölgesi sepetin üstüne/arkasına | alt üçte biri doldurur |

### 2v2.7 Görünüm `gok` (P07 A f0–158): yükselen kamera, iki balon, darbe — ışık, yatay bulvar ve ray demeti **hale ile değişti (§2v2-H.6)**
Kamera: F 1500, havada, yatay eksen + lens kaydırma, **ufuk y 900** (v1'de 760; değişti: Daguerre'nin ışık yüzü ufuk basamağının (L\* 86) değil orta basamağın (L\* 74) önüne düşsün, ΔL\* ≥ 8, tasarım §14.2). Kamera yüksekliği H (Paris çatı düzleminin üstünde) f0 → 158: **60 → 140 m**, inout. Balonlar kamerayla birlikte yükselir ⇒ ekranda neredeyse sabit; hareketi **şehir** verir. Gerçek hızın ≈ 10 katı: zaman sıkıştırması [T] (P07 B ile aynı dil).
| Öğe | Dekor (cs 1) | Ekran f0 (cs 0.9) | Not |
|---|---|---|---|
| Niépce (sol) | Z 22, 68.2 px/m. Küre merkezi (300, 650 → 630 f158), ø 450, tepe 425 → 405 | (324, 681), tepe 478 | yazı bandı (f10–190) kürenin üstünde kalır ✓. Sepet (300, 1042–1107), 82 px |
| Daguerre (sağ) | Z 34, 44.1 px/m. Küre merkezi (790, 620 → 560 f106), ø 291, tepe 474 → 414 | (765, 654) | sepet (790, 873–915 → 813–855): ufuk buğusunun önünde koyu nokta |
| **Darbe** f108 | kürenin sol-alt çeyreği: **dekor (720, 675)** | f108 cs ≈ 0.957 ⇒ **ekran ≈ (712, 687)** | json (760, 720) yerine. Parlama ≤ %10 ekran (`lint.izin L_ustu_88_parlama`) |
| Duman çizgisi f84–108 | kaynak **dekor (1150, 935)**: sağ kenarın dışında, ufuk buğusunun içinden (şehrin dışı) → darbe noktası; 3 px koyu kontur, tırtıklı | sağ kenardan girer | **Paris çatılarının arasından yükselmez** (açık soru 3) |
| Çöküş f108–150 / sepet düşer f120–152 | küre çöker (tasarım §5), sepet düz düşer, alt kenardan çıkar (dekor y > 2030) | | kamera yükselişi (≈ 16 m) + serbest düşüş birlikte ≈ 1000 px: tutarlı |
| Dekor sınırı | cs 0.9 için x −60…1140, y −120…2030 | | |
**Paris aşağı kayar (ekrandaki y = 900 + H·1500/D; D yatay uzaklık):**
| H (m) | kare ≈ | D 120 | D 170 | D 210 | D 300 | D 500 | D 1000 | D 1500 | alt kenarda D |
|---|---|---|---|---|---|---|---|---|---|
| 60 | 0 | 1650 | 1429 | 1329 | 1200 | 1080 | 990 | 960 | 80 m |
| 80 | 45 | 1900 | 1606 | 1471 | 1300 | 1140 | 1020 | 980 | 118 m |
| 100 | 79 | — | 1782 | 1614 | 1400 | 1200 | 1050 | 1000 | 147 m |
| 120 | 113 | — | — | 1757 | 1500 | 1260 | 1080 | 1020 | 176 m |
| 140 | 158 | — | — | 1900 | 1600 | 1320 | 1110 | 1040 | 206 m |
- Okuma: ekranın aynı yerinde (ör. y 1200) duran blok f0'da 300 m, f158'de ≈ 640 m uzakta ⇒ **2.1× küçük**. Yatay ağaçlı bulvar (D 170–210, 106 px şerit, iki sıra ağaç noktası) f0'da y 1329–1429'da; f≈95'te alt kenardan çıkar: yükselişin ana ipucu. Diyagonal bulvar D 250'den sol-üste (VP kadraj solunda, x ≈ −590) uzanır.
- Bulvarlar **adsızdır** (Rochechouart/Magenta denmez): kalkış yeri doğrulanmadı (§2v2.2).

### 2v2.8 Görünüm `sepet` (P07 B f160–336) — ışık vektörü **hale ile değişti (§2v2-H.6)**
Kamera: F 1500, sepetin önünde havada (0.1, h 1.25 = rim + 0.30, Z −3.40), sepetle birlikte hareket eder. **Ufuk dekor y 668** (ekran cs 1.3: 580, cs 1.4: 551). Gök basamakları ufuk 668'e ölçekli: tepe 0–216 · üst 216–391 · orta 391–514 · alt 514–607 · ufuk 607–668; ışıma x < 486, y 576–668.
| Öğe | Ekran (cs 1.3) | Not |
|---|---|---|
| Rim | BL (66, 739) → FL (248, 805) → FR (977, 769) | **diyagonal** rim: ekranı böler; rim üstü ince parlak şerit (`#c9a98a`) |
| Sepet sol (ışık) yüzü / ön (gölge) yüzü | x 66–248 / 248–977, alt kenar 1500–1520 | |
| Torbalar | 1: x 390, y 885–1197 · 2: x 571 · 3: x 743 · 4: x 895, y 842–1118 | bırakılanlar **4 (f196) ve 3 (f214)**; 1 ve 2 kalır (süreklilik) |
| Dagron | sepetin içinde sağ-önde, **kameraya dönük kontrajur siluet** (güneş arkasında ⇒ yüzü gölgede, yüz çizilmez): baş ≈ (749, 555), gövde 650–950 × 520–780, sağ kol torba 4'ün ağzına (895, 842). Baş **sola döner** (düşen Daguerre'ye): "bakmadan" bu dönüşle okunur | sol kenar ışığı `#f0c4a8` 2–3 px; v1'deki "yalnız el" fiziksel değildi (gövde sepette olmalı) |
| İkinci mürettebat (isteğe bağlı) | sol arkada baş + omuz siluet, x 260–380, baş y ≈ 560, rimden kesik | [A: Niépce'de 5 kişi]; varsayılan 1 |
| Sandık kapağı | rimin arkasında, y ≈ 755 | P06 sürekliliği |
| Şehir | H 150: D 600 → y 1068, D 1000 → 873, D 1500 → 775; alt kenarda D ≈ 218 m. H 300 (f320): D 600 → 1555, D 1000 → 1165 | sepetin iki yanında ve altında |
| Düşen torba | torba yüzünün önünden düşer, 1 tur döner, f196 → f232 alt kenardan çıkar (≈ 920 px = 1.4 m dekor; 0.6 sn serbest düşüş 1.8 m ✓); kum izi 20 kare | |
| Sıçrama f232–252 | kamera sepeti 4 kare gecikmeyle izler: sepet ekranda −36 px yukarı, yaylı geri 0; askı halatları f236–256 gevşer-gerilir | |

### 2v2.9 Katman tablosu (arkadan öne; hex'ler tasarım §14.2, yeni olanlar **[yeni]**)
**`meydan` / `yukleme`** (z = meydan kamerasına derinlik; yukleme'de aynı katman sırası, ölçek kendi kamerasından)
| # | Katman | z (m) | px/m (meydan) | Hex | Kontur | Tarama | Buğu |
|---|---|---|---|---|---|---|---|
| 0 | Gök + sol ışıma | ∞ | — | `#6f86ad` `#8fa3c0` `#a9b7cc` `#cdc6d0` `#f0d0bc` / `#f2c9b2` | yok | yok (sınırlarda 3 litografi çizgisi + stipple) | — |
| 1 | Paris uzak buğu | > 6 km | — | `#dccfcf` | yok | yok | kendisi buğu |
| 2 | Paris orta bant | 3–6 km | — | `#b0a6c0` | yok | yok | — |
| 3 | Paris yakın siluet + baca tarağı + duman | 2–3 km | — | `#8d85a6` / `#7a7394`, ışık çatı `#d8b8a4` 1–2 px, duman `#c3bccd` | yok | yok | — |
| 4 | Meydan uzak zemin + kenar kırığı | 30–60 | 25–50 | `#c8ae98`, kırık `#a8949a` | yok | yok | α .12 → `#cdc6d0` |
| 5 | Yan ev | 22–30 | 50–68 | ışık duvar `#e8d0ba`, cephe `#a39cb6`, derin `#7a7394`, cam `#7f90ab` (+1 parıltı `#f0d4bc`), çatı kuzey `#6d6384`, **çatı doğu üçgeni `#b39a9e` [yeni, 66/10]**, mahya/sol kenar `#f0c4a8` | 3 px kendi tonunda | II yalnız saçak altı + pencere söve gölgesi + baca gölge yüzü (78°) | α .08 |
| 6 | Ağaç | 22 | 68 | `#5f5470`, sol kenar `#f0c4a8` α .8 | yok (tasarım: uzak) | yok | α .08 |
| 7 | Kalabalık | 17–21 | 71–88 | `#45405a` ±3 L\*, sol kenar `#f0c4a8` 2 px | yok (siluet) | yok | yok |
| 8 | Balon + sepet + halat + kazık + kazıkçı | 13–15 | 98–115 | balon/hasır/halat/hortum §14.2; kazık = sandık ışık/ön `#b4937a` / `#7a6460`; kazıkçı = kompars | balon 3–4 px, sepet 4 px | balon terminatör (≥ 2 px, aralık 7, 78°); sepet gölge yüzü **düz bant** (tarama değil, kamış dikeyi ile 12° kuralı) | yok |
| 9 | Yakın zemin + izler + çakıl + bütün gölgeler | 4–13 | 115–375 | `#c8ae98`, gölge `#8f8aa8`, iz içi `#a8949a`, çakıl `#d6c1ae` | — | yalnız gölge kenarı net | yok |
| 10 | Ön plan: hortum kangalı, 2 posta çuvalı | 6–8 | 187–230 | hortum `#4a4560`, çuval §14.2 torba tonları | **6 px** | çuval gölge yüzü II | yok |
| 11 | Kâğıt + gren | ekran | — | `ArsivKatmani` **litografi** (gündüz değerleri) | — | — | — |
`yukleme`'de 5 (ev) ve 7 (kalabalık) kadraj dışıdır; 8 sepet yakın sınıfta (576 px/m): kontur 6 px, hasır kamışı 0.05 m aralık (≈ 29 px), 2 sarma kuşağı; Daguerre katman 4–5 arasında (z 40, kontur 2.5 px, buğu α .12).
**`gok` / `sepet` (havadan şehir)**
| # | Katman | D (m) | Hex | Kontur | Not |
|---|---|---|---|---|---|
| 0 | Gök | ∞ | basamaklar, kendi ufkuna ölçekli | yok | |
| 1 | Uzak buğu | > 1500 | `#dccfcf` | yok | ufuk → +60 px |
| 2 | Orta bant | 600–1500 | `#b0a6c0` + seyrek açık çatı lekeleri `#d8b8a4` | yok | |
| 3 | Bloklar | 80–600 | çatı ışık (GD'ye bakan) `#e0c8b2` / mansard ışık `#a89fbe` / gölge `#7a7394`; cephe gölgesi `#9a92ae`; **sokaklar ve avlular gölgede** `#9a92ae` | 2.5 px (D < 300), yok (D > 300) | 12°'de bina gölgesi 4.7 × 18 m ≈ 85 m > sokak eni ⇒ sokak tabanı ışık almaz [fizik]; yalnız geniş bulvarın kuzey şeridi ışıkta `#d3bba6` |
| 4 | Bulvarlar | 170–210 (yatay), 250+ (diyagonal) | zemin `#d3bba6` / gölge `#9a92ae`, ağaç noktası `#6a6280` | yok | ağaç noktaları da sağa-öne kısa gölge |
| 5 | Duman (2 şerit) | 400–900 | `#c3bccd` | yok | çözülerek biter, bulut okutmaz |
| 6 | Balonlar / sepet / Dagron | 3–34 | §14.2 | 3–6 px | |
| 7 | Kâğıt + gren | ekran | litografi | | |
Buğu karışımı (bloklar): α = min(.80, D/1900) → `#dccfcf`; D > 600'de kontur ve tarama yok.

### 2v2.10 Işık ve gölge (tek vektör)
- `ISIK_YON.gunMontmartre` (ışığa doğru) = **(−0.692, 0.208, 0.692)** (tasarım §14.1; X sağ, h yukarı, Z ileri). Güneş yüksekliği 12°, kadraj dışında; disk/hale/ışın yok.
- **Gölge:** yüksekliği h olan nokta zemine **(X + 3.325·h, Z − 3.325·h)**'e düşer (boy 4.70·h; sağa ve kameraya). Motion bütün gölgeleri bu tek formülden üretir (`GolgeSeridi`); elle gölge yok (V3 dersi: kümes gölge veriyor, bacalar vermiyordu).
- **Gölge veren her şey (meydan):** sepet (uç (1069, 1529)), halatlar (sağ-alta çizgi gölgeleri), kazık (kadraj dışına), kazıkçı, 6 siluet (sol grup uçları (578–658, 1447–1489); sağ grup kadraj dışına), ağaç gövdesi + 3 ana dal (gövde gölgesi (63, 1413)'ten sağa, y ≈ 1430–1460'ta kadrajı geçer; ince dallar gölge vermez), ev (gölgesi kadraj dışında), baca (çatı üstüne kısa), ön çuvallar (→ (870, 1834)), hortum kangalı (ince). **Kürenin gölgesi** (+22, −22 m) kameranın arkasına düşer: kadrajda yok, kamera gölge dışında ✓.
- **Işık alan yüzler:** sola (doğuya) ve yukarı bakanlar: kürenin sol-üst %35'i (tasarım abartısı), sepetin sol yüzü + rim üstü, evin doğu duvarı + doğu çatı üçgeni, zemin, torbaların sol yanı, mahya ve sol kenarlar. **Gölgede:** kameraya (kuzeye) bakan her yüz: küre gövdesi, sepet ön yüzü, ev cephesi, siluetler, Dagron (P07 B kontrajur).
- **Kenar ışığı** `#f0c4a8` 2–3 px: siluetlerin, ağacın, halatların (1 px), kürenin sol yayının **sol/üst** kenarında. Konturun içine yapışık (V3: "kayık ikinci çizgi" hatası).
- **Pencereler:** iç ışık yok; ön pencerelerden yalnız biri `#f0d4bc` parıltı.
- Tarama açısı 78° (sahne başına tek).

### 2v2.11 Düzensizlik (baştan tanımlı; V3 "ızgara" dersi)
**Kalabalık (seed 161):** 3 + 3 + kazıkçı. Boylar 1.15–1.84 m (hiçbir ikisi ±3 cm içinde değil), aralıklar 0.6–1.2 m eşit değil, sol grup sıkı (çocuk yetişkine yaslı), sağ grup açık. Altı farklı siluet tipi: uzun palto · omuz şallı kadın · kısa ceketli çocuk · düz palto · pelerin · etekli kadın; kazıkçı öne eğik, kolu kazıkta. Baş eğimi 8–20° farklı. Yüz, şapka, üniforma, aksesuar yok (tasarım §3.0; şapka sorusu açık soru 5). Kompars ana kadronun (Dagron) iki ton gövdesini kullanmaz.
**Ufuk çatı bandı (meydan, seed 158):** y 1282–1344 (62 px; 360'ta 21 px). Fiziksel olarak Paris çatıları ufkun 15–75 px altında ve meydan kenarı (y 1344) arkasında kalır; bant **en uzak buğu katmanı ufkun 22 px üstüne taşacak kadar** stilize [T, hafif abartı, buğu bir hava katmanıdır, yapı değil].
| Katman | y | Kurgu |
|---|---|---|
| uzak buğu `#dccfcf` | 1282–1316 | kontursuz, üst kenarı 3–5 px dalgalı, ufuk basamağına karışır |
| orta `#b0a6c0` | 1300–1330 | 9–14 birim, en 30–110 px, yükseklik 6–22 px, %40 mansard eğimi |
| yakın `#8d85a6` / tarak `#7a7394` | 1310–1344 | 11–16 birim, en **18–90 px** (aynı en en çok 2 kez üst üste), üst kenar 1310–1330 arasında seed'li; birimlerin %55'i mansard (kırık sırt), %30'u eğik çatı, %15'i düz; birim başına 0–3 baca tarağı (≤ 8 px), birimlerin %35'inde baca yok; 1 yüksek blok (+12 px) x ≈ 700'de; ışık alan çatı kenarı `#d8b8a4` yalnız birimlerin %25'inde, 1–2 px |
| duman | — | 2 şerit: x ≈ 330 ve x ≈ 760 (balonun iki yanı), sağa eğik, 60–90 px boy, çözülür |
Kubbe, kule, sivri çatı, değirmen yok. Balonun halatları ve kalabalık bandı keser: bandın tamamı hiç görünmez, parçalar görünür (kendiliğinden düzensizlik).
**Havadan şehir (gok/sepet, seed 173):** ada (îlot) çokgenleri; ada eni 40–140 m (lognormal), sokak eni 3 sınıf (8 · 14 · 30 m), sokak açıları ana eksenden ±12° sapar, adaların %20'si üçgen/yamuk (diyagonal bulvar kesişimi); her adada 3–9 parsel, parsel kat yüksekliği 4–7 kat (komşu farkı ≥ 1 kat), mansard %60 / eğik çatı %40; avlular koyu gölge lekesi; parsel başına 0–4 baca, külah sayısı 1–6. Aynı ada biçimi ekranda 3 adadan önce tekrar etmez. Bulvar ağaçları 9–12 m aralıklı, %10 boşluk.

### 2v2.12 Doku (yüzey başına ≤ 3; seed sabit, kaynamaz) ve `ArsivKatmani`
| Yüzey | 1 taban | 2 tarama | 3 | Kod | Parametre |
|---|---|---|---|---|---|
| Gök | 5 düz basamak | — | litografi geçişi (sınır başına 3 ince çizgi, alt basamağın tonunda, 1.5 px, aralık 4) + stipple | `GokLitografi` (P01'den) | stipple yoğunluğu P01 V4'ün **%60'ı** (V3: "ölü piksel" uyarısı) |
| Toprak | tek ton + stipple tane (2–3 px, α .25) | gölge kenarı net | kâğıt | `MeydanZemin` [yeni] | seed 157, çakıl 40 (yalnız z < 10) |
| Sıva (ev) | düz ton + 1 kabarma lekesi α .10 + 2 ince çatlak | II saçak altı / söve | kâğıt | `SivaCephe` [yeni] | seed 162 |
| Çatı (ev) | düz; kuzey yüzde 4 ince sıra çizgisi (malzeme adı yok) | — | kâğıt | `CatiOrtusu` `detay: orta` | |
| Hasır | dikey kamış (0.05 m) + 2 sarma kuşağı; kamış kenarı `#c9a98a` ışık yüzünde | gölge yüzü düz bant | kâğıt | `Sepet` [yeni] | `cokme` 0–1, seed 160 |
| Balon | 3 basamak + vernik hilali | terminatör | kâğıt | `Balon` (N1) | ağ gözü ≥ 60 px |
| Torba/çuval | keten tonu + ağız ipi | gölge yanı II | kâğıt | `Torba` | |
| Ağaç | düz siluet, dal ucu ≥ 2 px | — | kâğıt | `CiplakAgac` [yeni] | seed 159, 3 kademe, sağa asimetri .6 |
| Havadan şehir | ada/parsel düz tonları | yok | kâğıt | `HavadanSehir` [yeni] | seed 173 |
- **`ArsivKatmani` kararı:** gündüz MONTMARTRE'de **`litografi` modu** (P01 V4 ile aynı katman ailesi, kanal tutarlılığı); `gunduzMineral` kullanılmaz (gök mavisini ve kenar ışığını grileştirme riski, tasarım §14.5). Ölçüt: gök üst/orta C\* ≥ hedefin %85'i (≥ 14.5 / 10), kenar ışığı C\* ≥ 18. Tutmazsa kâğıt multiply α .16 → .12.

### 2v2.13 Ölü alan ve güvenli alan kontrolü
| Görünüm / kare | Üst üçte bir (0–640) | Orta (640–1280) | Alt (1280–1920) | Güvenli alan |
|---|---|---|---|---|
| meydan f0–45 | gök basamakları + ağaç tacı (y ≥ 527, x ≤ 438) | kubbe (f9'dan), ağaç, ev çatısı | Paris bandı, kalabalık, sepet, yığın, izler, çuvallar, gölgeler | **Uyarı:** üst üçte birin sağ yarısı ≈ 0.7 sn yalnız gök ⇒ `lint: {izin: ["olu_alan_ust_f0_45"], not: "şişme s 0.5'te (f55) üst üçte bire girer; json kamera kuralı: şişmede kamera durur"}` |
| meydan f55–116 | kubbe + ağ + ağaç tacı + gök | etek kıvrımları, halatlar, ev, ağaç | aynı | sepet tabanı 1480, kazıkçı ayağı 1490, kalabalık ayakları 1420–1443 ≤ 1500 ✓; küre tepesi ≥ 430 > 400 ✓; ekran yazısı gökte |
| yukleme f168 | halka, halatlar, ağaç dalları, sandık (iner), Daguerre tepesi (564) | yükleyiciler, Dagron, rim, torbalar, Daguerre | sepet alt yarısı, gölgeler, bağlama halatı | taban 1476, Dagron ayak 1275, temas (175, 920) ✓ |
| yukleme f250 (cs 1.45, cy −210) | halatlar, Dagron (sepette), yükleyici kolları | rim 698–750, torbalar | sepet + taban **1498** ✓ | bağlama halatı gerilmesi (f262) x 900–1080, y 1300–1500 ✓ |
| gok | gök + iki küre tepesi (405–478) | küreler, sepetler, ufuk buğusu, şehir | şehir, bulvarlar | yazı bandı 240–400 boş gök ✓; darbe (712, 687) ✓ |
| sepet | gök + Dagron başı (555) + duman yok | rim, torbalar, Dagron kolu | sepet alt yarısı + şehir | torba ≥ %12 ✓; sepet alt kenarı 1500–1520 havada (temas değil) |

### 2v2.14 360 px okunurluk
| Öğe | 1080'de | 360'ta | Okunur mu |
|---|---|---|---|
| Küre (P03 dolu / s 0.5) | 686 / 545 | 229 / 182 | evet |
| Ağ gözü | ≥ 60 | ≥ 20 | evet (tel örgü okunmaz) |
| Sepet (P03) | 166 × 105 | 55 × 35 | "kutu" okunur (tasarım ≥ 55 en: sınırda ✓) |
| Kalabalık (en küçük çocuk) | 83 | 28 | ≥ 20 ✓ |
| Kazıkçı + kazık | 202 / 103 | 67 / 34 | evet |
| Paris bandı | 62 | 21 | yalnız siluet (bilerek) |
| Ev penceresi | 68 × 109 | 23 × 36 | evet |
| Dal ucu / halat | 2 / 3 px | 0.7 / 1 | çizgi görünür (≥ 0.5) |
| Sepet (P06) / sandık / torba | 701 / 329 × 211 / 143 × 240 | 234 / 110 × 70 / 48 × 80 | evet |
| Daguerre (P06) + siluetleri | 246 / 64 | 82 / 21 | evet |
| Niépce / Daguerre küresi (P07 A) | 450 / 291 | 150 / 97 | evet; Daguerre sepeti 53 → 18 px (koyu nokta + halat; düşüşü küre çöküşüyle okunur) |
| Yatay bulvar (f0) | 106 | 35 | evet |
| Torba (P07 B) | 276–312 | 92–104 | evet (%14–16) |

### 2v2.15 Renk ve sıcaklık ölçümü (V3 dersi: sıcaklık ışık yüzlerinin azlığından düşer)
Hedef ölçüldü (270 × 480, çerçeve kırpılmış): **L\* ort 66, p95 86, C\* ort 17.5, sıcak piksel (b\* > 3) %33, alt üçte bir %45.**
- Kabul (P03 f80): L\* ort 60–70 · **p95 ≥ 82** · C\* ort 15–20 · **sıcak piksel ≥ %25** · alt üçte bir sıcak ≥ %35 · kılıf dışı C\* > 32: 0 px · L\* > 88: 0 px (P07 f108–118 parlama hariç).
- Ölçüm noktaları (P03 f80, ekran): gök üst (1000, 600) `#8fa3c0` · gök orta (1040, 800) `#a9b7cc` · ufuk (720, 1270) `#f0d0bc` · sol ışıma (380, 1260) `#f2c9b2` · küre ışık (400, 650) `#e6c9b4` · küre gölge (680, 900) `#8f8aa8` · ev ışık duvarı (900, 1250) `#e8d0ba` · ev cephesi (1050, 1190) `#a39cb6` · toprak ışık (760, 1640) `#c8ae98` · hasır ışık (470, 1420) `#b89677`.
- P06 f206: hasır ışık yüzü (240, 1150) `#b89677`, ön yüz (600, 1300) `#6e5a56`. P07 f112: gök orta (300, 600) `#a9b7cc`, şehir blok ışık (≈ 300, 1250) `#e0c8b2` ±3.

### 2v2.16 Dönem/şehir doğruluğu
| İddia | Etiket |
|---|---|
| Place Saint-Pierre kalkış yeri (P03'teki genel balon) | [A] |
| Pamuk + vernik, kömür gazı, hortumla şişirme | [A] (hortum biçimi [G]) |
| Küre + ağ + hasır sepet + halka | [G] doğrulanmalı (tasarım §4.1) |
| Niépce + Daguerre aynı sabah, Daguerre vuruldu, Niépce balast attı | [A: DASH, GUT] |
| Niépce/Daguerre kalkış yeri | **arastirma'da yok**; [G] Gare d'Orléans olabilir → açık soru 2 |
| Daguerre'nin vurulduğu yer | arastirma'da yok; Prusya hatları şehrin dışında ⇒ duman şehrin içinden çıkmaz [G, mantık] |
| Sabah 09:00, güneş 135°/12° | [A] saat; güneş hesabı [T] |
| Montmartre varoş evi, sıva, kırma çatı; ağaç; toprak zemin | [G] nötr |
| Sacré-Cœur, Eyfel, gaz lambası, bayrak, kırmızı tuğla, sarı metal | yok (kesin) |

### 2v2.17 Motion için çizim notları
- **Şablon iskeleti:** `MONTMARTRE` tek `dunya` nesnesi (§2v2.3) + görünüm başına kamera `{F, e, Xk, Zk, U}` + `kamera_H(t)` (gok/sepet). Bütün nesneler `dunyaEkran()` ile (PARIS-CATI V4'teki fonksiyon); elle ekran koordinatı yok. `sinirlar.json` MONTMARTRE: meydan cs 0.95–1.1, cy −50…450; yukleme cs 1.0–1.6, cx ±80, cy −250…50; gok cs 0.85–1.1; sepet cs 1.2–1.5.
- **Türetme:** `GokLitografi`, `ArsivKatmani` (litografi), `dolly.ts` değil (bu şablonda dolly yok), `CatiDenizi` uzak modu (ufuk bandı; PARIS-CATI V4 düzensizlik aralıkları), `GolgeSeridi` (gün vektörü), `Kukla`/kompars siluet seti (F1), `KolEl` sepya manşet (F2).
- **Yeni ortak modüller:** `Balon {s, durum: yigin|sisme|dolu|yukselis|coker, kure_m 6.6, ag}`, `Sepet {yaw, cokme, torbalar[], icerik}`, `Torba {dusme, donus}`, `MeydanZemin`, `CiplakAgac {seed, asimetri}`, `SivaCephe {kat, aks, kirma_cati}`, `HavadanSehir {H, F, U, seed}`, `UfukBandi {seed}` (meydan Paris bandı; `CatiDenizi` uzak modunun alt kümesi olabilir).
- **Şişme:** küre yarıçapı ve tepe formülü §2v2.4; kubbe yığından **ayrılarak** büyür (yığın kubbeye dönüşür, fade yok); etek kıvrımları 9 → 0, terminatör bandı s ile iner; ağ meridyenleri gevşekken kavisli, f40/66/88'de kademeli düzleşir.
- **Kontrol kareleri (kalibrasyon):** P03 f55 (hedefle yan yana) ve f80; P06 f206; P07 f112 ve f200. Şerit: P03 f100–156 (hortum ayrılması, halat, yükseliş, tilt), P07 f84–152 (duman, çöküş, düşüş), P07 f186–256 (torbalar, sıçrama).

### 2v2.18 Yönetmen için kamera tablosu (json sahibi yönetmen; MONTMARTRE) — P06b/P07 satırları için **§2v2-H.10 geçerli**
| Plan | Görünüm | kare | cs | cx | cy | Ek parametre | Ekranda doğrulama |
|---|---|---|---|---|---|---|---|
| **P03** | meydan | 0 / 116 / 156 | 1.0 / 1.0 / 1.0 | 0 | 0 / 0 / 420 | `ufuk_y 1304`; `balon.sisme` s(f) §2v2.4; `kazikci` 1 (F1) | f80 küre ø 624, tepe 516; sepet tabanı 1480; f156 sepet kadraj üstünde |
| **P06b** | yukleme | 168 / 214 / 250 / 287 | 1.0 / 1.2 / 1.45 / 1.45 | 0 / 0 / 0 / 0 | 0 / **−100** / **−210** / −210 | `ufuk_y 900`; Dagron ayak (128, 1275), biniş teması **(175, 920)**; Daguerre (888, 687) ø 246; `halat_gerilir` = bağlama halatı | f214 taban 1479, f250 taban 1498 (v1 cy −80 tabanı 1605'e, IG bandına itiyordu) |
| **P07 A** | gok | 0 / 100 / 158 | 0.9 / 0.95 / 1.0 | 0 | 0 | `ufuk_y 900`; `gok_kamera_H` [60, 140]; Niépce (300, 650), Daguerre (790, 620 → 560 f106); **darbe dekor (720, 675) ≈ ekran (712, 687)**; `duman_cizgisi.kaynak` dekor (1150, 935) ufuk buğusu | yazı bandı küre tepelerinin üstünde (≥ 405) |
| **P07 B** | sepet | 160 / 200 / 300 | 1.3 / 1.3 / 1.4 | 0 | 0 | `ufuk_y` dekor 668; `sepet_kamera_H` 150 (f160–250) → 300 (f250–320); torba 4 f196, torba 3 f214; Dagron kontrajur, baş sola | torba %14–16; rim diyagonal (66, 739)–(977, 769) |
json düzeltme notları (yönetmene): P03 `alt_ucte_bir` "kaldırım taşı" → toprak; P03 `kalabalik` + kazıkçı; P06 Dagron "x 21–279, ayak 1417" → sol-arka (128, 1275), biniş BL köşe; P06 yükleyici "Z 3.5" → sepetin arkası; P06 `sepet.halat` → bağlama halatı; P06 ikinci balon "(931, 688) ø 262" → (888, 687) ø 246; P07 `darbe` (760, 720) → (712, 687) ekran; P07 `duman_cizgisi.kaynak` "yer (kadraj altı)" → ufuk buğusu, sağ (açık soru 3); P07 `hava_perspektifi` hex'leri `#a9adb0…` → §2v2.9 (`#dccfcf/#b0a6c0`); P07 B `el` → Dagron kontrajur siluet + kol.

### 2v2.19 Açık sorular
1. **Tasarımcıya — küre ölçeği:** hedef (onaylı) küreyi ≈ 6–7 m okutuyor; bu şartname **küre 6.6 m, sepet:küre 1:5.5** kullanıyor (tasarım N1: ≈ 15 m [G], 1:8). Kabul edilmezse P03'te küre ekranda aynı kalır, sepet 166 → 120 px'e küçülür (360'ta 40 px). Ayrıca yeni ton `#b39a9e` (evin ışık alan çatı üçgeni) §14.2'ye.
2. **Araştırmacıya — Niépce/Daguerre kalkış yeri:** arastirma.md'de yok. Genel bilgim Gare d'Orléans yönünde [G, doğrulanmalı]. Doğrulanırsa P06b/P07'nin "Montmartre meydanı" değil "istasyon avlusu" olması gerekir; bu şartnamede P06b/P07'de Montmartre'a özgü hiçbir şey çizilmedi, şehir adsız. Bu yüzden zarar sınırlı. Yalnız P06b'deki ağaç ve meydan zemini değişir.
3. **Araştırmacı + yönetmen — Daguerre'nin vurulduğu yer:** Prusya topu şehrin dışındaydı [G]. Varsayılan: duman çizgisi ufuk buğusundan (şehrin dışından) gelir, Paris çatılarının arasından değil. Json `duman_cizgisi.kaynak` buna göre değişir.
4. **Yönetmene — P03 yükseliş hızı:** 40 karede ≈ 18 m (zaman sıkıştırması ×5). Kabul ya da taşıyıcı devri erken (§2v2.5).
5. **Tasarımcıya — kompars başlığı:** 1870 kalabalığında başı açık erkek az görülür [G]. Tasarım §3.0 "aksesuar yok" diyor; 2 siluete yumuşak kasket/şal silueti eklenmesi dönem okumasını güçlendirir (yüz yok, üniforma okutmaz). Varsayılan: §3.0'a uyulur (şapkasız), kadınlarda yalnız şal.
6. **Kullanıcıya (orkestra toplar):** P03 f0–45 üst üçte birin sağ yarısı yalnız gök (0.7 sn). Varsayılan: `lint.izin`.

---

## 2v2-H. GARE D'ORLÉANS HALESİ — P06b `yukleme` + P07 `gok`/`sepet`, `arka: "hale"` (tur-9, GEÇERLİ)
> **Tur-11 notu:** P06b hale çizimi (makas, kolon, cam, tarama, Niépce zarfı, Daguerre X) için **§2v2-H2**, P07 A havadan şehir için **§2v2-G2** geçerlidir. Bu bölümle çelişirlerse onlar geçerli. Burada değişmeyen her şey (dünya modeli, ışık `haleSabah`, P07 B) aynen kalır.

Girdi: `notlar/tur-9.md` (karar 1), arastirma Ek E3.1/E3.3, tasarım §14 (palet ve ışık sözleşmesi; hex sahibi tasarım), §2v2 (dünya modeli, balon/sepet ölçüleri, kameralar). **Yeni şablon değil:** MONTMARTRE şablonuna `arka: "hale"` parametresi. P03 `meydan` Montmartre'da kalır (§2v2.5, E3.2). P06b/P07'de §2v2'nin sepet, balon, sandık, torba, figür ve kamera değerleri **aynen geçerli**. Bu bölüm yalnız arka planı, ışık vektörünü ve onların sonuçlarını değiştirir. Hesap §2v2 ile aynı pinhole (F 1500); sayılar betikle üretildi, motion ilk still'de ±15 px doğrular. Kod, görsel ve git yok.

### 2v2-H.0 Tek cümlelik karar ve ödünleşim
- **Kamera halenin içinde, açık ağza (avluya) bakar. Sepet ağızdan ≈ 80 m içeride, halenin dış ucundaki son bölmelerde. Sabah güneşi ağızdan, kameranın 25° solundan ve önünden girer.** Sonuç: üst üçte birde ağza doğru küçülen 5 Polonceau makası ve cam şerit; ortada parlak ağız; sağda ışık alan duvar ve kolon ritmi; altta kameraya doğru uzanan gölgeler. Sepet ve figürler §2v2'deki gibi kontrajur kalır, kenar ışığı alır.
- **Zorunlu ödünleşim:** alçak kamera (göz 1.0, ufuk y 900, F 1500) kadrajın üst kenarında yalnız 31° yukarı görür. 23 m'lik saçak ancak **≥ 37 m** uzakta kadraja girer. Makaslar görünsün diye ağız uzakta olmalıdır. Güneş ışığı sepete ulaşsın diye de güneş hale eksenine yakın olmalıdır (≤ 25°). 80 m ile 5 makas ve sağ duvarda 5 kolon görünür. Ağız 60 m'ye gelirse 3 makas kalır, kolon hiç görünmez. Ağız ≤ 30 m olursa kadrajın üstünü avlu ve gök doldurur, hale görünmez. **Kalkış ağızdan ve avludan, ekran dışında olur** (P06b→P07 kesmesi). Balon halatlarla ağza yürütülür [G]. E3.3'e göre kalkış noktası doğrulanamadı; nötr kalır.

### 2v2-H.1 Duygusal amaç ve görsel dil
| Görünüm | Amaç (tek cümle) | Baskın şekil · ritim · sıcaklık · kontrast |
|---|---|---|
| `yukleme` + hale | Ağır sandık ve ağır adam karanlık demir kafesin altında. Önlerindeki tek çıkış ışıkta. | Üstte tekrar eden üçgen makaslar ağza doğru küçülür (yatay-diyagonal ritim, 10 m aralık). Merkezde parlak beşgen ağız, sağda dikey kolon dizisi. Soğuk ve koyu demir üst, sıcak ağız ve sıcak sağ duvar. **En yüksek kontrast makas ile cam/ağız arasında.** |
| `gok` + hale | Şehir ve istasyon altta kayıp gider. | §2v2.1 aynen. Ek olarak altta ufka yakınsayan ray demeti (yükselişin ana ipucu) |
| `sepet` + hale | §2v2.1 aynen | — |

### 2v2-H.2 Mimari kart: Gare d'Orléans grande halle (Renaud, 1862–1867/69), 12 Kasım 1870, 09:00
| Madde | Değer |
|---|---|
| Kaynak durumu | Hale 1870'te ayakta. Demir çatı, Polonceau sistemi. Uzunluk ≈ 280 m, açıklık ≈ 51–52 m, yükseklik bir kaynakta ≈ 35 m [A E3.3, yüksek güven]. Balonlar çatı altında asılı halde aydınlatma gazıyla şişirildi, hale rüzgârdan korudu [A E3.3, orta]. Kalkış noktası doğrulanamadı [A]. Fichot gravürü (1871) **gözle kontrol edilmedi** [A] |
| Dönem ve üslup | Haussmann dönemi demir-cam istasyon halesi. **Yarı ahşap, ahşap kiriş ve taş tonoz yok** |
| Yönelim | Hale ekseni ≈ KKB–GGD, açık ağız GGD'ye (≈ 161°) [G, **doğrulanmalı**]. 09:00'da güneş 136°/12° (tasarım §14.1) ⇒ ağızdan bakan kameranın **25° solunda, 12° yukarıda** ⇒ ekranda x −159, y 548 (cs 1.0): **kadraj dışında**. Disk, hale ve ışın yok (tasarım §14.4) |
| Yapı tipi ve ölçü | Tek açıklıklı hale. Açıklık **51.2 m** (duvar iç yüzleri X −39.0 / +12.2; hale ekseni X −13.4; sepet eksenin 13.4 m sağında). Saçak (makas ayağı) **h 23** [T]. Mahya **h 35** [A, tek kaynak]. Eğim **25°** [T, 51 m açıklık ve 35 m mahyadan]. Makas aralığı **10 m** [T]. Görünen makaslar Z 40 · 50 · 60 · 70 · 80 (= ağız makası) |
| **Makas (Polonceau), biçim açıkça** | **Düz iki eğik kol** (arbalétrier) saçaktan mahyaya. **Kemer, eğri ve yay yok.** Her kolun ortasından **kola dik, aşağı inen tek dikme** (bielle) var (boy 5.1 m). Dikme ayağından iki **çekme çubuğu** (tirant) çıkar: biri aynı taraftaki saçağa, biri mahyaya. İki dikme ayağı arasında **yatay orta çekme** var; saçaktan 1.4 m yüksekte (h 24.4). Siluet: büyük üçgen, içinde ters "W". Gerçek 51 m'lik makas büyük olasılıkla birleşik Polonceau'dur (kol başına 2–3 dikme) [G]. Çizimde **tek dikmeli sade biçim** [T, 360'ta okunur]. Düğüm noktaları (dünya, makas düzleminde): sol saçak (−39, 23) · sol dikme ayağı (−24.0, 24.4) · mahya (−13.4, 35) · sağ kol ortası (−0.6, 29) · sağ dikme ayağı (−2.8, 24.4) · sağ saçak (12.2, 23) |
| Mesnet (kolon) | Her makas ayağının altında **dökme demir kolon**, duvara bitişik, ø 0.6 m, h 0–23. Sade başlık: bir kare plaka, bir konsol. Süs, yiv, kaide profili yok [G, **doğrulanmalı**: makas duvara mı oturuyor, kolona mı]. Yalnız sağ duvarda görünür |
| Çatı örtüsü ve cam | Her eğimde **orta bantta cam şerit**: kolun %30–%70 arası [T]. Gerisi opak örtü, altından düz koyu yüz görünür, malzeme adı yok. Aşık (boyuna) çizgisi yalnız cam şeridin iki kenarı. **Cam çıtası ızgarası yok** (§0.5 kafes yasağı). Mahyada fener (lanterneau) [G] **çizilmez** |
| Yan duvar (sağ) | Yığma duvar, düz, açıklıksız (görünen bölümde kapı ya da pencere iddiası yok). **Kemer yok** (§0.4). Taş derzi yok, düz ton |
| **Ağız (açık uç), biçim açıkça** | Kesit beşgen: iki düşey yan (duvar uçları) + **yatay saçak/çekme hizası (h 23) = düz başlık** + üstünde **üçgen alın** (ağız makası). Alın üçgeni **camlı perde**, 4 düşey kayıt [G, **doğrulanmalı**: açık mı camlı mı]. Kemerli ağız, saat, heykel ve yazı yok. Saçak altı (h 23) ağzın tam genişliğince açık |
| Zemin | Düz döşeme, tek ton. Malzeme iddiası yok [G]. Raylar bu kamerada sepet ve Dagron'un arkasında kalır; çizilmez (ray yalnız `gok`'ta, §2v2-H.6) |
| Ağzın dışı | Avlu ve ray alanı ufkun altında, sepet kenarının arkasında. Görünen yalnız gök basamakları + adsız alçak bina buğusu. **Anıt, kubbe ve kule yok** (§0.7) |
| Kameradan görünen (göz 1.0) | **Görünür:** makasların alt yüzü ve tam siluetleri (kamera düzlemlerine dik bakar, kısalma yok), çatının alttan görünüşü + cam şerit, sağ duvar iç yüzü (z 37–83), kolonlar, ağız ve alın camı. **Görünmez:** çatı üst yüzü (kamera çatının 22–34 m altında), mahya feneri, sol duvar (ağız sol kenarı x −163, kadraj dışı), Niépce küresi ve onun asma halatı (kadrajın üstünde). Z < 37'deki makaslar kadrajın üstünde kalır |

### 2v2-H.3 Işık: tek vektör `ISIK_YON.haleSabah`
- Işığa doğru: **(−0.413, 0.208, 0.887)** (X sağ, h yukarı, Z ileri = ağza doğru). Aynı güneş (136°/12°), kamera yönü 161° ⇒ güneş 25° solda. `gunMontmartre` (45° sol) yalnız P03'te kalır.
- **Zemin gölgesi:** h yüksekliğindeki nokta **(X + 1.988·h, Z − 4.264·h)** noktasına düşer (boy 4.70·h; kameraya doğru, hafif sağa). `GolgeSeridi` bu formülü kullanır; elle gölge çizilmez.
- **Güneşin girdiği tek yer ağızdır** (h ≤ 23). Çatı camından giren 12°'lik ışın 108 m'den önce zemine inemez. Bu yüzden cam yalnız **aydınlık yüzey** olarak görünür; içeriye leke düşürmez. Bir nokta ışıktaysa: ağza giriş X'i `X − 0.466·(80 − Z) ≥ −39` ve giriş yüksekliği `h + 0.2346·(80 − Z) ≤ 23` olur. Kontrol: sepet köşeleri (giriş X −38.0, h 18.7) ✓, Dagron ✓, yükleyiciler ✓, Daguerre küresi (giriş X −10.8, tepe 20.2) ✓, Niépce küre merkezi (25.5 > 23) gölgede (kadraj dışı, önemsiz).
- **Işık alan yüzler:** yukarı bakanlar (döşeme, rim üstü, sandık kapağı) ve sola bakanlar. **Sağ duvarın iç yüzü** ışıkta, ışık sınırı ağızdan içeri doğru alçalır: ekranda **(1031, 449) → (958, 464) → (880, 480) → (826, 490) → (758, 504)**. Altı ışık, üstü gölge. Sınır net çizgi.
- **Kameraya bakan her yüz gölgede:** sepet ön yüzü, figürlerin sırtı, makasların ön yüzü. Bu, §2v2 kontrajur dilinin aynısıdır.
- **Sepet sol yüzü:** normalle ışık arası iç çarpım ≈ 0 (sıyırma ışığı). §2v2'deki ışık tonu `#b89677` yerine **ara ton `#937866` [yeni, 52/16, h 61°, tasarımcı onayı]**. Sol düşey kenara ve rim üstüne `#f0c4a8`/`#c9a98a` kenar ışığı gelir (ışık sepetin üstünden ve sol köşesinden okunur).
- **Kenar ışığı** `#f0c4a8`: figürlerin, Daguerre küresinin ve halatların sol/üst kenarında 2–3 px (§2v2.10 aynen). Makaslarda yalnız Z 70–80 dikmelerinin sol kenarında 1 px.
- **Gölge veren her şey (yukleme):** sepet, sandık, torbalar, Dagron, yükleyiciler, halatlar, posta çuvalı. Bütün gölgeler kameraya doğru, alt kenardan çıkar. Daguerre küresinin gölgesi **sağ duvara** düşer, merkezi (1076, 762) olur, kadraj kenarında yarım elips görünür. Kolonların duvardaki gölgesi kameraya doğru 1.07 m'lik şerittir. Makas gölgeleri kameranın arkasına düşer, görünmez.
- **Işık huzmesi: varsayılan YOK** (`huzme: 0`). Gerekçe: tasarım §14.4'teki ışın yasağı. Ayrıca sabah ışığı ağız, sağ duvar ve uzun gölgelerle zaten okunur. Eleştirmen "camdan ışık okunmuyor" derse `huzme: 2` açılır: alın camından, güneş noktasından (−159, 548) **ışınsal** iki düz bant. B1 (420, 400) → (1080, 231), B2 (600, 470) → (1080, 421). En 30 → 60 px, `#f2c9b2` α .08, kenarlar net, toz zerresi yok (kaynama riski). Tasarımcı onayı gerekir.

### 2v2-H.4 Görünüm `yukleme` + hale (P06b f168–287): kompozisyon (dekor = cs 1.0 ekranı)
Kamera §2v2.6 aynen: (0.1, 1.0, −3.40), F 1500, **ufuk y 900**.
| Öğe | Dünya | Ekran (cs 1) | Not |
|---|---|---|---|
| Makas Z 40 (z 43.4) | §2v2-H.2 düğümleri | sağ saçak (958, 140), sağ dikme ayağı (441, 92), kol ortası (516, −68); mahya ve sol yarı kadraj dışı | IG üst bandında yalnız 2 çizgi (çekme + dikme ucu): sade |
| Makas Z 50 | | sağ saçak (880, 282), dikme ayağı (460, 243), kol ortası (520, 113), mahya (161, −55), sol dikme ayağı (−138, 243) | |
| Makas Z 60 | | sağ saçak (826, 379), dikme ayağı (472, 347), kol ortası (523, 238), **mahya (221, 96)**, sol dikme ayağı (−31, 347) | |
| Makas Z 70 | | sağ saçak (787, 450), dikme ayağı (482, 422), kol ortası (526, 328), mahya (264, 205), sol dikme ayağı (47, 422), sol kol ortası (3, 328) | |
| **Ağız makası Z 80** (z 83.4) | | sol saçak (−163, 504), **mahya (297, 288)**, sağ saçak (758, 504), dikme ayakları (106, 479) / (489, 479) | alın camı üçgeni bu üç noktada; 4 düşey kayıt x ≈ 70 / 200 / 420 / 600 |
| Ağız açıklığı | Z 80, h 0–23 | x −163 → **758**, y **504 → 918** (taban sepet kenarının arkasında) | parlak gök + uzak buğu; sağ söve x 758 düşey |
| Cam şerit (sağ eğim) | kolun %30–70'i | Z40 (339, −151)–(693, 15) · Z60 (402, 181)–(645, 294) · Z80 (435, 353)–(619, 440) | üstten ağza doğru daralan açık şerit: göz sepete iner |
| Cam şerit (sol eğim) | | Z60 (39, 181)–(−203, 294) · Z80 (159, 353)–(−25, 440) | sol üst köşede dar üçgen |
| Opak çatı altı | | şeritlerin dışında kalan, saçak çizgilerinin üstündeki alan | düz koyu |
| Sağ duvar | X 12.2 | saçak çizgisi (1080, 9) → (758, 504); taban (1083, 945) → (758, 918) | ışık sınırı §2v2-H.3 |
| Kolonlar | X 12.2, Z 40…80 | x **958 · 880 · 826 · 787 · 758**; taban y 935 → 918; en (ø 0.6) 21 → 11 px | sağda dikey ritim, aralık ağza doğru daralır |
| Daguerre | (9.4, 36.7) §2v2 | küre (888, 687) ø 246; sepet (888, 937); 3 siluet 64 px | **ışıklı sağ duvarın önünde**: gölge gövdesi (L\* 59) duvara (L\* 77) karşı ΔL\* 18 ✓ |
| Daguerre asma halatı | küre tepesi (9.4, 10, 36.7) → Z 40 makasının sağ çekmesi (9.4, 23.3, 40) | (888, 563) → (861, 131), 2 px | "çatı altında asılı" [A E3.3]. P06b boyunca gergin; Daguerre 09:15'te kalkar (P07'de serbest) |
| Sandık yığını (2) | (11.0–11.7, Z 35), h 0–0.9 | x 950–985, y 904–939 | Daguerre sepetinin sağında, duvar dibinde ("sandıklar") |
| Niépce sepeti, sandık, torbalar, yükleyiciler, Dagron, bağlama halatı | §2v2.3/§2v2.6 aynen | §2v2.6 aynen | ışık sonuçları §2v2-H.3 |
| **Ön plan posta çuvalı** [yeni öğe] | X −0.65…−0.25, Z −2.0, h 0–0.6 (ayakta) | x 0–165 (sol kenarda kesik), y 1328 → alt kenar | sol-alt üçte biri doldurur; Dagron'un ayağı (128, 1275) çuvalın üstünde açık kalır ✓. Keten tonları §14.2, kontur 6 px. Işıkta (giriş X −0.79 > −39): üst kenar ışık, ön yüz gölge |
| Gölgeler | formül §2v2-H.3 | sepet gölgesi taban FL'den (315, 1476) sağ-alta, **x ≈ 683–1080'de** alt kenardan çıkar; Dagron gölgesi (128, 1275) → (622, 1920) | alt üçte birde çapraz serin bant + sol-altta sıcak ışıklı döşeme |
| Güneş | (−0.413, 0.208, 0.887) | (−159, 548) | kadraj dışı; cs ≥ 1.0 ve cx ≥ −60'ta dışarıda kalır |
**Kamera anahtarlarında görünen** (§2v2.18 aynı cs/cy):
- **f168 (cs 1.0, cy 0):** tam kadraj. Üst üçte birde makaslar Z 40–70, cam şerit ve alın; ortada parlak ağız, yükleyiciler, sandık inişi, Daguerre ve kolonlar; altta sepet, gölgeler ve çuval.
- **f214 (cs 1.2, cy −100):** kadraj dekor y ≥ 243, x 90–990. Üstte makaslar Z 50–80 ve alın.
- **f250–287 (cs 1.45, cy −210):** kadraj dekor y ≥ 443, x 168–912. Üstte ağız makasının alt elemanları ve alın tabanı. Figürlerin arkasında parlak ağız (siluetler en güçlü okumayı burada verir). Kolonlar ekranda x 856 / 898 / 955 / 1033. Sepet tabanı 1498 ✓.

### 2v2-H.5 Ölü alan, güvenli alan, düzensizlik
| Kare | Üst üçte bir | Orta | Alt | Güvenli alan |
|---|---|---|---|---|
| f168 | makaslar, cam şerit, halka (194), halatlar, alın (288–504) | ağız (gök + buğu), yükleyiciler, sandık, Daguerre + asma halatı, kolonlar | sepet, torbalar, gölgeler, çuval, ışıklı döşeme | üst %11'de (y < 211) yalnız Z40'ın 2 çizgisi + cam şerit kenarı + halka; alt %22'de (y > 1498) yalnız döşeme, gölge, çuval, halat: kalabalık detay yok ✓. Temas (175, 920) ✓, taban 1476 ✓ |
| f250 | alın, ağız, Dagron başı, halatlar | rim 698–750, torbalar, ağız | sepet + gölgeler | taban 1498 ✓ |
- **Düzensizlik (V3 ızgara dersi):** makaslar özdeş kalır (demir prefabrik: tekrar dönemin işaretidir), ritmi perspektif bozar. Düzensizlik ağır işlerde: Daguerre sepetindeki 3 siluet farklı boy ve eğimde (§2v2.11 tipleri). Sandık yığını iki farklı boyutta ve 6° kaykık. Alın camında 4 kaydın aralıkları eşit değil (x 70 / 200 / 420 / 600). Cam şeritte 3–4 panel ±2 L\* farkla (seed 181). Kolon başlıkları özdeş.
- **Yasak benzerlik:** hale = market halesi (Les Halles) gibi okunabilir. İstasyon işareti P06b'de görünmez (raylar örtülü). İstasyonu `gok`'taki ray demeti söyler (§2v2-H.6). Anlatım yer adı vermiyor, bu yüzden "hangi hale" sorusu doğmaz.

### 2v2-H.6 P07 + hale: `gok` (A) ve `sepet` (B)
- **Kamera yönü** hale ile aynı (161°), ışık `haleSabah` (güneş 25° solda, kadraj dışında: dekor x −159; cs 0.9'da ekran x −89 ✓). §2v2.7 kamera, H(t), balon konumları, darbe ve çöküş **aynen**.
- **Hale görünmez:** hale kameranın altında ve arkasında kalır (balonlar ağzın hemen dışından kalktı, kamera onların 22 m gerisinde). Kalkış yerini **ray demeti** söyler: ağızdan GGD'ye uzanan raylar balonların altından çıkar ve ufka yakınsar.
- **Ray demeti [yeni katman, `gok` + hale]:** zemin noktası (Xg, D) → `x = 540 + Xg·1500/D`, `y = 900 + H·1500/D`. Demet ekseni Xg **−13.4** (hale ekseni). Yarı genişlik D ≤ 120'de 20 m, D 400'de 7 m'ye doğrusal daralır, ötesinde sabittir. Ağızda 9 hat (4.5 m aralık), D ≥ 400'de 4 hat (makas birleşmeleri çizilmez, hatlar birbirine kavuşur) [T; hat sayısı **G, doğrulanmalı**]. Yatak (balast) `#d3bba6` ışıkta, ray çizgisi `#6a6280` 1.5–2 px, D > 600'de ray çizgisi yok (yalnız bant).
  | H (kare) | alt kenarda D | demet alt kenarda (dekor x) | D 250 | D 400 | D 1000 |
  |---|---|---|---|---|---|
  | 60 (f0) | 88 m | −29 … 653 | y 1260, x 376–544 | y 1125, x 464–516 | y 990, x 510–530 |
  | 100 (f79) | 147 m | 212 … 594 | y 1500 | y 1275 | y 1050 |
  | 140 (f158) | 206 m | 326 … 558 | y 1740 | y 1425, x 464–516 | y 1110, x 510–530 |
  Okuma: f0'da alt yarıyı dolduran yelpaze f158'de alt-ortada dar bir şeride iner. Bu, §2v2.7'deki **yatay ağaçlı bulvarın yerine** geçer (bulvar hale varyantında kalkar; rayların üstünden geçen bir köprü iddiası doğmasın diye). Diyagonal bulvar sağda adsız kalır. Niépce sepeti (300, 1042–1107) demetle çakışmaz (demet o yükseklikte x 476–524).
- **Şehir:** `HavadanSehir` aynı seed (173), gölgeler `haleSabah` formülüyle (kameraya doğru, hafif sağa). **Adsız:** Seine, Jardin des Plantes, kubbe yok (§0.7; yönelim [G]).
- **Darbe ve duman (güncel):** darbe **dekor (720, 675) ≈ ekran (712, 687)** f108 (§2v2.7 aynen). Duman çizgisinin kaynağı **dekor (1150, 935)**: sağ kenarın dışı, ufuk buğusu, yani **şehrin dışı**. Gerekçe: Daguerre Paris'in dışında, Prusya ateşiyle hasar aldı [A E3.1, E3 Çelişki a]. Silah türü gösterilmez ("Krupp" yok). Duman **istasyonun ya da ray demetinin içinden çıkmaz**. Bu karede yerin ve zamanın sıkıştırıldığı açıkça kabul edilir [T]: gerçek hasar birkaç fersah ötede oldu.
- **`sepet` (P07 B):** §2v2.8 aynen, ışık `haleSabah` (Dagron kontrajuru korunur; güneş arkasında, 25° solda). Ray demeti bu görünümde yok (H 150–300'de demet sepetin altında kalır).

### 2v2-H.7 Katman listesi: `arka: "hale"` (arkadan öne; hex'ler tasarım §14.2, yeni olan **[yeni]**)
**`yukleme`** (MONTMARTRE yukleme'den **çıkan katmanlar:** ağaç tacı (6), Paris bandı (1–3), meydan kenar kırığı (4), toprak `MeydanZemin`. Gök (0) yalnız ağız ve alın maskesi içinde kalır.)
| # | Katman | z (m) | Hex | Kontur / kalınlık | Tarama | Kod |
|---|---|---|---|---|---|---|
| H0 | Gök basamakları (ufuk 900 ölçekli, §2v2.6) + sol ışıma, **ağız + alın maskesi içinde** | ∞ | `#8fa3c0` `#a9b7cc` `#cdc6d0` `#f0d0bc` / `#f2c9b2` | yok | yok | `GokLitografi` + maske |
| H1 | Dış uzak buğu: alçak adsız bina bandı (y 830–918) | 200–600 | `#dccfcf` (uzak) / `#b0a6c0` (yakın, 9–14 birim, en 30–110 px) | yok | yok | `UfukBandi` seed 158, `yukseklik: zemin` |
| H2 | Alın camı (üçgen) + 4 kayıt | 83 | cam `#dccfcf`, kayıt `#7a7394` 2 px | — | yok | `HaleAlin` [yeni] |
| H3 | Opak çatı altı (saçak çizgilerinin üstü) | 37–83 | `#6d6384` | yok | II yalnız sağ saçak dibinde 40 px'lik şerit (duvar-çatı köşesi), çapraz tarama yalnız sağ üst köşedeki küçük derin gölgede | `HaleCati` [yeni] |
| H4 | Cam şeritler (iki eğim) | 37–83 | `#cdc6d0`, ağza yakın son bölme `#dccfcf`; 3–4 panel ±2 L\* (seed 181); kenar çizgisi `#7a7394` 1.5 px | — | yok | `HaleCati` |
| H5 | Makaslar Z 80 → 40 (arkadan öne) | 83 → 43 | `#4a4560` (L\* 31); Z70–80 dikmelerinin sol kenarında `#f0c4a8` 1 px | kol 0.5 m (z 83: 9 px, z 43: 17 px), dikme 0.25 m (5–9 px), çekme çubuğu **min 2 px** (gerçek 0.05 m 1 px'in altında kalır) | yok (kendisi çizgi) | `PolonceauMakas {Z, dikme: 1}` [yeni] |
| H6 | Sağ duvar: ışık bandı (sınırın altı) / gölge (üstü) + kolonlar + kolon gölge şeritleri + Daguerre küre gölgesi | 37–83 | ışık `#d8b8a4` (77/17), gölge `#7a7394`, kolon `#4a4560` + sol kenar `#f0c4a8` 2 px, kolon gölgesi `#8f8aa8` | kolon 11–21 px | II 78° yalnız ışık sınırının hemen üstündeki 30 px şeritte (gölgenin net kenarı) ve kolon gölge yüzünde | `HaleDuvar {kolonAralik 10}` [yeni] |
| H7 | Hale döşemesi (ışık) + bütün zemin gölgeleri | 1.5–83 | ışık `#c8ae98`, gölge `#8f8aa8`, stipple `#d6c1ae` (α .25) | — | yalnız gölge kenarı net | `MeydanZemin {malzeme: "hale", cakil: 0}` (seed 157; çakıl ve iz yok) |
| H8 | Daguerre balonu + asma halatı + 3 siluet + sandık yığını | 38–40 | §14.2 balon/hasır/sandık; siluet `#45405a`; halat `#b59e84` | balon 2.5 px (§2v2.9) | balon terminatörü (§2v2.12) | `Balon`, `Sepet` |
| H9 | §2v2 yukleme ön katmanları: yükleyiciler, Dagron, Niépce sepeti (sol yüz **`#937866` [yeni]**), sandık, torbalar, halatlar | 3–5 | §14.2 | §2v2.9 | §2v2.9 | mevcut |
| H10 | Ön plan posta çuvalı | 1.4 | `#d0bba6` / `#a8978f` / `#7a6f86`, ağız ipi `#9a8268` | **6 px** | gölge yanı II | `Torba {tip: cuval}` |
| H11 | Kâğıt + gren | ekran | `ArsivKatmani` **litografi** (gündüz, §2v2.12) | — | — | mevcut |
**`gok`:** §2v2.9 gok tablosu + **G4' ray demeti** (katman 4'ün yerine; diyagonal bulvar kalır) — `RayDemeti {eksenXg −13.4, yariGenislik [20 → 7], hat [9 → 4], seed 182}` [yeni, `HavadanSehir`'in alt modu olabilir]. **`sepet`:** §2v2.9 aynen.
- **Doku (yüzey başına ≤ 3, seed sabit):** demir = düz ton (1), kâğıt (3). Döküm yüzeyi, perçin ve pas yok (360'ta okunmaz, gürültü olur). Cam = düz ton + panel farkı (1), kenar çizgisi (2), kâğıt (3). Yansıma ve dalgalı cam yok (cam alttan, gökün önünde). Duvar = düz ton (1), sınır taraması (2), kâğıt (3). Döşeme = §2v2.12 toprak dokusunun çakılsız hâli.
- **360 px okunurluk:** makas kolu 9–17 → 3–6 px ✓. Çekme çubuğu 2 → 0.7 px (≥ 0.5 ✓, sınırda; makas siluetini kollar ve dikme taşır). Kolon 11–21 → 4–7 px ✓. Cam şerit 120–350 px en ✓. Ağız 920 × 414 → 307 × 138 ✓. Asma halatı 2 → 0.7 ✓. Ray çizgisi 1.5–2 → 0.5–0.7 (sınırda; demet bant olarak okunur).
- **Renk ölçüm noktaları (P06b f206, cs ≈ 1.1; motion ekran karşılığını yazar):** cam şerit (520, 250) `#cdc6d0` · opak çatı (200, 120) `#6d6384` · makas kolu `#4a4560` · ağız gök orta (300, 600) `#a9b7cc` · ışıma (150, 860) `#f2c9b2` · sağ duvar ışık (1000, 700) `#d8b8a4` · döşeme ışık (150, 1600) `#c8ae98` · gölge (800, 1750) `#8f8aa8` · sepet sol yüz (240, 1150) `#937866`. Kabul: §2v2.15 eşikleri. Sıcak piksel oranının düşmesi beklenir (üst üçte bir soğuk demir). Alt sınır **sıcak piksel ≥ %20** (ağız ışıması + duvar + döşeme + hasır). Tutmazsa ilk ayar: cam şeridin ağıza yakın iki bölmesi `#dccfcf` → `#f0d0bc`.

### 2v2-H.8 Dönem/şehir doğruluğu
| İddia | Etiket |
|---|---|
| Niépce ve Daguerre Gare d'Orléans'tan, 09:00 / 09:15, gündüz | [A E3.1, orta-yüksek] |
| Hale: demir, Polonceau, ≈ 280 × 51–52 m, 1862–1867/69 | [A E3.3, yüksek] |
| Mahya ≈ 35 m | [A, tek kaynak] |
| Balonlar çatı altında asılı şişirildi; hale rüzgârdan korudu | [A E3.3, orta] → Daguerre asma halatı |
| Saçak 23 m, eğim 25°, makas aralığı 10 m, cam şerit %30–70 | [T] |
| Tek dikmeli Polonceau çizimi (gerçeği büyük olasılıkla birleşik) | [T] / [G] |
| Kolon (dökme demir) mesneti, alın camı, mahya feneri | [G, doğrulanmalı]; fener çizilmez |
| Hale yönelimi GGD ağız (≈ 161°) | [G, doğrulanmalı] (güneşin kadraj dışında 25° solda olması buna dayanıyor; yanlışsa yalnız ışık vektörünün yanal açısı değişir) |
| Kalkış noktası (ağız/avlu), yükleme yeri (ağıza 80 m) | [A: doğrulanamadı] / [T] |
| Ray demeti hat sayısı | [G] |
| Daguerre ateşle hasar aldı, Paris dışında indi; silah türü belirsiz | [A E3.1, Çelişki a] |
| Kemer, saat, heykel, yazı, bayrak, gaz lambası | yok (kesin) |

### 2v2-H.9 Motion için çizim notları
- **Parametre:** MONTMARTRE `{arka: "meydan" | "hale"}`. P03 → `meydan`; P06b, P07 → `hale`. `arka: "hale"` ⇒ `ISIK_YON.haleSabah`, `yukleme`'de H0–H10, `gok`'ta ray demeti, yatay bulvar kapalı. Dünya modeli, balon, sepet ve kameralar ortak; yalnız katman seti ve ışık vektörü değişir.
- **Yeni ortak modüller:** `PolonceauMakas {Z, aciklik, sacak_h, mahya_h, dikme: 1|3}` (ileride başka istasyon/hale için de kullanılabilir), `HaleCati {cam: [0.3, 0.7]}`, `HaleDuvar {kolonAralik, isikSiniri}` (ışık sınırı formülle: `h = 23 − 0.2346·(Zm − Z)`), `HaleAlin {kayit: [...]}`, `RayDemeti`. Hepsi `dunyaEkran()` ile; elle ekran koordinatı yok.
- **Maskeler:** gök ve dış buğu yalnız "ağız beşgeni ∪ alın üçgeni" maskesinin içinde. Maske kenarı ağız makası ve sağ söve konturunun altında kalır (§0 "maske kenarı/şerit kalmaz").
- **Kontrol kareleri (kalibrasyon):** P06b f168 (tam hale), f206 (D8 dokunuşu + renk ölçümü), f250 (siluetler ağızda); P07 f0 (ray demeti), f112 (darbe). Şerit: P07 f0–158 her 4 kare (demetin daralması ve kayması).
- **Ses (kurgucuya, orkestra iletir):** P06b ortamı "meydan uğultusu" yerine **hale iç yankısı** (büyük, yankılı, uzak çekiç/halat). Temas sesleri yankıyla biraz uzar. Seviye kuralları aynı.

### 2v2-H.10 Yönetmen için kamera tablosu (json sahibi yönetmen; MONTMARTRE `arka: "hale"`)
| Plan | Görünüm | kare | cs | cx | cy | Ek parametre | Ekranda doğrulama |
|---|---|---|---|---|---|---|---|
| **P06b** | yukleme | 168 / 214 / 250 / 287 | 1.0 / 1.2 / 1.45 / 1.45 | 0 / 0 / 0 / 0 | 0 / −100 / −210 / −210 | `arka: "hale"`, `isik: "haleSabah"`, `ufuk_y 900`, `hale: {agiz_Z 80, sacak_h 23, mahya_h 35, makas_aralik 10, eksen_X −13.4, huzme 0}`; Daguerre (888, 687) ø 246 + `asma_halati` (888, 563)→(861, 131); `on_plan_cuval` x 0–165, y ≥ 1328; Dagron ayak (128, 1275), biniş teması (175, 920); `halat_gerilir` = bağlama halatı | f168: ağız makası mahyası (297, 288), sağ saçak (758, 504), Z40 sağ saçak (958, 140); güneş x −159 kadraj dışı. f250: kolonlar x 856/898/955/1033, taban 1498 |
| **P07 A** | gok | 0 / 100 / 158 | 0.9 / 0.95 / 1.0 | 0 | 0 | `arka: "hale"`, `isik: "haleSabah"`, `ufuk_y 900`, `gok_kamera_H` [60, 140], `ray_demeti: {eksen −13.4, yari [20, 7], hat [9, 4]}`, `yatay_bulvar: false`; Niépce (300, 650), Daguerre (790, 620 → 560 f106); **darbe dekor (720, 675) ≈ ekran (712, 687)**; `duman_cizgisi.kaynak` dekor (1150, 935) ufuk buğusu | f0: demet alt kenarda dekor x −29…653; f158: 326…558. Yazı bandı küre tepelerinin üstünde (≥ 405) |
| **P07 B** | sepet | 160 / 200 / 300 | 1.3 / 1.3 / 1.4 | 0 | 0 | `isik: "haleSabah"`; geri kalanı §2v2.18 aynen | §2v2.18 aynen |
**json/belge düzeltme notları (yönetmene; sahiplere orkestra iletir):**
- P06 `devam_plan.parametreler`'e `arka: "hale"` eklenir. `tasiyici` "meydan uğultusu" → "hale yankısı".
- P07 `parametreler` + `devam_plan`'a `arka: "hale"` eklenir. `tasiyici.giris` "aynı meydan" → "aynı hale ağzı".
- sahne-plani P06/P07 satırlarında "MONTMARTRE meydan" yerine "MONTMARTRE (hale)". Senaryo `[GÖRSEL]` "meydanda sepet" yerine "hale altında sepet" (senarist; **metin ve ses değişmez**).
- **Doğruluk notu (yönetmen + senarist):** json P07 `kure_coker` + `sepet_duser` ("kadraj altından düşer") kaynaktan serttir. E3.1: "delik deşik, hızla irtifa kaybı, çiftlik duvarına iniş, yolcular yakalandı". Öneri: küre **kısmen söner** (tam çökme değil), sepet **serbest düşmez, hızla alçalır** ve alt kenardan aynı karede (f152) çıkar. Kare ve süre değişmez, yalnız düşüş eğrisi yumuşar (ivme yerine hız). "Vuruldu" cümlesi bununla çelişmez.

### 2v2-H.11 Açık sorular
1. **Araştırmacıya:** (a) hale yönelimi (ağız GGD mi?); (b) ağız: açık mı, camlı alın perdeli mi; (c) makas mesnedi kolon mu, duvar mı; makas aralığı ve saçak yüksekliği; (d) Fichot gravürünün gözle kontrolü (balon hale içinde mi, ağızda mı; zemin; raylar). Varsayılanlar bu bölümde yazılı. Hiçbiri 360'ta "yanlış yıl/yer" okutmaz.
2. **Tasarımcıya:** yeni ton `#937866` (sepet sol yüzü, sıyırma ışığı, 52/16, h 61°). Hale paletinin geri kalanı §14.2'deki mevcut hex'lerden. Huzme varsayılan kapalı (§14.4 ile uyumlu); açılırsa onay gerekir.
3. **Yönetmene:** P07 düşüş eğrisi (yukarıdaki doğruluk notu). Ekran yönü: kamera 161°'de doğu solda kalır, oysa sahne-plani'de "balonlar doğuya = sağa". P07 A'da pusulayı okutan öğe yok, bu yüzden varsayılan: değişiklik yok, duman sağdan gelir (yönetmen bilsin).
4. **Kullanıcıya (orkestra toplar):** yükleme ağızdan ≈ 80 m içeride (makaslar görünsün diye), kalkış ağızdan ekran dışında. Alternatif: ağız yakın olur, demir kafes görünmez. Varsayılan: 80 m.

---

## 2v2-H2. HALE v2 — gravür kalitesinde Polonceau halesi + Niépce zarfı (P06b, tur-11, GEÇERLİ)

Girdi: `kalibrasyon/B/elestiri.md` (KRİTİK #1, #3'ün hale kısmı, #5 makas), `notlar/tur-11.md` (Gemini yok; hedef = dönem gravürü tarifi + onaylı üç hedefin dili), tasarım §0.3/§0.4/§14. Kod, görsel ve git yok. Sayılar §2v2-H ile aynı pinhole hesabından (F 1500, kamera (0.1, 1.0, −3.40)) betikle üretildi. Motion ilk still'de ±15 px doğrular.

### H2.0 Teşhis → karar
| B turunda görülen | Neden | v2 kararı |
|---|---|---|
| Makaslar tel gibi, 360'ta 1 px altı | Kol/dikme/çekme dünya ölçüsüyle ince çizildi, alt sınır uygulanmadı. Opak çatıda çok sayıda ince çapraz çizgi var: tel kafes okunuyor | Her eleman için **px alt sınırı** (H2.3). Kol çift konturlu "demir lama" gibi çizilir. Opak çatıda tarama tek yönlüdür (aşık yönü, VP'ye yakınsar). Çapraz çizgi yalnız makasın kendi elemanlarında |
| Halka boş, zarf yok (KRİTİK) | `Yukleme` Niépce zarfını çizmiyor. Bu kamerada zarfın yalnız 56 px'lik alt kenarı kadraja girer | Zarf çizilir (H2.5). f168'de kamera **cy +160** ile açılır, zarfın alt kubbesi üst 216 px'i doldurur. Kamera sandığı izleyerek iner (H2.9) |
| Daguerre zarfı duvara giriyor (yeni bulgu, fizik) | Daguerre X 9.4 + yarıçap 3.3 = 12.7 > duvar 12.2 | **Daguerre X 8.4.** Küre (850, 687), sepet (850, 937), asma halatı (850, 563) → (827, 129). Siluetler −38 px |
| Hale "çizim programı" gibi, dönem gravürü değil | Düz renk alanları, tarama yok, kolon başlığı yok | Gravür dili: koyu demir siluet + açık cam + tek yönlü ritmik tarama + döküm kolon başlığı + sarkık ikinci zarf (atölye) |

### H2.1 Referans tarifi (gözle kontrol edilmedi; bilinenler + [G])
- **Charles Fichot, "Atelier de fabrication de ballons-poste à la gare d'Orléans"** (tahta baskı, Claretie 1871) [A: var olduğu E3.3; **içeriği gözle kontrol edilmedi**]. Aşağıdaki kompozisyon tarifi, dönemin istasyon/atölye tahta baskılarının (L'Illustration, Le Monde illustré, Illustrated London News 1870–71 balon atölyesi ve kalkış sayfaları) bilinen genel dilidir. **Fichot'nun kendi karesi için [G]**:
  - Halenin ekseni boyunca **tek kaçış noktalı derin perspektif**. Makaslar tekrar ederek tünel ritmi kurar, ağza doğru küçülür.
  - Balonlar çatı makaslarından **asılıdır**: biri dolu (hava ya da gazla), biri yarı sarkık. Farklı derinlikte, farklı boyda dururlar [A E3.3: "çatı altına asılıp şişirildi"].
  - Yerde küçük, koyu, çapraz taramalı işçi figürleri var: denizciler, dikiş masaları, merdivenler [A orta: denizciler; masa ve merdiven G].
  - Tonu **tarama** taşır, renk değil. Çatının alt yüzü yoğun paralel çizgiyle koyulaşır. Cam şerit kâğıt beyazı kalır, birkaç kenar çizgisi alır. Demir elemanlar düz siyah lama gibi durur, ışık tarafında ince beyaz bir çizgi taşır. Zemin, kaçış noktasına giden birkaç uzun çizgiyle verilir.
- **Bizim çevirimiz (onaylı hedeflerin dili, tasarım §13/§14):** renk sınırlı palette kalır (mor-gölge / gül-ışık). Tarama bu paletin içinde, "gölge tonunun koyusu" ile yapılır. Siyah yok. Mürekkep yerine `#2f2d46`–`#4a4560` ailesi kullanılır. Hedef-çatı ve hedef-Montmartre'deki çizgi kalitesi esas alınır: net kontur, eşit aralıklı ince paralel tarama, düz ton alanları.

### H2.2 Mimari kart farkları (yalnız değişen/eklenen satırlar; gerisi §2v2-H.2)
| Madde | Değer |
|---|---|
| Makas | Biçim §2v2-H.2 aynen. **Düz iki eğik kol, kemer/eğri yok, tek dikmeli Polonceau, ters "W".** Çizim kalınlıkları H2.3. Düğüm noktalarında (dikme ayağı, mahya, saçak) **döküm düğüm plakası**: kolun 1.6 katı çapında daire ya da yuvarlatılmış üçgen, düz koyu. Gravürde makası "demir" okutan şey budur |
| Kolon | **Dökme demir, yuvarlak gövde**, ø 0.6 m. **Başlık:** üstte kare abaküs plakası (0.9 × 0.15 m), altında **basık yastık** (echinus, 0.25 m), altında boyun halkası (0.08 m). Toplam başlık 1.2 m. Başlığın üstünde, makas ayağını taşıyan **tek eğri konsol** (duvara doğru çeyrek daire, yarıçap 1.0 m) var. Kaide: kare plint 0.8 × 0.4 m. Yiv, yaprak, perçin yok. [G, **doğrulanmalı**: dönem demiryolu halelerinde yaygın dor tipi döküm başlık; Renaud halesinin kendi kolonu doğrulanmadı] |
| Cam şerit | §2v2-H.2 aynen (kolun %30–70'i). Alttan bakıldığı için **açık düz ton**. Yalnız iki kenar çizgisi var (aşık). Çıta ızgarası yok |
| Opak çatı | Alt yüzde **boyuna aşıklar** (2.5 m aralık [G]). Çizimde bunlar **tarama işlevi görür**: H2.4 |
| Asılı ikinci zarf (atölye) **[yeni öğe]** | Sol yarıda, makas Z 60–70 arasındaki orta çekmeden tek halatla asılı **sarkık, yarı inik zarf**. X −22, Z 65, h 15–24.4 (8–9 m sarkık kumaş, en 4 m). Verniklenen ya da kuruyan balon [A E3.3 orta: atölye + çatıya asma; tek halat, biçim G]. Sepet, ağ ve halka yok (atölye hâli). Hikâyede işlevi var: "burası balon atölyesi" sorusunu tek imgeyle cevaplar ve Niépce/Daguerre'yi "fabrikadan çıkan iki balon" yapar |
| Niépce asma halatı | Zarf tepesi (0, 10, 0) → Z 0 makasının orta çekmesi (h 24.4). Kadraj dışında (çizilmez). Zarf tepesi 10.0 m, saçak 23 m, çekme 24.4 m ⇒ **13 m açıklık**. Yan duvara 8.9 m ✓. **Zarf haleye sığar** |
| Daguerre | **X 9.4 → 8.4** (H2.0). Zarf sağ duvara 0.5 m kalır ✓. Tepe 10.0 m, Z 40 makasına asılı ✓ |

### H2.3 Makas, kolon, cam: çizim ölçüleri (dekor px = cs 1.0; cs 1.45'te ×1.45 büyür)
| Makas | z (m) | px/m | **Kol (arbalétrier)** 0.6 m [T kalın] | **Dikme** 0.35 m | **Çekme çubuğu** (gerçek ≈ 0.05 → çizim 0.12 m) | Düğüm plakası ø | Kolon gövde / başlık boyu / abaküs eni |
|---|---|---|---|---|---|---|---|
| Z 40 | 43.4 | 34.6 | **21** | 12 | **4** | 34 | 21 / 41 / 31 |
| Z 50 | 53.4 | 28.1 | **17** | 10 | 3 | 27 | 17 / 34 / 25 |
| Z 60 | 63.4 | 23.7 | **14** | 8 | 3 | 22 | 14 / 28 / 21 |
| Z 70 | 73.4 | 20.4 | **12** | 7 | 3 | 19 | 12 / 25 / 18 |
| Z 80 (ağız) | 83.4 | 18.0 | **11** | 6 | 3 | 18 | 11 / 22 / 16 |
- **Alt sınırlar (her cs'de, ekran px):** kol ≥ 8, dikme ≥ 6, çekme ≥ 3, kolon ≥ 10. 360'ta kol 3.7–7 px, dikme 2–4, çekme ≥ 1 px. Eleştirmenin ölçütü (kol ≥ 6 @1080, çekme 360'ta seçilir) karşılanır.
- **Kolun çizimi (gravür "demir lama"):** gövde `#4a4560` düz. **Alt kenar** (kameraya bakan, gölgede) 2 px `#2f2d46` kontur. **Üst kenar** 1.5 px `#9a92ae` ışık çizgisi: gökten yansıma, yalnız Z 60–80. Z 70–80 dikmelerinin sol kenarında 2 px `#f0c4a8` kenar ışığı var (§2v2-H.3: ağızdan giren güneş). Çekme çubuğu tek çizgi `#2f2d46`. Kolun %10'undan ince elemana kontur verilmez.
- **Kolon:** gövde `#4a4560`. Sol kenarda 2 px `#f0c4a8` kenar ışığı var (yalnız ışık sınırının altında). Sağ yarıda 2 düşey tarama çizgisi `#2f2d46` 2 px, aralık 5. Başlık katmanları ayrı tonda: abaküs `#5a5278`, yastık `#4a4560`, alt kenarında 1.5 px `#9a92ae` ışık. Konsol eğrisi 1 dolu şekil, iç kenarı 1.5 px ışık. Kaide düz `#4a4560`, zemine temas gölgesi `#8f8aa8`.
- **Cam şerit:** `#cdc6d0`, ağza yakın son bölme `#dccfcf`, paneller ±2 L\* (seed 181, §2v2-H.7). Kenar çizgileri 2.5 px `#7a7394`. **Cam üstünde tarama yok**: gravürde kâğıt beyazının karşılığı burası, kontrast buradan doğar.

### H2.4 Tarama haritası (yalnız bu yerlerde; açı ve yön sabit, seed sabit, kaynamaz)
| Yer | Yön | Çizgi / aralık (dekor px) | Renk (zemin tonu üstünde) | Neden |
|---|---|---|---|---|
| **Opak çatı alt yüzü** (iki eğim, cam şeridin dışı) | **Boyuna**: her çizgi VP (540, 900)'e yakınsar (aşık yönü). Çatıdaki aşıkların kendisi | 2.5 px, ekranda **sabit 10 px aralık** (dekor koordinatında; cs ile birlikte büyür) | `#5a5278` / zemin `#6d6384` (ΔL ≈ 7) | Gravürde çatı tonu böyle verilir. Makaslara dik değil, onlarla tek kez kesişir: **kafes oluşmaz**. Düşük kontrast doku verir, tel okutmaz |
| Sağ saçak dibi şeridi (duvar–çatı köşesi) | aynı boyuna yön | 2.5 px, 6 px aralık, 40 px şerit | `#2f2d46` | en derin gölge (§2v2-H.7 H3) |
| Sağ duvar, ışık sınırının üstü | 78° | 2 px, 7 px aralık, 30 px şerit | `#5a5278` | net gölge kenarı (§2v2-H.7 H6) |
| Kolon gölge yarısı | düşey | 2 px, 5 px | `#2f2d46` | yuvarlak gövde |
| Niépce zarfı terminatör bandı (H2.5) | 78° | 2.5 px, 7 px | `#4d4a6e` | tasarım §14.2 |
| Sarkık zarf kıvrımları | kıvrım boyunca (düşey) | 2 px, 3–5 çizgi/kıvrım | `#4d4a6e` | kumaşın ağırlığı |
| Sepet, sandık, torba | §2v2.9 aynen; sepet ön yüzü **yatay hasır sıraları** (eleştiri #5, motion) | — | — | — |
- **Tarama olmayan yerler:** cam, gök (ağız), döşeme (yalnız stipple), ışıklı duvar bandı, figürler (H2.8 dışında). Toplam taramalı alan kadrajın ≤ %25'i (gravür yoğunluğu, gürültü değil).
- **Çapraz tarama:** yalnız sağ üst köşedeki duvar–çatı birleşiminde, ≤ 60 × 60 px (§2v2-H.7 aynen).

### H2.5 Niépce zarfı f168: konum ve çizim (KRİTİK #1)
Zarf ø 6.6 m, merkez (0, 6.7, 0), alt kutup h 3.4, boğaz h 2.9–3.4 (ø 0.5), halka h 2.6 (§2v2.4). Kamera zarfın 2.4 m altında, 3.4 m önünde. Zarf fiziksel olarak **kameranın üstünde bir tavan** gibi durur. Kadraja yalnız **arka-alt kenarı** girer (bakış ufkun 29.4° üstünde, kadraj üst kenarı 31°). Hesap (dekor y, cs 1):
| Öğe | Dekor | **Ekran (cs 1, cy +160)** | Çizim |
|---|---|---|---|
| Zarf alt sınır yayı (siluet) | en alt (510, 56); y 0'da x 184–833; y −100'de x −17–1028; y −160'ta x −109–1117 | en alt **(510, 216)**; üst kenarda kadrajı iki yandan taşar | üstte kadrajı dolduran **ters kubbe** |
| Işık hilali | yayın alt kenarı boyunca, en 40 px (ortada) → 15 px (yanlarda) | y 176–216 (orta) | `#e6c9b4` + vernik çizgisi `#ecd9c2` 2 px. Gerekçe: yayın arka-alt yüzü ağza dönük, n·L = +0.25, güneş ağızdan girer (giriş h 22.2 ≤ 23 ✓). Fiziksel, abartı değil |
| Terminatör bandı | hilalin üstünde 24 px | | `#c9b0ac` + 78° tarama `#4d4a6e` 2.5 px / 7 |
| Gölge gövde | bandın üstü → kadraj üstü | y 0–150 | `#8f8aa8` |
| Ağ | 10 meridyen, boğazdan dışa ışınsal; 1 paralel (h 4.5) yayın 40 px üstünde, yaya koşut | | gölgede `#4e4560` 2.5 px, hilalde `#a88f86`. Göz ≥ 60 px ✓ |
| Boğaz (appendix) | x 386–606, y 62 → üst (kumaş tüp, ø 0.5 m ≈ 220 px) | x 386–606, y 222 → 0 | gölge `#8f8aa8`, 3 düşey kıvrım `#4d4a6e` 2 px, ağız kenarı 3 px koyu. Zarfın önünde durur |
| Halka | (297–694, 86–277) elips | (297–694, **246–437**) | §2v2-H aynen, halatlar halkadan zarf ağına (yukarı-dışa) |
| Askı halatları (halka → zarf ağı) | halkadan yayın üstüne, ışınsal | | `#b59e84` 2.5 px, sol kenar `#f0c4a8` 1 px. **Artık boşta bitmez:** her biri ağın bir düğümüne bağlanır |
- **Örtme sırası:** zarf en öndeki büyük katmandır. Makasları (Z ≥ 40) örter. Makaslar yalnız yayın altında ve yanlarında görünür. Bu derinliği kurar (gravürde ön plan koyu kütle).
- **cy 0'da (f194 sonrası):** yay y 0–56'ya çıkar, hilal kadraj üstünde ince bir şerit olarak kalır (y 16–56). Boğaz, halka ve halatlar görünür. Zarf "üstte" diye okunur, çünkü f168–194 arası kurulmuştur (süreklilik: kurulum → karşılık).
- **f250 (cs 1.45, cy −210):** zarf kadraj dışında. Yalnız halatlar var. Doğru.
- **Okunurluk:** ters kubbe 1080 × 216 px (%11 boy). 360'ta 360 × 72 px. Ağ ışınları ve hilal "balonun altı" okutur, çünkü sağda tam küre olarak Daguerre görünür: **aynı nesnenin iki görünüşü yan yana**, izleyici eşleştirir.

### H2.6 Asılı sarkık zarf (atölye) — ekran
| Öğe | Dekor (cs 1) | Çizim |
|---|---|---|
| Asma noktası | (55, 387) Z 60–70 orta çekmesi | tek halat 2 px `#b59e84`, çekmeye düğüm |
| Kumaş | x 11–99, y 387–593. Sarkık, 4–5 düşey kıvrım. Alt ucu toplanmış, düzensiz (seed 183) | gölge `#8f8aa8`, kıvrım taraması H2.4. **Işık sınırı y 494** (h 19.5: altı ağızdan güneş alır, `#e6c9b4` sol yarıda + `#c9b0ac` sağ yarıda) |
| Konum kontrolü | Dagron başı (≈ 128, 637) ile 44 px boşluk ✓. Alın camının ve ağzın parlak tonunun önünde: koyu–açık ayrışma ✓. Sol 80 px pay: arka plan öğesi, bilgi taşımaz | |

### H2.7 Katman sırası (arkadan öne; §2v2-H.7'ye eklenen/değişen satırlar)
| # | Katman | Değişiklik |
|---|---|---|
| H3 | Opak çatı altı | + boyuna tarama (H2.4) |
| H4 | Cam şerit | kenar 2.5 px (1.5 yerine) |
| H5 | Makaslar Z 80 → 40 | ölçüler H2.3, düğüm plakası, ışık çizgisi |
| H5b **[yeni]** | Sarkık zarf + asma halatı | H2.6. Z 65: makas Z 60'ın önünde, Z 70'in arkasında |
| H6 | Sağ duvar + kolonlar | kolon başlığı + konsol + kaide (H2.2/H2.3) |
| H8 | Daguerre | X 8.4 (H2.0) |
| H9a **[yeni, H9'un en önü]** | **Niépce zarfı + boğaz + ağ + halka-üstü halatlar** | H2.5. Yükleyicilerin ve sandığın **önünde değil**: zarf h ≥ 2.9'da, figürler ve sandık onun altında kalır. Çizim sırası: makaslar < zarf < halka < sandık (iniş yolu zarfın altından) |
- **Kod:** `Balon {durum: "dolu", gorunus: "alt"}`: aynı `Balon.tsx`. Yeni bir küre çizimi yok. Siluet tanjant konisinin izdüşümüyle çizilir (sabit elips değil; formül §2v2-H ile aynı pinhole). `PolonceauMakas {minPx: {kol 8, dikme 6, cekme 3}, plaka: true}`, `HaleKolon {baslik: "dor", konsol: true}` [yeni ad, `HaleDuvar` içinde], `HaleCati {tarama: "boyuna", aralik: 10}`, `SarkikZarf {seed 183}` [yeni, `Balon` kumaş paletinden].

### H2.8 Figür dili notu (motion — `SabahFigur.tsx`; tasarımcı onayı gerekir, aşağı bkz.)
Eleştiri #2: manken/robot. Gravür figürü "düz leke" değil, **kontur + iç çizgi + gölge tarafında kısa tarama** ile kurulur. Öneriler:
| Konu | Öneri |
|---|---|
| Omuz | Kas yumrusu lobları **kaldırılır**. 1870 paltosu **düşük, eğimli omuz**, vatkasız. Omuz hattı boyundan 15–20° aşağı iner |
| Kol | **İki parça, dirsekli**: üst kol 0.30 m, ön kol 0.27 m. Dirsek açısı 15–110° arası. **Hiçbir zaman ters bükülmez**: dirsek gövdeden dışa ve aşağı bakar. Kol dirsekte 1.1× hafif genişler (kumaş birikir). Ağır yük kaldıran kolda dirsek 70–100°, omuz yükselir, gövde 5–8° geri yaslanır. "Z" düz çizgiler yok, eklem noktası yuvarlatılmış |
| Başlık (çeşitlilik, aynı kadrajda tekrar yok) | **Silindir** (haut-de-forme: tepe 0.16 m, hafif içbükey gövde, kenar 0.30 m, kenar uçları hafif kalkık): orta sınıf, Daguerre sepetindeki biri, P03'te 1 kişi. **Alçak yuvarlak tepeli fötr / melon** (tepe 0.12 m, kubbe): 1–2 kişi [G: melon Fransa'da 1870'te yaygınlaşıyor, doğrulanmalı. Alternatif: geniş kenarlı yumuşak fötr]. **Kasket** (yumuşak tepe 0.27 m en + kısa siper 0.06 m): işçiler, yükleyiciler. **Denizci beresi** (yassı, siperliksiz): 1 yükleyici, [A: Godard'ın denizcileri]. Ponpon **çizilmez** (kırmızı yasağı, tasarım §14.4). Kepi çizilmez (üniforma okutur). Kadınlarda şal/başörtüsü |
| Yaka ve giysi | Palto/redingot: diz boyu, belde hafif daralma, **etek yırtmacı** (arkadan bakışta tek düşey çizgi), dik ya da devrik yaka (boyunda 2–3 px açık üçgen boşluk ya da koyu yaka çizgisi). İşçi: **bol "blouse"** (önlük gömlek, kalça boyu, belde toplanmış) ya da kısa ceket (vareuse). Dagron: §3.2 iki ton + sepya manşet, başlığı **silindir** önerisi (tasarımcıya) |
| Gravür çizimi | Dolgu `#45405a` (kompars). **Kontur** 2.5 px, dolgunun %55 koyusu (`#2a2638`). **İç çizgi** (palto önü, yaka, cep kapağı, kol ağzı, etek yırtmacı) 1.5–2 px `#2a2638`. **Gölge tarafında tarama** (kontrajurda gövdenin sağ üçte biri) 78°, 2 px, 6 px aralık, `#2f2d46`, yalnız ≥ 120 px boylu figürde. Sol/üst kenar ışığı `#f0c4a8` 2 px (§2v2.10). 64 px'lik uzak siluetlerde (Daguerre dibi) yalnız siluet + başlık; iç çizgi ve tarama yok |
| Yüz | Yine yok (tasarım §3.0). Kulak ve ense çizgisi yok, şapka altında saç kütlesi 1 ton koyu |
- **Tasarım çelişkisi (gerekçeli):** tasarım §3.0 "şapka/üniforma/aksesuar yok" diyor. Eleştirmen #2 ve benim §2v2.19 açık soru 5 aynı yönde. Gerekçe: 1870 kalabalığında başı açık erkek az görülür [G]. Başlık, yüz olmadan dönemi ve sınıfı okutan **tek** siluet öğesidir. Üniforma okutmayan dört tip seçildi. **Tasarımcı §3.0'ı günceller** (sahibi o). Bu not yalnız öneri ve ölçüdür.

### H2.9 Yönetmen için kamera tablosu (P06b; json sahibi yönetmen) — §2v2-H.10'un P06b satırının yerine
| Plan | kare | cs | cx | cy | Not |
|---|---|---|---|---|---|
| **P06b** | 168 / 172 / 214 / 250 / 287 | 1.0 / 1.0 / 1.2 / 1.45 / 1.45 | 0 / 0 / 0 / 0 / 0 | **+160** / +160 / −100 / −210 / −210 | f168–172 tutuş: zarf, halka, makaslar, ağız. **f172–214 tek ve sürekli iniş (inout).** Kamera sandığın inişini izler (sandık f170–190 dekor 355 → 876, ekranda ≈ 515 → 880). Orta noktada durma yok. Sonrası §2v2-H.10 aynen |
- Ek parametre: `balon_kuresi: {cizim: "alt", hilal: true}`, `ikinci_balon.X 8.4` → küre (850, 687), sepet (850, 937), asma halatı (850, 563)→(827, 129); `sarkik_zarf: {X −22, Z 65, seed 183}`.
- **Ekranda doğrulama:** f168: zarf yayı en alt (510, 216), halka y 246–437, Z 40 sağ saçak (958, 300), ağız mahyası (297, 448). **Kontrol karesi f168'e ek olarak f230 (biniş teması) ve şerit f200–260** (eleştiri #2/#5, teknisyen).
- **Yazı bandı:** f168–200 üst bant (240–400) halka ile çakışır. P06'nın ekran yazısı f160'ta bittiği için çakışma yok. Bu aralığa yazı konmaz (yönetmen bilsin).
- **Katalog sınırı:** `sinirlar.json` MONTMARTRE `yukleme` cy üst sınırı +50 → **+170** (motion günceller; şablon kamera aralığı `cy [-250, 450]` zaten içerir).

---

## 2v2-G2. HAVADAN PARİS v2 — P07 A `gok` + `arka: "hale"` (tur-11, GEÇERLİ; §2v2.7 ve §2v2-H.6'nın şehir/yön/ışık satırlarının yerine)

### G2.0 Teşhis → karar (tek cümle)
- **Teşhis:** kamera GGD'ye (161°) bakıyordu. O yönde Paris'in imzası yok: demiryolu sahaları, hastane, sanayi varoşu var. Şehir eş kutulardan ızgara olarak (plan görünüşü) çizildi. Ama kamera 13–15° aşağı bakar ve bu açıda şehir **üst üste binen çatı sıraları** olarak görünür, kutu planı olarak değil. Gölgeler yanal güneşten kameraya doğru düşüyordu ve dev lekeler bıraktı.
- **Karar:** P07 A'da kamera **geri döner, kuzeybatıya (310°) bakar**: balonlar şehirden çıkarken arkalarında kalan Paris. Kadrajda şunlar var:
  - Altta istasyon sahasının ray yelpazesi, haleye yakınsar.
  - Ortada halenin cam çatısı. Mahyası şehre doğru bir ok gibi uzanır.
  - Sağda Seine geniş, parlak bir şerit olarak girer, merkeze doğru incelir.
  - Şeridin ucunda Notre-Dame (iki kule + flèche), solda ufukta Panthéon kubbesi.
  - Hepsinin arasında mansard/baca çatı denizi.
  - Güneş kameranın arkasında: şehir **önden ışık alır**. Sıcak cepheler var, gölgeler binaların arkasına düşer. Dev gölge lekesi kalmaz.
- **Hikâye gerekçesi:** "şehir altta kayıp gider" (§2v2-H.1) en güçlü haliyle budur: **geride kalan Paris**, uzaklaşır ve küçülür. Kuşatma, ayrılış, imza. 360'ta "Paris" okumasını üç imza birlikte taşır: Seine şeridi, Notre-Dame silueti ve baca dizili çatı denizi.

### G2.1 Referans tarifi (dönem kuşbakışı dili; gözle kontrol edilmedi, [G])
- **Alfred Guesdon**, *Voyage aérien en France* / *Paris vu en ballon* türü kuşbakışı litografiler (1840–50'ler) [G: seri adı ve yılları doğrulanmalı]. Bilinen dili:
  - Eğik kuşbakışı, ufuk kadrajın üstünde.
  - Çatılar üst üste binen yüzler halinde çizilir. Gölge yüzlerinde ince paralel tarama, ışık yüzleri kâğıt rengi.
  - Sokaklar, sıralar arasında dar açık yarık olarak görünür.
  - Nehir parlak bir şerittir: yatay çizgiler, kıyı duvarı, köprü kemerleri.
  - Anıtlar ölçeğinden biraz büyük ve net çizilir (veduta geleneği).
  - Uzaklık, çizginin incelmesi ve seyrelmesiyle verilir.
  - İki tonlu litografi: siyah + tek ten rengi, ışıkta kazınmış beyaz.
- Charles Fichot'nun 1860–70'ler Paris kuşbakışı panoramaları aynı dili taşır [G].
- **Bizim çevirimiz:** "iki ton + tarama" mantığı her yüzeye uygulanır: ışık tonu, gölge tonu, gölgede tarama. Palet tasarım §14.2 (havadan satırları) + P10a gök satırları (güneşe sırt). Tarama yalnız yakın ve orta bantta. Uzak bant düz buğu.

### G2.2 Mimari ve coğrafya kartı: 12 Kasım 1870, ≈ 09:05, Gare d'Orléans'ın GD'sunda, 80→160 m irtifa
| Madde | Değer |
|---|---|
| Kamera | Yön **310°** (KB). Yer noktası f0'da hale ağzının ≈ 330 m GD'su, ray sahası üstü [G]. Yükseklik H (çatı düzlemi 20 m'nin üstünde) **60 → 140 m**, §2v2.7 aynen. **Geri sürüklenme** f0 → f158: 0 → 60 m (rüzgâr GD'ya, [A: Niépce Marne yönüne indi; hız T]). Ufuk y 900, F 1500, cs 0.9 → 1.0 (aynen) |
| Hale (yukarıdan) | Eksen kameraya göre ≈ +6° (KB–GD, Seine'e koşut [G, **doğrulanmalı**]). Ağız (GD ucu) D 330, baş (KB ucu, Place Valhubert) D 635. En 51.2, saçak 23, mahya 35. Görünen: **ağız alnı** (camlı üçgen + 4 kayıt, kameraya bakar, ışıkta) + **iki çatı eğimi** + **cam şeritler** + mahya. Kemer yok, saat yok, yazı yok |
| Ray sahası | Alt kenardan (D 110 @ H60; D 212 @ H140) ağza yakınsayan demet. Alt kenarda X −70…+90 (≈ 20 hat, 8 m aralık), ağızda X 10…46 (9 hat, 4.5 m). Hatlar birleşerek azalır, makas birleşimleri çizilmez. **Duran 4 vagonluk dizi** (sol ikinci hat, D 150–230): kuşatmada trenler çıkamıyordu [A: Paris kuşatma altında; vagonların varlığı G]. "Her nesnenin yeri anlamlı": duran tren = kapalı şehir |
| Saha yapıları (sol alt) | 2 uzun beşik çatılı yük hangarı, X −60…−110, D 130–320, saçak 8 / mahya 12 m. Alın kameraya bakar: **düz başlıklı büyük kapı açıklığı** (kemer yok) [G] |
| Rıhtım (sağ alt) | Quai d'Austerlitz: yol + tek sıra çıplak ağaç (X 60–95) + rıhtım duvarı [G] |
| **Seine** | Sol kıyı X 95 (D ≤ 684). Pont d'Austerlitz D 684. Ötesinde orta hat X 166 → 265 (D 2000), sonra sola kıvrılır (X 200 @ D 2600). En ≈ 150 m [G]. Su yüzü kıyıdan ≈ 6 m aşağıda (çizimde yok sayılır) |
| Pont d'Austerlitz | D 684, nehre dik. **Taş, 5 basık (segmental) kemer** [G, **doğrulanmalı**: 1854–55 yeniden yapım]. Kameraya bakan yüzü ışıkta. Kemer gözleri koyu basık yay. **Sivri ya da yarım daire kemer değil** |
| Île Saint-Louis | D 1650–2050, X 240–260 ekseninde nehri ikiye böler. Koyu, düşük blok kümesi, ışıklı ön cephe çizgisi. Pont de Sully **yok** (1876 [G]). Passerelle de Constantine (1838–72 [G]) çizilmez (çok ince) |
| **Notre-Dame** | X 172, D 2182 (Cité doğu ucu). **GD'dan, eksene yakın bakış:** önde yarım daire **apsis** + 3–4 kısa uçan payanda tiki, uzun çatı sırtı, ortada **flèche** (96 m; Viollet-le-Duc 1859 ⇒ 1870'te **var**, CLAUDE.md "1786–1860'lar" aralığının dışında), arkada **iki kare kule yan yana, düz tepe** (69 m). Kule tepesinde sivri yok |
| **Panthéon** | X −572, D 1892 (ufukta sol). Kubbe + sütunlu kasnak + fener + **küçük haç** (1851–71 kilise dönemi, §1v3.11 / E3.4) |
| Jardin des Plantes | Sol orta, X −420…−20, D 700–1200: çıplak kış ağaçları kütlesi [G] |
| Bulvar yarığı | Hale başından sola giden ağaçlı yarık (Bd de l'Hôpital yönü [G]): (634, 1088) → sol kenar (0, 1127) @ H60. 40 m [T, kaldırım dahil], iki sıra ağaç noktası. **Adsız** |
| Çatı denizi | Hale ile Jardin arası, Jardin'in ötesi (Quartier latin), nehrin sağ kıyısı (Marais/Arsenal). Haussmann sonrası + eski karışık. G2.4 |
| Kadraj dışı (kontrol) | Colonne de Juillet (+45°), Val-de-Grâce (−36°), Salpêtrière kubbesi (−45°), Montmartre (+29°): **çizilmez**. Eyfel, Sacré-Cœur, Viaduc d'Austerlitz (1904), Gare de Lyon saat kulesi (1900): **yok** (dönem) |
| Konum kaynakları | Anıt ve nehir konumları genel harita bilgisinden, 48.84°K enleminde yerel metreye çevrildi (betik). **Tümü [G, doğrulanmalı]**, ±100 m. Bu hata ekranda ±20–40 px eder. Okumayı değiştirmez |
- **§0.7'deki "anıt silueti çizilmez" kararı P07 A için kalkar.** O kararın üç gerekçesi vardı: (1) görünürlük doğrulanmamıştı, (2) Notre-Dame flèche'i 1870'te var, (3) kamera yönü hesaplanmamıştı. Bu kartta (2) doğru yazıldı, (3) hesaplandı, (1) [G] olarak işaretli kaldı. Görünürlük geometrik olarak açık: hepsi kamera yükseklik bandının altında, ufkun üstüne taşmaz.

### G2.3 Ekran anahtarları (dekor px = cs 1; ekran = (dekor − (540, 960))·cs + (540, 960))
| Öğe | H 60 (f0) | H 100 (f79) | H 140 (f158) |
|---|---|---|---|
| Ray demeti alt kenar | x −415…1767 (tam en) | −210…1504 | −78…1334 |
| Hale ağzı: sol saçak / mahya / sağ saçak | (551, 1159) / (667, 1105) / (784, 1159) | (550, 1304) / (657, 1254) / (763, 1304) | (549, 1427) / (648, 1381) / (746, 1427) |
| Hale ağzı tabanı | y 1264 | 1400 | 1515 |
| Hale başı mahyası | (686, 1006) | (680, 1092) | (674, 1170) |
| Seine sol kıyı D 300 / D 500 | (1015, 1300) / (825, 1140) | (972, 1445) / (809, 1240) | (936, 1567) / (794, 1329) |
| Pont d'Austerlitz (nehir ortası; kıyılar x 740 / 1069 @ H60) | (904, 1075) | (889, 1152) | (875, 1223) |
| Seine orta D 1000 / 1500 / 2000 / 2600 | (825, 1020) / (767, 980) / (739, 960) / (655, 946) | (816, 1075) / (763, 1018) / (736, 989) / (654, 968) | (809, 1126) / (758, 1054) / (733, 1017) / (653, 990) |
| Île Saint-Louis doğu / batı ucu | (776, 973) / (716, 959) | (772, 1007) / (713, 987) | (768, 1040) / (711, 1014) |
| **Notre-Dame** taban / kule tepesi / flèche (×1.8) | x 658: 955 / 870 / 836, en 49 | 981 / 897 / 864 | 1007 / 924 / 891 |
| **Panthéon** taban / kubbe tepesi (×1.8) | x 87: 963 / 845, kubbe en 46 | x 94: 994 / 877 | x 100: 1023 / 908 |
| Jardin des Plantes ön kenar / merkez | (283, 1071) / (304, 1022) | (293, 1147) / (311, 1078) | (303, 1216) / (318, 1131) |
| Bulvar yarığı (hale başı → sol kenar) | (634, 1088) → (0, 1127) | (630, 1169) → (0, 1222) | (626, 1243) → (0, 1310) |
| Şehrin uzak sonu (D 6000) | y 920 | 930 | 940 |
- **Anıt büyütmesi ×1.8 [T, veduta geleneği]:** gerçek ölçekte Notre-Dame kuleleri 47 px boy, 8 px en (360'ta 3 px) ve okunmaz. ×1.8 ile kule 85 px, cephe 49 px olur. 360'ta 28 × 16 px: "iki kule + iğne" okunur. Büyütme anıtın **taban noktası** etrafında yapılır. Konumu değişmez, buğu tonu kendi D'sinden gelir. Bu, CLAUDE.md "hafif abartı" sınırını zorlar. **Kullanıcı onayı** (orkestra toplar). Reddedilirse ×1.4: kule 66 px, 360'ta 22 px, sınırda.
- **Balonlarla çakışma kontrolü (f0, ekran cs 0.9):** Panthéon (132, 856–963), Niépce zarfının (x 121–527, alt ≈ 885) altında ve halatların solunda ✓. Notre-Dame (ekran ≈ 646, 848–957), Daguerre zarfının alt yayının (x 646'da y ≤ 695) altında, sepet halatlarının (x 765–810) solunda ✓. Darbe (712, 687) gökte ✓. Yazı bandı 240–400 boş gök ✓.

### G2.4 Çatı denizi: "satır" dili (maket blok yerine) — `HavadanSehir {mod: "satir"}`
Kamera 13–15° aşağı baktığı için her **sıra** (bir sokağa bakan bina dizisi) şöyle görünür: ön cephe şeridi, onun üstünde mansard alt eğimi (brisis), en üstte baca dizileri. Arkadaki sıra öndekinin üstünden yalnız çatı ve üst katlarıyla görünür (hedef-çatı'daki çatı denizinin havadan sürümü).
| Parametre | Değer (seed 173) |
|---|---|
| Sıra derinlik aralığı | 50–110 m (lognormal). Aynı aralık art arda en çok 2 kez |
| Bina | cephe 16–22 m (5–7 kat, komşu farkı ≥ 1 kat). %15 alçak eski bina (2–3 kat, eğik çatı). %5 köşe yükseltisi (+1 kat) |
| Parsel eni | 8–20 m. Her parsel sınırında **baca kümesi** (souche): 0.8 × 3–5 m, cephe üstünden 2 m yüksek, tepesinde 3–8 **külah** (mitron) tiki |
| Çatı | %60 mansard: brisis 70° + terrasson. %40 eğik (35°). Mahya hattı düzensiz (parsel başına ±1.5 m) |
| Sokak yarıkları | Bakış eksenine koşut sokaklar 80–150 m aralıkla, VP (540, 900)'e yakınsar. **Sol duvar gölgede** (sağa bakan yüz, n·L −0.10), **sağ duvar ışıkta**. Dik sokaklar arka sıranın gölgesinde (koyu düz şerit, sokak eni kadar, leke değil) |
| Yakın bant D 300–700 | Cephe şeridinde pencere tikleri (1.2 × 2 m, 3 m ritim, `#7a7394`, ≥ 3 px). Brisiste lucarne sırası (3 m ritim). Baca kümesinde ışık yüzü + külah tikleri. Kontur 2.5 px (D < 400), 1.5 px (400–700) |
| Orta bant D 700–1500 | Pencere tiki yok. Sıra = cephe şeridi (ışık) + çatı şeridi (mansard tonu) + baca tikleri (2 px). Kontur yok. Sokak yarıkları yalnız çizgi |
| Uzak bant D > 1500 | Kesik yatay ton şeritleri (ışık / çatı / gölge, 2–6 px). Buğu α = min(.80, D/1900) → `#dccfcf`. Baca tiki yok. Anıtlar bu bandın önünde, iki ton |
| Ağaçlar | Bulvar ve rıhtım: 9–12 m aralık, %10 boşluk. **Kış: çıplak.** Nokta değil, **küçük dallı fırça lekesi** (5–9 px, `#6a6280` dal + `#9a92ae` taç sisi). B turundaki "top" okuması olmasın |
| Gölge boyu | Yalnız binaların **arkasına** düşer (G2.5). Görünen gölge en çok sokak eni kadardır. Uzun lavanta leke yok (eleştiri #3 ✓) |

### G2.5 Işık: tek vektör `ISIK_YON.havaGeri` (P07 A)
- Güneş 136°/12°, kamera 310° ⇒ güneş **arkada, 6° solda**. Işığa doğru (X sağ, h yukarı, Z ileri) **(−0.102, 0.208, −0.973)**. Zemin gölgesi: h yüksekliğindeki nokta **(X + 0.49·h, D + 4.68·h)**'ye düşer (ileri, hafif sağa). `GolgeSeridi` bu formülü kullanır.
- **Işıkta:** kameraya bakan her yüz (cepheler, hale alnı, köprü yüzü, Notre-Dame apsisi), yukarı bakanlar, sola bakanlar (sıyırma). **Gölgede:** sağa bakan yan yüzler (ince şerit), kameradan uzağa bakan çatı eğimleri (çoğu görünmez), sıraların arkası.
- **Balonlar:** önden ışık ⇒ gerçek terminatör sağ-alt kenarda çok ince bir hilaldir. Çizimde **sol-üst %65 ışık yüzü + sağ-alt %35 terminatör ve gölge** [T, tasarım §14.1'deki %35 abartısının ters yönü; amaç kürenin hacmi ve terminatör taraması]. Tarama 78° aynen. Kenar ışığı `#f0c4a8` artık **sol kenar + üst kenar** (ışık arkadan-solda); kontrajur dili P07 B'de kalır.
- **Gök (güneşe sırt):** tasarım §14.2 P10a satırı: tepe/üst/orta `#6f86ad` / `#8fa3c0` / `#a9b7cc`, alt **`#c9c8d2`**, ufuk **`#dcd0d0`**. **Sol ışıma yok** (güneş arkada). Yeni hex yok.
- **Sıcaklık:** önden ışık alan krem cepheler alt yarıyı ısıtır. Kabul eşiği sıcak piksel **≥ %22** (gökü soğuk). Tutmazsa ilk ayar: orta bant ışık şeritlerinin oranı %40 → %55.

### G2.6 Katman tablosu (arkadan öne; hex'ler tasarım §14.2 — yeni hex yok)
| # | Katman | D (m) | Işık / gölge / çizgi hex | Kontur | Tarama | Kod |
|---|---|---|---|---|---|---|
| G0 | Gök (5 basamak, ufuk 900 ölçekli, ışıma yok) | ∞ | G2.5 | — | litografi geçişi (§2v2.12) | `GokLitografi {isima: false}` |
| G1 | Uzak buğu + şehrin uzak bandı | > 1500 | `#dccfcf` / `#b0a6c0` şeritler | yok | yok | `HavadanSehir {mod: satir, bant: uzak}` |
| G2 | **Panthéon, Notre-Dame** (×1.8) | 1900–2200 | gövde `#b0a6c0`, ışık yüzü (apsis, kubbe sol yarısı) `#d8b8a4`, gölge yanı (sağ) `#9a92ae`; çatı/kule tepesi `#8d85a6` | **1.5 px `#8d85a6`, yalnız anıtlar** [T: okunurluk istisnası] | yok | `Anit {tip: "notreDame1870"\|"pantheon1870", olcek 1.8}` [yeni] |
| G3 | Seine uzak (D > 1200) + Île Saint-Louis | 1200–2600 | su `#dccfcf` (en parlak, gök yansıması), ada `#9a92ae` + ışık cephe çizgisi `#d8b8a4` 2 px | yok | yok | `Nehir` [yeni] |
| G4 | Orta bant çatı denizi + Jardin des Plantes | 700–1500 | cephe `#e0c8b2` / mansard `#a89fbe` / gölge `#9a92ae` / baca `#8a6458`–`#4f4347`; Jardin taç sisi `#9a92ae` + dal `#6a6280` | yok | yok | `HavadanSehir {bant: orta}` |
| G5 | Seine yakın + Pont d'Austerlitz + rıhtım | 300–1200 | su `#cdc6d0` + **yatay su çizgileri** `#9a92ae`. Köprü yüzü `#e0c8b2`, kemer gözü `#7a7394`, korkuluk üstü `#f0c4a8` 1 px. Rıhtım duvarı `#7a7394` 2.5 px, üstü `#e0c8b2` | 2.5 px (köprü, D < 700) | **su çizgileri**: yatay, 2 px (D < 700) → 1.5 px, aralık 7 → 4 px uzağa doğru, her çizgi 30–90 px kesik (sürekli çit değil), kıyıya yakın sık | `Nehir` |
| G6 | Yakın bant çatı denizi + bulvar yarığı | 300–700 | G4 tonları + pencere/lucarne `#7a7394`, külah `#8a6458` | 2.5 / 1.5 px | **sağ yan yüzler** 78°, 2 px, 6 px aralık, `#5a5278`; sokak yarığının sol duvarı aynı | `HavadanSehir {bant: yakin}` |
| G7 | **Hale** (çatı + cam + alın) | 330–635 | sol eğim (ışık, sıyırma) `#a89fbe`, sağ eğim `#7a7394`, cam şerit `#cdc6d0` / ağza yakın `#dccfcf`, alın camı `#dccfcf` + 4 kayıt `#4a4560` 2.5 px, alın makası `#4a4560` 4 px | 2.5 px `#4a4560` | sağ eğimde boyuna (mahyaya koşut) 2 px / 6 px `#5a5278` | `HaleUstten` [yeni; `HaleCati` cam oranlarıyla] |
| G8 | Saha hangarları + duran vagonlar | 130–320 | alın `#e0c8b2`, kapı `#5a5278`, çatı ışık `#a89fbe` / gölge `#7a7394`; vagon gövde `#7a7394`, ön yüz `#e0c8b2`, tavan `#a89fbe` | 3 px | hangarın sağ eğimi + vagonların sağ yanı 78°, 2.5 px / 7 px `#5a5278` | `HavadanSehir {yapi: "hangar"}` |
| G9 | Ray sahası + ray demeti | 110–330 | zemin `#c8ae98`, balast `#d3bba6`, ray `#6a6280` (D < 250 çift ray, 2.5 px; ötesi tek çizgi 2 px). Rıhtım ağaçları G2.4 | — | yok (rayların kendisi ritmik paralel çizgidir) | `RayDemeti {yon: "agiza", hat: [20, 9], seed 182}` |
| G10 | Balonlar, sepetler, darbe, duman | 22–34 | §14.2; ışık G2.5 | §2v2.9 | terminatör 78° | `Balon {isik: havaGeri}` |
| G11 | Kâğıt + gren | ekran | `ArsivKatmani` litografi | | | mevcut |
- **Tarama sözleşmesi:** tek açı 78° (gölge yüzleri), su için ayrı **yatay** çizgi. Su çizgisi tarama değil, malzeme işaretidir; gravürde suyun standart dili budur. D > 700'de gölge taraması yok. Taramalı alan kadrajın ≤ %20'si. Çapraz tarama yok.
- **360 px:** Seine yakın şerit 330–375 px en (360'ta 110+) ✓. Su çizgisi 2 → 0.7 px ✓. Köprü 22–34 px boy ✓ (7–11). Hale alnı 233 × 159 px (78 × 53) ✓. Ray çifti 2.5 → 0.8 px ✓. Notre-Dame 49 × 119 (16 × 40) ✓. Panthéon 46 × 118 ✓. Baca tiki 2 px (0.7) sınırda: tek tek değil dizi olarak okunur.

### G2.7 Darbe ve duman (yalnız yön değişiklikleri; çizim motion #4)
- **Darbe** dekor (720, 675), f108: aynen.
- **Duman kaynağı:** dekor **(1150, 700)**. Sağ kenarın dışı, **gök yüksekliğinde**, ufkun 200 px üstü. Eski kaynak (1150, 935) bu yönde ufkun üstünde **Paris'in sağ kıyısına** denk gelir ve "şehirden ateş edildi" okutur. Yeni kaynak kadraj dışından, yatay ve hafif yükselen bir iz verir. Sağ = KD, Prusya hatları yönü [G, mantık]. Yerin ve zamanın sıkıştırıldığı açık [T] (§2v2-H.6 aynen).
- Daguerre düşüşü x ≈ 790'dan aşağı iner. Hale ve nehrin önünden geçer. Notre-Dame'ı örtmez ✓.

### G2.8 Dönem/şehir doğruluğu (P07 A)
| İddia | Etiket |
|---|---|
| Niépce/Daguerre Gare d'Orléans'tan, sabah | [A E3.1] |
| Hale Seine'e koşut, KB–GD ekseni, baş Place Valhubert'te | [G, **doğrulanmalı**] (aşağı açık soru 1) |
| Notre-Dame flèche'i 1870'te var (1859) | [G, yüksek güven; araştırmacı teyit etsin] |
| Panthéon fenerinde haç (1851–71) | [A E3.4, orta] |
| Pont d'Austerlitz taş, 5 basık kemer (1854–55) | [G, doğrulanmalı] |
| Pont de Sully yok (1876); Viaduc d'Austerlitz yok (1904) | [G, yüksek güven] |
| Anıt ve nehir konumları (±100 m) | [G, harita genel bilgisi] |
| Kuşatmada duran vagonlar | [G, mantık: hatlar kesik] |
| Çatı denizi karışık (Haussmann mansardı + eski evler) | [G, dönem genel] |
| Anıtlar ×1.8 | [T, veduta; kullanıcı onayı] |

### G2.9 Yönetmen için kamera tablosu (P07 A; json sahibi yönetmen) — §2v2-H.10'un P07 A satırının yerine
| Plan | Görünüm | kare | cs | cx | cy | Ek parametre (yeni/değişen **kalın**) | Ekranda doğrulama |
|---|---|---|---|---|---|---|---|
| **P07 A** | gok | 0 / 100 / 158 | 0.9 / 0.95 / 1.0 | 0 | 0 | `arka: "hale"`, **`yon: 310`**, **`isik: "havaGeri"`**, `ufuk_y 900`, `gok_kamera_H` [60, 140], **`geri_surukleme_m` [0, 60]**, **`ray_demeti: {yon: "agiza", agiz_D 330}`**, **`nehir: true`**, **`anitlar: {olcek: 1.8}`**, `yatay_bulvar: false`; Niépce (300, 650), Daguerre (790, 620 → 560 f106); darbe dekor (720, 675); **`duman_cizgisi.kaynak` dekor (1150, 700)** | f0: hale ağzı mahyası (667, 1105), Notre-Dame tabanı (658, 955), Seine sol kıyı D300 (1015, 1300); f158: hale mahyası (648, 1381). Kamera değerleri **değişmez**; değişen dünyanın yönü ve ışığı |
| **P07 B** | sepet | §2v2-H.10 aynen | | | | `isik: "haleSabah"` (kamera GGD'ye bakar, Dagron kontrajur) | A → B kesmesi **ters açı** (≈ 150°). Daguerre A'da sağda, B'de solda. Dagron'un başı **sola** döner (§2v2.8 zaten öyle) ✓ |
- **Not (yönetmen + senarist):** A'nın yönü değişti, kesme ters açı oldu. 180° kuralı açısından A'da balonların kameraya göre konumu B'nin karşı açısıdır. Bakış yönü (Dagron sola, Daguerre solda) tutarlı. Sahne-plani'deki "balonlar doğuya = sağa": A'da doğu sağ-arka. Pusulayı okutan öğe yok. Eleştirmenin "doğu yönü çelişkisi" A'da artık "sağ = KD, duman sağdan" olarak tutarlı.

### G2.10 Açık sorular (orkestra toplar)
1. **Araştırmacıya — hale ekseni:** genel bilgime göre Gare d'Austerlitz grande halle'si Quai d'Austerlitz'e (Seine'e) koşut, ekseni ≈ 135–140° (KB–GD) [G]. Bu kart buna dayanıyor. §2v2-H.2 ise P06b için 161° varsayıyor (güneşi kadraj dışına itmek için). Eksen 136° ise P06b'de güneş ağzın tam ortasında olur. Öneri: P06b 161°'de kalır [T, iki plan aynı karede yön ipucu taşımaz, izleyici görmez]. Bilinçli tutarsızlık olarak kayıt. Doğrulanırsa kullanıcıya sorulur.
2. **Kullanıcıya:** anıt büyütmesi ×1.8 (G2.3). Varsayılan: ×1.8.
3. **Kullanıcıya:** P07 A'nın yönü ters (Paris'e geri bakış; A→B ters açı kesmesi). Alternatif eski yön (GGD) olur: imza yok, yalnız çatı dili. Varsayılan: yeni yön.
4. **Tasarımcıya:** figür başlıkları (H2.8) → §3.0 güncellemesi. G2.5'teki balon ışık oranı (%65 önden ışık) ve P07 A gökünün P10a satırını kullanması (yeni hex yok).
5. **Motion'a:** `Anit` siluetleri için ölçü kartı G2.2'de. Notre-Dame: cephe 40 m, kule 69 m, flèche 96 m, nef sırtı 43 m, apsis yarım daire; Panthéon: kubbe tepesi 83 m, kasnak sütunlu. İkisi de ekranda 2 ton + 1.5 px kontur. Kare kare iç detay yok (pencere, gül pencere çizilmez).

---

## 2. KE-PK-S2 MONTMARTRE (P03, P06b, P07) — v1, ARŞİV (geçerli olan §2v2)

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

> **v1, ARŞİV.** Geçerli metin **§3v2** (§4'ün sonunda, §5'ten önce). Çelişkide §3v2 geçerlidir (ışık 35° → 18°, palet, kutu ölçüsü, terazi konumu).

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

> **v1, ARŞİV.** Geçerli metin **§4v2**. v1 dünya geometrisi (F 2600, perde, mercek, memurlar) aynen geçerlidir; değişenler: `kapi` görünümü + kesme f266, kapı X 0.80, huzme gravür dili, sıcak kapı ışığı.

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

## 3v2. KE-PK-S3 DAGRON-INSERT v2 — GEÇERLİ (C turu, tur-14; P04b `kafes`, P05 `masa` Paris atölyesi, P09 `masa` Tours bürosu)

Girdi: §3 v1 (arşiv), tasarım §1.4 / §4.3–4.7 / §13 / §14 / §2.4 / §3.2–3.3, `bolum.json` P04b/P05/P09, `arastirma.md` §3, §5.4, E3, eleştiriler V3/V4/B2/B3, hedef üçlüsü (kuş, çatı, Montmartre). Gemini görseli yok (tur-11). Kod, görsel ve git yok. Sayılar v1'in masa kamerasından (F 1176, kamera masanın 0.42 m üstünde, 35° aşağı, masa ufku y 137) betikle hesaplandı. Motion ilk still'de ±15 px doğrular.

### 3v2.0 Teşhis → karar
| v1'de görülen / risk | Neden | v2 kararı |
|---|---|---|
| **Fiziksel hata:** pencere ışığı 35° yükseklikte | 12 Kasım Paris'te güneşin en yüksek açısı ≈ 23.5° (enlem 48.85°, sapma −17.6°). Tours, Kasım sonu: ≈ 22° [T, elle hesap]. 35° doğrudan güneş olamaz | Güneş **18°** [T]. Gölge boyu = **3.08 × yükseklik**. Uzun gölgeler kompozisyona göre yönlendirildi (3v2.4) |
| Soğuk tek renk (tasarım §1.4: `#b9b3a2` duvar, `#5e4f40` masa) | A/V3 dersi: sıcaklık, açık sıcak yüzlerin azlığından düşer | §13/§14 dili: **ışık alan yüz gül-krem, gölge mavi-mor**. Işık önden-soldan gelir, kameraya bakan yüzler aydınlanır (p95 L\* yükselir) |
| Düz vektör çıkartma (V3: güvercin) | Tarama, iç çizgi ve kenar ışığı yok | Masa damarı, kutu ve terazi gravür dilinde (3v2.7). Kuş V4 `Guvercin`'den aynen alınır |
| Kutu kadraja sığmıyor, çekmece kadraj dışında | 0.28 m'lik kutu bu yakın kamerada x 426–1184'e taşar (v1 hesabı tabanı ölçmüştü, üst yüzü değil) | Kutu **0.24 × 0.20 × 0.18 m** [T]. **Çekmece ön yüzün sol altında**, kameraya doğru kayar |
| Terazinin uzun gölgesi kutunun üstüne düşer | Işık soldan gelince terazi kutunun önünde kalıyordu | Terazi **geri-sola** (masa Y 0.79 m, kutunun arkası) alındı. Gölgesi kutunun arkasından geçip duvar dibine tırmanır |
| Kafes gökü "dijital basamak" riski (B2 #3) | Sert yatay bant | B3'te kabul edilen `GokBasamak` taramalı geçişi aynen kullanılır |

### 3v2.1 Referans tarifi (kamu malı dönem gravürü dili; gözle kontrol edilmedi, [G])
- **Fotoğraf atölyesi gravürleri, 1860–1870'ler** (L'Illustration, Le Monde illustré, *Les Merveilles de la science* tipi sayfalar) [G]:
  - Masa üstü ve alet tek pencereden gelen yan ışıkla modellenir.
  - Ahşap, uzun paralel damar çizgisiyle verilir. Gölge yüzleri tek yönlü sık taramayla koyulaşır.
  - Kâğıt ve cam kâğıt beyazı kalır. Tek ince kenar çizgisi alır.
  - Arka duvar sade bırakılır: bir raf, birkaç kutu, dikey dizili cam levhalar.
  - Metal düz koyu tondadır ve ışık tarafında tek ince parlak çizgi taşır.
- **Bizim çevirimiz:** onaylı hedeflerin dili. Sınırlı palet (gül-ışık / mor-gölge), net kontur, eşit aralıklı ince tarama, düz ton alanları, saf siyah yok. Tarama yalnız 3v2.7'deki yerlerde.

### 3v2.2 Mimari ve iç mekân kartı
| Madde | Paris atölyesi (P05) | Tours bürosu (P09) | Taşra iniş yeri (P04b `kafes`) |
|---|---|---|---|
| Kaynak durumu | Dagron Paris'te fotoğrafçı, mikrofilm yöntemi [A §3, UCLA]. Atölyenin yeri ve görünüşü **kaynaksız** [A §5.4] | Tours'ta mesajlar fotoğraflanıp filme çekildi [A: MICRO, UCLA]. Büronun yeri ve görünüşü **kaynaksız** | Güvercinler balonla dışarı taşındı [A §3]. İniş yeri ve görünüşü kaynaksız. P07'deki Niépce inişiyle **eşlenmez** (genel bir iniş) [T] |
| Karar | Nötr fotoğrafçı çalışma odası [G]. İşlev okunur, bina okunmaz | Nötr büro. Şehir yalnız duvar taşıyla okunur (f0'da) | Düz kış tarlası + çıplak ağaç/çit sırası [T] |
| Yapı / oda | Oda kadrajda görünmez. Görünen yalnız masa ve arka duvarın alt 0.6 m'si | Aynı | Açık arazi |
| Duvar | **Kireç badana**, cam negatif rafıyla birlikte. Raf: arka duvarda masa üstünden 0.35 m yukarıda, ahşap konsollu tek tahta. Üstünde **dikey dizili 7 cam levha** (kenarları ince açık çizgi) + 2 kapalı ahşap kutu [G: dönem fotoğraf atölyesinde cam negatif rafı yaygın; Dagron'unki doğrulanmadı]. Gerekçe: P10'daki cam levhanın kurulumu (kurulum → karşılık). Dokunuş taşımaz | **Çıplak tuffeau iç duvar**: derzli kesme taş, blok 0.55 × 0.30 m, düz yatay sıra, derz 3 px. Sol üstte tuffeau pencere sövesinin içe dönük yanağı (ébrasement) görünür. **Kemer yok**, düz lento (§0.4) [G: tuffeau Tours'un yapı taşı, genel bilgi; büronun iç yüzeyi doğrulanmadı]. Gerekçe: CLAUDE.md'deki Tours imzası, Paris badanasından ilk karede ayrışır. `pencere: tours` / lucarne **kullanılmaz** (Chappe T okutur, §9) | — |
| Masa | Ağır ahşap çalışma masası. 4 tahta, **tahtalar soldan sağa** (damar yatay), tahta eni 0.22 m, derz 3 mm. Ön kenarda 0.04 m pah ve aşınma bandı. Masa arka kenarı duvara dayalı (masa Y 1.207 m, ekran y 627) | **Aynı masa** (tasarım §9.5) + **koyu keçe altlık** (sumen) 0.45 × 0.32 m [T, tur-3 kararı]. Mektup yığını solda, şerit yığını sağda | Masa yok. Sepet hasırı alt üçte biri doldurur |
| Pencere (ışık kaynağı) | Kameranın arkasında, sol-önde. **Kadrajda görünmez.** Işığı masada ve duvarda bir pencere yamuğu olarak okunur | Aynı geometri (aynı masa düzeni) | Güneş sol-önde, kadraj dışında |
| Kameradan görünen | Göz masanın 0.42 m üstünde, 35° aşağı. cs 1'de duvar y 0–627 (üst üçte bir). cs ≥ 1.5'te duvar kadrajdan çıkar. Tavan, oda köşesi ve pencere hiçbir karede görünmez | f0 (cs 1.6, cy 0): duvar dekor y 360–627 → ekran 0–427. f24'ten sonra (cs 2.0, cy −120) duvar yalnız ekran 0–174'te (UI bandı) | Göz 1.15 m, ufuk y 1000. Toprak yalnız ince şerit. Gök büyük alan |

### 3v2.3 Masa koordinatı ve ölçek (v1 kamerası aynen)
- Masa düzlemi: X sağa, Y kameradan ileri (m), orijin kameranın masa üstündeki izdüşümü. Kadrajın alt kenarı Y 0.119 m (görünen genişlik 0.31 m). Ekran merkezi Y 0.60 m. Arka kenar Y 1.207 m (genişlik 1.13 m).
- Yatay ölçek (cs 1, dekor): y 700 → 1099 px/m · 900 → 1489 · 1000 → 1684 · 1180 → 2035 · 1250 → 2172 · 1360 → 2386 · 1480 → 2620 · 1700 → 3049. v1'deki `s(y) = 1.966·(y − 137)` yaklaşımı ±2 % içinde geçerli.
- **Yüksek nesneler kameraya çok yakındır** (göz 0.42 m). 0.18 m'lik kutu kamera yüksekliğinin %43'ü, üst yüzü belirgin büyür. Her nesne 3B kutu olarak izdüşürülür. Sabit 2B ölçekle çizilmez.

### 3v2.4 Işık: tek vektör `ISIK_YON.atolye` (P05 ve P09 ortak)
| Öğe | Değer |
|---|---|
| Kaynak | Kış güneşi, pencereden, **yükseklik 18°** [T, ≤ 23° sınırı]. Kameranın sol-önünden, masaya doğru |
| Işığın yönü (kaynaktan sahneye, masa koordinatı) | yatay bileşen (cos 40°, sin 40°) = (0.766, 0.643), yani **sağa ve masanın derinliğine**. `L = (0.729, 0.611, −0.309)` |
| Gölge | Nesne başına `gölge = h × 3.08 × (0.766, 0.643)` masa düzleminde. Arka kenarı aşan gölge duvarda yükselir (duvar Y 1.207). Ekranda gölge **sağ-yukarı** gider: ölçü bölgesinde yön ≈ (+0.84, −0.55) |
| Işık alan yüzler | **Kameraya ve sola bakan** yüzler: kutunun ön ve sol yüzü, mercek tüpünün önü, terazi direği ön yüzü, sayfanın üstü, elin sırtı (kameraya bakan), kuşun ön-sol yüzü, kılıfın ön yüzü (P09). Masa üstü ışıkta |
| Gölgede kalan | Kutunun sağ yüzü (kadraj kenarında), terazinin sağ yüzleri, nesnelerin sağ-arkası |
| Pencere yamuğu (duvarda) | Duvar ışıkta. **Sol-üst köşede pencerenin sol sövesinin gölgesi** diyagonal bir koyu kama düşürür: ekranda (0, 0)–(300, 0)–(0, 420) üçgeni gölgede. Raf bu gölge kamasının içindedir (raf altı tarama, 3v2.7). Yamuk kenarı net, gradyan yok |
| Hesaplanan gölge uçları (cs 1, dekor) | terazi direk tepesi (h 0.30) → (≈ 920, 560) duvar dibinde 0.07 m tırmanır · kutu üst ön-sol köşesi → (≈ 1200, 750), kadraj dışı · parmak (h 0.015) → (633, 1202): 4.6 cm kısa gölge · el sırtı (h 0.05) → masa üstünde 15 cm, sağ-yukarı |
| **Sonuç** | (1) Ölçü bölgesi (560, 1250), sayfa ve şerit tam ışıkta ve hiçbir gölge onların üstüne düşmez. (2) Elin gölgesi sağ-yukarı, eylemden uzağa düşer. (3) Terazinin gölgesi kutunun **arkasından** geçer ve duvar dibinde ince bir siluet olarak kalır. Kefe indiğinde (f36) gölge de iner: dokunuşu destekler, bedava süreklilik |
| Kenar ışığı | `#f0c4a8`, 2–3 px, **sol ve üst** kenarlar (kuş, el, kutu kapağı, terazi kolu). Gölge kenarı `#3e3446` net |
| Pencere ışığı rengi | Yüzey ışık tonları 3v2.6. Işığın kendisi çizilmez (huzme, toz yok; huzme yalnız LANTERN-ODA'da) |
- P04b `kafes`: `ISIK_YON.gunMontmartre` (§14.1) aynen. Güneş sol-önde, uzakta. Çubuk gölgeleri kafes tabanında **sağa ve kameraya** düşer. Kenar ışığı sol/üst.

### 3v2.5 P05 yerleşimi (Paris atölyesi) ve anahtar an ölçüleri
| Öğe | Masa (X, Y) m | Ölçü | Ekran (cs 1, dekor) | Not |
|---|---|---|---|---|
| Terazi (kaide teması) | **(−0.16, 0.79)** | kol 0.35 m, direk 0.30 m, kefe ø 0.18 m, kefe yüksekliği 0.10 | taban **(330, 780)**. Kol x ≈ 105–555, y ≈ 425. Kefeler y ≈ 665. Direk tepesi y ≈ 345 | v1 (380, 1000) → geri-sol. Kefe sol x ≥ 90 (yan güvenli alan). Kuş sağ kefede: gövde 0.32 m ≈ 410 px, tepe y ≈ 370 (**kuş %21** ✓) |
| Kefe deste | sol kefede | 8–10 sayfa, kalınlık görünür | (≈ 105–330, 600–665) | — |
| Mektup destesi (sayfa kaynağı) | (−0.085, 0.289) | 0.21 × 0.27 m | **(330, 1400)** (v1 aynen) | ışıkta |
| **Mercekli kutu** (taban merkezi) | **(0.15, 0.55)** | **0.24 × 0.20 × 0.18 m** [T] | taban (795, 1009). Kapsayan kutu x 586–1167 (sağ kenar kadraj dışında), y 651–1126. Mercek tüpü ön yüz ortası ≈ (856, 986) | Kutunun sağ ucu kadraj kenarında kesilir: derinlik verir, bilgi taşımaz. **Kefe sağ kenarı ile kutunun üst-arka kenarı arasında ≥ 20 px ekran boşluğu** olmalı; yoksa terazi 10 px yukarı (geri) alınır |
| Çekmece | kutunun **ön yüzü, sol alt** | 0.10 × 0.04 m yüz | yüz ≈ (600–760, 1060–1110) | Kameraya doğru (+y) 0.08 m kayar. El sağdan gelir, ön yüzden çeker. Şerit çekmeceden ölçü bölgesine 0.15 m'lik yol alır |
| Sayfanın konduğu yer | (0.02, 0.40) | 0.21 × 0.27 m | merkez ≈ (580, 1190) | kutunun önü, tam ışıkta |
| Işık hattı (küçültme anı) | kutu ön yüzü, mercek altı | 4 px yatay | y ≈ 1100 | renk 3v2.6 (L\* tavanı) |
| **Ölçü bölgesi** (parmak + şerit) | (0.009, 0.367) | parmak 7.5 cm, şerit 6.4 cm (×1.6) 52° | **(560, 1250)** (json kilidi, değişmez) | — |
- **Anahtar an P05 (PK-D5), ekranda:**
  | Kare | cs / cx / cy | Öğe | Ekran ölçüsü | Ölçüt |
  |---|---|---|---|---|
  | f36–100 (terazi) | 1.0 / 0 / 0 | kuş + kefe | kuş ≈ 410 px (%21), kefe ø ≈ 210 | ≥ %10 ✓ |
  | f160–182 (sayfa) | 1.35 / −60 / −250 | sayfa | ≈ 575 × 330 px (genişliğin %53'ü, yüksekliğin %17'si) | ≥ %10 ✓ |
  | **f268–358 (ölçü, tutma 1.5 sn)** | 2.0 / −40 / −610 | parmak / şerit / el | parmak **328 px (%17)**, şerit **280 px (%14.6)**, merkez **(540, 930)**. Elin görünen kısmı ≥ 400 px | ≥ %10 ve el ≥ %12 ✓, net 1.5 sn ✓ |
  - f268'de kutunun ön-sol alt köşesi ekranda ≈ (616, 682)'dir. Şeridin üst ucu (≈ 650, 820) ile arasında 138 px boşluk var ✓.
  - Alt bant (1290–1490): f268'de masa damarı ve parmak gölgesi. Ölçü (540, 930) altyazı bandının üstünde ✓.
  - Ekran yazısı (240–400, f112–360): f112–150 arasında terazi direk tepesi (y ≈ 345) banda girer. Push-in f118'de başladığı için ≤ 0.6 sn. Yönetmen ya yazıyı f150'de başlatır ya da `lint.izin` yazar.

### 3v2.6 Palet (hex; L\*/C\*/h° elle, D65; kılıfa ΔE76 hepsi ≥ 46) — tasarım §1.4'ün yerine **öneri** (sahibi tasarımcı, 3v2.10)
| Yüzey | Işık yüzü | Orta / gölge | Derin / çizgi | Not |
|---|---|---|---|---|
| Masa ahşabı | `#a07c64` (55/21/60°) | gölge `#5a4a5a` (34/12) | damar ışıkta `#6e5448`, gölgede `#3e3446` (23/13) | ön kenar aşınma bandı `#b58f74` (62/23) |
| Badana duvar (Paris) | `#e6d3c0` (86/12/73°) | söve gölgesi kaması `#9c94ae` (63/15) | tarama `#6d6384` | — |
| Tuffeau duvar (Tours) | `#e3d6c2` (86/12/84°) | gölge `#a6a0b8` (67/14) | derz ışıkta `#c4b0a8`, gölgede `#7d7599` | tuffeau "beyaz" Paris badanasından daha sarımsı-açık; gül değil |
| Raf / konsol | `#b4937a` | `#7a6460` | `#4a3f46` | |
| Cam levhalar (rafta) | kenar çizgisi `#d8ccbc` 2 px | yüz `#8a8494` | — | yeşil cam yok |
| Mektup sayfası | `#e8d8c4` (87/12/79°) | gölge `#a9a0b8` | satır ışıkta `#7a6458` | tasarım `#e4dfd0` ışıkta ısınır |
| Film şeridi | ışık geçen kenar `#8a7466` | yüz `#5a5048` (tasarım) | mikro çizgi `#3e3446` | bal ışığı yok (§2.4) |
| Kutu ahşabı | ön ve sol yüz (ışıkta) `#b4937a` (63/20/64°) | sağ yüz ve kapak altı `#7a6460` | derin (çekmece içi) `#4a3f46` | demir köşe bandı `#3a3d42`, ışık çizgisi `#8a8494` 1.5 px |
| Mercek camı | `#b9c4d6` (79/10, soğuk) | çerçeve `#3a3d42` | hilal `#e2dccf` (88) | tasarımın `#f6f2e2` hilali L\* 95: §13.3 tavanını (≤ 88) aşar |
| Işık hattı | `#e4dccb` (88/9) | — | — | tasarım `#f6f2e2` (L\* 95) yerine. Ya bu ton ya `lint.izin L_ustu_88` (açık soru) |
| Terazi çeliği | `#8a8494` (56/10) | `#4e4a5e` (33/13) | — | kaide ahşap = kutu tonları. Sarı metal yok |
| Keçe altlık (Tours) | `#4a4a5c` (32/11) | kenar `#3a3550` | — | tasarım `#4a4e54`'ün mor tonlu karşılığı |
| Dagron eli | ten `#c9a58a` (70/21) + sol/üst kenar `#f0c4a8` | ten gölgesi `#8e6a52` | manşet sepya `#4a3a2c` | tasarım §3.2 aynen |
| Güvercin | §13.1 + V4 `Guvercin` | | | kenar ışığı sol-üst |
| Kılıf (P09) | `#F0B43C` | `#C98F26` | | §2.2 aynen. Sahne C\* tavanı 23 (masa kenarı) → oran 67 / 23 = **2.9** (≥ 2.3 ✓) |
- **Sahne kuralları:** kılıf dışı C\* ≤ 28 ✓ (en yüksek `#f0c4a8` 23, `#b58f74` 23). L\* ≤ 88 ✓. Hue 74° üstünde C\* > 22 yüzey yok ✓ (tuffeau 84° ama C\* 12). Kırmızı bandı 0.
- **P04b `kafes`:** §14.2 sabah paleti aynen (gök 5 basamak, toprak `#c8ae98` / gölge `#8f8aa8`). Çit/ağaç bandı `#5f5470` (38/18), sol kenar ışığı `#f0c4a8`. Kuş gövdesi `#8a8796` (L\* 57) bu koyu bandın önünde: ΔL ≈ 19 ✓. Kafes tasarım §4.3 tonları yerine sandık tonları (§14.2): çerçeve ışık `#b4937a` / gölge `#7a6460`, çubuk `#4a3f46`.

### 3v2.7 Doku ve tarama (yüzey başına ≤ 3 katman, seed `dagronMasa: 163`, kaynamaz)
| Yüzey | 1. taban deseni | 2. tarama (θ = 143° v1, ışığa dik; yalnız burada) | 3. kâğıt |
|---|---|---|---|
| Masa | Tahta başına 3–5 uzun damar çizgisi, **2.5 px** (cs 1), α .45. Damar, tahta ucuna doğru inceliyor; 1 budak (sağ tahta). Derz 3 px `#3e3446` | Yalnız **cisim gölgelerinin içinde**, damar yönünde değil, 143°'de, 2 px / 7 px aralık. Gölge kenarı net | `ArsivKatmani` `gunduzMineral`. B3 ölçütü: duvar ve masa C\* ≥ hedefin %85'i. Tutmazsa `litografi` modu |
| Badana / tuffeau | Paris: düz + 2 kabarma lekesi α .06. Tours: blok derzleri, 2 sırada bir değil **her sıra** (yakın sınıf) | Yalnız söve gölgesi kamasının kenarında 40 px'lik şerit + raf altı | aynı |
| Kutu | Ahşap damarı **dikey** (kutu tahtaları dikey, masadan ayrışsın) | **Sağ yüz** (II) ve çekmece içi (IV, ≤ 60 px) | aynı |
| Terazi | düz | Direk ve kaidenin sağ yüzü (II) | aynı |
| Sayfa / şerit | Dil-nötr dalgalı satırlar (tasarım §4.7) | yok | lif |
| Kafes (P04b) | çerçevede dikey damar. Çubuk 6 px, aralık ≥ 40 px, **yatay tel yok** | yalnız çerçevenin sağ yüzü | aynı |
| Gök (P04b) | B3 `GokBasamak` taramalı geçiş (sınır altında kesik yatay çizgi, aşağı indikçe incelir) | — | — |
- **360 px kontrolü:** damar ve tarama çizgisi 360'ta ≥ 0.8 px (cs 1'de 2.5 px → 0.83 ✓; cs 2'de büyür). İnce zincir (terazi) 3 px + 14 px halka (tasarım §4.5).
- **Yasak:** geniş yüzeyde (masa üstünün ışıklı alanı, duvarın ışıklı alanı, sayfa) tarama yok. Çapraz tarama yalnız çekmece içinde.

### 3v2.8 P09 Tours (PK-D6) ve P04b kafes (PK-D4): yerleşim ve okunurluk
**P09** (kamera json'daki gibi; değişiklik yok):
| Öğe | Dekor (cs 1) | f0 ekran (cs 1.6, cy 0) | f24+ ekran (cs 2.0, cx −40, cy −120) |
|---|---|---|---|
| Kılıf merkezi (kuş avuçta, masadan ~5 cm) | (540, 1000) | (540, 1024) | **(500, 920)**, boy **278 px (%14)** ✓ |
| Keçe altlık | x 330–750, y 900–1250 | x 204–876, y 864–1424 | x 80–920, y 720–1420: kılıfın arkası koyu zemin ✓ |
| Mektup yığını | **(290, 1180)** (v1 220 → 290: f0'da kadraja girsin) | x ≈ 140 | kadraj kenarında |
| Şerit yığını | (820, 1200) | (988, 1344) | (1060, 1320), kenarda kesik |
| Tuffeau duvar | y 360–627 | ekran 0–427 (yazı bandının arkası sakin, derzler seyrek) | UI bandında |
- Işık 3v2.4: kuş ve elin gölgesi keçe üstünde sağ-yukarı. Kuş f196'da sağa çıkarken gölgesi de kadrajdan çıkar. Kılıf ön yüzü ışıkta, spekülar hilal sol-üstte.
- Eller: sağ el kuşu tutar (sepya manşet, sağdan girer). Sol el ipi sarar. Elin görünen kısmı ≥ 230 px ✓ (cs 2.0'da 0.19 m ≈ 640 px).
- Ölü alan: üst = duvar (f0) / kuş göğsü ve el (f24+). Orta = kılıf. Alt = keçe kenarı, şerit yığını, gölgeler ✓.

**P04b `kafes`** (v1 §3.4 aynen geçerli; değişenler):
- Gök: §14.2 basamakları, ufuk y 1000'e ölçekli, `GokBasamak` taramalı geçiş. Sol alt ufukta ışıma, kenarı düzensiz çizgi (B3).
- Çöken küre: `Balon {durum: "coker"}`, §14.2 kumaş paleti. Terminatör sol-üst ışıkla; kumaş kıvrım taraması §2v2-H2.4.
- Kafes: x 300–780, y 820–1180. Kuş tünekte. cs 1.5'te kuş **576 px (%30)** ✓, kapak ≈ 240 px ✓, yön arama f166–226 net 1.0 sn ✓.
- Sepet: `Sepet` (Montmartre modülü, hasır yatay sıraları). Rim y 1180. Hasır alt üçte biri doldurur.
- Arka plan: tarla şeridi `#c8ae98` / uzun gölgeler `#8f8aa8`. Çit/ağaç bandı Z 15 m, y 865–1115, `#5f5470`. Ağaçlar `CiplakAgac` (Montmartre), 3 tane, farklı boy (seed). Eşit aralık yok (V3 ızgara dersi).

### 3v2.9 Motion için çizim notları
- **Şablon:** yeni `src/kit/sablonlar/paris/DagronInsert.tsx`. Görünümler `masa` (`mekan: paris-atolye | tours-buro`) ve `kafes`. MASA-INSERT'ten **yalnız** `KolEl`, `izdusum`, el gölgesi (`elYukseklik`) mantığı alınır. MASA-INSERT'in duvarı, kemeri, lucarne'ı ve `pencere: tours` seçeneği **alınmaz** (Tours lucarne'ı Chappe T'sini okutur).
- **Yeni ortak modüller:**
  - `MasaPerspektif {F 1176, H 0.42, egim 35} → proj(X, Y, h)`. Bütün nesneler 3B kutu olarak izdüşürülür.
  - `GolgeIzdusum {L, masaY 1.207}`: masa + duvar düzlemine kırpılı. Kutu, gölgenin üstüne çizilir (örtme).
  - `CamLevhaRafi {adet 7, seed}`: aynı levha P10 lantern yuvasında kullanılır.
  - `TuffeauDuvar {blok 0.55×0.30, ebrasman: true}`: Tours. Sonraki Loire bölümleri için genel.
- **Dagron eli:** `KolEl` içinde `parisManset` tipi **kullanılmaz**: o tipte altın düğme var (`dugme #d4ad52`), sarı metal yasağına aykırı. Yeni tip önerisi `dagronSepya {manset #4a3a2c, mansetKir #2e2318, ten #c9a58a, tenGolge #8e6a52, kol #5a5068, dugme yok}` (tasarım §3.2 + §14.2 palto tonu).
- `Guvercin` V4 sürümü aynen (gravür tüy taraması, kenar ışığı kontura yapışık). Kılıfsız: P04b, P05. Kılıflı: P09.
- Kontrol kareleri: P05 f36, **f182** (ışık hattı), **f280** (ölçü); P09 **f150**; P04b **f206**. 360 + güvenli sürüm. Hareket şeridi: P05 f118–268 (el yolu), P09 f0–206.

### 3v2.10 Tasarımla çelişki ve gerekçe (tek sahiplik: tasarim.md'yi tasarımcı günceller)
1. **Pencere ışığı 35° → 18°**: fiziksel zorunluluk (Kasım güneşi ≤ 23°).
2. **§1.4 paleti → 3v2.6**: §13/§14 dilinin iç mekân karşılığı. "Soğuk tek renk" dersi.
3. **Kutu 0.35 × 0.28 × 0.25 → 0.24 × 0.20 × 0.18 m, çekmece önde-sol altta**: kadraja sığma ve çekmecenin görünmesi.
4. **Işık hattı ve mercek hilali L\* 95 → 88**: §13.3 tavanı. Alternatif: `lint.izin`.
5. **Tours duvarı badana → tuffeau [G]**: şehir okunurluğu. İstenmezse badana (`#e6d3c0`) kalır, Tours yalnız keçeyle ayrışır.
6. **KolEl `dagronSepya` yeni tip**: `parisManset`'teki altın düğme yasak.

---

## 4v2. KE-PK-S4 LANTERN-ODA v2 — GEÇERLİ (C turu, tur-14; P10b f60–398, görünümler `oda` + **`kapi` [yeni]**)

Girdi: §4 v1 (arşiv), tasarım §1.5 / §3.1 / §3.3 / §4.9–4.10 / §13, `bolum.json` P10 `devam_plan`, `arastirma.md` §3 ("film cam levhaya yerleştirilir, magic lantern ile duvara yansıtılır, memurlar kopyalar" [CDM]), §5.4 (cihaz ve oda kaynaksız, oda yeri belirsiz). v1 geometrisi (F 2600, göz 1.6 m, arka duvar Z 2.95 m, 881 px/m, ufuk y 1204, perde x 12–1068 / y 412–1468, mercek (150, 1529), memurlar Z 2.2) **aynen geçerli**. Değişen satırlar aşağıda.

### 4v2.0 Teşhis → karar
| v1 | Sorun | v2 kararı |
|---|---|---|
| Okuyana ulaşmak için cs 1→1.7 ile birlikte **cx −1345 pan** (f250–290, 40 kare, ≈ 31 px/kare) | Karanlık duvar üzerinden hızlı zoom-pan, whip gibi okunur. Whip bütçesi (P01, P07) dolu. Perde kadrajdan kaçarken PK-D7'nin net anı (f204–270) kesilir | **Plan içi kesme f266 → yeni görünüm `kapi`** (aynı dünya, ikinci kamera; §2v2 yöntemi). Kesme hareket bitince gelir: memur-3 sağdan kadrajı terk eder, `kapi`'da eli soldan girer (yön sürekliliği) |
| Kapı ışığı soğuk gri-mavi (tasarım §1.5 `#aab4bc`) | Tüm oda soğuk: "soğuk tek renk" dersi. Doruk ("Paris mektuplarını okudu", müzik notu "en sıcak ve yavaş") soğukta kalır | **Sıcak gün ışığı koridoru** `#e8cdb6`. Lantern soğuk (kireç yeşilimsi) ↔ kapı sıcak. Okuma anı filmin en sıcak karesi olur (gerekçe 4v2.9) |
| Huzme düz alfa poligon (dijital çıkartma riski). Kenar 2 px (360'ta 0.67 px) | Gravürde ışık demeti **ışınsal ince çizgilerle** çizilir | Huzme = kaynaktan çıkan ışınsal çizgi demeti + çok hafif dolgu. Kenar 3 px |
| Memur siluetleri düz leke (kukla figür, B2 #2) | — | §2v2-H2.8 gravür figür dili (kontur + iç çizgi + kenar ışığı). Başlık yok (iç mekân), saç kütlesi |
| Kapı söveleri X 0.70–0.80 | `kapi` görünümünde kâğıt kapının parlak açıklığının önüne düşer: krem önünde krem, okunmaz | **Kapı 0.10 m sağa**: söve X 0.80–0.90, açıklık **X 0.90–1.80**, sağ söve 1.80–1.90. `oda` görünümünde zaten kadraj dışında |

### 4v2.1 Referans tarifi ([G], gözle kontrol edilmedi)
- **"Projection and expansion of microscopic records during the Paris siege"** başlıklı dönem gravürü [A §6: varlığı; içerik **gözle kontrol edilmedi**]. Aşağıdaki tarif, 1870–1880 bilim dergilerindeki (La Nature, *Les Merveilles de la science*, ILN) projeksiyon sayfalarının bilinen genel dilidir [G]:
  - Karanlık salonda **solda sehpa üstünde lantern**. Ondan büyük, açık bir dikdörtgene uzanan **düz, yakınsayan çizgiler** (ışık demeti) var.
  - Perdenin altında bir sırada masaya eğilmiş, yazan figürler oturur. Başları ve omuzları perdeye karşı siluettir.
  - Karanlık alan, düz koyu ton ile birlikte figürlerin üstünde sık tarama olarak verilir. Perde kâğıt beyazıdır ve üstünde ince satır çizgileri vardır.
- v1 kompozisyonu (lantern sol-alt, perde ortada, memur başları alt sırada) bu dille zaten örtüşür. v2, çizgi kalitesini bu dile taşır.

### 4v2.2 İç mekân kartı (v1 §4.2'nin yerine geçen satırlar)
| Madde | Değer |
|---|---|
| Kaynak durumu | Duvara yansıtma ve memurların kopyalaması [A: CDM, MICRO]. Oda yeri (merkez postane / Hôtel de Ville) belirsiz [A §5.4]. Cihaz gövdesi ve ışık kaynağı kaynaksız (tasarım G9) |
| Karar | Nötr resmî büro odası. Süs yok: pilastr, kartonpiyer, avize, tabela, arma yok. Bina okunmaz, işlev okunur. Pencereler **kepenkli, kadraj dışında** (oda gündüz karanlık; neden: yansıtma) [T] |
| Oda | 6 × 5 × 3.6 m [T]. Arka duvar badana. Duvarın alt 0.9 m'si **ahşap lambri** (yalnız `kapi`'da görünür, düz panel, çıtası 1 çizgi) [G: dönem resmî iç mekânında yaygın, nötr] |
| Perde | Arka duvarın 1.2 × 1.2 m bölümü (v1). Çerçeve, çıta, çarşaf yok |
| Kapı | Arka duvarda, perdenin sağında. **Söve X 0.80–0.90, açıklık X 0.90–1.80, h 0–2.20**, düz lento (`duz`), söve 0.10 m, kasa koyu. Kapı kanadı içe açık, sağ söveye dayalı (yalnız kenarı görünür) |
| Koridor (kapı dışı) | Z 2.95–5.0, gün ışığı alan düz duvar. Pencere görünmez. Koridorun ışığı kapı sövelerinin iç yüzlerine (ébrasement) ve eşikteki figürlerin kenarına düşer, **odanın içine gölge düşürmez** (tasarım §1.1 sözleşmesi) |
| Mobilya | Uzun yazı masası Z 2.2 (memurlar, masa üstü 0.75 m, kadraj altında). Lantern sehpası Z 1.55–2.0 (sol). Sandalyeler görünmez |
| Figürler | 4 memur (oturan, sırttan, `yetiskin-a/b` karışık, gri manşet), memur-3 kalkar ve zarfı götürür. Kapıda 2 bekleyen (`yetiskin-a`, P01 pencere siluet tasarımı). **Okuyan** = bekleyenlerden biri (`yetiskin-b`) |
| Kameradan görünen (`oda`) | v1 aynen: göz 1.6, F 2600 (tele), zemin ve tavan görünmez, memurlar baş-omuz, kapı kadraj dışında |
| Kameradan görünen (`kapi`) | Göz **1.25 m**, kamera (X 1.00, Z 1.15), Z eksenine paralel, eğim yok, **F 2000** (dekor = cs 1), ufuk y 960. Zemin görünmez (eşik y 2349). Kapı lentosu kadraj üstünde (y −96). Perdenin sağ kenarı soldaki ince şeritte |

### 4v2.3 Işık (tek kaynak + ikincil kapı)
| Kaynak | Tanım | Etki |
|---|---|---|
| **Lantern** (anahtar, odada gölge veren tek kaynak) | Mercek noktası dünya (−0.30, h 1.35, Z 2.0) → `oda` ekranı **(150, 1529)**. Koni = mercek noktası ile o anki yansıma dikdörtgeninin dışbükey zarfı | Perde ışığı. Memurlar huzmenin altında kalır (v1: huzmenin alt kenarı bu derinlikte ≥ 1.30 m) → perdeye gölge düşmez. Gövdenin havalandırma yarıklarından 2 ince ışık çizgisi (huzme tonunda, gövde kendi ışığını taşır; alev görünmez) |
| **Perde** (ikincil, yansıyan) | Lambert dolgu, gölgesiz | Duvarda perde çevresinde 120 px'lik ikinci ton halkası (v1). Memurların baş/omuz **üst ve yan kenarlarında** 2 px soğuk kenar `#d9d9cf` α .45. `kapi`'da okuyanın sol yüzleri ve kâğıdın ön yüzü (kâğıt perdeye dönük tutulur) |
| **Kapı** (ikincil, gün) | Koridor duvarı `#e8cdb6`. Yönü: arkadan (+Z'den), kameraya doğru | Yalnız kapı çevresi: söve iç yüzleri `#c9a998`, eşikteki figürlerde **sağ/üst sıcak kenar** `#f0c4a8` 2–3 px. Odaya ve masaya ışık havuzu düşmez (zemin görünmez, gerekmez) |
- **`kapi` görünümündeki ışık okuması:** okuyan, kâğıdı **perdenin ışığına doğru kaldırarak** okur. Gerekçe: oda karanlık, tek okunur ışık perdeden gelir. Böylece kâğıt soğuk-açık, kenarları sıcak. Eller kâğıdın önünde koyu siluet + sıcak sağ kenar ışığı olarak okunur. Telefonda koyu parmak açık kâğıdın üstünde en net şekildir.

### 4v2.4 `oda` görünümü (f60–266) — v1'den değişenler
- **Huzme (gravür):**
  - Kaynaktan (150, 1529) perde dikdörtgeninin kenarlarına giden **4 sınır ışını**: 3 px, `#e4ecd8` α .55, net (v1'deki 2 px 360'ta 0.67 px'e düşüyordu).
  - İçte **ışınsal ince çizgiler**: kaynaktan perdeye, açısal aralık 2.5°, 2 px, α .20. Kaynağa yaklaştıkça çizgiler birleşir, ayrı çizgi okunmaz; orada dolgu artar.
  - Dolgu α .10 (v1 .30 → düşük; demeti çizgiler taşır).
  - Toz: 6–8 nokta, 3–5 px, yalnız kama şeridinde. Seed 167, konum kareye bağlı deterministik.
  - Büyüme (f112–204): ışın açıları perdenin o anki dikdörtgeninden **her karede yeniden hesaplanır**. Fade yok, demet geometrik büyür.
- **Perde içeriği:** P05'teki **aynı sayfa** (tasarım §4.7, dalgalı satırlar, dil-nötr). Gerekçe: D5 ↔ D7 aynası; izleyici küçülen sayfanın büyüdüğünü görür. Bulanık → net: tasarım §4.9 (3 kopya, ±14 px).
- **Memur-3 kalkar:** f250 ayağa kalkar (baş y 1618 → 1086), zarf elinde. f250–266 sağa yürür ve **f266'da kadrajın sağ kenarından çıkar** (duvarsız kenar ✓). Kesme bu karede.
- **Memurlar yazar f206–248:** eller kadrajda değil, yazma baş eğimi ve omuz ritmiyle okunur (her memur farklı faz, 3–4 küçük omuz vuruşu). `pk-kalem` −14 dB ortam sesi gibi kalır (görünmeyen kaynak = kısık ortam; ses kuralı).
- **Ölçüler:** perde %55 (1056 px) ✓. **PK-D7 net f204–266 = 62 kare (1.03 sn)** ≥ 1 sn ✓. Kesme f270 yerine **f266**'dadır; json `okunurluk.net_sn` 1.1 → 1.03 olur.
- Ölü alan: üst üçte bir = karanlık duvar + perde üstü (v1 kabul). Alt üçte bir = perde alt satırları, memur başları, lantern ✓.

### 4v2.5 `kapi` görünümü (f266–398) [yeni] — kamera (X 1.00, h 1.25, Z 1.15), F 2000, ufuk y 960
| Öğe | Dünya (X, h, Z) | Ekran (cs 1) | Not |
|---|---|---|---|
| Perde sağ kenarı | X 0.60, h 1.3–2.5, Z 2.95 | x 0–96, y −429…904 | Soldaki parlak dikey şerit, aynı odada olduğumuzu söyler |
| Karanlık duvar + lambri | X 0.60–0.80 | x 96–318 | lambri üst çıtası h 0.9 → y 1349 |
| Sol söve | X 0.80–0.90 | **x 318–429** | koyu `#2a2838`, iç yüzü (ébrasement) `#c9a998` 12 px |
| Kapı açıklığı (koridor ışığı) | X 0.90–1.80 | **x 429 → kadraj sağı**, lento y −96 (kadraj dışı) | `#e8cdb6` düz; kenarda 30 px düşey tarama `#c9a998` (söve gölgesi) |
| **Okuyan** (`yetiskin-b`, 1.62 m) | gövde (1.15, —, 2.75), **sola dönük** (perdeye), yaw 30° kameraya | baş tepesi **(727, 585)**, omuzlar x 565–940, y ≈ 775, kalça y 1389 | Kapının parlak açıklığına karşı kontrajur. Baş öne-sola eğik |
| **Kâğıt** (mektup sayfası, açık) | merkez (0.82, 1.27, 2.64), perdeye dönük | **x 159–434, y 756–1119**, merkez (298, 933). ≈ 275 × 363 px (**%19**) | Arkasında karanlık duvar ve söve: açık kâğıt koyu zemin üstünde ✓ |
| **Okuyanın elleri** | kâğıdın iki yan kenarında | her biri **≈ 255 px (%13)** ✓ ≥ %12 | `KolEl parisGri`, 4v2.6 |
| Bekleyen-1 (`yetiskin-a`) | (1.55, —, 3.45), koridorda | baş ≈ (1018, 570), 870 px/m | okuyanın sağ omzunun arkasında, yarı örtülü. Sıcak kenar |
| Bekleyen-2 | (1.66, —, 3.75) | x ≈ 1090, kadraj sağında kesik | derinlik katmanı |
| Memur eli + zarf (f266–284) | soldan girer: (0.55, 1.22, 2.45) → (0.95, 1.25, 2.60) | x −152 → ≈ 300, y ≈ 990 | f272'de okuyanın sol eli zarfı alır. Memur eli **soldan çıkar** (f272–284) |
- **Eylem zamanları (json'daki kareler aynen):** zarf verilir **f272** (temas) · zarf açılır f276–296, temas **f290** (sağ el kapak ucunu `kistirSiki` ile kıstırır, kapak yukarı döner, sayfa çıkar) · sayfa açılır ve perdeye doğru kalkar f290–296 · **okuma f296–386** (baş eğik, 2 küçük satır-takip hareketi; 1.5 sn tutma) · f386–398 kapanış (kâğıt hafif iner; hareket tamamlanır).
- **Ölçüt:** kâğıt %19 ≥ %10 ✓, net 1.5 sn ✓. El ≥ %12 ✓. Kâğıt satırları dil-nötr. **Harf yok.** Arkadan gelen ışık yok (kâğıt saydam çizilmez).
- **Yazı bantları:** üst bant (240–400) koridorun parlak açıklığının ve karanlık duvarın üstüne düşer ("KOPYALANIP DAĞITILDI", f232–386). Okuyanın başı y 585, bantın altında ✓. Yazı katmanı açık zemin için koyu mürekkep stilini kullanmalı (yönetmen/teknisyen kontrolü). Alt bant (1290–1490) okuyanın palto gövdesi üstünde; eller ve kâğıt (≤ 1119) bantın üstünde ✓.
- **Ölü alan:** üst = koridor ışığı + perde şeridi + duvar. Orta = baş, kâğıt, eller. Alt = palto gövdesi: kontrajur koyu kütle, iç çizgi (palto önü, cep kapağı) + sağ yarıda 78° tarama (H2.8 figür dili). Ayaklar görünmez (kural dışı değil: zemin kadrajda yok).
- **Süreklilik:** perde şeridi (`oda`'daki perde) · memur-3'ün sağa çıkışı → eli soldan girer · bekleyenler P01 pencere siluetleriyle aynı tasarım (sahne planı açık soru 2'nin cevabı: "aynı kadraj" değil, "aynı siluet").

### 4v2.6 Paris eli uyumu (`KolEl parisGri`)
| Kullanım | Poz | `olcek` (EL_BOY_YEREL 140 ↔ 0.19 m) | Işık |
|---|---|---|---|
| P10a kılıf çözme (PARIS-CATI, V4 kabul) | `kistirSiki` | mevcut | gün, sol kenar `#f0c4a8` |
| `kapi` memur eli (zarfı uzatır) | `kistir` (zarf kenarı) | Z 2.45'te 1538 px/m → **≈ 2.09** | sol kenar soğuk `#d9d9cf` α .45 (perde), sağ kenar sıcak `#f0c4a8` |
| `kapi` okuyan, sol el (zarfı alır, kâğıt kenarı) | `kistir` | 1342 px/m → **≈ 1.82** | aynı |
| `kapi` okuyan, sağ el (kapağı açar f276–296) | **`kistirSiki`** (kapak ucu) | ≈ 1.82 | aynı |
- Palet `parisGri` aynen (ten `#d6b49c`, gölge `#8f7360`, manşet `#5d5f63`, tendon α .28, damar yok: V4 düzeltmesi). Bu ortamda ten ışık yüzü perdeye bakan sol yüzdür.
- **Ayrışma (tasarımcıya):** memur ve okuyan aynı karede iki `parisGri` el olur. Öneri: okuyanın kol (dış giysi) tonu `#2a2838`, memurun kolu `parisGri` varsayılanı `#34363d`. İkisinde de manşet kömür-gri kalır. Dagron'un sepyası hiçbir yerde yok ✓.
- Kılıf bu planda yok. Kâğıt `#d6d2c6` (84/7) kılıf bandına girmez.

### 4v2.7 Palet (hex; L\*/C\*; kılıfa ΔE76 ≥ 52) — tasarım §1.5'in yerine **öneri**
| Yüzey | Hex | L\* / C\* | Not |
|---|---|---|---|
| Oda en koyu | `#1e1d2c` | 12 / 11 | tasarım `#1b1d24`'ün mor tonlu karşılığı (§13 gölge ailesi) |
| Duvar karanlıkta | `#2e2c40` | 19 / 14 | |
| Perde çevresi yansıma halkası (2. ton) | `#4a4762` | 31 / 17 | 120 px, net kenar |
| Perde ışıkta | `#d9d9cf` | 86 / 5 | tasarım aynen |
| Huzme çizgi / kenar | `#e4ecd8` α .20 / α .55 | (yarı saydam, karışım L\* ≤ 60) | tasarım aynen, kireç yeşilimsi |
| Lantern gövde / kenar / sehpa | `#2f3238` / `#4a4d52` / `#4a3f33` | | tasarım aynen. Pirinç yok |
| Memur siluet / iç çizgi / kenar | `#3a3550` / `#2a2838` / `#d9d9cf` α .45 | 24 / 18 | §2v2-H2.8 dili |
| Kapı söve / söve iç yüzü | `#2a2838` / `#c9a998` | 17 / 11 · 72 / 16 | |
| **Koridor (gün, sıcak)** | `#e8cdb6` | 84 / 16 (h 68°) | tasarım `#aab4bc` yerine (4v2.9) |
| Eşik figürü sıcak kenar | `#f0c4a8` | 82 / 23 | §14.1 güneş kenarı |
| Okuyan / bekleyen palto | `#2a2838` / `#3a3550` | | |
| Kâğıt (perde ışığında) / satır | `#d6d2c6` / `#6d675a` | 84 / 7 | |
| Zarf / kapak çizgisi | `#d6d2c6` / `#8a8576` | | tasarım §4.7, pul/mühür yok |
| Lambri | `#3e3446` / çıta `#4a4762` | | yalnız `kapi` |
- Kural: kılıf dışı C\* ≤ 28 ✓, L\* ≤ 88 ✓ (huzme kenarı yarı saydam), kırmızı 0, sarı metal 0.

### 4v2.8 Doku ve tarama (seed `lanternOda: 167`, ≤ 3 katman, `ArsivKatmani geceLapis`)
- **Tarama yalnız:**
  - lantern gövdesinin gölge yüzü (100°, IV, ≤ 120 px)
  - memur sırtlarının perde ışığından uzak üçte biri (78°, 2 px / 6 px; yalnız ≥ 120 px boylu figürde)
  - okuyanın paltosunun sağ yarısı (78°, `kapi`)
  - söve iç yüzündeki düşey gölge şeridi (30 px)
- **Taranmaz:** perde, duvarın geniş karanlığı (düz iki ton), koridor, kâğıt.
- `geceLapis` mod kontrolü: koridor C\* ≥ hedefin %85'i (sıcaklık grileşmesin), perde L\* 86 ± 4.

### 4v2.9 Tasarımla çelişki ve gerekçe
1. **Kapı ışığı soğuk `#aab4bc` → sıcak `#e8cdb6`.** (a) A/V3 dersi: tek soğuk aile reddedildi. (b) Müzik notu ve senaryo doruğu: "okudu" filmin en sıcak anı. (c) Fizik: gündüz koridor güneş alan bir pencereyle aydınlanabilir [T]. Lantern huzmesi soğuk kalır; karşıtlık anlamı taşır: yabancı ışık → insan sıcaklığı.
2. **Görünüm `kapi` + plan içi kesme f266** (v1 pan yerine). Kesme kararı yönetmenindir. v1 pan değerleri (cx −1250 → −1345) yedek olarak geçerli kalır. Okuyan X 0.85'te kaldığı için kapının 0.10 m kayması pan değerini değiştirmez.
3. **Kapı X 0.70 → 0.80** (söve). Yalnız `kapi` görünümünde fark eder.
4. **Perdede P05'teki sayfa** (dil-nötr satırlar): tasarım §4.9'daki "14 satır" ile çelişmez, yalnız aynı çizimi kullanır.

### 4v2.10 Motion için çizim notları
- Şablon: yeni `src/kit/sablonlar/paris/LanternOda.tsx`. Görünümler `oda`, `kapi`. Aynı dünya modeli (`lanternDunya.ts`: perde, kapı, memurlar, lantern, figürler metre cinsinden), iki pinhole kamera.
- Yeni modüller:
  - `LanternHuzme {mercek, dikdortgen(t), isinAralik 2.5°, kenar 3, toz, seed}`
  - `ProjeksiyonSayfa {bulaniklik 0..1, olcek, sayfa: P05 sayfası}`
  - `KapiAcikligi {sove, ebrasman, koridorTon, kenarIsik}`
- Figür: `SabahFigur` gravür dili (H2.8), iç mekân, başlıksız. Memur oturur (baş-omuz) ve kalkar. Okuyan: `yetiskin-b` + `KolEl` ×2.
- Kontrol kareleri: **f238** (`oda`, net), **f330** (`kapi`, okuma), f48 (P10a), f272 (zarf teması). Hareket şeridi: f86–204 (büyüme, demet geometrisi) ve f250–296 (kalkış → kesme → zarf).
- `sinirlar.json` LANTERN-ODA: `gorunum: ["oda", "kapi"]`. `kapi` için cs 0.95–1.15, cx ±80, cy −60…60.

---

### 3v2/4v2 · Yönetmen için kamera tablosu (json sahibi yönetmen)
| Plan | Şablon · görünüm | kare | cs | cx | cy | Ek parametre / değişen | Ekranda doğrulama |
|---|---|---|---|---|---|---|---|
| **P04b** | DAGRON-INSERT `kafes` | 122 / 170 / 267 | 1.3 / 1.5 / 1.55 | 0 | 0 / −40 / −40 | değişmedi. `ufuk_y 1000`, kafes y 820–1180, `isik: gunMontmartre` | f206: kuş 576 px (%30), kapak açık, çit bandı kuşun arkasında |
| **P05** | DAGRON-INSERT `masa` `paris-atolye` | 0 / 118 / 236 / 268 / 374 | 1.0 / 1.0 / 1.35 / 2.0 / 2.0 | 0 / 0 / −60 / −40 / −40 | 0 / 0 / −250 / −610 / −610 | **nesneler değişti:** terazi **(330, 780)**, kutu tabanı **(795, 1009)** boyut **0.24 × 0.20 × 0.18 m** (json `boyut [519, 370]` → kaldır, şablon hesaplar), çekmece **ön-sol alt**, deste (330, 1400), ölçü (560, 1250) kilit. `isik: atolye` (18°) | f36 kuş %21 · f182 sayfa ışık hattında · **f280** parmak 328 / şerit 280 px @ (540, 930) |
| **P09** | DAGRON-INSERT `masa` `tours-buro` | 0 / 24 / 206 | 1.6 / 2.0 / 2.0 | 0 / −40 / −40 | 0 / −120 / −120 | değişmedi. Mektup yığını (220 → **290**, 1180), duvar `tuffeau` | f150: kılıf 278 px @ (500, 920), keçe arkada |
| **P10b-A** | LANTERN-ODA `oda` | 60 / 266 | 1.0 / 1.0 | 0 | 0 | **pan kaldırıldı.** memur-3 kalkış f250, sağdan çıkış f266. `plan_ici_kesme {kare: 266, gorunum: "kapi"}` | f238: perde %55, demet kenarı 3 px |
| **P10b-B** | LANTERN-ODA **`kapi`** [yeni] | 266 / 296 / 398 | 1.0 / 1.0 / 1.08 | 0 | 0 / 0 / −20 | kamera dünya (1.00, 1.25, 1.15), F 2000. zarf f272, açılma f290, okuma f296–386. Yavaş itme yalnız tutma sırasında (json `tutma.not` ile uyumlu) | **f330**: kâğıt ≈ 275 × 363 px @ (298, 933) (cs 1.08'de ≈ (275, 931)), el ≈ 255–275 px |
- **Yedek (kesme istenmezse):** v1 pan, `oda` cs 1.0 → 1.7, cx 0 → −1345, f250–290. Bu durumda PK-D7 net anı f250'de biter (46 kare, 0.77 sn): **≥ 1 sn ölçütünü geçmez**. Pan f270'te başlarsa 20 karede 1345 px (whip). Önerilmez.
- json notları: P10 `okunurluk.net_sn` 1.1 → **1.03** (f204–266). P10 `devam_plan.kapi.okuyan_dekor_x 1390` → `kapi` görünümünde ekran (298, 933) kâğıt merkezi. P05 `nesneler.terazi.konum` [380, 1000] → [330, 780]; `mercekli_kutu.konum` [720, 1080] → [795, 1009].

### 3v2/4v2 · Açık sorular (orkestra toplar)
1. **Kullanıcıya:** P10'da okuma anına **pan yerine plan içi kesme** (`kapi` görünümü). Varsayılan: kesme (gerekçe 4v2.0).
2. **Kullanıcıya / tasarımcıya:** kapı ışığı **sıcak gün** (tasarım soğuk diyordu). Varsayılan: sıcak.
3. **Tasarımcıya:** 3v2.10 ve 4v2.9 listeleri (DAGRON paleti, kutu ölçüsü, L\* ≤ 88 ışık hattı ya da lint izni, `dagronSepya` KolEl tipi, okuyan kol tonu).
4. **Araştırmacıya (ağ izni gelince):** (a) "Projection and expansion of microscopic records…" gravürünün içeriği (lantern konumu, perde biçimi: dikdörtgen mi daire mi, oda); (b) Dagron'un Paris ve Tours atölyesi (adres, cam çatı); (c) perdede gösterilen pellicule'ün düzeni (sütunlu basılı metin mi?). Doğrulanırsa perde içeriği güncellenir; şimdilik P05 sayfası (dil-nötr).
5. **Yönetmene:** P05 f112–150'de terazi direk tepesi (y ≈ 345) üst yazı bandına girer. Yazıyı f150'de başlatmak ya da `lint.izin`.
6. **Motion'a:** masa kamerası çok yakın (0.42 m). Kutu ve terazi 2B ölçekle değil 3B izdüşümle çizilmeli. İlk still'de 3v2.5 köşe noktaları ±15 px kontrol edilmeli.

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
