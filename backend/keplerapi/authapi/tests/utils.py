from authapi.serializers import UserSerializer
from django_seed import Seed
from rest_framework.test import APIRequestFactory
from rest_framework_jwt.views import obtain_jwt_token

CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345678'

def fake_user(data=None):
  seeder = Seed()

  if not data:
    data = {}
  
  if 'email' not in data.keys():
    data['email'] = seeder.faker().email()

  if 'password' not in data.keys():
    data['password'] = seeder.faker().lexify(text='????????', letters=CHARS)
  
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

def get_random_email():
  seeder = Seed()
  return seeder.faker().email()

def get_random_password():
  seeder = Seed()
  return seeder.faker().lexify(text='????????', letters=CHARS)

def get_reset_data(data=None):
  seeder = Seed()
  if not data:
    data = {}

  if 'token' not in data.keys():
    data['token'] = seeder.faker().lexify(text='?'*32, letters=CHARS)

  if 'password' not in data.keys():
    data['password'] = seeder.faker().lexify(text='????????', letters=CHARS)

  if 'password_confirmed' not in data.keys():
    data['password_confirmed'] =  data['password']
  
  return data