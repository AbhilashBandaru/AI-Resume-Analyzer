const matchScore =
    document.getElementById("matchScore");

const matchedSkills =
    document.getElementById("matchedSkills");

const missingSkills =
    document.getElementById("missingSkills");

const recommendations =
    document.getElementById("recommendations");


const storedResult =
    sessionStorage.getItem("analysisResult");


if (!storedResult) {

    matchScore.textContent = "0";

    matchedSkills.innerHTML =
        "<p>No analysis result available.</p>";

    missingSkills.innerHTML =
        "<p>No analysis result available.</p>";

    recommendations.innerHTML =
        "<p>Please analyze a resume first.</p>";

} else {

    const analysisData =
        JSON.parse(storedResult);


    // -----------------------------
    // Match Score
    // -----------------------------

    matchScore.textContent =
        analysisData.match_score ?? 0;


    // -----------------------------
    // Matched Skills
    // -----------------------------

    matchedSkills.innerHTML = "";

    const matchedSkillsList =
        analysisData.matched_skills || [];

    if (matchedSkillsList.length === 0) {

        matchedSkills.innerHTML =
            "<p>No matched skills found.</p>";

    } else {

        matchedSkillsList.forEach(function (skill) {

            const skillElement =
                document.createElement("span");

            skillElement.classList.add(
                "skill",
                "matched"
            );

            skillElement.textContent =
                skill;

            matchedSkills.appendChild(
                skillElement
            );
        });
    }


    // -----------------------------
    // Missing Skills
    // -----------------------------

    missingSkills.innerHTML = "";

    const missingSkillsList =
        analysisData.missing_skills || [];

    if (missingSkillsList.length === 0) {

        missingSkills.innerHTML =
            "<p>No missing skills found.</p>";

    } else {

        missingSkillsList.forEach(function (skill) {

            const skillElement =
                document.createElement("span");

            skillElement.classList.add(
                "skill",
                "missing"
            );

            skillElement.textContent =
                skill;

            missingSkills.appendChild(
                skillElement
            );
        });
    }


    // -----------------------------
    // Recommendations
    // -----------------------------

    recommendations.innerHTML = "";

    const recommendationsList =
        analysisData.recommendations || [];


    if (recommendationsList.length === 0) {

        recommendations.innerHTML =
            "<p>Recommendations will be available soon.</p>";

    } else {

        recommendationsList.forEach(
            function (recommendation, index) {

                const recommendationElement =
                    document.createElement("div");

                recommendationElement.classList.add(
                    "recommendation"
                );


                const numberElement =
                    document.createElement("span");

                numberElement.classList.add(
                    "recommendation-number"
                );

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
            }
        );
    }
}