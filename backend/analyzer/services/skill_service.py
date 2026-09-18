KNOWN_SKILLS = {
    "python",
    "java",
    "c++",
    "javascript",
    "typescript",
    "html",
    "css",
    "react",
    "angular",
    "node.js",
    "express",
    "django",
    "flask",
    "fastapi",
    "rest api",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "git",
    "github",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "nlp",
    "llm",
    "generative ai",
    "rag",
}


import re


def extract_skills(text):
    text = text.lower()

    found_skills = []

    for skill in KNOWN_SKILLS:
        pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"

        if re.search(pattern, text):
            found_skills.append(skill)

    return sorted(found_skills)
def match_skills(resume_skills, job_skills):
    resume_set = set(resume_skills)
    job_set = set(job_skills)

    matched_skills = sorted(resume_set & job_set)
    missing_skills = sorted(job_set - resume_set)

    if len(job_set) == 0:
        score = 0
    else:
        score = (len(matched_skills) / len(job_set)) * 100

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_score": round(score, 2)
    }