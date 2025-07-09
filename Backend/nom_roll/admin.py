from django.contrib import admin
from .models import Personal, Employee, Department
from django_admin_flexlist import FlexListAdmin
# Register your models here.

# Register the Personal model with the admin site
@admin.register(Personal)  
class PersonalAdmin(FlexListAdmin):
    list_display = ['user', 'first_name', 'last_name', 'email', 
                    'mobile_number', 'home_address', 'gender', 
                    'date_of_birth', 'updated_at'
                    ]  
# PersonalAdmin registered with the admin site

# Register the Employee model with the admin site
@admin.register(Employee)
class EmployeeAdmin(FlexListAdmin):
    list_display = ['file_number', 'designation', 'employment_type', 
                    'conhess', 'step', 'dofa', 'dolp', 'edor', 
                    'status', 'department', 'office_email', 
                    'mobile_number'
                    ]
# EmployeeAdmin registered with the admin site

# Register the Department model with the admin site
@admin.register(Department)
class DepartmentAdmin(FlexListAdmin):
    list_display = ['name', 'id']
# DepartmentAdmin registered with the admin site