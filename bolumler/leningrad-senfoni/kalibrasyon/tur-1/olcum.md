# P12 f96 · SALON `konser` · kalibrasyon tur-1 ölçümü (motion, 2026-11-15)

Kare: `p12-f96.png` (1080×1920), `p12-f96-360.png` (telefon), `p12-f96-guvenli.png` (güvenli alan + kilit), `paris-yaninda.jpg` (Paris hedefiyle yan yana).
Render: `npx remotion still LeningradKalibrasyon … --frame=96 --gl=angle` (yerel headless Chrome: `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`; remotion.media indirmesi bu sunucudan kapalı).
Araç: `python3 -I tools/kalibrasyon_olcum.py` (genel) + bal-ten çubuk için ayrı imza hesabı (aracın `--imza`sı açık-nötr banknot için kurulu).

## Genel ölçüt
| Ölçüt | Hedef | Sonuç | Durum |
|---|---|---|---|
| Sıcak piksel (h 20–80°, C* ≥ 10) | ≥ %35 (konser) | **%35.2** | geçti (sınırda) |
| p95 L* | ≥ 75 (brif) / ≥ 85 (tasarım §2.7 konser) | **76.3** | brif geçti · tasarım hedefi **kaldı** |
| Çubuk dışı maks C* | ≤ 28 | 26.0 (p99.9 23.9), C* > 28 piksel 0 | geçti |
| Çubuk dışı maks L* | ≤ 88 | 86.4, L* > 88 piksel 0 | geçti |
| Kırmızı piksel | 0 | 0 | geçti |
| Koltuk (bordo-kahve) C* | ≤ 20 | alt bant ort 11.4 / p99 18.5; orta bant p99 20.2 | sınırda |

## İmza (çubuk kutusu x 725–840, y 990–1035)
| | Sonuç | Hedef |
|---|---|---|
| Çubuk maks C* / L* | 58.9 / 89.4 (spekülar `#FFF1CC`) | C* ≥ 2.1 × sahne maks (26.0 → 54.6) ✓ |
| İmza bandı (h 68–92°, C* > 40, L* 60–90) | kutu içi 93 px · kutu dışı **0 px** | dışarıda ≤ %25 ✓ |
| Ekran ölçüsü | çubuk ≈ 34 px uzunluk, kalınlık 4.5 px (1080) → telefonda ≈ 11 × 1.5 px | ≥ 20 px ✗ → `lint okunurluk_cubuk_P12` (orkestra kararı) |

## Bölge tablosu (ort L* / C* / h / sıcak%)
| Bölge | L* | C* | h | sıcak % |
|---|---|---|---|---|
| tavan y 0–240 | 45.4 | 10.1 | (karışık) | 16.4 |
| orta hacim y 480–960 | 66.1 | 14.9 | 86.5 | 79.6 |
| sahne y 960–1200 | 37.7 | 11.6 | — | 19.9 |
| ön seyirci y 1500–1920 | 24.8 | 11.2 | 283 | 7.5 |

## Güvenli alan
Kilit noktaları 2 (çubuk uçları), ihlal 0. Ayak/temas IG düğme sütununun (x > 920) dışında. Not: z14 avize çiftinin üst halkaları üst yazı bandına (y 240–400) yan uçlarda giriyor; yazı şeridi x 250–830'da kalırsa avize gövdeleri bandın dışında.
