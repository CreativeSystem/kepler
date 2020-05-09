from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from api.serializers import UserDataSerializer
from api.models import Person,Interests
from api.base import CurrentUserDefault

class UserDataCreateView(generics.CreateAPIView):
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_current_user_data(request):
    person = Person.objects.get(user=request.user)
    serializer = UserDataSerializer(person)
    return Response(serializer.data)
