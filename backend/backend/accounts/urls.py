from django.urls import path

from .views import (
    LoginAuth0, SessionCheck, LogoutAuth0, GenerateCsrf,
    SessionId, UserId
)


urlpatterns = [
    path("authO/login/", LoginAuth0.as_view(), name="authO_login"),
    path("authO/logout/", LogoutAuth0.as_view(), name="authO_logout"),
    path("check_session/", SessionCheck.as_view(), name="check_session"),
    path("csrf/", GenerateCsrf.as_view(), name="csrf"),
    path("session_id/", SessionId.as_view(), name="session_id"),
    path("user_id_by_email/", UserId.as_view(), name="user_id_by_email"),
]