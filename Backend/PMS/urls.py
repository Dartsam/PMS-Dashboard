from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),

    path('', include("django_admin_flexlist.urls")),
    path('nom_roll/', include('nom_roll.urls')),
    path('fa/', include('fa.urls')),
    path('pension/', include('pension.urls')),
    path('leave/', include('leave.urls')),
    path('promotion/', include('promotion.urls')),
    path('nhis/', include('nhis.urls')),
    path('prom_eligibility/', include('prom_eligibility.urls')),
    path('q_and_disc/', include('q_and_disc.urls')),
    path('tasks/', include('tasks.urls')),
    path('nhf/', include('nhf.urls')),
    path('qualifications/', include('qualifications.urls')),
    path('pers_budget/', include('pers_budget.urls')),
    # path('analytics/', include('analytics.urls')),
    path('archives/', include('archives.urls')),
]

if settings.DEBUG:  # only serve media in development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)