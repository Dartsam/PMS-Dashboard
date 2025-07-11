from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewset

router = DefaultRouter()
router.register(r'task', TaskViewset, basename='task')
urlpatterns = router.urls
