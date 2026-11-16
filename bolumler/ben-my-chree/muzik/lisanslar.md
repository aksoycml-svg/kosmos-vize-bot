# Ben-my-Chree — müzik ve ses lisansları (kurgucu, 2026-11-16)

## Müzik — KULLANILAN: iki Incompetech parçası (Kevin MacLeod, CC BY 4.0)
Lisans doğrulaması (2026-11-16): `https://incompetech.com/llms.txt` — "Nearly all music is free to use under Creative Commons Attribution 4.0"; katalog şeması: her parçada composer/copyrightHolder Kevin MacLeod, lisans https://creativecommons.org/licenses/by/4.0/, "Attribution is required unless a no-attribution license is purchased". Katalog: https://incompetech.com/music/royalty-free/pieces.json (1443 kayıt; iki parça da kayıtlı). Ticari kullanıma uygun, **atıf zorunlu**. Kayıtlar kamu malı DEĞİL (besteci ve icracı MacLeod, kendi kaydı).

| Alan | Tema A | Tema B |
|---|---|---|
| Eser | "SCP-x6x (Hopes)" — piyano + viyolonsel, ~66 bpm, 3:30 (feel "Dark, Mysterious, Somber"; ISRC USUAN2000012; yüklenme 2020-10-09) | "Lost Time" — viyola, viyolonsel, kontrbas, ~55 bpm, 3:47 (feel "Somber, Dark"; ISRC USUAN1500032; yüklenme 2015-04-27) |
| Besteci / icracı | Kevin MacLeod | Kevin MacLeod |
| Dosya URL | https://incompetech.com/music/royalty-free/mp3-royaltyfree/SCP-x6x.mp3 (indirme 2026-11-16) | https://incompetech.com/music/royalty-free/mp3-royaltyfree/Lost%20Time.mp3 (indirme 2026-11-16) |
| Sayfa | https://incompetech.filmmusic.io/song/6736-scp-x6x-hopes- | https://incompetech.filmmusic.io/song/4005-lost-time/ |
| Ham dosya | `muzik/kaynak/incompetech-scp-x6x-hopes.mp3` (209.50 sn, sha256 `97b5969e9379853e1cc14028fbb908d8607f71ebea87f371ad0499ef94a0a414`) | `muzik/kaynak/incompetech-lost-time.mp3` (227.4 sn, sha256 `c6c06198854392d729d965fc531cff8b3580c177944a1f7c8542b99edf3f7f65`) |
| Kullanılan kesim | 0–22.2 sn aynen (+ sıkıştırma) → bölüm 0–22.2 sn; 193.6–198.4 sn (parçanın kendi bitişi) → bölüm 56.35–61.1 sn | 4.94–22.69 sn → 21.7–39.5 sn; 31.80–40.29 sn (%7.7 yavaş, perde aynı) → 39.05–48.2 sn; 40.19–49.40 sn → 48.1–57.3 sn |

Çıktı: `public/benmychree/muzik/bmc-muzik-61.mp3` (61.10 sn = 3666 kare); betik `tools/benmychree_muzik.py`.

**Gerekli atıf (video açıklamasına aynen, TR ve EN kanal):**
```
SCP-x6x (Hopes) Kevin MacLeod (incompetech.com)
Lost Time Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0 License
http://creativecommons.org/licenses/by/4.0/
```
CC BY §3 gereği değişiklik belirtilir; önerilen ek satır: "Müzik kısaltıldı, iki parça birleştirildi ve bir bölümü yavaşlatıldı." (EN: "Music was shortened, two pieces were combined and one section slowed.")

Risk notu: Incompetech parçaları Meta/YouTube Content ID'de talep alabilir (SSS ve `youtube-contentid.html` itiraz yolu verir: parça adı + lisans bağlantısı). Açıklamadaki atıf delil olarak durur. Çiçero'da aynı not geçerli.

### Neden bu iki parça (dönem notu)
Bölüm 1917 Doğu Akdeniz; dönem kaydı yok, ama dönem ima etmeyen/yanlış dönem okutmayan gösterişsiz piyano + yaylı yatak aranıyordu. Chopin kanalda iki bölümde (Blanc, Paris) kullanıldı ve 1830'lar Paris okutur; Satie Paris'te yedekti. Hopes seyrek piyano+viyolonsel (merak/keşif) ve kendi bitişiyle bookend verir; Lost Time katalog açıklamasında "diyaloğun altında yolunuza çıkmaz" diye tasarlanmış tek-doku yaylı yatak, ağırbaşlı yas/saygı için uygundur. Akor çevrimleri (Gm–Bb–C–D) bu bölümün üç ana noktasına (isabet, "Kimse ölmedi", saygı) ölçüyle oturtuldu (cue-sheet.md).

### Elenen adaylar
- **Kamu malı klasik (Musopen/archive.org):** tek tek öğelerde `licenseurl` yok (ör. `musopen-borodin-string-quartet-no-1-compressed`, `musopen-mendelssohn-quartet-in-f-minor-op-80-compressed`, `musopen-beethoven-string-quartet-in-b-flat-major-op-18-no-6`: metadata'da lisans alanı boş) → "lisansı doğrulanamayan parça KULLANILMAZ". Yalnız `musopen-dvd-in-lossless-flac-format` / `musopen-lossless-dvd` öğelerinde koleksiyon düzeyinde Public Domain Mark 1.0 var; içinden parça seçip dinleyip ölçmek bu turda yapılmadı (ses dinlenemediği için yalnız ölçüyle seçim zor). Çiçero lisanslar.md'deki aynı sonuç. Kullanıcı kamu malı klasik isterse sonraki adım: o DVD derlemesinden kuartet yavaş bölümü.
- Incompetech yedekleri (aynı lisans, indirilip ölçüldü, kullanılmadı): "Immersed" (piyano+yaylı, 64 bpm; mistik/bulutlu), "Wounded" (piyano+yaylı, "cenaze günü yağmur": fazla dramatik, 15 dB'lik dalgalı), "Mourning Song" (solo obua; ölüm sahnesi klişesi, 1:32 kısa), "Sad Trio", "Reawakening" (çok sessiz, −45 dBFS RMS), "Dark Times" (kontrbas ağır: apokalips).
- Pixabay Music, ElevenLabs Music: denenmedi (Incompetech yeterli; ElevenLabs Music ticari hak teyidi hâlâ açık).

## Foley ve ortam
- 17 foley + 3 ortam yatağı: **ElevenLabs Sound Generation** ile üretildi (abonelik içi, ticari kullanım uygun, atıf gerekmez; tek çekim; betik `tools/benmychree_sfx.py`, promptlar betikte). Üretilen süre ≈ 43.5 sn + 6 sn yeniden çekim (yangın yatağı KESIK) ≈ 990 karakter-kredisi (~20/sn); ek dış ücret **$0**.
- **Proje arşivinden yeniden kullanılan 2** (aynı abonelik): `bmc_igne_tak` ← `public/yarasa/foley/igne-tak.mp3`; `bmc_halat_gevsek` ← `public/paris/sfx/pk-halat-gevse.mp3`. **Türetilen 1:** `bmc_harita_cizgi_kisa` (üretilen `bmc_harita_cizgi`'nin 1.4 sn kesimi).
- Kenar kontrolü: hepsi `python3 -I tools/ses_kenar.py kontrol` → temiz (yangın yatağı ilk çekimde KESIK → yeniden üretildi, temiz). Tepe −3.3 dBFS'e eşitli; ortam −18 LUFS.
