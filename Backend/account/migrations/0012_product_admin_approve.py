# Generated by Django 5.1.1 on 2024-12-16 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0011_sellerdetail_admin_approve'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='admin_approve',
            field=models.CharField(max_length=10, null=True),
        ),
    ]