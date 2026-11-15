# Çiçero — ilk kurgu teslimi (2026-11-15)

**Videolar (yerel, git'te değil):** `out/cicero/cicero-tr.mp4`, `out/cicero/cicero-en.mp4` — 1080x1920, 60 fps, 64.83 sn; TR −14.0 / EN −14.2 LUFS, tepe −1.9 dBTP. Yeniden üretim: `python3 -I tools/cicero_miks.py tr en && bash tools/cicero_render.sh`. İlk sürüm (jüri öncesi) `out/cicero/v1/`, jüri sonrası `out/cicero/v2/`. **v3 (bu sürüm):** tur-4 notları — ARABA v2 (P01 el+pencere, P05 sedir insert, P09a dış) ve el-kol kuralları.

**Kalite kapısı:** kalibrasyon 5.5 → 8 düzeltme + v2 orkestra kapısı; ilk kurgu jürisi 6/9 → 3 düzeltme + P04 fizik düzeltmesi uygulandı (bu sürüm).

## Paylaşım
- **Kapak:** SAHTE PARAYLA ÖDENEN CASUS
- **TR açıklama:** `senaryo.md` §9 + aşağıdaki müzik atfı.
- **EN description:** `senaryo-en.md` (Description) + music credit below.
- **Müzik atfı (CC BY 4.0, zorunlu):**
  Measured Paces Kevin MacLeod (incompetech.com)
  Licensed under Creative Commons: By Attribution 4.0 License
  http://creativecommons.org/licenses/by/4.0/
  (Müzik kısaltıldı, tempo %0.8 yavaşlatıldı.)

## Kulakla bakılacak saniyeler
0.7–1.0 kâğıt + ilk nota · 8.07 kilit · 15.62 mum · 22.85–23.6 üç deklanşör · 24.4–25.9 ayak gölgesi/su · 38.17 çekmece (EN'de sessiz boşlukta) · 43.97 çarpı · 48.23 fincan · 54.1–54.8 araba kapısı (açılış −17 dB) · 56.5–58.4 lamba · 60.3–64.8 son nota ve döngü. Müzik konuşma altında kısık (kural: −22 dB); "müzik yok gibi" gelirse ilk 34 sn açılır.

## Bilinen kusurlar (sonraki tur / kit)
- Bazna'nın yüzü karikatüre yakın; P05'te yüz büyük.
- Gece araba kareleri p95 L* 69–74 (izinli). P05 sedirin alt üçte biri sade.
- P04 sonunda komodin sol kenarda ~150 px görünür.
- P10: masadaki ikinci banknot arka yüzüyle boş kart gibi okunuyor.
- Elçi kapıyı elsiz açıyor; yetkilinin eğilmesi tek parça.
- Lamba huzmesi boyun açısını izlemiyor (P04).
