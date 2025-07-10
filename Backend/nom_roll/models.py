from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.

User = get_user_model()
# department model begins here. name and id were the attributes so
# DEPARTMENT.name, DEPARTMENT.id
class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=3, unique=True)  # was 'id'

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
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    state_of_origin = models.CharField(max_length=20, choices=STATE_CHOICES)
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15, unique=True, 
                                     primary_key=True)
    home_address = models.CharField(max_length=150)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.email} - {self.user.get_full_name()}"
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

    file_number = models.OneToOneField(
                    Personal, on_delete=models.CASCADE, 
                    primary_key=True,
                    related_name='employee_by_file'
    )
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
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    office_email = models.EmailField(unique=True)
    mobile_number = models.OneToOneField(
        Personal, on_delete=models.CASCADE, unique=True, 
        related_name='employee_by_mobile'
    )

    def __str__(self):
        return (f"{self.file_number} - {self.designation} - "
        f"{self.department.name} - {self.status}"
        )

# employee model ends here
