from rest_framework import serializers
from django.contrib.auth.models import User
from django.db.transaction import atomic

from api.base import AuditedEntitySerializer
from api.models import Person, Service, HiredService, Interests, Region, File,ServiceImage
from api.base import CurrentUserDefault

class PersonSerializer(AuditedEntitySerializer):
    class Meta:
        model = Person
        fields = "__all__"

class UserInterestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interests
        fields = ["interest","other"]

class UserDataSerializer(AuditedEntitySerializer):
    interests = UserInterestsSerializer(many=True)
    class Meta:
        model = Person
        fields="__all__"

    def create(self, validated_data):
        person_interests = validated_data.pop("interests")
        person = Person.objects.create(**validated_data)
        for interests in person_interests:
            Interests.objects.create(person=person,**interests)
        return person

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
