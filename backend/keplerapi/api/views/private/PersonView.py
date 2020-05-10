from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.serializers import PersonSerializer
from api.models import Person
from api.base import RetrieveUpdateDestroyAPIView, NumberInFilter, BaseFilter, FilterType

from rest_framework import filters
from django_filters import rest_framework as field_filters


class BasePersonFilter:
    id = FilterType.NUMBER
    name = FilterType.TEXT
    created_at = FilterType.DATE


class PersonFilter(field_filters.FilterSet):
    class Meta:
        model = Person
        fields = ["id"]


class PersonListCreate(generics.ListCreateAPIView):
    queryset = Person.objects.filter(active=True)
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter,
                       filters.SearchFilter, field_filters.DjangoFilterBackend]
    ordering_fields = "_all_"
    ordering = ["id"]
    search_fields = ["id", "name"]
    filterset_class = BaseFilter(BasePersonFilter, PersonFilter).to_class()


class PersonListRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticated]
