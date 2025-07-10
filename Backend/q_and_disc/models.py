from django.db import models
from nom_roll.models import Employee

class QAndDisc(models.Model):
    date = models.DateField()
    reason = models.CharField(max_length=300)
    response = models.TextField
    decision = models.TextField
    file_number = models.ForeignKey(Employee, on_delete=models.CASCADE)

    def __str__(self):
        return self.file_number
