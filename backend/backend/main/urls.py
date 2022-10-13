from django.urls import path
from .views import  (
    SearchVideo, All_Videos, GetVideo,
    CreateVideo
)


app_name = 'main'


urlpatterns = [
    path("search/video/<str:query>/", SearchVideo.as_view(), name="search_video"),
    path("search/all_videos/", All_Videos.as_view(), name="all_videos"),
    path("get_video/<int:pk>/", GetVideo.as_view(), name="get_video"),
    path("create_video/", CreateVideo.as_view(), name="create_video"),

]
