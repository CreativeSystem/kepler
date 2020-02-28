from django.urls import path
from .views import CreateUserView, get_current_user
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('', obtain_jwt_token),
    path('user/', CreateUserView.as_view()),
    path('profile/', get_current_user),
]
