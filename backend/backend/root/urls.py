from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static

from .yasg import urlpatterns as yasg_urls


urlpatterns = [     
    path('api/web/admin/', admin.site.urls),
    path('api/web/auth/', include('djoser.urls')),
    path('api/web/auth/', include('djoser.urls.jwt')),
    path('api/web/accounts/', include('accounts.urls')),
    path('api/web/', include('main.urls'))
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += yasg_urls