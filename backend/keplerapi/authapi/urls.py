from django.urls import path
from .views import CreateUserView, get_current_user
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('', obtain_jwt_token),
    path('register/', CreateUserView.as_view()),
    path('me/', get_current_user),
]
