import os

from celery import Celery
from celery.schedules import crontab
from celery.signals import setup_logging


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'root.settings')
app = Celery('root')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.timezone = 'Asia/Almaty'
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
    

# CUSTOM CELERY LOGGING
@setup_logging.connect  
def setup_celery_logging(**kwargs):  
    return getLogger('celery') 
    
    
### CELERY BEAT
app.conf.beat_schedule = {  

}
