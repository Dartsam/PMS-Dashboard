from rest_framework import serializers
from .models import QAndDisc

class QAndDiscSerializer(serializers.ModelSerializer):
    class Meta:
        model = QAndDisc
        fields = ('date', 'reason', 'response', 'decision', 'file_number')