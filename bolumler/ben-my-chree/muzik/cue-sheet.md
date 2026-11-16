# Ben-my-Chree — müzik cue sheet ve ses planı (kurgucu, 2026-11-16)

Dosya: `public/benmychree/muzik/bmc-muzik-61.mp3` (61.10 sn = 3666 kare, bölümle birebir, `bas_kare 0`). Üretim: `tools/benmychree_muzik.py` (render yok, yalnız ses). Ayar: `miks.json` (db −17.5; konuşmada mutlak −23.5; atak 9 / bırakma 24 kare). Foley: `foley.json` (17) + `temaslar-taslak.json` (20 olay, mutlak kare). Ortam: `ortam.json` (3 yatak). Lisans/atıf: `lisanslar.md`. Zaman = mutlak sn (kare/60).

## Seçim
Kayıtlar 1917 yaylı/piyano dili: gösterişsiz, ağırbaşlı. İki Incompetech parçası (CC BY 4.0; kamu malı kayıt bulunamadı/doğrulanamadı, bkz. lisanslar.md):
- **Tema A — "SCP-x6x (Hopes)"** (piyano + viyolonsel, ~66 bpm, Re minör): seyrek, aralıklı; merak/keşif. Bölümün açılışı ve **dönüşü**: ilk 22 sn parçanın kendi başı; son 4.6 sn parçanın kendi bitişi (Bb–F–Re minör).
- **Tema B — "Lost Time"** (viyola/viyolonsel/kontrbas, ~55 bpm, Sol minör, Gm–Bb–C–D döngüsü): katalog açıklaması "diyalogun altında, ölüm sahnesi için, yolunuza çıkmaz". Gerilim, kayıp, saygı. Kimse için marş/zafer yok.
Bölümde 2 tema (kural ≤2 ✓); bookend finalde ✓.

## Zaman çizelgesi (akor sınırları çıktı dosyasında ölçüldü: bas notası, 0.05 sn adım)
| Mutlak sn | Plan | Müzik | Görsel/foley eşleşmesi | Konuşma altı |
|---|---|---|---|---|
| 0.00–3.17 | P01 kanca | giriş 0.25 sn; **ilk piyano notası 0.7 sn** (Re), seyrek nabız; deniz yatağı müzikten önce | TR sözü 0.06'da, EN 0.84'te: nota EN'de söz öncesine düşer | duck |
| 3.17–10.05 | P02 hayranlık | piyano + viyolonsel akar (ölçüde 4 vuruş, ~0.9 sn nabız) | vinç halatı 4.00–, şamandıra 7.47, halat gevşer 7.67 | duck |
| 10.05–18.18 | P03 harita | aynı tema, dolgunlaşmadan | iğne 13.38; rota çizgisi 14.88–16.72 | duck |
| 18.18–23.13 | P04 şaşkınlık | A'nın F/Bb bölgesi; **21.35 KOR parıltısı** (foley yok) → **21.7–22.2 çapraz sönüm → Bb yaylı akoru 21.99** | parıltıdan 0.6 sn sonra tema B girer: "gemi güvende sandı, kıyı ağırlaştı" | duck |
| 23.13–27.10 | P05 kararlılık | yalnız yaylı yatak (Bb→**C 26.24**), gösterişsiz | dürbün halka tıkı 26.12 | duck |
| 27.10–36.23 | P06 ★ | **gerilim 3 ölçü: C 26.24 → D 30.69 → Sol minör VARIŞ 34.94**; +2 dB crescendo 26.0–34.9, 2 sn'de −2 dB bırakır | atış 30.22 · sütun 31.22 · uzak atış 31.48 · sütun 32.48 · uzak atış 33.85 · **isabet 34.85 (kelime "isabet" 34.83)**; foley vuruşu yatağın 6–8 dB üstünde, müzik sert vurmaz | duck; isabet sonrası TR 0.6 sn, EN 1.5+ sn boşluk |
| 36.23–43.45 | P07 | Sol minör, 3 ölçü (34.94–48.19; ikinci yarısı %7.7 yavaşlatıldı ki Bb tam 48.2'ye gelsin); 43.0–43.9 kaynak nefesi +3.5 dB telafili | gövde inlemesi 38.10; **alev 39.77** (ates_tutus + yangın yatağı −22) | duck |
| 43.45–49.83 | P08 ★ | Sol minör sürer; **Bb 48.19 = "Kimse" (48.2)**, seviye artmaz (konuşma altı) — minör içinde bağışlayıcı açılma | bot motoru 47.53 (klip kendi içinde uzaklaşır) | duck; "Kimse ölmedi" 48.2–49.2 |
| 49.83–52.87 | P09 | Bb yatağı, yavaş çekilir | gövde inlemesi 50.00 · kabarcık 51.67 · oturma 52.17; ortam: yangın söner (3140'a dek) | duck |
| 52.87–56.77 | P10a ★ saygı | **C 52.79** (kesmeden 0.07 sn önce); yalın yaylı, **hiç foley yok**, ortam yalnız rüzgâr + dalga | hareket yok, ışık/duruş | duck (anlatım "tek uçak gemisi" cümlesinde) |
| 56.77–61.10 | P10b döngü | **B → A' çapraz sönüm 56.45–57.05**; A' = Hopes'un bitişi (Bb 57.24 · F 57.49 · **Re minör final notası 60.39**), son 0.65 sn'de sönüm | çizgi 58.37; **iğne 59.97 = anlatım biter**; final notası 0.4 sn sonra; 60.6–61.1 (+30 kare) tam sessiz kuyruk, yalnız yankı bitişi | duck 59.97'ye kadar |

## Montaj kuralları (uygulama)
- Seviye: bölüm içinde elle zarf yok; ducking `miks.json`. Hesap (ölçüm): müzik momentary p99.5 −17.5 LUFS; db −17.5 → aralıkta tepe −17 dB; duck −23.5 → konuşmada tepe −23 dB (anlatım −18 LUFS referansı).
- İki yerel dinamik zarfı dosyaya gömülü (başka kit zarfı yok): P06 crescendo/bırakma ve 43.4 nefes telafisi. Ses bilerek 3 dB'den fazla oynamaz.
- Sessizlik = yalnız son 0.5 sn (kuyruk) ve P10a'nın foley yokluğu; müzik hiçbir yerde durmaz (tam sessizlik kullanıcı kararı yok).
- Foley seviyeleri: vuruş (top, isabet, alev) −6/−7; orta (şamandıra, gövde, bot, halka, iğne) −8…−11; ince (halat, kabarcık, çizgi, uzak atış) −11…−14.
- **Atlanan:** P04 KOR parıltısında "metal tink" (sahne-plani §12 P04: yerel 190, −12): parıltı ışık olayıdır, temas değil, 2 km'den duyulmaz → "anlamsız efekt" olur. Yerine müzikte Bb girişi (parıltıdan 0.6 sn sonra).
- **Eklenen:** P09 `govde_oturma` (3130): gövde sığ dibe oturuyor, görünür temas (temas = ses); sahne planında yoktu. Motion bu anı yerel ~140'ta tutmazsa kare güncellenir.
- Geçiş sesi: 0 (savaş/felaket; riser/whoosh yok).
- TR/EN: aynı müzik, aynı foley; EN söz boşlukları (P06 ≈4.1, P10 ≈3.2, P08 ≈2.5 sn) müziğin duck'tan çıktığı yerler, tavan −17 dB.

## Kulakla bakılacak saniyeler (kullanıcıya)
1. **0.5–1.0** — ilk piyano notası, deniz sesinden sonra mı, rahatsız etmeden mi.
2. **21.3–22.6** — parıltıdan sonra piyano → yaylıya çapraz sönüm: "atlama" ya da boşluk var mı?
3. **30.2 ve 34.85** — ilk top atışı (yakın, kalkanlı top) çok yüksek mi; **isabet** sesi sert ama müzikten yırtmıyor mu; 34.94'te akor oturması fark ediliyor mu.
4. **31.2–33.9** — su sütunları ve görünmeyen atışlar "uzak" mı duyuluyor (yakın duyuluyorsa −3 dB).
5. **39.77** — alev: tutuşma sesi + yangın yatağının girişi; yatak çok mu dolu?
6. **43.0–44.0** — müzikte nefes telafisi; P07→P08 kesmesinde müzik "gitmiyor" mu.
7. **47.5–48.6** — Bb akoru ve "Kimse ölmedi"; ikinci Sol minör parçasından Bb'ye dikiş (48.1–48.3) tık/çakışma yapıyor mu; bot motoru 47.53 ve uzaklaşması.
8. **50.0–52.4** — gövde inlemesi + kabarcık + oturma + yangın sönüşü üst üste: fazla dolu mu (fazlaysa kabarcığı çıkar).
9. **52.8–56.7** — saygı anı: C akoru, foley yok; sade ve onurlu mu, yoksa boş mu.
10. **56.3–57.2** — B→A' dönüşü: piyanonun gelişi bölümün başındaki piyano gibi tanınıyor mu.
11. **58.3–61.1** — çizgi sesi, **iğne 59.97 (anlatım bitişi)**, Re minör final notası 60.39, son 0.5 sn sessizlik; döngüde 0.7 sn'deki ilk notaya akıyor mu.
12. TR ve EN ayrı: konuşma altında müzik bütün bölümde "duyuluyor ama bastırmıyor" mu (dip ses yok); P10 EN boşluğunda (≈ 58.9–61.1) müzik kabarması −8 dB'lik "dip ses" gibi mi.

## Ölçüm özeti (render yok; yalnız dosyalar)
- Müzik: 61.10 sn, integrated −20.4 LUFS, momentary p99.5 −17.5, tepe −7.8 dBTP, kenar `ses_kenar kontrol` temiz; dalga formu (`showwavespic`) bakıldı: ani kesik/sıçrama yok, tek kaynak nefesi (43 sn) telafi edildi.
- Foley: 17 klip + 3 ortam; hepsi `ses_kenar kontrol` → temiz (yangın yatağı ilk çekimde KESIK, ikinci çekimde temiz); tepe −3.3 dBFS'e eşitli.
- Dalga formu/loudnorm birleştirmesi: kullanıcıya giden miks (teknisyen) için; bu teslimde birleştirme yok.
