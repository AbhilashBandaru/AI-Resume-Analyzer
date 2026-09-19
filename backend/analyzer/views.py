from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

from .models import Resume
from .services.pdf_service import extract_text_from_pdf


@csrf_exempt
def upload_resume(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST requests are allowed."},
            status=405
        )

    resume_file = request.FILES.get("resume")

    if not resume_file:
        return JsonResponse(
            {"error": "Resume file is required."},
            status=400
        )

    print("RECEIVED FILE:", resume_file.name)
    print("CONTENT TYPE:", resume_file.content_type)

    if not resume_file.name.lower().endswith(".pdf"):
        return JsonResponse(
            {"error": "Only PDF files are allowed."},
            status=400
        )

    try:
        extracted_text = extract_text_from_pdf(resume_file)
    except Exception:
        return JsonResponse(
            {"error": "Could not read the PDF file."},
            status=400
        )

    user = User.objects.first()

    if not user:
        user = User.objects.create_user(
            username="demo_user"
        )

    resume = Resume.objects.create(
        user=user,
        file=resume_file,
        extracted_text=extracted_text
    )

    return JsonResponse({
        "message": "Resume uploaded successfully",
        "resume_id": resume.id
    })
from .models import JobDescription, Analysis
from .services.analyzer_service import analyze_resume


@csrf_exempt
def analyze_resume_api(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST requests are allowed."},
            status=405
        )

    resume_id = request.POST.get("resume_id")
    job_title = request.POST.get("job_title")
    job_description = request.POST.get("job_description")

    if not resume_id:
        return JsonResponse(
            {"error": "resume_id is required."},
            status=400
        )

    if not job_title:
        return JsonResponse(
            {"error": "job_title is required."},
            status=400
        )

    if not job_description:
        return JsonResponse(
            {"error": "job_description is required."},
            status=400
        )

    try:
        resume = Resume.objects.get(id=resume_id)
    except Resume.DoesNotExist:
        return JsonResponse(
            {"error": "Resume not found."},
            status=404
        )

    result = analyze_resume(
        resume.extracted_text,
        job_description
    )

    user = resume.user

    job = JobDescription.objects.create(
        user=user,
        title=job_title,
        description=job_description
    )

    analysis = Analysis.objects.create(
        user=user,
        resume=resume,
        job_description=job,
        match_score=result["match_score"],
        matched_skills=result["matched_skills"],
        missing_skills=result["missing_skills"],
        recommendations=result["recommendations"]
    )

    return JsonResponse({
    "analysis_id": analysis.id,
    "match_score": analysis.match_score,
    "matched_skills": analysis.matched_skills,
    "missing_skills": analysis.missing_skills,
    "recommendations": analysis.recommendations
})