from rest_framework import serializers
from .models import Personal, Employee, Department, TopManagement

#  serializers play a crucial role in converting complex data 
# (like Django model instances) to native Python datatypes that can then be 
# easily rendered into JSON, XML, or other content types — and vice versa.

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
