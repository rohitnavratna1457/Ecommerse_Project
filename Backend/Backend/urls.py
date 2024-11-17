from django.urls import path
from .views import *

urlpatterns = [
    
    path('api/signUp', Sellor_Reg.as_view(), name='sellor_reg'),
    path('api/login/', Sellor_Login.as_view(), name='sellor_login'),
    path('api/usersignUp', User_Reg.as_view(), name='user_reg'),
    path('api/userlogin/', User_Login.as_view(), name='user_login')
]
