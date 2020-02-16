from rest_framework import serializers

from api.base import AuditedEntitySerializer
from api.models import File

class FileSerializer(serializers.ModelSerializer):
   class Meta:
       model = File
       fields = "__all__"