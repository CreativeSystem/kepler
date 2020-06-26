from django.urls import path
from api.views.upload import UploadView
from api.views.public.service import ServiceListView,ServiceDetailView
# from api.views.private.UserDataView import UserDataCreateView,get_current_user_data
from api.views.private import person

urlpatterns = [
  path("upload/",UploadView.as_view(),name='upload'),
  path("services/",ServiceListView.as_view()),
  path("services/<int:pk>/",ServiceDetailView.as_view()),
  # path("user-data/",UserDataCreateView.as_view(),name="user-data"),
  # path("profile/",get_current_user_data,name="profile"),
  path("person/",person.PersonCreateView.as_view(),name="person"),
  path("person/<int:pk>/",person.PersonRetrieveUpdateDestroyView.as_view(),name="person-detail"),
  path("person/interests/",person.PersonInterestsListCreateView.as_view(),name="person-interests"),
  path("person/interests/<int:pk>/",person.PersonInterestsDestroyView.as_view(),name="person-interests-detail"),
  path("person/services/",person.PersonServiceListCreateView.as_view(),name="service"),
]
