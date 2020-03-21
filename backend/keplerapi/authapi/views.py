from .serializers import ProfileSerializer,UserSerializer
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def get_current_user(request):
    serializer = ProfileSerializer(request.user)
    return Response(serializer.data)


class CreateUserView(APIView):

    def post(self, request):
        user = request.data
        if not user:
            return Response({'response': 'error', 'message': 'No data found'})
        serializer = UserSerializer(data=user)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response({"response": "error", "message": serializer.errors})
        return Response({"response": "success", "message": "user created succesfully"})
