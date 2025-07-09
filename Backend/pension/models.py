from django.db import models

class Pension(models.Model):
    pfa = models.CharField(max_length=50)
    pfa_no = models.CharField(unique=True, max_length=20)


    def __str__(self):
        return self.pfa