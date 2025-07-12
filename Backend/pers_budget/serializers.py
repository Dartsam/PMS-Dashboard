from rest_framework import serializers
from .models import PersonnelBudget

class PersonnelBudgetSerializer(serializers.ModelSerializer):
    employee_file_number = serializers.CharField(source='employee.file_number', read_only=True)
    full_name = serializers.CharField(source='employee.mobile_number.user.get_full_name', read_only=True)
    state_of_origin = serializers.CharField(source='employee.mobile_number.state_of_origin', read_only=True)
    ippis_no = serializers.CharField(source='employee.mobile_number.ippis_account.ippis_no', read_only=True)
    dofa = serializers.DateField(source='employee.dofa', read_only=True)
    dolp = serializers.DateField(source='employee.dolp', read_only=True)

    class Meta:
        model = PersonnelBudget
        fields = [
            'id', 'employee_file_number', 'full_name', 'state_of_origin', 'ippis_no',
            'dofa', 'dolp',
            'new_designation', 'new_level', 'new_step', 'projected_annual_salary',
            'year', 'created_at'
        ]
        read_only_fields = [
            'new_designation', 'new_level', 'new_step', 'projected_annual_salary', 'created_at']