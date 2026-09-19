RECOMMENDATION_MAP = {
    "python": "Strengthen Python programming and problem-solving skills.",
    "django": "Build more Django projects focusing on REST APIs and backend development.",
    "fastapi": "Learn FastAPI and build production-style REST APIs.",
    "postgresql": "Practice PostgreSQL queries, database design, and optimization.",
    "sql": "Strengthen SQL joins, subqueries, aggregations, and database design.",
    "react": "Learn React fundamentals and build interactive frontend applications.",
    "docker": "Learn Docker and practice containerizing backend applications.",
    "aws": "Learn AWS fundamentals and practice deploying applications to the cloud.",
    "azure": "Learn Azure fundamentals and practice deploying applications to the cloud.",
    "git": "Strengthen Git workflows including branching, merging, and pull requests.",
    "machine learning": "Strengthen machine learning fundamentals and build practical ML projects.",
    "deep learning": "Practice deep learning with PyTorch and build neural-network projects.",
    "nlp": "Learn NLP techniques and build projects involving text processing.",
    "llm": "Learn LLM fundamentals and build applications using modern language models.",
    "generative ai": "Explore Generative AI and build applications using foundation models.",
    "rag": "Learn Retrieval-Augmented Generation and build a document question-answering system.",
    "docker": "Learn Docker and practice containerizing applications.",
}


def generate_recommendations(missing_skills):
    recommendations = []

    for skill in missing_skills:
        recommendation = RECOMMENDATION_MAP.get(skill)

        if recommendation:
            recommendations.append(recommendation)

    if not recommendations:
        recommendations.append(
            "Your resume matches the identified job skills. Keep strengthening your existing skills through practical projects."
        )

    return recommendations