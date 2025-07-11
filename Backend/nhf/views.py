from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import NHFDeduction
from .serializers import NHFDeductionSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
# nhf/views.py


class NHFDeductionViewSet(viewsets.ModelViewSet):
    queryset = NHFDeduction.objects.all()
    serializer_class = NHFDeductionSerializer
    permission_classes = [permissions.IsAuthenticated]

