from django.test import TestCase,tag,override_settings
from django.core import mail

from keplerapi.tests.settings import TEMPLATES
from api.email import EmailSender,EmailException,EmailAdress
from api.tests.utils import get_random_email,get_random_name

import os

TEST_EMAIL_PATH = "email/test.html"

TEMPLATES_TEST = TEMPLATES[0]

TEMPLATES_TEST["DIRS"] = [
  os.path.join( os.path.dirname(__file__), 'templates')
]

@tag('email')
@override_settings(TEMPLATES=[TEMPLATES_TEST])
class EmailTest(TestCase):
  
  def test_it_should_send_email(self):
    to = get_random_email()

    EmailSender.send(tos=[to],template_path=TEST_EMAIL_PATH)

    self.assertEqual(len(mail.outbox), 1)
  
  def test_it_should_send_email_with_correct_subject(self):
    to = get_random_email()

    TEST_SUBJECT = "Subject"

    EmailSender.send(tos=[to],template_path=TEST_EMAIL_PATH,subject=TEST_SUBJECT)

    self.assertEqual(len(mail.outbox), 1)
    self.assertEqual(mail.outbox[0].subject, TEST_SUBJECT)
  
  def test_it_should_send_email_with_correct_recipients(self):
    tos = []

    for i in range(10):
      tos.append(get_random_email())

    EmailSender.send(tos=tos,template_path=TEST_EMAIL_PATH)

    self.assertEqual(len(mail.outbox), 1)
    self.assertEqual(mail.outbox[0].to, tos)

  def test_it_should_send_email_with_recipient(self):
    to = EmailAdress(email=get_random_email())

    EmailSender.send(tos=[to],template_path=TEST_EMAIL_PATH)

    self.assertEqual(len(mail.outbox), 1)
    self.assertEqual(mail.outbox[0].to, [to.address()])
  
  def test_it_should_send_email_with_recipient_full_address(self):
    to = EmailAdress(email=get_random_email(),name=get_random_name())

    EmailSender.send(tos=[to],template_path=TEST_EMAIL_PATH)

    self.assertEqual(len(mail.outbox), 1)
    self.assertEqual(mail.outbox[0].to, [to.address()])
  
  def test_it_should_send_email_with_differents_recipient(self):
    email_adress= EmailAdress(email=get_random_email(),name=get_random_name())
    email = get_random_email()
    tos = [email_adress.address(),email]
    
    EmailSender.send(tos=[email_adress,email],template_path=TEST_EMAIL_PATH)

    self.assertEqual(len(mail.outbox), 1)
    self.assertEqual(mail.outbox[0].to, tos)

  def test_it_should_send_email_with_correct_message(self):
    to = get_random_email()

    data = {
      "username" : get_random_name()
    }

    EmailSender.send(tos=[to],template_path=TEST_EMAIL_PATH,data=data)

    self.assertEqual(len(mail.outbox), 1)

    message = mail.outbox[0].alternatives[0]
    self.assertTrue( data["username"] in message[0])

  def test_it_should_return_error_with_invalid_recipients(self):
  
    try:
      EmailSender.send(tos=None,template_path=TEST_EMAIL_PATH)
      self.assertTrue(False)
    except EmailException as ex:
      self.assertTrue(True)
  
  def test_it_should_return_error_with_invalid_template(self):
    to = get_random_email()
    try:
      EmailSender.send(tos=[to],template_path=None)
      self.assertTrue(False)
    except EmailException as ex:
      self.assertTrue(True)