# Generated by Django 5.0 on 2024-12-08 04:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_user_is_superuser'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subcategory',
            old_name='category_id',
            new_name='category',
        ),
    ]