# nhf/models.py

from django.db import models
from datetime import datetime
from fa.models import StandardDeduction

MONTH_CHOICES = [
    (1, 'January'), (2, 'February'), (3, 'March'), (4, 'April'),
    (5, 'May'), (6, 'June'), (7, 'July'), (8, 'August'),
    (9, 'September'), (10, 'October'), (11, 'November'), (12, 'December'),
]

class NHFDeduction(models.Model):
    standard_deduction = models.ForeignKey(StandardDeduction, on_delete=models.CASCADE, related_name='nhf_records')
    month = models.IntegerField(choices=MONTH_CHOICES)
    year = models.IntegerField(default=datetime.now().year)
    nhf_amount = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('standard_deduction', 'month', 'year')
        ordering = ['-year', '-month']

    def __str__(self):
        return f"{self.standard_deduction.ippis_account} - NHF for {self.get_month_display()} {self.year}: ₦{self.nhf_amount:,.2f}"

    def save(self, *args, **kwargs):
        if not self.nhf_amount:
            self.nhf_amount = self.standard_deduction.nhf_amount
        super().save(*args, **kwargs)
