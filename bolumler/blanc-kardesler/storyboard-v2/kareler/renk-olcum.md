# Renk ölçüm tablosu (A4b · derecelendirme sonrası, 9×9 px ortalama; tüm kareler A4b render)

Hedef = mekanlar.md malzeme rengi. L* = CIELAB parlaklık; ΔE = CIEDE2000; ΔH° = ölçülen − hedef ton açısı (a*b*), C* düşükse (< 10, nötr) ton açısı anlamsız → '—'. Geçme: |ΔL*| ≤ tol_L VE ΔE ≤ tol_E VE (nötr değilse) |ΔH°| ≤ 25.

| Kompozisyon | Kare | Nokta | (x,y) | Ölçülen | Hedef | Kaynak | L* ölç/hedef | ΔL* | C* ölç/hedef | ΔH° | ΔE00 | Sonuç |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| SB2-TOURS | p60 | duvar badana (ışıkta) | (300,360) | `#ded2b2` | `#e2dccb` | SIVA Tours iç | 84/88 | -3 | 17/9 | — | 5.7 | ✓ |
| SB2-TOURS | p60 | pencere gök (geç gün) | (690,470) | `#dec38b` | `#e8c88a` | tasarım 1.4 gecGunGok | 80/82 | -2 | 32/35 | +2 | 2.2 | ✓ |
| SB2-TOURS | p60 | paket kâğıdı (güneşte) | (900,1250) | `#a78559` | `#b08a5a` | KAGIT-PAKET | 58/60 | -2 | 30/32 | +1 | 2.4 | ✓ |
| SB2-TOURS | p60 | masa (gölgede) | (980,1600) | `#92734c` | `#7a5230` | AHSAP-MESE orta | 51/39 | +12 | 27/30 | +12 | 12.3 | ✓ |
| SB2-SOKAK | p0 | gök (üst) | (540,120) | `#222635` | `#0f1530` | gece gök | 15/8 | +8 | 11/22 | -9 | 8.0 | ✓ |
| SB2-SOKAK | p0 | kaldırım (ışık dışı) | (300,1650) | `#4b4b4f` | `#3a3e4c` | KALDIRIM-ISLAK | 32/26 | +6 | 3/9 | — | 6.9 | ✓ |
| SB2-SOKAK | p0 | cephe TAS-BDX (gece) | (120,700) | `#70644d` | `#8a7e66` | TAS-BDX gece | 43/53 | -10 | 15/15 | -2 | 10.2 | ✓ |
| SB2-BORSA | p0 | taş (ışıkta) | (300,140) | `#c7b387` | `#e2cfa0` | BORSA taş ışık | 74/84 | -10 | 25/26 | -3 | 7.1 | ✓ |
| SB2-BORSA | p0 | avlu taşı (güneşte) | (540,1500) | `#c9b486` | `#d4c29a` | BORSA avlu taşı | 74/79 | -5 | 26/22 | -1 | 4.0 | ✓ |
| SB2-BORSA | p0 | portik derin gölge | (140,820) | `#4a3d2d` | `#4a3e2c` | BORSA portik | 27/27 | -0 | 13/13 | -6 | 1.3 | ✓ |
| SB2-BORSA | p90 | kara tahta | (450,640) | `#2d3129` | `#1f2a26` | tahta | 20/16 | +4 | 7/9 | — | 4.8 | ✓ |
| SB2-BORSA | p0 | galeri tonoz gölgesi (III) | (600,560) | `#463a2a` | `#4a3e2c` | BORSA portik | 25/27 | -2 | 12/13 | -4 | 1.6 | ✓ |

## Eldiven beyazı denetimi (A5r) — bant L* ≥ 90, C* < 12; taba ΔE2000 hero'ya ≥ 20, L* ≤ 70

Bant pikseli = ışık altı bandı (gündüz L* ≥ 80, gece L* ≥ 70; C* ≤ 18 — palet bandı derecelendirmeden sonra hiç oluşmuyor, ayrı sütun). Beyaz: ≥ %12; yasak/taba: ≤ %2.

| Kompozisyon | Kare | Bölge | Kutu | Tip | Işık altı bant | Palet bandı | Ölçülen (medyan) | L* | ΔE00 hero | Sonuç |
|---|---|---|---|---|---|---|---|---|---|---|
| SB2-TOURS | p60 | kahraman eldiven (A, elde) | (660,1220)–(800,1450) | beyaz | %43.3 | %0.0 | `#c8bc9f` | 77 | 13.3 | ✓ |
| SB2-TOURS | p60 | memurun eli (çıplak) | (440,1120)–(560,1200) | yasak | %0.0 | %0.0 | `#cba680` | 71 | 20.9 | ✓ |
| SB2-TOURS | p155 | kahraman eldiven (A, havuzda) | (560,1180)–(720,1260) | beyaz | %67.5 | %0.0 | `#e1d6bb` | 86 | 7.6 | ✓ |
| SB2-BORSA | p0 | François eli (taba) | (198,1055)–(238,1095) | taba | %0.0 | %0.0 | `#7a5f44` | 42 | 42.6 | ✓ |
| SB2-BORSA | p0 | tüccar eli (çıplak) | (205,1220)–(245,1255) | yasak | %0.0 | %0.0 | `#b89672` | 64 | 24.5 | ✓ |
| SB2-BORSA | p0 | cep köşesi (B, orta) | (784,1054)–(808,1078) | beyaz | %18.4 | %0.0 | `#ac9e83` | 66 | 20.9 | ✓ |
| SB2-BORSA | p168 | Louis yazan el (çıplak) | (330,1010)–(470,1110) | yasak | %0.4 | %0.0 | `#cea37b` | 70 | 22.1 | ✓ |
| SB2-BORSA | p168 | cep köşesi (B, göğüs) | (660,1060)–(760,1130) | beyaz | %15.3 | %0.0 | `#72443d` | 34 | 53.6 | ✓ |
| SB2-SOKAK | p150 | Louis serbest eli (çıplak, manşet hariç) | (738,1228)–(780,1262) | yasak | %0.0 | %0.0 | `#cba177` | 69 | 22.6 | ✓ |
| SB2-SOKAK | p150 | cep köşesi (B, bel) | (850,1062)–(888,1092) | beyaz | %26.1 | %0.0 | `#7f403b` | 35 | 53.9 | ✓ |
