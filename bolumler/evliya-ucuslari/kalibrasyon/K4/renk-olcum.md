# K4 renk ölçümü (motion, 2026-11-08) — tools/renk_olcum.py, kaynak renk-olcum.json
Notlar:
- [ışık] satırları K3 V9: ışık katmanı bölgelerindeki imza bandı pikselleri ayrı sayılır, orana girmez (eleştirmen §2.1). P12'de demet yok (şart (b) uygulanmaz).
- P11 sikke: parlama ve gövde yüzleri ayrı ayrı ΔE ≥ 15 (parlama merkezi tek piksel ΔE 17.6; 7x7 ortalama sınırı kestiği için 12.4). Kalan imza pikselleri parlama↔gövde 1 px sınır çizgisi + kese ağzındaki sikke kenarı; K3'te 235 örnekti.
- P02 gök noktası (540,330) şenlik dumanı/üst bant karışımı; köşk/gök tonu bu turda değişmedi (K3 ölçümü geçerli).

| Kare | Nokta | (x,y) | Ölçülen | Hedef | L* ölç/hedef | ΔL* | C* ölç/hedef | C* oranı | Δh° | ΔE00 | Sonuç |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P12 p0 | iç duvar gölge | (600,250) | `#39332f` | `#3a3430` | 21.7 / 22.2 | -0.5 | 4.0 / 3.9 | 100% | -0 | 0.3 | TAMAM |
| P12 p0 | pencere dışı | (920,600) | `#e7ddbe` | `#ece2c4` | 88.2 / 90.0 | -1.8 | 16.5 / 16.0 | 104% | +0 | 1.2 | TAMAM |
| P12 p0 | kapı içi | (150,1150) | `#29231f` | `#2a2420` | 14.2 / 14.7 | -0.5 | 4.2 / 4.2 | 100% | -0 | 0.3 | TAMAM |
| P12 p0 | zemin | (700,1800) | `#2d2722` | `#2e2824` | 16.1 / 16.6 | -0.5 | 4.7 / 4.1 | 113% | +6 | 0.8 | TAMAM |
| P12 p66 | iç duvar gölge | (700,250) | `#38332f` | `#3a3430` | 21.6 / 22.2 | -0.6 | 3.6 / 3.9 | 92% | +5 | 0.7 | TAMAM |
| P12 p66 | kaftan gölge | (378,1608) | `#342f2b` | `#36302c` | 19.8 / 20.4 | -0.6 | 3.7 / 4.0 | 92% | +5 | 0.7 | TAMAM |
| P12 p66 | kapı içi | (150,1300) | `#25201d` | `#2a2420` | 12.7 / 14.7 | -2.0 | 3.4 / 4.2 | 81% | -3 | 1.5 | TAMAM |
| P12 p150 | iç duvar gölge | (700,250) | `#39332f` | `#3a3430` | 21.7 / 22.2 | -0.5 | 4.0 / 3.9 | 100% | -0 | 0.3 | TAMAM |
| P12 p150 | kapı içi | (150,1400) | `#201c19` | `#2a2420` | 10.6 / 14.7 | -4.1 | 3.1 / 4.2 | 73% | +4 | 2.9 | TAMAM |
| P12 p204 | iç duvar gölge | (700,120) | `#38312d` | `#3a3430` | 20.9 / 22.2 | -1.3 | 4.4 / 3.9 | 111% | -4 | 1.1 | TAMAM |
| P12 p204 | kapı içi | (150,1400) | `#29231e` | `#2a2420` | 14.2 / 14.7 | -0.5 | 4.7 / 4.2 | 113% | +6 | 0.8 | TAMAM |
| P02 p80 | gece gök (orta basamak) | (540,330) | `#2f3137` | `#1c2232` | 20.3 / 13.4 | +7.0 | 4.2 / 11.6 | 36% | -3 | 7.3 | KROMA |
| P02 p80 | deniz | (300,1750) | `#191e29` | `#161c26` | 11.2 / 10.1 | +1.1 | 8.2 / 7.7 | 107% | +5 | 1.2 | TAMAM |
| P02 p80 | köşk cephe gece | (880,1000) | `#45413e` | `#4e4a46` | 27.8 / 31.7 | -3.9 | 2.7 / 3.1 | 86% | -8 | 3.1 | TAMAM |
| P10 p0 | gün gök | (540,120) | `#a2aeb6` | `#a9b6bf` | 70.4 / 73.3 | -2.9 | 6.1 / 6.7 | 91% | -1 | 2.3 | TAMAM |
| P10 p0 | deniz | (540,1880) | `#596b6f` | `#5e7378` | 43.9 / 47.0 | -3.0 | 7.3 / 8.4 | 87% | -1 | 3.1 | TAMAM |
| P10 p0 | köşk cephe | (900,1100) | `#aca087` | `#b4a88e` | 66.3 / 69.2 | -3.0 | 14.6 / 15.0 | 97% | -1 | 2.4 | TAMAM |
| P10 p0 | yansıma kemer dilimi | (388,1530) | `#586a6e` | `#5e7378` | 43.5 / 47.0 | -3.5 | 7.3 / 8.4 | 87% | -1 | 3.4 | TAMAM |
| P10 p280 | cumba ahşap | (300,1100) | `#503825` | `#6a4a30` | 25.8 / 34.3 | -8.6 | 17.9 / 23.2 | 77% | -0 | 7.2 | KOYU |
| P11 p192 | döşeme | (700,1600) | `#9e9481` | `#a09682` | 61.7 / 62.4 | -0.7 | 11.4 / 11.9 | 96% | -1 | 0.7 | TAMAM |
| P07 p0 | deniz | (150,600) | `#151b25` | `#161c26` | 9.6 / 10.1 | -0.5 | 7.8 / 7.7 | 100% | +0 | 0.3 | TAMAM |

| Kare | Parça | (x,y) | Ölçülen | L* | ΔE76 imza | Sonuç |
|---|---|---|---|---|---|---|
| P12 p0 | padişah sarık (şeritte) | (370,640) | `#cfccbf` | 82.0 | 26.9 | TAMAM |
| P12 p0 | padişah yüz ten ışıklı | (459,684) | `#d99e88` | 70.2 | 19.2 | TAMAM |
| P12 p0 | padişah kaftan (şeritte) | (440,1300) | `#8a7f65` | 53.5 | 22.6 | TAMAM |
| P12 p66 | padişah yüz ten ışıklı bant | (429,690) | `#d89d88` | 69.8 | 19.6 | TAMAM |
| P12 p66 | padişah kaftan ışıklı bant | (483,971) | `#897e65` | 53.1 | 23.2 | TAMAM |
| P12 p66 | padişah sarık (gölge) | (420,450) | `#433f3b` | 26.9 | 51.3 | TAMAM |
| P12 p150 | el (gölgede) | (159,1063) | `#6c4e40` | 36.0 | 39.1 | TAMAM |
| P12 p150 | sırt şeridi | (470,1100) | `#887d64` | 52.8 | 23.5 | TAMAM |
| P02 p80 | padişah sarık (siluet) | (558,759) | `#2b2626` | 15.7 | 62.1 | TAMAM |
| P10 p0 | padişah (siluet) | (558,789) | `#2a2622` | 15.5 | 61.2 | TAMAM |
| P10 p280 | padişah (siluet) | (468,900) | `#2b2623` | 15.6 | 61.3 | TAMAM |
| P11 p192 | sikke gövde | (830,1405) | `#bf9a47` | 65.5 | 17.8 | TAMAM |
| P11 p192 | sikke parlama | (790,1395) | `#d3b76c` | 75.3 | 12.4 | İHLAL |
| P07 p0 | ıslak kol (yen) | (120,1400) | `#1f273b` | 15.8 | 70.3 | TAMAM |

- P12 p0: [ışık] pencere açıklığı + sütun: imza bandında 35 örnek (oranın dışında; muafiyet §2.1)
- P12 p0: imza #c4a874 ΔE76<15 — demet bölgesinde 0 örnek, DIŞINDA (ışık hariç) 0 örnek → demet kadrajda yok, imza pikseli yok (TAMAM)
- P12 p0: kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
- P12 p66: [ışık] sütun (hava): imza bandında 44 örnek (oranın dışında; muafiyet §2.1)
- P12 p66: imza #c4a874 ΔE76<15 — demet bölgesinde 0 örnek, DIŞINDA (ışık hariç) 0 örnek → demet kadrajda yok, imza pikseli yok (TAMAM)
- P12 p66: kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
- P12 p150: [ışık] sütun (hava): imza bandında 26 örnek (oranın dışında; muafiyet §2.1)
- P12 p150: imza #c4a874 ΔE76<15 — demet bölgesinde 0 örnek, DIŞINDA (ışık hariç) 0 örnek → demet kadrajda yok, imza pikseli yok (TAMAM)
- P12 p150: kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
- P12 p204: [ışık] sütun (hava): imza bandında 35 örnek (oranın dışında; muafiyet §2.1)
- P12 p204: imza #c4a874 ΔE76<15 — demet bölgesinde 0 örnek, DIŞINDA (ışık hariç) 0 örnek → demet kadrajda yok, imza pikseli yok (TAMAM)
- P12 p204: kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
- P02 p80: [ışık] pencere + havuz: imza bandında 287 örnek (oranın dışında; muafiyet §2.1)
- P02 p80: [ışık] şenlik 1 (düşen çizgiler): imza bandında 74 örnek (oranın dışında; muafiyet §2.1)
- P02 p80: [ışık] meşale halesi: imza bandında 0 örnek (oranın dışında; muafiyet §2.1)
- P02 p80: imza #c4a874 ΔE76<15 — demet bölgesinde 8 örnek, DIŞINDA (ışık hariç) 0 örnek → oran %0 (TAMAM ≤ %25)
- P02 p80: kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
- P10 p0: [ışık] padişah kenar ışığı: imza bandında 59 örnek (oranın dışında; muafiyet §2.1)
- P10 p0: imza #c4a874 ΔE76<15 — demet bölgesinde 0 örnek, DIŞINDA (ışık hariç) 0 örnek → demet kadrajda yok, imza pikseli yok (TAMAM)
- P10 p0: kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
- P10 p280: [ışık] padişah kenar ışığı: imza bandında 187 örnek (oranın dışında; muafiyet §2.1)
- P10 p280: imza #c4a874 ΔE76<15 — demet bölgesinde 0 örnek, DIŞINDA (ışık hariç) 0 örnek → demet kadrajda yok, imza pikseli yok (TAMAM)
- P10 p280: kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
- P11 p192: imza #c4a874 ΔE76<15 — demet bölgesinde 0 örnek, DIŞINDA (ışık hariç) 27 örnek → demet kadrajda yok, 27 imza pikseli (İHLAL) (kutu (758, 1332, 804, 1414) tam boy; yoğun hücreler [(760, 1400, 12), (760, 1320, 7), (760, 1360, 4), (800, 1360, 3)])
- P11 p192: kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
- P07 p0: [ışık] pencere havuzu: imza bandında 0 örnek (oranın dışında; muafiyet §2.1)
- P07 p0: imza #c4a874 ΔE76<15 — demet bölgesinde 0 örnek, DIŞINDA (ışık hariç) 0 örnek → demet kadrajda yok, imza pikseli yok (TAMAM)
- P07 p0: kırmızı piksel (ton 340–12°, S>.5, V>.3): 0 örnek
