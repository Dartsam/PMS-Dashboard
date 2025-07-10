from rest_framework import serializers
from .models import Cadre, PromotionEligibility, PromotionExercise
from nom_roll.models import Employee  # assuming Employee model is in nom_roll app
from nom_roll.serializers import EmployeeSerializer  # optional for nested display


class CadreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cadre
        fields = '__all__'


class PromotionEligibilitySerializer(serializers.ModelSerializer):
    file_number = serializers.SlugRelatedField(
        slug_field='file_number',
        queryset=Employee.objects.all()
    )
    class Meta:
        model = PromotionEligibility
        fields = '__all__'


class PromotionExerciseSerializer(serializers.ModelSerializer):
    file_number = serializers.StringRelatedField()
    
    class Meta:
        model = PromotionExercise
        fields = '__all__'
