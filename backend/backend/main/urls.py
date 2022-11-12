from django.urls import path

from .views import (
    SearchVideo,
    All_Videos,
    GetVideo,
    CreateVideo,
    DeleteVideo,
    UpdateVideo,
    LikeVideo,
    CreateComment,
    VideoComments,
    SubscribeVideoChannel,
    SubscribedVideos,
    UserVideos,
    RelatedVideos,
    DiscoverVideos,
)


app_name = "main"


urlpatterns = [
    path("search/video/<str:query>/", SearchVideo.as_view(), name="search_video"),
    path("search/all_videos/", All_Videos.as_view(), name="all_videos"),
    path("get_video/<int:pk>/", GetVideo.as_view(), name="get_video"),
    path("create_video/", CreateVideo.as_view(), name="create_video"),
    path("delete_video/<int:pk>/", DeleteVideo.as_view(), name="delete_video"),
    path("update_video/<int:pk>/", UpdateVideo.as_view(), name="update_video"),
    path("related_videos/<int:pk>/", RelatedVideos.as_view(), name="related_videos"),
    path("like_video/<int:pk>/", LikeVideo.as_view(), name="like_video"),
    path("create_comment/", CreateComment.as_view(), name="create_comment"),
    path("video_comments/<int:pk>/", VideoComments.as_view(), name="video_comments"),
    path(
        "subscribe_channel/<int:pk>/",
        SubscribeVideoChannel.as_view(),
        name="subscribe_channel",
    ),
    path("subscribed_videos/", SubscribedVideos.as_view(), name="subscribed_videos"),
    path("user_videos/", UserVideos.as_view(), name="user_videos"),
    path("discover_videos/", DiscoverVideos.as_view(), name="discover_videos"),
]
