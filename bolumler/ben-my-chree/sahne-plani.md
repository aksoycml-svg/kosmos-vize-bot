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
Ortak (üç şablon + harita): `dunya {isik_azimut:235, gun_yuksekligi (anahtarlı 22→6), seed}`, `kamera {z_yol [m], odak_yol [mm eşdeğer], yukseklik_yol [m], yon_derece, pan_tilt, kare[], egri}` (cs/cx/cy türetilir; kör 2D ölçek yok), `katman_z` (her katmanın gerçek mesafesi, m; paralaks ve dolly zoom buradan), `ufuk_y`, `tarama`, `atmosfer {sis, tuz, buğu bantları}`, litografi gök (5 basamak), temas gölgeli figür. Işık yönü kamera yönünden hesaplanır (`rel = 235 − b`).

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

## 12. Fiziksel kamera tablosu (tur-6 / kamera notu; her çekimde anlamlı hareket)
Kamera 2.5D dünyada gerçek z (m) ile gezer; yükseklik m; odak = tam kare eşdeğer mm (300 mm ≈ 7° yatay görüş, 85 mm ≈ 24°, 50 mm ≈ 40°, 35 mm ≈ 55°). Hareketler yumuşak (inout), kısa tutma ile biter, **en az 12 kare kuyruk**; sarsıntı yok. Yalnız P10a ve anahtar okumaların son kısmı sabit (bilinçli tutma).
| çekim | hareket | z / pan-tilt yolu | odak (mm) | yükseklik (m) | gerekçe (neyi açıyor/saklıyor) |
|---|---|---|---|---|---|
| P01 | dolly-in + hafif truck sola | z 0→+3, x 0→−0.6 (kıça); f0–175 | 300 | 1.2 | Ön plan kayası (12 m) paralaksla geriye kayar, bakış oyuktan çizgiyle gemiye süzülür; oyuğun içi saklı kalır |
| P02a | truck sağa + yavaş dolly-in | x 0→+1.5, z 0→+1; f0–265 | 35 | 2.2 | Uçak inerken paralaks kapıyı ve botları geride kuran çizgiler olarak açar; kapı ve botlar yok sayılmadan ekranda kalır |
| P02b | pan sola 25° (güverteden simide) + 0.7 sn tutma | pan 0→−25°; f290–385, tutma 385–413 | 50 | 1.4 | Pan, kapı ve botlardan simide taşır; simit kurulum nesnesi olarak sabit kadrajda biter |
| P03a | truck (rıhtım boyunca, gemiyi takip) | x 0→+6, f0–95 (gemi durunca truck durur) | 35 | 3.0 | Gemi durağa oturana kadar takip, durunca kamera da durur: "demirledi"nin sakin kuruluşu |
| P03b | vinç aşağı (jib) | y 2.0→1.2, hafif tilt aşağı 8°; f126–245 | 50 | 2.0→1.2 | Çıpanın makaradan suya inişini izler, zincirin gerildiği yeri kadraja alır |
| P03c | yavaş dolly-in, ön planda flu korkuluk köşesi paralaksı | z 0→+6, f264–470 | 300 | 4.0 | Karşı kıyıya yaklaştıkça 2 km ölçü çizgisi kendini kanıtlar; kıyı boş, saklı olan gösterilmez |
| **P04** | **DOLLY ZOOM (tek)** | kamera z **0 → −7 m (geri)**, f0–250 | **120 → 288** (2.4×) | 3.0 | **Bölümün en güçlü anı.** "Oysa toplar gizlice oraya taşınmıştı": ön plan taşı (z 5→12 m, ekranda sabit yükseklik **%14 = 270 px, y 1180–1450**) yerinde dururken boş kıyı arkadan büyür ve üstümüze gelir; hiçbir şey eklenmeden mekân "boş" olmaktan çıkar; sonda oyuk ve namlu ucu merkeze oturur. Kare aralığı f0–250, kuyruk 47 kare; parıltı f190 (ilerleme ≈ 0.85, namlu ucu ≥ %12 = 230 px; yetmezse odak_son 336 mm sınırı). Ease inout; z ve odak aynı eğriyle (z/odak = sabit) |
| P05 | geri açılan dolly + hafif yay (omuz üstünden): namlu ucundan teğmenin omzu üstünden profile | z 0→−1.2, x 0→+0.8, pan sağa 10°; f0–190, tutma 190–239 | 85 | 1.5 | Aynı noktadan (540,900) açılarak önce eli, sonra yüzü ve arkadaki erleri tanıtır; yeni karakter birden belirmez |
| P06 V1 | yavaş dolly-in (iki sn), **atışta sabit** | z 0→+2, f0–170; f170–240 sabit | 85 | 1.2 | Gerilim: erlerin omzu üstünden gemiye yaklaşır, atış anında kamera durur (sarsıntı yok) |
| P06 V2 | truck sola (rıhtım boyunca) | x 0→−3, pan sola 6°; f240–360 | 50 | 1.8 | İki sütunu aynı kayma içinde ardı ardına gösterir; üçüncü sütunun yokluğuna çerçeveyi hazırlar |
| P06 V3 | dolly-in, hangar kapısına | z 0→+3, f372–500; 500–547 tutma (isabet 464'te sürer; **darbe** ≤ 2 px) | 100 | 2.0 | Kapının üzerinde "sütun yok" boşluğunu büyütür; isabette kamera durmaz, yumuşak bitirir |
| P07a | vinç aşağı + tilt aşağı | y 2.0→0.8, tilt −18°; f0–125 | 50 | 2.0→0.8 | Dumandan gövde boyunca kıç suyuna, bozulan dümene iner |
| P07b | çok yavaş dolly-in, kapı itilirken sürer | z 0→+0.8, f150–245 (kanat sallanırken tutma 245–270) | 85 | 1.2 | Kapıya odaklar; hangarın içi saklı kalır |
| P07c | dolly-out (P01 noktasından geri) | z 0→−3, f270–420 | 300 | 1.2 | Çevre açılır: gemi yerinde çakılı, duman büyüyor — "dönemiyordu" |
| P08a | truck sağa (takip) | x 0→+3, f0–195 | 50 | 0.8 | Ölü motordan çalışan bota geçişi tek harekette bağlar |
| P08b | truck sürer, sonra dolly-out + vinç yukarı | x +3→+4, sonra z 0→−6, y 0.8→2.5; f205–365 | 50 | 0.8→2.5 | Bot açılır, çevre geri çekilir; yanan gemi ve su görünür, "Kimse ölmedi" okunur |
| P09 | vinç aşağı + rack focus (gemiden simide) | y 1.5→0.9, f0–165 | 85 | 1.5→0.9 | Gemi yatarken kamera su seviyesine iner, odak simitte durur |
| **P10a** | **SABİT (bilinçli tutma: saygı anı)** | — | 85 | 1.5 | Hareket yok: yüzler ve enkaz tek kare, ağırbaşlı |
| P10b | harita: `kamera_takip` + hafif `itme` (2D) | rota ucunu izler | — | — | "Karadan" çizgisinin ucunu takip eder |
Doğrulama: her hareket plan sonundan ≥ 12 kare önce biter; paralaks için katmanlar gerçek z'de (§9); P04 dolly zoom'da ön plan taşı yüksekliği ±2 px sabit, ölçülür (kayma/kaynama yok); "itme" P04'te kullanılmaz.
