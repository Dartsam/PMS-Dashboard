from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Performance
from .serializers import PerformanceSerializer

class PerformanceViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = PerformanceSerializer
    queryset = Performance.objects.all()