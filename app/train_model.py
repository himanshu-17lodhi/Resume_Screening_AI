import os
from model import train_model, save_model


def load_texts_from_folder(folder_path):
    texts = []
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if filename.endswith(".txt") and os.path.isfile(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                texts.append(f.read())
    return texts

# Load resumes and job descriptions
resume_folder = os.path.abspath("sample_data/resumes")
jd_folder = os.path.abspath("sample_data/job_descriptions")

print("Loading resumes from:", resume_folder)
resumes = load_texts_from_folder(resume_folder)

print("Loading job descriptions from:", jd_folder)
jds = load_texts_from_folder(jd_folder)

# Train and save the model
vectorizer, _ = train_model(resumes, jds)
save_model(vectorizer)
print("Model trained and saved to 'model/tfidf_model.pkl'")
