# Evliya uçuşları — devir notu (yeni oturum için)

## Durum (2026-11-07)
- `arastirma.md` ✔ · `senaryo.md` ✔ **TR onaylı** (14 plan, ~59.5 sn; kararlar dosya sonunda) · `dokunuslar.md` ✔ (EV-D1…D6, EV-Y1 yedek; **P06 fişek bırakma dramatizasyonu kullanıcı onaylı** → açıklamada "dramatizasyon" notu).
- Henüz yok: EN metin, ses, sahne planı, tasarım, mekânlar, şablon kodu.

## Yeni kural: iki dil baştan birlikte (CLAUDE.md)
Bu bölüm bu kuralla kurulan ilk bölüm. Sıra:
1. **senarist** → `senaryo-en.md` (TR ile eşit uzunluk, aynı plan yapısı) → **kullanıcı onayı** (TR zaten onaylı, yalnız EN).
2. **teknisyen** → TR + EN ses (ElevenLabs, curl + with-timestamps, klip başına .json). Ses adayları: anlatıcı TR (Blanc TR ile aynı), EN Brian `nPczCjzI2devNBz1zQrb`; **Lagâri ve Padişah için ayrı ses** (kullanıcı kararı) — aday dinletilip kullanıcıya sorulur.
3. **yönetmen** → plan süresi = iki dilin uzunu; tek `bolum.json` + dil başına yazı katmanı.
4. **Kurulum ekibi (opus):** tasarımcı → mekân sorumlusu → motion. Yeni şablonlar: SARAYBURNU (köşk, gece+gündüz), GALATA-TEPE, BOĞAZ geniş (+rota), KİTAP-INSERT; Lagâri/Hezarfen/padişah siluet; fişek demeti, kanat, kese.
   **Kit işi (motion):** `Bolum`'a "yazısız görüntü" + "yalnız yazı katmanı (şeffaf, dil seçimli)" render modu; Harita/mühür gibi gömülü metinler yazı katmanına.
5. Kalibrasyon kareleri → eleştirmen → kalan → kurgucu (müzik: kamu malı Osmanlı/klasik, lisans) → render (görüntü bir kez, yazı+ses dil başına) → eleştirmen tek tur → kullanıcı.

## Blanc'tan öğrenilenler
- Render parçaları sırayla (paralel webpack çakışır). Kısmi render `--frames` + kare-kesin birleştirme.
- Final ses zinciri: loudnorm ölç (I −11.5, TP −2.5) → dinamik loudnorm + alimiter 0.84 → AAC sonrası −14 ±0.3 / TP ≤ −1.5; gerekirse +0.5 dB.
- Premiere paketi: `tools/premiere_paket.py` (xml/sekans adı argümanlı) + `katman` prop ile stem'ler.
