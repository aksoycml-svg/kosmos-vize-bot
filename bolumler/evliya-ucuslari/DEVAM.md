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
> Evliya uçuşları kurulumuna devam. bolumler/evliya-ucuslari/DEVAM.md'yi oku, kurulum ekibinden (tasarımcı) başla.
