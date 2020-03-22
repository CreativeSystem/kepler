from rest_framework.test import APITestCase,APIClient
from django.urls import reverse
from authapi.tests.utils import create_user,fake_user,get_token
from rest_framework import status

AURH_URL = reverse('authentication')
REGISTER_URL = reverse('register-user')
INFO_URL = reverse('info-user')

class AuthTest(APITestCase):
  def setUp(self):
    pass

  def test_it_should_authenticate(self):
    user = create_user()

    response = self.client.post(AURH_URL,user,format='json')

    self.assertEqual(response.status_code,status.HTTP_200_OK)
    self.assertIsNotNone(response.data['token'])

  def test_it_should_not_authenticate_with_wrong_password(self):
    user = create_user(data={"password":'12345678'})
    user["password"] = "12345679"

    response = self.client.post(AURH_URL,user,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
  
  def test_it_should_access_private_routes(self):
    user = create_user()
    token = get_token(AURH_URL,user=user)
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

    response = client.get(INFO_URL)

    self.assertEqual(response.status_code,status.HTTP_200_OK)
    self.assertEqual(user['email'],response.data['email'])

  def test_it_should_not_access_private_routes(self):
    client = APIClient()

    response = client.get(INFO_URL)
    
    self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)

class UserTest(APITestCase):
  def setUp(self):
    pass

  def test_it_should_resgiter_user(self):
    user = fake_user()

    response = self.client.post(REGISTER_URL,user,format='json')

    self.assertEqual(response.status_code,status.HTTP_201_CREATED)
    self.assertEqual(response.data['email'],user['email'])
  
  def test_it_should_not_resgiter_user_with_invalid_email(self):
    user = fake_user(data={
      "email": "issonaoeumemail"
    })

    response = self.client.post(REGISTER_URL,user,format='json')

    self.assertEqual(response.status_code,status.HTTP_417_EXPECTATION_FAILED)
    self.assertEqual(response.data['type'],'error')
  
  def test_it_should_not_resgiter_user(self):
    response = self.client.post(REGISTER_URL,{},format='json')

    self.assertEqual(response.status_code,status.HTTP_417_EXPECTATION_FAILED)
    self.assertEqual(response.data['type'],'error')
