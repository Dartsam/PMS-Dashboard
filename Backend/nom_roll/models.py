from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
import os 
from django.conf import settings
from PIL import Image

User = get_user_model()
# department model begins here. name and id were the attributes so
# DEPARTMENT.name, DEPARTMENT.id
class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=3, unique=True)  # was 'id'
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# department model ends here

# personal model begins here. user, first_name, last_name, email, mobile_number,
# home_address, gender, date_of_birth, updated_at
class Personal(models.Model):
    GENDER_CHOICES = [('M', 'Male'), ('F', 'Female')]
    STATE_CHOICES = [("Abia", "Abia"), ("Adamawa", "Adamawa"), 
                    ("Akwa Ibom", "Akwa Ibom"), ("Anambra", "Anambra"),
                    ("Bauchi", "Bauchi"), ("Bayelsa", "Bayelsa"), 
                    ("Benue", "Benue"), ("Borno", "Borno"), 
                    ("Cross River", "Cross River"), ("Delta", "Delta"),
                    ("Ebonyi", "Ebonyi"), ("Edo", "Edo"), ("Ekiti", "Ekiti"), 
                    ("Enugu", "Enugu"), ("FCT", "FCT"), ("Gombe", "Gombe"), 
                    ("Imo", "Imo"), ("Jigawa", "Jigawa"), ("Kaduna", "Kaduna"), 
                    ("Kano", "Kano"), ("Katsina", "Katsina"), ("Kebbi", "Kebbi"), 
                    ("Kogi", "Kogi"), ("Kwara", "Kwara"), ("Lagos", "Lagos"), 
                    ("Nasarawa", "Nasarawa"), ("Niger", "Niger"),
                    ("Ogun", "Ogun"), ("Ondo", "Ondo"), ("Osun", "Osun"), 
                    ("Oyo", "Oyo"), ("Plateau", "Plateau"), ("Rivers", "Rivers"),
                    ("Sokoto", "Sokoto"), ("Taraba", "Taraba"), 
                    ("Yobe", "Yobe"), ("Zamfara", "Zamfara"),
    ]
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    state_of_origin = models.CharField(max_length=20, choices=STATE_CHOICES)
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15, unique=True)
    home_address = models.CharField(max_length=150)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f" {self.user.get_full_name()}"
# personal model ends here

# employee model begins here. file_number, designation, employment_type,
# conhess, step, dofa, dolp, edor, status, department, office_email, 
# mobile_number    
class Employee(models.Model):
    STATUS_CHOICES = [('active', 'Active'), 
                      ('retired', 'Retired'), 
                      ('deceased', 'Deceased'),
                      ('resigned', 'Resigned'),
                      ('terminated', 'Terminated'),
    ]
    EMPLOYEE_TYPE_CHOICES = [
        ('permanent', 'Permanent'),
        ('temporary', 'Temporary'),
    ]

    file_number = models.CharField(max_length=17, unique=True)
    designation = models.CharField(max_length=30)
    employment_type = models.CharField(max_length=10, 
                        choices=EMPLOYEE_TYPE_CHOICES, 
                        default='permanent'
    )
    salary_structure = models.CharField(max_length=10, choices=[
                        ('CONHESS', 'CONHESS'),
                        ('CONMESS', 'CONMESS'), 
                        ('CONTOPSAL', 'CONTOPSAL')], 
                        default='CONHESS'
    )
    grade_level = models.IntegerField(validators=[MinValueValidator(1), 
                                                  MaxValueValidator(15)])
    step = models.IntegerField(validators=[MinValueValidator(1), 
                                           MaxValueValidator(15)])
    dofa = models.DateField()
    dolp = models.DateField(null=True, blank=True)
    edor = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, 
                              default='active'
    )
    department = models.CharField(max_length=20)
    office_email = models.EmailField()
    mobile_number = models.CharField(max_length=15)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    isHOD = models.BooleanField(default=False)
    signature =  models.ImageField(
        upload_to='signature/',
        blank=True,
        null=True
    )

    def __str__(self):
        return (f"{self.file_number} "
        )
    def save(self, *args, **kwargs):
        # Auto-compute edor before saving
        dob = self.mobile_number.date_of_birth
        if dob and self.dofa:
            age_at_appointment = self.dofa.year - dob.year - (
                (self.dofa.month, self.dofa.day) < (dob.month, dob.day)
            )
            if age_at_appointment < 25:
                self.edor = self.dofa.replace(year=self.dofa.year + 35)
            else:
                self.edor = dob.replace(year=dob.year + 60)
        super().save(*args, **kwargs)
        
        if self.signature and self.signature.name:
            image_path = os.path.join(settings.MEDIA_ROOT, self.signature.name)
            if os.path.exists(image_path):
                try:
                    img = Image.open(image_path)
                except (FileNotFoundError, OSError) as e:
                    return
                if img.height > 300 or img.width > 300:
                    output_size = (300, 300)
                    img.thumbnail(output_size)
                    img.save(image_path)
            else:
                pass


class TopManagement(models.Model):
    name = models.CharField(max_length=50)
    position = models.CharField(max_length=20)
    qualifications = models.CharField(max_length=50)
    email = models.EmailField()
    mobile_number = models.CharField(max_length=15)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.position

    
# employee model ends here
