from django.utils.translation import gettext_lazy as _
from django.db import models


class InterestsChoices(models.TextChoices):
    EXEMPLO1 = 1, _("EXEMPLO1")
    EXEMPLO2 = 2, _("EXEMPLO2")
    EXEMPLO3 = 3, _("EXEMPLO3")


class RegionChoices(models.TextChoices):
    SP = "SP", _("são paulo")
    RJ = "RJ", _("rio de janeiro")
    SC = "SC", _("santa catarina")


class RatingChoices(models.IntegerChoices):
    1, 2, 3, 4, 5
