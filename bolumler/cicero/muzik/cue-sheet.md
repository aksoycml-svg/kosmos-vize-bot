# Çiçero — müzik cue sheet (kurgucu, 2026-11-14)

Parça: Incompetech "Measured Paces" (Kevin MacLeod, CC BY 4.0) → `public/cicero/muzik/cicero-measured-paces-65.mp3` (64.83 sn = 3890 kare, bölümle birebir, bas_kare 0). Lisans/atıf: `lisanslar.md`. Ayar: `miks.json` (db −8; konuşmada mutlak −14; atak 9 / bırakma 24 kare).

**Tek parça, tek tema.** Müzik 70 bpm'lik ölçülü piyano nabzıdır (vuruş ≈ 0.863 sn, ölçü 4 vuruş = 3.45 sn); bölüm boyunca kesintisiz akar, plan sınırında kesilmez. "Tema dönüşü" (bookend): bölüm sonundaki tek nota (63.54 sn) yankısı döngüde P01'in ilk notasına (0.89 sn) akar; ayrı ikinci tema yoktur (≤ 2 ✓).

Ham kayıt tek dinamik yay çizer (ölçüldü): 0–32 sn sessiz (−30 LUFS) → 32–36 yükselir → 36–60 dolgun (−27 LUFS, tepe −8 dBFS, 39.46 en güçlü vuruş) → 60–63 yalnız yankı → 63.54 tek nota. Bu yay hikâyeyle örtüşür (kurulum → Berlin/para doruğu → sessiz final) ve **seviye otomasyonu yalnız konuşma ducking'idir**; ek zarf yok. Sessiz yarıya +3 dB (0–34 sn) eklendi ki konuşma altında yok olmasın.

Zaman = mutlak sn (kare/60). "Nabız" = ölçülmüş müzik vuruşu.

| Mutlak sn | Plan | Müzik | Görsel/foley eşleşmesi | Konuşma altı / aralık |
|---|---|---|---|---|
| 0.00–0.89 | P01 kanca | giriş 0.3 sn; ilk nota 0.89 | banknot kavra 0.70 → kağıt sesi önce, ilk nota hemen ardından ("sessizlikte kağıt, sonra nabız") | seyrek nabız; anlatım "sahte çıktı" 5.97–6.67 |
| 0.89–7.30 | P01 | nabız seyrek, düşük; gerilim "bir şey var" | cep 2.30 (nabız 2.59'a yakın) | duck −14 |
| 7.30–13.12 | P02 | aynı nabız, ölçü ritmi sabit | anahtar kilide 7.77 ≈ nabız 7.88; kilit tık 8.07; banyo kapısı 11.40 nabız 11.33 | duck; kapı kapanırken nabız arasında boşluk |
| 13.12–20.35 | P03 | nabız çok seyrek/hafif (en sessiz bölge, −32 LUFS) | **mum bastırma 15.62 = nabız 15.63** (aynı an); izdeki çizim 17.5–19.4, yarım tutma 19.4–20.3 nabız aralıklarında | duck |
| 20.35–26.72 | P04 | hafif nabız; **24.32'den 26.09'a kadar tek vuruş atlanır (1.8 sn seyrek)** | deklanşörler 22.85/23.22/23.58 nabız 23.48'e yakın; **gölge tutması 24.48–25.55 = müzikteki boşluk** (nefes tutan oda); su yeniden 25.85; kapak 26.32 nabız 26.09'u izler | duck; boşlukta aralık kuralı (≤ −16), konuşma yok |
| 26.72–30.83 | P05 | nabız yükselir (27.71 −15, 30.38 −14 dBFS) | el–el kutu/zarf değişimi, nabız üzerinde; kutu tutuşu 27.46, zarf 28.12, kucak 28.69 nabız 28.59 | duck |
| **30.83**–40.00 | P06 ★ | dolgun yaya girer: 32.04, 32.93 (−12), 37.30 (−11), **39.46 (−8, bölümün en güçlü vuruşu)** | dosya masa tok 31.77 ≈ 32.04; **çekmece kapanışı 38.17 = nabız 38.19**; sıkışan köşe tutması 38.2–40.0 (39.46 vurgu arasında) | duck; TR 7.92 sn konuşma, tutma 1.25 sn aralık |
| 40.00–45.87 | P07 ★ | dolgun; 41.63, 42.95 (−13), 45.11 (−11) | zarf açılır 40.50, banknot dökülür 40.93; **çarpı 43.97 (tempo 0.9916 ile nabız hizasında)** — çarpı foley değil görsel, tek sert vuruş müzik nabzıyla çakışır | duck (TR 4.6 sn); çarpı konuşmanın içinde ("sahteydi"), foley −12 |
| 45.87–52.17 | P08 | dolgun, biraz seyreltilir: 46.40, 49.86 (−11) | fincan tınısı 48.23 ≈ nabız 48.54; Bazna kadraj dışı 49.7 ≈ nabız 49.86 | duck |
| 52.17–58.33 | P09 | dolgun → çekilir: 53.36, 55.48 (−12), sonra seyrek | araba kapısı 54.17, araba gider 54.25 (ortamla); **lamba düğmesi 56.53**; sonra **57.0–58.33 foley yok** (kararma; sessizlik = foley yokluğu, müzik akar) | duck |
| 58.33–64.83 | P10 ★ | 58.94, 59.81, 60.27 son nabızlar; **60.3–63.5 yalnız yankı (3.2 sn, en seyrek)**; **63.54 final notası**; 63.6–64.83 sönüm | lamba tık 58.73; banknot al 59.37; ışığa tutma 59.4–60.2; tutma 60.2–64.2; **anlatım 63.3'te biter, final notası hemen ardından**; banknot kayması 64.27 yankı üstünde (P01'e eşleşen kesme) | konuşmada duck; 60.3–63.3 konuşma + yankı; 63.3 sonrası aralık |

## Montaj kuralları (uygulama)
- Seviye: bölüm içinde elle zarf yok; ducking `miks.json` (atak 9, bırakma 24 kare). Konuşmada ≈ −22.8 dB, aralıkta dolgun bölgede ≈ −16.8 dB (hesap; teknisyen miksten sonra plan başına ölç, `miks.md` ölçüm tablosu).
- Sessizlik = araç: yalnız (1) P04 gölge tutması 24.5–25.5 (müzikte atlanan vuruş), (2) P09 57.0–58.33 foley yokluğu (müzik akar), (3) P10 60.3–63.5 yankı. Müzik hiçbir yerde tamamen durmaz (kullanıcı onaylı tam sessizlik kararı yok).
- Foley müzik tepelerinin 10–15 dB altında (küçük temas); vuruş niteliğindekiler (kapı, çekmece tok, araba kapısı) yatağın 6–8 dB üstünde, `cic_*` `onerilen_db` −6…−10; kıstırma yok.
- Geçiş: whoosh/riser yok (savaş konusu, bütçe 0); geçişler ses köprüleri (daktilo → anahtar tıkı, belge hışırtısı, adım → uzak motor) ve ışık eşleşmeleri; çıplak kesme P05→P06'da müzik sürer.
- Döngü: dosya sonu 64.83 sn, ses yok; final notası yankısı P01'in 0.89 sn ilk notasına doğru söner (0.9 sn boşluk, kesme yok).
- Premiere kanalları: A1 anlatım, A2 foley (temaslar-taslak.json), A3 müzik, A4 ortam (ortam.json). Müzik zarfı Premiere'de anahtar karelerle yeniden kurulursa bu tablo referans.
