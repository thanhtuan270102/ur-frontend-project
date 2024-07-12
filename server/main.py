from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

app = Flask(__name__)
CORS(app)

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
        
        return jsonify(docs)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
