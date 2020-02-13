# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from api.base import AuditedEntity


class ProductItem(AuditedEntity):
    name = models.CharField(max_length=20)
