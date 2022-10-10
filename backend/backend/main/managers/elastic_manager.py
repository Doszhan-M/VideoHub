import abc
from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination

from ..models import Video


class PaginatedElasticSearchAPIView(APIView, LimitOffsetPagination):
    serializer_class = None
    document_class = None

    @abc.abstractmethod
    def generate_q_expression(self, query):
        """This method should be overridden
        and return a Q() expression."""

    def get(self, request, query):
        q = self.generate_q_expression(query)
        search = self.document_class.search().query(q)
        response = search.to_queryset()
        results = self.paginate_queryset(response, request, view=self)
        serializer = self.serializer_class(results, many=True)
        print(serializer)
        return self.get_paginated_response(serializer.data)



@registry.register_document
class VideoDocument(Document):
    id = fields.IntegerField()

    class Index:
        name = 'videos'
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0,
        }

    class Django:
        model = Video
        fields = [
            'title',
            'description',
            'hashtag',
        ]        