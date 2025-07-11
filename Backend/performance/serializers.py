from rest_framework import serializers
from .models import Performance

class PerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Performance
        fields = ('task_name','task_id','weight','target','outcome','rating','ippis_no')