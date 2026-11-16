# SOKAK-LG P03a (hedef-sokak) · tur-4 ölçümü (motion, 2026-11-16) — kalıcı çizim araçlarıyla
Kareler: `p03a.png` (f114), `p03a-360.png`, `p03a-guvenli.png`, `hedef-yaninda.jpg` (hedef | tur-3 | tur-4). Kod: `src/kit/sablonlar/leningrad/SokakT4.tsx` (görünüm `p03a`; tur-3 kaydı `p03a-t3`).

| Ölçüt | Tur-3 | Tur-4 | Hedef | Durum |
|---|---|---|---|---|
| Sıcak piksel | %37.6 | **%35.5** | ≥ %14 | geçti |
| L* p5 / p50 / p95 | 12.0 / 57.6 / 82.6 | **11.4 / 56.7 / 82.1** | p5 ≤ 22, p95 ≥ 78 | geçti |
| Doku yoğunluğu (ΔL* ort.) | 3.79 | **4.40** (+%16) | — | cephe/kar/palto taraması |
| Konu ayrışması | ekmek 27.7 ↔ ışıklı kar ~81 | ekmek 27.3 ↔ ışıklı kar ~81 (−54) | ≥ 25 | geçti |
| Sahne maks C* | 39.3 | 38.5 | ≤ 28 | kaldı (tur-3 ile aynı nedenler: ışık şeridi kenarı, el) |
| Kırmızı | 0 | 0 | 0 | geçti |
| Güvenli alan | 3 kilit | 3 kilit (yüz, ekmek, avuç), ihlal yok | 0 | geçti |

## Kareye uyarlanan değerler (yönetmen plana işlesin)
| Değer | Tur-3 | Tur-4 | Neden |
|---|---|---|---|
| Sağ kol | omuz (234, 1262) → dirsek (482, 1652) → bilek (688, 1374), tam görünür | **üst kol sırtın arkasında**; dirsek (438, 1878) sırt silüetinin içinde, önkol → bilek (648, 1478) | OTS'ta uzak kol: "uzun tuhaf kol açısı" kalktı |
| Omuz başlığı | (234, 1262) r 74 | (276, 1290) r 54 | sırtta kambur/başlık okunmasın |
| Sırt silüeti sağ kenarı | x 420 (alt) | x 474 (alt) | uzak kolun üst kolunu örter |
| Ekmek | merkez (790, 1214), el altta kırpılı | **(742, 1300), −12°**; el (açı −58°, E 196) ekmekten önce + dört parmak ekmeğin önünde, ekmekte temas gölgesi | el ekmeği gerçekten tutar |
| Patikalar | iki sürekli sinüs bant (ray) | 5 yürüyenin seed'li izleri: sapan rota, sol/sağ ayak, %15 boşluk, %7 çiğnenmiş leke | düzensiz iz kümeleri |
| Profil baş | stroke kontur | `konturAlfa: 0` + ekranda MurekkepKontur + ense/arka kafa ince tarama | — |

## Bilinen eksikler (öz eleştiri)
- Hedefin gerisinde: cephelerde süsleme/kornis gölgesi hedef kadar zengin değil; kar yığınları ve kar yüzeyi düz renk ağırlıklı (hedefte kırık kenarlı yığınlar); figür hâlâ "vektör" okunuyor (palto taraması doku verdi ama kıvrım/hacim zayıf).
- Eller (IncEl) hâlâ biraz eldiven gibi: boğum işareti mürekkep modunda kaldırıldı, parmak ayrımı yalnız gölge yanında.
