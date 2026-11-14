# Paris kuşatması: ikinci tam render, kısa kontrol · eleştirmen · 2026-11-14

Malzeme: out/paris/paris-{tr,en}.mp4, genel-{tr,en}.jpg. Kırpıntılar scratchpad'de: iki dilde 14 üst bant anı, P11 360x640, P11 alt bant 4 fps şeridi, P07 35.2–36.2 4 karelik şerit.

**Karar: kullanıcıya GÖSTERİLEBİLİR.** Üç kritik sorun kapandı, yeni kritik gerileme yok.

## Kritikler
- **Yazı taşması: KAPANDI.** İki dilde bütün üst bant yazıları kutunun ve x≈1000 sınırının içinde: TR P05 DAGRON/BOYU, P07 EKİPMAN, P09, P10; EN P03, P04, P05 FINGER-SIZED, P07 EQUIPMENT. P01/P08'de satır başında ayırıcı kalmadı.
- **P11 sayacı: KAPANDI (TR), EN sınırda.** 57.4'te TR dönüş yazısı 2 satır ve 360 px'te rahat okunuyor. EN 3 satırda kalıyor, 360 px'te büyük harf ~9 px. Okunuyor ama zayıf (aşağıda orta 1).
- **P02 sayacı: KAPANDI.** 11.5'te "~2.000.000 İNSAN" / "~2,000,000 PEOPLE" görünüyor, sayım sırasında da "~" duruyor (E1 mertebe).

## Ortalar
- **P07 düşen balon: KAPANDI.** 35.2–36.2 şeridinde balon rüzgârla sağa kayıyor, gar çatısına değmiyor, alt-sağdan çıkıyor (fade yok), çıkış kesmeden önce tamamlanıyor. Not: çıkış yolu sağ 160 px'lik IG buton sütunundan geçiyor. Kısa sürdüğü için kabul.
- **EN "did carried": KAPANDI.** 55.4–56.2 grupları "Those that did" → "carried a" → "city's" → "letters". TR grupları: Çoğu kuş / dönemedi / Ama dönenlerin / kuyruğunda / bir şehrin / mektupları / vardı. Doğal kırılım, gerileme yok.

## Yeni bulgular (gerileme değil, küçük/orta)
1. **ORTA · EN P11 dönüş yazısı 3 satır × ~43 px (56.0–57.6).** Sahibi yönetmen. Parametre: P11 `ekran_yazisi[0]` dönüş metni EN'de kısaltılır, ör. "TENS OF THOUSANDS ARRIVED · 60,000–150,000 BY SOURCE" (2 satır olur, ~55 px). Metin ses değil, ses yeniden üretilmez.
2. **KÜÇÜK · Ok işareti satır kenarında.** TR P09'da ikinci satır "→ FİLM" diye başlıyor, EN P09'da ilk satır "PARIS →" diye bitiyor. Sahibi motion. Parametre: `yerlesim.ts` kırılım kuralı " · " gibi " → " için de uygulanır (ok bir sonraki kelimeyle aynı satırda kalır). Engel değil.
3. **KÜÇÜK · TR P10 "MAGIC LANTERN" (46.9–49.8).** Türkçe katmanda İngilizce terim var. Senaryoda onaylı, gerileme değil. İstenirse "SİHİRLİ FENER" yazılır (sahibi senarist, `ekran_yazisi[0].metin`).

## Kulakla bakılacak saniyeler (TR ve EN ayrı)
0.05–0.3 kanat/anlatım başlangıcı · 8.57/8.67 halka tiki + tel kopması · 12.43 gaz fışşı (riser gibi yükselmesin) · 14.03/14.17 pof + halat · 20.12–21.72 sepet, menteşe, kuş · 25.07–26.77 P05 küçük temaslar · 31.70/31.77/32.30 sandık, hasır, ayak · **35.12–35.18 darbe (en önemli 3 sn)** · 36.58/36.88/37.25 kum, sepet; 37.77 müzik −16 tavanı · 41.65 iğne · 47.17/48.03 lamba, dişli · 46.86/49.65/51.72 P10 müzik; EN 50.23–52.67 boşluk · 54.83 film yağmuru, 56.37 kuş konma · **57.3–58.22→0.00 döngü** (son 50 ms −48 dBFS → ilk −31 TR / −24 EN: müzik sönüp yeniden mi başlıyor?).

**Puan: 7** (iyi). Önceki 6'yı tutan üç yazı hatası kapandı. 8'e engel olanlar ilk jürideki içerik notları: P08 haritasında zayıf 5 sn, sepetteki Dagron'un kukla gibi durması, vurulan balonun telefonda küçük kalması.
