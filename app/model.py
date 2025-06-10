from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle

def train_model(resume_texts, jd_texts):
    documents = resume_texts + jd_texts
    vectorizer = TfidfVectorizer()
    vectorizer.fit(documents)
    return vectorizer

def get_similarity_score(resume, jd, vectorizer):
    vectors = vectorizer.transform([resume, jd])
    return cosine_similarity(vectors[0], vectors[1])[0][0]

def save_model(vectorizer, path='models/tfidf_model.pkl'):
    with open(path, 'wb') as f:
        pickle.dump(vectorizer, f)

def load_model(path='models/tfidf_model.pkl'):
    with open(path, 'rb') as f:
        return pickle.load(f)