from rest_framework import serializers
from api.models import ProductItem

from api.base import AuditedEntitySerializer


class ProductItemSerializer(AuditedEntitySerializer):
    class Meta:
        model = ProductItem
        fields = "__all__"
