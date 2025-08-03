from rest_framework import viewsets, permissions
from rest_framework.response import Response
# from rest_framework.decorators import action
from .models import Personal, Employee, Department, TopManagement
from .serializers import PersonalSerializer, EmployeeSerializer, DepartmentSerializer, TopManagementSerializer

class PersonalViewset(viewsets.ModelViewSet):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer
    permission_classes = [permissions.AllowAny]

class EmployeeViewset(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.AllowAny]

class DepartmentViewset(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.AllowAny]

class TopManagementViewset(viewsets.ModelViewSet):
    queryset = TopManagement.objects.all()
    serializer_class = TopManagementSerializer
    permission_classes = [permissions.AllowAny]
    # def list(self, request):
    #     queryset = self.queryset
    #     serializer = self.serializer_class(queryset, many=True)
    #     return Response(serializer.data)
