# Generated by Django 5.1.3 on 2024-11-16 06:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Backend', '0007_seller_signup_address_seller_signup_gender'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seller_signup',
            name='brand_name',
        ),
    ]
