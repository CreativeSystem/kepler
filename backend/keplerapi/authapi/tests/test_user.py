from rest_framework.test import APITestCase,APIClient
from django.urls import reverse
from authapi.tests.utils import create_user,fake_user,get_token,get_reset_data
from rest_framework import status
from authapi.models import User

AURH_URL = reverse('authentication')
REGISTER_URL = reverse('register-user')
INFO_URL = reverse('info-user')
FORGOT_PASSWORD_URL = reverse('forgot-password')
RESET_PASSWORD_URL = reverse('reset-password')

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

class ForgotPasswordTest(APITestCase):
  def setUp(self):
    pass
  
  def test_it_should_create_forgot_password_token(self):
    user = create_user()

    response = self.client.post(FORGOT_PASSWORD_URL,{'email': user["email"]},format='json')
    self.assertEqual(response.status_code,status.HTTP_200_OK)

    db_user = User.objects.get(email=user["email"])

    self.assertIsNotNone(db_user.forgot_password_token)

  def test_it_should_not_create_forgot_password_token_for_invalid_email(self):
    user = create_user()

    response = self.client.post(FORGOT_PASSWORD_URL,{'email': None},format='json')
    self.assertEqual(response.status_code,status.HTTP_417_EXPECTATION_FAILED)

    response = self.client.post(FORGOT_PASSWORD_URL,{'email': 'issonaoeumemail'},format='json')
    self.assertEqual(response.status_code,status.HTTP_417_EXPECTATION_FAILED)

  def test_it_should_not_create_forgot_password_token_for_invalid_user(self):

    response = self.client.post(FORGOT_PASSWORD_URL,{'email': "invalid@user.com"},format='json')
    self.assertEqual(response.status_code,status.HTTP_417_EXPECTATION_FAILED)

class ResetPasswordTest(APITestCase):
  def setUp(self):
    pass
  
  def test_it_should_reset_password(self):
    user = create_user()
    reset_data = get_reset_data()

    db_user = User.objects.get(email=user["email"])
    
    db_user.forgot_password_token = reset_data['token']
    db_user.save()

    response = self.client.post(RESET_PASSWORD_URL,reset_data,format='json')
    self.assertEqual(response.status_code,status.HTTP_200_OK)
    db_user.refresh_from_db(fields=['forgot_password_token','password'])

    self.assertIsNone(db_user.forgot_password_token)
    self.assertTrue(db_user.check_password(reset_data['password']))
  
  def test_it_should_not_reset_password_for_invalid_token(self):
    user = create_user()
    reset_data = get_reset_data()

    db_user = User.objects.get(email=user["email"])
    
    db_user.forgot_password_token = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456'
    db_user.save()

    response = self.client.post(RESET_PASSWORD_URL,reset_data,format='json')
    self.assertEqual(response.status_code,status.HTTP_417_EXPECTATION_FAILED)
    db_user.refresh_from_db(fields=['forgot_password_token','password'])

    self.assertIsNotNone(db_user.forgot_password_token)
    self.assertFalse(db_user.check_password(reset_data['password']))
  
  def test_it_should_not_reset_password_for_incorrect_password_match(self):
    user = create_user()
    reset_data = get_reset_data(data={
      'password_confirmed': "12345678"
    })

    db_user = User.objects.get(email=user["email"])
    
    db_user.forgot_password_token = reset_data["token"]
    db_user.save()

    response = self.client.post(RESET_PASSWORD_URL,reset_data,format='json')
    self.assertEqual(response.status_code,status.HTTP_417_EXPECTATION_FAILED)
    db_user.refresh_from_db(fields=['forgot_password_token','password'])

    self.assertIsNotNone(db_user.forgot_password_token)
    self.assertFalse(db_user.check_password(reset_data['password']))

  def test_it_should_not_reset_password_for_invalid_data(self):
    for key in ('token','password','password_confirmed'):
      data = {}
      data[key] = None
      reset_data = get_reset_data(data=data)
      response = self.client.post(RESET_PASSWORD_URL,reset_data,format='json')
      self.assertEqual(response.status_code,status.HTTP_417_EXPECTATION_FAILED)
    
  