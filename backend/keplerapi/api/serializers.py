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

class UserInterestsField(serializers.SlugRelatedField):
    def get_queryset(self, queryset):

        return queryset.filter(id = 6)

class UserDataSerializer(AuditedEntitySerializer):
    interests = UserInterestsField(many=True,slug_field='interests')
    class Meta:
        model = Person
        fields=['updated_by','created_by','updated_at',
        'created_at','name','whatsapp','telephone','birth_date','interests']
    @atomic
    def create(self, validated_data):
        interests = validated_data.pop('interests')
        person_info = Person.objects.create(user=User.objects.get(id=1),**validated_data)
        Interests.objects.bulk_create([Interests(person = person_info, interests= interest) for interest in interests ])
        return person_info

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
