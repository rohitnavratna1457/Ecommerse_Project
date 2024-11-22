from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .Serializer import *
# Create your views here.

class Admin_Login(APIView):
    def post(self, request):
        login_email = request.data.get('')
        login_password = request.data.get('password')
        user = UserSerializer.objects.get(email=login_email, password=login_password)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)