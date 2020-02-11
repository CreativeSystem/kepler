from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.serializers import ProductItemSerializer
from api.models import ProductItem
from api.base import RetrieveUpdateDestroyAPIView, NumberInFilter, BaseFilter, FilterType

from rest_framework import filters
from django_filters import rest_framework as field_filters


class BaseProductItemFilter:
    id = FilterType.NUMBER
    name = FilterType.TEXT
    created_at = FilterType.DATE


class ProductItemFilter(field_filters.FilterSet):
    class Meta:
        model = ProductItem
        fields = ['id']


class ProductItemListCreate(generics.ListCreateAPIView):
    queryset = ProductItem.objects.filter(active=True)
    serializer_class = ProductItemSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter,
                       filters.SearchFilter, field_filters.DjangoFilterBackend]
    ordering_fields = "__all__"
    ordering = ['id']
    search_fields = ["id", "name"]
    filterset_class = BaseFilter(
        BaseProductItemFilter, ProductItemFilter).to_class()


class ProductItemListRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = ProductItem.objects.all()
    serializer_class = ProductItemSerializer
    permission_classes = [IsAuthenticated]
