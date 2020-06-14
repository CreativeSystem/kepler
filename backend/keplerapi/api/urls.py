from django.urls import path
from api.views.upload import UploadView
from api.views.public.service import ServiceListView,ServiceDetailView
# from api.views.private.UserDataView import UserDataCreateView,get_current_user_data
from api.views.private.service import RegisterServiceView

urlpatterns = [
  path("upload/",UploadView.as_view(),name='upload'),
  path("services/",ServiceListView.as_view()),
  path("services/<int:pk>/",ServiceDetailView.as_view()),
  # path("user-data/",UserDataCreateView.as_view(),name="user-data"),
  # path("profile/",get_current_user_data,name="profile"),
  path("user/services/",RegisterServiceView.as_view(),name="register-service")
]
