# Generated by Django 5.1.1 on 2024-12-12 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_user_approval_status_user_user_type1'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='user_type1',
        ),
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(choices=[('SuperAdmin', 'SuperAdmin'), ('Admin', 'Admin'), ('Seller', 'Seller'), ('Customer', 'Customer')], max_length=20),
        ),
    ]
