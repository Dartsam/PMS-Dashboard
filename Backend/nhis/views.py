from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Nhis
from .serializers import NhisSerializer

class NhisViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = NhisSerializer
    queryset = Nhis.objects.all()
