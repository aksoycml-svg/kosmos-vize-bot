# Eleştiri — B turu kalibrasyonu (MONTMARTRE + hale) · 2026-11-12 · eleştirmen

**Karar: P03 GEÇER (küçük notla) · P06b GEÇMEZ · P07 A GEÇMEZ · P07 B DÜZELTMEYLE GEÇER. Şablon genel: GEÇMEZ. Puan: 5 (öğrenci işi).**
Bakılan: 8 kare (tam / 360 / güvenli), 2 P07 şeridi, P03 f159, karsilastir.png, hedef-montmartre.png. Açık kabul edilen `lint.izin` uyarıları (P07 parlama L*, P03 f0–45 gök) yeniden açılmadı.

## Orkestra gözlemi: doğrulama
| Gözlem | Sonuç |
|---|---|
| P03 f80 hedefe makul yakın | **Doğru.** Siluet, ışık, kalabalık, hortum, ön plan torbaları hedefle aynı dilde. Fark: sepet hasır değil düz çıtalı sandık gibi; ufuk ışıması merdiveni (sol, y≈1120–1160) düz dijital şerit gibi. |
| P06b figürler içi boş koyu manken | **Doğru.** Omuzda kas yumrusu, yaka/şapka yok, yüz yok. f168'de sandığı tutan kollar "Z" biçimli ve eklemsiz bükülüyor: robot gibi. |
| Sepet ekranı dolduran dev kutu | **Kısmen doğru.** Ölçü figürlere göre makul (≈1.5 m en). Asıl sorun biçim: hasır örgü yok, düz dikey çıta + kuşak → ahşap sandık okunuyor; 360'ta ön yüz ölü kahverengi kütle. |
| Torbalar iri ve aynı | **Doğru.** Dört eş yumurta, aynı açı, aynı kıvrım çizgisi (kopyala-yapıştır). |
| Makaslar ince tel | **Doğru.** 360'ta makas çubukları 1 px altına iniyor; Polonceau'dan çok tel kafes okunuyor. |
| "Dagron sepete biniyor" okunuyor mu | **Hayır.** f206'da Dagron gövdesi sol 80 px payında ve kadraj kenarıyla kesik (yalnız kol + el); f250'de zaten içeride. Biniş anı hiçbir kontrol karesinde yok ve P06b şeridi alınmamış. |
| P07 f112 şehir blok maketi, Paris okunmuyor | **Doğru.** Eş kutular, tek eksenli ızgara, imza siluet yok (çatı/baca kümesi, Seine, kubbe yok). f0–60'ta yakın blok gölgeleri dev testere dişli lavanta lekeleri. |
| Darbe beyaz leke + örümcek bacağı | **Doğru.** Kalın konturlu krem leke + 6 siyah çizgi: böcek/örümcek okunuyor, gravür darbesi değil. |
| Daguerre'nin vurulduğu okunuyor mu | **Kısmen.** Alçalış şeritte açık (f112–156 alttan çıkıyor). Ama "vuruldu"nun nedeni okunmuyor: duman çizgisi (aşağı bkz.) halat/hortum gibi. |

## Ek bulgular (orkestranın yazmadığı)
1. **KRİTİK — süreklilik/fizik, P06b f168:** Dagron balonunun zarfı yok. Askı halatları boş bir halkaya çıkıyor; halkanın hemen üstünde (y 0–100, x 300–700) zarfın olması gereken yerde makaslar görünüyor. P03'te şişen, P07'de uçan balon P06b'de yok. Neden: `Montmartre.tsx` `Yukleme` görünümü ana balon zarfını çizmiyor (ya da kadraj üstünde varsayıyor) iken kamera cy 0'da halka ekranda (y≈190).
2. **ORTA — okunurluk, P07 f88–140:** "duman_cizgisi" sağ alttan balona uzanan düzgün, sabit kalınlıkta gri tüp. P03'teki gaz hortumuyla aynı biçim → "balon bir hortuma/halata bağlı" okunuyor, atış izi değil. f128 sonrası kesik çizgi parçalarına bölünüyor (motion'ın düzelttiğini söylediği kusur hâlâ var).
3. **ORTA — güvenli alan, dokunuş nesnesi:** P07 f200'de bırakılan 4. torba x≈830–990; IG sağ sütun (x>920) torbanın sağ kenarını ve bağını örtüyor. Dokunuş nesnesi düğme altında. P06b f206'da da 4. torba sütuna giriyor.
4. **ORTA — doruk karşılığı, P07 B f240–300:** "kum torbalarını atıp yükseldi" sözünün görsel karşılığı şeritte belirgin değil. Sepet kadrajda sabit, şehir zemini gözle ayırt edilir biçimde uzaklaşmıyor. Sıçrama ve tırmanış ölçülmeli.
5. **ORTA — protokol:** P06b'de biniş (f212–248), sandık kaldırma, kamera zoom hareketi var ama hareket şeridi alınmamış (CLAUDE.md "Hareket şeridi zorunlu").
6. **KÜÇÜK — P06b ön plan posta çuvalı:** f206'da sol alt köşede kesik krem leke, f250'de 3 çizgili lavanta yay. 360'ta ne olduğu okunmuyor; ölü alanı dolduruyor ama anlamsız şekil gibi duruyor.
7. **KÜÇÜK — P03 f159 kapanış:** üst %55 boş gök. Yalnız balon çıkış anı olduğu için kabul edilebilir. Kalabalık ayakları y≈1850–1910'a, IG alt bandına iniyor (kamera yukarı kayınca). Ayaklar kadrajdan çıkış hâlinde, kısa süreli; izin olarak yazılabilir.
8. **KÜÇÜK — güvenli alan bindirmesi P06b f206 (düzeltilmiş):** ihlal 0 doğrulandı. Dagron ayak işareti (103,1237) güvenli alanın içinde. Ama ayaktan yukarısı (gövde) x 0–100'de, kadraj kenarında kesik. Bindirme başlığı "P06 HARITA" yazıyor (üst plan adı); betik `devam_plan` şablonunu yazmalı (teknisyen, küçük).
9. **KÜÇÜK — P07 f200 Dagron:** başın arkasındaki kıvrık çizgi saç örgüsü gibi okunuyor; kol rim üstünde yatar gibi. Kenar ışığı kopyası yanlış yerde.

## Öncelikli düzeltmeler (en çok 5, önem sırasıyla)
| # | Sorun | Neden (parametre/dosya) | Düzeltme | Sahibi |
|---|---|---|---|---|
| 1 | **KRİTİK** P06b'de balon zarfı yok | `Montmartre.tsx` `Yukleme`: ana balon katmanı yok; kamera `cy` 0 (f168) halkayı kadraja alıyor | Yukleme'de dolu zarfı (P03 son hâli, aynı `Balon.tsx`) halka üstüne çiz; hale saçağına sığdığını §2v2-H ölçüleriyle doğrula. Ya da f168'de `cy` ile halkayı kadraj dışına it. İlk seçenek tercih edilir. | motion (ölçü: mekân sorumlusu) |
| 2 | Figürler manken/robot; biniş okunmuyor | `SabahFigur.tsx` `FigurSiluet`: omuz yumru loblar, başlık yok, kol segmentleri dirseksiz Z; P06b Dagron `X −0.8` + zoom f212–248 gövdeyi sol paya itiyor | Kıyafet siluetine dönem başlığı (kepi/silindir/kasket) + yaka/palto eteği; omuz lobunu kaldır; kaldırma kolunu dirsekli iki parçalı yap. Dagron f200–250 `cx +40…60` (motion'ın önerisi); biniş temas karesini (≈f230) kontrol karesi yap; P06b şeridini al. | motion (figür) · yönetmen (cx, kontrol_kare) · teknisyen (şerit) |
| 3 | P07 A Paris okunmuyor, maket | `montmartreDekor.tsx` `HavadanSehir` (seed 173): tek tip kutu, ızgara; yakın blok gölge uzunluğu; imza yok | **Hedef görsel gerekli** (havadan 1870 Paris, gravür dili). Sonra: çatı = arduvaz/mansard eğik yüz + baca kümesi (yalnız kutu değil), blok boyu çeşitli, yakın gölge uzunluğu ≤ blok yüksekliğinin 1.5 katı, bir imza (Seine yayı ya da kubbe siluet). | mekân sorumlusu (kart + hedef) → motion |
| 4 | Darbe "örümcek"; duman "hortum" | P07 darbe katmanı (`darbeKendi`): 6 yırtık çizgisi siyah, kalın, ışınsal; krem leke konturu kalın. `duman_cizgisi`: sabit kalınlık, düzgün eğri | Yırtıkları zarf renginde kısa düzensiz delik kenarı yap (siyah ışın yok); parlamayı konturlu disk yerine 2–3 yırtık krem dil yap. Dumanı uçtan uca incelen, kopuk pufçuklardan oluşan, balona **değmeden** biten iz yap (hortum biçiminden ayrışsın). | motion |
| 5 | Sepet sandık gibi, torbalar kopya, makas tel | `Balon.tsx` sepet dokusu (dikey çıta + kuşak), torba üretimi (seed çeşitliliği yok); hale makas kalınlığı | Sepete yatay hasır örgü sıraları + yuvarlak köşe + halat rimi (hedef-montmartre gibi). Torbalara boy ±12 %, açı ±8°, büzgü çeşitliliği; P07 B sepet x −60 (4. torba IG sütunundan çıksın). Makas çubukları 1080'de ≥ 6 px (360'ta ≥ 2 px). **Hale için hedef görsel gerekli.** | motion · yönetmen (sepet x) · mekân sorumlusu (hale hedefi) |

Bu beşin dışında, ölçülecek: P07 B f240–300 yükseliş (bulgu 4). Sepet kadrajda yukarı en az 80 px kaymalı ya da şehir ölçeği ≥ %8 küçülmeli; motion ölçüp yazar.

## Hedef görsel
- **P06b hale** ve **P07 A havadan şehir** için hedef görsel gerekli. İkisi de şartnameden kör kuruldu, iki kusur kümesi oradan çıktı. İki Gemini karesi gerekir. Bölüm başına ≤ $1 kuralı yüzünden orkestra/kullanıcı onayı gerekli.
- P03 için mevcut hedef yeterli.
