# from rest_framework import generics, permissions
# from .serializers import ProfileSerializer
# from nom_roll.models import User

# class ProfileDetailView(generics.RetrieveAPIView):
#     serializer_class = ProfileSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_object(self):
#         # If you want staff to see their own profile
#         return self.request.user
