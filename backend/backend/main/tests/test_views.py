from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

from ..models import (
    Channel, Video, Comment, SubscribeChannel,
    LikeVideo,
)


User = get_user_model()
api_client = APIClient()

class SearchVideo(APITestCase):
    ''' Video search test
    '''

    def setUp(self) -> None:
        self.user = User.objects.create(email='test@test.com', password='testpass')
        self.channel = Channel.objects.create(owner=self.user, description='my channel')
        self.video = Video.objects.create(channel=self.channel, title='test video', )
        return super().setUp()

    def test_search_video(self):
        ''' Get search result
        '''
        url = reverse('main:search_video', kwargs={'query': 'test'})
        response = api_client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()[0]['title'], 'test video')
        self.video.delete()
        