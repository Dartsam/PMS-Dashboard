from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Case, When, Value, IntegerField
# from rest_framework.decorators import action
from .models import Personal, Employee, Department, TopManagement, EmployeeDocument
from .serializers import (PersonalSerializer, EmployeeSerializer, 
                          DepartmentSerializer, TopManagementSerializer, 
                          NominalRollSerializer, StaffCreateSerializer, ProfileSerializer, EmployeeDocumentSerializer)
import re
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView


class EmployeeByDigitsDetail(generics.RetrieveAPIView):
    serializer_class = EmployeeSerializer
    lookup_field = "file_number"

    def get_queryset(self):
        return Employee.objects.all()

    def get_object(self):
        digits = self.kwargs.get("digits")
        try:
            return Employee.objects.get(file_number__regex=rf"\D*{digits}\D*")
        except Employee.DoesNotExist:
            return None

    def get(self, request, *args, **kwargs):
        employee = self.get_object()
        if not employee:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(employee)
        return Response(serializer.data)
    
class EmployeeProfileAPIView(APIView):
    permission_classes = [AllowAny]     # Test purpose; change to IsAuthenticated in production

    def get(self, request, digits, format=None):
        # find first employee where file_number contains the digits
        qs = Employee.objects.filter(file_number__regex=rf"\D*{re.escape(digits)}\D*")
        employee = qs.first()
        if not employee:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(employee, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class ProfileDetailView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # If you want staff to see their own profile
        return self.request.user

class StaffCreateView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = StaffCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

class PersonalViewset(viewsets.ModelViewSet):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer
    permission_classes = [permissions.AllowAny]

class EmployeeViewset(viewsets.ModelViewSet):
    queryset = Employee.objects.all()  # DRF needs this for basename
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Employee.objects.annotate(
            salary_order=Case(
                When(salary_structure="CONTOPSAL", then=Value(1)),
                When(salary_structure="CONMESS", then=Value(2)),
                When(salary_structure="CONHESS", then=Value(3)),
                default=Value(4),
                output_field=IntegerField(),
            )
        ).order_by("salary_order", "-grade_level", "-step", "dolp", "file_number")


class EmployeeDocumentViewset(viewsets.ModelViewSet):
    queryset = EmployeeDocument.objects.all().order_by('-uploaded_at')
    serializer_class = EmployeeDocumentSerializer
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

class NominalRollViewset(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = NominalRollSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return (
            self.queryset
            .filter(status="active")
            .annotate(
                salary_order=Case(
                    When(salary_structure="CONTOPSAL", then=Value(1)),
                    When(salary_structure="CONMESS", then=Value(2)),
                    When(salary_structure="CONHESS", then=Value(3)),
                    default=Value(4),
                    output_field=IntegerField(),
                )
            )
            .order_by(
                "salary_order",   # custom priority
                "-grade_level",   # descending
                "-step",          # descending
                "dolp",           # ascending
                "file_number"     # ascending
            )
        )