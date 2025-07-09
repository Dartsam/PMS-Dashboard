from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Leave
from .serializers import LeaveSerializer

class LeaveViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LeaveSerializer
    queryset = Leave.objects.all()
