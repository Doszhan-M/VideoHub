from django.dispatch import receiver
from django.db.models.signals import (
    pre_delete,
    post_save,
)
from django.contrib.auth import get_user_model

from .models import Video, Channel


User = get_user_model()


@receiver(pre_delete, sender=Video)
def remove_file_from_s3(sender, instance, **kwargs):
    instance.video_file.delete(save=False)


@receiver(post_save, sender=User)
def create_channel(sender, instance, created, **kwargs):
    if created:
        Channel.objects.create(owner=instance)
