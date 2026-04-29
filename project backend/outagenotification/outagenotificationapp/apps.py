from django.apps import AppConfig


class OutagenotificationappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'outagenotificationapp'
    
    def ready(self):
        from . import scheduler
        scheduler.start()