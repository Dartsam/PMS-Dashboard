from django.db import models
from nom_roll.models import User

class Leave(models.Model):
    leave_type = models.CharField(max_length=50)
    leave_starts = models.DateField()
    leave_ends = models.DateField()
    file_number = models.CharField(max_length=17, unique=True)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.leave_type