from random import choices, choice, shuffle
from elasticsearch_dsl import Q

from rest_framework import status
from django.db.models.query import QuerySet
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView,
    GenericAPIView,
)

from .documents import VideoDocument
from .serializers import (
    VideoSerializer,
    UpdateCreateVideoSerializer,
    CreateCommentSerializer,
    CommentSerializer,
)
from .models import Video, Comment, SubscribeChannel


class SearchVideo(ListAPIView):
    """Search video"""

    serializer_class = VideoSerializer

    def get_queryset(self, *args, **kwargs):
        value = self.kwargs["query"]
        query = Q(
            "multi_match",
            query=value,
            fields=[
                "title",
                "description",
                "hashtag",
            ],
            type="phrase_prefix",
        )
        search = VideoDocument.search().query(query)
        queryset = search.to_queryset()
        return queryset


class AllVideos(ListAPIView):
    """Get all video"""

    queryset = Video.objects.all().order_by("-upload_date")
    serializer_class = VideoSerializer


class GetVideo(RetrieveAPIView):
    """Get video by id"""

    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save(update_fields=["views"])
        return self.retrieve(request, *args, **kwargs)


class CreateVideo(CreateAPIView):
    """Create video"""

    queryset = Video.objects.all()
    serializer_class = UpdateCreateVideoSerializer
    parser_classes = (MultiPartParser,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(channel=self.request.user.user_channel)


class DeleteVideo(DestroyAPIView):
    """Delete video"""

    queryset = Video.objects.all()
    permission_classes = (IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.user_channel == instance.channel:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)


class UpdateVideo(UpdateAPIView):
    """Update video"""

    queryset = Video.objects.all()
    serializer_class = UpdateCreateVideoSerializer
    permission_classes = (IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.user_channel == instance.channel:
            return self.update(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)


class LikeVideo(GenericAPIView):
    """Like video"""

    queryset = Video.objects.all()
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        instance = self.get_object()
        instance.likes.add(request.user)
        return Response(status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if getattr(self, "swagger_fake_view", False):
            return VideoSerializer
        return super().get_serializer_class()


class CreateComment(CreateAPIView):
    """Create comment for video"""

    queryset = Comment.objects.all()
    serializer_class = CreateCommentSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VideoComments(ListAPIView):
    """Get all comments for video"""

    serializer_class = CommentSerializer

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Comment.objects.none()
        queryset = Comment.objects.filter(video=self.kwargs["pk"]).order_by("-create")
        return queryset


class SubscribeVideoChannel(GenericAPIView):
    """Subscribe to video's channel"""

    queryset = Video.objects.all()
    serializer_class = None
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        video = self.get_object()
        SubscribeChannel.objects.get_or_create(channel=video.channel, user=request.user)
        return Response(status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if getattr(self, "swagger_fake_view", False):
            return VideoSerializer
        return super().get_serializer_class()


class SubscribedVideos(ListAPIView):
    """Get all videos from subscribes"""

    serializer_class = VideoSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = QuerySet(Video)
            subscribes = SubscribeChannel.objects.filter(user=self.request.user)
            for subscribe in subscribes:
                channel = subscribe.channel
                channel_videos = Video.objects.filter(channel=channel)
                queryset.union(channel_videos)
            return queryset
        return None


class SubscribeChannelCheck(GenericAPIView):
    """Check channel subscribe by video"""

    queryset = Video.objects.all()
    serializer_class = None
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        video = self.get_object()
        has_subscribe = SubscribeChannel.objects.filter(
            channel=video.channel,
            user=request.user,
        )
        if has_subscribe:
            return Response('subscribed')
        return Response('subscribe')


class UserVideos(ListAPIView):
    """Get all videos to authenticated user"""

    serializer_class = VideoSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        channel_id = self.request.user.user_channel
        queryset = Video.objects.filter(channel=channel_id)
        return queryset


class RelatedVideos(ListAPIView):
    """Get all videos for id"""

    serializer_class = VideoSerializer

    def get_queryset(self):
        video_id = self.kwargs.get("pk")
        video = Video.objects.get(id=video_id)
        channel = video.channel
        orders = [
            "id",
            "title",
            "-upload_date",
            "views",
        ]
        order = choice(orders)
        queryset = Video.objects.filter(channel=channel).order_by(order)
        return queryset


class DiscoverVideos(ListAPIView):
    """Get 2 random videos"""

    serializer_class = VideoSerializer

    def get_queryset(self):
        all_ids = Video.objects.all()
        queryset = set(choices(all_ids, k=2))
        if len(queryset) < 2:
            queryset = self.get_queryset()
        return queryset


class MostWatchedVideos(ListAPIView):
    """Get first 4 videos order by views"""

    serializer_class = VideoSerializer

    def get_queryset(self):
        queryset = Video.objects.all().order_by("-views")[:4]
        return queryset


class Trending(ListAPIView):
    """Get most liked videos"""

    serializer_class = VideoSerializer

    def get_queryset(self):
        queryset = Video.objects.all().order_by("-likes")
        return queryset


class MostPopular(ListAPIView):
    """Get most viewed videos"""

    serializer_class = VideoSerializer

    def get_queryset(self):
        queryset = Video.objects.all().order_by("-views")
        return queryset


class ForYou(ListAPIView):
    """Get all videos shuffle random"""

    serializer_class = VideoSerializer

    def get_queryset(self):
        queryset = Video.objects.all()
        list_queryset = []
        [list_queryset.append(item) for item in queryset]
        shuffle(list_queryset)
        return list_queryset
