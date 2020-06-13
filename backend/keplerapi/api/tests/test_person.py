from rest_framework.test import APITestCase,APIClient
from django.urls import reverse
from django.test import tag
from authapi.tests.utils import create_user,fake_user,get_token,get_reset_data
from rest_framework import status
from authapi.models import User
from api.tests.utils import create_user_data,create_user_interests
from datetime import date,timedelta

AUTH_URL = reverse('authentication')
USER_DATA_URL = reverse('user-data')
PROFILE_URL = reverse('profile')

@tag("person")
class PersonTest(APITestCase):
  def setUp(self):
    user = create_user()
    self.user = User.objects.get(email=user["email"])
    self.token = get_token(AUTH_URL,user=user)
    self.client = APIClient()
    self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

  def test_it_should_not_access_url_without_valid_token(self):
    client = APIClient()
    user_data = create_user_data(data={
      "user":self.user.id
      })
    response = client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)

  def test_it_should_save_user_data(self):
    user_data = create_user_data(data={
      "user":self.user.id
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_201_CREATED)
    self.assertIsNotNone(response.data['id'])

  def test_it_should_not_save_user_data_twice(self):
    user_data = create_user_data(data={
      "user":self.user.id
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_201_CREATED)
    self.assertIsNotNone(response.data['id'])

    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['user'])

  def test_it_should_not_save_user_data_with_any_none_field(self):
    fields = ["name","user","cpf","whatsapp","telephone","birth_date","interests"]
    for field in fields:
      data = {
      "user":self.user.id
      }
      data[field] = None
      user_data = create_user_data(data=data)
      response = self.client.post(USER_DATA_URL,user_data,format='json')

      self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
      self.assertIsNotNone(response.data[field])

  def test_it_should_not_save_user_data_with_invalid_user(self):
    user_data = create_user_data(data={
      "user":self.user.id + 1
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['user'])

  def test_it_should_not_save_user_data_with_invalid_name_length(self):
    user_data = create_user_data(data={
      "user":self.user.id,
      "name":"E"*76
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['name'])

  def test_it_should_not_save_user_data_with_none_cpf(self):
    user_data = create_user_data(data={
      "user":self.user.id,
      "cpf":None
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['cpf'])

  def test_it_should_not_save_user_data_with_invalid_cpf_min_length(self):
    user_data = create_user_data(data={
      "user":self.user.id,
      "cpf":"1"*10
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['cpf'])

  def test_it_should_not_save_user_data_with_invalid_cpf_max_length(self):
    user_data = create_user_data(data={
      "user":self.user.id,
      "cpf":"1"*12
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['cpf'])

  def test_it_should_not_save_user_data_with_invalid_cpf(self):
    user_data = create_user_data(data={
      "user":self.user.id,
      "cpf":"92065205049"
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['cpf'])

  def test_it_should_not_save_user_data_with_invalid_whatsapp_min_length(self):
    user_data = create_user_data(data={
      "user":self.user.id,
      "whatsapp":"1"*10
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['whatsapp'])

  def test_it_should_not_save_user_data_with_invalid_whatsapp_max_length(self):
    user_data = create_user_data(data={
      "user":self.user.id,
      "whatsapp":"1"*12
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['whatsapp'])

  def test_it_should_not_save_user_data_with_invalid_telephone_min_length(self):
    user_data = create_user_data(data={
      "user":self.user.id,
      "telephone":"1"*9
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['telephone'])

  def test_it_should_not_save_user_data_with_invalid_telephone_max_length(self):
    user_data = create_user_data(data={
      "user":self.user.id,
      "telephone":"1"*11
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['telephone'])

  def test_it_should_not_save_user_data_with_invalid_birth_date_value(self):
    user_data = create_user_data(data={
      "user":self.user.id,
      "birth_date":"maythe4"
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['birth_date'])

  def test_it_should_not_save_user_data_with_future_birth_date(self):
    user_data = create_user_data(data={
      "user":self.user.id,
      "birth_date": (date.today() + timedelta(days=1)).strftime("%Y-%m-%d")
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['birth_date'])

  def test_it_should_save_user_data_with_interests_none_other(self):
    interest = create_user_interests(data={
      "other":None
    })
    user_data = create_user_data(data={
      "user":self.user.id,
      "interests":[interest]
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_201_CREATED)
    self.assertIsNotNone(response.data['id'])

  def test_it_should_not_save_user_data_with_invalid_interests_other_max_length(self):
    interest = create_user_interests(data={
      "other":"E"*51
    })
    user_data = create_user_data(data={
      "user":self.user.id,
      "interests":[interest]
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['interests'])

  def test_it_should_not_save_user_data_with_interests_none_interest(self):
    interest = create_user_interests(data={
      "interest":None
    })
    user_data = create_user_data(data={
      "user":self.user.id,
      "interests":[interest]
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['interests'])

  def test_it_should_not_save_user_data_with_invalid_interest(self):
    interest = create_user_interests(data={
      "interest":5
    })
    user_data = create_user_data(data={
      "user":self.user.id,
      "interests":[interest]
      })
    response = self.client.post(USER_DATA_URL,user_data,format='json')

    self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    self.assertIsNotNone(response.data['interests'])

  def test_it_should_list_registered_user_data(self):
    user_data = create_user_data(data={
      "user":self.user.id
      })
    registered_user_data = self.client.post(USER_DATA_URL,user_data,format='json').data

    response = self.client.get(PROFILE_URL)

    self.assertEqual(response.status_code,status.HTTP_200_OK)
    self.assertDictEqual(registered_user_data,response.data)