from rest_framework.serializers import ModelSerializer, FileField

from .models import Video


class VideoSerializer(ModelSerializer):
    
    video_file = FileField(required=False)
    
    class Meta:
        model = Video
        fields = (
            'id', 'channel', 'title', 'description',
            'video_file', 'hashtag', 'upload_date', 'likes'
        )
