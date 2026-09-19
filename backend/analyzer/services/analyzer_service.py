from .skill_service import extract_skills, match_skills
from .recommendation_service import generate_recommendations


def analyze_resume(resume_text, job_description):
    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)

    result = match_skills(
        resume_skills,
        job_skills
    )

    recommendations = generate_recommendations(
        result["missing_skills"]
    )

    return {
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "matched_skills": result["matched_skills"],
        "missing_skills": result["missing_skills"],
        "match_score": result["match_score"],
        "recommendations": recommendations,
    }