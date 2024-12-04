from django.urls import path
from account.views import *
urlpatterns = [
    path('seller_reg', UserRegistrationView.as_view(), name='register'),
    path('super_admin_login', Admin_Login.as_view(), name='admin_login'),
    path('seller_login', Seller_Login.as_view(), name='login'),
    path('seller/activation/', SellerActivationApiView.as_view(), name='activate'),
    path('signup/', SignupView.as_view(), name='signup'),
]