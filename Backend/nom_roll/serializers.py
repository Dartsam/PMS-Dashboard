from rest_framework import serializers
from django.db import transaction
from nom_roll.models import Personal, Employee, Department, TopManagement
from datetime import date
from fa.models import Account
from .models import Personal, Employee, Department
from qualifications.models import EducationalQualification, ProfessionalQualification
from fa.serializers import AccountSerializer
from qualifications.serializers import EducationalQualificationSerializer, ProfessionalQualificationSerializer

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

# EmployeeSerializer begins here
class EmployeeSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()

    class Meta:
        model = Employee
        exclude = ("user",)

    def validate_grade_level(self, value):
        if value < 1 or value > 17:
            raise serializers.ValidationError("Grade level must be between 1 and 17.")
        return value
# EmployeeSerializer ends here

# TopManagementSerializer begins here
class TopManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopManagement
        fields = '__all__'
# TopManagementSerializer ends here

# StaffCreateSerializer begins here
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


