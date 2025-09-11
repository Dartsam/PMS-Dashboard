from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from datetime import date
from django.core.validators import MinValueValidator, MaxValueValidator
from PMS import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
import os 

import re

from django.conf import settings
from PIL import Image

User = get_user_model()

def extract_digits(file_number: str) -> str:
    """Extract digits from the employee file number string."""
    return ''.join(re.findall(r'\d+', file_number))

# department model begins here. name and id were the attributes so
# DEPARTMENT.name, DEPARTMENT.code
class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=3, unique=True)  
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

    def clean(self):
        super().clean()
        today = date.today()
        min_allowed_date = today.replace(year=today.year - 18)
        if self.date_of_birth > min_allowed_date:
            raise ValidationError({"date_of_birth": "Staff must be at least 18 years old."})

    def __str__(self):
        return f"{self.mobile_number}"
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
    SECTION_CHOICES = EMPLOYEE_TYPE_CHOICES = [
        ('administration', 'Administration'),
        ('clinicals', 'Clinical Services'),
    ]
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    avatar =  models.ImageField(
        upload_to='profile_pic/',
        blank=True,
        null=True
    )
    file_number = models.CharField(max_length=17, unique=True)
    designation = models.CharField(max_length=30)
    employment_type = models.CharField(max_length=14, 
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
    department = models.ForeignKey(Department, on_delete = models.CASCADE)
    section = models.CharField(max_length=20, choices=SECTION_CHOICES, default='administration')
    office_email = models.EmailField()
    mobile_number = models.ForeignKey(Personal, on_delete=models.CASCADE)
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
    
    @property
    def digits(self):
        return extract_digits(self.file_number)
    
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

        if self.avatar and self.avatar.name:
            avatar_path = os.path.join(settings.MEDIA_ROOT, self.avatar.name)
            if os.path.exists(avatar_path):
                try:
                    avt = Image.open(avatar_path)
                except (FileNotFoundError, OSError) as e:
                    return
                if avt.height > 500 or avt.width > 500:
                    output_size = (500, 500)
                    avt.thumbnail(output_size)
                    avt.save(image_path)
            else:
                pass

class EmployeeDocument(models.Model):
    DOCUMENT_TYPE = [('birth_cert', 'Birth Certificate'), 
                      ('state_of_origin', 'State of Origin'), 
                      ('fslc', 'FSLC'),
                      ('ssce', 'SSCE'),
                      ('nce', 'NCE'),
                      ('nd', 'ND'),
                      ('hnd', 'HND'),
                      ('bachelors', 'Bachelors'),
                      ('nysc', 'NYSC'),
                      ('pgd', 'PGD'),
                      ('masters', 'MASTERS'),
                      ('doctorate', 'PhD'),
                      ('professional', 'Professional'),
                      ('other', 'Other'),
                      ('employment', 'Employment Letter'),
                      ('promotion', 'Promotion'),
                      ('query', 'Query'),
                      ('leave_approval', 'Leave approval'),
                      ('leave_resumption', 'Leave resumption'),
        ]
    file_number = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="documents")
    name = models.CharField(max_length=24, 
                        choices=DOCUMENT_TYPE)  # descriptive name
    file = models.FileField(upload_to="")  # path handled in save()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        digits = extract_digits(self.file_number.file_number)
        self.file.field.upload_to = f"staff_folder/{digits}/"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.file_number} - {self.name}"


# --- signal: create folder on Employee creation ---
@receiver(post_save, sender=Employee)
def create_employee_folder(sender, instance, created, **kwargs):
    if created:
        digits = extract_digits(instance.file_number)
        folder_path = os.path.join(settings.MEDIA_ROOT, "staff_folder", digits)
        os.makedirs(folder_path, exist_ok=True)

class TopManagement(models.Model):
    name = models.CharField(max_length=50)
    position = models.CharField(max_length=20)
    qualifications = models.CharField(max_length=50)
    email = models.EmailField()
    mobile_number = models.CharField(max_length=15)
    

    def __str__(self):
        return self.position

    
# employee model ends here


# nom_roll/serializers.py
# nom_roll/models.py

# from django.db import models
# from django.conf import settings
# from datetime import date
# from django.core.validators import MinValueValidator, MaxValueValidator
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from PIL import Image
# import os
# import re

# AUTH_USER = settings.AUTH_USER_MODEL

# def extract_digits(file_number: str) -> str:
#     """Extract digits from the employee file number string."""
#     return ''.join(re.findall(r'\d+', str(file_number) or ""))


# class Department(models.Model):
#     name = models.CharField(max_length=100, unique=True)
#     code = models.CharField(max_length=10, unique=True)

#     def __str__(self):
#         return self.name


# class Personal(models.Model):
#     GENDER_CHOICES = [('M', 'Male'), ('F', 'Female')]
#     STATE_CHOICES = [
#         ("Abia", "Abia"), ("Adamawa", "Adamawa"), ("Akwa Ibom", "Akwa Ibom"),
#         # ... keep the rest ...
#         ("Zamfara", "Zamfara"),
#     ]

#     user = models.OneToOneField(AUTH_USER, null=True, blank=True, on_delete=models.SET_NULL)
#     first_name = models.CharField(max_length=50)
#     last_name = models.CharField(max_length=50)
#     state_of_origin = models.CharField(max_length=30, choices=STATE_CHOICES)
#     email = models.EmailField(unique=True)
#     mobile_number = models.CharField(max_length=15, unique=True)
#     home_address = models.CharField(max_length=150)
#     gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
#     date_of_birth = models.DateField()
#     updated_at = models.DateTimeField(auto_now=True)

#     def clean(self):
#         super().clean()
#         today = date.today()
#         min_allowed_date = today.replace(year=today.year - 18)
#         if self.date_of_birth > min_allowed_date:
#             from django.core.exceptions import ValidationError
#             raise ValidationError({"date_of_birth": "Staff must be at least 18 years old."})

#     def __str__(self):
#         return f"{self.first_name} {self.last_name} ({self.mobile_number})"


# class Employee(models.Model):
#     STATUS_CHOICES = [
#         ('active', 'Active'),
#         ('retired', 'Retired'),
#         ('deceased', 'Deceased'),
#         ('resigned', 'Resigned'),
#         ('terminated', 'Terminated'),
#     ]
#     EMPLOYEE_TYPE_CHOICES = [
#         ('permanent', 'Permanent'),
#         ('temporary', 'Temporary'),
#     ]

#     user = models.OneToOneField(AUTH_USER, null=True, blank=True, on_delete=models.SET_NULL)
#     avatar = models.ImageField(upload_to='profile_pic/', blank=True, null=True)
#     file_number = models.CharField(max_length=50, unique=True)
#     designation = models.CharField(max_length=100)
#     employment_type = models.CharField(max_length=10, choices=EMPLOYEE_TYPE_CHOICES, default='permanent')
#     salary_structure = models.CharField(max_length=10, choices=[
#         ('CONHESS', 'CONHESS'),
#         ('CONMESS', 'CONMESS'),
#         ('CONTOPSAL', 'CONTOPSAL'),
#     ], default='CONHESS')
#     grade_level = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(15)])
#     step = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(15)])
#     dofa = models.DateField()   # date of first appointment
#     dolp = models.DateField(null=True, blank=True)
#     edor = models.DateField(null=True, blank=True)  # end of retirement
#     status = models.CharField(max_length=12, choices=STATUS_CHOICES, default='active')
#     department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='employees')
#     office_email = models.EmailField(blank=True, null=True)
#     mobile_number = models.ForeignKey(Personal, on_delete=models.CASCADE, related_name='employees')
#     isHOD = models.BooleanField(default=False)
#     signature = models.ImageField(upload_to='signature/', blank=True, null=True)

#     def __str__(self):
#         return f"{self.file_number} - {self.designation}"

#     @property
#     def digits(self):
#         return extract_digits(self.file_number)

#     def save(self, *args, **kwargs):
#         # compute edor if possible
#         try:
#             dob = self.mobile_number.date_of_birth
#             if dob and self.dofa:
#                 age_at_appointment = self.dofa.year - dob.year - (
#                     (self.dofa.month, self.dofa.day) < (dob.month, dob.day)
#                 )
#                 if age_at_appointment < 25:
#                     self.edor = self.dofa.replace(year=self.dofa.year + 35)
#                 else:
#                     self.edor = dob.replace(year=dob.year + 60)
#         except Exception:
#             # keep existing edor if something goes wrong
#             pass

#         super().save(*args, **kwargs)

#         # Resize signature if necessary
#         if self.signature and getattr(self.signature, "name", None):
#             signature_path = os.path.join(settings.MEDIA_ROOT, self.signature.name)
#             if os.path.exists(signature_path):
#                 try:
#                     img = Image.open(signature_path)
#                     if img.height > 300 or img.width > 300:
#                         img.thumbnail((300, 300))
#                         img.save(signature_path)
#                 except Exception:
#                     pass

#         # Resize avatar if necessary
#         if self.avatar and getattr(self.avatar, "name", None):
#             avatar_path = os.path.join(settings.MEDIA_ROOT, self.avatar.name)
#             if os.path.exists(avatar_path):
#                 try:
#                     avt = Image.open(avatar_path)
#                     if avt.height > 500 or avt.width > 500:
#                         avt.thumbnail((500, 500))
#                         avt.save(avatar_path)
#                 except Exception:
#                     pass


# class EmployeeDocument(models.Model):
#     DOCUMENT_TYPE = [
#         ('birth_cert', 'Birth Certificate'),
#         ('state_of_origin', 'State of Origin'),
#         ('fslc', 'FSLC'),
#         ('ssce', 'SSCE'),
#         ('nce', 'NCE'),
#         ('nd', 'ND'),
#         ('hnd', 'HND'),
#         ('bachelors', 'Bachelors'),
#         ('nysc', 'NYSC'),
#         ('pgd', 'PGD'),
#         ('masters', 'Masters'),
#         ('doctorate', 'PhD'),
#         ('professional', 'Professional'),
#         ('other', 'Other'),
#         ('employment', 'Employment Letter'),
#         ('promotion', 'Promotion'),
#         ('query', 'Query'),
#         ('leave_approval', 'Leave approval'),
#         ('leave_resumption', 'Leave resumption'),
#     ]

#     employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="documents")
#     name = models.CharField(max_length=40, choices=DOCUMENT_TYPE)
#     file = models.FileField(upload_to="staff_folder/temp/")  # will be set dynamically before save
#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def save(self, *args, **kwargs):
#         # ensure upload path uses digits
#         try:
#             digits = extract_digits(self.employee.file_number)
#             # set upload path dynamically so that file is saved directly under staff_folder/{digits}/
#             self.file.field.upload_to = f"staff_folder/{digits}/"
#         except Exception:
#             pass
#         super().save(*args, **kwargs)

#     def __str__(self):
#         return f"{self.employee.file_number}"


# @receiver(post_save, sender=Employee)
# def create_employee_folder(sender, instance, created, **kwargs):
#     # create staff folder when employee created (idempotent)
#     try:
#         digits = instance.digits
#         folder_path = os.path.join(settings.MEDIA_ROOT, "staff_folder", digits)
#         os.makedirs(folder_path, exist_ok=True)
#     except Exception:
#         pass


