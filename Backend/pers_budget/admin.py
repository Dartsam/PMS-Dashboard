from django.contrib import admin
from .models import PersonnelBudget
from django_admin_flexlist import FlexListAdmin

# Register your models here.
@admin.register(PersonnelBudget)
class PersonnelBudgetAdmin(FlexListAdmin):
    list_display = ('file_number', 'year', 'new_designation', 'new_level', 'new_step', 'projected_annual_salary')
    list_filter = ('year',)
    search_fields = ('file_number__file_number', 'file_number__designation')