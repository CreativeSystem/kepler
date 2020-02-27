from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from keplerapi.settings import DEBUG

urlpatterns = [
    path('auth/', include('authapi.urls')),
    path('api/', include('api.urls'))
]
if DEBUG:
    urlpatterns.append(path('admin/', admin.site.urls))
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)