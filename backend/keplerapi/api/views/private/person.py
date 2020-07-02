from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as field_filters

from api.serializers import PersonSerializer,InterestsSerializer,PersonServiceSerializer,ServiceImageSerializer,HiredServiceSerilizer
from api.models import Person,Interests,Service,ServiceImage,HiredService
from api.base import RetrieveUpdateDestroyAPIView,PersonGenericApiView,PathCreateApiView

class PersonCreateView(generics.CreateAPIView):
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticated]

class PersonRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticated]

class PersonInterestsListCreateView(generics.ListCreateAPIView,PersonGenericApiView):
    queryset = Interests.objects.all()
    serializer_class = InterestsSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, pk=None, company_pk=None, project_pk=None):
        is_many = True if isinstance(request.data, list) else False

        serializer = self.get_serializer(data=request.data, many=is_many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class PersonInterestsDestroyView(generics.DestroyAPIView,PersonGenericApiView):
    queryset = Interests.objects.all()
    serializer_class = InterestsSerializer
    permission_classes = [IsAuthenticated]


class ServiceFilter(field_filters.FilterSet):
    class Meta:
        model = Service
        fields = ["active"]

class PersonServiceListCreateView(generics.ListCreateAPIView,PersonGenericApiView):
    queryset = Service.objects.all()
    serializer_class = PersonServiceSerializer
    permission_classes = [IsAuthenticated]

    filterset_class = ServiceFilter

class PersonServiceRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView,PersonGenericApiView):
    queryset = Service.objects.all()
    serializer_class = PersonServiceSerializer
    permission_classes = [IsAuthenticated]

class PersonServiceImageListCreateView(generics.ListAPIView,PathCreateApiView):
    queryset = ServiceImage.objects.all()
    serializer_class = ServiceImageSerializer
    permission_classes = [IsAuthenticated]

class PersonServiceImageDestroyView(generics.DestroyAPIView):
    queryset = ServiceImage.objects.all()
    serializer_class = ServiceImageSerializer
    permission_classes = [IsAuthenticated]

class PersonHiredServiceListView(generics.ListAPIView,PersonGenericApiView):
    queryset = HiredService.objects.all()
    serializer_class = HiredServiceSerilizer
    permission_classes = [IsAuthenticated]
