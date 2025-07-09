from rest_framework.routers import DefaultRouter
from .views import (
    AccountViewSet, SalaryStructureViewSet,
    StandardDeductionViewSet, PensionViewSet,
    AllowanceViewSet
)

router = DefaultRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'salary-structures', SalaryStructureViewSet)
router.register(r'standard-deductions', StandardDeductionViewSet)
router.register(r'pensions', PensionViewSet)
router.register(r'allowances', AllowanceViewSet)

urlpatterns = router.urls
