from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Archive
from .serializers import ArchiveSerializer

class ArchiveViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ArchiveSerializer
    queryset = Archive.objects.all()
