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