from django_seed import Seed
from faker import Faker
from api.choices import InterestsChoices

NUMBERS = "0123456789"

def get_random_email():
  seeder = Seed()
  return seeder.faker().email()

def get_random_name():
  seeder = Seed()
  return seeder.faker().name()

def create_user_interests(data={}):
  faker = Faker(["pt_BR"])

  if 'interest' not in data.keys():
    data['interest'] = faker.random.choice([1,2,3,4])

  if 'other' not in data.keys():
    data['other'] = faker.text(max_nb_chars=50)

  return data

def create_user_data(data={}):
  faker = Faker(["pt_BR"])

  if 'name' not in data.keys():
    data['name'] = faker.name()

  if 'whatsapp' not in data.keys():
    data['whatsapp'] = faker.lexify(text='?'*11, letters=NUMBERS)

  if 'telephone' not in data.keys():
    data['telephone'] = faker.lexify(text='?'*10, letters=NUMBERS)

  if 'birth_date' not in data.keys():
    data['birth_date'] = faker.date()

  if 'cpf' not in data.keys():
    data['cpf'] = faker.ssn()

  if 'interests' not in data.keys():
    data['interests'] = [create_user_interests()]

  return data
