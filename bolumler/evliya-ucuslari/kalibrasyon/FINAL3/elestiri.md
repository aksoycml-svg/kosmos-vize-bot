# Evliya uçuşları · FINAL3 tam film kontrolü (77.07 sn, 4624 kare, TR + EN)
Eleştirmen · 2026-11-09 · kısa tek tur. Kare numaraları: g = film karesi, p = plan karesi.
Kanıt: `A_plan_*.png` (ilk/kontrol/son), `B_gecis_*.png` (geçiş ±2), `C_P0x_serit.png` (hareket şeritleri), `D_{TR,EN}_yazilar.png`, `E_detay.png`, `F_P08_g2490_kirpik.png`.

## FINAL2 kritikleri: geri dönmedi
- K1 P01 meşale: p56–212 şeridi, meşale demetin önünden geçmiyor, kalkışta yardımcının arkasında yukarı.
- K2 P05 meşale: g1488–1600, meşale sol üste kalkıyor, alev sıçramıyor.
- K3 P06 demet: g1829–1835, demet yardımcıların sağından suya giriyor, su teması g1833–1835. `su-dump` başlangıcı g1833 (fark 0).
- K4 P08 sarı çizgi: g2490 tam çözünürlük kırpımında kontur temiz.

## KRİTİK
Yok.

## ORTA (hızlı: yalnız yazı katmanı, görüntü yeniden render edilmez)
| # | Plan · kare | Sorun | Düzeltme (tek satır) | Sahibi |
|---|---|---|---|---|
| O1 | P10 p20 (g3143) | "Aynı köşk · Padişah IV. Murad" yazısı p20'de geliyor. Anlatım p10–34'te "Onu kim izliyor?" diye soruyor, yazı cevabı sorudan önce veriyor (P13'te K10 ile düzeltilen hatanın aynısı). | `ekran_yazisi.bas` 20 → 116 ("Yine padişah" TR p116 · EN "The sultan" p93) | yönetmen json |
| O2 | P05 p144–222 | "~250 m" yazısı 78 kare (1.3 sn) kalıyor. EN satırı ("A modern estimate: ~250 m (820 ft) up") telefonda okunmuyor. | `bas` 144 → 100 ("fişek" TR p90): 2 sn. Yükselen binici yazının altına girmeden önce kalkmalı. | yönetmen json |
| O3 | P06 p309–373 | "Sonra yüzerek padişaha döndü." 64 kare (1.07 sn) kalıyor, 5 kelime okunmuyor. | `bas` 309 → 270, `bit` 385 (plan sonundan 14 kare önce): 1.9 sn | yönetmen json |
| O4 | P12 p0–28 (g3797–3825) | "Padişah" etiketi 0.47 sn kalıyor, okunmuyor. Replik etiketi PADİŞAH (g3887) zaten var. FINAL O2 hâlâ açık. | etiketi kaldır | yönetmen json |

## ORTA (hızlı değil, yayını durdurmuyor)
| # | Plan · kare | Sorun | Düzeltme | Sahibi |
|---|---|---|---|---|
| O5 | P12 p123–209 (g3920, g4006) | Padişah dönünce sarığın arkasında beyaz hilal ve ten rengi parça yerinde kalıyor (FINAL O6 açık). | `don` başlayınca yüz ışık çizgisi sönsün | motion |
| O6 | P09 p0–110 ve uçuş | Alt 1/3 düz su (ölü alan, FINAL O7). Hezarfen uçuşta ekran yüksekliğinin ≈%6'sı, martıyla karşıtlık (EV-D4) telefonda zor okunuyor. | sonraki bölümde BOGAZ şablonuna ön plan dalga katmanı ekle, uçan figürü ≥%10 yap | mekân → motion |
| O7 | P06 p40–72 (g1759–1791) | Binici ve demet rıhtımdan ~1 boy yükseklikte asılı kalıyor. "~250 m" yazısından hemen sonra yükseklik okunmuyor (FINAL O8). | kabul edildi, not | — |

## KÜÇÜK
- P04 g1173–1200: replik "Padişahım," ve LAGÂRİ etiketi sarığın üst kenarına biniyor (yüze binmiyor). Kutuyu 30 px yukarı al. Sahibi: yönetmen json.
- P01 p56–116: "TEK TANIK" kutusu sarığın tepesine değiyor (yüze değmiyor). Kabul edilebilir.
- EN anlatımında 1.9–2.5 sn'lik 5 boşluk var (≈11.6, 16.6, 22.5, 49.7, 61.7 sn). Görüntü ve foley sürüyor, müzik akıyor. Plan süresi = uzun dil kuralının sonucu. Not olarak kalır.
- Müzik anlatımın ~20.6 LU altında (hedef ~18). Biraz kısık ama anlatımı boğmuyor. İsteğe bağlı +2 dB. Sahibi: kurgucu.

## Ölçümler
- Loudness: TR −14.0 LUFS, EN −14.3 LUFS. Tepe −1.9 dBFS (≤ −1.5). LRA 3.3 / 4.6.
- Stem'ler (TR/EN): anlatım −18.2/−18.3, foley −24.3/−24.2, müzik −38.8/−37.9 LUFS.
- Anlatım–foley örtüşmesi (400 ms pencere, foley > anlatım −2 dB): yalnız kelime kuyruklarında görülüyor (anlatım < −26 dBFS). Konuşma ortasında maskeleme yok.
- Temas sesleri: 47 temasın başlangıcı ±4 kare içinde (P03 ayak/oturma, P06 su, P08 taş, P12 pencere tam karede). Görülmeyen temasa ses konmamış.
- Yazı–söz: P03, P08, P09, P11, P13, P14 doğru zamanda. P10 erken (O1).
- Doğruluk: 64 kg, ~250 m, 3.2 km, 1 kese akçe + 70 akçe, 1 kese altın, Cezayir, Îsâ nebî repliği, lodos, Murad'ın "havf edilecek âdem" sözü, "bin hünerli" (§12) `arastirma.md`'de kaynaklı. "Dört yüz yıl" (~390) yuvarlama olarak kabul.
- Güvenli alan: yazılar x 80–930 ve y 240–400 içinde. P02 alt bant yazısı y 1340–1490. Sağ 160 px buton alanına bir şey girmiyor.
- Ritim: 5 sn'den uzun hareketsiz an yok. Döngü: P14 g4623 fitil kıvılcımı → P01 g0 fitil, eşleşiyor.

## Karar: **YAYINA HAZIR**
KRİTİK yok. O1–O4 yalnız yazı katmanı değişikliği; yayından önce yapılması önerilir (P10 spoiler ve iki okunmayan yazı). Görüntü render'ı gerekmez.
