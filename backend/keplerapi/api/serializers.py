from rest_framework import serializers
from querybuilder.query import Query

from api.base import AuditedEntitySerializer
from api.models import Person, Service, HiredService, Interests, Region, File,ServiceImage


class PersonSerializer(AuditedEntitySerializer):
    class Meta:
        model = Person
        fields = "__all__"

class ServiceImageSerializer(serializers.RelatedField):
     def to_representation(self, value):
         return value.image.url

     class Meta:
        model = File

class ServiceSerializer(AuditedEntitySerializer):
    service_image = ServiceImageSerializer(many=True,read_only= True)
    class Meta:
        model = Service
        fields = ["id","title","description","to_match","price","service_image"]


class HiredServiceSerializer(AuditedEntitySerializer):
    class Meta:
        model = HiredService
        fields = "__all__"


class InterestsSerializer(AuditedEntitySerializer):
    class Meta:
        model = Interests
        fields = "__all__"


class RegionSerializer(AuditedEntitySerializer):
    class Meta:
        model = Region
        fields = "__all__"


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"
