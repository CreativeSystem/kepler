from keplerapi.settings import *

SECRET_KEY = 'fakesecretkey'

DATABASES = {
    'default':  {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:'
    },
}

UPLOADER = LocalUploader
IMAGE_URL= "http://localhost:8000/static/%s"
