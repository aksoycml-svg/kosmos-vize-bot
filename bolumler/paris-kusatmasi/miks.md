# Paris kuşatması — miks ve müzik planı (kurgucu, 2026-11-14)

Girdi: `bolum.json` (11 plan, 3493 kare @60 = 58.22 sn), `temaslar.json` (49 temas), `foley.json` (39 ad), `ortam.json`, `public/paris/ses/{tr,en}/` (plan başlangıçları = sure_kare toplamı). Zamanlar **mutlak sn**; plan içi kare = temaslar.json `kare` − plan başı.

Plan başları (sn): P01 0 · P02 6.37 · P03 12.30 · P04 17.85 · P05 22.30 · P06 28.53 · P07 33.32 · P08 38.92 · P09 42.40 · P10 46.03 · P11 52.67 · son 58.22.

## 1. Durum (2026-11-14, ikinci tur: üretildi + taslak miks)
- Foley: 39 ad / 49 temas şemada eksiksiz; **26 ses ElevenLabs SFX ile üretildi** (tek çekim, KESIK yok; 17 klip CIT → `ses_kenar.py duzelt`; ardından temiz). 14 ses proje arşivinden. `bolum_dogrula --tam`: GEÇTİ, 0 hata, **1 uyarı** (P01 f3 `pk-kanat` baş kırpma → yönetmen).
- Müzik (güncel, 2026-11-14 üçüncü tur): **Chopin Nocturne Op. 9 no. 2 (Musopen, CC0)** — §4b. Aşağıdaki Gymnopédie anlatımı eski/yedek.
- (Eski) Müzik: **Incompetech "Gymnopedie No. 1" (Kevin MacLeod, CC BY 4.0)** kullanıldı. Chopin/Musopen (Op.9 No.2) istendi: archive.org öğe metadata'sı CC0 (`licenseurl`) doğrulandı, ama dosya indirme CDN düğümleri (ia800404.us.archive.org, dn710801.ca.archive.org) proxy politikasıyla 403 → **indirilemedi**; yedek devreye girdi. Ağ açılırsa Chopin ile değiştirme yolu §4.
- Taslak miks üretildi (TR + EN): `python3 -I tools/paris_miks.py` → `public/paris/miks/{tr,en}.wav` (−14 LUFS), stem'ler `{tr,en}/{anlatim,foley,muzik,ortam}.wav`, dalga PNG. wav'lar .gitignore'da.
- Kural çatışması çözüldü (orkestra): P07'de tam susma yok; tek alçak nota + yatak dinamiği.

## 2. Seviyeler (0 dB = anlatım, −18 LUFS klip eşitleme)
| Katman | Seviye |
|---|---|
| Anlatım | 0 dB; `ses_isle.py` zinciri kurulunca zorunlu (şimdi: `paris_ses_final.py` çıktısı) |
| Müzik | konuşmada −22, aralarda en çok −16 (zarf tavanı −16; "vurgu" konuşma varken yarıya iner). Müzik cümlesi **seviye değil register/yoğunluk** ile kurulur |
| Foley | tepe −3 dBFS'e eşitlenir + temas dB (−7…−14); anlatım varken anlatımın ≥4 dB altı (en çok −8 dB indirim) — `evliya_miks.py` mantığı |
| Vuruş/darbe (tel-kopma, sandık-tok, uzak-pat, gaz-bosal, sepet-gicir) | yatağın (müzik+ortam) 6–8 dB üstünde; ama P07 darbe "uzak" olduğu için −14/−12 kalır, 6 dB üstü kontrolü **müzik −22 iken** yapılır |
| Küçük temaslar (tik, kağıt, kılıf, cam, düğüm) | müzik tepelerinin 10–15 dB altı |
| Ortam (`ortam.json`) | −26…−28 dB, lowpass 1.2–1.5 kHz, 0.4 sn giriş/çıkış sönümü, plan sınırında çapraz (kesilmez) |
| Final | −14 LUFS, tepe −1.5 dBTP, **TR ve EN ayrı ölçülüp eşitlenir**; plan başına LUFS ölç, medyandan 3 LU sapanı işaretle |

Görünürlük–ses kararları: `pk-odak-disli` (P10 f120, dişli ekranda görünmüyor) **−18 dB ortam** (foley.json değeri; bolum.json −10 yazıyor → yönetmen −18 yapsın). `pk-uzak-pat` (−14), `pk-gaz-bosal` (−12), P08 `pk-sepet-konma` (−14, harita ikonu), `pk-lamba` (−12), `pk-kagit-yagmur` (−12, uzak) kısık kalır. **Düşen sepetin sesi yok** (dokunuş notu). Geçiş: P01 ve P07 `whip` kamera geçişi **sessiz** (savaş konusu: whoosh/riser yok; whoosh bütçesi 0). `pk-gaz-fis` ve `pk-gaz-bosal` düz fısıltı/iç çekiş olarak üretilir, yükselen "riser" gibi duyulursa elenir.

## 3. Müzik yapısı (2 tema: A = ezgi, B = ostinato)
> İlk tur tasarımı (Chopin varsayımlı). Gymnopédie ile gerçekleşen eşleme §4'te: B ostinato = Satie'nin sol el G/D akor salınımı (kaynakta zaten sürekli), A = melodi cümlesi (9.4 sn'de girer, P10'da dönüş).
Karakter: dönem piyanosu, sade; konuşma altında melodi yok denecek kadar seyrek. Ölçü başı kesme, geçiş 0.3–0.8 sn çapraz. Tempo kaynak seçilince ölçülür; aşağıdaki anchor'lara en yakın ölçü başına oturtulur (±1 vuruş; gerekirse ≤%3 uzat/kısalt).

| Mutlak sn | Plan | Müzik cümlesi |
|---|---|---|
| 0.00–6.37 | P01 **kanca** | A teması çıplak: tek ince nota + pad; kuş kalkışında (0.05) ilk vuruş yok, yumuşak açılış; "çıkmalıydı" (5.26–5.75 TR) alçalır; P02'ye akar |
| 6.37–12.30 | P02 | pad alçalır; "kesti" tel kopması 8.67'de müzik **tek uzun alçak nota** (boşluk yatakta, susma değil); "iki milyon" 10 sn civarı ağır tek nota, 0.7 sn nefes |
| 12.30–28.53 | P03–P05 | **B ostinato** (sol el tekrarı) P03'te başlar (gaz fışşıyla, 12.43), P04'te ısınır; P05 terazide düşük, el girince A'nın ilk iki notası "ışık" gibi; ölçü anında (anahtar 26.77–28.27) yatak sadeleşir, çevre geri çekilir |
| 28.53–33.32 | P06 | B kararlı alçak; sandık tokunda (31.70) ritim vuruşu bu temasla **aynı ölçü başı**; halat gerilirken (32.90) gerilim yükselir, P07'ye taşar |
| **33.32–38.92** | **P07 DORUK** | 35.12 darbe/balon vuruldu: B ostinato **tek alçak nota + sustain**'e iner (yatak −22'de, foley darbe 6–8 dB üstünde duyulur); 36.5–37.4 kum torbaları: nota tutulur, gerilim; **37.77 "yükseldi"**: A teması bir oktav yukarı açılır, tavan −16; 38.27 sonrası nefeste çözülür, P08'e akar |
| 38.92–46.03 | P08–P09 | P08 yorgun rahatlama, Tours'a (iğne 41.65) varınca tek notada oturur; P09 titiz, sakin, ince tekrarlayan figür; pırıltıda (kılıf 42.97) tek parlak nota = P01 karşılığı |
| **46.03–52.67** | **P10 KARŞILIK** | A teması **dönüş**: P01'in çıplak motifi burada tam, sıcak, yavaş (armonize). "yansıdı" 46.86 fısıltı; "büyüdü" 49.65 hayranlık (register açılır); **"okudu" 51.72–52.03 en sıcak, en yavaş**; müzik okuma tutmasında (50.96–52.46) sürer. **EN'de 50.23–52.67 sessizlik resimle dolar: müzik burada −16 tavanına çıkar** (anlatım yok → aralık kuralı), TR'de −22 |
| 52.67–58.22 | P11 | "dönemedi" 53.39 alçak register; "Ama" 54.34 sıcak çözülme; kuyruk (kuş 56.37) yakınında A motifi (P01'in ilk notaları) döner; **son nota P01'in ilk notasına akar**; 57.6–58.22 yavaş sönme (0.6 sn), döngüde kesilmez |

Bookend: A teması P01 (çıplak) → P10 (tam) → P11 (motif) → P01 (aynı ilk nota). B yalnız P03–P07. Toplam iki tema.

## 4. Müzik (gerçekleşen)
`public/paris/muzik/paris-gymnopedie-58.mp3` (58.22 sn), betik `tools/paris_muzik.py`, kaynak `muzik/kaynak/gymnopedie-no1-kevin-macleod.mp3`. Izgara: 77 bpm 3/4 → ölçü 2.344 sn (otokorelasyonla ölçüldü, ölçü başı ≈ k·2.344); çift ölçü = aynı akor, kesimler çift ölçüde, 0.4 sn eşit güç çapraz sönüm, giriş 0.3 / çıkış 0.6 sn.

| Çıkış ölçüsü (sn) | Kaynak ölçüsü | Not |
|---|---|---|
| 0–19 (0–46.88) | 0–19 düz | intro LH (0–9.4) → melodi girişi 9.4 (kopma 8.67'den **sonra**); **ölçü 15 = 35.16 sn = darbe 35.12** (kaynakta sakin ölçü: tek alçak nota); ölçü 16 = 37.5 ≈ "yükseldi" 37.77 (melodi açılır); ölçü 18 sakin = P09 |
| 20–23 (46.88–56.26) | 4–7 | **tema ilk cümlesi geri döner** (P02'de duyulan cümle = bookend): ölçü 20 = "yansıdı" 46.86, ölçü 21 = "büyüdü" 49.2, ölçü 22 = **"okudu" 51.6** (en sıcak), ölçü 23 = "Ama" 53.9 |
| 24– (56.26–58.22) | 24– | sakin LH, kuş konma 56.37'ye oturur, sönme 57.6–58.22; ölçü 24 (çift) → döngüde ölçü 0 (çift) aynı akor |
Chopin'e geçiş (ağ açılırsa): Musopen Chopin "Nocturne Op. 9 no. 2 in E flat major.mp3" (öğe `musopen-chopin`, sha1 c23ff410…); betiğin P listesi ve ölçü ızgarası yeniden ölçülür.

## 4b. Müzik (güncel): Chopin Op. 9 no. 2
`public/paris/muzik/paris-chopin-op9no2-58.mp3` (58.22 sn), `tools/paris_muzik.py` (Satie sürümü `paris_muzik_satie.py`), kaynak `muzik/kaynak/chopin-nocturne-op9-no2-musopen.mp3`. Rubato kayıt → sabit ızgara yok; kesimler Eb/Bb noktalarından, 0.5 sn eşit güç çapraz.
| Çıkış (sn) | Kaynak (sn) | Bağ |
|---|---|---|
| 0.0–41.9 (S1) | 0–39.4, %6.4 yavaş (rubberband) | ilk nota 0.45 (yumuşak giriş, 0.3 sn fade); kaynak 8.15 Do-minör dönüşü = **tel kopması 8.67**; kaynak 35.5 melodi yükselişi = **"yükseldi" 37.77**; darbe 35.12 kaynakta 33.0 (dominant ölçü, Eb'ye çözülmeden önce) |
| 41.72–53.65 (S2) | 0–11.9 (ilk cümle, DÖNÜŞ) | S1 41.5–42.0 söner, tema Bb/Eb açılışıyla geri gelir (P01 karşılığı); kaynak 10.0 tepe = **"okudu" 51.72**; "yansıdı" 46.86 = kaynak 5.1, "büyüdü" 49.65 = 7.9; sonu Bb/F |
| 53.65–58.22 (S3) | 53.8–58.4 (koda, −3.5 dB) | Bb→Eb çözülme; "Ama" 54.34 tonik, kuş 56.37 tonikte; sonu F/Bb dominant → döngüde P01'in Bb/Eb açılışına akar; 57.6–58.22 sönme |
Bookend: tema P01 (çıplak) → P02 (devam) → P10 (tam dönüş) → P11 koda → P01. İki tema yerine tek tema (Chopin'in LH arpejî zaten ostinato). P07'de tam susma yok (kaynak 33–35.5 sakin Eb; darbe müzik üstünde −22 yatağın 6–8 dB üstü).
Miks değişiklikleri: `mom98` → %99.5 (müzik tepeleri −22/−16'ya oturur), P11 zarfı 54.9'da −3.5 dB (EN gap).

## 5. ElevenLabs SFX kredi (HARCANDI)
- 26 ses (25 temas sesi + `pk-halat-kavra`), tek çekim, ikinci çekim gerekmedi. İstenen süre toplamı ≈ 29.5 sn.
- Abonelik sayacı (`character_count`) 44 208 → 44 538: **+330** (limit 129 065). Tahminimden (590–2 600) çok düşük; sayaç birimi SFX için farklı olabilir, fatura değil abonelik sayacı.
- Ortam: 0 kredi.

## 6. Eksik temas (yönetmene)
`TOPLU-DUZELTME #21`: **P06 f218 (mutlak f1930, 32.17 sn) "el halatı kavrar"** `temaslar.json`/`bolum.json`'da yok. **ses dosyası üretildi** (`public/paris/sfx/pk-halat-kavra.mp3`, 600 ms, ilk net başlangıç 37 ms, tepe −21.9 dBFS ham), `foley.json`'a eklenmedi (kullanılmayan ad uyarısı vermesin); taslak miks `tools/paris_miks.py` içinde `EK_TEMAS` ile çalar. Yönetmen şunu eklesin: P06 `temaslar`'a `{"kare":218,"olay":"el halatı kavrar","ses":"pk-halat-kavra","db":-16}` ve foley.json'a `pk-halat-kavra` (prompt hazır: `tools/paris_sfx.py`, `{"dosya":"paris/sfx/pk-halat-kavra.mp3","tepe_ms":37,"sure_ms":600,"onerilen_db":-16}`). Seviye −16 (−6 dB'den kısık; sepet tabanı alt bantta `lint.izin` zaten var). Komşular: f194 hasır, f226 ayak (8 kare sonra) → kavrama ile ayak basması iki ayrı ses olarak duyulmalı. P01 f3 `pk-kanat`: ses ~70 ms kırpılır; temas f9'a alınırsa uyarı kapanır.

## 7. Kulakla bakılacak saniyeler (sesi duyamıyorum, ölçüyorum)
TR ve EN'de ayrı dinle:
- **0.05–0.3** kuş kanadı: baş kırpık/çıt yok mu; anlatım 0.13'te başlıyor, kanadı örtmesin.
- **8.57 / 8.67** halka tiki ile tel kopması 100 ms arayla: iki ayrı ses mi, "pınk" kısık mı; ardından ~0.5 sn kısık boşluk.
- **12.43** gaz fışşı: düz mü, "riser/whoosh" gibi yükselmiyor mu (savaş konusu).
- **14.03** küre pof + **14.17** halat çözülür (8 kare): çamur olmasın.
- **20.12–20.35** sepet konma → kafes menteşesi (14 kare); **21.72** kuş çıkışı.
- **25.07, 25.33, 25.80, 26.77** P05 tik/fişt/çekmece/şerit: küçük, müziğin 10–15 dB altında; anahtar an 26.77–28.27'de çevre geri çekilmiş mi.
- **31.70 / 31.77** sandık+hasır 4 kare arayla: tek ses gibi mi; **32.17** halat kavrama (eklenince) + **32.30** ayak: ikisi ayırt edilir mi.
- **35.12–35.18** darbe + gaz boşalma: yatağın 6–8 dB üstünde, abartısız "uzak"; müzik o an **susmadan** tek nota. Bu bölümün en önemli 3 sn'si.
- **36.58 / 36.88** iki kum akışı, **37.25** sepet sıçrar: sepet düşüşünün sesi olmamalı. **37.77** müzik açılışı ("yükseldi") −16 tavanını aşmıyor mu.
- **40.18** P08 uzak sepet: neredeyse duyulmaz olmalı; **41.65** iğne.
- **48.03** odak dişlisi: yalnız ortam, fark edilir ama baskın değil. **47.17** lamba kısık.
- **46.86 / 49.65 / 51.72** P10 müzik üç nokta (fısıltı → hayranlık → en sıcak); **EN 50.23–52.67** sessizlik müzikle dolu mu, ürkütücü boşluk yok mu.
- **54.83** film yağmuru kısık; **56.37** kuş konma; **57.3–58.22** son nota ve **döngü 58.22→0.00**: müzik ve kanat kesintisiz bağlanıyor mu.
- Genel: müzik hiçbir yerde "dip ses" gibi yükselmiyor mu (aralar ≤ −16); plan başına LUFS tablosu; TR/EN final −14.

## 7b. Taslak miks ölçümleri (TR / EN)
| Ölçüm | TR | EN |
|---|---|---|
| Final | −14.0 LUFS, TP −2.0 dBTP | −14.3 LUFS, TP −1.9 dBTP (üst sınır −1.5 ✓; EN 0.3 LU düşük, alimiter) |
| Plan LUFS (medyandan >3 LU sapan) | hiçbiri (P01–P11: −14.1…−13.4) | hiçbiri (−15.2…−13.1) |
| Müzik konuşmada (momentary, anlatıma göre) | medyan −29.9, %95 −20.4 | %95 −20.6 |
| Müzik aralarda (−18 ref'e göre) | en çok −18.4 | −16 sınırına yakın; EN P10 50.6–52.0 boşluğunda müzik TR'den ≈ 5 dB yüksek (kural dahilinde) |
| Foley zirve (M) | −17.5 LUFS (anlatım zirvesi −13.7) | −18.2 (−13.3) |
| Dalga formu | `public/paris/miks/{tr,en}-dalga.png`: ani kesik, sıçrama, kırpma yok | aynı |
Müzik referansı: zirve momentary %98 = −18 LUFS (tepelere de −22/−16 uygulansın diye). Daha duyulur isteniyorsa `tools/paris_miks.py` içindeki `mom98` normalizasyonuna +3…4 dB (integrated referansı) verilir; foley (−3 dBFS normalizasyon + temas dB) müzikten çok yukarıda kalır, "küçük temas müzik tepelerinin 10–15 dB altı" kuralı bu müzik seviyesiyle uygulanamıyor (kural çatışması: foley −2/−6 dB anlatım kuralı öncelikli).

## 8. Sonraki adımlar
1. Yönetmen: #21 temasını `bolum.json`'a (satır §6), P10 f120 db −18, P01 kanat f9 → doğrulayıcı 0 uyarı.
2. Teknisyen/orkestra: kullanıcı kulak listesini dinler; müzik seviyesi/ Chopin kararı.
3. ~~Chopin~~ yapıldı (§4b).
4. `ses_isle.py` kurulunca anlatım zinciri miks girişine eklenir (şimdi `paris_ses_final.py` çıktısı doğrudan).
