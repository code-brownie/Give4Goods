import argparse
import io
from PIL import Image

import torch
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/process_image", methods=["POST"])
def process_image():
    if "image" not in request.files:

        return jsonify({"error": "No image file provided"})

    image_file = request.files["image"]
    img_bytes = image_file.read()
    img = Image.open(io.BytesIO(img_bytes))
    results = model([img])
    data = results.pandas().xyxy[0].to_json(orient="records")
    return data


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask app exposing yolov5 models")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    args = parser.parse_args()

    try:
        model = torch.hub.load("ultralytics/yolov5", "yolov5s", pretrained=True)
        model.eval()
        print("Model loaded successfully.")
    except Exception as e:
        print("Error loading the model:", e)
    app.run(host="0.0.0.0", port=args.port)
