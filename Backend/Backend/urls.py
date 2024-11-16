from django.urls import path
from .views import Sellor_Reg

urlpatterns = [
    
    path('sellor_reg/', Sellor_Reg.as_view(), name='sellor_reg'),
]
