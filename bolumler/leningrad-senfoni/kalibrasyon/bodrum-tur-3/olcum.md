# BODRUM P08 (hedef-morg) · tur-3 ölçümü (motion, 2026-11-16)
Kareler: `p08.png` (f252), `p08-360.png`, `p08-guvenli.png`, `hedef-yaninda.jpg` (hedef | bizim). Kod: `src/kit/sablonlar/leningrad/BodrumT3.tsx` (görünüm `p08`; tur-2 kaydı `p08-t2`), figür kiti `lgFigur.tsx`.
Ölçüm: `tools/kalibrasyon_olcum.py` (Lab D65, sıcak = h 20–80°, C* ≥ 10).

| Ölçüt | Tur-2 | Tur-3 | Hedef | Durum |
|---|---|---|---|---|
| Sıcak piksel | %20.0 | **%15.1** | ≥ %14 | geçti (önde zemin ışığı kalktı; sıcaklık paltoya taşındı) |
| L* p5 / p50 / p95 | 13.7 / 26.7 / 81.9 | **11.3 / 19.8 / 75.2** | p5 ≤ 22, p95 ≥ 78 | **p95 kaldı (−2.8)** — önde zemin ve örtünün çoğu artık gölgede (K1, madde 6) |
| Örtü L* p5/p50/p95 | medyan 79 | **17 / 44.8 / 75.3** | hedef medyan 47, aralık 6–76 | geçti |
| Konu ayrışması | yüz +38, el +33 | yüz 60.8 ↔ çevre 36.3 (**+24.5**); ölü el 63.2 ↔ çevre 28.4 (**+35**) | ≥ 25 | yüz sınırda (−0.5) |
| C* medyanı | 19.4 | 18.2 | ≥ 18 | geçti |
| Kırmızı | 0 | 0 | 0 | geçti |
| Güvenli alan | 2 kilit, 0 ihlal | 2 kilit (yüz, ölü el), 0 ihlal | 0 | geçti. Dizdeki el x ≈ 920–990, IG düğme sütununda (kilit değil, tur-2'deki gibi) |

## Kadraj (yönetmen plana işlesin)
| Değer | Tur-2 | Tur-3 |
|---|---|---|
| Dekor kaydırması | 150 px | **170 px** (parmak uçları y ≈ 1460, IG alt arayüzünün üstünde) |
| Yüz merkezi / yükseklik | (700, 462) · 235 | (698, 436) · 235 (%12.2) |
| Ölü el bileği / uç | (520, 1350) / ≈ 1590 | (520, 1248) / ≈ 1450; E 205 |
| Sedye | ön yüz görünmüyordu | tahta ön üst kenarı y = 1228 + 0.04·(x − 60), kalınlık 38, ayaklar zemine y 1630 |
| Işık | s = (−260, −410) | değişmedi (kaydırma dahil s = (−260, −430)) |

## Işığın yolu
- Zemin ışığı yalnız sedyenin arkasındaki bantta (kaydırma öncesi y 1075–1290). Sedyenin altı ve önü `LM.zemin`. Elin altında sedye gölgesinin içinde koyu temas lekesi.
- Huzme ve toz sedyenin arkasında kırpılı. Ele inen dar ışın kanalı (eğim 2.02–2.32) örtünün üstünden geçer; 16 toz zerresiyle okunur. Ölü el ve önkolu ışıkta.
- Dizdeki el ve gövdenin sağ yarısı Eliasberg'in kendi gölgesinde (ışın gövdeden geçmez).
