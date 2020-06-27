from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.serializers import HireServiceSerializer
from api.models import HiredService
from api.base import DeactivateApiView,PersonGenericApiView

from rest_framework import filters
from django_filters import rest_framework as field_filters

class HireServiceFilter(field_filters.FilterSet):
    class Meta:
        model = HiredService
        fields = ["active"]

class HireServiceListCreateView(generics.ListCreateAPIView,PersonGenericApiView):
    queryset = HiredService.objects.all()
    serializer_class = HireServiceSerializer
    permission_classes = [IsAuthenticated]
    filterset_class = HireServiceFilter


class HireServiceRetriveDeactivateView(DeactivateApiView,generics.RetrieveAPIView):
    queryset = HiredService.objects.all()
    serializer_class = HireServiceSerializer
    permission_classes = [IsAuthenticated]

