from os import getenv
from requests import request
from json import dumps, loads
from logging import getLogger
from urllib.parse import urlparse
from jwt import PyJWKClient, decode

from django.core.cache import cache
from django.middleware.csrf import get_token
from django.contrib.auth.tokens import default_token_generator

from ..models import User


logger = getLogger("django")


class SsoManager:
    """Manage by SSO operations"""

    def __init__(self, req=None, **kwargs) -> None:
        sso_config = self.get_sso_config()
        self.sso_token_endpoint = sso_config["token_endpoint"]
        self.sso_jwks_endpoint = sso_config["jwks_uri"]
        self.issuer = sso_config["issuer"]
        self.audience = getenv("CLIENT_ID")
        self.headers = {"content-type": "application/x-www-form-urlencoded"}
        if req:
            query_params = req.query_params
            self.code = query_params.get("code")
            self.redirect_url = query_params.get("state")
            self.domain = urlparse(self.redirect_url).netloc
            self.sso_data = self.sso_data_request()

    def get_sso_config(self) -> dict:
        sso_config = cache.get("sso_config")
        if sso_config:
            return loads(sso_config)
        sso_config_url = (
            "https://dev-ge0s31km.us.auth0.com/.idp/.well-known/openid-configuration"
        )
        sso_config = request("GET", sso_config_url).json()
        cache.set("sso_config", dumps(sso_config), timeout=None)
        return sso_config

    def sso_data_request(self) -> dict:
        """Send request to sso get authentication details"""
        payload = getenv("SSO_TOKEN_URL").format(self.code, self.domain)
        response = request(
            "POST", self.sso_token_endpoint, headers=self.headers, data=payload
        ).json()
        jwks_client = PyJWKClient(self.sso_jwks_endpoint)
        id_token = response["id_token"]
        signing_key = jwks_client.get_signing_key_from_jwt(id_token)
        sso_data = decode(
            id_token,
            signing_key.key,
            algorithms=["RS256"],
            issuer=self.issuer,
            audience=self.audience,
        )
        return sso_data

    def get_or_create_user(self) -> User:
        """Create or get user by sso sub."""
        print(self.sso_data["sub"])
        try:
            user = User.objects.get(sub=self.sso_data["sub"])
        except User.DoesNotExist:
            user_data = {
                "sub": self.sso_data.get("sub"),
                "email": self.sso_data.get("email"),
                "email_verified": self.sso_data.get("email_verified", False),
                "first_name": self.sso_data.get("name", ""),
                "last_name": self.sso_data.get("family_name", ""),
            }
            user = User(**user_data)
            password = default_token_generator.make_token(user)
            user.set_password(password)
            user.save()
            logger.info(f"Create user {user}")
        return user

    @staticmethod
    def get_session_id(request) -> dict:
        try:
            data = {
                "session_id": request.COOKIES["sessionid"],
                "csrftoken": get_token(request),
            }
        except KeyError:
            data = {"session_id": "inactive session"}
        return data
