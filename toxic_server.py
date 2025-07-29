from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from unidecode import unidecode

app = Flask(__name__)
CORS(app) 
model = joblib.load('toxic_model.joblib')

@app.route('/predict', methods=['POST'])
def detect_toxic():
    data = request.get_json()
    text = data.get('message')

    if not text:
        return jsonify({'error': 'No message'}), 400

    # Làm sạch text (giống khi train)
    text_clean = unidecode(text)

    # Dự đoán
    prediction = model.predict([text_clean])[0]
    return jsonify({'toxic': int(prediction == 1)})

if __name__ == '__main__':
    app.run(port=5000)
