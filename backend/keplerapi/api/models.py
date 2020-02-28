# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from api.base import AuditedEntity
from django.contrib.auth.models import User
from api.choices import InterestsChoices, RegionChoices, RatingChoices


class File(models.Model):
    name = models.CharField(max_length=50, null=False)
    originalName = models.CharField(max_length=50, null=False)
    url = models.URLField(null=False)

class Person(AuditedEntity):
    name = models.CharField(max_length=75)
    cpf = models.CharField(max_length=11, unique=True)
    whatsapp = models.CharField(max_length=11)
    telephone = models.CharField(max_length=10)
    birth_date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


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
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    interests = models.CharField(
        max_length=2, choices=InterestsChoices.choices)
    other = models.CharField(max_length=50)


class Region(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    region = models.CharField(max_length=21, choices=RegionChoices.choices)
