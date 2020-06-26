# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from authapi.models import User
from api.choices import InterestsChoices, RegionChoices, RatingChoices
from api.validators import cpf_validator


class AuditedEntity(models.Model):
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now)
    created_by = models.IntegerField(editable=False)
    updated_by = models.IntegerField()
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True

class File(models.Model):
    name = models.CharField(max_length=50, null=False)
    originalName = models.CharField(max_length=50, null=False)
    url = models.URLField(null=False)

class Person(AuditedEntity):
    name = models.CharField(max_length=75)
    cpf = models.CharField(max_length=11, unique=True,validators=[cpf_validator])
    whatsapp = models.CharField(max_length=11,null=True)
    telephone = models.CharField(max_length=11)
    birth_date = models.DateField()
    user = models.OneToOneField(User, on_delete=models.CASCADE,editable=False)


class Service(AuditedEntity):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    description = models.TextField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    to_match = models.BooleanField(default=False)
    facebook = models.URLField()
    instagram = models.URLField()
    twitter = models.URLField()

class ServiceImage(models.Model):
    image = models.OneToOneField(File,on_delete=models.CASCADE,related_name="image_service")
    service = models.ForeignKey(Service,on_delete=models.CASCADE,related_name="service_image")

class HiredService(AuditedEntity):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    rating = models.IntegerField(
        choices=RatingChoices.choices, blank=True, null=True,)


class Interests(models.Model):
    person = models.ForeignKey(Person,related_name="interests", on_delete=models.CASCADE)
    interest = models.CharField(
        max_length=2, choices=InterestsChoices.choices)
    other = models.CharField(max_length=50,null=True)


class Region(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    region = models.CharField(max_length=21, choices=RegionChoices.choices)
