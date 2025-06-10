from app.model import train_model, save_model

# Example: You should replace these with your own data loading logic
resume_texts = [
    "Experienced software developer with expertise in Python and backend systems.",
    "Data scientist skilled in machine learning, data analysis, and visualization."
]
jd_texts = [
    "Looking for a backend developer experienced with Python and REST APIs.",
    "Seeking a data scientist with strong machine learning background."
]

vectorizer = train_model(resume_texts, jd_texts)
save_model(vectorizer)
print("Model trained and saved.")