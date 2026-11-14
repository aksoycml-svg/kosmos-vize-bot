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

Ağ notu (güncel): archive.org dosya CDN düğümleri artık izinli; Chopin indirildi.

### Müzik — KULLANILAN: Chopin Nocturne Op. 9 no. 2 (Musopen, CC0)
| Alan | Değer |
|---|---|
| Eser | Nocturne in E-flat major, Op. 9 no. 2 (Frédéric Chopin, 1830–32; Paris dönemi; besteci kamu malı) — Blanc'taki B.108'den farklı parça |
| İcracı / kayıt | Musopen "The Complete Chopin Collection" (piyano; yükleyen aaron@musopen.org) |
| Kaynak URL | https://archive.org/details/musopen-chopin — dosya: https://archive.org/download/musopen-chopin/Nocturne%20Op.%209%20no.%202%20in%20E%20flat%20major.mp3 (indirme 2026-11-14, dn710801.ca.archive.org) |
| Lisans | CC0 1.0 / Public Domain Dedication (öğe metadata `licenseurl`: http://creativecommons.org/publicdomain/zero/1.0/, 2026-11-14 doğrulandı) — ticari kullanıma uygun, atıf zorunlu değil |
| Atıf (isteğe bağlı) | Müzik: Chopin, Nocturne Op. 9 no. 2 (kamu malı, CC0 kayıt, Musopen/Internet Archive) |
| Dosya | ham: `muzik/kaynak/chopin-nocturne-op9-no2-musopen.mp3` (4:36.65, md5 0cff0b549e8d7e2944bbfbf91b8a9a57 = listelenen md5 ✓, sha256 d6a289cd51123f0033fb6e4014277495340c6d3afa3a4e42e7cd89bcf634d917); kesim: `public/paris/muzik/paris-chopin-op9no2-58.mp3` (58.22 sn, `tools/paris_muzik.py`; 3 parça, %6.4 yavaşlatma, çapraz sönüm) |
| Not | Lisans metadata'dan doğrulandı; kaydın hak beyanı yükleyene dayanır (Blanc ile aynı Musopen CC0 serisi). Kayıt rubato olduğundan kesimler ölçü ızgarasıyla değil Eb/Bb tonik–dominant noktalarından yapıldı. |

### Müzik — KULLANILMIYOR (yedek): Incompetech "Gymnopedie No. 1"
Orkestra kararıyla (dönem uygunluğu: Satie 1888, 1830'lar Paris değil) Chopin ile değiştirildi. **Bu parça bölümde kullanılmıyor; açıklamaya Incompetech atfı EKLENMEZ.** Yedek olarak dosyalar duruyor (`muzik/kaynak/gymnopedie-no1-kevin-macleod.mp3`, `public/paris/muzik/paris-gymnopedie-58.mp3`, `tools/paris_muzik_satie.py`). Geri dönülürse atıf zorunlu: `Gymnopedie No. 1 Kevin MacLeod (incompetech.com)` `Licensed under Creative Commons: By Attribution 4.0 License` `http://creativecommons.org/licenses/by/4.0/` (CC BY 4.0; kaynak https://incompetech.com/music/royalty-free/mp3-royaltyfree/Gymnopedie%20No%201.mp3; ham sha256 8cba6bb3da51066ad39520ec218a327bb6222d8fb32bc52f28a1e90b67756f70).

### ElevenLabs Music
Ticari hak teyidi hâlâ açık; kullanılmadı.

### Foley / ortam
- 14 foley ses mevcut proje arşivinden yeniden kullanıldı (Blanc/Evliya ElevenLabs SFX, Creator plan; ticari uygun, atıf gerekmez): kus-kanat, kagit-hisirti, kagit-yatis, sayfa-yatis, dosya-tok, dugum-tok, ip-zit, kalem-cizirti, teleskop-tik, sayac-tik, ahsap-tik, kagit-katlama, kagit-acilis, baslik-inis.
- 4 ortam yatağı mevcut dosyalardan (yeni kayıt yok): gece-ruzgar, sehir-ortam, ruzgar-bogaz, kagit-ortam (`bolumler/paris-kusatmasi/ortam.json`).
- 26 yeni foley ElevenLabs Sound Generation ile üretildi (`public/paris/sfx/`, `tools/paris_sfx.py`, 2026-11-14, tek çekim): Creator plan, ticari uygun, atıf gerekmez.
