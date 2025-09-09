from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (PersonalViewset, EmployeeViewset, DepartmentViewset, 
                    TopManagementViewset, NominalRollViewset, StaffCreateView, EmployeeByDigitsDetail,
                    EmployeeProfileAPIView, ProfileDetailView)


app_name = "nom_roll"

router = DefaultRouter()
router.register(r'personal', PersonalViewset)
router.register(r'employees', EmployeeViewset)
router.register(r'departments', DepartmentViewset)
router.register(r'top_management', TopManagementViewset)
router.register(r'nominal', NominalRollViewset, basename='nominal_roll')

urlpatterns = [
    path('', include(router.urls)),
    path('create/', StaffCreateView.as_view(), name='staff-create'),
    path("profile/", ProfileDetailView.as_view(), name="profile-detail"),
    path('<str:digits>/', EmployeeByDigitsDetail.as_view(), name='employee-by-digits'),
    path("api/<str:digits>/", EmployeeProfileAPIView.as_view(), name="employee-profile-api"),

    # Browser-friendly page (the path you asked: /7101 will serve the template)
    # NB: add the app's urls at the project root to have /7101 work
    # path("<str:digits>/", EmployeeProfileTemplateView.as_view(), name="employee-profile-page"),
]

