from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from fa.models import SalaryStructure
from prom_eligibility.models import PromotionEligibility
from nom_roll.models import User, Employee

# Create your models here.

class PersonnelBudget(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    file_number = models.OneToOneField(Employee, null=True, on_delete=models.CASCADE)
    year = models.PositiveIntegerField()

    # computed fields
    new_designation = models.CharField(max_length=50)
    new_level = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(15)])
    new_step = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(15)])
    projected_annual_salary = models.DecimalField(max_digits=12, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)

    # class Meta:
    #     unique_together = ('file_number', 'year')
    #     ordering = ['file_number__file_number']

    class Meta:
        pass

    def save(self, *args, **kwargs):
        # fetch eligibility for this year
        try:
            pe = PromotionEligibility.objects.get(
                file_number=self.file_number,
                year=self.year
            )
            eligible = pe.is_eligible
        except PromotionEligibility.DoesNotExist:
            eligible = False

        # starting values
        lvl = self.file_number.grade_level
        stp = self.file_number.step
        desig = self.file_number.designation

        # apply logic
        if not eligible:
            if lvl in range(1, 10) and stp in range(1, 15):
                stp += 1
            elif lvl in range(10, 14) and stp in range(1, 11):
                stp += 1
            elif lvl > 13 and stp in range(1, 9):
                stp += 1
            else:
                pass
        else: 
            if lvl != 9 and lvl != 14:
                lvl += 1
                stp -= 1
                
            elif lvl == 9:
                lvl = max(lvl + 2, 1)
                stp -= 1
            elif lvl == 14 and desig.lower() == 'assistant director':
                desig = 'Deputy Director'
                # do not bump level further, just increase step
                stp += 1
            else:
                pass  # for other cases, just increase step

        # cap step to 15

        if lvl in range(1, 10):
            stp = min(stp, 15)
        elif lvl in range(11, 14):
            stp = min(stp, 11)
        else:
            stp = min(stp, 9)

        # lookup salary
        try:
            salary_obj = SalaryStructure.objects.get(
                salary_structure=self.file_number.salary_structure,
                level=lvl,
                step=stp
            )
            annual = salary_obj.annual_salary
        except SalaryStructure.DoesNotExist:
            annual = 0

        # assign
        self.new_designation = desig
        self.new_level = lvl
        self.new_step = stp
        self.projected_annual_salary = annual

        super().save(*args, **kwargs)