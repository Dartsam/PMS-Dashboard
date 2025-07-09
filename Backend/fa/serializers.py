# fa/serializers.py
from rest_framework import serializers
from .models import (
    Account, SalaryStructure, StandardDeduction, 
    Pension, Allowance
)
from nom_roll.serializers import EmployeeSerializer

# PensionSerializer begins here
class PensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pension
        fields = '__all__'
# PensionSerializer ends here

# AccountSerializer begins here
class AccountSerializer(serializers.ModelSerializer):
    file_number = EmployeeSerializer(read_only=True)
    pfa_no = PensionSerializer(read_only=True)

    class Meta:
        model = Account
        fields = '__all__'
# AccountSerializer ends here



#SalaryStructureSerializer begins here 
class SalaryStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalaryStructure
        fields = '__all__'
# SalaryStructureSerializer ends here

# StandardDeductionSerializer begins here
class StandardDeductionSerializer(serializers.ModelSerializer):
    ippis_account = AccountSerializer(read_only=True)
    salary = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    nhis_amount = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    tax_amount = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    nhf_amount = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    pension_amount = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    total_deductions = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    net_salary = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = StandardDeduction
        fields = '__all__'
# StandardDeductionSerializer ends here

# AllowanceSerializer begins here 
class AllowanceSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    salary = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    hazard_allowance = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    teaching_allowance = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    shift_allowance = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    clinical_allowance = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    call_duty_allowance = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    specialist_allowance = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    total_allowance = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = Allowance
        fields = '__all__'
# AllowanceSerializer ends here