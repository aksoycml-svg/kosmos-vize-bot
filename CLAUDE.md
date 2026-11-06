# Instagram Hikâye Kanalı — Proje Kuralları

Kanal: yaşanmış, az bilinen tarihî hikâyeleri **kodla animasyon** (Remotion + vektör kukla rig'leri) olarak anlatan dikey (9:16) Instagram Reels kanalı. TR ve EN iki kanal.
Kullanıcı ile **Türkçe** konuş. Kullanıcı yapımcıdır; kurguyu **Adobe Premiere**'de bitirir.

## Ekip (alt ajanlar: `.claude/agents/`)
| Ajan | Model | Görev |
|---|---|---|
| arastirmaci | sonnet | Kaynaklı olay dosyası (`arastirma.md`), çelişkiler bölümü |
| senarist | sonnet | Kanca, plan plan senaryo, ekran yazıları (skill'ler: storytelling-hooks, short-form-video-script, hook-writer) |
| yaratici-yonetmen | sonnet | Her plana benzersiz dokunuş |
| yonetmen | sonnet | Sahne planı, kadraj, ritim, fizik ve süreklilik kontrolü |
| tasarimci | sonnet | Görsel kimlik, karakter/mekân tasarımı, dönem doğruluğu |
| mekan-sorumlusu | **opus** | Mekân dokusu ve görsel dili; şehir/dönem uygunluğu; her mekânın kendi estetiği; motion'a çizilebilir spesifikasyon |
| motion | **opus** | Remotion kodu, rig, animasyon, fizik |
| kurgucu | sonnet | Ritim, kesmeler, müzik (bulma + lisans + düzenleme), ses miksi |
| elestirmen | **opus** | Kalite kapısı — her teslimden önce |
| teknisyen | haiku | Render, normalizasyon, kontrol sayfası, git, betik çalıştırma |

**İşi gerçekten ajanlara yaptır.** Ana oturum orkestra eder; senaryoyu senarist, kodu motion, kontrolü eleştirmen yapar. (Geçmişte ana oturum senaryoyu kendisi yazdı ve kullanıcı "basit" buldu.)

### Katkı raporu (zorunlu)
Her ajan görev bitince `bolumler/<slug>/katki-raporu.md` sonuna ekler: ne yaptı, dokunduğu dosyalar, kararlar ve gerekçeleri, uyguladığı kurallar / yakaladığı ihlaller, açık sorular. Ana oturum bu raporları kullanıcıya özetler.

## Bölüm fikirleri
`bolumler/FIKIR-HAVUZU.md` — aday hikâyeler ve durumları. Yeni bölüm seçmeden önce oku; araştırmacı doğrulamadan senaryoya geçme.

## İş akışı ve onay noktaları
1. Araştırma → 2. Senaryo (**kullanıcı onayı**) → 3. Storyboard: kare + notlar (**kullanıcı onayı**) → 4. Ses (ElevenLabs) + varlıklar → 5. Animasyon (motion) → 6. Eleştirmen kontrolü (kontrol kareleri) → 7. İlk kurgu render (**kullanıcı onayı**) → 8. Premiere paketi (sahne klipleri, ayrı ses kanalları, SRT, XML) + 4K hareketli tuval gereken planlarda.
Her teslimden önce eleştirmen kontrol karelerini kural listesine göre tarar. Kullanıcıya hatayı kullanıcının yakalaması = süreç hatası.

### Ajan çalışma sırası (revizyon zincirini önlemek için)
Ajanlar aynı anda değil, **bağımlılık sırasıyla** çalışır. Bir ajan, girdisi olan belge kesinleşmeden başlamaz. (Blanc'ta hepsi paralel çalıştı; dönem bulguları sonradan gelince senaryo, dokunuş, sahne planı ve tasarım 2–3 kez revize edildi.)

| Adım | Ajan | Girdi (kesin olmalı) | Çıktı (tek sahibi) |
|---|---|---|---|
| 1 | araştırmacı | fikir | `arastirma.md` — olay **ve** dönem/görsel doğrulama (mimari, kıyafet, nesneler, teknoloji nasıl çalışır, şehir, saat/ışık koşulları) |
| 2 | senarist | 1 | `senaryo.md` → **kullanıcı onayı** |
| 3 | yaratıcı yönetmen | 1–2 | `dokunuslar.md` (yalnız kaynakla çelişmeyen jestler) |
| 4 | yönetmen | 2–3 | `sahne-plani.md/.json` (zaman, kadraj, z/u, temas kareleri) |
| 5 | tasarımcı → mekân sorumlusu | 1–4 | `tasarim.md` (kimlik, palet, karakter, prop, tipografi) önce; sonra `mekanlar.md` (doku, mekân dili) onun paletiyle |
| 6 | motion | 1–5 | önce **1–3 kalibrasyon karesi** → eleştirmen → geçerse kalan kareler (paralel olabilir) |
| 7 | eleştirmen | 6 | kalite kapısı; geçmeyen kare kullanıcıya gitmez |
| 8 | teknisyen | 7 | kontrol sayfası, render, git |
| — | kurgucu | 4'ten sonra | müzik/ses planı motion ile paralel yürüyebilir |

- **Tek sahiplik:** her belgenin tek sahibi vardır; diğerleri doğrudan değiştirmez, notu orkestraya (ana oturum) yazar, orkestra sahibine iletir.
- **Yukarı akış:** alt adımda bir sorun üst adımın belgesini etkiliyorsa (ör. dönem bulgusu), önce o belgenin sahibi düzeltir, sonra aşağıdakiler sırayla güncellenir — hepsi aynı anda değil.
- **Açık soru biriktir:** her adımın sonunda kullanıcıya gereken kararlar tek mesajda toplanır; karar gelmeden bağımlı adım başlamaz (varsayılan seçilirse açıkça yazılır).
- **Paralel serbest olanlar:** birbirinin girdisi olmayan işler (ör. kurgucu müzik araştırması ↔ motion; kalibrasyondan sonra farklı mekânların kareleri).

## KURALLAR

### Doğruluk
- Sadece `arastirma.md`'de kaynaklı bilgiler. Çelişkili detaylarda yumuşak ifade. Tek kaynaklı bilgiyi kesin gibi söyleme. Repliklerin dramatizasyon olduğu açıklamada belirtilebilir.
- Dönem doğruluğu (ör. 1830'lar Fransa): Haussmann öncesi mimari (dar sokak, farklı yükseklikte bitişik evler, panjur, yarı ahşap, arduvaz/mansard, baca kümeleri), ipe asılı yağ lambası (réverbère), kâğıt para yok (altın/gümüş frank), Notre-Dame'da sivri kule yok (1786–1860'lar arası), Chappe telgrafı T biçimli kol mekanizması (asla yel değirmeni), tricolore 1830'dan beri.
- Chappe ayrıntıları (`bolumler/blanc-kardesler/storyboard-v2/donem-dogrulama.md`): kollar siyah + sabit jaluzi, karşı ağırlık gri, direk gök mavisi; regülatör/gösterge ≈2.3:1; dürbünler kulede ahşap kutuya sabit (elde tutulmaz); kumanda (manipulateur) direk dibindeki odada, kablo-makara, it-çek; **telgraf gece ve siste çalışmaz** → gece planlarında kollar sabit. Bordeaux sinyali Saint-Michel çan kulesi üstünde (1768–1860'lar arası külahsız).
- Fransız mahkemesinde tokmak yok (kanıt yok). 1830'larda koparmalı yaprak takvim yok. Kanıtsız dönem detayı (cübbe rengi, haç, arma) görsel olarak nötr kalır.

### Dokunuş (yaratıcı yönetmen)
- Her plana **en az bir** dokunuş; filmde **hiçbiri tekrar etmez**; dokunuş **kendi planında başlar ve biter**.
- **Okunabilir:** telefonda fark edilir — ekran yüksekliğinin ≥%10'u ya da yakın plan/insert, ≥1 sn net; göz oraya yönlendirilir.
- **Katkı:** bir karakter eylemine sebep-sonuç ile bağlanır, mümkünse karakteri anlatır.
- Ses gerektiren dokunuşun foley'i atlanmaz.

### Fizik ve sahneleme
- Ayaklar her karede zemine basar; temas gölgesi. Ölçek derinlikle (kaçış noktası) orantılı; karakter konumu (z derinlik, u yanal) ile tanımlanır.
- Giriş/çıkış sadece mümkün yerlerden (kapı, sokak ucu, duvarsız kadraj kenarı). Hiçbir şey duvar/zemin/nesne içinden geçmez (baston ucu kaldırıma gömülmez, fare taşın içine batmaz).
- Merdiven: her adım bir basamağa; yokuş: gövde dik, ayak eğime uyar.
- Tutulan nesne eli takip eder (kıstıran parmaklar görünür; tutulan kumaş/eldiven yumuşak sarkar, katı kalıp gibi durmaz). Gölgeler ışık kaynağının tersine.
- **Tek ışık kaynağı:** huzme, ışık havuzu ve gölge yönü aynı kaynak tanımından türetilir; elle ayrı ayrı konmaz. Görünen her lamba/fener/pencere çevresine ışık düşürür.
- **Ufuk–ölçek:** ön plan dahil her figür ufuk çizgisine göre ölçeklenir (ayakta yetişkinin başı göz hizasındaki ufka yakın). Bulanık ön plan figürü de bu kurala uyar.
- **Kompars ana kadrodan ayrışır:** farklı yüz/şapka/kostüm ya da yüzsüz siluet; ana karakterin yüzü kopyalanmaz.

### Süreklilik
- Yakın planda ilk kez görülen hiçbir şey birden belirmez: önceki planda kurulur ya da girişi gösterilir (kurulum → karşılık).
- Konum, yön, durum planlar arası tutarlı.

### Hareket tamamlanır
- Başlayan her hareket ekranda tamamlanır ya da açıkça kadrajdan çıkar. Kesme hareketin ortasına gelmez. Nesneler fade ile kaybolmaz; fiziksel olarak girer/çıkar. Kısa kapanış anı olur.

### Ses
- **Temas = ses:** görünür her çarpma/basma/vurma/açılma-kapanma/bırakma anı kendi foley'ini alır, tam o karede. Temas anları olay listesine yazılır, sesler aynı listeden yerleştirilir.
- **Görünürlük–ses:** görmediğimiz dokunuşun sesi olmaz. Görünmeyen kaynaklar sadece kısık ortam sesi olabilir (uzak çan, laterna, rüzgâr). Seviye ekrandaki büyüklükle orantılı.
- Miks: anlatım 0 dB ref, foley −2/−6 dB (kullanıcı foley'i yüksek bulur — temkinli ol), müzik anlatım altında ~−18 dB. Final −14 LUFS, tepe −1.5 dBTP.
- Müzik kaynakları: kamu malı klasik (dönem uygunsa öncelik, ör. Chopin Paris 1831+), Incompetech (CC-BY), Pixabay Music. Her parçanın lisansı `muzik/lisanslar.md`.

### Senaryo ve yazı
- Üç katmanlı kanca (ilk kare + söz + ekran yazısı). Önce ses kapalı izleyen için yaz; ekran yazısı anlatımı tekrar etmez, tamamlar. Döngülü son. Her 2–4 sn görsel değişim.
- Güvenli alan (1080x1920): üst 220 px, alt 420 px, yan 80 px. Ayaklar, temas noktaları ve kurulum nesneleri de güvenli alanın içinde kalır (Instagram arayüzü altında kalmaz).
- **Yazı bantları:** üst bant y 240–400 (anlatım ekran yazısı), alt bant y 1290–1490 (replik altyazısı). **Replik altyazısı ayakları, temas anını ya da kurulum nesnesini örtecekse üst banda alınır.** Yazı hiçbir zaman dokunuşun üstüne binmez.
- İsim etiketi kendi karakterinin üstünde durur, yüzü ve başka karakteri örtmez.

### Mekân ve görsel dil (mekân sorumlusu)
- Şehirler stil ile değil taş, çatı, ışık ve imza siluetle ayrışır; ilk 0.5 sn'de ses kapalı okunur. Arşiv/renk derecelendirmesi şehir paletini karartıp aynılaştırmaz (renk ölçüm tablosu ile kontrol).
- Doku el yapımı vektör: seed sabit (doku kaynamaz), saf siyah/beyaz yok, en fazla 3 doku katmanı, kırmızı yalnız mühür/hata/vurgu için.
- Kamera yüksekliği fiziksel tutarlı: alçak kameradan çatı yüzeyi görünmez, saçak altı görünür. Katmanlar arasında maske kenarı/şerit kalmaz.
- Hikâyeyi taşıyan her nesne (paket, eldiven, tahta, pencere, kol) 360x640 telefon boyutunda ne olduğunu söyler; söylemiyorsa büyütülür ya da sadeleştirilir.

### Kontrol karesi protokolü (eleştirmen)
- Her plan için: ilk kare + dokunuş/temas karesi + kapanış karesi; tam boy + 360x640 telefon sayfası + güvenli alan bindirmeli sürüm. Renk ölçüm tablosu (duvar/zemin/gök hedef hex'e karşı).

## Teknik
- Proje: Remotion 4 (`src/`), fps 60 (animasyon), 1080x1920. `npm install` sonra `npx remotion studio` / `npx remotion render <id>`.
- WebGL: `remotion.config.ts` → `setChromiumOpenGlRenderer("swangle")` (bulut makinesinde tek çalışan).
- Fontlar yerel (`public/fonts`, `src/theme.ts`) — Google Fonts proxy sertifikası yüzünden Chromium'da yüklenmez.
- Rig: `src/rig/Kukla.tsx` (François/Louis paletleri, yürüme döngüsü `yuru`, dudak senkronu `visem`). Sokak: `src/bolumler/blanc/proto/Sokak.tsx` (perspektif cephe sistemi `cephe/zemin/sokakGenislik`). Prototip: `proto/Proto.tsx`, `FareInsert.tsx`. Efektler: `src/components/Efektler.tsx`. Harita: `src/bolumler/blanc/Harita.tsx`.
- Görsel üretim: `node tools/gorsel.mjs <prompt.txt> <out.png> [ref...] --ar 9:16 --size 2K` (Gemini, anahtar `Value` ortam değişkeninde; asla yazdırma). Model: gemini-3-pro-image.
- Ses: `tools/seslendir.mjs` (ElevenLabs, `elevenlabs_api_key`), `tools/sfx.mjs` (ses efekti). Ücretsiz plan: kütüphane sesleri (Umut Canbay, TR) ve müzik API'si kapalı; ticari kullanım için Starter plan gerekli.
- Ses efekti zamanlaması: tepe noktasını ölç (ffmpeg → python), ses dosyasını temas karesine hizala.
- Wikimedia bu sunucudan 429 verir; Wikipedia aynası (kiwix) çalışır.

## Git
- Repo: `aksoycml-svg/kosmos-vize-bot`, **sadece `instagram-kanal` branch'i**. `main`'e (vize botu) asla dokunma.
- **"cerensafe" ile ilgili hiçbir şeye dokunma** (kullanıcı yasağı).
- Git komutlarını `git -C <repo> ...` ile çalıştır (`cd … && git` onay penceresi açar).

## Kota
- Her bölüm yeni oturumda. Tam render yerine kontrol kareleri (küçük tek sayfa). Rig/sokak/efekt tekrar kullanılır. Ajanlara sadece ilgili dosyaları ver.
