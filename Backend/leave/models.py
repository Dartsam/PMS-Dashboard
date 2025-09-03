from django.db import models
from nom_roll.models import User, Employee

class Leave(models.Model):
    leave_type = models.CharField(max_length=50)
    leave_starts = models.DateField()
    leave_ends = models.DateField()
    file_number = models.ForeignKey(Employee, on_delete = models.CASCADE)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.file_number}"