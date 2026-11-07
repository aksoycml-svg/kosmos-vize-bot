# Blanc v4 ilk kurgu — eleştirmen kapısı (tek tur)
Girdi: out/blanc-v4-ilk-kurgu.mp4 (3730 kare, 62.17 sn). Plan başlangıçları (kare): P01 0 · P02 210 · P03 468 · P04 768 · P05 966 · P06 1266 · P07 1578 · P08 1878 · P09 2118 · P10 2418 · P11 2788 · P12 3034 · P13 3280 · P14 3502.
Kontak sayfaları: /tmp/claude-0/-home-user-kosmos-vize-bot/117a3510-184f-5959-a8fc-e228610796e0/scratchpad/f/sheet1.png (P01–P07), sheet2.png (P08–P14); ek şeritler scratchpad/p08.png, p11.png, p12.png, a.png, b.png, c.png.

## KARAR: GEÇMEZ (1 engelleyici; 1'i dar düzeltme, kullanıcıya gitmeden kapanmalı)

## Bulgular
| # | Plan / kare | Sorun | Düzeltme | Ciddiyet | Sahip |
|---|---|---|---|---|---|
| 1 | P09, 2218–2418 (kontrol 2278) | Üst bant yazısı "Devlete: hata · Onlara: haber" Saint-Michel T kolunu ve HATA halkasını örtüyor; planın tek hikâye nesnesi (kolun çentiği) yazının altında, yalnız kol ucu ve halka kenarı görünüyor. Kural: yazı dokunuşun üstüne binmez. | Yazıyı kolun bulunmadığı yere al (kamera/pencere u'sunu kaydır ya da kolu yazı bandının altına indir; yazı bas 100 → kol HATA anı sonrası kayabilir). Kontrol_kare'yi render edip kol 360 px'te okunuyor mu bak. | engelleyici | yonetmen (bolum.json), gerekirse motion |
| 2 | Müzik, 3630–3730 (60.5–62.17 sn) | miks.json `toplam_kare` 3690 ve fade_out_bas 3630 eski süreye göre: müzik 61.5 sn'de bitiyor, anlatımın son sözü ("Bir eldivendi.", ≈61.4–61.9 sn) müziksiz; ≈61.2 sn'de müzik tamamen düşmüş (−45 dB), sonda 0.35 sn mutlak sessizlik (silencedetect). Döngü müzikal kapanmıyor ("P01 notasına döner" yok). Kural: müzik ani düşüşle gitmez. | fade_out_bas ≈3690, fade_out 40 kare, müzik dosyası ≥3730 kare (şu an 3697); `toplam_kare`/kaynaklar P10 sonrası +34 kare kaymış (render bolum.json'dan hesapladığı için sesi etkilemedi, belge bayat) → miks.json'u güncelle. | orta (teslim öncesi düzelt) | kurgucu |
| 3 | Genel miks | Müzik boşluklarda bile ≈ −30…−35 dB RMS, anlatım −10…−12: ≈20 dB altında, yani duyulur nefes yok (hedef: boşlukta −8 dB mutlak, anlatım altı −18). LRA 3.0 LU: çok düz. Limiter (0.11) kaynaklı ezilme olası; dinleme gerekli. | Limiter'ı gevşet (limit ≈0.3) + loudnorm iki geçiş; boşlukta müzik +6 dB. | orta | teknisyen + kurgucu |
| 4 | P05, 1026–1266 (kontrol 1166) | "Gölge–T" okunmuyor: duvardaki koyu, eğik çubuk Louis'nin arkasında/solunda, memurun (ortadaki gri figür) gölgesi gibi durmuyor; sopa/tokmak gibi okunuyor (tokmak yasağıyla çelişen bir görüntü). 1026'da yuvarlak gölge kütlesi. Pencerede gün ışığı, mum içeride (gece-kol kuralıyla çelişmiyor ama gece/gündüz belirsiz). | Gölge kaynağını (mum) memurun arkasına hizala ya da T'yi memurun gövdesinden çıkan gölge olarak çiz; olmuyorsa `kit_eksik` yaz. | orta | yonetmen → motion |
| 5 | P10, 2418–2788 | İlk ≈3 sn (≈2418–2598) neredeyse hareketsiz (gözler kapalı yatan baş); konuşma anında ağız geniş, kırmızı iç görünür: fısıltı/ağır hasta için fazla "bağıran/gülen" okunuyor. Üst üçte bir bulanık düz zemin. Replik altyazısı yazı boyu telefonda küçük. | Ağız açıklığını %50'ye indir, nefes/göğüs hareketi ekle; altyazı fontunu büyüt. | küçük | motion / yonetmen |
| 6 | P12, 3034–3080 | Eldiven giyme başında elin parmakları aşağı bakıyor, beyaz bağcıklar parmak gibi ayrışıyor; ilk 40 kare okunmuyor. TOK doğru karede (kapak 3064'te kapalı), sonra eldiven giyilir, hareket tamamlanıyor. | 3034–3070'te elin yönünü düzelt ya da eldiveni daha erken ilk karede net göster. | küçük | motion |
| 7 | P13, 3495 (son kare) | Kule gövdesi alt kenarda kesik, zemin/ayak teması görünmüyor (push-in). | Push-in oranını azalt ya da kuleyi yukarı al. | küçük | yonetmen |
| 8 | P11, 2788 ve 2988 | Üst ve alt üçte bir düz ahşap (ölü alan); kitap yalnız orta bantta. Güve 2911'den sonra (≈2938–2948) kitap üzerinde kayboluyor gibi, kadraj kenarına çıkış doğrulanamadı. | Kamera yaklaştır; güveyi kadraj kenarından çıkar. | küçük | yonetmen |
| 9 | P01, 1–12 | Kanca yazısı fade-in başında gri/düşük kontrast; ilk 1.5 sn'de merak: eldiven çekilişi okunuyor, yazı ilk karelerde tam değil. | Yazı ilk karede tam opak. | küçük | yonetmen |
| 10 | P02 | İsim etiketleri karakter başının yanında kayık (François etiketi sol kenarda, kafadan uzak); alt üçte bir kaldırım boş. P04'te tam replik başından görünüyor, duraksama yazıda yok. | Etiketi baş üstüne hizala; P04'te "…" sonrası ikinci satırı geciktir. | küçük | yonetmen |
| 11 | P03, 186 | Yazı mühürden ≈12 kare önce (3.1 sn) çıkıyor; ilk 3 sn yazısız ama harita hareketli. Zamanında, son ana kalmıyor. | — (kabul) | küçük | — |
| 12 | Süre | 62.17 sn; senaryo 60.0 (+2.2: P10 +70, P06 +12, P12/P13/P14 uzadı). Format 30–65 içinde. | Not. | küçük | — |

## v3 hatalarının tek tek doğrulaması
1. Ekran yazıları: P02 "Fiyatı önce bilen kazanır." kare 24'te (0.4 sn) ✓; P03 "En hızlı ağ: kilitli." 186/300 (114 kare görünür, mühür 198) ✓ son ana kalmıyor. GEÇER.
2. Müzik plan sınırlarında kesilmiyor: plan sınırları ±0.3 sn RMS'inde sıçrama yok, silencedetect (−45 dB, 0.25 sn) yalnız son 0.35 sn. Plan sınırlarında kesilme YOK; ama bitişte müzik erken gidiyor (#2). Kısmen geçer.
3. P02: 5 örnek karede (240–430) yalnız François + Louis ✓. GEÇER.
4. P08 esneme: 1988–2100 arası yarı kapalı gözlü, yuvarlak ağız, baş geriye; uykulu/esneme okunuyor, acı değil; 2100–2118'de kapanıyor, plan sonundan ≥20 kare önce biter. Yazı "Kimse fark etmedi." (1968'den) bağlamı veriyor. GEÇER. (Süre ≈1.9 sn, biraz uzun, küçük.)
5. P11 güve: sayfa çevirme karelerinde (2828, 2858) yok; son boş sayfada 2888'de görünüyor ✓. GEÇER (çıkış bkz. #8).
6. P12 mahkeme/eldiven: donuk başlamıyor (3034→3054 el/kapak hareketli), saçma efekt yok; okunurluk #6. GEÇER (küçük).
7. P14: son kare paket kapalı, ip bağlı; "Silahı klavye değildi. Bir eldivendi." tamam, cümle tamamlanıyor ✓; P01'e "yeni paket" kesmesi okunuyor ✓; müzik döngüsü kapanmıyor (#2).

## Ses ölçümleri
- Toplam: I −14.0 LUFS, TP −2.1 dBTP ✓ (hedef −14 / −1.5). LRA 3.0 LU.
- Plan sınırlarında ani sıçrama yok (sıçramalar anlatım girişleri). 50 ms RMS dağılımı p95–p5 = 23 dB (konuşma/foley dahil; tek başına pompalama kanıtı değil).
- Temas örneklemesi: P12 dosya-tok geçişi ≈3062 (−30 ms), görüntüde kapak 3064'te kapalı ✓; P12 eldiven-fit 54.37 sn ✓ (±5 ms); P03 mühür 11.1 sn ✓; P09 bıçak 37.97 sn ✓. P07 klaklar (26.9/27.9/29.37 sn) anlatımla örtüştüğü için yüksek geçişli süzgeçle ayrıştırılamadı: yerleşim temaslar.json ile kule varış kareleri (36/96/184) ve görüntüdeki halo (1674'te) tutarlı; kulakla doğrulanmadı. P01 eldiven-fit için ≈+0.1 sn sapma izi var, anlatımla karışık, kesin değil.

## Yapılmayan
theme.ts renk/font betiği ve güvenli alan bindirmeli sürüm çalıştırılmadı (yazı bantları 360x640 kontakta y 240–400 / alt bant içinde görüldü). Doğruluk: ekran/ses metinleri senaryo-v4 ile birebir; arastirma.md ile çapraz denetim bu turda yapılmadı.
