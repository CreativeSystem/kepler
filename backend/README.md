# Kepler

## Como configurar o projeto

- python3 -m virtualenv --python=python3 env
- source env/Scripts/activate ou source env/bin/activate para o linux
- pip3 install -r requirements.txt

## Rodando o projeto

- cd keplerapi
- python3 manage.py migrate
- python3 manage.py createsuperuser
- python3 manage.py runserver