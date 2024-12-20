from rest_framework import serializers
from account.models import *
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from account.models import *

class UserRegistrationSerializer(serializers.ModelSerializer):
  # We are writing this becoz we need confirm password field in our Registratin Request
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  class Meta:
    model = User
    fields=['user_id','email', 'name', 'password','password2','user_type','mobile_no','address','is_status','admin_approve']
    extra_kwargs={
      'password':{'write_only':True}
    }

  # Validating Password and Confirm Password while Registration
  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

  def create(self, validated_data):
    validated_data.pop('password2', None)  # Remove password2 from validated_data
    return User.objects.create_user(**validated_data)

class SellerDetailSerializer(serializers.ModelSerializer):
 class Meta:
   model=SellerDetail
   fields='__all__'
   
# Serializer for the Category model
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'  # This will include all fields from the Category model

# Serializer for the SubCategory model
class SubCategorySerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = SubCategory
        fields =  '__all__' 

    def validate_category(self, value):
        if value is None:
            raise serializers.ValidationError("Category cannot be null.")
        return value
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {
            'product_name': {'required': False},
            'price': {'required': False},
            'category': {'required': False},
            'main_image': {'required': False},
        }

    def validate_price(self, value):
        if value is not None and value <= 0:
            raise serializers.ValidationError("Price must be greater than 0.")
        return value

    def validate_discount_percentage(self, value):
        if value is not None and (value < 0 or value > 100):
            raise serializers.ValidationError("Discount percentage must be between 0 and 100.")
        return value

    def validate(self, data):
        if data.get('original_price') and data.get('price'):
            if data['price'] > data['original_price']:
                raise serializers.ValidationError("Price cannot be greater than original price.")
        return data

    def validate_main_image(self, value):
        if not value:
            raise serializers.ValidationError("No file was submitted for main_image.")
        return value
    
    
    # Serializer for the Product model
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name', read_only=True)
    # name = serializers.CharField(source='category.subcategory.name', read_only=True)
    subcategory_name = serializers.CharField(source='category.name', read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    subcategory = serializers.PrimaryKeyRelatedField(queryset=SubCategory.objects.all())

    class Meta:
        model = Product
        fields = '__all__'
        
    # Serializer for the ProductListing model
class ProductListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_Listing
        fields = '__all__'
        
 # Serializer for the SellerProfileVerify model
class SellerProfileVerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerProfileVerify
        fields = '__all__'