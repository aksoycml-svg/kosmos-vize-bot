# P12 f96 · SALON `konser` · kalibrasyon tur-3 ölçümü (motion, 2026-11-16)

Girdi: `tur-2/elestiri.md` (6/10; D1–D5 + küçükler), orkestra kararları (D1 hex'leri motion seçer; D5 push-in).
Kare: `p12-f96.png`, `p12-f96-360.png`, `p12-f96-guvenli.png`, `paris-yaninda.jpg`. f96 artık push-in sonu (kamera yolu aşağıda).

## Kabul ölçütleri (eleştirmen)
| Ölçüt | tur-2 | tur-3 | Hedef | Durum |
|---|---|---|---|---|
| C* medyanı | 12.2 | **16.7** (p90 23.1) | ≥ 18 | **kaldı** (−1.3) |
| Sıcak piksel | %34.4 | **%42.4** | ≥ %35 | geçti |
| Sütunda tarama | var | **0** (yalnız başlık gölge yarısı) | 0 | geçti |
| f96 kasnak ışığı telefonda | yok (3 px) | kasnak yayı 6 px, davul ø ≈ 60 px; 360'ta çubuk V'si net, kasnak yayı ince çizgi | görünür | kısmen |
| Paris yan yana | 6 | öz puan 6.5 | ≥ 7 | eleştirmen |

## Diğer
| | tur-2 | tur-3 | hedef |
|---|---|---|---|
| L* p5 / p50 / p95 | 17.5 / 33.3 / 79.2 | 20.5 / 41.3 / 79.4 | p95 ≥ 85 (tasarım) ✗ |
| L* std | 20.8 | 18.4 | — |
| Çubuk dışı maks C* | 28.1 | 27.8 (p99.9 26.7) | ≤ 28 ✓ |
| Çubuk dışı maks L* | 86.1 | 88.9 (birkaç px, lamba çekirdeği) | ≤ 88 sınırda |
| İmza bandı kutu dışı | 0 | 0 (kutu içi 364 px; çubuk C* 60.0 = 2.16× sahne maks.) | ✓ |
| Kırmızı | 0 | 0 | ✓ |
| Koltuk bandı p99 C* (seyirci paltosu dahil) | 16.5 / 18.5 | 21.6 / 24.6 | koltuk ≤ 20 → koltuk hex'leri C* 17; bölge ölçüsü paltoları da içeriyor |
| Güvenli alan | 0 ihlal | 0 ihlal | ✓ |

Bant sıcak % (y 0→1920): 31 · 47 · 70 · 41 · 19 · 37 · 56 · 39.

## D1 — seçilen hex'ler (`salonDunya.ts` `LG`; tasarımcı `tasarim.md`'yi eşitleyecek)
Yöntem: aynı L*, ton ve doygunluk Lab'da hedeflendi.
| Ad | eski | yeni | L* / C* / h |
|---|---|---|---|
| golge | `#3e3b5c` | `#3a3c5c` | 26 / 21 / 292 |
| derin | `#2f2d46` | `#292e4b` | 20 / 20 / 289 |
| hacim | `#4a4062` | `#474163` | 29 / 22 / 300 |
| orta | `#6d6384` | `#676588` | 44 / 21 / 295 |
| uzak (soğuk buğu hedefi) | `#b98a9e` | `#948bb5` | 60 / 24 / 300 |
| isikMor (yeni: soğuk yüzeyin ışık yarısı) | — | `#8488b6` | 58 / 26 / 290 |
| duvar ×3 (yeni: arka duvar havuzu) | (havuz) | `#d1a18a` · `#e8b799` · `#f0cbae` | 70/24/52 · 78/26/58 · ~84/22/64 |
| sutIsik | `#e6cfba` | `#f3cdb4` | 85 / 20 / 62 |
| sutOrta | `#b8a3a6` | `#c99f95` | 69 / 18 / 38 |
| sutGolge | `#6d6384` | `#63658d` | 44 / 24 / 292 |
| sutDerin | `#3e3b5c` | `#363e63` | 27 / 24 / 288 |
| sivaGolge, tahtaGolge, derz | `#5b5575` | `#555678` | 38 / 21 / 292 |
| tarama | `#2f2d46` | `#2a2e4a` | 20 / 19 / 290 |
| cerceve | `#3a3550` | `#373652` | 24 / 19 / 295 |
| koltukDerin / Golge / Isik | `#3e2f38` / `#4a3a44` / `#8a6a68` | `#4b2929` / `#593735` / `#8f6963` | 21/17/24 · 27/17/26 · 48/17/32 (bordo-kahve, kırmızı testinden geçer) |
| palto ×3 | `#4f4668` `#5a5068` `#4f5a62` | `#46486d` `#575073` `#3b5c7b` | C* 21–23 |
| muzisyen ×4 | `#5a5068` `#4f5a62` `#625a52` `#4a4d44` | `#505277` `#3b5c7d` `#7a5244` `#4d4769` | C* 21–23 (zeytin-griler gitti) |
| ceket / ceketGolge / ceketIsik / pantolon | `#4a4668` `#2f2d46` `#6a6488` `#34334a` | `#444867` `#292e4b` `#646689` `#31344d` | C* 17–21 |
| metal (avize) | `#5a4638` | `#604637` | 32 / 16 / 55 |
| kasket | `#4a4d44` | `#4d4860` | 32 / 15 / 300 |
| saç ×6 | — | `#2a2226` `#5d4033` `#6e4d3b` `#83746b` `#84644e` `#5a4638` | C* 15–20 |
| hale ışığı (yalnız screen karışımı) | `LG.altin` normal | `#cf9a66` screen, α .40/.20 | sonuç C* ≤ 28 |

## D5 — kamera yolu (`Kalibrasyon.tsx` `kamera_yol`)
| f | 0 | 40 | 60 | 80 | 96 | 208 |
|---|---|---|---|---|---|---|
| h (m) | 1.35 | 1.58 | 1.70 | 1.82 | 1.90 | 2.05 |
| eğim (°) | −1 | 0.67 | 1.0 | 1.1 | 1.0 | 1.4 |
| F (px) | 1575 | 1575 | 1759 | 2041 | **2150** (~48 mm) | 2150 |
| z dolly (m) | 0 | 0 | 0.96 | 2.43 | **3.0** | 3.0 |
| u truck (m) | −1 | −1 | −0.78 | −0.43 | −0.3 | −0.3 |
| yaw (°) | 3 | 3 | 3.96 | 5.43 | 6 | 6 |
Push-in f80–96 yerine **f40–96**: 16 karede davulu ≥ 60 px'e getirmek crash zoom olurdu (savaş konusu: yasak). Dalga da f30'da başladığı için kamera ışıkla birlikte yaklaşıyor. Kesme yok.
