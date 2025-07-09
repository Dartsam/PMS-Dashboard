from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Promotion
from .serializers import PromotionSerializer

class PromotionViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = PromotionSerializer
    queryset = Promotion.objects.all()
