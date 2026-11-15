# Tasarım — Ben-my-Chree (tasarımcı, 2026-11-15)

Girdiler: `arastirma.md` (§5 görsel doğrulama + §10 doğrulanamayanlar), `onayli-anlatim.md` v5, `dokunuslar.md`, `sahne-plani.md` (§0 ışık, §9 şablon parametreleri), `notlar/tur-0,3` (Paris kalitesi, "görseller zengin"), Paris `tasarim.md` §13–15 + `genel-tr.jpg` / `hedef-ozet.jpg` (baktım: gök 5 düz basamak, mavi-mor gölge, gül-şeftali kenar ışığı, flu uzak katmanlar, gravür taraması, kâğıt lifi, tek doygun sıcak nokta).
Bu belge spesifikasyondur, kod/görsel değil. Hex'ler elle Lab tahminidir (±3); motion `renk_olcum.py`, eleştirmen render'da doğrular. Etiketler: **[A]** arastirma.md'de kaynaklı, **[T]** tasarım türetmesi/oran, **[G]** kanıtsız → nötr çizilir, **doğrulanmalı**.

## 0. Ön notlar
- **Yeni renk gerekçesi (CLAUDE: önce gerekçe).** `theme.ts` renkleri (paper, ink, red, gold) yazı/kâğıt katmanının kimliğidir ve aynen kalır. Aşağıdaki sahne paleti görüntü katmanı içindir (Paris §13'ün aynı pratiği): Akdeniz kışı + alçalan güneş, theme'de olmayan çelik-mavi/gül-altın/toprak tonlarını gerektirir. Yeni font yok.
- **Paris §5/§13 "turuncu alev yasak" bu bölümde uygulanmaz.** Gerekçe: Paris'te yangın kaynaksızdı; burada hangar yangını güçlü kaynaklı [A: EN-BMC] ve hikâyenin dönüm noktası. Alev tek imza nesnesidir (§2), ölçülüdür.
- **Güneş kadrajda hiç çizilmez.** Telefoto (gemi 670 px ≈ 6°, tüm kadraj ≈ 10° yatay / 18° dikey) + güneş azimut 235°, kamera b=190° → güneş eksenden 45° sağda, yani kadraj dışı (P10'da 6° yükseklikte bile ufuk y 800'ün ≈650 px üstü, yatayda dışı). Sıcaklık gökün sağ-ufuk bandından, su yolundan, kenar ışığından gelir; disk/hale çizilmez (Paris diskini çizmedi de; burada kadraj dışı olduğu fiziksel gerekçe).
- **Yön karesi (Paris çıtası, yetki devredilse de kullanıcıya gider):** yeni mekân (LIMAN, GEMI-INSERT, KIYI-BATARYA) + yeni karakter (teğmen) için kod öncesi **tek tarif karesi** gerekir. Gemini üretilmez (kullanıcı onayı yok); tarif §9'da. Orkestra karar verir: tarif metni + gerekirse kullanıcı onaylı tek Gemini hedefi.
- **Varlıklar:** bu belgede arşiv görseli kullanılmadı/indirilmedi (Wikimedia bu sunucuda 429). `varliklar.md` açılmadı. Tek dış veri: HARITA-MEIS için Natural Earth 10m kıyı çizgisi (kamu malı), motion kullanırken `varliklar.md`'ye yazar.
- **Kural özeti:** sahne (imza dışı) C* ≤ 28, L* ≤ 88; sıcak piksel ≥ %14, p95 L* ≥ 75 (her plan); kırmızı görüntüde 0 (bayrak hariç, §1); saf siyah/beyaz yok; ≤ 3 doku katmanı; seed sabit.

## 1. Bölüm paleti (hex)
Üç ışık durumu, aynı vektör, yalnız yükseklik değişir (sahne planı §0): **A** güneş 22°–18° (P01–P07), **B** 16°–12° (P08–P09), **C** 6° gün batımı (P10).

### 1.1 Gök (5 düz basamak, basamak sınırında ince çizgi/tarama; CSS gradyan yok)
| Basamak | A (gündüz, kış öğleden sonrası) | B (geç öğleden sonra) | C (gün batımı) |
|---|---|---|---|
| tepe | `#6c86b8` | `#6679ae` | `#4a4e7a` |
| üst | `#8fa3c8` | `#8c93bd` | `#6f6a9c` |
| orta | `#b3bcd2` | `#b5aec6` | `#a88aa6` |
| alt | `#dbc6cc` | `#e0c0c2` | `#cf9ea4` |
| ufuk bandı | `#ecc9b4` | `#efc0a6` | `#eeb89c` |
Bulut: 2–3 düz yatay şerit, `#e8d3d0` (ışık yüzü) / `#9a94b4` (gölge yüzü), kenar ışığı `#eec5a2`. Arşiv derecelendirmesi gök alt/ufuk C*'ını grileştirmez (ölçüm: ≥ hedefin %85'i).

### 1.2 Deniz (3 bant + ışık yolu; taraması yatay kısa vuruşlar, seed'li)
| Rol | Hex | Not |
|---|---|---|
| ışık yolu (güneş tarafı) | A `#e6c498` · B `#eac3a2` · C `#e4b496` | kısa yatay parlak şeritler; sıçrama tepe `#f3d9b6` (L* ≤ 88) |
| orta su | `#5f7fa6` | çelik-mavi |
| gölge su / gövde dibi | `#4c5780` | mavi-mor (gölge kuralı) |
| derin su (ön plan, kameraya yakın) | `#46628a` | tarama aralığı yakın = 7.5 px |
| köpük / halka | `#e6dac6` ışık · `#9aa6c0` gölge | halka düz eliptik çizgi, fade yok |
| su sütunu gövdesi | `#e6dac6` · gölge yüz `#8f9bb8` · kenar ışığı `#eec5a2` | taç sıçrama (E3); gölge yüzde 3–5 dikey tarama |

### 1.3 Kıyı, ada, Meis
| Rol | Hex | Not |
|---|---|---|
| kireçtaşı (ışık / orta / gölge / derin gölge) | `#d9b99a` / `#b89a86` / `#6f6488` / `#4a4468` | kale, ada sırtı, kıyı kayası |
| kenar ışığı (sağ-üst yüzler, 2–3 px) | `#eec5a2` | A,B; C'de `#e4b496` |
| ön plan kaya oyuğu (iç) | `#2e2a44` | saf siyah değil; içi tamamen karanlık ama mor |
| kuru maki lekeleri / kuru ot | `#8c9272` / `#a39a78` | C* ≤ 16 |
| Meis evleri (cephe, seed'li renk) | `#d9c3a0` kum · `#d4a99a` soluk gül-toprak · `#c9b38a` oker · `#a9b4bc` soluk gri-mavi · `#e0d2b8` kireç | **[G] doğrulanamadı** (arastirma §5): renk/biçim kanıtsız ⇒ soluk, tek tek ayrışmayan nötr dizi |
| ev çatısı / kepenk / gölge | `#a8826e` (soluk toprak, kiremit iddiası yok) / `#7a8a90` / `#5f5a78` | |
| tricolore (küçük, kale direği) | mavi `#5d6b96` · beyaz `#e3d8c6` · kırmızı `#b9766e` | eşit üç şerit [G], ≤ 40×27 px; kırmızı C* 28 → imza kor ile karışmaz; bu yüzden `lint izin: kirmizi` gerekmez |
| karşı kıyı sırtları (uzak→yakın) | `#9aa4c0` → `#8f9bb8` → `#7886a8` → `#5f6c90` | soğuk; sırt çizgisinde sıcak bant `#e0b898` |

### 1.4 Gemi, uçak, tayfa, nesneler (kanıtsız renk uydurulmaz — nötr)
| Rol | Hex | Not |
|---|---|---|
| gövde (ışık / orta / gölge) | `#b3aeb0` / `#8c8894` / `#5a5670` | **nötr gri-kum**; su hattı kırmızısı, baca şeridi, işaret **yok** [G: boya doğrulanamadı] |
| üstyapı / köprü üstü | `#b9b4b4` · gölge `#6a6683` | |
| bacalar (tek koyu nötr) | `#4b4a5a`, ışık kenarı `#eec5a2` | Isle of Man turuncusu kanıtsız ⇒ yok |
| direk, derrick, halat | direk `#3e3b52` · bumba `#4b4a5a` · halat `#7a6a58` | |
| güverte ahşabı | `#a8896c` (ışık) / `#6a5a68` (gölge) | |
| hangar yan duvarı / kapı | `#9a96a2` / kapı `#7a768a`, kapı çerçevesi `#4b4a5a` | kapı iç koyu `#2e2a44` |
| deniz uçağı bezi (**işaretsiz**) | `#d6c4a0`, gölge `#8a7e8a`, dikme/şamandıra ahşabı `#8a6f5a` | roundel/numara yok (kanıtsız + kırmızı) |
| can botu | gövde `#b79877` · iç `#8a7260` · kenar `#4b4a5a` | |
| can simidi | doğal mantar-bez `#c9b08a`, 4 bant `#5a5278`, halat `#7a6a58` | **kırmızı/beyaz bant yok** (kırmızı yasak, kanıtsız) |
| çıpa / zincir / makara | demir `#4c4a60`, ışık `#a8a2b4`, damla `#e6dac6` | |
| tayfa (yüzsüz) | `#585870` tek ton, kenar ışığı `#eec5a2` | koyu mavi/beyaz ayrımı yok (doğrulanamadı) |
| sargı (yaralı, P08) | `#d8c9ac` | |
| duman | ışık `#b5a9ae` · gölge `#5e566e` · çekirdek `#3a3450` · alev ışıklı alt yüz `#e0b090` | gravür tırtıklı küme, fade yok |
| kontur | `ink(dolgu)` (dolgudan türetilir), taban `#2f2d46`; kalınlık clamp(1.5, 6) ölçeğe göre | tek çizgi kalınlığı mantığı her şablonda aynı |
| harita (HARITA-MEIS) | parşömen `theme.paper/paperDark`, deniz tarama `#3e4c63`/`#52627a`, rota `#1c1915` | iğne başı mürekkep siyahı (Paris kararı) |

## 2. İmza nesnesi: **KOR** (namlu parıltısı → isabet çakımı → hangar alevi)
- **Seçim ve gerekçe.** Hikâyenin tek nedensel zinciri "kıyıdaki küçük ışık gemideki büyük ışığa dönüşür": P04 namlu ucu parıltısı → P06 V1 ağız parlaması → **P06 V3 üçüncü mermi çakımı (anahtar)** → P07b kapıdan alev → P07c yanan gemi. Tek ses-kapalı okunur motif; hikâyenin "vuruş" anını taşır; sahnede başka hiçbir şey sıcak-doygun olmaz. Eldiven gibi taşınan fiziksel nesne yok; en güçlü tekrar eden unsur ışık olayıdır (sahne planında zaten dokunuş zinciri).
- **Renk ailesi (yalnız bu):** dış yaprak `#d9501f` (h≈47°, C*≈77), orta `#f58a2e` (h≈59°, C*≈77), çekirdek `#ffd48a` (L*≈87), P04 parıltı tek nokta `#ffcf7a` (C*≈57, metalin alçak güneşi yansıtması), çakım çekirdeği `#ffe0a0`. Kontur `#3a2c36` 2.5 px. **Kırmızı betik bandı (h 340–40°) değil**; hue ≥ 42°.
- **Tekillik kuralı:** kor dışındaki her piksel C* ≤ 28 ve L* ≤ 88 (güneş ışığı/yol/kenar ışığı hue 45–70° ama C* ≤ 26). Kor C* ≥ 55 (≥ 2× sahne maksimumu; Paris'in 2.3×'ü küçük parıltı için 2.0×'e indirildi: glint ≈ 20 px). Eleştirmen betiği: imza bandı (hue 42–75°, C* > 40) yalnız kor kutularında.
- **Alevin çevresine ışığı:** havuz/yansıma (gövde, su, duman altı, tayfa kenarı) α-sınırlı, **C* ≤ 28** (`#e4b296`, `#e0b090`), 2–3 düz basamak; kor'un kendisi dışında doygun sıcak yüzey yok. Alev **tek ışık** yalnız P07b'de (güneş sol kenar ışığı kalır).
- **Tekrar eden motif (ikincil, imza değil): mürekkep çizgi** `#1c1915` (P01 kayadan gemiye → P10b harita rotası + iğne). Ucundaki damla mürekkep siyahı; kor rengi taşımaz.
- **Kor kullanımı bütçesi:** P01 yok (hikâye henüz bilinmez), P02–P03 yok, P04 parıltı ≤ 1.3 sn, P06 V1 ağız parlaması ≤ 5 kare (**yönetmene öneri, sahne planında yok**), V3 çakım ≤ 10 kare + ince duman, P07b kapı/alev, P07c yanan hangar (alev tepesi ≥ 90 px), P08 uzak duman altında soluk kor ≤ %1, P09 yalnız duman, **P10a yok** (kor söndü; imza yokluğu = bitiş), P10b yok.
- **Ölçek/okunurluk (360 px'te ≥ ~20 px):** P04 parıltı çekirdeği ≥ 60 px (1080) — namlu ucu zaten ≥ 240 px; çakım ≥ 110 px; alev P07c ≥ 90 px yükseklik; P07b kapı kor çizgisi 4 px, alev dili ≥ 120 px.
- **Alev dili (gravür):** 3 katman yaprak (dış/orta/çekirdek), 5–7 yaprak, seed'li farklı boy, ucu rüzgâr yönünde kıvrık (`meltem`), simetrik mum alevi **değil**, yıldız/radyal patlama **yok**, kıvılcım yağmuru yok, tam ekran flaş yok (flaş ≤ ekranın %10'u), yatay şok halkası yok. Alev gövdesi içinde tarama yok; tarama yalnız duman gölge yüzünde ve alevin altındaki karaltıda (gölge açısı tek θ, `isik.ts`'den).

## 3. Ben-my-Chree tasarım kartı
**Kaynaklı [A]:** 118,9 m × 14 m; iki baca; iki direk, iskuner donanımı; ince zarif gövde; hangar **arka bacanın gerisinde**; baş 18 m sökülebilir platform + ray; derrick'ler baş ve kıçta; 3 can botu (tek çalışır motorlu); sancak/iskele korkuluğu. **Ön hangar tek kaynak ⇒ çizilmez.** 12 pdr/3 pdr topların güverte konumu kaynaksız ⇒ geniş planda çizilmez (lint: `silah_konumu_dogrulanamadi`).
**Ölçek (P01 `kiyidan-ada`, cs 1.0, ≈ 5.6 px/m):** uzunluk 670 px (x 190–860, baş solda, kıç sağda), su hattı y 1050. Dikey boyutlar hafif abartılı (≈ ×1.15, serbest): güverte y 1010 (borda 40 px) · köprü üstü y 982 · hangar tepe y 975 · baca tepe y 935 · direk tepe y 885. Oran toplam uzunluk : yükseklik ≈ 4:1 "ince hızlı vapur".
| Öğe | Konum (baştan, L=1) | Ölçü (P01 px) | Not |
|---|---|---|---|
| baş platformu + ray | 0–0.15 | 100 px, güverte hizası, hafif yukarı eğik rampa değil düz | sökülebilir [A]; ray 2 ince çizgi |
| ön direk (baş derrick direği) | 0.20 | kalınlık 6 px, tepe y 885 | derrick bumbası eğik 40° [G] |
| köprü üstü | 0.28–0.38 | 70 px, +28 px | küçük pencere şeridi 4 nokta |
| ön baca | 0.43 | genişlik 26 px, h 75 px, arkaya 4° eğik [G] | tek koyu nötr; **360 px'te ≥ 9 px: iki baca ayrışır** |
| can botları ×3 | 0.33–0.57 (iki baca çevresi) | her biri ≈ 50 px | konum [G]; P02a ile tutarlı |
| arka baca | 0.59 | ön baca ile aynı | aralık 105 px (≈ 35 px @360) |
| **hangar** | 0.64–0.88 | 160 px uzun, güverteden +35 px, düz çatı [G] | yan duvarda çift kanatlı kapı (dışa açılır), kapı yan duvarın ≈ %45'i; **arka bacanın hemen gerisi** |
| arka direk (kıç derrick direği) | 0.90 | kalınlık 6 px, tepe y 890 | derrick bumbası kıça uzanır [G: direk=derrick direği] |
| kıç | 0.88–1.0 | yuvarlak kıç [G], kıç köpüğü | |
| çıpa / makara | baş | insert ölçeği ≥ %25 ekran | stoklu klasik çıpa [G], zincir halkası ≥ 6 px |
| simit | sancak korkuluğu, orta-kıç | gerçek ø ≈ 0.75 m [T] ⇒ insert 200 px (%10.4) ⇒ ölçek ≈ 265 px/m, korkuluk ≈ 260 px, tayfa ≈ 450 px | sancak = su tarafı (P09 yatış yönü) |
- **Gövde dili:** hafif yaylı kenar (sheer), baş eğik, su hattı ince koyu bant `#4b4a5a`; pencere/lumbuz tek sıra 1.5–2 px nokta (yakın planda). Kontur ışık yüzünde ince, gölge yüzünde kalın. Tarama: gövde alt gölge şeridi + baca arka yüzü + hangar duvarı saçak altı (geniş düz yüzeyde yok).
- **Telefon (360 px) testi:** (1) iki baca aralıklı, (2) iki ince direk + kenar ışığı hattı (direk 6 px ⇒ 2 px, rim ile okunur), (3) arka bacanın gerisinde yüksek kutu = hangar, (4) baş platformu düz çıkıntı. Bunlar P01'de ses kapalı okunmalı.
- **Durumlar (LIMAN `gemi_durum`):** `demirli` (köpük yok, zincir sarkık→gergin) · `vurulmus` (hangar bölgesinde ince duman) · `yanan` (alev + kalın duman sütunu kadrajın üstünden çıkar) · `yatik` (sancağa ≈ 22°, bacalar/direk eğik) · `batik` (yarı yatık, bacalar/direk sudan eğik; su hattı P09–P10a'da aynı gömülme çizgisi). Aynı rig, oran sabit (Paris "aynı karakter tek rig").
- **Kıçta kalıcı kurulum nesneleri (P02 → P07/P08/P09):** derrick + asılı uçak, kapalı hangar kapısı, 3 can botu, sancak simidi: her biri bir sonraki karşılığıyla **aynı renk/yer**.

## 4. İnsanlar, hayvan, top
### 4.1 Teğmen Mustafa Ertuğrul (yeni karakter; `Kukla` + `yakin` yüz + `palet` override)
- **Kanıt:** üniforma/başlık/yüz kanıtsız [G]. Haki-toprak tonlu nötr harp elbisesi; **başlık siluet düzeyinde nötr**: alçak, yuvarlak üstlü, siperlik/yıldız/hilal/rozet/rütbe yok, tek koyu parça (`#4f4b60`), kenarda yalnız ışık çizgisi. (Sahne planındaki "kep" ifadesi bu tanımla değişir: **başlık**; siperlik yok.) Bıyık yok (kanıtsız, nötr); genç (≈ 24).
- **Renk:** ceket ışık `#a39a78` · orta `#85805f` · **gölge `#615c70`** (mavi-mor) · manşet `#8c8466` / gölge `#4f4b60` · kayış yok (nötr). Ten ışık `#cba790` (C* ≈ 19), gölge `#8a6f7a`, yansıma (gökten, yanağın ön alt hilali) `#b9a8b4`, **kenar ışığı** sağ-arka yüz/ense/omuz `#eec5a2` 2–3 px. Ten L* ≤ 75, C* ≤ 20.
- **Oran:** 7.5 baş boyu, omuz = 2.2 baş, boy 1.72 m [T]. P05 ölçüsü: yüz yüksekliği (çene–saç çizgisi) **380 px (%19.8)**; el = 0.75 × yüz = **285 px (%14.8)** ⇒ el ≥ %15 hedefine uyar ve Çiçero kuralı (0.75) bozulmaz.
- **El/kol (Çiçero kuralı):** kol omuz→dirsek→bilek IK, dirsek iç açısı 70–160° (`kolIK`), bilek ≤ 30° (`bilekSinirla`), el tek parça siluet (`GravurEl`, iç dikiş/tırnak/bant yok, havada tek kalkık parmak yok). Poz `dayali` (avuç aşağı, parmaklar namlu çemberine 30–40° bükük); "pat" = el namlu üstünden 6 px'ten iner, 2 kez, sonra temas. **Diğer el boşta sarkmaz:** kadraj dışı ya da lafet kızağına dayalı (`dayali`). Manşet haki; saat/yüzük yok.
- **Namlu ölçeği (yönetmene düzeltme):** P05 ölçeğinde (≈ 1580 px/m) namlu dış çapı 0.12 m ≈ 190 px; sahne planındaki "namlu y 880–960 (80 px)" **kalın değil**, ≈ 150–190 px olmalı ve el üstüne yatar (kit_eksik değil, kadraj değeri).
- **Yüz (yakın planda detaylı):** profil sağa-aşağı (güney, gemi). Kaş: kalın, koyu `#4a3a3a`, düz (açı 0–4°, sakin), üst göz kapağı tek yay + alt çizgi, göz beyazı `#e3d8c6` küçük, iris/göz bebeği tek koyu `#14120f` (parıltı noktası yok, imza korla karışmasın), burun profil çıkıntısı belirgin, ağız kapalı ince üst dudak + alt dudak gölge çizgisi, çene net, yanak gölgesinde 4–6 kısa tarama (ışığa göre), kulak sade. İfade: sakin-kararlı; göz kırpma/kaş oyunu yok (P05'te küçük jest yok).
- **Okunurluk:** ön yüz gölgede (ışık sağ-arka) ama L* ≥ 50 + gökten yansıma hilali ile yüz okunur; ana ayrışma silüet (burun-çene-başlık) + 2–3 px kenar ışığı.

### 4.2 Topçu erleri (kompars, ana kadrodan ayrışır)
- **Yüzsüz siluet**, tek ton `#5a5278`, kenar ışığı `#eec5a2`; teğmenden **kısa ve kalın** (1.64 m, omuz geniş), öne eğik duruş; başlık yok (siluet baş yuvarlak; burun-çene silueti yön okutur), omuzda ip/halat kangalı ya da mermi sandığı (`#8a6f5a`) taşıma pozu. Teğmenin yüzü/başlığı kopyalanmaz. Kullanım: P05 uzak arka (flu), P06 V1 kundak yanında 1–2 figür (flu ön plan değil, orta). Yerleşim anlam taşır: top çevresinde, kıyıda sıralanmış "asker dizisi" yok.
### 4.3 Katır
- Omuz yüksekliği 1.35 m [T]; **uzun kulaklar** (0.25 m) + uzun yüz + ince püsküllü kuyruk (at/eşekten ayırır). Renk `#6e6068`, ışık kenarı `#eec5a2`, semer `#8a6f5a` üzerinde top parçası kılıfı (koyu `#4c4a60`). Kamerada yalnız P05 sol-üst **flu baş/kulak** + P04 **taze katır izi** (toz çizgisi + 3 küçük toynak izi). Tam katır siluet çizimi yok (kaynakta sayı/düzen yok, doğrulanamadı).
### 4.4 7.7 cm dağ topu (model **doğrulanamadı**, genel dağ topu)
- **Ölçü [T]:** namlu ≈ 1.1 m, ağız dış ø 0.12 m, iki tekerlek ø 0.9 m (ahşap `#8a6f5a`, çelik çember `#4c4a60`), kısa kızaklı lafet 1.8 m (çelik `#5a5670`). Kalkan çizilmez (kanıtsız). Hat ışık `#a8a2b4`, rim `#eec5a2`. Gövde P04'te gölgede (yalnız namlu ucu), P05'te namlu + el, P06 V1'de namlu + kundak + tekerlek ön planda (kaya oyuğu = mevzi; **aynı kaya** P01/P04/P06/P10a).
- **Geri tepme:** namlu 24 px geri (24 kare), tekerlek kayar, toz E4 (toz `#c9b8b0`/gölge `#7a7090`). Mevzi gizleme kanıtsız ⇒ **kamuflaj ağı/çalı örtüsü yok**, yalnız kaya gölgesi (`#2e2a44` oyuk içi).
- **Boyut ironisi (hikâye):** P01 gemi 670 px, P06 V1 top ön planda 560 px ⇒ ekranda top gemiyle aynı ağırlıkta görünür ama gerçek ölçekte 118.9 m ↔ 1.1 m; bu karşıtlık yazıda ("~3.900 ton") değil görüntüde ışıkla: top gölgede, gemi ışıkta.

## 5. Deniz uçağı, su sütunu, duman, alev, tipografi
- **Deniz uçağı (genel Short tipi, işaretsiz) [A: iki kişilik, iki şamandıralı; boy 12,38 m, açıklık 19,36 m; envanter Ocak 1917 doğrulanamadı]:** üst + alt kanat (bez `#d6c4a0`), iki şamandıra (uzun kayık biçimi, ahşap `#8a6f5a`), her yanda 2 dik dikme (kafes/tel örgü **yok**), iki açık kokpit çentiği, kuyruk yüzeyi. Önde pervane diski [G: Short 184 çekici mi itici mi — **doğrulanmalı**, araştırmacıya soru]. Roundel/numara/bayrak yok. Ekran: P02a'da ≥ %30 yükseklik, kanat ucunda sıcak kenar ışığı. Derrick halatı iki sapan + kanca; indirme sırasında şamandıralar sancak boşluğundan suya, gövdeye çarpmaz.
- **Su sütunu (E3 taç sıçrama, gravür):** gövde `#e6dac6`, gölge yüz `#8f9bb8` dikey tarama, tepe taç (5–7 yaprak), taban elips halka; yükselir 24 kare / tutar / çöker 22 kare; ≥ %25 ekran (480 px), tepe y > 420 (yazı bandı). Işık sütunun arkasından (V2 rel 25°): sütun kenarı gül-altın `#eec5a2`.
- **Duman:** tırtıklı 3–5 küme/sütun, 2–3 ton (§1.4), kenarda gül ışık, altı alevden `#e0b090`; yükselir, kadrajın üstünden çıkar, **fade yok**, rüzgâr sağa (aynı `meltem`). Tarama: gölge yüzünde 3–5 paralel çizgi, 2 px, aralık 7 px, tek θ.
- **Alev:** §2. **Çakım (V3):** ≤ 10 kare, hangar kapısı üstünde; çekirdek `#ffe0a0` + 2–3 kısa yaprak (≤ 80 px) → küçülür (fade değil), ince duman başlar; kamera sarsıntısı ≤ 3 px.
- **Tipografi (kanal, `src/theme.ts`; yeni font yok):** ekran yazısı kâğıt şerit `paper #e9dfc9`, **Playfair Display 900**, tek kırmızı vurgu `red #b3261e` (kelime/sayı: 1917, 16, "3", 1920); sayı/ölçü/tarih/yer **IBM Plex Mono 500** (118 m · 24,5 knot, 2 km, harita etiketleri Kaş / Meis · Kastellorizo); altyazı **Inter 800** kelime kelime, vurgu kırmızı; kaynak atfı ve alt satır Inter 500. Güvenli alan üst 220 / alt 420 / yan 80; bantlar y 240–400 ve 1290–1490. **Görüntüde yazı yok** (tabela, gövde adı, bayrak üstü yazı yok; gemi adı yazısı yok → TR/EN gömülü dil sorunu çıkmaz). Yazı kırmızısı yazı katmanında; imza korun ölçümü yazısız görüntüde yapılır.

## 6. Mekân dili özeti (mekân sorumlusuna; GORSEL-RECETE işaretleri)
| Madde | Bu bölümde nasıl | Durum |
|---|---|---|
| A1 tek ışık | azimut 235°, yükseklik 22→6°; `isik.ts` tek tanım; alev yalnız P07b'de ikinci kaynak (gerekçeli) | zorunlu |
| A2 litografi gök | §1.1 5 basamak + sınır çizgisi | zorunlu |
| A3 hale/havuz | güneş çizilmez ⇒ hale yok (**lint: `hale_gunes_kadraj_disi`**); alev havuzu 2–3 düz basamak | gerekçeli |
| A4 ≥5 katman (dış 8–10) | ön kaya+ot (flu) · yakın su · gemi · liman suyu · ada evleri · kale · sırt · buğu bantları · gök/bulut | zorunlu |
| A5–A6 buğu, flu | ufukta 3 buğu bandı (maks α .62), ön plan flu σ 5–7 | zorunlu |
| A7 kenar ışığı | `#eec5a2` 2–3 px, yalnız ışık alan kenar | zorunlu |
| A8 sıcak–soğuk | §1; sıcak ≥ %14, p95 L* ≥ 75. **Risk P07b/P08a** (kapı/duman gölgede): P07b sol-üst gök/duman ışıklı kenar ≥ %6 alan + alev; P08a duman arkası ışık | ölçülür |
| A9 tarama | `doku/Tarama` 12/9/7.5 px; kemer/saçak/hangar kapı çevresi/gövde alt gölgesi/duman gölgesi; geniş düz yüzeyde yok, çapraz yalnız ≤ 120 px gölge | zorunlu |
| A10–A12 | `RenkKaydi` (1.5,1.0), `KonturTitreme`, `ArsivKatmani litografi` (kâğıt lifi .14, gren .10, mor vinyet .22) | zorunlu |
| A13 seed | tek `rng`: ev yüksekliği/rengi, sırt, yaprak alev boyları, dalga vuruşları | zorunlu |
| B1 sıra/düzensizlik | Meis ön sırası 2 derinlikte, 2–3 kat, farklı yükseklik/genişlik/renk, %20 ayrıntısız | iskelet **[G]**, kanıtsız |
| B2–B7, B10 | kornişsiz sade cephe + kepenk + pencere ritmi (ışıklı pencere gündüz yok; cam parıltısı `#f3d9b6` tek nokta), düşük eğimli çatı, baca küçük tekil (küme yok, kanıtsız) | nötr |
| B8 LOD | yakın (rıhtım P03a): doku + kepenk; orta: oran + pencere ritmi; uzak (P01 ev şeridi y 860–900): kontursuz siluet | zorunlu |
| C mekân seçimi | 19 çekimin ≥ 1/3'ü derinlikli (LIMAN 9, KIYI-BATARYA 3 çekim ufuk/sırt); insert art arda ≤ 3 (P02a-b, P03b arası LIMAN araya girer) | uygun |
- **Meis kalesi (14. yy [A]):** dikdörtgen kütle + tek kule + 5–7 mazgal dişi, kireçtaşı `#d0b392`/`#6f6488`, taş sıra tarama yalnız gölge yüzde, x 80–420 y 640–880, 360 px'te okunur; biçimin gerçeği kanıtsız ⇒ nötr, tricolore küçük.
- **Bayrak:** tricolore `meltem` ile dalgalanır; yalnız kale direği + (P03a) rıhtım direği, her biri ≤ 40×27 px.

## 7. Kompars/ayrışma ve tekillik kontrolü
- Teğmen (yüz+başlık+haki) ↔ erler (yüzsüz, kısa-kalın, başlıksız, tek ton) ↔ Royal Navy tayfası (yüzsüz, `#585870`, kıyafet nötr) ↔ yaralılar (sargı `#d8c9ac`, yüzsüz, oturur): hepsi silüet düzeyinde ayrışır; hiçbirinde kor rengi, simit bandı veya uçak bezi tonu tekrar etmez.
- İmza beyazı yok; en açık yüzey su sütunu `#e6dac6` (L* ≈ 87.5) ve bayrak beyazı (≤ 40 px).
- Mürekkep çizgi motifi yalnız P01 ve P10b'de; ikisinin çizgi kalınlığı/rengi aynı (`#1c1915`, 10–12 px, uçta damla).

## 8. Kaynaksız → nötr kararları ([G] / doğrulanmalı)
| # | Ayrıntı | Durum | Karar |
|---|---|---|---|
| G1 | gemi/baca boyası, su hattı bandı | [G] | nötr gri-kum, koyu nötr baca |
| G2 | hangar çatı/kapı ölçüsü, baca eğimi, direk=derrick direği | [G] | oran verildi, `doğrulanmalı` (Commons/Gallica fotoğrafı gelirse güncelle) |
| G3 | 12 pdr / 3 pdr konumları | [G] | çizilmez |
| G4 | Meis ev biçimi/rengi, çatı malzemesi | [G] | soluk nötr, kiremit iddiası yok |
| G5 | Meis kalesi biçimi | [G] | nötr dikdörtgen kütle |
| G6 | Short tip, pervane (çekici/itici), roundel | [G] | genel iki şamandıralı, işaretsiz; **doğrulanmalı** |
| G7 | Osmanlı topçu üniforma/başlık, yüz | [G] | haki-toprak nötr, siperliksiz başlık, rozet yok |
| G8 | 7.7 cm dağ topu modeli/kalkanı | [G] | genel dağ topu, kalkan yok |
| G9 | bot tipi, motor, krank | [G] | motor gösterilmez, açık kayık |
| G10 | can simidi biçimi/rengi | [G] | mantar-bez, kırmızı yok |
| G11 | Royal Navy tayfa kıyafeti | [G] | nötr koyu tek ton |
| G12 | tricolore şerit oranı | [G] | eşit üç şerit, küçük |
| G13 | olay saati/hava | [G] | "Ocak öğleden sonra, nötr ama sıcak" (kaynak iddiası değil) |

## 9. Yön karesi tarifi (Paris çıtası; kullanıcıya gidecek tek kare = P01 k124)
**Kare:** 1080×1920 dikey, litografi gravürü. Ön plan: iri flu kireçtaşı kaya (`#b89a86` ışık, `#6f6488` gölge), sağ kenarda 2–3 px `#eec5a2` kenar ışığı, kuru ot, kayada karanlık oyuk (`#2e2a44`) ve oyuktan gemiye uzanan ince mürekkep çizgisi (ucu damla). Orta: ışıklı kış denizi (yatay vuruşlu, çelik-mavi `#5f7fa6`, sağ-üstten kameraya gül-altın ışık yolu `#e6c498`), uzun **iki bacalı, iki direkli, arka bacanın gerisinde yüksek hangarlı** nötr gri gemi (kontrajur, sağ kenarında gül ışık çizgisi). Arka: solda kireçtaşı kale + küçük tricolore, ev şeridi, sağda soğuk sırtlar, 3 buğu bandı, 5 basamak soğuk-gül gök (ufuk `#ecc9b4`). Üstte kâğıt şerit yazı. Kâğıt lifi, tarama gemi altında/kale gölgesinde görünür. Referans dil: `hedef-ozet.jpg` sağ kare (alacakaranlık çatı, mavi-mor + gül, flu uzak katmanlar). **Karşılaştırma sorusu: "Paris genel-tr.jpg yanına konsa geri kalır mı?"** Teğmen için ikinci kare (P05 k150) ayrı gider: profil yüz + el + namlu, gül-altın kenar ışığı, mavi-mor gölge.

## 10. Sonraki ajana notlar
- **Mekân sorumlusu:** §6 tablosu + §3 oranlar; Meis ev dönemi (B1) için kaynak yok, araştırmacıdan dönem fotoğrafı (Commons/Gallica) istensin; gemi oranları da aynı.
- **Motion:** önce **kalibrasyon P01 k124** + **P07b k2388** (+ P05 k150 teğmen yön karesi onayından sonra). Kor betiği: imza bandı yalnız kor kutularında; kırmızı piksel (bayrak hariç) 0; sıcak ≥ %14; p95 L* ≥ 75.
- **Yönetmen:** (1) P05 namlu kalınlığı 150–190 px; (2) "kep" yerine "başlık (siperliksiz)"; (3) P06 V1'e ≤ 5 kare ağız parlaması (kor zinciri) eklensin mi; (4) P10a'da kor yok (imza yokluğu).
- **Araştırmacı (doğrulanmalı):** Short 184 pervane düzeni; Meis 1917 ev/kale görünümü; hangar kapısı konumu; botların güverte yeri.
