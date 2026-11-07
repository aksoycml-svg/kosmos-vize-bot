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
