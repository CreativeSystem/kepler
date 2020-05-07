from django.urls import path
from .views import CreateUserView, get_current_user,forgot_password,reset_password
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('', obtain_jwt_token,name="authentication"),
    path('register/', CreateUserView.as_view(),name="register-user"),
    path('forgot/', forgot_password ,name="forgot-password"),
    path('reset/', reset_password ,name="reset-password"),
    path('me/', get_current_user ,name="info-user"),
]
