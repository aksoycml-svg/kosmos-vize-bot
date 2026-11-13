# C3 kısa kontrol — DAGRON-INSERT + LANTERN-ODA (eleştirmen, 2026-11-13)

**Karar: DÜZELTMEYLE GEÇER. Puan 6.5** (C2: 6). Eller artık el; bez sabit; P05 gölgesi ele bağlı. Yeni 1 KRİTİK (P10 baş gölgesi) düzelmeden P10 kullanıcıya gitmez.

## C2'nin 4 kritiği
1. P10 bez büyümesi: **TUTTU.** Şerit f150–200'de bez çerçevesi sabit, yalnız ışık dikdörtgeni büyüyor.
2. P10 saydam baş (x 671): **TUTTU, ama yeni kritik doğurdu** (aşağıda). Baş opak; ama gölgesi anahtar görüntünün ortasını kapatıyor.
3. P05 el gölgesi: **TUTTU.** f268–276 iki el geçişinde ve f344–352 çıkışta gölge elle birlikte; ışık yönü sabit.
4. P05 eldiven okuması: **TUTTU.** P05 f280, P09 f150, P10 f330 — 360'ta tek siluet el; dikiş bandı, bilek yayı yok.

## YENİ KRİTİK — P10 f154–200 (anahtar karşılık anı, PK-D7)
- **Sorun:** Orkestranın gözlemi doğru. x 671 memurunun baş gölgesi, perdedeki sayfanın alt-orta kısmına (x ~350–570, y ~870–1000; görüntünün ~%25'i) kara bir kubbe olarak düşüyor. Gölge f154'ten itibaren görüntünün görsel merkezi. 360'ta "mektubu okudular" değil, "önde bir kafa var" okunuyor. Ek bozukluklar:
  - Gölgenin solunda, x 350–375, y 925–975'te sivri boynuz var (saç/kulak). Yuvarlak başla uyuşmuyor.
  - Gölge kaması, perde altı duvarda (x 370–500, y 1000–1190) duman/hayalet gibi okunuyor.
  - Işınlar memurun omzunun üstünden geçiyor (x 610–830, y 1330–1400): ışık gövdeden geçiyor.
- **Neden (parametre):** Geometri doğru, kurulum yanlış. `LanternOda.tsx` lantern merceğinin ekran y'si (~1380–1460), memur baş tepelerinin (~1205) **altında**. Işık aşağıdan yukarı çıkıyor, bu yüzden huzmenin içindeki her baş perdeye büyük gölge düşürüyor. Baş yüksekliğinde (y ~1270) huzme x ~480–763 aralığını kaplıyor. x 671 başı bu aralığın tam içinde. Memuru yana almak (sol: memur-2 ile çakışır, sağ: baca) ya da oturtmak (gereken alçalma ~210 px) çözmüyor.
- **Düzeltme (sahibi: motion · `LanternOda.tsx` lantern/mercek y; konum json'a açıksa yönetmen):** Lantern yüksek sehpaya çıkarılsın. Dönemde projektör izleyicinin arkasında, baş üstünden yansıtılırdı. Mercek ekran y'si ≤ ~1180 olsun, böylece huzmenin alt kenarı tüm baş tepelerinin üstünden geçsin (kutu üstü ~1385 → ~1130; kutu ön planda kaldığı için bacayı daha çok örtmesi sorun değil). Kabul ölçütü: perde görüntüsünde yazı satırlarının (y ≤ ~945) üstüne hiç gölge düşmesin. "Salondaki baş" imgesi istenirse yalnız görüntü alt kenarında ≤ %8 yükseklikte ince bir yay kalsın. Yükseltmeden sonra da huzme bir başı keserse gölge kalır (tek ışık) ama boynuz kalkar ve kama yalnız bez içinde kesilir.
- Yeniden kontrol: P10 şeridi f150–200 + f200 (360).

## En çok 2 düzeltme
1. motion · `LanternOda.tsx` mercek/lantern yüksekliği (KRİTİK, yukarıda).
2. motion · `memurKafa` gölge siluetindeki boynuz + gölge kaması yalnız bez içinde. (1 yapılınca büyük olasılıkla kendiliğinden düşer; düşmezse.)

## Toplu tur (küçük)
- P05 f280: Parmak uçlarında açık renkli "kapak" yuvarlakları tırnak/yüksük gibi duruyor. Uç tonu düz olsun. Ağdaki tarak tarama `butce.avuc` 6 → 3.
- P05 f280: Film şeridi elin altına kısmen giriyor, kenarı serçe parmağa değiyor. Konum için yönetmen json (motion notu 3).
- P09 f150: El kuşu taşımıyor, yanında duruyor. Kuyruk yelpazesi hâlâ üstten görünüyor (C2'den devreden).
- P10 f330: Uzak elde üç küt parmak ucu kâğıt kenarında, mandal gibi duruyor. Yakın başparmak kabul (motion sapma 4 kabul).
- P05 f0 terazi sorusu açık (C2'den).
