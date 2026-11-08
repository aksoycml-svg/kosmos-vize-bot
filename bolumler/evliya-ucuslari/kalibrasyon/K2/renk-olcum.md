# K2 renk ölçümü (motion, 2026-11-08) — render'dan, sRGB→Lab D65, 7x7 ort.

Araç: `python3 -I tools/renk_olcum.py renk-olcum.json`. Gündüz derecelendirmesi yeni `gunduzMineral` modu (doygunluk 1.0, max(in,bp)); eski `gunduz` ile ilk ölçümde deniz TON hatası (Δh −63°) ve basamak üstünün imza bandına düşmesi (24 bin örnek) görüldü → düzeltildi.

| Kare | Nokta | (x,y) | Ölçülen | Hedef | L* ölç/hedef | ΔL* | C* ölç/hedef | C* oranı | Δh° | ΔE00 | Sonuç |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P11 p72 (gün) | gündüz gök (ufuk üstü şerit) | (560,150) | `#c9c9be` | `#cfcfc4` | 80.7 / 82.8 | -2.2 | 5.8 / 5.8 | 101% | -0 | 1.5 | TAMAM |
| P11 p72 (gün) | gün deniz | (300,600) | `#5d7176` | `#5e7378` | 46.2 / 47.0 | -0.7 | 8.1 / 8.4 | 96% | +1 | 0.8 | TAMAM |
| P11 p72 (gün) | rıhtım gün | (700,1700) | `#9d937f` | `#a09682` | 61.3 / 62.4 | -1.1 | 11.9 / 11.9 | 100% | -0 | 1.0 | TAMAM |
| P11 p72 (gün) | köşk altyapı duvarı gün | (1040,1000) | `#a99d84` | `#b4a88e` | 65.1 / 69.2 | -4.1 | 14.7 / 15.0 | 98% | -1 | 3.3 | TAMAM |
| P11 p72 (gün) | kemer içi gün | (900,520) | `#2f2a27` | `#3a3430` | 17.5 / 22.2 | -4.7 | 3.2 / 3.9 | 82% | -3 | 3.3 | TAMAM |
| P07 p72 (gece) | gece gök orta (insert) | (300,90) | `#171b29` | `#1c2232` | 10.0 / 13.4 | -3.4 | 10.4 / 11.6 | 90% | +3 | 2.4 | TAMAM |
| P07 p72 (gece) | gece rıhtım (havuz dışı) | (420,1250) | `#444349` | `#45444a` | 28.7 / 29.1 | -0.4 | 3.9 / 3.9 | 100% | +0 | 0.3 | TAMAM |
| P07 p72 (gece) | gece köşk duvarı | (1000,1150) | `#3e3d44` | `#4e4a46` | 26.1 / 31.7 | -5.6 | 4.6 / 3.1 | 149% | -138 | 8.0 | TAMAM |
| P11 p208 (gün) | rıhtım gün | (700,1700) | `#9d927e` | `#a09682` | 61.0 / 62.4 | -1.4 | 12.1 / 11.9 | 102% | -2 | 1.3 | TAMAM |
| P05 p78 (gece, katlı kanat) | gece gök orta | (300,300) | `#1b2130` | `#1c2232` | 12.8 / 13.4 | -0.5 | 11.0 / 11.6 | 94% | -1 | 0.6 | TAMAM |

| Kare | Parça | (x,y) | Ölçülen | L* | ΔE76 imza | Sonuç |
|---|---|---|---|---|---|---|
| P11 p72 (gün) | kese (gün, avuçta) | (660,880) | `#867d6c` | 52.8 | 26.7 | TAMAM |
| P11 p72 (gün) | Hezarfen eli | (700,990) | `#9f6b51` | 50.1 | 26.0 | TAMAM |
| P07 p72 (gece) | veren el (entari-yen) | (660,880) | `#ba836b` | 59.6 | 20.7 | TAMAM |
| P07 p72 (gece) | Lagâri ıslak eli | (700,990) | `#a4684e` | 49.9 | 27.9 | TAMAM |
| P07 p72 (gece) | kese (gece) | (800,880) | `#615545` | 36.9 | 38.6 | TAMAM |
| P11 p208 (gün) | altın sikke (yatık) | (830,1425) | `#c49e48` | 67.0 | 18.8 | TAMAM |
| P11 p208 (gün) | kese (yerde) | (640,1300) | `#605444` | 36.5 | 38.9 | TAMAM |
| P11 p208 (gün) | muhafız eli | (84,968) | `#80563f` | 40.6 | 33.4 | TAMAM |
| P05 p78 (gece, katlı kanat) | Y1 arka baş (saç) | (270,760) | `#2a201c` | 13.3 | 62.6 | TAMAM |

- P11 p72 (gün): imza #c4a874 ΔE76<15 — demet bölgesinde 0 örnek, DIŞINDA 14 örnek → oran %inf (İHLAL ≤ %25) (kutu (782, 774, 796, 790) tam boy; yoğun hücreler [(760, 760, 14)])
- P11 p72 (gün): kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
- P07 p72 (gece): imza #c4a874 ΔE76<15 — demet bölgesinde 0 örnek, DIŞINDA 2 örnek → oran %inf (İHLAL ≤ %25) (kutu (784, 772, 786, 772) tam boy; yoğun hücreler [(760, 760, 2)])
- P07 p72 (gece): kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
- P11 p208 (gün): imza #c4a874 ΔE76<15 — demet bölgesinde 0 örnek, DIŞINDA 10 örnek → oran %inf (İHLAL ≤ %25) (kutu (760, 1330, 768, 1346) tam boy; yoğun hücreler [(760, 1320, 10)])
- P11 p208 (gün): kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
- P05 p78 (gece, katlı kanat): imza #c4a874 ΔE76<15 — demet bölgesinde 4528 örnek, DIŞINDA 0 örnek → oran %0 (TAMAM ≤ %25)
- P05 p78 (gece, katlı kanat): kırmızı piksel (ton 340–12°, S>.5, V>.3): 17 örnek

## Özet
- **Gündüz kroma (P11):** gök %101, deniz %96, rıhtım %100–102, köşk duvarı %98, kemer içi %82 → hepsi ≥ %70, Δh ≤ 3°.
- **Gece (P07):** gök %90, rıhtım %100 (ΔE00 0.3), köşk duvarı ΔL −5.6 (C* < 5, ton aranmaz).
- **Parça başına imza ΔE76 (≥ 15):** kese gün 26.7 / gece 38.6 / yerde 38.9 · altın sikke 18.8 (eski derecelendirmede 14.0 İHLAL idi) · veren el 20.7 · Lagâri ıslak el 27.9 · Hezarfen eli 26.0 · muhafız eli 33.4. Tasarım K2 notundaki sınırda tonlar (#c48c72, #a87256) render'da geçti.
- **İmza bölgesi taraması:** P07/P11'de demet yok (oran "inf" anlamsız); bölge dışı imza pikseli 2–14 örnek: kese ağzındaki altın sikke kenarı ve sikke kenarı parlaması (antialias). Geniş alan yok.
- **Kanat L\* (P06 p38–60, 2 karede bir, kanat ton ailesi maskesi):** 22.9–24.2; komşu kare farkı en çok 0.9 (sınır 6). Gök orta L\* 12.8 → ΔL ≈ 10–11 + amber kenar. (Maske dumanın koyu tonunu kısmen içerebilir; yaklaşık.)
- Kırmızı piksel: P07/P11 0.
