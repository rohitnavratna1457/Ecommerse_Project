from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
from .managers import UserManager
from django.conf import settings
from django.contrib.auth.hashers import make_password

 # Abstact User using to RestFramework 
class User(AbstractBaseUser):
    USER_TYPES = (
        ("SuperAdmin", "SuperAdmin"),
        ("Admin", "Admin"),
        ("Seller", "Seller"),
        ("Customer", "Customer"),
    )

    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(verbose_name='Email', max_length=255, unique=True)
    name = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=10)
    user_type = models.CharField(max_length=255, choices=USER_TYPES, null=False)
    is_status = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  # Superuser flag
    address = models.TextField()

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'mobile_no']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        """
        Does the user have a specific permission?
        """
        return self.is_admin

    def has_module_perms(self, app_label):
        """
        Does the user have permissions to view the app `app_label`?
        """
        return True

    @property
    def is_staff(self):
        """
        Is the user a member of staff?
        """
        return self.is_admin

    def save(self, *args, **kwargs):
        # Ensure password is hashed before saving
        if self.password and not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
    
# Seller extra details()
class SellerDetail(models.Model):
     seller_id=models.ForeignKey(User,on_delete=models.CASCADE)
     bussiness_name=models.CharField(max_length=100)
     bussiness_address=models.TextField()
     image=models.FileField(upload_to="seller_details",blank=True)
     bussiness_mobile_no=models.CharField(max_length=10)
  
     def __str__(self):
        return self.bussiness_name
  
# Table Category 
class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=255)
    is_status=models.BooleanField()
    slug=models.SlugField()
 
    def __str__(self):
        return self.category_name
    
#Table Sub Categoreis 
class SubCategory(models.Model):
    subcategory_id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name=models.CharField(max_length=50)
    is_status=models.BooleanField()
    slug=models.SlugField()
    
    def __str__(self):
        return self.name
    
# Table Product 
class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=255)
    product_description = models.TextField()
    status = models.BooleanField()
    created_date = models.DateTimeField(auto_now=True)
    updated_date = models.DateTimeField(auto_now=True)
    
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    # Correct __str__ method
    def __str__(self):
        return self.product_name

    
    
    
