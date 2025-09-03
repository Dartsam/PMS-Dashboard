from django.db import models
from nom_roll.models import User
from fa.models import Account

class Archive(models.Model):
    ippis_no = models.OneToOneField(Account, on_delete=models.CASCADE)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    reason = models.CharField(max_length=15)
    archived_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ippis_no} - {self.reason}"
