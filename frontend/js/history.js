// =========================================
// SAMPLE HISTORY DATA
// =========================================

const historyData = [
    {
        job_title: "Python Developer",
        resume_name: "abhilash_resume.pdf",
        match_score: 87,
        date: "September 10, 2026"
    },
    {
        job_title: "AI/ML Engineer",
        resume_name: "abhilash_resume.pdf",
        match_score: 79,
        date: "September 8, 2026"
    },
    {
        job_title: "Backend Developer",
        resume_name: "abhilash_resume.pdf",
        match_score: 72,
        date: "September 5, 2026"
    }
];


// =========================================
// GET HISTORY CONTAINER
// =========================================

const historyList = document.getElementById("historyList");


// =========================================
// CLEAR STATIC HTML
// =========================================

historyList.innerHTML = "";


// =========================================
// CREATE HISTORY CARDS
// =========================================

historyData.forEach(function (analysis) {

    const historyCard = document.createElement("article");

    historyCard.classList.add("history-card");


    // -----------------------------
    // History Information
    // -----------------------------

    const historyInfo = document.createElement("div");

    historyInfo.classList.add("history-info");


    const jobTitle = document.createElement("h2");

    jobTitle.textContent = analysis.job_title;


    const resumeName = document.createElement("p");

    resumeName.textContent =
        `Resume: ${analysis.resume_name}`;


    const analysisDate = document.createElement("span");

    analysisDate.textContent = analysis.date;


    historyInfo.appendChild(jobTitle);

    historyInfo.appendChild(resumeName);

    historyInfo.appendChild(analysisDate);


    // -----------------------------
    // Score Section
    // -----------------------------

    const historyScore = document.createElement("div");

    historyScore.classList.add("history-score");


    const score = document.createElement("strong");

    score.textContent =
        `${analysis.match_score}%`;


    const viewButton = document.createElement("a");

    viewButton.href = "dashboard.html";

    viewButton.classList.add("btn", "btn-small");

    viewButton.textContent = "View Results";


    historyScore.appendChild(score);

    historyScore.appendChild(viewButton);


    // -----------------------------
    // Add Everything to Card
    // -----------------------------

    historyCard.appendChild(historyInfo);

    historyCard.appendChild(historyScore);


    historyList.appendChild(historyCard);

});