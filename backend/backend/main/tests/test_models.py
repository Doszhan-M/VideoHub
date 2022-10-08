from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from ..models import Channel


User = get_user_model()


class ChannelTest(TestCase):
    ''' User model testing
    '''
    
    def setUp(self):
        self.user = User.objects.create(email='tesT@teSt.com', password='testpass')
        self.channel = Channel(phone='87017075566', email='test@test.com', password='testpass')
        
    def test_phone_format(self):
        """ Check custom phone number validation.
        """
        with self.assertRaises(ValidationError):
            self.user1.full_clean()
            self.user1.save()
        self.assertEqual(User.objects.count(), 0)
        
    def test_email_lowercase(self):
        """ Check that email is saved in lowercase.
        """
        self.user2.full_clean()
        self.user2.save()
        self.assertEqual(self.user2.email, 'test@test.com')
        
    def test_str(self):
        """ Check if string representation returns email.
        """
        self.assertEqual(self.user1.__str__(), 'test@test.com')
        