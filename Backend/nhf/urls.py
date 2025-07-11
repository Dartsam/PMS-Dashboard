# nhf/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NHFDeductionViewSet

router = DefaultRouter()
router.register(r'nhf', NHFDeductionViewSet, basename='nhf')

urlpatterns = [
    path('', include(router.urls)),
]
