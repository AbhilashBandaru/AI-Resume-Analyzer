// =========================================
// GET HTML ELEMENTS
// =========================================

const resumeForm = document.getElementById("resumeForm");

const resumeInput = document.getElementById("resume");
const jobDescription = document.getElementById("jobDescription");

const fileName = document.getElementById("fileName");

const fileError = document.getElementById("fileError");
const jobError = document.getElementById("jobError");
const generalError = document.getElementById("generalError");

const analyzeButton = document.getElementById("analyzeButton");
const loadingMessage = document.getElementById("loadingMessage");


// =========================================
// FILE SELECTION
// =========================================

resumeInput.addEventListener("change", function () {

    fileError.textContent = "";

    if (resumeInput.files.length === 0) {
        fileName.textContent = "";
        return;
    }

    const selectedFile = resumeInput.files[0];

    fileName.textContent = `Selected file: ${selectedFile.name}`;

});


// =========================================
// FORM SUBMISSION
// =========================================

resumeForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Clear previous errors
    fileError.textContent = "";
    jobError.textContent = "";
    generalError.textContent = "";

    // Get selected file
    const selectedFile = resumeInput.files[0];

    // Get job description
    const jobText = jobDescription.value.trim();


    // =====================================
    // VALIDATION
    // =====================================

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


    // Stop if validation failed

    if (!isValid) {
        return;
    }


    // =====================================
    // SHOW LOADING STATE
    // =====================================

    analyzeButton.disabled = true;

    analyzeButton.textContent = "Analyzing...";

    loadingMessage.hidden = false;


    // =====================================
    // TEMPORARY SIMULATION
    // =====================================

    setTimeout(function () {

        loadingMessage.hidden = true;

        analyzeButton.disabled = false;

        analyzeButton.textContent = "Analyze Resume";

        generalError.textContent =
            "Frontend validation successful. Backend API will be connected next.";

    }, 2000);

});