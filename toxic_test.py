from joblib import load
from unidecode import unidecode

# Load model đã huấn luyện
model = load("toxic_model.joblib")

while True:
    text = input("Nhập câu cần kiểm tra: ").strip()

    if not text:
        print("❌ Vui lòng nhập nội dung.")
        continue

    # Bỏ dấu tiếng Việt
    processed_text = unidecode(text)

    # Dự đoán
    prediction = model.predict([processed_text])[0]

    # Hiển thị kết quả
    if prediction == 1:
        print("🔥 Toxic")
    else:
        print("✅ Bình thường")
