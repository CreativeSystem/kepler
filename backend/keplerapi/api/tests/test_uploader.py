import os 

from rest_framework.test import APITestCase
from django.urls import reverse

class UploaderTest(APITestCase):
  def setUp(self):
    self.dir = os.path.dirname(os.path.abspath(__file__))

  def test_it_should_upload(self):
    with open(self.dir+ '/temp/temp-file.jpeg', 'rb') as data:
      response = self.client.post(reverse('upload'),{'file': data},format='multipart')
      self.assertEqual(response.status_code,201)
  
  def test_it_should_not_upload(self):
      response = self.client.post(reverse('upload'))
      self.assertEqual(response.status_code,417)