# Blanc EN ilk kurgu — eleştirmen (tek tur)

**KARAR: GEÇMEZ (koşullu).** Tek kritik/orta engel: P10 replik etiketi "MEMUR" (TR kalıntısı). Düzelince kullanıcıya gidebilir. Gerisi orta/küçük, kulakla doğrulanacak.

Kapsam: yalnız EN'e özgü kontroller; kontak sayfası `out/en/kontrol.png` (14 plan, kontrol karelerinde), ses json zaman damgaları ve video sesi ölçümü. Kare çıkarıldı: P03 (k598), P10 (k2571), scratchpad.

## Bulgular

| # | Plan | Kare (global) | Kanıt | Düzeltme | Öncelik | Sahip |
|---|---|---|---|---|---|---|
| 1 | P10 | 2171+184..346 | Replik etiketi "MEMUR" (Türkçe) görünüyor; bolum-en.json satır ~1828 `"kim": "MEMUR"`. Kontak sayfasında okunuyor. İngiliz izleyici "memur" anlamaz. | `"kim": "CLERK"` (ya da "OPERATOR": anlatım "the operator" diyor, tutarlı olan **OPERATOR**). Kit karakter adı `src/kit/karakterler.ts:35` `ad:"MEMUR"` da EN için parametre olmalı (kit_eksik, motion). | KRİTİK (EN testi) | yönetmen (json), motion (kit adı) |
| 2 | P12 | 2719+30 | Dosya TOK ve "ACQUITTED · 14 Mar 1837" yazısı kare 30'da; EN söz "Acquitted." kare 99 (json 0 s). 69 kare (1.15 sn) yazı/TOK sözden önce; TR'de "Beraat." TOK'la aynıydı. | Ya ses 99→~33 (ama sonra "Too late" 201 gerilmesiyle kayar: late 189–224, gerilme 201 zaten oturuyor), ya da yazı bas 30→~96 ve TOK 30'da kalıp söz TOK'u izlesin. Öneri: sesi ~-60 kare çek değil; **yazıyı 96'ya al**, TOK'u sessiz-foley olarak bırak, kurgucu "Acquitted" vurgusunu TOK'a değil yazıya hizalasın. Karar orkestra/kurgucu. | ORTA | kurgucu + yönetmen |
| 3 | P07 | 1436+96 / +123 | Yakın kule HATA + sert klak kare 96; söz "adds" 102, "error" 123 (27 kare = 0.45 sn geç). Geri alma görseli 184, söz "undoes" 159, "it." 182 (uyuyor). Tek mp3'te kaydırma ikisini birden tutturamaz (görsel aralık 88, söz aralığı 36→ hata sözü geç, undo tam). | mp3'ü iki klibe böl: "The operator adds an error." (kare ~33, error≈96) ve "Then undoes it." (kare ~124, "it" ≈ 184). Alternatif: sert klak'ı 123'e al, kule 2 HATA (126) ile hizalı zaten. | ORTA | kurgucu |
| 4 | P03 | 400+198 | "government-only." başlangıcı tam kare 198 = mühür karesi (k598). Kontak karesinde mühür "STATE ONLY" oturmuş. | — GEÇER. Not: mühür "TOURS" etiketini ve Bordeaux ikonunu kısmen örtüyor (TR'de de böyleydi). | — | — |
| 5 | P14 | 3145+82/83 | "glove." 83, sol kanat katlama 82 (tam). | GEÇER. | — | — |
| 6 | P12 | 2719+189..224 | "late." 189–224, gerilme temas 201 (sözün ortası, "Too late"nin vurgusu "late" içinde). Beğenilir; ses duraksaması yok. | GEÇER (kulakla teyit). | — | — |
| 7 | P09 | 1958+100..213 | Alt bant yazısı "State: error · Them: news" iki satıra bölünüyor, satır başında yetim "·"; alt kenar ≈1500 px (band sınırı 1490, güvenli alt 420 = y1500). | Metni tek satıra sığdır ya da "State: error / Them: news" ayır, "·" at; bas/bit değişmez. Alt bant kenarı 10 px içeride kalsın. | KÜÇÜK | yönetmen |
| 8 | P03 | 400+… | "4 HOURS / DAY 3" kutuları sağ kenara ≈77 px (yan güvenli 80). Etiketler doğru (SAAT/GÜN yok). | Kutuyu ~10 px sola al (kit sabiti `Harita.tsx`), ya da kabul. | KÜÇÜK | motion (kit) |
| 9 | P07, P13 | — | Yazı kırılımları: P07 "ERROR + UNDO / = CLEAN MESSAGE" (satır başında "="), P13 "No wires. No / electricity." Okunuyor ama kırılım yetim bırakıyor. | Satır sonu manuel: "ERROR + UNDO =" / "CLEAN MESSAGE"; "No wires." / "No electricity." | KÜÇÜK | yönetmen |
| 10 | P14 | 3145+17..24 (≈3162, 3204) | Mix 50 ms pencere ölçümü: kare ~3162'de −39 dB, ~3204'te −43 dB (tüm mix en düşüğü). Motif geri dönüşü 3171'de; gövde-kesim boşluğu ve anlatım duraksamasıyla çakışıyor. Müzik bölüm boyunca kesilmiyor (plan sınırlarında min −21..−38 dB, hepsi anlatım duraksaması), son 1 sn fade ile iner. | Kulakla dinle; 3204 civarında müzik notasının bir çentik "düştüğü" duyulursa kesim noktası (52.55–53.10 sn) çapraz geçişle doldurulsun. Ölçümle kritik değil. | KÜÇÜK | kurgucu |
| 11 | P05, P10, P01, P14 | — | Anlatım plan içinde bitiyor ve binmiyor (P10'da anlatıcı 151'de, memur 180'de başlıyor; aralık 29 kare). Ses sonu–plan sonu boşluğu: P05 124 kare (2.1 sn), P10 ilk söz sonrası 195, P14 103, P01 75: görselde animasyon var, 5 sn'lik hareketsiz an yok. | Kabul (animasyon bağlayıcı). | — | — |

## Ölçüm
- Ses (video AAC, `ebur128`): **I = −14.0 LUFS** (hedef −14 ±0.3, GEÇER), TP −1.8 dBFS (≤ −1.5 GEÇER), LRA 3.1. Not: teknisyen raporu −14.5 / TP −2.3 yazıyor; mevcut dosya o değil (son hâl ölçüldü). Dosya ses 56.135 sn, video 56.15 sn.
- Kare sayısı 3369 / 60 fps, toplam plan süreleri 3369 ile uyuşuyor.
- Anlatım örtüşmesi: yok. Anlatım plan sonundan en az 22 kare önce bitiyor.

## EN izleyici testi
- Kalıntı: yalnız "MEMUR" (P10). Diğer metinler EN: P04 replik tek satır, "FRANÇOIS", mühür "STATE ONLY", "4 HOURS"/"DAY 3", "Tours Criminal Court · 1837" (iki satır, okunur, bant içinde).
- "TOURS" etiketleri ve "BLANC" yer/soyadı olarak kalabilir.

## Teslim yolu
1 düzeltilince (yönetmen json tek satır + ses karar #2, #3 kurgucu) kısa yeniden render P10/P12/P07 için yeterli; tam kalite turu gerekmez.
