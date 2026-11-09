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
| Not | Dönem otantikliği düşük (üretim "Osmanlı havası"); kamu malı klasik/Osmanlı kayıt bulunursa değiştirilebilir. |

### Foley / ambiyans
- 43 klip `public/evliya/sfx/` (`tools/evliya_sfx.py`): ElevenLabs Sound Generation (aynı abonelik, ticari uygun, atıf gerekmez). Promptlar betikte.
