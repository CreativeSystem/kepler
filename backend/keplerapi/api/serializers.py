from rest_framework import serializers

from api.base import AuditedEntitySerializer
from api.models import File

class FileSerializer(serializers.Serializer):
    name = serializers.CharField(max_length = 50,required=True)
    originalName = serializers.CharField(max_length = 50,required=True)
    url = serializers.CharField(max_length = 255,required=True)
    
    def create(self):

        return File(**self.data).save()