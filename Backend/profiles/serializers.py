from rest_framework import serializers
from .models import  (
    Profile, CareerDescending, LeaveDescending,
    QualificationsDescending, ProfessionalCertificate
)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class CareerDescendingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerDescending
        fields = '__all__'


class LeaveDescendingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveDescending
        fields = '__all__'


class QualificationsDescendingSerializer(serializers.ModelSerializer):
    class Meta:
        model = QualificationsDescending
        fields = '__all__'


class ProfessionalCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessionalCertificate
        fields = '__all__'