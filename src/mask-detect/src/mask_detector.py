from ultralytics import YOLO
import cv2
import utils
from io import BytesIO
from PIL import Image
import numpy as np

class MaskDetector:
    def __init__(self, cfg):
        self._model = YOLO(cfg['models']['detector'])

    def detect(self, image_bytes):
        frame = np.array(Image.open(BytesIO(image_bytes)))

        results = self._model(frame)
        mask_detect = {
            'label': None,
            'confidence_score': None
        }
        if len(results) == 1 and len(results[0].boxes) == 1:
            result = results[0]
            box = result.boxes[0]
            mask_detect['label'] = result.names[int(box.cls[0])]
            mask_detect['confidence_score'] = box.conf[0]
        print('result:', mask_detect)
        return mask_detect
