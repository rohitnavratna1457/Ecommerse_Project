from django.urls import path
from account.views import *
urlpatterns = [
    
    path('adduser', UserRegistrationView.as_view(), name='register'),
    path('adduser/<int:pk>', UserRegistrationView.as_view(), name=' delete and update'),
    
    path('seller_reg', UserRegistrationView.as_view(), name='register'),
    path('seller_reg/<int:pk>', UserRegistrationView.as_view(), name='register'),

    # path('super_admin_login', Admin_Login.as_view(), name='admin_login'),
    
    path('seller_login', Seller_Login.as_view(), name='login'),
    path('seller/activation/', SellerActivationApiView.as_view(), name='activate'),
     
    path('category', CategoryApiview.as_view(), name='category-list-create'),
    path('category<int:pk>/', CategoryApiview.as_view(), name='category-detail'),

    path('subCategory', SubCategoryApiView.as_view(), name='subcategory-list-create'),
    path('subCategory<int:pk>/', SubCategoryApiView.as_view(), name='subcategory-detail'),
   
    path('product', ProductApiView.as_view(), name='subcategory-list-create'),
    path('product/<int:pk>', ProductApiView.as_view(), name='subcategory-detail'),
    

    path("approve_seller/<int:seller_id>/", ApproveSellerView.as_view(), name="approve_seller"),
    path("reject_seller/<int:seller_id>/", RejectSellerView.as_view(), name="reject_seller"),
    
    path("approve_product/<int:product_id>/", ApproveProductView.as_view(), name="approve_product"),
    path("reject_product/<int:product_id>/", RejectProductView.as_view(), name="reject_product"),
    path("pending_approvals/", PendingApprovalsView.as_view(), name="pending_approvals"),

]