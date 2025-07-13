from django.db import models
from fa.models import Account

class Archive(models.Model):
    ippis_no = models.ForeignKey(Account, on_delete=models.CASCADE)
    reason = models.CharField(max_length=15)
    archived_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ippis_no} - {self.reason}"
