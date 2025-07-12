# qualifications/serializers.py

from rest_framework import serializers
from .models import EducationalQualification, ProfessionalQualification

class EducationalQualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalQualification
        fields = '__all__'

class ProfessionalQualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessionalQualification
        fields = '__all__'
