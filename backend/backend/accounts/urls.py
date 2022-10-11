from django.urls import path

from .views import (
    LoginAuth0, SessionCheck, SessionLogout, GenerateCsrf
)


urlpatterns = [
    path("authO/login/", LoginAuth0.as_view(), name="session_login"),
    path("session_logout/", SessionLogout.as_view(), name="session_logout"),
    path("check_session/", SessionCheck.as_view(), name="check_session"),
    path("csrf/", GenerateCsrf.as_view(), name="csrf"),
]