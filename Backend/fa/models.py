from django.db import models
from nom_roll.models import User, Employee
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal
# Create your models here.


# Account model begins here
class Account(models.Model):
    account_number = models.CharField(max_length=20, unique=True)
    file_number = models.CharField(max_length=17, unique=True)
    paypoint = models.CharField(max_length=25)
    salary_structure = models.CharField(max_length=10)
    pfa_no = models.CharField(max_length=20)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, null=True, on_delete=models.CASCADE)
    ippis_no = models.CharField(max_length=7, unique=True)

    def __str__(self):
        return f"{self.file_number} - {self.account_number}"  
# Account model ends here


# Salary structure model begins here
class SalaryStructure(models.Model):
    STRUCTURE_CHOICES = [
        ('CONHESS', 'CONHESS'),
        ('CONMESS', 'CONMESS'),
        ('CONTOPSAL', 'CONTOPSAL'),
    ]

    salary_structure = models.CharField(max_length=10, choices=STRUCTURE_CHOICES)
    level = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(15)])
    step = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(15)])
    annual_salary = models.DecimalField(max_digits=12, decimal_places=2)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('salary_structure', 'level', 'step')
        ordering = ['salary_structure', 'level', 'step']

    def __str__(self):
        return f"{self.salary_structure} - Level {self.level}, Step {self.step}: ₦{self.annual_salary:,.2f}"

    @property
    def monthly_salary(self):
        return round(self.annual_salary / 12, 2)

    def clean(self):
        if self.salary_structure in ['CONMESS', 'CONTOPSAL'] and self.step > 9:
            raise ValidationError(f"{self.salary_structure} only allows step 1–9.")
        if self.salary_structure == 'CONHESS' and self.step > 15:
            raise ValidationError("CONHESS only allows step 1–15.")
# Salary structure model ends here


# StandardDeduction model begins here
class StandardDeduction(models.Model):
    ippis_account = models.OneToOneField(Account, on_delete=models.CASCADE)
    nhis = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    tax_rate = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    nhf = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    pension_rate = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    user = models.OneToOneField(User, null=True, related_name="pension_records", on_delete=models.CASCADE)

    @property
    def salary(self):
        try:
            emp = self.ippis_account.file_number
            return SalaryStructure.objects.get(
                salary_structure=emp.salary_structure,
                level=emp.grade_level,
                step=emp.step
            ).annual_salary
        except SalaryStructure.DoesNotExist:
            return Decimal(0)

    @property
    def nhis_amount(self):
        return round(self.salary * self.nhis / 100, 2)

    @property
    def tax_amount(self):
        return round(self.salary * self.tax_rate / 100, 2)

    @property
    def nhf_amount(self):
        return round(self.salary * self.nhf / 100, 2)

    @property
    def pension_amount(self):
        return round(self.salary * self.pension_rate / 100, 2)

    @property
    def total_deductions(self):
        return sum([
            self.nhis_amount,
            self.tax_amount,
            self.nhf_amount,
            self.pension_amount
        ])
    
    @property
    def net_allowance(self):
        try:
            emp = self.ippis_account.file_number  # Employee instance
            allowance = Allowance.objects.get(employee=emp)
            return allowance.net_allowance  # no parentheses now
        except Allowance.DoesNotExist:
            return Decimal(0)

    @property
    def net_salary(self):
        return round(self.salary + self.net_allowance - self.total_deductions, 2)

    def __str__(self):
        return (
            f"IPPS No: {self.ippis_account}, Pension: {self.pension_rate}% | "
            f"Tax: {self.tax_rate}% | NHIS: {self.nhis}% | NHF: {self.nhf}% | "
            f"Net Salary: ₦{self.net_salary:,.2f} "
        )

# StandardDeduction model ends here


# Pension model begins here
class Pension(models.Model):
    pfa_name = models.CharField(max_length=30, unique=True)
    pfa_code = models.CharField(max_length=20, unique=True)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.pfa_name} ({self.pfa_code})"

# Pension model ends here


# Allowance model begins here
class Allowance(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, null=True, on_delete=models.CASCADE)

    # Allowance Rates (% of Annual Salary)
    hazard_rate = models.DecimalField(max_digits=5, decimal_places=2, default=10.0)
    teaching_rate = models.DecimalField(max_digits=5, decimal_places=2, default=5.0)
    shift_rate = models.DecimalField(max_digits=5, decimal_places=2, default=5.0)
    clinical_rate = models.DecimalField(max_digits=5, decimal_places=2, default=7.5)
    call_duty_rate = models.DecimalField(max_digits=5, decimal_places=2, default=5.0)
    specialist_rate = models.DecimalField(max_digits=5, decimal_places=2, default=10.0)

    is_clinical = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.employee} Allowances"

    @property
    def salary(self):
        from fa.models import SalaryStructure
        try:
            return SalaryStructure.objects.get(
                salary_structure=self.employee.salary_structure,
                level=self.employee.grade_level,
                step=self.employee.step
            ).annual_salary
        except SalaryStructure.DoesNotExist:
            return Decimal(0)

    # === INDIVIDUAL ALLOWANCES ===

    @property
    def hazard_allowance(self):
        return round(self.salary * self.hazard_rate / 100, 2)

    @property
    def teaching_allowance(self):
        if self.employee.salary_structure in ['CONMESS', 'CONTOPSAL']:
            return round(self.salary * self.teaching_rate / 100, 2)
        elif self.employee.salary_structure == 'CONHESS' and self.employee.grade_level >= 9:
            return round(self.salary * self.teaching_rate / 100, 2)
        return Decimal(0)

    @property
    def shift_allowance(self):
        if self.employee.salary_structure == 'CONHESS' and not self.is_clinical:
            return round(self.salary * self.shift_rate / 100, 2)
        return Decimal(0)

    @property
    def clinical_allowance(self):
        if self.employee.salary_structure in ['CONMESS', 'CONTOPSAL']:
            return round(self.salary * self.clinical_rate / 100, 2)
        elif self.employee.salary_structure == 'CONHESS' and self.is_clinical:
            return round(self.salary * self.clinical_rate / 100, 2)
        return Decimal(0)

    @property
    def call_duty_allowance(self):
        if self.employee.salary_structure in ['CONMESS', 'CONTOPSAL']:
            return round(self.salary * self.call_duty_rate / 100, 2)
        elif self.employee.salary_structure == 'CONHESS' and self.is_clinical:
            return round(self.salary * self.call_duty_rate / 100, 2)
        return Decimal(0)

    @property
    def specialist_allowance(self):
        if self.employee.salary_structure in ['CONMESS', 'CONTOPSAL']:
            return round(self.salary * self.specialist_rate / 100, 2)
        return Decimal(0)

    @property
    def total_allowance(self):
        return sum([
            self.hazard_allowance,
            self.teaching_allowance,
            self.shift_allowance,
            self.clinical_allowance,
            self.call_duty_allowance,
            self.specialist_allowance,       
        ])
    
    @property
    def net_allowance(self):
        return round((
            self.hazard_allowance +
            self.teaching_allowance +
            self.shift_allowance +
            self.clinical_allowance +
            self.call_duty_allowance +
            self.specialist_allowance
        ), 2)

    