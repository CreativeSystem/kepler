from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.serializers import FileSerializer
from api.models import File
from api.base import RetrieveUpdateDestroyAPIView, NumberInFilter, BaseFilter, FilterType

from rest_framework import filters
from django_filters import rest_framework as field_filters


class BaseFileFilter:
    id = FilterType.NUMBER
    name = FilterType.TEXT
    created_at = FilterType.DATE


class FileFilter(field_filters.FilterSet):
    class Meta:
        model = File
        fields = ['id']


class FileListCreate(generics.ListAPIView):
    queryset = File.objects.filter()
    serializer_class = FileSerializer
    #permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter,
                       filters.SearchFilter, field_filters.DjangoFilterBackend]
    ordering_fields = "__all__"
    ordering = ['id']
    search_fields = ["id", "name"]
    filterset_class = BaseFilter(
        BaseFileFilter, FileFilter).to_class()
