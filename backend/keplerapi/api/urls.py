from django.urls import path
from api.views.upload import UploadView
from api.views.public.service import ServiceListView,ServiceDetailView
from api.views.private import person,hired_service

urlpatterns = [
  path("upload/",UploadView.as_view(),name='upload'),
  
  path("services/",ServiceListView.as_view()),
  path("services/<int:pk>/",ServiceDetailView.as_view()),

  path("person/",person.PersonCreateView.as_view(),name="person"),
  path("person/<int:pk>/",person.PersonRetrieveUpdateDestroyView.as_view(),name="person-detail"),
  
  path("person/interests/",person.PersonInterestsListCreateView.as_view(),name="person-interests"),
  path("person/interests/<int:pk>/",person.PersonInterestsDestroyView.as_view(),name="person-interests-detail"),
  
  path("person/services/",person.PersonServiceListCreateView.as_view(),name="person-service"),
  path("person/services/<int:pk>/",person.PersonServiceRetrieveUpdateDestroyView.as_view(),name="person-service-detail"),
  
  path("person/services/<int:service>/images/",person.PersonServiceImageListCreateView.as_view(),name="person-service-image"),
  path("person/services/<int:service>/images/<int:pk>/",person.PersonServiceImageDestroyView.as_view(),name="person-service-image-detail"),

  path("services/hire/",hired_service.HireServiceListCreateView.as_view(),name="hire-service"),
  path("services/hire/<int:pk>/",hired_service.HireServiceRetriveDeactivateView.as_view(),name="hire-service-detail"),
]
