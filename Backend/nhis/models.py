from django.db import models
from nom_roll.models import Personal 

class Nhis(models.Model):
    RELATIONSHIP_CHOICES = [
    ('Spouse', 'Spouse'),
    ('Child', 'Child'),
    ('Parent', 'Parent'),
    ('Other', 'Other'),
]
    
    name = models.CharField(max_length=50)
    dob = models.DateField()
    relationship = models.CharField(max_length=10, choices=RELATIONSHIP_CHOICES)
    email = models.ForeignKey(Personal, to_field='email', on_delete=models.CASCADE)

    def __str__(self):
        return self.name