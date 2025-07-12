from django.contrib import admin
from django_admin_flexlist import FlexListAdmin
from .models import EducationalQualification, ProfessionalQualification

# Register your models here.
# qualifications/admin.py


@admin.register(EducationalQualification)
class EducationalQualificationAdmin(FlexListAdmin):
    list_display = ['institution_attended', 'certificate_obtained', 'certificate_id', 'strt_date', 'end_date']
    search_fields = ['institution_attended', 'certificate_obtained', 'certificate_id']

@admin.register(ProfessionalQualification)
class ProfessionalQualificationAdmin(FlexListAdmin):
    list_display = ['issuing_body', 'certificate_name', 'certificate_id', 'licence_number', 'issue_date', 'expiry_date']
    search_fields = ['issuing_body', 'certificate_name', 'certificate_id', 'licence_number']
