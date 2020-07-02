from rest_framework import serializers,validators
from rest_framework.validators import UniqueTogetherValidator,UniqueValidator
from api.base import AuditedEntitySerializer,CurrentPersonDefault,PathVariableDefault
from api.models import Person, Service, HiredService, Interests, Region, File,ServiceImage
from api.validators import cpf_validator
from authapi.models import User


class CurrentPersonSerializer(serializers.ModelSerializer):
    person = serializers.RelatedField(default=CurrentPersonDefault(),write_only=True,queryset=Person.objects.all(), allow_null=False)

class PersonSerializer(AuditedEntitySerializer):
    user = serializers.PrimaryKeyRelatedField(default=serializers.CurrentUserDefault(),queryset=User.objects.all())
    class Meta:
        model = Person
        fields = "__all__"

class ServiceImageField(serializers.RelatedField):
     def to_representation(self, value):
         return value.image.url

     class Meta:
        model = File

class ServiceSerializer(AuditedEntitySerializer):
    service_image = ServiceImageField(many=True,read_only= True)
    class Meta:
        model = Service
        fields = ["id","title","description","to_match","price","service_image"]

class ServiceInfoSerializer(ServiceSerializer):
    class Meta:
        model = Service
        depth = 1
        fields = '__all__'

class HireServiceSerializer(AuditedEntitySerializer):
    person = serializers.RelatedField(
            default=CurrentPersonDefault(),
            write_only=True,
            queryset=Person.objects.all(), 
            allow_null=False)
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    class Meta:
        model = HiredService
        exclude = ('finished_at','accepted_at','rating')


class InterestsSerializer(serializers.ModelSerializer):
    person = serializers.RelatedField(default=CurrentPersonDefault(),write_only=True,queryset=Person.objects.all(), allow_null=False)
    
    class Meta:
        model = Interests
        fields = "__all__"
        validators=[
            UniqueTogetherValidator(
                queryset=Interests.objects.all(),
                fields=['person', 'interest']
            )
        ]
        

class RegionSerializer(AuditedEntitySerializer):
    class Meta:
        model = Region
        fields = "__all__"


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"

class ServiceImageSerializer(serializers.ModelSerializer):
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    image = serializers.PrimaryKeyRelatedField(queryset=File.objects.all(),validators=[UniqueValidator(queryset=ServiceImage.objects.all())])
    class Meta:
        model = ServiceImage
        fields = "__all__"

class PersonServiceSerializer(AuditedEntitySerializer,CurrentPersonSerializer):
    service_image = ServiceImageField(many=True,read_only= True)
    class Meta:
        model = Service
        fields = "__all__"


class HiredServiceSerilizer(AuditedEntitySerializer):
    service = ServiceInfoSerializer(read_only=True)
    class Meta:
        model = HiredService
        exclude=['person']