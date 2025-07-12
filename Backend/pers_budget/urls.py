from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PersonnelBudgetViewSet

router = DefaultRouter()
router.register(r'pers-budget', PersonnelBudgetViewSet, basename='persbudget')

urlpatterns = [
    path('', include(router.urls)),
]