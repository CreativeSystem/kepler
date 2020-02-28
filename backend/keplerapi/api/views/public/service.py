from rest_framework import generics,filters
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as field_filters

from api.serializers import ServiceSerializer
from api.models import Service
from api.base import RetrieveUpdateDestroyAPIView, NumberInFilter, BaseFilter, FilterType


class BaseServiceListFilter:
    id = FilterType.NUMBER
    name = FilterType.TEXT
    created_at = FilterType.DATE


class ServiceListFilter(field_filters.FilterSet):
    class Meta:
        model = Service
        fields = ["id"]


class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.filter(active=True)
    serializer_class = ServiceSerializer
    filter_backends = [filters.OrderingFilter,
                       filters.SearchFilter, field_filters.DjangoFilterBackend]
    ordering_fields = "__all__"
    ordering = ["id"]
    search_fields = ["id", "name"]
    filterset_class = BaseFilter(BaseServiceListFilter, ServiceListFilter).to_class()

class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.filter(active=True)
    serializer_class = ServiceSerializer
    filter_backends = [filters.OrderingFilter,
                       filters.SearchFilter, field_filters.DjangoFilterBackend]
    ordering_fields = "__all__"
    ordering = ["id"]
    search_fields = ["id", "name"]
    filterset_class = BaseFilter(BaseServiceListFilter, ServiceListFilter).to_class()
