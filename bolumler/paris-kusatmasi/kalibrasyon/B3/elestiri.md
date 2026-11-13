# Eleştiri — B3 kısa kontrol (MONTMARTRE şablon kabulü) · 2026-11-13 · eleştirmen

**Karar: DÜZELTMEYLE GEÇER · Puan 6.5** (P07 A 7.5, P03 7, P06b 5.5).
Bakılan: P06b f230 (tam/360/güvenli) + şerit f200–260; P07 f112 + darbe-2x + şerit f80–160; P07 f196; P03 f80; B3-ozet. `lint.izin` (P06b alt bant, L_ustu_88) yeniden açılmadı.

## B2'nin 3 düzeltmesi
| # | Durum | Not |
|---|---|---|
| 1 Biniş (P06b) | **KISMEN** | Şeritte biniş okunuyor: f224–240 bacak rimin üstünden geçiyor, f248'de Dagron içeride. Kritik fizik giderildi: el halatta, halat elin önünden geçiyor. Palto tonu ayrışıyor, yükleyiciler aralanmış. **Ama 360'ta tek kare okunmuyor.** f230'da el şapka tepesinde (x≈240,y≈290), "şapkasını tutuyor / selam veriyor" gibi okunuyor; bu poz f244–260 kapanışında da sürüyor. Kalkan bacak (x 70–260, y 530–780) dizsiz, ayaksız açık tonlu bir kütük gibi; "bacak" okunmuyor. |
| 2 Darbe (P07) | **TUTTU, bir kusurla** | Krem yüzde koyu delik 360'ta seçiliyor. Atış izi ufkun altından, sağ alttan yükseliyor; fizik doğru. f116–156 alçalışı net. Kusur: deliğin sol lobunda beyaz parlama noktası göz gibi duruyor, loblu siluetle birleşince 360'ta "kara kuş/domuz" okunuyor. İz parçaları ayrık gri yaprak gibi; 360'ta kuş sürüsü gibi de okunabiliyor. |
| 3 Gök taraması | **TUTTU** | Basamak kenarları kesik yatay taramaya döndü, soldaki ışıma merdiveni kalktı. P07'de gravür bulut katmanı gibi okunuyor. P06b 360'ta cam arkasında hafif "tarama çizgisi/VHS" etkisi var; küçük not. |

## Yeni kritik hata
Yok. Fizik, süreklilik ve fade sorunu görülmedi. P07 B'de palto tonu P06b ile tutarlı.

## Düzeltmeler (en çok 3, önem sırasıyla)
| # | Kare | Sorun | Neden (parametre) | Düzeltme | Sahibi | Öncelik |
|---|---|---|---|---|---|---|
| 1 | P06b f216–287 | El şapka hizasında; tutunma "selam" gibi okunuyor | Tutunma halatı başın hemen solundan geçiyor; IK hedefi h 1.80 baş tepesi hizasında | Tutunma noktasını başın en az 1 baş genişliği dışına al: daha soldaki halatta h 1.60–1.65 + gövdeye sağa eğim 0.2 (motion'ın önerisi). Böylece el omuz–kulak hizasında ve başın yanında kalır. Kapanış pozunda (f248+) el aşağı, halat göğüs hizasında | motion | orta (okunurluk; kabulü engellemez) |
| 2 | P06b f224–240 | Kalkan bacak açık tonlu, dizsiz, ayaksız bir kütük gibi | Bacağa palto tonu `dagronIsik` uygulanmış; bacak segment kalınlığı fazla, diz bükümü yok, ayak çizilmiyor | Pantolon tonu bir değer koyu (kompars tonu). Uyluk/baldır 2 segment, diz ≥ 70°. f226'da ayak/bot rimin üstünde görünsün (temas = foley f226) | motion | orta |
| 3 | P07 f112–156 | Delik bir canlı gibi okunuyor | Delik içinde beyaz parlama noktası var; delik konturu loblu (sol yumru) | Beyaz noktayı kaldır. Kontur daha düzensiz/yırtık olsun, yuvarlak lob olmasın; deliğin iç kenarına ince açık bir kumaş kenarı (krem) ver | motion | orta |

## C turundan sonra küçük işler
- P07 iz: gri parçalar ayrık yaprak gibi duruyor. Ardışık parçaları birleştirip uca doğru incelen tek duman şeridi yapılmalı. Sahibi: motion (`duman_cizgisi` segment aralığı/opaklık).
- P06b gök tarama çizgileri camın arkasında 360'ta tarama çizgisi gibi titreşiyor. Hale arkasında tarama sıklığını ×0.6'ya düşür. Sahibi: motion (GokBasamak, hale bölgesi).
- P07 A üst bant: koyu üst basamakla açık bant arasındaki yatay kenar (360'ta y≈105) hâlâ sert. Sahibi: motion (GokBasamak, ilk sınır).
- P07 B ön kol rime dayalı, dirsek aşağıda. Bu, motion'ın açık notu #3 (gövde ön rime +0.3 m). Sahibi: motion; torba 4 kilidi için yönetmen onayı gerekir.
- f218 "el halatı kavrar" teması foley listesine girmeli (−6 dB'den kısık). Sahibi: kurgucu. P06b sepet tabanı alt bantta: lint.izin, açılmadı.
- Delik konumu kuralı (ışık yüzü) json notuna yazılmalı. Sahibi: yönetmen.
