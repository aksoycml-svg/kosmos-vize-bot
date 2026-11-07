# Dokunuş Kütüphanesi

Yaratıcı yönetmen buradan seçer ya da yeni yazar (yeni olan, kit karşılığı yoksa kurulum ekibine not). Kurallar: plan başına ≥1, bölümde tekrar yok, kendi planında başlar–biter, telefonda okunur (≥%10 ekran ya da yakın/insert, ≥1 sn), sesi varsa foley'i atlanmaz.
Durum: **kitte** = mevcut şablon/jest/prop ile kurulabilir · **kısmi** = yaklaşık · **yok** = kurulum gerekir.

| id | ad (Blanc) | şablon | kit karşılığı | temas/ses | durum |
|---|---|---|---|---|---|
| D1 | Baston–fare | SOKAK gece | `insert: {tur: "fare", bas}` (66 kare; Louis çizmesi + baston TAK + fare dalışı + kuyruk tink); geniş planda `baston-vur` jesti | pençe, çizme, TAK, cıyak, dalış, tink | kitte |
| D2 | El–gölge (memurun it-çek'i duvarda T kol gölgesi) | IC-ODA mum | `golgeT {kim, bas, bit, konum}` + `manipulator {kim}` + `it-cek` jesti | 3–4 × makara tik | kitte (K2) |
| D3 | Çorabı kaldıran el (sarkar, uzar, ok ↓) | MASA-INSERT | `corap` prop `durum.sarkma` + `el.tut`; ok ↓ = ekran yazısı | yün "flop" (bırakma) | kısmi — ok grafiği yazıyla |
| D4 | Fazladan çentik + kopya dalgası | KULE-DIS gün | `kuleler[].konum` anahtarları (sırayla `HATA`) + `halo` | klak zinciri (ilki sert) | kitte |
| D5 | Esneme | YAKIN-YUZ (arka KULE-DIS) | `esne` jesti (yakında kocaman `esneme` ağzı), olcek ≥ 3.6 | esneme sesi (ağız tepe karesi), uzak klak | kitte (K2) |
| D6 | Pervaz çentiği ("iki yıl") | IC-ODA bordeaux-cati, push-in | `pervazCentik` (sayı) + `pervazBicak {bas, kare, bit}` (+ `pervazCentikYeni` = kare) | bıçak "kırt" (kare) | kitte (K2) |
| D7 | Eldiven giyme (dosya kapağı aksan) | MASA-INSERT | `eldivenGiy {bas, bit, gerilme}` (parmak parmak, eller ≥ %20); dosya aksanı ayrı planda `dosya.kapak` | eldiven gerilme (+ dosya TOK) | kitte (K2) |
| D8 | Boş kitap + güve | MASA-INSERT | `kitap` `durum.sayfa`, `bos`, `guve` (anahtarlı 0→1) | sayfa çevirme (güve sessiz/çok kısık) | kitte (K2) |
| P13 | T kolu → Wi-Fi (döngülü son) | KULE-DIS gün | `kuleler[].wifi {bas, bit}` | 3 × ahşap "tak" (yay varışları) | kitte (K2) |

## Yeni dokunuş eklerken
- Satır ekle: id (bölüm-öneki ile, ör. `BL-D1`), şablon, hangi parametre/jest/prop ile kurulur, temas listesi, durum.
- "yok/kısmi" olanlar için kurulum ekibine tek satır iş: hangi şablona hangi parametre.
