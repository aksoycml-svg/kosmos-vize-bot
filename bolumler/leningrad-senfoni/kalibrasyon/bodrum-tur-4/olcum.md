# BODRUM P08 (hedef-morg) · tur-4 ölçümü (motion, 2026-11-16) — kalıcı çizim araçlarıyla
Kareler: `p08.png` (f252), `p08-360.png`, `p08-guvenli.png`, `hedef-yaninda.jpg` (hedef | tur-3 | tur-4). Kod: `src/kit/sablonlar/leningrad/BodrumT4.tsx` (görünüm `p08`; tur-3 kaydı `p08-t3`). Araçlar: `src/kit/cizim/MurekkepCizgi.tsx`, `TonTarama.tsx`.
Ölçüm: `tools/kalibrasyon_olcum.py` + yerel doku (komşu piksel ΔL* ortalaması).

| Ölçüt | Tur-3 | Tur-4 | Hedef | Durum |
|---|---|---|---|---|
| Sıcak piksel | %15.1 | **%13.7** | ≥ %14 | **kaldı (−0.3)**: palto ışık yarısı ve örtü sırtları artık taralı |
| L* p5 / p50 / p95 | 11.3 / 19.8 / 75.2 | **9.3 / 18.4 / 73.8** | p5 ≤ 22, p95 ≥ 78 | p95 kaldı (tur-3'te de kalmıştı; −1.4 daha) |
| Doku yoğunluğu (ΔL* ort.) | 2.85 | **3.79** (+%33) | — | tarama arttı |
| Kırmızı | 0 | 0 | 0 | geçti |
| Güvenli alan | 2 kilit | 3 kilit (yüz, ölü el, çizme), ihlal yok (çizme tabanı y ≈ 1500, alt sınırda) | 0 | sınırda |

## Kareye uyarlanan değerler (yönetmen plana işlesin)
| Değer | Tur-3 | Tur-4 | Neden |
|---|---|---|---|
| Sedye ucu | x 1112 (kadraj kenarı) | **x 930**, örtü x'te ×0.84 (ucu 940) | Eliasberg'in inciği ve çizmesi sedyenin sağında görünsün; örtünün sarkan ucu inciğin önünden geçsin (örtme = derinlik) |
| Sedye ayakları | x 78 / 872 | x 78 / **850** | sedye kısaldı |
| Eliasberg sağ incik / çizme | görünmüyordu | diz (946, 1096) → bilek (992, 1574), çizme tabanı **zemin y 1670** (kaydırma öncesi; sedye arka kenarı derinliği, ön ayaklar 1800) | diz çökme pozu: ayak yerde, sedyenin arkasında |
| Palto eteği | y 1300'de düz kesik | sağda yere kadar dalgalı etek (y ≈ 1640) | çömelen gövde kütlesi alçakta |
| Ölü el bileği / açı / E | (520, 1418) / 96° / 205 | **(394, 1334) / 84° / 158** | bilek örtü kenarının altından çıkar, avuç tahtanın ön kenarına dayanır, parmaklar ön yüze iner (havada değil) |
| Kadraj kaydırması | 170 | 170 | değişmedi |

## Işığın yolu
Değişmedi (tur-3): huzme ve toz sedyenin arkasında, ele inen dar kanal. Tarama tonları ışık yelpazesine bağlı (`fanda()`): yelpazedeki örtü/tahta/palto yüzeyleri taramasız, dışı taralı.

## Bilinen eksikler (öz eleştiri)
- Eliasberg hâlâ hedefteki kadar net "sedyenin arkasında çömelmiş" okunmuyor: figür sedyeye göre büyük, kalça hattı örtünün hemen üstünde. Kök neden: sedye kameraya paralel (hedefte çapraz, derinliğe kaçıyor). Çözüm figürü küçültmek ya da sedyeyi döndürmek (kompozisyon değişikliği; yönetmen kararı).
- Yüz hâlâ düz ve açık (maske hissi azaldı ama gitmedi): ¾ yüz şablonu (LgYuz3) ton bloğu düz; tarama yalnız gölge yanında.
- p95 ve sıcak oran eşiğin hemen altında.
