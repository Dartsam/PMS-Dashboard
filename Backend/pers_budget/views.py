from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import PersonnelBudget
from .serializers import PersonnelBudgetSerializer
# Create your views here.


class PersonnelBudgetViewSet(viewsets.ModelViewSet):
    """List, create, retrieve Personnel Budget forecasts."""
    queryset = PersonnelBudget.objects.all()
    serializer_class = PersonnelBudgetSerializer

    def create(self, request, *args, **kwargs):
        # Expect `employee` (file_number) and `year` in payload
        return super().create(request, *args, **kwargs)