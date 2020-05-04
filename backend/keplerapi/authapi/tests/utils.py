from authapi.serializers import UserSerializer
from django_seed import Seed
from rest_framework.test import APIRequestFactory
from rest_framework_jwt.views import obtain_jwt_token

ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

def fake_user(data=None):
  seeder = Seed()

  if not data:
    data = {}
  
  if 'email' not in data.keys():
    data['email'] = seeder.faker().email()

  if 'password' not in data.keys():
    data['password'] = seeder.faker().lexify(text='????????', letters=ALPHABET)
  
  return data

def create_user(data=None):
  seeder = Seed()

  data = fake_user(data)
  
  user = UserSerializer(data= data)
  user.is_valid()
  user.save()

  return data

def get_token(url,user=None):
  if not user:
    user = create_user()
  factory = APIRequestFactory()
  request = factory.post(url,user,format='json')
  response = obtain_jwt_token(request)
  return response.data['token']
