# K3 eleştirisi + K1/K2 nihai kapanış (SARAYBURNU `kosk` P02 gece / P10 gün)
Eleştirmen (opus) · 2026-11-08.
İncelenen: K3 paketi (19 kare tam/telefon/güvenli, 2 yan yana, telefon sayfası, renk-olcum.md, P02_p80_oneri). Padişah başı (gece/gün, tam ve telefon), P07 p0 eli ve P02 sol grubunu kırparak baktım. Sikke parlaması karışımlarını hesapla teyit ettim.

## KARARLAR
- **K1 (kıyı gece): GEÇTİ.**
- **K2 (insert gece/gün): GEÇTİ.** Tek küçük açık (Z8, sikke parlaması) K3'te V5 olarak izleniyor; P11 teslim edilmeden önce kapanır.
- **K3 (köşk gece/gün): KOŞULLU.** 1 kritik, 4 orta açık. Dekor, palet, ışık ve aynı kadraj ayna dili geçti; sonraki şablonlara taşınabilir.

## 1. K1 / K2 kapanış tablosu
| ID | Durum | Not |
|---|---|---|
| Y10 taç sıçrama | **KAPANDI** | Kavisli şeritler + damlalar, telefonda "su" okunuyor |
| Y11 suda kanat | **KAPANDI** | Eğik batmış uç + parmaklar görünür; P07'de "kanatsız" karşılığı kuruluyor |
| W1 P07 p0 el | **KAPANDI** | Kol sol-alt kenardan geliyor, avuç orta basamağın burnunda. Kontrast notu → V10 |
| W2 P11 uzanan el | **KAPANDI** | p192/p208'de el yatay ve gevşek, keseden uzak |
| W3 basamak | **KAPANDI** | Basamaklı profil, su çizgisi + ıslak bant; 360 px'te merdiven okunuyor |
| W4 elips gölgeler | **KAPANDI** | Gölge siluetin izdüşümü; suda kırpılıyor |
| W5 muhafız hedefi | **KAPANDI** | `ust-kol` beyanı |
| Z5 / Z6 / Z7 | **KAPANDI** | Göğe taşan çizgi yok; kemer ağzında söve; uzak duvarda derz seyreltildi |
| Z8 sikke parlaması | **AÇIK** → V5 | |

## 2. Orkestranın sorduğu 5 noktaya kararlar
1. **Işık lekeleri imza sayacından muaf mı? EVET, şartlı.**
   - Tekillik kuralı nesne ve kostüm içindir. Işık (pencere `#f2c070`, havuzu, kenar ışığı `#f0d79a`) muaf.
   - Hesap: paletteki tonların kendisi imzadan ΔE 20.0 / 17.0 uzakta. Sayaçtaki 348 / 44–121 piksel, karışım ve kenar yumuşatması pikselleri.
   - Şartlar:
     - (a) Işık lekesi silindir ya da demet biçimi almaz.
     - (b) Demetin ekranda okunur olduğu planlarda (P01, P03–P06) demetin 200 px yakınına imza tonunda ışık lekesi düşmez.
     - (c) **Motion:** betik ışık katmanlarını (`isik` etiketi) ayrı satırda raporlar, oranın dışında tutar (V9).
2. **Z8 sikke parlaması: tasarımcının ton değişikliği önerisi RED; düzeltme motion'ın.**
   - Hesapladım: altın `#c49e48` ile parlama arasındaki doğrusal karışım, ara tonlarda imza bandından geçiyor.
   - Önerilen daha beyaz `#f6e6b0` sorunu kötüleştiriyor: karışımın ortası ΔE 12.4. Mevcut `#f0d890`'da ortası 15.0.
   - Sorun ton değil, **yumuşak geçiş.** Motion parlamayı **sert kenarlı iki ton** olarak çizsin: opaklık rampası ve gradyan olmasın, halka konturu parlama boyunca koyu kalsın. Sonra render'da yeniden ölçülsün (hedef her yüzde ΔE ≥ 15). Tasarım tonu değişmez.
3. **Şenlik ↔ üst yazı bandı: P02 ekran yazısı alt banda alınır. KABUL, şartlı. Yönetmen.**
   - Şenlik P02'nin olayı ve üst üçte birin tek dolgusu. Yazı onu örtmemeli. P02'de replik yok.
   - Şart: alt banttaki yazı sol grubu (P03'ün kurulumu; demet, meşale, ayaklar; ekran ≈x 90–200, y ≈1250–1310) **örtmez**. Yazı kutusu x ≥ 260 ya da y ≥ 1330 olsun.
   - Pencere yansıma kolonunun üst ucu örtülebilir (önemsiz).
   - Bu bir istisnadır; `sahne-plani.md`'ye gerekçesiyle yazılsın.
4. **P02↔P03 sürekliliği: motion önerisi KABUL. Yönetmen json'a işlesin.**
   - Öneri: Y2 92, Y1 110 (meşale 118), Lagâri 130 ayakta, demet 152.
   - P02'de oturmuş Lagâri, P03'te yürüyüp binmesiyle çelişiyordu (KRİTİK süreklilik).
   - Öneri karesinde grup ≈50 px (30 px/m ile tutarlı), yan güvenli alan içinde, meşale halesi ve havuzu yerinde.
5. **P10'da baş çevirme 360 px'te okunuyor mu? ZAYIF → V2. P07 p0'da gece elinin kontrastı → V10 (küçük).**

## 3. K3 bulguları (önem sırasıyla)
### KRİTİK
**V1. P02'de (gece) padişahın sarığı başın üstünde, kopuk havada duruyor.** Motion.
- P02 p0/p80, ekran ≈x 545–575, y 715–775.
- Gece silüetinde sarık, küçük koyu baş dairesinin ≈10 px üstünde ayrı, düz gri bir elips. Telefonda "hale / uçan daire / melon şapka" okunuyor.
- Padişahın ilk görünüşü bu kare ve bölümün iktidar imgesi.
- Kural: fizik (nesne havada durmaz), kostüm dönem okunurluğu.
- **Düzeltme:** sarık başa oturur (sarık tabanı alın hizasında, başın üst %40'ını örter). Gece silüeti baş + sarık + gövde **tek kütle** olur; ayrım yalnız arkadan gelen kenar ışığı konturuyla yapılır. Sarık tümsekli üst kontur gündüzdekiyle aynı biçimde olur (P10 ile ayna).

### ORTA
**V2. P10'da baş çevirme 360 px'te zayıf okunuyor.** Motion.
- p66→p112 arasında değişen tek şey, profil konturunda 2–3 px'lik (telefonda) burun/dudak çentiği. Sarığın arkaya kayması neredeyse yok.
- Kural: ana eylem okunur; küçük jest = yakın kamera (§3.5'in `bas_aci` tanımı: sarık arkaya asimetrik).
- **Düzeltme:**
  - Profil çıkıntısı ≥ baş genişliğinin %25'i olsun.
  - Sarık profilde ≥ %20 arkaya kaysın.
  - Sağ kenar ışığı profil konturu boyunca ekranda 4–5 px olsun.
  - Dönüş, push-in'in cs ≥ 2.2 olduğu karelerde tamamlansın (yönetmen zamanlamayı teyit etsin).

**V3. Şenlik merkezleri üst yazı bandında.** Karar §2.3 → **yönetmen.**

**V4. P02↔P03 sürekliliği.** Karar §2.4 → **yönetmen.**

**V5. Z8 sikke parlaması imza bandında** (ΔE 9.0–10.3, 235 örnek, geçici). Karar §2.2 → **motion.**

### KÜÇÜK
- **V6. Sarığın tepesindeki siyah "kavuk ucu" düğmesi** (gün: ekran ≈x 555, y 740) telefonda kapak kulpu gibi okunuyor (sarık "tencere kapağı" gibi). **Tasarımcı:** kavuk ucu sarık tonunun gölgesinde (`#958e7c` ailesi) ve daha geniş/basık olsun; ya da kaldırılsın.
- **V7.** P10 cs 2.4'te sol üst köşede arka baca dilimi (x < 40) yan güvenli alanda yarım bir parça olarak kalıyor (anlamsız konumlu kırpık parça). **Yönetmen:** cx'i +40 kaydırsın ya da baca tümüyle kadraj dışında kalsın.
- **V8.** P10 gündüz ters yansıma çok opak ve düz: alt üçte birde köşk "ikinci bir zemin / bina" gibi okunuyor. **Mekân + motion:** yansıma α ≈ .6, dalga kesikleri 3'ten 6–8'e çıksın, alt kenar hava/su tonuna erisin (iki basamak, gradyan değil).
- **V9.** İmza sayacı ışık katmanlarını ayrı raporlasın (§2.1c). **Motion.**
- **V10.** P07 p0'da (gece) ıslak kolun çivit yeni karanlık denize karışıyor. El turuncu, okunuyor; kol okunmuyor. **Motion:** pencere tarafından (sağ-üst) yene 2 px amber kenar ışığı ve basamakta ıslak leke parlaması temas karesinde netleşsin.

## 4. Renk teyidi
- Motion tablosundaki gece ve gündüz noktaları telefon sayfası ve tam karelerle tutarlı.
  - Gece: gök C\* %100, deniz %91.
  - Gün: gök %100, deniz %81, köşk ΔL −1.9.
- Köşk gün tonu imzaya ΔE 16.1–16.2, sınırda ama geçiyor. Köşk günlerinde (P10, P11, P12) demet kadrajda yok; kabul (tasarım §2.4 kaydıyla).
- Padişah sarığı gün 24.4–24.7, gece 41.2. Kırmızı 0.
- Işık tonları: `#f2c070` → imzaya ΔE 20.0; `#f0d79a` → 17.0 (hesap).

## 5. Dersler (ek)
1. **İki rengin doğrusal karışımı aradaki üçüncü rengin bandından geçebilir.** Parlama ve kenar yumuşatması imza tonunu üretebilir. Tekillik ölçümü uç tonlarla değil karışım yoluyla yapılır; çözüm sert kenardır.
2. **Siluet bileşenlerinde (başlık + baş) gece modunda da parça birleşik çizilir.** Kenar ışığı ayrımı yapar, boşluk yapmaz.
3. **Uzak kurulum grubu küçük olsa da sürekliliğe tabidir.** Sonraki planda yapılacak eylem (binmek) önceki planda yapılmış görünmez.
