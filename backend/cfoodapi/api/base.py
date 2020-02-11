from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from rest_framework import serializers, mixins, generics, pagination
from django_filters import BaseInFilter, NumberFilter, CharFilter, BaseRangeFilter, DateFilter
from django_filters import rest_framework as field_filters


class CurrentUserDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user.id

    def __repr__(self):
        return '%s()' % self.__class__.__name__


class AuditedEntitySerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        default=serializers.CreateOnlyDefault(timezone.now))
    updated_at = serializers.DateTimeField(default=timezone.now)
    created_by = serializers.IntegerField(
        default=serializers.CreateOnlyDefault(CurrentUserDefault()))
    updated_by = serializers.IntegerField(default=CurrentUserDefault())


class AuditedEntity(models.Model):
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now)
    created_by = models.IntegerField(editable=False)
    updated_by = models.IntegerField()
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class RetrieveUpdateDestroyAPIView(mixins.RetrieveModelMixin,
                                   mixins.UpdateModelMixin,
                                   mixins.DestroyModelMixin,
                                   generics.GenericAPIView):
    """
    Concrete view for retrieving, updating or deleting a model instance.
    """

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        request.data["active"] = False
        return self.partial_update(request, *args, **kwargs)


class NumberInFilter(BaseInFilter, NumberFilter):
    pass


class NumberRangeFilter(BaseRangeFilter, NumberFilter):
    pass


class CharInFilter(BaseInFilter, CharFilter):
    pass


class DateRangeFilter(BaseRangeFilter, DateFilter):
    pass


class FilterType:
    NUMBER = (
        {"lookup": "exact", "name": "%s", "filter": field_filters.NumberFilter},
        {"lookup": "in", "name": "%s_in", "filter": NumberInFilter},
        {"lookup": "gt", "name": "%s_gt", "filter": field_filters.NumberFilter},
        {"lookup": "gte", "name": "%s_gte", "filter": field_filters.NumberFilter},
        {"lookup": "lt", "name": "%s_lt", "filter": field_filters.NumberFilter},
        {"lookup": "lte", "name": "%s_lte", "filter": field_filters.NumberFilter},
        {"lookup": "range", "name": "%s_between", "filter": NumberRangeFilter}
    )
    TEXT = (
        {"lookup": "exact", "name": "%s", "filter": field_filters.CharFilter},
        {"lookup": "iexact", "name": "i%s", "filter": field_filters.CharFilter},
        {"lookup": "contains", "name": "%s_like",
            "filter": field_filters.CharFilter},
        {"lookup": "icontains", "name": "%s_ilike",
            "filter": field_filters.CharFilter},
        {"lookup": "in", "name": "%s_in", "filter": CharInFilter},
        {"lookup": "startswith", "name": "%s_start",
            "filter": field_filters.CharFilter},
        {"lookup": "istartswith", "name": "%s_istart",
            "filter": field_filters.CharFilter},
        {"lookup": "endswith", "name": "%s_end",
            "filter": field_filters.CharFilter},
        {"lookup": "iendswith", "name": "%s_iend",
            "filter": field_filters.CharFilter}
    )
    DATE = (
        {"lookup": "date", "name": "%s", "filter": field_filters.DateFilter},
        {"lookup": "date__gt", "name": "%s_gt",
            "filter": field_filters.DateFilter},
        {"lookup": "date__gte", "name": "%s_gte", "filter": field_filters.DateFilter},
        {"lookup": "date__lt", "name": "%s_lt", "filter": field_filters.DateFilter},
        {"lookup": "date__lte", "name": "%s_lte", "filter": field_filters.DateFilter},
        {"lookup": "date__range", "name": "%s_between", "filter": DateRangeFilter}
    )

    BOOOLEAN = ({"lookup": "exact", "name": "%s"})


class BaseFilter:

    FILTERS = {}

    def __init__(self, base_class, filter_class):
        self.base_class = base_class
        self.filter_class = filter_class

    def to_class(self):
        base = self.base_class()

        attributes = {}

        variables = [i for i in dir(base) if not i.startswith('__')]
        for v in variables:
            filters = getattr(base, v)
            for f in filters:
                name = f["name"] % v
                lookup = f["lookup"]
                Filter = f["filter"]

                attributes[name] = Filter(
                    field_name=v, lookup_expr=lookup)

        return type("Custom_%s" % base.__class__.__name__, (self.filter_class,), attributes)
