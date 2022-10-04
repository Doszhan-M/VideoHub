from django.contrib import admin

from .models import (
    Channel, Video, Comment, 
    SubscribeChannel, LikeVideo
)


admin.site.register(Video)
admin.site.register(Channel)
admin.site.register(Comment)
admin.site.register(LikeVideo)
admin.site.register(SubscribeChannel)

