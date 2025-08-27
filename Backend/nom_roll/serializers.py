from rest_framework import serializers
from django.db import transaction
from nom_roll.models import Personal, Employee, Department, TopManagement
from datetime import date
from fa.models import Account, Pension
from qualifications.models import EducationalQualification, ProfessionalQualification
from fa.serializers import AccountSerializer, PensionSerializer
from qualifications.serializers import EducationalQualificationSerializer, ProfessionalQualificationSerializer


# PersonalSerializer is used to serialize the Personal model. It begins here
class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal
        fields = '__all__'
# PersonalSerializer ends here

# EmployeeSerializer is used to serialize the Employee model. It begins here
class EmployeeSerializer(serializers.ModelSerializer):
    personal = PersonalSerializer(source='mobile_number', read_only=True)
    class Meta:
        model = Employee
        fields = '__all__'
# EmployeeSerializer ends here

# DepartmentSerializer is used to serialize the Department model. It begins 
# here
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'
# DepartmentSerializer ends here

class TopManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopManagement
        fields = '__all__'


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

class StaffCreateSerializer(serializers.Serializer):
    # Department
    department = DepartmentSerializer()

    # Personal
    personal = PersonalSerializer()

    # Employee
    employee = EmployeeSerializer()

    # Account
    account = AccountSerializer()

    # Qualifications
    educations = EducationalQualificationSerializer(many=True, required=False)
    qualifications = ProfessionalQualificationSerializer(many=True, required=False)

    @transaction.atomic
    def create(self, validated_data):
        # Extract nested objects
        department_data = validated_data.pop("department")
        personal_data = validated_data.pop("personal")
        employee_data = validated_data.pop("employee")
        account_data = validated_data.pop("account")
        educations_data = validated_data.pop("educations", [])
        qualifications_data = validated_data.pop("qualifications", [])

        # Department
        department, _ = Department.objects.get_or_create(**department_data)

        # Personal
        personal = Personal.objects.create(**personal_data)

        # Employee (attach Department + Personal)
        employee = Employee.objects.create(
            department=department,
            mobile_number=personal,
            **employee_data
        )

        # Account (attach Employee)
        account = Account.objects.create(
            file_number=employee,
            **account_data
        )

        # Education
        for edu in educations_data:
            EducationalQualification.objects.create(**edu)

        # Professional Qualifications
        for qual in qualifications_data:
            ProfessionalQualification.objects.create(**qual)

        return employee

#  serializers play a crucial role in converting complex data 
# (like Django model instances) to native Python datatypes that can then be 
# easily rendered into JSON, XML, or other content types — and vice versa.

# from rest_framework import serializers
# from .models import Personal, Employee, Department, TopManagement
# from datetime import date
# from fa.models import Account

# class PersonalSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Personal
#         fields = '__all__'

# class EmployeeSerializer(serializers.ModelSerializer):
#     personal = PersonalSerializer(source='mobile_number', read_only=True)
#     class Meta:
#         model = Employee
#         fields = '__all__'

# class DepartmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Department
#         fields = '__all__'

# class TopManagementSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TopManagement
#         fields = '__all__'


# class NominalRollSerializer(serializers.ModelSerializer):
#     f_name = serializers.CharField(source='mobile_number.first_name')
#     l_name = serializers.CharField(source='mobile_number.last_name')

#     # Dropdown for state_of_origin
#     state_of_origin = serializers.ChoiceField(
#         choices=Personal.STATE_CHOICES
#     )

#     date_of_birth = serializers.DateField(source='mobile_number.date_of_birth')
#     age_at_appointment = serializers.SerializerMethodField()
#     years_left_until_retirement = serializers.SerializerMethodField()

#     file_number = serializers.CharField()
#     ippis_number = serializers.CharField(source='account.ippis_no')
#     dofa = serializers.DateField()
#     unit = serializers.CharField(source='department.name')
#     designation = serializers.CharField()

#     # Dropdown for salary_structure
#     salary_structure = serializers.ChoiceField(
#         choices=Employee._meta.get_field('salary_structure').choices
#     )

#     # Dropdown for status
#     status = serializers.ChoiceField(
#         choices=Employee.STATUS_CHOICES
#     )

#     # Dropdown for employment_type
#     employment_type = serializers.ChoiceField(
#         choices=Employee.EMPLOYEE_TYPE_CHOICES
#     )

#     grade_level = serializers.IntegerField()
#     step = serializers.IntegerField()
#     dolp = serializers.DateField()
#     edor = serializers.DateField()

#     class Meta:
#         model = Employee
#         fields = [
#             'f_name', 'l_name', 'state_of_origin', 'date_of_birth',
#             'age_at_appointment', 'years_left_until_retirement',
#             'file_number', 'ippis_number', 'dofa', 'unit', 'designation',
#             'salary_structure', 'status', 'employment_type',
#             'grade_level', 'step', 'dolp', 'edor'
#         ]

#     def create(self, validated_data):
#         # Extract nested data
#         state_of_origin = validated_data.pop('state_of_origin', None)
#         account_data = validated_data.pop('account', {})
#         department_data = validated_data.pop('department', {})
#         personal_data = {
#             'state_of_origin': state_of_origin,
#             'date_of_birth': validated_data.pop('mobile_number')['date_of_birth']
#         }

#         # Create related objects
#         personal = Personal.objects.create(**personal_data)
#         account = Account.objects.create(**account_data)
#         department = Department.objects.create(**department_data)

#         # Create employee
#         return Employee.objects.create(
#             mobile_number=personal,
#             account=account,
#             department=department,
#             **validated_data
#         )

#     def update(self, instance, validated_data):
#         # Update Personal
#         state_of_origin = validated_data.pop('state_of_origin', None)
#         if state_of_origin:
#             instance.mobile_number.state_of_origin = state_of_origin
#             instance.mobile_number.save()

#         # Update Account
#         account_data = validated_data.pop('account', None)
#         if account_data:
#             for attr, value in account_data.items():
#                 setattr(instance.account, attr, value)
#             instance.account.save()

#         # Update Department
#         department_data = validated_data.pop('department', None)
#         if department_data:
#             for attr, value in department_data.items():
#                 setattr(instance.department, attr, value)
#             instance.department.save()

#         return super().update(instance, validated_data)

#     def get_age_at_appointment(self, obj):
#         dob = obj.mobile_number.date_of_birth
#         return obj.dofa.year - dob.year - (
#             (obj.dofa.month, obj.dofa.day) < (dob.month, dob.day)
#         )

#     def get_years_left_until_retirement(self, obj):
#         today = date.today()
#         return obj.edor.year - today.year - (
#             (obj.edor.month, obj.edor.day) < (today.month, today.day)
#         )

