const matchScore = document.getElementById("matchScore");
const matchedSkills = document.getElementById("matchedSkills");
const missingSkills = document.getElementById("missingSkills");
const recommendations = document.getElementById("recommendations");


const storedResult = sessionStorage.getItem("analysisResult");


if (!storedResult) {
    matchScore.textContent = "0";

    matchedSkills.innerHTML =
        "<p>No analysis result available.</p>";

    missingSkills.innerHTML =
        "<p>No analysis result available.</p>";

    recommendations.innerHTML =
        "<p>Please analyze a resume first.</p>";

} else {

    const analysisData = JSON.parse(storedResult);


    // Match score
    matchScore.textContent = analysisData.match_score;


    // Matched skills
    matchedSkills.innerHTML = "";

    analysisData.matched_skills.forEach(function (skill) {

        const skillElement = document.createElement("span");

        skillElement.classList.add("skill", "matched");

        skillElement.textContent = skill;

        matchedSkills.appendChild(skillElement);
    });


    // Missing skills
    missingSkills.innerHTML = "";

    analysisData.missing_skills.forEach(function (skill) {

        const skillElement = document.createElement("span");

        skillElement.classList.add("skill", "missing");

        skillElement.textContent = skill;

        missingSkills.appendChild(skillElement);
    });


    // Recommendations
    recommendations.innerHTML = "";

    analysisData.recommendations.forEach(function (
        recommendation,
        index
    ) {

        const recommendationElement =
            document.createElement("div");

        recommendationElement.classList.add("recommendation");


        const numberElement =
            document.createElement("span");

        numberElement.classList.add("recommendation-number");

        numberElement.textContent =
            String(index + 1).padStart(2, "0");


        const textElement =
            document.createElement("p");

        textElement.textContent =
            recommendation;


        recommendationElement.appendChild(
            numberElement
        );

        recommendationElement.appendChild(
            textElement
        );


        recommendations.appendChild(
            recommendationElement
        );
    });
}