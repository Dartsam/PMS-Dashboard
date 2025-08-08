from rest_framework.routers import DefaultRouter
from .views import (PersonalViewset, EmployeeViewset, DepartmentViewset, 
                    TopManagementViewset, NominalRollViewset)

router = DefaultRouter()
router.register(r'personal', PersonalViewset)
router.register(r'employees', EmployeeViewset)
router.register(r'departments', DepartmentViewset)
router.register(r'top_management', TopManagementViewset)
router.register(r'nominal', NominalRollViewset, basename='nominal_roll')

urlpatterns = router.urls
