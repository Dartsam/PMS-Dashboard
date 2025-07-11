# nhf/admin.py

from django.contrib import admin
from .models import NHFDeduction
from django_admin_flexlist import FlexListAdmin  # Adjust if your import is different

@admin.register(NHFDeduction)
class NHFDeductionAdmin(FlexListAdmin):
    list_display = (
        'standard_deduction',
        'get_ippis_account',
        'month',
        'get_month_display',
        'year',
        'nhf_amount',
    )
    list_filter = ('month', 'year')
    search_fields = (
        'standard_deduction__ippis_account',
        'standard_deduction__staff__surname',
        'standard_deduction__staff__firstname',
    )
    ordering = ('-year', '-month')

    def get_ippis_account(self, obj):
        return obj.standard_deduction.ippis_account
    get_ippis_account.short_description = 'IPPIS Account'
    get_ippis_account.admin_order_field = 'standard_deduction__ippis_account'

    def get_month_display(self, obj):
        return obj.get_month_display()
    get_month_display.short_description = 'Month'

