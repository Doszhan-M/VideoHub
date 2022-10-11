from elasticsearch_dsl import Q

from rest_framework.generics import ListAPIView

from .documents import VideoDocument
from .serializers import VideoSerializer


class SearchVideo(ListAPIView):
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


