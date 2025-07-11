from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

class TaskViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()