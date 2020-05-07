from authapi.models import User
from rest_framework import serializers as sz
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import JSONWebTokenSerializer

class ProfileSerializer(sz.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')

class UserSerializer(sz.ModelSerializer):
    password = sz.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('email', 'password')

class ForgotPasswordSerializer(sz.Serializer):
    email = sz.EmailField()

class ResetPasswordSeriliazer(sz.Serializer):
    token = sz.CharField(max_length = 32)
    password = sz.CharField(max_length = 100)
    password_confirmed = sz.CharField(max_length = 100)