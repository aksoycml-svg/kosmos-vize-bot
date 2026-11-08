# Evliya uçuşları — devir notu (yeni oturum için)

## Durum (2026-11-08)
| Adım | Dosya | Durum |
|---|---|---|
| Araştırma | `arastirma.md` | ✔ |
| Senaryo TR + EN | `senaryo.md`, `senaryo-en.md` | ✔ **ONAYLI v2** (yeni kanca, bağlanmış akış; "kopuk yazım yok" kuralı) |
| Dokunuşlar | `dokunuslar.md` | ✔ (EV-D1…D6; kare aralıkları sahne planında yeniden yerleşti) |
| Ses TR + EN | `public/evliya/ses/{tr,en}/Pxx.mp3` + `.json` (kelime zamanları) | ✔ **onaylı**; cıt kontrolünden geçti |
| Plan süreleri | `public/evliya/ses/plan-sureleri.json` | ✔ toplam **62.9 sn** (iki dilin uzunu + 0.4) |
| Sahne planı | `bolum.json`, `sahne-plani.md` | ✔ yazıldı; **doğrulayıcı şablonlar kurulunca geçecek** |
| Tasarım, mekânlar, şablon kodu | — | ⏭ **SIRADAKİ** |

### Kullanıcı kararları (bu oturum)
- Ses: anlatıcı TR Umut Canbay (`jZQNewKOZcubZDDwBxdL`), EN Brian (`nPczCjzI2devNBz1zQrb`), multilingual v2. **Lagâri = Fatih Yıldırım** (`7VqWGAWwo2HMrylfKrcm`, eleven_v3, gülme kalıyor; TR çekim1). **Padişah = Nihat** (`MuOq11XzQTthwLhmGZ2V`). Üretim betiği `tools/evliya_ses.py`.
- EN: P06 "pavilion" eklendi; P02/P09/tam adlardaki sadeleştirmeler onaylı.
- Sahne planı: **P11 yüzsüz insert** (omuz + avuç) olduğu gibi; **P05–P06 stilize yükseklik** (kukla tiyatrosu: tilt + ön plan yardımcı + köşk silueti) olduğu gibi. Yeni plan eklenmez.

### Kullanıcı kararları (tasarım sonrası, 2026-11-08)
- İmza nesnesi = **fişek demeti** (5 görünür tüp). Gündüz = **sabah, güneş ENE**. Ayrım: **Lagâri bıyık, Hezarfen sakal**.
- P06→P07 kanat sürekliliği: **kanat suda kalır** (P06'da suda görünür, P07'de Lagâri kanatsız). → yönetmen `sahne-plani.md`/`bolum.json`'a işleyecek.
- tasarim.md §9 madde 4–10 araştırmacıya gönderildi (`arastirma.md` ek bölüm).

### Kurulum ilerlemesi (2026-11-08 oturum 2)
- ✔ `tasarim.md` v1.3, `mekanlar.md` (K1 revizyonlu), `arastirma.md` §10, `bolum.json` P05/P06 yeniden yazıldı.
- ✔ Kod: SARAYBURNU `kiyi` gece (`src/kit/sablonlar/sarayburnu/`), Kukla'ya Osmanlı kostümü/sarık/takke/kanat, `props/evliya.tsx`, `paletler/evliya.ts`, `geceLapis` derecelendirme, `tools/renk_olcum.py`.
- K1 (P05/P06): tur 1 KALDI → tur 2 **KOŞULLU** (`kalibrasyon/K1-2/elestiri.md`). Açık: Y1 kesmede duman sıçraması, Y2 iniş ölçeği ≤3×, Y3 basamak tutunması P07'ye, Y4 meşale alevi kompars giysisinde, Y5 iniş sıçraması, Y6 yardımcı başı, Y7 açık kanat, Y8 katlı kanat (tasarımcı→motion), Y9 demet kalıntısı, Z1–Z4. K2'ye taşınan koşullar §4.
- Render: `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`.
- Kota: kurulum çok pahalı (motion tur başına 450–625k token). Sonraki tura geçmeden kullanıcıya danışıldı.
- **Kullanıcı kararı: B yolu** — yönetmen/tasarımcı açıkları belgeye işler, motion her turda önceki açıklar + bir sonraki kalibrasyonu birlikte yapar. Kalkışta binici başı kadraj dışına çıkmaz.
- K2 (P07/P11 insert gece/gün): kuruldu, **KOŞULLU** (`kalibrasyon/K2/elestiri.md`). K1 KOŞULLU: Y10 iniş sıçraması diken gibi, Y11 suda kanat kalas gibi. K2 açık: W1 P07 p0 el basamağa değmiyor (ses var), W3 basamaklar blok, W4 gölgeler elips, küçükler (duvar çizgisi göğe taşıyor, kemer köşesi, derz çit, sikke ΔE 17.3). W2/W5 yönetmen kapattı.
- K3 hazırlığı (P02 gece / P10 gün, `kosk` görünümü, padişah siluet): json hazır (yönetmen §5.0c). Açık: mekân sorumlusu P02 grup x 90–160 + cs 0.97 onayı; tasarım §3.5 "P10 cs 1.6" eskidi (cs 2.4); şenlik yarıçapı üst bantla örtüşüyor mu.
- K3 turu sonucu: **K1 GEÇTİ, K2 GEÇTİ, K3 KOŞULLU** (`kalibrasyon/K3/elestiri.md`: V1 padişah sarığı havada [kritik], V2 baş çevirme zayıf, V3 şenlik üst bantta → P02 yazısı alt banda (x≥260 ya da y≥1330), V4 P02 Lagâri ayakta, V5 sikke parlaması sert iki ton, V6 kavuk ucu, V7 baca dilimi, V8 gündüz yansıma opak, V9 sayaç ışık ayrı, V10 P07 kol kenar ışığı). Sıradaki: yönetmen V3/V4/V7 + K4 hazırlığı (P12 `ic`), tasarımcı V6, mekân V8 → motion V1/V2/V5/V8/V9/V10 + K4.
- K4 turu sonucu: **K3 GEÇTİ, K4 (P12 iç) KOŞULLU** (`kalibrasyon/K4/elestiri.md`): U1 [kritik] ışık gözde şerit okunmuyor (sarık gözü örtüyor, ışık tüm alt yüzü yakıyor), U2 [kritik] tok/tık kadraj dışı → kamera.kare [0,36,70,120,204] + kanat kenarı x ≤ 880, U3 ayak/zemin alt bantta (p0–36 ayak y ≤1490, sonra zemin kadraj dışı), U4 kanat kapı gibi, U5 işaret eli 'buyur' + yan güvenli alan, U6 kaftan ışık bandı, U7 yüz p0'da manken, U8 P10 baca dilimi, U9 sarık üst banda değiyor, U10 P02 Y2 x 78. SARAYBURNU 4 görünüm kuruldu.
- Sıradaki: yönetmen U2/U3/U5-kamera/U8/U9/U10 + K5 hazırlığı (GALATA-TEPE: P01 B, P08); tasarımcı U1 sarık profilde kaş üstü, U7, iç el gölge `#7a5848` kaydı; mekân U3 hesap, U4, Galata kartı gözden geçir → motion U1/U4/U5/U6 + K5.
- Yönetmen K4 açıklarını ve R3 eşiklerini işledi (§5.0e; P12 kanat son açı 4°, kamera [0,36,70,120,150,204], p204 cs 1.6 R3'ten sapma — mekân onayı açık). Tasarım v1.6, mekanlar R3 commit'li. **Sıradaki: motion = P12 U1/U4/U5/U6/U7 + K5 GALATA-TEPE (P01 B, P08, Hezarfen rig) → eleştirmen.**
- K5 turu sonucu (`kalibrasyon/K5/elestiri.md`): **K4 (P12) KOŞULLU** — tek kritik A1 (gözdeki ışık ≥1 sn: push-in p36–60, `don` p100–130, `isaret` p135–175, kontrol_kare 90); A2–A7 orta/küçük. p204 cs 1.6 KABUL (mekân R3'e işlesin). **K5 (GALATA-TEPE) KALDI** — kritik B1 uzak şehir kaldırım gibi, B2 katlı kanat opak↔hayalet, B3 P01 yürüyüş diz yerde + temas gölgesi delik, B4 P08 p148 taş düğme sütununda, B5 dip ölçeği (taş ≈1.6 m) + toz elips, B6 foley eksik (P01 p196–262 adımlar, P08 p56, taş sekmesi); orta B7–B12, küçük B13–B16. Duvar dibi 1150 KABUL.
- **YENİ OTURUMDA SIRADAKİ (B yolu):**
  1. **yönetmen** → A1, A2, A3, A6, B4, B6 (foley olay listesi), B7, B16 (`bolum.json`/`sahne-plani.md`), doğrulayıcı.
  2. **tasarımcı** → B10 Hezarfen sarığı, B11 katlı kanat okunurluğu, B12 sakal/bıyık, B13 P01 B saydamlık ≤.75, A7 boyun, `don` zamanı A1'e göre. **mekân** → B1 uzak şehir pus, B5 dip ölçeği, B9 kule kimliği, B14 duvar dibi 1150, R3 p204 = 1.6. (Uzak şehre yapı eklenecekse araştırmacı 1630'lar Tophane/Galata siluetini doğrulasın.)
  3. **motion** → A4, A5, A7, B1, B2, B3, B5, B8, B9, B15 + render: P12 p14/p66–100/p90, P08 p0/44/46/148/170/185/216, P01 p220–260 (3 kare). İsterse aynı turda K6 kurulumu (BOGAZ P09).
  4. **eleştirmen** → K4 kapanış + K5 tur 2 (yalnız sorunlu kareler).
  - Sonra kalanlar: BOGAZ (P09), KITAP-INSERT (P13/P14), P03/P04 jestleri, TR/EN yazı katmanı sistemi (KE-Y1..Y5), kurgucu (müzik + foley.json), render, eleştirmen tek tur, kullanıcı, Premiere paketi.
  - Kota: motion turu ~480k token, eleştirmen ~160k. Her motion turundan önce kullanıcıya kapsamı söyle.
  - **Oturum 3 (2026-11-08): 1 ve 2 TAMAM.** yönetmen (`sahne-plani.md` §5.0f; doğrulayıcıda yalnız 5 şablon-eksik hatası: P03 `bin`, P04 `tutun`, P09 BOGAZ, P13/P14 KITAP-INSERT), tasarım v1.7, mekanlar R4 (uzak şehir elle öbek, kule ekseni x 300 + ∩/∪ kavis, P08 dip 255 px/m, toz öbekleri). Kontrol kareleri `kalibrasyon/K5-yonetmen/`.
    - Açık: P12 etiketi "Padişah (Evliya'ya göre)" 0.47 sn (kullanıcı kararı); P01 B yürüyüş y = `1250 − 97·e((x−300)/560)` json'a işlenmeli (yönetmen, motion turu öncesi küçük iş); P01 p172 yardımcı ayağı y≈1530; araştırmacıya: 1630'lar Tophane/Fındıklı yönü yapı, kule dibi evler/sokak genişliği.
    - Sıradaki: **3. motion** (A4, A5+p14 temas, A7, B1, B2, B3, B5, B8, B9, B10–B13 rig, B15) → 4. eleştirmen.
  - **Oturum 3 sonu:** P12 etiketi "Padişah"/"The Sultan" (kullanıcı). Araştırma §11 (Galata kule dibi; sayfalar açılamadı, arama özeti). **Kullanıcı kararı: P08 dip = sur + avlu** → `mekanlar.md` R5 §2.4b (`SurAvlu` modülü). Motion K6 tamam. Eleştirmen (kullanıcı kararı: **yalnız kritik kareler**) `kalibrasyon/K6/elestiri.md`: **K4 KOŞULLU, K5 KOŞULLU, kritik yok.**
  - **SIRADAKİ (K7):**
    1. yönetmen: A2 (padişah yaklaşma ya da %9.4 gerekçesi json'a), `el-ahsap` belirsiz→false, P01 B adım sayısı 4–5 (p250 çömelme), P08 metin "çatılar/sokak"→"sur + avlu", `sokak_bosluk_x`→`avlu_koridor_x` (isteğe bağlı).
    2. motion: `SurAvlu` (mekanlar §2.4b), B8 itme (bacak düz uzanır, gövde ≥12° öne, serbest kol açılır), renk ölçümünde kenar ışığı = kontur içi ≤6 px şerit, P12 yanağa düşen toz zerresi, P01 alt IG bandındaki siyah dilim, **Kosk/Kiyi şablonlarında Lagâri kanadı aynı arka katman hatası** (B2 kökü), uzak şehir pus bandı kumsal okunmasın.
    3. eleştirmen kritik kareler: P08 p44/p148/p170, P01 p250, P12 p90.
    - Sonra: KITAP-INSERT (P13/P14), P03/P04 jestleri, BOGAZ (P09), TR/EN yazı katmanı, kurgucu (foley B6 doğrulama), render.
  - **K7 tamam** (kullanıcı: siluet saydam kalır). `kalibrasyon/K7/elestiri.md`: **K4 GEÇTİ, K5 KOŞULLU, kritik yok.** SurAvlu kuruldu, kanat maske kökü Kosk/Kiyi dahil düzeldi, doğrulayıcı adım uzunluğu json'dan.
  - **Taşınan küçük açıklar (sonraki motion turuna eklenecek, ayrı tur açılmaz):** P08 p110/p125 karesi al — "dışarısı/gök" okunmuyorsa sur tepesi geçişi +10–15 kare (motion); uzak şehir pus bandı kesintisiz 2–3 tırtıklı çatı sırası (motion); P12 kapıdaki toz zerreleri ışık huzmesine (motion); P02 p80 yardımcı 0.15 m sola ya da meşale arka ele (yönetmen). Foley B6 → kurgucu.
  - **SIRADAKİ:** kalan şablonlar — KITAP-INSERT (P13/P14), P03 `bin` / P04 `tutun` jestleri, BOGAZ (P09) → tasarımcı/mekân (gerekirse) → motion tek tur (+ yukarıdaki küçükler) → eleştirmen kritik kareler. Sonra TR/EN yazı katmanı, kurgucu, render.
- (eski) **Sıradaki:** motion turu = K1 Y10/Y11 + K2 W1/W3/W4/küçükler + K3 kurulum (`kosk` gece/gün, padişah R10, şenlik). Sonra eleştirmen. Kalan şablonlar: SARAYBURNU `ic` (P12), GALATA-TEPE, BOGAZ, KITAP-INSERT; Hezarfen tam rig; TR/EN yazı katmanı sistemi (KE-Y1..Y5).

## Sıradaki: kurulum ekibi (opus) — `sahne-plani.md` §6 iş tanımıdır
Sıra (CLAUDE.md "Ajan çalışma sırası"):
1. **tasarımcı** → `tasarim.md` (palet, Lagâri/Hezarfen/padişah siluet, yardımcılar, prop'lar: fişek demeti, kanat, kese/sikke, taş, martı, defter; tipografi). Girdi: `arastirma.md` §5, `sahne-plani.md` §6.
2. **mekân sorumlusu** → `mekanlar.md` (mimari kart + doku): SARAYBURNU (köşk/kıyı/insert/iç, gece+gündüz), GALATA-TEPE (1630'lar: kurşun külah, sonradan katlar yok), BOGAZ panorama + rota, KITAP-INSERT.
3. **motion** → şablon kodu (`src/kit/sablonlar`, `karakterler.ts`, `props`, `jestler.ts`), `sinirlar.json` + `tools/bolum_dogrula.mjs` güncelle → `bolum.json` gerçek doğrulayıcıdan geçmeli.
   **Kit işi (bu bölüm ilk kez):** `Bolum` için "yazısız görüntü" + "yalnız yazı katmanı (şeffaf, dil seçimli)" render modu; `metin: {tr,en}` şeması, `ses`/`ses_en`; plan içi kesme (P01 iki şablon); `konus` dudak zamanı ses .json'dan; harita/kitap gibi gömülü yazılar yazı katmanına.
4. Kalibrasyon: önce 1–3 kare (öncelik P05–P06, P07/P11, P12, P14→P01) → **eleştirmen** → kalan kareler. Kural 7: kamera/ölçek değerleri şu an hesap önerisi, karede ayarlanır ve plana geri işlenir.
5. kurgucu (müzik: kamu malı Osmanlı/klasik, lisans `muzik/lisanslar.md`; foley.json) → render (görüntü bir kez; yazı + ses dil başına) → eleştirmen tek tur → kullanıcı → Premiere paketi.

## Ortam ve ses notları
- ElevenLabs anahtarı ortam değişkeni `elevenlabs_api_key` (Default ortamında da var; `api.elevenlabs.io` Default'ta izinli). **Ağ sırrı (network secret) ekleme** — başlığı ezer, "Invalid API key" verir.
- Anahtar izinleri: TTS + Voices read var; user_read yok (gerekmez).
- Her ses klibi `tools/ses_kenar.py kontrol` → CIT `duzelt`, KESIK yeniden üret; dinletilen birleştirmede loudnorm (−18 / −19 LUFS) + dalga formuna bak (CLAUDE.md).

## Blanc'tan öğrenilenler
- Render parçaları sırayla (paralel webpack çakışır). Kısmi render `--frames` + kare-kesin birleştirme.
- Final ses zinciri: loudnorm ölç (I −11.5, TP −2.5) → dinamik loudnorm + alimiter 0.84 → AAC sonrası −14 ±0.3 / TP ≤ −1.5; gerekirse +0.5 dB.
- Premiere paketi: `tools/premiere_paket.py` (xml/sekans adı argümanlı) + `katman` prop ile stem'ler.

## Yeni oturumda yazılacak
> Evliya uçuşları kurulumuna devam. bolumler/evliya-ucuslari/DEVAM.md'yi oku, "YENİ OTURUMDA SIRADAKİ" listesinden (yönetmen: K4/K5 açıkları) başla.
