# Çiçero — müzik ve ses lisansları (kurgucu, 2026-11-14)

## Müzik — KULLANILAN: Incompetech "Measured Paces" (Kevin MacLeod, CC BY 4.0)
| Alan | Değer |
|---|---|
| Eser | "Measured Paces" — solo piyano, ~70 bpm, 4/4, süre 1:13 (Incompetech kataloğu: feel "Unnerving, Mysterious, Eerie"; açıklama "Slow and measured quiet pulsing piano. For that 'something is going on... and it probably won't be good' feel."; ISRC USUAN1100164; yüklenme 2006) |
| Besteci / icracı | Kevin MacLeod (kendi kompozisyonu ve kaydı; kamu malı DEĞİL, CC BY) |
| Kaynak URL | katalog: https://incompetech.com/music/royalty-free/pieces.json (kayıt `filename: MeasuredPaces.mp3`) · dosya: https://incompetech.com/music/royalty-free/mp3-royaltyfree/MeasuredPaces.mp3 (indirme 2026-11-14) · sayfa: https://incompetech.filmmusic.io/song/4029-measured-paces |
| Lisans | Creative Commons Attribution 4.0 (CC BY 4.0) — ticari kullanıma uygun, **atıf zorunlu**. Doğrulama: `incompetech.com/llms.txt` ("Nearly all music is free to use under Creative Commons Attribution 4.0"; katalog şeması: her parça için lisans https://creativecommons.org/licenses/by/4.0/) ve https://incompetech.com/music/royalty-free/licenses/ ("Creative Commons — Free: no charge, requires that you credit the music"), 2026-11-14 |
| Gerekli atıf (açıklamaya aynen) | `Measured Paces Kevin MacLeod (incompetech.com)` · `Licensed under Creative Commons: By Attribution 4.0 License` · `http://creativecommons.org/licenses/by/4.0/` — CC BY §3 gereği değişiklik belirtilir: önerilen ek satır "Müzik kısaltıldı ve tempo %0.8 yavaşlatıldı." |
| Ham dosya | `muzik/kaynak/incompetech-measured-paces.mp3` (72.93 sn, sha256 `47573a2b1d126c1bdf660df09fd9355beb5c1217d847b5e7182f773b651c6a69`) |
| Kullanılan kesim | `public/cicero/muzik/cicero-measured-paces-65.mp3` — 64.83 sn = 3890 kare; betik `tools/cicero_muzik.py` (rubberband tempo 0.9916 perde aynı, 0–34 sn +3 dB, giriş 0.3 sn, çıkış 63.6–64.83 sn) |
| Risk notu | Incompetech parçaları YouTube/Meta Content ID'de talep alabilir; itiraz yolu Incompetech SSS'te ve `youtube-contentid.html`'de (lisans CC BY, itirazda parça adı + lisans bağlantısı). Instagram'da talep gelirse açıklama atfı delil olarak durur. |

### Neden bu parça (dönem notu)
1943–44 Ankara için dönem kaydı değil: kamu malı piyano kayıtlarında (Musopen/archive.org CC0) doğrulanabilir lisanslı ve 1940'lar sezgisine yakın (gösterişsiz, loş, soğuk) bir parça bulunamadı; CC0 Chopin üç bölümdür kanalda geçti (Blanc, Paris) ve Satie Paris'te yedek olarak kaldı. Çiçero'nun tonu "sessiz gerilim, kimse bağırmıyor": solo piyanonun 0.86 sn'lik ölçülü nabzı bunu verir, döneme özgü iddia taşımaz (dönem ima etmez, yanlış dönem de okutmaz).

### Elenen adaylar (lisans/ton)
- **Debussy "Des pas sur la neige"** (archive.org `parso-0a4174b8…`): yalnız bar 1–7 (43 sn), öğe metadata'sında `licenseurl` yok, icracı "Debussy" (tarihî rulo). Lisans doğrulanamadı → kullanılmadı.
- **Rachmaninoff Études-Tableaux Op. 39/5** (archive.org `parso-073d09c0…`, Musopen / K. Gilanyan): metadata'da `licenseurl` yok (yalnız "Musopen, a repository of Public Domain recordings" açıklaması); ton fazla coşkulu → kullanılmadı.
- **CC0 Musopen-Parso Chopin/Schumann/Clementi** (lisans doğrulu, ör. Chopin Nocturne op.55/1, Prelude op.28/14): kanalda Chopin zaten iki bölümde kullanıldı; Çiçero 1943 → 1830'lar Paris sesi okutur. Gerekirse yedek.
- Incompetech yedekleri (aynı lisans): "Promising Relationship" (piyano+yaylı, 56 bpm, 1:48), "Earnest" (piyano 6/8, 48 bpm, 1:38). İkisi de kullanılmıyor, indirilmedi/silindi (gerekirse https://incompetech.com/music/royalty-free/mp3-royaltyfree/ + dosya adı).
- Pixabay Music, Musopen.org, IMSLP: bu sunucudan erişim reddedildi (proxy 403) → denenmedi/doğrulanamadı.
- ElevenLabs Music: kullanılmadı (ticari hak teyidi açık, bkz. muzik/lisanslar.md).

## Foley ve ortam
- 45 foley + 4 ortam yatağı: 49 dosyadan **45'i ElevenLabs Sound Generation ile üretildi** (Creator plan, ticari kullanım uygun, atıf gerekmez; tek çekim; betik `tools/cicero_sfx.py`, promptlar betikte). Plan kredisi: ~530 karakter-kredisi (45 263 → 45 791 / 129 065; ≈ %0.4), ek dış ücret yok.
- **4 foley proje arşivinden yeniden kullanıldı** (aynı abonelik, ticari uygun, atıf gerekmez): `cic_dosya_masa_tok` ← `public/blanc/sfx-v3/dosya-tok.mp3`; `cic_cizgi_kalem_hafif` ← `blanc/sfx-v3/kalem-cizirti.mp3`; `cic_cekmece_kayma` ← `paris/sfx/pk-cekmece.mp3`; `cic_belge_karistir` ← `blanc/sfx-v3/kagit-hisirti.mp3`.
