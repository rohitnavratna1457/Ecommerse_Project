from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
from .managers import UserManager
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.utils.text import slugify
from django.utils import timezone
from datetime import datetime
from django.utils.timezone import now
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
    admin_approve = models.CharField(max_length=10,null=True)


    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'mobile_no']

    def __str__(self):
        return self.name

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
     email = models.EmailField(unique=True)
     bussiness_name=models.CharField(max_length=100)
     bussiness_address=models.TextField()
     image=models.FileField(upload_to="seller_details",blank=True)
     bussiness_mobile_no=models.CharField(max_length=10)
     admin_approve = models.CharField(max_length=10,null=True)
  
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
    # seller = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'Seller'})
    product_name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(max_length=100, blank=True)
    product_description = models.TextField(max_length=100, blank=True)
    status = models.CharField(max_length=50, default="Active")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Category Relationships
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE,null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')


    # Brand and Model
    brand = models.CharField(max_length=100, null=True, blank=True)
    model_number = models.CharField(max_length=100, null=True, blank=True)

    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0,null=True)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discount_percentage = models.FloatField(null=True, blank=True)

    # Inventory
    quantity = models.PositiveIntegerField(default=0)
    inventory_status = models.CharField(max_length=50, default="In Stock")
    low_stock_alert = models.BooleanField(default=False)

    # Shipping
    is_physical = models.BooleanField(default=True)
    weight = models.FloatField(null=True, blank=True)
    weight_unit = models.CharField(max_length=10, default="kg")
    dimensions = models.CharField(max_length=100, null=True, blank=True)
    requires_shipping = models.BooleanField(default=True)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    # Media
    # main_image = models.ImageField(upload_to="products/images/")

    # Attributes
    color = models.CharField(max_length=50, null=True, blank=True)
    size = models.CharField(max_length=50, null=True, blank=True)
    features = models.TextField(null=True, blank=True)

    # Ratings and Reviews
    rating = models.FloatField(default=0.0)
    review_count = models.PositiveIntegerField(default=0)

    # Policies
    return_policy = models.TextField(null=True, blank=True)
    warranty = models.TextField(null=True, blank=True)
    admin_approve = models.CharField(max_length=20,default='admin_request')


    def __str__(self):
        return self.product_name

    def save(self, *args, **kwargs):
        # Debugging logs
        print(f"Saving product: {self.product_name}")
        if not self.slug and self.product_name:
            self.slug = slugify(self.product_name)

        super().save(*args, **kwargs)
        
        #####
class Product_Listing(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    approval_status = models.CharField(
        max_length=10,
        choices=(
            ("Pending", "Pending"),
            ("Approved", "Approved"),
            ("Rejected", "Rejected"),
        ),
        default="Pending",
    )
    rejection_reason = models.TextField(blank=True, null=True)
    approval_date = models.DateTimeField(blank=True, null=True)

    def approve(self):
        self.approval_status = "Approved"
        self.approval_date = now()
        self.save()

    def reject(self, reason):
        self.approval_status = "Rejected"
        self.rejection_reason = reason
        self.approval_date = now()
        self.save()

    def __str__(self):
        return f"{self.product.name} - {self.approval_status}"


class SellerProfileVerify(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'Seller'})
    verification_status = models.CharField(
        max_length=10,
        choices=(
            ("Pending", "Pending"),
            ("Approved", "Approved"),
            ("Rejected", "Rejected"),
        ),
        default="Pending",
    )
    rejection_reason = models.TextField(blank=True, null=True)
    verification_date = models.DateTimeField(blank=True, null=True)

    def approve(self):
        self.verification_status = "Approved"
        self.verification_date = now()
        self.save()

    def reject(self, reason):
        self.verification_status = "Rejected"
        self.rejection_reason = reason
        self.verification_date = now()
        self.save()

    def __str__(self):
        return f"{self.user.name} - {self.verification_status}"