# Sahne planı — Ben-my-Chree (yönetmen, 2026-11-15)

Girdiler: `onayli-anlatim.md` (v5 kilit) · `public/benmychree/ses/plan-sureleri.json` + `{tr,en}/Pxx.json` · `dokunuslar.md` · `arastirma.md` · `src/kit/KATALOG.md`, `GORSEL-RECETE.md`.
**Bu belge bolum.json değildir.** Deniz/liman/gemi/batarya şablonları kitte yok; kurulum ekibi kurar, sonra json yazılır. 1080x1920, **60 fps**. Kare = mutlak (bölüm başı 0). `yerel` = plan içi kare (bolum.json `kare` alanı bunu kullanır).
Toplam: **3666 kare = 61.1 sn** (≤ 65; P10 sonunda +30 kare sessiz kuyruk dahil, orkestra kararı: varsayılan). 10 plan, 19 çekim. Plan = max(TR,EN)+0.4 sn (kesin); plan içi kesmeler `devam_plan` / `kesme_2` ile (en çok 3 görünüm/plan, hepsi bu sınırda).

## 0. Dünya ve ışık (tek kaynak, bütün şablonlar paylaşır)
- **Tek ışık = güneş**, azimut 235° (GB), **yükseklik zamanla iner** (aynı vektör, yalnız yükseklik): P01–P05 22° · P06 20° · P07 18° · P08 16° · P09 12° · P10 6° (gün batımı). Saat kaynakta yok → "Ocak öğleden sonra, nötr ama sıcak" (kaynak iddiası değil). Gölge, kenar ışığı, su yolu, sütun parlaması, havuz aynı vektörden türer (GORSEL-RECETE A1).
- Kamera yönü `b` (°, 0 = K) → güneş ekranda: `rel = (235 − b) mod 360` (0 ön, 90 sağ, 180 arka, 270 sol). Her çekimde yazıldı.
- Palet (A8): gölge mavi-mor, ışık gül-altın/şeftali, su: gölgede çelik-mavi / yolda gül-altın; sıcak piksel ≥ %14, p95 L* ≥ 75. Kırmızı: yalnız hangar alevi + 1 sayı vurgusu + tricolore bayrak (küçük; `lint: {izin:["kirmizi"], not:"bayrak kimlik"}`).
- Gemi/üniforma/kamuflaj rengi kanıtsız → **nötr gri-kum gövde**, baca nötr koyu; kamuflaj ağı yok; mevzi yalnız kaya gölgesi (dokunuslar notu).
- **Sabit referans kadrajı (kurulum → karşılık):** LIMAN `kiyidan-ada`, b=190°, ufuk y 800 = **P01, P07c** (aynı kadraj; sağlam gemi → yanan gemi); **P10a** kıyıdan (b=100°) aynı kaya oyuğunda erleri gösterir, enkaz arka plandadır; P06 V1 aynı noktadan ama ön planda top.
- Telefon okunurluğu için LIMAN "tiyatro dekoru telefoto" dilidir: gemi uzunluğu ≈ 650–700 px (≈ 6° görüş), ön plan kaya iri/flu, arkada ada. Hafif abartı serbest (oran), yapı/dönem sabit.

## 1. Kitten eşleme (adıyla)
| ihtiyaç | kit parçası | kullanıldığı yer |
|---|---|---|
| harita | **HARITA** (`rota: "ozel"`, `rota_noktalar`, `rota_ciz`, `kamera_takip`, `igne`, `svg_etiket:false`) + yeni `harita_gorunum: "meis"` | P10b |
| sayaç | **KitSayac** (`ekran_yazisi.tur: "sayac"`, `{n} km`, hedef 2, sure 60) | P03c "2 km" |
| ekran yazısı | `yazi.tsx` kâğıt şerit; `tur: formul` (Plex Mono) | tüm planlar; P02 formul |
| altyazı | **`altyazi`** kelime kelime, `bant: "oto"`, grup 2, kaynak = `public/benmychree/ses/{tr,en}/Pxx.json` (`words`) | tüm bölüm; üst bant dolu planlarda alt bant (y 1290–1490) bilerek boş bırakıldı |
| kamera dili | **`kamera_dil.itme`** yalnız düz insert/harita (P10b); diğer her çekimde **fiziksel kamera** (§12: dolly/truck/vinç/pan/tilt, yükseklik m, odak mm eşdeğeri). Gösteri sarsıntısı yok (`titreme` kullanılmaz); **`darbe`** yalnız P06 V3 isabeti ve P07b kapı (sarsıntı ≤ 2 px); `gecis`/whip yok |
| plan içi kesme | **`devam_plan` + `kesme_2`** | P02, P03, P06, P07, P08, P10 |
| efekt | `Efektler.tsx`: `Dust` (tuz/toz), `Fog` (ufuk sisi), `Glow` (parıltı), `Clouds`, `FilmLook`; `Impact` | atmosfer |
| fizik | `hareket/motion.ts` **`asiliNesne`** (derrick halatı, çıpa zinciri, simit), `yayKare`, `meltem` (bayrak, kuru ot) | P02, P03, P09 |
| su efektleri | SARAYBURNU **taç sıçrama (efekt kodu KE-E3)** + **`okutma.dalga_izi`** (V iz) kodu | çıpa/şamandıra/su sütunu, bot izi |
| yangın/duman | COL-US **`alev`** (3 katman yaprak alev) + **`duman`** (loblar kadrajın üstünden çıkar, fade yok) | P06 V3, P07b/c |
| toz | GALATA-TEPE **toz (efekt kodu KE-E4)** (yükselir, yayılır, oturur) | top geri tepme tozu P06 V1 |
| doku/ışık | `doku/Tarama`, `RenkKaydi`, `KonturTitreme`, `ArsivKatmani litografi`, `isik.ts` (golgeCokgen), `GokLitografi`, `Hale`, `bugu`, `Flu` (Paris ortak kod) | tüm şablonlar |
| figür | **yüzlü** `Kukla` + `yakin` yüz + `palet`: teğmen, Osmanlı erleri **E1–E4** (tasarim.md §4.2), Royal Navy tayfası **T1–T4** ve 5 yaralı (§4.2b); `KolEl` (el). Siluet (`SiluetFigur`) yalnız figür ekran yüksekliğinin **%5'inden küçükse** (P06 V2/V3 uzak, P08b son kareler, P03a rıhtım) | P02, P05, P06 V1, P07, P08, P10a |
| yok / `kit_eksik` | teğmen kostümü (nötr kep, nötr haki; rütbe/arma yok), Royal Navy tayfa kostümü (nötr koyu) + yüzlü er/tayfa kuklası (4+4 kart parametresi), deniz uçağı (genel iki şamandıralı) | kurulum ekibi |

## 2. Zaman tablosu (mutlak kare)
| id | çekim | başlangıç–bitiş (kare) | süre sn | şablon | ölçek | tempo | taşıyıcı (çıkışta) |
|---|---|---|---|---|---|---|---|
| P01 | P01 | 0–190 | 3.17 | **YENİ: LIMAN** `kiyidan-ada` | geniş | hizli | kıç derrick'e itme + ışık yolu → P02a |
| P02 | P02a | 190–480 | 4.83 | **YENİ: GEMI-INSERT** `kic` | orta → yakın | nefes | pan hızı + su halkası |
| | P02b | 480–603 | 2.05 | GEMI-INSERT `korkuluk` | yakın (simit) | bekle | korkuluk yatay çizgisi → rıhtım çizgisi |
| P03 | P03a | 603–729 | 2.10 | LIMAN `ada-rihtim` | geniş | nefes | bayrak/baş hattı → baş insert |
| | P03b | 729–867 | 2.30 | GEMI-INSERT `bas-capa` | yakın (insert) | hizli | gergin zincir çizgisi → ölçü çizgisi |
| | P03c | 867–1091 | 3.73 | LIMAN `karsi-kiyi` | geniş (+itme) | bekle | kıyı silueti sürer → P04 |
| P04 | P04 | 1091–1388 | 4.95 | **YENİ: KIYI-BATARYA** `yamac-oyuk` | geniş → insert (push-in) | nefes | namlu ucu aynı ekran noktasında → P05 |
| P05 | P05 | 1388–1627 | 3.98 | KIYI-BATARYA `tegmen` | göğüs/yakın (profil) | bekle | bakış çizgisi (sağa, güneye) → P06 |
| P06 | V1 | 1627–1867 | 4.00 | KIYI-BATARYA `top-onplan` | boy/orta → itme | bekle | namlu yönü + toz sürüklenmesi + atış sesi kuyruğu |
| | V2 | 1867–1999 | 2.20 | LIMAN `rihtim-yan` | orta | hizli | iki su halkası (ön planda sönen) |
| | V3 | 1999–2174 | 2.92 | LIMAN `hangar-yakin` | orta-yakın | bekle | ince duman sütunu → P07a |
| P07 | P07a | 2174–2324 | 2.50 | GEMI-INSERT `kic-su` | orta (tilt aşağı) | nefes | yukarı kıvrılan duman + tilt yönü |
| | P07b | 2324–2444 | 2.00 | GEMI-INSERT `hangar-kapi` | insert | hizli | kapıdan çıkan duman sütunu aynı x'te |
| | P07c | 2444–2607 | 2.72 | LIMAN `kiyidan-ada` (= P01 kadrajı) | geniş | bekle | duman perdesi → P08 |
| P08 | P08a | 2607–2812 | 3.42 | GEMI-INSERT `bot` | orta-yakın | nefes | pan hızı (A botundan B botuna) |
| | P08b | 2812–2990 | 2.97 | GEMI-INSERT `bot` (aynı) | orta-yakın → orta (geri çekilir) | bekle | botun V izi halkası → P09 |
| P09 | P09 | 2990–3172 | 3.04 | GEMI-INSERT `korkuluk-su` | orta-yakın | nefes | yatık gövde çizgisi → P10a |
| P10 | P10a | 3172–3406 | 3.90 | **KIYI-BATARYA `saygi`** (ön plan, yüzlü erler) + LIMAN `enkaz` (arka) | orta (grup) + geniş arka | bekle (kamera sabit) | erlerin bakış yönü (denize, enkaza) → harita gemi ikonu |
| | P10b | 3406–3666 | 4.33 | **YENİ: HARITA-MEIS** | geniş (harita) | nefes | — (son; döngü P01'e) |
**P10 sonunda +30 kare sessiz kuyruk** (3636→3666) plana dahildir (orkestra: toplam 3666 kare = 61.1 sn): P10 anahtar tutması + bölümün tek ≥1 sn ses dinlenmesi (konuşma 7.10'da biter → 1.14 sn).
Çekim süreleri çeşitli (2.0–4.95), üst üste 3 aynı tempo yok (…bekle, nefes, bekle, bekle, hizli, bekle, nefes, hizli, bekle, nefes, bekle, nefes, bekle, nefes, bekle, nefes). Patlama: P06 V3 isabeti (kare 2091) + P07b kapı (2386). Ses dinlenmesi + resim taşır: P06 V1 ilk 3 sn söz var ama resim sakin gerilim; ses boşluğunda (P06 TR 3.4–4.06, P08 4.1–4.75) resim eylemi taşır.

**Kesme türleri:** çıplak (taşıyıcısız) yalnız **2**: (1) P08b→P09: zaman atlaması "birkaç saat" (kesme zaten araç; ses boşluğu 0.2 sn, kâğıt geçişi gerekmez); (2) P06 V1→V2: sert kesme, atış sesi vurgusu (şok; taşıyıcı ses). Kalan 16 kesme taşıyıcılı (tablo). Whip/whoosh yok.

**EN ofset tablosu (kurgucu; görüntü tek zamanlı, yalnız EN cümle başları kaydırılır):**
| plan | EN cümle başı (ham) → hedef | gerekçe |
|---|---|---|
| P03 s2 | 4.98 (kaydırma yok) | kesme 4.4'te, EN boşluğu 4.46–4.98 içinde |
| P06 s2 | 2.86 → **4.06** (+1.20) | su sütunu 1 (4.1) "ilk iki mermi" ile |
| P06 s3 | 5.09 → **6.85** (+1.76) | "hit" ≈ 7.5, isabet karesi 7.73 ile |
| P07 s1b | "and set the hangar on fire" 1.81 → 2.56 (+0.75) | kapı patlaması 3.53'e |
| P07 s2 | 3.69 → **4.50** (+0.81) | |
| P08 s1 | 0.18 → 0.88 (+0.70) | "abandoned" ≈ 2.9, bot açılışı ≈ 3.8 |
| P08 s2 | 3.37 → **4.75** (+1.38) | |
| P10 s2 | 4.53 → 4.41 (−0.12) | |
Kaydırmalar ≤ plan süresi (en geç EN bitişi P06 8.07 < 9.12; P08 5.55 < 6.38). Boşluk "nefes"tir; kelime dışında ses (foley) kesilmez.

## 3. Ekran yazıları (üst bant y 240–400; ayrı dil katmanı; TR / EN)
| plan | TR | EN | yerel kare | not |
|---|---|---|---|---|
| P01 | OCAK 1917 · MEİS | JANUARY 1917 · KASTELLORIZO | 0–190 (ilk karede açık) | vurgu: 1917 |
| P02 | 118 m · 24,5 knot (formul) | 118 m · 24.5 knots | 100–280 | |
| P03 | 2 km (KitSayac 0→2) | 2 km | 368–470 | sayaç 60 kare, ilk kare 368 |
| P04 | İngiliz kayıtları: 16 top ⏎ Ertuğrul: 4 dağ topu | British records: 16 guns ⏎ Ertuğrul: 4 mountain guns | 100–285 | vurgu tek kelime: "16" |
| P05 | Topçu Teğmen Mustafa Ertuğrul ⏎ Anıları: Ben Bir Türk Zabitiyim | Artillery Lt. Mustafa Ertuğrul ⏎ Memoir: Ben Bir Türk Zabitiyim | 20–225 | tek kaynak atfı |
| P06 | 1 · 2 · 3 (üç adım: "1" → "1 · 2" → "1 · 2 · 3") | aynı | 246 · 322 · 464, bit 535 | KitSayac sürekli sayar, atışa kilitlenmez → ayrı girdiler; "3" kırmızı. Sütun tepeleri y > 420 |
| P07 | Hangar arka bacanın gerisindeydi | The hangar sat behind the rear funnel | 160–330 (kesmeyi geçer) | S07c'de ok işareti arka baca–hangar |
| P08 | 5 yaralı · ölen yok | 5 wounded · none dead | 250–375 | |
| P09 | — | — | | altyazı serbest |
| P10 | 1920'de yüzdürüldü | Refloated in 1920 | 245–350 (P10b) | P10a'da yazı yok (yüzler) |

## 4. Plan plan
Kamera: bu bölümdeki "itme / cs" ifadeleri **§12 fiziksel kamera tablosuyla** değiştirilir; çelişkide §12 geçerlidir (2.5D şablonlar, her katmanın gerçek z'si).

Not: "alt 1/3" = y 1280–1920. Altyazı alt bantta (1290–1490) iner → bu bantta kritik nesne yok. Okunurluk: ekran oranı / net sn.

### P01 · kare 0–190 · LIMAN `kiyidan-ada` (YENİ) · tempo hizli · kanca
- **Ölçek/kamera:** geniş (telefoto). Yükseklik 1.2 m (kıyı kayası üstü), `b`=190° (ışık rel 45°, sağ-ön: gemi kontrajur, kenar ışığı sağda, su yolu sağ-üstten kameraya). Hareket: itme cs 1.00→1.12, cx 0→−30 (kıça doğru); ufuk y 800.
- **Konumlar:** gemi y 880–1060 (su hattı 1050), x 190–890 (≈ %65 genişlik), kıç sağda. Ada: kale solda x 80–420 y 640–880 (360 px'te okunur), tricolore bayrak kalede (küçük), ev şeridi su hattı arkasında y 860–900, sağda sırt. Ön plan kaya: x 0–560, y 1180–1920, **kaya oyuğu** x 120–420 y 1260–1400 (koyu).
- **Tek ana hareket:** mürekkep çizgi kayadaki oyuktan gemi gövdesine uzanır: kare 6→124 (`rota_ciz` benzeri, LIMAN `cizgi_mevzi {bas:6, bit:124, a:[270,1330], b:[560,1010]}`); ucunda damla. İlk karede çizgi %10'da (hareketli, okunur). **Kapak = kare 124** (çizgi gemiye değmiş; yazı üstte).
- **Saklanan şey:** çizgi oyuğa girer; oyuğun içi karanlık, ne olduğu görünmez (P04 cevaplar).
- **Işık/katman:** ön plan: flu kaya + kuru ot, sağ kenarda 2 px sıcak kenar ışığı, gölge mavi-mor; orta: gemi + su yolu (gül-altın ışıltı) + ada; arka: kale taşı sıcak, sırt, 3 buğu bandı; atmosfer: ufuk sisi (`Fog`), tuz (`Dust`), deniz ışıltısı. Alt 1/3: kaya + ot (ölü alan yok).
- **Foley:** ambient dalga, kısık rüzgâr; kare 124 mürekkep-damla (−12 dB). **kontrol_kare 124.**

### P02 · kare 190–603 · GEMI-INSERT (YENİ)
**P02a · 190–480 (yerel 0–290), `kic`, orta → yakın, nefes.** Yükseklik 2.2 m (güverte), `b`=320° (rel 275 sol-yan ışık), itme cs 1.0→1.35, sağa hafif pan. Konumlar: derrick bumbası x 300–800 y 480–1000; **deniz uçağı** (genel Short tipi, 2 şamandıra) x 380–820 y 700–1050, ekran yüksekliğinin ≈ %30+; arkada solda **kapalı hangar kapısı** x 60–330 y 760–1120 (%18); sağ üstte borda üstünde **3 can botu** x 640–1000 y 560–700; tayfa ×2 **yüzlü**: **T2** (≈40, kırlaşmış gür bıyık, güneş yanığı) bumbaya asılır, **T1** (≈22, ince yüz, tüysüz, dikkatli) halat yönlendirir; boy ≈ 520 px (y 760–1280), yüz ≥ 75 px, sakin ve işine dönük; kenar ışığı sol. **Kurulum burada tamam:** kapı, botlar görünür; simit P02b'de.
- **Dokunuş BMC-D1:** yerel 30–258 (0.5–4.3 sn). Uçak güverteden iner, **şamandıralar suya değer = yerel 258 (abs 448)**, halat gevşer 258–282. Net ≥ 4.3 sn. kapanış: halkalar sönerken kamera pan'a başlar (yerel 282–290).
- **Foley:** vinç-halat 30–250 (−9) · **samandıra-sap 258 (−7)** · halat-gevsek 270.
- **Ekran yazısı:** üstte (y 240–400) → uçak orta bantta, yazıya binmez. Alt 1/3: güverte tahtası + halat kangalı + su kenarı (flu ön plan).
- Işık/katman: ön plan flu makara + halat; orta uçak/derrick (sıcak kenar ışığı kanat ucunda); arka kapı/botlar gölgede mavi-mor; atmosfer tuz buharı, su ışıltısı.
**P02b · 480–603 (yerel 290–413), `korkuluk`, yakın, bekle.** `b` 320→290°, pan sürer (yerel 290–340 hız aynı), sonra 1.5 sn yavaş itme. Konum: **sancak korkuluk, can simidi** x 380–700 y 700–1010 (çap 200 px ≈ %10.4), simidin kancası net; solda bot tabanı, sağda su. Simit **sancak (su) tarafında** (P09'da gemi sancağa yatar). Okunurluk: simit ≥ %10, net 1.8 sn. Ekran yazısı: yok (P02a yazısı yerel 280'de biter). kontrol_kare: yerel 258 (abs 448) P02a.
- **Taşıyıcı P02a→b:** pan hızı + son halka dalgası alt kenarda b'ye uzanır. **b→P03a:** korkuluk yatay çizgisi = rıhtım yatay çizgisi (aynı y 1010).
- Foley: korkuluk sallanır (çok kısık asılı-nesne gıcırtısı, görünür simit hafif sallanır → `asiliNesne`).

### P03 · kare 603–1091 · LIMAN + GEMI-INSERT (3 görünüm)
**P03a · 603–729 (yerel 0–126), LIMAN `ada-rihtim`, geniş, nefes.** Yükseklik 3 m (rıhtım), `b`=120° (rel 115 sağ-arka), itme 0.04. Kale solda tepede, rıhtım şeridi y 960–1010, **gemi** orta x 200–880 (su hattı 1040) son metrelerini kayar ve durur (kare 0–90; **hareket plan içinde biter**, köpük söner), tricolore bayrak rüzgârda (`meltem`). Alt 1/3: iskele halatı + su + rıhtım taşı. Işık sağ-arka: kale taşı sıcak, gölge mavi-mor, su gül-altın. Ekran yazısı yok. **Taşıyıcı:** baş hattı (gemi başı) sol-üst köşeden → P03b baş insert.
**P03b · 729–867 (yerel 126–264), GEMI-INSERT `bas-capa`, insert, hizli.** Yükseklik 2 m, `b`=20° (rel 215 sol-arka). Konumlar: çıpa + makara x 360–720 y 520–1000 (≥ %25 ekran), zincir aşağı su. **BMC-D2:** çıpa iner yerel 152→**sıçrama 200 (abs 803)**; zincir akar 200–232; **gerilme 240 (abs 843)**, damlalar fırlar, gövde bir an çekilir 240–255. kapanış: damla/halka 255–264. Foley: zincir-akis 152–232 (−5) · capa-sap 200 · **zincir-gerilme 240**. kontrol_kare yerel 240. Alt 1/3: zincir halkaları aşağı + su dalgası. Ekran yazısı yok.
**P03c · 867–1091 (yerel 264–488), LIMAN `karsi-kiyi`, geniş, bekle.** Yükseklik 4 m, `b`=15° (rel 220 sol-arka), itme cs 1.0→1.15. Karşı kıyı boş, katmanlı soğuk sırt (3 katman), ön planda su ışıltısı; **ölçü çizgisi** (`olcu_cizgisi {bas:368, bit:428, a: gemi, b: kıyı}`) + KitSayac "2 km" (yerel 368–470). Saklanan: kıyı bomboş (P04). Alt 1/3: su dalga şeritleri + ön plan flu gemi korkuluk köşesi (sol-alt).
- **Taşıyıcı P03a→b** gemi başı hattı; **b→c** gergin zincirin açısı = ölçü çizgisi açısı; **P03→P04** kıyı silueti, kamera itme sürer.

### P04 · kare 1091–1388 · KIYI-BATARYA `yamac-oyuk` (YENİ) · nefes
- **Ölçek:** geniş → insert, **DOLLY ZOOM (bölümün tek kullanımı, §12)**: ön plan taşı ekranda sabit, karşı kıyı arkadan büyür. Yükseklik 3 m (deniz hizası), `b`=15° (rel 220: güneş kamera arkasında → metal parıltısı mümkün). Hareket yerel 0–250 (47 kare kuyruk).
- **Konumlar:** yamaç x 0–1080 y 700–1500, kaya oyuğu P01'in aynı kayası (x 380–700, y 960–1180 başlangıçta; dolly zoom ile arka plan 2.4× büyüyerek merkeze 540,900'e gelir); ilk 1.5 sn tamamen boş kıyı. Namlu ucu insert'te ≥ %12 ekran (≈ 240 px), **yalnız ucu** görünür, gövde gölgede.
- **BMC-D3:** parıltı yerel **190 (abs 1281)**, 186–232 net (≥ 1 sn), hemen gölgeye; kamera durur (yerel 250→, kuyruk). kontrol_kare yerel 200. Küçük jest değil, ışık olayı; yazıya binmez (yazı üst bant, parıltı y ≈ 900).
- **Saklanan şey:** yalnız namlu ucu, kaç top/kim? (P05–P06). Kamuflaj/ot örtüsü yok; yalnız kaya gölgesi.
- Ekran yazısı yerel 100–285 üstte (iki satır). Foley: kuru-ot rüzgârı; metal-tink-kisik 190 (−12). Alt 1/3: ön plan flu taş + kuru ot + taze katır izi (tekerlek yok), yamaç gölgesi mavi-mor. Katman: ön flu ot/taş, orta yamaç + oyuk, arka sırt + sis, atmosfer: yamaç tozu, ısı sisi.
- **Taşıyıcı:** namlu ucu ekranda (540, 900), P05'in ilk karesinde aynı noktada.

### P05 · kare 1388–1627 · KIYI-BATARYA `tegmen` · bekle
- **Ölçek:** göğüs/yakın profil; plan içi: el+namlu (insert-orta) → yüz. Yükseklik 1.5 m, `b`=100° (rel 135 sağ-arka: yüzde ve elde gül-altın kenar ışığı), sağ yüze bakış (güneye, gemiye). Kamera: yerel 0–20 namlu ucu (540, 900) → yerel 20–130 geri açılır → **130–190 elden yüze kayar**; cs 2.4→1.8.
- **Erler (yüzlü, §4.2):** arka planda hafif flu (σ ≤ 2, yüz okunur): **E1** (nişan; gözler kısık, çark elinde) sol-arka x 60–340, **E3** (top çeken, halat omuzda, kısa sakal, kaşta yara izi) sağ-arka x 800–1050 (teğmenin yüzüne binmez, yüz y ≥ 520); yüz ≥ 110 px, ağırbaşlı, bakışlar teğmene/denize; güneş yanığı ve toz ayrıntıları kartlardaki gibi. E2 bu planda yok (P06 V1'de mermiyle girer).
- **Konumlar:** namlu x 100–1000 y 880–960 (yatay, sağa uzanır, gövdesi kadraj dışı); **el** tek parça el siluetidir (iç dikiş yok; kişi yüzlü) x 420–720 y 780–1000 (≥ %15 = 290 px) namlunun üstünde; teğmen yüzü sağda x 600–900 y 500–860 (profil, yüz ≥ %17). Arkada flu katır başı/kulağı (ön plan sol-üst, flu), uzakta ada/gemi çizgisi.
- **BMC-D4:** pat 1 yerel **87 (abs 1475)**, pat 2 **120 (abs 1508)**, el sabit 130–204; 'Mustafa Ertuğrul' (2.3–3.3 sn = 138–198) sırasında yüz kadrajda. Net ≥ 1.5 sn. kontrol_kare 122. Foley avuc-metal-pat ×2 (−9), kumaş kısık.
- **Karakter:** teğmen yeni karakter: nötr kep, nötr haki, rütbe/arma yok (doğrulanamadı); yüz yakın planda detaylı (kaş, göz kapağı, ağız). Kaynak notu: yalnız anı (tek kaynak) → ekran yazısı atıf.
- Ekran yazısı üstte yerel 20–225 (2 satır; yüz y ≥ 500 → binmez). Alt 1/3: namlu/top tekerleği gölgesi + taş zemin + katır kayışı (flu).
- **Saklanan şey:** top gövdesinin boyu kadraj dışı ("küçük top"; P06 V1 gösterir).

### P06 · kare 1627–2174 · ★ ANAHTAR (3 görünüm)
Zincir: atış → su sütunu → atış → su sütunu → atış → **sütun yok, isabet**. Tüm uçuş süreleri 60 kare. Olaylar yerel (abs = 1627 + yerel): atış1 186 (1813) · sütun1 246 (1873) · atış2 262 (1889, uzak ses) · sütun2 322 (1949) · atış3 404 (2031, uzak ses) · **isabet 464 (2091)**.
**V1 · 1627–1867 (yerel 0–240), KIYI-BATARYA `top-onplan`, boy → itme, bekle.** Yükseklik 1.2 m (P01 noktası), `b`=190° (rel 45). Ön plan: **top namlusu + kundak** sol-alt x 0–560 y 1000–1500 (P01'deki kaya oyuğu = mevzi; kurulum→karşılık), arkada gemi x 190–890 y 880–1060 (P01 kadrajı, su yolu; erler gemiyi örtmez: x ≥ 560 serbest), ışık biraz alçalmış (iki saat). **Top başında yüzlü erler (§4.2):** **E1 nişan** (kundak arkası x 40–300, ayak y 1280, boy ≈ 900, yüz ≥ 125 px, gözler kısık, bir eli yükseltme çarkında), **E2 mermi** (x 290–500, ayak y 1230, mermi sandığı + omuzda ip, yüz ≥ 110 px, yanakta toz), **E3 top** (sol-ön, yarı kadraj kesik x 0–190, halat omuzda, profil yüz ≥ 110 px). Ağırbaşlı, emek; gülme/zafer yok; atışta geri adım atmaz, kulaklarını örtmez (sakin). 0–180 sakin gerilim (itme 0.04). **Atış 1 yerel 186:** geri tepme (namlu 24 px geri, 24 kare), toz (efekt kodu KE-E4) bulutu yükselir-yayılır-oturur (186–236); kapanış 236–240. Ekran yazısı yok; altyazı bu çekimde **alt bantta** (ayaklar y ≤ 1280).
**V2 · 1867–1999 (yerel 240–372), LIMAN `rihtim-yan`, orta, hizli.** Rıhtım ucu, `b`=210° (rel 25: sütunlar arkadan ışıklı, gemi hafif gölgede). Gemi gövdesi sağda x 480–1080 y 820–1080 (ölçek: su sütunu için yakın, ≈ 27 px/m); **sütun 1** yerel 246, x 300 (gemiden 30 m solda) yükselir 246–270, tutar 270–300, çöker 300–322 (**≥ %25 ekran = 480 px**, tepe y ≈ 520); **sütun 2** yerel 322, x 700 (gemi arkası) çöker 360–370 → **kapanış 372**. Ön plan: halka dalgaları. Ekran yazısı "1" 246 · "1 · 2" 322 (tepe y > 420). Foley: su-sutunu ×2 (−7); atış 2 uzak gümleme 262 (−12, görünmeyen kaynak). kontrol_kare yerel 326.
**V3 · 1999–2174 (yerel 372–547), LIMAN `hangar-yakin`, orta-yakın, bekle.** `b`=205° (rel 30). Gemi arka bölüm: arka baca, **hangar kapısı kapalı** x 380–700 y 760–1080 (P02a'daki aynı kapı), kıç derrick; ön planda su, **iki halka sönerken**; üst bant: yazı "1 · 2" tutar. Atış 3 uzak ses 404 (görüntüde sütun yok: kare 404–464 sakin, tek hareket yok; **sütunun yokluğu = vuruş işareti**). **İsabet yerel 464 (abs 2091):** hangar bölgesinde `darbe {kare:464, x: kapı üstü, siddet 0.6, flas, sarsinti ≤3 px}` + ince duman başlar; kamera %4 itme (hangara). Yazı "1 · 2 · 3" 464, "3" kırmızı. Hold 464–547 (1.38 sn) + P07a ilk 40 kare aynı duman = **tutma ≥ 3.6 sn** (okuma 2.1 + 1.5). kontrol_kare yerel 470 (abs 2097). Foley: **isabet-tok 464** (yatağın 6–8 dB üstü), riser/whoosh yok.
- Alt 1/3 (hepsi): V1 top kundağı + toz; V2 su + halkalar; V3 su yüzeyi + halkalar. Altyazı alt bantta; sütunlar/kapı bu bantta değil.
- Saklanan şey: V3'te isabet noktası kapının üstü; hangarın içi gösterilmez (P07b).
- **EN ofsetleri §2'de.** Gösteri yok; ceset/yaralı yok.

### P07 · kare 2174–2607 · 3 görünüm
Hasar zinciri: dümen → hangar → dönemiyor. Abs = 2174 + yerel.
**P07a · 2174–2324 (yerel 0–150), GEMI-INSERT `kic-su`, orta, nefes.** Yükseklik 2 m, `b`=300°, tilt aşağı (cy hareketi) gövdeden kıç suyuna; **kamera ilk karede duman sütunu** x aynı P06 V3 (taşıyıcı), sonra aşağıda **sapık duran dümen kanadı** + pervane köpüğü boşa dönüyor (köpük büyür, gemi yerinde). Dümen 'dümeni' 1.86 (yerel 112). Foley govde-inleme 112 (−9). Alt 1/3: kıç su + köpük + güverte dibi. Katman: ön plan flu halat, orta kıç/dümen, arka duman, atmosfer su buharı.
**P07b · 2324–2444 (yerel 150–270), GEMI-INSERT `hangar-kapi`, insert, hizli.** `b`=270° (rel 325; kapı gölgede, mavi-mor; **ışık kaynağı = alev (tek), turuncu**, güneş yalnız sol kenar ışığı). Kapı x 260–820 y 560–1150 (**≥ %35**), P02a'daki aynı kapı. **BMC-D6:** kenar kızıl ışık 160–204 → **kapı itilir yerel 212 (abs 2386)** (`darbe {kare:212, siddet 0.5, duman:true}`, `alev` 3 katman) → bir kanat menteşede sallanır 212–262, öbürü yerinde; **T3** (≈28, kemikli, kaşlarda toz) sağda x 830–1040 y 700–1260 (boy ≈ 560, yüz ≥ 75 px) bir adım geri çekilir 220–245: **kontrollü şaşkınlık**, korku maskesi yok, kovaya uzanmaz. Hangar içi kor/koyu. Kapanış: kanat durur 262–270. Foley ates-tutus 212 · kapi-catirti 212 · mentese-gicirti 215–262 · yangın çıtırtı yatağı. **kontrol_kare yerel 214 (abs 2388).** Ekran yazısı 160–330 üstte (kapı y ≥ 560, binmez). Alt 1/3: güverte tahtası + yere yansıyan turuncu havuz + T3'ün ayakları.
**P07c · 2444–2607 (yerel 270–433), LIMAN `kiyidan-ada` (= P01 kadrajı), geniş, bekle.** Aynı kamera (b=190°, ufuk 800); gemi artık **yanan**: kalın duman sütunu kadrajın üstünden çıkar (fade yok), kıç köpüğü boşa, **baş çıpa zinciri gergin** (P03), gemi ekranda hareketsiz; kamera geri çekilir cs 1.12→1.0 (yerel 280–433). Okur: "dönemiyordu" 5.9–6.57 (yerel 354–394). Alt 1/3: ön plan kaya + oyukta (P01'deki yerde) dumansız karanlık; kuru ot. Işık: alev turuncusu gemide ikincil, güneş ana (rel 45).
- **Taşıyıcı** a→b yukarı kıvrılan duman + tilt; b→c duman aynı x; P07→P08 duman perdesi.

### P08 · kare 2607–2990 · ★ ANAHTAR
Abs = 2607 + yerel.
**P08a · 2607–2812 (yerel 0–205), GEMI-INSERT `bot`, orta-yakın, nefes.** Yükseklik su hizası 0.8 m, `b`=300° (rel 295). Soldaki gövde duvarı (duman perdesi arka), **iki can botu yan yana** x 120–1000 y 840–1250 (bot+tayfa ≥ %18). **BMC-D7:** A botunda **T4** (≈33, çene sıkık, şakakta ter; yüz ≥ 75 px) krank çevirir: **tık yerel 60 (abs 2667), 95 (2702), 130 (2737)**, motor tutmaz (sessiz), omuz çöker 140–165; pan sağa 150–200: tayfa B botuna geçer (adım gövde-bot boşluğu, ayak sağlam). **5 yaralı** (§4.2b) botlarda oturur, **yüzleri sakin ve görünür** (≥ 60 px, gözler aşağıda ya da ufukta; sargı #d8c9ac, kan yok, biri ötekinin omzuna yaslı; acı/inleme yok); yakın plan yok. Ekran yazısı yok (başlar 250'de).
**P08b · 2812–2990 (yerel 205–383), GEMI-INSERT `bot`, orta-yakın → orta, bekle.** Pan sürer; B botu: **öksürük 228 (abs 2835) → tutuş 245 (abs 2852)**, bot gemiden açılır 245–340, **kadrajdan sağdan çıkar 360'a kadar**; kamera geri çekilir (cs 1.4→1.0, yerel 260–383): arkada duman perdeli gemi, su, **V iz halkaları** (`dalga_izi`). Ekran yazısı 250–375 üstte. "Kimse ölmedi" 4.75–5.73 (yerel 285–344) botta yüzlü yaralılar görünürken. **Tutma:** 2.97 sn ≥ 1.0 + 1.5 ✓. kontrol_kare yerel 248 (abs 2855). Foley: krank-tik ×3 (−9) · motor-tutus 245 (öksürük 228) · bot-su 245–340.
- Alt 1/3 (a/b): su + bot tabanı + yansıma; çevre geri çekilir (b'de duman/gemi flu).
- Saklanan şey: botta kaç kişi/kim yaralı (yüzlü, sakin; sayı yazıda). **Dramatizasyon:** hangi botun ölü olduğu, krank (açıklamada belirtilir). Motor tipi gösterilmez.

### P09 · kare 2990–3172 · GEMI-INSERT `korkuluk-su` · nefes
- **Ölçek:** orta-yakın, tek çekim (3.04 sn). Yükseklik su hizası 1.5 m, `b`=320° (rel 275 sol-yan, ışık alçalmış 12°: sıcak). Odak çekmesi: yerel 0–60 gövde net, 60–110 simide kayar (`Flu`).
- **BMC-D8 (kısaltıldı: plan 3.04 sn):** gemi sancağa yatar yerel 10–150 (24 → son **yatış ≈ 22°**, sığ suda durur); **simit kancadan çıkar 66**, düşer, **suya değer yerel 100 (abs 3090)** → halkalar 100–150, döner ve durur 150–168 (≥ 12 kare pay). Simit çapı 200 px (%10.4), net 1.9 sn; konum x 380–700 y 1000–1300 (alt bant 1290'dan önce biter, altyazı simidi örtmez; y üst 1000).
- **kontrol_kare yerel 104 (abs 3094).** Foley govde-inleme 10–150 (−9) · **simit-pat 100** · kabarcik 110–150. Yok: whoosh/riser.
- Konum: batan gövde sağ x 480–1080 y 560–1250 (kadraj keser: "yarım", tam hâli P10a'da), su sol; **saklanan:** gövdenin sudan görünen kısmı yarı. Alt 1/3: su yüzeyi + yağ/köpük halkaları + simit. Ekran yazısı yok.
- **Taşıyıcı:** önceki plandan bot V izi halkası simit çevresine girer; çıkış: yatık gövde çizgisi (≈22° eğik) = P10a'da yatık enkaz çizgisi.

### P10 · kare 3172–3666 (+30 kuyruk dahil) · ★ ANAHTAR
**P10a · 3172–3406 (yerel 0–234), KIYI-BATARYA `saygi` (ön plan) + LIMAN `enkaz` (arka), orta grup, bekle — SAYGI ANI.** Kamera **sabit** (itme yok, titreme yok), tüm 3.9 sn. `b`=100° (rel 135, güneş 6° sağ-arkada: yüzlerde ve omuzlarda 2–3 px `#eec5a2` kenar ışığı, gölgede mavi-mor + kısa tarama; P05 ile aynı ışık modeli), yükseklik 1.5 m, ufuk y ≈ 800, gök 5 basamak turuncu→mor.
- **Konumlar (ayakta, sessiz, sağa = güneye = denize/enkaza bakar, profil/¾ yüz görünür):** ön sıra ayak y 1280, boy ≈ 980 px (yüz ≈ 115 px): **teğmen** x 300–520, **E1** (usta er) x 540–750, **E4** (yaşlı er) x 760–960; arka sıra ayak y 1215, boy ≈ 940 px (yüz ≈ 110 px): **E2** (genç er) x 90–290, **E3** x 330–520 (teğmenin arkasında kısmen). **Top** solda yerinde x 0–280 y 1000–1260 (namlu denize, sakin; **aynı kaya oyuğu** P01/P04). Tepe y ≈ 300 (güvenli alan üstü 220'nin altında kalmaz). Yüzler 360 px'te ≥ 37 px.
- **Arka plan:** deniz, **limanda batık gemi** (yarı yatık, bacalar/direk sudan eğik) sağ-arkada x 560–1040 y 820–930 (buğu, 3 buğu bandı, uzak), kale solda silüet. Kor, duman, ateş, selam, bayrak, tören, müzikal vurgu yok; gemi sakin.
- **Hareket:** yalnız rüzgâr (kumaş, ot) ve çok hafif nefes; hiçbir figür jest yapmaz, gülme/acı/zafer yüzü yok (ağırbaşlı). Kesme taşıyıcısı: bakış yönü (sağa, denize) → P10b harita gemi ikonu. Net tutma ≥ 3.9 sn (şart ≥ 1.5 sn).
- **Kaynak/saygı:** erler kaynaksız dramatizasyon (kimlik yok), kartlar §4.2; "Birinci Dünya Savaşı'nda … bu oldu" sesi sırasında yüzler okunur. Ekran yazısı yok bu çekimde (yazı bandı kafalara binmesin; "1920'de yüzdürüldü" P10b'ye taşındı). Altyazı alt bantta (ayaklar y ≤ 1280).
- Alt 1/3: kaya zemin, ot, uzayan 6° gölgeler (sağ-ön yönünden, sola-öne), ayak ve temas gölgeleri.
- Ölü alan: yok (grup + gökyüzü + enkaz + kaya). **Kurulum → karşılık:** P01 kaya oyuğu ve P04 namlu → aynı mevzi, artık içinde insanlar.

**P10b · 3406–3666 (yerel 234–494), HARITA-MEIS (YENİ görünüm), geniş harita, nefes.** Parşömen, Meis + Kaş şeridi (ada solda-aşağıda, Kaş yukarıda-sağda; 2 km). "Ateş de denizden değil" 4.41–5.78 (yerel 265–347): kamera denizin boş yüzeyinde (sade dalga taraması, kıyı yok) → **"karadan"** (6.12–6.54 = 367–392): `kamera_takip` rota ucunda; `rota_ciz {bas:330, bit:412}` Kaş mevzii → Meis limanı (gemi ikonu: enkaz); **`igne {kare:426, dusme:14}`** gemi ikonunda, pirinç iğne batar (temas `igne-tak`, abs 3598). Çizgi = P01'deki mürekkep çizgisi (döngü: P10 son karesi ↔ P01 ilk karesi). Etiketler yazı katmanında (`svg_etiket:false`): "Kaş", "Meis / Kastellorizo", "2 km". Foley igne-tak 426 (−9), kısık dalga. Yazı "1920'de yüzdürüldü" yerel 245–350 üstte (P10a'dan taşındı). Kuyruk: iğne sonrası yerel 440–494 harita durur, sessiz (≥ 1 sn dinlenme). kontrol_kare **yerel 430 (abs 3602)**.
- **Tutma:** P10b 4.33 sn (okuma 2.7 + 1.5 = 4.2 ✓, +30 kare kuyrukla) ve konuşma sonrası 1.14 sn sessizlik = bölümün ≥1 sn dinlenmesi. P10a saygı anı ayrıca ≥ 3.9 sn sabit.
- Alt 1/3: harita altı (parşömen, pusula gülü, deniz taraması, ölçek çubuğu); sayaç kutusu yok.

## 5. Kurulum → karşılık (görüntü)
| kurulum | yer | karşılık | yer |
|---|---|---|---|
| mürekkep çizgi kayadan gemiye | P01 | harita çizgisi + iğne | P10b |
| kaya oyuğu (karanlık) | P01 | namlu ucu parıltı | P04 |
| namlu ucu (540,900) | P04 | el + namlu + teğmen | P05 |
| teğmen sakin eli | P05 | namlu atışı | P06 V1 |
| kapalı hangar kapısı | P02a | kapı içerden itilir | P07b |
| derrick + gemi başı çıpa/zincir | P02a, P03b | gemi dönemiyor (zincir gergin) | P07c |
| 3 can botu | P02a | tek çalışan bot | P08 |
| sancak simidi | P02b | suya düşer | P09 |
| P01 kadrajı (sağlam) | P01 | yanan (P07c) | |
| kaya oyuğu / mevzi (P01, P04) | P01, P04 | erler topun yanında, sessiz; arkada enkaz | P10a |

## 6. Anahtar tutma payı (okuma + 1.5 sn)
| plan | ifade | okuma | gereken | var |
|---|---|---|---|---|
| P06 | "Üçüncü mermi gemiye isabet etti" (6.40–8.50) | 2.1 | 3.6 | V3 2.92 + P07a'nın aynı dumanlı ilk 0.7 = **3.6** (kesme taşıyıcılı) |
| P08 | "Kimse ölmedi" (4.75–5.73) | 1.0 | 2.5 | P08b **2.97** ✓ |
| P10 | "Ateş de denizden değil, karadan gelmişti" (4.41–7.10) | 2.7 | 4.2 | P10b **4.33** ✓ (+30 kare kuyruk dahil) |
Çevre geri çekilmesi: P06 V3 itme + yazı sade; P08b kamera geri çekilir, gemi flu; P10b kamera takip, çevre sakin.

## 7. Saklanan şey (halkalar, ~15–20 sn)
P01 çizgi oyukta biter (0–18 sn) → P04 namlu ucu (18–23) → P05 top yarım, teğmen (23–27) → P06 sütun yok, kapı kapalı (27–36; hangar içi P07b'de bile gösterilmez) → P08 sargılı yaralılar (yüzlü, sayı yazıda) → P09 gövde yarım → P10a erler ve arkada tam enkaz.

## 8. Fizik / giriş-çıkış kontrolü
Derrick ucu güvertede, uçak suya inerken gövdeye çarpmaz (sancak boşluğu); tayfa (T1–T4, yüzlü) güverte tahtasında, ayaklar y ≤ 1480 (P02a'da ≈ 1250, P07b ≈ 1260); kapı dışa açılır (hasarlı kanat menteşede); simit sancak (su) tarafında; bot gemiden aşağı iner, sağdan kadrajı terk eder; yürüyüş yok (gait gerekmez). Gemi su hattı sabit, yalnız P09'da yatış (suya gömülen kenar P10a arka planı ile aynı). Gemi demirli: baş çıpa zinciri gergin (P03b → P07c). Katır görünmez (sadece izi, P04; P05 ön planda flu başı). **Kedi/köpek yok.**

## 9. Yeni şablonlar için en az gereken parametre listesi (motion)
Ortak (üç şablon + harita): `dunya {isik_azimut:235, gun_yuksekligi (anahtarlı 22→6), seed}`, `kamera {konum_yol [x,y,z m], yon_yol (pan/tilt/roll °), kare[], egri}` · **optik:** `lens_mm` yolu (zoom ve dolly zoom), `odak_z` yolu (rack focus: odak mesafesi z m, kare aralığı), `diyafram` (katman başına bulanıklık yarıçapı; z ile ölçeklenir, deep/shallow), `ekipman` etiketi (slider|dolly|jib|crane|steadicam|tripod → eğri karakteri) (cs/cx/cy türetilir; kör 2D ölçek yok), `katman_z` (her katmanın gerçek mesafesi, m; paralaks ve dolly zoom buradan), `ufuk_y`, `tarama`, `atmosfer {sis, tuz, buğu bantları}`, litografi gök (5 basamak), temas gölgeli figür. Işık yönü kamera yönünden hesaplanır (`rel = 235 − b`).

**LIMAN** (kod: ada, gemi, su, gök, uzak kıyı): 
- `gorunum`: `kiyidan-ada` (P01/P06 V1 arka/P07c) · `ada-rihtim` (P03a) · `karsi-kiyi` (P03c) · `rihtim-yan` (P06 V2) · `hangar-yakin` (P06 V3) · `enkaz` (P10a, arka plan; ön plan KIYI-BATARYA `saygi`)
- `gemi_durum` (anahtarlı): `demirli | vurulmus | yanan | yatik | batik` (+ `yatis_derece`, `su_cizgisi_y`)
- `gemi {hangar_kapi: kapali|acik, baca_sayisi 2, derrick, hangar_konum: arka-baca-gerisi}`; `zincir {gerilim 0..1}`
- `su_sutunu[] {kare, x, yukseklik_px, yaricap, tutma_kare}` (yüksel 24 / tut / çök 22 + halka); `halkalar[]`
- `isabet {kare, x, y}` → `darbe`; `hangar_alev {bas, siddet}`; `duman {bas, kaynak (hangar|baca), yogunluk}` (üstten çıkar, fade yok); `kic_kopugu {acik}`
- `cizgi_mevzi {bas, bit, a, b}` (P01); `olcu_cizgisi {bas, bit, a, b}` (P03c); `bot[] {id, x, y, durum}` (uzak)
- `ada {kale, bayrak: tricolore, ev_seed}`; `karsi_kiyi {sirt_katman: 3, taze_iz}`; `on_plan: kaya_oyugu` (ortak asset, KIYI-BATARYA ile aynı kaya)
- `katman_z` örnek: ön plan kaya/ot 12 m · su yolu 20–2000 · gemi 2000 · ada/kale 2100–2400 · sırt 3000 · gök sonsuz (P01); dolly zoom ve paralaks bunlardan hesaplanır
- `kamera_dil`/`itme` yalnız HARITA-MEIS ve düz insert

**GEMI-INSERT** (güverte/borda/bot yakın planları, hepsi aynı gemi modeli; yüzlü tayfa T1–T4 ve yaralılar; siluet yalnız < %5):
- `gorunum`: `kic | korkuluk | bas-capa | kic-su | hangar-kapi | bot | korkuluk-su`
- `derrick {bas, bit, ip}`; `ucak {tip: genel-short, durum: asili|iniyor|suda, samandira_temas_kare}`
- `hangar_kapi {durum: kapali|isik_sizar|itilir|salinir, bas, kare}` (iç koyu/kor; içerik gösterilmez)
- `simit {durum: asili|kancadan|suda, kare, boy_px}` (sancak); `botlar[] {id, durum, motor: olu|tutar, pozisyon}`; `krank {bot, tik[]}`; `bot_hareket {bas, bit, cikis: sag}`
- `capa {durum: asili|iniyor|suda|gergin, kare...}`, `zincir {gerilme_kare}`
- `gemi_yatis {derece, bas, bit}`; `tayfa[] {kim (T1|T2|T3|T4|yarali-1..5; yüz kartı), jest: halat|yonlendir|geri-adim|omuz-coker|krank|adim-gec|yarali-oturur, kare[]}`
- `su {halka[], kopuk, dalga_izi}`, `yangin {alev, duman, havuz}`

**KIYI-BATARYA** (karşı kıyı, kaya oyuğu, top, teğmen):
- `gorunum`: `yamac-oyuk` (P04) · `tegmen` (P05) · `top-onplan` (P06 V1) · `saygi` (P10a)
- `kaya_oyugu {namlu_gorunur 0..1 (yalnız ucu | tam), parilti {kare, sure}}`
- `top {atis[] {kare}, geri_tepme_px 24, toz {KE-E4}, kundak}`; `ates_yonu`
- `tegmen {poz: profil, bakis: [x,y], jest: avuc-pat {kare[]}, el: tek-parca}` (**yeni karakter**: nötr kep/haki, yüz yakın plan)
- `erler[] {kart: E1|E2|E3|E4, x, ayak_y, boy_px, poz: nisan|mermi|halat|dik-bakis, bakis, flu}` (**yüzlü er kuklası**, 4 kart parametresi: yüz kemiği, bıyık/sakal, kaş/yara izi, ten, yaş çizgisi; yüz ≥ 110 px)
- `katir {goruntu: kulak|bas|yok, flu}`; `cevre {ot, tas, katir_izi}`; `gemi_uzak {x, y, olcek}` (P06 V1 gemi referansı LIMAN ile aynı)

**HARITA-MEIS** (`harita_gorunum: "meis"`): kıyı çizgisi verisi kamu malı (Natural Earth 10m benzeri; Kaş + Meis + Ayios Stefanos), `rota_noktalar`, `rota_ciz`, `kamera_takip`, `igne`, ikonlar `{gemi: demirli|enkaz, top}`, 2 km ölçek, deniz taraması, etiketler yazı katmanında (`svg_etiket:false`, TR/EN).

## 10. Kalibrasyon (yön karesi) — en temsilî 2 kare
1. **P01 yerel 124 (abs 124)** — LIMAN `kiyidan-ada` + ön plan kaya/çizgi: ışık (kontrajur, su yolu), sıcak–soğuk, derinlik, tarama, ölçek; aynı zamanda kapak. Dört çekimde (P01, P06 V1, P07c, P10a) tekrar eden kadraj olduğu için LIMAN'ı tek karede sınar.
2. **P07b yerel 214 (abs 2388)** — GEMI-INSERT hangar kapısı + alev: tek ışık = alev, mavi-mor gölge, kapı + T3 yüzü, darbe/duman; savaş tonu "ölçülü". GEMI-INSERT şablonunun en zor ışık/figür kombinasyonu.
- **Yedek (Paris çıtası: yeni karakter yön karesi şart):** P05 yerel 150 (teğmen profil, yüz+el). Sayılan 2 kareye dahil değil; orkestra yön karesine ekler ya da P05 ayrı gider. HARITA-MEIS düşük risk (mevcut HARITA dili) → kalibrasyon kapsamında değil, ilk bölüm renderında kabul.

## 11. Kural ve doğrulayıcı notları
- Her animasyon plan sonundan ≥ 12 kare önce biter (P06 isabet 464 + hold; P08b 360; P09 168 < 182−12=170 ✓; P10b iğne 426 + 38 pay).
- Dokunuş süreleri plan süresine ve ses zamanlarına göre kaydırıldı (BMC-D1 0.5–4.3; D2 2.5–4.25; D6 2.0–4.4; D8 1.1–2.8; kaynak: dokunuslar.md'deki aralıklar artık yerel konumlarla bağlı). Dokunuş sayısı 8 (değişmedi).
- Okunurluk (≥%10 ve ≥1 sn): D1 uçak %30+ 4.3 sn · D2 çıpa %25+ 2.3 sn · D3 namlu ucu %12 1.3 sn · D4 el %15 2.0 sn · D5 su sütunu %25 ~1 sn her biri, isabet 1.4 sn · D6 kapı %35 2.0 sn · D7 bot %18+ 2.97 sn · D8 simit %10.4 1.9 sn.
- Açık sorular: bkz. katkı raporu.

## 12. Çekim kartları (SINEMATOGRAFI-SOZLUK.md §9 biçimi; 19 çekim)
Kamera 2.5D dünyada gerçek z (m) ile gezer; lens tam kare eşdeğer mm (300 ≈ 7° yatay, 85 ≈ 24°, 50 ≈ 40°, 35 ≈ 55°, 24 ≈ 74°). Her hareket plan sonundan ≥ 12 kare önce biter. Shaky Cam, Crash Zoom, Whip/Swish Pan, Dutch Angle **yok**; `darbe` yalnız P06 V3 ve P07b (≤ 2 px). §4'teki eski "itme/cs/yükseklik" ifadelerinde çelişki olursa **bu kartlar geçerlidir**.

**P01 · kare 0–190 · LIMAN**
```
DUYGU: KADER → DÖNGÜ
DUYGU: SAYGI / SÜKÛNET
DUYGU: RAHATLAMA / HÜZÜN
DUYGU: HÜZÜN / GERİLİM (yavaş umut)
DUYGU: ÇARESİZLİK (kaçınılmazlık)
DUYGU: KONTROL KAYBI / ŞOK (kontrollü)
DUYGU: KONTROL KAYBI (sessiz, ölçekle)
DUYGU: KEŞİF → HUZURSUZ SAKİNLİK
DUYGU: GÜVEN (bağlanma)
DUYGU: GÜVEN → KEŞİF
DUYGU: MERAK / ÖNEM (ipucu)
DUYGU: HAYRANLIK (mühendislik, güvenlik)
DUYGU: MERAK / TEHDİT (gizli gözlem)
WIDE SHOT (WS) — gemi ≈ %65 genişlik
EYE LEVEL (1.2 m, kıyı kayası üstü)
DOLLY IN + LATERAL TRACKING (Truck Left) + PARALLAX — z 0→+3 m, x 0→−0.6 m, f0–175, sonra Static Hold 15 kare
DOLLY TRACK (kaya üstü kısa ray)
300MM TELEPHOTO — LONG LENS COMPRESSION
SHALLOW FOCUS: ön plan kaya (z 12 m) yumuşak σ4; gemi (z 2000 m), ada (z 2100–2400 m) net; sabit
SLOW, SMOOTH, EASE OUT (decelerating)
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 merak ve hafif tehdit; Q5 yavaş dolly + telefoto gözetleme hissini kuruyor, süs değil; Q6 gemi ve çizgi görünür, oyuğun içi (kim/ne) saklı.

**P02a · kare 190–480 (yerel 0–290) · GEMI-INSERT `kic`**
```
MEDIUM WIDE SHOT (MWS) / THREE SHOT: T1, T2 + uçak
LOW ANGLE (1.0 m, güverte; derrick ve uçak yukarıda, ihtişam)
LATERAL TRACKING (Truck Right) + DOLLY IN + PARALLAX — x 0→+1.5 m, z 0→+1 m, f0–265
DOLLY TRACK (güverte boyunca ray)
35MM WIDE-ANGLE LENS
DEEP FOCUS: halat/tayfa (z 3 m), uçak/derrick (z 4 m), kapı (z 6 m), botlar (z 9 m) hepsi net; sabit
SMOOTH, CONSTANT SPEED, sonra EASE OUT
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 gemiye hayranlık ve rahatlık; Q5 alçak açı + paralaks derrick/uçağı büyük, kapı/botları derinde gösteriyor; Q6 kapı, botlar görünür (kurulum), simit sonraki çekime saklı.

**P02b · kare 480–603 (yerel 290–413) · GEMI-INSERT `korkuluk`**
```
INSERT SHOT (simit) → MEDIUM CLOSE-UP
EYE LEVEL (1.4 m, sancak korkuluğu)
PAN LEFT 25° (kapı ve botlardan simide), ardından STATIC HOLD 28 kare (f385–413)
TRIPOD + FLUID HEAD
50MM LENS
DEEP FOCUS (simit z 2.5 m, bot z 8 m); sabit
CONTROLLED, EASE IN / EASE OUT
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 'bu nesne önemli' hissi; Q5 pan kurulum nesnelerini sırayla taşıyor, tutma simidi işaretliyor; Q6 simit görünür, neden önemli olduğu henüz saklı.

**P03a · kare 603–729 (yerel 0–126) · LIMAN `ada-rihtim`**
```
ESTABLISHING SHOT — EXTREME WIDE SHOT (EWS)
HIGH ANGLE → EYE LEVEL (kale terasından 28 m → rıhtım hizası 6 m)
CRANE DOWN + TILT UP — y 28→6 m, tilt −22°→−4°, f0–112, 14 kare tutma
CRANE (Technocrane, sanal)
24MM ULTRA WIDE LENS
DEEP FOCUS: kale, liman, gemi (z 150–800 m) net
SMOOTH, FLUID, DECELERATING
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 güvenli liman, geniş dünya; Q5 Crane Down dünyaya dönüş, mekânı açıyor ve göz hizasına iniyor; Q6 ada, kale, gemi görünür; karşı kıyıya henüz bakılmaz.

**P03b · kare 729–867 (yerel 126–264) · GEMI-INSERT `bas-capa`**
```
INSERT SHOT (çıpa, zincir)
LOW ANGLE (güverte hizasından makaraya yukarı, 1.2 m)
FOLLOW SHOT: PEDESTAL DOWN + TILT DOWN — y 2.0→1.2 m, f126–245, çıpayı takip; son 19 kare Static Hold
JIB ARM (kısa)
50MM LENS
SHALLOW FOCUS: çıpa/zincir (z 2.0 m) net; su ve ufuk yumuşak; sabit
CONTROLLED, ACCELERATING (düşüşle), sonra decelerating
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 gemi bağlandı, sağlam; Q5 çıpayı izleyen jib düşüşü ve gerilmeyi okutuyor; Q6 zincirin gerilmesi görünür, ufuk saklı (tehdit sonra).

**P03c · kare 867–1091 (yerel 264–488) · LIMAN `karsi-kiyi`**
```
WIDE SHOT (WS) — POINT OF VIEW (geminin güvertesinden mürettebatın bakışı)
EYE LEVEL (6 m, baş güvertesi)
DOLLY IN + PARALLAX — z 0→+6 m (ön plan korkuluk köşesi), f264–470
DOLLY TRACK (güverte rayı)
300MM TELEPHOTO — LONG LENS COMPRESSION
SHALLOW FOCUS: korkuluk (z 3 m) yumuşak σ5; karşı kıyı (z 2000 m) net; sabit
VERY SLOW, CONSTANT SPEED
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 sakin ama boş kıyıya şüpheli bakış; Q5 POV + yavaş dolly + telefoto gözetlenme ve negatif alan veriyor; Q6 kıyı boş görünür, saklı olan gösterilmez.

**P04 · kare 1091–1388 · KIYI-BATARYA `yamac-oyuk` — DOLLY ZOOM (bölümün tek kullanımı)**
```
DUYGU: ŞAŞKINLIK (boş kıyı artık boş değil)
WIDE SHOT (WS) → INSERT SHOT (namlu ucu)
EYE LEVEL (3.0 m, deniz hizası)
DOLLY ZOOM / VERTIGO EFFECT — kamera z 0→−7 m (Dolly Out), zoom 120→288 mm, f0–250, Static Hold f250–297 (47 kare kuyruk)
DOLLY TRACK + MOTORIZED ZOOM (aynı eğri: z ve odak oranı sabit)
120→288MM ZOOM — arka plan 2.4× büyür
DEEP FOCUS: ön plan taşı (z 5→12 m, ekranda sabit %14 = 270 px, y 1180–1450) ve kıyı net
VERY SLOW, EASE IN / EASE OUT; parıltı f190'da (ilerleme ≈ 0.85; namlu ucu ≥ %12; yetmezse odak_son 336)
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 gerçeklik algısının kayması, şaşkınlık; Q5 dolly zoom tek, bölümün en güçlü anı ve duyguya doğrudan hizmet ediyor; Q6 kıyı ve namlu ucu görünür, top gövdesi/kişiler saklı.

**P05 · kare 1388–1627 · KIYI-BATARYA `tegmen`**
```
DUYGU: KARARLILIK / GÜÇ (onurlu, gösterişsiz)
INSERT SHOT (el + namlu) → MEDIUM CLOSE-UP / PROFILE SHOT, DIRTY SINGLE (E1, E3 arkada)
LOW ANGLE (0.5 m yer seviyesine yakın; teğmen ve top aşağıdan)
ARC SHOT (namlu ucu çevresinde +25°) + SLOW PUSH IN + RACK FOCUS — yay f0–110, z 0→+0.4 m f60–190; netlik f124–150; Static Hold f190–239
DOLLY TRACK (kısa kavisli ray, sanal)
85MM LENS
SHALLOW FOCUS + RACK FOCUS: el/namlu (z 0.5 m) → teğmen yüzü (z 1.1 m) f124–150 ('Mustafa'); arka erler (z 4–6 m) σ2
SLOW, CONTROLLED, EASE OUT
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 sakin güç; Q5 arc karakterin önemini, yavaş push-in ve rack focus kararlılığı veriyor, kahramanlaştırma yok; Q6 el ve yüz görünür, top gövdesi ve boyutu saklı (P06'ya).

**P06 V1 · kare 1627–1867 (yerel 0–240) · KIYI-BATARYA `top-onplan`**
```
DUYGU: GERİLİM (beklenti)
OVER-THE-SHOULDER (OTS) — E1'in omzu üstü, DIRTY SINGLE (E2 arkada, E3 sol-alt)
HIP LEVEL (1.1 m)
DOLLY IN + RACK FOCUS — z 0→+2 m, f0–170; netlik f100–150; Static Hold f170–240 (atışta kamera durur)
DOLLY TRACK (steady)
85MM LENS
SHALLOW FOCUS + RACK FOCUS: E1 yanağı/omzu (z 2.2 m) → gemi (z 2000 m) f100–150 ('iki saat sonra … ateş açtı')
SLOW, EASE IN, CONTROLLED; atış anında STATIC HOLD
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 gerilim; Q5 OTS + yavaş dolly + rack focus bakışı hedefe taşıyor, atışta kamera sabit (gösteri yok); Q6 gemi hedefi görünür, merminin nereye düşeceği saklı.

**P06 V2 · kare 1867–1999 (yerel 240–372) · LIMAN `rihtim-yan`**
```
DUYGU: GERİLİM (beklenti) → bekleyiş
MEDIUM WIDE SHOT (MWS)
EYE LEVEL (1.8 m, rıhtım ucu)
LATERAL TRACKING (Truck Left) + PARALLAX + PAN LEFT 6° — x 0→−3 m, f240–360
DOLLY TRACK (rıhtım boyunca)
50MM LENS
DEEP FOCUS: sütunlar (z 30 m) ve gemi (z 45 m) net
SMOOTH, CONSTANT SPEED
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 beklenti; Q5 yanal kayma iki sütunu aynı akışta taşıyor, üçüncüyü bekletiyor; Q6 iki sütun görünür, üçüncü merminin yeri saklı.

**P06 V3 · kare 1999–2174 (yerel 372–547) · LIMAN `hangar-yakin`**
```
DUYGU: FARK EDİŞ (sütun yok)
MEDIUM SHOT (MS) — arka baca, hangar kapısı
LOW ANGLE (1.0 m, su hizasına yakın rıhtım; gemi yukarıda ağır)
DOLLY IN + RACK FOCUS — z 0→+3 m, f372–500; netlik f380–425 (halkalar → kapı); isabet f464'te kamera sürer (darbe ≤ 2 px); Static Hold f500–547
DOLLY TRACK
100MM LENS
SHALLOW FOCUS + RACK FOCUS: halkalar (z 10 m) → kapı ve baca (z 45 m) f380–425, sonra sabit
VERY SLOW, DECELERATING
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 'bu sefer su yok' fark edişi; Q5 yavaş dolly + rack focus (halka → kapı) dikkati hedefe çekiyor, isabette sarsıntı yok; Q6 kapı üstü görünür, hangar içi saklı. Slow motion kullanılmadı: yokluk ve tutma yeterli.

**P07a · kare 2174–2324 (yerel 0–150) · GEMI-INSERT `kic-su`**
```
MEDIUM SHOT (MS)
EYE LEVEL → HIGH ANGLE (kıç korkuluğundan suya bakış)
CRANE DOWN + TILT DOWN — y 2.0→0.8 m, tilt −18°, f0–125; Static Hold f125–150
JIB ARM / CRANE (sanal)
50MM LENS
SHALLOW FOCUS: dümen ve köpük (z 6 m) net; duman (z 15 m) yumuşak
CONTROLLED, FLUID, DECELERATING
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 gemi artık yönetilmiyor; Q5 crane/tilt aşağı düşüşü ve güçsüzlüğü veriyor, handheld/dutch yok; Q6 bozuk dümen ve boşa köpük görünür, hasarın boyu saklı.

**P07b · kare 2324–2444 (yerel 150–270) · GEMI-INSERT `hangar-kapi`**
```
MEDIUM CLOSE-UP (MCU) — kapı + T3, DIRTY SINGLE
EYE LEVEL (1.2 m)
DOLLY IN (çok yavaş) + STATIC HOLD — z 0→+0.8 m f150–245; kanat sallanırken Static Hold f245–270
SLIDER
85MM LENS
SHALLOW FOCUS: kapı (z 4 m) net; T3 (z 2.8 m) hafif σ1.5 (yüz okunur); sabit
VERY SLOW, EASE OUT
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 şok ama panik gösterisi yok; Q5 çok yavaş dolly + yakın kapı asimetrisi gerilimi artırıyor; Q6 kapı ve T3 yüzü görünür, hangarın içi saklı.

**P07c · kare 2444–2607 (yerel 270–433) · LIMAN `kiyidan-ada` (P01 noktası)**
```
WIDE SHOT (WS)
EYE LEVEL (1.2 m)
DOLLY OUT (Pull Out) — z 0→−3 m, f270–420; Static Hold f420–433
DOLLY TRACK (kaya üstü, P01 ile aynı ray)
300MM TELEPHOTO — LONG LENS COMPRESSION
SHALLOW FOCUS: kaya (z 12 m) σ4; gemi net; sabit
VERY SLOW, DECELERATING
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 gemi çakılı kaldı; Q5 dolly out + telefoto baskısı yalnızlığı ve çaresizliği veriyor; Q6 yanan gemi ve duman görünür, kimin ne yaptığı saklı.

**P08a · kare 2607–2812 (yerel 0–205) · GEMI-INSERT `bot`**
```
MEDIUM SHOT (MS) / GROUP SHOT (T4, yaralılar)
EYE LEVEL (oturan tayfanın göz hizası, 0.9 m su hizası)
SIDE TRACKING (Truck Right) + RACK FOCUS — x 0→+3 m, f0–195; netlik f150–195
STEADICAM (botun yanında, süzülme)
50MM LENS
SHALLOW FOCUS + RACK FOCUS: A botu krank (z 2 m) → B botu (z 5 m) f150–195
SMOOTH, FLUID, CONSTANT SPEED
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 çabanın ağırlığı, hâlâ umut; Q5 yan takip + göz hizası + rack focus ölü motordan çalışana geçişi taşıyor; Q6 kranktaki T4 ve botlar görünür, sonuç (motor tutacak mı) saklı.

**P08b · kare 2812–2990 (yerel 205–383) · GEMI-INSERT `bot`**
```
MEDIUM WIDE SHOT → WIDE SHOT, GROUP SHOT (yaralılar)
EYE LEVEL → HIGH ANGLE (0.8→2.5 m)
DOLLY OUT + CRANE UP (Pull Back) — x +3→+4 m, z 0→−6 m, y 0.8→2.5 m, f205–365; Static Hold f365–383
JIB / CRANE (sanal)
50MM LENS
DEEP FOCUS (bot z 5→10 m, gemi z 25 m net)
SMOOTH, FLUID, DECELERATING
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 kurtuluş ve ağırlık; Q5 dolly out + crane up uzaklaşma ve büyük resmi veriyor, 'Kimse ölmedi' sırasında yüzler okunuyor; Q6 yaralılar ve yanan gemi görünür, kayıplar saklı değil (yok).

**P09 · kare 2990–3172 · GEMI-INSERT `korkuluk-su`**
```
DUYGU: KAYIP / KAÇINILMAZLIK
INSERT SHOT (simit) → MEDIUM CLOSE-UP
LOW ANGLE (su hizasına: 1.5→0.9 m)
PEDESTAL DOWN + RACK FOCUS — y 1.5→0.9 m, f0–165; netlik f60–110
JIB ARM (kısa)
85MM LENS
SHALLOW FOCUS + RACK FOCUS: yatan gövde (z 8 m) → simit (z 3 m) f60–110
SLOW, CONTROLLED, EASE OUT
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 sessiz kayıp; Q5 su hizasına iniş ve netliğin simide geçişi gemiyi geride bırakıyor, slow motion kullanılmadı (yatış zaten yavaş); Q6 yarım gövde görünür, tam enkaz P10a'ya saklı.

**P10a · kare 3172–3406 · KIYI-BATARYA `saygi` + LIMAN `enkaz` — SAYGI ANI**
```
GROUP SHOT (teğmen + E1–E4) — arkada ESTABLISHING enkaz
LOW ANGLE, hafif (1.1 m; yaklaşık 8° aşağıdan)
LOCKED-OFF SHOT — STATIC HOLD (3.9 sn)
TRIPOD (kilitli)
50MM LENS (insan gözüne yakın, abartısız)
DEEP FOCUS: erler (z 5–7 m) ve enkaz (z 2000 m) net; sabit
STATIC HOLD
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 sükûnet ve saygı; Q5 hareket yok, süs değil, yüzler duygunun taşıyıcısı; Q6 erler ve enkaz görünür, ölüm gösterisi yok. Slow motion yok.

**P10b · kare 3406–3666 · HARITA-MEIS**
```
TOP SHOT / OVERHEAD (harita) — ESTABLISHING
TOP SHOT
TRACKING (rota ucunu izler) + SLOW ZOOM IN — kit `kamera_takip` + `kamera_dil.itme` 0.04 (2D)
MOTION CONTROL RIG (sanal, kit)
LENS YOK (2D harita)
DEEP FOCUS (harita düz)
SLOW, CONSTANT SPEED, sonra STATIC HOLD (30 kare kuyruk)
60 FPS
9:16 ASPECT RATIO
```
- Gerekçe (7 soru, 1/5/6): Q1 kaçınılmazlık, çizgi kapanıyor; Q5 top shot + rota ucu takibi kaderi ve döngüyü veriyor; Q6 çizgi ve iğne görünür, ilk karede saklı olan cevaplanır (döngü P01'e).

### Duygu eğrisi (SINEMATOGRAFI-DUYGU §8–10)
P01 merak/tehdit → P02a hayranlık, P02b merak/önem → P03 güven → keşif (P03c huzursuz sakinlik) → **P04 şaşkınlık** (dolly zoom) → P05 kararlılık/güç (onurlu) → P06 gerilim (V1, V2) → fark ediş (V3) → P07 kontrol kaybı (ölçek, netlik, sessizlik; handheld/dutch yok) → çaresizlik (P07c) → P08 hüzün/gerilim → rahatlama/hüzün → P09 kayıp/kaçınılmazlık → **P10a saygı/sükûnet** → P10b kader → döngü. Önerilen eğriye göre tek düzeltme: P02'ye "merak/önem" (P02b), P03'e "huzursuz sakinlik" (P03c), P07'ye "çaresizlik" (P07c) eklendi.
**Duyguya göre değişen kartlar:** P02a (Eye → Low Angle, hayranlık), P05 (Pull Out → Slow Push In, güç/kararlılık; Pull Out yalnızlık verirdi), P06 V3 (rack focus eklendi, fark ediş), P08a (Low → Eye Level, empati). Diğer 15 kartın tekniği duyguyla zaten uyumlu; yalnız duygu ve gerekçe yazıldı.
**Slow motion:** kullanılmadı (P06 isabet ve P09 yatış zaten yeterince ağır; gösteri riski). **Panik seti** (handheld, whip, dutch, crash zoom): yok.

### Çeşitlilik denetimi
- **Rack focus (5):** P05 (el/namlu → teğmen yüzü, f124–150), P06 V1 (E1 → gemi, f100–150), P06 V3 (halkalar → kapı, f380–425), P08a (A botu → B botu, f150–195), P09 (gövde → simit, f60–110). Netlik olayı olmayan çekimlerde derinlik bilinçli: deep ya da sabit shallow.
- **POV:** P03c (geminin güvertesinden mürettebatın bakışı). **OTS:** P06 V1 (E1'in omzu üstünden gemi; P05'te yüz okunması gerektiği için OTS orada değil).
- **Alçak açı:** P02a, P03b, P05, P06 V3, P09, P10a. **Yüksek açı / Establishing EWS:** P03a (Crane Down), P07a sonu, P08b sonu, P10b (Top Shot).
- **Dolly Zoom:** yalnız P04. **Paralaks:** P01, P02a, P03c, P06 V2. **Kilitli çekim:** yalnız P10a (bilinçli tutma).
- Üst üste aynı ölçek+hareket yok (en çok 2): ardışık hareketler Dolly In · Truck+Dolly · Pan · Crane Down · Pedestal Down · Dolly In (POV) · Dolly Zoom · Arc+Pull Out · Dolly In · Truck · Dolly In · Crane Down · Dolly In · Dolly Out · Side Tracking · Dolly Out+Crane Up · Pedestal Down · Locked-Off · Tracking.
