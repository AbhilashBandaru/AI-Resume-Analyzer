// =========================================
// SAMPLE ANALYSIS DATA
// =========================================

const analysisData = {
    match_score: 87,

    matched_skills: [
        "Python",
        "Django",
        "PostgreSQL",
        "Git",
        "REST API"
    ],

    missing_skills: [
        "Docker",
        "AWS",
        "React"
    ],

    recommendations: [
        "Add more REST API development experience to your projects.",
        "Highlight your PostgreSQL database experience.",
        "Consider adding Docker experience to your technical skills."
    ]
};


// =========================================
// GET HTML ELEMENTS
// =========================================

const matchScore = document.getElementById("matchScore");

const matchedSkills = document.getElementById("matchedSkills");

const missingSkills = document.getElementById("missingSkills");

const recommendations = document.getElementById("recommendations");


// =========================================
// DISPLAY MATCH SCORE
// =========================================

matchScore.textContent = analysisData.match_score;


// =========================================
// DISPLAY MATCHED SKILLS
// =========================================

matchedSkills.innerHTML = "";

analysisData.matched_skills.forEach(function (skill) {

    const skillElement = document.createElement("span");

    skillElement.classList.add("skill", "matched");

    skillElement.textContent = skill;

    matchedSkills.appendChild(skillElement);

});


// =========================================
// DISPLAY MISSING SKILLS
// =========================================

missingSkills.innerHTML = "";

analysisData.missing_skills.forEach(function (skill) {

    const skillElement = document.createElement("span");

    skillElement.classList.add("skill", "missing");

    skillElement.textContent = skill;

    missingSkills.appendChild(skillElement);

});


// =========================================
// DISPLAY RECOMMENDATIONS
// =========================================

recommendations.innerHTML = "";

analysisData.recommendations.forEach(function (recommendation, index) {

    const recommendationElement = document.createElement("div");

    recommendationElement.classList.add("recommendation");


    const numberElement = document.createElement("span");

    numberElement.classList.add("recommendation-number");

    numberElement.textContent =
        String(index + 1).padStart(2, "0");


    const textElement = document.createElement("p");

    textElement.textContent = recommendation;


    recommendationElement.appendChild(numberElement);

    recommendationElement.appendChild(textElement);

    recommendations.appendChild(recommendationElement);

});