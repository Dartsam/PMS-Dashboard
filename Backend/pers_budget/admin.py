from django.contrib import admin
from .models import PersonnelBudget
from django_admin_flexlist import FlexListAdmin

# Register your models here.
@admin.register(PersonnelBudget)
class PersonnelBudgetAdmin(FlexListAdmin):
    list_display = ('employee', 'year', 'new_designation', 'new_level', 'new_step', 'projected_annual_salary')
    list_filter = ('year',)
    search_fields = ('employee__file_number', 'employee__designation')