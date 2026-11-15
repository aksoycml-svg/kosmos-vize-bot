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

## Günlük üretim modeli (kullanıcı kararı, Blanc sonrası)
- **Her gün bir bölüm.** Bölüm başına dış maliyet **≤ $1** (ElevenLabs aboneliği hariç). Gemini görseli ancak bu bütçe içinde ve istisna olarak; ekrana girmeyen referans dahil sayılır.
- **Kota hedefi:** bir bölüm Claude kotasının ~%3–5'i. (Blanc pilotu tek bölüm için %30+ yedi: her plan için ayrı opus kodu, kare kare opus eleştirisi, paralel revizyon zincirleri — tekrarlanmaz.)
- **Set kiti:** mekânlar, karakterler, props, jestler bir kez kurulan **parametrik şablonlardır** (`src/kit/`). Bölüm = `bolum.json` (plan listesi: şablon + parametre + metin + zaman + temas); genel `Bolum` bileşeni render eder. Günlük bölümde yeni kod yazılmaz.
- **Format:** 30–65 sn (sesin gerçek süresi belirler; senaryo hızı 2.1 kelime/sn varsayılır), 8–14 plan, bölüm başına 2–4 mekân şablonu. Anlatım + kinetik yazı + harita/insert ağırlıklı; kukla hareketleri jest kütüphanesinden.
- **Günlük ekip (sonnet/haiku):** araştırmacı → senarist (**kullanıcı onayı**) → yaratıcı yönetmen (kısa dokunuş listesi, kütüphaneden ya da yeni) → yönetmen (`bolum.json`, şablon kataloğundan) → teknisyen (ses, render, kontrol betiği, kontrol sayfası) → eleştirmen (**tek tur**, kontrol sayfası üzerinden, sonnet). 
- **Kurulum ekibi (opus, yalnız yeni şablon gerekince):** tasarımcı → mekân sorumlusu (mimari kart + doku, şablona gömülür) → motion (şablon kodu) → eleştirmen (şablon kalibrasyonu). Bir şablon bir kez doğru kurulur, her bölümde doğru gelir.
- **Denetim önce betik:** güvenli alan, yazı bantları, ayak teması, renk/ton, imza nesnesi beyazı, süre — `tools/` betikleriyle; insan/ajan gözü yalnız betiğin ölçemediği için.
- Ajan brifleri kısa; ajana yalnız ilgili dosyalar verilir. Uzun belge yerine şablon kataloğuna referans.

### İki dil baştan birlikte (kullanıcı kararı, Blanc EN sonrası)
- Senarist TR ve EN metni **aynı anda**, yaklaşık eşit uzunlukta yazar; kullanıcı ikisini birlikte onaylar.
- Her iki dilin sesi yönetmenden önce üretilir; **plan süresi = iki dilin uzun olanı** (+ kuyruk). İki dil aynı zamanlamayı, aynı temas/foley karelerini paylaşır.
- Görüntü **yazısız** bir kez render edilir; ekran yazıları, replik altyazısı, etiketler (harita, mühür) dil başına **ayrı katman** (şeffaf) + ses dil başına ayrı. İkinci dil = yalnız yazı katmanı + ses + miks; görüntü yeniden render edilmez.
- Görüntüye gömülü dil (tabela, mühür metni) ya dil-nötr tasarlanır ya yazı katmanına alınır. Kitte sabit yazılmış dil metni bırakılmaz.
- (Blanc EN'de zamanlama sese bağlı olduğundan tüm animasyon yeniden hizalandı, iki tam render + düzeltme turu gerekti.)

### bolum.json kuralları (Blanc storyboard v3 hatalarından)
1. **Senaryo → parametre eşlemesi zorunlu:** senaryodaki her görsel cümle (poz, durum, ifade, dokunuş) json'da karşılığı olan bir parametreye eşlenir. Kitte karşılığı yoksa "en yakınla doldurma" yok → `kit_eksik` ile işaretlenir, orkestra karar verir. (P10: "yatakta hasta memur" ayakta, şapkalı çizildi.)
2. **Her animasyon planın içinde biter:** jest/prop/morf aralığı plan süresine sığar ve plan sonundan ≥12 kare önce tamamlanır (hareket tamamlanır). Doğrulayıcı reddeder. (P13: Wi-Fi morfu plan bittikten sonraya kalmıştı.)
3. **`kontrol_kare` zorunlu:** her plan, dokunuşun/ana eylemin en okunur olduğu kareyi beyan eder; kontrol render'ı bu kareyi kullanır, otomatik seçim yapılmaz. (v3'te dokunuş başlamadan önceki kareler render edildi.)
4. **Okunurluk beyan edilir ve ölçülür:** dokunuş nesnesinin ekran oranı ve net süresi (≥%10 / ≥1 sn) json'da; küçük kalırsa kamera yaklaşır (katalog sınırı içinde).
5. **Kit özelliği kanıtla kabul edilir:** "kitte var" demek yetmez; yeni kit parçası bir bölüm json'ında kullanılıp render edilmiş karede görülünce kabul edilir.
6. **Json'u yazan doğrular:** yönetmen doğrulayıcıyı kendisi çalıştırır, geçmeyen json teslim edilmez.
7. **Yönetmen kör ayar yapmaz:** kamera/ölçek/konum değiştirdiği her planın `kontrol_kare`'sini kendisi render eder (`npx remotion still Bolum … --scale=0.25`) ve bakar; okunmuyorsa aynı turda düzeltir. Katalog sınırı yetmiyorsa `kit_eksik` yazar. (v3.1'de kör ayarlanan 8 planın 5'i hâlâ okunmuyordu.)

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
- **Küçük kararı sorma** (kullanıcı kararı, Paris: "sorma neden soruyorsun"): teknik/estetik ayrıntı, ajan önerisi ve varsayılanlar orkestra tarafından karara bağlanır, kullanıcıya yalnız bildirilir. Kullanıcıya yalnız gerçekten onun kararı olanlar gider: senaryo/metin onayı, yön değişikliği (yeni görsel dil, mekân değişikliği), dış maliyet, kapsam/kota.
- **Paris çıtası (kullanıcı kararı, Çiçero/Yarasa sonrası: "bundan sonra aynı kalitede iş yapılsın"):** Çiçero ve Yarasa onay yetkisi devredilip birer turda bitti, 6 puanda kaldı; Paris kullanıcının 19 notluk turuyla 7'ye çıktı. Kalitenin kaynağı kullanıcının gözü, bu yüzden:
  1. **Yön karesi devredilmez:** kullanıcı "sorma, sen karar ver" dese bile her yeni mekân/karakter/görsel dil için motion kod yazmadan önce **tek yön karesi** kullanıcıya gider (tek mesajda, evet/hayır). Diğer küçük kararlar sorulmaz.
  2. **Referans çıtası:** eleştirmen kareleri soyut kurala değil Paris referansına karşı puanlar: `bolumler/paris-kusatmasi/kalibrasyon/tam-render-3/genel-tr.jpg` ve `bolumler/paris-kusatmasi/hedef/hedef-ozet.jpg`. Soru: "Bu kare Paris'in yanına konsa geri kalır mı?" — kalırsa neden (ışık, derinlik, doku, sıcak–soğuk, figür) yazılır.
  3. **Yeni şablon en az 2 kalibrasyon turu:** ilk kurulum teslim edilmez; eleştirmen ≥7 vermeden şablon kabul edilmez (en çok 4 tur; 4'te geçmezse kullanıcıya yön karesiyle döner).
  4. **Bölüm eşiği 7:** jüri puanı <7 olan bölüm teslim edilmez; en zayıf planlar (eleştirmen teşhisiyle) düzeltilir. Kotaya sığmıyorsa kullanıcıya puan ve eksik açıkça yazılır, "bitti" denmez.
  5. **Kullanıcı notu kurala çevrilir:** her kullanıcı notu (`notlar/tur-N.md`) eleştirmenin kontrol listesine eklenir; aynı not ikinci bölümde gelirse süreç hatasıdır.
  6. **Görsel reçete zorunlu:** her yeni mekân şablonu `src/kit/GORSEL-RECETE.md` (A: ışık/derinlik/doku 13 madde, B: bina/mimari ayrıntı 10 madde, C: mekân seçimi) maddelerinin hepsini uygular; eksik madde `lint` gerekçesiz kabul edilmez. Mekân sorumlusu spesifikasyonda, motion kodda, eleştirmen kalibrasyonda madde madde işaretler. Paris'te hazır olan parçalar yeniden yazılmaz, ortak koddan çağrılır.
  - Kota notu: bu ek turlar yeni şablon kurulumunda harcanır; kitten gelen günlük bölüm yine ~%3–5 hedefinde kalır.
- **Açık soru biriktir:** her adımın sonunda kullanıcıya gereken kararlar tek mesajda toplanır; karar gelmeden bağımlı adım başlamaz (varsayılan seçilirse açıkça yazılır).
- **Övülen kilitlenir:** kullanıcının beğendiği plan/satır `bolum.json`'da `kilit: true` olur; düzeltme turlarında dokunulmaz.
- **Notlar kelimesi kelimesine:** kullanıcı geri bildirimi `bolumler/<slug>/notlar/tur-N.md`'ye aynen yazılır; düzeltme bu dosyadan yapılır.
- **Önce teşhis, sonra yeniden yapım:** eleştirmen kusurun nedenini (hangi parametre) yazar; orkestra yalnız o parametreyi değiştirtir, planı baştan kurdurmaz. Bilerek kabul edilen uyarı json'a `lint: {izin: […], not: "…"}` olarak yazılır, her turda yeniden tartışılmaz.
- **Metin değişmedikçe ses yeniden üretilmez** (kredi ve tur tasarrufu).
- **Paralel serbest olanlar:** birbirinin girdisi olmayan işler (ör. kurgucu müzik araştırması ↔ motion; kalibrasyondan sonra farklı mekânların kareleri).

## KURALLAR

### Doğruluk
- Sadece `arastirma.md`'de kaynaklı bilgiler. Çelişkili detaylarda yumuşak ifade. Tek kaynaklı bilgiyi kesin gibi söyleme. Repliklerin dramatizasyon olduğu açıklamada belirtilebilir.
- Dönem doğruluğu (ör. 1830'lar Fransa): Haussmann öncesi mimari (dar sokak, farklı yükseklikte bitişik evler, panjur, yarı ahşap, arduvaz/mansard, baca kümeleri), ipe asılı yağ lambası (réverbère), kâğıt para yok (altın/gümüş frank), Notre-Dame'da sivri kule yok (1786–1860'lar arası), Chappe telgrafı T biçimli kol mekanizması (asla yel değirmeni), tricolore 1830'dan beri.
- Chappe ayrıntıları (`bolumler/blanc-kardesler/storyboard-v2/donem-dogrulama.md`): kollar siyah + sabit jaluzi, karşı ağırlık gri, direk gök mavisi; regülatör/gösterge ≈2.3:1; dürbünler kulede ahşap kutuya sabit (elde tutulmaz); kumanda (manipulateur) direk dibindeki odada, kablo-makara, it-çek; **telgraf gece ve siste çalışmaz** → gece planlarında kollar sabit. Bordeaux sinyali Saint-Michel çan kulesi üstünde (1768–1860'lar arası külahsız).
- Fransız mahkemesinde tokmak yok (kanıt yok). 1830'larda koparmalı yaprak takvim yok. Kanıtsız dönem detayı (cübbe rengi, haç, arma) görsel olarak nötr kalır.

### Dokunuş (yaratıcı yönetmen)
- Bölüm başına **6–8 güçlü dokunuş** (kanca ve kapanış planları hariç; her plana zorunlu değil — kullanıcı kararı, günlük format); filmde **hiçbiri tekrar etmez**; dokunuş **kendi planında başlar ve biter**. Kullanılan dokunuşlar `kit/DOKUNUS-KUTUPHANESI.md`'ye eklenir; kanal genelinde aynı dokunuş üst üste bölümlerde tekrarlanmaz.
- **Okunabilir:** telefonda fark edilir — ekran yüksekliğinin ≥%10'u ya da yakın plan/insert, ≥1 sn net; göz oraya yönlendirilir.
- **Küçük jest = yakın kamera:** göz kırpma, kaş, dudak, parmak gibi küçük jestler okunacaksa yüz/el ekran yüksekliğinin ≥%12'si (~230 px) olur. Değilse kamera o ana push-in yapar, yakın plana keser ya da karakter kameraya daha yakın konumlanır. Uzak planda küçük jest oynanmaz.
- **Sinematografi dili (kullanıcı kararı, Ben-my-Chree: "yönetmen bunları biliyor mu pek kullanmıyor gibi"):** yönetmen her çekimi `src/kit/SINEMATOGRAFI-SOZLUK.md` terimleriyle çekim kartı olarak yazar (ölçek · açı · hareket · ekipman · lens mm · alan derinliği/netlik · hız karakteri · gerekçe). Şablonlar 2.5D katman derinliğiyle kurulur; dolly, crane, truck, rack focus, paralaks, dolly zoom kit parametresidir. Karşılığı olmayan teknik `kit_eksik`. Kartın ilk satırı izleyicinin hissedeceği **duygu**dur (`src/kit/SINEMATOGRAFI-DUYGU.md`); teknik duygudan türetilir, süs olarak eklenmez. Eleştirmen sorar: "Teknik duyguyu güçlendiriyor mu, süs mü?"
- **Önemli oyunculuk = yakın plan:** duygu, karar, ifade değişimi, replik sonu gibi oyunculuk anları yakın plan (yüz) ya da bel plan ile çekilir; geniş/boy plan mekânı kurmak ve fiziksel eylem için kullanılır. Yönetmen her plan için çekim ölçeği (geniş · boy · bel · göğüs · yakın · insert) ve ölçek değişimlerini yazar. Rig yüzü yakın planda da detaylı (göz kapağı, kaş, ağız) olmalıdır.
- **Katkı:** bir karakter eylemine sebep-sonuç ile bağlanır, mümkünse karakteri anlatır.
- Ses gerektiren dokunuşun foley'i atlanmaz.

### Fizik ve sahneleme
- Ayaklar her karede zemine basar; temas gölgesi. Ölçek derinlikle (kaçış noktası) orantılı; karakter konumu (z derinlik, u yanal) ile tanımlanır.
- Giriş/çıkış sadece mümkün yerlerden (kapı, sokak ucu, duvarsız kadraj kenarı). Hiçbir şey duvar/zemin/nesne içinden geçmez (baston ucu kaldırıma gömülmez, fare taşın içine batmaz).
- Merdiven: her adım bir basamağa; yokuş: gövde dik, ayak eğime uyar.
- Tutulan nesne eli takip eder (kıstıran parmaklar görünür; tutulan kumaş/eldiven yumuşak sarkar, katı kalıp gibi durmaz). Gölgeler ışık kaynağının tersine.
- **Tek ışık kaynağı:** huzme, ışık havuzu ve gölge yönü aynı kaynak tanımından türetilir; elle ayrı ayrı konmaz. Görünen her lamba/fener/pencere çevresine ışık düşürür.
- **Ufuk–ölçek:** ön plan dahil her figür ufuk çizgisine göre ölçeklenir (ayakta yetişkinin başı göz hizasındaki ufka yakın). Bulanık ön plan figürü de bu kurala uyar.
- **Askerler ve şehitler (kullanıcı kararı, Ben-my-Chree tur-4: "çoğu şehit onların ve değerliler… yeterli değeri çizimde verildiğine emin ol"):** Türk/Osmanlı askerleri **yüzsüz siluet çizilmez**; her biri kendi yüzüyle (göz, kaş, ağız; yaş ve yüz farkı), ağırbaşlı ve emek gösteren duruşla, bireysel bir ayrıntıyla (bıyık, sargı, yorgunluk, toz) çizilir. Ana karakterden ayrışma yüzsüzlükle değil farklı yüzle sağlanır. Karikatür, komik jest, kalabalık dolgusu, "düşman askeri" gibi okunan koyu kütle yok; kayıp ya da şehit varsa gösteri değil saygı (sessiz an, ölçülü ışık). Karşı tarafın askerleri de insan olarak, alay ve aşağılama olmadan çizilir. Eleştirmen bunu ayrı bir kontrol maddesi olarak sorar: "Bu askerin bir yüzü ve onuru var mı?"
- **Kompars ana kadrodan ayrışır:** farklı yüz/şapka/kostüm ya da yüzsüz siluet; ana karakterin yüzü kopyalanmaz.

### Süreklilik
- Yakın planda ilk kez görülen hiçbir şey birden belirmez: önceki planda kurulur ya da girişi gösterilir (kurulum → karşılık).
- Konum, yön, durum planlar arası tutarlı.

### Hareket tamamlanır
- Başlayan her hareket ekranda tamamlanır ya da açıkça kadrajdan çıkar. Kesme hareketin ortasına gelmez. Nesneler fade ile kaybolmaz; fiziksel olarak girer/çıkar. Kısa kapanış anı olur.

### Ses
- **Temas = ses:** görünür her çarpma/basma/vurma/açılma-kapanma/bırakma anı kendi foley'ini alır, tam o karede. Temas anları olay listesine yazılır, sesler aynı listeden yerleştirilir.
- **Görünürlük–ses:** görmediğimiz dokunuşun sesi olmaz. Görünmeyen kaynaklar sadece kısık ortam sesi olabilir (uzak çan, laterna, rüzgâr). Seviye ekrandaki büyüklükle orantılı.
- Miks: anlatım 0 dB ref, foley −5/−9 dB (kullanıcı foley'i yüksek bulur; Paris ilk kurguda "efekt sesleri 3 db kısılmalı" → eski −2/−6'dan 3 dB aşağı), müzik aşağıdaki seviye kuralıyla. Final −14 LUFS, tepe −1.5 dBTP.
- **Müzik akar:** müzik plan sınırında kesilmez, ani düşüşle "gitmez"; vurgu müzikal cümleyle (dinamik, enstrüman, cümle sonu) yapılır. Tam sessizlik yalnız kullanıcı onaylı bir karardır. Ses efekti oyunculuğa uyar (esneme acı gibi, hasta sesi sağlıklı gibi duyulmaz); anlamsız efekt (iç çekiş vb.) konmaz.
- **Müzik seviyesi (kullanıcı kararı, Evliya):** konuşmada anlatımın −22 dB altı, aralarda en fazla −16 dB (eski −8 dB'lik yükselme kullanıcıya "dip ses" gibi geldi). Vuruş/darbe sesleri yatağın 6–8 dB üstü, küçük temaslar müzik tepelerinin 10–15 dB altı.
- **Geçiş sesi bütçesi:** 30 sn'de en çok 2 whoosh, alçak bir kabarma; aynı geçiş sesi üst üste yok. Savaş/ölüm/felaket konularında gösteri sesi (riser, whoosh) yok.
- **Ses işleme:** ham TTS doğrudan yayına girmez; her anlatım satırı kanal boyunca sabit tek bir temizlik zincirinden geçer (highpass 80 Hz · de-esser · 300 Hz −2 dB · 3.2 kHz +2 dB · kompresör 2.5:1 · çok hafif ortak oda) — `tools/ses_isle.py` (kurulacak; sarpstar `voice_treat.py` MIT'ten uyarlanır).
- **Dil başına loudness eşitleme:** her dilin finali ayrı ölçülüp −14 LUFS'e getirilir; plan başına loudness ölçülür, medyandan 3 LU sapan plan işaretlenir.
- **Dinleme notu:** ajanlar sesi duyamaz, ölçer. Kullanıcıya her ses teslimiyle birlikte kulakla bakılacak **saniyeler** listesi verilir.
- Müzik kaynakları: kamu malı klasik (dönem uygunsa öncelik, ör. Chopin Paris 1831+), Incompetech (CC-BY), Pixabay Music. Her parçanın lisansı `muzik/lisanslar.md`.

### Senaryo ve yazı
- **Güçlü, meraklı, çok basit anlatım** (kullanıcı kararı): her cümle bir sonrakini merak ettirir (açık soru → cevap → yeni soru). Dil "bebeğe anlatır gibi" sade: kısa cümle, günlük kelime, terim yok ya da hemen açıklanır; izleyici hiçbir an "ne dedi?" demez. Akıllı görünmeye çalışan cümle değil, net cümle.
- **Kopuk yazım yok** (kullanıcı kararı, Evliya): anlatım bir zincirdir; her plan bir öncekinin sorusuna cevaptır ya da onun sonucudur (çünkü / bu yüzden / ama / o sırada). Art arda dizilmiş bağımsız bilgi cümlesi, nedeni söylenmeyen olay ("ikinci uçuş" — neden?), karakterin neden orada olduğunu söylemeyen bağlam yok. Slogan kalıbı ("O tek kişi: X.", "Tek X: Y.") ve yapay ikili paralellik yok; konuşur gibi yazılır. Senarist teslimden önce planları sırayla okuyup her geçiş için "bu neden buradan buraya geçti?" sorusunu cevaplar.
- **Hikâye, süreç listesi değil** (kullanıcı kararı, Paris v4 "hiçbir şey hatırlamıyorum"; cinecode/sarpstar `writing.md`, MIT): senarist yazmadan önce senaryonun başına (1) **tek dönüş satırı** `Önce: … / Sonra: …` (tür: tersine dönüş · ifşa · dönüşüm · eşik · ayna · karşıtlık) ve (2) **beş satırlık omurga** yazar: durum · istek · engel · değişim · sonuç. **Kahraman** (izleyicinin takip ettiği kişi) olmadan senaryo yazılmaz. Bu dönüşe hizmet etmeyen plan çıkar.
- **Soru–cevap omurgası** (kullanıcı kararı, Evliya yayını sonrası 2026-11-16: "ilk soru ile başlasın… hikâye cevaba götürsün, cevap soruyu kapatsın… izleyiciye bir şey kesinlikle hissettirmeliyiz"): bölüm, videonun cevapladığı **tek bir gerçek soruyla** açılır; hikâye o cevaba götürür, cevap soruyu kapatır. 12–15. sn'de bir ara cevap + yeni soru (Evliya EN Reels ilk saat: 77 sn videoda ortalama izlenme 16 sn). Senarist yazmadan önce **hedef duyguyu** (şaşkınlık · haksızlık/ironi · tartışma · hayranlık) ve **beklenen tepkiyi** (paylaşım · yorum · kaydetme) tek satırda yazar. Olayın sorusu mutlaka kapanır; açık bırakılabilen yalnız izleyicinin kendi yargısıdır. Dolgu soru ("Peki sonra ne oldu?") yasağı sürer.
- **Önce son:** son cümle/imge ilk yazılır; sonun gerektirdiği her nesne, kural ve sayı ilk üçte birde kurulur.
- **Merak, retorik soruyla değil saklamayla:** her 15–20 sn bir soru halkası; soru görüntüde yarım bırakılan bir şeyle açılır (kadraj keser, çizim yarıda durur, sayı donar). Yönetmen bunu json'a "saklanan şey" olarak işler.
- **Göster-anlatma testi:** anlatım ekranda görüleni söylüyorsa satır çıkar ya da tersine çevrilir; anlatım resmin veremediğini verir (neden, geçmiş, sayı, kural).
- **Anahtar anlar (2–4):** senarist işaretler (`anahtar: true`); ekran süresi = okuma süresi + 1.5 sn, kendi ses anı olur, çevresi geri çekilir (doruk ve karşılık).
- **Ritim:** cümle uzunlukları değişir (kısa vuruş + nefes alan cümle); hepsi aynı düşüşle biten tek tip kısa cümle dizisi yok (Paris v4 "telgraf" hatası). Vurgu BÜYÜK HARF ya da etiketle değil, cümle yapısı ve noktalamayla verilir.
- **Hikâyenin mekanizması net:** olayın "nasıl"ı (hile, keşif) tek görsel + tek cümleyle anlatılır; izleyici "bu neden işe yaradı?" sorusunun cevabını görür. (Blanc v3: "hata"nın düzeltildiği söylenmedi → "Tek bir hata" anlamsız kaldı.)
- **Her kurulum karşılık bulur:** senaryoda "Kurulum → Karşılık" tablosu zorunlu; karşılıksız öğe çıkar ("Eldiven… çorap…" → "eee yani?").
- **Son tamamlanır:** son cümle askıda kalmaz ("Sadece…" yok); döngü bir vuruşla kapanır.
- **İlk kez izleyen testi:** senarist teslimden önce, ana oturum kullanıcıya göstermeden önce senaryoyu ses kapalı/açık izleyici gözüyle okur; "eee yani?" kalan plan geri gider.
- **Kulak için yaz (kullanıcı kararı, Ben-my-Chree tur-2: "çok anlaşılmıyor", "gemiyi mi aldı?"):** anlatım okunmaz, bir kez duyulur; dinleyici geri dönemez.
  1. **Özne açık:** "sonrakiler", "üçüncüsü", "onlar", "bunu" gibi yarım özne/nesne yok; her cümlede kim, neyi yaptığı adıyla yazılır ("Ardından gelen mermiler geminin dümenini bozdu").
  2. **Önce durum, sonra olay:** bir şey kurtarılmadan, vurulmadan ya da bulunmadan önce orada olduğu söylenir ("Gemide bir kedi kalmıştı." → "Başmühendis onu kurtardı.").
  3. **Kısaltma özneden yapılmaz:** süre taşarsa bir cümle ya da plan çıkar; cümlenin içinden özne/nesne kırpılmaz.
  4. **Soğuk dinleyici (zorunlu adım):** senaryo kullanıcıya gitmeden önce, `arastirma.md`'yi ve senaryonun geri kalanını **görmemiş** ayrı bir ajan yalnız anlatım metnini (TR ve EN) cümle cümle okur; her cümle için "kim, ne yaptı, neye?" yazar. Cevaplayamadığı ya da yanlış cevapladığı cümle senariste geri döner. (İlk kez izleyen testini hikâyeyi bilen yapınca işlemedi: eksik parçayı kafasından tamamladı.)
- Üç katmanlı kanca (ilk kare + söz + ekran yazısı). Önce ses kapalı izleyen için yaz; ekran yazısı anlatımı tekrar etmez, tamamlar. Döngülü son. Her 2–4 sn görsel değişim.
- Güvenli alan (1080x1920): üst 220 px, alt 420 px, yan 80 px. Ayaklar, temas noktaları ve kurulum nesneleri de güvenli alanın içinde kalır (Instagram arayüzü altında kalmaz).
- **Yazı bantları:** üst bant y 240–400 (anlatım ekran yazısı), alt bant y 1290–1490 (replik altyazısı). **Replik altyazısı ayakları, temas anını ya da kurulum nesnesini örtecekse üst banda alınır.** Yazı hiçbir zaman dokunuşun üstüne binmez.
- İsim etiketi kendi karakterinin üstünde durur, yüzü ve başka karakteri örtmez.
- **Ölü alan yok:** dikey kadrajın hiçbir üçte biri boş kalmaz. Konu kadrajı doldurur (kamera açısı, z konumu, ön plan öğesi); alt güvenli bant önemli bilgi taşımaz ama boş da görünmez (ön plan nesnesi, gölge, zemin derinliği).
- **Her nesnenin yeri anlamlı:** sahnede duran her eşya bir işleve ve mantıklı bir konuma sahiptir (kafe masası kafenin önünde, kapı açıklığını kapatmaz); amacı belli olmayan nesne çıkarılır.

### Mekân ve görsel dil (mekân sorumlusu)
**Mimari çeviri: "doğru iskelet, sade yüzey"** (kullanıcı onaylı yön)
- **İskelet tarihe sadık:** kat düzeni, pencere ritmi, kemer tipi, çatı biçimi/eğimi, şehrin imza silueti o yıl o şehirde neyse o. Telefonda okunan siluet ve orandır; gotik kemer ya da Haussmann düzeni stilize de olsa "yanlış yer/yıl" okunur.
- **Süsleme imzaya iner:** her cephe 1–2 imza ayrıntı (ör. Bordeaux maskaron + 1. kat balkonu; Paris mansard + baca kümesi; Tours yarı ahşap), ortak kontur diliyle basit şekiller, doğru yerinde.
- **Düzensizlik dönemin işaretidir:** Haussmann öncesi bitişik evler farklı yükseklik, genişlik, renkte; tekdüze sıra yapılmaz.
- **Dönem gravürü dili:** mimari, 1830'ların renkli litografi/gravürlerinden beslenen bir **kukla tiyatrosu dekoru** gibi kurulur — düz katmanlı paneller, gerçek oranlar, sınırlı palet, gölgede tarama (hatching), kâğıt dokusu. Mood/referans için dönem gravürleri (kamu malı) kullanılır.
- **Duygu için hafif abartı serbest** (oran, tavan yüksekliği, dikeylik); yapı tipi, malzeme ve dönem değişmez.
- **Mesafeye göre ayrıntı:** yakın = doku + süsleme; orta = oran + ritim; uzak = tek siluet.
- Her mekân için önce **mimari kart** (dönem/üslup, yapı tipi, kat düzeni, açıklık ve kemer tipi, süsleme, iç mimari, kameradan görünen), sonra doku.

- **Görsel zenginlik — katman notu (kullanıcı kararı, Ben-my-Chree tur-3/6: "görseller zengin olacak", "görsel estetikte de mekan estetiğinde de kolaya kaçmayalım"):** her plan üç katmanla tanımlanır ve bu katmanlar `dokunuslar.md`'de (yaratıcı yönetmen), `mekanlar.md`'de (z, hex, tarama, seed) ve çekim kartında yazılıdır:
  1. **Ön plan öğesi:** kameraya en yakın nesne (kaya, halat, korkuluk, omuz, dal); derinlik ve paralaks verir.
  2. **Işık olayı:** sahnede görünür bir ışık anı (alçak güneş, kenar ışığı, alev, su ışıltısı, pencere); tek kaynaktan türer.
  3. **Atmosfer:** havada bir şey (duman, toz, buğu, su sütunu, sis); arka planı flu katmanlarla derinleştirir.
  Her mekân kendi estetiğiyle kurulur (ışık karakteri, malzeme, kompozisyon fikri ayrı); düz panel, tek renk ailesi, boş gök, ızgara tekrar ve "yeterli" sade çözüm reddedilir. Eleştirmen her karede üç katmanı ayrı ayrı sorar.
- **Kamera hareket eder (kullanıcı kararı, Ben-my-Chree tur-6: "kamera dolly falan da kullanılabilir. dolly zoom gibi", "kamera haraketleri"):** şablonlar 2.5D kurulur (her katmanın gerçek z mesafesi); her çekimin anlamlı fiziksel bir hareketi vardır (dolly, truck, crane/jib, pan/tilt, arc, OTS geçişi); sabit kare yalnız bilinçli tutmada (saygı anı, anahtar okuma). Dolly zoom bölümde en çok bir kez, en güçlü anda. Hareket yumuşak ve fiziksel, kaynamaz; savaş/ölüm konusunda gösteriş sarsıntısı yok.
- Şehirler stil ile değil taş, çatı, ışık ve imza siluetle ayrışır; ilk 0.5 sn'de ses kapalı okunur. Arşiv/renk derecelendirmesi şehir paletini karartıp aynılaştırmaz (renk ölçüm tablosu ile kontrol).
- Doku el yapımı vektör: seed sabit (doku kaynamaz), saf siyah/beyaz yok, en fazla 3 doku katmanı, kırmızı yalnız mühür/hata/vurgu için.
- Kamera yüksekliği fiziksel tutarlı: alçak kameradan çatı yüzeyi görünmez, saçak altı görünür. Katmanlar arasında maske kenarı/şerit kalmaz.
- Hikâyeyi taşıyan her nesne (paket, eldiven, tahta, pencere, kol) 360x640 telefon boyutunda ne olduğunu söyler; söylemiyorsa büyütülür ya da sadeleştirilir.
- **İmza nesnesi tekildir:** hikâyenin imza nesnesinin (Blanc: beyaz eldiven) rengi/biçimi başka bir nesnede ya da kostümde tekrarlanmaz; aksi halde dokunuş boşa düşer. Nesne ölçüsü gerçek ölçüyle tutarlı (eldiven = bir el boyu).
- **Gravür telefonda okunur:** tarama ve kontur 360 px'te görünür olmalı (yarım pikselin altına inen çizgi yok sayılır). Tarama ışığın mimariyi anlattığı yerde (kemer içi, saçak altı, pencere çevresi), büyük önemsiz yüzeyde değil. Çapraz tarama yalnız küçük derin gölgede; geniş alanda kafes/tel örgü deseni yasak (dönem dışı okunur). Gölge kenarı net.

### Paris dersleri (kullanıcı revizyonları, 2026-11 — her yeni bölüm bunlarla başlar)
Ayrıntı ve kanıt: `bolumler/paris-kusatmasi/notlar/` (tur-1…19), `kalibrasyon/*/elestiri.md`, `tasarim.md` §13–15, `mekanlar.md`.
- **"Çok soğuk, estetik yok" (çatı/güvercin A turu):** tek renk ailesi + ışıksız + derinliksiz + dokusuz kare reddedildi. Her mekân baştan: **sıcak–soğuk karşıtlık** (gölge mavi-mor, ışık gül-altın/şeftali), görünür tek ışık kaynağı ve kenar ışığı, arka planda atmosferik derinlik (flu katmanlar), görünür gravür taraması + kâğıt dokusu. Ölçüt: sıcak piksel ≥%14, p95 L* ≥75.
- **Kod yazmadan önce yön onayı:** yeni görsel dil/mekân için önce kullanıcıya tek hedef kare (onaylı önceki hedeflerin dili + kamu malı gravür tarifi; Gemini yalnız kullanıcı onayıyla) ya da kalibrasyon karesi; onaydan sonra motion. Hedef görselsiz kurulan iç mekân/figürler (P05 el, P10) "çok kötü" bulundu.
- **Kontrast (kullanıcı notu, Ben-my-Chree tur-8: "kontrast istiyor sanki"):** kâğıt dokusu, sepya karışımı ve flu kareyi puslu ve gri yapmaz; değer yapısı net: en koyu gölgeler gerçekten koyu, ışıklar parlak, kontur net (2–3 px). Ölçüt: L* p5 ≤ 22, p95 ≥ 78 (aralık ≥ 55); hikâyenin konusu (yüz, gemi, nesne) çevresinden ≥ 25 L* ayrışır. Betikle ölçülür.
- **İmza nesnesi doygunluk/parlaklıkla tekil:** sahnenin geri kalanı C* ≤28, L* ≤88; imza nesnesi en doygun ve en parlak nokta (ton yasağı değil — o, sahnenin sıcaklığını öldürdü).
- **Tekrarlı yapı ızgara gibi durmaz:** çatı/kalabalık/şehir seed'li düzensizlik (boy, aralık, ayrıntı varlığı); "yumurta kolisi" okuması reddedildi.
- **Figür ve el:** yüzsüz siluet bile yön ve duruş okutur (burun-çene silueti, kenar ışığı, eğik baş); kollar dirsekli, el tek parça siluet (iç dikiş/bant/tırnak yok — "eldiven" okundu); havada tek kalkık parmak yok. Kompars yerleşimi anlam taşır (sur dışındaki koyu siluetler "kuşatan asker" okundu).
- **Omuz (kullanıcı notu, Ben-my-Chree kalibrasyon tur-1: "tüm çizimlerde omuzda problem var"):** teşhis: kol (`konikKol`/`ElKol40`) gövdeye yapıştırılmış ayrı bir boru gibi, düz kesik uçla ve gövdenin önüne çiziliyordu; gövde silüetinde omuz yuvarlağı (deltoid) yoktu, omuz eklemi boyna fazla yakındı. Kural: (1) omuz eklemi gövdenin içinde, boyundan omuz genişliği kadar dışarıda (profilde gövde ekseninin biraz arkasında); (2) kolun üst ucu yuvarlak bir **omuz başlığı** ile biter ve bu başlık gövde silüetinin parçası olarak çizilir, kol gövdeye kumaşla bağlanır (kol dikişi kavisli, düz yatay çizgi yok); (3) kol yukarı/öne kalktığında omuz başlığı ve gövde üst hattı da hareket eder (omuz kalkar, kol altı kırışığı); (4) kol gövdeden çıkan bant gibi duruyorsa kare reddedilir. Eleştirmen omuzu 2× kırpımla ayrıca kontrol eder.
- **Yüzde iç çizgi (kullanıcı notu, Ben-my-Chree: "çenedeki girintiler ne kulağın altındaki"):** elmacık, yanak çukuru, yaş kırışığı ve çene hattı kontur rengiyle tam çizgi olarak çizilmez; çizilince yüzde kesik/yarık gibi okunur. Bu hacimler yumuşak ton geçişi (ten gölgesi alanı) ya da ışık yönünde ince gravür taramasıyla verilir; çizgi gerekiyorsa en çok bir tane, kısa, ten gölgesi renginde, yarı saydam. Favori/saç parçaları kutu ya da dikdörtgen değil, saç yönünde biçimli şekil. Işık–gölge sınırı yüzü dikey ikiye bölen keskin bir bıçak çizgisi olmaz, yüzün hacmini izler.
- **Aynı karakter tek rig:** pozlar ayrı çizilmez; oranlar sabit, poz parametreleri sürekli (kuş tahtada/uçarken "çok fark" bulundu).
- **Hareket/ölçekte kaynama yok:** kamera hareket ederken dünya modeli sabit referanstan kurulur; rastgelelik kameraya/kareye bağlanmaz (P07 "şehir titriyor"). Yazı genişliği font metriğiyle ölçülür, tahminle değil (yazılar kadrajdan taştı).
- **Telefonda okunurluk:** her hikâye nesnesi/ikon 360 px'te ≥ ~20 px ve biçimi yanlış okunmaz (söndürülmüş balon "göz", kopuk tel "baston" okundu). Ölçek tek başına değil, biçim de kontrol edilir.
- **Ses:** foley kullanıcıya yüksek gelir (−5/−9 dB); müzik dönem uygun kamu malı (kayıt lisansı doğrulanmış); kanıt yoksa sayı "~" ile.

### Kontrol karesi protokolü (eleştirmen)
- Her plan için: ilk kare + dokunuş/temas karesi + kapanış karesi; tam boy + 360x640 telefon sayfası + güvenli alan bindirmeli sürüm. Renk ölçüm tablosu (duvar/zemin/gök hedef hex'e karşı).
- **Hareket şeridi zorunlu:** yürüme, giriş/çıkış, düşen/atılan nesne, kamera hareketi olan planlarda her 4 karede şerit (çok kareli render'dan). Orta kare hareketi gizler (Evliya: meşale yayı ve demet düşüşü kontrol kareleri arasında kaldı).
- **Tek sayfa genel bakış:** taslak videodan 32 kare (`fps=32/<süre>,scale=320:-1,tile=8x4`) — ışık, yön, renk akışı tek bakışta.
- **Günlük mod (jüri, tek tur):** 6 soru, her cevap zaman kodu + tek cümle: (1) kanca ilk 2 sn'de hareket edip merak açıyor mu, (2) kahraman an (doruk) okunuyor mu, (3) jenerik/AI gibi duran kare, (4) en zayıf 5 sn, (5) üç büyük kesmenin sesi, (6) AI gibi duran kelime/okuma. Ardından **en çok 3 düzeltme** (sahibi + parametre) ve tek puan (5 öğrenci işi … 9 ödül adayı). Uzun kural taraması yalnız kurulum kalibrasyonunda.

## Teknik
- Proje: Remotion 4 (`src/`), fps 60 (animasyon), 1080x1920. `npm install` sonra `npx remotion studio` / `npx remotion render <id>`.
- WebGL: `remotion.config.ts` → `setChromiumOpenGlRenderer("swangle")` (bulut makinesinde tek çalışan).
- Fontlar yerel (`public/fonts`, `src/theme.ts`) — Google Fonts proxy sertifikası yüzünden Chromium'da yüklenmez.
- Rig: `src/rig/Kukla.tsx` (François/Louis paletleri, yürüme döngüsü `yuru`, dudak senkronu `visem`). Sokak: `src/bolumler/blanc/proto/Sokak.tsx` (perspektif cephe sistemi `cephe/zemin/sokakGenislik`). Prototip: `proto/Proto.tsx`, `FareInsert.tsx`. Efektler: `src/components/Efektler.tsx`. Harita: `src/bolumler/blanc/Harita.tsx`.
- **Gemini görseli kullanıcı açıkça onaylamadan üretilmez** (kullanıcı kararı, Paris: gemini-3-pro-image 2K beklenenden pahalı; düşünme çıktısı da ücretli, fiyat tahmin edilmez). Hedef görsel yerine kamu malı dönem gravürü tarifi + önceki onaylı hedeflerin dili kullanılır.
- Görsel üretim: `node tools/gorsel.mjs <prompt.txt> <out.png> [ref...] --ar 9:16 --size 2K` (Gemini, anahtar `Value` ortam değişkeninde; asla yazdırma). Model: gemini-3-pro-image.
- **TR anlatımda yıl seslendirilmez** (kullanıcı notu, Yarasa: "1943 sesinde problem var" → "hala problem var"): Doga/multilingual_v2 "1943'te"yi de "bin dokuz yüz kırk üçte"yi de bozuk okudu. Yıl/tarih ekran yazısına konur, anlatım "o yıl", "bir gün" gibi söyler; zorunluysa önce tek satır deneme üretilip kullanıcıya dinletilir.
- **Anlatım sesi (kullanıcı kararı, Paris):** TR **Doga** (`ctoYieZ4J7WwcdhujpMq`) / EN **Brian**, `eleven_multilingual_v2`, bölüm **tek çağrıda** (ses rengi tutarlı), **etiket ve BÜYÜK HARF yok** (eleven_v3 etiketleri "çok AI" duruyor), vurgu yalnız noktalama ve cümle yapısıyla; stability 0.45, style 0.2, similarity 0.8, speed 1.0, seed 7 (sorunluysa 8, 9). Plan sınırı sinyal sessizliğinden kesilir, nefes temizlenir (`tools/paris_ses_final.py`). Umut Canbay sesinde dip ses var — kullanılmaz.
- Render: Bolum için `--gl=angle` (swangle bazı karelerde figür/kanat çizmiyor); maske/kenar hataları tek kare `still`'de görünmez, hareket kontrolü çok kareli render şeridiyle yapılır.
- Ses: `tools/seslendir.mjs` (ElevenLabs, `elevenlabs_api_key`), `tools/sfx.mjs` (ses efekti). Ücretsiz plan: kütüphane sesleri (Umut Canbay, TR) ve müzik API'si kapalı; ticari kullanım için Starter plan gerekli.
- **Ses klibi kenarı (cıt yok, kullanıcı kararı Evliya):** her üretilen ses klibi `python3 -I tools/ses_kenar.py kontrol` ile ölçülür. `CIT` (baş/son 5 ms > −40 dBFS) → `duzelt` (öne 40 ms sessizlik + fade, .json zamanları kayar). `KESIK` (son > −20 dBFS: kelime yarıda; eleven_v3 sık yapar) → yeniden üretilir, birkaç çekimden temiz biteni seçilir. Kullanıcıya dinletilen her birleştirmede klipler loudnorm ile eşitlenir (anlatım −18, replik −19 LUFS). Dalga formu (`showwavespic`) kullanıcıya göndermeden önce bakılır.
- Ses efekti zamanlaması: tepe noktasını ölç (ffmpeg → python), ses dosyasını temas karesine hizala.
- Wikimedia bu sunucudan 429 verir; Wikipedia aynası (kiwix) çalışır.

## Git
- Repo: `aksoycml-svg/kosmos-vize-bot`, **sadece `instagram-kanal` branch'i**. `main`'e (vize botu) asla dokunma.
- **"cerensafe" ile ilgili hiçbir şeye dokunma** (kullanıcı yasağı).
- Git komutlarını `git -C <repo> ...` ile çalıştır (`cd … && git` onay penceresi açar).

## Kota
- Her bölüm yeni oturumda. Tam render yerine kontrol kareleri (küçük tek sayfa). Rig/sokak/efekt tekrar kullanılır. Ajanlara sadece ilgili dosyaları ver.
