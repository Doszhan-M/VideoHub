from django.urls import reverse
from rest_framework import status
from django.core.files import File
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile

from ..models import (
    Channel, Video, Comment, SubscribeChannel,
)


User = get_user_model()
api_client = APIClient()


class VideoApi(APITestCase):
    ''' Video search test
    '''

    def setUp(self) -> None:
        self.user = User.objects.create(email='test@test.com', password='testpass', sub='test_sub')
        self.channel = self.user.user_channel
        self.video0 = Video.objects.create(channel=self.channel, title='test video0', )
        self.video1 = Video.objects.create(channel=self.channel, title='test video1', )
        self.comment = Comment.objects.create(user=self.user, video=self.video0)
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
            "title": "test title",
            # "video_file": uploaded_file,
            "description": "test description",
        }
        api_client.force_authenticate(user=self.user)
        response = api_client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete_video(self):
        ''' Delete video
        '''
        url = reverse('main:delete_video', kwargs={'pk': self.video0.id})
        api_client.force_authenticate(user=self.user)
        response = api_client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_video(self):
        ''' Update video
        '''
        url = reverse('main:update_video', kwargs={'pk': self.video0.id})
        api_client.force_authenticate(user=self.user)
        data = {
            "title": "string",
            "description": "string",
            "hashtag": "string",
            "upload_date": "2022-10-14T15:31:12.693Z"
        }
        response = api_client.put(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_like_video(self):
        ''' Like video
        '''
        url = reverse('main:like_video', kwargs={'pk': self.video0.id})
        api_client.force_authenticate(user=self.user)
        response = api_client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_comment(self):
        ''' Create_comment to video
        '''
        url = reverse('main:create_comment')
        api_client.force_authenticate(user=self.user)
        data = {
            "text": "test comment",
            "video": self.video0.id
        }
        response = api_client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_video_comments(self):
        ''' Get all comments for video
        '''
        url = reverse('main:video_comments', kwargs={'pk': self.video0.id}) + '?limit=10&offset=0'
        response = api_client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['count'], 1)
        
    def subscribe_channel(self):
        ''' Subscribe to video's channel
        '''
        url = reverse('main:subscribe_channel', kwargs={'pk': self.video0.id})
        api_client.force_authenticate(user=self.user)
        response = api_client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(SubscribeChannel.objects.count(), 1)

    def test_subscribed_videos(self):
        ''' Get all videos from subscribes
        '''
        url = reverse('main:subscribed_videos') + '?limit=10&offset=0'
        api_client.force_authenticate(user=self.user)
        response = api_client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['count'], 2)
        