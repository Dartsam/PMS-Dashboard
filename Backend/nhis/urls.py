from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NhisViewset

router = DefaultRouter()
router.register(r'nhis', NhisViewset, basename='nhis')
urlpatterns = router.urls
