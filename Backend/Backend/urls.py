from django.urls import path, include

urlpatterns = [
    # existing patterns...
    path('api/', include('account.urls')),
    # ...
] 