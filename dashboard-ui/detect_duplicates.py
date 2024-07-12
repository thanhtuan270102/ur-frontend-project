from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)

@app.route('/api/train-model', methods=['POST'])
def train_model():
    data = request.get_json()
    docs = data['docs']

    # Xử lý dữ liệu với Pandas và huấn luyện mô hình
    df = pd.DataFrame(docs)
    X = df[['feature1', 'feature2', ...]]
    y = df['target']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LogisticRegression()
    model.fit(X_train, y_train)

    # Đánh giá mô hình và lưu trữ kết quả
    accuracy = model.score(X_test, y_test)
    model.save('trained_model.pkl')

    return jsonify({'accuracy': accuracy})

if __name__ == '__main__':
    app.run(debug=True)
