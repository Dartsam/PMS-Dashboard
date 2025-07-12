from django.db import models

# Create your models here.

#Educational Qualification Model begins here
class EducationalQualification(models.Model):
    institution_attended = models.CharField(max_length=50)
    strt_date = models.DateField()
    end_date = models.DateField()
    certificate_obtained = models.CharField(max_length=10, unique=True)
    certificate_id = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.certificate_obtained
    
# Educational Qualification Model ends here

#Professional Qualification Model begins here
class ProfessionalQualification(models.Model):
    issuing_body = models.CharField(max_length=100)
    certificate_id = models.CharField(max_length=20, unique=True)
    certificate_name = models.CharField(max_length=50)
    issue_date = models.DateField()
    expiry_date = models.DateField()
    licence_number = models.CharField(max_length=20, unique=True)   

    def __str__(self):
        return self.certificate_name