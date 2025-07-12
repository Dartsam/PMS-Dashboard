from django.shortcuts import render
from rest_framework import viewsets
from .models import EducationalQualification, ProfessionalQualification
from .serializers import EducationalQualificationSerializer, ProfessionalQualificationSerializer
# Create your views here.
# qualifications/views.py


class EducationalQualificationViewSet(viewsets.ModelViewSet):
    queryset = EducationalQualification.objects.all()
    serializer_class = EducationalQualificationSerializer

class ProfessionalQualificationViewSet(viewsets.ModelViewSet):
    queryset = ProfessionalQualification.objects.all()
    serializer_class = ProfessionalQualificationSerializer
