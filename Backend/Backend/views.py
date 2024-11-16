from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *  # Ensure the Seller model is defined and imported
from .serializer import *  # Ensure the SellerSerializer is defined and imported
from django.contrib.auth.hashers import check_password


class Sellor_Reg(APIView):
    def post(self, request, format=None):
        # Validate and create a new seller entry
        serializer = SellerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Retrieve all seller entries
            sellers = Seller_Signup.objects.all()  # Query the Seller model
            sellor_data = SellerSerializer(sellers, many=True)  # Serialize the retrieved data
            # Return serialized seller data
            return Response(sellor_data.data, status=status.HTTP_201_CREATED)
        
        # Return errors if the serializer is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        # Retrieve all seller entries
        sellers = Seller_Signup.objects.all()  # Query the Seller_Signup model
        sellor_data = SellerSerializer(sellers, many=True)  # Serialize the retrieved data
        
        # Return serialized seller data
        return Response(sellor_data.data, status=status.HTTP_200_OK)

def get(request):
    if request.method == 'POST':
        login_email = request.data.get('email')
        login_password = request.data.get('password')

        if not login_email or not login_password:
            return Response({'msg': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        # Filter the user by email
        try:
            # Check if the user exists with the given email
            user = Seller_Signup.objects.filter(email=login_email,password=login_password ).first()  # Using filter and first to avoid exception
            
            # If no user is found with the provided email
            if not user:
                return Response({'msg': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            
            # Verify the password
            if check_password(login_password, user.password):
                return Response({
                    'msg': 'Login successful',
                })
            else:
                return Response({'msg': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
        
        except Exception as e:
            # General exception handler, though it's unlikely you'd reach here with Django's ORM
            return Response({'msg': f'Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
