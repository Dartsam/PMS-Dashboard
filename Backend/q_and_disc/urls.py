from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QAndDiscViewset

router = DefaultRouter()
router.register(r'q_and_disc', QAndDiscViewset, basename='q_and_disc')
urlpatterns = router.urls
