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
