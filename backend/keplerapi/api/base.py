from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from rest_framework import serializers, mixins, generics, pagination,status
from django_filters import BaseInFilter, NumberFilter, CharFilter, BaseRangeFilter, DateFilter
from django_filters import rest_framework as field_filters

from rest_framework.response import Response

from api.models import Person

class BaseDefaultSerializer:
    requires_context = True
    def __call__(self, serializer_field):
       raise NotImplementedError('`__call__()` must be implemented.')

    def get_current_user(self,request):
        return request.user

    def get_request(self,serializer_field):
        return serializer_field.context['request']

    def __repr__(self):
        return '%s()' % self.__class__.__name__

class PathVariableDefault(BaseDefaultSerializer):
    
    def __call__(self, serializer_field):
        request = self.get_request(serializer_field)


class CurrentPersonDefault(BaseDefaultSerializer):

    def __call__(self, serializer_field):
        request = self.get_request(serializer_field)
        try:
            person = Person.objects.get(user = self.get_current_user(request))
            return person
        except:
            raise serializers.ValidationError("A pessoa não pode ser nula")


class CurrentPersonSerializer(serializers.ModelSerializer):
    person = serializers.RelatedField(default=CurrentPersonDefault(),write_only=True,queryset=Person.objects.all(), allow_null=False)

class CurrentUserDefault(BaseDefaultSerializer):
    def __call__(self, serializer_field):
        request = self.get_request(serializer_field)

        return self.get_current_user(request).id

class AuditedEntitySerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        default=serializers.CreateOnlyDefault(timezone.now),write_only=True)
    updated_at = serializers.DateTimeField(default=timezone.now,write_only=True)
    created_by = serializers.IntegerField(
        default=serializers.CreateOnlyDefault(CurrentUserDefault()),write_only=True)
    updated_by = serializers.IntegerField(default=CurrentUserDefault(),write_only=True)

class PathVariableMixin:
    path_vars = None

    def get_data(self,request_data, **kwargs):
        data = self.get_kwargs_data(kwargs)

        if request_data:
            return {**request_data, **data}

    def get_kwargs_data(self,kwargs):
        if self.path_vars and kwargs:
            kwargs_data ={}
            for path_var in self.path_vars:
                kwargs_data[path_var] = kwargs.get(path_var,None)
            return kwargs_data
        return kwargs

class PathCreateApiView(generics.CreateAPIView,PathVariableMixin):
    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=self.get_data(request_data=request.data,**kwargs))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class PersonGenericApiView(generics.GenericAPIView):

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(person = Person.objects.get(user = self.request.user))

class DeactivateApiView(mixins.UpdateModelMixin,mixins.DestroyModelMixin,generics.GenericAPIView):
    def delete(self, request, *args, **kwargs):
        request.data["active"] = False
        self.partial_update(request, *args, **kwargs)
        return Response(status=status.HTTP_204_NO_CONTENT)


class RetrieveUpdateDestroyAPIView(mixins.RetrieveModelMixin,
                                   mixins.UpdateModelMixin,
                                   mixins.DestroyModelMixin,
                                   generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        request.data["active"] = False
        self.partial_update(request, *args, **kwargs)
        return Response(status=status.HTTP_204_NO_CONTENT)


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
        {"lookup": "date__gte", "name": "%s_gte",
            "filter": field_filters.DateFilter},
        {"lookup": "date__lt", "name": "%s_lt",
            "filter": field_filters.DateFilter},
        {"lookup": "date__lte", "name": "%s_lte",
            "filter": field_filters.DateFilter},
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
