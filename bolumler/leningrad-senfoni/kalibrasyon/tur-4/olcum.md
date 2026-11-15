# P12 f96 · SALON `konser` · kalibrasyon tur-4 (son tur) ölçümü (motion, 2026-11-16)

Girdi: orkestra tur-3 teşhisi (1 kompozisyon · 2 figür karton · 3 ön plan flu · 4 kâğıt/baskı · 5 omuz · 6 C* medyanı).
Kare: `p12-f96.png`, `p12-f96-360.png`, `p12-f96-guvenli.png`, `paris-yaninda.jpg`.

## Ölçüm
| Ölçüt | tur-2 | tur-3 | tur-4 | Hedef | Durum |
|---|---|---|---|---|---|
| C* medyanı (p90) | 12.2 (19.8) | 16.7 (23.1) | **15.8 (22.4)** | ≥ 18 | **kaldı** |
| Sıcak piksel | %34.4 | %42.4 | **%38.0** | ≥ %35 | geçti |
| L* p5 / p50 / p95 | 17.5 / 33.3 / 79.2 | 20.5 / 41.3 / 79.4 | **17.9 / 35.6 / 77.8** | p95 ≥ 85 (tasarım) | p95 kaldı |
| L* std | 20.8 | 18.4 | 19.3 | — | |
| Çubuk dışı maks C* (p99.9) | 28.1 (25.8) | 27.8 (26.7) | **31.1 (27.4)**; C* > 28: 511 px (%0.02), arka duvar havuzunda gren tepeleri | ≤ 28 | sınırda |
| Çubuk dışı L* > 88 | — | birkaç px | 105 px (z14 avizesi lamba çekirdekleri, x ≈ 872 y ≈ 383) | 0 | sınırda |
| İmza bandı kutu dışı | 0 | 0 | **0** (kutu içi 167 px; çubuk C* 56.0 = 2.0× sahne p99.9-maks 27.4) | 0 | ✓ |
| Sütunda tarama | var | 0 | 0 | 0 | ✓ |
| Kırmızı | 0 | 0 | 0 | 0 | ✓ |
| Davul ø (1080) | 36 | 60 | **45** | ≥ 45 (orkestra) | ✓ (kasnak ışığı parlaklıkla; `lint okunurluk_cubuk_P12`) |
| Güvenli alan | 0 ihlal | 0 ihlal | 0 ihlal | | ✓ |

C* medyanının tur-3'ten düşük çıkma nedeni: flu kalkınca ve tarama/iç kıvrım eklenince koyu mürekkep pikselleri (C* < 10) arttı. Ek kâğıt lifi (multiply) de doygunluğu bir miktar kırıyor. Bu, "net çizgi + baskı hissi" kararının bilinen maliyeti.

## f96 kamera (yönetmen P12 çekim kartına işlesin)
| f | 0 | 40 | 60 | 80 | **96** | 208 |
|---|---|---|---|---|---|---|
| h (m) | 1.35 | 1.58 | 1.70 | 1.82 | **1.90** | 2.05 |
| eğim (°) | −1 | 0.67 | 1.6 | 2.3 | **2.5** | 3.0 |
| F (px) / ≈ mm (24 mm kısa kenar) | 1575 / 35 | 1575 / 35 | 1650 / 37 | 1780 / 40 | **1845 / 41** | 1845 / 41 |
| dolly z (m) | 0 | 0 | 0.32 | 0.81 | **1.0** | 1.0 |
| truck u (m) | −1 | −1 | −0.87 | −0.68 | **−0.6** | −0.6 |
| pan yaw (°) | 3 | 3 | 3.5 | 4.2 | **4.5** | 4.5 |
Crane + yavaş push-in, ışık dalgasıyla f40–96 (0.93 sn), kesme yok, crash zoom yok. f96: davul (742, 1028) ø 45 px; Eliasberg baş (496, 848) – ayak (495, 1142), 294 px; z10 avizelerinin yalnız alt kenarı üst köşelerde; z14/z18/z22 avize sırası, sütun dizisi ve sağ galeri kadrajda.
