from elasticsearch_dsl import Q

from rest_framework.generics import ListAPIView
from .managers.elastic_manager import (
    PaginatedElasticSearchAPIView, VideoDocument
)

from .serializers import VideoSerializer


class SearchVideo(ListAPIView):
    serializer_class = VideoSerializer

    def get_queryset(self, *args, **kwargs):
        query = self.kwargs['query']
        que = Q('multi_match', query=query,
            fields=['title', 'description', 'hashtag',
            ], fuzziness='auto')
        search = VideoDocument.search().query(que)
        q = search.to_queryset()
        return q
        