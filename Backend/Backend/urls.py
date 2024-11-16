from django.urls import path
from .views import Sellor_Reg

urlpatterns = [
    
    path('api/signUp', Sellor_Reg.as_view(), name='sellor_reg'),
]
