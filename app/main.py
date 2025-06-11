from fastapi import FastAPI, UploadFile, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.model import (
    load_model, 
    get_similarity_score, 
    extract_text_from_file, 
    get_spacy_similarity,
    nlp
)
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the frontend directory to serve static files
frontend_dir = os.path.join(os.path.dirname(__file__), "frontend")
app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="static")

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
async def match_score(resume: UploadFile, jd: UploadFile, method: str = "tfidf"):
    try:
        resume_text = extract_text_from_file(resume)
        jd_text = extract_text_from_file(jd)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    if method == "spacy":
        if nlp is None:
            raise HTTPException(status_code=500, detail="spaCy model not loaded.")
        score = get_spacy_similarity(resume_text, jd_text)
    else:
        if vectorizer is None:
            raise HTTPException(status_code=500, detail="TF-IDF model not loaded.")
        score = get_similarity_score(resume_text, jd_text, vectorizer)
    return {"match_score": round(score * 100, 2)}

@app.post("/predict/text/")
async def match_score_text(payload: dict = Body(...)):
    resume_text = payload.get("resume", "")
    jd_text = payload.get("jd", "")
    method = payload.get("method", "tfidf")
    if not resume_text or not jd_text:
        raise HTTPException(status_code=400, detail="Both resume and JD text must be provided.")

    if method == "spacy":
        if nlp is None:
            raise HTTPException(status_code=500, detail="spaCy model not loaded.")
        score = get_spacy_similarity(resume_text, jd_text)
    else:
        if vectorizer is None:
            raise HTTPException(status_code=500, detail="TF-IDF model not loaded.")
        score = get_similarity_score(resume_text, jd_text, vectorizer)
    return {"match_score": round(score * 100, 2)}
