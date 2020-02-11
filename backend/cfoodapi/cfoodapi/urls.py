from django.contrib import admin
from django.urls import path, include
from cfoodapi.settings import DEBUG

urlpatterns = [
    path('auth/', include('authapi.urls')),
    path('api/', include('api.urls'))
]
if DEBUG:
    urlpatterns.append(path('admin/', admin.site.urls))
