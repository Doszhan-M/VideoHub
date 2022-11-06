from os import listdir
from random import choice

from django.db import models
from django.utils import timezone
from django.core.files import File
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser,  PermissionsMixin

from .managers.objects import LowercaseEmailField, CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    sub = models.CharField(max_length=150, unique=True, db_index=True,)
    phone = models.CharField(max_length=16, unique=True, blank=True, null=True, validators=[
                             RegexValidator(regex=r'^\+\d{11,15}$', message="format: +77017075566")],)
    email = LowercaseEmailField(max_length=255, unique=True, db_index=True,)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    avatar = models.ImageField(upload_to='images/avatar/', blank=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_banned = models.BooleanField(default=False)
    email_verified = models.BooleanField(default=False)

    objects = CustomUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
        db_table = 'users'

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if not self.avatar:
            all_avatars = listdir("./accounts/avatars")
            avatar = './accounts/avatars/' + choice(all_avatars)
            
            self.avatar = File(open(avatar, 'rb'))
        self.full_clean()
        super(User, self).save(*args, **kwargs)