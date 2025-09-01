from django.db import models
from nom_roll.models import User
from fa.models import Account

class Performance(models.Model):
    task_name = models.CharField(max_length=30)
    task_id = models.IntegerField()
    weight = models.IntegerField()
    target = models.TextField()
    outcome = models.TextField()
    rating = models.CharField(max_length=10)
    ippis_no = models.OneToOneField(Account, on_delete = models.CASCADE)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)


    def __str__(self):
        return self.task_name