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

Ağ notu: bu oturumda archive.org / incompetech.com / pixabay.com / musopen.org DNS çözülmedi (oturum ağ izin listesinde yok; WebFetch ENOTFOUND). **Hiçbir parça indirilemedi, lisans kaynak sayfasından doğrulanamadı → aşağıdakilerin HİÇBİRİ henüz kullanılamaz.** Web aramasında yalnız koleksiyon düzeyinde bilgi görüldü.

### Müzik adayları (DOĞRULANMADI)
| # | Eser | Besteci / kayıt | Kaynak | Lisans durumu | Atıf |
|---|---|---|---|---|---|
| 1 | Nocturne Op.9 No.2 (Es majör) | Chopin (kamu malı, Paris'te yaşadı) / Musopen Chopin koleksiyonu piyano kaydı | https://archive.org/details/musopen-chopin | Koleksiyon sayfası arama özetinde "CC0 1.0 Universal" görünüyor; **parça dosya adı ve öğe metadata'sı açılıp doğrulanmalı** (Blanc'ta aynı serinin lisansı öğe `licenseurl` ile doğrulanmıştı) | Gerekmez (isteğe bağlı: "Chopin, Nocturne Op.9 No.2 — Musopen/Internet Archive, CC0") |
| 2 | Prelude Op.28 No.4 (mi minör) | Chopin / aynı koleksiyon | aynı | aynı; doğrulanmadı | aynı |
| 3 | Gymnopédie No.1 (Satie, 1888 — 1870'e göre sonra) | Kevin MacLeod, Incompetech | https://incompetech.com (parça sayfası bulunup URL'si yazılmalı) | Beklenen: CC BY 4.0, **atıf zorunlu**; sayfadan doğrulanmadı | "Gymnopedie No 1 by Kevin MacLeod (incompetech.com), CC BY 4.0" — parça sayfası açılıp birebir metin alınmalı |
- Not: Blanc'ta Chopin B.108 kullanıldı; aynı besteci kanal tekrarı sayılabilir (kullanıcı kararı). Fransız alternatif (Fauré Op.17/3 "Romance sans paroles", 1863): arama kamu malı **kayıt** bulamadı; bir kaydın ("non-commercial" şartlı kopya göründü) lisansı ticari kullanıma uygun değil → kullanılmaz.
- ElevenLabs Music: ticari hak teyidi hâlâ açık (DEVAM.md, Evliya notu). Abonelik sorgusu plan `creator`, durum `active` gösterdi; Music için ticari kullanım plan sayfasından kullanıcı tarafından teyit edilmeli. Son çare.

### Foley / ortam
- 14 foley ses mevcut proje arşivinden yeniden kullanıldı (Blanc/Evliya ElevenLabs SFX, Creator plan; ticari uygun, atıf gerekmez): kus-kanat, kagit-hisirti, kagit-yatis, sayfa-yatis, dosya-tok, dugum-tok, ip-zit, kalem-cizirti, teleskop-tik, sayac-tik, ahsap-tik, kagit-katlama, kagit-acilis, baslik-inis.
- 4 ortam yatağı mevcut dosyalardan (yeni kayıt yok): gece-ruzgar, sehir-ortam, ruzgar-bogaz, kagit-ortam (`bolumler/paris-kusatmasi/ortam.json`).
- 25–26 yeni foley ElevenLabs Sound Generation ile üretilecek (**henüz üretilmedi**, onay bekliyor): Creator plan, ticari uygun, atıf gerekmez.
