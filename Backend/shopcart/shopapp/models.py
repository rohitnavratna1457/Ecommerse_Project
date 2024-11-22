from django.db import models
from django.contrib.auth.hashers import make_password
# User model
class Users(models.Model):
    USER_TYPE_CHOICES = [
        ('admin', 'Admin'),
        ('seller', 'Seller'),
        ('customer', 'Customer'),
    ]

    name = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    address = models.TextField(blank=True, null=True)
    userid = models.AutoField(primary_key=True)
    password = models.CharField(max_length=128)  # Store hashed password
    status = models.CharField(max_length=10, choices=[('Active', 'Active'), ('Inactive', 'Inactive')], default='Active')
    usertype = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)

    def save(self, *args, **kwargs):
        """
        Override the save method to hash the password before saving the instance.
        """
        if self.pk is None or Users.objects.filter(pk=self.pk, password=self.password).count() == 0:
            # Only hash the password if it's a new user or the password has changed
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.name} ({self.usertype})"


# Seller model for seller-specific details
class Seller(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE, related_name='seller_profile')
    business_name = models.CharField(max_length=100)
    business_address = models.TextField()
    business_mobile = models.CharField(max_length=15)
    business_images = models.ManyToManyField('BusinessImage', blank=True)

    def __str__(self):
        return self.business_name


# Business Image model for storing seller's business images
class BusinessImage(models.Model):
    image = models.ImageField(upload_to='business_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image {self.id}"
