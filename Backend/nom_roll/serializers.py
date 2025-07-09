from rest_framework import serializers
from .models import Personal, Employee, Department

#  serializers play a crucial role in converting complex data 
# (like Django model instances) to native Python datatypes that can then be 
# easily rendered into JSON, XML, or other content types — and vice versa.

# PersonalSerializer is used to serialize the Personal model. It begins here
class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal
        fields = ('user', 'first_name', 'last_name', 'email', 'mobile_number',
        'home_address', 'gender', 'date_of_birth', 'updated_at')
# PersonalSerializer ends here

# EmployeeSerializer is used to serialize the Employee model. It begins here
class EmployeeSerializer(serializers.ModelSerializer):
    personal = PersonalSerializer(source='file_number', read_only=True)
    class Meta:
        model = Employee
        fields = ('file_number', 'designation', 'conhess', 'employment_type', 
                  'step', 'dofa', 'dolp', 'edor', 'status', 'department', 
                  'office_email', 'personal', 'mobile_number')
# EmployeeSerializer ends here

# DepartmentSerializer is used to serialize the Department model. It begins 
# here
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('name', 'id')
# DepartmentSerializer ends here