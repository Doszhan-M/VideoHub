from rest_framework.serializers import ModelSerializer

from .models import Video


class VideoSerializer(ModelSerializer):

    class Meta:
        model = Video
        fields = ('channel', 'title', 'description',
                  'hashtag', 'upload_date', 'likes')
