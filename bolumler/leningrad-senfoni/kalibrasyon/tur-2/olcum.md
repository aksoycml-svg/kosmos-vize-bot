# P12 f96 · SALON `konser` · kalibrasyon tur-2 ölçümü (motion, 2026-11-16)

Girdi: `notlar/tur-2.md` ("kontrast düşük gri biraz") + orkestra öncelik listesi (1 kontrast · 2 hale · 3 avize · 4 tarama/kontur · 5 çalgıcı · 6 seyirci) + CLAUDE.md "Omuz".
Kare: `p12-f96.png`, `p12-f96-360.png`, `p12-f96-guvenli.png`, `paris-yaninda.jpg`. Render ve araç tur-1 ile aynı.

## Değer aralığı (kullanıcı notu)
| | tur-1 | tur-2 | hedef |
|---|---|---|---|
| p5 L* | — (≈ 22) | **17.5** | belirgin düşük ✓ |
| p50 L* | — | **33.3** | — |
| p95 L* | 76.3 | **79.2** | ≥ 85 (tasarım) ✗ · ≥ 75 (brif) ✓ |
| L* std | ≈ 15 | **20.8** | açıldı |

## Genel ölçüt
| Ölçüt | tur-1 | tur-2 | Hedef | Durum |
|---|---|---|---|---|
| Sıcak piksel | %35.2 | **%34.4** | ≥ %35 | **0.6 puan altında** |
| Çubuk dışı maks C* | 26.0 | 28.1 (tek tük kenar pikseli; p99.9 25.8) | ≤ 28 | sınırda |
| Çubuk dışı maks L* | 86.4 | 86.1 (araç genel maks 89.4 = çubuk speküları) | ≤ 88 | ✓ |
| Kırmızı | 0 | 0 | 0 | ✓ |
| İmza bandı kutu dışı | 0 | 0 | ≤ %25 | ✓ (içeri 91 px, C* 58.9 = 2.1× sahne maks.) |
| Koltuk p99 C* | 18.5–20.2 | 16.5–18.5 | ≤ 20 | ✓ |

Bant bant sıcak % (y 0→1920, 240 px): 40 · 47 · 62 · 58 · 19 · 29 · 20 · 0 (tur-1: 15 · 38 · 85 · 73 · 21 · 21 · 9 · 0). Alt bant (ön seyirci + koltuk bandı) fiziksel olarak gölgede: avizeler bu sıraların önünde.

## Güvenli alan
Kilit 2 (çubuk uçları), ihlal 0.
