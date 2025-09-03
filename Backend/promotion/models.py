from django.db import models
from nom_roll.models import User, Employee

class Promotion(models.Model):
    year = models.DateField()
    conhess = models.IntegerField()
    designation = models.CharField(max_length=30)
    step = models.IntegerField()
    dolp = models.DateField()
    file_number = models.ForeignKey(Employee, on_delete = models.CASCADE)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.designation