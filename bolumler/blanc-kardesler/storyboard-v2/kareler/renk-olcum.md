# Renk ölçüm tablosu (A3/A4 · derecelendirme sonrası, 9×9 px ortalama; TOURS p60 A3 karesi — A4 bölüm 1'de yeniden render edilmedi)

Hedef = mekanlar.md malzeme rengi. L* = CIELAB parlaklık; ΔE = CIEDE2000; ΔH° = ölçülen − hedef ton açısı (a*b*), C* düşükse (< 10, nötr) ton açısı anlamsız → '—'. Geçme: |ΔL*| ≤ tol_L VE ΔE ≤ tol_E VE (nötr değilse) |ΔH°| ≤ 25.

| Kompozisyon | Kare | Nokta | (x,y) | Ölçülen | Hedef | Kaynak | L* ölç/hedef | ΔL* | C* ölç/hedef | ΔH° | ΔE00 | Sonuç |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| SB2-TOURS | p60 | duvar badana (ışıkta) | (300,360) | `#dfd3b4` | `#e2dccb` | SIVA Tours iç | 85/88 | -3 | 17/9 | — | 5.3 | ✓ |
| SB2-TOURS | p60 | pencere gök (geç gün) | (600,470) | `#cec19f` | `#e8c88a` | tasarım 1.4 gecGunGok | 78/82 | -4 | 19/35 | +8 | 8.4 | ✓ |
| SB2-TOURS | p60 | paket kâğıdı (güneşte) | (900,1250) | `#a98658` | `#b08a5a` | KAGIT-PAKET | 58/60 | -2 | 31/32 | +1 | 1.8 | ✓ |
| SB2-TOURS | p60 | masa (gölgede) | (980,1600) | `#7b5c3b` | `#7a5230` | AHSAP-MESE orta | 42/39 | +3 | 26/30 | +7 | 4.3 | ✓ |
| SB2-SOKAK | p0 | gök (üst) | (540,120) | `#222635` | `#0f1530` | gece gök | 15/8 | +8 | 11/22 | -9 | 8.0 | ✓ |
| SB2-SOKAK | p0 | kaldırım (ışık dışı) | (300,1650) | `#4b4b4f` | `#3a3e4c` | KALDIRIM-ISLAK | 32/26 | +6 | 3/9 | — | 6.9 | ✓ |
| SB2-SOKAK | p0 | cephe TAS-BDX (gece) | (120,700) | `#70644d` | `#8a7e66` | TAS-BDX gece | 43/53 | -10 | 15/15 | -2 | 10.2 | ✓ |
| SB2-BORSA | p0 | taş (ışıkta) | (300,140) | `#c7b387` | `#e2cfa0` | BORSA taş ışık | 74/84 | -10 | 25/26 | -3 | 7.1 | ✓ |
| SB2-BORSA | p0 | avlu taşı (güneşte) | (540,1500) | `#c9b486` | `#d4c29a` | BORSA avlu taşı | 74/79 | -5 | 26/22 | -1 | 4.0 | ✓ |
| SB2-BORSA | p0 | portik derin gölge | (140,820) | `#4a3d2d` | `#4a3e2c` | BORSA portik | 27/27 | -0 | 13/13 | -6 | 1.3 | ✓ |
| SB2-BORSA | p90 | kara tahta | (450,640) | `#2d3129` | `#1f2a26` | tahta | 20/16 | +4 | 7/9 | — | 4.8 | ✓ |
| SB2-BORSA | p0 | galeri tonoz gölgesi (III) | (600,560) | `#463a2a` | `#4a3e2c` | BORSA portik | 25/27 | -2 | 12/13 | -4 | 1.6 | ✓ |
