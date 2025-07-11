# nhf/serializers.py

from rest_framework import serializers
from .models import NHFDeduction

class NHFDeductionSerializer(serializers.ModelSerializer):
   # standard_deduction_display = serializers.StringRelatedField(source='standard_deduction', read_only=True)
    month_display = serializers.CharField(source='get_month_display', read_only=True)

    class Meta:
        model = NHFDeduction
        fields = '__all__'
