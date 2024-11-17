from django.urls import path
from .views import *

urlpatterns = [
    
    path('api/signUp', Sellor_Reg.as_view(), name='sellor_reg'),
    path('api/login/', Sellor_Login.as_view(), name='sellor_reg')
]
