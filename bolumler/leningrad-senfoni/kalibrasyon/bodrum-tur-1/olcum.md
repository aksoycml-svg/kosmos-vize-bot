# BODRUM P08-3 f252 · yön karesi tur-1 ölçümü (motion, 2026-11-16)
Kareler: `p08-f252.png`, `-360.png`, `-guvenli.png`, `paris-yaninda.jpg`. Ölçüm betiği: Lab D65 (kalibrasyon_olcum.py ile aynı formül); sıcak = h 20–80°, C* ≥ 10.

| Ölçüt | Değer | Hedef | Durum |
|---|---|---|---|
| Sıcak piksel | **%8.1** | ≥ %14 (lint tabanı %10) | **kaldı** — lint tabanının da altında |
| L* p5 / p50 / p95 | 15.7 / 23.7 / **60.9** | p95 ≥ 75 (lint tabanı 70) | **kaldı** |
| C* medyanı | 20.9 | ≥ 18 | geçti |
| İmza bandı kutu dışı | 0 px (kutu içi 3432) | 0 | geçti |
| Çubuk C* / sahne maks | 60.7 / 35.1 → **1.73×** | ≥ 2.1× | kaldı (sahne maksı el ışık tonu + yarık halesi) |
| Çubuk dışı L* > 88 | 1 px | 0 | sınırda |
| Kırmızı | 0 | 0 | geçti |
| Güvenli alan | 4 kilit (yüz, işaret parmağı, 2 çubuk), 0 ihlal | 0 | geçti |
| Yüz yüksekliği | 292 px (%15) | ≈290 | geçti |
| El (bilek→uç) | ≈ 260 px (%13.5) | ≥ 230 (küçük jest) | geçti; şartnamedeki ~400 px değil |

## Kareye uyarlarken değişen değerler (yönetmen plana işlesin)
| Değer | Şartname | Kare | Neden |
|---|---|---|---|
| `merkez` | [540, 780] | **[540, 640]** | zemindeki çubuk ancak sırığın altından görünür; 780'de y ≈ 1620 → güvenli alan dışı. 640'ta çubuk y ≈ 1425 |
| çubuk konumu | (−0.45, 0.02, 2.55) | iki çubuk z 2.58–2.68, u −0.62…−0.12, levhayı ~20° keser | şartname konumu levhanın 11 cm solunda kalıyordu (levha u = 0.40 − 0.192·(6.4 − z)) |
| el | (−0.42, 0.82, 1.95), ≈400 px | bilek (−0.36, 0.80, 2.06) → işaret ucu (−0.50, 0.762, 1.935) | eli bezin üstüne yatırmak çubukları parmakların arkasından çıkardı |
| Eliasberg gövde u | −0.75 | −0.62 | baş gövdenin omzuna oturuyordu; gövde yine levhanın solunda (el ışıkta) |
| levha genişliği | 0.07 m (sedye) | 0.06 m | bant tahta gibi geniş okunuyordu |
| rıhtta ışık | "rıhtta kısa dikey parça" | yok | rıhtlar kameraya (−z), ışık +z'den gelir → rıht ışık alamaz; zikzak = basamak burnu önündeki ışıklı yüzler + karanlık rıhtlar |
| zemin yansıması | elips rx 1.4 | levha boyunca uzun elips 0.24×0.40 | geniş elips "sahne spotu" okunuyordu |
| Örtü | baştan kalçaya | bacaklar dahil tamamı örtülü | yakın kameradan bacak/ayak görünecekti (O7) |
