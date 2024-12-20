from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import *
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404
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
    # Fetch the user instance based on the primary key
    user_instance = get_object_or_404(User, user_id=pk)
    
    # Partially update the user instance with request data
    serializer = UserRegistrationSerializer(user_instance, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
    
    # Return errors if data is invalid
    return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
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
    
# Category Api view 
class CategoryApiview(APIView):
   
    def get(self, request, format=None):
        """
        Retrieve all categories.
        """
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Create a new category.
        """
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        """
        Update an existing category by primary key.
        """
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
      
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 
    
# SubCategoryApiview Bussiness logics of view
class SubCategoryApiView(APIView):
    
    def get(self, request, format=None):
        subcategories = SubCategory.objects.all()
        serializer = SubCategorySerializer(subcategories, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
       
        serializer = SubCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
       
        try:
            subcategory = SubCategory.objects.get(pk=pk)
        except SubCategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = SubCategorySerializer(subcategory, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        
        try:
            subcategory = SubCategory.objects.get(pk=pk)
        except SubCategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        subcategory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# ProductApiview Bussiness logics of view
class ProductApiView(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        if pk:
            product = Product.objects.get(pk=pk)            
            serializer = ProductSerializer(product, data=request.data)
            if serializer.is_valid():
             serializer.save()
             return Response(serializer.data)
        return Response(serializer.data, status=400)

    def delete(self, request, pk, format=None):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Approve or Reject Seller
class ApproveSellerView(APIView):
    def post(self, request, seller_id):
        seller_profile = SellerProfileVerify.objects.get(id=seller_id)
        
        if seller_profile.verification_status != "Pending":
            return Response(
                {"error": "This seller has already been processed."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        seller_profile.approve()
        return Response({"message": "Seller approved successfully!"})


class RejectSellerView(APIView):
    def post(self, request, seller_id):
        seller_profile = SellerProfileVerify.objects.get(id=seller_id)
        rejection_reason = request.data.get("rejection_reason", "No reason provided")
        
        if seller_profile.verification_status != "Pending":
            return Response(
                {"error": "This seller has already been processed."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        seller_profile.reject(rejection_reason)
        return Response({"message": "Seller rejected successfully!"})


# Approve or Reject Product
class ApproveProductView(APIView):
    def post(self, request, product_id):
        product_listing = Product_Listing.objects.get(id=product_id)
        
        if product_listing.approval_status != "Pending":
            return Response(
                {"error": "This product listing has already been processed."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        product_listing.approve()
        return Response({"message": "Product approved successfully!"})


class RejectProductView(APIView):
    def post(self, request, product_id):
        product_listing = Product_Listing.objects.get(id=product_id)
        rejection_reason = request.data.get("rejection_reason", "No reason provided")
        
        if product_listing.approval_status != "Pending":
            return Response(
                {"error": "This product listing has already been processed."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        product_listing.reject(rejection_reason)
        return Response({"message": "Product rejected successfully!"})


# List Pending Approvals
class PendingApprovalsView(ListAPIView):
    def get(self, request):
        pending_sellers = SellerProfileVerify.objects.filter(verification_status="Pending")
        pending_products = Product_Listing.objects.filter(approval_status="Pending")
        
        sellers_serializer = SellerProfileVerifySerializer(pending_sellers, many=True)
        products_serializer = ProductListingSerializer(pending_products, many=True)
        
        return Response({
            "pending_sellers": sellers_serializer.data,
            "pending_products": products_serializer.data,
        })