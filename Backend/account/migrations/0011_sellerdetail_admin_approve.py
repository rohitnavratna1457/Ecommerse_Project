# Generated by Django 5.1.1 on 2024-12-16 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0010_remove_product_seller'),
    ]

    operations = [
        migrations.AddField(
            model_name='sellerdetail',
            name='admin_approve',
            field=models.CharField(max_length=10, null=True),
        ),
    ]