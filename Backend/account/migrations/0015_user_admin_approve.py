# Generated by Django 5.1.1 on 2024-12-17 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0014_remove_product_main_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='admin_approve',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
