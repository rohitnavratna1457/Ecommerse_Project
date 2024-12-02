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
              if request.data.get('user_type')=='Seller':    # Usertype seller ... 
                  SellerDetail.objects.create(
                       seller_id=user,
                       bussiness_name=request.data.get('bussiness_name'),
                       bussiness_address=request.data.get('bussiness_address'),
                       image=request.data.get('image'),
                       bussiness_mobile_no=request.data.get('bussiness_mobile_no')
                  )
              return Response({"message": 'user created'})
                 
          return Response(serializer.errors)


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

class Admin_Login(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)

        print(user, '********** user **********')

        if user:
            # Login was successful
            return Response({'success': True, 'message': 'Login successful'}, status=200)
        else:
            # Login failed
            return Response({'success': False, 'message': 'Invalid credentials'}, status=401)
           
 
