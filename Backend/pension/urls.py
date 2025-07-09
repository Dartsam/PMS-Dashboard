from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PensionViewset

router = DefaultRouter()
router.register(r'pension', PensionViewset, basename='pension')
urlpatterns = router.urls

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]
