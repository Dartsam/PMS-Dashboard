from rest_framework import serializers
from .models import Archive
from fa.serializers import AccountSerializer

class ArchiveSerializer(serializers.ModelSerializer):
    ippis_no = AccountSerializer(read_only=True)

    class Meta:
        model = Archive
        fields = '__all__'