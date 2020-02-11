release: python cfoodapi/manage.py migrate --noinput
web: gunicorn cfoodapi.wsgi --pythonpath=cfoodapi --log-file -