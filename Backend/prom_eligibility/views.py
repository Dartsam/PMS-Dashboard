from rest_framework import viewsets, permissions
from .models import Cadre, PromotionEligibility, PromotionExercise
from .serializers import (
    CadreSerializer,
    PromotionEligibilitySerializer,
    PromotionExerciseSerializer
)


class CadreViewSet(viewsets.ModelViewSet):
    queryset = Cadre.objects.all()
    serializer_class = CadreSerializer
    permission_classes = [permissions.AllowAny]


class PromotionEligibilityViewSet(viewsets.ModelViewSet):
    queryset = PromotionEligibility.objects.all()
    serializer_class = PromotionEligibilitySerializer
    permission_classes = [permissions.AllowAny]


class PromotionExerciseViewSet(viewsets.ModelViewSet):
    queryset = PromotionExercise.objects.all()
    serializer_class = PromotionExerciseSerializer
    permission_classes = [permissions.AllowAny]


# Create your views here.
