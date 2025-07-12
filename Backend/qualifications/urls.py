# qualifications/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EducationalQualificationViewSet, ProfessionalQualificationViewSet

router = DefaultRouter()
router.register(r'educational', EducationalQualificationViewSet, basename='educationalqualification')
router.register(r'professional', ProfessionalQualificationViewSet, basename='professionalqualification')

urlpatterns = [
    path('', include(router.urls)),
]
