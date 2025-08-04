from django.contrib import admin
from .models import Personal, Employee, Department, TopManagement
from django_admin_flexlist import FlexListAdmin
# Register your models here.

# Register the Personal model with the admin site
@admin.register(Personal)  
class PersonalAdmin(FlexListAdmin):
    list_display = ['user', 'first_name', 'last_name', 'email', 
                    'mobile_number', 'home_address', 'gender', 
                    'date_of_birth',
                    ]  
    readonly_fields = ['updated_at']
# PersonalAdmin registered with the admin site

# Register the Employee model with the admin site
@admin.register(Employee)
class EmployeeAdmin(FlexListAdmin):
    list_display = ['file_number', 'designation', 'employment_type', 
                    'salary_structure', 'grade_level', 'step', 'dofa', 'dolp', 
                    'edor', 'status', 'department', 'office_email', 
                    'mobile_number'
                    ]
    search_fields = ['file_number__first_name', 'designation', 'office_email']
    list_filter = ['status', 'salary_structure', 'department']
# EmployeeAdmin registered with the admin site

# Register the Department model with the admin site
@admin.register(Department)
class DepartmentAdmin(FlexListAdmin):
    list_display = ['name', 'id']
# DepartmentAdmin registered with the admin site

@admin.register(TopManagement)
class TopManagementAdmin(FlexListAdmin):
    list_display = ['name', 'position', 'qualifications', 'email', 'mobile_number']