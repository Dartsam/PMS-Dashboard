
from rest_framework.routers import DefaultRouter
from .views import PersonalViewset, EmployeeViewset, DepartmentViewset

router = DefaultRouter()
router.register(r'personal', PersonalViewset)
router.register(r'employees', EmployeeViewset)
router.register(r'departments', DepartmentViewset)

urlpatterns = router.urls
