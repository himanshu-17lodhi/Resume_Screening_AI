import os
from app.model import train_model, save_model
from pathlib import Path

def load_texts_from_folder(folder_path):
    texts = []
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if filename.endswith(".txt") and os.path.isfile(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                texts.append(f.read())
    return texts

if __name__ == "__main__":
    resume_folder = Path("sample_data/resumes").resolve()
    jd_folder = Path("sample_data/job_descriptions").resolve()
    print(f"Loading resumes from: {resume_folder}")
    resumes = load_texts_from_folder(resume_folder)
    print(f"Loading job descriptions from: {jd_folder}")
    jds = load_texts_from_folder(jd_folder)
    vectorizer = train_model(resumes, jds)
    os.makedirs("models", exist_ok=True)
    save_model(vectorizer, path="models/tfidf_model.pkl")
    print("Model trained and saved to 'models/tfidf_model.pkl'")