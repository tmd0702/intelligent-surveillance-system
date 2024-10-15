import torch
import timm, os
import torchvision.transforms as transforms
from PIL import Image

mobilenet_model = timm.create_model('mobilenetv3_large_100', num_classes=2)
model = mobilenet_model
checkpoint = torch.load('/home/duc-softzone/intelligent-surveillance-system/src/face-liveness-detect/src/output/train/20241014-143720-mobilenetv3_large_100-224/model_best.pth.tar') # ie, model_best.pth.tar
model.load_state_dict(checkpoint['state_dict'])
model.eval()
preprocess = transforms.Compose([
#     transforms.Resize((224, 224)),  # Resize the image to the input size expected by MobileNetV3
    transforms.ToTensor(),  # Convert the image to a tensor
#     transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize as used during model training
])
BASE_PATH = 'data/CelebA-Spoof-large-v4/train/live'
test_dir = os.listdir(BASE_PATH)
for file in test_dir:
    image = Image.open(os.path.join(BASE_PATH, file))
    image = preprocess(image)
    image = image.unsqueeze(0)
    with torch.no_grad():  # Disable gradient calculation for inference
        output = model(image)
    probabilities = torch.nn.functional.softmax(output, dim=1).detach().numpy()

    print(file, 'live' if probabilities[0][0] >= probabilities[0][1] else "spoof", probabilities[0])