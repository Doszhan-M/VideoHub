
from rest_framework.views import APIView
from django.middleware.csrf import get_token
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from rest_framework.authentication import SessionAuthentication

from .exceptions import ProvideError, CredentialsError
from .managers.sso import SsoManager


class LoginAuth0(APIView):
    ''' Authorize the user if he passed
    SSO authentication 
    '''

    def get(self, request, *args, **kwargs):
        sso = SsoManager(request)
        # user = sso.get_or_create_user()
        # login(request, user)
        # sso.store_session_id(request.session.cache_key)
        return HttpResponseRedirect(sso.redirect_url)
    
    
class SessionLogout(APIView):
    ''' Session based login
    '''
    def get(self, request, *args, **kwargs):
        logout(request)
        return Response({'detail': 'Successfully logged out.'})


class SessionCheck(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(f'isAuthenticated {request.user}')


class GenerateCsrf(APIView):
    ''' Вернуть токен CSRF, необходимый для формы POST
    '''

    def get(self, request, *args, **kwargs):
        response = {'X-CSRFToken': get_token(request)}
        return Response(response)
    