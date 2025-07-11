from django.db import models
from fa.models import Account
from tasks.models import Task

class Performance(models.Model):
    task_name = models.CharField(max_length=30)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    weight = models.IntegerField()
    target = models.TextField()
    outcome = models.TextField()
    rating = models.CharField(max_length=10)
    ippis_no = models.ForeignKey(Account, on_delete=models.CASCADE)


    def __str__(self):
        return self.task_name