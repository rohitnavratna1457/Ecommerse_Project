# Generated by Django 5.1.1 on 2024-12-16 17:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0013_alter_product_admin_approve'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='main_image',
        ),
    ]
