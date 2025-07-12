from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'profiles', ProfileViewset, basename='profiles')
router.register(r'career-descending', CareerDescendingViewset)
router.register(r'leave-descending', LeaveDescendingViewset)
router.register(r'qualifications-descending', QualificationsDescendingViewset)
router.register(r'professional-certificates', ProfessionalCertificateViewset)
urlpatterns = router.urls
