from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django_seed import Seed

class AuthTest(APITestCase):
  def setUp(self):
    seeder = Seed.seeder()
    seeder.add_entity(User,1,{
      
    })

  def test_it_should_authenticate(self):
    print('test_it_should_authenticate')
    self.assertTrue(True)

  def test_it_should_not_authenticate(self):
    print('test_it_should_not_authenticate')
    self.assertTrue(True)