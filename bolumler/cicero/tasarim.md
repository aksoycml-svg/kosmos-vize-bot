# Çiçero (Ankara 1943–44) — Görsel Tasarım (kurulum ekibi, adım 1; ilk 1940'lar kiti)

Hazırlayan: tasarimci · 2026-11-14 · Girdi: `arastirma.md` §5, `senaryo.md` §3 (kilitli), `dokunuslar.md`, Paris `tasarim.md` §13–15 (sıcak–soğuk, el/figür dili), `src/rig/Kukla.tsx`, `src/kit/karakterler.ts`, `props/paris/SiluetFigur.tsx`, `src/kit/yazi.tsx`.
Spesifikasyondur, kod/görsel değil. Hex'ler elle Lab ile kontrol edildi (L\*/C\* ±3, "~"); motion `renk_olcum.py`, eleştirmen render'da ölçer.
Etiketler: **[A]** arastirma'da kaynaklı · **[S]** senaryo/dramatizasyon · **[G]** genel bilgi, kaynak açılmadı, **doğrulanmalı** · **[T]** tasarım kararı. [G] hiçbir dokunuşu tek başına taşımaz, okunur metin içermez; doğrulanmazsa nötr kalır.
**Gemini kullanılmadı, arşiv görseli indirilmedi; `varliklar.md` açılmadı** (referans türleri §9'da, kullanılırsa kaynak/lisans oraya yazılır).

---

## 0. Kimlik ve yön

**Karar: kanalın gravür/litografi dili korunur; 1940'a "dönem kâğıdı + düz renk plakası + gece lambası ışığı" ile çevrilir.** Gazete fotogravürü yarı-ton (halftone) noktası **kullanılmaz.**
Gerekçe: (1) yarı-ton nokta ızgarası 360 px'te moiré/titreme verir ve "ızgara/tel örgü" okur (Paris: ızgara reddedildi, "şehir titriyor"); (2) kanal tarama (hatching) dili ışığın biçimi anlattığı yerde zaten çalışıyor ve kullanıcı onaylı; (3) dönem farkı doku değil **biçim + palet + ışık** ile verilir (1940'lar ofset afiş: az sayıda düz plaka rengi, yuvarlatılmış geometrik prop, abajurlu elektrik lambası). [T]
- **Yeni renk/font: yok** (`theme.ts` değişmez). Bu belgedeki hex'ler sahne paletidir, kanal rengi değil. `gold #b8862b` görüntüde yok (yalnız yazı katmanı). `red #b3261e` görüntüde yalnız P07 çarpısı.
- **Sıcak–soğuk (Paris §13/§14 dersi):** gölge mavi-mor, ışık gül-şeftali (hue 45–72°). Bölüm ağırlıkla **gece, tek lamba**; "soğuk ve ışıksız" reddedildi, bu yüzden her gece planında lamba havuzu kadraj alanının ≥%18'i.
- **Ölçüt (her plan):** sıcak piksel (hue 20–80°, C\*≥10) ≥%14 · p95 L\* ≥75 · kılıf yerine **banknot**: sahnenin geri kalanı **C\* ≤28, L\* ≤88**; banknot sahnenin en parlak noktası (L\* ≥92).
- Saf siyah/beyaz yok: en koyu `#14120f`, en açık sahne dışı `#ecd2b0` (banknot hariç). Bayrak, flama, arma, rütbe/insignia, damga **yok** (Alman tarafı dahil; Berlin ve elçilik cephesi nötr). Eldiven yok (Blanc imzası).

### 0.1 Çizgi kalınlığı (bölümde tek, Paris §0.3 ile aynı sınıf)
Prop 2.5 px (geniş) – 4 px (insert), 6 px'i geçmez, renk = dolgunun %55 koyusu · dekor 3 (uzak) – 6 (yakın) · figür siluet: kontur yok, kenar ışığı 2 px · el §15.1b (tek dış yol, ince–kalın) · tarama çizgi ≥2 px, aralık ≥6 px. Yarım pikselin altına inen çizgi çizilmez.

### 0.2 Doku (en fazla 3, seed sabit, kaynamaz)
(1) kâğıt `paper #e9dfc9` multiply α .14 + lif + 6–10 soluk leke; (2) gazete tanesi: gölge alanlarında stipple α .10 (nokta ızgarası değil, rastgele tane); (3) mor-mavi tarama, yalnız ışığın biçim anlattığı yerde (abajur altı kenarı, kutu/komodin gölge yüzü, kapı altı, saçak, kol altı kıvrımı). Geniş yüzeyde (duvar, yatak örtüsü, zemin) tarama, kafes, çapraz tarama yok.

## 1. Işık sözleşmesi (mekân başına tek kaynak; huzme, havuz, gölge aynı tanımdan türer)
| Mekân / plan | Tek kaynak | İkincil (kaynak sayılmaz) |
|---|---|---|
| ELÇİ-ODASI gece (P02–P04, P09) | **masa lambası** (abajurlu, aşağı yönlü koni): havuz yarıçapı ≥ kadrajın %18'i | pencere gece mavisi `#4d5b84` (yalnız cam, çevreye ışık düşürmez); kapı altı şeridi (banyo lambası: kendi 18–24 px şerit ve zemin havuzu) |
| ELÇİ-ODASI gün (P08) | pencereden soğuk gün ışığı, soldan | yok (lamba söndü) |
| ARABA (P01, P05) | alçak güneş, sol-arkadan (pencere dışı) [T: saat/hava kaynaksız, yalnız ışık tercihi] | kenar ışığı profillerde `#f0c4a8` 2 px |
| BERLİN (P06) | masa üstüne tek asılı/masa lambası; harita sıcak havuzda | oda gölgede mavi-mor |
| BANKNOT insert (P07, P10) | P04 lambasıyla aynı kaynak (P10 "lamba yeniden yanar") | — |
Her görünen lamba/pencere çevresine ışık düşürür. Kapı altı ışık çizgisi ve P04 ayak gölgesi: banyo kaynağı sahne lambasından ayrı, kendi havuzu.

## 2. Palet (hex)
| Ad | Hex | ~L\*/C\* | Not |
|---|---|---|---|
| gece duvar (gölge) / lamba havuzunda | `#3e4262` / `#c8a98e` | 28/25 · 71/20 | gölge mavi-mor, ışık gül-ten |
| lamba havuzu merkezi (en sıcak/parlak, tavan) | `#efd0b6` | 85/20 (h 69°) | L\* ≤88, sarıya kaymaz |
| gül-altın ışık (kapı altı şerit, abajur içi) | `#e4bc98` | 79/25 (h 69°) | "kehribar" = bu; saf beyaz yok |
| kenar ışığı (siluet, el, omuz) | `#f0c4a8` | ~80/23 | 2 px, kırık parça |
| zemin/halı gölge / ışıkta | `#4a4466` / `#8c6f66` | | |
| yatak örtüsü ışık / gölge (beyaz DEĞİL) | `#cdb5a8` / `#5b5575` | 74/14 | çarşaf beyazı yok |
| komodin/ahşap ışık / gölge | `#6b5148` / `#3a3040` | | |
| pencere gece / gece hilali | `#4d5b84` / `#8da0c8` | 37/25 · 65/25 | |
| gündüz oda (P08) duvar ışık / gölge | `#e0c8b2` / `#a39cb6` | 82/16 · 66/15 | Paris sabah diliyle aynı aile |
| gök (araba penceresi) tepe/orta/ufuk | `#6f86ad` / `#a9b7cc` / `#f0d0bc` | Paris §14.2 aynen | güneş diski yok |
| araba içi koltuk/gövde gölge / ışık | `#3a3750` / `#6a5c68` | | |
| Berlin duvar / masa ahşap / sümen | `#4a4a68` / `#5a463e` / `#44493f` | | sümen koyu zeytin, parlak yeşil çuha yok |
| belge (sarımsı-gri) ışık / gölge | `#cfc6ac` / `#8b88a0` | 80/14 | **beyaz DEĞİL** |
| harita kâğıdı / deniz / kara | `#d4c6a2` / `#9fb0b8` / `#c9bb98` | 80/21 | |
| harita Normandiya dairesi (mürekkep) | `#3a3e5e` 10 px halka | | **kırmızı değil** |
| dosya (karton) / zarf (kraft) | `#b9a57f` / `#a88b66` | 69/22 · 59/25 | |
| mum (balmumu) ışık / gölge | `#c2a67e` / `#7a6a60` | 68/25 | bal-ten, beyaz/krem değil |
| fincan+tabak (koyu mavi emaye) / tepsi (koyu metal) | `#3f4d6b` / `#4a4a52` | | porselen beyazı yok |
| film kutusu / etiket bandı | `#2a2830` / `#8a8470` | | etiket beyaz değil, yazı yok |
| deri kutu / kilit plakası | `#4a3a3c` / `#6d6a63` | | arma, yaldız, sarı metal yok |
| lamba abajur dışı / iç / kaide | `#3f4a45` / `#e8c9a4` / `#4a4a52` | | abajur beyaz değil |
| Bazna ceket / gölge / ışık | `#3b3a4e` / `#262536` / `#54526a` | | kıyafet rengi kaynaksız: nötr koyu |
| gömlek (ecru, beyaz değil) / kravat | `#b8b09c` / `#2c2a38` | 72/12 | yaka/manşet de bu |
| kompars siluet (kişiye göre) | elçi `#4f4a62` · Moyzisch `#3c3a4c` · yetkili `#524a58` · sekreter `#463f55` | 30–35/14 | ayrışma renkle değil **silüetle** (§5) |
Istisnalar (lint izni, kendi plan listesiyle): **kırmızı çarpı** `#b3261e` (P07) · **filaman** `#e8a276` (P09 f56.0–56.9, ≤ ekranın %0.3'ü, kızıl değil şeftali-kor, hue 35–55°) · banknot L\* ≥92.

## 3. İMZA NESNESİ: BEYAZ BANKNOT [A görünüm; T seçim]
**Gerekçe:** hikâyenin tek nesnesi (kanca P01 → zarf P05 → iki aynı banknot P07 → ışıkta boş yüz P10 = P01 eşleşmesi); "sahte olan şey nasıl görünür?" sorusunu sahnede **parlaklıkla** taşır: gerçek ile sahte aynı görünür (ironinin kendisi). Telefonda en küçük halinde sahnenin en açık kâğıdı.
**Görünüm [A: BoE, Numista]:** büyük beyaz kâğıt, **tek yüz siyah mürekkep, portre yok**, arka yüz tamamen boş. Nominal **varsayılmaz**, rakam/harf yok (dil-nötr).
- **Gerçek ölçü [G, doğrulanmalı]:** ≈ 211 × 134 mm (oran 1.57:1, yatay). El boyu E = 0.19 m ⇒ uzun kenar ≈ 1.1 E, kısa ≈ 0.7 E. **Stilize büyütme yok**; yalnız kamera yaklaşır (P07: yükseklik ≥%30 ekran, P10 ≥%25).
- **Yüz çizimi (tek yüz, `#1c1915`):** çift ince çerçeve çizgisi + dört köşede dönel rozet (guilloche halkaları, 2 px) · sol yarıda **boş oval** (yalnız ince halka, içi kâğıt; portre okutmaz) · orta-sağda 3 dalgalı satır (harf yok) · sağ altta tek akıcı imza eğrisi. Arka: tek ton, çizgi yok.
- **Renk:** ışık yüzü `#f6f1e4` (L\* 95), gölge yüzü `#d4cfdc` (L\* 84, C\* 6; gölgede bile sahnenin en açık kâğıdı), kenar ışığı yok (zaten parlak). Tutulan kâğıt yumuşak sarkar, köşe hafif kıvrık, katı levha değil.
- **İki banknot (P07) birebir aynı** (aynı çizim, ayrı kopya yok); sahte işareti yalnız çarpı (§6).
- **Çakışma listesi (hiçbiri beyaz/ΔL\* <10 olmaz):** belgeler `#cfc6ac` · mektup/daktilo kâğıdı (uzak siluet) `#cfc6ac` · harita `#d4c6a2` · dosya `#b9a57f` · zarf kraft `#a88b66` · mum `#c2a67e` · fincan/tabak koyu mavi emaye · gömlek yaka/manşet ecru `#b8b09c` · yatak örtüsü `#cdb5a8` · abajur dışı koyu yeşil, iç `#e8c9a4` · film etiketi `#8a8470` · makine krom üstü `#8e8e96` · lamba ampulü görünmez (L\*>88 yasak) · pencere ışıltısı ≤ L\*85 · daktilo kâğıdı `#cfc6ac`. Kural: bu listeden biri banknotun yanında kadrajdaysa ΔL\* ≥10 ölçülür.
- **Biçim ayrışması:** banknot yatay 1.57:1 + çerçeve + rozet; belge/mektup dikey, çerçevesiz, dalgalı satırlı; harita yatay ama renkli ve kıvrımlı. 360 px'te banknot 90–300 px, ≥20 px şartı rahat.

## 4. Tipografi
`src/kit/yazi.tsx` standardı aynen: ekran yazısı kâğıt şerit + Playfair 900 (formül/etiket Plex Mono), tek kırmızı vurgu kelime; replik yok. **Gece planlarında (P02–P04, P09) `zemin: "koyu"` (açık mürekkep) önerilir** (kâğıt şerit karanlık odada parlar, banknot tekilliğini bozar değil ama dikkat çeker; yazı görüntüde sayılmaz, bu yalnız okunurluk). Değişiklik gerekmez. Ekran yazıları ve harita etiketi dil katmanı; görüntüde metin yok.

## 5. Karakterler (tek rig, oranlar sabit)
**Dönem riski:** mevcut rig `frak` (1830) gövdeli; aynen kullanılırsa 1830'lar okunur → yeni kostum şart.
| Kim | Uygulama | Ayrışma (yüz/şapka/boy) | Not |
|---|---|---|---|
| **Bazna** (kahraman, uşak) | `Kukla` + yeni `kostum: "takim40"` + palet `BAZNA` (§2). Tek yüzlü karakter | kısa koyu saç, bıyık yok, sakin kaş, şapkasız, boy 1.70 m; yüz kimlik iddiası değil [kanıt yok] | P08'de yüz hiç görünmez (sırt); eldiven yok. Kıyafet [S/G]: koyu ceket, düz paça, dar kravat; ak yelek/önlük yok |
| **Elçi** (yaşlı) | `SiluetFigur` yeni kod `yasli`: 1.76 m, omuz öne, hafif kambur 6°, gri seyrek saç siluette ince | yüzsüz; P02'de sırtı bize | boy sınıfı Bazna'dan uzun; baston/sabahlık yok [kanıt yok] |
| **Moyzisch** | `SiluetFigur` kod `sapkali`: 1.80 m, geniş omuz, **kenarlı erkek şapkası** [G genel 1940'lar, doğrulanmalı] | şapka = yön okutur (kenar profilde ileri) | Berlin ellerinden ve Bazna'dan ayrışır |
| **İngiliz yetkili** | kod `uzun-ince`: 1.84 m, dar omuz, şapkasız, baş hafif öne; kollar `GravurEl` konik kol (§15.2.4: kol = ceket dolgusu, dirsek yuvarlak) | uzun-ince siluet; çenede el (poz) | bel planda fincan alan el (P08) |
| **Sekreter** (uzak) | kod `topuzlu`: 1.62 m, boyunda küçük topuz, düz diz altı eteksiz-nötr gövde | daktilo başında; yüz yok | P01/P05 pencerede 30–45 px; P09'da kalkıp gider [Kapp: kadın [A]; kıyafet nötr] |
| **Berlin elleri** | `GravurEl` tek parça siluet (§15.1b), ten `#dcb9a2`/gölge `#8f7360`; kol koyu `#4f4c58`, **ecru manşet** `#bdb5a2` düğmesiz | yalnız eller, yüzsüz | rütbe/kolluk/arma yok |
- Eller (hepsi §15.1b tek dış yol; iç dikiş/tırnak/boğum çizgisi yok): Bazna ten `#c9a58a`/`#8e6a52`, manşet ceket + ecru şerit 0.08 B · Moyzisch kolu `#5a4f48` · İngiliz yetkili ten `#d6b49c`. Her el sol/sağ anatomi tablosundan (§15.1.4).
- Yön okuması: Bazna burun-çene profili + kenar ışığı; siluetler şapka kenarı/topuz/omuz eğimi ile. Ayak temas gölgesi her karede; boy–ufuk kuralı ön plan figürlerine de.
- **Kompars ana kadrodan ayrışır:** Bazna'nın yüzü başka figürde yok; siluetlerin hepsi yüzsüz.

## 6. Proplar (360 px'te ≥~20 px = 1080'de ≥60 px; biçim yanlış okunmaz)
| Prop | Biçim (tek cümle) | Gerçek ölçü [G/T] | Ekran (plan) | 360 px |
|---|---|---|---|---|
| **anahtar** | halkalı sap + çubuk + 2 net diş (kutu anahtarı), koyu çelik `#4a4a52`, ışık kenarı `#c4b5a8` | ≈7 cm, stilize ×1.8 | P02/P03: uzunluk ≥%10 ekran (≥192 px) | ≥64 px |
| **mum parçası** | avuca sığan yumuşak yassı oval parça, bal-ten `#c2a67e`, ışık yüzünde anahtar izi kabartması; **silindir/mum çubuğu değil** | ≈4×3×1 cm, ×1.5 | P03: el+mum ≥%25, iz ≥%14 | iz ≥45 px |
| **deri kutu (despatch box)** | dikdörtgen alçak kutu, köşe takviyeli, üstte kulp, ön ortada çelik kilit plakası + **anahtar deliği**; yaldız/arma yok | ≈40×30×12 cm [G] | P02 insert: kutu ≥%25 | ≥80 px |
| **fotoğraf makinesi** | 35 mm el makinesi: yatay gövde, ön ortada tek mercek tüpü, üstte 2 küçük kadran; model nötr, flaş yok | ≈13×7×6 cm [G], ×1.4 | P04 ≥%12 ekran | ≥40 px |
| **lamba** | ağır yuvarlak kaide, ince boyun, koni abajur (dış koyu yeşil, iç sıcak), ampul görünmez; yan düğme | ≈45 cm | P09 ≥%12 ekran | ≥40 px |
| **film kutusu** | kısa koyu silindir + üst kapak halkası + yan etiket bandı (yazısız) | ≈3×5.5 cm [G], ×1.5 | P04/P05 el içinde ≥90 px | ≥30 px |
| **zarf** | kalın şişkin kraft zarf, üçgen kapak çizgisi, yazı/pul/mühür yok | ≈24×16 cm, ×1.2 | P05 kucakta ≥%15, P07 açılır | ≥60 px |
| **çekmece + dosya** | koyu ahşap çekmece, çelik tutamak; içinde ince karton dosya yığını (`#b9a57f`), bir köşe sıkışabilir | çekmece ≈45 cm | P06 ≥%20 | ≥130 px |
| **fincan + tepsi** | koyu mavi emaye fincan+tabak, kulplu; koyu metal yuvarlak tepsi | fincan ø8 cm, ×1.3 | P08 el+fincan ≥%12 | ≥40 px |
| **harita (Normandiya)** | masada kâğıt harita: Manş kıyısı + Cotentin çıkıntısı, **etiket yok**, çevresinde **mavi-mor mürekkep halka** | ≈60×45 cm | P06 üst yarıda, daire ≥150 px | ≥50 px |
| **kırmızı çarpı** | iki fırça vuruşu, kendi elinden, `#b3261e`; **bölümdeki tek kırmızı**; mürekkep alanı ≤ banknot yüzünün %8, bbox ≥%10 ekran, net ≥1 sn | — | P07 | ≥64 px |
| **belge** | dikey, sarımsı-gri, dalgalı 11–13 satır (harf yok), kenar hafif kıvrık | A4 ≈ 21×30 cm | P04 yatakta serili | ≥50 px |
Daktilo (uzak siluet prop, P01/P05/P09): manuel daktilo gövdesi + sayfa, ayrıntı yok [G].

## 7. Dönem doğruluğu (tarama; Blanc dersi)
- **Nötr bırakılanlar (kanıt yok):** elçilik konumu/cephesi (Alman ve İngiliz), Ankara siluet/sokak lambası, araba markası (dış görünüm çizilmez; iç: koltuk + cam), uşak/elçi kıyafet rengi ve türü, Leica modeli, tripod (makine elde; sehpa parametresi var, kullanılmaz [popüler anlatım]), kasa tipi (yalnız deri kutu [A]), nominal.
- **[G] doğrulanmalı (araştırmacıya):** 1) fiver ölçüsü 211×134 mm; 2) 1943 Ankara'da elektrikli masa lambası/düğme biçimi (100 W ampul popüler anlatımda [A orta]); 3) erkek şapkası (Moyzisch); 4) 35 mm kartuş boyutu; 5) manuel daktilo ve düz paça/dar kravat siluet; 6) mum izi dışında anahtar alma yöntemi (çelişki 6).
- **Yanlış okunur riskler:** frak/yelek (1830) yok · kâğıt para **var** ama portre/rakam yok · bayrak/flama araba ve elçilikte yok · "kahve fincanı porselen beyazı" yok · mum çubuğu/cam tüp biçimi yok.

## 8. Yön karesi tarifi (motion + mekân sorumlusu, kod yazmadan önce; Gemini yok)
Referans türü (kamu malı, kullanılırsa `varliklar.md`'ye kaynak/lisans): ABD OWI/FSA 1940–44 renkli (Kodachrome) belgesel fotoğrafları ve OWI savaş afişleri (Library of Congress, kamu malı) — **yalnız renk/ışık/biçim referansı**, kopya yok; Bank of England fiver görseli telif durumu **doğrulanamadı** (kullanma).
1. **Kalibrasyon A — P04 geniş (ELÇİ-ODASI gece):** yatak, serili sarımsı belgeler, abajurlu lamba yatağa sağ-üstten, koni havuzu yatağın ortasını gül-ten `#efd0b6`/`#c8a98e` yapar, duvar ve zemin mor-mavi gölge; kapı altı ince gül-altın şerit; komodinde kutu; Bazna ceketli, sırtı yarı kamerada, kenar ışığı `#f0c4a8`. Tarama abajur altı ve komodin gölge yüzünde. Beklenen: sıcak ≥%14, havuz ≥%18, lamba kadraj dışına taşmaz.
2. **Kalibrasyon B — P07 banknot insert:** iki aynı beyaz banknot, koyu masada, lamba havuzunda; banknot yüzü çerçeve+rozet+boş oval okunur; çevre kraft zarf `#a88b66` ve masa gölgesi mat; ΔL\* ≥10; çarpı sonra gelir.
3. **Kalibrasyon C — P01 araba:** iki profil, solda şapkalı Moyzisch kenar ışığıyla, sağda Bazna; pencerede alçak güneşin ufuk ışıması; koltuk üstünden gelen el banknotu tutar (yüz görünmez, kamera döndürmez).
Her kalibrasyon: 360 px sayfası + renk ölçümü (sıcak %, p95 L\*, C\*>28 piksel sayısı, banknot ΔL\*), sonra kalan kareler.

## 9. Kit işi (kurulum ekibine; hepsi "yok", basit vektör; kabul = render karesinde görülünce)
`kostum: "takim40"` + `paletler/cicero.ts` (BAZNA, `HAM` kaydı, `YUZLER.bazna`, `sinirlar.json yuzVaryant`) · `SiluetFigur` kodları `yasli`, `sapkali` (şapka yolu), `uzun-ince`, `topuzlu` (+ `OLCU` satırları; ceket kalça boyu etekY ≈0.80, altı iki bacak) · `GravurEl` kol varyantı (ecru manşet) · props: `anahtar`, `mum.iz`, `kutu.deri`, `makine`, `lamba` (tek kaynak tanımı), `filmKutusu`, `zarf`, `cekmece+dosya`, `fincan+tepsi`, `harita.normandiya`, `banknot` (yüz çizimi §3, durumlar `kayar/dok/say/isik`), `carpi` (fırça). Dil metni kitte sabit yok.

## 10. Açık sorular / orkestraya notlar
1. Bazna'yı yüzlü Kukla yapmak (yukarı, kahraman) mı yoksa tamamen yüzsüz mü? **Varsayılan: yüzlü, sakin, profil/arka ağırlıklı**; yüz kanıtsız, kimlik iddiası yok.
2. Filaman kızarması hafif şeftali-kor (kırmızı değil) ve lint izni: varsayılan evet.
3. Moyzisch'in şapkası [G]: onay yoksa şapkasız, boy+omuz ile ayrışır.
4. Berlin odası pencereli mi pencerisiz mi: nötr (kaynak yok); varsayılan pencerisiz, tek lamba.
