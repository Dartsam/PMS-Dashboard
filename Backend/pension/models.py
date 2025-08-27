from django.db import models
from nom_roll.models import User

class Pension(models.Model):
    pfa = models.CharField(max_length=50)
    pfa_no = models.CharField(unique=True, max_length=20)
    user = models.ForeignKey(User, null=True, on_delete= models.CASCADE)


    def __str__(self):
        return self.pfa