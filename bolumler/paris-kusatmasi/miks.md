# Paris kuşatması — miks ve müzik planı (kurgucu, 2026-11-14)

Girdi: `bolum.json` (11 plan, 3493 kare @60 = 58.22 sn), `temaslar.json` (49 temas), `foley.json` (39 ad), `ortam.json`, `public/paris/ses/{tr,en}/` (plan başlangıçları = sure_kare toplamı). Zamanlar **mutlak sn**; plan içi kare = temaslar.json `kare` − plan başı.

Plan başları (sn): P01 0 · P02 6.37 · P03 12.30 · P04 17.85 · P05 22.30 · P06 28.53 · P07 33.32 · P08 38.92 · P09 42.40 · P10 46.03 · P11 52.67 · son 58.22.

## 1. Durum (dürüst özet)
- Foley: 39 ad / 49 temas **şemada eksiksiz** (`bolum_dogrula --tam` GEÇTİ, 0 hata). 14 ses proje arşivinden yeniden kullanıldı (dosya var, tepe ölçüldü); **25 ses henüz yok** (doğrulayıcının 25 "dosya bulunamadı" uyarısı = üretilecekler; tek başka uyarı: P01 f3 kanat baş kırpma, aşağıda). Ses üretilmedi, kredi harcanmadı.
- Müzik: bu oturumda archive.org / incompetech / pixabay / musopen **erişilemedi** (DNS: ağ izin listesinde yok). Parça indirilemedi, lisansı kaynak sayfasından doğrulanamadı → **hiçbir parça "kullanılabilir" değil**; yalnız aday + doğrulama listesi (`muzik/lisanslar.md`). Müzik dosyası kesilmedi.
- Kural çatışması (orkestra karar): `bolum.json` P07 `muzik_notu` "müzik tek vuruşla **susup boşluk açar**" diyor; CLAUDE.md "tam sessizlik yalnız kullanıcı onaylı". Bu planda **tam susma yok**: tek alçak nota + yatak seviyesinde dinamik boşluk (aşağı). Kullanıcı tam sessizlik isterse ayrıca onay.

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

## 4. Müzik seçimi
Aday ve lisans durumu `muzik/lisanslar.md` "Paris kuşatması" bölümünde. Öneri sırası: (1) Chopin Nocturne Op.9 No.2 (A teması süslü dönüşle zaten bookend), (2) Chopin Prelude Op.28 No.4 (B ostinato'ya uygun tekrarlı akor), (3) Incompetech Satie "Gymnopédie" (CC-BY, atıf zorunlu; 1888, dönem sonrası). Hepsi **kaynak sayfası açılıp lisans doğrulanana dek kullanılmaz**. Blanc'ta Chopin B.108 kullanıldı: aynı besteci kanal tekrarı olur, kullanıcı karar versin (Fauré/Gounod alternatif).

## 5. ElevenLabs SFX kredi tahmini (ÜRETİLMEDİ — onay bekliyor)
- Üretilecek: **25 ses** (foley.json `durum: uretilecek`) + `pk-halat-kavra` = **26 ses**, toplam istenen süre ≈ 29.5 sn. Betik: `tools/paris_sfx.py` (var olanı atlar, tepe_ms ölçüp foley.json'u günceller).
- Fiyat varsayımı (doğrulanmadı): süre verilince ≈20 kredi/sn → **≈ 590 kredi**; her çağrı en az ~100 sayılırsa üst sınır **≈ 2 600**. Her sesten 2 çekim alıp seçersek ×2 ≈ 1 200–5 200. Hesap: Creator, abonelik sorgusunda `character_count 44 208 / 129 065` (kalan ≈ 84 800) → en kötü durumda ≈ %6.
- Ortam: 0 kredi (4 yatak mevcut dosyadan).

## 6. Eksik temas (yönetmene)
`TOPLU-DUZELTME #21`: **P06 f218 (mutlak f1930, 32.17 sn) "el halatı kavrar"** `temaslar.json`/`bolum.json`'da yok. foley.json'a eklenmedi (kullanılmayan ad uyarısı vermesin). Yönetmen şunu eklesin: P06 `temaslar`'a `{"kare":218,"olay":"el halatı kavrar","ses":"pk-halat-kavra","db":-16}` ve foley.json'a `pk-halat-kavra` (prompt hazır: `tools/paris_sfx.py`, tepe tahmini 40 ms, 0.6 sn). Seviye −16 (−6 dB'den kısık; sepet tabanı alt bantta `lint.izin` zaten var). Komşular: f194 hasır, f226 ayak (8 kare sonra) → kavrama ile ayak basması iki ayrı ses olarak duyulmalı. P01 f3 `pk-kanat`: ses ~70 ms kırpılır; temas f9'a alınırsa uyarı kapanır.

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

## 8. Sonraki adımlar
1. Kullanıcı: SFX kredi onayı (≈590–2 600 kredi) ve müzik kararı; ağ izin listesine archive.org (ve incompetech/pixabay) eklenmesi.
2. `python3 -I tools/paris_sfx.py` → `ses_kenar.py kontrol` → foley.json tepe güncellenir → doğrulayıcı 0 uyarı.
3. Müzik indirilip lisans metadata'sı doğrulanır → kesim → `public/paris/muzik/`; `tools/paris_miks.py` (`evliya_miks.py`'den türetilecek, müzik zarfı §3'ten) → stem'ler (anlatım/foley/müzik/ortam) + TR/EN final + dalga formu.
