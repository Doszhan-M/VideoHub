
from rest_framework.views import APIView
from django.middleware.csrf import get_token
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from django.contrib.auth import login, logout
from rest_framework.generics import RetrieveAPIView

from .models import User
from .managers.sso import SsoManager
from . import serializers

class LoginAuth0(APIView):
    ''' Authorize the user if he passed
    SSO authentication 
    '''

    def get(self, request, *args, **kwargs):
        sso = SsoManager(request)
        user = sso.get_or_create_user()
        login(request, user)
        return HttpResponseRedirect(sso.redirect_url)
    
    
class LogoutAuth0(APIView):
    ''' Logout user if he logout from SSO
    '''

    def get(self, request) -> Response:
        logout(request)
        return HttpResponseRedirect('/')



class SessionCheck(APIView):

    def get(self, request):
        if request.user.is_authenticated:
            return Response({'isAuthenticated' : True})
        return Response({'isAuthenticated' : False})


class SessionId(APIView):
    ''' Get session_id and new csrf
    '''
    def get(self, request, *args, **kwargs):
        session_id = SsoManager.get_session_id(request)
        return Response(session_id)
    
    
class GenerateCsrf(APIView):
    ''' Return CSRF token required for form POST
    '''

    def get(self, request, *args, **kwargs):
        response = {'X-CSRFToken': get_token(request)}
        return Response(response)


class UserId(APIView):
    ''' Get user id by email
    '''
    def get(self, request, *args, **kwargs):
        email = request.query_params['email']
        user_id = User.objects.get(email=email).id
        return Response(user_id)
    
    
class UserInfo(RetrieveAPIView):
    ''' Get user info by id
    '''
    queryset = User.objects.all()
    serializer_class = serializers.UserInfo
    lookup_field = "pk"