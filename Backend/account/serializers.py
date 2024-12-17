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
    fields=['user_id','email', 'name', 'password','password2','user_type','mobile_no','address','is_status','is_admin','is_superuser',]
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
