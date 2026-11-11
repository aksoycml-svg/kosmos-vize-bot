# Açık kaynak repo incelemesi: bize ne alınır?

Tarih: 2026-11-11 · İnceleyen: alt ajan (yalnız okuma; dış kod çalıştırılmadı, `npm install` yapılmadı).
Klonlar: `/tmp/claude-0/-home-user-kosmos-vize-bot/130fb946-df07-5b55-8f99-3d7d0397d614/scratchpad/repo-inceleme/` (`sarpstar-cinecode`, `feitangyuan-onetake`, `zakariaf-cinecode`, `hsynozdamar-byte-cinecode-studio`).
Yıldız sayıları alınamadı: GitHub API bu oturuma kapalı. Son commit tarihleri klondan alındı.

---

## 0. Tek bakışta

| Repo | Ne | Teknoloji | Lisans | Son commit | Bize değeri |
|---|---|---|---|---|---|
| **sarpstar/cinecode** | Claude Code skill'i: fikirden MP4'e kısa film, reklam, müzik videosu. Hızlı ve Film modu, onay kapıları | Remotion değil, HyperFrames değil: **tek HTML + canvas/three.js**, Chrome ile kare kare yakalama (`capture.mjs`), Python stdlib + ffmpeg araçları | **MIT** (kod alınabilir, telif satırı korunur) | 2026-11-03 | **Çok yüksek**: yazım kuralları, TTS'i ham bırakmama, ses miksi, QC betikleri, kota disiplini |
| **feitangyuan/onetake** | Ürün tanıtım filmleri. Her vuruş bir öncekinden "büyür". Tek kesintisiz kamera | Remotion değil: **tek HTML, `__seek(t)` saf fonksiyon**, `lib/motion.js` hareket kütüphanesi, Playwright ile render, gerçek obtüratör bulanıklığı | **PolyForm Noncommercial 1.0.0**: ticari kullanım yasak (Pro lisans 79 $) | 2026-11-04 | **Yüksek, ama yalnız fikir**: "taşıma" (carry) kavramı, ritim ölçümü, dil başına zaman bükme |
| **zakariaf/cinecode** | Claude Code eklentisi: JSON storyboard'dan çizgi film. 14 rig, 8 set kiti, lint, ses QA | Node + `@napi-rs/canvas`, kendi motoru; Gemini TTS | **MIT** | 2026-11-10 | **Yüksek**: mimarisi bizim `kit + bolum.json` modelimizin ikizi; lint kuralları ve TTS doğrulama döngüsü |
| **hsynozdamar-byte/cinecode-studio** | sarpstar/cinecode için masaüstü panel (yerel Node sunucu, `claude -p`) + HyperFrames ile düzenleme | Node sunucu + tek HTML panel | MIT | 2026-11-08 | **Düşük**: yalnız "senaryoda her sahne kendi saniyesine sığıyor mu" göstergesi fikri |

**Ana sonuç:** Kod olarak doğrudan alınacak az şey var, çünkü üçünün de motoru bizim Remotion `Bolum` yapımızla uyuşmuyor. Değerli olan **kurallar, ölçümler ve iş akışı disiplini**. Bunlar sorunlarımızın dördüne de doğrudan cevap veriyor: hikâye, AI gibi duran ses, tempo, kota.

---

## 1. sarpstar/cinecode (MIT)

**Ne yapıyor:** Kullanıcıyla birlikte film yapan bir skill. `SKILL.md` (168 satır) çekirdek kurallar, 25 referans belgesi (`references/`), 60 stil kartı (`styles/`), 40 araç betiği (`scripts/`). İki mod var: Hızlı (tek HTML, yaklaşık 3 onay) ve Film (6 kapı: röportaj → yol haritası → senaryo → stil karesi → animatik → taslak). Türk yazar, TR ve EN tetikleyiciler ve Türkçe örnekler var.

**Teknoloji:** HTML canvas ya da three.js. `capture.mjs` Chrome'da kare kare yakalıyor. Sesin hepsi ffmpeg + Python stdlib. TTS olarak Gemini (varsayılan), ElevenLabs ve EMA Lightning (ücretsiz, çevrimdışı Türkçe, Apache 2.0) kullanılıyor.

**Kalite:** Çok olgun. 3 test dosyası (`tests/test_context.py` 266 KB) ve CI var. `guard.py` (103 KB) hook'larla kuralları zorluyor: tire yasağı, büyük görsel reddi, bağlam boyutu uyarısı. `docs/media/reel.gif` kareleri çeşitli ve profesyonel; 9:16 kinetik tipografi örnekleri de var. Belgeler yoğun ama bölüm bölüm okunacak şekilde yazılmış.

**İş akışı / ajan kuralları (bize en yakın kısımlar):**
- `references/writer-prompt.md`: 12 adımlı yazar istemi. 10 açı yaz, ilk 3'ü at, "önce son"u yaz, %30 kes, soğuk izleyici testi yap.
- `references/writing.md` §2 tek dönüş (Önce/Sonra), §4 göster-anlatma ("altyazı testi"), §5 kelime bütçesi, §6 TR+EN klişe ve "AI gibi duran" ifade listesi, §8 soğuk izleyici, §14 "soru zinciri", §15 tempo haritası ve anahtar anlar, §16 her iddianın kaynağı.
- `references/sound.md` §0 (20 ana ilke), §4b **"anlatım asla ham TTS değildir"**, §5 geçiş sesleri ve "accent" bütçesi, §6 miks/master tablosu.
- `references/jury.md`: 2–3 dakikalık, 6 soruluk tek tur eleştiri.
- `SKILL.md` "Small context": kota disiplini.

## 2. feitangyuan/onetake (PolyForm Noncommercial)

**Ne yapıyor:** 10–30 sn ürün filmleri (anlatımlı demo en çok ~60 sn). İddia: AI ile yapılan hareketli videolar slayt gösterisi gibi duruyor, çünkü sahneler birbirinin **yerine geçiyor**. Onetake her sahne sınırını tasarlanacak şey sayıyor: ekranda bir şey sınırı **geçip bir sonraki vuruşa dönüşüyor** (prompt çubuğu pencereye açılıyor, çizgi bir sonraki ızgaranın ilk çizgisi oluyor).

**Teknoloji:** Tek HTML kompozisyon, `window.__seek(t)`. `lib/motion.js` içinde 39 ölçülmüş hareket var (yay, giriş, taşıma, temas, kamera). `render.py` her hareketli kareyi 180° obtüratörle birkaç yakalamanın ortalaması olarak işliyor; taslaklar 1080p30, final 4K60. TTS Kokoro (yerel, EN/JA).

**Kalite:** Yüksek. 11 örnek filmin her biri README'de, reddedilen kurgular ve nedenleriyle anlatılıyor; bu, belgelerin en değerli kısmı. `gallery/sheets/*.png` her hareketin 6 karesini ve hız grafiğini gösteriyor (`camera.png` incelendi: temiz, ölçülü). `clearing` filmi kontak sayfasında incelendi: 1×'ten 300×'e tek çekim zoom, gerçekten kesintisiz. Görsel dil düz ve ürün odaklı; bizimkine benzemiyor.

**İş akışı kuralları:**
- `SKILL.md` §2: önce **3 merkezî görsel fikir** (bir öğe her şeye dönüşür / ölçek boyunca tek kamera hareketi / zincirleme tepki), kullanıcı seçer.
- §3 ve `references/rhythm.md`: beat sheet sütunları `t · vuruş · ne hareket eder · ne durur · sonrakine ne taşınır`.
- §8 `verify_promo.py` kahini: plan uzunluklarının değişim katsayısı ≥0.25, karelerin ≥%25'i tam durgun, ≥1 sn sessiz bölüm, taşıma skoru ≥0.5 (<0.7 uyarı), 80 px/kare üstü hareketle bulanıklık yoksa ret, `inFrame` ile ana öğenin kadrajdan çıkmadığının denetimi.
- `references/product-demo.md` §5 "Timing another language": **dil başına zaman bükme** (`timeWarp` düğümleri, anlamca eşleşen kelimelere bağlanıyor; eğim 0.5–1.4 arasında tutuluyor).

**Lisans:** `LICENSE` PolyForm Noncommercial 1.0.0 ve "Required Notice: … free for noncommercial use only". Kanalımız para kazanmaya yönelik ve ElevenLabs'te ticari plan gerekiyor, bu yüzden **kod, metin ve fontlar dışında hiçbir parça alınamaz**. Fikirler ve yöntemler telifle korunmaz; bunlar **kendi kelimelerimizle ve kendi kodumuzla** uyarlanabilir. `motion.js`, `probe.py`, `verify_promo.py` kopyalanmaz, bakılarak yeniden yazılmaz da. Kendi tanımımızla sıfırdan yazılır. (`looks/fonts/` OFL lisanslı, o ayrı; zaten ihtiyacımız yok.)

## 3. zakariaf/cinecode (MIT), kısa bakış

**Ne yapıyor:** `film.json` storyboard'dan çizgi film üretiyor. 14 rig (insan, tilki, kaplumbağa…), 8 boyalı set kiti (anchor'lar, yürünebilir bölgeler, gün saatleri), kamera ölçekleri, dudak senkronu, prosedürel müzik, 39 sentez efekt. Demo: 15 dakikalık "Our Solar System" (36 ajan, yaklaşık 6 saat). `docs/images/reunion.jpg` incelendi: mürekkep konturlu, cel gölgeli, kaliteli.

**Bizimle ilişkisi:** Mimarisi bizim "set kiti" kararımızın neredeyse aynısı: rig + kit + JSON + `check` + kontak sayfası + lint. Farkları:
- **`lint` (16 kural, `docs/lint.md`, `docs/images/lint.jpg`):** `floating` (ayak havada), `inside-solid`, `collision`, `offscreen-speaker`, `subject-size` (çekim ölçeğine göre konu yüksekliği aralığı: wide %9–24, full %30–81, close %35–95), `edge-cut`, `tangent`, `caption-face`, `cut-jump` (ard arda neredeyse aynı kadraj), `continuity` (kesmede poz/yer değişimi), `axis` (180° kuralı), `teleport`, `scale`, `timing`. Her çerçeveleme hatası için **denenmiş bir düzeltme öneriyor**; bilerek tutulan uyarı `lint.allow + note` ile planda belgeleniyor.
- **Ses QA (`docs/sound.md` "QA", `.claude/skills/cinecode/references/voices.md`):** her çekim yeniden yazıya dökülüyor. WER ≤0.2 ve satır başında eklenmiş kelime yoksa geçiyor; en çok 3 çekim yapılıyor; içerik hash'iyle önbellek tutuluyor. "Ton kelimeleri yüksek sesle okunuyor" tuzağı belgelenmiş.
- **Paralel eleştirmen "lensleri"** (`SKILL.md` "Big films"): her biri tek açıdan bakıyor (sahneleme/süreklilik, kamera, oyunculuk, ışık, yazı/zaman, hikâye, ses) ve `plan | sorun | düzeltme | şiddet` raporluyor. `film.json`'u yalnız **tek düzeltici** düzenliyor.
- **Genel bakış:** animatikten 32 kare `tile=8x4` ile tek sayfaya çıkarılıyor; yolculuk, ışık ve ekran yönü bir bakışta okunuyor.

## 4. hsynozdamar-byte/cinecode-studio (MIT), kısa bakış

sarpstar/cinecode'u `claude -p` ile süren yerel bir panel (Node sunucu `localhost:4910`, tek `index.html`). Örnek "Kâğıt Gemi" 15 sn, 17 dakikada yapılmış; kareleri incelendi, iyi bir 3D taslak. Bize tek fikir veriyor: senaryo ekranında **her sahnenin kelimesi saniyesine sığıyor mu** göstergesi ve "sahneyi uzunluğa sığdır" düğmesi. Paneli kullanmayız: Premiere iş akışımız ve ajan ekibimiz var.

---

## 5. BİZE ALINACAKLAR (değere göre sıralı)

Her maddede **nereden** (kaynak), **nereye** (bizde dosya veya bölüm) ve **kim** (sahibi olan ajan) yazıyor. Lisans: S = sarpstar MIT, Z = zakariaf MIT (kod alınabilir, telif satırı korunur), O = onetake (yalnız fikir).

### A. Hikâye ve senaryo ("hikâye anlatmıyor, akılda kalmıyor")

1. **Tek dönüş, "Önce / Sonra" satırı** (S `writing.md` §2). Senarist senaryonun en üstüne `Önce: … / Sonra: …` yazar; dönüş türünü seçer (tersine dönüş, ifşa, dönüşüm, eşik, ayna, karşıtlık). Süreç listesi yazmanın panzehiri: her plan bu dönüşe hizmet etmezse çıkar. → `.claude/agents/senarist.md` + CLAUDE.md "Senaryo ve yazı". *Sahibi: senarist.*
2. **"Önce son" ve kurulumun ilk üçte birde yapılması** (S §3, §15). Son cümle ya da imge ilk yazılır. Sonun gerektirdiği her nesne, kural ve sayı ilk üçte birde kurulur. Mevcut "Kurulum → Karşılık" tablomuzu güçlendirir. *senarist.*
3. **Soru zinciri, "soru sorma, bir şeyi sakla" biçimiyle** (S §14 "The chain of questions"). 30–60 sn anlatı için her 15–20 sn bir halka. Soru retorik soruyla değil, **görüntüde yarım bırakılan bir şeyle** açılır: kadraj keser, çizim yarıda durur, sayı donar. Bizim "açık soru → cevap → yeni soru" kuralımızın uygulanabilir hâli bu; yönetmenin `bolum.json`'da bir "saklanan şey" parametresi olur. *senarist + yönetmen.*
4. **Altyazı testi / göster-anlatma** (S §4). Anlatım ekranda görüleni anlatırsa satır çıkar ya da tersine çevrilir; anlatım resmin veremediğini verir (neden, geçmiş, sayı, kural). Bizde ekran yazısı için "tamamlar, tekrar etmez" kuralı var; **aynı test anlatıma da** uygulanmalı. *senarist.*
5. **Beş satırlık hikâye omurgası** (S §14, `writer-prompt.md` 4a): durum · istek · engel · değişim · sonuç. Araştırmacının olay dosyasından senaryoya geçerken önce bu beş satır yazılır, kullanıcı onayına senaryoyla birlikte gider. *senarist.*
6. **%30 kes + sesli okuyup zamanla** (S §7). Bizim senarist 60 sn için 140–160 kelime hedefliyor (`senarist.md`). Sarpstar sinematik film için 60 sn'de ≤80 kelime, anlatıcılı belgesel için 110–140 kelime/dk öneriyor. **Öneri:** 60 sn ≈ 115–130 kelime, aradaki boşluk **yazılmış duraklama** olarak (anahtar satırdan sonra 1–1.5 sn, en büyük andan önce 1–3 sn). Tempo ve TTS sorununu birlikte hafifletir. *Karar kullanıcının.*
7. **"AI gibi duran" ifade listesi + betik** (S `writing.md` §6, `scripts/words_check.py`, MIT). TR kök eşleşmeli liste: "adeta", "fısıld-", "X değil, Y", "işte tam da", "peki ya…?", üçlü soyut liste, **tire yasağı** (em/en dash). Bizdeki slogan yasağının ("O tek kişi: X.") otomatik denetimi olur. → `tools/kelime_kontrol.py` (desen listesi MIT telifiyle uyarlanır), teknisyen her senaryo teslimde çalıştırır. *teknisyen; listeyi senarist genişletir.*
8. **Tahmin testi** (S §1 "prediction test"). Taze bir yardımcı (haiku), yalnız konu cümlesini görerek "herkesin bekleyeceği 5 film"i yazar; senarist bunlarla örtüşen açıyı eler. Ucuzdur, "basit" bulunan senaryoların panzehiridir. Günlük modelde isteğe bağlı. *orkestra.*
9. **Anahtar anlar, bölüm başına 2–4** (S §15). Anahtar anın ekran süresi okuma süresi + 1.5 sn olur; kendi ses anı vardır (yatak çekilir, tek alçak vuruş, kuyruk); çevresindeki her şey geri çekilir. Bunlar `bolum.json`'da `anahtar: true` ile işaretlenir. Bizim "dokunuş" kavramımızın anlatı tarafındaki karşılığı. *senarist işaretler, yönetmen uygular.*
10. **İddia tablosu** (S §16): `iddia · kaynak · doğrulandı/doğrulanmadı`. `arastirma.md`'de zaten benzeri var. Senaryodaki **her cümleyi** bir satıra bağlamak "tek kaynaklı bilgiyi kesin söyleme" kuralını denetlenebilir yapar. *araştırmacı + senarist.*

### B. TTS'i doğal okutma ("çok AI duruyor")

Bizdeki durum: `tools/paris_ses_v5.py` eleven_v3, stability 0.5, style 0.5, speed 1.1, **her cümlede satır içi etiket + BÜYÜK HARF vurgu** ile çalışıyor; `paris_ses_dogal.py` ise etiketsiz v3 ve multilingual_v2 (+ previous/next_text) karşılaştırması yapıyor.

1. **Ham TTS hiç yayınlanmaz, her bölümün ses işlemesi olur** (S `sound.md` §4b, `scripts/voice_treat.py` MIT). Temizlik zinciri her satıra uygulanır: `highpass=80, deesser, 300 Hz −2 dB, 3.2 kHz +2 dB, acompressor 2.5:1`. Ardından "ortam" (medium) ve "mekân" (space) seçilir; bizim için **yakın + küçük oda** ya da bir dönem dokusu. İsteğe bağlı "imprint": sesin, filmin imza sesinin kısa bir dilimiyle %15–35 konvolüsyonu (ör. Chappe kolunun tıkırtısı). Hedef her satırın aynı diyalog seviyesine inmesi (−20 LUFS). → `tools/ses_isle.py` (ffmpeg zinciri MIT'ten uyarlanır). "AI tınısını" en ucuz kıran adım budur. *kurgucu.*
2. **Vurguyu BÜYÜK HARF ve etiketle değil, metinle ve noktalamayla vermek** (S §0.4, Z `voices.md` "Tone"). Zakariaf'ın deneyimi: ton kelimeleri ve uzun etiket listeleri **sesli okunuyor**; isim ve sahne yönergesi çıktıya karışıyor; 2–3 kısa sıfat yeterli, satırın kendi tonu en sonda. Sarpstar'a göre ise **satır sonlarının hepsi aynı düşüşle bitmesi** en yorucu şey: satırlar soru, açık bırakılmış cümle ve nefes olarak çeşitlenmeli. **Öneri:** v5'teki BÜYÜK HARF vurguyu kaldır. Vurgu kelimesini cümle sonuna taşı (Türkçede doğal vurgu yüklemden hemen önceki öğede). Kısa cümle + virgül + nokta kullan. v3'te en çok bir etiket, yalnız gereken satırda. *senarist (metin) + kurgucu (üretim).*
3. **Tek parça okuma, sonra bölme.** Plan plan üretim her satırı "yeni paragraf" gibi okutuyor; tonlama her planda sıfırlanıyor. Bütün anlatım tek istekte okutulup zaman damgalarıyla (ElevenLabs `with-timestamps` hizalama uç noktası; bizim `.json` kelime zamanlarımız zaten var) plan sınırlarından kesilir. Plan plan gerekiyorsa `previous_text/next_text` hep verilir (`paris_ses_dogal.py` C seçeneği). *kurgucu.* (Not: ElevenLabs uç noktası ve parametre adları bu incelemede repo dışından, bilgime dayanarak yazıldı; kullanmadan önce güncel belgeye bakılmalı.)
4. **Ses seçimi kulakla ve kullanıcıyla** (S `SKILL.md` "The voice is the user's pick", `tts.py --audition`). Aynı satırı okuyan 2–3 aday ayrı kısa dosyalar olarak gönderilir; birleştirilmiş derleme gönderilmez. Kullanıcı seçer, ajan seçmez. Bizde bu zaten kısmen var (`evliya_ses_aday_tr.py`); kural olarak yazılmalı.
5. **Çekim doğrulama döngüsü** (Z `docs/sound.md` QA, MIT). Her çekim yazıya dökülür ve metinle karşılaştırılır. WER ≤0.2 olmalı ve başta eklenmiş "Hı, Şey" olmamalı; en çok 3 çekim yapılır, en iyisi tutulur; içerik hash'li önbellek tutulur (metin, ses ya da ayar değişmedikçe yeniden üretilmez, **kota ve para tasarrufu**). Bizdeki `ses_kenar.py` (CIT/KESIK) ile birleşir. STT için ElevenLabs Scribe ya da yerel whisper kullanılabilir; whisper kurulumu kullanıcı onayı ister. Ayrıca çekim içindeki ≥0.35 sn duraklamalar ve tahmini süreye göre 2× uzayan çekimler işaretlenir. *teknisyen.*
6. **İnsan sesi seçenekleri (en doğal yol):**
   - **a) Konuşmadan konuşmaya (ElevenLabs Voice Changer / STS):** kullanıcı ya da bir anlatıcı telefona prozodiyi doğru okur, model sesi kanal sesine çevirir. Vurgu ve tempo insandan gelir. Starter planda var (bilgime göre; doğrulanmalı). **Bence en yüksek getirili deneme bu.**
   - **b) Doğrudan insan kaydı:** kullanıcı veya ücretli seslendirmen (TR). Sarpstar da "kullanıcının telefon kaydı"nı geçici ses olarak öneriyor (`writing.md` §9).
   - **c) EMA Lightning** (S `tts.py`; Apache 2.0, ücretsiz, çevrimdışı TR): kalite bilinmiyor, 800 MB kurulum gerektiriyor, yalnız TR. Bütçe sıfırlanmak istenirse denenebilir.
7. **Gemini TTS'i bir aday olarak denemek** (S `tts.py`, Z `voice.mjs`). Tonu düz cümleyle yönetiliyor ("sıcak, meraklı, yavaş"). Z'nin 30 ses kataloğu ve ses kişilikleri var (ör. `Sulafat` "doğal hikâyeci", `Charon` "belgesel"). Bölüm başına ≤1 $ bütçesine sığabilir, ancak TR kalitesi denenmeden bilinmez. Bunu tek satırlık seçme dinletisi olarak yaparız; kanalın sesi kullanıcının onayı olmadan değişmez.

### C. Tempo, kamera ve geçiş dili ("tek kesintisiz kamera" uyarlaması)

Bizdeki durum: `src/kit/tipler.ts` içinde `Gecis` yalnız `{tur:"whip"}`. `Bolum.tsx` plan içi sert kesmeyi (`devam_plan`, K5) destekliyor. Planlar birbirinin **yerine geçiyor**; onetake'in "slayt" teşhisi bize de uyuyor ("süreç listesi" hissinin görsel tarafı).

1. **Her plan sınırına "taşıyıcı" yazılır** (O `rhythm.md` "Carry", fikir). Yönetmen her geçiş için `tasiyici` alanını doldurur: sınırı geçen ve bir sonraki plana dönüşen öğe, ya da `"yok"` + gerekçe. Doğrulayıcı (`tools/bolum_dogrula.mjs`) taşıyıcısız sınırları sayar; 10 plandan en çok 3'ü çıplak kesme olabilir (sayı kalibre edilir). Bu, bizim **zincir senaryo kuralının görüntü karşılığı**. *yönetmen; doğrulayıcıya motion/teknisyen ekler.*
2. **Yeni geçiş türleri** (`Gecis` tipine; kod bizim, fikir O + S `camera-moves.md`):
   - `icinden` (zoom-through): kamera ekranda zaten bakılan bir öğenin (pencere, mektup, harita pimi, mühür) içinden geçer ve o öğe yeni planın dekoru olur. Bizim için en değerli tür: harita → şehir, mektup → oda, pencere → iç mekân.
   - `buyume` (iris / grow-out): yeni plan önceki plandaki bir noktadan açılır (fener ışığı, mühür, göz). Dönem gravürü ve kukla tiyatrosu diliyle çok uyumlu ("sahne perdesi açılıyor").
   - `eslesme` (match cut): şekil, hareket ya da renk kesmenin üstünden taşınır (dönen tekerlek → saat kadranı). 0 kare kesme + 0.3–0.6 sn yerleşme.
   - `l_kesme / j_kesme`: ses bir sonraki plana önden başlar ya da geriden taşar. Kod değil, miks verisi; bizim "müzik akar" kuralımızı güçlendirir.
   - Kural: aynı tasarlanmış geçiş üst üste iki kez kullanılmaz; düz kesme varsayılandır (S `camera-moves.md` "Vary them").
3. **"Tek kamera" = aynı mekânda planlar arası kamera sürekliliği.** Aynı mekân şablonundaki ardışık planlarda yeni plan sıfır kameradan başlamaz, **önceki planın son kamera durumundan** devam eder; sınır bir kamera anahtar karesi olur. `bolum.json`'da `kamera.devam: true` alanı olur, `Bolum` önceki planın son kamera değerini başlangıç alır. Mekân değişince `icinden`/`buyume` ile geçilir. 30–65 sn'lik bölümde 2–4 mekân var, yani en çok 2–3 gerçek "kesme" olur. Gerisi akan tek kamera. **Uyarı:** onetake de 1 dakikayı aşan tek hamlenin nadiren dayandığını yazıyor; birleşimler hareketin içine gizlenmeli (S `camera-moves.md` "One continuous shot"). *Kurulum işi: motion (opus) bir kez; sonra günlük bölümde yalnız json.*
4. **Operatör hissi, ama durgun anlar gerçekten durgun** (O `composition.md` "A camera", fikir). Kamera konuyu 0.1 sn geriden izler (sineInOut) ya da varış noktasına önden "yakalar" (expoInOut). Hareketli planlarda çok hafif bir el sallantısı olur, **beklemelerde sıfır**. İniş anlarında küçük bir sarsıntı (bizim temas = ses karesiyle aynı). `kameraDili.tsx`'e parametre olarak eklenir. *motion.*
5. **Ritim ölçümü, doğrulayıcıya eklenecek** (O `rhythm.md`, S `craft.md` §3 + `validate_shots.py`):
   - plan uzunluklarının değişim katsayısı ≥0.25 (bizde 8–14 plan var, metronom riski yüksek);
   - üst üste 5 benzer uzunlukta plan yok;
   - plan başına tempo etiketi `hizli / nefes / bekle`, üst üste üç aynısı yok (S `writing.md` §15);
   - bölümde en az bir ≥1 sn "dinlenme" (resim ve ses birlikte sakin) ve en az bir "patlama".
   Hepsi `bolum.json` üzerinden **render'sız** ölçülür, maliyeti sıfır. *teknisyen/motion doğrulayıcıya ekler.*
6. **"Ses ve resim sırayla konuşur"** (S §15). Ses dinlenirken resim taşır (olay, ifşa); resim beklerken bir satır taşır. İkisinin birlikte dinlendiği bölge, işaretli bir "bekle" değilse ölü bölgedir. Doğrulayıcı anlatım `.json` kelime zamanlarıyla plan hareket aralıklarını karşılaştırıp ölü bölgeleri raporlayabilir.
7. **Kanca ilk kareden hareket eder** (S `craft.md` §2, `qc.py hook`): 0–2 sn hareket enerjisi ölçülür; durgun başlık ya da siyahtan açılma başarısız sayılır. Bizim 3 katmanlı kanca kuralına ölçüm eklenir.

### D. Ses ve müzik miksi

1. **Konuşma sırasında ses 8–10 dB üstte; ördekleme yoğunluğa göre** (S `sound.md` §0.1–2). Kısa satırda derin ördekleme, konuşma ağırlıklı bölümde sığ (~6 dB) ya da yalnız 1–4 kHz oyulur. Bizim "müzik −18 dB" sabitimizden daha iyi; müziğin dakikalarca gömülmesini önler. *kurgucu.*
2. **Vuruşlar bölümün en yüksek yatağının 6–8 dB üstünde, 15 değil** (S §0.10). Kullanıcı "foley yüksek" diyor; bu sayı bunu sistemleştirir. Küçük sesler (tık, dokunma) müzik tepelerinin 10–15 dB altında kalır (S §5).
3. **Tek oda** (S §2.8, O `sound.md` "The room"): tüm foley tek bir paylaşılan yankı uzayına gönderilir, gönderim miktarı uzaklığa göre değişir. Farklı kaynaklardan gelen sesleri "aynı film" yapan şey budur.
4. **Darbe katmanları ve "tepeyi hizala, başlangıcı değil"** (S §2.10, §5). Bizim kuralımızla aynı ("tepe noktasını ölç"). Ek olarak katmanlar: geçici · gövde · oda · kuyruk · sub. Her temas için hangi katmanların kullanılacağı listeye yazılır.
5. **Resim olayı denetimi** (S §5 "picture-event audit"): `olay sayısı · seslendirilen · bilerek sessiz` raporu. Bizdeki `--temas` listesi var; rapora **kapsam yüzdesi** eklenir.
6. **Sahne başına loudness ve sertlik ölçümü** (S `qc.py sceneloud` / `scene_check.py sound`, MIT). Her plan için LUFS ve 2–5 kHz payı ölçülür; medyandan 3 LU ya da 3 dB sapan plan işaretlenir. Bütün film −14 LUFS'ta olsa bile tek bir bağıran planı yakalar. → `tools/plan_ses_olc.py` (ffmpeg ebur128; MIT'ten uyarlanabilir). *teknisyen.*
7. **Geçiş sesi bütçesi** (S §5): 30 sn'de en çok 2 whoosh ve whoosh "hava değil, alçak bir kabarma" olur; tasarlanmış ses kesmelerin en çok %70'inde. Aynı geçiş sesi üst üste kullanılmaz. Ciddi ya da acılı konularda (savaş, ölüm; ör. Paris kuşatması) gösteri sesi (riser, whoosh) kullanılmaz (§0.19).
8. **Dil başına loudness eşitleme** (O `product-demo.md` §5): daha yoğun konuşan dilin miksi 5 LU yüksek çıkmıştı. Son adımda her dilin integrated loudness'ı kaynak miksle eşitlenir. Bizim TR/EN için doğrudan geçerli.
9. **Kullanıcıya dinleme notu** (S §6.6): sesi duyamıyoruz, ölçüyoruz. Her teslimde kulaklık + telefon hoparlörü ile dinlenecek **saniyeler** listelenir.

### E. Kalite kontrol (betik önce)

1. **Lint kuralları (Z `docs/lint.md`)**, bizim doğrulayıcıya ve kontrol betiğine eklenecek olanlar: `subject-size` (çekim ölçeğine göre konu yüksekliği aralığı; bizim "≥%10 / ≥%12 yüz" kuralımızın sistematik hâli), `cut-jump` (ard arda neredeyse aynı kadraj; zoom oranı ≥1.2 ya da açı değişmeli), `continuity` (kesmede poz/yer değişimi görülmeden olmaz), `axis` (180°), `teleport` (kareler arası >40 birim sıçrama), `caption-face` (yazı yüz/temas/dokunuş üstünde; bizim "yazı dokunuşa binmez" kuralımız), `edge-cut` ve `tangent` (kenara değen kontur). Ayrıca **bilerek tutulan uyarı planın içinde `lint: {izin:[…], not:"…"}` ile belgelenir**, böylece eleştirmen aynı şeyi yeniden tartışmaz. *motion (kit tarafında kutu/temas verisi) + teknisyen.*
2. **Debug bindirmesi** (Z `review.md`): kontrol karesinde aktör kutuları, kafa kutuları, temas noktaları (yeşil zemin, turuncu havada), yazı kutusu ve kamera merkezi çizilir. Eleştirmenin göz yükünü azaltır; "ayak teması" ve "yazı bandı" görsel olarak hemen okunur.
3. **Hareket şeridi** (Z `sheet --shots=3.3@0.1,…`; S `qc.py strip`). Orta kare hareketi gizler: yürüme, giriş, kamera hareketi, jest olan planlar için 4–6 karelik şerit çıkarılır. Bizim "ilk + kontrol + son kare" protokolüne eklenir; özellikle "hareket tamamlanır" kuralı için.
4. **Tek sayfa genel bakış** (Z `SKILL.md` §7): taslak videodan 32 kare `fps=32/d,scale=320:-1,tile=8x4`. Işık, ekran yönü ve renk akışı bir bakışta görülür. Bir ffmpeg satırı, maliyeti yok.
5. **Render sonrası otomatik testler** (S `qc.py`, MIT; yalnız ffmpeg): `hook` (0–2 sn hareket), `black`, `freeze` (≥1.5 sn donma), `pops` (tek karelik parlama), `dup`, `repeats` (≥6 sn sonra aynı resim), `cuts`, `loud`, `spec`. → `tools/qc.py` olarak uyarlanır (MIT telifi korunur). Teknisyenin render sonrası tek komutu olur.
6. **Kadrajda kalmalı listesi** (O `__meta.inFrame` fikri): `bolum.json`'da plan başına "kadrajdan çıkmaması gereken" öğeler (imza nesnesi, konuşan yüz) ve "tam görünmesi gereken" öğeler yazılır. Kit, öğe kutusunu dışa verir; betik her N karede denetler. Bizim "Instagram arayüzü altında kalmaz" kuralının ölçümü olur.
7. **Jüri: 6 soru, tek tur** (S `jury.md`). Bizim eleştirmenin günlük formatı için ideal: kanca · kahraman an · jenerik kare · en zayıf 5 sn · üç büyük kesmenin sesi · AI gibi duran kelime. Her cevap zaman kodu + tek cümle; ardından **en çok 3 düzeltme**, rakamla; ölçekli tek puan (5 öğrenci … 9 ödül adayı). → `.claude/agents/elestirmen.md`'ye "günlük mod" olarak. *elestirmen.*
8. **Lensli paralel eleştirmen yalnız kurulumda** (Z "Big films"). Yeni şablon kalibrasyonunda tek açılı (sahneleme, kamera, ışık, yazı, ses) sonnet eleştirmenler, **tek düzeltici**. Günlük bölümde değil.

### F. Maliyet ve tur azaltma (kota)

1. **Ölç, tahmin etme** (S `SKILL.md` "Small context", `scripts/usage.py`). Bir bölümün maliyetini konuşma boyutu belirler, model değil. Her bölümün token kullanımı `katki-raporu.md`'ye yazılır; %3–5 hedefinin gerçekten tutup tutmadığını görürüz.
2. **Bir render adımı = bir komut, günlük sohbete değil dosyaya** (S): `tools/yap.sh kontrol|taslak|final`. Log `logs/`a yazılır, yalnız son satırları okunur. Ajanlar ffmpeg/remotion zincirini elle kurmaz.
3. **Düzenle, yeniden yazma; belgeleri bölüm bölüm oku** (S): CLAUDE.md ve KATALOG.md `^## ` ile bulunup yalnız ilgili bölüm okunur. Ajan briflerine "dosyayı bütün okuma" yazılır.
4. **Önce kontak sayfası, sonra render** (S, Z, O hepsi). Bizde var. Ek kural: tam boy hareketli video **kullanıcı taslak onayından önce yok**; taslak yarım boy (S), ya da Z gibi 12 fps animatik.
5. **İçerik hash'li ses önbelleği** (Z): metin, ses ve ayar değişmedikçe yeniden üretilmez. Hem ElevenLabs kredisini hem ajan turunu korur.
6. **Övülen kilitlenir** (S `SKILL.md` "What the user praised is locked"). Kullanıcının beğendiği plan ya da satır düzeltme turlarında **dokunulmaz** diye `bolum.json`'da `kilit: true` ile işaretlenir. Revizyon zincirinin bir kaynağını keser.
7. **Notlar kelimesi kelimesine kaydedilir, tur başına tek paket** (S Film modu). Kullanıcı notları `bolumler/<slug>/notlar/tur-N.md`'ye aynen yazılır; düzeltme bu dosyadan yapılır. Sözlü aktarımda kayıp ve "yeniden sorma" turu olmaz.
8. **Kusur önce teşhis, sonra yeniden yapım** (S `film-mode.md`). Eleştirmen "neden" der (hangi parametre), orkestra yalnız o parametreyi değiştirtir; tüm planı yeniden kurdurmaz.
9. **Kontrol uyarısını yazmak, susturmak değil** (Z `lint.allow`). Aynı uyarı her turda yeniden tartışılmaz.
10. **Ucuz kontrol betikte, pahalı göz ajanda** (hepsi). Bizim "denetim önce betik" kuralımızla aynı; yukarıdaki A7, C5, D6, E1, E5 maddeleri betiğe geçince eleştirmen turu kısalır.

---

## 6. ALINMAYACAKLAR (gerekçeli)

| Ne | Neden |
|---|---|
| sarpstar ya da onetake **motoru** (HTML/canvas/three.js yakalama, `capture.mjs`, `render.py`) | Bizim Remotion 4 + rig + kit yatırımımızın yerini almaz; çift motor bakım yükü getirir. Premiere paketi ve şeffaf yazı katmanı akışımız Remotion'a bağlı. |
| onetake'in **herhangi bir kodu, metni, örnek filmi** | PolyForm Noncommercial: kanal ticari. Yalnız fikirler alınır, kendi tanımımızla sıfırdan yazılır. |
| onetake **gerçek obtüratör bulanıklığı** (kare başına 4–48 yakalama) | Bizim kukla tiyatrosu ve gravür dilimiz yavaş, okunur hareket istiyor; 80 px/kare'yi aşan hareket zaten nadir. Render maliyetini katlar. Gerekirse yalnız whip planında Remotion `<CameraMotionBlur>` düşünülür. |
| onetake 4K60 final | Bizde 60 fps animasyon var; 4K yalnız "hareketli tuval" gereken planlarda (mevcut kural). |
| zakariaf **rig ve set kitleri** | Görsel dili (orman hayvanları, cel gölgeli storybook) bizim 1830'lar gravür ve kukla diline uymuyor; dönem doğruluğu yok. Lint *kuralları* alınır, kod alınmaz. |
| zakariaf **prosedürel müzik** | Bizim kuralımız kamu malı klasik (Chopin vb.) ve Incompetech/Pixabay. Prosedürel skor "şablon" gibi durur. |
| sarpstar **guard.py hook sistemi** (103 KB, PreToolUse/Stop hook) | Güçlü ama ağır ve başkasının kuralları için yazılmış. Dış kodu hook olarak çalıştırmak güvenlik riski taşır. Yalnız fikir: ileride kendi küçük hook'umuz olabilir (ör. bolum.json yazıldığında doğrulayıcıyı otomatik çalıştırmak). Kullanıcı isterse `update-config` ile. |
| sarpstar **60 stil kartı** ve "spark/seed" desteleri | Kanalın tek, sabit bir görsel kimliği var. Yalnız `styles/engraving.md`, `shadow-puppet.md`, `silent-film.md`, `paper-popup.md` **mekân sorumlusu ve tasarımcı için okuma referansı** olabilir (MIT; ör. engraving'deki "ton çizgiyle yapılır, dolguyla değil", "çizgi şişer ve incelir", "renk sonradan, el boyası" ilkeleri bizim gravür kurallarımızla uyumlu). |
| cinecode-studio paneli, HyperFrames düzenleme | Kurguyu kullanıcı Premiere'de bitiriyor. Panel ek bir arayüz katmanı getirir; değeri düşük. |
| Gemini görsel / video üreticileri | Zaten bütçe kuralı var. sarpstar da "yalnız kullanıcı isterse, son çare" diyor; aynı çizgi. |
| sarpstar "film başına farklı ses işleme ve farklı ses" | Kanal tutarlılığı için **ses kanal boyunca sabit**; işleme de kanal başına bir kez seçilir (bölüm başına değil). Yalnız "imprint" bölüme özgü olabilir. |

---

## 7. Lisans özeti

| Repo | Lisans | Kod alınır mı | Koşul |
|---|---|---|---|
| sarpstar/cinecode | MIT (© 2026 Sarp Yıldız); `styles/` bir kısmı ayrıca MIT (© LemoLab) | **Evet** | Alınan dosyanın başına telif + MIT metni (ya da `LICENSES/` altına) eklenir. Önerilen: `words_check.py` desen listesi, `voice_treat.py` ffmpeg zinciri, `qc.py`/`scene_check.py` ölçümleri. Okunup uyarlanır, olduğu gibi çalıştırılmaz. |
| feitangyuan/onetake | PolyForm Noncommercial 1.0.0 + "Required Notice" | **Hayır** (ticari kanal) | Yalnız fikir. Kodu açıp satır satır yeniden yazmak türev iş riski taşır; kendi tanımımızdan sıfırdan yazılır. |
| zakariaf/cinecode | MIT (© 2026 Zakaria Fatahi) | Evet | Telif satırı korunur. Önerilen: lint kural tanımları ve eşikleri (ör. `subject-size` aralıkları), ses QA mantığı. Kod motoru (`@napi-rs/canvas`) bize uymaz; mantık TS/Python'a yeniden yazılır. |
| hsynozdamar-byte/cinecode-studio | MIT (© 2026 Hüseyin Özdamar) | Evet ama gereksiz | — |

Not: sarpstar'ın bazı yöntemleri başka MIT repolardan geliyor ve kaynakları dosyalarda belirtilmiş (ör. `beat_grid.py` ← tuzhechen2005/opus-video-skills, jüri ← Vincentwei1021/mg-styles-15, `words_check` ← blader/humanizer). Alınan parçada bu satırlar da korunur.

---

## 8. Önerilen uygulama sırası (her biri orkestra kararı, sahibi ajan yapar)

1. **Hemen, kod gerektirmez:** A1–A6 ve A9'u senarist brifine ve CLAUDE.md "Senaryo ve yazı"ya ekle. B2'yi (BÜYÜK HARF ve etiket bırakılır, vurgu metinle verilir) bir sonraki ses üretiminde uygula. E7 jüri formatını eleştirmen günlük moduna al.
2. **Kısa betik işi (haiku/sonnet, bir kez):** A7 `kelime_kontrol`, B1 `ses_isle`, B5 çekim doğrulama + hash önbellek, C5 ritim ölçümü + C1 taşıyıcı alanı (doğrulayıcıya), D6 plan başına loudness, E4 genel bakış sayfası, E5 `qc`.
3. **Kullanıcı kararı gereken deneme:** B6a Voice Changer (STS) ile kullanıcının telefon okuması, bir bölümün 3 satırı üzerinde, mevcut TTS'e karşı kör dinleme. Ayrıca A6 (kelime yoğunluğunu düşürmek).
4. **Kurulum ekibi işi (opus, bir kez):** C2 yeni geçişler (`icinden`, `buyume`, `eslesme`), C3 `kamera.devam`, C4 operatör hissi, E1/E2/E6 için kitin kutu ve temas verisini dışa vermesi. Kural gereği kalibrasyon bir bölüm json'unda render edilip görülünce kabul edilir.
