from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models import Service
from api.serializers import RegisterServiceSerializer


class RegisterServiceView(generics.CreateAPIView):
    queryset = Service.objects.filter(active=True)
    serializer_class = RegisterServiceSerializer
    permission_classes = [IsAuthenticated]