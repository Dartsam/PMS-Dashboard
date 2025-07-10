# prom_eligibility/services.py

from datetime import datetime
from .models import PromotionEligibility
from nom_roll.models import Employee

def is_employee_eligible(employee: Employee, year: int) -> bool:
    """Returns True if employee is eligible for promotion in the given year"""
    level = employee.grade_level
    dofa = employee.dofa
    dolp = employee.dolp

    # Define required years per level band
    if level <= 5:
        required_years = 2
    elif 6 <= level <= 13:
        required_years = 3
    else:  # above 13
        required_years = 4

    # Determine reference date
    ref_date = dolp if dolp else dofa
    if not ref_date:
        return False  # Can't determine eligibility if no dates

    # Compare difference in years
    diff = year - ref_date.year
    return diff >= required_years


def evaluate_all_employees(year=None):
    """
    Check and update promotion eligibility for all employees.
    Can be run yearly via management command or Celery.
    """
    from django.utils import timezone
    year = year or timezone.now().year

    for employee in Employee.objects.all():
        eligible = is_employee_eligible(employee, year)

        # Update or create record
        PromotionEligibility.objects.update_or_create(
            file_number = employee,
            year = year,
            defaults = {'is_eligible': eligible}
        )
