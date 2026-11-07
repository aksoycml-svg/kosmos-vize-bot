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

## v4 miks (kesintisiz müzik)

**Müzik:** `public/blanc/muzik/chopin-nocturne-b108-blanc-v4.mp3` (61.62 sn = 3697 kare; v3 kesimden yeniden düzenlendi: gövde 0–58.65 sn + 0.5 sn crossfade + açılış motifi; motif P14'te ~kare 3490'da geri döner). Hiç `muzik_istisnalari` yok (−60, −14 dipleri kaldırıldı); yalnız anlatım duck'ı: −8 (anlatımsız) ↔ −18 (anlatım), atak 18 / bırakma 36 kare, en dik eğim 0.56 dB/kare. Fade-in 12, fade-out 60 kare (3630–3690, P14 sonu).

| Plan | Müzik aralığı (dB) | Not |
|---|---|---|
| P01 | −14.7 → −18 | Açılış notası, anlatım altında |
| P02–P03 | −18 .. −13.7 | Boşluklar 23–28 kare: müzik dalgalanır, kesilmez |
| P04 | −18 .. −11.3 | v3'teki 1.1 sn sessizlik kaldırıldı; fare anı müzikle taşınır |
| P05 | −18 .. −8 | P05→P06 arası 90 karelik boşlukta −8'e açılır |
| P06 | −18 .. −10.5 | |
| P07 | −18 .. −8 | Hile planı: P07→P08 boşluğunda açılır |
| P08 | −18 .. −10.2 | Esneme sırasında −18 (anlatım altında) |
| P09 | −18 .. −8 | P09→P10 boşluğunda −8 |
| P10 | −18 .. −11.9 | Sonda kesinti/dalış yok; memur fısıltısı −18 altında |
| P11 | −18 .. −10.2 | −60 dalışı kaldırıldı; salon iç çekişi efekti kullanılmıyor |
| P12 | −18 .. −11.3 | Eldiven giyerken müzik sürer (−18..−14) |
| P13 | −18 .. −8 | |
| P14 | −18 → −8 → fade-out | Tema dönüşü kare ~3490; bitişte fade-out |

**Esneme adayları (uykulu/rahat, −6 dB gömülü):**
- A (seçili, foley.json): `public/blanc/sfx-v4/esneme-a.mp3` (1.65 sn)
- B: `public/blanc/sfx-v4/esneme-b.mp3` (1.80 sn, daha nefesli). Geçiş için `foley.json > esneme.dosya` değiştirilir.
- Dinlenmeden seçildi; kullanıcı dinleyip onaylamalı.

**Ortam (yağmur):** eklenmedi. Kit sürekli ortam katmanı desteklemiyor; yalnız `temaslar[].ses` var ve temaslar `bolum.json` (yönetmen) sahipliğinde. İstenirse P04 kare 0'a "yagmur" temas + kısık (−24) dosya eklenebilir.

**Yönetmene notlar:**
1. P07 11 kol varışının sesi yok (doğrulayıcı uyarısı): kule1 p84, p172; kule2 p60, p114, p202; kule3 p84, p144, p232; kule4 p108, p174, p262. Pozlar aynıysa anahtarı sil, kol gerçekten hareket ediyorsa kule 1 için `kol-klak` (−6), diğerleri `klak-uzak` (−12..−14) temas ekle (kule 2 p60 ilk MESAJ'ın sesi de yok).
2. P10 kare 302 `sessizlik` (−60) temasını sil: tam sessizlik kullanılmıyor.
3. P08 `esneme` temas `db`'si (−6) miks'i ezer; dosyada −6 gömülü, yani etkin ≈ −12. `db` alanını kaldırmak ya da −6'da bırakmak serbest, ayrıca düşürme.
4. P07 `kol-klak-sert` temas `db: 0` kullanıcı "foley yüksek" geri bildirimine aykırı; −3 önerilir (miks istisnası −3 ama temas.db onu ezer).
