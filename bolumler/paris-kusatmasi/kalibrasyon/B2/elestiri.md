# Eleştiri — B2 kalibrasyonu (MONTMARTRE + hale) · 2026-11-12 · eleştirmen

**Karar: P03 GEÇER · P07 DÜZELTMEYLE GEÇER · P06b GEÇMEZ (yalnız sahneleme; hale/zarf/sepet şablonu geçer). Şablon genel: DÜZELTMEYLE GEÇER. Puan: 6 (P07 A tek başına 7.5, P06b 5).**
Bakılan: P03 f80; P06b f168/f200/f230 + şerit f200–260; P07 f112/f196 + şeritler f0–158, f160–300; 360 ve güvenli sürümler; karsilastir.png; darbe bölgesinin 2× kırpımı. `lint.izin` (L_ustu_88_parlama) yeniden açılmadı.

## B'nin 5 düzeltmesi
| # | Durum | Not |
|---|---|---|
| 1 Zarf yok (KRİTİK) | **TUTTU** | f168'de alttan zarf, boğaz, halka, ağ düğümleri var; süreklilik P03→P06b→P07 tamam. |
| 2 Figür manken / biniş | **KISMEN** | Başlık, yaka, dirsek tuttu; "Z" kol gitti. Ama biniş hâlâ okunmuyor, siluetler birbirine kaynıyor (aşağıda #1). |
| 3 Havadan Paris | **TUTTU (güçlü)** | f0–158: Seine + Pont d'Austerlitz, Notre-Dame, Panthéon, Jardin des Plantes, gar rayları 360'ta okunuyor. Orkestra gözlemi doğru. Buğu 0.62 gözle doğru karar; onaylanmasını öneririm. |
| 4 Darbe örümcek / duman hortum | **KISMEN** | Örümcek ve hortum gitti. Darbe şimdi çok küçük; duman yönü fiziksel olarak yanlış (aşağıda #2). |
| 5 Sepet / torba / makas | **TUTTU** | Hasır, torba çeşitliliği, makas kalınlığı tamam. 4. torba x≈905 < 920. |

## Orkestra gözlemi: doğrulama
- **P07 f112 Paris iyileşti:** doğru.
- **Darbe f112 küçük siyah leke, okunuyor mu:** **Hayır.** Leke 1080'de ≈ 60×45 px, 360'ta ≈ 15 px. Gölge tarafındaki kenarda (lavanta) duruyor; koyu delik + krem dil "balona yapışmış kuş/yarasa" gibi okunuyor. "Vuruldu" anlamını darbe değil, sonuç taşıyor (f120–156 alçalış + zarf çöküşü şeritte açık).
- **P06b sepet ekranın yarısı:** kısmen doğru. f200'de sepet y 840–1480 (≈ %33) + halatlar ≈ %45. Hero nesne olduğu için ölçü kabul edilebilir; sorun insan eyleminin bu kütlenin arkasında saklanması.
- **Figürler koyu dolgu siluet, yüz/ışık yok:** doğru. Kontrajur (arka cam parlak) siluet dilini haklı çıkarıyor; kompars için kabul. Ama Dagron diğerlerinden ayrışmıyor ve aynı tondaki üst üste binen figürler tek gövde + iki şapka gibi kaynıyor (f168 sol çift, f200 sol çift, f230).
- **f230 düz kol, "Dagron biniyor" okunuyor mu:** **Hayır.** f220–240'ta sepetin arkasında koyu bir kütle yukarı uzuyor; bacak görünmüyor (arka rimden biniyor). Kol dirseksiz dikey. **El halata değil boşluğa uzanıyor:** f230'da el x≈300–345, y≈50; o yükseklikte halatlar x≈255 ve ≈377. f232–244'te baş kadraj üstünden taşıyor.

## Düzeltmeler (en çok 3, önem sırasıyla)
| # | Kare | Sorun | Neden (parametre) | Düzeltme | Sahibi | Öncelik |
|---|---|---|---|---|---|---|
| 1 | P06b f212–244 | Biniş okunmuyor. El boşluğu tutuyor (**KRİTİK fizik**). Siluetler kaynıyor | Biniş noktası arka rime taşındı (dünya X +0.27, Z +0.13), bu yüzden bacak sepetin arkasında kalıyor. k2 tutunma hedefi halat değil. Kompars ile Dagron aynı değer (`#2a2638` dolgu), X'leri üst üste | Bacağın rim üstünden geçtiği **ön-sol köşeye** dön. Gövdeyi kadraja almak için kamerayı kaydır: f200–250'de `cx` +80…100, f236–244'te `cy` +30 (baş taşmasını da çözer). Tutunan eli halat parametresine bağla (IK hedefi = en yakın askı halatı noktası). Dirsekli kol kullan. Dagron'a kompars dışı ayrışma ver: palto bir değer açık ya da ışık tarafına kenar ışığı. Yükleyici-2'yi Dagron'dan ≥ 1 omuz genişliği ayır | motion (poz, IK, ayrışma) · yönetmen (cx/cy) | kritik |
| 2 | P07 f88–124 | Atış izi ufkun **üstünden**, yatay geliyor: yerden ateşlenen iz ufkun altından yükselmeli (**fizik**). Darbe telefonda okunmuyor | `duman kaynağı (1150, 700)` ufuk (y≈900) üstünde. Delik ölçüsü küçük; konumu zarfın gölge kenarında | Kaynağı ufuk altına al (≈ 1150, ≥ 1050); iz sağ alttan balona doğru yükselsin. Delik ×1.6 ve zarfın kameraya bakan aydınlık yüzüne (krem) kaydır: koyu delik krem üstünde okunur | motion | kritik (fizik) |
| 3 | Tüm MONTMARTRE (P03 f80 y≈420/760/1000; ufuk ışıması merdiveni x 0–470; P06b f200 sol; P07 f112 y 320/545/700/820; P07 f196 sol y 380–600) | Gökte keskin yatay bant kenarları ve basamaklı şeritler. Gravür değil, dijital "banding" okunuyor; B'de P03 için küçük nottu, şimdi her planda var ve P07 B'de belirgin | gök basamakları (G2.5 / P10a satırı) sert kenarlı; ufuk ışıma şeritleri sol kenara hizalı eşit kalınlıkta dikdörtgenler | Basamak sınırlarını yatay tarama geçişiyle ver (gravür gök tonu; tarama sıklığı değişir, düz kenar yok). Işıma şeritlerini kaldır ya da kenarları düzensiz, uçları incelen çizgilere çevir | mekân sorumlusu (kart) → motion | orta |

## Sonra (küçük)
- P06b f168/f200: sepet tabanı alt 420 bandında (y 1636/1503). Temas anı yok → yönetmen `lint.izin` yazabilir.
- P07 B f160–300: Dagron'un sol kolu rim boyunca yatay, dirsek dışa açık; "yaslanıp uzanmış" okunuyor. Önkol rime dayalı olmalı, dirsek aşağıda. Sahibi motion.
- P07 f112: vurulan balonun sağ yarısında meridyen üstüne binen ikinci dikey çizgi takımı var (ağ çift çizilmiş). Sahibi motion.
- P06b: ön plandaki dev torba (sol alt) kesik ama okunuyor; boyu ≈ %10 küçültülebilir.
- P06b hasır 360'ta yatay şerit gibi okunuyor. Kabul edilebilir.
