from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
from PyPDF2 import PdfReader
import docx
import spacy
import os

# TF-IDF methods
def train_model(resume_texts, jd_texts):
    documents = resume_texts + jd_texts
    vectorizer = TfidfVectorizer()
    vectorizer.fit(documents)
    return vectorizer

def get_similarity_score(resume, jd, vectorizer):
    vectors = vectorizer.transform([resume, jd])
    return cosine_similarity(vectors[0], vectors[1])[0][0]

def save_model(vectorizer, path='models/tfidf_model.pkl'):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        pickle.dump(vectorizer, f)

def load_model(path='models/tfidf_model.pkl'):
    with open(path, 'rb') as f:
        return pickle.load(f)

def extract_text_from_file(upload_file):
    filename = upload_file.filename.lower()
    if filename.endswith('.txt'):
        return upload_file.file.read().decode('utf-8')
    elif filename.endswith('.pdf'):
        reader = PdfReader(upload_file.file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    elif filename.endswith('.docx'):
        doc = docx.Document(upload_file.file)
        return "\n".join([para.text for para in doc.paragraphs])
    else:
        raise ValueError("Unsupported file format: only .txt, .pdf, .docx are allowed.")

# spaCy setup
try:
    nlp = spacy.load("en_core_web_md")
except Exception:
    nlp = None

def get_spacy_similarity(resume, jd):
    if nlp is None:
        raise Exception("spaCy model not loaded. Run: python -m spacy download en_core_web_md")
    doc1 = nlp(resume)
    doc2 = nlp(jd)
    return doc1.similarity(doc2)