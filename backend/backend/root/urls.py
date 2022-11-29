from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static

from .yasg import urlpatterns as yasg_urls
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


urlpatterns = [     
    path('api/web/admin/', admin.site.urls),
    path('api/web/auth/', include('djoser.urls')),
    path('api/web/auth/', include('djoser.urls.jwt')),
    path('api/web/accounts/', include('accounts.urls')),
    path('api/web/', include('main.urls')),
    
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += yasg_urls