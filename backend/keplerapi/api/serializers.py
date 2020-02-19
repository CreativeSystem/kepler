from rest_framework import serializers

from api.base import AuditedEntitySerializer
from api.models import Person, Service, HiredService, Interests, Region, File

<<<<<<< HEAD
class FileSerializer(serializers.ModelSerializer):
   class Meta:
       model = File
       fields = "__all__"
=======

class PersonSerializer(AuditedEntitySerializer):
    class Meta:
        model = Person
        fields = "_all_"


class ServiceSerializer(AuditedEntitySerializer):
    class Meta:
        model = Service
        fields = "_all_"


class HiredServiceSerializer(AuditedEntitySerializer):
    class Meta:
        model = HiredService
        fields = "_all_"


class InterestsSerializer(AuditedEntitySerializer):
    class Meta:
        model = Interests
        fields = "_all_"


class RegionSerializer(AuditedEntitySerializer):
    class Meta:
        model = Region
        fields = "_all_"


class FileSerializer(AuditedEntitySerializer):
    class Meta:
        model = File
        fields = "_all_"
>>>>>>> ad5e2989b5917df843bb75f2d21d4a227d9f426b
