# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import *  # Ensure the Seller model is defined and imported
# from .serializer import *  # Ensure the SellerSerializer is defined and imported
# from django.contrib.auth.hashers import check_password


# class Sellor_Reg(APIView):
#     def post(self, request, format=None):
#         # Validate and create a new seller entry
#         serializer = SellerSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             # Retrieve all seller entries
#             sellers = Seller_Signup.objects.all()  # Query the Seller model
#             sellor_data = SellerSerializer(sellers, many=True)  # Serialize the retrieved data
#             # Return serialized seller data
#             return Response(sellor_data.data, status=status.HTTP_201_CREATED)
        
#         # Return errors if the serializer is invalid
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     # def get(self, request, format=None):
#     #     # Retrieve all seller entries
#     #     sellers = Seller_Signup.objects.all()  # Query the Seller_Signup model
#     #     sellor_data = SellerSerializer(sellers, many=True)  # Serialize the retrieved data
        
#     #     # Return serialized seller data
#     #     return Response(sellor_data.data, status=status.HTTP_200_OK)

# class Sellor_Login(APIView):
#     def LoginForm(request):
#     if request.method == 'POST':
#         login_email = request.data.get('email')
#         login_password = request.data.get('password')

#         if not login_email or not login_password:
#             return Response({'msg': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             # Check if the user exists with the given email
#             user = PostSignup.objects.get(Email=login_email)
            
#             print(login_password, 'login_password')
#             print(user.Password, "userpass")
            
#             # Verify the password
#             if check_password(login_password, user.Password):
#                 # Generate JWT token
#                 # token = get_tokens_for_user(user)
#                 return Response({
#                     'msg': 'Login successfully',
#                 })
#             else:
#                 return Response({'msg': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
#         except PostSignup.DoesNotExist:
#             return Response({'msg': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Seller_Signup ,User_Signup # Ensure your Seller model is properly imported
from .serializer import SellerSerializer ,UserSerializer # Ensure your serializer is properly imported
# from django.contrib.auth.hashers import check_password
# from django.contrib.auth.hashers import make_password
class Sellor_Reg(APIView):
    """
    API View for Seller Registration
    """
    def post(self, request, format=None):
        serializer = SellerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Retrieve all seller entries after saving
            sellers = Seller_Signup.objects.all()
            seller_data = SellerSerializer(sellers, many=True)
            return Response(seller_data.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        # Fetch and return all seller data
        sellers = Seller_Signup.objects.all()
        seller_data = SellerSerializer(sellers, many=True)
        return Response(seller_data.data, status=status.HTTP_200_OK)

class Sellor_Login(APIView):

   def post(self, request):
        login_email = request.data.get('email')
        login_password = request.data.get('password')
        user = Seller_Signup.objects.get(email=login_email, password=login_password)
        serializer = SellerSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
   
  #for user 
class User_Reg(APIView):   
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            users=User_Signup.objects.all()
            user_data=UserSerializer(users,many=True)
            return Response(user_data.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, format=None):
        # Fetch and return all seller data
        users = User_Signup.objects.all()
        User_data = UserSerializer(users, many=True)
        return Response(User_data.data, status=status.HTTP_200_OK)
    
class User_Login(APIView):

   def post(self, request):
        login_email = request.data.get('email')
        login_password = request.data.get('password')
        users = User_Signup.objects.get(email=login_email, password=login_password)
        serializer = UserSerializer(users)
        return Response(serializer.data, status=status.HTTP_200_OK)
