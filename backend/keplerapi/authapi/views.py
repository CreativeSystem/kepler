from .serializers import ProfileSerializer,UserSerializer,ForgotPasswordSerializer,ResetPasswordSeriliazer
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions,status
from .models import User

@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def get_current_user(request):
    serializer = ProfileSerializer(request.user)
    return Response(serializer.data)

class CreateUserView(APIView):

    def post(self, request):
        user = request.data
        if not user:
            return Response(data={'type': 'error', 'content': 'No data found'},status= status.HTTP_417_EXPECTATION_FAILED)
        serializer = UserSerializer(data=user)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(data={"type": "error", "content": serializer.errors},status= status.HTTP_417_EXPECTATION_FAILED)
        return Response(data= serializer.data,status= status.HTTP_201_CREATED)

@api_view(['POST'])
def forgot_password(request):

    serializer = ForgotPasswordSerializer(data= request.data)

    if not serializer.is_valid():
        return Response(data={"type": "error", "content": serializer.errors},status= status.HTTP_417_EXPECTATION_FAILED)
    
    user = User.objects.get(email= serializer.data["email"])

    if not user:
        return Response(data={"type": "error", "content": "User don't exists"},status= status.HTTP_417_EXPECTATION_FAILED)
    
    user.forgot_password_token = user.generate_forgot_password_token()

    user.save()

    return Response("Check your e-mail to reset password")

@api_view(['POST'])
def reset_password(request):
    serializer = ResetPasswordSeriliazer(data= request.data)

    if not serializer.is_valid():
        return Response(data={"type": "error", "content": serializer.errors},status= status.HTTP_417_EXPECTATION_FAILED)
    
    if not serializer.data['password'] == serializer.data['password_confirmed']:
        return Response(data={"type": "error", "content": "Password must be equal"},status= status.HTTP_417_EXPECTATION_FAILED)
    
    user = User.objects.get(forgot_password_token= serializer.data["token"])

    if not user:
        return Response(data={"type": "error", "content": "User don't exists"},status= status.HTTP_417_EXPECTATION_FAILED)
    
    user.set_password(serializer.data['password'])
    user.forgot_password_token = None
    user.save()

    return Response("Password was reset successfully")