from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from django.utils.text import slugify
# Define role choices
ROLE_CHOICES = (
    ('admin', 'Admin'),
    ('seller', 'Seller'),
    ('user', 'User'),
    ('delivery', 'Delivery'),
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
# from django.db import models
# from django.contrib.auth.hashers import make_password  # For password hashing

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


    # def save(self, *args, **kwargs):
    #     # Hash the password only if it's not already hashed
    #     if self.pk:  # Check if the object exists in the database
    #         original = Seller_Signup.objects.get(pk=self.pk)
    #         if self.password != original.password:  # Hash only if password has changed
    #             self.password = make_password(self.password)
    #     else:
    #         self.password = make_password(self.password)
    #     super(Seller_Signup, self).save(*args, **kwargs)

def __str__(self):
        return self.name
    

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs) 
    def __str__(self):
        return self.name    
# import pdb
class Product(models.Model):
    # pdb.set_trace
#     # Basic Information
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    brand = models.CharField(max_length=100, null=True, blank=True)
    model_number = models.CharField(max_length=100, null=True, blank=True)

    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discount_percentage = models.FloatField(null=True, blank=True)
    # tax = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    # Inventory
    quantity = models.PositiveIntegerField(default=0)
    inventory_status = models.CharField(max_length=50, default="In Stock")
    low_stock_alert = models.BooleanField(default=False)
    # inventory_management = models.CharField(max_length=50, default="")

    # Shipping
    is_physical = models.BooleanField(default=True)
    weight = models.FloatField(null=True, blank=True)
    weight_unit = models.CharField(max_length=10, default="kg")
    dimensions = models.CharField(max_length=100, null=True, blank=True)
    requires_shipping = models.BooleanField(default=True)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    # Media
    main_image = models.ImageField(upload_to="products/images/")
    # video_url = models.URLField(null=True, blank=True)

    # Attributes
    color = models.CharField(max_length=50, null=True, blank=True)
    size = models.CharField(max_length=50, null=True, blank=True)
    material = models.CharField(max_length=100, null=True, blank=True)
    features = models.TextField(null=True, blank=True)

    # Ratings and Reviews
    rating = models.FloatField(default=0.0)
    review_count = models.PositiveIntegerField(default=0)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=50, default="Active")

    # Seller and SEO
    seller = models.ForeignKey('Seller', on_delete=models.SET_NULL, null=True)
    return_policy = models.TextField(null=True, blank=True)
    warranty = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    # # Computed Properties for Pricing Adjustments
    # @property
    # def discounted_price(self):
    #     """
    #     Calculate the price after applying the discount.
    #     """
    #     if self.discount_percentage:
    #         return self.price - (self.price * (self.discount_percentage / 100))
    #     return self.price

    # @property
    # def admin_commission(self):
    #     """
    #     Calculate the 2% admin commission.
    #     """
    #     return self.discounted_price * 0.02

    # @property
    # def gst(self):
    #     """
    #     Calculate the 10% GST.
    #     """
    #     return self.discounted_price * 0.10

    # @property
    # def final_price(self):
    #     """
    #     Calculate the final price after discount, commission, and GST.
    #     """
    #     discounted = self.discounted_price
    #     total_price = discounted + self.gst - self.admin_commission
    #     return round(total_price, 2)
    
    
class Seller(models.Model):
    name = models.CharField(max_length=255)
    contact_info = models.TextField()
    
    def __str__(self):
        return self.name
    










class User_Signup(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address=models.CharField(max_length=30)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='male')  # Assuming you want to add gender
    password = models.CharField(max_length=128) 
    


