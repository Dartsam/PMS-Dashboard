from django.db import models
from promotion.models import Promotion
from nom_roll.models import Employee, Personal

# Create your models here.

# cadre models begins here
class Cadre(models.Model):
    cadre_name = models.CharField(max_length=20)
    level = models.IntegerField()
    designation = models.OneToOneField(Employee, on_delete=models.CASCADE)
    def __str__(self):
        return f"Designation {self.designation} - Level {self.level}"
# cadre models ends here

# prom_eligibility/models.py

from django.db import models
from nom_roll.models import Employee

class PromotionEligibility(models.Model):
    file_number = models.ForeignKey(Employee, on_delete=models.CASCADE)
    year = models.IntegerField()  # e.g. 2025
    is_eligible = models.BooleanField(default=False)
    checked_on = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('file_number', 'year')

    def __str__(self):
        return f"{self.file_number} - {self.year} - {'Eligible' if self.is_eligible else 'Not Eligible'}"


class PromotionExercise(models.Model):
    file_number = models.ForeignKey(Employee, to_field='file_number', on_delete=models.CASCADE)
    aper_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    civil_service_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    area_of_specialization_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    general_paper_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    total_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0, editable=False)
    isPromoted = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        self.total_score = (
            self.aper_score +
            self.civil_service_score +
            self.area_of_specialization_score +
            self.general_paper_score
        )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"File Number {self.file_number} - Total Score: {self.total_score} - Promoted: {self.isPromoted}"
