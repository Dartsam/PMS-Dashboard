# prom_eligibility/urls.py
from rest_framework.routers import DefaultRouter
from .views import CadreViewSet, PromotionEligibilityViewSet, PromotionExerciseViewSet

router = DefaultRouter()
router.register(r'cadres', CadreViewSet)
router.register(r'eligibility', PromotionEligibilityViewSet)
router.register(r'exercises', PromotionExerciseViewSet)

urlpatterns = router.urls
