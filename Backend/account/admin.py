from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(User)
admin.site.register(SellerDetail)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(SellerProfileVerify)
admin.site.register(Product_Listing)