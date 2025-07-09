from rest_framework import serializers
from .models import Pension

class PensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pension
        fields = ('pfa', 'pfa_no')