from django.urls import include, path

from .views import (
    SearchVideo,
    AllVideos,
    GetVideo,
    CreateVideo,
    DeleteVideo,
    UpdateVideo,
    LikeVideo,
    CreateComment,
    VideoComments,
    SubscribeVideoChannel,
    SubscribeChannelCheck,
    SubscribedVideos,
    UserVideos,
    RelatedVideos,
    DiscoverVideos,
    MostWatchedVideos,
    Trending,
    MostPopular,
    ForYou,
    WebPushTokens,
)


app_name = "main"

from rest_framework.routers import DefaultRouter, SimpleRouter

router = SimpleRouter()
router.register(r"tokens", WebPushTokens)


urlpatterns = [
    path("search/video/<str:query>/", SearchVideo.as_view(), name="search_video"),
    path("all_videos/", AllVideos.as_view(), name="all_videos"),
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
    path(
        "check_channel/<int:pk>/",
        SubscribeChannelCheck.as_view(),
        name="check_channel",
    ),
    path("subscribed_videos/", SubscribedVideos.as_view(), name="subscribed_videos"),
    path("user_videos/", UserVideos.as_view(), name="user_videos"),
    path("discover_videos/", DiscoverVideos.as_view(), name="discover_videos"),
    path("most_watched/", MostWatchedVideos.as_view(), name="most_watched"),
    path("trending/", Trending.as_view(), name="trending"),
    path("most_popular/", MostPopular.as_view(), name="most_popular"),
    path("for_you/", ForYou.as_view(), name="for_you"),
    path("web_push/", include(router.urls)),
]
