# Eleştiri — storyboard v3 (tek tur, eleştirmen)
Bakılan: sayfa-1/2 + kareler P04-dokunus, P08-dokunus, P10-dokunus, P13-son, P01-ilk, P14-ilk. Betik sonuçları (güvenli alan, bant, süre) kabul edildi.

## Genel
- Kanca (P01) güçlü: yarım çekilmiş eldiven + "1834. Bilgisayar yok." ses kapalı da merak uyandırır. P01 ↔ P14 kompozisyon eşleşmesi iyi (fener, pencere T kolu, paket, TOURS etiketi, eldiven konumu).
- Ses kapalı hikâye: P04, P08, P10, P13 görselleri anlatıyı taşımıyor (aşağıda). Dokunuşların 8'inin 5'i (D1, D2, D4, D5, D8) telefonda okunmuyor.
- Dönem: pencerede T kollu Chappe, silindir şapka, trikolor, mimari tamam. Yeni dönem hatası görmedim.

## Plan tablosu
| Plan | Puan | Karar | Maddeler |
|---|---|---|---|
| P01 | 8 | geçer | Hook net. Küçük: fener tepe-görünümde yan çizilmiş (kabul). |
| P02 | 5 | düzelt | Figürler ~%8 yükseklik; "borsa kalabalığı" ve Louis'nin deftere yazması okunmuyor. Etiketler figürden büyük. |
| P03 | 6 | düzelt | Alt üçte bir boş harita; yazılar 360 px'te küçük (Posta/Telgraf satırı). Mühür iyi. |
| P04 | 4 | düzelt | Dokunuş karesinde fare yok, baston yalnız sağ kenarda koyu leke; D1 okunmuyor. Üst yarı boş/karanlık. Son karede çok yakın plan, ayak yok. |
| P05 | 5 | düzelt | Figürler küçük (~%15); kese kayması ve memur gölgesi T kola dönüşmesi (D2) görünmüyor. Alt üçte bir koyu zemin. |
| P06 | 5 | düzelt | Son karede çorap yok olmuş (girişi/çıkışı yok). ↑/↓ okları görünmüyor. Dokunuşta el sağ kenarda kesik (sağ 160 px bölgesi). |
| P07 | 5 | düzelt | Kırmızı halo görünmüyor; "dört kule" yerine 2 belirgin kule. Yazı kule kollarına yakın. D4 okunmuyor. |
| P08 | 3 | düzelt | Esneme YOK: surat somurtkan, ağız kapalı. D5 teslim edilmemiş. Arka plandaki hareketli kol görünmüyor (ince dikey ip). |
| P09 | 5 | düzelt | Figür ilk karede minik, sonra kadrajdan kesik. Pervaz çentikleri ve bıçak okunmuyor. "1834 → 1836" çok küçük. Alt yarı boş duvar/zemin. Gölge yönü pencereyle uyumsuz görünüyor. |
| P10 | 3 | düzelt | Memur ayakta, silindir şapkalı, kaşları çatık; "terli, solgun, yatakta fısıldıyor" değil. Arkadaki bej leke yatak okunmuyor. |
| P11 | 6 | düzelt | Dosya kapağı TOK karede okunmuyor; son karede dosya kadrajda yok. İki kol aynı kırmızı manşet, kimin eli karışık. Eldiven giyme okunuyor, BERAAT iyi. |
| P12 | 4 | düzelt | Güve ~%1 yükseklik, telefonda görünmez; üst/alt üçte bir boş tahta (ölü alan); kitap küçük. El sağ kenarda kesik. |
| P13 | 3 | düzelt | Wi-Fi dönüşümü YOK. Alacakaranlık değil gündüz paleti. Kamera kol yerine kule gövdesine yaklaşmış, kollar kadraj dışı. |
| P14 | 7 | geçer | Döngü çalışıyor. Küçük: kol rengi P01'den koyu (gri manşet → siyaha yakın); TOURS etiketi kenarda kesik (P01'de de). |

## KRİTİK düzeltme listesi
1. P08 — esneme yok; kocaman esneme (ağız açık, göz kısık) ve arkada hareket eden bulanık kol. İş: motion (esneme jesti kit) + yönetmen (jest parametresi). 
2. P10 — memur yatakta/hasta okunmuyor: yatak yastığı belirgin, şapka yok, yarı yatık poz, solgun ton, ter. Yüz P08 ile aynı kopya, ayrışmalı. İş: yönetmen (bolum.json: poz/şapka/ten parametresi) + motion (yatık poz, hasta yüz kit'te yoksa).
3. P13 — Wi-Fi morfu ve alacakaranlık yok; kamera kollara itilmeli. İş: motion (morf kit) + yönetmen (parametre: saat=alacakaranlık, kamera hedefi=kol).
4. P04 — fare ve baston teması görünmüyor; fare ızgaradan çıkıp baston vurmalı, kadraja girsin. İş: yönetmen (temas karesi, kadraj) + motion (fare/baston jesti kit).
5. P12 — güve telefonda görünmez (≥%10 yükseklik veya yakın plan), kitap büyüt, boş üst/alt tahta kapansın, el sağ kenara kesilmesin. İş: yönetmen (ölçek/kadraj); güve boyutu için motion.
6. P05 / P07 / P02 — D2 gölge-T kol, D4 kırmızı halo ve P02 borsa kalabalığı okunmuyor; kadraj yakınlaştır (bel plan / push-in), halo büyüt, 4 kule göster. İş: yönetmen (kadraj/ölçek); halo için motion.
7. P06 — çorap son karede kayboluyor (fade/giriş yok); ok ve çorap kaldırma görünür tamamlansın; el güvenli alan içinde. İş: yönetmen (nesne yaşam döngüsü) + motion (çorap sarkma jesti).
8. P09 — dokunuş (çentik+bıçak) okunmuyor; figür minik ve kesik; "1834 → 1836" yazısını büyüt; alt yarı boş. Gölge yönünü pencere ışığıyla eşle. İş: yönetmen (bolum.json: yakın kadraj/yazı); gölge için motion (IC-ODA kit).

Orta/küçük (kritik değil): P11 dosya TOK'u ve kol ayrımı, P03 alt boşluk ve yazı boyu, P14 kol rengi eşleşmesi.
Eldiven süreklilik: Louis çıplak el P02–P10 doğrulandı (P11'de eldivenle giyme, doğru). Beyaz eldiven başka nesnede yok (P11'deki dosya kâğıdı krem, kabul).
