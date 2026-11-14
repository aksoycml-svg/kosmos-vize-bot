# Sahne planı: Çiçero (yönetmen, 2026-11-14)

Girdi: kilitli `senaryo.md` / `senaryo-en.md`, `dokunuslar.md`, `public/cicero/ses/plan-sureleri.json` + `ses/{tr,en}/Pxx.json` kelime zamanları, `src/kit/KATALOG.md` + `sinirlar.json`. **`bolum.json` bu aşamada yazılmadı** (1940'lar kiti yok; önce kurulum ekibi). Bu belge kurulacak şeyleri belirler; kit gelince makine hâli `bolum.json`'a çevrilir.

**Kontrol kareleri RENDER EDİLEMEDİ** (şablonlar kitte yok, kural 7 uygulanamaz). Kamera `cs/cx/cy`, x/y ve z/u değerleri hesapla üretilmiş **önerilerdir**; kalibrasyon karelerinde ölçülüp bu belgeye geri işlenir (plan tek gerçek kaynaktır).

60 fps, 1080x1920. `p` = plan içi kare; mutlak = plan başlangıcı + p. Güvenli alan: üst 220, alt 420 (y ≤ 1500), yan 80. Yazı bantları: üst 240–400 (ekran yazısı), alt 1290–1490 (altyazı). **Tüm dokunuş/temas/kurulum nesneleri y 420–1290 arasında** tutulur (alt bant altyazıya ve zemine/gölgeye kalır; ayak y ≤ 1280).

## 0. Süreler (gerçek ses; anahtar planlarda tutma uzatıldı)

Kural: `plan = max(TR, EN) + 0.4` (ses), anahtar planda `okuma sonu (TR) + 1.5 sn`. Dört plan değişti: P06 8.32 → 9.17, P07 5.00 → 5.87, P10 5.65 → 6.50 (P06 yalnız +1.5 kuralına). Toplam **3890 kare = 64.83 sn** (≤ 65 ✓; ses plan başından kare 0'da).

| Plan | Mutlak kare | Mutlak sn | Süre sn (kare) | Ses | Not |
|---|---|---|---|---|---|
| P01 | 0–438 | 0.00–7.30 | 7.30 (438) | TR 6.65 / EN 4.84 | ses değişmedi |
| P02 | 438–787 | 7.30–13.12 | 5.81 (349) | 5.18 / 4.56 | |
| P03 | 787–1221 | 13.12–20.35 | 7.24 (434) | 6.61 / 5.19 | |
| P04 | 1221–1603 | 20.35–26.72 | 6.36 (382) | 5.71 / 4.22 | |
| P05 | 1603–1850 | 26.72–30.83 | 4.11 (247) | 3.48 / 2.91 | |
| P06 ★ | 1850–2400 | 30.83–40.00 | **9.17 (550)** | 7.67 / 5.04 → tutma +1.5 | 8.32'den +0.85 |
| P07 ★ | 2400–2752 | 40.00–45.87 | **5.87 (352)** | 4.36 / 3.77 → +1.5 | 5.00'den +0.87 |
| P08 | 2752–3130 | 45.87–52.17 | 6.30 (378) | 5.65 / 3.51 | |
| P09 | 3130–3500 | 52.17–58.33 | 6.17 (370) | 4.98 / 5.53 | |
| P10 ★ | 3500–3890 | 58.33–64.83 | **6.50 (390)** | 4.99 → +1.5 | 5.65'ten +0.85 |

Uzatılan 3 plana ses kayıt dosyası değişmez; sonuna sessizlik eklenir (teknisyen: mp3 sonuna pad değil, plan `ses` bitince kalan = sessizlik). `plan-sureleri.json` bu yeni değerlerle güncellenir (sahibi orkestra/teknisyen). Plan uzunluk dizisi 7.3 · 5.8 · 7.2 · 6.4 · 4.1 · 9.2 · 5.9 · 6.3 · 6.2 · 6.5 (üst üste 5 benzer yok; P07–P10 dörtlüsü 5.9–6.5, P09 içinde plan içi kesme var).

## 1. Genel kararlar

- **Mekân (3 şablon, ≤4 ✓):** (1) **ELÇİ-ODASI** = IC-ODA'ya yeni `oda: "elci-yatak"` (P02, P03a, P04, P08, P09b), (2) **ARABA** = yeni şablon, `gorunum: "ic"` (P01, P05) ve `"dis"` (P09a), (3) **MASA-INSERT** yeni masa/prop'larla: `masa: "komodin"` (P02a, P03b, P04a), `"berlin"` (P06), `"bazna"` (P07, P10). **HARITA, SOKAK, YAKIN-YUZ gerekmez**: Berlin haritası masa prop'u, sokak ARABA.dis katmanı.
- **Kamera dilini en aza indir:** plan içi kesme (`devam_plan`) yalnız eylem bittiğinde; her biri aşağıda taşıyıcıyla yazılı. Whip/darbe/sarsıntı yok (savaş konusu, gösteri yok).
- **Işık (tek kaynak, tüm bölüm):** iç mekânda görünen lamba. ELÇİ-ODASI gece: **başucu lambası** (komodinde, eğilebilir boyunlu, koyu abajur); huzme, havuz ve gölge bu tanımdan türer. İstisna (dokunuşlar.md): banyo kapısı altı şeridi = ikinci, görünür kaynak, yalnız kapı altı zemininde kendi küçük havuzu. ELÇİ-ODASI gündüz (P08): pencereden (arka duvar), lamba sönük. ARABA.ic gün: pencereden sağ-üst-arka (kenar ışığı); ARABA.dis alacakaranlık: batı parıltısı + elçilik penceresi sıcak. Berlin: tek soğuk-nötr masa lambası (sağ-üst). Bazna masası: aynı başucu lambası prop'u (sol-üst, sıcak).
- **Renk (Paris dersleri):** sıcak–soğuk karşıtlık (gölge mavi-mor, ışık gül-altın), arka derinlik flu, gravür taraması + kâğıt dokusu. **Beyaz banknot tek imza nesnesi:** sahnenin geri kalanı C* ≤ 28 ve L* ≤ 88; belge sarımsı-gri, mum bal, zarf kraft, film kutusu siyah, fincan koyu mavi emaye, tepsi koyu metal, **Bazna gömleği kırık krem (beyaz değil)**. Kırmızı yalnız P07 çarpısı; P07 ekran yazısında `vurgu` verilmez.
- **Altyazı:** önerim `altyazi {acik: true, bant: "oto"}` (ses kapalı izleyen için; KT). Alt bant (1290–1490) hiçbir planda dokunuş/kurulum içermez, bu yüzden altyazı alt bantta kalır. Replik yok. Karar orkestranın (varsayılan: açık).
- **Karakterler (1940'lar):** Bazna (Kukla, koyu füme ceket + yelek, krem gömlek, şapkasız; yüz nötr orta yaş, ayırt edici işaret kanıtsız → eklenmez), elçi (yaşlı, **yüzsüz, hep sırtı/eli**, koyu robdöşambr kolu), yetkili (yüzsüz siluet, koyu takım), Moyzisch'in yerindeki kompars + sekreter (yüzsüz siluet; ana kadrodan ayrışır, Bazna yüzü kopyalanmaz). Hepsi "yüzsüz" olduğundan yön/duruş siluetle okunur (kenar ışığı, eğik baş).
- **Ses (savaş konusu):** riser/whoosh yok; yalnız temas foley (−5/−9 dB). Foley adları `cic_*` (dokunuslar.md) + aşağıdaki yeni adlar; dosyalar henüz yok. Görünmeyen kaynak yalnız çok kısık ortam (banyo suyu P03).
- **EN/TR görüntü paylaşır:** EN tek plan içinde bazı cümleleri TR'den önce bitirir (P03, P04, P06, P08 EN kısa); görüntü uzun dile (TR) göre kurulu, EN'de görüntü sesin 0.4–2 sn gerisinde kalan planlar var (P04 en çok: EN "put everything back" p203, görüntü yerine koyma p332). Kabul edilmiş, kural gereği (`plan = uzun dil`).

## 2. Plan tablosu (özet)

Sütunlar: ölçek = çekim ölçeği ve plan içi değişim · tempo = hizli/nefes/bekle · ★ = anahtar.

| Plan | Şablon / görünüm | Ölçek (değişim) | Ana hareket (TEK) | Dokunuş (p) | tempo | kontrol_kare (p) |
|---|---|---|---|---|---|---|
| P01 | ARABA ic, gün | göğüs/orta (iki profil bel) → yavaş push (banknot ön planda insert boyutu) | banknot elden ele geçer, cebe girer | (kanca, dokunuşsuz) | hizli | 24 |
| P02 | MASA-INSERT komodin (p0–150) → ELÇİ-ODASI gece (p150–349) | insert → boy/geniş | elçi kutuyu kilitler, anahtarı komodine bırakır, banyoya gider | D "anahtar komodinde" p14–150 | nefes | 100 (+ 230) |
| P03 | ELÇİ-ODASI gece (p0–52) → MASA-INSERT komodin (p52–434) | orta/bel → insert → yakın insert | Bazna anahtarı muma bastırır | D "mum izi" p150–358 | bekle | 340 |
| P04 | MASA-INSERT komodin (p0–58) → ELÇİ-ODASI gece (p58–382) | insert → bel/orta → iki-kişi orta | belgeleri fotoğraflar | D "kapı altı ayak gölgesi" p215–330 | hizli | 270 |
| P05 | ARABA ic, gün | göğüs/eller (insert boyutu) → orta (pull-back) | film kutusu ↔ zarf değişimi | (bilerek yok) | nefes | 80 |
| P06 ★ | MASA-INSERT berlin, tepe-egik | orta-geniş → yakın (çekmece push-in) | Berlin dosyayı çekmeceye atıp kapatır | D "dolu çekmece, sıkışan köşe" p200–446 | bekle | 500 |
| P07 ★ | MASA-INSERT bazna, tepe | insert → yakın insert (banknot) | zarf açılır, para sayılır, sahtesi çarpılır | D "bakmadan sayılan para + çarpı" p30–254 | hizli (patlama: çarpı) | 300 |
| P08 | ELÇİ-ODASI gündüz | bel → insert-el (fincan) → bel/orta | yetkili bakmadan fincanı alır, Bazna geçip çıkar | D "bakmadan alınan fincan" p120–170 | nefes | 160 |
| P09 | ARABA dis, alacakaranlık (p0–170) → ELÇİ-ODASI gece (p170–370) | geniş → göğüs/bel | (a) sekreter kaçar; (b) lamba söner | D "lamba söner" p240–330 | hizli | 270 (+ 100) |
| P10 ★ | MASA-INSERT bazna, tepe | insert | banknot lambada tutulur, elden kayar → P01 | (kapanış, dokunuşsuz) | bekle | 200 |

Tempo dizisi: hizli · nefes · bekle · hizli · nefes · bekle · hizli · nefes · hizli · bekle (üst üste üç aynı yok). **Dinlenme ≥1 sn:** P09b p292–370 (1.3 sn, kararmış oda, sessiz), P03 p358–422 (1.07 sn yarım çizim), P06 p460–550 (1.5 sn). **Patlama:** P07 p238 (çarpı: tek sert vuruş, tek foley, kamera durur).

## 3. Plan ayrıntıları

Her planda: karakter yeri, ışık, temas (p), saklanan şey, okunurluk, yazı, ölü alan, taşıyıcı.

### P01 · 0–438 · ARABA ic (kanca)
- **Ölçek:** iki profil bel plan (oturan, Bazna sağda, yüzsüz kompars solda); banknot ön planda, uzun kenarı ≥ 260 px (ekran yüksekliğinin %13.5'i; ön plan eli kameraya yakın, stilize büyük). Kamera yavaş push cs 1.0 → 1.2 (p150–438, itme `kamera_dil`).
- **Düzen:** oturan figürler: kompars sol, Bazna sağ (yön: birbirine dönük, profil); koltuk sırtı alt-orta; arka yan pencere: ELÇİLİK cephesi flu (x 600–950, y 470–760), 2. kat penceresinde ışıklı daktilo silueti (ekranda ≈ 70 px, sıcak pencere, kolları titrer). Kapı paneli + kol dayama alt dolgu (y 1290–1500: koltuk dikişi, kapı kolu, gölge). Araba **duruyor** (park; motor titremesi ≤ 2 px).
- **Zaman (p):** 0–42 kompars eli koltuk üstünden banknotu kaydırır (**p0'da yolun ortasında**, hareket ilk karede) → p42 Bazna'nın parmakları kavrar · 42–100 Bazna banknotu tutar, kamera boş (arka) yüzünü görür, bakmaz · 100–150 iç ceket cebine koyar (**biter p150**) · 150–438 tutma (Bazna profil, eli cep üstünde; daktilo silueti tıkırdar; kamera push).
- **Ses:** TR "sahte çıktı" p358–400, EN "fake" p267 (görüntü cep anı tutuyor; yük sözde).
- **Temas:** `cic_banknot_kavra` p42 · `cic_kagit_cep` p138. Ortam: daktilo tıkırtısı (görünür kaynak, çok kısık) p0–438.
- **Işık:** pencereden gün ışığı sağ-üst-arka; banknot beyaz, diğer her şey ≤ L* 88.
- **Saklanan şey:** banknotun **ön yüzü** (kamera arka/boş yüzü görür, kenar ışıkla). Cevap P07 (ön yüz) ve P10 (boş yüz, eşleşen kesme).
- **Yazı:** üst bant: "ANKARA · 1943" p0–170; etiket "Elyesa Bazna · kod adı Çiçero" p180–430 (ikisi ardışık, çakışmaz; dokunuş y 700–1200).
- **Okunurluk beyanı:** banknot uzun kenar ≥ 260 px; hareket net ≥ 1.4 sn (p0–84).
- **Ölü alan:** alt üçte bir koltuk + kapı paneli + kol dayama + gölge; üst üçte bir cephe + gök + daktilo pencere.
- **Taşıyıcı P01→P02:** **ses**: daktilo tıkırtısı (ritim) p420–438 sonunda 0.4 sn P02 başına taşar, oda başında anahtar çevirme tıkına dönüşür. Çıplak değil.

### P02 · 438–787 · MASA-INSERT komodin → ELÇİ-ODASI (anahtar komodinde)
- **a) p0–150 MASA-INSERT `masa: komodin`, `aci: tepe-onden`:** koyu ahşap komodin üstü (başucu lambası tabanı sol-üstte, abajur ışığı sağ-üst-arkadan değil lambadan; kutu ortada). Kutu: koyu deri, kapağı açık, **kilit ağzı ön kenarda**, anahtar elçinin parmaklarında. cs 1.0 → 1.15.
  - Elçinin eli (koyu robdöşambr manşeti, yaşlı) **sağdan girer** (giriş gösterilir) · p14 kapak iner (`cic_kutu_kapak`) · p28 anahtar kilide girer (`cic_anahtar_kilit_giris`) · p46 çevrilir (`cic_kutu_kilit_tik`) · p62 çıkar · p74 komodine bırakılır (`cic_anahtar_komodin_cin`, kısık) · p74–96 el sağa çıkar (kadrajdan çıkar, tamam p96). **Anahtar net p74–150 (76 kare = 1.27 sn ≥ 1.2 ✓).** Anahtar uzun kenarı ≥ 200 px (%10.4 ✓), sıcak kenar ışığı, komodin keçesinde tek parlak metal.
  - Saklanan şey: kutunun içi (kapak kapalı).
- **b) p150–349 ELÇİ-ODASI `oda: elci-yatak`, `isik: lamba` (gece), cs 1.0 → 1.12, cx −80 (sağa eğilim):** boy/geniş. Yerleşim (öneri, mekân sorumlusu doğrular): komodin + kutu + lamba arka duvarda yatağın sağında; **banyo kapısı arka duvarda sağda** (kapı altı zemini y ≈ 1190–1200); giriş kapısı sol yan duvarda (kadraj kenarı); Bazna içeride sol-önde, tepsi elinde; **z 3.6 (ayak y = 760 + 1840/3.6 ≈ 1271 ✓ < 1290)**; elçi komodin önünde sırtı bize, aynı z 3.6.
  - Elçi p158–222 komodinden banyo kapısına **sağdaki açık koridordan** yürür (yatak ve komodin dışında yol ≥ 0.8 m), kapı açılır p210, girer p226, **kapıyı kapatır p246** (`cic_banyo_kapi_kapanis`), kapı kapanırken huzme daralır, şerit p248 (`cic_su_baslar` kısık) · Bazna p254–330 komodine yürür (4 adım, gait, `cic_adim_hafif` p268/284/300/316) ve **p330'da durur** (≤ 337 ✓, tamam).
  - Bazna'nın bakışı p230–254 kapı → komodin anahtarı yönüne kayar (`bak`, jest yok).
- **Ses:** TR "kilitli bir kutuda" p234–284 (görüntü: geniş, kutu uzakta kilitli) · EN "locked box" p204–239.
- **Dokunuş "anahtar komodinde"** p14–150 (başlar–biter kendi planında ✓).
- **Yazı:** üst bant "Elçi · Sir Hughe Knatchbull-Hugessen" p150–330 (b'de; kapıda/elçi yüzü yok; dokunuşu örtmez).
- **Ölü alan:** a) komodin gövdesi + halı gölgesi alt üçte; b) yatak ayak ucu yorgan, döşeme tahtası, komodin alt kısmı.
- **Taşıyıcı P02→P03 (kamera devam):** son kamera (cs 1.12, cx −80) P03 başlangıcı **eşit**; kapı altı şerit + lamba aynı konumlarda; anahtar P03'te komodinde aynı yerde.

### P03 · 787–1221 · ELÇİ-ODASI → MASA-INSERT komodin (mum izi)
- **a) p0–52 ELÇİ-ODASI** (P02 son kamera): Bazna komodin yanında durur (P02'den gelişi gösterildi), başı kapıya (dinler, `bak`), banyo suyu kısık. p8–34 yelek cebinden **bal rengi mum parçası** avucuna alır (giriş gösterilir). Anahtar komodinde net.
- **b) p52–434 MASA-INSERT `komodin`, cs 1.0 → 1.5:** el + mum ekran yüksekliğinin ≥ %25'i. p58–90 Bazna anahtarı komodinden alır (`cic_anahtar_al` p84) · **p150 anahtarı muma bastırır** (`cic_mum_bas_yumusak`) · p170 kaldırır (tamam) · iz net p170–358 (3.1 sn; iz ≥ %14 → mum prop ≥ 270 px, cs 1.5'te) · **p262–358 iz üstünde ince anahtar çizimi kendini çizer ve p358'de yarıda durur** (`cic_cizgi_kalem_hafif` p270–358, kısık) · **yarım tutma p358–422 (1.07 sn)**.
- **Saklanan şey:** yarım anahtar çizimi (kopya anahtar yok). `lint: {izin: [hareket-tamamlanma], not: "yarım çizim senaryo saklanan şeyi (dokunuslar.md P03)"}`.
- **Dokunuş "mum izi"** p150–358; plan sonu 434, en geç animasyon p358 (≤ 422 ✓).
- **Ses:** TR "anahtarın izini" p163–, "bastırdı" p281; EN "pressed" p88–"wax" p136. Görüntü bası p150: EN 0.4–1 sn önce söyler, TR 0.6 sn sonra (kabul, bkz. §1).
- **Yazı:** üst bant "Kaynak: Bazna ve Moyzisch'in kendi anlatısı" p60–340. Nesneler y 560–1100 ✓.
- **Ölü alan:** b) alt üçte komodin ahşap kenarı + çekmece pervazı + yer gölgesi; üst üçte duvar + lamba abajur kenarı.
- **Taşıyıcı P03→P04 (eşleşen kesme, ekran merkezi):** yarım anahtar çizimi ucu ekranda (540, 840) → P04 ilk karede kopya anahtar ucu aynı noktada kilit ağzına girer; cs eşit (1.5), kutu komodinde iz yanında (0.22 m) olduğundan merkez eşitlenir, kamera hareketi sayılmaz.

### P04 · 1221–1603 · MASA-INSERT komodin → ELÇİ-ODASI (belgeleri çeker; kapı altı ayak gölgesi)
- **a) p0–58 MASA-INSERT `komodin`** (P03 son cs 1.5): **p10 kopya anahtar kilide girer** (`cic_anahtar_kilit_giris`) · **p30 çevrilir** (`cic_kutu_kilit_tik`) · p34–46 kapak açılır (`cic_kutu_kapak_ac` p40), tamam p46. Kesme p58: eylem bitti (12 kare pay).
- **b) p58–382 ELÇİ-ODASI gece (bel → orta iki-kişi):** cs 1.5 (cx 0) → **p200–240 cs 1.7, cx −240** (komodin + kapı + yatak kenarı; Bazna z 3.6 komodin yanında, kapı sağda).
  - p62–84 belge destesini alır · p84–104 yatağa yönelir · **p104 başucu lambasının boynunu çevirir** (havuz yatağa kayar, `cic_lamba_boyun_gicir` kısık) · p104–130 belgeleri yatağa yayar (`cic_belge_yay_hisirti` p112, p124), tamam p130 · p130–150 yelek cebinden küçük **fotoğraf makinesi** çıkarır (giriş gösterilir) · **deklanşör p150, p172, p194** (`cic_deklansor_tik` ×3, −9 dB; makine belgelerin üstünde bel hizasında, ışık havuzunda).
  - **Dokunuş p215–330 "kapı altı ayak gölgesi":** p215 su kesilir (`cic_su_kesilir`) · p228/238/248 üç terlik adımı (`cic_terlik_adim` ×3, kısık), iki ayak gölgesi kapı altı **sıcak kehribar şeritte** yaklaşır ve **p248–312 durur (64 kare = 1.07 sn ≥ 1.0 ✓)** · Bazna p232–312 donar (nefes tutar; kamera iki-kişi) · p312–328 gölgeler çekilir · **p330 su yeniden** (`cic_su_tekrar`). Şerit+gölge bölgesi ≥ 192 px (cs 1.7).
  - p332–346 belgeleri toplar · p348 kutuya (`cic_belge_kutu_hisirti`) · **p358 kapak kapanır** (`cic_kutu_kapak_tok`) · p362–370 **siyah film kutusu cebe girer** (**biter p370 = plan sonundan 12 kare önce ✓**). **Tepsiyi alma/kapıya dönme çıkarıldı** (süre yetmiyor; senaryo P04 son görüntüsünden sapma, anlatıma zarar vermez; bildirilmiştir). Tepsi P03 başından komodin kenarında kalır, P08'de Bazna tekrar elinde (süreklilik: P04'te tepsi komodinin sol kenarında görünür kalmalı).
- **Saklanan şey:** film kutusu cebe girer, ne çekildiği gösterilmez (belge yazısı dil-nötr, okunmaz).
- **Işık:** lamba havuzu (sıcak) belge + makine; ikinci kaynak banyo şeridi (kehribar, kapı altı zemininde). Gölge yönü iki kaynak için ayrı, her biri kendi havuzunda.
- **Sıkışıklık (risk, dokunuslar.md notu):** 6.36 sn'de kilit + serme + 3 çekim + gölge + toplama. Sıkışırsa sırayla çıkar: toplama jesti (kutuya belge) → serme kısalır; gölge anı ve film kutusu cebe girişi korunur.
- **Yazı:** üst bant "Ekim 1943 → Nisan 1944" p10–210 (gölge dokunuşunda yazı yok, y 240–400 dışı).
- **Ölü alan:** a) alt üçte komodin ahşap + kutu içi gölge; b) yatak yorgan + döşeme + lamba havuzunun kenarı.
- **Taşıyıcı P04→P05 (eylem eşleşmesi, el):** p370'te Bazna'nın eli cebe girer (sağ-alt köşe, koyu ceket) → P05 p0 aynı ekran noktasında el cepten **siyah film kutusuyla** çıkar (aynı ceket, aynı yön). Farklı mekân/zaman, ceket yüzeyi aynı koyu.

### P05 · 1603–1850 · ARABA ic (kutu ↔ zarf)
- **Ölçek:** eller/insert boyutu (cs 1.8: kutu uzun kenarı ≥ 130 px stilize 1.4×, zarf ≥ 350 px; bölge ≥ %25) → **p120–247 pull-back cs 1.8 → 1.0** (iki figür + pencere + cephe). Tek kamera, 2B zoom.
- **Hareket (TEK):** p0–40 Bazna kutuyu uzatır · **p44 kompars (Moyzisch yerine) kavrar** (`cic_kutu_tutus`) · p60–110 kompars zarfı verir · **p84 Bazna kavrar** (`cic_zarf_tutus`) · p110–140 zarfı kucağa koyar, **açmaz** (`cic_zarf_kucak` p118, yumuşak) · tamam p140 · p140–247 tutma, pull-back, pencere dışı cephe + P01'de kurulan daktilo silueti (yalnız burada hâlâ yazar).
- **Saklanan şey:** zarfın içi (P07'de açılır). Zarf **kraft/tütün**, kalın; beyaz değil.
- **Işık:** pencereden gün, sağ-üst-arka (P01 ile aynı).
- **Yazı:** üst bant iki ardışık: "Moyzisch · Alman elçiliğinde görevli" p20–150, "söylenene göre ilk fiyat ~20.000 £" p150–240.
- **Ölü alan:** alt üçte koltuk kenarı, kapı paneli, kucakta zarf gölgesi.
- **Taşıyıcı P05→P06:** **çıplak kesme #1** (Ankara → Berlin, mekân sıçraması). Gerekçe: bölümün tek bilinçli yer değişimi; ses de kesilir (araba/daktilo ortamı biter, masa lambası gürültüsü ve tok kâğıt sesi).

### P06 ★ · 1850–2400 · MASA-INSERT berlin, tepe-egik (anahtar: çekmece)
- **Ölçek:** orta-geniş (masa üstü + harita, p0–385) → **yakın çekmece push-in cs 1.0 → 1.5 (p385–470)**, yakın tutma p470–550. Tutma 1.5 sn (anlatım TR p460'ta biter, plan p550).
- **Düzen (ekran px, cs 1.0):** arka duvar şeridi y < 520 (üst bant yazı arkada); koyu maun masa; **harita prop** (Fransa kuzey kıyısı kontur, sade; **Normandiya bölgesi küçük dairesel işaret**, dil-nötr, y 620–780, kadrajın üst yarısı) ortada; **çekmece masa ön kenarında** (ön panel y 1100–1260, kameraya bakar, açılınca öne kayar ve içi yukarıdan görünür); soğuk masa lambası tabanı sağ-üstte. Eller iki **yüzsüz manşetli kol** (koyu gri-yeşil, ayırt edici nesne yok; rütbe/arma yok).
- **Zaman (p):** 0–60 eller film baskısı **dosyayı** sağdan haritaya koyar (`dosya` prop, `kapak: 1` kapalı; `cic_dosya_masa_tok` p56) · 60–140 dosya haritanın üstünde, Normandiya işareti kenarda okunur · **145–190 el dosyayı ileri iter** (reddetme, `cic_dosya_kayma` p165); "başlarını sallıyor" jesti kitte yok → bkz. `kit_eksik` (yedek: yalnız itme) · **200–250 çekmece açılır** (`cic_cekmece_kayma` p215), içi **ince, okunmamış dosya yığını** · 290–330 **ikinci dosya aynı yoldan atılır** (`cic_dosya_at_hisirti` p312; Normandiya dairesi kadrajda) · 385–470 kamera çekmeceye push · **p420–440 çekmece itilir, p440 kapanır** (`cic_cekmece_tok`) · dosyanın **bir köşesi ağızda sıkışıp dışarıda kalır** · p446–480 eller çekilir (kadrajdan çıkar) · **tutma p470–550** (köşe net 1.3 sn ≥ 1.0 ✓).
- **Dokunuş "dolu çekmece, sıkışan köşe"** p200–446 (≤ 538 ✓).
- **Ses:** TR "güvenmedi" p189, "Çoğunu" p256, "Normandiya" p319, "kullanmadı" p425–460; çekmece kapanışı p440 "kullanmadı" ile aynı an. EN "included" p257–287 → EN'de görüntü 2.5 sn geride (kabul).
- **Saklanan şey:** çekmecenin içindekiler (yığın, okunmaz); sıkışan köşe "düzgün kaldırılmadı" ironisi.
- **Yazı:** üst bant "Berlin: “tuzak olabilir” (söylenene göre)" p140–330, duvar şeridinin üstünde; çekmece dokunuşunu örtmez.
- **Okunurluk:** çekmece ≥ %20 ekran yüksekliği (cs 1.5'te ✓), sıkışan köşe net 1.3 sn.
- **Ölü alan:** alt üçte çekmece önü + masa kenarı gölgesi + ahşap damarı; harita üst yarıda kaldığı sürece orta üçte dolu.
- **Taşıyıcı P06→P07 (şekil eşleşmesi):** sıkışan beyazımsı-sarı dosya köşesi (sağ-alt üçgen, masa ön kenarı) → P07 p0'da **zarf ağzının kraft köşesi aynı üçgen, aynı konum/açı**; masa kenarı çizgisi devam eder, ışık sağ-üstten aynı yönde (soğuk → sıcak geçiş sonra).

### P07 ★ · 2400–2752 · MASA-INSERT bazna, tepe (banknot)
- **Ölçek:** insert (zarf + dökülen banknotlar, cs 1.0) → **p150–215 iki banknota kamera cs 1.0 → 1.45** (`cx` ±120 sınırı içinde ikisi arasında gidip gelir) → tutma. Banknotlar ≥ %30 ekran yüksekliği (stilize büyük).
- **Düzen:** sade tahta masa, tek **başucu lambası** tabanı sol-üst kenarda (aynı prop, sıcak havuz); P05 zarfı (kraft) ortada; **bazna eli** (koyu ceket manşeti, krem gömlek kolu).
- **Zaman (p):** 0–40 el zarfı açar (`cic_zarf_ac` p30; ağzı P06 köşe üçgeni) · **40–70 banknotlar masaya dökülür** (`cic_banknot_dokul` p56) · **70–150 el bakmadan sayar** (kafa kadrajda yok; `cic_banknot_say` p78–150, tek hışırtı) · **150–215 kamera iki banknota girer: ikisi birebir aynı**; ikisi arasında gidip gelir (p170 sol, p195 sağ, p215 orta), diğer hareket yok · **p238–254 iki fırça vuruşuyla küçük kırmızı çarpı** sağ banknotun köşesinde (`cic_carpi_firca` p238 ve p250, çok kısık; çarpı alanı ≤ %8, tek kullanım) · **net p254–352 (1.6 sn ≥ 1.0 ✓)**, kamera durur (kapanış anı).
- **Banknot (imza):** sıcak beyaz (en parlak, en doygun-sıcak nokta), **tek yüz siyah mürekkep dil-nötr soyut çizgi, portre/rakam/yazı yok; arka boş**; sahnenin geri kalanı mat. Kırmızı çarpı sahnedeki tek kırmızı.
- **Ses:** TR "sahteydi" p228–262; çarpı p238–254 sözün bitişiyle aynı an; EN "fake" p206 (EN'de çarpı 0.5 sn geride).
- **Dokunuş "bakmadan sayılan para + iki aynı banknot + çarpı"** p30–254 (≤ 340 ✓). **Patlama etiketi: p238** (tek vuruş).
- **Saklanan şey:** sahteyi kimin bastığı (P10).
- **Yazı:** üst bant `tur: sayac` "sözde ~{n} £ · çoğu sahte" (sayac hedef 300000, bas p60, sure 100; `vurgu` verilmez → kırmızı yok), p60–340.
- **Ölü alan:** alt üçte masa ahşabı + lamba havuzunun kenarı + dökülmüş diğer banknotların kenarı + masa gölgesi.
- **Taşıyıcı P07→P08:** **ses köprüsü**: sayma/dökülme hışırtısının kuyruğu (0.4 sn) P08 başında yetkilinin kutudaki belgeleri karıştırma hışırtısına dönüşür; görüntü yönü: P07 son durağan kare aşağıdan tepe → P08 yatay oda (yön çakışması yok). Çıplak sayılmaz (ses taşıyıcı); **aynı geçiş tipi üst üste kullanılmadı** (P06→P07 şekil, P07→P08 ses).

### P08 · 2752–3130 · ELÇİ-ODASI gündüz (bakmadan alınan fincan)
- **Ölçek:** bel plan (cs 1.4, yetkili + açık kutu + Bazna girişi) p0–100 → **p100–150 push cs 1.4 → 2.2** (yetkili eli + tepsi) → p150–230 insert-el (fincan net) → **p230–300 pull-back cs 2.2 → 1.5** (boş oda, yetkili kutuya bakar) → p300–378 tutma (yavaş push 1.5 → 1.6).
- **Düzen:** gündüz, pencere arka duvar (ışık karşıdan); komodin üstü kutu **açık**, içinde sarımsı belge yığını kenarı (okunmaz); lamba sönük. **Yetkili** (yüzsüz siluet, koyu takım) z 3.6'da komodin önünde, kutuya eğik, sol eli çenesinde (ışık siluet); **Bazna kontra (arkadan pencere ışığı) siluet, başı eğik, yüzü hiç görünmez**, koyu metal tepsi üstünde **koyu mavi emaye fincan**; yürüyüş yönü **sağdan sola** (P02'de Bazna giriş kapısı soldaydı; giriş kapısına yürür).
- **Zaman (p):** 0–100 yetkili kutuya bakar; Bazna p30'da sağ kadraj kenarından girer (giriş) · p40/60/80… `cic_adim_hafif` (kısık) · **p120–170 dokunuş:** yetkili **bakmadan** sağ elini geri-öne uzatır (p120), fincanı kavrar (**`cic_fincan_tin` p142**), geri çeker (p160) · Bazna durmadan geçer, **p230'da kadrajdan sol-dışına çıkar** (tamam; yetkili hiç dönmez) · yetkili elinde fincanla kutuya bakmaya devam eder.
- **Dokunuş "bakmadan alınan fincan"** p120–170; fincan net p142–230 (88 kare = 1.47 sn ≥ 1.2 ✓). El + fincan bölgesi ≥ %12 (cs 2.2'de ≥ 230 px ✓).
- **Saklanan şey:** uşağın yüzü (hiç görünmez).
- **Ses:** TR "Bazna bunu bilmiyordu" p6–110 (Bazna girişi), "İngilizler sızıntıyı fark etmişti" p111–, "bulamıyordu" p302–340 (tutma).
- **Yazı:** üst bant "1943 sonu: sızıntı fark edildi" p120–340.
- **Ölü alan:** alt üçte yetkili bacakları/dizleri, halı/döşeme, komodin gövdesi; (ayaklar y ≈ 1271 ≤ 1290 ✓).
- **Taşıyıcı P08→P09:** **ses**: Bazna'nın çıkış adımı kuyruğu → P09 başında daktilo tıkırtısı + uzak araba motoru (düşük). Çıplak değil. Not: P07→P08 ve P08→P09 ikisi de ses taşıyıcı (tasarlanmış görsel geçiş değil); kurgucu iki köprüde farklı malzeme kullanır (hışırtı vs adım/motor).

### P09 · 3130–3500 · ARABA dis (a) → ELÇİ-ODASI gece (b)
- **a) p0–170 ARABA `gorunum: dis`, `saat: alacakaranlik` (geniş, cs 1.0 → 1.1):** elçilik cephesi (x 500–1000), 2. kat penceresinde **P01/P05'te kurulan daktilo silueti** (şimdi ≈ 160 px, sıcak pencere), alt kat **bina kapısı** (x 720–800, y 980–1250), kaldırım (y 1250–1280 ayak hattı; ayak ≤ 1280 ✓), yol (y 1290–1500 asfalt dokusu + araba gölgesi, kapanış dolgusu), **2. araba** kaldırım kenarında park (yan profil, koyu; P01/P05 aracından farklı renk).
  - p0–20 daktilo yazar · **p20–38 sekreter kalkar** (`cic_sandalye_it` p30; pencere boş kalır, ışık yanık) · **p56–74 kapıdan çıkar** (`cic_bina_kapi` p62) · **p74–108 hızlı yürür** (`yuru {cozucu: gait, tur: walk}`, kaldırım üstünde x yolu, **basışlar `cic_adim_kaldirim` p84, p92, p100, p108**, son basış plan-içi kesmeden ≥ 12 kare önce ✓) · **p108–120 arabaya biner** (`cic_araba_kapi_tok` p120) · **p124–156 araba hızlanıp sağ kadraj dışına çıkar** (`cic_araba_gider` kısık, görünür kaynak) · p156–170 boş kaldırım/yol, toz oturur (kapanış). Yürüyüş yolu fiziksel açık: kapı → kaldırım → araba kapısı, duvar/direk yok. Bavulsuz.
  - **Yön:** sekreter kapıdan çıkıp kaldırımda **sağa**, park arabaya yürür; araba sağ kenardan çıkar (P08'de Bazna sola çıkıyordu; yön eşleşmesi aranmadı, P08→P09 taşıyıcısı yalnız ses).
- **b) p170–370 ELÇİ-ODASI gece (gece penceresi mavi), cs 2.2 (göğüs/bel, lamba ≥ %12 ✓, 260 px):** Bazna komodin önünde, makine elinde, soldan 3/4 profil (yüz ışık dışı). **p190–222** komodin çekmecesini açar, **makineyi koyar**, kapatır (`cic_cekmece_kucuk` p215) · **p232–262** lambaya uzanır, **p262 düğme çevirir** (`cic_lamba_dugme_tik`) · **p262–292 filaman kızıl parlar ve söner** (net 0.5–1.0 sn: filaman görünür, abajur ışık havuzu daralır, sessiz) · **p292–330 oda soluk mavi gece ışığına kalır** (tam siyah yok; pencere tek kaynak, kontrol: p95 L* ölçülecek) · Bazna silüet · **p330–370 dinlenme** (1.3 sn).
- **Dokunuş "lamba söner"** p240–330 (≤ 358 ✓). **Sessizlik = araç:** kararma sessiz, ses yok p290–370.
- **Saklanan şey:** sekreterin yüzü (hiç görünmez).
- **Ses:** TR "sekreteri Amerikalılara kaçınca" p44–160 (a ile örtüşür ✓), "korkup işi bıraktı" p233–300 (lamba söner p262–292 ✓). EN "quit" p232, "afraid of being caught" p277–316.
- **Yazı:** üst bant "1944 baharı" p10–160 (a'da; daktilo penceresi y 480–680 ve kapı y 980+ ✓ bantta değil).
- **Ölü alan:** a) yol asfalt + gölge + araba gölgesi alt üçte; b) komodin gövdesi + yorgan kenarı.
- **Plan içi kesme p170 taşıyıcısı:** **ışık/renk**: a'nın alacakaranlık mavi gök tonu = b'nin pencere mavisi (aynı hex, ölçüyle eşitlenir); ses: araba motoru kuyruğu b'de çekmece tıkırtısına dönüşür.
- **Taşıyıcı P09→P10:** **ışık + ses**: P09 son karede oda soluk mavi, lamba sönük; P10 p0 masa aynı soluk mavi (renk eşit), P10 p24 lamba tık sesi yanar. Çıplak değil.

### P10 ★ · 3500–3890 · MASA-INSERT bazna, tepe (kapanış, döngü)
- **Ölçek:** insert; kamera **geri çekilmez**, yavaş push cs 1.0 → 1.25 (p62–330).
- **Zaman (p):** 0–24 masa soluk mavi gece ışığında, Bazna'nın eli sağdan girer (giriş) · **p24 lamba düğmesine basar, lamba yanar** (`cic_lamba_dugme_tik` p24; huzme lamba başından masaya **uzar**, fade değil, 14 kare, p38'de tam) · p50–62 el masadaki banknotu alır (`cic_banknot_al` p62; P07'den kalan yığının tek banknotu) · **p62–110 banknotu lambanın altına kaldırır** (ışığa tutulur, **boş (arka) yüz kameraya**, tıpkı P01 ile aynı yüz; yüzü boş, "kim bastı?" cevabı sözde) · **p110–352 tutma** (anlatım p300'de biter; tutma 1.5 sn) · **p352–390 banknot elden kayar** (`cic_banknot_kayma` p356, hışırtı) ve **P01 p0'a eşleşen kesme**: banknot ekran pozisyonu (560, 820), açı −12°, uzun kenar 300 px, hız ve yön (sol-alttan sağ-üste) P01 p0 ile **birebir**.
- **Bilinçli match-cut istisnası:** kayma hareketi plan sonunda sürer (P01 p0–42 tamamlar). `lint: {izin: [hareket-tamamlanma], not: "döngü eşleşen kesmesi"}`.
- **Ses:** TR "Sonradan öğrendi:" p7–62 (lamba yanışı p24 sözün içinde), "sırlarına inanmayan Almanlar basmıştı" p170–300; EN p184 biter (görüntü 2 sn geride, tutma uzun).
- **Yazı:** üst bant "Bernhard Operasyonu: Almanya'nın sahte sterlin planı" p90–370 (banknot y 650–1100, bant dışında ✓).
- **Ölü alan:** alt üçte masa ahşabı + lamba havuzu kenarı + elin gölgesi.
- **Saklanan şey:** yok (açıldı). **Döngü:** banknot beyazı kare → P01.
- **Taşıyıcı P10→P01 (döngü):** banknot şekli/konumu/hareketi (yukarıda); ses: banknot hışırtı L-cut P01 p0–20.

## 4. Taşıyıcı ve geçiş özeti

| Sınır | Taşıyıcı | Tür | Çıplak? |
|---|---|---|---|
| P01→P02 | daktilo tıkırtısı → anahtar tıkı (0.4 sn L-cut) | ses | hayır |
| P02→P03 | kamera son durumu (cs 1.12 cx −80), şerit + lamba + anahtar yerinde | kamera devam | hayır |
| P03→P04 | yarım anahtar çizimi ucu = kilit ağzı, ekran merkezi (540, 840), cs eşit | eşleşen kesme | hayır |
| P04→P05 | cebe giren el → cepten kutu çıkaran el, aynı noktada, aynı ceket | eylem eşleşmesi | hayır |
| **P05→P06** | **yok**: Ankara→Berlin mekân sıçraması, ses kesilir, tok kâğıt sesi | — | **evet (#1)** |
| P06→P07 | sıkışan dosya köşesi üçgeni → zarf kraft köşesi, aynı konum/açı | şekil eşleşmesi | hayır |
| P07→P08 | banknot hışırtı kuyruğu → belge hışırtısı | ses köprüsü | hayır |
| P08→P09 | Bazna çıkış adımı kuyruğu → araba motoru | ses | hayır |
| P09→P10 | soluk mavi gece ışığı eşit; lamba tık sesi | ışık + ses | hayır |
| P10→P01 | banknot şekli/konumu/hareketi | döngü eşleşmesi | hayır |

Bölümde çıplak kesme **1** (≤ 3 ✓). Whip/sarsıntı kullanılmadı (savaş konusu; aynı tasarlanmış geçiş üst üste yok). Plan içi kesmeler (P02 p150, P03 p52, P04 p58, P09 p170) her biri eylem bittikten sonra, mekân/kamera taşıyıcısı yukarıda.

## 5. Senaryo → parametre eşlemesi (kural 1)

| Senaryo cümlesi / görsel | Parametre (öneri) | Kit |
|---|---|---|
| "yüzsüz el banknotu Bazna'nın eline kaydırıyor" | ARABA.ic `banknot {kayma: {bas 0, bit 42}}`, kompars `el` | `kit_eksik` KC-P1, KC-S2 |
| "banknotun ön yüzü gösterilmez" | `banknot.yuz: "arka"` (P01, P10), `"on"` (P07) | KC-P1 |
| "binanın penceresinde daktilo başında siluet" | ARABA `dis.pencere_daktilo {yaziyor, kalkis}` | KC-S2 |
| "elçi banyo kapısına gidiyor, kapıyı kapatıyor; kapı altı ışık" | ELÇİ-ODASI `banyo_kapi {kapan p246, serit}`; elçi `yuru` gait | KC-S1 |
| "koyu deri kutu, kapakta anahtar deliği" | prop `kutu {kapak, kilit}` + `anahtar` | KC-P2 |
| "komodinde anahtar" | `komodin` (MASA-INSERT `masa: komodin`), anahtar x/y | KC-S3, KC-P2 |
| "balmumu parça, iz, yarım anahtar çizimi" | `balmumu {iz, cizim: {yarim: true}}` | KC-P3 |
| "kopya anahtar kutuya girer, tık" | `anahtar {kopya}`, `kutu.kilit` | KC-P2 |
| "belgeler yatağa serili, fotoğraf makinesi, tek lamba" | `belge`, `makine`, `lamba {boyun_aci}` | KC-P4, KC-P5 |
| "kapı altı ayak gölgesi, su kesilir" | ELÇİ-ODASI `kapi_alti {golge: [ayak], su}` | KC-S1 |
| "film kutusu cebe girer / arabada verilir" | `film_kutusu`, `cep` jesti | KC-P4 |
| "Berlin: yüzsüz manşetli eller, harita + Normandiya işareti, çekmece" | `harita_masa {normandiya}`, `cekmece {yigin, kose.sikisma}`, el tipi `berlin` | KC-S3, KC-P6, KC-P7 |
| "başlarını sallıyor" | `kit_eksik` baş-sallama (yedek: yalnız dosya itme) | KC-J3 (P2) |
| "zarf açılır, banknotlar dökülür, sayılır, çarpı" | `zarf {ac}`, `banknot {dok, say, carpi}`, el tipi `bazna` | KC-P1, KC-P8 |
| "yetkili çenesinde el, bakmadan fincan alır" | karakter `yetkili`, jest `uzat-bakmadan`, `fincan`, `tepsi` | KC-K2, KC-J2, KC-P9 |
| "Bazna kadrajdan çıkar, yüzü görünmez" | kontra siluet (pencere arkadan), `yuz: gizli` | KC-S1 |
| "sekreter kalkar, kapıdan çıkar, arabaya biner, araba gider" | ARABA.dis jestler, `araba {gider}`, gait | KC-S2, KC-J1 |
| "makine çekmeceye, lamba söner, oda kararır" | `komodin_cekmece`, `lamba {son, filaman}` | KC-P5 |
| "lamba yeniden yanar, banknot ışıkta" | `lamba {yanar}` (MASA-INSERT `isik: lamba`) | KC-P5, KC-S3 |

## 6. Fizik, süreklilik, hareket kontrolü

- **Fizik:** elçi ve Bazna yolları açık (komodin–kapı koridoru ≥ 0.8 m, yatağın önünden geçiş yok); giriş kapısı sol yan duvar; banyo kapısı arka duvar; hiçbir şey duvar/zemin içinden geçmez. Sekreter kapıdan kaldırıma, kaldırımdan araba kapısına. Araba sağ kenardan çıkar.
- **Ayak y (cs 1.0):** Bazna/elçi z ≥ 3.6 → y ≈ 1271 ✓ (< 1290 altyazı bandı); P09a ayak 1250–1280; P08 yetkili ayak 1271; ayak teması gölgeli.
- **Süreklilik:** (1) banknot beyaz tek imza; ön yüz P01'de saklı → P07 → P10 boş yüz. (2) Daktilo silüeti P01, P05'te kurulur, P09a'da karşılık. (3) Zarf P05 kucakta kapalı → P06 köşe üçgeni → P07 açılır. (4) Mum P03 başında yelek cebinden girişi gösterilir; makine P04'te yelek cebinden girişi gösterilir; film kutusu P04 cep → P05 cep (aynı el, aynı yön). (5) Anahtar komodinde P02 → P03 komodinde alınır; kopya anahtar P03 iz → P04 kilit. (6) Tepsi P04'te komodinde, P08'de Bazna elinde. (7) Lamba: P02/P03/P04 yanık, P08 gündüz sönük, P09b söner, P10 yanar; abajur/boyun tek tasarım, tek `lamba` prop. (8) Soldan sağa: Bazna sol (giriş kapısı), elçi sağ (banyo kapısı), P08 yürüyüş sağdan sola (kapıya).
- **Hareket tamamlanır:** her dokunuşun bitiş karesi plan sonundan ≥ 12 kare önce (P03 p358/422 · P04 p370/370 · P06 p446/538 · P07 p254/340 · P08 p230/366 · P09 p330/358); tek bilinçli istisna P10 banknot kayması (match-cut). Plan içi kesmelerde ilk bölümün animasyonları kesmeden ≥ 12 kare önce biter (P09 p156 < 170 ✓; P02 anahtar bırakma p74 / el çıkışı p96 < 150 ✓; P03 mum alma p34 < 52 ✓; P04 kapak açılışı **p46'da biter** < 58 ✓ → kapak `bas 34, bit 46`, `cic_kutu_kapak_ac` p40).
- **Savaş konusu:** whoosh/riser yok; sessizlik P09b p290–370; müzik akar (kurgucu).
- **Okunurluk özeti (≥%10 ekran / ≥1 sn):** banknot P01 260 px (%13.5) 1.4 sn · anahtar P02 ≥ 200 px 1.27 sn · mum iz P03 ≥ 270 px 3.1 sn · gölge şeridi P04 ≥ 192 px 1.07 sn · çekmece/köşe P06 ≥ %20, 1.3 sn · banknot/çarpı P07 ≥ %30, 1.6 sn · fincan P08 ≥ 230 px, 1.47 sn · lamba P09 260 px, filaman 0.5–1.0 sn (lamba 260 px ≥ %12 ✓; filaman kısa, sönme anı tutulur) · banknot P10 ≥ 300 px.
- **Altyazı/yazı çakışması:** üst bantta aynı anda yalnız bir ekran yazısı; hiçbiri dokunuş nesnesinin üstüne binmez (nesneler y ≥ 420).

## 7. Kit ihtiyaç listesi (en kısa yol)

Mevcut şablonlardan **parametreyle yeten:** MASA-INSERT (`aci: tepe-onden/tepe/tepe-egik` ve `isik` var, eller KolEl); `dosya` prop (kapak 0→1) Berlin dosyası için aynen; `ekran_yazisi` (+ `sayac`), `altyazi`, `kamera_dil`, `gait` yürüyüş (GALATA-TEPE'de kanıtlı), `devam_plan` plan içi kesme, KolEl el altyapısı, `SiluetFigur` (yetiskin-a/b) kompars için. **HARITA, SOKAK, YAKIN-YUZ kullanılmıyor.**

| Kalem | Neden parametre yetmez | Planlar | Öncelik |
|---|---|---|---|
| **KC-S1 IC-ODA `oda: "elci-yatak"`** (`isik: lamba` gece / `gun`; kutu oda, düz tavan, perde, yatak, komodin, banyo kapısı + kapı altı şerit/gölge/su, giriş kapısı kenarı) | mevcut `yatak` odası 1830 çatı katı (tuffeau, kiriş) | P02b, P03a, P04b, P08, P09b | **P0** (5 plan) |
| **KC-S2 ARABA** (yeni; `gorunum: ic` yan kesit: 2 oturan figür profil, koltuk, kapı paneli, yan pencere + flu elçilik cephesi + daktilo penceresi; `dis`: cephe, kapı, kaldırım, yol, park 2. araba, araba hareket yolu; `saat gun/alacakaranlik`) | yeni mekân | P01 (kanca!), P05, P09a | **P0** (ic), P1 (dis) |
| **KC-S3 MASA-INSERT genişletme:** `masa: komodin/berlin/bazna` dokuları, `isik: lamba` (sıcak başucu) + `lamba-soguk` (Berlin) | mevcut yalnız `fener/gun`, meşe masa | P02a, P03b, P04a, P06, P07, P10 | **P0** |
| KC-P1 `banknot` prop (beyaz imza, `yuz: on/arka`, `kayma`, `dok`, `say`, `carpi {fircaVurus}`) | yok | P01, P07, P10 | **P0** |
| KC-P5 `lamba` prop (boyun açısı, `yanar/son`, filaman, ışık kaynağı tanımından huzme/havuz) | yok; `fener/mum` farklı | P02–P04, P09b, P10, P07 | **P0** |
| KC-P2 `kutu {kapak, kilit}` + `anahtar` (`kopya`, çevir, komodine bırak) | yok | P02, P04 | **P0** |
| KC-P3 `balmumu {iz, cizim.yarim}` (kabartma iz + kendini çizen yarım çizgi, kalem foley) | yok | P03 | **P0** |
| KC-K1 `bazna` karakteri (Kukla 1940 kostüm paleti, yüz varyantı, tepsi taşıma + oturan + `bak`) + `elci` (yüzsüz sırt, robdöşambr) + `yetkili` (yüzsüz siluet) | yeni palet/kostüm | P01–P05, P08, P09 | **P0** |
| KC-S4 (P2) oturan poz (ARABA.ic figürleri; SARAYBURNU'ya özgü `oturan` Kukla'ya genelleştirilecek ya da SiluetFigur oturan) | yok | P01, P05 | **P0** (ARABA ile) |
| KC-P6 `cekmece {yigin, dosya_atis, kose_sikisma}` (Berlin masası ön kenarı) | yok | P06 | P1 |
| KC-P7 `harita_masa {normandiya}` (HARITA.tsx Fransa konturunu yeniden kullanır, masaya prop) | yok | P06 | P1 |
| KC-P8 `zarf {ac}` (kraft, kalın) + KolEl tipleri `bazna`, `berlin` (koyu manşet) | tip yok | P05, P06, P07, P10 | P1 |
| KC-P4 `makine` (fotoğraf makinesi nötr), `film_kutusu` (siyah), `belge` (sarımsı-gri yığın/serili), jest `cep` | yok | P04, P05, P09 | P1 |
| KC-J2 jest `uzat-bakmadan` + `fincan`/`tepsi` (koyu mavi emaye/koyu metal) | yok | P08 | P1 |
| KC-J1 gait yürüyüşünün ARABA.dis `xy` yoluna bağlanması + `arabaya-bin` jesti | gait var, şablona bağlı değil | P09a | P1 |
| KC-K2 `sekreter` + `kompars` palto/şapka SiluetFigur paleti | küçük palet | P01, P05, P09a | P1 |
| KC-J3 baş-sallama (siluet) | yok | P06 | **P2** (yedek: yalnız itme) |

**Mekân sayısı:** 3 (ELÇİ-ODASI, ARABA, MASA-INSERT). Banknot insert ve Berlin masası **yeni şablon gerektirmez**: ikisi de MASA-INSERT'in yeni masa dokuları + prop'larıyla çözülür (komodin inserti de aynı yoldan). Yeni kod en aza iner; **ARABA** tek gerçekten yeni şablon, **ELÇİ-ODASI** yeni oda dekoru.

**Kurulum sırası önerisi:** (1) P0 grubu KC-S1/S2.ic/S3(komodin+bazna)/P1/P5/P2/P3/K1; bunlarla P01–P05, P07, P08, P09b, P10 çekilir. (2) P1 grubu: Berlin (P06) + ARABA.dis (P09a). (3) P2 yedek.

## 8. Kalibrasyon için önerilen 3 kare

| # | Kare | Neden | Neyi ölçer |
|---|---|---|---|
| **K-A** | **P04 p270 (mutlak 1491)** ELÇİ-ODASI gece, iki-kişi orta: lamba havuzu + belgeler + makine + Bazna donmuş + kapı altı gölgeler | en zor iç mekân: iki ışık kaynağı, dönem odası, yüzsüz siluet, kapı şeridi ≥ 192 px, sıcak–soğuk | sıcak piksel ≥ %14, p95 L* ≥ 75, ayak y ≤ 1280, tek ışık/havuz yönü, gölge/şerit okunurluk, yatak/komodin yerleşimi |
| **K-B** | **P07 p300 (mutlak 2700)** MASA-INSERT bazna: iki banknot + çarpı, lamba havuzu | imza nesnesi ve beyaz-kırmızı disiplin; telefonda "iki aynı kâğıt" okunur mu; en çok izlenecek an (patlama) | banknot L* en yüksek/en doygun, ortam C* ≤ 28 / L* ≤ 88, çarpı alanı ≤ %8, 360x640 okunurluk, masa dokusu |
| **K-C** | **P01 p24 (kanca)** ARABA ic: banknot ortada, kompars eli, Bazna profil, pencerede daktilo | **ilk kare = kapak**; yeni şablon (ARABA), iki yüzsüz siluet profili, ön plan banknot ≥ 260 px | siluet yön/duruş okunur mu, banknot kenar ışığı ve arka yüz boş, cephe/daktilo ≥ 60 px, ölü alan (alt üçte), kanca merak |

(İsteğe bağlı 4.: P06 p500 çekmece sıkışan köşe, ancak MASA-INSERT berlin P1'dir; K-B aynı şablonun kalibrasyonunu kısmen verir.)

## 9. Riskler ve açık sorular (orkestraya)

1. **P04 sıkışıklığı** (6.36 sn'de 6 eylem); tepsi alma/kapıya dönüş senaryo P04 son görüntüsünden çıkarıldı (bildirim). Sıkışırsa serme kısalır, gölge anı ve film kutusu cebe girişi korunur.
2. **Yeni 1940 karakter yüzü/kostümü** doğrulanamadı (arastirma: görsel kısmi); yüz nötr, Bazna ayırt edici işaret yok. Elçi/yetkili/sekreter yüzsüz → risk düşük.
3. **EN ses 2–2.5 sn geride görüntüden önce biter** (P04, P06, P10): tek görüntü, uzun dile göre kuruldu; EN'de dinlenme uzar. Kabul?
4. **Altyazı** (kelime kelime) varsayılan KAPALI; önerim açık. Orkestra kararı.
5. **Süre 64.83 sn** (≤ 65 ✓ ama 0.17 sn pay): ses kuyruğu eklenirse taşar; gerekirse P01/P03 kuyruğundan 0.2–0.3 sn kısılır.
6. **ELÇİ-ODASI geometrisi** (komodin–kapı yakınlığı, yatak boyu, giriş kapısı sol yan duvar, ekran x hedefleri) mekân sorumlusunun mimari kartında kesinleşmeli; bu planda z/u ve cx değerleri öneridir.
7. **Mekân sorumlusuna not:** 1943 Ankara elçilik odası ve elçilik cephesi doğrulanamadı (`arastirma.md`); mekân nötr, imza ayrıntı az (perde, abajur, ahşap panel).
8. **Kural: "yakın planda ilk görülen şey"** — P02a açılışı kutu/komodin insert'le başlar; kurulum P02b geniş planda hemen ardından (1.5 sn içinde). Eleştirmen kabul etmezse P02 sırası wide→insert yapılır (anahtar net 1.2 sn payı küçülür).
9. **Foley dosyaları** henüz yok; yeni adlar: `cic_banknot_kavra, cic_kagit_cep, cic_kutu_kapak, cic_kutu_kapak_ac, cic_kutu_kapak_tok, cic_anahtar_kilit_giris, cic_anahtar_al, cic_belge_yay_hisirti, cic_belge_kutu_hisirti, cic_lamba_boyun_gicir, cic_deklansor_tik, cic_kutu_tutus, cic_zarf_tutus, cic_zarf_kucak, cic_dosya_masa_tok, cic_dosya_kayma, cic_sandalye_it, cic_bina_kapi, cic_adim_kaldirim, cic_araba_kapi_tok, cic_araba_gider, cic_banknot_al, cic_banknot_kayma, cic_su_baslar`.
