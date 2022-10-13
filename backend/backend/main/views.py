from elasticsearch_dsl import Q

from rest_framework.parsers import MultiPartParser
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView, CreateAPIView)

from .documents import VideoDocument
from .models import Video
from .serializers import VideoSerializer


class SearchVideo(ListAPIView):
    ''' Search video
    '''
    serializer_class = VideoSerializer

    def get_queryset(self, *args, **kwargs):
        value = self.kwargs['query']
        query = Q('multi_match', query=value,
                fields=[
                    'title',
                    'description',
                    'hashtag',
                ], fuzziness='auto')
        search = VideoDocument.search().query(query)
        queryset = search.to_queryset()
        return queryset


class All_Videos(ListAPIView):
    ''' Get all video
    '''
    queryset = Video.objects.all().order_by('-upload_date')
    serializer_class = VideoSerializer
    

class GetVideo(RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    

class CreateVideo(CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    parser_classes = (MultiPartParser,)