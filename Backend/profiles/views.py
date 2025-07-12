from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import *

class ProfileViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class CareerDescendingViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = CareerDescendingSerializer
    queryset = CareerDescending.objects.all()

class LeaveDescendingViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LeaveDescendingSerializer
    queryset = LeaveDescending.objects.all()

class QualificationsDescendingViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = QualificationsDescendingSerializer
    queryset = QualificationsDescending.objects.all()

class ProfessionalCertificateViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProfessionalCertificateSerializer
    queryset = ProfessionalCertificate.objects.all()