from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import (
    Account, SalaryStructure, StandardDeduction,
    Pension, Allowance
)
from .serializers import (
    AccountSerializer, SalaryStructureSerializer,
    StandardDeductionSerializer, PensionSerializer,
    AllowanceSerializer
)

# Import ends


# Optional: add IsAuthenticated to all ViewSets if your API is secured
class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.select_related('file_number', 'pfa_no').all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]


class SalaryStructureViewSet(viewsets.ModelViewSet):
    queryset = SalaryStructure.objects.all()
    serializer_class = SalaryStructureSerializer
    permission_classes = [IsAuthenticated]


class StandardDeductionViewSet(viewsets.ModelViewSet):
    queryset = StandardDeduction.objects.select_related('ippis_account__file_number').all()
    serializer_class = StandardDeductionSerializer
    permission_classes = [IsAuthenticated]


class PensionViewSet(viewsets.ModelViewSet):
    queryset = Pension.objects.all()
    serializer_class = PensionSerializer
    permission_classes = [IsAuthenticated]


class AllowanceViewSet(viewsets.ModelViewSet):
    queryset = Allowance.objects.select_related('employee').all()
    serializer_class = AllowanceSerializer
    permission_classes = [IsAuthenticated]
