from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *  # Ensure the Seller model is defined and imported
from .serializer import *  # Ensure the SellerSerializer is defined and imported

class Sellor_Reg(APIView):
    def post(self, request, format=None):
        # Validate and create a new seller entry
        serializer = SellerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Retrieve all seller entries
            sellers = Seller_Signup.objects.all()  # Query the Seller model
            project_data = SellerSerializer(sellers, many=True)  # Serialize the retrieved data
            # Return serialized seller data
            return Response(project_data.data, status=status.HTTP_201_CREATED)
        
        # Return errors if the serializer is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        # Retrieve all seller entries
        sellers = Seller_Signup.objects.all()  # Query the Seller_Signup model
        sellor_data = SellerSerializer(sellers, many=True)  # Serialize the retrieved data
        
        # Return serialized seller data
        return Response(sellor_data.data, status=status.HTTP_200_OK)