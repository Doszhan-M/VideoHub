from django.test import TestCase
from django.contrib.auth import get_user_model

from ..models import (
    Channel, Video, Comment, SubscribeChannel,
    LikeVideo,
)


User = get_user_model()


class ChannelTest(TestCase):
    ''' Channel model testing
    '''

    def setUp(self):
        self.user = User.objects.create(
            email='tesT@teSt.com', first_name='test_user', password='testpass')
        self.channel = Channel.objects.create(owner=self.user, description='my channel')

    def test_channel_title(self):
        """ Check channel_title if it not set.
        """
        self.assertEqual(self.channel.title, self.user.first_name)

    def test_str(self):
        """ Check string representation.
        """
        self.assertEqual(self.channel.__str__(), 'test_user')


class VideoTest(TestCase):
    ''' Video model testing
    '''

    def setUp(self):
        self.user = User.objects.create(email='tesT@teSt.com', password='testpass')
        self.channel = Channel.objects.create(owner=self.user, description='my channel')
        self.video = Video.objects.create(elastic_id='qwerty', channel=self.channel, title='test', )

    def test_str(self):
        """ Check string representation.
        """
        self.assertEqual(self.video.__str__(), 'test')


class CommentTest(TestCase):
    ''' Comment model testing
    '''

    def setUp(self):
        self.user = User.objects.create(email='tesT@teSt.com', password='testpass')
        self.channel = Channel.objects.create(owner=self.user, description='my channel')
        self.video = Video.objects.create(elastic_id='qwerty', channel=self.channel, title='test', )
        self.comment = Comment.objects.create(text='test text', user=self.user, video=self.video)

    def test_str(self):
        """ Check string representation.
        """
        self.assertEqual(self.comment.__str__(), 'test text')
        

class SubscribeChannelTest(TestCase):
    ''' SubscribeChannel model testing
    '''

    def setUp(self):
        self.user = User.objects.create(email='tesT@teSt.com', password='testpass')
        self.channel = Channel.objects.create(owner=self.user, title='my channel')
        self.subscribe = SubscribeChannel.objects.create(user=self.user, channel=self.channel)

    def test_str(self):
        """ Check string representation.
        """
        self.assertEqual(self.subscribe.__str__(), 'test@test.com + my channel')


class LikeVideoChannelTest(TestCase):
    ''' LikeVideo model testing
    '''

    def setUp(self):
        self.user = User.objects.create(email='tesT@teSt.com', password='testpass')
        self.channel = Channel.objects.create(owner=self.user, title='my channel')
        self.video = Video.objects.create(elastic_id='qwerty', channel=self.channel, title='test', )
        self.like = LikeVideo.objects.create(user=self.user, video=self.video)

    def test_str(self):
        """ Check string representation.
        """
        self.assertEqual(self.like.__str__(), 'test@test.com + test') 
        