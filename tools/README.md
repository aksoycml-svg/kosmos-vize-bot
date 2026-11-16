
## Paris kuşatması anlatım sesi (FINAL, tekrar üretilebilir)
`tools/paris_ses_final.py` — Doga (TR `ctoYieZ4J7WwcdhujpMq`) + Brian (EN `nPczCjzI2devNBz1zQrb`), eleven_multilingual_v2, bölümün tamamı TEK çağrı, etiket yok, BÜYÜK HARF yok, "…" yok; ayar stability 0.45 / style 0.2 / similarity 0.8 / speed 1.0 / seed 7 (KESIK ya da sorunluysa 8, 9). Metin `senaryo.md` / `senaryo-en.md` plan tablosundaki kalın tırnaklı anlatımdan otomatik okunur.
```
export elevenlabs_api_key=...            # yazdırma
python3 -I tools/paris_ses_final.py uret tr 7 ; python3 -I tools/paris_ses_final.py uret en 7
python3 -I tools/paris_ses_final.py kes tr 7 ; python3 -I tools/paris_ses_final.py kes en 7   # nefes temizliği + sinyal sessizliğinden plan kesimi + ses_kenar + kelime zamanı
python3 -I tools/paris_ses_final.py plan ; python3 -I tools/paris_ses_final.py olc
python3 -I tools/paris_ses_final.py dinlet tr ; python3 -I tools/paris_ses_final.py dinlet en   # public/paris/dinlet/final-{tr,en}.mp3 + dalga png
```
Aynı seed aynı metinle yaklaşık aynı sesi verir; metin değişirse seed yeniden denenir.

## hedef_kiyas.py — hedef ↔ render sayısal kıyas (kalibrasyon turu)
```
python3 -I tools/hedef_kiyas.py hedef.png render.png [--bolge ad:x0,y0,x1,y1 ...] [--json out.json] [--sayfa out.jpg]
```
360x640'a küçültür (9:16 değilse merkezden kırpar); 3x4 ızgara + `--bolge` (360x640 koordinatı) için SSIM, kenar yoğunluğu oranı, L* p5/p50/p95/aralık + histogram kesişimi, a*/b*, sıcak %, C* p95 ve en uzak 3 bölge. `--sayfa`: hedef | render | SSIM ısı | kenar haritaları. Gereksinim: `pip install scikit-image`.

## poz_cikar.py — hedef görselden poz/el/yüz eklemleri (MediaPipe Tasks, yalnız sayısal başlangıç)
```
python3 -I tools/poz_cikar.py hedef.png out.json [--kisi N] [--sayfa out.jpg] [--pose-model heavy|full]
```
Çıktı: `{kaynak,w,h,pose:{ad:[x_px,y_px,z,gorunurluk]},el_sol?,el_sag?,yuz?:{yaw,pitch,roll,noktalar}}`; sol/sağ = kişinin kendi tarafı; yaw + = kişi kendi soluna döner, pitch + = yukarı bakar, roll + = baş kişinin sağ omzuna yatar. Gereksinim: `pip install mediapipe opencv-python-headless`, sistemde `libegl1 libgles2`, modeller `tools/modeller/*.task`.
Stilize görselde tam kare tespit düşebilir: el/yüz için kırpıp büyüten yedek var (`tespit_notu`); görünürlük <0.5 eklemlere güvenme, kontrol sayfasına bak (`--sayfa`).
