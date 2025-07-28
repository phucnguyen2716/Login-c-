from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load model và vectorizer đã train
model = joblib.load('toxic_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def detect_toxic():
    data = request.get_json()
    text = data.get('message')

    if not text:
        return jsonify({'error': 'No message'}), 400

    vector = vectorizer.transform([text])
    prediction = model.predict(vector)

    is_toxic = prediction[0] == 1
    return jsonify({'toxic': is_toxic})

if __name__ == '__main__':
    app.run(port=5000)
