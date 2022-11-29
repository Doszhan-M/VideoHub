from django.dispatch import receiver
from django.db.models.signals import (
    pre_delete,
    post_save,
)
from django.contrib.auth import get_user_model
from django.forms.models import model_to_dict

from .tasks import send_web_push
from .models import Video, Channel, WebPushToken


User = get_user_model()


@receiver(pre_delete, sender=Video)
def remove_file_from_s3(sender, instance, **kwargs):
    instance.video_file.delete(save=False)


@receiver(post_save, sender=User)
def create_channel(sender, instance, created, **kwargs):
    if created:
        Channel.objects.create(owner=instance)


@receiver(post_save, sender=Video)
def create_channel(sender, instance, created, **kwargs):
    if created:
        data = model_to_dict(instance)
        video_id = data['id']
        title = data['title']
        description = data['description'][:119]
        all_tokens = WebPushToken.objects.all()
        for _token in all_tokens:
            send_web_push.delay(_token.token, video_id, title, description)