# SOKAK-LG P03a (hedef-sokak) · tur-3 ölçümü (motion, 2026-11-16)
Kareler: `p03a.png` (f114), `p03a-360.png`, `p03a-guvenli.png`, `hedef-yaninda.jpg`. Kod: `src/kit/sablonlar/leningrad/SokakT3.tsx` (görünüm `p03a`; tur-2 kaydı `p03a-t2`).

| Ölçüt | Tur-2 | Tur-3 | Hedef | Durum |
|---|---|---|---|---|
| Sıcak piksel | %16.1 | **%37.6** | ≥ %14 | geçti |
| L* p5 / p50 / p95 | 13.3 / 52.0 / 78.9 | **12.0 / 57.6 / 82.6** | p5 ≤ 22, p95 ≥ 78 | geçti |
| Sol cephe C* medyanı / ton | 2.4 / 244° | **13.0 / 69°** | C* ≈ 10, ton 20–60° | C* geçti; ton 9° sarıya kaçık (okra binalar) |
| Sağ cephe (gölge) C* / ton | — | 17.0 / 57° | C* ≥ 10 | geçti |
| Kar L* p5–p95 (y 920–1900) | aralık 21 | **43.6–84.8 (aralık 41)** | ≥ 45 (brif) / ≥ 35 (eleştiri m.4) | eleştiri eşiği geçti, brif eşiğinde −4 |
| Konu ayrışması | | ekmek 31.6 ↔ ışıklı kar 81.1 (**−49**); avuç 64.7 ↔ palto 12.2 (**+52**) | ≥ 25 | geçti |
| Gök y 220–260 (5 px boşluk) | koyu çizgi | satır ortalaması 42.3–44.6, sıçrama yok | boşluk yok | geçti |
| Sahne maks C* | 37.2 | 39.3 (ışık şeridi kenarı, el) | ≤ 28 | kaldı (tur-2 ile aynı nedenler) |
| Kırmızı | 0 | 0 | 0 | geçti |
| Güvenli alan | 3 kilit, 0 ihlal | 3 kilit (yüz, ekmek, avuç), 0 ihlal | 0 | geçti |

## Kamera / ışık
Kamera ve güneş tur-2 ile aynı. Sol cephenin ışık sınırı artık sabit 16.5 m değil: h > H_sağ(z + 29.3) − 3.9, sağ çatı silüetini basamak basamak izliyor. Bina boyu 4–6 kat; %20'sinde kat adımı 3.2 m (diğerleri 3.6); yan yana iki bina en az 1 kat farklı.

## Müzisyen geometrisi (ekran px; yönetmen plana işlesin)
| Parça | Değer |
|---|---|
| Sağ omuz eklemi / başlık r | (234, 1262) / 74 |
| Sağ dirsek / bilek | (482, 1652) / (688, 1374) — konik kol [150, 122, 92] |
| Ekmek | merkez (790, 1214), 180×170, −14°; kare kalıp dilimi |
| Sağ el | IncEl `tutus`, E 204, açı −34° (eleştirinin −20…−35 aralığında) |
| Sol avuç | bilek (466, 1460), açı −30°, E 196 (eleştiri 220 istiyordu; kol kıvrımına sığması için 196) |
| Profil baş | LgBasProfil, kulak (40, 1000), H 330, eğim 9°, bakış aşağı |
