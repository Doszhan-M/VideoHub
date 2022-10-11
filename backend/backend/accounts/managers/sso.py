from os import getenv
from jwt import decode
from requests import request
from logging import getLogger
from urllib.parse import urlparse

from django.core.cache import cache
from django.middleware.csrf import get_token

from ..models import User


logger = getLogger("django")


class SsoManager():
    ''' Manage by SSO operations
    '''

    def __init__(self, request=None, **kwargs) -> None:
        if request:
            query_params = request.query_params
            self.code = query_params.get('code')
            self.redirect_url = query_params.get('state')
            self.domain = urlparse(self.redirect_url).netloc
            self.sso_data = self.sso_data_request()

    def sso_data_request(self) -> str:
        ''' Отправить запрос на sso получить данные аутентификации
        '''
        url = "https://dev-ge0s31km.us.auth0.com/oauth/token"
        headers = { 'content-type': "application/x-www-form-urlencoded" }
        
        payload = getenv('SSO_TOKEN_URL').format(self.code, self.domain)
        print(payload)
        response = request("POST", url, headers=headers, data=payload).json()
        sso_data = decode(response['id_token'], options={"verify_signature": False})
        return sso_data

    def store_session_id(self, django_session_key) -> None:
        ''' Сохранить sid в redis с его данными
        '''
        sid = self.sso_data['sid']
        payload = {'django_session_key': django_session_key}
        cache.set(sid, payload, timeout=86400 * 30)

    @staticmethod
    def logout(logout_token) -> None:
        ''' Удалить сеанс пользователя джанго привязанный к sid SSO
        '''
        sid = decode(logout_token, options={"verify_signature": False})['sid']
        cache_key = cache.get(sid)
        if cache_key:
            django_session_key = cache_key.get('django_session_key')
            cache.delete(django_session_key)
            cache.delete(sid)

    def get_or_create_user(self) -> User:
        ''' Если нет user по sub, то создать пользователя. Если есть 
        старый пользователь, то дополнить данные из него 
        '''
        try:
            user = User.objects.get(sub=self.sso_data['sub'])
        except User.DoesNotExist:
            user_data = {
                'sub': self.sso_data['sub'],
                'email': self.sso_data['user']['email'],
                'phone': self.sso_data['user']['phone'],
                'is_staff': self.sso_data['user']['is_staff'],
                'email_verified': self.sso_data['user']['email_verified'],
                'phone_verified': self.sso_data['user']['phone_verified'],
            }
            user = User.objects.create(**user_data)
            logger.info(f'Создан пользователь {user}')
        return user

    @staticmethod
    def get_session_id(request) -> dict:
        try:
            data = {
                'session_id': request.COOKIES['sessionid'],
                'csrftoken': get_token(request)
            }
        except KeyError:
            data = {'session_id' : 'inactive session'}
        return data
