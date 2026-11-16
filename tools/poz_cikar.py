#!/usr/bin/env python3
"""Hedef görselden MediaPipe Tasks ile poz/el/yüz eklemleri -> JSON (animasyon için sayısal başlangıç).
Kullanım: python3 -I tools/poz_cikar.py hedef.png out.json [--kisi N] [--sayfa out.jpg] [--pose-model heavy|full]
Gereksinim: pip install mediapipe opencv-python-headless ; modeller tools/modeller/*.task

Çıktı: {kaynak,w,h,kisi_sayisi,kisi,pose:{ad:[x_px,y_px,z,gorunurluk]},el_sol?,el_sag?,yuz?:{yaw,pitch,roll,noktalar}}
 - "sol/sağ" = KİŞİNİN kendi solu/sağı (MediaPipe adlandırması; kişi kameraya bakıyorsa kişinin solu görüntünün sağıdır).
 - pose z: kalça ortasına göre göreli derinlik (küçük = kameraya yakın), x ile benzer ölçek.
 - yaw  (+): kişi KENDİ soluna döner (burun görüntüde sağa kayar); (-) kendi sağına.
 - pitch(+): baş yukarı bakar (çene kalkar); (-) aşağı bakar.
 - roll (+): baş kişinin kendi SAĞ omzuna yatar (görüntüde başın üstü sola devrilir); (-) sol omza.
   Üçü de yüz dönüşüm matrisinden; işaret her çıktıda burun ofsetiyle çapraz kontrol edilir (yuz.kontrol).
"""
import argparse, json, math, os, sys
import numpy as np
import cv2
import mediapipe as mp
from mediapipe.tasks import python as mpt
from mediapipe.tasks.python import vision

MOD = os.path.join(os.path.dirname(os.path.abspath(__file__)), "modeller")
POSE_AD = ["nose","left_eye_inner","left_eye","left_eye_outer","right_eye_inner","right_eye","right_eye_outer",
 "left_ear","right_ear","mouth_left","mouth_right","left_shoulder","right_shoulder","left_elbow","right_elbow",
 "left_wrist","right_wrist","left_pinky","right_pinky","left_index","right_index","left_thumb","right_thumb",
 "left_hip","right_hip","left_knee","right_knee","left_ankle","right_ankle","left_heel","right_heel",
 "left_foot_index","right_foot_index"]
# face mesh: 33/133 = kişinin sağ göz dış/iç, 263/362 = sol göz dış/iç; 61/291 ağız sağ/sol; 234/454 sağ/sol yüz kenarı (kulak hizası)
YUZ_IDX = {"burun":1,"cene":152,"agiz_sol":291,"agiz_sag":61,"sol_kulak":454,"sag_kulak":234}

def opts(model):
    return mpt.BaseOptions(model_asset_path=os.path.join(MOD, model))

def euler(M):
    R = np.array(M)[:3,:3]
    sy = math.hypot(R[0,0], R[2,0])
    # kamera uzayı: x sağ, y yukarı, z kameraya doğru
    pitch = math.degrees(math.atan2(-R[2,1], R[2,2])) if False else math.degrees(math.atan2(R[2,1], R[2,2]))
    yaw = math.degrees(math.atan2(-R[2,0], sy))
    roll = math.degrees(math.atan2(R[1,0], R[0,0]))
    return yaw, pitch, roll

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("gorsel"); ap.add_argument("cikti")
    ap.add_argument("--kisi", type=int, default=None, help="0=en büyük (varsayılan), N=boyuta göre N. kişi")
    ap.add_argument("--sayfa"); ap.add_argument("--pose-model", default="heavy")
    ap.add_argument("--maks-kisi", type=int, default=6)
    a = ap.parse_args()
    img = mp.Image.create_from_file(a.gorsel)
    h, w = img.height, img.width
    bgr = cv2.imread(a.gorsel)

    with vision.PoseLandmarker.create_from_options(vision.PoseLandmarkerOptions(
            base_options=opts(f"pose_landmarker_{a.pose_model}.task"), num_poses=a.maks_kisi,
            min_pose_detection_confidence=0.2, min_pose_presence_confidence=0.2, min_tracking_confidence=0.2)) as pl:
        pr = pl.detect(img)
    kisiler = pr.pose_landmarks
    out = {"kaynak": a.gorsel, "w": w, "h": h, "kisi_sayisi": len(kisiler)}
    if not kisiler:
        out["hata"] = "poz bulunamadı"
        json.dump(out, open(a.cikti, "w"), ensure_ascii=False, indent=1); print("poz yok"); return 1
    def alan(lm):
        xs=[p.x*w for p in lm]; ys=[p.y*h for p in lm]; return (max(xs)-min(xs))*(max(ys)-min(ys))
    sira = sorted(range(len(kisiler)), key=lambda i: -alan(kisiler[i]))
    secim = sira[min(a.kisi or 0, len(sira)-1)] if a.kisi else sira[0]
    lm = kisiler[secim]; out["kisi"] = secim
    out["pose"] = {POSE_AD[i]: [round(p.x*w,1), round(p.y*h,1), round(p.z*w,1), round(getattr(p,"visibility",0) or 0,3)] for i,p in enumerate(lm)}
    P = out["pose"]

    def kirp(merkez, yari, olcek=2.5):
        """merkez etrafında kare kırp + büyüt; (mp.Image, x0, y0, olcek)"""
        cx, cy = merkez; x0=int(max(0,cx-yari)); y0=int(max(0,cy-yari)); x1=int(min(w,cx+yari)); y1=int(min(h,cy+yari))
        c = cv2.resize(bgr[y0:y1, x0:x1], None, fx=olcek, fy=olcek, interpolation=cv2.INTER_CUBIC)
        return mp.Image(image_format=mp.ImageFormat.SRGB, data=cv2.cvtColor(c, cv2.COLOR_BGR2RGB)), x0, y0, olcek

    el_ops = vision.HandLandmarkerOptions(base_options=opts("hand_landmarker.task"), num_hands=4,
            min_hand_detection_confidence=0.1, min_hand_presence_confidence=0.1)
    out["tespit_notu"] = []
    with vision.HandLandmarker.create_from_options(el_ops) as hl:
        tam = hl.detect(img).hand_landmarks
        for ad, key in (("left_wrist","el_sol"),("right_wrist","el_sag")):
            wx, wy = P[ad][0], P[ad][1]; en=None; eb=1e9
            for hand in tam:
                d = math.hypot(hand[0].x*w-wx, hand[0].y*h-wy)
                if d < eb: eb, en = d, hand
            if en is not None and eb < 0.08*h:
                out[key] = [[round(p.x*w,1), round(p.y*h,1), round(p.z*w,1)] for p in en]; continue
            if P[ad][3] < 0.3: continue
            # yedek: bilek çevresi kırp+büyüt
            ki, x0, y0, ol = kirp((wx, wy), 0.09*h)
            r = hl.detect(ki).hand_landmarks
            if r:
                out[key] = [[round(x0+p.x*ki.width/ol,1), round(y0+p.y*ki.height/ol,1), round(p.z*ki.width/ol,1)] for p in r[0]]
                out["tespit_notu"].append(f"{key}: kırpılmış/büyütülmüş yedek ile bulundu")
    # yüz: buruna en yakın; bulunamazsa baş kırpımı
    face_ops = vision.FaceLandmarkerOptions(base_options=opts("face_landmarker.task"), num_faces=6,
            output_facial_transformation_matrixes=True, min_face_detection_confidence=0.1, min_face_presence_confidence=0.1)
    nx, ny = P["nose"][0], P["nose"][1]
    f = M = None
    with vision.FaceLandmarker.create_from_options(face_ops) as fl:
        fr = fl.detect(img)
        if fr.face_landmarks:
            j = min(range(len(fr.face_landmarks)), key=lambda i: math.hypot(fr.face_landmarks[i][1].x*w-nx, fr.face_landmarks[i][1].y*h-ny))
            f = [(q.x*w, q.y*h) for q in fr.face_landmarks[j]]
            M = fr.facial_transformation_matrixes[j] if fr.facial_transformation_matrixes else None
        elif P["nose"][3] > 0.3 or P["left_eye"][3] > 0.3 or P["right_eye"][3] > 0.3:
            bas = max(abs(P["left_ear"][0]-P["right_ear"][0]), abs(P["left_eye"][0]-P["right_eye"][0])*2.5, 0.06*h)
            ki, x0, y0, ol = kirp((nx, ny), bas*1.6)
            r = fl.detect(ki)
            if r.face_landmarks:
                f = [(x0+q.x*ki.width/ol, y0+q.y*ki.height/ol) for q in r.face_landmarks[0]]
                M = r.facial_transformation_matrixes[0] if r.facial_transformation_matrixes else None
                out["tespit_notu"].append("yuz: kırpılmış/büyütülmüş yedek ile bulundu")
    if f is not None:
        pt = lambda i: [round(f[i][0],1), round(f[i][1],1)]
        nok = {k: pt(i) for k,i in YUZ_IDX.items()}
        mid = lambda a_,b_: [round((f[a_][0]+f[b_][0])/2,1), round((f[a_][1]+f[b_][1])/2,1)]
        nok["sag_goz"] = mid(33,133); nok["sol_goz"] = mid(263,362)
        yaw=pitch=roll=None
        if M is not None: yaw, pitch, roll = euler(M)
        ex = (nok["sol_kulak"][0]+nok["sag_kulak"][0])/2; gen = abs(nok["sol_kulak"][0]-nok["sag_kulak"][0]) or 1
        yaw_geo = (nok["burun"][0]-ex)/gen   # + = burun görüntüde sağa = kişi kendi soluna
        dx = nok["sol_goz"][0]-nok["sag_goz"][0]; dy = nok["sol_goz"][1]-nok["sag_goz"][1]
        r1 = lambda v: None if v is None else round(v,1)
        out["yuz"] = {"yaw": r1(yaw), "pitch": r1(pitch), "roll": r1(roll), "noktalar": nok,
               "kontrol": {"yaw_geo_burun_ofset": round(yaw_geo,3), "goz_cizgisi_egimi_deg": round(math.degrees(math.atan2(dy,dx)),1)}}
    if not out["tespit_notu"]: del out["tespit_notu"]
    json.dump(out, open(a.cikti, "w"), ensure_ascii=False, indent=1)

    if a.sayfa:
        im = bgr.copy(); t = max(2, w//300)
        CON = [(11,12),(11,13),(13,15),(12,14),(14,16),(11,23),(12,24),(23,24),(23,25),(25,27),(24,26),(26,28),(27,31),(28,32),(27,29),(28,30)]
        pt2 = lambda i: (int(lm[i].x*w), int(lm[i].y*h))
        for i,j2 in CON:
            cv2.line(im, pt2(i), pt2(j2), (0,255,0) if min(lm[i].visibility,lm[j2].visibility)>0.5 else (0,165,255), t)
        for i in range(33):
            v = lm[i].visibility; cv2.circle(im, pt2(i), t+2, (0,0,255) if v<0.5 else (255,200,0), -1)
        HC=[(0,1),(1,2),(2,3),(3,4),(0,5),(5,6),(6,7),(7,8),(5,9),(9,10),(10,11),(11,12),(9,13),(13,14),(14,15),(15,16),(13,17),(17,18),(18,19),(19,20),(0,17)]
        for key,col in (("el_sol",(255,0,255)),("el_sag",(255,255,0))):
            if key in out:
                q=out[key]
                for i,j2 in HC: cv2.line(im,(int(q[i][0]),int(q[i][1])),(int(q[j2][0]),int(q[j2][1])),col,max(1,t//2))
                for p in q: cv2.circle(im,(int(p[0]),int(p[1])),max(2,t//2+1),col,-1)
        if "yuz" in out:
            for k,p in out["yuz"]["noktalar"].items():
                cv2.circle(im,(int(p[0]),int(p[1])),t+1,(0,255,255),-1)
                cv2.putText(im,k,(int(p[0])+6,int(p[1])),cv2.FONT_HERSHEY_SIMPLEX,0.45,(0,255,255),1,cv2.LINE_AA)
            y=out["yuz"]; cv2.putText(im,f"yaw {y['yaw']} pitch {y['pitch']} roll {y['roll']}",(10,28),cv2.FONT_HERSHEY_SIMPLEX,0.8,(0,255,255),2,cv2.LINE_AA)
        cv2.imwrite(a.sayfa, im, [cv2.IMWRITE_JPEG_QUALITY, 90])
    dus = [k for k,v in out["pose"].items() if v[3] < 0.5]
    print(f"kisi {len(kisiler)} | el_sol {'el_sol' in out} el_sag {'el_sag' in out} yuz {'yuz' in out} | dusuk_gorunurluk(<0.5): {dus}")
    if "yuz" in out: print("yuz", {k:out['yuz'][k] for k in ('yaw','pitch','roll','kontrol')})

if __name__ == "__main__":
    sys.exit(main() or 0)
