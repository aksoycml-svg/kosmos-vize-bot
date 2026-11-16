# GORSEL-RECETE işaret tablosu — tur-5 (motion, yön değişikliği)
✓ uygulandı · ~ kısmi · ✗ yok (gerekçe). K1 kodu değişmedi; yeni görünümler `LimanYeni.tsx`.

| madde | P04 karsi-kiyi | P07b gemi-orta | P10a saygi | kod |
|---|---|---|---|---|
| A1 tek ışık vektörü | ✓ rel 220 (arka-sol): yamaç ön ışıkta, direk sol yarı açık, direk gölgesi ileri-sağ | ✓ rel 45 (K1 ile aynı b 190) + alev anahtar ışığı | ✓ rel 45, h 6°: kenar ışığı sağda, uzun gölgeler sola | `relIsik`, `ruzgar` |
| A2 litografi gök | ✓ 5 basamak + 6 bulut şeridi | ✓ | ✓ gokC (gün batımı) | `Gok5`, `Gok` |
| A3 blursuz hale | ✗ güneş kameranın arkasında (parıltı halesi gradyan) | ✓ kadraj dışı güneş hale + alev gradyan ışığı | ✓ siluetlerin arkasında büyük hale | |
| A4 ≥ 5 katman | ✓ gök, uzak sırt, yamaç (4 alt katman), deniz, güverte, parmaklık, direk, pin rayı | ✓ gök, sırt ×3, kasaba, kale, rıhtım, gemi, duman ×2, su, şamandıra | ✓ gök, sırt ×3, kasaba, kale, batık, deniz, mahmuz, siluetler, top, zemin, dal | |
| A5 buğu | ✓ sırt buğusu + kıyı buğu bandı | ✓ (K1 bantları) | ✓ | |
| A6 derinlik bulanıklığı | ~ derin odak (kart: DEEP FOCUS) | ✓ şamandıra σ ≤ 4 | ✓ dal σ 6 (Z 3) | `Flu`, `Katman` |
| A7 kenar ışığı | ✓ sırt bantları, ray, direk | ✓ duman, baca, hangar | ✓ siluet sırtı, kalkan, teker, mahmuz sırtı | |
| A8 sıcak–soğuk | ölçüm tablosu | ölçüm tablosu | ölçüm tablosu | `kalibrasyon_olcum.py` |
| A9 ışığa göre tarama | ✓ yok denecek kadar az (ön ışık) | ✓ baca/gövde altı (GemiProfil) | ✓ kalkan arka yüzü, mahmuz gölge yüzü | `Tara` |
| A10 renk kayması | ✓ | ✓ | ✓ | `RenkKaydi` |
| A11 kontur titremesi | ✗ (dolly zoom'da kayar; düz çizgi) | ✓ gemi | ✓ batık, kale | `KonturTitreme` |
| A12 arşiv/işleme | ✓ `Isleme` (K1 ile aynı) | ✓ | ✓ | `Isleme` |
| A13 seed'li düzensizlik | ✓ maki kümeleri, sırt, bulut | ✓ duman lobları, yansıma satırları | ✓ | `rr` |
| B1–B4 mimari | — (boş Kaş kıyısı) | ✓ K1 Meis kasabası/kale (tiyatro ×0.8) | ✓ K1 Meis (×0.711) | `MeisArka` |
| B7 saçak/gölge altı | ✓ mahmuz gölge ofseti | ✓ | ✓ | |
| B8 LOD | ✓ yakınlaşmada maki/basamak | ✓ | ✓ | |
| C derinlikli plan | ✓ dolly zoom (ön plan sabit, arka ×2) | ✓ ön plan şamandıra → gemi → kasaba | ✓ dal → top → siluetler → batık → Meis | |
| Katman notu (ön plan / ışık olayı / atmosfer) | direk + pin rayı / KOR parıltı / buğu, tuz | şamandıra / alev + yansıma / duman | dal + top / alçak güneş kenar ışığı / tuz zerresi, buğu | |
