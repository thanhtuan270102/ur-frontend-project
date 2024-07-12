from flask import Flask, request, jsonify, send_from_directory, render_template_string
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import os
import matplotlib.pyplot as plt
import numpy as np

app = Flask(__name__)
CORS(app)

if not os.path.exists('static'):
    os.makedirs('static')

@app.route('/cluster', methods=['POST'])
def cluster_docs():
    try:
        data = request.json
        docs = data['docs']
        
        descriptions = [doc['describeOfDoc'] for doc in docs]
        
        tfidf_vectorizer = TfidfVectorizer()
        tfidf_matrix = tfidf_vectorizer.fit_transform(descriptions)
        
        num_clusters = 3
        km = KMeans(n_clusters=num_clusters, random_state=42)
        km.fit(tfidf_matrix)
        
        clusters = km.labels_.tolist()
        
        for i in range(len(docs)):
            docs[i]['cluster'] = clusters[i]
        
        # Tính số lượng tài liệu trong mỗi cụm
        unique, counts = np.unique(clusters, return_counts=True)
        cluster_counts = dict(zip(unique, counts))
        
        # Tạo biểu đồ thanh
        plt.figure(figsize=(8, 6))
        plt.bar(cluster_counts.keys(), cluster_counts.values())
        plt.title('Các cụm văn bản ')
        plt.xlabel('Cụm')
        plt.ylabel('Số lượng văn bản')
        
        # Lưu biểu đồ vào tệp
        img_path = os.path.join('static', 'cluster_bar_chart.png')
        plt.savefig(img_path)
        
        plt.close()
        
        return jsonify(docs)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
