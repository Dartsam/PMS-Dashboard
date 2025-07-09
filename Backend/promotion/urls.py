from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PromotionViewset

router = DefaultRouter()
router.register(r'promotion', PromotionViewset, basename='promotion')
urlpatterns = router.urls
