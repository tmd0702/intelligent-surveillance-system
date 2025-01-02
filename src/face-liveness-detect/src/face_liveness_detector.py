import torch
import timm, os
from io import BytesIO
import numpy as np
import torchvision.transforms as transforms
from PIL import Image


class FaceLivenessDetector:
    def __init__(self, cfg):
        mobilenet_model = timm.create_model(cfg['models']['pretrained'], num_classes=2)
        self._model = mobilenet_model
        checkpoint = torch.load(cfg['models']['detector'])
        self._model.load_state_dict(checkpoint['state_dict'])
        self._model.eval()
        self._preprocess = transforms.Compose([
            #     transforms.Resize((224, 224)),  # Resize the image to the input size expected by MobileNetV3
            transforms.ToTensor(),  # Convert the image to a tensor
            #     transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize as used during model training
        ])

    def detect(self, image_bytes):
        try:
            frame = Image.open(BytesIO(image_bytes))
            frame = np.array(frame)
            processed_frame = self._preprocess(frame)
            with torch.no_grad():  # Disable gradient calculation for inference
                output = self._model(processed_frame)
            probabilities = torch.nn.functional.softmax(output, dim=1).detach().numpy()
            if probabilities[0][0] >= probabilities[0][1]:
                return 'live', probabilities[0][0]
            else:
                return 'spoof', probabilities[0][1]
        except Exception as e:
            print('liveness detection error:', e)
            return None, 0
