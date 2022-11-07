from django.dispatch import receiver
from django.db.models.signals import pre_delete


from .models import User


@receiver(pre_delete, sender=User)
def remove_file_from_s3(sender, instance, **kwargs):
    instance.avatar.delete(save=False)