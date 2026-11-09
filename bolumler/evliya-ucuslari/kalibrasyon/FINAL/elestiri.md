# Evliya uçuşları: tam film eleştirisi (FINAL, tek tur)
Eleştirmen (opus) · 2026-11-09 · kaynak: `out/evliya/evliya-tr.mp4`, `evliya-en.mp4` (3774 kare, 60 fps)
Yöntem: TR'den 141 kare (her plan ilk, kontrol_kare, son, son−2, temas, dokunuş, yazı girişi, §5.0g ekleri). EN'den yazılı planlarda 31 kare. Şüpheli yerlerde kare kare şerit çıkarıldı. 360x640 telefon sayfası ve güvenli alan bindirmesi kullanıldı. Ses `ebur128` ile ölçüldü; stemler `public/evliya/miks/tr/*.wav`.
Dosyalar: `kare/` (tam kare, adı `Pxx_pNN_..._gGLOBAL`), `telefon-tr/Pxx.png`, `telefon-en/Pxx.png` (bindirme: mor = IG üst/alt, açık mor = yan 80 px, camgöbeği = sağ buton sütunu), `vitrin.png`.
Kare numaraları plan içi (p); parantezde global kare (g).

## KRİTİK (yayını durduruyor)

**K1 · P01 p76–100 (g76–100) · meşale demetin ve binicinin içinden geçiyor (FİZİK)**
Yardımcı meşaleyi 3 karede (p78→p81) aşağıdan yukarı savuruyor. Bu yay demetin önünden geçiyor, meşale başı Lagâri'nin baldırında/çizmesinde duruyor ve p100'e kadar demetin önünde kalıyor (`kare/P01_p100_kk_g100.png`). Telefonda "meşaleyle bacağını yakıyor" diye okunuyor, üstelik bu kanca planının kontrol karesi.
Düzeltme: geri sıçrama jestinde meşale demetten uzağa dönmeli (yay yardımcının arkasına ya da sol üste). Meşale başı demet x aralığına girmemeli. → **motion (kit jesti, kalkış/geri sıçrama)**

**K2 · P05 p66–84 (g1272–1290) · aynı hata P05'te (FİZİK, aynı kök)**
Y1 geri sıçrarken meşale sağa, demete doğru savruluyor. p78'de (kontrol karesi) alev Lagâri'nin kanadının dibinde. Ayrıca p72–p76'da alev yerde kalıyor, sopa alevsiz kalkıyor, p80'de alev sopanın ucunda beliriyor: alev bir karede yer değiştiriyor. → **motion** (K1 ile aynı düzeltme; yerdeki fitil alevi ile meşale alevi ayrı nesne olmalı)

**K3 · P06 p76–160 (g1492–1576) · boş demet suya değil rıhtıma düşüyor ve yardımcının içinden geçiyor (FİZİK + TEMAS SESİ)**
- `su-dump` p100'de ve `buhar` p102'de çalıyor. Ama p100'de demet hâlâ havada, suya değmiyor (`kare/P06_p100_temas_g1516.png`).
- Demet p130–150 arası Y2'nin gövdesinin **önünden** geçiyor (g1548–1566), sonra p154 civarında rıhtımın üstüne yatay düşüyor; buhar rıhtımda çıkıyor (g1570–1578).
- Düşüş p46–154 arası, 1.8 sn sürüyor; ağırlıksız, süzülür gibi.
Düzeltme: demetin yolu yardımcıların arkasında kalsın (z sırası), suya (dekor y≈1200, rıhtım kenarının gerisi) girsin. Su teması tek bir karede olsun, `su-dump`/`buhar` o kareye taşınsın. Düşüş süresi ≤ 0.8 sn. → **motion (yol/z)** + **yönetmen json (temas karesi)**

**K4 · P08 p26–60 (g1970–2004) · Hezarfen'in gövdesinde kopuk sarı kontur çizgileri (çizim hatası, dokunuş karesi)**
Tekme pozunda kontur/ışık şeridi gövdeden ayrılıyor: yüzün önünden, kaftanın ortasından ve bacak boyunca açık sarı ince çizgiler geçiyor (`kare/P08_p44_temas_g1988.png`). Taş itme dokunuşunun (EV-D3) tam üstünde, telefonda da görülüyor. P01 B'deki yürüyüşte aynı şerit figürün dış çevresinde, orada hata gibi görünmüyor.
Düzeltme: kontur şeridi maskesi pozla birlikte (kemik dönüşü sonrası) hesaplanmalı, ya da poz dönüşlerinde kapatılmalı. → **motion (rig)**

## ORTA

| # | Plan / kare | Ne görülüyor | Düzeltme | Sahibi | Hızlı mı |
|---|---|---|---|---|---|
| O1 | Ses, P01 0–2.5 sn, P05 21–23 sn | Foley momentary tepe −14 LUFS, anlatım medyanı −18.2. Kalkış/püskürme anlatımdan ~4 dB yüksek ve kancanın ilk sözünü ("fişeğe binip göğe çıkmış") örtüyor. Kural: foley anlatımın 2–6 dB altında | `puskurme`, `fisek-kalkis` −6 dB (iki plan) | kurgucu (miks) | evet |
| O2 | P12 p0–28 | "Padişah" etiketi 0.47 sn kalıyor, telefonda okunmuyor | ya kaldır (replik etiketi PADİŞAH zaten var) ya da ≥60 kare (replik 1 p60'a kayamaz → kaldırma önerilir) | yönetmen json | evet |
| O3 | P13 EN p20+ | EN yazı kutudan taşıyor: `SEYAHATNAME (“Book of Travels”)` kapanış parantezi kutu kenarını (x≈1010) aşıyor, sağ 80 px marjına giriyor | EN metni kısalt: `SEYAHATNAME · no other record found` (alt satır “Book of Travels”) ya da yazı boyutu −8% | yönetmen json (en) | evet |
| O4 | P08 p0 ↔ P01 p176–335 | Aynı an (Hezarfen kule çıkıntısında). P08'de ayağının dibinde taş var, P01 B'de yok. Süreklilik | P01 B'ye aynı taş prop'u (konum P08 p0) | yönetmen json | evet |
| O5 | Doğruluk, P08 yazı | "Hezarfen = “bin hünerli”" `arastirma.md`'de kaynaklı değil ("hüner" 0 eşleşme). Anlam doğru (hezâr = bin, fen = hüner), ama kural kaynak istiyor | araştırmacı tek satır kaynak ekler (TDV-H maddesi) | araştırmacı | evet |
| O6 | P12 p100–216 | Padişah arkasını dönünce yüzdeki ışık çizgisi ekranda yerinde kalıyor: başın arkasında ten renkli dikdörtgen + sarığın arkasında beyaz hilal (`kare/P12_p133_yazi_g3145.png`). "Kopuk parça" gibi okunuyor | ışık çizgisi başla birlikte dönsün ya da `don` başlayınca (p100) sönsün | motion | orta |
| O7 | P09 p0–110 (g2196–2306) | Alt 2/3 düz su, üst 1/3 düz gök + yazı. Kule ≈%10. 1.8 sn ölü alan (§5.0g madde 5: doğrulandı). Hezarfen'in atlayışı ~20 px, görünmüyor | ön planda su ışıltısı/dalga sırası ya da kamera p0'da kuleye yakın başlayıp açılsın | mekân sorumlusu → motion | hayır |
| O8 | P06 p0–46 | Püskürme p36'da sönüyor, demet + binici yerden ~1 boy yüksekte 10 kare asılı kalıyor. Hemen önündeki P05 yazısı "~250 m" diyor; görüntü "2 metre" diyor | (kullanıcı kararı "baş kadrajdan çıkmaz" korunarak) tilt ile rıhtımı kadrajdan çıkar ya da P05 sonunda yardımcıları aşağı kaydır, yükseklik okunsun | yönetmen json (kamera) | hayır |
| O9 | P01 p72–110, P08 p26–60 | Ekran yazısı ana eylemin üstüne biniyor: P01'de yükselen binicinin göğsü, P08'de tekmede Hezarfen'in başı/omzu yazı kutusunun altında. Yüz IG üst 220 px'e çıkıyor | P01: yazı p70–110 arasında alt banda insin ya da kısa söner/yeniden gelir; P08: yazı p36'da bitsin (bas 16 → bit 36), tekme sonrası yok | yönetmen json | evet |
| O10 | P08 p100–148 | Taş düşerken ve avluda gök/dış mekân yok; telefonda "taş oda" gibi okunuyor (K7 maddesi hâlâ açık; p110/p125'te harpuşta çok ince) | harpuşta + gök şeridi p100–130 arası sol 1/4'te görünsün | motion | hayır |

## KÜÇÜK
- **P13 kontrol_kare 190 → 216.** p190'da üç defter henüz açılmamış (§5.0g madde 1). Okunurluk notu da düzeltilmeli. → yönetmen json
- **P13 `sfx` metin alanı** "defter-ac x3 (p146/164/182)" diyor, temaslar 176/194/212. Yalnız not tutarsızlığı; miks temaslardan alındıysa sorun yok. → yönetmen json
- **P03 p0–251 kenar kompars (§5.0g madde 3).** En soldaki kompars (Y1) yarısı kadraj dışında, yüzü okunmuyor; "kesik figür" gibi duruyor ama ana eylemi bozmuyor. Kabul, ya da cx +60. → yönetmen
- **P04 yüz ~%10 (§5.0g madde 4).** Telefonda göz, kaş ve açık ağız okunuyor. GEÇTİ, cs artırılmasın.
- **P04 etiket "LAGÂRİ (Evliya'ya göre)".** P12'de kullanıcı "Evliya'ya göre bilgisi açıklamaya gider" diye etiketi kısalttı; P04'te uzun hâli duruyor. Tutarlılık için `LAGÂRİ` yeterli olabilir: kullanıcıya sorulsun.
- **P03 EN satır kırılması** "(140 / lb)": parantez içi bölünüyor. `~64 kg (140 lb)` tek satırda kalsın, "of gunpowder" ikinci satıra. → yönetmen json (en)
- **P07 p0 `islak-el`.** El sol alt köşede ≈%5 boyunda, yarısı yan marjda; ses var ama temas zor görülüyor. Seviye −12 → −16 ya da el p0'da 100 px içeride.
- **P11 p104 civarı.** Sağ kenarda (x≈1075, y≈790) veren elin parmak ucu kadraj kenarında kalıyor. Ayrıca sol altta (≈40, 1830) P06'dan kalma gibi duran bir su halkası var; anlamsız. → motion
- **P09 Üsküdar arazisi.** Telefonda iniş alanı suda yüzen düz bir yamuk/sal gibi okunuyor, kıyı gibi değil. Sonraki bölümler için mekân kartına not.
- **Müzik.** Ostinato vuruşlar arasında momentary −55/−65 LUFS'a iniyor (≈1.6 sn periyot), konuşma altında medyan −40 (anlatım −18.2: −22 LU, hedef ~−18 içinde, biraz kısık). Kulakla dinlenip "müzik kesiliyor" hissi verip vermediğine bakılmalı. → kurgucu
- **Loudness.** TR −14.3 LUFS / TP −1.9; EN −14.3 / −1.7. Hedef içinde. GEÇTİ.

## Geçenler (kısaca)
- Kanca (ilk 1.5 sn, ses kapalı): gece rıhtım, fişek demetine oturmuş adam, ayağının dibinde alev. p5'te "TEK TANIK: BİR KİTAP", p40'ta ateşleme, p72'de kalkış. Merak ilk saniyede kuruluyor.
- Döngü: P14 son karesindeki kıvılcım P01 p0'a bağlanıyor. P13→P14 kesintisiz.
- Ritim: 5 sn'den uzun hareketsiz an yok (P02 5.4 sn ama havai fişek ve yavaş push-in var).
- Güvenli alan: ana eylemlerin hiçbiri IG alt 420 / sağ buton sütununda değil. Yalnız O9'daki yazı/yüz üst bant çakışması var.
- Doğruluk: 64 kg, ~250 m (hesap olarak sunuluyor), 1 kese + 70 akçe, IV. Murad, Cezayir, ~3 km, 1630'lar, İsa nebî repliği, lodos, "başka kayıt bulunamadı" kaynaklı. Tek açık: O5.
- Dokunuşlar EV-D1…D6 tekrar etmiyor, hepsi kendi planında bitiyor. P07/P11 kese aynası okunuyor. EV-D5 (dönen sikke) telefonda çok iyi.
- EN katmanı: P13 (O3) dışında taşma yok, tüm yazılar bantta.

## Karar: **DÜZELTME GEREKLİ**
Yayın öncesi zorunlu: **K1, K2, K3, K4** (motion: meşale yayı, demet yolu/z, kontur şeridi; yönetmen: P06 temas karesi) ve hızlı ORTA'lar **O1, O2, O3, O4, O5, O9**. Yalnız görüntü katmanı değiştiği için yazı katmanları ve sesler yeniden kullanılabilir. Değişen planlar P01, P05, P06, P08 (P12 O2 yalnız yazı katmanı). O6–O8 ve O10 bir sonraki turda yapılabilir; yapılmazsa kullanıcıya bilinen sorun olarak söylenmeli.
