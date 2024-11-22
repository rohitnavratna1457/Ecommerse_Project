from django.urls import path
from .views import *
from .models import*
urlpatterns = [
    
    path('Users', Users, name='sellor_reg'),
    path('user_login/',Admin_Login.as_view(), name='sellor_reg'),
    
]
