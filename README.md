# Resume Screening AI

![Resume Screening AI Banner](assets/resume_ai_banner.png)

_Resume Screening AI is an intelligent, automated system for parsing, evaluating, and ranking resumes using Natural Language Processing (NLP) and Machine Learning. Built with Python, it streamlines the recruitment process by quickly identifying the best candidates based on customizable criteria._

---

## Demo

### Home Page
![Home Demo](assets/demo_home.png)

### Upload Resume & Set Criteria
![Upload Demo](assets/demo_upload.png)

### Ranked Results and Visual Analytics
![Results Demo](assets/demo_results.png)

---

## Features

- **Automated Resume Parsing**: Extracts key information (skills, experience, education, etc.) from PDF/DOCX resumes.
- **Customizable Screening**: Supports user-defined job requirements and keyword matching.
- **Intelligent Ranking**: Ranks candidates based on skill match, experience, and customizable weights.
- **NLP-Powered Analysis**: Uses advanced NLP to understand context and relevance in resumes.
- **Interactive UI**: Review, filter, and export results easily via a user-friendly web interface (Streamlit).
- **Visual Insights**: Graphs and charts for candidate distribution, skills coverage, and more.

---

## Getting Started

### 1. Prerequisites

- Python 3.7+
- pip (Python package manager)
- (Optional) Virtual environment tool: `venv` or `conda`

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/himanshu-17lodhi/Resume_Screening_AI.git
cd Resume_Screening_AI
pip install -r requirements.txt
```

### 3. Running the App

```bash
streamlit run app.py
```
The app will open in your browser (usually at http://localhost:8501).

---

## Project Structure

```
Resume_Screening_AI/
│
├── app.py                   # Streamlit app entry point
├── requirements.txt         # Python dependencies
├── parser/                  # Resume parsing scripts
├── models/                  # Machine Learning models/utilities
├── data/                    # Sample resumes and datasets
├── assets/                  # Demo images, banners, logos
├── README.md
└── ...
```

---

## Usage Guide

### 1. Upload Resumes

- Drag and drop PDF or DOCX files, or use the sample resumes provided.

### 2. Set Screening Criteria

- Input job requirements, keywords, and weights for skills/experience/education.

### 3. Run Screening

- The AI parses, matches, and ranks candidates.
- View top matches, download ranked results, and explore visual analytics.

---

## Technologies Used

- **Python**
- **Streamlit**
- **spaCy / NLTK** (NLP processing)
- **scikit-learn / XGBoost** (ML models, if used)
- **pdfminer / python-docx** (Document parsing)
- **pandas**, **numpy**
- **matplotlib / seaborn** (Visualization)

---

## Example Data Format

#### Parsed Resume Sample

| Name     | Skills                | Experience (yrs) | Education         | Score  |
|----------|-----------------------|------------------|-------------------|--------|
| Abhimanyu kumar    | Python, ML, SQL       | 3                | B.Tech CS         | 89.5   |
| Rajat Prajapati   | Java, Project   | 5                | M.Tech IT         | 91.2   |

---

## Contributing

We welcome contributions!

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## FAQ

**Q: Can I use my own resumes?**  
A: Yes! Upload your PDF/DOCX files in the app.

**Q: Are results exportable?**  
A: Yes, you can download the ranked results as CSV.

**Q: Can I add new screening criteria?**  
A: Absolutely. The sidebar allows for full customization.

---

## Contact

For questions, suggestions, or collaborations:
- GitHub: [@himanshu-17lodhi](https://github.com/himanshu-17lodhi)

---

## Star This Project

If you find Resume Screening AI helpful, please give it a ⭐ on [GitHub](https://github.com/himanshu-17lodhi/Resume_Screening_AI)!

---

_Resume Screening AI: Fast, fair, and intelligent resume screening for modern recruiters._
