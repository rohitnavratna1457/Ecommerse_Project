from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password

# Define role choices
ROLE_CHOICES = (
    ('admin', 'Admin'),
    ('seller', 'Seller'),
    ('user', 'User'),
    # ('delivery', 'Delivery'),
)

# Define gender choices
GENDER_CHOICES = (
    ('male', 'Male'),
    ('female', 'Female'),
    ('other', 'Other'),
)

# Define review status choices
REVIEW_STATUS_CHOICES = (
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
)

class CustomUser(AbstractUser):
    """
    Extend the default Django User model to include roles and other fields.
    """
    id=models.AutoField(primary_key=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    review_status = models.CharField(max_length=10, choices=REVIEW_STATUS_CHOICES, default='pending')

    def __str__(self):
        return f" {self.role}"


class KYC(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE,limit_choices_to={'role': 'seller'} )
    name=models.CharField(max_length=30)
    aadhaar_number = models.CharField(max_length=12, blank=True, null=True)
    pan_number = models.CharField(max_length=10, blank=True, null=True)
    address_proof = models.FileField(upload_to='kyc/')
    verification_status = models.CharField(max_length=10, choices=REVIEW_STATUS_CHOICES, default='pending')
    submission_date = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return self.name 
    
    from django.db import models


# Seller_Signup
from django.db import models
from django.contrib.auth.hashers import make_password  # For password hashing

# Choices for Gender
GENDER_CHOICES = (
    ('male', 'Male'),
    ('female', 'Female'),
    ('other', 'Other'),
)

class Seller_Signup(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address=models.CharField(max_length=30)
    # brand_name = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=50)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='male')  # Assuming you want to add gender
    file = models.FileField(upload_to='uploads/seller_files/', blank=True, null=True)
    password = models.CharField(max_length=128)  # Store hashed passwords securely

class User_Signup(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address=models.CharField(max_length=30)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='male')  # Assuming you want to add gender
    password = models.CharField(max_length=128) 
    

