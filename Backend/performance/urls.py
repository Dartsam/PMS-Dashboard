from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PerformanceViewset

router = DefaultRouter()
router.register(r'performance', PerformanceViewset, basename='performance')
urlpatterns = router.urls
