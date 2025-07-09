from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Pension
from .serializers import PensionSerializer

class PensionViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = PensionSerializer
    queryset = Pension.objects.all()