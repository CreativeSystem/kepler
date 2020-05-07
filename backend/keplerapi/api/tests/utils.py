from django_seed import Seed

def get_random_email():
  seeder = Seed()
  return seeder.faker().email()

def get_random_name():
  seeder = Seed()
  return seeder.faker().name()