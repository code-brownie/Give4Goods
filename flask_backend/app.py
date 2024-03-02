from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import torch

app = Flask(__name__)
CORS(app)

model = None  # Initialize model as None

def load_model():
    global model
    if model is None:
        model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
        model.eval()

@app.route('/process_image', methods=['POST'])
def process_image():
    load_model()  # Load the model before processing the image

    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    img_bytes = image_file.read()
    img = Image.open(io.BytesIO(img_bytes))

    results = model([img])
    data = results.pandas().xyxy[0].to_json(orient="records")
    return data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
