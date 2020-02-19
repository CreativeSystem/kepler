from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.serializers import ServiceSerializer
from api.models import Service
from api.base import RetrieveUpdateDestroyAPIView, NumberInFilter, BaseFilter, FilterType

from rest_framework import filters
from django_filters import rest_framework as field_filters


class BaseServiceListFilter:
    id = FilterType.NUMBER
    name = FilterType.TEXT
    created_at = FilterType.DATE


class ServiceListFilter(field_filters.FilterSet):
    class Meta:
        model = Service
        fields = ["id"]


class ServiceListCreate(generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Service.objects.filter(active=true)
    serializer_class = ServiceSerializer
    filter_backends = [filters.OrderingFilter,
                       filters.SearchFilter, field_filters.DjangoFilterBackend]
    ordering_fields = "_all_"
    ordering = ["id"]
    search_fields = ["id", "name"]
    filterset_class = BaseFilter(BaseServiceFilter, ServiceFilter).to_class()
