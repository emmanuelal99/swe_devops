import os
from celery import Celery

# Set the default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mylogistics.settings')

app = Celery('mylogistics')

# Load task modules from all registered Django apps.
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()