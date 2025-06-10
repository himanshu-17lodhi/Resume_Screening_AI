const API_BASE = "http://localhost:8000";

document.getElementById('single-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const resumeFile = document.getElementById('single-resume').files[0];
    const jdFile = document.getElementById('single-jd').files[0];
    if (!resumeFile || !jdFile) return;

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jd", jdFile);

    document.getElementById('single-result').textContent = "Scoring...";
    try {
        const resp = await fetch(`${API_BASE}/predict/`, {
            method: "POST",
            body: formData
        });
        if (!resp.ok) throw new Error('Server error');
        const data = await resp.json();
        document.getElementById('single-result').textContent = `Match Score: ${data.match_score}%`;
    } catch (err) {
        document.getElementById('single-result').textContent = `Error: ${err.message}`;
    }
});

document.getElementById('batch-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const resumesFiles = document.getElementById('batch-resumes').files;
    const jdFile = document.getElementById('batch-jd').files[0];
    if (resumesFiles.length === 0 || !jdFile) return;

    const formData = new FormData();
    for (const file of resumesFiles) {
        formData.append("resumes", file);
    }
    formData.append("jd", jdFile);

    document.getElementById('batch-result').textContent = "Scoring...";
    try {
        const resp = await fetch(`${API_BASE}/predict/batch/`, {
            method: "POST",
            body: formData
        });
        if (!resp.ok) throw new Error('Server error');
        const data = await resp.json();
        if (data.results) {
            let table = `<table class="table table-sm"><thead><tr><th>Resume</th><th>Match Score (%)</th></tr></thead><tbody>`;
            data.results.forEach(result => {
                table += `<tr><td>${result.filename}</td><td>${result.match_score}</td></tr>`;
            });
            table += `</tbody></table>`;
            document.getElementById('batch-result').innerHTML = table;
        } else {
            document.getElementById('batch-result').textContent = 'No results found';
        }
    } catch (err) {
        document.getElementById('batch-result').textContent = `Error: ${err.message}`;
    }
});