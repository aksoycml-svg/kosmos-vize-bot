# Blanc ilk kurgu — eleştirmen kapısı (tek tur, 540x960 render, kare no = mutlak kare @60)
Kontak sayfaları (satır: ilk+12 / kontrol / son-6): /tmp/claude-0/-home-user-kosmos-vize-bot/117a3510-184f-5959-a8fc-e228610796e0/scratchpad/elestiri/kontak1.png (P01–P07), /tmp/claude-0/-home-user-kosmos-vize-bot/117a3510-184f-5959-a8fc-e228610796e0/scratchpad/elestiri/kontak2.png (P08–P14). Ek: /tmp/claude-0/-home-user-kosmos-vize-bot/117a3510-184f-5959-a8fc-e228610796e0/scratchpad/elestiri/p14_strip.png (P14 ara kareleri), /tmp/claude-0/-home-user-kosmos-vize-bot/117a3510-184f-5959-a8fc-e228610796e0/scratchpad/elestiri/kesme_oncesi.png (kesme öncesi son kareler).

## Plan plan
- P01 DÜZELT — 189 (son-6): eldiven havada eğik, el kadrajdan çıkarken kesme geliyor; hareket tamamlanmadı (eldiven kutunun yanına konmadı). Kancada "1834. Bilgisayar yok." okunuyor, güvenli.
- P02 GEÇER — 286: isim etiketleri şapkaya yakın ama yüzü örtmüyor; 3 figür/2 etiket (Louis-François eşleşmesi ayırt edilmiyor, küçük).
- P03 GEÇER — 937: damga "HALKA KAPALI" TOURS/BORDEAUX etiketini kısmen örtüyor (küçük); rozet y≈1360 band içinde.
- P04 GEÇER — 1129: fare/baston temas karesi okunuyor; üst üçte bir karanlık-bokeh (kabul).
- P05 GEÇER — 1441: Louis solda yarı kesik (kenar), replik altyazısı yüzü örtmüyor.
- P06 DÜZELT — 2013 (son-6): çorap dik, havada/zeminde duruyor gibi; kontrol karesinde (1839) çorabı tutan kol sağdan giriyor, giriş önceden kurulmamış.
- P07 DÜZELT — 2187: "Herkes kopyaladı" yazısı soldaki telgraf koluna bitişik/üstüne biniyor (ertelenen madde sürüyor).
- P08 GEÇER — 2365: esneme okunuyor; ip/kol küçük ama kabul.
- P09 DÜZELT — 2564: memurun eli-ağzı kolu gri kütük gibi, anatomi bozuk; 2415+12 karesinde gölge pencerenin (sol) aynı yönüne, yani ışığın tersine düşmüyor; son karede ayaklar kadraj dışı.
- P10 DÜZELT — 2936: yorgan alt-sağın ~%45'ini kaplıyor, baş küçük (ertelenen madde sürüyor); replik etiketi y≈1440 band içinde, tamam.
- P11 DÜZELT — 3156: kırmızı kolun kaybolması/yerine "BERAAT" karesinde çıplak el + eldiven aynı karede belirsiz; eldiven neyin üstünde (koyu levha) anlaşılmıyor.
- P12 DÜZELT — 3344: güve ~25 px, sağ kenarda kesik tanımsız kahverengi nesne; sayfa ~%70 boş (ölü alan).
- P13 GEÇER — 3600: Wi-Fi morfu tamam; kenarlarda iki minik çizgi artefaktı (küçük).
- P14 DÜZELT — 3745→3760: eldiven kutuya girer girmez açık büyük kutu, sağda küçük kapalı pakete DEĞİŞİYOR (pop, kapak kapanışı yok; boyut/konum sıçrıyor); son karelerde el hâlâ kadrajda (3830). İmza nesnesi bu geçişte görünmez oluyor.

## Öncelikli düzeltmeler (en çok 6)
1. KRİTİK P14: kutu/paket sıçraması ve kapak kapanmaması (3745–3760). Öneri: kapak kapanma animasyonu eklenir, tek paket nesnesi aynı konum/ölçekte; yoksa kit_eksik: "paket_kapak_kapan". El plan bitmeden >=12 kare önce çıkmalı.
2. KRİTİK P01: son eldiven hareketi yarım; jest bitişini >=12 kare öne al (jest.bitis <= sure_kare-12) ve eldiven kutuya otursun.
3. KRİTİK P09: kol anatomisi + gölge yönü. Öneri: jest "el_agiza" yerine mevcut kitten kol-gövde jesti ya da kit_eksik; ışık kaynağı pencere yönüne bağlanır (gölge sağa).
4. P10: yorgan ölçeği düşür / kamera yüze yaklaş (kamera.olcek ↑, yorgan.kaydir aşağı); baş ekran yüksekliğinin >=%12'si.
5. P12: güveyi büyüt (prop.olcek >=3x, ya da insert push-in); kenardaki kesik nesneyi kaldır; boşluğu doldur.
6. P07: yazıyı kol bantından uzaklaştır (yazi.konum üst bant y 240–400, x kaydır) ya da kol kadraj dışına; P06 çorap girişi/duruşu (çorap düz yatsın, kol önceki karede kurulsun).

## Genel karar
Kullanıcıya GİTMEZ (henüz). 3 kritik (P14, P01, P09) tek turda düzeltilip yalnız o planların kontrol kareleri yeniden bakılmalı; kalanlar orta/küçük. Ses senkronu bu turda ölçülmedi (ses.mp3 değişecek).
Not: kare incelemesi gözle ve 540p üzerinden; P09 gölge yönü ve P01/P06 "havada" yorumları kontak sayfasından, tek kare — düzeltmeden önce doğrulayın.
