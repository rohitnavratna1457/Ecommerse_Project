# Generated by Django 5.1.3 on 2024-11-16 06:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Backend', '0006_seller_signup_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='seller_signup',
            name='address',
            field=models.CharField(default=1, max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='seller_signup',
            name='gender',
            field=models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], default='male', max_length=10),
        ),
    ]