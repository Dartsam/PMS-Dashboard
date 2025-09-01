from django.contrib import admin
from .models import (
    Account, SalaryStructure, StandardDeduction,
    Pension, Allowance
)
from django_admin_flexlist import FlexListAdmin

# Register your models here.

# Register the Personal model with the admin site
@admin.register(Account)
class AccountAdmin(FlexListAdmin):
    list_display = ['account_number', 'file_number', 'paypoint', 'salary_structure', 'pfa_no', 'ippis_no']
# AccountAdmin registered with the admin site

# Register the SalaryStructure model with the admin site
@admin.register(SalaryStructure)
class SalaryStructureAdmin(FlexListAdmin):
    list_display = ['salary_structure', 'level', 'step', 'annual_salary', 'monthly_salary']
# SalaryStructureAdmin registered with the admin site


# Register the StandardDeduction model with the admin site
@admin.register(StandardDeduction)
class StandardDeductionAdmin(FlexListAdmin):
    # list_display = ['ippis_account', 'tax_rate', 'nhis', 'nhf', 'pension_rate']
    list_display = ['nhis_amount', 'tax_amount', 'nhf_amount',
            'pension_amount', 'total_deductions', 'net_salary']
    readonly_fields = ['nhis_amount', 'tax_amount', 'nhf_amount',
            'pension_amount', 'total_deductions', 'net_salary']
# StandardDeductionAdmin registered with the admin site


# Register the Pension model with the admin site
@admin.register(Pension)
class PensionAdmin(FlexListAdmin):
    list_display = ['pfa_name', 'pfa_code']
# PensionAdmin registered with the admin site

# Register the Allowance model with the admin site
@admin.register(Allowance)
class AllowanceAdmin(FlexListAdmin):
    # list_display = ['employee', 'hazard_rate', 'teaching_rate', 'is_clinical', 
    #                 'specialist_rate','shift_rate', 'clinical_rate',
    #                 'call_duty_rate',]
    list_display = ('file_number', 'is_clinical',
        'hazard_allowance',
        'teaching_allowance',
        'shift_allowance',
        'clinical_allowance',
        'call_duty_allowance',
        'specialist_allowance',
        'net_allowance'
    )

    readonly_fields = (
        'hazard_allowance',
        'teaching_allowance',
        'shift_allowance',
        'clinical_allowance',
        'call_duty_allowance',
        'specialist_allowance',
        'net_allowance'
    )
# AllowanceAdmin registered with the admin site


