from django.contrib import admin

from .models import (
    Channel,
    Video,
    Comment,
    SubscribeChannel,
    LikeVideo,
    WebPushToken,
)


class AdminUpdatedFields(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        if change:
            obj.save(update_fields=form.changed_data)
        else:
            super().save_model(request, obj, form, change)


class LikeVideoInline(admin.TabularInline):
    model = LikeVideo
    extra = 1


class VideoDash(AdminUpdatedFields):
    list_display = ("id", "title", "channel", "upload_date", "id")
    list_display_links = ("channel", "title", "upload_date")
    search_fields = ("channel", "title")
    list_filter = ["channel"]
    save_on_top = True
    inlines = (LikeVideoInline,)


class CommentDash(AdminUpdatedFields):
    list_display = ("user", "video", "create", "id")
    list_display_links = ("user", "video", "create", "id")


admin.site.register(Video, VideoDash)
admin.site.register(Channel)
admin.site.register(Comment, CommentDash)
admin.site.register(LikeVideo)
admin.site.register(SubscribeChannel)
admin.site.register(WebPushToken)
