from django.urls import reverse
from rest_framework import status
from django.core.files import File
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile

from ..models import (
    Channel, Video, Comment, SubscribeChannel,
    LikeVideo,
)
import os

User = get_user_model()
api_client = APIClient()


class VideoApi(APITestCase):
    ''' Video search test
    '''

    def setUp(self) -> None:
        self.user = User.objects.create(email='test@test.com', password='testpass', sub='test_sub')
        self.channel = Channel.objects.create(owner=self.user, description='test channel')
        self.video0 = Video.objects.create(channel=self.channel, title='test video0', )
        self.video1 = Video.objects.create(channel=self.channel, title='test video1', )
        return super().setUp()

    def tearDown(self) -> None:
        self.video0.delete()
        self.video1.delete()
        return super().tearDown()

    def test_search_video(self):
        ''' Get search result
        '''
        url = reverse('main:search_video', kwargs={'query': 'test'})
        response = api_client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()[0]['title'], 'test video0')

    def test_get_all_videos(self):
        ''' Get search result
        '''
        url = reverse('main:all_videos') + '?limit=10&offset=0'
        response = api_client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['count'], 2)

    def test_get_video_by_id(self):
        ''' Get video by id
        '''
        url = reverse('main:get_video', kwargs={'pk': self.video0.id})
        response = api_client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_video(self):
        ''' Create video
        '''
        video_path = '/backend/main/tests/test_media/test_video.mp4'
        file = File(open(video_path, 'rb'))
        uploaded_file = SimpleUploadedFile(
            'test_video.mp4', file.read(),
            content_type='multipart/form-data')
        url = reverse('main:create_video')
        data = {
            "channel": self.channel.id,
            "title": "test title",
            # "video_file": uploaded_file,
            "description": "test description",
        }
        response = api_client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
