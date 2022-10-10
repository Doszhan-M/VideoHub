from django.urls import path
from .views import  (
    SearchVideo,
)


app_name = 'main'


urlpatterns = [
    path("search/video/<str:query>/", SearchVideo.as_view(), name="search_video"),

]
