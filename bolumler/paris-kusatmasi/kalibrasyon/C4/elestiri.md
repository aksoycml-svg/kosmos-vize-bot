# C4 kısa kontrol: P10 (LANTERN-ODA) · eleştirmen · 2026-11-13

**Karar:** Baş gölgesi kritiği KAPANDI. Yeni 1 KRİTİK var (memur-3 kalkışı); bu json parametresi, şablon kusuru değil. **Şablonlar: DAGRON-INSERT GEÇER · LANTERN-ODA GEÇER.** Kalkış düzelmeden P10 kullanıcıya gitmez. Puan 7 (C3: 6.5).

Bakılan kareler: C4 f48, f200 (tam, 360, güvenli) ve şerit f150–200. Kod değiştirmeden ek render: f84, f250, f258, f266, f290 (scratchpad, 0.5 ölçek).

## C3 kritiği: P10 baş gölgesi → KAPANDI
- f150–200 şeridinde ve f200'de satırların üstüne gölge düşmüyor. Boynuz ve duvar kaması yok.
- Huzmenin en alçak ışını baş tepelerinin üstünden geçiyor. Hiçbir başı ya da omzu kesmiyor.
- Görüntü 360'ta "perdede okunan sayfa" olarak okunuyor.

## YENİ KRİTİK: P10 f250–266, memur-3 kalkışı
- **Sorun:** f258'de x ~710–1060, y ~1130–1550 arasında başsız, köşeli koyu bir levha var. Baş lantern kutusunun arkasında; kol ve zarf görünmüyor. 360'ta insan değil, "açılan kapak/pano" okunuyor.
- **İkinci sorun (fizik):** Ayağa kalkış, yürüyüş ve sağ kenardan çıkış toplam 16 karede (0.27 sn) bitiyor. Bu hızda bir insan kalkıp yürüyemez; hareket bir flaş gibi okunuyor.
- **Süreklilik:** Zarf bir sonraki kesmede (f290, kapıdaki memurun elinde) görünüyor, ama kalkışta görülmüyor. Kurulum → karşılık zinciri kopuyor.
- **Neden (parametreler):**
  - `memur3_kalkis.bas/bit` = 250/266: süre çok kısa.
  - `yon`'daki baş y 1618→1086: kalkınca baş, lantern kutusunun içine düşüyor (kutu y ~995–1290, x ≥ 860). C4'te lantern öne alındığı için bu hata yeni çıktı.
- **Düzeltme:**
  - **Sahibi yönetmen** (`memur3_kalkis`): kalkış + çıkış ≥ 45 kare olsun. Çıkış plan sonundan ≥ 12 kare önce bitsin.
  - Önerilen hareket: memur huzmeyi kesmemek için **eğilerek** kalkar ve sağa çıkar. Gösterimde gerçek bir davranıştır.
  - Ayakta baş tepesi y ≥ ~1300 kalmalı. Bu hem huzmenin hem kutunun altı demek; baş, omuz ve zarflı el görünür olur.
  - Kitte eğik yürüyüş pozu yoksa `kit_eksik` yazılır, orkestra karar verir.
  - Kabul ölçütü: f250–f300 arasında her 4 karede bir şerit; her karede baş + omuz görünür, zarf ≥ 1 sn görünür.

## Toplu tura (küçük/orta)
1. **Orta (güvenli alan):** Lantern kutusu, levha yuvası (1018,998) ve f84 levha temas eli x > 920'de, yani Instagram'ın sağ buton sütununun altında. Kural gereği temas noktası güvenli alanda olmalı. Düzeltme, sahibi motion/yönetmen: lantern + sehpa ≥ 100 px sola kayar. Huzme bunu geometriyle izler; kayınca baş tepeleriyle açıklığı yeniden ölçülmeli.
2. **Orta (okunurluk/dönem):** Huzme tek noktadan çıkmıyor; kutunun sol yüzünde x ~860, y 995–1105 arasında dikey bir yarıktan çıkıyor. Mercek borusu çizilmemiş. Düzeltme, sahibi motion · `LanternOda.tsx` `LN.mercek`: ön yüze kısa pirinç-dışı (koyu) mercek tüpü eklenir, ışınlar tüp ucunda tek noktada toplanır.
3. **Küçük:** f84'te levhayı tutan el sağ kenarda topak gibi duruyor, parmak okunmuyor. 1. maddeyle birlikte çözülür.
4. **Küçük:** f48 (PARIS-CATI) gökte y ~440, ~640, ~745'te yatay çizgi/şerit izleri var. Önceden `lint.izin` ile kabul edildiyse yok sayılsın, edilmediyse motion baksın. Kuyruk yelpazesinin üstten görünmesi C2'den devrediyor.
5. bolum.json `huzme.isin.kaynak` eski değer: yönetmenin notu var, temizlik işi.
