# Müzik ve ses lisansları

## Blanc Kardeşler (bolumler/blanc-kardesler)

### Müzik
| Alan | Değer |
|---|---|
| Eser | Nocturne in C minor, B. 108 (KK IVb/8, 1837 civarı; ölümünden sonra yayımlandı) |
| Besteci | Frédéric Chopin (1810–1849) — eser kamu malı |
| Kayıt | "Frédéric Chopin — Nocturne in C minor, B. 108", Internet Archive / Musopen-Parso koleksiyonu (piyano kaydı) |
| Kaynak URL | https://archive.org/details/parso-0376f076666a403745bbb1c79277856a9f5ef9d4 |
| Lisans | CC0 1.0 / Public Domain Dedication (öğe metadata `licenseurl`: http://creativecommons.org/publicdomain/zero/1.0/) — ticari kullanıma uygun, atıf zorunlu değil |
| Atıf (isteğe bağlı) | Müzik: Chopin, Nocturne in C minor B. 108 (kamu malı, CC0 kayıt, Musopen/Internet Archive) |
| Kullanım | `public/blanc/muzik/chopin-nocturne-b108-blanc.mp3`: kaynağın 0:00.45–1:01.5 bölümü + açılış notası (0:00.45–0:04.65) P14'te geri dönüş; 64.23 sn |
| v4 kesim | `chopin-nocturne-b108-blanc-v4.mp3`: aynı kaynak (archive.org mp3, 0:00.45 başlangıç), ffmpeg ile yeniden düzenlendi (gövde 0–58.65 sn + 0.5 sn crossfade + açılış motifi, kuyruk dahil); 64.08 sn (v4.1, bölüm 62.17 sn) |
| EN kesim | `chopin-nocturne-b108-blanc-en.mp3`: v4 dosyasından türetildi (aynı kaynak/lisans; gövde 0–52.9 sn + 0.3 sn crossfade + açılış motifi 5.8 sn); 58.44 sn. Yeni lisans/atıf gerekmez. |
| Not | Lisans Internet Archive öğe sayfasındaki metadata'dan doğrulandı; kaydı yükleyenin kayıt hakkı beyanına dayanır (Musopen/Parso CC0 serisi). |

### Foley
- 4 dosya mevcut proje arşivinden (ElevenLabs SFX ile önceki üretim): muhur-tok, altin-singirti, baston-tak, fare-ciyak.
- 30 dosya ElevenLabs Sound Generation (Creator plan) ile üretildi; plan ticari kullanıma izin verir (abonelik şartları). Atıf gerekmez.

### v4 ek foley
- `public/blanc/sfx-v4/esneme-a.mp3`, `esneme-b.mp3`: ElevenLabs Sound Generation (Creator plan, ticari kullanım uygun, atıf gerekmez); v4'te yeniden üretildi.

## Evliya Çelebi'nin uçuşları (bolumler/evliya-ucuslari)

Ağ notu: archive.org / incompetech / pixabay / musopen bu sunucudan erişilemedi (proxy 403 / bağlantı yok); yalnız api.elevenlabs.io açık. Kamu malı Osmanlı kaydı indirilemedi, bu yüzden müzik ElevenLabs Music ile üretildi.

### Müzik
| Alan | Değer |
|---|---|
| Eser | "Evliya hicaz ostinato" — ElevenLabs Music ile üretilmiş özgün enstrümantal (ney, ud, tanbur, kanun, def; hicaz makamı havası, 72 bpm) |
| Besteci/icracı | Yok (yapay zekâ üretimi; insan icracı/besteci yok) |
| Kaynak | ElevenLabs Music API (`POST /v1/music`, `force_instrumental`, 70 sn) — ham dosya `public/evliya/muzik/ham-a.mp3` |
| Prompt | Instrumental, 17th century Ottoman court music mood, Istanbul 1630s: ney, oud, tanbur, kanun, frame drum, makam hicaz; low oud ostinato, rising ney melody in middle, returns to ostinato unresolved for loop |
| Lisans | ElevenLabs hizmet şartları: ücretli planda üretilen çıktı ticari kullanıma uygun; atıf zorunlu değil. DOĞRULAMA AÇIK: hesabın Music için ticari kullanım hakkı plan sayfasından kullanıcı tarafından teyit edilmeli (ücretsiz planda API kapalıydı; çağrı 200 döndü, plan Creator/Starter+ olarak varsayıldı) |
| Atıf | Gerekmez. İsteğe bağlı: "Müzik: ElevenLabs Music" |
| Kullanım | `public/evliya/muzik/evliya-hicaz-62.9.mp3`: ham 0–62.9 sn, 0.4 sn giriş + 1.4 sn çıkış fade; müzik zarfı (vurgu/alçalma) `tools/evliya_miks.py` içinde |
| 77 sn sürüm | `public/evliya/muzik/evliya-hicaz-77.mp3` (77.067 sn = 4624 kare): kaynak `ham-a.mp3` (aynı ElevenLabs Music üretimi, 70.06 sn); 63.56 sn'de (72 bpm, 10.04 sn = 12 vuruş = 3 ölçü periyot) 0.5 sn eşit-güç crossfade ile 53.5 sn'ye geri döngü (ek 10 sn ostinato; kesim noktası korelasyonla seçildi, 0.986), 0.4 sn giriş + 1.4 sn çıkış fade (sonda ostinato çözülmeden söner, P01'e döngü). Yeni lisans/atıf gerekmez; yukarıdaki "DOĞRULAMA AÇIK" notu aynen geçerli. Eski `evliya-hicaz-62.9.mp3` kullanımdan çıktı. Mikste seviye: konuşmada −22 dB, aralarda ≤ −16 dB (anlatıma göre). |
| Not | Dönem otantikliği düşük (üretim "Osmanlı havası"); kamu malı klasik/Osmanlı kayıt bulunursa değiştirilebilir. |

### Foley / ambiyans
- 43 klip `public/evliya/sfx/` (`tools/evliya_sfx.py`): ElevenLabs Sound Generation (aynı abonelik, ticari uygun, atıf gerekmez). Promptlar betikte.

## Paris kuşatması (bolumler/paris-kusatmasi) — 2026-11-14

Ağ notu (güncel): incompetech.com ve archive.org (metadata API) erişilebilir; archive.org dosya CDN düğümleri 403.

### Müzik — KULLANILAN (yedek): Incompetech "Gymnopedie No. 1"
| Alan | Değer |
|---|---|
| Eser | Gymnopédie No. 1 (Erik Satie, 1888; besteci kamu malı) |
| İcracı / kayıt | Kevin MacLeod (Incompetech), piyano |
| Kaynak URL | https://incompetech.com/music/royalty-free/mp3-royaltyfree/Gymnopedie%20No%201.mp3 (parça kaydı: pieces.json, isrc USUAN1100787, yüklenme 2011-01-10, 3:07, 77 bpm; filmmusic.io: https://incompetech.filmmusic.io/song/3837-gymnopedie-no-1/) |
| Lisans | Creative Commons Attribution 4.0 (CC BY 4.0) — Incompetech SSS sayfası (faq.html, 2026-11-14 okundu): kullanım için kredi zorunlu; kredi biçimi aşağıda. Ticari kullanım uygun. |
| **Atıf (açıklamaya ZORUNLU, TR ve EN)** | `Gymnopedie No. 1 Kevin MacLeod (incompetech.com)` `Licensed under Creative Commons: By Attribution 4.0 License` `http://creativecommons.org/licenses/by/4.0/` |
| Dosya | ham: `muzik/kaynak/gymnopedie-no1-kevin-macleod.mp3` (320 kbps, sha256 8cba6bb3da51066ad39520ec218a327bb6222d8fb32bc52f28a1e90b67756f70); kesim: `public/paris/muzik/paris-gymnopedie-58.mp3` (58.22 sn, `tools/paris_muzik.py`; ölçü ızgarası ve çapraz sönümlerle düzenlendi, "değiştirildi" notu atıfa eklenebilir) |
| Not | Eser dönem (1888) 1870'ten sonradır; ses olarak sorun görülmedi, kullanıcı karar versin. |

### Chopin (istenen birinci tercih) — indirilemedi
- Musopen "The Complete Chopin Collection" (https://archive.org/details/musopen-chopin, yükleyen aaron@musopen.org): öğe metadata `licenseurl` = http://creativecommons.org/publicdomain/zero/1.0/ (CC0) **doğrulandı** (2026-11-14, archive.org/metadata API).
- Hedef parça: "Nocturne Op. 9 no. 2 in E flat major.mp3" (4:36; md5 0cff0b549e8d7e2944bbfbf91b8a9a57). Dosya indirmesi archive.org'un CDN düğümlerine yönleniyor (ia800404.us.archive.org, dn710801.ca.archive.org); proxy politika denetimi 403 verdi, **yeniden denenmedi**. Düğümler izinlenirse bu parça ve CC0 lisansı hazır; Blanc'ta kullanılan B.108'den farklı parça.
- ElevenLabs Music: ticari hak teyidi hâlâ açık; kullanılmadı.

### Foley / ortam
- 14 foley ses mevcut proje arşivinden yeniden kullanıldı (Blanc/Evliya ElevenLabs SFX, Creator plan; ticari uygun, atıf gerekmez): kus-kanat, kagit-hisirti, kagit-yatis, sayfa-yatis, dosya-tok, dugum-tok, ip-zit, kalem-cizirti, teleskop-tik, sayac-tik, ahsap-tik, kagit-katlama, kagit-acilis, baslik-inis.
- 4 ortam yatağı mevcut dosyalardan (yeni kayıt yok): gece-ruzgar, sehir-ortam, ruzgar-bogaz, kagit-ortam (`bolumler/paris-kusatmasi/ortam.json`).
- 26 yeni foley ElevenLabs Sound Generation ile üretildi (`public/paris/sfx/`, `tools/paris_sfx.py`, 2026-11-14, tek çekim): Creator plan, ticari uygun, atıf gerekmez.
