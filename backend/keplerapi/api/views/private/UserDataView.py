from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.serializers import UserDataSerializer
from api.models import Person
from api.base import CurrentUserDefault

class UserDataCreateRetrieveView(generics.CreateAPIView,generics.RetrieveAPIView):
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticated]
    def filter_queryset(self, queryset):
        return Person.objects.filter(active=True, created_by=self.request.user.id)

