from django.urls import path
from account.views import *
urlpatterns = [
    path('seller_reg', UserRegistrationView.as_view(), name='register'), 
    # path('super_admin_login', Admin_Login.as_view(), name='admin_login'),
    path('seller_login', Seller_Login.as_view(), name='login'),
    path('seller/activation/', SellerActivationApiView.as_view(), name='activate'),

    path('category', CategoryApiview.as_view(), name='category-list-create'),
    path('category<int:pk>/', CategoryApiview.as_view(), name='category-detail'),

    path('subCategory', SubCategoryApiView.as_view(), name='subcategory-list-create'),
    path('subCategory<int:pk>/', SubCategoryApiView.as_view(), name='subcategory-detail'),

    path('product', ProductApiView.as_view(), name='subcategory-list-create'),
    path('product<int:pk>/', ProductApiView.as_view(), name='subcategory-detail'),

    

]