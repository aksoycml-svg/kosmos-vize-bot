# BODRUM P08 (hedef-morg) · tur-2 ölçümü (motion, 2026-11-16)
Kareler: `p08.png`, `p08-360.png`, `p08-guvenli.png`, `hedef-yaninda.jpg` (hedef | bizim). Ölçüm: Lab D65, sıcak = h 20–80°, C* ≥ 10.

| Ölçüt | Değer | Hedef | Durum |
|---|---|---|---|
| Sıcak piksel | **%20.0** | ≥ %14 | geçti |
| L* p5 / p50 / p95 | **13.7** / 26.7 / **81.9** (aralık 68) | p5 ≤ 22, p95 ≥ 78 | geçti |
| Konu ayrışması (medyan L*) | yüz 67.4 ↔ çevre 29.0 (**+38**); el 75.9 ↔ çevre 42.7 (**+33**) | ≥ 25 | geçti |
| C* medyanı | 19.4 | ≥ 18 | geçti |
| Sahne maks C* | 36.3 | ≤ 28 | kaldı (yüz/el sıcak ışığı); çubuk yok, imza bandı 0 px |
| L* > 88 | 4885 px | 0 | kapı açıklığı çekirdeği (ışık kaynağı; bilinçli) |
| Kırmızı | 0 | 0 | geçti |
| Güvenli alan | 2 kilit (yüz, el), 0 ihlal | 0 | geçti. **Not:** parmak uçları y ≈ 1500–1600 (alt arayüz); dizdeki el sağ düğme sütununda (kilit değil); baş tepesi üst yazı bandına (y 240–400) giriyor → anlatım yazısı bu planda alt kısımda değil, yüzün üstünde kalır; yönetmen yazı yerini plana yazsın |

## Kamera / kadraj (yönetmen P08 sahne planına işlesin)
Şablon ekran-plakası olarak kuruldu (hedef kompozisyonu birebir; `kamera25d` dünyası bu turda yok). Dolly zoom tepe karesi bu kare kabul edilirse kamera değerleri:
| Değer | Kare |
|---|---|
| Kadraj | hedef görsel ×1.4, dekor 150 px yukarı kaydırıldı (el güvenli alana girsin; tavanın üstü kırpıldı) |
| Yüz merkezi / yüksekliği | (700, 462) · 235 px (%12.2) — küçük jest eşiği ≥ %12 karşılandı |
| El (Aydarov) | bilek (520, 1350), uç ≈ (530, 1590); el boyu ≈ 250 px |
| Işık | tek nokta kaynak, izdüşümü s = (−260, −410) (kaydırma dahil); kapı açıklığı x 224–336, y 88–886; yelpaze eğimi 0.84–2.68 |
| Dolly zoom önerisi | f177 → f252 kamera yüze doğru it + odak genişlet; bu kare f252 (tepe). Kaynak ekranda sabit kaldığı için zoom sırasında yelpaze s'den yeniden türetilmeli (kodda `S`, `KAPI` sabitleri) |

## Işık yolu (kullanıcı şartı "ışık ele inmeli")
- Ele giden ışın (eğim ≈ 2.2) kapının alt yarısından çıkar, Eliasberg'in sol kenarının solundan geçer; arada engel yok.
- Yüze giden ışın (eğim ≈ 0.97) kapının üst kısmından geçer.
- Arka duvara yalnız düz ışınlar (eğim < 1.02) ulaşır; dik ışınlar önce zemine çarpar (kapı dibinde sıcak zemin yaması).
- Eliasberg'in gölgesi sağ-arkaya, yan bölmedeki örtüye düşer.
- Kameraya bakan yüzler ışık almaz: örtü sarkması mor, kanadın iç yüzü koyu.
