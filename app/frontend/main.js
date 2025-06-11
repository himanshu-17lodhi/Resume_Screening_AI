const API_BASE = "http://localhost:8000";
const LS_RESUME = "saved_resume";
const LS_JD = "saved_jd";
const SAMPLE_RESUME = `John Doe
Software Engineer

Summary:
Experienced software engineer with 5+ years in backend development, specializing in Python, Django, and RESTful API design. Adept in cloud deployment, CI/CD pipelines, and cross-functional team collaboration.

Skills:
- Python, Django, Flask
- REST API development
- SQL, PostgreSQL, MongoDB
- Docker, Kubernetes
- AWS (EC2, Lambda, S3)
- Git, Jenkins, CI/CD
- Agile methodologies

Experience:
Software Engineer, Acme Corp (2021-Present)
- Led the development of a microservices-based architecture for a high-traffic e-commerce platform.
- Automated deployment workflows using Docker and Jenkins.
- Optimized database queries, reducing response times by 30%.

Software Developer, Beta Solutions (2018-2021)
- Built REST APIs for mobile and web applications.
- Implemented authentication and authorization modules using JWT.
- Collaborated with cross-functional teams to deliver projects on schedule.

Education:
B.Tech in Computer Science, XYZ University (2014-2018)`;

const SAMPLE_JD = `Job Title: Backend Developer (Python)

We are seeking a Backend Developer experienced in Python and Django to join our fast-paced engineering team. The ideal candidate will have:

Responsibilities:
- Develop and maintain RESTful APIs for our SaaS platform.
- Work with PostgreSQL and MongoDB databases.
- Deploy and manage applications on AWS.
- Implement CI/CD pipelines using Jenkins or similar tools.
- Collaborate with frontend developers and product managers.
- Write clean, maintainable, and testable code.

Requirements:
- 3+ years of experience in backend development.
- Strong proficiency in Python and Django.
- Experience with REST API design, Docker, and cloud services (AWS preferred).
- Familiarity with Git, Agile development, and automated testing.
- Excellent communication and teamwork skills.

Preferred:
- Experience with Flask, microservices, and Kubernetes.
- Knowledge of authentication protocols.`;

function showSpinner() {
    document.getElementById('score-block').innerHTML = '<div class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status"></div></div>';
}
function hideSpinner() {
    document.getElementById('score-block').innerHTML = '';
}
function showResult(score) {
    let color = "success";
    if (score < 50) color = "danger";
    else if (score < 75) color = "warning";
    document.getElementById('score-block').innerHTML =
        `<span class="badge bg-${color} score-badge">Match Score: ${score}%</span>`;
}
function showError(msg) {
    document.getElementById('score-block').innerHTML = `<div class="alert alert-danger">${msg}</div>`;
}
function showNotification(msg, type="success") {
    document.getElementById('result-block').innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
    setTimeout(() => { document.getElementById('result-block').innerHTML = ""; }, 2500);
}
function readTextFromFile(file, callback) {
    const reader = new FileReader();
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        callback("PDF preview not supported. File will still be scored.");
    } else if (file.name.endsWith(".docx")) {
        callback("DOCX preview not supported. File will still be scored.");
    } else {
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsText(file);
    }
}
document.getElementById('resume-file').addEventListener('change', function() {
    const file = this.files[0];
    if (file) readTextFromFile(file, text => {
        document.getElementById('resume-text').value = "";
        showNotification("Resume file loaded.", "info");
    });
});
document.getElementById('jd-file').addEventListener('change', function() {
    const file = this.files[0];
    if (file) readTextFromFile(file, text => {
        document.getElementById('jd-text').value = "";
        showNotification("JD file loaded.", "info");
    });
});
document.getElementById('compare-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const resumeFile = document.getElementById('resume-file').files[0];
    const jdFile = document.getElementById('jd-file').files[0];
    const resumeText = document.getElementById('resume-text').value.trim();
    const jdText = document.getElementById('jd-text').value.trim();
    const method = document.getElementById('method').value;

    if (!resumeFile && !resumeText) return showError("Please upload or paste a resume.");
    if (!jdFile && !jdText) return showError("Please upload or paste a job description.");
    showSpinner();
    if (resumeFile || jdFile) {
        let url = `${API_BASE}/predict/`;
        if (method === "spacy") url += "?method=spacy";
        const formData = new FormData();
        if (resumeFile) formData.append("resume", resumeFile);
        if (jdFile) formData.append("jd", jdFile);
        try {
            const resp = await fetch(url, { method: "POST", body: formData });
            if (!resp.ok) throw new Error('Server error');
            const data = await resp.json();
            showResult(data.match_score);
        } catch (err) {
            showError("Failed to fetch result.");
        }
    } else {
        try {
            const resp = await fetch(`${API_BASE}/predict/text/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resume: resumeText, jd: jdText, method })
            });
            if (!resp.ok) throw new Error('Server error');
            const data = await resp.json();
            showResult(data.match_score);
        } catch (err) {
            showError("Failed to fetch result.");
        }
    }
});
document.getElementById('save-resume').addEventListener('click', function() {
    const text = document.getElementById('resume-text').value.trim();
    if (text) {
        localStorage.setItem(LS_RESUME, text);
        showNotification("Resume saved!", "success");
    } else showNotification("Paste resume text to save.", "warning");
});
document.getElementById('load-resume').addEventListener('click', function() {
    const text = localStorage.getItem(LS_RESUME) || "";
    if (text) {
        document.getElementById('resume-text').value = text;
        document.getElementById('resume-file').value = "";
        showNotification("Resume loaded!", "success");
    } else showNotification("No saved resume.", "warning");
});
document.getElementById('clear-resume').addEventListener('click', function() {
    document.getElementById('resume-text').value = "";
    document.getElementById('resume-file').value = "";
    showNotification("Resume cleared.", "info");
});
document.getElementById('save-jd').addEventListener('click', function() {
    const text = document.getElementById('jd-text').value.trim();
    if (text) {
        localStorage.setItem(LS_JD, text);
        showNotification("JD saved!", "success");
    } else showNotification("Paste JD text to save.", "warning");
});
document.getElementById('load-jd').addEventListener('click', function() {
    const text = localStorage.getItem(LS_JD) || "";
    if (text) {
        document.getElementById('jd-text').value = text;
        document.getElementById('jd-file').value = "";
        showNotification("JD loaded!", "success");
    } else showNotification("No saved JD.", "warning");
});
document.getElementById('clear-jd').addEventListener('click', function() {
    document.getElementById('jd-text').value = "";
    document.getElementById('jd-file').value = "";
    showNotification("JD cleared.", "info");
});
document.getElementById('sample-resume').addEventListener('click', function() {
    document.getElementById('resume-text').value = SAMPLE_RESUME;
    document.getElementById('resume-file').value = "";
    showNotification("Sample resume loaded.", "info");
});
document.getElementById('sample-jd').addEventListener('click', function() {
    document.getElementById('jd-text').value = SAMPLE_JD;
    document.getElementById('jd-file').value = "";
    showNotification("Sample JD loaded.", "info");
});