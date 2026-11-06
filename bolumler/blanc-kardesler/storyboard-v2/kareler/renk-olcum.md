# Renk ölçüm tablosu (A3 · derecelendirme sonrası, 9×9 px ortalama)

Hedef = mekanlar.md malzeme rengi. L* = CIELAB parlaklık; ΔE = CIEDE2000; ΔH° = ölçülen − hedef ton açısı (a*b*), C* düşükse (< 10, nötr) ton açısı anlamsız → '—'. Geçme: |ΔL*| ≤ tol_L VE ΔE ≤ tol_E VE (nötr değilse) |ΔH°| ≤ 25.

| Kompozisyon | Kare | Nokta | (x,y) | Ölçülen | Hedef | Kaynak | L* ölç/hedef | ΔL* | C* ölç/hedef | ΔH° | ΔE00 | Sonuç |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| SB2-TOURS | p60 | duvar badana (ışıkta) | (300,360) | `#dfd3b4` | `#e2dccb` | SIVA Tours iç | 85/88 | -3 | 17/9 | — | 5.3 | ✓ |
| SB2-TOURS | p60 | pencere gök (geç gün) | (600,470) | `#cec19f` | `#e8c88a` | tasarım 1.4 gecGunGok | 78/82 | -4 | 19/35 | +8 | 8.4 | ✓ |
| SB2-TOURS | p60 | paket kâğıdı (güneşte) | (900,1250) | `#a98658` | `#b08a5a` | KAGIT-PAKET | 58/60 | -2 | 31/32 | +1 | 1.8 | ✓ |
| SB2-TOURS | p60 | masa (gölgede) | (980,1600) | `#7b5c3b` | `#7a5230` | AHSAP-MESE orta | 42/39 | +3 | 26/30 | +7 | 4.3 | ✓ |
| SB2-SOKAK | p0 | gök (üst) | (540,120) | `#222635` | `#0f1530` | gece gök | 15/8 | +8 | 11/22 | -9 | 8.0 | ✓ |
| SB2-SOKAK | p0 | kaldırım (ışık dışı) | (300,1650) | `#4b4a4f` | `#3a3e4c` | KALDIRIM-ISLAK | 32/26 | +5 | 4/9 | — | 6.5 | ✓ |
| SB2-SOKAK | p0 | cephe TAS-BDX (gece) | (120,700) | `#85765b` | `#8a7e66` | TAS-BDX gece | 50/53 | -3 | 17/15 | -4 | 3.3 | ✓ |
| SB2-BORSA | p0 | taş (ışıkta) | (300,140) | `#c7b388` | `#e2cfa0` | BORSA taş ışık | 74/84 | -10 | 25/26 | -3 | 7.1 | ✓ |
| SB2-BORSA | p0 | avlu taşı (güneşte) | (540,1500) | `#cab587` | `#d4c29a` | BORSA avlu taşı | 74/79 | -5 | 26/22 | -1 | 3.8 | ✓ |
| SB2-BORSA | p0 | portik derin gölge | (140,820) | `#5e4f39` | `#4a3e2c` | BORSA portik | 35/27 | +8 | 16/13 | -1 | 6.1 | ✓ |
| SB2-BORSA | p90 | kara tahta | (450,640) | `#2e332a` | `#1f2a26` | tahta | 21/16 | +5 | 8/9 | — | 5.0 | ✓ |
