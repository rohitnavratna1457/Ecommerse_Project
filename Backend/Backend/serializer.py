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
