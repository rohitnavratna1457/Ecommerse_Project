# Generated by Django 5.1.1 on 2024-11-18 10:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Backend', '0015_remove_product_inventory_management_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='video_url',
        ),
    ]
