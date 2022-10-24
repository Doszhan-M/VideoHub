from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator


User = get_user_model()


class Channel(models.Model):
    owner = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='user_channel')
    title = models.CharField(max_length=256,)
    description = models.CharField(max_length=256, blank=True)
    subscribers = models.ManyToManyField(
        User, blank=True, through='SubscribeChannel',
        through_fields=('channel', 'user'),
        related_name='channel_subscribers')

    def save(self, *args, **kwargs):
        if len(self.title) == 0:
            self.title = self.owner.first_name
        super(Channel, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class Video(models.Model):
    channel = models.ForeignKey(
        Channel, on_delete=models.CASCADE, related_name='video_channel')
    title = models.CharField(max_length=256,)
    video_file = models.FileField(
        upload_to='videos/',
        validators=[FileExtensionValidator(
            allowed_extensions=['MOV', 'avi', 'mp4', 'webm', 'mkv'])])
    description = models.TextField(blank=True)
    hashtag = models.TextField(blank=True)
    upload_date = models.DateTimeField(default=timezone.now)
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

    class Meta:
        constraints = [models.UniqueConstraint(
            fields=['user', 'channel'],
            name='user_and_channel_unique',)]

    def __str__(self):
        return f'{self.user.__str__()} + {self.channel.__str__()}'


class LikeVideo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)

    class Meta:
        constraints = [models.UniqueConstraint(
            fields=['user', 'video'],
            name='user_and_video_unique',)]

    def __str__(self):
        return f'{self.user.__str__()} + {self.video.__str__()}'
