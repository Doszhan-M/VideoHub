from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator


User = get_user_model()


class Channel(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_channel')
    title = models.CharField(max_length=256,)
    description = models.CharField(max_length=256, blank=True)
    subscribers = models.ManyToManyField(User, blank=True, through='SubscribeChannel',
                     through_fields=('channel', 'user'), related_name='channel_subscribers')
        
    def save(self, *args, **kwargs):
        if len(self.title) == 0 :
            self.title = self.user.first_name   
        super(Channel, self).save(*args, **kwargs)
        
    def __str__(self):
        return self.title 


class Video(models.Model):
    elastic_id = models.CharField(max_length=100, db_index=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    title = models.CharField(max_length=256,)
    video_file = models.FileField(
        upload_to='videos/',
        validators=[FileExtensionValidator(
                allowed_extensions=['MOV', 'avi', 'mp4', 'webm', 'mkv'])])
    description = models.TextField(blank=True)
    hashtag = models.TextField(blank=True)
    upload_date = models.DateField(default=timezone.now)
    likes = models.ManyToManyField(User, blank=True, through='LikeVideo',
                                     through_fields=('video', 'user'),)
    def __str__(self):
        return self.title 
    
    
class Comment(models.Model):
    text = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    create = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.text 
    
    
class SubscribeChannel(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user + self.channel 
    
    
class LikeVideo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)

    def __str__(self):
        return self.user + self.video 