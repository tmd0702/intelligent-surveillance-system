from ultralytics import YOLO
import cv2
import utils
import torch
from PIL import Image
import io
import sys
import base64
from models.rapidocr_openvino import RapidOCR
from tools.predict_det import TextDetector
from time import time
import numpy as np
import tools.infer.utility as utility
import matplotlib.pyplot as plt

class PlateRecognizer:
    def __init__(self, cfg):
        sys.argv = ['']
        args, unknown = utility.init_args().parse_known_args()
        args.det_model_dir = cfg["models"]["text_detector"]
        self._device = torch.device('cuda:0' if torch.cuda.is_available else 'cpu')
        self._plate_detector = YOLO(cfg['models']['detector'])
        self._rapidocr_model = RapidOCR()
        self._text_detector = TextDetector(args)

    def recog(self, frame_bytes):
        frame = Image.open(io.BytesIO(frame_bytes))

        # Convert the PIL image to a NumPy array
        frame = np.array(frame)
        # = np.array(Image.open(BytesIO(image_bytes)))
#         frame_center_x, frame_center_y = frame.shape[1] / 2, frame.shape[0] / 2
        license_plates = self._plate_detector(frame)
        if len(license_plates):
            true_plate = license_plates[0]
        else:
            return {'text': '', 'rec_conf': 0, 'det_conf': 0, 'cropped_image': ""}
        if not len(true_plate.boxes):
            return {'text': '', 'rec_conf': 0, 'det_conf': 0, 'cropped_image': ""}
        #true_plate = utils.find_center_plate(license_plates, frame_center_x, frame_center_y)
        true_plate_box = true_plate.boxes[0]
        x1, y1, x2, y2 = true_plate_box.xyxy[0][0], true_plate_box.xyxy[0][1], true_plate_box.xyxy[0][2], true_plate_box.xyxy[0][3]
        score, class_id = true_plate_box.conf[0], true_plate.names[int(true_plate_box.cls[0])]
        license_plate_crop = frame[int(y1):int(y2), int(x1): int(x2), :]
        print('shape', license_plate_crop.shape)
        success, encoded_image = cv2.imencode('.jpg', license_plate_crop)
        if not success:
            print("Image encoding failed")
        base64_data = base64.b64encode(encoded_image).decode('utf-8')
        license_plate_text, rec_conf = self.read_license_plate(license_plate_crop)
        print('b64 length:', len(base64_data))
        result = {'text': license_plate_text, 'rec_conf': rec_conf, 'det_conf': score.cpu().item(), 'cropped_image': base64_data}
        return result


    def read_license_plate(self, frame):
        try:
            result_boxes, time_detect = self._text_detector(frame)
            width_max = 0
            index_width_max = None
            for index, box in enumerate(result_boxes):
                left_top_point = box[0]
                right_bottom_point = box[2]

                width_temp = right_bottom_point[0] - left_top_point[0]
                if width_temp > width_max:
                    width_max = width_temp
                    index_width_max = index
            angle = 90
            try:
                angle = cv2.minAreaRect(result_boxes[index_width_max])[-1]
                if angle < 45:
                    angle = angle
                else:
                    angle = angle - 90
            except Exception as e:
                print(e)
            (h, w) = frame.shape[:2]
            center = (w // 2, h // 2)
            M = cv2.getRotationMatrix2D(center, angle, 1.0)
            rotated_frame = cv2.warpAffine(frame, M, (w, h), flags=cv2.INTER_CUBIC,
                                        borderMode=cv2.BORDER_REPLICATE)
            result_boxes, time_detect = self._text_detector(rotated_frame)
            final_text, conf_list = '', []
            for index, point in enumerate(result_boxes):
                start_time = time()
                point = utils.margin_pst(point)
                cropped_frame = utils.four_point_transform(rotated_frame, point)
                cropped_frame = cv2.cvtColor(cropped_frame, cv2.COLOR_BGR2RGB)
#                 cropped_frame = Image.fromarray(cropped_frame)
                result = self._rapidocr_model(cropped_frame)[0][0]
                result_text, confidence = result[1], result[2]
                final_text = result_text + ' ' + final_text
                conf_list.append(confidence)
#             result = self._rapidocr_model(frame)[0][0]
#             result_text, confidence = result[1], result[2]
            return final_text.strip().replace('[', '').replace('·', '-').replace(']', '').replace(':', ''), np.mean(conf_list)
        except Exception as e:
            print(e)
            return '', 0