from django.urls import path
from api.views.upload import UploadView

urlpatterns = [
  path('upload/',UploadView.as_view())
]
