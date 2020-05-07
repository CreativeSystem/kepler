from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
import secrets

class User(AbstractUser):
    username = models.CharField(blank=True, null=True,max_length= 100)
    email = models.EmailField(_('email address'), unique=True)
    forgot_password_token = models.CharField(max_length=32, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return "{}".format(self.email)

    def generate_forgot_password_token(self):
        return secrets.token_hex(nbytes=16)