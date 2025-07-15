from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS
import os
from io import BytesIO
from PIL import Image
import requests
from datetime import datetime
from dotenv import load_dotenv
import jwt
from functools import wraps

app = Flask(__name__)
CORS(app, supports_credentials=True)  # ✅ Ensure Authorization headers are accepted

load_dotenv('.env')
STABILITY_KEY = os.getenv('STABILITY_KEY')
API_HOST = "https://api.stability.ai/v2beta"
JWT_SECRET = os.getenv('JWT_SECRET', 'secret_key')
JWT_ALGORITHM = 'HS256'

def send_generation_request(host, params, files=None):
    headers = {
        "Accept": "image/*",
        "Authorization": f"Bearer {STABILITY_KEY}"
    }
    if files is None:
        files = {}

    image = params.pop("image", None)
    mask = params.pop("mask", None)
    if image:
        files["image"] = open(image, 'rb')
    if mask:
        files["mask"] = open(mask, 'rb')
    if len(files) == 0:
        files["none"] = ''

    response = requests.post(host, headers=headers, files=files, data=params)
    if not response.ok:
        raise Exception(f"HTTP {response.status_code}: {response.text}")

    return response

def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization', None)
        if not auth_header or not auth_header.startswith('Bearer '):
            print("Missing or malformed Authorization header")
            return jsonify({"error": "Missing or invalid Authorization header"}), 401

        token = auth_header.split(' ')[1]

        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            request.user_id = payload.get('id')  # ✅ Optional: attach user info
        except jwt.ExpiredSignatureError:
            print("Token expired")
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError as e:
            print(f"Invalid token: {e}")
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/generate/image', methods=['POST'])
@jwt_required
def generate_image():
    try:
        data = request.json
        prompt = data.get('prompt')
        style = data.get('style', 'Realistic')
        size = data.get('size', 'Square')

        style_map = {
            "Realistic": "photographic",
            "Abstract": "fantasy-art",
            "Cartoon": "comic-book",
            "Anime": "anime",
            "Digital Art": "digital-art",
            "Cyberpunk": "neon-punk"
        }
        style_preset = style_map.get(style, "photographic")

        size_map = {
            "Square": "1:1",
            "Portrait": "9:16",
            "Landscape": "16:9"
        }
        aspect_ratio = size_map.get(size, "1:1")

        params = {
            "prompt": prompt,
            "negative_prompt": data.get('negative_prompt', ''),
            "aspect_ratio": aspect_ratio,
            "seed": data.get('seed', 0),
            "output_format": "jpeg",
            "style_preset": style_preset
        }

        model = data.get('model', 'core')
        host = f"{API_HOST}/stable-image/generate/{model}"
        response = send_generation_request(host, params)

        if 'image' not in response.headers.get('Content-Type', ''):
            return jsonify({"error": "No image received from API"}), 500

        return Response(
            response.content,
            mimetype='image/jpeg',
            headers={
                'Content-Type': 'image/jpeg',
                'Content-Disposition': 'inline; filename=generated.jpg'
            }
        )

    except Exception as e:
        print("Generation error:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/edit/image', methods=['POST'])
@jwt_required
def edit_image():
    try:
        data = request.json
        edit_type = data.get('type')

        params = {
            "image": data.get('image'),
            "prompt": data.get('prompt'),
            "output_format": data.get('output_format', 'jpeg'),
            "seed": data.get('seed', 0)
        }

        host = f"{API_HOST}/stable-image/edit/{edit_type}"
        response = send_generation_request(host, params)

        image_data = BytesIO(response.content)
        finish_reason = response.headers.get("finish-reason")
        seed = response.headers.get("seed")

        if finish_reason == 'CONTENT_FILTERED':
            return jsonify({"error": "Content filtered"}), 400

        return jsonify({
            "status": "success",
            "seed": seed,
            "image": image_data.getvalue().decode('latin1')
        })

    except Exception as e:
        print("Edit error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    if not STABILITY_KEY:
        raise ValueError("STABILITY_KEY environment variable not set")
    app.run(debug=True, port=5000)