from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from api.serializers import PersonSerializer,InterestsSerializer,RegisterServiceSerializer
from api.models import Person,Interests,Service
from api.base import RetrieveUpdateDestroyAPIView,PersonGenericApiView

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

class PersonInterestsDestroyView(generics.DestroyAPIView):
    queryset = Interests.objects.all()
    serializer_class = InterestsSerializer
    permission_classes = [IsAuthenticated]

class PersonServiceListCreateView(generics.ListCreateAPIView,PersonGenericApiView):
    queryset = Service.objects.all()
    serializer_class = RegisterServiceSerializer
    permission_classes = [IsAuthenticated]