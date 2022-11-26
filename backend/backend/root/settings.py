import os
from jwt import decode
from pathlib import Path
from datetime import timedelta


BASE_DIR = Path(__file__).resolve().parent.parent

if os.getenv("DEBUG") == "TRUE":
    DEBUG = True
else:
    DEBUG = False

SECRET_KEY = os.getenv("SECRET_KEY")

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS").split(" ")

INSTALLED_APPS = [
    "admin_menu",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "djoser",
    "corsheaders",
    "drf_yasg",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "storages",
    "django_elasticsearch_dsl",
    "accounts",
    "main",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    'root.middleware.UserSubMiddleware',
]


ROOT_URLCONF = "root.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "root.wsgi.application"


if os.getenv("POSTGRES") == "TRUE":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql_psycopg2",
            "NAME": os.getenv("POSTGRES_DBNAME"),
            "USER": os.getenv("POSTGRES_USER"),
            "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
            "HOST": os.getenv("POSTGRES_HOST"),
            "PORT": os.getenv("POSTGRES_PORT"),
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": "sqlite.db",
        }
    }


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

AUTH_USER_MODEL = "accounts.User"

SESSION_ENGINE = "django.contrib.sessions.backends.cache"
CSRF_COOKIE_SAMESITE = "Strict"
SESSION_COOKIE_SAMESITE = "Strict"
CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

CSRF_TRUSTED_ORIGINS = os.getenv("CSRF_AND_CORS_ALLOWED_ORIGINS").split(" ")
CORS_ALLOWED_ORIGINS = os.getenv("CSRF_AND_CORS_ALLOWED_ORIGINS").split(" ")
CORS_EXPOSE_HEADERS = ["Content-Type", "X-CSRFToken"]
CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
}

DJOSER = {
    "SERIALIZERS": {
        "user_create": "accounts.serializers.RegistrationSerializer",
        "current_user": "accounts.serializers.UserMeSerializer",
    }
}

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": os.getenv("BACKEND_CACHE"),
        "OPTIONS": {},
    }
}

# CELERY SETTINGS
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND")
CELERY_ENABLE_UTC = True


LANGUAGE_CODE = "en-us"

TIME_ZONE = os.getenv("TZ")

USE_I18N = True

USE_TZ = True

if os.getenv("USE_S3") == "TRUE":
    AWS_ACCESS_KEY_ID = decode(
        os.getenv("AWS_ACCESS_KEY_ID"), os.getenv("SECRET_KEY"), algorithms=["HS256"]
    )["AWS_ACCESS_KEY_ID"]
    AWS_SECRET_ACCESS_KEY = decode(
        os.getenv("AWS_SECRET_ACCESS_KEY"),
        os.getenv("SECRET_KEY"),
        algorithms=["HS256"],
    )["AWS_SECRET_ACCESS_KEY"]
    AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
    AWS_S3_CUSTOM_DOMAIN = "%s.s3.amazonaws.com" % AWS_STORAGE_BUCKET_NAME
    AWS_S3_OBJECT_PARAMETERS = {
        "CacheControl": "max-age=86400",
    }
    # static
    AWS_LOCATION = "static"
    # STATIC_URL = "https://%s/%s/" % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)
    # STATICFILES_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
    AWS_DEFAULT_ACL = None
    # media
    DEFAULT_FILE_STORAGE = "root.storage_backends.MediaStorage"
    MEDIA_LOCATION = "media"
    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{MEDIA_LOCATION}/"
else:
    # media
    MEDIA_URL = "/media/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "media/")

# static
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"
    
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "ISSUER": None,
    "JWK_URL": None,
    "LEEWAY": 0,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
}

ELASTICSEARCH_DSL = {
    "default": {"hosts": f"{os.getenv('ELASTIC_HOST')}:9200"},
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "file": {
            "format": " {asctime}  {levelname} - {name} - {message}",
            "style": "{",
        },
        "console": {
            "format": " {asctime}- {message} - {levelname} - {name}",
            "datefmt": "%H:%M:%S",
            "style": "{",
        },
        "color": {
            "()": "colorlog.ColoredFormatter",
            "format": "%(yellow)s%(asctime)-8s%(reset)s - %(log_color)s%(levelname)-1s%(reset)s - %(message)s",
            "datefmt": "%H:%M:%S",
            "log_colors": {
                "DEBUG": "bold_black",
                "INFO": "green",
                "WARNING": "light_yellow",
                "ERROR": "bold_red",
                "CRITICAL": "red,bg_white",
            },
        },
    },
    "handlers": {
        # "file": {
        #     "level": "INFO",
        #     "class": "logging.handlers.RotatingFileHandler",
        #     "filename": "logs/debug.log",
        #     "formatter": "file",
        #     "maxBytes": 1024 * 1024 * 10,  # 1024*1024*10,  # 10 MB
        #     "backupCount": 10,
        # },
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "color",
        },
        "sql_console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
        },
    },
    "loggers": {
        "gunicorn": {
            "handlers": [
                "console",
            ],  # "file"],
            "level": "INFO",
            "propagate": True,
        },
        # 'django.db.backends': { # sql запросы
        #     'level': 'DEBUG',
        #     'handlers': ["sql_console"],
        #     "propagate": False,
        # }
    },
}


# ADMIN PANEL SETTINGS
ADMIN_STYLE = {
    "background": "whitesmoke",
    "primary-color": "#205280",
    "primary-text": "#d6d5d2",
    "secondary-color": "#3B75AD",
    "secondary-text": "white",
    "tertiary-color": "#F2F9FC",
    "tertiary-text": "black",
    "breadcrumb-color": "whitesmoke",
    "breadcrumb-text": "black",
    "focus-color": "#eaeaea",
    "focus-text": "#666",
    "primary-button": "#26904A",
    "primary-button-text": " white",
    "secondary-button": "#999",
    "secondary-button-text": "white",
    "link-color": "#4285AC",
    "link-color-hover": "lighten($link-color, 20%)",
    "logo-width": "auto",
    "logo-height": "60px",
}
