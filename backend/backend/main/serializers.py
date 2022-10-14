from rest_framework.serializers import (
    ModelSerializer, FileField, PrimaryKeyRelatedField)

from .models import Video, Channel, Comment


class VideoSerializer(ModelSerializer):

    video_file = FileField(required=False)
    channel = PrimaryKeyRelatedField(queryset=Channel.objects.all(), required=False)

    class Meta:
        model = Video
        fields = (
            'id', 'channel', 'title', 'description',
            'video_file', 'hashtag', 'upload_date', 'likes')


class UpdateCreateVideoSerializer(ModelSerializer):

    video_file = FileField(required=False)

    class Meta:
        model = Video
        fields = (
            'title', 'description', 'video_file',
            'hashtag', 'upload_date', 'likes')


class CommentSerializer(ModelSerializer):

    class Meta:
        model = Comment
        fields = ('text', 'user', 'create')


class CreateCommentSerializer(ModelSerializer):

    class Meta:
        model = Comment
        fields = ('text', 'video',)
