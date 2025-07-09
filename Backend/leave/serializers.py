from rest_framework import serializers
from .models import Leave

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = ('leave_type', 'leave_starts', 'leave_ends', 'file_number')