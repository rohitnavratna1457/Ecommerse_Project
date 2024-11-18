from rest_framework import serializers
from .models import *
# from django.contrib.auth.hashers import make_password


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller_Signup
        fields = ['name', 'email', 'phone',  'category', 'gender', 'file', 'password']

    # def create(self, validated_data):
    #     # Hash the password before saving the seller
    #     validated_data['password'] = make_password(validated_data['password'])
    #     return super().create(validated_data)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Signup
        fields = ['name', 'email', 'phone',   'gender',  'password']    

from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    # Computed fields
    discounted_price = serializers.SerializerMethodField()
    admin_commission = serializers.SerializerMethodField()
    gst = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'category', 'brand', 'model_number',
            'price', 'original_price', 'discount_percentage', 'quantity', 'inventory_status',
            'low_stock_alert', 'is_physical', 'weight', 'weight_unit', 'dimensions',
            'requires_shipping', 'shipping_cost', 'main_image', 'video_url', 'color', 
            'size', 'material', 'features', 'rating', 'review_count', 'created_at', 
            'updated_at', 'status', 'seller', 'return_policy', 'warranty', 
            'discounted_price', 'admin_commission', 'gst', 'final_price',
        ]

    # Computed property methods
    # def get_discounted_price(self, obj):
    #     return obj.discounted_price

    # def get_admin_commission(self, obj):
    #     return obj.admin_commission

    # def get_gst(self, obj):
    #     return obj.gst

    # def get_final_price(self, obj):
    #     return obj.final_price
