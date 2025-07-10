from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import QAndDisc
from .serializers import QAndDiscSerializer

class QAndDiscViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = QAndDiscSerializer
    queryset = QAndDisc.objects.all()