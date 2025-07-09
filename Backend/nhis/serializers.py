from rest_framework import serializers
from .models import Nhis

class NhisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nhis
        fields = '__all__' 