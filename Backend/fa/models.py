from django.db import models
from nom_roll.models import Personal, Employee
# Create your models here.
class Account(models.Model):
    account_number = models.OneToOneField(Personal, on_delete=models.CASCADE, max_length=20, unique=True)
    file_number = models.ForeignKey(Employee, on_delete=models.CASCADE)
    paypoint = models.CharField(max_length=25)
    salary_structure = models.CharField(max_length=10)
    pfa_no = models.CharField(max_length=20)
    ippis_no = models.CharField(max_length=7)

    def __str__(self):
        return f"{self.employee.file_number} - {self.bank_name} - {self.account_number}"  