from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from nom_roll.models import User
import os
from django.conf import settings
from PIL import Image


class Profile(models.Model):
    profile_picture = models.ImageField(
        upload_to='profile_pictures/',
        blank=True,
        null=True
    )
    name = models.CharField(max_length=50)
    file_number = models.CharField(max_length=17)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    ippis_no = models.CharField(max_length=7)
    designation = models.CharField(max_length=30)
    grade_level = models.IntegerField(validators=[MinValueValidator(1),
                                                   MaxValueValidator(15)])
    conhess = models.IntegerField(validators=[MinValueValidator(1),
                                                MaxValueValidator(15)])
    dofa = models.DateField()
    dolp = models.DateField()
    edor = models.DateField()

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        # First save the model to ensure self.image.path is available
        super().save(*args, **kwargs)

        # Now attempt to open & resize only if file exists
        if self.profile_picture and self.profile_picture.name:
            # Build full path; you can also use self.image.path directly
            image_path = os.path.join(settings.MEDIA_ROOT, self.profile_picture.name)
            if os.path.exists(image_path):
                try:
                    img = Image.open(image_path)
                except (FileNotFoundError, OSError) as e:
                    # File isn't there or not a valid image: skip resizing
                    return
                # Only resize if larger than desired
                if img.height > 300 or img.width > 300:
                    output_size = (300, 300)
                    img.thumbnail(output_size)
                    img.save(image_path)
            else:
                # File missing: nothing to do
                pass


class CareerDescending(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    promotion_year = models.DateField()
    previous_designation = models.CharField(max_length=30)
    current_designation = models.CharField(max_length=30)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.current_designation


class LeaveDescending(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    nature_of_leave = models.CharField(max_length=50)
    resumption = models.DateField()

    def __str__(self):
        return self.nature_of_leave


class QualificationsDescending(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    start_year = models.DateField()
    finish = models.DateField() 
    certificate_obtained = models.CharField(max_length=10)
    certificate_id = models.CharField(max_length=20)

    def __str__(self):
        return self.certificate_obtained


class ProfessionalCertificate(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    issuing_body = models.CharField(max_length=50)
    issue_date = models.DateField()
    expiry_date = models.DateField()
    license_number = models.CharField(max_length=20)

    def __str__(self):
        return self.issuing_body