from rest_framework_simplejwt.tokens import RefreshToken
from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework.serializers import ModelSerializer

from .models import User


class RegistrationSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = (
            "email",
            "phone",
            "password",
        )

    def to_representation(self, instance):
        data = super(RegistrationSerializer, self).to_representation(instance)
        user_tokens = RefreshToken.for_user(instance)
        tokens = {"refresh": str(user_tokens), "access": str(user_tokens.access_token)}
        data.update(tokens)
        return data


class UserMeSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ("email", "phone", "avatar", "first_name", "user_channel")


class UserInfo(ModelSerializer):
    class Meta:
        model = User
        fields = ("sub", "phone", "email", "first_name", "last_name", "avatar")
