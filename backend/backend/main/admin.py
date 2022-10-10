from django.contrib import admin

from .models import (
    Channel, Video, Comment, 
    SubscribeChannel, LikeVideo
)


class AdminUpdatedFields(admin.ModelAdmin):

    def save_model(self, request, obj, form, change):
        if change:
            obj.save(update_fields=form.changed_data)
        else:
            super().save_model(request, obj, form, change)


class VideoDash(AdminUpdatedFields):
    list_display = ('channel', 'title', 'upload_date')
    list_display_links = ('channel', 'title', 'upload_date')
    search_fields = ('channel', 'title',)
    list_filter = ['channel',]
    
    
admin.site.register(Video, VideoDash)
admin.site.register(Channel)
admin.site.register(Comment)
admin.site.register(LikeVideo)
admin.site.register(SubscribeChannel)

