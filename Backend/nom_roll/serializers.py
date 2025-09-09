from rest_framework import serializers
from django.db import transaction
from nom_roll.models import Personal, Employee, Department, TopManagement, EmployeeDocument
from datetime import date
# from django.db.models.query import QuerySet
# from django.conf import settings
# from typing import Iterable
from fa.models import Account, Pension
from .models import Personal, Employee, Department
from qualifications.models import EducationalQualification, ProfessionalQualification
from fa.serializers import AccountSerializer, PensionSerializer
from qualifications.serializers import EducationalQualificationSerializer, ProfessionalQualificationSerializer
from promotion.serializers import PromotionSerializer
from q_and_disc.serializers import QAndDiscSerializer

# DepartmentSerializer is used to serialize the Department model. It begins here
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["name", "code"]  # Explicit fields for clarity
# DepartmentSerializer ends here

# PersonalSerializer begins here
class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal
        exclude = ("user",)

    def validate_date_of_birth(self, value):
        from datetime import date
        age = (date.today() - value).days // 365
        if age < 18:
            raise serializers.ValidationError("Staff must be at least 18 years old.")
        return value
# PersonalSerializer ends here



# TopManagementSerializer begins here
class TopManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopManagement
        fields = '__all__'
# TopManagementSerializer ends here

# StaffCreateSerializer begins here


# NominalRollSerializer for the nominal roll begins here
class NominalRollSerializer(serializers.ModelSerializer):
    f_name = serializers.CharField(source='mobile_number.first_name')
    l_name = serializers.CharField(source='mobile_number.last_name')

    # Dropdown for state_of_origin
    state_of_origin = serializers.ChoiceField(
        choices=Personal.STATE_CHOICES,
        source='mobile_number.state_of_origin'
    )

    date_of_birth = serializers.DateField(source='mobile_number.date_of_birth')
    dofa = serializers.DateField()
    age_at_appointment = serializers.SerializerMethodField()
    years_left_until_retirement = serializers.SerializerMethodField()

    file_number = serializers.CharField()
    ippis_number = serializers.CharField(source='account.ippis_no')
    dofa = serializers.DateField()
    unit = serializers.CharField(source='department.name')
    designation = serializers.CharField()

    # Dropdown for salary_structure
    salary_structure = serializers.ChoiceField(
        choices=Employee._meta.get_field('salary_structure').choices
    )

    # Dropdown for status
    status = serializers.ChoiceField(
        choices=Employee.STATUS_CHOICES
    )

    # Dropdown for employment_type
    employment_type = serializers.ChoiceField(
        choices=Employee.EMPLOYEE_TYPE_CHOICES
    )

    grade_level = serializers.IntegerField()
    step = serializers.IntegerField()
    dolp = serializers.DateField()
    edor = serializers.DateField()

    class Meta:
        model = Employee
        fields = [
            'f_name', 'l_name', 'state_of_origin', 'date_of_birth',
            'age_at_appointment', 'years_left_until_retirement',
            'file_number', 'ippis_number', 'dofa', 'unit', 'designation',
            'salary_structure', 'status', 'employment_type',
            'grade_level', 'step', 'dolp', 'edor'
        ]

    def get_age_at_appointment(self, obj):
        dob = obj.mobile_number.date_of_birth
        return obj.dofa.year - dob.year - (
            (obj.dofa.month, obj.dofa.day) < (dob.month, dob.day)
        )

    def get_years_left_until_retirement(self, obj):
        today = date.today()
        return obj.edor.year - today.year - (
            (obj.edor.month, obj.edor.day) < (today.month, today.day)
        )
# NominalRollSerializer ends here 

class EmployeeDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeDocument
        fields = ['id', 'name', 'file', 'uploaded_at']

# EmployeeSerializer begins here
class EmployeeSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()
    documents = EmployeeDocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Employee
        exclude = ("user",)

    def validate_grade_level(self, value):
        if value < 1 or value > 17:
            raise serializers.ValidationError("Grade level must be between 1 and 17.")
        return value
# EmployeeSerializer ends here

class StaffCreateSerializer(serializers.Serializer):
    personal = PersonalSerializer()
    employee = EmployeeSerializer()
    account = AccountSerializer()
    education = EducationalQualificationSerializer(many=True)
    qualification = ProfessionalQualificationSerializer(many=True)

    @transaction.atomic
    def create(self, validated_data):
        # Extract nested data
        personal_data = validated_data.pop("personal")
        employee_data = validated_data.pop("employee")
        account_data = validated_data.pop("account")
        qualifications_data = validated_data.pop("education", [])
        education_data = validated_data.pop("qualification", [])

        # Handle department explicitly
        department_data = employee_data.pop("department")
        department, _ = Department.objects.get_or_create(**department_data)

        # Save personal
        personal = Personal.objects.create(**personal_data)

        # Save employee
        employee = Employee.objects.create(personal=personal, department=department, **employee_data)

        # Save account
        account = Account.objects.create(employee=employee, **account_data)

        # Save qualifications
        qualifications = []
        for q in qualifications_data:
            qualifications.append(EducationalQualification.objects.create(employee=employee, **q))

        #save education
        educations = []
        for e in education_data:
            qualifications.append(ProfessionalQualification.objects.create(employee=employee, **e))

        return {
            "personal": personal,
            "employee": employee,
            "account": account,
            "qualifications": qualifications,
            "educations": educations,
        }
# StaffCreateSerializer ends here

class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField()
    signature = serializers.ImageField()

    # From related Personal model (via Employee.mobile_number FK)
    first_name = serializers.CharField(source="mobile_number.first_name", read_only=True)
    last_name = serializers.CharField(source="mobile_number.last_name", read_only=True)
    email = serializers.EmailField(source="mobile_number.email", read_only=True)

    # Related tables
    personal_records = serializers.SerializerMethodField()
    employee_details = serializers.SerializerMethodField()
    account_details = AccountSerializer(source="user.account", read_only=True)  # <-- cleaner
    educational_details = EducationalQualificationSerializer(many=True, source="user.educationalqualification_set")
    professional_qualifications = ProfessionalQualificationSerializer(many=True, source="user.professionalqualification_set")
    career_progression = PromotionSerializer(many=True, source="promotion_set")
    queries = QAndDiscSerializer(many=True, source="qanddisc_set")

    class Meta:
        model = Employee
        fields = [
            "avatar",
            "signature",
            "first_name",
            "last_name",
            "email",
            "personal_records",
            "employee_details",
            "account_details",
            "educational_details",
            "professional_qualifications",
            "career_progression",
            "queries",
        ]

    def get_personal_records(self, obj):
        person = obj.mobile_number
        if not person:
            return {}
        return {
            "first_name": person.first_name,
            "last_name": person.last_name,
            "date_of_birth": person.date_of_birth,
            "state_of_origin": person.state_of_origin,
            "home_address": person.home_address,
            "mobile_number": person.mobile_number,
            "email": person.email,
            "gender": person.gender
        }

    def get_employee_details(self, obj):
        return {
            "file_number": obj.file_number,
            "designation": obj.designation,
            "employment_type": obj.employment_type,
            "salary_structure": obj.salary_structure,
            "grade_level": obj.grade_level,
            "step": obj.step,
            "dofa": obj.dofa,
            "dolp": obj.dolp,
            "edor": obj.edor,
            "status": obj.status,
            "department": obj.department.name if obj.department else None,
            "office_email": obj.office_email,
        }


# class ProfileSerializer(serializers.Serializer):
#     """
#     Returns a structured profile payload grouped into fieldsets:
#       - profile_picture
#       - personal_records
#       - employee_details
#       - account_details
#       - educational_details (list)
#       - professional_qualifications (list)
#       - trainings (list)
#       - career_progression (list, desc)
#       - queries (list, desc)
#       - documents (list)
#     """

#     # top-level groups:
#     profile_picture = serializers.SerializerMethodField()
#     personal_records = serializers.SerializerMethodField()
#     employee_details = serializers.SerializerMethodField()
#     account_details = serializers.SerializerMethodField()
#     educational_details = serializers.SerializerMethodField()
#     professional_qualifications = serializers.SerializerMethodField()
#     trainings = serializers.SerializerMethodField()
#     career_progression = serializers.SerializerMethodField()
#     queries = serializers.SerializerMethodField()
#     documents = serializers.SerializerMethodField()

#     def _request(self):
#         return self.context.get("request", None)

#     def _abs_url(self, file_obj):
#         """Return absolute URL (safely)."""
#         if not file_obj:
#             return None
#         req = self._request()
#         # file_obj might be a FieldFile or a string path
#         url = getattr(file_obj, "url", str(file_obj))
#         if req:
#             return req.build_absolute_uri(url)
#         return url

#     def get_profile_picture(self, obj):
#         return {
#             "avatar": self._abs_url(getattr(obj, "avatar", None)),
#             "signature": self._abs_url(getattr(obj, "signature", None)),
#         }

#     def get_personal_records(self, obj):
#         # your Employee references Personal via `mobile_number` in your model
#         person = getattr(obj, "mobile_number", None) or getattr(obj, "personal", None)
#         if not person:
#             return {}
#         # extract common personal fields if available
#         return {
#             "full_name": getattr(person, "full_name", None)
#                          or " ".join(filter(None, [getattr(person, "first_name", None), getattr(person, "last_name", None)])),
#             "date_of_birth": getattr(person, "date_of_birth", None),
#             "gender": getattr(person, "gender", None),
#             "phone": getattr(person, "phone", None) or getattr(person, "mobile_number", None),
#             "address": getattr(person, "address", None),
#             "other": getattr(person, "other_details", None),
#         }

#     def get_employee_details(self, obj):
#         dept = getattr(obj, "department", None)
#         return {
#             "file_number": obj.file_number,
#             "digits": "".join([c for c in obj.file_number if c.isdigit()]),
#             "designation": obj.designation,
#             "employment_type": obj.employment_type,
#             "salary_structure": obj.salary_structure,
#             "grade_level": obj.grade_level,
#             "step": obj.step,
#             "dofa": obj.dofa,
#             "dolp": obj.dolp,
#             "edor": obj.edor,
#             "status": obj.status,
#             "department": getattr(dept, "name", str(dept)) if dept else None,
#             "office_email": obj.office_email,
#         }

#     def get_account_details(self, obj):
#         user = getattr(obj, "user", None)
#         if not user:
#             return {}
#         return {
#             "username": getattr(user, "username", None),
#             "email": getattr(user, "email", None),
#             "first_name": getattr(user, "first_name", None),
#             "last_name": getattr(user, "last_name", None),
#             "is_staff": getattr(user, "is_staff", None),
#             "is_active": getattr(user, "is_active", None),
#             "date_joined": getattr(user, "date_joined", None),
#             "last_login": getattr(user, "last_login", None),
#         }

#     # Helper to find related querysets under a few common attribute names
#     def _get_related_qs(self, obj, candidates: Iterable[str]) -> QuerySet:
#         for name in candidates:
#             rel = getattr(obj, name, None)
#             if rel is None:
#                 continue
#             if hasattr(rel, "all"):
#                 try:
#                     return rel.all()
#                 except TypeError:
#                     return rel
#             if isinstance(rel, QuerySet):
#                 return rel
#         return []

#     def _serialize_simple_list(self, qs, field_map: dict):
#         out = []
#         for o in qs:
#             row = {}
#             for out_key, attr in field_map.items():
#                 row[out_key] = getattr(o, attr, None)
#             out.append(row)
#         return out

#     def get_educational_details(self, obj):
#         qs = self._get_related_qs(obj, [
#             "educations", "education_set", "educational_details",
#             "employeeeducation_set", "employee_education_set"
#         ])
#         field_map = {
#             "id": "id",
#             "institution": "institution",
#             "degree": "degree",
#             "field_of_study": "field_of_study",
#             "graduation_year": "graduation_year",
#             "grade": "grade",
#             "remarks": "remarks",
#         }
#         return self._serialize_simple_list(qs, field_map)

#     def get_professional_qualifications(self, obj):
#         qs = self._get_related_qs(obj, [
#             "qualifications", "professional_qualifications",
#             "qualification_set", "employeequalification_set"
#         ])
#         field_map = {"id": "id", "title": "title", "institution": "institution", "date_obtained": "date_obtained", "remarks": "remarks"}
#         return self._serialize_simple_list(qs, field_map)

#     def get_trainings(self, obj):
#         qs = self._get_related_qs(obj, [
#             "trainings", "training_set", "trainings_attended",
#             "employee_training_set", "trainingworkshop_set"
#         ])
#         field_map = {"id": "id", "title": "title", "organizer": "organizer", "start_date": "start_date", "end_date": "end_date", "certificate": "certificate"}
#         return self._serialize_simple_list(qs, field_map)

#     def get_career_progression(self, obj):
#         qs = self._get_related_qs(obj, [
#             "careerprogressions", "careerprogression_set", "career_progression",
#             "promotionhistory_set", "career_set"
#         ])
#         if qs:
#             try:
#                 qs = qs.order_by("-date")
#             except Exception:
#                 pass
#         field_map = {"id": "id", "from_designation": "from_designation", "to_designation": "to_designation", "date": "date", "remarks": "remarks"}
#         return self._serialize_simple_list(qs, field_map)

#     def get_queries(self, obj):
#         qs = self._get_related_qs(obj, ["queries", "query_set", "disciplinaryquery_set", "complaints"])
#         if qs:
#             try:
#                 qs = qs.order_by("-created_at")
#             except Exception:
#                 pass
#         field_map = {"id": "id", "subject": "subject", "status": "status", "created_at": "created_at", "details": "details"}
#         return self._serialize_simple_list(qs, field_map)

#     def get_documents(self, obj):
#         docs = getattr(obj, "documents", None) or EmployeeDocument.objects.none()
#         try:
#             qs = docs.all()
#         except Exception:
#             qs = docs
#         out = []
#         req = self._request()
#         for d in qs:
#             try:
#                 file_url = req.build_absolute_uri(d.file.url) if req else d.file.url
#             except Exception:
#                 file_url = getattr(d.file, "url", None) or str(getattr(d, "file", None))
#             out.append({
#                 "id": getattr(d, "id", None),
#                 "name": getattr(d, "name", None),
#                 "file": file_url,
#                 "uploaded_at": getattr(d, "uploaded_at", None),
#             })
#         return out

#     def to_representation(self, instance):
#         # return groups in the order you asked for
#         return {
#             "profile_picture": self.get_profile_picture(instance),
#             "personal_records": self.get_personal_records(instance),
#             "employee_details": self.get_employee_details(instance),
#             "account_details": self.get_account_details(instance),
#             "educational_details": self.get_educational_details(instance),
#             "professional_qualifications": self.get_professional_qualifications(instance),
#             "trainings": self.get_trainings(instance),
#             "career_progression": self.get_career_progression(instance),
#             "queries": self.get_queries(instance),
#             "documents": self.get_documents(instance),
#         }

# # nom_roll/serializers.py
# from rest_framework import serializers
# from django.apps import apps
# from .models import Personal, Employee, Department, EmployeeDocument, extract_digits, TopManagement

# # Keep DepartmentSerializer minimal
# class DepartmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Department
#         fields = ["id", "name", "code"]


# class PersonalSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Personal
#         exclude = ("user",)

#     def validate_date_of_birth(self, value):
#         from datetime import date
#         age = (date.today() - value).days // 365
#         if age < 18:
#             raise serializers.ValidationError("Staff must be at least 18 years old.")
#         return value


# class EmployeeDocumentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EmployeeDocument
#         fields = ['id', 'name', 'file', 'uploaded_at']


# class EmployeeSerializer(serializers.ModelSerializer):
#     department = DepartmentSerializer(read_only=True)
#     documents = EmployeeDocumentSerializer(many=True, read_only=True)
#     digits = serializers.SerializerMethodField()

#     class Meta:
#         model = Employee
#         exclude = ("user",)

#     def get_digits(self, obj):
#         return extract_digits(obj.file_number)

#     def validate_grade_level(self, value):
#         if value < 1 or value > 17:
#             raise serializers.ValidationError("Grade level must be between 1 and 17.")
#         return value


# class TopManagementSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TopManagement
#         fields = '__all__'


# # StaffCreateSerializer: builds personal, employee, account, educations, qualifications
# class StaffCreateSerializer(serializers.Serializer):
#     personal = PersonalSerializer()
#     employee = EmployeeSerializer()
#     account = serializers.DictField()   # we accept a dict for account (create it using fa.Account)
#     education = serializers.ListField(child=serializers.DictField(), required=False)
#     qualification = serializers.ListField(child=serializers.DictField(), required=False)

#     def create(self, validated_data):
#         # lazy import to avoid circular imports
#         Account = apps.get_model('fa', 'Account')
#         EduModel = apps.get_model('qualifications', 'EducationalQualification')
#         ProfModel = apps.get_model('qualifications', 'ProfessionalQualification')

#         personal_data = validated_data.get('personal', {})
#         employee_data = validated_data.get('employee', {})
#         account_data = validated_data.get('account', {})
#         education_data = validated_data.get('education', [])
#         qualification_data = validated_data.get('qualification', [])

#         # handle department nested dict if present
#         dept_data = employee_data.pop('department', None)
#         department = None
#         if isinstance(dept_data, dict):
#             department_obj, _ = Department.objects.get_or_create(**dept_data)
#             department = department_obj

#         # create personal
#         personal = Personal.objects.create(**personal_data)

#         # map mobile_number to personal instance for Employee creation
#         # employee_data should contain all Employee fields except mobile_number and department
#         employee = Employee.objects.create(mobile_number=personal, department=department, **employee_data)

#         # create account (Account.file_number is expected to be Employee)
#         account = Account.objects.create(file_number=employee, **account_data)

#         # create educational qualifications
#         educations = []
#         for e in education_data:
#             educations.append(EduModel.objects.create(employee=employee, **e))

#         qualifications = []
#         for q in qualification_data:
#             qualifications.append(ProfModel.objects.create(employee=employee, **q))

#         return {
#             "personal": personal,
#             "employee": employee,
#             "account": account,
#             "educations": educations,
#             "qualifications": qualifications,
#         }
