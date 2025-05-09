from fastapi import FastAPI, UploadFile
from app.model import load_model, get_similarity_score

app = FastAPI()
vectorizer = load_model()

@app.post("/predict/")
async def match_score(resume: UploadFile, jd: UploadFile):
    resume_text = await resume.read()
    jd_text = await jd.read()
    score = get_similarity_score(resume_text.decode(), jd_text.decode(), vectorizer)
    return {"match_score": round(score * 100, 2)}
