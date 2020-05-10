from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.serializers import HiredServiceSerializer
from api.models import HiredService
from api.base import RetrieveUpdateDestroyAPIView, NumberInFilter, BaseFilter, FilterType

from rest_framework import filters
from django_filters import rest_framework as field_filters


class BaseHiredServiceFilter:
    id = FilterType.NUMBER
    name = FilterType.TEXT
    created_at = FilterType.DATE


class HiredServiceFilter(field_filters.FilterSet):
    class Meta:
        model = HiredService
        fields = ["id"]


class HiredServiceListCreate(generics.ListCreateAPIView):
    queryset = HiredService.objects.filter(active=True)
    serializer_class = HiredServiceSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter,
                       filters.SearchFilter, field_filters.DjangoFilterBackend]
    ordering_fields = "_all_"
    ordering = ["id"]
    search_fields = ["id", "name"]
    filterset_class = BaseFilter(
        BaseHiredServiceFilter, HiredServiceFilter).to_class()


class HiredServiceListRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = HiredService.objects.all()
    serializer_class = HiredServiceSerializer
    permission_classes = [IsAuthenticated]
