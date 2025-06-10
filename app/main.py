from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.model import load_model, get_similarity_score
from typing import List
import os

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local dev; restrict in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = os.path.join("models", "tfidf_model.pkl")
try:
    vectorizer = load_model(model_path)
except Exception as e:
    vectorizer = None
    print(f"Model loading failed: {e}")

@app.get("/health/")
async def health():
    return {"status": "ok"}

@app.post("/predict/")
async def match_score(resume: UploadFile, jd: UploadFile):
    if vectorizer is None:
        raise HTTPException(status_code=500, detail="Model not loaded.")
    resume_text = (await resume.read()).decode("utf-8")
    jd_text = (await jd.read()).decode("utf-8")
    score = get_similarity_score(resume_text, jd_text, vectorizer)
    return {"match_score": round(score * 100, 2)}

@app.post("/predict/batch/")
async def batch_match_score(resumes: List[UploadFile], jd: UploadFile):
    if vectorizer is None:
        raise HTTPException(status_code=500, detail="Model not loaded.")
    jd_text = (await jd.read()).decode("utf-8")
    scores = []
    for resume in resumes:
        resume_text = (await resume.read()).decode("utf-8")
        score = get_similarity_score(resume_text, jd_text, vectorizer)
        scores.append({"filename": resume.filename, "match_score": round(score * 100, 2)})
    return {"results": scores}