from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import *
import pdb
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from .serializers import  SellerDetailSerializer
from django.shortcuts import get_object_or_404


# Generate Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }


class UserRegistrationView(APIView):
  def post(self, request, format=None):
        user_exists = User.objects.filter(email=request.data.get('email')).exists()
        if user_exists:
          return Response({'message':'Email Already Exists'})
        else:
          serializer = UserRegistrationSerializer(data=request.data)
          if serializer.is_valid():
              user=serializer.save()
              if request.data.get('user_type')=='Seller':
                  SellerDetail.objects.create(
                       seller_id=user,
                       bussiness_name=request.data.get('bussiness_name'),
                       bussiness_address=request.data.get('bussiness_address'),
                       image=request.data.get('image'),
                       bussiness_mobile_no=request.data.get('bussiness_mobile_no')
                  )
              return Response({"message": 'user created'})
                 
          return Response(serializer.errors)
  def get(self, request, format=None):
        # Retrieve all users or a specific user based on the query parameter
        user_id = request.query_params.get('user_id')
        if user_id:
            # Get specific user
            try:
                user = User.objects.get(id=user_id)
                serializer = UserRegistrationSerializer(user)
                seller_details = SellerDetail.objects.filter(seller_id=user).first()
                seller_serializer = SellerDetailSerializer(seller_details) if seller_details else None
                
                response_data = serializer.data
                if seller_details:
                    response_data['seller_details'] = seller_serializer.data
                
                return Response(response_data)
            except User.DoesNotExist:
                return Response({"message": "User not found"}, status=404)
        else:
            # Get all users
            users = User.objects.all()
            serializer = UserRegistrationSerializer(users, many=True)
            return Response(serializer.data)
        
  def delete(self, request, pk):
        # Fetch the user based on pk
        if pk:
            seller_details = User.objects.filter(user_id=pk)
            seller_details.delete()
            return Response(status=200)
        return Response({'message':"user not found"})
  
  def put(self, request, pk):
        print(request)
        # Fetch the user based on pk
        if pk:
            seller_details = User.objects.filter(user_id=pk)
            seller_details.put()
            return Response(status=200)
        return Response({'message':"user not found"})
        
#   def delete(self,request,pk,format=None):
#         Role_id=pk
#         Role_delete=Role.objects.get(pk=Role_id)
#         Role_delete.delete()
#         RoleList=Role.objects.filter(com_id=request.user)
#         Role_list_serializers=RoleSerializer(RoleList,many=True) 
#         return Response(Role_list_serializers.data)
  
    

class SellerActivationApiView(APIView):
    def post(self,request,format=None):
        if request.data.get('user_id'):
            user = User.objects.get(user_id=request.data.get('user_id'))
            if user:
                user.is_status=True
                user.save()
                return Response({"message": 'seller activate'})
            return Response({'message':"user not found"})
        return Response({"message": 'user id required'})


class Seller_Login(APIView):
    def post(self, request):
        login_email = request.data.get('email')
        login_password = request.data.get('password')
        user = authenticate(email=login_email, password=login_password)
        if user:
            tokens = get_tokens_for_user(user)
            return Response({
                "refresh": tokens['refresh'],
                "access": tokens['access'],
                "user": {
                    "id": user.user_id,
                    "email": user.email,
                    "name": user.name,
                    "user_type": user.user_type,
                }
            }, status=status.HTTP_200_OK)
          
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# class Admin_Login(APIView):
#     def post(self, request):
#         # Retrieve email and password from the request
#         email = request.data.get('email')
#         password = request.data.get('password')

#         # Authenticate the user
#         user = authenticate(email=email, password=password)

#         # Check if authentication was successful
#         if user is not None:
#             # Check if the user has admin privileges
#             if user:
#                 login(request, user)  # Log the user in
#                 return Response({'success': True, 'message': 'Login successful','user_type':user.user_type}, status=200)
#             else:
#                 return Response({'success': False, 'message': 'You do not have admin privileges'}, status=403)
#         else:
#             # Handle invalid credentials
#             return Response({'success': False, 'message': 'Invalid email or password'},)
