import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from joblib import dump
from unidecode import unidecode

# 1. Load dữ liệu
df = pd.read_csv("toxic_comments.csv")

# 2. Loại bỏ dấu tiếng Việt
df['text'] = df['text'].apply(lambda x: unidecode(str(x)))

# 3. Tách dữ liệu train/test
X_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.2, random_state=42)

# 4. Tạo pipeline vectorizer + classifier
model = make_pipeline(
    CountVectorizer(),
    MultinomialNB()
)

# 5. Huấn luyện mô hình
model.fit(X_train, y_train)

# 6. Đánh giá mô hình
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# 7. Lưu mô hình
dump(model, 'toxic_model.joblib')
