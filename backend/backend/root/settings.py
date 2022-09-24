import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = os.getenv("DEBUG")

SECRET_KEY = os.getenv("SECRET_KEY")

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS").split(' ')

CSRF_TRUSTED_ORIGINS = os.getenv("CSRF_TRUSTED_ORIGINS").split(' ')

INSTALLED_APPS = [
    'admin_menu',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    "corsheaders",
    
    'accounts',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'root.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'root.wsgi.application'


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


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]




# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


CORS_ALLOWED_ORIGINS = [
    "http://localhost",
    "http://127.0.0.1",
]

CORS_ALLOW_CREDENTIALS = True

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


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
            'datefmt' : "%H:%M:%S",
            "style": "{",
        },
        'color': {
            '()': 'colorlog.ColoredFormatter',
            'format': '%(yellow)s%(asctime)-8s%(reset)s - %(log_color)s%(levelname)-1s%(reset)s - %(message)s',
            'datefmt' : "%H:%M:%S",
            'log_colors': {
                'DEBUG':    'bold_black',
                'INFO':     'green',
                'WARNING':  'light_yellow',
                'ERROR':    'bold_red',
                'CRITICAL': 'red,bg_white',
            },
        }
    },
    "handlers": {
        "file": {
            "level": "INFO",
            "class": "logging.handlers.RotatingFileHandler",
            "filename": "logs/debug.log",
            "formatter": "file",
            "maxBytes": 1024 * 1024 * 10,  # 1024*1024*10,  # 10 MB
            "backupCount": 10,
        },
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
        "django": {
            "handlers": ["file", "console", ],
            "level": "INFO",
            "propagate": True,
        },
        "gunicorn": {
            "handlers": ["file", "console", ],  # 'gelf',],
            "level": "INFO",
            "propagate": True,
        },
        # 'django.db.backends': { # закомментировать для выключения вывода sql запросов
        #     'level': 'DEBUG',
        #     'handlers': ["sql_console"],
        #     "propagate": False,
        # }
    },
}


# ADMIN PANEL SETTINGS
ADMIN_STYLE = {
    'background': 'whitesmoke',
    'primary-color': '#205280',
    'primary-text': '#d6d5d2',
    'secondary-color': '#3B75AD',
    'secondary-text': 'white',
    'tertiary-color': '#F2F9FC',
    'tertiary-text': 'black',
    'breadcrumb-color': 'whitesmoke',
    'breadcrumb-text': 'black',
    'focus-color': '#eaeaea',
    'focus-text': '#666',
    'primary-button': '#26904A',
    'primary-button-text':' white',
    'secondary-button': '#999',
    'secondary-button-text': 'white',
    'link-color': '#4285AC',
    'link-color-hover': 'lighten($link-color, 20%)',
    'logo-width': 'auto',
    'logo-height': '60px'
}
