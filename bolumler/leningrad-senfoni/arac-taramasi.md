# Araç taraması — figür/ışık/gravür (Leningrad Senfoni)

Yöntem: WebSearch (standart mod) ile tarandı. GitHub API bu oturumda kapalıydı (`add_repo` gerekir), bu yüzden **yıldız/son güncelleme sayıları çoğunlukla doğrulanmadı**; lisanslar arama sonuçlarındaki ifadeye dayanır. Kullanmadan önce repo `LICENSE` dosyası okunmalı. Uydurma link yok: yalnız arama sonuçlarında geçen adresler yazıldı.

Gösterim: lisans sütununda **(d)** = doğrulanmadı.

## 1. 2D ışık / görünürlük çokgeni / huzme kırpma
| Aday | Link | Lisans | Durum | İş | Takılma | Risk |
|---|---|---|---|---|---|---|
| visibility-polygon-js (byronknoll), npm `visibility-polygon` | https://github.com/byronknoll/visibility-polygon-js | Kamu malı (Godot portu böyle belirtiyor; kendi LICENSE (d)) | ~134 yıldız (arama sonucu), güncelleme (d) | Çizgi parçalarından görünürlük çokgeni | Işık noktası + engel kenarları (figür/sedye silüeti çokgeni) → çıkan çokgen SVG `clipPath` olarak huzme/ışık havuzunu kırpar | Eski, tek dosya; yarım-açı (koni) için ek kod gerekebilir |
| TriVis (kninnug) | https://github.com/kninnug/TriVis | (d) | (d) | Görünürlük çokgeni, görüş konisi desteği, npm `@kninnug/trivis` | Aynı; koni argümanı pencere huzmesi için doğrudan uygun | Lisans/bakım doğrulanmadı; sahne üçgenlemesi kuruyor |
| Red Blob Games "2D visibility" makalesi | https://www.redblobgames.com/articles/visibility/ | Makale/örnek kod lisansı (d) | — | Algoritma anlatımı, ~60 satırda kendin yazarsın | Kit içine bağımlılıksız TS fonksiyonu | Kütüphane değil, referans |

Not: `speakk/lighter` Lua (LÖVE), kullanılmaz.

## 2. 2D iskelet / IK
| Aday | Link | Lisans | İş | Takılma | Risk |
|---|---|---|---|---|---|
| fabrik-2d (RGBboy) | https://www.github.com/RGBboy/fabrik-2d | (d) | Saf 2D FABRIK | Kol/omuz-dirsek-el zinciri hedefe → açılar `Kukla` rig'ine verilir | Küçük proje, bakım (d) |
| inverse-kinematics (npm, tmf-code) | https://www.npmjs.com/package/inverse-kinematics (adres arama sonucunda `app.unpkg.com/inverse-kinematics@0.1.3` olarak geçti) | (d) | TS, 2D/3D IK | Aynı | Lisans (d) |
| fullik (lo-th) | https://kandi.openweaver.com/javascript/lo-th/fullik | MIT (bir listeleme; d) | Caliko (MIT) FABRIK portu, 2D+3D, kısıtlı eklem | Eklem açı sınırı gerektiğinde (dirsek ters bükülmez) | 3B ağırlıklı API |
| Rive runtime | https://rive.app/rive-vs-spine | MIT (Rive'ın kendi iddiası; repo (d)) | Durum makineli 2D iskelet | Remotion'da kare-kare sürmek zor, **editör şart** | Remotion frame-clock ile uyumsuz; öneri değil |
| Spine runtime | https://raw.github.com/EsotericSoftware/spine-runtimes/master/LICENSE | **Serbest değil**: Spine Editor lisansına bağlı | — | — | Kaçın |
| DragonBones (DragonBonesJS) | https://sourceforge.net/mirror/dragonbones-runtime | MIT (3. taraf listeleme; d) | Açık iskelet formatı + oynatıcı | Çıktı bitmap/Pixi; SVG kuklaya doğrudan uymaz | Proje durgun görünüyor (d) |

Yorum: figür zaten kodla SVG; oynatıcı gerekmez. Yalnız **IK matematiği** lazım (FABRIK ~50 satır; fabrik-2d referans/kopya).

## 3. Hedef görselden poz / el / yüz
| Aday | Link | Lisans | İş | Takılma | Risk |
|---|---|---|---|---|---|
| MediaPipe Tasks (Pose/Hand/Face Landmarker), PyPI `mediapipe`, npm `@mediapipe/tasks-vision` | https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker/python , https://npmjs.com/package/@mediapipe/tasks-vision | Kod Apache-2.0; model dosyası şartları ayrıca kontrol (d) | Pose 33 nokta (3B), el 21 nokta/el, yüz 478 nokta + blendshape; yüz yönü yüz noktalarından hesaplanır | Python betiği: hedef PNG → JSON eklem; `.task` modelleri yerelde tutulursa çevrimdışı | Dönem gravürlerinde (stilize) tespit düşebilir; yanlış eklem el ile düzeltilir |
| rtmlib (RTMPose/RTMW/DWPose, ONNX) | https://github.com/Tau-J/rtmlib (arama sonucunda mprib/eeyrw çatalları ve PyPI https://pypi.org/project/rtmlib/ geçti) | Apache-2.0 olması beklenir ama **doğrulanmadı** (kod ve ağırlıklar ayrı) | 133 nokta bütün-vücut (el+yüz dahil); mmcv/mmpose gerekmez; yerel ONNX yolu verilir | Python, onnxruntime; MediaPipe tutmazsa ikinci görüş | Ağırlık lisansı (d) |
| OpenPose | — | Akademik/ticari kısıtlı (genel bilgi; bu taramada doğrulanmadı) | — | — | Kaçın |

MoveNet: bu taramada kaynak bulunamadı, **doğrulanmadı**.
Önemli: boyalı/gravür hedeflerde pozu bu araçlar sayısal başlangıç olarak verir; yüz ¾ ve el için sonuç gözle düzeltilir.

## 4. three.js / r3f NPR (kontur, tarama, gravür, toon)
| Aday | Link | Lisans | İş | Takılma | Risk |
|---|---|---|---|---|---|
| three.js `OutlineEffect` + `MeshToonMaterial` (yerleşik) | https://threejs.org/docs/pages/OutlineEffect.html | MIT (three.js) | Ters-gövde (inverted hull) kontur, bantlı gölge | `@remotion/three` içinde ThreeCanvas | Yalnız WebGLRenderer; kontur kalınlığı perspektifte değişir |
| spite/sketch ve spite/cross-hatching | https://github.com/spite/cross-hatching , https://clicktorelease.com/code/cross-hatching | (d) | Çapraz tarama GLSL, "Real-Time Hatching" tabanlı, gravür denemeleri | Shader'ı materyale taşı; ışık yoğunluğu → tarama katmanı | WebGL2 GLSL; lisans (d); kare-bazlı yapı (kaynama için seed/UV sabit olmalı) |
| Maxime Heckel — Moebius post-processing | https://blog.maximeheckel.com/posts/moebius-style-post-processing | Makale kodu (d) | Derinlik+normal üzerinde Sobel kontur, tarama, `postprocessing` Pass | R3F `Effects` ile tam ekran geçiş | Makale, hazır paket değil |
| Codrops "Sketchy Pencil Effect" | https://tympanus.net/codrops/2022/11/29/sketchy-pencil-effect-with-three-js-post-processing/ | (d) | Normal/derinlik kontur + kalem dokusu | Aynı | Aynı |
| Remotion `outline()` efekti | https://remotion.dev/docs/effects/outline | Remotion lisansı | 2B alfa silüeti konturu (WebGL2) | Tamamlanmış katmana ince dış kontur | 3B içeride değil |

## 5. Telifsiz 3B insan + rig
| Aday | Link | Lisans | Not |
|---|---|---|---|
| Quaternius Universal Base Characters | https://quaternius.com/packs/universalbasecharacters.html | CC0 (sayfa böyle diyor); yeni "QAL v1.0" notu 3. kaynaktan, **doğrulanmadı** | glTF/FBX, rigli, Universal Animation Library uyumlu; low-poly (~13k üçgen), yüz detayı kısıtlı, çağdaş giyim |
| MakeHuman çıktıları | https://static.makehumancommunity.org/oldsite/faq/can_i_sell_models_created_with_makehuman.html | Program AGPL; resmî ve değiştirilmemiş sürümden **export CC0** | Rig (varsayılan/game) ve düzenlenebilir mesh; 2020 sonrası kural değişti, `LICENSE` oku |
| Mixamo | https://community.adobe.com/questions-696/mixamo-faq-licensing-royalties-ownership-eula-and-tos-589400 | Adobe şartı: ücretsiz, ticari kullanım serbest, **ham dosya dağıtımı yok** (forum aktarımı; resmî FAQ doğrulanmadı) | Hazır rig+hareket; bakım belirsiz; 1941 paltosu yok, kıyafet elle |

3B yol kıyafet, kumaş ve ¾ yüz için ancak sıfırdan modelleme/ek iş getirir; "poz referansı" olarak (Blender'da poz verip siluet/kenar haritası almak) en değerli.

## 6. Kumaş kıvrımı
Hazır SVG/JS kütüphane **bulunamadı**. Literatür:
- Decaudin vd. 2006 prosedürel kıvrımlar (düzenli görünür) — kaynak arama sonucunda anılıyor, PDF bağlantısı doğrulanmadı.
- Açı alanı / gerinim tensörü tabanlı kıvrım yolları (https://hongbofu.people.ust.hk/doc/cloth_wrinkling_eg09.pdf).
Pratik teknik (benim önerim, kaynak değil): kıvrım **çapa noktalarından** (omuz, dirsek, kemer, diz) başlar, kumaş yönünde ışığa göre koyulaşan 3–6 ince eğri; çapa → sarkma noktası arası kuadratik Bézier, `perfect-freehand` ile ince-kalın-ince; ters taraf `tarama` ile. Kitte çapa noktaları rig'den türetilir.

## 7. Prosedürel gravür / tarama / kâğıt
| Aday | Link | Lisans | İş | Takılma | Risk |
|---|---|---|---|---|---|
| d3-delaunay / weighted-voronoi-stippling (npm) | https://www.pkgstats.com/pkg:weighted-voronoi-stippling , https://observablehq.com/@jobleonard/color-stippling | (d) | Ağırlıklı Voronoi noktalama | Hedef görsel luminansı → yoğunluk, SVG daire | Kalem tarama değil nokta; yavaş olabilir |
| Flow-field hatching (romellogoodman/flow-fields) | https://awesome.ecosyste.ms/projects/github.com%2Fromellogoodman%2Fflow-fields | (d) | Akış alanı | Tarama çizgisini şekil yönüne akıt (kıvrık gravür), kendi Node betiğiyle | Küçük proje; fikir alınır, kod yazılır |
| plottertools/hatched | https://github.com/plottertools/hatched/ | (d) | Python, görselden hatching → SVG | **Hedef görselden gravür referansı çıkarmak** için çevrimdışı | Python; Remotion'a doğrudan değil |
| vpype-flow-imager | https://github.com/serycjon/vpype-flow-imager | (d, muhtemelen MIT) | Python, akış alanıyla görselden çizgi | Aynı | Aynı |
| mattkeeter/swingline | https://mattkeeter.com/projects/swingline | (d) | Tek sürekli çizgiyle görsel | Gravür için değil | Düşük |
| SVG `feTurbulence` + `feDisplacementMap` (tarayıcı) | MDN | Standart | Kâğıt/grenaj | Zaten tarayıcıda; seed sabit | Render'da yavaş olabilir |

## 8. Görüntü karşılaştırma
| Aday | Link | Lisans | İş | Takılma | Risk |
|---|---|---|---|---|---|
| ssim.js (obartra) | https://github.com/obartra/ssim | MIT | SSIM, MS-SSIM; Node | `tools/` betiğinde hedef vs render (gri, 360x640 küçült) | Küresel SSIM stilize görselde anlamsız: yapı yerine bölgesel kullan |
| @blazediff/ssim-native | https://jsr.io/@blazediff/ssim-native | MIT | Hızlı N-API SSIM | Aynı | Yeni, bakım (d) |
| scikit-image (`structural_similarity`, Sobel, histogram) | https://scikit-image.org | BSD-3 (genel bilgi; bu taramada doğrulanmadı) | SSIM + kenar yoğunluğu + L* histogramı | Python betiği: kenar yoğunluğu, L* p5/p95, bölgesel SSIM | Python ortamı gerek |
| pixelmatch | — | ISC (genel bilgi, doğrulanmadı) | Piksel fark | Kabaca, anlamsız; gerekmez | — |

Not: CLAUDE.md'deki ölçüt (L* p5/p95, C*, sıcak piksel %) zaten betikle ölçülüyor; SSIM'e ek olarak **kenar yoğunluğu + bölgesel SSIM + histogram** hedefe yakınlık için anlamlı.

## 9. Remotion + three NPR örneği
Hazır örnek proje **bulunamadı**. Parçalar var: `@remotion/three` (https://v4.remotion.dev/docs/three) + yukarıdaki toon/outline. Dikkat: sahne hareketi `useCurrentFrame()` ile sürülmeli.

---

## Öneri: en yüksek etki/maliyet

1. **Görünürlük çokgeni (visibility-polygon-js veya kendi ~60 satırlık TS, Red Blob Games'ten) + `clipPath`.** Leningrad "ışığın yolu" notunu doğrudan çözer; maliyet saatler. Önce bu.
2. **MediaPipe (Pose + Hand + Face Landmarker) çevrimdışı Python betiği**: hedef görselden eklem JSON'u; rig'in başlangıç pozu ve yüz ¾ yönü ölçülür. Tutmazsa rtmlib (ONNX) yedek. Maliyet orta; el/omuz hatalarını sayıya çevirir.
3. **FABRIK (fabrik-2d fikri / kendi kodu) kol-bacak zincirine**: omuz–dirsek–el tutarlı, omuz başlığı çapası ile; maliyet düşük, "kol boru gibi" notunu azaltır.
4. **Hedef-render sayısal kıyas (ssim.js + kenar yoğunluğu + L* histogramı, bölgesel)**: eleştirmen turlarını kısaltır, "Paris çıtası"nı betiğe bağlar; maliyet düşük.
5. **Kumaş kıvrımı: rig çapa noktalarından prosedürel Bézier + perfect-freehand + ışığa göre tarama** (kendi kodun; kütüphane yok) ve **akış-alanı hatching** (flow-field fikri, kendi Node kodu). Palto/kumaş zayıflığına yönelik en büyük kazanç; maliyet orta.

Kurulum sırası: (1) visibility → (4) kıyas betiği (diğerlerinin ölçüsü) → (3) FABRIK → (2) poz çıkarımı → (5) kıvrım + flow hatching.

Üç boyut (three.js NPR / Mixamo / MakeHuman) **ilk dalga için önerilmez**: yüz ¾, palto kıvrımı ve gravür dili için ek model/kıyafet/shader işi çok, 2B SVG rig'in üstüne kazancı belirsiz. Poz/ışık referansı için Blender'da Quaternius gövdesiyle tek seferlik silüet almak ucuz bir köprü olabilir.

## Doğrulanmayanlar
Yıldız/son güncelleme sayıları (GitHub API kapalıydı); fabrik-2d, inverse-kinematics, TriVis, spite/*, hatched, flow-fields lisansları; rtmlib/RTMPose ağırlık lisansı; MoveNet; Quaternius "QAL" değişikliği; Mixamo resmî FAQ metni; scikit-image/pixelmatch lisansı (genel bilgi).
