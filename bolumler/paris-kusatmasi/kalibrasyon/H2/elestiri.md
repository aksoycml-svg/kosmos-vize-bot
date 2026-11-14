# Eleştiri — Harita H2 son kontrol (şablon kabulü) · 2026-11-14 · elestirmen

**Karar: GEÇER (şablon kabul) · puan 7** — H'nin 3 düzeltmesi tuttu. Yeni kritik fizik, süreklilik ya da doğruluk hatası yok. Bir okunurluk kusuru ve bir açık foley kararı var (aşağıda). İkisi de parametre ya da json işi, şablon kodu yeniden açılmaz.

## H düzeltmeleri tuttu mu
1. **Tel ucu "baston" → TUTTU.** P02 şerit f144–192: kıvrım yok. Uçlar kısa ve düz. Kopukluk Prusya halkası üzerinde açık bir boşluk olarak okunuyor (360'ta ≈25 px). Sebep-sonuç "tel kesildi" diye okunuyor. İç hat sur kapısında bitiyor.
2. **P08 iniş → TUTTU.** f84'te "göz/mercek" okuması kalktı. Push-in çalışıyor; şerit f50–110 akıcı. Sepetin örgüsü ve buruşuk kumaş tam boyda okunuyor. 360'ta ikon ≈55×14 px, biraz "ayakkabı" da okunabilir (küçükler listesinde).
3. **Kuşlar → TUTTU, bir istisna var.**
   - P04 kümes 80 px ve "ev" okunuyor.
   - P11'de kuş emilmesi yok. Kuşlar düşüp yatıyor (şerit f20–112); fade ihlali kapandı.
   - f100'de çatıdaki kuşlar görünüyor ama soldaki iki kuş üst üste biniyor, 360'ta "3" değil "2 leke" sayılıyor.
   - **f150'de (kontrol karesi) şerit yığını kümes çatısının ve 3 kuşun üstüne biniyor; kuşlar görünmüyor** (bkz. düzeltme 1).
4. **Siluetler sur içinde ve kümes boşluğu korunuyor.** P02 f290, P03B, P04 ve P11'de aynı düzen var. "Kuşatanlar" okuması kalktı.
5. **Motion'ın sorduğu yerler:**
   - P06b f232–240: diz baş hizasından indi. Bacak hâlâ koyu bir kütle ama siluet "sepetin kenarından tırmanan adam" olarak okunuyor. Küçük.
   - P02 bastırma (10 px V): şeritte 360'ta görülmüyor. Kopmayı engellemiyor. Küçük.
   - P10 memur-3: palto açıldı. Kol, zarf ve omuz insan olarak ayrışıyor; baş hâlâ koltuğa karışıyor. Kabul.

## Yeni kritik
Yok (fizik, süreklilik, doğruluk temiz; kırmızı %0, harita karelerinde güvenli alan ihlali 0).
Açık kural kararı (madde 12, temas = ses): P11'de 9 kuşun kâğıda düşmesi artık 90 px ve görünür bir temas (f37–f103). Ya foley eklenir ya da `lint.izin` ile "harita sembolü, fiziksel temas değil" olarak kapatılır. Orkestra karar versin. Karar verilmeden teslim edilirse kural ihlali sayılır.

## En çok 3 düzeltme (önem sırasıyla)
1. **P11 f150: yığın çatıdaki 3 kuşu örtüyor.** Doruk görüntüsü (9'a 3) kontrol karesinde sayılmıyor. **Orta-yüksek.**
   - Sahibi: motion (yığın konumu / z sırası) + yönetmen (kontrol_kare).
   - Neden: üst yığının merkezi kümes çatısının üzerinde (≈ tam boy 560–640, 800–930). Kuşlar yığının altında çiziliyor.
   - Öneri:
     - Üst yığın kümesin altına kaysın (≥90 px aşağı; alttaki ikinci yığınla birleşebilir), ya da çatıdaki kuşlar yığının üstüne çizilsin.
     - Çatıdaki 3 kuşun x aralığı ≥ kuş genişliği olsun (tepe ile sol eğim kuşu şu an üst üste).
2. **P11 kuşların kâğıda düşme teması: foley ya da `lint.izin`.**
   - Sahibi: kurgucu (foley, küçük kâğıt tıkı, küçük temas seviyesi) ya da orkestra (izin).
   - Neden: 90 px'lik ikonlarla temas görünür hale geldi. Kareler `durKare + 7` → `temaslar.json`'a eklenmeli.
3. **P08 f80–94: Paris halkası sol kenarda kesiliyor.**
   - Sahibi: yönetmen.
   - Neden: push-in hedefi (rota ucu 460,900) Paris'i kadrajın dışına itiyor. Paris noktası x ≈84 (yan bant sınırında) ve halka kadraj dışına taşıyor.
   - Öneri: hedef x 460 → ≈540 ya da cs 2.4 → 2.2. Rota başı ve sonu birlikte kadrajda kalsın (başlangıç–varış ilişkisi bu planın anlamı).

## Küçükler
- **P11 sol bant:** düşen kuşlar x 40–130'da. Yönetmende (t_dur), tartışma yok.
- **P08 sönme:** f74 dolu, f78 sönmüş. Sönme ≈4 karede bitiyor ve telefonda "anahtar" gibi atlıyor. Dönüşüm 10–12 kareye yayılsın (motion, sönme süresi).
- **P08 ikon:** 360'ta "ayakkabı" gibi de okunabiliyor. Sepetle kumaş arasına 2–3 ip çizgisi eklensin; kumaşın yüksekliği 40 → ≈60 px olsun (motion).
- **P04 f60 kontrol karesi:** dönen kuş sol kenarda yarı kadraj dışında. `kontrol_kare` kuşun kümese yaklaştığı kareye kaysın (yönetmen).
- **P02/P03B/P04/P11:** iç tel parçası kalabalık siluetlerinin başlarının üstünden geçiyor (z sırası). Tel, kalabalığın altına alınsın (motion, küçük).
- **P02 bastırma:** V 10 → 18–20 px. Ya da olduğu gibi kabul edilsin; foley zaten anı taşıyor.
- **P06b f232–240:** bacakta açık kontur (1.5–2 px, lantern tarafı) eklensin (motion, küçük).

## Dinleme notu
P02 kopma f144 (temaslar 526, sn 8.767) — foley hizası buna göre olsun. P11 düşme temasları karara bağlıdır.
