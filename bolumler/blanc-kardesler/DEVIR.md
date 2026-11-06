# Devir Notu — Blanc Kardeşler (Bölüm 1)

## Onaylananlar
- **Senaryo v2** (`senaryo-v2.md`, senarist ajanı): 23 plan, ~60 sn, eldiven kancası + döngü, ekran yazıları, doğruluk notu. Kullanıcı onayladı.
- **Görsel dil:** vektör kukla animasyonu, 1830'lar Haussmann öncesi Fransa, ay ışığı/amber, 60 fps.
- **Prototip v6** (`src/bolumler/blanc/proto/`): sokak, rig, fare insert, kurallar bu prototipte uygulandı.

## Eleştirmenin açık notları (yeni oturumda kullanıcıya sor)
1. Süre 60 sn mi, kısa kesim ~52 sn mi (senaryo-v2 §4)?
2. "İkizler" tek kaynaklı (FR Vikipedi) — anlatıda "kardeşler" mi denilsin?
3. P12 ve P14 art arda iki dürbün maskesi — P14 maskesiz mi çekilsin?
4. P22 Wi-Fi morfu: kukla dokusunda, neon değil.
5. Üretim yükü: ~8 yeni mekân (Bordeaux Borsası, Tours istasyon içi, kule + merdiven dış, Paris posta avlusu, Bordeaux çatı/çatı katı, yatak odası, mahkeme, kanun kitabı insert). Prototip sokağı Bordeaux'ya uyarlanacak (Notre-Dame yerine Garonne direkleri).
6. ElevenLabs Starter plan: Türkçe Umut Canbay sesi + ticari kullanım. Kullanıcı yükseltmezse George (TR telaffuz kontrol edilmeli).

## Sıradaki adım
**Storyboard v2** (onay noktası 2): 23 plan için kare + notlar. Önerilen yöntem: yönetmen + yaratıcı yönetmen + tasarımcı plan/dokunuş/mekân listesini çıkarır; motion her mekân için kodla bir kontrol karesi (stil çerçevesi) üretir; eleştirmen kontrol eder; kullanıcıya sunulur. Ardından seslendirme, animasyon, ilk kurgu, Premiere paketi.

## Varlıklar
- Karakter referansları: `karakter/` (François portresi kamu malı, karakter kartları Gemini).
- Ses: `public/blanc/ses` (George ile eski senaryo — yeni senaryo için yeniden üretilecek), `public/proto`, `public/blanc/sfx`.
- Harita: `src/bolumler/blanc/Harita.tsx` (gerçek Fransa sınırı, tarihî Paris–Bordeaux yolu).
