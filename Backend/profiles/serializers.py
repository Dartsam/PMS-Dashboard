# # from rest_framework import serializers
# # from .models import  (
# #     Profile, CareerDescending, LeaveDescending,
# #     QualificationsDescending, ProfessionalCertificate
# # )

# # class ProfileSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Profile
# #         fields = '__all__'


# # class CareerDescendingSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = CareerDescending
# #         fields = '__all__'


# # class LeaveDescendingSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = LeaveDescending
# #         fields = '__all__'


# # class QualificationsDescendingSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = QualificationsDescending
# #         fields = '__all__'


# # class ProfessionalCertificateSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = ProfessionalCertificate
# #         fields = '__all__'

# from rest_framework import serializers
# from nom_roll.models import User, Employee
# from fa.models import Account
# from qualifications.serializers import (
#     EducationalQualificationSerializer,
#     ProfessionalQualificationSerializer,
# )
# from promotion.serializers import PromotionSerializer
# from q_and_disc.serializers import QAndDiscSerializer


# class ProfileSerializer(serializers.ModelSerializer):
#     # Related tables
#     personal_records = serializers.SerializerMethodField()
#     employee_details = serializers.SerializerMethodField()
#     account_details = serializers.SerializerMethodField()
#     educational_details = EducationalQualificationSerializer(many=True, source="educationalqualification_set")
#     professional_qualifications = ProfessionalQualificationSerializer(many=True, source="professionalqualification_set")
#     career_progression = PromotionSerializer(many=True, source="promotion_set")
#     queries = QAndDiscSerializer(many=True, source="qanddisc_set")

#     class Meta:
#         model = User
#         fields = [
#             "profile_picture",
#             "id",
#             "username",
#             "email",
#             "personal_records",
#             "employee_details",
#             "account_details",
#             "educational_details",
#             "professional_qualifications",
#             "career_progression",
#             "queries",
#         ]

#     def get_personal_records(self, obj):
#         try:
#             return {
#                 "first_name": obj.first_name,
#                 "last_name": obj.last_name,
#                 "other_name": obj.other_name,
#                 "dob": obj.date_of_birth,
#                 "gender": obj.gender,
#                 "marital_status": obj.marital_status,
#             }
#         except:
#             return {}

#     def get_employee_details(self, obj):
#         try:
#             employee = Employee.objects.get(user=obj)
#             return {
#                 "file_number": employee.file_number,
#                 "department": employee.department.name if employee.department else None,
#                 "designation": employee.designation,
#                 "date_employed": employee.dofa,
#                 "status": employee.status,
#             }
#         except Employee.DoesNotExist:
#             return {}

#     def get_account_details(self, obj):
#         try:
#             employee = Account.objects.get(user=obj)
#             return {
#                 "bank_name": employee.paypoint,
#                 "account_number": employee.account_number,
#                 "pfa": employee.pfa_no,
#                 "rsa_pin": employee.ippis_no,
#             }
#         except Employee.DoesNotExist:
#             return {}
