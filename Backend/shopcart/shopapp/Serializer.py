from rest_framework import serializers
from .models import *  # Import your User model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users  # Replace 'User' with the name of your model if different
        fields = [
            'userid',  # Primary Key
            'name',
            'mobile_no',
            'email',
            'address',
            'password',  # Write-only to ensure security
            'status',
            'usertype',
        ]
        extra_kwargs = {
            'password': {'write_only': True},  # Ensure password is not visible in API responses
        }

    def create(self, validated_data):
        """
        Override create to hash the password before saving the User instance.
        """
        from django.contrib.auth.hashers import make_password
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Override update to hash the password if it's updated.
        """
        from django.contrib.auth.hashers import make_password
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)
