from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArchiveViewset

router = DefaultRouter()
router.register(r'archive', ArchiveViewset, basename='archive')
urlpatterns = router.urls
