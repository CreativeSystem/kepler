from django.urls import path
from api.views.upload import UploadView
from api.views.public.service import ServiceListView,ServiceDetailView
from api.views.private.UserDataView import UserDataCreateRetrieveView

urlpatterns = [
  path("upload/",UploadView.as_view(),name='upload'),
  path("services/",ServiceListView.as_view()),
  path("services/<int:pk>/",ServiceDetailView.as_view()),
  path("user-data/",UserDataCreateRetrieveView.as_view())
]
