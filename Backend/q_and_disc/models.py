from django.db import models
from nom_roll.models import User, Employee

class QAndDisc(models.Model):
    date = models.DateField()
    reason = models.CharField(max_length=300)
    response = models.TextField
    decision = models.TextField
    file_number = models.OneToOneField(Employee, on_delete = models.CASCADE)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.file_number} {self.reason}"
