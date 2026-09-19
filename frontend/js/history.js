console.log("HISTORY.JS LOADED");

const historyList =
    document.getElementById("historyList");

async function loadHistory() {

    try {

        const response =
            await fetch(
"https://ai-resume-analyzer-fk8m.onrender.com/api/history/"
            );

        const data =
            await response.json();

        console.log(
            "HISTORY RESPONSE:",
            data
        );

        if (!response.ok) {
            throw new Error(
                data.error ||
                "Could not load history."
            );
        }

        const analyses =
            data.analyses || [];

        historyList.innerHTML = "";

        if (analyses.length === 0) {

            historyList.innerHTML = `
                <p>
                    No analysis history available.
                </p>
            `;

            return;
        }

        analyses.forEach(function (analysis) {

            const historyCard =
                document.createElement("article");

            historyCard.classList.add(
                "history-card"
            );

            const date =
                new Date(
                    analysis.created_at
                );

            const resumeName =
                analysis.resume_name
                    .split("/")
                    .pop();

            historyCard.innerHTML = `
                <div class="history-info">

                    <h2>
                        ${analysis.job_title}
                    </h2>

                    <p>
                        Resume: ${resumeName}
                    </p>

                    <span>
                        ${date.toLocaleDateString()}
                    </span>

                </div>

                <div class="history-score">

                    <strong>
                        ${analysis.match_score}%
                    </strong>

                    <a
                        href="dashboard.html"
                        class="btn btn-small"
                    >
                        View Results
                    </a>

                </div>
            `;

            historyList.appendChild(
                historyCard
            );
        });

    } catch (error) {

        console.error(
            "HISTORY ERROR:",
            error
        );

        historyList.innerHTML = `
            <p>
                Unable to load analysis history.
            </p>
        `;
    }
}

loadHistory();