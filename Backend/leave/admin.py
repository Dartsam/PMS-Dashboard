from django.contrib import admin
from .models import Leave
from django_admin_flexlist import FlexListAdmin

@admin.register(Leave)
class AccountAdmin(FlexListAdmin):
    list_display = ['file_number', 'leave_type', 'leave_starts', 'leave_ends']


