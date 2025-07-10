from django.contrib import admin
from .models import Cadre, PromotionEligibility, PromotionExercise
from django_admin_flexlist import FlexListAdmin

# Register your models here.


@admin.register(Cadre)
class CadreAdmin(admin.ModelAdmin):
    list_display = ['cadre_name', 'level', 'designation']
    search_fields = ['designation', 'cadre_name']
    list_filter = ['level']


@admin.register(PromotionEligibility)
class PromotionEligibilityAdmin(FlexListAdmin):
    list_display = ['file_number', 'year', 'is_eligible', 'checked_on']
    list_filter = ['year', 'is_eligible']
    search_fields = ['file_number__file_number']


@admin.register(PromotionExercise)
class PromotionExerciseAdmin(FlexListAdmin):
    list_display = [
        'file_number', 'aper_score', 'civil_service_score',
        'area_of_specialization_score', 'general_paper_score',
        'total_score', 'isPromoted'
    ]
    list_filter = ['isPromoted']
    search_fields = ['file_number__file_number']
