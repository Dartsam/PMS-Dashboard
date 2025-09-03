from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (PersonalViewset, EmployeeViewset, DepartmentViewset, 
                    TopManagementViewset, NominalRollViewset, StaffCreateView)

router = DefaultRouter()
router.register(r'personal', PersonalViewset)
router.register(r'employees', EmployeeViewset)
router.register(r'departments', DepartmentViewset)
router.register(r'top_management', TopManagementViewset)
router.register(r'nominal', NominalRollViewset, basename='nominal_roll')

urlpatterns = [
    path('', include(router.urls)),
    path('create/', StaffCreateView.as_view(), name='staff-create'),
]

