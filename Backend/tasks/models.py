from django.db import models
from nom_roll.models import User

class Task(models.Model):
    task_id = models.IntegerField()
    task_name = models.CharField(max_length=30)
    target = models.TextField()
    result = models.TextField()
    date = models.DateField()
    file_number = models.CharField(max_length=17, unique=True)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)


    def __str__(self):
        return self.task_name
