from rest_framework import serializers
from api.base import AuditedEntitySerializer
from api.models import Person, Service, HiredService, Interests, Region, File,ServiceImage

class CurrentPersonDefault:
    requires_context = True

    def __call__(self, serializer_field):
        try:
            person = Person.objects.get(user = serializer_field.context['request'].user)
            return person
        except:
            raise serializers.ValidationError("A pessoa não pode ser nula")
        
    def __repr__(self):
        return '%s()' % self.__class__.__name__

class CurrentPersonSerializer(serializers.ModelSerializer):
    person = serializers.RelatedField(default=CurrentPersonDefault(),write_only=True,queryset=Person.objects.all(), allow_null=False)

class PersonSerializer(AuditedEntitySerializer):
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

class ImageSerializer(serializers.ModelSerializer):
    id = serializers.Field()
    url = serializers.URLField(read_only=True)
    
    def to_internal_value(self,data):
        return File.objects.get(id=data["id"])

    def to_representation(self,value):
        return {
            "id": value.image.id,
            "url":value.image.url,
            "originalName": value.image.originalName
        }

    class Meta:
        model = File
        fields = ["id","url","originalName"]

class RegisterServiceSerializer(AuditedEntitySerializer,CurrentPersonSerializer):
    service_image = ImageSerializer(many=True)
    class Meta:
        model = Service
        fields = "__all__"

    def create(self, validated_data):
        images = validated_data.pop('service_image')
        if ServiceImage.objects.filter(image__in=images):
            raise serializers.ValidationError("As imagens já estão sendo utilizadas em outro serviço")
      
        service = Service.objects.create(**validated_data)

        for image in images:
            ServiceImage.objects.create(service=service,image=image)
        return service