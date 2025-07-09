from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeaveViewset

router = DefaultRouter()
router.register(r'leave', LeaveViewset, basename='leave')
urlpatterns = router.urls
