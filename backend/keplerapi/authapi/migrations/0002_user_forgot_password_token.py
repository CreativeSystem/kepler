# Generated by Django 3.0.3 on 2020-05-05 02:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='forgot_password_token',
            field=models.CharField(max_length=32, null=True),
        ),
    ]