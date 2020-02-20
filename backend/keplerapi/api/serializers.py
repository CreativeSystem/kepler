from rest_framework import serializers

from api.base import AuditedEntitySerializer
from api.models import Person, Service, HiredService, Interests, Region, File


class PersonSerializer(AuditedEntitySerializer):
    class Meta:
        model = Person
        fields = "__all__"


class ServiceSerializer(AuditedEntitySerializer):
    class Meta:
        model = Service
        fields = "__all__"


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
