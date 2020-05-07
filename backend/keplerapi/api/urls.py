from django.urls import path
from api.views.upload import UploadView
from api.views.public.service import ServiceListView,ServiceDetailView

urlpatterns = [
  path("upload/",UploadView.as_view(),name='upload'),
  path("services/",ServiceListView.as_view()),
  path("services/<int:pk>/",ServiceDetailView.as_view())
]
