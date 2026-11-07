# Dokunuş Kütüphanesi

Yaratıcı yönetmen buradan seçer ya da yeni yazar (yeni olan, kit karşılığı yoksa kurulum ekibine not). Kurallar: plan başına ≥1, bölümde tekrar yok, kendi planında başlar–biter, telefonda okunur (≥%10 ekran ya da yakın/insert, ≥1 sn), sesi varsa foley'i atlanmaz.
Durum: **kitte** = mevcut şablon/jest/prop ile kurulabilir · **kısmi** = yaklaşık · **yok** = kurulum gerekir.

| id | ad (Blanc) | şablon | kit karşılığı | temas/ses | durum |
|---|---|---|---|---|---|
| D1 | Baston–fare | SOKAK gece | `insert: {tur: "fare", bas}` (66 kare; Louis çizmesi + baston TAK + fare dalışı + kuyruk tink); geniş planda `baston-vur` jesti | pençe, çizme, TAK, cıyak, dalış, tink | kitte |
| D2 | El–gölge (memurun it-çek'i duvarda T kol gölgesi) | IC-ODA mum | `it-cek` jesti + mum nokta ışığı (zemin gölgesi) | 3 × makara tik | kısmi — duvar gölgesi T dönüşümü yok |
| D3 | Çorabı kaldıran el (sarkar, uzar, ok ↓) | MASA-INSERT | `corap` prop `durum.sarkma` + `el.tut`; ok ↓ = ekran yazısı | yün "flop" (bırakma) | kısmi — ok grafiği yazıyla |
| D4 | Fazladan çentik + kopya dalgası | KULE-DIS gün | `kuleler[].konum` anahtarları (sırayla `HATA`) + `halo` | klak zinciri (ilki sert) | kitte |
| D5 | Esneme | YAKIN-YUZ (arka KULE-DIS) | `esne` jesti, olcek ≥ 3.6 | esneme sesi, uzak klak | kısmi — ağız küçük O |
| D6 | Pervaz çentiği ("iki yıl") | IC-ODA bordeaux-cati | `pervazCentik` + `pervazCentikYeni` (kare) | bıçak "kırt" | kısmi — bıçak/el görünmez |
| D7 | Eldiven giyme (dosya kapağı aksan) | MASA-INSERT | `dosya` prop `durum.kapak` 0→1 (TOK) + `louis` elleri | dosya TOK, eldiven gerilmesi | kısmi — parmak parmak giyme animasyonu yok (Kukla `eldiven-giy` jesti genel planda) |
| D8 | Boş kitap + güve | MASA-INSERT | `kitap` prop `durum.sayfa`, `bos: true` | sayfa çevirme | kısmi — güve yok |

## Yeni dokunuş eklerken
- Satır ekle: id (bölüm-öneki ile, ör. `BL-D1`), şablon, hangi parametre/jest/prop ile kurulur, temas listesi, durum.
- "yok/kısmi" olanlar için kurulum ekibine tek satır iş: hangi şablona hangi parametre.
