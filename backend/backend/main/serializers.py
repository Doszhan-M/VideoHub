from os import getenv
from os.path import splitext

from rest_framework.exceptions import ValidationError
from rest_framework.serializers import (
    ModelSerializer,
    FileField,
    PrimaryKeyRelatedField,
    CharField,
    DateTimeField,
    SerializerMethodField,
)

from .models import Video, Channel, Comment


class VideoSerializer(ModelSerializer):

    video_file = FileField(required=False)
    channel = PrimaryKeyRelatedField(queryset=Channel.objects.all(), required=False)
    username = CharField(source="channel.owner.first_name", read_only=True)
    user_avatar = CharField(source="channel.owner.avatar.url")
    upload_date = DateTimeField(format="%d-%m-%Y")
    imagekit_url = SerializerMethodField()

    class Meta:
        model = Video
        fields = (
            "id",
            "channel",
            "title",
            "description",
            "video_file",
            "hashtag",
            "upload_date",
            "likes",
            "username",
            "user_avatar",
            "views",
            "imagekit_url",
        )

    def get_imagekit_url(self, obj):
        if not obj.video_file:
            return None
        elif getenv('IMAGEKIT') == 'imagekit':   
            imagekit_url = "ik.imagekit.io/videohub"
        elif getenv('IMAGEKIT') == 'imgix':       
            imagekit_url = "doszhan.imgix.net"
        aws_url = "mediastatic.s3.amazonaws.com"
        url = obj.video_file.url.replace(aws_url, imagekit_url)
        return url


class UpdateCreateVideoSerializer(ModelSerializer):

    video_file = FileField(required=False)

    class Meta:
        model = Video
        exclude = ("channel",)

    def validate_video_file(self, value):
        file_extension = splitext(value.name)[-1].lower()
        extensions = [".mov", ".avi", ".mp4", ".webm", ".mkv"]
        if file_extension not in extensions:
            raise ValidationError
        return value


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ("text", "user", "create")


class CreateCommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = (
            "text",
            "video",
        )
