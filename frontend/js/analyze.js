const resumeForm = document.getElementById("resumeForm");
const resumeInput = document.getElementById("resume");
const jobDescription = document.getElementById("jobDescription");

const fileName = document.getElementById("fileName");
const fileError = document.getElementById("fileError");
const jobError = document.getElementById("jobError");
const generalError = document.getElementById("generalError");

const analyzeButton = document.getElementById("analyzeButton");
const loadingMessage = document.getElementById("loadingMessage");


resumeInput.addEventListener("change", function () {
    fileError.textContent = "";

    if (resumeInput.files.length === 0) {
        fileName.textContent = "";
        return;
    }

    const selectedFile = resumeInput.files[0];

    fileName.textContent = `Selected file: ${selectedFile.name}`;
});


resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    fileError.textContent = "";
    jobError.textContent = "";
    generalError.textContent = "";

    const selectedFile = resumeInput.files[0];
    const jobText = jobDescription.value.trim();

    let isValid = true;


    // Resume validation
    if (!selectedFile) {
        fileError.textContent = "Please upload your resume.";
        isValid = false;
    } else if (selectedFile.type !== "application/pdf") {
        fileError.textContent = "Only PDF files are allowed.";
        isValid = false;
    }


    // Job description validation
    if (!jobText) {
        jobError.textContent = "Please enter a job description.";
        isValid = false;
    } else if (jobText.length < 50) {
        jobError.textContent =
            "Job description should contain at least 50 characters.";
        isValid = false;
    }


    if (!isValid) {
        return;
    }


    // Disable button while analysis is running
    analyzeButton.disabled = true;
    analyzeButton.textContent = "Analyzing...";
    loadingMessage.hidden = false;


    /*
        TEMPORARY FRONTEND SIMULATION

        Later this data will come from Django API.
    */

    const simulatedResponse = {
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


    // Store analysis result temporarily
    sessionStorage.setItem(
        "analysisResult",
        JSON.stringify(simulatedResponse)
    );


    // Store resume information
    sessionStorage.setItem(
        "resumeName",
        selectedFile.name
    );


    // Redirect to dashboard
    setTimeout(function () {
        window.location.href = "dashboard.html";
    }, 1500);
});