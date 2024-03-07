import argparse
import io
import time
from PIL import Image

import torch
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for the specified origin
CORS(
    app,
    origins="https://give4-goods.vercel.app",
    supports_credentials=True,
    methods=["POST"],
    allow_headers=["Content-Type"],
)
# CORS(
#     app,
#     origins="http://localhost:3000",
#     supports_credentials=True,
#     methods=["POST"],
#     allow_headers=["Content-Type"],
# )


torch.hub._validate_not_a_forked_repo = lambda a, b, c: True
model = torch.hub.load("ultralytics/yolov5", "yolov5s", pretrained=True)
model.eval()


@app.route("/process_image", methods=["POST"])
def process_image():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        image_file = request.files["image"]
        img_bytes = image_file.read()
        img = Image.open(io.BytesIO(img_bytes))

        start_time = time.time()
        results = model([img])
        end_time = time.time()

        processing_time = end_time - start_time
        data = results.pandas().xyxy[0].to_dict(orient="records")
        print(data)
        print(processing_time)

        response = jsonify(data)
        # response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Origin", "https://give4-goods.vercel.app")
        response.headers.add("Access-Control-Allow-Methods", "POST")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        print(response)
        return response, 200

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask app exposing yolov5 models")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    args = parser.parse_args()
    app.run(host="0.0.0.0", port=args.port)
