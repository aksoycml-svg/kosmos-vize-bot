# Blanc v3 karakter sesleri

Tarih: 2026-11-07 · Plan: ElevenLabs Creator (kullanılan ses slotu: 7 / 30) · Model: eleven_multilingual_v2, dil tr
Anlatıcı (değişmedi): Umut Canbay (`jZQNewKOZcubZDDwBxdL`).

## Karakter → ses

| Karakter | Dosya | voice_id | Ad (kütüphane) | Gerekçe | Ayarlar |
|---|---|---|---|---|---|
| FRANÇOIS | `public/blanc/ses-v3/P04-francois.mp3` (süre 2.40 sn) | `vwmWyMlmlJtiiXeCVRKn` | Batuhan Altınova - Warm (istanbul, orta yaş, erkek, deep/warm) | Sıcak, orta yaş erkek tınısı; "sinsi gülümseme" için stil payı | stability 0.40 · similarity 0.80 · style 0.50 · speed 1.00 |
| LOUIS | `public/blanc/ses-v3/P05-louis.mp3` (süre 1.93 sn) | `AMjkpTkYyZF0aFQa3oLV` | Levent - Narrator (standard, orta yaş, erkek, neutral) | Etiketi "neutral"; düz, sakin, soğuk okuma; stil sıfır | stability 0.75 · similarity 0.80 · style 0.00 · speed 0.95 |
| MEMUR | `public/blanc/ses-v3/P10-memur.mp3` (süre 1.75 sn) | `MuOq11XzQTthwLhmGZ2V` | Nihat - The Timeless Narrator (black sea, yaşlı, erkek, deep) | Yaşlı, derin tını; yorgun ve kırık okuma için düşük stabilite | stability 0.25 · similarity 0.80 · style 0.60 · speed 0.80 |

Kullanılan karakter sesi: 3 (FRANÇOIS, LOUIS, MEMUR). Anlatıcı sesi ayrı (Umut Canbay).

## Alternatif adaylar (`public/blanc/ses-v3/aday/`)

| Karakter | Aday | voice_id | Dosya | Not |
|---|---|---|---|---|
| FRANÇOIS | a2 | `TsbuCXs5FlyiITqKGmO5` (Kutay Altan - Warm) | `aday/P04-francois-a2.mp3` | Daha yüksek perde (medyan ≈165 Hz; a1 ≈145 Hz). Ücretli kütüphane sesi. |
| LOUIS | a2 | `jXQQtt6VqErg2FxVySNR` (Oguz Delioğlu - Turkish Narrator) | `aday/P05-louis-a2.mp3` | Daha "chill" tını; soğukluk az. |
| MEMUR | a2 | `iaO74V3r84UsdPt3frCW` (Arslan - Calm & Natural) | `aday/P10-memur-a2.mp3` | Genç ve sakin; yorgunluk az. Ölçülen perde (≈74 Hz) güvenilir değil (kırık/fısıltı sesinde oktav hatası olabilir). |

Eski Umut Canbay sürümleri (karakter için, referans): `aday/umut/P04-francois.*`, `aday/umut/P05-louis.*`, `aday/umut/P10-memur.*`.

## Notlar
- Seçim işitsel dinlemeden değil, etiket (cinsiyet/yaş/üslup) ve kaba perde ölçümüyle yapıldı (`ffmpeg` + otokorelasyon). **Kararı kullanıcı dinleyerek onaylamalı**; farklı çıkarsa yukarıdaki aday tablosundan değiştirilir.
- MEMUR "fısıltı" tam sağlanamadı: ElevenLabs'te fısıltı modu yok; düşük stabilite + yavaş hız (0.80) ile yorgun/kırık hissi denendi. Gerekirse hız 0.70–0.75 ya da farklı aday.
- Süreler, Umut sürümlerinden farklıdır; `P04/P05/P10` json dosyaları (kelime zamanlaması) yeni seslere göre üretildi. Remotion bileşenlerinde süre/zamanlama bu dosyalardan okunmalı.
- Metinler değişmedi: "Herkesten önce bilen… kazanır." / "Tek bir hata. Fazlası değil." / "Eldiven… çorap…".
- API anahtarı hiçbir çıktıda yazdırılmadı.

## v4 (senaryo-v4, 14 plan)

Tarih: 2026-11-07 · Model: anlatıcı ve FRANÇOIS `eleven_multilingual_v2` (dil tr); MEMUR `eleven_v3` · Çıktı: `public/blanc/ses-v4/` · Zamanlama: `bolumler/blanc-kardesler/zamanlama-v4.json`

### Dosyalar
- Anlatıcı (Umut Canbay, v3 ayarları): `P01`, `P02`, `P03`, `P05`–`P14` (`P10.mp3` = "İki yıl sonra memur ağır hastalanıyor.").
- FRANÇOIS (`vwmWyMlmlJtiiXeCVRKn`, v3 ayarları: stability 0.40 · similarity 0.80 · style 0.50 · speed 1.00): `P04-francois.mp3` ("Hattı satın alamayız… memurunu alırız.").
- MEMUR (P10): `P10-memur.mp3` = aday B (Nihat, eleven_v3, `[whispers]` etiketi, stability 0.0, similarity 0.80). Metin json'da etiketsiz: "Hatalar… kasıtlıydı."
- Her mp3 için `.json` (kelime zamanlaması; köşeli parantez etiketleri kelime listesinden çıkarıldı).
- Ekran yazıları ve sahne sesleri seslendirilmedi (yalnız anlatım ve replik).

### Memur adayları (`public/blanc/ses-v4/aday/`)
| Aday | Ses | Model · ayar | Dosya | Süre | Konuşma RMS | Perde (medyan) | Periyodiklik (medyan) |
|---|---|---|---|---|---|---|---|
| A | Nihat `MuOq11XzQTthwLhmGZ2V` | multilingual v2 · stab 0.25 · style 0.6 · speed 0.75 (v3 ayarı, yavaş) | `P10-memur-A.mp3` | 2.23 | −28.0 dB | 113 Hz | 0.644 |
| **B ★** | Nihat | eleven_v3 · `[whispers]` · stab 0.0 | `P10-memur-B.mp3` (= `P10-memur.mp3`) | 2.00 | −26.7 dB | 80 Hz | 0.468 |
| C | Arslan `iaO74V3r84UsdPt3frCW` | eleven_v3 · `[whispers]` · stab 0.0 | `P10-memur-C.mp3` | 2.80 | −20.9 dB (tepe −7.3) | 90 Hz | 0.468 |
| Ref. v3 | Nihat | multilingual v2 · stab 0.25 · style 0.6 · speed 0.80 | `ses-v3/P10-memur.mp3` | 1.72 | −23.0 dB | 131 Hz | 0.745 |
| Ref. v3 a2 | Arslan | multilingual v2 (v3 aday) | `ses-v3/aday/P10-memur-a2.mp3` | 1.72 | −29.4 dB | 74 Hz | 0.530 |

Ölçüm: `ffmpeg` 16 kHz mono + otokorelasyon (70–300 Hz, 20 ms çerçeve). Periyodiklik düşükse ses daha nefesli/gürültülü; konuşma RMS düşükse daha alçak enerjili.

### Seçim gerekçesi
- Kriter: düşük enerji ve nefes. B, v3 referansından (periyodiklik 0.745 → 0.468) belirgin biçimde daha nefesli ve konuşma enerjisi v3'ten düşük (−23.0 → −26.7 dB). Perdesi en düşük aday (80 Hz) yaşlı ve güçsüz tını veriyor.
- A en düşük enerjili tınılardan biri değil (−28 dB) ve periyodikliği yüksek (0.644): daha dinç okunuyor. C tepe −7.3 dB'ye çıkıyor (ani vurgu): fısıltı ve yorgunluk için uygun değil.
- **Sınır:** Seçim yalnız ölçümle yapıldı, dinleme yapılmadı. Ölçüm "hasta" hissini kanıtlamaz; **kullanıcı dinleyip onaylamalı.** Olmazsa sıra: A (daha dinç) → C. Adaylar ve json'ları saklı.
- Kelime süresi: B 2.00 sn; "Hatalar…" ile "kasıtlıydı." arasında 0.11 sn (1.08→1.19). Fısıltıdan sonra 0.3 sn sessizlik plan montajında eklenmeli.

### Süre ve plan sığması (ses + 0.3 sn nefes > plan süresi → SIĞMIYOR)
| Plan | Plan | Ses | Ses+0.3 | Durum |
|---|---|---|---|---|
| P01 | 3.0 | 3.11 | 3.41 | **sığmıyor** (+0.11 sn) |
| P02 | 4.0 | 3.89 | 4.19 | **sığmıyor** (+0.19 sn) |
| P03 | 5.0 | 4.62 | 4.92 | sınırda |
| P10 | 4.5 | 2.51 + 2.04 = 4.55 | 4.85 | **sığmıyor** (+0.35 sn; anlatıcı önce, memur sonra varsayıldı) |
| diğerleri | | | | sığıyor |

Toplam gerçek süre tahmini (her plan max(plan, ses+0.4)): **61.3 sn** (plan toplamı 60.0 sn; fark P01, P02, P10'dan).

### Harcanan kredi (tahmin)
- Gönderilen karakter: ana set 690 (anlatıcı + FRANÇOIS) + adaylar 82 (A 20, B 31, C 31; `[whispers]` etiketi dahil) = **≈772 karakter**. ElevenLabs `/v1/user/subscription` sayacı üretimden önce ve sonra 678 okundu (değişmedi; sayaç gecikmeli güncellenebilir). Creator planında 129 065 karakter limitinin çok altında.
- Yeniden üretim (kredi tekrarı) yapılmadı; bir ses dosyası üretilirken hata olmadı.
