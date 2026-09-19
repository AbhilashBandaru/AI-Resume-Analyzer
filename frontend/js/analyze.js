console.log("ANALYZE.JS LOADED");


// ========================================
// GET ELEMENTS
// ========================================

const resumeInput =
    document.getElementById("resume");

const jobDescription =
    document.getElementById("jobDescription");

const fileName =
    document.getElementById("fileName");

const fileError =
    document.getElementById("fileError");

const jobError =
    document.getElementById("jobError");

const generalError =
    document.getElementById("generalError");

const analyzeButton =
    document.getElementById("analyzeButton");

const loadingMessage =
    document.getElementById("loadingMessage");


// ========================================
// CHECK ELEMENTS
// ========================================

console.log("RESUME INPUT:", resumeInput);
console.log("JOB DESCRIPTION:", jobDescription);
console.log("ANALYZE BUTTON:", analyzeButton);


// ========================================
// FILE SELECTION
// ========================================

resumeInput.addEventListener("change", function () {

    console.log("FILE SELECTED");

    fileError.textContent = "";

    if (resumeInput.files.length === 0) {

        fileName.textContent = "";

        return;
    }

    const selectedFile =
        resumeInput.files[0];

    console.log(
        "FILE NAME:",
        selectedFile.name
    );

    console.log(
        "FILE TYPE:",
        selectedFile.type
    );

    fileName.textContent =
        `Selected file: ${selectedFile.name}`;
});


// ========================================
// ANALYZE BUTTON CLICK
// ========================================

analyzeButton.addEventListener(
    "click",
    async function () {

        console.log("ANALYZE BUTTON CLICKED");


        // ========================================
        // CLEAR OLD ERRORS
        // ========================================

        fileError.textContent = "";

        jobError.textContent = "";

        generalError.textContent = "";


        // ========================================
        // GET INPUTS
        // ========================================

        const selectedFile =
            resumeInput.files[0];

        const jobText =
            jobDescription.value.trim();


        console.log(
            "SELECTED FILE:",
            selectedFile
        );

        console.log(
            "JOB TEXT LENGTH:",
            jobText.length
        );


        // ========================================
        // VALIDATION
        // ========================================

        let isValid = true;


        // Resume validation

        if (!selectedFile) {

            fileError.textContent =
                "Please upload your resume.";

            isValid = false;

        } else if (
            !selectedFile.name
                .toLowerCase()
                .endsWith(".pdf")
        ) {

            fileError.textContent =
                "Only PDF files are allowed.";

            isValid = false;
        }


        // Job description validation

        if (!jobText) {

            jobError.textContent =
                "Please enter a job description.";

            isValid = false;

        } else if (jobText.length < 50) {

            jobError.textContent =
                "Job description should contain at least 50 characters.";

            isValid = false;
        }


        if (!isValid) {

            console.log(
                "VALIDATION FAILED"
            );

            return;
        }


        console.log(
            "VALIDATION PASSED"
        );


        // ========================================
        // LOADING
        // ========================================

        analyzeButton.disabled = true;

        analyzeButton.textContent =
            "Analyzing...";

        loadingMessage.hidden = false;


        try {

            // ========================================
            // STEP 1
            // UPLOAD RESUME
            // ========================================

            console.log(
                "UPLOADING RESUME..."
            );


            const formData =
                new FormData();


            formData.append(
                "resume",
                selectedFile
            );


            const uploadResponse =
                await fetch(
                    "http://127.0.0.1:8000/api/resumes/upload/",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            console.log(
                "UPLOAD STATUS:",
                uploadResponse.status
            );


            const uploadData =
                await uploadResponse.json();


            console.log(
                "UPLOAD RESPONSE:",
                uploadData
            );


            if (!uploadResponse.ok) {

                throw new Error(
                    uploadData.error ||
                    "Resume upload failed."
                );
            }


            const resumeId =
                uploadData.resume_id;


            console.log(
                "RESUME ID:",
                resumeId
            );


            // ========================================
            // STEP 2
            // ANALYZE
            // ========================================

            console.log(
                "STARTING ANALYSIS..."
            );


            const analysisData =
                new FormData();


            analysisData.append(
                "resume_id",
                resumeId
            );


            analysisData.append(
                "job_title",
                "Python Developer"
            );


            analysisData.append(
                "job_description",
                jobText
            );


            const analysisResponse =
                await fetch(
                         "https://ai-resume-analyzer-fk8m.onrender.com/api/analyze/",
                        {
                        method: "POST",
                        body: analysisData
                    }
                );


            console.log(
                "ANALYSIS STATUS:",
                analysisResponse.status
            );


            const result =
                await analysisResponse.json();


            console.log(
                "ANALYSIS RESPONSE:",
                result
            );


            if (!analysisResponse.ok) {

                throw new Error(
                    result.error ||
                    "Analysis failed."
                );
            }


            // ========================================
            // STEP 3
            // SAVE RESULT
            // ========================================

            sessionStorage.setItem(
                "analysisResult",
                JSON.stringify(result)
            );


            sessionStorage.setItem(
                "resumeName",
                selectedFile.name
            );


            console.log(
                "ANALYSIS SUCCESSFUL"
            );


            // ========================================
            // STEP 4
            // DASHBOARD
            // ========================================

            console.log(
                "GOING TO DASHBOARD..."
            );


            window.location.href =
                "dashboard.html";

        }


        catch (error) {

            console.error(
                "ANALYSIS ERROR:",
                error
            );


            loadingMessage.hidden = true;


            analyzeButton.disabled = false;


            analyzeButton.textContent =
                "Analyze Resume";


            generalError.textContent =
                error.message ||
                "Something went wrong.";
        }

    }
);