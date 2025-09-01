from django.db import models
from nom_roll.models import User, Employee

class Task(models.Model):
    task_id = models.IntegerField()
    task_name = models.CharField(max_length=30)
    target = models.TextField()
    result = models.TextField()
    date = models.DateField()
    file_number = models.OneToOneField(Employee, on_delete = models.CASCADE)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)


    def __str__(self):
        return self.task_name
