from django.db import models
from nom_roll.models import Employee

class Task(models.Model):
    task_id = models.IntegerField()
    task_name = models.CharField(max_length=30)
    target = models.TextField()
    result = models.TextField()
    date = models.DateField()
    file_number = models.ForeignKey(Employee, on_delete=models.CASCADE)


    def __str__(self):
        return self.task_name
