# Generated by Django 5.1.1 on 2024-12-12 16:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_rename_approval_status_user_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='status',
        ),
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(choices=[('SuperAdmin', 'SuperAdmin'), ('Admin', 'Admin'), ('Seller', 'Seller'), ('Customer', 'Customer')], max_length=255),
        ),
        migrations.CreateModel(
            name='SellerProfileVerify',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('verification_status', models.CharField(choices=[('Pending', 'Pending'), ('Verified', 'Verified'), ('Rejected', 'Rejected')], default='Pending', max_length=10)),
                ('verification_date', models.DateTimeField(auto_now_add=True)),
                ('rejection_reason', models.TextField(blank=True, null=True)),
                ('user', models.OneToOneField(limit_choices_to={'user_type': 'Seller'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ProductVerify',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=255)),
                ('product_description', models.TextField()),
                ('is_verified', models.BooleanField(default=False)),
                ('verification_date', models.DateTimeField(blank=True, null=True)),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='account.sellerprofileverify')),
            ],
        ),
    ]
